'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Asteroides M2 themed: Meteoros y Cráteres) ───────
function DecoMeteor({ size = 70, color = '#FF7043', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M45 10 L20 35 L12 45 L5 55 L15 48 L25 40 L50 15 Z" fill={color} opacity="0.4" />
      <circle cx="45" cy="15" r="5" fill={color} opacity="0.9" />
      <line x1="45" y1="15" x2="10" y2="50" stroke={color} strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
    </svg>
  );
}

function DecoBolide({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="14" fill={color} opacity="0.3" />
      <circle cx="30" cy="30" r="8" fill={color} opacity="0.8" />
      <path d="M30 6 L30 54 M6 30 L54 30 M13 13 L47 47 M47 13 L13 47" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoCrater({ size = 70, color = '#AB47BC', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <ellipse cx="30" cy="35" rx="24" ry="12" fill="none" stroke={color} strokeWidth="2" />
      <ellipse cx="30" cy="35" rx="16" ry="7" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      <path d="M30 35 L30 25 M26 35 L26 28 M34 35 L34 28" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M6 35 C15 20 45 20 54 35" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoShockwave({ size = 70, color = '#26A69A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M10 50 Q30 10 50 50" fill="none" stroke={color} strokeWidth="3" opacity="0.8" />
      <path d="M16 52 Q30 20 44 52" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <path d="M22 54 Q30 30 38 54" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="22" r="3" fill={color} />
    </svg>
  );
}

function DecoAtmosphere({ size = 70, color = '#29B6F6', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M5 45 C15 25 45 25 55 45" fill="none" stroke={color} strokeWidth="3" opacity="0.7" />
      <path d="M10 35 C20 18 40 18 50 35" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
      <circle cx="30" cy="18" r="4" fill={color} opacity="0.8" />
      <line x1="30" y1="18" x2="30" y2="38" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoTekTite({ size = 70, color = '#EC407A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M30 10 Q48 20 40 40 Q30 52 18 42 Q10 28 30 10 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="2" />
      <circle cx="28" cy="26" r="3" fill={color} opacity="0.6" />
      <path d="M22 34 Q30 42 36 32" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
    </svg>
  );
}

const DECO_MAP = {
  'viaje-atmosferico': [DecoMeteor, DecoAtmosphere, DecoBolide],
  'diferencia-terminos': [DecoAtmosphere, DecoMeteor, DecoTekTite],
  'tipos-meteoritos': [DecoTekTite, DecoBolide, DecoCrater],
  'formacion-crateres': [DecoCrater, DecoShockwave, DecoMeteor],
  'impacto-chicxulub': [DecoShockwave, DecoCrater, DecoAtmosphere],
  'lluvias-estrellas': [DecoBolide, DecoMeteor, DecoAtmosphere],
  'meteoritos-famosos': [DecoAtmosphere, DecoTekTite, DecoCrater],
};

const BIBLIOGRAPHY = [
  'Chyba, C. F. et al. (1993). "The 1908 Tunguska explosion: atmospheric disruption of a stony asteroid", Nature, 361, 40-44.',
  'Alvarez, L. W. et al. (1980). "Extraterrestrial cause for the Cretaceous-Tertiary extinction", Science, 208(4448), 1095-1108.',
  'Popova, O. P. et al. (2013). "Chelyabinsk airburst: damage assessment, recovery of meteorites, and characterization", Science, 342(6162), 1069-1073.',
  'Melosh, H. J. (1989). "Impact Cratering: A Geologic Process", Oxford University Press.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'viaje-atmosferico',
    title: 'La Entrada Atmosférica',
    color: '#FF7043',
    btnImage: '/assets/asteroides/hub_meteoros.png',
    image: '/assets/asteroides/hub_meteoros.png',
    content: [
      'Imagina correr en una piscina con el agua hasta la cintura; sientes una resistencia enorme que te frena. Ahora imagina entrar a la atmósfera de la Tierra a una velocidad de más de 60,000 kilómetros por hora. A esa velocidad extrema, el aire frente a la roca no alcanza a hacerse a un lado. Se comprime tan rápido que alcanza temperaturas superiores a los 2,000 grados Celsius.',
      'Existe la creencia popular de que el fuego de un meteoro se produce por el roce de la piedra contra el aire. Sin embargo, la causa real es la compresión adiabática. La roca actúa como el pistón de una bomba de bicicleta gigante, apretando el aire atmosférico con tanta violencia que lo convierte en un plasma incandescente extremadamente caliente.',
      'A medida que la roca espacial se adentra en capas atmosféricas más densas, la presión mecánica sobre su superficie aumenta drásticamente. Para la mayoría de los asteroides pequeños o frágiles, esta fuerza aplastante supera la resistencia del material. La piedra explota en el aire en un evento devastador denominado explosión atmosférica o bolido.',
      'El calor abrasador derrite y evapora las capas exteriores del meteoroide en un proceso llamado ablación. Esta materia fundida sale despedida hacia atrás dejando una estela brillante de gas ionizado que puede medir decenas de kilómetros. Es la hermosa huella luminosa que observamos en el cielo nocturno durante unos breves segundos.',
      'Los meteoroides que logran sobrevivir a este infierno atmosférico frenan drásticamente su velocidad. Pasan por una fase de vuelo oscuro donde se enfrían rápidamente antes de tocar el suelo. Caen a la Tierra a velocidad terminal, similar a la de una piedra lanzada desde la cima de un edificio alto.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La mayoría de los meteoros que brillan intensamente en el cielo nocturno son causados por fragmentos de polvo diminutos del tamaño de un grano de arena. Se evaporan por completo a más de 80 kilómetros de altura sobre nuestras cabezas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El estampido sónico que se escucha tras el paso de un gran meteoro es una onda de choque originada por la velocidad supersónica. Tarda varios minutos en viajar desde la alta atmósfera hasta el suelo donde se encuentran los observadores.' }
    ],
    fact: 'Durante la ablación atmosférica, la superficie del meteoroide se derrite formando una fina corteza de fusión negra y brillante. Esta capa vítrea de menos de un milímetro de grosor es la principal seña de identidad para reconocer un meteorito auténtico.',
  },
  {
    id: 'diferencia-terminos',
    title: 'Meteoroide, Meteoro y Meteorito',
    color: '#29B6F6',
    btnImage: '/assets/asteroides/hub_meteoros_vector.png',
    image: '/assets/asteroides/hub_meteoros_vector.png',
    content: [
      'En el lenguaje cotidiano es común usar las palabras meteoro, meteorito y asteroide como si fueran sinónimos. Sin embargo, en la astronomía profesional cada término describe una etapa completamente diferente en la vida de una roca espacial. Conocer estas distinciones nos ayuda a entender mejor el ciclo de viaje de los cuerpos menores.',
      'Un Meteoroide es el objeto físico mientras aún se encuentra viajando por el vacío del espacio interplanetario. Su tamaño va desde una diminuta mota de polvo hasta pequeñas rocas de menos de un metro de diámetro. Si supera ese tamaño, deja de ser un meteoroide para clasificarse formalmente como un asteroide.',
      'Un Meteoro no es un objeto sólido, sino el fenómeno luminoso y visual que ocurre cuando un meteoroide entra a la atmósfera terrestre. Es el destello brillante en el cielo al que popularmente llamamos "estrella fugaz". El meteoro es la luz producida por la ionización del aire y la evaporación del cuerpo espacial.',
      'Un Meteorito es el fragmento sólido de roca o metal que logra sobrevivir a la intensa quema atmosférica y alcanza la superficie de la Tierra. Es la piedra física que los geólogos y coleccionistas pueden recoger del suelo, guardar en un museo y analizar minuciosamente en laboratorios químicos.',
      'Para recordar las diferencias fácilmente usa esta regla: el Meteoroide viaja por el espacio fuera de la Tierra, el Meteoro es la luz bonita que ves cruzando el cielo, y el Meteorito es la piedra pesada que puedes sostener con tus propias manos sobre la palma.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cada día caen sobre la Tierra más de 100 toneladas de materia extraterrestre. La inmensa mayoría llega en forma de micrometeoritos microscópicos que se posan suavemente sobre los tejados de nuestras casas sin que lo notemos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los bólidos son meteoros excepcionalmente brillantes que superan el resplandor del planeta Venus en el cielo nocturno. A menudo explotan en múltiples fragmentos produciendo destellos verdes o azulados debido al hierro y magnesio fundidos.' }
    ],
    fact: 'Existen meteoritos de origen lunar y marciano. Fueron arrancados de la Luna o de Marte por impactos de asteroides gigantes y viajaron por el espacio durante millones de años antes de caer en la Tierra.',
  },
  {
    id: 'tipos-meteoritos',
    title: 'Condritas y Acondritas',
    color: '#EC407A',
    btnImage: '/assets/asteroides/clean_intro.png',
    image: '/assets/asteroides/clean_intro.png',
    content: [
      'Al estudiar los meteoritos recuperados en la Tierra, los científicos los dividen en tres grandes familias según su origen geológico: meteoritos rocosos, meteoritos metálicos y meteoritos mixtos. Dentro de los rocosos se encuentra la distinción más importante entre Condritas y Acondritas.',
      'Las Condritas son los meteoritos más primitivos e interesantes de todos, representando el 86% de los hallazgos terrestres. Se caracterizan por contener diminutas esferas de mineral petrificado llamadas cóndrulos. Estas esférulas se formaron por la fusión de polvo en la nebulosa solar primitiva antes de que existieran los planetas.',
      'Las condritas jamás sufrieron procesos de fusión o diferenciación térmica dentro de un planeta grande. Son archivos químicos intactos que preservan la materia primaria de la que se formó el Sistema Solar hace 4,567 millones de años. Incluyen las famosas condritas carbonáceas, ricas en agua y aminoácidos prebióticos.',
      'Las Acondritas son meteoritos rocosos que provienen de cuerpos padres grandes que sí se derivaron y fusionaron internamente, como grandes asteroides o planetas. Al calentarse, las rocas perdieron sus cóndrulos primordiales. Tienen estructuras volcánicas y basálticas muy parecidas a las rocas emitidas por los volcanes de la Tierra.',
      'Los Meteoritos Metálicos están compuestos casi exclusivamente por una aleación de hierro y níquel. Provienen del núcleo denso de antiguos protoplanetas que fueron despedazados por choques gigantescos. Al ser cortados y pulidos con ácido, muestran un hermoso patrón cristalino entrecruzado conocido como Estructura de Widmanstätten.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La estructura de Widmanstätten que presentan los meteoritos metálicos no se puede fabricar en ningún laboratorio terrestre. Requiere que la aleación de hierro y níquel se enfríe en el espacio a un ritmo increíblemente lento de un grado cada millón de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las condritas carbonáceas como el meteorito Allende contienen granos presolares. Son diminutos cristales de diamante y grafito que se sintetizaron en la atmósfera de estrellas moribundas antes del nacimiento de nuestro propio Sol.' }
    ],
    fact: 'El meteorito Hoba, hallado en Namibia en 1920, es el meteorito metálico más grande y pesado encontrado intacto en la Tierra. Pesa más de 60 toneladas y jamás ha sido movido de su lugar de impacto original.',
  },
  {
    id: 'formacion-crateres',
    title: 'Física de los Cráteres',
    color: '#AB47BC',
    btnImage: '/assets/asteroides/hub_meteoros.png',
    image: '/assets/asteroides/hub_meteoros.png',
    content: [
      'Cuando un gran asteroide choca contra la superficie de un planeta rocoso a velocidad hiperveloz, no se limita a empujar la tierra a los lados como una pala. El impacto libera de golpe una cantidad astronómica de energía cinética que desencadena una explosión descomunal, formando una depresión circular llamada cráter de impacto.',
      'El proceso de formación de un cráter ocurre en tres etapas consecutivas ultrarrápidas. La primera etapa es la de Contacto y Compresión. Dura una fracción de segundo mientras el impactador penetra en el suelo. Genera ondas de choque con presiones de millones de atmósferas que vaporizan instantáneamente la roca del proyectil.',
      'La segunda etapa es la de Excavación. Las ondas de choque se propagan en forma de cuenco a través del terreno circundante, empujando y expulsando miles de toneladas de material fracturado hacia afuera. Este material sale volando en parábola formando una manta de eyección que rodea los bordes del nuevo cráter.',
      'La tercera etapa es la de Modificación. El cuenco excavado se vuelve inestable y sus paredes colapsan hacia el centro por gravedad. En los cráteres grandes de más de 5 kilómetros, el suelo comprimido debajo del impacto rebota hacia arriba de forma elástica, creando una majestuosa montaña central en el corazón del cráter.',
      'Con el paso de milenios en la Tierra, la lluvia, el viento y la tectónica de placas erosionan y borran la mayoría de los cráteres. Sin embargo, en mundos sin atmósfera ni actividad geológica como la Luna o Mercurio, los cráteres permanecen impecables durante miles de millones de años como cicatrices perpetuas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El volumen del cráter final excavado por un asteroide hiperveloz suele ser entre 15 y 20 veces mayor que el propio diámetro de la roca impactante. Una piedra de 100 metros puede excavar un foso de casi dos kilómetros.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La enorme presión de un impacto altera la estructura cristalina del cuarzo en el suelo, produciendo un mineral raro llamado cuarzo chocado. Su presencia en las capas geológicas es la prueba irrefutable de un impacto asteroide antiguo.' }
    ],
    fact: 'El Cráter Meteor de Arizona (Barringer) es el cráter de impacto mejor conservado de la Tierra. Se formó hace 50,000 años por una roca de hierro de 50 metros y mide 1.2 kilómetros de diámetro por 170 metros de profundidad.',
  },
  {
    id: 'impacto-chicxulub',
    title: 'El Cataclisma de Chicxulub',
    color: '#FFD54F',
    btnImage: '/assets/asteroides/chicxulub_impact.png',
    image: '/assets/asteroides/chicxulub_impact.png',
    content: [
      'Hace 66 millones de años, al final del periodo Cretácico, un asteroide gigante de 10 kilómetros de diámetro viajaba a 70,000 kilómetros por hora directo hacia la Tierra. Impactó en la zona que hoy ocupa la península de Yucatán en México, desencadenando la quinta extinción masiva más devastadora en la historia de nuestro planeta.',
      'El impacto liberó una energía equivalente a más de mil millones de bombas atómicas juntas. Excavó en cuestión de segundos un cráter de 180 kilómetros de ancho y 20 kilómetros de profundidad conocido como la estructura de Chicxulub. La explosión vaporizó al instante miles de kilómetros cúbicos de rocas ricas en azufre y carbonatos.',
      'La onda de choque inicial provocó mega-tsunamis de más de 100 metros de altura que barrieron las costas continentales. Además, los escombros incandescentes arrojados al espacio cayeron de regreso a la atmósfera como millones de meteoros de fuego. Esto calentó el aire global hasta encender incendios forestales a escala planetaria.',
      'Lo más mortífero ocurrió en las semanas posteriores. Las diminutas partículas de hollín y polvo cargadas de azufre permanecieron suspendidas en la estratosfera durante años. Bloquearon por completo la luz del Sol, sumiendo al planeta en un invierno nuclear oscuro y helado que detuvo la fotosíntesis de las plantas.',
      'Sin vegetación, las cadenas tróficas terrestres y marinas colapsaron. Más del 75% de todas las especies vivas del planeta desaparecieron para siempre, incluidos los dinosaurios no aviares. El fin de su reinado abrió la oportunidad evolutiva para que los pequeños mamíferos florecieran y eventualmente dieran origen al ser humano.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los geólogos descubrieron el impacto de Chicxulub buscando una fina capa de arcilla enriquecida con iridio que existe en todo el mundo. El iridio es un metal rarísimo en la corteza terrestre pero abundantísimo en los asteroides.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los famosos cenotes de la península de Yucatán están distribuidos en un semicírculo perfecto. Siguen el anillo de falla exterior del cráter de Chicxulub donde la roca fracturada facilitó la disolución del suelo calcáreo.' }
    ],
    fact: 'El asteroide de Chicxulub tardó apenas dos segundos en cruzar toda la atmósfera terrestre desde el espacio hasta chocar contra el mar somero de Yucatán, dejando un túnel de vacío momentáneo tras de sí.',
  },
  {
    id: 'lluvias-estrellas',
    title: 'Lluvias de Meteoros',
    color: '#26A69A',
    btnImage: '/assets/asteroides/hub_meteoros_vector.png',
    image: '/assets/asteroides/hub_meteoros_vector.png',
    content: [
      'En ciertas épocas del año, si miras hacia el cielo nocturno despejado, puedes contemplar decenas de destellos luminosos cruzando el firmamento en pocas horas. Este espectáculo natural se conoce como Lluvia de Meteoros. Ocurre cuando la Tierra en su órbita atraviesa un río de escombros dejado atrás por un cometa o asteroide.',
      'A medida que los cometas se acercan al Sol, el calor sublima su hielo y libera millones de granos de polvo y roquitas. Estos fragmentos quedan flotando a lo largo del mismo camino orbital del cometa formando un enjambre continuo. Cada año, cuando la Tierra pasa por ese punto de intersección, los granitos entran a la atmósfera.',
      'Al observar una lluvia de meteoros, todos los destellos parecen salir de un mismo punto imaginario en el cielo nocturno llamado el Radiante. Debido a un efecto de perspectiva óptica (similar a ver las vías de un tren juntarse a lo lejos), la lluvia recibe el nombre de la constelación donde se ubica su radiante.',
      'Una de las lluvias más famosas de cada año son las Perseidas, que alcanzan su punto máximo a mediados de agosto. Son causadas por las partículas expulsadas por el cometa Swift-Tuttle. Otra lluvia destacada son las Gemínidas en diciembre, cuyo cuerpo progenitor es el inusual asteroide rocoso 3200 Phaethon.',
      'Para disfrutar de una lluvia de meteoros no necesitas telescopios ni binoculares complejos. La clave es alejarse de la contaminación lumínica de las grandes ciudades, acostarse boca arriba en el suelo, dejar que los ojos se adapten a la oscuridad durante 20 minutos y disfrutar del despliegue brillante del universo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En ocasiones excepcionales ocurren Tormentas de Meteoros. Suceden cuando la Tierra cruza un enjambre de polvo muy joven y denso, pudiendo observarse miles de meteoros por hora, como ocurrió en las Leónidas de 1833 y 1966.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad a la que entran los granos de polvo de una lluvia de meteoros oscila entre 11 y 72 kilómetros por segundo. Las Leónidas son las más rápidas, incinerándose a altitudes elevadas con destellos verdosos.' }
    ],
    fact: 'El cuerpo progenitor de las Gemínidas, el asteroide Phaethon, se comporta como un "cometa rocoso". Al acercarse intensamente al Sol, su superficie alcanza 750°C y se agrieta liberando nubes de polvo mineral.',
  },
  {
    id: 'meteoritos-famosos',
    title: 'Caídas Históricas',
    color: '#FF7043',
    btnImage: '/assets/asteroides/Marco Giovana y Meteorito.png',
    image: '/assets/asteroides/Marco Giovana y Meteorito.png',
    content: [
      'A lo largo de la historia de la humanidad han ocurrido eventos extraordinarios donde rocas espaciales han sido presenciadas cayendo del cielo. Estos acontecimientos han cambiado la ciencia moderna y dejado anécdotas sorprendentes grabadas en los registros históricos.',
      'Un hito fundamental ocurrió en febrero de 2013 sobre la ciudad de Cheliábinsk en Rusia. Un asteroide de 20 metros explotó a 30 kilómetros de altura liberando la energía de 30 bombas atómicas. La onda sónica rompió miles de ventanas e hirió a más de 1,500 personas, siendo grabado por cientos de cámaras de autos.',
      'En febrero de 1969 cayó en Chihuahua, México, el famoso Meteorito Allende. Fue un bólido brillante que se desintegró sobre miles de kilómetros cuadrados. Se recuperaron más de dos toneladas de condritas carbonáceas cargadas de inclusión de aluminio y calcio, siendo bautizado como la piedra Rosetta de la astroquímica.',
      'Otro caso insólito es el del Meteorito Peekskill de 1992 en Estados Unidos. Una bola de fuego verdosa cruzó varios estados antes de que un fragmento de 12 kilos cayera en el maletero de un automóvil Chevrolet sedán estacionado. El evento fue grabado en video por docenas de aficionados en estadios de fútbol.',
      'El único caso documentado de una persona golpeada directamente por un meteorito ocurrió en Alabama en 1954. Ann Hodges descansaba en su sofá cuando una piedra de 4 kilos atravesó el techo del hogar, rebotó en una radio de madera e impactó en su costado. Afortunadamente sobrevivió con solo un gran moretón.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En el año 1908 ocurrió el Evento de Tunguska en Siberia. Un asteroide de 50 metros explotó en el aire a 8 kilómetros de altura, aplanando 80 millones de árboles en una superficie de 2,000 kilómetros cuadrados.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El estudio del meteorito Allende permitió determinar con una precisión extrema la edad exacta del Sistema Solar en 4,567.3 millones de años, al analizar la desintegración isotópica de uranio en sus minerales.' }
    ],
    fact: 'El meteorito Murchison, caído en Australia en 1969, contenía más de 70 tipos de aminoácidos diferentes y bases nitrogenadas complejas, demostrando que los componentes de la vida se sintetizan naturalmente en el espacio.',
  },
];

export default function InteractiveInfographic_AsteroidesM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(25,12,25,0.92) 0%, rgba(15,10,30,0.88) 50%, rgba(12,10,28,0.95) 100%)',
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
      <AsteroidesM2Header />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF7043, #EC407A)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
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
                Selecciona uno de los módulos superiores para explorar la física de meteoros, meteoritos y cráteres de impacto.
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
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(255,112,67,0.4)' }}>
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
      hue: Math.random() > 0.5 ? '255, 112, 67' : '236, 64, 122',
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

function AsteroidesM2Header() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,112,67,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGradM2)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#FF7043','#29B6F6','#EC407A','#AB47BC','#FFD54F','#26A69A','#FF7043'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#FF7043" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#FF7043" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#FF7043" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGradM2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,112,67,0.2)" />
            <stop offset="50%" stopColor="rgba(255,112,67,0.9)" />
            <stop offset="100%" stopColor="rgba(255,112,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#FF7043" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">METEOROS Y CRÁTERES</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(255,112,67,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">IMPACTOS Y FÍSICA ATMOSFÉRICA</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,112,67,0.2)'}`,
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
          layoutId="activeDotAsteroidesM2"
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
