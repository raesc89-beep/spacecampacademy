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
  "Stafford, Thomas P.; Cassutt, Michael (2002). We Have Capture: Tom Stafford and the Space Race. Washington D. C.: Smithsonian Institution Press.",
  "Cernan, Eugene; Davis, Don (1999). The Last Man on the Moon. Nueva York: St. Martin's Press.",
  "Young, John W.; Hansen, James R. (2012). Forever Young: A Life of Adventure in Air and Space. Gainesville: University Press of Florida.",
  "Orloff, Richard W. (2000). Apollo by the Numbers: A Statistical Reference. NASA SP-2000-4029, NASA History Division.",
  "Chaikin, Andrew (1994). A Man on the Moon: The Voyages of the Apollo Astronauts. Nueva York: Viking.",
  "Muller, P. M.; Sjogren, W. L. (1968). Mascons: Lunar Mass Concentrations. Science, 161 (3842), 680-684.",
  "Brooks, Courtney G.; Grimwood, James M.; Swenson, Loyd S. (1979). Chariots for Apollo: A History of Manned Lunar Spacecraft. NASA SP-4205, NASA History Office."
];

const INFOGRAPHIC_NODES = [
  {
    id: "mision-tipo-f",
    bannerImage: '/assets/apollo10/infographic_m1/banner_mision-tipo-f.webp',
    bannerCaption: "Apollo 10, en mayo de 1969, repitió cada paso de un alunizaje excepto tocar la superficie de la Luna.",
    title: "¿Por Qué un Ensayo General?",
    color: '#3E4A61',
    btnImage: '/assets/apollo10/infographic_m1/btn_mision-tipo-f.webp',
    image: '/assets/apollo10/infographic_m1/hero_mision-tipo-f.webp',
    content: [
      "La NASA planificó el camino hacia la Luna como una escalera de misiones, cada una identificada con una letra. La misión tipo C probó la nave en órbita terrestre, como hizo Apollo 7. La tipo D probó el Módulo Lunar cerca de la Tierra, como Apollo 9 en marzo de 1969. La misión tipo F debía hacer todo lo que haría un alunizaje, pero sin aterrizar. Esa fue Apollo 10. La siguiente, la tipo G, sería el primer alunizaje: Apollo 11.",
      "Apollo 8 había demostrado en diciembre de 1968 que una tripulación podía viajar hasta la órbita lunar y volver. Pero aún faltaban pruebas importantes. Nadie había llevado un Módulo Lunar hasta la Luna, ni había separado dos naves tripuladas en órbita lunar para luego volver a unirlas. Tampoco se sabía con exactitud cómo afectaría la gravedad irregular de la Luna a la trayectoria de descenso. Apollo 10 debía responder esas preguntas dos meses antes del intento real.",
      "Algunos ingenieros y directivos se preguntaron si no sería mejor intentar el alunizaje directamente con Apollo 10. Sin embargo, los responsables del programa, como el director de vuelo Christopher Kraft y el director del programa Apollo, el general Samuel Phillips, prefirieron un paso intermedio. Si algo fallaba en la órbita lunar, era mejor descubrirlo en una misión de prueba. Además, el Módulo Lunar asignado a Apollo 10 no estaba preparado para aterrizar y despegar de la superficie.",
      "El plan era ambicioso. La tripulación volaría hasta la Luna en tres días, entraría en órbita lunar y dos astronautas pasarían al Módulo Lunar. Después bajarían hasta unos 15 kilómetros de la superficie, sobrevolarían el sitio de alunizaje elegido en el Mar de la Tranquilidad, se separarían de la etapa de descenso y subirían con la etapa de ascenso para reunirse con el Módulo de Mando. Era exactamente la secuencia que seguirían Armstrong y Aldrin, salvo los últimos kilómetros.",
      "La misión también serviría para probar la red de comunicaciones con dos naves a la vez, una cerca de la superficie y otra más alta. En Houston, los controladores de vuelo practicaron cada decisión con datos reales, no simulados. Muchos de ellos trabajarían dos meses después en Apollo 11. Por eso Apollo 10 se considera la prueba final del sistema completo: cohete, nave, Módulo Lunar, red de antenas, computadoras y personas trabajando juntas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La misión tipo E, que debía probar el Módulo Lunar en una órbita terrestre muy alta, nunca se realizó. Después del éxito de Apollo 8 alrededor de la Luna, la NASA decidió que ya no era necesaria y pasó directamente a la misión tipo F. Ese cambio de plan ahorró meses en el calendario y permitió intentar el alunizaje en julio de 1969." },
      { label: "Dato Científico", icon: "atom", text: "En el espacio, dos naves en la misma órbita no se alcanzan simplemente acelerando. Si una nave acelera, sube a una órbita más alta y se vuelve más lenta en su recorrido. Para alcanzar a otra nave que va delante, hay que bajar a una órbita más baja y rápida. Este principio de la mecánica orbital era clave para la maniobra de reunión que practicó Apollo 10." }
    ],
    fact: "Apollo 10 fue el ensayo más completo de toda la historia del programa espacial de Estados Unidos hasta ese momento. Usó exactamente el mismo tipo de cohete, nave y Módulo Lunar que Apollo 11, siguió casi la misma trayectoria y viajó a la Luna en la misma época del mes lunar que se usaría para el alunizaje, con una iluminación solar parecida sobre el sitio elegido.",
  },
  {
    id: "tripulacion-veterana",
    bannerImage: '/assets/apollo10/infographic_m1/banner_tripulacion-veterana.webp',
    bannerCaption: "Thomas Stafford fue comandante, John Young piloto del Módulo de Mando y Eugene Cernan piloto del Módulo Lunar.",
    title: "Stafford, Young y Cernan",
    color: '#4A5D73',
    btnImage: '/assets/apollo10/infographic_m1/btn_tripulacion-veterana.webp',
    image: '/assets/apollo10/infographic_m1/hero_tripulacion-veterana.webp',
    content: [
      "Thomas Stafford fue el comandante de Apollo 10. Nació el 17 de septiembre de 1930 en Weatherford, Oklahoma, se graduó de la Academia Naval de Estados Unidos en 1952 y fue piloto de la Fuerza Aérea. Antes de Apollo 10 voló dos veces en el programa Gemini: en Gemini 6A, en diciembre de 1965, que hizo el primer encuentro entre dos naves tripuladas en órbita con Gemini 7, y en Gemini 9A, en junio de 1966. Era experto en maniobras de encuentro orbital.",
      "John Young fue el piloto del Módulo de Mando, la nave llamada Charlie Brown. Nació el 24 de septiembre de 1930 en San Francisco, estudió ingeniería aeronáutica en el Instituto Tecnológico de Georgia y fue piloto de pruebas de la Marina. Voló en Gemini 3 en marzo de 1965, el primer vuelo tripulado de dos personas de Estados Unidos, junto a Virgil Grissom, y en Gemini 10 en julio de 1966. Durante Apollo 10 se convirtió en el primer ser humano en volar solo alrededor de la Luna.",
      "Eugene Cernan fue el piloto del Módulo Lunar, llamado Snoopy. Nació el 14 de marzo de 1934 en Chicago, estudió ingeniería eléctrica en la Universidad Purdue y fue piloto de la Marina. En junio de 1966 voló con Stafford en Gemini 9A, donde realizó una caminata espacial de más de dos horas muy agotadora: su visor se empañaba y su ritmo cardíaco subió mucho. Esa experiencia ayudó a la NASA a mejorar los entrenamientos y los apoyos para las manos fuera de la nave.",
      "Los tres astronautas de Apollo 10 ya habían volado en el programa Gemini, así que todos tenían experiencia en el espacio. Stafford y Cernan habían volado juntos en Gemini 9A y se conocían bien. Durante el entrenamiento, pasaron cientos de horas en los simuladores del Módulo Lunar y del Módulo de Mando en Houston y en Florida. Practicaron especialmente la separación de las naves, el descenso, la maniobra de abortar y la reunión en órbita, porque esos pasos eran el centro de la misión.",
      "Después de Apollo 10, los tres siguieron volando. John Young comandó Apollo 16 en abril de 1972, caminó sobre la Luna y en abril de 1981 comandó el primer vuelo del transbordador espacial, el STS-1. Eugene Cernan comandó Apollo 17 en diciembre de 1972 y fue la última persona en caminar sobre la Luna. Thomas Stafford comandó en julio de 1975 la misión Apollo-Soyuz, en la que una nave estadounidense y una soviética se acoplaron en órbita por primera vez."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "John Young y Eugene Cernan son dos de las tres únicas personas que han viajado dos veces hasta la Luna. La tercera es James Lovell, de Apollo 8 y Apollo 13. Young y Cernan además caminaron sobre la Luna en su segundo viaje. Young voló al espacio seis veces en total, en los programas Gemini, Apollo y del transbordador espacial." },
      { label: "Dato Científico", icon: "atom", text: "Cuando John Young quedó solo en órbita, el Módulo de Mando funcionaba con tres tripulantes como diseño, pero podía ser controlado por una sola persona. Young tenía que navegar, vigilar los sistemas, tomar fotografías y estar listo para ir a rescatar al Módulo Lunar si sus motores fallaban. Para eso tenía programada una maniobra de rescate con su propio motor principal." }
    ],
    fact: "Durante Gemini 3, en 1965, John Young llevó a escondidas un sándwich de carne en conserva y se lo ofreció a Virgil Grissom en pleno vuelo. Las migas podían flotar y meterse en los equipos, así que la NASA recibió críticas del Congreso de Estados Unidos. Después del incidente, las reglas sobre qué objetos personales podían llevar los astronautas se volvieron mucho más estrictas.",
  },
  {
    id: "snoopy-charlie-brown",
    bannerImage: '/assets/apollo10/infographic_m1/banner_snoopy-charlie-brown.webp',
    bannerCaption: "El Módulo Lunar se llamó Snoopy y el Módulo de Mando Charlie Brown, por los personajes de Peanuts de Charles M. Schulz.",
    title: "Snoopy y Charlie Brown en el Espacio",
    color: '#3F5E5A',
    btnImage: '/assets/apollo10/infographic_m1/btn_snoopy-charlie-brown.webp',
    image: '/assets/apollo10/infographic_m1/hero_snoopy-charlie-brown.webp',
    content: [
      "Cuando dos naves tripuladas vuelan al mismo tiempo, cada una necesita un nombre propio para las comunicaciones por radio. Por eso, a partir de Apollo 9, la NASA permitió que las tripulaciones eligieran indicativos para sus naves. La tripulación de Apollo 10 escogió dos personajes de la tira cómica Peanuts, creada por el dibujante estadounidense Charles M. Schulz en 1950: el Módulo Lunar se llamaría Snoopy y el Módulo de Mando, Charlie Brown.",
      "La elección no era solo por diversión. Snoopy ya era la mascota de seguridad de la NASA. En 1968, los astronautas crearon el Premio Snoopy de Plata, un pequeño alfiler de plata con la figura de Snoopy con casco espacial, diseñado por Schulz. Los astronautas lo entregan en persona a trabajadores e ingenieros que hacen contribuciones destacadas a la seguridad de los vuelos. Además, el Módulo Lunar iba a «husmear» el sitio de alunizaje, algo que el perro Snoopy hacía en la tira cómica.",
      "Charles Schulz apoyó con entusiasmo la misión. Durante esos meses dibujó varias tiras de Peanuts en las que Snoopy aparecía como astronauta, y los personajes se convirtieron en parte de la imagen de Apollo 10. Antes del lanzamiento, los técnicos del Centro Espacial Kennedy colocaron dibujos de Snoopy en distintos equipos. Hasta el gorro de comunicaciones que usaban los astronautas bajo el casco, de color blanco y negro, recibió el apodo de «gorro de Snoopy».",
      "En la misión, los nombres también ayudaron al público a seguir lo que pasaba. Cuando las dos naves se separaron en órbita lunar, los periódicos y las cadenas de televisión explicaban que Snoopy bajaba hacia la Luna mientras Charlie Brown esperaba arriba. Era una forma sencilla de entender una maniobra técnica muy complicada. Para los niños de 1969, escuchar a los astronautas llamar «Snoopy» por radio hacía la misión mucho más cercana.",
      "Las dos naves tuvieron destinos distintos. El Módulo de Mando Charlie Brown regresó a la Tierra y hoy se exhibe en el Museo de Ciencias de Londres, prestado por el Instituto Smithsonian de Estados Unidos. La etapa de descenso de Snoopy se quedó en órbita lunar y con el tiempo cayó sobre la Luna. La etapa de ascenso, después de reunirse con Charlie Brown, fue enviada con su propio motor a una órbita alrededor del Sol, donde probablemente sigue viajando."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La etapa de ascenso de Snoopy es la única parte de un Módulo Lunar que voló con tripulación y que, según se cree, sigue intacta en el espacio. En 2019, un grupo de astrónomos aficionados liderado por el británico Nick Howes propuso que un pequeño objeto llamado 2018 AP4 podría ser Snoopy. La identificación no está confirmada y harían falta más observaciones para comprobarla." },
      { label: "Dato Científico", icon: "atom", text: "Para enviar la etapa de ascenso de Snoopy a una órbita alrededor del Sol, los controladores encendieron su motor hasta agotar el combustible. Eso le dio velocidad suficiente para escapar de la gravedad de la Luna y de la Tierra. Desde entonces, Snoopy gira alrededor del Sol en una órbita parecida a la de nuestro planeta, como un pequeño asteroide fabricado por humanos." }
    ],
    fact: "Desde 1968, los astronautas de la NASA han entregado el Premio Snoopy de Plata a miles de trabajadores de la agencia y de empresas contratistas. Cada alfiler ha volado al espacio en una misión antes de ser entregado. El premio sigue vigente hoy y es uno de los reconocimientos más apreciados por el personal que trabaja en la seguridad de los vuelos espaciales.",
  },
  {
    id: "lanzamiento-mayo",
    bannerImage: '/assets/apollo10/infographic_m1/banner_lanzamiento-mayo.webp',
    bannerCaption: "Apollo 10 despegó el 18 de mayo de 1969 desde la plataforma 39B y completó 31 órbitas alrededor de la Luna.",
    title: "Despegue y 31 Órbitas Lunares",
    color: '#6B5B3E',
    btnImage: '/assets/apollo10/infographic_m1/btn_lanzamiento-mayo.webp',
    image: '/assets/apollo10/infographic_m1/hero_lanzamiento-mayo.webp',
    content: [
      "Apollo 10 despegó el 18 de mayo de 1969 a las 12:49 del mediodía, hora de Florida, desde el Centro Espacial Kennedy. Fue el único lanzamiento de un Saturn V desde la plataforma 39B; todos los demás usaron la plataforma 39A. La NASA eligió 39B porque 39A todavía se estaba preparando para Apollo 11. Era el cuarto vuelo tripulado del programa Apollo y la segunda misión tripulada hacia la Luna, cinco meses después de Apollo 8.",
      "Después de casi dos vueltas en órbita terrestre, la tercera etapa del Saturn V se encendió y envió a la nave hacia la Luna. Poco después, John Young separó el Módulo de Mando Charlie Brown, lo giró y lo acopló con el Módulo Lunar Snoopy, que viajaba guardado dentro de un compartimento en la parte superior del cohete. Luego extrajo el Módulo Lunar de ese compartimento. Esta maniobra, llamada transposición y acoplamiento, se había practicado en Apollo 9, pero no en un viaje lunar.",
      "Apollo 10 llevó la primera cámara de televisión a color usada en una misión espacial tripulada, fabricada por la empresa Westinghouse. Hasta entonces, las transmisiones desde el espacio habían sido en blanco y negro. Por primera vez, el público pudo ver en sus pantallas el azul de los océanos de la Tierra, el blanco de las nubes y el gris de la superficie lunar. Las transmisiones a color fueron muy populares y se repitieron en las siguientes misiones.",
      "El viaje hasta la Luna duró unos tres días. El 21 de mayo, detrás de la Luna y sin comunicación con la Tierra, el motor principal del Módulo de Servicio se encendió para frenar la nave y colocarla en órbita lunar. Durante la misión, Apollo 10 completó 31 órbitas alrededor de la Luna, más que Apollo 8, y pasó unas 61 horas y media en órbita lunar. La tripulación aprovechó ese tiempo para observar y fotografiar la superficie.",
      "Antes de bajar con Snoopy, Stafford y Cernan pasaron por el túnel que unía las dos naves para revisar todos los sistemas del Módulo Lunar. Encontraron que el acople entre las naves se había desplazado ligeramente durante el viaje, pero los ingenieros en Houston calcularon que estaba dentro de los límites seguros. También hubo un pequeño problema con un material aislante que se desprendió y flotó por el túnel. Ninguno de esos detalles impidió continuar con el plan."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La cámara a color de Apollo 10 funcionaba con un sistema de disco giratorio con filtros de colores rojo, verde y azul. La cámara captaba una imagen tras otra con cada filtro, y en la Tierra los equipos combinaban las señales para formar la imagen a color. Era una técnica distinta a la de los televisores a color de la época, pero resultaba más ligera." },
      { label: "Dato Científico", icon: "atom", text: "Los colores de las imágenes de la Tierra desde el espacio tienen una explicación física. Los océanos se ven azules porque el agua absorbe más la luz roja que la azul. La atmósfera también dispersa más la luz azul, por eso la Tierra tiene un borde azulado visto desde lejos. La Luna, sin atmósfera ni agua líquida, se ve gris porque su suelo está hecho de rocas y polvo volcánico." }
    ],
    fact: "Las plataformas 39A y 39B del Centro Espacial Kennedy se construyeron para el Saturn V y después se adaptaron para el transbordador espacial. La plataforma 39B lanzó también misiones Skylab y Apollo-Soyuz con cohetes Saturn IB. En noviembre de 2022, desde 39B despegó el cohete SLS de la misión Artemis I, que envió la nave Orion sin tripulación alrededor de la Luna.",
  },
  {
    id: "descenso-15-km",
    bannerImage: '/assets/apollo10/infographic_m1/banner_descenso-15-km.webp',
    bannerCaption: "El 22 de mayo de 1969 Snoopy bajó a unos 15 km de la superficie y sobrevoló el sitio de alunizaje de Apollo 11.",
    title: "Snoopy a 15 Kilómetros de la Luna",
    color: '#2F4858',
    btnImage: '/assets/apollo10/infographic_m1/btn_descenso-15-km.webp',
    image: '/assets/apollo10/infographic_m1/hero_descenso-15-km.webp',
    content: [
      "El 22 de mayo de 1969, Thomas Stafford y Eugene Cernan entraron en Snoopy y separaron el Módulo Lunar de Charlie Brown, donde John Young se quedó solo. Después de comprobar que todo funcionaba, encendieron el motor de descenso del Módulo Lunar para bajar su órbita. Era la primera vez que un Módulo Lunar volaba cerca de la Luna con personas dentro. En Houston, los controladores seguían las dos naves a la vez, una situación que nunca se había vivido.",
      "Snoopy bajó hasta unos 15 kilómetros sobre la superficie lunar. Las fuentes dan cifras entre 14.4 y 15.6 kilómetros según cómo se mida, pero en cualquier caso fue lo más cerca que habían estado los seres humanos de la Luna sin tocarla. A esa altura, los astronautas veían con claridad cráteres, rocas y montañas. Cernan describió por radio el paisaje con entusiasmo. Volaban apenas un poco más alto que los aviones comerciales sobre la Tierra, que suelen viajar a entre 10 y 12 kilómetros de altura.",
      "El objetivo principal era sobrevolar el sitio de alunizaje elegido para Apollo 11, en el suroeste del Mar de la Tranquilidad. Stafford y Cernan tomaron fotografías y película del terreno con la misma iluminación solar que encontraría la siguiente tripulación. También probaron el radar de aterrizaje del Módulo Lunar, que medía la altura y la velocidad respecto a la superficie. Los datos confirmaron que el radar funcionaba bien en el entorno de la Luna.",
      "La gravedad de la Luna no es igual en todas partes. En 1968, los científicos Paul Muller y William Sjogren, del Laboratorio de Propulsión a Chorro de la NASA, descubrieron zonas con más masa bajo algunos mares lunares, a las que llamaron mascones, de «concentraciones de masa». Esas zonas atraen un poco más a las naves y modifican sus órbitas. Los datos de seguimiento de Apollo 10 ayudaron a medir ese efecto y a calcular con más precisión la trayectoria de descenso de Apollo 11.",
      "Mientras tanto, John Young pilotaba Charlie Brown a unos 110 kilómetros de altura. Era la primera vez que una persona volaba completamente sola alrededor de la Luna. En cada vuelta pasaba unos 45 minutos detrás de la Luna sin poder hablar con nadie, ni con la Tierra ni con sus compañeros. Young vigilaba los sistemas, tomaba fotografías y seguía con el sextante la posición de Snoopy, listo para ir a buscarlo si el Módulo Lunar tenía una falla."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante el descenso, Cernan y Stafford hablaron con mucho entusiasmo por radio sobre lo que veían, y algunas de sus palabras no eran muy formales. Las transmisiones se escuchaban en vivo en todo el mundo, así que la NASA recibió algunas quejas. Más tarde, Cernan contó con humor que sabían que las grabaciones quedarían para la historia, pero que la emoción del momento fue más fuerte." },
      { label: "Dato Científico", icon: "atom", text: "Los mascones se forman cuando un asteroide grande abre una cuenca en la Luna y después la lava densa del interior la rellena. Esa roca volcánica, más pesada que la corteza que la rodea, produce un exceso de gravedad. Las sondas GRAIL de la NASA, en 2012, midieron el campo gravitatorio lunar con gran detalle y confirmaron la estructura de muchos mascones." }
    ],
    fact: "Las fotografías y la película tomadas desde Snoopy fueron estudiadas por los cartógrafos y por la tripulación de Apollo 11. Neil Armstrong y Buzz Aldrin las usaron para memorizar el terreno que verían durante su descenso. Aun así, el 20 de julio de 1969 el Eagle se pasó del punto previsto, y Armstrong tuvo que pilotar manualmente para evitar un campo de rocas grandes.",
  },
  {
    id: "giro-y-reunion",
    bannerImage: '/assets/apollo10/infographic_m1/banner_giro-y-reunion.webp',
    bannerCaption: "Un interruptor en posición equivocada hizo girar a Snoopy sin control; Stafford lo estabilizó en segundos.",
    title: "El Giro de Snoopy y la Reunión",
    color: '#7A4E3B',
    btnImage: '/assets/apollo10/infographic_m1/btn_giro-y-reunion.webp',
    image: '/assets/apollo10/infographic_m1/hero_giro-y-reunion.webp',
    content: [
      "Después del vuelo bajo, llegó el momento de separar las dos etapas de Snoopy. La etapa de descenso, con sus patas y su motor de bajada, debía quedarse atrás. La etapa de ascenso, donde iban los astronautas, encendería su propio motor para subir y reunirse con Charlie Brown. Era la misma maniobra que haría Apollo 11 al despegar de la Luna. Justo en el momento de la separación, el Módulo Lunar empezó a girar y a sacudirse de forma descontrolada.",
      "Durante unos segundos, Snoopy giró en varias direcciones mientras Stafford y Cernan veían pasar alternadamente la Luna y el espacio por las ventanillas. Cernan reaccionó con una exclamación que quedó grabada en la transmisión. Stafford tomó el control manual del Módulo Lunar, desconectó el sistema automático y logró estabilizarlo. Después contó que temió que el módulo pudiera girar demasiado rápido. Los dos astronautas mantuvieron la calma y siguieron con los procedimientos.",
      "La investigación posterior mostró que el problema fue un interruptor en una posición equivocada. El interruptor controlaba el modo del sistema de guía de emergencia del Módulo Lunar. Por un error en la lista de procedimientos, quedó en el modo automático en lugar del modo que mantenía fija la orientación. En automático, el sistema intentó apuntar hacia Charlie Brown con su radar en el momento menos oportuno. No fue una falla del equipo, sino de coordinación en la lista de pasos.",
      "Una vez estabilizada, la etapa de ascenso encendió su motor y comenzó la persecución de Charlie Brown. Stafford y Cernan siguieron los mismos pasos que más tarde usarían Armstrong y Aldrin: varias maniobras de motor para ajustar la órbita, mediciones con radar y, al final, un acercamiento lento. Unas ocho horas después de haberse separado, Snoopy se acopló de nuevo con Charlie Brown. Los tres astronautas volvieron a reunirse en el Módulo de Mando.",
      "¿Por qué la NASA no dejó que Apollo 10 aterrizara? El Módulo Lunar de esta misión fue uno de los primeros que se fabricaron y pesaba más que el de Apollo 11. Con ese peso, no habría podido despegar de la superficie y reunirse con el Módulo de Mando de forma segura. Además, la etapa de ascenso llevaba solo parte de su combustible, la cantidad que tendría después de un despegue lunar, y varios procedimientos y programas para el aterrizaje aún no estaban terminados."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Una historia popular dice que la NASA cargó poco combustible en Snoopy para que Stafford y Cernan no tuvieran la tentación de aterrizar. En realidad, la carga parcial tenía un objetivo técnico: que la etapa de ascenso pesara lo mismo que pesaría después de despegar desde la Luna, para practicar la reunión en condiciones reales. El propio Cernan comentó la anécdota con humor en sus memorias." },
      { label: "Dato Científico", icon: "atom", text: "En el espacio no hay aire que frene un giro. Si una nave empieza a rotar, seguirá rotando hasta que una fuerza la detenga, según la primera ley de Newton, la ley de la inercia. Por eso el Módulo Lunar tenía 16 pequeños propulsores en grupos de cuatro, que disparaban chorros cortos de gas en direcciones opuestas para frenar y controlar la orientación." }
    ],
    fact: "El incidente del giro de Snoopy enseñó a la NASA una lección importante sobre las listas de procedimientos. Después de Apollo 10, los ingenieros revisaron con más cuidado qué interruptores debía mover cada astronauta en cada paso, para evitar que dos personas cambiaran el mismo control. En Apollo 11, la separación de etapas en la Luna ocurrió sin problemas.",
  },
  {
    id: "record-velocidad",
    bannerImage: '/assets/apollo10/infographic_m1/banner_record-velocidad.webp',
    bannerCaption: "Al volver el 26 de mayo de 1969, Apollo 10 alcanzó 39,897 km/h, la mayor velocidad registrada por seres humanos.",
    title: "Récord de Velocidad y Regreso",
    color: '#5A4E6E',
    btnImage: '/assets/apollo10/infographic_m1/btn_record-velocidad.webp',
    image: '/assets/apollo10/infographic_m1/hero_record-velocidad.webp',
    content: [
      "Después de la reunión, la tripulación siguió orbitando la Luna durante más de un día para completar fotografías y pruebas de navegación. El 24 de mayo de 1969, detrás de la Luna, el motor principal del Módulo de Servicio se encendió para iniciar el regreso. El viaje de vuelta duró unos dos días y medio. Durante ese tiempo, la tripulación transmitió más imágenes a color de la Tierra, que se veía cada vez más grande por las ventanillas.",
      "El 26 de mayo de 1969, la cápsula Charlie Brown entró en la atmósfera terrestre. Gracias a la trayectoria de regreso y a la atracción de la Tierra, alcanzó una velocidad de unos 39,897 kilómetros por hora, cerca de 11 kilómetros cada segundo. Es la mayor velocidad a la que han viajado seres humanos, según los registros de la NASA y del libro Guinness de los récords. Más de cinco décadas después, ninguna nave tripulada ha superado esa marca.",
      "La cápsula amerizó en el océano Pacífico, cerca de la isla de Samoa Americana, y la tripulación fue recogida por el portaaviones USS Princeton. La misión duró 8 días y unos minutos. Los informes técnicos posteriores concluyeron que casi todos los sistemas habían funcionado según lo previsto. Con los resultados de Apollo 10, la NASA confirmó que el sistema estaba listo y mantuvo la fecha de lanzamiento de Apollo 11 para el 16 de julio de 1969.",
      "Apollo 10 dejó una lista larga de aportes para el alunizaje. Probó el Módulo Lunar en el entorno de la Luna, la separación y reunión de dos naves tripuladas en órbita lunar, el radar de aterrizaje, las comunicaciones con dos naves a la vez y la navegación con mascones. También mostró qué podía salir mal, como en el giro de Snoopy, y permitió corregirlo. Cada problema resuelto en mayo fue un riesgo menos para Armstrong, Aldrin y Collins en julio.",
      "Para muchos historiadores, Apollo 10 es una de las misiones menos recordadas por el público, porque quedó entre el viaje alrededor de la Luna de Apollo 8 y el alunizaje de Apollo 11. Sin embargo, sus tripulantes y los ingenieros de la NASA la consideraron esencial. Sin ese ensayo general, el primer alunizaje habría tenido muchos más riesgos desconocidos. Apollo 10 demostró que la clave de la exploración espacial es probar cada paso antes de dar el siguiente."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Además del récord de velocidad, las misiones Apollo tienen otro récord: el de la mayor distancia de la Tierra alcanzada por seres humanos. Lo logró Apollo 13 en abril de 1970, cuando su trayectoria de emergencia la llevó detrás de la Luna, a unos 400,000 kilómetros de nuestro planeta. Ninguna tripulación ha viajado más lejos desde entonces." },
      { label: "Dato Científico", icon: "atom", text: "Una nave que cae desde la Luna hacia la Tierra gana velocidad durante todo el trayecto, como una pelota que rueda por una pendiente larga. La gravedad terrestre la acelera continuamente hasta que llega a la atmósfera a unos 11 kilómetros por segundo, cerca de la velocidad de escape de la Tierra. Pequeñas diferencias de trayectoria explican por qué Apollo 10 fue algo más rápida que otras misiones." }
    ],
    fact: "La velocidad de Apollo 10 al volver de la Luna, cerca de 40,000 kilómetros por hora, permitiría dar la vuelta a la Tierra por el ecuador en aproximadamente una hora. A esa velocidad, un viaje entre la Ciudad de México y Madrid, de unos 9,000 kilómetros, tomaría unos 14 minutos. Ningún avión fabricado por humanos se acerca a esa marca.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo10M1)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#3E4A61", "#4A5D73", "#3F5E5A", "#6B5B3E", "#2F4858", "#7A4E3B", "#5A4E6E"];
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
          <linearGradient id="gradApollo10M1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">APOLLO 10: TODO MENOS EL ALUNIZAJE</text>
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
          layoutId="activeDotApollo10M1"
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
export default function InteractiveInfographic_Apollo10M1() {
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
              🏆 ¡Piloto Snoopy! Completaste el ensayo general a 15 km de la superficie lunar.
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
