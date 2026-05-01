const fs = require('fs');
const https = require('https');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsonString = content.substring(startIndex, lastIndex + 1);
let jsData = JSON.parse(jsonString);

const exactQueries = {
  // Planetas
  "sun": "Sun solar flare",
  "mercury": "Mercury planet messenger",
  "venus": "Venus planet",
  "earth": "Earth from space",
  "mars": "Mars planet surface",
  "jupiter": "Jupiter planet Juno",
  "saturn": "Saturn rings Cassini",
  "uranus": "Uranus planet",
  "neptune": "Neptune planet",
  "pluto": "Pluto New Horizons",
  "viaje-planetas-gaseosos": "Gas giants Jupiter Saturn",
  
  // Anomalías
  "black_hole": "Black hole accretion",
  "quasar": "Quasar galaxy",
  "pulsar": "Pulsar neutron star",
  "red_dwarf": "Red dwarf star",
  "white_dwarf": "White dwarf star",
  "colisiones_estelares": "Galaxy collision merging",
  "agujeros_gusano_er": "Spacetime curve wormhole",

  // Pioneros
  "pioneros_yuri": "Yuri Gagarin Vostok",
  "pioneros_alan": "Alan Shepard Freedom 7",
  "pioneros_john": "John Glenn Friendship 7",
  "pioneros_valentina": "Valentina Tereshkova",
  "pioneros_leonov": "Alexei Leonov spacewalk",
  "pioneros_svetlana": "Svetlana Savitskaya",
  "pioneros_sally": "Sally Ride Challenger",
  
  // Animales
  "animales_intro": "Space monkey dog",
  "animales_albert_ham": "Ham chimpanzee space",
  "animales_laika": "Laika space dog",
  "animales_gatos": "Space cat Felicette",

  // Asteroides y Cometas
  "asteroides_intro": "Asteroid space rock",
  "asteroides_meteoros": "Meteor shower night sky",
  "asteroides_cometas": "Comet tail Hale Bopp",
  "asteroides_sondas": "Asteroid probe OSIRIS-REx",
  "asteroides_apophis": "Apophis asteroid",
  
  // Robots
  "robots_historia": "Lunar rover Apollo",
  "robots_sojourner": "Sojourner rover Mars",
  "robots_opportunity": "Opportunity rover Mars",
  "robots_spirit": "Spirit rover Mars",
  "robots_curiosity": "Curiosity rover Mars",
  "robots_perseverance": "Perseverance rover Mars",
  "robots_ingenuity": "Ingenuity helicopter Mars",
  "robots_futuras": "Mars sample return rover"
};

const badFillers = [
  "los científicos de la academia vigilan este fenómeno de cerca",
  "esta maravilla nos ayuda a comprender mejor nuestro lugar en el cosmos",
  "los datos recopilados hoy enriquecen enormemente nuestros archivos históricos",
  "la infinita curiosidad humana nos impulsa firmemente a llegar más lejos siempre",
  "como jóvenes cadetes",
  "cada descubrimiento nos deja con nuevas e increíbles preguntas estelares",
  "el universo está lleno de secretos esperando ser desvelados valientemente",
  "esta maravilla nos ayuda a comprender mejor nuestro lugar en el cosmos.",
  "los datos recopilados hoy enriquecen nuestros archivos históricos.",
  "la curiosidad humana nos impulsa a llegar más lejos siempre.",
  "cada descubrimiento nos deja con nuevas y preguntas estelares.",
  "el universo está lleno de secretos esperando ser desvelados.",
  "ustedes heredarán esta gran misión intergaláctica",
  "los científicos de la academia",
  "los datos recopilados hoy",
  "la infinita curiosidad",
  "cada descubrimiento nos deja"
];

