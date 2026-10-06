'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#E0A27A', style = {} }) {
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
  "Galilei, G. (1632). Dialogo sopra i due massimi sistemi del mondo, tolemaico e copernicano. Florencia: Giovanni Battista Landini.",
  "Finocchiaro, M. A. (1989). The Galileo Affair: A Documentary History. Berkeley: University of California Press.",
  "Fantoli, A. (1994). Galileo: For Copernicanism and for the Church. Ciudad del Vaticano: Vatican Observatory Publications.",
  "Shea, W. R. y Artigas, M. (2003). Galileo in Rome: The Rise and Fall of a Troublesome Genius. Oxford: Oxford University Press.",
  "Sobel, D. (1999). Galileo's Daughter: A Historical Memoir of Science, Faith, and Love. Nueva York: Walker & Company.",
  "Heilbron, J. L. (2010). Galileo. Oxford: Oxford University Press.",
  "Pagano, S. (ed.) (2009). I documenti vaticani del processo di Galileo Galilei (1611-1741). Ciudad del Vaticano: Archivio Segreto Vaticano.",
  "Juan Pablo II (1992). Discurso a los participantes en la sesión plenaria de la Pontificia Academia de las Ciencias, 31 de octubre de 1992. https://www.vatican.va"
];

const INFOGRAPHIC_NODES = [
  {
    id: "dos-modelos-del-universo",
    bannerImage: '/assets/galileo/infographic_m3/banner_dos-modelos-del-universo.webp',
    bannerCaption: "El modelo heliocéntrico de Copérnico, publicado en 1543, situaba al Sol en el centro y a la Tierra girando a su alrededor.",
    title: "Dos maneras de ordenar el universo",
    color: '#7A6688',
    btnImage: '/assets/galileo/infographic_m3/btn_dos-modelos-del-universo.webp',
    image: '/assets/galileo/infographic_m3/hero_dos-modelos-del-universo.webp',
    content: [
      "Durante casi dos mil años, la mayoría de los sabios de Europa aceptó el modelo geocéntrico: la Tierra estaba inmóvil en el centro del universo y el Sol, la Luna, los planetas y las estrellas giraban a su alrededor. Esta idea venía de filósofos griegos como Aristóteles, en el siglo IV antes de Cristo, y fue desarrollada matemáticamente por Claudio Ptolomeo en Alejandría hacia el año 150 de nuestra era, en la obra conocida como «Almagesto». Encajaba con lo que todos veían: el Sol sale y se pone.",
      "El modelo de Ptolomeo era ingenioso y permitía predecir con bastante exactitud la posición de los planetas. Para explicar por qué algunos planetas, como Marte, parecen detenerse y retroceder en el cielo durante unas semanas, usaba epiciclos: pequeños círculos que giraban sobre otros círculos más grandes. Con el tiempo, las universidades y la Iglesia lo integraron en su visión del mundo. Además, algunos pasajes de la Biblia parecían describir un Sol que se mueve y una Tierra quieta, si se leían de forma literal.",
      "En 1543, el astrónomo polaco Nicolás Copérnico publicó «Sobre las revoluciones de las esferas celestes», donde proponía el modelo heliocéntrico: el Sol está en el centro y la Tierra es un planeta más que gira a su alrededor una vez al año, mientras rota sobre su eje una vez al día. En este modelo, el retroceso de Marte se explica de forma sencilla: la Tierra, que va más rápido, lo adelanta en su órbita. Copérnico murió ese mismo año, y su libro tardó décadas en provocar grandes polémicas.",
      "La idea de que la Tierra se movía era difícil de aceptar. Si girábamos a gran velocidad, ¿por qué no lo sentíamos? ¿Por qué una piedra lanzada hacia arriba caía en el mismo lugar? Además, si la Tierra orbitaba el Sol, las estrellas cercanas deberían cambiar ligeramente de posición a lo largo del año, un efecto llamado paralaje, que nadie había logrado medir. Hoy sabemos que el paralaje existe pero es diminuto, porque las estrellas están muy lejos: no se midió hasta 1838, por Friedrich Bessel.",
      "Galileo se convenció del modelo de Copérnico años antes de usar el telescopio, y sus descubrimientos le dieron argumentos nuevos: la Luna tenía montañas como la Tierra, Júpiter tenía lunas propias y Venus mostraba fases que el modelo de Ptolomeo no podía explicar. Sus estudios sobre el movimiento respondían también a las objeciones físicas: explicó que una piedra que cae desde el mástil de un barco en movimiento lo acompaña, porque comparte su movimiento. Pero defender públicamente el heliocentrismo pronto se volvería peligroso."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Copérnico no fue el primero en proponer que la Tierra gira alrededor del Sol. En el siglo III antes de Cristo, el astrónomo griego Aristarco de Samos ya había defendido esa idea, según cuenta Arquímedes en su obra «El contador de arena». Sin embargo, la propuesta de Aristarco no convenció a sus contemporáneos y quedó casi olvidada. Copérnico conocía esa antigua idea y la mencionó en el manuscrito de su obra, aunque luego tachó la referencia antes de publicarla." },
      { label: "Dato Científico", icon: "atom", text: "El paralaje estelar es el pequeño desplazamiento aparente de una estrella cercana sobre el fondo de estrellas lejanas cuando la Tierra pasa de un lado a otro de su órbita. Puedes imitarlo extendiendo el brazo con el pulgar levantado y mirándolo primero con un ojo y después con el otro. En 1838, Friedrich Bessel midió el paralaje de la estrella 61 Cygni: era de apenas un tercio de segundo de arco, como el tamaño aparente de una moneda vista a más de diez kilómetros." }
    ],
    fact: "Las observaciones de Galileo no fueron una prueba directa del movimiento de la Tierra, sino evidencias que debilitaban el modelo de Ptolomeo. Las pruebas directas llegaron después: en 1729, James Bradley anunció la aberración de la luz estelar, causada por el movimiento orbital de la Tierra; en 1838, Bessel midió el paralaje; y en 1851, Léon Foucault mostró la rotación terrestre con un péndulo gigante colgado en el Panteón de París. La ciencia avanza acumulando evidencias independientes.",
  },
  {
    id: "cartas-y-advertencia-1616",
    bannerImage: '/assets/galileo/infographic_m3/banner_cartas-y-advertencia-1616.webp',
    bannerCaption: "En 1616 la Iglesia declaró herético afirmar que el Sol está inmóvil en el centro, y advirtió a Galileo que no lo defendiera.",
    title: "Las cartas de Galileo y la advertencia de 1616",
    color: '#6B7280',
    btnImage: '/assets/galileo/infographic_m3/btn_cartas-y-advertencia-1616.webp',
    image: '/assets/galileo/infographic_m3/hero_cartas-y-advertencia-1616.webp',
    content: [
      "Tras sus descubrimientos con el telescopio, Galileo se convirtió en una celebridad, pero también en blanco de críticas. Algunos filósofos y predicadores afirmaban que el movimiento de la Tierra contradecía la Biblia. En diciembre de 1614, el fraile dominico Tommaso Caccini lo atacó desde el púlpito de la iglesia de Santa María Novella, en Florencia. Galileo decidió responder por escrito, explicando su visión sobre la relación entre la ciencia y las Escrituras, algo arriesgado para alguien que no era teólogo.",
      "En 1613 había escrito una carta a su discípulo Benedetto Castelli, y en 1615 escribió otra más extensa a la gran duquesa Cristina de Lorena, madre de Cosme II. En ellas defendía que la Biblia y la naturaleza proceden del mismo Dios, por lo que no pueden contradecirse de verdad. Si parecen chocar, decía, es porque la Biblia usa un lenguaje sencillo para que todos la entiendan, y en cuestiones de la naturaleza hay que tener en cuenta lo que demuestran los sentidos y la razón.",
      "En la carta a Cristina, Galileo citó una frase que atribuyó al cardenal Cesare Baronio: la intención del Espíritu Santo es enseñarnos cómo se va al cielo, y no cómo va el cielo. Con ella resumía su postura: la religión trata de cuestiones de fe y moral, mientras que la astronomía estudia cómo funciona el universo. Muchos religiosos moderados compartían esta forma de pensar, pero otros sectores de la Iglesia la vieron como una intromisión de un matemático en asuntos de teología.",
      "En febrero de 1616, un grupo de teólogos consultores del Santo Oficio declaró que afirmar que el Sol estaba inmóvil en el centro del mundo era «formalmente herético». El 26 de febrero, el cardenal Roberto Belarmino comunicó personalmente a Galileo que debía abandonar esa opinión. Días después, el 5 de marzo, la Congregación del Índice suspendió el libro de Copérnico hasta que fuera corregido. Galileo no fue juzgado entonces, pero quedó advertido de no sostener ni defender el heliocentrismo.",
      "En aquel tiempo, la Iglesia católica tenía un gran poder político en Italia, y el Papa gobernaba directamente los Estados Pontificios. Además, Europa vivía la tensión entre católicos y protestantes, y la interpretación de la Biblia era un tema muy delicado tras la Reforma y el Concilio de Trento, que reservaba esa interpretación a la autoridad eclesiástica. Este contexto ayuda a entender por qué la discusión sobre el movimiento de la Tierra se convirtió en un problema de autoridad, y no solo en una cuestión científica."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Belarmino fue también uno de los jueces del proceso contra Giordano Bruno, el filósofo que fue quemado en Roma en el año 1600. Bruno defendía ideas como un universo infinito con innumerables mundos, pero fue condenado sobre todo por sus opiniones teológicas, consideradas heréticas, más que por su apoyo a Copérnico. Aun así, su ejecución recordaba a todos que desafiar la doctrina oficial podía tener consecuencias terribles en la Europa de aquella época." },
      { label: "Dato Científico", icon: "atom", text: "La carta a la gran duquesa Cristina circuló en copias manuscritas y no se imprimió hasta 1636, en Estrasburgo, en una edición en italiano y latín. Hoy se considera uno de los textos clásicos sobre la relación entre ciencia y religión. Curiosamente, en 1893 el papa León XIII publicó la encíclica «Providentissimus Deus», que defendía una idea muy parecida: los autores sagrados no pretendían enseñar ciencia natural y usaban el lenguaje común de su tiempo." }
    ],
    fact: "El decreto de 1616 de la Congregación del Índice no prohibió el libro de Copérnico de forma definitiva, sino que lo suspendió «hasta que se corrija». En 1620 se publicaron las correcciones: unos pocos cambios que presentaban el movimiento de la Tierra como una hipótesis matemática y no como una realidad física. Con esas correcciones, los católicos podían volver a leer la obra. Mientras tanto, los libros que defendían abiertamente el heliocentrismo como verdad física siguieron prohibidos.",
  },
  {
    id: "dialogo-de-1632",
    bannerImage: '/assets/galileo/infographic_m3/banner_dialogo-de-1632.webp',
    bannerCaption: "En 1632 Galileo publicó el Diálogo sobre los dos máximos sistemas del mundo, una conversación que favorecía a Copérnico.",
    title: "El Diálogo de 1632",
    color: '#8A6E5A',
    btnImage: '/assets/galileo/infographic_m3/btn_dialogo-de-1632.webp',
    image: '/assets/galileo/infographic_m3/hero_dialogo-de-1632.webp',
    content: [
      "En 1623, el cardenal florentino Maffeo Barberini, admirador de Galileo, fue elegido papa con el nombre de Urbano VIII. Galileo, que acababa de publicar «El ensayador» dedicado al nuevo papa, viajó a Roma en 1624 y fue recibido por él varias veces. Salió convencido de que podría escribir sobre los dos sistemas del mundo siempre que lo hiciera como una discusión de hipótesis, sin afirmar que el modelo de Copérnico fuera verdadero. Dedicó los años siguientes a escribir su gran obra.",
      "En febrero de 1632 se publicó en Florencia el «Diálogo sobre los dos máximos sistemas del mundo, ptolemaico y copernicano». Estaba escrito en italiano y no en latín, para que lo pudiera leer cualquier persona culta y no solo los profesores universitarios. Había recibido el permiso de impresión de las autoridades eclesiásticas de Roma y de Florencia, tras un largo proceso de revisión. Sin embargo, pocos meses después de su aparición, la venta del libro fue suspendida por orden de Roma.",
      "El libro era una conversación de cuatro jornadas entre tres personajes reunidos en un palacio de Venecia. Salviati, un sabio que defendía las ideas de Copérnico y hablaba con la voz de Galileo; Sagredo, un hombre culto e inteligente que escuchaba con mente abierta; y Simplicio, un seguidor de Aristóteles que defendía el modelo de Ptolomeo. Salviati y Sagredo eran homenajes a dos amigos ya fallecidos de Galileo. Simplicio evocaba a un antiguo comentarista de Aristóteles, pero el nombre también sugería a alguien simple.",
      "El problema fue la forma. Aunque el libro afirmaba ser imparcial, los argumentos de Salviati eran claramente superiores y Simplicio quedaba a menudo en ridículo. Peor aún, al final del libro Simplicio repetía un argumento que el propio Urbano VIII había expresado a Galileo: que Dios, siendo todopoderoso, podría producir los mismos efectos de muchas maneras, por lo que ningún razonamiento humano podía demostrar cómo funciona realmente el universo. Los enemigos de Galileo convencieron al papa de que se burlaba de él.",
      "Galileo cometió además un error científico. Su argumento principal para probar que la Tierra se movía era la explicación de las mareas: creía que eran causadas por la combinación de la rotación y la traslación terrestres, que agitaban los océanos como el agua de un recipiente que acelera y frena. Esa explicación era incorrecta. Hoy sabemos que las mareas se deben sobre todo a la atracción gravitacional de la Luna y, en menor medida, del Sol, como demostró Isaac Newton en 1687."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Galileo rechazó la idea de Kepler de que la Luna causaba las mareas, porque le parecía una especie de fuerza oculta que actuaba a distancia sin explicación. Es una lección interesante: incluso un gran científico puede equivocarse cuando una idea no encaja con su manera de entender el mundo. Kepler tenía razón en lo esencial, aunque no sabía explicar el mecanismo, y fue Newton quien lo aclaró con su ley de la gravitación universal en los «Principia»." },
      { label: "Dato Científico", icon: "atom", text: "En el «Diálogo», Galileo propuso un experimento mental famoso: imaginar un barco que navega con movimiento uniforme, con mariposas, peces en una pecera y gotas que caen de una botella dentro de un camarote cerrado. Todo se comporta igual que si el barco estuviera quieto. Con ello explicó por qué no sentimos el movimiento de la Tierra. Esta idea, llamada principio de relatividad de Galileo, fue fundamental para la física de Newton y, más tarde, para la de Einstein." }
    ],
    fact: "El «Diálogo» fue incluido en el Índice de libros prohibidos tras el proceso de 1633 y permaneció allí hasta la edición del Índice de 1835. Sin embargo, la prohibición no impidió que circulara. En 1635 apareció una traducción al latín publicada en Estrasburgo, en territorio protestante, que permitió que sabios de toda Europa lo leyeran, y en 1661 se publicó una traducción al inglés. Lo que la Inquisición quería silenciar terminó convertido en una de las obras más influyentes de la historia de la ciencia.",
  },
  {
    id: "juicio-de-1633",
    bannerImage: '/assets/galileo/infographic_m3/banner_juicio-de-1633.webp',
    bannerCaption: "El 22 de junio de 1633 Galileo fue declarado vehementemente sospechoso de herejía y condenado; cumplió arresto domiciliario.",
    title: "El juicio de 1633",
    color: '#7E5A5A',
    btnImage: '/assets/galileo/infographic_m3/btn_juicio-de-1633.webp',
    image: '/assets/galileo/infographic_m3/hero_juicio-de-1633.webp',
    content: [
      "En otoño de 1632, Galileo recibió la orden de presentarse en Roma ante el Santo Oficio, la Inquisición Romana. Tenía 68 años y estaba enfermo; sus amigos pidieron que se le permitiera no viajar, pero el papa insistió. Llegó a Roma en febrero de 1633, tras pasar una cuarentena por una epidemia de peste. Gracias a la protección del gran duque de Toscana, se alojó en la residencia del embajador toscano, en Villa Médici, y no en una celda. El primer interrogatorio tuvo lugar el 12 de abril.",
      "La acusación se apoyaba en un documento de 1616 encontrado en los archivos. Según ese papel, a Galileo no solo se le había pedido abandonar la idea de Copérnico, sino que se le había ordenado no sostenerla, enseñarla ni defenderla de ninguna manera, ni de palabra ni por escrito. Galileo presentó un certificado que le había dado Belarmino, ya fallecido, donde solo constaba que no debía sostenerla ni defenderla. Los historiadores todavía discuten si aquel documento de 1616 era del todo regular.",
      "Durante el proceso, Galileo afirmó que en el «Diálogo» no había defendido el heliocentrismo, algo difícil de creer para quien leyera el libro. El 21 de junio fue interrogado bajo amenaza de tortura, un procedimiento habitual de la Inquisición para comprobar la sinceridad del acusado. No hay pruebas de que llegara a ser torturado. Al día siguiente, el 22 de junio de 1633, en el convento dominico de Santa María sopra Minerva, en Roma, se leyó la sentencia ante Galileo.",
      "El tribunal lo declaró «vehementemente sospechoso de herejía» por haber sostenido que el Sol es el centro del mundo y está inmóvil, y que la Tierra se mueve. Galileo tuvo que arrodillarse y leer en voz alta una abjuración, en la que renegaba de esas ideas y prometía no volver a defenderlas. Su libro fue prohibido y él fue condenado a prisión, una pena que poco después se cambió por arresto domiciliario de por vida. También se le ordenó rezar los siete salmos penitenciales una vez por semana durante tres años.",
      "No todos los jueces firmaron. De los diez cardenales que formaban el tribunal, tres no firmaron la sentencia, entre ellos Francesco Barberini, sobrino del propio papa. Las razones de su ausencia no se conocen con certeza. El proceso fue más complejo que una simple lucha entre ciencia y religión: intervinieron la política, el orgullo herido de un papa, las rivalidades entre grupos dentro de la Iglesia y también los errores tácticos del propio Galileo, que confió demasiado en sus amistades poderosas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La hija mayor de Galileo, la monja sor María Celeste, obtuvo permiso para rezar en lugar de su padre los salmos penitenciales semanales, y así lo hizo mientras vivió. Desde su convento de San Mateo, en Arcetri, le escribió más de cien cartas que todavía se conservan, aunque las respuestas de Galileo se han perdido. En ellas le contaba noticias, le preparaba dulces y remedios caseros, y le daba ánimo en los momentos más difíciles de su vida." },
      { label: "Dato Científico", icon: "atom", text: "Los documentos originales del proceso de Galileo se conservan en el Archivo Apostólico Vaticano. A comienzos del siglo XIX fueron llevados a París por orden de Napoleón junto con otros archivos vaticanos, y regresaron a Roma décadas después. En 1984, la Santa Sede publicó una edición de los documentos del proceso, y en 2009 apareció una edición ampliada, lo que ha permitido a los historiadores estudiar el caso con mucha más precisión que en el pasado." }
    ],
    fact: "Una abjuración es una declaración formal en la que una persona renuncia públicamente a una creencia considerada errónea. En la suya, Galileo declaraba que abandonaba la opinión de que el Sol es el centro del mundo y está inmóvil, y que la Tierra no es el centro y se mueve. El texto, firmado por él, se conserva en los archivos del proceso. Por orden del papa, la sentencia y la abjuración se enviaron a nuncios e inquisidores de toda Europa para que se dieran a conocer, especialmente entre matemáticos y filósofos.",
  },
  {
    id: "eppur-si-muove",
    bannerImage: '/assets/galileo/infographic_m3/banner_eppur-si-muove.webp',
    bannerCaption: "La famosa frase «Eppur si muove» aparece por escrito por primera vez en 1757, más de un siglo después del juicio.",
    title: "«Eppur si muove»: historia de una leyenda",
    color: '#5F7466',
    btnImage: '/assets/galileo/infographic_m3/btn_eppur-si-muove.webp',
    image: '/assets/galileo/infographic_m3/hero_eppur-si-muove.webp',
    content: [
      "Según la versión más popular de una de las anécdotas más famosas de la historia de la ciencia, después de abjurar de rodillas Galileo se levantó, golpeó el suelo con el pie y murmuró en italiano: «Eppur si muove», que significa «Y sin embargo, se mueve». Se refería a la Tierra, que seguía girando alrededor del Sol sin importar lo que dijera un tribunal. La frase se convirtió en símbolo de la resistencia del pensamiento libre frente a la autoridad, y aparece en libros, películas y canciones de todo el mundo.",
      "Pero ¿la dijo realmente? Los historiadores creen que casi con seguridad no, al menos no delante de los inquisidores, porque habría sido una provocación peligrosa que podría haberle costado una condena mucho más dura. Ninguno de los documentos del proceso ni las cartas de los testigos de la época la mencionan. La primera vez que aparece impresa es en 1757, más de un siglo después del juicio, en un libro publicado en Londres por el escritor italiano Giuseppe Baretti.",
      "Existe además una pista curiosa. A comienzos del siglo XX se descubrió que un cuadro del siglo XVII que representa a Galileo en prisión, atribuido a un pintor del entorno del español Bartolomé Esteban Murillo, tenía la frase «Eppur si muove» escrita en una parte del lienzo que había quedado oculta por el marco. Algunos historiadores creen que esto indica que la leyenda ya circulaba pocos años después de la muerte de Galileo, aunque la fecha y la autoría del cuadro siguen siendo objeto de debate.",
      "Aunque probablemente sea inventada, la frase resume muy bien una idea central de la ciencia: la naturaleza no cambia por decreto. Galileo pudo ser obligado a negar el movimiento de la Tierra, pero la Tierra siguió girando. La verdad científica no depende de quién tenga más poder ni de cuántas personas crean algo, sino de las evidencias que cualquiera puede comprobar. Por eso la anécdota sigue emocionando a tantas personas casi cuatro siglos después del juicio.",
      "La historia de esta frase también nos enseña a ser críticos con las fuentes. Muchas citas famosas atribuidas a personajes históricos fueron añadidas mucho después para hacer el relato más dramático. Un buen historiador, como un buen científico, se pregunta: ¿quién lo dijo?, ¿cuándo se escribió por primera vez?, ¿hay testigos o documentos de la época? Distinguir entre lo que sabemos con certeza y lo que es leyenda forma parte del pensamiento científico, también cuando estudiamos el pasado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Otra leyenda muy repetida es que Galileo dejó caer dos esferas de distinto peso desde lo alto de la Torre de Pisa para demostrar que caen al mismo tiempo. La historia la contó su discípulo y biógrafo Vincenzo Viviani muchos años después, y no hay otros testimonios de que ocurriera tal como se cuenta. Lo que sí está documentado es que Galileo estudió con mucho detalle la caída de los cuerpos usando planos inclinados y midiendo tiempos con relojes de agua." },
      { label: "Dato Científico", icon: "atom", text: "La Tierra gira sobre su eje una vez cada 23 horas y 56 minutos aproximadamente, lo que en el ecuador supone una velocidad de unos 1,670 kilómetros por hora. Además, viaja alrededor del Sol a unos 30 kilómetros por segundo, más de 100,000 kilómetros por hora. No notamos estos movimientos porque son casi uniformes y nos movemos junto con todo lo que nos rodea, aire incluido, exactamente como explicó Galileo con su ejemplo del barco." }
    ],
    fact: "En el relato de Giuseppe Baretti de 1757, Galileo no pronunció la frase delante de los jueces, sino en el momento en que fue puesto en libertad: miró al cielo, miró al suelo, dio un golpe con el pie y dijo, pensativo, «Eppur si muove». Con el paso del tiempo, la historia se fue exagerando hasta convertirse en un desafío lanzado en plena sala del tribunal. Así funcionan muchas leyendas: cada nueva versión añade un detalle más dramático que la anterior.",
  },
  {
    id: "arcetri-ultimos-anos",
    bannerImage: '/assets/galileo/infographic_m3/banner_arcetri-ultimos-anos.webp',
    bannerCaption: "Bajo arresto domiciliario en Arcetri, y ciego desde 1638, Galileo terminó Dos nuevas ciencias, base de la física moderna.",
    title: "Arcetri: la ciencia no se detiene",
    color: '#80735E',
    btnImage: '/assets/galileo/infographic_m3/btn_arcetri-ultimos-anos.webp',
    image: '/assets/galileo/infographic_m3/hero_arcetri-ultimos-anos.webp',
    content: [
      "Tras la sentencia, Galileo pasó unos meses bajo la custodia del arzobispo de Siena, Ascanio Piccolomini, un admirador suyo que lo trató con gran respeto. En diciembre de 1633 se le permitió regresar a su casa de campo en Arcetri, en las colinas cercanas a Florencia, llamada Il Gioiello. Allí vivió bajo arresto domiciliario el resto de su vida: no podía salir sin permiso, sus visitas estaban controladas y tenía prohibido publicar, aunque siguió escribiendo y recibiendo a discípulos.",
      "Su mayor consuelo era la cercanía de su hija Virginia, que había tomado el nombre de sor María Celeste en el convento de San Mateo, muy cerca de la villa. Pero en abril de 1634, pocos meses después del regreso de su padre, María Celeste murió de disentería a los 33 años. Galileo quedó profundamente afectado y escribió que se sentía invadido por una tristeza inmensa. Sus cartas a ella se perdieron, pero las de ella revelan a un padre cariñoso, preocupado por su familia y por su salud.",
      "A pesar del dolor, la vejez y las restricciones, Galileo terminó la obra que muchos consideran su contribución más importante a la física: «Discursos y demostraciones matemáticas en torno a dos nuevas ciencias». En ella estudió la resistencia de los materiales y el movimiento de los cuerpos: demostró que, sin resistencia del aire, los objetos caen con aceleración uniforme y que un proyectil sigue una trayectoria en forma de parábola. Como no podía publicarla en Italia, el manuscrito se envió fuera del país.",
      "El libro se publicó en 1638 en Leiden, en los Países Bajos, en la imprenta de la familia Elzevir, en territorio protestante, donde la Inquisición no tenía poder. Ese mismo año, Galileo quedó completamente ciego, probablemente por glaucoma y cataratas. Aun así siguió trabajando con la ayuda de jóvenes discípulos como Vincenzo Viviani y Evangelista Torricelli, el futuro inventor del barómetro, a quienes dictaba sus ideas. Galileo murió en Arcetri el 8 de enero de 1642, a los 77 años.",
      "Desde su casa en Arcetri, Galileo recibió visitantes famosos. Uno de ellos fue el joven poeta inglés John Milton, que años después lo mencionaría en su defensa de la libertad de imprenta, «Areopagítica», de 1644, recordando que había visitado al famoso Galileo, envejecido y prisionero de la Inquisición. Por su parte, el filósofo francés René Descartes, al conocer la condena en 1633, decidió no publicar su tratado «El mundo», que defendía ideas copernicanas. Solo se imprimió en 1664, después de su muerte."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Isaac Newton nació el 25 de diciembre de 1642, el mismo año en que murió Galileo, según el calendario juliano que todavía se usaba en Inglaterra. Con el calendario gregoriano, el que usaba Italia y usamos hoy, su nacimiento corresponde al 4 de enero de 1643. La coincidencia se cita a menudo como un relevo simbólico: Newton unió las leyes del movimiento de Galileo con las leyes planetarias de Kepler para crear su teoría de la gravitación universal." },
      { label: "Dato Científico", icon: "atom", text: "En «Dos nuevas ciencias», Galileo demostró que la distancia recorrida por un cuerpo que cae desde el reposo crece con el cuadrado del tiempo: en el doble de tiempo recorre cuatro veces más distancia, y en el triple, nueve veces más. Para comprobarlo usó bolas que rodaban por planos inclinados, que hacían la caída más lenta y fácil de medir, y cronometraba los tiempos pesando el agua que salía de un recipiente. Esta ley es hoy uno de los pilares de la física." }
    ],
    fact: "Galileo fue enterrado en una pequeña sala de la basílica de Santa Croce, en Florencia, porque no se permitió levantar un gran monumento a alguien condenado por la Inquisición. En 1737, casi un siglo después, sus restos fueron trasladados a un monumento en la nave principal de la basílica, frente a la tumba de Miguel Ángel. Durante el traslado se le extrajeron algunos dedos y un diente, y uno de esos dedos se exhibe hoy en el Museo Galileo de Florencia.",
  },
  {
    id: "reconocimiento-de-1992",
    bannerImage: '/assets/galileo/infographic_m3/banner_reconocimiento-de-1992.webp',
    bannerCaption: "El 31 de octubre de 1992 el papa Juan Pablo II reconoció ante la Pontificia Academia de las Ciencias el error cometido con Galileo.",
    title: "1992: la Iglesia reconoce el error",
    color: '#5A6A85',
    btnImage: '/assets/galileo/infographic_m3/btn_reconocimiento-de-1992.webp',
    image: '/assets/galileo/infographic_m3/hero_reconocimiento-de-1992.webp',
    content: [
      "Con el paso del tiempo, la evidencia a favor del movimiento de la Tierra se hizo abrumadora, y la postura de la Iglesia fue cambiando poco a poco. En 1741, el papa Benedicto XIV autorizó la publicación de las obras de Galileo, incluido el «Diálogo» con algunas notas. En 1758, el Índice de libros prohibidos eliminó la prohibición general de los libros que defendían el heliocentrismo. En 1822 se permitió imprimir libros que enseñaban el movimiento terrestre como un hecho, y en 1835 el «Diálogo» desapareció del Índice.",
      "En 1979, en el centenario del nacimiento de Albert Einstein, el papa Juan Pablo II pidió a teólogos, científicos e historiadores que estudiaran de nuevo el caso Galileo con honestidad. En 1981 se creó una comisión de estudio que trabajó durante más de una década, revisando documentos y publicando investigaciones. La Pontificia Academia de las Ciencias, con sede en el Vaticano, participó en esos trabajos. El objetivo era entender qué había ocurrido realmente y reconocer los errores cometidos.",
      "El 31 de octubre de 1992, Juan Pablo II pronunció un discurso ante la Pontificia Academia de las Ciencias en el que presentó las conclusiones de la comisión. Reconoció que los teólogos que juzgaron a Galileo no supieron distinguir entre la fe y una cosmología científica de su época, y que aquel error causó mucho sufrimiento a Galileo. También señaló que, en la cuestión de cómo interpretar la Biblia, Galileo, creyente sincero, se había mostrado más perspicaz que los teólogos que se le oponían.",
      "Habían pasado 359 años desde la condena de 1633. Algunos criticaron que el reconocimiento llegara tan tarde o que fuera demasiado prudente, mientras que otros lo valoraron como un gesto importante de autocrítica de una institución muy antigua. En 2009, durante el Año Internacional de la Astronomía, el Vaticano organizó actos y exposiciones en recuerdo de Galileo. Hoy el propio Observatorio Vaticano realiza investigación astronómica moderna, con un telescopio en el monte Graham, en Arizona, Estados Unidos.",
      "El caso Galileo nos deja varias lecciones. La primera: la verdad sobre la naturaleza se descubre con observaciones, mediciones y razonamientos que otros pueden comprobar, no por imposición de ninguna autoridad. La segunda: la libertad de investigar y publicar es esencial para que la ciencia avance. Y la tercera: la historia real casi siempre es más compleja que el mito. Galileo fue valiente, brillante y también imperfecto, y su historia nos sigue invitando a pensar por nosotros mismos con rigor y honestidad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El sistema europeo de navegación por satélite, que funciona de forma parecida al GPS, se llama Galileo en su honor. Sus satélites orbitan a unos 23,000 kilómetros de altura y permiten a teléfonos, barcos y aviones calcular su posición. Es un homenaje muy apropiado: Galileo propuso usar las lunas de Júpiter como un reloj del cielo para conocer la longitud, y hoy los relojes atómicos a bordo de satélites resuelven ese mismo problema con una precisión de pocos metros." },
      { label: "Dato Científico", icon: "atom", text: "El nombre de Galileo está escrito en el propio sistema solar. En la Luna hay un pequeño cráter llamado Galilaei, y en Marte otro cráter más grande con el mismo nombre. En Ganimedes, la luna que él descubrió, se encuentra Galileo Regio, una enorme región oscura y antigua de unos 3,200 kilómetros de extensión. Además, el asteroide 697 Galilea, descubierto en 1910, recibió su nombre en el tricentenario del descubrimiento de las lunas de Júpiter." }
    ],
    fact: "La sentencia de 1633 nunca fue anulada mediante un nuevo juicio. Lo que hizo la Iglesia fue retirar progresivamente las prohibiciones y, en 1992, reconocer públicamente el error de los jueces. Para los historiadores, el caso Galileo se ha convertido en un ejemplo clásico que se estudia en universidades de todo el mundo, no solo en las clases de ciencia, sino también en las de historia, filosofía, derecho y ética, porque plantea preguntas profundas sobre autoridad, evidencia y libertad.",
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
      hue: Math.random() > 0.5 ? '224,162,122' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(224,162,122,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradGalileoM3)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#7A6688", "#6B7280", "#8A6E5A", "#7E5A5A", "#5F7466", "#80735E", "#5A6A85"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#E0A27A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#E0A27A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradGalileoM3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(224,162,122,0.2)" />
            <stop offset="50%" stopColor="rgba(224,162,122,0.9)" />
            <stop offset="100%" stopColor="rgba(224,162,122,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E0A27A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CIENCIA, PODER Y LIBERTAD DE PENSAR</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(224,162,122,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">GALILEO GALILEI</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(224,162,122,0.2)'}`,
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
          layoutId="activeDotGalileoM3"
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
      border: '1px solid rgba(224,162,122,0.15)',
    }}>
      <Star size={14} style={{ color: '#E0A27A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #E0A27A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(224,162,122,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#E0A27A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_GalileoM3() {
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
      border: '1px solid rgba(224,162,122,0.12)',
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
            textAlign: 'center', color: 'rgba(224,162,122,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(224,162,122,0.08)', borderRadius: '16px',
              border: '1px solid rgba(224,162,122,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#E0A27A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Insignia Científico Valiente · El proceso de 1633 y su legado
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
