'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Stellar / Astrophysics themed) ————————————————
function DecoStarBurst({ size = 70, color = '#4A7FB5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central star */}
      <polygon points="30,6 34,22 50,22 37,32 42,48 30,38 18,48 23,32 10,22 26,22" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.4" />
      {/* Radiating lines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 8 * Math.cos(rad)} y1={30 + 8 * Math.sin(rad)} x2={30 + 26 * Math.cos(rad)} y2={30 + 26 * Math.sin(rad)} stroke={color} strokeWidth="0.8" opacity="0.3" />;
      })}
    </svg>
  );
}

function DecoSpectrum({ size = 80, color = '#D4736A', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.22, ...style }}>
      {/* Spectrum band */}
      <rect x="5" y="14" width="70" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Absorption lines */}
      {[15, 25, 32, 44, 53, 62, 68].map((x, i) => (
        <line key={i} x1={x} y1="14" x2={x} y2="26" stroke={color} strokeWidth={i % 2 === 0 ? "1.5" : "1"} opacity={0.3 + (i % 3) * 0.1} />
      ))}
      {/* Prism hint */}
      <polygon points="38,4 32,12 44,12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Dispersed rays */}
      <line x1="38" y1="28" x2="20" y2="38" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="38" y1="28" x2="38" y2="38" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="38" y1="28" x2="56" y2="38" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#5A8FC5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Telescope tube */}
      <line x1="12" y1="48" x2="45" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      {/* Lens end */}
      <circle cx="47" cy="13" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="47" cy="13" r="3" fill={color} opacity="0.2" />
      {/* Tripod legs */}
      <line x1="22" y1="38" x2="10" y2="55" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="22" y1="38" x2="34" y2="55" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Stars near lens */}
      <circle cx="54" cy="8" r="1.5" fill={color} opacity="0.5" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoHydrogenAtom({ size = 60, color = '#C46358', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Nucleus (proton) */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.4" />
      <text x="30" y="33" textAnchor="middle" fill={color} fontSize="7" fontWeight="bold" opacity="0.6">H</text>
      {/* Electron orbit */}
      <ellipse cx="30" cy="30" rx="22" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.35" transform="rotate(-20 30 30)" />
      {/* Electron */}
      <circle cx="52" cy="28" r="2.5" fill={color} opacity="0.5" />
      {/* Energy level rings */}
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="0.7" opacity="0.2" strokeDasharray="3 3" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.7" opacity="0.15" strokeDasharray="3 3" />
    </svg>
  );
}

