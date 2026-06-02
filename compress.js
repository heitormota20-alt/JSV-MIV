const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS = './Assets';
const targets = [
  // PNGs grandes → converte para WebP
  { in: 'Gemini_Generated_Image_dmp7i0dmp7i0dmp7.png', out: 'Gemini_Generated_Image_dmp7i0dmp7i0dmp7.webp', q: 82 },
  { in: 'ChatGPT Image 26_05_2026, 23_35_15.png',       out: 'ChatGPT_Image_26_05_2026.webp',               q: 82 },
  // WebPs existentes → recomprime
  { in: 'content.webp',                               out: 'content.webp',                               q: 78 },
  { in: 'ChatGPT_Image_14_05_2026_23_14_35_8.webp',  out: 'ChatGPT_Image_14_05_2026_23_14_35_8.webp',  q: 78 },
  { in: 'ChatGPT_Image_14_05_2026_23_14_33_3.webp',  out: 'ChatGPT_Image_14_05_2026_23_14_33_3.webp',  q: 78 },
  { in: 'ChatGPT_Image_14_05_2026_23_14_33_4.webp',  out: 'ChatGPT_Image_14_05_2026_23_14_33_4.webp',  q: 78 },
  { in: 'ChatGPT_Image_14_05_2026_23_14_34_5.webp',  out: 'ChatGPT_Image_14_05_2026_23_14_34_5.webp',  q: 78 },
  { in: 'ChatGPT_Image_14_05_2026_23_14_34_6.webp',  out: 'ChatGPT_Image_14_05_2026_23_14_34_6.webp',  q: 78 },
];

async function run() {
  for (const t of targets) {
    const inPath  = path.join(ASSETS, t.in);
    const outPath = path.join(ASSETS, t.out);
    const before = fs.statSync(inPath).size;
    const buf = await sharp(inPath).webp({ quality: t.q }).toBuffer();
    const after = buf.length;
    if (after < before) {
      fs.writeFileSync(outPath, buf);
      console.log(`✓ ${t.out}: ${kb(before)} → ${kb(after)} (${pct(before, after)}% menor)`);
    } else {
      console.log(`~ ${t.in}: já está otimizado (${kb(before)})`);
    }
  }
}

const kb  = n => (n/1024).toFixed(0) + 'KB';
const pct = (a,b) => (((a-b)/a)*100).toFixed(0);

run().catch(console.error);
