'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Greek Mathematics themed) ————————————————————
function DecoCompass({ size = 70, color = '#2E6B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Compass circle */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="2.5" fill={color} opacity="0.6" />
      {/* Compass legs */}
      <line x1="30" y1="30" x2="18" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="30" y1="30" x2="42" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      {/* Arc drawn by compass */}
      <path d="M18 50 Q30 38 42 50" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="3 2" />
      {/* Degree marks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + r1 * Math.cos(rad)} y1={30 + r1 * Math.sin(rad)} x2={30 + r2 * Math.cos(rad)} y2={30 + r2 * Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.5" />;
      })}
    </svg>
  );
}

function DecoTriangle({ size = 70, color = '#3A7FA0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Right triangle */}
      <path d="M10 50 L10 15 L50 50 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {/* Right angle marker */}
      <path d="M10 42 L18 42 L18 50" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* a² label */}
      <text x="6" y="35" fill={color} fontSize="8" fontFamily="serif" opacity="0.5">a²</text>
      {/* b² label */}
      <text x="28" y="54" fill={color} fontSize="8" fontFamily="serif" opacity="0.5">b²</text>
      {/* c² label */}
      <text x="32" y="28" fill={color} fontSize="8" fontFamily="serif" opacity="0.5">c²</text>
      {/* Small dots */}
      <circle cx="10" cy="50" r="2" fill={color} opacity="0.4" />
      <circle cx="10" cy="15" r="2" fill={color} opacity="0.4" />
      <circle cx="50" cy="50" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoLyre({ size = 70, color = '#D4C9B8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Lyre frame */}
      <path d="M20 50 L20 20 Q20 8 30 8 Q40 8 40 20 L40 50" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Crossbar */}
      <line x1="20" y1="22" x2="40" y2="22" stroke={color} strokeWidth="1.5" opacity="0.7" />
      {/* Strings */}
      <line x1="24" y1="22" x2="24" y2="48" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="28" y1="22" x2="28" y2="48" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="32" y1="22" x2="32" y2="48" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="36" y1="22" x2="36" y2="48" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Sound waves */}
      <path d="M44 30 Q48 28 48 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 26 Q52 28 52 36" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

function DecoColumn({ size = 70, color = '#C0B09C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Capital */}
      <path d="M15 14 L45 14 L42 18 L18 18 Z" fill={color} opacity="0.3" />
      {/* Shaft with flutes */}
      <rect x="20" y="18" width="20" height="32" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="24" y1="18" x2="24" y2="50" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="28" y1="18" x2="28" y2="50" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="32" y1="18" x2="32" y2="50" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="36" y1="18" x2="36" y2="50" stroke={color} strokeWidth="0.5" opacity="0.3" />
      {/* Base */}
      <rect x="17" y="50" width="26" height="4" fill={color} opacity="0.3" rx="1" />
      {/* Top ornament */}
      <rect x="13" y="10" width="34" height="4" fill={color} opacity="0.3" rx="1" />
    </svg>
  );
}

function DecoPentagram({ size = 70, color = '#E8E0D4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Pentagon */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Star points */}
      {(() => {
        const pts = [];
        for (let i = 0; i < 5; i++) {
          const angle = (i * 72 - 90) * Math.PI / 180;
          pts.push([30 + 22 * Math.cos(angle), 30 + 22 * Math.sin(angle)]);
        }
        const lines = [];
        for (let i = 0; i < 5; i++) {
          const j = (i + 2) % 5;
          lines.push(<line key={i} x1={pts[i][0]} y1={pts[i][1]} x2={pts[j][0]} y2={pts[j][1]} stroke={color} strokeWidth="1.2" opacity="0.5" />);
        }
        return lines;
      })()}
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSqrt({ size = 70, color = '#1E5B7A', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.22, ...style }}>
      {/* √2 stylized */}
      <text x="8" y="30" fill={color} fontSize="22" fontWeight="bold" fontFamily="serif" opacity="0.4">√2</text>
      {/* Floating dots */}
      <circle cx="52" cy="12" r="1.5" fill={color} opacity="0.5" />
      <circle cx="58" cy="22" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="36" r="1.5" fill={color} opacity="0.5" />
      <circle cx="62" cy="8" r="1" fill={color} opacity="0.3" />
      {/* Question mark */}
      <text x="55" y="38" fill={color} fontSize="10" fontFamily="serif" opacity="0.3">?</text>
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'el-hombre-y-la-leyenda': [DecoColumn, DecoCompass, DecoPentagram],
  'la-escuela-pitagorica': [DecoPentagram, DecoColumn, DecoLyre],
  'el-teorema-de-pitagoras': [DecoTriangle, DecoCompass, DecoSqrt],
  'musica-y-matematicas': [DecoLyre, DecoPentagram, DecoTriangle],
  'numeros-irracionales': [DecoSqrt, DecoTriangle, DecoCompass],
  'los-numeros-perfectos': [DecoCompass, DecoPentagram, DecoColumn],
  'legado-matematico': [DecoColumn, DecoTriangle, DecoLyre],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Kahn, C.H. (2001). Pythagoras and the Pythagoreans: A Brief History, Hackett Publishing Company',
  'Riedweg, C. (2005). Pythagoras: His Life, Teaching, and Influence, Cornell University Press',
  'Huffman, C.A. (2005). Archytas of Tarentum: Pythagorean, Philosopher and Mathematician King, Cambridge University Press',
  'Burkert, W. (1972). Lore and Science in Ancient Pythagoreanism, Harvard University Press',
  'Zhmud, L. (2012). Pythagoras and the Early Pythagoreans, Oxford University Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'el-hombre-y-la-leyenda',
    title: 'El Hombre y la Leyenda',
    color: '#E8E0D4',
    btnImage: '/assets/griegos/griegos_m2.png',
    image: '/assets/griegos/griegos_m2.png',
    content: [
      'Pitágoras nació alrededor del año 570 a.C. en la isla de Samos, situada en el mar Egeo frente a las costas de la actual Turquía. Samos era una isla próspera y bien conectada con las rutas comerciales del Mediterráneo oriental. Su padre, Mnesarco, era un grabador de anillos o un comerciante de Tiro, según las distintas fuentes antiguas. Desde joven, Pitágoras mostró una curiosidad particular por entender cómo funcionaban las cosas del mundo natural. Los historiadores Diógenes Laercio y Porfirio, que escribieron sobre su vida siglos después, coinciden en que recibió una educación cuidadosa y amplia para los estándares de su época, estudiando con varios maestros en Samos y posiblemente con el filósofo Ferécides de Siros.',
      'Los relatos antiguos indican que Pitágoras emprendió largos viajes de estudio que le tomaron varios años. Según Isócrates y otros autores, viajó a Egipto donde estudió con los sacerdotes de los templos, aprendiendo geometría y las prácticas rituales egipcias. Se cree que permaneció en Egipto durante un período estimado de hasta veintidós años antes de que la invasión persa de Cambises II en el año 525 a.C. lo llevara como prisionero a Babilonia. En Mesopotamia habría estudiado aritmética y astronomía con los sacerdotes caldeos, aprendiendo sobre los ciclos planetarios y los sistemas numéricos sexagesimales que los babilonios habían desarrollado durante siglos de observación celeste.',
      'La tradición también menciona un posible viaje a la India, aunque esta afirmación es debatida entre los historiadores modernos. Lo que resulta claro es que Pitágoras absorbió conocimientos matemáticos y filosóficos de múltiples culturas del mundo antiguo antes de desarrollar sus propias ideas. A diferencia de otros filósofos griegos que se centraban en un solo elemento como principio del universo — Tales proponía el agua, Anaxímenes el aire —, Pitágoras llegó a una conclusión diferente y radical: los números eran la sustancia fundamental de toda la realidad, no solo herramientas para contar, sino la estructura misma del cosmos.',
      'Alrededor del año 530 a.C., cuando tenía aproximadamente cuarenta años, Pitágoras abandonó Samos. Las fuentes antiguas atribuyen esta decisión a la tiranía de Polícrates, el gobernante de la isla que había tomado el poder mediante un golpe militar cerca del 538 a.C. Pitágoras se estableció en Crotona, una colonia griega en el sur de Italia, en la región conocida como Magna Grecia. Esta zona del Mediterráneo occidental estaba salpicada de ciudades griegas fundadas entre los siglos VIII y VI a.C., incluyendo Síbaris, Tarento y Metaponto, todas ellas centros activos de comercio y pensamiento.',
      'Un dato importante es que Pitágoras no dejó ningún escrito. Todo lo que sabemos sobre él proviene de testimonios indirectos escritos décadas o siglos después de su muerte. Los primeros textos que lo mencionan son fragmentos de Jenófanes, Heráclito e Ion de Quíos, todos contemporáneos o cercanos a su época. Las biografías más completas son las de Diógenes Laercio (siglo III d.C.), Porfirio (siglo III d.C.) y Jámblico (siglo IV d.C.), escritas entre 700 y 900 años después de los hechos. Esta distancia temporal hace que sea difícil separar los hechos históricos de las leyendas que se acumularon alrededor de su figura con el paso de los siglos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las leyendas antiguas atribuían a Pitágoras poderes sobrenaturales. Según Aristóteles, los habitantes de Crotona lo llamaban "Apolo Hiperbóreo". Jámblico escribió que Pitágoras podía hablar con animales, que tenía un muslo de oro, y que fue visto en dos ciudades al mismo tiempo. Estas historias muestran cómo sus seguidores lo elevaron a una categoría casi divina, convirtiendo al filósofo histórico en una figura semimítica cuyas enseñanzas tenían autoridad sagrada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El sistema numérico sexagesimal babilónico, que Pitágoras probablemente estudió en Mesopotamia, es la razón por la cual dividimos la hora en 60 minutos y el minuto en 60 segundos. Los babilonios usaban la base 60 porque es divisible por 1, 2, 3, 4, 5, 6, 10, 12, 15, 20 y 30, lo que facilita las fracciones. La tablilla Plimpton 322, datada hacia 1800 a.C. y conservada en la Universidad de Columbia, contiene una lista de ternas pitagóricas que demuestra que los babilonios conocían estas relaciones mil años antes de Pitágoras.' },
    ],
    fact: 'La isla de Samos, donde nació Pitágoras, también fue el lugar de nacimiento de otros logros notables de la antigüedad. El arquitecto Eupalinos construyó allí el Túnel de Eupalinos hacia el 530 a.C., un acueducto subterráneo de 1.036 metros excavado simultáneamente desde ambos extremos de una montaña. Los dos equipos se encontraron en el centro con un error de solo unos pocos metros, un logro de ingeniería que requirió conocimientos geométricos avanzados que Pitágoras pudo haber conocido de primera mano.',
  },
  {
    id: 'la-escuela-pitagorica',
    title: 'La Escuela Pitagórica',
    color: '#2E6B8A',
    btnImage: '/assets/griegos/griegos_m2.png',
    image: '/assets/griegos/griegos_m2.png',
    content: [
      'Cuando Pitágoras llegó a Crotona alrededor del año 530 a.C., fundó una comunidad que no tenía precedentes en el mundo griego. No era simplemente una escuela de matemáticas, sino una hermandad filosófica, religiosa y política cuyos miembros compartían un modo de vida completo. Los pitagóricos vivían juntos, ponían sus bienes en común y seguían un conjunto estricto de reglas de conducta. La comunidad incluía tanto hombres como mujeres, algo poco habitual en la Grecia antigua, donde las mujeres rara vez tenían acceso a la educación formal. Teano de Crotona, a menudo identificada como esposa o discípula de Pitágoras, es reconocida como una de las primeras mujeres matemáticas de la historia.',
      'Los miembros de la escuela se dividían en dos categorías según el historiador Jámblico. Los "acusmáticos" (del griego akousma, "cosa escuchada") eran estudiantes externos que recibían las enseñanzas en forma de máximas orales pero no participaban en la investigación matemática activa. Los "matemáticos" (del griego mathema, "lo que se aprende") formaban el círculo interno y se dedicaban al estudio profundo de los números, la geometría, la música y la astronomía. Para acceder a este grupo selecto, un aspirante debía pasar un período de prueba que según algunas fuentes duraba cinco años, durante los cuales debía guardar silencio y solo escuchar las lecciones del maestro sin hacer preguntas.',
      'Los pitagóricos seguían reglas de vida específicas y a veces peculiares. Se les prohibía comer habas, un tabú que ha generado debate entre los historiadores durante siglos. Algunas explicaciones sugieren razones médicas (el favismo, una enfermedad enzimática), otras ven razones simbólicas (las habas se asociaban con las almas de los muertos), y otras apuntan a razones políticas (las habas se usaban como fichas de votación en las asambleas). También practicaban el vegetarianismo, aunque las fuentes no son consistentes sobre si esta regla era universal o solo se aplicaba a ciertos alimentos. Realizaban rituales de purificación, vestían de blanco y practicaban la introspección diaria.',
      'La escuela pitagórica reconocía cuatro ramas del conocimiento matemático, conocidas como el quadrivium: aritmética (números en reposo), música (números en movimiento), geometría (magnitudes en reposo) y astronomía (magnitudes en movimiento). Esta clasificación tendría una influencia duradera en la educación occidental. Durante la Edad Media, el quadrivium junto con el trivium (gramática, lógica y retórica) formaron las siete artes liberales que constituían la base de la educación universitaria en Europa. Esta estructura educativa puede rastrearse directamente hasta la organización del conocimiento establecida por los pitagóricos en la Crotona del siglo VI a.C.',
      'La influencia política de la escuela pitagórica en Crotona y otras ciudades de la Magna Grecia generó resentimiento entre los ciudadanos que no pertenecían a la comunidad. Alrededor del año 509 a.C., y nuevamente cerca del 454 a.C., estallaron revueltas antipitagóricas. En la segunda de estas revueltas, la casa de reunión de los pitagóricos en Crotona fue incendiada, según relata Polibio, y muchos miembros fueron perseguidos y asesinados. Pitágoras había muerto probablemente antes de esta segunda revuelta, alrededor del año 495 a.C. en Metaponto, pero su escuela sobrevivió en forma dispersa durante otro siglo antes de que sus enseñanzas fueran absorbidas por la Academia de Platón y otras corrientes filosóficas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El lema secreto de los pitagóricos era la tetractys, una disposición triangular de diez puntos en cuatro filas (1+2+3+4=10). Los pitagóricos juraban por ella como si fuera sagrada: "Por aquel que nos dio la tetractys, fuente y raíz de la naturaleza eterna." Este triángulo numérico contenía las proporciones musicales fundamentales (4:3, 3:2, 2:1) y representaba la conexión entre los números y la armonía del universo. La suma de los cuatro primeros números daba 10, que para ellos simbolizaba la perfección.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La separación entre acusmáticos y matemáticos refleja una distinción que todavía existe en la educación moderna: la diferencia entre conocer hechos y comprender procesos. Los acusmáticos recibían afirmaciones como "no comas habas" sin explicación, mientras que los matemáticos aprendían las demostraciones detrás de cada teorema. La matemática moderna se basa en este principio pitagórico de que no basta con saber que algo es verdad — hay que demostrar por qué lo es mediante una cadena lógica de razonamientos verificables.' },
    ],
    fact: 'Teano de Crotona escribió tratados sobre matemáticas, física y medicina, según testimonios antiguos preservados por Diógenes Laercio y Estobeo. Se le atribuyen obras sobre la proporción áurea y sobre los poliedros regulares. Después de la muerte de Pitágoras, Teano asumió la dirección de la escuela y continuó enseñando la filosofía pitagórica. Otras mujeres pitagóricas documentadas incluyen a Myia y Damo (posibles hijas de Pitágoras), Melissa y Tymicha, esta última famosa por haberse mordido la lengua antes que revelar los secretos de la orden bajo tortura.',
  },
  {
    id: 'el-teorema-de-pitagoras',
    title: 'El Teorema de Pitágoras',
    color: '#D4C9B8',
    btnImage: '/assets/griegos/griegos_m2.png',
    image: '/assets/griegos/griegos_m2.png',
    content: [
      'El Teorema de Pitágoras establece que en todo triángulo rectángulo, el área del cuadrado construido sobre la hipotenusa (el lado opuesto al ángulo recto) es igual a la suma de las áreas de los cuadrados construidos sobre los otros dos lados. En notación algebraica moderna: a² + b² = c², donde c es la hipotenusa. El ejemplo más conocido es el triángulo de lados 3, 4 y 5: al calcular 3² + 4² = 9 + 16 = 25 = 5², la relación se verifica. Este resultado es válido para cualquier triángulo rectángulo sin excepción, independientemente del tamaño de sus lados, y constituye uno de los pilares de la geometría euclidiana.',
      'Lo que hizo único al enfoque de Pitágoras y su escuela no fue el conocimiento de la relación numérica en sí, sino la demostración formal de que la relación funciona siempre y para todos los casos posibles. Antes de los griegos, los babilonios y los egipcios conocían casos particulares y los aplicaban en la práctica. La tablilla babilónica YBC 7289, datada hacia 1800 a.C. y conservada en la Universidad de Yale, muestra un cuadrado con sus diagonales y una aproximación de √2 correcta hasta seis decimales (1.414213). Pero conocer ejemplos específicos es diferente de probar un principio universal. Los pitagóricos fueron pioneros en esta transición del conocimiento empírico al razonamiento deductivo.',
      'Existen más de 400 demostraciones diferentes del teorema, registradas por el matemático Elisha Scott Loomis en su obra "The Pythagorean Proposition" publicada en 1940. Una de las más elegantes se atribuye al presidente estadounidense James A. Garfield, quien la publicó en 1876 en el New England Journal of Education usando un trapecio dividido en triángulos. La demostración más antigua que se conserva completa aparece en los "Elementos" de Euclides (Proposición I.47), escrita hacia el 300 a.C., donde se conoce como la "demostración de la novia" por la complejidad de la figura geométrica que la acompaña.',
      'Las aplicaciones prácticas del teorema son innumerables en la vida cotidiana y en campos técnicos. Los topógrafos lo usan para calcular distancias inaccesibles. Los navegantes lo emplean para trazar rutas. Los programadores de videojuegos lo aplican constantemente para calcular la distancia entre dos puntos en pantalla usando la fórmula d = √((x₂-x₁)² + (y₂-y₁)²), que es una extensión directa del teorema. Los arquitectos lo utilizan para asegurar que los ángulos de los edificios sean perfectamente rectos, tal como hacían los antiguos constructores egipcios con sus cuerdas de doce nudos que formaban un triángulo 3-4-5.',
      'El teorema se extiende a dimensiones superiores. En tres dimensiones, la diagonal de un paralelepípedo rectangular se calcula como d² = a² + b² + c², donde a, b y c son las tres aristas. Einstein usó una generalización del teorema en geometría no euclidiana para formular la métrica del espacio-tiempo en la Relatividad General en 1915. El teorema de Pitágoras también se aplica en espacios de más dimensiones y en el álgebra lineal moderna a través del producto interior, demostrando que una idea nacida en la Grecia del siglo VI a.C. sigue siendo una herramienta matemática operativa en la física teórica y la computación del siglo XXI.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las "ternas pitagóricas" son conjuntos de tres números enteros que satisfacen a² + b² = c². Las más conocidas son (3,4,5), (5,12,13), (8,15,17) y (7,24,25). Existe una fórmula para generarlas usando dos números enteros m y n donde m > n > 0: a = m² - n², b = 2mn, c = m² + n². Con m=2 y n=1 se obtiene (3,4,5). Con m=3 y n=2 se obtiene (5,12,13). Hay infinitas ternas pitagóricas, lo que fue demostrado por Euclides en el libro X de sus Elementos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 2015, el matemático australiano Norman Wildberger y su estudiante Daniel Mansfield reexaminaron la tablilla babilónica Plimpton 322 y propusieron que no era simplemente una tabla de ternas pitagóricas sino una sofisticada tabla trigonométrica, la más antigua del mundo, que usaba razones de lados en lugar de ángulos. Esta tablilla, de apenas 13 por 9 centímetros, contiene 15 filas de números en escritura cuneiforme que representan triángulos rectángulos con ángulos entre 45 y 60 grados, organizados con una precisión que supera a las tablas trigonométricas griegas posteriores.' },
    ],
    fact: 'El matemático Andrew Wiles demostró en 1995 el Último Teorema de Fermat, que afirma que no existen soluciones enteras positivas para la ecuación aⁿ + bⁿ = cⁿ cuando n es mayor que 2. Pierre de Fermat había escrito esta conjetura en el margen de su copia de la "Arithmetica" de Diofanto hacia 1637, añadiendo que tenía una prueba "que este margen es demasiado estrecho para contener." La demostración de Wiles ocupó 129 páginas y requirió herramientas matemáticas que no existían en tiempos de Fermat, conectando el teorema de Pitágoras con la frontera más avanzada de las matemáticas modernas.',
  },
  {
    id: 'musica-y-matematicas',
    title: 'Música y Matemáticas',
    color: '#3A7FA0',
    btnImage: '/assets/griegos/griegos_m2.png',
    image: '/assets/griegos/griegos_m2.png',
    content: [
      'Según la tradición recogida por Nicómaco de Gerasa en su "Manual de Armonía" (siglo II d.C.), Pitágoras descubrió la relación entre la música y los números al pasar frente a una herrería. Notó que diferentes martillos producían sonidos armoniosos entre sí y, al investigar, encontró que las relaciones armónicas dependían de proporciones numéricas simples. Aunque los historiadores modernos consideran que la historia de la herrería es una simplificación (los sonidos de los martillos dependen de factores más complejos que el peso), el descubrimiento subyacente es real: los intervalos musicales que suenan agradables al oído humano corresponden a razones de números enteros pequeños.',
      'Los experimentos con el monocordio — un instrumento de una sola cuerda tensada sobre una caja de resonancia con un puente móvil — permitieron a los pitagóricos establecer las relaciones fundamentales. Cuando la cuerda se divide exactamente a la mitad (razón 2:1), la nota producida está una octava por encima de la nota original. Cuando se divide en la razón 3:2, se produce el intervalo de quinta justa. La razón 4:3 produce una cuarta justa. Estos tres intervalos — octava, quinta y cuarta — eran considerados los intervalos consonantes perfectos, y los pitagóricos descubrieron que todos podían expresarse con los números del 1 al 4, los mismos números de su sagrada tetractys.',
      'De este descubrimiento nació una de las ideas más influyentes de Pitágoras: la "armonía de las esferas." Los pitagóricos postularon que los planetas y las estrellas, al moverse por el cielo, producían sonidos determinados por sus distancias y velocidades, de la misma manera que las cuerdas de diferentes longitudes producen diferentes notas. Creían que no podíamos escuchar esta música cósmica porque estábamos acostumbrados a ella desde el nacimiento, como quien vive junto a una cascada y deja de percibir su ruido. Aunque esta idea es poética más que científica, la intuición de que el cosmos obedece a leyes matemáticas resultó ser profundamente correcta.',
      'La escala musical occidental se construyó originalmente sobre principios pitagóricos. El "afinamiento pitagórico" usa la razón 3:2 (quinta justa) como base para derivar todas las demás notas. Partiendo de una nota y ascendiendo por quintas sucesivas (do-sol-re-la-mi-si-fa#-do#-sol#-re#-la#-mi#), se pueden generar las doce notas de la escala cromática. Sin embargo, este sistema tiene un problema matemático conocido como la "coma pitagórica": doce quintas justas (3:2)¹² = 129.746 no equivalen exactamente a siete octavas 2⁷ = 128. La diferencia, una razón de aproximadamente 1.0136, causa que el ciclo de quintas no cierre perfectamente.',
      'Este problema de la coma pitagórica no se resolvió completamente hasta el siglo XVIII, cuando se adoptó el temperamento igual, donde la octava se divide en doce semitonos iguales con una razón de ²√12 entre cada uno. Esta solución sacrifica la pureza matemática de los intervalos pitagóricos a cambio de poder tocar en cualquier tonalidad sin que ninguna suene desafinada. Johann Sebastian Bach compuso "El Clave Bien Temperado" (1722 y 1742) en parte para demostrar las ventajas de este sistema. La ciencia acústica moderna ha confirmado que las consonancias identificadas por Pitágoras corresponden a los armónicos naturales de las ondas sonoras, validando su intuición con la física de las vibraciones.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Johannes Kepler, el astrónomo que descubrió las tres leyes del movimiento planetario entre 1609 y 1619, tituló su obra maestra "Harmonices Mundi" ("La Armonía del Mundo"), directamente inspirado por la idea pitagórica de la música de las esferas. Kepler asignó melodías a cada planeta según sus velocidades orbitales. La Tierra, según Kepler, canta las notas mi-fa-mi, que en latín suenan como "miseria-fames-miseria" (miseria-hambre-miseria), un comentario pesimista sobre la condición humana.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La NASA ha detectado "sonido" en el espacio, aunque no es audible directamente. En 2003, el Observatorio de Rayos X Chandra descubrió ondas de presión emitidas por el agujero negro del cúmulo de galaxias de Perseo. La nota es un si bemol, 57 octavas por debajo del do central del piano, con una frecuencia de un ciclo cada 10 millones de años. Es la nota más grave jamás detectada en el universo. Pitágoras habría apreciado que el cosmos produce sonidos reales, aunque sean inaudibles para el oído humano.' },
    ],
    fact: 'El monocordio pitagórico es el ancestro directo de los instrumentos de cuerda temperados modernos. Los trastes de una guitarra están colocados según relaciones matemáticas precisas: cada traste divide la longitud vibrante de la cuerda en una razón de ¹²√2 ≈ 1.05946 respecto al traste anterior. En el traste 12, la cuerda se divide exactamente a la mitad, produciendo la octava, exactamente como Pitágoras descubrió hace 2.500 años. Los fabricantes de guitarras modernos usan la "regla del 17.817" (dividir la longitud de la cuerda entre 17.817) para calcular la posición de cada traste.',
  },
  {
    id: 'numeros-irracionales',
    title: 'Números Irracionales',
    color: '#C0B09C',
    btnImage: '/assets/griegos/griegos_m2.png',
    image: '/assets/griegos/griegos_m2.png',
    content: [
      'El descubrimiento de los números irracionales fue una crisis intelectual para los pitagóricos. Su filosofía se basaba en la creencia de que todo en el universo podía expresarse como razones de números enteros (lo que hoy llamamos números racionales). Pero al aplicar su propio teorema al caso más simple — un cuadrado de lado 1 —, descubrieron que la diagonal mide √2, un número que no puede escribirse como fracción de dos enteros. La demostración de la irracionalidad de √2 es una de las primeras pruebas por contradicción de la historia: si √2 fuera igual a p/q en su forma más reducida, entonces p² = 2q², lo que implica que p es par, digamos p = 2k, y entonces 4k² = 2q², por lo que q² = 2k², lo que implica que q también es par, contradiciendo que p/q estaba reducida.',
      'La tradición atribuye este descubrimiento perturbador a Hipaso de Metaponto, un pitagórico que vivió en el siglo V a.C. Según la leyenda más difundida, recogida por autores como Jámblico, los pitagóricos se horrorizaron ante esta revelación porque destruía su cosmovisión basada en la razón de enteros. Se dice que Hipaso fue expulsado de la comunidad y que los dioses lo castigaron con un naufragio mortal. Otra versión afirma que los propios pitagóricos lo ahogaron en el mar por revelar el secreto a personas ajenas a la orden. Independientemente de la veracidad de estas historias, revelan la profundidad del impacto que este descubrimiento tuvo en la comunidad pitagórica.',
      'La inconmensurabilidad — la imposibilidad de expresar ciertas magnitudes como razones de enteros — fue un problema que los matemáticos griegos abordaron con seriedad durante los siglos siguientes. Teodoro de Cirene (siglo V a.C.), mencionado en el diálogo "Teeteto" de Platón, demostró la irracionalidad de las raíces cuadradas de los números 3, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15 y 17 (deteniéndose por razones que los historiadores debaten). Su alumno Teeteto de Atenas generalizó estos resultados y contribuyó a la teoría de los irracionales que Euclides presentaría en el Libro X de los Elementos.',
      'Euclides dedicó el Libro X de sus "Elementos" (circa 300 a.C.) enteramente a los números irracionales, clasificándolos en trece tipos diferentes. Este libro es el más largo y complejo de toda la obra, con 115 proposiciones. La solución griega al problema de la inconmensurabilidad fue la teoría de las proporciones desarrollada por Eudoxo de Cnido (circa 408-355 a.C.), que aparece en el Libro V de los Elementos. Eudoxo definió la igualdad de proporciones de una manera que evitaba referirse a las magnitudes como números, permitiendo trabajar con cantidades inconmensurables de forma rigurosa. Esta teoría anticipó los conceptos de límite y número real de Richard Dedekind en 1872.',
      'Los números irracionales constituyen la vasta mayoría de los números reales. El matemático Georg Cantor demostró en 1874 que los números racionales son "contables" (pueden ponerse en correspondencia uno a uno con los números naturales), mientras que los números reales son "incontables" — hay estrictamente más irracionales que racionales. Algunos irracionales son particularmente célebres: π (pi, la razón entre la circunferencia y el diámetro de un círculo, con un valor aproximado de 3.14159...) fue demostrado irracional por Johann Heinrich Lambert en 1768; el número e (base del logaritmo natural, aproximadamente 2.71828...) fue demostrado irracional por Leonhard Euler en 1737. Lo que comenzó como una crisis para los pitagóricos abrió un continente entero de las matemáticas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La palabra "irracional" en matemáticas no significa "sin razón" en el sentido cotidiano, sino "que no puede expresarse como razón (ratio) de dos enteros." Los griegos usaban el término alogos (sin logos, sin proporción) o arrhetos (inexpresable). La confusión lingüística ha persistido durante siglos y ha dado lugar a la idea errónea de que estos números son de alguna manera "locos" o defectuosos, cuando en realidad son la mayoría de los números que existen en la recta numérica.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El número áureo φ (phi), igual a (1+√5)/2 ≈ 1.6180339..., es otro número irracional conectado con los pitagóricos. Los pitagóricos usaban el pentagrama (estrella de cinco puntas dentro de un pentágono regular) como símbolo secreto de su hermandad, y cada intersección de las líneas del pentagrama divide los segmentos en la proporción áurea. El número φ tiene la propiedad única de que φ² = φ + 1, y su inverso 1/φ = φ - 1. Aparece en la secuencia de Fibonacci, en la filotaxis de las plantas y en la geometría de los cuasicristales descubiertos por Dan Shechtman en 1984.' },
    ],
    fact: 'En 2022, un equipo de Google Cloud liderado por Emma Haruka Iwao calculó 100 billones (10¹⁴) de dígitos de π, un récord mundial que requirió 157 días de cómputo usando la fórmula de Chudnovsky y 82,000 terabytes de almacenamiento. A pesar de tener tantos dígitos calculados, solo se necesitan 39 dígitos de π para calcular la circunferencia del universo observable con una precisión del tamaño de un átomo de hidrógeno. El descubrimiento pitagórico de la irracionalidad inició un camino que, 2.500 años después, sigue generando preguntas sobre la naturaleza de los números y los límites de la computación.',
  },
  {
    id: 'los-numeros-perfectos',
    title: 'Los Números Perfectos',
    color: '#1E5B7A',
    btnImage: '/assets/griegos/griegos_m2.png',
    image: '/assets/griegos/griegos_m2.png',
    content: [
      'Los pitagóricos asignaban cualidades y significados a los números de una manera que iba más allá de la matemática pura. El número 1 (la mónada) representaba la unidad y el origen de todo. El 2 (la díada) representaba la opinión y la división. El 3 era el primer número "verdadero" porque tenía principio, medio y fin. El 4 representaba la justicia porque es el primer cuadrado perfecto (2² = 4). El 10 era la perfección, la suma de la tetractys (1+2+3+4). Esta mística numérica no era mera superstición: los pitagóricos buscaban patrones reales en los números y encontraron varios que siguen siendo objeto de estudio matemático moderno.',
      'Un número perfecto es aquel que es igual a la suma de todos sus divisores propios (excluyéndose a sí mismo). El primer número perfecto es 6, porque sus divisores propios son 1, 2 y 3, y 1+2+3 = 6. El segundo es 28 (1+2+4+7+14 = 28). El tercero es 496, y el cuarto es 8.128. Los pitagóricos conocían al menos los dos primeros y los consideraban sagrados. San Agustín de Hipona, en el siglo V d.C., escribió que Dios creó el mundo en 6 días porque 6 es un número perfecto, y que el ciclo lunar de 28 días reflejaba esta perfección numérica divina.',
      'Euclides demostró en la Proposición IX.36 de sus Elementos (circa 300 a.C.) que si 2ⁿ - 1 es un número primo (lo que hoy llamamos un primo de Mersenne), entonces 2ⁿ⁻¹ × (2ⁿ - 1) es un número perfecto par. Por ejemplo, 2³ - 1 = 7 es primo, y 2² × 7 = 28 es perfecto. Esta fórmula genera todos los números perfectos pares conocidos. En 1747, Euler demostró que la fórmula de Euclides genera todos los números perfectos pares, completando la clasificación. Hasta la fecha se conocen 51 números perfectos, todos ellos pares. El más grande, descubierto en 2024, tiene más de 49 millones de dígitos.',
      'Los pitagóricos también estudiaron los números figurados, que son números que pueden representarse como patrones geométricos de puntos. Los números triangulares (1, 3, 6, 10, 15, 21...) se obtienen sumando los primeros n números naturales, de modo que el n-ésimo número triangular es n(n+1)/2. Los números cuadrados (1, 4, 9, 16, 25...) forman cuadrados de puntos. Un descubrimiento pitagórico clave fue que la suma de dos números triangulares consecutivos siempre produce un número cuadrado: por ejemplo, 6 + 10 = 16 = 4². También descubrieron que la suma de los primeros n números impares siempre es un cuadrado perfecto: 1+3 = 4, 1+3+5 = 9, 1+3+5+7 = 16.',
      'La tradición pitagórica de buscar patrones en los números dio origen a la teoría de números, una de las ramas más activas de las matemáticas contemporáneas. Problemas que los pitagóricos plantearon o inspiraron siguen sin resolverse. No se sabe si existen infinitos números perfectos. No se sabe si existe algún número perfecto impar (ninguno ha sido encontrado, pero tampoco se ha demostrado que no existan). La conjetura de Goldbach (1742), que afirma que todo número par mayor que 2 puede expresarse como suma de dos primos, permanece sin demostrar después de 280 años. La teoría de números pitagórica, hoy combinada con el álgebra computacional, es la base de la criptografía RSA que protege las transacciones bancarias y las comunicaciones digitales en internet.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los pitagóricos clasificaban los números en "amigos" o "amigables." Dos números son amigables si cada uno es la suma de los divisores propios del otro. El par más pequeño es (220, 284): los divisores de 220 suman 284, y los divisores de 284 suman 220. Los pitagóricos conocían este par y lo consideraban un símbolo de amistad. El siguiente par amigable, (1184, 1210), no fue descubierto hasta 1866 por el joven italiano Niccolò Paganini (no el violinista), quien tenía solo 16 años cuando lo encontró.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los primos de Mersenne, nombrados en honor al monje francés Marin Mersenne (1588-1648), son números de la forma 2ⁿ - 1 que resultan ser primos. Su búsqueda se realiza mediante el proyecto distribuido GIMPS (Great Internet Mersenne Prime Search), que usa computadoras voluntarias de todo el mundo. El primo de Mersenne más grande conocido, 2¹³⁶²⁷⁹⁸⁴¹ - 1, fue encontrado en octubre de 2024 por Luke Durant usando computación en la nube con GPUs. Tiene 41.024.320 dígitos y es también el número primo más grande conocido.' },
    ],
    fact: 'Los pitagóricos descubrieron los sólidos platónicos — los cinco poliedros regulares convexos — aunque se les llama "platónicos" porque Platón los describió en el "Timeo." El tetraedro (4 caras triangulares), el cubo (6 caras cuadradas), el octaedro (8 caras triangulares), el dodecaedro (12 caras pentagonales) y el icosaedro (20 caras triangulares) son los únicos poliedros regulares posibles en tres dimensiones. Los pitagóricos asociaron cada uno con un elemento: tierra (cubo), fuego (tetraedro), aire (octaedro) y agua (icosaedro). El dodecaedro, con sus caras pentagonales llenas de proporciones áureas, representaba el cosmos entero.',
  },
  {
    id: 'legado-matematico',
    title: 'Legado Matemático',
    color: '#F0EAE0',
    btnImage: '/assets/griegos/griegos_m2.png',
    image: '/assets/griegos/griegos_m2.png',
    content: [
      'La influencia de Pitágoras sobre Platón fue directa y profunda. Platón viajó al sur de Italia alrededor del 388 a.C. y estudió con pitagóricos, particularmente con Arquitas de Tarento, matemático y estadista que gobernó la ciudad siete veces. Esta experiencia transformó el pensamiento de Platón. En el "Timeo," Platón construyó una cosmología basada en proporciones numéricas y figuras geométricas, claramente inspirada en la filosofía pitagórica. Sobre la puerta de su Academia en Atenas, según la tradición, estaba inscrito el lema "Que no entre nadie que no sepa geometría" — un eco directo de la centralidad que los pitagóricos otorgaban a las matemáticas como camino hacia la verdad.',
      'Euclides, que trabajó en Alejandría alrededor del 300 a.C., compiló y sistematizó gran parte del conocimiento matemático pitagórico en sus "Elementos," una obra de trece libros que se convirtió en el texto de matemáticas más utilizado de la historia. Los libros I y II tratan la geometría plana incluyendo el teorema de Pitágoras. Los libros VII, VIII y IX presentan la teoría de números, incluyendo los números perfectos. El libro X aborda los irracionales. Se estima que los "Elementos" han sido editados más de mil veces desde la invención de la imprenta, superados en número de ediciones solo por la Biblia. Abraham Lincoln estudió los seis primeros libros para desarrollar su capacidad de razonamiento lógico.',
      'La idea pitagórica de que "todo es número" encontró su validación más notable en la física moderna. Galileo Galilei escribió en 1623 que "el libro de la naturaleza está escrito en lenguaje matemático." Isaac Newton usó ecuaciones para describir la gravedad. James Clerk Maxwell unificó la electricidad y el magnetismo en cuatro ecuaciones en 1865. Albert Einstein reformuló la gravedad como geometría del espacio-tiempo en 1915. Paul Dirac predijo la existencia de la antimateria en 1928 usando una ecuación. En cada caso, la estructura matemática reveló aspectos de la realidad que la observación directa no podía mostrar, confirmando la intuición pitagórica de que los números son la clave del cosmos.',
      'En la computación moderna, la herencia pitagórica está presente en múltiples niveles. La lógica booleana que gobierna los procesadores se basa en la lógica formal desarrollada a partir de la tradición deductiva griega. Los algoritmos criptográficos RSA, que protegen las comunicaciones digitales, dependen de propiedades de los números primos estudiadas inicialmente por los pitagóricos. La compresión MP3 de audio digital usa la transformada rápida de Fourier, que descompone el sonido en sus frecuencias componentes — un proceso que es la versión computacional de lo que Pitágoras hacía al analizar las proporciones de las cuerdas de su monocordio.',
      'Se atribuye a Pitágoras haber acuñado la palabra "filósofo" (philosophos, "amante de la sabiduría"), contraponiéndola a "sofista" (sophistēs, "sabio"). Según Cicerón y Diógenes Laercio, cuando el tirano Leonte le preguntó qué era, Pitágoras respondió que no era un sabio sino alguien que buscaba la sabiduría, del mismo modo que los asistentes a los juegos olímpicos no eran atletas sino espectadores que admiraban la excelencia. Esta humildad intelectual — la idea de que el conocimiento es un camino, no un destino — define la actitud científica hasta el día de hoy. Cada nueva ley física descubierta abre nuevas preguntas, y cada teorema demostrado sugiere nuevos problemas, en una búsqueda que Pitágoras inició hace veinticinco siglos y que no tiene final previsible.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Voyager 1, lanzada por la NASA en 1977 y actualmente el objeto fabricado por humanos más lejano de la Tierra (a más de 24.000 millones de km), lleva un disco de oro con sonidos e imágenes de la Tierra. Entre las grabaciones musicales se incluyen piezas que usan los intervalos armónicos descubiertos por Pitágoras: la quinta justa (razón 3:2) y la octava (razón 2:1) aparecen en prácticamente todas las tradiciones musicales del disco, desde Bach hasta música de gamelán balinés.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 1960, el físico Eugene Wigner publicó un artículo titulado "La irrazonable eficacia de las matemáticas en las ciencias naturales," donde argumentaba que la capacidad de las matemáticas para describir el mundo físico es un misterio que no tiene explicación conocida. ¿Por qué ecuaciones inventadas por la mente humana describen con precisión el comportamiento de partículas subatómicas, galaxias y agujeros negros? Wigner consideraba esto un "regalo" que no entendemos. Es la versión moderna de la pregunta que Pitágoras planteó por primera vez: ¿por qué el universo obedece a los números?' },
    ],
    fact: 'El cráter Pitágoras en la Luna, de 130 kilómetros de diámetro, está ubicado en el limbo noroeste del lado visible lunar (coordenadas 63.5°N, 63.0°W). Fue nombrado por la Unión Astronómica Internacional en honor al filósofo de Samos. El asteroide 6143 Pythagoras, descubierto en 1971, también lleva su nombre. Adicionalmente, la razón entre la distancia media Tierra-Luna y el radio de la Tierra es aproximadamente 60.27, un número que se aproxima al cuadrado de una relación pitagórica. La presencia de su nombre en el cielo habría complacido al filósofo que enseñó que los números gobiernan el cosmos.',
  },
];

