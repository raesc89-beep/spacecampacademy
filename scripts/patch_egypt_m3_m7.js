const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '../lib/courseData.js');
let src = fs.readFileSync(FILE, 'utf8');

function replaceSection(src, moduleId, newParagraphs, newQuiz) {
  // Find the module block
  const moduleStart = src.indexOf(`"id": "${moduleId}"`);
  if (moduleStart === -1) { console.log(`NOT FOUND: ${moduleId}`); return src; }

  // Find contentEs.sections text array
  const sectionsStart = src.indexOf('"sections"', moduleStart);
  const textStart = src.indexOf('"text"', sectionsStart);
  const arrStart = src.indexOf('[', textStart);
  
  // Find the matching closing bracket
  let depth = 0;
  let i = arrStart;
  while (i < src.length) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) break; }
    i++;
  }
  const arrEnd = i; // index of closing ]

  const newTextBlock = JSON.stringify(newParagraphs, null, 14)
    .replace(/^\[/, '[')
    .replace(/\]$/, ']');

  src = src.slice(0, arrStart) + newTextBlock + src.slice(arrEnd + 1);

  if (newQuiz) {
    // Replace quiz
    const quizStart = src.indexOf('"quizEs"', src.indexOf(`"id": "${moduleId}"`));
    const quizArrStart = src.indexOf('[', quizStart);
    let d2 = 0, j = quizArrStart;
    while (j < src.length) {
      if (src[j] === '[') d2++;
      else if (src[j] === ']') { d2--; if (d2 === 0) break; }
      j++;
    }
    const newQuizBlock = JSON.stringify(newQuiz, null, 4);
    src = src.slice(0, quizArrStart) + newQuizBlock + src.slice(j + 1);
  }

  console.log(`✅ Patched ${moduleId}`);
  return src;
}

