/**
 * FINAL UNIVERSAL PATCHER
 * Uses "order": as the module boundary detector (each module has a unique "order" key)
 * This avoids the problem of nested "id" keys inside sections.
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');

/**
 * Find the end of a module by finding the next "order": after the first one.
 * Returns the index of the start of the next module's "id" key.
 */
function getModuleChunk(src, moduleId) {
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) return null;
  // Find the "order": key in this module
  const orderIdx = src.indexOf('"order":', modStart);
  if (orderIdx === -1) return null;
  // Find the NEXT "order": key which signals the next module
  const nextOrderIdx = src.indexOf('"order":', orderIdx + 10);
  // The next module starts before the next "order": key — find the last "id": " before it
  const modEnd = nextOrderIdx === -1 ? src.length : nextOrderIdx - 10; // small buffer
  return { modStart, modEnd, chunk: src.slice(modStart, modEnd) };
}

/**
 * Append extra paragraphs to the first text[] in a module and replace/insert quizEs.
 */
function patchModule(src, moduleId, extraParagraphs, newQuiz) {
  const info = getModuleChunk(src, moduleId);
  if (!info) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  let { modStart, modEnd, chunk } = info;

  // Find text[] in this chunk
  const textKeyIdx = chunk.indexOf('"text"');
  if (textKeyIdx === -1) { console.log(`NO TEXT KEY: ${moduleId} (chunk len=${chunk.length})`); return src; }
  const arrOpen = chunk.indexOf('[', textKeyIdx);
  if (arrOpen === -1) { console.log(`NO ARRAY: ${moduleId}`); return src; }
  
  // Find matching close bracket
  let d = 0, i = arrOpen;
  while (i < chunk.length) {
    if (chunk[i] === '[') d++;
    else if (chunk[i] === ']') { d--; if (d === 0) break; }
    i++;
  }
  
  // Insert extra paragraphs before the closing ]
  const insertStr = extraParagraphs.map(p => ',\n            ' + JSON.stringify(p)).join('');
  src = src.slice(0, modStart + i) + insertStr + src.slice(modStart + i);

  // Re-locate module after edit
  const info2 = getModuleChunk(src, moduleId);
  if (!info2) { console.log(`RELOCATION FAILED: ${moduleId}`); return src; }
  const { modStart: ms2, chunk: chunk2 } = info2;

  // Replace or insert quizEs
  const quizKeyIdx = chunk2.indexOf('"quizEs"');
  if (quizKeyIdx !== -1) {
    const qOpen = chunk2.indexOf('[', quizKeyIdx);
    let d2 = 0, j = qOpen;
    while (j < chunk2.length) {
      if (chunk2[j] === '[') d2++;
      else if (chunk2[j] === ']') { d2--; if (d2 === 0) break; }
      j++;
    }
    src = src.slice(0, ms2 + qOpen) + JSON.stringify(newQuiz, null, 6) + src.slice(ms2 + j + 1);
    console.log(`✅ Patched ${moduleId} (quiz replaced)`);
  } else {
    // Insert quizEs after contentEs closing brace
    const info3 = getModuleChunk(src, moduleId);
    const { modStart: ms3, chunk: chunk3 } = info3;
    const cIdx = chunk3.indexOf('"contentEs"');
    const cOpen = chunk3.indexOf('{', cIdx);
    let d3 = 0, k = cOpen;
    while (k < chunk3.length) {
      if (chunk3[k] === '{') d3++;
      else if (chunk3[k] === '}') { d3--; if (d3 === 0) break; }
      k++;
    }
    src = src.slice(0, ms3 + k + 1) +
          ',\n    "quizEs": ' + JSON.stringify(newQuiz, null, 6) +
          src.slice(ms3 + k + 1);
    console.log(`✅ Patched ${moduleId} (quiz inserted)`);
  }

  return src;
}

