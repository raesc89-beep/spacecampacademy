const Jimp = require('jimp');

async function main() {
  const imagePath = './public/assets/dashboard/new_cockpit_3.png';
  const outPath = './public/assets/dashboard/cockpit_overlay.png';
  
  const image = await Jimp.read(imagePath);
  const w = image.bitmap.width;
  const h = image.bitmap.height;

  // The window in this image is roughly between x: 18% to 82%, y: 25% to 75%
  const left = w * 0.18;
  const right = w * 0.82;
  const top = h * 0.25;
  const bottom = h * 0.78;
  const feather = w * 0.03; 

  image.scan(0, 0, w, h, function (x, y, idx) {
    if (x > left - feather && x < right + feather && y > top - feather && y < bottom + feather) {
       let dx = 0;
       if (x < left) dx = left - x;
       else if (x > right) dx = x - right;

       let dy = 0;
       if (y < top) dy = top - y;
       else if (y > bottom) dy = y - bottom;

       const dist = Math.sqrt(dx * dx + dy * dy);

       if (dist < feather) {
           // Smooth transparency
           const alphaRatio = dist / feather;
           // We use Math.pow to make the feathering smoother (easing)
           const alpha = Math.floor(255 * Math.pow(alphaRatio, 1.5));
           this.bitmap.data[idx + 3] = Math.min(this.bitmap.data[idx + 3], alpha);
       }
    }
  });

  await image.writeAsync(outPath);
  console.log('Saved new cockpit to ' + outPath);
}

main().catch(console.error);
