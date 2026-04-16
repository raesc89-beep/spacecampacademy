const fs = require('fs');
const Jimp = require('jimp');

async function createAvatar(sourcePath, destPath) {
  try {
    const img = await Jimp.read(sourcePath);
    let logoExists = fs.existsSync('public/assets/space_camp_logo.png');
    
    // We want a square avatar of 300x300, circular.
    const SIZE = 400;
    img.cover(SIZE, SIZE, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
    
    // Create circular mask
    const circleMask = new Jimp(SIZE, SIZE, 0x00000000); 
    const radius = SIZE / 2;
    circleMask.scan(0, 0, SIZE, SIZE, function(x, y, idx) {
      const dx = x - radius;
      const dy = y - radius;
      if (dx*dx + dy*dy <= radius*radius) {
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
        this.bitmap.data[idx + 3] = 255;
      }
    });

    // Apply the mask
    img.mask(circleMask, 0, 0);

    // Add Logo
    if (logoExists) {
        const logo = await Jimp.read('public/assets/space_camp_logo.png');
        logo.contain(100, 100);
        img.composite(logo, 20, 20, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacitySource: 1,
            opacityDest: 1
        });
    }

    await img.writeAsync(destPath);
    console.log('Saved', destPath);
  } catch (err) {
    console.error('Error with', sourcePath, err);
  }
}

async function main() {
  await createAvatar('public/assets/animales/Portada curso.png', 'public/assets/animales/avatar_intro.png');
  await createAvatar('public/assets/animales/Albert.png', 'public/assets/animales/avatar_mamiferos.png');
  await createAvatar('public/assets/animales/Albert4.png', 'public/assets/animales/avatar_albert_ham.png');
  await createAvatar('public/assets/animales/Laika 1.png', 'public/assets/animales/avatar_laika.png');
  await createAvatar('public/assets/animales/Portada curso.png', 'public/assets/animales/avatar_gatos.png'); // Si el usuario tiene una foto "gatos.png" predeterminada, no la tengo, reciclo la portada.
}

main();
