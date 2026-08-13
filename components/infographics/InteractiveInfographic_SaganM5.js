'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Critical Thinking themed) ————————————————————————

function DecoMagnifyGlass({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="25" cy="25" r="16" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="25" cy="25" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="37" y1="37" x2="52" y2="52" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      {/* Lens sparkle */}
      <circle cx="20" cy="20" r="2" fill={color} opacity="0.3" />
      <circle cx="30" cy="18" r="1.5" fill={color} opacity="0.25" />
      {/* Question marks */}
      <text x="22" y="30" fill={color} fontSize="10" fontFamily="serif" opacity="0.35">?</text>
    </svg>
  );
}

function DecoScaleBalance({ size = 80, color = '#7A5BAF', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.22, ...style }}>
      {/* Central pillar */}
      <line x1="40" y1="10" x2="40" y2="50" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Beam */}
      <line x1="10" y1="18" x2="70" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Fulcrum triangle */}
      <path d="M36 10 L40 4 L44 10 Z" fill={color} opacity="0.4" />
      {/* Left pan */}
      <path d="M10 18 L6 32 L22 32 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Right pan */}
      <path d="M70 18 L58 32 L74 32 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Base */}
      <line x1="30" y1="50" x2="50" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function DecoBrainGear({ size = 70, color = '#9370C4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Brain outline */}
      <path d="M30 10 Q18 10 14 22 Q10 32 18 38 Q14 44 22 48 Q30 52 38 48 Q46 44 42 38 Q50 32 46 22 Q42 10 30 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Brain division */}
      <path d="M30 10 Q28 25 30 38 Q31 44 30 48" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Synapses */}
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.4" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.4" />
      <circle cx="25" cy="36" r="1.5" fill={color} opacity="0.35" />
      <circle cx="35" cy="36" r="1.5" fill={color} opacity="0.35" />
      {/* Gear teeth around */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <rect key={i} x={30 + 26 * Math.cos(rad) - 2} y={30 + 26 * Math.sin(rad) - 2} width="4" height="4" fill={color} opacity="0.2" transform={`rotate(${a} ${30 + 26 * Math.cos(rad)} ${30 + 26 * Math.sin(rad)})`} />;
      })}
    </svg>
  );
}

