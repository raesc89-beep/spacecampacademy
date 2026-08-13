'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ━━━ SVG Decorative Elements (Prehistoric Sea Turtle themed) ━━━━━━━━━━━━━━━━
function DecoTurtleShell({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Domed shell silhouette */}
      <ellipse cx="30" cy="34" rx="24" ry="16" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M6 34 Q30 8 54 34" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Scute pattern */}
      <line x1="30" y1="18" x2="30" y2="50" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="22" x2="18" y2="46" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="42" y1="22" x2="42" y2="46" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M10 30 Q30 26 50 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M12 38 Q30 34 48 38" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoFlipper({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Flipper shape */}
      <path d="M20 15 Q10 30 15 45 Q25 50 35 42 Q40 30 30 18 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Bone lines inside flipper */}
      <line x1="25" y1="20" x2="22" y2="38" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="25" y1="20" x2="28" y2="36" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="25" y1="20" x2="32" y2="32" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Water droplets */}
      <circle cx="42" cy="20" r="1.5" fill={color} opacity="0.4" />
      <circle cx="48" cy="28" r="1" fill={color} opacity="0.3" />
      <circle cx="45" cy="38" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoAmmonite({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Spiral shell */}
      <path d="M30 30 Q30 18 38 18 Q46 18 46 26 Q46 34 38 38 Q30 42 22 38 Q14 34 14 26 Q14 14 26 12 Q42 10 50 22 Q54 34 46 44" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Chamber lines */}
      <line x1="34" y1="18" x2="36" y2="24" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="44" y1="24" x2="40" y2="28" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="40" y1="36" x2="34" y2="34" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="30" cy="30" r="2.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoWaves({ size = 80, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M0 20 Q10 10 20 20 Q30 30 40 20 Q50 10 60 20 Q70 30 80 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M0 28 Q10 18 20 28 Q30 38 40 28 Q50 18 60 28 Q70 38 80 28" fill="none" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M0 12 Q10 5 20 12 Q30 19 40 12 Q50 5 60 12 Q70 19 80 12" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
      {/* Bubbles */}
      <circle cx="15" cy="8" r="1.5" fill={color} opacity="0.4" />
      <circle cx="55" cy="6" r="1" fill={color} opacity="0.3" />
      <circle cx="70" cy="10" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoFossil({ size = 70, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Fossil imprint in rock */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Skeleton outline */}
      <ellipse cx="30" cy="28" rx="14" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Spine */}
      <line x1="16" y1="28" x2="44" y2="28" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Ribs */}
      {[20, 25, 30, 35, 40].map((x, i) => (
        <line key={i} x1={x} y1="22" x2={x} y2="34" stroke={color} strokeWidth="0.7" opacity="0.3" />
      ))}
      {/* Head */}
      <circle cx="44" cy="28" r="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Tail */}
      <path d="M16 28 Q12 24 8 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoEgg({ size = 60, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Egg shape */}
      <ellipse cx="30" cy="32" rx="14" ry="18" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Crack lines */}
      <path d="M22 26 L26 30 L23 34" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M38 24 L35 28 L37 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Sand grains */}
      <circle cx="12" cy="48" r="1.5" fill={color} opacity="0.4" />
      <circle cx="20" cy="50" r="1" fill={color} opacity="0.3" />
      <circle cx="40" cy="50" r="1.5" fill={color} opacity="0.4" />
      <circle cx="48" cy="48" r="1" fill={color} opacity="0.3" />
      {/* Beach surface */}
      <path d="M5 48 Q30 44 55 48" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'tortugas-tiempo-profundo': [DecoTurtleShell, DecoFossil, DecoAmmonite],
  'archelon-gigante': [DecoFlipper, DecoWaves, DecoTurtleShell],
  'protostega-viajera': [DecoWaves, DecoFlipper, DecoFossil],
  'secreto-caparazon': [DecoTurtleShell, DecoFossil, DecoAmmonite],
  'tierra-mar-vuelta': [DecoEgg, DecoWaves, DecoFlipper],
  'tortugas-agua-dulce': [DecoFossil, DecoTurtleShell, DecoWaves],
  'sobrevivientes-kpg': [DecoAmmonite, DecoEgg, DecoFossil],
};

