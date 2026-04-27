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

// 1. Borrar animales_mamiferos
jsData = jsData.filter(m => m.id !== 'animales_mamiferos');

// 2. Nutrir animales_intro
const intro = jsData.find(m => m.id === 'animales_intro');
if (intro) {
  intro.contentEs.sections = [
    {
      "id": "animales_intro_1",
      "title": "Pioneros Biológicos",
      "text": "Cadete, antes de que los humanos se atrevieran a viajar al espacio, necesitábamos héroes que probaran si la vida podía sobrevivir allá arriba. ¡Nuestros primeros exploradores no fueron personas, sino animales valientes! El viaje comenzó en 1947 cuando enviamos moscas de la fruta para probar la radiación espacial.",
      "image": "/assets/animales/intro_fruitfly.png",
      "imgCaption": "Las moscas de la fruta fueron los primeros seres vivos enviados al espacio en 1947 a bordo de un misil V-2 modificado."
    },
    {
      "id": "animales_intro_2",
      "title": "Los Primeros Mamíferos",
      "text": "Después de las moscas, llegó el turno de los mamíferos. El mono rhesus Albert II alcanzó los 134 km de altura en 1949, demostrando que seres más complejos podían resistir las fuerzas de un lanzamiento. Más adelante, los franceses enviaron a la valiente gatita Félicette, que experimentó la ingravidez y regresó a salvo a la Tierra.",
      "image": "/assets/animales/intro_suborbital.png",
      "imgCaption": "Albert II y Félicette abrieron el camino para entender los efectos de los vuelos suborbitales en cuerpos mamíferos."
    },
    {
      "id": "animales_intro_3",
      "title": "Laika y Ham: Leyendas Espaciales",
      "text": "Dos de los más grandes héroes fueron la perrita Laika y el chimpancé Ham. Laika se convirtió en el primer ser vivo en orbitar la Tierra en 1957. Años después, Ham no solo viajó al espacio, sino que interactuó con palancas durante su vuelo, demostrando que un ser vivo podía realizar tareas en microgravedad. ¡Explora el resto del mapa para conocer a fondo sus impresionantes misiones!",
      "image": "/assets/animales/intro_orbit.png",
      "imgCaption": "Laika (1957) y Ham (1961) son iconos mundiales de la exploración espacial biológica."
    }
  ];
}

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log('Done');
