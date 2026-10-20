'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Space Engineering Themed)
   ========================================================================= */

const DecoGear = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" opacity="0.9"/>
  </svg>
);

const DecoRocket = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5m2-2l7-7a3.53 3.53 0 00-5-5l-7 7m5 5l-5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
    <circle cx="14" cy="10" r="1.5" stroke={color} strokeWidth="1.5" opacity="0.9"/>
    <path d="M9.5 9.5l-3.5 3.5m5-5l3.5-3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const DecoSatellite = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M8 12a4 4 0 018 0M8 8a8 8 0 018 0M8 4a12 12 0 018 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <rect x="3" y="16" width="18" height="4" rx="1" stroke={color} strokeWidth="1.5" opacity="0.9"/>
    <path d="M12 16v-2m-4 2v-2m8 2v-2" stroke={color} strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

const DecoSpaceStation = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="4" y="10" width="16" height="4" rx="1" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <rect x="2" y="8" width="4" height="8" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <rect x="18" y="8" width="4" height="8" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.9"/>
    <path d="M12 10V6m0 8v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const DecoWrench = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
  </svg>
);

const DECO_MAP = {
  'iss-naves': [DecoSpaceStation, DecoGear],
  'materiales': [DecoGear, DecoWrench],
  'propulsion': [DecoRocket, DecoGear],
  'megaestructuras': [DecoSpaceStation, DecoSatellite],
  'mineria': [DecoWrench, DecoGear],
  'soporte-vital': [DecoSatellite, DecoSpaceStation],
  'gravedad': [DecoGear, DecoSpaceStation],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "NASA (2023). 'International Space Station Facts and Figures'. NASA History Office.",
  "O'Neill, G. K. (1974). 'The Colonization of Space'. Physics Today, 27(9), 32-40.",
  "Dyson, F. J. (1960). 'Search for Artificial Stellar Sources of Infrared Radiation'. Science, 131(3409).",
  "Zubrin, R. (1996). 'The Case for Mars: The Plan to Settle the Red Planet and Why We Must'. Free Press.",
  "Bussard, R. W. (1960). 'Galactic Matter and Interstellar Flight'. Astronautica Acta, 6, 179-194.",
  "Lewis, J. S. (1996). 'Mining the Sky: Untold Riches from the Asteroids, Comets, and Planets'. Addison-Wesley."
];

