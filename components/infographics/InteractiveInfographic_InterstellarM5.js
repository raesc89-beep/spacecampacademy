'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Interstellar themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoBlackHole({ size = 70, color = '#F4A261', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="1" />
      {/* Accretion disk lines */}
      <path d="M 5 30 Q 30 15 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 5 30 Q 30 45 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoSpacetimeGrid({ size = 70, color = '#4FC3F7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Curved grid mimicking a gravity well */}
      <path d="M10 10 Q30 30 50 10" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M10 25 Q30 40 50 25" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M10 40 Q30 50 50 40" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      
      <path d="M10 10 Q30 30 10 50" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M25 10 Q40 30 25 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M40 10 Q50 30 40 50" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoWaveRipple({ size = 80, color = '#7C4DFF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <path d="M0 20 Q 10 5, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M0 20 Q 10 10, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M0 20 Q 10 15, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}

function DecoOrbit({ size = 70, color = '#00BCD4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(30 30 30)" />
      <ellipse cx="30" cy="30" rx="25" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(-30 30 30)" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.8" />
      <circle cx="50" cy="18" r="2" fill={color} opacity="1" />
      <circle cx="10" cy="42" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoEqualSign({ size = 70, color = '#FF6B35', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      <text x="5" y="32" fill={color} fontSize="22" fontWeight="bold" fontFamily="serif" opacity="0.6">GÎ¼Î½=8Ï€TÎ¼Î½</text>
      <circle cx="62" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="55" cy="18" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'dimensiones-geometria': [DecoOrbit, DecoSpacetimeGrid, DecoBlackHole],'quinta-dimension': [DecoEqualSign, DecoSpacetimeGrid, DecoOrbit],'teoria-cuerdas': [DecoSpacetimeGrid, DecoBlackHole, DecoWaveRipple],'branas-universo': [DecoOrbit, DecoSpacetimeGrid, DecoWaveRipple],'gravedad-transdimensional': [DecoBlackHole, DecoSpacetimeGrid, DecoEqualSign],'teseracto-cooper': [DecoWaveRipple, DecoBlackHole, DecoOrbit],
  'mensaje-tiempo': [DecoOrbit, DecoWaveRipple, DecoEqualSign],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Randall, L., Sundrum, R. (1999). "Large Mass Hierarchy from a Small Extra Dimension", Physical Review Letters, 83(17)',
  'Greene, B. (1999). The Elegant Universe: Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory, W.W. Norton',
  'Kaluza, T. (1921). "Zum Unitätsproblem der Physik", Sitzungsberichte Preussische Akademie der Wissenschaften',
  'Randall, L. (2005). Warped Passages: Unraveling the Mysteries of the Universe\'s Hidden Dimensions, Ecco Press',
  'Hinton, C.H. (1888). A New Era of Thought, Swan Sonnenschein & Co.',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'dimensiones-geometria',
    title: 'De Punto a Hipercubo',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m5/btn_dimensiones.jpg',
    image: '/assets/interstellar/infographic_m5/hero_dimensiones.jpg',
    content: [
      'Imagina que el universo comienza con un punto matemático sin tamaño ni volumen, flotando en la nada. Este punto representa la dimensión cero. Es un lugar donde no puedes moverte hacia ningún lado. Si pudieras tomar ese punto y estirarlo hacia los lados, crearías una línea recta, formando la primera dimensión. Es como si el universo fuera un tren que solo puede viajar hacia adelante o hacia atrás sobre un riel.',
      'Ahora, si tomas esa línea y la desplazas en una dirección perpendicular, crearás una superficie plana. Es como una hoja extendida. Esta es nuestra segunda dimensión. Es un mundo donde los seres podrían deslizarse como manchas de arriba abajo o de izquierda a derecha. Piensa en esto como en la pantalla de un videojuego arcade. Los personajes pueden correr y saltar libremente, pero nunca salir de la pantalla.',
      'Para dar el salto hacia la tercera dimensión, que es el espacio que habitamos, debemos tomar ese papel y apilarlo hacia arriba o hacia abajo. Al ganar esa libertad de movimiento, construimos la profundidad espacial, formando cubos y esferas. Es como pasar de mirar una fotografía bidimensional, a caminar alrededor de una escultura en un museo.',
      'Pero la mente humana no se detiene. En el siglo diecinueve, Charles Howard Hinton intentó obligar a nuestro cerebro a visualizar una cuarta dimensión espacial. Esta se extendería perpendicularmente a nuestro mundo en una dirección inconcebible. Él introdujo en 1888 la palabra teseracto para describir un hipercubo cuatridimensional. Es algo complejo que desafía las reglas de nuestra percepción.',
      'Visualizar un hipercubo es un ejercicio complicado para nuestra mente. Incluso Salvador Dalí se obsesionó con esta geometría. En 1954, pintó la obra Corpus Hypercubus, representando el despliegue tridimensional de un teseracto. Imagina que el hipercubo proyecta una sombra en nuestro mundo tridimensional. Es como cuando tú proyectas una sombra en el suelo. Al observar sus sombras, logramos atisbar dimensiones ocultas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la escena culminante de la película Interstellar, el astronauta Cooper cae a través del horizonte de sucesos. Acaba sumergiéndose dentro de una estructura tridimensional fabricada con el propósito de permitirle visualizar un espacio cuatridimensional de manera intuitiva y segura. Esto evita que su mente colapse ante la incomprensibilidad del teseracto.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para comprender cómo un teseracto se despliega en nuestro espacio, imagina el proceso inverso. Si desenrollas una caja tridimensional cortando sus aristas, obtendrás seis cuadrados bidimensionales sobre el suelo. Siguiendo la misma regla, si desdoblaras un teseracto, obtendrías un conjunto entrelazado de ocho cubos tridimensionales proyectándose en nuestro entorno.' },
    ],
    fact: 'La arquitectura teórica del hipercubo fue desarrollada por matemáticos del siglo pasado. Resulta asombroso que, mucho antes de poseer gráficos computacionales para generar su forma, los científicos ya calculaban a mano su número exacto de vértices, aristas y caras hiperdimensionales.',
  },
  {
    id: 'quinta-dimension',
    title: 'La Quinta Dimensión',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m5/btn_quinta.jpg',
    image: '/assets/interstellar/infographic_m5/hero_quinta.jpg',
    content: [
      'En nuestra experiencia, sentimos que el tiempo avanza hacia el futuro. Es como una flecha que apunta en una dirección. Pero cuando los físicos analizan las matemáticas de la relatividad, surge otra idea. Se ven forzados a considerar que nuestro tiempo podría ser una quinta dimensión espacial.',
      'El matemático Theodor Kaluza propuso añadir dimensiones extras al tejido cósmico en 1921. Su objetivo era unificar la fuerza de la gravedad de Einstein con el electromagnetismo. Quería demostrar que ambas fuerzas son perspectivas de una misma energía en dimensiones superiores.',
      'Para que la teoría de Kaluza funcionara, el físico Oskar Klein propuso una respuesta en 1926. Explicó dónde está escondida esa quinta dimensión invisible. Argumentó que esta dimensión está enrollada a escalas diminutas. Por eso resulta invisible para nuestros ojos tridimensionales.',
      'Imagina que observas un cable eléctrico que cuelga entre dos postes. Desde tu distancia, el cable parecerá una línea unidimensional. Sin embargo, si fueras una hormiga caminando sobre él, descubrirías que posee un contorno circular. Es decir, tiene una dimensión extra escondida a escalas menores.',
      'De manera similar, los humanos vivimos en el universo tridimensional. Ignoramos las dimensiones superiores enrolladas. Solo al acercarnos a la mecánica cuántica o a los agujeros negros, descubrimos esta quinta dimensión. Es necesaria para entender la naturaleza física.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Dentro del teseracto construido por entidades del futuro, Cooper descubre que el tiempo es una dimensión física transitable. Ya no está prisionero del presente. Puede caminar a través de pasillos observando todos los momentos de la habitación de Murph.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Aunque la teoría de Kaluza y Klein presentaba defectos matemáticos, su propuesta abrió una puerta teórica. Sin su idea del espacio enrollado, no habríamos desarrollado las teorías de supercuerdas. Estas teorías intentan hoy explicar los misterios del universo.' },
    ],
    fact: 'La escala en la que Oskar Klein propuso que se ocultaba la quinta dimensión es conocida como la Escala de Planck. Es una longitud microscópica (diez a la potencia de menos treinta y cinco metros). Un átomo parecería colosal en comparación.',
  },
  {
    id: 'teoria-cuerdas',
    title: 'Cuerdas Vibrantes',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m5/btn_cuerdas.jpg',
    image: '/assets/interstellar/infographic_m5/hero_cuerdas.jpg',
    content: [
      'Los físicos nos enseñaron que las cosas tangibles están construidas a partir de partículas elementales, como canicas fundamentales. Sin embargo, la Teoría de Cuerdas desafía este concepto. Afirma que en el corazón del universo no existen esferas de materia inerte.',
      'Si hiciéramos un zoom hacia el núcleo de los quarks, no encontraríamos partículas elementales. Veríamos microscópicas cuerdas que vibran y oscilan. Es como si las entrañas de nuestro universo fueran un violín cósmico. Sus cuerdas primordiales generan toda la materia densa.',
      'La analogía del instrumento de cuerda es perfecta. El grosor, la tensión y la vibración de una cuerda de guitarra determinan su nota musical. De igual forma, la vibración matemática de estas cuerdas cósmicas determina las partículas. Así se define si surgirá un fotón, un electrón o un gravitón.',
      'Para que esta sinfonía cósmica funcione sin colapsar ni producir errores teóricos, se requiere un escenario espacial mayor. Este entorno debe albergar muchas vibraciones complejas. Estas cuerdas no pueden limitarse a tres dimensiones; necesitan un espacio de diez dimensiones.',
      'En este universo orquestal, el espacio-tiempo alberga nueve dimensiones espaciales y una dimensión temporal. Conforman las diez dimensiones teóricas necesarias. Como nuestros sentidos biológicos solo captan tres direcciones espaciales, las restantes seis deben estar ocultas. Se encuentran compactadas sobre sí mismas en geometrías microscópicas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la trama científica de Interstellar, la idea de dimensiones adicionales proporciona una justificación física. Permite explicar las rarezas temporales y los puentes espaciales que presencian los astronautas de la NASA.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para procesar el grado de pequeñez de estas cuerdas primordiales, usa esta comparación. Si expandiéramos un átomo de hidrógeno hasta alcanzar el tamaño del sistema solar, una cuerda apenas mediría el tamaño de un árbol.' },
    ],
    fact: 'Estas dimensiones invisibles no son simples esferas de espacio. Los geómetras teóricos especulan que adoptan formas multidimensionales entrelazadas. Se les llama Espacios de Calabi-Yau, los cuales determinan las propiedades físicas de las cuerdas.',
  },
  {
    id: 'branas-universo',
    title: 'Universos en Rebanadas',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m5/btn_branas.jpg',
    image: '/assets/interstellar/infographic_m5/hero_branas.jpg',
    content: [
      'Una vez que las matemáticas superaron la idea de las cuerdas unidimensionales, los físicos exploraron estructuras geométricas mayores. En 1999, Lisa Randall y Raman Sundrum introdujeron una noción cosmológica. Propusieron que nuestro universo podría ser una lámina incrustada en un espacio mayor.',
      'A estas vastas superficies cósmicas se les otorga el nombre de Branas, derivado de membrana. Imagina que nuestro cosmos es tan solo una delgada rebanada cortada de un pan inmenso. Sería una finísima brana que flota dentro de un entorno hiperdimensional mayor.',
      'Este gigantesco entorno multidimensional que rodea a nuestra brana tridimensional se conoce como El Bulk o El Volumen. Si esta teoría fuera correcta, podría significar que existen otras branas cósmicas vecinas. Estas alojarían universos paralelos cercanos al nuestro, pero invisibles.',
      'El modelo de Randall-Sundrum propone una regla matemática sobre la materia conocida. Los electrones, la luz y los quarks están sujetos a nuestra propia brana. Les impide escapar hacia el abismo del Bulk.',
      'Por este muro dimensional, los seres construidos de átomos no podemos interactuar con el Bulk hiperdimensional. Aunque este pueda estar existiendo a una fracción de milímetro de distancia, permanecemos limitados a nuestra brana.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En Interstellar, la palabra Bulk se menciona cuando los astronautas se refieren al inmenso espacio hiperdimensional. A través de este entorno logran cruzar el agujero de gusano para viajar hacia otras galaxias.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para asimilar la naturaleza limitante de estas membranas, piensa en la tinta de una página. Las palabras están atrapadas en dos dimensiones. Nosotros somos esa tinta viviendo prisionera en una página tridimensional llamada universo.' },
    ],
    fact: 'La propuesta de que existen otras branas dimensionales colindantes no es una simple fantasía. Fue postulada por matemáticos para intentar resolver el problema de la debilidad de la gravedad frente a otras fuerzas fundamentales.',
  },
  {
    id: 'gravedad-transdimensional',
    title: 'La Gravedad Cruza Dimensiones',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m5/btn_gravedad.jpg',
    image: '/assets/interstellar/infographic_m5/hero_gravedad.jpg',
    content: [
      'De todas las fuerzas cósmicas que mantienen unido al universo, la gravedad guarda un secreto matemático. Resulta sorpresivo descubrir que la gravedad, comparada con el electromagnetismo, es una fuerza muy frágil.',
      'Es tan débil en el mundo cotidiano que resulta decepcionante en las comparaciones. Nuestro planeta intenta jalar hacia su núcleo a un clip metálico con la gravedad. Sin embargo, basta usar un minúsculo imán de refrigerador para arrebatarle el clip, demostrando su debilidad.',
      'Para dar respuesta a este enigma, los modelos de cuerdas introdujeron un nuevo concepto. El gravitón, la partícula teórica que transmite la gravedad, es distinto a otras partículas. Es una cuerda que forma un bucle cerrado sin extremos libres.',
      'Por no poseer anclas dimensionales, los gravitones pueden filtrarse hacia el Bulk hiperdimensional que nos rodea. Por lo tanto, nuestra gravedad terrestre es débil solo porque su energía se derrama hacia universos contiguos.',
      'Esto implica que, de todas las fuerzas de la naturaleza conocidas, solo la gravedad puede cruzar dimensiones. Tiene la capacidad de establecer contacto físico con universos paralelos en otras branas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Este detalle científico es el núcleo narrativo de la película. Como la gravedad salta entre dimensiones, es la única fuerza capaz de cruzar la barrera del teseracto. Esto permite empujar libros y agujas de reloj en la Tierra de manera remota.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para entender la debilidad de la gravedad frente al electromagnetismo, observa los datos científicos. El electromagnetismo es diez a la potencia de treinta y seis veces más potente. Ese poder gravitacional faltante se escurre hacia el Bulk.' },
    ],
    fact: 'La investigación de Lisa Randall y Raman Sundrum demuestra que la fuerza gravitacional se concentra en el Bulk. Es asombroso pensar que nuestra vecina dimensional podría ser una brana invisible que atrapa esta fuerza.',
  },
  {
    id: 'teseracto-cooper',
    title: 'El Teseracto de Cooper',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m5/btn_teseracto.jpg',
    image: '/assets/interstellar/infographic_m5/hero_teseracto.jpg',
    content: [
      'En el punto de máxima tensión de la película, Cooper se deja arrastrar por el horizonte de sucesos de Gargantúa. Se sumerge hacia lo desconocido sin ninguna certeza matemática de lograr sobrevivir a la inmensidad del agujero negro.',
      'En lugar de experimentar una muerte por trituración gravitacional, Cooper aterriza ileso. Llega al centro de un deslumbrante teseracto. Esta maquinaria es una construcción cuadridimensional que transforma el pasado y presente de forma simultánea.',
      'El diseño visual del teseracto en la pantalla no es fruto azaroso de Hollywood. Fue un trabajo guiado por el físico Kip Thorne para plasmar fielmente un entorno matemático de dimensiones superiores.',
      'Cooper intenta comprender esta luminosa estructura. En este lugar, el tiempo fluido ha sido transformado en una dimensión espacial sólida. Se desenrolla de forma permanente ante él, como si se tratara de una biblioteca interminable.',
      'De esta forma, los seres de la quinta dimensión proporcionan al cerebro de Cooper una forma visual tridimensional. Le permite interactuar con una realidad geométrica pentadimensional sin caer en la locura.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para comunicarse desde el espacio hiperdimensional hacia la habitación tridimensional, Cooper manipula la gravedad. Genera una arruga transdimensional sutil que tumba los libros en la Tierra.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para crear los efectos visuales, el software debió renderizar líneas extraídas de ecuaciones matemáticas reales. Se simuló con cuidado científico las ondas gravitatorias saltando branas multidimensionales.' },
    ],
    fact: 'El diseño del interior del teseracto representó un reto inmenso. Construyeron físicamente secciones de la biblioteca en el set de filmación para minimizar el uso de pantallas verdes.',
  },
  {
    id: 'mensaje-tiempo',
    title: 'Un Mensaje a Través del Tiempo',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m5/btn_mensaje.jpg',
    image: '/assets/interstellar/infographic_m5/hero_mensaje.jpg',
    content: [
      'El problema con el que arranca la historia espacial era simple: resolver un misterio gravitacional o presenciar la extinción terrestre. Murph necesita los datos. Cooper manipula la aguja del reloj familiar y envía la información en código Morse manipulando la gravedad.',
      'A primera vista, la idea de que el amor pueda trascender las dimensiones puede sonar como una excusa cinematográfica artificial. Podría parecer diseñada para generar emotividad instantánea en el espectador.',
      'Pero debajo de la superficie narrativa yace un corazón sólido de ciencia astrofísica. Es una demostración de un entendimiento impecable de las mecánicas teóricas del cosmos que los genios físicos debaten en la actualidad.',
      'En el cosmos comprobable científicamente, las ondas gravitacionales pueden transportar información. No violan ninguna ley física al cruzar desde galaxias lejanas hacia nosotros, revelándonos secretos inexplorados.',
      'En el desenlace de la cinta, la comunicación no es telepatía mágica. Cooper transmite anomalías gravitacionales a un reloj analógico terrenal. Dicta los esquemas cuánticos de Gargantúa para que Murph resuelva la fórmula final y salve a la humanidad.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El astronauta protagonista repite que la conexión humana es lo único capaz de cruzar el abismo de las dimensiones. El amor paterno es capaz de atravesar las barreras que separan a los seres queridos.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para asimilar la comunicación gravitacional, piensa en internet. Transmite mensajes en código a través de invisibles microondas. De forma similar, la onda gravitatoria puede transportar conocimiento estelar codificado en sus pulsos.' },
    ],
    fact: 'Tras el estreno de la película, científicos renombrados destacaron su rigor. Señalaron que usar ondas gravitacionales saltando universos para comunicarse mediante perturbaciones es una de las premisas más brillantes de la ciencia ficción moderna.',
  },
];

