'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Mercurio: El Horno de Hierro) ───────────────────
function DecoIronCore({ size = 70, color = '#E63946', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="2.5" opacity="0.8" />
      <circle cx="30" cy="30" r="18" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="8" fill="#FFF" opacity="0.4" />
    </svg>
  );
}

function DecoThermalSun({ size = 70, color = '#FF9F1C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.8" />
      <path d="M30 5 L30 14 M30 46 L30 55 M5 30 L14 30 M46 30 L55 30 M12 12 L19 19 M41 41 L48 48 M12 48 L19 41 M41 19 L48 12" stroke={color} strokeWidth="2" opacity="0.7" />
    </svg>
  );
}

function DecoFaultScarp({ size = 70, color = '#CB997E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 45 L25 35 L35 25 L50 15" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8" />
      <path d="M15 50 L30 40 L40 30 L55 20" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

function DecoShadowCrater({ size = 70, color = '#00B4D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="22" ry="14" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M15 30 A15 8 0 0 0 45 30" fill={color} opacity="0.4" />
      <circle cx="25" cy="26" r="3" fill="#FFF" opacity="0.6" />
    </svg>
  );
}

function DecoMagneticField({ size = 70, color = '#9D4EDD', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 Q10 30 30 50 Q50 30 30 10 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M30 18 Q18 30 30 42 Q42 30 30 18 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="5" x2="30" y2="55" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
    </svg>
  );
}

function DecoImpact({ size = 70, color = '#F15BB5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" />
      <line x1="30" y1="10" x2="30" y2="2" stroke={color} strokeWidth="2" />
      <line x1="30" y1="50" x2="30" y2="58" stroke={color} strokeWidth="2" />
      <line x1="10" y1="30" x2="2" y2="30" stroke={color} strokeWidth="2" />
      <line x1="50" y1="30" x2="58" y2="30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoProbe({ size = 70, color = '#00F5D4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="22" y="22" width="16" height="16" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="6" y1="30" x2="22" y2="30" stroke={color} strokeWidth="2" />
      <line x1="38" y1="30" x2="54" y2="30" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.9" />
    </svg>
  );
}

const DECO_MAP = {
  'nucleo-gigante': [DecoIronCore, DecoThermalSun, DecoImpact],
  'temperaturas-extremas': [DecoThermalSun, DecoShadowCrater, DecoIronCore],
  'escarpas-tectonicas': [DecoFaultScarp, DecoIronCore, DecoProbe],
  'crateres-y-hielo': [DecoShadowCrater, DecoThermalSun, DecoProbe],
  'campo-magnetico': [DecoMagneticField, DecoIronCore, DecoProbe],
  'gran-impacto': [DecoImpact, DecoIronCore, DecoFaultScarp],
  'exploracion-bepicolombo': [DecoProbe, DecoMagneticField, DecoShadowCrater],
};

const BIBLIOGRAPHY = [
  'Solomon, S. C., Nittler, L. R., & Anderson, B. J. (2018). "Mercury: The View after MESSENGER". Cambridge University Press.',
  'Hauck, S. A., et al. (2013). "The gravity field, orientation, and interior structure of Mercury". Journal of Geophysical Research: Planets, 118(6), 1204-1220.',
  'Lawrence, D. J., et al. (2013). "Evidence for water ice near Mercury\'s poles from MESSENGER neutron spectrometer data". Science, 339(6117), 292-296.',
  'Benz, W., et al. (2007). "Origin of Mercury". Space Science Reviews, 132(2-4), 189-202.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'nucleo-gigante',
    title: 'El Núcleo Gigante',
    color: '#E63946',
    btnImage: '/assets/mercury_orbital_resonance.png',
    image: '/assets/mercury_orbital_resonance.png',
    content: [
      'Mercurio es el planeta más pequeño del Sistema Solar, pero oculta un secreto descomunal bajo su superficie pedregosa. Si pudieras cortar a Mercurio por la mitad como un aguacate, descubrirías que la semilla o núcleo metálico ocupa casi todo el planeta. A diferencia de la Tierra, donde el núcleo es solo una fracción del interior, el núcleo de hierro de Mercurio abarca más del ochenta y cinco por ciento de su radio total.',
      'Imagínate un cañón de cañón pesado envuelto en una capa súper delgada de papel periódico. El manto rocoso exterior y la corteza de Mercurio son diminutos en comparación con su monstruoso corazón metálico. Este núcleo de hierro y níquel mide más de cuatro mil kilómetros de diámetro, dejando únicamente una cáscara rocosa de apenas cuatrocientos kilómetros de grosor en la parte exterior.',
      'Debido a esta gigantesca masa metálica concentrada en su interior, Mercurio es el segundo planeta más denso de todo el Sistema Solar, ubicado justo detrás de la Tierra. Si Mercurio fuera del mismo tamaño que la Luna, pesaría más del doble que ella debido al enorme peso específico del hierro puro apretado en su centro por la gravedad.',
      'Los científicos han descubierto que el núcleo no está completamente sólido. Posee una capa exterior de hierro fundido que continúa fluctuando lentamente. La presencia de elementos ligeros como el azufre en el interior ayudó a rebajar el punto de fusión del hierro, impidiendo que el núcleo se congelara por completo durante los cuatro mil quinientos millones de años de historia planetaria.',
      'La desproporción única del núcleo de Mercurio convierte a este pequeño mundo en un auténtico laboratorio geológico. Su estructura desafía los modelos tradicionales de formación planetaria, obligando a los astrofísicos a replantearse cómo se condensaron los metales pesados en las zonas más calientes cercanas al Sol primordial.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El volumen del núcleo metálico de Mercurio representa el 57% del volumen total del planeta, mientras que el núcleo de la Tierra representa solo el 17%. Esta diferencia convierte a Mercurio en el planeta proporcionalmente más metálico conocido.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las mediciones del campo gravitatorio realizadas por la sonda MESSENGER confirmaron que Mercurio tiene un núcleo líquido parcialmente fundido mediante el análisis fino de las oscilaciones y libraciones de su rotación.' }
    ],
    fact: 'La alta densidad de Mercurio (5.43 gramos por centímetro cúbico) implica que contiene más hierro proporcionalmente que cualquier otro objeto grande de nuestro sistema estelar.',
  },
  {
    id: 'temperaturas-extremas',
    title: 'Contrastes Térmicos',
    color: '#FF9F1C',
    btnImage: '/assets/mercury_extremes.png',
    image: '/assets/mercury_extremes.png',
    content: [
      'Mercurio es un mundo de extremos térmicos infernales y despiadados. Al estar tan cerca del Sol, a una distancia promedio de solo cincuenta y ocho millones de kilómetros, la cara iluminada del planeta se convierte en un horno abrasador donde las temperaturas alcanzan los cuatrocientos treinta grados Celsius, calor suficiente para derretir el plomo y el zinc en minutos.',
      'Sin embargo, en la cara nocturna ocurre lo opuesto. Como Mercurio carece de una atmósfera densa que retenga el calor como una manta, la superficie pierde toda su energía hacia el espacio helado en cuanto se pone el Sol. La temperatura en la sombra cae en picado hasta los ciento ochenta grados Celsius bajo cero, creando el contraste térmico más salvaje de todo el Sistema Solar.',
      'Piensa en estar parado en Mercurio con un pastel de helado en una mano y una sartén en la otra. El lado de tu cuerpo mirando al Sol se cocinaría al instante, mientras que el lado en la sombra se congelaría como un cubo de hielo en segundos. Esta diferencia de más de seiscientos grados entre el día y la noche no ocurre en ningún otro planeta conocido.',
      'La causa principal de este comportamiento es la ausencia de aire. En la Tierra, la atmósfera actúa como un aire acondicionado y calefacción natural que distribuye el calor por todo el globo mediante vientos. En Mercurio, al no haber gases que atrapen ni muevan el calor, el suelo pasa de horno crematorio a congelador abisal de forma instantánea.',
      'Adicionalmente, Mercurio gira muy despacio sobre su propio eje. Un solo día solar en Mercurio, medido desde un amanecer hasta el siguiente, dura exactamente ciento setenta y seis días terrestres. Esto significa que cada región del planeta pasa meses continuos bajo el castigo directo del Sol seguidos de meses seguidos en la noche negra.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Debido a su órbita elíptica y su lenta rotación, si te pararas en ciertos lugares de Mercurio verías al Sol salir, detenerse en el cielo, retroceder un poco, volver a avanzar y finalmente ponerse. Es el único planeta con amaneceres dobles.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La radiación solar recibida en la superficie de Mercurio es hasta once veces más intensa que la que llega a la Tierra, lo que requiere escudos térmicos de cerámica avanzada para las sondas espaciales que lo visitan.' }
    ],
    fact: 'A pesar de estar más cerca del Sol que ningún otro planeta, Mercurio no es el más caliente. Venus ostenta el récord absoluto de temperatura debido al feroz efecto invernadero de su densa atmósfera de dióxido de carbono.',
  },
  {
    id: 'escarpas-tectonicas',
    title: 'Escarpas de Contracción',
    color: '#CB997E',
    btnImage: '/assets/rocosos/infographic_m2/btn_escarpas-tectonicas.jpg',
    image: '/assets/rocosos/infographic_m2/hero_escarpas-tectonicas.jpg',
    content: [
      'Cuando un objeto muy caliente se enfría, suele encogerse y arrugarse. Piensa en una manzana fresca que se deja al aire durante semanas: a medida que pierde agua y se enfría, la piel suave de la manzana se arruga y crea pliegues marcados. Algo muy semejante le ocurrió a Mercurio a medida que su gigantesco núcleo de hierro se enfriaba lentamente tras su formación.',
      'Hace miles de millones de años, al enfriarse el interior metálico del planeta, Mercurio perdió volumen y se encogió. Como la corteza rocosa exterior ya estaba sólida y no podía encogerse fácilmente, la superficie tuvo que romperse y fracturarse, empujando enormes bloques de roca unos sobre otros para acomodar el menor tamaño del planeta.',
      'Este fenómeno creó gigantescos acantilados y arrugas tectónicas llamadas escarpas de contracción o rupes. Estas estructuras son impresionantes murallas de roca que se elevan hasta tres kilómetros de altura y se extienden por cientos de kilómetros a través del terreno craterizado de Mercurio como cicatrices arrugadas gigantes.',
      'Los geólogos planetarios calculan que Mercurio se redujo entre cinco y catorce kilómetros de diámetro total durante este proceso de enfriamiento global. Es como si el planeta entero se hubiera apretado la cintura varios talles a lo largo de su historia geológica.',
      'A diferencia de la Tierra, que tiene placas tectónicas que chocan y se mueven continuamente de lado a lado, Mercurio es un planeta de una sola placa rígida. Toda su actividad tectónica pasada ha sido causada exclusivamente por la contracción vertical a medida que el corazón del planeta perdía su calor primigenio.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Muchas de las escarpas más famosas de Mercurio llevan nombres de barcos de exploración históricos como Discovery, Endeavour y Beagle, rindiendo homenaje a los viajes marinos de la humanidad.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Imágenes de alta resolución capturadas por la sonda MESSENGER mostraron pequeñas escarpas muy frescas que cortan cráteres jóvenes, sugiriendo que Mercurio podría seguir encogiéndose y teniendo sismos hoy en día.' }
    ],
    fact: 'La escarpa más larga de Mercurio se llama Enterprise Rupes. Mide más de 1,000 kilómetros de longitud y supera los 3,000 metros de altura vertical en sus tramos más pronunciados.',
  },
  {
    id: 'crateres-y-hielo',
    title: 'Hielo Polar Sombrío',
    color: '#00B4D8',
    btnImage: '/assets/crateres_hielo_mercurio.png',
    image: '/assets/crateres_hielo_mercurio.png',
    content: [
      'Hablar de agua congelada en Mercurio parece una locura absoluta. ¿Cómo podría existir hielo en el planeta más cercano al Sol abrasador? La respuesta está en la geometría perfecta de su eje de rotación y en las profundas sombras de sus cráteres polares.',
      'El eje de rotación de Mercurio está casi completamente recto, inclinado apenas 0.03 grados respecto a su órbita. Esto significa que en los polos del planeta, el Sol siempre se ve justo en el horizonte, sin subir jamás en el cielo. Por esta razón, el fondo de los cráteres profundos ubicados en los polos nunca, jamás recibe la luz del Sol.',
      'Estas regiones son conocidas como zonas de sombra permanente. Dentro de estos pozos oscuros en los polos de Mercurio, la temperatura se mantiene congelada de forma eterna en más de ciento setenta grados Celsius bajo cero. Son verdaderas trampas de frío que no han visto una sola gota de luz solar en miles de millones de años.',
      'Cuando cometas y asteroides ricos en hielo chocaron contra Mercurio a lo largo del tiempo, el agua evaporada por el impacto viajó por el espacio hasta caer dentro de estas trampas frías. Al tocar el suelo supercongelado de los cráteres oscuros, el vapor se congeló al instante, acumulando gruesas capas de hielo puro cubiertas por polvo fino.',
      'En el año 2012, el espectrómetro de neutrones de la sonda espacial MESSENGER confirmó de forma definitiva la presencia de miles de millones de toneladas de hielo de agua en los polos de Mercurio. Es una de las sorpresas científicas más fascinantes del Sistema Solar: hielo eterno guardado en las sombras del infierno.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Antes de que las sondas espaciales lo visitaran, los astrónomos en la Tierra detectaron por primera vez la presencia de hielo en Mercurio en 1991 usando el gigantesco radiotelescopio de Arecibo en Puerto Rico, al hacer rebotar ondas de radar muy potentes en los polos del planeta.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El hielo en los polos de Mercurio está protegido por una capa superior de material orgánico oscuro de diez centímetros de grosor formado por compuestos de carbono traídos por los mismos cometas que entregaron el agua.' }
    ],
    fact: 'Se estima que los polos de Mercurio albergan entre 100 mil millones y 1 billón de toneladas de hielo de agua pura, cantidad suficiente para llenar miles de embalses terrestres.',
  },
  {
    id: 'campo-magnetico',
    title: 'El Campo Magnético',
    color: '#9D4EDD',
    btnImage: '/assets/rocosos/infographic_m2/btn_campo-magnetico.jpg',
    image: '/assets/rocosos/infographic_m2/hero_campo-magnetico.jpg',
    content: [
      'Durante mucho tiempo, los astrofísicos creyeron que Mercurio no podía tener un campo magnético propio. Según las teorías científicas, los planetas necesitan dos cosas para generar un escudo magnético mediante el efecto geodinamo: girar rápido sobre su eje y tener un núcleo metálico líquido en movimiento agitado. Como Mercurio gira muy despacio y es pequeño, se pensaba que su núcleo estaba congelado.',
      'Sin embargo, en 1974, la sonda Mariner 10 pasó cerca de Mercurio y detectó algo sorprendente: el pequeño planeta posee un campo magnético global activo. Aunque es débil en comparación con el de la Tierra, alcanzando apenas el uno por ciento de nuestra intensidad magnética, su sola existencia dejó perplejos a los científicos de todo el mundo.',
      'El campo magnético de Mercurio funciona como una burbuja protectora o magnetosfera rodeando el planeta. Esta burbuja desvía el viento solar cargado de partículas eléctricas de alta energía que brota continuamente del Sol cercano, evitando que bombardeen directamente toda la superficie.',
      'La presencia de este campo magnético demuestra de forma incontestable que el núcleo de hierro de Mercurio sigue estando parcialmente líquido y en movimiento convectivo. Las corrientes de metal fundido circulando lentamente en las profundidades generan corrientes eléctricas que mantienen vivo este escudo magnético estelar.',
      'No obstante, la magnetosfera de Mercurio es muy dinámica y sufre continuas brechas. Debido a la extrema cercanía del Sol, las ráfagas del viento solar con frecuencia aplastan el escudo magnético del planeta, permitiendo que las partículas solares choquen contra el suelo y levanten una tenue capa de átomos flotantes llamada exosfera.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El campo magnético de Mercurio está descentrado: su centro magnético se ubica unos 500 kilómetros al norte del centro geográfico del planeta. Esto significa que el polo sur de Mercurio está mucho más expuesto a la radiación solar agresiva que el polo norte.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El choque del viento solar contra la magnetosfera de Mercurio genera tornados magnéticos gigantescos llamados eventos de transferencia de flujo que canalizan plasma caliente directamente hacia la superficie del planeta.' }
    ],
    fact: 'Mercurio y la Tierra son los únicos dos planetas rocosos del Sistema Solar que poseen un campo magnético dipolar generado internamente por un dínamo activo en su núcleo.',
  },
  {
    id: 'gran-impacto',
    title: 'La Colisión Despojadora',
    color: '#F15BB5',
    btnImage: '/assets/rocosos/infographic_m2/btn_gran-impacto.jpg',
    image: '/assets/rocosos/infographic_m2/hero_gran-impacto.jpg',
    content: [
      '¿Por qué Mercurio tiene un núcleo de hierro tan exageradamente gigante y una corteza rocosa tan delgada? La hipótesis más aceptada entre los astrofísicos para resolver este gran enigma es la Teoría del Gran Impacto Despojador, un evento cataclísmico que ocurrió en la infancia del Sistema Solar.',
      'Hace más de cuatro mil cuatrocientos millones de años, el Mercurio primordial era un protoplaneta mucho más grande, con una masa equivalente al doble de la actual y una proporción normal de roca y metal similar a la de la Tierra o Marte. Estaba rodeado por un grueso manto de silicatos sobre su núcleo de hierro.',
      'Sin embargo, durante la fase caótica de acreción, un embrión planetario gigantesco del tamaño de Marte chocó de lado contra el joven Mercurio a una velocidad espantosa de decenas de kilómetros por segundo. La energía colosal del choque pulverizó y arrancó casi todo el manto rocoso exterior del planeta, lanzándolo al espacio en una inmensa nube de escombros vaporizados.',
      'La mayor parte de los fragmentos rocosos ligeros salieron despedidos hacia el espacio o fueron absorbidos por el Sol cercano debido a la intensa gravedad estelar. El denso núcleo de hierro de Mercurio, al ser más pesado y resistente, sobrevivió casi intacto a la colisión y volvió a juntarse con una pequeña fracción de la roca derretida.',
      'Como resultado de esta dramática embestida cósmica, Mercurio quedó despojado de la mayoría de sus capas rocosas externas. Nació así el planeta actual: un corazón metálico pesado envuelto en la delgada cicatriz de lo que alguna vez fue un manto rocoso completo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Simulaciones por computadora muestran que si el impacto hubiera sido directo en el centro en lugar de un choque rasante oblicuo, Mercurio habría sido destruido por completo en billones de pedazos sin dejar ningún planeta detrás.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Otra teoría alternativa propone que el intenso calor del joven Sol evaporó de forma natural las capas rocosas exteriores de Mercurio antes de que se enfriaran, aunque los datos de la sonda MESSENGER favorecen el escenario del gran impacto.' }
    ],
    fact: 'El cráter de impacto más grande de Mercurio es la Cuenca de Caloris. Mide 1,550 kilómetros de diámetro y el impacto que la creó fue tan fuerte que envió ondas de choque a través de todo el planeta, arrugando el terreno exactamente en el lado opuesto.',
  },
  {
    id: 'exploracion-bepicolombo',
    title: 'MESSENGER y BepiColombo',
    color: '#00F5D4',
    btnImage: '/assets/bepicolombo_probe.png',
    image: '/assets/bepicolombo_probe.png',
    content: [
      'Explorar Mercurio con naves espaciales es uno de los retos más difíciles de la ingeniería astronómica. Enviar una sonda hacia Mercurio es como tirar una pelota colina abajo hacia el Sol: la inmensa gravedad de nuestra estrella acelera la nave a velocidades tan altas que frenar para entrar en órbita requiere una cantidad gigantesca de combustible.',
      'La primera nave en volar cerca de Mercurio fue la estadounidense Mariner 10 entre 1974 y 1975, realizando tres pasadas veloces que fotografiaron por primera vez el 45 por ciento de su superficie craterizada. Tuvieron que pasar tres décadas para que la humanidad enviara otra misión a este mundo abrasador.',
      'En 2004, la NASA lanzó la histórica misión MESSENGER. Tras un complejo viaje de siete años usando sobrevuelos gravitacionales alrededor de la Tierra, Venus y el propio Mercurio para frenar, MESSENGER se convirtió en 2011 en la primera nave espacial en orbitar Mercurio, fotografiando el planeta completo y descubriendo su hielo polar.',
      'Actualmente, la exploración de Mercurio vive su momento más ambicioso con la misión conjunta BepiColombo, desarrollada por la Agencia Espacial Europea (ESA) y la agencia japonesa (JAXA). Lanzada en 2018, BepiColombo transporta dos sondas científicas altamente especializadas que llegarán juntas a la órbita de Mercurio.',
      'Las dos sondas de BepiColombo estudiarán simultáneamente la estructura interna, el campo magnético, la exosfera y la composición química de Mercurio con una precisión nunca antes vista, desvelando los últimos secretos del mundo más misterioso y denso del Sistema Solar interior.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La misión BepiColombo rinde homenaje al matemático e ingeniero italiano Giuseppe "Bepi" Colombo, quien calculó la maniobra precisa de asistencia gravitatoria que permitió a la sonda Mariner 10 visitar Mercurio tres veces en la década de 1970.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para resistir temperaturas de más de 350°C, la nave BepiColombo utiliza mantas aislantes compuestas por múltiples capas de titanio y cerámica blanca, además de radiadores especiales para expulsar el calor interno hacia el espacio.' }
    ],
    fact: 'Al final de su exitosa misión en 2015, la sonda MESSENGER se estrelló de forma controlada contra la superficie de Mercurio a 14,000 km/h, creando un nuevo cráter de 16 metros de ancho en el planeta.',
  },
];

export default function InteractiveInfographic_RocososM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,10,15,0.92) 0%, rgba(30,15,20,0.88) 40%, rgba(15,8,12,0.95) 100%)',
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
      <RockyDustField color1="230, 57, 70" color2="255, 159, 28" />
      <RocososHeader title="MERCURIO: EL HORNO DE HIERRO" subtitle="EL PLANETA MÁS CERCANO AL SOL" primaryColor="#E63946" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #E63946, #FF9F1C)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los 7 módulos superiores para explorar los secretos de Mercurio.
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

function RockyDustField({ color1 = '230, 57, 70', color2 = '255, 159, 28' }) {
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
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGradM2)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="hdrGradM2" x1="0" y1="0" x2="1" y2="0">
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
        background: 'rgba(20, 12, 18, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
