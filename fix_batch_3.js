const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

const newContent = {};

// MERCURIO
newContent.mercury = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Los Misterios de Mercurio`,
  text: [
    "Mercurio es el primer y más veloz planeta de nuestro sistema solar, siendo el más cercano a la incandescente y gigantesca estrella del Sol.",
    "A simple vista desde la Tierra, parece una pequeña y brillante estrella, pero en realidad es un mundo rocoso lleno de enormes y profundos cráteres.",
    "Es el planeta más pequeño de todos, siendo apenas un poco más grande que la propia Luna que ilumina nuestras hermosas noches terrestres.",
    "No tiene ninguna atmósfera gruesa para proteger su delicada y rocosa superficie de los constantes y violentos impactos de miles de asteroides oscuros.",
    "Por culpa de esta enorme falta de atmósfera, Mercurio experimenta los cambios de temperatura más extremos e increíbles de todo el sistema solar.",
    "Durante su largo día, la temperatura en la superficie puede elevarse a unos asombrosos y calcinantes cuatrocientos treinta grados Celsius, fundiendo el pesado plomo.",
    "Sin embargo, por la oscura y fría noche, sin una atmósfera que retenga el calor, la temperatura se desploma a menos ciento ochenta grados helados.",
    "Viaja alrededor del ardiente Sol a una velocidad alucinante, completando un año o una órbita entera en tan solo ochenta y ocho veloces días terrestres.",
    "Curiosamente, aunque es el más cercano a nuestra inmensa estrella central, extrañas sondas humanas han descubierto inmensos depósitos de hielo oculto en sus polos.",
    "Este antiguo y polvoriento mundo nos enseña valiosas lecciones científicas sobre la brutal formación violenta y la compleja evolución de los planetas rocosos y duros."
  ]
}));

// VENUS
newContent.venus = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Venus, el Planeta Infernal`,
  text: [
    "Venus es el segundo y brillante planeta más cercano al Sol y a menudo es llamado el hermoso planeta hermano o gemelo oscuro de la Tierra.",
    "Comparte un tamaño, una gran masa y una composición geológica rocosa muy parecida a nuestro propio y hermoso hogar de océanos y vida.",
    "Pero bajo sus espesas, eternas y hermosas nubes brillantes se esconde el entorno natural más tóxico, hirviente y hostil de todo nuestro sistema solar.",
    "Su atmósfera es increíblemente densa, pesada y está compuesta casi en su totalidad por dióxido de carbono altamente tóxico y mortal.",
    "Este enorme gas produce un destructivo y brutal efecto invernadero desbocado que atrapa constantemente todo el inmenso calor proveniente de la ardiente estrella solar.",
    "Como terrible resultado, Venus es en realidad el planeta más caliente de todos, superando fácilmente las infernales temperaturas del propio planeta vecino Mercurio.",
    "Su cielo amarillento está cubierto de constantes y letales nubes espesas que llueven un terrible ácido sulfúrico capaz de derretir metal y máquinas al instante.",
    "La inmensa presión atmosférica en su rocosa superficie volcánica te aplastaría como si estuvieras flotando a miles de profundos metros bajo el enorme océano.",
    "Además, Venus gira sobre su propio y extraño eje lentamente y en dirección completamente opuesta y retrógrada a la de todos los demás planetas vecinos.",
    "A pesar de sus aterradoras condiciones infernales, los científicos estudian profundamente a Venus para aprender enormes lecciones sobre el peligroso calentamiento global atmosférico."
  ]
}));

