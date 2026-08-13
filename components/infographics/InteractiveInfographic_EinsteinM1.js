'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Young Einstein themed) ————————————————————————
function DecoCompass({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Compass needle */}
      <path d="M30 8 L33 28 L30 30 L27 28 Z" fill={color} opacity="0.5" />
      <path d="M30 52 L33 32 L30 30 L27 32 Z" fill={color} opacity="0.3" />
      {/* Cardinal marks */}
      <text x="30" y="9" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" opacity="0.5">N</text>
      <text x="30" y="57" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" opacity="0.4">S</text>
      <text x="5" y="33" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" opacity="0.4">O</text>
      <text x="55" y="33" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" opacity="0.4">E</text>
    </svg>
  );
}

function DecoGeometryBook({ size = 70, color = '#3A4F7D', style = {} }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 70 52" style={{ opacity: 0.22, ...style }}>
      {/* Book shape */}
      <path d="M10 8 L35 5 L60 8 L60 46 L35 49 L10 46 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="35" y1="5" x2="35" y2="49" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Triangle on page */}
      <path d="M18 20 L28 38 L14 38 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Circle on page */}
      <circle cx="48" cy="28" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Small formulas */}
      <line x1="42" y1="18" x2="54" y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="44" y1="40" x2="52" y2="40" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoTrainSvg({ size = 80, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.22, ...style }}>
      {/* Train body */}
      <rect x="15" y="12" width="45" height="18" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Chimney */}
      <rect x="18" y="5" width="6" height="9" rx="1" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Smoke */}
      <circle cx="21" cy="4" r="2" fill={color} opacity="0.3" />
      <circle cx="17" cy="2" r="1.5" fill={color} opacity="0.2" />
      {/* Wheels */}
      <circle cx="24" cy="32" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="32" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="52" cy="32" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Track */}
      <line x1="5" y1="36" x2="75" y2="36" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Speed lines */}
      <line x1="4" y1="18" x2="12" y2="18" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="6" y1="24" x2="13" y2="24" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function DecoLightbeam({ size = 60, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central point */}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      {/* Radiating beams */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 7 * Math.cos(rad)} y1={30 + 7 * Math.sin(rad)} x2={30 + 22 * Math.cos(rad)} y2={30 + 22 * Math.sin(rad)} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />;
      })}
      {/* Wave arcs */}
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" strokeDasharray="3 4" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" strokeDasharray="3 4" />
    </svg>
  );
}

