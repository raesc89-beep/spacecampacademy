const fs = require('fs');
const Jimp = require('jimp');

const files = [
  'rovers/ai_historia.png',
  'rovers/ai_futuras.png',
  'rovers/ai_spirit.png',
  'rovers/ai_opportunity.png'
];

async function removeWhiteBackgrounds() {
  for (const file of files) {
    if (!fs.existsSync(file)) {
      console.log(`Skipping: ${file} (not found)`);
      continue;
    }
    try {
      const image = await Jimp.read(file);
      const width = image.bitmap.width;
      const height = image.bitmap.height;

      // Usar Pixel (0,0) como referencia de fondo
      const refColor = image.getPixelColor(0, 0); 
      const refR = Jimp.intToRGBA(refColor).r;
      
      // Asumir que toda imagen con esquinas muy claras tiene fondo recortable
      if (refR > 235) {
         image.scan(0, 0, width, height, function(x, y, idx) {
           const red = this.bitmap.data[idx + 0];
           const green = this.bitmap.data[idx + 1];
           const blue = this.bitmap.data[idx + 2];
           
           // Si el pixel es "blanco o casi gris claro", lo volvemos 100% transparente
           if (red > 230 && green > 230 && blue > 230) {
             this.bitmap.data[idx + 3] = 0; // Alpha a 0
           }
         });
         await image.writeAsync(file);
         console.log(`Fondo extraído exitosamente: ${file}`);
      } else {
         console.log(`Fondo oscuro preservado: ${file}`);
      }
    } catch(e) {
      console.error(`Error en ${file}`, e);
    }
  }
}

removeWhiteBackgrounds();