// ============================================================
// egypt_m3 — Sopdet y Sirio (add 5 new paragraphs)
// ============================================================
const egypt_m3_paragraphs = [
  "¡Atención tripulante! Ajusta tus visores ópticos, porque vamos a buscar a la verdadera reina del cielo nocturno. De todos los billones de soles que existen, hay uno que brilla más fuerte que cualquier otro en la noche: la increíble estrella Sirio. Los antiguos egipcios estaban obsesionados con ella. La llamaron 'Sopdet', imaginándola como una diosa mágica y hermosísima. ¡Y tenían buenas razones para adorarla! Literalmente, la supervivencia de millones de personas dependía matemáticamente de esta sola estrella.",
  "Durante el año, la brillante Sopdet desaparecía mágicamente del cielo estrellado por exactamente 70 días, oculta por la luz de nuestro Sol. Los egipcios contaban que, en ese tiempo, ella estaba nadando por las peligrosas aguas del inframundo oscuro. Pero el evento más épico del año ocurría la mañana en que Sopdet finalmente lograba salir de su escondite, parpadeando súper brillante en el horizonte oriental justo antes del amanecer.",
  "¡A este evento la ciencia le llama Orto Helíaco! Cuando la gente la veía aparecer, gritaban de alegría, porque su luz marcaba oficialmente el comienzo del Año Nuevo egipcio. Pero eso no era lo mejor: su reaparición en el cielo anunciaba el momento exacto en que el enorme río Nilo se iba a desbordar. Las aguas llenaban el desierto seco y dejaban un lodo negro y súper nutritivo llamado Kemet, donde podían plantar toda su comida.",
  "Si los astrónomos no hubieran calculado este reloj espacial, la gente se habría quedado sin agua y todo el imperio habría colapsado. Así que observar a Sopdet no era un pasatiempo; era cuestión de vida o muerte. Los sacerdotes astrónomos registraban meticulosamente cada año el día exacto del orto helíaco de Sirio, construyendo tablas de predicción que permitían avisar a los agricultores semanas antes para que prepararan los campos.",
  "¿Te cuento un secreto espacial? El telescopio Hubble de la NASA descubrió que Sirio no es una estrella, ¡sino dos estrellas dando vueltas juntas! Sirio A (la que vemos) y Sirio B (una enana blanca invisible a simple vista) orbitan entre sí cada 50 años. Aunque los egipcios no tenían telescopios, lograron calcular el ciclo exacto de esta estrella en 365 días y un cuarto, demostrando su extraordinaria capacidad de observación.",
  "Tan importante era este número 70 (los días que la estrella desaparecía) que lo usaron como el número sagrado del ritual de momificación. ¡Así es! El proceso de hacer una momia egipcia tomaba exactamente 70 días, para imitar el viaje cósmico de la diosa Sopdet por el inframundo. Pensaban que cuando la momia estaba lista en su tumba, reviviría exactamente igual que la estrella reviviendo en el firmamento cada año.",
  "Muchos de los templos gigantes de piedra estaban perfectamente diseñados para que, una vez al año, la luz de Sirio entrara directamente por un pasillo oscuro hasta iluminar la estatua de una diosa en la cámara más interior. En el templo de Isis en Dendera, el corredor principal apunta exactamente hacia donde sale Sirio. Los arquitectos egipcios eran, a la vez, ingenieros, astrónomos y sacerdotes: todo estaba conectado.",
  "La estrella Sirio está a unos 8.6 años luz de la Tierra, lo que significa que la luz que ves cuando la miras de noche salió de allá hace 8.6 años. Para los egipcios, esta distancia era inconcebible, pero eso no les impedía entender sus ciclos con precisión matemática. Usaban palos verticales clavados en el suelo para medir el ángulo de salida de Sirio sobre el horizonte y así afinar sus predicciones año tras año.",
  "El conocimiento de Sopdet pasó de generación en generación a través de escuelas sacerdotales secretas. Los jóvenes aprendices pasaban años aprendiendo a leer el cielo antes de poder participar en las observaciones oficiales. Este sistema educativo riguroso garantizó que el conocimiento astronómico se mantuviera preciso durante miles de años, sobreviviendo guerras, faraones y cambios de dinastía.",
  "Así, la astronomía antigua no era aburrida; era la clave para tener agua, comida, magia y el secreto de la vida eterna. Nuestra Tierra gira en un delicado baile con otras estrellas lejanas, y los egipcios fueron los primeros en descubrir esa coreografía cósmica. Sirio sigue brillando hoy en el cielo nocturno, y cada vez que la ves, recuerdas que hay una civilización entera que construyó su mundo mirando esa misma luz hace 5,000 años.",
  "Los templos orientados a Sirio no son solo en Egipto: en Grecia, en la India y en Mesopotamia también encontramos estructuras que apuntan hacia esta estrella. Esto nos dice que diferentes culturas del mundo antiguo convergieron en reconocer la importancia de Sirio de manera independiente, lo cual es un testimonio del poder de la observación astronómica compartida por toda la humanidad antigua.",
  "La precesión de la Tierra hace que el punto exacto de salida de Sirio cambie lentamente a lo largo de siglos. Los astrónomos egipcios notaron estas pequeñas variaciones y ajustaban sus cálculos periódicamente. Este refinamiento continuo es exactamente lo que hace la ciencia moderna: observar, medir, ajustar. Los egipcios practicaban el método científico siglos antes de que tuviera ese nombre.",
  "Hoy, satélites como el Gaia de la Agencia Espacial Europea miden las posiciones de más de mil millones de estrellas con una precisión de microsegundos de arco. Sin embargo, los egipcios lograban predicciones útiles con solo sus ojos, palos verticales y cuerdas. La diferencia es de herramientas, no de inteligencia. Su ingenio para extraer información precisa del cielo nocturno sigue impresionando a los astrónomos modernos.",
  "Sopdet también estaba asociada con la fertilidad y el renacimiento. Isis, la gran diosa madre del panteón egipcio, era frecuentemente identificada con Sopdet/Sirio. El hijo de Isis, Horus, a veces se asociaba con Venus o con el Sol naciente. Esta integración entre astronomía y mitología creaba un sistema de significados que daba sentido al universo y al ciclo de la vida para los egipcios.",
  "La próxima vez que veas una estrella brillante en el cielo de invierno, busca a Sirio: es la más luminosa de todas las estrellas visibles a simple vista desde la Tierra. Brilla con una luz ligeramente azulada, señal de que es una estrella joven y caliente. Al mirarla, estarás viendo exactamente lo mismo que veían los astrónomos egipcios hace 5,000 años, conectando tu mirada con la de todas las generaciones que han contemplado el mismo firmamento."
];

const egypt_m3_quiz = [
  { "q": "¿Cuál es la estrella más brillante del cielo nocturno?", "options": ["El Sol", "Sirio (Sopdet)", "Polaris", "Marte"], "a": 1 },
  { "q": "¿Qué marcaba la aparición de Sirio antes del amanecer?", "options": ["El fin del mundo", "El Año Nuevo y la inundación del Nilo", "Una tormenta de arena", "La muerte de un faraón"], "a": 1 },
  { "q": "¿Cuántos días desaparecía Sopdet del cielo?", "options": ["30", "15", "70", "365"], "a": 2 },
  { "q": "¿Por qué era buena la inundación del Nilo?", "options": ["Porque traía barro fértil para sembrar", "Porque les gustaba nadar", "Porque hundía barcos piratas", "Para que los cocodrilos cantaran"], "a": 0 },
  { "q": "¿Qué es el 'orto helíaco'?", "options": ["La aparición de una estrella justo antes del amanecer", "El eclipse solar", "El atardecer en el desierto", "Un tipo de oro egipcio"], "a": 0 }
];

