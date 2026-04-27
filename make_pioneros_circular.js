const fs = require('fs');
const Jimp = require('jimp');

const files = [
  'public/assets/pioneros/hub_yuri.png',
  'public/assets/pioneros/hub_alan.png',
  'public/assets/pioneros/hub_john.png',
  'public/assets/pioneros/hub_valentina.png',
  'public/assets/pioneros/hub_leonov.png',
  'public/assets/pioneros/hub_svetlana.png',
  'public/assets/pioneros/hub_sally.png'
];

async function applyCircularMask() {
  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.log(`Skipping: ${file} (not found)`);
      continue;
    }
    
    try {
      const image = await Jimp.read(file);
      const width = image.bitmap.width;
      const height = image.bitmap.height;
      const radius = (Math.min(width, height) / 2) - 4; // -4 pixels for anti-aliasing safety margin
      const centerX = width / 2;
      const centerY = height / 2;

      image.scan(0, 0, width, height, function(x, y, idx) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > radius) {
          this.bitmap.data[idx + 3] = 0; 
        }
      });

      await image.writeAsync(file);
      console.log(`Perfectly Circular: ${file}`);
    } catch(e) {
      console.error(`Error processing ${file}`, e.message);
    }
  }
}

applyCircularMask();
