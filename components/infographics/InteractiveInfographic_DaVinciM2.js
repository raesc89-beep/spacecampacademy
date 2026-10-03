'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#D4A843', style = {} }) {
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
  "Isaacson, W. (2017). Leonardo da Vinci: La biografía. Simon & Schuster.",
  "Capra, F. (2007). The Science of Leonardo: Inside the Mind of the Great Genius of the Renaissance. Doubleday.",
  "Kemp, M. (2006). Leonardo da Vinci: Experience, Experiment and Design. Princeton University Press.",
  "O'Malley, C. D., & Saunders, J. B. de C. M. (1952). Leonardo da Vinci on the Human Body. Henry Schuman."
];

const INFOGRAPHIC_NODES = [
  {
    id: "diseccion-secretos",
    bannerImage: '/assets/davinci/infographic_m2/banner_diseccion-secretos.webp',
    title: "Disección y Secretos Ocultos",
    color: '#D4A843',
    btnImage: '/assets/davinci/infographic_m2/btn_diseccion-secretos.webp',
    image: '/assets/davinci/infographic_m2/hero_diseccion-secretos.webp',
    content: [
      "Leonardo da Vinci fue pionero en el estudio detallado de la anatomía humana, abordándolo no solo como artista sino como un verdadero científico. Su motivación inicial era perfeccionar la representación del cuerpo humano en sus obras de arte, comprendiendo la estructura subyacente de músculos y huesos. Sin embargo, su curiosidad insaciable lo llevó mucho más allá de las necesidades artísticas. En una época en la que la disección humana estaba estrictamente regulada y a menudo mal vista por las autoridades religiosas, Leonardo logró obtener acceso a cadáveres en hospitales como el de Santa Maria Nuova en Florencia. Realizó disecciones metódicas y detalladas, documentando cada descubrimiento con ilustraciones de una precisión asombrosa que revolucionarían el conocimiento anatómico.",
      "El enfoque de Leonardo para la disección era sistemático y riguroso. Desarrolló técnicas innovadoras para preservar los tejidos y órganos, y fue uno de los primeros en inyectar cera en las cavidades del cerebro y el corazón para comprender su estructura tridimensional. Sus dibujos anatómicos no eran meros bocetos, sino estudios analíticos profundos que desglosaban el cuerpo humano en sus componentes fundamentales. Estudió la relación entre los músculos, los tendones y los huesos, comprendiendo cómo funcionaban juntos para producir el movimiento. Esta perspectiva biomecánica era revolucionaria y difería radicalmente de los textos médicos de la época, que a menudo se basaban en las autoridades clásicas como Galeno sin verificación empírica.",
      "A lo largo de su vida, Leonardo planeó publicar un tratado exhaustivo sobre anatomía, pero este proyecto, como muchos de sus grandes empeños, nunca llegó a completarse. Sus cuadernos anatómicos, repletos de miles de dibujos y notas escritas en su característica escritura especular, permanecieron inéditos y en gran parte desconocidos durante siglos después de su muerte. Si estos cuadernos hubieran sido publicados en su época, habrían transformado la ciencia médica renacentista. Sus observaciones sobre el corazón, el sistema vascular y la neuroanatomía eran tan avanzadas que no fueron igualadas hasta el siglo XIX por científicos modernos equipados con mejores herramientas.",
      "La meticulosidad de Leonardo en la disección le permitió identificar y describir estructuras anatómicas que habían sido ignoradas o malinterpretadas por sus predecesores. Por ejemplo, fue el primero en proporcionar una descripción precisa y detallada del seno maxilar, así como de la curvatura de la columna vertebral. Sus estudios sobre el corazón fueron particularmente notables; comprendió la función de las válvulas cardíacas y la dinámica del flujo sanguíneo con una claridad que anticipó los descubrimientos de William Harvey más de un siglo después. Leonardo veía el cuerpo humano como una máquina biológica perfecta, una obra maestra de la ingeniería natural.",
      "El legado de las investigaciones anatómicas de Leonardo da Vinci es un testimonio de su genialidad universal. Sus dibujos siguen siendo admirados hoy en día tanto por su innegable belleza artística como por su asombrosa precisión científica. Demostró que el arte y la ciencia no son disciplinas excluyentes, sino enfoques complementarios para comprender la complejidad del mundo natural. A través de su incansable exploración de los secretos ocultos bajo la piel humana, Leonardo estableció un estándar de observación empírica y representación visual que sentó las bases para el estudio moderno de la anatomía humana."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "Leonardo fue el primero en documentar con precisión la anatomía del sistema vascular humano, incluyendo la descripción del envejecimiento de los vasos sanguíneos. Al disecar a un anciano centenario, notó que las arterias se habían engrosado y endurecido, siendo el primer registro histórico de la arteriosclerosis. Sus estudios pioneros revelaron cómo los cambios en la estructura de los vasos sanguíneos afectan el flujo sanguíneo y la salud general, un hallazgo médico asombroso para el siglo XVI." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci desarrolló un método para inyectar cera fundida en los ventrículos del cerebro de un buey? Esta innovadora técnica le permitió obtener un molde tridimensional perfecto de las cavidades cerebrales internas, algo nunca antes logrado. Al hacer esto, desafió la creencia medieval de que los ventrículos albergaban el 'sentido común', el alma y la memoria, demostrando que su verdadera forma era muy diferente a la descrita en los textos médicos clásicos de Galeno." }
    ],
    fact: "Leonardo da Vinci no se conformó con la observación superficial del cuerpo humano; su insaciable curiosidad lo llevó a realizar disecciones anatómicas clandestinas en hospitales de Florencia, Milán y Roma. Con gran precisión y un enfoque científico sin precedentes para su época, desentrañó los secretos ocultos bajo la piel humana, superando los conocimientos de Galeno.",
  },
  {
    id: "vitruvio-proporcion",
    bannerImage: '/assets/davinci/infographic_m2/banner_vitruvio-proporcion.webp',
    title: "El Hombre de Vitruvio",
    color: '#B08D57',
    btnImage: '/assets/davinci/infographic_m2/btn_vitruvio-proporcion.webp',
    image: '/assets/davinci/infographic_m2/hero_vitruvio-proporcion.webp',
    content: [
      "El 'Hombre de Vitruvio', creado por Leonardo da Vinci alrededor del año 1490, es una de las imágenes más reconocidas e icónicas de la historia del arte y la ciencia. Este dibujo a pluma y tinta, basado en los escritos del antiguo arquitecto romano Vitruvio, representa a una figura masculina desnuda en dos posiciones superpuestas, inscrita simultáneamente en un círculo y un cuadrado. La obra es una exploración magistral de las proporciones matemáticas del cuerpo humano y refleja la creencia renacentista de que el hombre es la medida de todas las cosas. Para Leonardo, el cuerpo humano no era solo un tema de estudio anatómico, sino un microcosmos perfecto que reflejaba el orden y la armonía del universo entero.",
      "Vitruvio, en su tratado 'De architectura', había establecido que las proporciones del templo ideal debían reflejar las proporciones del cuerpo humano perfecto. Afirmaba que un cuerpo humano bien formado encajaría perfectamente dentro de un círculo y un cuadrado, las formas geométricas consideradas más perfectas. Leonardo tomó esta premisa y la verificó empíricamente mediante sus propias mediciones anatómicas exhaustivas. A diferencia de otros artistas de la época que también intentaron ilustrar el concepto de Vitruvio, Leonardo no se limitó a forzar la figura en las formas geométricas; ajustó el centro del círculo (el ombligo) y el centro del cuadrado (los genitales) para que correspondieran con precisión a las medidas reales del cuerpo humano.",
      "El texto que acompaña al dibujo, escrito en la característica escritura especular de Leonardo, detalla las proporciones matemáticas exactas del cuerpo humano. Leonardo describe cómo la longitud de los brazos extendidos es igual a la altura del hombre, cómo desde la raíz del cabello hasta la base de la barbilla es una décima parte de la altura, y así sucesivamente. Esta meticulosa cuantificación del cuerpo humano refleja la profunda convicción de Leonardo de que las matemáticas son el lenguaje fundamental de la naturaleza. Para él, comprender las proporciones del cuerpo humano era esencial no solo para el artista, sino también para el arquitecto y el científico.",
      "El Hombre de Vitruvio trasciende su función original como estudio de proporciones y se convierte en un símbolo del ideal humanista del Renacimiento. Representa la unión de lo material y lo espiritual, de la ciencia y el arte. El cuadrado simboliza el mundo material y terrenal, mientras que el círculo representa lo espiritual y lo celestial. Al colocar al hombre en el centro de ambas figuras, Leonardo ilustra la posición única de la humanidad como puente entre el microcosmos y el macrocosmos. Esta visión holística del hombre y el universo es una característica definitoria del pensamiento renacentista.",
      "Hoy en día, el Hombre de Vitruvio se conserva en la Galería de la Academia de Venecia y rara vez se exhibe al público debido a su fragilidad. Sin embargo, su influencia perdura. Ha sido adoptado como un símbolo de la medicina, la salud y el equilibrio en todo el mundo. La imagen nos recuerda continuamente la importancia de la proporción, la simetría y la armonía en todos los aspectos de la vida, y se erige como un testimonio perdurable del genio interdisciplinario de Leonardo da Vinci, quien logró fusionar magistralmente la observación anatómica, el rigor matemático y la expresión artística en una sola obra maestra atemporal."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "El Hombre de Vitruvio de Leonardo es un ejemplo temprano y brillante de ergonomía y antropometría aplicadas. Al codificar las proporciones relativas de los segmentos corporales, Leonardo estableció principios que hoy se utilizan en el diseño industrial, la arquitectura y la ingeniería biomecánica. Sus medidas empíricas confirmaron que, aunque los humanos varían en tamaño absoluto, las relaciones proporcionales entre las partes del cuerpo se mantienen sorprendentemente constantes en poblaciones sanas, un principio clave de la anatomía comparada." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci corrigió los errores del texto original de Vitruvio? Mientras que el arquitecto romano proponía que el centro geométrico tanto del cuadrado como del círculo debía ser el ombligo, Leonardo demostró mediante sus propias mediciones anatómicas que esto era físicamente imposible para un cuerpo humano proporcionado. En su magistral dibujo, Leonardo desplazó el centro del cuadrado hacia los genitales, logrando así que la figura humana encajara perfectamente en ambas formas geométricas de manera realista y armónica." }
    ],
    fact: "El célebre Hombre de Vitruvio es mucho más que un simple dibujo; representa la síntesis perfecta entre la anatomía humana, las matemáticas y la geometría universal. Leonardo exploró profundamente las proporciones áureas, convencido de que el cuerpo humano era un microcosmos que reflejaba la armonía matemática subyacente en todo el universo renacentista.",
  },
  {
    id: "sistema-circulatorio",
    bannerImage: '/assets/davinci/infographic_m2/banner_sistema-circulatorio.webp',
    title: "El Sistema Circulatorio",
    color: '#8C6B4F',
    btnImage: '/assets/davinci/infographic_m2/btn_sistema-circulatorio.webp',
    image: '/assets/davinci/infographic_m2/hero_sistema-circulatorio.webp',
    content: [
      "Leonardo da Vinci dedicó una parte significativa de sus estudios anatómicos a comprender el corazón y el sistema circulatorio, áreas en las que realizó descubrimientos verdaderamente revolucionarios que se adelantaron a su tiempo por siglos. A diferencia de las creencias médicas prevalecientes en el Renacimiento, que estaban fuertemente influenciadas por las teorías clásicas de Galeno, Leonardo basó sus conclusiones en la disección directa y la observación empírica de corazones humanos y animales, particularmente de bueyes y cerdos. Su enfoque meticuloso le permitió desentrañar la compleja mecánica del corazón como un músculo y una bomba, desafiando dogmas que habían permanecido incuestionables durante milenios.",
      "Uno de los logros más notables de Leonardo fue su profunda comprensión de las válvulas cardíacas, especialmente la válvula aórtica. Para estudiar cómo fluía la sangre a través del corazón, Leonardo aplicó principios de hidrodinámica que había desarrollado en sus estudios sobre el agua. Construyó un modelo de cristal de la válvula aórtica y bombeó agua con semillas de hierba a través de él para visualizar las corrientes y los vórtices. Observó que la sangre, al pasar por la válvula, creaba remolinos que ayudaban a cerrar las valvas de la válvula de manera eficiente y hermética tras cada contracción, un descubrimiento aerodinámico asombroso.",
      "Los dibujos de Leonardo del corazón humano son de una precisión y belleza extraordinarias. Ilustró detalladamente los ventrículos, las aurículas, las arterias coronarias y las complejas redes de vasos capilares. Reconoció que el corazón era un músculo potente y no un simple receptáculo de 'espíritus vitales', como sostenía la tradición galénica. Fue el primero en describir y dibujar la red de vasos coronarios que irrigan el propio músculo cardíaco, comprendiendo que el corazón necesitaba su propio suministro de sangre para funcionar continuamente a lo largo de la vida de una persona.",
      "A pesar de sus increíbles descubrimientos, Leonardo no llegó a formular una teoría completa de la circulación sanguínea continua, un logro que correspondería al médico inglés William Harvey en el siglo XVII. Sin embargo, las observaciones de Leonardo sobre la dinámica de fluidos dentro del corazón y la función de las válvulas eran correctas y demostraban una intuición científica sin precedentes. Sus estudios revelaron cómo las presiones hidráulicas y la mecánica de fluidos rigen el funcionamiento del sistema cardiovascular, fusionando sus conocimientos de ingeniería con la anatomía biológica.",
      "El genio de Leonardo en el estudio del sistema circulatorio radica en su capacidad para cruzar los límites disciplinarios. Aplicó principios de la física, la hidrodinámica y la ingeniería mecánica para comprender un órgano biológico complejo. Sus cuadernos anatómicos, con sus descripciones detalladas y sus impresionantes ilustraciones tridimensionales, son un testimonio de su mente inquisitiva y su compromiso inquebrantable con la verdad empírica. Hoy en día, los cardiólogos modernos siguen maravillándose ante la precisión de los dibujos de Leonardo y su asombrosa capacidad para deducir el funcionamiento interno del corazón humano con tan solo sus ojos y su brillante mente analítica."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "La observación de Leonardo sobre los vórtices sanguíneos (remolinos) en el seno aórtico (justo por encima de la válvula aórtica) fue confirmada científicamente en la década de 1960 utilizando imágenes de contraste y resonancia magnética. Leonardo dedujo correctamente que estos vórtices de fluido son esenciales para empujar las cúspides de la válvula hacia su cierre, evitando el reflujo de sangre hacia el corazón. Este principio de dinámica de fluidos es fundamental en el diseño de las válvulas cardíacas protésicas modernas." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci fue la primera persona en la historia en describir detalladamente una enfermedad cardíaca coronaria y el envejecimiento cardiovascular? Durante la disección de un hombre de 100 años en el hospital de Santa Maria Nuova, Leonardo observó y dibujó las arterias coronarias obstruidas y engrosadas. Concluyó que el anciano había muerto no por enfermedad evidente, sino por una debilidad por la falta de sangre a la arteria que nutre el corazón, describiendo esencialmente la arteriosclerosis coronaria." }
    ],
    fact: "Mucho antes de que William Harvey describiera formalmente la circulación sanguínea, Leonardo da Vinci realizó investigaciones asombrosamente precisas sobre el corazón y el sistema cardiovascular. A través de la inyección de cera caliente, logró modelar y comprender el funcionamiento de las válvulas cardíacas con gran exactitud.",
  },
  {
    id: "musculos-movimiento",
    bannerImage: '/assets/davinci/infographic_m2/banner_musculos-movimiento.webp',
    title: "Músculos y Movimiento",
    color: '#C9A24B',
    btnImage: '/assets/davinci/infographic_m2/btn_musculos-movimiento.webp',
    image: '/assets/davinci/infographic_m2/hero_musculos-movimiento.webp',
    content: [
      "La profunda fascinación de Leonardo da Vinci por el movimiento lo llevó a investigar exhaustivamente el sistema muscular y esquelético humano. Para él, el cuerpo humano era la máquina más perfecta de la naturaleza, y deseaba comprender íntimamente sus principios mecánicos fundamentales. A través de innumerables disecciones, Leonardo desolló pacientemente capas de piel y fascia para revelar la intrincada red de músculos, tendones y ligamentos que hacen posible el movimiento. Su enfoque era el de un ingeniero biomecánico avant la lettre; analizaba las articulaciones como bisagras, los huesos como palancas y los músculos como las fuerzas motrices que impulsaban el sistema completo.",
      "Los dibujos musculares de Leonardo son famosos por su claridad, detalle y dinamismo. No se limitaba a representar los músculos en reposo, sino que intentaba ilustrar cómo cambiaban de forma y tensión durante diferentes acciones y posturas. Utilizó la técnica del dibujo 'en alambres' o hilos, representando los músculos como líneas de fuerza o tensores, lo que le permitía visualizar claramente la dirección de la tracción muscular y cómo múltiples músculos cooperaban de forma agonista y antagonista para estabilizar o mover una articulación. Esta forma de diagramación anatómica fue revolucionaria e inmensamente influyente en la educación médica posterior.",
      "Una de las áreas de estudio más detalladas de Leonardo fue la anatomía del hombro y el brazo humano. A través de múltiples vistas transversales y perspectivas rotadas, deconstruyó la compleja articulación del hombro, demostrando cómo los músculos interactúan para permitir una amplia gama de movimientos en múltiples planos. Comprendió el papel crucial de los músculos rotadores y cómo los tendones transmiten la fuerza a través de poleas naturales formadas por los huesos y ligamentos. Su disección del brazo y la mano reveló la intrincada mecánica que permite tanto la fuerza bruta como la motricidad fina extrema.",
      "Leonardo también dedicó un gran esfuerzo a estudiar los músculos de la cara y el cuello, buscando comprender la base anatómica de la expresión humana. Deseaba capturar en sus pinturas no solo la apariencia física, sino también los 'movimientos del alma', es decir, las emociones internas reflejadas en el rostro. Sus disecciones revelaron los delicados músculos faciales responsables de la risa, el llanto, el ceño fruncido y otras expresiones. Esta profunda comprensión anatómica le permitió dotar a sus figuras pictóricas de una vitalidad y una profundidad psicológica que marcaron un antes y un después en la historia del arte renacentista.",
      "El trabajo de Leonardo en biomecánica y anatomía muscular sentó precedentes que resuenan hasta el día de hoy. Fue el primero en aplicar sistemáticamente los principios de la palanca, la fuerza y la tracción al cuerpo humano. Sus ilustraciones anatómicas, que combinaban la precisión científica con un virtuosismo artístico incomparable, demostraron que la observación directa y el análisis mecánico eran herramientas indispensables para comprender la complejidad de la vida. Leonardo da Vinci no solo describió la anatomía del movimiento; capturó su esencia mecánica con una claridad que sigue inspirando a anatomistas, kinesiólogos y artistas contemporáneos."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "Leonardo fue pionero en aplicar los principios de la mecánica, específicamente las palancas, a la anatomía humana. Clasificó correctamente las articulaciones del cuerpo humano según el tipo de palanca mecánica que representan (primer, segundo o tercer género). Reconoció que los músculos siempre funcionan traccionando (tirando) y nunca empujando, y documentó cómo la disposición de las inserciones musculares respecto al eje de rotación de la articulación determina la ventaja mecánica, un principio fundamental de la biomecánica moderna." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci comparó frecuentemente los tendones del cuerpo humano con los cables y poleas de las máquinas y barcos que él mismo diseñaba? En sus cuadernos, a menudo dibujaba las extremidades humanas omitiendo el volumen de los músculos y representando únicamente líneas de fuerza para ilustrar la mecánica pura del movimiento. Esta técnica de diagramación abstracta es notablemente similar a los modelos de cables y resortes utilizados en los programas modernos de simulación biomecánica y animación 3D." }
    ],
    fact: "La fascinación de Leonardo por el movimiento se reflejó intensamente en sus meticulosos estudios del sistema muscular y esquelético. Documentó con un detalle sin precedentes cómo los músculos, tendones y articulaciones trabajan en perfecta coordinación para generar el movimiento humano y animal.",
  },
  {
    id: "cerebro-dibujos",
    bannerImage: '/assets/davinci/infographic_m2/banner_cerebro-dibujos.webp',
    title: "Mapeando el Cerebro",
    color: '#9C7E5A',
    btnImage: '/assets/davinci/infographic_m2/btn_cerebro-dibujos.webp',
    image: '/assets/davinci/infographic_m2/hero_cerebro-dibujos.webp',
    content: [
      "La exploración del cerebro humano por parte de Leonardo da Vinci estuvo profundamente motivada por su deseo de descubrir la ubicación anatómica del 'sensus communis' o sentido común, donde creía que convergían todos los sentidos periféricos y donde residía el alma humana. Durante la Edad Media y el Renacimiento temprano, el conocimiento del cerebro estaba dominado por teorías filosóficas y teológicas más que por la observación anatómica directa. Leonardo rompió con esta tradición especulativa al aplicar su riguroso método empírico de disección y experimentación al sistema nervioso central, buscando evidencia física de las facultades mentales.",
      "Para comprender la compleja anatomía interna del cerebro, Leonardo inventó una técnica verdaderamente revolucionaria: inyectar cera fundida caliente en las cavidades internas (ventrículos) del cerebro de un buey recién sacrificado. Una vez que la cera se enfriaba y solidificaba, retiraba cuidadosamente el tejido cerebral circundante, revelando por primera vez en la historia un molde tridimensional preciso del sistema ventricular. Este experimento audaz demostró definitivamente que la forma de los ventrículos era completamente diferente a los esquemas esféricos simples postulados por la tradición médica clásica de Galeno y Avicena.",
      "Las detalladas ilustraciones de Leonardo de los nervios craneales y el cerebro revelan un esfuerzo pionero por rastrear las vías neuronales desde los órganos sensoriales periféricos, como los ojos y los oídos, hasta el cerebro. Investigó extensamente el nervio óptico, intentando comprender cómo las impresiones visuales se transmitían y procesaban. Aunque su comprensión fisiológica estaba limitada por la falta de conocimiento sobre la electricidad y la neuroquímica celular, su enfoque anatómico topográfico sentó las bases para el estudio de la neuroanatomía, mapeando las estructuras físicas que sustentan la percepción y el intelecto.",
      "Además de los ventrículos, Leonardo estudió minuciosamente el sistema nervioso periférico y la médula espinal. Fue uno de los primeros anatomistas en reconocer que la médula espinal era la principal vía de transmisión de señales nerviosas entre el cerebro y el resto del cuerpo. Realizó experimentos en ranas que demostraron que la destrucción de la médula espinal causaba la muerte inmediata, refutando las teorías que situaban el principio vital exclusivamente en el corazón o el cerebro de forma aislada. Comprendió la integración sistémica del sistema nervioso humano.",
      "El legado de los estudios neuroanatómicos de Leonardo es un testimonio temprano del enfoque reduccionista e investigativo en la neurociencia. Sus audaces experimentos con cera inyectada y sus minuciosos dibujos topográficos demostraron que el cerebro y el sistema nervioso podían estudiarse mediante la observación anatómica rigurosa, despojando al intelecto de su misticismo medieval. Aunque sus hallazgos permanecieron ocultos durante siglos, la modernidad de su enfoque experimental para mapear el cerebro humano lo consolida como una figura fundacional y visionaria en la historia de las ciencias neurológicas."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "El experimento de inyección de cera de Leonardo para modelar los ventrículos cerebrales es considerado uno de los primeros usos documentados de un medio de contraste solidificante en la historia de la anatomía. Esta técnica, de inyectar resinas, ceras o polímeros en cavidades anatómicas o sistemas vasculares para luego corroer el tejido circundante y obtener un molde exacto tridimensional (técnicas de corrosión), sigue siendo una herramienta fundamental en la anatomía y la morfología comparada contemporánea." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que a pesar de sus brillantes descubrimientos anatómicos, Leonardo da Vinci nunca abandonó por completo algunas creencias medievales? Aunque demostró que los ventrículos tenían una forma diferente a la postulada por la teoría tradicional de las tres celdas, continuó asignando facultades mentales específicas a diferentes regiones ventriculares (memoria, imaginación, sentido común), intentando reconciliar obstinadamente su revolucionaria evidencia anatómica con la filosofía escolástica imperante en su época." }
    ],
    fact: "En su afán por descubrir el asiento del alma y los mecanismos de la percepción, Leonardo incursionó audazmente en la neuroanatomía. Desarrolló técnicas innovadoras para inyectar cera en los ventrículos cerebrales, logrando realizar los primeros moldes tridimensionales precisos del sistema ventricular.",
  },
  {
    id: "anatomia-arte",
    bannerImage: '/assets/davinci/infographic_m2/banner_anatomia-arte.webp',
    title: "Anatomía y Arte",
    color: '#A88B5E',
    btnImage: '/assets/davinci/infographic_m2/btn_anatomia-arte.webp',
    image: '/assets/davinci/infographic_m2/hero_anatomia-arte.webp',
    content: [
      "Para Leonardo da Vinci, la anatomía y el arte no eran dos esferas de conocimiento separadas, sino ramas entrelazadas del mismo árbol de la sabiduría. Su estudio riguroso del cuerpo humano fue impulsado inicialmente por el deseo de perfeccionar su pintura, pero rápidamente evolucionó hacia una pasión científica independiente. Leonardo creía firmemente que un artista verdadero debía poseer un conocimiento íntimo de los músculos, huesos y tendones subyacentes para poder representar la superficie de la piel y el movimiento de manera convincente y natural. Esta filosofía transformó radicalmente el enfoque del arte renacentista hacia el realismo extremo.",
      "La influencia de sus investigaciones anatómicas es evidente en toda su obra pictórica madura. Obras maestras como la figura de San Jerónimo en el desierto revelan un conocimiento profundo de la estructura ósea y muscular del cuello y los hombros en tensión. Leonardo criticaba a los artistas que dibujaban figuras humanas que parecían 'sacos de nueces' o manojos de rábanos, es decir, músculos exagerados e incorrectamente ubicados. Él argumentaba que solo revelando sutilmente la estructura interna adecuada, la figura externa podría poseer gracia, proporción y veracidad biológica.",
      "Además de la osteología y la miología, los estudios anatómicos de Leonardo enriquecieron su dominio de las proporciones, la perspectiva y la iluminación. Su comprensión de la estructura del ojo y los nervios ópticos influyó profundamente en su teoría de la óptica y el desarrollo del 'sfumato', esa técnica sutil de difuminar los contornos mediante transiciones suaves de luz y sombra. Leonardo comprendió que el ojo humano no ve contornos nítidos y líneas duras en la naturaleza, y aplicó este conocimiento fisiológico para dotar a obras como la Mona Lisa de su atmósfera misteriosa y su asombroso realismo tridimensional.",
      "La integración de arte y anatomía en Leonardo también se manifestó en su capacidad para representar las emociones humanas ('los movimientos del alma'). Sus detalladas disecciones de los músculos faciales le proporcionaron la base estructural para pintar expresiones complejas y matizadas. En 'La Última Cena', cada apóstol reacciona a las palabras de Cristo con una postura y expresión facial únicas y biológicamente precisas, impulsadas por un conocimiento profundo de cómo la tensión emocional se traduce en contracción muscular física. La ciencia anatómica sirvió como herramienta directa para la empatía y la narrativa artística.",
      "El legado de la fusión entre anatomía y arte de Leonardo da Vinci sentó un precedente duradero. Elevó la ilustración anatómica de simples esquemas toscos a un nivel de precisión científica y belleza estética sin igual. Demostró definitivamente que el rigor empírico y la sensibilidad artística pueden potenciarse mutuamente. Los artistas posteriores, desde Miguel Ángel hasta los maestros del Barroco, se basarían en este enfoque integrado. Leonardo demostró que ver el mundo con la precisión analítica de un científico no disminuye su misterio y belleza, sino que los amplifica y los hace eternos en el lienzo."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "Leonardo inventó el uso de vistas ortogonales y secciones transversales múltiples en la ilustración anatómica, técnicas directamente derivadas de su experiencia en dibujo de ingeniería y arquitectura. Al dibujar una articulación o un órgano desde múltiples ángulos simultáneamente (anterior, posterior, lateral y en sección transversal), proporcionó una comprensión tridimensional completa de la anatomía que no se había logrado nunca antes en los textos médicos tradicionales, sentando las bases de la representación médica moderna." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci desenterraba cadáveres de cementerios por la noche y los llevaba a su estudio para realizar disecciones a escondidas? En una época sin refrigeración, trabajaba en condiciones espantosas de descomposición y olor, a menudo solo iluminado por la luz tenue de las velas. Su dedicación extrema al conocimiento lo llevó a arriesgarse a ser excomulgado por la Iglesia y a soportar un ambiente de trabajo macabro y peligroso para la salud, todo en nombre del avance de la ciencia anatómica." }
    ],
    fact: "La profunda inmersión de Leonardo da Vinci en el estudio anatómico transformó radicalmente su producción artística, dotando a sus pinturas de un realismo y una vitalidad sin precedentes en la historia del arte.",
  },
  {
    id: "legado-medicina",
    bannerImage: '/assets/davinci/infographic_m2/banner_legado-medicina.webp',
    title: "El Legado Perdido",
    color: '#E0B860',
    btnImage: '/assets/davinci/infographic_m2/btn_legado-medicina.webp',
    image: '/assets/davinci/infographic_m2/hero_legado-medicina.webp',
    content: [
      "Uno de los mayores misterios y tragedias en la historia de la ciencia es cómo el asombroso trabajo anatómico de Leonardo da Vinci permaneció oculto y sin publicar durante casi cuatro siglos. Al morir en 1519 en Francia, Leonardo legó todos sus manuscritos, cuadernos y dibujos a su fiel discípulo, Francesco Melzi. Melzi guardó cuidadosamente este inmenso tesoro intelectual en su villa en Italia durante casi cincuenta años, pero carecía de la capacidad científica para organizar y publicar el complejo y enciclopédico material, escrito en una escritura especular críptica y densa.",
      "Tras la muerte de Melzi, los inestimables manuscritos de Leonardo fueron dispersados, vendidos a pedazos, robados y fragmentados por coleccionistas que valoraban los dibujos principalmente como obras maestras estéticas más que como documentos científicos revolucionarios. Gran parte de los cuadernos anatómicos terminaron en la Royal Collection del Castillo de Windsor en Inglaterra en el siglo XVII, donde permanecieron acumulando polvo en las bibliotecas reales, ignorados en gran medida por la comunidad científica y médica del mundo durante cientos de años.",
      "Como resultado de este trágico ocultamiento histórico, el desarrollo de la medicina y la anatomía siguió su curso sin el beneficio de las profundas ideas empíricas de Leonardo. Hitos fundamentales en la historia de la medicina, como la precisa descripción del sistema muscular por Andreas Vesalio en 1543 (en su obra magna 'De humani corporis fabrica') o el descubrimiento de la circulación sanguínea continua por William Harvey en 1628, tuvieron que ser logrados independientemente, redescubriendo verdades que Leonardo ya había documentado minuciosamente con pluma y tinta muchas décadas antes.",
      "No fue hasta finales del siglo XVIII y, con mayor ímpetu, a finales del siglo XIX y principios del XX, cuando los eruditos comenzaron finalmente a transcribir, traducir y publicar sistemáticamente los cuadernos anatómicos de Leonardo da Vinci. Cuando la comunidad científica moderna examinó estos documentos por primera vez, el impacto fue monumental. Profesores de anatomía y médicos se maravillaron ante la precisión tridimensional de sus ilustraciones y la modernidad de su enfoque biomecánico y empírico. Se reconoció que, de haberse publicado en su época, Leonardo habría transformado radicalmente la trayectoria de la ciencia médica europea.",
      "Hoy en día, el legado anatómico de Leonardo da Vinci se celebra no solo como un logro histórico insuperable, sino como el ejemplo definitivo de la curiosidad interdisciplinaria. Sus dibujos siguen siendo exhibidos en todo el mundo y son estudiados en las facultades de medicina contemporáneas por su inigualable claridad pedagógica. Nos recuerdan que la verdadera genialidad a menudo reside en la capacidad de observar la naturaleza con atención inquebrantable y sin prejuicios. Aunque su impacto en la medicina de su tiempo fue mínimo, su legado póstumo lo consagra como uno de los más grandes científicos y anatomistas que el mundo haya conocido jamás."
    ],
    expandables: [
      { label: "Dato Científico", icon: "atom", text: "La precisión de las observaciones anatómicas de Leonardo es tal que los cardiólogos y cirujanos modernos han utilizado sus bocetos originales de las válvulas cardíacas y la dinámica de fluidos como inspiración para diseñar mejores válvulas protésicas artificiales. Su concepto de usar un material flexible para imitar las valvas naturales y su comprensión de los vórtices sanguíneos que facilitan el cierre hermético son principios directamente aplicables a la ingeniería biomédica contemporánea del siglo XXI." },
      { label: "¿Sabías que...?", icon: "sparkles", text: "¿Sabías que Leonardo da Vinci planeaba colaborar en la publicación de su gran tratado de anatomía con Marcantonio della Torre, un destacado profesor de anatomía de la Universidad de Pavía? Desafortunadamente, Marcantonio murió prematuramente a causa de la peste bubónica en 1511, antes de que el proyecto pudiera materializarse. La pérdida de este colaborador científico crucial es a menudo citada por los historiadores como la razón principal por la cual Leonardo nunca logró organizar y publicar su obra anatómica magna en vida." }
    ],
    fact: "El inmenso legado anatómico de Leonardo da Vinci permaneció oculto durante siglos en sus cuadernos privados, retrasando trágicamente el avance de la medicina. Sin embargo, cuando sus miles de dibujos fueron finalmente analizados, el mundo quedó atónito ante su modernidad.",
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
      hue: Math.random() > 0.5 ? '212,168,67' : '140,107,79', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#davinciGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#D4A843", "#B08D57", "#8C6B4F", "#C9A24B", "#9C7E5A", "#A88B5E", "#E0B860"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#D4A843" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#D4A843" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="davinciGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.2)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ANATOMÍA DEL UNIVERSO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,168,67,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LEONARDO DA VINCI · RENACIMIENTO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,168,67,0.2)'}`,
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
          layoutId="activeDotDaVinciM2"
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
      border: '1px solid rgba(212,168,67,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A843', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A843, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,168,67,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A843', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_DaVinciM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/davinci/davinci_m2.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,168,67,0.12)',
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
            textAlign: 'center', color: 'rgba(212,168,67,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,168,67,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,168,67,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A843', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has completado Anatomía del Universo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia del Renacimiento
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
