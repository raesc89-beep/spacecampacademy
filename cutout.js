const Jimp = require('jimp');

async function main() {
  const imagePath = 'C:/Users/raesc/.gemini/antigravity/brain/bb38df92-874f-4d26-95a0-10ce41029c60/media__1778948861992.jpg';
  const outPath = './public/assets/dashboard/cockpit_overlay.png';
  
  const image = await Jimp.read(imagePath);
  const w = image.bitmap.width;
  const h = image.bitmap.height;

  const cx = w * 0.5;
  const cy = h * 0.45;
  const rx = w * 0.45;
  const ry = h * 0.40;

  image.scan(0, 0, w, h, function (x, y, idx) {
    const dx = Math.abs(x - cx) / rx;
    const dy = Math.abs(y - cy) / ry;
    
    // squircle dist
    const dist = Math.pow(dx, 3) + Math.pow(dy, 3);

    const r = this.bitmap.data[idx];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (dist < 1) {
      const feather = 0.6;
      if (dist > feather) {
        const alpha = Math.floor(255 * (dist - feather) / (1 - feather));
        
        // If it's a bright pixel (earth/space), make it transparent
        if (luma > 40) {
           this.bitmap.data[idx + 3] = Math.min(this.bitmap.data[idx + 3], alpha);
        }
      } else {
        if (luma > 30) {
           this.bitmap.data[idx + 3] = 0; 
        }
      }
    } else {
      // SIDE WINDOWS:
      // If we are on the left 20% or right 20% of the image, and it's upper half (windows), make bright pixels transparent
      if ((x < w * 0.2 || x > w * 0.8) && y < h * 0.85) {
         if (luma > 40) {
            this.bitmap.data[idx + 3] = 0; // Make transparent so background shows through!
         }
      }
    }
  });

  await image.writeAsync(outPath);
  console.log('Saved to ' + outPath);
}

main().catch(console.error);
