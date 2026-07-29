'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya E-Group themed) ────────────────────────────
function DecoEGroup({ size = 70, color = '#A1887F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="25" width="15" height="15" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <rect x="40" y="15" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="40" y="30" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="40" y="45" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="25" y1="32.5" x2="40" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <line x1="25" y1="32.5" x2="40" y2="35" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <line x1="25" y1="32.5" x2="40" y2="50" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}

function DecoSunrise({ size = 70, color = '#FF8F00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 40 Q 30 20 50 40" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="35" r="8" fill={color} opacity="0.6" />
      {[0, 30, 60, 90, 120, 150, 180].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 12 * Math.cos(rad)} y1={35 - 12 * Math.sin(rad)} x2={30 + 18 * Math.cos(rad)} y2={35 - 18 * Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.7" />;
      })}
      <line x1="5" y1="40" x2="55" y2="40" stroke={color} strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function DecoThreeTemples({ size = 70, color = '#5D4037', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 15 45 L 20 30 L 25 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 28 45 L 33 25 L 38 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 41 45 L 46 30 L 51 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <line x1="10" y1="45" x2="55" y2="45" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="25" r="2" fill={color} />
      <circle cx="33" cy="20" r="2" fill={color} />
      <circle cx="46" cy="25" r="2" fill={color} />
    </svg>
  );
}

function DecoPyramid({ size = 70, color = '#2E7D32', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 30 15 L 10 45 L 50 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 25 22 L 35 22" stroke={color} strokeWidth="1.5" />
      <path d="M 20 30 L 40 30" stroke={color} strokeWidth="1.5" />
      <path d="M 15 37 L 45 37" stroke={color} strokeWidth="1.5" />
      <rect x="27" y="10" width="6" height="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoCompass({ size = 70, color = '#039BE5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      <path d="M 30 12 L 34 30 L 30 48 L 26 30 Z" fill={color} opacity="0.5" />
      <path d="M 12 30 L 30 26 L 48 30 L 30 34 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="3" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'uaxactun-sitio': [DecoPyramid, DecoCompass, DecoEGroup],
  'grupo-e-original': [DecoEGroup, DecoSunrise, DecoThreeTemples],
  'tres-templos': [DecoThreeTemples, DecoSunrise, DecoPyramid],
  'funcionamiento-solar': [DecoSunrise, DecoCompass, DecoEGroup],
  'grupos-e-mundo-maya': [DecoCompass, DecoPyramid, DecoThreeTemples],
  'ceibal-mas-antiguo': [DecoPyramid, DecoEGroup, DecoSunrise],
  'legado-arquitectonico': [DecoThreeTemples, DecoCompass, DecoEGroup],
};

const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Chase, A.F. & Chase, D.Z. (1995). "External Impetus, Internal Synthesis, and Standardization: E Group Assemblages", Acta Mesoamericana, 8',
  'Inomata, T. et al. (2013). "Early Ceremonial Constructions at Ceibal, Guatemala", Science, 340',
  'Aimers, J.J. & Rice, P.M. (2006). "Astronomy, Ritual, and the Interpretation of Maya E-Group Architectural Assemblages", Ancient Mesoamerica, 17',
  'Šprajc, I. (2001). Orientaciones Astronómicas en la Arquitectura Prehispánica, INAH',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'uaxactun-sitio',
    title: 'El Sitio: Uaxactún',
    color: '#A1887F',
    btnImage: '/assets/maya/infographic_m13/btn_uaxactun-sitio.jpg',
    image: '/assets/maya/infographic_m13/hero_uaxactun-sitio.jpg',
    content: [
      'Imagina una ciudad antigua oculta bajo el espeso verde de la selva tropical. Uaxactún, ubicada en el norte del departamento de Petén en Guatemala, es uno de los asentamientos más venerables y antiguos de la civilización maya. Sus constructores comenzaron a levantar edificios impresionantes desde el período Preclásico (alrededor del año 900 antes de Cristo). Es como pensar en la fundación de una gran capital moderna, pero miles de años atrás, cuando los constructores usaban herramientas de piedra y una sabiduría increíble para diseñar su entorno.',
      "El nombre de la ciudad tiene una historia fascinante que parece sacada de un cuento de aventuras arqueológicas. Fue bautizada en la década de 1920 por el famoso investigador Sylvanus Morley. Al encontrar una estela de piedra muy antigua que marcaba el ciclo de tiempo maya conocido como el 'Baktún 8', decidió combinar la palabra maya para el número ocho (Uaxac) con la palabra para piedra (Tún). Así nació el nombre 'Ocho Piedras'. Su nombre original antiguo podría haber sido Siaan K\'aan, que significa poéticamente 'Nacida del Cielo'.",
      'Durante siglos, Uaxactún fue un reino poderoso que competía de igual a igual con su imponente y famoso vecino: la gran ciudad de Tikal, que está apenas a 23 kilómetros al sur (lo que sería un día de caminata por la selva). Imagina dos grandes equipos deportivos rivales de la misma región compitiendo por ser el mejor. En el siglo IV, esta rivalidad culminó en un conflicto histórico liderado por el gobernante de Tikal con ayuda externa, lo que marcó un antes y un después en la política maya de las tierras bajas.',
      'Sin embargo, Uaxactún no solo fue famosa por sus guerras o su poder político. Su mayor tesoro fue el conocimiento. Sus plazas y edificios no estaban puestos al azar. Al igual que nosotros organizamos nuestra habitación para que entre mejor la luz por la ventana o ponemos el escritorio donde no haya ruido, los arquitectos de Uaxactún acomodaron gigantescos monumentos de piedra para interactuar de forma perfecta con el sol, las estrellas y el paso de las estaciones. Eran maestros del espacio y el tiempo.',
      'El mayor orgullo de Uaxactún fue la creación de un tipo especial de conjunto de edificios que hoy asombra a científicos de todo el planeta. Un verdadero laboratorio astronómico hecho de estuco y piedra caliza. Este complejo permitía a los sacerdotes y sabios mirar al horizonte para saber con precisión milimétrica cuándo sembrar, cuándo cosechar y cuándo realizar grandes festivales. Un avance tecnológico monumental que se convertiría en un molde copiado por cientos de ciudades.',
    ],
    expandables: [
      {
        label: '¿Sabías que...?',
        icon: 'zap',
        text: 'La ciudad de Uaxactún fue un lugar tan adelantado a su tiempo que, cuando los arqueólogos empezaron a investigar, descubrieron aquí una de las primeras pinturas al fresco del mundo maya, mostrando escenas cortesanas llenas de vida, así como la primera arquitectura de gran tamaño que probaba que los mayas preclásicos eran arquitectos geniales.',
      },
      {
        label: 'Dato Astronómico',
        icon: 'atom',
        text: 'A diferencia de los observatorios modernos que tienen cúpulas y telescopios gigantes de metal y cristal apuntando al cielo nocturno, los observatorios mayas como los de Uaxactún miraban el horizonte al amanecer o al atardecer para medir los cambios de posición de los astros a simple vista a lo largo del año. ¡Pura geometría y paciencia!',
      },
    ],
    fact: 'El asentamiento fue tan longevo y estable que las evidencias muestran ocupación continua desde el año 900 a.C. hasta cerca del 900 d.C. Es decir, casi 2000 años de existencia ininterrumpida. Si comparamos, muchas de las ciudades modernas o países de hoy apenas tienen unos cuantos cientos de años de haber sido fundados. ¡Uaxactún fue verdaderamente eterna!',
  },
  {
    id: 'grupo-e-original',
    title: 'El Grupo E Original',
    color: '#2E7D32',
    btnImage: '/assets/maya/infographic_m13/btn_grupo-e-original.jpg',
    image: '/assets/maya/infographic_m13/hero_grupo-e-original.jpg',
    content: [
      'Todo comenzó con un mapa y una letra del alfabeto. En el año 1924, el explorador y arqueólogo danés Frans Blom, al servicio del Instituto Carnegie de Washington, estaba cartografiando las ruinas de Uaxactún. Para mantener el orden, decidió nombrar los distintos conjuntos de edificios con letras: Grupo A, Grupo B, Grupo C, y así sucesivamente. Al llegar a una plaza particular rodeada de cuatro estructuras principales, la bautizó sencillamente como el "Grupo E".',
      'Pero el Grupo E no era solo otro conjunto de piedras amontonadas por el tiempo. Al mirar con cuidado cómo estaban alineados estos edificios, Blom notó algo extraordinario. Había una pirámide grande del lado oeste (donde se pone el sol) y una plataforma alargada del lado este (por donde sale el sol) que sostenía tres templos más pequeños. Blom y otros científicos pronto se dieron cuenta de que las posiciones de los edificios marcaban exactamente los puntos de salida del sol en los solsticios y equinoccios.',
      'Imagina tener un gigantesco reloj solar del tamaño de varias canchas de fútbol. Así de asombroso es el Grupo E de Uaxactún. Para los mayas, no era necesario inventar un telescopio de lentes; su telescopio era la arquitectura misma. El diseño era tan ingenioso y perfecto que los arqueólogos modernos quedaron maravillados por la exactitud de los ángulos y la relación visual entre la pirámide de observación y los templos orientales.',
      'El impacto de este descubrimiento fue tan masivo en el mundo científico que el nombre "Grupo E" pasó de ser una simple etiqueta en un mapa a convertirse en un término oficial en la arqueología mundial. Hoy en día, si un experto encuentra en cualquier lugar de Mesoamérica un arreglo arquitectónico similar con una pirámide al oeste y una plataforma alargada al este, lo clasifica automáticamente como un "Complejo Tipo Grupo E". ¡El original de Uaxactún le dio su nombre a todo un modelo científico!',
      'Esta revelación cambió para siempre nuestra percepción de los antiguos mayas. Antes se pensaba que sus ciudades crecían de forma desordenada, como un bosque salvaje. El Grupo E demostró que los centros urbanos estaban planificados matemáticamente y orientados cósmicamente desde las primeras piedras puestas en el suelo. Los mayas no solo construían edificios; construían gigantescos instrumentos astronómicos habitables.',
    ],
    expandables: [
      {
        label: 'En la Arqueología',
        icon: 'clock',
        text: 'Frans Blom, el descubridor del alineamiento solar en el Grupo E, también fue fundamental en la exploración de Palenque y otras zonas de Chiapas. Junto a Oliver La Farge, realizó expediciones que abrieron los ojos del mundo a las maravillas del mundo maya ocultas en la profundidad de la selva.',
      },
      {
        label: 'Mecánica del Observatorio',
        icon: 'zap',
        text: 'La maravilla del Grupo E es que transforma el movimiento de la Tierra alrededor del Sol en un movimiento visible del Sol a lo largo del horizonte oriental de la ciudad. Para alguien parado en la pirámide oeste, el sol parece "moverse" lentamente de norte a sur y de regreso, usando los templos esteños como reglas de medición.',
      },
    ],
    fact: 'El Grupo E de Uaxactún no solo servía como observatorio, sino que era el centro de gigantescas ceremonias públicas. A diferencia de un astrónomo moderno trabajando solo en un cuarto oscuro, los sacerdotes mayas observaban el sol naciente frente a miles de personas que abarrotaban la plaza, uniendo en un solo instante la ciencia exacta, la religión y el teatro político.',
  },
  {
    id: 'tres-templos',
    title: 'Los Tres Templos',
    color: '#F8BBD0',
    btnImage: '/assets/maya/infographic_m13/btn_tres-templos.jpg',
    image: '/assets/maya/infographic_m13/hero_tres-templos.jpg',
    content: [
      'Al pararte en la Plaza del Grupo E, miras hacia el este y te encuentras con una larga plataforma elevada que soporta tres construcciones separadas. Estos son los famosos "Tres Templos" (conocidos en los mapas como Estructuras E-I, E-II y E-III). Imagina que son como las marcas de las horas en el borde de un reloj analógico inmenso. No fueron puestos ahí por estética, sino como precisas miras astronómicas de piedra sólida.',
      'El templo situado en el extremo norte (hacia tu izquierda si miras al este) es el marcador del verano. Durante el Solsticio de Verano, el 21 de junio, el día más largo del año en el hemisferio norte, un sacerdote parado en las escalinatas de la pirámide oeste vería el sol salir exactamente por detrás de este templo norte. Es como si el sol naciera coronando este edificio para anunciar que el ciclo cálido y lluvioso había llegado a su punto máximo.',
      'El templo del centro es quizá el más especial. Marca los días de equilibrio cósmico absoluto: los Equinoccios (alrededor del 21 de marzo y 21 de septiembre). En estos dos días, el día y la noche duran exactamente lo mismo. Visto desde el punto de observación occidental, el sol despunta majestuosamente justo por detrás de la parte central del templo de en medio. El universo se encuentra en balance, y la arquitectura lo testifica.',
      'Finalmente, el templo situado en el extremo sur marca el Solsticio de Invierno, alrededor del 21 de diciembre. Es el día con menos horas de luz solar del año. En esa fecha clave, el sol asoma por detrás del templo sur. A partir de este momento, los días comenzarán lentamente a ser más largos otra vez, marcando el renacimiento de la luz y el comienzo del viaje del sol de regreso hacia el norte.',
      'Al colocar estos tres templos, los constructores mayas crearon un marco visual que encuadraba el recorrido anual del sol. Piensa en el sol como un péndulo de luz que se mueve lentamente de un templo a otro a lo largo de 365 días. Esta maravillosa máquina del tiempo inamovible no tiene engranajes ni baterías; su motor es la rotación y traslación del planeta Tierra, y su pantalla es el horizonte oriental.',
    ],
    expandables: [
      {
        label: 'Geometría Exacta',
        icon: 'atom',
        text: 'Para que los tres templos funcionen correctamente, la distancia entre ellos y la pirámide de observación oeste debe ser calculada con matemáticas complejas. Los arquitectos mayas tenían que conocer la amplitud angular del movimiento solar (alrededor de 49 grados en esa latitud) y traducirla a la longitud de la plaza para espaciar los templos correctamente.',
      },
      {
        label: '¿Sabías que...?',
        icon: 'clock',
        text: 'Aunque hoy los vemos como ruinas grises y de piedra expuesta, en su época de gloria estos templos estaban cubiertos de una gruesa capa de estuco, que era yeso liso y reluciente, y estaban pintados de colores vibrantes, especialmente rojo carmesí. Imagina ver salir el sol brillante coronando un edificio rojo fuego en medio del verdor selvático.',
      },
    ],
    fact: 'El diseño tripartito (tres templos) se volvió tan sagrado para los mayas que no solo lo usaron para grupos astronómicos E, sino que esta simetría influyó en otros edificios rituales y míticos. En su religión, la creación del mundo moderno fue marcada por los dioses al colocar tres piedras fundamentales en el cielo cósmico, conocidas como el Fogón de la Creación. Los tres templos podrían ser una representación terrenal de este mito.',
  },
  {
    id: 'funcionamiento-solar',
    title: 'Cómo Funciona',
    color: '#FF8F00',
    btnImage: '/assets/maya/infographic_m13/btn_funcionamiento-solar.jpg',
    image: '/assets/maya/infographic_m13/hero_funcionamiento-solar.jpg',
    content: [
      'Para entender cómo funciona verdaderamente esta genialidad arquitectónica, ponte en los zapatos de un sacerdote o sabio maya hace dos mil años. Tu puesto de trabajo está en la Estructura E-VII-sub, una pirámide hermosamente decorada con mascarones de estuco, ubicada en el lado oeste de la plaza. Te levantas en la madrugada profunda y subes las escalinatas oscuras antes de que el sol acaricie el cielo.',
      'Llegas al punto de observación superior y te volteas para mirar al este, justo hacia la plataforma alargada que sostiene los tres templos frontales. La plaza entre la pirámide y los templos está en penumbras. Y entonces ocurre la magia científica: empiezas a llevar un registro sistemático de exactamente en qué punto de los edificios amanece el sol cada día a lo largo de muchas semanas y meses. Eres un relojero del sol.',
      'A medida que pasa el año, el punto exacto de la salida del sol se desplaza por el horizonte, como si estuviera caminando por encima de la plataforma de los templos. En junio, el amanecer ocurre muy a la izquierda (templo norte). En los meses siguientes, cada mañana el sol amanece un poquito más a la derecha. En septiembre amanece detrás del templo del medio, y para diciembre, el amanecer llega hasta el extremo derecho (templo sur).',
      'Este viaje de ida y vuelta del sol por el horizonte marca lo que llamamos el ciclo tropical o año solar. Con las esquinas y los centros de los templos orientales, el Grupo E podía marcar fechas importantísimas para la agricultura. Imagínate este edificio como una gran alarma silenciosa que le decía al pueblo de Uaxactún: "¡Prepárense, las lluvias fuertes llegarán en 20 días, es hora de limpiar los campos y empezar a sembrar el maíz y el frijol!".',
      'Lo que hace fascinante al sistema es que dependía del punto de vista. Para que todo funcionara perfecto, el observador DEBÍA estar parado exactamente en el eje de la pirámide oeste. Si te movías cinco metros al norte o al sur, las mediciones se arruinaban. La arquitectura guiaba físicamente a los astrónomos al punto exacto donde la ilusión geométrica del movimiento planetario cuadraba perfectamente con las piedras milenarias.',
    ],
    expandables: [
      {
        label: 'Calendario Agrícola',
        icon: 'clock',
        text: 'La principal razón práctica para gastar miles de horas de trabajo construyendo el Grupo E era asegurar la supervivencia alimentaria. En regiones donde no hay estaciones tan marcadas por la nieve como en Europa, saber el momento exacto para sembrar antes del inicio de la temporada de huracanes y lluvias torrenciales marcaba la diferencia entre la abundancia y la hambruna.',
      },
      {
        label: 'Ilusión de Movimiento',
        icon: 'zap',
        text: 'Aunque decimos que "el sol se mueve por el horizonte", la ciencia nos dice que en realidad es la Tierra la que se inclina y orbita alrededor del sol a lo largo de un año. Los mayas medían con maestría el resultado visible de esta mecánica celeste, sin necesitar naves espaciales para saber que los ciclos celestes seguían patrones estrictamente matemáticos.',
      },
    ],
    fact: 'Estudios recientes liderados por astrónomos y arqueólogos como Ivan Šprajc han demostrado que muchos Grupos E no solo marcaban los solsticios y equinoccios matemáticos exactos (21 de marzo, 21 de junio, etc.), sino que también marcaban "fechas clave" en cuartos del año agrario, correspondientes al 20 de febrero o el 30 de abril, días fundamentales para los ciclos tradicionales de lluvia en la región de Petén.',
  },
  {
    id: 'grupos-e-mundo-maya',
    title: 'Grupos E en el Mundo Maya',
    color: '#039BE5',
    btnImage: '/assets/maya/infographic_m13/btn_grupos-e-mundo-maya.jpg',
    image: '/assets/maya/infographic_m13/hero_grupos-e-mundo-maya.jpg',
    content: [
      'Si inventaras la mejor y más increíble calculadora del mundo, pronto otros empezarían a hacer sus propias versiones. Eso es exactamente lo que ocurrió con los Grupos E de los mayas. Lo que comenzó como un modelo brillante en unas cuantas ciudades tempranas, se esparció como pólvora intelectual por todas las densas junglas de Mesoamérica. Los arqueólogos han descubierto más de 100 de estos complejos astronómicos estandarizados a lo largo de la historia de esta civilización.',
      'Puedes encontrar ruinas de Grupos E desde las cálidas selvas del estado de Chiapas en México, cruzando por toda Guatemala, y llegando hasta los sitios arqueológicos ocultos de Belice. Todos mantienen la misma receta básica: una estructura de observación al lado poniente y una plataforma extendida al oriente. Es como si el diseño del Grupo E fuera el primer "código abierto" o franquicia tecnológica exitosa de toda la América prehispánica.',
      'Curiosamente, con el paso de los siglos y el crecimiento de las dinastías mayas en el Período Clásico, el significado del Grupo E evolucionó. En ciudades enormes como Tikal o Caracol, construyeron variantes de Grupos E que ya no apuntaban perfectamente a los solsticios. ¿Por qué harían una calculadora que no sumara bien? Los arqueólogos creen que, con el tiempo, el diseño se volvió sagrado de forma simbólica.',
      'Es decir, los Grupos E tardíos pasaron de ser observatorios científicos puros a convertirse en gigantescos escenarios para rituales políticos y religiosos. Se usaban para conectar a los reyes vivos con el poder mágico de la salida del sol, afirmando que los gobernantes podían controlar el tiempo mismo. Imagina usar un viejo reloj de bolsillo no para ver la hora, sino como un símbolo de la autoridad heredada de tu abuelo; así usaban los reyes clásicos el diseño del Grupo E.',
      'El hecho de que tantas ciudades copiaran este modelo demuestra la tremenda interconexión que tenían los antiguos mayas. No eran poblados aislados y solitarios. Eran una red masiva de intelectuales, arquitectos y nobles que compartían planos maestros de urbanismo a través de cientos de kilómetros sin usar caballos, ruedas ni internet. La estandarización de los Grupos E prueba una increíble unidad cultural que abrazaba a millones de personas.',
    ],
    expandables: [
      {
        label: 'Sitios Emblemáticos',
        icon: 'zap',
        text: 'Además de Uaxactún y Ceibal, se han encontrado complejos de Grupo E impresionantes en grandes ciudades como Nakbé, El Mirador, Caracol, Cenote, y Yaxhá. Muchos de estos gigantes siguen sepultados bajo toneladas de raíces de la selva y tierra, esperando que la tecnología láser LIDAR moderna los saque a la luz desde el espacio.',
      },
      {
        label: '¿Sabías que...?',
        icon: 'atom',
        text: 'La estandarización en la arquitectura antigua no es común a menos que exista un fuerte sistema de creencias compartidas o un gobierno central que lo exija. El hecho de que cientos de reinos mayas independientes, que incluso se hacían la guerra entre ellos, acordaran construir los mismos complejos astronómicos es uno de los mayores misterios y maravillas de la arqueología.',
      },
    ],
    fact: 'Algunos de los descubrimientos modernos más sorprendentes se han dado en un sitio monumental recién descubierto en Tabasco, México, llamado Aguada Fénix. Datando de antes del 1000 a.C., presenta una plataforma artificial masiva orientada en el típico patrón este-oeste que antecede a los Grupos E y demuestra que la obsesión con las alineaciones solares y los espacios rituales es todavía más antigua de lo que creíamos.',
  },
  {
    id: 'ceibal-mas-antiguo',
    title: 'Ceibal: El Más Antiguo',
    color: '#5D4037',
    btnImage: '/assets/maya/infographic_m13/btn_ceibal-mas-antiguo.jpg',
    image: '/assets/maya/infographic_m13/hero_ceibal-mas-antiguo.jpg',
    content: [
      'Durante muchas décadas, todos los arqueólogos pensaban que Uaxactún era la madre de todos los Grupos E, el lugar de origen del invento. Sin embargo, la arqueología moderna y las fechas de radiocarbono llegaron a cambiar el libro de historia. Excavaciones recientes en la majestuosa ciudad de Ceibal, cerca del río La Pasión en Guatemala, descubrieron algo que dejó sin palabras al mundo académico internacional en el año 2013.',
      'Los investigadores, cavando profundo debajo de las pirámides más recientes de Ceibal, encontraron evidencias de un pequeño complejo estilo Grupo E que data del año 1000 a 950 antes de Cristo. ¡Esto lo hace 200 años más antiguo que el famoso grupo de Uaxactún, e incluso más antiguo que centros olmecas como La Venta! Ceibal nos arrebató el aliento y reclamó la corona como la cuna conocida del observatorio solar.',
      'Imagínate viajar a Ceibal en el año 950 a.C. No verías imponentes pirámides de piedra caliza y estuco, sino montículos humildes hechos con capas de tierra apisonada y arcilla, rematados con templos de madera y techos de palmas de guano. Y a pesar de que los materiales eran sencillos y humildes, la matemática astronómica de las alineaciones ya estaba allí. Las raíces de la ciencia maya comenzaron literalmente en el lodo y la tierra cruda.',
      'Esto significa que la observación rigurosa del sol y la creación de una arquitectura estandarizada comenzó mucho antes de que los mayas empezaran a construir sus clásicas bóvedas de piedra o a tallar estelas gigantes con reyes y guerreros. La planificación de los cielos y los astros fue el primer gran proyecto comunitario de la sociedad maya, antes del arte sofisticado, antes del esplendor; el sol fue su primer maestro.',
      'El descubrimiento de Ceibal sugiere que las ideas complejas sobre astronomía y organización social en Mesoamérica no se inventaron en un solo lugar y luego se repartieron (como pensábamos de la civilización Olmeca). Más bien, hubo una red de comunidades muy antiguas interactuando, innovando juntas, experimentando y creando estos arreglos arquitectónicos en grupo. El Grupo E no fue un invento de un día, sino la obra cumbre de generaciones de mentes brillantes.',
    ],
    expandables: [
      {
        label: 'Cita en la Ciencia',
        icon: 'atom',
        text: 'La investigación en Ceibal, liderada por el prestigioso arqueólogo Takeshi Inomata de la Universidad de Arizona, fue publicada en la revista "Science". El equipo realizó docenas de pozos profundos y decenas de dataciones de radiocarbono (Carbono 14) para probar más allá de toda duda que los orígenes del ceremonialismo maya eran increíblemente tempranos.',
      },
      {
        label: 'De Tierra a Piedra',
        icon: 'clock',
        text: 'La tradición arquitectónica en lugares como Ceibal nos muestra la evolución de la tecnología constructiva de los mayas. Comenzaron construyendo sus montañas sagradas artificiales usando toneladas de tierra compactada durante siglos, para luego aprender, mil años después, a revestir edificios masivos con impresionantes bloques de piedra cortada a la medida.',
      },
    ],
    fact: 'En la plaza central temprana de Ceibal, frente a su incipiente Grupo E, los arqueólogos descubrieron hachas de jadeíta verde finamente pulidas que habían sido enterradas cuidadosamente en forma de cruz como ofrendas. El jade, más duro que el acero, tuvo que ser importado desde montañas muy lejanas en Guatemala, lo que demuestra la riqueza de este primer centro de estudios astronómicos.',
  },
  {
    id: 'legado-arquitectonico',
    title: 'El Legado de los Grupos E',
    color: '#283593',
    btnImage: '/assets/maya/infographic_m13/btn_legado-arquitectonico.jpg',
    image: '/assets/maya/infographic_m13/hero_legado-arquitectonico.jpg',
    content: [
      'Al estudiar los Grupos E como el de Uaxactún, los científicos modernos han llegado a una conclusión demoledora sobre la historia de América: los mayas no fueron solo los místicos de la selva descritos por las novelas, sino astrónomos rigurosos, sistemáticos e implacables desde sus orígenes más tempranos. Su arquitectura demuestra que poseían un pensamiento empírico ordenado que rivaliza con las matemáticas de los antiguos griegos o los sabios de Babilonia.',
      'Piénsalo de esta manera: hoy construimos aceleradores de partículas de kilómetros de diámetro y mandamos el Telescopio James Webb al vacío espacial para entender los secretos del universo. Los constructores mayas, hace 3,000 años, construyeron enormes máquinas cívicas y plazas ceremoniales en medio de la densa jungla de caobas para comprender exactamente los mismos ritmos universales de la luz y el tiempo.',
      'Su visión de la ciencia era única y hermosa porque nunca la separaron del arte, la comunidad y lo sagrado. Un Grupo E no era un edificio frío donde los científicos trabajaban a puerta cerrada. Era el corazón de la ciudad, un punto de encuentro masivo donde toda la sociedad veía materializarse la ciencia cósmica y la religión simultáneamente frente a sus propios ojos cada mañana de solsticio o equinoccio.',
      'Incluso hoy en día, las tecnologías de punta como los sensores LIDAR aéreos (láseres que penetran el dosel de la selva) siguen revelando docenas de Grupos E ocultos a plena vista bajo grandes mantos verdes. Con cada nuevo montículo desenterrado, confirmamos la tremenda importancia de este diseño y entendemos que nuestro mapa de las súper ciudades preclásicas apenas está en sus primeras etapas de dibujo.',
      'El legado del Grupo E perdurará siempre en el conocimiento humano. Nos recuerda que desde el principio de los tiempos, los seres humanos hemos levantado nuestra vista hacia las estrellas y el horizonte en un intento de medir lo infinito, de predecir el futuro de nuestras cosechas y, en última instancia, de encontrar nuestro pequeño, pero significado lugar bajo la gran bóveda del sol.',
    ],
    expandables: [
      {
        label: 'Alineaciones Complejas',
        icon: 'zap',
        text: 'Aunque empezamos llamándolos simples marcadores de solsticios y equinoccios, las últimas dos décadas de mediciones con tecnología láser (teodolitos y GPS precisos) en docenas de sitios han revelado que las alineaciones marcan también fechas críticas de la siembra y de eventos lunares complejos, demostrando una profundidad científica que sigue sorprendiéndonos.',
      },
      {
        label: '¿Sabías que...?',
        icon: 'clock',
        text: 'La inspiración de los observatorios astronómicos mayas ha trascendido siglos. Arquitectos y urbanistas contemporáneos en diversas partes de Latinoamérica a menudo integran ejes solares y alineaciones equinocciales en el diseño de nuevos parques, plazas y museos, pagando un tributo directo al ingenio mesoamericano prehispánico.',
      },
    ],
    fact: 'La gran paradoja que nos enseñan los Grupos E mayas es que para dominar la visión del cosmos estrellado, primero tuvieron que aprender a dominar la tierra sobre la cual se encontraban parados. Fueron maestros de la ingeniería, los rellenos constructivos, el uso de morteros de cal, y el cálculo de la refracción de luz; verdaderos titanes interdisciplinarios miles de años antes de que naciéramos nosotros.',
  },
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
function TemporalField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    const w = canvas.width, h = canvas.height;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '161,136,127' : '255,143,0', // earth or sunrise orange
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.08;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5 || p.x > w + 5) p.x = Math.random() * w;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ─── Maya Header ──────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,143,0,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#A1887F','#2E7D32','#F8BBD0','#FF8F00','#039BE5','#5D4037','#283593'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FF8F00" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FF8F00" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FF8F00" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#FF8F00" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,143,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,143,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,143,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FF8F00" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">UAXACTÚN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,143,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">GRUPO E: EL OBSERVATORIO SOLAR</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ───────────────────────────────────────────────────
function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(255,143,0,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: `2px solid ${node.color}`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '100px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotMaya"
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: node.color,
            boxShadow: `0 0 8px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

// ─── Expandable Section with Random Direction ────────────────────────────────
const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};

const EXPAND_ICONS = {
  clock: Clock,
  zap: Zap,
  atom: Atom,
};

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem',
      borderRadius: '14px',
      border: `1px solid ${color}25`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}08, transparent)`,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}12` }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          padding: '0.8rem 1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComp size={14} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.7 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dirVariants[dir]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{
              margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`,
              paddingLeft: '0.8rem',
            }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  
  const decoPositions = [
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(10, 12, 10, 0.92)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1rem',
        overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* ─── Two-Column Hero Section ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        {/* Left: Hero Image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
          }} />
        </div>

        {/* Right: Title + first 2 paragraphs */}
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </span>
            {node.title}
          </h3>

          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{
              margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* ─── Magazine Body ─── */}
      <div style={{
        padding: '1.5rem 2rem 2rem',
        position: 'relative',
      }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                ...pos,
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.2rem 2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div
                key={i}
                style={{
                  gridColumn: isWide ? '1 / -1' : 'auto',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? '◆' : '◇'}
                </div>
                <p style={{
                  margin: 0, fontSize: '0.95rem', lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.85)',
                }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={16} /> Profundizar en el Tema
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Highlight Fact ─── */}
        <div style={{
          marginTop: '2rem',
          background: `linear-gradient(90deg, ${node.color}20, transparent)`,
          borderLeft: `4px solid ${node.color}`,
          padding: '1.2rem 1.5rem',
          borderRadius: '0 12px 12px 0',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          position: 'relative', zIndex: 2,
        }}>
          <Star size={24} style={{ color: node.color, flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h5 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Dato Curioso
            </h5>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
              "{node.fact}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ nodes, exploredIds }) {
  const progress = (exploredIds.size / nodes.length) * 100;
  
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: '4px', background: 'rgba(255,255,255,0.1)',
      zIndex: 10,
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #FF8F00, #F8BBD0)',
          boxShadow: '0 0 10px rgba(255,143,0,0.5)',
        }}
      />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InteractiveInfographicMayaM13() {
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const containerRef = useRef(null);

  const handleNodeClick = (node) => {
    if (activeNode?.id === node.id) {
      setActiveNode(null);
    } else {
      setActiveNode(node);
      setExplored(prev => new Set(prev).add(node.id));
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div ref={containerRef} style={{
      width: '100%', maxWidth: '1000px', margin: '0 auto',
      background: '#040614', color: '#fff',
      borderRadius: '24px', overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
    }}>
      <TemporalField />
      <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={explored} />

      <div style={{ padding: '3rem 2rem 2rem', position: 'relative', zIndex: 1 }}>
        <MayaHeader />

        {/* Nodes Navigation */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '1.5rem', marginTop: '2rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              index={i}
              node={node}
              isActive={activeNode?.id === node.id}
              onClick={() => handleNodeClick(node)}
            />
          ))}
        </div>

        {/* Active Node Content */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {/* Start Prompt */}
        <AnimatePresence>
          {!activeNode && explored.size === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                textAlign: 'center', marginTop: '3rem',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <ChevronRight size={24} style={{ transform: 'rotate(90deg)', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Selecciona un nodo para explorar el observatorio
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bibliography */}
        <div style={{
          marginTop: '4rem', padding: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.2)', borderRadius: '12px',
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Fuentes de Referencia
          </h4>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
