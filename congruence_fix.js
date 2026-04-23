const fs = require('fs');

function getWikiKeyword(moduleTitle, sectionTitle) {
  const t = sectionTitle.toLowerCase();
  const m = moduleTitle.toLowerCase();
  
  // ---- SPECIFIC RULES BASED ON TEXT (100% Congruence) ----
  
  // Probes & Missions
  if (t.includes('messenger')) return 'MESSENGER';
  if (t.includes('bepicolombo')) return 'BepiColombo';
  if (t.includes('venera')) return 'Venera';
  if (t.includes('davinci') || t.includes('envision')) return 'DAVINCI';
  if (t.includes('perseverance')) return 'Perseverance (rover)';
  if (t.includes('curiosity')) return 'Curiosity (rover)';
  if (t.includes('juno')) return 'Juno (spacecraft)';
  if (t.includes('cassini')) return 'Cassini–Huygens';
  if (t.includes('voyager 2')) return 'Voyager 2';
  if (t.includes('new horizons')) return 'New Horizons';
  if (t.includes('parker')) return 'Parker Solar Probe';
  if (t.includes('rosetta') || t.includes('philae')) return 'Rosetta (spacecraft)';
  if (t.includes('hayabusa')) return 'Hayabusa2';
  if (t.includes('osiris-rex') || t.includes('osiris-apex')) return 'OSIRIS-REx';
  if (t.includes('dart')) return 'Double Asteroid Redirection Test';
  if (t.includes('lucy')) return 'Lucy (spacecraft)';
  if (t.includes('psyche')) return 'Psyche (spacecraft)';
  
  // Specific Moons & Features
  if (t.includes('fobos') || t.includes('deimos')) return 'Phobos (moon)';
  if (t.includes('olimpus') || t.includes('olimpo')) return 'Olympus Mons';
  if (t.includes('valles marineris')) return 'Valles Marineris';
  if (t.includes('gran mancha roja')) return 'Great Red Spot';
  if (t.includes('io:') || t.includes('ío:')) return 'Io (moon)';
  if (t.includes('europa:')) return 'Europa (moon)';
  if (t.includes('titán')) return 'Titan (moon)';
  if (t.includes('encélado')) return 'Enceladus';
  if (t.includes('tritón')) return 'Triton (moon)';
  if (t.includes('caronte')) return 'Charon (moon)';
  if (t.includes('tombaugh')) return 'Tombaugh Regio';
  if (t.includes('shoemaker-levy')) return 'Comet Shoemaker–Levy 9';
  if (t.includes('sagitario a')) return 'Sagittarius A*';
  if (t.includes('halley')) return "Halley's Comet";
  if (t.includes('ceres')) return 'Ceres (dwarf planet)';
  if (t.includes('vesta')) return '4 Vesta';
  
  // Physics & General concepts
  if (t.includes('fusión nuclear')) return 'Nuclear fusion';
  if (t.includes('eyecciones de masa') || t.includes('tormentas solares')) return 'Coronal mass ejection';
  if (t.includes('manchas solares')) return 'Sunspot';
  if (t.includes('vientos solares') || t.includes('viento solar')) return 'Solar wind';
  if (t.includes('efecto invernadero')) return 'Greenhouse effect';
  if (t.includes('tectónica') || t.includes('placas')) return 'Plate tectonics';
  if (t.includes('auroras')) return 'Aurora';
  if (t.includes('campo magnético')) {
     if (m.includes('tierra')) return "Earth's magnetic field";
     if (m.includes('júpiter')) return 'Magnetosphere of Jupiter';
     return 'Planetary magnetic field';
  }
  if (t.includes('interior') || t.includes('núcleo')) {
     if (m.includes('tierra')) return "Earth's core";
     if (m.includes('júpiter')) return 'Metallic hydrogen';
     if (m.includes('sol')) return 'Solar core';
     if (m.includes('marte')) return 'Geology of Mars';
     return 'Planetary core';
  }
  if (t.includes('atmósfera')) {
     if (m.includes('venus')) return 'Atmosphere of Venus';
     if (m.includes('marte')) return 'Atmosphere of Mars';
     return 'Atmosphere';
  }
  if (t.includes('anillos')) {
     if (m.includes('saturno')) return 'Rings of Saturn';
     if (m.includes('urano')) return 'Rings of Uranus';
     if (m.includes('neptuno')) return 'Rings of Neptune';
     if (m.includes('júpiter')) return 'Rings of Jupiter';
  }
  if (t.includes('colonización') && m.includes('marte')) return 'Colonization of Mars';
  if (t.includes('espaguetización')) return 'Spaghettification';
  if (t.includes('agujero negro') && t.includes('fotografía')) return 'Event Horizon Telescope';
  if (t.includes('agujero negro') && t.includes('nace')) return 'Stellar black hole';
  
  // Animals in space specifics
  if (t.includes('laika')) return 'Laika';
  if (t.includes('félicette')) return 'Félicette';
  if (t.includes('ham')) return 'Ham (chimpanzee)';
  if (t.includes('albert')) return 'Monkeys and apes in space';
  if (t.includes('perros') || t.includes('canino')) return 'Soviet space dogs';
  if (t.includes('gatos')) return 'Félicette'; // French space cats
  if (t.includes('moscas')) return 'Fruit flies in space';
  if (t.includes('arañas')) return 'Animals in space';
  if (t.includes('tortugas')) return 'Zond 5';
  
  // If no specific rule matched, return the English translation of the module as a safe, highly relevant fallback
  const fallbacks = {
    "el sol": "Sun", "mercurio": "Mercury (planet)", "venus": "Venus", "tierra": "Earth", 
    "marte": "Mars", "júpiter": "Jupiter", "saturno": "Saturn", "urano": "Uranus", 
    "neptuno": "Neptune", "plutón": "Pluto", "agujero negro": "Black hole", 
    "cuásar": "Quasar", "púlsar": "Pulsar", "enana roja": "Red dwarf", 
    "enana blanca": "White dwarf", "agujero de gusano": "Wormhole",
    "asteroides": "Asteroid", "meteoros": "Meteor", "cometas": "Comet", 
    "sondas": "Space probe", "asteroide apophis": "99942 Apophis",
    "animales en el espacio": "Animals in space", "mamíferos en el espacio": "Space medicine"
  };
  
  return fallbacks[m] || 'Space exploration';
}

