const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");

const publicAssets = path.join(__dirname, "public", "assets");
const filesToProcess = ["main_logo.png", "logo_nasa_auth.png"];

async function processLogos() {
  for (const file of filesToProcess) {
    const filePath = path.join(publicAssets, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${file}, not found.`);
      continue;
    }
    
    console.log(`Flood-filling white background for ${file}...`);
    try {
      const image = await Jimp.read(filePath);
      
      const width = image.bitmap.width;
      const height = image.bitmap.height;
      const data = image.bitmap.data;
      
      // BFS Flood fill from the 4 corners
      const queue = [
          [0, 0], 
          [width - 1, 0], 
          [0, height - 1], 
          [width - 1, height - 1]
      ];
      
      // Use a flat Int8Array for visited check (much faster than a Set with strings)
      const visited = new Uint8Array(width * height);
      
      const getIndex = (x, y) => (y * width + x) * 4;
      const getVisitIndex = (x, y) => (y * width + x);
      
      const isWhiteish = (r, g, b, a) => (r >= 220 && g >= 220 && b >= 220 && a > 10);
      // Soft edge check for anti-aliasing (slightly darker than white)
      const isSoftEdge = (r, g, b, a) => (r >= 190 && g >= 190 && b >= 190 && a > 10);
      
      let qIndex = 0;
      
      while (qIndex < queue.length) {
        const [x, y] = queue[qIndex++];
        
        if (x < 0 || y < 0 || x >= width || y >= height) continue;
        
        const vIdx = getVisitIndex(x, y);
        if (visited[vIdx]) continue;
        visited[vIdx] = 1;
        
        const idx = getIndex(x, y);
        const r = data[idx];
        const g = data[idx+1];
        const b = data[idx+2];
        const a = data[idx+3];
        
        if (isWhiteish(r, g, b, a)) {
          // Fully delete white pixel
          data[idx+3] = 0;
          
          queue.push([x+1, y]);
          queue.push([x-1, y]);
          queue.push([x, y+1]);
          queue.push([x, y-1]);
        } else if (isSoftEdge(r, g, b, a)) {
          // It's a soft border anti-aliasing pixel adjacent to white
          // Make it highly transparent to smooth the edge
          data[idx+3] = Math.min(a, 50); 
          // Do not spread through soft borders to protect internal content
        }
      }

      await image.writeAsync(filePath);
      console.log(`✓ Preserved internal letters for ${file}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
}

processLogos();
