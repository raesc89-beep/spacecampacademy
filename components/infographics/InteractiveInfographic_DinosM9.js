'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Fossil / Paleontology themed) ————————————————
function DecoBone({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized bone */}
      <ellipse cx="12" cy="12" rx="6" ry="5" fill={color} opacity="0.4" />
      <ellipse cx="48" cy="48" rx="6" ry="5" fill={color} opacity="0.4" />
      <line x1="15" y1="15" x2="45" y2="45" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="12" cy="18" rx="5" ry="4" fill={color} opacity="0.3" />
      <ellipse cx="48" cy="42" rx="5" ry="4" fill={color} opacity="0.3" />
      {/* Small cracks */}
      <line x1="25" y1="22" x2="28" y2="28" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="35" y1="32" x2="32" y2="38" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoAmmonite({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Spiral shell */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.3" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="1.8" opacity="0.6" />
      <circle cx="30" cy="30" r="2.5" fill={color} opacity="0.5" />
      {/* Spiral connector */}
      <path d="M30 6 Q54 30 30 54" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Ribbing lines */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 18 * Math.cos(rad)} y1={30 + 18 * Math.sin(rad)} x2={30 + 24 * Math.cos(rad)} y2={30 + 24 * Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.25" />;
      })}
    </svg>
  );
}

function DecoRockLayer({ size = 80, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Sedimentary layers */}
      <path d="M5 10 Q20 7 40 10 Q60 13 75 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M5 20 Q25 17 40 20 Q55 23 75 20" fill="none" stroke={color} strokeWidth="1.8" opacity="0.5" />
      <path d="M5 30 Q30 27 45 30 Q60 33 75 30" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <path d="M5 40 Q20 37 40 40 Q60 43 75 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Embedded fossil shape */}
      <ellipse cx="50" cy="25" rx="5" ry="3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="22" cy="15" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoHammer({ size = 60, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Hammer handle */}
      <line x1="18" y1="42" x2="38" y2="22" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
      {/* Hammer head */}
      <rect x="32" y="12" width="18" height="10" rx="2" fill={color} opacity="0.4" transform="rotate(-45 41 17)" />
      {/* Impact sparks */}
      <circle cx="48" cy="10" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="16" r="1" fill={color} opacity="0.3" />
      <circle cx="44" cy="6" r="1" fill={color} opacity="0.3" />
      {/* Rock chips */}
      <path d="M10 48 L14 44 L18 48 Z" fill={color} opacity="0.2" />
      <path d="M8 52 L11 49 L14 52 Z" fill={color} opacity="0.15" />
    </svg>
  );
}

function DecoMagnifier({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Magnifying glass */}
      <circle cx="24" cy="24" r="16" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="24" cy="24" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="36" y1="36" x2="52" y2="52" stroke={color} strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
      {/* Detail lines inside lens */}
      <line x1="18" y1="20" x2="22" y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="26" x2="26" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="24" cy="22" r="1.5" fill={color} opacity="0.25" />
    </svg>
  );
}

