'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Asteroides M1 themed) ───────────────────────────
function DecoAsteroidCore({ size = 70, color = '#FF6B6B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M25 8 L42 12 L52 28 L46 48 L26 54 L10 40 L12 20 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" fill={color} opacity="0.4" />
      <circle cx="38" cy="36" r="5" fill={color} opacity="0.5" />
      <circle cx="22" cy="42" r="3" fill={color} opacity="0.3" />
      <path d="M25 8 L42 12 L52 28 L46 48 L26 54 L10 40 L12 20 Z" fill={color} opacity="0.15" />
    </svg>
  );
}

function DecoProtoplanet({ size = 70, color = '#4D96FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="26" ry="8" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
      <circle cx="30" cy="30" r="10" fill={color} opacity="0.3" />
      <circle cx="20" cy="26" r="3" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoJupiterGrav({ size = 70, color = '#FFD93D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="2" />
      <path d="M10 24 Q30 20 50 24" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <path d="M8 32 Q30 36 52 32" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <circle cx="38" cy="34" r="4" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoKirkwoodGap({ size = 70, color = '#6BCB77', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <path d="M15 15 L45 45 M45 15 L15 45" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoCollision({ size = 70, color = '#9B51E0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M30 10 L34 24 L48 26 L36 34 L40 48 L30 38 L20 48 L24 34 L12 26 L26 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.8" />
      <line x1="10" y1="10" x2="22" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="10" x2="38" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DecoYarkovsky({ size = 70, color = '#FF884B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="26" cy="30" r="14" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <path d="M40 18 C48 24 48 36 40 42" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M44 12 C54 22 54 38 44 48" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.5" />
      <line x1="10" y1="30" x2="20" y2="30" stroke={color} strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

const DECO_MAP = {
  'que-es-asteroide': [DecoAsteroidCore, DecoProtoplanet, DecoCollision],
  'origen-cinturon': [DecoProtoplanet, DecoJupiterGrav, DecoAsteroidCore],
  'efecto-jupiter': [DecoJupiterGrav, DecoKirkwoodGap, DecoCollision],
  'resonancias-kirkwood': [DecoKirkwoodGap, DecoAsteroidCore, DecoYarkovsky],
  'tipos-espectrales': [DecoAsteroidCore, DecoCollision, DecoProtoplanet],
  'colisiones-familias': [DecoCollision, DecoJupiterGrav, DecoYarkovsky],
  'futuro-cinturon': [DecoYarkovsky, DecoKirkwoodGap, DecoAsteroidCore],
};

const BIBLIOGRAPHY = [
  'Gradie, J. & Tedesco, E. (1982). "Compositional structure of the asteroid belt", Science, 216(4553), 1405-1407.',
  'Morbidelli, A. et al. (2005). "Chaotic capture of Trojan asteroids in the Early Solar System", Nature, 437, 495-497.',
  'DeMeo, F. E. & Carry, B. (2014). "Solar System evolution from compositional mapping of the asteroid belt", Nature, 505, 329-334.',
  'Bottke, W. F. et al. (2006). "The Collisional Evolution of Small Solar System Bodies", Asteroids III, University of Arizona Press.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-asteroide',
    title: '¿Qué es un Asteroide?',
    color: '#FF6B6B',
    btnImage: '/assets/asteroides/clean_intro.png',
    image: '/assets/asteroides/clean_intro.png',
    content: [
      'Imagina que construyes una casa gigante de bloques de piedra. Al terminar tu trabajo, quedan decenas de pequeños fragmentos de rocas esparcidos por el suelo. Eso es exactamente lo que ocurrió cuando se formó nuestro Sistema Solar hace 4,600 millones de años. Los planetas grandes se armaron con la mayor parte del material. Los asteroides son aquellos ladrillos sobrantes que jamás lograron unirse para formar un planeta completo.',
      'A diferencia de las montañas de la Tierra que se erosionan con el viento y el agua, los asteroides han permanecido casi intactos. Son fósiles espaciales congelados en el tiempo. Guardan los secretos químicos de la nube primitiva de polvo y gas que dio origen al Sol. Al estudiar su composición interna, los científicos pueden reconstruir la receta original con la que se cocinó nuestro vecindario cósmico.',
      'La mayoría de estas rocas primordiales se encuentran orbitando entre las trayectorias de Marte y Júpiter. Esta región se conoce como el Cinturón Principal de Asteroides. Aunque en las películas de ciencia ficción vemos campos densos donde las naves deben esquivar piedras a cada segundo, en la realidad el espacio es enorme. La distancia promedio entre dos asteroides grandes es de más de un millón de kilómetros.',
      'El tamaño de los asteroides varía de manera gigantesca. Existen pequeños guijarros del tamaño de un autobús escolar y cuerpos masivos como el planeta enano Ceres, que mide casi mil kilómetros de diámetro. A pesar de su enorme número, si juntáramos todos los asteroides del cinturón principal en una sola esfera, su masa total sería menor que la de nuestra Luna.',
      'Comprender la naturaleza de los asteroides nos permite entender cómo evolucionaron los mundos rocosos como Mercurio, Venus, la Tierra y Marte. Además, estas rocas contienen minerales valiosos, metales puros y agua congelada. Esto convierte a los asteroides en las futuras estaciones de reabastecimiento para los astronautas que exploren el espacio profundo en los próximos siglos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer asteroide fue descubierto en la primera noche del siglo XIX, el 1 de enero de 1801, por el astrónomo italiano Giuseppe Piazzi. Lo bautizó con el nombre de Ceres en honor a la diosa romana de la agricultura. Durante varios años se le consideró el octavo planeta del Sistema Solar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La palabra "asteroide" proviene del griego antiguo y significa "con forma de estrella". Fue acuñada por el astrónomo William Herschel porque al observarlos a través de los telescopios de la época, estos cuerpos se veían como simples puntos luminosos idénticos a las estrellas lejanas.' }
    ],
    fact: 'El asteroide Ceres representa por sí solo un tercio de toda la masa acumulada en el Cinturón Principal. Posee una capa de hielo bajo su corteza rocosa que contiene más agua dulce que todos los ríos y lagos de la Tierra juntos.',
  },
  {
    id: 'origen-cinturon',
    title: 'Nacimiento del Cinturón',
    color: '#4D96FF',
    btnImage: '/assets/asteroides/hub_intro.png',
    image: '/assets/asteroides/hub_intro.png',
    content: [
      'En los primeros millones de años del Sistema Solar, una inmensa nube en espiral giraba alrededor del joven Sol. En ese disco protoplanetario, microscópicos granos de polvo comenzaron a chocar y pegarse entre sí por atracción electrostática. Con el paso del tiempo, estos grumos crecieron hasta convertirse en rocas de varios kilómetros llamadas planetesimales, los embriones de los futuros planetas.',
      'En las regiones cercanas a la Tierra y Marte, millones de estos planetesimales colisionaron pacíficamente a bajas velocidades. Se fusionaron progresivamente formando mundos gigantescos. Sin embargo, en la zona ubicada entre Marte y Júpiter el proceso de ensamblaje se interrumpió de manera drástica. Los fragmentos que giraban en esa franja jamás pudieron consolidar un planeta único.',
      'La razón de esta interrupción fue la rápida formación del gigante Júpiter. Al ser el primer planeta en crecer y acumular una masa colosal, Júpiter comenzó a ejercer una fuerza de gravedad monstruosa en todo su entorno. Su presencia perturbó el ritmo constante del disco de polvo y alteró para siempre la historia de esa región espacial.',
      'En lugar de chocar suavemente para unirse, los planetesimales del cinturón comenzaron a ser acelerados por los tirones gravitacionales de Júpiter. Sus velocidades aumentaron drásticamente, haciendo que los impactos entre ellos fueran destructivos. En vez de pegarse como plastilina, las rocas se rompían en mil pedazos al chocar, como dos autos a máxima velocidad.',
      'Así fue como la zona del Cinturón Principal quedó convertida en una enorme zona de escombros espaciales. La masa original que existía en esa región se dispersó casi por completo. Se calcula que el 99.9% del material primitivo fue arrojado fuera del Sistema Solar o devorado por el Sol y los planetas gigantes.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Si Júpiter no se hubiera formado tan rápido, el material del Cinturón Principal habría acumulado suficiente masa para crear un planeta rocoso del tamaño de la Tierra o Marte en esa misma órbita intermedia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los modelos numéricos avanzados muestran que la línea de nieve del Sistema Solar primordial cruzaba justo por el Cinturón Principal. Por esta razón, los asteroides internos son secos y rocosos, mientras que los externos contienen abundantes hielos y compuestos orgánicos.' }
    ],
    fact: 'El modelo de Niza sugiere que los planetas gigantes sufrieron una migración en sus órbitas primordiales. Este movimiento agitó el Cinturón Principal como un bote de pintura, mezclando objetos nacidos en diferentes regiones del Sistema Solar.',
  },
  {
    id: 'efecto-jupiter',
    title: 'La Gravedad de Júpiter',
    color: '#FFD93D',
    btnImage: '/assets/asteroides/hub_intro_vector.png',
    image: '/assets/asteroides/hub_intro_vector.png',
    content: [
      'Imagina que estás en un parque jugando a empujar a un niño en un columpio. Si lo empujas exactamente en el momento justo de cada ida y vuelta, la amplitud del balanceo aumentará cada vez más. Eso es precisamente lo que hace Júpiter con la gravedad sobre miles de asteroides del cinturón. Este fenómeno físico de sincronización se conoce como resonancia gravitacional.',
      'Júpiter tarda casi 12 años terrestres en dar una vuelta completa alrededor del Sol. Si un asteroide orbita en una zona donde tarda exactamente 6 años (la mitad del tiempo de Júpiter), cada dos vueltas del asteroide coincidirán con una vuelta del gigante. En ese punto exacto, Júpiter le da un tirón gravitacional extra siempre en la misma dirección.',
      'Estos empujones periódicos y constantes deforman la órbita circular del asteroide. La convierten en una elipse muy alargada y excéntrica. Con el tiempo, el asteroide comienza a cruzar las trayectorias de otros planetas internos como Marte y la Tierra. Esto rompe el equilibrio y expulsa a la roca de su lugar seguro en el cinturón.',
      'Gracias a este mecanismo de bomba gravitacional impulsado por Júpiter, muchos asteroides abandonan el Cinturón Principal. Inician viajes peligrosos hacia el interior del Sistema Solar. Estos objetos son los que eventualmente pueden transformarse en asteroides cercanos a la Tierra y representar un riesgo de impacto con nuestro planeta.',
      'Además de expulsar rocas, la gravedad de Júpiter actúa como un escudo cósmico para la Tierra. Su enorme pozo gravitatorio desvía o destruye a miles de cometas y asteroides que de otro modo viajarían directamente hacia los planetas interiores. Es un freno dinámico permanente que moldea todo nuestro vecindario espacial.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Júpiter no solo agita el cinturón principal, sino que también atrapa asteroides en su propia órbita. Estos grupos de rocas se llaman Asteroides Troyanos y viajan en dos grandes caravanas 60 grados por delante y por detrás del planeta.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La masa de Júpiter es 318 veces mayor que la de la Tierra. Su campo gravitatorio es tan potente que influye dinámicamente en la trayectoria de cualquier cuerpo menor que se acerque a menos de 500 millones de kilómetros de distancia.' }
    ],
    fact: 'En el año 1994, el cometa Shoemaker-Levy 9 fue despedazado por las fuerzas de marea gravitacional de Júpiter. Los fragmentos chocaron contra la atmósfera del gigante dejando cicatrices oscuras visibles durante meses.',
  },
  {
    id: 'resonancias-kirkwood',
    title: 'Huecos de Kirkwood',
    color: '#6BCB77',
    btnImage: '/assets/asteroides/clean_intro.png',
    image: '/assets/asteroides/clean_intro.png',
    content: [
      'En el año 1866, el astrónomo estadounidense Daniel Kirkwood realizó un mapa detallado sobre la distribución de las distancias entre los asteroides y el Sol. Esperaba encontrar una franja uniforme llena de rocas en todo el cinturón. Sin embargo, al analizar los datos descubrió algo desconcertante: existían regiones completamente vacías donde no orbitaba prácticamente ningún asteroide.',
      'Estas autopistas desiertas en medio del espacio se conocen hoy como los Huecos de Kirkwood. No son barreras físicas ni paredes invisibles. Son franjas donde las fuerzas gravitacionales de Júpiter impiden que cualquier cuerpo permanezca orbitando de forma estable a largo plazo. Si una roca espacial entra en una de estas zonas, es expulsada rápidamente.',
      'Los huecos coinciden exactamente con proporciones matemáticas simples del periodo orbital de Júpiter. Por ejemplo, en la resonancia 3:1, un asteroide da tres vueltas al Sol por cada una de Júpiter. En la resonancia 5:2, da cinco vueltas por cada dos del gigante. En esas distancias precisas, el tirón gravitacional constante limpia la franja por completo.',
      'Es fácil visualizarlo como un disco de vinilo en movimiento al que le han borrado varios surcos concentricos. Cualquier asteroide que caiga en un surco desierto por colisión o deriva térmica es eyectado en pocos millones de años. Su trayectoria se vuelve caótica y es enviado hacia las órbitas de Marte o la Tierra.',
      'Los Huecos de Kirkwood son las principales tuberías de escape del Cinturón Principal. Gracias a estos canales dinámicos descubiertos por Kirkwood, recibimos en la Tierra un flujo constante de meteoritos que caen sobre nuestra atmósfera y aportan información valiosa a los geólogos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Daniel Kirkwood no usó supercomputadoras para su hallazgo. Realizó cálculos a mano analizando apenas el centenar de asteroides conocidos en su época. Su agudeza matemática demostró el poder de la ley de gravedad de Newton.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El tiempo promedio que le toma a una roca espacial ser expulsada del Cinturón Principal tras caer en la resonancia 3:1 de Kirkwood es de aproximadamente un millón de años. Un suspiro en la escala de tiempo astronómica.' }
    ],
    fact: 'Existen también zonas de acumulación llamadas "familias dinámicas". Son agrupaciones de asteroides que comparten órbitas estables fuera de las resonancias destructivas de Kirkwood.',
  },
  {
    id: 'tipos-espectrales',
    title: 'Tipos C, S y M',
    color: '#9B51E0',
    btnImage: '/assets/asteroides/hub_intro.png',
    image: '/assets/asteroides/hub_intro.png',
    content: [
      'Si observamos el Cinturón Principal con telescopios equipados con espectrómetros, descubriremos que los asteroides no son todos iguales. Se dividen en tres grandes familias según su color, su capacidad para reflejar la luz y su composición química. Estas clases principales se denominan tipo C, tipo S y tipo M.',
      'Los asteroides de tipo C son los más abundantes del Sistema Solar, representando más del 75% del total. Son extremadamente oscuros, como el carbón, porque contienen grandes cantidades de carbono primordial, silicatos hidratados y compuestos orgánicos. Se encuentran concentrados principalmente en la parte exterior del cinturón, lejos del calor intenso del Sol.',
      'Los asteroides de tipo S son rocosos y brillantes, representando el 17% de la población. Están compuestos por silicatos de hierro y magnesio, junto con minerales como el olivino y el piroxeno. Ocupan la zona interior del cinturón, más cercana a Marte. Han sufrido procesos de calentamiento térmico que alteraron su estructura mineralógica original.',
      'Los asteroides de tipo M son los más raros y fascinantes. Son cuerpos casi totalmente metálicos hechos de una aleación pura de hierro y níquel, acompañados de metales preciosos como platino, oro y cobalto. Se cree que son los núcleos expuestos de antiguos protoplanetas que fueron destruidos por colisiones catastróficas en los inicios del cosmos.',
      'Esta clasificación tridimensional revela la historia térmica del disco solar primitivo. Cerca del Sol el calor evaporó los hielos y volatiles dejando metales y silicatos duros. En las zonas exteriores los compuestos carbónicos y el agua congelada lograron sobrevivir retenidos dentro de las rocas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El asteroide 16 Psyche es el cuerpo de tipo M más grande conocido. Mide unos 220 kilómetros de ancho y su valor económico estimado en metales industriales supera los 10,000 cuatrillones de dólares.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La reflectividad de un asteroide se mide con una escala llamada albedo. Un asteroide tipo C refleja apenas el 3% de la luz solar que recibe, mientras que un asteroide tipo S refleja hasta el 20% de la luz incidente.' }
    ],
    fact: 'La espectroscopia astronómica permite identificar la huella dactilar de los minerales midiendo qué longitudes de onda de la luz solar son absorbidas por la superficie de la roca espacial.',
  },
  {
    id: 'colisiones-familias',
    title: 'Colisiones y Familias',
    color: '#FF884B',
    btnImage: '/assets/asteroides/hub_intro_vector.png',
    image: '/assets/asteroides/hub_intro_vector.png',
    content: [
      'El Cinturón de Asteroides no es un lugar tranquilo e inmóvil; es una pista de autos chocadores a escala cósmica. A lo largo de miles de millones de años, incontables rocas espaciales han colisionado violentamente a velocidades promedio de 18,000 kilómetros por hora. Estos choques destructivos despedazan a los cuerpos padres en miles de fragmentos menores.',
      'Cuando un gran asteroide es destruido por un impacto masivo, los escombros resultantes no se dispersan caóticamente por todo el universo. Debido a las leyes de la física orbital, todos los fragmentos continúan viajando juntos por el espacio. Mantienen órbitas muy similares a las del objeto original, formando lo que los astrónomos llaman una Familia de Asteroides.',
      'Los miembros de una misma familia comparten características químicas identicas porque provienen del mismo cuerpo progenitor. Tienen el mismo color, albedo y composición mineral. Es como encontrar las piezas de un jarrón roto esparcidas a lo largo de un camino: sabes que todas pertenecían al mismo objeto.',
      'Una de las familias más famosas es la Familia Vesta. Consta de cientos de pequeños asteroides que fueron arrancados de la superficie del asteroide masivo Vesta tras un impacto gigante hace mil millones de años. Los fragmentos de esta familia terminaron cayendo en la Tierra como meteoritos acondritos basálticos.',
      'Estudiar las familias de asteroides nos permite calcular la edad exacta en que ocurrieron los grandes choques del pasado. Funciona como una ciencia forense espacial donde los astrónomos rebobinan las órbitas de miles de rocas para descubrir el punto exacto donde ocurrió la explosión inicial.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En la superficie del asteroide Vesta existe un cráter gigante llamado Rheasilvia. Mide 505 kilómetros de diámetro y su montaña central es dos veces más alta que el Monte Everest en la Tierra.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Se han catalogado más de 100 familias de asteroides distintas en el Cinturón Principal. Algunas tienen menos de diez millones de años de antigüedad, lo que representa eventos muy recientes en la escala del universo.' }
    ],
    fact: 'El impacto que destruyó al asteroide padre de la familia Koronis produjo más de 300 fragmentos conocidos que superan los 20 kilómetros de diámetro cada uno, viajando en perfecta formación orbital.',
  },
  {
    id: 'futuro-cinturon',
    title: 'Evolución Futura',
    color: '#00E5FF',
    btnImage: '/assets/asteroides/clean_intro.png',
    image: '/assets/asteroides/clean_intro.png',
    content: [
      'A primera vista, el Cinturón de Asteroides parece un sistema estático que ha permanecido igual desde los tiempos pretéritos. Sin embargo, se encuentra en un estado de cambio continuo y gradual. Existen fuerzas sutiles pero imparables que modifican sin descanso las órbitas de estas rocas a lo largo del tiempo profundo.',
      'Una de las fuerzas más sorprendentes es el Efecto Yarkovsky. Ocurre cuando un asteroide absorbe la luz del Sol, se calienta y luego emite ese calor de vuelta al espacio mientras gira sobre su eje. Esta pequeña radiación térmica actúa como un diminuto motor de empuje fotónico. Lentamente mueve al asteroide hacia afuera o hacia adentro de su órbita.',
      'A lo largo de millones de años, el Efecto Yarkovsky empuja pacientemente a los asteroides pequeños hacia las zonas de resonancia de Kirkwood. Una vez que una roca llega a esa posición crítica, la fuerza gravitatoria de Júpiter toma el control y la dispara fuera del cinturón principal. Es una cinta transportadora cósmica hacia el espacio interior.',
      'En el futuro lejano, dentro de unos 5,000 millones de años, el Sol agotará su combustible nuclear de hidrógeno. Se expandirá hasta convertirse en una estrella gigante roja. Devorará a Mercurio, Venus y probablemente a la Tierra. Su pérdida de masa alterará drásticamente la atracción gravitatoria de todo el Sistema Solar.',
      'Durante esa fase tardía, el Cinturón de Asteroides sufrirá una perturbación masiva. Muchas rocas serán evaporadas por la radiación extrema del Sol moribundo. Las supervivientes serán arrojadas hacia el espacio interestelar, convirtiéndose en asteroides nómadas que vagarán para siempre entre las estrellas de la Vía Láctea.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Efecto YORP es una variante del efecto Yarkovsky que no cambia la órbita de la roca, sino su velocidad de rotación. Puede hacer que un asteroide gire tan rápido que termine despedazándose por fuerza centrífuga.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fuerza del empuje fotónico del Efecto Yarkovsky es minúscula, equivalente al peso de una hoja de papel sobre la palma de tu mano. Pero aplicada de forma ininterrumpida durante millones de años, puede desplazar a un asteroide miles de kilómetros.' }
    ],
    fact: 'El Cinturón de Asteroides pierde masa de forma constante. Se estima que en un milagro de tiempo de varios billones de años, la franja quedará casi vacía por la evaporación y expulsión de sus cuerpos rocosos.',
  },
];

export default function InteractiveInfographic_AsteroidesM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(12,14,35,0.92) 0%, rgba(20,10,30,0.88) 50%, rgba(10,12,32,0.95) 100%)',
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
      <AsteroidesM1Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF6B6B, #4D96FF)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los módulos superiores para explorar los orígenes primitivos del Cinturón Principal.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(255,107,107,0.4)' }}>
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
      hue: Math.random() > 0.5 ? '255, 107, 107' : '77, 150, 255',
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

function AsteroidesM1Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,107,107,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM1)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#FF6B6B','#4D96FF','#FFD93D','#6BCB77','#9B51E0','#FF884B','#00E5FF'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#FF6B6B" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#FF6B6B" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#FF6B6B" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,107,107,0.2)" />
            <stop offset="50%" stopColor="rgba(255,107,107,0.9)" />
            <stop offset="100%" stopColor="rgba(255,107,107,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#FF6B6B" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CINTURÓN PRINCIPAL</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(255,107,107,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">ORÍGENES DE LOS ASTEROIDES</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,107,107,0.2)'}`,
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
          layoutId="activeDotAsteroidesM1"
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
