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
  "Galilei, G. (1989). Sidereus Nuncius, or The Sidereal Messenger (A. Van Helden, trad.). University of Chicago Press. (Obra original publicada en 1610).",
  "Meltzer, M. (2007). Mission to Jupiter: A History of the Galileo Project (NASA SP-2007-4231). NASA History Division.",
  "Kivelson, M. G. et al. (2000). Galileo Magnetometer Measurements: A Stronger Case for a Subsurface Ocean at Europa. Science, 289(5483), 1340-1343.",
  "Young, R. E. (1998). The Galileo Probe Mission to Jupiter: Science Overview. Journal of Geophysical Research: Planets, 103(E10), 22775-22790.",
  "Pappalardo, R. T. et al. (2024). Science Overview of the Europa Clipper Mission. Space Science Reviews, 220, 40.",
  "Sobel, D. (1995). Longitude: The True Story of a Lone Genius Who Solved the Greatest Scientific Problem of His Time. Walker & Company.",
  "European Space Agency (ESA) y EUSPA. Galileo: Europe's Global Navigation Satellite System. Documentación oficial en esa.int y euspa.europa.eu.",
  "NASA Science. Galileo Mission Overview y Europa Clipper Mission Overview. science.nasa.gov."
];

const INFOGRAPHIC_NODES = [
  {
    id: "la-antorcha-de-galileo",
    bannerImage: '/assets/galileo/infographic_m5/banner_la-antorcha-de-galileo.webp',
    bannerCaption: "En enero de 1610 Galileo descubrió cuatro lunas de Júpiter; siglos después, naves con su nombre las visitaron.",
    title: "La antorcha que encendió Galileo",
    color: '#6E7F80',
    btnImage: '/assets/galileo/infographic_m5/btn_la-antorcha-de-galileo.webp',
    image: '/assets/galileo/infographic_m5/hero_la-antorcha-de-galileo.webp',
    content: [
      "En enero de 1610, Galileo apuntó un telescopio fabricado por él mismo hacia Júpiter y vio tres, y luego cuatro, pequeñas «estrellas» alineadas junto al planeta. Noche tras noche cambiaban de lugar, y pronto comprendió que giraban alrededor de Júpiter: eran lunas. En marzo de ese año publicó el descubrimiento en un librito llamado «Sidereus Nuncius», el mensajero sideral, que se agotó rápidamente y lo hizo famoso en toda Europa.",
      "Aquellas cuatro lunas fueron una prueba poderosa contra la vieja idea de que todo en el cielo giraba alrededor de la Tierra: allí había cuerpos que claramente giraban alrededor de otro planeta. Galileo las llamó «estrellas mediceas» en honor a la familia Médici de Florencia. Los nombres que usamos hoy, Ío, Europa, Ganímedes y Calisto, los propuso el astrónomo alemán Simon Marius en 1614, siguiendo una sugerencia de Johannes Kepler.",
      "Hoy las llamamos lunas galileanas, y son mundos fascinantes. Ío es el cuerpo con más actividad volcánica del sistema solar. Europa está cubierta por una corteza de hielo que esconde un océano. Ganímedes es la luna más grande del sistema solar, incluso mayor que el planeta Mercurio. Calisto es uno de los objetos con más cráteres que conocemos. Galileo solo vio puntitos de luz; nosotros hemos enviado naves para verlas de cerca.",
      "Pero el legado de Galileo no está solo en lo que descubrió, sino en cómo lo descubrió. En su libro «El ensayador», de 1623, escribió que el gran libro de la naturaleza está escrito en lenguaje matemático, y que para leerlo hay que conocer sus caracteres: triángulos, círculos y otras figuras geométricas. Observar con instrumentos, medir con cuidado y describir lo medido con matemáticas: esa receta sigue siendo el corazón de la ciencia.",
      "Este módulo sigue la huella de Galileo desde su telescopio hasta las misiones espaciales modernas: una sonda de la NASA que llevó su nombre hasta Júpiter, un sistema europeo de navegación por satélite que también se llama Galileo, y nuevas naves que viajan ahora mismo hacia las lunas que él descubrió. En cada una de ellas encontrarás la misma idea poderosa: las preguntas sobre el universo se responden con evidencias."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Galileo no inventó el telescopio. Los primeros se fabricaron en los Países Bajos, y en 1608 el fabricante de lentes Hans Lipperhey pidió una patente por uno de ellos. Cuando Galileo oyó hablar del invento en 1609, construyó su propia versión y la mejoró rápidamente, hasta lograr unos veinte aumentos. Lo verdaderamente revolucionario fue que lo apuntó al cielo con paciencia y anotó con cuidado todo lo que veía." },
      { label: "Dato Científico", icon: "atom", text: "Ganímedes mide unos 5,268 kilómetros de diámetro, más que Mercurio, que mide unos 4,880. Sin embargo, Mercurio tiene más del doble de masa, porque está hecho sobre todo de roca y metal, mientras que Ganímedes contiene mucho hielo. Las cuatro lunas galileanas son tan brillantes que, con unos binoculares bien sujetos, puedes verlas junto a Júpiter desde tu casa, igual que las vio Galileo." }
    ],
    fact: "El recuerdo de Galileo también viaja por el espacio. La sonda Juno de la NASA, que llegó a Júpiter el 4 de julio de 2016, lleva una placa de aluminio con un retrato de Galileo y un texto escrito de su puño y letra en enero de 1610, donde describe sus observaciones de las lunas de Júpiter. La placa fue un regalo de la Agencia Espacial Italiana, el país natal del científico.",
  },
  {
    id: "la-sonda-galileo-en-camino",
    bannerImage: '/assets/galileo/infographic_m5/banner_la-sonda-galileo-en-camino.webp',
    bannerCaption: "Lanzada el 18 de octubre de 1989 desde el transbordador Atlantis, la sonda Galileo tardó seis años en llegar a Júpiter.",
    title: "La sonda Galileo: un viaje de seis años",
    color: '#8A7B6A',
    btnImage: '/assets/galileo/infographic_m5/btn_la-sonda-galileo-en-camino.webp',
    image: '/assets/galileo/infographic_m5/hero_la-sonda-galileo-en-camino.webp',
    content: [
      "Casi 380 años después del descubrimiento de las lunas, la NASA bautizó con el nombre de Galileo una de sus misiones más ambiciosas. La nave fue lanzada el 18 de octubre de 1989 dentro de la bodega del transbordador espacial Atlantis. Una vez en órbita terrestre, una etapa de cohete adicional la impulsó hacia el espacio profundo. Su objetivo era convertirse en el primer vehículo en orbitar Júpiter y estudiar el planeta y sus lunas durante años.",
      "La nave completa pesaba unas dos toneladas y media y tenía dos partes. La principal era el orbitador, diseñado para dar vueltas alrededor de Júpiter. La otra era una pequeña cápsula llamada sonda atmosférica, que viajaba unida al orbitador y que algún día se separaría para lanzarse directamente dentro de las nubes del planeta gigante. Ninguna nave había intentado antes sumergirse en la atmósfera de un planeta exterior.",
      "No había un cohete lo bastante potente para enviarla directamente a Júpiter, así que los ingenieros diseñaron una ruta ingeniosa que usaba la gravedad de otros planetas como una honda. Galileo pasó primero cerca de Venus en febrero de 1990, y después dos veces cerca de la Tierra, en diciembre de 1990 y en diciembre de 1992. Cada encuentro le daba un empujón extra de velocidad sin gastar combustible, como una honda que lanza una piedra cada vez más lejos.",
      "En el camino, Galileo se convirtió en la primera nave en visitar asteroides de cerca. En 1991 fotografió al asteroide Gaspra, y en 1993 pasó junto a Ida, de unos 60 kilómetros de largo. Al revisar las imágenes, los científicos encontraron una sorpresa: Ida tenía su propia luna diminuta, de poco más de un kilómetro, a la que llamaron Dáctilo. Era la primera vez que se confirmaba que un asteroide podía tener un satélite natural.",
      "En julio de 1994, mientras se acercaba a su destino, Galileo tuvo una vista directa de un evento histórico: los fragmentos del cometa Shoemaker-Levy 9 chocando contra Júpiter. Desde la Tierra, los impactos ocurrían en la cara del planeta que no podíamos ver, pero Galileo estaba en una posición privilegiada. Así obtuvo imágenes únicas de los destellos y bolas de fuego que los fragmentos provocaron al hundirse en la atmósfera joviana."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La misión estuvo a punto de no despegar. Estaba programada para 1986, pero el accidente del transbordador Challenger, en enero de ese año, detuvo los vuelos durante más de dos años y obligó a rediseñar su ruta por razones de seguridad. Por eso Galileo terminó usando las asistencias gravitatorias de Venus y de la Tierra. En la exploración espacial, los retrasos a veces obligan a encontrar soluciones muy creativas." },
      { label: "Dato Científico", icon: "atom", text: "Galileo no tenía paneles solares. Júpiter está unas cinco veces más lejos del Sol que la Tierra, y allí la luz solar es unas veinticinco veces más débil, así que los paneles de la época no habrían bastado. La nave obtenía electricidad de generadores de radioisótopos: el calor del plutonio, que se desintegra lentamente, se convertía en energía eléctrica mediante termopares, sin ninguna pieza móvil." }
    ],
    fact: "En abril de 1991, la gran antena principal de Galileo, que debía abrirse como un paraguas, se atascó y nunca se desplegó del todo. Parecía un desastre, porque esa antena iba a enviar la mayoría de los datos. Los ingenieros reprogramaron la computadora de la nave para comprimir la información y transmitirla por una antena pequeña. Aunque era mucho más lenta, la misión logró cumplir la mayor parte de sus objetivos científicos.",
  },
  {
    id: "descenso-a-las-nubes-de-jupiter",
    bannerImage: '/assets/galileo/infographic_m5/banner_descenso-a-las-nubes-de-jupiter.webp',
    bannerCaption: "El 7 de diciembre de 1995, la sonda atmosférica de Galileo entró en Júpiter y envió datos durante unos 58 minutos.",
    title: "1995: una sonda dentro de Júpiter",
    color: '#5F6F8A',
    btnImage: '/assets/galileo/infographic_m5/btn_descenso-a-las-nubes-de-jupiter.webp',
    image: '/assets/galileo/infographic_m5/hero_descenso-a-las-nubes-de-jupiter.webp',
    content: [
      "En julio de 1995, cinco meses antes de llegar, el orbitador soltó la pequeña sonda atmosférica, que siguió su propio camino hacia Júpiter. El 7 de diciembre de 1995 la sonda entró en la atmósfera del planeta a unos 170,000 kilómetros por hora, una de las entradas más veloces jamás logradas por un objeto fabricado por humanos. Por eso, si te preguntan en qué año entró la sonda Galileo en la atmósfera de Júpiter, la respuesta es 1995.",
      "Para sobrevivir a esa entrada, la sonda llevaba un escudo térmico enorme en proporción a su tamaño. El gas comprimido frente al escudo alcanzó temperaturas varias veces mayores que las de la superficie del Sol, y buena parte del escudo se quemó y se desprendió, tal como estaba previsto. En unos dos minutos, la sonda pasó de su velocidad extrema a una mucho más lenta, desplegó un paracaídas y comenzó a descender entre las nubes.",
      "Mientras bajaba colgada de su paracaídas, la sonda midió la temperatura, la presión, los vientos, los relámpagos y la composición química del aire joviano, y envió todo por radio al orbitador, que volaba por encima. Transmitió durante unos 58 minutos, hasta que la presión, más de veinte veces mayor que la del aire al nivel del mar en la Tierra, y el calor creciente la silenciaron para siempre. Sus restos acabaron fundidos en las profundidades.",
      "Los resultados sorprendieron a los científicos. Encontraron vientos de unos 600 kilómetros por hora que no disminuían con la profundidad, lo que indicaba que los vientos de Júpiter no dependen solo del calor del Sol, sino también del calor interno del planeta. La sonda también halló mucha menos agua y menos nubes de lo esperado. Más tarde se entendió que había caído en una zona especialmente seca y despejada, como un desierto en la atmósfera.",
      "La sonda midió además la cantidad de helio, un dato clave para entender cómo se formó Júpiter, y descubrió que gases como el argón, el criptón y el xenón eran más abundantes de lo esperado en relación con el hidrógeno. Eso dio pistas sobre los materiales helados que formaron el planeta hace unos 4,500 millones de años. Ese mismo día, el orbitador encendió su motor principal y se convirtió en el primer satélite artificial de Júpiter."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las señales de la sonda atmosférica no viajaron directamente a la Tierra. La pequeña cápsula era demasiado débil para eso, así que envió sus datos al orbitador, que los guardó y los retransmitió a la Tierra durante las semanas siguientes. Como la antena grande del orbitador no funcionaba, el envío fue lento, pero los datos llegaron completos. Es como dictarle un mensaje a un amigo para que lo reenvíe después." },
      { label: "Dato Científico", icon: "atom", text: "Júpiter está compuesto sobre todo de hidrógeno y helio, los mismos ingredientes principales del Sol. No tiene una superficie sólida donde aterrizar: conforme se desciende, el gas se vuelve cada vez más denso y caliente hasta comportarse como un líquido. En las profundidades, la presión es tan enorme que el hidrógeno se vuelve metálico y conduce electricidad, lo que genera el poderoso campo magnético del planeta." }
    ],
    fact: "La sonda atmosférica de Galileo pesaba unos 340 kilogramos, y casi la mitad de ese peso correspondía a su escudo térmico. Fue el primer objeto humano en entrar en la atmósfera de un planeta gigante. Décadas después, sus mediciones siguen siendo las únicas tomadas directamente dentro de Júpiter, y los científicos todavía las comparan con los datos que envía la sonda Juno desde su órbita alrededor del planeta.",
  },
  {
    id: "secretos-de-las-lunas-galileanas",
    bannerImage: '/assets/galileo/infographic_m5/banner_secretos-de-las-lunas-galileanas.webp',
    bannerCaption: "El orbitador Galileo dio 35 vueltas a Júpiter y halló fuertes indicios de un océano salado bajo el hielo de Europa.",
    title: "Los secretos de Ío, Europa, Ganímedes y Calisto",
    color: '#617A6B',
    btnImage: '/assets/galileo/infographic_m5/btn_secretos-de-las-lunas-galileanas.webp',
    image: '/assets/galileo/infographic_m5/hero_secretos-de-las-lunas-galileanas.webp',
    content: [
      "Entre 1995 y 2003, el orbitador Galileo dio 35 vueltas alrededor de Júpiter. Sus órbitas fueron diseñadas para pasar muy cerca de las lunas galileanas, a veces a solo unos cientos de kilómetros de su superficie. Con sus cámaras, espectrómetros y magnetómetro, estudió durante casi ocho años los mismos mundos que Galileo había visto como simples puntitos de luz a través de su pequeño telescopio en 1610. Así, la sonda Galileo estudió Júpiter y sus lunas galileanas.",
      "El descubrimiento más emocionante fue en Europa. Las fotografías mostraron una superficie helada llena de grietas, crestas y bloques de hielo desordenados, como témpanos que se movieron y volvieron a congelarse. El magnetómetro detectó que Europa altera el campo magnético de Júpiter de una forma que se explica muy bien si bajo el hielo existe una capa de agua salada, capaz de conducir electricidad. Era la mejor evidencia de un océano oculto.",
      "Ese océano podría contener más agua que todos los océanos de la Tierra juntos, y estaría en contacto con un fondo rocoso. Como en la Tierra la vida necesita agua líquida, ciertos compuestos químicos y una fuente de energía, Europa se convirtió en uno de los lugares más prometedores para buscar ambientes habitables fuera de nuestro planeta. Datos parecidos sugirieron que Ganímedes y Calisto también podrían esconder agua líquida en su interior.",
      "Galileo también observó a Ío en plena actividad, con volcanes que lanzaban columnas de gas y polvo a cientos de kilómetros de altura y lava más caliente que la de los volcanes terrestres actuales. Ío está tan activo porque la gravedad de Júpiter y de las otras lunas lo estira y lo aprieta sin parar, calentando su interior. En Ganímedes, la nave descubrió algo inesperado: la luna genera su propio campo magnético, la única luna conocida que lo hace.",
      "En 2003, a la nave casi no le quedaba combustible para controlar su orientación. Los científicos temían que, si quedaba abandonada, algún día pudiera chocar contra Europa y contaminar su posible océano con microbios terrestres que hubieran sobrevivido escondidos a bordo. Para proteger ese mundo, el 21 de septiembre de 2003 dirigieron el orbitador hacia Júpiter, donde se desintegró en su atmósfera. Fue un final planeado para cuidar a Europa."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Con los datos de Galileo, los científicos descubrieron decenas de volcanes activos nuevos en Ío. Uno de los más famosos, llamado Loki, tiene un lago de lava de unos 200 kilómetros de ancho. Las imágenes mostraron que la superficie de Ío cambia tanto que algunas regiones se veían distintas entre una visita y la siguiente, cubiertas por nuevos depósitos de lava y azufre de colores amarillos, rojos y negros." },
      { label: "Dato Científico", icon: "atom", text: "El método para descubrir el océano de Europa es ingenioso. El campo magnético de Júpiter está inclinado y gira con el planeta, así que Europa lo siente cambiar continuamente. Un material que conduce electricidad, como el agua salada, reacciona a esos cambios creando su propio campo magnético inducido. El magnetómetro de Galileo midió ese campo extra justo como se esperaba si existiera un océano salado global bajo el hielo." }
    ],
    fact: "La decisión de estrellar la sonda Galileo es un ejemplo de protección planetaria, un conjunto de reglas internacionales para no contaminar otros mundos con vida terrestre ni traer riesgos a la Tierra. La sonda Cassini terminó de la misma manera en 2017, lanzándose contra Saturno para no contaminar sus lunas Encélado y Titán. Explorar con responsabilidad también forma parte del trabajo científico.",
  },
  {
    id: "navegacion-galileo-europea",
    bannerImage: '/assets/galileo/infographic_m5/banner_navegacion-galileo-europea.webp',
    bannerCaption: "Galileo es el sistema de navegación por satélite de la Unión Europea; sus servicios iniciales comenzaron en diciembre de 2016.",
    title: "Galileo, el sistema europeo de navegación",
    color: '#7E6A6A',
    btnImage: '/assets/galileo/infographic_m5/btn_navegacion-galileo-europea.webp',
    image: '/assets/galileo/infographic_m5/hero_navegacion-galileo-europea.webp',
    content: [
      "Cuando usas un mapa en un teléfono, tu dispositivo escucha señales de satélites que orbitan a miles de kilómetros. Uno de esos sistemas lleva el nombre de nuestro científico: Galileo, el sistema de navegación por satélite de la Unión Europea, desarrollado junto con la Agencia Espacial Europea. Es una alternativa civil al GPS de Estados Unidos, al GLONASS ruso y al BeiDou chino, y la mayoría de los teléfonos modernos pueden usarlo.",
      "El primer satélite de prueba, llamado GIOVE-A, se lanzó el 28 de diciembre de 2005. Después llegaron los satélites operativos, y el 15 de diciembre de 2016 el sistema empezó a ofrecer sus servicios iniciales al público. La constelación está diseñada para contar con unos 30 satélites, entre activos y de reserva, repartidos en tres planos orbitales a unos 23,200 kilómetros de altura, de modo que desde casi cualquier lugar se vean varios a la vez.",
      "¿Cómo sabe tu teléfono dónde está? Cada satélite lleva relojes atómicos muy precisos y transmite continuamente la hora exacta y su posición. Tu receptor compara cuánto tardan en llegar las señales de al menos cuatro satélites. Como las señales viajan a la velocidad de la luz, un error de apenas una millonésima de segundo equivale a unos 300 metros de error en la posición. Por eso la precisión de los relojes es tan importante.",
      "Aquí aparece una conexión sorprendente con Galileo. En el siglo XVII, los marineros no sabían calcular bien su longitud, es decir, qué tan al este o al oeste estaban, porque para eso necesitaban saber la hora exacta en un lugar de referencia. Galileo propuso usar las lunas de Júpiter como un reloj celeste: sus eclipses ocurren en momentos predecibles que pueden verse desde cualquier lugar. Ofreció su método a España y, años después, a los Países Bajos.",
      "En el mar, observar lunas diminutas desde un barco que se balancea resultó casi imposible, pero en tierra firme el método funcionó. A finales del siglo XVII, el astrónomo Giovanni Domenico Cassini preparó tablas de los eclipses de las lunas de Júpiter que permitieron trazar mapas mucho más exactos. Hoy, el sistema Galileo resuelve el mismo problema de fondo, saber dónde estás midiendo el tiempo con precisión, pero con relojes atómicos en el espacio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Muchos satélites Galileo tienen nombres de niños y niñas. En 2011, la Comisión Europea organizó un concurso de dibujo sobre el espacio para estudiantes de los países de la Unión Europea, y los satélites de la constelación recibieron los nombres de los ganadores, como Doresa, Milena o Adam. Así, decenas de jóvenes europeos tienen su nombre dando vueltas a la Tierra a más de veinte mil kilómetros de altura." },
      { label: "Dato Científico", icon: "atom", text: "Los satélites Galileo llevan dos tipos de relojes atómicos: relojes de rubidio y máseres pasivos de hidrógeno. Un máser de hidrógeno es tan estable que solo se desviaría alrededor de un segundo en tres millones de años. Además, el sistema ofrece un servicio de búsqueda y rescate: puede recibir la señal de una baliza de emergencia y enviar de vuelta un mensaje que confirma que la ayuda está en camino." }
    ],
    fact: "Cuando los astrónomos de la Academia de Ciencias de París, entre ellos Cassini, publicaron en 1684 un mapa corregido de Francia usando observaciones astronómicas, la costa oeste del país resultó estar más hacia el este de lo que se creía, y el reino parecía haber encogido. Se cuenta que el rey Luis XIV bromeó diciendo que sus astrónomos le habían quitado más territorio que todos sus enemigos.",
  },
  {
    id: "europa-clipper-y-juice",
    bannerImage: '/assets/galileo/infographic_m5/banner_europa-clipper-y-juice.webp',
    bannerCaption: "Europa Clipper despegó el 14 de octubre de 2024 y llegará a Júpiter en 2030 para estudiar el océano de Europa.",
    title: "Europa Clipper y JUICE: rumbo a las lunas de Galileo",
    color: '#7B7391',
    btnImage: '/assets/galileo/infographic_m5/btn_europa-clipper-y-juice.webp',
    image: '/assets/galileo/infographic_m5/hero_europa-clipper-y-juice.webp',
    content: [
      "Los descubrimientos de la sonda Galileo dejaron una gran pregunta: ¿podría el océano de Europa reunir las condiciones para la vida? Para investigarlo, la NASA construyó Europa Clipper, la nave más grande que ha diseñado para explorar otro planeta. Despegó el 14 de octubre de 2024 desde el Centro Espacial Kennedy, en Florida, a bordo de un cohete Falcon Heavy de la empresa SpaceX. Esa es la misión de la NASA lanzada para estudiar Europa.",
      "Europa Clipper no viaja en línea recta. Primero pasó cerca de Marte en marzo de 2025 y volverá a pasar cerca de la Tierra en diciembre de 2026, aprovechando la gravedad de ambos planetas para ganar velocidad, igual que hizo la sonda Galileo. Se espera que llegue a Júpiter en abril de 2030. Allí no orbitará Europa, sino Júpiter, y en muchas de sus vueltas pasará muy cerca de la luna, con unos 49 sobrevuelos planeados.",
      "¿Por qué no quedarse en órbita de Europa? Porque Júpiter está rodeado de cinturones de radiación intensísimos, capaces de dañar los circuitos de cualquier nave. Si la sonda se quedara junto a Europa, la radiación la destruiría en poco tiempo. Al pasar rápido y alejarse después, Europa Clipper recibe menos radiación. Además, su electrónica más delicada viaja dentro de una bóveda con paredes de aluminio y titanio, como un cofre blindado.",
      "La nave lleva nueve instrumentos científicos y un experimento que usa sus propias señales de radio para medir la gravedad. Entre ellos hay cámaras, espectrómetros, un radar capaz de atravesar el hielo para buscar agua bajo la superficie, un magnetómetro para estudiar el océano y analizadores del polvo y los gases cercanos. Sus paneles solares, abiertos, miden más de 30 metros de punta a punta, más que una cancha de básquetbol.",
      "Europa Clipper no viaja sola. La Agencia Espacial Europea lanzó en abril de 2023 la misión JUICE, cuyo nombre en inglés significa Explorador de las Lunas Heladas de Júpiter. JUICE llegará a Júpiter en 2031, estudiará Europa, Ganímedes y Calisto, y en 2034 se convertirá en la primera nave en orbitar una luna de otro planeta: Ganímedes. Cuatro siglos después de Galileo, dos naves estudiarán a la vez las lunas que él descubrió."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Europa Clipper lleva una placa de metal grabada con un poema llamado «En alabanza del misterio», escrito por la poeta estadounidense Ada Limón, junto con los nombres de más de dos millones y medio de personas que se inscribieron en la campaña «Mensaje en una botella». La placa también incluye la palabra agua dicha en más de cien idiomas, representada como ondas de sonido." },
      { label: "Dato Científico", icon: "atom", text: "Los científicos estiman que la corteza de hielo de Europa podría tener desde unos pocos hasta varias decenas de kilómetros de grosor, y que debajo hay un océano de unos 60 a 150 kilómetros de profundidad. Para comparar, el punto más profundo de los océanos terrestres, en la fosa de las Marianas, está a unos 11 kilómetros. Europa Clipper no busca seres vivos directamente: busca saber si allí la vida sería posible." }
    ],
    fact: "Europa Clipper y la sonda Galileo tienen una relación especial: muchos de los objetivos de la nueva misión nacieron directamente de las preguntas que dejaron los datos de Galileo. Las imágenes de grietas y los indicios magnéticos del océano obtenidos en los años noventa convencieron a los científicos de que Europa merecía una misión propia. Así funciona la ciencia: cada respuesta abre nuevas preguntas que impulsan el siguiente viaje.",
  },
  {
    id: "metodo-cientifico-la-gran-herencia",
    bannerImage: '/assets/galileo/infographic_m5/banner_metodo-cientifico-la-gran-herencia.webp',
    bannerCaption: "La herencia principal de Galileo es el método científico: observar, medir, experimentar y aceptar lo que dicen las evidencias.",
    title: "La gran herencia: ciencia basada en evidencias",
    color: '#8C845E',
    btnImage: '/assets/galileo/infographic_m5/btn_metodo-cientifico-la-gran-herencia.webp',
    image: '/assets/galileo/infographic_m5/hero_metodo-cientifico-la-gran-herencia.webp',
    content: [
      "Telescopios, sondas y satélites llevan el nombre de Galileo, pero su herencia más importante no es un objeto: es una manera de pensar. Antes de él, muchas preguntas sobre la naturaleza se resolvían citando a autoridades antiguas, como Aristóteles. Galileo insistió en que una idea, por famosa que sea, debe ponerse a prueba con observaciones y experimentos, y abandonarse si las evidencias la contradicen. Esa es la base del método científico.",
      "Ese método tiene pasos que hoy se enseñan en la escuela: observar con cuidado, hacer preguntas, proponer una explicación que pueda ponerse a prueba, medir y repetir. Galileo lo practicó con sus rampas, sus péndulos y su telescopio, y lo explicó por escrito para que otros pudieran comprobarlo. Que otros científicos puedan repetir un experimento y obtener el mismo resultado sigue siendo una regla de oro de la ciencia.",
      "Defender las evidencias le costó caro. En 1633, la Inquisición romana lo juzgó por sostener que la Tierra gira alrededor del Sol, lo obligó a retractarse y lo condenó a pasar el resto de su vida bajo arresto domiciliario en su casa de Arcetri. Allí, ya anciano y quedándose ciego, terminó su libro sobre el movimiento, publicado en 1638 en Leiden, en los Países Bajos. En 1992, el papa Juan Pablo II reconoció públicamente los errores de aquel juicio.",
      "El sueño de Galileo de ver más lejos sigue vivo en los telescopios espaciales. El Hubble, lanzado en 1990, observa el universo desde encima de la atmósfera, que hace titilar a las estrellas y borra los detalles finos. El telescopio James Webb, lanzado el 25 de diciembre de 2021, capta luz infrarroja de galaxias que se formaron poco después del nacimiento del universo. De los veinte aumentos de Galileo a estos gigantes hay cuatro siglos de mejoras.",
      "En 2009, la Organización de las Naciones Unidas celebró el Año Internacional de la Astronomía para recordar los 400 años de las primeras observaciones con telescopio de Galileo. Millones de personas en más de cien países participaron en noches de observación y actividades escolares. Ese es quizá el mejor homenaje posible: que cualquier persona curiosa, con un telescopio sencillo y muchas preguntas, pueda mirar el cielo y descubrir algo por sí misma."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Galileo escribió varios de sus libros más importantes en italiano y no en latín, el idioma de los sabios de la época. Su «Diálogo» de 1632 está escrito como una conversación entre tres personajes, para que comerciantes, artesanos y cualquier lector curioso pudieran seguir los argumentos. En cierto modo, Galileo fue también uno de los primeros grandes divulgadores científicos de la historia." },
      { label: "Dato Científico", icon: "atom", text: "Una diferencia clave entre la ciencia y otras formas de conocer es que la ciencia está dispuesta a corregirse. Incluso Galileo se equivocó: pensaba que las mareas se producían por el movimiento de la Tierra y rechazó la idea de Kepler de que la Luna las causaba, que resultó ser correcta. El método científico permitió corregir ese error. Ningún científico es infalible, pero el método, aplicado por muchos, se acerca cada vez más a la verdad." }
    ],
    fact: "Galileo murió el 8 de enero de 1642, el mismo año en que nació Isaac Newton según el calendario inglés de la época. Más de tres siglos después, en 1989, una nave con el nombre de Galileo despegó hacia Júpiter, y en 2024 Europa Clipper partió hacia una de sus lunas. Cada misión es un eslabón de la misma cadena: preguntas audaces, instrumentos ingeniosos y respeto absoluto por lo que muestran las evidencias.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradGalileoM5)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6E7F80", "#8A7B6A", "#5F6F8A", "#617A6B", "#7E6A6A", "#7B7391", "#8C845E"];
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
          <linearGradient id="gradGalileoM5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(224,162,122,0.2)" />
            <stop offset="50%" stopColor="rgba(224,162,122,0.9)" />
            <stop offset="100%" stopColor="rgba(224,162,122,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E0A27A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DE PADUA A LAS LUNAS DE JÚPITER</text>
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
          layoutId="activeDotGalileoM5"
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
export default function InteractiveInfographic_GalileoM5() {
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
              🏆 Estrella de Legado: sigue la huella de Galileo de 1610 a Europa Clipper
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
