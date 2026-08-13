'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Marine / Ocean themed) ————————————————————————
function DecoWave({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ocean waves */}
      <path d="M5 30 Q15 20 25 30 Q35 40 45 30 Q55 20 60 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M5 38 Q15 28 25 38 Q35 48 45 38 Q55 28 60 38" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M5 22 Q15 12 25 22 Q35 32 45 22 Q55 12 60 22" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Bubbles */}
      <circle cx="12" cy="48" r="2" fill={color} opacity="0.4" />
      <circle cx="30" cy="10" r="1.5" fill={color} opacity="0.3" />
      <circle cx="50" cy="50" r="1.8" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoAmmonite({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Spiral shell */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.3" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.4" opacity="0.5" />
      <circle cx="30" cy="30" r="7" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
      {/* Spiral connecting arcs */}
      <path d="M30 6 Q54 6 54 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M54 30 Q54 48 30 48" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M30 48 Q12 48 12 30" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

function DecoFossil({ size = 80, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Bone/fossil silhouette */}
      <ellipse cx="20" cy="20" rx="12" ry="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="60" cy="20" rx="12" ry="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="32" y1="20" x2="48" y2="20" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Sediment layers */}
      <line x1="5" y1="34" x2="75" y2="34" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="10" y1="38" x2="70" y2="38" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Dots like mineral inclusions */}
      <circle cx="15" cy="10" r="1" fill={color} opacity="0.4" />
      <circle cx="65" cy="12" r="1.2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoFlippers({ size = 60, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Flipper / paddle shapes */}
      <path d="M15 45 Q10 30 20 18 Q28 10 30 15 Q32 20 25 35 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      <path d="M45 45 Q50 30 40 18 Q32 10 30 15 Q28 20 35 35 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      {/* Water droplets */}
      <circle cx="10" cy="50" r="1.5" fill={color} opacity="0.4" />
      <circle cx="50" cy="50" r="1.5" fill={color} opacity="0.4" />
      <circle cx="30" cy="5" r="1" fill={color} opacity="0.3" />
      {/* Speed lines */}
      <line x1="5" y1="30" x2="12" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="48" y1="30" x2="55" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoSeaReptile({ size = 70, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Simplified marine reptile silhouette */}
      <path d="M8 30 Q12 26 20 28 Q28 25 35 28 Q40 24 48 28 Q54 30 52 32 Q48 35 40 33 Q35 36 28 33 Q20 36 14 33 Q10 34 8 30 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
      {/* Eye */}
      <circle cx="12" cy="29" r="1.5" fill={color} opacity="0.6" />
      {/* Flippers */}
      <path d="M22 33 Q24 40 20 42" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M38 33 Q40 40 36 42" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Tail fin */}
      <path d="M52 32 Q56 28 58 32 Q56 36 52 32" fill={color} opacity="0.3" />
      {/* Bubbles */}
      <circle cx="8" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="5" cy="18" r="0.8" fill={color} opacity="0.25" />
    </svg>
  );
}

function DecoPlankton({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Microscopic plankton shapes */}
      <circle cx="20" cy="20" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="20" cy="20" r="3" fill={color} opacity="0.3" />
      <line x1="20" y1="14" x2="20" y2="8" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="14" y1="20" x2="8" y2="20" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Diatom shape */}
      <ellipse cx="42" cy="38" rx="10" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="42" y1="33" x2="42" y2="43" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Small organisms */}
      <circle cx="40" cy="15" r="2" fill={color} opacity="0.25" />
      <circle cx="15" cy="45" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="50" cy="50" r="1.5" fill={color} opacity="0.2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'oceano-panthalassa': [DecoWave, DecoSeaReptile, DecoAmmonite],
  'primeros-reptiles-marinos': [DecoSeaReptile, DecoFossil, DecoWave],
  'nothosaurus-dos-mundos': [DecoFlippers, DecoWave, DecoSeaReptile],
  'evolucion-natacion': [DecoFlippers, DecoSeaReptile, DecoWave],
  'cadenas-alimentarias': [DecoPlankton, DecoAmmonite, DecoSeaReptile],
  'fosiles-bajo-mar': [DecoFossil, DecoAmmonite, DecoPlankton],
  'oceanos-mesozoico': [DecoWave, DecoFossil, DecoPlankton],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Motani, R. (2009). The Evolution of Marine Reptiles. Evolution: Education and Outreach, 2(2), 224-235',
  'Benton, M.J. (2014). Vertebrate Palaeontology (4th ed.). Wiley-Blackwell',
  'Emling, S. (2009). The Fossil Hunter: Dinosaurs, Evolution, and the Woman Whose Discoveries Changed the World. Palgrave Macmillan',
  'Kelley, N.P. & Pyenson, N.D. (2015). Evolutionary innovation and ecology in marine tetrapods from the Triassic to the Anthropocene. Science, 348(6232)',
  'Rieppel, O. (2000). Sauropterygia I: Placodontia, Pachypleurosauria, Nothosauroidea, Pistosauroidea. Handbuch der Paläoherpetologie, Part 12A. Verlag Dr. Friedrich Pfeil',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'oceano-panthalassa',
    title: 'El Océano Panthalassa',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/marinos_m1.png',
    image: '/assets/reptiles_marinos/marinos_m1.png',
    content: [
      'Hace 252 millones de años, al final del período Pérmico, la Tierra tenía un aspecto muy distinto al actual. Todos los continentes estaban unidos formando un supercontinente llamado Pangea, rodeado por un único y colosal océano conocido como Panthalassa. Este océano cubría aproximadamente el 70% de la superficie terrestre, una proporción similar a la que cubren los océanos modernos, pero concentrada en una sola masa de agua sin divisiones continentales. El nombre Panthalassa proviene del griego «pan» (todo) y «thalassa» (mar), reflejando su dominio sobre el planeta.',
      'Las condiciones en Panthalassa eran diferentes a las de los océanos actuales. La temperatura media del agua superficial se estima entre 25 y 35 grados Celsius, significativamente más cálida que los océanos modernos, cuya temperatura media superficial ronda los 17 grados. Esta diferencia de temperatura se debía a concentraciones de dióxido de carbono atmosférico que superaban las actuales en al menos cuatro veces. La salinidad también variaba: en las zonas ecuatoriales, la evaporación intensa generaba aguas con salinidad superior a 40 partes por mil, mientras que los océanos actuales promedian 35 partes por mil.',
      'El interior de Panthalassa era un ambiente hostil para la vida. Las corrientes oceánicas funcionaban de manera diferente sin continentes que las desviaran, lo que provocaba zonas extensas con muy poco oxígeno disuelto, conocidas como «zonas anóxicas». Los registros geoquímicos de rocas de este período muestran que amplias regiones del fondo oceánico carecían de oxígeno suficiente para sostener vida compleja, un fenómeno que contribuyó a la Gran Extinción del Pérmico-Triásico, que eliminó al 96% de las especies marinas.',
      'Dentro de Pangea existía un mar interior parcialmente cerrado llamado Tetis (o Tethys), ubicado entre lo que hoy son Europa, Asia y África. El mar de Tetis funcionaba como una incubadora de biodiversidad marina durante el Triásico y Jurásico: sus aguas someras, cálidas y protegidas permitieron la evolución de arrecifes de coral, moluscos diversos y los primeros reptiles marinos. La existencia de Tetis explica por qué tantos fósiles de reptiles marinos se encuentran en Europa, China y el norte de África.',
      'La ruptura de Pangea comenzó hace unos 200 millones de años, durante el Jurásico temprano, y transformó Panthalassa gradualmente en los océanos que conocemos hoy: Atlántico, Pacífico e Índico. Este proceso tomó más de 150 millones de años. A medida que los continentes se separaban, se crearon nuevas costas, plataformas continentales poco profundas y corredores oceánicos que permitieron la diversificación de la vida marina. Los reptiles marinos prosperaron durante esta fragmentación, colonizando nuevos hábitats a medida que se abrían.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El océano Panthalassa era tan grande que una corriente oceánica podía dar la vuelta al planeta sin encontrar un solo continente en su camino. Los oceanógrafos llaman a este tipo de circulación «corriente circunglobal ecuatorial», y solo existió durante el tiempo en que Pangea estaba intacta. Hoy, los continentes bloquean las corrientes ecuatoriales, forzándolas a desviarse hacia los polos y creando el sistema de corrientes oceánicas que regula el clima moderno.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los científicos reconstruyen las temperaturas de los océanos antiguos analizando isótopos de oxígeno en conchas fósiles de braquiópodos y foraminíferos. El ratio entre oxígeno-18 y oxígeno-16 en el carbonato de calcio de las conchas varía según la temperatura del agua en que se formaron. Usando este método, el geoquímico Jan Veizer y su equipo determinaron en 2000 que las temperaturas oceánicas del Pérmico tardío alcanzaban los 35°C en zonas tropicales.' },
    ],
    fact: 'La Gran Extinción del Pérmico-Triásico, hace 252 millones de años, fue el evento más catastrófico en la historia de la vida en la Tierra. Eliminó al 96% de las especies marinas y al 70% de las especies terrestres. Los científicos del MIT determinaron en 2011 que la causa principal fueron las erupciones volcánicas masivas de los Traps Siberianos, que liberaron suficiente dióxido de carbono para calentar los océanos hasta temperaturas letales (superior a 40°C en zonas tropicales) y reducir el oxígeno disuelto por debajo del umbral de supervivencia para la mayoría de los animales marinos.',
  },
  {
    id: 'primeros-reptiles-marinos',
    title: 'Los Primeros Reptiles Marinos',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/marinos_m1.png',
    image: '/assets/reptiles_marinos/marinos_m1.png',
    content: [
      'El Mesosaurus fue uno de los primeros reptiles que abandonó la tierra firme para explorar el medio acuático. Vivió durante el Pérmico temprano, hace aproximadamente 299 a 270 millones de años, mucho antes de que aparecieran los dinosaurios. Era un animal relativamente pequeño, de entre 40 centímetros y un metro de longitud, con un cuerpo alargado, cola aplanada lateralmente y extremidades con dedos probablemente unidos por membranas interdigitales. Sus dientes finos y numerosos, dispuestos en forma de peine, sugieren que se alimentaba filtrando pequeños crustáceos del agua.',
      'El Mesosaurus tiene una relevancia científica que va más allá de la paleontología marina. Sus fósiles se han encontrado exclusivamente en dos lugares del mundo: el sur de Brasil y el suroeste de África. Esta distribución fue una de las pruebas clave que Alfred Wegener utilizó en 1912 para proponer su teoría de la deriva continental. Wegener argumentó que un reptil de agua dulce no podría haber cruzado el océano Atlántico, por lo que estos dos continentes debieron estar unidos en algún momento del pasado. Hoy sabemos que Wegener tenía razón: Sudamérica y África formaban parte de Gondwana.',
      'Después de la Gran Extinción del Pérmico, los océanos quedaron casi vacíos de vida, y eso abrió oportunidades para nuevos colonizadores. Durante los primeros 5 millones de años del Triásico, varios linajes de reptiles terrestres comenzaron a explorar el medio marino. Los Ichthyopterygia (ancestros de los ictiosaurios) aparecieron rápidamente, con formas como Utatsusaurus y Chaohusaurus, descubiertos en Japón y China respectivamente, que conservaban patas funcionales pero ya mostraban adaptaciones acuáticas como cuerpos alargados y colas comprimidas.',
      'La transición de la tierra al mar representa un ejemplo notable de evolución convergente. Los reptiles marinos del Mesozoico desarrollaron independientemente formas corporales similares a las de los mamíferos marinos actuales (delfines, focas, ballenas), a pesar de no tener parentesco cercano. Este fenómeno ocurre porque el medio acuático impone restricciones físicas específicas: la forma de torpedo minimiza la resistencia al agua, las extremidades anchas y planas maximizan el empuje, y el aislamiento térmico es necesario para mantener la temperatura corporal.',
      'Los Claudiosaurus, reptiles del Pérmico tardío de Madagascar, muestran una etapa intermedia en esta transición. Con un metro de longitud, poseían cuerpos aplanados, costillas reforzadas para soportar la presión submarina y huesos de las extremidades ligeramente reducidos. No eran plenamente acuáticos como los ictiosaurios posteriores, pero pasaban gran parte de su tiempo en el agua. Este mosaico de características terrestres y acuáticas nos permite reconstruir cómo ocurrió la transición gradual de la tierra al mar a lo largo de millones de años.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El paleontólogo sudafricano Robert Broom describió en 1904 los fósiles de Mesosaurus encontrados en la cuenca del Karoo, Sudáfrica. Cuando comparó estos fósiles con los hallados en la cuenca de Paraná, Brasil, encontró que eran prácticamente idénticos. La distancia entre ambas localidades es de más de 5,000 kilómetros a través del Atlántico. Esta evidencia fue tan convincente que incluso los escépticos de la deriva continental tuvieron que reconocer que algo no encajaba con la geografía actual.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La evolución convergente entre reptiles marinos mesozoicos y mamíferos marinos modernos es tan precisa que el ictiosaurio Stenopterygius y un delfín mular comparten un coeficiente de finura (relación largo/ancho del cuerpo) casi idéntico: aproximadamente 4.5 a 1. Este valor es óptimo para minimizar la resistencia hidrodinámica, según estudios de ingeniería naval publicados por Frank Fish de la Universidad de West Chester en 2006.' },
    ],
    fact: 'Los investigadores del Museo de Historia Natural de Stuttgart, Alemania, poseen la mayor colección del mundo de ictiosaurios fósiles del Jurásico, con más de 300 ejemplares provenientes de las canteras de pizarra de Holzmaden. Estos fósiles están tan bien preservados que en algunos se pueden ver los contornos de la piel, la aleta dorsal (que no tiene soporte óseo) y hasta el contenido estomacal. Un ejemplar famoso muestra una hembra dando a luz, con la cría emergiendo cola primero, exactamente como lo hacen los delfines modernos para evitar ahogarse durante el parto.',
  },
  {
    id: 'nothosaurus-dos-mundos',
    title: 'Nothosaurus: Entre Dos Mundos',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/marinos_m1.png',
    image: '/assets/reptiles_marinos/marinos_m1.png',
    content: [
      'El Nothosaurus es uno de los reptiles marinos más representativos del período Triásico, hace entre 240 y 210 millones de años. Su nombre significa «lagarto falso» y fue descrito por primera vez por el paleontólogo Georg zu Münster en 1834, a partir de fósiles encontrados en Baviera, Alemania. Los nothosaurios pertenecen al orden Sauropterygia, el mismo grupo que más tarde daría origen a los plesiosaurios. Alcanzaban longitudes de entre 1 y 7 metros dependiendo de la especie, siendo Nothosaurus giganteus, descrito en China, uno de los más grandes.',
      'Lo que hace al Nothosaurus tan especial es su estilo de vida semiacuático, comparable al de las focas y leones marinos actuales. Poseía patas palmeadas con dedos unidos por membranas, no las aletas completamente transformadas de los ictiosaurios. Su columna vertebral era flexible, permitiéndole moverse tanto en tierra como en el agua con relativa eficiencia. Estudios biomecánicos publicados por Michael Rieppel del Field Museum de Chicago sugieren que los nothosaurios cazaban en el agua pero salían a tierra para descansar, tomar el sol y probablemente para reproducirse.',
      'El cráneo del Nothosaurus revela mucho sobre su estrategia de caza. Tenía un hocico largo y aplanado con dientes cónicos entrelazados, perfectos para atrapar peces resbaladizos y calamares. Los dientes superiores e inferiores encajaban entre sí cuando la mandíbula se cerraba, formando una trampa eficaz. Las aberturas nasales estaban ubicadas en la parte superior del cráneo, lo que le permitía respirar mientras mantenía la mayor parte de la cabeza sumergida, similar a los cocodrilos modernos. Análisis de microdesgaste dental publicados en 2019 confirman una dieta predominantemente piscívora.',
      'Los mares del Triásico donde vivían los nothosaurios eran diferentes a los océanos actuales. El mar de Tetis, principal hábitat de estos reptiles, era un mar somero y cálido con abundantes arrecifes y plataformas continentales. Las temperaturas del agua en estas zonas tropicales superaban los 30 grados Celsius. Los fósiles de nothosaurios se han encontrado en Europa (Alemania, Suiza, Italia, España), China, Israel y el norte de África, demostrando que colonizaron gran parte de la costa del mar de Tetis durante sus 30 millones de años de existencia.',
      'Los nothosaurios se extinguieron al final del Triásico, hace unos 201 millones de años, durante otra extinción masiva vinculada a las erupciones volcánicas de la Provincia Magmática del Atlántico Central. Sin embargo, dejaron descendientes evolutivos: los plesiosaurios, que aparecieron inmediatamente después y dominaron los océanos durante todo el Jurásico y el Cretácico. La transición entre nothosaurios y plesiosaurios es un ejemplo bien documentado de cómo un grupo de animales puede dar origen a otro más especializado. Los plesiosaurios conservaron el plan corporal básico pero desarrollaron aletas más eficientes y abandonaron por completo la vida terrestre.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2014, paleontólogos chinos descubrieron un fósil de Nothosaurus con restos de comida preservados en su estómago: contenía huesos de peces y fragmentos de conchas de cefalópodos. Este hallazgo, publicado en la revista PLOS ONE, proporcionó la primera evidencia directa de la dieta del Nothosaurus. Anteriormente, los científicos solo podían inferir su alimentación a partir de la forma de sus dientes y la estructura de su cráneo. El fósil fue encontrado en la provincia de Guizhou, suroeste de China.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los huesos de los nothosaurios presentan una característica llamada paquiostosis: las paredes de los huesos largos son inusualmente gruesas y densas, con menos cavidades internas que los reptiles terrestres. Esta adaptación aumentaba la densidad corporal, funcionando como un «cinturón de peso» natural que les ayudaba a sumergirse sin esfuerzo. El paleontólogo Torsten Scheyer de la Universidad de Zúrich demostró en 2010 que la densidad ósea de Nothosaurus era intermedia entre reptiles terrestres y marinos, consistente con su estilo de vida semiacuático.' },
    ],
    fact: 'En la localidad de Monte San Giorgio, en la frontera entre Suiza e Italia, declarada Patrimonio de la Humanidad por la UNESCO en 2003, se han encontrado algunos de los fósiles de reptiles marinos del Triásico mejor conservados del mundo, incluyendo múltiples especies de nothosaurios. Las rocas de este yacimiento, depositadas en el fondo de una laguna tropical hace 242 a 235 millones de años, preservan no solo huesos sino también impresiones de tejidos blandos y contenido estomacal. Se han catalogado más de 25 especies de reptiles marinos en este único sitio.',
  },
  {
    id: 'evolucion-natacion',
    title: 'La Evolución de la Natación',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/marinos_m1.png',
    image: '/assets/reptiles_marinos/marinos_m1.png',
    content: [
      'La transición de patas terrestres a aletas marinas es una de las transformaciones evolutivas más estudiadas en la historia de la vida. El proceso no ocurrió de una vez, sino a lo largo de millones de años y en múltiples linajes independientes. En los reptiles marinos del Mesozoico, podemos observar un gradiente completo: desde las patas palmeadas del Nothosaurus (Triásico), pasando por las aletas alargadas con huesos de dedos aún reconocibles del Plesiosaurus (Jurásico), hasta las aletas compactas en forma de remo del ictiosaurio Ophthalmosaurus, donde los huesos de los dedos se habían multiplicado y aplanado hasta ser irreconocibles.',
      'La hidrodinámica impone reglas estrictas sobre la forma corporal de cualquier animal que nade activamente. El número de Reynolds, una medida de la relación entre las fuerzas de inercia y la viscosidad del fluido, determina qué formas corporales son eficientes. Para animales grandes que nadan rápido, la forma óptima es un torpedo con una relación largo/ancho de aproximadamente 4.5:1. Los ictiosaurios del Jurásico alcanzaron esta proporción tras 50 millones de años de selección natural, y los delfines modernos llegaron al mismo valor independientemente, 150 millones de años después.',
      'Los diferentes grupos de reptiles marinos desarrollaron estilos de natación distintos. Los ictiosaurios nadaban mediante oscilación caudal (moviendo la cola de lado a lado), similar a los atunes y tiburones actuales. Los plesiosaurios usaban propulsión mediante aletas, «volando» bajo el agua como los pingüinos. Los mosasaurios ondulaban todo su cuerpo como las anguilas. Cada estilo tiene ventajas: la oscilación caudal permite velocidades sostenidas altas, la propulsión por aletas ofrece maniobras precisas, y la ondulación corporal facilita la aceleración rápida desde el reposo.',
      'La transformación de las extremidades implicó cambios genéticos específicos. En los mamíferos marinos modernos (que sirven como modelo para entender el proceso en reptiles extintos), los genes Hox que controlan el desarrollo de las extremidades muestran patrones de expresión modificados que resultan en dedos más cortos y numerosos. En los ictiosaurios, el fenómeno de hiperfalangia (dedos con más falanges de lo normal) e hiperdactilia (más de cinco dedos) produjo aletas con hasta 10 dedos y más de 20 falanges por dedo, creando una superficie plana y rígida óptima para la propulsión.',
      'Un descubrimiento clave para entender la evolución de la natación fue el fósil de Cartorhynchus, un ictiosaurio primitivo de apenas 40 centímetros encontrado en China en 2014 por el equipo de Ryosuke Motani de la Universidad de California, Davis. Este animal tenía aletas inusualmente flexibles y robustas que podrían haber soportado su peso en tierra, sugiriendo que los ictiosaurios pasaron por una fase anfibia antes de volverse completamente acuáticos. El hallazgo fue publicado en la revista Nature y llenó un vacío de 20 millones de años en el registro fósil de la transición tierra-mar de los ictiosaurios.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los ingenieros navales estudian la forma corporal de los ictiosaurios para diseñar vehículos submarinos más eficientes. En 2012, investigadores de la Universidad de Southampton crearon un modelo robótico inspirado en la cola del ictiosaurio Stenopterygius. El robot demostró que la forma de la cola en media luna del ictiosaurio producía un 15% menos de turbulencia que los diseños de hélice convencionales a velocidades equivalentes, según publicaron en el Journal of the Royal Society Interface.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Ophthalmosaurus, uno de los ictiosaurios más rápidos del Jurásico, tenía ojos de 23 centímetros de diámetro rodeados por un anillo de huesos escleróticos. Estudios ópticos realizados por Ryosuke Motani en 1999 calcularon que estos ojos podían captar luz a profundidades superiores a 500 metros, donde la luminosidad es inferior al 1% de la superficie. La sensibilidad visual del Ophthalmosaurus era comparable a la de los calamares gigantes actuales, los animales con los ojos más grandes del mundo.' },
    ],
    fact: 'La velocidad de natación de los ictiosaurios ha sido estimada mediante modelos biomecánicos y comparación con animales modernos de tamaño y forma similar. El paleontólogo Motani calculó en 2002 que los ictiosaurios tipo atún como Ichthyosaurus podían alcanzar velocidades de crucero de 2 a 4 metros por segundo (7 a 14 km/h) y velocidades de ráfaga de hasta 10 metros por segundo (36 km/h). Estas cifras son comparables a las del delfín nariz de botella (velocidad máxima de 33 km/h) y el atún aleta amarilla (velocidad máxima de 75 km/h), validando la convergencia evolutiva en diseño hidrodinámico.',
  },
  {
    id: 'cadenas-alimentarias',
    title: 'Cadenas Alimentarias Antiguas',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/marinos_m1.png',
    image: '/assets/reptiles_marinos/marinos_m1.png',
    content: [
      'Los océanos del Mesozoico albergaban ecosistemas marinos complejos con cadenas alimentarias de múltiples niveles. En la base se encontraban los productores primarios: fitoplancton calcáreo (cocolitóforos) y silíceo (diatomeas) que convertían la luz solar en materia orgánica mediante fotosíntesis. Los cocolitóforos fueron tan abundantes durante el Cretácico que sus diminutas placas de carbonato de calcio, al acumularse durante millones de años en el fondo marino, formaron depósitos masivos de tiza. Los acantilados blancos de Dover, Inglaterra, con 107 metros de altura, están compuestos casi enteramente por estas estructuras microscópicas.',
      'El zooplancton, siguiente eslabón de la cadena, incluía larvas de invertebrados, pequeños crustáceos y foraminíferos. Estos organismos se alimentaban del fitoplancton y servían de alimento a los consumidores de nivel superior. Los amonites, cefalópodos con concha espiral que existieron durante más de 300 millones de años, ocupaban un nivel intermedio: los más pequeños se alimentaban de zooplancton, mientras que los grandes depredaban peces y crustáceos. Se conocen más de 10,000 especies de amonites, lo que los convierte en uno de los grupos de invertebrados marinos más diversos del Mesozoico.',
      'Los belemnites, parientes de los calamares actuales, fueron otro grupo de cefalópodos que dominó los océanos mesozoicos. A diferencia de los amonites, los belemnites tenían una concha interna (el rostro), que se fosiliza frecuentemente y se encuentra en abundancia en rocas jurásicas y cretácicas de Europa. Se calcula que alcanzaban tamaños de hasta 50 centímetros y nadaban en grandes bancos, como los calamares modernos. Constituían una fuente de alimento principal para ictiosaurios y plesiosaurios: se han encontrado rostros de belemnites acumulados en el contenido estomacal fosilizado de estos reptiles.',
      'Los peces óseos (teleósteos) experimentaron una diversificación masiva durante el Jurásico y Cretácico, ocupando nichos ecológicos comparables a los de los peces modernos. Géneros como Pachycormus y Leedsichthys competían con los reptiles marinos por recursos. El Leedsichthys, descubierto en Inglaterra en 1889, era un pez filtrador que alcanzaba longitudes estimadas de 16 metros, comparable a un tiburón ballena actual. Se alimentaba de plancton y pequeños peces, ocupando un nicho similar al de las ballenas barbadas modernas, millones de años antes de que estas existieran.',
      'En la cima de estas cadenas alimentarias se encontraban los grandes depredadores: ictiosaurios como el Temnodontosaurus (12 metros), plesiosaurios como el Liopleurodon (6 a 7 metros según estimaciones revisadas) y, durante el Cretácico tardío, los mosasaurios como el Mosasaurus (17 metros). Los registros fósiles muestran evidencia directa de depredación: marcas de dientes en huesos, contenido estomacal preservado y hasta casos de canibalismo entre depredadores. Un fósil de Platecarpus (mosasaurio) encontrado en Kansas contenía restos de un pez, que a su vez había comido un pez más pequeño, documentando tres niveles tróficos en un solo fósil.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2008, un equipo de la Universidad de Bristol liderado por Maria McNamara descubrió que ciertos fósiles de cefalópodos del Jurásico preservaban melanosomas, las estructuras celulares que contienen pigmentos. Al analizar la forma y distribución de estos melanosomas, pudieron reconstruir el patrón de coloración original de un belemnite de 160 millones de años. Tenía una parte dorsal oscura y un vientre claro, un patrón de camuflaje llamado contrasombreado que usan los calamares, peces y delfines modernos para ser menos visibles tanto desde arriba como desde abajo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los isótopos de calcio y estroncio en los dientes fósiles de reptiles marinos permiten a los científicos determinar su nivel trófico (posición en la cadena alimentaria) con precisión. Un estudio de Fischer y otros, publicado en 2016 en la revista Geology, analizó 30 dientes de ictiosaurios y plesiosaurios del Jurásico y determinó que ocupaban posiciones tróficas equivalentes a las de las orcas y tiburones blancos actuales, confirmando su papel como depredadores tope de los ecosistemas marinos mesozoicos.' },
    ],
    fact: 'Los amonites eran tan abundantes en los mares del Mesozoico que sus conchas fosilizadas constituyen hasta el 50% del volumen de ciertas formaciones rocosas calcáreas. Los geólogos los utilizan como «fósiles índice» para datar rocas con una precisión de hasta 200,000 años en algunos períodos, gracias a que las especies de amonites evolucionaban y se extinguían con rapidez. Un solo metro cúbico de caliza jurásica de la región de los Alpes puede contener más de 1,000 conchas de amonites individuales, según conteos realizados por el Museo de Historia Natural de Viena.',
  },
  {
    id: 'fosiles-bajo-mar',
    title: 'Fósiles Bajo el Mar',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/marinos_m1.png',
    image: '/assets/reptiles_marinos/marinos_m1.png',
    content: [
      'La formación de un fósil marino requiere una secuencia de condiciones específicas que rara vez se cumplen. Cuando un animal marino muere, su cuerpo generalmente es devorado por carroñeros y descompuesto por bacterias en cuestión de días o semanas. Para que se preserve como fósil, el cadáver debe ser cubierto rápidamente por sedimentos finos (arcilla, limo o ceniza volcánica) que lo protejan de la descomposición y los carroñeros. Los ambientes con poco oxígeno en el fondo marino favorecen la fosilización porque reducen la actividad de organismos que podrían destruir los restos.',
      'Una vez enterrado, comienza el proceso de mineralización, que puede durar miles a millones de años. Los minerales disueltos en el agua subterránea (sílice, pirita, calcita) reemplazan gradualmente los componentes originales del hueso, diente o concha, creando una réplica en piedra del organismo original. En algunos yacimientos excepcionales, como Holzmaden en Alemania o Solnhofen en Baviera, las condiciones fueron tan favorables que se preservaron tejidos blandos, contornos corporales e incluso pigmentos, proporcionando información que los huesos solos no podrían revelar.',
      'Mary Anning (1799-1847) fue una de las paleontólogas más importantes de la historia, aunque nunca recibió reconocimiento formal en vida por ser mujer y de clase trabajadora. Nacida en Lyme Regis, en la costa sur de Inglaterra, comenzó a recolectar fósiles con su padre a los 5 años para venderlos como souvenirs a turistas. A los 12 años, en 1811, descubrió el primer esqueleto completo de ictiosaurio junto con su hermano Joseph. A lo largo de su vida descubrió también el primer esqueleto de plesiosaurio (1823), el primer pterosaurio encontrado fuera de Alemania (1828) y numerosos peces fósiles.',
      'Los acantilados de Lyme Regis, donde Anning hizo sus descubrimientos, son parte de la Costa Jurásica, declarada Patrimonio de la Humanidad por la UNESCO en 2001. Las rocas expuestas en estos acantilados abarcan 185 millones de años de historia geológica, desde el Triásico hasta el Cretácico. Las margas y calizas del Jurásico inferior (Lias) son particularmente ricas en fósiles marinos porque se depositaron en un mar somero tropical con fondos anóxicos que favorecían la preservación. Cada invierno, las tormentas erosionan los acantilados y exponen nuevos fósiles, manteniendo a Lyme Regis como un sitio activo de descubrimiento.',
      'Los métodos modernos de estudio de fósiles marinos han revolucionado el campo. La tomografía computarizada (CT scan) permite examinar el interior de fósiles sin destruirlos, revelando estructuras internas como canales sanguíneos, cavidades cerebrales y huesos del oído interno. En 2016, un equipo de la Universidad de Bristol utilizó la tomografía de sincrotrón (una versión avanzada del CT scan que usa radiación de alta energía) para reconstruir el cerebro tridimensional de un ictiosaurio de 190 millones de años, determinando que tenía lóbulos ópticos grandes y bulbos olfatorios reducidos, consistente con un depredador que dependía más de la vista que del olfato.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mary Anning sobrevivió a un rayo que mató a tres personas en 1800 cuando ella tenía solo 15 meses de edad. La leyenda local dice que antes del rayo, Mary era una niña apagada y enfermiza, pero que después se volvió curiosa, vibrante e inteligente. Aunque esta historia popular carece de base científica, el hecho del rayo está documentado en registros parroquiales de Lyme Regis. Mary Anning murió de cáncer de mama a los 47 años, y la Sociedad Geológica de Londres, que no admitía mujeres, le dedicó un obituario póstumo reconociendo sus contribuciones.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La piritización es un tipo especial de fosilización donde el sulfuro de hierro (pirita, conocida como «oro de los tontos») reemplaza los tejidos originales del organismo. Este proceso ocurre en ambientes marinos anóxicos ricos en bacterias sulfato-reductoras. Los fósiles piritizados de Holzmaden, Alemania, preservan detalles a escala micrométrica: en 2018, el paleontólogo Johan Lindgren publicó en Nature que la melanina original del pigmento oscuro de un ictiosaurio de 180 millones de años estaba químicamente intacta, permitiendo determinar que el animal era oscuro por arriba y claro por debajo.' },
    ],
    fact: 'El Museo de Historia Natural de Londres posee la colección original de fósiles de Mary Anning, incluyendo el ictiosaurio que descubrió en 1811 (catalogado como NHMUK PV R1158). Este espécimen mide 5.2 metros de largo y durante décadas fue exhibido como un «cocodrilo fósil» porque los científicos de la época no podían concebir que un reptil marino completamente diferente hubiera existido. Anning también identificó coprolitos (heces fósiles) y los relacionó correctamente con las dietas de los reptiles marinos, una contribución metodológica que fundó el campo de la paleoecología trófica.',
  },
  {
    id: 'oceanos-mesozoico',
    title: 'Los Océanos del Mesozoico',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/marinos_m1.png',
    image: '/assets/reptiles_marinos/marinos_m1.png',
    content: [
      'El Mesozoico (252 a 66 millones de años) fue un período de «mundo invernadero» donde las temperaturas globales eran entre 6 y 12 grados Celsius más altas que las actuales. No existían capas de hielo permanentes en los polos, y los niveles del mar estaban entre 100 y 250 metros por encima de los actuales. Esto significaba que grandes extensiones de los continentes estaban sumergidas bajo mares someros epicontinentales. El Western Interior Seaway, por ejemplo, dividía Norteamérica en dos masas terrestres durante el Cretácico, extendiéndose desde el Golfo de México hasta el océano Ártico, con una anchura máxima de 1,600 kilómetros.',
      'Las fluctuaciones del nivel del mar durante el Mesozoico tuvieron efectos directos sobre la biodiversidad marina. Cuando el nivel del mar subía (transgresión marina), se creaban extensas plataformas continentales someras con alta productividad biológica, hábitats ideales para los reptiles marinos. Cuando descendía (regresión marina), estos hábitats se reducían, causando competencia intensificada y extinciones locales. Los registros fósiles muestran que la diversidad de ictiosaurios, plesiosaurios y mosasaurios fluctuaba en sincronía con estos cambios del nivel del mar.',
      'La composición química de los océanos mesozoicos también difería de la actual. Los niveles de dióxido de carbono atmosférico eran entre 2 y 8 veces superiores a los actuales (estimaciones de 560 a 2,240 ppm frente a los 280 ppm preindustriales). Esto provocaba que los océanos fueran más ácidos, afectando a los organismos con conchas de carbonato de calcio. Las proporciones de magnesio y calcio en el agua de mar oscilaban, determinando si los organismos formaban conchas de calcita o aragonita. Durante el Cretácico, los océanos favorecían la calcita, lo que explica la proliferación de cocolitóforos y foraminíferos con conchas calcíticas.',
      'Los «eventos anóxicos oceánicos» (OAE por sus siglas en inglés) fueron episodios en los que grandes extensiones del océano perdieron casi todo su oxígeno disuelto. El OAE-2, ocurrido hace 94 millones de años en el límite Cenomaniano-Turoniano, fue uno de los más severos. Duró aproximadamente 500,000 años y provocó la extinción de entre el 27% y el 53% de las especies marinas, incluyendo varios grupos de ictiosaurios que ya estaban en declive. Estos eventos se asocian a períodos de vulcanismo intenso que inyectaba nutrientes en el océano, provocando proliferaciones masivas de algas que consumían todo el oxígeno al descomponerse.',
      'La comparación entre los océanos mesozoicos y los modernos revela paralelos preocupantes. El calentamiento de los océanos actuales (0.88°C de aumento medio desde 1900 según datos de la NOAA), la acidificación por absorción de CO₂ antropogénico y la expansión de zonas con bajo oxígeno en el Pacífico ecuatorial y el Mar Arábigo son procesos análogos a los que precedieron las extinciones marinas del pasado. Los paleoceanógrafos estudian los océanos del Mesozoico precisamente porque ofrecen un «laboratorio natural» para comprender cómo responden los ecosistemas marinos a cambios climáticos rápidos, proporcionando datos que los modelos computacionales por sí solos no pueden generar.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante el Cretácico tardío, hace 75 millones de años, la temperatura de las aguas profundas del Atlántico era de unos 15 a 20 grados Celsius, frente a los 2 a 4 grados actuales. Se han encontrado fósiles de cocodrilos marinos y tortugas en latitudes tan altas como la Isla de Ellesmere, en el Ártico canadiense (78°N), y bosques templados crecían en la Antártida. Los polos no tenían hielo y los reptiles marinos podían nadar desde los trópicos hasta los mares polares sin encontrar barreras de temperatura letales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los foraminíferos bentónicos (organismos microscópicos que viven en el fondo marino) son los principales indicadores que usan los paleoceanógrafos para reconstruir las condiciones de los océanos antiguos. El ratio de isótopos de oxígeno (δ¹⁸O) en sus conchas registra la temperatura del agua, mientras que el ratio de carbono (δ¹³C) indica la productividad biológica y la oxigenación. Un solo testigo de sedimento oceánico de 100 metros puede contener millones de conchas de foraminíferos que registran las condiciones del océano durante los últimos 50 millones de años.' },
    ],
    fact: 'El Western Interior Seaway de Norteamérica, activo durante el Cretácico (100-66 millones de años), ha proporcionado más fósiles de mosasaurios que cualquier otra región del mundo. Solo en el estado de Kansas se han catalogado más de 1,500 ejemplares de mosasaurios pertenecientes a al menos 8 géneros distintos. Las calizas de Niobrara, depositadas en este mar interior, también contienen fósiles de tiburones, peces gigantes como Xiphactinus (6 metros de largo), tortugas marinas como Archelon (4 metros de envergadura) y el ave con dientes Hesperornis. Este registro fósil ha permitido reconstruir un ecosistema marino completo del Cretácico con un detalle sin precedentes.',
  },
];

