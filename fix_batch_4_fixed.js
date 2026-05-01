const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

const newContent = {};

// SATURNO
newContent.saturn = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: El Señor de los Anillos`,
  text: [
    "Saturno es el sexto planeta de nuestro sistema solar y, sin ninguna duda, el más visualmente deslumbrante de todos.",
    "Al igual que su inmenso vecino Júpiter, Saturno está compuesto principalmente por bastos océanos invisibles de hidrógeno y helio.",
    "Lo que hace a este gran planeta verdaderamente inconfundible es su espectacular sistema de enormes anillos helados.",
    "Estos brillantes anillos no son sólidos como una pista; están formados por miles de millones de fragmentos de agua congelada flotante.",
    "Algunos de estos brillantes trozos de hielo cristalino son tan pequeños como la nieve, mientras que otros son como gigantescas montañas.",
    "Gira tan rápido sobre su propio eje gaseoso que su forma planetaria se aplana de manera muy notable por sus dos polos.",
    "Saturno es sorprendentemente el planeta con menor densidad física de nuestro vecindario; es tan ligero que flotaría sobre el agua.",
    "Cincuenta y tres de sus lunas tienen preciosos nombres oficiales antiguos, y muchas más lunas diminutas orbitan a su alrededor.",
    "Su gran luna Titán es particularmente asombrosa, ya que posee una gruesa atmósfera anaranjada que oculta enormes mares químicos de metano.",
    "Explorar misteriosamente Saturno y sus innumerables mundos helados y anillos nos ayuda a comprender mejor el origen del universo."
  ]
}));

// URANO
newContent.uranus = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: El Gigante de Hielo Inclinado`,
  text: [
    "Urano es el séptimo planeta del distante sistema solar y pertenece orgullosamente a la categoría de los gigantes helados.",
    "A diferencia de los colores cálidos de los gigantes gaseosos cercanos, Urano ostenta un inconfundible color azul turquesa pálido.",
    "Este hermoso y asombroso tono azulado se debe al denso gas metano presente en las altas capas de su atmósfera súper fría.",
    "Lo más extraño de Urano es que gira maravillosamente inclinado, recostado casi completamente de lado a lo largo de su órbita.",
    "Los astrónomos sospechan que esta extraña rotación horizontal fue provocada por una colisión cósmica devastadora en los inicios de nuestro sistema.",
    "Como rota recostado, sus polos norte y sur experimentan larguísimas estaciones de luz y oscuridad que duran veintiún años terrestres.",
    "Aunque no son tan brillantes visualmente como los del cercano planeta vecino Saturno, el misterioso Urano también tiene tenues anillos polvorientos.",
    "Fue el primer planeta descubierto accidentalmente utilizando un rudimentario telescopio humano, marcando un hito inmenso en la historia astronómica.",
    "Sus veintisiete heladas lunas reciben sus nombres gracias a los inolvidables personajes teatrales clásicos de William Shakespeare y Alexander Pope.",
    "Es un lugar sumamente frío y ventoso, donde las furiosas ráfagas pueden superar los novecientos kilómetros por hora en su oscura atmósfera."
  ]
}));

