/**
 * Universal content + quiz patcher
 * Finds each module by ID, replaces text[] in its first section,
 * and replaces its quizEs[] array correctly.
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

function patchModule(src, moduleId, newText, newQuiz) {
  // ── 1. Find module start ──────────────────────────────────
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }

  // ── 2. Find the NEXT module's start (to bound all searches) ─
  const nextModStart = src.indexOf(`"id": "`, modStart + moduleId.length + 10);
  const modEnd = nextModStart === -1 ? src.length : nextModStart;

  // ── 3. Replace text[] in first section ───────────────────
  const moduleChunk = src.slice(modStart, modEnd);
  const textKeyIdx = moduleChunk.indexOf('"text"');
  if (textKeyIdx === -1) { console.log(`NO TEXT KEY: ${moduleId}`); return src; }
  const arrOpenRel = moduleChunk.indexOf('[', textKeyIdx);
  let depth = 0, i = arrOpenRel;
  while (i < moduleChunk.length) {
    if (moduleChunk[i] === '[') depth++;
    else if (moduleChunk[i] === ']') { depth--; if (depth === 0) break; }
    i++;
  }
  const before = src.slice(0, modStart + arrOpenRel);
  const after  = src.slice(modStart + i + 1);
  src = before + JSON.stringify(newText, null, 12) + after;

  // ── 4. Re-locate module bounds after text replacement ────
  const modStart2  = src.indexOf(`"id": "${moduleId}"`);
  const nextMod2   = src.indexOf(`"id": "`, modStart2 + moduleId.length + 10);
  const modEnd2    = nextMod2 === -1 ? src.length : nextMod2;
  const moduleChunk2 = src.slice(modStart2, modEnd2);

  // ── 5. Replace quizEs[] ──────────────────────────────────
  const quizKeyIdx = moduleChunk2.indexOf('"quizEs"');
  if (quizKeyIdx !== -1) {
    const qArrOpenRel = moduleChunk2.indexOf('[', quizKeyIdx);
    let d2 = 0, j = qArrOpenRel;
    while (j < moduleChunk2.length) {
      if (moduleChunk2[j] === '[') d2++;
      else if (moduleChunk2[j] === ']') { d2--; if (d2 === 0) break; }
      j++;
    }
    const bef2 = src.slice(0, modStart2 + qArrOpenRel);
    const aft2 = src.slice(modStart2 + j + 1);
    src = bef2 + JSON.stringify(newQuiz, null, 6) + aft2;
  } else if (newQuiz) {
    // No quizEs yet — insert before the closing brace of the module
    const modStart3 = src.indexOf(`"id": "${moduleId}"`);
    const nextMod3  = src.indexOf(`"id": "`, modStart3 + moduleId.length + 10);
    const modEnd3   = nextMod3 === -1 ? src.length : nextMod3;
    const chunk3    = src.slice(modStart3, modEnd3);
    // Find the last closing brace before next module
    const closingBrace = chunk3.lastIndexOf('}');
    const insertPos = modStart3 + closingBrace;
    src = src.slice(0, insertPos) +
          ',\n    "quizEs": ' + JSON.stringify(newQuiz, null, 6) +
          '\n  ' + src.slice(insertPos);
  }

  console.log(`✅ Patched ${moduleId}`);
  return src;
}

// ════════════════════════════════════════════════════════════
// FIX QUIZ-ONLY: area51, apollo8, apollo10 already have content
// ════════════════════════════════════════════════════════════
const QUIZ5 = {
  area51_m1: [
    { q: "¿En qué estado de Estados Unidos se encuentra el Área 51?", options: ["Texas","California","Nevada","Arizona"], a: 2 },
    { q: "¿Cuál fue uno de los primeros aviones espía probados en el Área 51?", options: ["SR-71 Blackbird","U-2","B-2 Spirit","F-117"], a: 1 },
    { q: "¿Por qué la tecnología stealth hace que un avión sea casi invisible para el radar?", options: ["Porque vuela muy alto","Porque vuela muy rápido","Porque sus formas desvían las ondas de radar","Porque está pintado de negro"], a: 2 },
    { q: "¿Cuántas veces la velocidad del sonido podía alcanzar el SR-71 Blackbird?", options: ["Una vez","Dos veces","Tres veces","Cuatro veces"], a: 2 },
    { q: "¿Qué publicó la CIA en 2013 sobre el Área 51?", options: ["Que ahí vivían alienígenas","Que el lugar no existe","Que era una base para probar aviones espía","Que tenía tecnología extraterrestre"], a: 2 }
  ],
  area51_m2: [
    { q: "¿A qué altura máxima podía volar el avión espía U-2?", options: ["5 kilómetros","10 kilómetros","21 kilómetros","50 kilómetros"], a: 2 },
    { q: "¿De qué metal especial estaba construido principalmente el SR-71 Blackbird?", options: ["Aluminio","Acero","Titanio","Platino"], a: 2 },
    { q: "¿Qué piloto americano fue capturado por los soviéticos en 1960?", options: ["Neil Armstrong","Chuck Yeager","John Glenn","Francis Gary Powers"], a: 3 },
    { q: "¿Cómo se llama la tecnología que hace invisible a un avión para el radar?", options: ["Stealth","Supersónica","Hipersónica","Subórbital"], a: 0 },
    { q: "¿Cuál fue el primer avión stealth operativo en volar desde el Área 51?", options: ["SR-71 Blackbird","U-2","F-117 Nighthawk","B-2 Spirit"], a: 2 }
  ],
  area51_m3: [
    { q: "¿En qué año ocurrió el famoso incidente de Roswell?", options: ["1945","1947","1952","1960"], a: 1 },
    { q: "¿Qué era realmente el objeto que cayó cerca de Roswell en 1947?", options: ["Una nave extraterrestre","Un cohete soviético","Un globo del Proyecto Mogul","Un avión experimental U-2"], a: 2 },
    { q: "¿Por qué el gobierno americano no podía explicar los avistamientos de OVNIs cerca del Área 51?", options: ["Porque eran realmente extraterrestres","Porque no sabían qué eran","Porque revelar la verdad expondría sus aviones secretos","Porque los pilotos mentían"], a: 2 },
    { q: "¿Qué evento masivo de internet en 2019 involucró al Área 51?", options: ["Un concierto de música","Una maratón de videos","Una propuesta de asaltar la base","Un torneo de videojuegos"], a: 2 },
    { q: "¿Qué nombre recibe la tendencia humana a buscar explicaciones extraordinarias cuando hay secretos?", options: ["Pensamiento científico","Pensamiento conspirativo","Pensamiento crítico","Pensamiento lateral"], a: 1 }
  ],
  area51_m4: [
    { q: "¿Qué estudia la aerodinámica?", options: ["El movimiento de los planetas","El comportamiento de los objetos en el agua","El movimiento de los objetos a través del aire","La temperatura del espacio"], a: 2 },
    { q: "¿Por qué el titanio fue tan importante para los aviones del Área 51?", options: ["Porque es invisible al radar","Porque es ligero, fuerte y soporta altas temperaturas","Porque es el metal más barato","Porque lo fabricaban en el Área 51"], a: 1 },
    { q: "¿Qué hacen los materiales absorbentes de radar usados en aviones stealth?", options: ["Reflejan el radar hacia el enemigo","Convierten las ondas de radar en calor en lugar de reflejarlas","Emiten señales que confunden al radar","Bloquean físicamente las ondas de radar"], a: 1 },
    { q: "¿Qué necesita la ciencia para considerar válida una afirmación?", options: ["Testimonios personales","Fotos borrosas","Evidencia medible y experimentos repetibles","La opinión de muchas personas"], a: 2 },
    { q: "¿Para qué sirven los sistemas inerciales de navegación?", options: ["Para ver a través de las nubes","Para comunicarse con satélites","Para calcular la posición sin señales externas usando giroscopios","Para detectar aviones enemigos"], a: 2 }
  ],
  area51_m5: [
    { q: "¿Cómo se llamaba el grupo secreto de ingeniería de Lockheed que trabajó en los aviones del Área 51?", options: ["Area Works","Skunk Works","Black Works","Desert Works"], a: 1 },
    { q: "¿Qué ingeniero fue el fundador y primer director del Skunk Works?", options: ["Ben Rich","Kelly Johnson","Werner von Braun","Howard Hughes"], a: 1 },
    { q: "¿Cómo se llamaba el servicio secreto de transporte aéreo que llevaba trabajadores al Área 51?", options: ["Shadow Air","Ghost Airlines","JANET Airlines","Secret Wings"], a: 2 },
    { q: "¿Qué desafío único tenía el U-2 al momento de aterrizar?", options: ["Necesitaba una pista de 10 kilómetros","Otro piloto en auto debía guiarlo por radio","Debía aterrizar en la oscuridad","Solo podía aterrizar con viento en contra"], a: 1 },
    { q: "¿Qué modelo de innovación estableció el Área 51 que sigue usándose hoy?", options: ["Equipos enormes con mucha burocracia","Trabajo individual sin coordinación","Equipos pequeños y ágiles con libertad creativa","Solo ingenieros militares trabajando"], a: 2 }
  ],
  apollo8_m1: [
    { q: "¿En qué año se realizó la misión Apollo 8?", options: ["1966","1967","1968","1969"], a: 2 },
    { q: "¿Quién tomó la famosa fotografía 'Earthrise' (Amanecer de la Tierra)?", options: ["Frank Borman","James Lovell","William Anders","Neil Armstrong"], a: 2 },
    { q: "¿Cuánto duró aproximadamente el viaje de la Tierra a la Luna?", options: ["Un día","Tres días","Una semana","Dos semanas"], a: 1 },
    { q: "¿Por qué era tan crítica la maniobra de inserción en órbita lunar?", options: ["Porque requería mucho combustible","Porque se realizaba sin comunicación con la Tierra, detrás de la Luna","Porque los astronautas debían salir al espacio","Porque el cohete podía explotar"], a: 1 },
    { q: "¿Qué texto leyeron los astronautas en la transmisión de Nochebuena desde la órbita lunar?", options: ["El Corán","El Quijote","Los primeros versículos del Génesis","La Declaración de Independencia"], a: 2 }
  ],
  apollo8_m2: [
    { q: "¿Quién diseñó el cohete Saturn V?", options: ["Neil Armstrong","Wernher von Braun","John Glenn","Alan Shepard"], a: 1 },
    { q: "¿Cuántas capas tenía el traje espacial de los astronautas de la Apollo 8?", options: ["5 capas","10 capas","21 capas","35 capas"], a: 2 },
    { q: "¿Cuál era el retraso en las comunicaciones entre la nave y la Tierra?", options: ["0.5 segundos","1.3 segundos","5 segundos","10 segundos"], a: 1 },
    { q: "¿A qué velocidad regresó la Apollo 8 a la atmósfera terrestre?", options: ["5,000 km/h","15,000 km/h","25,000 km/h","40,000 km/h"], a: 3 },
    { q: "¿Cuántas personas aproximadamente contribuyeron al programa Apollo?", options: ["10,000","50,000","200,000","400,000"], a: 3 }
  ],
  apollo10_m1: [
    { q: "¿Cómo se llamaba el módulo lunar de la Apollo 10?", options: ["Eagle","Charlie Brown","Snoopy","Columbia"], a: 2 },
    { q: "¿A qué distancia mínima de la superficie lunar llegó el módulo lunar de la Apollo 10?", options: ["5 kilómetros","15 kilómetros","50 kilómetros","100 kilómetros"], a: 1 },
    { q: "¿Qué récord estableció la Apollo 10 que sigue en pie hasta hoy?", options: ["El cohete más poderoso","La mayor velocidad alcanzada por seres humanos","El vuelo más largo en la Luna","El mayor número de órbitas lunares"], a: 1 },
    { q: "¿Qué incidente dramático ocurrió cuando Stafford y Cernan intentaban separar los módulos del Snoopy?", options: ["Se quedaron sin combustible","El módulo comenzó a girar descontroladamente","Se rompió la antena de comunicaciones","Perdieron contacto con Houston"], a: 1 },
    { q: "¿Por qué la NASA decidió no aterrizar durante la Apollo 10?", options: ["Porque los astronautas tenían miedo","Porque el sistema de aterrizaje estaba roto","Porque el módulo no llevaba suficiente combustible y los procedimientos no estaban finalizados","Porque la superficie era demasiado rocosa"], a: 2 }
  ]
};

// For quiz-only fix, we just need to patch quizEs directly without changing text
function fixQuizOnly(src, moduleId, newQuiz) {
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const nextMod = src.indexOf(`"id": "`, modStart + moduleId.length + 10);
  const modEnd = nextMod === -1 ? src.length : nextMod;
  const chunk = src.slice(modStart, modEnd);
  
  const quizKeyIdx = chunk.indexOf('"quizEs"');
  if (quizKeyIdx !== -1) {
    const qArrOpenRel = chunk.indexOf('[', quizKeyIdx);
    let d2 = 0, j = qArrOpenRel;
    while (j < chunk.length) {
      if (chunk[j] === '[') d2++;
      else if (chunk[j] === ']') { d2--; if (d2 === 0) break; }
      j++;
    }
    src = src.slice(0, modStart + qArrOpenRel) +
          JSON.stringify(newQuiz, null, 6) +
          src.slice(modStart + j + 1);
  } else {
    console.log(`  No quizEs found for ${moduleId}, would need insertion`);
  }
  console.log(`✅ Fixed quiz for ${moduleId}`);
  return src;
}

// Fix all quiz-short modules
for (const [id, quiz] of Object.entries(QUIZ5)) {
  src = fixQuizOnly(src, id, quiz);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ All quiz fixes applied!');
