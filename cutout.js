const Jimp = require('jimp');

async function main() {
  const imagePath = 'C:/Users/raesc/.gemini/antigravity/brain/bb38df92-874f-4d26-95a0-10ce41029c60/media__1779120552036.png';
  const outPath = './public/assets/dashboard/cockpit_overlay.png';
  
  const image = await Jimp.read(imagePath);
  const w = image.bitmap.width;
  const h = image.bitmap.height;

  // The new image is a cockpit with windows in the upper half showing a bright earth/space.
  // We will make all bright pixels in the upper 60% of the image transparent so our animated background shows through.
  
  image.scan(0, 0, w, h, function (x, y, idx) {
    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    // Only process the upper 65% of the image (where the windows are)
    if (y < h * 0.65) {
      // If the pixel is very bright (part of the sky/earth outside), make it transparent
      if (luma > 70) {
        // Feathering the transparency based on luminance
        let alpha = 0;
        if (luma < 120) {
          alpha = Math.floor(255 * ((120 - luma) / 50)); // Smooth transition
        }
        this.bitmap.data[idx + 3] = alpha; 
      }
    }
  });

  await image.writeAsync(outPath);
  console.log('Saved new cockpit to ' + outPath);
}

main().catch(console.error);
