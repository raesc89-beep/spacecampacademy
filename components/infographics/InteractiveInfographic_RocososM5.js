'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Marte: El Gigante Oxidado) ──────────────────────
function DecoIronOxide({ size = 70, color = '#E63946', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="24" cy="24" r="3" fill={color} opacity="0.9" />
      <circle cx="36" cy="34" r="4" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoOlympusVolcano({ size = 70, color = '#F4A261', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="40" rx="22" ry="10" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M12 40 L26 20 L34 20 L48 40" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="20" rx="4" ry="2" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoVallesCanyon({ size = 70, color = '#D62828', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 20 L25 35 L35 25 L50 40" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M10 28 L25 43 L35 33 L50 48" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

function DecoAncientRiver({ size = 70, color = '#48CAE4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 15 Q25 30 20 45 T50 50" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M25 30 Q35 38 45 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoAtmosphericSolarWind({ size = 70, color = '#A8DADC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="20" cy="30" r="14" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M38 15 Q48 30 38 45" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" />
      <line x1="2" y1="30" x2="6" y2="30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoPolarIce({ size = 70, color = '#F1FAEE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,10 36,24 50,30 36,36 30,50 24,36 10,30 24,24" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function DecoRover({ size = 70, color = '#FFB703', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="25" width="20" height="12" rx="2" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="18" cy="42" r="4" fill={color} />
      <circle cx="30" cy="42" r="4" fill={color} />
      <circle cx="42" cy="42" r="4" fill={color} />
      <line x1="30" y1="25" x2="30" y2="12" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="10" r="3" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'polvo-de-oxido': [DecoIronOxide, DecoOlympusVolcano, DecoVallesCanyon],
  'volcanes-gigantes': [DecoOlympusVolcano, DecoVallesCanyon, DecoRover],
  'valles-marineris': [DecoVallesCanyon, DecoAncientRiver, DecoOlympusVolcano],
  'agua-ancestral': [DecoAncientRiver, DecoAtmosphericSolarWind, DecoPolarIce],
  'colapso-atmosferico': [DecoAtmosphericSolarWind, DecoIronOxide, DecoAncientRiver],
  'casquetes-polares': [DecoPolarIce, DecoAncientRiver, DecoRover],
  'caza-de-biofirmas': [DecoRover, DecoAncientRiver, DecoIronOxide],
};

const BIBLIOGRAPHY = [
  'Carr, M. H., & Head, J. W. (2010). "Geologic history of Mars". Earth and Planetary Science Letters, 294(3-4), 185-203.',
  'Jakosky, B. M., et al. (2018). "Loss of the Martian atmosphere to space: MAVEN observations". Science, 359(6381), 1260-1262.',
  'Grotzinger, J. P., et al. (2014). "A habitable fluvio-lacustrine environment at Yellowknife Bay, Gale Crater, Mars". Science, 343(6169), 1242777.',
  'Ehlmann, B. L., & Edwards, C. S. (2014). "Mineralogy of the Martian surface". Annual Review of Earth and Planetary Sciences, 42, 291-315.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'polvo-de-oxido',
    title: 'El Polvo Oxidado',
    color: '#E63946',
    btnImage: '/assets/planet_mars.png',
    image: '/assets/planet_mars.png',
    content: [
      'Marte es ampliamente conocido como el Planeta Rojo debido al característico tono rojizo anaranjado que brilla en el cielo nocturno de la Tierra. Sin embargo, si pudieras recoger un puñado de suelo marciano, descubrirías que el planeta no está hecho de fuego, sino literalmente cubierto por una fina capa de óxido de hierro, el mismo óxido rojizo que se forma en un clavo viejo olvidado bajo la lluvia.',
      'El suelo marciano está compuesto por un fino polvo de regolito extremadamente rico en minerales de hierro y silicato. Durante miles de millones de años, el escaso oxígeno y el vapor de agua presentes en la atmósfera marciana reaccionaron con el hierro de las rocas basálticas, "oxidando" la superficie de todo el planeta de forma homogénea.',
      'Imagina un mundo entero donde las rocas y la arena se han convertido en polvo de herrumbre. Las continuas tormentas de polvo que azotan el planeta levantan estas partículas microscópicas hacia la tenue atmósfera, tiñendo el cielo marciano de un peculiar color rosa salmón durante el día.',
      'El polvo marciano es tan fino como el talco para bebés o el humo de una chimenea. Se cuela en cada pequeña grieta y representa uno de los mayores desafíos técnicos para las misiones espaciales humanas, ya que puede bloquear los paneles solares y desgastar los trajes espaciales de los futuros astronautas.',
      'Debajo de esta delgada película de polvo rojo de apenas unos metros de grosor, las rocas marcianas profundas son en realidad de tonos grises y oscuros, revelando su verdadero origen volcánico hecho de basalto rico en olivino y piroxeno.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las tormentas de polvo en Marte pueden volverse tan gigantescas que cubren el planeta entero durante meses consecutivos, ocultando la superficie completa de la vista de los telescopios terrestres.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El compuesto químico responsable del color rojo de Marte es principalmente la hematita (Fe2O3), un mineral de óxido de hierro magnético muy abundante en el regolito.' }
    ],
    fact: 'El polvo de óxido de hierro en Marte es tan fino que sus partículas miden solo unos 3 micrómetros de diámetro, 20 veces más delgadas que un cabello humano.',
  },
  {
    id: 'volcanes-gigantes',
    title: 'Monte Olimpo',
    color: '#F4A261',
    btnImage: '/assets/rocosos/infographic_m5/btn_volcanes-gigantes.jpg',
    image: '/assets/rocosos/infographic_m5/hero_volcanes-gigantes.jpg',
    content: [
      'Marte alberga las estructuras volcánicas más monumentales y gigantescas de todo el Sistema Solar. El rey indiscutible de estos gigantes es el Monte Olimpo (Olympus Mons), un volcán en escudo tan colosal que supera todas las escalas geológicas conocidas en la Tierra.',
      'El Monte Olimpo se eleva a una impresionante altura de veinticinco kilómetros sobre las llanuras circundantes, lo que lo convierte en un gigante casi tres veces más alto que el Monte Everest en la Tierra. Su base es tan gigantesca que cubriría la superficie entera del Reino Unido o del estado de Arizona.',
      '¿Cómo pudo Marte construir un volcán tan gigantesco? La clave está en la ausencia de tectónica de placas. En la Tierra, las placas tectónicas se mueven continuamente sobre los puntos calientes de magma, creando cadenas de volcanes más pequeños como las islas de Hawái. En Marte, la corteza permaneció fija en un solo lugar durante miles de millones de años.',
      'Debido a esta corteza inmóvil, una pluma de magma subterránea continuó expulsando lava exactamente en el mismo punto de la superficie durante cientos de millones de años consecutivos, acumulando capa sobre capa de basalto fino hasta construir una montaña volcánica colosal.',
      'El Monte Olimpo forma parte de la protuberancia de Tharsis, un abultamiento volcánico gigante que alberga otros tres colosos volcánicos: Ascraeus Mons, Pavonis Mons y Arsia Mons, demostrando la intensa actividad magmática que dominó el pasado marciano.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La pendiente del Monte Olimpo es tan suave (solo 5 grados de inclinación) que si estuvieras parado en su cima no te darías cuenta de estar en una montaña; el borde del volcán estaría más allá del horizonte debido a la curvatura del planeta.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La gigantesca caldera en la cima del Monte Olimpo mide 80 kilómetros de largo por 60 kilómetros de ancho y está formada por seis cráteres de colapso superpuestos.' }
    ],
    fact: 'El Monte Olimpo es tan alto que su cima atraviesa casi toda la atmósfera marciana, sobresaliendo por encima del 90% de los gases del planeta.',
  },
  {
    id: 'valles-marineris',
    title: 'Valles Marineris',
    color: '#D62828',
    btnImage: '/assets/rocosos/infographic_m5/btn_valles-marineris.jpg',
    image: '/assets/rocosos/infographic_m5/hero_valles-marineris.jpg',
    content: [
      'Si el Monte Olimpo es la montaña más alta del Sistema Solar, el abismo de Valles Marineris es sin duda la grieta más impresionante de la corteza planetaria. Este gigantesco sistema de cañones se extiende como una cicatriz imborrable a lo largo del ecuador de Marte.',
      'Valles Marineris mide más de cuatro mil kilómetros de longitud, supera los doscientos kilómetros de ancho y alcanza profundidades abismales de hasta once kilómetros. Si colocáramos este cañón sobre el mapa de los Estados Unidos, se extendería desde la costa del Océano Atlántico en Nueva York hasta la costa del Océano Pacífico en San Francisco.',
      'Para comparar, el famoso Gran Cañón del Colorado en la Tierra parecería una pequeña zanja al lado de Valles Marineris: el cañón marciano es cuatro veces más profundo y casi diez veces más largo que su contraparte terrestre.',
      'A diferencia del Gran Cañón terrestre, que fue excavado principalmente por la erosión del agua del río Colorado, Valles Marineris nació por un proceso tectónico violento. Cuando la gigante protuberancia volcánica de Tharsis se elevó por la acumulación de magma, la corteza marciana no aguantó la tensión y se desgarró por completo.',
      'Con el paso del tiempo, viejos ríos de agua, glaciares subterráneos y desprendimientos gigantescos de rocas ensancharon y moldearon las paredes del cañón, creando un paisaje geológico sobrecogedor que conserva el archivo histórico del planeta.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Valles Marineris rinde homenaje a la sonda espacial Mariner 9 de la NASA, que descubrió este gigantesco sistema de cañones desde la órbita marciana en 1971 durante una tormenta de polvo global.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Imágenes satelitales recientes han detectado nieblas matutinas de hielo de agua y posibles flujos de salmuera estacionales (RSL) en las sombras profundas de las paredes de Valles Marineris.' }
    ],
    fact: 'Valles Marineris abarca casi una cuarta parte de toda la circunferencia ecuatorial del planeta Marte.',
  },
  {
    id: 'agua-ancestral',
    title: 'El Pasado Acuático',
    color: '#48CAE4',
    btnImage: '/assets/mars_ancient_oceans.png',
    image: '/assets/mars_ancient_oceans.png',
    content: [
      'Aunque Marte es hoy un desierto helado, seco y polvoriento, las imágenes tomadas por los satélites en órbita y los análisis químicos de los rovers en tierra demuestran que en el pasado tuvo un rostro completamente diferente. Hace cuatro mil millones de años, Marte fue un mundo azul cargado de agua líquida.',
      'La superficie marciana conserva miles de cauces secos de ríos antiguos, deltas de ríos fosilizados con formas de abanico, lechos de lagos profundos y marcas de erosión causadas por gigantescas inundaciones repentinas que arrastraron rocas del tamaño de casas.',
      'En la hemisferio norte del planeta existió un océano primigenio llamado Oceanus Borealis que cubría un tercio de la superficie marciana con profundidades de cientos de metros. Mientras tanto, en los cráteres del sur como Gale y Jezero se formaron lagos de agua dulce duraderos.',
      'Los rovers Curiosity y Perseverance de la NASA han hallado minerales de arcilla, vetas de yeso y cantos rodados perfectamente redondeados por la corriente del agua en lechos de lagos antiguos, confirmando que el agua marciana era químicamente neutra, potable y apta para la vida.',
      'Durante cientos de millones de años durante la época Noequiana, Marte disfrutó de un clima cálido y húmedo protegido por una atmósfera más densa, convirtiéndose en el primer mundo del Sistema Solar que ofreció condiciones habitables para la biología.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El rover Curiosity descubrió en el cráter Gale capas de rocas sedimentarias de 3,700 millones de años formadas por lodos depositados en el fondo de un antiguo lago de agua dulce que perduró millones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La cantidad total de agua que fluyó por los valles marcianos primordiales equivale a cientos de veces el caudal combinado de todos los ríos de la Tierra actual.' }
    ],
    fact: 'El cráter Jezero, explorado por el rover Perseverance, fue seleccionado cuidadosamente porque contiene un delta de río fosilizado perfectamente conservado, ideal para buscar biofirmas antiguas.',
  },
  {
    id: 'colapso-atmosferico',
    title: 'Pérdida de la Magnetosfera',
    color: '#A8DADC',
    btnImage: '/assets/mars_dust_storm.png',
    image: '/assets/mars_dust_storm.png',
    content: [
      '¿Cómo pasó Marte de ser un oasis cálido y acuático a convertirse en un desierto congelado e inerte? El culpable de esta trágica metamorfosis planetaria fue el pequeño tamaño de Marte y la muerte de su escudo magnético primigenio.',
      'Al ser un planeta más pequeño que la Tierra, con solo la mitad de su diámetro, Marte perdió su calor interno mucho más rápido. Hace aproximadamente cuatro mil millones de años, su núcleo de hierro líquido se enfrió y se solidificó, apagando para siempre la geodinamo interna que generaba su campo magnético.',
      'Sin un campo magnético protector, la magnetosfera marciana colapsó. El feroz viento solar procedente del Sol comenzó a bombardear directamente la alta atmósfera del planeta indefenso, actuando como un cepillo espacial que erosionó y arrancó los gases hacia el espacio profundo.',
      'A medida que la atmósfera perdía espesor, la presión atmosférica cayó en picado hasta alcanzar solo el uno por ciento de la presión terrestre. Sin presión suficiente y sin efecto invernadero, el agua líquida de la superficie no pudo sostenerse: una parte se evaporó al espacio y la otra se congeló bajo el suelo.',
      'La misión MAVEN de la NASA midió en 2015 la velocidad a la que el viento solar continúa robando gases en la actualidad, confirmando que Marte perdió más del noventa por ciento de su atmósfera primordial debido a la extinción de su corazón magnético.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'A pesar de no tener un campo magnético global, Marte conserva "parches" de magnetismo fosilizado atrapados en las rocas antiguas de su corteza austral como recuerdos de su extinto escudo magnético.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La presión atmosférica actual en la superficie de Marte es de solo 6 milibares (en la Tierra es de 1,013 milibares), tan baja que el agua herviría al instante a temperatura ambiente debido a la falta de presión.' }
    ],
    fact: 'La nave espacial MAVEN demostró que las tormentas solares intensas aumentan más de diez veces la velocidad a la que Marte pierde gases hacia el espacio interplanetario.',
  },
  {
    id: 'casquetes-polares',
    title: 'Casquetes Polares',
    color: '#F1FAEE',
    btnImage: '/assets/rocosos/infographic_m5/btn_casquetes-polares.jpg',
    image: '/assets/rocosos/infographic_m5/hero_casquetes-polares.jpg',
    content: [
      'Al igual que la Tierra, Marte posee dos brillantes casquetes polares de color blanco deslumbrante ubicados en su polo norte y polo sur. Sin embargo, los casquetes marcianos tienen una composición dual fascinante formada por una mezcla de hielo de agua y hielo seco de dióxido de carbono.',
      'El casquete polar norte se compone principalmente de una gigantesca capa de hielo de agua pura de tres kilómetros de grosor y mil kilómetros de ancho. Contiene suficiente agua congelada como para cubrir la superficie entera del planeta con una capa de agua de once metros de profundidad si se derritiera.',
      'En cambio, los casquetes polares sufren transformaciones drásticas con las estaciones marcianas. Durante el gélido invierno polar, cuando las temperaturas caen por debajo de los ciento veinticinco grados Celsius bajo cero, el dióxido de carbono de la atmósfera se congela directamente sobre el suelo, formando una capa de "nieve carbónica" de un metro de espesor.',
      'En la primavera, al volver la luz solar, este hielo seco pasa de sólido a gas de forma violenta sin volverse líquido en un proceso llamado sublimación. Esta evaporación explosiva crea géiseres gigantes de gas carbónico que expulsan polvo oscuro hacia el cielo, creando manchas con forma de abanico sobre la nieve blanca.',
      'Además de los polos, misiones recientes equipadas con radares penetrantes como SHARAD han descubierto gigantescos glaciares de agua pura enterrados bajo capas protectoras de polvo en las latitudes medias del planeta, conservando agua vital para futuras colonias humanas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En la primavera del polo sur de Marte, la sublimación del hielo seco atrapado bajo el suelo crea chorros de gas a alta presión que forman estructuras oscuras parecidas a arañas gigantes llamadas terreno arácnido.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Durante el invierno marciano, hasta una cuarta parte de todo el dióxido de carbono de la atmósfera entera del planeta se congela temporalmente sobre los polos, haciendo fluctuar la presión atmosférica global.' }
    ],
    fact: 'El radar orbital SHARAD reveló que los casquetes polares de Marte están formados por cientos de capas alternas de hielo y polvo que registran el clima marciano de los últimos millones de años.',
  },
  {
    id: 'caza-de-biofirmas',
    title: 'Caza de Biofirmas',
    color: '#FFB703',
    btnImage: '/assets/mars_human_colony_dome.png',
    image: '/assets/mars_human_colony_dome.png',
    content: [
      'Marte es el objetivo número uno de la astrobiología en la búsqueda de vida fuera de la Tierra. Aunque la superficie actual es estéril debido a la intensa radiación ultravioleta y a la falta de agua líquida, la pregunta decisiva es: ¿albergó Marte microorganismos vivos en su pasado templado?',
      'Para resolver este gran misterio, la humanidad ha desplegado una flota de rovers robóticos ultraavanzados. Misiones pioneras como Viking, Spirit, Opportunity, Curiosity y Perseverance han transformado a Marte en el planeta mejor explorado por robots en la historia espacia.',
      'El rover Perseverance de la NASA, que aterrizó en el cráter Jezero en 2021, cuenta con un laboratorio geológico equipado con la última tecnología. Su objetivo principal es buscar biofirmas, que son fósiles químicos, estructuras microscópicas o patrones minerales dejados por bacterias marcianas antiguas hace miles de millones de años.',
      'Perseverance utiliza un taladro especial para extraer núcleos de roca intactos del lecho del antiguo lago, sellándolos dentro de tubos de titanio ultra limpios. Estos tubos están siendo depositados en la superficie marciana a la espera de la futura misión Mars Sample Return, que viajará a Marte para traer las muestras de vuelta a la Tierra.',
      'El análisis de estas rocas marcianas en los laboratorios más avanzados de la Tierra permitirá responder a la pregunta más trascendental de la ciencia: si la vida surgió de forma independiente en dos planetas vecinos del mismo Sistema Solar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El helicóptero Ingenuity de la NASA, que viajó adjunto a Perseverance, realizó más de 72 vuelos históricos en Marte, demostrando que es posible el vuelo controlado con hélices en la tenue atmósfera marciana.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Curiosity detectó fluctuaciones estacionales de gas metano en el cráter Gale. Como el metano en la Tierra es producido mayoritariamente por seres vivos, su origen marciano sigue siendo un enigma fascinante.' }
    ],
    fact: 'La misión Mars Sample Return es un ambicioso esfuerzo conjunto entre la NASA y la ESA para traer a la Tierra las primeras muestras de roca marciana recogidas directamente por un rover en los años 2030.',
  },
];

