/**
 * MASTER CONTENT GENERATOR - Batch 1: Egypt Modules (egypt_m1 to egypt_m15)
 * Each needs 5 more paragraphs (currently has 10, needs 15)
 * Appends 5 pedagogical paragraphs to each egypt module's sections
 */

const fs = require('fs');
const path = require('path');

const COURSE_DATA_PATH = path.join(__dirname, '../lib/courseData.js');

// Extra paragraphs to ADD to existing egypt modules (they have 10, need 5 more = 15)
const EGYPT_EXTRA = {
  egypt_m1: {
    extraSection: {
      id: 'egypt_m1_s3',
      title: 'El Legado del Antiguo Egipto en la Ciencia Moderna',
      text: [
        'Los antiguos egipcios fueron pioneros de la **astronomía práctica**. Observaron el cielo durante siglos y notaron que cuando la estrella Sirio (la más brillante del cielo nocturno) aparecía en el horizonte justo antes del amanecer, el río Nilo comenzaba a crecer. Este fenómeno, llamado **salida helíaca de Sirio**, ocurre aproximadamente el 19 de julio del calendario moderno. Los egipcios construyeron su calendario de 365 días basándose en este ciclo astronómico. Sin saberlo, habían ligado la astronomía con la agricultura y la supervivencia de toda su civilización.',
        'El conocimiento matemático egipcio era sorprendentemente avanzado. El **Papiro de Rhind** (fechado alrededor del 1650 a.C.) contiene 84 problemas matemáticos con sus soluciones, incluyendo cálculos de áreas, volúmenes y fracciones. Los egipcios usaban el sistema de fracciones unitarias (fracciones con numerador 1, como ½, ⅓, ¼) para todos sus cálculos. Sabían calcular el área de un círculo con una aproximación de π ≈ 3.16, solo un 0.6% diferente del valor real. Esta precisión fue suficiente para construir los monumentos más grandes del mundo antiguo.',
        'La **momificación** egipcia es un ejemplo fascinante de bioquímica aplicada. Los sacerdotes egipcios descubrieron que el **natrón** (una sal natural de carbonato de sodio) deshidrataba los tejidos y detenía la descomposición. También usaban aceites de cedro y especias con propiedades antimicrobianas reales. Estudios modernos con espectrometría de masas han identificado en momias resinas de enebro, aceite de palma, y compuestos de alquitrán con propiedades antibacterianas comprobadas. Lo que parecía ritual religioso era, en realidad, química aplicada de altísima eficacia: algunas momias llevan 3,000 años preservadas.',
        'Las **pirámides** no son solo tumbas: son observatorios astronómicos. La Gran Pirámide de Guiza está orientada con los cuatro puntos cardinales con una precisión de 3/60 de grado, mucho más exacta que cualquier brújula medieval. Su corredor norte apuntaba directamente hacia la **Estrella Polar** de aquella época (Thuban, en la constelación del Dragón, que era la estrella polar hace 4,500 años por el fenómeno de la precesión terrestre). El Pozo de la Reina en la Pirámide de Keops estaba alineado con Orión, la constelación que los egipcios asociaban con Osiris, dios de la muerte y resurrección.',
        'El impacto del antiguo Egipto en la ciencia moderna es enorme y a veces invisible. La **geometría euclidiana**, base de toda la matemática que aprendemos en la escuela, fue desarrollada por griegos que estudiaron en Egipto (como Tales de Mileto y Pitágoras, que pasaron años en escuelas sacerdotales egipcias). El **papiro**, el primer material de escritura portátil y duradero, permitió que el conocimiento se transmitiera entre generaciones. Sin el papiro egipcio, gran parte del conocimiento antiguo se habría perdido. Los egipcios inventaron la escritura administrativa, el calendario de 365 días, técnicas de irrigación, y un sistema médico documentado que influyó en la medicina griega y romana.',
      ]
    }
  },
  egypt_m2: {
    extraSection: {
      id: 'egypt_m2_s3',
      title: 'Arquitectura e Ingeniería de las Pirámides',
      text: [
        'Construir la Gran Pirámide de Guiza fue uno de los mayores logros de ingeniería de la historia humana. Con 146.5 metros de altura original (hoy 138.8 m por la pérdida del revestimiento), fue el edificio más alto del mundo durante **3,800 años**, hasta la construcción de la Catedral de Lincoln en 1311. Está formada por aproximadamente **2.3 millones de bloques de piedra**, con un peso promedio de 2.5 toneladas cada uno, aunque algunos bloques en la cámara del rey pesan hasta 80 toneladas. El volumen total es de 2.6 millones de metros cúbicos de piedra sólida.',
        'Los científicos han debatido durante siglos **cómo** los egipcios movieron bloques tan pesados sin maquinaria moderna. La teoría más aceptada actualmente involucra el uso de **rampas de agua y arena**. En 2023, arqueólogos descubrieron en la cantera de Hatnub (Egipto) una rampa con escalones laterales y ranuras para postes, que permitían usar palancas y equipos de personas tirando de cuerdas para jalar bloques cuesta arriba. Además, documentos del papiro de Wadi el-Jarf (el diario más antiguo del mundo, del 2560 a.C.) describen cómo un oficial llamado Merer supervisaba el transporte de 200 bloques de piedra caliza por barco desde las canteras de Tura hasta Guiza.',
        'La precisión de las pirámides desafía la ingeniería moderna. La base de la Gran Pirámide es casi perfectamente cuadrada: cada lado mide entre 230.3 y 230.4 metros, con una diferencia máxima de apenas **6 centímetros** entre el lado más largo y el más corto. Esto implica un error de menos del 0.03%. Los cuatro ángulos de la base difieren del ángulo recto perfecto en apenas 1/12 de grado. ¿Cómo lograron esta precisión sin instrumentos modernos? Usando el Sol y las estrellas como referencias astronómicas, niveles de agua (vasos comunicantes), y cuerdas perfectamente tensadas. La astronomía y la geometría eran inseparables en el Egipto antiguo.',
        'Dentro de las pirámides hay sistemas de **cámaras y corredores** de extraordinaria complejidad. En 2017, el proyecto **ScanPyramids** utilizó muones cósmicos (partículas subatómicas que penetran la roca como rayos X de altísima energía) para escanear el interior de la Gran Pirámide sin excavar. Descubrieron una gran cavidad oculta de al menos 30 metros de largo justo encima de la Gran Galería, que nunca había sido reportada en documentos históricos. Es una "habitación misteriosa" cuya función desconocemos. El uso de muones para arqueología es un ejemplo perfecto de física moderna al servicio de la historia.',
        'Las pirámides de Guiza no son únicas: existen más de **130 pirámides** en Egipto, construidas entre el 2630 y el 1640 a.C. Las primeras pirámides fueron escalonadas (como la de Zoser en Saqqara, del 2650 a.C., la primera estructura monumental de piedra del mundo). Con el tiempo, evolucionaron hacia pirámides de caras lisas. La "Pirámide Acodada" de Sneferu (Dashur) muestra un cambio de ángulo a mitad de construcción, quizás porque los ingenieros vieron que era demasiado empinada para su método. Esto nos dice algo importante: los egipcios aprendían de sus errores y mejoraban sus técnicas con cada proyecto, como cualquier científico o ingeniero moderno.',
      ]
    }
  }
};

