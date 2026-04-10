# Plano de Testes – BugBank  
**Aplicação:** https://bugbank.netlify.app/  
**Versão:** 1.0.0  
**Data:** 09/04/2026  
**Responsável:** Analista de Testes QA Sênior  

---  

## Sumário de Casos de Teste  

| ID | Título | Tipo | Prioridade | Cobertura |
|----|--------|------|------------|-----------|
| CT-001 | Criação de Conta – Dados Válidos | Funcional | Alta | Cenário 1 |
| CT-002 | Criação de Conta – Campos Obrigatórios (Vazio) | Negativo | Alta | Cenário 2 |
| CT-003 | Criação de Conta – Validação de Email Inválido | Negativo | Média | Cenário 2 |
| CT-004 | Criação de Conta – Validação de Senha Fraca | Negativo | Média | Cenário 2 |
| CT-005 | Criação de Conta – Email já cadastrado | Negativo | Alta | Cenário 2 |
| CT-006 | Login – Credenciais Válidas | Funcional | Alta | Cenário 3 |
| CT-007 | Login – Senha Incorreta | Negativo | Alta | Cenário 4 |
| CT-008 | Login – Email Não Cadastrado | Negativo | Alta | Cenário 4 |
| CT-009 | Login – Campos Obrigatórios (Vazio) | Negativo | Média | Cenário 4 |
| CT-010 | Logout – Encerramento de Sessão | Funcional | Média | Fluxo pós‑login |

---  

## Detalhamento dos Casos de Teste  

### CT-001 – Criação de Conta – Dados Válidos  
**Pré‑condições:**  
- O usuário está na página inicial da aplicação.  
- Não existe conta cadastrada com o e‑mail **ailtonsanntos@gmail.com**.  

**Passos:**  
1. Clicar no link **“Criar Conta”**.  
2. Preencher o campo **Nome** com `Ton Santos`.  
3. Preencher o campo **E‑mail** com `ailtonsanntos@gmail.com`.  
4. Preencher o campo **Senha** com `@Admin123`.  
5. Confirmar a senha (campo “Repetir Senha”) com `@Admin123`.  
6. Clicar no botão **“Cadastrar”**.  

**Resultado Esperado:**  
- Mensagem de sucesso exibida: *“Conta criada com sucesso! Você será redirecionado para a página de login.”*  
- O usuário é redirecionado automaticamente para a tela de login.  
- Os dados são persistidos no back‑end (verificável via API ou banco de dados).  

**Prioridade:** Alta  
**Tipo:** Funcional  

---  

### CT-002 – Criação de Conta – Campos Obrigatórios (Vazio)  
**Pré‑condições:**  
- Usuário na tela de cadastro.  

**Passos:**  
1. Deixar todos os campos em branco.  
2. Clicar em **“Cadastrar”**.  

**Resultado Esperado:**  
- Cada campo obrigatório exibe mensagem de validação:  
  - Nome: *“Campo obrigatório”*  
  - E‑mail: *“Campo obrigatório”*  
  - Senha: *“Campo obrigatório”*  
  - Repetir Senha: *“Campo obrigatório”*  
- O formulário não é submetido.  

**Prioridade:** Alta  
**Tipo:** Negativo  

---  

### CT-003 – Criação de Conta – Validação de Email Inválido  
**Pré‑condições:**  
- Usuário na tela de cadastro.  

**Passos:**  
1. Preencher **Nome** com qualquer texto válido.  
2. Preencher **E‑mail** com `ton.santos[at]mail` (formato inválido).  
3. Preencher **Senha** e **Repetir Senha** com `@Admin123`.  
4. Clicar em **“Cadastrar”**.  

**Resultado Esperado:**  
- Mensagem de erro ao lado do campo e‑mail: *“Informe um e‑mail válido.”*  
- O formulário não é enviado.  

**Prioridade:** Média  
**Tipo:** Negativo  

---  

### CT-004 – Criação de Conta – Validação de Senha Fraca  
**Pré‑condições:**  
- Usuário na tela de cadastro.  

**Passos:**  
1. Preencher **Nome** e **E‑mail** com dados válidos.  
2. Preencher **Senha** com `12345` (não atende requisitos de complexidade).  
3. Preencher **Repetir Senha** com `12345`.  
4. Clicar em **“Cadastrar”**.  

**Resultado Esperado:**  
- Mensagem de erro ao lado do campo senha: *“A senha deve conter ao menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e um caractere especial.”*  
- O formulário não é enviado.  

**Prioridade:** Média  
**Tipo:** Negativo  

---  

### CT-005 – Criação de Conta – Email já cadastrado  
**Pré‑condições:**  
- Conta já existente com e‑mail **ailtonsanntos@gmail.com** (criada a partir do CT-001).  

