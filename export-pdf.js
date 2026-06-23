const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const W = 1920, H = 1080;
const DELAY_TRANS = 800;
const DELAY_LOAD  = 3500;

(async () => {
  console.log('Iniciando Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: W, height: H, deviceScaleFactor: 1 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  console.log('Abrindo apresentação em localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await wait(DELAY_LOAD);

  // Esconde todos os elementos de UI que não fazem parte do slide
  await page.evaluate(() => {
    const hide = ['#counter', '.arrows', '#progress', '.sb-wrap'];
    hide.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.display = 'none';
    });
  });

  const shots = [];

  async function capture(label) {
    await wait(DELAY_TRANS);
    const buf = await page.screenshot({ type: 'png', fullPage: false });
    shots.push(buf.toString('base64'));
    console.log(`  ✓ ${String(shots.length).padStart(2,'0')} — ${label}`);
  }

  async function next() {
    await page.evaluate(() => {
      // Dispara o clique via JS para não depender de coordenadas visuais
      document.getElementById('next').click();
    });
  }

  // 01 — Capa
  await capture('Capa');

  // 02 — Objetivo
  await next(); await capture('Objetivo');

  // 03 — Missão / Visão / Valores
  await next(); await capture('Missao Visao Valores');

  // 04 — Tom de Voz
  await next(); await capture('Tom de Voz');

  // 05 — A Marca
  await next(); await capture('A Marca');

  // 06 — Conceito do Logo
  await next(); await capture('Conceito do Logo');

  // 07 — Grid
  await next(); await capture('Grid');

  // 08 — Construção
  await next(); await capture('Construcao');

  // 09 — Iconografia
  await next(); await capture('Iconografia');

  // 10 — Positivo / Negativo
  await next(); await capture('Positivo Negativo');

  // 11 — Cores (3 painéis internos)
  await next(); await capture('Cores - Azul JSV');
  await next(); await capture('Cores - Laranja JSV');
  await next(); await capture('Cores - Branco e Cinza');

  // 12 — Tipografia (2 painéis internos)
  await next(); await capture('Tipografia - Saira');
  await next(); await capture('Tipografia - Inter');

  // 13 — Capa Identidade Visual
  await next(); await capture('Capa Identidade Visual');

  // 14 — Usos Incorretos
  await next(); await capture('Usos Incorretos');

  // 15 — Posicionamento
  await next(); await capture('Posicionamento');

  // 16 — Capa Aplicações
  await next(); await capture('Capa Aplicacoes');

  // 17 a 21 — Aplicações 01–05
  for (let i = 1; i <= 5; i++) {
    await next(); await capture(`Aplicacao 0${i}`);
  }

  // 22 — Transporte
  await next(); await capture('Transporte');

  // 23 — Muito Obrigado
  await next(); await capture('Muito Obrigado');

  await browser.close();

  // Gerar PDF
  console.log(`\nGerando PDF com ${shots.length} páginas...`);

  const pages = shots.map(b64 => `
    <div class="pg">
      <img src="data:image/png;base64,${b64}">
    </div>`).join('');

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  @page{size:${W}px ${H}px;margin:0}
  html,body{width:${W}px;background:#000}
  .pg{width:${W}px;height:${H}px;page-break-after:always;overflow:hidden}
  .pg:last-child{page-break-after:avoid}
  .pg img{width:100%;height:100%;display:block;object-fit:cover}
</style>
</head>
<body>${pages}</body>
</html>`;

  const htmlPath = path.join(__dirname, '_slides_tmp.html');
  fs.writeFileSync(htmlPath, html, 'utf8');

  const browser2 = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: W, height: H },
    args: ['--no-sandbox']
  });
  const pdfPage = await browser2.newPage();
  await pdfPage.goto(`file:///${htmlPath.replace(/\\/g,'/')}`, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(__dirname, 'JSV_Brand_Guideline.pdf');
  await pdfPage.pdf({
    path: pdfPath,
    width:  `${W}px`,
    height: `${H}px`,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser2.close();
  fs.unlinkSync(htmlPath);

  console.log(`\n✅ PDF gerado: ${pdfPath}`);
})();

function wait(ms){ return new Promise(r => setTimeout(r, ms)); }
