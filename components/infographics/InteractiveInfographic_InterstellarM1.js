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
  'gravedad-newton': [DecoOrbit, DecoSpacetimeGrid, DecoBlackHole],
  'einstein-1915': [DecoEqualSign, DecoSpacetimeGrid, DecoOrbit],
  'curvatura-espaciotiempo': [DecoSpacetimeGrid, DecoBlackHole, DecoWaveRipple],
  'geodesicas': [DecoOrbit, DecoSpacetimeGrid, DecoWaveRipple],
  'lentes-gravitacionales': [DecoBlackHole, DecoSpacetimeGrid, DecoEqualSign],
  'ondas-gravitacionales': [DecoWaveRipple, DecoBlackHole, DecoOrbit],
  'gps-relatividad': [DecoOrbit, DecoWaveRipple, DecoEqualSign],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Einstein, A. (1915). Die Feldgleichungen der Gravitation, Sitzungsberichte der Preussischen Akademie der Wissenschaften',
  'Misner, C., Thorne, K., Wheeler, J. (1973). Gravitation, W.H. Freeman',
  'Abbott, B.P. et al. (2016). "Observation of Gravitational Waves from a Binary Black Hole Merger", Physical Review Letters, 116(6)',
  'Will, C.M. (2014). "The Confrontation between General Relativity and Experiment", Living Reviews in Relativity, 17(4)',
  'Dyson, F.W., Eddington, A.S., Davidson, C. (1920). "A Determination of the Deflection of Light by the Sun\'s Gravitational Field", Phil. Trans. Royal Society A, 220',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'gravedad-newton',
    title: 'La Gravedad de Newton',
    color: '#F4A261',
    btnImage: '/assets/interstellar/infographic_m1/btn_newton.jpg',
    image: '/assets/interstellar/infographic_m1/hero_newton.jpg',
    content: [
      'En 1666, un joven Isaac Newton estaba sentado bajo un manzano en su granja familiar, refugiándose de la gran plaga de Londres. Al ver caer una manzana, tuvo una de las revelaciones más grandes de la historia de la ciencia: la misma fuerza invisible que jalaba la manzana hacia el suelo era exactamente la misma fuerza que mantenía a la Luna atrapada en su órbita alrededor de la Tierra, evitando que saliera volando hacia el espacio exterior oscuro y frío.',
      'Newton llamó a esta fuerza "Gravedad", y propuso que todos los objetos en el universo se atraen entre sí simplemente por tener masa. Es como si cada planeta, estrella y persona tuviera pequeños ganchos invisibles que tiran de todo lo demás. Cuanto más masivo es el objeto, más fuerte tira. Por eso, el Sol, que es gigantesco, puede mantener atrapados a todos los planetas del sistema solar en sus pistas orbitales, como si estuvieran atados a una cuerda invisible.',
      'Su famosa ley de la gravitación universal, descrita matemáticamente como F=GMm/r², explicaba con asombrosa precisión cómo se mueven las cosas. Podía predecir las mareas del océano y la trayectoria precisa de las balas de cañón. Con esta fórmula, los científicos lograron entender casi todos los movimientos del cielo. Era como haber encontrado el manual de instrucciones secreto del universo, escrito en el idioma de las matemáticas y la geometría.',
      'Sin embargo, la fórmula de Newton tenía un pequeño gran misterio que no lograba resolver: la órbita de Mercurio. Este pequeño planeta, el más cercano al Sol, trazaba una elipse imperfecta. Cada vuelta que daba, su órbita se desplazaba un poquito, dibujando algo parecido a los pétalos de una flor, un fenómeno que los astrónomos llaman "precesión". La teoría de Newton sencillamente no podía explicar por qué la órbita de Mercurio se comportaba de esta manera tan extraña.',
      'Además, había algo aún más profundo y desconcertante: Newton podía calcular *cuánta* gravedad existía, pero no tenía idea de *cómo* funcionaba realmente esta atracción a través del espacio vacío. ¿Cómo podía el Sol tirar de la Tierra desde millones de kilómetros de distancia sin que nada físico los conectara? Fue una magia matemática asombrosa que dominó la ciencia durante más de 200 años, hasta que un joven llamado Albert Einstein decidió reescribir las reglas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando el profesor Brand y Murph están tratando de resolver la ecuación de la gravedad en su gran pizarra en la Tierra, se enfrentan a un problema que Newton nunca imaginó. Necesitan entender cómo manipular la gravedad para levantar estaciones espaciales gigantes del suelo, un salto más allá de lo que las fórmulas de Newton permitían y que requiere resolver las fallas de la relatividad cuántica.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La historia de la manzana es real, aunque no le cayó exactamente en la cabeza. Newton se la contó a su biógrafo William Stukeley en 1726, después de cenar en su casa de Londres. Lo fascinante es que Newton usó este hecho cotidiano para unificar el cielo y la Tierra bajo una sola y magnífica ley de la física universal.' },
    ],
    fact: 'Aunque hoy sabemos que Newton no tenía toda la razón sobre la naturaleza profunda del espacio, su matemática de F=GMm/r² es tan increíblemente útil, elegante y precisa que la NASA la sigue usando hoy en día sin dudar para calcular las trayectorias de las sondas espaciales que viajan hacia Marte, Júpiter y otros planetas del sistema solar, demostrando la inmortalidad y el poder de su genio científico.',
  },
  {
    id: 'einstein-1915',
    title: 'Einstein Cambia Todo',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m1/btn_einstein.jpg',
    image: '/assets/interstellar/infographic_m1/hero_einstein.jpg',
    content: [
      'El 25 de noviembre de 1915, después de diez años de intenso agotamiento mental y cálculos fallidos, Albert Einstein presentó ante la Academia Prusiana de las Ciencias una teoría que cambiaría nuestra comprensión del universo para siempre: la Teoría de la Relatividad General. Einstein no solo hizo una pequeña corrección a Newton; destruyó por completo la idea de que la gravedad era una "fuerza" mágica que tiraba de los planetas a través del inmenso espacio vacío.',
      'En lugar de hilos invisibles, Einstein propuso que el universo está formado por un tejido flexible y elástico de cuatro dimensiones al que llamó "espacio-tiempo". Es como si todo el universo fuera un gigantesco trampolín de goma invisible. Cualquier objeto que tenga masa, desde una pequeña manzana hasta el colosal Sol, se asienta sobre este trampolín cósmico hundiendo su superficie y creando una gran depresión a su alrededor, alterando por completo la geometría de su entorno.',
      'Entonces, según las ideas de Einstein, la Tierra no órbita alrededor del Sol porque una extraña y mística fuerza la esté jalando a distancia, sino porque el Sol crea un "hoyo" tan profundo en el trampolín del espacio-tiempo que nuestro pequeño planeta simplemente rueda por el borde inclinado de esa curva gravitatoria, como una canica girando dentro de un gran tazón de sopa cósmico. Esta brillante idea conectaba la materia física directamente con la geometría celestial.',
      'Una de las primeras cosas que hizo Einstein con su nueva teoría fue aplicarla al mayor dolor de cabeza de la astronomía de su época: la órbita rebelde de Mercurio. Cuando usó sus nuevas ecuaciones del espacio curvo, calculó el movimiento exacto del planeta. ¡El resultado fue perfecto! Logró explicar de manera matemática la precesión de Mercurio que la vieja fórmula de Newton había fallado estrepitosamente en resolver. Fue un momento de profundo asombro para la ciencia.',
      'Con este asombroso descubrimiento revolucionario, Einstein reescribió por completo las reglas de cómo entendemos nuestro lugar entre las estrellas distantes. La gravedad dejó de ser una atracción misteriosa y oculta para convertirse en la forma geométrica misma del universo que habitamos. Esta revelación asombrosa no solo solucionó el famoso problema de Mercurio, sino que abrió la puerta gigante a conceptos mucho más salvajes, como los devoradores agujeros negros intergalácticos.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El concepto de la gravedad como curvatura extrema del espacio-tiempo es fundamental en la trama de la cinta. Cuando la nave Endurance viaja a través del esférico agujero de gusano o se acerca valientemente a la enorme e inconmensurable masa del agujero negro Gargantúa, nuestros heroicos exploradores espaciales están literalmente surfeando por las partes más profundamente curvadas de este "trampolín" cósmico en todo el universo.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Cuando Einstein vio incrédulo que sus revolucionarias ecuaciones predecían exactamente la escurridiza órbita de Mercurio, le escribió emocionado a un colega amigo cercano diciendo que estuvo "completamente fuera de sí por la inmensa alegría y la emoción durante días enteros". Literalmente sintió violentas palpitaciones de asombro en el corazón al darse cuenta de que había descubierto la verdad del cosmos.' },
    ],
    fact: 'Las famosas y majestuosas "ecuaciones de campo" desarrolladas por Albert Einstein son un compacto y elegante conjunto de diez ecuaciones que, aunque se pueden escribir de manera resumida en una sola línea corta y vistosa (Gμν + Λgμν = 8πG/c4 Tμν), resultan ser tan increíblemente complejas de resolver matemáticamente a mano que tuvieron que pasar muchísimas décadas antes de que los científicos lograran encontrar soluciones completas para escenarios más complicados que una simple estrella solitaria.',
  },
  {
    id: 'curvatura-espaciotiempo',
    title: 'El Espacio se Curva',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m1/btn_curvatura.jpg',
    image: '/assets/interstellar/infographic_m1/hero_curvatura.jpg',
    content: [
      'Para entender realmente cómo funciona la majestuosa Relatividad General de Einstein, necesitas imaginar algo que tus ojos orgánicos no pueden ver directamente. Piensa en el espacio y el tiempo no como un escenario vacío y rígido de teatro donde ocurren las cosas mundanas, sino como una increíble tela de spandex, un material muy elástico y estirable que llena todo el cosmos. Este dinámico tejido cósmico responde velozmente a todo lo que toca, doblándose y estirándose.',
      'Imagina con cuidado que tomas una gigantesca y pesada bola de boliche de metal y la pones justo en el centro exacto de ese trampolín estirado e invisible. Inmediatamente, la enorme bola se hunde en la tela, creando una pronunciada hondonada redonda a su alrededor. Ese hoyo metafórico representa con gran precisión lo que hace verdaderamente nuestro ardiente Sol en el espacio real: su inmensa masa curva y dobla el tejido del espacio-tiempo a su alrededor constantemente.',
      'Ahora, imagina alegremente que lanzas una pequeña canica de cristal, que representa a la Tierra, en línea recta sobre ese mismo trampolín deformado. La canica intentará seguir su camino derecho original, pero al llegar irremediablemente a la empinada curva que hizo la pesada bola de boliche, su trayectoria se desviará sin poder evitarlo. Empezará a rodar en círculos infinitos alrededor del hoyo gravitacional. No hay absolutamente ninguna cuerda invisible atándola, es pura geometría en acción.',
      'Esta bellísima y clarificadora analogía del trampolín, formulada magistralmente hace varias décadas por el brillante físico teórico John Archibald Wheeler, se resume elegantemente en una de las frases académicas más famosas y citadas de toda la historia de la ciencia moderna: "El espacio-tiempo le dice continuamente a la materia cómo moverse, y la masiva materia le dice implacablemente al espacio-tiempo cómo debe curvarse". Es una danza perfecta y eterna del cosmos.',
      'Pero la poderosa gravedad no solo tiene la inmensa capacidad de curvar el espacio tridimensional espacial (las consabidas tres dimensiones de largo, ancho y profundidad absoluta), sino que también dobla irrevocablemente la enigmática cuarta dimensión: el indetenible tiempo. Esto significa científicamente que cuanto más hundido y atrapado estés en el profundo hoyo del trampolín gravitacional, más lento y pegajoso se volverá el implacable flujo temporal para ti en la realidad universal.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Esta misma e implacable dilatación gravitacional del tiempo producida por una inmensa masa curando salvajemente el espacio, es la directa responsable en la película de la famosa y dolorosa frase en el acuático Planeta de Miller: "Cada hora aquí son siete años en la Tierra". Al estar tan increíblemente cerca del inmenso y aplastante peso del agujero negro Gargantúa, el planeta está tan profundamente hundido en el "trampolín" espacial que el tiempo mismo se frena casi por completo en comparación con nuestro distante y tranquilo planeta.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Aunque solemos visualizar y dibujar el espacio-tiempo como un trampolín plano y bidimensional en las ilustraciones didácticas para entenderlo mucho mejor de forma intuitiva, en la realidad física profunda debes imaginar que este "hundimiento" deformador ocurre de manera totalmente simultánea y paralela en todas las tres dimensiones del espacio, como una esponja esférica tridimensional que se contrae y comprime.' },
    ],
    fact: 'El gran Albert Einstein desarrolló laboriosamente y perfeccionó una compleja y avanzada rama de las matemáticas especiales llamada "cálculo tensorial" para poder describir rigurosamente estas exóticas y alucinantes curvas en múltiples dimensiones espaciales. Sus inmortales ecuaciones resultan ser tan increíblemente hermosas como frustrantemente complicadas para los estudiantes de física, y muestran exactamente cómo la inmensa energía, la sofocante presión y la materia masiva interactúan geométricamente en el universo.',
  },
  {
    id: 'geodesicas',
    title: 'Líneas Rectas Curvas',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m1/btn_geodesica.jpg',
    image: '/assets/interstellar/infographic_m1/hero_geodesica.jpg',
    content: [
      'Si alguna vez quieres ir rápidamente desde el punto A hacia el lejano punto B de la manera más rápida y directa posible, seguramente pensarás de forma muy intuitiva que debes trazar una línea completamente recta con una regla rígida. Y en un pedazo de papel plano convencional, tendrías toda la razón absoluta. Sin embargo, nuestro vasto y majestuoso universo no es un aburrido pedazo de papel plano; es un escenario curvo, enormemente doblado y abollado por todas partes gracias a la masa de las estrellas.',
      'Los experimentados físicos teóricos y matemáticos llaman a estas extrañas rutas más cortas y veloces en los misteriosos espacios curvos con un nombre científico muy especial e importante: las famosas "Geodésicas". Para entender intuitivamente cómo y por qué funcionan estas líneas mágicas, piensa un instante en los grandes aviones comerciales que viajan cotidianamente desde Europa hasta Norteamérica llevando cientos de pasajeros sobre el frío y vasto océano atlántico en la Tierra.',
      'Si observas curiosamente la ruta trazada por estos mismos aviones en un mapa plano de papel colgado en una pared escolar, notarás rápidamente y con gran asombro que no vuelan siguiendo una línea recta horizontal y aburrida, sino que por el contrario hacen una inmensa y colosal curva ascendente acercándose muchísimo al helado Polo Norte. ¿Por qué harían lógicamente esto si a simple vista parece un desvío gigantesco y tonto que gasta muchísimo más combustible valioso en el largo proceso del viaje?',
      'La increíble e ilustrativa respuesta yace firmemente en el hecho absoluto de que la imponente Tierra no es en lo absoluto plana, sino que es verdaderamente una esfera tridimensional voluminosa y hermosa. Cuando estiras un hilo firme y tenso sobre un globo terráqueo tridimensional real uniendo directamente a París y Nueva York de forma tirante, verás inmediatamente que la distancia genuinamente más corta (matemáticamente llamada Gran Círculo por los navegantes) dibuja exactamente esa curvatura ascendente tan particular.',
      'De la misma asombrosa y maravillosa manera celestial, los enormes y pesados planetas en el espacio oscuro y profundo, nuestra pálida Luna y las veloces naves espaciales interestelares no están girando en redondos círculos simplemente porque sienten el ridículo deseo caprichoso de dar mareantes vueltas; en realidad, ellos están avanzando constantemente y de forma obstinada hacia adelante en una persistente línea totalmente recta e imperturbable a través de su propia realidad de espacio-tiempo local.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La resistente nave espacial Endurance diseñada por la NASA nunca vuela desperdiciando combustible en simples e ineficientes líneas rectas rígidas al anticuado estilo de Star Wars en su aventura interestelar. Cuando nuestros valientes y decididos héroes llegan finalmente al nuevo y exótico sistema solar distante y necesitan acercarse velozmente al primer planeta acuático de Miller, utilizan impresionantes y complejas maniobras de asistencia gravitatoria, dejándose atrapar conscientemente y resbalando fluidamente por las geodésicas naturales perfectas.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La curiosa palabra científica "Geodésica" proviene directamente de las raíces del griego antiguo clásico y originalmente en la historia humana significaba literalmente la "división de la vasta tierra". En los remotos tiempos de la geometría clásica y antigua se refería estrictamente a la ciencia milenaria de medir terrenos valiosos y trazar fronteras o líneas perfectas en la superficie de la curva de nuestra propia Tierra terrenal.' },
    ],
    fact: 'Debido fundamentalmente a que la radiante luz misma del cosmos no posee absolutamente ninguna masa física o corpórea propia que la lastre o frene en el vacío, esta siempre se encuentra destinada ineludiblemente a seguir de la manera más estricta posible la geodésica más absolutamente pura y perfecta del universo conocido y por conocer. A nosotros, los simples e ignorantes humanos observadores, nos parece engañosamente que un veloz y vibrante rayo de luz se dobla dramáticamente al pasar muy cerca de una estrella.',
  },
  {
    id: 'lentes-gravitacionales',
    title: 'El Universo como Lupa',
    color: '#00BCD4',
    btnImage: '/assets/interstellar/infographic_m1/btn_lentes.jpg',
    image: '/assets/interstellar/infographic_m1/hero_lentes.jpg',
    content: [
      'Ya sabemos positivamente gracias a las brillantes deducciones de Einstein que la inmensa y abrumadora materia masiva del cosmos curva profundamente el majestuoso tejido invisible del universo de forma similar a como lo haría una pesada y robusta bola de boliche cayendo en un trampolín doméstico. Pero la majestuosa Relatividad General de Einstein no se conformó con eso y se atrevió a hacer audazmente una grandiosa predicción matemática que resultó ser aún mucho más salvaje, extraña y francamente muy difícil de creer al principio.',
      'Este genial físico teórico de cabello alborotado y espíritu rebelde afirmó rotundamente en sus complejos e intrincados documentos que esta dramática curvatura espacial astronómica provocada por inmensas masas era tan extremadamente colosal y pronunciada, que absolutamente todo sería afectado por ella de manera inexorable e ineludible. De hecho, argumentó de forma tajante que incluso los veloces e insustanciales rayos de luz que viajan incansablemente durante milenios desde las galaxias más lejanas, también tendrían forzosamente que doblarse a su paso.',
      'En otras y más simples palabras aclaratorias, si milagrosamente logras colocar de manera estratégica un objeto genuinamente gigantesco y tremendamente pesado en medio del espacio oscuro y helado —como podría ser perfectamente nuestro propio y brillante Sol, o muchísimo mejor aún, todo un colosal cúmulo masivo y compacto compuesto íntegramente por miles de galaxias antiquísimas agrupadas cercanamente— este coloso gravitacional cósmico actuará frente a la luz exactamente igual que la enorme y gruesa lente redonda de cristal curvo de la lupa de un detective.',
      'Este hermosísimo e increíblemente asombroso efecto cósmico visual originado por las leyes inmutables de la física, es ampliamente y comúnmente llamado por la comunidad científica mundial como una "Lente Gravitacional". En el distante y crucial año histórico de 1919, el terco y brillante astrónomo británico Arthur Eddington decidió audaz y valientemente poner a prueba esta loca y descabellada idea teórica einsteniana organizando y liderando arduamente una expedición científica arriesgada que viajó en barco hasta una remota isla tropical en la exótica costa de África.',
      'Hoy en día y en nuestra excitante actualidad moderna, gracias a las hazañas invaluables de gigantescos y costosísimos telescopios espaciales de última y flamante generación como el legendario Hubble y el revolucionario James Webb, podemos ver y contemplar este asombroso y majestuoso efecto visual einsteniano operando a máxima capacidad y en sus formas más extremas, hermosas y dramáticas en las recónditas y abisales profundidades del espacio lejano. Constantemente maravillamos nuestros asombrados ojos visualizando galaxias arcaicas extremadamente lejanas y fantasmales.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La profundamente impresionante, visualmente deslumbrante y matemáticamente realista apariencia física del masivo agujero negro central Gargantúa en la película —con un ardiente y sumamente brillante disco giratorio de polvo cósmico y letal gas sobrecalentado que parece de forma asombrosa e incomprensible doblarse misteriosamente por encima de la esfera y también por debajo del oscuro e impenetrable centro absoluto del negro vacío dimensional— es en realidad y sin lugar a la más mínima duda el alucinante y directo resultado de una Lente Gravitacional de escala extrema.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando el perfectísimo y prístino alineamiento estelar y orbital entre nuestra distante e insignificante Tierra minúscula, la monstruosa lente galáctica masiva e invisible situada en el medio del camino, y la lejana estrella puntual de fondo que emite la luz originalmente resulta ser matemática y geométricamente impecable en su simetría tridimensional total y absoluta, la esquiva luz resplandece y se curva de forma mágicamente simétrica e igual por absolutamente todas las múltiples direcciones imaginables e inimaginables en torno al bloqueador cósmico.' },
    ],
    fact: 'La histórica, memorable y extremadamente célebre y famosa expedición científica y astronómica liderada por el persistente y meticuloso Arthur Eddington en el convulso año posterior a la guerra mundial de 1919 resultó ser un evento de una magnitud tan colosal e inmensamente revolucionaria en la historia del pensamiento, que durante la ajetreada mañana siguiente al triunfante y esperado anuncio oficial ante la prensa mundial de sus contundentes y exitosos resultados fotográficos estelares que respaldaban fuertemente las audaces teorías alemanas einstenianas de la luz curva del universo invisible e insondable que habitamos transitoriamente.',
  },
  {
    id: 'ondas-gravitacionales',
    title: 'Olas en el Espacio',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m1/btn_ondas.jpg',
    image: '/assets/interstellar/infographic_m1/hero_ondas.jpg',
    content: [
      'Imagina tranquilamente en tu mente visual la serena y pulcra superficie quieta de un gigantesco lago escondido donde toda la fría agua contenida es tan inmaculadamente y perfectamente lisa y cristalina como un hermoso espejo antiguo. Si sorpresiva y súbitamente lanzas una pequeña pero pesada piedra justo al mismísimo centro del apacible e inamovible cuerpo de agua brillante y reflectante, observarás asombradamente cómo una indetenible serie de notorias ondas y marcadas perturbaciones concéntricas de energía física se expanden rápidamente e incansablemente hacia las distantes orillas.',
      'En el convulso y creativo año europeo de 1916, el inagotable y prolífico físico Albert Einstein, afilando magistralmente su portentoso ingenio teórico sin igual, predijo con apabullante y desconcertante seguridad que el inmenso y flexible tejido invisible del espacio-tiempo, ese telón dimensional básico que sustenta cada diminuto átomo de nuestra galaxia inabarcable, experimentaba y exhibía frente a todos nosotros exactamente y con la más fina precisión matemática el mismo asombroso y vibratorio fenómeno líquido ondulatorio. Fue una deducción brillante y asombrosamente genial para ese momento.',
      'Si los formidables y titánicos objetos cósmicos más brutalmente masivos, densos e inconcebiblemente abrumadores del universo aceleraban veloz y violentamente sin ningún tipo de control o en su defecto chocaban estruendosamente entre sí a una gran y devastadora velocidad galáctica, estos cataclismos inimaginables deberían lógicamente, según las infalibles ecuaciones de la flamante y resplandeciente Relatividad General presentadas, crear y emitir unas enormes y gigantescas ondas invisibles reverberantes que desgarrarían y deformarían dramáticamente el tejido físico tridimensional del entorno estelar al expandirse.',
      'Estas asombrosas e invisibles perturbaciones colosales son hoy en día bien conocidas en el selecto y estricto ámbito científico y académico como las enigmáticas "Ondas Gravitacionales" cósmicas. Son en su esencia más pura y profunda unas verdaderas e inquietantes arrugas espaciales de la geometría existencial pura que tienen el extraño y fascinante superpoder de poder comprimir, apretar, estirar y encoger microscópicamente el mismísimo y fundamental tejido dimensional sagrado que compone a toda nuestra realidad palpable conocida mientras viajan atravesando raudamente e impecablemente el abismal y eterno vacío.',
      'Avanzamos aceleradamente casi un larguísimo y tortuoso siglo humano entero hasta llegar finalmente y triunfalmente al histórico e imborrable 14 de septiembre del año 2015 de nuestro calendario gregoriano actual. Ese memorable y fatídico día revolucionario, un gigantesco, sensible e inmensamente caro instrumento de observación científica de proporciones épicas construido meticulosamente en territorio de Estados Unidos y atinadamente bautizado como el Observatorio LIGO encendió expectante sus colosales láseres subterráneos y por primera vez en la historia de la curiosa e incansable humanidad científica detectó inequívocamente su primer rastro.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En los heroicos y desoladores momentos finales tan trascendentales y decisivos de la epopeya intergaláctica Interstellar, después del climático e inolvidable desenlace cósmico monumental dentro de los pasillos misteriosos y oscuros del teseracto quatridimensional insondable creado cuidadosamente por seres evolucionados indescriptibles e impensables, la perseverante y decidida heroína científica ahora plenamente adulta llamada cariñosamente Murph Cooper es aclamada universalmente y glorificada efusivamente por toda la atribulada humanidad superviviente en peligro inminente y perentorio de extinción biológica trágica.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El poderoso, inconfundible y sutilísimo "sonido" (una ínfima vibración física de la luz traducida informáticamente) captado victoriosamente por LIGO en aquella jornada inolvidable fue originado astronómicamente por un cataclismo sin parangón: dos inmensurables agujeros negros estelares increíblemente e indudablemente monstruosos y voraces girando desenfrenadamente y desbocadamente uno en torno al otro a velocidades cercanas a la luz, hasta finalmente y atronadoramente fusionarse brutal e irremediablemente, desatando de manera repentina una invisible tormenta dimensional que agitó a todo el cosmos sin piedad y deformó el tejido galáctico.' },
    ],
    fact: 'El ilustre físico teórico Kip Thorne (galardonado flamantemente en 2017) no solo fue valiosa y decisivamente uno de los brillantes fundadores, cerebros maestros teóricos y creadores principales del revolucionario y exitoso observatorio LIGO estadounidense responsable unánimemente del histórico hallazgo comprobatorio einsteniano irrefutable que conmovió profundamente al mundo moderno y escéptico actual; sino que este afable y prolífico científico norteamericano experto en agujeros negros también fungió oficialmente como productor ejecutivo, amigo inseparable y principal asesor científico e indispensable baluarte técnico en el colosal e impresionante set de grabación de Interstellar.',
  },
  {
    id: 'gps-relatividad',
    title: 'Einstein en tu Bolsillo',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m1/btn_ondas.jpg',
    image: '/assets/interstellar/infographic_m1/hero_gps.jpg',
    content: [
      'Podrías llegar a pensar honestamente, y con una enorme cantidad de total y justificada justificación tras haber leído las explicaciones abstractas anteriores, que todo este complicadísimo y muy bizarro asunto intelectual y académico del espacio-tiempo elástico e invisible como goma, los inmensos y voraces agujeros negros devoradores de la radiante luz prístina y los misteriosos satélites tecnológicos que viajan raudos y veloces a fracciones altísimas y peligrosas de la increíble velocidad de la deslumbrante luz cósmica, son simples temas exóticos que solo les importan y competen absolutamente a los viejos y calvos físicos pizarristas.',
      'Sin embargo, y contra todo el más básico e infalible sentido común terrenal, la espectacular y matemáticamente intrincada Teoría de la Relatividad formulada asombrosamente por el genio Albert Einstein te está en la vida real protegiendo y salvando activamente la vida o guiando constantemente tus aburridos pasos rutinarios diarios en la abarrotada urbe; funcionado y procesando silenciosamente pero de manera indudablemente milagrosa y sin descanso desde lo más recóndito del brillante, complejo, ultra tecnificado y deslumbrante microchip interno oculto del costoso teléfono celular inteligente y moderno que portas ahora de manera despreocupada.',
      'Para que la aplicación logre verdaderamente poder guiarte por las abigarradas calles del mundo y decirte susurrando en la oreja robóticamente la dirección y el camino perfecto cada vez que caminas rápidamente por la ruidosa ciudad o conduces apurado y ansiosamente tu veloz automóvil nuevo, el indispensable y globalizado sistema satelital militar conocido popularmente y universalmente bajo las famosas y reconocidas siglas de GPS depende estrictamente y enteramente de una gigantesca flota completa interconectada de veinticuatro satélites miliares especializados flotantes que orbitan incesantemente nuestro querido y maltratado globo terráqueo azul claro.',
      'Es en este preciso, mágico y decisivo instante tecnológico globalizado, cuando los abstractos y extremadamente complicados y confusos descubrimientos astronómicos del enmarañado Einstein entran dramática y repentinamente en veloz e indetenible acción real, mostrándonos y enseñándonos maravillosamente que la teoría más etérea y volátil de las más locas y rebuscadas teorías astronómicas termina por afectar e impactar contundente, dura y dramáticamente la cruda y ruda realidad concreta, terrenal y tangible de nuestro pequeño mundo insignificante, puesto que orbitar y viajar giratoriamente conlleva inevitable y dolorosamente una gravísima factura relativista ineludible y obligatoria en el peaje.',
      'Como viajan implacablemente a 14,000 kilómetros horarios, la Relatividad Especial frena el tiempo de los satélites en -7 microsegundos. Al mismo tiempo, al estar tan altísimos y no sentir la inmensa gravedad, la Relatividad General enloquece los relojes hacia el futuro adelantándolos en +45 microsegundos precisos todos y cada uno de los días solares sucesivos e implacables. El resultado catastrófico final: sus costosos y ultraestables relojes de rarísimo rubidio atómico quedan matemáticamente desfasados unos inalterables y problemáticos 38 microsegundos netos por delante de tu simple reloj terrenal terrestre, y hay que obligatoriamente corregirlo de inmediato, segundo a segundo y hora tras hora.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El inmenso, gigantesco e insalvable y sumamente trágico error fatal intergaláctico provocado irresponsablemente y por ignorancia circunstancial de la extrema dilatación asimétrica temporal, que en un aburrido y mundano satélite rutinario de comunicaciones del sistema GPS normal operado por la agencia y fuerza militar espacial se trata simplemente y con suerte de la molesta pérdida técnica subsanable de algunos imperceptibles microsegundos diarios perdidos en el ancho del universo, es dramáticamente e infinitamente escalado, multiplicado y exponenciado brutal y aterradoramente por el desalmado director de cine en las hermosas y terribles locaciones del catastrófico acuático Planeta Miller explorado sin precaución.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando los muy audaces y desconfiados ingenieros gubernamentales y militares estadounidenses decidieron probar temerariamente esta grandísima e inmensa proeza y pusieron de manera cautelosa y muy valientemente por primera vez todos los sofisticados satélites espaciales iniciales tempranos de la novedosísima y experimental red satelital de geoposicionamiento en el frío e impasible entorno del vacío, varios de los desarrolladores renegados dudaban tan seria, honda y profundamente de las "teorías abstractas alemanas de Einstein" y sus alocados y estrafalarios y supuestos efectos relativistas fantasiosos sobre el paso implacable del tiempo mecánico de los aparatos.' },
    ],
    fact: 'Si por alguna necia e incomprensible razón de ego o terquedad los sabios ingenieros actuales desoyeron las enseñanzas pasadas de la historia y decidieran erróneamente en un ataque de locura apagar o no corregir permanentemente esta enorme y monumental falla cósmica intrínseca usando fielmente y devotamente las maravillosas y salvadoras ecuaciones inmortales del espacio y el tiempo deformables concebidas originalmente y magistralmente en Berna por un humilde oficinista de patentes con mucho talento llamado Albert, el error acumulado derivado destrozaría el GPS, acumulando once kilómetros catastróficos por jornada diaria e imposibilitando la civilización actual y moderna tal y como la concebimos y utilizamos actualmente.',
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
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
          const colors = ['#F4A261','#4FC3F7','#7C4DFF','#FF6B35','#00BCD4','#AB47BC','#26A69A'];
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
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EINSTEIN Y LA RED INVISIBLE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">RELATIVIDAD VS GRAVEDAD NEWTONIANA</text>
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
          layoutId="activeDotInterstellar"
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
                  background: node.color, color: '#0a0c1e',
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
              <Star size={18} /> Profundiza tu Conocimiento
            </h4>
            <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: '1fr 1fr' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Fast Fact ─── */}
        {node.fact && (
          <div style={{
            marginTop: '2rem', padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}>
            <div style={{
              background: node.color, color: '#0a0c1e',
              padding: '0.5rem', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={20} />
            </div>
            <div>
              <strong style={{ display: 'block', color: node.color, marginBottom: '0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Fascinante
              </strong>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_InterstellarM1() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  
  const activeNode = useMemo(() => 
    INFOGRAPHIC_NODES.find(n => n.id === activeNodeId),
  [activeNodeId]);

  return (
    <div style={{
      width: '100%',
      minHeight: '800px',
      background: '#0a0c1e',
      borderRadius: '24px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#fff',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <InterstellarBackground />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <InterstellarHeader />

        {/* ─── Node Navigation ─── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          margin: '2rem 0',
          position: 'relative',
          zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNodeId === node.id}
              onClick={() => setActiveNodeId(prev => prev === node.id ? null : node.id)}
            />
          ))}
        </div>

        {/* ─── Dynamic Content Area ─── */}
        <div style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence mode="wait">
            {activeNode ? (
              <ContentPanel key={activeNode.id} node={activeNode} onClose={() => setActiveNodeId(null)} setLightboxSrc={setLightboxSrc} />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px',
                }}
              >
                <div style={{
                  textAlign: 'center', color: 'rgba(79,195,247,0.4)',
                  border: '1px dashed rgba(79,195,247,0.2)',
                  borderRadius: '20px', padding: '3rem',
                  maxWidth: '400px',
                }}>
                  <Sparkles size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
                    Selecciona un nodo del tejido espaciotemporal para explorar la relatividad
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── Bibliography Footer ─── */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '16px',
        }}>
          <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes y Bibliografía
          </h4>
          <ul style={{
            margin: 0, padding: '0 0 0 1.2rem',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.8rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Lightbox component */}
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