**Passos:**  
1. Acessar a tela de cadastro.  
2. Preencher **Nome** com `Outro Usuário`.  
3. Preencher **E‑mail** com `ailtonsanntos@gmail.com`.  
4. Preencher **Senha** e **Repetir Senha** com `@Admin123`.  
5. Clicar em **“Cadastrar”**.  

**Resultado Esperado:**  
- Mensagem de erro: *“Este e‑mail já está cadastrado. Por favor, utilize outro e‑mail ou recupere sua senha.”*  
- O cadastro não é concluído.  

**Prioridade:** Alta  
**Tipo:** Negativo  

---  

### CT-006 – Login – Credenciais Válidas  
**Pré‑condições:**  
- Conta já criada com e‑mail **ailtonsanntos@gmail.com** e senha **@Admin123**.  
- Usuário na página de login.  

**Passos:**  
1. Inserir **E‑mail**: `ailtonsanntos@gmail.com`.  
2. Inserir **Senha**: `@Admin123`.  
3. Clicar no botão **“Entrar”**.  

**Resultado Esperado:**  
- Redirecionamento para a página **Dashboard** (ex.: `/dashboard`).  
- Exibição do nome do usuário no cabeçalho: *“Olá, Ton Santos”.*  
- Token de sessão armazenado (cookie ou localStorage).  

**Prioridade:** Alta  
**Tipo:** Funcional  

---  

### CT-007 – Login – Senha Incorreta  
**Pré‑condições:**  
- Conta existente com e‑mail **ailtonsanntos@gmail.com**.  

**Passos:**  
1. Inserir **E‑mail**: `ailtonsanntos@gmail.com`.  
2. Inserir **Senha**: `senhaErrada!`.  
3. Clicar em **“Entrar”**.  

**Resultado Esperado:**  
- Mensagem de erro: *“E‑mail ou senha inválidos. Tente novamente.”*  
- O usuário permanece na tela de login.  

**Prioridade:** Alta  
**Tipo:** Negativo  

---  

### CT-008 – Login – Email Não Cadastrado  
**Pré‑condições:**  
- Nenhuma conta com e‑mail `naoexiste@exemplo.com`.  

**Passos:**  
1. Inserir **E‑mail**: `naoexiste@exemplo.com`.  
2. Inserir **Senha**: `QualquerSenha1!`.  
3. Clicar em **“Entrar”**.  

**Resultado Esperado:**  
- Mensagem de erro: *“E‑mail ou senha inválidos. Tente novamente.”*  
- Não há criação automática de conta.  

**Prioridade:** Alta  
**Tipo:** Negativo  

---  

### CT-009 – Login – Campos Obrigatórios (Vazio)  
**Pré‑condições:**  
- Usuário na tela de login.  

**Passos:**  
1. Deixar os campos **E‑mail** e **Senha** vazios.  
2. Clicar em **“Entrar”**.  

**Resultado Esperado:**  
- Mensagens de validação:  
  - E‑mail: *“Campo obrigatório”.*  
  - Senha: *“Campo obrigatório”.*  
- O formulário não é submetido.  

**Prioridade:** Média  
**Tipo:** Negativo  

---  

### CT-010 – Logout – Encerramento de Sessão  
**Pré‑condições:**  
- Usuário autenticado e visualizando a **Dashboard**.  

**Passos:**  
1. Clicar no ícone ou link **“Sair”** no menu superior.  
2. Confirmar a ação, se houver modal de confirmação.  

**Resultado Esperado:**  
- Usuário é redirecionado para a página de login.  
- Token de sessão removido (cookie/localStorage limpo).  
- Tentativa de acesso direto a `/dashboard` redireciona novamente para login.  

**Prioridade:** Média  
**Tipo:** Funcional  

---  

## Observações Gerais  

1. **Ambiente de Execução:**  
   - Navegadores suportados: Chrome (última versão), Firefox (última versão), Edge.  
   - Resolução mínima: 1366 × 768.  

2. **Critérios de Aceite:**  
   - Todos os casos acima devem ser executados com sucesso (pass) antes da liberação da versão.  
   - Defeitos críticos (bloqueantes) devem ser corrigidos e re‑testados.  

3. **Ferramentas de Apoio:**  
   - **Postman** ou **Insomnia** para validação de APIs (verificação de persistência).  
   - **Chrome DevTools** para inspeção de cookies/localStorage.  
   - **Jira** para registro de bugs.  

4. **Rastreabilidade:**  
   - Cada caso de teste está mapeado ao requisito funcional correspondente (RF‑01 a RF‑05).  

---  

*Documento preparado por:*  
**Ailton Santos** – Analista de Testes QA
**E‑mail:** seu.email@empresa.com  
**Telefone:** (xx) xxxx‑xxxx