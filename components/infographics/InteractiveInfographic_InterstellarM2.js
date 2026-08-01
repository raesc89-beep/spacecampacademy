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

function DecoAccretionDisk({ size = 70, color = '#FF9800', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="28" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <ellipse cx="30" cy="30" rx="22" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <ellipse cx="30" cy="30" rx="16" ry="3" fill="none" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoEventHorizon({ size = 70, color = '#F44336', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
      <path d="M 10 30 L 20 30 M 50 30 L 40 30 M 30 10 L 30 20 M 30 50 L 30 40" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoSingularity({ size = 70, color = '#00BCD4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="3" fill={color} opacity="1" />
      <path d="M 30 0 L 30 25 M 30 60 L 30 35 M 0 30 L 25 30 M 60 30 L 35 30" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M 9 9 L 26 26 M 51 51 L 34 34 M 9 51 L 26 34 M 51 9 L 34 26" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
    </svg>
  );
}

function DecoGravityWell({ size = 70, color = '#7C4DFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 5 5 Q 30 40 55 5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 15 10 Q 30 45 45 10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M 25 15 Q 30 50 35 15" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <ellipse cx="30" cy="5" rx="25" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="50" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'anatomia-agujero-negro': [DecoBlackHole, DecoAccretionDisk, DecoEventHorizon],'horizonte-sucesos': [DecoEventHorizon, DecoBlackHole, DecoGravityWell],'agujero-negro-kerr': [DecoAccretionDisk, DecoEventHorizon, DecoSingularity],'frame-dragging': [DecoGravityWell, DecoAccretionDisk, DecoBlackHole],'disco-acrecion': [DecoAccretionDisk, DecoEventHorizon, DecoSingularity],'simulacion-gargantua': [DecoBlackHole, DecoAccretionDisk, DecoGravityWell],'singularidad': [DecoSingularity, DecoGravityWell, DecoEventHorizon],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Kerr, R.P. (1963). "Gravitational Field of a Spinning Mass", Physical Review Letters, 11(5)',
  'James, O. et al. (2015). "Gravitational Lensing by Spinning Black Holes in Astrophysics and in the Movie Interstellar", Classical and Quantum Gravity, 32(6)',
  'Penrose, R. (1965). "Gravitational Collapse and Space-Time Singularities", Physical Review Letters, 14(3)',
  'Event Horizon Telescope Collaboration (2019). "First M87 Event Horizon Telescope Results", The Astrophysical Journal Letters, 875(1)',
  'Everitt, C.W.F. et al. (2011). "Gravity Probe B: Final Results of a Space Experiment to Test General Relativity", Physical Review Letters, 106(22)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'anatomia-agujero-negro',
    title: 'Anatomía de un Agujero Negro',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m2/btn_anatomia.jpg',
    image: '/assets/interstellar/infographic_m2/hero_anatomia.jpg',
    content: [
      'Un agujero negro no es un espacio vacío, sino materia contenida en un volumen reducido. Imagina que comprimes la masa del Sol al tamaño de una ciudad. Esta densidad produce un campo gravitatorio tan intenso que ni la luz escapa. Actúa como una aspiradora que traga lo que cruza su camino. Se forma cuando una estrella agota su combustible nuclear y colapsa bajo su gravedad.',
      'En el centro de la Vía Láctea reside Sagitario A*, un agujero negro con la masa de cuatro millones de soles. Piensa en concentrar millones de cuerpos celestes en un volumen mínimo. Su gravedad mantiene unidas las órbitas de miles de millones de estrellas de manera estable. Así organiza la estructura de nuestra galaxia a través del tiempo cósmico.',
      'La anatomía de estos objetos tiene tres partes: la singularidad, el horizonte de sucesos y el disco de acreción. Imagina un huracán: el ojo es el centro, los vientos forman la barrera y los escombros son el disco. Los científicos usan telescopios para mapear estas regiones. Así observan los fenómenos de alta energía en estas fronteras.',
      'Muchos de estos cuerpos celestes rotan rápidamente y poseen una ergosfera. Allí el tejido espaciotemporal es arrastrado como un remolino de agua que empuja a los barcos. En esta región, los objetos giran junto con la masa central. Esto demuestra que la gravedad también arrastra la tela del espacio.',
      'Rodeando esta estructura está la esfera de fotones, una órbita inestable donde la luz gira antes de escapar o caer. Es similar a una pista de carreras donde los vehículos giran hasta perder la tracción. Esto permite observar los anillos usando radiotelescopios terrestres. Así se revelan las sombras proyectadas por estos objetos.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando la tripulación llega a Gargantúa, enfrentan un coloso con cien millones de masas solares. Esta magnitud permite que los planetas existan sin ser destrozados por las fuerzas de marea. Es un ejemplo de cómo el cine respeta las matemáticas. Integra la relatividad en la misión espacial.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Los agujeros negros de masa estelar nacen tras explosiones de supernovas. Sucede cuando las estrellas agotan su combustible y se derrumban por su propio peso. Es como un edificio que colapsa hacia sus cimientos. El Sol es demasiado pequeño para esto y se convertirá en una enana blanca.' }
    ],
    fact: 'Si reemplazáramos nuestro Sol por un agujero negro de la misma masa, la Tierra no sería absorbida. Nuestro planeta seguiría orbitando a la misma distancia, congelándose al perder el calor. Esto demuestra que la gravedad depende de la masa total y no del volumen.'
  },
  {
    id: 'horizonte-sucesos',
    title: 'El Punto de No Retorno',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m2/btn_horizonte.jpg',
    image: '/assets/interstellar/infographic_m2/hero_horizonte.jpg',
    content: [
      'El horizonte de sucesos es el límite donde la velocidad para escapar iguala la de la luz. Se asemeja al borde de una cascada donde un pez es arrastrado irremediablemente. Cualquier objeto que cruce esta línea queda desconectado del universo observable. Se convierte en prisionero de la gravedad cayendo hacia el centro.',
      'Karl Schwarzschild usó las ecuaciones de Einstein en 1916 para calcular el tamaño de esta frontera. Encontró el radio de Schwarzschild. Un horizonte para nuestro Sol mediría tres kilómetros de radio. Piensa en esconder una central de energía en el tamaño de un barrio. Este radio define donde la gravedad se vuelve absoluta.',
      'Dado que nada supera la velocidad de los fotones, la luz queda atrapada detrás de este telón. Funciona como una trampa donde los visitantes pueden entrar pero jamás salir. Los observadores no pueden ver lo que ocurre en el interior. Los físicos teóricos intentan comprender este misterio usando herramientas matemáticas y simulaciones.',
      'Desde lejos, un reloj que se acerca a este horizonte parece disminuir su marcha hasta detenerse. Es como presenciar una película que se congela en un fotograma por la eternidad. Sin embargo, para el viajero que cae, su tiempo avanza de forma normal. Experimenta el viaje sin notar alteraciones temporales en sus instrumentos.',
      'Esta barrera es un límite geométrico y no posee una superficie física contra la cual chocar. Se compara con la línea del ecuador en un globo terráqueo; puedes cruzarla navegando sin sentir un golpe. Sin embargo, las fuerzas gravitacionales desgarran las moléculas de cualquier material que intente aproximarse, debido a la diferencia de atracción.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cooper debe cruzar el horizonte de sucesos de Gargantúa para recolectar datos. Para lograrlo, sacrifica la nave robótica TARS. La película retrata este descenso respetando la teoría física. La luz sigue siendo visible por un tiempo antes de llegar al teseracto, que transmite información.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2019, el Telescopio del Horizonte de Sucesos capturó la primera imagen de esta frontera. La fotografía reveló un anillo de gas rodeando un núcleo oscuro en la galaxia M87. Esta hazaña requirió coordinar antenas en múltiples continentes, confirmando visualmente las predicciones teóricas.' }
    ],
    fact: 'Si un explorador cayera cruzando el horizonte de un agujero estelar, sufriría espaguetización. La gravedad estiraría su cuerpo como un fideo. En agujeros supermasivos, este efecto no ocurre en la frontera. El cruce inicial es tranquilo porque el gradiente gravitatorio es suave a grandes distancias.'
  },
  {
    id: 'agujero-negro-kerr',
    title: 'El Agujero Negro que Gira',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m2/btn_kerr.jpg',
    image: '/assets/interstellar/infographic_m2/hero_kerr.jpg',
    content: [
      'El matemático Roy Kerr resolvió las ecuaciones de Einstein en 1963 para describir agujeros negros en rotación. Imagina encontrar la llave para una caja fuerte geométrica indescifrable. Su solución demostró que el universo contiene objetos giratorios complejos. Reveló que el momento angular altera la estructura del espacio-tiempo.',
      'A diferencia de las esferas estáticas, los agujeros de Kerr desarrollan un horizonte achatado en sus polos y abultado en el centro. Se asemeja a una calabaza girando velozmente. Esta deformación surge por las fuerzas de rotación. Altera las rutas seguidas por las naves y la luz, creando un entorno dinámico.',
      'En la solución de Kerr, la masa no colapsa en un punto microscópico. Adopta la forma de un anillo unidimensional muy denso. Piensa en una dona de materia comprimida. Esta singularidad anular gira a tal velocidad que la fuerza centrífuga evita el colapso absoluto hacia el centro.',
      'En Interstellar, Gargantúa rota al noventa y nueve por ciento de la velocidad de la luz. Es comparable a lanzar un trompo que difumina la realidad. Esta rotación extrema es necesaria para que el planeta Miller orbite de cerca sin precipitarse. Aprovecha el equilibrio entre fuerza centrífuga y gravedad.',
      'Kip Thorne diseñó estos parámetros para respetar las leyes de la ciencia. Ajustar esta rotación fue como calibrar el motor de un vehículo para un rendimiento óptimo. Lograron que el tiempo se dilatara sin destruir los mundos. Esto demuestra que la ficción puede basarse en ciencia rigurosa.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Christopher Nolan modeló la asimetría de Gargantúa basándose en cálculos científicos. El lado del disco que gira hacia la cámara se ve más brillante por el efecto Doppler. Esta asimetría fue renderizada con fidelidad matemática, creando un hito visual en la cinematografía.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Antes de Kerr, los científicos dudaban de la existencia de agujeros negros. La solución rotatoria demostró que pueden formarse tras explosiones estelares. Toda estrella posee rotación que se conserva según la física. Esto confirmó que la naturaleza puede producir geometrías extremas.' }
    ],
    fact: 'La estructura espaciotemporal de Kerr es tan retorcida que sugiere caminos hacia otras partes del universo. Sin embargo, los científicos advierten que cruzar físicamente este anillo resultaría en desintegración. Las fuerzas de curvatura infinita destruirían cualquier materia.'
  },
  {
    id: 'frame-dragging',
    title: 'Cuando el Espacio Gira Contigo',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m2/btn_framedrag.jpg',
    image: '/assets/interstellar/infographic_m2/hero_framedrag.jpg',
    content: [
      'El arrastre de marco, predicho por Lense y Thirring, establece que cualquier objeto giratorio arrastra el tejido cósmico. Imagina sumergir una cuchara en miel y dar giros rápidos. La miel gira junto a ella. Así, el espacio acompaña la danza de los astros, creando un vórtice gravitacional.',
      'En 2011, la misión Gravity Probe B confirmó este efecto alrededor de la Tierra. Un giroscopio flotando en el espacio detectó la torcedura del vacío. Esta sonda demostró que la materia en rotación altera mecánicamente las coordenadas. Así comprobó una predicción sutil de la relatividad general.',
      'Cerca de Gargantúa, este arrastre es una tormenta donde el espacio gira casi a la velocidad de la luz. Sería como estar atrapado en un tornado colosal de vacío puro. Las naves son llevadas por la corriente sin importar la potencia de sus motores. Esto obliga a calcular trayectorias complejas.',
      'Este arrastre crea la ergosfera, una zona exterior al horizonte de sucesos donde es imposible permanecer estático. Es como una cinta de correr donde el piso avanza rápidamente. Todo objeto debe girar en la dirección del agujero central, arrastrado por la rotación del tejido espacial.',
      'El proceso de Penrose propone utilizar la ergosfera para robar energía al agujero negro. Es como arrojar una roca hacia un molino de viento para extraer impulso. Al arrojar parte de su carga hacia el abismo, un vehículo podría escapar con velocidad asombrosa aprovechando la energía rotacional.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La nave Endurance utiliza maniobras de asistencia gravitatoria en el vórtice de Gargantúa. Al volar hacia la ergosfera, Brand aprovecha el impulso del espacio-tiempo para catapultarse hacia el planeta de Edmunds. Esta maniobra extrae energía del monstruo cósmico en movimiento.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El satélite Gravity Probe B requirió las esferas más perfectas jamás creadas. Estos rotores de cuarzo eran tan redondos que, si tuvieran el tamaño de la Tierra, su montaña más alta mediría tres metros. Su precisión fue vital para probar el arrastre de marco.' }
    ],
    fact: 'Cuando un objeto ingresa a la ergosfera, una porción de su masa se transforma en energía cinética. El mecanismo de Penrose demuestra que los agujeros negros actúan como potentes baterías. Podrían suministrar energía a civilizaciones avanzadas que dominen esta tecnología.'
  },
  {
    id: 'disco-acrecion',
    title: 'El Anillo de Fuego',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m2/btn_disco.jpg',
    image: '/assets/interstellar/infographic_m2/hero_disco.jpg',
    content: [
      'El disco de acreción es una estructura compuesta de gas interestelar caliente y polvo cósmico. Órbita alrededor de un núcleo negro. Funciona como una licuadora que tritura estrellas vecinas reduciéndolas a plasma brillante. La materia se aglomera en carriles concéntricos por la inmensa gravedad, creando un espectáculo luminoso.',
      'La fricción de las partículas estelares choca a grandes velocidades y eleva la temperatura a millones de grados. Esto genera emisiones de rayos X. Imagina frotar tus manos con fricción suficiente para derretir acero. Este proceso convierte materia en luz, liberando radiación que viaja por el espacio.',
      'Estos sistemas de discos de gas generan cuásares, los faros celestes más potentes conocidos. Son como luces de emergencia que iluminan la ciudad estelar. Eclipsan la luz combinada de todas las estrellas de su galaxia. Sirven como balizas cósmicas para estudiar la evolución del universo.',
      'Un efecto relativista llamado haz Doppler provoca que el segmento frontal del disco parezca más brillante al acercarse. Es similar a una sirena de ambulancia que suena más fuerte al dirigirse hacia ti. Este desplazamiento azul aumenta la luminosidad en un extremo del aro, revelando la rotación del plasma.',
      'La interacción eléctrica entre el plasma y el espacio curvo produce campos magnéticos. Estos actúan como cañones galácticos, canalizando material en finos chorros relativistas. Son como mangueras gigantes que disparan radiación letal. Pueden esterilizar sistemas solares lejanos, demostrando su largo alcance destructivo.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El modelo del disco de Gargantúa fue modificado para rebajar su emisión de rayos X. En la realidad física, un disco ardiente freiría a la nave espacial Ranger antes de aproximarse. Los creadores realizaron esta concesión artística para permitir que los astronautas sobrevivieran.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Los chorros de alta energía expulsados desde los polos magnéticos viajan a velocidades extremas. Alcanzan el noventa y nueve por ciento de la velocidad de la luz. Tienen potencia para frenar la formación estelar en galaxias vecinas, calentando el gas y regulando el crecimiento galáctico.' }
    ],
    fact: 'El gas estelar cercano al abismo se mueve tan rápido que su tiempo interno se reduce radicalmente por la relatividad. Si viajaras en esa zona, verías que el universo envejece millones de años en pocos minutos. Esto ilustra la naturaleza maleable del tiempo espacial.'
  },
  {
    id: 'simulacion-gargantua',
    title: 'Gargantúa en la Computadora',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m2/btn_simulacion.jpg',
    image: '/assets/interstellar/infographic_m2/hero_simulacion.jpg',
    content: [
      'Kip Thorne forjó una alianza pionera con Double Negative Effects para diseñar un modelo visual de Gargantúa. Esta colaboración mezcló las matemáticas con la pintura virtual. Lograron una unión sin igual entre la industria del cine y la investigación académica sobre la estructura geométrica del cosmos.',
      'El programador Oliver James redactó un código de trazado de rayos para doblar las rutas de luz en el espacio curvo. Consistió en diseñar espejos deformantes de una feria virtual utilizando fórmulas complejas. Así simuló la lente gravitacional resolviendo ecuaciones diferenciales para cada trayectoria fotónica.',
      'Las ecuaciones para renderizar estos paisajes consumían recursos de computación a escala bestial. Requirieron ochocientos terabytes informáticos para guardar cada textura en alta resolución. Es como gestionar una biblioteca completa en discos duros para producir pocos segundos de metraje cinematográfico.',
      'Interstellar se convirtió en la primera película en incorporar modelos realistas de un agujero gravitatorio extremo. Representa el triunfo de un documental oculto bajo el disfraz de cine popular. Educó al público sobre conceptos avanzados de física teórica mientras ofrecía una experiencia audiovisual emocionante.',
      'El esfuerzo de este grupo no quedó solo en la industria del entretenimiento. Publicaron sus descubrimientos de programación estelar en dos artículos científicos. Demostraron que la búsqueda de belleza estética puede generar avances científicos genuinos para la academia.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La creación digital de los anillos brillantes que cruzan el agujero central desconcertó a los animadores. Kip Thorne tuvo que explicar que no existía un error de código. Era la física curvando el disco de gas alrededor de la esfera negra debido a la intensa gravedad.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Algunos fotogramas de esta secuencia requirieron cien horas de procesamiento continuo en redes de servidores. Así lograron completar una imagen brillante con los destellos luminosos correctos según las leyes de la geometría curvada. Esto estableció un nuevo estándar de fidelidad.' }
    ],
    fact: 'El motor de simulación descubrió una serie de huellas luminosas matemáticas en el vacío. Reveló que el agujero rotatorio no solo desviaba la luz, sino que atrapaba fotones dando giros infinitos a lo largo del tejido estelar. Fue un fenómeno óptico inédito en la investigación académica.'
  },
  {
    id: 'singularidad',
    title: 'El Centro del Misterio',
    color: '#00BCD4',
    btnImage: '/assets/interstellar/infographic_m2/btn_singularidad.jpg',
    image: '/assets/interstellar/infographic_m2/hero_singularidad.jpg',
    content: [
      'Una singularidad matemática es una región topológica donde enormes cantidades de materia se aplastan hasta una densidad infinita. Equivale a someter una montaña a trituración hasta ocupar un espacio menor que un grano de arena. Concentra toda su energía en un volumen cercano a cero, desafiando la física.',
      'Cuando los físicos aplican las fórmulas de la relatividad general a esta región, las ecuaciones retornan errores conocidos como infinitos. Piensa en una calculadora intentando dividir por cero. En este entorno, las leyes de la física clásica pierden por completo su capacidad de predicción.',
      'Entender la singularidad oscura requiere una teoría unificadora novedosa: la gravedad cuántica. Es como encajar la pieza de un rompecabezas que fusiona dos mapas dispares. Debe unir las reglas del mundo subatómico con la macroscópica curvatura del espacio-tiempo propuesta por Einstein.',
      'En 1965, Roger Penrose presentó el teorema de la singularidad oculta. Logró detallar los túneles de esta región topológica sin entrar físicamente en ella. Utilizó argumentos innovadores que revolucionaron la cosmología matemática moderna y la astrofísica teórica contemporánea.',
      'Dentro de un agujero giratorio tipo Kerr, esta densa estructura no colapsa sobre un punto estático. Adopta el perfil topológico de un anillo. Es un aro sideral compuesto de material que gira sin descanso. Crea un torbellino de gravedad repulsiva capaz de expulsar objetos hacia el exterior.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El final trascendental muestra a Cooper adentrándose en la singularidad cósmica. Una especie del futuro colocó un teseracto hiperdimensional para protegerlo de las fuerzas de marea. Esto le permite interactuar con la línea temporal a través de cuerdas gravitacionales de la cuarta dimensión.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Roger Penrose recibió el premio Nobel de física en 2020. Su trabajo demostró a la comunidad científica que los agujeros negros son objetos físicos reales y no anomalías matemáticas de soluciones idealizadas. Así cimentó su legado en la historia de la astrofísica.' }
    ],
    fact: 'Los cálculos cuánticos proponen que una singularidad interior podría no ser un destructivo agujero insondable. Podría representar un conducto dimensional vertiginoso hacia otras regiones de multiversos. Allí las constantes fundamentales del plano físico exhibirían valores distintos a los nuestros.'
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
          const colors = ['#FF6B35','#F44336','#AB47BC','#4FC3F7','#FF9800','#7C4DFF','#00BCD4'];
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
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">GARGANTÚA â€“ ANATOMÍA DE UN MONSTRUO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">FÍSICA Y ESTRUCTURA DE UN AGUJERO NEGRO</text>
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
          layoutId="activeDotInterstellarM2"
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0a0c1e',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} /> Profundiza tu Conocimiento
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fast Fact â”€â”€â”€ */}
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

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterstellarM2() {
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

        {/* â”€â”€â”€ Node Navigation â”€â”€â”€ */}
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

        {/* â”€â”€â”€ Dynamic Content Area â”€â”€â”€ */}
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
                    Selecciona un nodo interactivo de Gargantúa para explorar la física del agujero negro
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* â”€â”€â”€ Bibliography Footer â”€â”€â”€ */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '16px',
        }}>
          <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ðŸ“š Fuentes y Referencias
          </h4>
          <ul style={{
            margin: 0, padding: '0 0 0 1.2rem',
            display: 'flex', flexDirection: 'column', gap: '0.8rem',
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
