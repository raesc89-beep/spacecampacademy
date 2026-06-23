// process-ichthy-new.js — removes white bg from new ichthyosaurus and saves to assets
const sharp = require('sharp');
const path = require('path');

const SRC = 'C:\\Users\\raesc\\.gemini\\antigravity\\brain\\bb38df92-874f-4d26-95a0-10ce41029c60\\ichthyosaurus_realistic_1781792744276.png';
const DST = path.join(__dirname, '../public/assets/reptiles_marinos/ichthyosaurus_swim.png');
const THRESHOLD = 30;

async function run() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
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

  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(DST);

  console.log(`✓ New ichthyosaurus saved: ${DST} (${width}x${height})`);
}

run().catch(console.error);
