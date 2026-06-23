const sharp = require('sharp');
const path = require('path');

const THRESHOLD = 30;
const ASSETS = path.join(__dirname, '../public/assets/interestelar');

const FILES = [
  { src: 'C:\\Users\\raesc\\.gemini\\antigravity\\brain\\bb38df92-874f-4d26-95a0-10ce41029c60\\asteroid_vector_1782229528666.png', dst: 'asteroid_cross.png' },
  { src: 'C:\\Users\\raesc\\.gemini\\antigravity\\brain\\bb38df92-874f-4d26-95a0-10ce41029c60\\comet_vector_1782229550428.png', dst: 'comet_cross.png' },
  { src: 'C:\\Users\\raesc\\.gemini\\antigravity\\brain\\bb38df92-874f-4d26-95a0-10ce41029c60\\oumuamua_vector_1782229572718.png', dst: 'oumuamua_cross.png' },
];

async function processFile({ src, dst }) {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);

  for (let i = 0; i < width * height; i++) {
    const r = out[i * channels];
    const g = out[i * channels + 1];
    const b = out[i * channels + 2];
    if (r >= 255 - THRESHOLD && g >= 255 - THRESHOLD && b >= 255 - THRESHOLD) {
      out[i * channels + 3] = 0;
    }
  }

  const outPath = path.join(ASSETS, dst);
  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(outPath);
  console.log(`✓ ${dst} (${width}x${height})`);
}

async function run() {
  // Ensure directory exists
  const fs = require('fs');
  if (!fs.existsSync(ASSETS)) fs.mkdirSync(ASSETS, { recursive: true });
  
  for (const f of FILES) {
    await processFile(f);
  }
  console.log('Done!');
}

run().catch(console.error);
