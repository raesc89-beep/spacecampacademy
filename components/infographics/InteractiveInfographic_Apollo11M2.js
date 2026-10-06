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
  "Benson, C. D. y Faherty, W. B. (1978). Moonport: A History of Apollo Launch Facilities and Operations. NASA SP-4204.",
  "Collins, M. (1974). Carrying the Fire: An Astronaut's Journeys. Farrar, Straus and Giroux.",
  "Shetterly, M. L. (2016). Hidden Figures: The American Dream and the Untold Story of the Black Women Mathematicians Who Helped Win the Space Race. William Morrow.",
  "Woods, W. D. (2011). How Apollo Flew to the Moon (2.ª ed.). Springer-Praxis.",
  "Orloff, R. W. (2000). Apollo by the Numbers: A Statistical Reference. NASA SP-2000-4029.",
  "Woods, W. D. y otros (eds.). Apollo 11 Flight Journal. NASA History Office (history.nasa.gov/afj)."
];

const INFOGRAPHIC_NODES = [
  {
    id: "puerto-espacial-florida",
    bannerImage: '/assets/apollo11/infographic_m2/banner_puerto-espacial-florida.webp',
    bannerCaption: "Desde Florida, los cohetes despegan hacia el este sobre el océano y aprovechan unos 1,470 km/h de la rotación terrestre.",
    title: "¿Por qué despegar desde Florida?",
    color: '#7A8C6E',
    btnImage: '/assets/apollo11/infographic_m2/btn_puerto-espacial-florida.webp',
    image: '/assets/apollo11/infographic_m2/hero_puerto-espacial-florida.webp',
    content: [
      "El Centro Espacial Kennedy está en la isla Merritt, junto al cabo Cañaveral, en la costa este de Florida, a unos 28.5 grados de latitud norte. Los ingenieros eligieron ese lugar por dos razones principales. La primera es la seguridad: los cohetes despegan hacia el este, sobre el océano Atlántico, de modo que las etapas vacías caen al mar y no sobre ciudades. Si un cohete falla en los primeros minutos, sus restos también caen lejos de las zonas habitadas.",
      "La segunda razón es la rotación de la Tierra. Nuestro planeta gira hacia el este y, en el ecuador, su superficie se mueve a unos 1,670 kilómetros por hora. En la latitud de Florida, esa velocidad es de unos 1,470 kilómetros por hora. Un cohete que despega hacia el este recibe esa velocidad gratis, sin gastar combustible. Por eso la Agencia Espacial Europea lanza sus cohetes desde Kurú, en la Guayana Francesa, a solo 5 grados del ecuador.",
      "Cabo Cañaveral ya se usaba para lanzar misiles desde 1950. El 24 de julio de ese año despegó allí el cohete Bumper 8, el primero lanzado desde el cabo. Cuando el presidente John F. Kennedy anunció en 1961 el objetivo de llegar a la Luna, la NASA necesitó mucho más espacio y compró terrenos en la isla Merritt. Tras el asesinato de Kennedy, en noviembre de 1963, el presidente Lyndon B. Johnson dio a ese centro el nombre de Centro Espacial John F. Kennedy.",
      "El Centro Espacial Kennedy comparte su territorio con el Refugio Nacional de Vida Silvestre de la isla Merritt, creado en 1963. Allí viven caimanes, manatíes, tortugas marinas y cientos de especies de aves. La NASA protege gran parte de esos terrenos porque solo necesita construir en zonas concretas, y el resto funciona como zona de seguridad alrededor de las plataformas. Así, uno de los lugares con más tecnología del mundo es también un espacio natural protegido.",
      "La plataforma 39A se construyó especialmente para el Saturn V. Desde allí despegaron el Apolo 11 y la mayoría de las misiones lunares. Después se adaptó para el transbordador espacial, que voló por primera vez desde 39A el 12 de abril de 1981. Desde 2014, la empresa SpaceX alquila esa plataforma. El 30 de mayo de 2020, la misión Demo-2 despegó desde 39A: fue el primer vuelo con astronautas lanzado desde Estados Unidos desde 2011."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "No todos los cohetes despegan hacia el este. Los satélites que deben pasar sobre los polos, por ejemplo los que fotografían toda la superficie terrestre, se lanzan hacia el norte o hacia el sur. En Estados Unidos, muchos de esos lanzamientos se hacen desde la base Vandenberg, en California, porque allí pueden volar sobre el océano Pacífico sin cruzar zonas pobladas." },
      { label: "Dato Científico", icon: "atom", text: "La velocidad de rotación depende de la latitud porque cada punto de la Tierra da una vuelta completa en un día, pero los círculos son de distinto tamaño. En el ecuador, el círculo mide unos 40,000 kilómetros. Cerca de los polos, el círculo es diminuto. Por eso un lugar cercano al ecuador recorre más distancia en el mismo tiempo y ofrece más velocidad inicial al cohete." }
    ],
    fact: "Florida tiene una desventaja importante: las tormentas eléctricas de verano son frecuentes. Por eso el Centro Espacial Kennedy tiene torres pararrayos alrededor de sus plataformas y un equipo de meteorólogos que vigila el cielo antes de cada lanzamiento. Si hay nubes cargadas, vientos fuertes o rayos cerca, el despegue se retrasa aunque el cohete esté listo.",
  },
  {
    id: "vab-y-crawler",
    bannerImage: '/assets/apollo11/infographic_m2/banner_vab-y-crawler.webp',
    bannerCaption: "El VAB mide 160 m de alto; el Crawler Transporter, de unas 2,700 toneladas, llevaba el cohete a la plataforma a 1.6 km/h.",
    title: "El VAB y el gigante oruga",
    color: '#8A7560',
    btnImage: '/assets/apollo11/infographic_m2/btn_vab-y-crawler.webp',
    image: '/assets/apollo11/infographic_m2/hero_vab-y-crawler.webp',
    content: [
      "El Saturn V se armaba dentro del Edificio de Ensamblaje de Vehículos, conocido como VAB por sus siglas en inglés. Terminado en 1966, mide 160 metros de altura, 218 metros de largo y 158 metros de ancho. Su volumen interior es de unos 3.66 millones de metros cúbicos, lo que lo convierte en uno de los edificios más grandes del mundo por volumen. Sus puertas principales miden 139 metros de alto y se consideran las puertas más altas del planeta.",
      "Dentro del VAB, las etapas se apilaban en posición vertical, una sobre otra, sobre una plataforma móvil con una torre de servicio de más de 120 metros. Las grúas del edificio levantaban piezas de cientos de toneladas con precisión de centímetros. Armar un Saturn V completo llevaba semanas de trabajo. Los técnicos conectaban cables, tuberías y sensores, y probaban cada sistema antes de que el cohete saliera del edificio hacia la plataforma de lanzamiento.",
      "El VAB es tan grande que la humedad de Florida puede afectar su interior. Según la NASA, sin su sistema de ventilación y aire acondicionado podrían formarse nubes cerca del techo en los días más húmedos. Por eso el edificio tiene ventiladores enormes que renuevan el aire continuamente. Además, la bandera de Estados Unidos pintada en uno de sus costados mide unos 64 metros de alto, y cada una de sus franjas es tan ancha como un carril de autopista.",
      "Para llevar el cohete hasta la plataforma 39A, la NASA usaba el Crawler Transporter, un vehículo de orugas fabricado en 1965 por la empresa Marion Power Shovel. Se construyeron dos unidades, apodadas Hans y Franz. Cada una pesa unas 2,700 toneladas y avanza sobre ocho orugas formadas por 456 zapatas metálicas en total; cada zapata pesa casi una tonelada. Es uno de los vehículos autopropulsados más pesados jamás construidos.",
      "Con el cohete encima, el Crawler avanzaba a solo 1.6 kilómetros por hora, más lento que una persona caminando. El trayecto hasta la plataforma, de unos 5.5 kilómetros, duraba varias horas. Su sistema de nivelación mantenía el cohete vertical incluso al subir la rampa de la plataforma, para que no se inclinara ni un poco. Los dos Crawler siguen funcionando: fueron modernizados y en 2022 transportaron el cohete SLS de la misión Artemis I."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Crawler Transporter consume cientos de litros de diésel por cada kilómetro recorrido. Sus motores no mueven las orugas directamente: hacen girar generadores que producen electricidad, y esa electricidad alimenta motores eléctricos en las orugas. Es un sistema diésel-eléctrico, parecido al de muchas locomotoras de tren." },
      { label: "Dato Científico", icon: "atom", text: "Un edificio muy alto tiene un problema con la temperatura del aire: el aire caliente sube y el frío baja. En el VAB, la diferencia de altura es tan grande que el aire de arriba puede estar más caliente y húmedo que el de abajo. Si ese aire se enfría al tocar superficies frías, el vapor de agua se condensa. Eso es exactamente lo que ocurre cuando se forma una nube." }
    ],
    fact: "El VAB sigue en uso más de cincuenta años después de su construcción. Allí se armaron los transbordadores espaciales entre 1981 y 2011 y, desde 2022, el cohete SLS del programa Artemis. La NASA también alquila espacio dentro del edificio a empresas privadas. Es una de las pocas instalaciones del programa Apolo que nunca dejó de trabajar.",
  },
  {
    id: "vida-en-columbia",
    bannerImage: '/assets/apollo11/infographic_m2/banner_vida-en-columbia.webp',
    bannerCaption: "Tres astronautas compartieron unos 6 m³ habitables en el Módulo de Mando Columbia, un cono de 3.9 m de diámetro.",
    title: "La vida a bordo de Columbia",
    color: '#5E7A8A',
    btnImage: '/assets/apollo11/infographic_m2/btn_vida-en-columbia.webp',
    image: '/assets/apollo11/infographic_m2/hero_vida-en-columbia.webp',
    content: [
      "El Módulo de Mando Columbia era un cono de 3.9 metros de diámetro en la base y unos 3.2 metros de altura. Su espacio habitable era de unos 6 metros cúbicos, parecido al interior de una camioneta grande, y allí vivieron tres personas durante ocho días. Tenía tres asientos, cinco ventanas, cientos de interruptores y la computadora de guiado. Era la única parte de la nave Apolo 11 que regresaría a la Tierra al final de la misión.",
      "Detrás del Módulo de Mando iba el Módulo de Servicio, un cilindro de unos 7.5 metros de largo. Llevaba el motor principal de la nave, con unos 91,000 newtons de empuje, y sus tanques de propelente. Ese motor usaba propelentes hipergólicos: dos sustancias que arden en cuanto se tocan, sin necesidad de chispa. Esto lo hacía muy fiable, algo esencial, porque el mismo motor debía frenar la nave en la Luna y luego acelerarla de vuelta a la Tierra.",
      "La electricidad venía de tres pilas de combustible. En ellas, hidrógeno y oxígeno se combinaban para producir corriente eléctrica, y el subproducto era agua pura que los astronautas usaban para beber y preparar comida. El oxígeno de esos tanques también servía para respirar. En 1970, la explosión de uno de esos tanques de oxígeno en el Módulo de Servicio obligó a la tripulación del Apolo 13 a suspender su aterrizaje lunar.",
      "La comida del Apolo 11 era sobre todo liofilizada: se le había quitado el agua para que pesara menos y no se estropeara. Para comerla, los astronautas inyectaban agua en la bolsa con una pistola especial, amasaban y esperaban unos minutos. El menú incluía cubos de tocino, duraznos, galletas de azúcar y café. Algunos bocados se recubrían con gelatina para evitar migas, porque en ingravidez una miga flotante podía entrar en un ojo o en un aparato.",
      "Durante el viaje, la nave giraba lentamente sobre su eje, unas tres vueltas por hora. Esta maniobra se llamaba control térmico pasivo, aunque los astronautas la apodaban «modo barbacoa». Sin ella, el lado expuesto al Sol se calentaría demasiado y el lado en sombra se enfriaría demasiado. Girando, el calor se repartía de forma uniforme, como un pollo en un asador. La tripulación también hizo transmisiones de televisión para mostrar la Tierra desde lejos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Hoy el Módulo de Mando Columbia se exhibe en el Museo Nacional del Aire y del Espacio del Instituto Smithsonian, en Washington D. C. En 2016, los conservadores escanearon su interior en tres dimensiones y encontraron mensajes escritos a lápiz por Michael Collins, incluido un calendario de la misión y una nota en la que llamaba a la nave «la mejor»." },
      { label: "Dato Científico", icon: "atom", text: "Una pila de combustible funciona al revés que la electrólisis. En la electrólisis, la electricidad separa el agua en hidrógeno y oxígeno. En la pila, el hidrógeno y el oxígeno se unen para formar agua y liberan electricidad. No hay llama ni explosión: la reacción ocurre poco a poco sobre unos electrodos, y por eso puede funcionar de forma segura durante días." }
    ],
    fact: "Los astronautas del Apolo 11 no podían ducharse durante los ocho días de misión. Se limpiaban con toallas húmedas y se afeitaban con crema y cuchilla, recogiendo cada pelo con cuidado para que no flotara por la cabina. Los residuos se guardaban en bolsas selladas que regresaban a la Tierra. La higiene en una nave tan pequeña era parte del trabajo diario.",
  },
  {
    id: "katherine-johnson-calculos",
    bannerImage: '/assets/apollo11/infographic_m2/banner_katherine-johnson-calculos.webp',
    bannerCaption: "Katherine Johnson calculó trayectorias para los primeros vuelos tripulados de la NASA y trabajó en los cálculos del programa Apolo.",
    title: "Katherine Johnson y las computadoras humanas",
    color: '#8C6A7A',
    btnImage: '/assets/apollo11/infographic_m2/btn_katherine-johnson-calculos.webp',
    image: '/assets/apollo11/infographic_m2/hero_katherine-johnson-calculos.webp',
    content: [
      "Katherine Johnson nació el 26 de agosto de 1918 en White Sulphur Springs, Virginia Occidental, en Estados Unidos. Era tan buena en matemáticas que terminó la secundaria a los 14 años y la universidad a los 18, en el West Virginia State College, con títulos en Matemáticas y Francés. En 1953 empezó a trabajar en el Laboratorio Langley, en Hampton, Virginia, que pertenecía al Comité Asesor Nacional para la Aeronáutica, la organización que en 1958 se transformó en la NASA.",
      "En aquella época, «computadora» no era una máquina, sino un puesto de trabajo. Las computadoras eran personas, en su mayoría mujeres, que hacían cálculos a mano o con calculadoras mecánicas. En Langley, las mujeres afroamericanas trabajaban en una sección separada llamada West Area Computing, porque las leyes de segregación racial de Virginia obligaban a separar a las personas por su color de piel. Allí trabajaron también Dorothy Vaughan y Mary Jackson.",
      "En 1961, Katherine Johnson calculó la trayectoria del vuelo de Alan Shepard, el primer estadounidense en el espacio. En 1962, para el vuelo orbital de John Glenn, la NASA usó una computadora electrónica IBM, pero Glenn pidió que ella revisara a mano los resultados antes de despegar. Según los relatos de la NASA, dijo que si ella confirmaba los números, él estaba listo para volar. Katherine pasó días repitiendo los cálculos, y coincidieron.",
      "En el programa Apolo, Katherine Johnson trabajó en cálculos de trayectorias entre la Tierra y la Luna y en el encuentro entre el Módulo Lunar y el Módulo de Mando en órbita lunar. Ese encuentro era delicado: el Módulo Lunar debía despegar de la superficie y alcanzar a una nave que daba vueltas a la Luna a gran velocidad. A lo largo de su carrera firmó como autora o coautora 26 informes científicos de la NASA.",
      "Katherine Johnson se jubiló en 1986. En 2015, el presidente Barack Obama le entregó la Medalla Presidencial de la Libertad, el máximo honor civil de Estados Unidos. En 2016, el libro «Hidden Figures», de Margot Lee Shetterly, y la película basada en él dieron a conocer su historia en todo el mundo. En 2017, la NASA inauguró en Langley un edificio de investigación con su nombre. Murió el 24 de febrero de 2020, a los 101 años."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1960, Katherine Johnson y el ingeniero Ted Skopinski publicaron un informe sobre cómo calcular el ángulo de lanzamiento para colocar una nave sobre un punto concreto de la Tierra. Fue la primera vez que una mujer de su división aparecía como autora de un informe técnico. Hasta entonces, el trabajo de las computadoras casi nunca llevaba su nombre." },
      { label: "Dato Científico", icon: "atom", text: "Calcular una trayectoria significa resolver ecuaciones que describen cómo se mueve un objeto bajo la gravedad de la Tierra y de la Luna. Katherine usaba geometría analítica, la rama de las matemáticas que describe curvas con números y coordenadas. Una órbita es una elipse, y cada punto de esa elipse puede calcularse si se conocen la posición y la velocidad iniciales." }
    ],
    fact: "Cuando las computadoras electrónicas llegaron a la NASA a finales de los años cincuenta, muchas personas no confiaban en ellas porque fallaban con frecuencia. Por eso los resultados de las máquinas se comparaban con los de las computadoras humanas. Dorothy Vaughan, compañera de Katherine, aprendió por su cuenta el lenguaje de programación FORTRAN y lo enseñó a su equipo para que no perdiera su trabajo.",
  },
  {
    id: "navegar-entre-mundos",
    bannerImage: '/assets/apollo11/infographic_m2/banner_navegar-entre-mundos.webp',
    bannerCaption: "La nave perdió velocidad al alejarse de la Tierra; los astronautas se guiaban con un sextante y 37 estrellas de referencia.",
    title: "Navegar entre la Tierra y la Luna",
    color: '#5C6F7D',
    btnImage: '/assets/apollo11/infographic_m2/btn_navegar-entre-mundos.webp',
    image: '/assets/apollo11/infographic_m2/hero_navegar-entre-mundos.webp',
    content: [
      "Después de la inyección translunar, la nave Apolo 11 viajaba por una trayectoria de retorno libre. Esto significa que, si el motor principal fallaba, la gravedad de la Luna curvaría su camino alrededor de ella y la devolvería hacia la Tierra sin necesidad de encenderlo. Era un seguro de vida. En 1970, después de la explosión a bordo del Apolo 13, los controladores regresaron la nave a una trayectoria de este tipo para salvar a su tripulación.",
      "Al salir de la órbita terrestre, la nave viajaba a unos 39,000 kilómetros por hora. Pero la gravedad de la Tierra la frenaba sin descanso, como una pelota lanzada hacia arriba. Cuando quedaban unos 60,000 kilómetros para llegar a la Luna, su velocidad había bajado a menos de 3,500 kilómetros por hora. A partir de ese punto, la gravedad lunar empezó a dominar y la nave volvió a acelerar mientras se acercaba a su destino.",
      "La nave tenía dos formas de saber dónde estaba. La principal era el seguimiento desde la Tierra: grandes antenas medían su distancia y su velocidad con señales de radio. La otra era la navegación a bordo. Con un sextante de 28 aumentos, los astronautas medían el ángulo entre una estrella y el horizonte de la Tierra o de la Luna, y la computadora calculaba la posición con esos datos. La computadora tenía registradas 37 estrellas de navegación.",
      "La Red de Vuelos Espaciales Tripulados de la NASA tenía tres grandes estaciones repartidas alrededor del planeta: Goldstone, en California; Honeysuckle Creek, en Australia; y Fresnedillas, cerca de Madrid, en España. Estaban separadas por unos 120 grados de longitud, de modo que, mientras la Tierra giraba, al menos una de ellas siempre podía ver la Luna. Las señales de radio tardaban unos 1.3 segundos en llegar de la Tierra a la nave.",
      "El lanzamiento había sido tan preciso que, de las cuatro correcciones de rumbo planificadas para el viaje de ida, solo fue necesaria una: un encendido de apenas unos segundos durante el segundo día. El resto del tiempo, la nave avanzó solo por inercia, sin motores encendidos. Desde la inyección translunar hasta la llegada a la Luna pasaron algo más de tres días, durante los cuales la nave recorrió unos 384,000 kilómetros."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Tres de las estrellas de navegación del Apolo tenían nombres inventados como homenaje. Navi, Dnoces y Regor son los nombres de Gus Grissom (Ivan), Ed White II (Second) y Roger Chaffee escritos al revés. Los tres astronautas murieron en 1967 durante una prueba en tierra de la nave Apolo 1, cuando se incendió su cabina." },
      { label: "Dato Científico", icon: "atom", text: "Entre la Tierra y la Luna existe un punto llamado L1, uno de los cinco puntos de Lagrange del sistema, a unos 326,000 kilómetros de la Tierra. Allí, la atracción de los dos cuerpos y el movimiento orbital se equilibran, de modo que un objeto podría quedarse en la misma posición respecto a ambos. Los ingenieros estudian esos puntos para colocar futuras estaciones espaciales." }
    ],
    fact: "La estación de Fresnedillas, en la sierra de Madrid, siguió a la nave del Apolo 11 durante toda la misión cada vez que la Luna estaba sobre el horizonte de España. Hoy, el pueblo de Fresnedillas de la Oliva conserva un pequeño museo dedicado a esa historia. Muy cerca, la estación de Robledo de Chavela, de la Red de Espacio Profundo de la NASA, sigue comunicándose con sondas como la Voyager.",
  },
  {
    id: "orbita-lunar-loi",
    bannerImage: '/assets/apollo11/infographic_m2/banner_orbita-lunar-loi.webp',
    bannerCaption: "El 19 de julio de 1969, la nave encendió su motor casi 6 minutos detrás de la Luna, sin contacto por radio, para quedar en órbita.",
    title: "Frenar detrás de la Luna",
    color: '#6B6E8C',
    btnImage: '/assets/apollo11/infographic_m2/btn_orbita-lunar-loi.webp',
    image: '/assets/apollo11/infographic_m2/hero_orbita-lunar-loi.webp',
    content: [
      "El 19 de julio de 1969, después de unas 75 horas y media de viaje, la nave Apolo 11 llegó a la Luna. Para quedarse en órbita, debía frenar. La tripulación giró la nave para que el motor principal apuntara hacia delante y lo encendió durante 5 minutos y 57 segundos. Esta maniobra se llama inserción en órbita lunar. Si el motor no se encendía, la trayectoria de retorno libre devolvería la nave a la Tierra; si funcionaba demasiado tiempo, la nave podría caer hacia la superficie.",
      "El encendido ocurrió cuando la nave estaba detrás de la Luna, en el lado que nunca mira hacia la Tierra. Allí la Luna bloqueaba las señales de radio, así que en Houston nadie podía saber qué estaba pasando. Los controladores calcularon el minuto exacto en que la nave debía reaparecer por el borde de la Luna si todo había salido bien. Cuando la señal regresó a la hora prevista, supieron que la maniobra había funcionado.",
      "El primer encendido dejó a la nave en una órbita alargada, de unos 110 kilómetros de altura en su punto más bajo y unos 310 kilómetros en el más alto. Unas horas después, un segundo encendido de unos 17 segundos la colocó en una órbita casi circular, de entre 100 y 120 kilómetros de altura. Cada vuelta a la Luna duraba unas dos horas. Desde allí, los astronautas observaron el terreno donde iban a aterrizar al día siguiente.",
      "La Luna siempre muestra la misma cara a la Tierra porque tarda lo mismo en girar sobre sí misma que en dar una vuelta a nuestro planeta. Los científicos llaman a este fenómeno rotación sincrónica. El lado oculto no está siempre a oscuras: recibe luz del Sol igual que el visible. La primera fotografía de ese lado la tomó la sonda soviética Luna 3 en octubre de 1959, y los primeros humanos que lo vieron fueron los tripulantes del Apolo 8, en diciembre de 1968.",
      "Mientras Armstrong y Aldrin bajaban a la superficie y volvían, Michael Collins se quedó solo en Columbia durante unas 28 horas. En cada vuelta, pasaba unos 48 minutos detrás de la Luna sin poder hablar con nadie. Algunos periodistas lo llamaron el hombre más solitario de la historia. Sin embargo, en su libro «Carrying the Fire» (1974), Collins escribió que no sintió miedo ni tristeza, sino conciencia de lo especial de su situación y una sensación de alegría."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El campo de gravedad de la Luna no es uniforme. En 1968, al estudiar el movimiento de las sondas Lunar Orbiter, los científicos descubrieron zonas con más masa bajo algunos mares lunares. Las llamaron mascones, por concentraciones de masa. Esas zonas desvían ligeramente las órbitas, y los planificadores del Apolo tuvieron que tenerlas en cuenta para calcular el punto de aterrizaje." },
      { label: "Dato Científico", icon: "atom", text: "Para frenar en el espacio no hay aire ni frenos de rueda: la única forma es empujar en dirección contraria al movimiento. Por eso la nave giraba antes de encender el motor. La gravedad de la Luna es unas seis veces más débil que la de la Tierra, así que la velocidad necesaria para mantener una órbita baja a su alrededor es de solo unos 5,800 kilómetros por hora." }
    ],
    fact: "Durante las vueltas en órbita lunar, la tripulación del Apolo 11 fotografió la zona de aterrizaje en el mar de la Tranquilidad para comprobar los puntos de referencia que Armstrong usaría durante el descenso. Esos puntos, como cráteres y crestas, tenían nombres informales elegidos por los planificadores, y los astronautas los habían memorizado durante meses con mapas y maquetas.",
  },
  {
    id: "camaras-hasselblad",
    bannerImage: '/assets/apollo11/infographic_m2/banner_camaras-hasselblad.webp',
    bannerCaption: "Las cámaras suecas Hasselblad del Apolo 11 usaban película de 70 mm y una placa con cruces para medir distancias en las fotos.",
    title: "Hasselblad: fotografiar otro mundo",
    color: '#7D7466',
    btnImage: '/assets/apollo11/infographic_m2/btn_camaras-hasselblad.webp',
    image: '/assets/apollo11/infographic_m2/hero_camaras-hasselblad.webp',
    content: [
      "Para fotografiar la misión, la NASA eligió cámaras de la marca sueca Hasselblad. Eran cámaras de formato medio: usaban película de 70 milímetros, más ancha que la de las cámaras comunes de la época, lo que permitía imágenes con mucho detalle. En la superficie lunar se usó un modelo eléctrico, la Hasselblad 500EL, con un objetivo Zeiss de 60 milímetros. Un motor avanzaba la película después de cada foto, porque con los guantes del traje era difícil hacerlo a mano.",
      "Las cámaras se modificaron para el espacio. Se eliminó el visor, porque el casco impedía acercar el ojo, y los astronautas apuntaban con el pecho, donde llevaban la cámara sujeta al traje. La carcasa se pintó de color plateado para reflejar el calor del Sol. Se cambiaron los lubricantes por otros que no se evaporaran en el vacío, y se agrandaron los mandos para poder usarlos con guantes gruesos.",
      "Muchas fotografías del Apolo tienen pequeñas cruces negras repartidas en forma de cuadrícula. No son un error ni un truco: las producía una placa de vidrio grabada, llamada placa réseau, colocada justo delante de la película. Como la distancia entre las cruces era conocida, los científicos podían medir el tamaño de rocas y cráteres en las fotos y detectar si la película se había deformado con el calor o el frío.",
      "Durante la misión Apolo 11 se tomaron alrededor de 1,400 fotografías con las cámaras Hasselblad, entre la Tierra, el viaje y la Luna. Casi todas las fotos de un astronauta en la superficie muestran a Buzz Aldrin, porque Armstrong llevó la cámara principal casi todo el tiempo. Una de las imágenes más famosas es el retrato de Aldrin en el que su visor dorado refleja a Armstrong, la nave Eagle y el paisaje lunar.",
      "Además de las Hasselblad, la misión llevó cámaras de cine de 16 milímetros que grabaron el descenso del Eagle desde una ventana y parte del trabajo en la superficie. También había una cámara de televisión en blanco y negro que transmitió en directo los primeros pasos. Para ahorrar peso en el despegue lunar, los astronautas dejaron en la Luna los cuerpos de las cámaras de superficie y regresaron solo con los cartuchos de película."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las fotos del Apolo 11 no se podían ver hasta regresar a la Tierra. Los rollos se revelaron en un laboratorio del Centro Espacial de Houston con mucho cuidado, porque eran únicos. Antes de revelar los originales, los técnicos probaban el proceso químico con rollos idénticos expuestos en tierra, para asegurarse de que nada saliera mal." },
      { label: "Dato Científico", icon: "atom", text: "En la Luna no hay aire que disperse la luz, por eso el cielo es negro incluso de día y las sombras son muy oscuras. En las fotos del Apolo casi no se ven estrellas porque el suelo iluminado por el Sol es muy brillante; para no quemar la imagen, la cámara usaba exposiciones cortas, y la luz débil de las estrellas no alcanzaba a quedar registrada." }
    ],
    fact: "Las fotografías de todas las misiones Apolo están digitalizadas y disponibles en internet para cualquier persona. El archivo del Proyecto Apolo y la Biblioteca de Imágenes de la NASA permiten ver cada imagen con su número de catálogo. Por ejemplo, la foto de Aldrin con el visor que refleja a Armstrong tiene el código AS11-40-5903: misión 11, cartucho 40, fotograma 5903.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo11M2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#7A8C6E", "#8A7560", "#5E7A8A", "#8C6A7A", "#5C6F7D", "#6B6E8C", "#7D7466"];
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
          <linearGradient id="gradApollo11M2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DE FLORIDA A LA ÓRBITA LUNAR</text>
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
          layoutId="activeDotApollo11M2"
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
export default function InteractiveInfographic_Apollo11M2() {
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
              🏆 ¡Navegante del Espacio Profundo! Sabes cómo se cruzan 384,000 km.
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
