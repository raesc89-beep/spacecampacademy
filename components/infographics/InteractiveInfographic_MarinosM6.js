'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Marine Crocodilian themed) ————————————————————
function DecoCrocSkull({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Elongated skull outline */}
      <ellipse cx="30" cy="28" rx="22" ry="12" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="28" rx="15" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Eye sockets */}
      <circle cx="20" cy="24" r="3" fill={color} opacity="0.3" />
      <circle cx="40" cy="24" r="3" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M8 28 Q20 40 30 38 Q40 40 52 28" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Teeth */}
      {[12, 18, 24, 30, 36, 42, 48].map((x, i) => (
        <line key={i} x1={x} y1="34" x2={x} y2="38" stroke={color} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function DecoFlipper({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Paddle-shaped limb */}
      <path d="M15 15 Q25 10 35 15 Q45 22 48 35 Q45 45 35 48 Q25 46 18 38 Q12 28 15 15Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      {/* Fin rays */}
      <line x1="25" y1="18" x2="35" y2="40" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="15" x2="40" y2="38" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="20" x2="28" y2="44" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Water ripples */}
      <path d="M5 50 Q15 46 25 50 Q35 54 45 50" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M10 55 Q20 51 30 55 Q40 59 50 55" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

function DecoWaves({ size = 80, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M0 20 Q10 10 20 20 Q30 30 40 20 Q50 10 60 20 Q70 30 80 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M0 28 Q10 18 20 28 Q30 38 40 28 Q50 18 60 28 Q70 38 80 28" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M0 12 Q10 5 20 12 Q30 19 40 12 Q50 5 60 12 Q70 19 80 12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Bubbles */}
      <circle cx="15" cy="8" r="1.5" fill={color} opacity="0.4" />
      <circle cx="55" cy="6" r="1" fill={color} opacity="0.3" />
      <circle cx="70" cy="10" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSaltGland({ size = 60, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Gland shape */}
      <ellipse cx="30" cy="30" rx="18" ry="12" fill={color} opacity="0.1" stroke={color} strokeWidth="1.2" />
      <ellipse cx="30" cy="30" rx="10" ry="7" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Salt crystals expelled */}
      <circle cx="52" cy="25" r="2" fill={color} opacity="0.5" />
      <circle cx="55" cy="32" r="1.5" fill={color} opacity="0.4" />
      <circle cx="50" cy="38" r="1" fill={color} opacity="0.3" />
      <circle cx="8" cy="22" r="1.5" fill={color} opacity="0.4" />
      <circle cx="10" cy="36" r="1" fill={color} opacity="0.3" />
      {/* Ducts */}
      <path d="M42 26 Q48 25 52 25" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M42 34 Q47 36 50 38" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoTailFluke({ size = 70, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Tail vertebrae */}
      <line x1="5" y1="30" x2="35" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {[10, 16, 22, 28].map((x, i) => (
        <circle key={i} cx={x} cy="30" r="2" fill={color} opacity="0.4" />
      ))}
      {/* Hypocercal fluke */}
      <path d="M35 30 Q42 18 55 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M35 30 Q42 42 55 48" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M45 15 Q50 20 55 12" fill={color} opacity="0.15" />
      <path d="M45 45 Q50 40 55 48" fill={color} opacity="0.15" />
      {/* Motion lines */}
      <line x1="2" y1="25" x2="8" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="2" y1="35" x2="8" y2="35" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoFossil({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Rock matrix */}
      <rect x="8" y="8" rx="8" ry="8" width="44" height="44" fill={color} opacity="0.08" stroke={color} strokeWidth="1.2" />
      {/* Fossil skeleton */}
      <path d="M15 30 Q20 25 30 28 Q40 25 48 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Ribs */}
      {[22, 27, 32, 37].map((x, i) => (
        <line key={i} x1={x} y1="28" x2={x - 1} y2="38" stroke={color} strokeWidth="1" opacity="0.35" strokeLinecap="round" />
      ))}
      {/* Skull */}
      <circle cx="15" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="14" cy="29" r="1" fill={color} opacity="0.4" />
      {/* Cracks in rock */}
      <path d="M10 15 L18 20" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <path d="M42 12 L46 18" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'thalattosuchia-intro': [DecoCrocSkull, DecoWaves, DecoFossil],
  'metriorhynchus-aletas': [DecoFlipper, DecoTailFluke, DecoWaves],
  'dakosaurus-apex': [DecoCrocSkull, DecoFlipper, DecoFossil],
  'steneosaurus-primitivos': [DecoFossil, DecoCrocSkull, DecoWaves],
  'adaptaciones-oceano': [DecoSaltGland, DecoTailFluke, DecoFlipper],
  'machimosaurus-gigante': [DecoFossil, DecoCrocSkull, DecoSaltGland],
  'herencia-moderna': [DecoWaves, DecoSaltGland, DecoTailFluke],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Young, M.T. et al. (2010). The evolution of Metriorhynchoidea: new insights from Cricosaurus. PLOS ONE, 5(12), e14157',
  'Fanti, F. et al. (2016). The largest thalattosuchian (Crocodylomorpha) supports gondwanan vicariance. Cretaceous Research, 61, 295–307',
  'Steel, R. (1973). Crocodylia. Handbuch der Paläoherpetologie, Part 16. Gustav Fischer Verlag, Stuttgart',
  'Wilberg, E.W. (2015). What\'s in an Outgroup? The Impact of Outgroup Choice on the Phylogenetic Position of Thalattosuchia. Zoological Journal of the Linnean Society, 175(4), 892–910',
  'Young, M.T. & Andrade, M.B. (2009). What is Geosaurus? Redescription of Geosaurus giganteus. Zoological Journal of the Linnean Society, 157(3), 551–585',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'thalattosuchia-intro',
    title: 'Cocodrilos: Los Otros Reptiles Marinos',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/marinos_m6.png',
    image: '/assets/reptiles_marinos/marinos_m6.png',
    content: [
      'Cuando pensamos en reptiles marinos prehistóricos, los plesiosaurios e ictiosaurios suelen acaparar la atención. Sin embargo, existió un grupo de cocodrilianos que abandonó la vida terrestre y se adaptó por completo al océano abierto: los talatosuquios (Thalattosuchia). Este superorden apareció durante el Jurásico Temprano, hace aproximadamente 200 millones de años, y prosperó durante más de 100 millones de años en los mares del Mesozoico. Su nombre proviene del griego "thalatto" (mar) y "souchos" (cocodrilo), y describe con precisión a estos cocodrilianos que intercambiaron las orillas de los ríos por las corrientes oceánicas profundas.',
      'Los talatosuquios se dividieron en dos grandes clados con estrategias de vida distintas. Los teleosáuridos mantuvieron un estilo de vida semi-acuático costero, conservando patas funcionales y armadura ósea, similar a los cocodrilos actuales pero con hocicos más alargados. Los metriorrínquidos, en cambio, tomaron un camino evolutivo radical: desarrollaron aletas en lugar de patas, una aleta caudal en la cola y perdieron completamente su armadura dérmica de osteodermos. Esta transformación representa una de las adaptaciones más completas al medio marino entre todos los arcosaurios.',
      'La diversidad del grupo fue notable. Se han descrito más de 60 especies distribuidas en Europa, América del Sur, América del Norte, África y posiblemente Asia. Los fósiles más antiguos datan del Toarciense (hace 183 millones de años), mientras que los últimos registros conocidos corresponden al Valanginiense (hace 133 millones de años) del Cretácico Inferior. Durante ese intervalo, los talatosuquios ocuparon nichos ecológicos que iban desde depredadores costeros especializados en peces hasta superdepredadores oceánicos capaces de cazar presas de gran tamaño.',
      'A diferencia de los cocodrilos modernos, que pertenecen al orden Crocodylia y están adaptados a ambientes de agua dulce o estuarios, los talatosuquios pertenecen a un linaje más basal dentro de Crocodylomorpha. Esto significa que no son ancestros directos de los cocodrilos actuales, sino primos evolutivos que exploraron un camino de vida completamente diferente. Su historia demuestra que los cocodrilianos no siempre fueron los habitantes de pantanos que conocemos hoy, sino un grupo con una plasticidad ecológica que les permitió conquistar hasta los océanos más profundos.',
      'Los primeros fósiles de talatosuquios fueron descritos en la década de 1820 por el naturalista francés Étienne Geoffroy Saint-Hilaire, quien identificó especímenes de Teleosaurus y Steneosaurus en las canteras de Caen, Normandía. Saint-Hilaire reconoció que estos animales eran cocodrilianos, pero sus proporciones marinas lo desconcertaron. Desde entonces, más de dos siglos de investigación paleontológica han revelado la historia de este grupo, con descubrimientos recientes en Argentina, Túnez y Alemania que continúan ampliando nuestro conocimiento sobre su anatomía, ecología y relaciones filogenéticas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer talatosuquio fue descrito incluso antes que el primer dinosaurio. Étienne Geoffroy Saint-Hilaire describió a Teleosaurus en 1825, mientras que el término "Dinosauria" no fue acuñado por Richard Owen hasta 1842, diecisiete años después. Esto convierte a los cocodrilos marinos en uno de los primeros grupos de reptiles fósiles reconocidos por la ciencia moderna, aunque su fama fue eclipsada por los dinosaurios terrestres que capturaron la imaginación pública.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los análisis filogenéticos de Wilberg (2015), publicados en el Zoological Journal of the Linnean Society, demostraron que la posición evolutiva de Thalattosuchia dentro de Crocodylomorpha depende del grupo externo utilizado en el análisis. Cuando se usan arcosaurios basales como grupo externo, los talatosuquios aparecen como un linaje temprano y separado de los cocodrilos modernos. Esta ambigüedad taxonómica ha generado un debate activo entre paleontólogos durante más de una década.' },
    ],
    fact: 'Los talatosuquios coexistieron durante millones de años con ictiosaurios y plesiosaurios en los mismos mares jurásicos, pero ocuparon nichos ecológicos distintos. Mientras los ictiosaurios dominaban la persecución de presas rápidas a alta velocidad y los plesiosaurios cazaban con sus cuellos largos, los talatosuquios combinaban mandíbulas poderosas con cuerpos hidrodinámicos para actuar como depredadores de emboscada y carroñeros oportunistas en aguas intermedias.',
  },
  {
    id: 'metriorhynchus-aletas',
    title: 'Metriorhynchus: Aletas en Vez de Patas',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/marinos_m6.png',
    image: '/assets/reptiles_marinos/marinos_m6.png',
    content: [
      'Metriorhynchus es el género que define al clado Metriorhynchidae, la familia de cocodrilos más adaptada al medio marino que jamás haya existido. Descubierto y descrito por el paleontólogo alemán Christian Erich Hermann von Meyer en 1830, este animal vivió durante el Jurásico Medio y Superior (hace entre 166 y 155 millones de años) en los mares que cubrían lo que hoy es Europa occidental. Con un tamaño de 2.5 a 3 metros de longitud, Metriorhynchus era un depredador ágil que cazaba peces, cefalópodos y otros animales marinos en aguas abiertas.',
      'La característica más notable de Metriorhynchus fue la transformación completa de sus extremidades. Las patas delanteras y traseras se modificaron en estructuras aplanadas similares a remos o paletas, con los huesos de los dedos acortados y ensanchados para funcionar como aletas. Esta modificación fue tan radical que Metriorhynchus habría sido incapaz de caminar en tierra firme. A diferencia de las focas, que conservan cierta capacidad de locomoción terrestre, los metriorrínquidos estaban atrapados en el océano de por vida, una condición que los paleontólogos denominan "pelágica obligada".',
      'Otro rasgo distintivo fue el desarrollo de una aleta caudal hipocercal en la cola. A diferencia de los peces, cuyas aletas caudales suelen tener el lóbulo superior más grande (heterocercal), la cola de Metriorhynchus tenía una curvatura descendente pronunciada en las últimas vértebras, soportando un lóbulo inferior de tejido blando que proporcionaba empuje hacia arriba. Esta configuración es análoga a la de los ictiosaurios y se conoce gracias a especímenes excepcionalmente preservados del yacimiento de Solnhofen, en Baviera, Alemania, donde las impresiones de tejido blando se conservaron en la caliza litográfica.',
      'Los metriorrínquidos también perdieron por completo los osteodermos, las placas óseas que forman la armadura característica de los cocodrilos. Esta pérdida redujo su peso corporal y mejoró la hidrodinámica, permitiéndoles nadar con menor resistencia al agua. Los análisis de densidad ósea realizados por Hua y Buffrénil en 1996 revelaron que los huesos de Metriorhynchus tenían una estructura esponjosa (osteoporótica) que reducía la densidad esquelética general, facilitando la flotabilidad neutra necesaria para un estilo de vida pelágico. Este mismo patrón se observa en cetáceos modernos como los delfines.',
      'Los fósiles de Metriorhynchus se han encontrado en Francia, Inglaterra, Alemania y Chile, lo que indica una distribución transatlántica durante el Jurásico. Los especímenes chilenos, descritos por Gasparini y Chong en 1977, extendieron el rango geográfico del género al hemisferio sur y sugieren que estos animales podían cruzar grandes extensiones de océano abierto. El contenido estomacal fosilizado de algunos especímenes europeos incluye restos de belemnites (cefalópodos extintos) y escamas de peces, confirmando una dieta activamente depredadora en la columna de agua.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las canteras de Solnhofen en Baviera, Alemania, que preservaron los fósiles de Metriorhynchus con impresiones de tejido blando, son el mismo yacimiento donde se descubrió el Archaeopteryx en 1861. La caliza litográfica de Solnhofen se formó en una laguna tropical poco profunda durante el Jurásico Superior, hace 150 millones de años, donde las condiciones anóxicas del fondo impidieron la descomposición y permitieron la preservación de detalles como plumas, aletas de tejido blando y contenido estomacal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Investigaciones de Fernández y Gasparini (2008) sobre el oído interno de Metriorhynchus, utilizando tomografía computarizada de alta resolución, revelaron que los canales semicirculares estaban modificados de forma similar a los de los cetáceos actuales. Esta adaptación del sistema vestibular indica que Metriorhynchus podía procesar los movimientos tridimensionales del medio acuático con precisión, una adaptación esencial para un depredador que cazaba en tres dimensiones bajo el agua.' },
    ],
    fact: 'La transformación de patas terrestres en aletas marinas en los metriorrínquidos ocurrió de manera independiente y convergente con al menos otros cuatro linajes de reptiles: los ictiosaurios, los plesiosaurios, las tortugas marinas y los mosasaurios. Cada grupo partió de un plan corporal terrestre diferente pero convergió en soluciones similares de extremidades aplanadas para la propulsión acuática, un fenómeno que los biólogos denominan evolución convergente y que demuestra las restricciones físicas que impone el medio marino sobre la forma del cuerpo.',
  },
  {
    id: 'dakosaurus-apex',
    title: 'Dakosaurus: El Cocodrilo T-Rex',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/marinos_m6.png',
    image: '/assets/reptiles_marinos/marinos_m6.png',
    content: [
      'Dakosaurus fue el depredador supremo entre los cocodrilos marinos del Jurásico Superior. Con una longitud estimada de 4 a 5 metros, este metriorrínquido se distinguía de todos sus parientes por poseer un cráneo masivo, corto y alto, con dientes grandes, comprimidos lateralmente y con bordes serrados, similares a los de los dinosaurios terópodos carnívoros. Esta combinación de rasgos le valió el apodo informal de "Godzilla" cuando el paleontólogo argentino Diego Pol y su equipo describieron la especie sudamericana D. andiniensis en 2005.',
      'El género fue descrito originalmente por Friedrich August von Quenstedt en 1856 a partir de dientes aislados encontrados en el Jurásico Superior de Alemania. El nombre Dakosaurus proviene del griego "dakos" (mordedor) y "sauros" (lagarto), una referencia directa a sus poderosos dientes. La especie tipo, D. maximus, vivió en los mares europeos entre el Kimmeridgiense y el Tithoniense (hace 157 a 145 millones de años), mientras que D. andiniensis habitó en el Pacífico sudamericano durante el mismo período, indicando una distribución global.',
      'Lo que hacía de Dakosaurus un depredador tan diferente era su cráneo. Mientras que la mayoría de los metriorrínquidos tenían hocicos largos y estrechos adaptados para capturar peces, Dakosaurus desarrolló un hocico extremadamente corto y profundo, con una mordida potente comparable a la de los grandes terópodos. Los análisis biomecánicos de Young et al. (2012) estimaron que la fuerza de mordida de Dakosaurus era suficiente para perforar hueso y desgarrar carne, lo que sugiere que cazaba presas grandes como otros reptiles marinos, tiburones y grandes cefalópodos.',
      'Los dientes de Dakosaurus presentan una morfología única entre los cocodrilianos. Son ziphodontes, es decir, comprimidos lateralmente con carenas denticuladas (bordes serrados como un cuchillo de carne), una adaptación convergente con los dientes de los dinosaurios terópodos como Allosaurus. Esta dentición cortante, combinada con su cráneo robusto, permitía a Dakosaurus una estrategia de alimentación basada en cortar y desgarrar, en lugar de la captura por succión o la retención que empleaban otros cocodrilos marinos con hocicos largos.',
      'Los fósiles de D. andiniensis descubiertos en la provincia de Neuquén, Argentina, incluyen un cráneo casi completo que reveló detalles anatómicos previamente desconocidos. El paladar estaba reforzado con huesos gruesos que distribuían las fuerzas de mordida, y las fosas nasales estaban retraídas hacia la parte superior del cráneo, una adaptación para respirar en la superficie sin exponer el cuerpo. Gasparini et al. (2006) publicaron la descripción detallada en la revista Science, destacando que Dakosaurus ocupaba el mismo nicho ecológico que los grandes tiburones depredadores actuales: el de superdepredador en el nivel trófico más alto del ecosistema marino.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando el cráneo de Dakosaurus andiniensis fue mostrado al público por primera vez en 2005, los medios de comunicación lo apodaron "Godzilla" por su apariencia robusta y atemorizante. El paleontólogo Diego Pol explicó que este nombre no era científico pero ayudaba a comunicar la idea central: este no era un cocodrilo común, sino un superdepredador marino con una cabeza proporcionalmente más grande y poderosa que cualquier cocodrilo actual, capaz de matar presas de su propio tamaño.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los dientes ziphodontes de Dakosaurus han sido estudiados mediante microscopía electrónica de barrido (SEM) por Andrade et al. (2010). Los análisis revelaron que las denticulaciones (serraciones) de los bordes tenían entre 3 y 5 dentículos por milímetro, un rango comparable al de los terópodos depredadores como Allosaurus y Torvosaurus. Esta convergencia morfológica a nivel micrométrico entre un cocodrilo marino y dinosaurios terópodos demuestra que las presiones selectivas de la macrodepredación producen soluciones dentales idénticas independientemente del linaje.' },
    ],
    fact: 'Dakosaurus y el ictiosaurio Ophthalmosaurus coexistieron en los mismos mares jurásicos europeos, pero sus estrategias de caza eran opuestas. Ophthalmosaurus tenía ojos de 23 centímetros de diámetro para cazar en aguas profundas y oscuras, mientras que Dakosaurus tenía mandíbulas capaces de generar más de 3,000 newtons de fuerza, suficiente para fracturar los caparazones de tortugas marinas. Uno era un especialista visual de las profundidades; el otro, un destructor mecánico de la zona fótica superior.',
  },
  {
    id: 'steneosaurus-primitivos',
    title: 'Steneosaurus y los Primitivos',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/marinos_m6.png',
    image: '/assets/reptiles_marinos/marinos_m6.png',
    content: [
      'Steneosaurus representa uno de los primeros y más exitosos linajes de cocodrilos marinos. Descrito por Geoffroy Saint-Hilaire en 1825, este teleosáurido vivió desde el Jurásico Inferior hasta el Jurásico Superior (hace entre 183 y 152 millones de años), abarcando un rango temporal de más de 30 millones de años. Con longitudes que variaban entre 2.5 y 5 metros según la especie, Steneosaurus fue un depredador costero semi-acuático que habitó las aguas someras de los mares epicontinentales europeos, donde cazaba peces y cefalópodos con su característico hocico largo y estrecho.',
      'El rasgo más distintivo de Steneosaurus era su cráneo longirostro, que podía alcanzar hasta un tercio de la longitud corporal total. Este hocico alargado estaba equipado con numerosos dientes cónicos interconectados que formaban una trampa eficiente para atrapar peces resbaladizos. Los análisis funcionales de Pierce et al. (2009) demostraron que los cráneos longirostros generan menor resistencia al agua durante los movimientos laterales rápidos de la cabeza, una técnica de captura similar a la que emplean los gaviales actuales (Gavialis gangeticus) en los ríos del subcontinente indio.',
      'Los fósiles de Steneosaurus son especialmente abundantes en los yacimientos de Holzmaden, en el estado de Baden-Württemberg, Alemania. Estas pizarras bituminosas del Toarciense (hace 182 millones de años) preservaron esqueletos completos y articulados de Steneosaurus junto con ictiosaurios, crinoideos y amonites, proporcionando una ventana detallada a un ecosistema marino jurásico completo. Algunos especímenes de Holzmaden conservan el contorno corporal como una película oscura de materia orgánica, revelando que Steneosaurus tenía un cuerpo fusiforme con una cola larga y lateralmente comprimida.',
      'A diferencia de los metriorrínquidos completamente marinos, Steneosaurus y otros teleosáuridos conservaron características que les permitían funcionar tanto en agua como en tierra. Mantenían extremidades con dedos articulados (no aletas), osteodermos que formaban una armadura dorsal protectora, y un cráneo con las fosas nasales en la punta del hocico, no retraídas hacia arriba. Estas características sugieren un estilo de vida comparable al de los cocodrilos de agua salada actuales: capaces de nadar largas distancias en el mar pero regresando a tierra para descansar, termorregularse y posiblemente anidar.',
      'Los teleosáuridos como Steneosaurus son considerados formas transicionales dentro de Thalattosuchia, representando un estadio evolutivo intermedio entre los cocodrilianos terrestres ancestrales y los metriorrínquidos completamente marinos. El registro fósil muestra una progresión gradual: los teleosáuridos más primitivos del Jurásico Inferior tenían proporciones corporales similares a las de los cocodrilos modernos, mientras que las especies del Jurásico Superior mostraban extremidades más reducidas, colas más comprimidas y reducción parcial de los osteodermos. Esta secuencia documenta la transición tierra-mar en tiempo real evolutivo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El yacimiento de Holzmaden ha producido más de 3,000 esqueletos de reptiles marinos desde que comenzaron las excavaciones en el siglo XIX. El museo municipal, fundado en 1936 por Bernhard Hauff, exhibe especímenes con preservación tan detallada que pueden verse las escamas individuales de la piel, el contenido estomacal con peces parcialmente digeridos, e incluso crías dentro de madres que murieron durante el parto. Estos fósiles se formaron cuando los cadáveres se hundieron en el fondo anóxico de un mar tropical poco profundo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El análisis isotópico de oxígeno (δ18O) realizado por Sélen et al. (2012) en los dientes de Steneosaurus demostró que estos animales vivían en ambientes de salinidad variable, desde agua marina hasta aguas salobres costeras. Este patrón isotópico es similar al observado en los cocodrilos de agua salada actuales (Crocodylus porosus), que se mueven libremente entre el mar, los estuarios y los ríos, y refuerza la interpretación de Steneosaurus como un animal eurihalino con amplia tolerancia a diferentes niveles de sal.' },
    ],
    fact: 'Las pizarras de Holzmaden preservaron un espécimen de Steneosaurus del Toarciense (hace 182 millones de años) que contiene los restos de un ictiosaurio juvenil en su cavidad estomacal. Este hallazgo, publicado por Martill en 1986 en la revista Palaeontology, constituye una de las evidencias más antiguas de depredación directa entre reptiles marinos y demuestra que los teleosáuridos no se limitaban a capturar peces, sino que también cazaban otros reptiles de menor tamaño cuando se presentaba la oportunidad.',
  },
  {
    id: 'adaptaciones-oceano',
    title: 'Adaptaciones al Océano',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/marinos_m6.png',
    image: '/assets/reptiles_marinos/marinos_m6.png',
    content: [
      'La conquista del océano por parte de los talatosuquios requirió una serie de adaptaciones fisiológicas y anatómicas que transformaron un plan corporal terrestre en una máquina de supervivencia marina. La más crítica fue el desarrollo de glándulas de sal especializadas. Los cocodrilos marinos, al igual que las tortugas marinas e iguanas marinas actuales, enfrentaban el problema constante de la acumulación de sal por la ingestión de agua marina. En los metriorrínquidos, las glándulas de sal estaban ubicadas en depresiones óseas especializadas en la región frontal del cráneo, denominadas fosas nasales preorbitales, y excretaban soluciones salinas concentradas para mantener el equilibrio osmótico.',
      'La forma del cuerpo experimentó una remodelación completa hacia la hidrodinámica. Los metriorrínquidos desarrollaron un perfil fusiforme (forma de torpedo) con la cabeza alineada con el cuerpo, eliminando la angulación típica del cráneo de los cocodrilos terrestres. La cola se alargó y comprimió lateralmente, culminando en la aleta caudal hipocercal que proporcionaba propulsión mediante ondulaciones verticales. Los modelos computacionales de Hua (1994) estimaron que un metriorrínquido de 3 metros podía alcanzar velocidades de crucero de 4 a 6 km/h y velocidades de persecución cortas de hasta 15 km/h.',
      'Los ojos de los talatosuquios marinos mostraron adaptaciones para la visión subacuática. Los anillos escleróticos, estructuras óseas que sostenían el globo ocular, eran proporcionalmente grandes en los metriorrínquidos, indicando ojos grandes adaptados a condiciones de baja luminosidad. Esto sugiere que estos animales cazaban a profundidades moderadas donde la luz era tenue, o bien que eran activos durante el crepúsculo y la noche. En contraste, los teleosáuridos costeros tenían anillos escleróticos más pequeños, consistentes con una actividad en aguas superficiales bien iluminadas.',
      'La capacidad de buceo de los metriorrínquidos ha sido estimada mediante el análisis de la microestructura ósea. Los estudios de Hua y Buffrénil (1996) revelaron una reducción progresiva de la densidad ósea (osteoporosis funcional) en los metriorrínquidos más derivados, lo que reducía la flotabilidad positiva y facilitaba la inmersión. Esta adaptación es análoga a la que presentan los cetáceos buceadores modernos. La combinación de huesos ligeros, aletas hidrodinámicas y musculatura axial potente habría permitido a estos animales sumergirse a profundidades de varias decenas de metros para cazar cefalópodos y peces demersales.',
      'El sistema respiratorio también debió adaptarse. Como reptiles, los talatosuquios respiraban aire y necesitaban salir a la superficie periódicamente. Las fosas nasales de los metriorrínquidos estaban retraídas hacia la parte posterior del hocico, cerca de los ojos, lo que les permitía respirar exponiendo solo la parte superior de la cabeza, similar a las ballenas y delfines actuales. Además, el paladar secundario óseo, una estructura que separa las vías respiratorias de las alimentarias, estaba completamente desarrollado, permitiendo retener presas en la boca mientras respiraban, una adaptación presente también en todos los cocodrilos modernos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las glándulas de sal de los cocodrilos marinos actuales, como Crocodylus porosus, pueden excretar soluciones con una concentración de sodio hasta cinco veces mayor que la del agua de mar. Sin embargo, esta capacidad tiene un costo energético alto: un cocodrilo marino gasta hasta el 8% de su metabolismo diario en la regulación osmótica. Los metriorrínquidos jurásicos, al vivir permanentemente en el mar, probablemente tenían glándulas de sal aún más eficientes que las de cualquier cocodrilo actual, dado que no podían acceder a fuentes de agua dulce.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los modelos de dinámica de fluidos computacional (CFD) aplicados por Molnar et al. (2015) al cuerpo reconstruido de Cricosaurus, un metriorrínquido emparentado con Metriorhynchus, demostraron que la pérdida de osteodermos redujo el arrastre hidrodinámico en un 15% comparado con un modelo hipotético armado. Además, la aleta caudal hipocercal generaba un impulso descendente que compensaba la flotabilidad positiva del pulmón lleno de aire, permitiendo al animal mantener una posición estable a profundidad sin esfuerzo muscular continuo.' },
    ],
    fact: 'La iguana marina de las Galápagos (Amblyrhynchus cristatus) es el único lagarto marino actual y comparte varias adaptaciones convergentes con los metriorrínquidos: glándulas de sal nasales para excretar el exceso de sodio, cola comprimida lateralmente para nadar y reducción de la frecuencia cardíaca durante el buceo. Sin embargo, la iguana marina bucea solo hasta 12 metros durante períodos cortos. Los metriorrínquidos, con sus aletas y cuerpos fusiformes, habrían sido buceadores mucho más capaces, posiblemente alcanzando profundidades de 50 a 100 metros.',
  },
  {
    id: 'machimosaurus-gigante',
    title: 'Machimosaurus: El Gigante',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/marinos_m6.png',
    image: '/assets/reptiles_marinos/marinos_m6.png',
    content: [
      'Machimosaurus rex es el talatosuquio más grande que se haya descubierto, con una longitud estimada de 7.15 metros y un peso de más de una tonelada. Descrito en 2016 por Federico Fanti, Andrea Cau, Mohsen Hassine y Michela Contessi en la revista Cretaceous Research, este teleosáurido gigante fue encontrado en la formación Douiret del sur de Túnez, en sedimentos del Valanginiense (Cretácico Inferior, hace aproximadamente 130 millones de años). El hallazgo fue significativo porque demostró que los talatosuquios sobrevivieron al límite Jurásico-Cretácico, un período de recambio faunístico que se creía les había sido fatal.',
      'El cráneo de Machimosaurus rex medía más de 155 centímetros de longitud, el más grande conocido para cualquier talatosuquio. A diferencia de Dakosaurus con sus dientes serrados para cortar, Machimosaurus tenía dientes romos, bulbosos y redondeados en la parte posterior de la mandíbula, diseñados para triturar en lugar de cortar. Esta dentición durófaga indica que Machimosaurus se alimentaba de presas con caparazones o conchas duras: tortugas marinas, amonites de concha gruesa y crustáceos de gran tamaño. La parte frontal del hocico tenía dientes más cónicos y afilados para capturar y sujetar las presas antes de transportarlas a los dientes trituradores posteriores.',
      'El descubrimiento tunecino fue particularmente importante por su contexto geológico. Los sedimentos de la formación Douiret se depositaron en un ambiente de laguna costera somera conectada al océano Tetis, indicando que M. rex habitaba en aguas poco profundas y cálidas. Fanti et al. (2016) argumentaron que este hallazgo refutaba la hipótesis de que todos los talatosuquios se extinguieron al final del Jurásico. En cambio, algunos linajes sobrevivieron al menos 15 millones de años más en refugios costeros del norte de África, separados geográficamente de sus parientes europeos.',
      'El género Machimosaurus fue descrito originalmente por el paleontólogo alemán Hermann von Meyer en 1837 a partir de fragmentos encontrados en Portugal y Francia. Durante más de 150 años, las especies europeas (M. hugii, M. mosae y M. buffetauti) eran conocidas por material fragmentario, y su tamaño máximo se estimaba en unos 5 metros. El descubrimiento de M. rex en Túnez no solo estableció un nuevo récord de tamaño para el grupo, sino que demostró que los talatosuquios africanos habían alcanzado dimensiones considerablemente mayores que sus contrapartes europeas.',
      'La importancia biogeográfica de Machimosaurus rex reside en lo que nos dice sobre la fragmentación de Pangea. Durante el Jurásico, Europa y África todavía estaban conectadas parcialmente, permitiendo el intercambio de fauna marina costera. Para el Cretácico Inferior, la apertura del Atlántico central y el mar de Tetis habían aislado las poblaciones africanas de las europeas. Fanti et al. propusieron que esta separación geográfica, conocida como vicarianza gondwánica, fue el motor que permitió a las poblaciones africanas de Machimosaurus evolucionar hacia tamaños gigantes en ausencia de competencia con otros depredadores marinos que dominaban los mares europeos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La excavación de Machimosaurus rex en Túnez fue realizada en condiciones extremas. El equipo de Federico Fanti trabajó en el desierto del Sahara, a temperaturas superiores a 45°C, en una región remota del sur de Túnez accesible solo por caminos de tierra. Los fósiles estaban dispersos en una superficie de más de 15 metros cuadrados y tardaron tres campañas de campo (2014-2016) en ser completamente recuperados. Cada bloque de roca con fósiles fue envuelto en yeso y transportado en camiones hasta el museo de Tataouine.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los dientes de Machimosaurus presentan un patrón de desgaste que ha sido analizado mediante microtomografía de rayos X (micro-CT) por Fanti et al. Las superficies de trituración muestran estrías y fracturas consistentes con el procesamiento repetido de materiales duros como conchas calcáreas y caparazones de tortuga. La dureza del esmalte dental de Machimosaurus, medida en la escala de Vickers, es un 30% superior a la del esmalte de los cocodrilos modernos, una adaptación que le permitía resistir las fuerzas repetitivas de la alimentación durófaga sin fracturarse.' },
    ],
    fact: 'Con 7.15 metros de longitud, Machimosaurus rex era ligeramente más grande que el cocodrilo de agua salada actual más grande confirmado por medición científica: un ejemplar de 6.17 metros capturado en Filipinas en 2011, conocido como "Lolong". Sin embargo, Machimosaurus pertenece a una rama completamente diferente del árbol evolutivo de los cocodrilianos. La convergencia en tamaño gigante entre un teleosáurido jurásico y un crocodílido moderno sugiere que existe un límite superior de tamaño corporal para los depredadores acuáticos ectotérmicos con mandíbulas, impuesto por restricciones metabólicas y de termorregulación.',
  },
  {
    id: 'herencia-moderna',
    title: 'La Herencia Moderna',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/marinos_m6.png',
    image: '/assets/reptiles_marinos/marinos_m6.png',
    content: [
      'Aunque los talatosuquios se extinguieron durante el Cretácico Inferior (hace unos 130 millones de años), su legado ecológico pervive en un reptil moderno que demuestra que los cocodrilos nunca abandonaron del todo el mar: Crocodylus porosus, el cocodrilo de agua salada o cocodrilo marino. Con una distribución que abarca desde la India oriental hasta el norte de Australia, pasando por el Sudeste Asiático y las islas del Pacífico occidental, C. porosus es el reptil vivo más grande del planeta, con machos que alcanzan rutinariamente los 5 metros y registros excepcionales que superan los 6 metros de longitud.',
      'Crocodylus porosus posee glándulas de sal funcionales en la lengua que le permiten excretar el exceso de sodio y vivir indefinidamente en agua marina. Estudios de telemetría satelital realizados por Campbell et al. (2010) demostraron que estos animales realizan travesías oceánicas de hasta 590 kilómetros, aprovechando las corrientes marinas superficiales para conservar energía. Un individuo marcado con transmisor satelital recorrió 411 kilómetros en 25 días a través del mar abierto entre Australia y Papúa Nueva Guinea, manteniéndose en la corriente ecuatorial del Pacífico.',
      'La tolerancia a la salinidad de C. porosus es compartida en menor grado por otras especies de cocodrílidos, como el cocodrilo americano (Crocodylus acutus), que habita estuarios y costas del Caribe y el Pacífico centroamericano, y el cocodrilo del Nilo (Crocodylus niloticus), que ocasionalmente se adentra en ambientes marinos. Sin embargo, ninguna especie moderna ha desarrollado las adaptaciones pelágicas extremas de los metriorrínquidos. Los cocodrilos actuales nadan con movimientos laterales de la cola y sus patas con membranas interdigitales, pero no poseen aletas verdaderas ni aletas caudales especializadas.',
      'La comparación entre los talatosuquios extintos y los cocodrilos marinos modernos revela un patrón de evolución convergente parcial. Ambos grupos desarrollaron glándulas de sal, tolerancia a la salinidad y comportamiento pelágico. Sin embargo, los metriorrínquidos llevaron estas adaptaciones mucho más lejos: perdieron la capacidad de caminar, desarrollaron aletas hidrodinámicas y se convirtieron en animales completamente acuáticos. Los cocodrilos actuales, en cambio, mantienen un estilo de vida anfibio que les permite explotar recursos tanto terrestres como marinos, una estrategia que ha demostrado ser evolutivamente más resiliente a largo plazo.',
      'La supervivencia de los cocodrilos a través de las cinco grandes extinciones masivas de la historia de la Tierra (Ordovícico, Devónico, Pérmico, Triásico y Cretácico) es un testimonio de la eficacia de su plan corporal generalista. Mientras que los talatosuquios, al especializarse en el medio marino, se volvieron vulnerables a los cambios oceanográficos del Cretácico Inferior, los linajes de cocodrilos semi-acuáticos sobrevivieron precisamente porque podían cambiar entre ambientes. El registro fósil muestra que las especies más especializadas de cualquier grupo tienen mayor riesgo de extinción cuando cambian las condiciones ambientales, un principio conocido en paleobiología como la "trampa de la especialización".'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2011, un cocodrilo de agua salada de 6.17 metros fue capturado vivo en el municipio de Bunawan, Filipinas, tras una operación que involucró a más de 100 personas y duró tres semanas. Bautizado como "Lolong" en honor al cazador que lideró la captura, fue confirmado por el Libro Guinness de los Récords como el cocodrilo más grande en cautiverio. Lolong pesaba 1,075 kilogramos y su cráneo medía 70 centímetros de largo. Vivió en un santuario hasta su muerte natural en febrero de 2013.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de Grigg y Kirshner (2015), publicado en el libro "Biology and Evolution of Crocodylians" por CSIRO Publishing, documentó que Crocodylus porosus puede reducir su tasa metabólica hasta un 60% durante travesías oceánicas prolongadas, entrando en un estado de letargo activo donde minimiza los movimientos y se deja llevar por las corrientes. Este mecanismo de conservación de energía, combinado con su capacidad de almacenar grandes reservas de grasa, le permite sobrevivir semanas sin alimentarse en el océano abierto, una capacidad que los talatosuquios probablemente compartían.' },
    ],
    fact: 'Los cocodrilos pertenecen al clado Archosauria, el mismo grupo que incluye a las aves y los dinosaurios extintos. Un cocodrilo de agua salada está más estrechamente emparentado con un gorrión que con cualquier lagarto o serpiente. Los talatosuquios jurásicos y los cocodrilos modernos comparten este linaje arcosauriano, pero divergieron hace más de 200 millones de años. La capacidad de conquistar el mar evolucionó de forma independiente en ambos linajes, separados por un abismo temporal mayor que el que separa a los primeros dinosaurios del ser humano actual.',
  },
];

// ——— Ocean Particle Field (Canvas Background) ——————————————————————
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94',
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

// ——— Marine Crocs Header ————————————————————————————————————————————
function MarineCrocsHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#marinoCrocGrad)" strokeWidth="2.5" strokeLinecap="round" />
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
        {/* Central croc jaw icon */}
        <path d="M290 22 L295 38 L300 22 L305 38 L310 22" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="300" cy="18" rx="14" ry="6" fill="none" stroke="#5B7B9A" strokeWidth="1.2" opacity="0.5" />
        <defs>
          <linearGradient id="marinoCrocGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">COCODRILOS MARINOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">THALATTOSUCHIA · JURÁSICO A CRETÁCICO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ————————————————————
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
          layoutId="activeDotMarinosM6"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* Video Player */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
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

// ——— Progress Bar ————————————————————————————————————————————————————
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

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_MarinosM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/marinos_m6.png)',
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

      <MarineCrocsHeader />

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
              🏆 ¡Has explorado todos los cocodrilos marinos del Mesozoico!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Buzo del Triásico
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
