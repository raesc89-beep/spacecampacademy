'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Arrival / alien-science themed) ────────────────
function DecoShellShip({ size = 70, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Shell/lens ship silhouette */}
      <ellipse cx="30" cy="30" rx="26" ry="10" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="30" rx="18" ry="7" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <ellipse cx="30" cy="30" rx="10" ry="4" fill={color} opacity="0.15" />
      {/* Vertical axis */}
      <line x1="30" y1="8" x2="30" y2="52" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Gravity distortion rings */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="3 4" opacity="0.25" />
      <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="2 5" opacity="0.15" />
    </svg>
  );
}

function DecoLogogram({ size = 70, color = '#7A8C9E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Circular logogram shape */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      {/* Ink splotch tendrils */}
      <path d="M30 6 Q38 14 34 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M54 30 Q46 36 40 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M30 54 Q22 46 26 38" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M6 30 Q14 24 20 28" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Central dot */}
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoFogWave({ size = 80, color = '#6A7B8D', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Layered fog waves */}
      <path d="M0 30 Q10 22 20 28 Q30 34 40 26 Q50 18 60 24 Q70 30 80 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M0 20 Q10 14 20 18 Q30 22 40 16 Q50 10 60 16 Q70 22 80 14" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M0 10 Q10 6 20 10 Q30 14 40 8 Q50 2 60 8 Q70 14 80 8" fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round" opacity="0.2" />
      {/* Floating particles */}
      <circle cx="15" cy="35" r="1" fill={color} opacity="0.4" />
      <circle cx="55" cy="5" r="1.5" fill={color} opacity="0.3" />
      <circle cx="72" cy="32" r="1" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoBlockUniverse({ size = 60, color = '#4E4E4E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Block universe grid */}
      <rect x="10" y="10" width="40" height="40" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Time axis */}
      <line x1="10" y1="50" x2="50" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Worldline */}
      <path d="M15 48 Q25 35 30 30 Q35 25 45 12" fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.4" />
      {/* Grid lines */}
      <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="0.5" opacity="0.2" />
      {/* Events */}
      <circle cx="20" cy="42" r="2" fill={color} opacity="0.5" />
      <circle cx="30" cy="30" r="2.5" fill={color} opacity="0.6" />
      <circle cx="40" cy="18" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoFeynmanDiag({ size = 70, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Feynman diagram */}
      <line x1="10" y1="50" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="50" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Wavy photon line */}
      <path d="M30 30 Q33 25 30 20 Q27 15 30 10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <line x1="10" y1="10" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="10" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Vertex */}
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Arrow markers */}
      <path d="M18 42 L22 38" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M42 42 L38 38" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoGameTheory({ size = 70, color = '#3D3D3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Payoff matrix grid */}
      <rect x="12" y="12" width="36" height="36" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="30" y1="12" x2="30" y2="48" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="12" y1="30" x2="48" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Cell values */}
      <circle cx="21" cy="21" r="3" fill={color} opacity="0.3" />
      <circle cx="39" cy="21" r="3" fill={color} opacity="0.5" />
      <circle cx="21" cy="39" r="3" fill={color} opacity="0.5" />
      <circle cx="39" cy="39" r="3" fill={color} opacity="0.3" />
      {/* Equilibrium indicator */}
      <circle cx="39" cy="21" r="6" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'fisica-naves': [DecoShellShip, DecoFogWave, DecoBlockUniverse],
  'gravedad-artificial': [DecoShellShip, DecoBlockUniverse, DecoFeynmanDiag],
  'atmosfera-alienigena': [DecoFogWave, DecoShellShip, DecoLogogram],
  'armas-no-armas': [DecoGameTheory, DecoLogogram, DecoFogWave],
  'tiempo-no-lineal': [DecoBlockUniverse, DecoFeynmanDiag, DecoLogogram],
  'paradoja-fermi-arrival': [DecoShellShip, DecoFogWave, DecoGameTheory],
  'ciencia-ficcion-dura': [DecoFeynmanDiag, DecoLogogram, DecoBlockUniverse],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Chiang, T. (2002). Stories of Your Life and Others, Tor Books',
  'Kaku, M. (2008). Physics of the Impossible: A Scientific Exploration, Doubleday',
  'Price, H. (1996). Time\'s Arrow and Archimedes\' Point, Oxford University Press',
  'Tegmark, M. (2014). Our Mathematical Universe: My Quest for the Ultimate Nature of Reality, Knopf',
  'Feynman, R. (1985). QED: The Strange Theory of Light and Matter, Princeton University Press',
  'Webb, S. (2015). If the Universe Is Teeming with Aliens... WHERE IS EVERYBODY?, Springer',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'fisica-naves',
    title: 'La Física de las Naves',
    color: '#8B9DAF',
    btnImage: '/assets/ciencia_arrival/infographic_m5/btn_fisica-naves.jpg',
    image: '/assets/ciencia_arrival/infographic_m5/hero_fisica-naves.jpg',
    content: [
      'Las naves de Arrival, diseñadas por el equipo de producción liderado por Patrice Vermette, tienen una forma de concha o lente oblonga de aproximadamente 450 metros de altura. Su superficie lisa y oscura, sin juntas visibles ni aperturas convencionales, desafía toda noción de ingeniería aeronáutica humana. Esta forma no fue elegida al azar: el director Denis Villeneuve quería un objeto que pareciera completamente ajeno a cualquier concepto terrestre de nave espacial, evitando las siluetas de platillos o cohetes que dominan el género desde la década de 1950.',

      'Desde el punto de vista de la física, una nave de 450 metros suspendida a pocos metros del suelo sin emisiones visibles de propulsión plantea preguntas sobre la manipulación gravitatoria. En la física teórica, la Relatividad General de Einstein permite, en principio, curvar el espacio-tiempo alrededor de un objeto, generando un efecto que podría sostenerlo sin soporte mecánico. El físico Miguel Alcubierre propuso en 1994 una métrica donde el espacio-tiempo se contrae delante de una nave y se expande detrás, permitiendo desplazamiento sin violar localmente la velocidad de la luz.',

      'La métrica de Alcubierre requiere densidades de energía negativa que actualmente no se pueden generar con tecnología humana. Sin embargo, los cálculos de Harold White en el Laboratorio Eagleworks de la NASA en 2012 sugirieron que la cantidad de energía necesaria podría reducirse modificando la geometría de la burbuja de deformación. White estimó que una burbuja con forma toroidal en lugar de esférica reduciría los requisitos energéticos de una masa equivalente a Júpiter a aproximadamente 700 kilogramos de materia exótica, una cifra aún inalcanzable pero menos prohibitiva.',

      'Las doce naves en la película llegan simultáneamente a puntos distribuidos en el planeta sin que ningún sistema de detección las observe en tránsito. Este detalle implica que las naves no viajaron por el espacio convencional a velocidades sublumínicas. La física teórica contempla atajos espaciotemporales conocidos como agujeros de gusano, predichos matemáticamente por Einstein y Nathan Rosen en 1935. Un puente de Einstein-Rosen conectaría dos regiones distantes del espacio-tiempo, permitiendo tránsito sin recorrer la distancia intermedia.',

      'El diseño de producción incluyó un detalle sutil: la entrada a cada nave es un túnel vertical donde la gravedad parece rotar 90 grados, permitiendo a los personajes caminar sobre lo que antes era una pared. Este efecto recuerda la gravedad artificial por rotación propuesta por Wernher von Braun en 1952 y representada en estaciones espaciales como el concepto del cilindro de O\'Neill de 1976. Sin embargo, en la película el mecanismo parece ser manipulación directa del campo gravitatorio, algo que requeriría control preciso sobre la curvatura del espacio-tiempo a escala local.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El diseñador de producción Patrice Vermette estudió más de 200 formas antes de elegir la concha oblonga para las naves de Arrival. Denis Villeneuve rechazó toda forma que pudiera asociarse con naves existentes en el cine. La forma final fue inspirada en parte por un asteroide: la roca espacial Oumuamua, detectada en 2017 (un año después de la película), resultó tener una forma oblonga similar que generó especulaciones sobre su posible origen artificial, propuestas por el astrofísico Avi Loeb de Harvard.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival, los militares llaman a las naves "conchas" (shells). Cuando Louise Banks y Ian Donnelly entran por primera vez, experimentan un cambio de orientación gravitatoria que los desequilibra. Este momento cinematográfico fue filmado usando un set rotatorio construido sobre un mecanismo de gimbal de 12 metros, donde los actores caminaban mientras la cámara y la estructura giraban sincronizadamente para simular la reorientación de la gravedad sin efectos digitales.' },
    ],
    fact: 'La métrica de Alcubierre, publicada en la revista Classical and Quantum Gravity en 1994, demostró que las ecuaciones de la Relatividad General de Einstein permiten una solución donde un objeto se desplaza a velocidad arbitraria sin que nada dentro de la burbuja viaje más rápido que la luz. El espacio mismo se deforma: se comprime delante y se expande detrás. Es el espacio el que se mueve, no la nave. Este concepto se ha utilizado como base teórica para los programas de propulsión avanzada de la NASA y la DARPA.',
  },
  {
    id: 'gravedad-artificial',
    title: 'Gravedad Artificial',
    color: '#7A8C9E',
    btnImage: '/assets/ciencia_arrival/infographic_m5/btn_gravedad-artificial.jpg',
    image: '/assets/ciencia_arrival/infographic_m5/hero_gravedad-artificial.jpg',
    content: [
      'La gravedad artificial es un problema central en la exploración espacial prolongada. El cuerpo humano pierde masa ósea a razón de 1-2% mensual en microgravedad, según datos recopilados por la NASA durante misiones en la Estación Espacial Internacional (ISS). Los astronautas Scott Kelly y Mikhail Kornienko, tras 340 días en la ISS entre 2015 y 2016, experimentaron pérdida ósea, cambios en la visión por presión intracraneal, y atrofia muscular significativa a pesar de ejercitarse dos horas diarias.',

      'La solución más estudiada es la fuerza centrífuga generada por rotación. Si un cilindro o anillo gira a velocidad constante, los objetos en su interior experimentan una fuerza hacia afuera que simula la gravedad. Gerard K. O\'Neill, físico de Princeton, propuso en 1976 cilindros rotatorios de 8 kilómetros de diámetro y 32 kilómetros de largo que girarían a 0.53 revoluciones por minuto para generar 1G de gravedad artificial en su superficie interior. Los residentes vivirían en la cara interna del cilindro, con luz solar dirigida por espejos.',

      'El problema con la rotación es el efecto Coriolis, una fuerza ficticia que desvía objetos en movimiento dentro de un marco rotatorio. En un hábitat pequeño que gira rápido, una persona que lanza una pelota hacia arriba la vería curvarse lateralmente. Para minimizar este efecto, el radio de rotación debe ser grande: el físico Theodore Hall calculó en 1993 que un radio mínimo de 224 metros con rotación de 2 rpm mantendría el efecto Coriolis por debajo del umbral de percepción humana, evitando mareos y desorientación.',

      'En Arrival, la gravedad dentro de las naves no se genera por rotación observable. Las naves no giran, y sin embargo los personajes experimentan un campo gravitatorio dirigido que cambia de orientación al cruzar el umbral de entrada. Esto sugiere tecnología capaz de generar campos gravitatorios artificiales sin rotación mecánica. En la física teórica, esto requeriría manipular directamente el tensor de energía-momento del espacio-tiempo, algo permitido por las ecuaciones de Einstein pero que demanda densidades de energía que exceden toda capacidad tecnológica actual.',

      'El concepto de gravedad artificial por manipulación directa del campo gravitatorio aparece en la clasificación de civilizaciones de Nikolai Kardashev, propuesta en 1964. Una civilización Tipo II, capaz de aprovechar toda la energía de su estrella (aproximadamente 3.8 × 10²⁶ watts), podría en teoría disponer de suficiente energía para curvar el espacio-tiempo a escala local. Los heptápodos de Arrival, con su dominio del tiempo no lineal y tecnología de viaje interestelar, encajarían como mínimo en una civilización Tipo II según esta clasificación.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'La estación espacial Von Braun, propuesta por la empresa Gateway Foundation en 2019, fue diseñada como un anillo rotatorio de 190 metros de diámetro que generaría gravedad artificial parcial (aproximadamente 0.16G a 0.38G). El diseño se basa en los cálculos originales de Wernher von Braun de 1952, publicados en la revista Collier\'s. Aunque el proyecto no ha pasado de la fase conceptual, representa el diseño más detallado de una estación con gravedad artificial basada en tecnología actualmente disponible.' },
      { label: 'En la Película', icon: 'zap', text: 'La escena donde Louise y Ian caminan por el túnel vertical de la nave y experimentan la transición gravitatoria fue uno de los desafíos técnicos más complejos de la producción. El director de fotografía Bradford Young filmó en un set construido dentro de un cilindro rotatorio de 12 metros. Los actores llevaban arneses ocultos mientras caminaban sobre superficies que pasaban de horizontal a vertical. La secuencia final combina metraje práctico con extensiones digitales mínimas para mantener el tono realista que Villeneuve buscaba.' },
    ],
    fact: 'Los cilindros de O\'Neill, propuestos por el físico Gerard K. O\'Neill de la Universidad de Princeton en su libro de 1976 "The High Frontier", tendrían capacidad para albergar a más de un millón de personas. El concepto fue estudiado formalmente en el Stanford/NASA Ames Summer Study de 1975, donde un equipo de 28 científicos e ingenieros concluyó que la construcción de un hábitat espacial con gravedad artificial era viable con tecnología de los años 1970, requiriendo aproximadamente 20 años de desarrollo y materiales extraídos de la Luna y asteroides cercanos.',
  },
  {
    id: 'atmosfera-alienigena',
    title: 'La Atmósfera Alienígena',
    color: '#6A7B8D',
    btnImage: '/assets/ciencia_arrival/infographic_m5/btn_atmosfera-alienigena.jpg',
    image: '/assets/ciencia_arrival/infographic_m5/hero_atmosfera-alienigena.jpg',
    content: [
      'En Arrival, la cámara de comunicación dentro de la nave está dividida por una barrera transparente que separa la atmósfera respirable por los humanos de la atmósfera de los heptápodos. Este detalle de diseño refleja un problema real de la astrobiología: la composición atmosférica de un mundo habitado por vida no terrestre probablemente sería tóxica para los humanos. La atmósfera terrestre contiene 78% nitrógeno, 21% oxígeno y 1% de argón y otros gases, una mezcla que es resultado de miles de millones de años de actividad biológica y geológica.',

      'El oxígeno molecular (O₂) en la atmósfera de la Tierra es casi exclusivamente un producto biológico. Antes de la Gran Oxidación hace 2,400 millones de años, la atmósfera terrestre contenía menos del 0.001% de oxígeno. Las cianobacterias, organismos fotosintéticos primitivos, produjeron oxígeno como subproducto de la fotosíntesis durante cientos de millones de años antes de que se acumulara en cantidades significativas. Para organismos que evolucionaron en una atmósfera reductora (sin oxígeno), el O₂ es un veneno corrosivo que destruye sus estructuras moleculares.',

      'Los heptápodos de Arrival parecen respirar una atmósfera densa y opaca, visualmente representada como una neblina blanca. Si su bioquímica difiere de la terrestre, podrían utilizar gases como metano, amoníaco, sulfuro de hidrógeno o incluso hidrógeno molecular como componentes atmosféricos principales. La luna Titán de Saturno tiene una atmósfera de 95% nitrógeno y 5% metano, con una presión superficial 1.5 veces la terrestre. En 2005, la sonda Huygens de la ESA aterrizó en Titán y documentó lagos de metano líquido y lluvia de hidrocarburos.',

      'Los trajes de protección ambiental que usan Louise Banks y su equipo en la película son versiones simplificadas de los trajes de contención biológica de nivel BSL-4 (Biosafety Level 4), el máximo nivel de bioseguridad. En la vida real, los laboratorios BSL-4 como el del CDC en Atlanta, Georgia, o el Instituto de Virología de Wuhan manejan patógenos para los cuales no existe vacuna ni tratamiento. Los trajes presurizados de estos laboratorios mantienen presión positiva para evitar que contaminantes externos entren, suministran aire filtrado y se descontaminan químicamente al salir.',

      'La decisión de Louise de quitarse el traje para comunicarse mejor con los heptápodos tiene implicaciones en la exobiología. El Comité de Protección Planetaria de la NASA, establecido bajo el Tratado del Espacio Exterior de 1967, mantiene protocolos estrictos para evitar contaminación biológica bidireccional. Las misiones a Marte esterilizan sus componentes a 111.7°C durante 30 horas. Un contacto directo con biología alienígena sin barrera de contención representaría el riesgo de contaminación más grave concebible, tanto para los humanos como para los visitantes extraterrestres.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La neblina blanca dentro de la nave de los heptápodos fue creada por el equipo de efectos especiales usando máquinas de humo industrial con glicol propileno, el mismo compuesto utilizado en máquinas de niebla de conciertos y producciones teatrales. El equipo usó 14 máquinas simultáneamente dentro del set cerrado, generando una densidad de neblina tan alta que los actores a veces no podían ver al equipo de filmación a 10 metros de distancia, lo cual contribuyó a sus reacciones genuinas de desorientación en cámara.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La sonda Cassini-Huygens, una misión conjunta de la NASA y la ESA que operó entre 1997 y 2017, descubrió que la luna Encélado de Saturno tiene géiseres de agua salada que emergen de su polo sur a velocidades de hasta 2,189 km/h. Análisis posteriores detectaron hidrógeno molecular y sílice nanométrica en estos géiseres, indicadores de actividad hidrotermal en el fondo del océano subterráneo de Encélado. Estos entornos hidrotermales son análogos a los que podrían sostener vida basada en una bioquímica diferente a la terrestre.' },
    ],
    fact: 'La atmósfera de la Tierra primitiva, antes de la Gran Oxidación de hace 2,400 millones de años, habría sido letal para los humanos modernos. Contenía metano, amoníaco, dióxido de carbono y vapor de agua, pero prácticamente nada de oxígeno libre. Los primeros organismos terrestres eran anaerobios que obtenían energía de la quimiosíntesis. Cuando las cianobacterias comenzaron a producir oxígeno mediante fotosíntesis, este gas nuevo provocó una extinción masiva de anaerobios, conocida como la Catástrofe del Oxígeno, una de las primeras extinciones masivas del planeta.',
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En «Arrival», los heptapodos viven en un entorno con una atmósfera densa y oscura dentro de sus naves, completamente diferente a la terrestre. Louise y Ian necesitan trajes de protección para acercarse a la interfaz. La película fue científicamente cuidadosa: una especie con bioquímica radicalmente diferente podría requerir presiones, temperaturas o composiciones atmosféricas incompatibles con la vida humana. La pared translúcida que separa humanos de heptapodos no es un escenario dramático sino una solución científica real — la misma que se usaría en un protocolo de cuarentena planetaria real para prevenir contaminación biológica bidireccional entre especies de mundos distintos.' },
    ],
  },
  {
    id: 'armas-no-armas',
    title: 'Armas y No-Armas',
    color: '#4E4E4E',
    btnImage: '/assets/ciencia_arrival/infographic_m5/btn_armas-no-armas.jpg',
    image: '/assets/ciencia_arrival/infographic_m5/hero_armas-no-armas.jpg',
    content: [
      'En Arrival, la palabra heptápoda que Louise traduce como "arma" genera una crisis diplomática global porque los militares interpretan el término como una amenaza. Sin embargo, Louise argumenta que la misma palabra podría significar "herramienta" o "instrumento", y que en el contexto heptápodo, el concepto de "arma" y "herramienta" podría ser indistinguible. Este dilema lingüístico refleja un problema real en la teoría de la traducción: la polisemia radical, donde una palabra en un idioma carece de equivalente directo en otro.',

      'La teoría de juegos, desarrollada formalmente por John von Neumann y Oskar Morgenstern en su libro "Theory of Games and Economic Behavior" de 1944, proporciona un marco para analizar esta situación. Un juego de suma cero es aquel donde la ganancia de un jugador equivale a la pérdida del otro: si yo gano, tú pierdes. Pero la interacción heptápodo-humano en Arrival es un juego de suma no-cero, donde ambas partes pueden beneficiarse simultáneamente mediante la cooperación. Los heptápodos ofrecen su lenguaje como regalo; los humanos, su asistencia futura.',

      'El equilibrio de Nash, formulado por el matemático John Forbes Nash Jr. en su tesis doctoral de Princeton en 1950 (por la cual recibió el Premio Nobel de Economía en 1994), describe un estado donde ningún jugador puede mejorar su resultado cambiando unilateralmente de estrategia. En Arrival, el equilibrio de Nash cooperativo se alcanzaría si todas las naciones comparten información sobre los heptápodos. Pero la desconfianza genera un dilema del prisionero: cada nación teme que compartir información la debilite frente a las demás.',

      'El dilema del prisionero, formulado por Merrill Flood y Melvin Dresher en la RAND Corporation en 1950, demuestra que dos agentes racionales pueden llegar a un resultado subóptimo para ambos al actuar en su propio interés. En la película, China, Rusia y otras naciones cortan comunicaciones y amenazan con actuar unilateralmente, reproduciendo este dilema. La solución de Louise es comunicarse directamente con el general Shang para demostrar que la cooperación beneficia a todos, rompiendo el ciclo de desconfianza mutua.',

      'El concepto de "arma = herramienta = lenguaje" que los heptápodos presentan tiene un paralelo en la lingüística cognitiva. George Lakoff y Mark Johnson, en su libro "Metaphors We Live By" de 1980, demostraron que las metáforas no son solo figuras retóricas sino estructuras fundamentales del pensamiento humano. La metáfora "la discusión es una guerra" (atacar argumentos, defender posiciones, ganar debates) condiciona cómo percibimos el intercambio intelectual. Una cultura que careciera de esta metáfora bélica podría percibir toda comunicación como un intercambio de herramientas, nunca como conflicto.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La escena donde los militares interpretan "arma" como amenaza y los lingüistas como "herramienta" reproduce un problema documentado en la historia diplomática real. Durante la Conferencia de Potsdam de 1945, la palabra japonesa "mokusatsu" usada por el primer ministro Suzuki fue traducida como "rechazamos con desprecio" cuando su significado era más cercano a "sin comentarios por ahora". Historiadores como Kazuo Kawai argumentan que esta traducción errónea contribuyó a la decisión de usar la bomba atómica sobre Hiroshima y Nagasaki.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Robert Axelrod, politólogo de la Universidad de Michigan, organizó en 1980 un torneo por computadora del dilema del prisionero iterado. La estrategia ganadora fue "Tit for Tat" (ojo por ojo), programada por Anatol Rapoport: cooperar en el primer movimiento y luego imitar la acción previa del oponente. La simplicidad de esta estrategia demostró que la cooperación puede emerger entre agentes egoístas sin necesidad de autoridad central, un principio aplicable a la diplomacia con civilizaciones extraterrestres.' },
    ],
    fact: 'John Nash desarrolló su concepto de equilibrio mientras era estudiante de doctorado en Princeton en 1950. Su tesis doctoral tenía solo 27 páginas. Nash demostró que todo juego finito con cualquier número de jugadores tiene al menos un equilibrio, un resultado que transformó la economía, la biología evolutiva, la ciencia política y la estrategia militar. Nash fue diagnosticado con esquizofrenia paranoide en 1959 y pasó décadas luchando con la enfermedad antes de recuperarse gradualmente en los años 1990 y recibir el Nobel en 1994.',
  },
  {
    id: 'tiempo-no-lineal',
    title: 'Tiempo No Lineal en la Física',
    color: '#3D3D3D',
    btnImage: '/assets/ciencia_arrival/infographic_m5/btn_tiempo-no-lineal.jpg',
    image: '/assets/ciencia_arrival/infographic_m5/hero_tiempo-no-lineal.jpg',
    content: [
      'La concepción del tiempo como una dimensión en la que el pasado, presente y futuro coexisten simultáneamente se denomina "universo bloque" (block universe) o eternalismo. Esta interpretación deriva directamente de la Relatividad Especial de Einstein de 1905, donde la simultaneidad es relativa al observador. Dos eventos que son simultáneos para un observador pueden ocurrir en secuencias diferentes para otro que se mueve a velocidad diferente. Si no existe un "ahora" universal, entonces todos los momentos del tiempo tienen el mismo estatus ontológico: existen por igual.',

      'El físico y filósofo Huw Price, en su libro "Time\'s Arrow and Archimedes\' Point" de 1996, argumenta que la dirección del tiempo es una proyección humana, no una propiedad intrínseca de las leyes físicas. Las ecuaciones fundamentales de la física —la mecánica de Newton, el electromagnetismo de Maxwell, la mecánica cuántica de Schrödinger y la Relatividad General de Einstein— son todas simétricas respecto al tiempo: funcionan igual si se invierte la dirección temporal. La flecha del tiempo que experimentamos surge de condiciones iniciales de baja entropía en el Big Bang, no de las leyes mismas.',

      'Los diagramas de Feynman, introducidos por Richard Feynman entre 1948 y 1949, representan gráficamente las interacciones entre partículas subatómicas. En estos diagramas, una partícula de antimateria se representa como una partícula ordinaria que viaja hacia atrás en el tiempo. Esta interpretación, propuesta originalmente por Ernst Stueckelberg en 1941 y adoptada por Feynman, no es solo un truco matemático: las ecuaciones de la electrodinámica cuántica producen los mismos resultados experimentales verificados con una precisión de 12 decimales.',

      'La retrocausalidad, la posibilidad de que eventos futuros influyan en eventos pasados, es discutida seriamente en la física fundamental. El experimento de elección retardada de John Archibald Wheeler, propuesto en 1978 y realizado experimentalmente en 2007 por un equipo liderado por Vincent Jacques en el Institut d\'Optique de París, demostró que la decisión de un observador sobre qué medir puede determinar retroactivamente el comportamiento pasado de un fotón. El fotón "decide" si comportarse como onda o partícula después de haber atravesado el aparato.',

      'Max Tegmark, cosmólogo del MIT, argumenta en "Our Mathematical Universe" de 2014 que si las matemáticas describen la realidad de forma completa, entonces la estructura matemática del espacio-tiempo es la realidad misma. En esta perspectiva, conocida como la Hipótesis del Universo Matemático, el tiempo no "fluye": el universo es un objeto matemático tetradimensional estático donde pasado y futuro son igualmente reales. Los heptápodos de Arrival perciben esta estructura directamente, lo que Ted Chiang conecta con el principio variacional de Fermat.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Kurt Gödel, amigo cercano de Einstein en Princeton, publicó en 1949 una solución a las ecuaciones de la Relatividad General que describía un universo en rotación donde las curvas temporales cerradas (viajes al pasado) son posibles. Einstein encontró el resultado matemáticamente correcto pero físicamente perturbador. Gödel argumentó que si las curvas temporales cerradas son posibles en algún universo descrito por las mismas ecuaciones, entonces nuestra distinción intuitiva entre pasado y futuro no puede ser un rasgo fundamental de la realidad.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival, Louise comienza a experimentar "recuerdos" de eventos que aún no han ocurrido, como la vida y muerte de su hija Hannah. El espectador inicialmente asume que estas son escenas del pasado, pero la revelación final muestra que son el futuro. Este giro narrativo fue diseñado por Villeneuve para que el espectador experimente la misma desorientación temporal que Louise. El nombre "Hannah" fue elegido por ser un palíndromo: se lee igual en ambas direcciones, reflejando la naturaleza no lineal del tiempo heptápodo.' },
    ],
    fact: 'El experimento de elección retardada de Wheeler fue confirmado experimentalmente en 2007 por el equipo de Vincent Jacques en la Université Paris-Sud. Utilizaron fotones individuales y un interferómetro Mach-Zehnder con un divisor de haz insertado o retirado de forma aleatoria después de que el fotón ya había entrado al aparato. Los resultados mostraron que la "decisión" tardía del experimentador determinaba retroactivamente si el fotón había viajado por uno o ambos caminos, exactamente como predecía la mecánica cuántica, desafiando cualquier interpretación causal clásica del experimento.',
  },
  {
    id: 'paradoja-fermi-arrival',
    title: 'La Paradoja de Fermi en Arrival',
    color: '#2C2C2C',
    btnImage: '/assets/ciencia_arrival/infographic_m5/btn_paradoja-fermi-arrival.jpg',
    image: '/assets/ciencia_arrival/infographic_m5/hero_paradoja-fermi-arrival.jpg',
    content: [
      'La paradoja de Fermi surge de la contradicción entre la alta probabilidad estadística de civilizaciones extraterrestres y la ausencia de evidencia de su existencia. El físico Enrico Fermi planteó la pregunta "¿Dónde están todos?" durante un almuerzo en el Laboratorio Nacional de Los Álamos en 1950. Los cálculos de Michael Hart de 1975 demostraron que una civilización con capacidad de viaje interestelar podría colonizar toda la Vía Láctea en 1 a 10 millones de años, un período breve comparado con los 13,600 millones de años de edad del universo.',

      'Arrival ofrece una respuesta particular a la paradoja: los heptápodos no vienen a conquistar ni a observar pasivamente, sino a realizar un intercambio de largo plazo. Ofrecen su lenguaje (que altera la cognición humana permitiendo percibir el tiempo de forma no lineal) porque en 3,000 años necesitarán la ayuda de la humanidad. Este modelo de contacto altruista recíproco a escala milenaria no corresponde a ninguna de las categorías estándar de soluciones a la paradoja de Fermi, pero se acerca a la hipótesis de "civilizaciones jardineras" propuesta por el astrofísico Milan Ćirković en 2008.',

      'La hipótesis del zoo, propuesta por el astrónomo John Ball en 1973 en la revista Icarus, sugiere que las civilizaciones avanzadas observan a las primitivas sin interferir, similar a los protocolos de reservas naturales. Robin Hanson del George Mason University propuso en 1998 el concepto del "Gran Filtro", una barrera evolutiva que impide a la mayoría de civilizaciones alcanzar la etapa de viaje interestelar. Si el filtro está en nuestro pasado (el origen de la vida eucariota, por ejemplo), estamos entre los pocos que lo superaron. Si está en nuestro futuro, la perspectiva es preocupante.',

      'La ecuación de Drake, formulada por el radioastrónomo Frank Drake en 1961, estima el número de civilizaciones comunicativas en la Vía Láctea multiplicando siete factores: la tasa de formación estelar, la fracción de estrellas con planetas, el número de planetas habitables por sistema, la fracción donde surge vida, la fracción donde la vida se vuelve inteligente, la fracción que desarrolla tecnología comunicativa, y la duración de tales civilizaciones. Las estimaciones varían desde cero hasta millones, dependiendo de los valores asignados a factores aún desconocidos.',

      'En 2020, los astrónomos Tom Westby y Christopher Conselice de la Universidad de Nottingham publicaron un estudio en The Astrophysical Journal que estimó, bajo supuestos conservadores basados en la historia de la Tierra, que debería haber al menos 36 civilizaciones comunicativas activas en la Vía Láctea. La distancia media entre ellas sería de unos 17,000 años luz, lo que haría la comunicación por radio bidireccional prácticamente imposible a escalas de una civilización humana. Este dato da contexto al viaje instantáneo de los heptápodos: sin atajos espaciotemporales, el contacto sería inalcanzable.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La señal Wow!, detectada el 15 de agosto de 1977 por el radiotelescopio Big Ear de la Universidad Estatal de Ohio, sigue siendo la detección más prometedora en la historia de SETI. Duró 72 segundos, provenía de la constelación de Sagitario, tenía la frecuencia exacta del hidrógeno (1420 MHz) y era 30 veces más fuerte que el ruido de fondo. A pesar de más de 100 intentos de redetección, nunca se repitió. En 2017, Antonio Paris propuso que un cometa rico en hidrógeno pudo causarla, pero esta hipótesis no ha sido confirmada definitivamente.' },
      { label: 'En la Película', icon: 'zap', text: 'Los heptápodos de Arrival explican que ayudan a la humanidad porque en 3,000 años necesitarán asistencia humana. Esta motivación rompe con el tropo de la ciencia ficción donde los alienígenas son conquistadores o benefactores desinteresados. La cooperación a largo plazo refleja la estrategia evolutiva del altruismo recíproco, documentada por el biólogo Robert Trivers en 1971. En la naturaleza, los murciélagos vampiro comparten sangre regurgitada con miembros del grupo que los alimentaron previamente, una cooperación sostenida por memoria social a largo plazo.' },
    ],
    fact: 'Enrico Fermi planteó su pregunta durante un almuerzo en Los Álamos en el verano de 1950, acompañado por los físicos Edward Teller, Herbert York y Emil Konopinski. Según los testimonios de York y Teller, el grupo había estado bromeando sobre ovnis y una caricatura del New Yorker que mostraba alienígenas robando botes de basura. Fermi realizó rápidamente un cálculo mental estimando la probabilidad de civilizaciones avanzadas y el tiempo necesario para colonizar la galaxia, concluyendo que deberíamos ver evidencia de visitantes. Su cálculo informal de sobremesa se convirtió en uno de los problemas más debatidos de la astrofísica.',
  },
  {
    id: 'ciencia-ficcion-dura',
    title: 'Ciencia Ficción Dura',
    color: '#1B1B1B',
    btnImage: '/assets/ciencia_arrival/infographic_m5/btn_ciencia-ficcion-dura.jpg',
    image: '/assets/ciencia_arrival/infographic_m5/hero_ciencia-ficcion-dura.jpg',
    content: [
      'La ciencia ficción dura (hard science fiction) es un subgénero que prioriza la precisión científica y la consistencia interna de sus premisas especulativas. A diferencia de la ciencia ficción blanda o la fantasía, la hard sci-fi parte de principios científicos reales y extrapola sus consecuencias de forma rigurosa. Ted Chiang, autor de la novela corta "Story of Your Life" (1998) en la que se basa Arrival, es considerado uno de los practicantes más rigurosos de este género. Chiang estudió ciencias de la computación en la Universidad Brown y trabajó como redactor técnico.',

      'La base científica central de "Story of Your Life" es el principio variacional de Fermat, formulado en 1662 por el matemático francés Pierre de Fermat. Este principio establece que la luz siempre viaja por el camino que minimiza el tiempo de tránsito. Cuando la luz pasa del aire al agua, su trayectoria se curva (refracción) siguiendo la ley de Snell (descubierta independientemente por Ibn Sahl en 984 y Willebrord Snellius en 1621). Fermat demostró que esta curvatura es consecuencia de que la luz "elige" el camino temporal más corto entre todos los posibles.',

      'Chiang conecta el principio de Fermat con la mecánica lagrangiana, desarrollada por Joseph-Louis Lagrange en 1788. En la formulación lagrangiana, el movimiento de un objeto no se calcula fuerza por fuerza (como en la mecánica newtoniana), sino minimizando una cantidad llamada "acción" sobre toda la trayectoria. Richard Feynman expandió esta idea en su integral de caminos de 1948, donde una partícula cuántica toma simultáneamente todos los caminos posibles; los caminos que no minimizan la acción se cancelan por interferencia destructiva.',

      'La hipótesis Sapir-Whorf, propuesta por Edward Sapir y Benjamin Lee Whorf en las décadas de 1930 y 1940, sugiere que la estructura del lenguaje influye en la percepción y el pensamiento. Chiang lleva esta hipótesis a su extremo lógico: si un lenguaje está estructurado de forma variacional en lugar de causal (como los logramas circulares de los heptápodos), aprender ese lenguaje reestructuraría la cognición del hablante, permitiéndole percibir el tiempo de forma no secuencial. Estudios empíricos como los de Lera Boroditsky en Stanford (2001-2011) han documentado que el lenguaje sí afecta la percepción del tiempo, el espacio y el color.',

      'La rigurosidad científica de Chiang se manifiesta en los detalles: su descripción de la refracción es correcta, sus referencias al principio de mínima acción son precisas, y su extrapolación de la hipótesis Sapir-Whorf, aunque especulativa, es internamente consistente. Otros autores de hard sci-fi con este nivel de precisión incluyen a Greg Egan (que incorpora topología y mecánica cuántica), Peter Watts (neurociencia y biología marina), y Liu Cixin (cuyo "Problema de los Tres Cuerpos" de 2008 se basa en el problema no resuelto de mecánica celeste del mismo nombre, descrito originalmente por Henri Poincaré en 1890).',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Ted Chiang ha publicado menos de 20 relatos en toda su carrera, pero ha ganado cuatro premios Nebula, cuatro premios Hugo, seis premios Locus y un premio John W. Campbell Memorial. Su tasa de premios por relato publicado es la más alta de cualquier autor en la historia de la ciencia ficción. Chiang trabaja lentamente: cada relato le toma entre uno y cinco años de investigación y escritura. "Story of Your Life" le tomó aproximadamente dos años, durante los cuales estudió lingüística, principios variacionales y la hipótesis Sapir-Whorf en profundidad.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El principio de mínima acción es tan fundamental que Richard Feynman lo llamó "la ley más profunda de la física". Las ecuaciones de campo de Einstein de la Relatividad General se derivan del principio variacional de Hilbert (propuesto por David Hilbert en noviembre de 1915, cinco días antes de la publicación de Einstein). Las ecuaciones de Maxwell del electromagnetismo, la ecuación de Dirac de la mecánica cuántica relativista, y el Modelo Estándar de la física de partículas: todas se derivan de un principio de mínima acción aplicado a diferentes lagrangianos.' },
    ],
    fact: 'Pierre de Fermat formuló su principio sobre la luz en una carta a Marin Cureau de la Chambre fechada el 1 de enero de 1662. Fermat era abogado y magistrado en el Parlement de Toulouse; las matemáticas eran su ocupación no profesional. A pesar de ello, realizó contribuciones fundamentales al cálculo (antes que Newton y Leibniz), la teoría de números, la geometría analítica y la teoría de la probabilidad (en correspondencia con Blaise Pascal en 1654). Su "último teorema", escrito al margen de un libro en 1637 con la nota "tengo una demostración admirable que este margen es demasiado pequeño para contener", fue finalmente demostrado por Andrew Wiles en 1995 tras 358 años.',
    expandables: [
      { label: 'En la Película', icon: 'zap', text: '«Arrival» es considerada uno de los mejores ejemplos de ciencia ficción dura del siglo XXI. A diferencia de la mayoría del cine de contacto alienígena, no hay acción militar, no hay invasión, no hay "traductor universal". La solución al conflicto viene de la lingüística y el pacifismo científico. Denis Villeneuve contrató al lingüista real Jessica Coon de la Universidad McGill como consultora técnica. La película explora la hipótesis Sapir-Whorf, los sistemas de escritura logográficos, y los principios de la causalidad relativista con una fidelidad académica raramente vista en Hollywood. La revista Nature la clasificó como "la película de ciencia ficción más científicamente responsable de la última década".' },
    ],
  },
];