function DecoConstellation({ size = 70, color = '#6A9FD5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Stars connected as constellation */}
      <circle cx="10" cy="15" r="2" fill={color} opacity="0.6" />
      <circle cx="25" cy="8" r="2.5" fill={color} opacity="0.5" />
      <circle cx="40" cy="20" r="2" fill={color} opacity="0.6" />
      <circle cx="30" cy="35" r="3" fill={color} opacity="0.5" />
      <circle cx="50" cy="40" r="2" fill={color} opacity="0.6" />
      <circle cx="15" cy="50" r="2.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="55" r="2" fill={color} opacity="0.4" />
      {/* Lines between stars */}
      <line x1="10" y1="15" x2="25" y2="8" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="25" y1="8" x2="40" y2="20" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="20" x2="30" y2="35" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="35" x2="50" y2="40" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="35" x2="15" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="50" y1="40" x2="45" y2="55" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoScrollQuill({ size = 70, color = '#B4534A', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 49" style={{ opacity: 0.2, ...style }}>
      {/* Scroll body */}
      <rect x="12" y="10" width="46" height="30" rx="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Scroll rolls */}
      <ellipse cx="12" cy="25" rx="4" ry="15" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <ellipse cx="58" cy="25" rx="4" ry="15" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Text lines on scroll */}
      <line x1="20" y1="18" x2="50" y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="24" x2="48" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="30" x2="44" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Quill pen */}
      <path d="M52 6 L58 16 L54 14 L50 18 Z" fill={color} opacity="0.3" />
      <line x1="52" y1="6" x2="46" y2="2" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'infancia-wendover': [DecoStarBurst, DecoConstellation, DecoTelescope],
  'cambridge-eddington': [DecoTelescope, DecoStarBurst, DecoSpectrum],
  'viaje-harvard': [DecoConstellation, DecoScrollQuill, DecoStarBurst],
  'tesis-astronomia': [DecoSpectrum, DecoHydrogenAtom, DecoStarBurst],
  'rechazo-russell': [DecoScrollQuill, DecoSpectrum, DecoConstellation],
  'carrera-harvard': [DecoTelescope, DecoScrollQuill, DecoHydrogenAtom],
  'reconocimiento-tardio': [DecoStarBurst, DecoConstellation, DecoSpectrum],
};

// ——— Content Data ————————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Payne-Gaposchkin, C. (1984). An Autobiography and Other Recollections, Cambridge University Press',
  'Moore, D. (2020). What Stars Are Made Of: The Life of Cecilia Payne-Gaposchkin, Harvard University Press',
  'Sobel, D. (2016). The Glass Universe: How the Ladies of the Harvard Observatory Took the Measure of the Stars, Viking',
  'Gingerich, O. (1982). Cecilia Payne-Gaposchkin, Quarterly Journal of the Royal Astronomical Society, 23, 450–463',
  'Payne, C.H. (1925). Stellar Atmospheres: A Contribution to the Observational Study of High Temperature in the Reversing Layers of Stars, Radcliffe College PhD Thesis',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'infancia-wendover',
    title: 'Infancia en Wendover',
    color: '#4A7FB5',
    btnImage: '/assets/cecilia/cecilia_m1.png',
    image: '/assets/cecilia/cecilia_m1.png',
    content: [
      'Cecilia Helena Payne nació el 10 de mayo de 1900 en Wendover, un pequeño pueblo en el condado de Buckinghamshire, Inglaterra. Su padre, Edward John Payne, ejercía como abogado (barrister) en Londres, además de ser historiador y músico aficionado. Su madre, Emma Leonora Helena Pertz, provenía de una familia prusiana con tradición académica. Cecilia fue la mayor de tres hermanos: Humfry y Leonid completaban la familia. La casa de los Payne era un lugar donde se valoraba la lectura y la conversación sobre temas intelectuales, lo que marcó profundamente la formación de la joven Cecilia desde sus primeros años de vida.',
      'La tragedia golpeó la familia cuando Edward John Payne falleció en 1904, dejando a Cecilia con apenas cuatro años. Emma Payne, viuda y con tres hijos, enfrentó dificultades económicas considerables. A pesar de estas circunstancias, se empeñó en ofrecer a sus hijos una educación rigurosa. Cecilia desarrolló una fortaleza interior que sus biógrafos atribuyen en parte a esta pérdida temprana. Sin la figura paterna, la niña buscó refugio en los libros y en la observación del mundo natural, convirtiendo la curiosidad en su compañera más constante.',
      'Desde los cinco años, Cecilia mostraba una atención inusual hacia los fenómenos naturales. Una noche observó un meteoro cruzar el cielo sobre Wendover y esa imagen quedó grabada en su memoria. Comenzó a coleccionar plantas, minerales e insectos con un rigor que sorprendía a los adultos. Su hermano Humfry recordaría décadas después que Cecilia podía leer un libro de ciencias en una sola tarde y luego recitar cada detalle con precisión. A los doce años, tras leer un libro sobre astronomía, decidió que dedicaría su vida al estudio de las estrellas, una determinación que jamás abandonó.',
      'Su educación formal avanzó cuando ingresó a la St Paul\'s Girls\' School en Londres, una de las pocas instituciones femeninas que ofrecía enseñanza seria de ciencias y matemáticas en la Inglaterra de principios del siglo XX. Allí tuvo profesoras que estimularon su curiosidad en lugar de reprimirla. Cecilia aprendió alemán y francés con el propósito específico de leer artículos científicos originales publicados por físicos europeos. A los diecisiete años había estudiado por su cuenta la teoría atómica de Dalton y Rutherford, así como la tabla periódica de Mendeléyev.',
      'El contexto social de la Inglaterra eduardiana definía límites estrictos para las mujeres. Se esperaba que las jóvenes de clase media se prepararan para el matrimonio y la vida doméstica, no para carreras científicas. Las universidades británicas como Oxford y Cambridge habían comenzado a admitir mujeres en ciertos colleges, pero no les otorgaban títulos oficiales. Oxford no concedió grados a mujeres hasta 1920 y Cambridge esperó hasta 1948. Cecilia Payne creció en un mundo donde su talento científico chocaba con barreras institucionales que ningún mérito personal podía derribar por sí solo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cecilia Payne tenía una memoria casi fotográfica. Después de asistir a una conferencia del físico Ernest Rutherford en Cambridge, pudo recitar el contenido de la charla palabra por palabra. Esta capacidad no era simple memorización: Cecilia comprendía profundamente lo que escuchaba, lo que le permitía establecer conexiones entre disciplinas que otros científicos no percibían. Su profesor Eddington la describió como una de las mentes más agudas que había encontrado en su carrera.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Wendover, el pueblo natal de Cecilia, se encuentra a unos 60 kilómetros al noroeste de Londres, en los Chiltern Hills. A principios del siglo XX, la contaminación lumínica era mínima en esta zona rural, lo que permitía observaciones del cielo nocturno con una claridad que hoy resulta difícil de imaginar en el sur de Inglaterra. Las condiciones de oscuridad natural de Wendover probablemente contribuyeron a la temprana fascinación de Cecilia con las estrellas y los fenómenos celestes.' },
    ],
    fact: 'Elena Cornaro Piscopia se convirtió en la primera mujer en obtener un doctorado universitario en 1678, en la Universidad de Padua, Italia. Después de ella, transcurrieron casi 200 años antes de que otra mujer alcanzara ese mismo logro académico. Cuando Cecilia Payne nació en 1900, la educación superior para mujeres seguía siendo una excepción en Europa. En el Reino Unido, el primer doctorado otorgado a una mujer fue el de Eliza Archard en 1882 en la Universidad de Londres, pero Cambridge, donde Cecilia estudiaría, no concedió títulos completos a mujeres hasta 1948.',
  },
  {
    id: 'cambridge-eddington',
    title: 'Cambridge y Eddington',
    color: '#D4736A',
    btnImage: '/assets/cecilia/cecilia_m1.png',
    image: '/assets/cecilia/cecilia_m1.png',
    content: [
      'En 1919, con diecinueve años, Cecilia Payne obtuvo una beca para estudiar en el Newnham College de la Universidad de Cambridge. Newnham era uno de los dos colleges femeninos de Cambridge (el otro era Girton) y había sido fundado en 1871 para ofrecer educación universitaria a las mujeres. Cecilia se inscribió inicialmente en botánica, pero pronto añadió física y química a sus estudios. Cambridge representaba un mundo nuevo: bibliotecas con miles de volúmenes, laboratorios equipados con instrumentos de precisión, y conferencias impartidas por algunos de los científicos más relevantes de la época.',
      'La experiencia en Cambridge fue intelectualmente estimulante pero socialmente hostil. Cecilia era una de las pocas mujeres en las clases de física y astronomía. Existía una tradición que los estudiantes varones practicaban: cuando una mujer entraba al salón de conferencias, los hombres pataleaban y golpeaban sus pupitres en señal de rechazo. Cecilia enfrentó este comportamiento sentándose siempre en la primera fila, respondiendo preguntas con una precisión que dejaba al auditorio en silencio. Su conocimiento se convirtió en su defensa más efectiva contra el prejuicio de sus compañeros.',
      'El momento que transformó la vida de Cecilia ocurrió cuando asistió a una conferencia de Arthur Stanley Eddington. En 1919, Eddington había liderado una expedición a la isla de Príncipe, en el Golfo de Guinea, para fotografiar un eclipse solar total. Su objetivo era medir la desviación de la luz estelar al pasar cerca del sol, una predicción de la teoría de la relatividad general de Albert Einstein publicada en 1915. Los resultados confirmaron la predicción: la gravedad del sol curvaba la luz de las estrellas en la cantidad exacta que Einstein había calculado.',
      'Cuando Eddington presentó estos resultados en Cambridge, Cecilia quedó profundamente afectada. Ella misma escribió años después en su autobiografía: "Esa noche no pude dormir. Caminé durante tres horas por los jardines de Cambridge, y cuando amaneció, sabía que mi vida entera estaría dedicada a la astrofísica." La conferencia de Eddington le reveló que la física y la astronomía podían unirse para responder preguntas fundamentales sobre la naturaleza del universo. La relatividad demostraba que el espacio, el tiempo y la materia estaban conectados de maneras que nadie había sospechado.',
      'Eddington reconoció el talento de Cecilia y se convirtió en una influencia determinante en su carrera. Le recomendó lecturas de física atómica y espectroscopía, las herramientas que ella usaría para hacer su descubrimiento. Sin embargo, Cambridge no otorgaba títulos universitarios a mujeres. Cecilia completó todos los exámenes del Tripos de Ciencias Naturales con calificaciones sobresalientes, pero la universidad le negó el grado formal. Esta injusticia institucional la empujó a buscar oportunidades fuera de Inglaterra, donde sus méritos académicos pudieran traducirse en un reconocimiento real.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La expedición de Eddington al eclipse de 1919 casi fracasa. El día del eclipse, 29 de mayo, amaneció nublado en la isla de Príncipe. Las nubes se abrieron parcialmente durante los cinco minutos de totalidad, permitiendo tomar fotografías que confirmaron la predicción de Einstein. Si las nubes no se hubieran despejado, la verificación de la relatividad general se habría retrasado años, y quizás Cecilia nunca habría asistido a la conferencia que cambió su vida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La deflexión de la luz estelar medida por Eddington fue de aproximadamente 1.75 segundos de arco, exactamente la cantidad predicha por la relatividad general de Einstein. La mecánica newtoniana predecía la mitad de ese valor (0.87 segundos de arco). La diferencia, aunque minúscula para el ojo humano, estableció que la gravedad no es una fuerza sino una curvatura del espacio-tiempo causada por la masa, una revolución conceptual que transformó toda la física del siglo XX.' },
    ],
    fact: 'El Newnham College de Cambridge fue fundado en 1871 por Henry Sidgwick y Anne Jemima Clough. En sus primeros años, tenía solo cinco estudiantes. Cuando Cecilia llegó en 1919, el college contaba con unos 200 miembros, pero las mujeres seguían sin poder obtener títulos de la Universidad de Cambridge. Esta política discriminatoria se mantuvo hasta 1948, un cuarto de siglo después de que Cecilia completara sus estudios allí. Las primeras mujeres en recibir títulos completos de Cambridge lo hicieron en una ceremonia especial celebrada el 21 de enero de 1948.',
  },
  {
    id: 'viaje-harvard',
    title: 'El Viaje a Harvard',
    color: '#5A8FC5',
    btnImage: '/assets/cecilia/cecilia_m1.png',
    image: '/assets/cecilia/cecilia_m1.png',
    content: [
      'En 1923, Cecilia Payne tomó una decisión que definiría su vida: abandonar Inglaterra y viajar a Estados Unidos. La oportunidad llegó a través de la Pickering Fellowship, una beca creada por el Observatorio de Harvard para atraer talento internacional. El director del observatorio, Harlow Shapley, buscaba estudiantes con formación sólida en física para aplicar métodos cuantitativos a la astronomía. Eddington recomendó personalmente a Cecilia, destacando su capacidad analítica y su dominio de la física atómica. La beca cubría los gastos básicos, pero el salario era modesto.',
      'El viaje transatlántico en barco tomaba aproximadamente dos semanas en 1923. Cecilia viajó sola, dejando atrás a su familia, sus amigos y el país donde había nacido. Tenía veintitrés años y apenas dinero suficiente para el pasaje. En la cubierta del barco, pasaba las noches observando las mismas estrellas que pronto estudiaría desde el otro lado del océano. Cada constelación visible desde el Atlántico Norte era una referencia familiar que la conectaba con su destino. Cuando llegó a Boston, no conocía a nadie en la ciudad.',
      'El Observatorio de Harvard, fundado en 1839, era uno de los centros astronómicos más importantes del mundo. Albergaba una colección de más de medio millón de placas fotográficas de cristal, cada una capturando un fragmento del cielo nocturno registrado con telescopios de diferentes hemisferios. Estas placas eran el archivo visual más completo del universo observable que existía en esa época. Para Cecilia, tener acceso a este archivo era como encontrar una biblioteca que contenía los secretos de todas las estrellas visibles.',
      'Harlow Shapley, el director, era un astrónomo ambicioso que había demostrado en 1918 que el sistema solar no se encuentra en el centro de la Vía Láctea, sino en su periferia. Shapley reconoció el talento de Cecilia, pero operaba dentro de las normas de su tiempo: el doctorado de Cecilia se formalizaría a través del Radcliffe College, la institución asociada a Harvard para mujeres, ya que Harvard no otorgaba doctorados a mujeres directamente. Esta segregación administrativa era la norma en las universidades estadounidenses de los años veinte.',
      'En Harvard, Cecilia encontró un entorno intelectual que la nutrió pese a las restricciones formales. Trabajaba junto a otros jóvenes astrónomos y heredaba la tradición de las "calculadoras de Harvard" — mujeres como Annie Jump Cannon, Williamina Fleming y Henrietta Swan Leavitt — que habían clasificado cientos de miles de estrellas y descubierto relaciones fundamentales en astronomía sin recibir títulos profesionales adecuados. Cecilia les rendía un respeto profundo, consciente de que caminaba por un sendero que ellas habían abierto con décadas de trabajo meticuloso y mal remunerado.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Annie Jump Cannon, a quien Cecilia conoció en Harvard, clasificó más de 350,000 estrellas durante su carrera, creando el sistema de clasificación espectral O-B-A-F-G-K-M que los astrónomos siguen usando hoy. Los estudiantes de astronomía memorizan esta secuencia con la frase mnemotécnica en inglés: "Oh, Be A Fine Girl/Guy, Kiss Me." Cannon podía clasificar hasta tres estrellas por minuto examinando sus espectros fotográficos, un récord que ningún ser humano ha superado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La colección de placas fotográficas de Harvard, acumulada entre 1885 y 1993, contiene aproximadamente 525,000 placas de vidrio que registran más de un siglo de observaciones celestes. Cada placa mide entre 20 y 35 centímetros y captura miles de estrellas en una sola exposición. Esta colección ha sido digitalizada por el programa DASCH (Digital Access to a Sky Century at Harvard) desde 2005, permitiendo a los astrónomos modernos estudiar cómo han cambiado las estrellas a lo largo de más de cien años.' },
    ],
    fact: 'Henrietta Swan Leavitt, una de las "calculadoras de Harvard" que precedió a Cecilia, descubrió en 1912 la relación período-luminosidad de las estrellas Cefeidas variables: cuanto más lento pulsa una Cefeida, más luminosa es en realidad. Esta relación permitió por primera vez medir distancias a galaxias lejanas. Edwin Hubble utilizó el descubrimiento de Leavitt en 1924 para demostrar que la galaxia de Andrómeda está fuera de la Vía Láctea, probando que el universo es mucho más grande de lo que nadie imaginaba. Leavitt nunca recibió reconocimiento proporcional a la importancia de su hallazgo.',
  },
  {
    id: 'tesis-astronomia',
    title: 'La Tesis que Cambió la Astronomía',
    color: '#C46358',
    btnImage: '/assets/cecilia/cecilia_m1.png',
    image: '/assets/cecilia/cecilia_m1.png',
    content: [
      'En 1925, Cecilia Payne completó su tesis doctoral titulada "Stellar Atmospheres: A Contribution to the Observational Study of High Temperature in the Reversing Layers of Stars." Con solo veinticinco años, presentó evidencia cuantitativa de que las estrellas están compuestas principalmente de hidrógeno y helio. Esta conclusión contradecía la suposición dominante en astronomía desde hacía décadas: que las estrellas tenían una composición química similar a la Tierra, con predominio de hierro, calcio y silicio.',
      'El método de Cecilia combinaba espectroscopía observacional con física teórica de vanguardia. Utilizó la ecuación de ionización formulada por el físico indio Meghnad Saha en 1920, que describe cómo la temperatura de un gas determina el estado de ionización de sus átomos. A diferentes temperaturas, los mismos elementos producen líneas espectrales distintas porque pierden o ganan electrones. Cecilia comprendió que la intensidad de las líneas espectrales observadas en las estrellas no reflejaba directamente la abundancia de cada elemento, sino el estado de ionización determinado por la temperatura estelar.',
      'Esta distinción era fundamental. Los astrónomos anteriores habían asumido que si las líneas del hierro eran prominentes en el espectro de una estrella, entonces la estrella contenía mucho hierro. Cecilia demostró que el hierro aparecía con líneas fuertes no porque fuera abundante, sino porque a ciertas temperaturas estelares, los átomos de hierro se encuentran en estados de ionización que producen absorción espectral muy visible. El hidrógeno, el elemento más abundante, producía líneas relativamente débiles en muchas estrellas porque a altas temperaturas sus átomos están completamente ionizados y no absorben luz eficientemente.',
      'Los cálculos de Cecilia revelaron que el hidrógeno constituye aproximadamente el 90% de la masa estelar y el helio cerca del 9%. Todos los demás elementos — carbono, nitrógeno, oxígeno, hierro y el resto de la tabla periódica — conforman apenas el 1% restante. Era una proporción tan diferente a la composición terrestre que Cecilia misma escribió en su tesis que las abundancias de hidrógeno obtenidas eran "casi con certeza no reales." Esta autocorrección fue consecuencia directa de la presión ejercida por Henry Norris Russell, quien revisó la tesis.',
      'A pesar de la retractación parcial, la tesis de Cecilia fue aprobada y se convirtió en el primer doctorado en astronomía otorgado por el Radcliffe College de Harvard. El astrónomo Otto Struve la describió décadas después como "la tesis doctoral más brillante jamás escrita en astronomía." La tesis estableció un nuevo paradigma: la composición química de las estrellas podía determinarse cuantitativamente mediante la combinación de espectroscopía observacional y física atómica teórica, un enfoque que se convirtió en la base de toda la astrofísica estelar moderna.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La espectroscopía, la técnica que Cecilia dominó, se basa en un principio descubierto en 1814 por Joseph von Fraunhofer, quien observó 574 líneas oscuras en el espectro solar. En 1859, Gustav Kirchhoff y Robert Bunsen demostraron que cada elemento químico produce un patrón único de líneas espectrales. El helio fue descubierto primero en el sol (1868) por Pierre Janssen y Norman Lockyer antes de ser encontrado en la Tierra (1895). Su nombre proviene de "helios," la palabra griega para sol.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ecuación de ionización de Saha (1920) establece que la proporción de átomos ionizados respecto a los neutros en un gas depende exponencialmente de la temperatura y de la energía de ionización del elemento. Para el hidrógeno, la energía de ionización es 13.6 electronvoltios (eV). A la temperatura superficial del sol (5,778 Kelvin), la mayoría del hidrógeno está neutro, produciendo líneas de la serie de Balmer. Pero en estrellas más calientes (tipo O, sobre 30,000 K), el hidrógeno está totalmente ionizado y sus líneas desaparecen.' },
    ],
    fact: 'Si pudieras tomar toda la masa del sol (1.989 × 10³⁰ kilogramos) y separar sus componentes, obtendrías aproximadamente 1.47 × 10³⁰ kg de hidrógeno, 4.89 × 10²⁹ kg de helio y apenas 2.69 × 10²⁸ kg de todos los demás elementos combinados. Expresado de otra forma: por cada átomo de hierro en el sol hay aproximadamente 31,600 átomos de hidrógeno. Cecilia Payne fue la primera persona en establecer estas proporciones con evidencia cuantitativa en 1925, cambiando para siempre nuestra comprensión de la composición del universo.',
  },
  {
    id: 'rechazo-russell',
    title: 'El Rechazo de Russell',
    color: '#6A9FD5',
    btnImage: '/assets/cecilia/cecilia_m1.png',
    image: '/assets/cecilia/cecilia_m1.png',
    content: [
      'Henry Norris Russell era, en la década de 1920, el astrónomo más influyente de Estados Unidos. Profesor de astronomía en la Universidad de Princeton desde 1911, Russell había desarrollado junto con Ejnar Hertzsprung el diagrama Hertzsprung-Russell, una herramienta fundamental para clasificar las estrellas según su luminosidad y temperatura. Su opinión tenía un peso determinante en la comunidad astronómica norteamericana. Cuando Harlow Shapley le envió la tesis de Cecilia para revisión, Russell la leyó con atención y respondió con una carta que cambiaría la historia.',
      'Russell escribió a Cecilia que sus resultados sobre la abundancia de hidrógeno eran "claramente imposibles." Su argumento se basaba en la suposición ampliamente aceptada de que la composición de las estrellas debía ser similar a la de la Tierra. Esta idea tenía raíces en el trabajo de científicos respetados y décadas de interpretaciones espectrales que, como Cecilia había demostrado, estaban fundamentalmente erradas. Pero Russell no aceptó la corrección de una doctoranda de veinticinco años, mujer y extranjera, sobre un consenso que él mismo había ayudado a construir.',
      'Presionada por Russell y aconsejada por su director Shapley — quien dependía de la buena relación con Princeton —, Cecilia añadió una nota en su tesis indicando que las abundancias de hidrógeno que había calculado eran "casi con certeza no reales." Esta frase, impuesta por la jerarquía académica, contradecía sus propios datos y su análisis riguroso. Cecilia sabía que sus cálculos eran correctos, pero no tenía el poder institucional para defender su conclusión contra el hombre más poderoso de la astronomía americana.',
      'En 1929, cuatro años después de la tesis de Cecilia, Russell realizó sus propios cálculos independientes utilizando un método diferente basado en datos solares. Llegó a la misma conclusión: las estrellas son predominantemente hidrógeno y helio. Russell publicó sus resultados en un artículo en el Astrophysical Journal, y en él reconoció brevemente que Cecilia había llegado primero a esta conclusión. Sin embargo, durante décadas, el descubrimiento se atribuyó principalmente a Russell en los libros de texto y en la comunidad científica.',
      'Este episodio ilustra un patrón recurrente en la historia de la ciencia: el efecto Matilda, término acuñado por la historiadora Margaret Rossiter en 1993 para describir la supresión sistemática de las contribuciones científicas de las mujeres. Los descubrimientos de investigadoras eran atribuidos a colegas masculinos, minimizados o directamente ignorados. Cecilia Payne no fue la única víctima: Rosalind Franklin (estructura del ADN), Jocelyn Bell Burnell (púlsares) y Lise Meitner (fisión nuclear) sufrieron dinámicas similares donde sus contribuciones fundamentales fueron eclipsadas por las de hombres con mayor poder institucional.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El diagrama Hertzsprung-Russell, desarrollado independientemente por Ejnar Hertzsprung (1911) y Henry Norris Russell (1913), clasifica las estrellas según su luminosidad (brillo real) y su temperatura superficial (determinada por el color). La mayoría de las estrellas caen en una banda diagonal llamada "secuencia principal." El sol se ubica aproximadamente en el medio de esta secuencia. Este diagrama solo adquirió sentido completo cuando el descubrimiento de Cecilia reveló que todas las estrellas de la secuencia principal comparten la misma composición básica.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El efecto Matilda tiene ejemplos documentados en múltiples campos científicos. Jocelyn Bell Burnell descubrió los púlsares en 1967 como estudiante doctoral en Cambridge, pero el Premio Nobel de Física de 1974 fue otorgado a su supervisor Antony Hewish y a Martin Ryle. Rosalind Franklin produjo la "Fotografía 51" de difracción de rayos X del ADN en 1952, crucial para que Watson y Crick dedujeran la estructura de doble hélice, pero el Nobel de 1962 fue para Watson, Crick y Wilkins. Franklin había fallecido en 1958.' },
    ],
    fact: 'Cuando Russell publicó su artículo de 1929 confirmando que las estrellas son predominantemente hidrógeno, incluyó una nota a pie de página reconociendo el trabajo previo de Cecilia Payne. La nota decía textualmente que los resultados de Payne habían "anticipado" la misma conclusión. Sin embargo, esta nota era insuficiente para equilibrar el peso de una publicación firmada por el astrónomo más influyente de la época. Los libros de texto de astronomía de las décadas de 1930 a 1960 citaban a Russell como la fuente primaria del descubrimiento, y la contribución de Cecilia fue progresivamente recuperada solo a partir de los años 1970.',
  },
  {
    id: 'carrera-harvard',
    title: 'Carrera en Harvard',
    color: '#B4534A',
    btnImage: '/assets/cecilia/cecilia_m1.png',
    image: '/assets/cecilia/cecilia_m1.png',
    content: [
      'Después de completar su doctorado en 1925, Cecilia Payne permaneció en Harvard durante las siguientes cuatro décadas. Su permanencia, sin embargo, estuvo marcada por una desigualdad persistente en títulos y salario. Durante años trabajó sin un cargo oficial que reflejara su nivel de contribución científica. Sus cursos de astronomía no aparecían en el catálogo oficial de Harvard porque, formalmente, ella no era profesora de la universidad. El catálogo los listaba bajo los nombres de colegas masculinos, una práctica que compartía con Emmy Noether en Göttingen, Alemania, quien había sufrido la misma humillación institucional una década antes.',
      'En 1933, Cecilia viajó a Europa y conoció al astrofísico ruso-alemán Sergei Gaposchkin, quien trabajaba en el Observatorio de Berlín y enfrentaba dificultades para salir de Alemania debido al ascenso del régimen nazi. Cecilia intervino para ayudarlo a obtener una visa y un puesto en Harvard. Se casaron en marzo de 1934 y tuvieron tres hijos: Edward, Katherine y Peter. A partir del matrimonio, publicó bajo el nombre Cecilia Payne-Gaposchkin. Logró equilibrar la maternidad con una carrera de investigación activa en una época en que se esperaba que las mujeres casadas abandonaran el trabajo profesional.',
      'Durante las décadas de 1930 y 1940, Cecilia y Sergei colaboraron en investigaciones sobre estrellas variables, estudiando cómo ciertas estrellas cambian de brillo a lo largo del tiempo. Analizaron más de 1,250,000 observaciones de estrellas variables en la Vía Láctea y las Nubes de Magallanes, utilizando la vasta colección de placas fotográficas de Harvard. Este trabajo monumental, publicado en varios libros y artículos, estableció patrones estadísticos de variabilidad estelar que los astrónomos usan como referencia hasta la actualidad.',
      'El reconocimiento institucional llegó con lentitud dolorosa. Recién en 1938, Harvard le concedió el título de "Astrónoma Phillips," un cargo técnico sin estatus profesoral completo. En 1943, fue elegida miembro de la American Academy of Arts and Sciences, siendo una de las primeras mujeres en recibir ese honor. Pero el cargo de profesora titular — el reconocimiento pleno de su nivel académico — no llegó hasta 1956, cuando Cecilia tenía cincuenta y seis años y llevaba más de tres décadas investigando y enseñando en Harvard.',
      'En 1956, Cecilia Payne-Gaposchkin fue nombrada profesora titular del Departamento de Astronomía de Harvard, convirtiéndose en la primera mujer en alcanzar ese rango en la universidad. Poco después, fue designada directora del departamento, la primera mujer en presidir un departamento académico en la historia de Harvard. Estos nombramientos, que para cualquier hombre con sus méritos habrían llegado décadas antes, representaron una victoria silenciosa contra un sistema que había resistido reconocer su genialidad durante treinta y un años.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cecilia enseñó astronomía en Harvard durante décadas sin aparecer en el catálogo oficial. Los estudiantes que tomaban sus cursos sabían que estaban aprendiendo de una de las mentes más brillantes de la disciplina, pero administrativamente, esos cursos no existían como suyos. Uno de sus estudiantes, Jesse Greenstein, quien más tarde se convertiría en un astrónomo distinguido en Caltech, describió sus clases como "las más estimulantes y rigurosas que recibí en mi formación," a pesar de su estatus informal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las estrellas variables, el campo de investigación principal de Cecilia después de su tesis, son estrellas cuyo brillo cambia periódicamente. Existen varios tipos: las Cefeidas pulsan con períodos de días a semanas, las RR Lyrae con períodos de horas, y las Mira con períodos de meses a años. Las variables cataclísmicas, como las novas, aumentan su brillo miles de veces en erupciones violentas. Cecilia y Sergei catalogaron más de tres millones de observaciones de brillo de estas estrellas durante su carrera conjunta.' },
    ],
    fact: 'Harvard no admitió formalmente a mujeres como estudiantes de grado hasta 1943 (durante la Segunda Guerra Mundial) y no las integró completamente con los estudiantes masculinos hasta 1977. El Radcliffe College, la institución asociada para mujeres, funcionó como una entidad separada hasta su fusión completa con Harvard en 1999. Cuando Cecilia obtuvo su doctorado en 1925, su título técnicamente provenía de Radcliffe, no de Harvard, aunque toda su investigación se realizó en instalaciones de Harvard y bajo la supervisión de profesores de Harvard.',
  },
  {
    id: 'reconocimiento-tardio',
    title: 'El Reconocimiento Tardío',
    color: '#3A6FA5',
    btnImage: '/assets/cecilia/cecilia_m1.png',
    image: '/assets/cecilia/cecilia_m1.png',
    content: [
      'En 1976, la American Astronomical Society otorgó a Cecilia Payne-Gaposchkin el Henry Norris Russell Lectureship, el premio más prestigioso de la astronomía estadounidense. La ironía era profunda: el premio llevaba el nombre del mismo hombre que en 1925 la había presionado para retractarse de su descubrimiento correcto. Cecilia tenía setenta y seis años cuando recibió este reconocimiento. En su discurso de aceptación, habló con serenidad sobre su carrera y ofreció un consejo a los jóvenes científicos que resonó en toda la sala.',
      'En ese discurso, Cecilia dijo: "No emprendan una carrera científica en busca de fama o dinero. Hay formas más sencillas de alcanzar ambos. Empréndanla solo si nada más los satisfará, porque nada más los satisfará." Estas palabras reflejaban una filosofía que había sostenido durante medio siglo de trabajo: la ciencia como vocación, no como vehículo para el reconocimiento social. Cecilia nunca expresó amargura pública hacia Russell o hacia el sistema que la había marginado, aunque sus memorias revelan una conciencia clara de las injusticias que enfrentó.',
      'Cecilia Payne-Gaposchkin falleció el 7 de diciembre de 1979 en Cambridge, Massachusetts, a los setenta y nueve años, tras una batalla contra el cáncer de pulmón. Su autobiografía, editada por su hija Katherine Haramundanis, fue publicada póstumamente en 1984 con el título "An Autobiography and Other Recollections." En ella, Cecilia relata con honestidad y sin dramatismo los obstáculos que enfrentó y los descubrimientos que realizó, proporcionando un testimonio directo de lo que significaba ser mujer científica en el siglo XX.',
      'El redescubrimiento de Cecilia Payne como figura central de la astronomía moderna se aceleró en las últimas décadas. El libro de Donovan Moore "What Stars Are Made Of" (2020) presentó su historia a un público amplio. Dava Sobel, en "The Glass Universe" (2016), documentó el contexto de las mujeres astrónomas de Harvard. El asteroide 2039 Payne-Gaposchkin fue nombrado en su honor, así como un cráter en la cara oculta de la Luna. En 2019, Yale nombró a uno de sus nuevos colleges residenciales "Payne Whitney," aunque la comunidad astronómica pedía que fuera "Payne-Gaposchkin."',
      'El legado científico de Cecilia se extiende mucho más allá de su tesis de 1925. Su trabajo estableció que la composición del universo observable es aproximadamente 73% hidrógeno, 25% helio y 2% elementos más pesados — proporciones que las mediciones modernas con el telescopio espacial Hubble y el satélite Planck han confirmado con precisión. Sin saber de qué están hechas las estrellas, no podríamos entender la fusión nuclear estelar, la nucleosíntesis de elementos pesados en supernovas, ni la evolución química de las galaxias. Cada vez que un astrónomo analiza un espectro estelar, trabaja sobre los cimientos que Cecilia Payne construyó.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cráter Payne-Gaposchkin, ubicado en la cara oculta de la Luna en las coordenadas 31.6°S, 153.1°E, tiene un diámetro de 58 kilómetros. Fue nombrado por la Unión Astronómica Internacional en 1974. El asteroide 2039 Payne-Gaposchkin, descubierto en 1974 por astrónomos del Observatorio Harvard-Smithsoniano, orbita el sol en el cinturón principal de asteroides entre Marte y Júpiter con un período orbital de 4.24 años. Ambos homenajes celestes garantizan que su nombre permanezca literalmente escrito en el cosmos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las mediciones modernas del satélite Planck de la Agencia Espacial Europea (lanzado en 2009) han determinado que la composición bariónica (materia ordinaria) del universo es 75% hidrógeno y 25% helio por masa, con elementos más pesados constituyendo menos del 2%. Estas cifras son consistentes con las predicciones del modelo de nucleosíntesis del Big Bang y validan las proporciones que Cecilia Payne calculó en 1925 para las estrellas individuales. La composición del universo a gran escala refleja la composición estelar que ella descubrió.' },
    ],
    fact: 'El Henry Norris Russell Lectureship, otorgado a Cecilia en 1976, es concedido anualmente por la American Astronomical Society "en reconocimiento a una vida de contribución distinguida a la astronomía." Entre los receptores anteriores figuran Subrahmanyan Chandrasekhar (1949), Martin Schwarzschild (1960) y Lyman Spitzer (1961). Cecilia fue la primera mujer en recibir este premio. Desde entonces, solo seis mujeres más lo han obtenido en las cuatro décadas siguientes, evidenciando que las barreras que Cecilia enfrentó aún no han sido completamente eliminadas.',
  },
];

