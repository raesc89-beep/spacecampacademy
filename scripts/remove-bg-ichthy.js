// remove-bg-ichthy.js — removes white background from ichthyosaurus using temp file
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ASSETS = path.join(__dirname, '../public/assets/reptiles_marinos');
const THRESHOLD = 30;

async function removeWhiteBg(inputPath, outputPath) {
  const img = sharp(inputPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
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
    .toFile(outputPath);

  console.log(`✓ Done: ${path.basename(outputPath)} (${width}x${height})`);
}

async function run() {
  const src = path.join(ASSETS, 'ichthyosaurus_swim.png');
  const tmp = path.join(ASSETS, 'ichthyosaurus_swim_nobg.png');
  
  await removeWhiteBg(src, tmp);
  
  // Replace original
  fs.copyFileSync(tmp, src);
  fs.unlinkSync(tmp);
  console.log('Replaced original with transparent version.');
}

run().catch(console.error);
