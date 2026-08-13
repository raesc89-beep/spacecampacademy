'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Ancient Greek Science themed) ────────────────
function DecoColumn({ size = 70, color = '#2E6B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Doric column */}
      <rect x="20" y="10" width="20" height="40" fill="none" stroke={color} strokeWidth="1.5" rx="1" />
      <rect x="16" y="6" width="28" height="5" fill="none" stroke={color} strokeWidth="1.2" rx="1" />
      <rect x="16" y="49" width="28" height="5" fill="none" stroke={color} strokeWidth="1.2" rx="1" />
      {/* Fluting lines */}
      <line x1="25" y1="12" x2="25" y2="48" stroke={color} strokeWidth="0.7" opacity="0.4" />
      <line x1="30" y1="12" x2="30" y2="48" stroke={color} strokeWidth="0.7" opacity="0.4" />
      <line x1="35" y1="12" x2="35" y2="48" stroke={color} strokeWidth="0.7" opacity="0.4" />
      {/* Pediment triangle */}
      <path d="M14 6 L30 -2 L46 6" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoLever({ size = 80, color = '#3A7FA0', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Fulcrum triangle */}
      <path d="M38 42 L42 42 L40 34 Z" fill={color} opacity="0.4" />
      {/* Lever beam */}
      <line x1="10" y1="30" x2="70" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Weight on left */}
      <rect x="6" y="24" width="10" height="8" fill={color} opacity="0.3" rx="1" />
      {/* Small weight on right */}
      <rect x="64" y="32" width="6" height="5" fill={color} opacity="0.3" rx="1" />
      {/* Force arrow */}
      <path d="M68 30 L68 22 M65 25 L68 22 L71 25" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoWaves({ size = 70, color = '#2E6B8A', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 49" style={{ opacity: 0.22, ...style }}>
      {/* Water waves for buoyancy */}
      <path d="M5 20 Q15 14 25 20 Q35 26 45 20 Q55 14 65 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M5 28 Q15 22 25 28 Q35 34 45 28 Q55 22 65 28" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M5 36 Q15 30 25 36 Q35 42 45 36 Q55 30 65 36" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Floating object */}
      <rect x="28" y="12" width="14" height="10" fill={color} opacity="0.25" rx="2" />
      {/* Bubbles */}
      <circle cx="20" cy="40" r="1.5" fill={color} opacity="0.4" />
      <circle cx="50" cy="42" r="1" fill={color} opacity="0.3" />
      <circle cx="38" cy="44" r="1.5" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoCompass({ size = 60, color = '#D4C9B8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Circle */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
      {/* Compass legs */}
      <line x1="30" y1="30" x2="18" y2="50" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="30" y1="30" x2="48" y2="44" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Arc drawn by compass */}
      <path d="M18 50 Q30 58 48 44" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="3 2" />
      {/* Pi symbol suggestion */}
      <text x="30" y="18" textAnchor="middle" fill={color} fontSize="10" fontFamily="serif" opacity="0.4">π</text>
    </svg>
  );
}

function DecoGear({ size = 65, color = '#C0B09C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="2.5" fill={color} opacity="0.4" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 30 + 14 * Math.cos(rad);
        const y1 = 30 + 14 * Math.sin(rad);
        const x2 = 30 + 19 * Math.cos(rad);
        const y2 = 30 + 19 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />;
      })}
    </svg>
  );
}

function DecoScroll({ size = 70, color = '#E8E0D4', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 49" style={{ opacity: 0.22, ...style }}>
      {/* Scroll body */}
      <rect x="15" y="10" width="40" height="30" fill="none" stroke={color} strokeWidth="1.2" rx="2" />
      {/* Scroll rolls */}
      <ellipse cx="15" cy="25" rx="4" ry="15" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="55" cy="25" rx="4" ry="15" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Text lines */}
      <line x1="22" y1="18" x2="48" y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="22" y1="23" x2="45" y2="23" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="22" y1="28" x2="48" y2="28" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="22" y1="33" x2="40" y2="33" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'siracusa-ciudad-genio': [DecoColumn, DecoScroll, DecoWaves],
  'eureka-corona': [DecoWaves, DecoCompass, DecoGear],
  'principio-arquimedes': [DecoWaves, DecoColumn, DecoLever],
  'palanca-maquinas': [DecoLever, DecoGear, DecoColumn],
  'geometria-arquimedes': [DecoCompass, DecoScroll, DecoGear],
  'maquinas-guerra': [DecoGear, DecoLever, DecoColumn],
  'muerte-legado': [DecoScroll, DecoCompass, DecoWaves],
};