// ============================================================
// egypt_m4 — Mesjetiu: La Osa Mayor
// ============================================================
const egypt_m4_paragraphs = [
  "¡Inicia secuencia de escaneo hacia el Polo Norte celeste, equipo! Si miras al cielo nocturno, quizás reconozcas una figura famosa: la Osa Mayor. Pero los antiguos egipcios la llamaban 'Mesjetiu', creyendo que era la poderosa y musculosa pata delantera de un toro cósmico mágico. Esta constelación circumpolar nunca desaparece bajo el horizonte desde Egipto; siempre gira alrededor del Polo Norte celeste.",
  "Por eso, los egipcios las llamaban 'Las Imperecederas' o 'Las Inmortales', creyendo que eran los espíritus de los faraones que vencieron a la muerte. Ver estas estrellas brillar noche tras noche, sin jamás hundirse en el horizonte, era para ellos la prueba viviente de que existía la vida eterna. Los faraones querían que sus almas se unieran a estas estrellas eternas al morir.",
  "Pero Mesjetiu no solo era mito; era la herramienta de construcción más importante del planeta. Para orientar perfectamente una pirámide hacia el Norte verdadero sin brújula, los ingenieros egipcios usaban las estrellas. Inventaron un ritual llamado 'El Estiramiento de la Cuerda', donde el faraón mismo participaba para marcar el eje norte-sur del futuro monumento usando las estrellas de Mesjetiu como referencia.",
  "Usando un pequeño instrumento de madera para seguir los giros de estas estrellas, lograban encontrar exactamente el Norte Verdadero en la arena del desierto con una precisión asombrosa. Los satélites modernos de la NASA confirman que la Gran Pirámide está orientada con un error de solo 3/60 de un grado respecto al Norte verdadero. Para una estructura de 2.3 millones de bloques, esa precisión es increíble.",
  "¿Por qué preferían el Norte estelar y no el Norte magnético? Porque sabían que el Norte magnético se mueve y no es confiable. Las estrellas circumpolares, en cambio, siempre giran alrededor del mismo punto fijo en el cielo. Esta comprensión de la diferencia entre el Norte magnético y el Norte geográfico es una idea sofisticada que los europeos tardaron miles de años más en formalizar.",
  "Las estrellas que vemos en Mesjetiu están a unas 80-124 años luz de distancia. Algunas de ellas, como Dubhe y Merak (las que forman el 'cucharón' de la Osa Mayor), se mueven en diferentes direcciones en el espacio. Si pudieras ver la Osa Mayor dentro de 50,000 años, su forma sería completamente distinta. Los egipcios detectaron estos movimientos lentos a lo largo de generaciones de observación cuidadosa.",
  "El dios Seth, en la mitología egipcia, era el guardián de Mesjetiu. Debía mantener encadenada la pata del toro cósmico para que nunca se hundiera en el inframundo, garantizando así que las estrellas fueran eternas y que el Norte permaneciera fijo. Esta historia mítica era, en realidad, una manera de enseñar a los niños egipcios astronomía: las historias de dioses codificaban conocimiento científico real.",
  "Los sacerdotes-astrónomos del Egipto antiguo tenían observatorios en lo alto de los templos, desde donde podían ver el horizonte sin obstáculos en todas las direcciones. Desde esas terrazas, trazaban las órbitas aparentes de las estrellas circumpolares noche tras noche, temporada tras temporada, generando registros que se conservaban en rollos de papiro guardados en las bibliotecas de los templos.",
  "El fenómeno de la precesión axial hace que el Polo Norte celeste se mueva lentamente en un círculo que tarda 26,000 años en completarse. Hoy, la estrella polar es Polaris. Pero en la época de las grandes pirámides (2500 a.C.), la estrella polar era Thuban, en la constelación del Dragón. Los egipcios habían notado este desplazamiento a lo largo de siglos y lo incorporaron a sus cálculos astronómicos.",
  "El ritual 'Pedj-shes' (Estiramiento de la Cuerda) era una ceremonia religiosa que a la vez era una operación de ingeniería de alta precisión. Una sacerdotisa representaba a la diosa Seshat, patrona de la escritura, la medición y la arquitectura. Juntos, el faraón y la sacerdotisa usaban cuerdas, palos y sus conocimientos de astronomía para marcar los cuatro ángulos exactos del futuro templo antes de colocar el primer bloque de piedra.",
  "La Osa Mayor fue también una guía de navegación para los viajes comerciales egipcios por el Mediterráneo y el Mar Rojo. Los marinos aprendían de memoria la posición de Mesjetiu y otras constelaciones clave para orientarse en mar abierto durante la noche. Sin este conocimiento astronómico, el comercio de larga distancia que enriqueció a Egipto habría sido imposible.",
  "En el templo de Amón en Karnak, uno de los más grandes del mundo antiguo, el eje principal del edificio está perfectamente alineado con la salida del Sol en el solsticio de invierno. Y el eje perpendicular de algunos de sus corredores apunta hacia Mesjetiu. Los arquitectos tejían la astronomía directamente en la geometría del espacio sagrado, convirtiendo cada templo en un instrumento de observación.",
  "Las siete estrellas principales de Mesjetiu (la Osa Mayor) corresponden a siete importantes divinidades del calendario religioso egipcio. Cada estrella tenía su propio nombre, carácter y función. Este sistema de correspondencias entre estrellas y dioses era, esencialmente, un sistema nemotécnico para recordar y transmitir conocimiento astronómico de forma oral entre generaciones, mucho antes de que existieran los libros.",
  "Hoy, los astrónomos modernos estudian las pirámides de Guiza con herramientas de GPS y software de simulación astronómica para verificar las alineaciones que los egipcios trazaron hace 4,500 años. Cada vez que los cálculos confirman que una pirámide apunta exactamente donde debía apuntar según el cielo de esa época, es un tributo al genio matemático y astronómico de los antiguos ingenieros del Nilo.",
  "Así, transformaron los dibujos brillantes de la noche en planos de construcción para la Tierra. Cada pirámide es una prueba petrificada de que los egipcios lograron bajar la magia geométrica del cielo a la arena. La próxima vez que veas la Osa Mayor, recuerda: estás viendo la misma pata de toro cósmico que guió la construcción de los monumentos más famosos de la historia humana."
];

