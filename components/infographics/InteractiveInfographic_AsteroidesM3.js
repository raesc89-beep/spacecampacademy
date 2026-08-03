'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Asteroides M3 themed: Cometas y Hielo Profundo) ──
function DecoCometTail({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M45 15 Q25 25 10 45 Q20 30 45 15 Z" fill={color} opacity="0.4" />
      <path d="M45 15 Q30 35 15 55 Q25 40 45 15 Z" fill={color} opacity="0.2" />
      <circle cx="45" cy="15" r="6" fill={color} opacity="0.9" />
      <line x1="45" y1="15" x2="5" y2="35" stroke={color} strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

function DecoOortCloud({ size = 70, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.9" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30 + 22 * Math.cos(rad)} cy={30 + 22 * Math.sin(rad)} r="1.5" fill={color} opacity="0.8" />;
      })}
    </svg>
  );
}

function DecoSublimation({ size = 70, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="18" y="28" width="24" height="24" rx="4" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <path d="M22 24 C22 18 26 18 26 12 M30 24 C30 18 34 18 34 12 M38 24 C38 18 42 18 42 12" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
    </svg>
  );
}

function DecoSolarWind({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M5 15 C20 15 30 25 55 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M5 30 C25 30 35 35 55 35" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M5 45 C15 45 30 40 55 45" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <circle cx="50" cy="25" r="3" fill={color} />
    </svg>
  );
}

