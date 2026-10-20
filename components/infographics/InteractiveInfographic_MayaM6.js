'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya / Dzibilchaltun themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoTemple7({ size = 70, color = '#ECEFF1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 50 L50 50 L50 45 L45 45 L45 30 L40 30 L40 20 L35 20 L35 10 L25 10 L25 20 L20 20 L20 30 L15 30 L15 45 L10 45 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <rect x="25" y="35" width="10" height="15" fill={color} opacity="0.4" />
      <circle cx="30" cy="15" r="2" fill={color} />
      <line x1="20" y1="50" x2="20" y2="55" stroke={color} strokeWidth="2" />
      <line x1="40" y1="50" x2="40" y2="55" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoCenote({ size = 70, color = '#0097A7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="12" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="18" ry="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <ellipse cx="30" cy="30" rx="10" ry="4" fill={color} opacity="0.4" />
      <path d="M5 30 Q 15 45 30 50 Q 45 45 55 30" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="15" cy="30" r="1.5" fill={color} />
      <circle cx="45" cy="30" r="1.5" fill={color} />
      <circle cx="30" cy="40" r="1" fill={color} />
    </svg>
  );
}

function DecoSacbe({ size = 80, color = '#FFE0B2', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <path d="M10 35 L35 5 L45 5 L70 35" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="15" y1="30" x2="65" y2="30" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="22" y1="20" x2="58" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <line x1="28" y1="12" x2="52" y2="12" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <rect x="38" y="10" width="4" height="2" fill={color} opacity="0.5" />
      <rect x="35" y="18" width="6" height="3" fill={color} opacity="0.5" />
      <rect x="30" y="28" width="10" height="4" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoSunDoor({ size = 70, color = '#FFC400', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="20" width="20" height="30" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="35" r="8" fill={color} opacity="0.5" />
      <path d="M30 15 L30 5 M45 35 L55 35 M15 35 L5 35" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 22 L50 15 M18 22 L10 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M42 48 L50 55 M18 48 L10 55" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoFigurine({ size = 60, color = '#BF360C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="15" rx="8" ry="10" fill="none" stroke={color} strokeWidth="2" />
      <path d="M22 25 C10 30 15 45 20 45 L40 45 C45 45 50 30 38 25" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="27" cy="13" r="1" fill={color} />
      <circle cx="33" cy="13" r="1" fill={color} />
      <path d="M28 18 Q30 20 32 18" fill="none" stroke={color} strokeWidth="1" />
      <rect x="25" y="25" width="10" height="15" fill={color} opacity="0.3" rx="2" />
      <line x1="30" y1="45" x2="25" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="45" x2="35" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const DECO_MAP = {
  'dzibilchaltun-sitio': [DecoTemple7, DecoSacbe, DecoCenote],
  'templo-munecos': [DecoFigurine, DecoTemple7, DecoSunDoor],
  'equinoccio-solar': [DecoSunDoor, DecoTemple7, DecoFigurine],
  'solsticio-alineacion': [DecoSunDoor, DecoTemple7, DecoSacbe],
  'sacbe-procesional': [DecoSacbe, DecoTemple7, DecoCenote],
  'cenote-xlakah': [DecoCenote, DecoSacbe, DecoFigurine],
  'restauracion-moderna': [DecoTemple7, DecoSacbe, DecoSunDoor], }; const BIBLIOGRAPHY = ['Andrews, E.W. IV (1965). Archaeology and Prehistory in the Northern Maya Lowlands, HMAI Vol. 2',
  'Galindo Trejo, J. (2009). Arqueoastronomía en la América Antigua, UNAM',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Coggins, C. & Shane, O.C. III (1984). Cenote of Sacrifice: Maya Treasures from the Sacred Well, University of Texas Press',
  'Malmström, V.H. (1997). Cycles of the Sun, Mysteries of the Moon, University of Texas Press'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "dzibilchaltun-sitio",
    diagramImage: '/assets/maya/infographic_m6/diagram_dzibilchaltun-sitio.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Sitio: Dzibilchaltún',
    "bannerImage": "/assets/maya/infographic_m6/banner_codices-mayas.webp",
    "title": "El Sitio: Dzibilchaltún",
    "color": "#ECEFF1",
    "btnImage": "/assets/maya/infographic_m6/btn_dzibilchaltun-sitio.jpg",
    "image": "/assets/maya/infographic_m6/hero_dzibilchaltun-sitio.jpg",
    "content": [
      "Dzibilchaltún es uno de los asentamientos arqueológicos más antiguos, extensos y fascinantes del norte de la península de Yucatán. Situado a tan solo 17 kilómetros al norte de la actual ciudad de Mérida, su nombre en lengua maya yucateca significa literalmente «lugar donde hay escritura sobre piedras planas» (de ts'íib, escribir o grabar; il, locativo; y ch'áaltun, piedra plana o laja de caliza), aludiendo a las numerosas estelas conmemorativas halladas en sus plazas cívicas.",
      "A diferencia de muchas grandes metrópolis mayas que experimentaron colapsos demográficos repentinos al final del periodo Clásico, Dzibilchaltún se distingue por una longevidad habitacional casi ininterrumpida de más de dos milenios. Las exploraciones arqueológicas documentan los primeros campamentos agrícolas estables hacia el año 500 a.C., durante el periodo Preclásico Medio, y constatan que la urbe continuó poblada durante el Clásico, el Posclásico e incluso hasta la conquista española en el siglo XVI.",
      "Los reconocimientos topográficos y fotogramétricos coordinados por la Universidad de Tulane registraron más de 8,400 estructuras individuales de mampostería distribuidas a lo largo de un área nuclear y periférica superior a los 16 kilómetros cuadrados. En su época de máximo esplendor demográfico, entre los años 600 y 850 d.C., la ciudad albergó una población permanente estimada en más de 25,000 habitantes que aprovechaban su proximidad a las ricas salineras de la costa norte del golfo.",
      "El trazado urbano de Dzibilchaltún se organiza alrededor de un monumental núcleo cívico y ceremonial conectado mediante amplias calzadas de piedra blanca llamadas sacbeob. La Plaza Mayor agrupa palacios residenciales de la nobleza, plataformas para danzas multitudinarias, templos piramidales y una singular capilla cristiana abierta del siglo XVI construida por frailes franciscanos en el corazón mismo de la antigua explanada indígena.",
      "La riqueza económica y la relevancia geopolítica del asentamiento se derivaban del control monopólico sobre el comercio regional de la sal marina, el henequén silvestre y los productos pesqueros de la costa hacia las ciudades del interior peninsular. Esta sólida base mercantil permitió a los gobernantes financiar ambiciosos programas arquitectónicos orientados a la observación astronómica y a la legitimación ritual de su poder sagrado frente a las comunidades vasallas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el centro de la gran plaza ceremonial de Dzibilchaltún sobrevive una capilla abierta de piedra con arcos de medio punto construida por misioneros católicos españoles alrededor de 1590. Los frailes utilizaron los bloques de caliza de templos mayas en ruinas para levantar este templo cristiano directamente en el patio prehispánico."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El proyecto cartográfico intensivo dirigido por el arqueólogo E. Wyllys Andrews IV entre 1956 y 1965 inventarió 8,400 estructuras en 19 kilómetros cuadrados de cuadrícula, convirtiendo a Dzibilchaltún en una de las ciudades prehispánicas con mayor densidad de levantamiento topográfico de toda América Latina."
      }
    ],
    "fact": "Dzibilchaltún ostenta un registro de ocupación ininterrumpida de más de 2,000 años (desde 500 a.C. hasta 1540 d.C.) y cuenta con más de 8,400 estructuras documentadas en 16 km², constituyendo el centro urbano y comercial más longevo de la planicie septentrional de la península de Yucatán, consolidado gracias a su estratégica explotación y comercio de la sal marina en las costas del golfo de México."
  },
  {
    "id": "templo-munecos",
    diagramImage: '/assets/maya/infographic_m6/diagram_templo-munecos.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Templo de las 7 Muñecas',
    "bannerImage": "/assets/maya/infographic_m6/banner_desciframiento-maya.webp",
    "title": "El Templo de las 7 Muñecas",
    "color": "#BF360C",
    "btnImage": "/assets/maya/infographic_m6/btn_templo-munecos.jpg",
    "image": "/assets/maya/infographic_m6/hero_templo-munecos.jpg",
    "content": [
      "El Templo de las Siete Muñecas, catalogado técnicamente por los arqueólogos como la Estructura 1-sub de Dzibilchaltún, es una de las joyas constructivas más singulares de toda Mesoamérica. Erigido hacia el año 700 d.C., en pleno florecimiento del periodo Clásico Tardío, el monumento presenta una silueta arquitectónica atípica que se aleja radicalmente del modelo piramidal escalonado convencional con un solo acceso frontal orientado hacia las plazas.",
      "El edificio consiste en una torre o santuario de planta cuadrangular asentado sobre una plataforma piramidal baja accesible mediante cuatro escalinatas simétricas. La cámara central superior está coronada por una torre cuadrada maciza provista de aberturas de ventilación y vanos orientados a los cuatro puntos cardinales. Cada una de las cuatro fachadas del templo cuenta con una amplia puerta de entrada y dos ventanas rectangulares laterales talladas en muros gruesos de mampostería.",
      "Esta disposición cruciforme con vanos y puertas alineadas de oriente a poniente y de norte a sur permite una transparencia visual completa a través del corazón del edificio. Los observadores situados a distancia pueden mirar a través de los vanos opuestos como si se tratara del túnel óptico de un instrumento científico colosal. Dicha singularidad constructiva fue concebida intencionalmente para convertir la estructura en una pantalla receptora de fenómenos de luz solar extrema.",
      "El nombre popular de «Templo de las Siete Muñecas» se debe al sensacional descubrimiento arqueológico realizado en su interior durante las excavaciones de 1957. Debajo del piso estucado del santuario, los investigadores hallaron una ofrenda ritual intacta colocada en una cista de piedra: siete figurillas toscas de arcilla cocida de aspecto antropomorfo que presentaban deformaciones físicas deliberadas en sus extremidades y cuerpos.",
      "Los análisis etnohistóricos sugieren que estas siete figuras de barro representaban espíritus tutelares o personas afectadas por padecimientos que formaban parte de un complejo rito terapéutico y expiatorio de renovación comunitaria. Una vez enterrada la ofrenda junto con cuentas de jadeíta, conchas marinas y huesos tallados, los sacerdotes consagraron el templo como un santuario eterno dedicado a la fertilidad de la tierra y al renacimiento del dios solar."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las siete figurillas de arcilla que bautizaron al templo miden apenas entre 8 y 10 centímetros de alto. Varias de ellas son figuras desnudas con jorobas pronunciadas, torsos curvados o rasgos faciales asimétricos, lo que llevó a los arqueólogos a interpretarlas como ofrendas médicas para sanar enfermos o alejar epidemias de la urbe."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La Estructura 1-sub sobrevivió milagrosamente intacta porque los propios mayas del periodo Posclásico Temprano (hacia 800 d.C.) la cubrieron por completo con toneladas de escombros para levantar encima una pirámide mayor que la selló y protegió de la intemperie hasta su excavación científica a mediados del siglo XX."
      }
    ],
    "fact": "La Estructura 1-sub o Templo de las Siete Muñecas presenta una torre central de piedra caliza con vanos cruzados que ofrecen transparencia visual horizontal en sus cuatro caras, diseñada hacia el 700 d.C. para funcionar como una cámara de observación solar directa y consagrada con una ofrenda basal de siete efigies de arcilla."
  },
  {
    "id": "equinoccio-solar",
    diagramImage: '/assets/maya/infographic_m6/diagram_equinoccio-solar.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Fenómeno del Equinoccio',
    "bannerImage": "/assets/maya/infographic_m6/banner_escritura-jeroglificos-maya.webp",
    "title": "El Fenómeno del Equinoccio",
    "color": "#FFC400",
    "btnImage": "/assets/maya/infographic_m6/btn_equinoccio-solar.jpg",
    "image": "/assets/maya/infographic_m6/hero_equinoccio-solar.jpg",
    "content": [
      "El Templo de las Siete Muñecas es el epicentro de uno de los acontecimientos arqueoastronómicos más sobrecogedores y precisos de la América prehispánica. Dos veces al año, durante los amaneceres de los equinoccios de primavera (21 de marzo) y de otoño (21 al 23 de septiembre), el Sol naciente protagoniza una sincronización óptica perfecta con la arquitectura del monumento que congrega a miles de espectadores en la península de Yucatán.",
      "Conforme el disco solar emerge sobre la línea horizontal de la selva baja en el horizonte oriental, sus primeros rayos atraviesan con precisión milimétrica la puerta este del templo, cruzan la cámara central abovedada y salen por la puerta oeste proyectándose hacia el exterior. Durante un lapso de varios minutos, el vano de la entrada principal queda completamente saturado por una esfera resplandeciente de fuego solar dorado que parece quedar atrapada dentro del templo de piedra.",
      "Para los espectadores congregados a cientos de metros al poniente, sobre la amplia calzada del sacbé procesional, el efecto visual es prodigioso: el santuario entero parece incendiarse desde dentro, transformándose en una colosal linterna cósmica que anuncia el instante exacto en que el día y la noche alcanzan la misma duración temporal de doce horas en todo el planeta Tierra.",
      "En la cosmovisión maya, este evento marcaba el triunfo absoluto del dios solar Kinich Ahau sobre las fuerzas tenebrosas del inframundo nocturno. El astro rey hacía su entrada triunfal a través de la casa de las deidades para bendecir las labores agrícolas del pueblo maya. La luz que bañaba el sacbé blanco guiaba la energía vital del Sol hacia el centro de la ciudad, inaugurando oficialmente el ciclo estacional de preparación de la milpa para la siembra primaveral.",
      "Los cálculos astronómicos requeridos para diseñar este efecto exigieron una rigurosa nivelación topográfica del terreno kárstico y la determinación exacta del punto de orto solar equinoccial (azimut de 90 grados). Los arquitectos de Dzibilchaltún calcularon la altura precisa de la plataforma basal para que el dosel de la vegetación selvática no obstruyera la trayectoria horizontal del haz de luz, demostrando un dominio formidable de la óptica geométrica natural."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Para presenciar en su máximo esplendor el fenómeno del equinoccio solar en Dzibilchaltún, los visitantes deben ingresar al sitio arqueológico alrededor de las 05:30 horas de la madrugada, antes de que aclare el cielo, colocándose sobre el eje central del Sacbé 1 para ver brotar la luz del Sol a través de las puertas del templo a las 06:15 horas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La orientación del eje visual del Templo de las Siete Muñecas coincide con el punto de orto solar con una desviación menor a 0.25 grados respecto al equinoccio astronómico verdadero. Esta exactitud elimina cualquier hipótesis de alineación aleatoria y prueba la existencia de observaciones horizonales continuadas durante décadas."
      }
    ],
    "fact": "Durante los amaneceres de los equinoccios de primavera y otoño, el disco solar emerge por el horizonte este y penetra limpiamente por las puertas alineadas del Templo de las Siete Muñecas, proyectando un haz de luz dorada a lo largo del Sacbé 1 con una exactitud de azimut astronómico de 90 grados, confirmando la formidable destreza de la arquitectura astronómica e ingeniería óptica desarrollada por los constructores mayas clásicos."
  },
  {
    "id": "solsticio-alineacion",
    diagramImage: '/assets/maya/infographic_m6/diagram_solsticio-alineacion.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Los Solsticios: Las Otras Fechas',
    "bannerImage": "/assets/maya/infographic_m6/banner_glifos-modernos.webp",
    "title": "Los Solsticios: Las Otras Fechas",
    "color": "#00B8D4",
    "btnImage": "/assets/maya/infographic_m6/btn_solsticio-alineacion.jpg",
    "image": "/assets/maya/infographic_m6/hero_solsticio-alineacion.jpg",
    "content": [
      "Aunque el fenómeno del equinoccio es el más famoso y promocionado a nivel turístico, las investigaciones arqueoastronómicas multidisciplinarias han demostrado que el Templo de las Siete Muñecas formaba parte de un complejo observacional mucho más vasto que registraba otras efemérides cardinales del año solar: los solsticios de verano y de invierno, así como los días del paso cenital del astro diurno.",
      "Los estudios de campo dirigidos por arqueoastrónomos como Franz Tichy y Anthony Aveni revelaron que las diagonales trazadas a través de las esquinas exteriores del edificio y las ventanas laterales no eran simples elementos ornamentales. Durante el solsticio de verano (21 de junio), cuando el Sol alcanza su posición de salida más septentrional en el horizonte, los rayos matutinos penetran en ángulo rasante por la ventana nororiental del santuario, iluminando el altar interior.",
      "De manera complementaria, en el solsticio de invierno (21 de diciembre), cuando el Sol nace en su punto más meridional sobre el horizonte, la luz solar se proyecta a través de la ventana suroriental, creando un patrón de iluminación diagonal inverso sobre los muros estucados. De esta forma, el templo funcionaba como un dial o tablero astronómico integral capaz de calibrar el avance continuo del Sol entre sus dos límites extremos de declinación boreal y austral.",
      "Asimismo, los arqueólogos descubrieron en la gran explanada una serie de estelas lisas y basamentos de piedra que actuaban como marcadores de mira lejanos al ser observados desde la plataforma del templo. La alineación con estos monolitos marcaba intervalos de 73 días y 65 días antes y después de los solsticios, subdivisiones aritméticas exactas vinculadas de forma directa con la estructura del calendario sagrado Tzolk'in de 260 días (4 × 65 = 260).",
      "Esta pluralidad de alineaciones astronómicas demuestra que el edificio no era un monumento diseñado para un solo día festivo al año, sino una estación científica permanente de colimación solar. Los sabios mayas de Dzibilchaltún monitoreaban cotidianamente el desplazamiento del punto de salida del Sol a lo largo del horizonte oriental para mantener actualizado el calendario agrícola de toda la región norte de Yucatán."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Al pararse de espaldas al Templo de las Siete Muñecas durante el atardecer del solsticio de invierno, la sombra proyectada por la torre central se estira de manera monumental a lo largo de los casi 500 metros del sacbé empedrado, apuntando como una flecha oscura directa hacia el centro ceremonial del palacio principal."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El intervalo temporal de 73 días resultante de las líneas de mira solsticiales en Dzibilchaltún posee un valor matemático clave en Mesoamérica: 73 es el factor exacto que conmensura el Tzolk'in de 260 días con el Haab' de 365 días en la Rueda Calendárica de 52 años (73 × 260 = 52 × 365 = 18,980 días)."
      }
    ],
    "fact": "El diseño geométrico del Templo de las Siete Muñecas incorpora líneas de mira diagonales a través de sus ventanas laterales que enmarcan las salidas del Sol en los solsticios de verano e invierno, subdividiendo el año solar en múltiplos de 65 y 73 días congruentes con la matemática de la Rueda Calendárica."
  },
  {
    "id": "sacbe-procesional",
    diagramImage: '/assets/maya/infographic_m6/diagram_sacbe-procesional.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Sacbé: El Camino Blanco',
    "bannerImage": "/assets/maya/infographic_m6/banner_inscripciones-palenque.webp",
    "title": "El Sacbé: El Camino Blanco",
    "color": "#FFE0B2",
    "btnImage": "/assets/maya/infographic_m6/btn_sacbe-procesional.jpg",
    "image": "/assets/maya/infographic_m6/hero_sacbe-procesional.jpg",
    "content": [
      "Uno de los elementos urbanos y ceremoniales más imponentes de Dzibilchaltún es el denominado Sacbé 1, una colosal calzada elevada de mampostería de piedra que une de forma rectilínea el Templo de las Siete Muñecas en el extremo oriental con el núcleo monumental de la Plaza Mayor en el poniente. El vocablo maya «sacbé» (plural sacbeob) se compone de las raíces sac (blanco) y bé (camino), aludiendo al brillante pavimento de estuco de cal con el que estaban recubiertas estas vías.",
      "El Sacbé 1 mide aproximadamente 480 metros de longitud rectilínea ininterrumpida y alcanza un ancho promedio de entre 8 y 10 metros, elevándose más de un metro sobre el nivel del terreno selvático circundante mediante muros de contención construidos con bloques labrados de piedra caliza. El núcleo del camino fue rellenado con miles de toneladas de piedras toscas y cascajo, sellado en su superficie superior por una gruesa capa de sascab compactado con rodillos de madera.",
      "Lejos de ser un simple sendero de tránsito peatonal para el comercio cotidiano, el Sacbé 1 operaba como una monumental pista procesional y como una línea de colimación óptica astronómica. Su trazado rigurosamente horizontal y recto permitía a los sacerdotes y fieles mantener una perspectiva visual despejada del Templo de las Siete Muñecas a lo largo de casi medio kilómetro de distancia, amplificando el impacto visual de los fenómenos solares.",
      "Durante las festividades religiosas de los equinoccios, solemnes procesiones encabezadas por el Halach Uinic, sacerdotes ataviados con plumas de quetzal y músicos que ejecutaban trompetas de caracol marino desfilaban lentamente por el Sacbé 1. Conforme la luz del Sol naciente emergía del templo en el este, la multitud avanzaba en sentido inverso hacia el poniente, llevando metafóricamente la bendición solar hacia los palacios gubernamentales de la ciudad.",
      "Los sacbeob de Dzibilchaltún simbolizaban también la unificación política y territorial del reino. Al conectar grupos arquitectónicos distantes construidos en distintas épocas, las calzadas blancas actuaban como arterias físicas que integraban a los diferentes linajes nobles bajo una autoridad centralizada, facilitando a la vez el movimiento rápido de tropas defensivas y el acarreo de mercancías tributarias desde las áreas residenciales periféricas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Por las noches de luna llena, el acabado de estuco de cal blanca pulida de los sacbeob reflejaba la luz plateada de la Luna con tanta intensidad que los habitantes mayas podían caminar a lo largo de las calzadas a oscuras a través de la selva sin necesidad de encender antorchas para alumbrar sus pasos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los análisis de ingeniería vial prehispánica realizados por el INAH en el Sacbé 1 revelaron que la calzada cuenta con un ligero declive lateral de 1.5 grados en sus bordes exteriores, diseñado como un eficiente sistema de drenaje pluvial para evitar que los encharcamientos destruyeran la superficie de sascab durante los huracanes veraniegos."
      }
    ],
    "fact": "El Sacbé 1 de Dzibilchaltún constituye una avenida ceremonial elevada de 480 metros de largo por 10 metros de ancho pavimentada con caliza y sascab blanco, construida con una rectitud topográfica milimétrica para enlazar el Templo de las Siete Muñecas con la Plaza Mayor y canalizar la visión del equinoccio solar."
  },
  {
    "id": "cenote-xlakah",
    diagramImage: '/assets/maya/infographic_m6/diagram_cenote-xlakah.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Cenote Xlakah: El Portal de Agua',
    "bannerImage": "/assets/maya/infographic_m6/banner_landa-destruccion.webp",
    "title": "Cenote Xlakah: El Portal de Agua",
    "color": "#0097A7",
    "btnImage": "/assets/maya/infographic_m6/btn_cenote-xlakah.jpg",
    "image": "/assets/maya/infographic_m6/hero_cenote-xlakah.jpg",
    "content": [
      "En el corazón geográfico y espiritual del centro monumental de Dzibilchaltún se encuentra el majestuoso Cenote Xlakah, una de las dolinas kársticas a cielo abierto más profundas e importantes de toda la península de Yucatán. Su nombre en maya significa literalmente «pueblo viejo» (de xla', viejo o antiguo; y kah, pueblo o comunidad), lo que evidencia el carácter ancestral que los habitantes originarios otorgaban a este cuerpo acuífero natural.",
      "El cenote presenta una forma ovalada en su superficie de aproximadamente 100 metros de longitud por 40 metros de anchura, con aguas cristalinas de tonalidad azul turquesa. Su profundidad comienza con una orilla somera de un metro de fondo y desciende de forma empinada y vertiginosa hacia el oriente, abriéndose en una gigantesca caverna sumergida horizontal que alcanza más de 44 metros de profundidad explorada por buzos profesionales sin llegar a su fondo final.",
      "En una región como el norte de Yucatán, totalmente desprovista de ríos o arroyos superficiales debido a la permeabilidad de la plataforma caliza, el Cenote Xlakah fue la causa primordial que posibilitó el florecimiento y sostenimiento de más de 25,000 habitantes urbanos durante dos milenios continuos. Era la fuente inagotable de agua dulce potable para la población y el santuario central para el culto al dios de la lluvia Chaac.",
      "Entre 1957 y 1959, la National Geographic Society y la Universidad de Tulane financiaron expediciones pioneras de arqueología subacuática en las profundidades del cenote, dirigidas por buzos de la marina estadounidense y arqueólogos mexicanos. Utilizando mangueras de succión de aire y tanques de buceo, los exploradores recuperaron del sedimento sumergido más de 30,000 artefactos arqueológicos intactos de incalculable valor histórico.",
      "Entre los hallazgos subacuáticos destacan miles de vasijas de cerámica polícroma ceremonial, flautas de barro, collares de cuentas de jade verde, huesos humanos y animales con inscripciones jeroglíficas incisas y agujas ceremoniales de espina de mantarraya. Estos objetos fueron ofrendados a lo largo de siglos por los peregrinos que arrojaban dones preciosos a las aguas sagradas para pedir a los dioses del inframundo lluvias abundantes y salud para sus cosechas de maíz."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En las aguas transparentes del Cenote Xlakah habita una pequeña especie de pez endémico sumamente raro y adaptado a las aguas kársticas de Yucatán: la dama blanca ciega (*Typhliasina pearsei*), un pez de color lechoso y sin ojos funcionales que habita en los rincones más profundos y oscuros de la caverna sumergida."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La exploración con sónar y buceo espeleológico en Cenote Xlakah confirmó que la galería sumergida se conecta con una intrincada red de ríos subterráneos freáticos que fluyen hacia el mar Caribe y el Golfo de México, alimentada por el gigantesco anillo de cenotes asociado al cráter de impacto de Chicxulub."
      }
    ],
    "fact": "El Cenote Xlakah posee una cuenca abierta de 100 por 40 metros que desciende a más de 44 metros de profundidad sumergida, de donde expediciones de la National Geographic Society y el INAH rescataron más de 30,000 ofrendas mayas prehispánicas de cerámica polícroma, jade y huesos tallados, consolidándolo como uno de los reservorios arqueológicos subacuáticos más fecundos y determinantes de la civilización maya."
  },
  {
    "id": "restauracion-moderna",
    diagramImage: '/assets/maya/infographic_m6/diagram_restauracion-moderna.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Restauración Moderna',
    "bannerImage": "/assets/maya/infographic_m6/banner_legado-escritura-maya.webp",
    "title": "La Restauración Moderna",
    "color": "#2E7D32",
    "btnImage": "/assets/maya/infographic_m6/btn_restauracion-moderna.jpg",
    "image": "/assets/maya/infographic_m6/hero_restauracion-moderna.jpg",
    "content": [
      "La recuperación científica y la restauración arquitectónica de Dzibilchaltún constituyen un hito fundamental en los anales de la arqueología moderna mesoamericana. A mediados del siglo XX, el Templo de las Siete Muñecas no era visible como la elegante torre transparente que contemplamos hoy en día; en su lugar, se erguía una informe colina de escombros de piedra y tierra cubierta por la densa maleza espinosa de la selva yucateca.",
      "A partir de 1956, el Instituto Nacional de Antropología e Historia (INAH) de México y el Instituto de Investigaciones Mesoamericanas (MARI) de la Universidad de Tulane, bajo el liderazgo del eminente arqueólogo E. Wyllys Andrews IV, iniciaron un ambicioso proyecto de excavación a gran escala. Al desmantelar metódicamente los restos derrumbados de la pirámide exterior del Posclásico, los especialistas descubrieron con asombro la Estructura 1-sub intacta en su interior.",
      "El proceso de anastilosis y consolidación estructural demandó años de laboriosa ingeniería. Cada sillar de piedra caliza desplomado fue codificado, catalogado y recolocado en su posición original utilizando morteros compatibles a base de cal apagada y sascab para no alterar la porosidad de la roca original. Asimismo, se reforzaron las bóvedas mayas superiores y se reconstruyeron los vanos de las cuatro fachadas para devolverles su funcionalidad astronómica original.",
      "Fue durante estas meticulosas labores de campo cuando los investigadores descubrieron con sorpresa la alineación del fenómeno del equinoccio. Al limpiar los vanos oriental y occidental y despejar el trazado del Sacbé 1, los arqueólogos presenciaron al amanecer cómo el disco del Sol naciente se posicionaba en el centro geométrico exacto de las puertas del templo, confirmando que la arquitectura maya obedecía a rigurosos planos arqueoastronómicos.",
      "En la actualidad, Dzibilchaltún cuenta con el moderno Museo del Pueblo Maya, administrado por el INAH, que resguarda las siete muñecas originales de arcilla, estelas glíficas y tesoros extraídos del Cenote Xlakah. El sitio permanece como un laboratorio vivo de investigación y un destino cultural de primer nivel donde la ciencia contemporánea dialoga cotidianamente con la milenaria sabiduría cósmica de los constructores originarios de Yucatán."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante los trabajos de consolidación de la torre en la década de 1960, los arqueólogos tuvieron que diseñar un discreto sistema de tirantes internos de acero inoxidable ocultos dentro del mortero de cal para sostener las pesadas jambas de piedra de las ventanas sin alterar la apariencia visual prehispánica del monumento."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los levantamientos tridimensionales mediante tecnología de fotogrametría digital con drones realizados por el INAH han creado una réplica virtual milimétrica de la Estructura 1-sub, permitiendo a astrónomos de cualquier parte del mundo simular la trayectoria del Sol en cualquier fecha del año mediante computadoras."
      }
    ],
    "fact": "La restauración científica del Templo de las Siete Muñecas por el INAH y la Universidad de Tulane (1956-1965) rescató la Estructura 1-sub sepultada bajo una pirámide posterior colapsada, reintegrando sus muros mediante anastilosis y redescubriendo empíricamente el fenómeno de alineación equinoccial."
  }
];