export default function InteractiveInfographic_RocososM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(25,10,12,0.92) 0%, rgba(35,15,18,0.88) 40%, rgba(18,8,10,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <RockyDustField color1="230, 57, 70" color2="244, 162, 97" />
      <RocososHeader title="MARTE: EL GIGANTE OXIDADO" subtitle="EL PLANETA ROJO Y LA BÚSQUEDA DE VIDA" primaryColor="#E63946" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #E63946, #F4A261)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
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

      <div style={{ position: 'relative', zIndex: 3, flex: 1 }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '300px',
                color: 'rgba(255,255,255,0.4)', textAlign: 'center', gap: '1rem',
              }}
            >
              <Sparkles size={32} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
                Selecciona uno de los 7 módulos superiores para explorar las maravillas de Marte.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' }}>
          Referencias Científicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #E6394660' }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}

function RockyDustField({ color1 = '230, 57, 70', color2 = '244, 162, 97' }) {
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
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? color1 : color2,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
        p.x += p.driftX;
        p.y += p.driftY;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [color1, color2]);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function RocososHeader({ title, subtitle, primaryColor }) {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: `drop-shadow(0 0 12px ${primaryColor}40)` }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM5)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={primaryColor}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill={primaryColor} opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="hdrGradM5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
            <stop offset="50%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill={primaryColor} fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">{title}</text>
        <text x="300" y="95" textAnchor="middle" fill={primaryColor} opacity="0.7" fontSize="11" fontFamily="monospace" letterSpacing="2">{subtitle}</text>
      </svg>
    </div>
  );
}

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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.15)'}`,
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
          layoutId={`activeDot_${node.id}`}
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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(25, 12, 14, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? 'Fase A' : i === 1 ? 'Fase B' : 'Fase C'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}
        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
