'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Interstellar themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function DecoOumuamua({ size = 70, color = '#FFB74D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="5" fill="none" stroke={color} strokeWidth="2" transform="rotate(45 30 30)" />
      <path d="M15 15 Q25 10 45 45 Q35 50 15 15" fill={color} opacity="0.3" />
      <circle cx="25" cy="25" r="1.5" fill={color} opacity="0.6" />
      <circle cx="35" cy="35" r="2" fill={color} opacity="0.5" />
      <circle cx="30" cy="30" r="1" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#26A69A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="10,50 20,20 45,10 35,40" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="20" x2="15" y2="10" stroke={color} strokeWidth="1.5" />
      <line x1="45" y1="10" x2="55" y2="5" stroke={color} strokeWidth="1.5" />
      <circle cx="27" cy="30" r="4" fill={color} opacity="0.4" />
      <path d="M10 50 L5 60 M35 40 L40 60" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoOrbitPath({ size = 70, color = '#42A5F5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 5 55 Q 30 5 55 55" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="30" cy="18" r="3" fill={color} opacity="0.5" />
      <circle cx="15" cy="40" r="2" fill={color} opacity="0.7" />
      <circle cx="45" cy="40" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoStarField({ size = 70, color = '#FFC107', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {[...Array(8)].map((_, i) => (
        <circle key={i} cx={Math.random() * 60} cy={Math.random() * 60} r={Math.random() * 1.5 + 0.5} fill={color} opacity={Math.random() * 0.5 + 0.3} />
      ))}
      <path d="M30 10 L32 28 L50 30 L32 32 L30 50 L28 32 L10 30 L28 28 Z" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSpectrum({ size = 70, color = '#AB47BC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M5 30 Q 15 10, 25 30 T 45 30 T 65 30" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M5 40 Q 15 20, 25 40 T 45 40 T 65 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="25" y1="10" x2="25" y2="50" stroke={color} strokeDasharray="2 2" />
      <line x1="45" y1="10" x2="45" y2="50" stroke={color} strokeDasharray="2 2" />
    </svg>
  );
}

const DECO_MAP = {
  'descubrimiento-2017': [DecoTelescope, DecoStarField, DecoOrbitPath],'nombre-hawaiano': [DecoOumuamua, DecoStarField, DecoSpectrum],
  'forma-enigmatica': [DecoOumuamua, DecoSpectrum, DecoOrbitPath],
  'aceleracion-misteriosa': [DecoOrbitPath, DecoOumuamua, DecoStarField],'hipotesis-cientificas': [DecoSpectrum, DecoTelescope, DecoOumuamua],
  'composicion-superficie': [DecoSpectrum, DecoStarField, DecoOrbitPath],'legado-cientifico': [DecoTelescope, DecoOrbitPath, DecoStarField],
}; const BIBLIOGRAPHY = ['Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552',
  'Loeb, A. (2021). Extraterrestrial: The First Sign of Intelligent Life Beyond Earth, Houghton Mifflin',
  'Desch, S. & Jackson, A. (2021). "1I/\'Oumuamua as an N2 ice fragment", Journal of Geophysical Research: Planets, 126',
  'Bannister, M. et al. (2017). "Col-OSSOS: Colors of the Interstellar Planetesimal 1I/\'Oumuamua", The Astrophysical Journal Letters, 851',
  'Seligman, D. et al. (2019). "On the anomalous acceleration of 1I/2017 U1 \'Oumuamua", The Astrophysical Journal Letters, 876'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "descubrimiento-2017",
    diagramImage: '/assets/interestelar/infographic_m2/diagram_descubrimiento-2017.webp',
    diagramCaption: 'Descubrimiento 2017: Robert Weryk en Pan-STARRS detectó el primer visitante interestelar confirmado',
    "title": "El Descubrimiento",
    "color": "#FFB74D",
    "btnImage": "/assets/interestelar/infographic_m2/btn_descubrimiento-2017.jpg",
    "image": "/assets/interestelar/infographic_m2/hero_descubrimiento-2017.jpg",
    "content": [
      "La noche del 19 de octubre de 2017, el astrónomo Robert Weryk examinaba las imágenes captadas por el telescopio Pan-STARRS1, ubicado en la cima del volcán Haleakala en la isla hawaiana de Maui. El sistema automático de alerta había detectado un punto luminoso diminuto que se desplazaba con una rapidez angular desconcertante entre las estrellas fijas de la constelación de Pegaso. El objeto no coincidía con ninguna órbita de asteroide o cometa catalogado previamente en las bases de datos de la NASA.",
      "Al rastrear la posición preliminar hacia atrás en el tiempo, los astrofísicos descubrieron que el cuerpo ya había cruzado su punto más cercano al Sol, denominado perihelio, el 9 de septiembre de 2017. En aquel instante crítico pasó a solo 38 millones de kilómetros del astro rey, una distancia inferior a la órbita de Mercurio. La gravedad solar curvó bruscamente su rumbo antes de que cualquier telescopio terrestre hubiese registrado su presencia, catapultándolo hacia el espacio exterior a una velocidad vertiginosa.",
      "El Centro de Planetas Menores de la Unión Astronómica Internacional clasificó inicialmente al viajero como el cometa C/2017 U1. No obstante, observaciones inmediatas de alta resolución efectuadas desde el Very Large Telescope en Chile demostraron de forma concluyente la ausencia total de coma gaseosa o cola de polvo. Ante la falta de actividad cometaria detectable, los científicos rectificaron rápidamente su clasificación formal para designarlo como el asteroide A/2017 U1.",
      "El análisis orbital definitivo reveló un parámetro asombroso: una excentricidad orbital de 1.1995. En mecánica celeste, cualquier órbita con excentricidad mayor que 1.0 describe una hipérbola abierta, lo que demuestra matemáticamente que el cuerpo no se encuentra ligado por la fuerza gravitatoria del Sol. Procedía directamente del espacio profundo interestelar a una velocidad asintótica de 26.3 kilómetros por segundo, marcando un hito histórico sin precedentes en la astronomía moderna.",
      "La trayectoria hiperbólica evidenció que el intruso descendió desde una dirección cercana a la estrella Vega, en la constelación de Lyra, atravesando el plano de la eclíptica casi de forma perpendicular. Su velocidad de entrada era tan elevada que el tirón gravitatorio de los planetas gigantes gaseosos apenas pudo perturbar levemente su camino de escape. La humanidad contemplaba por primera vez en la historia un mensajero tangible expulsado de otro sistema planetario lejano."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Cuando Robert Weryk revisó las placas de Pan-STARRS, pensó que se trataba de un asteroide ordinario cercano a la Tierra. Para despejar cualquier duda, contactó con el astrónomo Marco Micheli en la estación óptica de la Agencia Espacial Europea en Tenerife. Al combinar ambas mediciones, comprendieron con asombro que ningún proceso gravitatorio interno del sistema solar podía generar semejante trayectoria hiperbólica."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad hiperbólica de exceso al infinito de 'Oumuamua se fijó en 26.33 kilómetros por segundo respecto al estándar local de reposo galáctico. Esta velocidad relativa concuerda con las velocidades promedio de las estrellas vecinas en el disco de la Vía Láctea, lo que confirma que vagó durante cientos de millones de años por el vacío interestelar antes de cruzarse casualmente con nuestro Sol."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m2/banner_descubrimiento-2017.webp",
    "bannerCaption": "Descubrimiento 2017: Robert Weryk en Pan-STARRS detectó el primer visitante interestelar confirmado",
    "fact": "La excentricidad orbital calculada para 'Oumuamua alcanzó un valor histórico de e = 1.1995, superando con creces el récord previo de cualquier cometa conocido. Este valor numérico certificó matemáticamente y sin ambigüedad su procedencia extrasolar, demostrando que viajaba en una órbita hiperbólica no confinada al pozo de potencial gravitatorio del Sol."
  },
  {
    "id": "nombre-hawaiano",
    diagramImage: '/assets/interestelar/infographic_m2/diagram_nombre-hawaiano.webp',
    diagramCaption: 'El nombre hawaiano: Oumuamua significa mensajero llegado desde lejos, el primer emisario interestelar',
    "title": "El Nombre Hawaiano",
    "color": "#EF5350",
    "btnImage": "/assets/interestelar/infographic_m2/btn_nombre-hawaiano.jpg",
    "image": "/assets/interestelar/infographic_m2/hero_nombre-hawaiano.jpg",
    "content": [
      "El descubrimiento de un objeto procedente de fuera del sistema solar planteó un reto taxonómico sin precedentes a la Unión Astronómica Internacional. Las convenciones astronómicas tradicionales solo contemplaban prefijos para asteroides numerados o cometas periódicos identificados con la letra P o no periódicos con la letra C. Ninguna nomenclatura existente estaba diseñada para clasificar de manera inequívoca a un cuerpo macroscópico genuinamente interestelar.",
      "Ante esta circunstancia excepcional, la Unión Astronómica Internacional aprobó en noviembre de 2017 una serie formal completamente nueva: la letra «I» de interestelar. De este modo, el intruso cósmico recibió la designación oficial definitiva 1I/2017 U1, estableciendo un catálogo permanente para registrar todos los visitantes interestelares que la tecnología astronómica fuera capaz de descubrir en las décadas venideras a lo largo de nuestro vecindario galáctico.",
      "El equipo de investigación de Pan-STARRS, responsable del avistamiento original en la cima del volcán Haleakala, decidió otorgarle un nombre propio arraigado en la tradición cultural de la región donde operaba el telescopio. Consultaron a Ka'iu Kimura y a Larry Kimura, prestigiosos profesores y especialistas en lengua hawaiana del Centro Astronómico 'Imiloa de la Universidad de Hawái en Hilo, buscando una denominación con profundo significado astronómico y cultural.",
      "Los lingüistas propusieron el término tradicional 'Oumuamua, cuya pronunciación se inicia con un 'okina, un signo que representa una oclusión glotal fonética en el idioma hawaiano. La palabra se descompone etimológicamente en 'ou, que alude a extender la mano o alcanzar, y mua, repetido para denotar énfasis cronológico o espacial superlativo. Su significado poético y descriptivo se traduce literalmente como «el primer mensajero lejano que llega a nuestro encuentro».",
      "La asignación del nombre fue acogida con entusiasmo por la comunidad astronómica internacional porque encarnaba con fidelidad la trascendencia científica del suceso. Por primera vez, un objeto foráneo traía consigo información química y geológica directa sobre los materiales primordiales que integran los sistemas protoplanetarios alrededor de otras estrellas. Su denominación honró la histórica tradición de navegación astronómica oceánica de los antiguos polinesios."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El prefijo «1I» se creó específicamente en una reunión extraordinaria de la Unión Astronómica Internacional celebrada pocas semanas después del avistamiento. Hasta ese momento histórico, los astrónomos debatían si debían bautizarlo con nombres mitológicos grecorromanos convencionales, pero la belleza conceptual de la propuesta hawaiana inspiró un consenso unánime que honró las raíces del observatorio descubridor."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La convención de nomenclatura de la Unión Astronómica Internacional estipula que la designación «1I» es permanente e intransferible. El código formal completo 1I/2017 U1 combina el número secuencial de clase interestelar, el año del avistamiento inicial, el código de quincena del mes de octubre representada por la letra U y el número de orden temporal de identificación en dicha quincena."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m2/banner_nombre-hawaiano.webp",
    "bannerCaption": "El nombre hawaiano: Oumuamua significa mensajero llegado desde lejos, el primer emisario interestelar",
    "fact": "La creación de la categoría interestelar «I» marcó un hito en la historia de la taxonomía astronómica mundial. 'Oumuamua inauguró formalmente el registro como 1I/2017 U1, garantizando que todos los futuros cuerpos hiperbólicos detectados posean una identidad sistemática rigurosa que diferencie su origen extrasolar de los asteroides y cometas locales del sistema solar."
  },
  {
    "id": "forma-enigmatica",
    diagramImage: '/assets/interestelar/infographic_m2/diagram_forma-enigmatica.webp',
    diagramCaption: 'Forma enigmática: relación 10:1 de elongación, como una lenteja plana girando nunca vista antes',
    "title": "La Forma Enigmática",
    "color": "#AB47BC",
    "btnImage": "/assets/interestelar/infographic_m2/btn_forma-enigmatica.jpg",
    "image": "/assets/interestelar/infographic_m2/hero_forma-enigmatica.jpg",
    "content": [
      "A medida que los observatorios terrestres más potentes del planeta concentraban sus detectores ópticos en 'Oumuamua, los datos fotométricos comenzaron a revelar anomalías asombrosas en su curva de brillo. El brillo aparente del objeto aumentaba y disminuía periódicamente de manera rítmica en un factor de diez a uno, lo que corresponde a una variación fotométrica extrema de aproximadamente dos magnitudes y media cada pocas horas de observación continua.",
      "Los astrofísicos determinaron que esta oscilación fotométrica colosal se repetía con un período rotacional medio de entre 7.3 y 8.1 horas. En cuerpos celestes relativamente esféricos, las variaciones de brillo apenas superan unas pocas décimas de magnitud debido a contrastes en el albedo de su superficie. Una modulación de diez a uno solo puede explicarse físicamente si el objeto exhibe una geometría extraordinariamente asimétrica y rota sobre su eje mostrando áreas proyectadas muy dispares.",
      "El análisis morfológico detallado, realizado mediante complejas inversiones matemáticas de la curva de luz observada por el Very Large Telescope en Chile, indicó una razón de aspecto de al menos seis a uno, y potencialmente de diez a uno. Si bien las primeras recreaciones artísticas y modelos numéricos preliminares propusieron una silueta alargada semejante a un gigantesco cigarro cósmico de cuatrocientos metros de longitud, análisis posteriores sugirieron una forma aplanada parecida a un disco o panqueque.",
      "Ningún asteroide o cometa nativo del sistema solar exhibe una relación de elongación tan extrema. Los cuerpos rocosos de nuestro entorno suelen presentar proporciones de longitud respecto a anchura no superiores a tres a uno, ya que tensiones de marea y colisiones mutuas tienden a amortiguar formas exageradamente esbeltas. La silueta de 'Oumuamua indicaba una resistencia mecánica interna notable o una historia colisional violenta en su sistema planetario de origen.",
      "Además de su acusada elongación geométrica, las mediciones revelaron que 'Oumuamua no giraba alrededor de un único eje principal estable. Se encontraba en un estado dinámico denominado rotación caótica o volteo desordenado (tumbling), tambaleándose en el espacio tridimensional como una peonza desbalanceada. Esta oscilación compleja implica que el objeto continuará volteándose durante miles de millones de años antes de que la disipación interna de energía logre estabilizarlo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La reconstrucción de la forma de 'Oumuamua obligó a los astrónomos a descartar la idea de una esfera simple. Al presentar alternativamente su cara más extensa y luego su sección transversal mínima hacia la Tierra, la cantidad de fotones solares reflejados fluctuaba en un 90 por ciento, un comportamiento lumínico jamás observado en ningún asteroide de tamaño equivalente en el cinturón principal."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El modelado fotométrico tridimensional restringió las dimensiones principales de 'Oumuamua en rangos estimados de 100 a 400 metros de longitud por 35 a 100 metros de anchura y espesor. Su período de rotación principal de 7.34 horas se combina con un modo de precesión libre que induce tensiones mecánicas mínimas estimadas en varios cientos de pascales en su interior rocoso."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m2/banner_forma-enigmatica.webp",
    "bannerCaption": "Forma enigmática: relación 10:1 de elongación, como una lenteja plana girando nunca vista antes",
    "fact": "La variación fotométrica de 2.5 magnitudes observada en la curva de luz de 'Oumuamua equivale a una alternancia de diez veces en su luminosidad aparente reflejada. Esta evidencia cuantitativa confirmó una relación de aspecto de al menos 6:1, convirtiéndolo en el cuerpo celeste natural más elongado jamás registrado por la instrumentación astronómica moderna."
  },
  {
    "id": "aceleracion-misteriosa",
    diagramImage: '/assets/interestelar/infographic_m2/diagram_aceleracion-misteriosa.webp',
    diagramCaption: 'Aceleración misteriosa: Oumuamua aceleró sin eyección de gas visible, el mayor misterio de su visita',
    "title": "Aceleración Misteriosa",
    "color": "#26A69A",
    "btnImage": "/assets/interestelar/infographic_m2/btn_aceleracion-misteriosa.jpg",
    "image": "/assets/interestelar/infographic_m2/hero_aceleracion-misteriosa.jpg",
    "content": [
      "A principios de 2018, un equipo internacional liderado por el astrofísico Marco Micheli llevó a cabo un seguimiento astrométrico ultrapreciso de la trayectoria de 'Oumuamua utilizando observaciones conjuntas del Telescopio Espacial Hubble, el telescopio Canada-France-Hawaii y el Very Large Telescope. El objetivo era fijar con exactitud matemática el vector de salida del objeto a medida que se alejaba en dirección al sistema solar exterior.",
      "Al contrastar las coordenadas observadas con las ecuaciones gravitatorias clásicas de la relatividad general y la mecánica newtoniana que integran la masa del Sol y de todos los planetas y asteroides mayores, los investigadores detectaron una discordancia sistemática. 'Oumuamua se encontraba ligeramente por delante de la posición prevista por la física gravitatoria pura. Algo le estaba proporcionando un empuje continuo alejándolo radialmente del Sol.",
      "En los cometas habituales del sistema solar, este tipo de aceleración no gravitacional es un fenómeno físico muy común y bien comprendido. Se produce por la sublimación térmica de hielos superficiales de agua, monóxido y dióxido de carbono al aproximarse al calor solar. Los gases sublimados salen eyectados a presión hacia el espacio formando chorros o jets que actúan exactamente igual que los motores cohete de propulsión a reacción.",
      "Sin embargo, el caso de 'Oumuamua desconcertó por completo a los especialistas. A pesar de los análisis espectrales más profundos efectuados con el Telescopio Espacial Spitzer en el infrarrojo térmico, no se detectó la menor presencia de gas cianógeno, monóxido de carbono, agua o partículas microscópicas de polvo rodeando al cuerpo. Si existía una desgasificación capaz de acelerar el objeto, debía ser químicamente invisible o completamente anómala para los sensores terrestres.",
      "La magnitud calculada para esta aceleración anómala resultó ser inversamente proporcional al cuadrado de la distancia al Sol, comportándose con una dependencia matemática de 1 sobre r al cuadrado. Dicho comportamiento cinemático es característico tanto de la sublimación impulsada por radiación solar térmica como del empuje ejercido por la presión directa de radiación lumínica solar sobre una superficie delgada y altamente reflectante."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La aceleración no gravitacional de 'Oumuamua fue minúscula pero acumulativa: del orden de 5 millonésimas de metro por segundo al cuadrado en las inmediaciones del perihelio. Aunque parezca imperceptible para un vehículo cotidiano en la Tierra, a lo largo de varias semanas de viaje cósmico desvió la posición del asteroide en decenas de miles de kilómetros respecto al pronóstico balístico estándar."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El Telescopio Espacial Spitzer apuntó hacia 'Oumuamua durante más de treinta horas de exposición acumulada en el infrarrojo medio sin detectar firmas de emisión térmica de polvo. El límite superior derivado fijó que el objeto no podía estar emitiendo más de unos pocos gramos de granos de silicato por segundo, descartando la desgasificación cometaria convencional rica en polvo."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m2/banner_aceleracion-misteriosa.webp",
    "bannerCaption": "Aceleración misteriosa: Oumuamua aceleró sin eyección de gas visible, el mayor misterio de su visita",
    "fact": "El análisis astrométrico definitivo certificó que 'Oumuamua experimentó una aceleración no gravitacional radial positiva proporcional a 1/r², con una magnitud en el perihelio de aproximadamente 4.92 × 10⁻⁶ m/s². Este empuje alejó al objeto de su órbita gravitatoria pura sin producir una coma óptica o infrarroja detectable por ningún telescopio espacial."
  },
  {
    "id": "hipotesis-cientificas",
    diagramImage: '/assets/interestelar/infographic_m2/diagram_hipotesis-cientificas.webp',
    diagramCaption: 'Hipótesis científicas: iceberg de nitrógeno, cometa de hidrógeno o... la hipótesis alienígena de Loeb',
    "title": "Las Hipótesis",
    "color": "#42A5F5",
    "btnImage": "/assets/interestelar/infographic_m2/btn_hipotesis-cientificas.jpg",
    "image": "/assets/interestelar/infographic_m2/hero_hipotesis-cientificas.jpg",
    "content": [
      "La ausencia de polvo cometario y la inusual aceleración no gravitacional dieron origen a una intensa carrera de modelos teóricos para desentrañar la verdadera naturaleza física de 'Oumuamua. La comunidad científica se dividió en diversas corrientes que exploraron desde composiciones criogénicas exóticas hasta geometrías extremas moldeadas por la radiación cósmica galáctica a lo largo de millones de años de periplo interestelar.",
      "Una de las propuestas teóricas más elegantes fue formulada por los astrofísicos Darryl Seligman y Gregory Laughlin en 2020. Plantearon que 'Oumuamua podría ser un iceberg cósmico compuesto predominantemente por hielo de hidrógeno molecular puro (H2). El hidrógeno molecular sublima a temperaturas extraordinariamente bajas de tan solo unos pocos kelvin, permitiendo una desgasificación enérgica e indetectable ópticamente en el perihelio que suministraría el empuje requerido sin expulsar polvo.",
      "Poco después, los científicos Alan Jackson y Steven Desch propusieron que el objeto representaba un fragmento desprendido de la corteza congelada de un exo-Plutón rico en hielo de nitrógeno sólido (N2). Según este modelo geológico, colisiones protoplanetarias masivas en sistemas extrasolares habrían eyectado fragmentos ricos en nitrógeno puro, cuya reflectividad superficial y tasa de ablación concordarían de manera precisa con las observaciones cinemáticas registradas por los observatorios terrestres.",
      "En el plano más heterodoxo del debate, los astrofísicos Shmuel Bialy y Avi Loeb, del Centro de Astrofísica Harvard-Smithsonian, publicaron un artículo sugiriendo que la aceleración por 1 sobre r al cuadrado podía atribuirse directamente a la presión de radiación solar. Para que este mecanismo fuese efectivo sin masa eyectada, calcularon que 'Oumuamua debía poseer un espesor diminuto de menos de un milímetro con decenas de metros de superficie, especulando con la posibilidad de una vela de luz artificial o restos de tecnología alienígena.",
      "La inmensa mayoría de la comunidad astrofísica mundial desestimó la conjetura tecnológica artificial, exigiendo explicaciones estrictamente naturales basadas en los principios de la física de la materia condensada. En 2023, una sólida investigación liderada por Jennifer Bergner y Darryl Seligman en la revista Nature demostró que los rayos cósmicos galácticos bombardean hielos de agua ordinarios en el medio interestelar, dissociando moléculas de H2O y atrapando hidrógeno molecular gaseoso en la matriz porosa."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La hipótesis de la vela de luz extraterrestre atrajo una inmensa atención mediática global en 2018. El proyecto Breakthrough Listen orientó el gigantesco radiotelescopio de Green Bank en Virginia Occidental hacia 'Oumuamua para buscar señales de radio artificiales en múltiples frecuencias, concluyendo con un silencio radioeléctrico absoluto que descartó cualquier transmisión activa."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El modelo de Bergner y Seligman demostró en laboratorio que la radiólisis por rayos cósmicos procesa hielos de agua a profundidades de varios metros durante travesías interestelares de más de 100 millones de años. La liberación del H2 entrampado genera una fuerza específica suficiente para acelerar cuerpos de escala hectométrica sin requerir volátiles exóticos inestables."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m2/banner_hipotesis-cientificas.webp",
    "bannerCaption": "Hipótesis científicas: iceberg de nitrógeno, cometa de hidrógeno o... la hipótesis alienígena de Loeb",
    "fact": "La investigación publicada en Nature en 2023 demostró que la radiólisis inducida por rayos cósmicos sobre hielo de agua en el medio interestelar genera y atrapa hidrógeno molecular (H₂). Al calentarse en el perihelio, este gas se libera mecánicamente proporcionando el empuje exacto observado sin levantar granos de polvo ni requerir hipótesis artificiales."
  },
  {
    "id": "composicion-superficie",
    diagramImage: '/assets/interestelar/infographic_m2/diagram_composicion-superficie.webp',
    diagramCaption: 'Composición superficial: costra orgánica roja formada por millones de años de radiación cósmica interestelar',
    "title": "Superficie y Composición",
    "color": "#FF7043",
    "btnImage": "/assets/interestelar/infographic_m2/btn_composicion-superficie.jpg",
    "image": "/assets/interestelar/infographic_m2/hero_composicion-superficie.jpg",
    "content": [
      "A pesar de que 'Oumuamua se alejaba con rapidez y su brillo aparente decaía vertiginosamente, los astrónomos consiguieron obtener perfiles espectroscópicos fundamentales utilizando el Very Large Telescope de ESO en cerro Paranal y el Telescopio William Herschel en la isla de La Palma. Los espectros en el rango óptico e infrarrojo cercano revelaron una firma espectral continua y homogénea sin líneas de emisión o absorción pronunciadas.",
      "La característica física más sobresaliente de su superficie fue una pendiente espectral marcadamente rojiza, con un color comparable al de los asteroides de tipo D y a los cuerpos helados primitivos del cinturón de Kuiper en los confines del sistema solar. Este enrojecimiento superficial no indica la presencia de óxido de hierro como en el planeta Marte, sino la acción milenaria de procesos fotoquímicos y radiolíticos de alta energía.",
      "A lo largo de decenas o cientos de millones de años de deriva en el vacío interestelar, el objeto careció de cualquier campo magnético o atmósfera que lo protegiera contra el incesante bombardeo de los rayos cósmicos galácticos y la radiación ultravioleta del medio interestelar. Esta radiación ionizante rompe los enlaces moleculares de los hielos simples de metano, monóxido de carbono y amoníaco, induciendo complejas reacciones de polimerización orgánica.",
      "El producto resultante de esta degradación continua es una corteza superficial rica en compuestos carbonáceos complejos conocidos en astrobiología y química planetaria como tolinas. Estas macromoléculas orgánicas refractarias forman un manto protector oscuro y rojizo de hasta medio metro de espesor que aísla térmicamente el interior del asteroide, sellando eficazmente los posibles depósitos de hielo subyacentes frente a la radiación solar incidente.",
      "Los análisis de polarimetría óptica confirmaron además que la superficie de 'Oumuamua presenta un albedo muy bajo, reflejando probablemente menos del diez por ciento de la luz solar que incide sobre ella. Su aspecto exterior es comparable al carbón vegetal húmedo o al asfalto desgastado, desmintiendo las representaciones artísticas de una roca metálica reluciente y ratificando su naturaleza geológica primitiva y carbonácea."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El término «tolina» fue acuñado originalmente por el célebre astrónomo Carl Sagan en 1979 para describir los polímeros orgánicos complejos rojizos creados artificialmente en el laboratorio al irradiar con chispas eléctricas mezclas de gases simples como metano, amoníaco y agua, simulando las atmósferas y superficies de los mundos exteriores."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las observaciones espectroscópicas en el infrarrojo cercano efectuadas con el instrumento X-Shooter del VLT confirmaron que el índice espectral de 'Oumuamua se mantuvo invariable durante toda su rotación. Esto demuestra que la composición química superficial y la cobertura de tolinas son notablemente uniformes a lo largo de toda su superficie irregular."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m2/banner_composicion-superficie.webp",
    "bannerCaption": "Composición superficial: costra orgánica roja formada por millones de años de radiación cósmica interestelar",
    "fact": "Los espectros ópticos e infrarrojos obtenidos por el Very Large Telescope demostraron que la superficie de 'Oumuamua posee un índice de color neutro a marcadamente rojizo provocado por una capa de tolinas orgánicas de al menos 0.5 metros de grosor, sintetizada tras eones de exposición a los rayos cósmicos en el espacio interestelar."
  },
  {
    "id": "legado-cientifico",
    diagramImage: '/assets/interestelar/infographic_m2/diagram_legado-cientifico.webp',
    diagramCaption: 'El legado científico: Oumuamua creó un campo científico nuevo y cambió la forma de estudiar el cosmos',
    "title": "El Legado Científico",
    "color": "#FFC107",
    "btnImage": "/assets/interestelar/infographic_m2/btn_legado-cientifico.jpg",
    "image": "/assets/interestelar/infographic_m2/hero_legado-cientifico.jpg",
    "content": [
      "El fugaz paso de 1I/'Oumuamua por nuestro sistema solar transformó radicalmente paradigmas teóricos consolidados durante siglos en las ciencias planetarias. Antes de 2017, la existencia de escombros interestelares errantes era únicamente una deducción matemática derivada de modelos de formación planetaria, pero no existía ni una sola prueba observacional directa de su abundancia en la galaxia.",
      "A partir de este único avistamiento, los astrofísicos pudieron calcular por primera vez la densidad numérica de cuerpos interestelares en la Vía Láctea local. Los cálculos estadísticos indican que, en cualquier instante dado, deben encontrarse miles de millones de fragmentos rocosos y helados de escala kilométrica cruzando las órbitas de nuestro sistema solar interior, la inmensa mayoría de ellos demasiado oscuros y pequeños para los telescopios actuales.",
      "El fenómeno impulsó el desarrollo de ambiciosas misiones espaciales dedicadas a la intercepción in situ de futuros intrusos hiperbólicos. La Agencia Espacial Europea aprobó formalmente la misión Comet Interceptor, una nave que será enviada al punto de Lagrange L2 para aguardar en estado de hibernación hasta que los observatorios terrestres descubran un nuevo cometa o asteroide interestelar virgen que pueda ser alcanzado en vuelo.",
      "Asimismo, consorcios aeroespaciales privados y académicos diseñaron el Proyecto Lyra, un estudio de viabilidad técnica para evaluar el lanzamiento de nanosondas de propulsión avanzada capaces de perseguir a objetos interestelares en plena huida, empleando complejas maniobras de asistencia gravitatoria en Júpiter y en las proximidades del Sol mediante el denominado efecto Oberth solar.",
      "En el ámbito de la observación terrestre, el legado de 'Oumuamua aceleró la optimización de los algoritmos de detección en sondeos panorámicos automatizados de gran campo. La comunidad científica aprendió que la detección temprana es crucial: encontrar al visitante interestelar antes del perihelio otorga meses de estudio detallado y permite coordinar las mayores instalaciones astronómicas del planeta."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La misión Comet Interceptor de la ESA, cuyo lanzamiento está previsto para 2029, viajará al espacio sin un destino fijado de antemano. Permanecerá estacionada en el punto gravitatorio L2 a 1.5 millones de kilómetros de la Tierra, esperando pacientemente a que los astrónomos descubran un objetivo interestelar adecuado para encender sus motores e interceptarlo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los análisis de densidad de población interestelar derivados tras el paso de 'Oumuamua estiman que existen aproximadamente 1 × 10¹⁵ (mil billones) de objetos interestelares de más de cien metros de tamaño por cada pársec cúbico en el disco galáctico de la Vía Láctea, constituyendo una fracción significativa de la masa eyectada durante la migración planetaria."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m2/banner_legado-cientifico.webp",
    "bannerCaption": "El legado científico: Oumuamua creó un campo científico nuevo y cambió la forma de estudiar el cosmos",
    "fact": "El paso de 1I/'Oumuamua demostró empíricamente por primera vez que el medio interestelar contiene una población colosal de residuos planetarios errantes. Este descubrimiento impulsó el desarrollo de la misión espacial Comet Interceptor de la ESA y redefinió los modelos cuantitativos sobre la masa total eyectada por los sistemas planetarios durante su formación."
  }
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
      hue: Math.random() > 0.5 ? '255,183,77' : '239,83,80', // amber or red
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

// â”€â”€â”€ Interstellar Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,183,77,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FFB74D','#EF5350','#AB47BC','#26A69A','#42A5F5','#FF7043','#FFC107'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <path d="M 300 20 L 303 27 L 310 30 L 303 33 L 300 40 L 297 33 L 290 30 L 297 27 Z" fill="none" stroke="#FFB74D" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="300" cy="30" r="2" fill="#FFB74D" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,183,77,0.2)" />
            <stop offset="50%" stopColor="rgba(255,183,77,0.9)" />
            <stop offset="100%" stopColor="rgba(255,183,77,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFB74D" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">OUMUAMUA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,183,77,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL PRIMER MENSAJERO INTERESTELAR</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,183,77,0.2)'}`,
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
          layoutId="activeDotOumuamua"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Explora Más Detalles
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fun Fact â”€â”€â”€ */}
        {/* --- Banner Image --- */}
        {node.bannerImage && (
          <div style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            position: 'relative',
            zIndex: 2
          }}>
            <img
              src={node.bannerImage}
              alt={node.bannerCaption || node.title}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
              loading="lazy"
            />
            {node.bannerCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
                {node.bannerCaption}
              </p>
            )}

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

          </div>
        )}

        {node.fact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: '2rem',
              background: `linear-gradient(90deg, ${node.color}15, transparent)`,
              borderLeft: `4px solid ${node.color}`,
              padding: '1.2rem 1.5rem',
              borderRadius: '0 12px 12px 0',
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
            }}
          >
            <Star style={{ color: node.color, flexShrink: 0, marginTop: '2px' }} size={24} />
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: node.color, textTransform:'uppercase', letterSpacing: '1px', marginBottom: '0.4rem' }}>
                Dato Curioso
              </span>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
                {node.fact}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onNodeClick }) {
  return (
    <div style={{ margin: '2rem auto', maxWidth: '800px', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Progreso de la Misión
        </h4>
        <div style={{ color: '#FFB74D', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {Math.round((exploredIds.size / nodes.length) * 100)}%
        </div>
      </div>
      <div style={{ position: 'relative', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {nodes.map((node, i) => {
          const isExplored = exploredIds.has(node.id);
          return (
            <button
              key={node.id}
              onClick={() => onNodeClick(node.id)}
              style={{
                position: 'absolute',
                left: `${(i / (nodes.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                width: '12px', height: '12px',
                borderRadius: '50%', background: isExplored ? node.color :'rgba(255,255,255,0.2)',
                border: `2px solid ${isExplored ? '#0B0E2D' : 'transparent'}`,
                boxShadow: isExplored ? `0 0 10px ${node.color}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 2,
              }}
              title={node.title}
            />
          );
        })}
        {/* Fill bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '100%',
          background: 'linear-gradient(90deg, #FFB74D, #EF5350, #AB47BC, #26A69A, #42A5F5, #FF7043, #FFC107)',
          width: `${((exploredIds.size === 0 ? 0 : Array.from(exploredIds).map(id => nodes.findIndex(n => n.id === id)).sort((a,b)=>b-a)[0]) / (nodes.length - 1)) * 100}%`,
          borderRadius: '2px',
          transition: 'width 0.5s ease',
          zIndex: 1,
        }} />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM2() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [exploredIds, setExploredIds] = useState(new Set());
  const containerRef = useRef(null);

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  const handleNodeClick = (id) => {
    setActiveNodeId((prev) => (prev === id ? null : id));
    setExploredIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    if (containerRef.current) {
      setTimeout(() => {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div style={{
      position: 'relative',
      background: '#0B0E2D', // Deep space background
      color: 'white',
      padding: '3rem 1rem',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }} ref={containerRef}>
      <TemporalField />
      
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px', margin: '0 auto' }}>
        <InterstellarHeader />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '3rem',
          padding: '0 1rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, idx) => (
            <NodeButton
              key={node.id}
              node={node}
              index={idx}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onNodeClick={handleNodeClick} />

        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNodeId(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {/* Bibliography Section */}
        <div style={{
          marginTop: '5rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
        }}>
          <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Fuentes Científicas y Bibliografía
          </h4>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#FFB74D', opacity: 0.7 }}>•</span> {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen a tamaño completo" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
