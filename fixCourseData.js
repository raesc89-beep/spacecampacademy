const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');

const startIndex = content.indexOf('[');
const jsonString = content.substring(startIndex).replace(/;$/, '');

let jsData;
try {
  jsData = eval(jsonString);
} catch(e) {
  console.log('Eval error', e);
  process.exit(1);
}

jsData = jsData.filter(m => m.id !== 'mamiferos-espacio');

const animalesModule = jsData.find(m => m.id === 'animales');
if (animalesModule) {
  animalesModule.contentEs.sections = [
    {
      "id": "animales_1",
      "title": "Los Primeros Exploradores (Albert y las Moscas)",
      "text": "Antes de que los humanos viajaran al espacio, los científicos necesitaban saber si un ser vivo podía sobrevivir fuera de la Tierra. ¡Y los primeros en volar no fueron monos ni perros, sino moscas de la fruta en 1947! Poco después, en 1949, el valiente mono rhesus llamado Albert II se convirtió en el primer mamífero en alcanzar el espacio a bordo de un cohete V2. ¡Estos pequeños pioneros abrieron el camino hacia las estrellas!",
      "video": "/assets/animales/Animales en el espacio.mp4",
      "image": "",
      "imgCaption": ""
    },
    {
      "id": "animales_2",
      "title": "Laika: La Perra Cosmonauta",
      "text": "En 1957, la historia espacial cambió para siempre gracias a una valiente perrita callejera de Moscú llamada Laika. A bordo de la cápsula soviética Sputnik 2, Laika se convirtió en el primer ser vivo en orbitar la Tierra. Aunque su nave no estaba diseñada para regresar, su histórico vuelo demostró que los organismos biológicos podían soportar la gravedad cero y las duras condiciones del espacio exterior.",
      "video": "/assets/animales/Laika Vid.mp4",
      "image": "",
      "imgCaption": ""
    },
    {
      "id": "animales_3",
      "title": "Ham: El Primer Chimpancé Astronauta",
      "text": "Mientras los soviéticos enviaban perros, la NASA preparaba a los chimpancés. En 1961, un inteligente chimpancé llamado Ham realizó un vuelo suborbital a bordo de una cápsula Mercury-Redstone. Ham no solo fue pasajero, ¡fue entrenado para tirar de palancas y pilotar durante su vuelo! Su exitoso regreso y su sonrisa tras el amerizaje demostraron que los humanos también podían realizar tareas en el espacio.",
      "video": "/assets/animales/Ham.mp4",
      "image": "",
      "imgCaption": ""
    },
    {
      "id": "animales_4",
      "title": "Félicette: La Primera Gata en el Espacio",
      "text": "Los franceses decidieron unirse a la carrera espacial en 1963 y eligieron como candidata a Félicette, una gatita blanca y negra muy especial. Lanzada a bordo de un cohete Véronique, Félicette experimentó 5 minutos de ingravidez antes de regresar a la Tierra en paracaídas de forma totalmente segura. Hasta el día de hoy, ella sigue siendo el único felino que ha viajado al espacio exterior.",
      "video": "/assets/animales/Gatos.mp4",
      "image": "",
      "imgCaption": ""
    }
  ];
}

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log('Done');