// Function to get image from Wikipedia API
async function getWikiImage(keyword) {
  try {
    const res = await fetch('https://en.wikipedia.org/w/api.php?action=query&titles=' + encodeURIComponent(keyword) + '&prop=pageimages&format=json&pithumbsize=1000', {
      headers: { 'User-Agent': 'SpaceCampBot/1.0 (raesc89@gmail.com)' }
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.query && data.query.pages) {
      const pageId = Object.keys(data.query.pages)[0];
      if (data.query.pages[pageId].thumbnail) {
        let src = data.query.pages[pageId].thumbnail.source;
        if (src.includes('.svg') || src.includes('.webm') || src.includes('.ogv')) return null;
        return src;
      }
    }
  } catch (e) {
  }
  return null;
}

async function getMultipleWikiImages(keyword) {
  try {
    const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&generator=images&gimlimit=50&titles=' + encodeURIComponent(keyword) + '&pithumbsize=1280&format=json';
    const res = await fetch(url, { headers: { 'User-Agent': 'SpaceCampBot/1.0 (raesc89@gmail.com)' } });
    const data = await res.json();
    if (!data.query || !data.query.pages) return [];
    return Object.values(data.query.pages)
      .map(p => p.thumbnail ? p.thumbnail.source : null)
      .filter(url => url && !url.includes('.svg') && !url.includes('.webm') && !url.includes('.ogv') && !url.toLowerCase().includes('icon') && !url.toLowerCase().includes('logo'));
  } catch (e) { return []; }
}

async function run() {
  const code = fs.readFileSync('lib/courseData.js', 'utf8');
  const tempFile = 'lib/courseData_temp_wiki2.js';
  fs.writeFileSync(tempFile, code.replace('export const COURSE_DATA =', 'module.exports ='));
  const COURSE_DATA = require('./lib/courseData_temp_wiki2.js');
  fs.unlinkSync(tempFile);

  const globalUsedImages = new Set();
  
  for (let i = 0; i < COURSE_DATA.length; i++) {
    const moduleData = COURSE_DATA[i];
    console.log('Validando:', moduleData.titleEs);
    if (!moduleData.contentEs || !moduleData.contentEs.sections) continue;
    
    for (let j = 0; j < moduleData.contentEs.sections.length; j++) {
      const section = moduleData.contentEs.sections[j];
      
      let concept = getWikiKeyword(moduleData.titleEs, section.title);
      
      let imgUrl = await getWikiImage(concept);
      
      // If we STILL don't have an image, or it's a duplicate, we use multiple generator
      if (!imgUrl || globalUsedImages.has(imgUrl)) {
          const multiple = await getMultipleWikiImages(concept);
          let foundNew = false;
          for (const u of multiple) {
              if (!globalUsedImages.has(u)) { imgUrl = u; foundNew = true; break; }
          }
          if (!foundNew) {
              const genericFallback = getWikiKeyword(moduleData.titleEs, "fallback");
              const genericMultiple = await getMultipleWikiImages(genericFallback);
              for (const u of genericMultiple) {
                  if (!globalUsedImages.has(u)) { imgUrl = u; foundNew = true; break; }
              }
          }
          // Ultimate fallback Unsplash to avoid breaking
          if (!imgUrl || globalUsedImages.has(imgUrl)) {
             imgUrl = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1280&auto=format&fit=crop";
          }
      }
      
      section.image = imgUrl; // Update image
      globalUsedImages.add(imgUrl);
      
      await new Promise(r => setTimeout(r, 100)); // Respect API limits
    }
  }

  const newContent = `// Archivo maestro estático del curso
export const COURSE_DATA = ${JSON.stringify(COURSE_DATA, null, 2)};
`;

  fs.writeFileSync('lib/courseData.js', newContent, 'utf8');
  console.log('Congruencia semántica de imágenes completada con éxito.');
}

run();
