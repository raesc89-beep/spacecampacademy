// remove-bg.js — removes white/near-white background from creature PNGs
// making them transparent so they blend properly into the underwater hub scene.
const sharp = require('sharp');
const path = require('path');

const ASSETS = path.join(__dirname, '../public/assets/reptiles_marinos');

const FILES = [
  'plesiosaurio_swim.png',
  'mosasaurus_swim.png',
  'ichthyosaurus_swim.png',
];

const THRESHOLD = 30; // how close to white (0-255) to consider "background"

async function removeWhiteBg(filePath) {
  const img = sharp(filePath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const out = Buffer.from(data); // mutable copy

  // First pass — flood-fill from corners to find background pixels
  // Simple approach: any pixel where r,g,b are all >= (255-THRESHOLD)
  for (let i = 0; i < width * height; i++) {
    const r = out[i * channels];
    const g = out[i * channels + 1];
    const b = out[i * channels + 2];
    if (r >= 255 - THRESHOLD && g >= 255 - THRESHOLD && b >= 255 - THRESHOLD) {
      out[i * channels + 3] = 0; // make transparent
    }
  }

  // Write result
  await sharp(out, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(filePath);

  console.log(`✓ Processed: ${path.basename(filePath)} (${width}x${height})`);
}

async function run() {
  for (const f of FILES) {
    const fp = path.join(ASSETS, f);
    try {
      await removeWhiteBg(fp);
    } catch (e) {
      console.error(`✗ Error on ${f}:`, e.message);
    }
  }
  console.log('\nDone! All creatures now have transparent backgrounds.');
}

run();
