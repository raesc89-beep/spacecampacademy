'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#C9B37E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized flipper/paddle */}
      <ellipse cx="30" cy="30" rx="20" ry="8" fill={color} opacity="0.2" transform="rotate(-30 30 30)" />
      <path d="M15 35 Q25 20 45 25 Q40 35 25 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Water droplets */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="45" r="1.5" fill={color} opacity="0.4" />
      {/* Flow lines */}
      <path d="M8 20 Q18 18 22 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 40 Q48 38 52 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising air bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="25" cy="15" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="38" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="42" cy="22" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Shine on main bubble */}
      <path d="M17 42 Q18 40 20 41" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function DecoWave({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20 Q75 30 80 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28 Q75 38 80 33" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Foam dots */}
      <circle cx="20" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1.2" fill={color} opacity="0.35" />
      <circle cx="60" cy="14" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified reptile skull outline */}
      <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Eye sockets (sclerotic rings) */}
      <circle cx="22" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M15 32 Q22 42 30 44 Q38 42 45 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA/evolution helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      <line x1="23" y1="10" x2="37" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="50" x2="37" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermo({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer shape */}
      <rect x="27" y="8" width="6" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Temperature marks */}
      <line x1="34" y1="15" x2="38" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="27" x2="38" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="33" x2="38" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Heat waves */}
      <path d="M42 40 Q46 36 42 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 42 Q50 38 46 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "NASA Manned Spacecraft Center (1969). Apollo 11 Mission Report, MSC-00171. Houston: NASA.",
  "Woods, W. D., Lennox, I. y otros (eds.). Apollo Flight Journal: Apollo 11. NASA History Office (history.nasa.gov/afj).",
  "Collins, M. (1974). Carrying the Fire: An Astronaut's Journeys. Nueva York: Farrar, Straus and Giroux.",
  "Mindell, D. A. (2008). Digital Apollo: Human and Machine in Spaceflight. Cambridge, MA: MIT Press.",
  "Hall, E. C. (1996). Journey to the Moon: The History of the Apollo Guidance Computer. Reston, VA: AIAA.",
  "de Monchaux, N. (2011). Spacesuit: Fashioning Apollo. Cambridge, MA: MIT Press.",
  "Safire, W. (18 de julio de 1969). In Event of Moon Disaster, memorando a H. R. Haldeman. National Archives, Richard Nixon Presidential Library."
];

