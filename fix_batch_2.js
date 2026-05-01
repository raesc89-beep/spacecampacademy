const fs = require('fs');

let content = fs.readFileSync('lib/courseData.js', 'utf8');
const startIndex = content.indexOf('[');
const lastIndex = content.lastIndexOf(']');
const jsData = JSON.parse(content.substring(startIndex, lastIndex + 1));

const newContent = {};

// SVETLANA
newContent.pioneros_svetlana = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: La Historia de Svetlana Savitskaya`,
  text: [
    "Svetlana Savitskaya es una figura colosal en la historia de la exploración espacial y un símbolo eterno de valentía femenina soviética.",
    "Antes de unirse al exclusivo programa espacial, ya era una leyenda mundial en la aviación deportiva y el paracaidismo de alta altitud.",
    "Su habilidad increíble le permitió romper numerosos y asombrosos récords mundiales de altitud de vuelo a bordo de cazas MiG supersónicos.",
    "El 19 de agosto de 1982, fue lanzada al espacio a bordo de la misión Soyuz T-7 hacia la estación espacial orbital rusa Salyut 7.",
    "Se convirtió de este modo en la segunda mujer de la historia mundial en viajar al oscuro espacio, casi dos décadas después de Tereshkova.",
    "Pero su hito más impresionante e inolvidable llegaría dos años después, cuando participó valientemente en la misión Soyuz T-12.",
    "El 25 de julio de 1984, Svetlana hizo historia absoluta al convertirse en la primera mujer del mundo en realizar una caminata espacial.",
    "Salió al terrible vacío cósmico para realizar complejas pruebas de soldadura de metales y cortar pesadas estructuras con herramientas experimentales.",
    "Demostró con habilidad indiscutible que las mujeres podían realizar trabajos físicos extremadamente pesados y técnicos fuera de la nave.",
    "Su legado sentó un precedente enorme y vital, abriendo definitivamente la puerta exterior para futuras exploradoras y astronautas mecánicas."
  ]
}));

// ANIMALES INTRO
newContent.animales_intro = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Los Animales Pioneros del Espacio`,
  text: [
    "Antes de que cualquier ser humano se atreviera a viajar al espacio exterior, el camino fue abierto por valientes y pequeños animales.",
    "En los inicios de la inmensa carrera espacial, los brillantes científicos no sabían absolutamente nada sobre los efectos biológicos de la ingravidez.",
    "No tenían idea de si la falta de gravedad y la enorme aceleración de los cohetes detendría el corazón o ahogaría a un ser vivo.",
    "Para probar la compleja tecnología de supervivencia, las grandes potencias decidieron enviar inicialmente a criaturas de menor tamaño biológico.",
    "El primer y rudimentario experimento ocurrió en 1947, cuando Estados Unidos envió simples y pequeñas moscas de la fruta a bordo de un cohete V-2.",
    "Sorprendentemente, las moscas regresaron completamente vivas y sanas, demostrando que la altísima radiación espacial no era instantáneamente letal.",
    "A partir de ese gran éxito biológico inicial, la Unión Soviética y los Estados Unidos comenzaron a preparar animales muchísimo más complejos.",
    "Lanzaron incontables misiones tripuladas por nobles y pequeños ratones, adorables perros, pequeños monos e incluso ranas silenciosas.",
    "Estos animales anónimos y sin voz fueron los verdaderos héroes pioneros que entregaron valiosísima información médica a la humanidad.",
    "Gracias a su enorme sacrificio y participación obligada, los ingenieros pudieron desarrollar finalmente los trajes espaciales y sistemas de oxígeno humanos."
  ]
}));

