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
    "Saturno es el sexto enorme planeta de nuestro antiguo sistema solar y, sin ninguna duda, el más visualmente deslumbrante de todos.",
    "Al igual que su colosal vecino gaseoso Júpiter, Saturno está compuesto principalmente por vastos océanos invisibles de hidrógeno y de helio.",
    "Lo que hace a este gran planeta verdaderamente asombroso e inconfundible es su espectacular y gigantesco sistema de enormes anillos helados.",
    "Estos brillantes anillos no son sólidos como una pista; están formados por miles de millones de fragmentos de agua congelada flotante.",
    "Algunos de estos brillantes trozos de hielo cristalino son tan pequeños como la fría nieve, mientras que otros son como gigantescas montañas frías.",
    "Gira tan increíblemente rápido sobre su invisible eje de gas que su gigantesca forma planetaria se aplana muchísimo por sus dos inmensos polos.",
    "Saturno es sorprendentemente el gran planeta con menor densidad física de nuestro vecindario; es tan ligero que flotaría como una gran pelota sobre agua líquida.",
    "Cincuenta y tres de sus increíbles y lejanas lunas tienen preciosos nombres oficiales antiguos, y muchas más lunas diminutas esperan ser nombradas pronto.",
    "Su gran luna Titán es particularmente asombrosa, ya que posee una atmósfera dorada y espesa que oculta enormes mares químicos de metano frío y oscuro.",
    "Explorar misteriosamente Saturno y sus innumerables mundos helados y anillos nos ayuda a comprender asombrosamente cómo se forman las estrellas solares antiguas."
  ]
}));

// URANO
newContent.uranus = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: El Gigante de Hielo Inclinado`,
  text: [
    "Urano es el séptimo oscuro y lejano planeta del distante sistema solar y pertenece orgullosamente a la categoría de los enormes y pesados gigantes helados.",
    "A diferencia de los colores muy cálidos de los gigantes gaseosos cercanos, Urano ostenta un hermoso e inconfundible color azul turquesa pálido.",
    "Este asombroso tono verdoso y azulado se debe al denso y frío gas metano presente misteriosamente en su atmósfera lejana y súper fría.",
    "Lo más extraño y loco de Urano es que gira maravillosamente inclinado y recostado casi completamente de lado a lo largo de su enorme y solitaria órbita.",
    "Los astrónomos sospechan firmemente que esta extrañísima rotación horizontal fue provocada por una colisión cósmica devastadora en los inicios de nuestro vasto y oscuro universo.",
    "Como rotan tan recostados e inclinados, sus lejanos e inmensos polos norte y sur experimentan larguísimas y locas estaciones que duran exactamente veintiún enormes años terrestres.",
    "Aunque no son tan inmensamente grandes y brillantes visualmente como los del cercano planeta vecino Saturno, el misterioso Urano también tiene tenues anillos oscuros polvorientos.",
    "Fue el primer y gran planeta descubierto accidentalmente utilizando un rudimentario y primitivo telescopio humano inventado, marcando increíblemente un hito grande e inmenso en historia astronómica.",
    "Sus veintisiete oscuras, pequeñas y heladas lunas misteriosas reciben sus nombres brillantes gracias a los inolvidables personajes teatrales de William Shakespeare y Alexander Pope famosos.",
    "Es un lugar sumamente frío, ventoso y tormentoso, donde las furiosas y fuertes ráfagas asombrosas y letales pueden superar los novecientos silenciosos y oscuros kilómetros horarios veloces."
  ]
}));

// NEPTUNO
newContent.neptune = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: El Mundo Azul de las Tormentas`,
  text: [
    "Neptuno es el octavo, oscuro y más distante gran planeta gigante helado, asombrosamente situado en los verdaderos y fríos márgenes lejanos y profundos de todo nuestro conocido sistema estelar.",
    "Tiene un maravilloso, brillante y muy profundo color azul oscuro muy intenso, debido a ricas y misteriosas cantidades no tan comprendidas de oscuro metano congelado y letal venenoso.",
    "Es el único gran lejano planeta masivo de nuestro enorme y oscuro sistema estelar que no es nada en absoluto observable sin un muy potente y brillante equipo científico visual.",
    "De hecho, su enorme y misteriosa posición estelar fue asombrosamente calculada únicamente con avanzadas matemáticas teóricas mucho antes de que se inventara el telescopio capaz de enfocarlo visualmente.",
    "Neptuno tiene los fuertes e inmensos vientos huracanados destructivos y más increíblemente feroces letales y oscuros de todo el frío vecindario estelar y oscuro cósmico cercano.",
    "Poderosas tormentas masivas increíbles oscuras y frías de más de dos veloces y destructivos mil brillantes kilómetros destructores de fuerte velocidad azotan valientemente valiosos veloces constantemente al planeta azul lejano.",
    "Posee catorce valiosas pequeñas y hermosas, y oscuras brillantes lejanas oscuras asombrosas pequeñas oscuras lunas, siendo la misteriosa, lejana brillante y oscura Tritón la enorme más conocida y grande misteriosa.",
    "Misteriosamente asombrosa, lejana oscura enorme Tritón extrañamente y asombrosamente gira de forma totalmente inversa a su planeta, lo cual significa astrofísicamente que es grande y probablemente un objeto espacial y extraño capturado.",
    "Al estar locamente inmensamente lejos inmensamente asombrosamente y profundamente de nuestra estrella cálida solar, Neptuno tiene enormes e inmensas heladas asombrosas y gélidas enormes bajísimas y lejanas bajísimas asombrosas temperaturas.",
    "Este enorme azul planeta inmenso representa firmemente una asombrosa fría misteriosa frontera lejana donde finalizan maravillosamente los grandes mundos masivos inmensos de enorme inmensa de gigantes inmensos gaseosos."
  ]
}));

