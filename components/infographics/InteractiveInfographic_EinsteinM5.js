'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Einstein Life themed) ————————————————————
function DecoCompass({ size = 70, color = '#D4A03C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Compass needle */}
      <polygon points="30,8 27,30 33,30" fill={color} opacity="0.5" />
      <polygon points="30,52 27,30 33,30" fill={color} opacity="0.3" />
      {/* Cardinal markers */}
      <text x="30" y="10" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" opacity="0.5">N</text>
      <text x="30" y="56" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" opacity="0.4">S</text>
      <text x="7" y="33" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" opacity="0.4">O</text>
      <text x="53" y="33" textAnchor="middle" fill={color} fontSize="6" fontWeight="bold" opacity="0.4">E</text>
    </svg>
  );
}

function DecoViolin({ size = 70, color = '#C4922E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Violin body silhouette */}
      <ellipse cx="30" cy="20" rx="10" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="30" cy="40" rx="12" ry="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Waist */}
      <path d="M20 24 Q26 30 18 36" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M40 24 Q34 30 42 36" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Neck */}
      <line x1="30" y1="12" x2="30" y2="4" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* F-holes */}
      <path d="M25 28 Q27 32 25 36" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M35 28 Q33 32 35 36" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Strings */}
      <line x1="28" y1="8" x2="28" y2="48" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="32" y1="8" x2="32" y2="48" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

function DecoPatentStamp({ size = 70, color = '#3A5280', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Outer stamp border with serrated edge */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Star in center */}
      <polygon points="30,18 32,26 40,26 34,31 36,39 30,34 24,39 26,31 20,26 28,26" fill={color} opacity="0.3" />
      {/* Text arc */}
      <text x="30" y="52" textAnchor="middle" fill={color} fontSize="5" fontWeight="bold" opacity="0.4">PATENT</text>
    </svg>
  );
}

function DecoNobelMedal({ size = 70, color = '#D4A03C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Medal circle */}
      <circle cx="30" cy="32" r="18" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="30" cy="32" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Ribbon */}
      <path d="M22 14 L30 22 L38 14" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="22" y1="6" x2="22" y2="14" stroke={color} strokeWidth="2" opacity="0.4" />
      <line x1="38" y1="6" x2="38" y2="14" stroke={color} strokeWidth="2" opacity="0.4" />
      {/* Profile silhouette inside */}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.2" />
      <text x="30" y="44" textAnchor="middle" fill={color} fontSize="5" fontWeight="bold" opacity="0.4">N</text>
    </svg>
  );
}

