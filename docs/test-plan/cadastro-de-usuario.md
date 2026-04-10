# Plano de Teste  

**Projeto:** BugBank – Aplicação Web de Gerenciamento de Contas  
**Versão da Aplicação:** 1.0 (https://bugbank.netlify.app/)  
**Data:** 09/04/2026  
**Responsável pelo Plano:** QA Lead – *[Seu Nome]*  

---  

## 1. Objetivo  

Garantir que as funcionalidades críticas de **criação de conta** e **autenticação** da aplicação BugBank atendam aos requisitos funcionais, de usabilidade e de segurança, proporcionando uma experiência confiável ao usuário final. O plano visa identificar, registrar e validar defeitos antes da liberação para produção.

## 2. Escopo  

| **Incluído no Escopo** | **Excluído do Escopo** |
|------------------------|------------------------|
| • Criação de conta (campos nome, e‑mail, senha, saldo inicial).<br>• Validação de campos obrigatórios.<br>• Fluxo de login (sucesso e falha).<br>• Mensagens de feedback ao usuário.<br>• Compatibilidade com os navegadores Chrome, Firefox e Edge (versões atuais). | • Integração com APIs externas (ex.: serviços de pagamento).<br>• Testes de performance sob carga pesada.<br>• Testes de acessibilidade avançada (WCAG 2.2).<br>• Funcionalidades não relacionadas ao módulo de contas (ex.: relatórios, exportação de dados). |

## 3. Estratégia de Testes  

1. **Abordagem de Teste**  
   - **Teste Manual Exploratório** para validar fluxos de UI e mensagens de erro.  
   - **Teste de Regressão Automatizado** (Cypress) para garantir que alterações não quebrem funcionalidades existentes.  

2. **Níveis de Teste**  
   - **Teste de Unidade** (cobertura mínima nas funções de validação de formulário).  
   - **Teste de Integração** (integração front‑end ↔︎ back‑end mock).  
   - **Teste de Sistema** (cenários end‑to‑end descritos abaixo).  

3. **Critérios de Prioridade**  
   - **Alta** – Criação de conta e login bem‑sucedido.  
   - **Média** – Validação de campos obrigatórios, mensagens de erro.  
   - **Baixa** – Layout responsivo em dispositivos móveis (fora do escopo principal).  

4. **Ferramentas**  
   - **Gestão de Testes:** TestRail / Azure DevOps.  
   - **Automação UI:** Cypress (JavaScript).  
   - **Bug Tracking:** Jira.  
   - **Ambiente de Execução:** Docker containers com Chrome Headless.  

## 4. Tipos de Teste  

| Tipo de Teste | Descrição | Ferramenta(s) |
|---------------|-----------|---------------|
| **Funcional** | Verifica se a aplicação executa as funções de criação de conta e login conforme especificado. | Cypress, Selenium |
| **Usabilidade** | Avalia clareza das mensagens, consistência visual e fluxo intuitivo. | Testes manuais + Heurísticas Nielsen |
| **Segurança (Básica)** | Confirma que senhas são mascaradas, e que dados sensíveis não são expostos no console. | OWASP ZAP (varredura rápida) |
| **Compatibilidade** | Testa a aplicação nos navegadores suportados. | BrowserStack (ou Selenium Grid) |
| **Regressão** | Reexecuta casos críticos a cada build. | Cypress (pipeline CI/CD) |

## 5. Ambiente de Teste  

| **Componente** | **Versão / Configuração** |
|----------------|---------------------------|
| Sistema Operacional | Windows 10/11, macOS Ventura |
| Navegadores | Chrome 124, Firefox 124, Edge 124 |
| Servidor Web | Netlify (deploy de preview) |
| Backend (Mock) | JSON Server (porta 3001) |
| Banco de Dados (Mock) | In‑memory (SQLite) |
| Ferramentas CI/CD | GitHub Actions (pipeline de teste) |
| Rede | Conexão internet padrão (latência < 100 ms) |

## 6. Critérios de Entrada  

- Requisitos funcionais aprovados e disponíveis no repositório de documentos.  
- Build da aplicação implantada no ambiente **Staging** (https://bugbank.netlify.app/) com tag **v1.0‑staging**.  
- Dados de teste (contas de usuário fictícias) preparados e validados.  
- Ambiente de teste configurado e acessível a todos os membros da equipe QA.  
- Scripts de automação revisados e versionados no repositório **/tests**.  

## 7. Critérios de Saída  

- **Cobertura de Testes:** ≥ 90 % dos casos de teste críticos executados com sucesso.  
- **Defeitos críticos (Severidade ≥ 1)**: Zero defeitos abertos. Defeitos de severidade 2 devem ter status **Resolved** ou **Deferred** com justificativa.  
- **Relatório de Teste** entregue e aprovado pelo Product Owner e pelo Lead de Desenvolvimento.  
- **Build** marcado como **Ready for Release** no pipeline de CI/CD.  

## 8. Riscos  

| **Risco** | **Impacto** | **Probabilidade** | **Mitigação** |
|-----------|-------------|-------------------|---------------|
| Instabilidade do serviço de mock backend | Falha nos testes de integração | Média | Utilizar mock estático e validar endpoints antes da execução. |
| Alteração de requisitos durante a sprint | Re‑planejamento de casos de teste | Alta | Reuniões diárias de alinhamento (stand‑up) e controle de mudanças via Jira. |
| Limitações de recursos de hardware nos agentes CI | Execução lenta ou timeout | Baixa | Escalar agentes temporariamente ou usar paralelismo nas execuções Cypress. |
| Dados sensíveis reais inseridos acidentalmente | Violação de privacidade | Baixa | Utilizar apenas dados fictícios e validar máscaras de senha. |

## 9. Cronograma  

| **Atividade** | **Responsável** | **Data Início** | **Data Término** | **Entregáveis** |
|---------------|-----------------|-----------------|------------------|-----------------|
| Preparação do ambiente de teste | QA Engineer | 02/04/2026 | 04/04/2026 | Ambiente configurado, scripts de mock. |
| Criação e revisão dos casos de teste | QA Lead & Analista | 05/04/2026 | 07/04/2026 | Documento de casos de teste (TestRail). |
| Execução de testes manuais (Cenário 1‑4) | QA Engineer | 08/04/2026 | 09/04/2026 | Relatório de execução manual. |
| Automação dos cenários críticos (Cypress) | Automation Engineer | 08/04/2026 | 10/04/2026 | Scripts automatizados no repositório. |
| Execução de regressão automatizada (CI) | DevOps | 11/04/2026 | 12/04/2026 | Log de pipeline, artefatos de teste. |
| Análise de resultados e reporte de defeitos | QA Lead | 12/04/2026 | 13/04/2026 | Dashboard de defeitos, relatório consolidado. |
| Revisão final e aprovação para release | PO & Lead Dev | 14/04/2026 | 15/04/2026 | Plano de Teste assinado, build “Release Ready”. |

---  

## 10. Casos de Teste (Resumo)

| **ID** | **Cenário** | **Pré‑condição** | **Passos** | **Resultado Esperado** | **Criticidade** |
|--------|-------------|-------------------|------------|------------------------|-----------------|
| TC‑001 | Criar conta com dados válidos | Aplicação em tela de cadastro | 1. Preencher **Nome** = *Ton Santos* <br>2. Preencher **E‑mail** = *ailtonsanntos@gmail.com* <br>3. Preencher **Senha** = *@Admin123* <br>4. Preencher **Saldo Inicial** = *1000* <br>5. Clicar em **Criar Conta** | Conta criada com sucesso, mensagem “Conta criada com sucesso”, redirecionamento para tela de login. | Alta |
| TC‑002 | Validação de campos obrigatórios – Nome vazio | Tela de cadastro | 1. Deixar campo **Nome** vazio <br>2. Preencher demais campos com valores válidos <br>3. Clicar em **Criar Conta** | Mensagem de erro “Nome é obrigatório”. Conta não é criada. | Média |
| TC‑003 | Validação de campos obrigatórios – E‑mail vazio | Tela de cadastro | 1. Deixar campo **E‑mail** vazio <br>2. Preencher demais campos com valores válidos <br>3. Clicar em **Criar Conta** | Mensagem de erro “E‑mail é obrigatório”. | Média |
| TC‑004 | Validação de campos obrigatórios – Senha vazia | Tela de cadastro | 1. Deixar campo **Senha** vazio <br>2. Preencher demais campos com valores válidos <br>3. Clicar em **Criar Conta** | Mensagem de erro “Senha é obrigatória”. | Média |
| TC‑005 | Login com sucesso | Conta criada no TC‑001 | 1. Inserir **E‑mail** = *ailtonsanntos@gmail.com* <br>2. Inserir **Senha** = *@Admin123* <br>3. Clicar em **Entrar** | Redirecionamento para dashboard, exibição do saldo inicial (1000). | Alta |
| TC‑006 | Login inválido – senha errada | Conta criada no TC‑001 | 1. Inserir **E‑mail** = *ailtonsanntos@gmail.com* <br>2. Inserir **Senha** = *senhaErrada* <br>3. Clicar em **Entrar** | Mensagem de erro “Credenciais inválidas”. Usuário permanece na tela de login. | Alta |
| TC‑007 | Login inválido – e‑mail não cadastrado | Nenhuma conta com este e‑mail | 1. Inserir **E‑mail** = *naoexiste@exemplo.com* <br>2. Inserir **Senha** = *qualquer* <br>3. Clicar em **Entrar** | Mensagem de erro “Credenciais inválidas”. | Alta |

> **Observação:** Todos os casos acima serão implementados em scripts Cypress (`cypress/integration/bugbank.spec.js`) e vinculados ao pipeline de CI para execução automática a cada *pull request*.

---  

**Aprovações**

| **Nome** | **Cargo** | **Assinatura** | **Data** |
|----------|-----------|----------------|----------|
| Ailton Santos | QA Lead |  | 10/04/2026 |
| ___________________ | Product Owner |  | 09/04/2026 |
| ___________________ | Development Lead |  | 09/04/2026 |

---  

*Este plano de teste está sujeito a revisões conforme a evolução do projeto e a descoberta de novos requisitos.*