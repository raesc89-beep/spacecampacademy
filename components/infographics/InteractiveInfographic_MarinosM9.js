'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Fossils themed) ────────────────────────
function DecoAmmonite({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Spiral shell */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="30" cy="30" r="2.5" fill={color} opacity="0.5" />
      {/* Chamber lines */}
      <line x1="30" y1="6" x2="30" y2="12" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="54" y1="30" x2="48" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="54" x2="30" y2="48" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="6" y1="30" x2="12" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Radial ribs */}
      {[45, 135, 225, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 18 * Math.cos(rad)} y1={30 + 18 * Math.sin(rad)} x2={30 + 24 * Math.cos(rad)} y2={30 + 24 * Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.35" />;
      })}
    </svg>
  );
}

function DecoFossilLayers({ size = 80, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Sediment layers */}
      <path d="M5 12 Q20 8 40 12 Q60 16 75 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M5 22 Q25 18 45 22 Q65 26 75 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.45" />
      <path d="M5 32 Q30 28 50 32 Q65 36 75 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M5 42 Q20 38 40 42 Q60 46 75 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.35" />
      {/* Embedded fossil shapes */}
      <circle cx="25" cy="17" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <ellipse cx="55" cy="27" rx="5" ry="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="38" cy="37" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoMarineSkull({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.22, ...style }}>
      {/* Elongated marine reptile skull */}
      <path d="M8 22 Q10 14 20 12 L55 10 Q65 12 62 20 L60 24 Q58 28 50 28 L18 28 Q10 28 8 22Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Eye socket */}
      <circle cx="22" cy="18" r="4" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="22" cy="18" r="1.5" fill={color} opacity="0.3" />
      {/* Teeth */}
      {[35, 40, 45, 50, 55].map((x, i) => (
        <line key={i} x1={x} y1="26" x2={x} y2="30" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      ))}
      {/* Jaw line */}
      <path d="M18 28 Q30 32 60 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoPickaxe({ size = 60, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Handle */}
      <line x1="15" y1="45" x2="42" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* Pick head */}
      <path d="M36 12 Q42 8 50 10 L44 18 Q40 22 36 20 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
      <path d="M36 20 Q32 24 28 22 L34 14 Z" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      {/* Rock chips */}
      <circle cx="50" cy="25" r="1.5" fill={color} opacity="0.4" />
      <circle cx="48" cy="32" r="1" fill={color} opacity="0.3" />
      <circle cx="12" cy="50" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoWave({ size = 70, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 70 35" style={{ opacity: 0.22, ...style }}>
      {/* Ocean waves */}
      <path d="M5 18 Q12 10 20 18 Q28 26 35 18 Q42 10 50 18 Q58 26 65 18" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
      <path d="M8 26 Q15 20 22 26 Q29 32 36 26 Q43 20 50 26 Q57 32 64 26" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      {/* Bubbles */}
      <circle cx="18" cy="8" r="1.5" fill={color} opacity="0.4" />
      <circle cx="45" cy="6" r="1" fill={color} opacity="0.3" />
      <circle cx="58" cy="10" r="1.8" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoMagnifier({ size = 60, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Lens */}
      <circle cx="24" cy="24" r="16" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="24" cy="24" r="12" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Handle */}
      <line x1="36" y1="36" x2="52" y2="52" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      {/* Glare */}
      <path d="M16 14 Q18 10 22 12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      {/* Fossil inside lens */}
      <circle cx="24" cy="24" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <circle cx="24" cy="24" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'fosiles-mary-anning': [DecoPickaxe, DecoFossilLayers, DecoAmmonite],
  'ictiosaurio-holzmaden': [DecoMarineSkull, DecoFossilLayers, DecoAmmonite],
  'mosasaurio-maastricht': [DecoMarineSkull, DecoPickaxe, DecoWave],
  'western-interior-seaway': [DecoWave, DecoFossilLayers, DecoMarineSkull],
  'descubrimientos-sudamerica': [DecoAmmonite, DecoPickaxe, DecoWave],
  'tecnicas-modernas': [DecoMagnifier, DecoFossilLayers, DecoMarineSkull],
  'fosiles-visitar': [DecoAmmonite, DecoMagnifier, DecoWave],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Emling, S. (2009). The Fossil Hunter: Dinosaurs, Evolution, and the Woman Whose Discoveries Changed the World. Palgrave Macmillan.',
  'Everhart, M.J. (2005). Oceans of Kansas: A Natural History of the Western Interior Sea. Indiana University Press.',
  'Gasparini, Z., Salgado, L. & Coria, R.A. (2006). Patagonian Mesozoic Reptiles. Indiana University Press.',
  'Cadena, E.A. (2015). The first South American sandownid turtle from the Lower Cretaceous of Colombia. PeerJ, 3, e1431.',
  'Motani, R. (2005). Evolution of fish-shaped reptiles (Reptilia: Ichthyopterygia) in their physical environments and constraints. Annual Review of Earth and Planetary Sciences, 33, 395-420.',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'fosiles-mary-anning',
    title: 'Los Fósiles que Reescribieron la Historia',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/marinos_m9.png',
    image: '/assets/reptiles_marinos/marinos_m9.png',
    content: [
      'En 1811, en los acantilados de Lyme Regis, una localidad costera en el condado de Dorset, al sur de Inglaterra, una niña de 12 años llamada Mary Anning y su hermano Joseph descubrieron un cráneo de un metro de largo incrustado en la piedra caliza jurásica. Meses después, Mary excavó el esqueleto completo de lo que resultó ser un ictiosaurio, un reptil marino de 5.2 metros de longitud que había vivido hace aproximadamente 200 millones de años. Este hallazgo sacudió los cimientos de la historia natural británica y desafió las ideas religiosas predominantes sobre la creación y la extinción de las especies en la Inglaterra del siglo XIX.',
      'En 1823, Mary Anning realizó otro descubrimiento que transformó la paleontología: el primer esqueleto casi completo de un plesiosaurio, un reptil marino con un cuello de longitud notable y cuatro aletas en forma de remo. El espécimen, ahora clasificado como Plesiosaurus dolichodeirus, medía 3.5 metros y presentaba 35 vértebras cervicales. Georges Cuvier, el célebre anatomista francés, dudó inicialmente de la autenticidad del fósil porque la anatomía era diferente a cualquier animal conocido hasta entonces, pero tras examinar los datos aceptó que el hallazgo era genuino y representaba una forma de vida sin precedentes.',
      'Los acantilados de Lyme Regis pertenecen a la Formación Lias, rocas sedimentarias depositadas durante el Jurásico inferior, entre 200 y 190 millones de años atrás. Estas capas de lutita oscura, rica en materia orgánica, preservaron los fósiles en condiciones de baja concentración de oxígeno, lo que impidió la descomposición bacteriana y permitió la conservación detallada de huesos, dientes e incluso contenidos estomacales. La erosión costera del Canal de la Mancha expone constantemente nuevos fósiles, lo que convierte a esta costa en un laboratorio paleontológico activo que sigue produciendo hallazgos relevantes en la actualidad.',
      'Mary Anning también descubrió el primer pterosaurio fuera de Alemania en 1828, un Dimorphodon, y contribuyó a identificar los coprolitos (heces fosilizadas) como herramienta para reconstruir las dietas de animales extintos. William Buckland reconoció este uso a partir de las observaciones de Anning. Pese a sus contribuciones, Anning no pudo publicar artículos científicos formales porque las sociedades científicas británicas no admitían mujeres. Los científicos varones que publicaron sobre sus hallazgos a menudo omitieron mencionar su nombre en las descripciones taxonómicas.',
      'El legado científico de Mary Anning fue reconocido de manera póstuma. En 2010, la Royal Society incluyó a Anning en su lista de las diez mujeres británicas que más influyeron en la historia de la ciencia. El Museo de Historia Natural de Londres exhibe varios de sus especímenes originales, incluyendo el ictiosaurio de 1811 y el plesiosaurio de 1823. La costa de Dorset y Devon, donde ella trabajó, fue declarada Patrimonio de la Humanidad por la UNESCO en 2001 bajo el nombre de Costa Jurásica, en reconocimiento a su valor geológico y paleontológico para la comprensión de la historia de la vida en la Tierra.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mary Anning aprendió paleontología de forma autodidacta, vendiendo fósiles a turistas y coleccionistas desde los 11 años para sostener a su familia tras la muerte de su padre en 1810. Su padre, Richard Anning, era carpintero y recolector aficionado de fósiles. La familia vivía en la pobreza y dependía directamente de la venta de especímenes para comprar alimentos. A pesar de estas circunstancias, Mary aprendió anatomía comparada, geología estratigráfica y técnicas de excavación que la colocaron al nivel de los científicos profesionales de su época.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los acantilados de Lyme Regis contienen capas de Blue Lias, una formación de calizas y lutitas alternantes que se depositaron en un mar tropical poco profundo durante el Sinemuriano y Hettangiano (201-190 Ma). La riqueza fósil se debe a que el fondo marino carecía de oxígeno suficiente para sustentar organismos carroñeros, permitiendo que los cadáveres de reptiles marinos se preservaran articulados. Cada invierno, las tormentas del Canal de la Mancha erosionan entre 10 y 30 centímetros de roca, exponiendo nuevos fósiles que deben rescatarse antes de la siguiente marea alta.' },
    ],
    fact: 'El trabalenguas en inglés "She sells seashells by the seashore" fue compuesto en 1908 por Terry Sullivan y se cree que está inspirado en Mary Anning, quien vendía fósiles y conchas en la playa de Lyme Regis. El ictiosaurio que descubrió en 1811, catalogado como Temnodontosaurus platyodon, tenía ojos de 22 centímetros de diámetro, los más grandes de cualquier vertebrado conocido, lo que indica que cazaba en aguas profundas y oscuras donde la visión aguda era una ventaja para detectar presas bioluminiscentes.',
  },
  {
    id: 'ictiosaurio-holzmaden',
    title: 'El Ictiosaurio de Holzmaden',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/marinos_m9.png',
    image: '/assets/reptiles_marinos/marinos_m9.png',
    content: [
      'En las canteras de pizarra bituminosa de Holzmaden, en el suroeste de Alemania, estado de Baden-Wurtemberg, se han recuperado cientos de esqueletos de ictiosaurios del Jurásico inferior (183 millones de años). El descubrimiento más notable entre ellos es un espécimen de Stenopterygius quadriscissus que conserva embriones en su interior, lo que demuestra que estos reptiles marinos eran vivíparos: daban a luz crías vivas en el mar, en lugar de poner huevos en tierra como otros reptiles. Este hallazgo, realizado en la década de 1890 por el coleccionista Bernhard Hauff, transformó la comprensión de la biología reproductiva de los reptiles mesozoicos.',
      'La Formación Posidonia Shale (Posidonienschiefer), donde se encuentran estos fósiles, se depositó en un mar epicontinental del Toarciano que cubría gran parte de Europa central. Las aguas del fondo marino contenían concentraciones de oxígeno extremadamente bajas, un fenómeno llamado anoxia, que impedía la vida de organismos carroñeros y bacterias aeróbicas. Esta condición geoquímica permitió que los cadáveres de ictiosaurios se hundieran al fondo y quedaran cubiertos por sedimentos finos de arcilla sin ser perturbados, preservando no solo huesos sino también tejidos blandos como piel, aletas y contenidos gástricos.',
      'El taller de preparación de fósiles fundado por Bernhard Hauff en 1892 en Holzmaden desarrolló técnicas pioneras de excavación que permitieron extraer esqueletos completos con la roca circundante, presentándolos como relieves tridimensionales. Hauff descubrió que algunos ictiosaurios conservaban un contorno oscuro de carbono alrededor del esqueleto, representando la silueta original del cuerpo. Estas impresiones mostraron que los ictiosaurios poseían una aleta dorsal triangular y una aleta caudal con forma de media luna, características que no se podían deducir del esqueleto óseo solo y que revelaron su adaptación convergente con los delfines modernos y los atunes.',
      'Los análisis isotópicos de oxígeno (δ18O) realizados en dientes de Stenopterygius de Holzmaden han permitido determinar que estos animales mantenían una temperatura corporal constante cercana a los 35-39°C, independiente de la temperatura del agua circundante. Este metabolismo endotérmico, similar al de los mamíferos marinos actuales, les habría permitido nadar activamente en aguas frías y mantener velocidades de crucero de hasta 2 metros por segundo. Los estudios de Motani (2005) establecieron que la forma hidrodinámica de Stenopterygius reducía la resistencia al avance de manera comparable a la de un delfín nariz de botella.',
      'El Museo Hauff (Urweltmuseum Hauff), ubicado junto a las canteras de Holzmaden, exhibe más de 200 especímenes preparados, incluyendo el famoso "lirio de mar" (crinoideo) de 18 metros de longitud adherido a un tronco fosilizado. Los fósiles de la Formación Posidonia incluyen también amonites con sus conchas nacaradas preservadas, peces holósteos completos, cocodrilos marinos del género Steneosaurus y restos de belemnites con sus sacos de tinta todavía intactos. Las canteras continúan operando y siguen produciendo especímenes que enriquecen las colecciones de museos en Alemania, Reino Unido y Estados Unidos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El espécimen más conmovedor de Holzmaden muestra una hembra de Stenopterygius en el momento exacto de dar a luz: un embrión emerge parcialmente del canal de parto con la cola primero, de forma idéntica a como nacen los delfines y las ballenas actuales. Los paleontólogos identificaron al menos 10 especímenes diferentes con embriones en diversas etapas de desarrollo, lo que permitió reconstruir todo el ciclo reproductivo. Las hembras gestaban entre 1 y 11 crías simultáneamente, dependiendo de la especie y el tamaño corporal de la madre.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La tinta fosilizada de los belemnites de Holzmaden ha sido analizada químicamente y contiene eumelanina, el mismo pigmento que da color oscuro a la tinta de los calamares actuales. En el siglo XIX, los preparadores del taller Hauff reconstituyeron esta tinta fósil de 183 millones de años con agua y la utilizaron para dibujar ilustraciones de los propios fósiles. Los análisis con espectroscopía Raman confirmaron que la composición molecular de la tinta jurásica es prácticamente idéntica a la de Sepia officinalis, el calamar común europeo actual.' },
    ],
    fact: 'Los ojos de los ictiosaurios de Holzmaden contenían un anillo esclerótico: una estructura de placas óseas dentro del globo ocular que sostenía la forma del ojo bajo la presión del agua profunda. El Temnodontosaurus, el ictiosaurio más grande encontrado en Holzmaden con 12 metros de longitud, tenía ojos de 26.4 centímetros de diámetro protegidos por anillos escleróticos de 14 placas. Esta estructura permitía enfocar la vista tanto de cerca como de lejos ajustando la curvatura del cristalino, una adaptación que combinaba la visión nocturna de un búho con la resistencia a la presión de un submarino.',
  },
  {
    id: 'mosasaurio-maastricht',
    title: 'El Mosasaurio de Maastricht',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/marinos_m9.png',
    image: '/assets/reptiles_marinos/marinos_m9.png',
    content: [
      'En 1764, trabajadores de una cantera de caliza en la colina de San Pedro (Sint Pietersberg), cerca de la ciudad de Maastricht en los Países Bajos, desenterraron un cráneo de 1.2 metros de largo con mandíbulas repletas de dientes cónicos y afilados. El cirujano militar Johann Leonard Hoffmann adquirió el espécimen y lo estudió durante años. El canónigo Theodorus Joannes Godding, propietario del terreno, reclamó legalmente el fósil. Este conflicto de propiedad se convirtió en uno de los primeros litigios legales documentados sobre derechos de posesión de fósiles en la historia de la ciencia europea.',
      'En 1795, durante la invasión francesa de los Países Bajos, las tropas de Napoleón Bonaparte confiscaron el cráneo de Maastricht como botín de guerra. Según los relatos históricos, el comandante francés ofreció 600 botellas de vino como recompensa a los soldados que localizaran y aseguraran el fósil, que el canónigo Godding había escondido en una cueva. Las tropas lo encontraron y lo trasladaron a París, donde fue depositado en el Museo Nacional de Historia Natural de Francia. El espécimen permanece allí hasta la actualidad, catalogado como MNHN AC 9648, y nunca ha sido devuelto a los Países Bajos.',
      'El anatomista francés Georges Cuvier examinó el cráneo de Maastricht en 1808 y lo identificó como un lagarto marino gigante, publicando su análisis en su obra "Recherches sur les ossemens fossiles". Cuvier demostró que el animal pertenecía al orden Squamata, emparentado con los varanos y las serpientes actuales, y no era un cocodrilo ni un pez como habían propuesto otros naturalistas. Este análisis fue fundamental para establecer el concepto de extinción como un fenómeno real en la historia de la vida, un concepto que muchos científicos y teólogos de la época rechazaban por considerarlo incompatible con la idea de una creación divina perfecta.',
      'El nombre Mosasaurus, que significa "lagarto del río Mosa" (el río Meuse que pasa por Maastricht), fue propuesto por William Daniel Conybeare en 1822. El propio nombre de la ciudad, Maastricht, deriva del latín "Trajectum ad Mosam" (cruce del Mosa). El animal vivió durante el Maastrichtiense, la última etapa del período Cretácico (72-66 millones de años), y la propia unidad de tiempo geológico lleva el nombre de la ciudad donde se encontró este fósil. Así, Maastricht dio nombre tanto a un género de reptiles marinos como a una subdivisión del tiempo geológico reconocida internacionalmente.',
      'Los mosasaurios eran depredadores que alcanzaban entre 3 y 17 metros de longitud dependiendo de la especie. Mosasaurus hoffmannii, la especie tipo basada en el cráneo de Maastricht, podía alcanzar 13 metros. Poseían una mandíbula con articulación flexible similar a la de las serpientes, lo que les permitía tragar presas grandes. Su cuerpo estaba cubierto de escamas romboidales similares a las de las serpientes actuales, como revelaron impresiones dérmicas preservadas en especímenes hallados en Jordania en 2011. Los mosasaurios se extinguieron hace 66 millones de años junto con los dinosaurios no avianos, los plesiosaurios y los pterosaurios durante el evento de extinción del Cretácico-Paleógeno.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cráneo de Maastricht cambió la forma en que los seres humanos entienden la historia de la vida. Antes de su estudio por Cuvier, la idea predominante era que ninguna especie podía extinguirse porque eso implicaría un "error" en la creación. Cuvier demostró con este fósil y otros que las extinciones eran un fenómeno natural repetido. Esto abrió el camino para que Charles Darwin propusiera su teoría de la evolución por selección natural 50 años después, ya que la extinción es un componente central del proceso evolutivo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Análisis de isótopos de oxígeno (δ18O) en dientes de mosasaurios han revelado que al menos algunas especies, como Prognathodon, regulaban su temperatura corporal de forma independiente al entorno, manteniendo temperaturas entre 35 y 39°C. Estudios publicados por Harrell et al. (2016) en la revista Palaeontology confirmaron que Mosasaurus hoffmannii tenía una tasa metabólica más cercana a la de los mamíferos marinos que a la de los reptiles modernos ectotérmicos, lo que explicaría su capacidad para colonizar océanos fríos a altas latitudes.' },
    ],
    fact: 'La mandíbula del Mosasaurus hoffmannii contenía un hueso pterigoides con dientes adicionales en el paladar, una característica que comparte con las serpientes y los varanos. Estos dientes palatinos funcionaban como un sistema de "agarre secundario": mientras las mandíbulas principales sujetaban la presa, los dientes del paladar la empujaban hacia la garganta. Los paleontólogos Lingham-Soliar y Nolf (1989) demostraron mediante marcas de mordida en huesos fósiles de tortugas que los mosasaurios podían ejercer una fuerza de mordida estimada en 13,000 newtons, comparable a la de un cocodrilo marino actual.',
  },
  {
    id: 'western-interior-seaway',
    title: 'Fósiles del Western Interior Seaway',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/marinos_m9.png',
    image: '/assets/reptiles_marinos/marinos_m9.png',
    content: [
      'Durante el Cretácico superior (100-66 millones de años), un mar interior poco profundo dividía Norteamérica en dos masas de tierra, extendiéndose desde el Golfo de México hasta el Océano Ártico. Este mar, denominado Western Interior Seaway (Vía Marítima Interior Occidental), alcanzaba 1,000 kilómetros de ancho y una profundidad máxima de 250 metros. Sus aguas cálidas y ricas en nutrientes sostenían un ecosistema diverso con mosasaurios, plesiosaurios, tortugas marinas gigantes del género Archelon (con una envergadura de aleta a aleta de 4.6 metros), tiburones y peces óseos de gran tamaño que no tienen equivalente en los océanos modernos.',
      'Los depósitos de creta (chalk) de Kansas occidental, específicamente la Formación Niobrara (87-82 Ma), constituyen uno de los yacimientos de vertebrados marinos fósiles más productivos del mundo. Estas rocas se formaron a partir de la acumulación de billones de caparazones microscópicos de cocolitofóridos, algas unicelulares que flotaban en la superficie del mar. La familia Sternberg, una dinastía de coleccionistas de fósiles que trabajó en Kansas durante cuatro generaciones entre 1876 y 1990, recolectó más de 700 especímenes de vertebrados marinos que hoy se exhiben en museos de todo el mundo.',
      'El fósil más célebre de Kansas es el espécimen de Xiphactinus audax conocido como "pez dentro de un pez" (fish-within-a-fish). Descubierto por George F. Sternberg en 1952 cerca de la localidad de Wakeeney, este pez depredador de 4.2 metros de longitud murió con un Gillicus arcuatus de 1.8 metros completo y sin digerir dentro de su cavidad abdominal. Los paleontólogos interpretan que el Xiphactinus tragó al Gillicus entero pero la presa era tan grande que le perforó el estómago, causando la muerte de ambos animales. El espécimen se exhibe en el Sternberg Museum of Natural History en Hays, Kansas.',
      'Charles H. Sternberg (1850-1943) fue el patriarca de la familia y comenzó a recolectar fósiles en Kansas en 1876 con financiamiento del paleontólogo Edward Drinker Cope. Sus tres hijos, George, Charles M. y Levi, continuaron el trabajo familiar. George F. Sternberg descubrió más de 30 especímenes tipo (ejemplares que definen una especie nueva para la ciencia) de reptiles y peces marinos del Cretácico. La colección Sternberg incluye esqueletos de Tylosaurus proriger de 12 metros, el mosasaurio más grande del Western Interior Seaway, con marcas de mordida de otros mosasaurios que demuestran comportamiento caníbal o competitivo entre depredadores.',
      'Los fósiles del Western Interior Seaway también preservan evidencia de las redes tróficas completas del ecosistema. Los coprolitos (heces fosilizadas) de mosasaurios contienen escamas de peces, fragmentos de conchas de amonites y restos de otros mosasaurios más pequeños. Las marcas de mordida en huesos de plesiosaurios indican que los mosasaurios los cazaban activamente. Los pterosaurios Pteranodon, con envergaduras de hasta 7.3 metros, pescaban en la superficie del mar y sus esqueletos a veces se encuentran junto con fósiles de peces y mosasaurios, sugiriendo que ocasionalmente eran capturados mientras posaban sobre el agua para alimentarse.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Archelon ischyros, la tortuga marina más grande que ha existido, fue encontrado en las Pierre Shale de Dakota del Sur en 1895 por el coleccionista Wieland. Medía 4.6 metros de envergadura (de aleta a aleta) y pesaba aproximadamente 2,200 kilogramos, el triple que una tortuga laúd actual. Su caparazón no era sólido sino un marco óseo cubierto de piel gruesa, similar al de la tortuga laúd moderna. El espécimen tipo se exhibe en el Peabody Museum de Yale.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Formación Niobrara preserva la química del agua del Cretácico en sus rocas. Los isótopos de carbono (δ13C) indican que la productividad del fitoplancton era 3 veces mayor que en los océanos actuales, lo que sostenía cadenas alimentarias con depredadores de tamaño corporal superior a cualquier equivalente moderno. La temperatura superficial del agua era de 28-32°C, similar a la del Golfo de México actual, y la salinidad era ligeramente inferior a la del océano abierto debido al aporte de ríos desde las montañas Rocosas en formación al oeste.' },
    ],
    fact: 'El Xiphactinus audax era un pez teleósteo depredador de hasta 6 metros de longitud que podía nadar a velocidades estimadas de 60 km/h, según cálculos hidrodinámicos basados en la forma de su cuerpo y la inserción de sus aletas. Sus dientes, de hasta 7 centímetros, estaban orientados hacia el interior de la boca para impedir que las presas escaparan. Se han encontrado más de 14 especímenes de Xiphactinus con contenidos estomacales preservados, lo que lo convierte en uno de los depredadores fósiles con la dieta mejor documentada de toda la paleontología de vertebrados.',
  },
  {
    id: 'descubrimientos-sudamerica',
    title: 'Descubrimientos en Sudamérica',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/marinos_m9.png',
    image: '/assets/reptiles_marinos/marinos_m9.png',
    content: [
      'La Formación Vaca Muerta, en la provincia de Neuquén, Argentina, es uno de los depósitos de reptiles marinos jurásicos más ricos del hemisferio sur. Estas rocas, depositadas entre 150 y 135 millones de años (Tithoniano-Valanginiano) en un mar que cubría el oeste de Argentina, han producido esqueletos de pliosaurios, ictiosaurios y cocodrilos marinos. En 2004, el paleontólogo Zulma Gasparini y su equipo describieron un pliosaurio de 7 metros de longitud cuyos dientes medían 15 centímetros, comparable en tamaño a Pliosaurus del Jurásico europeo. La formación debe su nombre al color negro de la roca, producto de la alta concentración de materia orgánica que hoy la convierte en una de las reservas de petróleo no convencional más importantes del mundo.',
      'En Colombia, la Formación Paja del departamento de Boyacá ha producido fósiles de reptiles marinos del Cretácico inferior (130-115 Ma) que incluyen plesiosaurios, ictiosaurios y el kronosaurio colombiano. En 2015, Edwin Cadena y sus colegas publicaron en la revista PeerJ la descripción de una tortuga marina sandownida del Cretácico inferior de Colombia, la primera de su tipo encontrada en Sudamérica. En 2019, investigadores de la Universidad Nacional de Colombia anunciaron el descubrimiento de un kronosaurio de 10 metros de longitud cuyos restos fueron encontrados por campesinos en Villa de Leyva. El espécimen conserva el cráneo de 2.4 metros y gran parte del esqueleto postcraneal.',
      'Chile ha contribuido con hallazgos de reptiles marinos en depósitos cretácicos de la Región de Atacama y la Región de Magallanes. En las rocas del Cretácico superior de Torres del Paine, investigadores chilenos y argentinos han encontrado restos de elasmosaurios, plesiosaurios de cuello largo de hasta 14 metros de longitud que habitaban los mares que bordeaban el extremo sur de Sudamérica. En 2001, el paleontólogo Rodrigo Otero describió restos de un elasmosaurio aristonectino de la Formación Quiriquina (70-66 Ma) en la región del Biobío, que representaba una de las últimas poblaciones de plesiosaurios antes de la extinción masiva del Cretácico-Paleógeno.',
      'Brasil posee yacimientos de reptiles marinos en la Cuenca de Araripe (Ceará) y en la Formación Romualdo del Cretácico inferior (110 Ma). Los fósiles de esta región incluyen tortugas marinas primitivas, cocodrilos marinos y peces de gran tamaño. En la Formación Romualdo se han encontrado nódulos calcáreos que preservan peces tridimensionalmente, con sus escamas, aletas y contenidos estomacales intactos. En 2018, paleontólogos brasileños describieron un cocodrilo marino del género Caririsuchus que habitaba las aguas costeras del noreste de Brasil cuando el Océano Atlántico se estaba abriendo y separando Sudamérica de África.',
      'Los descubrimientos sudamericanos han demostrado que los reptiles marinos del hemisferio sur tenían una diversidad comparable a la de Europa y Norteamérica. La Antártida, que durante el Cretácico estaba conectada a Sudamérica, ha producido fósiles de mosasaurios y plesiosaurios en la Isla Seymour (Isla Marambio). Un mosasaurio del género Kaikaifilu de 10 metros, descrito en 2016 por Otero y colaboradores, es uno de los depredadores marinos más grandes conocidos del hemisferio sur. Estos hallazgos demuestran que los mares cretácicos australes sostenían ecosistemas tan complejos y con depredadores tan grandes como los del hemisferio norte.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El nombre Kaikaifilu proviene de la mitología mapuche: Kai-Kai-Filu es la serpiente marina que según la leyenda provocaba terremotos y maremotos al luchar contra Treng-Treng-Filu, la serpiente de tierra. Los paleontólogos eligieron este nombre para el mosasaurio antártico en honor a la cultura del pueblo mapuche y porque el animal era un reptil marino que habitaba mares cercanos al territorio ancestral mapuche. Este tipo de nomenclatura, que incorpora lenguas indígenas, es una tendencia creciente en la paleontología latinoamericana para reconocer el patrimonio cultural de los pueblos originarios.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La Formación Vaca Muerta contiene una concentración de carbono orgánico total (TOC) de entre 2 y 8 por ciento, lo que indica que el fondo marino jurásico era anóxico (sin oxígeno). Esta anoxia creó condiciones ideales para la fosilización porque impedía que los organismos carroñeros descompusieran los cadáveres. Los geoquímicos han determinado mediante isótopos de molibdeno (δ98Mo) que la anoxia se extendía por toda la cuenca marina, no solo en bolsas locales, lo que explica la uniformidad de la preservación fósil a lo largo de miles de kilómetros cuadrados en Neuquén y Mendoza.' },
    ],
    fact: 'Villa de Leyva, en el departamento de Boyacá, Colombia, alberga un kronosaurio in situ: el esqueleto permanece en el lugar exacto donde fue encontrado, protegido por un museo construido directamente sobre el fósil. Este pliosaurio de 10 metros vivió hace 125 millones de años en un mar cálido y poco profundo que cubría lo que hoy es la cordillera Oriental de los Andes colombianos. El cráneo, de 2.4 metros de longitud, contiene dientes de 10 centímetros dispuestos en una mandíbula que podía abrirse 1.5 metros, lo que lo convierte en uno de los depredadores marinos más grandes del Cretácico inferior en el registro fósil global.',
  },
  {
    id: 'tecnicas-modernas',
    title: 'Técnicas Modernas de Estudio',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/marinos_m9.png',
    image: '/assets/reptiles_marinos/marinos_m9.png',
    content: [
      'La tomografía computarizada (CT) ha transformado la paleontología de reptiles marinos al permitir visualizar estructuras internas de los fósiles sin necesidad de destruir la roca que los rodea. Los escáneres médicos estándar generan imágenes con resolución de 0.5 milímetros, suficiente para estudiar la anatomía craneal de mosasaurios y plesiosaurios. En 2010, investigadores de la Universidad de Utrecht utilizaron CT para reconstruir el cerebro de un mosasaurio Prognathodon y descubrieron que poseía bulbos olfatorios grandes (para detectar olores en el agua), lóbulos ópticos bien desarrollados (visión aguda) y un cerebelo proporcionalmente similar al de los tiburones actuales, lo que sugiere capacidades de natación coordinada y ágil.',
      'Los sincrotrones, aceleradores de partículas que generan rayos X de alta energía, permiten obtener imágenes de fósiles con resolución micrométrica (hasta 0.001 milímetros). El European Synchrotron Radiation Facility (ESRF) en Grenoble, Francia, ha escaneado dientes de ictiosaurios revelando líneas de crecimiento diario similares a los anillos de los árboles. Estos datos permitieron al equipo de Motani (2014) determinar que los dientes de Ichthyosaurus crecían a una tasa de 45 micrómetros por día y se reemplazaban cada 60-80 días, un ciclo de reemplazo dental más rápido que el de los cocodrilos actuales (90-120 días) y similar al de los tiburones.',
      'El análisis de isótopos estables es una herramienta geoquímica que permite reconstruir la dieta, la temperatura corporal y el hábitat de los reptiles marinos extintos. Los isótopos de oxígeno (δ18O) en el esmalte dental indican la temperatura del agua donde vivía el animal. Los isótopos de carbono (δ13C) revelan la posición en la cadena alimentaria: valores más altos indican depredadores de nivel superior. Bernard et al. (2010) publicaron en la revista Science un estudio que demostró, mediante isótopos de oxígeno en dientes, que los ictiosaurios y plesiosaurios mantenían temperaturas corporales de 35-39°C, confirmando que eran animales de sangre caliente.',
      'La fotogrametría tridimensional utiliza cientos de fotografías tomadas desde diferentes ángulos para generar modelos digitales precisos de fósiles. Esta técnica permite crear réplicas virtuales de especímenes que pueden compartirse entre investigadores de todo el mundo sin necesidad de transportar los frágiles originales. El proyecto MorphoSource, alojado en la Universidad de Duke, contiene más de 150,000 modelos 3D de fósiles accesibles de forma gratuita. Los modelos 3D de cráneos de mosasaurios han permitido realizar análisis biomecánicos computarizados (análisis de elementos finitos) que simulan las fuerzas de mordida y determinan cómo se distribuía el estrés mecánico en los huesos durante la alimentación.',
      'El ADN ambiental (eDNA) y las proteínas antiguas representan la frontera más reciente de la paleontología molecular. Aunque el ADN no sobrevive más de 1-2 millones de años en condiciones óptimas, las proteínas como el colágeno pueden preservarse en huesos de hasta 80 millones de años. En 2019, Lindgren y colegas publicaron en Nature un estudio que identificó melanosomas (estructuras celulares que contienen pigmentos) en la piel fosilizada de un ictiosaurio de 180 millones de años de Holzmaden, determinando que el animal tenía la espalda oscura y el vientre claro, un patrón de camuflaje llamado contrasombreado que usan los delfines y tiburones actuales para mimetizarse con la superficie y el fondo del mar respectivamente.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El análisis de elementos finitos (FEA), una técnica de ingeniería utilizada para diseñar puentes y aviones, se aplica ahora a cráneos fósiles de reptiles marinos. Los investigadores crean modelos 3D del cráneo, asignan propiedades mecánicas al hueso (densidad, elasticidad) y simulan fuerzas de mordida. Un estudio FEA de Tylosaurus proriger reveló que su cráneo podía soportar fuerzas laterales de impacto de hasta 25,000 newtons, lo que sugiere que estos mosasaurios usaban la cabeza como ariete para aturdir presas grandes antes de morderlas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los melanosomas preservados en la piel del ictiosaurio de Holzmaden tenían forma oblonga (elongada), que en animales modernos produce color negro o marrón oscuro. Los melanosomas esféricos, que producen colores rojizos, no se encontraron en la región dorsal del animal. El patrón de contrasombreado (dorso oscuro, vientre claro) es una adaptación visual convergente presente en más de 80 especies de mamíferos y peces marinos actuales. Vista desde arriba, la espalda oscura se confunde con las profundidades; vista desde abajo, el vientre claro se confunde con la luz de la superficie.' },
    ],
    fact: 'La espectroscopía Raman, una técnica que analiza las vibraciones moleculares de un material cuando se ilumina con un láser, ha permitido identificar proteínas originales en huesos fósiles de reptiles marinos sin destruir las muestras. En 2018, investigadores suecos utilizaron espectroscopía Raman para confirmar la presencia de eumelanina, feomelanina y colágeno tipo I en la piel fosilizada de un Stenopterygius de 180 millones de años. Estos resultados demostraron que la preservación molecular en fósiles marinos es más común de lo que se creía anteriormente, abriendo la posibilidad de reconstruir la apariencia externa y la coloración de animales extintos con base en evidencia directa.',
  },
  {
    id: 'fosiles-visitar',
    title: 'Fósiles Marinos que Puedes Visitar',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/marinos_m9.png',
    image: '/assets/reptiles_marinos/marinos_m9.png',
    content: [
      'El Museo de Historia Natural de Londres (Natural History Museum) alberga los especímenes originales de Mary Anning, incluyendo el ictiosaurio descubierto en 1811 y el plesiosaurio de 1823. La Galería de Reptiles Marinos del museo exhibe más de 30 esqueletos montados de ictiosaurios, plesiosaurios y mosasaurios, organizados cronológicamente desde el Triásico hasta el Cretácico. El espécimen más visitado es un Rhomaleosaurus cramptoni de 7 metros de longitud, un pliosaurio jurásico que cuelga del techo de la galería y cuyo cráneo de 1.5 metros contiene 200 dientes interconectados. La entrada al museo es gratuita y recibe aproximadamente 5.4 millones de visitantes al año.',
      'El Smithsonian National Museum of Natural History en Washington D.C. posee una de las colecciones más completas de fósiles marinos del Western Interior Seaway. La Deep Time Exhibition, inaugurada en junio de 2019 tras una renovación de 110 millones de dólares, exhibe esqueletos de Tylosaurus proriger de 10 metros y un Xiphactinus audax completo. El museo también presenta reconstrucciones digitales interactivas que permiten a los visitantes explorar el ecosistema del mar cretácico de Kansas con visualizaciones de realidad aumentada. La colección de investigación del Smithsonian contiene más de 40 millones de especímenes, siendo la mayor colección de historia natural del mundo.',
      'El Museo de La Plata, en la provincia de Buenos Aires, Argentina, es el museo de ciencias naturales más importante de Sudamérica y exhibe una colección significativa de reptiles marinos del Jurásico y Cretácico argentino. La Sala de Paleontología de Vertebrados presenta esqueletos de plesiosaurios patagónicos, incluyendo un elasmosaurio de 12 metros de la Formación Allen (70 Ma) y un pliosaurio de Vaca Muerta. El museo fue fundado en 1884 por Francisco P. Moreno y su edificio neoclásico, con una fachada sostenida por seis columnas corintias, es en sí mismo un monumento histórico nacional que recibe 500,000 visitantes anuales.',
      'El Urweltmuseum Hauff en Holzmaden, Alemania, es el museo especializado más importante del mundo para ictiosaurios y fauna marina del Jurásico inferior. Fundado por Bernhard Hauff en 1936, exhibe esqueletos de Stenopterygius con embriones, el crinoideo fósil más largo del mundo (18 metros adherido a un tronco) y peces con sus escamas originales preservadas. El museo permite a los visitantes observar el proceso de preparación de fósiles en vivo a través de ventanas que dan al taller de restauración. En las canteras adyacentes, los visitantes pueden excavar sus propios fósiles de amonites y belemnites bajo supervisión profesional pagando una tarifa de entrada.',
      'Las visitas virtuales han democratizado el acceso a los fósiles marinos. El proyecto Google Arts & Culture incluye recorridos 360° por las galerías de paleontología del Museo de Historia Natural de Londres, el Museo de La Plata y el Senckenberg Museum de Frankfurt. La plataforma MorphoSource de la Universidad de Duke ofrece modelos 3D descargables de más de 2,000 especímenes de reptiles marinos que pueden manipularse en un navegador web, rotándolos y ampliándolos para examinar cada detalle anatómico. El Museo Nacional de Colombia en Bogotá ofrece un tour virtual del kronosaurio de Villa de Leyva con información interactiva sobre la anatomía y ecología del animal, accesible desde cualquier dispositivo con conexión a internet.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Natural History Museum de Londres fue diseñado por el arquitecto Alfred Waterhouse y se inauguró en 1881. El edificio combina elementos de la arquitectura románica y gótica, con columnas decoradas con relieves de plantas y animales tanto extintos como actuales. Las columnas del ala occidental muestran fósiles de amonites y belemnites esculpidos en terracota, mientras que las del ala oriental presentan animales vivos. Waterhouse incluyó estos detalles deliberadamente para que el propio edificio comunicara la historia de la vida en la Tierra a los visitantes antes de que entraran a las galerías.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La plataforma MorphoSource utiliza fotogrametría de superficie estructurada y escaneo láser para crear modelos 3D con precisiones de hasta 50 micrómetros (0.05 milímetros). Cada modelo contiene entre 2 y 50 millones de polígonos y pesa entre 100 MB y 5 GB. Los investigadores pueden descargar estos modelos, imprimirlos en 3D a escala real o ampliada, y realizar análisis morfométricos cuantitativos sin tocar el fósil original. Desde su lanzamiento en 2013, MorphoSource ha sido citado en más de 1,500 publicaciones científicas revisadas por pares.' },
    ],
    fact: 'El Senckenberg Naturmuseum en Frankfurt, Alemania, exhibe un esqueleto montado de Temnodontosaurus trigonodon, uno de los ictiosaurios más grandes conocidos con 12 metros de longitud. El espécimen fue preparado con la técnica Hauff, que conserva el esqueleto en relieve dentro de su matriz de roca original. Lo que hace único a este ejemplar es que preserva el contorno de carbono del cuerpo entero, revelando que la aleta dorsal triangular medía 45 centímetros de altura y la aleta caudal tenía un lóbulo inferior óseo y un lóbulo superior compuesto solo de tejido blando, de forma análoga pero invertida respecto a la cola de los tiburones actuales.',
  },
];