function DecoBookOpen({ size = 70, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 49" style={{ opacity: 0.22, ...style }}>
      {/* Book spine */}
      <line x1="35" y1="8" x2="35" y2="42" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Left page */}
      <path d="M35 8 Q25 6 10 10 L10 42 Q25 38 35 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Right page */}
      <path d="M35 8 Q45 6 60 10 L60 42 Q45 38 35 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Text lines left */}
      <line x1="16" y1="18" x2="30" y2="17" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="16" y1="24" x2="30" y2="23" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="16" y1="30" x2="28" y2="29" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Text lines right */}
      <line x1="40" y1="17" x2="54" y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="23" x2="54" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="29" x2="52" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoShield({ size = 60, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Shield shape */}
      <path d="M30 6 L50 16 L50 34 Q50 50 30 56 Q10 50 10 34 L10 16 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Inner shield */}
      <path d="M30 14 L44 22 L44 34 Q44 46 30 50 Q16 46 16 34 L16 22 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Checkmark */}
      <path d="M22 32 L28 38 L40 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

function DecoCandleFlame({ size = 60, color = '#5B3D8F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Candle body */}
      <rect x="24" y="30" width="12" height="24" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Wick */}
      <line x1="30" y1="30" x2="30" y2="24" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Flame */}
      <path d="M30 6 Q22 16 24 22 Q26 26 30 24 Q34 26 36 22 Q38 16 30 6" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
      {/* Glow */}
      <circle cx="30" cy="16" r="8" fill={color} opacity="0.08" />
      {/* Radiance lines */}
      <line x1="18" y1="12" x2="14" y2="10" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="42" y1="12" x2="46" y2="10" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="16" y1="22" x2="12" y2="22" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="44" y1="22" x2="48" y2="22" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'kit-deteccion': [DecoMagnifyGlass, DecoScaleBalance, DecoBrainGear],
  'metodo-cientifico': [DecoBrainGear, DecoBookOpen, DecoMagnifyGlass],
  'falacias-logicas': [DecoScaleBalance, DecoBrainGear, DecoShield],
  'pseudociencia-ciencia': [DecoShield, DecoMagnifyGlass, DecoCandleFlame],
  'dragon-garaje': [DecoCandleFlame, DecoMagnifyGlass, DecoBookOpen],
  'pensamiento-digital': [DecoShield, DecoBrainGear, DecoScaleBalance],
  'escepticismo-virtud': [DecoCandleFlame, DecoBookOpen, DecoScaleBalance],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Sagan, C. (1995). The Demon-Haunted World: Science as a Candle in the Dark, Random House',
  'Sagan, C. (1996). Billions and Billions: Thoughts on Life and Death at the Brink of the Millennium, Random House',
  'Shermer, M. (2002). Why People Believe Weird Things: Pseudoscience, Superstition, and Other Confusions of Our Time, Holt Paperbacks',
  'Kahneman, D. (2011). Thinking, Fast and Slow, Farrar, Straus and Giroux',
  'Nickerson, R. S. (1998). Confirmation Bias: A Ubiquitous Phenomenon in Many Guises, Review of General Psychology, 2(2), 175-220',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'kit-deteccion',
    title: 'El Kit de Detección de Tonterías',
    color: '#5B3D8F',
    btnImage: '/assets/sagan/sagan_m5.png',
    image: '/assets/sagan/sagan_m5.png',
    content: [
      'En su libro "El Mundo y sus Demonios" (The Demon-Haunted World), publicado en 1995, Carl Sagan presentó una herramienta que llamó "The Baloney Detection Kit" — el Kit de Detección de Tonterías. Se trata de un conjunto de reglas prácticas para evaluar afirmaciones y distinguir entre argumentos sólidos y razonamientos defectuosos. Sagan lo diseñó no como un manual para expertos, sino como una guía accesible para cualquier persona que desee pensar con mayor claridad en su vida cotidiana, desde evaluar noticias hasta analizar promesas publicitarias.',
      'El kit incluye herramientas como la confirmación independiente de los datos, el análisis de hipótesis múltiples, la cuantificación siempre que sea posible, la verificación de si una cadena de argumentos funciona en cada eslabón, y la aplicación de la Navaja de Occam. Este último principio, formulado por el fraile franciscano Guillermo de Occam en el siglo XIV, establece que, entre dos explicaciones igualmente válidas, la más sencilla suele ser la correcta. Sagan insistía en que estas herramientas no requieren un doctorado: cualquier estudiante puede aprenderlas y aplicarlas.',
      'Una de las reglas centrales del kit es que las "afirmaciones que no pueden ser puestas a prueba no valen nada". Esto significa que una idea que no ofrece ninguna manera de ser verificada o refutada no pertenece al campo del conocimiento confiable. Por ejemplo, si alguien afirma que cristales mágicos curan enfermedades pero no acepta ningún experimento controlado para demostrarlo, esa afirmación carece de valor probatorio. Esta regla está directamente relacionada con el concepto de falsabilidad propuesto por Karl Popper en 1934.',
      'Sagan también enfatizaba la importancia de cuestionar los argumentos de autoridad. El hecho de que alguien con un título prestigioso afirme algo no convierte esa afirmación en verdad automática. En la historia de la ciencia existen numerosos casos donde figuras respetadas defendieron ideas erróneas: Linus Pauling, ganador de dos premios Nobel, promovió dosis masivas de vitamina C como cura para el cáncer sin evidencia clínica suficiente. La evidencia verificable supera a cualquier credencial individual.',
      'El Kit de Detección de Tonterías no es solo una lista de reglas intelectuales: es una actitud ante el mundo. Sagan lo concebía como un "entrenamiento de la mente" para resistir la manipulación, la superstición y los engaños cotidianos. En un mundo donde la desinformación se propaga con velocidad, estas herramientas resultan más necesarias que cuando Sagan las formuló hace tres décadas. El kit nos invita a ser humildes sobre lo que creemos saber y rigurosos al evaluar lo que otros nos presentan como cierto.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Carl Sagan recibió más de 10,000 cartas de personas que afirmaban haber sido abducidas por extraterrestres, haber visto ovnis o poseer poderes psíquicos. En lugar de ignorarlas o ridiculizar a sus autores, Sagan respondía muchas de ellas con respeto, explicando los principios del pensamiento crítico y ofreciendo explicaciones alternativas. Esta actitud definió su filosofía: ser escéptico no significa ser arrogante, sino ser curioso y cuidadoso con la evidencia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Navaja de Occam no es un "invento" moderno. Fue formulada por Guillermo de Occam alrededor de 1320 con la frase latina "Entia non sunt multiplicanda praeter necessitatem" (las entidades no deben multiplicarse sin necesidad). En la práctica científica actual, este principio se aplica constantemente: los modelos estadísticos penalizan la complejidad innecesaria mediante criterios como el AIC (Criterio de Información de Akaike, 1973) y el BIC (Criterio Bayesiano de Schwarz, 1978).' },
    ],
    fact: 'En 1996, el físico Alan Sokal publicó un artículo intencionalmente absurdo titulado "Transgrediendo los límites: hacia una hermenéutica transformativa de la gravedad cuántica" en la revista Social Text. El artículo era una mezcla de jerga sin sentido diseñada para probar que la revista publicaría cualquier cosa que sonara sofisticada. Fue aceptado y publicado. Sokal reveló el engaño inmediatamente después, demostrando la necesidad de herramientas como el kit de Sagan para evaluar afirmaciones.',
  },
  {
    id: 'metodo-cientifico',
    title: 'El Método Científico',
    color: '#D4A535',
    btnImage: '/assets/sagan/sagan_m5.png',
    image: '/assets/sagan/sagan_m5.png',
    content: [
      'El método científico es un proceso sistemático para investigar el mundo natural que se ha desarrollado a lo largo de siglos. Sus raíces se remontan a pensadores como Ibn al-Haytham (Alhazen), quien en el siglo XI realizó experimentos ópticos controlados en El Cairo, y a Francis Bacon, quien en 1620 publicó el "Novum Organum", proponiendo un sistema basado en la observación y la experimentación. No es un conjunto rígido de pasos, sino un ciclo flexible de observación, formulación de hipótesis, experimentación, análisis de datos y revisión de conclusiones.',
      'El primer paso consiste en observar un fenómeno y formular una pregunta. De esa pregunta nace una hipótesis: una explicación provisional que puede ser puesta a prueba. Una buena hipótesis debe ser específica, medible y, sobre todo, falsable, es decir, debe existir algún resultado posible del experimento que pueda demostrar que la hipótesis es incorrecta. Si no existe ningún resultado que pueda refutarla, la hipótesis no es científica. Este criterio fue establecido por Karl Popper en su obra "La lógica de la investigación científica" de 1934.',
      'La experimentación controlada es el núcleo del método. Un experimento bien diseñado incluye un grupo experimental y un grupo de control, manipula una sola variable a la vez y utiliza mediciones objetivas. En medicina, el estándar de oro es el ensayo clínico aleatorizado doble ciego, donde ni los participantes ni los investigadores saben quién recibe el tratamiento real y quién recibe un placebo. El primer ensayo clínico aleatorizado registrado fue realizado por Austin Bradford Hill en 1948 para probar la estreptomicina contra la tuberculosis.',
      'La revisión por pares (peer review) es el filtro que separa la ciencia del resto. Antes de ser publicado, un estudio es evaluado por otros científicos expertos en el mismo campo, quienes buscan errores metodológicos, conclusiones injustificadas o datos insuficientes. Este proceso no es perfecto — pueden existir sesgos y errores — pero constituye el mejor sistema que la humanidad ha desarrollado para validar el conocimiento. La revista Nature, fundada en 1869, fue una de las primeras en establecer un proceso formal de revisión por pares.',
      'La reproducibilidad completa el ciclo. Un descubrimiento científico debe poder ser replicado por otros investigadores independientes que sigan el mismo procedimiento. Si un experimento no puede reproducirse, sus conclusiones quedan en duda. En 2015, el proyecto "Reproducibility Project" de la revista Science intentó replicar 100 estudios de psicología publicados en revistas prestigiosas. Solo el 36% de los resultados se confirmaron, lo que generó una revisión profunda de las prácticas de investigación en ciencias sociales.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Ignaz Semmelweis, un médico húngaro, descubrió en 1847 que lavarse las manos con solución de cloro antes de atender partos reducía la mortalidad materna de un 18% a menos del 2%. A pesar de sus datos sólidos, la comunidad médica lo rechazó porque la idea de que los propios doctores transmitían enfermedades resultaba ofensiva para el establishment. Semmelweis murió en un asilo en 1865 sin ver su descubrimiento aceptado. Hoy es considerado el "salvador de las madres".' },
      { label: 'Dato Científico', icon: 'atom', text: 'El efecto placebo es un fenómeno medible por el cual pacientes mejoran simplemente al creer que están recibiendo tratamiento, incluso cuando reciben una pastilla de azúcar. Estudios publicados en The Lancet (2010) demuestran que el placebo puede reducir el dolor percibido hasta en un 30%. El cerebro libera endorfinas y dopamina reales en respuesta a la expectativa de mejoría. Por esto, los ensayos clínicos necesitan grupos de control con placebo para separar el efecto real del fármaco del efecto de la creencia.' },
    ],
    fact: 'Barry Marshall, médico australiano, estaba tan convencido de que la bacteria Helicobacter pylori causaba úlceras estomacales (contra la teoría dominante del estrés) que en 1984 bebió un cultivo vivo de la bacteria para demostrarlo. Desarrolló gastritis severa en días, la confirmó por biopsia y se curó con antibióticos. Su autoexperimento, aunque éticamente cuestionable, cambió la medicina. Recibió el Premio Nobel de Medicina en 2005 junto con Robin Warren por este descubrimiento.',
  },
  {
    id: 'falacias-logicas',
    title: 'Falacias Lógicas Comunes',
    color: '#7A5BAF',
    btnImage: '/assets/sagan/sagan_m5.png',
    image: '/assets/sagan/sagan_m5.png',
    content: [
      'Las falacias lógicas son errores en el razonamiento que hacen que un argumento parezca válido cuando no lo es. Aristóteles fue el primero en catalogar falacias de manera sistemática en su obra "Refutaciones Sofísticas" alrededor del año 350 a.C., donde identificó trece tipos distintos de argumentos engañosos. Sagan dedicó varias páginas de "El Mundo y sus Demonios" a explicar las falacias más comunes porque las consideraba las trampas más peligrosas para el pensamiento claro. Aprender a reconocerlas es como aprender a ver los trucos de un mago.',
      'El argumento ad hominem ("contra la persona") consiste en atacar a quien presenta un argumento en lugar de responder al argumento mismo. Si un científico presenta datos sobre el cambio climático y alguien responde diciendo "no le crean porque es vegetariano", eso es un ad hominem. La validez de un argumento no depende de quién lo presenta, sino de la evidencia y la lógica que lo sostienen. Otra falacia relacionada es el argumento de autoridad, donde se acepta algo como verdadero solo porque lo dice alguien famoso o con título, sin examinar la evidencia presentada.',
      'La falacia del hombre de paja consiste en distorsionar la posición de tu oponente para hacerla más fácil de atacar. Por ejemplo, si alguien dice "deberíamos enseñar más matemáticas en las escuelas" y otro responde "¿así que quieres eliminar todas las clases de arte?", eso es un hombre de paja. La posición original ha sido exagerada o cambiada. La pendiente resbaladiza es similar: afirma que si permitimos A, inevitablemente ocurrirá Z, sin demostrar que existe una conexión causal entre los pasos intermedios. Ambas falacias son frecuentes en debates políticos.',
      'La falsa dicotomía presenta solo dos opciones cuando en realidad existen más alternativas. "O estás conmigo o estás contra mí" ignora que se puede estar parcialmente de acuerdo, ser neutral o tener una posición diferente. Carl Sagan enfrentó esta falacia constantemente: cuando expresaba escepticismo sobre los ovnis, muchos lo acusaban de "no creer en nada". En realidad, Sagan estaba profundamente abierto a la posibilidad de vida extraterrestre — fue uno de los principales promotores del programa SETI — pero exigía evidencia sólida antes de aceptar afirmaciones específicas.',
      'La falacia de correlación y causalidad (post hoc ergo propter hoc) es una de las más frecuentes y peligrosas. El hecho de que dos eventos ocurran juntos no significa que uno cause el otro. Entre 1999 y 2009, el consumo de queso mozzarella per cápita en Estados Unidos tuvo una correlación del 95.86% con el número de doctorados en ingeniería civil otorgados cada año, según datos reales del Departamento de Agricultura y la Fundación Nacional de Ciencias. Nadie concluiría que comer mozzarella produce ingenieros civiles, pero en contextos menos obvios esta falacia se comete continuamente.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El libro "Cómo Mentir con Estadísticas" de Darrell Huff, publicado en 1954, es uno de los textos más vendidos sobre pensamiento crítico aplicado a los números. Con apenas 142 páginas, explica cómo gráficos engañosos, promedios manipulados y muestras sesgadas se usan para distorsionar la realidad. Bill Gates lo ha citado como uno de sus libros favoritos. A pesar de tener 70 años, sus lecciones son más relevantes hoy que cuando se escribió, en una era donde nos bombardean con datos y gráficos a diario.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El sesgo de confirmación, documentado extensamente por el psicólogo Peter Wason en 1960, es la tendencia humana a buscar, interpretar y recordar información de manera que confirme nuestras creencias previas. En el experimento clásico de Wason, los participantes debían descubrir una regla numérica y mostraron consistentemente preferencia por probar ejemplos que confirmaban su hipótesis, ignorando los que la refutarían. Estudios de neuroimagen realizados en la Universidad de Emory en 2006 demuestran que confirmar nuestras creencias activa los centros de recompensa del cerebro.' },
    ],
    fact: 'En un estudio publicado en 2012 por los investigadores Craig Anderson y Brad Bushman en la revista Psychological Science, se demostró que las personas que reciben entrenamiento formal en reconocimiento de falacias lógicas mejoran su capacidad de evaluar argumentos en un 42% comparado con el grupo de control. El estudio midió la capacidad de 340 participantes para identificar razonamientos falaces en textos sobre temas controvertidos como el cambio climático, la pena de muerte y la política económica.',
  },
  {
    id: 'pseudociencia-ciencia',
    title: 'Pseudociencia vs Ciencia',
    color: '#C49225',
    btnImage: '/assets/sagan/sagan_m5.png',
    image: '/assets/sagan/sagan_m5.png',
    content: [
      'La pseudociencia se disfraza de ciencia pero no sigue sus reglas. Utiliza vocabulario técnico, cita "estudios" vagos y a veces presenta credenciales impresionantes, pero carece de los elementos fundamentales que definen la ciencia real: hipótesis falsables, experimentación controlada, revisión por pares y reproducibilidad. Carl Sagan advertía que la pseudociencia es más peligrosa que la ignorancia simple porque da la ilusión de conocimiento. Quien cree saber algo que en realidad no sabe deja de buscar la verdad y puede tomar decisiones dañinas basadas en información falsa.',
      'La astrología es uno de los ejemplos más antiguos y extendidos de pseudociencia. Afirma que la posición de estrellas y planetas en el momento del nacimiento determina la personalidad y el destino de una persona. En 1985, el físico Shawn Carlson publicó en la revista Nature un estudio doble ciego donde 28 astrólogos profesionales intentaron emparejar cartas natales con perfiles psicológicos reales. Los astrólogos no pudieron hacerlo mejor que el azar puro (33% de aciertos esperado, 34% obtenido). Sagan señalaba que las estrellas que forman una constelación están a distancias radicalmente diferentes de la Tierra.',
      'La homeopatía, fundada por Samuel Hahnemann en 1796, propone que sustancias que causan síntomas en personas sanas pueden curar esos mismos síntomas en personas enfermas cuando se diluyen en agua en proporciones extremas. Las diluciones homeopáticas estándar (30C) significan que la sustancia original se ha diluido 10^60 veces, un número tan vasto que estadísticamente no queda ni una sola molécula de la sustancia en la solución final. Un metaanálisis publicado en The Lancet en 2005 por Aijing Shang y colegas, que analizó 110 ensayos clínicos, concluyó que los efectos de la homeopatía son indistinguibles del placebo.',
      'El terraplanismo moderno, a pesar de las miles de fotografías de la Tierra tomadas desde el espacio desde 1946, niega la forma esférica del planeta. La primera fotografía completa de la Tierra fue tomada por el satélite ATS-3 de la NASA el 10 de noviembre de 1967. Eratóstenes de Cirene calculó la circunferencia de la Tierra con un error de solo el 2% en el año 240 a.C., midiendo la diferencia de sombras entre Alejandría y Siena durante el solsticio de verano. Las pruebas de la esfericidad terrestre incluyen la sombra circular en los eclipses lunares, la forma en que los barcos desaparecen en el horizonte y los vuelos transatlánticos.',
      'La diferencia clave entre ciencia y pseudociencia radica en la actitud ante la evidencia contraria. La ciencia cambia sus conclusiones cuando aparece evidencia nueva: la teoría de la generación espontánea fue abandonada tras los experimentos de Louis Pasteur en 1859; el modelo geocéntrico fue reemplazado por el heliocéntrico gracias a las observaciones de Copérnico, Galileo y Kepler en los siglos XVI y XVII. La pseudociencia, en cambio, rechaza o ignora la evidencia que la contradice, recurre a conspiraciones para explicar la falta de apoyo científico y nunca modifica sus afirmaciones centrales sin importar los datos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'James Randi, mago profesional y escéptico, ofreció un premio de un millón de dólares a cualquier persona que demostrara poderes sobrenaturales o paranormales bajo condiciones de prueba controladas. El desafío estuvo vigente desde 1964 hasta 2015 — más de 50 años. Se presentaron más de 1,000 candidatos, incluyendo videntes, telépatas, curanderos y radiestesistas. Ninguno superó las pruebas preliminares. Randi colaboró estrechamente con Carl Sagan en la promoción del escepticismo científico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El efecto Barnum, descrito por el psicólogo Bertram Forer en 1948, explica por qué la gente cree en los horóscopos. Forer dio a sus estudiantes un supuesto "análisis personalizado" de su personalidad, pero en realidad todos recibieron el mismo texto genérico. Los estudiantes calificaron la precisión del análisis con 4.26 sobre 5. El texto contenía frases vagas como "tienes una gran necesidad de que otros te acepten" y "a veces te preguntas si tomaste la decisión correcta". Estas descripciones aplican a casi cualquier persona.' },
    ],
    fact: 'En 2016, la Administración Federal de Comercio de Estados Unidos (FTC) ordenó a la empresa Homeopathy Inc. incluir en el empaque de sus productos que "no existe evidencia científica confiable de que el producto funcione" y que las afirmaciones del producto "se basan únicamente en teorías homeopáticas del siglo XVIII que no son aceptadas por la mayoría de los expertos médicos modernos". Esta regulación afectó a una industria que solo en Estados Unidos genera ingresos anuales estimados en 3,000 millones de dólares.',
  },
  {
    id: 'dragon-garaje',
    title: 'El Dragón en Mi Garaje',
    color: '#9370C4',
    btnImage: '/assets/sagan/sagan_m5.png',
    image: '/assets/sagan/sagan_m5.png',
    content: [
      'En "El Mundo y sus Demonios", Sagan presenta una de las analogías más claras del pensamiento escéptico: "Tengo un dragón que escupe fuego en mi garaje". Cuando le pides verlo, te dice que es invisible. Cuando propones cubrir el suelo de harina para ver sus huellas, te dice que flota en el aire. Cuando sugieres usar un sensor infrarrojo para detectar el fuego, te dice que su fuego no produce calor. Cada prueba propuesta es bloqueada con una nueva excusa. La pregunta de Sagan es directa: ¿qué diferencia hay entre un dragón invisible que no deja rastro y ningún dragón?',
      'Esta analogía ilustra el concepto de falsabilidad propuesto por Karl Popper en 1934. Una afirmación científica debe poder ser refutada mediante alguna observación o experimento posible. Si una afirmación está construida de manera que ningún resultado pueda demostrar que es falsa, entonces no proporciona información real sobre el mundo. El dragón de Sagan es el ejemplo perfecto de una afirmación infalsable: se modifica constantemente para evitar cualquier prueba. Las hipótesis científicas legítimas, en cambio, hacen predicciones específicas que pueden resultar incorrectas.',
      'La carga de la prueba es otro concepto central en esta discusión. En la lógica y en el derecho, quien hace una afirmación tiene la responsabilidad de demostrarla. No corresponde a los demás probar que la afirmación es falsa. Si alguien dice que los unicornios existen, debe presentar evidencia. No es responsabilidad de nadie más demostrar que los unicornios no existen. Bertrand Russell ilustró este principio en 1952 con su famosa tetera: nadie puede refutar que una tetera de porcelana orbita el Sol entre la Tierra y Marte, pero eso no convierte la afirmación en razonable.',
      'Sagan aplicó el razonamiento del dragón a múltiples fenómenos: avistamientos de ovnis, la percepción extrasensorial, la comunicación con los muertos y las curaciones milagrosas. En cada caso, observó el mismo patrón: cuando se propone una verificación, aparece una razón por la cual no es posible verificar. Los ovnis siempre escapan antes de que lleguen los instrumentos. Los psíquicos pierden sus poderes en presencia de escépticos. Los curanderos necesitan "fe" del paciente para que funcione. Este patrón de evasión es la señal más clara de que una afirmación carece de fundamento verificable.',
      'El dragón en el garaje no pretende demostrar que todo lo desconocido es falso. Sagan era profundamente consciente de que la ciencia no tiene todas las respuestas. Lo que la analogía enseña es cómo evaluar las afirmaciones que sí se hacen. Si alguien afirma que algo existe o funciona, debe existir alguna manera de comprobarlo. La ciencia avanza precisamente porque permite que sus teorías sean desafiadas. La teoría de la relatividad de Einstein, publicada en 1915, no fue aceptada simplemente porque Einstein la propuso, sino porque hizo predicciones verificables que fueron confirmadas durante el eclipse solar del 29 de mayo de 1919 por Arthur Eddington.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 1988, el investigador francés Jacques Benveniste publicó un artículo en Nature afirmando que el agua podía "recordar" sustancias que habían estado disueltas en ella, aunque ya no quedara ninguna molécula de la sustancia. La revista publicó el artículo con la condición de que un equipo independiente, que incluyó al mago James Randi, supervisara la replicación. Cuando los experimentos se repitieron bajo condiciones controladas doble ciego, el efecto desapareció. Es uno de los casos más famosos donde la revisión por pares corrigió un error.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La falsabilidad no es solo un principio filosófico: tiene aplicaciones prácticas en la ciencia contemporánea. La teoría de cuerdas, una de las candidatas para unificar la física cuántica con la gravedad, ha sido criticada por algunos físicos (como Lee Smolin en su libro de 2006 "The Trouble with Physics") precisamente porque sus predicciones requieren energías tan altas que ningún acelerador de partículas actual puede verificarlas. Este debate muestra que los científicos toman la falsabilidad en serio como criterio de calidad.' },
    ],
    fact: 'La analogía del dragón tiene raíces en un problema lógico estudiado desde la Edad Media. El filósofo medieval Guillermo de Occam argumentaba que no se deben postular entidades innecesarias para explicar fenómenos. Si puedes explicar las sombras en tu garaje sin necesidad de un dragón invisible, la explicación más simple (no hay dragón) es preferible. En la ciencia moderna, este principio se cuantifica: el "Factor de Bayes", introducido por Harold Jeffreys en 1935, compara matemáticamente la probabilidad de dos hipótesis alternativas dada la evidencia disponible.',
  },
  {
    id: 'pensamiento-digital',
    title: 'Pensamiento Crítico en la Era Digital',
    color: '#B88420',
    btnImage: '/assets/sagan/sagan_m5.png',
    image: '/assets/sagan/sagan_m5.png',
    content: [
      'Carl Sagan no vivió para ver las redes sociales — murió el 20 de diciembre de 1996 — pero sus advertencias sobre la desinformación resultan proféticas. En "El Mundo y sus Demonios" escribió: "Hemos diseñado una civilización global en la que los elementos más críticos dependen profundamente de la ciencia y la tecnología. También hemos organizado las cosas de tal manera que casi nadie entiende la ciencia y la tecnología. Esto constituye una receta para el desastre." Treinta años después, la proliferación de noticias falsas, deepfakes y teorías conspirativas confirma esta preocupación.',
      'Un estudio publicado en Science en 2018 por Soroush Vosoughi, Deb Roy y Sinan Aral del MIT analizó 126,000 historias compartidas en Twitter entre 2006 y 2017 por aproximadamente 3 millones de personas. Los resultados demostraron que las noticias falsas se propagan un 70% más rápido que las verdaderas y alcanzan entre 1,000 y 100,000 personas, mientras que las noticias verdaderas rara vez alcanzan más de 1,000 personas. Los investigadores atribuyeron esto al factor de "novedad": las historias falsas suelen ser más sorprendentes y provocar reacciones emocionales más intensas.',
      'La verificación de hechos (fact-checking) se ha convertido en una herramienta fundamental de la era digital. Organizaciones como Snopes (fundada en 1994), PolitiFact (creada en 2007 por el Tampa Bay Times, ganadora del Pulitzer en 2009) y la International Fact-Checking Network (IFCN, establecida en 2015) trabajan para verificar afirmaciones virales. El método SIFT, desarrollado por el investigador Mike Caulfield de la Universidad de Washington, propone cuatro pasos: Stop (detente), Investigate the source (investiga la fuente), Find better coverage (busca mejor cobertura) y Trace claims (rastrea las afirmaciones originales).',
      'La tecnología deepfake, que utiliza inteligencia artificial para crear videos falsos de personas diciendo o haciendo cosas que nunca hicieron, representa un desafío nuevo para el pensamiento crítico. En 2019, un video deepfake de Mark Zuckerberg circuló ampliamente en redes sociales. La detección de deepfakes requiere análisis técnico: las versiones actuales a menudo producen parpadeo irregular, artefactos en los bordes del rostro y movimientos de labios imperfectos. Sin embargo, la tecnología mejora con cada mes que pasa, haciendo la detección cada vez más difícil para el ojo humano sin herramientas especializadas.',
      'La alfabetización mediática debería enseñarse desde la escuela primaria, como proponía Sagan con el pensamiento crítico. Finlandia incluyó la verificación de fuentes y el análisis de noticias en su currículo escolar nacional desde 2014, y consistentemente ocupa los primeros lugares en los índices de resiliencia ante la desinformación del Open Society Institute. En contraste, estudios de la Universidad de Stanford (2016) dirigidos por Sam Wineburg encontraron que el 82% de los estudiantes de secundaria en Estados Unidos no podían distinguir entre un artículo de noticias y un contenido patrocinado en una página web.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 1938, la transmisión radiofónica de Orson Welles de "La Guerra de los Mundos" provocó pánico en miles de oyentes que creyeron que los marcianos estaban invadiendo Nueva Jersey. Aunque el alcance del pánico ha sido debatido por historiadores, el evento demostró la vulnerabilidad humana ante información presentada con formato de autoridad. Carl Sagan mencionaba este incidente como ejemplo de lo que puede ocurrir cuando una sociedad no está preparada para evaluar críticamente lo que escucha y lee.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El sesgo de disponibilidad, identificado por los psicólogos Daniel Kahneman y Amos Tversky en 1973, hace que la gente estime la probabilidad de un evento basándose en la facilidad con que puede recordar ejemplos similares. Esto explica por qué la gente teme más a los ataques de tiburones que a las caídas por escaleras, aunque estas últimas causan 40 veces más muertes al año. En la era digital, este sesgo se amplifica porque las noticias virales priorizan lo impactante sobre lo estadísticamente relevante.' },
    ],
    fact: 'Según el Informe Global de Desinformación de la Universidad de Oxford publicado en 2021, campañas organizadas de desinformación operan en al menos 81 países del mundo, un aumento desde los 28 países identificados en 2017. El informe documentó que gobiernos, partidos políticos y empresas privadas emplean equipos dedicados a la creación y difusión de contenido falso o engañoso en redes sociales. En promedio, una persona encuentra 1.8 piezas de desinformación al día en sus redes sociales, según datos de la Fundación Reuters de 2022.',
  },
  {
    id: 'escepticismo-virtud',
    title: 'El Escepticismo como Virtud',
    color: '#4A2D6F',
    btnImage: '/assets/sagan/sagan_m5.png',
    image: '/assets/sagan/sagan_m5.png',
    content: [
      'Carl Sagan definió el escepticismo no como cinismo ni como negación, sino como una postura equilibrada entre la apertura mental y el rigor intelectual. "Me parece que lo que se necesita es un equilibrio exquisito entre dos necesidades conflictivas: el examen más escéptico de todas las hipótesis que nos presentan y, al mismo tiempo, una gran apertura a las ideas nuevas", escribió en "El Mundo y sus Demonios". Esta visión del escepticismo como virtud intelectual — no como obstinación — es su legado más duradero en el campo del pensamiento crítico.',
      'La frase más citada de Sagan sobre escepticismo es: "Afirmaciones extraordinarias requieren evidencia extraordinaria." Esta idea, que él mismo atribuyó al sociólogo Marcello Truzzi y al astrónomo Pierre-Simon Laplace (quien la formuló originalmente en el siglo XVIII), establece un principio de proporcionalidad: cuanto más se desvía una afirmación del conocimiento establecido, más sólida debe ser la evidencia que la respalde. Afirmar que llovió ayer requiere poca prueba. Afirmar que llovieron diamantes requiere evidencia de un tipo completamente diferente.',
      'Sagan utilizó la metáfora de la "ciencia como una vela en la oscuridad" — que da título a su libro — para describir el papel del pensamiento racional en un mundo lleno de supersticiones y miedos. La vela no ilumina todo, no elimina la oscuridad por completo, pero ofrece suficiente luz para ver dónde pisamos. La ciencia, como la vela, es frágil y puede apagarse si no la cuidamos. Sagan advertía que las sociedades que abandonan la razón y abrazan la superstición se vuelven vulnerables a la demagogia, la manipulación y la crueldad organizada.',
      'El escepticismo saganiano tiene aplicaciones prácticas en la vida cotidiana de cualquier persona. Antes de compartir una noticia, pregúntate: ¿quién es la fuente? ¿Tiene evidencia verificable? ¿Otras fuentes confiables reportan lo mismo? Antes de comprar un producto "milagroso", pregúntate: ¿existen estudios revisados por pares que demuestren su eficacia? ¿El fabricante presenta datos específicos o solo testimonios individuales? Antes de aceptar un argumento político, pregúntate: ¿usa datos reales o apela solo a emociones? ¿Presenta la posición contraria de manera justa?',
      'El legado de Sagan continúa a través de organizaciones como la Sociedad Planetaria (que cofundó en 1980), el Committee for Skeptical Inquiry (fundado en 1976 con su participación) y la serie Cosmos, actualizada por Neil deGrasse Tyson en 2014 y 2020. En 2017, la Marcha por la Ciencia en Washington reunió a más de 100,000 personas portando carteles con frases de Sagan. Su mensaje central permanece sin cambios: el pensamiento crítico no es un lujo académico, sino una herramienta de supervivencia democrática. En un mundo donde la información y la desinformación compiten por nuestra atención, saber pensar con claridad es tan fundamental como saber leer.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El "Pale Blue Dot" (Punto Azul Pálido), una fotografía de la Tierra tomada por la sonda Voyager 1 el 14 de febrero de 1990 desde una distancia de 6,000 millones de kilómetros, fue idea de Carl Sagan. En la imagen, la Tierra aparece como un punto de menos de un píxel de tamaño. Sagan usó esta imagen para promover la humildad intelectual: "Mira de nuevo ese punto. Eso es aquí. Eso es casa. Eso somos nosotros." La foto fue tomada cuando la Voyager ya había completado su misión planetaria principal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de 2019 publicado en el Journal of Research in Personality por Stephanie Anglin demostró que las personas con mayor capacidad de pensamiento analítico (medida por el Cognitive Reflection Test de Shane Frederick, 2005) son significativamente menos susceptibles a las noticias falsas, a las teorías conspirativas y a las ilusiones cognitivas. El estudio encontró que esta relación se mantenía incluso después de controlar por nivel educativo, edad e ideología política, lo que sugiere que el pensamiento crítico es una habilidad cognitiva independiente y entrenable.' },
    ],
    fact: 'Carl Sagan murió el 20 de diciembre de 1996 a los 62 años debido a complicaciones de mielodisplasia, un trastorno de la médula ósea. En sus últimos años, a pesar de su enfermedad, completó "El Mundo y sus Demonios" y "Miles de Millones", publicado póstumamente. En este último libro escribió: "Prefiero la dura verdad a la tranquilizadora fantasía. Y en lo que se refiere al final de toda vida, la dura verdad es esta: soy mortal." Incluso ante la muerte, Sagan se negó a aceptar consuelos sin evidencia y mantuvo la coherencia intelectual que predicó durante toda su vida.',
  },
];

