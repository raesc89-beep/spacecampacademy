const fs = require('fs');
const https = require('https');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsonString = content.substring(startIndex, lastIndex + 1);
let jsData = JSON.parse(jsonString);

const globalUsedImages = new Set();
// Una caché para las respuestas de la NASA para no hacer peticiones de red infinitas si usamos "space" como fallback
const apiCache = {};

function fetchNASA(query) {
  return new Promise((resolve) => {
    if (apiCache[query]) {
      return resolve(apiCache[query]);
    }
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    https.get(url, { headers: { 'User-Agent': 'SpaceCampBot/11.0' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          let urls = [];
          if (data.collection && data.collection.items) {
            data.collection.items.forEach(item => {
              if (item.links && item.links.length > 0) {
                urls.push(item.links[0].href.replace('~thumb', '~medium')); // prefer medium
              }
            });
          }
          apiCache[query] = urls;
          resolve(urls);
        } catch(e) { resolve([]); }
      });
    }).on('error', () => resolve([]));
  });
}

const fallbacks = ["hubble", "nebula", "galaxy", "astronaut", "spaceship", "stars", "milky way", "observatory", "planet", "solar system", "satellite", "rocket launch", "moon surface", "martian landscape", "deep space", "space station"];
let fallbackIndex = 0;

async function run() {
  for (let i = 0; i < jsData.length; i++) {
    const course = jsData[i];
    console.log(`Buscando imágenes únicas para: ${course.id}`);
    
    // Convertir el ID a una búsqueda lógica (pioneros_sally -> "sally ride astronaut", etc.)
    let query = course.id.replace(/_/g, ' ');
    if (course.id.includes('pionero')) query += " astronaut";
    if (course.id.includes('sun')) query = "sun flare";
    if (course.id.includes('animales')) query = "space capsule"; // NASA rarely has dogs/cats, capsule is safer
    if (course.id.includes('agujeros')) query = "black hole";
    
    let images = await fetchNASA(query);
    
    if (!course.contentEs || !course.contentEs.sections) continue;

    for (let s = 0; s < 15; s++) {
      let assigned = false;
      
      // Intentar encontrar una no usada del query original
      for (let img of images) {
        if (!globalUsedImages.has(img)) {
          course.contentEs.sections[s].image = img;
          globalUsedImages.add(img);
          assigned = true;
          break;
        }
      }
      
      // Si el query se quedó sin imágenes únicas, usar fallbacks
      while (!assigned) {
        let fbQuery = fallbacks[fallbackIndex % fallbacks.length];
        let fbImages = await fetchNASA(fbQuery);
        
        for (let img of fbImages) {
          if (!globalUsedImages.has(img)) {
            course.contentEs.sections[s].image = img;
            globalUsedImages.add(img);
            assigned = true;
            break;
          }
        }
        
        if (!assigned) {
          fallbackIndex++; // Cambiar a la siguiente palabra de fallback
        }
      }
    }
  }

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log(`\n¡ÉXITO! Se inyectaron exactamente ${globalUsedImages.size} imágenes únicas en la base de datos.`);
}

run();