const egypt_m4_quiz = [
  { "q": "¿Cómo llamaban los egipcios a la Osa Mayor?", "options": ["Sopdet", "Mesjetiu", "Orión", "Hapy"], "a": 1 },
  { "q": "¿Por qué Mesjetiu era útil para construir pirámides?", "options": ["Por su color brillante", "Porque siempre marcaba el Norte verdadero", "Porque era la más grande", "Porque caía al suelo cada año"], "a": 1 },
  { "q": "¿Qué significa que Mesjetiu sea una constelación circumpolar?", "options": ["Que es muy fría", "Que nunca se pone bajo el horizonte", "Que solo se ve de día", "Que está cerca de la Luna"], "a": 1 },
  { "q": "¿Cómo se llamaba el ritual de orientar los templos con estrellas?", "options": ["El Baile de Isis", "El Estiramiento de la Cuerda", "La Danza del Sol", "El Salto del Faraón"], "a": 1 },
  { "q": "¿Qué divinidad era guardiana de Mesjetiu según los mitos egipcios?", "options": ["Ra", "Osiris", "Seth", "Anubis"], "a": 2 }
];

// ============================================================
// egypt_m5 — El Láser de Giza
// ============================================================
const egypt_m5_paragraphs = [
  "¡Alerta de máxima precisión, cadete! Imagina que tienes que apuntar un puntero láser desde el interior de una pirámide enorme y hacerlo llegar exactamente a una estrella específica, a millones de kilómetros de distancia. Eso es exactamente lo que los arquitectos del Antiguo Egipto diseñaron en la Gran Pirámide de Guiza. Construyeron corredores angostos que actúan como tubos de telescopio, apuntando con increíble precisión a estrellas específicas del cielo.",
  "La Gran Pirámide tiene cuatro túneles angostos llamados 'conductos de ventilación' que salen de las cámaras del rey y de la reina hacia el exterior. Durante décadas, los arqueólogos pensaban que simplemente ventilaban el aire. Pero cuando los astrónomos Kate Spence y Robert Bauval calcularon las posiciones estelares del año 2450 a.C., descubrieron algo increíble: ¡cada conducto apuntaba directamente a una estrella importante!",
  "El conducto norte de la Cámara del Rey apuntaba hacia Thuban, la estrella polar de aquella época (hoy ocupada por Polaris). El conducto sur de la Cámara del Rey apuntaba hacia Orión, específicamente a la estrella Zeta Orionis (Alnitak), que los egipcios asociaban con Osiris, dios de la muerte y resurrección. Las alineaciones son tan precisas que astronómos modernos las han verificado con software de simulación.",
  "El conducto sur de la Cámara de la Reina apuntaba directamente a Sirio, la estrella de la diosa Sopdet, cuyo orto helíaco marcaba el Año Nuevo egipcio y la inundación del Nilo. El conducto norte de la misma cámara apuntaba hacia Kochab, una estrella en la Osa Menor. Cada corredor era, literalmente, un canal de comunicación cósmica entre el faraón muerto dentro de la pirámide y los dioses estelares en el cielo.",
  "La construcción de estos corredores requería cálculos trigonométricos avanzados. Los ingenieros debían saber el ángulo exacto de elevación de cada estrella sobre el horizonte en una hora específica de una noche del año 2450 a.C. y luego construir un túnel que atravesara decenas de metros de piedra maciza con ese ángulo exacto. Un error de un grado en el cálculo significaría errar la estrella por varios grados del cielo.",
  "¿Cómo hacían estos cálculos sin computadoras? Usaban el método de 'dos estrellas circumpolares' inventado por la astrónoma Kate Spence: observaban cuando dos estrellas estaban perfectamente alineadas en vertical (lo que ocurre en un momento preciso de cada noche), y en ese instante marcaban el Norte verdadero. Este método tiene un error máximo de solo 2 minutos de arco, suficiente para orientar la pirámide con asombrosa exactitud.",
  "La Pirámide de Kefrén y la de Micerino también tienen alineaciones estelares, aunque menos estudiadas que las de Keops. Algunos investigadores proponen que el conjunto de las tres pirámides de Guiza imita el Cinturón de Orión: las tres estrellas Alnitak, Alnilam y Mintaka forman la misma disposición de dos alineadas y una ligeramente desplazada, igual que las tres pirámides. Esta teoría, llamada 'Correlación de Orión', es debatida pero fascinante.",
  "El 'efecto láser' de la Gran Pirámide no se limita a los corredores internos. La posición de la pirámide en el mapa del Egipto antiguo también tiene significado. Está ubicada en el vértice del delta del Nilo, el punto geométrico donde el río se divide en sus múltiples brazos hacia el mar. Desde el espacio, esta posición es visualmente perfecta, como si los arquitectos hubieran visto una imagen satelital del país.",
  "Estudios con imágenes de radar de penetración de suelo han revelado que debajo de la Gran Pirámide y a su alrededor hay una red de corredores y cámaras subterráneas aún no excavadas. Algunos expertos creen que estas cámaras podrían contener archivos de conocimiento que los sacerdotes enterraron para preservarlos. Sería el equivalente a la Biblioteca de Alejandría, pero en piedra, esperando bajo la arena del desierto.",
  "La temperatura interior de la Gran Pirámide se mantiene constante a 20°C todo el año, independientemente de si afuera hace 40°C de calor o refresca por la noche. Esta estabilidad térmica natural fue posiblemente aprovechada para preservar objetos valiosos, papiros y alimentos sagrados. El diseño de la pirámide funciona como un termos gigante de piedra, lo cual requiere un entendimiento sofisticado de la transferencia de calor.",
  "La Gran Pirámide está hecha de más de 2.3 millones de bloques de piedra caliza, con algunos bloques de granito en las cámaras interiores que vienen de canteras ubicadas a 800 km de distancia, en Asuán. Transportar esos bloques por el Nilo requería barcazas capaces de cargar 60 toneladas. El papiro de Wadi el-Jarf, descubierto en 2013, es el diario de uno de los supervisores de este transporte y describe detalladamente la logística.",
  "El arquitecto jefe de la Gran Pirámide fue muy probablemente Hemiunu, sobrino del faraón Keops. Su estatua, descubierta en Guiza, lo muestra como un hombre corpulento y seguro de sí mismo. Era el equivalente al director de una agencia espacial moderna: coordinaba miles de trabajadores, decenas de ingenieros especializados y el suministro de materiales a lo largo de décadas. Su genio organizacional es tan impresionante como sus logros arquitectónicos.",
  "Los trabajadores que construyeron las pirámides no eran esclavos, como durante mucho tiempo se creyó. Los papiros y las marcas en los bloques revelan que eran obreros asalariados, organizados en equipos con nombres como 'Los Amigos de Keops' o 'Los Borrachos de Micerino'. Tenían seguro médico (se han encontrado esqueletos con huesos rotos que sanaron con cirugía), buena alimentación y eran sepultados con honor cerca de las pirámides.",
  "Las pirámides de Guiza siguen siendo objeto de investigación activa. Proyectos como ScanPyramids (2015-2022) usaron muones cósmicos, termografía infrarroja y fotogrametría 3D para crear mapas del interior sin excavar. Descubrieron una cavidad oculta de al menos 30 metros de largo encima de la Gran Galería, anunciada en 2017. Esta 'habitación secreta' podría cambiar nuestra comprensión de la arquitectura interna de la pirámide.",
  "El gran legado de las alineaciones astronómicas de Guiza es que nos recuerdan que la ciencia y el arte han estado siempre unidos. Los egipcios no separaban la ingeniería de la religión, ni la matemática de la poesía. Todo era parte de un solo esfuerzo por entender y celebrar el universo. En eso, eran más parecidos a los científicos modernos de lo que imaginamos: ambos buscan patrones, orden y belleza en el cosmos."
];

