"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronRight,
  Sparkles,
  Star,
  ChevronDown,
  Zap,
  Clock,
  Atom,
} from "lucide-react";
import ImageLightbox from "./ImageLightbox";

// ─── SVG Decorative Elements (Maya / Palenque themed) ────────────────────────────
function DecoPalace({ size = 70, color = "#78909C", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <path d="M 5 50 L 55 50 L 55 55 L 5 55 Z" fill={color} />
      <path d="M 10 40 L 50 40 L 50 50 L 10 50 Z" fill={color} opacity="0.8" />
      <path d="M 15 30 L 45 30 L 45 40 L 15 40 Z" fill={color} opacity="0.6" />
      <path d="M 20 20 L 40 20 L 40 30 L 20 30 Z" fill={color} opacity="0.4" />
      <rect x="25" y="40" width="10" height="10" fill="#000" opacity="0.3" />
      <rect x="15" y="40" width="5" height="10" fill="#000" opacity="0.3" />
      <rect x="40" y="40" width="5" height="10" fill="#000" opacity="0.3" />
    </svg>
  );
}

function DecoJadeMask({ size = 70, color = "#009688", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <path
        d="M 20 10 Q 30 5 40 10 Q 45 25 40 45 Q 30 55 20 45 Q 15 25 20 10"
        fill={color}
        opacity="0.5"
      />
      <circle cx="25" cy="25" r="4" fill="#000" opacity="0.4" />
      <circle cx="35" cy="25" r="4" fill="#000" opacity="0.4" />
      <path
        d="M 28 35 Q 30 40 32 35"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        opacity="0.4"
      />
      <path
        d="M 30 15 L 30 30"
        fill="none"
        stroke="#000"
        strokeWidth="2"
        opacity="0.3"
      />
      {/* Mosaic pieces lines */}
      <path
        d="M 20 10 L 25 25 L 15 25"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.3"
      />
      <path
        d="M 40 10 L 35 25 L 45 25"
        fill="none"
        stroke="#fff"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function DecoGlyphPanel({ size = 70, color = "#BF360C", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <rect
        x="5"
        y="5"
        width="50"
        height="50"
        rx="5"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
      />
      <rect
        x="10"
        y="10"
        width="15"
        height="15"
        rx="3"
        fill={color}
        opacity="0.4"
      />
      <rect
        x="35"
        y="10"
        width="15"
        height="15"
        rx="3"
        fill={color}
        opacity="0.4"
      />
      <rect
        x="10"
        y="35"
        width="15"
        height="15"
        rx="3"
        fill={color}
        opacity="0.4"
      />
      <rect
        x="35"
        y="35"
        width="15"
        height="15"
        rx="3"
        fill={color}
        opacity="0.4"
      />
      {/* Abstract glyph details */}
      <circle cx="17.5" cy="17.5" r="3" fill="#fff" opacity="0.5" />
      <circle cx="42.5" cy="17.5" r="3" fill="#fff" opacity="0.5" />
      <circle cx="17.5" cy="42.5" r="3" fill="#fff" opacity="0.5" />
      <circle cx="42.5" cy="42.5" r="3" fill="#fff" opacity="0.5" />
    </svg>
  );
}

function DecoTower({ size = 70, color = "#FFC107", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <rect x="20" y="15" width="20" height="40" fill={color} opacity="0.5" />
      <rect x="15" y="10" width="30" height="5" fill={color} opacity="0.7" />
      <rect x="22" y="25" width="16" height="3" fill="#000" opacity="0.3" />
      <rect x="22" y="35" width="16" height="3" fill="#000" opacity="0.3" />
      <rect x="22" y="45" width="16" height="3" fill="#000" opacity="0.3" />
      {/* Windows */}
      <rect x="25" y="28" width="4" height="6" fill="#000" opacity="0.4" />
      <rect x="31" y="28" width="4" height="6" fill="#000" opacity="0.4" />
      <rect x="25" y="38" width="4" height="6" fill="#000" opacity="0.4" />
      <rect x="31" y="38" width="4" height="6" fill="#000" opacity="0.4" />
    </svg>
  );
}

function DecoCeibaTree({ size = 70, color = "#1B5E20", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ opacity: 0.22, ...style }}
    >
      <path
        d="M 28 60 Q 28 30 15 10 Q 30 15 30 5 Q 30 15 45 10 Q 32 30 32 60 Z"
        fill={color}
        opacity="0.6"
      />
      <circle cx="15" cy="10" r="8" fill={color} opacity="0.4" />
      <circle cx="45" cy="10" r="8" fill={color} opacity="0.4" />
      <circle cx="30" cy="5" r="10" fill={color} opacity="0.4" />
      <path d="M 20 60 L 40 60 L 32 50 L 28 50 Z" fill={color} opacity="0.8" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  "palenque-ciudad": [DecoPalace, DecoCeibaTree, DecoGlyphPanel],"pakal-tumba": [DecoJadeMask, DecoGlyphPanel, DecoPalace],
  "tapa-sarcofago": [DecoCeibaTree, DecoJadeMask, DecoGlyphPanel],"torre-observatorio": [DecoTower, DecoPalace, DecoCeibaTree],
  "inscripciones-templo": [DecoGlyphPanel, DecoPalace, DecoTower],
  "alineacion-solsticio": [DecoTower, DecoPalace, DecoGlyphPanel],
  "legado-palenque": [DecoJadeMask, DecoCeibaTree, DecoPalace],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "Schele, L. & Freidel, D. (1990). A Forest of Kings, William Morrow",
  "Stuart, D. & Stuart, G. (2008). Palenque: Eternal City of the Maya, Thames & Hudson",
  "Ruz Lhuillier, A. (1973). El Templo de las Inscripciones, Palenque, INAH",
  "Martin, S. & Grube, N. (2000). Chronicle of the Maya Kings and Queens, Thames & Hudson",
  "Tiesler, V. & Cucina, A. (2006). Janaab Pakal of Palenque, University of Arizona Press",
];

const INFOGRAPHIC_NODES = [
  {
    "id": "palenque-ciudad",
    diagramImage: '/assets/maya/infographic_m11/diagram_palenque-ciudad.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Ciudad: Lakamha',
    "bannerImage": "/assets/maya/infographic_m11/banner_palenque-ciudad.webp",
    "title": "La Ciudad: Lakamha",
    "color": "#1B5E20",
    "btnImage": "/assets/maya/infographic_m11/btn_palenque-ciudad.jpg",
    "image": "/assets/maya/infographic_m11/hero_palenque-ciudad.jpg",
    "content": [
      "Enclavada en las estribaciones selváticas del estado de Chiapas, la antigua metrópoli de Palenque fue conocida en las inscripciones jeroglíficas clásicas bajo el nombre de Lakamha', que significa «Lugar de las Grandes Aguas». Esta denominación aludía a los numerosos manantiales, arroyos y cascadas cristalinas que brotan de las montañas circundantes, los cuales fueron encauzados por los ingenieros mayas mediante acueductos subterráneos de piedra abovedada.",
      "Aunque los primeros asentamientos agrícolas se remontan al periodo Preclásico Tardío (hacia el 100 a.C.), Palenque alcanzó su época de máximo esplendor político, artístico y arquitectónico durante el Clásico Tardío, entre los años 600 y 800 d.C. Bajo el gobierno de dinastías ilustradas, la ciudad se transformó en la capital hegemónica de la cuenca del río Usumacinta, compitiendo militarmente contra centros vecinos como Calakmul, Toniná y Piedras Negras.",
      "La arquitectura de Palenque se distingue del resto del área maya por su notable elegancia estructural y ligereza volumétrica. Los constructores locales perfeccionaron el uso de la bóveda maya o arco falso mediante finos muros de mampostería, techos mansarda con vertientes pronunciadas y cresterías caladas que aligeraban el peso superior de los edificios, permitiendo la apertura de amplios pórticos que inundaban de luz y ventilación los recintos sagrados.",
      "El corazón civil y administrativo de la ciudad era El Palacio, un colosal complejo palaciego levantado sobre una terraza artificial de cien metros de longitud. Este conjunto laberíntico de patios ceremoniales, galerías abovedadas, baños de vapor y cámaras residenciales albergaba a la corte real y a los astrónomos oficiales, integrando en sus muros estucos policromados que narraban entronizaciones dinásticas y victorias diplomáticas decisivas.",
      "Rodeada por un dosel selvático de perenne verdor, Lakamha' no fue simplemente un centro de poder administrativo, sino un cosmos sacralizado en piedra caliza. Cada edificio, plaza y calzada fue diseñado para interactuar con la topografía escarpada del terreno y con el horizonte visual, convirtiendo a la urbe entera en un colosal instrumento topográfico calibrado para registrar las evoluciones cíclicas de los cuerpos celestes."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los ingenieros hidráulicos de Palenque diseñaron el primer sistema de acueducto a presión conocido en la América precolombina. Al estrechar gradualmente la sección del canal subterráneo del arroyo Piedras Bolas, generaban suficiente presión hidrostática para elevar una fuente de agua artificial de hasta seis metros de altura en la plaza principal."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La roca caliza utilizada en Palenque posee un alto contenido de carbonato de calcio procedente de sedimentos marinos del periodo Cretácico. Esta composición mineral permitía a los escultores tallar relieves de extrema delicadeza y elaborar estucos de cal hidráulica de extraordinaria durabilidad que han resistido doce siglos de lluvias tropicales monzónicas."
      }
    ],
    "fact": "El área arqueológica explorada de Palenque abarca aproximadamente 2.5 kilómetros cuadrados, pero las prospecciones mediante tecnología LIDAR y reconocimientos de campo han demostrado que esto representa apenas el 10% de la extensión urbana total, permaneciendo más de mil estructuras residenciales y defensivas ocultas bajo el espeso follaje selvático chiapaneco."
  },
  {
    "id": "pakal-tumba",
    diagramImage: '/assets/maya/infographic_m11/diagram_pakal-tumba.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Tumba de Pakal',
    "bannerImage": "/assets/maya/infographic_m11/banner_pakal-tumba.webp",
    "title": "La Tumba de Pakal",
    "color": "#009688",
    "btnImage": "/assets/maya/infographic_m11/btn_pakal-tumba.jpg",
    "image": "/assets/maya/infographic_m11/hero_pakal-tumba.jpg",
    "content": [
      "El 15 de junio de 1952, el arqueólogo franco-mexicano Alberto Ruz Lhuillier realizó en Palenque uno de los descubrimientos más trascendentales de la historia arqueológica mundial: la cámara funeraria intacta de K'inich Janaab' Pakal I, el más célebre gobernante palencano, quien rigió los destinos de la metrópoli durante 68 años ininterrumpidos, desde el año 615 hasta su muerte acaecida en el 683 d.C. a la edad de 80 años.",
      "Durante cuatro largas temporadas de excavaciones sistemáticas, Ruz Lhuillier removió toneladas de cascajo y bloques de caliza que cegaban una empinada escalera interior oculta bajo el piso del templo superior. La escalera descendía en dos tramos en zigzag hasta alcanzar las entrañas rocosas de la pirámide, culminando en una antecámara donde yacían los restos óseos de seis jóvenes sacrificados para custodiar el descanso eterno del rey.",
      "Al traspasar la puerta triangular sellada con una colosal losa de piedra, el equipo de exploradores ingresó a una bóveda subterránea de nueve metros de largo por siete de altura cuyas paredes estaban adornadas con estucos monumentales que retrataban a los Nueve Señores de la Noche. En el centro exacto de la estancia descansaba un sarcófago monolítico labrado en un único bloque de caliza cerrado por una tapa de cinco toneladas.",
      "En el interior del féretro yacía el esqueleto de Pakal cubierto de polvo rojo de cinabrio (sulfuro de mercurio), un mineral sagrado que simbolizaba la sangre y la inmortalidad. El monarca portaba un suntuoso ajuar funerario compuesto por collares, anillos y pectorales de jadeita, así como una icónica máscara mortuoria elaborada con doscientas teselas de jade verde finamente ensambladas y ojos tallados en concha marina y obsidiana.",
      "Un detalle de extraordinaria sofisticación arquitectónica fue el «psicoducto», una estrecha moldura hueca de mampostería con forma de serpiente que ascendía desde el borde mismo del sarcófago subterráneo a lo largo de toda la escalera hasta el piso del templo superior. Este canal místico permitía que el espíritu del monarca divinizado mantuviera comunicación espiritual directa con sus descendientes y sacerdotes en la superficie."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante décadas, los manuales de arqueología sostenían que las pirámides mesoamericanas eran exclusivamente basamentos para sostener templos y jamás criptas funerarias como las pirámides de Egipto. El hallazgo de la tumba de Pakal por Ruz Lhuillier demolió definitivamente ese dogma, probando la función funeraria y conmemorativa de la arquitectura monumental maya."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El cinabrio utilizado profusamente sobre el cuerpo de Pakal es sulfuro de mercurio (HgS), un mineral pesado de color escarlata intenso. Además de su carga simbólica vinculada al renacimiento solar, sus propiedades químicas altamente tóxicas e inhibidoras de microorganismos impidieron la proliferación bacteriana, contribuyendo a la preservación del ajuar óseo y ceremonial."
      }
    ],
    "fact": "La máscara funeraria de jade de Pakal está constituida por más de 340 teselas de jade pulido, dos discos de concha nácar para el iris y dos fragmentos de obsidiana negra para las pupilas. Actualmente se exhibe como la pieza maestra de la sala maya en el Museo Nacional de Antropología de la Ciudad de México, restaurada con rigor milimétrico tras su robo y recuperación en la década de 1980."
  },
  {
    "id": "tapa-sarcofago",
    diagramImage: '/assets/maya/infographic_m11/diagram_tapa-sarcofago.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Tapa del Sarcófago',
    "bannerImage": "/assets/maya/infographic_m11/banner_tapa-sarcofago.webp",
    "title": "La Tapa del Sarcófago",
    "color": "#BF360C",
    "btnImage": "/assets/maya/infographic_m11/btn_tapa-sarcofago.jpg",
    "image": "/assets/maya/infographic_m11/hero_tapa-sarcofago.jpg",
    "content": [
      "La lápida que sella el sarcófago de K'inich Janaab' Pakal es unánimemente considerada la obra cumbre del relieve escultórico mesoamericano. Tallada sobre un descomunal bloque monolítico de caliza de 3.80 metros de largo, 2.20 metros de ancho y 25 centímetros de grosor, con un peso aproximado de siete toneladas, la pieza exhibe en su cara frontal una compleja composición iconográfica que sintetiza la cosmología y la escatología maya.",
      "En la sección central de la composición aparece la efigie juvenil del rey Pakal, reclinado hacia atrás sobre la cabeza descarnada del Monstruo de la Tierra o Sak B'aak Nah Chapat. El gobernante viste faldellín de cuentas de jade y pectorales ceremoniales, adoptando una postura de tránsito dinámico que marca el instante preciso de su muerte biológica y el inicio de su metamorfosis espiritual en la deidad suprema del grano de maíz.",
      "Brota directamente del cuerpo de Pakal el tronco cruciforme del Árbol Cósmico Wakah Chan, cuyas ramas serpenteantes están decoradas con joyas de jade y cabezas de serpientes enjoyadas de las que emergen espíritus celestiales. En la cúspide suprema del follaje se posa el ave celeste Itzamye, una manifestación del dios creador Itzamná, simbolizando la trascendencia del soberano hacia los niveles superiores del empíreo cósmico.",
      "Enmarcando la escena central se esculpió una banda celeste continua que recorre el borde exterior de la losa, repleta de glifos que representan al Sol, la Luna, estrellas centelleantes y los planetas visibles. En los cantos laterales del bloque pétreo, los artistas palencanos grabaron los retratos de los ancestros dinásticos de Pakal emergiendo de la tierra como árboles frutales, legitimando el derecho divino de su linaje a reinar.",
      "Diversas interpretaciones pseudocientíficas difundidas a mediados del siglo XX pretendieron ver en este bajorrelieve a un astronauta pilotando una nave espacial con controles y toberas de propulsión. Sin embargo, la epigrafía contemporánea ha refutado de forma contundente estas fantasías, demostrando que cada voluta y elemento del diseño encaja con absoluta coherencia en el vocabulario iconográfico y religioso del periodo Clásico."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los epigrafistas Heinrich Berlin y Linda Schele lograron descifrar los textos glíficos inscritos en el canto de la lápida, descubriendo las fechas exactas de nacimiento, ascensión al trono y defunción de Pakal y de su madre, la reina Sak K'uk', quien gobernó como regente antes de entregarle el mando supremo cuando él cumplió doce años de edad."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El análisis petrológico de la lápida confirmó que fue extraída de una cantera local de caliza microcristalina situada a menos de tres kilómetros del templo. Para descender este bloque macizo de siete toneladas por la empinada ladera y depositarlo en el fondo de la cripta antes de edificar la pirámide, los ingenieros mayas emplearon rodillos de madera dura y palancas de guayacán."
      }
    ],
    "fact": "El sarcófago y su colosal lápida fueron colocados en la cámara funeraria subterránea ANTES de que se levantaran los muros del Templo de las Inscripciones. Las dimensiones del sarcófago (3 metros de longitud) superan con creces el ancho de la estrecha escalera interior, lo que demuestra que la pirámide entera fue concebida y construida como un gigantesco mausoleo alrededor del rey."
  },
  {
    "id": "torre-observatorio",
    diagramImage: '/assets/maya/infographic_m11/diagram_torre-observatorio.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Torre del Palacio',
    "bannerImage": "/assets/maya/infographic_m11/banner_torre-observatorio.webp",
    "title": "La Torre del Palacio",
    "color": "#FFC107",
    "btnImage": "/assets/maya/infographic_m11/btn_torre-observatorio.jpg",
    "image": "/assets/maya/infographic_m11/hero_torre-observatorio.jpg",
    "content": [
      "Alzándose de manera imponente sobre los patios interiores de El Palacio, la Torre de Palenque constituye una anomalía arquitectónica fascinante sin paralelos en el resto de Mesoamérica. Se trata de una estructura cuadrangular de cuatro niveles escalonados que alcanza más de quince metros de altura, dotada de una escalera interna de mampostería que permite el acceso seguro a su plataforma superior techada.",
      "Edificada durante el reinado de K'inich K'an Joy Chitam II, uno de los hijos y sucesores de Pakal a comienzos del siglo VIII d.C., la torre ha sido objeto de intensos debates académicos respecto a su función primordial. Mientras que los primeros exploradores la consideraron un atalaya militar para vigilar las incursiones enemigas desde la llanura de Tabasco, los arqueoastrónomos han demostrado su avanzado uso astronómico.",
      "La orientación angular de sus vanos y esquinas presenta alineaciones matemáticas rigurosas con respecto a los horizontes este y oeste. Desde el mirador superior, los sacerdotes tenían un campo visual despejado de 360 grados sobre la cordillera selvática y la vasta planicie fluvial, permitiéndoles monitorear los puntos de salida y puesta del Sol durante los solsticios y equinoccios sin interferencia de las copas de los árboles.",
      "Investigaciones arqueoastronómicas llevadas a cabo por especialistas del INAH y universidades internacionales revelaron que la torre servía como un punto de observación privilegiado para seguir el ciclo sinódico del planeta Venus (Noh Ek'). Las ventanas del penúltimo y último piso enmarcan con precisión los extremos septentrionales y meridionales de Venus como lucero vespertino sobre las crestas montañosas chiapanecas.",
      "Asimismo, la altura de la torre permitía coordinar señales visuales mediante fuego, humo y reflejos de espejos de pirita con asentamientos periféricos y puestos de vigía situados en las cumbres montañosas del cañón del río Chacamax. Esta síntesis entre observatorio científico, templo de ritos cenitales y centro de comunicaciones tácticas consolidó a El Palacio como el núcleo neurálgico indiscutible de la hegemonía palencana."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante la célebre expedición de John Lloyd Stephens y el dibujante Frederick Catherwood en 1840, Catherwood debió trepar entre espesas enredaderas y raíces colosales para dibujar con su cámara lúcida los cuatro niveles de la torre de Palenque, la cual se hallaba asfixiada por la selva tropical chiapaneca tras diez siglos de absoluto abandono humano."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La estabilidad estructural de la torre cuadrangular frente a los frecuentes movimientos telúricos de la falla de Motagua se debe a su núcleo central de mampostería maciza y al uso de tirantes de madera de chicozapote embebidos en el mortero de cal, una técnica antisísmica empírica desarrollada con maestría por los albañiles del Clásico Tardío."
      }
    ],
    "fact": "La Torre de Palenque es la única estructura monumental de cuatro pisos dotada de una escalera interior de caracol que sobrevive en toda el área maya del periodo Clásico. Sus muros de caliza conservan restos de pigmento rojo cinabrio y azul maya, indicando que el observatorio resplandecía intensamente sobre el verde de la selva para ser visto a kilómetros de distancia."
  },
  {
    "id": "inscripciones-templo",
    diagramImage: '/assets/maya/infographic_m11/diagram_inscripciones-templo.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Templo de las Inscripciones',
    "bannerImage": "/assets/maya/infographic_m11/banner_inscripciones-templo.webp",
    "title": "El Templo de las Inscripciones",
    "color": "#4A148C",
    "btnImage": "/assets/maya/infographic_m11/btn_inscripciones-templo.jpg",
    "image": "/assets/maya/infographic_m11/hero_inscripciones-templo.jpg",
    "content": [
      "El Templo de las Inscripciones, erigido en el flanco sur de la plaza central de Palenque sobre una colina natural reforzada con terrazas de caliza, es uno de los monumentos más imponentes y significativos de la civilización maya. La pirámide escalonada está compuesta por ocho terrazas superpuestas que, sumadas al templo superior con su pórtico de cinco entradas, totalizan nueve niveles arquitectónicos que emulan las nueve capas del inframundo.",
      "El edificio debe su nombre moderno a los tres monumentales tableros de piedra caliza tallados en bajorrelieve que cubren los muros interiores de la antecámara del santuario superior. Con un total combinado de 617 cartuchos jeroglíficos perfectamente conservados, este conjunto epigráfico constituye el segundo texto jeroglífico continuo más extenso de todo el mundo maya, superado únicamente por la Escalinata de Copán en Honduras.",
      "Las inscripciones fueron supervisadas y consagradas por el sucesor de Pakal, su primogénito K'inich Kan Bahlam II, hacia el año 692 d.C. El texto relata de forma pormenorizada la crónica dinástica de Lakamha', conmemorando los finales de período calendárico (K'atunob), las victorias militares, las alianzas matrimoniales y las ceremonias religiosas efectuadas por Pakal el Grande a lo largo de sus casi siete décadas de mandato.",
      "Además de su valor histórico, el templo cumplía una trascendental función cosmológica como axis mundi o eje del mundo. Al situar la cámara funeraria de Pakal en la base rocosa y coronar la estructura con los anales dinásticos y las efigies estucadas de los dioses patronos de la ciudad (la llamada Tríada de Palenque: GI, GII y GIII), el edificio unía la memoria de los ancestros con los destinos cósmicos de las generaciones futuras.",
      "La fachada del templo exhibía originalmente seis pilastras de estuco policromado con figuras de tamaño natural que retrataban a dignatarios sosteniendo en brazos al infante divino Unen K'awiil, deidad asociada a los linajes reales y al rayo fertilizador. Estas obras de arte plástico confirmaban a la población que los reyes de Palenque descendían directamente de los dioses que habían ordenado el firmamento en el tiempo primordial."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el Tablero de las Inscripciones, los escribas reales mayas calcularon fechas de Cuenta Larga que se proyectan miles de años hacia el futuro. En uno de los pasajes glíficos más asombrosos, se menciona una fecha equivalente al año 4772 de nuestra era para conmemorar el aniversario de la entronización divina de Pakal en un ciclo cósmico renovado."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La pirámide del Templo de las Inscripciones alcanza una altura de 22.8 metros desde el nivel de la plaza hasta la cumbre del santuario. Los constructores emplearon un mortero compuesto de cal apagada, agua y savia de corteza del árbol de chukum, un polímero orgánico natural que incrementa notablemente la impermeabilidad y flexibilidad mecánica de las juntas de piedra."
      }
    ],
    "fact": "Los 617 bloques jeroglíficos del Templo de las Inscripciones están distribuidos en tres losas monolíticas: el Tablero Este con 240 glifos, el Tablero Central con 120 glifos y el Tablero Oeste con 257 glifos. Este tesoro textual ha sido descifrado en más de un 95% por los epigrafistas modernos, permitiendo reconstruir con precisión día a día la historia de Palenque."
  },
  {
    "id": "alineacion-solsticio",
    diagramImage: '/assets/maya/infographic_m11/diagram_alineacion-solsticio.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Alineación del Solsticio',
    "bannerImage": "/assets/maya/infographic_m11/banner_alineacion-solsticio.webp",
    "title": "Alineación del Solsticio",
    "color": "#0288D1",
    "btnImage": "/assets/maya/infographic_m11/btn_alineacion-solsticio.jpg",
    "image": "/assets/maya/infographic_m11/hero_alineacion-solsticio.jpg",
    "content": [
      "Una de las manifestaciones más espectaculares de la arqueoastronomía maya ocurre en Palenque durante el solsticio de invierno, el 21 de diciembre de cada año. En esta jornada, el día más corto del año y la noche más prolongada en el hemisferio norte, la arquitectura de la ciudad cobra vida para escenificar una sobrecogedora metáfora visual sobre la muerte del Sol y el descanso eterno del gobernante K'inich Janaab' Pakal.",
      "Si un observador se sitúa en la parte alta de El Palacio o en el patio de la Torre y dirige su mirada hacia el sudoeste al atardecer, podrá constatar un fenómeno óptico asombroso: el disco solar desciende con lentitud y se oculta exactamente detrás del Templo de las Inscripciones, pareciendo resbalar por la cresta superior del santuario antes de desaparecer en el horizonte montañoso que cobija a la cripta subterránea.",
      "Esta alineación solsticial no es casual ni fortuita. Los sacerdotes astrónomos trazaron deliberadamente la orientación del Templo de las Inscripciones y de los palacios adyacentes para que el ocaso del solsticio de invierno conectara visualmente el astro rey con la tumba de Pakal. El Sol que muere en el invierno entraba así de forma simbólica en la cámara funeraria, acompañando al monarca difunto en su descenso al inframundo.",
      "Asimismo, durante el amanecer del solsticio de verano, el 21 de junio, los rayos solares matutinos inciden con un ángulo rasante sobre la fachada del Templo de la Cruz, situado en el complejo adyacente edificado por el hijo de Pakal. La luz solar penetra por los vanos del santuario iluminando directamente el tablero esculpido donde Kan Bahlam recibe las insignias del poder real, escenificando el triunfo de la luz sobre las tinieblas.",
      "Estos sutiles juegos de luces y sombras confirman que la traza urbana de Palenque fue concebida como un inmenso escenario teatral cósmico. La arquitectura no se limitaba a albergar actividades ceremoniales, sino que interactuaba de forma dinámica con los ciclos solares y estacionales, reafirmando ante los ojos del pueblo la íntima alianza existente entre la dinastía reinante y las fuerzas elementales del universo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el momento del ocaso solsticial invernal, la sombra proyectada por el Templo de las Inscripciones se extiende sobre la plaza principal cubriendo progresivamente los accesos a los recintos reales de El Palacio, creando una penumbra solemne que marcaba el instante exacto en que los sacerdotes debían iniciar las plegarias de la noche más larga del año."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El acimut de la puesta de sol en el solsticio de invierno para la latitud de Palenque (17° 29' N) es de aproximadamente 245° respecto al norte verdadero. Los arqueoastrónomos han comprobado con instrumental topográfico de precisión que el eje visual trazado desde la Torre de El Palacio hacia el vértice del Templo coincide con dicho acimut con un margen de error menor a 30 minutos de arco."
      }
    ],
    "fact": "El solsticio de invierno marcaba en la cosmovisión maya el renacimiento anual del Sol K'inich Ahau. Al igual que el Sol comenzaba a ganar tiempo de luz diurna día tras día a partir del solsticio invernal, el rey Pakal depositado en el seno del Templo de las Inscripciones iniciaba su camino de regeneración cósmica para renacer glorioso como el dios del maíz en la primavera."
  },
  {
    "id": "legado-palenque",
    diagramImage: '/assets/maya/infographic_m11/diagram_legado-palenque.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Legado Moderno',
    "bannerImage": "/assets/maya/infographic_m11/banner_legado-palenque.webp",
    "title": "El Legado Moderno",
    "color": "#78909C",
    "btnImage": "/assets/maya/infographic_m11/btn_legado-palenque.jpg",
    "image": "/assets/maya/infographic_m11/hero_legado-palenque.jpg",
    "content": [
      "El descubrimiento y estudio sistemático de Palenque ha ejercido un impacto revolucionario en la comprensión moderna de la civilización maya y de la América precolombina. Reconocida como Patrimonio de la Humanidad por la UNESCO en 1987, la zona arqueológica y su parque nacional circundante continúan siendo un epicentro mundial para la investigación epigráfica, la conservación arquitectónica y el turismo cultural sustentable.",
      "Fue en los monumentos de Palenque donde pioneros de la epigrafía como Yuri Knórozov, Tatiana Proskouriakoff, Heinrich Berlin y Linda Schele lograron los avances definitivos que permitieron descifrar la escritura jeroglífica maya. La abundancia y claridad de los textos dinásticos palencanos demostraron de forma concluyente que las inscripciones registraban historias reales de reyes mortales, guerras y alianzas, y no vagos dogmas teológicos.",
      "En las últimas décadas, proyectos multidisciplinarios liderados por el Instituto Nacional de Antropología e Historia (INAH) han sacado a la luz hallazgos monumentales complementarios, como el suntuoso entierro de la Reina Roja (Ix Tz'akbu Ajaw, consorte de Pakal) en el Templo XIII, cuyo sarcófago de piedra monolítica y ajuar funerario cubierto de cinabrio intacto rivalizan en esplendor ceremonial con la sepultura de su esposo.",
      "Asimismo, la aplicación de tecnologías de vanguardia, como el escaneo láser aerotransportado (LIDAR) y la fotogrametría digital de alta resolución, ha revelado una densidad urbana insospechada en las laderas selváticas que rodean el centro monumental. Canales de desagüe, terrazas agrícolas de contención, talleres de lítica y complejos residenciales menores demuestran una sofisticada adaptación ecológica al relieve montañoso.",
      "Hoy en día, Palenque se erige como un símbolo universal de la capacidad humana para armonizar la ciencia matemática, la observación astronómica y la maestría estética con los rigores del medio ambiente tropical. Las lecciones de sus constructores sobre el manejo sustentable del agua y la integración del paisaje continúan inspirando a arquitectos, arqueólogos y jóvenes científicos de todo el orbe en el siglo XXI."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La tumba de la Reina Roja fue descubierta en 1994 por el arqueólogo Arnoldo González Cruz. A diferencia de Pakal, la dignataria no portaba inscripciones con su nombre dentro de la cámara, pero los análisis de ADN antiguo y la epigrafía del Templo de las Inscripciones confirmaron que se trataba de su noble esposa, la señora Tz'akbu Ajaw de Uxte'k'uh."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las exploraciones con sensor LIDAR disparan cientos de miles de pulsos de luz láser por segundo desde una aeronave hacia el suelo selvático. Al medir el tiempo de retorno de los pulsos que logran filtrar la densa vegetación tropical, los científicos generan mapas topográficos tridimensionales de resolución decimétrica que desnudan estructuras ocultas bajo la selva chiapaneca."
      }
    ],
    "fact": "El Parque Nacional Palenque protege una superficie de más de 1,770 hectáreas de selva alta perennifolia donde habitan más de 200 especies de aves, monos aulladores, ocelotes y jaguares. Este ecosistema protegido resguarda no solo los tesoros arqueológicos de la dinastía de Pakal, sino uno de los corredores biológicos más vitales y amenazados de la República Mexicana."
  }
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
function TemporalField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    const w = canvas.width,
      h = canvas.height;
    // Maya themed colors: jade, gold
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.2,
      hue: Math.random() > 0.5 ? "0,150,136" : "255,193,7", // jade or gold
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.1;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
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
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents:"none",
      }}
    />
  );
}