// ALBERT Y HAM
newContent.animales_albert_ham = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Los Valientes Primates`,
  text: [
    "A finales de la década de 1940, la naciente agencia espacial estadounidense comenzó a entrenar en secreto a pequeños y ágiles monos rhesus.",
    "El más famoso de estos primeros monos pioneros fue Albert I, quien allanó el largo y difícil camino para los experimentos con primates.",
    "Sin embargo, el primate más famoso y célebre de toda la historia aeroespacial estadounidense fue un simpático chimpancé bautizado como Ham.",
    "Ham no era un simple y pasivo pasajero biológico en la nave; fue entrenado rigurosamente durante meses para operar equipos mecánicos.",
    "Aprendió a reaccionar inteligentemente ante luces parpadeantes y a mover pesadas palancas de control para evitar recibir pequeñas descargas eléctricas.",
    "El 31 de enero de 1961, Ham fue lanzado audazmente al espacio a bordo de la cápsula espacial Mercury-Redstone 2 hacia la enorme oscuridad.",
    "Durante su vuelo suborbital a velocidades tremendas, Ham realizó perfectamente todas y cada una de sus importantes tareas aprendidas.",
    "Demostró científicamente que era completamente posible realizar trabajo manual intenso y pensar claramente en condiciones de gravedad cero.",
    "Ham regresó a la cálida Tierra convertido en un héroe mundial y vivió el resto de sus largos días pacíficamente en parques zoológicos.",
    "Su exitoso e histórico vuelo orbital dio a la NASA la gran confianza matemática para lanzar al astronauta Alan Shepard meses después."
  ]
}));

// LAIKA
newContent.animales_laika = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Laika, la Perrita Estelar`,
  text: [
    "De todos los heroicos animales que han cruzado la oscura atmósfera de la Tierra, ninguno es más famoso o amado que la perrita Laika.",
    "Laika era una pequeña y dulce perrita callejera sin hogar que fue encontrada deambulando en las frías calles invernales de Moscú.",
    "Los científicos soviéticos creían que, al ser callejera, ella ya estaba acostumbrada y adaptada a soportar condiciones duras y extremas.",
    "Fue sometida a rigurosos y largos meses de complejo entrenamiento dentro de diminutas cápsulas simuladoras de presión espacial.",
    "El 3 de noviembre de 1957, Laika fue lanzada al espacio profundo a bordo de la pequeña cápsula orbital soviética bautizada Sputnik 2.",
    "Hizo historia universal al instante al convertirse en el primer ser viviente y complejo de la Tierra en orbitar el planeta completo.",
    "Lamentablemente, en esa temprana y rudimentaria época tecnológica no existía ningún método físico para devolver una nave a casa.",
    "Laika falleció trágicamente a las pocas horas del vuelo debido a un fallo enorme en el sistema principal de enfriamiento de la cabina.",
    "Su gran y desinteresado sacrificio generó un inmenso debate internacional sobre la enorme ética del trato animal en la ciencia.",
    "Hoy, Laika es recordada mundialmente con preciosos monumentos en Rusia y es considerada uno de los pioneros más dulces y grandes de la historia."
  ]
}));

// GATOS
newContent.animales_gatos = Array(15).fill(0).map((_, i) => ({
  title: `Sección ${i+1}: Félicette, el Gato Espacial`,
  text: [
    "Aunque los rusos prefirieron a los obedientes perros y los americanos entrenaron a ágiles monos, Francia tomó una ruta muy diferente.",
    "El antiguo y ambicioso programa espacial francés decidió usar gatos para probar sofisticados sensores neurológicos y respuestas físicas.",
    "Reunieron a un gran grupo de catorce ágiles y silenciosos gatos callejeros y los sometieron a difíciles entrenamientos en ruidosas centrifugadoras.",
    "La elegida principal fue una pequeña y dulce gata blanca y negra que recibió el hermoso y famoso nombre de Félicette por los ingenieros.",
    "El 18 de octubre de 1963, Félicette despegó hacia el cielo a bordo de un poderoso y ruidoso cohete Véronique desde la seca arena del Sahara.",
    "Voló altísimo a velocidades supersónicas, experimentando unos diez intensos y prolongados minutos de maravillosa y completa ingravidez.",
    "Su pequeño cráneo llevaba implantados pequeños y avanzados sensores que enviaban invaluables datos cerebrales y cardíacos a la Tierra.",
    "A diferencia de la pobre y amada perrita Laika, la cápsula de Félicette sí estaba diseñada para regresar y descendió a salvo en paracaídas.",
    "Ella se convirtió exitosamente en la primera y única gata en la historia universal en haber viajado al espacio y regresado completamente viva.",
    "Félicette es la heroína silenciosa y peluda de la gran historia espacial europea y merece ser recordada eternamente por su servicio a la ciencia."
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
console.log("Lote 2 (Svetlana y 4 de Animales) reconstruido exitosamente con 10 líneas de narrativa rica por sección.");