const egypt_m5_quiz = [
  { "q": "¿Hacia qué estrella apuntaba el conducto sur de la Cámara del Rey?", "options": ["Sirio", "Polaris", "Orión/Alnitak", "Kochab"], "a": 2 },
  { "q": "¿A qué estrella apuntaba el conducto sur de la Cámara de la Reina?", "options": ["Thuban", "Sirio", "Vega", "Marte"], "a": 1 },
  { "q": "¿Qué era Thuban en la época de las pirámides?", "options": ["La estrella más brillante", "La estrella polar de esa época", "El planeta Saturno", "Una constelación entera"], "a": 1 },
  { "q": "¿Quiénes construyeron realmente las pirámides?", "options": ["Esclavos sin paga", "Obreros asalariados organizados en equipos", "Robots del futuro", "Extraterrestres"], "a": 1 },
  { "q": "¿Qué descubrió el proyecto ScanPyramids en 2017?", "options": ["Un tesoro de oro", "Una cavidad oculta de 30 metros", "Un túnel hasta China", "Momias extraterrestres"], "a": 1 }
];

// ============================================================
// egypt_m6 — Mapa del Universo: La Tumba de Senenmut
// ============================================================
const egypt_m6_paragraphs = [
  "¡Prepara tu traje de exploración arqueológica, cadete! Hoy vamos a descubrir el mapa más antiguo del universo que ha sobrevivido hasta nuestros días. No está en un museo de ciencias moderno, sino pintado en el techo de una tumba secreta bajo las colinas de Luxor, en Egipto. Esta tumba pertenecía a Senenmut, el arquitecto favorito y hombre de confianza de la reina faraón Hatshepsut, que reinó hace aproximadamente 3,500 años.",
  "Senenmut era uno de los hombres más poderosos de Egipto. Era el arquitecto que diseñó el magnífico templo de Deir el-Bahari para Hatshepsut, una obra maestra de la arquitectura antigua. Pero en el techo de su propia tumba secreta, mandó pintar algo que ningún otro egipcio había hecho antes: una representación completa del cielo nocturno, con planetas, estrellas y constelaciones todas juntas en un solo mapa.",
  "El techo astronómico de la tumba de Senenmut tiene dos partes. La mitad norte muestra constelaciones circumpolares, incluyendo Mesjetiu (la Osa Mayor), el Cocodrilo y el Hipopótamo celestiales. La mitad sur muestra los 36 grupos de estrellas llamados Decanos que los egipcios usaban como reloj nocturno. Es el primer mapa celeste completo que combina ambas zonas del cielo en una sola imagen.",
  "Lo más fascinante del mapa de Senenmut es que incluye los cinco planetas visibles a simple vista: Mercurio, Venus, Marte, Júpiter y Saturno. Están representados como barcas divinas navegando por el cielo. Los egipcios notaron que estos 'astros errantes' se movían de forma diferente a las estrellas fijas y los representaron como viajeros o mensajeros de los dioses. Es la primera representación conocida de los planetas como objetos distintos a las estrellas.",
  "Los científicos modernos han usado software de simulación astronómica para calcular qué posiciones tenían los planetas en los siglos XV y XVI a.C. y compararlas con el mapa de Senenmut. Los resultados son impresionantes: las posiciones relativas de los planetas en el mapa corresponden a alineaciones reales que ocurrieron en fechas específicas. Esto sugiere que el mapa no es simbólico sino una representación astronómica real de un cielo observable.",
  "La tumba de Senenmut fue descubierta en 1925 por el arqueólogo Herbert Winlock del Museo Metropolitano de Nueva York. Estaba esculpida en la roca viva de la colina de Deir el-Bahari, escondida detrás de la tumba principal que Senenmut nunca llegó a usar. Las pinturas del techo astronómico estaban tan bien conservadas que los colores aún brillaban después de 3,500 años en la oscuridad.",
  "El mapa incluye también representaciones de los meses del año lunar egipcio. Los egipcios usaban un calendario lunar de 29 o 30 días, coordinado con el calendario solar de 365 días mediante un sistema de meses intercalares. Esta coordinación requería cálculos astronómicos regulares y estaba a cargo de sacerdotes especializados llamados 'Observadores de la Hora', que también servían para fijar las fechas de las festividades religiosas.",
  "Una de las constelaciones del mapa de Senenmut muestra a un hombre con una estrella sobre la cabeza: es posiblemente la representación más antigua del planeta Júpiter. Otro símbolo muestra lo que parece ser Venus en su fase de lucero matutino. La identificación precisa de todos los símbolos del mapa sigue siendo un área activa de investigación, con nuevas interpretaciones publicadas regularmente en revistas científicas.",
  "Senenmut no era solo un arquitecto; era un hombre de conocimiento universal. Las inscripciones en su tumba lo describen como maestro de todas las ciencias y artes conocidas. En el Antiguo Egipto, no existía separación entre disciplinas: el mismo hombre que diseñaba templos también calculaba posiciones estelares, supervisaba el tejido de telas de lino, coordinaba expediciones comerciales y escribía poesía. Era el 'hombre del Renacimiento' de su época.",
  "La relación entre Senenmut y la reina Hatshepsut es uno de los grandes misterios de la historia egipcia. Algunos historiadores creen que eran amantes; otros piensan que era una relación estrictamente profesional. Lo cierto es que Hatshepsut le dio un poder sin precedentes: él fue el único no-real en la historia egipcia en tener su tumba en el Valle de los Reyes, lugar reservado exclusivamente para faraones.",
  "El techo de la tumba de Senenmut influyó en mapas astronómicos posteriores. El famoso 'Techo Astronómico de Seti I', pintado 200 años después en el Valle de los Reyes, es claramente una versión expandida y refinada del mapa de Senenmut. Esta transmisión de conocimiento astronómico de una generación a la siguiente, con cada nueva versión más completa que la anterior, es exactamente como avanza la ciencia.",
  "Los mapas celestes del Antiguo Egipto no eran solo utilitarios; eran también obras de arte de extraordinaria belleza. Los artistas usaban pigmentos minerales de gran calidad: lapislázuli molido para el azul profundo del cielo nocturno, ocre para el amarillo dorado de las estrellas, carbón vegetal para el negro del espacio. Estos colores naturales se han conservado durante milenios porque los pigmentos minerales son químicamente estables.",
  "La orientación de la tumba de Senenmut también tiene significado astronómico. La entrada está orientada de tal forma que, en ciertos días del año, la luz del Sol penetra hasta las pinturas del techo interior, iluminando momentáneamente el mapa celeste. Este efecto de iluminación periódica es deliberado: los arquitectos egipcios calculaban cuidadosamente la orientación solar de cada construcción importante.",
  "Hoy, el techo astronómico de Senenmut está siendo documentado con tecnología de última generación. Equipos de investigadores usan fotogrametría de alta resolución, escaneo laser 3D y análisis multiespectrales para capturar todos los detalles de la pintura, incluyendo capas de pigmento que son invisibles a simple vista. Esta documentación digital garantiza que, aunque la pintura original se deteriore, el conocimiento que contiene estará preservado para siempre.",
  "El gran mensaje del mapa de Senenmut es que los humanos siempre hemos querido representar y entender el universo que nos rodea. Desde las primeras pinturas en cuevas hasta los mapas estelares digitales del siglo XXI, pasando por los techos pintados de Senenmut, la curiosidad humana por el cosmos ha sido constante. Los egipcios nos dejaron un mensaje: mira hacia arriba, aprende los patrones del cielo, y úsalos para vivir mejor."
];

