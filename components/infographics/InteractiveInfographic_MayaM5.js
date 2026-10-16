'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Calendar themed) ─────────────────────────

function DecoGearWheel({ size = 70, color = '#1565C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.3, ...style }}>
      <circle cx="35" cy="50" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="35" cy="50" r="8" fill="none" stroke={color} strokeWidth="1" />
      {[...Array(12)].map((_, i) => (
        <rect key={'sm'+i} x="33" y="27" width="4" height="6" fill={color} transform={`rotate(${i * 30} 35 50)`} />
      ))}
      <circle cx="70" cy="50" r="14" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="70" cy="50" r="5" fill="none" stroke={color} strokeWidth="1" />
      {[...Array(8)].map((_, i) => (
        <rect key={'lg'+i} x="68" y="33" width="4" height="6" fill={color} transform={`rotate(${i * 45} 70 50)`} />
      ))}
      <path d="M55 50 L56 50" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoZeroShell({ size = 70, color = '#FFB300', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 100 60" style={{ opacity: 0.3, ...style }}>
      <ellipse cx="50" cy="30" rx="40" ry="20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 30 Q50 10 80 30" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M25 30 Q50 20 75 30" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 30 Q50 25 70 30" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="40" r="2" fill={color} />
      <circle cx="40" cy="38" r="1.5" fill={color} />
      <circle cx="60" cy="38" r="1.5" fill={color} />
    </svg>
  );
}

function DecoDotBar({ size = 70, color = '#00897B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity: 0.3, ...style }}>
      <circle cx="20" cy="20" r="6" fill={color} />
      <circle cx="40" cy="20" r="6" fill={color} />
      <circle cx="60" cy="20" r="6" fill={color} />
      <rect x="10" y="40" width="60" height="8" rx="4" fill={color} />
      <rect x="10" y="55" width="60" height="8" rx="4" fill={color} />
    </svg>
  );
}

function DecoLongCount({ size = 70, color = '#BF360C', style = {} }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 60 120" style={{ opacity: 0.3, ...style }}>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(10, ${i * 28 + 5})`}>
          <rect x="0" y="0" width="40" height="22" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="10" cy="11" r="3" fill={color} />
          <rect x="18" y="9" width="16" height="4" rx="2" fill={color} />
        </g>
      ))}
    </svg>
  );
}

