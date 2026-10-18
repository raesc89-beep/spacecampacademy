'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Haab themed) ────────────────────────────
function DecoCalendarRound({ size = 70, color = '#FDD835', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
      {/* Outer gear teeth to represent interlocking time cycles */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <rect key={i} x={30 + 23 * Math.cos(rad) - 2} y={30 + 23 * Math.sin(rad) - 2} width="4" height="4" fill={color} opacity="0.4" transform={`rotate(${a} ${30 + 23 * Math.cos(rad)} ${30 + 23 * Math.sin(rad)})`} />;
      })}
      {/* Inner dots representing days */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 15 * Math.cos(rad)} cy={30 + 15 * Math.sin(rad)} r="1.5" fill={color} opacity="0.5" />;
      })}
    </svg>
  );
}

function DecoMaizPlant({ size = 70, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 55 L30 10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Leaves */}
      <path d="M30 40 Q20 35 15 25 Q22 28 30 35" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 45 Q40 40 45 30 Q38 33 30 40" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 25 Q22 20 18 12 Q25 15 30 20" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 30 Q38 25 42 17 Q35 20 30 25" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Corn cobs */}
      <ellipse cx="24" cy="32" rx="3" ry="6" fill={color} opacity="0.5" transform="rotate(-30 24 32)" />
      <ellipse cx="36" cy="22" rx="3" ry="6" fill={color} opacity="0.5" transform="rotate(30 36 22)" />
    </svg>
  );
}