const INFOGRAPHIC_NODES = [
  {
    "id": "iss-naves",
    diagramImage: '/assets/starwars/infographic_cruceros/diagram_iss-naves.webp',
    diagramCaption: 'El espacio requiere naves gigantescas para su exploración.',
    "title": "De la ISS a los Destructores Estelares",
    "color": "#90CAF9",
    "btnImage": "/assets/starwars/infographic_cruceros/btn_iss-naves.webp",
    "image": "/assets/starwars/infographic_cruceros/hero_iss-naves.webp",
    "bannerImage": "/assets/starwars/infographic_cruceros/banner_iss-naves.webp",
    "bannerCaption": "El espacio requiere naves gigantescas para su exploración.",
    "content": [
      "La Estación Espacial Internacional (ISS) es la mayor obra de ingeniería y habitabilidad construida por la humanidad más allá de la atmósfera terrestre. Con una masa superior a cuatrocientas cincuenta toneladas, una envergadura de ciento nueve metros de extremo a extremo y una ocupación humana ininterrumpida desde noviembre del año 2000, este laboratorio orbital representa el pináculo de la capacidad tecnológica contemporánea para vivir en el espacio.",
      "Al contrastar la ISS con los colosales Destructores Estelares imperiales de mil seiscientos metros de longitud, se evidencia una brecha que la astrofísica y la ingeniería explican con rigor. Construir una nave espacial de semejantes proporciones en la superficie de la Tierra es un absurdo físico: la estructura colapsaría bajo su propio peso durante el ensamblaje y ningún cohete conocido poseería la potencia necesaria para vencer la gravedad planetaria.",
      "La construcción de cualquier nave interestelar gigantesca exigirá astilleros orbitales situados en zonas de microgravedad o en puntos lagrangianos estables del sistema Tierra-Luna. La ISS demostró la viabilidad de este concepto mediante más de cuarenta y dos misiones complejas de lanzamiento y ensamblaje, uniendo módulos de presurización hermética de titanio y aluminio acoplados con precisión milimétrica mediante brazos robóticos articulados como el Canadarm2.",
      "Los retos estructurales que soporta un hábitat orbital en el vacío son formidables. Cada noventa minutos, al cruzar la frontera entre el día y la noche terrestre a veintiocho mil kilómetros por hora, los materiales de la nave sufren variaciones térmicas bruscas que van desde ciento veinte grados Celsius bajo el sol hasta ciento cincuenta grados bajo cero en la sombra, generando tensiones de fatiga térmica acompañadas del impacto continuo de micrometeoritos a hipervelocidad.",
      "La experiencia técnica de la ISS sienta las bases para las futuras naves interplanetarias tripuladas que viajarán a Marte. Proyectos internacionales como la estación Gateway en órbita lunar y los módulos hábitat inflables con tejidos trenzados de alta tenacidad demuestran que el tránsito desde estaciones orbitales experimentales hasta auténticos cruceros espaciales modulares de exploración profunda es un camino en plena marcha."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Los Destructores Estelares del Imperio Galáctico dominan los cielos con su imponente perfil triangular de mil seiscientos metros, capaces de desplegar flotas de cazas TIE y guarniciones completas. En el mundo real, la ISS demuestra que construir hábitats espaciales de gran tamaño exige cooperación pacífica global y ensamblaje modular milimétrico."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La ISS viaja a una velocidad orbital de veintisiete mil seiscientos kilómetros por hora a unos cuatrocientos kilómetros de altitud, completando una vuelta a la Tierra cada noventa y dos minutos y experimentando dieciséis amaneceres y atardeceres cada veinticuatro horas en su rutina científica diaria."
      }
    ],
    "fact": "La Estación Espacial Internacional requirió más de 115 lanzamientos espaciales de construcción y una inversión internacional acumulada de más de ciento cincuenta mil millones de dólares; sus alas solares abarcan una superficie de más de 2,400 metros cuadrados, generando 120 kilovatios de electricidad utilizable."
  },
  {
    "id": "materiales",
    diagramImage: '/assets/starwars/infographic_cruceros/diagram_materiales.webp',
    diagramCaption: 'Nuevas aleaciones permitirán estructuras imposibles hoy.',
    "title": "Supermateriales del Futuro",
    "color": "#B0BEC5",
    "btnImage": "/assets/starwars/infographic_cruceros/btn_materiales.webp",
    "image": "/assets/starwars/infographic_cruceros/hero_materiales.webp",
    "bannerImage": "/assets/starwars/infographic_cruceros/banner_materiales.webp",
    "bannerCaption": "Nuevas aleaciones permitirán estructuras imposibles hoy.",
    "content": [
      "En la mitología armamentista de Star Wars, los cascos blindados de los cruceros estelares y las armaduras de élite mandalorianas están forjados con metales cuasi indestructibles como el duracero o el legendario beskar. En la ciencia de materiales moderna, los científicos desarrollan supermateriales sintéticos reales cuyas propiedades mecánicas, térmicas y cuánticas comienzan a superar los límites impuestos por la metalurgia tradicional.",
      "El grafeno y los nanotubos de carbono constituyen la vanguardia de esta revolución estructural. El grafeno, aislado en 2004 por Andréy Gueim y Konstantín Novosiólov en la Universidad de Manchester, consiste en una única lámina bidimensional de átomos de carbono dispuestos en un patrón hexagonal regular. Posee una resistencia mecánica a la tracción doscientas veces superior a la del mejor acero estructural, con una densidad seis veces menor.",
      "Otro desarrollo fundamental son las aleaciones de alta entropía (conocidas por la sigla HEA). A diferencia de las aleaciones clásicas compuestas por un metal base mayoritario con pequeñas trazas de otros elementos, las HEA combinan cinco o más metales en proporciones casi equimolares. Esta mezcla genera una distorsión en la red cristalina que impide el deslizamiento de dislocaciones, brindando una tenacidad y resistencia colosales a temperaturas criogénicas espaciales.",
      "Para resistir las extremas fricciones de la reentrada planetaria y los plasmas de propulsores de cohetes, se emplean cerámicas de ultraalta temperatura (UHTCs) como el diboruro de circonio y el carburo de tántalo y hafnio. Estos compuestos cerámicos retienen su integridad estructural a temperaturas que sobrepasan con creces los tres mil grados Celsius sin oxidarse ni fundirse, convirtiéndose en los escudos térmicos más avanzados del planeta.",
      "Los metamateriales mecánicos completan este arsenal de blindajes espaciales. Diseñados con microarquitecturas tridimensionales calculadas matemáticamente, presentan propiedades mecánicas inusuales como la auxeticidad: materiales que al ser estirados o comprimidos se ensanchan transversalmente en lugar de adelgazarse, absorbiendo y disipando ondas de choque cinéticas provocadas por proyectiles y metralla de micrometeoritos."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El beskar, también conocido como hierro mandaloriano, es un metal cuasi indestructible capaz de repeler disparos directos de bláster e incluso resistir estocadas de sable de luz. En el mundo real, los blindajes de naves combinan capas cerámicas de carburo de boro con fibras de aramida y aerogeles de sílice para absorber impactos de alta velocidad."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Un cable de nanotubos de carbono puro de un milímetro cuadrado de sección transversal podría soportar una carga en suspensión de más de seis mil kilogramos antes de romperse, convirtiéndose en el único material conocido teóricamente apto para construir un ascensor espacial anclado en la Tierra, superando con creces la resistencia tensil de las mejores aleaciones de titanio y acero aeroespacial."
      }
    ],
    "fact": "El grafeno posee un módulo de Young de un terapascal y una resistencia intrínseca a la fractura de ciento treinta gigapascales; se necesitaría el peso de un elefante adulto apoyado sobre la punta afilada de un lápiz para perforar una lámina de grafeno del espesor de una envoltura de polietileno, convirtiéndolo en uno de los materiales bidimensionales más asombrosos sintetizados por la nanotecnología."
  },
  {
    "id": "propulsion",
    diagramImage: '/assets/starwars/infographic_cruceros/diagram_propulsion.webp',
    diagramCaption: 'Los motores iónicos ya son una realidad científica.',
    "title": "Motores Estelares: Química a Iones",
    "color": "#FFB74D",
    "btnImage": "/assets/starwars/infographic_cruceros/btn_propulsion.webp",
    "image": "/assets/starwars/infographic_cruceros/hero_propulsion.webp",
    "bannerImage": "/assets/starwars/infographic_cruceros/banner_propulsion.webp",
    "bannerCaption": "Los motores iónicos ya son una realidad científica.",
    "content": [
      "La navegación espacial está dominada por una ley física inmutable: la ecuación del cohete formulada por Konstantín Tsiolkovski en 1903. Esta relación matemática dicta que el cambio neto de velocidad de cualquier nave espacial depende exclusivamente de la velocidad efectiva con la que expulsa los gases de su tobera y del logaritmo natural de la proporción entre su masa inicial total cargada de combustible y su masa final seca.",
      "Los cohetes químicos tradicionales, como los motores de queroseno y oxígeno del Saturno V o los modernos motores Raptor de metano de SpaceX, suministran un empuje formidable de millones de newtons imprescindible para vencer la gravedad y ascender al espacio. Sin embargo, su velocidad de escape de gases está limitada termodinámicamente por la energía de los enlaces moleculares químicos a un máximo de cuatro mil quinientos metros por segundo.",
      "Para travesías interplanetarias de largo alcance, la física recurre a la propulsión eléctrica y de plasma, ejemplificada por el motor VASIMR (cohete de magnetoplasma de impulso específico variable). En estos sistemas, ondas electromagnéticas de radiofrecuencia calientan gas inerte de argón hasta convertirlo en plasma a dos millones de grados Celsius, el cual es acelerado por campos magnéticos a velocidades de escape de cincuenta kilómetros por segundo.",
      "Una vía intermedia de enorme potencia es la propulsión térmica nuclear (NTP), actualmente investigada por la NASA y DARPA en el proyecto DRACO. Al canalizar hidrógeno líquido directamente a través del núcleo activo de un reactor nuclear de fisión de uranio enriquecido a dos mil grados Celsius, el gas se expande violentamente hacia la tobera, duplicando el impulso específico de cualquier cohete químico y acortando los viajes a Marte a solo tres meses.",
      "En el horizonte teórico interestelar, conceptos como las velas solares fotónicas y las velas de luz empujadas por láseres ópticos de petavatios en tierra firme (como la iniciativa científica Breakthrough Starshot) eliminan la necesidad de transportar combustible a bordo, permitiendo acelerar pequeñas sondas de exploración espacial al veinte por ciento de la velocidad de la luz hacia Alfa Centauri."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Los cazas estelares X-Wing y los interceptores TIE cruzan el espacio propulsados por motores de iones gemelos (Twin Ion Engine, de donde proviene la sigla TIE). La saga acierta en el uso de iones, aunque en las películas maniobran en el vacío como si estuvieran volando con alas dentro de la atmósfera terrestre."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La vela solar japonesa IKAROS lanzada en 2010 demostró por primera vez en la historia la propulsión espacial pura impulsada por la presión de radiación de los fotones solares sobre una membrana reflectante de catorce metros de diagonal, sin consumir una sola gota de propelente químico, navegando con éxito hacia Venus mediante la fuerza pura de la luz estelar continua."
      }
    ],
    "fact": "El motor químico Saturno V consumía quince toneladas de queroseno y oxígeno líquido por segundo durante el despegue para generar treinta y cuatro meganewtons de empuje; en contraste, el motor iónico de la sonda Dawn generaba un empuje de solo noventa milinewtons pero operó de forma continua durante cinco años de travesía cósmica."
  },
  {
    "id": "megaestructuras",
    diagramImage: '/assets/starwars/infographic_cruceros/diagram_megaestructuras.webp',
    diagramCaption: 'Cilindros de O',
    "title": "Megaestructuras de Ingeniería",
    "color": "#CE93D8",
    "btnImage": "/assets/starwars/infographic_cruceros/btn_megaestructuras.webp",
    "image": "/assets/starwars/infographic_cruceros/hero_megaestructuras.webp",
    "bannerImage": "/assets/starwars/infographic_cruceros/banner_megaestructuras.webp",
    "bannerCaption": "Cilindros de O'Neill y Esferas de Dyson: sueños de arquitectos del espacio.",
    "content": [
      "Las megaestructuras espaciales son construcciones artificiales de escala planetaria o estelar concebidas por la física teórica y la ingeniería astronáutica avanzada. En 1964, el astrofísico Nikolái Kardashov formuló una escala cuantitativa para clasificar el nivel evolutivo de civilizaciones tecnológicas extraterrestres según su dominio y explotación de recursos energéticos cósmicos.",
      "En la cumbre de esta escala, una civilización de Tipo II tendría la capacidad de cosechar toda la energía radiada por su estrella matriz mediante una Esfera o Enjambre de Dyson. Propuesto por el físico Freeman Dyson en 1960, este concepto no consiste en una cáscara sólida e inestable propensa a colapsar, sino en una flotilla de millones de espejos colectores solares y estaciones orbitales de energía situados en órbitas independientes alrededor del astro rey.",
      "Para proporcionar hábitats habitables sin depender de superficies planetarias, Gerard O'Neill propuso en la década de 1970 el diseño del Cilindro de O'Neill. Consiste en dos cilindros concéntricos cerrados de cinco kilómetros de diámetro y treinta kilómetros de longitud que rotan en sentidos opuestos para neutralizar el momento angular, conteniendo una atmósfera habitable completa, campos agrícolas y ciudades autónomas para millones de habitantes.",
      "Otra megaestructura fundamental para conectar la superficie planetaria con el espacio exterior es el Ascensor Espacial. Compuesto por un cable continuo de más de treinta y seis mil kilómetros de longitud anclado en la línea ecuatorial y tensado por la fuerza centrífuga de un contrapeso más allá de la órbita geoestacionaria, permitiría elevar cargamentos al espacio mediante cabinas eléctricas trepadoras a un costo monetario y energético insignificante.",
      "La viabilidad de todas estas construcciones monumentales choca directamente contra la resistencia a la tracción de los materiales conocidos. Ningún metal convencional puede soportar las tensiones mecánicas de decenas de gigapascales generadas en un ascensor espacial o un anillo orbital; solo la síntesis a escala macroscópica de fibras de nanotubos de carbono o carbyne permitirá transformar estas visiones en realidades tangibles."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El planeta Coruscant en Star Wars es una ecumenópolis: una ciudad artificial que cubre toda la superficie del planeta en miles de niveles urbanos superpuestos. Aunque impresionante, mantener una ecumenópolis exigiría importar millones de toneladas de alimentos y calor radiante por segundo desde sistemas estelares vecinos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Un Cilindro de O'Neill girando a una revolución por minuto generaría una gravedad centrífuga de un g en su pared interna, albergando una atmósfera templada, ríos y campos agrícolas capaces de sustentar a varios millones de seres humanos de forma totalmente autónoma, proporcionando hábitats espaciales estables y protegidos contra la radiación cósmica mediante gruesos cascos de regolito lunar."
      }
    ],
    "fact": "El flujo de energía total emitido por el Sol es de aproximadamente 3.8 x 10^26 vatios; interceptar apenas el uno por ciento de esta radiación mediante un enjambre de Dyson proporcionaría más de un billón de veces la energía total consumida por toda la civilización humana moderna en la actualidad, abriendo la puerta teórica a una civilización de Tipo II según la escala astrofísica de Kardashev."
  },
  {
    "id": "mineria",
    diagramImage: '/assets/starwars/infographic_cruceros/diagram_mineria.webp',
    diagramCaption: 'Extraer recursos en el espacio evitará la carga de lanzar materiales desde la Tierra.',
    "title": "Minería de Asteroides",
    "color": "#FFD54F",
    "btnImage": "/assets/starwars/infographic_cruceros/btn_mineria.webp",
    "image": "/assets/starwars/infographic_cruceros/hero_mineria.webp",
    "bannerImage": "/assets/starwars/infographic_cruceros/banner_mineria.webp",
    "bannerCaption": "Extraer recursos en el espacio evitará la carga de lanzar materiales desde la Tierra.",
    "content": [
      "La minería de asteroides representa la mayor oportunidad de expansión económica e industrial para el futuro de la exploración espacial humana. En lugar de continuar degradando la biosfera terrestre mediante minería a cielo abierto y pagar decenas de miles de dólares por cada kilogramo de mineral lanzado desde la Tierra, los recursos críticos del siglo XXI serán cosechados directamente en el espacio exterior.",
      "Los asteroides del sistema solar se dividen en tres grandes familias espectrales según su composición geoquímica: asteroides de tipo C (carbonáceos hidratados), de tipo S (silicatados de roca y metales comunes) y de tipo M (cuerpos metálicos macizos). Los asteroides de tipo C contienen hasta un quince por ciento de su peso en agua estructural atrapada en minerales arcillosos, convirtiéndolos en oasis indispensables para la navegación.",
      "En la economía espacial, el agua no es solo un recurso vital para la hidratación y el cultivo de alimentos en los hábitats orbitales, sino el propulsor por excelencia. Mediante celdas de electrólisis alimentadas por energía solar fotovoltaica, el agua extraída de un asteroide se separa en hidrógeno molecular y oxígeno, permitiendo reabastecer naves espaciales en depósitos de combustible situados en órbita sin costo de lanzamiento terrestre.",
      "Por su parte, los asteroides metálicos albergan concentraciones colosales de metales industriales y tierras raras. El caso más asombroso es 16 Psique, un asteroide de más de doscientos kilómetros de diámetro explorado por la misión Psyche de la NASA lanzada en 2023. Se estima que este cuerpo es el núcleo metálico expuesto de un protoplaneta primitivo compuesto casi exclusivamente de hierro, níquel, oro, platino y cobalto puros.",
      "Operar en un entorno de microgravedad exige métodos de extracción totalmente innovadores, ya que la maquinaria pesada terrestre simplemente saldría disparada al intentar excavar. Los ingenieros desarrollan tecnologías de minería óptica concentrando luz solar con espejos cóncavos gigantes para vaporizar y sublimar los hielos volátiles, complementadas por biorreactores bacterianos de biolixiviación para concentrar metales finos."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En Star Wars, planetas enteros y cinturones de asteroides son explotados por corporaciones mineras galácticas o clanes espaciales, como las minas de especias en Kessel o las colonias mineras en asteroides remotos. En la realidad, las primeras estaciones de reabastecimiento minero operarán en asteroides cercanos a la Tierra (NEAs)."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Se estima que un solo asteroide metálico de tipo M de un kilómetro de diámetro contiene más platino, oro y rodio que todo el mineral metálico precioso extraído por la humanidad a lo largo de toda la historia documentada de la civilización terrestre, con un valor económico proyectado superior a los cincuenta billones de dólares que impulsaría la colonización del sistema solar."
      }
    ],
    "fact": "El asteroide 16 Psique tiene una masa estimada en dos coma cuatro por diez elevado a diecinueve kilogramos y está compuesto principalmente de hierro y níquel metálicos; se calcula que el valor de sus metales en la economía terrestre teórica superaría los diez trillones de dólares, más que el producto interno bruto global."
  },
  {
    "id": "soporte-vital",
    diagramImage: '/assets/starwars/infographic_cruceros/diagram_soporte-vital.webp',
    diagramCaption: 'En el vacío, el agua y el oxígeno son tesoros valiosos.',
    "title": "Reciclar para Sobrevivir",
    "color": "#81C784",
    "btnImage": "/assets/starwars/infographic_cruceros/btn_soporte-vital.webp",
    "image": "/assets/starwars/infographic_cruceros/hero_soporte-vital.webp",
    "bannerImage": "/assets/starwars/infographic_cruceros/banner_soporte-vital.webp",
    "bannerCaption": "En el vacío, el agua y el oxígeno son tesoros valiosos.",
    "content": [
      "En las profundidades del espacio interestelar, donde impera el vacío absoluto, la radiación ionizante y temperaturas letales cercanas al cero absoluto, una nave espacial debe actuar como una biosfera artificial perfectamente sellada. La ingeniería espacial resuelve esta supervivencia mediante los Sistemas de Control Ambiental y Soporte de Vida (denominados formalmente ECLSS en los protocolos internacionales de la NASA y la ESA).",
      "El ciclo cerrado del agua es la piedra angular del soporte vital en la Estación Espacial Internacional. El subsistema procesador de agua recolecta continuamente la humedad ambiental generada por la transpiración y la respiración de la tripulación, junto con la orina humana. A través de una centrífuga de destilación por compresión de vapor y filtros de ósmosis inversa de múltiples etapas, el sistema recupera el noventa y ocho por ciento de toda el agua para consumo directo.",
      "La atmósfera habitable exige un control estricto de dos gases vitales: el oxígeno respirable y el dióxido de carbono exhalado. El oxígeno se produce mediante el sistema de generación por electrólisis (OGS), que divide el agua reciclada en hidrógeno y oxígeno. Al mismo tiempo, lechos absorbentes de zeolita capturan las moléculas de dióxido de carbono antes de que alcancen niveles tóxicos que provoquen letargo o asfixia en la tripulación.",
      "Para evitar pérdidas irrecuperables de gas, el reactor catalítico de Sabatier combina el dióxido de carbono capturado con el hidrógeno residual de la electrólisis a cuatrocientos grados Celsius sobre un lecho de níquel. Esta reacción química sintetiza agua regenerada adicional y gas metano, cerrando el ciclo metabólico de forma magistral y reduciendo drásticamente las cargas de reaprovisionamiento desde la Tierra.",
      "El horizonte de los viajes interplanetarios a Marte dependerá de sistemas biorregenerativos avanzados como el proyecto MELiSSA de la Agencia Espacial Europea. Inspirado en los ciclos biológicos de la biosfera terrestre, este sistema encadena biorreactores con microalgas Spirulina y cultivos hidropónicos de trigo y soja, produciendo alimentos frescos y oxígeno mediante fotosíntesis biológica inagotable."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Las tripulaciones de Star Wars viajan durante semanas a través del hiperespacio en naves como el Halcón Milenario sin preocuparse aparentemente por el agua o los filtros de aire. En los viajes interplanetarios reales, cada gota de agua debe reciclarse decenas de veces para evitar que la nave agote sus provisiones vitales."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En el año 2023, la NASA confirmó que la Estación Espacial Internacional alcanzó una tasa de reciclaje de agua histórica del noventa y ocho por ciento gracias al nuevo ensamblaje de procesador de orina y deshidratador de salmuera (BPA), un hito crítico para las futuras misiones tripuladas a Marte, demostrando la viabilidad de sistemas de soporte vital regenerativos en vuelos espaciales de larga duración."
      }
    ],
    "fact": "Cada astronauta en el espacio consume diariamente una media de 0.84 kilogramos de oxígeno molecular puro, genera un kilogramo de dióxido de carbono por respiración celular y requiere 2.5 litros de agua para hidratación; sin sistemas de reciclaje en circuito cerrado como el ECLSS, una misión a Marte requeriría treinta toneladas de suministros."
  },
  {
    "id": "gravedad",
    diagramImage: '/assets/starwars/infographic_cruceros/diagram_gravedad.webp',
    diagramCaption: 'La microgravedad debilita los huesos; la rotación podría ser nuestra salvación.',
    "title": "Creando Gravedad Artificial",
    "color": "#64B5F6",
    "btnImage": "/assets/starwars/infographic_cruceros/btn_gravedad.webp",
    "image": "/assets/starwars/infographic_cruceros/hero_gravedad.webp",
    "bannerImage": "/assets/starwars/infographic_cruceros/banner_gravedad.webp",
    "bannerCaption": "La microgravedad debilita los huesos; la rotación podría ser nuestra salvación.",
    "content": [
      "En la ciencia ficción cinematográfica, los astronautas caminan plácidamente sobre las cubiertas de las naves gracias a ficticios «generadores de gravedad» integrados bajo el piso. Sin embargo, en la física real contemporánea, no existe ninguna partícula gravitatoria aislable ni tecnología capaz de generar un campo de atracción gravitacional estático sin la presencia de una masa planetaria colosal como la de la propia Tierra.",
      "La ausencia prolongada de gravedad acarrea efectos patológicos devastadores para la fisiología de los astronautas en misiones de larga duración. La falta de resistencia mecánica provoca una pérdida acelerada de densidad mineral ósea del uno al uno coma cinco por ciento mensual en el fémur y la columna, una severa atrofia muscular por desuso y alteraciones cardiovasculares graves debidas a la redistribución cefálica de la sangre.",
      "La única solución física y matemáticamente comprobada para simular gravedad en el vacío espacial es la aceleración centrífuga rotacional. En virtud del Principio de Equivalencia formulado por Albert Einstein, una aceleración mecánica uniforme es físicamente indistinguible de la gravedad newtoniana para un observador confinado dentro de un sistema en rotación continua alrededor de un eje central.",
      "No obstante, hacer girar una nave habitable introduce un severo desafío biomecánico: la fuerza ficticia de Coriolis, dada por menos dos veces la masa multiplicada vectorialmente por la velocidad angular y la velocidad relativa del tripulante. Si la estación rota a más de tres revoluciones por minuto, cualquier movimiento de la cabeza induce señales cruzadas contradictorias en los canales semicirculares del oído interno, provocando mareos y vómitos violentos.",
      "Para generar una gravedad artificial cómoda de un g terrestre (nueve coma ochenta y un metros por segundo al cuadrado) sin superar el umbral neurovestibular seguro de dos revoluciones por minuto, la estructura de la nave o estación espacial debe poseer un radio de rotación mínimo de doscientos veinticuatro metros, impulsando diseños de naves con dos módulos conectados mediante largos cables de tracción girando sobre su centro de masa."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Desde los cazas estelares rebeldes hasta los gigantescos destructores imperiales, las tripulaciones de Star Wars caminan erguidas sin flotar jamás en el espacio, asumiendo una tecnología de manipulación gravitatoria que la física actual desconoce. En la realidad, las primeras naves hacia Marte probablemente rotarán sobre sí mismas en órbita."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La aceleración centrífuga se calcula con la fórmula matemática a igual a omega al cuadrado por el radio (donde omega es la velocidad angular en radianes por segundo). Para duplicar la gravedad aparente se puede o bien duplicar el radio de la estructura o multiplicar por uno coma cuarenta y uno la tasa de rotación."
      }
    ],
    "fact": "Para producir una gravedad artificial idéntica a la terrestre de 9.81 m/s² con una velocidad de rotación segura de apenas 1.5 revoluciones por minuto que prevenga el mareo por efecto Coriolis en el oído interno, la nave o hábitat cilíndrico debe poseer un radio estructural de exactamente cuatrocientos metros."
  }
];

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }
};

