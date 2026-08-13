'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Theropod Predator themed) ————————————————————
function DecoSkull({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Skull outline */}
      <ellipse cx="30" cy="26" rx="18" ry="16" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="38" rx="8" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Eye sockets */}
      <circle cx="22" cy="22" r="5" fill={color} opacity="0.3" />
      <circle cx="38" cy="22" r="5" fill={color} opacity="0.3" />
      {/* Teeth */}
      {[18, 24, 30, 36, 42].map((x, i) => (
        <line key={i} x1={x} y1="34" x2={x} y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      ))}
      {/* Crest ridge */}
      <path d="M18 14 Q24 6 30 10 Q36 6 42 14" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoClaw({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Sickle claw */}
      <path d="M20 50 Q15 35 20 20 Q28 8 35 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M35 12 Q40 15 38 22" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Secondary claws */}
      <path d="M30 50 Q28 40 32 30 Q38 22 42 24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M40 50 Q39 42 42 35 Q46 28 48 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Scratch marks */}
      <line x1="10" y1="15" x2="16" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="12" y1="14" x2="18" y2="24" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoFootprint({ size = 80, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 70 63" style={{ opacity: 0.2, ...style }}>
      {/* Three-toed footprint */}
      <ellipse cx="35" cy="48" rx="14" ry="10" fill={color} opacity="0.2" />
      {/* Central toe */}
      <path d="M35 40 L35 15 Q35 10 37 8" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Left toe */}
      <path d="M28 42 L18 20 Q16 15 14 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Right toe */}
      <path d="M42 42 L52 20 Q54 15 56 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      {/* Toe pads */}
      <circle cx="37" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="14" cy="12" r="2" fill={color} opacity="0.35" />
      <circle cx="56" cy="12" r="2" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoBone({ size = 60, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Bone shaft */}
      <line x1="15" y1="45" x2="45" y2="15" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Bone ends (epiphyses) */}
      <circle cx="12" cy="48" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="18" cy="42" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="48" cy="12" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="42" cy="18" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Cross-section marks */}
      <line x1="26" y1="32" x2="30" y2="36" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="32" y1="26" x2="36" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoSpine({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Sail/spine shape */}
      <path d="M10 50 Q15 45 18 30 Q20 18 25 10 Q30 5 30 3" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 3 Q30 5 35 10 Q40 18 42 30 Q45 45 50 50" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Neural spines */}
      {[18, 25, 30, 35, 42].map((x, i) => {
        const y = 50 - Math.sin(((x - 10) / 40) * Math.PI) * 35;
        return <line key={i} x1={x} y1="50" x2={x} y2={y + 5} stroke={color} strokeWidth="1" opacity="0.4" />;
      })}
      {/* Base line */}
      <line x1="8" y1="52" x2="52" y2="52" stroke={color} strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

function DecoTooth({ size = 70, color = '#7D6B99', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Serrated tooth */}
      <path d="M25 8 Q22 15 20 25 Q18 40 22 50 Q28 56 32 50 Q36 40 34 25 Q32 15 30 8 Q28 5 25 8" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      {/* Serrations on edges */}
      {[15, 22, 29, 36, 43].map((y, i) => (
        <line key={`l${i}`} x1={20 - i * 0.3} y1={y} x2={18 - i * 0.3} y2={y + 3} stroke={color} strokeWidth="1" opacity="0.4" />
      ))}
      {[15, 22, 29, 36, 43].map((y, i) => (
        <line key={`r${i}`} x1={34 + i * 0.3} y1={y} x2={36 + i * 0.3} y2={y + 3} stroke={color} strokeWidth="1" opacity="0.4" />
      ))}
      {/* Root */}
      <path d="M23 8 Q27 2 31 8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'teropodos-linaje': [DecoFootprint, DecoBone, DecoSkull],
  'tyrannosaurus-rex': [DecoSkull, DecoTooth, DecoBone],
  'velociraptor-cazador': [DecoClaw, DecoFootprint, DecoTooth],
  'spinosaurus-acuatico': [DecoSpine, DecoBone, DecoSkull],
  'giganotosaurus-rival': [DecoSkull, DecoClaw, DecoFootprint],
  'armas-estrategias': [DecoTooth, DecoClaw, DecoBone],
  'depredadores-modernos': [DecoFootprint, DecoSpine, DecoTooth],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Brusatte, S. (2018). The Rise and Fall of the Dinosaurs, William Morrow',
  'Holtz, T.R. (2007). Dinosaurs: The Most Complete, Up-to-Date Encyclopedia, Random House',
  'Ibrahim, N. et al. (2014). Semiaquatic adaptations in a giant predatory dinosaur, Science, 345(6204)',
  'Persons, W.S. & Currie, P.J. (2011). Dinosaur Speed Demon: The Caudal Musculature of Carnotaurus, PLoS ONE, 6(5)',
  'Bates, K.T. & Falkingham, P.L. (2012). Estimating maximum bite performance in Tyrannosaurus rex, Biology Letters, 8(4)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'teropodos-linaje',
    title: 'Los Terópodos: Linaje de Cazadores',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/dinos_m3.png',
    image: '/assets/dinosaurios/dinos_m3.png',
    content: [
      'Los terópodos forman un clado de dinosaurios saurisquios que aparecieron durante el período Triásico Tardío, hace aproximadamente 231 millones de años, en lo que hoy es el territorio de Argentina. Los primeros representantes conocidos, como Eoraptor lunensis (descubierto en el Valle de la Luna, San Juan, Argentina, en 1991 por el paleontólogo Ricardo Martínez) y Herrerasaurus ischigualastensis, eran animales relativamente pequeños que ya mostraban las características fundamentales del grupo: postura bípeda obligada, extremidades anteriores prensiles con tres dedos funcionales y huesos huecos con cavidades neumáticas similares a las de las aves modernas.',
      'La palabra "terópodo" proviene del griego "therion" (bestia) y "pous" (pie), literalmente "pies de bestia". Este nombre fue acuñado por el paleontólogo Othniel Charles Marsh en 1881 durante las llamadas "Guerras de los Huesos", la rivalidad entre Marsh y Edward Drinker Cope que produjo el descubrimiento de más de 130 nuevas especies de dinosaurios en Norteamérica entre 1877 y 1892. Los terópodos se distinguen por sus huesos neumatizados, es decir, parcialmente huecos y llenos de sacos aéreos conectados al sistema respiratorio, lo que reducía su peso sin comprometer la resistencia estructural del esqueleto.',
      'Los pies de tres dedos funcionales que tocan el suelo son una característica diagnóstica del grupo. El primer dedo (hallux) estaba reducido y elevado del suelo en la mayoría de las especies, mientras que los dedos segundo, tercero y cuarto soportaban el peso del animal. Esta configuración dejó las icónicas huellas tridáctilas que se encuentran en yacimientos de todo el mundo, desde las 2,000 huellas de dinosaurio del yacimiento de Cal Orcko en Sucre, Bolivia (el mural de huellas más grande del mundo, con 462 pistas individuales), hasta las pisadas de Grallator en el valle del río Connecticut en Estados Unidos.',
      'La diversificación de los terópodos produjo una variedad de formas que desafía cualquier generalización simple. El rango de tamaños abarcaba desde el Microraptor zhaoianus, de apenas 77 centímetros de longitud y unos 900 gramos de peso, hasta el Spinosaurus aegyptiacus, que pudo alcanzar los 15 metros. Algunos terópodos abandonaron la dieta carnívora por completo: los tericinosaurios desarrollaron garras gigantescas de hasta 70 centímetros para arrancar vegetación, y los ornitomímidos ("imitadores de aves") adoptaron picos desdentados y dietas omnívoras.',
      'El legado más significativo de los terópodos no terminó con la extinción del Cretácico-Paleógeno hace 66 millones de años. Un linaje particular de terópodos pequeños y emplumados, los maniraptores, sobrevivió al evento de extinción y dio origen a las aves modernas. Hoy existen más de 10,000 especies de aves, lo que convierte a los terópodos en el grupo de dinosaurios con mayor éxito evolutivo de todos los tiempos, superando en diversidad actual a todos los mamíferos combinados (unas 6,400 especies).'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sistema respiratorio de los terópodos funcionaba mediante un flujo de aire unidireccional, exactamente igual al de las aves actuales y diferente al sistema bidireccional de los mamíferos. En los mamíferos, el aire entra y sale por el mismo conducto. En los terópodos y las aves, el aire circula en una sola dirección a través de los pulmones, usando sacos aéreos como fuelles. Este sistema es un 33% más eficiente para extraer oxígeno del aire, lo cual explica cómo los dinosaurios prosperaron durante millones de años con niveles atmosféricos de oxígeno variables.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La postura bípeda de los terópodos no era como la imaginamos en las reconstrucciones antiguas (erguidos como canguros). Los análisis biomecánicos de las inserciones musculares y la posición del centro de gravedad demuestran que caminaban con el tronco horizontal y la cola extendida como contrapeso, similar a una viga en equilibrio. Matthew Lamanna y su equipo del Museo Carnegie demostraron en 2014 que esta postura les permitía alcanzar velocidades superiores a las de la postura erguida, manteniendo un gasto energético menor durante la locomoción.' },
    ],
    fact: 'En 2020, un equipo de la Universidad de Queensland publicó en la revista Current Biology un estudio sobre las huellas de terópodos encontradas en Winton, Australia. Las pisadas, datadas en 95 millones de años, mostraron que un terópodo de tamaño medio corría a una velocidad estimada de 35 km/h, calculada mediante la relación entre la longitud de la zancada (2.2 metros) y la altura de la cadera (estimada en 1 metro), aplicando la fórmula de Alexander (1976) para locomoción bípeda.',
  },
  {
    id: 'tyrannosaurus-rex',
    title: 'Tyrannosaurus rex: El Rey',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/dinos_m3.png',
    image: '/assets/dinosaurios/dinos_m3.png',
    content: [
      'El Tyrannosaurus rex vivió entre 68 y 66 millones de años atrás, durante los últimos dos millones de años del período Cretácico Superior, en lo que hoy es el oeste de Norteamérica, desde Alberta (Canadá) hasta Nuevo México (Estados Unidos). Henry Fairfield Osborn, presidente del Museo Americano de Historia Natural, describió y nombró la especie en 1905 a partir de fósiles recolectados por Barnum Brown en la formación Hell Creek de Montana. El nombre significa "rey de los lagartos tiranos", del griego "tyrannos" (tirano), "saurus" (lagarto) y el latín "rex" (rey).',
      'Las dimensiones del T. rex lo colocan entre los mayores depredadores terrestres de la historia. Los ejemplares adultos alcanzaban entre 12 y 12.3 metros de longitud, una altura de 3.7 a 4 metros a la cadera, y un peso estimado entre 8,000 y 9,500 kilogramos según los análisis volumétricos más recientes de John Hutchinson (Royal Veterinary College, 2011). El cráneo medía entre 1.2 y 1.5 metros de largo, con huesos fusionados que formaban una estructura rígida capaz de soportar fuerzas de torsión durante la alimentación. La fuerza de mordida ha sido calculada en hasta 57,000 newtons por Bates y Falkingham (2012), equivalente a 5,800 kilogramos-fuerza.',
      'Los brazos diminutos del T. rex, de apenas 1 metro de longitud en un animal de 12 metros, han generado décadas de debate científico. Con solo dos dedos funcionales (a diferencia de los tres dedos de otros terópodos), cada brazo podía levantar aproximadamente 200 kilogramos según los cálculos de Lipkin y Carpenter (2008). Las hipótesis sobre su función incluyen: sujetar a la pareja durante el apareamiento, ayudar al animal a levantarse del suelo, o sujetar presas a corta distancia. Análisis de 2022 por Kevin Padian (Universidad de California, Berkeley) sugirieron que los brazos se redujeron para evitar mordeduras accidentales durante la alimentación grupal.',
      'El espécimen más completo de T. rex, conocido como "Sue" (FMNH PR2081), fue descubierto el 12 de agosto de 1990 por la paleontóloga amateur Sue Hendrickson en la formación Hell Creek, cerca de Faith, Dakota del Sur. Sue mide 12.3 metros de largo y conserva el 90% de sus huesos originales, el porcentaje más alto de cualquier T. rex encontrado. En 1997, el Field Museum de Chicago adquirió el esqueleto en una subasta de Sotheby\'s por 8.36 millones de dólares, el precio más alto pagado por un fósil en ese momento.',
      'Los estudios de paleopatología de Sue revelaron una vida marcada por la violencia. El esqueleto muestra fracturas curadas en las costillas, lesiones por mordeduras de otros T. rex en la mandíbula, artritis en la columna vertebral y una infección parasitaria en la garganta posiblemente causada por el protozoario Trichomonas. Las líneas de crecimiento en sus huesos indican que Sue tenía 28 años al morir, y que los T. rex experimentaban un período de crecimiento acelerado entre los 14 y los 18 años, ganando hasta 2.1 kilogramos por día durante su fase de desarrollo máximo, según el análisis de Greg Erickson (Universidad del Estado de Florida, 2004).'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2005, la paleontóloga Mary Schweitzer (Universidad del Estado de Carolina del Norte) anunció el descubrimiento de tejido blando preservado dentro de un fémur de T. rex de 68 millones de años (espécimen MOR 1125). El tejido incluía vasos sanguíneos flexibles, células similares a osteocitos y posibles fragmentos de colágeno. Este hallazgo desafió la suposición de que las moléculas orgánicas no podían sobrevivir más de un millón de años. El descubrimiento fue publicado en la revista Science y generó un debate que continúa sobre los mecanismos de preservación molecular a escalas de tiempo geológicas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La visión del T. rex era binocular, con un campo de visión estereoscópica de aproximadamente 55 grados, similar al de un halcón moderno. Kent Stevens (Universidad de Oregón) demostró en 2006 que esta disposición frontal de los ojos le permitía percibir profundidad con gran precisión hasta distancias de 6 kilómetros. Además, los lóbulos olfativos del cerebro eran proporcionalmente los más grandes de cualquier terópodo conocido, lo que sugiere que su sentido del olfato era comparable al de un buitre actual, capaz de detectar carroña a kilómetros de distancia.' },
    ],
    fact: 'En 2021, un estudio publicado en la revista Science por Charles Marshall y sus colegas de la Universidad de California, Berkeley, estimó que a lo largo de los 2.4 millones de años que existió la especie, vivieron aproximadamente 2,500 millones de T. rex individuales en total. El cálculo utilizó datos sobre la densidad de población (estimada en un individuo por cada 100 km²), la generación promedio (19 años), y el área de distribución geográfica (2.3 millones de km²). De esos miles de millones de individuos, se han encontrado menos de 100 especímenes fósiles, lo que representa una tasa de preservación menor al 0.000000004%.',
  },
  {
    id: 'velociraptor-cazador',
    title: 'Velociraptor: El Cazador Emplumado',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/dinos_m3.png',
    image: '/assets/dinosaurios/dinos_m3.png',
    content: [
      'El Velociraptor mongoliensis fue descrito en 1924 por Henry Fairfield Osborn a partir de un cráneo y una garra encontrados en la formación Djadokhta del desierto de Gobi, Mongolia, por una expedición del Museo Americano de Historia Natural liderada por Roy Chapman Andrews. El nombre significa "ladrón veloz", del latín "velox" (veloz) y "raptor" (ladrón). Contrariamente a la imagen difundida por el cine, el Velociraptor real medía aproximadamente 2 metros de largo (incluyendo su cola rígida), 50 centímetros de alto a la cadera y pesaba entre 15 y 20 kilogramos, aproximadamente el tamaño de un pavo grande.',
      'En 2007, los paleontólogos Alan Turner, Peter Makovicky y Mark Norell publicaron en la revista Science el descubrimiento de protuberancias para plumas (quill knobs) en el cúbito (hueso del antebrazo) de un espécimen de Velociraptor. Estas protuberancias son idénticas a las que anclan las plumas remeras en las aves modernas, como los halcones y los buitres. El hallazgo confirmó que el Velociraptor estaba cubierto de plumas, aunque su tamaño y la proporción de sus brazos indican que no podía volar. Las plumas servían probablemente para termorregulación, exhibición durante el cortejo o para cubrir los nidos e incubar huevos.',
      'La garra retráctil del segundo dedo del pie, con forma de hoz, medía aproximadamente 6.5 centímetros a lo largo de la curva externa. El Velociraptor la mantenía elevada del suelo mientras caminaba, como una navaja plegable biológica, preservándola afilada. Durante décadas se pensó que esta garra servía para desgarrar el abdomen de las presas con una patada descendente, pero los estudios biomecánicos de Phil Manning (Universidad de Manchester, 2006) utilizando garras artificiales y simuladores demostraron que la garra penetraba pero no desgarraba tejidos de manera eficiente. La hipótesis actual propone que se usaba para aferrarse a presas más grandes y mantener la posición mientras mordía.',
      'El fósil más célebre del Velociraptor es el "Dinosaurios Luchadores", descubierto el 4 de julio de 1971 en Tugriken Shireh, Mongolia, por una expedición polaco-mongola. El fósil muestra un Velociraptor mongoliensis y un Protoceratops andrewsi trabados en combate mortal: la garra retráctil del Velociraptor está clavada en la región del cuello del Protoceratops, mientras que el herbívoro muerde el antebrazo derecho del depredador. Se cree que una tormenta de arena o el colapso de una duna los sepultó de forma instantánea. Este espécimen se conserva en el Museo de Ciencias Naturales de Mongolia en Ulán Bator y es considerado un tesoro nacional.',
      'La familia Dromaeosauridae, a la que pertenece el Velociraptor, incluía depredadores de tamaños muy diversos. El Microraptor gui de China (125 millones de años) medía solo 77 centímetros y tenía cuatro alas con plumas asimétricas funcionales, permitiéndole planear entre los árboles. En el otro extremo, el Utahraptor ostrommaysi de Utah (126 millones de años) alcanzaba entre 5 y 7 metros de longitud y pesaba hasta 500 kilogramos, con garras retráctiles de 24 centímetros. El Deinonychus antirrhopus (descubierto por John Ostrom en 1964 en Montana) medía 3.4 metros y fue el dinosaurio que realmente inspiró los "velociraptores" de las películas de Steven Spielberg.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La cuestión de si los dromeosáuridos cazaban en manada es uno de los debates más activos de la paleontología. Se han encontrado yacimientos con múltiples ejemplares de Deinonychus junto a restos de un Tenontosaurus (un herbívoro de 6 metros), lo que sugirió caza cooperativa. Sin embargo, Roach y Brinkman (2007) argumentaron en el Bulletin of the Peabody Museum que los dromeosáuridos pudieron haberse congregado de forma oportunista, como los dragones de Komodo actuales, sin cooperación verdadera. Todavía no hay consenso científico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de 2020 publicado en PNAS por Jasinski, Sullivan y Dodson describió el Dineobellator notohesperus, un dromeosáurido del Cretácico terminal de Nuevo México. El análisis de su cola reveló una serie de chevrons (huesos en forma de V debajo de las vértebras) modificados que aumentaban la flexibilidad lateral de la cola. Los investigadores concluyeron que Dineobellator usaba la cola como timón activo para girar rápidamente durante la persecución de presas, similar a cómo un guepardo usa su cola para estabilizarse en giros a alta velocidad.' },
    ],
    fact: 'El cerebro del Velociraptor, estimado a partir de endocastos (moldes del interior del cráneo), tenía un cociente de encefalización (EQ) de aproximadamente 5.8, uno de los más altos entre los dinosaurios no avianos. Para comparar, los cocodrilos modernos tienen un EQ de 1.0, y los cuervos (entre las aves más inteligentes) tienen un EQ de aproximadamente 10. Un EQ alto no equivale directamente a inteligencia como la humana, pero sí indica mayor capacidad para procesar información sensorial, coordinar movimientos y posiblemente resolver problemas simples de caza.',
  },
  {
    id: 'spinosaurus-acuatico',
    title: 'Spinosaurus: El Gigante Acuático',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/dinos_m3.png',
    image: '/assets/dinosaurios/dinos_m3.png',
    content: [
      'El Spinosaurus aegyptiacus fue descrito originalmente en 1915 por el paleontólogo alemán Ernst Stromer a partir de fósiles encontrados en la formación Bahariya del Sáhara occidental de Egipto. El nombre significa "lagarto espinoso", refiriéndose a las espinas neurales extraordinariamente elongadas de sus vértebras, que podían alcanzar 1.65 metros de altura y formaban una vela o cresta dorsal. Desgraciadamente, los fósiles originales de Stromer fueron destruidos durante un bombardeo aliado sobre el museo de Múnich la noche del 24 de abril de 1944, en plena Segunda Guerra Mundial, dejando solo dibujos y descripciones como referencia.',
      'Durante casi un siglo, el Spinosaurus fue conocido principalmente por los registros de Stromer y fragmentos dispersos. En 2014, el paleontólogo marroquí-alemán Nizar Ibrahim y un equipo internacional publicaron en la revista Science un estudio basado en un nuevo esqueleto parcial encontrado en la formación Kem Kem del sureste de Marruecos, datado en aproximadamente 95 millones de años. El análisis reveló adaptaciones acuáticas: huesos densos y poco neumáticos (similares a los de los pingüinos y las morsas actuales, que usan huesos pesados como lastre), patas traseras reducidas, y pies anchos posiblemente palmeados.',
      'Las estimaciones de tamaño del Spinosaurus lo posicionan como el terópodo más largo conocido, con una longitud estimada de 14 a 15 metros, superando al Tyrannosaurus rex en longitud por 2 a 3 metros. Sin embargo, su masa corporal estimada de 6,000 a 7,000 kilogramos es menor que la del T. rex debido a su constitución más esbelta. La función de la vela dorsal ha sido objeto de múltiples hipótesis: termorregulación (actuando como radiador para disipar calor), exhibición sexual, almacenamiento de grasa (similar a la joroba de un camello), o señalización intraespecífica para identificación a distancia entre individuos de la misma especie.',
      'En 2020, Ibrahim y su equipo publicaron en la revista Nature un segundo estudio que describía la cola del Spinosaurus. Contra todas las expectativas para un terópodo, la cola era alta, flexible lateralmente y con espinas neurales elongadas que formaban una estructura similar a la aleta de una anguila o un tritón. Los análisis de mecánica de fluidos demostraron que esta cola generaba ocho veces más empuje lateral en el agua que las colas de otros terópodos, confirmando que el Spinosaurus era un nadador activo y no simplemente un dinosaurio que vadeaba en aguas someras como un garza.',
      'El hocico del Spinosaurus era largo, estrecho y repleto de dientes cónicos sin serrar, similar a la mandíbula de un cocodrilo gavial moderno. En la punta del hocico presentaba una roseta de dientes entrelazados ideal para atrapar peces resbaladizos. Análisis de isótopos de oxígeno en el esmalte dental, realizados por Romain Amiot y su equipo (Universidad de Lyon, 2010), confirmaron que el Spinosaurus pasaba una parte significativa de su vida en ambientes acuáticos, ya que la composición isotópica de sus dientes era más similar a la de tortugas y cocodrilos que a la de otros dinosaurios terrestres encontrados en la misma formación geológica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Nizar Ibrahim rastreó los fósiles de su Spinosaurus durante años a través de una historia digna de una película de aventuras. En 2008, un vendedor de fósiles en Erfoud, Marruecos, le mostró huesos peculiares de color rojizo. Ibrahim los reconoció como posible Spinosaurus pero perdió contacto con el vendedor. Cinco años después, mientras estudiaba piezas en un museo de Milán, reconoció huesos del mismo individuo. Regresó a Marruecos y, tras una búsqueda de tres días en la ciudad, encontró al vendedor original en un café. Este lo condujo al sitio de excavación en el desierto del Sáhara.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La densidad ósea del Spinosaurus, medida mediante tomografía computarizada de secciones transversales de huesos largos, reveló huesos compactos con poca neumatización (espacios llenos de aire). Los terópodos terrestres tienen huesos altamente neumáticos para reducir peso, pero el Spinosaurus tenía huesos densos similares a los de animales acuáticos modernos como hipopótamos y manatíes. Esta condición, llamada osteosclerosis, proporciona lastre negativo que facilita la inmersión, confirmando su modo de vida semiacuático en los sistemas fluviales del Cretácico del norte de África.' },
    ],
    fact: 'La formación Kem Kem de Marruecos, donde se encontró el nuevo esqueleto de Spinosaurus, es uno de los ecosistemas fósiles más insólitos jamás documentados. Datada en 100 a 94 millones de años, contenía al menos cuatro depredadores gigantes simultáneos: Spinosaurus (15 m), Carcharodontosaurus (12 m), Deltadromeus (8 m) y Sauroniops (al menos 10 m estimados). Esta abundancia de superdepredadores, sin equivalente moderno, probablemente se explica porque ocupaban nichos ecológicos diferentes: el Spinosaurus se alimentaba de peces y animales acuáticos, mientras que los demás cazaban presas terrestres.',
  },
  {
    id: 'giganotosaurus-rival',
    title: 'Giganotosaurus: El Rival del Sur',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/dinos_m3.png',
    image: '/assets/dinosaurios/dinos_m3.png',
    content: [
      'El Giganotosaurus carolinii fue descubierto en 1993 por el mecánico y cazador de fósiles aficionado Rubén Dario Carolini en la formación Candeleros de Villa El Chocón, provincia de Neuquén, en la Patagonia argentina. El hallazgo fue publicado en 1995 por los paleontólogos Rodolfo Coria y Leonardo Salgado en la revista Nature. El nombre significa "lagarto gigante del sur", del griego "gigas" (gigante), "notos" (sur) y "saurus" (lagarto). El espécimen holotipo (MUCPv-CH-1) conserva aproximadamente el 70% del esqueleto, incluyendo un cráneo casi completo de 1.53 metros, más largo que cualquier cráneo de T. rex conocido hasta entonces.',
      'Las dimensiones del Giganotosaurus lo sitúan entre los terópodos más grandes registrados: entre 12 y 13 metros de longitud y un peso estimado de 6,000 a 8,000 kilogramos. Pertenece a la familia Carcharodontosauridae ("lagartos con dientes de tiburón"), cuyos miembros se caracterizan por dientes lateralmente comprimidos con bordes finamente serrados, diseñados para cortar carne en lugar de triturar hueso como el T. rex. Esta diferencia en la dentición sugiere una estrategia de alimentación diferente: el Giganotosaurus probablemente infligía heridas cortantes profundas y esperaba a que la presa se desangrara, mientras que el T. rex aplicaba fuerza bruta para aplastar.',
      'El hábitat del Giganotosaurus, hace 97 millones de años durante el Cenomaniense del Cretácico Superior, estaba dominado por enormes saurópodos titanosaurios como el Argentinosaurus huinculensis, que alcanzaba entre 30 y 36 metros de longitud y pesaba entre 65 y 80 toneladas. La coexistencia de estos depredadores y presas gigantes en la Patagonia sugiere una dinámica ecológica donde los carcharodontosáuridos pudieron haber cazado juveniles de saurópodos o haberse especializado en abatir adultos mediante ataques coordinados de múltiples individuos, aunque la evidencia directa de caza grupal es limitada.',
      'Un pariente cercano del Giganotosaurus, el Mapusaurus roseae, fue descubierto en 2006 por Coria y Currie en la formación Huincul, también en Neuquén, Argentina. El yacimiento contenía restos de al menos siete individuos de diferentes edades depositados juntos en un mismo sitio, lo que representa la mayor acumulación de terópodos gigantes jamás encontrada. Aunque Coria y Currie interpretaron esta asociación como evidencia de comportamiento gregario, otros investigadores han propuesto explicaciones alternativas, como una trampa natural (un pozo de barro) que atrapó a los animales de forma independiente a lo largo del tiempo.',
      'La competencia entre los superdepredadores del hemisferio sur (carcharodontosáuridos) y los del hemisferio norte (tiranosáuridos) nunca ocurrió de forma directa porque estuvieron separados por mares epicontinentales durante la mayor parte del Cretácico. Los carcharodontosáuridos dominaron como depredadores ápice en los continentes del sur (Gondwana) desde hace 110 hasta hace 90 millones de años aproximadamente, cuando se extinguieron por causas aún debatidas. Los tiranosáuridos, que habían sido depredadores de tamaño medio durante el mismo período, alcanzaron su máximo desarrollo solo en los últimos 15 millones de años del Cretácico, llenando el nicho que dejaron vacante los carcharodontosáuridos en Norteamérica y Asia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Rubén Dario Carolini no era paleontólogo profesional; trabajaba como mecánico automotriz en Villa El Chocón, un pueblo de apenas 1,500 habitantes junto al lago artificial Ezequiel Ramos Mexía en la Patagonia. Un día de 1993, mientras exploraba el desierto en su tiempo libre, notó un hueso sobresaliendo de una ladera erosionada. Lo reportó al Museo Carmen Funes de Plaza Huincul, donde Rodolfo Coria organizó la excavación. La especie fue nombrada "carolinii" en su honor, convirtiendo al mecánico en uno de los cazadores de fósiles más afortunados de la historia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El cerebro del Giganotosaurus era proporcionalmente pequeño para su tamaño corporal, con un cociente de encefalización (EQ) de aproximadamente 1.8, muy inferior al del T. rex (EQ de 2.4 a 3.0). Esto sugiere que el Giganotosaurus dependía menos de la inteligencia y más de la fuerza bruta para cazar. Su cerebro tenía lóbulos olfativos de tamaño moderado pero lóbulos ópticos bien desarrollados, indicando buena visión pero un sentido del olfato inferior al del T. rex. Estas diferencias reflejan estrategias depredadoras distintas entre dos linajes de terópodos gigantes que evolucionaron de forma independiente.' },
    ],
    fact: 'La Patagonia argentina ha producido más especies de dinosaurios gigantes (tanto depredadores como herbívoros) que cualquier otra región del planeta. Además del Giganotosaurus y Mapusaurus, se han descubierto allí el Argentinosaurus (posiblemente el animal terrestre más pesado), el Patagotitan mayorum (descrito en 2017 por Carballido et al. en la revista Proceedings of the Royal Society B, con un peso estimado de 69 toneladas), y el Meraxes gigas (un carcharodontosáurido de 11 metros descrito en 2022 con brazos proporcionalmente más cortos que los del T. rex, sugiriendo una evolución convergente de la reducción de las extremidades anteriores).',
  },
  {
    id: 'armas-estrategias',
    title: 'Armas y Estrategias',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/dinos_m3.png',
    image: '/assets/dinosaurios/dinos_m3.png',
    content: [
      'Los dientes de los terópodos depredadores presentaban serraciones microscópicas en sus bordes cortantes, conocidas como dentículos, que funcionaban como los dientes de un cuchillo de sierra. En 2015, Kirstin Brink y Robert Reisz (Universidad de Toronto Mississauga) publicaron en la revista Scientific Reports un estudio que analizó la estructura interna de estos dentículos mediante microscopía electrónica de barrido. Descubrieron que los dentículos estaban formados por tejido dentinario altamente especializado, con una geometría optimizada para cortar carne de manera eficiente. Esta estructura, llamada "esmaltoide", también se encuentra en los dientes de los tiburones blancos y los dragones de Komodo.',
      'La visión binocular, con ambos ojos orientados hacia adelante para generar percepción de profundidad, era una característica variable entre los terópodos. El T. rex tenía un campo binocular de 55 grados (similar al de un halcón), mientras que el Allosaurus tenía apenas 20 grados y el Carcharodontosaurus solo 15 grados. Kent Stevens (Universidad de Oregón) realizó estos cálculos en 2006 usando modelos digitales 3D de cráneos escaneados con tomografía. Un campo binocular amplio permite estimar distancias con precisión, crucial para un depredador que embiste a su presa, mientras que un campo más estrecho sugiere estrategias de caza diferentes, como emboscadas o ataques laterales.',
      'Las estimaciones de velocidad de los terópodos se basan en tres fuentes de datos: la geometría de las huellas fósiles, la biomecánica de las extremidades y modelos computacionales de locomoción. John Hutchinson (Royal Veterinary College de Londres) demostró en 2002 mediante simulaciones musculoesqueléticas que un T. rex adulto de 6,000 kilogramos necesitaría dedicar más del 86% de su masa muscular total a las piernas para correr, lo que limita su velocidad máxima a unos 18-29 km/h. En contraste, los terópodos de tamaño medio como el Allosaurus (1,500 kg) pudieron alcanzar 30-55 km/h, y los dromeosáuridos pequeños posiblemente superaban los 60 km/h.',
      'Las garras de los terópodos servían funciones diversas según su morfología. Los dromeosáuridos poseían la garra retráctil del segundo dedo del pie, curvada en forma de hoz. Los terizinosaurios tenían garras rectas de hasta 70 centímetros en las manos, probablemente para arrancar vegetación. Los megaraptores como el Australovenator de Australia tenían garras manuales curvadas de 25 centímetros que usaban como arma principal de ataque. Un estudio de Fowler et al. (2011) publicado en PLoS ONE propuso que los dromeosáuridos usaban un método de depredación llamado "RPR" (Raptor Prey Restraint), similar al de las aves rapaces modernas: inmovilizaban a la presa con las garras de los pies y la consumían viva.',
      'La cola de los terópodos no era simplemente un apéndice pasivo. Persons y Currie (2011) demostraron en su estudio publicado en PLoS ONE que el Carnotaurus sastrei, un abelisáurido de Argentina con cuernos sobre los ojos, poseía una musculatura caudal hipertrofiada. Los músculos caudofemorales, que conectan la cola con el fémur, eran proporcionalmente más grandes que en cualquier otro terópodo estudiado, actuando como un "motor" trasero que proporcionaba la fuerza principal para la locomoción. Los cálculos indican que esto permitía al Carnotaurus sprints de alta velocidad estimados en 48-56 km/h, convirtiéndolo en uno de los terópodos grandes más rápidos, aunque con poca capacidad de giro.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los dientes de los terópodos se reemplazaban continuamente a lo largo de su vida, de forma similar a los tiburones. Mediante el análisis de las marcas de crecimiento en los dientes de T. rex, los investigadores han estimado que cada diente tardaba entre 2 y 2.5 años en crecer completamente, y que el animal producía un nuevo diente de reemplazo aproximadamente cada 778 días para cada posición dental. Esto significa que un T. rex adulto podía reemplazar su dentadura completa varias veces durante su vida, asegurando que siempre tuviera dientes funcionales y afilados para cazar y alimentarse.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 2017, un equipo liderado por Stephan Lautenschlager (Universidad de Birmingham) publicó en la revista Proceedings of the Royal Society B un análisis de elementos finitos (FEA) de los cráneos de 41 especies de terópodos. El FEA es una técnica de ingeniería que simula cómo las fuerzas se distribuyen a través de una estructura. Los resultados mostraron que el cráneo del T. rex estaba optimizado para resistir torsión (fuerzas de giro), mientras que los cráneos de los alosáuridos estaban diseñados para golpes descendentes rápidos, similares al movimiento de un hacha. Cada diseño craneal refleja una estrategia de alimentación distinta.' },
    ],
    fact: 'Los coprolitos (heces fosilizadas) de terópodos proporcionan evidencia directa de dieta y comportamiento alimentario. El coprolito más grande atribuido a un T. rex, descrito por Karen Chin (Universidad de Colorado) en 1998 y publicado en Nature, mide 44 centímetros de largo y contiene entre un 30% y un 50% de fragmentos de hueso triturado pertenecientes a un herbívoro juvenil, posiblemente un hadrosaurio. El grado de fragmentación ósea confirma que el T. rex no solo comía carne sino que masticaba y digería huesos sólidos, una capacidad llamada osteohagia que es rara entre los depredadores modernos y solo se observa en hienas y algunos buitres.',
  },
  {
    id: 'depredadores-modernos',
    title: 'Depredadores Modernos',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/dinos_m3.png',
    image: '/assets/dinosaurios/dinos_m3.png',
    content: [
      'Las aves son dinosaurios terópodos. Esta afirmación no es una metáfora ni una simplificación; es una clasificación taxonómica aceptada universalmente por la comunidad paleontológica desde la década de 1990. El vínculo fue propuesto por primera vez por Thomas Henry Huxley en 1868, pero no fue ampliamente aceptado hasta que John Ostrom revivió la hipótesis en 1969 tras su estudio del Deinonychus. Desde entonces, más de 50 especies de dinosaurios emplumados han sido descubiertas en formaciones geológicas de China, confirmando una transición gradual entre los terópodos no avianos y las aves. El Archaeopteryx lithographica, descubierto en 1861 en Baviera, Alemania, sigue siendo el punto de referencia: poseía dientes, garras en las alas y una cola ósea larga como un dinosaurio, pero también plumas asimétricas aptas para el vuelo.',
      'La evolución convergente ha producido similitudes notables entre los terópodos extintos y los depredadores mamíferos modernos. El T. rex ocupaba un nicho ecológico comparable al del león africano actual: depredador ápice de gran tamaño que caza presas grandes y también consume carroña cuando está disponible. Los dromeosáuridos pequeños como el Velociraptor eran funcionalmente análogos a los lobos o los perros salvajes africanos: depredadores ágiles de tamaño medio con alta inteligencia relativa. Los ornitomímidos ("imitadores de aves"), con sus cuerpos esbeltos y patas largas, convergieron con los avestruces actuales tanto en forma corporal como en velocidad estimada de hasta 70 km/h.',
      'El estudio del comportamiento depredador de los dinosaurios se basa en múltiples líneas de evidencia fósil. Las marcas de dientes en huesos de presas revelan qué depredador atacó y con qué fuerza. Las marcas de cicatrización en huesos de herbívoros demuestran que la presa sobrevivió, confirmando depredación activa (no carroñería). Los icnofósiles (huellas y rastros) pueden mostrar persecuciones preservadas. En 2015, Xing et al. publicaron en la revista Chinese Science Bulletin un rastro del Cretácico de China donde las huellas de un terópodo y un ornitópodo convergen progresivamente, sugiriendo una persecución activa que terminó en un punto donde ambos rastros desaparecen.',
      'Las aves rapaces modernas, como los halcones peregrinos y las águilas, son descendientes directos de los terópodos y conservan muchas de las adaptaciones depredadoras de sus ancestros mesozoicos. La garra del primer dedo (hallux) de un águila real funciona de forma idéntica a la garra retráctil del Deinonychus: se clava en la presa y la inmoviliza. El sistema visual de los halcones, con una resolución ocular ocho veces superior a la humana y dos fóveas (puntos de enfoque) por ojo, es una versión refinada de la visión binocular que ya poseían los terópodos del Cretácico.',
      'Los fósiles siguen revelando comportamientos depredadores que desafían nuestras suposiciones. En 2012, se describió en la revista Nature un ejemplar de Sinocalliopteryx gigas (un terópodo de 2 metros) del Cretácico Inferior de China que contenía en su cavidad abdominal restos de un Confuciusornis (un ave primitiva) parcialmente digerido. Esto demuestra que algunos terópodos terrestres cazaban presas voladoras. Un estudio de 2023 por Hone et al. documentó un Microraptor con un mamífero preservado en el estómago, demostrando que los dinosaurios emplumados ocupaban roles ecológicos complejos que incluían la caza de vertebrados de múltiples clases taxonómicas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El halcón peregrino (Falco peregrinus), el animal más rápido del planeta con velocidades de picada registradas de 389 km/h (medido por Ken Franklin en 1999 con un velocímetro digital acoplado a un halcón llamado "Frightful"), es un dinosaurio terópodo según la clasificación cladística moderna. Cada vez que ves un gorrión en tu ventana, una paloma en la plaza o un pingüino en un documental, estás observando un dinosaurio. Las plumas, el espolón en los pies de los gallos, el sistema respiratorio de flujo unidireccional y la postura bípeda son herencias directas de sus ancestros terópodos del Mesozoico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los melanosomas (orgánulos celulares que contienen pigmentos) preservados en plumas fósiles permiten reconstruir el color de los dinosaurios emplumados. En 2010, Li et al. publicaron en Science la primera reconstrucción de color completa de un dinosaurio: el Anchiornis huxleyi tenía un cuerpo gris oscuro, alas blancas con bandas negras y una cresta rojiza en la cabeza. En 2017, el mismo equipo determinó que el Sinosauropteryx prima (un compsognátido de 1 metro) tenía un patrón de contrasombreado (oscuro arriba, claro abajo) y una cola con bandas alternadas claras y oscuras, similar a un mapache.' },
    ],
    fact: 'El cocodrilo de agua salada (Crocodylus porosus) es el arcosaurio no aviano más grande vivo, alcanzando 6 metros y 1,000 kilogramos. Aunque no es un dinosaurio sino un pariente lejano (los cocodrilos y los dinosaurios comparten un ancestro común del Triásico), ofrece una ventana a la biología de los grandes depredadores mesozoicos. Su fuerza de mordida, medida en 16,414 newtons por Gregory Erickson (Universidad del Estado de Florida, 2012) en un estudio publicado en PLoS ONE, es la más alta de cualquier animal vivo, aunque sigue siendo tres veces menor que la del T. rex. Los cocodrilos han cambiado muy poco en 80 millones de años.',
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

// ——— Predator Header ——————————————————————————————————————————————
function PredatorHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Predator arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#predGrad)" strokeWidth="2.5" strokeLinecap="round" />
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
        {/* Central claw icon */}
        <path d="M295 18 Q290 30 295 40 Q300 30 295 18" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <path d="M300 15 Q295 30 300 42 Q305 30 300 15" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <path d="M305 18 Q310 30 305 40 Q300 30 305 18" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <defs>
          <linearGradient id="predGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(93,138,104,0.9)" />
            <stop offset="100%" stopColor="rgba(93,138,104,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5D8A68" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LOS DEPREDADORES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(93,138,104,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">TIRANOSAURIO Y COMPAÑÍA</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching M9 Dendera style) ————————————————————
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
          layoutId="activeDotDinosM3"
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
export default function InteractiveInfographic_DinosM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/dinosaurios/dinos_m3_bg.png)',
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

      <PredatorHeader />

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
              🦖 ¡Has dominado los secretos de los Depredadores!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Maestro de Terópodos
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