function DecoPatentStamp({ size = 70, color = '#4A5F8D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Outer stamp circle with notches */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 24 * Math.cos(rad)} cy={30 + 24 * Math.sin(rad)} r="1.5" fill={color} opacity="0.3" />;
      })}
      {/* Inner circle */}
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Star in center */}
      <path d="M30 18 L32 26 L40 26 L34 31 L36 39 L30 34 L24 39 L26 31 L20 26 L28 26 Z" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoScrollFormula({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* Scroll shape */}
      <path d="M8 8 Q5 8 5 12 L5 32 Q5 38 12 38 L58 38 Q65 38 65 32 L65 12 Q65 8 58 8 Z" fill="none" stroke={color} strokeWidth="1.2" />
      {/* Scroll curls */}
      <path d="M5 12 Q2 12 2 16 Q2 20 5 20" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M65 12 Q68 12 68 16 Q68 20 65 20" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Text lines */}
      <line x1="14" y1="16" x2="56" y2="16" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="14" y1="22" x2="50" y2="22" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="14" y1="28" x2="44" y2="28" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="14" y1="34" x2="38" y2="34" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'ulm-1879': [DecoCompass, DecoLightbeam, DecoGeometryBook],
  'alumno-rebelde': [DecoGeometryBook, DecoCompass, DecoTrainSvg],
  'italia-libertad': [DecoTrainSvg, DecoLightbeam, DecoCompass],
  'politecnica-zurich': [DecoGeometryBook, DecoPatentStamp, DecoLightbeam],
  'oficina-patentes': [DecoPatentStamp, DecoScrollFormula, DecoTrainSvg],
  'amigos-olympia': [DecoScrollFormula, DecoGeometryBook, DecoLightbeam],
  'visperas-revolucion': [DecoLightbeam, DecoCompass, DecoPatentStamp],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Isaacson, W. (2007). Einstein: His Life and Universe, Simon & Schuster',
  'Pais, A. (1982). Subtle Is the Lord: The Science and the Life of Albert Einstein, Oxford University Press',
  'Einstein, A. (1949). Autobiographical Notes, en Schilpp, P.A. (ed.), Albert Einstein: Philosopher-Scientist, Open Court',
  'Fölsing, A. (1997). Albert Einstein: A Biography, Viking Penguin',
  'Stachel, J. (ed.) (1987). The Collected Papers of Albert Einstein, Vol. 1, Princeton University Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'ulm-1879',
    title: 'Ulm, 1879',
    color: '#2C3E6B',
    btnImage: '/assets/albert_einstein/einstein_m1.png',
    image: '/assets/albert_einstein/einstein_m1.png',
    content: [
      'Albert Einstein nació el 14 de marzo de 1879 en la ciudad de Ulm, en el Reino de Wurtemberg, al sur de Alemania. Su familia era de origen judío y pertenecía a la clase media. Su padre, Hermann Einstein, era ingeniero eléctrico y empresario; su madre, Pauline Koch, provenía de una familia acomodada de Stuttgart y tenía una marcada pasión por la música, especialmente por el piano. Ulm era entonces una ciudad de unos 36,000 habitantes, conocida por tener la catedral con la torre de iglesia más alta del mundo, con 161.53 metros de altura, completada en 1890.',
      'La familia Einstein residió en Ulm solo durante el primer año de vida de Albert. En 1880, Hermann y su hermano Jakob decidieron trasladarse a Múnich para fundar una empresa de equipamiento eléctrico llamada Elektrotechnische Fabrik J. Einstein & Cie. La compañía fabricaba dínamos, medidores eléctricos y sistemas de iluminación. Fue en Múnich donde nació la hermana menor de Albert, Maria (conocida como Maja), el 18 de noviembre de 1881. Albert y Maja mantuvieron una relación muy estrecha durante toda su vida.',
      'La casa de los Einstein en Múnich se convirtió en un espacio donde la ciencia y la tecnología estaban presentes de manera natural. El taller de la empresa quedaba en el jardín trasero, y el pequeño Albert podía observar bobinas de cobre, imanes permanentes y generadores eléctricos desde muy temprana edad. Su tío Jakob, que era ingeniero, disfrutaba planteándole problemas matemáticos como si fueran juegos. Le decía: «Es como cazar un animalito que no conocemos, así que lo llamamos X hasta que lo atrapamos». Estos retos tempranos sembraron en Albert un gusto duradero por el razonamiento lógico.',
      'Una de las anécdotas más reveladoras de la infancia de Einstein es que tardó en aprender a hablar. Según los recuerdos familiares, Albert no pronunció sus primeras palabras completas hasta los dos años y medio, lo cual preocupó a sus padres. Incluso después de empezar a hablar, tenía el hábito de repetir las frases en voz baja para sí mismo antes de decirlas en voz alta, una costumbre que mantuvo hasta los siete años. Los médicos de la época no encontraron ningún problema, y con el tiempo quedó claro que su desarrollo verbal lento no tenía relación alguna con sus capacidades intelectuales.',
      'La familia Einstein practicaba el judaísmo de manera secular. No eran religiosos ortodoxos, pero mantenían ciertas tradiciones culturales. Pauline insistió en que Albert tomara lecciones de violín a los seis años, un instrumento que inicialmente detestaba pero que terminó amando con el tiempo. Mozart se convirtió en su compositor preferido. Einstein continuó tocando el violín durante toda su vida adulta y afirmó en múltiples ocasiones que la música era una parte fundamental de su proceso de pensamiento creativo, casi tan importante como la física misma.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El hospital donde nació Einstein en Ulm fue destruido durante un bombardeo aliado en diciembre de 1944, durante la Segunda Guerra Mundial. Hoy, una placa conmemorativa en la Bahnhofstraße 20 marca el lugar aproximado donde estaba la casa natal de Einstein. La ciudad de Ulm celebra su conexión con Einstein cada 14 de marzo, que también es el Día Internacional de las Matemáticas (anteriormente Día de Pi, pues π ≈ 3.14).' },
      { label: 'Dato Científico', icon: 'atom', text: 'La empresa eléctrica de Hermann y Jakob Einstein fue una de las primeras en llevar iluminación eléctrica a Múnich. En 1885 iluminaron la Oktoberfest con sus equipos, compitiendo directamente con grandes compañías como Siemens & Halske. Aunque la empresa tuvo contratos importantes al principio, eventualmente perdió ante competidores más grandes que contaban con mayor capital y capacidad de producción industrial a escala.' },
    ],
    fact: 'El 14 de marzo de 1879, fecha de nacimiento de Einstein, coincide con el Día de Pi (3/14 en formato de fecha estadounidense). El Congreso de los Estados Unidos declaró oficialmente el 14 de marzo como Día de Pi en 2009, mediante la resolución H.RES.224. Además, Stephen Hawking falleció exactamente el 14 de marzo de 2018, a los 76 años, cerrando un ciclo simbólico entre dos de las mentes más reconocidas de la física moderna. Einstein también compartía año de nacimiento con Max von Laue (1879), futuro ganador del Nobel de Física en 1914 por la difracción de rayos X en cristales.',
  },
  {
    id: 'alumno-rebelde',
    title: 'El Alumno Rebelde',
    color: '#D4A535',
    btnImage: '/assets/albert_einstein/einstein_m1.png',
    image: '/assets/albert_einstein/einstein_m1.png',
    content: [
      'La relación de Albert Einstein con la educación formal fue conflictiva desde los primeros años. En el Luitpold Gymnasium de Múnich, donde ingresó a los diez años, el sistema educativo seguía el modelo prusiano, basado en la memorización mecánica y la disciplina rígida. Los estudiantes debían repetir datos de memoria, obedecer sin cuestionar y seguir un orden estricto que dejaba poco espacio para la curiosidad individual. Para un niño como Albert, que necesitaba comprender el «por qué» de cada fenómeno, este enfoque resultaba sofocante y contraproducente.',
      'Varios profesores del Gymnasium tuvieron opiniones negativas sobre Einstein. Su profesor de griego le dijo que «nunca llegaría a nada» porque hacía demasiadas preguntas y no respetaba la autoridad. Otro docente lo describió como «un alumno que sonríe de forma desdeñosa mientras le hablas». Sin embargo, estas evaluaciones reflejaban más las limitaciones del sistema que las capacidades reales del joven. Einstein no era un mal estudiante en el sentido académico: obtenía notas altas en matemáticas y ciencias, pero su actitud desafiante irritaba a los profesores acostumbrados a la obediencia sin cuestionamiento.',
      'A los cinco años, mientras estaba enfermo en cama, su padre Hermann le regaló una brújula de bolsillo. Este evento, aparentemente menor, tuvo un impacto profundo en su desarrollo intelectual. Einstein quedó cautivado por el hecho de que la aguja siempre señalara la misma dirección, sin que ninguna fuerza visible la empujara. Décadas después, en sus Notas Autobiográficas de 1949, Einstein recordó ese momento con claridad: «Algo profundamente oculto tenía que estar detrás de las cosas». La brújula le reveló que existían fuerzas invisibles gobernando el comportamiento del mundo físico, una idea que guiaría toda su carrera científica.',
      'A los doce años, Einstein descubrió la geometría euclidiana a través de un pequeño libro de texto que él llamaría «el librito sagrado de la geometría». El libro, escrito por el matemático alemán Heinrich Borchert Christoph, contenía los teoremas fundamentales de Euclides. Einstein quedó maravillado por la posibilidad de demostrar verdades con certeza absoluta a partir de axiomas simples. Antes de cumplir los trece años, había estudiado por cuenta propia los fundamentos del cálculo diferencial e integral, adelantándose varios años al programa escolar oficial del Gymnasium.',
      'El contraste entre el ambiente estimulante de su hogar y la rigidez del Gymnasium se hizo cada vez más marcado. En casa, su tío Jakob le planteaba ecuaciones algebraicas como pasatiempo, y un estudiante de medicina llamado Max Talmud (más tarde Talmey) visitaba semanalmente a la familia y le regalaba libros de ciencia y filosofía. Talmud le prestó la Crítica de la razón pura de Immanuel Kant cuando Albert tenía apenas trece años, además de obras de divulgación científica como los Libros Populares de Ciencias Naturales de Aaron Bernstein. Estas lecturas autodidactas configuraron su forma de pensar mucho más que las clases formales.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Existe un mito popular que dice que Einstein «reprobaba matemáticas en la escuela». Esto es falso. En el sistema de calificaciones suizo, donde 6 es la nota máxima, Einstein obtenía regularmente 5 y 6 en matemáticas y física. La confusión surgió porque en el sistema alemán, 1 es la mejor nota, y algunos biógrafos interpretaron sus calificaciones al revés. Sus notas del examen de ingreso a la ETH Zürich en 1895 muestran calificaciones de 6/6 en álgebra y geometría.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La brújula que tanto cautivó a Einstein funciona gracias al campo magnético terrestre. La Tierra actúa como un gigantesco imán dipolar, con líneas de campo magnético que van del polo sur magnético al polo norte magnético. La intensidad de este campo es de aproximadamente 25 a 65 microteslas en la superficie terrestre. El polo norte magnético se desplaza unos 55 kilómetros por año y en 2025 se encuentra en el Ártico canadiense, a unos 86.5° de latitud norte.' },
    ],
    fact: 'Max Talmud, el estudiante de medicina que le regalaba libros a Einstein, tenía 21 años cuando comenzó a visitar a la familia Einstein en 1889. Albert tenía solo diez años. Talmud le llevó los trece volúmenes de los Libros Populares de Ciencias Naturales de Aaron Bernstein, una enciclopedia científica ilustrada que incluía descripciones de experimentos sobre electricidad, luz y óptica. Talmud recordó años después que tras leer la Crítica de la razón pura de Kant, Albert «abandonó su breve fase religiosa y nunca volvió a ella», adoptando una postura escéptica hacia los dogmas que mantendría el resto de su vida.',
  },
  {
    id: 'italia-libertad',
    title: 'Italia y la Libertad',
    color: '#3A4F7D',
    btnImage: '/assets/albert_einstein/einstein_m1.png',
    image: '/assets/albert_einstein/einstein_m1.png',
    content: [
      'En 1894, la empresa eléctrica de Hermann y Jakob Einstein perdió un contrato crucial para iluminar la ciudad de Múnich y se vio obligada a cerrar. La familia decidió emigrar a Italia en busca de nuevas oportunidades comerciales, estableciéndose primero en Milán y luego en Pavía, donde Hermann abrió una nueva fábrica de equipos eléctricos. Sin embargo, Albert, de quince años, fue dejado solo en Múnich para completar sus estudios en el Luitpold Gymnasium, una decisión que resultó ser un punto de inflexión decisivo en su vida.',
      'La soledad en Múnich fue difícil de soportar para el joven Albert. Sin el apoyo emocional de su familia y atrapado en un sistema educativo que consideraba opresivo, su situación se deterioró rápidamente. Consiguió un certificado médico firmado por un doctor que declaraba que sufría de agotamiento nervioso y necesitaba reunirse con su familia. También obtuvo una carta de su profesor de matemáticas reconociendo su nivel avanzado en la materia. Con estos documentos en mano, Einstein abandonó el Gymnasium sin graduarse a los dieciséis años, en diciembre de 1894.',
      'Einstein llegó a Italia y descubrió un mundo diferente al que había conocido en Múnich. El ambiente cultural italiano, con su valoración de la individualidad y la creatividad, contrastaba radicalmente con la disciplina prusiana. Albert dedicó un año entero a la exploración libre: visitó museos, recorrió las montañas del norte de Italia, leyó libros de física y filosofía, y realizó sus primeros escritos científicos independientes. A los dieciséis años, redactó un ensayo titulado «Sobre la investigación del estado del éter en el campo magnético», que envió a su tío Caesar Koch en Bélgica.',
      'Una de las decisiones más audaces que tomó Einstein en esta época fue renunciar a su ciudadanía alemana en enero de 1896. Esta acción tenía una motivación práctica: evitar el servicio militar obligatorio del Imperio Alemán, que él rechazaba profundamente por su naturaleza militarista. Einstein quedó apátrida durante cinco años, sin ninguna nacionalidad, hasta que obtuvo la ciudadanía suiza el 21 de febrero de 1901. La solicitud costó 600 francos suizos, una suma considerable para un joven sin empleo fijo, que su padre le ayudó a pagar.',
      'El año que Einstein pasó en Italia, libre de las restricciones escolares, fue determinante para su desarrollo intelectual. Sin maestros que lo reprimieran, pudo seguir su propia curiosidad sin límites. Leyó a James Clerk Maxwell, cuyas ecuaciones sobre electromagnetismo le causaron una profunda impresión. También comenzó a formularse preguntas que más adelante transformarían la física: «¿Qué vería si pudiera cabalgar sobre un rayo de luz?». Esta pregunta, que se formuló por primera vez en Aarau en 1895 según sus propios recuerdos, fue el germen conceptual de la teoría de la relatividad especial que publicaría una década más tarde.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El ensayo que Einstein escribió a los dieciséis años, «Über die Untersuchung des Ätherzustandes im magnetischen Felde» (Sobre la investigación del estado del éter en el campo magnético), fue su primer intento de trabajo científico formal. Aunque contenía errores y no fue publicado, ya mostraba su interés por los campos electromagnéticos y la naturaleza de la luz. El manuscrito original se conservó gracias a que su tío Caesar Koch lo guardó y fue publicado póstumamente en las obras completas de Einstein editadas por Princeton.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El servicio militar en el Imperio Alemán a finales del siglo XIX era obligatorio para todos los varones entre 17 y 45 años, con un período activo de dos a tres años seguido de años en la reserva. Al renunciar a su ciudadanía alemana, Einstein también renunció a la protección consular alemana. La ciudadanía suiza, que obtuvo en 1901, le concedió estabilidad legal y un pasaporte con el que viajó por Europa durante los años siguientes. Suiza le exigió un examen médico militar, donde fue declarado no apto para el servicio por tener pies planos y varices.' },
    ],
    fact: 'El ensayo de Einstein sobre el éter, escrito en Italia a los dieciséis años, ya contenía la semilla de una idea que desafiaría a toda la física: la relación entre campos eléctricos y magnéticos no requería un medio material (el éter) para propagarse. En aquella época, la mayoría de los físicos creían que la luz necesitaba un medio llamado «éter luminífero» para viajar, del mismo modo que el sonido necesita aire. El experimento de Michelson y Morley de 1887 ya había fallado en detectar el éter, pero pocos científicos cuestionaban su existencia. Einstein sería el primero en declarar, en 1905, que el éter simplemente no existía.',
  },
  {
    id: 'politecnica-zurich',
    title: 'La Politécnica de Zúrich',
    color: '#C49225',
    btnImage: '/assets/albert_einstein/einstein_m1.png',
    image: '/assets/albert_einstein/einstein_m1.png',
    content: [
      'En octubre de 1895, Albert Einstein se presentó al examen de ingreso de la Escuela Politécnica Federal de Zúrich (Eidgenössische Polytechnische Schule, hoy ETH Zürich), la institución científica más prestigiosa de Suiza. Tenía dieciséis años, dos menos que la edad mínima habitual de admisión. Le permitieron presentarse por sus resultados sobresalientes en matemáticas. En el examen, obtuvo las calificaciones máximas en álgebra, geometría y física, pero reprobó las secciones de francés, química, botánica y zoología. El director, Albin Herzog, le recomendó completar el bachillerato en la escuela cantonal de Aarau.',
      'La escuela de Aarau, en el cantón de Argovia, resultó ser una experiencia transformadora. Este centro seguía los principios pedagógicos de Johann Heinrich Pestalozzi, el reformador educativo suizo del siglo XVIII que defendía el aprendizaje a través de la observación directa, la experimentación y el pensamiento independiente. En Aarau, Albert encontró por primera vez un sistema educativo compatible con su forma de aprender. Los profesores fomentaban la discusión, permitían que los alumnos diseñaran sus propios experimentos y valoraban la originalidad por encima de la memorización.',
      'Durante su estancia en Aarau, Einstein vivió en la casa del profesor Jost Winteler, director de estudios del colegio. La familia Winteler lo acogió como a un miembro más, y Albert se enamoró de Marie, la hija mayor del profesor. Esta relación sentimental, su primera, fue breve pero significativa. Los lazos con la familia Winteler se mantuvieron durante décadas: la hermana de Albert, Maja Einstein, se casó con Paul Winteler, y su mejor amigo Michele Besso se casó con Anna Winteler. Tres familias unidas por la pequeña Aarau.',
      'En septiembre de 1896, Einstein aprobó el examen de madurez (Matura) de Aarau con una nota promedio de 5.0 sobre 6.0, e ingresó en la sección VI-A de la ETH Zürich, dedicada a la formación de profesores de matemáticas y física. Su promoción constaba de once estudiantes, entre ellos Mileva Marić, una joven serbia de Novi Sad que era la única mujer inscrita en la sección de física. Mileva había obtenido permiso especial del Ministerio de Educación de Serbia para estudiar en el extranjero, algo prácticamente inaudito para una mujer en los años 1890.',
      'La relación entre Albert y Mileva comenzó como una amistad intelectual basada en su pasión compartida por la física y las matemáticas, y pronto se transformó en un vínculo romántico. Estudiaban juntos, discutían artículos científicos y se escribían cartas donde mezclaban ecuaciones de termodinámica con declaraciones de afecto. En la ETH, Albert asistía selectivamente a las clases: ignoraba las que le parecían tediosas y se dedicaba a estudiar por cuenta propia los trabajos de James Clerk Maxwell, Ludwig Boltzmann y Heinrich Hertz, tres pilares de la física del siglo XIX que no figuraban en el plan de estudios oficial de la politécnica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El profesor Heinrich Weber, titular de la cátedra de física en la ETH, le dijo a Einstein una de las frases más irónicas de la historia académica: «Eres un chico muy inteligente, Einstein, pero tienes un gran defecto: no dejas que nadie te enseñe nada». Weber enseñaba física clásica pero se negaba a incluir las ecuaciones de Maxwell en sus clases, algo que frustró profundamente a Einstein. Cuando Albert se graduó en 1900, Weber se negó a recomendarlo para un puesto de asistente, cortando su camino académico convencional.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ETH Zürich (Eidgenössische Technische Hochschule) fue fundada en 1855 por el gobierno federal suizo. Para el año 2025, ha producido 22 ganadores del Premio Nobel, incluyendo a Albert Einstein (1921), Wolfgang Pauli (1945), Richard Ernst (1991) y Kurt Wüthrich (2002). El campus principal se sitúa en la colina de Rämistrasse, en el centro de Zúrich, y el edificio histórico fue diseñado por el arquitecto Gottfried Semper. En el año académico 1896-1900, la matrícula anual era de 100 francos suizos.' },
    ],
    fact: 'Mileva Marić fue una de las primeras mujeres en Europa en estudiar física a nivel universitario. Nació el 19 de diciembre de 1875 en Titel, Serbia (entonces parte del Imperio Austrohúngaro). A pesar de su talento, se enfrentó a barreras constantes: en la ETH, fue la quinta mujer en ser admitida en toda la historia de la institución. Aprobó los exámenes intermedios con un promedio de 4.0, pero no logró superar los exámenes finales de 1900 ni los de 1901, en parte debido a las dificultades de un embarazo no planificado. La hija de Albert y Mileva, llamada Lieserl, nació en enero de 1902 en Novi Sad, y su destino sigue siendo un misterio histórico sin resolver.',
  },
  {
    id: 'oficina-patentes',
    title: 'La Oficina de Patentes',
    color: '#4A5F8D',
    btnImage: '/assets/albert_einstein/einstein_m1.png',
    image: '/assets/albert_einstein/einstein_m1.png',
    content: [
      'Tras graduarse de la ETH en julio de 1900, Einstein se encontró en una situación difícil: no pudo obtener ningún puesto académico. Envió solicitudes a universidades de toda Europa y fue rechazado sistemáticamente. Su antiguo profesor Heinrich Weber se negó a recomendarlo, y otros docentes lo consideraban un estudiante brillante pero indisciplinado. Durante casi dos años, Einstein sobrevivió dando clases particulares de matemáticas y física, y trabajando brevemente como profesor sustituto en escuelas técnicas de Winterthur y Schaffhausen, en Suiza.',
      'La situación cambió el 23 de junio de 1902, cuando Einstein comenzó a trabajar como «Experto Técnico de Tercera Clase» en la Oficina Federal de la Propiedad Intelectual (Eidgenössisches Amt für Geistiges Eigentum) en Berna. El puesto fue posible gracias a la intervención de Marcel Grossmann, su compañero de clase en la ETH, cuyo padre conocía al director de la oficina, Friedrich Haller. Einstein recibió un salario anual de 3,500 francos suizos, suficiente para vivir modestamente pero con estabilidad por primera vez en años.',
      'El trabajo de Einstein en la oficina de patentes consistía en evaluar solicitudes de invenciones presentadas por ingenieros y empresas. Debía analizar cada propuesta, determinar si el invento era original, verificar si funcionaba según los principios científicos conocidos y redactar un informe técnico. Friedrich Haller le enseñó a ser riguroso y conciso: «Cuando recoja una solicitud, piense que todo lo que dice el inventor está equivocado. Si después de analizarlo sigue pareciendo correcto, entonces vale la pena». Este entrenamiento desarrolló en Einstein una capacidad analítica rápida y precisa.',
      'Lejos de ser un trabajo frustrante, la oficina de patentes resultó ser un entorno productivo para Einstein. Completaba sus tareas diarias con eficiencia, a menudo en menos tiempo del asignado, y dedicaba las horas restantes a sus investigaciones de física. En su escritorio, junto a las solicitudes de patentes, mantenía lo que él llamaba su «departamento de física teórica»: hojas de papel con ecuaciones y razonamientos que desarrollaba en los momentos libres entre evaluaciones. El horario era de lunes a sábado, de ocho de la mañana a seis de la tarde.',
      'Einstein trabajó en la oficina de patentes desde junio de 1902 hasta octubre de 1909, un período de más de siete años. Durante ese tiempo, fue ascendido a Experto Técnico de Segunda Clase en 1906 con un aumento salarial a 4,500 francos anuales. En esos mismos años publicó los cuatro artículos del Annus Mirabilis de 1905 y completó su tesis doctoral sobre la determinación de dimensiones moleculares, presentada en la Universidad de Zúrich en abril de 1905. Friedrich Haller, su jefe, desconocía durante años que su empleado estaba transformando la física moderna desde un escritorio de patentes.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marcel Grossmann, el amigo que consiguió el trabajo en la oficina de patentes para Einstein, también fue crucial en su vida científica. Grossmann era un matemático talentoso que tomaba apuntes meticulosos de todas las clases en la ETH, y Einstein usaba sus notas para preparar los exámenes. Años después, en 1912, Grossmann enseñó a Einstein la geometría diferencial de Riemann y el cálculo tensorial, herramientas matemáticas sin las cuales la teoría de la relatividad general de 1915 habría sido imposible de formular.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Oficina Federal de la Propiedad Intelectual de Berna fue creada en 1888 y sigue existiendo en la actualidad. Cuando Einstein trabajó allí, la oficina ocupaba un edificio en la Speichergasse, en el centro histórico de Berna. En 1905, el año en que publicó sus artículos revolucionarios, la oficina procesaba unas 900 solicitudes de patentes al año. Einstein evaluaba en promedio entre 6 y 8 solicitudes por semana, lo cual le dejaba tiempo suficiente para su investigación personal en las horas muertas del trabajo.' },
    ],
    fact: 'La tesis doctoral de Einstein, titulada «Una nueva determinación de las dimensiones moleculares» (Eine neue Bestimmung der Moleküldimensionen), fue presentada en la Universidad de Zúrich el 30 de abril de 1905 y aceptada el 15 de enero de 1906. Su director de tesis fue Alfred Kleiner, profesor de física experimental. La tesis calculaba el radio molecular del azúcar disuelto en agua, obteniendo un valor de aproximadamente 6.2 × 10⁻⁸ centímetros por molécula. Este trabajo, menos conocido que sus otros artículos de 1905, es paradójicamente el más citado de toda su producción científica, con miles de citas en campos como la química coloidal y la biofísica.',
  },
  {
    id: 'amigos-olympia',
    title: 'Los Amigos de Olympia',
    color: '#B88420',
    btnImage: '/assets/albert_einstein/einstein_m1.png',
    image: '/assets/albert_einstein/einstein_m1.png',
    content: [
      'En 1902, poco después de establecerse en Berna, Einstein fundó un grupo de lectura y debate filosófico-científico junto a dos amigos: Maurice Solovine, un estudiante rumano de filosofía nacido en 1875, y Conrad Habicht, un matemático suizo nacido en 1876. Los tres se reunían regularmente en el apartamento de Einstein en la Kramgasse 49, en el centro histórico de Berna. Aunque comenzaron como sesiones informales de estudio, las reuniones pronto adquirieron una intensidad intelectual notable. Habicht bautizó al grupo con un nombre irónico y grandilocuente: la «Academia Olympia».',
      'Las reuniones de la Academia Olympia seguían un formato consistente: uno de los tres miembros leía en voz alta un capítulo o artículo, y luego los otros dos lo analizaban, cuestionaban y debatían hasta agotar el tema. Las discusiones podían prolongarse durante horas, acompañadas de cenas sencillas de salchichas, queso Gruyère, fruta y té. Entre los textos que leyeron figuraban la Ética de Baruch Spinoza, el Análisis de las sensaciones de Ernst Mach, el Tratado de la naturaleza humana de David Hume, y La ciencia y la hipótesis de Henri Poincaré.',
      'La influencia de estas lecturas en el pensamiento de Einstein fue significativa y documentada. Ernst Mach, con su crítica radical del concepto de espacio absoluto de Newton, plantó la semilla que llevaría a Einstein a cuestionar las nociones clásicas de tiempo y espacio. David Hume, con su análisis empirista de la causalidad, enseñó a Einstein a desconfiar de los conceptos que no pudieran verificarse mediante la experiencia directa. Henri Poincaré, con sus escritos sobre la simultaneidad y la convención de la sincronización de relojes, proporcionó herramientas conceptuales que Einstein utilizó directamente en la relatividad especial.',
      'Solovine describió la dinámica del grupo en sus memorias: «Nuestros medios materiales eran muy modestos, pero la alegría que sentíamos era profunda, y nuestra sed de conocimiento era insaciable. Einstein poseía una risa franca y sonora que estallaba sin previo aviso». Las reuniones no eran siempre solemnes; los tres amigos también leían literatura, tocaban música y hacían excursiones por las montañas suizas. En una ocasión, Solovine se quedó dormido durante una lectura de Pearson, y Einstein le puso humo de tabaco en la cara para despertarlo, lo cual provocó una discusión sobre la naturaleza del sueño y la atención.',
      'La Academia Olympia se disolvió informalmente en 1904, cuando Habicht se trasladó a Schaffhausen y Solovine a París. Sin embargo, los tres mantuvieron correspondencia durante décadas. En 1953, cuando Einstein tenía 74 años, le envió una carta a Solovine donde escribió: «A la inmortal Academia Olympia... Tu tenaz vitalidad me llena de cierta admiración». Solovine guardó esta carta y las cartas anteriores, publicándolas póstumamente. Años después, Einstein reconoció que las discusiones de la Academia Olympia habían sido tan formativas para su desarrollo como cualquier curso universitario.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El apartamento de la Kramgasse 49, donde se reunía la Academia Olympia, es hoy el Museo Casa Einstein (Einsteinhaus Bern), abierto al público desde 1979. Conserva muebles de la época y reproducciones de los documentos que Einstein escribió durante sus años en Berna. La Kramgasse es una calle medieval con arcadas del siglo XV en el casco antiguo de Berna, declarado Patrimonio de la Humanidad por la UNESCO en 1983. El museo recibe aproximadamente 30,000 visitantes al año.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ciencia y la hipótesis de Henri Poincaré, publicada en 1902, es uno de los textos que más impacto tuvo en Einstein. En el capítulo sobre la medición del tiempo, Poincaré analizó cómo los observadores en diferentes ubicaciones coordinan sus relojes usando señales luminosas y planteó que la simultaneidad de eventos distantes es una convención, no un hecho absoluto. Einstein leyó este libro en la Academia Olympia en 1903, dos años antes de publicar su artículo sobre la relatividad especial, donde desarrolló estas ideas hasta sus consecuencias más radicales.' },
    ],
    fact: 'Conrad Habicht fue el destinatario de una de las cartas más citadas de la historia de la ciencia. En mayo de 1905, Einstein le escribió anunciando sus trabajos del Annus Mirabilis: «Te prometo cuatro artículos... el primero trata sobre la radiación y las propiedades energéticas de la luz, y es muy revolucionario». Esta carta, conservada en los archivos de la ETH Zürich, es el único documento donde Einstein describe simultáneamente los cuatro artículos de 1905 antes de su publicación. Habicht nunca llegó a ser un académico reconocido, pero su contribución a la historia fue guardar esa carta durante más de cincuenta años.',
  },
  {
    id: 'visperas-revolucion',
    title: 'En Vísperas de la Revolución',
    color: '#1E2D5A',
    btnImage: '/assets/albert_einstein/einstein_m1.png',
    image: '/assets/albert_einstein/einstein_m1.png',
    content: [
      'Para 1904, la vida de Albert Einstein había adquirido una cierta estabilidad por primera vez. Se había casado con Mileva Marić el 6 de enero de 1903 en una ceremonia civil en Berna, sin la presencia de sus padres, quienes se oponían a la relación. Los testigos fueron Maurice Solovine y Conrad Habicht, sus compañeros de la Academia Olympia. La pareja se instaló en un pequeño apartamento en la Kramgasse, donde Einstein continuaba su trabajo en la oficina de patentes durante el día y sus investigaciones de física por las noches y los fines de semana.',
      'El 14 de mayo de 1904 nació Hans Albert Einstein, el primer hijo reconocido de Albert y Mileva. Einstein se dedicó activamente a la crianza de su hijo, bañándolo, paseándolo y meciéndolo mientras, según sus propias palabras, «pensaba en sus problemas de física». En cartas a sus amigos, describía cómo Hans Albert gritaba «con todas sus fuerzas» y cómo eso no le impedía concentrarse en ecuaciones. Hans Albert se convertiría años después en un reconocido ingeniero hidráulico, profesor en la Universidad de California en Berkeley, especialista en transporte de sedimentos.',
      'En 1904, Einstein estaba inmerso en una serie de preguntas fundamentales sobre la naturaleza de la luz y el movimiento. Había leído los trabajos de Hendrik Lorentz sobre las transformaciones de coordenadas para objetos en movimiento y conocía el resultado negativo del experimento de Michelson y Morley de 1887, que había fracasado en detectar el éter luminífero. La pregunta que lo atormentaba era directa: si la velocidad de la luz es constante para todos los observadores, independientemente de su movimiento, ¿qué consecuencias tiene esto para nuestra comprensión del tiempo y del espacio?',
      'El momento de claridad llegó, según el propio Einstein, durante una conversación con su amigo Michele Besso en mayo de 1905. Besso, un ingeniero italo-suizo que también trabajaba en la oficina de patentes de Berna, era su principal interlocutor científico. Einstein le explicó el problema de la simultaneidad: dos eventos que parecen ocurrir al mismo tiempo para un observador pueden no ser simultáneos para otro que se mueve respecto al primero. Esa noche, Einstein comprendió que el tiempo mismo debía ser relativo. Cinco semanas después, el 30 de junio de 1905, envió su artículo sobre la relatividad especial a los Annalen der Physik.',
      'Así se encontraba Albert Einstein en vísperas de su año más productivo: tenía 25 años, un trabajo estable pero modesto en la oficina de patentes, una esposa y un hijo pequeño, un círculo reducido de amigos con quienes discutir ideas, y una mente cargada de preguntas sin responder. No tenía laboratorio, ni financiamiento científico, ni una posición académica. La comunidad científica no conocía su nombre. Y sin embargo, en el transcurso de los meses siguientes, este empleado anónimo de Berna produciría cuatro artículos que alterarían permanentemente la comprensión humana del universo, la materia, la energía, la luz y el tiempo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Michele Besso es la única persona mencionada por nombre en el artículo original de la relatividad especial de 1905. En el último párrafo, Einstein escribió: «En conclusión, permítaseme señalar que mi amigo y colega M. Besso me proporcionó con constancia una ayuda valiosa y que le debo varias sugerencias estimulantes». Besso nunca reclamó crédito por la relatividad y siguió trabajando toda su vida en la oficina de patentes de Berna, donde permaneció hasta su jubilación en 1938.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El experimento de Michelson y Morley, realizado en Cleveland, Ohio, en 1887, intentó medir la velocidad de la Tierra a través del éter luminífero usando un interferómetro óptico. Si el éter existiera, la velocidad de la luz mediría ligeramente diferente en la dirección del movimiento terrestre que en la dirección perpendicular. El experimento no encontró ninguna diferencia, con una precisión de 8 kilómetros por segundo. Este resultado nulo fue uno de los mayores enigmas de la física del siglo XIX y una de las bases experimentales que Einstein utilizó para formular la relatividad especial.' },
    ],
    fact: 'Albert Einstein y Michele Besso fueron amigos durante 52 años, desde que se conocieron en un concierto en Zúrich en 1896 hasta la muerte de Besso el 15 de marzo de 1955. Einstein escribió una carta de condolencia a la familia de Besso que contiene una de sus frases más citadas: «Michele se ha adelantado a mí dejando este mundo. Es algo sin importancia. Para nosotros, los físicos convencidos, la distinción entre pasado, presente y futuro es solo una ilusión obstinada, por persistente que sea». Einstein falleció apenas un mes después, el 18 de abril de 1955, a los 76 años, en el Hospital de Princeton, Nueva Jersey.',
  },
];

// ——— Floating Particle Field (Canvas Background) ————————————————————————————
function IndigoField() {
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
      hue: Math.random() > 0.5 ? '44,62,107' : '212,165,53', // indigo or amber
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

// ——— Einstein Header ————————————————————————————————————————————————————
function EinsteinHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Arc path */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#einsteinGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#2C3E6B','#D4A535','#3A4F7D','#C49225','#4A5F8D','#B88420','#1E2D5A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central compass icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#D4A535" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#D4A535" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="einsteinGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(44,62,107,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(44,62,107,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL JOVEN ALBERT</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">DE MÚNICH A ZÚRICH</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ————————————————————————————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,165,53,0.2)'}`,
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
          layoutId="activeDotEinsteinM1"
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

        {/* Video Player */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
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
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #2C3E6B, #D4A535)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_EinsteinM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/albert_einstein/bg_einstein_m1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,165,53,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <IndigoField />

      <EinsteinHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,165,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado la juventud de Albert Einstein!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Genio Rebelde
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
