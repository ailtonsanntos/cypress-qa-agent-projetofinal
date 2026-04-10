import fs from "fs-extra";
import path from "path";
import { callAI } from "../services/groqService.js";
export async function generateCypressTests({ url, scenarios, fileName })
{
const safeFileName = fileName
.toLowerCase()
.replace(/\s+/g, "-")
.replace(/[^a-z0-9\-]/g, "");
const prompt = `
Você é um especialista em automação de testes com Cypress.
Gere um arquivo de teste E2E para a URL:
${url}
Cenários:
${scenarios}
Regras obrigatórias:
- Usar Cypress (JavaScript)
- Usar describe e it
- Sempre usar cy.visit("${url}")
- Criar asserts relevantes
- Usar cy.screenshot() para evidência
- Nome do arquivo: ${safeFileName}
- Não escrever explicações, apenas código
`;
let code = await callAI(prompt);

// 🔥 limpeza básica
code = code
.replace(/```javascript/g, "")
.replace(/```js/g, "")
.replace(/```/g, "")
.trim();
const filePath = path.join("cypress", "e2e", `${safeFileName}.cy.js`);
await fs.outputFile(filePath, code);
console.log(`✅ Teste gerado em: ${filePath}`);
return filePath;
}