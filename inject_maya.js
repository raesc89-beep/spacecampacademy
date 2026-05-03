const fs = require('fs');

const content = fs.readFileSync('C:/Users/raesc/.gemini/antigravity/brain/b598e303-7934-422d-8c8b-841d54919ae3/maya_content_draft.md', 'utf8');
const courseDataPath = 'lib/courseData.js';

const sections = [];
const regex = /### Sección \d+: (.*?)\n([\s\S]*?)(?=### Sección|\n---|$)/g;
let match;
let secId = 0;

const nasaImages = [
  'https://images.unsplash.com/photo-1518606899538-2cd1ab88001e?q=80&w=800', // Chichen Itza
  'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=800', // Milky Way
  'https://images.unsplash.com/photo-1519069357458-3d1fc953b0a7?q=80&w=800', // Cenote
  'https://images.unsplash.com/photo-1540305886470-76fb9746e166?q=80&w=800', // Carving
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800', // Galaxy
  'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=800', // Stars
  'https://images.unsplash.com/photo-1507646871587-578d0f1bd9a3?q=80&w=800', // Jungle Temple
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800', // Sun
  'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=800', // Moon
  'https://images.unsplash.com/photo-1518066000714-58c45f1a2c08?q=80&w=800', // Venus/Stars
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=800', // Solar flare
  'https://images.unsplash.com/photo-1504333638930-c8787321efa0?q=80&w=800', // Cosmos
  'https://images.unsplash.com/photo-1481819613568-3701cbc70156?q=80&w=800', // Eclipse/Dark
  'https://images.unsplash.com/photo-1533221389714-118833959eb4?q=80&w=800', // Ruins Night
  'https://images.unsplash.com/photo-1500366624467-f39b6999cc72?q=80&w=800'  // Architecture
];

while ((match = regex.exec(content)) !== null) {
  const title = match[1].trim();
  const textRaw = match[2].trim();
  
  if (title === '' || textRaw === '') continue;

  const imageUrl = nasaImages[secId % nasaImages.length];

  // The text is now just one big paragraph.
  const sectionObj = {
    id: 'maya_sec_' + secId,
    title: title,
    text: [textRaw], // Put narrative block in an array as required by the frontend
    image: imageUrl
  };
  
  sections.push(sectionObj);
  secId++;
  if (secId >= 15) break; // Only take 15
}

const quizData = [
  {
    q: '¿Cómo se organizaron políticamente los mayas en Mesoamérica?',
    a: ['Como un imperio unificado', 'En ciudades-estado independientes', 'Como una república centralizada', 'Como reinos nómadas'],
    c: 1
  },
  {
    q: '¿Qué utilizaron los mayas para estudiar directamente el sol sin dañar sus ojos?',
    a: ['Lentes de obsidiana', 'Espejos de plata', 'Reflejos en vasijas de agua oscura', 'Telescopios primitivos'],
    c: 2
  },
  {
    q: '¿Qué estructura es considerada el observatorio precolombino más famoso?',
    a: ['El Templo Mayor', 'El Caracol de Chichén Itzá', 'La Pirámide del Sol', 'Tikal'],
    c: 1
  },
  {
    q: '¿Cómo percibían los mayas a la Vía Láctea durante la estación seca?',
    a: ['Como el Árbol del Mundo Cósmico (Wakah Chan)', 'Como un río de leche', 'Como la Vía de los Muertos', 'Como un arco de triunfo'],
    c: 0
  },
  {
    q: '¿Con qué constelación maya coincide exactamente el Cinturón de Orión occidental?',
    a: ['El Zotz (Murciélago)', 'El Balam (Jaguar)', 'Aak (La Tortuga Ancestral)', 'Sina\'an (Escorpión)'],
    c: 2
  },
  {
    q: '¿Cómo llamaban a Las Pléyades y qué marcaba su aparición en mayo?',
    a: ['Tzab-ek (Cascabel), marcaba la siembra del maíz', 'Kukulkán, marcaba sacrificios', 'Ix Chel, marcaba la lluvia', 'Haab, marcaba el año nuevo'],
    c: 0
  },
  {
    q: '¿Qué fenómeno óptico ocurre en El Castillo de Chichén Itzá durante el equinoccio?',
    a: ['Un eclipse', 'El descenso iluminado de la Serpiente Emplumada', 'La alineación de tres templos', 'El apagado de las sombras'],
    c: 1
  },
  {
    q: '¿Con qué deidad asociaban los mayas a la Luna y a sus fases teledirigidas?',
    a: ['K\'inich Ajaw', 'Quetzalcóatl', 'Ix Chel', 'Tláloc'],
    c: 2
  },
  {
    q: 'A diferencia de Occidente (donde es el amor), ¿qué representaba Venus (Noh Ek) para los mayas?',
    a: ['La paz eterna', 'Guerra, sequía y aniquilación ("Guerra de las Estrellas")', 'Cosechas prósperas', 'La creación del maíz'],
    c: 1
  },
  {
    q: '¿Cuántos días duraba el misterioso y exacto ciclo adivinatorio del Tzolkin?',
    a: ['365 días', '260 días', '584 días', '144,000 días'],
    c: 1
  }
];

const newModule = {
    id: 'arqueoastronomia_maya',
    titleEs: 'Arqueoastronomía Maya',
    titleEn: 'Maya Archaeoastronomy',
    description: 'Descubre cómo los antiguos sabios y sacerdotes mayas lograron decodificar la danza matemática de las estrellas sin telescopios.',
    icon: '🏛️',
    color: '#00d084',
    contentEs: {
      sections: sections
    },
    quizEs: quizData,
    badgeEs: 'Maestro del Tiempo'
};

let rawCode = fs.readFileSync(courseDataPath, 'utf8');

const lastBracketIdx = rawCode.lastIndexOf('];');
if (lastBracketIdx === -1) {
   console.error('Could not find ];');
   process.exit(1);
}

// Remove previous if it exists
if (rawCode.includes(`id: 'arqueoastronomia_maya'`)) {
    console.log('Module already exists! Exiting.');
    process.exit(0);
}

const objStr = ',\n  ' + JSON.stringify(newModule, null, 2).replace(/^{/, '{\n    ').replace(/}$/, '  }') + '\n';

rawCode = rawCode.substring(0, lastBracketIdx) + objStr + rawCode.substring(lastBracketIdx);

fs.writeFileSync(courseDataPath, rawCode);
console.log('Appended Maya module successfully to COURSE_DATA array!');