// ─── Maya Infographic Header ──────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
        marginBottom: "-10px",
      }}
    >
      <svg
        viewBox="0 0 600 130"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          filter: "drop-shadow(0 0 10px rgba(0,150,136,0.3))",
        }}
      >
        {/* Temporal arc */}
        <path
          d="M 50 110 Q 300 -10, 550 110"
          fill="none"
          stroke="url(#mayaGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = [
            "#1B5E20",
            "#009688",
            "#BF360C",
            "#FFC107",
            "#4A148C",
            "#0288D1",
            "#78909C",
          ];
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="4"
              fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central glyph icon */}
        <rect
          x="286"
          y="16"
          width="28"
          height="28"
          rx="6"
          fill="none"
          stroke="#009688"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="300" cy="30" r="6" fill="#009688" opacity="0.5" />
        <circle cx="292" cy="22" r="2" fill="#009688" opacity="0.6" />
        <circle cx="308" cy="38" r="2" fill="#009688" opacity="0.6" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,150,136,0.2)" />
            <stop offset="50%" stopColor="rgba(0,150,136,0.9)" />
            <stop offset="100%" stopColor="rgba(0,150,136,0.2)" />
          </linearGradient>
        </defs>
        <text
          x="300"
          y="80"
          textAnchor="middle"
          fill="#009688"
          fontSize="18"
          fontWeight="bold"
          fontFamily="Georgia, serif"
          letterSpacing="3"
        >
          PALENQUE
        </text>
        <text
          x="300"
          y="100"
          textAnchor="middle"
          fill="rgba(0,150,136,0.6)"
          fontSize="11"
          fontFamily="monospace"
          letterSpacing="2"
        >
          EL TEMPLO DE LAS INSCRIPCIONES
        </text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          overflow: "hidden",
          border: `3px solid ${isActive ? node.color : "rgba(0,150,136,0.2)"}`,
          boxShadow: isActive
            ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
            : "0 4px 15px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={node.btnImage}
          alt={node.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
         loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: "absolute",
              inset: "-4px",
              borderRadius: "50%",
              border: `2px solid ${node.color}`,
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      <span
        style={{
          color: isActive ? node.color : "rgba(255,255,255,0.75)",
          fontSize: "0.78rem", fontWeight: 700, letterSpacing:"0.3px",
          textAlign: "center", lineHeight: 1.2, transition:"color 0.3s",
          maxWidth: "100px",
          textShadow: isActive ? `0 0 8px ${node.color}40` : "none",
        }}
      >
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotMayaM11"
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: node.color,
            boxShadow: `0 0 8px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

// ─── Expandable Section with Random Direction ────────────────────────────────
const DIRECTIONS = ["up", "down", "left", "right"];
const dirVariants = {
  up: { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down: { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  left: { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
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
    <div
      style={{
        marginTop: "0.8rem",
        borderRadius: "14px",
        border: `1px solid ${color}25`,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${color}08, transparent)`,
      }}
    >
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}12` }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          padding: "0.8rem 1rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(255,255,255,0.9)",
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: `${color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <IconComp size={14} style={{ color }} />
        </motion.div>
        <span
          style={{
            fontSize: "0.85rem", fontWeight: 700, color, letterSpacing:"0.5px",
            flex: 1,
            textAlign: "left",
          }}
        >
          {item.label}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
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
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ padding: "0 1rem 1rem 1rem" }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem", lineHeight: 1.75, color:"rgba(255,255,255,0.85)",
                borderLeft: `3px solid ${color}30`,
                paddingLeft: "0.8rem",
              }}
            >
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
    { top: "8%", right: "-10px", rotate: 15 },
    { top: "45%", left: "-15px", rotate: -10 },
    { bottom: "12%", right: "5px", rotate: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 250, damping: 25 }}
      style={{
        background: "rgba(12, 16, 12, 0.92)",
        backdropFilter: "blur(24px)",
        border: `1px solid ${node.color}30`,
        borderRadius: "24px",
        position: "relative",
        zIndex: 3,
        marginTop: "1rem",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          zIndex: 10,
          background: "rgba(0,0,0,0.6)",
          border: `1px solid ${node.color}40`,
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer", color: node.color, transition:"all 0.2s",
        }}
      >
        <X size={18} />
      </button>

      {/* ─── Two-Column Hero Section ─── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          minHeight: "280px",
        }}
      >
        {/* Left: Hero Image */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "100%",
            background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.image}
            alt={node.title}
            onClick={() => setLightboxSrc(node.image)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer", opacity: 0.9, minHeight:"280px",
            }}
          />
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height:"60px",
              background: `linear-gradient(transparent, ${node.color}15)`,
            }}
          />
        </div>

        {/* Right: Title + first 2 paragraphs */}
        <div
          style={{ padding: "2rem 2rem 1.5rem 1.5rem", position: "relative" }}
        >
          {decoComponents[0] && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "50px",
                transform: "rotate(15deg)",
                pointerEvents: "none",
              }}
            >
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3
            style={{
              margin: "0 0 0.8rem",
              fontSize: "1.5rem", fontWeight: 800, color: node.color, letterSpacing:"-0.02em",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                overflow: "hidden",
                border: `2px solid ${node.color}40`,
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={node.btnImage}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
               loading="lazy" />
            </span>
            {node.title}
          </h3>

          {node.content.slice(0, 2).map((para, i) => (
            <p
              key={i}
              style={{
                margin: "0 0 0.8rem",
                fontSize: "0.95rem", lineHeight: 1.75, color:"rgba(255,255,255,0.85)",
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* ─── Magazine Body ─── */}
      <div
        style={{
          padding: "1.5rem 2rem 2rem",
          position: "relative",
        }}
      >
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
                rotate: [
                  pos.rotate || 0,
                  (pos.rotate || 0) + 5,
                  pos.rotate || 0,
                ],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute", ...pos, zIndex: 1, pointerEvents:"none",
              }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.2rem 2rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          {node.content.slice(2).map((para, i) => {
            const isWide =
              i === node.content.slice(2).length - 1 &&
              node.content.slice(2).length % 2 !== 0;
            return (
              <div
                key={i}
                style={{
                  gridColumn: isWide ? "1 / -1" : "auto",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "12px",
                  padding: "1.2rem",
                  borderLeft: `3px solid ${node.color}30`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "12px", background: node.color, color:"#0B0E2D",
                    fontSize: "0.65rem", fontWeight: 800, padding:"2px 8px",
                    borderRadius: "8px",
                    letterSpacing: "1px",
                  }}
                >
                  {i === 0 ? "─â€”â€ " : "─â€”â€¡"}
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.95rem", lineHeight: 1.75, color:"rgba(255,255,255,0.85)",
                  }}
                >
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: "2rem", position: "relative", zIndex: 2 }}>
            <h4
              style={{
                fontSize: "1.1rem", color: node.color, margin:"0 0 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <ChevronRight size={18} /> Explora Más Detalles
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Fun Fact ─── */}
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
          <div
            style={{
              marginTop: "2rem",
              background: `linear-gradient(90deg, ${node.color}15, transparent)`,
              borderLeft: `4px solid ${node.color}`,
              padding: "1.5rem",
              borderRadius: "0 16px 16px 0",
              display: "flex",
              gap: "1rem",
              alignItems: "flex-start",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px", flexShrink: 0, borderRadius:"50%",
                background: `${node.color}20`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span
                style={{
                  fontSize: "0.7rem", fontWeight: 800, color: node.color, letterSpacing:"2px",
                  textTransform: "uppercase",
                }}
              >
                Dato Científico
              </span>
              <p
                style={{
                  margin: "0.3rem 0 0",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "0.92rem",
                  lineHeight: 1.7,
                }}
              >
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        padding: "0.6rem 1rem",
        background: "rgba(255,255,255,0.03)",
        borderRadius: "30px",
        border: "1px solid rgba(0,150,136,0.15)",
      }}
    >
      <Star size={14} style={{ color: "#009688", flexShrink: 0 }} />
      <div
        style={{
          flex: 1,
          height: "6px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "3px",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #1B5E20, #009688)",
            borderRadius: "3px",
            boxShadow: "0 0 8px rgba(0,150,136,0.4)",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "0.75rem",
          color: "#009688",
          fontFamily: "monospace",
          fontWeight: "bold",
          minWidth: "45px",
          textAlign: "right",
        }}
      >
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM11() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const handleNodeClick = (nodeId) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
      setExplored((prev) => new Set([...prev, nodeId]));
    }
  };

  const activeData = INFOGRAPHIC_NODES.find((n) => n.id === activeNode);

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(12,16,12,0.85) 0%, rgba(15,20,15,0.8) 40%, rgba(12,16,12,0.88) 100%), ",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        borderRadius: "24px",
        padding: "2rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <TemporalField />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "2rem",
        }}
      >
        <div style={{ flex: 1 }} />
        <div style={{ flex: 2 }}>
          <MayaHeader />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: "1rem",
          }}
        >
          <ProgressBar
            explored={explored.size}
            total={INFOGRAPHIC_NODES.length}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
          position: "relative",
          zIndex: 2,
          padding: "0 1rem",
        }}
      >
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

      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <h4
          style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: "2px",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Fuentes y Referencias
        </h4>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          {BIBLIOGRAPHY.map((bib, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.03)",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
              }}
            >
              {bib}
            </span>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