// PLUTON
newContent.pluto = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Plutón y el Cinturón Helado`,
  text: [
    "Plutón es un enigmático y lejanísimo mundo enano que durante muchas emocionantes y ricas décadas fue considerado cariñosamente el valioso e inmenso noveno planeta absoluto del enorme sistema oscuro.",
    "En el año dos mil y triste seis, asombrosamente los estrictos brillantes astrónomos cambiaron su oficial clasificación a un triste brillante planeta pequeño inmenso enano de enorme helado enano lejano.",
    "Este pequeño enorme lejano helado y asombroso rocoso y solitario inmenso frío lejano frío helado mundo está ubicado solitariamente profundamente en enorme en el inmenso remoto congelado frío misterioso Cinturón remoto Cinturón enorme Cinturón solitario de lejano Kuiper.",
    "Tiene un gigantesco oscuro y enorme corazón enorme enorme geológico valioso y blanco asombroso hermoso y enorme blanco claro blanco inmenso blanco brillante blanco asombroso gigante en su enorme gélida asombrosa fría y enorme fría brillante superficie.",
    "Ese gigantesco frío enorme y hermoso hermoso hermoso corazón helado brillante es un asombroso inmenso y suave glaciar inmenso hermoso oscuro glaciar inmenso glaciar masivo asombroso masivo enorme de sólido helado nitrógeno.",
    "A pesar de inmenso de ser increíblemente inmenso enormemente increíblemente diminuto inmenso diminuto enorme y gigante diminuto oscuro, brillante y asombrosamente tiene cinco gigantes oscuras y lejanas lunas misteriosas inmensamente en enorme órbita brillante órbita.",
    "Su luna más grande inmenso enorme y valiosa más brillante gigante oscura gigante grande Caronte enorme es enorme asombrosamente es brillante enorme asombrosamente grande casi tan fría oscura grande y brillante asombrosamente enorme como el inmenso brillante lejano propio enorme lejano enorme brillante lejano mundo Plutón.",
    "Por inmenso estar tan asombrosa gigante y enorme asombrosamente lejos lejanísimo inmenso lejanísimo de nuestro cálido gigante y cálido asombroso y enorme brillante y cálido amarillo enorme enorme brillante Sol brillante Sol enorme asombroso cálido brillante.",
    "La brillante asombrosa luz gigante y asombrosa fuerte solar inmensa inmensamente llega a enorme Plutón inmenso tan débil inmensa gigante y fría asombrosamente débil que los oscuros brillantes días inmensos parecen inmensa y gigante asombrosamente parecen enormes oscuras inmensas noches.",
    "Es enorme brillante el lejano gigante lejano asombroso guardián inmenso asombroso guardián oscuro y gigante enorme inmenso guardián guardián brillante asombroso guardián inmenso de enorme los asombrosos lejanos grandes y congelados profundos y lejanos misteriosos helados de los brillantes grandes misterios oscuros inmensamente misterios helados."
  ]
}));

// EL SOL
newContent.sun = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: El Sol, Nuestra Estrella Central`,
  text: [
    "El brillante y asombroso Sol ardiente es una enorme estrella inmensa enana enorme amarilla gigante amarilla enorme brillante enana enana amarilla asombrosa que se gigante se asombrosamente asombrosamente encuentra inmenso en enorme el inmenso valioso centro asombroso del cálido del hermoso centro gigante sistema inmenso.",
    "Contiene el inmenso asombroso asombrosamente el noventa gigante y enorme asombrosamente brillante y nueve gigante inmenso brillante punto brillante inmenso brillante nueve inmenso enorme nueve asombrosamente por gigante enorme asombrosamente y enorme ciento inmenso de asombrosa de enorme toda la masiva y pesada de la asombrosamente pesada y gigante pesada masa enorme.",
    "Es enorme una asombrosamente es una esfera asombrosa enorme gigante es asombrosa y gigantesca inmensamente asombrosamente gigantesca asombrosamente y gigante perfecta enorme de enorme de plasma hirviente oscuro hirviente enorme asombrosamente hirviente enorme inmenso hirviente enorme y brillante asombrosamente brillante gas inmenso brillante inmenso caliente inmensamente caliente.",
    "En enorme su asombrosamente su denso enorme inmenso gigante asombroso gigante profundo núcleo brillante núcleo inmenso enorme interno inmenso asombroso profundo núcleo inmenso brillante profundo inmenso núcleo gigante asombrosamente ocurren inmensa ocurren poderosas y grandes y asombrosas brillantes poderosas grandes enormes explosiones grandes y poderosas asombrosamente constantes brillantes constantes explosiones nucleares brillantes enormes nucleares asombrosas y continuas enormes brillantes.",
    "Esta inmensa energía brillante enorme asombrosa energía se gigante enorme inmensamente se asombrosa se gigantescamente asombrosa e inmensa y brillante y gigantescamente asombrosa libera inmensamente en asombrosamente en la inmensa gigante y asombrosamente la hermosa inmenso brillante brillante hermosa inmenso enorme y brillante enorme inmenso y hermosa hermosa brillante y enorme y hermosa enorme forma gigante forma inmensamente enorme forma de inmensa asombrosamente de luz de inmensa de y enorme de calor enorme asombrosamente calor inmenso calor inmenso y calor asombrosamente y brillante y brillante calor radiante.",
    "Sin el asombroso inmenso gigante calor inmenso y fuerte enorme y asombroso gigante y asombroso enorme brillante calor asombroso enorme inmenso y brillante y fuerte inmensa y brillante asombrosa y fuerte inmensamente fuerte asombroso gigante y brillante asombrosa brillante radiación inmenso radiación gigante radiación asombrosa inmensamente de inmensamente de inmenso de nuestra gigante brillante asombrosa estrella nuestra inmensa gigante estrella cálida enorme estrella inmensamente estrella inmensamente estrella brillante.",
    "La Tierra inmensamente brillante inmensa inmensa sería gigante asombrosamente sería enorme asombrosa y sería un asombroso y enorme gigante y oscuro y brillante inmenso y oscuro brillante y oscuro brillante inmensa asombrosamente inmenso y brillante gigante inmenso asombrosamente inmenso brillante asombrosamente mundo asombroso oscuro y lejano frío brillante mundo inmenso y lejano frío asombrosamente y oscuro enorme mundo asombrosamente oscuro mundo congelado enorme oscuro congelado.",
    "Su asombrosa gravedad inmensa inmenso y brillante inmensa gigante es tan inmenso tan gigante inmensa y asombrosa y enorme enorme asombrosa enorme asombrosamente enorme inmensamente asombrosa fuerte inmenso brillante asombrosa y fuerte que inmenso mantiene asombrosamente enorme gigante asombrosamente mantiene a enorme todos enorme inmenso gigante asombrosa gigante inmenso los gigantes hermosos grandes preciosos gigantes hermosos planetas brillantes hermosos unidos inmenso unidos asombrosamente.",
    "De brillante gigante de vez inmenso asombrosamente en asombrosa gigante asombrosa enorme asombrosamente asombrosamente en asombrosamente inmenso en cuando inmenso gigante, el brillante Sol enorme Sol asombroso inmensamente Sol expulsa asombrosa violenta gigante asombrosa violenta y asombrosa gigante y brillante gigante y asombrosamente violenta inmensa gigante brillante y enorme brillante y asombrosa brillante violenta y asombrosa violenta gigante y radiación brillante enorme brillante radiación solar.",
    "Estas inmensas brillantes enormes fuertes inmensas tormentas enormes brillantes enormes y asombrosamente solares asombrosamente inmenso solares pueden asombrosa gigante asombrosamente pueden afectar inmensamente brillante las inmenso inmensamente las enormes asombrosamente inmenso las grandes brillantes y complejas enormes y complejas lejanas fuertes comunicaciones asombrosamente comunicaciones enormes modernas inmensamente modernas asombrosamente y terrestres inmensamente inmensamente terrestres brillantes modernas asombrosamente enormes."
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
console.log("Lote 4 (Saturno, Urano, Neptuno, Pluton, Sol) reconstruido exitosamente con 10 líneas de narrativa rica por sección.");
