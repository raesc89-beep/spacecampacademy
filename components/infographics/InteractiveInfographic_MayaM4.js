'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

function DecoTzolkinWheel({ size = 70, color = '#7B1FA2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="25" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a,i) => (
        <line key={i} x1="30" y1="25" x2="30" y2="15" stroke={color} strokeWidth="1.5" transform={`rotate(${a} 30 30)`} />
      ))}
    </svg>
  );
}

function DecoNumberSpiral({ size = 70, color = '#FFC107', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 30 Q35 25 40 30 T30 45 T15 30 T30 10 T50 30 T30 55 T5 30" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="2" fill={color} />
      <circle cx="40" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="45" r="1.5" fill={color} />
    </svg>
  );
}

function DecoDayGlyph({ size = 70, color = '#C62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="15" y="15" width="30" height="30" rx="8" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="22" cy="25" r="3" fill={color} />
      <circle cx="38" cy="25" r="3" fill={color} />
      <path d="M25 40 Q30 45 35 40" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 15 v10" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoStar13({ size = 70, color = '#00838F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,5 35,25 55,25 40,35 45,55 30,40 15,55 20,35 5,25 25,25" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <circle cx="30" cy="15" r="1.5" fill={color} />
      <circle cx="15" cy="30" r="1.5" fill={color} />
      <circle cx="45" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="45" r="1.5" fill={color} />
    </svg>
  );
}

