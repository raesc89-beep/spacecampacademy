/**
 * repair_apollo8_m2_and_apollo10.js
 * Fixes the broken structure of apollo8_m2 and apollo10_m1
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

function replaceFullModule(src, moduleId, correctContent) {
  const modStart = src.indexOf(`"id": "${moduleId}"`);
  if (modStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }
  const openBrace = src.lastIndexOf('{', modStart);
  const orderIdx = src.indexOf('"order":', modStart);
  const nextOrderIdx = src.indexOf('"order":', orderIdx + 10);
  const nextOpenBrace = src.lastIndexOf('{', nextOrderIdx - 1);
  const closeBrace = src.lastIndexOf('}', nextOpenBrace - 1);
  src = src.slice(0, openBrace) + correctContent + src.slice(closeBrace + 1);
  console.log(`✅ Repaired ${moduleId}`);
  return src;
}

const APOLLO8_M2 = `{
    "id": "apollo8_m2",
    "order": 102,
    "titleEn": "Earthrise",
    "titleEs": "El Amanecer Terrestre",
    "badge": "Earth Observer",
    "badgeEs": "Observador Terrestre",
    "badgeIcon": "/assets/badges/earth_badge.png",
    "color": "#4169E1",
    "icon": "/assets/badges/earth_badge.png",
    "contentEs": {
      "sections": [
        {
          "id": "apollo8_m2_s1",
          "title": "La Tecnología que Llevó al Apollo 8 a la Luna",
          "text": [
            "El cohete Saturn V que lanzó el Apollo 8 fue diseñado por Wernher von Braun y un equipo de más de 400,000 ingenieros y técnicos. Era el cohete más poderoso jamás construido: medía 111 metros de altura y generaba 34 millones de Newtons de empuje, equivalente a 160 millones de caballos de vapor.",
            "El traje espacial de los astronautas del Apollo 8 era una obra maestra de la ingeniería. Tenía 21 capas de diferentes materiales, cada una con una función específica: proteger de la radiación, mantener la presión interna, regular la temperatura (que en el exterior variaba entre -120°C y +120°C), y suministrar oxígeno.",
            "Las comunicaciones entre la nave y la Tierra eran enviadas a través de la Red de Espacio Profundo (DSN), un sistema de tres enormes antenas distribuidas por el mundo (California, España y Australia) para garantizar cobertura continua. La voz viajaba 384,000 km con un retraso de 1.3 segundos.",
            "La computadora de guía del Apollo (AGC) era revolucionaria para su época. Tenía 4,096 palabras de memoria de solo lectura (ROM) y usaba la primera aplicación de circuitos integrados de silicio en la historia de la aviación espacial. Esta computadora guió la nave con precisión milimétrica a través del espacio.",
            "El módulo de mando tenía sistemas de soporte vital que reciclaban el aire dentro de la nave, eliminando el dióxido de carbono y los olores. Los astronautas disponían de oxígeno puro a una presión de 5 psi (un tercio de la presión atmosférica terrestre), suficiente para respirar cómodamente en el espacio.",
            "La comida del Apollo 8 era liofilizada o en tubos. Para la Nochebuena de 1968, los ingenieros de la NASA incluireron una sorpresa: pavo real y relleno de arándanos enlatado, una pequeña celebración navideña a 384,000 kilómetros de la Tierra.",
            "El reingreso a la atmósfera terrestre fue uno de los momentos más peligrosos de la misión. La cápsula debía entrar en la atmósfera en un ángulo muy preciso (entre 5.5° y 7.5°): demasiado empinado y se destruiría por el calor, demasiado superficial y rebotraría hacia el espacio sin posibilidad de regreso.",
            "El escudo térmico de la cápsula se fabricó de un material ablativo que se quema y evapora al entrar en contacto con la atmósfera caliente, llevando el calor consigo. La temperatura exterior llegó a 2,800°C durante el reingreso, mientras que el interior permanecía a temperatura habitable.",
            "La cápsula regresó a la Tierra a unos 40,000 km/h. Para desacelerarla, se desplegaron primero dos pequeños paracaídas de freno y luego tres enormes paracaídas principales de 25 metros de diámetro cada uno. La cápsula amerizó en el Océano Pacífico el 27 de diciembre de 1968.",
            "El portaaviones USS Yorktown estaba esperando a solo pocos kilómetros del punto de amerizaje. Los astronautas fueron rescatados por helicópteros y llevados al portaaviones donde el mundo entero los estaba esperando. Habían completado el primer viaje humano en torno a la Luna.",
            "Las 400,000 personas que trabajaron en el programa Apollo representaban el mayor esfuerzo de ingeniería colaborativa de la historia. Desde diseñadores de circuitos en Silicon Valley hasta costureras que hacían los trajes en Delaware, todos contribuyeron con su expertise específico al logro colectivo.",
            "La misión Apollo 8 también probó las comunicaciones de datos en tiempo real entre la nave y la Tierra. Los ingenieros en Houston podían ver los datos de todos los sistemas de la nave en pantallas en tiempo real: temperatura de los motores, presión de los sistemas, nivel de combustible. Era la primera 'sala de control de misión' en pleno funcionamiento.",
            "La fotografía 'Earthrise' fue tomada con una cámara Hasselblad de formato medio usando película de 70 mm. La cámara fue diseñada para funcionar en el vacío del espacio a temperaturas extremas. Cuando la bobina se reveló en la Tierra, la imagen que emergió cambió para siempre la manera en que la humanidad se concibe a sí misma.",
            "El legado tecnológico del Apollo 8 incluye avances en materiales, computación, sistemas de comunicación y soporte vital que eventualmente se trasladaron a tecnologías civiles. Los sistemas de purificación de agua, los trajes de protección para bomberos, los termómetros de infrarrojos y muchos otros productos de uso cotidiano tienen sus raíces en el programa Apollo.",
            "La misión Apollo 8 demostró que la humanidad era capaz de abandonar la Tierra y volver. No como una hazaña aislada sino como el resultado de años de planificación sistemática, ingeniería rigurosa y trabajo en equipo a una escala sin precedentes. Fue el ensayo general para la mayor aventura de la historia."
          ]
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Quién diseñó el cohete Saturn V?",
        "options": ["Neil Armstrong","Wernher von Braun","John Glenn","Alan Shepard"],
        "a": 1
      },
      {
        "q": "¿Cuántas capas tenía el traje espacial de la Apollo 8?",
        "options": ["5 capas","10 capas","21 capas","35 capas"],
        "a": 2
      },
      {
        "q": "¿Cuál era el retraso en las comunicaciones con la Tierra?",
        "options": ["0.5 segundos","1.3 segundos","5 segundos","10 segundos"],
        "a": 1
      },
      {
        "q": "¿A qué velocidad regresó la Apollo 8 a la atmósfera terrestre?",
        "options": ["5,000 km/h","15,000 km/h","25,000 km/h","40,000 km/h"],
        "a": 3
      },
      {
        "q": "¿Cuántas personas contribuyeron al programa Apollo?",
        "options": ["10,000","50,000","200,000","400,000"],
        "a": 3
      }
    ]
  }`;

const APOLLO10_M1 = `{
    "id": "apollo10_m1",
    "order": 201,
    "titleEn": "The Dress Rehearsal",
    "titleEs": "El Ensayo General",
    "badge": "Test Pilot",
    "badgeEs": "Piloto de Pruebas",
    "badgeIcon": "/assets/badges/test_badge.png",
    "color": "#FF8C00",
    "icon": "/assets/badges/test_badge.png",
    "contentEs": {
      "sections": [
        {
          "id": "apollo10_m1_s1",
          "title": "El Ensayo General de la Luna",
          "text": [
            "En mayo de 1969, dos meses antes del primer alunizaje, la NASA realizó el ensayo general definitivo: la misión Apollo 10. Era todo excepto el aterrizaje. Los astronautas volarían hasta la Luna, descenderían a solo 15 kilómetros de la superficie, y luego regresarían sin tocar el suelo.",
            "La tripulación del Apollo 10 estaba formada por Thomas Stafford (comandante), John Young (piloto del módulo de mando) y Eugene Cernan (piloto del módulo lunar). Los tres eran astronautas experimentados con vuelos anteriores en el programa Gemini.",
            "El módulo lunar del Apollo 10 fue bautizado 'Snoopy', el famoso perro de la tira cómica Peanuts, en honor a la conciencia vigilante de la seguridad en la NASA (Snoopy era la mascota del programa de seguridad de la NASA). El módulo de mando se llamó 'Charlie Brown'.",
            "La misión despegó el 18 de mayo de 1969 desde el Centro Kennedy. El viaje hasta la Luna duró tres días. El Apollo 10 completó 31 órbitas lunares completas, fotografiando meticulosamente el sitio de aterrizaje propuesto para el Apollo 11 en el Mar de la Tranquilidad.",
            "El 22 de mayo, Stafford y Cernan se trasladaron al Snoopy y comenzaron el descenso hacia la Luna. La nave descendió hasta 15.6 kilómetros de la superficie, la distancia más cercana que seres humanos habían estado de la superficie lunar sin aterrizar. Desde esa distancia podían ver claramente los cráteres y las rocas.",
            "Entonces ocurrió el incidente más dramático de la misión. Cuando Stafford y Cernan intentaron separar el módulo de ascenso del módulo de descenso, el módulo lunar comenzó a girar descontroladamente. Cernan exclamó una palabrota que quedó grabada en las comunicaciones históricas de la NASA.",
            "El problema fue causado por un interruptor colocado en la posición incorrecta. En apenas 8 segundos de rotación caótica, Stafford recuperó el control manual y estabilizó el módulo. Si no hubiera reaccionado a tiempo, el módulo podría haber chocado contra la superficie lunar.",
            "A pesar del susto, Stafford y Cernan completaron el módulo de ascenso exitosamente y se reunieron con John Young en el Charlie Brown. La reunión (rendezvous) en órbita lunar fue perfecta: una demostración de que el sistema funcionaba sin errores.",
            "La misión Apollo 10 estableció un récord de velocidad que sigue vigente hoy: fue la nave más rápida en la que viajaron seres humanos. En la reentrada, la cápsula alcanzó 39,897 km/h. Este récord, establecido en 1969, no ha sido superado por ninguna nave tripulada.",
            "Una pregunta interesante que se hizo mucha gente: ¿por qué la NASA no dejó que el Apollo 10 aterrizara, ya que estaban tan cerca? La razón principal era técnica: el módulo lunar del Apollo 10 fue construido con más peso del que tendría el del Apollo 11. Tenía demasiado peso para despegar de la superficie con seguridad.",
            "Otra razón era procedimental: muchos procedimientos de aterrizaje y despegue aún no estaban completamente verificados y finalizados. La NASA no quería arriesgar una vida humana en una misión que aún necesitaba refinamiento. Era más valioso probar el sistema y aprender que arriesgarse por el prestigio del primer aterrizaje.",
            "La misión también capturó miles de fotografías de alta resolución de la superficie lunar. Estas imágenes fueron analizadas meticulosamente por los cartógrafos lunares para identificar el mejor sitio específico de aterrizaje para el Apollo 11. Sin ellas, el Apollo 11 podría haber aterrizado en una zona peligrosa.",
            "Desde la órbita lunar, los astronautas del Apollo 10 describieron lo que veían con gran detalle. Stafford comentó que la Luna parecía 'un desierto enorme e iluminado', con cráteres tan nítidos que se podían ver desde la órbita. Cernan dijo que era difícil creer que pronto alguien iba a caminar allá abajo.",
            "John Young, que orbitó solo en el Charlie Brown mientras sus compañeros bajaban con el Snoopy, tuvo momentos de soledad detrás de la Luna sin comunicación con nadie. Sin embargo, estaba ocupado con cientos de verificaciones del sistema y fotografías de la superficie. No tuvo tiempo de sentirse solo.",
            "El Apollo 10 regresó a la Tierra el 26 de mayo de 1969, amerizando en el Pacífico y siendo recuperado por el USS Princeton. La misión fue un éxito absoluto. La NASA tenía toda la confianza para proceder con el Apollo 11. Solo faltaban dos meses para que la humanidad pusiera pie en la Luna."
          ]
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿Cómo se llamaba el módulo lunar de la Apollo 10?",
        "options": ["Eagle","Charlie Brown","Snoopy","Columbia"],
        "a": 2
      },
      {
        "q": "¿A qué distancia mínima de la superficie lunar llegó la Apollo 10?",
        "options": ["5 km","15 km","50 km","100 km"],
        "a": 1
      },
      {
        "q": "¿Qué récord estableció la Apollo 10 que sigue vigente?",
        "options": ["El cohete más poderoso","La mayor velocidad de seres humanos","El vuelo más largo en la Luna","El mayor número de órbitas lunares"],
        "a": 1
      },
      {
        "q": "¿Qué incidente dramático ocurrió al separar los módulos del Snoopy?",
        "options": ["Se quedaron sin combustible","El módulo comenzó a girar descontroladamente","Se rompió la antena","Perdieron contacto con Houston"],
        "a": 1
      },
      {
        "q": "¿Por qué la NASA no aterrizó durante la Apollo 10?",
        "options": ["Miedo de los astronautas","Sistema de aterrizaje roto","El módulo tenía más peso del necesario y los procedimientos no estaban finalizados","Superficie demasiado rocosa"],
        "a": 2
      }
    ]
  }`;

// Check if apollo10_m1 also has the same issue
const idx10 = src.indexOf('"id": "apollo10_m1"');
if (idx10 !== -1) {
  const orderIdx10 = src.indexOf('"order":', idx10);
  const nextOrder10 = src.indexOf('"order":', orderIdx10 + 10);
  const chunk10 = src.slice(idx10, nextOrder10);
  if (chunk10.includes('"          "')) {
    console.log('apollo10_m1 also broken, repairing...');
    src = replaceFullModule(src, 'apollo10_m1', APOLLO10_M1);
  } else {
    console.log('apollo10_m1 looks OK');
  }
}

src = replaceFullModule(src, 'apollo8_m2', APOLLO8_M2);

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ Repairs complete!');
