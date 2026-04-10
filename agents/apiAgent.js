import fs from "fs-extra";
import path from "path";
import { callAI } from "../services/groqService.js";

export async function generateAPITests({ url, scenarios, fileName }) {
const safeFileName = fileName
.toLowerCase()
.replace(/\s+/g, "-")
.replace(/[^a-z0-9\-]/g, "");

const prompt = `
Você é um especialista em testes de API com Cypress.
Base URL: ${url}

Cenários:
${scenarios}

Regras:
1. Usar Cypress (cy.request)
2. Criar describe e it
3. Validar status HTTP
4. Validar estrutura JSON
5. Usar expect()
6. Adicionar cy.log()
7. Adicionar cy.screenshot()
8. Código funcional
9. Não explicar, apenas código
10. Não usar markdown
`;

console.log("🤖 Gerando testes de API com IA...");
let testCode = await callAI(prompt);
testCode = testCode
.replace(/```javascript/g, "")
.replace(/```js/g, "")
.replace(/```/g, "")
.trim();
const testPath = path.join("cypress", "e2e", `${safeFileName}.cy.js`);
await fs.outputFile(testPath, testCode);
console.log(`✅ Teste de API gerado com sucesso: ${testPath}`);
}