function DecoLeaf({ size = 65, color = '#7D6B99', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Fossil leaf imprint */}
      <path d="M30 8 Q10 25 30 52 Q50 25 30 8 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Central vein */}
      <line x1="30" y1="12" x2="30" y2="48" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Side veins */}
      <line x1="30" y1="20" x2="20" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="20" x2="40" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="28" x2="18" y2="32" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="28" x2="42" y2="32" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="36" x2="22" y2="40" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="36" x2="38" y2="40" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'que-es-un-fosil': [DecoAmmonite, DecoBone, DecoLeaf],
  'proceso-fosilizacion': [DecoRockLayer, DecoAmmonite, DecoBone],
  'herramientas-paleontologo': [DecoHammer, DecoMagnifier, DecoRockLayer],
  'excavaciones-famosas': [DecoBone, DecoRockLayer, DecoHammer],
  'campo-al-laboratorio': [DecoMagnifier, DecoHammer, DecoAmmonite],
  'datacion-edad': [DecoRockLayer, DecoLeaf, DecoMagnifier],
  'fosiles-cambiaron-historia': [DecoAmmonite, DecoBone, DecoLeaf],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Benton, M.J. (2014). Vertebrate Palaeontology, 4th Edition. Wiley-Blackwell',
  'Prothero, D.R. (2007). Evolution: What the Fossils Say and Why It Matters. Columbia University Press',
  'Brusatte, S. (2018). The Rise and Fall of the Dinosaurs: A New History of a Lost World. William Morrow',
  'Schweitzer, M.H. et al. (2005). Soft-Tissue Vessels and Cellular Preservation in Tyrannosaurus rex. Science, 307(5717), 1952-1955',
  'Briggs, D.E.G. & Crowther, P.R. (2001). Palaeobiology II. Blackwell Science',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-un-fosil',
    title: '¿Qué es un Fósil?',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/dinos_m9.png',
    image: '/assets/dinosaurios/dinos_m9.png',
    content: [
      'Un fósil es cualquier evidencia de vida pasada preservada en la corteza terrestre. La palabra proviene del latín "fossilis", que significa "obtenido cavando". Los fósiles incluyen huesos, dientes, conchas, hojas, huellas, madrigueras e incluso excrementos petrificados llamados coprolitos. El registro fósil abarca organismos desde hace 3,500 millones de años (bacterias microscópicas en rocas de Australia Occidental) hasta animales de la última glaciación, hace unos 11,700 años. Sin los fósiles, no tendríamos conocimiento directo de que existieron los dinosaurios, los trilobites o los primeros peces con mandíbulas.',
      'Existen dos categorías principales de fósiles. Los fósiles corporales preservan partes del organismo mismo: huesos, dientes, conchas, exoesqueletos y en casos raros, tejido blando. Los icnofósiles o fósiles traza registran la actividad del organismo sin preservar su cuerpo: huellas de pisadas, madrigueras excavadas en sedimento, marcas de mordeduras en huesos y coprolitos. En 2005, Mary Schweitzer de la Universidad Estatal de Carolina del Norte descubrió vasos sanguíneos flexibles dentro de un fémur de Tyrannosaurus rex de 68 millones de años, un hallazgo que transformó la comprensión sobre la preservación de tejidos blandos.',
      'La permineralización es el proceso más común de fosilización de huesos y madera. El agua rica en minerales (sílice, calcita, pirita) se filtra a través del material orgánico enterrado y deposita cristales en los espacios celulares. Con el tiempo, la estructura original se reemplaza molécula por molécula, creando una réplica en piedra con un detalle que puede alcanzar el nivel celular. El Bosque Petrificado de Arizona contiene troncos de coníferas de 225 millones de años preservados por sílice, donde se pueden observar los anillos de crecimiento anuales con la misma nitidez que en un árbol talado hoy.',
      'Los moldes y contramoldes se forman cuando un organismo queda enterrado en sedimento y su cuerpo se disuelve, dejando una cavidad con su forma exacta (molde externo). Si esa cavidad se rellena con otro mineral, se obtiene un contramolde: una réplica tridimensional en piedra del organismo original. Muchos fósiles de conchas marinas del Paleozoico se preservaron de esta manera. En las calizas devónicas de Nueva York (385 millones de años), se encuentran contramoldes de braquiópodos tan detallados que se pueden identificar las líneas de crecimiento de cada valva individual.',
      'El ámbar es resina fosilizada de árboles antiguos que puede encapsular organismos diminutos en un estado de preservación tridimensional sin igual. El ámbar báltico (de 44 millones de años) y el ámbar birmano (de 99 millones de años) contienen insectos, arácnidos, plumas de dinosaurio y flores con un nivel de detalle que permite observar las facetas de los ojos compuestos de moscas y los granos de polen adheridos a las patas de abejas. En 2016, Lida Xing de la Universidad de Geociencias de China describió una cola emplumada de un dinosaurio celurosaurio preservada en ámbar birmano, confirmando que muchos dinosaurios poseían plumas similares a las de las aves modernas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los coprolitos (excrementos fósiles) son una fuente valiosa de información. El coprolito más grande conocido mide 44 centímetros de largo y fue encontrado en Saskatchewan, Canadá, en formaciones de 65 millones de años. Probablemente fue producido por un Tyrannosaurus rex y contiene fragmentos de hueso triturado, lo que confirma que este depredador aplastaba los huesos de sus presas con su mordida de 5,800 kilogramos de fuerza, una de las más potentes registradas en cualquier animal terrestre.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los microfósiles son fósiles que solo pueden verse con microscopio. Los foraminíferos, organismos unicelulares con conchas de carbonato de calcio de entre 0.1 y 1 milímetro, son tan abundantes en los sedimentos oceánicos que forman capas de caliza de cientos de metros de espesor. Los acantilados blancos de Dover, en Inglaterra, están compuestos por billones de conchas de cocolitofóridos (algas microscópicas) depositadas durante el Cretácico, hace unos 70 millones de años.' },
    ],
    fact: 'El fósil más antiguo confirmado es una estructura estromatolítica encontrada en Pilbara, Australia Occidental, con una edad de 3,480 millones de años. Los estromatolitos son capas de sedimento atrapadas por comunidades de cianobacterias. Estas bacterias fueron los primeros organismos en producir oxígeno mediante fotosíntesis, transformando gradualmente la atmósfera terrestre de una mezcla de metano y dióxido de carbono a una rica en oxígeno, un proceso que tardó más de mil millones de años y que hizo posible la evolución de la vida animal compleja.',
  },
  {
    id: 'proceso-fosilizacion',
    title: 'El Proceso de Fosilización',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/dinos_m9.png',
    image: '/assets/dinosaurios/dinos_m9.png',
    content: [
      'La fosilización es un proceso que requiere condiciones específicas y rara vez ocurre. Se estima que menos del 1% de todas las especies que han existido dejaron algún registro fósil, y de los individuos dentro de esas especies, la proporción preservada es aún menor. Para que un organismo se fosilice, debe quedar enterrado rápidamente en sedimento (arena, lodo, ceniza volcánica) antes de que los carroñeros, las bacterias y la exposición al aire descompongan sus restos. Los ambientes acuáticos —lechos de ríos, fondos de lagos, deltas costeros— ofrecen las mejores condiciones porque el sedimento se deposita de forma continua y cubre los restos con rapidez.',
      'La tafonomía es la ciencia que estudia todo lo que le ocurre a un organismo desde su muerte hasta su descubrimiento como fósil. Fue definida formalmente por el paleontólogo ruso Ivan Efremov en 1940. La tafonomía examina cómo el transporte por agua puede dispersar huesos, cómo los carroñeros alteran esqueletos, cómo la compresión de las capas de roca deforma los fósiles y cómo los procesos químicos reemplazan los minerales originales. Un tafónomo puede determinar, por ejemplo, si un grupo de huesos de dinosaurio encontrados juntos representa una manada que murió junta o una acumulación accidental de restos transportados por una inundación.',
      'Las rocas sedimentarias son el único tipo de roca donde se encuentran fósiles con regularidad. Se forman por la acumulación y compactación de partículas de sedimento a lo largo de miles o millones de años. Las calizas, areniscas, lutitas y margas son las rocas sedimentarias más comunes que contienen fósiles. Las rocas ígneas (formadas por magma) y las metamórficas (transformadas por calor y presión extremos) destruyen cualquier resto orgánico durante su formación. Existe una excepción notable: las cenizas volcánicas, que son técnicamente sedimentarias, han preservado fósiles de manera sobresaliente en lugares como Laetoli, Tanzania, donde huellas de Australopithecus afarensis de 3.6 millones de años quedaron impresas en ceniza húmeda.',
      'Las Lagerstätten (término alemán que significa "lugares de almacenamiento") son yacimientos fósiles con una preservación tan detallada que conservan tejidos blandos, contornos corporales y detalles anatómicos normalmente ausentes en el registro fósil. La Formación Burgess Shale en Canadá (508 millones de años) preservó las partes blandas de animales del Cámbrico como Anomalocaris y Hallucigenia. La caliza de Solnhofen en Alemania (150 millones de años) conservó las plumas de Archaeopteryx con tal detalle que se pueden contar las barbas individuales de cada pluma.',
      'La diagénesis es el conjunto de cambios químicos y físicos que ocurren en el sedimento después del enterramiento. Durante este proceso, los minerales del agua subterránea reemplazan los componentes originales del organismo: la hidroxiapatita del hueso puede ser reemplazada por sílice, calcita o pirita. La compactación por el peso de las capas superiores aplasta los fósiles, razón por la cual muchos peces y hojas fósiles aparecen aplanados como láminas de papel. La cementación une las partículas de sedimento en roca sólida, sellando los fósiles en una cápsula natural que puede durar cientos de millones de años. Todo el proceso desde la muerte del organismo hasta la formación de una roca fosilífera puede tomar entre 10,000 y varios millones de años.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La preservación en hielo también puede conservar organismos con un detalle notable, aunque no produce fósiles en el sentido geológico estricto. En 2007, un bebé mamut lanudo apodado Lyuba fue encontrado en el permafrost siberiano con 42,000 años de antigüedad. Su cuerpo estaba tan bien preservado que los científicos pudieron analizar el contenido de su estómago (leche materna) y detectar la presencia de lodo en su tráquea, lo que sugiere que murió ahogado en un pantano congelado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El sesgo tafonómico distorsiona nuestra visión del pasado. Los animales con huesos duros y dientes gruesos se fosilizan mucho más que los de cuerpo blando. Por eso conocemos muchos más vertebrados que medusas fósiles, aunque las medusas existen desde hace al menos 500 millones de años. Se calcula que el 85% de los géneros de invertebrados marinos del Fanerozoico están representados en el registro fósil, pero solo el 12% de los géneros terrestres, porque los ambientes continentales favorecen la erosión sobre la sedimentación.' },
    ],
    fact: 'En la Formación Messel de Alemania (47 millones de años), se han encontrado fósiles de mamíferos con el contenido estomacal preservado. Un caballo primitivo del tamaño de un gato (Propalaeotherium) conservaba uvas y hojas de laurel en su estómago, lo que reveló que los bosques de Messel tenían un clima subtropical. Un murciélago fósil de Messel conservaba polillas en su estómago, demostrando que la ecolocalización ya existía en los murciélagos hace 47 millones de años, algo que no se podía deducir solo de la estructura ósea.',
  },
  {
    id: 'herramientas-paleontologo',
    title: 'Herramientas del Paleontólogo',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/dinos_m9.png',
    image: '/assets/dinosaurios/dinos_m9.png',
    content: [
      'El equipo básico de campo de un paleontólogo ha cambiado poco en un siglo: martillos de roca de diferentes pesos (de 400 gramos a 2 kilogramos), cinceles de acero templado, brochas de distintos grosenes (desde brochas anchas para retirar sedimento grueso hasta pinceles finos de pelo de camello para limpiar superficies delicadas), pegamento de cianoacrilato para consolidar huesos frágiles in situ, y yeso para crear camisas protectoras. A esto se suman herramientas modernas como sistemas GPS de alta precisión (con margen de error menor a 10 centímetros) que registran la posición exacta de cada hueso, cámaras digitales de alta resolución y estaciones totales topográficas que crean mapas tridimensionales del yacimiento.',
      'La fotogrametría es una técnica que reconstruye modelos 3D a partir de cientos de fotografías tomadas desde múltiples ángulos. En paleontología, se usa para documentar yacimientos completos antes de que la excavación los destruya (porque excavar es, por definición, un proceso destructivo). Un equipo toma entre 200 y 500 fotografías solapadas de una zona y un software como Agisoft Metashape genera un modelo digital con una precisión de hasta 1 milímetro. Este modelo permite a los científicos estudiar la distribución espacial de los fósiles años después de que la excavación haya finalizado, revisando detalles que podrían haberse pasado por alto durante el trabajo de campo.',
      'La tomografía computarizada (CT) ha transformado el estudio de fósiles desde la década de 1990. Un escáner CT de uso médico o industrial proyecta rayos X desde múltiples ángulos y reconstruye una imagen tridimensional del interior del fósil sin necesidad de cortarlo ni dañarlo. En 2001, Timothy Rowe de la Universidad de Texas usó CT para escanear el cráneo de un Tyrannosaurus rex y reveló que sus bulbos olfatorios eran proporcionalmente mayores que los de cualquier otro terópodo conocido, indicando un sentido del olfato agudo. Los escáneres sincrotrón, como el de la Instalación Europea de Radiación Sincrotrón (ESRF) en Grenoble, Francia, generan rayos X mil millones de veces más brillantes que los médicos y pueden resolver detalles de hasta 0.7 micrómetros en fósiles encerrados en roca.',
      'El LiDAR (Light Detection and Ranging) utiliza pulsos de láser para crear mapas topográficos de alta resolución del terreno. En paleontología, se emplea tanto desde aviones como desde drones para identificar afloramientos rocosos prometedores en áreas de difícil acceso. En 2015, investigadores usaron LiDAR aerotransportado para cartografiar la Formación Morrison en Wyoming, Estados Unidos, identificando 23 nuevos afloramientos potencialmente fosilíferos que no eran visibles desde el suelo debido a la vegetación. Los drones equipados con cámaras multiespectrales también pueden detectar diferencias sutiles en la composición mineral del suelo que indican la presencia de hueso fosilizado bajo la superficie.',
      'La espectroscopia Raman y la fluorescencia de rayos X (XRF) permiten analizar la composición química de los fósiles sin destruir las muestras. La espectroscopia Raman identifica los minerales que reemplazaron el material original del organismo, mientras que la XRF detecta elementos traza presentes en concentraciones de partes por millón. En 2010, investigadores usaron XRF sincrotrón para mapear la distribución de zinc, cobre y calcio en plumas fósiles de Archaeopteryx, demostrando que estas plumas contenían melanina organizada en patrones, lo que sugiere que el plumaje de Archaeopteryx no era uniformemente negro sino que presentaba zonas claras y oscuras con un posible patrón de camuflaje.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las impresoras 3D se usan para crear réplicas exactas de fósiles delicados. En 2014, el Museo Americano de Historia Natural de Nueva York imprimió en 3D un cráneo completo de Allosaurus a partir de datos de escáner CT, permitiendo que investigadores de todo el mundo estudiaran la pieza sin necesidad de manipular el frágil original de 150 millones de años. Las réplicas impresas también se usan en educación, ya que los estudiantes pueden manejarlas sin riesgo de dañar especímenes reales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El microscopio electrónico de barrido (SEM) permite observar superficies fósiles con magnificaciones de hasta 100,000 aumentos. Con esta tecnología, en 2008 Jakob Vinther de la Universidad de Yale identificó melanosomas (orgánulos que contienen pigmento) preservados en plumas fósiles de 47 millones de años. Al comparar la forma de estos melanosomas con los de aves modernas, pudo reconstruir el color original de un ave fósil: negro iridiscente con reflejos verdes y azules, similar al de un estornino actual.' },
    ],
    fact: 'El paleontólogo de campo más prolífico de la historia fue Barnum Brown (1873-1963), apodado "Mr. Bones" por su habilidad para encontrar fósiles. Brown descubrió el primer esqueleto de Tyrannosaurus rex en Hell Creek, Montana, en 1902, y un segundo espécimen más completo en 1908. A lo largo de su carrera en el Museo Americano de Historia Natural, recolectó fósiles en todos los continentes excepto la Antártida. Su técnica incluía recorrer formaciones rocosas a caballo, observando el terreno desde una perspectiva elevada para detectar fragmentos de hueso erosionados en la superficie.',
  },
  {
    id: 'excavaciones-famosas',
    title: 'Excavaciones Famosas',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/dinos_m9.png',
    image: '/assets/dinosaurios/dinos_m9.png',
    content: [
      'La Formación Hell Creek, que se extiende por Montana, Dakota del Norte, Dakota del Sur y Wyoming (Estados Unidos), es uno de los yacimientos más productivos del mundo para dinosaurios del Cretácico tardío (hace 68 a 66 millones de años). En sus capas de arenisca y lutita se han encontrado restos de Tyrannosaurus rex, Triceratops, Edmontosaurus, Pachycephalosaurus y Ankylosaurus, entre otros. Hell Creek también preserva la transición entre el Cretácico y el Paleógeno, incluyendo la capa de iridio que marca el impacto del asteroide Chicxulub. En 2019, Robert DePalma describió un yacimiento en Dakota del Norte llamado Tanis, donde se preservaron peces con esférulas de impacto incrustadas en sus branquias, capturados en un seiche (ola sísmica) provocado por el impacto a más de 3,000 kilómetros de distancia.',
      'La Formación Morrison, también en el oeste de Estados Unidos, cubre rocas del Jurásico tardío (hace 156 a 146 millones de años) y fue el escenario de la "Guerra de los Huesos" entre los paleontólogos Edward Drinker Cope y Othniel Charles Marsh en las décadas de 1870 y 1880. Esta rivalidad feroz produjo el descubrimiento de 142 nuevas especies de dinosaurios, incluyendo Stegosaurus, Allosaurus, Diplodocus, Brontosaurus y Camarasaurus. Aunque ambos científicos cometieron errores por la prisa de publicar primero (Cope colocó famosamente el cráneo de Elasmosaurus en el extremo equivocado), su competencia aceleró el conocimiento paleontológico de manera sustancial.',
      'La provincia de Liaoning, en el noreste de China, revolucionó la paleontología a partir de 1996 con el descubrimiento de dinosaurios con plumas preservadas en cenizas volcánicas de grano fino del Cretácico temprano (hace 130 a 120 millones de años). Sinosauropteryx, descrito en 1996, fue el primer dinosaurio no aviano con evidencia directa de protoplumas. Le siguieron Caudipteryx, Microraptor (con cuatro alas funcionales), Anchiornis (cuyo patrón de coloración fue reconstruido en 2010) y Yutyrannus (un tiranosáurido de 9 metros cubierto de plumas). Los fósiles de Liaoning demostraron de forma definitiva que las aves descienden de dinosaurios terópodos, confirmando una hipótesis propuesta por Thomas Huxley en 1868.',
      'La Patagonia argentina es una región de excepcional riqueza paleontológica que ha producido algunos de los dinosaurios más grandes jamás descubiertos. En 2014, un pastor de ovejas encontró un fémur sobresaliendo de una ladera en la Estancia La Flecha, provincia de Chubut. La excavación dirigida por José Luis Carballido y Diego Pol del Museo Paleontológico Egidio Feruglio reveló los restos de Patagotitan mayorum, un titanosaurio de 37 metros de largo y un peso estimado de 69 toneladas, el animal terrestre más pesado conocido con evidencia esquelética suficiente para una estimación fiable. La Patagonia también ha producido Giganotosaurus carolinii (uno de los terópodos más grandes), Argentinosaurus y los huevos fósiles de saurópodos del yacimiento de Auca Mahuevo.',
      'El desierto del Gobi, compartido entre Mongolia y China, ha sido un sitio de excavación clave desde las expediciones del Museo Americano de Historia Natural lideradas por Roy Chapman Andrews en la década de 1920. Andrews descubrió los primeros nidos de huevos de dinosaurio conocidos por la ciencia en Flaming Cliffs (Bayanzag), atribuyéndolos inicialmente a Protoceratops, aunque en 1994 se demostró que pertenecían al oviraptorosaurio Oviraptor. Las expediciones polaco-mongolas de las décadas de 1960 y 1970 encontraron el famoso fósil del "Dinosaurios en Combate": un Velociraptor mongoliensis y un Protoceratops andrewsi atrapados en combate mortal, sepultados instantáneamente por una duna de arena colapsada hace 74 millones de años.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Formación Ischigualasto en Argentina (conocida como el Valle de la Luna) contiene algunos de los dinosaurios más antiguos conocidos, con una edad de 231 millones de años (Triásico tardío). Aquí se descubrieron Eoraptor lunensis (un dinosaurio basal de 1 metro) y Herrerasaurus ischigualastensis, ambos cruciales para entender el origen del linaje de los dinosaurios. El paisaje erosionado del Valle de la Luna parece un paisaje lunar, de ahí su nombre, y fue declarado Patrimonio de la Humanidad por la UNESCO en 2000.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El yacimiento de Messel, cerca de Frankfurt, Alemania, es un maar (cráter volcánico relleno de agua) del Eoceno (47 millones de años). Las aguas profundas del antiguo lago carecían de oxígeno en el fondo, lo que inhibía la descomposición y permitía la preservación de detalles como contornos de pelaje, contenido estomacal e incluso fetos en desarrollo dentro de yeguas preñadas. El caballo fósil Darwinius masillae, apodado "Ida", fue encontrado aquí en 1983 por un coleccionista aficionado y no fue estudiado científicamente hasta 2009.' },
    ],
    fact: 'En Dinosaur Provincial Park, Alberta, Canadá, un área de solo 73 kilómetros cuadrados ha producido más de 500 esqueletos articulados de dinosaurios pertenecientes a más de 40 especies del Cretácico tardío, incluyendo Corythosaurus, Centrosaurus y Gorgosaurus. Esta densidad se debe a que hace 75 millones de años la región era una llanura costera subtropical con ríos meandrantes que enterraban regularmente los cadáveres de animales en sus barras de arena. Es el yacimiento de dinosaurios más diverso del planeta y fue declarado Patrimonio de la Humanidad por la UNESCO en 1979.',
  },
  {
    id: 'campo-al-laboratorio',
    title: 'Del Campo al Laboratorio',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/dinos_m9.png',
    image: '/assets/dinosaurios/dinos_m9.png',
    content: [
      'Una vez localizado un fósil en el campo, el primer paso es documentar su posición exacta con GPS, fotografía y dibujo antes de tocar nada. La posición relativa de cada hueso respecto a los demás y respecto a las capas de roca proporciona información sobre cómo murió el animal, si fue transportado por agua y si fue perturbado por carroñeros. Los paleontólogos excavadores usan cuadrículas de 1 metro marcadas con cuerdas para mapear cada fragmento. Este proceso puede tomar semanas o meses: la excavación de "Sue" el Tyrannosaurus rex en Dakota del Sur en 1990 requirió 17 días de trabajo con un equipo de 6 personas solo para exponer el esqueleto, y luego 10 días adicionales para encamisarlo.',
      'Las camisas de yeso (plaster jackets) son la técnica estándar para proteger fósiles grandes durante su transporte desde el campo hasta el laboratorio. El proceso es similar a un yeso médico: se coloca una capa de papel húmedo o papel aluminio sobre el fósil expuesto, seguida de tiras de arpillera empapadas en yeso de París. Una vez endurecido, el bloque se voltea, se aplica yeso en la parte inferior y se sella completamente. Las camisas pueden pesar desde unos pocos kilogramos hasta varias toneladas. La camisa que contenía el fémur de Patagotitan mayorum pesó más de 500 kilogramos y requirió una grúa para su extracción.',
      'El laboratorio de preparación es donde los fósiles se liberan de la roca circundante (matriz). Los preparadores usan herramientas neumáticas (martillos de aire comprimido con puntas de carburo de tungsteno que vibran hasta 30,000 veces por minuto) para retirar la roca milímetro a milímetro cerca del hueso. Para rocas calcáreas, se usa preparación ácida: ácido fórmico al 5-10% o ácido acético disuelven la matriz de carbonato de calcio sin dañar el hueso fosfático. El proceso requiere ciclos repetidos de inmersión en ácido, lavado, secado y aplicación de consolidante (Paraloid B-72 disuelto en acetona) para endurecer las superficies expuestas.',
      'La microscopía juega un papel central en la preparación y estudio de fósiles. Los preparadores trabajan bajo microscopios estereoscópicos con aumentos de 10x a 40x para distinguir el hueso de la roca, especialmente cuando tienen colores similares. Para fósiles de vertebrados pequeños (dientes de mamíferos del Mesozoico que miden menos de 3 milímetros), la preparación se realiza bajo microscopio con agujas de acero montadas en mangos de madera. El Museo Nacional de Historia Natural de Washington D.C. tiene un laboratorio de preparación visible al público llamado "FossiLab", donde los visitantes pueden observar a los preparadores trabajando en fósiles reales a través de ventanas de cristal.',
      'El almacenamiento y catalogación de fósiles sigue protocolos de museo rigurosos. Cada espécimen recibe un número de catálogo único que lo vincula permanentemente a su ficha de campo, localidad, formación geológica y datos de recolección. Los fósiles se almacenan en cajones acolchados en salas con temperatura y humedad controladas (20°C, 45% de humedad relativa). La pirita presente en algunos fósiles puede oxidarse al contacto con la humedad ambiental, expandiéndose y destruyendo el espécimen desde dentro (enfermedad de la pirita). Los museos grandes como el Smithsonian, el Natural History Museum de Londres y el Museo Paleontológico Egidio Feruglio en Trelew, Argentina, albergan colecciones de millones de especímenes, de los cuales solo un 1-5% se exhibe al público.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La preparación de un solo esqueleto grande puede tomar años. El Tyrannosaurus rex "Sue" (FMNH PR 2081), el espécimen más completo conocido con un 90% de sus huesos, requirió más de 25,000 horas de preparación por un equipo de 10 personas durante 3.5 años en el Field Museum de Chicago. El cráneo solo, que pesa 272 kilogramos, necesitó 3,000 horas. El costo total de la adquisición y preparación de Sue superó los 10 millones de dólares.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La consolidación es un paso crítico que evita que los fósiles se desintegren al secarse después de millones de años enterrados en roca húmeda. El consolidante más usado es Paraloid B-72 (un copolímero acrílico) disuelto en acetona al 5-15%. Es reversible: puede disolverse con acetona en el futuro si se necesita retirar para nuevos análisis. Los paleontólogos también usan cianoacrilato (pegamento instantáneo) para reparar fracturas frescas en el campo, aplicándolo con jeringas de precisión para que penetre en las grietas capilares del hueso.' },
    ],
    fact: 'El mayor desafío logístico en paleontología de campo fue probablemente la extracción del saurópodo Dreadnoughtus schrani en la Patagonia argentina en 2005. Kenneth Lacovara de la Universidad Drexel y su equipo necesitaron cuatro temporadas de campo (2005-2009) para excavar y encamisar los 145 huesos del esqueleto. Las camisas de yeso más grandes pesaban más de una tonelada y fueron trasladadas en camión por caminos de tierra durante 40 kilómetros hasta la carretera más cercana, y luego transportadas 1,600 kilómetros hasta el laboratorio en Philadelphia. El esqueleto viajó en un contenedor de barco desde Buenos Aires hasta Estados Unidos.',
  },
  {
    id: 'datacion-edad',
    title: 'Datación: ¿Cuántos Años Tiene?',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/dinos_m9.png',
    image: '/assets/dinosaurios/dinos_m9.png',
    content: [
      'La datación radiométrica es el método más preciso para determinar la edad absoluta de las rocas y, por extensión, de los fósiles que contienen. Se basa en el principio de que ciertos isótopos radiactivos se descomponen a tasas constantes y medibles. Cada isótopo tiene una "vida media": el tiempo que tarda la mitad de los átomos radiactivos en descomponerse en un isótopo "hijo" estable. Midiendo la proporción entre el isótopo padre y el hijo en un mineral, se calcula cuánto tiempo ha pasado desde que el mineral cristalizó. La datación potasio-argón (K-Ar) y su variante más precisa argón-argón (⁴⁰Ar/³⁹Ar) se usan para datar cenizas volcánicas y lavas, con un rango efectivo desde 100,000 años hasta los 4,600 millones de años de la Tierra.',
      'El método uranio-plomo (U-Pb) es el cronómetro más preciso de la geología, con márgenes de error menores al 0.1% en circones (cristales de silicato de zirconio) de miles de millones de años. Los circones son minerales resistentes que se forman en magmas y preservan sus isótopos de uranio durante eones. El uranio-238 se descompone en plomo-206 con una vida media de 4,470 millones de años, mientras que el uranio-235 se descompone en plomo-207 con una vida media de 704 millones de años. Al usar ambos sistemas simultáneamente, los geocronólogos obtienen una verificación cruzada que detecta cualquier alteración del sistema. La edad de la Tierra (4,540 millones de años ± 50 millones) fue determinada por Clair Patterson en 1956 usando U-Pb en meteoritos.',
      'El carbono-14 (¹⁴C) es útil exclusivamente para materiales orgánicos de menos de 50,000 años de antigüedad, lo que lo hace irrelevante para la datación de dinosaurios mesozoicos pero esencial para el estudio de fósiles del Pleistoceno y la arqueología. El ¹⁴C se produce en la atmósfera cuando los neutrones de los rayos cósmicos golpean átomos de nitrógeno-14. Los organismos vivos incorporan ¹⁴C a través de la fotosíntesis (plantas) o la alimentación (animales). Al morir, dejan de incorporar ¹⁴C y el que tienen se descompone con una vida media de 5,730 años. Willard Libby desarrolló esta técnica en 1949 y recibió el Premio Nobel de Química en 1960 por su contribución.',
      'La estratigrafía es el estudio del orden y la posición de las capas de roca (estratos). El Principio de Superposición, formulado por Nicolás Steno en 1669, establece que en una secuencia de rocas no deformada, las capas más antiguas se encuentran en la parte inferior y las más jóvenes en la superior. Este principio permite establecer la edad relativa de los fósiles sin necesidad de datación absoluta: un fósil en una capa inferior es más antiguo que uno en una capa superior. La columna estratigráfica global, construida durante dos siglos de correlación de capas en todo el mundo, divide la historia de la Tierra en eones, eras, períodos, épocas y edades, cada una definida por cambios en el registro fósil.',
      'Los fósiles índice (o fósiles guía) son especies que existieron durante un período de tiempo corto pero que se distribuyeron geográficamente de forma amplia, lo que los convierte en marcadores temporales ideales. Los trilobites son fósiles índice para el Paleozoico (541-252 millones de años), los ammonites para el Mesozoico (252-66 millones de años) y los foraminíferos planctónicos para el Cenozoico (66 millones de años al presente). Un ammonite de la especie Hoplites dentatus, por ejemplo, indica que la roca que lo contiene se formó durante el Albiense (113-100 millones de años) del Cretácico, sin importar si la roca se encuentra en Francia, Japón o Colombia. La bioestratigrafía, la ciencia de datar rocas mediante fósiles, fue fundada por William Smith en 1816 cuando publicó el primer mapa geológico de Inglaterra.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La técnica de luminiscencia ópimamente estimulada (OSL) data la última vez que granos de cuarzo o feldespato fueron expuestos a la luz solar. La radiación ambiental acumula energía en defectos del cristal; cuando se libera con luz láser en el laboratorio, la intensidad de la luminiscencia indica cuánto tiempo estuvo el grano enterrado. La OSL tiene un rango de 1,000 a 350,000 años y es útil para datar sedimentos que no contienen material volcánico ni orgánico, como las dunas de arena donde se preservaron huellas de dinosaurios en desiertos antiguos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El paleomagnetismo utiliza las inversiones del campo magnético terrestre como cronómetro. El campo magnético de la Tierra se invierte de forma irregular cada varios cientos de miles de años: el polo norte magnético se convierte en el sur y viceversa. Estas inversiones quedan registradas en minerales magnéticos (magnetita) de las rocas volcánicas y sedimentarias. La secuencia de inversiones forma una escala magnetoestratigráfica global. La última inversión completa, llamada Brunhes-Matuyama, ocurrió hace 780,000 años.' },
    ],
    fact: 'La datación más precisa del impacto de Chicxulub fue publicada en 2013 por Paul Renne del Berkeley Geochronology Center usando el método argón-argón (⁴⁰Ar/³⁹Ar) en cristales de tektita (vidrio fundido por el impacto) recogidos en Haití. La edad resultante fue de 66.043 ± 0.011 millones de años, con una incertidumbre de solo 11,000 años, lo que equivale a un margen de error del 0.00002%. Esta precisión confirmó que el impacto y la extinción masiva fueron sincrónicos dentro de la resolución temporal del método.',
  },
  {
    id: 'fosiles-cambiaron-historia',
    title: 'Fósiles que Cambiaron la Historia',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/dinos_m9.png',
    image: '/assets/dinosaurios/dinos_m9.png',
    content: [
      'Sue (FMNH PR 2081) es el esqueleto de Tyrannosaurus rex más completo y mejor preservado del mundo, con un 90% de sus huesos recuperados. Fue descubierto el 12 de agosto de 1990 por la paleontóloga amateur Sue Hendrickson en la Formación Hell Creek, cerca de Faith, Dakota del Sur. Sue mide 12.3 metros de largo, tiene un cráneo de 1.5 metros y se estima que pesaba entre 8.4 y 14 toneladas en vida. La datación de las rocas circundantes indica una edad de 67 millones de años. La adquisición de Sue generó una batalla legal entre el recolector, el dueño de la tierra y el gobierno federal que terminó con una subasta en Sotheby\'s en 1997, donde el Field Museum de Chicago lo compró por 8.36 millones de dólares con ayuda de Disney y McDonald\'s.',
      'Lucy (AL 288-1) es un esqueleto parcial (40% completo) de Australopithecus afarensis encontrado en 1974 por Donald Johanson y Tom Gray en Hadar, Etiopía. Datada en 3.2 millones de años mediante potasio-argón, Lucy medía solo 1.07 metros de altura y pesaba unos 29 kilogramos. Su importancia radica en que su pelvis y fémur demuestran que caminaba erguida sobre dos piernas (bipedismo), mientras que sus brazos largos y dedos curvos indican que aún trepaba árboles con frecuencia. Lucy estableció que el bipedismo precedió al aumento del tamaño cerebral en la evolución humana, contradiciendo la hipótesis anterior de que un cerebro grande fue el primer cambio. Su nombre proviene de la canción "Lucy in the Sky with Diamonds" de los Beatles, que sonaba en el campamento la noche del descubrimiento.',
      'Tiktaalik roseae fue descubierto en 2004 por Neil Shubin, Edward Daeschler y Farish Jenkins en la isla de Ellesmere, en el Ártico canadiense, en rocas de 375 millones de años del Devónico tardío. Tiktaalik es un fósil transicional entre los peces con aletas lobuladas y los primeros tetrápodos (vertebrados de cuatro extremidades). Tenía escamas y branquias como un pez, pero también un cuello articulado, costillas robustas capaces de soportar peso fuera del agua, y aletas con huesos homólogos al húmero, radio y cúbito de los vertebrados terrestres. Shubin eligió buscar en Ellesmere específicamente porque las rocas tenían la edad y el ambiente sedimentario (delta fluvial) correctos para encontrar este tipo de transición, un ejemplo de predicción científica exitosa.',
      'Archaeopteryx lithographica, descubierto en 1861 en las calizas de Solnhofen, Baviera, Alemania, fue el primer fósil en mostrar una combinación de rasgos de reptil (dientes, cola ósea larga, garras en las alas) y de ave (plumas asimétricas indicativas de vuelo). Se conocen 13 especímenes, todos del Jurásico tardío (150 millones de años). Charles Darwin había publicado "El Origen de las Especies" solo dos años antes, y Archaeopteryx fue citado como evidencia de las formas de transición que su teoría predecía. Estudios con fluorescencia de sincrotrón en 2010 revelaron que las plumas de Archaeopteryx eran negras, lo que indica la presencia de melanina, un pigmento que también aporta resistencia estructural a las plumas de vuelo.',
      'El Spinosaurus aegyptiacus fue descrito originalmente por Ernst Stromer en 1915 a partir de fósiles encontrados en Egipto, pero los especímenes originales fueron destruidos durante el bombardeo aliado del museo de Múnich en 1944. Durante décadas, Spinosaurus fue conocido solo por dibujos y descripciones de Stromer. En 2014, Nizar Ibrahim de la Universidad de Chicago encontró nuevos fósiles en Marruecos que revelaron que Spinosaurus era radicalmente diferente a cualquier otro dinosaurio conocido: con 15 metros de largo, patas traseras cortas, cola aplanada lateralmente como la de un tritón y una densidad ósea aumentada para el lastre acuático, era un depredador semiacuático que cazaba peces gigantes en los ríos del norte de África hace 97 millones de años. Ningún otro dinosaurio conocido muestra adaptaciones tan claras a la vida en el agua.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El fósil de Hallucigenia sparsa, descubierto en Burgess Shale (508 millones de años), fue reconstruido al revés durante más de 60 años. Simon Conway Morris lo describió en 1977 con las espinas dorsales como patas y los tentáculos como espinas de defensa. Recién en 1991, investigadores chinos encontraron fósiles mejor preservados del género en Chengjiang y demostraron que la reconstrucción original estaba invertida: las espinas iban arriba (como defensa) y los tentáculos abajo (como patas). Además, lo que se interpretaba como la cabeza era en realidad el extremo posterior del animal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los fósiles de Ediacara (575-541 millones de años), encontrados en las Colinas de Ediacara, Australia del Sur, representan la primera comunidad de organismos multicelulares macroscópicos conocida. Dickinsonia, Kimberella y Charnia tenían formas que no se parecen a ningún organismo vivo actual: discos segmentados, hojas fractales y cuerpos acolchados sin boca, ano ni órganos internos discernibles. La naturaleza exacta de estos organismos sigue debatida: algunos investigadores los clasifican como animales primitivos, otros como hongos gigantes y otros como un reino extinto sin descendientes modernos.' },
    ],
    fact: 'El Coelacanth (Latimeria chalumnae) fue descrito a partir de fósiles que datan del Devónico (410 millones de años) y se creía extinto desde el Cretácico (66 millones de años) hasta que la curadora de museo Marjorie Courtenay-Latimer identificó un ejemplar vivo capturado por pescadores en la costa de Sudáfrica el 22 de diciembre de 1938. El ictiólogo J.L.B. Smith lo confirmó en 1939 y lo llamó "el hallazgo zoológico más importante del siglo XX". Una segunda población fue descubierta en 1997 en Indonesia (Latimeria menadoensis). El celacanto tiene aletas con estructura ósea que se mueven de forma alternada como las extremidades de un tetrápodo, recordando la transición de pez a anfibio.',
  },
];