// ——— Skeptic Particle Field (Canvas Background) ————————————————————————
function SkepticField() {
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
      hue: Math.random() > 0.5 ? '91,61,143' : '212,165,53', // purple or gold
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

// ——— Critical Thinking Header ——————————————————————————————————
function CriticalThinkingHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,61,143,0.3))' }}>
        {/* Wisdom arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#saganGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B3D8F','#D4A535','#7A5BAF','#C49225','#9370C4','#B88420','#4A2D6F'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central candle icon */}
        <rect x="296" y="20" width="8" height="16" rx="1" fill="none" stroke="#D4A535" strokeWidth="1.2" opacity="0.5" />
        <path d="M300 10 Q296 16 298 19 Q300 17 302 19 Q304 16 300 10" fill="#D4A535" opacity="0.5" />
        <defs>
          <linearGradient id="saganGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,61,143,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(91,61,143,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">PENSAMIENTO CRÍTICO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ESCEPTICISMO Y CIENCIA CON SAGAN</text>
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
          layoutId="activeDotSaganM5"
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

// ——— Magazine-Style Content Panel ——————————————————————————————————————
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

        {/* Video Section */}
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
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B3D8F, #D4A535)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————
export default function InteractiveInfographic_SaganM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,20,0.88) 0%, rgba(20,12,40,0.82) 40%, rgba(10,10,20,0.9) 100%), url(/assets/sagan/sagan_m5.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,165,53,0.12)',
      boxShadow: '0 0 60px rgba(10,10,20,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <SkepticField />

      <CriticalThinkingHeader />

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
              🏆 ¡Has dominado el arte del Pensamiento Crítico!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Pensador Escéptico
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
