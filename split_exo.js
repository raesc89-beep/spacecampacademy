const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'courseData.js');
let content = fs.readFileSync(filePath, 'utf8');

const lastIndex = content.lastIndexOf('];');
if (lastIndex === -1) {
  console.error("Could not find end of array");
  process.exit(1);
}

// Re-using the exo dump
const exo = require('./exo_dump.json');
const sections = exo.contentEs.sections;

const m1_secs = sections.slice(0, 4);
const m2_secs = sections.slice(4, 8);
const m3_secs = sections.slice(8, 12);
const m4_secs = sections.slice(12, 15);

const newModules = `
  ,
  {
    "id": "exoplanetas_m1",
    "order": 110,
    "titleEn": "Fundamentals and Transit",
    "titleEs": "Fundamentos y Tránsito",
    "badge": "Exo Hunter I",
    "badgeEs": "Cazador Exo I",
    "badgeImage": "/assets/badges/exoplanetas_badge.png",
    "color": "#9370DB",
    "contentEs": { "sections": ${JSON.stringify(m1_secs, null, 2)} },
    "quizEs": [{"q": "¿Cuál fue el primer método exitoso?", "options": ["Tránsito", "Velocidad Radial", "Observación Directa", "Astrometría"], "a": 1}]
  },
  {
    "id": "exoplanetas_m2",
    "order": 111,
    "titleEn": "Types of Worlds",
    "titleEs": "Tipos de Mundos",
    "badge": "Exo Hunter II",
    "badgeEs": "Cazador Exo II",
    "badgeImage": "/assets/badges/exoplanetas_badge.png",
    "color": "#9370DB",
    "contentEs": { "sections": ${JSON.stringify(m2_secs, null, 2)} },
    "quizEs": [{"q": "¿Qué es un Júpiter Caliente?", "options": ["Planeta de hielo", "Gigante gaseoso muy cerca de su estrella", "Una estrella enana", "Un planeta sin atmósfera"], "a": 1}]
  },
  {
    "id": "exoplanetas_m3",
    "order": 112,
    "titleEn": "Telescopes and Search",
    "titleEs": "Búsqueda y Telescopios",
    "badge": "Exo Hunter III",
    "badgeEs": "Cazador Exo III",
    "badgeImage": "/assets/badges/exoplanetas_badge.png",
    "color": "#9370DB",
    "contentEs": { "sections": ${JSON.stringify(m3_secs, null, 2)} },
    "quizEs": [{"q": "¿Qué satélite escanea 400 veces más área que Kepler?", "options": ["Hubble", "JWST", "TESS", "Spitzer"], "a": 2}]
  },
  {
    "id": "exoplanetas_m4",
    "order": 113,
    "titleEn": "Atmospheres and Biosignatures",
    "titleEs": "Atmósferas y Biofirmas",
    "badge": "Exo Hunter IV",
    "badgeEs": "Cazador Exo IV",
    "badgeImage": "/assets/badges/exoplanetas_badge.png",
    "color": "#9370DB",
    "contentEs": { "sections": ${JSON.stringify(m4_secs, null, 2)} },
    "quizEs": [{"q": "¿Qué es una biofirma?", "options": ["Firma de un alienígena", "Cualquier sustancia que prueba la existencia de vida", "Un telescopio", "Una nave espacial"], "a": 1}]
  }
`;

const newContent = content.slice(0, lastIndex) + newModules + "\n];\n";
fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Successfully appended Exoplanetas split modules");
