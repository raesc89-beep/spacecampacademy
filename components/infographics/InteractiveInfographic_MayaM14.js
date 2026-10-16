'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya / Edzná themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoGnomon({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <line x1="30" y1="50" x2="30" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="30" cy="50" rx="15" ry="4" fill={color} opacity="0.3" />
      <path d="M 30 15 L 45 50 L 30 50 Z" fill={color} opacity="0.4" />
      <circle cx="30" cy="10" r="3" fill={color} opacity="0.6" />
      {/* Sun rays */}
      <line x1="30" y1="2" x2="30" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="4" x2="25" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="4" x2="35" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoZenithSun({ size = 70, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="10" fill={color} />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" strokeDasharray="4 4" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {[0,45,90,135,180,225,270,315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line key={i} 
            x1={30 + 12 * Math.cos(rad)} y1={30 + 12 * Math.sin(rad)} 
            x2={30 + 26 * Math.cos(rad)} y2={30 + 26 * Math.sin(rad)} 
            stroke={color} strokeWidth={i%2===0 ? "2" : "1"} strokeLinecap="round" 
          />
        );
      })}
    </svg>
  );
}

function DecoCanal({ size = 70, color = '#0288D1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 0 20 Q 15 10 30 20 T 60 20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 0 30 Q 15 20 30 30 T 60 30" fill="none" stroke={color} strokeWidth="2.5" opacity="0.7" />
      <path d="M 0 40 Q 15 30 30 40 T 60 40" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <rect x="10" y="15" width="4" height="4" fill={color} opacity="0.5" />
      <rect x="40" y="25" width="6" height="4" fill={color} opacity="0.6" />
      <rect x="25" y="35" width="5" height="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoFiveLevels({ size = 70, color = '#8D6E63', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="5" y="45" width="50" height="6" fill={color} opacity="0.8" />
      <rect x="10" y="39" width="40" height="6" fill={color} opacity="0.7" />
      <rect x="15" y="33" width="30" height="6" fill={color} opacity="0.6" />
      <rect x="20" y="27" width="20" height="6" fill={color} opacity="0.5" />
      <rect x="25" y="21" width="10" height="6" fill={color} opacity="0.4" />
      <rect x="27" y="10" width="6" height="11" fill={color} opacity="0.3" />
      <circle cx="30" cy="14" r="1.5" fill="#fff" />
      <circle cx="30" cy="18" r="1.5" fill="#fff" />
      <path d="M 28 51 L 28 21 L 32 21 L 32 51 Z" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoShadow({ size = 70, color = '#212121', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <defs>
        <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.8" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points="10,50 50,50 35,10 25,10" fill="url(#shadowGrad)" />
      <circle cx="30" cy="8" r="4" fill={color} opacity="0.4" />
      <line x1="20" y1="30" x2="10" y2="25" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2" />
      <line x1="40" y1="30" x2="50" y2="25" stroke={color} strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

const DECO_MAP = {
  'edzna-ciudad': [DecoFiveLevels, DecoCanal, DecoZenithSun],
  'paso-cenital': [DecoZenithSun, DecoShadow, DecoGnomon],
  'gnomon-vertical': [DecoGnomon, DecoShadow, DecoZenithSun],
  'edificio-cinco-pisos': [DecoFiveLevels, DecoZenithSun, DecoCanal],
  'sistema-hidraulico': [DecoCanal, DecoZenithSun, DecoShadow],
  'latitud-tropical': [DecoZenithSun, DecoGnomon, DecoFiveLevels],'medicion-tiempo': [DecoShadow, DecoZenithSun, DecoGnomon],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Å prajc, I. (2001). Orientaciones Astronómicas en la Arquitectura Prehispánica, INAH',
  'Galindo Trejo, J. (2009). Arqueoastronomía en la América Antigua, UNAM',
  'Malmström, V.H. (1997). Cycles of the Sun, Mysteries of the Moon, University of Texas Press',
  'Andrews, G.F. (1995). Pyramids and Palaces, Monsters and Masks: Architecture of the Puuc Region, Labyrinthos',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "edzna-ciudad",
    "bannerImage": "/assets/maya/infographic_m14/banner_edzna-ciudad.webp",
    "title": "La Ciudad",
    "color": "#8D6E63",
    "btnImage": "/assets/maya/infographic_m14/btn_edzna-ciudad.jpg",
    "image": "/assets/maya/infographic_m14/hero_edzna-ciudad.jpg",
    "content": [
      "Emplazada en una amplia cuenca sedimentaria del estado de Campeche, la metrópoli maya de Edzná —cuyo nombre en maya yucateco traduce tradicionalmente «Casa de los Itzáes» o «Casa de los Gestos»— representa uno de los logros más deslumbrantes de la ingeniería y la arquitectura mesoamericana. Ocupada de forma continua desde el año 600 a.C. hasta el 1450 d.C., la ciudad floreció como un centro rector durante el Clásico Tardío.",
      "La posición geopolítica de Edzná le otorgó un papel estratégico como nodo comercial y bisagra cultural entre las diversas regiones del mundo maya. En sus monumentos confluyen de manera armónica los estilos arquitectónicos Petén, con sus basamentos colosales y taludes pronunciados, Chenes, reconocible por sus fachadas de estuco ornamentadas, y Puuc, célebre por su mampostería de piedras labradas y columnillas encajadas.",
      "El núcleo cívico y ceremonial de la urbe se organiza en torno a la Gran Plaza, una inmensa explanada abierta de más de ciento sesenta metros de longitud rodeada por estructuras monumentales como el Nohochná («La Casa Grande»), la Plataforma de los Cuchillos y la cancha del juego de pelota. Hacia el flanco oriental de esta plaza se alza la Gran Acrópolis, una terraza monumental elevada que sostiene los santuarios de la élite gobernante.",
      "Las excavaciones arqueológicas dirigidas por investigadores como Román Piña Chán y George Andrews demostraron que la prosperidad de Edzná se cimentó en el dominio absoluto de su entorno ecológico. En un valle naturalmente propenso a severas inundaciones durante las tormentas estivales y a una sequía extrema en los meses invernales, sus pobladores transformaron el terreno hostil en un vergel agrícola de alta productividad.",
      "Declarada zona de monumentos arqueológicos protegida por el estado mexicano, Edzná asombra a los especialistas por su perfecta integración espacial entre edificios de gobierno, santuarios religiosos y obras de infraestructura hidráulica. La urbe entera fue concebida como un organismo vivo donde la captación de aguas pluviales y la observación de los astros marchaban en íntima sincronía con la vida civil cotidiana."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El nombre jeroglífico clásico original de Edzná no era «Edzná», sino que en las estelas dinásticas del Clásico Temprano se le identifica con el topónimo de B'aknal o el Reino del Pájaro Centinela. El nombre moderno procede de relatos coloniales del siglo XVI recopilados tras la dispersión de las familias nobles itzáes por la península."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El valle de Edzná está asentado sobre una formación geológica de arcillas montmorilloníticas de drenaje lento conocidas como vertisoles. Este tipo de suelo arcilloso se expande e impermeabiliza naturalmente al absorber las primeras lluvias, una propiedad pedológica que los ingenieros mayas aprovecharon para sellar los fondos de sus canales sin mortero artificial."
      }
    ],
    "fact": "La Gran Plaza de Edzná abarca más de 25,000 metros cuadrados de superficie nivelada artificialmente con gravas de caliza y mortero de estuco blanco. Bajo su pavimento se diseñó una red invisible de drenes pluviales subterráneos con pendientes de 1 a 2 grados que desalojaban instantáneamente el exceso de lluvia torrencial hacia los canales agrícolas periféricos."
  },
  {
    "id": "paso-cenital",
    "bannerImage": "/assets/maya/infographic_m14/banner_paso-cenital.webp",
    "title": "El Paso Cenital",
    "color": "#FFD600",
    "btnImage": "/assets/maya/infographic_m14/btn_paso-cenital.jpg",
    "image": "/assets/maya/infographic_m14/hero_paso-cenital.jpg",
    "content": [
      "En la latitud tropical del valle de Edzná (19° 35' de latitud norte), el Sol protagoniza un fenómeno óptico y astronómico de inmensa trascendencia física dos veces al año: el paso cenital. En estas dos jornadas señaladas, el disco solar alcanza una elevación de noventa grados exactos sobre el horizonte local al mediodía verdadero, situándose en el cenit geométrico absoluto de la bóveda celeste.",
      "Durante el instante del cenit solar, los postes verticales, las columnas cilíndricas y las paredes perfectamente aplomadas dejan de proyectar sombra lateral alguna sobre el suelo. La luz incide perpendicularmente desde el cenit, iluminando el fondo de pozos profundos y penetrando verticalmente a través de orificios diseñados en los techos de las cámaras sagradas, creando una vivencia visual de sobrecogedora solemnidad.",
      "En las coordenadas geográficas de Edzná, el primer paso cenital del año ocurre aproximadamente el 17 de mayo, mientras que el segundo tránsito cenital tiene lugar cerca del 26 de julio. El intervalo entre ambas fechas comprende setenta días exactos, un lapso que coincide con el núcleo más intenso de la temporada de precipitaciones pluviales estivales y con el periodo de máximo crecimiento vegetativo del maíz en la milpa.",
      "Para los sacerdotes astrónomos de Edzná, el 17 de mayo representaba la fecha de arranque del calendario productivo y litúrgico. La desaparición de la sombra al mediodía era interpretada como el momento en que el Sol descendía físicamente a la tierra para fecundarla con su energía radiante, confirmando que la naturaleza estaba lista para recibir las semillas sagradas en los campos previamente labrados y fertilizados.",
      "Diversos templos de la ciudad, en particular los aposentos superiores de la Gran Acrópolis, presentan alineaciones solares rigurosas orientadas hacia el acimut del mediodía cenital. La exactitud de estos registros permitía a la corte maya calibrar anualmente el calendario civil Haab' de 365 días, evitando los errores acumulativos que habrían distorsionado las fechas de siembra y recolección a lo largo de las décadas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el folclore maya yucateco tradicional, el día del paso cenital es conocido como el día del «Sol sin sombra». Los campesinos contemporáneos colocan botellas de agua o varas rectas de madera al mediodía para observar cómo la sombra desaparece bajo la base, recordando una tradición astronómica milenaria heredada de sus ancestros clásicos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El paso cenital solar no ocurre en una fecha idéntica en toda Mesoamérica, sino que varía según la latitud geográfica del observador. En Copán (14° 50' N) ocurre a finales de abril y mediados de agosto, mientras que en el norte de Yucatán (Chichén Itzá, 20° 40' N) se produce a finales de mayo y mediados de julio, avanzando como una ola geográfica hacia el norte."
      }
    ],
    "fact": "La separación temporal entre el primer paso cenital (17 de mayo) y el segundo paso cenital (26 de julio) en Edzná es de exactamente 70 días. El periodo complementario que transcurre desde el segundo paso cenital hasta el regreso del Sol al cenit el año siguiente dura exactamente 295 días (70 + 295 = 365 días), integrando una proporción matemática solar perfecta."
  },
  {
    "id": "gnomon-vertical",
    "bannerImage": "/assets/maya/infographic_m14/banner_gnomon-vertical.webp",
    "title": "El Gnomón",
    "color": "#212121",
    "btnImage": "/assets/maya/infographic_m14/btn_gnomon-vertical.jpg",
    "image": "/assets/maya/infographic_m14/hero_gnomon-vertical.jpg",
    "content": [
      "El instrumento astronómico fundamental utilizado por los sabios de Edzná para medir con precisión instrumental el paso cenital y la declinación solar fue el gnomón vertical. En su forma más pura, consistía en una columna monolítica de piedra caliza pulida, un poste de madera dura cilíndrica o una estela erigida con riguroso aplomo perpendicular respecto a un piso ceremonial perfectamente nivelado con mortero de cal hidráulica.",
      "Los principios trigonométricos del gnomón se fundamentan en la proyección de sombras. A lo largo del año, la sombra proyectada por el vértice del gnomón al mediodía solar varía diariamente en longitud y dirección: alcanza su máxima extensión hacia el norte durante el solsticio de invierno, se acorta progresivamente durante los equinoccios de primavera y otoño, y se reduce a cero absoluto durante el paso cenital.",
      "En la explanada de la Gran Acrópolis de Edzná se conservan basamentos circulares y cavidades pétreas que sirvieron como receptáculos fijos para estos instrumentos de medición. Alrededor de la base del gnomón, los matemáticos trazaban círculos concéntricos y líneas radiales grabadas en el estuco que operaban como cuadrantes solares, permitiendo medir la velocidad angular del Sol y predecir los cambios estacionales.",
      "Además de las estelas al aire libre, los constructores de Edzná idearon gnomones de luz invertidos dentro de recintos techados. Al perforar un conducto vertical angosto o chimenea cenital en el techo abovedado de una cámara sagrada, un haz cilíndrico de luz solar descendía al mediodía, proyectando una mancha brillante en el piso oscuro que alcanzaba el centro de un disco de piedra únicamente el día del paso cenital exacto.",
      "La utilización sistemática del gnomón desmiente el mito de que los antiguos mayas dependían de corazonadas místicas o magia para ordenar su sociedad. Se trataba de una ciencia empírica rigurosa, basada en la experimentación física, la geometría descriptiva y la recopilación metódica de datos numéricos contrastables, situando a los astrónomos de Edzná entre los físicos observacionales más avanzados de su tiempo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el Templo de los Cinco Pisos se descubrieron restos de estelas líticas lisas, carentes de figuras talladas o jeroglíficos. Durante décadas los arqueólogos creyeron que estaban inconclusas, pero los arqueoastrónomos demostraron que funcionaban deliberadamente como gnomones lisos para no distorsionar la línea de sombra con relieves escultóricos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Un gnomón de dos metros de altura colocado a 19° 35' de latitud norte proyecta una sombra de mediodía de más de 1.80 metros durante el solsticio de invierno (diciembre), mientras que el 17 de mayo y el 26 de julio la sombra se reduce a cero milímetros. Este contraste geométrico evidente facilitaba mediciones cuantitativas sin instrumentos ópticos modernos."
      }
    ],
    "fact": "Para garantizar que los gnomones tuvieran un aplomo vertical perfecto de 90 grados respecto al horizonte, los constructores de Edzná utilizaban plomadas de cuerda con pesos cónicos de hematita o basalto pulido, combinadas con canales perimetrales de agua inmóvil en el suelo que funcionaban como niveles hidrostáticos de insuperable precisión óptica."
  },
  {
    "id": "edificio-cinco-pisos",
    "bannerImage": "/assets/maya/infographic_m14/banner_edificio-cinco-pisos.webp",
    "title": "Edificio de Cinco Pisos",
    "color": "#8D6E63",
    "btnImage": "/assets/maya/infographic_m14/btn_edificio-cinco-pisos.jpg",
    "image": "/assets/maya/infographic_m14/hero_edificio-cinco-pisos.jpg",
    "content": [
      "Coronando con majestuosidad la plataforma de la Gran Acrópolis, el Edificio de los Cinco Pisos (Estructura 414) es indiscutiblemente el monumento emblemático y la cúspide estética de Edzná. Con una altura de 31.5 metros desde el suelo de la plaza hasta la crestería superior, esta colosal pirámide escalonada es célebre en la historia de la arquitectura universal por su audaz integración entre pirámide ceremonial y palacio residencial.",
      "A diferencia de las pirámides convencionales del área maya, cuyos cuerpos escalonados son masas sólidas de mampostería maciza, los primeros cuatro niveles del Edificio de los Cinco Pisos albergan decenas de cámaras habitacionales abovedadas provistas de puertas adinteladas que dan a amplias terrazas corridas. Esta concepción espacial híbrida combinaba la residencia de la familia real con las funciones religiosas del culto estatal.",
      "En la cúspide del monumento se erige el santuario del quinto piso, rematado por una soberbia crestería calada de más de seis metros de altura decorada originalmente con relieves policromados en estuco. La fachada principal del templo superior mira hacia el poniente, dominando un panorama visual inmenso sobre la Gran Plaza y sobre el horizonte plano de la península de Yucatán que facilitaba la observación crepuscular del Sol y Venus.",
      "Una monumental escalinata central de mampostería asciende por la fachada oeste comunicando directamente la plaza de la Acrópolis con el templo superior. En los frentes de los escalones de caliza, los canteros grabaron glifos jeroglíficos que registran fechas conmemorativas de finales de K'atun y rituales dinásticos dedicados al dios solar K'inich Ahau, convirtiendo la ascensión física al templo en un recorrido cronológico sagrado.",
      "Desde el punto de vista arquitectónico, el edificio constituye una síntesis magistral de estilos regionales: las cámaras de los niveles inferiores reflejan la influencia del estilo Chenes con su decoración de estuco, mientras que los paramentos lisos con molduras biseladas y columnillas empotradas en los niveles superiores anuncian la sobriedad geométrica del estilo Puuc, testimoniando siglos de maestría edilicia acumulada."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante los atardeceres de los equinoccios de primavera y otoño, los rayos del sol poniente descienden sobre la fachada escalonada del Edificio de los Cinco Pisos iluminando sucesivamente cada una de sus terrazas abovedadas, produciendo un efecto de cascada luminosa dorada que simbolizaba la bendición del dios solar sobre las estancias de la élite real."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El diseño estructural del edificio distribuye el peso de los pisos superiores sobre los muros de carga inferiores mediante contrafuertes y bóvedas mayas escalonadas rellenas de hormigón de cal y cascajo. Esta técnica de ingeniería alivió la presión sobre las cámaras residenciales, garantizando la estabilidad de la estructura durante más de doce siglos."
      }
    ],
    "fact": "El Edificio de los Cinco Pisos cuenta con un total de veintisiete habitaciones abovedadas distribuidas en sus cuatro primeros niveles: seis cuartos en el primer piso, siete en el segundo, ocho en el tercero y seis en el cuarto, además del templo terminal en la cumbre. Ningún otro edificio del periodo Clásico maya combina tantas viviendas palaciegas dentro de una pirámide."
  },
  {
    "id": "sistema-hidraulico",
    "bannerImage": "/assets/maya/infographic_m14/banner_sistema-hidraulico.webp",
    "title": "Sistema Hidráulico",
    "color": "#0288D1",
    "btnImage": "/assets/maya/infographic_m14/btn_sistema-hidraulico.jpg",
    "image": "/assets/maya/infographic_m14/hero_sistema-hidraulico.jpg",
    "content": [
      "El mayor prodigio técnico de Edzná no reside únicamente en sus templos de piedra, sino en el colosal sistema de ingeniería hidráulica que hizo posible la vida y la prosperidad agrícola de decenas de miles de personas. El valle donde se asienta la ciudad carece de ríos superficiales, cenotes naturales abiertos y manantiales perennes, dependiendo exclusivamente del régimen estacional de lluvias monzónicas para su subsistencia.",
      "Para resolver este desafío vital, los ingenieros mayas del periodo Preclásico Tardío (hacia el 200 a.C.) iniciaron la excavación de una gigantesca red de canales artificiales rectilíneos tallados en el lecho arcilloso y rocoso del valle. El sistema comprende treinta y un canales principales interconectados que suman más de veintidós kilómetros de longitud lineal combinada, complementados por decenas de canales secundarios de riego.",
      "El canal principal del sistema, conocido como el Gran Canal, alcanza cincuenta metros de ancho y más de dos metros de profundidad, extendiéndose a lo largo de doce kilómetros en dirección sur hacia la sabana de Pich. Esta vía acuática no solo actuaba como un colector de aguas pluviales durante las inundaciones estivales, sino como una arteria fluvial navegable por donde transitaban canoas de carga transportando cosechas y mercancías.",
      "La red desembocaba en inmensos depósitos artificiales escalonados y aguadas cívicas capaces de almacenar millones de metros cúbicos de agua dulce para la temporada seca. Los bordes de los canales estaban reforzados con terrazas agrícolas sobreelevadas o campos drenados (camellones), donde el fango fértil extraído periódicamente del fondo de las zanjas se utilizaba como abono orgánico para alimentar cosechas continuas de maíz y frijol.",
      "Este sistema integral de control hidrológico cumplía una triple función esencial: prevenía las destructivas inundaciones de las áreas residenciales, garantizaba el riego continuo de los cultivos durante la sequía invernal y proporcionaba agua potable segura a la población urbana, situando a Edzná como uno de los ejemplos más extraordinarios de ingeniería hidráulica sustentable y planificación ecológica de la antigüedad."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En los canales de Edzná, los habitantes criaban peces dulceacuícolas, tortugas y caracoles de río como fuente complementaria de proteínas alimenticias. El sistema hidráulico operaba así como una gigantesca granja acuícola integrada a las milpas, aprovechando el agua estancada para generar alimento de forma ininterrumpida todo el año."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las prospecciones topográficas con teodolito revelaron que la pendiente del Gran Canal de Edzná es de apenas 5 a 10 centímetros por cada kilómetro de recorrido. Esta pendiente extremadamente suave permitía que el agua fluyera por gravedad sin erosionar los taludes de arcilla, logrando una velocidad de sedimentación ideal para purificar el líquido por decantación."
      }
    ],
    "fact": "El volumen total de tierra y roca excavado por los constructores mayas para crear la red hidráulica de canales y reservorios de Edzná se calcula en más de dos millones de metros cúbicos. Toda esta descomunal obra pública fue completada a mano utilizando herramientas de piedra pulida, cestos de mimbre y cuadrillas de miles de trabajadores organizados por el Estado."
  },
  {
    "id": "latitud-tropical",
    "bannerImage": "/assets/maya/infographic_m14/banner_latitud-tropical.webp",
    "title": "Latitud Tropical",
    "color": "#4FC3F7",
    "btnImage": "/assets/maya/infographic_m14/btn_latitud-tropical.jpg",
    "image": "/assets/maya/infographic_m14/hero_latitud-tropical.jpg",
    "content": [
      "La ubicación astronómica de un asentamiento humano sobre el globo terráqueo determina por completo las características de su bóveda celeste y el comportamiento de las estaciones. Edzná se localiza en las coordenadas geográficas 19° 35' de latitud norte y 90° 14' de longitud oeste, emplazada en pleno cinturón intertropical del planeta, una posición geográfica que condicionó de forma directa la cosmovisión y la ciencia de sus habitantes.",
      "En las latitudes templadas y boreales situadas al norte del trópico de Cáncer (23° 26' N), como en Europa central o el norte de América, el Sol siempre culmina al sur del cenit al mediodía y los objetos jamás dejan de proyectar sombras septentrionales. Por el contrario, en la latitud tropical de Edzná, el Sol cruza al hemisferio norte durante los meses de verano, colocándose en dos ocasiones anuales exactamente sobre la coronilla del cielo.",
      "Esta particularidad astronómica divide el año solar de Edzná en dos periodos asimétricos delimitados por los pasos cenitales del 17 de mayo y el 26 de julio. Entre ambas fechas median setenta días durante los cuales el Sol de mediodía se ubica al norte del observador, proyectando sombras orientadas hacia el sur. Durante los doscientos noventa y cinco días restantes del año, el Sol transita al sur del observador proyectando sombras al norte.",
      "Esta oscilación cenital tropical permitía a los astrónomos de la corte predecir con absoluta fidelidad la llegada del régimen monzónico del Atlántico y del Golfo de México. El calentamiento solar directo provocado por el Sol cenital en mayo intensifica la evaporación marina y las corrientes convectivas atmosféricas, desencadenando la temporada de tormentas tropicales indispensables para llenar los canales de la metrópoli.",
      "Comprender las propiedades geométricas de la latitud tropical permitió a los sacerdotes de Edzná desmarcarse de modelos calendáricos rígidos e inventar soluciones astronómicas empíricas adaptadas a su suelo natal. El paisaje celeste local fue integrado en la vida cívica, convirtiendo a la latitud de la ciudad en un marco matemático único donde cada sombra proyectada en el suelo calizo aportaba información vital para la comunidad."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los primeros cronistas españoles que llegaron a la península de Yucatán en el siglo XVI quedaron desconcertados al observar que en verano el Sol se colocaba al norte de sus cabezas y proyectaba sombras hacia el sur al mediodía, un fenómeno celeste que jamás habían experimentado en España y que los mayas comprendían y medían a la perfección."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La energía de radiación solar recibida por unidad de superficie alcanza su máximo teórico cuando los rayos solares inciden perpendicularmente a 90 grados sobre el terreno, como ocurre durante el paso cenital. En Edzná, la insolación en esas jornadas supera los 1,000 vatios por metro cuadrado, generando un brusco calentamiento térmico que detona lluvias convectivas vespertinas."
      }
    ],
    "fact": "La latitud de 19° 35' N sitúa a Edzná a escasos cuatrocientos kilómetros al sur del trópico de Cáncer, el límite geográfico septentrional máximo donde es físicamente posible el paso cenital solar en la Tierra. Si la ciudad hubiera estado situada apenas 450 kilómetros más al norte, sus habitantes jamás habrían podido presenciar el fenómeno del Sol sin sombra al mediodía."
  },
  {
    "id": "medicion-tiempo",
    "bannerImage": "/assets/maya/infographic_m14/banner_medicion-tiempo.webp",
    "title": "Medición del Tiempo",
    "color": "#E65100",
    "btnImage": "/assets/maya/infographic_m14/btn_medicion-tiempo.jpg",
    "image": "/assets/maya/infographic_m14/hero_medicion-tiempo.jpg",
    "content": [
      "Para la civilización maya en Edzná, la medición del tiempo trascendía la simple contabilización de los días transcurridos para convertirse en un arte de ordenamiento moral, agrícola y cosmológico del universo. Los sabios locales desarrollaron un complejo sistema cronológico matricial que sincronizaba simultáneamente el calendario solar civil (Haab'), el almanaque ritual (Tzolk'in), la Cuenta Larga dinástica y los ciclos de los astros.",
      "La arquitectura monumental de la ciudad operaba como un descomunal dispositivo de registro cronológico. Al correlacionar las sombras cenitales proyectadas por los gnomones de la Acrópolis con las líneas de mira solares trazadas desde el Edificio de los Cinco Pisos hacia las estructuras periféricas de la Gran Plaza, los sacerdotes establecían con precisión de horas el inicio y cierre de los periodos temporales de veinte días (Uinales).",
      "Las inscripciones glíficas descubiertas en las estelas fechadas de Edzná registran conmemoraciones de finales de K'atun (periodos de 7,200 días o casi veinte años solares). En cada una de estas conmemoraciones periódicas, el gobernante supremo encabezaba sacrificios de incienso de copal, sangre y autosacrificio ante el pueblo, reafirmando que el pacto sagrado entre la comunidad y los dioses del firmamento continuaba vigente y próspero.",
      "Asimismo, los matemáticos de la urbe dominaban el ciclo sinódico del planeta Venus (583.92 días) y los intervalos regulares de los eclipses lunares y solares. Al plasmar estos cómputos en registros públicos legibles para las delegaciones visitantes, Edzná se consolidó como una capital intelectual donde los gobernantes de ciudades secundarias acudían para homologar sus propios calendarios locales y aprender métodos de cálculo.",
      "La medición rigurosa del tiempo en Edzná demuestra la íntima conexión existente entre la ciencia matemática y la supervivencia humana en las tierras bajas mayas. Al predecir con exactitud milimétrica el retorno de los astros y las estaciones de lluvia, los sabios mayas lograron disipar la incertidumbre de la existencia selvática, transformando la regularidad celeste en una fuente inagotable de seguridad, fe y florecimiento cultural."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En la Estela 18 de Edzná, consagrada hacia el año 711 d.C., se describe la celebración solemne de un final de K'atun presidido por una reina gobernante que porta un suntuoso pectoral de jade con el símbolo de la flor solar de cuatro pétalos Kin, demostrando el destacado protagonismo político de las mujeres mayas en los rituales astronómicos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El sistema calendárico maya operaba mediante una notación posicional vigesimal (base 20) que incorporaba el concepto abstracto del cero antes de que fuera utilizado en el continente europeo. Esta matemática vigesimal facilitaba cálculos cronológicos monumentales que abarcaban millones de días solares sin acumular desfasamientos aritméticos."
      }
    ],
    "fact": "La combinación de los ciclos Haab' (365 días) y Tzolk'in (260 días) genera el ciclo de 18,980 días (52 años) de la Rueda Calendárica. En Edzná, las excavaciones han recuperado ofrendas de cerámica quebrada y fogatas ceremoniales que coinciden cronológicamente con estas fechas de renovación de medio siglo, demostrando la observancia ininterrumpida de este ciclo cósmico."
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
      hue: Math.random() > 0.5 ? '255,214,0' : '2,136,209', // gold or blue
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