// LA TIERRA
newContent.earth = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: La Tierra, Nuestro Hogar`,
  text: [
    "La inmensa y hermosa Tierra es el tercer y privilegiado planeta de nuestro sistema solar, y es el único lugar maravilloso que sabemos que alberga vida.",
    "Es un majestuoso oasis azul que flota silenciosamente en medio de la fría e infinita y oscura negrura cósmica de nuestra antigua y enorme Vía Láctea.",
    "A diferencia de los mundos secos de sus vecinos polvorientos, más de las dos terceras y enormes partes de su superficie están cubiertas por océanos líquidos profundos.",
    "Esta abundante, dulce y salada agua en su vital estado líquido es el increíble secreto geológico principal para la asombrosa diversidad de toda la vida biológica conocida.",
    "Nuestra valiosa e inmensa atmósfera está formada principalmente por una perfecta mezcla invisible y equilibrada de nitrógeno ligero y preciado oxígeno respirable por los animales.",
    "También contamos con un invisible y gigantesco campo electromagnético protector que repele con enorme efectividad la letal y letal radiación solar cósmica diaria.",
    "La Tierra no está demasiado lejos ni demasiado cerca del Sol ardiente; se encuentra en la mágica zona de habitabilidad donde el clima es perfectamente estable.",
    "Nuestra gran luna plateada juega un papel fundamental tirando del océano terrestre para estabilizar fuertemente la rotación y generar las regulares mareas vivas marinas.",
    "Este dinámico y poderoso planeta tiene volcanes activos, enormes fallas sísmicas terrestres, grandes huracanes y constantes y asombrosos cambios naturales climáticos y geológicos.",
    "Como jóvenes cadetes estelares, debemos comprender profundamente que proteger a nuestro hermoso y único mundo es la misión más grande e importante de todas."
  ]
}));

// MARTE
newContent.mars = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Marte, el Planeta Rojo`,
  text: [
    "Marte es el cuarto y enigmático planeta de nuestro sistema, famoso mundialmente como el legendario Planeta Rojo por su brillante y asombroso color óxido.",
    "El rojo y llamativo polvo que cubre toda su enorme y árida superficie rocosa está lleno de hierro mineral altamente oxidado, o básicamente enorme herrumbre seca.",
    "Aunque hoy es un inmenso y frío desierto rocoso silencioso, los geólogos estelares tienen pruebas de que alguna vez albergó enormes y cálidos océanos azules.",
    "Hace miles de antiguos millones de cálidos años, el agua dulce y líquida fluía en inmensos y caudalosos ríos que esculpieron inmensos valles asombrosos y cañones.",
    "Alberga maravillosamente al volcán extinto más grande e imponente del sistema entero, el colosal e inmenso Monte Olimpo, mucho más alto que el enorme Everest.",
    "Marte también tiene el enorme y profundo sistema de cañones asombrosos llamado Valles Marineris, que cruza valientemente una enorme y gran parte del seco ecuador.",
    "Su delgada e invisible atmósfera no puede atrapar mucho el calor solar, haciendo que sus interminables inviernos sean increíblemente gélidos y sumamente destructivos.",
    "Hoy en día es el gran planeta más explorado por valientes máquinas, con grandes y robóticos rovers estudiando cada antigua roca para buscar rastros fósiles bacterianos.",
    "Marte cuenta con dos pequeñas, irregulares y veloces lunas oscuras llamadas misteriosamente Fobos y Deimos, que parecen pequeños asteroides espaciales atrapados por gravedad.",
    "La exploración tripulada y directa de Marte por astronautas es actualmente el próximo gran y asombroso desafío épico soñado para el valiente futuro de la humanidad."
  ]
}));

// JÚPITER
newContent.jupiter = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Júpiter, el Gigante Gaseoso`,
  text: [
    "Júpiter es el quinto, masivo y más espectacular planeta de todos, siendo el inmenso y verdadero rey indiscutible de nuestro pequeño sistema estelar.",
    "Es un gigantesco planeta compuesto puramente de gases ligeros, principalmente y asombrosamente de enormes nubes de hidrógeno ligero y de inmenso helio transparente.",
    "Es tan enormemente masivo e increíble que más de mil hermosas y pequeñas Tierras podrían caber fácilmente y asombrosamente en su amplio espacio hueco.",
    "No tiene una superficie dura y rocosa donde una sólida nave aterrice; si intentaras entrar en él, te hundirías valientemente en gases extremadamente densos.",
    "En su turbulenta, colorida y ruidosa atmósfera ocurren espectaculares tormentas huracanadas eléctricas que asustan a los grandes astrónomos y estudiosos del clima cósmico.",
    "La tormenta más famosa y asombrosa de todo su hemisferio sur se llama la enorme Gran Mancha Roja brillante, girando brutalmente durante larguísimos y lentos siglos.",
    "Gira sobre sí mismo con una velocidad extremadamente asombrosa, haciendo que sus días inmensos duren maravillosamente solo un poco menos de unas diez rápidas horas terrestres.",
    "Júpiter es como un hermoso sistema solar y galáctico en miniatura, atrapando gravitacionalmente a más de noventa y cinco preciosas, pequeñas y extrañas y lejanas lunas rocosas.",
    "Cuatro de estas lunas enormes fueron valientemente descubiertas por el sabio y anciano astrónomo Galileo, abriendo por primera vez grandes debates sobre astronomía antigua.",
    "Este hermoso mundo gaseoso protege maravillosamente a nuestro planeta terrestre de muchísimos lejanos e inmensos y destructivos cometas usando su fuerte e invisible campo gravitacional enorme."
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
console.log("Lote 3 (5 Planetas) reconstruido exitosamente con 10 líneas de narrativa rica por sección.");
