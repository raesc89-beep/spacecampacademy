const fs = require('fs');

const content = fs.readFileSync('C:/Users/raesc/.gemini/antigravity/brain/b598e303-7934-422d-8c8b-841d54919ae3/interestelar_content_draft.md', 'utf8');
const courseDataPath = 'lib/courseData.js';

const sections = [];
const regex = /### Sección \d+: (.*?)\n\* \*\*Texto\*\*:\n([\s\S]*?)\* \*\*Imagen\*\*: `(.*?)`/g;
let match;
let secId = 0;

const nasaImages = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800',
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800',
  'https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=800',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800',
  'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=800',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800',
  'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=800',
  'https://images.unsplash.com/photo-1446976646545-73138b7cb6bd?q=80&w=800',
  'https://images.unsplash.com/photo-1484589065579-248aad0d8e13?q=80&w=800',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800',
  'https://images.unsplash.com/photo-1481819613568-3701cbc70156?q=80&w=800',
  'https://images.unsplash.com/photo-1506443432602-ac2fcd6f54e0?q=80&w=800',
  'https://images.unsplash.com/photo-1518066000714-58c45f1a2c08?q=80&w=800',
  'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=800',
  'https://images.unsplash.com/photo-1504333638930-c8787321efa0?q=80&w=800'
];

while ((match = regex.exec(content)) !== null) {
  const title = match[1].trim();
  const textRaw = match[2];
  const imageUrl = nasaImages[secId % nasaImages.length];

  const lines = textRaw.split('\n')
    .filter(l => l.trim().match(/^\d+\./))
    .map(l => l.replace(/^\s*\d+\.\s*/, '').trim())
    .filter(l => !l.includes('[**VIDEO ADJUNTO:**]'));
  
  const videoMatch = textRaw.match(/\[\*\*VIDEO ADJUNTO:\*\*\] `(.*?)`/);
  const videoUrl = videoMatch ? videoMatch[1].replace('/view?usp=drive_link', '/preview') : null;

  const sectionObj = {
    id: 'interestelar_sec_' + secId,
    title: title,
    text: lines,
    image: imageUrl
  };
  
  if (videoUrl) {
    sectionObj.video = videoUrl;
  }
  
  sections.push(sectionObj);
  secId++;
}

const quizData = [
  {
    q: '¿Cuál fue el primer objeto interestelar confirmado en cruzar nuestro sistema solar?',
    a: ['2I/Borisov', '3I/ATLAS', '1I/ʻOumuamua', 'Hale-Bopp'],
    c: 2
  },
  {
    q: '¿Qué rasgo orbital es la prueba definitiva de que un objeto tiene un origen interestelar?',
    a: ['Trayectoria circular', 'Excentricidad hiperbólica', 'Órbita polar', 'Resonancia con Júpiter'],
    c: 1
  },
  {
    q: '¿Qué objeto interestelar mostró una composición inusualmente alta de monóxido de carbono?',
    a: ['1I/ʻOumuamua', '2I/Borisov', '3I/ATLAS', 'Cometa Halley'],
    c: 1
  },
  {
    q: '¿Qué rasgo geológico caracterizó la forma de 1I/ʻOumuamua según las curvas de luz?',
    a: ['Esférico perfecto', 'Forma de maní', 'Altamente alargado (cigarro)', 'Forma cúbica'],
    c: 2
  },
  {
    q: '¿Qué anomalía química principal fue detectada en 3I/ATLAS (2025)?',
    a: ['Metano líquido', 'Oro puro', 'Agua deuterada (agua pesada)', 'Clorofila'],
    c: 2
  },
  {
    q: '¿Qué red de telescopios robóticos descubrió al objeto 3I/ATLAS?',
    a: ['Hubble', 'James Webb', 'ATLAS', 'Kepler'],
    c: 2
  },
  {
    q: '¿Cuál es el propósito de la futura misión europea Comet Interceptor?',
    a: ['Aterrizar en Marte', 'Estacionarse en L2 y emboscar un objeto interestelar', 'Destruir asteroides', 'Estudiar el Sol'],
    c: 1
  },
  {
    q: 'La llegada de objetos interestelares reavivó la teoría de:',
    a: ['Relatividad General', 'Panspermia', 'Gravedad Cuántica', 'Materia Oscura'],
    c: 1
  },
  {
    q: '¿Qué frontera magnética deben cruzar estos objetos para entrar en nuestro vecindario solar?',
    a: ['Cinturón de Kuiper', 'Nube de Oort', 'La Heliopausa', 'El Límite de Roche'],
    c: 2
  },
  {
    q: '¿Qué observatorio en Chile revolucionará la detección estadística de cuerpos interestelares?',
    a: ['Telescopio Espacial Spitzer', 'Observatorio Vera C. Rubin', 'Arecibo', 'VLT'],
    c: 1
  }
];

const newModule = {
    id: 'objetos_interestelares',
    titleEs: 'Objetos Interestelares',
    titleEn: 'Interstellar Objects',
    description: 'Explora los misteriosos visitantes de otros sistemas estelares, su descubrimiento, trayectorias y lo que nos revelan sobre la galaxia.',
    icon: '☄️',
    color: '#00e4ff',
    contentEs: {
      sections: sections
    },
    quizEs: quizData
};

let rawCode = fs.readFileSync(courseDataPath, 'utf8');

const lastBracketIdx = rawCode.lastIndexOf('];');
if (lastBracketIdx === -1) {
   console.error('Could not find ];');
   process.exit(1);
}

// Remove previous if it exists
if (rawCode.includes(`id: 'objetos_interestelares'`)) {
    console.log('Module already exists! Exiting.');
    process.exit(0);
}

const objStr = ',\n  ' + JSON.stringify(newModule, null, 2).replace(/^{/, '{\n    ').replace(/}$/, '  }') + '\n';

rawCode = rawCode.substring(0, lastBracketIdx) + objStr + rawCode.substring(lastBracketIdx);

fs.writeFileSync(courseDataPath, rawCode);
console.log('Appended module successfully to COURSE_DATA array!');
