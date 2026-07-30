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
  'anatomia-agujero-negro': [DecoBlackHole, DecoAccretionDisk, DecoEventHorizon],
  'horizonte-sucesos': [DecoEventHorizon, DecoBlackHole, DecoGravityWell],
  'agujero-negro-kerr': [DecoAccretionDisk, DecoEventHorizon, DecoSingularity],
  'frame-dragging': [DecoGravityWell, DecoAccretionDisk, DecoBlackHole],
  'disco-acrecion': [DecoAccretionDisk, DecoEventHorizon, DecoSingularity],
  'simulacion-gargantua': [DecoBlackHole, DecoAccretionDisk, DecoGravityWell],
  'singularidad': [DecoSingularity, DecoGravityWell, DecoEventHorizon],
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
      'Un agujero negro no es un espacio vacío, sino una cantidad de materia contenida en un volumen reducido. Imagina que tomas toda la masa del Sol y la comprimes hasta que tenga el tamaño de una ciudad. Esta densidad produce un campo gravitatorio tan intenso que ni la luz logra escapar, actuando como una aspiradora que traga aquello que cruza su camino. Se forma cuando una estrella agota su combustible nuclear y colapsa bajo su propia gravedad, alterando el tejido del espacio-tiempo a su alrededor de manera irreversible.',
      'En el centro de la Vía Láctea reside Sagitario A*, un agujero negro que contiene la masa de cuatro millones de soles. Piensa en esto como concentrar millones de cuerpos celestes dentro de un volumen mínimo. A pesar de esta inmensa densidad que detectan los astrónomos, su gravedad mantiene unidas las órbitas de miles de millones de estrellas a su alrededor de manera estable, organizando la estructura de nuestra galaxia de una manera ordenada y predecible a través de los eones de tiempo cósmico.',
      'La anatomía de estos objetos se divide en tres partes físicas: la singularidad, el horizonte de sucesos y el disco de acreción. Imagina un huracán en el océano: el ojo representa el centro, los vientos forman la barrera y los escombros que giran representan el disco de gas. Los científicos utilizan telescopios avanzados para mapear estas regiones, desentrañando paso a paso los secretos de la gravedad y observando los fenómenos de alta energía que ocurren en las fronteras de estos titanes del espacio profundo.',
      'Muchos de estos cuerpos celestes rotan rápidamente y poseen una zona llamada ergosfera, donde el tejido espaciotemporal es arrastrado sin piedad. Esto funciona como un remolino de agua que arrastra a los barcos hacia una rotación obligatoria. En esta región, los objetos se ven forzados a girar junto con la masa central, demostrando que la gravedad también puede arrastrar la tela del espacio y no solo atraer a los objetos materiales que viajan a través de las vastas distancias del universo.',
      'Rodeando esta estructura se encuentra la esfera de fotones, una órbita inestable donde las partículas de luz giran temporalmente antes de escapar o caer. Es similar a una pista de carreras donde los vehículos dan vueltas hasta perder la tracción y salirse del camino. La captura de luz en este equilibrio permite que podamos observar los anillos usando radiotelescopios que operan desde puntos de la Tierra, revelando las sombras proyectadas por estos objetos invisibles contra el fondo estelar radiante.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando la tripulación de la nave Endurance llega al sistema de Gargantúa, se enfrentan a un coloso que posee cien millones de masas solares. Esta magnitud fue elegida por los asesores científicos para garantizar que los planetas que orbitan a su alrededor pudieran existir sin ser destrozados por las fuerzas de marea, algo que destruye el entorno. Es un ejemplo de cómo el cine respeta las matemáticas para la trama narrativa, integrando la relatividad de Einstein en el desarrollo dramático de la misión espacial.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Los agujeros negros de masa estelar nacen tras explosiones de supernovas, cuando estrellas agotan su combustible y se derrumban sobre sí mismas por su propio peso. Este final es como un edificio que colapsa hacia sus cimientos en una fracción de segundo, comprimiendo sus átomos. Nuestra estrella, el Sol, es demasiado pequeña para sufrir este destino y terminará convirtiéndose en una enana blanca, enfriándose gradualmente a lo largo de miles de millones de años hasta desvanecerse en la oscuridad.' }
    ],
    fact: 'Aunque la cultura los pinta como devoradores errantes, si reemplazáramos nuestro Sol por un agujero negro de la misma masa, la Tierra no sería absorbida. Nuestro planeta seguiría orbitando a la misma distancia en oscuridad, congelándose al perder la fuente de calor. Esto demuestra que la fuerza gravitatoria a gran distancia depende solo de la masa total y no del volumen del objeto, permitiendo que las órbitas planetarias permanezcan inalteradas a pesar de la ausencia de una superficie estelar visible.'
  },
  {
    id: 'horizonte-sucesos',
    title: 'El Punto de No Retorno',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m2/btn_horizonte.jpg',
    image: '/assets/interstellar/infographic_m2/hero_horizonte.jpg',
    content: [
      'El horizonte de sucesos es el límite de un agujero negro, el punto donde la velocidad necesaria para escapar iguala la velocidad de la luz. Se asemeja al borde de una cascada donde un pez ya no puede luchar contra la corriente y es arrastrado irremediablemente. Cualquier objeto que cruce esta línea queda desconectado de nuestro universo observable y no puede enviar ningún tipo de señal para pedir ayuda, convirtiéndose en un prisionero de la gravedad que cae hacia el centro del pozo de potencial cósmico.',
      'Karl Schwarzschild fue el científico que utilizó las ecuaciones de Einstein en 1916 para calcular el tamaño de esta frontera, hallando lo que hoy llamamos el radio de Schwarzschild. Si aplicamos su fórmula, un horizonte para nuestro Sol mediría apenas tres kilómetros de radio. Piensa en esto como esconder una central de energía en el tamaño de un barrio. Este radio define el volumen donde la gravedad se vuelve absoluta, creando un límite esférico más allá del cual la información no puede regresar al cosmos exterior.',
      'Dado que nada supera la velocidad de los fotones en el vacío, la luz misma queda atrapada permanentemente detrás de este telón impenetrable. Funciona como una trampa donde los visitantes pueden entrar pero jamás salir. Los observadores no pueden ver lo que ocurre en el interior, dejando el volumen rodeado de un misterio que los físicos teóricos intentan comprender a diario utilizando complejas herramientas matemáticas y simulaciones numéricas ejecutadas en supercomputadoras de última generación.',
      'Desde la perspectiva de un astronauta que observa de lejos, un reloj que se acerca a este horizonte parece disminuir su marcha hasta detenerse por completo. Es como presenciar una película que de repente se congela en un fotograma por el resto de la eternidad. Sin embargo, para el viajero que cae hacia el abismo, su propio tiempo avanza de forma normal mientras cruza la frontera, experimentando el viaje hacia el interior sin notar ninguna alteración temporal en sus funciones vitales o en los instrumentos de su nave.',
      'Es importante entender que esta barrera es un límite geométrico y no posee ninguna superficie contra la cual chocar. Se puede comparar con la línea del ecuador en un globo terráqueo; puedes cruzarla navegando en un barco sin sentir ningún golpe físico. No obstante, las fuerzas gravitacionales asociadas aseguran que las estructuras materiales sufran una deformación letal al intentar aproximarse a esta región prohibida, desgarrando las moléculas de cualquier objeto debido a la diferencia de atracción en sus extremos.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En el desenlace de la misión, el astronauta Cooper debe cruzar deliberadamente el horizonte de sucesos de Gargantúa para recolectar datos que salvarán a la humanidad. Para lograr esto, debe sacrificar la nave robótica TARS, arrojándolo al abismo. La película retrata este descenso como una caída hacia la oscuridad, respetando la teoría de que la luz sigue siendo visible por un tiempo antes de llegar al teseracto, un espacio pentadimensional diseñado para transmitir la información a través de la fuerza gravitatoria.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'En el año 2019, la colaboración del Telescopio del Horizonte de Sucesos hizo historia al capturar la primera imagen de esta sombra fronteriza. La fotografía reveló un anillo de gas caliente rodeando un núcleo oscuro situado en la galaxia M87. Esta hazaña requirió coordinar antenas en múltiples continentes, creando un ojo del tamaño de la Tierra que confirmó visualmente lo que las matemáticas predecían hace un siglo, abriendo una nueva era en el estudio observacional de los campos gravitatorios extremos del universo.' }
    ],
    fact: 'Si un explorador cayera de pies cruzando el horizonte de sucesos de un agujero de tamaño estelar, experimentaría un efecto letal conocido como espaguetización. La fuerza gravitatoria que tiraría de sus botas sería mucho mayor que la ejercida sobre su cabeza, estirando su cuerpo como un fideo de pasta. En agujeros supermasivos, este efecto no ocurre en la frontera, permitiendo un cruce inicial tranquilo para los viajeros, ya que el gradiente gravitatorio es mucho más suave a grandes distancias del centro de masa central.'
  },
  {
    id: 'agujero-negro-kerr',
    title: 'El Agujero Negro que Gira',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m2/btn_kerr.jpg',
    image: '/assets/interstellar/infographic_m2/hero_kerr.jpg',
    content: [
      'El matemático Roy Kerr logró un hito en 1963 cuando resolvió las ecuaciones de Einstein para describir un agujero negro que se encuentra en rotación. Imagina encontrar la llave para abrir una caja fuerte de geometría que nadie había podido descifrar en décadas. Su solución demostró que el universo contiene objetos giratorios mucho más complejos que los modelos estáticos analizados originalmente, revelando que el momento angular altera profundamente la estructura del espacio-tiempo en la vecindad de estas masas enormes.',
      'A diferencia de las esferas estáticas, los agujeros negros rotatorios de tipo Kerr desarrollan un horizonte de sucesos achatado en sus polos y abultado en el centro. Esto se asemeja a la forma de una calabaza girando velozmente sobre el disco de una mesa. Esta deformación surge debido a las fuerzas extremas generadas por la rotación, alterando profundamente las rutas seguidas por las naves y la luz en sus inmediaciones, creando un entorno dinámico donde la geometría euclidiana pierde completamente su validez tradicional y cotidiana.',
      'Otra característica de la solución de Kerr es que la masa no colapsa en un solo punto microscópico, sino que adopta la forma de un anillo unidimensional extremadamente denso. Piensa en este objeto como una dona hecha de materia comprimida al máximo. Esta singularidad anular gira a tal velocidad que su fuerza centrífuga evita el colapso hacia el centro absoluto, manteniendo una estructura matemática que desafía la intuición humana y plantea interrogantes profundos sobre la naturaleza del espacio en escalas cuánticas y microscópicas.',
      'En el mundo de Interstellar, los asesores determinaron que Gargantúa debe rotar a un impactante noventa y nueve por ciento de la velocidad permitida para la luz. Es comparable a lanzar un trompo de juguete que gira tan rápido que difumina la realidad a su alrededor. Esta velocidad extrema es necesaria para explicar por qué el planeta Miller puede orbitar tan cerca sin precipitarse directamente hacia la zona de destrucción, aprovechando el equilibrio delicado entre la fuerza centrífuga y la atracción gravitacional ineludible.',
      'El físico Kip Thorne diseñó estos parámetros astronómicos para que los requerimientos del guion de la película no violaran las leyes de la ciencia moderna. Ajustar esta rotación fue como calibrar el motor de un vehículo para alcanzar el rendimiento óptimo sin que exploten sus componentes mecánicos. Lograron que el tiempo se dilatara masivamente sin destruir los frágiles mundos en órbita lejana, demostrando que la ficción puede construirse sobre bases científicas rigurosas para inspirar asombro en los espectadores del cine.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El director Christopher Nolan confió en los cálculos de los científicos para modelar la asimetría de Gargantúa en la pantalla gigante. Como el horizonte achatado arrastra a los fotones con su rotación, el lado del disco que gira acercándose hacia la cámara se ve más brillante debido al efecto Doppler. Esta asimetría fue renderizada con fidelidad matemática, creando un hito visual y científico sin precedentes en la industria cinematográfica que combinó el arte visual con la física relativista de manera magistral e innovadora.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Antes del descubrimiento matemático de Kerr en la década de los sesenta, la comunidad científica dudaba si los agujeros negros eran entidades que existían en el cosmos o anomalías que solo vivían en las pizarras teóricas. La solución rotatoria demostró que estos monstruos podían formarse a partir de explosiones estelares, ya que toda estrella posee rotación que debe ser conservada según los principios fundamentales de la física, confirmando que la naturaleza puede producir estas geometrías extremas en la realidad del vasto universo.' }
    ],
    fact: 'La estructura espaciotemporal alrededor de un agujero de Kerr es tan retorcida que las ecuaciones sugieren la existencia de caminos que viajan a través de la singularidad anular hacia otras partes del universo u otros puentes de Einstein-Rosen. Sin embargo, los científicos advierten que adentrarse físicamente en este anillo resultaría en una desintegración por las fuerzas que dominan este reino, ya que el paso requeriría atravesar regiones de curvatura infinita que destruirían cualquier forma de materia bariónica conocida por los físicos modernos.'
  },
  {
    id: 'frame-dragging',
    title: 'Cuando el Espacio Gira Contigo',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m2/btn_framedrag.jpg',
    image: '/assets/interstellar/infographic_m2/hero_framedrag.jpg',
    content: [
      'El efecto de arrastre de marco, predicho por Lense y Thirring, establece que cualquier objeto giratorio arrastra forzosamente el tejido cósmico alrededor de su propio eje. Imagina sumergir lentamente una cuchara de madera en un tarro de miel y empezar a dar giros rápidos. La miel que rodea la cuchara girará junto a ella obligatoriamente, ilustrando cómo el espacio mismo acompaña la danza de los astros masivos, creando un vórtice gravitacional que afecta a cualquier partícula que se aventure en las cercanías del objeto central y masivo.',
      'En 2011, tras décadas de desarrollo técnico, la misión Gravity Probe B de la agencia espacial confirmó este efecto alrededor de nuestro planeta Tierra. Fue un experimento que involucró un giroscopio flotando pacíficamente en el espacio sideral, sintiendo la torcedura del vacío a su alrededor. Esta sonda demostró que la materia en rotación altera mecánicamente las coordenadas de los satélites, comprobando una de las predicciones más sutiles y difíciles de medir de la teoría de la relatividad general de Albert Einstein en su entorno terrestre.',
      'Cerca del monstruo llamado Gargantúa, este efecto de arrastre no es una corrección matemática, sino una tormenta invisible donde el espacio mismo gira cerca de la velocidad de la luz. Experimentar esto sería equivalente a estar atrapado en un tornado colosal hecho de vacío puro. Las naves que intentan navegar en esta región son llevadas por la corriente sin importar cuánta potencia apliquen a sus motores, obligando a los navegantes a calcular trayectorias complejas que aprovechen la dinámica del espacio en movimiento continuo y brutal.',
      'Este arrastre colosal crea la ergosfera geométrica, una zona limítrofe por fuera del horizonte de sucesos donde es físicamente imposible permanecer estático. Es como encontrarse atrapado en la sala de espera de un tren a alta velocidad donde el piso mismo corre rápidamente hacia la puerta de salida. En esta región limítrofe, todo objeto, independientemente de su masa, debe girar en la misma dirección que el agujero central sin oponer resistencia, arrastrado implacablemente por la rotación incesante del tejido espacial mismo e invisible.',
      'El proceso de Penrose propone que una nave astuta podría utilizar esta zona de la ergosfera para robarle energía de rotación directamente al agujero negro. El truco teórico funciona igual que arrojar una roca pesada hacia las aspas de un molino de viento para extraer impulso hacia las estrellas distantes. Arrojando parte de su carga hacia el abismo central, un vehículo inteligente podría escapar impulsado con una velocidad asombrosa, aprovechando la energía rotacional de la masa gravitatoria para acelerar a través del vacío interestelar frío.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La nave Endurance utiliza magistralmente las maniobras de asistencia gravitatoria en el vórtice creado por Gargantúa. Al volar directamente hacia la ergosfera giratoria, la piloto Brand logra aprovechar el impulso del arrastre del espacio-tiempo para catapultar a la sonda hacia el planeta de Edmunds. Esta maniobra extrae energía física del monstruo cósmico en movimiento, demostrando en la pantalla cómo las teorías de la astrofísica avanzada pueden aplicarse de manera práctica para resolver problemas de navegación interestelar extrema y peligrosa.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El satélite Gravity Probe B requirió inventar las esferas más lisas y perfectas jamás creadas por los ingenieros de la historia de la humanidad. Estos rotores de cuarzo eran tan redondos que si se ampliaran hipotéticamente hasta tener el tamaño de nuestro mundo, la montaña más alta mediría solamente unos tres metros de altura. Su precisión fue la única forma capaz de probar la existencia del arrastre de marco, exigiendo un nivel de pulido tecnológico que desafió los límites de la fabricación de materiales durante el desarrollo del proyecto espacial.' }
    ],
    fact: 'Cuando un objeto cruza los límites para ingresar a la ergosfera, una porción de su masa física se transforma en energía cinética aprovechable. Este mecanismo propuesto por Roger Penrose demuestra matemáticamente que los agujeros negros no solo destruyen la materia de forma irresponsable, sino que también actúan como potentes baterías galácticas capaces de suministrar energía a civilizaciones avanzadas que logren dominar la tecnología necesaria para recolectar el impulso generado por la rotación del espacio-tiempo en la vecindad de estas singularidades masivas.'
  },
  {
    id: 'disco-acrecion',
    title: 'El Anillo de Fuego',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m2/btn_disco.jpg',
    image: '/assets/interstellar/infographic_m2/hero_disco.jpg',
    content: [
      'El disco de acreción es una estructura cósmica compuesta principalmente de gas interestelar sobrecalentado y polvo cósmico que orbita frenéticamente alrededor de un núcleo negro. Funciona en la práctica como una licuadora sideral que tritura a las desafortunadas estrellas vecinas reduciéndolas a nubes de plasma brillante. La materia se aglomera y gira formando carriles concéntricos debido a la inmensa gravedad central actuante, creando un espectáculo luminoso que rivaliza con el brillo de millones de soles concentrados en un solo punto del universo observable.',
      'La fricción producida por las partículas estelares chocando a grandes velocidades relativas eleva la temperatura del disco a millones de grados centígrados, generando potentes emisiones de rayos X de alta energía. Imagina frotar tus manos fuertemente en pleno invierno nevado, pero generando suficiente fricción térmica como para derretir planchas de acero al instante. Este intenso proceso convierte la materia en luz, liberando cantidades masivas de radiación electromagnética que viajan a través del espacio interestelar iluminando su entorno oscuro y desolado.',
      'Algunos de estos sistemas alimentados por discos de gas gigantescos generan los formidables cuásares, los faros celestes más potentes de toda la creación conocida por la humanidad. Brillan tanto que son el equivalente a colocar una colosal luz de emergencia encendida que ilumina toda la ciudad estelar, eclipsando fácilmente la luz combinada de todas las demás estrellas de su galaxia entera reunidas por los telescopios ópticos, convirtiéndose en balizas cósmicas que permiten estudiar la evolución del universo en sus etapas más tempranas y violentas.',
      'Debido a las velocidades implicadas, un curioso efecto relativista denominado haz Doppler provoca que el segmento frontal del disco giratorio que avanza hacia el observador parezca intensamente más brillante. Funciona de la misma manera que una potente sirena de ambulancia en la carretera que suena mucho más fuerte mientras se dirige directamente hacia ti a gran velocidad. Este desplazamiento azul aumenta la luminosidad en un extremo del aro, proporcionando una firma visual asimétrica que delata la rotación frenética del plasma incandescente atrapado en la gravedad extrema.',
      'La compleja interacción eléctrica entre el plasma conductor y el espacio curvo produce campos magnéticos que actúan como cañones galácticos, canalizando una porción del material ardiente en finos chorros relativistas. Piensa en estos haces de partículas veloces como mangueras de bomberos gigantescas que disparan chorros de radiación letal hacia los rincones fríos, esterilizando sistemas solares situados a miles de años luz, demostrando que la influencia destructiva de un agujero negro puede extenderse mucho más allá de su horizonte de sucesos inmediato y letal.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El modelo matemático que fue generado a partir del disco luminoso de Gargantúa fue deliberadamente modificado por el equipo de artistas para rebajar sensiblemente su emisión de rayos X. En el entorno real estricto que predicen las leyes físicas, un disco ardiente freiría irremediablemente a la nave espacial Ranger mucho antes de que lograra aproximarse a los bordes de la ergosfera gigante protectora del agujero negro central, lo que obligó a los creadores a realizar una concesión artística para permitir que los astronautas sobrevivieran al épico viaje intergaláctico.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Los indetenibles chorros de alta energía que son expulsados furiosamente desde los polos magnéticos de los discos de acreción viajan a velocidades verdaderamente espeluznantes, alcanzando la marca de más del noventa y nueve por ciento de la velocidad de la luz en el vacío. Estos emisarios actúan con tanta potencia incontrolable que pueden moldear, alterar y frenar la formación estelar en galaxias vecinas enteras al calentar el gas interestelar frío, regulando de manera efectiva el crecimiento de las estructuras galácticas más masivas en la intrincada red cósmica universal intergaláctica.' }
    ],
    fact: 'El gas estelar situado en los bordes pegados al abismo interior se mueve tan excesivamente rápido que las leyes impuestas por la relatividad especial reducen radicalmente la tasa de su tiempo interno. Si lograras viajar de alguna manera montado en una molécula de plasma que gira en esa zona del embudo, presenciarías asombradamente que todo el inmenso universo restante envejecería aceleradamente millones de años en cuestión de unos pocos minutos locales medidos por tu propio reloj, ilustrando de forma dramática la naturaleza elástica y maleable de la dimensión temporal del espacio.'
  },
  {
    id: 'simulacion-gargantua',
    title: 'Gargantúa en la Computadora',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m2/btn_simulacion.jpg',
    image: '/assets/interstellar/infographic_m2/hero_simulacion.jpg',
    content: [
      'El científico teórico Kip Thorne forjó una alianza pionera con el equipo artístico de Double Negative Effects para diseñar un modelo visual de Gargantúa que respetara la física matemática rigurosa. Fue una colaboración asombrosa que logró mezclar las reglas inflexibles de las matemáticas con el lienzo emocional de la pintura virtual, logrando una unión sin igual entre dos mundos que rara vez se cruzan: la industria del cine y la investigación académica de vanguardia sobre la estructura geométrica fundamental de nuestro vasto y misterioso universo relativista.',
      'El experimentado programador Oliver James asumió el arduo trabajo de redactar un código de trazado de rayos personalizado que pudiera doblar las delgadas rutas de la luz atravesando el espacio curvo. Consistió en diseñar espejos deformantes de una inmensa feria de diversiones virtual, pero construidos íntegramente con complejas fórmulas que simulaban perfectamente la fuerte lente gravitacional del colosal abismo rotatorio oscuro y misterioso, resolviendo ecuaciones diferenciales no lineales para determinar cada trayectoria fotónica individual que llegaba al ojo del espectador.',
      'Las pesadas ecuaciones matemáticas necesarias para renderizar estos paisajes consumían formidables recursos de computación a una escala bestial, requiriendo la gigantesca cantidad de ochocientos terabytes informáticos para guardar cada detalle meticuloso de las texturas en alta resolución. Es lo mismo que tratar de gestionar una gran biblioteca nacional completa repleta de documentos en miles de abultados discos duros giratorios para producir apenas unos escasos, pero hermosos, segundos de metraje cinematográfico que finalmente apareció proyectado en las pantallas de cine mundiales.',
      'El filme Interstellar pasó rápidamente a la notable historia de la cinematografía tecnológica global al convertirse oficialmente en la primera obra maestra de Hollywood que incorporaba de forma exitosa modelos cien por ciento realistas de un agujero gravitatorio extremo. Representa el triunfo de un riguroso documental exigente presentándose astutamente ante los espectadores escondido bajo el disfraz de un explosivo taquillazo veraniego masivo y popular, educando al público general sobre conceptos avanzados de física teórica mientras ofrecía una experiencia audiovisual emocionante y profunda.',
      'El esfuerzo titánico depositado por este pequeño grupo de soñadores no quedó simplemente confinado como una bonita curiosidad aislada de la industria del entretenimiento popular; lograron verdaderamente publicar orgullosamente sus formidables descubrimientos tecnológicos de programación estelar publicando dos artículos científicos de impacto mundial. Como si una espectacular sesión de magia terminara de manera sorprendente contribuyendo datos técnicos invaluables en libros universitarios, demostrando que la búsqueda de la belleza estética puede generar avances científicos genuinos y duraderos para la academia.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La laboriosa creación digital de los anillos brillantes que cruzan espectacularmente de arriba abajo la superficie opaca del agujero central oscuro desconcertó rotundamente a los asombrados animadores visuales al principio de los ensayos técnicos de luz espacial. Kip Thorne tuvo que dedicarles mucho tiempo explicándoles con detallados dibujos que no existía ningún error de código técnico, era simplemente la caprichosa física curvando el disco de gas incandescente alrededor de toda la esfera negra de manera contraintuitiva debido a la intensa gravedad extrema del entorno simulado.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Algunos diminutos fotogramas individuales de esta asombrosa secuencia visual requerían insólitamente un extenuante trabajo computacional demorando hasta cien horas continuas de duro procesamiento interno ininterrumpido en los enormes servidores ingleses en red para conseguir completar satisfactoriamente una única y bella imagen brillante final lograda con todos los destellos luminosos precisos y correctos según las leyes fundamentales de la propagación electromagnética dictadas por la geometría curvada del entorno circundante, estableciendo un nuevo estándar de fidelidad para el cine.' }
    ],
    fact: 'El motor de simulación de luz programado descubrió maravillosamente de forma imprevista una intrincada serie oculta de finas huellas luminosas anidadas matemáticamente en el oscuro centro del vacío espaciotemporal, revelando que el enigmático agujero rotatorio no solo desviaba una simple vez a la luz que intentaba escapar, sino que atrapaba fotones haciendo que dieran giros infinitos a lo largo del tejido estelar curvo y brillante del entorno circundante masivo, un fenómeno óptico complejo que nunca antes había sido visualizado con tanta claridad por los investigadores académicos del área.'
  },
  {
    id: 'singularidad',
    title: 'El Centro del Misterio',
    color: '#00BCD4',
    btnImage: '/assets/interstellar/infographic_m2/btn_singularidad.jpg',
    image: '/assets/interstellar/infographic_m2/hero_singularidad.jpg',
    content: [
      'Una singularidad matemática es una espeluznante región topológica infinitesimal en la cual las masivas cantidades de densa materia se ven aplastadas inexorablemente hasta conseguir obtener un nivel de densidad teóricamente infinito. Equivale a someter una montaña de granito a un proceso de trituración incansable hasta conseguir obligarla a ocupar un espacio físico más pequeño que un grano de arena de playa dorada, concentrando toda su energía y masa en un volumen que tiende a cero, desafiando nuestra comprensión básica sobre la estructura material fundamental de la naturaleza misma.',
      'Cuando los físicos teóricos tratan de aplicar las bellas fórmulas de la relatividad general a esta misteriosa región interior secreta, las ecuaciones colapsan retornando extraños e indescifrables errores matemáticos conocidos como infinitos. Piensa en el gran problema mental que sufre una potente calculadora intentando resolver el problema prohibido que significa tener que dividir cualquier número usando cero como denominador matemático. En este entorno extremo y destructivo, las leyes de la física clásica pierden por completo su sentido y capacidad de predicción temporal y espacial.',
      'Entender de manera concluyente las profundas mecánicas misteriosas ocultas celosamente en la temible singularidad oscura requiere obligatoriamente una teoría unificadora novedosa del cosmos, un marco moderno de gravedad cuántica fuerte. Es como sufrir intentando encajar a la fuerza la última pieza de un rompecabezas colosal que milagrosamente conecta dos gigantescos mapas dispares, fusionando las reglas microscópicas del mundo subatómico con la macroscópica curvatura del espacio-tiempo propuesta por Albert Einstein a principios del productivo siglo veinte de nuestra civilización científica moderna.',
      'En el agitado ambiente académico de 1965, el brillante intelectual Roger Penrose presentó una majestuosa demostración bautizada históricamente como el teorema de la singularidad oculta gravitacional ineludible. Logró de esta forma dibujar un asombroso mapa descriptivo detallando todos los túneles ocultos dentro de la enigmática cueva lóbrega, sin jamás haber necesitado tener que entrar verdaderamente dentro de ella en su vida profesional, utilizando argumentos topológicos innovadores que revolucionaron profundamente la cosmología matemática moderna y la astrofísica teórica contemporánea del momento.',
      'Escondida dentro de las entrañas ocultas de un agujero giratorio inmenso tipo Kerr, esta densa estructura destructiva no se manifiesta colapsada inútilmente sobre un solo punto matemático estático de dimensión cero, adopta en su lugar un inquietante perfil topológico de un anillo. Es como contemplar un brillante aro sideral compuesto enteramente por material de masa infinita que da peligrosas vueltas vertiginosas sin descanso, creando un torbellino central de gravedad repulsiva capaz de lanzar objetos violentamente hacia el exterior antes de que logren alcanzar el centro absoluto geométrico.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El emotivo final trascendental muestra bellamente a un desesperado Cooper sumergiéndose temerariamente al vacío oscuro, adentrándose peligrosamente a la vecindad de la oculta singularidad cósmica. En este punto limítrofe, una extraña especie en un futuro lejano logró salvadora e inexplicablemente colocarle un grandioso teseracto hiperdimensional para proteger a nuestro audaz aventurero estelar evitando su muerte inminente instantánea provocada por las fuerzas extremas de marea, permitiéndole interactuar con la línea temporal del universo tridimensional a través de cuerdas gravitacionales invisibles de la cuarta dimensión.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'El gran pionero británico Roger Penrose recibió finalmente con orgullo su inmenso galardón histórico, nada menos que un prestigioso premio Nobel honorario de física entregado el año 2020. Su extenso logro certificó con claridad rotunda ante la renuente comunidad de sabios globales que las enigmáticas bestias gravitacionales representaban objetos veraces probados experimentalmente y no meros subproductos engañosos de matemáticas equivocadas del siglo pasado originadas por soluciones idealizadas, cimentando para siempre su legado intelectual en la historia de la ciencia natural exacta y rigurosa.' }
    ],
    fact: 'Los asombrosos cálculos cuánticos de última generación proponen fascinantemente que una singularidad interior real podría representar físicamente en este maravilloso cosmos infinito no un destructivo agujero insondable en donde todo objeto muere aniquilado sin compasión absoluta por las mareas letales; sino en su defecto representar un salvaje conducto dimensional vertiginoso conduciendo apresuradamente a otras regiones topológicas aisladas de multiversos cuánticos infinitos y variados donde las constantes fundamentales del plano físico podrían exhibir valores totalmente diferentes e irreconocibles para nosotros.'
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