// â”€â”€â”€ Gargantua Video Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <video autoPlay muted loop playsInline
        poster="/assets/interstellar/gargantua_bg.jpg"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="/assets/interstellar/blackhole.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
    </div>
  );
}

// â”€â”€â”€ Interstellar Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#7C4DFF','#4FC3F7','#FF6B35','#AB47BC','#FF9800','#F44336','#26A69A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central hole icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FF6B35" opacity="0.5" />
        <ellipse cx="300" cy="30" rx="18" ry="6" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="0.6" transform="rotate(20 300 30)" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,107,53,0.2)" />
            <stop offset="50%" stopColor="rgba(79,195,247,0.9)" />
            <stop offset="100%" stopColor="rgba(255,107,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL TESERACTO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">Y LA QUINTA DIMENSIÓN</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(79,195,247,0.2)'}`,
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
          layoutId="activeDotInterstellarM5"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        whileHover={{ backgroundColor: `${color}15` }}
        style={{
          width: '100%',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: `${color}20`,
            padding: '0.4rem',
            borderRadius: '8px',
            color: color
          }}>
            <IconComp size={18} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.5px' }}>{item.label}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dirVariants[dir]}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              padding: '0 1.25rem 1.25rem 1.25rem',
              color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontSize:'0.92rem',
            }}
          >
            <div style={{
              paddingTop: '1rem',
              borderTop: `1px solid ${color}15`
            }}>
              {item.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterstellarM5() {
  const [activeNodeId, setActiveNodeId] = useState(INFOGRAPHIC_NODES[0].id);
  const [isChanging, setIsChanging] = useState(false);
  const contentRef = useRef(null);
  
  // Lightbox state
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);
  const activeDeco = DECO_MAP[activeNode.id] || [DecoBlackHole, DecoSpacetimeGrid, DecoOrbit];
  const DecoA = activeDeco[0];
  const DecoB = activeDeco[1];

  const handleNodeChange = (id) => {
    if (id === activeNodeId) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveNodeId(id);
      setIsChanging(false);
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0a0c1e', // Deep space black base
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <InterstellarBackground />
      
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <InterstellarHeader />

        {/* Navigation Nodes */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={node.id === activeNodeId}
              onClick={() => handleNodeChange(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Main Content Panel */}
        <div style={{
          background: 'rgba(10, 12, 30, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: `1px solid ${activeNode.color}30`,
          boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)`,
          overflow: 'hidden',
          position: 'relative',
          transition: 'border-color 0.5s',
        }}>
          {/* Subtle top glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: `linear-gradient(90deg, transparent, ${activeNode.color}, transparent)`,
            opacity: 0.6
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '280px', // hero layout min height
          }}>
            {/* Hero Image Section */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              minHeight: '280px',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeNode.image}
                    alt={activeNode.title}
                    onClick={() => setLightboxSrc(activeNode.image)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer', // Lightbox rule
                    }}
                  />
                  {/* Inner shadow over image */}
                  <div style={{
                    position: 'absolute', inset: 0, background:'linear-gradient(to right, rgba(10,12,30,0.9) 0%, transparent 30%, transparent 70%, rgba(10,12,30,0.4) 100%)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0, background:'linear-gradient(to top, rgba(10,12,30,1) 0%, transparent 40%)',
                    pointerEvents: 'none'
                  }} />
                </motion.div>
              </AnimatePresence>

              {/* Decorative SVGs over image */}
              <div style={{ position: 'absolute', top: '10%', right: '10%' }}>
                <DecoA color={activeNode.color} size={100} />
              </div>
              <div style={{ position: 'absolute', bottom: '15%', left: '10%' }}>
                <DecoB color={activeNode.color} size={80} />
              </div>
            </div>

            {/* Text Content Section */}
            <div
              ref={contentRef}
              style={{
                padding: '2.5rem',
                maxHeight: '70vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: `${activeNode.color}40 transparent`,
                position: 'relative',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={activeNode.btnImage} 
                      alt="avatar" 
                      onClick={() => setLightboxSrc(activeNode.btnImage)}
                      style={{ 
                        width: '40px', height: '40px', 
                        borderRadius: '50%', 
                        border: `2px solid ${activeNode.color}`,
                        cursor: 'pointer',
                        objectFit: 'cover'
                      }} 
                    />
                    <h2 style={{
                      fontSize: '2rem', fontWeight: 800, margin: 0, color: activeNode.color, textShadow:'0 2px 10px rgba(0,0,0,0.5)',
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '1px'
                    }}>
                      {activeNode.title}
                    </h2>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1.2rem',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1.05rem', lineHeight: 1.7, textShadow:'0 1px 2px rgba(0,0,0,0.8)'
                  }}>
                    {activeNode.content.map((para, idx) => (
                      <p key={idx} style={{ margin: 0 }}>
                        {idx === 0 && (
                          <span style={{ 
                            color: activeNode.color, 
                            fontSize: '1.4em', lineHeight: 1, fontWeight:'bold', 
                            marginRight: '4px' 
                          }}>
                            {para.charAt(0)}
                          </span>
                        )}
                        {idx === 0 ? para.slice(1) : para}
                      </p>
                    ))}
                  </div>

                  {/* Fact Box */}
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: `linear-gradient(to right, ${activeNode.color}15, transparent)`,
                    borderLeft: `4px solid ${activeNode.color}`,
                    borderRadius: '0 12px 12px 0',
                    display: 'flex',
                    gap: '1rem',
                  }}>
                    <Star style={{ color: activeNode.color, flexShrink: 0, marginTop: '4px' }} size={24} />
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.95rem', lineHeight: 1.6, color:'rgba(255,255,255,0.85)',
                      fontStyle: 'italic'
                    }}>
                      {activeNode.fact}
                    </p>
                  </div>

                  {/* Expandables */}
                  <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {activeNode.expandables.map((exp, idx) => (
                      <ExpandableSection key={idx} item={exp} color={activeNode.color} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bibliography Footer */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          zIndex: 2,
        }}>
          <h3 style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '0.5rem'
          }}>
            ðŸ“š Fuentes y Referencias
          </h3>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            <ul style={{
              margin: 0,
              paddingLeft: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              {BIBLIOGRAPHY.map((item, idx) => (
                <li key={idx} style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem', lineHeight: 1.5, listStyleType:'disc'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lightbox Render */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Vista ampliada"
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}