const EXPAND_ICONS = {
  zap: <Zap size={18} />,
  clock: <Clock size={18} />,
  atom: <Atom size={18} />
};

/* =========================================================================
   3. COMPONENTS
   ========================================================================= */

const StarField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);
    
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: (Math.random() * 0.05) + 0.01
    }));

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });
      
      if (Math.random() < 0.005) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height / 2);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 20, startY + 20);
        ctx.strokeStyle = 'rgba(200,220,255,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
};

const GalacticHeader = ({ nodes, activeId }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: '"Oswald", sans-serif', 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        color: '#AB47BC',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(171, 71, 188, 0.4)'
      }}>
        CONSTRUYENDO NAVES COLOSALES
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        ASTILLEROS &middot; PROPULSIÓN &middot; MEGAESTRUCTURAS
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec8" : undefined}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: n.id === activeId ? n.color : '#2A2D3E', transition: 'background-color 0.3s' }} 
          />
        ))}
      </div>
    </div>
  );
};

const NodeButton = ({ node, isVisited, onClick }) => {
  const isComplete = isVisited(node.id);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(node)}
      style={{
        position: 'relative',
        width: '116px',
        height: '116px',
        borderRadius: '50%',
        padding: 0,
        border: `3px solid ${isComplete ? node.color : '#333'}`,
        background: '#1A1C29',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: isComplete ? `0 0 15px ${node.color}55` : 'none',
        zIndex: 10
      }}
    >
      <img 
        src={node.btnImage} 
        alt={node.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isComplete ? 1 : 0.6 }}
       loading="lazy" />
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px', background: node.color, borderRadius:'50%',
          padding: '2px'
        }}>
          <Sparkles size={12} color="#000" />
        </div>
      )}
    </motion.button>
  );
};