function DecoSunCycle({ size = 80, color = '#FF8F00', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Horizon line */}
      <line x1="5" y1="30" x2="75" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Sun arcs representing seasonal passage */}
      <path d="M15 30 A 25 25 0 0 1 65 30" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M25 30 A 15 15 0 0 1 55 30" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Sun */}
      <circle cx="40" cy="15" r="5" fill={color} opacity="0.6" />
      {/* Sun rays */}
      <line x1="40" y1="10" x2="40" y2="5" stroke={color} strokeWidth="1.5" />
      <line x1="40" y1="20" x2="40" y2="25" stroke={color} strokeWidth="1.5" />
      <line x1="35" y1="15" x2="30" y2="15" stroke={color} strokeWidth="1.5" />
      <line x1="45" y1="15" x2="50" y2="15" stroke={color} strokeWidth="1.5" />
      <line x1="36" y1="11" x2="32" y2="7" stroke={color} strokeWidth="1.5" />
      <line x1="44" y1="19" x2="48" y2="23" stroke={color} strokeWidth="1.5" />
      <line x1="44" y1="11" x2="48" y2="7" stroke={color} strokeWidth="1.5" />
      <line x1="36" y1="19" x2="32" y2="23" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoGlyphCircle({ size = 60, color = '#009688', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Cartouche outline */}
      <rect x="15" y="10" width="30" height="40" rx="10" fill="none" stroke={color} strokeWidth="2" />
      {/* Inner glyph details (abstracted) */}
      <circle cx="30" cy="22" r="5" fill={color} opacity="0.5" />
      <path d="M20 35 L40 35 L30 45 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="22" cy="15" r="2" fill={color} />
      <circle cx="38" cy="15" r="2" fill={color} />
      {/* Affixes (number bars and dots) */}
      <circle cx="10" cy="20" r="2" fill={color} />
      <circle cx="10" cy="30" r="2" fill={color} />
      <circle cx="10" cy="40" r="2" fill={color} />
      <line x1="6" y1="50" x2="14" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoRainDrop({ size = 70, color = '#42A5F5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Rain cloud */}
      <path d="M20 25 Q15 25 15 20 Q15 15 25 15 Q28 10 35 12 Q42 10 45 18 Q50 18 50 25 Q50 30 40 30 L20 30 Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Rain drops */}
      <path d="M25 35 Q25 40 23 45" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M35 32 Q35 37 33 42" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <path d="M45 35 Q45 40 43 45" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="23" cy="47" r="1.5" fill={color} opacity="0.6" />
      <circle cx="33" cy="44" r="1.5" fill={color} opacity="0.6" />
      <circle cx="43" cy="47" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'haab-estructura': [DecoCalendarRound, DecoGlyphCircle, DecoSunCycle],'dieciocho-meses': [DecoCalendarRound, DecoMaizPlant, DecoGlyphCircle],'wayeb-peligroso': [DecoRainDrop, DecoSunCycle, DecoCalendarRound],'agricola-estacional': [DecoMaizPlant, DecoRainDrop, DecoSunCycle],
  'comparacion-gregoriano': [DecoSunCycle, DecoCalendarRound, DecoGlyphCircle],'glifos-meses': [DecoGlyphCircle, DecoCalendarRound, DecoMaizPlant],'uso-cotidiano': [DecoCalendarRound, DecoMaizPlant, DecoSunCycle],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Coe, M.D. (2011). The Maya, Thames & Hudson (9th edition)',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Rice, P.M. (2007). Maya Calendar Origins: Monuments, Mythistory, and the Materialization of Time, University of Texas Press',
  'Sharer, R.J. & Traxler, L.P. (2006). The Ancient Maya, Stanford University Press',
  'Lounsbury, F.G. (1978). "Maya Numeration, Computation, and Calendrical Astronomy", Dictionary of Scientific Biography, 15'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "haab-estructura",
    diagramImage: '/assets/maya/infographic_m3/diagram_haab-estructura.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Estructura del Haab',
    "bannerImage": "/assets/maya/infographic_m3/banner_calendarios-calculo.webp",
    "title": "Estructura del Haab",
    "color": "#FDD835",
    "btnImage": "/assets/maya/infographic_m3/btn_haab-estructura.jpg",
    "image": "/assets/maya/infographic_m3/hero_haab-estructura.jpg",
    "content": [
      "El Haab' era el calendario solar civil utilizado por los antiguos mayas para organizar las actividades agrícolas, cívicas y tributarias en sus ciudades-estado. A diferencia del calendario sagrado Tzolk'in de carácter adivinatorio, el Haab' medía de forma directa el curso aparente del Sol a lo largo de las cuatro estaciones tropicales. Su estructura matemática básica comprendía exactamente 365 días solares enteros organizados en un esquema regular y predecible que regulaba el ritmo de la vida cotidiana.",
      "Este calendario se dividía en dieciocho periodos regulares de veinte días cada uno, denominados uinalob en las lenguas mayas. La multiplicación de estos 18 meses por los 20 días asignados producía una cuenta regular de 360 días solares, un periodo base conocido astronómicamente como Tun. Para completar la duración del año solar observable en la Tierra, los sabios mayas agregaban un decimonoveno periodo suplementario muy breve compuesto por únicamente cinco días finales conocidos como Wayeb'.",
      "La correlación aritmética de 18 meses de veinte días más los cinco días adicionales del Wayeb' (18 × 20 + 5 = 365) convertía al Haab' en un instrumento calendárico extraordinariamente estable y metódico. Cada día del año poseía un identificador numérico que iba acompañado por el nombre específico del mes correspondiente. De esta manera, el paso del tiempo quedaba registrado sin ambigüedad en los códices pintados de papel amate y en los dinteles de piedra caliza de las acrópolis.",
      "Una característica técnica fascinante del Haab' era su sistema de numeración interna para los días de cada mes. En lugar de comenzar a contar desde el día 1, los mayas iniciaban cada periodo con una fecha denominada Chum, que los epigrafistas modernos traducen como el «asiento» o entronización del mes, funcionando como un día cero de preparación. Tras el asiento de la veintena, los días siguientes se numeraban de manera correlativa del 1 hasta el 19, completando así los veinte días asignados.",
      "Para los agricultores y gobernantes mayas, el Haab' representaba el orden civil inmutable del universo físico. Mientras que el cómputo de la Cuenta Larga registraba la historia dinástica a lo largo de milenios, el Haab' ofrecía el marco temporal indispensable para la supervivencia de las comunidades, indicando cuándo preparar los campos de cultivo, cuándo almacenar el grano cosechado en los chultunes subterráneos y cuándo celebrar las fiestas cívicas dedicadas a los dioses del agua."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La palabra maya «Haab'» no solo significaba «año solar», sino que en sus raíces etimológicas más arcaicas aludía directamente a la lluvia y al agua torrencial. Esto demuestra que para los pueblos mayas el concepto mismo del año estaba ligado de manera inseparable a la llegada periódica de las precipitaciones que revivían la selva tropical."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El concepto mesoamericano del «asiento del mes» (Chum) refleja una concepción filosófica avanzada del tiempo donde el mes entrante toma posesión física del espacio cósmico mientras el mes saliente agota su influencia, funcionando conceptualmente como el número cero dentro del sistema posicional vigesimal maya."
      }
    ],
    "fact": "La estructura matemática del Haab' comprende 18 meses de 20 días que suman 360 días (el Tun), a los que se incorporan 5 días finales denominados Wayeb' para alcanzar un total inmutable de 365 días enteros, un cómputo solar utilizado sin interrupción en Mesoamérica durante más de dos mil años documentados."
  },
  {
    "id": "dieciocho-meses",
    diagramImage: '/assets/maya/infographic_m3/diagram_dieciocho-meses.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Los 18 Meses',
    "bannerImage": "/assets/maya/infographic_m3/banner_legado-matematico.webp",
    "title": "Los 18 Meses",
    "color": "#795548",
    "btnImage": "/assets/maya/infographic_m3/btn_dieciocho-meses.jpg",
    "image": "/assets/maya/infographic_m3/hero_dieciocho-meses.jpg",
    "content": [
      "Los dieciocho meses que integraban el calendario regular del Haab' constituían una verdadera enciclopedia de las estaciones ecológicas y los ciclos productivos de la península de Yucatán y las tierras bajas mayas. Cada mes llevaba un nombre en lengua maya yucateca o cholana que describía con precisión poética las condiciones climáticas reinantes, el comportamiento de los animales selváticos o las labores agrícolas específicas que la comunidad entera debía emprender bajo supervisión comunal.",
      "El primer mes del año recibía el nombre de Pop, vocablo que significa «estera» o «petate», el símbolo por excelencia de la autoridad política, el trono de los gobernantes y el reinicio civil del orden social. A este le seguían meses como Wo (asociado a la rana y a los cantos nocturnos de la lluvia temprana), Sip (dedicado al venado rojo de cola blanca y a los cazadores de la selva) y Sotz' (el mes del murciélago vampiro, cuando las noches se volvían más frescas en la serranía).",
      "A mitad del año se sucedían meses fundamentales para el cultivo de la milpa como Yaxk'in, cuyo significado literal es «Sol nuevo» o «primera fuerza solar», marcando el periodo de calor canicular indispensable para secar los campos desmontados de vegetación. Meses como Mol aludían a la recolección comunitaria, mientras que Ch'en y Yax hacían referencia al agua limpia de los cenotes sagrados, a los primeros brotes verdes del maíz y a la renovación de los árboles frutales en las huertas residenciales.",
      "Los meses finales del ciclo incluían denominaciones como Sak' («lo blanco» o tiempo de maduración de las mazorcas), Keh («ciervo maduro» de cornamenta completa), Mak («cubrir» o clausurar las trampas de caza) y Kumk'u («olla de barro» o grano guardado en los graneros comunales). Cada uno de estos nombres funcionaba como una instrucción colectiva que sincronizaba las actividades de cientos de miles de campesinos dispersos por las selvas de Campeche, Quintana Roo y el Petén guatemalteco.",
      "Durante el transcurso de cada uno de estos dieciocho periodos de veinte días, las ciudades mayas celebraban ceremonias públicas obligatorias en las plazas centrales. En estas festividades se ofrendaban bebidas fermentadas de balché con miel de abeja melipona, resina de copal quemada en sahumadores policromados y danzas multitudinarias con trajes de plumas que agradecían a los protectores del bosque por la abundancia recibida y aseguraban la continuidad biológica de la especie."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los 18 nombres de los meses del Haab' en maya yucateco clásico son: Pop, Wo, Sip, Sotz', Sek, Xul, Yaxk'in, Mol, Ch'en, Yax, Sak', Keh, Mak, K'ank'in, Muwan, Pax, K'ayab y Kumk'u. Cada uno de estos periodos contaba con una deidad tutelar protectora que custodiaba las energías del tiempo durante sus veinte días de vigencia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las investigaciones etnobotánicas contemporáneas en comunidades mayas de Yucatán han demostrado que los nombres tradicionales de los meses del Haab' coinciden con una precisión de más del 90% con las fases fenológicas de floración, germinación y recolección de las especies vegetales nativas de la selva caducifolia peninsular."
      }
    ],
    "fact": "La secuencia continua de los 18 meses del Haab' estructuraba el año solar en 18 intervalos regulares de 20 días, ofreciendo un sistema métrico vigesimal regular que evitaba las irregularidades de meses con 28, 30 o 31 días propias de los calendarios de origen grecorromano, permitiendo una correspondencia algorítmica impecable con los registros astronómicos y los ciclos agrícolas estacionales."
  },
  {
    "id": "wayeb-peligroso",
    diagramImage: '/assets/maya/infographic_m3/diagram_wayeb-peligroso.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Los 5 Días Wayeb',
    "bannerImage": "/assets/maya/infographic_m3/banner_matematica-maya.webp",
    "title": "Los 5 Días Wayeb",
    "color": "#D84315",
    "btnImage": "/assets/maya/infographic_m3/btn_wayeb-peligroso.jpg",
    "image": "/assets/maya/infographic_m3/hero_wayeb-peligroso.jpg",
    "content": [
      "El periodo más singular y temido del calendario solar maya era el Wayeb', un intervalo suplementario de únicamente cinco días que se intercalaba al final de los dieciocho meses regulares para alcanzar los 365 días del año astronómico. En las fuentes coloniales y en las inscripciones epigráficas, estos cinco días eran descritos como «días sin nombre», «días vacíos» o «días nefastos» (uayeyab), un tiempo liminal de grave peligro en el que el orden del cosmos se debilitaba temporalmente.",
      "De acuerdo con la cosmovisión maya, durante el Wayeb' las fronteras protectoras entre el mundo visible terrenal y el inframundo de Xibalbá se volvían delgadas y permeables. Los nueve señores de la muerte y las deidades de las enfermedades podían cruzar libremente hacia la superficie de la Tierra para sembrar caos, pestes y desgracias entre los seres humanos. Para evitar atraer la atención de estos espíritus errantes, la vida cotidiana de las urbes mayas se paralizaba por completo.",
      "Durante estas cinco jornadas de rigurosa abstinencia, los habitantes evitaban salir de sus casas al caer la noche, no realizaban viajes comerciales por los sacbeob ni iniciaban construcciones monumentales de mampostería. Las mujeres no peinaban sus cabellos ni lavaban sus ropas ceremoniales, los campesinos no tocaban la tierra con herramientas agrícolas y los sacerdotes se abstenían de impartir justicia civil o dictar sentencias públicas, concentrándose exclusivamente en rituales de purificación.",
      "En los hogares se apagaban todos los fuegos domésticos de los fogones de piedra caliza, simbolizando la muerte física del año viejo que fenecía. Los utensilios de cocina rajados, las esteras viejas de palma y las cerámicas desgastadas eran rotos intencionalmente y arrojados fuera de los poblados para expulsar la mala fortuna acumulada. Toda la comunidad permanecía en una tensa vigilia espiritual, esperando con ansiedad el nacimiento del nuevo ciclo anual solar.",
      "En la última noche del Wayeb', los sacerdotes ah k'inob subían a las terrazas de las pirámides más altas para escudriñar el firmamento en busca del ascenso de la constelación de las Pléyades o de las estrellas guías del amanecer. En la cima del templo mayor taladraban maderas secas para encender el Fuego Nuevo; de esa llama primordial se encendían antorchas que los corredores distribuían a todos los altares y hogares del reino, marcando la victoria de la vida sobre las tinieblas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas creían que los niños nacidos durante los cinco días del Wayeb' cargaban con un destino personal desafortunado y enfermizo. Para contrarrestar este augurio negativo, los sacerdotes realizaban ceremonias de bautismo expiatorio en cenotes sagrados y les asignaban nombres protectores que apaciguaran la cólera de los dioses del inframundo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Desde una perspectiva antropológica funcionalista, el periodo del Wayeb' operaba como un mecanismo cultural de cohesión y reinicio psicológico anual: al suspender temporalmente las jerarquías sociales y destruir los objetos deteriorados, la comunidad experimentaba una catarsis colectiva que consolidaba la estabilidad social."
      }
    ],
    "fact": "Los 5 días del Wayeb' constituían un periodo liminal de retiro colectivo en el que se apagaban todos los fuegos domésticos y se suspendía la actividad pública en las ciudades mayas, culminando con la ceremonia del Fuego Nuevo en la cumbre de los templos piramidales para inaugurar el día 0 del mes Pop."
  },
  {
    "id": "agricola-estacional",
    diagramImage: '/assets/maya/infographic_m3/diagram_agricola-estacional.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Calendario Agrícola',
    "bannerImage": "/assets/maya/infographic_m3/banner_numeros-gigantes.webp",
    "title": "Calendario Agrícola",
    "color": "#66BB6A",
    "btnImage": "/assets/maya/infographic_m3/btn_agricola-estacional.jpg",
    "image": "/assets/maya/infographic_m3/hero_agricola-estacional.jpg",
    "content": [
      "La función principal y primordial del calendario Haab' era garantizar la supervivencia biológica de las densas poblaciones mayas mediante la coordinación milimétrica del ciclo agrícola del maíz (*Zea mays*), el frijol, la calabaza y el chile. En el entorno geográfico de la península de Yucatán, donde no existen ríos superficiales debido a la permeabilidad de la roca kárstica, el éxito de las cosechas dependía exclusivamente del aprovechamiento óptimo del régimen anual de lluvias estacionales.",
      "El año ecológico maya se divide en dos grandes estaciones climáticas: la temporada seca o de estiaje prolongado (k'in tunil), que se extiende desde noviembre hasta mayo, y la temporada de intensas precipitaciones torrenciales (ch'a chak), que abarca desde junio hasta finales de octubre. El Haab' funcionaba como un reloj astronómico infalible que permitía a los agricultores anticipar el inicio de cada una de estas etapas indispensables para la técnica de la milpa itinerante.",
      "A finales de la estación seca, durante los meses de Yaxk'in y Mol, los campesinos talaban parcelas de selva primaria y dejaban secar la vegetación bajo el sol abrasador del trópico. En una fecha calendárica rigurosamente fijada por los sacerdotes de acuerdo con la posición del Sol cenital en mayo, se procedía a la quema controlada de los troncos secos. Las cenizas ricas en minerales fertilizaban el suelo delgado de caliza justo antes de que las primeras gotas de lluvia cayeran sobre la milpa.",
      "La siembra comunitaria del maíz comenzaba inmediatamente después de las primeras tormentas veraniegas. Los hombres perforaban el suelo húmedo con bastones plantadores puntiagudos de madera llamados coas y depositaban de tres a cinco granos de maíz junto con semillas de frijol negro, mientras las mujeres preparaban ofrendas de atole blanco para los Chaacob, las deidades del trueno y los relámpagos que custodiaban los cuatro puntos cardinales del campo de cultivo.",
      "Durante los meses de Sak' y Keh, cuando las milpas alcanzaban su máxima madurez vegetal, el Haab' señalaba el inicio de la cosecha y el almacenamiento masivo del grano en chultunes, bodegas subterráneas impermeabilizadas con estuco de cal capaces de conservar miles de fanegas de maíz secas y protegidas de insectos durante años, asegurando la alimentación del imperio ante sequías prolongadas."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los mayas practicaban el sistema de cultivo asociado conocido como la milpa tradicional o «las tres hermanas»: el maíz servía de tutor vertical para que el frijol trepara, el frijol fijaba nitrógeno biológico en el suelo arenoso y las anchas hojas de la calabaza cubrían la tierra reteniendo la humedad y evitando la erosión por las lluvias."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Estudios paleoclimáticos basados en núcleos sedimentarios de lagos de Yucatán y estalagmitas de cuevas han demostrado que la gran sincronización del Haab' permitió a los mayas maximizar la producción de maíz durante siglos, pero los ciclos severos de megasequías plurianuales entre los años 800 y 1000 d.C. sobrepasaron la capacidad del calendario."
      }
    ],
    "fact": "El calendario Haab' sincronizaba el ciclo de roza, tumba y quema de la milpa en la selva peninsular con el paso cenital del Sol a finales de mayo, permitiendo a millones de campesinos mayas sembrar en el día exacto de las primeras lluvias tropicales para evitar que las semillas de maíz se pudrieran o secaran."
  },
  {
    "id": "comparacion-gregoriano",
    diagramImage: '/assets/maya/infographic_m3/diagram_comparacion-gregoriano.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Comparación con el Gregoriano',
    "bannerImage": "/assets/maya/infographic_m3/banner_paralelo-india.webp",
    "title": "Comparación con el Gregoriano",
    "color": "#42A5F5",
    "btnImage": "/assets/maya/infographic_m3/btn_comparacion-gregoriano.jpg",
    "image": "/assets/maya/infographic_m3/hero_comparacion-gregoriano.jpg",
    "content": [
      "Al comparar el calendario solar maya Haab' con los sistemas calendáricos del Viejo Mundo, como el calendario juliano romano o el moderno calendario gregoriano promulgado por el papa Gregorio XIII en 1582, se aprecian notables diferencias conceptuales y similitudes de precisión cuantitativa. Mientras que el calendario gregoriano recurre a la inserción periódica de un día bisiesto cada cuatro años para corregir el desfase del año solar trópico, el Haab' mantenía una cuenta inalterable de 365 días.",
      "En la física astronómica real, la duración del año trópico o estacional de la Tierra no es de 365 días exactos, sino de aproximadamente 365.242198 días solares medios (unos 365 días, 5 horas, 48 minutos y 46 segundos). Esta fracción decimal acumulada de casi un cuarto de día cada año provoca que un calendario rígido de 365 días completos sufra una deriva de un día cada cuatro años respecto a la posición verdadera de los solsticios y equinoccios en el horizonte celeste.",
      "Los sabios astrónomos mayas conocían perfectamente esta deriva estacional del año solar gracias a siglos continuos de mediciones en observatorios como El Caracol y los Grupos E. Sin embargo, tomaron la decisión consciente de no intercalar días bisiestos dentro del cuerpo regular del Haab'. Para la mentalidad mesoamericana, romper la sucesión continua de los días mediante días añadidos de forma artificial habría destruido los engranajes sagrados de la Rueda Calendárica de 52 años.",
      "En su lugar, los astrónomos resolvieron el problema de la deriva del año mediante sofisticadas tablas aritméticas de corrección suplementarias calculadas en códices y estelas. En la acrópolis de Copán y en los templos de Palenque, los epigrafistas han descubierto inscripciones glíficas donde los sacerdotes registraban la diferencia matemática acumulada entre el año civil de 365 días y el año trópico real, calculando factores de ajuste con una precisión de segundos de arco.",
      "El resultado de esta metodología matemática abstracta fue asombroso: mientras que el calendario juliano empleado en Europa hasta el siglo XVI acumulaba un error de 10 días completos que obligó a una traumática reforma eclesiástica internacional, los cálculos de corrección solar maya poseían una exactitud que igualaba y en varios aspectos superaba la precisión del calendario gregoriano actual, todo ello sin contar con relojes mecánicos de péndulo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Cuando en 1582 el papa Gregorio XIII implantó el calendario gregoriano en Europa para corregir el desajuste solar acumulado por el viejo calendario de Julio César, la Iglesia católica tuvo que eliminar diez días de golpe de los registros oficiales: la gente se acostó el 4 de octubre y despertó al día siguiente como 15 de octubre."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El cálculo maya del año solar documentado en las inscripciones monumentales del periodo Clásico Tardío de Copán arrojaba un valor estimado de 365.2420 días por año trópico, un valor sorprendentemente cercano al estándar astronómico moderno de 365.2422 días y superior al valor del calendario juliano europeo de 365.2500 días."
      }
    ],
    "fact": "Los astrónomos mayas conocían la duración fraccionaria del año trópico de 365.2422 días pero decidieron mantener el Haab' en 365 días enteros exactos para no alterar la conmensurabilidad de la Rueda Calendárica, registrando los desfases mediante fórmulas suplementarias en estelas de Copán y Palenque."
  },
  {
    "id": "glifos-meses",
    diagramImage: '/assets/maya/infographic_m3/diagram_glifos-meses.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Los Glifos',
    "bannerImage": "/assets/maya/infographic_m3/banner_sistema-cero.webp",
    "title": "Los Glifos",
    "color": "#009688",
    "btnImage": "/assets/maya/infographic_m3/btn_glifos-meses.jpg",
    "image": "/assets/maya/infographic_m3/hero_glifos-meses.jpg",
    "content": [
      "El sistema de escritura jeroglífica maya es una de las creaciones intelectuales más deslumbrantes de la humanidad precolombina. Cada uno de los dieciocho meses del Haab' y el periodo Wayeb' poseían un glifo distintivo tallado en bajorrelieve en estelas de piedra caliza, dinteles de madera de chicozapote, murales polícromos y códices de papel amate. Estos signos gráficos no eran meros pictogramas simplificados, sino ideogramas y signos fonéticos altamente sofisticados.",
      "Los glifos del Haab' se inscribían habitualmente dentro de cartuchos cuadrangulares con bordes redondeados. En la epigrafía maya clásica existían dos estilos principales para representar estos signos: la variante geométrica o abstracta, utilizada comúnmente en textos rápidos o de menor tamaño, y la variante de cabeza antropomorfa o zoomorfa, empleada en los grandes monumentos dinásticos oficiales erigidos por los reyes en las plazas ceremoniales.",
      "Por ejemplo, el glifo del mes Pop incorporaba un diseño entrelazado que imitaba el tejido de fibras de palma de las esteras reales. El glifo del mes Sotz' representaba el rostro de perfil de un murciélago selvático con su distintiva hoja nasal puntiaguda y orejas ensanchadas. El glifo del mes Yaxk'in fusionaba el símbolo solar Kin (una flor de cuatro pétalos estilizada) con el prefijo Yax (que simboliza lo nuevo, lo verde y lo precioso), expresando visualmente el concepto del Sol regenerador.",
      "Para indicar la fecha exacta, los escribas anteponían al glifo del mes un prefijo numérico. Si se trataba del día cero o inauguración de la veintena, añadían el glifo Chum («asiento»), consistente en un signo con forma de flor estilizada o media luna descansando sobre una base curva. Del día 1 al 19 utilizaban la elegante notación de puntos y barras: un punto redondo representaba una unidad, mientras que una barra horizontal gruesa equivalía al valor de cinco unidades enteras.",
      "El desciframiento de estos glifos calendáricos por pioneros de la epigrafía como Heinrich Berlin, Tatiana Proskouriakoff y Yuri Knorozov a mediados del siglo XX permitió a los arqueólogos leer con precisión matemática absoluta las fechas cinceladas en miles de monumentos del mundo maya, devolviendo la voz histórica y el orden cronológico a una civilización cuya memoria había permanecido sellada durante siglos."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los escribas mayas de la corte real (llamados ah ts'ib) gozaban de tanta libertad artística que rara vez labraban dos glifos del mismo mes de manera idéntica. Competían entre sí para añadir adornos caligráficos, volutas de humo y variantes de cabeza de dioses que demostraran su maestría poética y estética sobre la piedra."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El lingüista ruso Yuri Knorozov demostró en la década de 1950 que los jeroglíficos mayas no eran ideogramas puros ni símbolos alfabéticos occidentales, sino un sistema logosilábico mixto donde signos que representaban palabras completas se combinaban libremente con signos que representaban sílabas fonéticas individuales (CV)."
      }
    ],
    "fact": "Cada mes del Haab' contaba con dos estilos glíficos oficiales: una variante geométrica compuesta por signos fonéticos y una variante de cabeza esculpida con retratos de deidades zoomorfas, combinada con el glifo Chum para el día de asiento o barras y puntos para los números del 1 al 19, evidenciando una sofisticada duplicidad plástica y epigráfica única en la escritura monumental de Mesoamérica."
  },
  {
    "id": "uso-cotidiano",
    diagramImage: '/assets/maya/infographic_m3/diagram_uso-cotidiano.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Uso Cotidiano',
    "bannerImage": "/assets/maya/infographic_m3/banner_vigesimal.webp",
    "title": "Uso Cotidiano",
    "color": "#FF8F00",
    "btnImage": "/assets/maya/infographic_m3/btn_uso-cotidiano.jpg",
    "image": "/assets/maya/infographic_m3/hero_uso-cotidiano.jpg",
    "content": [
      "En la vida cotidiana de las urbes y aldeas mayas, el calendario Haab' constituía el eje organizador de todas las relaciones cívicas, económicas y administrativas. Lejos de ser un saber esotérico restringido únicamente a los sacerdotes astrónomos de los templos altos, los ciclos de veinte días del Haab' eran conocidos y respetados por la totalidad de la población, desde los nobles linajes mercaderes hasta los alfareros y agricultores más humildes.",
      "El pago de los tributos estatales al soberano o Halach Uinic estaba estrictamente pautado por las fechas del Haab'. Cada determinado número de meses o al finalizar ciclos estacionales específicos, las aldeas tributarias debían entregar en la corte mantas tejidas de algodón fino, sartales de cuentas de jade verde, sacos de granos de cacao, plumas de quetzal, miel de abeja y tinajas de sal marina extraída de las salineras costeras de la península.",
      "Los mercados comunales o tianguis periódicos celebrados en las explanadas cívicas también seguían el ritmo regular del calendario solar. Los mercaderes itinerantes organizaban sus caravanas de cargadores a través de los caminos sacbeob para coincidir con las ferias cívicas de los asientos de mes, momentos en que miles de familias acudían a las ciudades para participar en ceremonias religiosas e intercambiar vasijas de cerámica, obsidiana volcánica y herramientas de pedernal.",
      "En el ámbito familiar, el Haab' regulaba los acuerdos de matrimonio entre linajes, los contratos de trabajo comunal para la limpieza de aguadas y cenotes, y la construcción cooperativa de viviendas de paja y bajareque. Al nacer un niño, los ancianos de la familia memorizaban de inmediato la fecha del Haab' junto con la del calendario ritual Tzolk'in, fijando de por vida las responsabilidades tributarias y los deberes cívicos que el nuevo ciudadano asumiría con su comunidad.",
      "De este modo, el calendario solar civil integraba la multiplicidad de vidas humanas dentro de una maquinaria cronológica majestuosa. Gracias a la solidez del Haab', la sociedad maya logró mantener su continuidad cultural, agrícola y comercial a través de los siglos, transformando la marcha física del Sol en un pacto civil de cooperación y orden que permitió el florecimiento de una de las civilizaciones más brillantes del mundo antiguo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los granos de cacao no solo se utilizaban para preparar la bebida espumosa y amarga reservada para la nobleza maya, sino que funcionaban como la moneda de cambio universal en los mercados organizados según el Haab': una semilla compraba un aguacate, mientras que por cien semillas se podía adquirir un conejo de monte recién cazado."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Estudios etnoarqueológicos en las tierras altas de Guatemala han revelado que varias comunidades mayas contemporáneas de etnias k'iche', mam e ixil continúan utilizando versiones orales tradicionales del calendario solar de 365 días en combinación con el calendario sagrado para guiar sus siembras comunales de maíz y frijol."
      }
    ],
    "fact": "El Haab' regulaba la recaudación regular de tributos en especie (cacao, algodón, sal y obsidiana), el cronograma de ferias de intercambio comercial a lo largo de los sacbeob y los censos comunales en las ciudades-estado mayas, operando como el marco legal y administrativo de la civilización durante más de dos milenios."
  }
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
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
      hue: Math.random() > 0.5 ? '253,216,53' : '102,187,106', // gold or green
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

