const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public/assets');

async function processImages() {
  const files = fs.readdirSync(directoryPath);
  const cartoonFiles = files.filter(f => f.startsWith('cartoon_') && f.endsWith('.png'));

  for (const file of cartoonFiles) {
    console.log(`Processing ${file}...`);
    const filePath = path.join(directoryPath, file);
    try {
      const image = await Jimp.read(filePath);
      
      // We will loop through all pixels. If red, green, and blue are very low (e.g. < 25), make them transparent.
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        
        // El negro de las IA suele ser sucio (ej. rgb 15, 15, 18).
        if (red < 35 && green < 35 && blue < 35) {
           this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
        }
      });
      
      const outPath = path.join(directoryPath, file); // overwrite
      await image.writeAsync(outPath);
      console.log(`Saved transparent ${file}`);
    } catch(e) {
      console.error('Error processing', file, e);
    }
  }
}

processImages();
