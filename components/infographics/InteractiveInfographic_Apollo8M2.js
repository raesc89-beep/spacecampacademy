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
  "Bilstein, Roger E. (1980). Stages to Saturn: A Technological History of the Apollo/Saturn Launch Vehicles. NASA SP-4206, NASA History Office.",
  "Mindell, David A. (2008). Digital Apollo: Human and Machine in Spaceflight. Cambridge, MA: MIT Press.",
  "de Monchaux, Nicholas (2011). Spacesuit: Fashioning Apollo. Cambridge, MA: MIT Press.",
  "Woods, W. David (2008). How Apollo Flew to the Moon. Chichester: Springer-Praxis.",
  "Brooks, Courtney G.; Grimwood, James M.; Swenson, Loyd S. (1979). Chariots for Apollo: A History of Manned Lunar Spacecraft. NASA SP-4205, NASA History Office.",
  "Poole, Robert (2008). Earthrise: How Man First Saw the Earth. New Haven: Yale University Press.",
  "Murray, Charles; Cox, Catherine Bly (1989). Apollo: The Race to the Moon. Nueva York: Simon & Schuster."
];

const INFOGRAPHIC_NODES = [
  {
    id: "cohete-saturn-v",
    bannerImage: '/assets/apollo8/infographic_m2/banner_cohete-saturn-v.webp',
    bannerCaption: "El Saturn V, desarrollado por el equipo de Wernher von Braun, medía unos 111 metros y tenía tres etapas.",
    title: "El Saturn V de Wernher von Braun",
    color: '#3E4A61',
    btnImage: '/assets/apollo8/infographic_m2/btn_cohete-saturn-v.webp',
    image: '/assets/apollo8/infographic_m2/hero_cohete-saturn-v.webp',
    content: [
      "El cohete que lanzó Apollo 8 fue el Saturn V, desarrollado bajo la dirección del ingeniero Wernher von Braun en el Centro Marshall de Vuelos Espaciales de la NASA, en Huntsville, Alabama. Von Braun había nacido en Alemania en 1912 y llegó a Estados Unidos al terminar la Segunda Guerra Mundial. Allí dirigió el equipo que lanzó el primer satélite estadounidense, el Explorer 1, en 1958, y después los cohetes del programa Apollo. Su equipo coordinó el trabajo de varias empresas y miles de ingenieros.",
      "El Saturn V medía unos 111 metros de altura, más que la Estatua de la Libertad con su pedestal, y al despegar pesaba cerca de 2,900 toneladas, casi todo combustible. Tenía tres etapas que se encendían una tras otra y se desprendían al vaciarse. Cada etapa fue fabricada por una empresa distinta: la primera, S-IC, por Boeing; la segunda, S-II, por North American Aviation; y la tercera, S-IVB, por Douglas Aircraft. Encima iba la nave Apollo con su torre de escape.",
      "La primera etapa tenía cinco motores F-1, los motores de cámara única más potentes que se han usado en un vuelo. Juntos producían unos 34 millones de newtons de empuje, quemando queroseno refinado llamado RP-1 y oxígeno líquido. Cada segundo, los cinco motores consumían alrededor de 13 toneladas de propelente. La etapa funcionaba unos dos minutos y medio y llevaba al cohete a más de 60 kilómetros de altura antes de separarse y caer al océano Atlántico.",
      "La segunda y la tercera etapa usaban motores J-2, que quemaban hidrógeno líquido y oxígeno líquido. El hidrógeno debe mantenerse a unos 253 grados bajo cero para estar en estado líquido, así que los tanques tenían aislamiento especial. Este combustible da más energía por kilogramo que el queroseno, aunque ocupa mucho más volumen. La tercera etapa era la única que podía apagarse y volver a encenderse en el espacio, algo esencial para salir de la órbita terrestre hacia la Luna.",
      "Apollo 8 fue el tercer lanzamiento de un Saturn V y el primero con tripulación. Los dos vuelos anteriores, Apollo 4 en noviembre de 1967 y Apollo 6 en abril de 1968, fueron pruebas sin personas. El Saturn V voló 13 veces entre 1967 y 1973, incluido el lanzamiento de la estación espacial Skylab, y nunca perdió una carga útil. Hoy se pueden ver ejemplares completos en el Centro Espacial Kennedy en Florida, el Centro Espacial Johnson en Houston y el Centro Espacial y de Cohetes de Estados Unidos en Huntsville."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Saturn V se armaba en posición vertical dentro del Edificio de Ensamblaje de Vehículos del Centro Espacial Kennedy, uno de los edificios de un solo piso más grandes del mundo, con unos 160 metros de altura. Después, un vehículo oruga gigante lo llevaba hasta la plataforma de lanzamiento, a unos 5 kilómetros, a menos de 2 kilómetros por hora. El trayecto podía tardar varias horas." },
      { label: "Dato Científico", icon: "atom", text: "Los cohetes funcionan según la tercera ley de Newton: a toda acción corresponde una reacción igual y opuesta. Los motores expulsan gases calientes hacia abajo a gran velocidad, y esos gases empujan el cohete hacia arriba. Usar etapas permite deshacerse de tanques vacíos y motores pesados durante el ascenso, de modo que el cohete restante es más ligero y acelera con mayor facilidad." }
    ],
    fact: "El motor F-1 fue desarrollado por la empresa Rocketdyne. Cada uno medía unos 5.6 metros de alto y producía cerca de 6.8 millones de newtons de empuje. En 2013, un equipo financiado por Jeff Bezos recuperó del fondo del océano Atlántico partes de motores F-1 de las misiones Apollo; algunas piezas se identificaron como pertenecientes al cohete de Apollo 11 y hoy se exhiben en museos.",
  },
  {
    id: "nave-mando-servicio",
    bannerImage: '/assets/apollo8/infographic_m2/banner_nave-mando-servicio.webp',
    bannerCaption: "La tripulación vivió seis días en el Módulo de Mando, una cápsula cónica de unos 3.9 metros de diámetro.",
    title: "El Módulo de Mando y Servicio",
    color: '#4A5D73',
    btnImage: '/assets/apollo8/infographic_m2/btn_nave-mando-servicio.webp',
    image: '/assets/apollo8/infographic_m2/hero_nave-mando-servicio.webp',
    content: [
      "La nave de Apollo 8 tenía dos partes unidas: el Módulo de Mando y el Módulo de Servicio, ambos fabricados por North American Aviation en California. El Módulo de Mando era una cápsula en forma de cono, de unos 3.9 metros de diámetro en la base y unos 3.5 metros de altura. Dentro, los tres astronautas tenían un espacio habitable de poco más de 6 metros cúbicos, similar al interior de una camioneta. Era la única parte de toda la nave que regresaba a la Tierra.",
      "El Módulo de Servicio era un cilindro detrás de la cápsula. Llevaba el motor principal, llamado Sistema de Propulsión de Servicio, que daba unos 91,000 newtons de empuje. Ese motor usaba propelentes hipergólicos, dos sustancias que se encienden solas al tocarse, sin necesidad de chispa. Era una elección de seguridad: el encendido detrás de la Luna dependía de que el motor arrancara siempre. En Apollo 8, este motor se usó para entrar en órbita lunar y para salir de ella.",
      "La electricidad venía de tres pilas de combustible, que combinaban hidrógeno y oxígeno para producir corriente eléctrica. Como resultado de esa reacción química quedaba agua, que los astronautas usaban para beber y para preparar la comida. Los tanques de oxígeno del Módulo de Servicio también alimentaban la cabina. Durante el vuelo, la cabina tenía oxígeno puro a una presión de unos 5 libras por pulgada cuadrada, cerca de un tercio de la presión del aire al nivel del mar.",
      "Al respirar, los astronautas producían dióxido de carbono, un gas que en grandes cantidades es peligroso. Para eliminarlo, la nave usaba cartuchos con hidróxido de litio, una sustancia que atrapa el dióxido de carbono del aire. Los cartuchos se cambiaban periódicamente. Un sistema de ventiladores movía el aire por la cabina, porque sin gravedad el aire caliente no sube y el dióxido de carbono podía acumularse alrededor de la cara de una persona dormida.",
      "La comida de Apollo 8 era sobre todo liofilizada: alimentos congelados y secados al vacío, que se rehidrataban con agua de una pistola especial. También había bocados pequeños cubiertos con una capa para que no soltaran migas. En Navidad, la tripulación encontró una comida especial preparada por el equipo de alimentación: pavo con salsa en una bolsa termoestabilizada, que no necesitaba agua, y salsa de arándanos. Fue una de las primeras veces que se probaron este tipo de bolsas en el espacio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Módulo de Mando de Apollo 8 se conserva en el Museo de Ciencia e Industria de Chicago, Illinois. Los visitantes pueden ver la cápsula con las marcas oscuras que dejó el calor del reingreso en su escudo térmico. Es una de las pocas naves que han viajado hasta la Luna y han regresado, y fue la primera en llevar personas a la órbita lunar." },
      { label: "Dato Científico", icon: "atom", text: "Una pila de combustible funciona al revés que la electrólisis. En la electrólisis se usa electricidad para separar el agua en hidrógeno y oxígeno. En la pila de combustible, el hidrógeno y el oxígeno se combinan sobre electrodos y liberan electrones que forman una corriente eléctrica. El único residuo es agua pura, por eso resultaba ideal para una nave con espacio y peso limitados." }
    ],
    fact: "Los tanques de oxígeno del Módulo de Servicio fueron protagonistas de Apollo 13 en abril de 1970. Una falla eléctrica en uno de ellos provocó una explosión que dejó a la nave sin la mayor parte de su oxígeno y su electricidad. La tripulación sobrevivió usando el Módulo Lunar como refugio, algo que no habría sido posible en Apollo 8, que viajó sin Módulo Lunar.",
  },
  {
    id: "traje-a7l",
    bannerImage: '/assets/apollo8/infographic_m2/banner_traje-a7l.webp',
    bannerCaption: "Los trajes A7L se fabricaron en Dover, Delaware, y se describen con hasta 21 capas de materiales distintos.",
    title: "El Traje Espacial A7L",
    color: '#5A4E6E',
    btnImage: '/assets/apollo8/infographic_m2/btn_traje-a7l.webp',
    image: '/assets/apollo8/infographic_m2/hero_traje-a7l.webp',
    content: [
      "Los astronautas de Apollo 8 usaron el traje espacial A7L, fabricado por la empresa ILC Industries en Dover, Delaware. ILC era conocida antes por fabricar sostenes y fajas de la marca Playtex, y por eso tenía costureras con mucha experiencia en telas elásticas y costuras precisas. Esas trabajadoras cosieron a mano piezas con tolerancias de apenas fracciones de milímetro, porque un error en una costura podía causar una fuga de aire peligrosa.",
      "El traje A7L completo se describe en las fuentes de la NASA y de museos con hasta 21 capas de materiales diferentes. La capa interior tenía tubos de agua para enfriar el cuerpo. Después venía una vejiga de goma que mantenía la presión, una capa de tela que le daba forma y varias capas de película aluminizada que reflejaban el calor. Por fuera había una cubierta de tela Beta, hecha de fibra de vidrio recubierta de teflón, que no se quema con facilidad.",
      "Un traje presurizado tiende a inflarse como un globo y a ponerse rígido. Para que los astronautas pudieran doblar los brazos, las piernas y los dedos, los diseñadores usaron articulaciones de goma moldeada parecidas a un acordeón, especialmente en los codos, las rodillas y los hombros. El traje se mantenía a unos 3.7 libras por pulgada cuadrada de presión, suficiente para respirar oxígeno puro sin que el cuerpo sufriera, y permitía moverse con menos esfuerzo que una presión más alta.",
      "En Apollo 8 no hubo caminatas espaciales, así que los trajes se usaron sobre todo durante el despegue y el regreso a la Tierra, cuando el riesgo de una fuga de la cabina era mayor. Durante la mayor parte del viaje, los astronautas se quitaron los trajes y vistieron overoles de vuelo, más cómodos. Guardar tres trajes en una cabina tan pequeña no era fácil, y los astronautas tenían que ayudarse unos a otros para ponérselos y quitárselos.",
      "Los trajes A7L evolucionaron durante el programa Apollo. Las versiones usadas en la superficie de la Luna, desde Apollo 11, llevaban además una mochila con oxígeno y sistema de enfriamiento, botas especiales y un casco con visera dorada para filtrar la luz solar. A partir de Apollo 15, el modelo A7LB permitió más movilidad en la cintura para sentarse en el vehículo lunar. Algunos de estos trajes se exhiben hoy en el Museo Nacional del Aire y el Espacio, en Washington D. C."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Cada traje A7L se fabricaba a la medida de un astronauta específico, tomando medidas detalladas de su cuerpo. Cada astronauta tenía varios trajes: uno para entrenar, uno para el vuelo y otro de respaldo. Las costureras de ILC Industries trabajaban con máquinas de coser comunes y sus manos, sin computadoras, y su trabajo fue revisado capa por capa por inspectores de la NASA." },
      { label: "Dato Científico", icon: "atom", text: "Las películas aluminizadas del traje funcionan como un espejo para la radiación infrarroja, es decir, el calor. Varias capas delgadas separadas reducen mucho el paso de calor, porque en el vacío no hay aire que lo transporte por convección. Es el mismo principio de las mantas térmicas plateadas que hoy se usan en emergencias y en carreras de maratón." }
    ],
    fact: "La tela Beta, de fibra de vidrio recubierta de teflón, se desarrolló para el programa Apollo después del incendio del Apollo 1, porque los materiales anteriores ardían con facilidad en oxígeno puro. Años después, materiales derivados de esta tela se usaron en techos de estadios y edificios con cubiertas de membrana, porque resisten el fuego y el desgaste del clima.",
  },
  {
    id: "computadora-agc",
    bannerImage: '/assets/apollo8/infographic_m2/banner_computadora-agc.webp',
    bannerCaption: "La computadora AGC, diseñada en el MIT, usó circuitos integrados y memoria tejida a mano para guiar la nave.",
    title: "La Computadora de Guía Apollo",
    color: '#2F4858',
    btnImage: '/assets/apollo8/infographic_m2/btn_computadora-agc.webp',
    image: '/assets/apollo8/infographic_m2/hero_computadora-agc.webp',
    content: [
      "Para navegar hasta la Luna, la nave llevaba la Computadora de Guía Apollo, conocida como AGC. Fue diseñada en el Laboratorio de Instrumentación del Instituto Tecnológico de Massachusetts, el MIT, dirigido por Charles Stark Draper, y fabricada por la empresa Raytheon. Pesaba unos 32 kilogramos. Fue una de las primeras computadoras construidas con circuitos integrados, pequeños chips de silicio que contenían varios transistores. Cada computadora usaba unos 2,800 de estos chips.",
      "La memoria de la AGC era muy pequeña comparada con la de un teléfono actual. Tenía 2,048 palabras de memoria borrable, que funcionaba como memoria de trabajo, y 36,864 palabras de memoria fija para los programas. Una palabra tenía 16 bits. En total, su memoria equivalía a unos 72 kilobytes para programas y 4 kilobytes para datos. Un teléfono inteligente de hoy tiene millones de veces más memoria, pero la AGC hacía exactamente lo que se necesitaba para guiar la nave.",
      "La memoria fija se fabricaba con una técnica llamada memoria de cuerdas de núcleos. Trabajadoras de Raytheon, en Massachusetts, pasaban hilos de cobre a través de pequeños anillos magnéticos o por fuera de ellos: si el hilo pasaba por dentro, representaba un 1; si pasaba por fuera, un 0. Así, el programa quedaba literalmente tejido y no podía borrarse por accidente. Tejer el programa de una misión podía tardar semanas, por lo que el software tenía que estar terminado meses antes del vuelo.",
      "Los astronautas usaban la computadora con un teclado y una pantalla llamada DSKY. Escribían órdenes con un sistema de «verbos» y «sustantivos»: el verbo indicaba la acción, como mostrar o cargar datos, y el sustantivo indicaba sobre qué dato actuar, como la velocidad o la hora. El software fue desarrollado por equipos del MIT. Uno de ellos lo dirigió Margaret Hamilton, quien encabezó la división de software para las naves Apollo y ayudó a popularizar el término «ingeniería de software».",
      "Apollo 8 fue la primera misión en la que la AGC guió una nave tripulada hasta la Luna y de regreso. La computadora combinaba datos de una plataforma de giroscopios, que medían la orientación y la aceleración, con las mediciones de estrellas que hacía Lovell con el sextante. Desde Houston, los controladores también calculaban la posición con datos de radar y enviaban correcciones. Las dos fuentes coincidieron con mucha precisión durante el vuelo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las trabajadoras que tejían la memoria de cuerdas de núcleos eran en su mayoría mujeres con experiencia en la industria textil de Nueva Inglaterra. Los ingenieros del MIT las llamaban en broma «LOL», por las iniciales en inglés de «little old ladies», y por eso a esta memoria a veces se la llamó «memoria LOL». Su trabajo exigía una precisión total, porque un hilo mal colocado cambiaba el programa." },
      { label: "Dato Científico", icon: "atom", text: "Una plataforma inercial usa giroscopios, que mantienen su orientación en el espacio mientras giran rápido, y acelerómetros, que miden cambios de velocidad. Si conoces tu punto de partida y sumas todas las aceleraciones con el tiempo, puedes calcular dónde estás. Los pequeños errores se acumulan, por eso los astronautas corregían la plataforma observando estrellas con el sextante." }
    ],
    fact: "La computadora de Apollo 8 funcionaba a una frecuencia de reloj de 2.048 megahercios y podía hacer unas decenas de miles de operaciones por segundo. Su diseño influyó en la industria electrónica: la demanda del programa Apollo y de los misiles militares ayudó a que la fabricación de circuitos integrados creciera y se abaratara durante la década de 1960.",
  },
  {
    id: "comunicaciones-tierra",
    bannerImage: '/assets/apollo8/infographic_m2/banner_comunicaciones-tierra.webp',
    bannerCaption: "Antenas en California, España y Australia mantuvieron el contacto; la voz tardaba 1.3 segundos en llegar desde la Luna.",
    title: "Hablar con la Tierra a 384,000 Kilómetros",
    color: '#3F5E5A',
    btnImage: '/assets/apollo8/infographic_m2/btn_comunicaciones-tierra.webp',
    image: '/assets/apollo8/infographic_m2/hero_comunicaciones-tierra.webp',
    content: [
      "Para mantenerse en contacto con Apollo 8, la NASA usó la Red de Vuelos Espaciales Tripulados, apoyada por antenas de la Red del Espacio Profundo. Las estaciones principales para el viaje lunar tenían antenas de 26 metros de diámetro y estaban en tres lugares separados alrededor del planeta: Goldstone, en el desierto de California; las afueras de Madrid, en España; y Honeysuckle Creek, cerca de Canberra, en Australia. Esa separación aseguraba que siempre hubiera al menos una antena mirando hacia la nave.",
      "La Tierra gira una vez cada 24 horas. Si solo hubiera una antena, la nave quedaría fuera de su vista durante muchas horas al día. Con tres estaciones separadas unos 120 grados de longitud, cuando una antena perdía de vista la nave por la rotación del planeta, la siguiente ya podía captarla. Las estaciones enviaban las señales a Houston por cables, líneas telefónicas y satélites de comunicaciones, y así el contacto se mantenía de forma continua.",
      "La nave usaba un sistema llamado Banda S Unificada, que enviaba por una misma señal de radio la voz de los astronautas, los datos de los sistemas, la posición de la nave y las imágenes de televisión. Las ondas de radio viajan a la velocidad de la luz, unos 300,000 kilómetros por segundo. Como la Luna está a unos 384,000 kilómetros, cada mensaje tardaba cerca de 1.3 segundos en llegar. Entre una pregunta desde Houston y la respuesta de la tripulación pasaban más de dos segundos y medio.",
      "En el Centro de Control de Misión, en el entonces llamado Centro de Naves Tripuladas de Houston, decenas de controladores vigilaban pantallas con datos de la nave en tiempo real: presión de los tanques, temperatura, consumo eléctrico y estado de los motores. Solo una persona hablaba directamente con los astronautas: el comunicador o CAPCOM, que siempre era otro astronauta. En Apollo 8 cumplieron esa función, entre otros, Michael Collins, Ken Mattingly y Gerald Carr.",
      "Cada vez que Apollo 8 pasaba detrás de la Luna, la comunicación se cortaba por completo, porque las ondas de radio no atraviesan la roca. Esto ocurría en cada una de las 10 órbitas, durante unos 45 minutos. Los controladores sabían con precisión a qué hora debía reaparecer la señal. Si la nave no aparecía a tiempo, era una señal de problema. Los momentos más tensos fueron la entrada en órbita lunar y la salida, porque ambos encendidos del motor ocurrieron justo en esos periodos de silencio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Siete meses después de Apollo 8, la estación de Honeysuckle Creek en Australia transmitió al mundo las primeras imágenes de televisión de Neil Armstrong bajando por la escalera del Módulo Lunar de Apollo 11. España también tuvo un papel importante: la estación de Fresnedillas, cerca de Madrid, siguió las misiones Apollo y hoy cuenta con un pequeño museo dedicado a esa historia." },
      { label: "Dato Científico", icon: "atom", text: "El retraso de 1.3 segundos crece con la distancia. Una señal desde Marte tarda entre unos 3 y 22 minutos en llegar a la Tierra, según la posición de los planetas. Por eso los vehículos robóticos en Marte no pueden manejarse como un auto a control remoto: reciben instrucciones por adelantado y toman algunas decisiones por sí mismos con su propia computadora." }
    ],
    fact: "Los tripulantes de reserva de Apollo 8 fueron Neil Armstrong, Edwin «Buzz» Aldrin y Fred Haise. Siguiendo la rotación de tripulaciones de la NASA, Armstrong y Aldrin pasaron después a la tripulación principal de Apollo 11, junto con Michael Collins, que había sido comunicador en Apollo 8. Haise voló más tarde en Apollo 13 con James Lovell.",
  },
  {
    id: "reingreso-escudo",
    bannerImage: '/assets/apollo8/infographic_m2/banner_reingreso-escudo.webp',
    bannerCaption: "La cápsula entró en la atmósfera a casi 40,000 km/h y un escudo térmico ablativo la protegió del calor.",
    title: "Reingreso a Casi 40,000 km/h",
    color: '#7A4E3B',
    btnImage: '/assets/apollo8/infographic_m2/btn_reingreso-escudo.webp',
    image: '/assets/apollo8/infographic_m2/hero_reingreso-escudo.webp',
    content: [
      "El regreso a la Tierra fue una de las partes más peligrosas de la misión. Al volver de la Luna, la cápsula entró en la atmósfera a casi 40,000 kilómetros por hora, unos 11 kilómetros por segundo, mucho más rápido que una nave que regresa desde la órbita terrestre, que lo hace a unos 28,000 kilómetros por hora. Apollo 8 fue la primera nave tripulada que regresó a esa velocidad. Antes del reingreso, el Módulo de Mando se separó del Módulo de Servicio, que se quemó en la atmósfera.",
      "La cápsula debía entrar con un ángulo muy preciso, de alrededor de 6.5 grados respecto al horizonte, con un margen de aproximadamente un grado. Si el ángulo era demasiado empinado, la desaceleración y el calor serían excesivos para la nave y la tripulación. Si era demasiado plano, la cápsula podía rebotar en las capas altas de la atmósfera y alejarse. Los controladores de Houston calcularon correcciones de trayectoria durante el viaje de regreso para dar en ese corredor estrecho.",
      "Al chocar con el aire a esa velocidad, la parte delantera de la cápsula comprimió el aire frente a ella y lo calentó hasta formar una capa de plasma, gas tan caliente que sus átomos pierden electrones. La superficie del escudo alcanzó unos 2,700 grados Celsius, casi la mitad de la temperatura de la superficie del Sol. El plasma bloqueaba las ondas de radio, así que hubo varios minutos sin comunicación, un periodo conocido como apagón de radio. Los astronautas sintieron una fuerza de unas 6 a 7 veces su peso.",
      "Para sobrevivir al calor, la base de la cápsula tenía un escudo térmico ablativo, hecho de un material llamado Avcoat, desarrollado por la empresa Avco. Era una resina rellena dentro de una estructura de panal de fibra de vidrio. Al calentarse, la capa exterior se carbonizaba y se desprendía poco a poco, llevándose el calor con ella. Mientras el exterior ardía, el interior de la cabina se mantenía a una temperatura cómoda para los tres astronautas.",
      "Cuando la cápsula había frenado lo suficiente, a unos 7 kilómetros de altura se abrieron dos paracaídas pequeños de estabilización, llamados drogues. Después, a unos 3 kilómetros, se desplegaron tres paracaídas principales de unos 25 metros de diámetro cada uno. La cápsula tocó el agua del océano Pacífico a unos 35 kilómetros por hora el 27 de diciembre de 1968, antes del amanecer. Al salir el sol, helicópteros del portaaviones USS Yorktown recogieron a la tripulación."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El material Avcoat no quedó en el pasado. La NASA lo volvió a usar, con algunas mejoras, en el escudo térmico de la nave Orion del programa Artemis. En la misión Artemis I, en diciembre de 2022, Orion regresó de la Luna a casi 40,000 kilómetros por hora, igual que las cápsulas Apollo, y su escudo resistió el reingreso." },
      { label: "Dato Científico", icon: "atom", text: "La mayor parte del calor del reingreso no se produce por fricción, como mucha gente cree, sino por compresión. La cápsula empuja el aire tan rápido que este no puede apartarse y se comprime frente a ella en una onda de choque. Al comprimirse, el aire se calienta muchísimo, de forma parecida a como se calienta una bomba de bicicleta al inflar una llanta." }
    ],
    fact: "La cápsula de Apollo no caía como una piedra: su centro de gravedad estaba ligeramente desplazado, así que volaba inclinada y producía un poco de sustentación. Girando la cápsula con pequeños propulsores, la computadora podía dirigir esa sustentación hacia arriba, abajo o los lados para controlar la desaceleración y el punto de amerizaje, con una precisión de pocos kilómetros.",
  },
  {
    id: "camara-y-legado",
    bannerImage: '/assets/apollo8/infographic_m2/banner_camara-y-legado.webp',
    bannerCaption: "Una cámara Hasselblad captó Earthrise; unas 400,000 personas trabajaron en el programa Apollo en su momento de mayor actividad.",
    title: "La Cámara de Earthrise y 400,000 Personas",
    color: '#6B5B3E',
    btnImage: '/assets/apollo8/infographic_m2/btn_camara-y-legado.webp',
    image: '/assets/apollo8/infographic_m2/hero_camara-y-legado.webp',
    content: [
      "La fotografía Earthrise se tomó con una cámara Hasselblad 500 EL, fabricada en Suecia y modificada por la NASA para el espacio. Tenía un motor eléctrico que avanzaba la película de forma automática y usaba cargadores de película de 70 milímetros. William Anders usó un teleobjetivo de 250 milímetros y película a color Kodak Ektachrome. Las cámaras no tenían pantalla: nadie supo cómo había salido la foto hasta que la película se reveló en Houston después del regreso.",
      "En el espacio, las cámaras debían funcionar con temperaturas extremas y sin aire. Los técnicos retiraron algunas piezas y lubricantes que podían evaporarse en el vacío, y pintaron algunas cámaras de color plateado para reflejar la luz solar. Los astronautas practicaron mucho la fotografía en la Tierra, porque con guantes y en una cabina pequeña no era fácil cambiar los cargadores, ajustar la exposición y enfocar un paisaje que pasaba rápido bajo la nave.",
      "El programa Apollo fue uno de los proyectos técnicos más grandes de la historia. En su momento de mayor actividad, a mediados de la década de 1960, unas 400,000 personas trabajaban en él, en la NASA, en universidades y en unas 20,000 empresas y contratistas. En 1966, el presupuesto de la NASA llegó a ser cerca del 4.4 % de todo el gasto del gobierno federal de Estados Unidos. En total, el programa costó unos 25,000 millones de dólares de la época.",
      "Esas 400,000 personas hacían trabajos muy distintos. Había ingenieros que diseñaban motores, matemáticas que calculaban trayectorias, programadores, técnicos que soldaban tuberías, costureras que fabricaban trajes y paracaídas, cocineros que preparaban alimentos espaciales y operadores de radar en estaciones lejanas. Muchas de esas personas nunca conocieron a los astronautas, pero su trabajo fue revisado varias veces, porque una sola pieza defectuosa podía poner en riesgo toda una misión.",
      "Algunas tecnologías del programa Apollo y de la NASA de esa época encontraron usos en la vida diaria. Un sistema de purificación de agua con iones de plata, desarrollado para las naves Apollo, se adaptó después para piscinas y sistemas de agua. Herramientas inalámbricas se perfeccionaron a partir del taladro que Black & Decker diseñó para tomar muestras en la Luna. Y la experiencia en sistemas de soporte vital ayudó a crear equipos de respiración más ligeros para bomberos en la década de 1970."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En las misiones a la superficie lunar, los astronautas dejaron en la Luna varias cámaras Hasselblad para ahorrar peso y poder traer más rocas. Solo trajeron de vuelta los cargadores con película. Por eso hay más de diez cámaras Hasselblad abandonadas en distintos sitios de alunizaje del programa Apollo, desde Apollo 11 hasta Apollo 17." },
      { label: "Dato Científico", icon: "atom", text: "En Earthrise la Tierra aparece solo parcialmente iluminada, como una media luna gruesa. Esto ocurre por la misma razón que vemos fases en la Luna: desde la posición de la nave, solo una parte de la cara de la Tierra iluminada por el Sol estaba de frente. La zona oscura era el lado nocturno del planeta, donde en ese momento era de noche." }
    ],
    fact: "La NASA publica cada año una revista llamada Spinoff, que desde 1976 describe tecnologías creadas o mejoradas por la agencia que después se usan en la industria, la medicina y los hogares. Ha documentado más de 2,000 casos. Muchos no vienen del programa Apollo, sino de otras investigaciones de la NASA, por eso conviene revisar el origen de cada invento antes de atribuirlo a las misiones lunares.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo8M2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#3E4A61", "#4A5D73", "#5A4E6E", "#2F4858", "#3F5E5A", "#7A4E3B", "#6B5B3E"];
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
          <linearGradient id="gradApollo8M2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA TECNOLOGÍA DE APOLLO 8</text>
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
          layoutId="activeDotApollo8M2"
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
export default function InteractiveInfographic_Apollo8M2() {
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
              🏆 ¡Observador Terrestre! Conoces la tecnología que llevó a Apollo 8 a la Luna.
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