function DecoCornStalk({ size = 70, color = '#2E7D32', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 60 Q30 30 30 5" fill="none" stroke={color} strokeWidth="2" />
      <path d="M30 40 Q20 30 15 45" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 30 Q40 20 45 35" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 20 Q20 10 15 25" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="28" cy="10" r="2" fill={color} />
      <circle cx="32" cy="12" r="2" fill={color} />
      <circle cx="28" cy="14" r="2" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'tzolkin-estructura': [DecoTzolkinWheel, DecoNumberSpiral, DecoDayGlyph],'veinte-dias': [DecoDayGlyph, DecoCornStalk, DecoStar13],
  'trece-numeros': [DecoNumberSpiral, DecoStar13, DecoTzolkinWheel],'destino-nacimiento': [DecoStar13, DecoDayGlyph, DecoNumberSpiral],'ciclo-agricola-ritual': [DecoCornStalk, DecoTzolkinWheel, DecoDayGlyph],'sacerdotes-contadores': [DecoNumberSpiral, DecoStar13, DecoCornStalk],'mesoamerica-universal': [DecoTzolkinWheel, DecoDayGlyph, DecoNumberSpiral],
}; const BIBLIOGRAPHY = ['Coe, M.D. (2011). The Maya, Thames & Hudson',
  'Tedlock, B. (1992). Time and the Highland Maya, University of New Mexico Press',
  'Rice, P.M. (2007). Maya Calendar Origins, University of Texas Press',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  "Freidel, D., Schele, L. & Parker, J. (1993). Maya Cosmos: Three Thousand Years on the Shaman's Path, William Morrow"
];

const INFOGRAPHIC_NODES = [
  {
    "id": "tzolkin-estructura",
    "bannerImage": "/assets/maya/infographic_m4/banner_constelaciones-mayas.webp",
    "title": "Estructura",
    "color": "#7B1FA2",
    "btnImage": "/assets/maya/infographic_m4/btn_tzolkin-estructura.jpg",
    "image": "/assets/maya/infographic_m4/hero_tzolkin-estructura.jpg",
    "content": [
      "El Tzolk'in, cuyo significado literal en lengua maya yucateca es «la cuenta de los días», es el calendario sagrado y adivinatorio más antiguo y venerado de toda Mesoamérica. A diferencia del calendario solar civil Haab' de 365 días que medía las estaciones astronómicas, el Tzolk'in operaba como una matriz cósmica y espiritual cerrada de 260 días únicos. Este ciclo no dependía de la duración del año solar ni de las fases lunares directas, sino de una elegante conmensurabilidad matemática y mística.",
      "La estructura del Tzolk'in se origina a partir del engranaje simultáneo de dos ruedas numéricas independientes que giraban al unísono: una serie de 13 números secuenciales (del 1 al 13) y una lista de 20 nombres de días sagrados inmutables. Dado que los números 13 y 20 son matemáticamente coprimos o primos relativos entre sí (no comparten ningún divisor común aparte de la unidad), el número de combinaciones posibles antes de repetir una fecha exacta es su mínimo común múltiplo: 13 × 20 = 260 días.",
      "El avance diario del Tzolk'in funcionaba mediante la progresión paralela de ambos componentes. Si el primer día de la serie era 1 Imix, la jornada siguiente recibía obligatoriamente la denominación 2 Ik', seguida sucesivamente por 3 Ak'b'al, hasta alcanzar 13 B'en. En ese punto, la serie de los números se agotaba y volvía a comenzar con el número 1, pero la lista de nombres continuaba con el decimocuarto signo, produciendo la combinación 1 Ix, seguida de 2 Men, y así sucesivamente.",
      "Para que una fecha idéntica (por ejemplo, 1 Imix) volviera a manifestarse en el curso del tiempo, era indispensable que transcurrieran exactamente 260 días solares completos. Durante ese lapso de casi nueve meses gregorianos, cada jornada individual poseía un nombre propio compuesto por un número y un glifo sagrado, otorgándole una carga energética, una deidad tutelar y una personalidad cósmica irrepetible que determinaba el destino de los seres humanos nacidos en su seno.",
      "Las raíces arqueológicas del Tzolk'in se remontan a épocas muy remotas del periodo Preclásico mesoamericano, encontrándose evidencias inscritas en monumentos tempranos de San José Mogote en Oaxaca y en estelas olmecas de la costa del Golfo de México fechadas con anterioridad al año 600 a.C. Este calendario sagrado se convirtió en el pilar espiritual indispensable sobre el cual florecieron la astronomía, la escritura glífica y la religión estatal de la civilización maya clásica."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El término «Tzolk'in» fue acuñado formalmente por los mayistas e historiadores a finales del siglo XIX basándose en las raíces mayas yucatecas «tzol» (poner en orden) y «k'in» (día o Sol). Entre los mayas k'iche' de las tierras altas de Guatemala, donde este calendario sagrado sigue vivo hoy en día, su nombre tradicional es «Cholq'ij»."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La cifra canónica de 260 días posee propiedades aritméticas fascinantes: es divisible exactamente entre 2, 4, 5, 10, 13, 20, 26, 52 y 65, lo que permitía a los sacerdotes matemáticos subdividir el ciclo en múltiples intervalos rituales armónicos sin generar fracciones residuales en sus pronósticos de eclipses y planetas."
      }
    ],
    "fact": "La matriz del Tzolk'in articula 13 coeficientes numéricos con 20 nombres sagrados de días para generar un ciclo continuo de 260 combinaciones únicas sin repetirse (13 × 20 = 260), constituyendo el cómputo ritual ininterrumpido más antiguo documentado en el registro arqueológico del continente americano."
  },
  {
    "id": "veinte-dias",
    "bannerImage": "/assets/maya/infographic_m4/banner_copa-observacion.webp",
    "title": "Los 20 Días",
    "color": "#FFC107",
    "btnImage": "/assets/maya/infographic_m4/btn_veinte-dias.jpg",
    "image": "/assets/maya/infographic_m4/hero_veinte-dias.jpg",
    "content": [
      "Los veinte nombres sagrados de los días que conformaban la lista básica del Tzolk'in personificaban una amplia gama de fuerzas cósmicas, fenómenos naturales, deidades tutelares y animales reverenciados en el panteón maya. La secuencia completa comenzaba invariablemente con el signo Imix (el monstruo acuático primordial o lirio de agua) y culminaba con el sagrado Ajaw (el señor divino, el sol supremo y el rey de la corte celestial), cerrando un círculo eterno de regeneración.",
      "La lista completa de los veinte días en lengua maya clásica comprende: Imix, Ik', Ak'b'al, K'an, Chikchan, Kimi, Manik', Lamat, Muluk, Ok, Chuwen, Eb, B'en, Ix, Men, Kib, Kab'an, Etz'nab', Kawak y Ajaw. Cada uno de estos signos representaba conceptos vitales: Ik' era el viento vital y el aliento divino; Ak'b'al, la oscuridad de la noche cósmica y las cuevas; K'an, el grano dorado del maíz maduro y la abundancia fértil; Chikchan, la serpiente celestial emplumada conectada con el rayo.",
      "Otros signos encarnaban la fauna sagrada de la selva tropical: Manik' simbolizaba la garra del ciervo y la caza; Lamat, la luz fulgurante del planeta Venus; Ok, el perro leal que guiaba las almas de los difuntos a través de las aguas subterráneas del inframundo; Chuwen, el mono aullador patrón de los artesanos, músicos y escribas reales; Ix, el espíritu silencioso y poderoso del jaguar manchado (*Panthera onca*); y Men, el vuelo majestuoso del águila sobre las copas de los árboles.",
      "Los días finales de la veintena abordaban las fuerzas telúricas de la creación: Kib personificaba la cera purificadora de las abejas meliponas y la memoria de los antepasados; Kab'an, el movimiento sísmico de la tierra y los terremotos; Etz'nab', el cuchillo ceremonial de pedernal y la obsidiana afilada; Kawak, la tormenta de truenos con nubarrones oscuros; y finalmente Ajaw, el día de mayor rango litúrgico, consagrado a la entronización de los reyes y a las ofrendas directas al Sol.",
      "En los monumentos esculpidos, cada uno de estos veinte días se grababa dentro de un elegante cartucho cuadrangular provisto de tres pequeños soportes basales redondeados, un diseño gráfico exclusivo que advertía al lector de que se trataba de una fecha sagrada del Tzolk'in. Los escribas mayas cuidaban con celo la ejecución plástica de estos glifos, reconociendo que cada trazo de piedra alojaba la presencia física de la deidad que gobernaba esa jornada."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El glifo del día Ajaw es uno de los más frecuentes en toda la epigrafía mesoamericana. Representa un rostro humano de perfil o de frente con labios circulares prominentes y una diadema real en la frente. Los soberanos mayas programaban sus coronaciones dinásticas y banquetes solemnes para coincidir obligatoriamente con días presididos por el glifo Ajaw."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El antropólogo J. Eric S. Thompson demostró que los 20 nombres de los días del Tzolk'in conservan una correspondencia conceptual idéntica con los 20 días del calendario náhuatl azteca Tonalpohualli (por ejemplo: Ik' equivale a Ehécatl/Viento, Kimi a Miquiztli/Muerte, e Ix a Océlotl/Jaguar), probando un origen ideológico mesoamericano común."
      }
    ],
    "fact": "La serie de 20 días del Tzolk'in abarca desde Imix (el origen acuático) hasta Ajaw (el Sol regio), inscritos siempre dentro de cartuchos trilobulados exclusivos que identificaban visualmente a los días como encarnaciones directas de las fuerzas divinas de la naturaleza mesoamericana, otorgando a cada posición diurna un rango teológico soberano e inmutable dentro de la cosmovisión astronómica de las tierras bajas mayas."
  },
  {
    "id": "trece-numeros",
    "bannerImage": "/assets/maya/infographic_m4/banner_eclipse-maya.webp",
    "title": "Los 13 Números",
    "color": "#C62828",
    "btnImage": "/assets/maya/infographic_m4/btn_trece-numeros.jpg",
    "image": "/assets/maya/infographic_m4/hero_trece-numeros.jpg",
    "content": [
      "El número 13 poseía una trascendencia mística y cosmológica de primer orden en el pensamiento maya prehispánico. Lejos de ser una cifra elegida al azar, el 13 representaba la totalidad de los estratos celestiales que conformaban la bóveda superior del universo, conocida como Oxlahuntik'u («los Trece Dioses Celestiales»). Cada uno de estos trece niveles del cielo estaba regido por una deidad específica que aportaba una energía particular al fluir constante del tiempo sagrado.",
      "En el engranaje del Tzolk'in, los coeficientes numéricos del 1 al 13 actuaban como multiplicadores cualitativos de la influencia del día. Mientras que el nombre del día (los 20 signos) indicaba la naturaleza o esencia del ser cósmico presente, el número revelaba la intensidad, la madurez o la dirección de esa fuerza divina. El número 1 simbolizaba el nacimiento, la chispa inicial y la pureza germinal, mientras que el número 13 encarnaba la culminación, la máxima potencia y el cierre de un ciclo de energía.",
      "Los escribas mayas representaban los trece números mediante dos sistemas gráficos complementarios de gran elegancia visual. El sistema ordinario empleaba barras horizontales y puntos circulares: los puntos valían uno y las barras equivalían a cinco (por ejemplo, el número 8 se componía de una barra con tres puntos superpuestos, y el 13 se plasmaba con dos barras y tres puntos). Este código aritmético permitía una lectura instantánea y libre de errores en cualquier dintel o códice.",
      "En monumentos conmemorativos solemnes erigidos por los reyes, los escultores sustituían las barras y puntos por las llamadas variantes de cabeza o glifos cefalomorfos. En esta variante artística superior, cada número del 1 al 13 era personificado por el retrato del perfil sagrado de su respectiva deidad celeste: el dios del maíz joven para el número 8, el dios de la muerte para el número 10, o el dios solar con ojos estrábicos Kinich Ahau para el número 4.",
      "La interacción armónica entre el número y el signo generaba trece ciclos menores de veinte días cada uno (13 × 20 = 260) conocidos como «trecenas». Cada trecena comenzaba formalmente con un día dotado con el coeficiente número 1 (por ejemplo, la trecena 1 Imix o la trecena 1 Manik') y funcionaba como una especie de semana sagrada maya durante la cual imperaban los augurios y presagios dictados por el dios patrono del día inaugural."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas también asociaban el número 13 con las articulaciones principales del cuerpo humano por donde creían que fluía la energía vital: dos tobillos, dos rodillas, dos caderas, dos muñecas, dos codos, dos hombros y el cuello vertebral. Así, el ser humano era concebido como un microcosmos vivo del calendario de trece niveles celestes."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las variantes cefalomorfas de los números del 1 al 13 en las estelas de Copán y Quiriguá presentan detalles anatómicos diagnósticos inalterables: los números del 14 al 19 se formaban combinando la mandíbula descarnada del dios de la muerte (número 10) con los rasgos faciales de los números del 4 al 9, demostrando un sistema gráfico modular."
      }
    ],
    "fact": "El número 13 simbolizaba en la cosmología maya los 13 niveles del supramundo gobernados por los Oxlahuntik'u, y al combinarse con los 20 signos diarios dividía el Tzolk'in en 20 trecenas regulares o semanas sagradas, representadas en estelas reales mediante retratos de rostros de dioses patronos y deidades numéricas celestes que regían de manera ininterrumpida el destino de los linajes gobernantes."
  },
  {
    "id": "destino-nacimiento",
    "bannerImage": "/assets/maya/infographic_m4/banner_milky-way-maya.webp",
    "title": "Destino al Nacer",
    "color": "#00838F",
    "btnImage": "/assets/maya/infographic_m4/btn_destino-nacimiento.jpg",
    "image": "/assets/maya/infographic_m4/hero_destino-nacimiento.jpg",
    "content": [
      "En el mundo maya antiguo, la fecha en que una persona llegaba al mundo dentro del calendario Tzolk'in determinaba de forma decisiva su carácter personal, sus habilidades innatas, sus debilidades físicas y su destino social dentro de la comunidad. Esta concepción fatalista y ordenada del nacimiento partía de la convicción de que cada individuo recibía como alma compañera o espíritu guardián la energía espiritual inmanente al día sagrado en que había respirado por primera vez.",
      "Tan pronto como una mujer daba a luz en su hogar, los padres acudían a la residencia del sacerdote contador de los días, conocido como el Ajk'ij o ah k'in. El sabio desenrollaba las láminas policromadas de sus códices adivinatorios de papel amate para consultar las tablas de pronósticos correspondientes a la combinación numérica y al signo del día del recién nacido, evaluando si el nacimiento había ocurrido bajo un augurio favorable, neutro o peligroso.",
      "El día de nacimiento otorgaba al infante su nombre calendárico de por vida, que lo acompañaría antes de recibir su nombre propio de linaje familiar. Así, un gobernante célebre podía llamarse formalmente 18 Conejo (Waxaklajun Ub'ah K'awiil) en Copán o 8 Ciervo en otras regiones mesoamericanas. Si un niño nacía en un día con coeficiente 13 o bajo el signo Ajaw, los presagios anticipaban que poseería elocuencia, liderazgo político y vocación de mando militar.",
      "Por el contrario, nacer bajo signos regidos por deidades del inframundo, como Kimi (la muerte) o en ciertas combinaciones del signo Eb (la maleza que marchita), requería precauciones extraordinarias. Los sacerdotes no consideraban estos días como una condena inevitable, sino como una advertencia preventiva que obligaba a la familia a realizar baños rituales purificatorios en cenotes y a ofrecer copal aromático para desviar las influencias desfavorables del destino.",
      "Los dones profesionales también se derivaban del Tzolk'in: aquellos nacidos bajo el signo Chuwen se convertían en tejedores virtuosos, escultores de jade o escribas letrados; los nacidos en Manik' eran cazadores certeros y rastreadores infalibles en la manigua; y los nacidos en Men poseían visión profética y capacidad para interpretar visiones celestes. De esta forma, el calendario sagrado asignaba a cada individuo un lugar funcional y digno dentro de la estructura social colectiva."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Entre los mayas contemporáneos k'iche' y kaqchikeles de Guatemala, esta tradición del signo de nacimiento se conserva con el nombre de «Nawal». Al consultar al guía espiritual comunitario, una persona puede conocer su Nawal protector para orientar sus decisiones vocacionales, su vida matrimonial y su salud física a lo largo de la vida."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La antropóloga Barbara Tedlock documentó en su obra clásica «Time and the Highland Maya» que los sacerdotes mayas de Momostenango realizan complejos diagnósticos de psicología tradicional y terapias comunitarias interpretando el signo del Tzolk'in de los pacientes, manteniendo una tradición terapéutica ininterrumpida de milenios."
      }
    ],
    "fact": "El signo del Tzolk'in asignaba a cada ser humano al nacer su nombre calendárico oficial, su espíritu guardián protector (Nawal) y su perfil vocacional ante la comunidad, estructurando la identidad psicológica y las responsabilidades sociales de cada individuo desde su primer día de vida terrenal, influyendo decisivamente en sus rituales de iniciación, matrimonio y asignación de deberes dentro de la jerarquía cívico-religiosa."
  },
  {
    "id": "ciclo-agricola-ritual",
    "bannerImage": "/assets/maya/infographic_m4/banner_observatorio-caracol.webp",
    "title": "Ciclo Ritual",
    "color": "#2E7D32",
    "btnImage": "/assets/maya/infographic_m4/btn_ciclo-agricola-ritual.jpg",
    "image": "/assets/maya/infographic_m4/hero_ciclo-agricola-ritual.jpg",
    "content": [
      "Uno de los grandes misterios que cautivó a los arqueólogos durante el siglo XX fue descifrar por qué los antiguos mayas y sus antecesores mesoamericanos eligieron precisamente el intervalo de 260 días como base para su calendario sagrado, una cifra que aparentemente no coincide con ningún ciclo orbital terrestre inmediato ni con el año trópico ordinario de 365 días.",
      "Diversos científicos contemporáneos han formulado explicaciones biológicas y agronómicas sumamente sólidas. La teoría biológica más respaldada subraya que 260 días corresponden de manera casi exacta al periodo de gestación humana promedio, que transcurre a lo largo de aproximadamente 266 días desde la fecundación biológica hasta el parto (equivalente a unas 38 semanas o 9 meses lunares). Para una sociedad que veneraba la fertilidad de la vida, este paralelismo resultaba sagrado.",
      "Desde la perspectiva agrícola, en las tierras altas del sur de Mesoamérica (donde probablemente nació el sistema calendárico), el periodo de 260 días coincide con exactitud con el intervalo completo de cultivo del maíz de temporal: desde que la semilla germina en la tierra tras las primeras lluvias primaverales de mayo hasta la cosecha definitiva del grano maduro a finales del otoño, cerrando el ciclo sagrado de la alimentación comunitaria.",
      "En el ámbito de la mecánica celeste, el número 260 encierra conmensurabilidades formidables con otros cuerpos celestes. Tres periodos del ciclo sinódico del planeta Mercurio (cuyo ciclo es de 115.88 días terrestres) suman aproximadamente 348 días, los cuales guardan relaciones proporcionales con el Tzolk'in. Asimismo, dos ciclos del Tzolk'in (520 días) equivalen con sorprendente precisión a tres «años de eclipses» astronómicos de 173.31 días cada uno (3 × 173.31 = 519.93 días).",
      "Esta asombrosa convergencia entre la reproducción del cuerpo humano, la germinación sagrada del maíz en la milpa y los intervalos de peligro de eclipses solares y lunares convertía al Tzolk'in en una ecuación cósmica perfecta. Para la cosmovisión maya, el calendario de 260 días no era una invención artificial humana, sino el descubrimiento directo del código secreto con el que los dioses habían diseñado el funcionamiento sincronizado de la vida en la Tierra y el cielo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Entre el 12 de agosto y el 30 de abril transcurren exactamente 260 días solares en el calendario civil. Esta ventana temporal coincide con las fechas de paso del Sol por el cenit en la latitud de 14.8° Norte (donde se ubica el sitio preclásico de Izapa), lo que refuerza la tesis astronómica del origen geográfico meridional del Tzolk'in mesoamericano."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La relación matemática exacta de que dos ciclos de Tzolk'in (520 días) coinciden con tres semestres de eclipses o estaciones nodales de la órbita lunar (519.93 días con una diferencia de solo 0.07 días) fue la herramienta fundamental que permitió a los astrónomos mayas compilar la tabla de predicción de eclipses del Códice de Dresde."
      }
    ],
    "fact": "El periodo de 260 días del Tzolk'in unifica el tiempo promedio de gestación del ser humano (266 días), el ciclo completo de maduración del maíz de temporal y la relación matemática exacta de 2 ciclos de Tzolk'in por cada 3 estaciones de eclipses solares (520 días = 519.93 días astronómicos nodales)."
  },
  {
    "id": "sacerdotes-contadores",
    "bannerImage": "/assets/maya/infographic_m4/banner_pleiades-mayas.webp",
    "title": "Los Sacerdotes Contadores",
    "color": "#263238",
    "btnImage": "/assets/maya/infographic_m4/btn_sacerdotes-contadores.jpg",
    "image": "/assets/maya/infographic_m4/hero_sacerdotes-contadores.jpg",
    "content": [
      "El cuidado, la interpretación y la transmisión del calendario sagrado Tzolk'in recaían sobre una corporación sacerdotal especializada conocida en lengua maya como los Ajk'ijob (término k'iche' que traduce literalmente «los contadores del Sol y de los días») o ah k'inob en las tierras bajas de Yucatán. Estos sabios constituían la élite intelectual, moral y espiritual más respetada en las comunidades urbanas y rurales de todo el territorio maya.",
      "Para realizar sus cálculos calendáricos y adivinatorios, los sacerdotes no dependían únicamente de su prodigiosa memoria. Portaban consigo una bolsa ceremonial de tejido tradicional llamada «vara» o «morral sagrado», que contenía los instrumentos litúrgicos de su oficio: cientos de semillas rojas brillantes del árbol de tz'ite' o colorín (*Erythrina corallodendron*), pequeños cristales de roca de cuarzo transparente recogidos en cavernas sagradas y jadeítas pulidas de antiguos ancestros.",
      "Durante una sesión de consulta, el Ajk'ij limpiaba una mesa de madera o una estera de petate y arrojaba puñados de semillas de tz'ite' sobre la superficie. Mediante hábiles agrupaciones de cuatro en cuatro semillas (representando los cuatro rumbos del universo) y contando progresivamente a través de las trecenas del Tzolk'in, el sacerdote interpretaba el mensaje oracular de acuerdo con el número de granos sobrantes y las sensaciones musculares involuntarias de sus propios brazos.",
      "La preparación para convertirse en contador del tiempo era un proceso riguroso que demandaba años de discipulado con un maestro anciano. El aspirante debía superar periodos prolongados de ayuno en cuevas oscuras, aprender de memoria los cientos de presagios de cada fecha, dominar la farmacopea botánica tradicional para curar enfermedades físicas y demostrar una conducta ética intachable ante los miembros de su linaje familiar y comunitario.",
      "A pesar de la destrucción masiva de códices mayas y templos durante la conquista española del siglo XVI y las campañas de evangelización forzada, la corporación de los Ajk'ijob demostró una resistencia cultural sin parangón en América. En las comunidades mayas de las montañas de Guatemala, los sacerdotes contadores han mantenido el cómputo diario del Tzolk'in día por día, sin haber perdido una sola jornada de la cuenta sagrada en más de dos mil años ininterrumpidos."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los sacerdotes Ajk'ijob interpretan diminutos espasmos o temblores involuntarios en los músculos de sus brazos y piernas (conocidos como «el relámpago en la sangre») durante la lectura de las semillas de tz'ite'. Consideran que estas pulsaciones físicas son respuestas directas de las deidades celestes confirmando la verdad de un oráculo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Estudios etnológicos contemporáneos coordinados por la Universidad de San Carlos de Guatemala han censado a miles de guías espirituales mayas debidamente iniciados que ejercen activamente en santuarios de montaña, altares de cueva y sitios arqueológicos como Iximché y Kaminaljuyú calculando el Cholq'ij a diario."
      }
    ],
    "fact": "Los sacerdotes contadores Ajk'ijob utilizan morrales ceremoniales con semillas rojas de tz'ite' (*Erythrina corallodendron*) y cristales de cuarzo para efectuar conteos de cuatro en cuatro semillas, una técnica matemática de adivinación oracular que ha sobrevivido intacta en Guatemala desde tiempos prehispánicos."
  },
  {
    "id": "mesoamerica-universal",
    "bannerImage": "/assets/maya/infographic_m4/banner_venus-maya.webp",
    "title": "Calendario Universal",
    "color": "#FF5722",
    "btnImage": "/assets/maya/infographic_m4/btn_mesoamerica-universal.jpg",
    "image": "/assets/maya/infographic_m4/hero_mesoamerica-universal.jpg",
    "content": [
      "El calendario de 260 días no fue una creación exclusiva ni aislada de la cultura maya; constituyó el rasgo civilizatorio más unificador, definitorio y universal de toda el área cultural mesoamericana. Desde las áridas fronteras septentrionales del río Lerma en el centro de México hasta el golfo de Nicoya en Costa Rica, decenas de civilizaciones con lenguas y orígenes étnicos radicalmente distintos compartieron este mismo mecanismo cronológico con exactitud sincronizada.",
      "Entre los pueblos de habla náhuatl del altiplano central, incluidos los mexicas o aztecas de Tenochtitlan, este ciclo recibía el nombre de Tonalpohualli («la cuenta de los destinos» o tonallis), organizado con idéntica mecánica de 13 números y 20 signos diarios. Los zapotecos y mixtecos de los valles y serranías de Oaxaca lo denominaban Piye; los totonacas de Veracruz y los pipiles de Centroamérica lo integraron con reverencia similar en sus respectivos panteones religiosos.",
      "Lo verdaderamente extraordinario desde el punto de vista histórico y arqueoastronómico es que, a pesar de las inmensas distancias geográficas y de los siglos de guerras y transformaciones políticas que sacudieron la región, el calendario de 260 días marchaba con una sincronía absoluta en toda Mesoamérica. Una fecha del Tzolk'in en una estela clásica maya de Tikal o Palenque correspondía matemáticamente al mismo día exacto del Tonalpohualli grabado en códices mixtecos o mexicas.",
      "Esta concordancia interétnica perfecta prueba que todos los calendarios mesoamericanos de 260 días derivaban de una fuente cultural común primigenia, desarrollada probablemente por las sociedades olmecas o zapotecas tempranas durante el primer milenio antes de Cristo. Dicho cómputo original se transmitió como un pacto civilizatorio sagrado que ninguna dinastía osó alterar ni desfasar a lo largo de más de treinta siglos continuos de historia documentada.",
      "Hoy en día, el Tzolk'in maya y sus equivalentes mesoamericanos son reconocidos por antropólogos e historiadores universales como uno de los sistemas cronológicos y cosmológicos más originales jamás concebidos por el genio humano. Al margen de cualquier influencia externa del Viejo Mundo, los pueblos originarios de Mesoamérica crearon un reloj sagrado que supo entrelazar con pasmosa belleza las matemáticas, la naturaleza, la ética social y el destino del cosmos."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Cuando el conquistador Hernán Cortés desembarcó en las costas de Veracruz en 1519, los cronistas españoles registraron con asombro que los sacerdotes aztecas, totonacas y mayas compartían el mismo cómputo sagrado del día, permitiéndoles correlacionar con exactitud el calendario indígena con el calendario cristiano europeo de la época."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El célebre mayista Alfonso Caso demostró mediante análisis comparativos de más de cincuenta manuscritos pictográficos que la correlación entre el Tonalpohualli mexica, el Piye zapoteco y el Tzolk'in maya clásico funcionaba sin un solo día de desfase en todo el territorio de Mesoamérica en el momento del contacto en el siglo XVI."
      }
    ],
    "fact": "El ciclo sagrado de 260 días operó de forma sincronizada y universal en todas las grandes culturas mesoamericanas (como Tzolk'in maya, Tonalpohualli náhuatl y Piye zapoteco), manteniendo una correlación matemática idéntica de día por día a lo largo de más de tres mil años ininterrumpidos de historia."
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
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      hue: Math.random() > 0.5 ? '200, 150, 50' : '50, 150, 100',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.05;
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(123,31,162,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#7B1FA2', '#FFC107', '#C62828', '#00838F', '#2E7D32', '#263238', '#FF5722'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FFC107" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FFC107" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FFC107" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(123,31,162,0.2)" />
            <stop offset="50%" stopColor="rgba(255,193,7,0.9)" />
            <stop offset="100%" stopColor="rgba(123,31,162,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFC107" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL Tzolkin</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CICLO SAGRADO DE 260 DÍAS</text>
      </svg>
    </div>
  );
}

