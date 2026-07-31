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
      'Imagina que el universo comienza con un punto matemático sin tamaño ni volumen, flotando en la nada. Este punto representa la dimensión cero, un lugar donde no puedes moverte hacia ningún lado, ni siquiera un milímetro. Si pudieras tomar ese punto y estirarlo infinitamente hacia los lados, crearías una línea recta, formando así la primera dimensión. Es como si el universo fuera un tren que solo puede viajar hacia adelante o hacia atrás sobre un riel, sin poder desviarse.',
      'Ahora, si tomas esa línea y la desplazas en una dirección perpendicular a sí misma, crearás una superficie plana, como una hoja extendida hasta el infinito. Esta es nuestra segunda dimensión, un mundo donde los seres podrían deslizarse como manchas, yendo de arriba abajo o de izquierda a derecha. Piensa en esto como en la pantalla de un videojuego arcade, donde los personajes pueden correr y saltar libremente, pero nunca pueden salir de la pantalla para acercarse o alejarse de ti.',
      'Para dar el salto hacia la tercera dimensión, que es el espacio que habitamos y experimentamos a diario, debemos tomar ese papel y apilarlo infinitamente hacia arriba o hacia abajo. Al ganar esa libertad de movimiento, construimos la profundidad espacial, formando cubos y esferas. Es como pasar de mirar silenciosamente una fotografía bidimensional, a poder caminar alrededor de una escultura en medio de un museo lleno de detalles asombrosos.',
      'Pero la mente humana nunca se detiene. En el siglo diecinueve, un pensador llamado Charles Howard Hinton intentó obligar a nuestro cerebro a visualizar una cuarta dimensión espacial que se extendiera perpendicularmente a nuestro mundo en una dirección inconcebible. Él introdujo por primera vez en el año 1888 la palabra teseracto para describir cómo se vería un hipercubo cuatridimensional, algo tan complejo como un fantasma que desafía todas las reglas de nuestra percepción.',
      'Visualizar un genuino hipercubo es un ejercicio tan complicado para nuestra mente que incluso el genio Salvador Dalí se obsesionó con esta geometría sagrada. En 1954, pintó magistralmente la obra Corpus Hypercubus, representando el despliegue tridimensional de un teseracto. Imagina que el hipercubo proyecta una sombra en nuestro mundo tridimensional, de la misma manera en que tú proyectas una sombra en el suelo; observando sus sombras, logramos atisbar dimensiones superiores ocultas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la escena culminante de la película Interstellar, el astronauta Cooper cae vertiginosamente a través del horizonte de sucesos para acabar sumergiéndose directamente dentro de una estructura tridimensional fabricada con el propósito específico de permitirle visualizar y comprender un espacio cuatridimensional de manera intuitiva y segura, sin que su mente estalle ante la incomprensibilidad de las hiperdimensiones infinitas del teseracto.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para comprender cómo un teseracto despliega su complejidad en nuestro espacio, puedes imaginar el proceso inverso: si desenrollas una caja tridimensional cortando sus aristas, obtendrás una figura de seis cuadrados bidimensionales sobre el suelo. Siguiendo exactamente la misma regla, si desdoblaras un teseracto hiperdimensional, obtendrías un conjunto entrelazado de ocho cubos tridimensionales proyectándose dentro de nuestro entorno habitual.' },
    ],
    fact: 'La arquitectura teórica que subyace detrás de la existencia del hipercubo fue tan meticulosamente desarrollada por matemáticos del siglo pasado, que resulta asombroso constatar que mucho antes de poseer los gráficos computacionales modernos para generar su forma, científicos de la época ya calculaban fielmente a mano su número exacto de vértices, aristas y caras hiperdimensionales invisibles para nosotros.',
  },
  {
    id: 'quinta-dimension',
    title: 'La Quinta Dimensión',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m5/btn_quinta.jpg',
    image: '/assets/interstellar/infographic_m5/hero_quinta.jpg',
    content: [
      'En nuestra experiencia cotidiana, siempre sentimos que el tiempo avanza implacablemente hacia el futuro sin detenerse, como una flecha que solo puede apuntar en una dirección. Pero cuando los físicos teóricos comienzan a estudiar y analizar las matemáticas del universo bajo la lupa rigurosa de la relatividad, se ven forzados a considerar la posibilidad de que nuestro fluir temporal podría ser tratado matemáticamente como una quinta dimensión espacial.',
      'El primero en proponer la necesidad de añadir dimensiones extras al tejido cósmico fue el matemático Theodor Kaluza en el año de 1921. Su objetivo no era jugar frívolamente con conceptos abstractos sin sentido, sino intentar desesperadamente unificar y casar matemáticamente la fuerza de la gravedad descubierta por Einstein, con la fuerza del electromagnetismo, demostrando que ambas fuerzas son diferentes perspectivas de una misma energía primordial en dimensiones altísimas.',
      'Para que la teoría de Kaluza pudiera funcionar en el mundo físico y no solo en pizarras, el físico Oskar Klein propuso en 1926 una respuesta fascinante a un gran problema: ¿dónde está escondida esa quinta dimensión que no podemos ver? Klein argumentó con gran ingenio y genialidad científica que esta dimensión está muy enrollada y compactada sobre sí misma a escalas tan diminutas que resulta invisible para nuestros ojos tridimensionales.',
      'Imagina con todo detalle que te encuentras observando a lo lejos un cable eléctrico que cuelga silencioso entre dos postes. Desde tu distancia en el suelo, el cable te parecerá una línea unidimensional que solo tiene un largo apreciable. Sin embargo, si fueras una hormiga caminando sobre él, descubrirías que ese cable también posee un contorno circular y curvo; es decir, tiene secretamente una dimensión extra escondida a plena vista en las escalas fundamentales.',
      'De una manera similar a esa analogía de la hormiga y el cable eléctrico distante, nosotros los seres humanos vivimos caminando por el universo tridimensional ignorando de forma total las dimensiones superiores enrolladas. Solo cuando nos acercamos a las extremas condiciones de la mecánica cuántica o exploramos la fuerza aplastante del interior de los agujeros negros descubrimos que esta quinta dimensión es necesaria y vital para entender la naturaleza física.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Dentro de las laberínticas paredes del teseracto construido por la entidad evolucionada del futuro, el astronauta Cooper descubre que el implacable tiempo se ha transformado en una dimensión física transitable. Ya no está prisionero del eterno presente, sino que puede literalmente caminar saltando a través de pasillos observando de forma omnisciente todos los momentos simultáneos de la habitación infantil de Murph.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Aunque la teoría original formulada por Kaluza y Klein presentaba innegables defectos matemáticos que frustraron al propio Albert Einstein durante años, su valiente propuesta abrió una gigantesca puerta teórica inexplorada. Sin su idea inicial del espacio enrollado y compactado en bucles diminutos, jamás habríamos concebido ni desarrollado las espectaculares teorías modernas de las supercuerdas, que hoy intentan explicar cada misterio fundamental del universo.' },
    ],
    fact: 'La escala infinitesimal en la que el físico Oskar Klein propuso y defendió fehacientemente que se ocultaba nuestra quinta dimensión espacial teórica es mundialmente conocida por los físicos modernos como la Escala de Planck; una longitud tan microscópica (diez a la potencia de menos treinta y cinco metros) que un solo átomo parecería infinitamente colosal y gigantesco en comparación directa.',
  },
  {
    id: 'teoria-cuerdas',
    title: 'Cuerdas Vibrantes',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m5/btn_cuerdas.jpg',
    image: '/assets/interstellar/infographic_m5/hero_cuerdas.jpg',
    content: [
      'A lo largo de décadas del pensamiento humano, los físicos teóricos nos enseñaron pacientemente que todas las cosas tangibles que nos rodean están construidas a partir de invisibles partículas elementales, como pequeñas canicas fundamentales. Pero una de las teorías más complejas jamás creadas, la Teoría de Cuerdas, destruye este concepto y afirma categóricamente que en el corazón del universo no existen rígidas esferas de materia inerte.',
      'En vez de encontrar las esperadas partículas elementales, si pudiéramos hacer un zoom hacia el núcleo más ínfimo de los quarks, veríamos maravillosas y microscópicas cuerdas, muy delgadas que vibran y oscilan incesantemente de forma frenética. Es exactamente como si las entrañas invisibles de nuestro vasto universo fueran en realidad un violín cósmico microscópico cuyas cuerdas primordiales generan perpetuamente toda la materia densa.',
      'La poética analogía del instrumento de cuerda es simplemente perfecta y profundamente esclarecedora. De la misma manera en que el grosor, la tensión mecánica y la veloz vibración resonante de una cuerda de guitarra determinan si tocará una nota alta o una lúgubre nota grave, la vibración matemática de estas diminutas cuerdas cósmicas primordiales determina si en el universo observable se manifestará un fotón, un electrón o un gravitón huidizo.',
      'Sin embargo, para que esta sinfonía cósmica pueda funcionar sin colapsar instantáneamente ni producir desastrosos errores teóricos llenos de letales infinitos matemáticos, el riguroso modelo requiere obligatoriamente un escenario espacial mucho más gigantesco para albergar tantas vibraciones complejas. Estas cuerdas no pueden limitarse a bailar en nuestras tres dimensiones; requieren de un escenario cósmico compuesto por diez dimensiones.',
      'En este asombroso universo orquestal, el espacio-tiempo alberga nueve dimensiones espaciales y una solitaria dimensión temporal, conformando las misteriosas diez dimensiones teóricas necesarias. Puesto que nuestros limitados cerebros y rudimentarios sentidos biológicos solo pueden captar tres evidentes direcciones espaciales, las restantes seis dimensiones sobrantes deben obligatoriamente estar retorcidas, compactadas y ocultas sobre sí mismas en geometrías microscópicas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'A lo largo de la densa trama científica que sustenta la narrativa intergaláctica de la épica espacial Interstellar, la revolucionaria idea de que el universo no está restringido a nuestras limitadas dimensiones habituales perceptibles proporciona la justificación física clave para las más extremas rarezas temporales y los puentes espaciales presenciados y padecidos por los valientes astronautas exploradores de la lejana NASA.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para intentar procesar mentalmente el incomprensible grado de pequeñez microscópica dimensional en la que se supone que deberían existir estas místicas cuerdas primordiales, piensa de la siguiente manera comparativa: si expandiéramos un diminuto átomo de hidrógeno hasta que alcanzara el colosal tamaño de todo nuestro sistema solar actual, una sola cuerda incrustada dentro de este enorme ente apenas alcanzaría a medir el tamaño normal de un árbol.' },
    ],
    fact: 'Estas misteriosas dimensiones invisibles y fuertemente enrolladas no son simples bolitas esféricas de espacio apretado sin ningún interés aparente; los más avanzados geómetras y matemáticos teóricos especulan firmemente que adoptan complejas formas multidimensionales entrelazadas geométricamente, llamadas los insondables y espectaculares Espacios de Calabi-Yau, los cuales determinan cada una de las inmutables propiedades físicas.',
  },
  {
    id: 'branas-universo',
    title: 'Universos en Rebanadas',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m5/btn_branas.jpg',
    image: '/assets/interstellar/infographic_m5/hero_branas.jpg',
    content: [
      'Una vez que las matemáticas fundamentales de las teorías superiores superaron ampliamente la idea estricta de las solitarias cuerdas cósmicas unidimensionales microscópicas, los físicos teóricos abrieron audazmente las puertas del conocimiento a estructuras geométricas aún mucho más grandes, masivas y notables. En 1999, dos mentes brillantes, Lisa Randall y Raman Sundrum, publicaron estudios introduciendo al mundo la noción cosmológica de que nuestro universo podría no ser más que una delgada lámina incrustada.',
      'A estas vastas y sorprendentes superficies cósmicas hiperdimensionales se les otorga científicamente el sonoro nombre técnico moderno de Branas, un término moderno que deriva lógicamente de la familiar palabra membrana. Imagina mentalmente que nuestro vasto cosmos completo, con todas sus brillantes estrellas fulgurantes y misteriosos agujeros negros, es tan solo una pequeña rebanada delgadísima cortada de un pan inmenso; una finísima brana que flota de manera solitaria dentro de un entorno hiperdimensional inconmensurable, vacío y muchísimo mayor.',
      'Este gigantesco, inabarcable e impensable entorno colosal multidimensional que rodea incesantemente y envuelve infinitamente a nuestra pequeña brana tridimensional se le conoce en la cosmología teórica con el impactante nombre oficial de El Bulk o El Volumen. Si esta descabellada teoría científica llegara a ser correcta y real, podría significar asombrosamente que existen millones de otras branas cósmicas vecinas flotando infinitas, las cuales alojarían universos paralelos inabarcables, tan cercanos al nuestro pero invisibles y aislados.',
      'Lo alucinante del modelo teórico cosmológico de Randall-Sundrum, es que propone firmemente una regla matemática restrictiva sobre la naturaleza física fundamental: todos los componentes básicos de la materia conocida, como los electrones, la luz solar y los pesados quarks nucleares, están fuerte y perpetuamente pegados e irremediablemente sujetos por los extremos a nuestra propia brana casera, impidiéndoles escapar de ella. No pueden cruzar de ningún modo hacia el abismo del Bulk.',
      'Es por este insalvable muro de contención dimensional invisible que nosotros mismos, meros seres biológicos y terrenales construidos de átomos simples pegados férreamente a nuestra modesta rebanada universal, no podemos de ninguna manera visualizar, percibir o interactuar físicamente de forma evidente con el resto infinito del voluminoso pan hiperdimensional superior, a pesar de que este último pueda estar existiendo a una minúscula fracción de milímetro de distancia invisible; como si estuviéramos encerrados en una gran prisión.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la colosal película épica Interstellar que desafía nuestra imaginación humana constantemente, la palabra técnica y científica Bulk se menciona abierta y explícitamente y con gran respeto reverencial por parte de los dedicados astronautas de la NASA cada vez que se refieren al inmenso espacio inabarcable hiperdimensional inexplorado a través del cual logran construir magistralmente y cruzar el mágico agujero de gusano para atajar enormes distancias viajando valientemente hacia otras galaxias.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para intentar asimilar la extraña naturaleza aprisionadora e limitante de estas exóticas y masivas membranas cósmicas, piensa en la oscura tinta impresa de una página de libro. Las palabras de este texto están atrapadas permanentemente en dos dimensiones. No pueden levantarse físicamente hacia el techo ni salir flotando del papel. Nosotros somos la tinta biológica viviendo prisionera en una gran página en blanco tridimensional gigantesca llamada universo observable material, ignorando todo el aire invisible de la habitación.' },
    ],
    fact: 'La fascinante y revolucionaria propuesta teórica científica sugerida, defendida e investigada activamente en la actualidad de que existen de forma palpable otras branas dimensionales invisibles colindantes no es en absoluto una simple fantasía o un guion cinematográfico rebuscado; fue postulada originalmente por matemáticos eminentes para intentar resolver el colosal problema de la asombrosa debilidad de la gravedad universal frente a otras fuerzas poderosas. Esta compleja teoría formal ha sido profundamente revisada en miles de artículos.',
  },
  {
    id: 'gravedad-transdimensional',
    title: 'La Gravedad Cruza Dimensiones',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m5/btn_gravedad.jpg',
    image: '/assets/interstellar/infographic_m5/hero_gravedad.jpg',
    content: [
      'De todas las misteriosas fuerzas cósmicas primordiales que logran mantener fuertemente unido al vasto universo que habitamos día a día, la imponente fuerza masiva de la gravedad guarda celosa y herméticamente un secreto matemático oscuro, peculiar y profundamente desconcertante para la ciencia actual. Resulta sorpresivo descubrir que la gravedad masiva, comparada minuciosamente con fuerzas poderosas como el repulsivo electromagnetismo que todos hemos experimentado de alguna manera en la Tierra, es sorprendentemente frágil y sutil.',
      'Es literalmente tan débil en su inmensa intensidad de atracción en la realidad tangible del mundo cotidiano que resulta decepcionante en las comparaciones más evidentes. Piensa por tan solo un fugaz momento revelador: todo nuestro gigantesco y pesado planeta Tierra está intentando continuamente jalar hacia su ardiente núcleo a un pequeñísimo y brillante clip metálico con muchísima fuerza de gravedad, pero basta usar un minúsculo e insignificante imán común de refrigerador para arrebatarle el clip magnéticamente, demostrando la absurda debilidad terrestre.',
      'Para dar una ingeniosa, lógica y elegante respuesta definitiva a este milenario y frustrante enigma científico, los avanzados modelos de cuerdas introdujeron un concepto bellísimo que lo cambió todo en nuestra percepción. Ya sabíamos que las partículas y la luz eran cuerdas pegadas fuertemente a la brana. Pero el teórico gravitón, la partícula invisible y fundamental que transmite el tirón de gravedad, es radicalmente distinto: es una cuerda que forma un bucle cerrado y redondo sin extremos libres, como una banda elástica inmaterial.',
      'Por no poseer lógicamente ni físicamente ningún ancla restrictiva pegajosa dimensional en sus minúsculas formas cerradas, los gravitones cerrados pueden maravillosa y milagrosamente liberarse y filtrarse imperceptible pero indeteniblemente hacia el inconmensurable abismo gigantesco invisible que conforma en su majestuosa oscuridad al inabarcable Bulk hiperdimensional que nos rodea. Por lo tanto, nuestra familiar gravedad terrestre observada y medida es débil solo porque su intensa energía original enorme se está desangrando y derramando hacia los vastos universos contiguos e invisibles.',
      'Esto implica fascinante y espectacularmente que, de y sin ninguna excepción todas las incontables fuerzas de la vibrante e indomable naturaleza terrenal conocidas hasta el día de hoy, solo la imponente e invisible gravedad curva tiene la rara, exótica y singularísima capacidad física y matemática de poder cruzar implacablemente saltando enormes distancias dimensionales a través de toda la misteriosa complejidad de la quinta dimensión y lograr establecer un contacto físico notorio de manera remota con otros inexplorados y oscuros universos paralelos habitando en branas invisibles.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Este exactísimo y profundo detalle científico real extraído minuciosamente de manera fiel y devota directamente desde el inabarcable corazón de la revolucionaria Teoría de Cuerdas avanzada es el núcleo narrativo central de toda la increíble película. Como la gravedad salta veloz y elegantemente entre dimensiones con suma soltura y facilidad, es la única fuerza física misteriosa transdimensional capaz real y efectivamente de poder cruzar con seguridad la abismal barrera matemática del teseracto hiperdimensional para empujar de manera remota libros viejos y agujas de reloj en la Tierra.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para entender y lograr apreciar mejor la increíble y abismal debilidad de la gravedad observada frente al electromagnetismo universal brillante, simplemente necesitas observar los escalofriantes datos científicos rigurosos y exactos: el poderoso electromagnetismo es una incomprensible cantidad de diez a la potencia de treinta y seis veces muchísimo más potente, brutal y letal que la humilde gravedad que nos mantiene pegados al suelo. Todo ese masivo poder gravitacional teórico enorme simplemente se estaría escurriendo de manera continua hacia las profundidades incomprensibles del Bulk.' },
    ],
    fact: 'La profunda, exhaustiva, muy matemática y meticulosa investigación científica moderna de los grandes expertos y meticulosos físicos Lisa Randall y Raman Sundrum nos demuestra brillantemente, elegantemente y con un hermoso rigor formal que la imponente y poderosa fuerza gravitacional parece concentrarse muchísimo más fuertemente del otro misterioso y oscuro lado del Bulk hiperdimensional colosal y exótico. Es algo asombroso pensar matemáticamente que nuestra misteriosa vecina dimensional más cercana e inmediata podría llegar a ser una inabarcable brana invisible que atrapa esta colosal fuerza.',
  },
  {
    id: 'teseracto-cooper',
    title: 'El Teseracto de Cooper',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m5/btn_teseracto.jpg',
    image: '/assets/interstellar/infographic_m5/hero_teseracto.jpg',
    content: [
      'En el desgarrador punto de máxima tensión climática y cúspide emocional apoteósica de toda la cinta espectacular, Cooper toma la audaz decisión heroica y suicida de dejarse soltar y ser devorado, tragado y arrastrado brutalmente por la gigantesca inmensidad oscura e infinita del aterrador horizonte de sucesos gigantesco e inigualable de Gargantúa, sumergiéndose intrépidamente hacia lo desconocido sin ninguna certeza matemática de si logrará sobrevivir o será destrozado en partículas invisibles atómicas.',
      'En lugar de experimentar físicamente una muerte espantosa e indescriptible por medio de la brutal trituración gravitacional de fuerzas masivas teóricamente indomables llamada lúgubremente por los astrónomos como espaguetización y ser desmembrado velozmente; maravillosamente Cooper aterriza abruptamente e ileso en el muy intrincado e incomprensible centro oscuro dentro del corazón de un deslumbrante teseracto resplandeciente. Esta maquinaria laberíntica cósmica infinita es una asombrosa construcción cuadridimensional que transforma todo el pasado y presente de forma simultánea e insólita.',
      'Todo el minucioso, detalladísimo e increíble diseño visual asombroso que despliega bellamente e imponentemente el teseracto cúbico resplandeciente en la brillante y deslumbrante pantalla del cine no es simplemente fruto descontrolado e ignorante de la azarosa creatividad desbordada de Hollywood. Fue un gran e intenso trabajo minuciosamente ideado y estrictamente guiado de forma inquebrantable, matemática y seria por el célebre físico ganador del premio Nobel Kip Thorne para plasmar fielmente y de forma visualmente correcta un auténtico entorno matemático extraño de altísimas y laberínticas dimensiones superiores.',
      'Lo que el desconcertado y valiente astronauta extraviado está intentando comprender presenciando con asombro con sus minúsculos ojos en esa luminosa estructura infinita es una compleja proyección cósmica tridimensional de un ente hiperdimensional superior extraño. En este alucinante y retorcido lugar laberíntico, el inmaterial y fluido tiempo ha sido físicamente transformado en una robusta e interminable dimensión espacial sólida que se manifiesta, desenrolla y existe de forma permanente ante él, exactamente y literalmente como si se tratara de una sólida y tangible biblioteca interminable y deslumbrante.',
      'De esta hermosa e inteligente forma, los bondadosos seres (los inescrutables, incomprensibles y avanzados y benévolos descendientes humanos y sabios de la quinta dimensión superior) logran maravillosamente proporcionarle heroicamente al rudimentario cerebro asustado y primate de Cooper una ingeniosa, amable y maravillosa forma visual tridimensional y familiar que puede procesar para interactuar pacientemente con una inabarcable y vasta realidad geométrica pentadimensional imposible de captar normalmente y visualmente sin caer rendido irremediablemente en la completa locura y el desespero incontrolable oscuro.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para poder establecer urgentemente y exitosamente una comunicación bidireccional física y desesperada desde dentro de esa impenetrable y resplandeciente cárcel brillante del espacio hiperdimensional superior hacia nuestra vulnerable e indefensa habitación tridimensional y salvar milagrosamente a toda la humanidad; él empuja veloz, desesperada e invisiblemente la arena y manipula firmemente pero con increíble fuerza y dolor infinito la única gravedad que puede trascender, y esto genera una mágica y minúscula arruga transdimensional sutil que tumba los polvorientos libros físicos pesados y voluminosos.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para comprender y asimilar profundamente el inmenso impacto visual e innovador de los brillantes efectos especiales creados por el notable equipo genial y creativo de la película, su avanzado software debió lograr renderizar magistral y maravillosamente las complejas e intrincadas líneas rectas y curvas tridimensionales extraídas minuciosamente a partir de pesadas y difíciles ecuaciones matemáticas puras reales, dibujando con asombrosa exactitud los enmarañados hilos abstractos del tiempo espacial y simulando con extremo cuidado científico y visual las fantasmales ondas gravitatorias saltando branas multidimensionales superiores.' },
    ],
    fact: 'Como una brillante e impresionante anécdota y detalle histórico riguroso de la extenuante e impecable producción cinemática asombrosa, la vasta e interminable complejidad técnica del impresionante diseño del interior del teseracto representó un reto inmenso e inigualable. Literalmente y asombrosamente, construyeron físicamente y con gran esfuerzo humano en el inmenso set de filmación grandes secciones intrincadas de la extraña biblioteca infinita y usaron una abrumadora cantidad de cables mecánicos y proyecciones complejas con espejos inmensos, todo esto para minimizar el abusivo uso irresponsable de simples pantallas verdes y malos gráficos irreales.',
  },
  {
    id: 'mensaje-tiempo',
    title: 'Un Mensaje a Través del Tiempo',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m5/btn_mensaje.jpg',
    image: '/assets/interstellar/infographic_m5/hero_mensaje.jpg',
    content: [
      'El majestuoso problema gigantesco y terrorífico con el que arranca toda la épica historia angustiosa espacial era muy simple pero aterrador: poder resolver a como dé lugar un inescrutable misterio cuántico gravitacional de física matemática abstracta o presenciar la lenta muerte terrenal. La científica Murph necesita los datos, y desesperado, su padre astronauta, sintiendo la enorme responsabilidad sobre sus anchos y fatigados hombros paternos, manipula audazmente la aguja del reloj familiar antiguo y codifica toda esta vital información física enviando una serie binaria Morse golpeando valientemente la inamovible gravedad.',
      'A primera vista ingenua, escéptica o ignorante, todo este hermoso, emotivo y dramático asunto descabellado de que la fuerte e inquebrantable fuerza emocional del amor pueda literalmente y poéticamente lograr trascender maravillosamente el inclemente paso del indetenible tiempo y las inabarcables dimensiones espaciales puede llegar lógicamente a sonar simplemente como una ridícula e ilógica excusa pseudocientífica melosa, exagerada, empalagosa y artificial diseñada perezosamente para el cine fantástico convencional actual que siempre busca una manera forzada e inmerecida para generar lágrimas emotivas e instantáneas en el espectador sensible.',
      'Pero, oculto minuciosamente e inteligentemente debajo de toda la melosa e hermosa superficie romántica, sentimental y cinematográficamente poética del abrumador final glorioso y trágico visualmente, yace asombrosa y espléndidamente un inmenso y profundamente sólido corazón firme, riguroso e inamovible de genuina ciencia astrofísica pura, matemática y fascinante de dimensiones superiores. Es una demostración espectacular y única de un entendimiento muy audaz, serio e impecable de las mecánicas secretas teóricas del inabarcable y extraño cosmos oscuro infinito que los asombrosos genios físicos actuales debaten.',
      'De una forma absoluta, definitiva y real en el majestuoso cosmos e insondable espacio profundo innegable y comprobable científicamente; gracias a las misteriosas ondas espaciales descubiertas empíricamente y validadas por los mejores, las enormes arrugas espaciales de la implacable gravedad pueden y teóricamente, sin violar de forma absurda ni por asomo ninguna letal y sagrada ley fundamental e inquebrantable física establecida portar y transportar velozmente inmensos y variados paquetes de la información matemática pura desde las galaxias lejanísimas hacia nosotros, revelándonos de manera fiel algún secreto antiguo inexplorado.',
      'En el abrumador desenlace final climático de la cinta espectacular, la lejana e imposible comunicación entre la extraña dimensión y la oscura tierra no es telepatía mágica y fantasiosa. Cooper transmite su mensaje desesperado mediante eficaces y precisas anomalías gravitacionales finamente dirigidas a un antiguo reloj analógico terrenal, logrando dictar minuciosamente los esquemas cuánticos completos de las entrañas más oscuras e impenetrables del voraz agujero negro Gargantúa, todo para que la joven e ingeniosa mujer y eminente científica Murph complete la fórmula final y pueda al fin resolver el enigmático problema que salvará la diezmada raza humana.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para acentuar la asombrosa realidad dramática humana de que la frágil vida en nuestro amado universo no es meramente biología inerte, el propio astronauta protagonista repite firmemente que el inmenso amor paterno filial verdadero y la conexión existencial es la única, verdadera e invencible cosa capaz de cruzar valientemente y sin desvanecerse en el terrible abismo inabarcable todo el complejo enjambre laberíntico de las impenetrables dimensiones temporales que nos alejan física y materialmente con crueldad a todos de los seres queridos.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para traducir y asimilar de forma técnica y racional la hermosa pero poética comunicación gravitacional y misteriosa pentadimensional que desafía a la mente humana, piensa que de manera exacta y similar a como nuestro revolucionario internet veloz transmite complejos mensajes en código ordenado a través de invisibles microondas fotónicas que parpadean rápidamente por el enorme cielo oscuro y frío espacial; la colosal onda de masa distorsionada ondulatoria gravitatoria también puede teóricamente llegar a transportar rigurosamente codificada en sus pulsos un inmenso y vital acervo de conocimiento estelar innegable.' },
    ],
    fact: 'Después del exitosísimo lanzamiento comercial global y del asombroso estreno apoteósico de la aclamada obra audiovisual impecable del ingenioso Nolan, numerosos e importantes, reputados e internacionalmente conocidos científicos renombrados confesaron su enorme admiración asombrosa. Destacaron fuertemente que visualizar a un ser tridimensional utilizando creativamente y audazmente incontrolables ondas de choque gravitacionales pentadimensionales saltando entre vastos y extraños universos paralelos invisibles para comunicarse remotamente mediante perturbaciones analógicas es la premisa astrofísica narrativa más brillante y arriesgada de la ciencia ficción moderna.',
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">Y LA QUINTA DIMENSIÃ“N</text>
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
