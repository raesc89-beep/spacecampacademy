'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#B87D5E', style = {} }) {
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
  "James, F. A. J. L. (2010). Michael Faraday: A Very Short Introduction. Oxford: Oxford University Press.",
  "Forbes, N. y Mahon, B. (2014). Faraday, Maxwell, and the Electromagnetic Field: How Two Men Revolutionized Physics. Amherst: Prometheus Books.",
  "Hamilton, J. (2002). Faraday: The Life. London: HarperCollins.",
  "Maxwell, J. C. (1865). A Dynamical Theory of the Electromagnetic Field. Philosophical Transactions of the Royal Society of London, 155, 459-512.",
  "Einstein, A. (1905). Zur Elektrodynamik bewegter Körper. Annalen der Physik, 17, 891-921.",
  "BIPM (2019). The International System of Units (SI), 9.ª edición. Bureau International des Poids et Mesures.",
  "Faraday, M. (1861). A Course of Six Lectures on the Chemical History of a Candle. London: Griffin, Bohn and Co.",
  "Royal Institution of Great Britain. Faraday Museum and Christmas Lectures history. https://www.rigb.org"
];

const INFOGRAPHIC_NODES = [
  {
    id: "de-encuadernador-a-leyenda",
    bannerImage: '/assets/faraday/infographic_m5/banner_de-encuadernador-a-leyenda.webp',
    bannerCaption: "Faraday nació pobre en 1791, aprendió leyendo los libros que encuadernaba y llegó a ser uno de los grandes de la ciencia.",
    title: "De encuadernador a leyenda",
    color: '#5B7A8C',
    btnImage: '/assets/faraday/infographic_m5/btn_de-encuadernador-a-leyenda.webp',
    image: '/assets/faraday/infographic_m5/hero_de-encuadernador-a-leyenda.webp',
    content: [
      "Michael Faraday nació el 22 de septiembre de 1791 en Newington Butts, cerca de Londres, en una familia muy humilde. Su padre era herrero y a menudo estaba enfermo, y hubo épocas en que el pequeño Michael recibía una sola hogaza de pan para toda una semana. Fue a la escuela solo unos pocos años y aprendió lo básico: leer, escribir y hacer cuentas. Nada en su infancia hacía pensar que se convertiría en uno de los científicos más importantes de la historia.",
      "A los 14 años entró como aprendiz en la tienda del encuadernador y librero George Riebau. Allí pasaba los días cosiendo y encuadernando libros, y en sus ratos libres los leía. Dos lo marcaron especialmente: un artículo sobre electricidad de la Encyclopaedia Britannica y el libro «Conversaciones sobre química» de Jane Marcet, escrito para explicar la química de forma sencilla. Faraday no se conformaba con leer: con su escaso dinero compraba materiales y repetía los experimentos.",
      "En 1812, un cliente de la tienda le regaló entradas para escuchar las conferencias de Humphry Davy, el químico más famoso de Inglaterra, en la Royal Institution. Faraday tomó notas detalladas, las pasó en limpio, las ilustró y las encuadernó en un volumen de unas 300 páginas, que envió a Davy pidiendo trabajo. Al principio no había vacantes, pero en 1813 un asistente del laboratorio fue despedido tras una pelea, y Davy recomendó al joven encuadernador. Faraday tenía 21 años.",
      "Desde ese humilde puesto, Faraday ascendió hasta lo más alto. Fue director del laboratorio en 1825 y, desde 1833, primer profesor fulleriano de química de la Royal Institution, un cargo creado especialmente para él. Descubrió la rotación electromagnética en 1821, la inducción en 1831, las leyes de la electrólisis en 1833, el efecto de la jaula en 1836 y la relación entre magnetismo y luz en 1845. También aisló el benceno y fue de los primeros en licuar gases como el cloro.",
      "A pesar de su fama, Faraday siguió siendo un hombre modesto. Según sus biógrafos, rechazó el título de caballero y declinó la presidencia de la Royal Society, la academia científica más prestigiosa de Gran Bretaña. Quería ser recordado simplemente como «Michael Faraday». Su fe religiosa, como miembro de una pequeña iglesia cristiana llamada de los sandemanianos, le inspiraba humildad y la convicción de que estudiar la naturaleza era una forma de admirar su orden."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Faraday acompañó a Davy en un largo viaje por Europa entre 1813 y 1815, en plena época de las guerras napoleónicas. Durante el recorrido conoció a científicos como André-Marie Ampère y Alessandro Volta, el inventor de la pila. Aunque a veces lo trataban como a un sirviente, aquel viaje fue para Faraday una universidad itinerante: practicó el francés, visitó laboratorios de varios países y conoció en persona a los grandes de la ciencia." },
      { label: "Dato Científico", icon: "atom", text: "El libro de Jane Marcet que inspiró a Faraday, «Conversaciones sobre química», se publicó en 1805 y estaba escrito como diálogos entre una profesora y dos alumnas. Fue uno de los libros de divulgación científica más exitosos de su tiempo. Años después, ya famoso, Faraday expresó su gratitud a Marcet: decía que aquel libro le había dado su primera base en la química y le había mostrado que la ciencia se podía aprender con constancia." }
    ],
    fact: "La vida de Faraday enseña que la curiosidad y la dedicación pueden superar la falta de privilegios. No tuvo dinero, títulos universitarios ni contactos familiares; tuvo libros que pasaban por sus manos, cuadernos bien ordenados y una constancia admirable. Llevaba registros meticulosos de sus experimentos y numeraba cada párrafo de sus diarios de laboratorio. Esa disciplina le permitió avanzar donde otros, con muchos más recursos, se detuvieron.",
  },
  {
    id: "faradio-unidad",
    bannerImage: '/assets/faraday/infographic_m5/banner_faradio-unidad.webp',
    bannerCaption: "El faradio (F) es la unidad de capacidad eléctrica del Sistema Internacional: mide cuánta carga guarda un condensador.",
    title: "El faradio: una unidad con su nombre",
    color: '#8A6F5A',
    btnImage: '/assets/faraday/infographic_m5/btn_faradio-unidad.webp',
    image: '/assets/faraday/infographic_m5/hero_faradio-unidad.webp',
    content: [
      "Uno de los homenajes más permanentes a Faraday está escondido en todos los aparatos electrónicos: el faradio, cuyo símbolo es F, la unidad de capacidad eléctrica del Sistema Internacional. La capacidad mide cuánta carga eléctrica puede guardar un dispositivo llamado condensador o capacitor por cada voltio aplicado. Un condensador tiene un faradio si almacena un culombio de carga cuando se le aplica una diferencia de potencial de un voltio. Un teléfono inteligente contiene cientos de condensadores.",
      "Un condensador está formado por dos placas conductoras separadas por un material aislante. Cuando se conecta a una batería, una placa se carga positivamente y la otra negativamente, y entre ambas se forma un campo eléctrico que guarda energía. Faraday estudió a fondo este fenómeno: descubrió en 1837 que el material aislante entre las placas cambia la cantidad de carga que se puede almacenar, y difundió para esos materiales el nombre de dieléctricos, otra palabra que todavía usamos.",
      "Un faradio es una cantidad enorme. Los condensadores de los circuitos comunes tienen capacidades de microfaradios, millonésimas de faradio, o incluso de picofaradios, billonésimas de faradio. Sin embargo, existen dispositivos llamados supercondensadores que alcanzan miles de faradios. Pueden cargarse y descargarse en segundos, cientos de miles de veces, y se usan en autobuses eléctricos, grúas y sistemas que necesitan entregar mucha energía de golpe o recuperarla al frenar.",
      "El nombre del faradio se propuso en Gran Bretaña en la década de 1860 y fue adoptado internacionalmente en el Congreso Internacional de Electricistas celebrado en París en 1881, junto con otras unidades como el voltio, el amperio, el ohmio y el culombio. Faraday había muerto en 1867, y la comunidad científica quiso honrar su trabajo fundamental sobre la electricidad. Hoy el faradio es una de las 22 unidades derivadas con nombre propio del Sistema Internacional de Unidades.",
      "El nombre de Faraday aparece en muchos otros lugares de la ciencia. Están la constante de Faraday, de la electroquímica; la ley de inducción de Faraday, base de los generadores; el efecto Faraday, que describe cómo un campo magnético gira la polarización de la luz; y, por supuesto, la jaula de Faraday. También hay un cráter en la Luna llamado Faraday. Y entre 1991 y 2001, su retrato apareció en los billetes de 20 libras del Banco de Inglaterra, junto a una escena de sus conferencias."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Muchos de los componentes más pequeños de una tarjeta electrónica son condensadores. Son diminutos rectángulos de color marrón o beige, y los más pequeños miden menos de medio milímetro, como un grano de arena fina. Filtran el ruido eléctrico, estabilizan los voltajes y guardan energía por instantes. Cada vez que enciendes una consola o un teléfono, enormes cantidades de carga entran y salen de ellos, medidas en unidades que llevan el nombre de Faraday." },
      { label: "Dato Científico", icon: "atom", text: "La capacidad de un condensador de placas planas depende de tres factores: es mayor cuanto más grande es el área de las placas, cuanto más cerca están entre sí y cuanto mejor es el material dieléctrico que las separa. Faraday midió este último efecto, al que llamó capacidad inductiva específica, comparando condensadores idénticos con aire, vidrio, goma laca o azufre entre sus partes. Hoy se llama permitividad relativa o constante dieléctrica." }
    ],
    fact: "La unidad de capacidad eléctrica es el faradio. Otras unidades del Sistema Internacional también honran a científicos: el newton, de fuerza, a Isaac Newton; el amperio, de corriente, a André-Marie Ampère; y el voltio, de voltaje, a Alessandro Volta. El faradio se abrevia con una F mayúscula, y la constante de Faraday también se representa con una F, pero escrita en cursiva: una mide capacidad y la otra es una carga eléctrica por mol.",
  },
  {
    id: "de-lineas-a-ondas",
    bannerImage: '/assets/faraday/infographic_m5/banner_de-lineas-a-ondas.webp',
    bannerCaption: "Maxwell convirtió las líneas de fuerza de Faraday en ecuaciones (1865) y descubrió que la luz es una onda electromagnética.",
    title: "De las líneas de fuerza a las ondas",
    color: '#6E8B74',
    btnImage: '/assets/faraday/infographic_m5/btn_de-lineas-a-ondas.webp',
    image: '/assets/faraday/infographic_m5/hero_de-lineas-a-ondas.webp',
    content: [
      "La idea más profunda de Faraday fue la de las líneas de fuerza. Para él, el espacio alrededor de un imán o de una carga no estaba vacío, sino lleno de un campo con existencia física propia. Muchos físicos de su tiempo veían esas líneas como un simple dibujo útil, porque Faraday no podía expresarlas con matemáticas avanzadas. Pero un joven escocés, James Clerk Maxwell, leyó con atención los trabajos de Faraday y comprendió que en esas imágenes había una teoría completa esperando ser escrita.",
      "Entre 1855 y 1856, Maxwell presentó un trabajo titulado «Sobre las líneas de fuerza de Faraday», en el que traducía las ideas del inglés al lenguaje matemático. Faraday, que ya tenía más de sesenta años, le escribió encantado y le dijo que al principio casi se había asustado al ver tanta fuerza matemática aplicada a su tema, pero que luego se maravilló de lo bien que el tema la soportaba. Fue el comienzo de una relación científica de enorme importancia.",
      "En 1865, Maxwell publicó su gran obra, «Una teoría dinámica del campo electromagnético». Sus ecuaciones describían cómo los campos eléctricos y magnéticos se generan y se influyen mutuamente. Al estudiarlas, encontró que un campo eléctrico cambiante produce uno magnético, y uno magnético cambiante produce uno eléctrico, de modo que ambos pueden viajar juntos por el espacio como una onda. Calculó su velocidad y obtuvo casi exactamente la velocidad de la luz medida por otros científicos.",
      "La conclusión fue asombrosa: la luz es una onda electromagnética. Faraday ya había sospechado una conexión entre luz y magnetismo. En 1845 descubrió que un campo magnético intenso puede girar la dirección de vibración de un rayo de luz que atraviesa un vidrio pesado, fenómeno que hoy llamamos efecto Faraday. Y en 1846, en un texto titulado «Pensamientos sobre vibraciones de rayos», especuló con que la luz podría ser una vibración de las líneas de fuerza. Maxwell confirmó esa intuición con matemáticas.",
      "En 1887, el físico alemán Heinrich Hertz generó y detectó en su laboratorio ondas electromagnéticas invisibles, las ondas de radio, y demostró que se comportan como la luz: se reflejan, se refractan y viajan a la misma velocidad. Hoy sabemos que el espectro electromagnético incluye ondas de radio, microondas, infrarrojo, luz visible, ultravioleta, rayos X y rayos gamma. Todos son el mismo fenómeno con distinta longitud de onda, y todos se explican con la idea de campo que Faraday imaginó."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "James Clerk Maxwell nació en Edimburgo en 1831, el mismo año en que Faraday descubrió la inducción electromagnética. Es una coincidencia hermosa: el año en que nació la tecnología eléctrica también nació el hombre que escribiría su teoría matemática. Maxwell murió joven, a los 48 años, en 1879, el mismo año en que nació Albert Einstein, quien más tarde continuaría el camino abierto por ambos con la teoría de la relatividad." },
      { label: "Dato Científico", icon: "atom", text: "La velocidad de la luz en el vacío es exactamente 299,792,458 metros por segundo, casi 300,000 kilómetros por segundo. Desde 1983 este valor es exacto por definición, porque el metro se define a partir de él. A esa velocidad, la luz podría dar más de siete vueltas a la Tierra en un segundo y tarda unos 8 minutos y 20 segundos en llegar del Sol hasta nosotros. Todas las ondas electromagnéticas viajan a esa velocidad en el vacío." }
    ],
    fact: "Las ondas electromagnéticas son la base de casi toda la comunicación moderna: la radio, la televisión, el Wi-Fi, el Bluetooth, los teléfonos móviles y el GPS. Las sondas Voyager, lanzadas en 1977 y que hoy viajan más allá de la heliosfera, todavía envían datos a la Tierra con ondas de radio. En el caso de la Voyager 1, su señal tarda cerca de un día en llegar, pero sigue siendo una onda del mismo tipo que Maxwell predijo a partir de las ideas de Faraday.",
  },
  {
    id: "einstein-y-faraday",
    bannerImage: '/assets/faraday/infographic_m5/banner_einstein-y-faraday.webp',
    bannerCaption: "Einstein tenía en su estudio retratos de Faraday, Newton y Maxwell; el problema del imán y el conductor inspiró su relatividad.",
    title: "El retrato en el estudio de Einstein",
    color: '#7D6B8F',
    btnImage: '/assets/faraday/infographic_m5/btn_einstein-y-faraday.webp',
    image: '/assets/faraday/infographic_m5/hero_einstein-y-faraday.webp',
    content: [
      "Albert Einstein admiraba profundamente a Faraday. En su estudio de Berlín tenía en la pared los retratos de tres científicos: Isaac Newton, James Clerk Maxwell y Michael Faraday. Para Einstein, representaban las grandes etapas de la física: Newton, la mecánica y la gravitación; Faraday y Maxwell, la idea de campo. En 1931 escribió que el cambio en la concepción de la realidad iniciado por ellos fue el más profundo y fructífero que había vivido la física desde Newton.",
      "La influencia de Faraday aparece en las primeras líneas del artículo más famoso de Einstein. En 1905 publicó «Sobre la electrodinámica de los cuerpos en movimiento», donde presentó la relatividad especial. Comienza analizando un experimento de inducción: un imán y un conductor. Si el imán se mueve y el conductor está quieto, o si el conductor se mueve y el imán está quieto, la corriente inducida es la misma, pero la teoría de entonces explicaba ambos casos de maneras completamente distintas.",
      "A Einstein le parecía absurdo que la naturaleza distinguiera entre los dos casos, si lo único que importa es el movimiento relativo entre el imán y el conductor. Esa incomodidad lo llevó a proponer que las leyes de la física deben ser iguales para todos los observadores que se mueven a velocidad constante, y que la velocidad de la luz en el vacío es la misma para todos. De esas dos ideas surgieron consecuencias sorprendentes, como que el tiempo y el espacio no son absolutos.",
      "Einstein también contó que, desde los 16 años, se preguntaba qué vería si pudiera viajar junto a un rayo de luz a su misma velocidad. Según las ecuaciones de Maxwell, vería un campo electromagnético congelado, algo que nunca se ha observado. Unos diez años después, esa pregunta encontró respuesta en la relatividad especial. Así, una cadena de ideas une los cuadernos de Faraday con la famosa ecuación de Einstein que relaciona la energía con la masa.",
      "La relatividad cambió nuestra visión del cosmos y también tiene aplicaciones muy prácticas. Los satélites del sistema GPS llevan relojes atómicos que deben corregirse por efectos relativistas, porque el tiempo transcurre a un ritmo ligeramente distinto en órbita que en la superficie terrestre. Sin esas correcciones, los errores de posición crecerían unos 10 kilómetros cada día. Cada vez que un mapa en tu teléfono te ubica correctamente, la herencia de Faraday, Maxwell y Einstein trabaja para ti."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Einstein y Faraday compartían una forma de pensar: ambos razonaban con imágenes. Faraday visualizaba líneas de fuerza que llenaban el espacio, y Einstein imaginaba trenes, relojes, ascensores y rayos de luz en sus famosos experimentos mentales. Einstein llegó a explicar que las palabras no parecían desempeñar ningún papel en su forma de pensar, y que trabajaba con imágenes que después traducía con esfuerzo al lenguaje y a las matemáticas." },
      { label: "Dato Científico", icon: "atom", text: "En su artículo de 1905, Einstein no incluyó referencias formales a otros científicos, algo muy inusual. Aun así, el problema del imán y el conductor con el que abre el texto es exactamente el fenómeno de inducción que Faraday descubrió en 1831. La relatividad mostró además que los campos eléctrico y magnético son dos caras de una misma realidad: lo que un observador mide como campo magnético, otro en movimiento puede medirlo en parte como campo eléctrico." }
    ],
    fact: "Los retratos de Newton, Faraday y Maxwell acompañaron a Einstein en su estudio durante sus años en Berlín. Era su manera de recordar sobre qué hombros se apoyaba. Faraday, el aprendiz de encuadernador sin estudios universitarios, compartía la pared con Newton, profesor de Cambridge, y con Maxwell, uno de los grandes físicos matemáticos de la historia: una prueba de que el talento y la curiosidad no dependen de los títulos académicos.",
  },
  {
    id: "induccion-en-tu-vida",
    bannerImage: '/assets/faraday/infographic_m5/banner_induccion-en-tu-vida.webp',
    bannerCaption: "La inducción de 1831 hace funcionar generadores, transformadores, cargadores inalámbricos y motores de autos eléctricos.",
    title: "La inducción mueve el mundo",
    color: '#8C7A4F',
    btnImage: '/assets/faraday/infographic_m5/btn_induccion-en-tu-vida.webp',
    image: '/assets/faraday/infographic_m5/hero_induccion-en-tu-vida.webp',
    content: [
      "El 29 de agosto de 1831, Faraday enrolló dos bobinas de alambre en lados opuestos de un anillo de hierro. Al conectar una de ellas a una batería, notó que la aguja de un galvanómetro conectado a la otra se movía por un instante. Había descubierto la inducción electromagnética: un campo magnético que cambia produce una corriente eléctrica. Semanas después demostró que basta mover un imán dentro de una bobina para generar electricidad. Fue, quizá, el descubrimiento más importante de su vida.",
      "Casi toda la electricidad que usamos se produce por inducción. En las centrales hidroeléctricas, eólicas, térmicas o nucleares, una turbina hace girar grandes imanes o bobinas dentro de un generador, y el campo magnético cambiante induce corriente en el alambre. Faraday construyó en 1831 un generador pionero, un disco de cobre que giraba entre los polos de un imán y producía una corriente continua. Era pequeño y débil, pero contenía el principio de las gigantescas centrales actuales.",
      "Los motores eléctricos recorren el camino inverso: convierten electricidad en movimiento. Faraday mostró este efecto en 1821, cuando hizo girar un alambre con corriente alrededor de un imán. Los autos eléctricos modernos usan motores que aprovechan estas leyes; algunos, llamados motores de inducción, hacen girar el rotor induciendo corrientes en él, sin necesidad de imanes permanentes. Además, cuando el auto frena, el motor funciona como generador y recarga la batería: es el frenado regenerativo.",
      "Los transformadores, que elevan o reducen el voltaje para transportar la electricidad desde las centrales hasta tu casa, son en esencia el anillo de hierro de Faraday a gran escala: dos bobinas enrolladas alrededor de un núcleo de hierro. El cargador inalámbrico de un teléfono funciona igual, con una bobina en la base y otra dentro del aparato. Las cocinas de inducción calientan la olla induciendo corrientes en su fondo metálico, y muchas tarjetas sin contacto reciben energía del lector por inducción.",
      "La inducción también llegó al espacio. Muchos satélites controlan su orientación con magnetopares, bobinas que, al recibir corriente, interactúan con el campo magnético terrestre y hacen girar suavemente la nave sin gastar combustible. Algunos instrumentos científicos, llamados magnetómetros de bobina, detectan campos magnéticos variables en el espacio gracias a las corrientes inducidas. Desde una central eléctrica hasta una sonda espacial, la ley de 1831 sigue funcionando exactamente como Faraday la describió."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Según una anécdota muy repetida, un político preguntó a Faraday para qué servía la electricidad, y él respondió que algún día el gobierno cobraría impuestos por ella. Los historiadores creen que la historia probablemente no ocurrió así, porque no aparece en documentos de la época. Pero resume una verdad: un descubrimiento que parecía una simple curiosidad de laboratorio se convirtió en la base de la economía del mundo moderno." },
      { label: "Dato Científico", icon: "atom", text: "La ley de inducción de Faraday dice que el voltaje inducido en un circuito es proporcional a la rapidez con que cambia el flujo magnético que lo atraviesa. No importa si se mueve el imán, se mueve la bobina o cambia la corriente de un electroimán cercano: lo que cuenta es el cambio. El signo menos que aparece en la ecuación, asociado a la ley de Lenz de 1834, indica que la corriente inducida siempre se opone al cambio que la produce." }
    ],
    fact: "Los motores de los autos eléctricos funcionan gracias a la inducción y a las fuerzas electromagnéticas que Faraday estudió. En cambio, los paneles solares producen electricidad por el efecto fotovoltaico, y las baterías de litio la guardan mediante reacciones químicas, no por inducción. Distinguir estos fenómenos ayuda a entender que la tecnología moderna combina muchas ramas de la física y la química, y que la de Faraday es una de las más importantes.",
  },
  {
    id: "faraday-divulgador",
    bannerImage: '/assets/faraday/infographic_m5/banner_faraday-divulgador.webp',
    bannerCaption: "Faraday impulsó en 1825 las Conferencias de Navidad de la Royal Institution, que aún hoy acercan la ciencia a los jóvenes.",
    title: "El gran divulgador de la ciencia",
    color: '#4F6D7A',
    btnImage: '/assets/faraday/infographic_m5/btn_faraday-divulgador.webp',
    image: '/assets/faraday/infographic_m5/hero_faraday-divulgador.webp',
    content: [
      "Faraday no solo hacía ciencia: le encantaba explicarla. Recordaba lo mucho que habían significado para él las conferencias de Davy cuando era un joven aprendiz, y quería abrir las puertas de la ciencia a todos. En 1825 impulsó en la Royal Institution las Conferencias de Navidad, una serie de charlas pensadas especialmente para niños y jóvenes. La tradición ha continuado desde entonces, con una pausa durante algunos años de la Segunda Guerra Mundial, y hoy se transmite por televisión.",
      "Faraday dio 19 series de Conferencias de Navidad a lo largo de su vida. La más famosa fue «La historia química de una vela», presentada en 1848 y repetida en 1860-1861. Con una simple vela encendida explicaba la combustión, la composición del aire, el papel del oxígeno y del dióxido de carbono, y hasta cómo respiramos. Las charlas se publicaron como libro en 1861 y se siguen leyendo en todo el mundo, traducidas a muchos idiomas, más de 160 años después.",
      "También creó en 1826 los Discursos de los Viernes por la Noche, conferencias para el público adulto en las que científicos presentaban descubrimientos recientes de forma comprensible. Faraday preparaba sus demostraciones con muchísimo cuidado: ensayaba los experimentos, cuidaba el ritmo de su voz y anotaba consejos para hablar en público, como no leer el texto, mostrar objetos reales y no alargar una charla más de una hora. Muchos de esos consejos siguen siendo útiles para cualquier estudiante.",
      "Faraday también usó su prestigio para servir a la sociedad. Asesoró durante décadas a la Trinity House, el organismo encargado de los faros de Gran Bretaña, y ayudó a mejorar su iluminación y ventilación. Investigó las causas de una explosión mortal en la mina de carbón de Haswell en 1844 y propuso medidas de seguridad. Y en 1855 escribió una carta al periódico The Times describiendo la terrible contaminación del río Támesis, cuya agua comparó con un líquido marrón y opaco.",
      "Faraday defendía el pensamiento crítico. En 1853, cuando en Londres se puso de moda el «giro de mesas», una práctica en la que se creía que fuerzas misteriosas movían los muebles, diseñó un experimento ingenioso con tablas y palancas indicadoras. Demostró que eran los propios participantes quienes empujaban la mesa sin darse cuenta, y publicó sus resultados en la prensa. Para él, la ciencia debía enseñar a juzgar con pruebas y no con creencias: esa es otra parte esencial de su legado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las Conferencias de Navidad han sido impartidas por científicos muy conocidos. David Attenborough habló sobre el lenguaje de los animales en 1973, Carl Sagan presentó una serie sobre los planetas en 1977 y Richard Dawkins habló sobre la evolución en 1991, con el título «Creciendo en el universo». Cada año, miles de jóvenes las ven en directo o por televisión, continuando la tradición que Faraday ayudó a fundar hace dos siglos." },
      { label: "Dato Científico", icon: "atom", text: "En «La historia química de una vela», Faraday mostraba que la cera no arde directamente: primero se funde, sube por la mecha como líquido, se convierte en vapor y es ese vapor el que se quema al mezclarse con el oxígeno del aire. La luz amarilla de la llama proviene de diminutas partículas de carbono que brillan por el calor, y la combustión produce agua y dióxido de carbono, algo que él demostraba con experimentos sencillos ante el público." }
    ],
    fact: "El gran auditorio de la Royal Institution, donde Faraday dio sus charlas, sigue en uso en Londres. En el mismo edificio se encuentra el Museo Faraday, que incluye una recreación de su laboratorio magnético del sótano. Entre los objetos expuestos está el anillo de hierro con el que descubrió la inducción en 1831, junto con otros aparatos originales de sus experimentos sobre electricidad, magnetismo y luz.",
  },
  {
    id: "leccion-curiosidad",
    bannerImage: '/assets/faraday/infographic_m5/banner_leccion-curiosidad.webp',
    bannerCaption: "Faraday murió el 25 de agosto de 1867; su lección es que la curiosidad y la dedicación superan la falta de privilegios.",
    title: "La lección: curiosidad y constancia",
    color: '#8F5F5F',
    btnImage: '/assets/faraday/infographic_m5/btn_leccion-curiosidad.webp',
    image: '/assets/faraday/infographic_m5/hero_leccion-curiosidad.webp',
    content: [
      "En 1858, la reina Victoria, por sugerencia del príncipe Alberto, ofreció a Faraday una casa en Hampton Court, cerca de Londres, en reconocimiento a sus servicios a la ciencia. Allí pasó sus últimos años junto a su esposa, Sarah Barnard, con quien estuvo casado más de 45 años. Su memoria comenzó a fallar y poco a poco se retiró de la investigación. Murió el 25 de agosto de 1867, a los 75 años, sentado en el sillón de su estudio en la casa de Hampton Court.",
      "Fiel a su modestia, había pedido un funeral sencillo. Fue enterrado en el cementerio de Highgate, en Londres, en la zona destinada a los disidentes religiosos, bajo una lápida simple. Se dice que rechazó la posibilidad de ser sepultado en la Abadía de Westminster, donde descansan reyes y grandes científicos como Newton. Más tarde se colocó en la abadía una placa conmemorativa cerca de la tumba de Newton, para honrar a quien muchos consideran uno de los mejores físicos experimentales de la historia.",
      "La gran lección de su vida es que la curiosidad y la dedicación pueden superar la falta de privilegios. Faraday no heredó dinero ni fue a la universidad; aprendió leyendo, preguntando, tomando notas y repitiendo experimentos. Cuando las matemáticas avanzadas le resultaron difíciles, encontró otra forma de pensar, con imágenes y experimentos ingeniosos. Su historia demuestra que la ciencia no está reservada para unos pocos genios: está abierta a cualquiera que observe con atención y no se rinda.",
      "Faraday también enseña la importancia del método. Escribía todo en sus diarios de laboratorio, que suman miles de párrafos numerados, y anotaba tanto los experimentos exitosos como los fallidos. En sus últimos años intentó demostrar una relación entre la gravedad y la electricidad. No lo consiguió, pero describió con honestidad sus resultados negativos y escribió que, aunque no apoyaban su idea, no quebrantaban su convicción de que existía una conexión. Esa honestidad es parte de la buena ciencia.",
      "Hoy, cada vez que enciendes una luz, cargas un teléfono, viajas en un tren eléctrico o ves una imagen enviada desde una sonda espacial, estás usando el legado de Faraday. Su visión de un universo lleno de campos sigue guiando a la física, desde los aceleradores de partículas del CERN hasta los telescopios que observan galaxias lejanas. El niño pobre que encuadernaba libros en Londres nos dejó algo más grande que sus inventos: la prueba de que una mente curiosa puede iluminar el mundo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Faraday y su esposa Sarah no tuvieron hijos, pero acogieron en su hogar a varias sobrinas. Una de ellas, Jane Barnard, vivió con ellos durante muchos años, lo ayudó en su trabajo y lo cuidó en su vejez. Faraday escribía cartas cariñosas a su familia y a sus amigos, en las que mostraba su sentido del humor y su asombro constante por la naturaleza. Detrás del gran científico había una persona cercana y afectuosa." },
      { label: "Dato Científico", icon: "atom", text: "Los diarios de laboratorio de Faraday, que abarcan de 1820 a 1862, se publicaron en siete volúmenes en la década de 1930 y contienen más de 16,000 párrafos numerados. Muestran su forma de trabajar: proponía una idea, diseñaba un experimento, anotaba lo que ocurría y modificaba el plan según los resultados. Historiadores y científicos los estudian todavía para comprender cómo pensaba uno de los experimentadores más brillantes de todos los tiempos." }
    ],
    fact: "Michael Faraday murió en 1867, dos años después de que Maxwell publicara su teoría del campo electromagnético y veinte años antes de que Hertz demostrara la existencia de las ondas de radio. No llegó a ver la radio, la bombilla eléctrica ni las grandes redes de electricidad, pero todas nacieron de sus descubrimientos. Su vida, de 1791 a 1867, abarcó desde la era de las velas hasta el umbral de la era eléctrica.",
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
      hue: Math.random() > 0.5 ? '184,125,94' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(184,125,94,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradFaradayM5)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7A8C", "#8A6F5A", "#6E8B74", "#7D6B8F", "#8C7A4F", "#4F6D7A", "#8F5F5F"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#B87D5E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#B87D5E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradFaradayM5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(184,125,94,0.2)" />
            <stop offset="50%" stopColor="rgba(184,125,94,0.9)" />
            <stop offset="100%" stopColor="rgba(184,125,94,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B87D5E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL HOMBRE QUE ILUMINÓ EL MUNDO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(184,125,94,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MICHAEL FARADAY</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(184,125,94,0.2)'}`,
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
          layoutId="activeDotFaradayM5"
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
      border: '1px solid rgba(184,125,94,0.15)',
    }}>
      <Star size={14} style={{ color: '#B87D5E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #B87D5E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(184,125,94,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#B87D5E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_FaradayM5() {
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
      border: '1px solid rgba(184,125,94,0.12)',
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
            textAlign: 'center', color: 'rgba(184,125,94,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(184,125,94,0.08)', borderRadius: '16px',
              border: '1px solid rgba(184,125,94,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#B87D5E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Campeón de la Electricidad: de encuadernador a leyenda de la física
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