// ─── Ocean Particle Field (Canvas Background) ──────────────────────────────
function OceanField() {
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94', // slate blue or soft copper
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

// ─── Fossil Header ──────────────────────────────────────────────────────────
function FossilHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#fossilGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B7B9A','#B87D5E','#6E8FA8','#8B6B4A','#7C93A8','#9E7B5C','#4A6F8C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central fossil icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="8" fill="none" stroke="#5B7B9A" strokeWidth="0.8" opacity="0.4" />
        <circle cx="300" cy="30" r="3" fill="#5B7B9A" opacity="0.5" />
        <defs>
          <linearGradient id="fossilGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">FÓSILES MARINOS FAMOSOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">TESOROS DE LAS PROFUNDIDADES DEL TIEMPO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ────────────────────────────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(91,123,154,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
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
          layoutId="activeDotMarinosM9"
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

// ─── Expandable Section with Random Direction ───────────────────────────────
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

// ─── Magazine-Style Content Panel ───────────────────────────────────────────
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase',
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

// ─── Progress Bar ───────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(91,123,154,0.15)',
    }}>
      <Star size={14} style={{ color: '#5B7B9A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B7B9A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(91,123,154,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5B7B9A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ─────────────────────────────────────────────
export default function InteractiveInfographic_MarinosM9() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/marinos_m9_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,123,154,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <OceanField />

      <FossilHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(91,123,154,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(91,123,154,0.08)', borderRadius: '16px',
              border: '1px solid rgba(91,123,154,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5B7B9A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado todos los fósiles marinos famosos!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Paleontólogo Marino
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
