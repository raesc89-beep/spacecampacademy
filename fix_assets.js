
const Jimp = require('jimp');

async function floodFillTransparent(imgPath, isWhite) {
  try {
    const image = await Jimp.read(imgPath);
    const { width, height, data } = image.bitmap;
    const visited = new Uint8Array(width * height);
    const queue = [[0, 0], [width-1, 0], [0, height-1], [width-1, height-1]]; 
    
    const isBg = (idx) => {
        const r = data[idx], g = data[idx+1], b = data[idx+2];
        return (r < 25 && g < 25 && b < 45); // Todo fondo negro/oscuro
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
            data[dataIdx + 3] = 0; // Transparente
            queue.push([x+1, y], [x-1, y], [x, y+1], [x, y-1]);
        }
    }

    await image.writeAsync(imgPath);
    console.log('Background flood-filled transparent: ' + imgPath);
  } catch(e) { console.error('Error in ' + imgPath, e); }
}

async function processAll() {
    await floodFillTransparent('public/assets/animales/vector_intro.png', false);
    await floodFillTransparent('public/assets/animales/vector_mamiferos.png', false);
    await floodFillTransparent('public/assets/animales/vector_albert_ham.png', false);
    await floodFillTransparent('public/assets/animales/vector_laika.png', false);
    await floodFillTransparent('public/assets/animales/vector_gatos.png', false);
}
processAll();

