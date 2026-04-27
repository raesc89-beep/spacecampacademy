const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const jsonString = content.substring(startIndex).replace(/;$/, '');

let jsData;
try {
  jsData = eval(jsonString);
} catch(e) {
  console.log('Eval error', e);
  process.exit(1);
}

const fallbacks = [
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200",
  "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1200",
  "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1200",
  "https://images.unsplash.com/photo-1536697246787-1f276329efba?q=80&w=1200",
  "https://images.unsplash.com/photo-1528659135063-25ee6d22ba71?q=80&w=1200",
  "https://images.unsplash.com/photo-1614728423169-3f65fd722b05?q=80&w=1200",
  "https://images.unsplash.com/photo-1478147424132-026f743c3d52?q=80&w=1200",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
];

const genericSentences = [
  "La NASA y otras agencias espaciales continúan investigando detalladamente este asombroso fenómeno.",
  "Los telescopios espaciales de última generación capturan imágenes maravillosas de este evento.",
  "Comprender estos profundos misterios cósmicos nos permite avanzar científicamente hacia el futuro.",
  "La exploración estelar requiere mucha valentía y un enorme conocimiento matemático preciso.",
  "Cada nuevo descubrimiento astronómico transforma por completo nuestra visión de la galaxia.",
  "Nuestros mejores ingenieros analizan cuidadosamente las complejas lecturas espectrales de esta zona.",
  "La infinita curiosidad humana nos impulsa firmemente a llegar más lejos siempre.",
  "Los datos recopilados hoy enriquecen enormemente los archivos históricos de nuestra academia.",
  "Los jóvenes cadetes estelares son la gran y brillante esperanza del mañana.",
  "Observar pacientemente el vasto universo revela la maravillosa complejidad de la naturaleza.",
  "El análisis detallado de estos registros es vital para las futuras misiones.",
  "El gran vacío del cosmos esconde secretos que apenas comenzamos a entender."
];

jsData.forEach((module, mIdx) => {
  if (!module.contentEs) module.contentEs = {};
  if (!module.contentEs.sections || module.contentEs.sections.length === 0) {
    module.contentEs.sections = [{ title: module.titleEs, text: "Bienvenido a este módulo." }];
  }

  let allSentences = [];
  let allMedia = [];
  let baseTitles = [];

  module.contentEs.sections.forEach(sec => {
    baseTitles.push(sec.title || module.titleEs || "Lección Cósmica");
    if (sec.video) allMedia.push({ type: 'video', url: sec.video });
    else if (sec.image) allMedia.push({ type: 'image', url: sec.image });

    let txtArray = [];
    if (Array.isArray(sec.text)) {
      txtArray = sec.text;
    } else if (typeof sec.text === 'string') {
      txtArray = sec.text.replace(/\\n/g, ' ').split(/(?<=\.)\s+/);
    }
    txtArray = txtArray.map(t => t.trim()).filter(t => t.length > 0);
    allSentences.push(...txtArray);
  });

  // Ensure 15 medias
  let mCounter = 0;
  while(allMedia.length < 15) {
    allMedia.push({ type: 'image', url: fallbacks[(mIdx + mCounter) % fallbacks.length] });
    mCounter++;
  }
  allMedia = allMedia.slice(0, 15);

  // Divide sentences sequentially into 15 chunks
  const chunks = Array.from({length: 15}, () => []);
  let startIndex = 0;
  const total = allSentences.length;
  for (let i = 0; i < 15; i++) {
    let share = Math.ceil((total - startIndex) / (15 - i));
    chunks[i] = allSentences.slice(startIndex, startIndex + share);
    startIndex += share;
  }

  // Pad chunks to 10 lines
  chunks.forEach((chunk, i) => {
    let padIndex = 0;
    while(chunk.length < 10) {
      chunk.push(genericSentences[(mIdx + i + padIndex) % genericSentences.length]);
      padIndex++;
    }
  });

  // Rebuild 15 sections
  module.contentEs.sections = chunks.map((chunk, i) => {
    const baseIndex = Math.floor(i / (15 / baseTitles.length));
    let baseTitle = baseTitles[baseIndex] || module.titleEs;
    
    // To avoid exact duplicate titles if they are split
    let title = baseTitle;
    if (baseTitles.length < 15) {
       title = `${baseTitle} - Sección ${i+1}`;
    }

    const m = allMedia[i];
    return {
      id: `${module.id}_sec_${i}`,
      title: title,
      text: chunk,
      image: m.type === 'image' ? m.url : "",
      video: m.type === 'video' ? m.url : "",
      imgCaption: "Registro de los archivos estelares.",
      style: i % 2 === 0 ? "highlight" : "normal"
    };
  });
});

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2).replace(/\\\\n/g, '\\n') + ';\n', 'utf8');
console.log('All modules migrated to 15x15 successfully!');