const egypt_m6_quiz = [
  { "q": "¿Quién era Senenmut?", "options": ["Un faraón guerrero", "El arquitecto favorito de Hatshepsut", "Un dios del sol", "Un esclavo famoso"], "a": 1 },
  { "q": "¿Qué había pintado en el techo de su tumba?", "options": ["Mapas de tesoros", "El mapa celeste más antiguo conocido", "Escenas de batalla", "Recetas de momificación"], "a": 1 },
  { "q": "¿Cuántos planetas incluye el mapa de Senenmut?", "options": ["3", "8", "5", "12"], "a": 2 },
  { "q": "¿Cuándo fue descubierta la tumba de Senenmut?", "options": ["1800", "1925", "2001", "1066"], "a": 1 },
  { "q": "¿Por qué los planetas se representaban como barcas divinas?", "options": ["Porque los egipcios amaban el mar", "Porque se movían diferente a las estrellas fijas", "Porque eran muy brillantes", "Porque eran rojos como el fuego"], "a": 1 }
];

// ============================================================
// egypt_m7 — Telescopios de Piedra
// ============================================================
const egypt_m7_paragraphs = [
  "¡Activa los sistemas de observación avanzada, cadete! Hoy vamos a descubrir algo que desafía lo que creías saber sobre los telescopios. La mayoría de las personas cree que los telescopios fueron inventados en 1609 por Galileo Galilei en Italia. ¡Pero los egipcios construyeron 'telescopios de piedra' 4,000 años antes! No tenían lentes de vidrio, pero usaban la geometría de sus edificios para hacer exactamente lo mismo que un telescopio moderno.",
  "Un telescopio funciona colimando la luz: estrecha el campo visual para que puedas ver un punto del cielo con mucho más detalle que a simple vista. Los largos corredores angostos de los templos egipcios hacen exactamente eso. Cuando miras hacia el cielo desde el fondo oscuro de un corredor de 50 metros de largo y 2 metros de ancho, tu ojo puede detectar estrellas que normalmente serían invisibles durante el día, o ver el cielo con mucha mayor claridad.",
  "El templo de Amón-Ra en Karnak tiene un corredor principal de más de 50 metros que apunta directamente hacia el punto del horizonte donde sale el Sol en el solsticio de verano. En ese día específico, los rayos del sol del amanecer viajan por todo el corredor y van a iluminar directamente el santuario interior del templo, donde estaba la estatua del dios. Este efecto de 'láser solar' era completamente deliberado y requería cálculos astronómicos precisos.",
  "El templo de Abu Simbel, mandado construir por Ramsés II hace 3,200 años, tiene un efecto similar pero aún más espectacular. Dos veces al año, el 22 de febrero y el 22 de octubre (que probablemente eran el cumpleaños y el día de coronación de Ramsés II), los primeros rayos del sol naciente penetran 65 metros dentro de la montaña de roca y van a iluminar directamente las estatuas de Ramsés II y los dioses Ra y Amón en el santuario interior.",
  "La precisión de este fenómeno es asombrosa. Solo hay un margen de unos 20 minutos por año en que la luz penetra exactamente de esa manera. En el otro lado del año (el solsticio de invierno y el equinoccio de verano), la luz no entra. Los ingenieros de Ramsés II calcularon el ángulo de entrada del Sol en el horizonte para esas fechas específicas y diseñaron el corredor con ese ángulo exacto, excavando la roca de la montaña con milimétrica precisión.",
  "Estos 'telescopios de piedra' también funcionaban para observar estrellas. En la oscuridad de una noche sin Luna, si te metes al fondo de un corredor largo y estrecho de un templo, el campo visual queda restringido a un pequeño parche del cielo. El contraste entre el cielo oscuro y el corredor completamente negro aumenta tu sensibilidad a la luz de las estrellas, permitiéndote ver objetos más tenues. Los sacerdotes-astrónomos aprendieron a posicionarse exactamente donde debían estar para observar una estrella específica.",
  "El pozo vertical del interior de la Gran Pirámide de Guiza también funciona como un telescopio. El 'Pozo del Constructor', un conducto vertical de unos 60 metros de altura y 1 metro de ancho, permite observar el cielo directamente sobre la pirámide. Desde el fondo del pozo, incluso durante el día, se pueden ver estrellas brillantes. Los sacerdotes usaban este efecto para determinar el momento exacto del tránsito de ciertas estrellas por el meridiano.",
  "Los egipcios también usaban el agua como espejo de observación. Llenaban cuencos de piedra pulida con agua o mercurio líquido (que se encontraba naturalmente en algunos minerales del desierto) para crear superficies perfectamente horizontales y reflectantes. Al mirar el reflejo del cielo en el agua, podían medir los ángulos de las estrellas sobre el horizonte con mayor precisión que mirándolas directamente, porque el reflejo elimina el parpadeo causado por la atmósfera.",
  "El instrumento astronómico más simple que usaban los egipcios se llamaba 'merkhet' (que significa 'instrumento de conocimiento'). Era esencialmente una plomada: una cuerda con un peso en la punta que siempre cuelga perfectamente vertical por la fuerza de gravedad. Alineando dos merkhets en línea con una estrella, los astrónomos podían determinar el meridiano exacto (la línea norte-sur) con una precisión de fracción de grado.",
  "El 'bay' era otro instrumento egipcio: una palma de palmera con un ranura en V en la parte superior. El astrónomo miraba a través de la ranura hacia una plomada sostenida por un asistente, alineando así su línea de visión con el Norte o con una dirección estelar específica. Usando bay y merkhet juntos, dos personas podían medir el azimut (posición horizontal) de cualquier estrella con notable precisión.",
  "Los pozos de observación astronómica del desierto occidental del Sahara, cerca de las antiguas ciudades mineras, eran utilizados por los astrónomos itinerantes que viajaban para hacer observaciones en lugares con horizontes más despejados. Estos astrónomos viajeros eran como los científicos modernos que van a los desiertos de Chile o a la Antártida para instalar telescopios donde la atmósfera es más transparente y el cielo más oscuro.",
  "La precisión que los egipcios lograban con estos instrumentos primitivos era sorprendente. Podían medir la posición de una estrella en el cielo con un error de menos de un grado. Para comparar: el diámetro de la Luna llena en el cielo es de apenas medio grado. Los mejores astrónomos egipcios podían apuntar a un punto del cielo tan pequeño como dos veces el tamaño aparente de la Luna, usando solo sus ojos, una cuerda y un palo.",
  "La astronomía egipcia no existía de forma aislada. Los comerciantes fenicios llevaron conocimientos astronómicos egipcios al Mediterráneo. Los griegos (como Tales de Mileto, Pitágoras y luego Platón) estudiaron en escuelas sacerdotales egipcias y llevaron ese conocimiento de vuelta a Grecia. Alejandro Magno conquistó Egipto en el 332 a.C. y fundó Alejandría, donde la fusión del pensamiento egipcio, griego y babilónico daría lugar a la astronomía científica de Ptolomeo.",
  "La herencia de los 'telescopios de piedra' egipcios llegó hasta la arquitectura religiosa medieval europea. Las catedrales góticas tienen rosetones (ventanas circulares) orientados astronómicamente, y sus naves largas actúan como los corredores egipcios para iluminar el altar en fechas religiosas específicas. Los constructores medievales, consciente o inconscientemente, heredaron la tradición egipcia de construir edificios que dialogaran con el cosmos.",
  "Así que cuando pases por delante de una iglesia y veas cómo la luz entra por sus ventanas de una manera especial, recuerda: estás viendo una tradición que comenzó en Egipto hace 5,000 años, cuando unos sacerdotes-astrónomos aprendieron a usar la piedra, la sombra y la luz del sol como instrumentos de precisión para leer el cielo. Los primeros telescopios no tenían lentes; tenían corredores de piedra y paciencia infinita."
];

