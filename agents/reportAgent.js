import fs from "fs-extra";
import path from "path";
import { callAI } from "../services/groqService.js";

function extractSummary(data) {
  const stats = data.stats || {};
  const tests = (data.results || []).flatMap(r =>
    (r.suites || []).flatMap(s =>
      (s.tests || []).map(t => ({
        title: t.title,
        status: t.state,
        duration: t.duration || 0,
        error: t.err?.message || null,
        suite: s.title
      }))
    )
  );

  return {
    total: stats.tests || 0,
    passed: stats.passes || 0,
    failed: stats.failures || 0,
    pending: stats.pending || 0,
    duration: stats.duration || 0,
    tests
  };
}

function card(title, value, color = "", highlight = false) {
  return `
  <div class="col-md-2">
    <div class="card p-3 shadow ${color ? 'text-' + color : ''} ${highlight ? 'bg-' + color + ' text-white' : ''}">
      <h6>${title}</h6>
      <h3>${value}</h3>
    </div>
  </div>`;
}

function badge(status) {
  return status === 'passed'
    ? '<span class="badge bg-success">PASSOU</span>'
    : '<span class="badge bg-danger">FALHOU</span>';
}

function generateHTML(summary, aiAnalysis) {
  const generalStatus = summary.failed > 0 ? "CRÍTICO" : "SAUDÁVEL";
  const statusColor = summary.failed > 0 ? "danger" : "success";

  return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Dashboard QA</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<style>
body { background: #f4f6f9; }
.header { background: linear-gradient(135deg, #0d6efd, #0a58ca); color: white; padding: 30px; border-radius: 0 0 20px 20px; }
.card { border-radius: 12px; }
</style>
</head>
<body>
<div class="header text-center">
  <h1>📊 Dashboard de Testes</h1>
  <p>Relatório automatizado com IA</p>
</div>
<div class="container mt-4">
  <div class="row text-center mb-4">
    ${card("Total", summary.total)}
    ${card("Passou", summary.passed, "success")}
    ${card("Falhou", summary.failed, "danger")}
    ${card("Pendentes", summary.pending, "warning")}
    ${card("Duração (s)", (summary.duration / 1000).toFixed(1))}
    ${card("Status", generalStatus, statusColor, true)}
  </div>
  <div class="row mb-4">
    <div class="col-md-6">
      <div class="card p-3 shadow">
        <h5>📊 Distribuição</h5>
        <canvas id="pizza"></canvas>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card p-3 shadow">
        <h5>📈 Execução</h5>
        <canvas id="barra"></canvas>
      </div>
    </div>
  </div>
  <div class="card shadow mb-4">
    <div class="card-body">
      <h4>🤖 Análise da IA</h4>
      <pre style="white-space: pre-wrap;">${aiAnalysis}</pre>
    </div>
  </div>
  <div class="card shadow mb-4">
    <div class="card-body">
      <h4>🧪 Casos de Teste</h4>
      <table class="table table-hover">
        <thead class="table-dark">
          <tr><th>Suite</th><th>Cenário</th><th>Status</th><th>Duração</th><th>Erro</th></tr>
        </thead>
        <tbody>
          ${summary.tests.map(t => `<tr><td>${t.suite}</td><td>${t.title}</td><td>${badge(t.status)}</td><td>${t.duration} ms</td><td>${t.error || '-'}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>
<script>
new Chart(document.getElementById('pizza'), { type: 'pie', data: { labels: ['Passou','Falhou','Pendentes'], datasets: [{ data: [${summary.passed}, ${summary.failed}, ${summary.pending}], backgroundColor: ['#198754', '#dc3545', '#ffc107'] }] } });
new Chart(document.getElementById('barra'), { type: 'bar', data: { labels: ['Passou','Falhou','Pendentes'], datasets: [{ label: 'Testes', data: [${summary.passed}, ${summary.failed}, ${summary.pending}], backgroundColor: ['#198754', '#dc3545', '#ffc107'] }] } });
</script>
</body>
</html>`;
}

export async function generateAIReport() {
  const reportsDir = path.join("cypress", "reports");
  try {
    if (!(await fs.pathExists(reportsDir))) {
      console.log(`❌ Pasta de relatórios ${reportsDir} não encontrada.`);
      console.log("Certifique-se de que os testes foram executados e o arquivo JSON gerado.");
      return;
    }

    const files = await fs.readdir(reportsDir);
    const jsonFiles = files.filter(f => f.endsWith(".json"));

    if (jsonFiles.length === 0) {
      console.log("❌ Nenhum arquivo JSON de relatório encontrado.");
      return;
    }

    console.log(`📊 Consolidadando ${jsonFiles.length} arquivos de relatório...`);
    
    const globalSummary = {
      total: 0, passed: 0, failed: 0, pending: 0, duration: 0, tests: []
    };

    for (const file of jsonFiles) {
      const data = await fs.readJson(path.join(reportsDir, file));
      const summary = extractSummary(data);
      
      globalSummary.total += summary.total;
      globalSummary.passed += summary.passed;
      globalSummary.failed += summary.failed;
      globalSummary.pending += summary.pending;
      globalSummary.duration += summary.duration;
      globalSummary.tests.push(...summary.tests);
    }

    console.log("🤖 IA analisando resultados...");
    const prompt = `Analise os resultados de testes e gere um relatório executivo destacando falhas críticas: ${JSON.stringify(globalSummary)}`;
    const aiAnalysis = await callAI(prompt);

    const html = generateHTML(globalSummary, aiAnalysis);
    await fs.outputFile("relatorio.html", html);
    console.log("🎉 Dashboard gerado: relatorio.html");
  } catch (error) {
    console.error("❌ Erro ao gerar relatório:", error.message);
  }
}