/**
 * fix_quiz_insert.js
 * For modules that have no quizEs key yet, inserts the quizEs array.
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

function insertOrReplaceQuiz(src, moduleId, newQuiz) {
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const nextMod = src.indexOf(`"id": "`, modStart + moduleId.length + 10);
  const modEnd = nextMod === -1 ? src.length : nextMod;
  const chunk = src.slice(modStart, modEnd);
  
  const quizKeyIdx = chunk.indexOf('"quizEs"');
  if (quizKeyIdx !== -1) {
    // Replace existing quizEs array
    const qArrOpenRel = chunk.indexOf('[', quizKeyIdx);
    let d = 0, j = qArrOpenRel;
    while (j < chunk.length) {
      if (chunk[j] === '[') d++;
      else if (chunk[j] === ']') { d--; if (d === 0) break; }
      j++;
    }
    src = src.slice(0, modStart + qArrOpenRel) +
          JSON.stringify(newQuiz, null, 6) +
          src.slice(modStart + j + 1);
    console.log(`✅ Replaced quiz for ${moduleId}`);
  } else {
    // No quizEs — find the module's closing brace and insert before it
    // The module object ends before the next module's object start, search for "},\n  {" or end of array
    // We look for the last } in the chunk that closes the whole module object
    // Strategy: find contentEs closing brace, then find the module's closing }, and insert quizEs before it
    
    // Find contentEs block end
    const contentEsIdx = chunk.indexOf('"contentEs"');
    if (contentEsIdx === -1) { console.log(`No contentEs in ${moduleId}`); return src; }
    const contentOpen = chunk.indexOf('{', contentEsIdx);
    let depth = 0, k = contentOpen;
    while (k < chunk.length) {
      if (chunk[k] === '{') depth++;
      else if (chunk[k] === '}') { depth--; if (depth === 0) break; }
      k++;
    }
    // k is now at the closing } of contentEs. After this, find the module's closing }
    const afterContent = chunk.slice(k + 1);
    // Find the closing } of the whole module object
    const modCloseRel = k + 1 + afterContent.indexOf('}');
    
    // Insert quizEs after contentEs closing brace
    const insertAt = modStart + k + 1;
    const quizStr = ',\n    "quizEs": ' + JSON.stringify(newQuiz, null, 6);
    src = src.slice(0, insertAt) + quizStr + src.slice(insertAt);
    console.log(`✅ Inserted quiz for ${moduleId}`);
  }
  return src;
}

const QUIZ5 = {
  area51_m1: [
    { q: "¿En qué estado de Estados Unidos se encuentra el Área 51?", options: ["Texas","California","Nevada","Arizona"], a: 2 },
    { q: "¿Cuál fue uno de los primeros aviones espía probados en el Área 51?", options: ["SR-71 Blackbird","U-2","B-2 Spirit","F-117"], a: 1 },
    { q: "¿Por qué la tecnología stealth hace casi invisible un avión para el radar?", options: ["Porque vuela muy alto","Porque vuela muy rápido","Porque sus formas desvían las ondas de radar","Porque está pintado de negro"], a: 2 },
    { q: "¿Cuántas veces la velocidad del sonido alcanzaba el SR-71 Blackbird?", options: ["Una vez","Dos veces","Tres veces","Cuatro veces"], a: 2 },
    { q: "¿Qué publicó la CIA en 2013 sobre el Área 51?", options: ["Que ahí vivían alienígenas","Que el lugar no existe","Que era una base para probar aviones espía","Que tenía tecnología extraterrestre"], a: 2 }
  ],
  area51_m2: [
    { q: "¿A qué altura máxima podía volar el avión espía U-2?", options: ["5 km","10 km","21 km","50 km"], a: 2 },
    { q: "¿De qué metal estaba construido principalmente el SR-71 Blackbird?", options: ["Aluminio","Acero","Titanio","Platino"], a: 2 },
    { q: "¿Qué piloto americano fue capturado por los soviéticos en 1960?", options: ["Neil Armstrong","Chuck Yeager","John Glenn","Francis Gary Powers"], a: 3 },
    { q: "¿Cómo se llama la tecnología que hace invisible un avión para el radar?", options: ["Stealth","Supersónica","Hipersónica","Subórbital"], a: 0 },
    { q: "¿Cuál fue el primer avión stealth operativo volado desde el Área 51?", options: ["SR-71 Blackbird","U-2","F-117 Nighthawk","B-2 Spirit"], a: 2 }
  ],
  area51_m3: [
    { q: "¿En qué año ocurrió el incidente de Roswell?", options: ["1945","1947","1952","1960"], a: 1 },
    { q: "¿Qué era realmente el objeto que cayó cerca de Roswell en 1947?", options: ["Una nave extraterrestre","Un cohete soviético","Un globo del Proyecto Mogul","Un avión experimental U-2"], a: 2 },
    { q: "¿Por qué el gobierno no podía explicar los avistamientos de OVNIs cerca del Área 51?", options: ["Porque eran extraterrestres","Porque no sabían qué eran","Porque revelar la verdad expondría sus aviones secretos","Porque los pilotos mentían"], a: 2 },
    { q: "¿Qué evento masivo en internet de 2019 involucró al Área 51?", options: ["Un concierto","Una maratón de videos","Una propuesta de asaltar la base","Un torneo de videojuegos"], a: 2 },
    { q: "¿Cómo se llama la tendencia a buscar explicaciones extraordinarias ante secretos?", options: ["Pensamiento científico","Pensamiento conspirativo","Pensamiento crítico","Pensamiento lateral"], a: 1 }
  ],
  area51_m4: [
    { q: "¿Qué estudia la aerodinámica?", options: ["El movimiento de los planetas","El comportamiento de objetos en el agua","El movimiento de objetos a través del aire","La temperatura del espacio"], a: 2 },
    { q: "¿Por qué el titanio fue clave para los aviones del Área 51?", options: ["Es invisible al radar","Es ligero, fuerte y soporta altas temperaturas","Es el metal más barato","Lo fabricaban en el Área 51"], a: 1 },
    { q: "¿Qué hacen los materiales absorbentes de radar en aviones stealth?", options: ["Reflejan el radar al enemigo","Convierten ondas de radar en calor","Emiten señales que confunden al radar","Bloquean físicamente las ondas"], a: 1 },
    { q: "¿Qué necesita la ciencia para considerar válida una afirmación?", options: ["Testimonios personales","Fotos borrosas","Evidencia medible y experimentos repetibles","La opinión de muchas personas"], a: 2 },
    { q: "¿Para qué sirven los sistemas inerciales de navegación?", options: ["Para ver a través de las nubes","Para comunicarse con satélites","Para calcular posición sin señales externas usando giroscopios","Para detectar aviones enemigos"], a: 2 }
  ],
  area51_m5: [
    { q: "¿Cómo se llamaba el grupo secreto de ingeniería de Lockheed?", options: ["Area Works","Skunk Works","Black Works","Desert Works"], a: 1 },
    { q: "¿Quién fue el fundador del Skunk Works?", options: ["Ben Rich","Kelly Johnson","Werner von Braun","Howard Hughes"], a: 1 },
    { q: "¿Cómo se llamaba el servicio secreto de transporte aéreo al Área 51?", options: ["Shadow Air","Ghost Airlines","JANET Airlines","Secret Wings"], a: 2 },
    { q: "¿Qué desafío especial tenía el U-2 al aterrizar?", options: ["Necesitaba una pista de 10 km","Otro piloto en auto debía guiarlo por radio","Debía aterrizar en la oscuridad","Solo aterrizaba con viento en contra"], a: 1 },
    { q: "¿Qué modelo de innovación estableció el Área 51?", options: ["Equipos enormes con burocracia","Trabajo individual sin coordinación","Equipos pequeños y ágiles con libertad creativa","Solo ingenieros militares"], a: 2 }
  ],
  apollo8_m1: [
    { q: "¿En qué año se realizó la misión Apollo 8?", options: ["1966","1967","1968","1969"], a: 2 },
    { q: "¿Quién tomó la famosa fotografía 'Earthrise'?", options: ["Frank Borman","James Lovell","William Anders","Neil Armstrong"], a: 2 },
    { q: "¿Cuánto duró aproximadamente el viaje de la Tierra a la Luna?", options: ["Un día","Tres días","Una semana","Dos semanas"], a: 1 },
    { q: "¿Por qué era crítica la maniobra de inserción en órbita lunar?", options: ["Requería mucho combustible","Se realizaba sin comunicación, detrás de la Luna","Los astronautas debían salir al espacio","El cohete podía explotar"], a: 1 },
    { q: "¿Qué texto leyeron los astronautas en la transmisión de Nochebuena?", options: ["El Corán","El Quijote","Los primeros versículos del Génesis","La Declaración de Independencia"], a: 2 }
  ],
  apollo8_m2: [
    { q: "¿Quién diseñó el cohete Saturn V?", options: ["Neil Armstrong","Wernher von Braun","John Glenn","Alan Shepard"], a: 1 },
    { q: "¿Cuántas capas tenía el traje espacial de la Apollo 8?", options: ["5 capas","10 capas","21 capas","35 capas"], a: 2 },
    { q: "¿Cuál era el retraso en las comunicaciones con la Tierra?", options: ["0.5 segundos","1.3 segundos","5 segundos","10 segundos"], a: 1 },
    { q: "¿A qué velocidad regresó la Apollo 8 a la atmósfera terrestre?", options: ["5,000 km/h","15,000 km/h","25,000 km/h","40,000 km/h"], a: 3 },
    { q: "¿Cuántas personas contribuyeron al programa Apollo?", options: ["10,000","50,000","200,000","400,000"], a: 3 }
  ],
  apollo10_m1: [
    { q: "¿Cómo se llamaba el módulo lunar de la Apollo 10?", options: ["Eagle","Charlie Brown","Snoopy","Columbia"], a: 2 },
    { q: "¿A qué distancia mínima de la superficie lunar llegó la Apollo 10?", options: ["5 km","15 km","50 km","100 km"], a: 1 },
    { q: "¿Qué récord estableció la Apollo 10 que sigue vigente?", options: ["El cohete más poderoso","La mayor velocidad de seres humanos","El vuelo más largo en la Luna","El mayor número de órbitas lunares"], a: 1 },
    { q: "¿Qué incidente dramático ocurrió al separar los módulos del Snoopy?", options: ["Se quedaron sin combustible","El módulo comenzó a girar descontroladamente","Se rompió la antena","Perdieron contacto con Houston"], a: 1 },
    { q: "¿Por qué la NASA no aterrizó durante la Apollo 10?", options: ["Miedo de los astronautas","Sistema de aterrizaje roto","El módulo no llevaba suficiente combustible y los procedimientos no estaban finalizados","Superficie demasiado rocosa"], a: 2 }
  ]
};

for (const [id, quiz] of Object.entries(QUIZ5)) {
  src = insertOrReplaceQuiz(src, id, quiz);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ All quiz insertions done!');
