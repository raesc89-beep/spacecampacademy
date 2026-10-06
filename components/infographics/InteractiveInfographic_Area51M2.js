'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#9C8F5A', style = {} }) {
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
  "Pedlow, G. W. y Welzenbach, D. E. (1992, desclasificado en 2013). The Central Intelligence Agency and Overhead Reconnaissance: The U-2 and OXCART Programs, 1954-1974. CIA History Staff.",
  "Rich, B. R. y Janos, L. (1994). Skunk Works: A Personal Memoir of My Years at Lockheed. Boston: Little, Brown and Company.",
  "Powers, F. G. y Gentry, C. (1970). Operation Overflight: The U-2 Spy Pilot Tells His Story for the First Time. Nueva York: Holt, Rinehart and Winston.",
  "Aronstein, D. C. y Piccirillo, A. C. (1997). Have Blue and the F-117A: Evolution of the Stealth Fighter. Reston, Virginia: American Institute of Aeronautics and Astronautics (AIAA).",
  "Ufimtsev, P. Ya. (1962). Método de las ondas de borde en la teoría física de la difracción. Moscú: Sovetskoe Radio. Traducción al inglés: U.S. Air Force Foreign Technology Division, 1971.",
  "Crickmore, P. F. (2004). Lockheed Blackbird: Beyond the Secret Missions. Oxford: Osprey Publishing.",
  "National Museum of the United States Air Force. Fichas técnicas: Lockheed U-2, Lockheed SR-71A, Lockheed F-117A Nighthawk, Northrop B-2 Spirit. Dayton, Ohio.",
  "NASA Armstrong Flight Research Center. SR-71 Blackbird Fact Sheet y Linear Aerospike SR-71 Experiment (LASRE)."
];