// ━━━ Content Data ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BIBLIOGRAPHY = [
  'Hirayama, R. (1998). Oldest known sea turtle. Nature, 392, 705–708',
  'Cadena, E.A. et al. (2012). New turtle from the Paleocene of Colombia. Journal of Paleontology, 86(4), 689–698',
  'Li, C., Wu, X.C., Rieppel, O., Wang, L.T. & Zhao, L.J. (2008). An ancestral turtle from the Late Triassic of southwestern China. Nature, 456, 497–501',
  'Joyce, W.G. (2007). Phylogenetic relationships of Mesozoic turtles. Bulletin of the Peabody Museum of Natural History, 48(1), 3–102',
  'Gaffney, E.S. (1990). The comparative osteology of the Triassic turtle Proganochelys. Bulletin of the American Museum of Natural History, 194, 1–263',
  'Cadena, E.A. & Scheyer, T.M. (2015). First occurrence of Stupendemys (Pleurodira, Podocnemididae) in the Miocene of Venezuela. PeerJ, 3, e1128',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tortugas-tiempo-profundo',
    title: 'Sobrevivientes del Tiempo Profundo',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/marinos_m5.png',
    image: '/assets/reptiles_marinos/marinos_m5.png',
    content: [
      'Las tortugas son uno de los grupos de reptiles más antiguos que existen. Su registro fósil se extiende más de 220 millones de años, hasta el período Triásico Tardío. En ese tiempo, los dinosaurios apenas comenzaban a diversificarse y los primeros mamíferos eran criaturas del tamaño de un ratón. Las tortugas ya habían desarrollado su rasgo más distintivo: el caparazón. Esta estructura ósea, única entre los vertebrados, las ha acompañado a lo largo de tres extinciones masivas, permitiéndoles sobrevivir donde otros grupos desaparecieron por completo.',
      'El fósil de tortuga más antiguo que los paleontólogos han identificado con certeza es Proganochelys quenstedtii, descubierta en depósitos del Triásico Superior en Alemania, con una antigüedad aproximada de 210 millones de años. Este animal medía cerca de 1 metro de largo y poseía un caparazón completamente formado, pero conservaba rasgos primitivos que las tortugas modernas han perdido: dientes en el paladar y una cola con espinas protectoras. Proganochelys no podía retraer su cabeza dentro del caparazón como lo hacen las tortugas actuales.',
      'Durante el Triásico, el supercontinente Pangea comenzaba a fracturarse, creando nuevos mares poco profundos y costas. Estos ambientes costeros proporcionaron nichos ecológicos que algunas tortugas primitivas aprovecharon para hacer la transición hacia la vida acuática. Los fósiles hallados en Alemania, Tailandia, Argentina y China demuestran que las tortugas tuvieron una distribución global desde sus primeras etapas evolutivas, adaptándose a hábitats terrestres, de agua dulce y eventualmente marinos.',
      'La clasificación de las tortugas las divide en dos grandes grupos según cómo retraen la cabeza. Las Cryptodira la recogen verticalmente hacia atrás, plegando el cuello en forma de S. Las Pleurodira la doblan lateralmente bajo el borde del caparazón. Esta división tiene raíces muy profundas: estudios moleculares y morfológicos, como los publicados por Joyce en 2007 en el Bulletin of the Peabody Museum, estiman que ambos linajes se separaron hace al menos 180 millones de años, durante el Jurásico Temprano.',
      'El estudio de las tortugas fósiles ha revelado que el caparazón no apareció de golpe como una estructura completa. El registro fósil muestra una secuencia de formas intermedias que documentan su evolución gradual. Desde reptiles sin caparazón pero con costillas ensanchadas, pasando por especies con caparazón parcial como Odontochelys semitestacea, hasta las tortugas completamente acorazadas. Esta transición abarcó decenas de millones de años y constituye uno de los ejemplos más documentados de cambio morfológico mayor en la historia de los vertebrados.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las tortugas han sobrevivido a tres de las cinco grandes extinciones masivas de la historia de la Tierra: la extinción del final del Triásico (hace 201 millones de años), la del final del Jurásico y la del Cretácico-Paleógeno (hace 66 millones de años). Su metabolismo lento, capacidad de ayuno prolongado y adaptabilidad a distintos ambientes acuáticos les otorgaron ventajas de supervivencia que otros reptiles no poseían durante estos períodos de crisis ambiental.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Proganochelys quenstedtii fue descrita por primera vez por el paleontólogo alemán Georg Baur en 1887, a partir de fósiles del Keuper (Triásico Superior) de Württemberg, Alemania. Los análisis de Eugene Gaffney publicados en 1990 en el Bulletin of the American Museum of Natural History revelaron que este animal conservaba 62 dientes palatinos, una característica que ninguna tortuga moderna posee. El estudio de Gaffney sigue siendo la referencia fundamental sobre la anatomía de las tortugas primitivas.' },
    ],
    fact: 'El registro molecular sugiere que las tortugas están más emparentadas con los cocodrilos y las aves que con los lagartos y serpientes. Estudios de secuenciación genómica publicados entre 2012 y 2014 por equipos del Instituto BGI de Shenzhen y la Universidad de Boston ubicaron a las tortugas dentro del clado Archelosauria, junto con cocodrilos, dinosaurios y aves. Esto significa que la tortuga que ves en un estanque es prima lejana de un águila, no de una iguana. Este hallazgo cambió décadas de clasificación basada únicamente en la morfología.',
  },
  {
    id: 'archelon-gigante',
    title: 'Archelon: La Tortuga de 4 Metros',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/marinos_m5.png',
    image: '/assets/reptiles_marinos/marinos_m5.png',
    content: [
      'Archelon ischyros es la tortuga marina más grande que ha existido en la historia de la Tierra. Vivió durante el Cretácico Tardío, hace aproximadamente 75-70 millones de años, en las aguas cálidas del Western Interior Seaway, un mar poco profundo que dividía América del Norte en dos masas terrestres desde el Golfo de México hasta el Océano Ártico. Con una longitud de punta a punta de las aletas de hasta 4.6 metros y un peso estimado de 2,200 kilogramos, Archelon era del tamaño de un automóvil compacto.',
      'El primer esqueleto casi completo de Archelon fue descubierto en 1895 por el colector Wieland en la Formación Pierre Shale de Dakota del Sur, Estados Unidos. Este espécimen, catalogado como YPM 3000, se conserva en el Peabody Museum of Natural History de la Universidad de Yale. El cráneo medía 60 centímetros de largo y poseía un pico córneo sin dientes, similar al de las tortugas marinas actuales, adaptado para triturar moluscos, crustáceos y medusas de los mares cretácicos.',
      'A diferencia de las tortugas terrestres con caparazones macizos, Archelon tenía un caparazón reducido formado por un armazón de costillas ensanchadas cubiertas probablemente por una capa gruesa de piel coriácea, similar a lo que se observa hoy en la tortuga laúd (Dermochelys coriacea). Esta adaptación reducía el peso total del animal, permitiéndole nadar con mayor eficiencia en mar abierto. Las extremidades anteriores se habían transformado en aletas de gran envergadura, ideales para la propulsión en el agua mediante movimientos de vuelo subacuático.',
      'Los estudios de crecimiento basados en las líneas de detención del crecimiento (LAGs) en los huesos de Archelon sugieren que estos animales podían vivir más de 100 años. La tasa de crecimiento era lenta comparada con otros reptiles marinos del Cretácico. El análisis isotópico del oxígeno en los huesos, realizado por investigadores de la Universidad de Kansas, indica que Archelon habitaba aguas con temperaturas entre 20 y 25 grados Celsius, consistentes con un clima cálido subtropical en el interior del continente.',
      'El Western Interior Seaway donde vivía Archelon albergaba un ecosistema marino diverso. Compartía hábitat con mosasaurios como Tylosaurus (depredadores de hasta 14 metros), plesiosaurios como Elasmosaurus, y tiburones como Cretoxyrhina, que medía 7 metros. Los fósiles de Archelon a menudo muestran marcas de mordidas de mosasaurios en las aletas, lo que indica que estos animales eran presa frecuente de los grandes depredadores marinos del Cretácico. Su estrategia de supervivencia dependía del gran tamaño corporal y del caparazón protector.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El espécimen YPM 3000 de Archelon en Yale tiene una aleta posterior que muestra signos de haber sido amputada y cicatrizada durante la vida del animal. Esto significa que una de las aletas traseras fue arrancada, probablemente por el ataque de un depredador como un mosasaurio, pero la tortuga sobrevivió y la herida sanó. Las líneas de crecimiento óseo muestran que vivió años después de perder la aleta, lo que demuestra la resistencia de estos animales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Archelon pertenece a la familia Protostegidae, un grupo de tortugas marinas gigantes que se extinguió al final del Cretácico. Los análisis filogenéticos de Hirayama (1998), publicados en Nature, establecieron que los protostégidos no son ancestros directos de las tortugas marinas modernas (familia Cheloniidae), sino una rama evolutiva separada. Las tortugas marinas actuales, como la tortuga verde y la carey, evolucionaron independientemente de un linaje diferente de tortugas costeras.' },
    ],
    fact: 'Archelon consumía una dieta basada principalmente en medusas y moluscos de cuerpo blando, similar a la dieta de la tortuga laúd moderna. El análisis de la forma del cráneo y la mecánica de la mandíbula, realizado por Claude et al. en 2004, reveló que su pico generaba una fuerza de mordida moderada, insuficiente para triturar conchas gruesas pero perfecta para atrapar presas gelatinosas. La tortuga laúd actual de 500 kg consume hasta 200 kg de medusas por día. Si escalamos esta proporción al tamaño de Archelon, habría necesitado cerca de 900 kg de medusas diarias para mantener su metabolismo.',
  },
  {
    id: 'protostega-viajera',
    title: 'Protostega: La Viajera del Cretácico',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/marinos_m5.png',
    image: '/assets/reptiles_marinos/marinos_m5.png',
    content: [
      'Protostega gigas fue otra tortuga marina gigante del Cretácico Tardío, aunque de tamaño menor que su pariente Archelon. Con una longitud total de aproximadamente 3 metros y un peso estimado de 800-900 kilogramos, Protostega era aún así más grande que cualquier tortuga marina viva en la actualidad. Vivió hace unos 83-85 millones de años en el mismo Western Interior Seaway que Archelon, pero en un período ligeramente anterior, lo que sugiere que ocupó nichos ecológicos similares en épocas diferentes.',
      'El diseño del caparazón de Protostega era notablemente más reducido que el de Archelon. Las costillas que formaban el armazón del caparazón eran más delgadas y estaban más separadas, dejando amplios espacios entre ellas. Esta estructura ultraligera indica una adaptación extrema a la vida pelágica en mar abierto. El paleontólogo Edward Drinker Cope describió esta especie en 1872 a partir de fósiles encontrados en Kansas, en depósitos que durante el Cretácico formaban el lecho de un mar tropical cálido.',
      'Las aletas anteriores de Protostega eran proporcionalmente más largas que las de Archelon en relación con el tamaño del cuerpo. Esta característica sugiere que Protostega era una nadadora más ágil y veloz, capaz de recorrer grandes distancias en mar abierto. Los estudios de hidrodinámica comparada realizados por Motani en 2002 demostraron que la relación entre la longitud de la aleta y el área del cuerpo en Protostega se asemeja a la de los albatros entre las aves: un diseño optimizado para el desplazamiento eficiente sobre grandes distancias.',
      'Los fósiles de Protostega se han encontrado en formaciones geológicas que abarcan desde Kansas hasta Alabama, cubriendo una amplia franja del antiguo mar interior. El análisis de los sedimentos donde aparecen estos fósiles indica ambientes de aguas abiertas, lejos de la costa. Esto contrasta con otros reptiles marinos del mismo período que preferían aguas costeras. Protostega probablemente realizaba migraciones estacionales similares a las tortugas marinas modernas, siguiendo corrientes oceánicas y fuentes de alimento.',
      'En 2001, el investigador Mike Everhart documentó un espécimen juvenil de Protostega encontrado dentro del estómago fosilizado de un tiburón Cretoxyrhina mantelli de 5 metros. Este hallazgo proporcionó evidencia directa de las relaciones depredador-presa en los mares del Cretácico. Los juveniles de Protostega, sin la protección completa del caparazón de los adultos, eran vulnerables a los grandes depredadores. Las tasas de mortalidad juvenil debieron ser altas, compensadas posiblemente por una alta producción de huevos, un patrón que se observa en las tortugas marinas actuales.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Edward Drinker Cope y Othniel Charles Marsh, los dos paleontólogos más prolíficos del siglo XIX, compitieron ferozmente por descubrir y nombrar nuevas especies durante la llamada Guerra de los Huesos (1877-1892). Protostega fue una de las especies nombradas durante este período. Cope y Marsh describieron entre ambos más de 130 especies de dinosaurios y reptiles marinos, aunque la rivalidad los llevó a cometer errores y duplicar nombres. Protostega sobrevivió a la revisión taxonómica y sigue siendo un género válido.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La familia Protostegidae, a la que pertenecen tanto Protostega como Archelon, desarrolló un caparazón reducido mediante un proceso llamado pedomorfosis: los adultos retienen características que normalmente solo aparecen en las etapas embrionarias. En las tortugas embrionarias, el caparazón comienza como costillas separadas que luego se fusionan. Los protostégidos detuvieron este proceso de fusión, manteniendo costillas separadas en la edad adulta. Esto les dio un caparazón más ligero pero menos protector.' },
    ],
    fact: 'La extinción de los protostégidos al final del Cretácico dejó vacante el nicho de las grandes tortugas marinas pelágicas durante millones de años. Las tortugas marinas modernas (familia Cheloniidae) no alcanzaron tamaños comparables hasta mucho después. La tortuga laúd actual, Dermochelys coriacea, con sus 2.2 metros y 700 kg, es la tortuga marina más grande del presente, pero sigue siendo considerablemente menor que Archelon. Dermochelys desarrolló independientemente un caparazón de piel coriácea similar al de los protostégidos, un caso notable de evolución convergente separado por más de 60 millones de años.',
  },
  {
    id: 'secreto-caparazon',
    title: 'El Secreto del Caparazón',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/marinos_m5.png',
    image: '/assets/reptiles_marinos/marinos_m5.png',
    content: [
      'El caparazón de las tortugas es una de las estructuras más singulares de todo el reino animal. Está formado por la fusión de las costillas, las vértebras y elementos dérmicos en una caja ósea que rodea los órganos internos. Ningún otro vertebrado ha modificado su esqueleto de esta manera. Las costillas, que en todos los demás vertebrados se mueven para permitir la respiración, en las tortugas están soldadas al caparazón y son completamente rígidas. Por eso las tortugas no pueden expandir y contraer el pecho; en su lugar, usan músculos especializados que bombean aire mediante movimientos del cuello y las extremidades.',
      'El descubrimiento clave que reveló cómo evolucionó el caparazón fue la descripción de Odontochelys semitestacea por Li et al. en 2008, publicada en la revista Nature. Este fósil, hallado en sedimentos del Triásico Tardío de Guizhou, China, con una antigüedad de 220 millones de años, mostraba una tortuga con plastrón completo (la parte ventral del caparazón) pero sin caparazón dorsal cerrado. En lugar de un caparazón superior completo, Odontochelys tenía costillas ensanchadas que no se habían fusionado. Este hallazgo demostró que el caparazón evolucionó de abajo hacia arriba.',
      'Antes de Odontochelys, los paleontólogos debatían dos hipótesis sobre el origen del caparazón. La hipótesis compuesta proponía que el caparazón se formó por la fusión de osteodermos (placas óseas dérmicas, como las de los cocodrilos) con las costillas. La hipótesis de transformación proponía que el caparazón evolucionó directamente por el ensanchamiento progresivo de las costillas sin contribución de osteodermos. Los fósiles de Odontochelys apoyaron la segunda hipótesis, ya que no mostraban ningún rastro de osteodermos en la parte dorsal.',
      'En 2015, el descubrimiento de Pappochelys rosinae en el Triásico Medio de Alemania (240 millones de años) por Schoch y Sues proporcionó otro eslabón en la cadena evolutiva. Pappochelys tenía costillas anchas y gastralias (costillas ventrales) engrosadas que comenzaban a fusionarse, representando una etapa intermedia entre un reptil sin caparazón y Odontochelys. Otro hallazgo relevante fue Eunotosaurus africanus del Pérmico de Sudáfrica (260 millones de años), con costillas extraordinariamente anchas pero sin fusión alguna.',
      'La secuencia evolutiva documentada por los fósiles sigue este orden: Eunotosaurus (costillas anchas, sin caparazón), Pappochelys (costillas anchas con gastralias fusionándose), Odontochelys (plastrón completo, caparazón dorsal incompleto) y Proganochelys (caparazón completamente cerrado). Esta transición abarcó aproximadamente 50 millones de años, desde el Pérmico Medio hasta el Triásico Tardío. Cada etapa proporcionó ventajas específicas: las costillas anchas ofrecían protección lateral, el plastrón protegía los órganos ventrales, y el cierre completo creó una fortaleza portátil contra los depredadores.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El caparazón de una tortuga contiene aproximadamente 60 huesos fusionados, incluyendo la columna vertebral, las costillas y placas dérmicas. Las tortugas no pueden salir de su caparazón porque este forma parte integral de su esqueleto, de la misma manera que un ser humano no puede salir de su caja torácica. Las tortugas de caparazón blando (familia Trionychidae) tienen los huesos del caparazón cubiertos por piel flexible en lugar de escudos córneos, pero el armazón óseo sigue estando fusionado a la columna.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los estudios de embriología realizados por Nagashima et al. en 2009 en la Universidad de Kobe, Japón, revelaron que durante el desarrollo embrionario de las tortugas, las costillas crecen hacia afuera en lugar de curvarse hacia abajo como en otros reptiles. Este cambio en la dirección del crecimiento está controlado por una región de señalización celular llamada cresta carapacial, que redirige el desarrollo de las costillas. Esta cresta es exclusiva de los embriones de tortuga y no se encuentra en ningún otro vertebrado.' },
    ],
    fact: 'El ensanchamiento de las costillas que inició la evolución del caparazón tuvo un costo significativo: las tortugas perdieron la capacidad de correr. En todos los demás vertebrados terrestres con extremidades, las costillas flexibles permiten la ondulación lateral del cuerpo, que es esencial para la locomoción rápida. Al rigidizar las costillas, las tortugas sacrificaron velocidad a cambio de protección. Estudios biomecánicos de Hirasawa et al. (2013) demostraron que incluso en Eunotosaurus, con costillas anchas pero no fusionadas, la capacidad de flexión lateral del tronco ya estaba reducida en un 40% comparada con lagartos de tamaño similar.',
  },
  {
    id: 'tierra-mar-vuelta',
    title: 'De la Tierra al Mar y de Vuelta',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/marinos_m5.png',
    image: '/assets/reptiles_marinos/marinos_m5.png',
    content: [
      'La transición de las tortugas desde la tierra al mar ocurrió de forma independiente en múltiples ocasiones durante la historia evolutiva del grupo. Las tortugas marinas modernas (superfamilia Chelonioidea) representan solo la más reciente de estas invasiones oceánicas. Los estudios filogenéticos de Hirayama publicados en 1998 documentaron al menos tres linajes independientes de tortugas que se adaptaron al medio marino: los protostégidos (extintos), los dermoquélidos (representados hoy por la tortuga laúd) y los quelónidos (tortugas verdes, carey, olivácea y otras especies actuales).',
      'Las adaptaciones necesarias para la vida marina incluyen modificaciones profundas del esqueleto. Las extremidades anteriores se transformaron en aletas largas y aplanadas, con los huesos de los dedos elongados y unidos por tejido. Las glándulas de sal, ubicadas cerca de los ojos, permiten excretar el exceso de sal del agua marina. El caparazón se aplanó y se hizo más hidrodinámico. Sin embargo, todas las tortugas marinas conservan un vínculo obligatorio con la tierra: deben regresar a las playas para depositar sus huevos, ya que los embriones necesitan oxígeno atmosférico para desarrollarse.',
      'La capacidad de navegación de las tortugas marinas es uno de los fenómenos más estudiados en biología. Las hembras de tortuga boba (Caretta caretta) regresan a la misma playa donde nacieron para depositar sus huevos, incluso después de migrar miles de kilómetros. Los experimentos de Kenneth Lohmann en la Universidad de Carolina del Norte, publicados entre 2001 y 2012, demostraron que las crías recién nacidas pueden detectar tanto la intensidad como la inclinación del campo magnético terrestre, creando un mapa magnético que les permite identificar su posición geográfica.',
      'Las tortugas verdes (Chelonia mydas) realizan migraciones de más de 2,600 kilómetros entre sus áreas de alimentación en las costas de Brasil y sus playas de anidación en la isla Ascensión, un punto de apenas 90 km² en medio del Océano Atlántico. Los estudios de telemetría satelital de Luschi et al. (1998) mostraron que estas tortugas navegan con una precisión de pocos kilómetros, corrigiendo activamente su rumbo cuando las corrientes las desvían. La combinación de magnetorrecepción, percepción de olas y posiblemente detección de gradientes químicos en el agua les permite localizar esta isla remota.',
      'El registro fósil muestra que las tortugas marinas del Cretácico ya anidaban en playas, como lo hacen las especies actuales. Fósiles de nidos de tortuga marina del Cretácico Tardío han sido documentados en formaciones costeras de Alabama y Nueva Jersey, Estados Unidos. Los huevos fosilizados muestran cáscaras flexibles similares a las de las tortugas marinas modernas, distintas de las cáscaras rígidas de las tortugas terrestres. Este comportamiento reproductivo ha permanecido sin cambios fundamentales durante al menos 80 millones de años, lo que lo convierte en una de las estrategias reproductivas más conservadas entre los vertebrados.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las tortugas marinas tienen termosensibilidad sexual: la temperatura del nido durante el segundo tercio de la incubación determina el sexo de las crías. Temperaturas por debajo de 27.7°C producen machos, temperaturas por encima de 31°C producen hembras, y temperaturas intermedias producen mezcla de sexos. Con el calentamiento global actual, estudios de Jensen et al. (2018) en la Gran Barrera de Coral encontraron que el 99.1% de las tortugas verdes juveniles de las playas del norte eran hembras, una proporción alarmante para la supervivencia del grupo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las tortugas marinas poseen cristales de magnetita (Fe₃O₄) en el cerebro, un mineral magnético que actúa como brújula biológica. Los experimentos de Lohmann expusieron crías de tortuga boba a campos magnéticos artificiales que simulaban distintas latitudes del Océano Atlántico. Las crías ajustaron su dirección de nado de acuerdo con la posición simulada, demostrando que el campo magnético les proporciona información posicional, no solo direccional. Este sistema de navegación funciona desde el momento del nacimiento, sin necesidad de aprendizaje previo.' },
    ],
    fact: 'La tortuga laúd (Dermochelys coriacea) es la tortuga marina más grande y la que bucea a mayor profundidad de todas las especies vivientes. Los registros de inmersión documentados por Houghton et al. en 2008 muestran que puede descender hasta 1,280 metros de profundidad, superando a la mayoría de los mamíferos marinos excepto los cachalotes y los elefantes marinos del sur. Su cuerpo tolera la presión a estas profundidades gracias a un esqueleto flexible y pulmones colapsables que se vacían a medida que aumenta la presión, evitando la narcosis por nitrógeno.',
  },
  {
    id: 'tortugas-agua-dulce',
    title: 'Tortugas Gigantes de Agua Dulce',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/marinos_m5.png',
    image: '/assets/reptiles_marinos/marinos_m5.png',
    content: [
      'No todas las tortugas gigantes fueron marinas. Stupendemys geographicus, descrita por Wood en 1976, fue la tortuga de agua dulce más grande que ha existido. Vivió durante el Mioceno Tardío, hace entre 13 y 5 millones de años, en los sistemas fluviales y lacustres que cubrían lo que hoy es Venezuela, Colombia y Brasil. Su caparazón medía hasta 2.4 metros de longitud, más grande que una bañera estándar. Un estudio de Cadena et al. publicado en 2020 en Science Advances estimó su peso corporal total en aproximadamente 1,145 kilogramos.',
      'Los fósiles de Stupendemys se han recuperado principalmente de la Formación Urumaco en el estado Falcón de Venezuela, una región que durante el Mioceno era un extenso sistema de humedales tropicales con ríos caudalosos y lagos someros. Cadena y Scheyer (2015) describieron especímenes con cuernos óseos en la parte frontal del caparazón que solo aparecían en los machos, lo que indica dimorfismo sexual. Estos cuernos probablemente se utilizaban en combates entre machos por el acceso a las hembras, similar a lo que hacen los ciervos con sus astas.',
      'Carbonemys cofrinii, descubierta en 2005 en la mina de carbón de Cerrejón en Colombia, fue otra tortuga de agua dulce de gran tamaño. Vivió hace unos 60 millones de años, durante el Paleoceno, apenas 5 millones de años después de la extinción de los dinosaurios. Su caparazón medía 1.72 metros de largo. Cadena et al. (2012) publicaron su descripción en el Journal of Paleontology, señalando que su cráneo era del tamaño de un balón de fútbol, con mandíbulas lo suficientemente fuertes para triturar moluscos, peces y posiblemente pequeños cocodrilos.',
      'El hábitat de Carbonemys en Cerrejón era un bosque tropical caluroso con temperaturas medias anuales de 28-32°C, significativamente más cálidas que los trópicos actuales. Esta tortuga compartía su ecosistema con Titanoboa cerrejonensis, la serpiente más grande conocida, que medía 13 metros de longitud. La coexistencia de reptiles tan grandes se explica por las temperaturas elevadas del Paleoceno: los reptiles ectotermos (de sangre fría) alcanzan tamaños mayores en climas más cálidos porque su metabolismo se beneficia directamente del calor ambiental.',
      'En la actualidad, la tortuga de agua dulce más grande es la tortuga de caparazón blando del Yangtsé (Rafetus swinhoei), que puede alcanzar 1 metro de caparazón y 120 kg de peso. Sin embargo, esta especie está al borde de la extinción: en 2024 solo se conocían tres individuos vivos confirmados, uno en Vietnam y dos en lagos de China. La tortuga mordedora alligátor (Macrochelys temminckii) de los ríos del sureste de Estados Unidos puede pesar hasta 100 kg. Comparadas con Stupendemys, estas especies representan una fracción del tamaño que las tortugas de agua dulce alcanzaron en el pasado geológico.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los investigadores encontraron marcas de mordida de cocodrilo en varios caparazones de Stupendemys. Los fósiles de los mismos depósitos incluyen al cocodrilo gigante Purussaurus, que medía entre 10 y 12 metros de largo y tenía una fuerza de mordida estimada en 69,000 newtons, la más poderosa de cualquier animal conocido. Las marcas muestran que incluso un caparazón de 2.4 metros no era suficiente protección contra un depredador de ese calibre. Algunas tortugas sobrevivieron a los ataques, ya que los huesos muestran signos de cicatrización.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La regla de Bergmann establece que los animales de sangre caliente tienden a ser más grandes en climas fríos. En los reptiles ocurre lo opuesto: las especies más grandes aparecen en climas más cálidos. Esto se debe a que los reptiles dependen de la temperatura externa para su metabolismo. Head et al. (2009) en Nature utilizaron el tamaño de Titanoboa para calcular la temperatura del Paleoceno tropical, obteniendo un resultado de 30-34°C, consistente con los datos geoquímicos independientes de la misma formación geológica.' },
    ],
    fact: 'Stupendemys geographicus fue nombrada por Roger Wood en 1976 a partir de un caparazón parcial encontrado en Venezuela. El nombre del género, Stupendemys, combina el latín "stupendus" (estupendo, por su tamaño) con el griego "emys" (tortuga de agua dulce). El espécimen más completo, descrito por Cadena et al. en 2020, incluía un caparazón de 2.4 metros con cuernos frontales y fue hallado en la Formación Urumaco, la misma localidad que produjo al cocodrilo Purussaurus y a los roedores gigantes del género Phoberomys, que pesaban hasta 700 kg. Este ecosistema mioceno de Venezuela era un mundo de gigantes.',
  },
  {
    id: 'sobrevivientes-kpg',
    title: 'Sobrevivientes del K-Pg',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/marinos_m5.png',
    image: '/assets/reptiles_marinos/marinos_m5.png',
    content: [
      'Hace 66 millones de años, un asteroide de aproximadamente 10 kilómetros de diámetro impactó en lo que hoy es la Península de Yucatán, México, creando el cráter Chicxulub de 180 km de diámetro. El impacto desencadenó la extinción masiva del Cretácico-Paleógeno (K-Pg), eliminando al 76% de todas las especies, incluidos todos los dinosaurios no avianos, los mosasaurios, los plesiosaurios y los pterosaurios. Sin embargo, las tortugas sobrevivieron. De las 30 familias de tortugas que existían en el Cretácico Tardío, al menos 18 cruzaron la frontera K-Pg con éxito.',
      'Las razones de la supervivencia de las tortugas durante la extinción K-Pg han sido analizadas en detalle por Lyson et al. (2011). Varios factores contribuyeron: su capacidad de enterrarse en sedimentos acuáticos para estivar durante períodos prolongados, su metabolismo lento que les permite sobrevivir meses sin alimento, y su asociación con hábitats de agua dulce que resultaron menos afectados que los ecosistemas marinos y terrestres abiertos. Los ríos y lagos proporcionaron refugio frente al colapso de las cadenas alimentarias terrestres.',
      'Las tortugas marinas sufrieron pérdidas significativas pero no se extinguieron por completo. Los protostégidos, la familia de Archelon y Protostega, desaparecieron en la extinción. Sin embargo, los linajes que darían origen a las tortugas marinas modernas (Cheloniidae y Dermochelyidae) lograron sobrevivir. Los análisis moleculares de Naro-Maciel et al. (2008) estiman que los quelónidos modernos se diversificaron rápidamente durante el Eoceno, entre 55 y 35 millones de años atrás, ocupando los nichos ecológicos vacantes dejados por los protostégidos extintos.',
      'En contraste con las tortugas, otros reptiles marinos no tuvieron la misma suerte. Los mosasaurios, que eran los depredadores dominantes de los mares del Cretácico, se extinguieron por completo. Los plesiosaurios, que habían diversificado durante 135 millones de años, también desaparecieron sin dejar descendientes. Los ictiosaurios ya se habían extinguido 25 millones de años antes del impacto. De todos los grandes reptiles marinos del Mesozoico, solo las tortugas y los cocodrilos cruzaron la frontera K-Pg hacia el Cenozoico.',
      'Las amenazas actuales contra las tortugas marinas incluyen la contaminación por plásticos, la pesca incidental en redes de arrastre, la destrucción de playas de anidación por el desarrollo costero, y el cambio climático que altera las proporciones de sexos en los nidos. Según la Unión Internacional para la Conservación de la Naturaleza (UICN), seis de las siete especies de tortugas marinas están clasificadas como vulnerables, en peligro o en peligro crítico. La tortuga carey (Eretmochelys imbricata) ha perdido el 80% de su población en las últimas tres generaciones. Un grupo que sobrevivió a tres extinciones masivas enfrenta ahora la posibilidad de desaparecer por causas humanas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Un estudio de Wilkinson et al. (2003) calculó la superficie mínima del océano que debió verse afectada por el impacto de Chicxulub. La onda de calor inicial elevó la temperatura de la superficie oceánica en los primeros kilómetros alrededor del impacto a más de 50°C, matando a toda la vida marina en esa zona. Sin embargo, las tortugas que se encontraban en aguas profundas o en ríos interiores alejados del impacto pudieron sobrevivir. La distribución global de las tortugas fue clave: no todas las poblaciones estaban en la zona letal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los cocodrilos y las tortugas comparten varias características que explican su supervivencia al K-Pg: metabolismo ectotermo (requieren menos alimento que los animales de sangre caliente), capacidad de permanecer meses sin comer mediante la ralentización metabólica, asociación con hábitats acuáticos de agua dulce, y dietas omnívoras o detritívoras que no dependían de cadenas alimentarias intactas. Estudios de Robertson et al. (2004) demostraron que los ecosistemas de agua dulce se recuperaron en menos de 500 años tras el impacto, mientras que los ecosistemas marinos tardaron hasta 3 millones de años.' },
    ],
    fact: 'Cada año, más de 1,000 tortugas marinas mueren por ingestión de plástico en el océano. Un estudio de Schuyler et al. (2016) publicado en Conservation Biology encontró fragmentos de plástico en el tracto digestivo del 52% de las tortugas marinas examinadas a nivel global. Las tortugas laúd son las más afectadas porque las bolsas de plástico flotantes se asemejan a las medusas, su presa principal. Una tortuga que ha sobrevivido como grupo durante 220 millones de años, cruzando tres extinciones masivas, puede desaparecer en pocas décadas si no se reducen las amenazas que la actividad humana genera sobre los océanos y las playas de anidación.',
  },
];

