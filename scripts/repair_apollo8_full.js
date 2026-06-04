/**
 * repair_apollo8_m1_full.js
 * Completely replaces the broken apollo8_m1 module with correct content.
 */
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

// The correct replacement content for the entire module object
// (everything between the enclosing commas in the COURSE_DATA array)
const CORRECT_M1 = `{
    "id": "apollo8_m1",
    "order": 101,
    "titleEn": "Genesis of the Mission",
    "titleEs": "Génesis de la Misión",
    "badge": "Lunar Pioneer",
    "badgeEs": "Pionero Lunar",
    "badgeIcon": "/assets/badges/moon_badge.png",
    "color": "#4169E1",
    "icon": "/assets/badges/moon_badge.png",
    "contentEs": {
      "sections": [
        {
          "id": "apollo8_m1_s1",
          "title": "Génesis de la Misión Apollo 8",
          "text": [
            "En diciembre de 1968, mientras el mundo vivía uno de sus años más turbulentos, la NASA preparaba una misión que cambiaría para siempre la perspectiva de la humanidad sobre sí misma. La misión Apollo 8 sería el primer viaje de seres humanos alrededor de la Luna.",
            "El año 1968 había sido devastador: el asesinato de Martin Luther King Jr., el asesinato de Robert Kennedy, las protestas en todo el mundo, la guerra de Vietnam en su punto más sangriento. En ese contexto, la NASA decidió acelerar el programa Apollo para superar a los soviéticos.",
            "El equipo original de la misión Apollo 8 había sido entrenado para una misión diferente: probar el Módulo Lunar en órbita terrestre. Pero cuando el Módulo Lunar llegó con meses de retraso, la NASA tomó una decisión audaz: enviar a los astronautas directamente a la Luna sin él.",
            "Los tres astronautas elegidos fueron Frank Borman (comandante), James Lovell (piloto del módulo de mando) y William Anders (piloto del módulo lunar, aunque esta vez no habría módulo lunar). Borman era conocido por su disciplina y Lovell por su experiencia: ya había volado en dos misiones Gemini.",
            "El lanzamiento ocurrió el 21 de diciembre de 1968. El cohete Saturn V rugió bajo los pies de los astronautas con una fuerza equivalente a 160 millones de caballos de vapor. Menos de tres días después, el 24 de diciembre, la nave entró en órbita lunar: era la primera vez que seres humanos veían la cara oculta de la Luna.",
            "La maniobra de inserción en órbita lunar (LOI) fue uno de los momentos más tensos de la misión. El motor principal debía encenderse exactamente 4 minutos detrás de la Luna, sin comunicación con la Tierra. Si fallaba o duraba demasiado, los astronautas quedarían perdidos en el espacio.",
            "En la Nochebuena de 1968, los astronautas transmitieron en vivo desde la órbita lunar. Más de 1,000 millones de personas los escucharon. Los tres astronautas leyeron por turnos los primeros diez versículos del Génesis: 'En el principio creó Dios los cielos y la tierra...' Fue la transmisión de mayor audiencia de la historia hasta ese momento.",
            "William Anders tomó la foto más famosa de la historia: 'Earthrise' (Amanecer de la Tierra). Muestra la Tierra azul y blanca asomándose sobre el horizonte gris y árido de la Luna. Esta imagen cambió la manera en que la humanidad se veía a sí misma: un planeta frágil, bello y único suspendido en el vacío.",
            "La fotografía 'Earthrise' se convirtió en el símbolo del movimiento ecologista que nacía en esa época. Por primera vez, los seres humanos vieron la Tierra completa desde el exterior. La Tierra parecía pequeña, solitaria, preciosa. Gaia, como diría el científico James Lovelock, un organismo vivo que debemos cuidar.",
            "El retorno a la Tierra fue igualmente dramático. El motor del módulo de servicio debía encenderse detrás de la Luna para salir de la órbita y regresar. Si fallaba, no habría rescate posible. Funcionó perfectamente. La cápsula amerizó en el Pacífico el 27 de diciembre, completando el primer viaje humano en torno a otro mundo.",
            "La misión Apollo 8 llegó en el momento justo. Los soviéticos también intentaban rodear la Luna con cosmonautas, pero sus intentos fallaron. Apollo 8 puso a Estados Unidos en una posición de liderazgo indiscutible en la carrera espacial, preparando el terreno para el alunizaje siete meses después.",
            "Técnicamente, Apollo 8 probó por primera vez el sistema completo de navegación transfronteriza: computadoras, comunicaciones a gran distancia, el motor de servicio en el espacio profundo. Cada sistema funcionó. Las lecciones aprendidas fueron cruciales para el Apollo 11.",
            "Los astronautas vivieron la experiencia de ver la Tierra desde 384,000 kilómetros de distancia. Frank Borman describió la Tierra como 'una hermosa bola azul en medio de un terrible vacío negro'. James Lovell dijo que desde allí podía tapar la Tierra completa con el pulgar extendido.",
            "La misión Apollo 8 es, para muchos historiadores, la más valiente y emocionalmente significativa de todo el programa espacial. Los hombres que volaron no tenían el Módulo Lunar de rescate, estaban completamente solos a 384,000 kilómetros de casa, y sin embargo transmitieron serenidad, profesionalismo y un mensaje de esperanza para toda la humanidad.",
            "El año terminó con una imagen: la Tierra, vista desde la Luna. Un planeta pequeño, azul, sin fronteras visibles, suspendido en el negro absoluto del cosmos. Para una especie que acababa de pasar un año de divisiones, guerras y tragedias, era el recordatorio más poderoso posible de que todos compartimos el mismo hogar."
          ]
        }
      ]
    },
    "quizEs": [
      {
        "q": "¿En qué año se realizó la misión Apollo 8?",
        "options": ["1966","1967","1968","1969"],
        "a": 2
      },
      {
        "q": "¿Quién tomó la famosa fotografía 'Earthrise'?",
        "options": ["Frank Borman","James Lovell","William Anders","Neil Armstrong"],
        "a": 2
      },
      {
        "q": "¿Cuánto duró aproximadamente el viaje de la Tierra a la Luna?",
        "options": ["1 día","3 días","1 semana","2 semanas"],
        "a": 1
      },
      {
        "q": "¿Por qué era crítica la maniobra de inserción en órbita lunar?",
        "options": ["Requería mucho combustible","Se realizaba sin comunicación, detrás de la Luna","Los astronautas debían salir al espacio","El cohete podía explotar"],
        "a": 1
      },
      {
        "q": "¿Qué texto leyeron los astronautas en la transmisión de Nochebuena?",
        "options": ["El Corán","El Quijote","Los primeros versículos del Génesis","La Declaración de Independencia"],
        "a": 2
      }
    ]
  }`;

// Find the module's position in the file
const modStart = src.indexOf('"id": "apollo8_m1"');
// Go back to find the opening { of this object in the array
const openBrace = src.lastIndexOf('{', modStart);
// Find the closing } of this object
const orderIdx = src.indexOf('"order":', modStart);
const nextOrderIdx = src.indexOf('"order":', orderIdx + 10);
// Find the } that closes this module object (the one before the next module's {)
const nextOpenBrace = src.lastIndexOf('{', nextOrderIdx - 1);
const closeBrace = src.lastIndexOf('}', nextOpenBrace - 1);

console.log('Module span: chars', openBrace, 'to', closeBrace);
console.log('Content at openBrace-5 to openBrace+30:', JSON.stringify(src.slice(openBrace-5, openBrace+30)));
console.log('Content at closeBrace-30 to closeBrace+30:', JSON.stringify(src.slice(closeBrace-30, closeBrace+30)));

src = src.slice(0, openBrace) + CORRECT_M1 + src.slice(closeBrace + 1);

fs.writeFileSync(FILE, src, 'utf8');
console.log('\n✅ apollo8_m1 fully repaired!');
