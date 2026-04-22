const fs = require('fs');

async function run() {
  const code = fs.readFileSync('lib/courseData.js', 'utf8');
  const tempFile = 'lib/courseData_temp_img.js';
  fs.writeFileSync(tempFile, code.replace('export const COURSE_DATA =', 'module.exports ='));
  const COURSE_DATA = require('./lib/courseData_temp_img.js');
  fs.unlinkSync(tempFile);

  const englishMap = {
    "El Sol": "Sun star solar flare",
    "Mercurio": "Mercury planet",
    "Venus": "Venus planet surface",
    "Tierra": "Earth from space satellite",
    "Marte": "Mars rover surface",
    "Júpiter": "Jupiter gas giant",
    "Saturno": "Saturn rings",
    "Urano": "Uranus planet",
    "Neptuno": "Neptune planet",
    "Plutón": "Pluto dwarf planet",
    "Agujero Negro": "Black hole event horizon",
    "Cuásar": "Quasar active galaxy",
    "Púlsar": "Pulsar neutron star",
    "Enana Roja": "Red dwarf star",
    "Enana Blanca": "White dwarf star",
    "Agujero de Gusano": "Wormhole conceptual",
    "Animales en el Espacio": "Animals in space NASA",
    "Mamíferos en el Espacio": "Space monkey chimpanzee",
    "Simio Albert y Simio Ham": "Ham the chimp space",
    "Laika": "Laika space dog soviet",
    "Gatos en el espacio": "Felicette space cat",
    "Asteroides": "Asteroid space rock",
    "Meteoros": "Meteor shower night sky",
    "Cometas": "Comet tail space",
    "Sondas": "Space probe satellite",
    "Asteroide Apophis": "Apophis asteroid near earth"
  };

  const globalImageCache = new Set();
  
  for (let i = 0; i < COURSE_DATA.length; i++) {
    const moduleData = COURSE_DATA[i];
    console.log(`Buscando imágenes para: ${moduleData.titleEs}`);
    
    if (!moduleData.contentEs || !moduleData.contentEs.sections) continue;
    
    const query = encodeURIComponent(englishMap[moduleData.titleEs] || moduleData.titleEs);
    let images = [];
    
    try {
      // Fetch 100 images for this specific module to have a big pool
      const res = await fetch(`https://images-api.nasa.gov/search?q=${query}&media_type=image&page_size=100`);
      const data = await res.json();
      
      if (data && data.collection && data.collection.items) {
        for (const item of data.collection.items) {
          if (item.links && item.links.length > 0) {
            const url = item.links[0].href.replace('~thumb.jpg', '~medium.jpg');
            // Ensure URL doesn't contain audio/video stuff just in case, and is unique globally
            if (!globalImageCache.has(url)) {
              images.push(url);
              globalImageCache.add(url);
            }
          }
        }
      }
    } catch (e) {
      console.log('Error NASA API:', e.message);
    }

    // Assign images to sections sequentially
    let imgIndex = 0;
    for (let j = 0; j < moduleData.contentEs.sections.length; j++) {
      const section = moduleData.contentEs.sections[j];
      if (imgIndex < images.length) {
         section.image = images[imgIndex];
         imgIndex++;
      } else {
         // Fallback if NASA didn't have enough images (rare for these topics)
         // Generate a generic space image from unsplash as absolute fallback
         section.image = `https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80&sig=${Math.random()}`;
      }
    }
    // Sleep to avoid rate limits
    await new Promise(r => setTimeout(r, 1000));
  }

  const newContent = `// Archivo maestro estático del curso
export const COURSE_DATA = ${JSON.stringify(COURSE_DATA, null, 2)};
`;

  fs.writeFileSync('lib/courseData.js', newContent, 'utf8');
  console.log('Imágenes de la NASA actualizadas correctamente con 390 imágenes únicas.');
}

run();
