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
  "Jones, E. M. y Glover, K. (eds.). Apollo Lunar Surface Journal: Apollo 11. NASA History Office (hq.nasa.gov/alsj).",
  "Hansen, J. R. (2005). First Man: The Life of Neil A. Armstrong. Nueva York: Simon & Schuster.",
  "Collins, M. (1974). Carrying the Fire: An Astronaut's Journeys. Nueva York: Farrar, Straus and Giroux.",
  "Chaikin, A. (1994). A Man on the Moon: The Voyages of the Apollo Astronauts. Nueva York: Viking.",
  "Naciones Unidas (1967). Tratado sobre los principios que deben regir las actividades de los Estados en la exploración y utilización del espacio ultraterrestre (Tratado del Espacio Ultraterrestre), artículo II. UNOOSA.",
  "Smithsonian National Air and Space Museum. Command Module Columbia, Apollo 11 (airandspace.si.edu)."
];

const INFOGRAPHIC_NODES = [
  {
    id: "a11-escalerilla-eagle",
    bannerImage: '/assets/apollo11/infographic_m4/banner_a11-escalerilla-eagle.webp',
    bannerCaption: "El 21 de julio de 1969, a las 02:56:15 UTC, Neil Armstrong apoyó su bota izquierda en el Mar de la Tranquilidad.",
    title: "Bajando la escalerilla del Eagle",
    color: '#5B6C8F',
    btnImage: '/assets/apollo11/infographic_m4/btn_a11-escalerilla-eagle.webp',
    image: '/assets/apollo11/infographic_m4/hero_a11-escalerilla-eagle.webp',
    content: [
      "El Módulo Lunar Eagle aterrizó en el Mar de la Tranquilidad el 20 de julio de 1969 a las 20:17 UTC. Neil Armstrong y Buzz Aldrin no salieron de inmediato: el plan exigía revisar los sistemas, comer y preparar el equipo antes de abrir la escotilla. Ponerse los trajes y las mochilas de soporte vital dentro de una cabina tan estrecha les tomó varias horas. Armstrong salió primero, de espaldas y a gatas, porque la escotilla era baja y la mochila sobresalía de su espalda.",
      "La escalerilla estaba fijada a la pata delantera del Eagle. El último peldaño quedaba aproximadamente a un metro del plato de esa pata, porque el aterrizaje fue tan suave que los amortiguadores casi no se comprimieron. Armstrong bajó al plato, comprobó que podía volver a subir y describió el suelo antes de pisarlo. En esa misma pata había una placa con este texto: «Aquí, hombres del planeta Tierra pusieron pie por primera vez en la Luna. Julio de 1969 d. C. Vinimos en paz en nombre de toda la humanidad».",
      "El traje espacial A7L y la mochila de soporte vital pesaban juntos unos 81 kilogramos en la Tierra. La gravedad de la Luna es aproximadamente una sexta parte de la terrestre, así que ese equipo se sentía como unos 13.5 kilogramos. La mochila suministraba oxígeno, retiraba el dióxido de carbono y hacía circular agua fría por tubos cosidos en una prenda interior. Sin ese sistema de enfriamiento, el calor del Sol y del propio cuerpo se habría acumulado rápidamente dentro del traje.",
      "Mientras bajaba, Armstrong tiró de una anilla que abrió un compartimento lateral del Eagle llamado MESA. Allí iba una cámara de televisión en blanco y negro que apuntaba hacia la escalerilla. La señal recorrió unos 384,000 kilómetros hasta antenas en la Tierra, entre ellas la estación de Honeysuckle Creek y el radiotelescopio de Parkes, ambos en Australia. Se estima que unos 600 millones de personas, cerca de una sexta parte de la población mundial de entonces, vieron la transmisión en directo.",
      "El primer contacto con el suelo lunar ocurrió a las 02:56:15 UTC del 21 de julio, cuando en Houston todavía era la noche del 20 de julio. Armstrong apoyó primero su bota izquierda. Habían pasado unas seis horas y media desde el aterrizaje. En ese momento, Michael Collins orbitaba la Luna en solitario a bordo del módulo de mando Columbia. Él no pudo ver las imágenes, porque su nave no recibía la señal de televisión; seguía la caminata solo por radio cuando pasaba por el lado visible."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Armstrong salió de espaldas porque la mochila de soporte vital casi rozaba el marco de la escotilla, y Aldrin lo guiaba desde dentro indicándole hacia dónde moverse. Unos 19 minutos después salió Aldrin. Al dejar la escotilla entornada, comentó por radio que se aseguraba de no cerrarla con llave al salir, una broma que mostraba lo importante que era poder volver a entrar." },
      { label: "Dato Científico", icon: "atom", text: "La masa del traje no cambió al llegar a la Luna: seguía siendo de unos 81 kilogramos. Lo que cambió fue su peso, que es la fuerza con la que la gravedad atrae esa masa. En la Tierra la gravedad acelera los objetos a 9.81 m/s² y en la Luna a 1.62 m/s². Por eso el traje pesaba menos, pero costaba lo mismo frenarlo o cambiarlo de dirección, porque la inercia depende de la masa." }
    ],
    fact: "La NASA programó el aterrizaje para la mañana lunar en el sitio elegido, con el Sol a poco más de 10 grados sobre el horizonte. Con el Sol bajo, las rocas y los cráteres proyectaban sombras largas que ayudaban a ver el relieve, y el suelo todavía no había alcanzado las altas temperaturas del mediodía lunar. Un día lunar completo dura unos 29.5 días terrestres.",
  },
  {
    id: "a11-pequeno-paso",
    bannerImage: '/assets/apollo11/infographic_m4/banner_a11-pequeno-paso.webp',
    bannerCaption: "Armstrong describió el suelo como un polvo fino que se pegaba en capas a sus botas, «como carbón en polvo».",
    title: "Un pequeño paso y el suelo lunar",
    color: '#7A6F5A',
    btnImage: '/assets/apollo11/infographic_m4/btn_a11-pequeno-paso.webp',
    image: '/assets/apollo11/infographic_m4/hero_a11-pequeno-paso.webp',
    content: [
      "Al pisar la superficie, Armstrong dijo en inglés: «That's one small step for man, one giant leap for mankind». En español significa: «Es un pequeño paso para el hombre, un salto gigante para la humanidad». Armstrong explicó después que su intención era decir «un hombre», con el artículo «a» en inglés, para referirse a sí mismo como persona. En la grabación ese artículo no se escucha con claridad, y por eso la frase aparece escrita de dos maneras en distintos libros.",
      "Según Armstrong, pensó la frase durante las horas que pasaron entre el aterrizaje y la caminata. La idea compara dos escalas: el paso de una sola persona, que mide menos de un metro, y lo que ese paso representaba para toda la especie humana. Era la primera vez que alguien caminaba sobre un cuerpo celeste distinto de la Tierra. Doce astronautas en total caminaron sobre la Luna entre 1969 y 1972, durante seis misiones del programa Apollo.",
      "Lo primero que Armstrong describió fue el suelo. Dijo que era fino y polvoriento, que podía levantarlo con la punta de la bota y que se pegaba en capas finas a las suelas y los costados, como carbón en polvo. Los geólogos llaman regolito a esa capa. Se formó durante miles de millones de años por el impacto de meteoritos, grandes y diminutos, que trituraron la roca y fundieron parte de ella en pequeñas gotas de vidrio. En los mares lunares el regolito tiene varios metros de espesor.",
      "Las huellas de las botas quedaron marcadas con bordes nítidos. En la Luna no hay viento ni lluvia que las borren, porque casi no existe atmósfera. Lo único que las desgasta es la lluvia constante de micrometeoritos, un proceso tan lento que las huellas pueden durar millones de años. Aldrin fotografió una de sus propias huellas para estudiar cómo se compactaba el suelo bajo el peso de un astronauta. Esa imagen, catalogada como AS11-40-5878, se convirtió en una de las más conocidas de la misión.",
      "Caminar con una sexta parte del peso habitual exigía aprender de nuevo. Aldrin probó varias formas de moverse frente a la cámara, incluido un salto con ambos pies parecido al de un canguro, y concluyó que lo más cómodo era un trote largo. Armstrong se alejó unos 60 metros del Eagle para observar un cráter que hoy se llama Little West. Entre 2009 y 2012, la sonda Lunar Reconnaissance Orbiter fotografió el sitio desde la órbita y en las imágenes se distinguen los senderos oscuros que dejaron ambos astronautas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 2006, un análisis por computadora de la grabación sugirió que el artículo «a» sí estaba presente, pero demasiado breve para oírse. Otros especialistas en audio revisaron la cinta y no llegaron a la misma conclusión. Armstrong comentó que esperaba que la historia le concediera esa sílaba, porque era lo que había querido decir, aunque reconoció que no podía oírla." },
      { label: "Dato Científico", icon: "atom", text: "Los granos del regolito lunar tienen bordes afilados, como pequeños cristales rotos, porque no hay agua ni viento que los redondeen. Ese polvo rayaba los visores, se metía en los cierres de los trajes y se pegaba a todo por carga eléctrica. Varios astronautas del programa Apollo dijeron que, al volver a la cabina, el polvo olía como pólvora quemada." }
    ],
    fact: "La caminata de Armstrong hasta el cráter Little West, a unos 60 metros del Eagle, fue el punto más lejano que alcanzó un astronauta del Apollo 11. Las misiones siguientes llegaron mucho más lejos: con el vehículo lunar Rover, la tripulación del Apollo 17 se alejó varios kilómetros del módulo. Las imágenes de la sonda LRO permiten comparar todos esos recorridos desde la órbita.",
  },
  {
    id: "a11-aldrin-bandera",
    bannerImage: '/assets/apollo11/infographic_m4/banner_a11-aldrin-bandera.webp',
    bannerCaption: "Buzz Aldrin bajó unos 19 minutos después de Armstrong y describió el paisaje como «desolación magnífica».",
    title: "Aldrin, la bandera y la placa",
    color: '#8C7B6B',
    btnImage: '/assets/apollo11/infographic_m4/btn_a11-aldrin-bandera.webp',
    image: '/assets/apollo11/infographic_m4/hero_a11-aldrin-bandera.webp',
    content: [
      "Buzz Aldrin bajó por la escalerilla unos 19 minutos después de Armstrong. Al mirar alrededor, dijo en inglés «magnificent desolation», que significa «desolación magnífica». La frase describe un paisaje sin vida, sin agua y sin color, bajo un cielo negro incluso de día, pero con una belleza que lo impresionó. Aldrin era ingeniero y tenía un doctorado en astronáutica del MIT; su tesis trató sobre técnicas de encuentro orbital entre naves, un tema clave para volver al Columbia.",
      "La mayoría de las fotografías del Apollo 11 en la superficie muestran a Aldrin y no a Armstrong. La razón es práctica: Armstrong llevó la cámara Hasselblad de 70 milímetros durante casi toda la caminata. Por eso, en la famosa foto de Aldrin de frente, Armstrong aparece reflejado en el visor dorado del casco de su compañero. Las cámaras usaban película fotográfica en cartuchos, y esos carretes viajaron de vuelta a la Tierra para revelarse en Houston.",
      "Los astronautas plantaron una bandera de Estados Unidos hecha de nailon. Como en la Luna no hay aire que la mueva, la bandera tenía una barra horizontal en la parte superior para mantenerla extendida. Esa barra no se desplegó por completo, y la tela quedó con arrugas que parecen ondas. El mástil apenas entró unos centímetros, porque el suelo se endurecía bajo la capa superficial. Al despegar, el chorro del motor de ascenso derribó la bandera, según contó Aldrin.",
      "Plantar una bandera no significó reclamar la Luna. El Tratado del Espacio Ultraterrestre de 1967, firmado por Estados Unidos y la Unión Soviética, establece en su artículo II que ningún país puede apropiarse de la Luna ni de otros cuerpos celestes. Los astronautas también dejaron un disco de silicio con mensajes de líderes de 73 países, una rama de olivo dorada, un parche de la misión Apollo 1 y medallas en honor a los cosmonautas soviéticos Yuri Gagarin y Vladimir Komarov.",
      "Durante la caminata, el presidente Richard Nixon habló con los astronautas desde la Oficina Oval, en Washington. La conversación viajó por radio hasta la Luna y duró unos dos minutos. Nixon la describió como la llamada telefónica más histórica jamás realizada. Mientras hablaban, Armstrong y Aldrin permanecían de pie junto a la bandera, frente a la cámara de televisión. La caminata completa duró unas dos horas y media: la escotilla se abrió a las 02:39 UTC y se cerró a las 05:11 UTC."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El disco de silicio que quedó en la Luna mide unos 3.8 centímetros, más o menos lo mismo que una moneda grande. Sus mensajes se grabaron con la misma técnica que se usaba para fabricar circuitos electrónicos, reduciendo cada texto unas 200 veces. Para leerlo se necesita un microscopio. Hoy sigue en el Mar de la Tranquilidad, junto a la etapa de descenso del Eagle." },
      { label: "Dato Científico", icon: "atom", text: "El cielo lunar es negro aun con el Sol arriba porque no hay atmósfera que disperse la luz. En la Tierra, las moléculas del aire dispersan sobre todo la luz azul, y por eso el cielo diurno se ve azul. En la Luna la luz viaja en línea recta sin rebotar, y las sombras son muy oscuras porque nada ilumina las zonas que el Sol no toca directamente." }
    ],
    fact: "La escotilla del Eagle se abrió a las 02:39 UTC y se cerró a las 05:11 UTC del 21 de julio de 1969. Por eso la actividad fuera del módulo duró unas 2 horas y 31 minutos. En esa salida, Aldrin volvió a entrar primero y Armstrong lo siguió. Las misiones posteriores hicieron caminatas mucho más largas: en el Apollo 17, una sola salida superó las 7 horas.",
  },
  {
    id: "a11-muestras-easep",
    bannerImage: '/assets/apollo11/infographic_m4/banner_a11-muestras-easep.webp',
    bannerCaption: "La tripulación reunió 21.5 kg de muestras e instaló un sismómetro y un retrorreflector láser que todavía se usa.",
    title: "Rocas lunares y experimentos",
    color: '#6B8E7F',
    btnImage: '/assets/apollo11/infographic_m4/btn_a11-muestras-easep.webp',
    image: '/assets/apollo11/infographic_m4/hero_a11-muestras-easep.webp',
    content: [
      "Una de las primeras tareas de Armstrong fue tomar una muestra de contingencia: una pequeña bolsa de suelo y piedras recogida con una pala de mango largo. El objetivo era asegurar que algo de material lunar llegara a la Tierra aunque la caminata tuviera que interrumpirse de repente. Guardó la bolsa en un bolsillo del traje, a la altura del muslo. Más tarde, con la caminata ya asegurada, los dos astronautas llenaron cajas metálicas selladas con rocas y regolito.",
      "En total, el Apollo 11 trajo 21.5 kilogramos de material lunar. Las rocas eran sobre todo basaltos, es decir, lava solidificada que llenó los grandes mares lunares hace más de 3,500 millones de años. También clavaron dos tubos en el suelo para obtener columnas de regolito sin mezclar sus capas. En esas rocas se descubrió un mineral nuevo, rico en titanio, al que llamaron armalcolita, uniendo las primeras letras de los apellidos Armstrong, Aldrin y Collins.",
      "Los astronautas instalaron un pequeño paquete de experimentos. El sismómetro pasivo funcionaba con paneles solares y registraba vibraciones del suelo causadas por impactos de meteoritos o por movimientos internos de la Luna. Operó durante unas tres semanas, hasta que dejó de responder a las órdenes desde la Tierra. Los sismómetros que llevaron misiones posteriores funcionaron hasta 1977 y mostraron que la Luna tiene sismos débiles y que su interior está formado por capas.",
      "El experimento que sigue en uso es el retrorreflector láser: un panel de unos 46 centímetros con 100 prismas de sílice fundida. Cada prisma devuelve la luz exactamente en la dirección de la que llegó. Observatorios en la Tierra disparan pulsos de láser hacia el panel y miden cuánto tarda la luz en ir y volver, unos 2.5 segundos. Con ese tiempo calculan la distancia con un error de milímetros, y así descubrieron que la Luna se aleja de la Tierra unos 3.8 centímetros cada año.",
      "Las muestras del Apollo 11 se guardan hoy en el Laboratorio de Muestras Lunares del Centro Espacial Johnson, en Houston, en gabinetes con nitrógeno puro para evitar que el oxígeno y la humedad las alteren. La NASA presta pequeñas porciones a científicos de todo el mundo. Además, guardó parte de las muestras de varias misiones sin abrir, esperando mejores instrumentos: en 2022 abrió un tubo del Apollo 17 que había permanecido sellado desde 1972 para estudiarlo con técnicas modernas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La armalcolita se identificó por primera vez en las rocas del Apollo 11 y se pensó que era exclusiva de la Luna. Años después se encontraron pequeñas cantidades en rocas de la Tierra, por ejemplo en Groenlandia y en Sudáfrica. Es un óxido de titanio, hierro y magnesio que se forma con poca presión y altas temperaturas, condiciones que se dan en lavas que se enfrían rápido." },
      { label: "Dato Científico", icon: "atom", text: "Un pulso de láser enviado a la Luna se ensancha durante el viaje y, al llegar, cubre una zona de varios kilómetros. Solo una fracción mínima de la luz cae sobre el panel, y una fracción todavía menor vuelve al telescopio. A menudo los observatorios detectan apenas un fotón de regreso por cada muchos pulsos enviados, y por eso necesitan detectores muy sensibles y miles de disparos." }
    ],
    fact: "Además de la bandera, Aldrin desplegó una hoja de aluminio en un mástil para atrapar partículas del viento solar. Ese experimento lo diseñó la Universidad de Berna, en Suiza, y fue el único del Apollo 11 creado fuera de Estados Unidos. La hoja estuvo expuesta al Sol durante algo más de una hora y regresó a la Tierra para medir los gases nobles atrapados, como helio y neón.",
  },
  {
    id: "a11-columbia-cabina",
    bannerImage: '/assets/apollo11/infographic_m4/banner_a11-columbia-cabina.webp',
    bannerCaption: "El módulo de mando Columbia medía 3.9 m de diámetro en su base y fue la única parte del Apollo 11 que volvió a la Tierra.",
    title: "Columbia: la cabina de regreso",
    color: '#7F6A8C',
    btnImage: '/assets/apollo11/infographic_m4/btn_a11-columbia-cabina.webp',
    image: '/assets/apollo11/infographic_m4/hero_a11-columbia-cabina.webp',
    content: [
      "El módulo de mando Columbia tenía forma de cono, con 3.9 metros de diámetro en su base y unos 3.2 metros de altura. Dentro, el espacio habitable era de apenas unos 6 metros cúbicos, más o menos el interior de un automóvil familiar. Allí viajaron tres adultos con sus trajes, su comida, sus instrumentos y sus cámaras. De todo el cohete Saturno V, que medía 110 metros de altura al despegar, el Columbia fue la única pieza que regresó entera a la Tierra.",
      "La misión Apollo 11 duró 8 días, 3 horas y 18 minutos: despegó el 16 de julio de 1969 desde el Centro Espacial Kennedy, en Florida, y terminó con el amerizaje del 24 de julio en el océano Pacífico. Durante casi todo ese tiempo los astronautas vivieron en el Columbia. Tenían tres asientos reclinables, un panel de control con cientos de interruptores, ventanillas pequeñas y una zona bajo los asientos donde guardaban equipo y podían dormir en sacos sujetos a la pared.",
      "Unido al Columbia viajaba el módulo de servicio, un cilindro con el motor principal, los tanques de combustible, el oxígeno y las celdas de combustible. Esas celdas combinaban hidrógeno y oxígeno para producir electricidad, y el agua resultante servía para beber y preparar alimentos deshidratados. El módulo de servicio no tenía escudo térmico. Por eso se separó del Columbia poco antes de entrar en la atmósfera y se destruyó al caer, mientras la cápsula seguía su descenso.",
      "Michael Collins fue el piloto del módulo de mando. Mientras Armstrong y Aldrin estaban en la superficie, él permaneció solo en el Columbia, en órbita a unos 110 kilómetros de altura. Cada vez que pasaba por detrás de la Luna perdía el contacto por radio con la Tierra durante unos 48 minutos. El nombre Columbia hace referencia a la figura que simbolizaba a Estados Unidos y al cañón Columbiad de la novela de Julio Verne «De la Tierra a la Luna», publicada en 1865.",
      "Hoy el Columbia se exhibe en el Museo Nacional del Aire y el Espacio del Smithsonian, en Washington. Entre 2017 y 2019 recorrió varias ciudades de Estados Unidos en una exposición itinerante. El escudo térmico de su base todavía muestra las marcas oscuras del calor de la reentrada. En 2016, el museo escaneó la cápsula en tres dimensiones y encontró inscripciones a lápiz que la tripulación había dejado en las paredes interiores, incluidos calendarios y notas de navegación."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Antes de abandonar el Columbia, Michael Collins escribió a mano un mensaje en una pared del compartimento inferior de equipo. Decía, en inglés, que la nave 107, alias Apollo 11, alias Columbia, era la mejor nave salida de la línea de producción, y terminaba con su firma como piloto del módulo de mando. El texto quedó oculto durante décadas hasta el escaneo de 2016." },
      { label: "Dato Científico", icon: "atom", text: "Una celda de combustible produce electricidad sin quemar nada. El hidrógeno entrega electrones en un electrodo, esos electrones viajan por un circuito y alimentan los aparatos, y en el otro electrodo se unen al oxígeno. El resultado es corriente eléctrica, calor y agua pura. El Apollo usaba tres celdas de este tipo, y bastaba una sola para traer a la tripulación de vuelta si las otras fallaban." }
    ],
    fact: "En la novela de Julio Verne, el proyectil que viaja a la Luna se lanza desde Florida, lleva a tres tripulantes y regresa amerizando en el océano Pacífico, donde lo recupera un barco de la Marina de Estados Unidos. Más de un siglo después, el Apollo 11 despegó también de Florida con tres astronautas y terminó su viaje en el Pacífico, rescatado por el portaaviones USS Hornet.",
  },
  {
    id: "a11-escudo-avcoat",
    bannerImage: '/assets/apollo11/infographic_m4/banner_a11-escudo-avcoat.webp',
    bannerCaption: "El escudo de AVCOAT se quemaba de forma controlada; en la reentrada la tripulación soportó un máximo de unos 6.5 G.",
    title: "El escudo AVCOAT y los 6.5 G",
    color: '#8F6B5B',
    btnImage: '/assets/apollo11/infographic_m4/btn_a11-escudo-avcoat.webp',
    image: '/assets/apollo11/infographic_m4/hero_a11-escudo-avcoat.webp',
    content: [
      "El Columbia volvió a la atmósfera a unos 11 kilómetros por segundo, casi 40,000 kilómetros por hora. A esa velocidad, el aire delante de la cápsula se comprime tanto que se calienta a miles de grados. Ningún metal disponible en 1969 podía soportar ese calor durante varios minutos sin fundirse. La solución fue un escudo térmico ablativo: un material diseñado para quemarse poco a poco y llevarse el calor consigo, en lugar de dejarlo pasar hacia la cabina.",
      "El material se llamaba AVCOAT y lo fabricó la empresa Avco. Era una resina epoxi mezclada con otros compuestos, inyectada en una estructura en forma de panal de abeja hecha de fibra de vidrio. Según la NASA, el escudo del Apollo tenía unas 370,000 celdas de panal, y técnicos especializados las rellenaron una por una. El escudo era más grueso en la base de la cápsula, que es la parte que recibe el aire de frente durante la reentrada.",
      "La ablación funciona en varias etapas. Al calentarse, la capa exterior del AVCOAT se convierte en carbón y desprende gases. Esos gases forman una capa entre el aire caliente y el escudo, y bloquean parte del calor. El carbón que queda en la superficie actúa como aislante y se desgasta lentamente. Cada gramo de material que se quema absorbe energía. Así, la temperatura exterior podía superar los 2,000 °C mientras que la cabina se mantenía a una temperatura cómoda para los astronautas.",
      "Frenar desde 40,000 kilómetros por hora en pocos minutos produce una fuerte desaceleración. Los ingenieros la miden en G, donde 1 G es el peso normal en la Tierra. Durante la reentrada del Apollo 11, la tripulación soportó un máximo de unos 6.5 G: cada parte del cuerpo pesaba 6.5 veces más de lo normal. Un brazo de 4 kilogramos se sentía como uno de 26. Después de ocho días casi sin peso, ese esfuerzo hacía difícil levantar los brazos o incluso respirar profundamente.",
      "El Columbia no caía como una piedra. Su centro de masa estaba desplazado hacia un lado, y eso hacía que la cápsula volara un poco inclinada y generara sustentación, como un ala muy pequeña. Al girar sobre sí misma, la computadora dirigía esa fuerza hacia arriba, hacia abajo o hacia los lados para controlar la trayectoria. La entrada debía hacerse con un ángulo de unos 6.5 grados: con un ángulo mayor, la frenada sería peligrosa; con uno menor, la cápsula rebotaría en la atmósfera."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La nave Orion del programa Artemis también usa AVCOAT en su escudo térmico, aunque ahora se fabrica en bloques en lugar de rellenar celdas una por una. Tras el vuelo Artemis I, en 2022, los ingenieros vieron que el escudo había perdido más material carbonizado del previsto. Después de estudiarlo, la NASA decidió ajustar la trayectoria de reentrada para las siguientes misiones." },
      { label: "Dato Científico", icon: "atom", text: "La energía de movimiento de un objeto crece con el cuadrado de su velocidad. Si la velocidad se duplica, la energía se multiplica por cuatro. El Columbia, de unas 5.5 toneladas, llegaba a la Tierra unas cuarenta veces más rápido que un avión comercial, así que su energía por kilogramo era unas 1,900 veces mayor. La reentrada consiste en convertir toda esa energía en calor y disiparla lejos de la cabina." }
    ],
    fact: "Durante la reentrada los astronautas estaban acostados boca arriba en sus asientos, con la espalda hacia el escudo térmico. Así, la desaceleración los empujaba del pecho hacia la espalda, la dirección que el cuerpo humano tolera mejor. En esa postura la sangre no se desplaza hacia los pies ni hacia la cabeza, y se reduce el riesgo de perder la visión o el conocimiento.",
  },
  {
    id: "a11-amerizaje-hornet",
    bannerImage: '/assets/apollo11/infographic_m4/banner_a11-amerizaje-hornet.webp',
    bannerCaption: "El 24 de julio de 1969, el Columbia amerizó en el Pacífico a unos 24 km del portaaviones USS Hornet.",
    title: "Amerizaje junto al USS Hornet",
    color: '#5E7A8A',
    btnImage: '/assets/apollo11/infographic_m4/btn_a11-amerizaje-hornet.webp',
    image: '/assets/apollo11/infographic_m4/hero_a11-amerizaje-hornet.webp',
    content: [
      "El Columbia amerizó el 24 de julio de 1969 a las 16:50 UTC en el océano Pacífico, al suroeste de Hawái. Dos días antes, los meteorólogos detectaron tormentas en la zona prevista, y la NASA trasladó el punto de amerizaje unos 400 kilómetros. Aun con ese cambio, la cápsula cayó a unos 24 kilómetros del portaaviones USS Hornet, que esperaba para recogerla. Para un viaje de más de 760,000 kilómetros de ida y vuelta, esa diferencia demostró la precisión de la navegación.",
      "Al tocar el agua, la cápsula quedó boca abajo, con la punta sumergida. Los ingenieros habían previsto esa situación, que llamaban «Estable 2». En la parte superior había tres bolsas que se inflaban con aire comprimido. Los astronautas las activaron y, en unos minutos, la cápsula giró hasta quedar con la punta hacia arriba. Así las antenas de radio y las luces de localización quedaron fuera del agua, y los helicópteros pudieron encontrarla con facilidad.",
      "Los nadadores de la Marina de Estados Unidos saltaron desde un helicóptero y colocaron un collar flotante alrededor de la cápsula. Uno de ellos, el teniente Clancy Hatleberg, llevaba un traje de aislamiento biológico y entregó otros tres a los astronautas por la escotilla. Una vez vestidos, Armstrong, Aldrin y Collins subieron a una balsa, donde los rociaron con un desinfectante. Después, un helicóptero los izó uno por uno en una canasta y los llevó al portaaviones.",
      "A bordo del USS Hornet, los astronautas entraron en una instalación móvil de cuarentena, una especie de remolque sellado. Nadie sabía con certeza si en la Luna podía haber microbios peligrosos, así que la NASA los aisló por precaución. El presidente Nixon los recibió en el portaaviones y habló con ellos a través de una ventana. Allí dijo que aquella había sido la semana más importante en la historia del mundo desde la Creación. La cuarentena terminó el 10 de agosto, en Houston.",
      "La misión completa duró 8 días, 3 horas, 18 minutos y 35 segundos. En ese tiempo, el Apollo 11 recorrió más de 1.5 millones de kilómetros. Armstrong y Aldrin pasaron unas 21 horas y 36 minutos en la superficie lunar, aunque solo 2 horas y 31 de ellas fuera del Eagle. Los tres regresaron con 21.5 kilogramos de muestras, cientos de fotografías y datos que los científicos siguen analizando más de cincuenta años después."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El USS Hornet también recuperó la cápsula del Apollo 12 en noviembre de 1969. Hoy el portaaviones está retirado y funciona como museo en Alameda, California, cerca de San Francisco. A bordo se puede visitar una instalación móvil de cuarentena original y ver la cubierta donde aterrizó el helicóptero que llevaba a los astronautas del Apollo 11." },
      { label: "Dato Científico", icon: "atom", text: "Los paracaídas redujeron la velocidad del Columbia a unos 35 kilómetros por hora antes de tocar el agua. El agua amortigua el golpe porque se deforma y se aparta, y reparte la fuerza durante un tiempo más largo que un suelo sólido. Por eso las cápsulas Apollo amerizaban en el océano: un aterrizaje en tierra a esa velocidad habría exigido cohetes de frenado o bolsas de aire adicionales." }
    ],
    fact: "La cuarentena se aplicó solo a las tripulaciones del Apollo 11, el Apollo 12 y el Apollo 14. Los análisis de las muestras y las pruebas con plantas y animales en laboratorio no mostraron ningún microorganismo lunar. Por eso la NASA eliminó la cuarentena a partir del Apollo 15, en 1971, y los astronautas siguientes pudieron reunirse con sus familias poco después de volver.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradApollo11M4)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B6C8F", "#7A6F5A", "#8C7B6B", "#6B8E7F", "#7F6A8C", "#8F6B5B", "#5E7A8A"];
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
          <linearGradient id="gradApollo11M4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(201,179,126,0.2)" />
            <stop offset="50%" stopColor="rgba(201,179,126,0.9)" />
            <stop offset="100%" stopColor="rgba(201,179,126,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C9B37E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DE LA PRIMERA HUELLA AL AMERIZAJE</text>
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
          layoutId="activeDotApollo11M4"
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
export default function InteractiveInfographic_Apollo11M4() {
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
              🏆 Caminante Lunar: 2 horas y 31 minutos en la superficie y 8 días de misión
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