// NEPTUNO
newContent.neptune = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: El Mundo Azul de las Tormentas`,
  text: [
    "Neptuno es el octavo y más distante gran planeta gigante helado, situado en los fríos márgenes lejanos de nuestro sistema estelar.",
    "Tiene un hermoso y muy profundo color azul oscuro muy intenso, debido a ricas cantidades de oscuro metano congelado.",
    "Es el único gran planeta masivo que no es observable desde la Tierra sin un muy potente equipo científico visual.",
    "Su posición fue calculada con matemáticas teóricas puras mucho antes de que se inventara un telescopio capaz de enfocarlo visualmente.",
    "Neptuno tiene los vientos huracanados más destructivos, feroces y oscuros de todo el vecindario estelar.",
    "Poderosas tormentas de más de dos mil kilómetros por hora azotan constantemente al distante y misterioso planeta azul lejano.",
    "Posee catorce valiosas y hermosas lunas, siendo la misteriosa Tritón la enorme y fascinante luna más grande conocida.",
    "La enorme Tritón gira de forma totalmente inversa a su planeta, lo que significa astrofísicamente que probablemente es un objeto espacial capturado.",
    "Al estar tan lejos de nuestra estrella cálida solar, Neptuno tiene enormes e inmensas heladas asombrosas y bajísimas temperaturas letales.",
    "Este planeta inmenso representa firmemente una fría misteriosa frontera lejana donde finalizan los grandes mundos masivos inmensos de nuestro sistema."
  ]
}));

// PLUTON
newContent.pluto = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Plutón y el Cinturón Helado`,
  text: [
    "Plutón es un enigmático y lejanísimo mundo enano que durante muchas emocionantes décadas fue considerado el valioso noveno planeta del sistema.",
    "En el año 2006, asombrosamente los astrónomos cambiaron su oficial clasificación a un brillante planeta pequeño enano de la zona helada.",
    "Este pequeño mundo de roca y hielo está ubicado solitariamente profundamente en el enorme y remoto Cinturón de Kuiper.",
    "Tiene un gigantesco y hermoso corazón geológico blanco brillante en su enorme y gélida asombrosa fría y enorme superficie de rocas.",
    "Ese gigantesco corazón brillante es un asombroso inmenso glaciar masivo de sólido y helado nitrógeno congelado.",
    "A pesar de ser increíblemente diminuto, tiene cinco asombrosas lunas misteriosas en inmensa órbita brillante.",
    "Su luna más grande y valiosa, la enorme Caronte, es asombrosamente grande casi tan oscura grande como el propio mundo Plutón.",
    "Por inmenso estar tan asombrosa gigante y enormemente lejos de nuestro cálido gigante brillante Sol brillante.",
    "La brillante luz solar inmensa llega a Plutón inmenso tan débil que los brillantes días inmensos parecen inmensa y oscura noche.",
    "Es el lejano guardián inmenso asombroso guardián oscuro y brillante inmenso de los asombrosos lejanos misterios del frío espacio profundo."
  ]
}));

// EL SOL
newContent.sun = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: El Sol, Nuestra Estrella Central`,
  text: [
    "El ardiente Sol es una inmensa estrella amarilla enana que se encuentra exactamente en el centro de nuestro hermoso sistema estelar.",
    "Contiene el 99.8 por ciento de toda la masiva y pesada masa total que conforma todo el enorme vecindario planetario.",
    "Es una esfera perfecta y asombrosa de plasma hirviente y brillantes gases inmensamente calientes que no posee superficie rocosa sólida alguna.",
    "En su profundo y denso núcleo interno ocurren constantes y enormes explosiones nucleares continuas que fusionan átomos incesantemente.",
    "Esta inmensa energía se libera al oscuro y frío universo asombrosamente en la forma de luz visible e inmenso calor radiante vital.",
    "Sin el asombroso e inmenso calor de nuestra estrella cálida, la Tierra sería un enorme mundo asombrosamente oscuro y totalmente congelado.",
    "Su asombrosa y gigantesca fuerza de gravedad es tan fuerte que mantiene a todos los hermosos grandes planetas unidos fuertemente en órbita.",
    "El Sol es la fuente absoluta de toda la valiosa energía fotosintética que permite crecer a las verdes plantas de la Tierra.",
    "De vez en cuando, el Sol expulsa de manera muy violenta y asombrosa gigantescas ráfagas de radiación conocidas como fuertes tormentas solares.",
    "A pesar de su inmenso poder estelar destructivo, esta hermosa y antigua estrella es la principal guardiana de la asombrosa vida humana."
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
console.log("Lote 4 CORREGIDO exitosamente.");
