const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");

const publicAssets = path.join(__dirname, "public", "assets");
const filesToProcess = ["main_logo.png", "logo_nasa_auth.png"];

async function processLogos() {
  for (const file of filesToProcess) {
    const filePath = path.join(publicAssets, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file}, not found.`);
      continue;
    }
    
    console.log(`Removing white background for ${file}...`);
    try {
      const image = await Jimp.read(filePath);
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const a = this.bitmap.data[idx + 3];
        
        // Pure White Check
        if (r > 230 && g > 230 && b > 230 && a > 10) {
          // It's a white background pixel, make it transparent
          this.bitmap.data[idx + 3] = 0;
        } else if (r > 200 && g > 200 && b > 200 && a > 10) {
           // Edge smoothing for borders
           const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;
           const newAlpha = Math.floor(Math.max(0, 255 - ((luminosity - 200) * 4)));
           this.bitmap.data[idx + 3] = Math.min(a, newAlpha);
        }
      });

      await image.writeAsync(filePath);
      console.log(`✓ Cleaned white background for ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processLogos();
