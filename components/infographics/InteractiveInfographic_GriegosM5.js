'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Greek Philosophy themed) ————————————————————
function DecoColumn({ size = 70, color = '#2E6B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ionic column */}
      <rect x="22" y="12" width="16" height="36" fill="none" stroke={color} strokeWidth="1.5" rx="1" />
      {/* Capital volutes */}
      <path d="M18 12 Q15 8 18 5 Q22 2 26 5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <path d="M42 12 Q45 8 42 5 Q38 2 34 5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Base */}
      <rect x="18" y="48" width="24" height="4" fill={color} opacity="0.3" rx="1" />
      <rect x="16" y="52" width="28" height="3" fill={color} opacity="0.25" rx="1" />
      {/* Fluting lines */}
      <line x1="26" y1="14" x2="26" y2="46" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="30" y1="14" x2="30" y2="46" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="34" y1="14" x2="34" y2="46" stroke={color} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

function DecoScroll({ size = 70, color = '#D4C9B8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Papyrus scroll */}
      <rect x="12" y="15" width="36" height="30" fill="none" stroke={color} strokeWidth="1.5" rx="2" />
      {/* Roll ends */}
      <ellipse cx="12" cy="30" rx="4" ry="15" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="48" cy="30" rx="4" ry="15" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Text lines */}
      <line x1="18" y1="22" x2="42" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="27" x2="38" y2="27" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="32" x2="40" y2="32" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="37" x2="36" y2="37" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoLaurel({ size = 80, color = '#3A7FA0', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Left branch */}
      <path d="M38 44 Q20 35 12 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {[0, 8, 16, 24].map((d, i) => (
        <ellipse key={`l${i}`} cx={35 - d * 0.9} cy={40 - d} rx="5" ry="3" fill={color} opacity="0.25"
          transform={`rotate(${-30 - i * 8} ${35 - d * 0.9} ${40 - d})`} />
      ))}
      {/* Right branch */}
      <path d="M42 44 Q60 35 68 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {[0, 8, 16, 24].map((d, i) => (
        <ellipse key={`r${i}`} cx={45 + d * 0.9} cy={40 - d} rx="5" ry="3" fill={color} opacity="0.25"
          transform={`rotate(${30 + i * 8} ${45 + d * 0.9} ${40 - d})`} />
      ))}
    </svg>
  );
}

function DecoSyllogism({ size = 60, color = '#C0B09C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Three overlapping circles representing syllogistic logic */}
      <circle cx="24" cy="22" r="14" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="36" cy="22" r="14" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="34" r="14" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Center point */}
      <circle cx="30" cy="26" r="2" fill={color} opacity="0.5" />
      {/* Labels */}
      <text x="20" y="16" fill={color} fontSize="6" opacity="0.4" fontFamily="serif">A</text>
      <text x="38" y="16" fill={color} fontSize="6" opacity="0.4" fontFamily="serif">B</text>
      <text x="30" y="44" fill={color} fontSize="6" opacity="0.4" fontFamily="serif" textAnchor="middle">C</text>
    </svg>
  );
}

