/**
 * patch_apollo11_v2.js
 * Appends 5 extra paragraphs to the text array of each apollo11 module
 * and replaces/inserts quizEs with 5 questions.
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

/**
 * Appends extra paragraphs to the FIRST text[] in a module,
 * then replaces/inserts quizEs.
 */
function appendTextAndFixQuiz(src, moduleId, extraParagraphs, newQuiz) {
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const nextMod = src.indexOf(`"id": "`, modStart + moduleId.length + 10);
  const modEnd = nextMod === -1 ? src.length : nextMod;
  const chunk = src.slice(modStart, modEnd);

  // Find first "text": [ ... ] in the module
  const textKeyIdx = chunk.indexOf('"text"');
  if (textKeyIdx === -1) { console.log(`NO TEXT KEY: ${moduleId}`); return src; }
  const arrOpen = chunk.indexOf('[', textKeyIdx);
  // Find matching close bracket
  let d = 0, i = arrOpen;
  while (i < chunk.length) {
    if (chunk[i] === '[') d++;
    else if (chunk[i] === ']') { d--; if (d === 0) break; }
    i++;
  }
  // i is at the closing ']'. Insert extra paragraphs before it.
  const insertStr = extraParagraphs.map(p => ',\n            ' + JSON.stringify(p)).join('');
  src = src.slice(0, modStart + i) + insertStr + src.slice(modStart + i);

  // Re-locate module after edit
  const ms2 = src.indexOf(`"id": "${moduleId}"`);
  const nm2 = src.indexOf(`"id": "`, ms2 + moduleId.length + 10);
  const me2 = nm2 === -1 ? src.length : nm2;
  const chunk2 = src.slice(ms2, me2);

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
  } else {
    // Insert quizEs after contentEs closing brace
    const ms3 = src.indexOf(`"id": "${moduleId}"`);
    const nm3 = src.indexOf(`"id": "`, ms3 + moduleId.length + 10);
    const me3 = nm3 === -1 ? src.length : nm3;
    const chunk3 = src.slice(ms3, me3);
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
  }

  console.log(`✅ Patched ${moduleId}`);
  return src;
}