// ─── Time Travel Header ──────────────────────────────────────────────────────
function TimeTravelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(253,216,53,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FDD835','#795548','#D84315','#66BB6A','#42A5F5','#009688','#FF8F00'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central clock icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FDD835" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FDD835" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FDD835" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#FDD835" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(253,216,53,0.2)" />
            <stop offset="50%" stopColor="rgba(253,216,53,0.9)" />
            <stop offset="100%" stopColor="rgba(253,216,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FDD835" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL CALENDARIO HAAB</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(253,216,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL CICLO SOLAR DE 365 DÃAS</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching M9 Dendera style) ─────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(253,216,53,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
      >
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
          layoutId="activeDotMayaM3"
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
        background: 'rgba(20, 15, 10, 0.95)',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#1a1005',
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

        {/* ─── Expandable Interactive Sections ─── */}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(253,216,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#FDD835', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #FDD835, #66BB6A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(253,216,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#FDD835', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,15,10,0.85) 0%, rgba(25,20,15,0.8) 40%, rgba(20,15,10,0.88) 100%), ',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(253,216,53,0.12)',
      boxShadow: '0 0 60px rgba(20,15,10,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <TemporalField />

      <TimeTravelHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(253,216,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(253,216,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(253,216,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#FDD835', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🔬  ¡Has dominado los secretos del Calendario Haab!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Astrónomo Maya
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
          🔬 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>"Â¢ {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Ã‚§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
