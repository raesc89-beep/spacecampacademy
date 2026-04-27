const Jimp = require('jimp');

const processImage = async (inputPath, outputPath) => {
  try {
    const image = await Jimp.read(inputPath);
    
    const targetColor = { r: 0, g: 255, b: 0 }; // Neon green chroma key
    const tolerance = 100; // Tolerance for green shades

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // Calculate distance to target color
      const distance = Math.sqrt(
        Math.pow(red - targetColor.r, 2) +
        Math.pow(green - targetColor.g, 2) +
        Math.pow(blue - targetColor.b, 2)
      );

      // We mainly want to target pixels where green is strictly dominant
      if (green > 150 && red < 120 && blue < 120) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      } else if (distance < tolerance) {
        // Soft edge blending
        const alpha = Math.min(255, Math.floor((distance / tolerance) * 255));
        this.bitmap.data[idx + 3] = alpha;
      }
    });

    await image.writeAsync(outputPath);
    console.log(`Processed: ${outputPath}`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
};

const run = async () => {
  const dir = 'C:\\Users\\raesc\\.gemini\\antigravity\\brain\\b598e303-7934-422d-8c8b-841d54919ae3';
  const fs = require('fs');
  const files = fs.readdirSync(dir);
  
  const curFile = files.find(f => f.startsWith('ai_curiosity_') && f.endsWith('.png'));
  const sojFile = files.find(f => f.startsWith('ai_sojourner_') && f.endsWith('.png'));
  const ingFile = files.find(f => f.startsWith('ai_ingenuity_') && f.endsWith('.png'));
  
  if(curFile) await processImage(dir + '\\' + curFile, 'public/assets/rovers/ai_curiosity.png');
  if(sojFile) await processImage(dir + '\\' + sojFile, 'public/assets/rovers/ai_sojourner.png');
  if(ingFile) await processImage(dir + '\\' + ingFile, 'public/assets/rovers/ai_ingenuity.png');
};

run();