function DecoSpiralTime({ size = 70, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity: 0.3, ...style }}>
      <path d="M50 50 m0 -40 a40 40 0 1 1 -1 0 a30 30 0 1 0 1 0 a20 20 0 1 1 -1 0 a10 10 0 1 0 1 0" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="50" cy="50" r="2" fill={color} />
      <circle cx="90" cy="50" r="3" fill={color} />
      <circle cx="20" cy="50" r="3" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'rueda-mecanismo': [DecoGearWheel, DecoSpiralTime, DecoGearWheel],'fecha-completa': [DecoDotBar, DecoGearWheel, DecoZeroShell],
  'ciclo-52-anos': [DecoSpiralTime, DecoGearWheel, DecoDotBar],'cuenta-larga': [DecoLongCount, DecoZeroShell, DecoDotBar],
  'matematica-base-20': [DecoZeroShell, DecoDotBar, DecoLongCount],
  'engranajes-cosmicos': [DecoGearWheel, DecoSpiralTime, DecoLongCount],'precision-astronomica': [DecoSpiralTime, DecoZeroShell, DecoGearWheel], }; const BIBLIOGRAPHY = ['Coe, M.D. (2011). The Maya, Thames & Hudson',
  'Rice, P.M. (2007). Maya Calendar Origins, University of Texas Press',
  'Stuart, D. (2011). The Order of Days: The Maya World and the Truth About 2012, Harmony Books',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Lounsbury, F.G. (1978). Maya Numeration, Computation, and Calendrical Astronomy, DSB 15'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "rueda-mecanismo",
    "bannerImage": "/assets/maya/infographic_m5/banner_calendario-comparado.webp",
    "title": "El Mecanismo",
    "color": "#1565C0",
    "btnImage": "/assets/maya/infographic_m5/btn_rueda-mecanismo.jpg",
    "image": "/assets/maya/infographic_m5/hero_rueda-mecanismo.jpg",
    "content": [
      "La Rueda Calendárica constituye uno de los logros matemáticos y conceptuales más admirables de la civilización mesoamericana. Este ingenioso sistema cronológico integraba los dos calendarios fundamentales mayas en un solo mecanismo continuo y sincronizado: el ciclo sagrado adivinatorio Tzolk'in de 260 días y el ciclo solar civil Haab' de 365 días. Su funcionamiento conjunto permitía a los antiguos escribas registrar fechas inequívocas a lo largo de más de medio siglo de historia terrenal.",
      "Para visualizar el funcionamiento de la Rueda Calendárica, los arqueólogos modernos suelen recurrir a la metáfora visual de dos engranajes mecánicos dentados que giran de forma acoplada. Una rueda menor de 260 dientes (correspondiente a las combinaciones numéricas y signos del Tzolk'in) engrana con una rueda mayor de 365 dientes (correspondiente a los días y meses del Haab'). Cada jornada transcurrida implicaba el avance simultáneo de un diente en ambos engranajes sin detenerse jamás.",
      "Dado que el número 260 y el número 365 comparten únicamente al número 5 como su máximo común divisor (260 = 5 × 52 y 365 = 5 × 73), el mínimo común múltiplo entre ambos ciclos se calcula mediante la fórmula matemática: (260 × 365) ÷ 5 = 18,980 días solares. Esto significa que debían transcurrir exactamente 18,980 días enteros para que una combinación específica del Tzolk'in y del Haab' volviera a coincidir en la misma posición de contacto inicial.",
      "Al dividir estos 18,980 días entre los dos ciclos involucrados, se descubre una prodigiosa armonía aritmética cerrada: 18,980 días equivalen con total exactitud a 73 revoluciones completas del calendario sagrado Tzolk'in (73 × 260 = 18,980) y a exactamente 52 revoluciones del calendario solar civil Haab' (52 × 365 = 18,980). Este intervalo cerrado de 52 años solares constituía la unidad temporal básica de la historia mesoamericana compartida.",
      "Ninguna persona común en el mundo maya llegaba a presenciar en su vida dos veces la misma fecha idéntica de la Rueda Calendárica, a menos que alcanzara una longevidad excepcional superior a los 52 años solares. Por esta razón, dentro del horizonte de una vida humana ordinaria, este sistema de doble engranaje ofrecía un fechamiento exacto y sin ambigüedades para registrar nacimientos, ascensos al trono real, acuerdos matrimoniales y campañas bélicas dinásticas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La proporción matemática de 73 ciclos de Tzolk'in por cada 52 años de Haab' es una constante inmutable que no requiere fracciones decimales. El número 73 es un número primo absoluto, lo que garantizaba a los matemáticos mayas que no se produjeran subciclos intermedios que pudieran generar duplicidades erróneas en el fechamiento histórico de los monumentos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los arqueoastrónomos han comprobado que el periodo de 18,980 días de la Rueda Calendárica no solo sincroniza el Tzolk'in y el Haab', sino que también es conmensurable con el ciclo sinódico de Venus: 65 revoluciones de Venus de 584 días suman exactamente 37,960 días, equivalentes a dos Ruedas Calendáricas completas (2 × 18,980 = 37,960 días = 104 años)."
      }
    ],
    "fact": "La Rueda Calendárica integra el Tzolk'in (260 días) con el Haab' (365 días) en un periodo continuo de 18,980 días solares, cifra que equivale con exactitud matemática a 73 ciclos del calendario sagrado y a 52 años solares civiles completos, conformando el siglo mesoamericano de 52 años, tras el cual se celebraba el crucial ritual del Fuego Nuevo para garantizar la continuidad del cosmos y el renacimiento solar."
  },
  {
    "id": "fecha-completa",
    "bannerImage": "/assets/maya/infographic_m5/banner_daykeepers.webp",
    "title": "Una Fecha Completa",
    "color": "#FFB300",
    "btnImage": "/assets/maya/infographic_m5/btn_fecha-completa.jpg",
    "image": "/assets/maya/infographic_m5/hero_fecha-completa.jpg",
    "content": [
      "En las inscripciones monumentales que decoran las estelas de piedra, los altares y los paneles de los templos mayas, una fecha formal de la Rueda Calendárica se expresaba mediante la yuxtaposición coordinada de cuatro elementos léxicos: el número y el signo del Tzolk'in, seguidos por el número del día y el nombre del mes en el Haab'. Un ejemplo emblemático de esta fórmula es la célebre fecha sagrada «4 Ajaw 8 Kumk'u», punto de anclaje de la cosmología clásica.",
      "Debido a la relación aritmética interna entre ambos sistemas calendáricos, no cualquier día del Tzolk'in podía combinarse de forma libre con cualquier fecha del Haab'. Dado que el año solar de 365 días dividido entre los 20 signos del Tzolk'in arroja un cociente de 18 con un residuo de 5 días (365 ÷ 20 = 18, con resto 5), cada nuevo año civil de 365 días comenzaba forzosamente 5 posiciones más adelante en la lista de los veinte días sagrados del Tzolk'in.",
      "Esta ley aritmética inmutable restringía el inicio de cada año solar del Haab' (el día asiento del mes Pop) a únicamente cuatro signos específicos de la lista de veinte días. Estos cuatro signos elegidos por la matemática cósmica eran conocidos por los sacerdotes como los «Cargadores del Año» (K'uch K'ab'al). En el periodo Clásico maya, los cuatro cargadores anuales eran invariablemente los días Ik', Manik', Eb y Kab'an, espaciados exactamente por cinco posiciones.",
      "Cada uno de estos cuatro Cargadores del Año gobernaba las energías espirituales y climáticas durante el transcurso de los 365 días de su mandato anual, asociándose a su vez con uno de los cuatro rumbos cardinales del universo y con sus respectivos colores sagrados. Un año regido por el cargador Ik' (viento) presagiaba tormentas y renovación, mientras que un año cargado por Manik' (venado) auguraba éxito en las expediciones de caza y estabilidad política.",
      "La precisión al registrar una fecha completa de la Rueda Calendárica era tal que los epigrafistas modernos pueden determinar con certeza matemática absoluta el día correspondiente en nuestro calendario gregoriano cuando esta fecha se acompaña de una inscripción de la Cuenta Larga. Este rigor epigráfico ha permitido reconstruir con minuciosidad las biografías de reyes, las fechas de guerras fratricidas y los tratados de paz del mundo maya clásico."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante el periodo Posclásico maya en Yucatán, los escribas modificaron el cómputo de los Cargadores del Año adelantando la cuenta en un día, lo que transformó los cuatro signos regentes clásicos (Ik', Manik', Eb y Kab'an) en los signos K'an, Muluk, Ix y Kawak, una reforma calendárica descrita por fray Diego de Landa en su crónica colonial de 1566."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "De las 18,980 combinaciones posibles de una Rueda Calendárica, solo 18,980 ÷ (260 × 365) = 1/5 de las combinaciones teóricas son aritméticamente válidas, ya que un signo del Tzolk'in con un coeficiente determinado solo puede emparejarse con cuatro posiciones numéricas específicas dentro de los meses del Haab'."
      }
    ],
    "fact": "Una fecha formal de la Rueda Calendárica articula cuatro datos (ejemplo: 4 Ajaw 8 Kumk'u) y está gobernada por uno de los cuatro Cargadores del Año, los únicos signos del Tzolk'in matemáticamente capaces de iniciar el año Haab' debido al residuo de 5 días en la división vigesimal (365 mod 20 = 5), estableciendo una alternancia cíclica perfecta que guiaba los augurios imperiales y la liturgia sacerdotal de las dinastías clásicas."
  },
  {
    "id": "ciclo-52-anos",
    "bannerImage": "/assets/maya/infographic_m5/banner_fin-baktun.webp",
    "title": "El Ciclo de 52 Años",
    "color": "#00897B",
    "btnImage": "/assets/maya/infographic_m5/btn_ciclo-52-anos.jpg",
    "image": "/assets/maya/infographic_m5/hero_ciclo-52-anos.jpg",
    "content": [
      "La culminación de un ciclo completo de 52 años de la Rueda Calendárica representaba el acontecimiento civil y religioso más solemne y trascendental de toda la vida mesoamericana. Para los pueblos mayas y sus vecinos contemporáneos del altiplano mexicano, el cierre de este intervalo de 18,980 días no era una simple efeméride conmemorativa, sino un momento de profunda angustia cósmica en el que el Sol y el universo entero se enfrentaban a la posibilidad real de su extinción.",
      "Existía la creencia compartida de que los dioses creadores concedían la luz y el movimiento a los astros únicamente por periodos sucesivos de 52 años solares. Al llegar el último día del ciclo, el mundo pendía de un hilo: si los seres humanos no realizaban las ofrendas rituales prescritas por los antepasados, el Sol podía no renacer al amanecer siguiente y los monstruos de la oscuridad descenderían desde el cielo nocturno para devorar a la humanidad entera en una noche eterna.",
      "Para conjurar este peligro apocalíptico, las ciudades mayas celebraban la imponente ceremonia del Fuego Nuevo. Al caer la tarde final del ciclo de 52 años, todos los fuegos de los hogares y templos de la ciudad eran rigurosamente extinguidos. La población arrojaba al fondo de los basureros y barrancas sus vasijas de cocina, sus manos de metate para moler maíz y sus estatuillas de deidades protectoras, simbolizando el final definitivo y la purificación del tiempo fenecido.",
      "En la cumbre del templo piramidal más elevado del reino, mientras las estrellas de la constelación de las Pléyades cruzaban el meridiano cenital a la medianoche, los sacerdotes de mayor jerarquía taladraban con vigor dos maderas secas sobre el pecho de un guerrero ofrendado. Al brotar la primera chispa sagrada, un clamor de júbilo recorría la urbe: el cosmos había renovado su pacto vital con la humanidad y se garantizaban 52 nuevos años de vida sobre la faz de la Tierra.",
      "Desde esa llama primordial encendida en la cima del templo, mensajeros reales dotados con antorchas de ocote y resina de pino corrían a toda velocidad por los caminos sacbeob para repartir el fuego sagrado a los altares subsidiarios y a cada uno de los fogones familiares. Asimismo, los reyes aprovechaban esta renovación cósmica para iniciar grandes obras arquitectónicas, cubriendo las viejas pirámides con una nueva capa monumental de caliza para inaugurar el siglo entrante."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Entre los pueblos nahuas del centro de México, este hito de 52 años recibía el nombre de Xiuhmolpilli («la Atadura de los Años»), en el que los sacerdotes ataban físicamente en un manojo sagrado cincuenta y dos varillas delgadas de caña verde para simbolizar que un haz completo de tiempo solar había sido concluido y guardado para siempre."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La arqueología mesoamericana ha confirmado de forma empírica la realidad del ciclo de 52 años mediante el hallazgo masivo de vertederos cerámicos que contienen miles de platos, cuencos y sahumadores rotos deliberadamente bajo los pisos de plazas cívicas que datan de transiciones calendáricas registradas en monumentos."
      }
    ],
    "fact": "El cierre del ciclo de 52 años de la Rueda Calendárica concluía con la liturgia del Fuego Nuevo en la cúspide de las pirámides principales al cruzar las Pléyades el cenit nocturno, momento en el que se destruían las vasijas viejas y se remodelaban los templos para sellar el inicio de un nuevo siglo mesoamericano."
  },
  {
    "id": "cuenta-larga",
    "bannerImage": "/assets/maya/infographic_m5/banner_haab-solar.webp",
    "title": "La Cuenta Larga",
    "color": "#BF360C",
    "btnImage": "/assets/maya/infographic_m5/btn_cuenta-larga.jpg",
    "image": "/assets/maya/infographic_m5/hero_cuenta-larga.jpg",
    "content": [
      "Aunque la Rueda Calendárica de 52 años era perfecta para la vida cotidiana de las personas, presentaba una grave limitación para los historiadores de la corte real: no permitía distinguir entre dos sucesos que hubieran ocurrido con una separación de 52, 104 o 156 años en el pasado, al carecer de una cuenta acumulativa lineal continua, similar al problema de registrar fechas históricas solo con el día y el mes sin indicar el año del siglo.",
      "Para superar este obstáculo cronológico y situar las hazañas de sus dinastías dentro de una escala temporal cósmica ilimitada, los sabios mayas perfeccionaron el sistema de la Cuenta Larga. Este calendario lineal absoluto consistía en un cómputo continuo y acumulativo de días transcurridos desde un punto de origen primordial fijado en el pasado mítico, funcionando con una lógica posicional análoga al conteo del día juliano utilizado por los astrónomos modernos contemporáneos.",
      "El punto cero o fecha inicial de la era de la Cuenta Larga actual fue establecido por los astrónomos mayas en la fecha glífica «13.0.0.0.0 4 Ajaw 8 Kumk'u». Mediante la correlación estándar Goodman-Martínez-Thompson (GMT 584283), respaldada plenamente por dataciones de radiocarbono calibradas con anillos de árboles, esta fecha cero corresponde con absoluta certeza astronómica al 11 de agosto del año 3114 a.C. en el calendario gregoriano proléptico.",
      "En la mitología cosmogónica plasmada en monumentos como la Estela C de Quiriguá, ese día primordial los dioses reordenaron el universo tras la destrucción de creaciones anteriores, plantaron las tres piedras cósmicas del fogón celeste en la constelación de Orión y levantaron el árbol sagrado Yaxché para separar las aguas del cielo de las de la tierra, inaugurando la cuarta era del cosmos en la que habita la humanidad actual de maíz.",
      "La estructura de la Cuenta Larga se organizaba en una rigurosa jerarquía posicional vertical compuesta por cinco órdenes numéricos principales: K'in (1 día), Uinal (20 K'in = 20 días), Tun (18 Uinal = 360 días), K'atun (20 Tun = 7,200 días, unos 19.7 años) y B'ak'tun (20 K'atun = 144,000 días, unos 394.3 años). Una fecha clásica maya como 9.17.0.0.0 indicaba exactamente que habían pasado 9 b'ak'tunes y 17 k'atunes desde el génesis del mundo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La fecha 13.0.0.0.0 de la Cuenta Larga volvió a completarse recientemente el 21 de diciembre del año 2012 de nuestra era, tras transcurrir un ciclo completo de 5,125 años solares. Lejos de las profecías apocalípticas divulgadas por la cultura popular occidental, las inscripciones mayas antiguas celebraban esa fecha como el inicio festivo de una nueva era."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El sistema de la Cuenta Larga no se limitaba a cinco dígitos: los textos de Cobá y Yaxchilán mencionan periodos colosales superiores al b'ak'tun, tales como el Piktun (2.88 millones de días), el Kalabtun (57.6 millones de días) y el K'inchiltun (1,152 millones de días), proyectando cálculos temporales hacia miles de millones de años al futuro."
      }
    ],
    "fact": "La Cuenta Larga registra de forma lineal ininterrumpida los días transcurridos desde el punto cero cósmico del 11 de agosto de 3114 a.C. (13.0.0.0.0 4 Ajaw 8 Kumk'u) mediante una jerarquía posicional de 5 periodos vigesimales (K'in, Uinal, Tun, K'atun y B'ak'tun), permitiendo una precisión cronológica absoluta en la historia maya."
  },
  {
    "id": "matematica-base-20",
    "bannerImage": "/assets/maya/infographic_m5/banner_long-count.webp",
    "title": "Matemáticas Base 20",
    "color": "#6A1B9A",
    "btnImage": "/assets/maya/infographic_m5/btn_matematica-base-20.jpg",
    "image": "/assets/maya/infographic_m5/hero_matematica-base-20.jpg",
    "content": [
      "El motor intelectual que hizo posible la invención y el funcionamiento de la Cuenta Larga y los ciclos astronómicos fue el sofisticado sistema de numeración posicional de base veinte (vigesimal) desarrollado por los mayas. A diferencia del sistema decimal de base diez originado en el Viejo Mundo a partir del conteo de los diez dedos de las manos, el sistema vigesimal mesoamericano se fundamentaba en la totalidad de los veinte dedos del cuerpo humano: diez dedos de las manos y diez de los pies.",
      "Para representar cualquier cantidad matemática, por enorme que fuera, los sabios mayas utilizaban únicamente tres símbolos elementales de gran simplicidad gráfica: un punto redondo para el valor de una unidad, una barra horizontal para el valor de cinco unidades, y una concha marina estilizada o caracol de piedra para representar el número cero, concebido no como ausencia pasiva sino como completitud y orden posicional.",
      "Las cifras se escribían de abajo hacia arriba en columnas verticales ordenadas por niveles jerárquicos de potencias numéricas. En el primer nivel (la base inferior), cada punto valía 1. En el segundo nivel, cada punto se multiplicaba por 20 (20¹). En el tercer nivel ordinario, cada unidad se multiplicaba por 400 (20²), en el cuarto nivel por 8,000 (20³), y en el quinto nivel por 160,000 (20⁴). Esta notación posicional vertical permitía resolver complejas sumas y restas con extrema rapidez mediante el simple desplazamiento de fichas.",
      "Sin embargo, al aplicar este sistema vigesimal estricto a las mediciones cronológicas de la Cuenta Larga, los matemáticos mayas introdujeron una genialidad aritmética denominada cómputo calendárico modificado. En el tercer nivel de la cuenta del tiempo, en lugar de multiplicar por 400 (20 × 20), multiplicaron el segundo nivel de veinte días únicamente por 18, fijando el valor del Tun en 360 días solares exactos (18 × 20 = 360).",
      "Esta deliberada modificación en el tercer nivel obedecía a un riguroso criterio pragmático y astronómico: 360 días se aproximaban con notable fidelidad a la duración real del año solar trópico de 365 días, lo que permitía que los k'atunes (7,200 días, unos 19.7 años) y los b'ak'tunes (144,000 días, unos 394 años) marcharan al compás armónico de las estaciones terrestres y de los ciclos de los planetas visibles en el cielo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas concibieron y aplicaron el concepto formal del cero posicional al menos cuatro siglos antes de que los matemáticos de la India desarrollaran su propio sistema numérico independiente, y más de un milenio antes de que el cero fuera introducido y popularizado en Europa occidental a través de los eruditos árabes."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En el sistema vigesimal maya tradicional, las palabras numéricas reflejaban la estructura corporal del ser humano: la palabra «jun winik» significaba simultáneamente el número veinte y «un hombre entero», reconociendo que la suma de los dedos de pies y manos conformaba la unidad anatómica y matemática básica de la sociedad."
      }
    ],
    "fact": "El sistema vigesimal maya empleaba notación posicional vertical con solo tres signos (punto = 1, barra = 5 y concha = cero) y modificaba de forma genial el tercer orden posicional al multiplicar por 18 en vez de 20 (18 × 20 = 360 días para el Tun) a fin de sincronizar la aritmética abstracta con el curso del año solar."
  },
  {
    "id": "engranajes-cosmicos",
    "bannerImage": "/assets/maya/infographic_m5/banner_rueda-calendrica.webp",
    "title": "Engranajes Cósmicos",
    "color": "#FF6F00",
    "btnImage": "/assets/maya/infographic_m5/btn_engranajes-cosmicos.jpg",
    "image": "/assets/maya/infographic_m5/hero_engranajes-cosmicos.jpg",
    "content": [
      "La visión del universo que se desprende de la integración entre la Rueda Calendárica, la Cuenta Larga y los ciclos planetarios es la de un cosmos vivo concebido como una gigantesca maquinaria de relojería cósmica interconectada. Para los filósofos y astrónomos mayas, el tiempo no era una línea abstracta, fría y vacía que transcurre hacia la nada, sino una sustancia divina, cíclica y tangible que transportaba periódicamente las energías y voluntades de los dioses creadores.",
      "Cada fracción del tiempo poseía un portador divino que la cargaba a sus espaldas durante su jornada de marcha por el firmamento. Los días (k'ines), los meses (uinales) y las eras (k'atunes) eran imaginados en los relieves como dioses celestes que avanzaban por el camino del cosmos portando bultos pesados sostenidos por mecapales sobre la frente. Al terminar su turno asignado, el dios relevaba pacíficamente su carga al siguiente dignatario en una procesión infinita.",
      "Dado que todos los ciclos temporales eran matemáticamente conmensurables entre sí mediante múltiplos y submúltiplos de números enteros, los sabios mayas creían firmemente en el principio de la repetición histórica fractal. Si una configuración cósmica particular de planetas y fechas sagradas había traído prosperidad o hambruna durante un determinado k'atun del pasado, los sacerdotes profetizaban que sucesos similares volverían a ocurrir cuando esa misma era k'atúnica se repitiera 256 años solares después.",
      "Esta concepción cíclica del destino histórico no implicaba una resignación paralizante ante lo inevitable, sino una herramienta indispensable de planeación estratégica y preparación colectiva. Los libros sagrados del Chilam Balam de Chumayel y Maní recopilan minuciosas ruedas de trece k'atunes que servían como manuales de advertencia política para que los reyes y consejos de ancianos supieran cómo gobernar ante las crisis periódicas de sequía, peste o invasión armada.",
      "De este modo, los engranajes calendáricos mayas unían lo infinitamente grande con lo infinitamente pequeño. La rotación diaria de la Tierra, el cultivo de una mazorca de maíz en la milpa, el ascenso y caída de linajes dinásticos y las colosales revoluciones de las estrellas lejanas formaban parte de una misma sinfonía matemática indisoluble, donde el ser humano desempeñaba el noble papel de testigo consciente y guardián devoto del equilibrio del universo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En las páginas de los libros coloniales de profecías mayas conocidos como los libros del Chilam Balam («el sacerdote jaguar»), los sabios yucatecos registraron las profecías del k'atun 8 Ajaw, señalando con siglos de anticipación que bajo ese signo recurrente ocurrirían colapsos dinásticos y la llegada de hombres extranjeros a las costas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La rueda de los K'atunes consta de 13 periodos de 7,200 días cada uno (aproximadamente 256.26 años solares en total), en los cuales cada k'atun recibe el nombre del día en que culmina, terminando siempre en un día denominado Ajaw pero variando su coeficiente numérico en saltos descendentes de dos en dos unidades."
      }
    ],
    "fact": "La cosmología maya articulaba microciclos de 20 días con macrociclos de 13 k'atunes (256 años solares) y eras de 13 b'ak'tunes (5,125 años), fundamentando la profecía histórica en la premisa matemática de que los patrones astronómicos y las energías de los dioses portadores del tiempo regresan periódicamente al escenario humano."
  },
  {
    "id": "precision-astronomica",
    "bannerImage": "/assets/maya/infographic_m5/banner_tzolkin-calendario.webp",
    "title": "Precisión Astronómica",
    "color": "#A1887F",
    "btnImage": "/assets/maya/infographic_m5/btn_precision-astronomica.jpg",
    "image": "/assets/maya/infographic_m5/hero_precision-astronomica.jpg",
    "content": [
      "La precisión cuantitativa alcanzada por los matemáticos y astrónomos mayas en la calibración de sus sistemas calendáricos ha suscitado la admiración unánime de la comunidad científica contemporánea internacional. Sin contar con lentes de vidrio, astrolabios metálicos, relojes mecánicos de péndulo ni ordenadores digitales, los sabios de ciudades como Copán, Palenque, Tikal y Chichén Itzá lograron estimar las constantes astronómicas orbitales con una exactitud asombrosa.",
      "Uno de los ejemplos más contundentes de esta maestría matemática se encuentra en el cómputo de la duración media del mes lunar sinódico (el intervalo de tiempo transcurrido entre dos lunas nuevas consecutivas). Mientras que la astronomía moderna con medición láser calcula este valor en 29.530588 días solares, los astrónomos de la ciudad de Copán, en el actual territorio de Honduras, determinaron en el siglo VIII d.C. que 149 lunaciones consecutivas equivalían a 4,400 días exactos, arrojando un promedio de 29.53087 días.",
      "Esta cifra maya para el mes lunar acumulaba un margen de error infinitesimal de apenas 24 segundos de arco por cada mes sinódico completo, lo que equivale a una desviación de menos de un día tras transcurrir varios milenios de observación continuada. De forma similar, la estimación maya del ciclo de Venus de 583.92 días, corregida periódicamente en el Códice de Dresde, superaba en consistencia cuantitativa a los modelos cosmológicos grecorromanos y ptolemaicos europeos de la misma época histórica.",
      "La verificación moderna de estas cifras astronómicas mayas fue consolidada a lo largo del siglo XX gracias a la confirmación de la correlación GMT (bautizada en honor a los investigadores Joseph Goodman, Juan Martínez Hernández y J. Eric S. Thompson). Esta fórmula matemática asigna el número de día juliano 584,283 al día cero de la Cuenta Larga maya (13.0.0.0.0 4 Ajaw 8 Kumk'u), permitiendo traducir cualquier fecha glífica maya a su equivalente exacto en el calendario gregoriano.",
      "Pruebas independientes de datación absoluta mediante carbono-14 de alta precisión realizadas sobre los dinteles tallados de madera de chicozapote de Tikal en laboratorios de Estados Unidos y Europa confirmaron de manera concluyente la validez histórica de la correlación GMT. La ciencia moderna terminó así por respaldar la veracidad de unos cómputos celestes que florecieron en el corazón de las selvas tropicales americanas hace más de mil años."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los astrónomos de la ciudad maya de Palenque utilizaban una fórmula lunar alternativa igualmente asombrosa: registraron en sus templos que 81 lunas nuevas equivalían a 2,392 días enteros, lo que produce una duración para el mes lunar sinódico de 29.530864 días, compitiendo en precisión milimétrica con los sabios de la acrópolis de Copán."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En el año 2013, un estudio exhaustivo liderado por el profesor Douglas Kennett de la Universidad Estatal de Pensilvania utilizó espectrometría de masas con aceleradores (AMS) sobre anillos de crecimiento de madera en Tikal, confirmando que la correlación astronómica GMT posee un margen de certidumbre arqueológica absoluto dentro de ± 1 año."
      }
    ],
    "fact": "La fórmula lunar de Copán que sincronizaba 149 lunas con 4,400 días solares posee una precisión con un desvío de apenas 24 segundos respecto al mes sinódico atómico moderno (29.53059 días), demostrando que la correlación calendárica GMT 584283 traduce con exactitud científica impecable las fechas mayas a la cronología universal."
  }
];