function appendSectionToModule(moduleId, newSection) {
  let text = fs.readFileSync(COURSE_DATA_PATH, 'utf8');
  
  const search = `"id": "${moduleId}"`;
  let idIdx = text.indexOf(search);
  if (idIdx < 0) {
    idIdx = text.indexOf(`"id":"${moduleId}"`);
  }
  if (idIdx < 0) {
    console.error(`Module ${moduleId} not found`);
    return false;
  }
  
  // Find sections array
  const ceIdx = text.indexOf('"contentEs"', idIdx);
  if (ceIdx < 0 || ceIdx - idIdx > 3000) {
    console.error(`contentEs not found for ${moduleId}`);
    return false;
  }
  
  const sectIdx = text.indexOf('"sections"', ceIdx);
  if (sectIdx < 0) {
    console.error(`sections not found for ${moduleId}`);
    return false;
  }
  
  const arrStart = text.indexOf('[', sectIdx);
  if (arrStart < 0) return false;
  
  // Find matching ]
  let depth = 0;
  let arrEnd = arrStart;
  for (let i = arrStart; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') {
      depth--;
      if (depth === 0) { arrEnd = i; break; }
    }
  }
  
  // Parse existing sections
  let existingSections;
  try {
    existingSections = JSON.parse(text.substring(arrStart, arrEnd + 1));
  } catch(e) {
    console.error(`Parse error for ${moduleId}:`, e.message);
    return false;
  }
  
  // Check if we already have 15+ paragraphs
  const totalParas = existingSections.reduce((sum, s) => sum + (s.text || []).length, 0);
  if (totalParas >= 15) {
    console.log(`✓ ${moduleId} already has ${totalParas} paragraphs - skipping`);
    return true;
  }
  
  // Check if this extra section already exists
  const alreadyHas = existingSections.some(s => s.id === newSection.id);
  if (!alreadyHas) {
    existingSections.push(newSection);
  }
  
  const newArr = JSON.stringify(existingSections, null, 6);
  text = text.substring(0, arrStart) + newArr + text.substring(arrEnd + 1);
  fs.writeFileSync(COURSE_DATA_PATH, text, 'utf8');
  
  const newTotal = existingSections.reduce((sum, s) => sum + (s.text || []).length, 0);
  console.log(`✓ ${moduleId}: now has ${newTotal} paragraphs`);
  return true;
}

// Process egypt_m1 and egypt_m2 as test
console.log('Processing Egypt modules (batch 1)...');
for (const [moduleId, data] of Object.entries(EGYPT_EXTRA)) {
  appendSectionToModule(moduleId, data.extraSection);
}
console.log('Done!');
