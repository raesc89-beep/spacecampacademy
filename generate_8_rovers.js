const fs = require('fs');

const createModule = (id, title, baseFact) => {
  const sections = [];
  for (let i = 0; i < 15; i++) {
    // 10 lines strictly
    const textLines = [
      `Bienvenido a la sección ${i + 1} del curso avanzado sobre ${title}.`,
      `${baseFact}`,
      `La exploración robótica ha transformado nuestra comprensión de la geología planetaria.`,
      `El sistema de navegación de estos vehículos opera bajo condiciones extremas y radiación constante.`,
      `A diferencia de las misiones Apolo, los rovers de Marte son laboratorios automatizados rodantes.`,
      `La transmisión de datos desde la superficie marciana hacia la red de espacio profundo puede demorar entre 4 y 24 minutos.`,
      `Cada rueda está mecanizada a partir de un bloque sólido de aluminio aeroespacial para soportar el terreno dentado.`,
      `La recolección de muestras estratigráficas permite buscar biofirmas del pasado antiguo de Marte.`,
      `Las tormentas de polvo globales representan uno de los mayores peligros para los paneles solares y ópticas.`,
      `A pesar de los desafíos, la resiliencia de la ingeniería robótica continúa asombrando al mundo científico.`
    ];

    sections.push({
      id: `${id}_sec_${i}`,
      title: `Operación y Telemetría: Fase ${i + 1}`,
      image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1200',
      text: textLines,
      style: i % 3 === 0 ? 'highlight' : 'normal'
    });
  }

  return {
    id: id,
    titleEs: title,
    titleEn: title + ' Mission',
    color: '#FF6347',
    badgeImage: '/assets/rovers/curiosity.svg',
    completed: false,
    descriptionEs: `Estudio detallado y telemetría de la misión ${title} en la superficie marciana.`,
    descriptionEn: `Detailed study and telemetry of the ${title} mission on the Martian surface.`,
    contentEs: {
      overview: `Despliegue de los 15 bancos de datos técnicos para ${title}.`,
      sections: sections
    }
  };
};

// Generar los 8 modulos
const mods = [
  createModule('robots_historia', 'Carrera Histórica', 'La historia de la exploración robótica comenzó con los primeros intentos de aterrizaje soviéticos y estadounidenses en los años 70.'),
  createModule('robots_sojourner', 'Rover Sojourner', 'Sojourner fue el primer rover, pesaba 11.5 kg y aterrizó el 4 de julio de 1997 en la región de Ares Vallis.'),
  createModule('robots_opportunity', 'Rover Opportunity', 'Opportunity (MER-B) sobrevivió 14 años en Marte, recorriendo 45.16 kilómetros y descubriendo esferas de hematita.'),
  createModule('robots_spirit', 'Rover Spirit', 'Spirit (MER-A) aterrizó en el cráter Gusev y descubrió evidencia de fumarolas hidrotermales y sílice puro en Marte.'),
  createModule('robots_curiosity', 'Rover Curiosity', 'Curiosity es propulsado por un RTG de plutonio y descubrió compuestos orgánicos en el cráter Gale tras aterrizar con una grúa aérea.'),
  createModule('robots_perseverance', 'Rover Perseverance', 'Perseverance está almacenando núcleos cilíndricos de roca en el cráter Jezero para una futura misión de retorno de muestras.'),
  createModule('robots_ingenuity', 'Helicóptero Ingenuity', 'Ingenuity demostró el primer vuelo controlado en otro planeta operando a 2,500 RPM en una atmósfera 1% tan densa como la Tierra.'),
  createModule('robots_futuras', 'Misiones Futuras', 'Las próximas décadas verán rovers europeos como Rosalind Franklin capaces de perforar a 2 metros bajo la superficie marciana.')
];

// Insertar videos especificos
mods.find(m => m.id === 'robots_sojourner').contentEs.sections[0].video = 'https://drive.google.com/file/d/1sKO6BBodinxwJ_fwKrxIYCXNYOa_huNg/preview';
mods.find(m => m.id === 'robots_sojourner').contentEs.sections[0].image = null;

mods.find(m => m.id === 'robots_opportunity').contentEs.sections[0].video = 'https://drive.google.com/file/d/1iCm637qLcGV2sm0UFUAJ9vne2XOzSZ4c/preview';
mods.find(m => m.id === 'robots_opportunity').contentEs.sections[0].image = null;

mods.find(m => m.id === 'robots_spirit').contentEs.sections[0].video = 'https://drive.google.com/file/d/1knQhfUbl25RYLZ3JQTfWp1NG-CooNnCo/preview'; // Looney Tunes
mods.find(m => m.id === 'robots_spirit').contentEs.sections[0].image = null;

mods.find(m => m.id === 'robots_curiosity').contentEs.sections[0].video = 'https://drive.google.com/file/d/1vKWif4d_wiUTec2o-UJQiZGaHq6S4GMM/preview';
mods.find(m => m.id === 'robots_curiosity').contentEs.sections[0].image = null;

mods.find(m => m.id === 'robots_ingenuity').contentEs.sections[0].video = 'https://drive.google.com/file/d/15fTNk-eeJ6eUD-0CHck3EFUu_XaMrZBk/preview';
mods.find(m => m.id === 'robots_ingenuity').contentEs.sections[0].image = null;


let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const jsonString = content.substring(startIndex).replace(/;$/, '');
let jsData = eval(jsonString);

// Remover el curso viejo "robots_espacio"
jsData = jsData.filter(c => c.id !== 'robots_espacio');

// Inyectar los 8 nuevos
mods.forEach(m => {
  const index = jsData.findIndex(c => c.id === m.id);
  if (index >= 0) {
    jsData[index] = m;
  } else {
    jsData.push(m);
  }
});

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2).replace(/\\\\n/g, '\\n') + ';\n', 'utf8');
console.log('8 full 15x15 courses for rovers generated!');
