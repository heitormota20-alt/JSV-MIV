const puppeteer = require('puppeteer');
const path = require('path');

const W = 1200, H = 630;

(async () => {
  console.log('Gerando og-image...');
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: W, height: H, deviceScaleFactor: 2 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Esconde UI
  await page.evaluate(() => {
    ['#counter','.arrows','#progress','.sb-wrap'].forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.display = 'none';
    });
  });

  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, 'og-image.jpg'), type: 'jpeg', quality: 95, fullPage: false });
  await browser.close();
  console.log('✅ og-image.jpg gerado em 1200×630 (@2x)');
})();