// ─── Content Data ──────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Netz, R. & Noel, W. (2007). The Archimedes Codex: How a Medieval Prayer Book Is Revealing the True Genius of Antiquity\'s Greatest Scientist. Da Capo Press',
  'Stein, S. (1999). Archimedes: What Did He Do Besides Cry Eureka? Mathematical Association of America',
  'Dijksterhuis, E.J. (1987). Archimedes. Princeton University Press (reissue of 1956 original)',
  'Plutarco (c. 75 d.C.). Vidas Paralelas: Vida de Marcelo. Traducción múltiple',
  'Heath, T.L. (1897). The Works of Archimedes. Cambridge University Press',
  'Jaeger, M. (2008). Archimedes and the Roman Imagination. University of Michigan Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'siracusa-ciudad-genio',
    title: 'Siracusa: La Ciudad del Genio',
    color: '#E8E0D4',
    btnImage: '/assets/griegos/griegos_m6.png',
    image: '/assets/griegos/griegos_m6.png',
    content: [
      'Arquímedes nació alrededor del año 287 a.C. en Siracusa, una próspera colonia griega situada en la costa oriental de la isla de Sicilia. En aquel periodo, Siracusa era una de las ciudades más grandes y ricas del mundo mediterráneo, con una población estimada de entre 200,000 y 500,000 habitantes, según los cálculos del historiador Diodoro Sículo. La ciudad rivalizaba en esplendor con Atenas y Alejandría, y su puerto era uno de los más activos del comercio marítimo antiguo, conectando las rutas entre Grecia, Cartago y Roma.',
      'Su padre, Fidias, era astrónomo y posiblemente pariente del rey Hierón II de Siracusa, quien gobernó la ciudad durante casi 54 años (desde el 270 hasta el 215 a.C.). Hierón II fue un mecenas de las ciencias y las artes, y mantuvo una relación cercana con Arquímedes, encargándole numerosos proyectos de ingeniería militar y civil. Según Plutarco, Hierón consideraba a Arquímedes un recurso más valioso que todo un ejército, y le consultaba regularmente sobre problemas técnicos de la ciudad.',
      'Arquímedes viajó a Alejandría, Egipto, para completar su formación intelectual, donde estudió en la tradición de Euclides en el Museo de Alejandría, la institución académica más prestigiosa de la antigüedad. Allí conoció a Conón de Samos y a Eratóstenes de Cirene, con quienes mantuvo correspondencia científica durante toda su vida. Eratóstenes, famoso por calcular la circunferencia de la Tierra con un error inferior al 2%, era el bibliotecario jefe de Alejandría, y Arquímedes le dedicó varios de sus tratados matemáticos.',
      'A su regreso a Siracusa, Arquímedes se dedicó tanto a la investigación teórica como a la invención práctica. A diferencia de muchos filósofos griegos que despreciaban el trabajo manual, Arquímedes combinó la reflexión matemática abstracta con la construcción de dispositivos mecánicos. El historiador romano Tito Livio registró que el rey Hierón II le pidió a Arquímedes que diseñara un barco enorme llamado Siracusia, de aproximadamente 110 metros de eslora, equipado con jardines, gimnasio, templo y una catapulta diseñada por el propio inventor.',
      'Siracusa ocupaba una posición estratégica única en el Mediterráneo occidental, lo que la convirtió en objeto de deseo tanto de Roma como de Cartago durante las Guerras Púnicas (264-146 a.C.). Esta ubicación geopolítica determinó gran parte de la vida y la muerte de Arquímedes, ya que sus inventos militares fueron diseñados específicamente para defender la ciudad de los ataques navales romanos. La tensión entre el genio individual y las fuerzas de la historia marca toda la biografía de este pensador, cuyas ideas sobrevivieron al imperio que destruyó su ciudad.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El barco Siracusia, diseñado bajo la supervisión de Arquímedes alrededor del 240 a.C., fue uno de los navíos más grandes de la antigüedad. Según Ateneo de Naucratis, podía transportar 1,940 toneladas de carga, tenía 20 filas de remeros, un sistema de bombeo de agua inventado por Arquímedes (el tornillo de Arquímedes) para achicar la sentina, y mosaicos decorativos en sus suelos. Hierón II lo regaló a Ptolomeo III de Egipto porque era demasiado grande para atracar en la mayoría de los puertos de Sicilia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El tornillo de Arquímedes, inventado durante la construcción del Siracusia, consiste en un cilindro hueco con una hélice interior que, al girarse, eleva el agua desde un nivel inferior a uno superior. Este diseño sigue utilizándose hoy en plantas de tratamiento de aguas residuales, centrales hidroeléctricas de baja presión y sistemas de riego en los Países Bajos. Ingenieros modernos han calculado que un tornillo de Arquímedes bien diseñado tiene una eficiencia de bombeo del 60-80%, comparable a bombas eléctricas modernas.' },
    ],
    fact: 'Siracusa acuñaba su propia moneda con la imagen de la diosa Atenea y un carro de guerra tirado por cuatro caballos (cuadriga). Estas monedas, llamadas decadracmas siracusanas, pesaban aproximadamente 43 gramos de plata pura y son consideradas por los numismáticos como las monedas más artísticas de toda la antigüedad clásica. El Metropolitan Museum de Nueva York conserva varios ejemplares que muestran la técnica de acuñación griega, superior en detalle a cualquier moneda romana contemporánea.',
  },
  {
    id: 'eureka-corona',
    title: '¡Eureka!',
    color: '#2E6B8A',
    btnImage: '/assets/griegos/griegos_m6.png',
    image: '/assets/griegos/griegos_m6.png',
    content: [
      'La historia más conocida de Arquímedes involucra una corona de oro y una bañera. Según el relato del arquitecto romano Vitruvio, escrito unos 200 años después del evento, el rey Hierón II encargó a un orfebre la fabricación de una corona votiva de oro puro para ofrecerla en un templo. Sin embargo, Hierón sospechaba que el artesano había sustituido parte del oro por plata, un metal más barato, quedándose con la diferencia. El rey planteó el problema a Arquímedes: determinar si la corona era de oro puro sin fundirla ni dañarla.',
      'Arquímedes reflexionó sobre el problema durante días sin encontrar solución. Un día, mientras se sumergía en una bañera pública, observó que el nivel del agua subía proporcionalmente al volumen de su cuerpo sumergido. En ese instante comprendió que podía medir el volumen exacto de la corona sumergiéndola en agua y comparando el desplazamiento con el de un bloque de oro puro del mismo peso. Si la corona contenía plata, al ser la plata menos densa que el oro (10,490 kg/m³ frente a 19,320 kg/m³), desplazaría más agua que el bloque de oro puro.',
      'Según Vitruvio, Arquímedes salió corriendo desnudo por las calles de Siracusa gritando "¡Eureka! ¡Eureka!" (en griego: εὕρηκα, que significa "¡Lo he encontrado!"). Aunque muchos historiadores consideran que este detalle particular fue adornado por la tradición oral, el principio científico subyacente es válido y verificable. La diferencia en el volumen de agua desplazada entre oro puro y una aleación oro-plata del mismo peso es medible con los instrumentos de precisión disponibles en la Siracusa del siglo III a.C.',
      'El método real que Arquímedes probablemente utilizó fue más sofisticado que la simple inmersión. El matemático Galileo Galilei argumentó en 1586, en su tratado "La Bilancetta" (La Pequeña Balanza), que Arquímedes habría usado una balanza hidrostática: pesó la corona primero en aire y luego sumergida en agua, comparando la pérdida de peso aparente con la del oro puro. Este método es significativamente más preciso que medir el agua desplazada, ya que elimina los errores causados por la tensión superficial del líquido y las burbujas de aire atrapadas en la superficie irregular de la corona.',
      'El experimento de la corona estableció un precedente fundamental en la historia de la ciencia: la idea de resolver un problema práctico mediante un principio general. Arquímedes no se limitó a verificar una corona específica, sino que formuló una ley universal sobre la relación entre densidad, volumen y flotabilidad que se aplica a todos los objetos sumergidos en cualquier fluido. Este paso de lo particular a lo general, de la observación concreta a la ley abstracta, es la esencia misma del método científico que se desarrollaría formalmente unos 1,800 años después con Francis Bacon y Galileo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La palabra "eureka" se convirtió en una expresión universal para describir un momento de descubrimiento repentino. El estado de California adoptó "Eureka" como su lema oficial en 1849, durante la Fiebre del Oro, cuando los mineros gritaban la misma palabra al encontrar pepitas de oro. La ciudad de Eureka, California, fundada en 1850, lleva este nombre en honor a Arquímedes. El lema aparece en el sello oficial del estado hasta el día de hoy.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La densidad del oro puro es de 19,320 kg/m³, mientras que la plata tiene una densidad de 10,490 kg/m³. Una corona de 1 kilogramo de oro puro tendría un volumen de 51.76 cm³. Si el orfebre hubiera reemplazado el 30% del oro con plata, el volumen total de la corona aumentaría a 63.97 cm³, una diferencia de 12.21 cm³ que desplazaría esa cantidad adicional de agua. Esta diferencia, equivalente a unas 2.5 cucharaditas, era detectable con los instrumentos de medición de la época.' },
    ],
    fact: 'En 2003, los investigadores Chris Rorres de la Universidad de Drexel y Harry Harris realizaron una réplica experimental del test de la corona de Arquímedes, utilizando coronas fabricadas con aleaciones conocidas de oro y plata. Confirmaron que el método de la balanza hidrostática (pesar en aire y en agua) permite detectar adulteraciones de tan solo un 5-10% de plata en oro, con los instrumentos disponibles en el siglo III a.C. El estudio fue publicado en la revista The Mathematical Intelligencer.',
  },
  {
    id: 'principio-arquimedes',
    title: 'El Principio de Arquímedes',
    color: '#D4C9B8',
    btnImage: '/assets/griegos/griegos_m6.png',
    image: '/assets/griegos/griegos_m6.png',
    content: [
      'El Principio de Arquímedes, formulado en su tratado "Sobre los cuerpos flotantes" (Περὶ τῶν ὀχουμένων), establece que todo cuerpo sumergido total o parcialmente en un fluido experimenta una fuerza vertical ascendente (empuje) igual al peso del fluido desplazado por ese cuerpo. Este principio se aplica a todos los fluidos, tanto líquidos como gases, y es la base teórica que explica por qué los barcos flotan, los globos aerostáticos se elevan y los submarinos pueden controlar su profundidad.',
      '"Sobre los cuerpos flotantes" es el primer tratado conocido de hidrostática en la historia de la ciencia. Está dividido en dos libros: el primero establece los principios fundamentales del equilibrio de los fluidos y la flotación, mientras que el segundo analiza la estabilidad de los paraboloides de revolución flotantes, un estudio matemáticamente complejo que no fue superado hasta los trabajos de Simon Stevin en 1586 y de Leonhard Euler en el siglo XVIII. Arquímedes demostró que la superficie de un fluido en reposo es esférica, con centro en el centro de la Tierra.',
      'Para entender el principio, considera una pelota de playa en una piscina. La pelota flota porque su peso total (incluyendo el aire interior) es menor que el peso del volumen de agua que desplazaría si estuviera completamente sumergida. La pelota se hunde hasta que el peso del agua desplazada iguala exactamente su propio peso: ese es el punto de equilibrio. Un bloque de acero se hunde porque su densidad (7,874 kg/m³) es mucho mayor que la del agua (1,000 kg/m³), por lo que incluso completamente sumergido, el empuje no compensa su peso.',
      'El principio explica fenómenos cotidianos que parecen paradójicos. Un barco de acero flota porque su casco hueco desplaza un volumen de agua cuyo peso supera el peso total del barco. Un portaaviones de la clase Nimitz pesa 101,600 toneladas, pero su casco desplaza más de 101,600 toneladas de agua marina (densidad 1,025 kg/m³), generando un empuje suficiente. Si comprimieras todo ese acero en un bloque sólido sin espacios huecos, se hundiría inmediatamente porque su volumen sería demasiado pequeño para desplazar suficiente agua.',
      'La aplicación moderna del principio de Arquímedes se extiende a campos que el propio inventor no podría haber imaginado. Los submarinos nucleares regulan su profundidad llenando o vaciando tanques de lastre con agua marina, cambiando su peso total sin alterar su volumen: cuando pesan más que el agua desplazada, se hunden; cuando pesan menos, ascienden. Los dirigibles y globos aerostáticos aplican el mismo principio en aire en lugar de agua: el helio (densidad 0.164 kg/m³) dentro del globo es mucho menos denso que el aire circundante (1.225 kg/m³), generando un empuje neto hacia arriba.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Mar Muerto, situado entre Israel y Jordania, tiene una salinidad del 34.2% (diez veces más salada que el océano promedio), lo que eleva su densidad a 1,240 kg/m³. Debido al principio de Arquímedes, una persona flota en el Mar Muerto sin esfuerzo alguno, ya que el cuerpo humano (densidad promedio de 985 kg/m³) es significativamente menos denso que esa agua hipersalina. Es prácticamente difícil hundirse, incluso intentándolo de forma deliberada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El tratado "Sobre los cuerpos flotantes" de Arquímedes se perdió en Occidente durante la Edad Media y fue redescubierto en 1269 por el traductor flamenco Willem van Moerbeke, quien tradujo al latín una copia griega que luego también desapareció. La única versión griega superviviente se encontró en el Palimpsesto de Arquímedes, un manuscrito del siglo X sobreescrito con oraciones en el siglo XIII. Fue descubierto en Estambul en 1906 por el filólogo Johan Ludvig Heiberg y subastado por Christie\'s en 1998 por 2 millones de dólares.' },
    ],
    fact: 'El principio de Arquímedes se utiliza en medicina forense para determinar si los pulmones de un recién nacido fallecido contenían aire al momento de la muerte (prueba docimástica pulmonar hidrostática). Si los pulmones flotan en agua, el bebé respiró al menos una vez; si se hunden, no llegó a respirar. Esta prueba, documentada por primera vez por Jan Swammerdam en 1667, se basa directamente en el principio que Arquímedes formuló en Siracusa 19 siglos antes y sigue utilizándose en patología forense contemporánea.',
  },
  {
    id: 'palanca-maquinas',
    title: 'La Palanca y las Máquinas',
    color: '#3A7FA0',
    btnImage: '/assets/griegos/griegos_m6.png',
    image: '/assets/griegos/griegos_m6.png',
    content: [
      'Arquímedes es autor de una de las frases más citadas en la historia de la ciencia: "Dadme un punto de apoyo y moveré el mundo" (en griego: δῶς μοι πᾶ στῶ καὶ τὰν γᾶν κινάσω). Esta declaración, registrada por Pappus de Alejandría en el siglo IV d.C., resume el principio de la palanca: con un brazo de palanca suficientemente largo y un punto de apoyo (fulcro) adecuado, una fuerza pequeña puede mover una carga de cualquier peso. Arquímedes formalizó esta relación en su tratado "Sobre el equilibrio de los planos" con una demostración matemática rigurosa.',
      'El principio de la palanca se expresa mediante la ecuación F₁ × d₁ = F₂ × d₂, donde F₁ es la fuerza aplicada, d₁ es la distancia desde la fuerza al fulcro, F₂ es la carga a mover y d₂ es la distancia desde la carga al fulcro. Si una persona aplica 10 kilogramos de fuerza a 3 metros del fulcro, puede levantar 30 kilogramos situados a 1 metro del fulcro. Este principio se conoce como ventaja mecánica, y Arquímedes fue el primero en demostrarlo matemáticamente usando el concepto de centro de gravedad.',
      'Para demostrar el poder de las máquinas simples al rey Hierón II, Arquímedes organizó una exhibición pública. Según Plutarco en su "Vida de Marcelo", Arquímedes utilizó un sistema de poleas compuestas (polispasto) para arrastrar, él solo y sentado en una silla, un barco de tres mástiles completamente cargado con tripulación y mercancías desde el muelle hasta el mar. Hierón quedó tan impresionado que declaró que a partir de ese momento "debemos creer todo lo que Arquímedes diga", y le ordenó diseñar las defensas de Siracusa.',
      'Arquímedes identificó y analizó las máquinas simples que forman la base de toda la ingeniería mecánica: la palanca, la polea, el tornillo, el plano inclinado y la cuña. Su análisis del tornillo produjo el famoso tornillo de Arquímedes para elevar agua, mientras que su estudio de las poleas compuestas permitió multiplicar la fuerza humana de forma sistemática. Un sistema de cuatro poleas compuestas proporciona una ventaja mecánica de 16:1, lo que significa que una persona puede levantar 800 kilogramos aplicando solo 50 kilogramos de fuerza.',
      'El concepto de centro de gravedad, introducido por Arquímedes en "Sobre el equilibrio de los planos", es fundamental para la ingeniería moderna. Arquímedes calculó el centro de gravedad de triángulos, paralelepípedos y secciones parabólicas con métodos geométricos que anticiparon el cálculo integral. La NASA utiliza cálculos de centro de gravedad derivados directamente de los principios de Arquímedes para determinar la estabilidad de cohetes y naves espaciales: un Saturn V de 111 metros de altura debe tener su centro de gravedad ubicado con una precisión de centímetros para no desviarse durante el despegue.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los constructores de las pirámides de Egipto ya usaban palancas y planos inclinados alrededor del 2560 a.C., más de 2,000 años antes de Arquímedes. Sin embargo, los egipcios utilizaban estas máquinas de forma empírica, sin comprender la teoría matemática detrás de su funcionamiento. La contribución de Arquímedes fue demostrar por qué funcionan, expresando las relaciones de fuerza y distancia con ecuaciones exactas que permiten predecir con precisión el resultado antes de construir la máquina.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para "mover la Tierra" con una palanca, como propuso Arquímedes, se necesitarían números de magnitud astronómica. La masa de la Tierra es de 5.972 × 10²⁴ kilogramos. Si una persona pudiera ejercer una fuerza constante de 60 kilogramos (su propio peso) y quisiera mover la Tierra solo 1 centímetro, el brazo de palanca debería tener una longitud de aproximadamente 10²² metros (unos 1,000 años luz). Además, empujar la palanca esa distancia llevaría billones de años. La física de Arquímedes es correcta, pero las escalas lo hacen imposible en la práctica.' },
    ],
    fact: 'En 2017, ingenieros de la Universidad de Cambridge reconstruyeron un polispasto (sistema de poleas compuestas) basado en las descripciones de Arquímedes. Con un sistema de seis poleas y una cuerda de 50 metros, una sola persona de 70 kilogramos logró levantar un bloque de piedra caliza de 2,500 kilogramos, demostrando una ventaja mecánica de 36:1. El experimento validó los cálculos teóricos de Arquímedes con un margen de error inferior al 8%, atribuible a la fricción en las poleas modernas.',
  },
  {
    id: 'geometria-arquimedes',
    title: 'La Geometría de Arquímedes',
    color: '#C0B09C',
    btnImage: '/assets/griegos/griegos_m6.png',
    image: '/assets/griegos/griegos_m6.png',
    content: [
      'Arquímedes calculó el valor de pi (π) con mayor precisión que cualquier matemático anterior. En su tratado "Medida del Círculo", demostró que π está comprendido entre 3 + 10/71 (aproximadamente 3.14084) y 3 + 10/70 (aproximadamente 3.14285), obteniendo un valor medio de 3.1418, con un error inferior al 0.01% respecto al valor real. Para lograrlo, inscribió y circunscribió polígonos regulares de 96 lados dentro y fuera de un círculo, calculando sus perímetros con aritmética de fracciones sin notación decimal ni calculadoras.',
      'Su resultado más preciado fue la relación entre la esfera y el cilindro circunscrito. En su tratado "Sobre la esfera y el cilindro", Arquímedes demostró que el volumen de una esfera es exactamente dos tercios del volumen del cilindro que la contiene, y que la superficie de la esfera es también dos tercios de la superficie total del cilindro (incluyendo las tapas). Expresado en fórmulas modernas: V_esfera = (4/3)πr³ y V_cilindro = 2πr³, por lo que la razón es exactamente 2:3. Arquímedes consideró este resultado su mayor logro y pidió que se grabara una esfera inscrita en un cilindro en su tumba.',
      'El "Método de los teoremas mecánicos", descubierto en el Palimpsesto de Arquímedes en 1906, reveló que Arquímedes usaba una técnica sorprendente: antes de producir la demostración geométrica formal, "descubría" los resultados mediante experimentos mentales de equilibrio mecánico. Imaginaba las figuras geométricas como objetos con peso, las "cortaba" en infinitas láminas delgadas y las equilibraba en una palanca. Este método de descubrimiento anticipó el cálculo integral desarrollado por Newton y Leibniz unos 1,900 años después.',
      'En "La cuadratura de la parábola", Arquímedes demostró que el área encerrada por una parábola y una línea recta es exactamente 4/3 del área del triángulo inscrito con la misma base y altura. Para esta demostración utilizó el método de exhaución, una técnica donde se aproxima el área desconocida con una serie infinita de triángulos cada vez más pequeños: 1 + 1/4 + 1/16 + 1/64 + ... La suma de esta serie geométrica converge a 4/3, y Arquímedes lo demostró rigurosamente sin el concepto moderno de límite.',
      'Otro tratado notable es "El arenario" (Ψαμμίτης), en el cual Arquímedes se propuso calcular cuántos granos de arena cabrían en el universo conocido. Para ello, inventó un sistema de notación numérica capaz de expresar números de magnitud astronómica, superando las limitaciones del sistema de numeración griego. Estimó que el universo (que él suponía como una esfera con centro en la Tierra) podría contener hasta 10⁶³ granos de arena. Este trabajo es notable porque muestra que Arquímedes conocía el modelo heliocéntrico de Aristarco de Samos, quien propuso que la Tierra gira alrededor del Sol 1,800 años antes que Copérnico.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Palimpsesto de Arquímedes es un manuscrito del siglo X que contiene siete tratados de Arquímedes copiados por un escriba bizantino. En el siglo XIII, un monje raspó el texto, giró las páginas 90 grados y escribió oraciones encima. En 1998, un comprador anónimo adquirió el manuscrito por 2 millones de dólares en una subasta de Christie\'s. Científicos del Walters Art Museum de Baltimore usaron rayos X de sincrotrón del Stanford Linear Accelerator para leer el texto borrado, revelando dos tratados perdidos de Arquímedes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El método de exhaución de Arquímedes para calcular π con polígonos de 96 lados requirió extraer raíces cuadradas de números de hasta cuatro cifras y realizar más de 30 operaciones aritméticas complejas sin notación decimal. Matemáticos modernos han verificado que todos sus cálculos intermedios son correctos. El récord actual de dígitos de π es de 105 billones de dígitos, calculado en 2024 por el equipo de StorageReview usando un servidor con 1.5 terabytes de RAM durante 75 días de computación continua.' },
    ],
    fact: 'El general romano Cicerón relata en sus "Tusculanas" (45 a.C.) que durante su mandato como cuestor en Sicilia en el 75 a.C., buscó y encontró la tumba de Arquímedes, abandonada y cubierta de maleza, cerca de la puerta Agrigentina de Siracusa. Identificó la tumba por la esfera inscrita en un cilindro grabada en la lápida, tal como Arquímedes había solicitado. Cicerón ordenó limpiar el monumento, pero desde entonces la tumba se ha perdido nuevamente y su ubicación exacta sigue siendo desconocida.',
  },
  {
    id: 'maquinas-guerra',
    title: 'Las Máquinas de Guerra',
    color: '#1E5B7A',
    btnImage: '/assets/griegos/griegos_m6.png',
    image: '/assets/griegos/griegos_m6.png',
    content: [
      'El asedio de Siracusa por las fuerzas romanas del general Marco Claudio Marcelo comenzó en el año 214 a.C. durante la Segunda Guerra Púnica, y duró aproximadamente dos años, hasta el 212 a.C. Roma envió una flota de 60 quinquerremes (barcos de guerra con cinco filas de remeros) y un ejército terrestre de más de 25,000 soldados. Marcelo esperaba tomar la ciudad rápidamente, pero no había contado con las defensas diseñadas por Arquímedes, que convirtieron el asedio en una de las campañas más prolongadas de la historia militar romana.',
      'Plutarco describe en detalle las máquinas de Arquímedes en su "Vida de Marcelo". Las catapultas de largo alcance lanzaban proyectiles de piedra de hasta 250 kilogramos contra los barcos romanos a distancias de más de 180 metros. Para los barcos que lograban acercarse a las murallas, Arquímedes diseñó catapultas de corto alcance que disparaban a través de troneras (aberturas pequeñas en las murallas), creando un sistema de defensa en capas que cubría todas las distancias, desde el horizonte hasta la base de los muros.',
      'El arma más temida era la "Garra de Arquímedes" (también llamada "Mano de Hierro"), un dispositivo mecánico que consistía en un brazo articulado con un gancho de hierro que se extendía desde la muralla. Cuando un barco romano se acercaba demasiado, la garra se enganchaba a la proa, la levantaba y luego la soltaba bruscamente, volcando la nave o estrellándola contra las rocas. Según Polibio, los marineros romanos desarrollaron un terror tal a estos dispositivos que huían en cuanto veían cualquier viga asomando por encima de las murallas.',
      'La tradición antigua también atribuye a Arquímedes el uso de espejos parabólicos para concentrar la luz solar y prender fuego a los barcos romanos a distancia. Esta historia, conocida como el "rayo de calor de Arquímedes", fue registrada por primera vez por Luciano de Samosata en el siglo II d.C. y por Juan Tzetzes en el siglo XII. En 2005, estudiantes del MIT (Massachusetts Institute of Technology) intentaron replicar el experimento con 127 espejos planos de 30 cm². Lograron encender un barco de madera a 30 metros de distancia, pero concluyeron que la técnica sería poco práctica en condiciones de combate real.',
      'El impacto psicológico de las máquinas de Arquímedes fue tan grande como su efectividad militar. Plutarco registra que Marcelo bromeaba diciendo que Arquímedes usaba sus barcos como "cubos para sacar agua del mar", y que los soldados romanos entraron en pánico generalizado: "Si veían un trozo de cuerda o un palo de madera asomar por las murallas, gritaban que Arquímedes estaba apuntando alguna máquina contra ellos, y huían". Marcelo finalmente tomó Siracusa no mediante asalto directo, sino aprovechando una festividad religiosa en la que las defensas estaban desatendidas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2005, el programa televisivo "MythBusters" (Cazadores de Mitos) intentó replicar el "rayo de calor" de Arquímedes con 500 espejos planos apuntados a un barco de pesca a 30 metros. El barco se calentó pero no se incendió. Sin embargo, en 2009, un grupo de 500 alumnos del MIT repitió el experimento con mejores condiciones de alineación y logró encender una réplica de vela de barco romano en menos de 10 minutos. La conclusión científica actual es que el efecto térmico era posible pero difícil de sostener durante un combate naval activo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fuerza de levantamiento de la Garra de Arquímedes ha sido analizada por ingenieros modernos. Un estudio publicado en la revista Technology and Culture estimó que un brazo de palanca de 8-10 metros de longitud, operado por un sistema de poleas con 15-20 hombres, podía generar una fuerza de levantamiento de entre 3,000 y 5,000 kilogramos-fuerza, suficiente para levantar la proa de un quinquerremo romano (peso total estimado de 40-50 toneladas) e inclinarlo lo suficiente para volcarlo o provocar una vía de agua catastrófica.' },
    ],
    fact: 'El general Marcelo admiraba profundamente a Arquímedes a pesar de ser su enemigo. Plutarco relata que Marcelo se refería a Arquímedes como un "geómetra divino" y que sus soldados llamaban al científico siracusano "Briareo" (un gigante mitológico de cien brazos) porque sus máquinas parecían atacar desde todas direcciones simultáneamente. Cuando finalmente tomó Siracusa en el 212 a.C., Marcelo dio orden explícita de capturar a Arquímedes con vida y tratarlo con respeto, una orden que trágicamente no fue obedecida.',
  },
  {
    id: 'muerte-legado',
    title: 'Muerte y Legado',
    color: '#F0EAE0',
    btnImage: '/assets/griegos/griegos_m6.png',
    image: '/assets/griegos/griegos_m6.png',
    content: [
      'La muerte de Arquímedes en el año 212 a.C., durante la caída de Siracusa ante las tropas romanas, es una de las escenas más emblemáticas de la historia de la ciencia. Existen varias versiones del relato, pero la más difundida, transmitida por Plutarco, Tito Livio y Valerio Máximo, describe a un soldado romano que encontró a Arquímedes concentrado en un problema geométrico, trazando figuras en la arena. El soldado le ordenó que lo acompañara ante el general Marcelo, pero Arquímedes, absorto en sus cálculos, respondió: "No toques mis círculos" (en latín: Noli turbare circulos meos). El soldado, enfurecido por la desobediencia, lo mató con su espada.',
      'El general Marcelo se entristeció profundamente al conocer la muerte de Arquímedes, según Plutarco. Declaró al soldado responsable un criminal y ordenó que se buscara a los familiares de Arquímedes para honrarlos. Marcelo hizo erigir una tumba para el matemático con la esfera inscrita en un cilindro que Arquímedes había solicitado, representando el teorema del que estaba más orgulloso: la relación 2:3 entre los volúmenes de la esfera y su cilindro circunscrito. La muerte de Arquímedes simboliza la tensión entre el poder militar y el conocimiento intelectual que se repite a lo largo de toda la historia humana.',
      'Los tratados de Arquímedes sobrevivieron gracias a una cadena de copistas que se extendió durante más de 2,000 años. Las copias originales en griego fueron traducidas al árabe durante el Califato Abasí (siglos VIII-IX) por traductores como Thabit ibn Qurra y Hunayn ibn Ishaq en la Casa de la Sabiduría de Bagdad. Desde el árabe, los textos fueron traducidos al latín por Gerardo de Cremona en Toledo (siglo XII) y por Willem van Moerbeke en el siglo XIII. Sin estos traductores medievales, el conocimiento de Arquímedes se habría perdido por completo.',
      'La influencia de Arquímedes en la ciencia moderna es directa y documentable. Galileo Galilei lo llamó "superhumano" y se basó en sus métodos para desarrollar la mecánica experimental. Johannes Kepler utilizó el método de exhaución de Arquímedes como punto de partida para calcular los volúmenes de sólidos de revolución, trabajo que contribuyó al desarrollo del cálculo integral. Isaac Newton y Gottfried Leibniz reconocieron explícitamente que sus métodos de integración eran extensiones formales de las técnicas geométricas de Arquímedes para calcular áreas y volúmenes.',
      'En 1998, el Palimpsesto de Arquímedes fue subastado por Christie\'s en Nueva York por 2 millones de dólares a un comprador anónimo, quien lo donó al Walters Art Museum de Baltimore para su estudio. Usando tecnologías de imagen avanzadas (rayos X fluorescentes de sincrotrón del Stanford Linear Accelerator Center y fotografía multiespectral), los investigadores recuperaron textos borrados que incluían dos tratados previamente desconocidos: "Stomachion" (un problema combinatorio sobre un rompecabezas geométrico de 14 piezas) y partes perdidas de "Método de los teoremas mecánicos". El descubrimiento demostró que Arquímedes había desarrollado conceptos de infinito actual y combinatoria 2,000 años antes de que estos campos se formalizaran.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La frase "Noli turbare circulos meos" ("No toques mis círculos") se ha convertido en un lema de la dedicación absoluta al conocimiento. Universidades como la Universidad de Basilea y la Sociedad Matemática Americana han utilizado variaciones de esta frase en sus emblemas y publicaciones. La Medalla Fields, considerada el "Nobel de las Matemáticas" y otorgada cada cuatro años desde 1936, lleva grabado el perfil de Arquímedes junto con una esfera inscrita en un cilindro.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El "Stomachion" encontrado en el Palimpsesto reveló que Arquímedes investigaba lo que hoy llamamos combinatoria. El rompecabezas consiste en 14 piezas que forman un cuadrado, y Arquímedes se preguntaba de cuántas maneras diferentes se pueden reordenar para formar el cuadrado original. En 2003, el matemático Bill Cutler usó un programa informático para determinar que existen exactamente 17,152 combinaciones posibles (o 536 si se eliminan las rotaciones y reflexiones). Esto convierte al Stomachion en el primer problema combinatorio documentado en la historia.' },
    ],
    fact: 'Un cráter lunar de 82 kilómetros de diámetro, ubicado en las coordenadas 29.7°S 4.0°O de la superficie de la Luna, lleva el nombre de Arquímedes desde 1651, cuando el astrónomo Giovanni Riccioli lo designó así. El asteroide 3600 Archimedes, descubierto en 1978, también honra su memoria. En 2014, la Unión Astronómica Internacional nombró oficialmente "Colles Archimedes" a un conjunto de colinas en el planeta Marte. Pocos científicos de la antigüedad tienen su nombre grabado en tres cuerpos celestes diferentes del sistema solar.',
  },
];