const ExpandableSection = ({ data, color, direction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const variant = dirVariants[direction] || dirVariants.up;
  
  return (
    <div style={{ marginBottom: '1rem', background: '#1A1C29', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${color}33` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: isOpen ? `${color}11` : 'transparent',
          border: 'none',
          color: '#FFF',
          cursor: 'pointer',
          fontFamily: '"Oswald", sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: color }}>{EXPAND_ICONS[data.icon] || <Star size={18}/>}</span>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{data.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.6, color: '#CFD8DC' }}>
              {data.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentPanel = ({ node, onClose, onNext, isLast, setLightboxSrc }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoGear;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoSpaceStation;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        inset: '2rem',
        background: '#0B0D17',
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 100,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${node.color}33`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DecoComp1 size={200} color={node.color} style={{ position: 'absolute', top: '-50px', left: '-50px', opacity: 0.05, zIndex: 0 }} />
      <DecoComp2 size={150} color={node.color} style={{ position: 'absolute', bottom: '10%', right: '-20px', opacity: 0.05, zIndex: 0 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: `linear-gradient(90deg, #1A1C29 0%, ${node.color}22 100%)`, zIndex: 10, borderBottom: `1px solid ${node.color}33` }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0, fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', color: '#FFF' }}>
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
        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#FFF', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
          <X size={24} />
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>
                {node.content[0].charAt(0)}
              </span>
              {node.content[0].substring(1)}
            </p>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0', marginTop: '1rem' }}>
              {node.content[1]}
            </p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
            <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, minHeight: '280px', borderLeft: `4px solid ${node.color}` }} />
          </div>
        </div>

        <div style={{ padding: '3rem 2rem', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', margin: 0, padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              {node.content[2]}
            </p>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', margin: 0, padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              {node.content[3]}
            </p>
          </div>
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', margin: '1rem 0 0 0', padding: '1.5rem', background: `linear-gradient(90deg, ${node.color}11, transparent)`, borderRadius: '12px', borderLeft: `4px solid ${node.color}` }}>
            {node.content[4]}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
            ))}
          </div>
          
          {node.bannerImage && (
            <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
              <img src={node.bannerImage} alt={node.bannerCaption || ''} 
                   onClick={() => setLightboxSrc(node.bannerImage)}

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
 style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)', pointerEvents: 'none' }} />
              {node.bannerCaption && (
                <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                            fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                            textShadow: '0 1px 3px rgba(0,0,0,0.8)', pointerEvents: 'none' }}>
                  {node.bannerCaption}
                </p>
              )}
            </div>
          )}

          <div style={{ position: 'relative', padding: '1.5rem', background: `linear-gradient(135deg, ${node.color}11, transparent)`, border: `1px solid ${node.color}33`, borderRadius: '12px' }}>
            <div style={{ position: 'absolute', top: -12, left: 16, background: '#0B0D17', padding: '0 8px', color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
              <Star size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> DATO FASCINANTE
            </div>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.6, color: '#FFF', margin: 0 }}>
              {node.fact}
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', paddingBottom: '2rem' }}>
            <button
              onClick={onNext}
              style={{
                background: `linear-gradient(45deg, ${node.color}, ${node.color}88)`,
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '30px',
                color: '#000',
                fontWeight: 'bold',
                fontFamily: '"Oswald", sans-serif',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: `0 4px 15px ${node.color}66`
              }}
            >
              {isLast ? 'COMPLETAR ENTRENAMIENTO' : 'SIGUIENTE LECCIÓN'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec8() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);
  
  const handleNodeClick = (node) => setActiveNodeId(node.id);
  
  const handleClose = () => setActiveNodeId(null);
  
  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNodeId);
    if (!visitedNodes.includes(activeNodeId)) {
      setVisitedNodes([...visitedNodes, activeNodeId]);
    }
    
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      setActiveNodeId(INFOGRAPHIC_NODES[currentIndex + 1].id);
    } else {
      setActiveNodeId(null);
    }
  };
  
  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);
  
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '600px', background: '#0B0D17', borderRadius: '16px', overflow: 'hidden', padding: '2rem', backgroundImage: "url('/assets/starwars/infographic_cruceros/bg_cruceros.webp')", backgroundSize: 'cover', backgroundPosition: 'center', color: '#FFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <StarField />
      
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNodeId} />
        
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '2rem 0' }}>
          {INFOGRAPHIC_NODES.map((node) => (
            <NodeButton 
              key={node.id}
              node={node}
              isVisited={(id) => visitedNodes.includes(id)}
              onClick={handleNodeClick}
            />
          ))}
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', borderRadius: '0 0 16px 16px' }}>
          <h4 style={{ fontFamily: '"Oswald", sans-serif', color: '#AB47BC', marginTop: 0 }}>ðŸ“š Fuentes y Referencias Académicas</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontFamily: '"Lora", serif', fontSize: '0.9rem', color: '#B0BEC5' }}>
            {BIBLIOGRAPHY.map((ref, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{ref}</li>)}
          </ul>
        </div>
      </div>
      
      <AnimatePresence>
        {activeNode && (
          <ContentPanel 
            key={activeNode.id}
            node={activeNode}
            onClose={handleClose}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode.id) === INFOGRAPHIC_NODES.length - 1}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