// ——— Greek Particle Field (Canvas Background) ———————————————————————————
function GreekParticleField() {
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
      hue: Math.random() > 0.5 ? '46,107,138' : '232,224,212',
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

// ——— Pythagoras Header ———————————————————————————————————————————————
function PythagorasHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(46,107,138,0.3))' }}>
        {/* Mathematical arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#greekGrad)" strokeWidth="2.5" strokeLinecap="round" />
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
        {/* Central triangle icon */}
        <path d="M300 18 L288 42 L312 42 Z" fill="none" stroke="#2E6B8A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="33" r="2" fill="#2E6B8A" opacity="0.5" />
        <defs>
          <linearGradient id="greekGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(46,107,138,0.2)" />
            <stop offset="50%" stopColor="rgba(46,107,138,0.9)" />
            <stop offset="100%" stopColor="rgba(46,107,138,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#2E6B8A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">PITÁGORAS Y LOS NÚMEROS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(46,107,138,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MATEMÁTICAS, MÚSICA Y EL COSMOS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ——————————————————————
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
          layoutId="activeDotGriegosM2"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ——— Video Section (conditional) ——— */}
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

// ——— Progress Bar ————————————————————————————————————————————————————————
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #2E6B8A, #E8E0D4)', borderRadius: '3px', boxShadow: '0 0 8px rgba(46,107,138,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#2E6B8A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_GriegosM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.90) 0%, rgba(12,18,28,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/griegos/griegos_m2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(46,107,138,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <GreekParticleField />

      <PythagorasHeader />

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
              🏆 ¡Has dominado los secretos de Pitágoras y los Números!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Maestro de los Números
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— Bibliografía ——— */}
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