// ——— Fossil Particle Field (Canvas Background) ——————————————————————————
function FossilField() {
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
      hue: Math.random() > 0.5 ? '93,138,104' : '193,120,41', // teal or sienna
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

// ——— Fossil Header ———————————————————————————————————————————————————————
function FossilHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Geological arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#fossilGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5D8A68','#C17829','#6B8E96','#8B5E3C','#A67B3D','#7D6B99','#3E7C8B'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central fossil icon (ammonite) */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="9" fill="none" stroke="#5D8A68" strokeWidth="1" opacity="0.4" />
        <circle cx="300" cy="30" r="4" fill="#5D8A68" opacity="0.5" />
        <path d="M300 16 Q314 30 300 44" fill="none" stroke="#5D8A68" strokeWidth="1" opacity="0.3" />
        <defs>
          <linearGradient id="fossilGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(93,138,104,0.9)" />
            <stop offset="100%" stopColor="rgba(93,138,104,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5D8A68" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">FÓSILES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(93,138,104,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">CÓMO LOS ENCONTRAMOS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) —————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(93,138,104,0.2)'}`,
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
          layoutId="activeDotDinosM9"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ——— Conditional Video ——— */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} />
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

// ——— Progress Bar ————————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(93,138,104,0.15)',
    }}>
      <Star size={14} style={{ color: '#5D8A68', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5D8A68, #C17829)', borderRadius: '3px', boxShadow: '0 0 8px rgba(93,138,104,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5D8A68', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————————
export default function InteractiveInfographic_DinosM9() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/dinosaurios/dinos_m9.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(93,138,104,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <FossilField />

      <FossilHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(93,138,104,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(93,138,104,0.08)', borderRadius: '16px',
              border: '1px solid rgba(93,138,104,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5D8A68', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado todos los secretos de los fósiles!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Paleontólogo
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
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
