const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const W = 1920, H = 1080;
const DELAY_TRANS = 650;   // wait after each navigation
const DELAY_LOAD  = 2500;  // initial load wait

(async () => {
  console.log('Iniciando Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: W, height: H },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-device-scale-factor=1']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

  console.log('Abrindo apresentação...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await wait(DELAY_LOAD);

  const shots = []; // base64 strings

  async function capture(label) {
    await wait(DELAY_TRANS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92, fullPage: false });
    shots.push(buf.toString('base64'));
    console.log(`  ✓ ${label} (${shots.length})`);
  }

  async function clickNext() {
    await page.click('#next');
  }

  // ── Slide 01 ──────────────────────────────────────
  await capture('01 - Capa');

  // ── Slides 02 a 09 ────────────────────────────────
  const labels02a09 = ['02 - Objetivo','03 - MVV','04 - Produto','05 - Conceito do Logo',
                        '06 - Grid','07 - Construção','08 - Iconografia','09 - App Icons'];
  for (const lbl of labels02a09) {
    await clickNext();
    await capture(lbl);
  }

  // ── Slide 10 — 3 painéis de cor ───────────────────
  await clickNext();
  await capture('10 - Cores: Azul JSV');
  await clickNext();
  await capture('10 - Cores: Laranja JSV');
  await clickNext();
  await capture('10 - Cores: Branco');

  // ── Slide 11 — 2 painéis de tipografia ────────────
  await clickNext();
  await capture('11 - Tipografia: Saira');
  await clickNext();
  await capture('11 - Tipografia: Inter');

  // ── Slides 12 a 19 ────────────────────────────────
  const labels12a19 = ['12 - Usos Incorretos','13 - MVV Detalhado','14 - Posicionamento',
                        '15 - Tom de Voz','16 - Social Mídia','17 - Uniformes',
                        '18 - Aplicações','19 - Ambientação'];
  for (const lbl of labels12a19) {
    await clickNext();
    await capture(lbl);
  }

  await browser.close();

  // ── Gerar PDF ──────────────────────────────────────
  console.log(`\nGerando PDF com ${shots.length} páginas...`);

  const pages = shots.map(b64 => `
    <div class="pg">
      <img src="data:image/jpeg;base64,${b64}">
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