function DecoChalkboard({ size = 70, color = '#4A6694', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Board frame */}
      <rect x="6" y="8" width="48" height="36" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Chalk equations */}
      <text x="14" y="22" fill={color} fontSize="8" fontFamily="serif" opacity="0.4">E=mc²</text>
      <path d="M12 30 Q20 26 28 30 Q36 34 44 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <text x="14" y="38" fill={color} fontSize="5" fontFamily="serif" opacity="0.3">Gμν + Λgμν</text>
      {/* Chalk ledge */}
      <rect x="10" y="44" width="40" height="3" rx="1" fill={color} opacity="0.2" />
      {/* Chalk piece */}
      <rect x="38" y="44" width="8" height="2" rx="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoPeaceDove({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Dove body */}
      <ellipse cx="28" cy="30" rx="12" ry="8" fill={color} opacity="0.15" />
      {/* Head */}
      <circle cx="38" cy="24" r="5" fill={color} opacity="0.15" />
      {/* Wing */}
      <path d="M20 26 Q10 14 18 10 Q26 14 28 24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M22 28 Q12 18 20 14" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Tail */}
      <path d="M16 32 Q8 36 6 42" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M16 34 Q10 38 10 44" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Olive branch */}
      <path d="M42 26 Q48 28 52 26" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="50" cy="24" rx="3" ry="1.5" fill={color} opacity="0.2" transform="rotate(-20 50 24)" />
      <ellipse cx="46" cy="26" rx="2.5" ry="1.2" fill={color} opacity="0.2" transform="rotate(10 46 26)" />
      {/* Eye */}
      <circle cx="39" cy="23" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'infancia-munich': [DecoCompass, DecoViolin, DecoChalkboard],
  'estudiante-rebelde': [DecoChalkboard, DecoViolin, DecoCompass],
  'oficina-patentes': [DecoPatentStamp, DecoCompass, DecoChalkboard],
  'fama-exilio': [DecoNobelMedal, DecoPeaceDove, DecoChalkboard],
  'princeton-ultimos': [DecoChalkboard, DecoNobelMedal, DecoPatentStamp],
  'einstein-humanista': [DecoPeaceDove, DecoNobelMedal, DecoCompass],
  'legado-personal': [DecoNobelMedal, DecoChalkboard, DecoPeaceDove],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Isaacson, W. (2007). Einstein: His Life and Universe. Simon & Schuster.',
  'Fölsing, A. (1997). Albert Einstein: A Biography. Viking/Penguin.',
  'Pais, A. (1982). Subtle is the Lord: The Science and the Life of Albert Einstein. Oxford University Press.',
  'Calaprice, A. (2005). The New Quotable Einstein. Princeton University Press.',
  'Clark, R.W. (1971). Einstein: The Life and Times. World Publishing Company.',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'infancia-munich',
    title: 'Infancia en Múnich',
    color: '#2C3E6B',
    btnImage: '/assets/einstein/einstein_m5.png',
    image: '/assets/einstein/einstein_m5.png',
    content: [
      'Albert Einstein nació el 14 de marzo de 1879 en la ciudad de Ulm, situada en el sur del Reino de Wurtemberg, en lo que hoy es Alemania. Su padre, Hermann Einstein, era ingeniero eléctrico y empresario, mientras que su madre, Pauline Koch, provenía de una familia acomodada con fuerte interés en la música y la cultura. La familia era judía asquenazí, aunque no practicaba la religión de forma estricta. Solo un año después de su nacimiento, los Einstein se trasladaron a Múnich, donde Hermann y su hermano Jakob fundaron la empresa Elektrotechnische Fabrik J. Einstein & Cie, dedicada a la fabricación de equipos eléctricos basados en corriente continua.',
      'Durante sus primeros años en Múnich, el pequeño Albert mostró un desarrollo lingüístico tardío que preocupó a sus padres. No habló fluidamente hasta pasados los tres años, y tenía la costumbre de repetir frases en voz baja antes de pronunciarlas en alto, un hábito que su familia llamaba "el ensayo silencioso". Sin embargo, su capacidad de concentración era notable desde temprana edad. Podía pasar horas construyendo castillos de naipes de hasta catorce pisos de altura, una actividad que requería una paciencia y una precisión poco comunes en un niño de esa edad.',
      'El momento que Einstein siempre identificó como el inicio de su curiosidad científica ocurrió cuando tenía cinco años y estaba enfermo en cama. Su padre le trajo una brújula de bolsillo para entretenerlo. El niño quedó profundamente impactado al observar que la aguja siempre señalaba hacia el norte, sin importar cómo girara la carcasa. Algo invisible e intangible estaba actuando sobre aquella aguja metálica, guiándola a través del espacio vacío. Décadas más tarde, Einstein escribiría en sus notas autobiográficas que aquella experiencia le produjo "un estremecimiento profundo y duradero" y la certeza de que detrás de las cosas había "algo profundamente oculto".',
      'La música fue otro pilar de la infancia de Albert. Su madre Pauline, pianista competente, insistió en que comenzara a tomar lecciones de violín a los seis años. Al principio, Albert detestaba las clases mecánicas y repetitivas. Pero a los trece años descubrió las sonatas para violín de Mozart, y todo cambió. Se enamoró del instrumento y comenzó a tocar con genuina pasión. Bautizó su violín como "Lina" y lo conservó durante toda su vida. La música se convirtió en su refugio emocional y en una herramienta para pensar: cuando se atascaba con un problema de física, tomaba a Lina y tocaba hasta que las ideas se clarificaban en su mente.',
      'La educación formal de Albert en el Luitpold Gymnasium de Múnich fue una experiencia tensa. El sistema educativo prusiano de la época valoraba la memorización y la obediencia por encima del pensamiento crítico. Los profesores exigían respuestas exactas y castigaban las preguntas que se salían del programa. Para un niño que necesitaba comprender el porqué de cada regla y cada fórmula, este método resultaba restrictivo. Su profesor de griego, Joseph Degenhart, le dijo que su presencia en clase era una perturbación y que "nunca llegaría a nada". A pesar de estas fricciones con la autoridad escolar, Albert sobresalía en matemáticas y física, materias donde su tío Jakob le había enseñado álgebra presentándola como un juego detectivesco: perseguir la incógnita "X" hasta atraparla.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'A los doce años, Albert Einstein recibió un libro de geometría euclidiana que él llamó "el librito sagrado de geometría". Lo leyó completo durante un verano y demostró por su cuenta el teorema de Pitágoras usando un método original diferente al que aparecía en el libro. Su tutor de matemáticas, Max Talmud, quedó tan sorprendido que dejó de darle clases porque el estudiante ya sabía más que el profesor en esa materia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La brújula que cautivó a Einstein funciona gracias al campo magnético terrestre, generado por corrientes de convección en el núcleo externo líquido de hierro y níquel de nuestro planeta, a unos 2,900 kilómetros de profundidad. Este efecto, llamado geodínamo, produce un campo magnético dipolar cuyo polo norte magnético se desplaza aproximadamente 55 kilómetros al año y actualmente se encuentra en el Ártico canadiense, moviéndose hacia Siberia.' },
    ],
    fact: 'La casa donde nació Einstein en la Bahnhofstraße 135 de Ulm fue destruida durante un bombardeo aliado el 17 de diciembre de 1944, durante la Segunda Guerra Mundial. Hoy, en el sitio donde se encontraba la casa natal, hay un monumento conmemorativo y una placa que indica: "En esta casa nació Albert Einstein el 14 de marzo de 1879". La calle fue renombrada en su honor. Cada 14 de marzo se celebra también el Día de Pi (π = 3.14), una coincidencia matemática con su fecha de nacimiento.',
  },
  {
    id: 'estudiante-rebelde',
    title: 'El Estudiante Rebelde',
    color: '#D4A03C',
    btnImage: '/assets/einstein/einstein_m5.png',
    image: '/assets/einstein/einstein_m5.png',
    content: [
      'En 1895, a los dieciséis años, Albert Einstein abandonó el Luitpold Gymnasium de Múnich sin graduarse. La empresa eléctrica de su padre había fracasado y la familia se había mudado a Italia, primero a Milán y luego a Pavía. Albert se quedó solo en Múnich para completar sus estudios, pero la soledad y la rigidez escolar le resultaron insoportables. Tomó una decisión radical: renunció a su ciudadanía alemana para evitar el servicio militar obligatorio y se reunió con su familia en Italia. Durante meses fue un joven sin diploma, sin nacionalidad y sin un plan claro, vagabundeando por las calles de Milán y visitando museos mientras su padre se desesperaba por su futuro académico.',
      'Einstein intentó ingresar directamente a la Escuela Politécnica Federal de Zúrich (ETH Zurich), pero tenía dos años menos que la edad mínima de admisión. Le permitieron presentar el examen de ingreso como excepción. Obtuvo calificaciones sobresalientes en matemáticas y física, pero reprobó en francés, botánica y zoología. El director de la ETH, Albin Herzog, reconoció su talento científico y le recomendó terminar el bachillerato en la Escuela Cantonal de Aarau, un centro educativo que seguía los métodos pedagógicos progresistas del educador Johann Heinrich Pestalozzi, donde la experimentación y el pensamiento independiente eran valorados por encima de la memorización mecánica.',
      'En Aarau, Albert vivió con la familia del profesor Jost Winteler, quienes lo acogieron como un hijo más. Fue en esta escuela suiza donde realizó su primer "experimento mental" célebre: se preguntó qué vería si pudiera cabalgar sobre un rayo de luz. ¿El rayo se detendría? ¿Vería una onda electromagnética congelada en el espacio? Esta pregunta, aparentemente sencilla e ingenua, contenía la semilla de lo que diez años más tarde se convertiría en la Teoría de la Relatividad Especial. En 1896, con excelentes calificaciones, Einstein aprobó el examen de ingreso a la ETH y comenzó sus estudios universitarios en la sección de física y matemáticas.',
      'En la ETH Zurich, Einstein conoció a Mileva Marić, una joven serbia que era la única mujer en la clase de física, algo extraordinario en una época en que las universidades apenas admitían mujeres. Mileva era cinco años mayor que Albert, provenía de una familia serbia acomodada de Vojvodina, y había llegado a Zúrich tras estudiar en Budapest y Heidelberg. Era brillante en matemáticas y compartía con Albert una pasión desbordante por la física teórica. Entre ellos surgió una conexión intelectual y romántica que desafió las convenciones sociales de la época. Se casaron en enero de 1903 en una ceremonia civil sin la presencia de los padres de Albert, quienes se oponían al matrimonio.',
      'El estilo académico de Einstein en la ETH fue contradictorio. Faltaba sistemáticamente a las clases que consideraba aburridas y dedicaba ese tiempo a estudiar por su cuenta los trabajos de James Clerk Maxwell, Ludwig Boltzmann y Heinrich Hertz en la biblioteca. Su profesor de física, Heinrich Weber, le dijo directamente: "Eres un chico inteligente, Einstein, pero tienes un gran defecto: no dejas que nadie te enseñe nada". Albert dependía de los meticulosos apuntes de su compañero Marcel Grossmann para aprobar los exámenes. Se graduó en 1900 con calificaciones insuficientes para obtener un puesto de asistente universitario, y varios profesores se negaron a escribirle cartas de recomendación. Durante casi dos años sobrevivió dando clases particulares de matemáticas y física, hasta que Grossmann le consiguió un empleo en la Oficina de Patentes de Berna.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Einstein y Mileva Marić tuvieron una hija antes de casarse, nacida en enero de 1902 en Novi Sad, Serbia. La niña fue llamada Lieserl, pero su destino sigue siendo un misterio histórico. Las cartas entre Albert y Mileva mencionan a Lieserl varias veces, pero después de septiembre de 1903 su nombre desaparece de toda la correspondencia. Los historiadores creen que fue dada en adopción o que falleció de escarlatina siendo bebé, pero nunca se ha encontrado documentación definitiva sobre su destino.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El "experimento mental" de cabalgar un rayo de luz planteaba una contradicción con las ecuaciones de Maxwell del electromagnetismo, publicadas en 1865. Según Maxwell, las ondas electromagnéticas (incluida la luz) siempre viajan a 299,792 kilómetros por segundo en el vacío, independientemente del movimiento del observador. Si alguien viajara a la velocidad de la luz junto a un rayo, debería ver una onda estacionaria, pero las ecuaciones de Maxwell no permiten esa solución. Esta paradoja fue la base intelectual de la relatividad.' },
    ],
    fact: 'Marcel Grossmann, el compañero de clase que salvó la carrera académica de Einstein prestándole sus apuntes y consiguiéndole empleo, también fue esencial para la relatividad general. En 1912, cuando Einstein necesitaba herramientas matemáticas avanzadas para describir la curvatura del espacio-tiempo, Grossmann le introdujo la geometría diferencial de Riemann y el cálculo tensorial. Sin la amistad y los conocimientos de Grossmann, la Teoría de la Relatividad General habría tardado años más en formularse. Einstein le dedicó su artículo de 1913 como coautor.',
  },
  {
    id: 'oficina-patentes',
    title: 'La Oficina de Patentes',
    color: '#3A5280',
    btnImage: '/assets/einstein/einstein_m5.png',
    image: '/assets/einstein/einstein_m5.png',
    content: [
      'En junio de 1902, Albert Einstein comenzó a trabajar como examinador técnico de tercera clase en la Oficina Federal de la Propiedad Intelectual en Berna, Suiza. Su trabajo consistía en evaluar solicitudes de patentes, analizando si los inventos descritos eran originales, viables y estaban correctamente explicados. El salario era modesto — 3,500 francos suizos anuales — pero suficiente para vivir con dignidad. Einstein trabajaba ocho horas diarias, de lunes a sábado, en un escritorio del segundo piso de un edificio gubernamental en la Speichergasse. Su jefe, Friedrich Haller, era estricto pero justo, y valoraba la capacidad de Einstein para analizar documentos técnicos con rapidez y precisión.',
      'Lo que parecía un empleo rutinario y alejado de la ciencia resultó ser un catalizador para su genio. Einstein desarrolló la habilidad de evaluar patentes con tal velocidad que le sobraban horas de la jornada laboral. Durante ese tiempo muerto, con los documentos de patentes apilados como camuflaje sobre su escritorio, Einstein trabajaba en sus propios cálculos de física. Según sus propias palabras, la oficina de patentes fue "aquel convento secular donde incubé mis ideas más hermosas". El trabajo también le entrenó para pensar con claridad y concisión, ya que debía reducir inventos complejos a sus principios fundamentales, una disciplina mental que aplicó directamente a sus teorías.',
      'Fuera de la oficina, Einstein formó un grupo de estudio informal con dos amigos: Maurice Solovine, un estudiante rumano de filosofía, y Conrad Habicht, un matemático suizo. Se reunían regularmente en el apartamento de Einstein en la Kramgasse 49 para cenar, fumar pipas y discutir libros de física, filosofía y matemáticas. Leyeron juntos las obras de Ernst Mach, David Hume, Baruch Spinoza, Henri Poincaré y Bernhard Riemann. Con humor, bautizaron su tertulia como "La Academia Olimpia". Estas discusiones nocturnas afilaron el pensamiento crítico de Einstein y lo expusieron a ideas filosóficas que influyeron en su aproximación a la física.',
      'En 1905, mientras seguía trabajando a tiempo completo en la oficina de patentes, Einstein publicó cuatro artículos en la revista Annalen der Physik que transformaron la física. En marzo, explicó el efecto fotoeléctrico proponiendo que la luz está compuesta por cuantos de energía (fotones), trabajo por el cual recibiría el Premio Nobel en 1921. En mayo, demostró la existencia de los átomos explicando el movimiento browniano — el zigzagueo aleatorio de partículas de polen en el agua, observado por el botánico Robert Brown en 1827. En junio, publicó la Teoría de la Relatividad Especial. Y en septiembre, derivó la ecuación E=mc², estableciendo la equivalencia entre masa y energía.',
      'Los historiadores de la ciencia llaman a 1905 el "Annus Mirabilis" (año maravilloso) de Einstein, comparándolo con el año 1666 de Isaac Newton, cuando este desarrolló el cálculo, la teoría de los colores y la ley de gravitación universal mientras se refugiaba de la peste en su granja de Woolsthorpe. La diferencia es que Einstein produjo sus cuatro artículos revolucionarios mientras trabajaba a jornada completa como empleado público de nivel bajo, sin laboratorio, sin colegas académicos y sin acceso a una biblioteca universitaria. Tenía solo veintiséis años, un escritorio y una mente que no dejaba de hacer preguntas. Permaneció en la oficina de patentes hasta 1909, cuando finalmente obtuvo su primer puesto académico en la Universidad de Zúrich.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El apartamento donde vivió Einstein en Berna, en la Kramgasse 49 (segundo piso), es hoy un museo abierto al público llamado Einstein Haus. Conserva el mobiliario de época y reproducciones de los manuscritos de 1905. La Kramgasse es una calle medieval del casco antiguo de Berna, declarada Patrimonio de la Humanidad por la UNESCO en 1983. Einstein pagaba un alquiler de 55 francos mensuales por el apartamento donde redactó los artículos que cambiaron la comprensión del universo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ecuación E=mc² establece que la energía contenida en cualquier objeto es igual a su masa multiplicada por la velocidad de la luz al cuadrado (c = 299,792,458 metros por segundo). Dado que c² es un número de magnitud astronómica (aproximadamente 9 × 10^16 m²/s²), incluso una masa minúscula contiene una cantidad enorme de energía. Un kilogramo de materia convertido totalmente en energía liberaría 9 × 10^16 julios, equivalente a la energía de 21.5 megatones de TNT, es decir, unas 1,500 veces la bomba de Hiroshima.' },
    ],
    fact: 'La Academia Olimpia, aquel modesto grupo de estudio de tres amigos en Berna, tuvo una influencia profunda en la formación intelectual de Einstein. El libro "La Ciencia y la Hipótesis" de Henri Poincaré, discutido extensamente en las reuniones del grupo, contenía ideas sobre la relatividad del tiempo y el espacio que Einstein reconoció como antecedentes de su propia teoría. Einstein mantuvo correspondencia con Maurice Solovine durante más de cincuenta años, hasta su muerte en 1955, y en una carta de 1953 escribió que las veladas de la Academia Olimpia fueron "menos infantiles de lo que aquellas divertidas veladas puedan sugerir".',
  },
  {
    id: 'fama-exilio',
    title: 'Fama y Exilio',
    color: '#C4922E',
    btnImage: '/assets/einstein/einstein_m5.png',
    image: '/assets/einstein/einstein_m5.png',
    content: [
      'Después de la confirmación experimental de la relatividad general durante el eclipse solar del 29 de mayo de 1919, organizado por el astrofísico británico Arthur Eddington, Einstein se convirtió en la persona más reconocida del planeta. El periódico The Times de Londres publicó el 7 de noviembre de 1919 el titular "Revolución en la ciencia — Nueva teoría del universo — Las ideas de Newton derrocadas", y en cuestión de días el nombre de Einstein era conocido en todos los continentes. Recibía cientos de cartas diarias de admiradores, solicitudes de conferencias de universidades y gobiernos, e invitaciones de todo tipo. Su imagen de cabello despeinado y bigote se convirtió en un símbolo cultural de genialidad científica.',
      'En 1921, el Comité Nobel le otorgó el Premio Nobel de Física, pero no por la relatividad — considerada aún "demasiado teórica" — sino por su explicación del efecto fotoeléctrico de 1905. El premio incluía 121,572 coronas suecas (equivalentes a unos 32,000 dólares de la época). Einstein entregó el dinero completo a su primera esposa Mileva Marić como parte del acuerdo de divorcio alcanzado en 1919, cumpliendo una promesa que le había hecho años antes. La ceremonia de entrega del Nobel fue inusual: Einstein no asistió porque estaba de viaje por Japón, y recibió el premio de manos del embajador sueco en Berlín meses después.',
      'La década de 1920 fue un periodo de giras mundiales y de creciente inquietud política. Einstein visitó Estados Unidos en 1921, acompañando al líder sionista Chaim Weizmann para recaudar fondos para la Universidad Hebrea de Jerusalén. En 1922 viajó a Japón, donde multitudes lo recibieron con tal entusiasmo que su tren no podía avanzar por la cantidad de personas que se agolpaban en las estaciones. Mientras tanto, en Alemania, los movimientos nacionalistas y antisemitas ganaban fuerza. Físicos como Philipp Lenard y Johannes Stark, futuros partidarios del nazismo, atacaban la relatividad como "física judía" e intentaban desacreditar a Einstein en congresos científicos.',
      'El 30 de enero de 1933, Adolf Hitler fue nombrado canciller de Alemania. Einstein y su segunda esposa, Elsa Löwenthal, se encontraban de viaje en Estados Unidos cuando ocurrió el ascenso nazi al poder. Einstein declaró públicamente que no regresaría a Alemania mientras el régimen nazi permaneciera. Los nazis confiscaron sus propiedades, quemaron sus libros en hogueras públicas, revocaron su ciudadanía alemana y pusieron una recompensa de 5,000 marcos por su captura. Revistas pseudocientíficas publicaron un panfleto titulado "Cien autores contra Einstein", a lo que Einstein respondió: "Si estuviera equivocado, bastaría con un solo autor".',
      'Einstein recibió ofertas de refugio de múltiples países e instituciones. Finalmente aceptó un puesto permanente en el Instituto de Estudios Avanzados (IAS) de Princeton, Nueva Jersey, fundado en 1930 por el filántropo Louis Bamberger. El IAS ofrecía condiciones sin precedentes: salario generoso de 15,000 dólares anuales, libertad total de investigación, sin obligación de dar clases ni exámenes. Einstein llegó a Princeton en octubre de 1933 y se instaló en una modesta casa blanca de dos pisos en el número 112 de Mercer Street, que se convertiría en una de las direcciones más reconocidas del mundo académico. Nunca más regresó a Europa.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando Einstein llegó al IAS de Princeton, el director Abraham Flexner le preguntó qué salario necesitaba. Einstein pidió 3,000 dólares anuales, una cifra modesta incluso para 1933. Flexner, alarmado de que un salario tan bajo desprestigiara al instituto, insistió en pagarle 15,000 dólares (equivalentes a unos 350,000 dólares actuales). Elsa Einstein negoció el aumento final. Einstein nunca mostró interés por el dinero y a menudo utilizaba los cheques como marcapáginas sin cobrarlos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El eclipse de 1919 midió la desviación de la luz estelar al pasar cerca del Sol. Einstein predijo una desviación de 1.75 segundos de arco (la mitad de la predicción newtoniana era 0.87 segundos). Las mediciones de Eddington en la isla de Príncipe dieron 1.61 ± 0.30 segundos de arco, y las de Sobral (Brasil) dieron 1.98 ± 0.12 segundos de arco, ambas consistentes con la predicción relativista. Mediciones modernas con radiotelescopios han confirmado el valor de Einstein con una precisión superior al 0.01%.' },
    ],
    fact: 'El violín que Einstein llamaba "Lina" lo acompañó toda su vida, incluido su exilio a Princeton. Tocaba regularmente música de cámara con amigos y colegas. En 1934, dio un concierto benéfico de violín en el hotel Waldorf-Astoria de Nueva York para ayudar a científicos refugiados de la Alemania nazi. Las entradas se agotaron en horas. Años después, un violín que perteneció a Einstein fue subastado en la casa Bonhams de Nueva York en 2018 por 516,500 dólares, convirtiéndose en uno de los violines más costosos vendidos en subasta pública por su valor histórico.',
  },
  {
    id: 'princeton-ultimos',
    title: 'Princeton: Los Últimos Años',
    color: '#4A6694',
    btnImage: '/assets/einstein/einstein_m5.png',
    image: '/assets/einstein/einstein_m5.png',
    content: [
      'En Princeton, Einstein se convirtió rápidamente en una figura querida y excéntrica del pueblo. Los vecinos lo veían caminar cada día desde su casa en Mercer Street hasta el Instituto de Estudios Avanzados con su cabello canoso despeinado, una vieja chaqueta de cuero, pantalones holgados y sin calcetines — odiaba usarlos porque le hacían agujeros en los dedos del pie. Los niños del vecindario lo visitaban para pedirle ayuda con sus tareas de matemáticas, y Einstein los recibía con gusto. Una niña de ocho años le preguntó una vez si era cierto que era la persona más inteligente del mundo. Einstein respondió: "No lo sé, pero hago buenas preguntas". Su secretaria, Helen Dukas, gestionaba la avalancha diaria de correspondencia.',
      'El gran proyecto científico de los años en Princeton fue la búsqueda de una Teoría del Campo Unificado que combinara la gravedad (descrita por la relatividad general) con el electromagnetismo (descrito por las ecuaciones de Maxwell) en un solo marco matemático. Einstein dedicó más de treinta años a este objetivo, publicando múltiples intentos que ninguno resultó satisfactorio. La comunidad física había avanzado hacia la mecánica cuántica, una teoría que Einstein ayudó a fundar pero cuyas implicaciones probabilísticas rechazaba profundamente. Su célebre frase "Dios no juega a los dados" reflejaba su convicción de que el universo debía tener reglas deterministas subyacentes.',
      'Una de las amistades más singulares de la historia intelectual surgió en Princeton: la relación entre Einstein y el lógico matemático Kurt Gödel, un refugiado austriaco que llegó al IAS en 1940. Gödel, famoso por sus teoremas de incompletitud que demostraron los límites fundamentales de las matemáticas, era un hombre brillante pero atormentado por la paranoia y la hipocondría. Einstein y Gödel caminaban juntos cada día desde el instituto hasta Mercer Street, conversando en alemán durante horas. Einstein confesó que en sus últimos años iba al instituto "solo para tener el privilegio de caminar a casa con Gödel".',
      'Gödel contribuyó una solución matemática sorprendente a las ecuaciones de la relatividad general: el "universo de Gödel" (1949), un modelo cosmológico que permitía teóricamente las curvas temporales cerradas, es decir, viajes en el tiempo. Einstein recibió este resultado con una mezcla de admiración intelectual e incomodidad filosófica, ya que planteaba que sus propias ecuaciones permitían algo que él consideraba físicamente absurdo. Más allá de la ciencia, la amistad entre ambos hombres era profundamente humana: Einstein cuidaba del frágil Gödel, lo animaba a comer cuando su paranoia le hacía temer el envenenamiento, y lo ayudó con los trámites de su ciudadanía estadounidense en 1947.',
      'Los años en Princeton también estuvieron marcados por pérdidas personales. Su segunda esposa Elsa falleció en diciembre de 1936 tras una larga enfermedad renal y cardíaca. Einstein escribió a su amigo Max Born: "Me he instalado espléndidamente. Me he convertido en una especie de viejo fósil al que la vida principalmente le pasa de largo". Vivió sus últimos años con su hijastra Margot y su secretaria Helen Dukas en la casa de Mercer Street, rodeado de libros, pipas y papeles con ecuaciones. A pesar de su fama mundial, sus días eran deliberadamente sencillos: trabajar, caminar con Gödel, tocar el violín, leer y escribir cartas a viejos amigos esparcidos por el mundo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando Kurt Gödel se preparaba para su examen de ciudadanía estadounidense en 1947, estudió la Constitución de los Estados Unidos con tal rigor lógico que descubrió lo que él consideraba una contradicción que permitiría que Estados Unidos se convirtiera legalmente en una dictadura. Einstein y el economista Oskar Morgenstern lo llevaron al examen y le rogaron que no mencionara su descubrimiento ante el juez. Gödel casi lo hizo, pero Einstein logró cambiar el tema a tiempo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Teoría del Campo Unificado que Einstein persiguió durante décadas buscaba combinar la gravedad y el electromagnetismo en una sola estructura matemática. Aunque Einstein no logró este objetivo, su intuición resultó profética. En la década de 1960, los físicos Sheldon Glashow, Abdus Salam y Steven Weinberg unificaron con éxito el electromagnetismo y la fuerza nuclear débil en la "teoría electrodébil", recibiendo el Nobel en 1979. La unificación completa sigue siendo uno de los problemas abiertos más grandes de la física actual.' },
    ],
    fact: 'La casa de Einstein en el 112 de Mercer Street, Princeton, sigue siendo una residencia privada y no está abierta al público. Después de la muerte de Einstein, Helen Dukas y Margot Einstein continuaron viviendo allí hasta sus respectivos fallecimientos. La propiedad fue designada como Hito Histórico Nacional de Estados Unidos en 1976. Aunque no se puede visitar, los turistas se detienen regularmente frente a la modesta casa blanca para fotografiarla, y es una de las paradas informales más populares del recorrido histórico de Princeton, junto con el campus de la universidad fundada en 1746.',
  },
  {
    id: 'einstein-humanista',
    title: 'Einstein Humanista',
    color: '#B88420',
    btnImage: '/assets/einstein/einstein_m5.png',
    image: '/assets/einstein/einstein_m5.png',
    content: [
      'Einstein fue un pacifista convencido durante la mayor parte de su vida. Durante la Primera Guerra Mundial (1914-1918), mientras vivía en Berlín, fue uno de los pocos intelectuales alemanes que se negaron a firmar el "Manifiesto de los 93", un documento en el que prominentes académicos alemanes apoyaban la guerra y las acciones militares de su país. En su lugar, Einstein firmó el contra-manifiesto pacifista de Georg Friedrich Nicolai, titulado "Llamamiento a los europeos", que pedía la cooperación internacional y el fin de las hostilidades. Solo cuatro personas firmaron el documento de Nicolai; Einstein fue una de ellas.',
      'El momento más angustiante de su vida como humanista ocurrió el 2 de agosto de 1939, cuando firmó una carta dirigida al presidente Franklin D. Roosevelt. La carta, redactada principalmente por el físico húngaro Leo Szilard, advertía que científicos alemanes habían logrado la fisión del uranio y que era posible que la Alemania nazi desarrollara una bomba atómica. La carta recomendaba que Estados Unidos iniciara su propio programa de investigación nuclear. Este documento fue uno de los catalizadores del Proyecto Manhattan. Sin embargo, Einstein NO participó en la construcción de la bomba; el ejército lo consideró un riesgo de seguridad por sus opiniones políticas progresistas.',
      'Cuando las bombas atómicas fueron lanzadas sobre Hiroshima el 6 de agosto de 1945 y sobre Nagasaki tres días después, matando a más de 200,000 personas, Einstein quedó profundamente conmocionado. Declaró en una entrevista con la revista Newsweek: "Si hubiera sabido que los alemanes no lograrían desarrollar una bomba atómica, no habría levantado un dedo". El remordimiento por haber firmado la carta a Roosevelt lo acompañó el resto de su vida. Se convirtió en uno de los más vocales defensores del desarme nuclear y del control internacional de las armas atómicas, declarando: "No sé con qué armas se luchará la Tercera Guerra Mundial, pero la Cuarta se luchará con palos y piedras".',
      'Einstein fue también un defensor activo de los derechos civiles en Estados Unidos. Se opuso públicamente a la segregación racial en una época en que hacerlo conllevaba riesgos significativos. Fue amigo del activista afroamericano Paul Robeson y del intelectual W.E.B. Du Bois. Cuando la cantante Marian Anderson, una contralto afroamericana de renombre internacional, fue rechazada de un hotel en Princeton por el color de su piel, Einstein la invitó a hospedarse en su propia casa de Mercer Street. En 1946, en un discurso en la Universidad Lincoln — una institución históricamente negra en Pensilvania —, Einstein calificó el racismo como "una enfermedad de la gente blanca" y lo llamó el mayor problema social de Estados Unidos.',
      'El último acto público significativo de Einstein ocurrió el 11 de abril de 1955, apenas una semana antes de su muerte. Firmó el Manifiesto Russell-Einstein, redactado junto con el filósofo y matemático británico Bertrand Russell. Este documento, cofirmado por once científicos e intelectuales destacados — entre ellos los premios Nobel Max Born, Linus Pauling y Hideki Yukawa —, hacía un llamado urgente a los líderes mundiales para resolver sus disputas pacíficamente y abandonar las armas nucleares. El manifiesto advertía que "la raza humana se enfrenta a un peligro de exterminio" y condujo a la creación de las Conferencias Pugwash sobre Ciencia y Asuntos Mundiales, galardonadas con el Premio Nobel de la Paz en 1995.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El FBI, bajo la dirección de J. Edgar Hoover, mantuvo un archivo de vigilancia sobre Einstein de 1,427 páginas. Los agentes monitorizaban su correspondencia, sus llamadas telefónicas y sus asociaciones políticas. Hoover intentó en varias ocasiones que Einstein fuera deportado de Estados Unidos, acusándolo de simpatías comunistas. El archivo fue desclasificado parcialmente tras la Ley de Libertad de Información y revela la profundidad de la vigilancia gubernamental sobre un ciudadano que simplemente defendía la paz y los derechos civiles.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ecuación E=mc² no fue concebida para crear armas, sino para explicar una propiedad fundamental de la naturaleza. La fisión nuclear — el proceso que libera energía en una bomba atómica — convierte aproximadamente un 0.1% de la masa del uranio-235 en energía. La bomba de Hiroshima ("Little Boy") contenía 64 kilogramos de uranio-235, pero solo 0.7 gramos de materia se convirtieron en la energía equivalente a 15,000 toneladas de TNT. Esos 0.7 gramos destruyeron una ciudad entera, demostrando el poder de la equivalencia masa-energía.' },
    ],
    fact: 'En 1952, tras la muerte del presidente Chaim Weizmann, el gobierno de Israel ofreció a Einstein la presidencia del Estado de Israel. Einstein declinó respetuosamente, explicando en una carta al embajador israelí Abba Eban: "Toda mi vida he tratado con cosas objetivas. Por lo tanto, carezco de la aptitud natural y de la experiencia para tratar con personas y desempeñar funciones oficiales". Tenía 73 años y consideraba que no tenía las habilidades diplomáticas necesarias para un cargo político. Esta oferta convirtió a Einstein en la única persona a quien se le ha ofrecido la presidencia de un país moderno basándose exclusivamente en su reputación intelectual.',
  },
  {
    id: 'legado-personal',
    title: 'El Legado Personal',
    color: '#1E2D52',
    btnImage: '/assets/einstein/einstein_m5.png',
    image: '/assets/einstein/einstein_m5.png',
    content: [
      'Albert Einstein murió el 18 de abril de 1955 en el Hospital de Princeton, a los 76 años de edad, debido a la ruptura de un aneurisma de la aorta abdominal. Los médicos le ofrecieron cirugía para intentar reparar la aorta, pero Einstein la rechazó con serenidad: "Quiero irme cuando quiera. Es de mal gusto prolongar la vida artificialmente. He hecho mi parte, es hora de irme. Lo haré con elegancia". En su mesa de noche del hospital se encontraron sus últimas notas: cálculos matemáticos para la teoría del campo unificado, el sueño incompleto de unir todas las fuerzas de la naturaleza en una sola ecuación. También había un borrador de un discurso sobre el séptimo aniversario de la independencia de Israel, que nunca llegó a pronunciar.',
      'Después de su muerte ocurrió algo controvertido: el patólogo Thomas Stoltz Harvey, encargado de realizar la autopsia en el Hospital de Princeton, extrajo el cerebro de Einstein sin obtener el permiso explícito de la familia. Harvey conservó el cerebro en formaldehído, lo fotografió desde múltiples ángulos y lo cortó en 240 bloques que montó en portaobjetos de microscopio. Distribuyó muestras a investigadores durante las siguientes décadas. Estudios publicados en la revista The Lancet en 1999 por Sandra Witelson encontraron que el lóbulo parietal inferior de Einstein — una región asociada con el razonamiento matemático y la percepción espacial — era un 15% más ancho que el promedio.',
      'La fotografía más reconocida de Einstein — sacando la lengua con expresión juguetona — fue tomada el 14 de marzo de 1951, el día de su 72 cumpleaños, por el fotógrafo Arthur Sasse de la agencia United Press International. Einstein salía de un evento en el Club de Princeton cuando Sasse le pidió que posara con una sonrisa. Cansado de sonreír para las cámaras durante todo el día, Einstein sacó la lengua en un gesto espontáneo de rebeldía. La imagen se convirtió en un símbolo global de la genialidad irreverente. Einstein mismo adoraba la foto: pidió nueve copias recortadas de la imagen y las envió a amigos con notas humorísticas.',
      'Las frases de Einstein se han integrado en la cultura popular como pocas otras citas en la historia. "La imaginación es más importante que el conocimiento" refleja su método de los experimentos mentales. "La definición de locura es hacer lo mismo una y otra vez esperando resultados diferentes" — aunque frecuentemente atribuida a Einstein, no hay evidencia de que la haya dicho. Sin embargo, frases verificadas como "Lo que realmente me interesa es si Dios tenía alguna opción al crear el mundo" revelan su búsqueda de principios fundamentales e ineludibles. Alice Calaprice documentó y verificó más de 1,600 citas en su libro "The New Quotable Einstein" (Princeton University Press, 2005), separando las auténticas de las falsamente atribuidas.',
      'El legado científico de Einstein permanece vivo en la tecnología y la investigación del siglo XXI. Los satélites GPS corrigen la dilatación temporal predicha por la relatividad especial y general para mantener una precisión de navegación de 3 metros. Los detectores LIGO confirmaron en septiembre de 2015 la existencia de ondas gravitacionales, predichas por Einstein en 1916, detectando la fusión de dos agujeros negros a 1,300 millones de años-luz de la Tierra. El Event Horizon Telescope capturó en abril de 2019 la primera imagen directa de un agujero negro en la galaxia M87, confirmando las predicciones de sombra gravitacional derivadas de la relatividad general. La constante cosmológica que Einstein llamó su "mayor error" resultó necesaria para explicar la expansión acelerada del universo, descubierta en 1998 por Saul Perlmutter, Brian Schmidt y Adam Riess.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cerebro de Einstein tuvo un viaje extraordinario después de ser extraído. Thomas Harvey lo guardó durante décadas en frascos dentro de una caja de sidra en su consultorio, y más tarde en el maletero de su automóvil. En 1997, el periodista Michael Paterniti acompañó a Harvey en un viaje por carretera a través de Estados Unidos con el cerebro en el asiento trasero del auto, experiencia que narró en el libro "Driving Mr. Albert" (2000). Las porciones restantes del cerebro fueron finalmente devueltas al Hospital de Princeton en 1998 y al Museo Nacional de Salud y Medicina en 2010.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ondas gravitacionales detectadas por LIGO el 14 de septiembre de 2015 (evento GW150914) fueron producidas por la fusión de dos agujeros negros de 36 y 29 masas solares a 1,300 millones de años-luz de distancia. La colisión liberó más energía que toda la luz emitida por todas las estrellas del universo observable en ese mismo instante. Sin embargo, cuando las ondas llegaron a la Tierra, la distorsión del espacio que midieron los detectores LIGO fue de apenas 10^-21 metros, equivalente a una milésima parte del diámetro de un protón. Einstein predijo estas ondas en 1916 pero creía que serían demasiado débiles para detectarse.' },
    ],
    fact: 'El cuerpo de Einstein fue cremado el mismo día de su muerte, el 18 de abril de 1955, en el crematorio de Ewing, Nueva Jersey, y sus cenizas fueron esparcidas en un lugar no revelado, siguiendo su deseo expreso de que no se creara ningún santuario ni lugar de peregrinación en su honor. Einstein quería que la gente recordara sus ideas, no su persona física. A pesar de este deseo, su imagen se ha convertido en el símbolo universal de la inteligencia humana, reproducida en camisetas, pósters, sellos postales y hasta en un emoji. La revista Time lo nombró "Persona del Siglo XX" en su edición del 31 de diciembre de 1999.',
  },
];

