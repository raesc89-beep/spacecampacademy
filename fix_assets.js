
const Jimp = require('jimp');
async function removeBg(imgPath, isWhite) {
  try {
    const image = await Jimp.read(imgPath);
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      if (isWhite && red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0; // Transparentar blanco puro
      } else if (!isWhite && red < 20 && green < 20 && blue < 20) {
        this.bitmap.data[idx + 3] = 0; // Transparentar negro puro
      }
    });
    await image.writeAsync(imgPath);
    console.log('Procesado: ' + imgPath);
  } catch(e) { console.error('Error in ' + imgPath, e); }
}

async function processAll() {
    await removeBg('public/assets/asteroides/hub_intro_vector.png', true);
    await removeBg('public/assets/asteroides/hub_meteoros_vector.png', true);
    await removeBg('public/assets/asteroides/hub_sondas_vector.png', true);
    await removeBg('public/assets/asteroides/hub_cometas_vector.png', false);
    await removeBg('public/assets/asteroides/hub_apophis_vector.png', false);
}
processAll();