const egypt_m7_quiz = [
  { "q": "¿Cómo funcionaban los 'telescopios de piedra' egipcios?", "options": ["Con lentes de cristal", "Usando corredores largos y angostos que colimaban la luz", "Con espejos de bronce", "Con agua salada"], "a": 1 },
  { "q": "¿Qué efecto especial tiene el templo de Abu Simbel dos veces al año?", "options": ["Los muros se vuelven transparentes", "La luz del sol ilumina directamente las estatuas del santuario", "El techo desaparece", "El Nilo entra al templo"], "a": 1 },
  { "q": "¿Cómo se llamaba el instrumento de plomada egipcio?", "options": ["Bay", "Merkhet", "Senet", "Sekh"], "a": 1 },
  { "q": "¿Qué lograban ver los sacerdotes desde el fondo de un pozo oscuro durante el día?", "options": ["Faraones del pasado", "Estrellas brillantes", "El reflejo del Nilo", "Las pirámides de adentro"], "a": 1 },
  { "q": "¿Dónde se construyó la gran biblioteca que fusionó el saber egipcio con el griego?", "options": ["Tebas", "Alejandría", "Menfis", "Karnak"], "a": 1 }
];

// Apply all patches
src = replaceSection(src, 'egypt_m3', egypt_m3_paragraphs, egypt_m3_quiz);
src = replaceSection(src, 'egypt_m4', egypt_m4_paragraphs, egypt_m4_quiz);
src = replaceSection(src, 'egypt_m5', egypt_m5_paragraphs, egypt_m5_quiz);
src = replaceSection(src, 'egypt_m6', egypt_m6_paragraphs, egypt_m6_quiz);
src = replaceSection(src, 'egypt_m7', egypt_m7_paragraphs, egypt_m7_quiz);

fs.writeFileSync(FILE, src, 'utf8');
console.log('Done writing file.');
