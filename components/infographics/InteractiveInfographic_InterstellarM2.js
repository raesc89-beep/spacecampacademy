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
  'anatomia-agujero-negro': [DecoBlackHole, DecoAccretionDisk, DecoEventHorizon],
  'horizonte-sucesos': [DecoEventHorizon, DecoBlackHole, DecoGravityWell],
  'agujero-negro-kerr': [DecoAccretionDisk, DecoEventHorizon, DecoSingularity],
  'frame-dragging': [DecoGravityWell, DecoAccretionDisk, DecoBlackHole],
  'disco-acrecion': [DecoAccretionDisk, DecoEventHorizon, DecoSingularity],
  'simulacion-gargantua': [DecoBlackHole, DecoAccretionDisk, DecoGravityWell],
  'singularidad': [DecoSingularity, DecoGravityWell, DecoEventHorizon],
};

// ─── Content Data ────────────────────────────────────────────────────────────
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
      'Un agujero negro no es un simple espacio vacío sideral, sino una cantidad masiva de materia empacada fuertemente en un volumen extremadamente reducido. Imagina que tomas toda la masa de nuestro Sol y la aplastas hasta que tenga el tamaño de una ciudad. Esta densidad produce un campo gravitatorio tan intenso que ni la luz logra escapar, actuando como una aspiradora cósmica que traga todo lo que cruza su camino. Se forma cuando una estrella agota su combustible y colapsa.',
      'En el centro galáctico de la Vía Láctea reside Sagitario A*, un agujero negro que contiene la masa de cuatro millones de soles. Piensa en esto como meter millones de elefantes dentro de una caja de zapatos. A pesar de esta inmensa densidad que detectan los astrónomos, su gravedad mantiene unidas las órbitas de miles de millones de estrellas a su alrededor de manera estable, organizando la estructura misma de toda nuestra galaxia espiral de una manera sorprendentemente ordenada.',
      'La anatomía de estos objetos se divide en tres partes físicas principales: la singularidad central, el horizonte de sucesos y un disco de acreción. Imagina un huracán en el océano: el ojo representa el centro absoluto, los fuertes vientos forman la barrera invisible y los escombros que giran representan el disco brillante de gas. Los científicos utilizan telescopios avanzados para mapear estas regiones matemáticas, desentrañando paso a paso los secretos de la gravedad.',
      'Muchos de estos cuerpos celestes rotan rápidamente y poseen una zona exterior llamada ergosfera, donde el tejido espaciotemporal es arrastrado sin piedad. Esto funciona exactamente como un gran remolino de agua que arrastra a los barcos hacia una rotación obligatoria. En esta región limítrofe, los objetos físicos se ven forzados a girar junto con la masa central, demostrando que la gravedad también puede arrastrar la misma tela del espacio y no solo atraer a los objetos.',
      'Rodeando esta estructura se encuentra la esfera de fotones, una órbita inestable donde las partículas de luz giran temporalmente antes de escapar o caer. Es similar a una pista de carreras ovalada donde los vehículos luminosos dan vueltas hasta perder la tracción y salirse del camino de forma inevitable. La captura de luz en este delicado equilibrio permite que podamos observar los anillos resplandecientes usando radiotelescopios que operan desde diferentes puntos de la Tierra.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando la tripulación de la nave Endurance llega al sistema de Gargantúa, se enfrentan a un coloso que posee cien millones de masas solares. Esta magnitud absurda fue elegida específicamente por los asesores científicos para garantizar que los planetas que orbitan a su alrededor pudieran existir sin ser destrozados por las fuerzas de marea extremas, algo que destruye el entorno rápidamente. Es un ejemplo perfecto de cómo el cine respeta las matemáticas teóricas para la trama narrativa.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Los agujeros negros de masa estelar nacen tras explosiones de supernovas, cuando estrellas masivas agotan su combustible nuclear y se derrumban sobre sí mismas por su propio peso gigantesco. Este violento final es como un edificio en demolición que colapsa hacia sus cimientos en una fracción de segundo, comprimiendo sus átomos originales. Nuestra estrella local, el Sol, es demasiado pequeña para sufrir este destino dramático y terminará convirtiéndose en una enana blanca solitaria.' },
    ],
    fact: 'Aunque la cultura popular los pinta como devoradores errantes, si reemplazáramos nuestro Sol por un agujero negro de la misma masa exacta, la Tierra no sería absorbida. Nuestro planeta azul seguiría orbitando a la misma distancia en completa oscuridad, congelándose rápidamente al perder la fuente de calor. Esto demuestra que la fuerza gravitatoria a gran distancia depende solo de la masa total y no del volumen reducido.',
  },
  {
    id: 'horizonte-sucesos',
    title: 'El Punto de No Retorno',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m2/btn_horizonte.jpg',
    image: '/assets/interstellar/infographic_m2/hero_horizonte.jpg',
    content: [
      'El horizonte de sucesos es el límite fronterizo de un agujero negro, el punto exacto donde la velocidad necesaria para escapar iguala la velocidad de la luz. Se asemeja al borde de una cascada de agua donde un pez nadador ya no puede luchar contra la fuerte corriente y es arrastrado irremediablemente. Cualquier objeto que cruce esta línea matemática queda desconectado de nuestro universo observable y no puede enviar ningún tipo de señal para pedir ayuda a los rescatistas espaciales.',
      'Karl Schwarzschild fue el científico pionero que utilizó las ecuaciones de Einstein en 1916 para calcular el tamaño exacto de esta frontera opaca, hallando lo que hoy llamamos el radio de Schwarzschild. Si aplicamos su famosa fórmula, un horizonte para nuestro Sol mediría apenas tres kilómetros de radio. Piensa en esto como esconder una enorme central de energía en el tamaño de un barrio suburbano. Este radio define el volumen límite donde la gravedad se vuelve completamente absoluta.',
      'Dado que nada supera la velocidad de los fotones en el vacío cósmico, la luz misma queda atrapada permanentemente detrás de este telón oscuro impenetrable. Funciona como una trampa de insectos donde los visitantes cósmicos pueden registrarse y entrar libremente pero jamás lograr salir. Los observadores externos no pueden ver lo que ocurre en el interior, dejando el volumen interno rodeado de un absoluto misterio matemático que los físicos teóricos intentan comprender a diario.',
      'Desde la perspectiva segura de un astronauta que observa de lejos, un reloj que se acerca a este horizonte parece disminuir su marcha gradualmente hasta detenerse por completo. Es como presenciar una película que de repente se congela en un solo fotograma por el resto de la eternidad. Sin embargo, para el viajero que cae hacia el abismo central, su propio tiempo avanza de forma normal mientras cruza la frontera, aunque su destino final resulte inevitable y fatal por la compresión.',
      'Es importante entender que esta barrera es un límite geométrico invisible y no posee ninguna superficie sólida real contra la cual chocar. Se puede comparar perfectamente con la línea del ecuador geográfico en un globo terráqueo; puedes cruzarla navegando en un barco sin sentir ningún golpe físico. No obstante, las intensas fuerzas gravitacionales asociadas aseguran que las estructuras materiales sufran una deformación letal al intentar aproximarse a esta región prohibida por la física.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En el desenlace de la misión, el astronauta Cooper debe cruzar deliberadamente el horizonte de sucesos de Gargantúa para recolectar datos cuánticos que salvarán a la humanidad. Para lograr esto, debe sacrificar la nave robótica TARS, arrojándolo al abismo gravitacional. La película retrata este descenso como una caída silenciosa hacia la más absoluta oscuridad, respetando la teoría de que la luz exterior sigue siendo visible por un tiempo antes de llegar al teseracto misterioso.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'En el año 2019, la colaboración global del Telescopio del Horizonte de Sucesos hizo historia científica al capturar la primera imagen real de esta sombra fronteriza. La fotografía borrosa reveló un anillo naranja brillante de gas caliente rodeando un núcleo oscuro situado en la galaxia M87. Esta hazaña tecnológica requirió coordinar antenas en múltiples continentes, creando un ojo del tamaño de la Tierra que confirmó visualmente lo que las matemáticas predecían hace un siglo.' },
    ],
    fact: 'Si un temerario explorador espacial cayera de pies cruzando el horizonte de sucesos de un agujero de tamaño estelar, experimentaría un efecto letal conocido como espaguetización. La fuerza gravitatoria que tiraría de sus botas sería mucho mayor que la ejercida sobre su cabeza, estirando su cuerpo como un fideo largo de pasta caliente. En agujeros supermasivos, este efecto no ocurre en la frontera, permitiendo un cruce inicial sorprendentemente tranquilo para los intrépidos viajeros.',
  },
  {
    id: 'agujero-negro-kerr',
    title: 'El Agujero Negro que Gira',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m2/btn_kerr.jpg',
    image: '/assets/interstellar/infographic_m2/hero_kerr.jpg',
    content: [
      'El brillante matemático neozelandés Roy Kerr logró un hito histórico en 1963 cuando resolvió las complejas ecuaciones de Einstein para describir un agujero negro que se encuentra en rotación. Imagina encontrar la llave secreta para abrir una caja fuerte de geometría que nadie había podido descifrar en décadas. Su elegante solución demostró que el universo real contiene objetos giratorios mucho más complejos y fascinantes que los simples modelos estáticos analizados originalmente.',
      'A diferencia de las esferas perfectas, los agujeros negros rotatorios de tipo Kerr desarrollan un horizonte de sucesos claramente achatado en sus polos y abultado en el centro. Esto se asemeja bastante a la forma de una calabaza ancha girando velozmente sobre el disco de una mesa. Esta curiosa deformación geométrica surge debido a las fuerzas centrífugas extremas generadas por la rotación, alterando profundamente las rutas seguidas por las naves y la luz en sus inmediaciones cercanas.',
      'Otra característica asombrosa de la solución de Kerr es que la masa central no colapsa en un solo punto microscópico infinito, sino que adopta la forma de un anillo unidimensional extremadamente denso. Piensa en este extraño objeto cuántico como una dona sólida hecha de materia puramente triturada y comprimida al máximo. Esta singularidad anular gira a tal velocidad que su fuerza centrífuga evita el colapso final hacia el centro absoluto, manteniendo una estructura matemática muy rara.',
      'En el mundo cinematográfico de Interstellar, los asesores determinaron que Gargantúa debe rotar a un impactante 99.8 por ciento de la velocidad máxima teórica permitida para la luz en el universo. Es comparable a lanzar un trompo de juguete cósmico que gira tan absurdamente rápido que difumina la realidad a su alrededor. Esta velocidad extrema es absolutamente necesaria para explicar por qué el planeta Miller puede orbitar tan cerca sin precipitarse directamente hacia la zona de destrucción.',
      'El físico Kip Thorne diseñó rigurosamente estos parámetros astronómicos extremos para que los requerimientos dramáticos del guion de la película no violaran las leyes establecidas de la ciencia moderna. Ajustar esta rotación fue como calibrar minuciosamente el motor de un vehículo de carreras para alcanzar el máximo rendimiento sin que exploten sus delicados componentes mecánicos. Lograron que el tiempo se dilatara masivamente sin destruir los frágiles mundos acuáticos en órbita lejana.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El director Christopher Nolan confió plenamente en los cálculos de los científicos para modelar la asimetría visual de Gargantúa en la pantalla gigante. Como el horizonte achatado arrastra a los fotones con su rotación acelerada, el lado del disco que gira acercándose hacia la cámara se ve notablemente más brillante debido al efecto Doppler extremo. Esta asimetría óptica fue renderizada con fidelidad matemática, creando un hito visual y científico sin precedentes en la industria.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Antes del revolucionario descubrimiento matemático de Kerr en la década de los sesenta, la comunidad científica dudaba si los agujeros negros eran entidades reales que existían en el cosmos o simples anomalías matemáticas que solo vivían en las pizarras teóricas. La solución rotatoria demostró contundentemente que estos monstruos de gravedad podían formarse naturalmente a partir de explosiones estelares reales, ya que toda estrella posee rotación original que debe ser obligatoriamente conservada.' },
    ],
    fact: 'La estructura espaciotemporal alrededor de un agujero de Kerr es tan retorcida e inusual que las ecuaciones teóricas sugieren la posible existencia de caminos que viajan a través de la misteriosa singularidad anular hacia otras partes del universo u otros puentes de Einstein-Rosen. Sin embargo, los científicos teóricos advierten enfáticamente que adentrarse físicamente en este anillo cuántico resultaría en una desintegración segura por las fuerzas letales fluctuantes que dominan este reino.',
  },
  {
    id: 'frame-dragging',
    title: 'Cuando el Espacio Gira Contigo',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m2/btn_framedrag.jpg',
    image: '/assets/interstellar/infographic_m2/hero_framedrag.jpg',
    content: [
      'El extraño efecto de arrastre de marco espacial, predicho tempranamente por Lense y Thirring, establece que cualquier objeto giratorio arrastra forzosamente el tejido cósmico alrededor de su propio eje rotacional. Imagina sumergir lentamente una gran cuchara de madera en un espeso tarro de miel líquida y empezar a dar giros rápidos. La pegajosa miel que rodea la cuchara girará junto a ella obligatoriamente, ilustrando cómo el espacio mismo acompaña la danza de los astros masivos.',
      'En 2011, tras décadas de complicado desarrollo técnico, la misión Gravity Probe B de la agencia espacial confirmó exitosamente este sutil efecto alrededor de nuestro hogar, el planeta Tierra. Fue un experimento fascinante que involucró un diminuto giroscopio metálico flotando pacíficamente en el espacio sideral, sintiendo la levísima torcedura del vacío a su alrededor. Esta sonda demostró irrefutablemente que la materia en rotación altera mecánicamente las coordenadas de los satélites.',
      'Cerca del monstruo rotatorio llamado Gargantúa, este mismo efecto de arrastre no es una sutil corrección matemática, sino una poderosa tormenta huracanada invisible donde el espacio mismo gira cerca de la velocidad de la luz. Experimentar esto sería equivalente a estar atrapado repentinamente en un tornado colosal hecho de vacío puro. Las naves espaciales que intentan navegar en esta región violenta son llevadas por la corriente sin importar cuánta potencia apliquen a sus fuertes motores.',
      'Este arrastre colosal crea la mencionada ergosfera geométrica, una zona limítrofe por fuera del horizonte de sucesos donde es físicamente imposible permanecer estático. Es como encontrarse atrapado en la sala de espera de un tren a alta velocidad donde el piso mismo corre rápidamente hacia la puerta final de salida. En esta región limítrofe extrema, todo objeto físico, independientemente de su masa propia, debe girar en la misma dirección que el gran agujero sin oponer ninguna resistencia.',
      'El famoso proceso de Penrose propone que una nave astuta podría utilizar esta zona arremolinada de la ergosfera para robarle energía de rotación directamente al temible agujero negro central. El truco teórico funciona igual que arrojar una roca pesada hacia las aspas de un gran molino de viento para extraer impulso de salida hacia las estrellas distantes. Arrojando parte de su carga útil hacia el abismo central, un vehículo inteligente podría escapar impulsado con una velocidad asombrosa.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La nave Endurance utiliza magistralmente las maniobras de asistencia gravitatoria en el intenso vórtice espacial creado por el colosal Gargantúa. Al volar directamente hacia la peligrosa ergosfera giratoria, la experimentada piloto Brand logra aprovechar el brutal impulso del arrastre del espacio-tiempo para catapultar dramáticamente a la sonda hacia el planeta lejano de Edmunds. Esta arriesgada maniobra extrae literalmente energía física pura del monstruo cósmico en movimiento veloz.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El satélite satelital Gravity Probe B requirió inventar e instalar las esferas manufacturadas más lisas y perfectas jamás creadas por los ingenieros de la historia de la civilización humana. Estos asombrosos rotores de cuarzo prístino eran tan increíblemente redondos que si se ampliaran hipotéticamente hasta tener el colosal tamaño de nuestro mundo terrenal, la montaña más alta mediría solamente unos ínfimos tres metros de altura. Su precisión obsesiva fue la única forma capaz de probar esto.' },
    ],
    fact: 'Cuando un objeto cae en picado cruzando los límites estáticos convencionales para ingresar a la poderosa ergosfera, una porción importante de su valiosa masa física original se transforma directamente en pura energía cinética aprovechable. Este mecanismo teórico extraordinario propuesto brillantemente por Roger Penrose demuestra matemáticamente que los temidos agujeros negros no solo destruyen la materia inerte de forma irresponsable, sino que también actúan como potentes baterías galácticas.',
  },
  {
    id: 'disco-acrecion',
    title: 'El Anillo de Fuego',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m2/btn_disco.jpg',
    image: '/assets/interstellar/infographic_m2/hero_disco.jpg',
    content: [
      'El brillante disco de acreción es una imponente y aplanada estructura cósmica compuesta principalmente de gas interestelar sobrecalentado y polvo cósmico que orbita frenéticamente alrededor de un núcleo negro. Funciona en la práctica como una destructiva licuadora sideral que tritura sin piedad a las desafortunadas estrellas vecinas reduciéndolas a nubes de plasma brillante. La materia se aglomera y gira violentamente formando carriles concéntricos debido a la inmensa gravedad central actuante.',
      'La fricción producida por las inmensas partículas estelares chocando a grandes velocidades relativas eleva la temperatura térmica del disco a millones de grados centígrados, generando potentes emisiones de rayos X de alta energía. Imagina frotar tus dos manos frías fuertemente en pleno invierno nevado, pero generando suficiente fricción térmica como para derretir planchas de acero macizo al instante. Este intenso proceso termodinámico convierte de manera muy eficiente la materia en luz pura.',
      'Algunos de estos sistemas masivos alimentados constantemente por discos de gas gigantescos generan los formidables cuásares lejanos, los faros celestes más potentes de toda la creación conocida por el hombre. Brillan tanto que son el equivalente a colocar una colosal luz de emergencia intergaláctica encendida que ilumina toda la ciudad estelar oscura, eclipsando fácilmente la luz combinada natural de todas las demás estrellas de su galaxia entera reunidas por los telescopios ópticos modernos.',
      'Debido a las alucinantes velocidades implicadas, un curioso efecto relativista denominado haz Doppler provoca que el segmento frontal del disco giratorio que avanza hacia el observador parezca intensamente más brillante. Funciona de la misma manera que una potente sirena de ambulancia en la carretera que suena agudamente mucho más fuerte mientras se dirige directamente hacia ti a gran velocidad. Este desplazamiento azul aumenta dramáticamente la luminosidad aparente en un extremo determinado del aro.',
      'La compleja interacción eléctrica entre el denso plasma conductor y el retorcido espacio curvo produce poderosos e inmensos campos magnéticos que actúan como cañones galácticos, canalizando una porción del material ardiente en finos chorros relativistas. Piensa en estos letales haces de partículas veloces como mangueras de bomberos espaciales gigantescas que disparan densos chorros de radiación letal hacia los rincones más fríos, esterilizando sistemas solares situados a miles de años luz.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El maravilloso e impresionante modelo matemático que fue generado a partir del disco luminoso de Gargantúa fue deliberadamente modificado por el equipo de artistas para rebajar sensiblemente su emisión mortífera de rayos X. En el entorno real estricto que predicen las leyes físicas, un disco tan ardiente freiría irremediablemente a la nave espacial Ranger mucho antes de que lograra aproximarse siquiera a los bordes exteriores de la ergosfera giratoria gigante protectora del agujero.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Los poderosos e indetenibles chorros de alta energía que son expulsados furiosamente desde los potentes polos magnéticos de los discos de acreción viajan a velocidades verdaderamente espeluznantes, en algunos casos alcanzando la pavorosa marca de más del noventa y nueve por ciento de la barrera de la luz en el vacío. Estos destructivos emisarios energéticos actúan con tanta potencia cósmica incontrolable que pueden moldear, alterar y frenar la formación estelar en galaxias vecinas.' },
    ],
    fact: 'El gas estelar candente situado en los bordes más pegados al abismo interior se mueve tan excesivamente rápido que las leyes impuestas por la relatividad especial reducen radicalmente la tasa de su tiempo interno. Si lograras viajar de alguna manera montado en una molécula de plasma que gira en esa zona límite del embudo, presenciarías asombradamente que todo el inmenso y vasto universo restante envejecería aceleradamente millones de años en cuestión de unos pocos y valiosos minutos locales.',
  },
  {
    id: 'simulacion-gargantua',
    title: 'Gargantúa en la Computadora',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m2/btn_simulacion.jpg',
    image: '/assets/interstellar/infographic_m2/hero_simulacion.jpg',
    content: [
      'El meticuloso científico teórico Kip Thorne forjó una alianza pionera y fructífera con el talentoso equipo artístico de Double Negative Effects para diseñar un modelo visual inaudito de Gargantúa que respetara la física. Fue una colaboración asombrosa que logró mezclar equilibradamente las rígidas e inflexibles reglas de las frías matemáticas absolutas con el lienzo emocional de la pintura virtual, logrando una unión sin igual entre dos mundos que rara vez se cruzan. Cine y la ciencia.',
      'El experimentado programador y físico Oliver James asumió el arduo trabajo de redactar un intrincado código de trazado de rayos personalizado que pudiera doblar y retorcer las delgadas rutas de la luz atravesando el espacio curvo. Consistió en diseñar elaborados espejos deformantes de una inmensa feria de diversiones virtual, pero construidos íntegramente con complejas fórmulas que simulaban perfectamente la fuerte lente gravitacional del colosal abismo rotatorio oscuro y misterioso.',
      'Las pesadas ecuaciones matemáticas necesarias para renderizar estos alucinantes paisajes consumían formidables recursos de computación a una escala bestial, requiriendo en total la gigantesca cantidad de ochocientos terabytes informáticos para guardar cada detalle meticuloso. Es lo mismo que tratar de gestionar una gran biblioteca nacional completa repleta de documentos en miles de abultados discos duros giratorios para producir apenas unos escasos, pero hermosos, segundos de película.',
      'El aclamado filme Interstellar pasó rápidamente a la notable historia de la cinematografía tecnológica global al convertirse oficialmente en la primera y única obra maestra visual de Hollywood que incorporaba de forma exitosa modelos matemáticos cien por ciento realistas de un agujero. Representa el triunfo de un riguroso documental académico exigente presentándose astutamente ante los espectadores escondido bajo el brillante disfraz de un explosivo y caro taquillazo veraniego masivo y popular.',
      'El meticuloso esfuerzo titánico depositado por este pequeño grupo de soñadores y expertos no quedó simplemente confinado como una bonita curiosidad aislada de la industria del entretenimiento popular; verdaderamente lograron publicar orgullosamente sus formidables descubrimientos tecnológicos de programación gráfica estelar publicando dos artículos de impacto mundial. Como si una espectacular sesión de magia de salón terminara de manera sorprendente contribuyendo datos técnicos en libros universitarios.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La laboriosa creación digital de los anillos brillantes que cruzan espectacularmente de arriba abajo la superficie opaca del agujero central oscuro desconcertó rotundamente a los asombrados animadores visuales al principio de los ensayos técnicos de luz espacial de prueba gráfica renderizada. Kip Thorne tuvo que dedicarles mucho tiempo explicándoles pacientemente con detallados dibujos que no existía ningún error de código técnico, era simplemente la caprichosa física curvando el disco alrededor de toda la esfera.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Algunos diminutos fotogramas individuales tan asombrosos de esta secuencia visual requerían insólitamente un extenuante trabajo computacional demorando hasta cien pesadas horas continuas de duro procesamiento interno ininterrumpido en los enormes y calientes servidores ingleses en red para conseguir completar satisfactoriamente una única y bella imagen brillante final lograda visualmente terminada satisfactoriamente completada satisfactoriamente con todos los destellos luminosos precisos.' },
    ],
    fact: 'El motor de simulación de luz programado magistralmente descubrió maravillosamente de forma imprevista y no esperada una intrincada serie oculta de finas huellas luminosas anidadas matemáticamente en el oscuro centro del vacío espaciotemporal, revelando que el enigmático agujero rotatorio no solo desviaba una simple vez a la frágil luz que intentaba escapar audazmente, sino que efectivamente atrapaba fotones haciendo que dieran giros infinitos a lo largo y ancho del tejido estelar curvo y brillante del entorno.',
  },
  {
    id: 'singularidad',
    title: 'El Centro del Misterio',
    color: '#00BCD4',
    btnImage: '/assets/interstellar/infographic_m2/btn_singularidad.jpg',
    image: '/assets/interstellar/infographic_m2/hero_singularidad.jpg',
    content: [
      'Una singularidad matemática es una espeluznante región topológica infinitesimal en la cual las masivas cantidades de densa materia se ven aplastadas inexorablemente hasta conseguir obtener un nivel de densidad absoluta teóricamente infinito. Equivale a someter pacientemente una montaña de granito inmensa a un proceso de trituración incansable hasta conseguir obligarla dolorosamente a ocupar un espacio físico más pequeño y diminuto que un simple y frágil grano de arena de playa dorada.',
      'Cuando los confiados físicos teóricos mundiales tratan tercamente de aplicar las bellas y elegantes fórmulas de la gran relatividad general alemana a esta misteriosa región interior secreta, las ecuaciones colapsan tristemente retornando extraños e indescifrables errores matemáticos. Piensa en el gran problema mental que sufre una potente calculadora electrónica intentando absurdamente y frustradamente resolver el gran problema prohibido que significa tener que dividir cualquier número usando cero.',
      'Entender de manera veraz, concluyente y precisa las intrincadas, secretas y profundas mecánicas misteriosas internas ocultas celosamente en la temible singularidad oscura requiere obligatoriamente y desesperadamente una teoría unificadora novedosa del cosmos, un marco moderno cuántico de gravedad fuerte. Es verdaderamente como sufrir lastimosamente intentando encajar a la fuerza ciega la última y más importante pieza de un difícil rompecabezas colosal que milagrosamente conecta dos gigantescos mapas dispares.',
      'En el agitado ambiente académico de 1965, el brillante intelectual e investigador británico Roger Penrose presentó audazmente una majestuosa demostración matemática bautizada históricamente como el famoso teorema de la singularidad oculta. Logró de esta forma dibujar pacientemente, cuidadosamente y meticulosamente un asombroso mapa descriptivo completo detallando todos los túneles ocultos dentro de la enigmática cueva más lóbrega, sin jamás haber necesitado tener que entrar verdaderamente dentro de ella en su vida.',
      'Escondida herméticamente dentro de las entrañas ocultas de un agujero giratorio inmenso masivo tipo Kerr, esta densa estructura destructiva no se manifiesta colapsada inútilmente sobre un solo punto matemático estático, adopta en su lugar un inquietante perfil de un asombroso anillo. Es como contemplar curiosamente un brillante aro de hula hoop sideral y brillante compuesto enteramente y absolutamente por material exótico de masa infinita que da peligrosas vueltas vertiginosas sin descanso.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El emotivo final trascendental muestra bellamente a un desesperado Cooper sumergiéndose temerariamente al vacío oscuro profundo, adentrándose peligrosamente a la temible vecindad de la oculta singularidad. En este punto incierto limítrofe, una extraña especie humana en un futuro lejano logró salvadora e inexplicablemente colocarle un grandioso teseracto hiperdimensional estable tridimensionalizado para proteger amorosamente a nuestro audaz aventurero estelar valiente evitando su muerte inminente instantánea.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'El gran pionero genio británico de nombre Penrose recibió finalmente con gran orgullo su inmenso merecido galardón histórico, nada menos que un premio Nobel honorario de la academia nórdica entregado el año 2020. Su extenso y riguroso logro certificó con claridad rotunda absoluta ante la renuente escéptica comunidad de sabios globales escépticos que las enigmáticas bestias agujeros negros representaban objetos veraces probados y no meros subproductos engañosos de matemáticas equivocadas del siglo pasado.' },
    ],
    fact: 'Los asombrosos cálculos de naturaleza cuántica de última generación proponen fascinantemente que una singularidad interior real verdadera podría representar físicamente en este maravilloso cosmos infinito no tanto un destructivo agujero insondable y triturador en donde absolutamente todo objeto muere tristemente fulminado y aniquilado sin compasión final absoluta; sino en su defecto representar un salvaje conducto dimensional vertiginoso conduciendo apresuradamente a otras regiones de multiversos cuánticos infinitos y variados.',
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
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">GARGANTÚA – ANATOMÍA DE UN MONSTRUO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">FÍSICA Y ESTRUCTURA DE UN AGUJERO NEGRO</text>
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
                    Selecciona un nodo interactivo de Gargantúa para explorar la física del agujero negro
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
