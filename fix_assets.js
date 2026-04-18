
const Jimp = require('jimp');

async function floodFillTransparent(imgPath) {
  try {
    const image = await Jimp.read(imgPath);
    const { width, height, data } = image.bitmap;
    const visited = new Uint8Array(width * height);
    const queue = [[0, 0], [width-1, 0], [0, height-1], [width-1, height-1]]; 
    
    const isBg = (idx) => {
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        return (r < 20 && g < 20 && b < 20); // Pure AI Black
    };

    let head = 0;
    while(head < queue.length) {
        const [x, y] = queue[head++];
        if (x<0 || x>=width || y<0 || y>=height) continue;
        
        const i = (y * width + x);
        if (visited[i]) continue;
        visited[i] = 1;
        
        const dataIdx = i * 4;
        if (isBg(dataIdx)) {
            data[dataIdx + 3] = 0; // Transparent
            queue.push([x+1, y], [x-1, y], [x, y+1], [x, y-1]);
        }
    }

    // Pass 2: edge smoothing slightly
    for (let i = 0; i < width * height * 4; i += 4) {
      if (data[i+3] > 0 && data[i] < 30 && data[i+1] < 30 && data[i+2] < 30) {
        data[i+3] = 150; // semi-transparent aliasing
      }
    }

    await image.writeAsync(imgPath);
    console.log('Processed newly generated vector: ' + imgPath);
  } catch(e) { console.error('Error in ' + imgPath, e); }
}

async function run() {
  await floodFillTransparent('public/assets/asteroides/clean_intro.png');
  await floodFillTransparent('public/assets/asteroides/clean_cometas.png');
  await floodFillTransparent('public/assets/asteroides/clean_apophis.png');
}
run();