// ══════════════════════════════════════════════════════════════════
// ONLY replace text (no extra appending) — for modules needing full replacement
// ══════════════════════════════════════════════════════════════════
function replaceTextAndQuiz(src, moduleId, fullText, newQuiz) {
  const info = getModuleChunk(src, moduleId);
  if (!info) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  let { modStart, chunk } = info;

  const textKeyIdx = chunk.indexOf('"text"');
  if (textKeyIdx === -1) { console.log(`NO TEXT KEY: ${moduleId}`); return src; }
  const arrOpen = chunk.indexOf('[', textKeyIdx);
  let d = 0, i = arrOpen;
  while (i < chunk.length) {
    if (chunk[i] === '[') d++;
    else if (chunk[i] === ']') { d--; if (d === 0) break; }
    i++;
  }
  src = src.slice(0, modStart + arrOpen) + JSON.stringify(fullText, null, 12) + src.slice(modStart + i + 1);

  // Re-locate
  const info2 = getModuleChunk(src, moduleId);
  const { modStart: ms2, chunk: chunk2 } = info2;
  const quizKeyIdx = chunk2.indexOf('"quizEs"');
  if (quizKeyIdx !== -1) {
    const qOpen = chunk2.indexOf('[', quizKeyIdx);
    let d2 = 0, j = qOpen;
    while (j < chunk2.length) {
      if (chunk2[j] === '[') d2++;
      else if (chunk2[j] === ']') { d2--; if (d2 === 0) break; }
      j++;
    }
    src = src.slice(0, ms2 + qOpen) + JSON.stringify(newQuiz, null, 6) + src.slice(ms2 + j + 1);
    console.log(`✅ Replaced ${moduleId} (quiz replaced)`);
  } else {
    const info3 = getModuleChunk(src, moduleId);
    const { modStart: ms3, chunk: chunk3 } = info3;
    const cIdx = chunk3.indexOf('"contentEs"');
    const cOpen = chunk3.indexOf('{', cIdx);
    let d3 = 0, k = cOpen;
    while (k < chunk3.length) {
      if (chunk3[k] === '{') d3++;
      else if (chunk3[k] === '}') { d3--; if (d3 === 0) break; }
      k++;
    }
    src = src.slice(0, ms3 + k + 1) +
          ',\n    "quizEs": ' + JSON.stringify(newQuiz, null, 6) +
          src.slice(ms3 + k + 1);
    console.log(`✅ Replaced ${moduleId} (quiz inserted)`);
  }
  return src;
}

module.exports = { patchModule, replaceTextAndQuiz, getModuleChunk };