const INFOGRAPHIC_NODES = [
  {
    id: "a11-motor-ascenso",
    bannerImage: '/assets/apollo11/infographic_m5/banner_a11-motor-ascenso.webp',
    bannerCaption: "El 21 de julio de 1969 a las 17:54 UTC, el motor de ascenso del Eagle elevó a Armstrong y Aldrin hacia la órbita lunar.",
    title: "Un solo motor para despegar",
    color: '#5F7A6A',
    btnImage: '/assets/apollo11/infographic_m5/btn_a11-motor-ascenso.webp',
    image: '/assets/apollo11/infographic_m5/hero_a11-motor-ascenso.webp',
    content: [
      "El Módulo Lunar Eagle tenía dos partes. La etapa de descenso, con cuatro patas y el motor de aterrizaje, se quedó en la Luna y sirvió como plataforma de lanzamiento. La etapa de ascenso, donde viajaban los astronautas, se separó de ella y despegó. Hoy la etapa de descenso sigue en el Mar de la Tranquilidad, con la placa que dice «Vinimos en paz». La sonda Lunar Reconnaissance Orbiter la ha fotografiado desde la órbita y se distingue su sombra sobre el suelo gris.",
      "La etapa de ascenso tenía un solo motor, sin repuesto. Producía un empuje de unos 15,600 newtons, una fuerza parecida al peso de un automóvil mediano en la Tierra. Los ingenieros lo diseñaron para ser lo más sencillo posible: no tenía bombas ni sistema de encendido. Sus tanques se presurizaban con helio, que empujaba el combustible y el oxidante hacia la cámara. Al abrirse las válvulas, los dos líquidos se encontraban y ardían de inmediato al tocarse.",
      "Armstrong y Aldrin pasaron unas 21 horas y 36 minutos en la superficie lunar. Durmieron pocas horas dentro de la cabina, en hamacas tendidas entre las paredes, con el frío y la luz que se filtraba por las ventanas como incomodidades. El 21 de julio a las 17:54 UTC encendieron el motor. La etapa de ascenso subió en vertical durante unos segundos, luego se inclinó y aceleró durante algo más de siete minutos hasta entrar en una órbita baja alrededor de la Luna.",
      "La gravedad de la Luna es de 1.62 m/s², unas seis veces menor que la terrestre. Para quedar en órbita lunar, el Eagle necesitaba alcanzar unos 1.7 kilómetros por segundo, aproximadamente 6,000 kilómetros por hora. Escapar por completo de la Luna exigiría unos 8,500 kilómetros por hora. Para comparar, una nave que despega de la Tierra necesita unos 28,000 kilómetros por hora solo para entrar en órbita. Por eso un motor tan pequeño bastaba para salir de la superficie lunar.",
      "Con combustible y tripulación, la etapa de ascenso tenía una masa de unas 4.5 toneladas. Más de la mitad era combustible, que se consumía durante el ascenso; cuanto más se vaciaban los tanques, más rápido aceleraba la nave. Aldrin miró por la ventana durante el despegue y vio cómo el chorro del motor derribaba la bandera que habían plantado unas horas antes. En las misiones siguientes, los astronautas colocaron la bandera más lejos del módulo lunar para evitarlo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Antes del despegue, Aldrin descubrió en el suelo de la cabina un trozo de plástico roto: era la palanca de un interruptor de circuito que armaba el motor de ascenso. Probablemente la golpeó con la mochila al moverse. Para empujar el interruptor, usó la punta de un rotulador, porque el plástico no conduce electricidad y no causaría un cortocircuito. El motor se encendió sin problemas." },
      { label: "Dato Científico", icon: "atom", text: "Los propulsantes del motor de ascenso eran hipergólicos: arden de forma espontánea cuando se mezclan, sin chispa ni llama. El combustible era una mezcla de hidracinas llamada Aerozine 50, y el oxidante era tetróxido de dinitrógeno. Esa reacción inmediata eliminaba la posibilidad de que el encendido fallara, aunque ambas sustancias son tóxicas y se manipulaban con trajes de protección." }
    ],
    fact: "El motor de ascenso del módulo lunar se probó en el espacio antes del Apollo 11. En marzo de 1969, la tripulación del Apollo 9 lo encendió en órbita terrestre, y en mayo de 1969 la del Apollo 10 lo usó en órbita lunar, a unos 15 kilómetros de la superficie en su punto más bajo. Esos ensayos dieron a la NASA confianza en un motor que no podía fallar.",
  },
  {
    id: "a11-discurso-contingencia",
    bannerImage: '/assets/apollo11/infographic_m5/banner_a11-discurso-contingencia.webp',
    bannerCaption: "William Safire escribió para Nixon un discurso por si los astronautas quedaban varados; el memorando lleva fecha del 18 de julio de 1969.",
    title: "El discurso que nunca se leyó",
    color: '#6E6A86',
    btnImage: '/assets/apollo11/infographic_m5/btn_a11-discurso-contingencia.webp',
    image: '/assets/apollo11/infographic_m5/hero_a11-discurso-contingencia.webp',
    content: [
      "Si el motor de ascenso fallaba, no existía forma de rescatar a Armstrong y Aldrin. El módulo de mando Columbia no podía aterrizar, y no había otra nave preparada para viajar a la Luna. La Casa Blanca se preparó para esa posibilidad. William Safire, escritor de discursos del presidente Nixon, redactó un texto titulado «En caso de desastre lunar» y lo envió el 18 de julio de 1969, dos días antes del aterrizaje, a H. R. Haldeman, jefe de gabinete del presidente.",
      "El discurso empezaba así: «El destino ha querido que los hombres que fueron a la Luna a explorar en paz se queden en la Luna para descansar en paz». Después explicaba que Armstrong y Aldrin sabían que no había esperanza de rescate, pero también sabían que su sacrificio traía esperanza a la humanidad. El texto terminaba diciendo que, en adelante, cualquier persona que mirara la Luna en las noches futuras sabría que hay un rincón de otro mundo que es para siempre humano.",
      "El memorando también describía un procedimiento. Antes de leer el discurso, el presidente debía llamar por teléfono a las esposas de los astronautas. Después del discurso, cuando la NASA cortara las comunicaciones con el Eagle, un clérigo debía encomendar sus almas, siguiendo el mismo rito que se usa en un entierro en el mar. Afortunadamente, nada de eso ocurrió. El documento quedó archivado y se hizo público años después; hoy se conserva en los Archivos Nacionales de Estados Unidos.",
      "La NASA había planificado opciones para fallos parciales. Si el Eagle conseguía despegar, pero quedaba en una órbita demasiado baja, Collins podía bajar el Columbia y hacer él mismo la maniobra de encuentro. Para eso llevaba un cuaderno con 18 variantes distintas de encuentro, cada una con sus tiempos de encendido y ángulos calculados. Collins practicó esas variantes durante meses en simuladores en Houston y en Cabo Kennedy, porque cualquier error de cálculo podía dejar a sus compañeros fuera de su alcance.",
      "En su libro «Carrying the Fire», Collins escribió que su temor secreto durante los seis meses previos había sido dejar a sus compañeros en la Luna y volver solo a la Tierra. Sabía que, si el Eagle no lograba despegar, él tendría que encender el motor del Columbia y emprender el regreso. Ese temor explica por qué el momento del despegue, el 21 de julio a las 17:54 UTC, fue uno de los más tensos de toda la misión, tanto para la tripulación como para los controladores en Houston."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 2019, el Centro de Virtualidad Avanzada del MIT creó un video llamado «In Event of Moon Disaster». Con inteligencia artificial, mostraba a un Nixon falso leyendo el discurso de Safire como si la misión hubiera fracasado. El objetivo era educativo: enseñar cómo funcionan los videos manipulados, llamados deepfakes, y por qué conviene verificar las fuentes. El proyecto ganó un premio Emmy en 2021." },
      { label: "Dato Científico", icon: "atom", text: "Un rescate desde la Tierra era imposible por razones de tiempo y de recursos. Preparar y lanzar un cohete Saturno V tomaba meses, y el viaje a la Luna duraba tres días. La mochila de soporte vital daba unas pocas horas de oxígeno fuera del módulo, y los consumibles del Eagle estaban calculados solo para la misión planificada, con márgenes de reserva pequeños." }
    ],
    fact: "La NASA diseñó el motor de ascenso con una redundancia interna: varias válvulas estaban duplicadas o colocadas en serie y en paralelo, para que una pieza atascada no impidiera el encendido. Lo que no podía duplicarse era el motor completo, porque añadir un segundo motor habría aumentado demasiado la masa del módulo lunar y no habría cabido en el cohete.",
  },
  {
    id: "a11-rendezvous-columbia",
    bannerImage: '/assets/apollo11/infographic_m5/banner_a11-rendezvous-columbia.webp',
    bannerCaption: "Tras unas 28 horas solo en órbita, Michael Collins acopló el Columbia con el Eagle el 21 de julio de 1969 a las 21:35 UTC.",
    title: "Rendezvous con el Columbia",
    color: '#5B7B8C',
    btnImage: '/assets/apollo11/infographic_m5/btn_a11-rendezvous-columbia.webp',
    image: '/assets/apollo11/infographic_m5/hero_a11-rendezvous-columbia.webp',
    content: [
      "Michael Collins pasó cerca de 28 horas solo en órbita lunar, desde que el Eagle se separó el 20 de julio hasta el acoplamiento del 21 de julio. Cada órbita duraba unas dos horas. En cada vuelta pasaba unos 48 minutos detrás de la Luna, sin ningún contacto por radio con la Tierra. Collins escribió que durante esos minutos se sentía solo, pero no aislado, y que disfrutaba del silencio. En su libro dijo que desde Adán ningún humano había conocido una soledad así.",
      "Encontrar al Columbia en órbita no era tan simple como apuntar hacia él. En órbita, una nave que acelera sube a una órbita más alta, y en una órbita más alta se mueve más despacio. Por eso el Eagle empezó en una órbita más baja que la del Columbia, donde avanzaba más rápido, y lo fue alcanzando poco a poco. Después hizo varios encendidos calculados para igualar su altura con la del Columbia. Esta secuencia de maniobras se llama encuentro orbital, o rendezvous en francés.",
      "El Eagle tenía un radar de encuentro que medía la distancia y la velocidad respecto al Columbia. Las computadoras de ambas naves calculaban los encendidos, y los astronautas comparaban los resultados con cartas y tablas impresas. En la última fase, el Eagle se acercó despacio mientras Collins giraba el Columbia para alinear los dos puertos de acoplamiento. Aldrin conocía bien el tema: su tesis doctoral en el MIT, de 1963, trataba precisamente de técnicas de encuentro orbital tripulado.",
      "El acoplamiento usaba un sistema de sonda y cono. El Columbia tenía una sonda en la punta, y el Eagle un cono receptor. Cuando la sonda entró en el cono, unos pequeños pestillos la capturaron; después, al retraerse, la sonda acercó las naves y doce cierres las unieron de forma hermética. Collins notó un balanceo inesperado justo después de la captura, que corrigió en pocos segundos. El acoplamiento se completó el 21 de julio de 1969 a las 21:35 UTC.",
      "Armstrong y Aldrin pasaron al Columbia por el túnel de conexión. Llevaban las cajas con 21.5 kilogramos de muestras lunares, los carretes de película y los cartuchos de datos. Antes de cruzar, aspiraron el polvo lunar de su ropa para no contaminar la cabina. Después, la etapa de ascenso del Eagle fue soltada y quedó en órbita lunar. Se esperaba que cayera sobre la Luna en pocos meses; un estudio de 2021 propuso que podría seguir en órbita, pero su destino final no se conoce con certeza."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Mientras el Eagle se acercaba, Collins tomó una fotografía de la etapa de ascenso con la Luna debajo y la Tierra al fondo. Esa imagen, catalogada como AS11-44-6642, suele describirse así: aparecen en ella todos los seres humanos que existían en ese momento, menos uno, Michael Collins, que era quien sostenía la cámara." },
      { label: "Dato Científico", icon: "atom", text: "Para alcanzar una nave que va delante en la misma órbita, frenar funciona mejor que acelerar. Al frenar, la nave baja a una órbita más pequeña, recorre una distancia menor y completa la vuelta antes. Cuando se acerca a su objetivo, acelera de nuevo para subir y quedar a la misma altura. Esta paradoja de la mecánica orbital es la base de todas las maniobras de encuentro." }
    ],
    fact: "Durante su soledad en órbita, Collins intentó localizar al Eagle en la superficie con el sextante del Columbia, un instrumento de navegación óptica. Probó en varias pasadas, pero no logró distinguirlo entre los cráteres. Las coordenadas exactas del sitio de aterrizaje no se conocían con precisión: el Eagle había descendido varios kilómetros más allá del punto previsto por pequeños errores de navegación, y Armstrong además lo desvió para evitar un campo de rocas.",
  },
  {
    id: "a11-margaret-hamilton",
    bannerImage: '/assets/apollo11/infographic_m5/banner_a11-margaret-hamilton.webp',
    bannerCaption: "Margaret Hamilton dirigió en el MIT el equipo que escribió el software de vuelo de las computadoras del Apollo.",
    title: "Margaret Hamilton y el software",
    color: '#866B7A',
    btnImage: '/assets/apollo11/infographic_m5/btn_a11-margaret-hamilton.webp',
    image: '/assets/apollo11/infographic_m5/hero_a11-margaret-hamilton.webp',
    content: [
      "Margaret Hamilton nació en 1936 en Indiana, Estados Unidos, y estudió matemáticas. En los años sesenta trabajó en el Laboratorio de Instrumentación del MIT, en Cambridge, Massachusetts, donde la NASA había encargado el diseño del sistema de guiado del Apollo. Allí llegó a dirigir la división de ingeniería de software, responsable de los programas de vuelo que funcionaban a bordo del módulo de mando y del módulo lunar. Su equipo escribía, probaba y documentaba cada versión de esos programas antes de cada misión.",
      "En esa época el software no se consideraba una ingeniería. Muchos lo veían como un trabajo secundario frente al diseño de motores o estructuras. Hamilton empezó a usar la expresión «ingeniería de software» para que los programas recibieran el mismo rigor que el resto de la nave: pruebas sistemáticas, documentación y diseño pensado para detectar errores. A ella se le atribuye haber impulsado ese término, que hoy da nombre a una profesión y a carreras universitarias en todo el mundo.",
      "El software demostró su valor durante el descenso del Eagle, el 20 de julio de 1969. Unos minutos antes del aterrizaje, la computadora mostró las alarmas 1202 y 1201. Significaban que tenía más tareas de las que podía procesar a tiempo, porque el radar de encuentro, que no era necesario en ese momento, le enviaba datos de forma continua. En Houston, el ingeniero Jack Garman y el controlador Steve Bales confirmaron que la misión podía continuar, y Armstrong siguió con el descenso.",
      "La computadora no se bloqueó gracias a su diseño. Su sistema operativo asignaba prioridades a cada tarea. Al detectar la sobrecarga, la máquina se reiniciaba en una fracción de segundo, descartaba las tareas menos importantes y conservaba las esenciales, como el control del motor y la navegación. El sistema de prioridades lo concibió J. Halcombe Laning, y el equipo de Hamilton desarrolló los mecanismos para detectar errores y recuperarse de ellos sin perder la información crítica.",
      "En 2016, el presidente Barack Obama entregó a Margaret Hamilton la Medalla Presidencial de la Libertad, una de las máximas distinciones civiles de Estados Unidos. Una fotografía de 1969 la muestra junto a una pila de listados impresos casi tan alta como ella, con el código de los programas del Apollo. En 2017, la empresa LEGO incluyó una figura suya en un set dedicado a mujeres de la NASA, junto a la matemática Katherine Johnson y las astronautas Sally Ride y Mae Jemison."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Hamilton llevaba a veces a su hija Lauren al laboratorio. Un día, la niña jugó con el simulador y seleccionó por error el programa P01, de prelanzamiento, en pleno vuelo simulado, lo que borró los datos de navegación. Hamilton propuso añadir protección contra ese error, pero le dijeron que los astronautas no lo cometerían. En el Apollo 8, el astronauta Jim Lovell cometió exactamente ese error." },
      { label: "Dato Científico", icon: "atom", text: "Los programas del Apollo se guardaban en memoria de cuerdas de núcleos. Hilos de cobre pasaban por dentro o por fuera de pequeños anillos magnéticos: pasar por dentro equivalía a un 1 y por fuera a un 0. Obreras textiles tejían esas memorias a mano, y una vez tejidas no podían borrarse. La memoria fija almacenaba 36,864 palabras y la memoria borrable, solo 2,048." }
    ],
    fact: "En 2016, el programador Chris Garry publicó en GitHub el código fuente original de las computadoras del Apollo 11, transcrito a partir de listados impresos. Incluye los programas Comanche, para el módulo de mando, y Luminary, para el módulo lunar. Cualquiera puede leerlo hoy, incluidos los comentarios que los programadores dejaron en el código en 1969.",
  },
  {
    id: "a11-agc-circuitos",
    bannerImage: '/assets/apollo11/infographic_m5/banner_a11-agc-circuitos.webp',
    bannerCaption: "La AGC fue una de las primeras computadoras con circuitos integrados; el Apollo compró gran parte de los primeros chips fabricados en EE. UU.",
    title: "La computadora AGC y los chips",
    color: '#5D7F86',
    btnImage: '/assets/apollo11/infographic_m5/btn_a11-agc-circuitos.webp',
    image: '/assets/apollo11/infographic_m5/hero_a11-agc-circuitos.webp',
    content: [
      "La computadora de guiado del Apollo, conocida por sus siglas en inglés AGC, viajaba en dos ejemplares: uno en el módulo de mando y otro en el módulo lunar. Pesaba unos 32 kilogramos, consumía unos 55 vatios y su reloj funcionaba a algo más de 1 megahercio. Calculaba la posición de la nave, controlaba los encendidos de los motores y ayudaba a orientar la nave en el espacio. Los astronautas se comunicaban con ella a través de un teclado y una pantalla numérica llamada DSKY.",
      "La AGC fue una de las primeras computadoras construidas con circuitos integrados, también llamados chips. Un circuito integrado reúne varios componentes electrónicos sobre una sola pieza de silicio. Cada AGC de la versión que voló a la Luna contenía unos 2,800 chips del mismo tipo, y cada chip tenía dos puertas lógicas NOR de tres entradas. Usar un único tipo de chip simplificaba la fabricación y las pruebas, y permitía detectar defectos con más facilidad.",
      "Los circuitos integrados se inventaron entre 1958 y 1959, gracias a los trabajos de Jack Kilby, en Texas Instruments, y Robert Noyce, en Fairchild Semiconductor. Al principio eran caros y poco fiables, y casi nadie los compraba. El programa Apollo y el misil Minuteman II fueron sus primeros grandes clientes. Según el ingeniero Eldon Hall, responsable del hardware de la AGC, a mediados de los años sesenta el Apollo llegó a comprar alrededor del 60 por ciento de los chips producidos en Estados Unidos.",
      "Esas compras tuvieron un efecto importante en la naciente industria de los semiconductores. Los fabricantes necesitaban producir grandes cantidades de chips que funcionaran sin fallar en el espacio, así que mejoraron sus procesos de fabricación y sus controles de calidad. Con más producción, el precio de cada chip bajó con rapidez. Por eso se considera que el Apollo impulsó de forma decisiva una industria que todavía era muy pequeña, y que después creció en la región conocida como Silicon Valley.",
      "En 1971, dos años después del Apollo 11, la empresa Intel presentó el 4004, el primer microprocesador comercial: una computadora completa dentro de un solo chip. Desde entonces, la cantidad de transistores por chip ha crecido de forma enorme. Un teléfono móvil actual tiene una capacidad de cálculo millones de veces mayor que la AGC. Aun así, la AGC era muy fiable: estaba diseñada para resistir vibraciones, cambios de temperatura y radiación durante toda la misión."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Para dar órdenes a la computadora, los astronautas usaban pares de números llamados verbo y sustantivo. El verbo indicaba la acción, por ejemplo mostrar un dato, y el sustantivo indicaba el dato, por ejemplo la velocidad. Así, con unas pocas teclas numéricas podían pedir cientos de operaciones distintas. Los astronautas memorizaban las combinaciones más usadas durante el entrenamiento." },
      { label: "Dato Científico", icon: "atom", text: "Una puerta NOR da como resultado 1 solo cuando todas sus entradas son 0. Parece una operación muy limitada, pero es universal: combinando suficientes puertas NOR se puede construir cualquier otra operación lógica, como sumar, comparar o guardar un dato. Por eso los ingenieros del MIT pudieron construir una computadora completa usando un único tipo de chip repetido miles de veces." }
    ],
    fact: "Los chips de la AGC los diseñó originalmente Fairchild Semiconductor, y otra empresa, Philco-Ford, fabricó muchos de los que se usaron en las computadoras de vuelo. Cada lote se sometía a pruebas de calor, vibración y funcionamiento antes de aceptarse. Si un lote mostraba fallos, se rechazaba completo. Esa disciplina de calidad se trasladó después a la fabricación comercial de electrónica.",
  },
  {
    id: "a11-traje-ilc",
    bannerImage: '/assets/apollo11/infographic_m5/banner_a11-traje-ilc.webp',
    bannerCaption: "ILC, empresa que fabricaba ropa interior de la marca Playtex, ganó el contrato de los trajes lunares A7L del Apollo.",
    title: "El traje A7L de ILC Dover",
    color: '#8A7560',
    btnImage: '/assets/apollo11/infographic_m5/btn_a11-traje-ilc.webp',
    image: '/assets/apollo11/infographic_m5/hero_a11-traje-ilc.webp',
    content: [
      "Los trajes que usaron Armstrong y Aldrin en la Luna se llamaban A7L y los fabricó la International Latex Corporation, conocida como ILC, en la ciudad de Dover, en el estado de Delaware. Hoy la empresa se llama ILC Dover. En los años sesenta, su división más conocida fabricaba sujetadores y fajas de la marca Playtex. Su experiencia con látex, costuras finas y telas elásticas resultó útil para fabricar un traje que debía ser hermético y, al mismo tiempo, permitir moverse.",
      "En 1965, la NASA organizó una competencia entre trajes de tres empresas: ILC, Hamilton Standard y David Clark. Los evaluadores probaron la movilidad, la resistencia y la comodidad de cada modelo. El traje de ILC obtuvo los mejores resultados y la empresa recibió el contrato. Las costureras de ILC trabajaban con tolerancias de menos de medio milímetro: una puntada mal colocada podía provocar una fuga de aire. Además, cada traje se fabricaba a la medida de un astronauta concreto, a partir de decenas de mediciones de su cuerpo.",
      "El traje A7L tenía unas 21 capas de materiales distintos. Las más internas eran una prenda de confort y una vejiga de nailon recubierto de neopreno que retenía el oxígeno. Encima iba una capa de sujeción que evitaba que el traje se inflara como un globo. Las capas exteriores protegían del calor, del frío y de los micrometeoritos: varias láminas de Mylar aluminizado, otras de Kapton y una cubierta exterior de tela Beta, hecha de fibra de vidrio recubierta de teflón.",
      "Dentro del traje, el oxígeno puro se mantenía a una presión de unos 0.26 bares, aproximadamente una cuarta parte de la presión del aire al nivel del mar. Esa presión baja facilitaba doblar los brazos y las piernas. En los hombros, los codos y las rodillas había fuelles de goma con pliegues, como los de un acordeón, que se doblaban sin cambiar el volumen interior. Sin esos fuelles, el traje presurizado se habría quedado rígido y el astronauta apenas podría moverse.",
      "El traje que usó Neil Armstrong en la Luna se conserva en el Museo Nacional del Aire y el Espacio del Smithsonian. Con los años, la goma y los plásticos empezaron a degradarse. En 2015, el museo lanzó una campaña de financiación colectiva llamada «Reboot the Suit» y reunió más de 700,000 dólares para estudiarlo y conservarlo. Los conservadores lo escanearon por dentro, lo limpiaron y lo colocaron en una vitrina con temperatura y humedad controladas. Se volvió a exhibir en 2019."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Debajo del traje, los astronautas usaban una prenda de enfriamiento líquido parecida a una ropa interior larga. Tenía cosidos unos 90 metros de tubos de plástico delgados por los que circulaba agua fría desde la mochila. El agua absorbía el calor del cuerpo y lo llevaba a la mochila, donde un dispositivo lo expulsaba al vacío evaporando una pequeña cantidad de agua." },
      { label: "Dato Científico", icon: "atom", text: "Sin presión alrededor del cuerpo, el agua de los tejidos humanos empezaría a hervir a la temperatura corporal. Este fenómeno se llama ebullismo y ocurre por encima de unos 19 kilómetros de altitud en la Tierra, en lo que se conoce como límite de Armstrong, nombrado por el médico Harry Armstrong. El traje presurizado evita ese efecto al mantener una presión constante sobre el cuerpo." }
    ],
    fact: "La tela Beta de la capa exterior se adoptó después del incendio del Apollo 1, en enero de 1967, en el que murieron los astronautas Gus Grissom, Ed White y Roger Chaffee durante una prueba en tierra. La tela anterior podía arder en una atmósfera de oxígeno puro. La fibra de vidrio recubierta de teflón no arde, y desde entonces se usó en los trajes y en el interior de las cápsulas.",
  },
  {
    id: "a11-telemetria-archivo",
    bannerImage: '/assets/apollo11/infographic_m5/banner_a11-telemetria-archivo.webp',
    bannerCaption: "Sensores en el pecho de los astronautas enviaban su ritmo cardíaco a Houston; hoy los documentos del Apollo son públicos.",
    title: "Telemetría médica y archivos abiertos",
    color: '#6A7F5E',
    btnImage: '/assets/apollo11/infographic_m5/btn_a11-telemetria-archivo.webp',
    image: '/assets/apollo11/infographic_m5/hero_a11-telemetria-archivo.webp',
    content: [
      "Durante la misión, los astronautas llevaban electrodos pegados al pecho. Esos sensores medían la actividad eléctrica del corazón, como un electrocardiograma, y la frecuencia de la respiración. Las señales viajaban por cables hasta el traje o la nave y de allí, por radio, hasta la Tierra. Esta transmisión de mediciones a distancia se llama telemetría. En el Centro de Control de Misión de Houston, los médicos de vuelo vigilaban esos datos en pantallas durante todo el viaje.",
      "Los datos médicos permitían ver cómo reaccionaba el cuerpo en momentos de tensión. Durante el descenso del Eagle, la frecuencia cardíaca de Neil Armstrong llegó a valores cercanos a 150 latidos por minuto, el doble de su ritmo en reposo. Durante la caminata lunar, los médicos usaban el ritmo cardíaco para estimar cuánta energía gastaba cada astronauta y si convenía que descansara. Así podían calcular cuánto oxígeno y agua de enfriamiento les quedaba en la mochila.",
      "Medir el corazón de una persona a cientos de miles de kilómetros exigió sensores más pequeños, ligeros y fiables, y sistemas de transmisión que no perdieran datos. Según la NASA, esa experiencia en vigilar señales del cuerpo a distancia contribuyó al desarrollo de la telemedicina y de los sistemas de monitoreo de pacientes. Los monitores cardíacos de los hospitales actuales tienen muchas fuentes, y la telemetría del programa espacial fue una de ellas, junto con la investigación médica civil.",
      "Casi todo lo que se produjo durante el programa Apollo es hoy público y está digitalizado. El Apollo Lunar Surface Journal y el Apollo Flight Journal, alojados por la Oficina de Historia de la NASA, reúnen las transcripciones de las comunicaciones con comentarios de los propios astronautas. El servidor técnico de la NASA, llamado NTRS, ofrece informes y manuales. En 2015 se publicaron en línea miles de fotografías tomadas con las cámaras Hasselblad durante las misiones.",
      "Esa apertura tiene una base legal. La ley que creó la NASA en 1958, la National Aeronautics and Space Act, ordena difundir la información sobre sus actividades de la forma más amplia posible. Gracias a ello, estudiantes, historiadores e ingenieros pueden revisar los mismos documentos que usaban los controladores en 1969. Por ejemplo, la Universidad de Texas en Dallas digitalizó miles de horas de grabaciones de audio de los canales de control de la misión Apollo 11."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El sitio web Apollo in Real Time permite revivir la misión Apollo 11 minuto a minuto. Sincroniza las grabaciones de los distintos puestos del Centro de Control con las transcripciones, las fotografías y los videos de la misión. Se puede escuchar, por ejemplo, lo que decían los controladores durante las alarmas 1202, en el mismo instante en que ocurrían." },
      { label: "Dato Científico", icon: "atom", text: "El Apollo usaba un sistema llamado Banda S Unificada, que enviaba por una sola señal de radio la voz, la televisión, la telemetría y los datos de seguimiento. Cada tipo de información viajaba en una subportadora, una frecuencia distinta dentro de la misma señal. Las antenas en la Tierra separaban después esas frecuencias, igual que una radio separa las emisoras." }
    ],
    fact: "Las fotografías Hasselblad de las misiones Apollo se pueden consultar en el Project Apollo Archive, que en 2015 publicó en línea más de 8,000 imágenes escaneadas en alta resolución. Entre ellas están todos los carretes del Apollo 11, incluidas las fotos que los astronautas tomaron desde la ventana del Eagle antes y después de la caminata lunar.",
  }
];

