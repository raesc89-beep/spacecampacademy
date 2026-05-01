const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

const newContent = {};

// OPPORTUNITY
newContent.robots_opportunity = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Vehículo de Exploración Opportunity`,
  text: [
    "Opportunity fue un vehículo explorador geológico diseñado por la agencia espacial estadounidense y lanzado hacia Marte en el año 2003.",
    "Formaba parte de la misión Mars Exploration Rover, siendo el vehículo gemelo del explorador Spirit, el cual aterrizó en una región opuesta.",
    "El objetivo científico principal de Opportunity era buscar evidencias geológicas concluyentes de la existencia pasada de agua líquida en la superficie marciana.",
    "El rover aterrizó exitosamente el 25 de enero de 2004 en una llanura ecuatorial de Marte conocida oficialmente como Meridiani Planum.",
    "A diferencia de los aterrizajes modernos, Opportunity descendió envuelto en un sistema de múltiples bolsas de aire para amortiguar el fuerte impacto.",
    "Inicialmente, la misión fue financiada y programada para durar únicamente noventa días marcianos, conocidos científicamente con el término técnico de 'soles'.",
    "Sin embargo, el diseño de ingeniería de la máquina demostró ser excepcionalmente duradero, superando todas las estimaciones térmicas y mecánicas.",
    "El vehículo pesaba aproximadamente 185 kilogramos y dependía de grandes paneles solares para cargar sus baterías y operar sus instrumentos analíticos.",
    "Contaba con un brazo robótico equipado con un espectrómetro y una herramienta de abrasión para perforar rocas y analizar su composición mineral.",
    "A lo largo de su prolongada misión, Opportunity aportó datos que revolucionaron nuestra comprensión sobre la antigua y húmeda historia de Marte."
  ]
}));

// COLISIONES ESTELARES
newContent.colisiones_estelares = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Dinámica de Colisiones Estelares`,
  text: [
    "Las colisiones estelares son eventos astrofísicos de escala masiva donde dos o más estrellas se fusionan debido a la extrema atracción gravitacional mutua.",
    "Aunque el espacio intermedio entre las estrellas es inmenso, las fusiones son frecuentes dentro de los densos cúmulos globulares situados en el núcleo galáctico.",
    "Cuando dos estrellas de masa intermedia colisionan de forma directa, la tremenda energía cinética se transforma en radiación térmica y luminosa aguda.",
    "El material exterior de ambas estrellas se entrelaza y comienza a girar en torno a un nuevo y único centro de gravedad en expansión.",
    "El resultado físico directo de esta fusión suele ser una estrella más masiva, caliente y azulada, conocida astronómicamente como una estrella rezagada azul.",
    "Estas nuevas estrellas rezagadas presentan un aspecto mucho más joven de lo que la edad general del cúmulo estelar sugeriría según los modelos teóricos.",
    "Si la colisión ocurre entre estrellas de neutrones extremadamente densas, el evento genera ondas gravitacionales detectables a millones de años luz de distancia.",
    "El choque neutrónico provoca la expulsión masiva de materia rica en neutrones que se desintegra rápidamente formando elementos químicos muy pesados.",
    "Los científicos han determinado que gran parte del oro y platino presentes en el universo se formaron exclusivamente durante estas colisiones neutrónicas.",
    "El estudio observacional de estos choques permite a los físicos entender la evolución dinámica de las galaxias a lo largo de miles de millones de años."
  ]
}));

// AGUJEROS NEGROS
newContent.black_hole = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Física de los Agujeros Negros`,
  text: [
    "Un agujero negro es una región geométrica del espacio-tiempo cuya fuerza gravitatoria es tan intensa que ninguna partícula ni radiación puede escapar.",
    "La frontera teórica que delimita el punto de no retorno se denomina horizonte de sucesos, un límite matemático formulado por la relatividad general de Einstein.",
    "En el centro del agujero negro se encuentra la singularidad gravitacional, un punto teórico de volumen cero y densidad infinita que desafía la física actual.",
    "Los agujeros negros estelares se forman tras el colapso gravitatorio de estrellas masivas que han agotado todo su combustible nuclear termonuclear.",
    "Al cesar la fusión nuclear interna, la estrella pierde la presión de radiación que contrarrestaba su propia gravedad, desencadenando un colapso instantáneo.",
    "Durante el proceso de formación, las capas exteriores de la estrella son expulsadas en una violenta explosión conocida como supernova tipo II.",
    "Existen también los agujeros negros supermasivos, cuyas masas equivalen a millones o miles de millones de veces la masa de nuestro Sol central.",
    "Estos gigantes oscuros se encuentran localizados en el núcleo activo de prácticamente todas las galaxias mayores conocidas, incluida nuestra propia Vía Láctea.",
    "Aunque un agujero negro no emite luz directamente, el gas interestelar que cae hacia su interior forma un brillante y caliente disco de acreción.",
    "La fricción extrema en este disco calienta el gas a millones de grados, emitiendo rayos X que los telescopios espaciales logran detectar y mapear."
  ]
}));

// ASTEROIDES INTRO
newContent.asteroides_intro = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Origen y Clasificación de Asteroides`,
  text: [
    "Los asteroides son cuerpos celestes compuestos principalmente de rocas y metales que orbitan alrededor del Sol sin cumplir los criterios de un planeta.",
    "A diferencia de los cometas, carecen de atmósferas temporales y no desarrollan colas visibles de polvo o gas al acercarse a la estrella central.",
    "Representan fragmentos primitivos y remanentes sin alterar procedentes de los primeros millones de años de formación de nuestro sistema planetario solar.",
    "La gran mayoría de estos objetos se encuentran agrupados en el cinturón principal de asteroides, una región situada entre las órbitas de Marte y Júpiter.",
    "Se estima que la fuerte perturbación gravitacional de Júpiter impidió que los materiales de esta región se aglomeraran para formar un planeta sólido.",
    "Los asteroides varían drásticamente en tamaño, desde pequeñas rocas de pocos metros hasta cuerpos masivos como Ceres, que alcanza casi mil kilómetros.",
    "Científicamente se clasifican en tres tipos principales según su composición: tipo C (ricos en carbono), tipo S (silicatos rocosos) y tipo M (metálicos pesados).",
    "Los asteroides metálicos contienen grandes cantidades de hierro y níquel puros, lo que los convierte en potenciales objetivos para la minería espacial futura.",
    "Algunos asteroides cruzan la órbita terrestre, por lo que son monitoreados continuamente por programas de defensa planetaria para prever cualquier impacto.",
    "El estudio geológico directo de estas rocas arcaicas resulta esencial para comprender los elementos primordiales que dieron origen a nuestro mundo terrestre."
  ]
}));

const keys = Object.keys(newContent);
keys.forEach(k => {
  const idx = jsData.findIndex(c => c.id === k);
  if (idx !== -1) {
    for (let i = 0; i < 15; i++) {
      jsData[idx].contentEs.sections[i].title = newContent[k][i].title;
      jsData[idx].contentEs.sections[i].text = newContent[k][i].text;
    }
  }
});

const header = '// Archivo maestro estático del curso\nexport const COURSE_DATA = ';
fs.writeFileSync('lib/courseData.js', header + JSON.stringify(jsData, null, 2) + ';\n', 'utf8');
console.log("Lote de Módulos Críticos reconstruidos exitosamente.");
