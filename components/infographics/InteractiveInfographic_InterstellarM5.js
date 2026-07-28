'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Interstellar themed) ────────────────────────────
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
      <text x="5" y="32" fill={color} fontSize="22" fontWeight="bold" fontFamily="serif" opacity="0.6">Gμν=8πTμν</text>
      <circle cx="62" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="55" cy="18" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'dimensiones-geometria': [DecoOrbit, DecoSpacetimeGrid, DecoBlackHole],
  'quinta-dimension': [DecoEqualSign, DecoSpacetimeGrid, DecoOrbit],
  'teoria-cuerdas': [DecoSpacetimeGrid, DecoBlackHole, DecoWaveRipple],
  'branas-universo': [DecoOrbit, DecoSpacetimeGrid, DecoWaveRipple],
  'gravedad-transdimensional': [DecoBlackHole, DecoSpacetimeGrid, DecoEqualSign],
  'teseracto-cooper': [DecoWaveRipple, DecoBlackHole, DecoOrbit],
  'mensaje-tiempo': [DecoOrbit, DecoWaveRipple, DecoEqualSign],
};

// ─── Content Data ────────────────────────────────────────────────────────────
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
      'Imagina que el inmenso universo que conocemos comienza simplemente con un minúsculo punto matemático sin tamaño ni volumen alguno, flotando solo en la nada. Este punto solitario representa la dimensión cero, un lugar donde no puedes moverte hacia ningún lado, ni siquiera un milímetro. Si pudieras tomar ese mismo punto y estirarlo infinitamente hacia los lados, crearías instantáneamente una línea recta, formando así la primera dimensión. Es como si el universo fuera un tren que solo puede viajar hacia adelante o hacia atrás sobre un único riel, sin poder desviarse.',
      'Ahora, si tomas esa línea recta y la desplazas lateralmente en una dirección perpendicular a sí misma, crearás una enorme superficie plana, como una inmensa hoja de papel extendida hasta el infinito. Esta es nuestra conocida segunda dimensión, un mundo donde los seres solo podrían deslizarse como manchas de tinta, yendo de arriba abajo o de izquierda a derecha. Piensa en esto como en la clásica pantalla de un viejo videojuego arcade, donde los personajes pueden correr y saltar libremente, pero nunca pueden salir de la pantalla para acercarse o alejarse de ti.',
      'Para dar el gigantesco salto hacia la tercera dimensión, que es el cómodo espacio geométrico que habitamos y experimentamos a diario, debemos tomar ese papel plano y apilarlo infinitamente hacia arriba o hacia abajo. Al ganar esa nueva libertad de movimiento, construimos la profundidad espacial, formando cubos y esferas voluminosas. Es como pasar de mirar silenciosamente una vieja fotografía bidimensional, a poder caminar maravillado alrededor de una impresionante escultura de mármol en medio de un enorme museo lleno de detalles físicos asombrosos.',
      'Pero la mente humana nunca se detiene. En el siglo diecinueve, un brillante pensador llamado Charles Howard Hinton intentó valientemente obligar a nuestro cerebro a visualizar una misteriosa cuarta dimensión espacial que se extendiera perpendicularmente a nuestro mundo en una dirección inconcebible. Él introdujo por primera vez en el año 1888 la fascinante palabra "teseracto" para describir cómo se vería un hipercubo cuatridimensional, algo tan exótico y complejo como un fantasma geométrico que desafía todas las reglas de nuestra percepción.',
      'Visualizar un genuino hipercubo es un ejercicio tan asombrosamente complicado para nuestra mente primate que incluso el genio surrealista Salvador Dalí se obsesionó con esta geometría sagrada. En 1954, pintó magistralmente la célebre obra "Corpus Hypercubus", representando el despliegue tridimensional de un teseracto divino. Imagina que el hipercubo proyecta una extraña sombra en nuestro mundo tridimensional, de la misma manera en que tú proyectas una sombra plana en el suelo; observando sus complejas sombras, logramos atisbar dimensiones superiores ocultas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la inolvidable escena culminante de la película Interstellar, el intrépido astronauta Cooper cae vertiginosamente a través del inescrutable horizonte de sucesos para acabar sumergiéndose directamente dentro de una asombrosa estructura tridimensional fabricada con el propósito específico de permitirle visualizar y comprender un genuino espacio cuatridimensional de manera intuitiva y segura, sin que su mente estalle ante la incomprensibilidad de las hiperdimensiones infinitas del misterioso teseracto.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para comprender cómo un teseracto despliega su complejidad matemática en nuestro reducido espacio, puedes imaginar el proceso inverso: si desenrollas una caja de cartón tridimensional cortando todas sus aristas, obtendrás una figura cruzada de seis cuadrados bidimensionales pegados sobre el suelo plano. Siguiendo exactamente la misma regla matemática, si desdoblaras un inmenso teseracto hiperdimensional, obtendrías un conjunto entrelazado de ocho cubos tridimensionales proyectándose misteriosamente dentro de nuestro entorno habitual.' },
    ],
    fact: 'La deslumbrante arquitectura teórica y conceptual que subyace detrás de la existencia geométrica del enigmático hipercubo fue tan meticulosamente desarrollada por matemáticos del siglo pasado, que resulta asombroso constatar que mucho antes de poseer los avanzados gráficos computacionales modernos para generar su retorcida forma, científicos de la época ya calculaban fielmente a mano su intrincado número exacto de vértices, aristas y complejas caras hiperdimensionales invisibles para nosotros.',
  },
  {
    id: 'quinta-dimension',
    title: 'La Quinta Dimensión',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m5/btn_quinta.jpg',
    image: '/assets/interstellar/infographic_m5/hero_quinta.jpg',
    content: [
      'En nuestra experiencia cotidiana y rutinaria, siempre sentimos que el tiempo avanza implacablemente hacia el futuro sin detenerse jamás, como una flecha imparable y destructiva que solo puede apuntar en una única dirección obligatoria. Pero cuando los físicos teóricos más avanzados comienzan a estudiar y analizar las matemáticas extremas del universo bajo la lupa rigurosa de la relatividad cuántica, se ven forzados a considerar la asombrosa posibilidad de que nuestro conocido fluir temporal podría ser tratado matemáticamente como una verdadera quinta dimensión espacial.',
      'El primero en proponer revolucionariamente la imperiosa necesidad de añadir secretamente dimensiones extras al tejido cósmico fue el brillante matemático Theodor Kaluza en el muy lejano año de 1921. Su objetivo inmenso y ambicioso no era jugar frívolamente con conceptos abstractos sin sentido, sino intentar desesperadamente unificar y casar matemáticamente la pesada fuerza de la gravedad descubierta por Einstein, con la chispeante fuerza del electromagnetismo, demostrando que ambas fuerzas son diferentes perspectivas de una misma energía primordial en dimensiones altísimas.',
      'Para que la teoría de Kaluza pudiera funcionar en el mundo físico y no solo en pizarras, el sagaz físico Oskar Klein propuso audazmente en 1926 una respuesta fascinante a un gran problema: ¿dónde demonios está escondida y oculta esa famosísima e imperceptible quinta dimensión que no podemos ver? Klein argumentó con gran ingenio y genialidad científica que esta asombrosa dimensión extra está extremadamente enrollada, doblada y compactada sobre sí misma a escalas microscópicas tan ridículamente diminutas que resulta absolutamente invisible para nuestros enormes ojos tridimensionales.',
      'Imagina con todo detalle que te encuentras observando a lo lejos un delgadísimo e insignificante cable eléctrico que cuelga silencioso entre dos altísimos postes de luz. Desde tu distancia en el suelo terrestre, el delgado cable te parecerá indudablemente una simple línea unidimensional que solo tiene un largo apreciable. Sin embargo, si fueras una diminuta hormiga caminando pacientemente sobre él, descubrirías que ese inmenso cable también posee un contorno circular y curvo; es decir, tiene secretamente una dimensión extra escondida a plena vista en las escalas fundamentales.',
      'De una manera profundamente similar a esa reveladora analogía de la trabajadora hormiga y el cable eléctrico distante, nosotros los imponentes seres humanos vivimos caminando por el universo tridimensional ignorando casi de forma total las majestuosas dimensiones superiores enrolladas. Solo cuando nos acercamos a las incomprensibles y extremas condiciones matemáticas de la mecánica cuántica o exploramos la devastadora fuerza aplastante del interior de los más colosales agujeros negros descubrimos que esta elusiva quinta dimensión es absolutamente necesaria y vital.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Dentro de las indescifrables y laberínticas paredes brillantes del teseracto construido magistralmente por la entidad evolucionada del futuro, el desorientado Cooper descubre asombrado que el implacable y destructivo tiempo se ha transformado completamente en una robusta e interminable dimensión física transitable. Ya no está prisionero del eterno presente, sino que puede literalmente caminar saltando a través de pasillos observando de forma omnisciente todos los momentos simultáneos de la habitación infantil de Murph.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Aunque la teoría original formulada por los pioneros Kaluza y Klein presentaba innegables defectos matemáticos que frustraron al propio Albert Einstein durante años, su valiente propuesta abrió de par en par una gigantesca puerta teórica inexplorada. Sin su revolucionaria idea inicial del espacio enrollado y compactado en bucles diminutos, jamás habríamos concebido ni desarrollado las espectaculares teorías modernas de las supercuerdas, que hoy intentan explicar cada misterio fundamental del universo observable.' },
    ],
    fact: 'La escala infinitesimal y ridículamente diminuta en la que el brillante y visionario físico Oskar Klein propuso y defendió fehacientemente que se ocultaba enrollada nuestra elusiva quinta dimensión espacial teórica es mundialmente conocida por los grandes físicos modernos como la inconmensurable "Escala de Planck"; una longitud matemática tan microscópica (diez a la potencia de menos treinta y cinco metros) que un solo átomo parecería infinitamente colosal y gigantesco en absurda y grotesca comparación directa.',
  },
  {
    id: 'teoria-cuerdas',
    title: 'Cuerdas Vibrantes',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m5/btn_cuerdas.jpg',
    image: '/assets/interstellar/infographic_m5/hero_cuerdas.jpg',
    content: [
      'A lo largo de muchísimas décadas gloriosas del pensamiento humano, los mejores físicos teóricos nos enseñaron pacientemente que todas las cosas tangibles que nos rodean están construidas a partir de diminutas e invisibles partículas elementales redondas, como pequeñísimas canicas fundamentales. Pero una de las teorías más complejas y hermosas jamás creadas, la famosa Teoría de Cuerdas, destruye por completo este aburrido concepto y afirma categóricamente que en el mismísimo y diminuto corazón del universo físico no existen rígidas esferas sólidas de materia inerte y vacía.',
      'En vez de encontrar las esperadas partículas elementales diminutas, si pudiéramos hacer un zoom infinito y gigantesco hacia el núcleo más ínfimo de los quarks y electrones misteriosos, veríamos maravillados unas bellísimas y microscópicas cuerdas cerradas o abiertas, extremadamente delgadas e infinitamente tensas que vibran y oscilan incesantemente de forma frenética. Es exactamente como si las entrañas invisibles de nuestro vasto universo fueran en realidad un bellísimo y melódico violín cósmico microscópico cuyas diminutas cuerdas primordiales generan perpetuamente toda la materia densa.',
      'La inmensamente poética e ilustrativa analogía del instrumento de cuerda es simplemente perfecta, exacta y profundamente esclarecedora. De la misma manera en que el complejo grosor, la tensión mecánica y la veloz vibración resonante de una brillante cuerda de guitarra acústica determinan si tocará una vibrante nota alta o una lúgubre nota grave y profunda, la peculiar vibración matemática de estas diminutas cuerdas cósmicas primordiales determina si en el universo observable se manifestará materialmente un veloz fotón, un electrón giratorio o un misterioso gravitón huidizo.',
      'Sin embargo, para que esta inmensamente bella sinfonía cósmica pueda funcionar verdaderamente sin colapsar instantáneamente ni producir desastrosos errores teóricos llenos de letales infinitos matemáticos incomprensibles, el riguroso modelo teórico requiere obligatoriamente un escenario espacial mucho más gigantesco y amplio para albergar tantas vibraciones complejas. Estas cuerdas no pueden limitarse a bailar pobremente en nuestras tres simples dimensiones; requieren de un vasto escenario cósmico oculto compuesto por un mínimo indispensable de diez dimensiones físicas totales.',
      'En este exótico y asombroso universo orquestal, el espacio-tiempo alberga nueve enormes dimensiones espaciales y una solitaria dimensión temporal, conformando así las misteriosas diez dimensiones teóricas necesarias. Puesto que nuestros limitados cerebros primates y rudimentarios sentidos biológicos solo pueden captar tres evidentes direcciones espaciales, las restantes seis dimensiones sobrantes deben obligatoriamente estar retorcidas, compactadas y ocultas sobre sí mismas, adoptando maravillosas geometrías matemáticas microscópicas que apenas comienzan a ser descifradas arduamente.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'A lo largo de la inmensamente densa trama científica que sustenta de manera asombrosa a toda la narrativa intergaláctica de la épica espacial Interstellar, la revolucionaria y fundamental idea de que el inmenso universo no está restringido a nuestras pobres, mundanas y limitadas dimensiones habituales perceptibles proporciona indiscutiblemente la justificación física clave para las más extremas rarezas temporales y los puentes espaciales presenciados y padecidos por los valientes y obstinados astronautas exploradores de la lejana NASA.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para intentar procesar mentalmente el incomprensible grado de absoluta pequeñez microscópica dimensional en la que se supone que deberían existir estas místicas cuerdas vibrantes primordiales, piensa de la siguiente manera comparativa: si mágicamente expandiéramos un diminuto átomo de hidrógeno hasta que alcanzara el colosal tamaño titánico de todo nuestro brillante sistema solar observable actual, una sola cuerda vibrante incrustada dentro de este enorme ente apenas alcanzaría a medir el tamaño normal de un árbol mediano.' },
    ],
    fact: 'Estas asombrosamente intrincadas y misteriosas dimensiones invisibles y fuertemente enrolladas no son simples bolitas esféricas y redondas de espacio apretado sin ningún chiste ni interés aparente; los más avanzados geómetras y matemáticos teóricos especulan firmemente que adoptan bellas, alucinantes y muy complejas formas multidimensionales entrelazadas geométricamente, llamadas por ellos como los insondables y espectaculares "Espacios de Calabi-Yau", los cuales determinan absolutamente cada una de las inmutables propiedades físicas.',
  },
  {
    id: 'branas-universo',
    title: 'Universos en Rebanadas',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m5/btn_branas.jpg',
    image: '/assets/interstellar/infographic_m5/hero_branas.jpg',
    content: [
      'Una vez que las complejas matemáticas fundamentales de las teorías superiores superaron ampliamente la idea estricta de las solitarias cuerdas cósmicas unidimensionales microscópicas, los físicos teóricos abrieron audazmente las enormes puertas del conocimiento a estructuras geométricas aún mucho más grandes, masivas y formidables. En 1999, dos mentes brillantísimas, Lisa Randall y Raman Sundrum, publicaron estudios trascendentales introduciendo al mundo científico la extraña y revolucionaria noción cosmológica de que nuestro universo entero podría no ser más que una gigantesca y delgada lámina incrustada.',
      'A estas vastas y sorprendentes superficies cósmicas hiperdimensionales se les otorga científicamente el extraño y sonoro nombre técnico moderno de "Branas" (un término moderno que deriva lógicamente de la familiar palabra membrana elástica). Imagina mentalmente que nuestro vasto cosmos completo, con todas sus billones de brillantes estrellas fulgurantes y misteriosos agujeros negros, es tan solo una ínfima y pequeña rebanada delgadísima cortada de un pan inmenso; una finísima brana que flota de manera solitaria dentro de un entorno hiperdimensional inconmensurable, vacío y muchísimo mayor.',
      'Este gigantesco, inabarcable e impensable entorno colosal multidimensional que rodea incesantemente y envuelve infinitamente a nuestra pequeña brana tridimensional se le conoce en la alta cosmología teórica con el impactante nombre oficial de "El Bulk" o "El Volumen". Si esta descabellada teoría científica llegara a ser verdaderamente correcta y real, podría significar asombrosamente que existen millones de otras gigantescas branas cósmicas vecinas flotando infinitas, las cuales alojarían universos paralelos inabarcables, tan increíblemente cercanos al nuestro pero absolutamente invisibles y aislados.',
      'Lo verdaderamente alucinante del genial modelo teórico cosmológico de Randall-Sundrum, es que propone firmemente una regla matemática universal sumamente restrictiva sobre la naturaleza física fundamental: absolutamente todos los componentes básicos de la materia conocida tradicional (los electrones rápidos, la resplandeciente luz solar fotónica y los pesados quarks nucleares) están fuerte y perpetuamente pegados e irremediablemente sujetos por los extremos a nuestra propia e insignificante brana casera, impidiéndoles escapar de ella. No pueden cruzar de ningún modo hacia el oscuro abismo del Bulk.',
      'Es por este inmenso e insalvable muro de contención dimensional invisible que nosotros mismos, meros seres frágiles biológicos y terrenales construidos de átomos simples pegados férreamente a nuestra modesta rebanada de pan universal, no podemos de ninguna manera posible visualizar, percibir o interactuar físicamente de forma evidente con todo el resto infinito del voluminoso pan hiperdimensional superior, a pesar de que este último pueda estar matemáticamente existiendo a una minúscula fracción de milímetro cósmico de distancia invisible; como si estuviéramos encerrados en una gran prisión.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la grandiosa y colosal película épica Interstellar que desafía nuestra imaginación humana constantemente, la palabra técnica y científica "Bulk" se menciona abierta y explícitamente y con gran respeto reverencial por parte de los dedicados astronautas de la NASA cada vez que se refieren al exótico e inmenso espacio inabarcable hiperdimensional inexplorado a través del cual logran construir magistralmente y cruzar el mágico y esférico agujero de gusano para atajar enormes distancias viajando valientemente y desesperadamente hacia otras galaxias.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para intentar asimilar la extraña naturaleza aprisionadora e limitante de estas exóticas y masivas membranas cósmicas, piensa en la oscura tinta impresa de una página aburrida de libro. Las palabras de este texto están atrapadas permanentemente en 2D. No pueden levantarse físicamente hacia el techo ni salir flotando del papel. Nosotros somos la triste tinta biológica viviendo prisionera en una gran página en blanco tridimensional gigantesca llamada universo observable material, ignorando todo el aire invisible de la habitación inmensa.' },
    ],
    fact: 'La fascinante y revolucionaria propuesta teórica científica moderna sugerida, defendida e investigada activamente sin tregua en la actualidad de que existen de forma palpable otras branas dimensionales invisibles colindantes no es en absoluto una simple fantasía o un trillado guion cinematográfico rebuscado; fue postulada originalmente por matemáticos eminentes para intentar resolver el colosal problema de la asombrosa debilidad de la gravedad universal frente a otras fuerzas poderosas. Esta elaborada y compleja teoría formal ha sido profunda y exhaustivamente revisada en miles de artículos.',
  },
  {
    id: 'gravedad-transdimensional',
    title: 'La Gravedad Cruza Dimensiones',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m5/btn_gravedad.jpg',
    image: '/assets/interstellar/infographic_m5/hero_gravedad.jpg',
    content: [
      'De todas las misteriosas y poderosas fuerzas cósmicas primordiales que logran mantener fuertemente unido y estructurado al vasto universo que habitamos día a día rutinariamente, la famosa e imponente fuerza masiva de la gravedad guarda celosa y herméticamente un secreto matemático oscuro, peculiar y profundamente desconcertante para la ciencia actual. Resulta sorpresivo descubrir que la gravedad masiva, comparada minuciosamente con fuerzas poderosas como el repulsivo electromagnetismo relampagueante que todos hemos experimentado de alguna manera en la Tierra habitual, es sorprendentemente frágil y sutil.',
      'Es literalmente tan absurdamente débil en su inmensa y colosal intensidad de atracción en la realidad tangible del mundo cotidiano que resulta sumamente decepcionante en las comparaciones más evidentes. Piensa por tan solo un fugaz momento revelador: todo nuestro gigantesco y pesado planeta Tierra está intentando continuamente jalar hacia su ardiente núcleo a un pequeñísimo y brillante clip metálico de oficina con muchísima fuerza de gravedad, pero basta usar un minúsculo, barato e insignificante imán común de refrigerador para arrebatarle el clip magnéticamente, demostrando la absurda debilidad terrestre.',
      'Para dar una ingeniosa, lógica y elegante respuesta definitiva y totalmente revolucionaria a este milenario y frustrante enigma científico, los avanzados modelos de cuerdas introdujeron un concepto bellísimo que lo cambió absolutamente todo en nuestra percepción. Ya sabíamos que las partículas y la luz eran cuerdas pegadas fuertemente a la brana. Pero el teórico gravitón, la partícula invisible y fundamental que transmite el tirón de gravedad, es radicalmente distinto: es una cuerda que forma un bucle cerrado y redondo sin extremos libres, como una banda elástica inmaterial que no tiene forma de atorarse o clavarse.',
      'Por no poseer lógicamente ni físicamente absolutamente ningún ancla restrictiva pegajosa dimensional en sus minúsculas formas cerradas, los gravitones cerrados pueden maravillosa y milagrosamente liberarse y "filtrarse" imperceptible pero indeteniblemente hacia el inconmensurable abismo gigantesco invisible que conforma en su majestuosa oscuridad al inabarcable Bulk hiperdimensional que nos rodea silenciosamente. Por lo tanto, nuestra familiar y cercana gravedad terrestre observada y medida es débil solo porque su intensa energía original enorme se está desangrando y derramando hacia los vastos y gélidos universos contiguos e invisibles.',
      'Esto implica fascinante y espectacularmente que, de absolutamente y sin ninguna excepción todas las incontables fuerzas de la vibrante e indomable naturaleza terrenal conocidas hasta el día de hoy, solo la imponente e invisible gravedad curva tiene la rara, exótica y singularísima capacidad física y matemática de poder cruzar implacablemente saltando enormes distancias dimensionales a través de toda la misteriosa complejidad de la quinta dimensión y lograr establecer un contacto físico notorio de manera remota con otros inexplorados y oscuros universos paralelos hipotéticos habitando en branas invisibles.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Este exactísimo y profundo y asombroso detalle científico real extraído minuciosamente y de manera fiel y devota directamente desde el inabarcable corazón de la revolucionaria Teoría de Cuerdas avanzada es el núcleo narrativo central de toda la increíble película. Como la gravedad salta veloz y elegantemente entre dimensiones con suma soltura y facilidad, es la única fuerza física misteriosa transdimensional capaz real y efectivamente de poder cruzar con seguridad la abismal barrera matemática del teseracto hiperdimensional para empujar de manera remota libros viejos polvorientos y agujas de reloj oxidadas en la Tierra.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para entender verdaderamente y lograr apreciar mejor la increíble y abismal debilidad de la gravedad observada frente al electromagnetismo universal brillante, simplemente necesitas observar los escalofriantes datos científicos rigurosos y exactos: el poderoso electromagnetismo es una incomprensible cantidad de diez a la potencia de treinta y seis veces muchísimo más potente, brutal y letal que la humilde gravedad que nos mantiene pegados al suelo. Todo ese masivo poder gravitacional teórico enorme simplemente se estaría escurriendo de manera continua hacia las oscuras profundidades incomprensibles del Bulk esotérico.' },
    ],
    fact: 'La profunda, exhaustiva, muy matemática y meticulosa investigación científica moderna de los grandes expertos y meticulosos físicos Lisa Randall y Raman Sundrum nos demuestra brillantemente, elegantemente y con un hermoso y contundente rigor formal que la imponente y poderosa fuerza bruta gravitacional parece concentrarse muchísimo más fuertemente del otro misterioso y oscuro lado del Bulk hiperdimensional colosal y exótico. Es algo asombroso pensar matemáticamente que nuestra misteriosa vecina dimensional más cercana e inmediata podría llegar a ser indudablemente una inmensamente inabarcable brana masiva e invisible que atrapa esta colosal fuerza.',
  },
  {
    id: 'teseracto-cooper',
    title: 'El Teseracto de Cooper',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m5/btn_teseracto.jpg',
    image: '/assets/interstellar/infographic_m5/hero_teseracto.jpg',
    content: [
      'En el desgarrador, dramático y deslumbrante punto de máxima y extrema tensión climática y asfixiante cúspide emocional apoteósica de toda la cinta espectacular, Cooper toma la audaz y final decisión heroica y suicida de simplemente dejarse soltar y ser devorado, tragado y arrastrado brutalmente por la gigantesca e incomprensible inmensidad oscura e infinita del destructivo y aterrador horizonte de sucesos gigantesco e inigualable de Gargantúa, sumergiéndose intrépidamente hacia lo totalmente desconocido sin ninguna certeza matemática clara de si logrará sobrevivir o será completamente destrozado en partículas invisibles atómicas.',
      'En lugar de experimentar dolorosa y físicamente una muerte espantosa e indescriptible por medio de la brutal trituración gravitacional de fuerzas masivas teóricamente indomables llamada lúgubremente por los astrónomos científicos como "espaguetización" y ser desmembrado velozmente; maravillosamente Cooper aterriza abruptamente e ileso en el muy intrincado e incomprensible centro oscuro dentro del corazón de un deslumbrante teseracto resplandeciente gigantesco. Esta extraña y brillante maquinaria laberíntica cósmica infinita e imponente, es lógicamente una asombrosa construcción cuadridimensional que transforma todo el pasado y presente de forma simultánea e insólita para él.',
      'Todo el intrincado, minucioso e impresionantemente detalladísimo e increíble diseño visual asombroso que despliega bellamente e imponentemente el teseracto cúbico resplandeciente en la brillante y deslumbrante pantalla del cine no es simplemente fruto descontrolado e ignorante de la azarosa creatividad desbordada de Hollywood. Fue un grandioso e intenso trabajo increíblemente minucioso y meticulosamente ideado y estrictamente guiado de forma inquebrantable, matemática y seria por el célebre físico ganador del premio Nobel Kip Thorne para plasmar fielmente y de forma visualmente correcta un auténtico entorno matemático extraño de altísimas y laberínticas dimensiones superiores.',
      'Lo que el desconcertado y valiente astronauta humano extraviado presencialmente está intentando comprender presenciando con asombro con sus minúsculos ojos en esa luminosa estructura infinita es una inmensamente compleja proyección cósmica tridimensional de un ente enormemente hiperdimensional superior extraño. En este alucinante y retorcido y paradójico lugar laberíntico, el inmaterial y fluido tiempo fugaz ha sido físicamente transformado en una robusta e interminable dimensión espacial sólida que se manifiesta, desenrolla y existe de forma permanente ante él, exactamente y literalmente como si se tratara de una sólida y tangible biblioteca interminable y deslumbrante.',
      'De esta hermosa e inteligente y analítica forma, los misteriosísimos y bondadosos "Ellos" (los inescrutables, incomprensibles y enormemente avanzados y benévolos descendientes humanos y sabios de la quinta dimensión superior) logran maravillosamente proporcionarle heroicamente al rudimentario y primitivo cerebro asustado y primate de Cooper una ingeniosa, amable y maravillosa forma visual tridimensional y familiar que puede procesar para interactuar pacientemente con una inmensamente inabarcable y vasta realidad geométrica pentadimensional imposible de captar normalmente y visualmente sin caer rendido irremediablemente en la completa locura y el desespero incontrolable oscuro.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para poder establecer urgentemente y exitosamente una efímera comunicación bidireccional física y totalmente desesperada desde dentro de esa impenetrable y resplandeciente cárcel brillante del espacio hiperdimensional superior hacia nuestra vulnerable e indefensa habitación tridimensional y salvar finalmente y milagrosamente a toda la humanidad desesperada; él empuja veloz, desesperada e invisiblemente la arena y manipula firmemente pero con increíble fuerza y dolor infinito la única e indomable gravedad que puede trascender, y esto genera una extraña, mágica, invisible y minúscula arruga transdimensional sutil que tumba los polvorientos libros físicos pesados y voluminosos.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para comprender y asimilar profundamente el inmenso impacto visual e innovador de los brillantes efectos especiales creados por el prodigioso equipo genial y creativo de la película, su avanzado software debió lograr renderizar magistral y maravillosamente las complejas, intrincadas y bellísimas líneas rectas y curvas físicas tridimensionales extraídas minuciosamente a partir de pesadas y difíciles ecuaciones matemáticas puras reales, dibujando con asombrosa exactitud los enmarañados hilos abstractos del tiempo espacial y simulando con extremo cuidado científico y visual las fantasmales ondas gravitatorias saltando branas multidimensionales superiores de forma majestuosa.' },
    ],
    fact: 'Como una brillante e impresionante y deslumbrante anécdota y detalle histórico riguroso de la extenuante e impecable producción cinemática asombrosa, la vasta e interminable complejidad técnica del impresionante diseño del interior del teseracto representó un reto inmenso e inigualable. Literalmente y asombrosamente, construyeron físicamente y con gran esfuerzo humano en el inmenso set de filmación grandes secciones intrincadas de la extraña biblioteca infinita y usaron una abrumadora cantidad de cables mecánicos y proyecciones complejas con espejos inmensos, todo esto para minimizar el abusivo uso irresponsable de simples pantallas verdes y malos gráficos irreales.',
  },
  {
    id: 'mensaje-tiempo',
    title: 'Un Mensaje a Través del Tiempo',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m5/btn_mensaje.jpg',
    image: '/assets/interstellar/infographic_m5/hero_mensaje.jpg',
    content: [
      'El majestuoso e inigualable problema gigantesco y terrorífico con el que arranca toda la épica historia angustiosa espacial era muy simple pero aterrador: poder resolver a como dé lugar un inescrutable y oscuro misterio cuántico gravitacional y vital de física matemática abstracta o presenciar la lenta muerte terrenal. La ingeniosa científica Murph necesita los datos, y desesperado, su padre astronauta, sabiendo esto intensamente y sintiendo la enorme responsabilidad sobre sus anchos y fatigados hombros paternos, manipula audazmente la aguja del reloj familiar antiguo y codifica toda esta vital e invaluable información física cuántica enviando una serie binaria Morse golpeando valientemente la inamovible gravedad.',
      'A primera vista ingenua, escéptica o ignorante, todo este hermoso, emotivo y dramático asunto descabellado de que la fuerte e inquebrantable fuerza emocional del amor pueda literalmente y poéticamente lograr trascender maravillosamente el inclemente paso del indetenible tiempo y las inabarcables dimensiones espaciales sin límite puede llegar lógicamente a sonar y parecer simplemente como una ridícula e ilógica excusa pseudocientífica muy melosa, exagerada, empalagosa y artificial diseñada perezosamente para el cine fantástico convencional de Hollywood actual que siempre busca una manera forzada e inmerecida para generar lágrimas baratas emotivas e instantáneas en el dócil espectador sensible.',
      'Pero, oculto minuciosamente e inteligentemente debajo de toda la melosa e indudablemente hermosa superficie romántica, sentimental y cinematográficamente poética del abrumador y deslumbrante final glorioso y trágico visualmente, yace asombrosa y espléndidamente un inmenso y profundamente sólido, brillante y audaz corazón firme, riguroso e inamovible de genuina ciencia astrofísica pura, matemática y sumamente fascinante de dimensiones superiores. Es una demostración espectacular, asombrosa y única de un entendimiento muy audaz, serio e impecable de las mecánicas secretas teóricas del inabarcable y extraño cosmos oscuro infinito que los asombrosos genios físicos actuales debaten.',
      'De una forma absoluta, definitiva y real en el majestuoso cosmos e insondable espacio profundo innegable y comprobable científicamente; gracias a las misteriosas ondas espaciales descubiertas empíricamente y validadas por los mejores, las enormes arrugas espaciales de la implacable y desbordante gravedad pueden verdaderamente y teóricamente, sin violar de forma absurda ni por asomo ninguna letal y sagrada ley fundamental e inquebrantable física establecida y dura portar y transportar velozmente inmensos, complejos y variados paquetes de la información matemática pura desde las galaxias lejanísimas hacia nosotros, revelándonos de manera fiel algún secreto antiguo inexplorado y ancestral.',
      'En el abrumador desenlace final climático de la cinta espectacular, la lejana e imposible comunicación entre la extraña dimensión y la oscura tierra triste no es telepatía mágica y fantasiosa ridícula. Cooper transmite su mensaje desesperado mediante pequeñas pero eficaces y precisas anomalías gravitacionales finamente dirigidas a un antiguo reloj analógico terrenal obsequiado, logrando dictar minuciosamente los esquemas cuánticos completos de las entrañas más oscuras e impenetrables del voraz agujero negro Gargantúa, todo para que la joven e ingeniosa mujer y eminente científica Murph complete la fórmula final y pueda al fin resolver el enigmático problema que salvará la diezmada raza humana del lúgubre polvo asfixiante.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para acentuar inmensamente la asombrosa realidad dramática humana de que la frágil y deslumbrante vida en nuestro amado y vasto universo oscuro no es meramente biología inerte o material de carbono frágil, el propio astronauta protagonista repite firmemente y a gritos apagados que el inmenso amor paterno filial verdadero y la conexión profunda existencial es la única, verdadera e invencible e imponente e invisible cosa capaz de cruzar valientemente y sin desvanecerse en el terrible abismo inabarcable todo el complejo enjambre laberíntico de las impenetrables dimensiones temporales que nos alejan física y materialmente con crueldad a todos de los seres queridos.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para traducir y asimilar de forma técnica y racional la hermosa pero poética comunicación gravitacional y misteriosa pentadimensional que desafía enormemente a la mente humana cerrada y limitante, piensa que de manera exacta y similar a como nuestro revolucionario y moderno internet veloz transmite indudablemente complejos mensajes en código oculto y ordenado a través de invisibles microondas fotónicas que parpadean rápidamente por el enorme cielo oscuro y frío espacial; la enorme y colosal onda de masa distorsionada ondulatoria gravitatoria e imponente también puede teóricamente llegar a transportar rigurosamente codificada en sus pulsos un inmenso y vital acervo de conocimiento estelar innegable.' },
    ],
    fact: 'Después del exitosísimo y colosal lanzamiento comercial global a nivel internacional y del asombroso estreno apoteósico de la aclamada obra audiovisual impecable del ingenioso Nolan, numerosos e importantes, reputados e internacionalmente conocidos científicos renombrados confesaron su enorme admiración asombrosa. Destacaron fuertemente que visualizar a un torpe ser tridimensional utilizando creativamente y audazmente fuertes e incontrolables ondas de choque gravitacionales pentadimensionales indomables saltando entre vastos y extraños universos paralelos invisibles para comunicarse remotamente mediante perturbaciones analógicas es la premisa astrofísica narrativa más brillante, arriesgada y sumamente atrevida de la ciencia ficción moderna.',
  },
];