const INFOGRAPHIC_NODES = [
  {
    id: "a51m2-ver-sin-ser-visto",
    bannerImage: '/assets/area51/infographic_m2/banner_a51m2-ver-sin-ser-visto.webp',
    bannerCaption: "Entre 1955 y los años 80, el Área 51 fue banco de pruebas de los aviones espía y furtivos más avanzados de EE. UU.",
    title: "La carrera por ver sin ser visto",
    color: '#6A7570',
    btnImage: '/assets/area51/infographic_m2/btn_a51m2-ver-sin-ser-visto.webp',
    image: '/assets/area51/infographic_m2/hero_a51m2-ver-sin-ser-visto.webp',
    content: [
      "Durante la Guerra Fría, saber lo que hacía el rival era tan valioso como tener armas. Por eso Estados Unidos invirtió enormes cantidades de dinero en aviones capaces de observar territorio enemigo sin ser derribados. Cada nuevo modelo probado en el Área 51 respondía a un problema concreto: primero había que volar más alto que los cazas, después más rápido que los misiles y, finalmente, pasar desapercibido ante los radares. Esa secuencia de retos explica toda la historia de los aviones secretos.",
      "Muchos de estos aviones salieron del mismo lugar: Skunk Works, el departamento de proyectos avanzados de Lockheed en California. Su fundador, Kelly Johnson, organizaba equipos pequeños de ingenieros y mecánicos muy experimentados que trabajaban junto a los aviones, con poco papeleo y comunicación directa con el cliente. Escribió catorce reglas de trabajo, entre ellas limitar de forma «casi despiadada» el número de personas en cada proyecto. Ese método permitía diseñar en meses lo que normalmente tardaba años.",
      "El secreto se protegía de varias formas. Los proyectos tenían nombres en clave, como AQUATONE para el U-2 u OXCART para el A-12, que no revelaban nada sobre el avión. Cada trabajador sólo conocía la parte que necesitaba para su tarea, un principio llamado «necesidad de saber». Muchas piezas se compraban a través de empresas fachada para que los proveedores no supieran para qué servían, y con los años los vuelos de prueba se programaron evitando los pasos de satélites soviéticos.",
      "El Área 51 no sólo servía para aviones estadounidenses. Documentos desclasificados décadas después revelaron que, en 1968, la Fuerza Aérea probó allí en secreto un caza soviético MiG-21 obtenido gracias a un piloto iraquí que había desertado a Israel en 1966. En el programa, llamado HAVE DOUGHNUT, pilotos estadounidenses estudiaron sus fortalezas y debilidades. Más tarde, otros aviones de fabricación soviética se usaron para entrenar pilotos en combates simulados contra aeronaves enemigas reales.",
      "Conviene recordar algo importante: no todos los aviones secretos de Estados Unidos se probaron en el Área 51, ni todo lo que ocurrió con ellos pasó allí. El SR-71 y el B-2, por ejemplo, volaron por primera vez en Palmdale, California, y el F-117 operó durante años desde otra base secreta de Nevada, Tonopah. Distinguir con precisión dónde ocurrió cada cosa es parte del trabajo histórico serio y evita repetir datos falsos que circulan por internet como si fueran ciertos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Kelly Johnson diseñó o dirigió más de cuarenta aviones a lo largo de su carrera, entre ellos el P-38 Lightning de la Segunda Guerra Mundial, el F-104 Starfighter, el U-2 y el SR-71. Recibió la Medalla Presidencial de la Libertad en 1964 y, años después, la Medalla Nacional de Seguridad. Entre sus colegas se decía que era capaz de «ver el aire», es decir, de intuir cómo fluiría alrededor de una forma antes de que existieran las simulaciones por computadora." },
      { label: "Dato Científico", icon: "atom", text: "Un avión espía es en realidad una plataforma para sensores. Además de cámaras de película, los aviones de reconocimiento llevaban equipos de inteligencia electrónica, llamados ELINT, que captaban las señales de los radares enemigos. Analizando la frecuencia y el ritmo de los pulsos, los técnicos podían identificar qué tipo de radar era, dónde estaba y cuál era su alcance. Así se cartografiaban las defensas de un país sin disparar un solo tiro, sólo escuchando las ondas que emitía." }
    ],
    fact: "Dato verificable: el MiG-21 probado en el Área 51 llegó a Israel el 16 de agosto de 1966, cuando el piloto iraquí Munir Redfa desertó volando con él. Israel lo prestó a Estados Unidos, que lo evaluó en Groom Lake en 1968 bajo el nombre HAVE DOUGHNUT. Los informes de esas pruebas, hoy desclasificados, muestran que conocer de cerca al avión rival ayudó a mejorar el entrenamiento y las tácticas de los pilotos estadounidenses.",
  },
  {
    id: "a51m2-u2-alas-de-planeador",
    bannerImage: '/assets/area51/infographic_m2/banner_a51m2-u2-alas-de-planeador.webp',
    bannerCaption: "Para sostenerse en el aire tan delgado a 21 km, el U-2 necesitaba alas enormes, muy poco peso y un combustible especial.",
    title: "U-2: alas de planeador a 21 kilómetros",
    color: '#5E6E7E',
    btnImage: '/assets/area51/infographic_m2/btn_a51m2-u2-alas-de-planeador.webp',
    image: '/assets/area51/infographic_m2/hero_a51m2-u2-alas-de-planeador.webp',
    content: [
      "Un avión vuela gracias a la sustentación, la fuerza hacia arriba que generan las alas al moverse a través del aire. Esa fuerza depende de la densidad del aire, de la velocidad y del tamaño del ala. A 21 kilómetros de altura, la altitud aproximada a la que volaba el U-2, el aire es unas quince veces menos denso que al nivel del mar. Para compensar esa escasez, los ingenieros dieron al U-2 unas alas muy largas, con mucha superficie, y redujeron su peso todo lo posible.",
      "El diseño de Kelly Johnson se inspiró en los planeadores. Las alas eran tan largas y flexibles que en tierra necesitaban apoyo, por eso el avión usaba ruedas auxiliares desprendibles. El tren de aterrizaje principal estaba en el centro del fuselaje, uno detrás de otro, como en una bicicleta. Para ahorrar peso, según los relatos de la época, algunas láminas del revestimiento eran tan delgadas que podían abollarse con facilidad. Cada kilo ahorrado se traducía en metros de altura ganados.",
      "Volar el U-2 era muy difícil. A su altitud máxima, la diferencia entre la velocidad mínima para no perder sustentación y la velocidad máxima segura era de apenas unos 18 kilómetros por hora. Los pilotos llamaban a esta zona «coffin corner», la esquina del ataúd: si iban un poco lento, el avión entraba en pérdida; si iban un poco rápido, podía sufrir vibraciones peligrosas. Mantener el avión dentro de ese margen durante horas exigía una concentración extraordinaria.",
      "El primer motor del U-2 era un Pratt & Whitney J57, y el combustible también tuvo que ser especial. A la altura de vuelo la temperatura ronda los 56 grados bajo cero y la presión es tan baja que el combustible normal podía evaporarse o congelarse. La empresa Shell desarrolló un combustible de baja volatilidad, conocido como LF-1A y después como JP-TS, que soportaba esas condiciones. Fue una pieza clave pero poco conocida del éxito del avión, porque sin él el motor no habría funcionado arriba.",
      "Gracias a estas soluciones, el U-2 voló por primera vez en agosto de 1955, apenas unos ocho meses después de que se firmara el contrato. Más de seis décadas después, la Fuerza Aérea de Estados Unidos sigue usando una versión modernizada, el U-2S, con alas de unos 31 metros de envergadura y un motor más eficiente. Pocas máquinas en la historia de la aviación han tenido una vida tan larga. Su diseño demuestra que una idea sencilla y bien ejecutada puede durar generaciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El U-2 es tan difícil de aterrizar que, todavía hoy, un segundo piloto lo persigue por la pista en un automóvil deportivo de alto rendimiento, a más de 150 kilómetros por hora, para guiarlo por radio. Como el piloto lleva un casco presurizado y el avión tiene una nariz larga, no ve bien el suelo. El conductor del coche le indica cuántos pies le faltan para tocar la pista y, en el momento justo, el avión deja de volar y se apoya sobre su tren de bicicleta." },
      { label: "Dato Científico", icon: "atom", text: "La ecuación de sustentación dice que la fuerza que levanta un avión es proporcional a la densidad del aire, al cuadrado de la velocidad y a la superficie del ala. Si la densidad baja quince veces, para mantener la misma fuerza hay que volar más rápido, aumentar el área del ala o ambas cosas. Pero volar más rápido acerca el avión a la velocidad del sonido, donde aparecen vibraciones peligrosas. Por eso el U-2 eligió el camino de las alas enormes, igual que las aves planeadoras." }
    ],
    fact: "Dato verificable: la historia desclasificada de la CIA cuenta que el combustible especial del U-2, el LF-1A, fue desarrollado por la empresa Shell Oil a partir de subproductos del petróleo que normalmente se usaban para fabricar un insecticida en aerosol llamado Flit. Producir varios cientos de miles de galones de combustible en la primavera y el verano de 1955 provocó una escasez temporal de ese insecticida en Estados Unidos.",
  },
  {
    id: "a51m2-derribo-de-powers-1960",
    bannerImage: '/assets/area51/infographic_m2/banner_a51m2-derribo-de-powers-1960.webp',
    bannerCaption: "El 1 de mayo de 1960 un misil soviético derribó el U-2 de Francis Gary Powers cerca de Sverdlovsk; Powers fue capturado vivo.",
    title: "1 de mayo de 1960: el derribo de Powers",
    color: '#7F6A5C',
    btnImage: '/assets/area51/infographic_m2/btn_a51m2-derribo-de-powers-1960.webp',
    image: '/assets/area51/infographic_m2/hero_a51m2-derribo-de-powers-1960.webp',
    content: [
      "Francis Gary Powers era un piloto de la Fuerza Aérea que, como otros compañeros, dejó oficialmente el ejército para volar para la CIA como civil. El 1 de mayo de 1960 despegó de Peshawar, en Pakistán, con la misión de atravesar la Unión Soviética de sur a norte y aterrizar en Bodø, Noruega. Su ruta pasaba sobre bases de misiles e instalaciones nucleares. Ese día era festivo en la Unión Soviética, el Día del Trabajo, y había muy poco tráfico aéreo normal en el cielo.",
      "Cerca de la ciudad de Sverdlovsk, hoy Ekaterimburgo, una batería de misiles tierra-aire S-75, llamados SA-2 por la OTAN, disparó varios proyectiles. Una de las explosiones dañó gravemente el U-2 y lo hizo caer. Powers no llegó a activar el sistema de destrucción del avión, pero consiguió salir de la cabina y abrir su paracaídas. En la confusión, otro misil soviético derribó por error a uno de sus propios cazas que perseguía al avión espía, y su piloto murió.",
      "Al principio, el gobierno estadounidense pensó que Powers había muerto y difundió una historia falsa: dijo que se trataba de un avión meteorológico de la NASA que se había desviado de su ruta. Entonces el líder soviético Nikita Jruschov reveló que tenían los restos del avión, la cámara con su película y al piloto vivo. La mentira quedó expuesta ante el mundo, y el presidente Eisenhower tuvo que reconocer públicamente que Estados Unidos realizaba vuelos de espionaje.",
      "El incidente tuvo consecuencias enormes. Una cumbre entre Estados Unidos, la Unión Soviética, Francia y el Reino Unido, celebrada en París pocos días después, fracasó en medio de las acusaciones. Powers fue juzgado en Moscú en agosto de 1960 y condenado a diez años de privación de libertad. En febrero de 1962 fue liberado en el puente Glienicke, en Berlín, intercambiado por Rudolf Abel, un espía soviético que había sido detenido en Estados Unidos.",
      "El derribo de Powers marcó el final de los vuelos del U-2 sobre territorio soviético y aceleró otra tecnología: los satélites espía. En agosto de 1960, apenas tres meses y medio después, el programa CORONA recuperó por primera vez desde el espacio una cápsula con película fotográfica tomada sobre la Unión Soviética. Esa sola misión cubrió más territorio soviético que todos los vuelos del U-2 juntos. El espionaje empezaba a mudarse al espacio, donde ningún misil de la época podía alcanzarlo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La historia del intercambio de Powers y Abel fue llevada al cine en 2015 con la película «El puente de los espías», dirigida por Steven Spielberg. En ella, el abogado estadounidense James B. Donovan negocia el canje en plena Guerra Fría. Aunque la película dramatiza algunos detalles, el intercambio ocurrió de verdad en el puente Glienicke, que unía Berlín Occidental con Potsdam, en la Alemania Oriental, y que más tarde se usó para otros intercambios de espías." },
      { label: "Dato Científico", icon: "atom", text: "Un misil tierra-aire como el SA-2 no necesitaba golpear directamente al avión. Llevaba una carga explosiva que detonaba cerca del objetivo y lanzaba fragmentos metálicos en todas direcciones. A 21 kilómetros de altura el aire es tan delgado que la onda expansiva es débil, pero los fragmentos siguen viajando a enorme velocidad. Bastó con que una explosión ocurriera cerca del U-2 para dañar su estructura, tan ligera como la de un planeador, y hacerlo caer." }
    ],
    fact: "Dato verificable: restos del U-2 de Powers se exhiben en el Museo Central de las Fuerzas Armadas, en Moscú. En 2000, cuarenta años después del derribo, Powers recibió a título póstumo la Cruz de Vuelo Distinguido y la Medalla de Prisionero de Guerra, y en 2012 la Fuerza Aérea le otorgó la Estrella de Plata por su conducta durante el cautiverio. Powers murió en 1977 en un accidente de helicóptero mientras trabajaba como reportero de televisión.",
  },
  {
    id: "a51m2-familia-blackbird",
    bannerImage: '/assets/area51/infographic_m2/banner_a51m2-familia-blackbird.webp',
    bannerCaption: "El SR-71 Blackbird volaba a más de Mach 3 y a unos 25 km de altura; se construyeron 32 ejemplares.",
    title: "A-12 y SR-71: la familia Blackbird",
    color: '#4E5966',
    btnImage: '/assets/area51/infographic_m2/btn_a51m2-familia-blackbird.webp',
    image: '/assets/area51/infographic_m2/hero_a51m2-familia-blackbird.webp',
    content: [
      "El A-12 OXCART de la CIA, probado en el Área 51 desde 1962, fue el primer miembro de la familia de aviones que hoy llamamos Blackbird. Se construyeron muy pocos ejemplares y su existencia fue secreta durante décadas. Volaba con un solo piloto a más de Mach 3 y a unos 27 kilómetros de altura. Su única etapa de misiones reales, llamada Operación Black Shield, se realizó en 1967 y 1968 desde la isla de Okinawa, en Japón, sobre Vietnam del Norte y Corea del Norte.",
      "Algunos textos afirman que el A-12 voló sobre Cuba durante la Crisis de los Misiles de octubre de 1962, pero en esa fecha todavía estaba en pruebas: las fotos de los misiles las tomaron aviones U-2. Este es un buen ejemplo de por qué conviene revisar las fuentes, porque incluso los textos educativos pueden contener errores. Lo que sí está documentado es que el A-12 buscó baterías de misiles en Vietnam y fotografió Corea del Norte tras la captura del barco espía estadounidense Pueblo, en 1968.",
      "Mientras tanto, la Fuerza Aérea encargó su propia versión de dos tripulantes, el SR-71, que voló en diciembre de 1964. Se construyeron 32 SR-71 y entraron en servicio en 1966. Un piloto manejaba el avión y un oficial de sistemas de reconocimiento, sentado detrás, controlaba las cámaras, los sensores y la navegación. El SR-71 podía fotografiar unos 260,000 kilómetros cuadrados por hora, una superficie mayor que la del Reino Unido, desde unos 25 kilómetros de altura.",
      "Su velocidad era su escudo. En más de veinte años de servicio operativo, ningún SR-71 fue derribado por un enemigo. Los misiles de la época tardaban demasiado en alcanzar su altura y, cuando llegaban, el avión ya estaba lejos. Sin embargo, el SR-71 no era indestructible: doce de los 32 ejemplares se perdieron en accidentes, lo que muestra lo exigente que era volar en el límite de la tecnología. Por fortuna, en casi todos esos accidentes la tripulación logró salvarse.",
      "El SR-71 aún conserva récords. En julio de 1976 alcanzó 3,529.6 kilómetros por hora en un recorrido recto y mantuvo vuelo horizontal a 25,929 metros de altitud. La Fuerza Aérea lo retiró en 1990 por su elevado costo, porque los satélites y otros sistemas ya podían cubrir muchas de sus funciones. Hoy se pueden ver ejemplares en museos como el Centro Steven F. Udvar-Hazy del Smithsonian, cerca de Washington, donde uno aterrizó tras su vuelo récord de costa a costa en 1990."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El nombre «SR-71» tiene su propia leyenda. Según el relato más difundido, la designación original era RS-71, de «Reconnaissance Strike», pero cuando el presidente Lyndon B. Johnson la anunció en 1964 dijo «SR-71», y la Fuerza Aérea prefirió cambiar sus documentos antes que corregir al presidente. Sin embargo, algunos historiadores sostienen que el cambio a «SR» ya había sido pedido por el general Curtis LeMay. Es una anécdota popular que conviene tomar con cautela." },
      { label: "Dato Científico", icon: "atom", text: "Los motores Pratt & Whitney J58 del SR-71 eran híbridos. A baja velocidad funcionaban como turborreactores normales, pero a velocidades altas una parte del aire pasaba por conductos que rodeaban el núcleo del motor, y el conjunto se comportaba casi como un estatorreactor. Además, un cono móvil en la entrada de aire, llamado espiga, se desplazaba para frenar el aire supersónico y comprimirlo, porque el motor sólo puede tragar aire más lento que el sonido." }
    ],
    fact: "Dato verificable: tras su retiro, la NASA utilizó dos SR-71A y un entrenador SR-71B en su Centro de Investigación de Vuelo Dryden, en California, hasta 1999. Los usó para estudiar el vuelo a alta velocidad, las explosiones sónicas y nuevos motores, e incluso montó sobre uno de ellos el experimento LASRE, relacionado con el motor aerospike del proyecto de nave espacial X-33. Los datos ayudaron a diseñar futuros vehículos supersónicos.",
  },
  {
    id: "a51m2-titanio-metal-contra-el-calor",
    bannerImage: '/assets/area51/infographic_m2/banner_a51m2-titanio-metal-contra-el-calor.webp',
    bannerCaption: "Más del 80 % de la estructura del SR-71 era de titanio, un metal ligero que resiste temperaturas superiores a 300 °C.",
    title: "Titanio: el metal que soportó el calor",
    color: '#8A7A66',
    btnImage: '/assets/area51/infographic_m2/btn_a51m2-titanio-metal-contra-el-calor.webp',
    image: '/assets/area51/infographic_m2/hero_a51m2-titanio-metal-contra-el-calor.webp',
    content: [
      "El titanio es un elemento químico, el número 22 de la tabla periódica, descubierto en 1791 por el clérigo y mineralogista británico William Gregor. Es un metal plateado, muy resistente y bastante más ligero que el acero: su densidad es de unos 4.5 gramos por centímetro cúbico, poco más de la mitad que la del acero. Además, no se corroe con facilidad y conserva su resistencia a temperaturas en las que el aluminio, el metal habitual de los aviones, se debilitaría peligrosamente.",
      "Por eso el titanio era la mejor opción para el A-12 y el SR-71, cuya superficie se calentaba a más de 300 grados en algunas zonas durante el vuelo a Mach 3. Según Lockheed Martin, alrededor del 85 % de la estructura del SR-71 era de titanio y sus aleaciones, y el resto de materiales compuestos. Nunca antes se había construido un avión con tanto titanio, así que los ingenieros tuvieron que inventar herramientas, técnicas de soldadura y métodos de control de calidad completamente nuevos.",
      "Trabajar con titanio dio muchos dolores de cabeza. Según Ben Rich, al principio cerca del 80 % del material que llegaba a la fábrica era tan quebradizo que había que rechazarlo. Los ingenieros descubrieron además que el metal reaccionaba con sustancias inesperadas: las herramientas recubiertas de cadmio lo dañaban, y ciertas piezas soldadas en verano fallaban más que las de invierno. La causa era que el agua usada para lavarlas tenía más cloro en verano, así que pasaron a usar agua destilada.",
      "Conseguir suficiente titanio era otro problema. Uno de los grandes productores del mineral del que se obtiene era la Unión Soviética, el mismo país al que el avión debía vigilar. Según los relatos de Lockheed y de la CIA, se usaron empresas intermediarias en otros países para comprar el metal sin revelar su destino. Así, sin saberlo, los soviéticos ayudaron a construir el avión que después vigilaría sus fronteras desde casi el borde del espacio, a más de 25 kilómetros de altura.",
      "Hoy el titanio se usa en muchísimos objetos cotidianos y científicos: implantes dentales y prótesis de cadera, porque el cuerpo humano lo tolera muy bien; motores de aviones comerciales; bicicletas de competición; relojes; e incluso naves espaciales y sondas. Lo que en los años sesenta era un material casi experimental para un avión secreto se convirtió en una pieza clave de la ingeniería moderna. Muchos avances tecnológicos siguen ese camino, del laboratorio militar a la vida diaria."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El titanio se obtiene principalmente de minerales como el rutilo y la ilmenita, pero separarlo es muy costoso porque se une con fuerza al oxígeno. El método más usado, el proceso Kroll, inventado por el metalúrgico luxemburgués William Kroll en la década de 1940, transforma el mineral en tetracloruro de titanio y luego lo reduce con magnesio a altas temperaturas. El resultado es una «esponja» de titanio porosa que después se funde para fabricar lingotes. Por eso el titanio sigue siendo caro." },
      { label: "Dato Científico", icon: "atom", text: "Todos los metales se dilatan al calentarse, y cada uno lo hace a un ritmo distinto, medido por su coeficiente de dilatación térmica. El titanio se dilata aproximadamente un tercio menos que el acero y casi tres veces menos que el aluminio por cada grado de temperatura. Aun así, con cientos de grados de diferencia entre la pista y el vuelo, el SR-71 crecía varios centímetros. Los ingenieros diseñaron uniones flexibles y paneles corrugados en las alas para que el metal pudiera expandirse sin romperse." }
    ],
    fact: "Dato verificable: en su libro de memorias «Skunk Works» (1994), Ben Rich, sucesor de Kelly Johnson al frente del departamento, relata que los problemas del titanio llevaron a Lockheed a desarrollar un riguroso sistema de control: se fabricaban piezas de prueba de cada lote de metal y se registraba cómo y cuándo se había trabajado cada componente. Ese tipo de trazabilidad de materiales es hoy una práctica básica en toda la industria aeroespacial.",
  },
  {
    id: "a51m2-have-blue-f117-b2",
    bannerImage: '/assets/area51/infographic_m2/banner_a51m2-have-blue-f117-b2.webp',
    bannerCaption: "El F-117 Nighthawk, probado en Groom Lake desde 1981, fue el primer avión operativo diseñado con tecnología stealth.",
    title: "Del Have Blue al F-117 y el B-2",
    color: '#6B6378',
    btnImage: '/assets/area51/infographic_m2/btn_a51m2-have-blue-f117-b2.webp',
    image: '/assets/area51/infographic_m2/hero_a51m2-have-blue-f117-b2.webp',
    content: [
      "En la década de 1970 los radares y misiles antiaéreos se habían vuelto tan eficaces que ni la altura ni la velocidad bastaban para sobrevivir. La guerra de Yom Kipur, en 1973, mostró que los sistemas de defensa modernos podían derribar muchísimos aviones. La agencia de investigación del Pentágono, DARPA, lanzó entonces un concurso para diseñar un avión muy difícil de detectar. Lockheed lo ganó con un diseño apodado «Hopeless Diamond» (diamante sin esperanza), porque parecía que nunca podría volar.",
      "El problema era que las formas facetadas que minimizaban el eco de radar eran muy inestables en vuelo. La solución llegó gracias a las computadoras: un sistema de control electrónico, llamado «fly-by-wire», corregía los movimientos del avión muchísimas veces por segundo para mantenerlo estable. El demostrador, llamado Have Blue, voló por primera vez en el Área 51 en diciembre de 1977. Se construyeron dos ejemplares, y ambos se perdieron en accidentes durante las pruebas, sin víctimas mortales.",
      "Las pruebas demostraron que la idea funcionaba, y la Fuerza Aérea encargó el F-117 Nighthawk. Voló por primera vez en Groom Lake el 18 de junio de 1981 y entró en servicio en 1983, operando de noche desde la base de Tonopah, también en Nevada. Para proteger el secreto, sus pilotos vivían en Tonopah durante la semana y regresaban con sus familias los fines de semana. Su existencia se anunció públicamente en noviembre de 1988. Se fabricaron 59 aviones de serie.",
      "Muchos libros y videojuegos llamaron al F-117 «caza furtivo», pero en realidad era un avión de ataque: no llevaba radar propio ni armas para combatir contra otros aviones, sino bombas guiadas por láser dentro de una bodega interna. Llevar las armas colgadas por fuera habría arruinado su forma y aumentado mucho su eco de radar. Durante la Guerra del Golfo de 1991 atacó objetivos fuertemente defendidos en Irak, y su silueta angulosa se volvió famosa en todo el mundo.",
      "El siguiente paso fue el B-2 Spirit, un bombardero con forma de ala volante, sin cola, con unos 52 metros de envergadura. Fue desarrollado por Northrop, presentado en noviembre de 1988 y voló por primera vez en 1989 desde Palmdale, California. Gracias a computadoras más potentes, ya no necesitaba facetas planas y podía tener superficies curvas. Sólo se construyeron 21 por su altísimo costo. Su heredero, el B-21 Raider, se presentó en diciembre de 2022 y voló por primera vez en 2023."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Para calcular el eco de radar de cada diseño, los ingenieros de Lockheed crearon un programa de computadora llamado ECHO 1, basado en las ecuaciones del físico soviético Pyotr Ufimtsev. Después comprobaron sus predicciones con modelos a escala colocados sobre un poste en un campo de pruebas de radar en el desierto de California. Según Ben Rich, el modelo del «Hopeless Diamond» devolvía un eco tan pequeño como el de una bolita metálica del tamaño de un ojo humano." },
      { label: "Dato Científico", icon: "atom", text: "Los aviones furtivos no sólo deben reducir su eco de radar. También deben controlar su firma infrarroja, es decir, el calor que emiten, porque algunos misiles se guían por el calor de los motores. Por eso el F-117 y el B-2 tienen las salidas de sus motores aplanadas y escondidas sobre el ala, donde los gases calientes se mezclan con aire frío antes de salir. También se reduce el ruido y se intenta evitar las estelas de condensación, que podrían delatar al avión en un cielo despejado." }
    ],
    fact: "Dato verificable: en el Museo Nacional de la Fuerza Aérea de Estados Unidos, en Dayton, Ohio, se exhiben un F-117, un SR-71 y un B-2 utilizado en pruebas. Los visitantes pueden comparar a simple vista la diferencia entre las facetas planas del F-117 y las curvas suaves del B-2, dos generaciones de la misma idea física: devolver hacia la antena del radar la menor cantidad de energía posible y así ser detectado lo más tarde posible.",
  },
  {
    id: "a51m2-drones-secretos-y-legado",
    bannerImage: '/assets/area51/infographic_m2/banner_a51m2-drones-secretos-y-legado.webp',
    bannerCaption: "El D-21, un dron supersónico sin piloto de los años 60, se lanzaba desde un M-21 de la familia Blackbird o desde un B-52.",
    title: "Drones, secretos y legado",
    color: '#5F7466',
    btnImage: '/assets/area51/infographic_m2/btn_a51m2-drones-secretos-y-legado.webp',
    image: '/assets/area51/infographic_m2/hero_a51m2-drones-secretos-y-legado.webp',
    content: [
      "Uno de los proyectos más audaces fue el D-21, un dron de reconocimiento sin piloto capaz de volar a más de tres veces la velocidad del sonido. Al principio se lanzaba desde el lomo de un M-21, una variante especial del A-12 con dos tripulantes. En julio de 1966, durante un lanzamiento de prueba, el dron chocó con el avión nodriza: los dos tripulantes se eyectaron sobre el mar, pero uno de ellos, Ray Torick, murió ahogado. Tras ese accidente se cancelaron los lanzamientos desde el M-21.",
      "A partir de entonces el D-21 se lanzó desde bajo las alas de bombarderos B-52, con un cohete acelerador que lo llevaba a velocidad supersónica. Volaba una ruta programada, tomaba fotografías y luego soltaba su cámara en una cápsula con paracaídas para que un avión la recogiera en el aire. Entre 1969 y 1971 hizo cuatro misiones operativas sobre China, pero ninguna logró recuperar la película. El programa se canceló en 1971, aunque demostró que el reconocimiento sin piloto era posible.",
      "Los drones modernos que usan hoy los ejércitos, los científicos y hasta los aficionados son mucho más sencillos y baratos, pero heredan ideas de aquellos experimentos: navegación automática, sensores a bordo y misiones peligrosas sin arriesgar vidas humanas. La NASA, por ejemplo, ha usado drones de gran altitud para estudiar huracanes, y en 2021 el pequeño helicóptero Ingenuity se convirtió en la primera aeronave en realizar un vuelo propulsado y controlado en otro planeta: Marte.",
      "Trabajar en estos programas significaba vivir con secretos. Muchos ingenieros, mecánicos y pilotos firmaron acuerdos de confidencialidad que les impedían contar a sus familias en qué trabajaban. Algunos sólo pudieron hablar de su labor décadas después, cuando los programas fueron desclasificados. En 2007 la CIA reunió a veteranos del programa OXCART y colocó un A-12 frente a su sede en Virginia como homenaje, y muchos contaron historias que habían guardado durante más de cuarenta años.",
      "La historia de los aviones del Área 51 enseña algo valioso para el pensamiento crítico. Los objetos extraños que la gente veía en el cielo de Nevada existían de verdad, pero no eran naves de otros mundos, sino máquinas diseñadas por personas con lápiz, regla, computadoras y mucha creatividad. Cuando falta información, la imaginación tiende a llenar el vacío con explicaciones fantásticas. La ciencia, en cambio, espera a tener pruebas, y en este caso todas las pruebas apuntan a la ingeniería humana."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Algunos D-21 sobrevivieron y hoy se exhiben en museos. Restos de uno de los drones que se perdieron sobre China fueron recuperados en ese país y, décadas después, se expusieron en el Museo de la Aviación de China, cerca de Pekín. Sus fotografías nunca regresaron a Estados Unidos. Mientras tanto, otros ejemplares se conservan en museos estadounidenses, como el Museo de Vuelo de Seattle, donde un D-21 está montado sobre el único M-21 que sobrevive." },
      { label: "Dato Científico", icon: "atom", text: "Un dron de reconocimiento necesita saber dónde está sin ayuda humana. En los años sesenta no existía el GPS, así que el D-21 usaba un sistema de navegación inercial: giróscopos y acelerómetros que medían cada giro y cada cambio de velocidad, y una computadora que calculaba la posición sumando esos movimientos desde el punto de partida. El problema es que los pequeños errores se acumulan con el tiempo. Por eso hoy los drones combinan la navegación inercial con señales de satélite." }
    ],
    fact: "Dato verificable: el sistema GPS que hoy usan los teléfonos fue desarrollado por el Departamento de Defensa de Estados Unidos; su primer satélite de prueba se lanzó en 1978 y el sistema se declaró plenamente operativo en 1995. En 1983, después de que un avión de pasajeros coreano fuera derribado al desviarse sobre territorio soviético, el presidente Ronald Reagan anunció que el GPS se abriría al uso civil. Así, una tecnología militar terminó en nuestro bolsillo.",
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
      hue: Math.random() > 0.5 ? '156,143,90' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(156,143,90,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradArea51M2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6A7570", "#5E6E7E", "#7F6A5C", "#4E5966", "#8A7A66", "#6B6378", "#5F7466"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#9C8F5A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#9C8F5A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradArea51M2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(156,143,90,0.2)" />
            <stop offset="50%" stopColor="rgba(156,143,90,0.9)" />
            <stop offset="100%" stopColor="rgba(156,143,90,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9C8F5A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LOS AVIONES MÁS SECRETOS DEL MUNDO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(156,143,90,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ÁREA 51 · PENSAMIENTO CRÍTICO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(156,143,90,0.2)'}`,
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
          layoutId="activeDotArea51M2"
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
      border: '1px solid rgba(156,143,90,0.15)',
    }}>
      <Star size={14} style={{ color: '#9C8F5A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #9C8F5A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(156,143,90,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9C8F5A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_Area51M2() {
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
      border: '1px solid rgba(156,143,90,0.12)',
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
            textAlign: 'center', color: 'rgba(156,143,90,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(156,143,90,0.08)', borderRadius: '16px',
              border: '1px solid rgba(156,143,90,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9C8F5A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Ingeniero Stealth: del U-2 al F-117, la ingeniería real detrás del misterio
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