// ─── Alien Fog Particle Field (Canvas Background) ───────────────────────────
function AlienFogField() {
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
      drift: (Math.random() - 0.5) * 0.12,
      hue: Math.random() > 0.5 ? '139,157,175' : '106,123,141', // fog gray tones
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.06;
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

// ─── Arrival Header ─────────────────────────────────────────────────────────
function ArrivalScienceHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(139,157,175,0.3))' }}>
        {/* Arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#arrivalGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#8B9DAF','#7A8C9E','#6A7B8D','#4E4E4E','#3D3D3D','#2C2C2C','#1B1B1B'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central logogram icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#8B9DAF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="8" fill="none" stroke="#8B9DAF" strokeWidth="0.8" opacity="0.3" />
        <circle cx="300" cy="30" r="3" fill="#8B9DAF" opacity="0.5" />
        <defs>
          <linearGradient id="arrivalGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,157,175,0.2)" />
            <stop offset="50%" stopColor="rgba(139,157,175,0.9)" />
            <stop offset="100%" stopColor="rgba(139,157,175,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#8B9DAF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA CIENCIA DE ARRIVAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(139,157,175,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">FÍSICA, LENGUAJE Y TIEMPO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(139,157,175,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
          layoutId="activeDotArrivalM5"
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Video Section ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(139,157,175,0.15)',
    }}>
      <Star size={14} style={{ color: '#8B9DAF', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #8B9DAF, #4E4E4E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(139,157,175,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#8B9DAF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_ArrivalM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,15,22,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/arrival/arrival_m5_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(139,157,175,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <AlienFogField />

      <ArrivalScienceHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(139,157,175,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(139,157,175,0.08)', borderRadius: '16px',
              border: '1px solid rgba(139,157,175,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#8B9DAF', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado la ciencia detrás de Arrival!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Cazador de Fotones
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ─── Bibliografía ─── */}
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

      {/* ImageLightbox */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