// ━━━ Ocean Particle Field (Canvas Background) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94', // slate blue or copper
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.06;
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

// ━━━ Sea Turtle Header ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function SeaTurtleHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Ocean arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#turtleGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
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
        {/* Central turtle silhouette icon */}
        <ellipse cx="300" cy="28" rx="12" ry="8" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="313" cy="26" r="2.5" fill="none" stroke="#5B7B9A" strokeWidth="1" opacity="0.5" />
        <line x1="290" y1="22" x2="284" y2="18" stroke="#5B7B9A" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <line x1="290" y1="34" x2="284" y2="38" stroke="#5B7B9A" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="turtleGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TORTUGAS PREHISTÓRICAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">220 MILLONES DE AÑOS DE HISTORIA</text>
      </svg>
    </div>
  );
}

// ━━━ Organic Node Button (matching BttfM2 style) ━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
          layoutId="activeDotMarinosM5"
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

// ━━━ Expandable Section with Random Direction ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━ Magazine-Style Content Panel ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

      {/* ━━━ Two-Column Hero Section ━━━ */}
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

      {/* ━━━ Magazine Body ━━━ */}
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

        {/* ━━━ Expandable Interactive Sections ━━━ */}
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

// ━━━ Progress Bar ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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

// ━━━ Main Infographic Component ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function InteractiveInfographic_MarinosM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/marinos_m5.png)',
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

      <SeaTurtleHeader />

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
              🐢 ¡Has explorado todas las tortugas prehistóricas!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Paleontólogo Quelonio
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ━━━ Bibliografía ━━━ */}
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