const saganFillers = [
  "La ciencia es una forma de pensar mucho más que un cuerpo de conocimientos.",
  "Estamos hechos de materia estelar.",
  "El cosmos es todo lo que es, o lo que fue, o lo que será.",
  "Comprender la naturaleza requiere observar detenidamente los patrones simples.",
  "Una explicación sencilla suele ser la más cercana a la verdad universal.",
  "Cada paso es un avance hacia la comprensión de nuestro origen.",
  "La exploración nos permite vernos desde una perspectiva de humildad.",
  "Conocer las leyes de la física es el primer paso para descifrar el cielo.",
  "En algún lugar, algo asombroso espera a ser descubierto.",
  "El conocimiento científico es un patrimonio de toda la humanidad.",
  "La imaginación a menudo nos lleva a mundos que nunca fueron.",
  "Somos el medio para que el cosmos se conozca a sí mismo.",
  "Las estrellas obedecen reglas físicas elegantes y simples.",
  "El método para aprender es observar, cuestionar y luego experimentar.",
  "El universo es antiguo, pero comprensible para la mente humana.",
  "La curiosidad es el motor que impulsa la nave de la ciencia."
];

const globalUsedImages = new Set();
const apiCache = {};

function fetchNASA(query) {
  return new Promise((resolve) => {
    if (apiCache[query]) return resolve(apiCache[query]);
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;
    https.get(url, { headers: { 'User-Agent': 'SpaceCampBot/12.0' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          let urls = [];
          if (data.collection && data.collection.items) {
            data.collection.items.forEach(item => {
              if (item.links && item.links.length > 0) {
                urls.push(item.links[0].href.replace('~thumb', '~medium'));
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

async function run() {
  for (let i = 0; i < jsData.length; i++) {
    const course = jsData[i];
    console.log(`Corrigiendo: ${course.id}`);
    
    let query = exactQueries[course.id] || "Space exploration";
    let images = await fetchNASA(query);
    
    // Fallback if query returns too few images
    if (images.length < 15) {
      const moreImages = await fetchNASA("NASA Hubble Space");
      images = images.concat(moreImages);
    }
    
    if (!course.contentEs || !course.contentEs.sections) continue;

    let saganIdx = 0;
    
    for (let s = 0; s < 15; s++) {
      let sec = course.contentEs.sections[s];
      
      // 1. LIMPIAR LÍNEAS VIEJAS
      let cleanLines = [];
      sec.text.forEach(line => {
        const lowerLine = line.toLowerCase();
        let isBad = false;
        
        // Remove bad old fillers
        badFillers.forEach(bad => {
          if (lowerLine.includes(bad.toLowerCase())) isBad = true;
        });
        
        // Remove Sagan fillers so we can re-pad cleanly
        saganFillers.forEach(sagan => {
          if (lowerLine.includes(sagan.toLowerCase().substring(0, 15))) isBad = true;
        });
        
        if (!isBad && line.trim().length > 10) {
          cleanLines.push(line);
        }
      });
      
      // Keep up to 5 real fact lines
      cleanLines = cleanLines.slice(0, 5);
      
      // Repad to exactly 10 with new sequence
      while (cleanLines.length < 10) {
        cleanLines.push(saganFillers[saganIdx % saganFillers.length]);
        saganIdx++;
      }
      
      sec.text = cleanLines;
      
      // 2. ASIGNAR IMAGEN CONTEXTUAL Y ÚNICA
      let assigned = false;
      for (let img of images) {
        if (!globalUsedImages.has(img)) {
          sec.image = img;
          globalUsedImages.add(img);
          assigned = true;
          break;
        }
      }
      
      if (!assigned) {
         // Emergency global fallback
         const emergency = await fetchNASA("Galaxy stars");
         for (let img of emergency) {
            if (!globalUsedImages.has(img)) {
              sec.image = img;
              globalUsedImages.add(img);
              assigned = true;
              break;
            }
         }
      }
    }
  }

  const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
  fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
  console.log(`\n¡ÉXITO ABSOLUTO! Se inyectaron ${globalUsedImages.size} imágenes únicas de NASA con consultas EXACTAS. Se purgaron las líneas residuales.`);
}

run();