// â”€â”€â”€ Maya Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,214,0,0.3))' }}>
        {/* Sun arc */}
        <path d="M 50 110 Q 300 -20, 550 110" fill="none" stroke="url(#sunGrad)" strokeWidth="3" strokeLinecap="round" />
        {/* 7 nodes markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 130;
          const colors = ['#8D6E63','#FFD600','#212121','#8D6E63','#0288D1','#4FC3F7','#E65100'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central sun icon */}
        <circle cx="300" cy="30" r="16" fill="none" stroke="#FFD600" strokeWidth="2" opacity="0.8" />
        <circle cx="300" cy="30" r="10" fill="#FFD600" opacity="0.9" />
        <line x1="300" y1="5" x2="300" y2="10" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="300" y1="50" x2="300" y2="55" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="275" y1="30" x2="280" y2="30" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        <line x1="320" y1="30" x2="325" y2="30" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" />
        
        <defs>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,214,0,0.1)" />
            <stop offset="50%" stopColor="rgba(255,214,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,214,0,0.1)" />
          </linearGradient>
        </defs>
        <text x="300" y="85" textAnchor="middle" fill="#FFD600" fontSize="22" fontWeight="900" fontFamily="Georgia, serif" letterSpacing="4">EDZNÁ</text>
        <text x="300" y="105" textAnchor="middle" fill="rgba(255,214,0,0.7)" fontSize="12" fontWeight="700" fontFamily="sans-serif" letterSpacing="3">SOL EN EL CENIT</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,214,0,0.2)'}`,
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
          layoutId="activeDotMayaM14"
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
      display: 'flex',
      flexDirection: 'column',
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
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
            pointerEvents: 'none',
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
              {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              marginBottom: '1rem',
            }}>
              <div style={{ height: '1px', flex: 1, background: `linear-gradient(90deg, transparent, ${node.color}40)` }} />
              <span style={{
                color: node.color, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px',
                textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Sparkles size={14} /> Explorar Más
              </span>
              <div style={{ height: '1px', flex: 1, background: `linear-gradient(270deg, transparent, ${node.color}40)` }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.5))`,
          border: `1px solid ${node.color}40`,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1,
            transform: 'rotate(-15deg)', pointerEvents: 'none',
          }}>
            <Star size={100} color={node.color} fill={node.color} />
          </div>
          <h4 style={{
            margin: '0 0 0.8rem', color: node.color, fontSize: '1rem',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%', background: node.color, display:'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Star size={14} color="#000" fill="#000" />
            </div>
            Dato Curioso
          </h4>
          <p style={{
            margin: 0, fontSize: '0.95rem', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.9)', fontStyle: 'italic',
          }}>
            "{node.fact}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar Component â”€â”€â”€
function ProgressBar({ total, exploredIds }) {
  const progress = (exploredIds.length / total) * 100;
  return (
    <div style={{
      width: '100%', maxWidth: '400px', margin: '2rem auto 0',
      background: 'rgba(0,0,0,0.4)', borderRadius: '20px',
      padding: '1rem 1.5rem', border: '1px solid rgba(255,214,0,0.2)',
      textAlign: 'center', position: 'relative', zIndex: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: '#FFD600', fontWeight: 700 }}>
        <span>PROGRESO DE EXPLORACIÓN</span>
        <span>{exploredIds.length} / {total} Nodos</span>
      </div>
      <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ height: '100%', background: '#FFD600', boxShadow: '0 0 10px #FFD600' }}
        />
      </div>
      {exploredIds.length === total && (
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '0.8rem', fontSize: '0.85rem', color: '#4FC3F7', fontWeight: 700 }}
        >
          ¡Análisis Arquitectónico y Astronómico Completado!
        </motion.div>
      )}
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM14() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNodeId === id) {
      setActiveNodeId(null);
    } else {
      setActiveNodeId(id);
      if (!exploredIds.includes(id)) {
        setExploredIds(prev => [...prev, id]);
      }
    }
  };

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #070912, #0D1226)',
      padding: '2rem 1rem 4rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <MayaHeader />

        {/* Main Interface */}
        <div style={{
          background: 'rgba(15, 20, 40, 0.6)',
          backdropFilter: 'blur(16px)',
          borderRadius: '32px',
          padding: '2rem',
          border: '1px solid rgba(255,214,0,0.15)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Node Grid */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '1rem',
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

          <AnimatePresence mode="wait">
            {activeNodeId ? (
              <ContentPanel
                key={activeNodeId}
                node={activeNode}
                onClose={() => setActiveNodeId(null)}
                setLightboxSrc={setLightboxSrc}
              />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{
                  textAlign: 'center', padding: '4rem 2rem',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                <Sparkles size={40} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <p style={{ fontSize: '1.1rem', margin: 0, fontWeight: 300 }}>
                  Selecciona un concepto arquitectónico o astronómico para analizar la maravilla de Edzná.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ProgressBar total={INFOGRAPHIC_NODES.length} exploredIds={exploredIds} />

        {/* Bibliography */}
        <div style={{
          marginTop: '4rem', padding: '2rem',
          background: 'rgba(0,0,0,0.3)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative', zIndex: 2,
        }}>
          <h4 style={{
            margin: '0 0 1rem', color: '#FFD600', fontSize: '0.9rem',
            textTransform: 'uppercase', letterSpacing: '2px',
            display: 'flex', alignItems: 'center', gap: '0.5rem'
          }}>
            <span style={{ width: '8px', height: '8px', background: '#FFD600', borderRadius: '50%' }} />
            Referencias Científicas y Arqueológicas
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => <li key={i}>{bib}</li>)}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen expandida" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
