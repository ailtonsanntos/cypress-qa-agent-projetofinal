import "dotenv/config";
import readline from "readline";
import { generateQAArtifacts } from "./agents/qaAgent.js";
import { generateAPITests } from "./agents/apiAgent.js";
import { generateAIReport } from "./agents/reportAgent.js";
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
function question(text) {
return new Promise(resolve => rl.question(text, resolve));
}
async function run() {
const choice = await question("Escolha uma opção (1: Artefatos UI, 2: API, 3: Relatório IA): ");
if (choice === "3") {
await generateAIReport();
rl.close();
return;
}
const url = await question(choice === "2" ? "🌐 Base URL: " : "🌐 URL: ");
const scenarios = await question("🧪 Cenários: ");
const fileName = await question("📄 Nome do arquivo: ");
if (choice === "2") {
await generateAPITests({ url, scenarios, fileName });
} else {
await generateQAArtifacts({ url, scenarios, fileName });
}
rl.close();
}
run();