function DecoSubSurfaceIce({ size = 70, color = '#81D4FA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M12 25 Q30 35 48 25" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      <polygon points="30,16 35,26 25,26" fill={color} opacity="0.7" />
      <polygon points="30,44 35,34 25,34" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoNucleus67P({ size = 70, color = '#FF8A65', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="22" cy="32" r="14" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <circle cx="38" cy="24" r="10" fill={color} opacity="0.4" stroke={color} strokeWidth="2" />
      <path d="M28 24 Q32 28 32 34" stroke={color} strokeWidth="2" fill="none" opacity="0.8" />
    </svg>
  );
}

const DECO_MAP = {
  'anatomia-cometa': [DecoCometTail, DecoSublimation, DecoSolarWind],
  'origen-nube-oort': [DecoOortCloud, DecoCometTail, DecoSubSurfaceIce],
  'sublimacion-hielo': [DecoSublimation, DecoSubSurfaceIce, DecoSolarWind],
  'viento-solar-colas': [DecoSolarWind, DecoCometTail, DecoNucleus67P],
  'cometas-agua-tierra': [DecoSubSurfaceIce, DecoOortCloud, DecoSublimation],
  'misiones-cometarias': [DecoNucleus67P, DecoCometTail, DecoSublimation],
  'destino-cometas': [DecoCometTail, DecoOortCloud, DecoSolarWind],
};

const BIBLIOGRAPHY = [
  'Whipple, F. L. (1950). "A comet model. I. The acceleration of Comet Encke", The Astrophysical Journal, 111, 375-394.',
  'Oort, J. H. (1950). "The structure of the cloud of comets surrounding the Solar System", Bulletin of the Astronomical Institutes of the Netherlands, 11, 91-110.',
  'Altwegg, K. et al. (2015). "67P/Churyumov-Gerasimenko, a Jupiter-family comet with a high D/H ratio", Science, 347(6220), 1261952.',
  'Festou, M. C. et al. (2004). "Comets II", University of Arizona Press.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'anatomia-cometa',
    title: 'Anatomía de un Cometa',
    color: '#00E5FF',
    btnImage: '/assets/asteroides/clean_cometas.png',
    image: '/assets/asteroides/clean_cometas.png',
    content: [
      'Imagina una bola de nieve gigante del tamaño de una ciudad completa, pero mezclada con tierra oscura, hollín de carbón y polvo de minerales antiguos. Así definió el astrofísico Fred Whipple a los cometas en 1950 en su famosa teoría de las "bolas de nieve sucias". Son los cuerpos más fríos y prístinos de todo nuestro Sistema Solar.',
      'El corazón de un cometa se llama Núcleo. Es un cuerpo sólido y poroso de unos pocos kilómetros de diámetro, compuesto por hielos de agua, dióxido de carbono, metano y amoníaco. La superficie del núcleo es extrañamente oscura, más negra que el carbón, porque está cubierta por una fina capa de materiales orgánicos complejos llamados tolinas.',
      'Cuando un cometa se acerca al Sol, el calor solar evapora los hielos de su superficie. Los gases en expansión arrastran consigo millones de diminutas partículas de polvo, creando una inmensa atmósfera temporal brillante alrededor del núcleo llamada Coma. La coma de un cometa puede expandirse hasta medir más de 100,000 kilómetros de ancho.',
      'A medida que el cometa continúa su viaje hacia el Sol, la radiación y el viento solar empujan la materia de la coma hacia atrás, formando las espectaculares Colas Cometarias. Estas colas no siguen la dirección del movimiento del cometa como el humo de un auto, sino que siempre apuntan en dirección opuesta al Sol.',
      'Todo cometa activo posee dos colas distintas: una Cola de Iones azulada y recta, formada por gases electrizados empujados por el viento solar, y una Cola de Polvo blanca y curvada, formada por granos de silicato empujados por la presión de la luz solar. Estas colas pueden desplegarse a lo largo de más de 100 millones de kilómetros.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'A pesar de que la coma y la cola de un cometa pueden ser más grandes que el propio Sol, su densidad es tan extremadamente baja que los astrónomos las definen como "un nada visible". Podrías comprimir toda una cola cometaria dentro de una maleta de mano.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El color azul intenso de la cola de iones de los cometas se debe a la fluorescencia de los cationes de monóxido de carbono (CO+) cuando son excitados por la luz ultravioleta emitida por el Sol.' }
    ],
    fact: 'El Cometa de Halley orbita alrededor del Sol cada 76 años. Fue el primer cometa reconocido como periódico por Edmond Halley en 1705, y su último paso cercano a la Tierra fue en 1986. Regresará a nuestro cielo en el año 2061.',
  },
  {
    id: 'origen-nube-oort',
    title: 'La Nube de Oort',
    color: '#B388FF',
    btnImage: '/assets/asteroides/hub_cometas.png',
    image: '/assets/asteroides/hub_cometas.png',
    content: [
      '¿De dónde vienen los cometas y dónde han estado guardados durante miles de millones de años? La respuesta nos lleva a los confines helados de nuestro Sistema Solar, a dos inmensos almacenes naturales de hielo: el Cinturón de Kuiper y la lejana Nube de Oort.',
      'El Cinturón de Kuiper es una estructura con forma de dona ubicada más allá de la órbita de Neptuno, entre 30 y 50 Unidades Astronómicas del Sol. Es el hogar de cometas de periodo corto como el cometa Halley y de planetas enanos como Plutón. Sus cuerpos orbitan de forma relativamente ordenada en el mismo plano que los demás planetas.',
      'Por otro lado, la Nube de Oort es una gigantesca cubierta esférica de billones de cuerpos helados que envuelve a todo el Sistema Solar por completo. Se extiende desde las 2,000 hasta las 100,000 Unidades Astronómicas del Sol, casi a mitad de camino de la estrella más cercana, Próxima Centauri.',
      'Los cometas almacenados en la Nube de Oort permanecieron allí desde la formación planetaria. Fueron expulsados hacia la periferia por los tirones gravitacionales de los planetas gigantes Júpiter y Saturno durante la infancia convulsa de nuestro vecindario estelar.',
      'De vez en cuando, el paso cercano de una estrella vecina o la fuerza de marea de la galaxia Vía Láctea empuja levemente a una de estas rocas heladas de la Nube de Oort. La saca de su reposo helado y la envía en una caída libre de millones de años hacia el Sol como un cometa de periodo largo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La distancia a la frontera exterior de la Nube de Oort es casi de un año luz. La sonda Voyager 1 tardará aproximadamente 300 años en alcanzar su borde interior y unos 30,000 años en atravesarla por completo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Jan Oort dedujo la existencia de esta reserva esférica en 1950 al notar que las órbitas de los cometas de periodo largo venían desde todas las direcciones del espacio tridimensional y no solo del plano orbital de los planetas.' }
    ],
    fact: 'Se calcula que la Nube de Oort contiene entre uno y cinco billones de objetos helados con un diámetro superior a un kilómetro, acumulando una masa total equivalente a varias veces la masa de la Tierra.',
  },
  {
    id: 'sublimacion-hielo',
    title: 'El Proceso de Sublimación',
    color: '#80DEEA',
    btnImage: '/assets/asteroides/hub_cometas_vector.png',
    image: '/assets/asteroides/hub_cometas_vector.png',
    content: [
      'En la Tierra estamos acostumbrados a que el hielo se derrita convirtiéndose en agua líquida antes de hervir para formar vapor. Sin embargo, en el vacío del espacio interplanetario no existe presión atmosférica que permita la existencia de agua líquida en la superficie de un objeto exento de atmósfera.',
      'Por esta razón, cuando un cometa helado se aproxima al Sol y su temperatura aumenta, ocurre un cambio de fase físico directo denominado Sublimación. El hielo sólido de agua, dióxido de carbono y monóxido se transforma instantáneamente en gas sin pasar en ningún momento por el estado líquido.',
      'La sublimación comienza a activarse cuando el cometa cruza la línea de hielo del Sistema Solar, ubicada aproximadamente a la distancia de la órbita de Júpiter. A medida que el calor solar penetra la costra rocosa, la presión de los gases atrapados bajo la superficie aumenta dramáticamente.',
      'Llega un punto en que los gases rompen la corteza frágil en violentos géiseres y chorros supersónicos de vapor. Estos chorros actúan como diminutos propulsores de cohete naturales. Al expulsar material de forma asimétrica, alteran el giro del núcleo y modifican ligeramente la órbita del cometa.',
      'Este proceso de sublimación es autodestructivo. Cada vez que un cometa pasa cerca del Sol pierde una capa de varios metros de grosor de hielos de su superficie. Tras unos cientos de órbitas, el cometa agota todos sus volatiles y se apaga para siempre.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los chorros de sublimación en los cometas pueden lanzar rocas del tamaño de casas al espacio. Las naves espaciales que visitan cometas deben llevar escudos metálicos especiales para no ser perforadas por este polvo hiperveloz.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El vapor de agua expulsado por sublimación se disocia rápidamente por fotólisis ultravioleta solar en radicales de hidroxilo (OH) y átomos de hidrógeno, creando una inmensa nube invisible de hidrógeno alrededor del cometa.' }
    ],
    fact: 'El cometa Hale-Bopp en 1997 expulsaba más de 250 toneladas de vapor de agua y 300 toneladas de polvo por segundo durante su perihelio, produciendo un resplandor visible a simple vista durante 18 meses consecutivos.',
  },
  {
    id: 'viento-solar-colas',
    title: 'El Viento Solar y las Colas',
    color: '#FFD54F',
    btnImage: '/assets/asteroides/clean_cometas.png',
    image: '/assets/asteroides/clean_cometas.png',
    content: [
      'Una de las características más desconcertantes de los cometas para los observadores antiguos era que sus colas no siempre siguen la trayectoria de la cabeza. Al alejarse del Sol, un cometa viaja con su cola por delante, como si fuera soplada por un vendaval invisible proveniente de nuestra estrella.',
      'El responsable de este comportamiento es el Viento Solar. El Sol emite continuamente hacia todas direcciones un flujo supersónico de plasma electrizado compuesto por protones y electrones a 400 kilómetros por segundo, acompañado de fotones de luz que ejercen una presión de radiación constante.',
      'La cola de iones o cola gaseosa se forma cuando las moléculas de monóxido de carbono y nitrógeno de la coma son ionizadas por la radiación ultravioleta. Al adquirir carga eléctrica, los iones quedan atrapados en el campo magnético del viento solar y son arrastrados en línea recta perfecta en dirección opuesta al Sol.',
      'La cola de polvo está formada por pequeños granos de silicatos y hollín. Como estos granos son neutros y tienen más masa, el viento solar no los arrastra tan rápido. En su lugar, la presión de la radiación solar los empuja suavemente mientras el cometa sigue moviéndose, curvando la cola a lo largo de su órbita.',
      'Cuando un cometa cruza una inversión de polaridad en el campo magnético solar, la cola de iones puede desprenderse por completo en un evento llamado Desconexión de Cola. El cometa pierde su cola azulada y vuelve a desarrollar una nueva en cuestión de pocas horas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El descubrimiento del viento solar se debió en gran medida al astrónomo Ludwig Biermann en 1951, quien dedujo su existencia al notar que la cola de iones de los cometas siempre apuntaba lejos del Sol sin importar su dirección de movimiento.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La presión de radiación que empuja a la cola de polvo es causada por los fotones solares que transfieren su momento lineal a las diminutas motas de polvo mineral que miden menos de una micra.' }
    ],
    fact: 'En mayo del año 2000, la sonda Ulysses cruzó por casualidad la cola del cometa C/1996 B2 Hyakutake a una distancia récord de 500 millones de kilómetros del núcleo, detectando sus iones característicos.',
  },
  {
    id: 'cometas-agua-tierra',
    title: '¿Trajeron el Agua?',
    color: '#81D4FA',
    btnImage: '/assets/asteroides/hub_cometas.png',
    image: '/assets/asteroides/hub_cometas.png',
    content: [
      'La Tierra es un planeta azul cubierto de océanos, pero cuando se formó hace 4,500 millones de años cerca del Sol primordial, el calor extremo evaporó todo el agua del disco interior. ¿De dónde provino entonces toda el agua que hoy llena nuestros mares y permite la existencia de la vida?',
      'Durante décadas, la hipótesis principal sostenía que los cometas, al ser inmensas reservas heladas del espacio exterior, bombardearon masivamente la Tierra joven durante el periodo del Gran Bombardeo Tardío, sembrando nuestro planeta de agua dulce y moléculas orgánicas esenciales.',
      'Para comprobar esta teoría fascinante, los científicos miden la relación entre el Hidrógeno y el Deuterio (el isótopo pesado del hidrógeno) en el agua de los cometas. Si los cometas trajeron el agua a la Tierra, la proporción D/H en su hielo debe ser idéntica a la cifra exacta que encontramos en los océanos terrestres.',
      'Sin embargo, las mediciones realizadas por sondas espaciales en cometas de la Nube de Oort y del Cinturón de Kuiper revelaron un resultado insospechado: la mayoría de los cometas tienen un nivel de deuterio hasta tres veces mayor que el agua del mar de la Tierra.',
      'Este hallazgo cambió el paradigma astrobiológico. Hoy se cree que la mayor parte del agua de la Tierra provino de asteroides húmedos tipo C del Cinturón Principal, mientras que los cometas aportaron un porcentaje menor pero fundamental de compuestos orgánicos complejos como aminoácidos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La sonda Rosetta descubrió en el cometa 67P el aminoácido Glicina, uno de los bloques fundamentales con los que las células vivas construyen las proteínas en los organismos de la Tierra.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El deuterio es un átomo de hidrógeno que contiene un neutrón extra en su núcleo. La proporción Deuterio/Hidrógeno actúa como la huella dactilar isotópica indiscutible para rastrear el origen geográfico del agua en el cosmos.' }
    ],
    fact: 'El cometa 103P/Hartley 2 es uno de los poquísimos cometas analizados cuya relación D/H coincide exactamente con la cifra de los océanos de la Tierra, demostrando la enorme diversidad compositiva de los cuerpos helados.',
  },
  {
    id: 'misiones-cometarias',
    title: 'Misiones Cometarias',
    color: '#FF8A65',
    btnImage: '/assets/asteroides/Rosseta.png',
    image: '/assets/asteroides/Rosseta.png',
    content: [
      'Estudiar los cometas con telescopios desde la Tierra no era suficiente para descifrar sus enigmas profundos. En las últimas décadas, las agencias espaciales han enviado audaces naves robóticas a toda velocidad para fotografiar, perforar e incluso aterrizar en estas bolas de hielo flotantes.',
      'La era dorada comenzó en 1986 con la "Armada del Halley". La sonda europea Giotto pasó a solo 600 kilómetros del núcleo del Cometa Halley, obteniendo las primeras imágenes históricas en detalle de un núcleo cometario negro expulsando chorros de polvo brillante.',
      'En 2004, la misión Stardust de la NASA voló a través de la coma del cometa Wild 2. Utilizó un gel sintético ultraligero llamado aerogel para atrapar miles de granos de polvo cometario y traerlos intactos de regreso a la Tierra en una cápsula con paracaídas.',
      'En 2005, la sonda Deep Impact disparó un proyectil de cobre de 370 kilos contra el núcleo del cometa Tempel 1. El impacto excavó un cráter y expulsó hielo del interior profundo, permitiendo a los espectrómetros analizar los ingredientes ocultos bajo la costra erosionada.',
      'El mayor hito fue la misión Rosetta de la ESA en 2014. Fue la primera nave en entrar en órbita alrededor de un cometa (el 67P/Churyumov-Gerasimenko) y liberar el pequeño módulo Philae sobre su superficie rocosa, escoltando al cometa durante más de dos años en su viaje hacia el Sol.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El aerogel de la misión Stardust se conoce como "humo congelado" por ser un material sintético compuesto por 99.8% de aire. Logró frenar las motas de polvo cometario que viajaban a 20,000 km/h sin derretirlas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El núcleo del cometa 67P tiene una forma bilobulada que recuerda a un patito de goma. Se formó por la colisión suave a baja velocidad de dos cometas independientes en los primeros tiempos del Sistema Solar.' }
    ],
    fact: 'Al finalizar su misión exitosa en septiembre de 2016, los controladores enviaron a la sonda Rosetta a un impacto controlado contra la superficie del cometa 67P, donde descansa para siempre junto al módulo Philae.',
  },
  {
    id: 'destino-cometas',
    title: 'El Destino de los Cometas',
    color: '#00E5FF',
    btnImage: '/assets/asteroides/Rosseta2.png',
    image: '/assets/asteroides/Rosseta2.png',
    content: [
      'Los cometas no son eternos. Cada vez que su órbita los lleva al perihelio cerca del calor del Sol, sufren una pérdida irreversible de masa. Con el paso del tiempo geológico, todos los cometas enfrentan un final definitivo por diversos caminos físicos.',
      'El destino más común para un cometa periódico es la Extinción Térmica. Tras cientos de pasadas solares, el cometa evapora todo su hielo superficial e interno. Pierde la capacidad de crear una coma y se transforma en una roca seca e inerte conocida como un Asteroide Extinto.',
      'Otro final dramático son los Cometas Kamikaze o Rozadores del Sol (Sungrazers). Pertenecen a familias como el grupo Kreutz, con órbitas que los llevan a pasar a pocos miles de kilómetros de la superficie solar. La intensa radiación y las fuerzas de marea gravitacional los evaporan o despedazan en vivo.',
      'Las fuerzas de marea no solo actúan cerca del Sol. Cuando el cometa Shoemaker-Levy 9 pasó demasiado cerca de Júpiter en 1992, la gravedad del gigante gaseoso lo descuartizó en 21 fragmentos. Dos años después, en 1994, la cadena de fragmentos chocó contra la atmósfera de Júpiter en impactos colosales.',
      'Finalmente, los empujones gravitacionales de los planetas gigantes pueden acelerar a un cometa por encima de la velocidad de escape del Sistema Solar. En ese caso, la roca helada es arrojada para siempre al abismo helado interorbital, convirtiéndose en un cometa nómada interestelar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Se calcula que cerca del 10% de los asteroides cercanos a la Tierra que catalogamos hoy como rocosos son en realidad cometas extintos que agotaron todos sus hielos y quedaron cubiertos por una capa de polvo oscuro.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El telescopio espacial SOHO de la NASA y la ESA ha descubierto más de 4,000 cometas rozadores del Sol analizando las imágenes de su coronógrafo solar desde su lanzamiento en 1995.' }
    ],
    fact: 'El cometa Biela fue presenciado fragmentándose en dos piezas en 1846. En su siguiente retorno en 1852 las dos piezas continuaron separándose, para luego desaparecer por completo y dar origen a la intensa lluvia de meteoros de las Andrómedidas.',
  },
];

export default function InteractiveInfographic_AsteroidesM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,20,35,0.92) 0%, rgba(12,15,32,0.88) 50%, rgba(10,12,30,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <CosmicDustField />
      <AsteroidesM3Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #00E5FF, #B388FF)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
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
                Selecciona uno de los módulos superiores para explorar los secretos helados de los cometas y el espacio profundo.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(0,229,255,0.4)' }}>
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

function CosmicDustField() {
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
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '0, 229, 255' : '179, 136, 255',
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
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function AsteroidesM3Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM3)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#00E5FF','#B388FF','#80DEEA','#FFD54F','#81D4FA','#FF8A65','#00E5FF'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#00E5FF" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">COMETAS Y HIELO PROFUNDO</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(0,229,255,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA NUBE DE OORT Y LAS COLAS HELADAS</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(0,229,255,0.2)'}`,
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
          layoutId="activeDotAsteroidesM3"
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
        background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
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
                  {i === 0 ? 'SECCIÓN 1' : 'SECCIÓN 2'}
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
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
