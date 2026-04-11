const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");

const publicAssets = path.join(__dirname, "public", "assets");
const filesToProcess = [
  "black_hole_icon.png",
  "quasar_icon.png",
  "pulsar_icon.png",
  "red_dwarf_icon.png",
  "white_dwarf_icon.png",
  "wormhole_icon.png"
];

async function processImages() {
  for (const file of filesToProcess) {
    const filePath = path.join(publicAssets, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file}, not found.`);
      continue;
    }
    
    console.log(`Processing ${file}...`);
    try {
      const image = await Jimp.read(filePath);
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        
        // Anti-aliased pure black detection
        const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        
        if (luminosity < 12) {
          // Pure black -> 100% transparent
          this.bitmap.data[idx + 3] = 0;
        } else if (luminosity < 30) {
          // Near black -> semi transparent
          const fade = Math.floor(((luminosity - 12) / 18) * 255);
          this.bitmap.data[idx + 3] = fade;
        }
      });

      await image.writeAsync(filePath);
      console.log(`✓ Completely removed background for ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processImages();