const DATA = {
  apollo11_m1: {
    extra: [
      "Los ingenieros del Saturn V tuvieron que resolver un problema enorme: cómo enfriar los motores sin que se derritieran. La solución fue hacer circular el combustible líquido a través de tubos en las paredes de los motores antes de quemarlo. Así, el combustible servía como refrigerante antes de convertirse en propulsor.",
      "El ruido del despegue del Saturn V era tan ensordecedor que podía dañar los oídos a kilómetros de distancia. Para absorber el sonido, la plataforma de lanzamiento tenía un sistema que descargaba 1.1 millones de litros de agua en apenas 30 segundos. El vapor y el agua amortiguaban las ondas de sonido.",
      "Una vez en el espacio, los astronautas pasaron por la llamada 'inserción trans-lunar' (TLI). El motor de la tercera etapa se encendió por segunda vez durante unos 6 minutos para acelerar la nave a 40,000 km/h y escapar de la órbita terrestre rumbo a la Luna.",
      "Después de la TLI, los astronautas realizaron una maniobra llamada 'transposición y acoplamiento'. El Módulo de Mando giraba sobre sí mismo, se acoplaba a la parte superior del Módulo Lunar que viajaba dentro de la tercera etapa, y lo extraía para el viaje conjunto hacia la Luna.",
      "La trayectoria hacia la Luna no era una línea recta. Los ingenieros calcularon una ruta curva llamada 'órbita de transferencia libre'. Si todos los motores fallaban, la nave simplemente rodearía la Luna y regresaría a la Tierra por la gravedad. Eso fue exactamente lo que salvó a la Apollo 13."
    ],
    quiz: [
      { q: "¿Cuánto tiempo duró la primera etapa del Saturn V?", options: ["30 segundos","2.5 minutos","6 minutos","10 minutos"], a: 1 },
      { q: "¿Qué sistema absorbía el ruido en la plataforma de lanzamiento del Saturn V?", options: ["Muros de hormigón","1.1 millones de litros de agua","Espuma acústica","Grandes ventiladores"], a: 1 },
      { q: "¿Cómo se llamaba la maniobra de encender el motor para salir de la órbita terrestre?", options: ["Inserción trans-lunar (TLI)","Transposición y acoplamiento","Inserción en órbita lunar","Rendezvous orbital"], a: 0 },
      { q: "¿A qué velocidad viajó la Apollo 11 después del segundo encendido del Saturn V?", options: ["10,000 km/h","20,000 km/h","40,000 km/h","100,000 km/h"], a: 2 },
      { q: "¿Qué ventaja tenía la 'órbita de transferencia libre' de la Apollo?", options: ["Era más rápida","Si los motores fallaban, la nave regresaba sola a la Tierra","Usaba menos combustible","Permitía volar más cerca de la Luna"], a: 1 }
    ]
  },
  apollo11_m2: {
    extra: [
      "El Centro Espacial Kennedy en Florida fue construido específicamente para las misiones Apollo en la isla Merritt, entre el océano Atlántico y el río Banana. Se eligió Florida porque lanzar cohetes hacia el este sobre el océano era más seguro (si algo fallaba, caía al mar) y porque la rotación de la Tierra añadía velocidad extra al cohete.",
      "El VAB (Vehicle Assembly Building o Edificio de Ensamblaje de Vehículos) donde se construía el Saturn V es uno de los edificios más grandes del mundo por volumen. Es tan grande que tiene su propio clima interno: las nubes se forman dentro cuando hay humedad. Ahí se siguen ensamblando cohetes hoy.",
      "La rampa de lanzamiento y el cohete viajaban juntos desde el VAB hasta la plataforma 39A sobre una gigantesca plataforma autopropulsada llamada Crawler Transporter. Esta máquina pesa 2,700 toneladas y se mueve a apenas 1.6 km/h, pero puede transportar el cohete más poderoso del mundo con una precisión de milímetros.",
      "El control de misión en Houston se llamaba MOCR (Mission Operations Control Room). En él, los controladores de vuelo se sentaban en filas de consolas mirando pantallas llenas de datos. Cada persona tenía un apodo técnico: FIDO (Flight Dynamics Officer), GUIDO (Guidance Officer), SURGEON (Flight Surgeon médico), y muchos más.",
      "La misión Apollo 11 fue documentada por fotógrafos y periodistas de todo el mundo. Los astronautas llevaron cámaras especiales Hasselblad de formato medio. Las fotos que tomaron en la Luna son tan nítidas y bien compuestas que aún hoy se usan como referencia artística en fotografía."
    ],
    quiz: [
      { q: "¿Por qué se eligió Florida para lanzar los cohetes Apollo?", options: ["Por el buen clima","Por seguridad y la velocidad extra de la rotación terrestre","Por cercanía con Houston","Por sus grandes playas"], a: 1 },
      { q: "¿Cómo se llama el edificio donde se ensamblaba el Saturn V?", options: ["VAB (Vehicle Assembly Building)","NASA Launch Center","Apollo Assembly Hall","Saturn Assembly Plant"], a: 0 },
      { q: "¿Cómo viajaba el Saturn V desde el edificio hasta la plataforma de lanzamiento?", options: ["En un camión especial","En un tren","En el Crawler Transporter","Lo llevaban en piezas"], a: 2 },
      { q: "¿Qué marca de cámaras usaron los astronautas para fotografiar la Luna?", options: ["Nikon","Canon","Kodak","Hasselblad"], a: 3 },
      { q: "¿Qué es el FIDO en el control de misión?", options: ["Un perro mascota de la NASA","El Flight Dynamics Officer (oficial de dinámica de vuelo)","El director de misión","El médico de a bordo"], a: 1 }
    ]
  },
  apollo11_m3: {
    extra: [
      "La superficie lunar también guarda secretos sobre los primeros tiempos del sistema solar. Las rocas más antiguas de la Tierra han sido recicladas por la tectónica de placas, pero la Luna no tiene placas. Sus rocas son como una cápsula del tiempo que nos muestra cómo era el sistema solar hace 4,500 millones de años.",
      "Los cráteres de la Luna tienen diferentes edades. Los más grandes y erosionados son los más viejos. Los más pequeños y con bordes afilados son los más recientes. Los científicos usan la densidad de cráteres para calcular la edad de una región lunar, una técnica llamada 'cronología de impactos'.",
      "El polo sur de la Luna tiene cráters que nunca reciben luz solar. Sus fondos están permanentemente a -250°C. En esas temperaturas extremas, el hielo que llegó con cometas hace millones de años se ha conservado. Este hielo es el recurso más valioso para las futuras misiones humanas.",
      "La Luna también tiene lava tubes: túneles subterráneos creados cuando la lava volcánica fluyó hacia el interior de la Luna hace miles de millones de años. Estos túneles pueden tener kilómetros de longitud y decenas de metros de diámetro. Son lugares ideales para establecer bases lunares, protegidas de la radiación y los impactos.",
      "Los astronautas notaron que el polvo lunar tenía un olor peculiar cuando se retiraban los trajes dentro del módulo. Armstrong lo describió como 'pólvora mojada' y Aldrin como 'cenizas de chimenea'. Nadie había olido regolito lunar antes. Hoy sabemos que ese olor probablemente viene de reacciones químicas cuando las partículas de polvo cargadas electrónicamente contactan con el oxígeno del aire del módulo."
    ],
    quiz: [
      { q: "¿Por qué las rocas lunares son tan valiosas científicamente?", options: ["Son de oro puro","Conservan la historia del sistema solar de hace 4,500 millones de años","Tienen propiedades medicinales únicas","Son más duras que el diamante"], a: 1 },
      { q: "¿Cómo se llama la técnica de calcular la edad de una región lunar por sus cráteres?", options: ["Datación radiactiva lunar","Geología de impactos","Cronología de impactos","Cartografía selenográfica"], a: 2 },
      { q: "¿Qué son los 'lava tubes' de la Luna?", options: ["Volcanes activos","Túneles subterráneos creados por flujos de lava antigua","Grietas en la corteza lunar","Ríos de magma activos"], a: 1 },
      { q: "¿A qué temperatura están los fondos de los cráteres del polo sur lunar?", options: ["-50°C","-100°C","-173°C","-250°C"], a: 3 },
      { q: "¿A qué describieron los astronautas el olor del polvo lunar dentro del módulo?", options: ["Flores frescas","Pólvora mojada","Plástico quemado","Sin olor alguno"], a: 1 }
    ]
  },
  apollo11_m4: {
    extra: [
      "Durante el vuelo de regreso, los astronautas también realizaron actividades científicas. Midieron la radiación en el espacio, tomaron fotografías de la Tierra y la Luna desde diferentes ángulos, y registraron sus observaciones en diarios de a bordo que se convirtieron en valiosos documentos históricos.",
      "El módulo de mando Columbia era muy pequeño para tres personas: tenía apenas 3.9 metros de diámetro interior y el espacio habitable era menos que el interior de un automóvil compacto moderno. Los astronautas dormían, comían y trabajaban en ese espacio diminuto durante ocho días.",
      "Las comunicaciones en tiempo real durante el regreso permitieron que los astronautas describieran lo que habían vivido. Neil Armstrong habló sobre la soledad del espacio entre la Luna y la Tierra. Collins dijo que ver la Tierra desde lejos le hizo sentir profundamente la unidad del planeta.",
      "El escudo térmico de la cápsula Columbia estaba hecho de un material especial llamado AVCOAT, una resina epoxi que se ablaba (se quema y evapora) al entrar en contacto con la atmósfera caliente. Al evaporarse, lleva el calor consigo en lugar de transmitirlo a la cápsula y a los astronautas.",
      "Cuando la cápsula amerizó, los astronautas experimentaron fuerzas G muy altas durante la entrada a la atmósfera: hasta 6.5G, lo que significa que sentían su propio peso multiplicado por 6.5. Es como si cada kilogramo de tu cuerpo pesara 6.5 veces más. Es una experiencia muy intensa para cuerpos que habían vivido en gravedad cero."
    ],
    quiz: [
      { q: "¿Cuánto medía el diámetro interior del Módulo de Mando Columbia?", options: ["1.5 metros","3.9 metros","6.5 metros","10 metros"], a: 1 },
      { q: "¿Qué material especial tenía el escudo térmico de la cápsula?", options: ["Titanio reforzado","AVCOAT (resina epoxi que se ablada)","Aluminio recubierto de cerámica","Fibra de carbono"], a: 1 },
      { q: "¿Cuántos G experimentaron los astronautas durante la reentrada?", options: ["1G","3G","6.5G","10G"], a: 2 },
      { q: "¿Durante cuántos días totales duró la misión Apollo 11?", options: ["5 días","8 días","12 días","21 días"], a: 1 },
      { q: "¿Qué describió Michael Collins al ver la Tierra desde lejos en el regreso?", options: ["Vio extraterrestres","Sintió profundamente la unidad del planeta","Quiso volver inmediatamente","Tuvo miedo de regresar"], a: 1 }
    ]
  },
  apollo11_m5: {
    extra: [
      "El trabajo de las mujeres en la NASA fue fundamental pero durante mucho tiempo poco reconocido. Las 'computadoras humanas' del Centro Langley, muchas de ellas afroamericanas como Katherine Johnson, Dorothy Vaughan y Mary Jackson, calcularon manualmente las trayectorias orbitales. Katherine Johnson calculó las trayectorias de las primeras misiones espaciales americanas y las revisiones de la Apollo 11.",
      "El traje espacial fue diseñado en parte por la empresa ILC Dover, que anteriormente fabricaba sujetadores. Esto no fue coincidencia: la experiencia en costuras flexibles pero resistentes era perfectamente aplicable a los trajes que debían ser herméticos, flexibles y duraderos a la vez.",
      "El Apollo Guidance Computer (AGC) usaba circuitos integrados, que en 1969 eran tecnología muy nueva y cara. La NASA compró tal cantidad de estos chips que prácticamente fundó la industria de los semiconductores de silicio. Sin el Apollo, el desarrollo de los chips de computadora podría haber tardado años más.",
      "El programa Apollo también aceleró el desarrollo de la telemetría médica. Los trajes de los astronautas llevaban sensores que transmitían en tiempo real su ritmo cardíaco, temperatura corporal y presión sanguínea a la Tierra. Esa tecnología evolucionó en los monitores cardíacos que hoy salvan millones de vidas en hospitales.",
      "La misión Apollo 11 generó toneladas de documentación técnica. Los manuales de vuelo, los diagramas de sistemas, los registros de telemetría y los transcriptos de comunicaciones son hoy documentos históricos de enorme valor. Mucha de esa información está digitalizada y disponible públicamente en los archivos de la NASA."
    ],
    quiz: [
      { q: "¿Quién calculó las trayectorias de las primeras misiones espaciales de la NASA?", options: ["Wernher von Braun","Gene Kranz","Katherine Johnson","Margaret Hamilton"], a: 2 },
      { q: "¿Qué empresa fabricó los trajes espaciales del Apollo, usando experiencia en confección?", options: ["Boeing","Lockheed Martin","ILC Dover","Grumman"], a: 2 },
      { q: "¿Qué impacto tuvo el Apollo en la industria de los chips de computadora?", options: ["Ninguno, usaban válvulas de vacío","La NASA compró tantos chips que prácticamente fundó la industria","Retrasó el desarrollo de los chips","Solo usaron chips soviéticos"], a: 1 },
      { q: "¿Qué tecnología médica actual se desarrolló a partir de los sensores de los trajes Apollo?", options: ["Las vacunas","Los monitores cardíacos hospitalarios","Los rayos X digitales","Los escáneres de resonancia magnética"], a: 1 },
      { q: "¿Dónde están hoy los documentos técnicos de la misión Apollo 11?", options: ["Destruidos por seguridad","En un museo en la Luna","En archivos secretos","Digitalizados y disponibles públicamente en la NASA"], a: 3 }
    ]
  },
  apollo11_m6: {
    extra: [
      "El programa Artemis no solo busca volver a la Luna, sino establecer una presencia permanente. El Gateway es una pequeña estación espacial que orbitará la Luna y servirá como base para las misiones lunares y como trampolín hacia Marte. Varios países, incluidos los de la Agencia Espacial Europea, Japón y Canadá, colaboran en este proyecto.",
      "SpaceX, la empresa fundada por Elon Musk, está construyendo el cohete Starship que será el más poderoso de la historia, aún más que el Saturn V. Se planea usar una versión del Starship como vehículo lunar para el programa Artemis, aterrizando en la Luna con una eficiencia mucho mayor que el antiguo Módulo Lunar.",
      "La exploración lunar también tiene un aspecto económico importante. La Luna contiene recursos valiosos: helio-3 (que podría usarse en futura energía de fusión nuclear), metales de tierras raras, y agua helada para combustible. Varias empresas privadas planean establecer operaciones mineras en la Luna en las próximas décadas.",
      "Las misiones robóticas siguen preparando el camino para los humanos. El rover Perseverance en Marte, el telescopio James Webb en el espacio, y la sonda Voyager 1 (que ya salió del sistema solar) son ejemplos de cómo la exploración espacial continúa expandiendo el conocimiento humano cada día.",
      "Tú, que estudias hoy, podrías ser parte de la generación que llegue a Marte. Los ingenieros, científicos, médicos y exploradores que harán posible ese viaje aún están en la escuela. La historia del Apollo 11 no es solo pasado: es la inspiración para el futuro que tú puedes construir."
    ],
    quiz: [
      { q: "¿Qué es el Gateway en el programa Artemis?", options: ["Un cohete nuevo","Una estación espacial que orbitará la Luna","El nombre del Módulo Lunar","Una base en la superficie lunar"], a: 1 },
      { q: "¿Qué empresa está construyendo el cohete Starship?", options: ["NASA","Blue Origin","SpaceX","Boeing"], a: 2 },
      { q: "¿Qué recurso valioso de la Luna podría usarse para futura energía de fusión nuclear?", options: ["Hierro lunar","Helio-3","Agua helada","Regolito"], a: 1 },
      { q: "¿Qué hito especial logró la sonda Voyager 1?", options: ["Llegó a Marte","Fotografió agujeros negros","Salió del sistema solar","Aterrizó en Europa (luna de Júpiter)"], a: 2 },
      { q: "¿Cuál es el siguiente gran destino humano en el espacio después de la Luna?", options: ["Venus","Marte","Los asteroides","Europa"], a: 1 }
    ]
  }
};

for (const [moduleId, data] of Object.entries(DATA)) {
  src = appendTextAndFixQuiz(src, moduleId, data.extra, data.quiz);
}

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ Apollo 11 all 6 modules patched!');