// ——— Abyssal Particle Field (Canvas Background) ————————————————————————————
function AbyssalField() {
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94', // slate blue or copper
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y += 0.06;
        if (p.y > h + 5) { p.y = -5; p.x = Math.random() * w; }
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

// ——— Ocean Header ————————————————————————————————————————————————————————
function OceanHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Ocean arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#oceanGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 wave markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B7B9A','#B87D5E','#6E8FA8','#8B6B4A','#7C93A8','#9E7B5C','#4A6F8C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M280 25 Q290 18 300 25 Q310 32 320 25" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M285 32 Q295 25 305 32 Q315 39 325 32" fill="none" stroke="#5B7B9A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL OCÉANO PRIMIGENIO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">REPTILES MARINOS DEL MESOZOICO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching M9 Dendera style) ————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(91,123,154,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing:'0.3px',
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
          layoutId="activeDotMarinosM1"
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

// ——— Expandable Section with Random Direction ————————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————————
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
        background: 'rgba(10, 12, 30, 0.92)',
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

      {/* ——— Two-Column Hero Section ——— */}
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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

      {/* ——— Magazine Body ——— */}
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* Video Player */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
        {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`,
            borderRadius: '16px',
            padding: '1.2rem 1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0,
              width: '36px', height: '36px',
              borderRadius: '50%',
              background: `${node.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase',
              }}>
                Dato Científico
              </span>
              <p style={{
                margin: '0.3rem 0 0', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.92rem', lineHeight: 1.7,
              }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ——— Progress Bar ————————————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(91,123,154,0.15)',
    }}>
      <Star size={14} style={{ color: '#5B7B9A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B7B9A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(91,123,154,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5B7B9A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————————————
export default function InteractiveInfographic_MarinosM1() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const handleNodeClick = (nodeId) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
      setExplored(prev => new Set([...prev, nodeId]));
    }
  };

  const activeData = INFOGRAPHIC_NODES.find(n => n.id === activeNode);

  return (
    <div style={{
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(10,15,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/marinos_m1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,123,154,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <AbyssalField />

      <OceanHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(91,123,154,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.8rem 1.2rem',
        position: 'relative',
        zIndex: 2,
        marginBottom: '1rem',
        padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton
            key={node.id}
            node={node}
            index={index}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel
            key={activeData.id}
            node={activeData}
            onClose={() => setActiveNode(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(91,123,154,0.08)', borderRadius: '16px',
              border: '1px solid rgba(91,123,154,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5B7B9A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado el Océano Primigenio!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Descubridor de Ictiosaurios
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          📚 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