// â”€â”€â”€ Maya Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaField() {
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
    // Golden and cyan fireflies/particles
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.2,
      hue: Math.random() > 0.5 ? '255,196,0' : '0,151,167', // gold or cyan
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
        p.x += p.drift;
        p.y -= 0.1;
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

// â”€â”€â”€ Maya Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,196,0,0.3))' }}>
        {/* Sun arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="3" strokeLinecap="round" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#ECEFF1','#BF360C','#FFC400','#00B8D4','#FFE0B2','#0097A7','#2E7D32'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central Sun Door Icon */}
        <rect x="292" y="22" width="16" height="24" fill="none" stroke="#FFC400" strokeWidth="1.5" opacity="0.8" />
        <circle cx="300" cy="34" r="5" fill="#FFC400" opacity="0.7" />
        <line x1="285" y1="34" x2="275" y2="34" stroke="#FFC400" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="315" y1="34" x2="325" y2="34" stroke="#FFC400" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,196,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,196,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,196,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFC400" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TEMPLO 7 MUÑECAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,196,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL RELOJ SOLAR DE DZIBILCHALTÚN</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        width: '116px',
        height: '116px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(255,196,0,0.2)'}`,
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
        fontSize: '0.86rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '128px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotMaya"
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

// â”€â”€â”€ Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        background: 'rgba(10, 15, 10, 0.92)',
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
            <h4 style={{
              color: node.color, fontSize: '1.1rem', margin: '0 0 1rem 0',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={18} />
              Explora Más a Fondo
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
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

              {node.fact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: '2rem',
              background: `linear-gradient(45deg, ${node.color}15, transparent)`,
              border: `1px solid ${node.color}40`,
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{
              background: node.color, color: '#0B0E2D', borderRadius: '50%',
              width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: `0 0 15px ${node.color}60`,
            }}>
              <Star size={20} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1rem' }}>Dato Fascinante</h4>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {node.fact}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onNodeClick }) {
  const progress = (exploredIds.length / nodes.length) * 100;

  return (
    <div style={{
      marginTop: '2rem',
      background: 'rgba(0,0,0,0.4)',
      padding: '1.5rem',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.1)',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.5px' }}>
          Progreso de Exploración
        </span>
        <span style={{ color: '#FFC400', fontSize: '0.9rem', fontWeight: 700, fontFamily: 'monospace' }}>
          {exploredIds.length} / {nodes.length} Nodos
        </span>
      </div>

      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, background:'linear-gradient(90deg, #FFC400, #FFAB91)',
            boxShadow: '0 0 10px rgba(255,196,0,0.5)',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '4px' }}>
        {nodes.map((node, i) => {
          const isExplored = exploredIds.includes(node.id);
          return (
            <motion.button
              key={node.id}
              onClick={() => onNodeClick(node.id)}
              whileHover={{ scale: 1.2 }}
              style={{
                width: '24px', height: '24px', borderRadius: '50%',
                border: 'none', cursor: 'pointer', background: isExplored ? node.color :'rgba(255,255,255,0.1)',
                boxShadow: isExplored ? `0 0 8px ${node.color}80` : 'none',
                transition: 'all 0.3s',
              }}
              title={node.title}
            />
          );
        })}
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Exported Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM6() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const containerRef = useRef(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);

  const handleNodeClick = (id) => {
    setActiveNodeId(id);
    if (!exploredIds.includes(id)) {
      setExploredIds(prev => [...prev, id]);
    }
    setTimeout(() => {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0A0D18, #111B24)',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem',
      borderRadius: '24px',
      overflow: 'hidden',
    }} ref={containerRef}>
      
      {/* Background Particle Effects */}
      <MayaField />
      
      {/* Dark vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 30%, transparent 20%, rgba(10,13,24,0.85) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
        
        <MayaHeader />

        {/* â”€â”€â”€ Node Navigation Buttons â”€â”€â”€ */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          margin: '3rem 0',
          position: 'relative',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          ))}
        </div>

        {/* â”€â”€â”€ Selected Node Content â”€â”€â”€ */}
        <AnimatePresence mode="wait">
          {activeNode ? (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNodeId(null)}
              setLightboxSrc={setLightboxSrc}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center', padding: '4rem 2rem', color: 'rgba(255,255,255,0.5)',
                border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '24px',
              }}
            >
              <Sparkles size={32} style={{ opacity: 0.5, marginBottom: '1rem', color: '#FFC400' }} />
              <p style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
                Selecciona un nodo interactivo arriba para explorar el Templo de las 7 Muñecas.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* â”€â”€â”€ Progress Tracker â”€â”€â”€ */}
        <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onNodeClick={handleNodeClick} />

        {/* â”€â”€â”€ Bibliography â”€â”€â”€ */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.85rem',
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ChevronRight size={14} /> Fuentes y Bibliografía
          </h4>
          <ul style={{ lineHeight: 1.8, paddingLeft: '1.5rem', listStyleType: 'circle' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* â”€â”€â”€ Global Lightbox â”€â”€â”€ */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
