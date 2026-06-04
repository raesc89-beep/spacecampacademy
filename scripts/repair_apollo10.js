/**
 * repair_apollo10_m1.js
 * Completely replaces the broken apollo10_m1 module
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
  console.log(`✅ Repaired ${moduleId} (chars ${openBrace} to ${closeBrace})`);
  return src;
}

const APOLLO10_M1 = `{
    "id": "apollo10_m1",
    "order": 201,
    "titleEn": "The Dress Rehearsal",
    "titleEs": "El Ensayo General",
    "badge": "Snoopy Pilot",
    "badgeEs": "Piloto Snoopy",
    "badgeIcon": "/assets/badges/snoopy_badge.png",
    "color": "#32CD32",
    "icon": "/assets/badges/snoopy_badge.png",
    "contentEs": {
      "sections": [
        {
          "id": "apollo10_m1_s1",
          "title": "El Ensayo General de la Luna",
          "text": [
            "En mayo de 1969, dos meses antes del primer alunizaje, la NASA realizó el ensayo general definitivo: la misión Apollo 10. Era todo excepto el aterrizaje. Los astronautas volarían hasta la Luna, descenderían a solo 15 kilómetros de la superficie, y luego regresarían sin tocar el suelo.",
            "La tripulación del Apollo 10 estaba formada por Thomas Stafford (comandante), John Young (piloto del módulo de mando) y Eugene Cernan (piloto del módulo lunar). Los tres eran astronautas experimentados con vuelos anteriores en el programa Gemini.",
            "El módulo lunar del Apollo 10 fue bautizado 'Snoopy', el famoso perro de la tira cómica Peanuts, en honor a la conciencia vigilante de la seguridad en la NASA. El módulo de mando se llamó 'Charlie Brown'. Estos nombres reflejaban el carácter más relajado de una misión de prueba.",
            "La misión despegó el 18 de mayo de 1969 desde el Centro Kennedy. El viaje hasta la Luna duró tres días. El Apollo 10 completó 31 órbitas lunares completas, fotografiando meticulosamente el sitio de aterrizaje propuesto para el Apollo 11 en el Mar de la Tranquilidad.",
            "El 22 de mayo, Stafford y Cernan se trasladaron al Snoopy y comenzaron el descenso hacia la Luna. La nave descendió hasta 15.6 kilómetros de la superficie, la distancia más cercana que seres humanos habían estado de la superficie lunar sin aterrizar. Desde esa distancia podían ver claramente los cráteres y las rocas.",
            "Entonces ocurrió el incidente más dramático de la misión. Cuando Stafford y Cernan intentaron separar el módulo de ascenso del módulo de descenso, el módulo lunar comenzó a girar descontroladamente. Cernan exclamó una palabrota que quedó grabada en las comunicaciones históricas de la NASA.",
            "El problema fue causado por un interruptor colocado en la posición incorrecta. En apenas 8 segundos de rotación caótica, Stafford recuperó el control manual y estabilizó el módulo. Si no hubiera reaccionado a tiempo, el módulo podría haber chocado contra la superficie lunar.",
            "A pesar del susto, Stafford y Cernan completaron la misión del módulo de ascenso exitosamente y se reunieron con John Young en el Charlie Brown. La reunión en órbita lunar fue perfecta: una demostración de que el sistema funcionaba sin errores mayores.",
            "La misión Apollo 10 estableció un récord de velocidad que sigue vigente hoy: fue la nave más rápida en la que viajaron seres humanos. En la reentrada, la cápsula alcanzó 39,897 km/h. Este récord, establecido en 1969, no ha sido superado por ninguna nave tripulada.",
            "¿Por qué la NASA no dejó que el Apollo 10 aterrizara? La razón principal era técnica: el módulo lunar del Apollo 10 fue construido con más peso del que tendría el del Apollo 11. Tenía demasiado peso para despegar de la superficie con seguridad. Además, muchos procedimientos no estaban completamente finalizados.",
            "La misión también capturó miles de fotografías de alta resolución de la superficie lunar. Estas imágenes fueron analizadas meticulosamente por los cartógrafos lunares para identificar el mejor sitio específico de aterrizaje para el Apollo 11. Sin ellas, el Apollo 11 podría haber aterrizado en una zona peligrosa.",
            "Desde la órbita lunar, los astronautas del Apollo 10 describieron lo que veían con gran detalle. Stafford comentó que la Luna parecía 'un desierto enorme e iluminado', con cráteres tan nítidos que se podían ver desde la órbita. Cernan dijo que era difícil creer que pronto alguien iba a caminar allá abajo.",
            "John Young, que orbitó solo en el Charlie Brown mientras sus compañeros bajaban con el Snoopy, tuvo momentos de soledad detrás de la Luna sin comunicación con nadie. Sin embargo, estaba ocupado con cientos de verificaciones del sistema y fotografías de la superficie. No tuvo tiempo de sentirse solo.",
            "El Apollo 10 también probó los sistemas de navegación en el entorno gravitacional de la Luna. La Luna tiene mascons (concentraciones de masa) que alteran ligeramente la gravedad y pueden desviar las órbitas. Los datos del Apollo 10 ayudaron a calcular correcciones precisas para el Apollo 11.",
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

src = replaceFullModule(src, 'apollo10_m1', APOLLO10_M1);
fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ apollo10_m1 repaired!');
