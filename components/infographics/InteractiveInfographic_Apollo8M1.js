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
  "Zimmerman, Robert (1998). Genesis: The Story of Apollo 8. Nueva York: Four Walls Eight Windows.",
  "Kluger, Jeffrey (2017). Apollo 8: The Thrilling Story of the First Mission to the Moon. Nueva York: Henry Holt and Company.",
  "Chaikin, Andrew (1994). A Man on the Moon: The Voyages of the Apollo Astronauts. Nueva York: Viking.",
  "Brooks, Courtney G.; Grimwood, James M.; Swenson, Loyd S. (1979). Chariots for Apollo: A History of Manned Lunar Spacecraft. NASA SP-4205, NASA History Office.",
  "Orloff, Richard W. (2000). Apollo by the Numbers: A Statistical Reference. NASA SP-2000-4029, NASA History Division.",
  "Poole, Robert (2008). Earthrise: How Man First Saw the Earth. New Haven: Yale University Press.",
  "Borman, Frank; Serling, Robert J. (1988). Countdown: An Autobiography. Nueva York: Silver Arrow Books."
];

const INFOGRAPHIC_NODES = [
  {
    id: "contexto-1968",
    bannerImage: '/assets/apollo8/infographic_m1/banner_contexto-1968.webp',
    bannerCaption: "En 1968 Estados Unidos y la Unión Soviética competían por llegar primero a la Luna en medio de guerras y protestas.",
    title: "1968: Un Año Difícil y una Carrera Espacial",
    color: '#3E4A61',
    btnImage: '/assets/apollo8/infographic_m1/btn_contexto-1968.webp',
    image: '/assets/apollo8/infographic_m1/hero_contexto-1968.webp',
    content: [
      "El 25 de mayo de 1961, el presidente John F. Kennedy pidió al Congreso de Estados Unidos un objetivo enorme: llevar a un ser humano a la Luna y traerlo de vuelta antes de que terminara la década de 1960. En ese momento, la NASA solo había enviado a un astronauta, Alan Shepard, en un vuelo de 15 minutos. La Unión Soviética iba adelante: había lanzado el Sputnik en 1957 y había puesto a Yuri Gagarin en órbita en abril de 1961. Así comenzó la etapa más intensa de la carrera espacial.",
      "El programa Apollo sufrió un golpe terrible el 27 de enero de 1967. Durante un ensayo en la plataforma de lanzamiento en Cabo Kennedy, un incendio dentro de la cápsula Apollo 1 causó la muerte de los astronautas Virgil «Gus» Grissom, Edward White y Roger Chaffee. La cabina estaba llena de oxígeno puro a alta presión y la escotilla no se podía abrir rápido. La NASA detuvo los vuelos tripulados durante más de un año y rediseñó la nave, incluida una escotilla que se abría hacia afuera.",
      "El año 1968 fue uno de los más agitados del siglo XX. En enero comenzó la Ofensiva del Tet en la guerra de Vietnam. El 4 de abril asesinaron a Martin Luther King Jr. en Memphis, y en junio asesinaron al senador Robert F. Kennedy en Los Ángeles. En agosto, tanques del Pacto de Varsovia entraron en Checoslovaquia para terminar con la Primavera de Praga. El 2 de octubre ocurrió la masacre de Tlatelolco en la Ciudad de México, diez días antes de los Juegos Olímpicos. Mucha gente sentía que el mundo se estaba dividiendo.",
      "Mientras tanto, los soviéticos preparaban su propio viaje alrededor de la Luna con naves llamadas Zond. En septiembre de 1968, la sonda Zond 5 rodeó la Luna y regresó a la Tierra, cayendo en el océano Índico. Llevaba a bordo dos tortugas, moscas, gusanos de harina y semillas. Las tortugas fueron los primeros seres vivos en viajar alrededor de la Luna y volver. Las agencias de inteligencia de Estados Unidos temían que el siguiente paso fuera un vuelo con cosmonautas antes de que terminara el año.",
      "En octubre de 1968, la misión Apollo 7 devolvió la confianza a la NASA. Los astronautas Walter Schirra, Donn Eisele y Walter Cunningham pasaron casi 11 días en órbita terrestre probando el nuevo Módulo de Mando y Servicio. Fue el primer vuelo tripulado del programa Apollo y la primera nave estadounidense que transmitió televisión en vivo desde el espacio. La nave funcionó bien, y eso permitió a la NASA aprobar un plan mucho más atrevido para su siguiente misión: Apollo 8."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las tortugas de la Zond 5 eran tortugas rusas o de estepa (Testudo horsfieldii). Cuando los científicos las examinaron tras el regreso, habían perdido algo de peso porque no comieron durante el viaje, pero seguían vivas y activas. Su vuelo de septiembre de 1968 demostró que un organismo podía sobrevivir a un viaje de ida y vuelta alrededor de la Luna, algo que preocupó mucho a la NASA." },
      { label: "Dato Científico", icon: "atom", text: "El incendio del Apollo 1 se propagó tan rápido porque la cabina tenía oxígeno puro a una presión algo mayor que la del aire al nivel del mar. En oxígeno puro, materiales como el velcro y el nailon arden con mucha facilidad. Después del accidente, la NASA usó en la plataforma una mezcla de 60% oxígeno y 40% nitrógeno, y cambió muchos materiales por otros resistentes al fuego, como la tela Beta de fibra de vidrio." }
    ],
    fact: "La Unión Soviética nunca llegó a enviar cosmonautas alrededor de la Luna. Su vehículo Zond tuvo varias fallas, y su cohete lunar gigante N1 explotó en sus cuatro lanzamientos de prueba entre 1969 y 1972. Por eso Apollo 8 se convirtió en la primera misión de la historia con personas a bordo que salió de la órbita de la Tierra y llegó hasta otro mundo, en diciembre de 1968.",
  },
  {
    id: "decision-agosto",
    bannerImage: '/assets/apollo8/infographic_m1/banner_decision-agosto.webp',
    bannerCaption: "El retraso del Módulo Lunar llevó a la NASA a cambiar el plan de Apollo 8 y enviarlo directamente a la órbita de la Luna.",
    title: "La Decisión Audaz de Agosto de 1968",
    color: '#4A5D73',
    btnImage: '/assets/apollo8/infographic_m1/btn_decision-agosto.webp',
    image: '/assets/apollo8/infographic_m1/hero_decision-agosto.webp',
    content: [
      "El plan original de la NASA era avanzar paso a paso. La misión que hoy conocemos como Apollo 8 debía probar el Módulo Lunar en órbita terrestre, la nave que más tarde bajaría a la superficie de la Luna. Pero en el verano de 1968, el primer Módulo Lunar listo para volar con tripulación, construido por la empresa Grumman en Nueva York, tenía muchos problemas técnicos. Era evidente que no estaría listo antes de 1969. Si la NASA esperaba, perdería meses valiosos en la carrera contra los soviéticos.",
      "En agosto de 1968, George Low, director de la Oficina del Programa de Naves Apollo en Houston, propuso una idea que sorprendió a muchos: enviar el siguiente vuelo hasta la órbita lunar, solo con el Módulo de Mando y Servicio, sin Módulo Lunar. Robert Gilruth, director del Centro de Naves Tripuladas, el director de vuelo Christopher Kraft y el jefe de astronautas Donald «Deke» Slayton apoyaron la propuesta. En pocos días, los equipos de planificación empezaron a revisar si era posible.",
      "La idea tenía riesgos claros. El Saturn V solo había volado dos veces sin tripulación, y en abril de 1968 la misión Apollo 6 había sufrido fuertes vibraciones llamadas «efecto pogo» y la falla de dos motores de la segunda etapa. Además, sin Módulo Lunar no habría un «bote salvavidas»: si el motor principal fallaba cerca de la Luna, no habría forma de ayudar a la tripulación. Los ingenieros corrigieron el problema del pogo y revisaron cada sistema antes de confirmar el vuelo.",
      "Para no detener el entrenamiento, la NASA intercambió tripulaciones. El equipo de James McDivitt, que llevaba meses practicando con el Módulo Lunar, se quedó con esa prueba, que voló en marzo de 1969 como Apollo 9. El equipo de Frank Borman, que se preparaba para un vuelo posterior, pasó a la misión lunar. Ellos tuvieron alrededor de cuatro meses para aprender un viaje completamente nuevo, con nuevas trayectorias, programas de computadora y procedimientos de emergencia.",
      "Después del éxito de Apollo 7, el administrador interino de la NASA, Thomas Paine, aprobó oficialmente el plan. El 12 de noviembre de 1968, la agencia anunció que Apollo 8 viajaría a la órbita lunar en diciembre. Faltaban apenas seis semanas. En el Centro de Control de Misión en Houston y en el Centro Espacial Kennedy en Florida, miles de personas trabajaron a contrarreloj para preparar el cohete, la nave y la red de antenas que seguiría el vuelo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El astronauta Michael Collins estaba asignado originalmente a la tripulación de Borman. En el verano de 1968 necesitó una cirugía en el cuello por un problema en un disco de la columna vertebral, y James Lovell ocupó su lugar. Collins no se quedó fuera de la misión: trabajó en Houston como comunicador con la nave y fue quien dio a la tripulación la autorización para partir hacia la Luna. Siete meses después, voló en Apollo 11." },
      { label: "Dato Científico", icon: "atom", text: "El efecto pogo es una vibración que aparece cuando el empuje de los motores y el flujo de combustible por las tuberías se refuerzan entre sí, como un columpio al que empujas en el momento justo. En Apollo 6 sacudió el cohete hacia arriba y hacia abajo varias veces por segundo. Los ingenieros lo resolvieron añadiendo cavidades con helio en las líneas de oxígeno líquido de los motores F-1, que absorbían las oscilaciones." }
    ],
    fact: "El primer Módulo Lunar que voló con tripulación lo hizo en Apollo 9, en marzo de 1969, en órbita alrededor de la Tierra. Su indicativo de radio era «Spider» (araña) por sus patas largas. Gracias al cambio de orden de las misiones, la NASA pudo probar primero la navegación hacia la Luna con Apollo 8 y después el Módulo Lunar, sin perder tiempo en el calendario del programa.",
  },
  {
    id: "tripulacion",
    bannerImage: '/assets/apollo8/infographic_m1/banner_tripulacion.webp',
    bannerCaption: "Frank Borman fue comandante, James Lovell piloto del Módulo de Mando y William Anders piloto del Módulo Lunar.",
    title: "Borman, Lovell y Anders: La Tripulación",
    color: '#5A4E6E',
    btnImage: '/assets/apollo8/infographic_m1/btn_tripulacion.webp',
    image: '/assets/apollo8/infographic_m1/hero_tripulacion.webp',
    content: [
      "Frank Borman fue el comandante de Apollo 8. Nació el 14 de marzo de 1928 en Gary, Indiana, se graduó de la Academia Militar de West Point en 1950 y fue piloto de pruebas de la Fuerza Aérea. En diciembre de 1965 había volado en Gemini 7 junto con James Lovell, una misión de casi 14 días en órbita terrestre que sirvió para estudiar cómo resistía el cuerpo humano los vuelos largos. Era conocido por ser directo, exigente y muy disciplinado con los procedimientos.",
      "James Lovell fue el piloto del Módulo de Mando y el encargado de la navegación. Nació el 25 de marzo de 1928 en Cleveland, Ohio, y se graduó de la Academia Naval de Estados Unidos en 1952. Antes de Apollo 8 ya había volado dos veces: en Gemini 7 con Borman y en Gemini 12 con Edwin «Buzz» Aldrin en 1966. Con Apollo 8 se convirtió en el primer ser humano en volar al espacio cuatro veces cuando, en 1970, comandó Apollo 13.",
      "William Anders era el más joven y el único novato del equipo. Nació el 17 de octubre de 1933 en Hong Kong, donde trabajaba su padre, oficial de la Marina de Estados Unidos. Se graduó de la Academia Naval en 1955, fue piloto de la Fuerza Aérea y obtuvo una maestría en ingeniería nuclear. Su puesto oficial era piloto del Módulo Lunar, aunque en Apollo 8 no hubo Módulo Lunar. Se encargó de los sistemas de la nave y de buena parte de la fotografía de la Luna.",
      "Durante el entrenamiento, los tres pasaron cientos de horas en simuladores en Houston y en Florida. Lovell practicó la navegación con el sextante del Módulo de Mando, que le permitía medir ángulos entre estrellas y el horizonte de la Tierra o de la Luna. Anders estudió la geografía lunar con mapas y fotografías tomadas por las sondas automáticas Lunar Orbiter. Borman revisó con los controladores cada decisión de emergencia, como qué hacer si el motor principal fallaba detrás de la Luna.",
      "Después de la misión, cada uno siguió caminos distintos. Borman dejó la NASA en 1970 y años después fue presidente de la aerolínea Eastern Air Lines; murió el 7 de noviembre de 2023. Lovell vivió el famoso accidente de Apollo 13 en 1970 y escribió el libro que inspiró la película de 1995. Anders trabajó en el gobierno de Estados Unidos, fue embajador en Noruega y dirigió la empresa General Dynamics. Murió el 7 de junio de 2024 en un accidente de avioneta en el estado de Washington."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Borman y Lovell pasaron casi 14 días juntos en Gemini 7, en una cabina del tamaño del asiento delantero de un coche pequeño. Por eso se conocían muy bien antes de Apollo 8. Lovell es una de las tres únicas personas que han viajado dos veces hasta la Luna, junto con John Young y Eugene Cernan, aunque nunca llegó a caminar sobre su superficie." },
      { label: "Dato Científico", icon: "atom", text: "El sextante de Apollo funcionaba como el de los marinos antiguos, pero conectado a una computadora. El astronauta apuntaba a una estrella y a un punto del horizonte terrestre, y la computadora de guía usaba ese ángulo para calcular la posición de la nave. Lovell confirmó durante el vuelo que este método era preciso, lo cual era importante en caso de perder contacto por radio con la Tierra." }
    ],
    fact: "La revista estadounidense Time eligió a Frank Borman, James Lovell y William Anders como «Hombres del Año» de 1968. Fue un reconocimiento poco común, porque la revista solía elegir a jefes de Estado o líderes políticos. La elección mostraba que, para mucha gente, el viaje alrededor de la Luna había sido el acontecimiento más positivo de aquel año tan complicado.",
  },
  {
    id: "lanzamiento-viaje",
    bannerImage: '/assets/apollo8/infographic_m1/banner_lanzamiento-viaje.webp',
    bannerCaption: "El 21 de diciembre de 1968 un Saturn V llevó por primera vez a una tripulación; el viaje a la Luna duró cerca de 3 días.",
    title: "Despegue y Viaje de Tres Días",
    color: '#6B5B3E',
    btnImage: '/assets/apollo8/infographic_m1/btn_lanzamiento-viaje.webp',
    image: '/assets/apollo8/infographic_m1/hero_lanzamiento-viaje.webp',
    content: [
      "El 21 de diciembre de 1968, a las 7:51 de la mañana, hora de Florida, Apollo 8 despegó desde la plataforma 39A del Centro Espacial Kennedy. Era la tercera vez que volaba un cohete Saturn V y la primera con personas a bordo. El cohete medía unos 111 metros de altura y su primera etapa tenía cinco motores F-1, que quemaban queroseno y oxígeno líquido. En unos dos minutos y medio, esa etapa consumió más de 2,000 toneladas de combustible y se separó para caer en el océano Atlántico.",
      "Después trabajaron la segunda etapa, S-II, con cinco motores J-2 que usaban hidrógeno y oxígeno líquidos, y luego la tercera etapa, S-IVB, que colocó la nave en una órbita de estacionamiento a unos 190 kilómetros de altura. Durante casi dos vueltas a la Tierra, la tripulación y los controladores revisaron todos los sistemas. Desde Houston, Michael Collins, que trabajaba como comunicador, transmitió la autorización para la maniobra más importante del día: la inyección translunar.",
      "Unas dos horas y cincuenta minutos después del despegue, el motor de la S-IVB se encendió de nuevo durante poco más de cinco minutos. La nave alcanzó cerca de 39,000 kilómetros por hora, suficiente para escapar de la órbita terrestre. Borman, Lovell y Anders se convirtieron en los primeros seres humanos que salían de la órbita de la Tierra. Poco después, el Módulo de Mando y Servicio se separó de la tercera etapa, que siguió una trayectoria propia hacia una órbita alrededor del Sol.",
      "El viaje hasta la Luna duró aproximadamente 3 días, unas 69 horas. Durante el trayecto, la gravedad terrestre frenaba la nave poco a poco. Los astronautas fueron los primeros en ver la Tierra entera como una esfera, flotando en el espacio, cada vez más pequeña por las ventanillas. También hubo problemas: Borman se sintió mal durante el primer día, con náuseas y vómitos. Los médicos en Houston lo siguieron de cerca, y se recuperó antes de llegar a la Luna.",
      "La tripulación realizó varias transmisiones de televisión en blanco y negro durante el viaje. La cámara era pequeña y al principio les costó apuntar a la Tierra con el lente correcto, pero lograron mostrar al público el planeta visto desde decenas de miles de kilómetros. A medida que se acercaban a la Luna, su gravedad empezó a acelerar la nave. Los astronautas no podían ver la Luna bien por las ventanillas, porque estaba en dirección al Sol y la nave avanzaba casi de lado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los astronautas de Apollo 8 fueron los primeros en ver con sus propios ojos la Tierra completa, redonda y entera. Desde la órbita baja, como la de la Estación Espacial Internacional a unos 400 kilómetros, solo se ve una parte del planeta. Para ver el disco completo hay que alejarse decenas de miles de kilómetros. Solo 24 personas, todas del programa Apollo entre 1968 y 1972, han viajado tan lejos." },
      { label: "Dato Científico", icon: "atom", text: "La nave salió de la Tierra a casi 39,000 kilómetros por hora, pero la gravedad terrestre la fue frenando durante todo el viaje. Cerca del punto donde la atracción de la Luna se vuelve más fuerte que la de la Tierra, a unos 62,000 kilómetros de la Luna, la nave viajaba a pocos miles de kilómetros por hora. A partir de ahí, la gravedad lunar empezó a acelerarla otra vez." }
    ],
    fact: "La tercera etapa S-IVB de Apollo 8 no se estrelló contra la Luna. Después de separarse, los controladores la desviaron para que pasara cerca de la Luna y saliera hacia una órbita alrededor del Sol, donde sigue viajando. En misiones posteriores, a partir de Apollo 13, la NASA dirigió esas etapas para que chocaran contra la Luna y así medir las vibraciones con los sismómetros dejados por los astronautas.",
  },
  {
    id: "orbita-lunar",
    bannerImage: '/assets/apollo8/infographic_m1/banner_orbita-lunar.webp',
    bannerCaption: "El motor que frenó a Apollo 8 para entrar en órbita lunar se encendió detrás de la Luna, sin comunicación con la Tierra.",
    title: "Detrás de la Luna: La Inserción en Órbita",
    color: '#2F4858',
    btnImage: '/assets/apollo8/infographic_m1/btn_orbita-lunar.webp',
    image: '/assets/apollo8/infographic_m1/hero_orbita-lunar.webp',
    content: [
      "La mañana del 24 de diciembre de 1968, la nave se acercó a la Luna y pasó por detrás de ella. En ese momento, la Luna bloqueó las señales de radio y se perdió toda comunicación con la Tierra. Fue entonces cuando debía encenderse el motor principal del Módulo de Servicio para frenar la nave y quedar atrapada por la gravedad lunar. Esta maniobra se llama inserción en órbita lunar, o LOI por sus siglas en inglés, y era crítica porque los controladores no podrían ver ni ayudar mientras ocurría.",
      "El motor funcionó durante unos cuatro minutos, poco más de 246 segundos. Si se apagaba demasiado pronto, la nave podría quedar en una órbita peligrosa. Si funcionaba demasiado tiempo, podría chocar contra la Luna. Si no se encendía, la trayectoria llevaría a la nave alrededor de la Luna y de regreso a la Tierra. En Houston, los controladores esperaron en silencio el momento calculado para que la nave reapareciera por el otro lado. Cuando volvió la señal, Lovell informó que todo había salido bien.",
      "La primera órbita era alargada, de unos 111 por 311 kilómetros sobre la superficie. Dos vueltas después, otro encendido del motor la convirtió en una órbita casi circular, a unos 112 kilómetros de altura. Cada vuelta alrededor de la Luna duraba cerca de dos horas, y en cada una la nave pasaba unos 45 minutos detrás de la Luna sin comunicación con la Tierra. En total, Apollo 8 completó 10 órbitas en unas 20 horas.",
      "Borman, Lovell y Anders fueron los primeros seres humanos en ver directamente la cara oculta de la Luna, la que nunca se ve desde la Tierra. La sonda soviética Luna 3 la había fotografiado por primera vez en octubre de 1959, pero nadie la había visto con sus ojos. Los astronautas describieron un paisaje gris, cubierto de cráteres, con muy pocos «mares» de lava oscura, a diferencia de la cara que vemos desde la Tierra. Lovell comparó el color de la superficie con el yeso de París o la arena gris de una playa.",
      "La tripulación tenía un trabajo científico importante. Tomó cientos de fotografías de la superficie, sobre todo de los sitios propuestos para los alunizajes, como el Mar de la Tranquilidad. También midió con precisión la órbita para entender mejor la gravedad lunar. Lovell usó como referencia una montaña de forma triangular cerca del borde del Mar de la Tranquilidad y la llamó Monte Marilyn, en honor a su esposa. Siete meses después, la tripulación de Apollo 11 usó esa misma montaña como señal durante su descenso."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El nombre Monte Marilyn fue durante décadas un nombre informal usado por los astronautas. En 2017, la Unión Astronómica Internacional, el organismo que aprueba los nombres de los accidentes geográficos en otros mundos, reconoció oficialmente el nombre «Mons Marilyn» para esa montaña. Así, un recuerdo personal de James Lovell para su esposa quedó registrado en los mapas lunares de todo el mundo." },
      { label: "Dato Científico", icon: "atom", text: "La Luna siempre muestra la misma cara a la Tierra porque tarda lo mismo en girar sobre su eje que en dar una vuelta alrededor de nuestro planeta: unos 27.3 días. Este fenómeno se llama rotación sincrónica y es resultado de las fuerzas de marea entre la Tierra y la Luna. La cara oculta no es oscura: recibe luz solar igual que la cara visible, solo que en otros momentos." }
    ],
    fact: "La cara oculta de la Luna tiene una corteza más gruesa que la cara visible. Por eso, cuando grandes asteroides chocaron contra ella hace miles de millones de años, la lava del interior llegó con menos facilidad a la superficie y se formaron muy pocos mares oscuros. Los astronautas de Apollo 8 confirmaron con sus propias observaciones lo que las sondas automáticas habían mostrado en sus fotografías.",
  },
  {
    id: "nochebuena-genesis",
    bannerImage: '/assets/apollo8/infographic_m1/banner_nochebuena-genesis.webp',
    bannerCaption: "En la Nochebuena de 1968 la tripulación leyó los primeros versículos del Génesis en una transmisión desde la órbita lunar.",
    title: "La Transmisión de Nochebuena",
    color: '#7A4E3B',
    btnImage: '/assets/apollo8/infographic_m1/btn_nochebuena-genesis.webp',
    image: '/assets/apollo8/infographic_m1/hero_nochebuena-genesis.webp',
    content: [
      "Antes del vuelo, la NASA le dijo a Frank Borman que la tripulación haría una transmisión de televisión en la Nochebuena, desde la órbita lunar, y que se esperaba una audiencia mayor que nunca. Le pidieron que dijera algo apropiado para la ocasión. Borman consultó a varias personas. Un amigo, Simon Bourgin, pidió ayuda a Joe Laitin, funcionario del gobierno, y fue Christine, la esposa de Laitin, quien sugirió leer el comienzo del libro del Génesis, un texto que habla del origen de los cielos y la Tierra.",
      "La transmisión ocurrió durante la novena órbita, la noche del 24 de diciembre de 1968 en Estados Unidos. Primero, los astronautas mostraron con la cámara de televisión el paisaje lunar que pasaba bajo la nave y describieron lo que veían. Anders explicó la forma de los cráteres y Lovell habló de lo solitaria que se veía la Luna. Después, la tripulación preparó el mensaje que habían escrito en una hoja resistente al fuego, incluida dentro del plan de vuelo.",
      "William Anders empezó a leer los primeros versículos del Génesis. Después continuó James Lovell y, al final, Frank Borman leyó hasta el versículo 10. Al terminar, Borman deseó buenas noches, buena suerte y feliz Navidad a todas las personas de la «buena Tierra». La lectura duró unos pocos minutos, pero muchas personas que la escucharon la recordaron toda su vida, sin importar su religión o su país de origen.",
      "Se estima que cerca de mil millones de personas en todo el mundo vieron o escucharon la transmisión en vivo o en las horas siguientes, en decenas de países. Para ese momento, fue el programa de televisión con mayor audiencia de la historia. La señal viajaba desde la nave hasta grandes antenas en la Tierra, como las de Goldstone en California, Madrid en España y Honeysuckle Creek cerca de Canberra en Australia, y de ahí a las cadenas de televisión.",
      "No todas las reacciones fueron positivas. En 1969, la activista Madalyn Murray O'Hair, fundadora de la organización American Atheists, demandó al gobierno de Estados Unidos porque consideraba que la lectura religiosa en una misión pública no era correcta. Un tribunal federal rechazó la demanda, y la Corte Suprema no aceptó revisarla en 1971. En años siguientes, la NASA pidió a los astronautas tener cuidado con los mensajes religiosos en las transmisiones públicas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En mayo de 1969, el Servicio Postal de Estados Unidos emitió un sello de 6 centavos para conmemorar Apollo 8. Mostraba la Tierra elevándose sobre el horizonte lunar, basado en la fotografía tomada por William Anders, junto con las palabras iniciales del Génesis que la tripulación leyó aquella Nochebuena. Fue uno de los sellos más populares de su época." },
      { label: "Dato Científico", icon: "atom", text: "Las ondas de radio viajan a la velocidad de la luz, unos 300,000 kilómetros por segundo. Como la Luna está a unos 384,000 kilómetros de distancia, la voz de los astronautas tardaba cerca de 1.3 segundos en llegar a la Tierra. Por eso, en las conversaciones entre Houston y Apollo 8 se oía una pausa de más de dos segundos entre una pregunta y su respuesta." }
    ],
    fact: "El texto del Génesis estaba impreso en una hoja de papel resistente al fuego, porque después del incendio del Apollo 1 la NASA eliminó casi todo el papel normal de las cabinas. Esa hoja formaba parte del plan de vuelo. La transmisión de Nochebuena fue una de las seis transmisiones de televisión que realizó la tripulación de Apollo 8 durante todo el viaje.",
  },
  {
    id: "earthrise-regreso",
    bannerImage: '/assets/apollo8/infographic_m1/banner_earthrise-regreso.webp',
    bannerCaption: "William Anders fotografió la Tierra saliendo sobre el horizonte lunar; la nave amerizó en el Pacífico el 27 de diciembre.",
    title: "Earthrise y el Regreso a Casa",
    color: '#3F5E5A',
    btnImage: '/assets/apollo8/infographic_m1/btn_earthrise-regreso.webp',
    image: '/assets/apollo8/infographic_m1/hero_earthrise-regreso.webp',
    content: [
      "El 24 de diciembre de 1968, durante la cuarta órbita, la nave giró y por una ventanilla apareció la Tierra elevándose sobre el horizonte gris de la Luna. La grabación de la cabina registró la sorpresa de los astronautas. William Anders tomó primero una fotografía en blanco y negro y luego pidió un rollo de película a color. Con una cámara Hasselblad y un lente de 250 milímetros, hizo la imagen que la NASA catalogó como AS08-14-2383, conocida en todo el mundo como «Earthrise», o «Salida de la Tierra».",
      "La fotografía muestra una Tierra azul y blanca, parcialmente iluminada, sobre un paisaje lunar sin color ni vida. La revista Life la incluyó en su colección de las 100 fotografías que cambiaron el mundo. Muchos historiadores la relacionan con el crecimiento del movimiento ambientalista: el primer Día de la Tierra se celebró el 22 de abril de 1970, poco más de un año después. El fotógrafo de naturaleza Galen Rowell la describió como la fotografía ambiental más influyente jamás tomada.",
      "El 25 de diciembre, Navidad, llegó otro momento crítico: la inyección transterrestre. El motor del Módulo de Servicio tenía que encenderse otra vez detrás de la Luna, sin contacto con la Tierra, para sacar la nave de la órbita lunar. Si fallaba, no había plan de rescate posible. El motor funcionó durante unos tres minutos y medio. Cuando la nave salió de detrás de la Luna, Lovell anunció por radio que debían saber que Santa Claus sí existía, una forma divertida de decir que todo había salido bien.",
      "En el viaje de regreso hubo un susto. Lovell, por error, activó en la computadora un programa que borró parte de los datos de orientación de la nave. Tuvo que usar el sextante y las estrellas para volver a calcular la posición, algo que había practicado muchas veces. La tripulación también celebró la Navidad: encontraron comida especial con pavo y salsa, y regalos que el equipo de tierra había guardado en secreto en la nave.",
      "El 27 de diciembre de 1968, la cápsula entró en la atmósfera a casi 40,000 kilómetros por hora y amerizó en el océano Pacífico, al suroeste de Hawái, antes del amanecer. Fue el primer amerizaje nocturno del programa espacial de Estados Unidos. Los equipos de rescate esperaron a la luz del día para sacar a los astronautas, que fueron llevados al portaaviones USS Yorktown. La misión duró unas 147 horas, poco más de seis días, y completó el primer viaje humano alrededor de otro mundo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante años hubo confusión sobre quién había tomado Earthrise, porque Borman también hizo fotos de la Tierra. En 2013, el especialista de la NASA Ernie Wright usó datos de altímetro de la sonda Lunar Reconnaissance Orbiter y la grabación de la cabina para reconstruir el momento exacto. El análisis confirmó que la foto a color fue tomada por William Anders desde una ventanilla lateral de la nave." },
      { label: "Dato Científico", icon: "atom", text: "Desde la Luna, la Tierra no sale ni se pone como el Sol en nuestro cielo, porque la Luna siempre muestra la misma cara a la Tierra. Para alguien parado en la superficie lunar, la Tierra se queda casi quieta en el cielo. Los astronautas de Apollo 8 vieron una salida de la Tierra porque su nave se movía en órbita alrededor de la Luna y aparecía por encima del horizonte." }
    ],
    fact: "Apollo 8 logró varias primeras veces en un solo vuelo: primera tripulación lanzada por un Saturn V, primeros humanos en salir de la órbita terrestre, primeros en orbitar la Luna, primeros en ver su cara oculta y primeros en ver la Tierra completa desde el espacio. Siete meses después, en julio de 1969, Apollo 11 usó toda esa experiencia para lograr el primer alunizaje.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo8M1)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#3E4A61", "#4A5D73", "#5A4E6E", "#6B5B3E", "#2F4858", "#7A4E3B", "#3F5E5A"];
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
          <linearGradient id="gradApollo8M1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">APOLLO 8: PRIMER VIAJE A LA LUNA</text>
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
          layoutId="activeDotApollo8M1"
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
export default function InteractiveInfographic_Apollo8M1() {
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
              🏆 ¡Pionero Lunar! Viajaste con Borman, Lovell y Anders alrededor de la Luna.
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
