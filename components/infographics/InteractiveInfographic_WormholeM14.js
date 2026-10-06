'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#9FB3C8', style = {} }) {
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
  "Sagan, C. (1985). Contact. Nueva York: Simon & Schuster.",
  "Morris, M. S., Thorne, K. S. (1988). «Wormholes in spacetime and their use for interstellar travel: A tool for teaching general relativity». American Journal of Physics, 56, 395–412.",
  "Thorne, K. S. (1994). Black Holes and Time Warps: Einstein's Outrageous Legacy. W. W. Norton.",
  "Sagan, C. (1994). Pale Blue Dot: A Vision of the Human Future in Space. Random House.",
  "Sagan, C. (1995). The Demon-Haunted World: Science as a Candle in the Dark. Random House.",
  "Jones, E. M. (1985). «Where is everybody? An account of Fermi's question». Los Alamos National Laboratory, informe LA-10311-MS.",
  "Davidson, K. (1999). Carl Sagan: A Life. John Wiley & Sons.",
  "Zemeckis, R. (director) (1997). Contact [película]. Warner Bros."
];

const INFOGRAPHIC_NODES = [
  {
    id: "sagan-astronomo-planetario",
    bannerImage: '/assets/wormhole/infographic_m14/banner_sagan-astronomo-planetario.webp',
    bannerCaption: "Carl Sagan (1934–1996) fue astrónomo planetario en la Universidad Cornell y participó en las misiones Mariner, Viking y Voyager.",
    title: "Carl Sagan, Astrónomo de los Planetas",
    color: '#5B7A8C',
    btnImage: '/assets/wormhole/infographic_m14/btn_sagan-astronomo-planetario.webp',
    image: '/assets/wormhole/infographic_m14/hero_sagan-astronomo-planetario.webp',
    content: [
      "Carl Edward Sagan nació el 9 de noviembre de 1934 en Brooklyn, Nueva York, en una familia de origen humilde. Desde niño le fascinaron las estrellas. Él mismo contó que, a los cuatro años, la Exposición Universal de Nueva York de 1939 le abrió los ojos al futuro de la ciencia y la tecnología. Más tarde se preguntaba qué eran realmente esos puntos de luz en el cielo, y descubrió en la biblioteca que eran soles lejanos. Esa respuesta lo acompañó toda la vida y lo convirtió en astrónomo.",
      "Sagan se doctoró en 1960 en la Universidad de Chicago con una tesis sobre las propiedades físicas de los planetas. Fue profesor en Harvard y, desde 1968, en la Universidad Cornell, donde dirigió el Laboratorio de Estudios Planetarios. Uno de sus primeros trabajos importantes ayudó a explicar por qué Venus es tan caliente: propuso que su espesa atmósfera de dióxido de carbono atrapa el calor mediante un intenso efecto invernadero, una idea que las sondas espaciales confirmaron después.",
      "A lo largo de su carrera colaboró con la NASA en misiones históricas. Participó en el análisis de datos de las sondas Mariner, que visitaron Venus y Marte, y en la planificación de las sondas Viking, que aterrizaron en Marte en 1976. También formó parte del equipo de las Voyager, que exploraron Júpiter, Saturno, Urano y Neptuno. Sagan estaba convencido de que estudiar otros planetas nos ayuda a entender mejor la Tierra y los riesgos que enfrenta, como el calentamiento global.",
      "Además de científico, Sagan fue un comunicador excepcional. En 1972 diseñó, junto a Frank Drake, la placa que viajó a bordo de la sonda Pioneer 10, dibujada por la artista Linda Salzman Sagan. En 1977 dirigió el comité que preparó el Disco de Oro de las Voyager, con imágenes, sonidos de la Tierra, saludos en 55 idiomas y música de diversas culturas. En 1978 ganó el Premio Pulitzer por su libro «Los dragones del Edén», dedicado a la evolución de la inteligencia humana.",
      "Carl Sagan murió el 20 de diciembre de 1996 en Seattle, a los 62 años, a causa de una neumonía relacionada con una enfermedad de la médula ósea llamada mielodisplasia. Dejó más de 600 publicaciones científicas y divulgativas y una legión de lectores y espectadores inspirados por su manera de contar el universo. Murió mientras se rodaba la película basada en su única novela, «Contacto», que se estrenó siete meses después. Su historia es inseparable de la de los agujeros de gusano."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Disco de Oro de las Voyager incluye unos 90 minutos de música, desde Bach y Beethoven hasta Chuck Berry, además de sonidos como el canto de las ballenas, una risa y un beso. Las dos sondas, lanzadas en 1977, llevan una copia cada una. Hoy viajan por el espacio interestelar a más de 20.000 millones de kilómetros de la Tierra, y el disco podría durar intacto cientos de millones de años, mucho más que cualquier ciudad humana." },
      { label: "Dato Científico", icon: "atom", text: "Cuando Sagan estudiaba Venus, muchos imaginaban que bajo sus nubes había selvas o pantanos. Las mediciones de radio de finales de los años cincuenta indicaban temperaturas muy altas, y Sagan propuso que un fuerte efecto invernadero las explicaba. Hoy sabemos que la superficie de Venus está a unos 465 °C, suficiente para fundir el plomo, y que su presión atmosférica es unas 90 veces la de la Tierra. Es el planeta más caliente del sistema solar." },
      { label: "En la Película", icon: "zap", text: "La película «Contacto» empieza con la niñez de Ellie Arroway, interpretada de pequeña por Jena Malone. La niña pasa las noches con su padre junto a una radio de aficionado, intentando comunicarse con personas lejanas y preguntándose si podría hablar con alguien en otros mundos. Esa curiosidad infantil por lo que hay más allá refleja muy bien la de Carl Sagan, que de niño también se preguntaba qué eran las estrellas y quién podría vivir cerca de ellas." }
    ],
    fact: "Dato Clave: Carl Sagan no fue solo un divulgador, sino un científico planetario de primera línea. Explicó el intenso efecto invernadero de Venus, trabajó en las misiones Mariner, Viking y Voyager, diseñó con Frank Drake la placa de las Pioneer y dirigió la creación del Disco de Oro de las Voyager. Ganó el Premio Pulitzer en 1978 y murió en diciembre de 1996, meses antes del estreno de «Contacto».",
  },
  {
    id: "nacimiento-novela-contacto",
    bannerImage: '/assets/wormhole/infographic_m14/banner_nacimiento-novela-contacto.webp',
    bannerCaption: "La novela «Contacto» se publicó en 1985 y narra cómo la astrónoma Ellie Arroway detecta una señal de radio procedente de Vega.",
    title: "El Nacimiento de «Contacto» (1985)",
    color: '#7A6C8F',
    btnImage: '/assets/wormhole/infographic_m14/btn_nacimiento-novela-contacto.webp',
    image: '/assets/wormhole/infographic_m14/hero_nacimiento-novela-contacto.webp',
    content: [
      "La historia de «Contacto» comenzó antes de ser libro. En 1979, Carl Sagan y Ann Druyan, escritora y más tarde su esposa, prepararon junto a la productora Lynda Obst el argumento de una película sobre el primer contacto con una civilización extraterrestre. El proyecto cinematográfico se estancó durante años, así que Sagan decidió convertir la idea en novela. «Contacto» se publicó en 1985 por la editorial Simon & Schuster y fue la única novela que escribió en toda su vida.",
      "La protagonista es Eleanor Arroway, una radioastrónoma brillante y testaruda que dedica su vida a buscar señales de inteligencia extraterrestre. Muchos señalan que Sagan se inspiró en parte en Jill Tarter, una de las científicas más importantes del programa SETI, para crear el personaje. Ellie trabaja en un gran conjunto de radiotelescopios en Nuevo México. Un día detecta una señal muy intensa que procede de la dirección de Vega, una estrella brillante situada a unos 25 años luz de la Tierra.",
      "La señal no es ruido natural. Contiene una secuencia de números primos, es decir, números que solo pueden dividirse entre uno y entre sí mismos, como 2, 3, 5, 7 u 11. Ningún proceso natural conocido genera esa secuencia, por lo que es una forma ideal de anunciar que detrás hay inteligencia. Pronto los científicos descubren capas ocultas dentro de la señal, que contienen un mensaje mucho más complejo. Sagan imaginó así cómo una civilización podría presentarse usando el lenguaje universal de las matemáticas.",
      "Una de esas capas resulta ser una retransmisión de una emisión de televisión de 1936: la inauguración de los Juegos Olímpicos de Berlín, con la imagen de Adolf Hitler. Fue una de las primeras emisiones televisivas con potencia suficiente para escapar al espacio. Esa señal habría tardado unos 25 años en llegar a Vega, y la respuesta otros tantos en volver. Sagan usó este detalle, basado en la física real de las ondas de radio, para mostrar que nuestras emisiones viajan por el espacio sin que podamos detenerlas.",
      "La capa más profunda del mensaje contiene miles de páginas de planos para construir una máquina misteriosa, cuyo propósito nadie comprende al principio. La novela explora cómo reaccionarían los gobiernos, los científicos, los líderes religiosos y la gente común ante semejante descubrimiento. Para que la parte científica del viaje fuera creíble, Sagan necesitaba un mecanismo de transporte que respetara las leyes de la física. Esa búsqueda lo llevaría a hacer una de las consultas más influyentes de la historia de la relatividad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Según la prensa de la época, Simon & Schuster pagó a Sagan un adelanto de unos dos millones de dólares por «Contacto» antes de que la novela estuviera escrita, una cifra récord para un libro todavía inexistente en aquellos años. La primera edición tuvo una tirada enorme y el libro se convirtió en un éxito de ventas. Más de una década después, en 1997, llegó por fin a los cines la película que Sagan y Druyan habían imaginado en 1979." },
      { label: "Dato Científico", icon: "atom", text: "Vega es la quinta estrella más brillante del cielo nocturno y la principal de la constelación de la Lira. Está a unos 25 años luz, tiene aproximadamente el doble de masa que el Sol y gira tan rápido que está achatada por los polos. En 1983, el satélite infrarrojo IRAS descubrió que está rodeada por un disco de polvo, una pista de que allí podrían estar formándose o existir planetas. Quizá por eso Sagan la eligió como origen de la señal." },
      { label: "En la Película", icon: "zap", text: "En la película, Ellie Arroway, interpretada por Jodie Foster, detecta la señal con el Very Large Array, un conjunto real de 27 radiotelescopios de 25 metros de diámetro situado en Nuevo México. Las antenas se convirtieron en un escenario icónico. La escena en la que Ellie, con los auriculares puestos, oye por primera vez los pulsos rítmicos de los números primos es uno de los momentos más recordados del cine de ciencia ficción." }
    ],
    fact: "Dato Clave: «Contacto», la única novela de Carl Sagan, se publicó en 1985. En ella, la astrónoma Ellie Arroway detecta una señal procedente de Vega que contiene números primos, una retransmisión de los Juegos Olímpicos de 1936 y los planos de una máquina. El libro nació de un argumento cinematográfico que Sagan, Ann Druyan y Lynda Obst escribieron en 1979, y se llevó al cine en 1997.",
  },
  {
    id: "consulta-sagan-thorne",
    bannerImage: '/assets/wormhole/infographic_m14/banner_consulta-sagan-thorne.webp',
    bannerCaption: "En 1985, Sagan pidió a su amigo Kip Thorne que revisara la física de su novela; la respuesta llevó a la teoría de agujeros de gusano transitables.",
    title: "La Pregunta de Sagan a Kip Thorne",
    color: '#6B7F5E',
    btnImage: '/assets/wormhole/infographic_m14/btn_consulta-sagan-thorne.webp',
    image: '/assets/wormhole/infographic_m14/hero_consulta-sagan-thorne.webp',
    content: [
      "En el primer borrador de «Contacto», Sagan hacía que su protagonista viajara a Vega atravesando un agujero negro. Era una idea popular en la ciencia ficción de la época, pero Sagan quería que la física fuera correcta. En 1985 envió el manuscrito a su amigo Kip Thorne, físico teórico del Instituto Tecnológico de California y uno de los mayores expertos en relatividad general del mundo. Le pidió que revisara si el viaje era plausible. La pregunta parecía sencilla, pero tendría consecuencias enormes.",
      "Thorne se dio cuenta enseguida de que un agujero negro no servía. Las fuerzas de marea cerca de su centro destrozarían a cualquier viajero, y nada que cruce el horizonte de sucesos puede volver a salir ni llegar a otra región del universo. Además, la conexión que describía el puente de Einstein-Rosen se cierra tan rápido que ni siquiera la luz podría cruzarla. Thorne propuso a Sagan sustituir el agujero negro por un agujero de gusano, pero entonces surgió una pregunta nueva: ¿podría mantenerse abierto?",
      "Thorne se puso a calcular, junto a su estudiante Michael Morris. Partieron al revés de lo habitual: en lugar de preguntar qué forma tendría el espacio-tiempo alrededor de cierta materia, diseñaron primero un túnel que un humano pudiera atravesar con seguridad y después calcularon qué tipo de materia se necesitaría para sostenerlo. El resultado fue sorprendente: la garganta solo se mantendría abierta con materia exótica, que tuviera densidad de energía negativa y empujara el espacio hacia fuera.",
      "En 1988, Morris y Thorne publicaron estos resultados en la revista American Journal of Physics con un título curioso: los agujeros de gusano en el espacio-tiempo y su uso para el viaje interestelar, una herramienta para enseñar relatividad general. Presentaron el trabajo como un ejercicio para estudiantes, pero se convirtió en el artículo fundacional de toda una área de investigación. Ese mismo año, junto a Ulvi Yurtsever, Thorne mostró además que esos túneles podrían convertirse en máquinas del tiempo.",
      "Sagan incorporó las sugerencias de Thorne en la versión final de su novela, donde los viajeros atraviesan una red de túneles cósmicos construidos por una civilización mucho más avanzada. Esta colaboración es uno de los ejemplos más claros de cómo la cultura y la ciencia se alimentan mutuamente. Thorne contó toda la historia en su libro «Agujeros negros y tiempo curvo», publicado en 1994. Gracias a la pregunta de un novelista, los agujeros de gusano pasaron de ser una rareza matemática a un tema de investigación serio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Kip Thorne no se limitó a los agujeros de gusano. Fue uno de los fundadores del observatorio LIGO, diseñado para detectar ondas gravitacionales. En 2015, LIGO captó por primera vez esas ondas, producidas por la fusión de dos agujeros negros, y en 2017 Thorne compartió el Premio Nobel de Física con Rainer Weiss y Barry Barish. La misma mente que ayudó a Sagan con su novela ayudó a abrir una nueva ventana para observar el universo." },
      { label: "Dato Científico", icon: "atom", text: "El método de Morris y Thorne se conoce hoy como ingeniería inversa del espacio-tiempo. Normalmente, las ecuaciones de Einstein se usan para calcular cómo la materia curva el espacio. Ellos escribieron primero la geometría deseada, con una garganta amplia y fuerzas de marea soportables, y usaron las ecuaciones para deducir la materia necesaria. Descubrieron que esa materia viola la llamada condición de energía nula, algo que la materia ordinaria nunca hace." },
      { label: "En la Película", icon: "zap", text: "La película representa el viaje de Ellie como una caída a través de túneles luminosos y retorcidos que se suceden a gran velocidad, con estrellas, nubes de gas y estructuras gigantescas apareciendo a su alrededor. Es una interpretación artística, pero se basa en la idea de la novela, que a su vez surgió del consejo de Thorne: no un agujero negro que destruye todo, sino una red de agujeros de gusano que conecta lugares muy lejanos de la galaxia." }
    ],
    fact: "Dato Clave: la consulta de Carl Sagan a Kip Thorne en 1985 dio origen al artículo de Morris y Thorne de 1988, la base de la física moderna de los agujeros de gusano transitables. En él demostraron que un túnel atravesable por humanos necesitaría materia exótica con energía negativa para mantenerse abierto. Una novela de ciencia ficción terminó impulsando décadas de investigación real en relatividad general.",
  },
  {
    id: "cosmos-viaje-personal",
    bannerImage: '/assets/wormhole/infographic_m14/banner_cosmos-viaje-personal.webp',
    bannerCaption: "«Cosmos: un viaje personal» se estrenó en 1980 en la cadena pública PBS: 13 episodios escritos por Sagan, Ann Druyan y Steven Soter.",
    title: "«Cosmos»: un Viaje Personal (1980)",
    color: '#8C7A5B',
    btnImage: '/assets/wormhole/infographic_m14/btn_cosmos-viaje-personal.webp',
    image: '/assets/wormhole/infographic_m14/hero_cosmos-viaje-personal.webp',
    content: [
      "Antes de «Contacto», Carl Sagan ya era famoso en todo el mundo gracias a una serie de televisión. «Cosmos: un viaje personal» se estrenó el 28 de septiembre de 1980 en la cadena pública estadounidense PBS. Constaba de 13 episodios escritos por Sagan, Ann Druyan y el astrónomo Steven Soter. En ellos, Sagan recorría la historia del universo, la evolución de la vida, el nacimiento de la ciencia y el futuro de la humanidad, siempre con un tono cercano, emocionante y lleno de asombro.",
      "La serie usaba recursos visuales muy innovadores para su época. Sagan viajaba en una nave de la imaginación que lo llevaba a galaxias lejanas, a la superficie de otros planetas y al interior de las células. También visitaba lugares históricos, como la antigua Biblioteca de Alejandría, recreada con maquetas y efectos especiales. La música, con piezas del compositor griego Vangelis, ayudó a crear una atmósfera inolvidable. Muchos científicos actuales cuentan que decidieron dedicarse a la ciencia después de ver «Cosmos».",
      "El éxito de la serie fue gigantesco. Se ha estimado que la vieron más de 500 millones de personas en unos 60 países, lo que la convirtió durante años en la serie más vista de la televisión pública estadounidense. Ganó varios premios Emmy y un premio Peabody. El libro que la acompañaba, también titulado «Cosmos», permaneció más de un año en la lista de los más vendidos de The New York Times y se convirtió en uno de los libros de divulgación científica más leídos de la historia en inglés.",
      "Uno de los recursos más famosos de la serie es el Calendario Cósmico, que Sagan ya había presentado en «Los dragones del Edén». Consiste en comprimir los aproximadamente 13.800 millones de años de historia del universo en un solo año. El Big Bang ocurre el 1 de enero, la Vía Láctea se forma en primavera y el Sol y la Tierra aparecen a comienzos de septiembre. Los dinosaurios se extinguen el 30 de diciembre, y toda la historia escrita de la humanidad ocupa apenas los últimos segundos del 31 de diciembre.",
      "Sagan también popularizó una idea poética y científicamente exacta: estamos hechos de materia de estrellas. El nitrógeno de nuestro ADN, el calcio de nuestros dientes y el hierro de nuestra sangre se formaron en el interior de estrellas que vivieron y murieron antes de que existiera el Sol. «Cosmos» enseñó a millones de personas que la ciencia no es una lista de datos aburridos, sino una aventura que nos conecta con el universo. Esa misma visión impregnaría, años después, las páginas de «Contacto»."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Carl Sagan apareció muchas veces en «The Tonight Show», el popular programa nocturno presentado por Johnny Carson, donde explicaba la astronomía con humor y sencillez. Allí se hizo famosa una imitación que Carson hacía de él pronunciando «billones y billones» de estrellas. Sagan aseguraba que nunca había dicho exactamente esa frase, pero acabó usándola con humor como título de su último libro, «Miles de millones», publicado tras su muerte en 1997." },
      { label: "Dato Científico", icon: "atom", text: "La afirmación de que estamos hechos de materia de estrellas es literal. Después del Big Bang, el universo contenía casi solo hidrógeno, helio y un poco de litio. Los elementos más pesados, como el carbono, el oxígeno y el hierro, se fabricaron mediante fusión nuclear en el interior de las estrellas, y algunos aún más pesados, como el oro, en explosiones de supernovas y choques de estrellas de neutrones. Esos átomos forman hoy nuestro cuerpo." },
      { label: "En la Película", icon: "zap", text: "La película «Contacto» comienza con una escena que recuerda a la nave de la imaginación de «Cosmos». La cámara se aleja lentamente de la Tierra, pasa por la Luna, Marte, Júpiter y Saturno, y sigue más allá del sistema solar, de la Vía Láctea y de otras galaxias. Mientras tanto, se oyen emisiones de radio y televisión cada vez más antiguas, hasta que solo queda silencio. Al final, el plano se funde con el ojo de la pequeña Ellie Arroway." }
    ],
    fact: "Dato Clave: «Cosmos: un viaje personal», estrenada en 1980, llevó la astronomía a más de 500 millones de espectadores en unos 60 países, según las estimaciones más citadas. Su Calendario Cósmico, que comprime la historia del universo en un año, sigue usándose en escuelas de todo el mundo. La serie convirtió a Carl Sagan en el divulgador científico más famoso de su época.",
  },
  {
    id: "afirmaciones-extraordinarias",
    bannerImage: '/assets/wormhole/infographic_m14/banner_afirmaciones-extraordinarias.webp',
    bannerCaption: "Sagan popularizó en «Cosmos» (1980) la frase «las afirmaciones extraordinarias requieren evidencias extraordinarias».",
    title: "Afirmaciones Extraordinarias, Evidencias Extraordinarias",
    color: '#4F6D7A',
    btnImage: '/assets/wormhole/infographic_m14/btn_afirmaciones-extraordinarias.webp',
    image: '/assets/wormhole/infographic_m14/hero_afirmaciones-extraordinarias.webp',
    content: [
      "La frase más famosa de Carl Sagan es una regla para pensar con claridad: las afirmaciones extraordinarias requieren evidencias extraordinarias. Sagan la popularizó en 1980, en el episodio de «Cosmos» titulado «Enciclopedia Galáctica», al hablar de quienes aseguraban haber sido visitados por extraterrestres. Su idea era sencilla. Si alguien afirma algo cotidiano, como que ayer llovió, basta con una prueba normal. Pero si alguien afirma algo que contradice todo lo que sabemos, necesitamos pruebas mucho más sólidas.",
      "La idea no era completamente nueva. En el siglo XVIII, el filósofo escocés David Hume escribió que un hombre sabio ajusta su creencia a la evidencia. A comienzos del siglo XIX, el matemático francés Pierre-Simon Laplace afirmó que el peso de la evidencia para una afirmación extraordinaria debe ser proporcional a su rareza. En 1978, el sociólogo Marcello Truzzi usó una frase muy parecida a la de Sagan. El mérito de Sagan fue resumirla en pocas palabras y hacerla llegar a millones de personas.",
      "En 1995, Sagan publicó «El mundo y sus demonios», un libro dedicado a defender el pensamiento crítico. Allí presentó su famoso kit para detectar engaños, un conjunto de herramientas para evaluar cualquier afirmación. Entre ellas: buscar confirmación independiente de los hechos, fomentar el debate entre personas informadas, desconfiar de los argumentos de autoridad, considerar varias hipótesis, preferir la explicación más sencilla y preguntarse si una idea puede ponerse a prueba y, en principio, demostrarse falsa.",
      "Esta regla es especialmente útil cuando estudiamos los agujeros de gusano. Las matemáticas de la relatividad general permiten su existencia, y físicos de enorme prestigio han escrito artículos rigurosos sobre ellos. Pero eso no significa que existan en la naturaleza. Hasta hoy, ningún telescopio, detector de ondas gravitacionales ni experimento ha encontrado una evidencia directa de un agujero de gusano. Siguiendo a Sagan, podemos explorar la idea con entusiasmo sin olvidar que todavía es especulación bien fundamentada.",
      "Sagan insistía en que el escepticismo no significa rechazar todo lo nuevo, sino exigir pruebas adecuadas antes de aceptarlo. También defendía la apertura mental: muchas ideas que parecían absurdas, como que la Tierra gira alrededor del Sol o que los continentes se mueven, terminaron siendo correctas gracias a la evidencia. El equilibrio entre imaginación y escepticismo es, para Sagan, el corazón de la ciencia. Ese mismo equilibrio aparece en el centro de la historia de «Contacto»."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Una de las historias más conocidas de «El mundo y sus demonios» es la del dragón en el garaje. Alguien asegura tener un dragón invisible que flota, no deja huellas y escupe un fuego sin calor. Cada vez que propones una prueba, el dueño inventa una excusa. Sagan pregunta entonces qué diferencia hay entre un dragón que no puede detectarse de ninguna forma y la ausencia de dragón. Una afirmación que no puede comprobarse no aporta conocimiento." },
      { label: "Dato Científico", icon: "atom", text: "En la física moderna, la regla de Sagan se aplica con criterios estadísticos estrictos. Para anunciar un descubrimiento, como el bosón de Higgs en 2012 o las primeras ondas gravitacionales en 2016, los físicos exigen una significancia de cinco sigmas. Eso significa que la probabilidad de que el resultado sea una simple casualidad del ruido es inferior a una entre tres millones y medio. Es una forma numérica de pedir evidencias extraordinarias." },
      { label: "En la Película", icon: "zap", text: "Al final de la película, Ellie Arroway regresa convencida de haber vivido un encuentro extraordinario, pero no puede presentar pruebas que convenzan a los demás. Durante la audiencia ante una comisión del Congreso, ella misma reconoce que, como científica, rechazaría un relato así sin evidencias. La regla favorita de Sagan se vuelve contra su protagonista, y el público debe decidir qué pensar. Es uno de los giros más inteligentes de la historia." }
    ],
    fact: "Dato Clave: la frase «las afirmaciones extraordinarias requieren evidencias extraordinarias» fue popularizada por Carl Sagan en «Cosmos» en 1980, aunque tiene raíces en las ideas de David Hume y Pierre-Simon Laplace. Aplicada a los agujeros de gusano, nos recuerda que están permitidos por las matemáticas de la relatividad general, pero que todavía no existe ninguna observación que confirme su existencia real.",
  },
  {
    id: "punto-azul-palido",
    bannerImage: '/assets/wormhole/infographic_m14/banner_punto-azul-palido.webp',
    bannerCaption: "El 14 de febrero de 1990, la Voyager 1 fotografió la Tierra desde unos 6.000 millones de kilómetros a petición de Carl Sagan.",
    title: "El Punto Azul Pálido",
    color: '#8C5E6B',
    btnImage: '/assets/wormhole/infographic_m14/btn_punto-azul-palido.webp',
    image: '/assets/wormhole/infographic_m14/hero_punto-azul-palido.webp',
    content: [
      "La sonda Voyager 1 fue lanzada el 5 de septiembre de 1977 y, tras visitar Júpiter en 1979 y Saturno en 1980, siguió alejándose del Sol. Carl Sagan, miembro del equipo de imágenes, propuso una idea poco habitual: girar la cámara hacia atrás y fotografiar la Tierra desde los confines del sistema solar. Algunos ingenieros temían que la luz del Sol dañara los instrumentos, y la foto no tenía gran valor científico. Pero Sagan insistió en que tendría un enorme valor para entender nuestro lugar en el universo.",
      "El 14 de febrero de 1990, la Voyager 1 tomó una serie de 60 imágenes que formaron el llamado Retrato de Familia del sistema solar, con seis de sus planetas. En una de ellas aparece la Tierra a unos 6.000 millones de kilómetros de distancia, más allá de la órbita de Neptuno. Nuestro planeta es apenas un puntito azulado que ocupa menos de un píxel, atravesado casualmente por un rayo de luz solar dispersada dentro de la cámara. Poco después, las cámaras de la sonda se apagaron para siempre para ahorrar energía.",
      "Sagan bautizó aquella imagen como el Punto Azul Pálido y la usó como título de su libro de 1994. En su texto más famoso invita a mirar de nuevo ese punto: ahí está nuestro hogar, ahí está todo el mundo que amamos, todas las personas de las que hemos oído hablar, todas las civilizaciones, reyes, inventores y niños de la historia. Todo eso cabe en una mota de polvo suspendida en un rayo de sol. Para Sagan, la imagen era una lección de humildad y una llamada a cuidarnos mejor.",
      "La fotografía también tiene un mensaje para quienes sueñan con viajar a otras estrellas. A la velocidad de la Voyager 1, que hoy supera los 60.000 kilómetros por hora, tardaríamos decenas de miles de años en llegar a la estrella más cercana después del Sol. La distancia desde la que se tomó el Punto Azul Pálido es solo una diminuta fracción del camino. Por eso los agujeros de gusano resultan tan fascinantes: son una de las pocas ideas compatibles con la relatividad que permitirían, en teoría, salvar esas distancias.",
      "En 2020, con motivo del trigésimo aniversario de la imagen, el Laboratorio de Propulsión a Chorro de la NASA publicó una versión restaurada con técnicas modernas de procesamiento de imágenes. El punto sigue siendo igual de pequeño, y el mensaje sigue siendo igual de poderoso. La Voyager 1 continúa su viaje y en 2012 se convirtió en el primer objeto construido por humanos en entrar en el espacio interestelar. Lleva consigo el Disco de Oro, otro proyecto de Sagan, como mensaje para quien pueda encontrarlo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En la fotografía original, la Tierra ocupa apenas unas 0,12 partes de un píxel. Las imágenes del Retrato de Familia tardaron semanas en llegar completas a la Tierra, porque la Voyager 1 transmite con una potencia de unos 20 vatios, menos que una bombilla doméstica, y la señal debía viajar miles de millones de kilómetros. Hoy, las señales de radio de la sonda tardan más de 22 horas en llegar hasta las antenas de la NASA." },
      { label: "Dato Científico", icon: "atom", text: "La luz del Sol tarda unos ocho minutos en llegar a la Tierra, pero en 1990 la luz reflejada por la Tierra tardaba unas cinco horas y media en llegar hasta la Voyager 1. Esa distancia equivale a unas 40 unidades astronómicas, es decir, cuarenta veces la distancia entre la Tierra y el Sol. Aun así, la estrella más cercana, Próxima Centauri, está unas 6.700 veces más lejos que ese punto desde el que se tomó la fotografía." },
      { label: "En la Película", icon: "zap", text: "Durante su viaje a través de los túneles cósmicos, Ellie contempla un espectáculo celeste tan bello que se queda sin palabras científicas para describirlo. Entonces dice, conmovida, que deberían haber enviado a un poeta. Esa frase resume la actitud de Carl Sagan ante el universo: la ciencia rigurosa no elimina el asombro, sino que lo multiplica. Es la misma emoción que Sagan quiso transmitir con la imagen del Punto Azul Pálido." }
    ],
    fact: "Dato Clave: el Punto Azul Pálido es la fotografía de la Tierra tomada por la Voyager 1 el 14 de febrero de 1990 desde unos 6.000 millones de kilómetros, más allá de la órbita de Neptuno. Carl Sagan impulsó la toma y la convirtió en símbolo de la fragilidad de nuestro planeta. En ella, la Tierra ocupa menos de un píxel dentro de un rayo de luz solar dispersada.",
  },
  {
    id: "fermi-seti-busqueda",
    bannerImage: '/assets/wormhole/infographic_m14/banner_fermi-seti-busqueda.webp',
    bannerCaption: "En 1950, Enrico Fermi preguntó en Los Álamos «¿dónde está todo el mundo?», dando nombre a la paradoja de Fermi.",
    title: "La Paradoja de Fermi y la Búsqueda SETI",
    color: '#6E5B8C',
    btnImage: '/assets/wormhole/infographic_m14/btn_fermi-seti-busqueda.webp',
    image: '/assets/wormhole/infographic_m14/hero_fermi-seti-busqueda.webp',
    content: [
      "En el verano de 1950, el físico Enrico Fermi comía con sus colegas Emil Konopinski, Edward Teller y Herbert York en el Laboratorio Nacional de Los Álamos, en Estados Unidos. Hablaban sobre ovnis y sobre la posibilidad de viajar más rápido que la luz. De repente, Fermi preguntó algo parecido a: ¿dónde está todo el mundo? Su razonamiento era claro. Si el universo es tan grande y antiguo, y si hay tantas estrellas como el Sol, alguna civilización debería haber llegado ya hasta nosotros o dejado señales visibles.",
      "La galaxia tiene más de 13.000 millones de años y contiene entre 100.000 y 400.000 millones de estrellas. Hoy sabemos, gracias a misiones como el telescopio espacial Kepler, que la mayoría de las estrellas tienen planetas y que muchos están en la zona donde podría existir agua líquida. Una civilización que viajara a una fracción pequeña de la velocidad de la luz podría colonizar toda la galaxia en unos pocos millones de años, muy poco en términos cósmicos. Y sin embargo, no vemos ninguna señal clara.",
      "En 1960, el radioastrónomo Frank Drake realizó el Proyecto Ozma, la primera búsqueda moderna de señales de radio extraterrestres. Apuntó una antena del observatorio de Green Bank, en Virginia Occidental, hacia las estrellas Tau Ceti y Épsilon Eridani. En 1961 organizó allí una reunión en la que presentó su famosa ecuación de Drake, que estima cuántas civilizaciones comunicativas podría haber en la galaxia. Entre los asistentes estaba un joven Carl Sagan, que se convirtió en uno de los grandes defensores de la búsqueda SETI.",
      "En 1966, Sagan publicó con el astrónomo soviético Iósif Shklovski el libro «Vida inteligente en el universo», uno de los primeros estudios serios sobre el tema. En 1974, colaboró con Drake en el mensaje de Arecibo, una señal de radio de 1.679 bits enviada desde el gran radiotelescopio de Puerto Rico hacia el cúmulo de estrellas M13, situado a unos 25.000 años luz. El mensaje contenía números, los elementos químicos de la vida, la forma del ADN, una figura humana y un dibujo del sistema solar.",
      "Se han propuesto muchas soluciones a la paradoja de Fermi. Quizá la vida inteligente es rarísima, quizá las civilizaciones duran poco o quizá usan formas de comunicación que no sabemos detectar. Algunos especulan que civilizaciones muy avanzadas podrían comunicarse o viajar mediante agujeros de gusano, sin emitir señales de radio que nuestros instrumentos capten. Otros piensan que la barrera tecnológica para construirlos es insuperable, y que todas las civilizaciones siguen confinadas en sus propios sistemas estelares."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La reunión de Green Bank de 1961 reunió a solo una decena de científicos, entre ellos Frank Drake, Carl Sagan, Philip Morrison y el químico Melvin Calvin, que durante el encuentro recibió la noticia de que había ganado el Premio Nobel de Química. Con humor, los participantes se bautizaron como la Orden del Delfín, en honor a las investigaciones de otro asistente, John Lilly, sobre la inteligencia de los delfines." },
      { label: "Dato Científico", icon: "atom", text: "La ecuación de Drake multiplica siete factores: el ritmo de formación de estrellas, la fracción con planetas, los planetas habitables por sistema, la fracción donde surge la vida, la fracción donde aparece la inteligencia, la fracción que desarrolla tecnología detectable y el tiempo que esa tecnología perdura. Hoy conocemos bien los primeros factores gracias a los telescopios, pero los últimos siguen siendo completamente desconocidos. Por eso sus estimaciones varían muchísimo." },
      { label: "En la Película", icon: "zap", text: "En una escena de la película, la pequeña Ellie pregunta a su padre si hay vida en otros planetas. Él responde que, si en todo el universo estuviéramos solos, sería un terrible desperdicio de espacio. Años después, la Ellie adulta repite esa frase. La película resume así, con una sola línea, el corazón de la paradoja de Fermi: un universo inmenso, lleno de estrellas y planetas, en el que todavía no hemos encontrado a nadie más." }
    ],
    fact: "Dato Clave: la paradoja de Fermi, surgida de una pregunta de Enrico Fermi en 1950, plantea por qué no hemos encontrado señales de vida inteligente si existen tantas estrellas con planetas parecidos a la Tierra. Carl Sagan dedicó gran parte de su vida a buscar una respuesta, apoyando el programa SETI, colaborando en el mensaje de Arecibo de 1974 y escribiendo «Contacto» para imaginar cómo sería ese primer encuentro.",
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
      hue: Math.random() > 0.5 ? '159,179,200' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(159,179,200,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM14)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7A8C", "#7A6C8F", "#6B7F5E", "#8C7A5B", "#4F6D7A", "#8C5E6B", "#6E5B8C"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#9FB3C8" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#9FB3C8" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradWormholeM14" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL ASTRÓNOMO QUE INSPIRÓ UN TÚNEL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(159,179,200,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">AGUJEROS DE GUSANO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(159,179,200,0.2)'}`,
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
          layoutId="activeDotWormholeM14"
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
      border: '1px solid rgba(159,179,200,0.15)',
    }}>
      <Star size={14} style={{ color: '#9FB3C8', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #9FB3C8, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(159,179,200,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9FB3C8', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_WormholeM14() {
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
      border: '1px solid rgba(159,179,200,0.12)',
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
            textAlign: 'center', color: 'rgba(159,179,200,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(159,179,200,0.08)', borderRadius: '16px',
              border: '1px solid rgba(159,179,200,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9FB3C8', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Cómo una novela de 1985 llevó a la física real de los agujeros de gusano
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