// Only execute Apollo 11 patching when this script is run directly
if (require.main === module) {
let src = fs.readFileSync(FILE, 'utf8');
// ════════════════════════════════════════════════════════
// APOLLO 11 — append 5 paragraphs to each of 6 modules
// ════════════════════════════════════════════════════════
const APOLLO11_DATA = {
  apollo11_m1: {
    extra: [
      "Los ingenieros del Saturn V resolvieron el problema de refrigeración haciendo circular el combustible a través de tubos en las paredes de los motores antes de quemarlo. Así el combustible actuaba como refrigerante antes de convertirse en propulsor.",
      "El ruido del despegue era tan ensordecedor que dañaba los oídos a kilómetros. Para absorber el sonido, la plataforma descargaba 1.1 millones de litros de agua en 30 segundos, formando nubes de vapor que amortiguaban las ondas de sonido.",
      "Después del despegue, los astronautas realizaron la 'inserción trans-lunar' (TLI): el motor de la tercera etapa se encendió por segunda vez durante 6 minutos para acelerar la nave a 40,000 km/h y escapar de la órbita terrestre hacia la Luna.",
      "Luego hicieron la 'transposición y acoplamiento': el Módulo de Mando giraba, se acoplaba al Módulo Lunar alojado en la tercera etapa, y lo extraía para el viaje conjunto. Era una maniobra delicada que nunca antes se había intentado en una misión real.",
      "La trayectoria elegida fue una 'órbita de transferencia libre': si todos los motores fallaban, la gravedad de la Luna haría regresar la nave a la Tierra por sí sola. Esta previsión salvó a los astronautas de la Apollo 13 cuando su tanque de oxígeno explotó en 1970."
    ],
    quiz: [
      { q: "¿Cuánto tiempo duró la primera etapa del Saturn V en encendido?", options: ["30 segundos","2.5 minutos","6 minutos","10 minutos"], a: 1 },
      { q: "¿Qué descargaba la plataforma de lanzamiento para absorber el ruido?", options: ["Arena","Espuma","1.1 millones de litros de agua","Gas inerte"], a: 2 },
      { q: "¿Cómo se llama la maniobra de encender el motor para ir a la Luna?", options: ["Inserción trans-lunar (TLI)","Inserción en órbita lunar","Transposición y acoplamiento","Rendezvous orbital"], a: 0 },
      { q: "¿A qué velocidad viajó la Apollo 11 hacia la Luna tras el segundo encendido?", options: ["10,000 km/h","20,000 km/h","40,000 km/h","100,000 km/h"], a: 2 },
      { q: "¿Qué ventaja tenía la 'órbita de transferencia libre'?", options: ["Era más rápida","Si los motores fallaban, la nave regresaba sola a la Tierra","Usaba menos combustible","Permitía volar más cerca de la Luna"], a: 1 }
    ]
  },
  apollo11_m2: {
    extra: [
      "El Centro Espacial Kennedy fue construido en la isla Merritt, Florida, porque lanzar cohetes hacia el este sobre el océano era seguro y la rotación de la Tierra aportaba velocidad extra al cohete, reduciendo el combustible necesario.",
      "El VAB (Vehicle Assembly Building) donde se construía el Saturn V es uno de los edificios más grandes del mundo por volumen. Es tan enorme que tiene su propio clima: se forman nubes dentro cuando hay alta humedad. Sigue operando hoy para ensamblar los cohetes del programa Artemis.",
      "El cohete viajaba desde el VAB hasta la plataforma 39A sobre el Crawler Transporter, una plataforma autopropulsada de 2,700 toneladas que se mueve a 1.6 km/h con una precisión milimétrica. Es la máquina terrestre más pesada jamás construida.",
      "La misión fue fotografiada con cámaras Hasselblad de formato medio. Las imágenes que los astronautas tomaron en la Luna son tan técnicamente perfectas que hoy se usan como referencia artística. Se tomaron más de 1,400 fotografías durante toda la misión.",
      "El trabajo de Katherine Johnson y las demás 'computadoras humanas' del Centro Langley fue fundamental. Katherine calculó a mano las trayectorias orbitales de las primeras misiones, y sus resultados eran tan precisos que los ingenieros los verificaban con las computadoras electrónicas."
    ],
    quiz: [
      { q: "¿Por qué se eligió Florida como base de lanzamiento?", options: ["Buen clima todo el año","Seguridad y velocidad extra de la rotación terrestre","Cercanía con Houston","Grandes extensiones deshabitadas"], a: 1 },
      { q: "¿Cómo se llama el edificio donde se ensamblaba el Saturn V?", options: ["VAB","LAB","HAB","CAB"], a: 0 },
      { q: "¿Cuánto pesa el Crawler Transporter?", options: ["270 toneladas","1,000 toneladas","2,700 toneladas","10,000 toneladas"], a: 2 },
      { q: "¿Qué marca de cámara usaron los astronautas en la Luna?", options: ["Nikon","Canon","Kodak","Hasselblad"], a: 3 },
      { q: "¿Quién calculó a mano las trayectorias orbitales de las primeras misiones NASA?", options: ["Wernher von Braun","Gene Kranz","Katherine Johnson","Margaret Hamilton"], a: 2 }
    ]
  },
  apollo11_m3: {
    extra: [
      "Las rocas lunares conservan la historia del sistema solar de hace 4,500 millones de años porque la Luna no tiene tectónica de placas que recicle las rocas. Son como una cápsula del tiempo que ninguna roca terrestre puede reemplazar.",
      "Los cráteres más grandes y erosionados son los más viejos; los más pequeños con bordes afilados son los más recientes. Los científicos usan la densidad de cráteres para calcular la edad de una región: se llama 'cronología de impactos'.",
      "El polo sur lunar tiene cráteres cuyo fondo nunca recibe luz solar. Permanecen a -250°C. El hielo que llegó allí con cometas hace millones de años se conserva intacto. Es el recurso más valioso para las futuras bases humanas.",
      "La Luna tiene lava tubes: túneles subterráneos creados por flujos de lava volcánica hace miles de millones de años. Pueden medir kilómetros y tener decenas de metros de diámetro. Serían bases ideales: protegen de la radiación solar y los micrometeoritos.",
      "Los astronautas describieron un olor extraño al polvo lunar cuando regresaban al módulo: Armstrong lo llamó 'pólvora mojada' y Aldrin 'cenizas de chimenea'. Las partículas cargadas eléctricamente reaccionan con el oxígeno del aire del módulo, creando ese olor único."
    ],
    quiz: [
      { q: "¿Por qué las rocas lunares son científicamente tan valiosas?", options: ["Son de oro","Conservan la historia del sistema solar de hace 4,500 Ma","Tienen propiedades medicinales","Son más duras que el diamante"], a: 1 },
      { q: "¿Cómo se llama la técnica de medir edades por densidad de cráteres?", options: ["Datación radiométrica","Geología estructural","Cronología de impactos","Selenocronología"], a: 2 },
      { q: "¿Qué son los 'lava tubes' de la Luna?", options: ["Volcanes activos","Túneles subterráneos creados por lava antigua","Grietas en la corteza","Ríos de magma activos"], a: 1 },
      { q: "¿A qué temperatura están los fondos de los cráteres polares lunares?", options: ["-50°C","-100°C","-173°C","-250°C"], a: 3 },
      { q: "¿Cómo describió Neil Armstrong el olor del polvo lunar?", options: ["Flores frescas","Pólvora mojada","Plástico quemado","Sin olor"], a: 1 }
    ]
  },
  apollo11_m4: {
    extra: [
      "Durante el vuelo de regreso los astronautas midieron la radiación espacial, tomaron fotografías desde distintos ángulos y registraron sus observaciones en diarios de a bordo que se convirtieron en valiosos documentos históricos de la exploración.",
      "El Columbia tenía apenas 3.9 metros de diámetro interior habitable — menos espacio que el interior de un auto compacto moderno. Los tres astronautas comían, dormían y trabajaban en ese espacio diminuto durante ocho días completos.",
      "El escudo térmico estaba hecho de AVCOAT, una resina epoxi que se ablada: se quema y evapora al contacto con la atmósfera caliente y, al evaporarse, lleva el calor consigo en lugar de transmitirlo a la cápsula.",
      "La reentrada expuso a los astronautas a fuerzas de hasta 6.5G: cada kilogramo de su cuerpo pesaba 6.5 veces más. Cuerpos que habían vivido días en gravedad cero debían soportar de pronto ese esfuerzo físico brutal.",
      "El amerizaje fue tan preciso que el portaaviones USS Hornet esperaba a solo 24 kilómetros del punto donde aterrizó la cápsula. Los helicópteros la alcanzaron en minutos y los astronautas fueron izados a bordo en bolsas de aislamiento biológico como medida de precaución."
    ],
    quiz: [
      { q: "¿Cuánto medía el espacio habitable del Módulo de Mando Columbia?", options: ["1.5 m de diámetro","3.9 m de diámetro","6.5 m de diámetro","10 m de diámetro"], a: 1 },
      { q: "¿Qué material especial tenía el escudo térmico?", options: ["Titanio reforzado","AVCOAT (resina epoxi ablativa)","Aluminio cerámico","Fibra de carbono"], a: 1 },
      { q: "¿Cuántos G soportaron los astronautas en la reentrada?", options: ["1G","3G","6.5G","10G"], a: 2 },
      { q: "¿A cuántos kilómetros del amerizaje esperaba el USS Hornet?", options: ["2 km","24 km","100 km","500 km"], a: 1 },
      { q: "¿Cuántos días duró la misión Apollo 11 en total?", options: ["5 días","8 días","12 días","21 días"], a: 1 }
    ]
  },
  apollo11_m5: {
    extra: [
      "Margaret Hamilton dirigió el equipo que programó el software del AGC. Su código era tan robusto que manejó las alarmas durante el descenso sin interrumpir la misión. Ella acuñó el término 'ingeniería de software' para describir su trabajo, elevando la programación al nivel de las ingenierías clásicas.",
      "El traje espacial fue diseñado por ILC Dover, que tenía experiencia previa en confección de ropa íntima. La expertise en costuras flexibles y herméticas resultó perfecta: el traje debía tener 21 capas diferentes, ser impermeable al vacío y permitir moverse.",
      "La NASA compró tal cantidad de chips de silicio para el AGC que prácticamente fundó la industria de semiconductores. Sin el programa Apollo, el desarrollo de los microprocesadores podría haber tardado años más en comercializarse.",
      "Los sensores de los trajes transmitían en tiempo real el ritmo cardíaco, temperatura y presión sanguínea de los astronautas. Esa tecnología de telemetría médica evolucionó en los monitores cardíacos que hoy salvan millones de vidas en hospitales del mundo.",
      "Toda la documentación técnica — manuales, diagramas, transcriptos de comunicaciones — está digitalizada y disponible públicamente en los archivos de la NASA. Es una de las bibliotecas científicas más completas de la historia de la ingeniería."
    ],
    quiz: [
      { q: "¿Quién dirigió el equipo de software del Apollo y acuñó 'ingeniería de software'?", options: ["Gene Kranz","Jack Garman","Margaret Hamilton","Katherine Johnson"], a: 2 },
      { q: "¿Qué empresa fabricó los trajes espaciales Apollo?", options: ["Boeing","Lockheed Martin","ILC Dover","Grumman"], a: 2 },
      { q: "¿Qué impacto tuvo el Apollo en los chips de computadora?", options: ["Ninguno","Retrasó el desarrollo","La NASA prácticamente fundó la industria de semiconductores","Solo usaron chips soviéticos"], a: 2 },
      { q: "¿Qué tecnología médica actual se originó en los sensores de los trajes Apollo?", options: ["Las vacunas","Los monitores cardíacos hospitalarios","Los rayos X digitales","Los escáneres MRI"], a: 1 },
      { q: "¿Dónde están hoy los documentos técnicos de la misión Apollo?", options: ["Destruidos","En museo en la Luna","Secretos","Digitalizados y públicos en la NASA"], a: 3 }
    ]
  },
  apollo11_m6: {
    extra: [
      "El Gateway es una pequeña estación espacial que orbitará la Luna como parte del programa Artemis. Servirá como base para misiones lunares y trampolín hacia Marte. La Agencia Espacial Europea, Japón y Canadá colaboran en su construcción.",
      "El Starship de SpaceX será el vehículo lunar del programa Artemis. Es el cohete más poderoso jamás construido, superando al Saturn V. Su versión lunar aterrizará directamente en la superficie sin necesitar un módulo separado.",
      "La Luna contiene helio-3 (potencial combustible para fusión nuclear), metales de tierras raras y agua helada para combustible. Empresas privadas planean operaciones mineras lunares en las próximas décadas, convirtiendo la exploración en una industria.",
      "El rover Perseverance en Marte, el telescopio espacial James Webb y la sonda Voyager 1 (que ya salió del sistema solar) demuestran que la exploración robótica sigue expandiendo el conocimiento humano más allá de lo que imaginaron los creadores del Apollo.",
      "Los estudiantes de hoy son la generación que llegará a Marte. La historia del Apollo 11 no es solo pasado: es la demostración de que cuando la humanidad combina ciencia, trabajo en equipo y determinación, puede alcanzar lo que parece imposible. El siguiente gran paso es tuyo."
    ],
    quiz: [
      { q: "¿Qué es el Gateway en el programa Artemis?", options: ["Un nuevo cohete","Una estación espacial en órbita lunar","El nombre del Módulo Lunar","Una base en la superficie lunar"], a: 1 },
      { q: "¿Qué empresa construye el Starship para misiones lunares?", options: ["NASA","Blue Origin","SpaceX","Boeing"], a: 2 },
      { q: "¿Qué recurso lunar podría usarse en futura energía de fusión nuclear?", options: ["Hierro","Helio-3","Agua helada","Regolito"], a: 1 },
      { q: "¿Qué hito especial logró la sonda Voyager 1?", options: ["Llegó a Marte","Fotografió agujeros negros","Salió del sistema solar","Aterrizó en Europa"], a: 2 },
      { q: "¿Cuál es el siguiente gran destino humano en el espacio después de la Luna?", options: ["Venus","Marte","Los asteroides","Júpiter"], a: 1 }
    ]
  }
};

for (const [moduleId, data] of Object.entries(APOLLO11_DATA)) {
  src = patchModule(src, moduleId, data.extra, data.quiz);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ Apollo 11 (m1-m6) all patched!');
} // end if (require.main === module)

