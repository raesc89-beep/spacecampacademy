'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya E-Group themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoEGroup({ size = 70, color = '#A1887F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="25" width="15" height="15" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <rect x="40" y="15" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="40" y="30" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="40" y="45" width="10" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="25" y1="32.5" x2="40" y2="20" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <line x1="25" y1="32.5" x2="40" y2="35" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <line x1="25" y1="32.5" x2="40" y2="50" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    </svg>
  );
}

function DecoSunrise({ size = 70, color = '#FF8F00', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 40 Q 30 20 50 40" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="35" r="8" fill={color} opacity="0.6" />
      {[0, 30, 60, 90, 120, 150, 180].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 12 * Math.cos(rad)} y1={35 - 12 * Math.sin(rad)} x2={30 + 18 * Math.cos(rad)} y2={35 - 18 * Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.7" />;
      })}
      <line x1="5" y1="40" x2="55" y2="40" stroke={color} strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function DecoThreeTemples({ size = 70, color = '#5D4037', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 15 45 L 20 30 L 25 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 28 45 L 33 25 L 38 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 41 45 L 46 30 L 51 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <line x1="10" y1="45" x2="55" y2="45" stroke={color} strokeWidth="2" />
      <circle cx="20" cy="25" r="2" fill={color} />
      <circle cx="33" cy="20" r="2" fill={color} />
      <circle cx="46" cy="25" r="2" fill={color} />
    </svg>
  );
}