// ─── Gargantua Video Background ─────────────────────────────────────────────
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

// ─── Interstellar Header ──────────────────────────────────────────────────────
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

// ─── Organic Node Button ─────────────────────────
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
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.7,
              fontSize: '0.92rem',
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

// ─── Main Component ──────────────────────────────────────────────────────────
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            minHeight: '280px', // hero layout min height
          }}>
            {/* Hero Image Section */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
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
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(10,12,30,0.9) 0%, transparent 30%, transparent 70%, rgba(10,12,30,0.4) 100%)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,12,30,1) 0%, transparent 40%)',
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
                      fontSize: '2rem',
                      fontWeight: 800,
                      margin: 0,
                      color: activeNode.color,
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)',
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
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                  }}>
                    {activeNode.content.map((para, idx) => (
                      <p key={idx} style={{ margin: 0 }}>
                        {idx === 0 && (
                          <span style={{ 
                            color: activeNode.color, 
                            fontSize: '1.4em', 
                            lineHeight: 1, 
                            fontWeight: 'bold', 
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
                      fontSize: '0.95rem', 
                      lineHeight: 1.6, 
                      color: 'rgba(255,255,255,0.85)',
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
            Bibliografía y Fuentes
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '0.8rem'
          }}>
            {BIBLIOGRAPHY.map((item, idx) => (
              <li key={idx} style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: '0.8rem',
                lineHeight: 1.4,
                display: 'flex',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#FF6B35' }}>•</span>
                {item}
              </li>
            ))}
          </ul>
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
