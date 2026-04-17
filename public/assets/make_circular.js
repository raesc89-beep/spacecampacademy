const fs = require('fs');
const Jimp = require('jimp');

const files = [
  'generator_planet_acuatico.png',
  'generator_planet_anillos.png',
  'generator_planet_alien.png',
  'animales/hub_intro.png',
  'animales/hub_mamiferos.png',
  'animales/hub_albert_ham.png',
  'animales/hub_laika.png',
  'animales/hub_gatos.png',
  'asteroides/hub_intro.png',
  'asteroides/hub_meteoros.png',
  'asteroides/hub_cometas.png',
  'asteroides/hub_sondas.png',
  'asteroides/hub_apophis.png'
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
      const radius = (Math.min(width, height) / 2) - 2; // -2 pixels for anti-aliasing safety margin
      const centerX = width / 2;
      const centerY = height / 2;

      image.scan(0, 0, width, height, function(x, y, idx) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If outside the circle, make it perfectly transparent (Alpha = 0)
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