function DecoPyramid({ size = 70, color = '#2E7D32', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 30 15 L 10 45 L 50 45 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 25 22 L 35 22" stroke={color} strokeWidth="1.5" />
      <path d="M 20 30 L 40 30" stroke={color} strokeWidth="1.5" />
      <path d="M 15 37 L 45 37" stroke={color} strokeWidth="1.5" />
      <rect x="27" y="10" width="6" height="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoCompass({ size = 70, color = '#039BE5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
      <path d="M 30 12 L 34 30 L 30 48 L 26 30 Z" fill={color} opacity="0.5" />
      <path d="M 12 30 L 30 26 L 48 30 L 30 34 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="3" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'uaxactun-sitio': [DecoPyramid, DecoCompass, DecoEGroup],
  'grupo-e-original': [DecoEGroup, DecoSunrise, DecoThreeTemples],'tres-templos': [DecoThreeTemples, DecoSunrise, DecoPyramid],'funcionamiento-solar': [DecoSunrise, DecoCompass, DecoEGroup],
  'grupos-e-mundo-maya': [DecoCompass, DecoPyramid, DecoThreeTemples],'ceibal-mas-antiguo': [DecoPyramid, DecoEGroup, DecoSunrise],
  'legado-arquitectonico': [DecoThreeTemples, DecoCompass, DecoEGroup], }; const BIBLIOGRAPHY = ['Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Chase, A.F. & Chase, D.Z. (1995). "External Impetus, Internal Synthesis, and Standardization: E Group Assemblages", Acta Mesoamericana, 8',
  'Inomata, T. et al. (2013). "Early Ceremonial Constructions at Ceibal, Guatemala", Science, 340',
  'Aimers, J.J. & Rice, P.M. (2006). "Astronomy, Ritual, and the Interpretation of Maya E-Group Architectural Assemblages", Ancient Mesoamerica, 17',
  'Å prajc, I. (2001). Orientaciones Astronómicas en la Arquitectura Prehispánica, INAH',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "uaxactun-sitio",
    "bannerImage": "/assets/maya/infographic_m13/banner_uaxactun-sitio.webp",
    "title": "El Sitio: Uaxactún",
    "color": "#A1887F",
    "btnImage": "/assets/maya/infographic_m13/btn_uaxactun-sitio.jpg",
    "image": "/assets/maya/infographic_m13/hero_uaxactun-sitio.jpg",
    "content": [
      "Situado en el corazón de la densa selva del Petén guatemalteco, a escasos veinte kilómetros al norte de la monumental metrópoli de Tikal, el yacimiento arqueológico de Uaxactún ocupa un lugar de honor indiscutible en la historia de la arqueología maya. En las inscripciones jeroglíficas del periodo Clásico, la urbe era conocida bajo el nombre sagrado de Siaan K'aan, que traduce con elocuencia poética «Nacida del Cielo».",
      "El nombre moderno de Uaxactún («Ocho Piedras») le fue asignado en 1916 por el insigne arqueólogo estadounidense Sylvanus Morley. Al explorar las ruinas cubiertas por la vegetación tropical, Morley descubrió en la Estela 9 una inscripción grabada con la fecha de Cuenta Larga 8.14.10.13.15, correspondiente al año 328 d.C., la cual representaba en aquel momento el registro calendárico del Baktún 8 más antiguo jamás descubierto en las tierras bajas.",
      "Las investigaciones pioneras realizadas entre 1926 y 1937 por la Institución Carnegie de Washington, bajo la dirección de Oliver Ricketson y Frans Blom, sentaron las bases metodológicas de la arqueología científica moderna en la región. Las meticulosas excavaciones estratigráficas permitieron establecer la primera secuencia cerámica completa del área maya, dividida en las fases Mamom, Chicanel, Tzakol y Tepeu, aún vigente hoy en día.",
      "Durante el periodo Preclásico Tardío y el Clásico Temprano, Uaxactún floreció como una potencia política independiente que dominaba las rutas comerciales entre las cuencas de El Mirador y el río Usumacinta. Sin embargo, en el año 378 d.C., la ciudad fue derrotada militarmente en una célebre batalla decisiva registrada en las estelas por el general teotihuacano Siyaj K'ak' («Nace el Fuego»), integrándose a la esfera de influencia de Tikal.",
      "A pesar de su posterior subordinación política, Uaxactún mantuvo intacto su prestigio como uno de los centros de saber astronómico y arquitectónico más venerados del mundo maya. Sus templos y observatorios sirvieron como modelo prototípico para decenas de metrópolis mesoamericanas que replicaron durante más de un milenio la disposición espacial de sus plazas para conmemorar los ciclos perpetuos del astro solar."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el Grupo E de Uaxactún, los arqueólogos de la Carnegie descubrieron la célebre pirámide E-VII Sub oculta bajo una estructura tardía en ruinas. Al retirar el escombro exterior, apareció una joya intacta del Preclásico de color blanco inmaculado, decorada con dieciocho colosales mascarones de estuco que representan al dios solar y a la serpiente celestial."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La secuencia cerámica de Uaxactún fue la primera en utilizar análisis granulométricos y tipología de pastas de arcilla para fechar estratos arqueológicos en Mesoamérica. Las arcillas de la fase Chicanel (300 a.C. - 250 d.C.) contienen inclusiones volcánicas distintivas que indican un intercambio comercial activo con las tierras altas de Guatemala."
      }
    ],
    "fact": "La Estela 9 de Uaxactún, fechada el 9 de abril del 328 d.C., fue el primer monumento maya en confirmar que los antiguos pobladores contaban los días transcurridos desde una fecha cero primordial situada en el 3114 a.C. Este hallazgo revolucionó la cronología americana al probar la existencia de registros históricos exactos de más de mil setecientos años de antigüedad."
  },
  {
    "id": "grupo-e-original",
    "bannerImage": "/assets/maya/infographic_m13/banner_grupo-e-original.webp",
    "title": "El Grupo E Original",
    "color": "#2E7D32",
    "btnImage": "/assets/maya/infographic_m13/btn_grupo-e-original.jpg",
    "image": "/assets/maya/infographic_m13/hero_grupo-e-original.jpg",
    "content": [
      "Hacia el año 1924, el explorador Oliver Ricketson identificó en el sector oriental de Uaxactún un conjunto arquitectónico cuya singular disposición espacial no se parecía a los recintos residenciales o palaciegos convencionales. Denominado técnicamente como Grupo E, este complejo cívico-ceremonial demostró ser el primer observatorio solar institucionalizado documentado y analizado científicamente en toda la América precolombina.",
      "El conjunto arquitectónico está estructurado en torno a una espaciosa plaza nivelada de caliza orientada según los ejes cardinales. En el costado occidental se erige una pirámide radial aislada (conocida como la Estructura E-VII), provista de escalinatas en sus cuatro fachadas. En el costado este de la plaza, directamente frente a la pirámide, se levanta una plataforma alargada de norte a sur que sostiene tres pequeños templos alineados.",
      "La genialidad de este complejo radica en su geometría astronómica interactiva. Si un sacerdote o agrimensor se sitúa en el punto central de la escalinata superior de la pirámide occidental y dirige su mirada hacia la plataforma oriental, los tres templos actúan como un gigantesco horizonte artificial calibrado para enmarcar las posiciones extremas y medias del disco solar a lo largo de las cuatro estaciones del año.",
      "Este descubrimiento conmocionó al mundo académico de la década de 1920, ya que probó que los constructores mayas del periodo Preclásico (hacia el 300 a.C.) ya poseían conocimientos geométricos y astronómicos extraordinariamente avanzados. Lejos de ser templos construidos al azar, el Grupo E fue planificado y ejecutado como una máquina arquitectónica monumental consagrada a la medición física del tiempo solar.",
      "A raíz de estas investigaciones fundacionales, la disciplina arqueológica adoptó universalmente el término «Grupo E» o «complejo de conmemoración astronómica» para clasificar a cualquier conjunto mesoamericano que reproduzca esta misma configuración espacial bimembre, consolidando a Uaxactún como el punto de referencia tipológico ineludible para el estudio de la arquitectura sagrada en el continente."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Para comprobar el funcionamiento del Grupo E, Oliver Ricketson acampó en la plaza de Uaxactún durante el equinoccio de primavera de 1928. Al amanecer del 21 de marzo, observó cómo el primer rayo de sol emergía exactamente sobre la cúspide del templo central oriental, confirmando de forma irrefutable la teoría del alineamiento solar deliberado."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las excavaciones demostraron que la plataforma oriental del Grupo E fue reconstruida y ampliada al menos cinco veces a lo largo de ocho siglos. En cada remodelación, los arquitectos mayas recalibraron meticulosamente las alturas y vanos de los tres templos para compensar los sutiles cambios en la línea visual provocados por la elevación del suelo de la plaza."
      }
    ],
    "fact": "La pirámide radial E-VII Sub de Uaxactún, sepultada intacta bajo la pirámide posterior E-VII, mide apenas 8 metros de altura pero cuenta con 4 escalinatas cardinales y 18 mascarones de estuco modelado de más de dos metros de ancho cada uno. Es una de las obras cumbres del arte preclásico maya mejor preservadas que han sobrevivido hasta nuestros días."
  },
  {
    "id": "tres-templos",
    "bannerImage": "/assets/maya/infographic_m13/banner_tres-templos.webp",
    "title": "Los Tres Templos",
    "color": "#F8BBD0",
    "btnImage": "/assets/maya/infographic_m13/btn_tres-templos.jpg",
    "image": "/assets/maya/infographic_m13/hero_tres-templos.jpg",
    "content": [
      "La plataforma oriental del Grupo E de Uaxactún sostiene sobre su terraza superior tres templos independientes dispuestos en una estricta hilera continua de norte a sur: la Estructura E-I en el extremo septentrional, la Estructura E-II en la posición central y la Estructura E-III en el extremo meridional. Cada uno de estos santuarios de piedra caliza fue diseñado con dimensiones y orientaciones específicas para cumplir un rol astronómico único.",
      "El Templo Central (E-II) es el edificio más prominente y elevado de la tríada. Levantado sobre el eje este-oeste exacto que corta la pirámide occidental, su vano de acceso principal mira hacia el poniente, recibiendo de frente la mirada del observador situado en la pirámide. Este templo estaba consagrado a la conmemoración de los equinoccios de primavera y otoño, momentos en que el día y la noche alcanzan idéntica duración de doce horas.",
      "El Templo Norte (E-I) se ubica en el límite septentrional de la plataforma corrida. Su función geométrica era señalar el punto extremo hacia el cual se desplaza la salida del Sol en el horizonte durante el solsticio de verano, cuando el astro rey alcanza su declinación boreal máxima (+23.5°). Este evento marcaba el día más largo del año y el apogeo de la temporada de lluvias torrenciales indispensable para los cultivos selváticos.",
      "En contraposición simétrica, el Templo Sur (E-III) se erige en el extremo meridional de la terraza para marcar el punto de salida solar durante el solsticio de invierno, momento en que el Sol alcanza su declinación austral máxima (-23.5°). Esta fecha señalaba la noche más larga del año, el inicio de las mañanas frías y brumosas en el Petén y el descenso paulatino del nivel de las aguas en los bajos y lagunas estacionales.",
      "Los tres templos funcionaban así como los postes indicadores de una escala graduada monumental. Al contemplar la procesión anual del Sol saliendo sucesivamente sobre el templo norte, el templo central y el templo sur, los sacerdotes y el pueblo congregado en la plaza leían en el perfil arquitectónico el avance inexorable de las estaciones, transformando la piedra labrada en un calendario solar viviente y comprensible para todos."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Bajo los pisos de estuco de los tres templos del Grupo E, los arqueólogos descubrieron ricas ofrendas votivas depositadas durante su consagración en el Preclásico. Entre ellas destacaban vasijas polícromas, navajillas de obsidiana verde de Pachuca y placas de jade pulido, colocadas para sacralizar los puntos solsticiales y equinocciales del horizonte."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La distancia angular entre el solsticio de verano y el solsticio de invierno vista desde la latitud de Uaxactún (17° 23' N) es de aproximadamente 49 grados sobre el horizonte oriental. Los constructores mayas calcularon la longitud total de la plataforma oriental (unos 70 metros) para que los templos norte y sur coincidieran con esta apertura angular exacta."
      }
    ],
    "fact": "La alineación visual de los tres templos de Uaxactún no solo servía para el Sol, sino que permitía registrar ortos de estrellas brillantes. Durante el periodo Clásico Temprano, la estrella Sirio (la más luminosa del firmamento) y las estrellas del cinturón de Orión salían en alineación visual directa con el Templo Sur (E-III) durante las noches de otoño e invierno."
  },
  {
    "id": "funcionamiento-solar",
    "bannerImage": "/assets/maya/infographic_m13/banner_funcionamiento-solar.webp",
    "title": "Cómo Funciona",
    "color": "#FF8F00",
    "btnImage": "/assets/maya/infographic_m13/btn_funcionamiento-solar.jpg",
    "image": "/assets/maya/infographic_m13/hero_funcionamiento-solar.jpg",
    "content": [
      "El principio operativo del observatorio solar del Grupo E combina una elegante simplicidad geométrica con una rigurosa comprensión de la mecánica celeste heliocéntrica. Desde la perspectiva de un observador terrenal, el punto por donde sale el Sol en el horizonte oriental no es estático, sino que oscila continuamente hacia el norte y hacia el sur a lo largo de un ciclo perpetuo de 365 días impulsado por la inclinación axial de la Tierra.",
      "Para utilizar el dispositivo, el astrónomo maya se colocaba de pie sobre la plataforma superior de la pirámide radial E-VII al amanecer. Utilizando un gnomón vertical o una mirilla de madera fija en el suelo como punto de mira cero, dirigía la vista hacia el horizonte oriental donde se recortaban las siluetas de los tres templos alineados sobre la plataforma, esperando el primer destello de luz solar que quebraba la penumbra matinal.",
      "Durante el equinoccio de primavera (alrededor del 21 de marzo), el disco solar emergía exactamente detrás de la cúspide del Templo Central (E-II). Con el paso de las semanas, la salida del Sol se desplazaba día tras día hacia la izquierda (norte), alcanzando la esquina exterior del Templo Norte (E-I) el 21 de junio en el solsticio de verano, momento en que el astro frenaba su avance aparente para iniciar su viaje de regreso al sur.",
      "Tres meses después, hacia el 22 de septiembre en el equinoccio de otoño, el Sol salía nuevamente sobre el Templo Central. Continuaba su marcha hacia la derecha (sur) hasta posarse el 21 de diciembre sobre la cumbre del Templo Sur (E-III) en el solsticio de invierno, donde se detenía una vez más antes de emprender el retorno hacia el norte, completando un ciclo solar trópico perfecto que reiniciaba la cuenta calendárica agrícola.",
      "Además de marcar las cuatro fechas cardinales del año astronómico, el intervalo de tiempo que tardaba el Sol en viajar de un templo al otro permitía dividir el año en periodos rituales de 46, 65 y 91 días. Esta división matemática interna sincronizaba los cómputos de la Rueda Calendárica de 52 años y del almanaque sagrado Tzolk'in de 260 días, transformando al Grupo E en un gigantesco ordenador astronómico analógico a cielo abierto."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La palabra «solsticio» proviene del latín solstitium, que significa «Sol detenido». En los días previos y posteriores al 21 de junio y al 21 de diciembre, el punto de salida del Sol parece quedarse completamente inmóvil sobre los templos norte y sur de Uaxactún durante casi una semana, un fenómeno que los sacerdotes mayas vigilaban con suma devoción."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La oscilación estacional del punto de salida solar se debe a la inclinación del eje de rotación de la Tierra, que forma un ángulo de 23.44 grados respecto al plano de su órbita alrededor del Sol. Sin esta inclinación axial planetaria, no existirían las cuatro estaciones del año y el Sol saldría siempre por el mismo punto del horizonte los 365 días del año."
      }
    ],
    "fact": "Aunque las mediciones arqueoastronómicas modernas indican que en Uaxactún la alineación de los equinoccios presenta un ligero desvío de unos pocos días respecto al equinoccio astronómico verdadero debido a la refracción atmosférica sobre la selva, el complejo funcionaba con perfecta efectividad como un calendario observacional práctico para la agricultura comunal."
  },
  {
    "id": "grupos-e-mundo-maya",
    "bannerImage": "/assets/maya/infographic_m13/banner_grupos-e-mundo-maya.webp",
    "title": "Grupos E en el Mundo Maya",
    "color": "#039BE5",
    "btnImage": "/assets/maya/infographic_m13/btn_grupos-e-mundo-maya.jpg",
    "image": "/assets/maya/infographic_m13/hero_grupos-e-mundo-maya.jpg",
    "content": [
      "Tras el descubrimiento y descripción del Grupo E de Uaxactún, las exploraciones arqueológicas en Mesoamérica comenzaron a identificar complejos arquitectónicos con patrones espaciales prácticamente idénticos en cientos de asentamientos. Lejos de constituir una rareza local aislada, los complejos de conmemoración astronómica tipo Grupo E representaron el modelo canónico de planificación cívica en las tierras bajas durante más de mil años.",
      "Hasta la fecha, los arqueólogos han documentado más de 150 complejos de tipo Grupo E dispersos por Guatemala, Belice, México y Honduras. Entre los más colosales y destacados figuran la Plaza del Mundo Perdido en Tikal, el Grupo E de Calakmul en Campeche, el complejo de Caracol en Belice, y los conjuntos monumentales de Nakbé, San Bartolo, El Zotz y Yaxhá, demostrando la universalidad de este concepto arquitectónico en toda la civilización.",
      "En ciudades de gran jerarquía como Tikal, el complejo del Mundo Perdido alcanzó proporciones monumentales gigantescas. Su pirámide radial principal (Estructura 5C-54) se eleva a más de treinta metros de altura y domina una plataforma oriental de más de cien metros de longitud, funcionando como el gran teatro ceremonial y astronómico donde la dinastía reinante convocaba a multitudes para presenciar los milagros solares del calendario.",
      "Investigaciones recientes han revelado que muchos de estos Grupos E evolucionaron con los siglos: aunque comenzaron en el Preclásico como observatorios solares funcionales de rigurosa precisión geométrica, durante el Clásico Tardío adquirieron un valor predominantemente simbólico y conmemorativo, funcionando como templos dinásticos donde se erigían estelas reales para celebrar los finales de período calendárico de 20 años (K'atunes).",
      "La dispersión geográfica uniforme de los Grupos E confirma la existencia de profundas redes de intercambio cultural, religioso y científico que unificaban a los pueblos mayas a pesar de sus rivalidades militares. Construir un Grupo E en el corazón de una ciudad proclamaba ante los vecinos que sus gobernantes poseían la legitimidad cósmica y el conocimiento sagrado para armonizar a su comunidad con las leyes eternas del universo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el sitio arqueológico de San Bartolo, Guatemala, las excavaciones dentro de un complejo tipo Grupo E sacaron a la luz en 2001 los murales pintados más antiguos del mundo maya (fechados hacia el 100 a.C.). Las pinturas murales representan al Dios del Maíz y escenas de la creación del cosmos, confirmando la íntima unión entre mitología y arquitectura solar."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El análisis espacial mediante Sistemas de Información Geográfica (SIG) revela que la orientación de la mayoría de los Grupos E de las tierras bajas mayas presenta una ligera desviación de entre 1° y 4° al norte del este verdadero. Esta inclinación intencional permitía sincronizar las líneas de mira con fechas específicas del calendario agrícola de 260 días."
      }
    ],
    "fact": "El complejo del Mundo Perdido en Tikal es el Grupo E de mayor volumen constructivo conocido en Mesoamérica. Su plataforma oriental y pirámide radial superaron las seis fases de remodelación a lo largo de más de mil doscientos años ininterrumpidos (desde el 600 a.C. hasta el 850 d.C.), convirtiéndose en el núcleo ceremonial más antiguo de la gran metrópoli guatemalteca."
  },
  {
    "id": "ceibal-mas-antiguo",
    "bannerImage": "/assets/maya/infographic_m13/banner_ceibal-mas-antiguo.webp",
    "title": "Ceibal: El Más Antiguo",
    "color": "#5D4037",
    "btnImage": "/assets/maya/infographic_m13/btn_ceibal-mas-antiguo.jpg",
    "image": "/assets/maya/infographic_m13/hero_ceibal-mas-antiguo.jpg",
    "content": [
      "Durante casi un siglo, la comunidad científica asumió que los complejos de conmemoración astronómica tipo Grupo E se habían originado en el Petén central en torno al 300 a.C., durante el auge del periodo Preclásico Tardío. Sin embargo, los descubrimientos revolucionarios efectuados en el sitio arqueológico de Ceibal (Seibal), a orillas del río La Pasión en Guatemala, transformaron por completo los paradigmas cronológicos mesoamericanos.",
      "A partir del año 2005, el Proyecto Arqueológico Ceibal-Petexbatún, dirigido por los arqueólogos Takeshi Inomata y Daniela Triadan, llevó a cabo excavaciones estratigráficas de alta precisión en la Plaza Central del Grupo A de Ceibal. Empleando pozos profundos y decenas de dataciones por radiocarbono de espectrometría de masas con aceleradores (AMS), el equipo descubrió los cimientos de un complejo Grupo E de antigüedad insospechada.",
      "Las dataciones científicas concluyeron de forma contundente que la primera versión del Grupo E de Ceibal fue construida alrededor del año 950 a 1000 a.C., en el periodo Preclásico Medio. Este resultado situó el origen de los complejos astronómicos mayas casi siete siglos antes de lo estimado tradicionalmente, convirtiendo al conjunto de Ceibal en el complejo ceremonial planificado más antiguo documentado en todas las tierras bajas mayas.",
      "Este hallazgo arrojó luz decisiva sobre el enigmático proceso de transición social entre las sociedades de cazadores-recolectores móviles y los primeros asentamientos aldeanos sedentarios. Los datos revelaron que las poblaciones preclásicas no comenzaron viviendo en aldeas agrícolas permanentes para luego edificar templos, sino que primero se congregaron como comunidad para construir este observatorio ritual colectivo conmemorativo.",
      "Asimismo, el descubrimiento de Ceibal reabrió el debate sobre las relaciones tempranas entre la civilización maya y la cultura olmeca de la costa del Golfo de México. El Grupo E de Ceibal comparte patrones espaciales y ejes astronómicos con el centro ceremonial olmeca de La Venta, sugiriendo un horizonte de innovación intercultural compartida donde diversos pueblos mesoamericanos colaboraron en la creación del calendario sagrado."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el eje central del Grupo E de Ceibal, los arqueólogos desenterraron una serie de ofrendas ceremoniales que datan del 900 a.C., compuestas por hermosas hachas pulidas de jadeíta verde dispuestas en forma cruciforme que apuntan hacia los cuatro puntos cardinales, confirmando que la consagración astronómica de los rumbos del mundo comenzó hace tres mil años."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La técnica de datación por radiocarbono con espectrometría de masas con aceleradores (AMS) permite fechar fragmentos microscópicos de carbón vegetal con un margen de error menor a veinte años. En Ceibal se procesaron más de 150 muestras de carbón extraídas de los pisos de arcilla más profundos, garantizando una robustez cronológica sin precedentes en la arqueología maya."
      }
    ],
    "fact": "La construcción del Grupo E de Ceibal hacia el 1000 a.C. implicó la excavación y nivelación de más de diez mil metros cúbicos de lecho rocoso y tierra arcillosa en una meseta natural sobre el río La Pasión. Esta colosal obra colectiva fue completada por comunidades que todavía no utilizaban cerámica avanzada ni herramientas de metal, guiadas únicamente por la fe cósmica."
  },
  {
    "id": "legado-arquitectonico",
    "bannerImage": "/assets/maya/infographic_m13/banner_legado-arquitectonico.webp",
    "title": "El Legado de los Grupos E",
    "color": "#283593",
    "btnImage": "/assets/maya/infographic_m13/btn_legado-arquitectonico.jpg",
    "image": "/assets/maya/infographic_m13/hero_legado-arquitectonico.jpg",
    "content": [
      "El concepto arquitectónico del Grupo E constituye una de las contribuciones más trascendentales y duraderas del genio mesoamericano al patrimonio cultural universal. Al integrar la geometría del espacio edificado con los movimientos perpetuos de la bóveda celeste, los sabios y alarifes mayas inventaron un modelo de urbanismo sagrado que transformaba a la comunidad entera en partícipe directa de los grandes ritmos cósmicos del universo.",
      "La perdurabilidad de los Grupos E a lo largo de más de dos mil años de historia prehispánica —desde los orígenes arcaicos en Ceibal hacia el 1000 a.C. hasta el ocaso del periodo Clásico cerca del 900 d.C.— testimonia la incomparable solidez institucional de la astronomía maya. Pocas civilizaciones en la historia humana mantuvieron una continuidad arquitectónica tan estricta y devota al servicio de la medición del tiempo solar.",
      "En el ámbito de la ciencia arqueológica contemporánea, el estudio de los Grupos E ha sido completamente revolucionado por la tecnología de escaneo láser LIDAR. Entre 2018 y 2024, consorcios internacionales de investigación descubrieron cientos de complejos de tipo Grupo E sepultados bajo la selva virgen del norte de Guatemala y el sur de México que habían permanecido completamente invisibles a las exploraciones de superficie.",
      "Estos nuevos mapas satelitales tridimensionales han demostrado que los Grupos E no eran privilegios exclusivos de las grandes capitales dinásticas, sino centros ceremoniales estandarizados que estructuraban el territorio de pequeñas aldeas y asentamientos secundarios, actuando como las escuelas cívicas y calendáricas fundamentales donde las poblaciones campesinas aprendían a sincronizar sus vidas con el cosmos.",
      "Hoy en día, contemplar el amanecer en Uaxactún o en el Mundo Perdido de Tikal sigue siendo una experiencia profundamente sobrecogedora para científicos y visitantes de todo el planeta. La perfecta armonía entre los templos milenarios de piedra caliza y el disco solar que despunta sobre el horizonte selvático nos recuerda la capacidad de los seres humanos para encontrar sentido, belleza y orden en las leyes inmutables de la naturaleza."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los habitantes actuales de la comunidad forestal de Uaxactún, descendientes directos de los antiguos pobladores mayas, colaboran activamente como guías arqueológicos y custodios de la Reserva de la Biosfera Maya, combinando la cosecha sustentable de pimienta gorda, xate y chicle con la preservación del emblemático Grupo E de sus antepasados."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las exploraciones con tecnología LIDAR en la cuenca de El Mirador y el valle de Calakmul revelaron en 2020 que los Grupos E estaban interconectados mediante calzadas elevadas de piedra caliza (sacbeob) que se extendían en línea recta por decenas de kilómetros a través de pantanos y selvas, creando una red regional integrada de orientación astronómica y comercial."
      }
    ],
    "fact": "La orientación solar del Grupo E ejerció una influencia directa en el diseño de los centros urbanos olmecas, zapotecos y del Altiplano Central mexicano, incluyendo la gran metrópoli de Teotihuacan. El trazado de la Calzada de los Muertos y la orientación de la Pirámide del Sol reflejan principios de alineación solar y topográfica nacidos en los Grupos E mayas del Preclásico."
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
      hue: Math.random() > 0.5 ? '161,136,127' : '255,143,0', // earth or sunrise orange
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,143,0,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#A1887F','#2E7D32','#F8BBD0','#FF8F00','#039BE5','#5D4037','#283593'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FF8F00" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FF8F00" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#FF8F00" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#FF8F00" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,143,0,0.2)" />
            <stop offset="50%" stopColor="rgba(255,143,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,143,0,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FF8F00" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">UAXACTÚN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,143,0,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">GRUPO E: EL OBSERVATORIO SOLAR</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,143,0,0.2)'}`,
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
        background: 'rgba(10, 12, 10, 0.92)',
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
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Sparkles size={16} /> Profundizar en el Tema
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem',
          background: `linear-gradient(90deg, ${node.color}20, transparent)`,
          borderLeft: `4px solid ${node.color}`,
          padding: '1.2rem 1.5rem',
          borderRadius: '0 12px 12px 0',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          position: 'relative', zIndex: 2,
        }}>
          <Star size={24} style={{ color: node.color, flexShrink: 0, marginTop: '4px' }} />
          <div>
            <h5 style={{ margin: '0 0 0.4rem', color: node.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Dato Curioso
            </h5>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', fontStyle: 'italic' }}>
              "{node.fact}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds }) {
  const progress = (exploredIds.size / nodes.length) * 100;
  
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: '4px', background: 'rgba(255,255,255,0.1)',
      zIndex: 10,
    }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #FF8F00, #F8BBD0)',
          boxShadow: '0 0 10px rgba(255,143,0,0.5)',
        }}
      />
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographicMayaM13() {
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const containerRef = useRef(null);

  const handleNodeClick = (node) => {
    if (activeNode?.id === node.id) {
      setActiveNode(null);
    } else {
      setActiveNode(node);
      setExplored(prev => new Set(prev).add(node.id));
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div ref={containerRef} style={{
      width: '100%', maxWidth: '1000px', margin: '0 auto',
      background: '#040614', color: '#fff',
      borderRadius: '24px', overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
    }}>
      <TemporalField />
      <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={explored} />

      <div style={{ padding: '3rem 2rem 2rem', position: 'relative', zIndex: 1 }}>
        <MayaHeader />

        {/* Nodes Navigation */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '1.5rem', marginTop: '2rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              index={i}
              node={node}
              isActive={activeNode?.id === node.id}
              onClick={() => handleNodeClick(node)}
            />
          ))}
        </div>

        {/* Active Node Content */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode.id}
              node={activeNode}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {/* Start Prompt */}
        <AnimatePresence>
          {!activeNode && explored.size === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                textAlign: 'center', marginTop: '3rem',
                color: 'rgba(255,255,255,0.5)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              }}
            >
              <ChevronRight size={24} style={{ transform: 'rotate(90deg)', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Selecciona un nodo para explorar el observatorio
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bibliography */}
        <div style={{
          marginTop: '4rem', padding: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(0,0,0,0.2)', borderRadius: '12px',
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Fuentes de Referencia
          </h4>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.8rem' }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