function DecoOwl({ size = 70, color = '#1E5B7A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Owl of Athena - wisdom symbol */}
      {/* Body */}
      <ellipse cx="30" cy="35" rx="14" ry="16" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="24" cy="28" r="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="36" cy="28" r="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="24" cy="28" r="2" fill={color} opacity="0.4" />
      <circle cx="36" cy="28" r="2" fill={color} opacity="0.4" />
      {/* Beak */}
      <path d="M28 32 L30 36 L32 32" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Ear tufts */}
      <path d="M20 20 L22 24" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
      <path d="M40 20 L38 24" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
      {/* Feet */}
      <path d="M24 50 L22 54 M24 50 L24 54 M24 50 L26 54" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M36 50 L34 54 M36 50 L36 54 M36 50 L38 54" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoMeander({ size = 80, color = '#E8E0D4', style = {} }) {
  return (
    <svg width={size} height={size * 0.35} viewBox="0 0 80 28" style={{ opacity: 0.2, ...style }}>
      {/* Greek key / meander pattern */}
      <path d="M4 14 L4 4 L14 4 L14 14 L8 14 L8 8 L10 8 L10 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M20 14 L20 4 L30 4 L30 14 L24 14 L24 8 L26 8 L26 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M36 14 L36 4 L46 4 L46 14 L40 14 L40 8 L42 8 L42 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M52 14 L52 4 L62 4 L62 14 L56 14 L56 8 L58 8 L58 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Bottom line */}
      <line x1="2" y1="24" x2="78" y2="24" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'discipulo-platon': [DecoColumn, DecoScroll, DecoLaurel],
  'el-liceo': [DecoColumn, DecoMeander, DecoOwl],
  'logica-silogismos': [DecoSyllogism, DecoScroll, DecoMeander],
  'filosofia-natural': [DecoOwl, DecoLaurel, DecoSyllogism],
  'tutor-alejandro': [DecoLaurel, DecoColumn, DecoScroll],
  'etica-politica': [DecoMeander, DecoSyllogism, DecoOwl],
  'legado-aristotelico': [DecoScroll, DecoColumn, DecoLaurel],
};

// ——— Content Data ————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Barnes, J. (Ed.) (1995). The Cambridge Companion to Aristotle, Cambridge University Press',
  'Shields, C. (2007). Aristotle, Routledge Philosophers Series, Routledge',
  'Ackrill, J.L. (1981). Aristotle the Philosopher, Oxford University Press',
  'Ross, W.D. (1995). Aristotle (6th ed.), Routledge',
  'Jaeger, W. (1948). Aristoteles: Bases para la historia de su desarrollo intelectual, Fondo de Cultura Económica',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'discipulo-platon',
    title: 'El Discípulo de Platón',
    color: '#E8E0D4',
    btnImage: '/assets/los_griegos/infographic_m5/btn_discipulo-platon.jpg',
    image: '/assets/los_griegos/infographic_m5/hero_discipulo-platon.jpg',
    content: [
      'Aristóteles nació en el año 384 a.C. en Estagira, una pequeña ciudad costera de la península Calcídica, en el norte de Grecia. Su padre, Nicómaco, era médico personal del rey Amintas III de Macedonia, abuelo de Alejandro Magno. Esta conexión con la corte macedónica marcaría profundamente la vida del futuro filósofo. La profesión médica de Nicómaco también influyó en el joven Aristóteles, quien desarrolló desde temprana edad un interés particular por la observación directa de la naturaleza y la clasificación sistemática de los fenómenos biológicos que lo rodearían durante toda su vida.',
      'A los diecisiete años, en el 367 a.C., Aristóteles viajó a Atenas para ingresar en la Academia de Platón, la institución de enseñanza filosófica más prestigiosa del mundo griego. Permaneció allí durante veinte años, primero como estudiante y después como investigador y profesor asociado. Platón reconoció pronto la capacidad intelectual de su alumno y lo llamó "la inteligencia de la Academia" y "el lector", por su dedicación al estudio de manuscritos y textos filosóficos que lo diferenciaba de los demás discípulos.',
      'Durante sus años en la Academia, Aristóteles absorbió la filosofía platónica pero comenzó a desarrollar sus propias ideas de manera gradual. Platón enseñaba que la realidad verdadera residía en las Formas o Ideas eternas, entidades abstractas separadas del mundo material. Aristóteles, en cambio, empezó a argumentar que las formas no existen separadas de los objetos particulares: la "rojez" no existe independientemente de las cosas rojas. Esta divergencia filosófica, aunque respetuosa, marcaría una de las divisiones más significativas en la historia del pensamiento occidental.',
      'Cuando Platón murió en el 347 a.C., la dirección de la Academia pasó a su sobrino Espeusipo, no a Aristóteles. Algunos historiadores sugieren que Aristóteles abandonó Atenas por esta decepción; otros señalan que el clima político anti-macedónico en la ciudad hacía peligrosa su permanencia. Aristóteles se trasladó primero a Aso, en Asia Menor, donde el gobernante Hermias le ofreció protección. Allí contrajo matrimonio con Pitias, sobrina de Hermias, y continuó sus investigaciones filosóficas y biológicas durante tres años productivos.',
      'Los años posteriores a la Academia fueron decisivos para la maduración intelectual de Aristóteles. En Aso y posteriormente en Mitilene, en la isla de Lesbos, realizó estudios detallados de biología marina junto a su discípulo Teofrasto, recopilando observaciones sobre más de 500 especies animales. Estos trabajos de campo representan el primer intento sistemático en la historia occidental de clasificar los seres vivos mediante la observación directa, un método que anticiparía los procedimientos de la ciencia moderna por más de dos mil años.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El nombre "Aristóteles" significa "el mejor propósito" en griego antiguo, derivado de "aristos" (mejor) y "telos" (fin, propósito). Curiosamente, el concepto de "telos" o finalidad se convertiría en una de las ideas centrales de su filosofía. Para Aristóteles, todo en la naturaleza tiene un propósito inherente: la bellota tiene como telos convertirse en roble, y el ser humano tiene como telos alcanzar la felicidad plena a través de la virtud y la razón.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Aristóteles describió con precisión el sistema digestivo de los rumiantes, la placenta de los tiburones y el proceso de desarrollo embrionario del pollo dentro del huevo, abriendo la cáscara en distintos días para observar cada etapa. Sus descripciones de la anatomía del pulpo fueron tan detalladas que los biólogos marinos del siglo XIX confirmaron su exactitud. Identificó correctamente que los delfines son mamíferos, no peces, una clasificación que la ciencia occidental tardaría más de mil años en redescubrir.' },
    ],
    fact: 'Aristóteles fue el primer naturalista conocido que registró que los delfines respiran aire, amamantan a sus crías y, por lo tanto, son mamíferos y no peces. Documentó esta observación en su obra "Historia de los Animales" alrededor del 340 a.C. La comunidad científica europea no aceptó esta clasificación de forma generalizada hasta el trabajo del naturalista sueco Carlos Linneo en 1758, más de dos mil años después de la observación original de Aristóteles.',
  },
  {
    id: 'el-liceo',
    title: 'El Liceo',
    color: '#2E6B8A',
    btnImage: '/assets/los_griegos/infographic_m5/btn_el-liceo.jpg',
    image: '/assets/los_griegos/infographic_m5/hero_el-liceo.jpg',
    content: [
      'En el año 335 a.C., Aristóteles regresó a Atenas y fundó su propia escuela filosófica en un gimnasio público dedicado a Apolo Licio, situado al este de la ciudad. El lugar contaba con jardines arbolados, pórticos cubiertos y un amplio patio, y recibió el nombre de Liceo (Lykeion en griego). A diferencia de la Academia de Platón, que se centraba en las matemáticas y la filosofía abstracta, el Liceo tenía una orientación más empírica, dedicada tanto a la filosofía teórica como a la investigación natural y la recopilación enciclopédica de conocimientos de todas las disciplinas.',
      'Aristóteles tenía la costumbre de impartir sus lecciones mientras caminaba por los senderos cubiertos del Liceo, los llamados "peripatoi". Por esta razón, sus discípulos y su escuela recibieron el nombre de "peripatéticos", es decir, "los que caminan". Esta práctica no era un mero capricho: Aristóteles consideraba que el movimiento físico estimulaba la actividad mental, una intuición que la neurociencia moderna ha confirmado al demostrar que la caminata incrementa el flujo sanguíneo al cerebro y mejora las funciones cognitivas relacionadas con el pensamiento creativo.',
      'El Liceo funcionaba con una estructura diaria organizada. Por las mañanas, Aristóteles impartía clases avanzadas (las llamadas "acroamáticas") a un círculo reducido de estudiantes dedicados a la investigación. Por las tardes, daba conferencias públicas (llamadas "exotéricas") abiertas a un público más amplio sobre retórica, política y ética. Esta división entre enseñanza especializada y divulgación general anticipó la estructura de las universidades modernas, con sus programas de posgrado para investigadores y cursos abiertos para la comunidad general.',
      'Una de las contribuciones más significativas del Liceo fue la creación de la primera biblioteca institucional documentada del mundo griego. Aristóteles reunió una colección de manuscritos, mapas y especímenes naturales que servían como herramientas de investigación para los miembros de la escuela. Según el geógrafo Estrabón, fue Aristóteles quien enseñó a los reyes de Egipto la práctica de organizar colecciones bibliográficas, inspirando indirectamente la fundación de la Biblioteca de Alejandría por Ptolomeo I, alumno indirecto de su tradición intelectual.',
      'El Liceo sobrevivió como institución activa durante casi 250 años después de la muerte de Aristóteles. Su primer sucesor fue Teofrasto, quien amplió las investigaciones botánicas y escribió la "Historia de las Plantas", obra que clasificó más de 500 especies vegetales. Otros directores notables incluyeron a Estratón de Lámpsaco, quien se especializó en física experimental. En 2014, arqueólogos griegos descubrieron los restos del Liceo original en el centro de Atenas, debajo de un parque moderno, confirmando las descripciones de las fuentes antiguas sobre su ubicación y estructura arquitectónica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La palabra "liceo" se convirtió en sinónimo de escuela de enseñanza secundaria en varios idiomas europeos: "lycée" en francés, "liceo" en italiano y español. En Francia, Napoleón Bonaparte creó en 1802 el sistema de lycées como centros de educación pública avanzada, eligiendo el nombre deliberadamente en honor a la escuela de Aristóteles. Hoy existen más de 2.600 lycées en Francia, todos herederos nominales de aquella escuela ateniense fundada hace 2.360 años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ruinas del Liceo descubiertas en 2014 se encontraron a 1,5 metros bajo el nivel de la calle moderna, en el barrio de Rizari, cerca del Jardín Nacional de Atenas. Los arqueólogos identificaron los restos de una palestra (zona de ejercicio), un patio rectangular y canales de drenaje que coinciden con las descripciones del geógrafo romano Pausanias, escritas en el siglo II d.C. El sitio está ahora abierto al público como parque arqueológico, a solo 700 metros del Parlamento griego.' },
    ],
    fact: 'El Liceo de Aristóteles operó un programa de investigación colaborativa que produjo las primeras constituciones comparadas de la historia. Aristóteles y sus estudiantes recopilaron y analizaron las constituciones de 158 ciudades-estado griegas, examinando sus formas de gobierno, leyes y estructuras sociales. De este trabajo monumental solo sobrevive la "Constitución de Atenas", descubierta en un papiro egipcio en 1879 por un equipo del Museo Británico, más de dos mil años después de su redacción original.',
  },
  {
    id: 'logica-silogismos',
    title: 'Lógica y Silogismos',
    color: '#D4C9B8',
    btnImage: '/assets/los_griegos/infographic_m5/btn_logica-silogismos.jpg',
    image: '/assets/los_griegos/infographic_m5/hero_logica-silogismos.jpg',
    content: [
      'Aristóteles es reconocido como el fundador de la lógica formal, la disciplina que estudia las reglas del razonamiento válido. Antes de él, los filósofos griegos argumentaban y debatían, pero nadie había sistematizado las reglas que determinan cuándo un argumento es correcto desde el punto de vista de su estructura. Su obra lógica, recopilada posteriormente bajo el título "Organon" (que significa "instrumento" en griego), comprende seis tratados que abarcan desde las categorías fundamentales del pensamiento hasta las técnicas de refutación de argumentos falsos y engañosos.',
      'El silogismo, la contribución más conocida de Aristóteles a la lógica, es una forma de razonamiento deductivo que parte de dos premisas para llegar a una conclusión necesaria. El ejemplo clásico dice: "Todos los seres humanos son mortales" (premisa mayor); "Sócrates es un ser humano" (premisa menor); por lo tanto, "Sócrates es mortal" (conclusión). Aristóteles identificó 256 formas posibles de silogismos y demostró que solo 24 de ellas producen conclusiones válidas, un análisis que permanece correcto según la lógica moderna.',
      'En su tratado "Categorías", Aristóteles clasificó todo aquello que puede decirse sobre algo en diez categorías fundamentales: sustancia, cantidad, cualidad, relación, lugar, tiempo, posición, posesión, acción y pasión. Este sistema de clasificación representó el primer intento riguroso de organizar el lenguaje y el pensamiento de forma estructurada. Cuando decimos "Sócrates es un filósofo griego alto que enseña en Atenas", estamos usando varias de estas categorías: sustancia (Sócrates), cualidad (filósofo), relación (griego), cantidad (alto), acción (enseña) y lugar (Atenas).',
      'El "Organon" también incluye el tratado "Sobre la Interpretación", donde Aristóteles analizó las proposiciones lógicas y formuló el principio de no contradicción: una proposición no puede ser verdadera y falsa al mismo tiempo y en el mismo sentido. Este principio sigue siendo considerado una de las leyes fundamentales del pensamiento racional. Además, en los "Analíticos Posteriores", estableció las bases de la demostración científica, argumentando que el conocimiento genuino requiere no solo saber que algo es cierto, sino comprender por qué es cierto, mediante cadenas de razonamiento deductivo.',
      'La lógica aristotélica dominó el pensamiento occidental durante más de dos milenios, hasta que en el siglo XIX los matemáticos George Boole y Gottlob Frege desarrollaron la lógica simbólica moderna. Sin embargo, la lógica de Frege y Boole no reemplazó a la de Aristóteles; la extendió. Los circuitos digitales de las computadoras modernas operan con álgebra booleana, que utiliza operaciones lógicas (AND, OR, NOT) directamente derivadas de los principios que Aristóteles formuló en el siglo IV a.C. Cada vez que un procesador ejecuta una instrucción, está aplicando reglas cuya estructura conceptual se remonta al Liceo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El filósofo alemán Immanuel Kant escribió en 1787 que la lógica de Aristóteles estaba tan perfeccionada que "desde Aristóteles no ha tenido que dar un solo paso hacia atrás" y que "tampoco ha podido dar un solo paso hacia adelante". Esta evaluación, aunque exagerada a la luz de la lógica moderna, refleja el dominio absoluto que el sistema aristotélico ejerció durante 2.200 años sobre el razonamiento formal en toda la tradición intelectual europea y del mundo islámico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La lógica de predicados moderna, desarrollada por Gottlob Frege en 1879 en su obra "Begriffsschrift" (Escritura Conceptual), amplió la lógica aristotélica al permitir analizar la estructura interna de las proposiciones. Mientras Aristóteles trataba "Todos los humanos son mortales" como una unidad, Frege podía descomponerla en funciones y variables: para todo x, si x es humano entonces x es mortal. Esta formalización fue necesaria para los fundamentos de las matemáticas y la informática teórica.' },
    ],
    fact: 'El término "Organon" (instrumento) que designa las obras lógicas de Aristóteles no fue elegido por el propio filósofo, sino por Andrónico de Rodas, quien organizó los manuscritos aristotélicos en el siglo I a.C. El nombre refleja la idea de que la lógica no es una ciencia en sí misma, sino una herramienta necesaria para todas las demás ciencias. Los filósofos estoicos, rivales de los aristotélicos, rechazaron esta clasificación y consideraron la lógica como una parte integral de la filosofía, no como un mero instrumento.',
  },
  {
    id: 'filosofia-natural',
    title: 'Filosofía Natural',
    color: '#3A7FA0',
    btnImage: '/assets/los_griegos/infographic_m5/btn_filosofia-natural.jpg',
    image: '/assets/los_griegos/infographic_m5/hero_filosofia-natural.jpg',
    content: [
      'Aristóteles fue uno de los primeros pensadores en insistir en que el conocimiento del mundo natural debe basarse en la observación directa y la recopilación sistemática de datos, no solo en la especulación teórica. En su obra "Historia de los Animales" (Historia Animalium), documentó las características de más de 500 especies animales, incluyendo descripciones detalladas de su anatomía, comportamiento, reproducción, alimentación y hábitat. Esta obra de nueve libros constituye la primera enciclopedia zoológica de la historia occidental y permaneció como referencia principal durante casi dos mil años.',
      'Su método de clasificación biológica organizaba a los animales en dos grandes grupos: los que tienen sangre (énaima, equivalentes aproximados de los vertebrados modernos) y los que carecen de ella (ánaima, equivalentes de los invertebrados). Dentro de cada grupo, subdividía según criterios como el modo de reproducción, el tipo de alimentación y el medio en que viven. Aunque este sistema no coincide exactamente con la taxonomía moderna de Linneo, estableció el principio fundamental de que los seres vivos pueden clasificarse según sus características compartidas, un enfoque que sigue vigente en la biología actual.',
      'En el campo de la embriología, Aristóteles realizó observaciones que no serían superadas hasta el uso del microscopio en el siglo XVII. Abrió huevos de gallina en distintos días de incubación para documentar el desarrollo del embrión, registrando la formación del corazón (que identificó correctamente como el primer órgano funcional), los vasos sanguíneos y las estructuras óseas. También estudió la reproducción de los insectos, los peces y los cefalópodos, describiendo el brazo hectocótilo del pulpo macho, estructura reproductiva que los zoólogos europeos no redescubrieron hasta el trabajo de Georges Cuvier en 1829.',
      'Su tratado "Física" abordó cuestiones sobre el movimiento, el cambio, el espacio y el tiempo. Aristóteles distinguió cuatro tipos de causas para explicar cualquier fenómeno: la causa material (de qué está hecho), la causa formal (su estructura o diseño), la causa eficiente (qué lo produjo) y la causa final (para qué existe). Este esquema de las "cuatro causas" representó un marco explicativo que, aunque la ciencia moderna ha abandonado la causa final para los fenómenos naturales, sigue siendo útil en campos como la ingeniería, la medicina y la filosofía de la tecnología.',
      'No todas las teorías de Aristóteles sobre la naturaleza fueron correctas. Sostuvo que la Tierra era el centro inmóvil del universo, que los objetos pesados caen más rápido que los ligeros, y que los cuerpos celestes están hechos de un quinto elemento (el éter) distinto de los cuatro elementos terrestres (tierra, agua, aire y fuego). Estas ideas erróneas, respaldadas por la autoridad de su nombre, dominaron la ciencia europea durante siglos hasta que Galileo Galilei las refutó experimentalmente entre 1589 y 1638, demostrando mediante experimentos con planos inclinados que la velocidad de caída no depende del peso del objeto.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El naturalista Charles Darwin escribió en una carta de 1882 a William Ogle: "Linneo y Cuvier han sido mis dos dioses, aunque de maneras muy diferentes; pero ambos eran meros colegiales comparados con el viejo Aristóteles". Darwin admiraba especialmente las observaciones biológicas de Aristóteles sobre los organismos marinos del Egeo, muchas de las cuales fueron confirmadas por la biología moderna solo en los siglos XIX y XX, más de dos mil años después de ser registradas por primera vez.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Aristóteles clasificó correctamente a las ballenas y los delfines como mamíferos, no como peces, basándose en tres observaciones: respiran aire mediante pulmones, dan a luz crías vivas y las amamantan. Esta clasificación fue ignorada por los naturalistas europeos durante la Edad Media y el Renacimiento, quienes volvieron a considerar a los cetáceos como peces. La taxonomía moderna confirmó definitivamente la clasificación aristotélica con el sistema de Linneo en 1758, veintiún siglos después de la observación original.' },
    ],
    fact: 'Aristóteles describió con precisión el brazo hectocótilo del pulpo macho, una estructura reproductiva especializada que se desprende durante el apareamiento. El zoólogo francés Georges Cuvier redescubrió esta estructura en 1829, y al principio la comunidad científica creyó que era un parásito del pulpo. No fue hasta mediados del siglo XIX que los biólogos confirmaron la función reproductiva exacta que Aristóteles había documentado en el siglo IV a.C., validando una observación que había permanecido olvidada durante más de dos milenios.',
  },
  {
    id: 'tutor-alejandro',
    title: 'El Tutor de Alejandro',
    color: '#C0B09C',
    btnImage: '/assets/los_griegos/infographic_m5/btn_tutor-alejandro.jpg',
    image: '/assets/los_griegos/infographic_m5/hero_tutor-alejandro.jpg',
    content: [
      'En el año 343 a.C., el rey Filipo II de Macedonia invitó a Aristóteles a la corte de Pela con una misión específica: educar a su hijo Alejandro, que entonces tenía trece años. La elección no fue casual: Filipo conocía la reputación de Aristóteles como el intelectual más destacado de su generación, y además existía una conexión familiar, ya que el padre de Aristóteles había servido como médico del abuelo de Filipo. El rey proporcionó a Aristóteles un lugar tranquilo para la enseñanza: el Ninfeo de Mieza, un santuario rodeado de jardines situado a unos 30 kilómetros de la capital macedónica.',
      'Durante aproximadamente tres años, desde el 343 hasta el 340 a.C., Aristóteles instruyó a Alejandro y a un grupo selecto de jóvenes nobles macedónicos en filosofía, literatura, ciencias naturales, medicina y retórica. Según las fuentes antiguas, Aristóteles preparó una edición especial de la Ilíada de Homero para su alumno, que Alejandro llevó consigo durante todas sus campañas militares, guardándola bajo su almohada junto con una daga. Esta edición, conocida como "la Ilíada de la caja", se convirtió en uno de los objetos más preciados del conquistador.',
      'La influencia de Aristóteles sobre Alejandro se manifestó de maneras concretas durante las campañas de conquista. Alejandro llevaba consigo equipos de científicos, botánicos y cartógrafos que recopilaban información sobre la flora, la fauna, la geografía y las costumbres de los territorios conquistados, enviando especímenes y reportes de vuelta a Aristóteles en Atenas. Esta práctica convirtió las expediciones militares de Alejandro en las primeras misiones de exploración científica a gran escala de la historia, proporcionando a Aristóteles datos de regiones que ningún griego había estudiado antes.',
      'La relación entre maestro y alumno se deterioró con el paso del tiempo. Cuando Alejandro ordenó la ejecución de Calístenes, sobrino de Aristóteles que le servía como historiador oficial, en el año 327 a.C., la ruptura fue definitiva. Calístenes había criticado públicamente la adopción por parte de Alejandro de costumbres persas, especialmente la proskynesis (la obligación de postrarse ante el rey), que los griegos consideraban una práctica servil incompatible con la dignidad del ciudadano libre. Aristóteles nunca perdonó la muerte de su sobrino.',
      'A pesar de la ruptura personal, el legado intelectual de la relación entre Aristóteles y Alejandro transformó el mundo antiguo. Las conquistas de Alejandro difundieron la cultura y el idioma griego desde Egipto hasta la India, creando el período helenístico que permitió la transmisión de las ideas filosóficas y científicas griegas a civilizaciones que antes no tenían contacto con ellas. Las ciudades que Alejandro fundó, especialmente Alejandría en Egipto, se convirtieron en centros de investigación donde la tradición aristotélica floreció durante siglos bajo la forma de la ciencia helenística.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Alejandro fundó al menos veinte ciudades que llevaron su nombre durante sus campañas. La más conocida, Alejandría de Egipto, fue fundada en el 331 a.C. y se convirtió en la capital intelectual del mundo antiguo. Su biblioteca, inspirada indirectamente por la tradición de colección bibliográfica que Aristóteles inició en el Liceo, llegó a contener entre 400.000 y 700.000 rollos de papiro, constituyendo el mayor repositorio de conocimiento del mundo antiguo durante más de tres siglos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los naturalistas que acompañaban a Alejandro recopilaron información sobre animales y plantas desconocidos para los griegos, incluyendo el algodón de la India, el banano, los elefantes de guerra y el arroz cultivado. Aristóteles incorporó muchos de estos datos en sus obras zoológicas y botánicas. El historiador romano Plinio el Viejo afirmó en su "Historia Natural" (siglo I d.C.) que Alejandro puso a disposición de Aristóteles a miles de cazadores, pescadores y cuidadores de animales para que le proporcionaran especímenes de estudio.' },
    ],
    fact: 'El Ninfeo de Mieza, donde Aristóteles educó a Alejandro, fue identificado arqueológicamente en 1965 cerca de la actual ciudad de Naoussa, en el norte de Grecia. Las excavaciones revelaron un complejo de cuevas naturales con columnas talladas, nichos para estatuas y un sistema de irrigación que alimentaba fuentes y jardines. El sitio coincide con la descripción del historiador Plutarco, quien lo describió como un lugar con "paseos sombreados y asientos de piedra" donde maestro y alumno conversaban sobre filosofía y ciencia.',
  },
  {
    id: 'etica-politica',
    title: 'Ética y Política',
    color: '#1E5B7A',
    btnImage: '/assets/los_griegos/infographic_m5/btn_etica-politica.jpg',
    image: '/assets/los_griegos/infographic_m5/hero_etica-politica.jpg',
    content: [
      'La "Ética a Nicómaco", nombrada en honor al padre o al hijo de Aristóteles (ambos se llamaban Nicómaco), es considerada una de las obras más influyentes de la filosofía moral occidental. En ella, Aristóteles argumenta que el objetivo supremo de la vida humana es la eudaimonía, un término griego que se traduce comúnmente como "felicidad" pero que significa algo más preciso: florecimiento humano, la realización plena de las capacidades y potencialidades de una persona a lo largo de toda su vida, no un estado emocional momentáneo.',
      'Para alcanzar la eudaimonía, Aristóteles propuso la doctrina del "justo medio" o "término medio" (mesotes). Según esta doctrina, cada virtud moral es un punto intermedio entre dos extremos viciosos: uno por exceso y otro por defecto. El coraje, por ejemplo, es el punto medio entre la cobardía (defecto) y la temeridad (exceso). La generosidad se encuentra entre la avaricia y la prodigalidad. Esta doctrina no es una simple regla aritmética: el punto medio varía según las circunstancias, la persona y la situación, y encontrarlo requiere experiencia, reflexión y lo que Aristóteles llamó "prudencia práctica" (phrónesis).',
      'En el campo de la filosofía política, Aristóteles escribió la "Política", donde clasificó las formas de gobierno en seis tipos: tres correctas (monarquía, aristocracia y politeia o gobierno constitucional) y tres desviadas (tiranía, oligarquía y democracia radical). Cada forma correcta se corrompe cuando los gobernantes buscan su propio beneficio en lugar del bien común. Aristóteles consideraba la politeia, una mezcla equilibrada de elementos democráticos y oligárquicos con predominio de la clase media, como la forma de gobierno más estable y justa para la mayoría de las ciudades.',
      'Aristóteles definió al ser humano como un "animal político" (zoon politikon), argumentando que la vida en comunidad organizada no es simplemente conveniente sino esencial para la naturaleza humana. Según su razonamiento, quien vive fuera de la polis (ciudad-estado) por elección propia "es o un ser inferior o un dios". Esta concepción del ser humano como ser social por naturaleza influyó profundamente en la teoría política medieval, en la filosofía social de Tomás de Aquino y en las teorías modernas del contrato social desarrolladas por Hobbes, Locke y Rousseau.',
      'La ética aristotélica experimentó un renacimiento notable en la filosofía del siglo XX con el movimiento conocido como "ética de la virtud". Filósofos como Elizabeth Anscombe (en su artículo "Modern Moral Philosophy" de 1958), Alasdair MacIntyre (en "After Virtue", 1981) y Philippa Foot argumentaron que las teorías éticas modernas, centradas en reglas o consecuencias, habían perdido de vista lo que realmente importa en la vida moral: el desarrollo del carácter virtuoso. Este retorno a Aristóteles ha influido en campos como la psicología positiva, la educación del carácter y la ética médica profesional contemporánea.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Aristóteles defendió posiciones que hoy consideramos profundamente erróneas. Justificó la esclavitud como "natural" para ciertos seres humanos, y consideró a las mujeres como seres inferiores a los hombres en capacidad racional. Estas ideas fueron criticadas ya en la Antigüedad por los filósofos estoicos, quienes defendieron la igualdad natural de todos los seres humanos. El estudio de Aristóteles nos enseña que incluso los grandes pensadores pueden estar limitados por los prejuicios de su época y su contexto social.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El concepto aristotélico de eudaimonía ha sido incorporado a la psicología científica moderna. El psicólogo Martin Seligman, fundador de la psicología positiva, distingue entre "felicidad hedónica" (placer momentáneo) y "bienestar eudaimónico" (sentido de propósito y realización), un marco directamente inspirado en Aristóteles. Estudios publicados en el Journal of Personality and Social Psychology (2008) demostraron que el bienestar eudaimónico se correlaciona con mejor salud inmunológica que el hedónico.' },
    ],
    fact: 'La "Constitución de Atenas", obra atribuida a Aristóteles y su escuela, fue redescubierta en 1879 cuando el Museo Británico adquirió cuatro rollos de papiro procedentes de Egipto. El texto, escrito en el reverso de las cuentas de un granjero egipcio del siglo II d.C., contenía un análisis detallado de la historia constitucional ateniense y sus reformas políticas desde Dracón hasta el siglo IV a.C. El papiro fue publicado en 1891 por Frederic G. Kenyon y transformó la comprensión moderna de la democracia ateniense.',
  },
  {
    id: 'legado-aristotelico',
    title: 'El Legado Aristotélico',
    color: '#F0EAE0',
    btnImage: '/assets/los_griegos/infographic_m5/btn_legado-aristotelico.jpg',
    image: '/assets/los_griegos/infographic_m5/hero_legado-aristotelico.jpg',
    content: [
      'Después de la muerte de Alejandro Magno en el 323 a.C., un nuevo brote de sentimiento anti-macedónico recorrió Atenas. Aristóteles, consciente del peligro, abandonó la ciudad declarando que no permitiría que los atenienses "pecaran dos veces contra la filosofía", en referencia a la condena y ejecución de Sócrates setenta y seis años antes. Se retiró a Calcis, en la isla de Eubea, donde murió al año siguiente, en el 322 a.C., a la edad de sesenta y dos años. Según algunas fuentes antiguas, la causa fue una enfermedad estomacal crónica que lo afligía desde hacía tiempo.',
      'Los manuscritos de Aristóteles tuvieron una historia azarosa tras su muerte. Su sucesor Teofrasto los heredó, y después pasaron a manos de Neleo de Escepsis, quien los almacenó en un sótano húmedo de Asia Menor donde sufrieron daños considerables. En el siglo I a.C., el filósofo Andrónico de Rodas obtuvo los textos, los restauró y los organizó en el orden que conocemos hoy. Los tratados que Andrónico colocó "después de la Física" (meta ta physika) recibieron el nombre de "Metafísica", un título accidental que se convirtió en el nombre de toda una rama fundamental de la filosofía.',
      'La preservación del legado aristotélico debe mucho al mundo islámico medieval. Entre los siglos IX y XII, eruditos árabes tradujeron la totalidad de las obras disponibles de Aristóteles al árabe en la Casa de la Sabiduría de Bagdad, fundada por el califa al-Mamún en el 832 d.C. Filósofos como al-Kindi, al-Farabi, Avicena (Ibn Sina) y Averroes (Ibn Rushd) escribieron extensos comentarios que no solo preservaron sino que ampliaron el pensamiento aristotélico. Averroes, en particular, fue conocido en la Europa medieval simplemente como "el Comentador", tal era la autoridad de sus interpretaciones.',
      'La reintroducción de Aristóteles en la Europa cristiana medieval, principalmente a través de traducciones del árabe al latín realizadas en Toledo durante los siglos XII y XIII, provocó una revolución intelectual. Tomás de Aquino (1225-1274) emprendió la tarea de reconciliar la filosofía aristotélica con la teología cristiana, produciendo la síntesis tomista que se convirtió en la filosofía oficial de la Iglesia Católica. Aquino se refería a Aristóteles simplemente como "el Filósofo", sin necesidad de especificar su nombre, reflejando el estatus único que el pensador griego ocupaba en el pensamiento medieval.',
      'El legado de Aristóteles continúa moldeando el pensamiento contemporáneo de formas a menudo invisibles. Su clasificación de las disciplinas del conocimiento (teóricas, prácticas y productivas) estructura las facultades universitarias modernas. Su "Poética" sigue siendo una referencia central en los estudios literarios y cinematográficos. Su lógica formal fundamentó el desarrollo de la informática. Sus categorías biológicas anticiparon la taxonomía moderna. Y su ética de la virtud ha experimentado un renacimiento global en la filosofía moral del siglo XXI, demostrando que las preguntas que formuló hace veinticuatro siglos siguen siendo relevantes para la vida humana actual.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El poeta italiano Dante Alighieri llamó a Aristóteles "el maestro de los que saben" (il maestro di color che sanno) en el Canto IV de la Divina Comedia, escrita entre 1308 y 1321. En el Limbo de Dante, Aristóteles aparece rodeado por los grandes filósofos de la Antigüedad, quienes le muestran reverencia. Este título refleja la posición suprema que Aristóteles ocupaba en el pensamiento medieval europeo, donde su autoridad intelectual era comparable solo a la de las Escrituras sagradas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Escuela de Traductores de Toledo fue el principal canal de transmisión del conocimiento aristotélico al mundo latino. Entre 1130 y 1187, Gerardo de Cremona tradujo al latín más de 70 obras del árabe, incluyendo la Física, la Meteorología y el De Caelo de Aristóteles. El arzobispo Raimundo de Toledo organizó equipos de traductores que trabajaban en cadena: un erudito judío o mozárabe traducía del árabe al castellano, y un clérigo latino traducía del castellano al latín, preservando así el conocimiento antiguo para la Europa cristiana.' },
    ],
    fact: 'La "Poética" de Aristóteles, escrita alrededor del 335 a.C., sobrevivió parcialmente: solo conservamos la sección sobre la tragedia, mientras que la segunda parte sobre la comedia se perdió. El novelista Umberto Eco utilizó esta pérdida como premisa central de su novela "El Nombre de la Rosa" (1980), donde un monje asesina para proteger la última copia del segundo libro de la Poética. El manuscrito más antiguo que conservamos de la Poética es un texto árabe del siglo X d.C., traducido por Abu Bishr Matta ibn Yunus en Bagdad alrededor del año 935.',
  },
];