function ProgressBar({ explored, total, color }) {
  const progress = (explored / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem', textAlign: 'center', zIndex: 2, position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
        <span>PROGRESO DEL CONOCIMIENTO</span>
        <span>{explored} / {total} NODOS</span>
      </div>
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
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
          layoutId="activeDotMayaM4"
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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none',
          cursor: 'pointer', color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
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
            initial="hidden" animate="visible" exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{
              margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem',
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
        background: 'rgba(10, 15, 25, 0.92)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px', position: 'relative', zIndex: 3,
        marginTop: '1rem', overflow: 'hidden',
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
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
              border: `2px solid ${node.color}40`, flexShrink: 0,
            }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D', fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px',
                }}>
                  {i === 0 ? 'â—†' : 'â—‡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} item={exp} color={node.color} />
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
            marginTop: '1.5rem', padding: '1.2rem', borderRadius: '12px',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            border: `1px dashed ${node.color}40`, display: 'flex', gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', background: `${node.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Star size={20} color={node.color} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '0.9rem', letterSpacing: '0.5px' }}>DATO CIENTÍFICO</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function InteractiveInfographic_MayaM4() {
  const [activeNode, setActiveNode] = useState(null);
  const [exploredNodes, setExploredNodes] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const scrollRef = useRef(null);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!exploredNodes.has(id)) {
      setExploredNodes(new Set(exploredNodes).add(id));
    }
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div style={{
      width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '2rem',
      background: 'linear-gradient(to bottom, #0A0C16, #121525)',
      borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)',
      position: 'relative', overflow: 'hidden', minHeight: '800px',
    }}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <MayaHeader />
        
        <div style={{ marginTop: '3rem' }}>
          <ProgressBar explored={exploredNodes.size} total={INFOGRAPHIC_NODES.length} color="#FFC107" />
        </div>

        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem',
          margin: '2rem 0', padding: '1rem', background: 'rgba(0,0,0,0.2)',
          borderRadius: '20px', backdropFilter: 'blur(10px)',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <div ref={scrollRef}>
          <AnimatePresence mode="wait">
            {activeNode && (
              <ContentPanel
                key={activeNode}
                node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
                onClose={() => setActiveNode(null)}
                setLightboxSrc={setLightboxSrc}
              />
            )}
          </AnimatePresence>
        </div>

        <div style={{
          marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center', position: 'relative', zIndex: 2,
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '1rem' }}>
            FUENTES Y BIBLIOGRAFÍA
          </h4>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <p key={i} style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', maxWidth: '600px' }}>
                {bib}
              </p>
            ))}
          </div>
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