// ——— Stellar Particle Field (Canvas Background) ————————————————————————————
function StellarField() {
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
      drift: (Math.random() - 0.5) * 0.12,
      hue: Math.random() > 0.5 ? '74,127,181' : '212,115,106', // stellar blue or warm rose
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
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

// ——— Stellar Header ————————————————————————————————————————————————————————
function StellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(74,127,181,0.3))' }}>
        {/* Stellar arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#stellarGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4A7FB5','#D4736A','#5A8FC5','#C46358','#6A9FD5','#B4534A','#3A6FA5'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <polygon points="300,16 304,26 314,26 306,32 309,42 300,36 291,42 294,32 286,26 296,26" fill="none" stroke="#4A7FB5" strokeWidth="1.2" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#4A7FB5" opacity="0.4" />
        <defs>
          <linearGradient id="stellarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(74,127,181,0.2)" />
            <stop offset="50%" stopColor="rgba(74,127,181,0.9)" />
            <stop offset="100%" stopColor="rgba(74,127,181,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4A7FB5" fontSize="16" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CECILIA PAYNE-GAPOSCHKIN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(74,127,181,0.6)" fontSize="10" fontFamily="monospace" letterSpacing="2">LA MUJER QUE DESCUBRIÓ DE QUÉ ESTÁN HECHAS LAS ESTRELLAS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ————————————————————————————————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(74,127,181,0.2)'}`,
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
          layoutId="activeDotCeciliaM1"
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

// ——— Expandable Section with Random Direction ————————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————————
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

// ——— Progress Bar ————————————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(74,127,181,0.15)',
    }}>
      <Star size={14} style={{ color: '#4A7FB5', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4A7FB5, #D4736A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(74,127,181,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#4A7FB5', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————————————
export default function InteractiveInfographic_CeciliaM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/cecilia/cecilia_m1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(74,127,181,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StellarField />

      <StellarHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(74,127,181,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(74,127,181,0.08)', borderRadius: '16px',
              border: '1px solid rgba(74,127,181,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#4A7FB5', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado la vida de Cecilia Payne-Gaposchkin!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Pionera del Conocimiento
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
