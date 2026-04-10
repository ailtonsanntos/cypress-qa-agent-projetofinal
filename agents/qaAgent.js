import fs from "fs-extra";
import path from "path";
import { callAI } from "../services/groqService.js";
export async function generateQAArtifacts({ url, scenarios, fileName }) {
const safeFileName = fileName
.toLowerCase()
.replace(/\s+/g, "-")
.replace(/[^a-z0-9\-]/g, "");
const testPrompt = `
Você é um especialista em automação de testes com Cypress.
Gere um teste E2E para:
URL: ${url}

Cenários:
${scenarios}
Regras:
- Usar Cypress (JavaScript)
- Usar describe e it
- Sempre usar cy.visit("${url}")
- Criar asserts reais
- Usar cy.screenshot() como evidência
- Código limpo e executável
- Não usar markdown
- Não explicar, apenas código
`;
let testCode = await callAI(testPrompt);
testCode = testCode
.replace(/```javascript/g, "")
.replace(/```js/g, "")
.replace(/```/g, "")
.trim();
const testPath = path.join("cypress", "e2e", `${safeFileName}.cy.js`);
await fs.outputFile(testPath, testCode);
const testCasePrompt = `
Você é um Analista de Testes QA Sênior.
Crie um documento profissional de CASOS DE TESTE em Markdown.
Sistema: ${url}
Cenários:
${scenarios}
Formato:
## CT-001 - Título
**Pré-condições:**
...
**Passos:**
1.
2.
**Resultado Esperado:**
...
**Prioridade:** Alta/Média/Baixa
**Tipo:** Funcional/Negativo/Usabilidade
Gere múltiplos casos, bem estruturados.
`;
let testCases = await callAI(testCasePrompt);
testCases = testCases.replace(/```markdown/g, "").replace(/```/g,
"").trim();
const testCasesPath = path.join("docs", "test-cases",
`${safeFileName}.md`);
await fs.outputFile(testCasesPath, testCases);
const testPlanPrompt = `
Você é um QA Lead.
Crie um PLANO DE TESTE profissional em Markdown.
Sistema: ${url}
Cenários:
${scenarios}
Estrutura obrigatória:
# Plano de Teste
## Objetivo
## Escopo
## Estratégia de Testes
## Tipos de Teste
## Ambiente de Teste
## Critérios de Entrada
## Critérios de Saída
## Riscos
## Cronograma
Seja formal, claro e corporativo.
`;
let testPlan = await callAI(testPlanPrompt);
testPlan = testPlan.replace(/```markdown/g, "").replace(/```/g,
"").trim();
const testPlanPath = path.join("docs", "test-plan",
`${safeFileName}.md`);
await fs.outputFile(testPlanPath, testPlan);
console.log("\n✅ Artefatos gerados com sucesso:\n");
console.log("🧪 Teste Cypress:", testPath);
console.log("📄 Casos de Teste:", testCasesPath);
console.log("📘 Plano de Teste:", testPlanPath);
}