function TemporalField() {
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
      hue: Math.random() > 0.5 ? '255,179,0' : '21,101,192', // gold or royal blue
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

function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,179,0,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#1565C0','#FFB300','#00897B','#BF360C','#6A1B9A','#FF6F00','#A1887F'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FFB300" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FFB300" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FFB300" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#FFB300" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,179,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,179,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,179,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFB300" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA RUEDA CALENDÃRICA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,179,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL ENGRANAJE DE DOS CICLOS</text>
      </svg>
    </div>
  );
}

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
        border: `3px solid ${isActive ? node.color : 'rgba(255,179,0,0.2)'}`,
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
          layoutId="activeDotMayaM5"
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

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};
const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
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
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
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

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

                      {node.bannerImage && (
                <div className="relative w-full rounded-xl overflow-hidden mb-6" style={{aspectRatio:'16/5'}}>
                  <img
                    src={node.bannerImage}
                    alt={node.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium leading-tight">
                    {node.caption}
                  </p>
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

function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(255,179,0,0.15)',
    }}>
      <Star size={14} style={{ color: '#FFB300', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #FFB300, #00897B)', borderRadius: '3px', boxShadow: '0 0 8px rgba(255,179,0,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#FFB300', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

export default function InteractiveInfographic_MayaM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), ',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(255,179,0,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <TemporalField />

      <MayaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(255,179,0,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(255,179,0,0.08)', borderRadius: '16px',
              border: '1px solid rgba(255,179,0,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FFB300', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🔬  ¡Has dominado los secretos de la Rueda Calendárica!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes continuar tu entrenamiento en Arqueoastronomía
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          🔬 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>"Â¢ {ref}</li>
          ))}
        </ul>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
