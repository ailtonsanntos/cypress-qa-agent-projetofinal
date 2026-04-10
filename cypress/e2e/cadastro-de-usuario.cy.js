describe('BugBank E2E Tests', () => {
  const baseUrl = 'https://bugbank.netlify.app/#';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('1 - Criar uma conta com saldo', () => {
    // Navega para a tela de cadastro
    cy.contains('Registrar', { timeout: 20000 }).click();
    cy.wait(1000);

    // Ativa a opção de criar conta com saldo
    cy.get('#toggleAddBalance', { timeout: 20000 }).click({ force: true });

    // Preenche o formulário
    cy.get('.card__register input[name="name"]', { timeout: 20000 }).should('exist').type('Ton Santos', { force: true });
    cy.get('.card__register input[name="email"]', { timeout: 20000 }).should('exist').type('ailtonsanntos@gmail.com', { force: true });
    cy.get('.card__register input[name="password"]', { timeout: 20000 }).should('exist').type('@Admin123', { force: true });
    cy.get('.card__register input[name="passwordConfirmation"]', { timeout: 20000 }).should('exist').type('@Admin123', { force: true });

    // Submete
    cy.contains('Cadastrar', { timeout: 20000 }).click({ force: true });

    // Verifica mensagem de sucesso
    cy.contains('foi criada com sucesso', { timeout: 20000 }).should('be.visible');
    cy.screenshot('conta-criada-sucesso');
  });

  it('2 - Campos obrigatórios no cadastro', () => {
    cy.contains('Registrar', { timeout: 20000 }).click();
    cy.wait(1000);

    // Tenta submeter sem preencher nada
    cy.contains('Cadastrar', { timeout: 20000 }).click({ force: true });

    // Verifica mensagens de erro para cada campo obrigatório
    cy.get('.card__register input[name="name"]')
      .then($el => {
        expect($el[0].validationMessage).to.exist;
      });
    cy.get('.card__register input[name="email"]')
      .then($el => {
        expect($el[0].validationMessage).to.exist;
      });
    cy.get('.card__register input[name="password"]')
      .then($el => {
        expect($el[0].validationMessage).to.exist;
      });

    cy.screenshot('campos-obrigatorios-erro');
  });

  it('3 - Login com sucesso', () => {
    // Pré-requisito: Criar a conta (localStorage está vazio a cada novo teste)
    cy.contains('Registrar', { timeout: 20000 }).click();
    cy.wait(1000);
    cy.get('#toggleAddBalance', { timeout: 20000 }).click({ force: true });
    cy.get('.card__register input[name="name"]', { timeout: 20000 }).should('exist').type('Ton Santos', { force: true });
    cy.get('.card__register input[name="email"]', { timeout: 20000 }).should('exist').type('ailtonsanntos@gmail.com', { force: true });
    cy.get('.card__register input[name="password"]', { timeout: 20000 }).should('exist').type('@Admin123', { force: true });
    cy.get('.card__register input[name="passwordConfirmation"]', { timeout: 20000 }).should('exist').type('@Admin123', { force: true });
    cy.contains('Cadastrar', { timeout: 20000 }).click({ force: true });
    cy.contains('foi criada com sucesso', { timeout: 20000 }).should('be.visible');
    cy.wait(1500);

    // Agora fazer o login com sucesso
    cy.contains('Registrar', { timeout: 20000 }).click({ force: true });
    cy.wait(1000);
    cy.get('.card__login input[name="email"]', { timeout: 20000 }).type('ailtonsanntos@gmail.com', { force: true });
    cy.get('.card__login input[name="password"]', { timeout: 20000 }).type('@Admin123', { force: true });
    cy.contains('Acessar', { timeout: 20000 }).click({ force: true });

    // Verifica se o usuário foi redirecionado ao home
    cy.url({ timeout: 20000 }).should('include', '/home');
    cy.screenshot('login-sucesso');
  });

  it('4 - Login inválido', () => {
    // Pré-requisito: Criar a conta (localStorage está vazio a cada novo teste)
    cy.contains('Registrar', { timeout: 20000 }).click();
    cy.wait(1000);
    cy.get('#toggleAddBalance', { timeout: 20000 }).click({ force: true });
    cy.get('.card__register input[name="name"]', { timeout: 20000 }).should('exist').type('Ton Santos', { force: true });
    cy.get('.card__register input[name="email"]', { timeout: 20000 }).should('exist').type('ailtonsanntos@gmail.com', { force: true });
    cy.get('.card__register input[name="password"]', { timeout: 20000 }).should('exist').type('@Admin123', { force: true });
    cy.get('.card__register input[name="passwordConfirmation"]', { timeout: 20000 }).should('exist').type('@Admin123', { force: true });
    cy.contains('Cadastrar', { timeout: 20000 }).click({ force: true });
    cy.contains('foi criada com sucesso', { timeout: 20000 }).should('be.visible');
    cy.wait(1500);

    // Agora testar login com credenciais inválidas
    cy.contains('Registrar', { timeout: 20000 }).click({ force: true });
    cy.wait(1000);
    cy.get('.card__login input[name="email"]', { timeout: 20000 }).type('email.invalido@exemplo.com', { force: true });
    cy.get('.card__login input[name="password"]', { timeout: 20000 }).type('senhaErrada', { force: true });
    cy.contains('Acessar', { timeout: 20000 }).click({ force: true });

    // Verifica mensagem de erro
    cy.contains('Usuário ou senha', { timeout: 20000 }).should('be.visible');
    cy.screenshot('login-invalido');
  });
});