// ─── Marine Particle Field (Canvas Background) ──────────────────────────────
function MarineParticleField() {
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
      hue: Math.random() > 0.5 ? '201,179,126' : '184,125,94', // slate blue or copper
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

// ─── Marine Header ──────────────────────────────────────────────────────────
function MarineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(201,179,126,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo11M5)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5F7A6A", "#6E6A86", "#5B7B8C", "#866B7A", "#5D7F86", "#8A7560", "#6A7F5E"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#C9B37E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#C9B37E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradApollo11M5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DESPEGUE, ENCUENTRO Y TECNOLOGÍA APOLLO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(201,179,126,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MISIONES APOLO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(201,179,126,0.2)'}`,
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
          layoutId="activeDotApollo11M5"
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

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
        {node.bannerImage && (
              <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                <img src={node.bannerImage} alt={node.bannerCaption || ''}
                     style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
                {node.bannerCaption && (
                  <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                              fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                              textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                    {node.bannerCaption}
                  </p>
                )}
              </div>
            )}
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
      border: '1px solid rgba(201,179,126,0.15)',
    }}>
      <Star size={14} style={{ color: '#C9B37E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C9B37E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(201,179,126,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C9B37E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_Apollo11M5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.96) 0%, rgba(15,10,35,0.94) 40%, rgba(10,12,30,0.97) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(201,179,126,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MarineParticleField />

      <MarineHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(201,179,126,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(201,179,126,0.08)', borderRadius: '16px',
              border: '1px solid rgba(201,179,126,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#C9B37E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Experto en Acoplamiento: un solo motor, una computadora de 32 kg y un traje de 21 capas
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia
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
