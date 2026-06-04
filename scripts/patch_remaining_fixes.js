/**
 * patch_remaining_fixes.js
 * 
 * Fixes 4 modules with minor issues:
 *   1. maya_m12         — adds 15th paragraph (had 14)
 *   2. exoplanetas_m2   — adds 4 quiz questions (had 1, needs 5)
 *   3. exoplanetas_m4   — adds 4 quiz questions (had 1, needs 5)
 *   4. objetos_interestelares — adds 5 quiz questions (had 0, needs 5)
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'lib', 'courseData.js');

// --- Read and parse ---
const raw = fs.readFileSync(filePath, 'utf8');
const data = JSON.parse(raw.replace(/^export const COURSE_DATA = /, '').replace(/;\s*$/, ''));

// ============================================================
// 1. maya_m12 — Push a 15th closing paragraph
// ============================================================
const maya = data.find(m => m.id === 'maya_m12');
if (!maya) {
  console.error('ERROR: No se encontró el módulo maya_m12');
  process.exit(1);
}

maya.contentEs.sections[0].text.push(
  '¡Felicidades, joven explorador del pasado! 🎉🏛️ Has completado un viaje increíble a través de la grandiosa civilización maya, una de las más fascinantes de la historia de la humanidad. Desde sus imponentes pirámides hasta su avanzado sistema de escritura jeroglífica, los mayas nos dejaron un legado que sigue asombrando a científicos y arqueólogos de todo el mundo. Recuerda que el conocimiento maya sobre astronomía, matemáticas y agricultura fue tan avanzado que muchos de sus descubrimientos se adelantaron siglos a los de otras civilizaciones. Sigue investigando, preguntando y soñando con los misterios que aún quedan por descubrir en las selvas de Mesoamérica. ¡El pasado tiene mucho que enseñarnos sobre nuestro futuro! 🌟🌽'
);

console.log(`maya_m12: ahora tiene ${maya.contentEs.sections[0].text.length} párrafos en sections[0].`);

// ============================================================
// 2. exoplanetas_m2 — Add 4 quiz questions (keep existing 1)
// ============================================================
const exo2 = data.find(m => m.id === 'exoplanetas_m2');
if (!exo2) {
  console.error('ERROR: No se encontró el módulo exoplanetas_m2');
  process.exit(1);
}

exo2.quizEs.push(
  {
    q: '¿Qué son los "Júpiteres calientes"?',
    options: [
      'Planetas rocosos muy cercanos a su estrella',
      'Gigantes gaseosos que orbitan muy cerca de su estrella y alcanzan temperaturas extremas',
      'Estrellas jóvenes que todavía están en formación',
      'Lunas gigantes con volcanes activos'
    ],
    a: 1
  },
  {
    q: '¿Cuál es el método de detección de exoplanetas que mide la disminución de brillo de una estrella cuando un planeta pasa frente a ella?',
    options: [
      'Método de velocidad radial',
      'Método de imagen directa',
      'Método de tránsito',
      'Método de microlente gravitacional'
    ],
    a: 2
  },
  {
    q: '¿Qué característica define la "zona habitable" alrededor de una estrella?',
    options: [
      'Es la zona donde los planetas tienen anillos como Saturno',
      'Es la región donde la temperatura permite que exista agua líquida en la superficie de un planeta',
      'Es el área donde no hay asteroides ni cometas',
      'Es la zona más cercana a la estrella donde hay más luz'
    ],
    a: 1
  },
  {
    q: '¿Qué misión espacial de la NASA descubrió miles de exoplanetas usando el método de tránsito entre 2009 y 2018?',
    options: [
      'Voyager 1',
      'Hubble',
      'Kepler',
      'Curiosity'
    ],
    a: 2
  }
);

console.log(`exoplanetas_m2: ahora tiene ${exo2.quizEs.length} preguntas de quiz.`);

// ============================================================
// 3. exoplanetas_m4 — Add 4 quiz questions (keep existing 1)
// ============================================================
const exo4 = data.find(m => m.id === 'exoplanetas_m4');
if (!exo4) {
  console.error('ERROR: No se encontró el módulo exoplanetas_m4');
  process.exit(1);
}

exo4.quizEs.push(
  {
    q: '¿Qué gas en la atmósfera de un exoplaneta podría ser una biofirma, es decir, una señal de vida?',
    options: [
      'Helio',
      'Hidrógeno',
      'Oxígeno junto con metano',
      'Neón'
    ],
    a: 2
  },
  {
    q: '¿Cuál es el principal instrumento del telescopio James Webb que permite analizar las atmósferas de exoplanetas?',
    options: [
      'Un radar de ondas largas',
      'Un espectrógrafo infrarrojo que descompone la luz que atraviesa la atmósfera del planeta',
      'Una cámara de fotos de alta resolución visible',
      'Un micrófono espacial ultrasensible'
    ],
    a: 1
  },
  {
    q: '¿Qué sistema planetario cercano, descubierto en 2017, tiene siete planetas rocosos y varios en zona habitable?',
    options: [
      'Alpha Centauri',
      'Kepler-442',
      'TRAPPIST-1',
      'Próxima Centauri b'
    ],
    a: 2
  },
  {
    q: '¿Qué técnica utilizan los científicos para identificar los compuestos químicos en la atmósfera de un exoplaneta cuando este pasa frente a su estrella?',
    options: [
      'Envían una sonda espacial para recoger muestras',
      'Estudian las sombras que proyecta el planeta',
      'Espectroscopía de transmisión: analizan qué longitudes de onda de luz absorbe la atmósfera',
      'Toman fotografías con telescopios ópticos terrestres'
    ],
    a: 2
  }
);

console.log(`exoplanetas_m4: ahora tiene ${exo4.quizEs.length} preguntas de quiz.`);

// ============================================================
// 4. objetos_interestelares — Add 5 quiz questions (had 0)
// ============================================================
const interstell = data.find(m => m.id === 'objetos_interestelares');
if (!interstell) {
  console.error('ERROR: No se encontró el módulo objetos_interestelares');
  process.exit(1);
}

interstell.quizEs = [
  {
    q: '¿Cómo se llama el primer objeto interestelar confirmado que visitó nuestro sistema solar en 2017?',
    options: [
      'Borisov',
      'Halley',
      'Oumuamua',
      'Hale-Bopp'
    ],
    a: 2
  },
  {
    q: '¿Qué hace diferente al cometa interestelar 2I/Borisov de los cometas normales de nuestro sistema solar?',
    options: [
      'Es mucho más grande que cualquier cometa conocido',
      'Proviene de otro sistema estelar y sigue una trayectoria hiperbólica que lo saca del sistema solar',
      'Está hecho completamente de hierro y níquel',
      'Orbita entre Marte y Júpiter como un asteroide'
    ],
    a: 1
  },
  {
    q: '¿Cómo identifican los astrónomos que un objeto proviene de fuera del sistema solar?',
    options: [
      'Por su color rojizo brillante',
      'Porque emite señales de radio',
      'Por su trayectoria hiperbólica: viaja tan rápido que la gravedad del Sol no puede capturarlo en una órbita cerrada',
      'Porque siempre aparece cerca de Plutón'
    ],
    a: 2
  },
  {
    q: '¿Qué forma tan inusual tiene 1I/Oumuamua, según las observaciones de los astrónomos?',
    options: [
      'Es perfectamente esférico como la Luna',
      'Tiene forma de anillo como un donut',
      'Es extremadamente alargado, como un cigarro o una tortilla plana',
      'Tiene forma de cubo como un dado gigante'
    ],
    a: 2
  },
  {
    q: '¿De dónde se cree que provienen los objetos interestelares como Oumuamua y Borisov?',
    options: [
      'Del centro de la Vía Láctea exclusivamente',
      'De la Luna y sus cráteres',
      'Fueron expulsados de otros sistemas planetarios por la gravedad de planetas gigantes o estrellas cercanas',
      'Se formaron espontáneamente en el espacio vacío entre galaxias'
    ],
    a: 2
  }
];

console.log(`objetos_interestelares: ahora tiene ${interstell.quizEs.length} preguntas de quiz.`);

// --- Write back ---
fs.writeFileSync(filePath, 'export const COURSE_DATA = ' + JSON.stringify(data, null, 2) + ';', 'utf8');

console.log('\n✅ Patch aplicado correctamente. Archivo guardado:', filePath);