// ——— Warm Particle Field (Canvas Background) ——————————————————————————
function WarmParticleField() {
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
      hue: Math.random() > 0.5 ? '212,163,60' : '60,80,140', // warm amber or deep navy
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

// ——— Einstein Life Header ——————————————————————————————————————————————
function EinsteinHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,160,60,0.3))' }}>
        {/* Life arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#einsteinGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 life markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#2C3E6B','#D4A03C','#3A5280','#C4922E','#4A6694','#B88420','#1E2D52'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central compass icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#D4A03C" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#D4A03C" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="18" stroke="#D4A03C" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="310" y2="26" stroke="#D4A03C" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="einsteinGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,160,60,0.2)" />
            <stop offset="50%" stopColor="rgba(212,160,60,0.9)" />
            <stop offset="100%" stopColor="rgba(212,160,60,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A03C" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EINSTEIN: LA PERSONA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,160,60,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA VIDA DETRÁS DEL GENIO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ————————————————————————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,160,60,0.2)'}`,
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
          layoutId="activeDotEinsteinM5"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————
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

// ——— Progress Bar ————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,160,60,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A03C', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #2C3E6B, #D4A03C)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,160,60,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A03C', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————
export default function InteractiveInfographic_EinsteinM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/einstein/einstein_m5_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,160,60,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <WarmParticleField />

      <EinsteinHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,160,60,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,160,60,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,160,60,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A03C', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has conocido la vida completa de Albert Einstein!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Verificador de Estrellas
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