// ─── Aegean Particle Field (Canvas Background) ─────────────────────────────
function AegeanField() {
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
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      o: Math.random() * 0.35 + 0.08,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.12,
      hue: Math.random() > 0.5 ? '46,107,138' : '212,201,184', // aegean blue or marble
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.15;
        p.x += p.drift;
        p.y -= 0.06;
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

// ─── Archimedes Header ──────────────────────────────────────────────────────
function ArchimedesHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(46,107,138,0.3))' }}>
        {/* Arch curve */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#archGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#E8E0D4','#2E6B8A','#D4C9B8','#3A7FA0','#C0B09C','#1E5B7A','#F0EAE0'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central sphere-in-cylinder icon */}
        <circle cx="300" cy="28" r="10" fill="none" stroke="#2E6B8A" strokeWidth="1.2" opacity="0.6" />
        <rect x="288" y="16" width="24" height="24" fill="none" stroke="#2E6B8A" strokeWidth="1" opacity="0.4" rx="1" />
        <defs>
          <linearGradient id="archGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(46,107,138,0.2)" />
            <stop offset="50%" stopColor="rgba(46,107,138,0.9)" />
            <stop offset="100%" stopColor="rgba(46,107,138,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="78" textAnchor="middle" fill="#D4C9B8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ARQUÍMEDES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,201,184,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA ANTIGUA DE SIRACUSA</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ────────────────────────────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(46,107,138,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
          layoutId="activeDotGriegosM6"
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

        {/* ─── Video Section (conditional) ─── */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
            ))}
          </div>
        )}

        {/* Fact Box */}
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
      border: '1px solid rgba(46,107,138,0.15)',
    }}>
      <Star size={14} style={{ color: '#2E6B8A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #2E6B8A, #D4C9B8)', borderRadius: '3px', boxShadow: '0 0 8px rgba(46,107,138,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#2E6B8A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_GriegosM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/griegos/griegos_m6_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(46,107,138,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <AegeanField />

      <ArchimedesHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(46,107,138,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(46,107,138,0.08)', borderRadius: '16px',
              border: '1px solid rgba(46,107,138,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#2E6B8A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado la ciencia de Arquímedes!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Guardián del Conocimiento
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