// ——— Aegean Particle Field (Canvas Background) ————————————————————
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

// ——— Aristotle Header ————————————————————————————————————————
function AristotleHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(46,107,138,0.3))' }}>
        {/* Wisdom arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#aegeanGrad)" strokeWidth="2.5" strokeLinecap="round" />
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
        {/* Central owl icon */}
        <circle cx="300" cy="28" r="12" fill="none" stroke="#2E6B8A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="295" cy="26" r="3" fill="none" stroke="#2E6B8A" strokeWidth="1" opacity="0.5" />
        <circle cx="305" cy="26" r="3" fill="none" stroke="#2E6B8A" strokeWidth="1" opacity="0.5" />
        <circle cx="295" cy="26" r="1.2" fill="#2E6B8A" opacity="0.4" />
        <circle cx="305" cy="26" r="1.2" fill="#2E6B8A" opacity="0.4" />
        <defs>
          <linearGradient id="aegeanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(46,107,138,0.2)" />
            <stop offset="50%" stopColor="rgba(46,107,138,0.9)" />
            <stop offset="100%" stopColor="rgba(46,107,138,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="78" textAnchor="middle" fill="#2E6B8A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ARISTÓTELES</text>
        <text x="300" y="98" textAnchor="middle" fill="rgba(46,107,138,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL MAESTRO DE LOS QUE SABEN</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ——————————————————
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
          layoutId="activeDotGriegosM5"
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

// ——— Progress Bar ————————————————————————————————————————————————
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

// ——— Main Infographic Component ————————————————————————————————————
export default function InteractiveInfographic_GriegosM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/griegos/griegos_m5_bg.png)',
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

      <AristotleHeader />

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
              🏛️ ¡Has explorado toda la filosofía de Aristóteles!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Maestro Peripatético
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
