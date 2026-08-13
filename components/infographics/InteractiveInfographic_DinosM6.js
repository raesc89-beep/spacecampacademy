'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Dinosaur Behavior themed) ————————————————————
function DecoFootprint({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Three-toed footprint */}
      <ellipse cx="30" cy="38" rx="8" ry="10" fill={color} opacity="0.3" />
      <ellipse cx="22" cy="20" rx="4" ry="7" fill={color} opacity="0.25" transform="rotate(-15 22 20)" />
      <ellipse cx="30" cy="16" rx="4" ry="8" fill={color} opacity="0.25" />
      <ellipse cx="38" cy="20" rx="4" ry="7" fill={color} opacity="0.25" transform="rotate(15 38 20)" />
      {/* Claw marks */}
      <circle cx="22" cy="13" r="2" fill={color} opacity="0.3" />
      <circle cx="30" cy="9" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="13" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoNest({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Nest bowl */}
      <path d="M10 35 Q15 48 30 50 Q45 48 50 35" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <path d="M8 33 Q14 46 30 48 Q46 46 52 33" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Eggs */}
      <ellipse cx="22" cy="38" rx="5" ry="6" fill={color} opacity="0.25" />
      <ellipse cx="32" cy="36" rx="5" ry="6" fill={color} opacity="0.2" />
      <ellipse cx="38" cy="40" rx="4" ry="5" fill={color} opacity="0.25" />
      {/* Straw lines */}
      <line x1="5" y1="34" x2="18" y2="42" stroke={color} strokeWidth="1" opacity="0.2" />
      <line x1="55" y1="33" x2="42" y2="41" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function DecoCrest({ size = 70, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Parasaurolophus-like head crest */}
      <path d="M15 45 Q18 35 22 30 Q26 25 30 22 Q35 18 42 12" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M22 30 Q28 28 32 32 Q36 36 35 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="15" cy="45" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="15" cy="45" r="2" fill={color} opacity="0.3" />
      {/* Sound waves */}
      <path d="M42 12 Q48 10 50 14" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
      <path d="M44 8 Q52 6 55 12" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <path d="M46 5 Q55 2 58 10" fill="none" stroke={color} strokeWidth="1" opacity="0.15" />
    </svg>
  );
}

function DecoBonebed({ size = 70, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Scattered bones */}
      <line x1="8" y1="25" x2="25" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      <circle cx="8" cy="25" r="3" fill={color} opacity="0.25" />
      <circle cx="25" cy="20" r="3" fill={color} opacity="0.25" />
      <line x1="32" y1="35" x2="50" y2="28" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      <circle cx="32" cy="35" r="2.5" fill={color} opacity="0.2" />
      <circle cx="50" cy="28" r="2.5" fill={color} opacity="0.2" />
      <line x1="15" y1="45" x2="35" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.25" />
      <circle cx="15" cy="45" r="2" fill={color} opacity="0.2" />
      <circle cx="35" cy="48" r="2" fill={color} opacity="0.2" />
      {/* Rib fragment */}
      <path d="M42 42 Q48 38 52 44" fill="none" stroke={color} strokeWidth="1.5" opacity="0.25" />
    </svg>
  );
}

function DecoEye({ size = 70, color = '#7D6B99', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Sclerotic ring / eye */}
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.2" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
      {/* Sclerotic ring plates */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x = 30 + 15 * Math.cos(rad);
        const y = 30 + 15 * Math.sin(rad);
        return <rect key={i} x={x - 2} y={y - 1.5} width="4" height="3" rx="1" fill={color} opacity="0.2" transform={`rotate(${a} ${x} ${y})`} />;
      })}
    </svg>
  );
}

function DecoMigration({ size = 80, color = '#3E7C8B', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Migration path */}
      <path d="M5 30 Q20 15 40 20 Q60 25 75 10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 3" opacity="0.4" />
      {/* Herd silhouettes (simplified) */}
      <circle cx="15" cy="26" r="3" fill={color} opacity="0.3" />
      <circle cx="25" cy="20" r="3.5" fill={color} opacity="0.25" />
      <circle cx="35" cy="21" r="3" fill={color} opacity="0.3" />
      <circle cx="50" cy="22" r="3.5" fill={color} opacity="0.25" />
      <circle cx="62" cy="16" r="3" fill={color} opacity="0.3" />
      {/* Arrow */}
      <path d="M72 7 L78 10 L72 13" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'huellas-historias': [DecoFootprint, DecoMigration, DecoBonebed],
  'vida-en-manada': [DecoBonebed, DecoFootprint, DecoNest],
  'nidos-cuidado-parental': [DecoNest, DecoCrest, DecoFootprint],
  'comunicacion-dinosaurios': [DecoCrest, DecoEye, DecoNest],
  'migracion-territorio': [DecoMigration, DecoFootprint, DecoBonebed],
  'dinosaurios-nocturnos': [DecoEye, DecoCrest, DecoMigration],
  'etologia-comparada': [DecoBonebed, DecoNest, DecoEye],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Horner, J.R. & Gorman, J. (1988). Digging Dinosaurs: The Search that Unraveled the Mystery of Baby Dinosaurs, Workman Publishing',
  'Varricchio, D.J., Moore, J.R., Erickson, G.M., Norell, M.A., Jackson, F.D. & Borkowski, J.J. (2008). Avian Paternal Care Had Dinosaur Origin, Science, 322(5909), 1826–1828',
  'Schmitz, L. & Motani, R. (2011). Nocturnality in Dinosaurs Inferred from Scleral Ring and Orbit Morphology, Science, 332(6030), 705–708',
  'Lockley, M.G. (1991). Tracking Dinosaurs: A New Look at an Ancient World, Cambridge University Press',
  'Horner, J.R., de Ricqlès, A.J. & Padian, K. (2000). Long Bone Histology of the Hadrosaurid Dinosaur Maiasaura peeblesorum, Journal of Vertebrate Paleontology, 20(1), 115–129',
  'Brown, C.M. (2017). An Exceptionally Preserved Armored Dinosaur Reveals the Appearance of a Cretaceous Nodosaurid, Current Biology, 27(16), 2514–2521',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'huellas-historias',
    title: 'Huellas que Cuentan Historias',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/dinos_m6.png',
    image: '/assets/dinosaurios/dinos_m6.png',
    content: [
      'La icnología es la rama de la paleontología dedicada al estudio de las huellas fósiles, y constituye una de las herramientas más valiosas para reconstruir el comportamiento de los dinosaurios. A diferencia de los huesos, que nos muestran la anatomía de un animal muerto, las huellas registran un momento concreto en la vida de un organismo: su velocidad, su dirección, si caminaba solo o acompañado, e incluso si cojeaba o se detuvo a beber agua. Cada pisada conservada en roca sedimentaria es una instantánea de un comportamiento que ocurrió hace millones de años.',
      'El sitio de Cal Orcko, ubicado en una cantera de cemento cerca de la ciudad de Sucre en Bolivia, contiene la mayor concentración de huellas de dinosaurio conocida en el mundo. La pared caliza, con una inclinación de aproximadamente 73 grados, expone una superficie de más de 25,000 metros cuadrados donde se han identificado más de 5,000 huellas individuales pertenecientes a al menos 462 rastros distintos. Estas huellas datan del período Cretácico tardío, hace unos 68 millones de años, y fueron dejadas por al menos 8 especies diferentes de dinosaurios, incluyendo terópodos, saurópodos y ornitópodos.',
      'El paleontólogo Martin Lockley, de la Universidad de Colorado en Denver, ha documentado rastros paralelos de dinosaurios que caminaban en la misma dirección y a velocidades similares, lo cual constituye una de las pruebas más sólidas de comportamiento gregario. En el sitio de Davenport Ranch, en Texas, Lockley identificó 23 rastros de saurópodos que se movían juntos en la misma dirección. Los animales más grandes se posicionaban en el exterior del grupo y los más jóvenes en el interior, un patrón de protección observado en manadas de elefantes y bisontes modernos.',
      'Las huellas también permiten calcular la velocidad de un dinosaurio mediante la fórmula desarrollada por el paleontólogo británico Robert McNeill Alexander en 1976. Esta ecuación relaciona la longitud de la zancada con la altura estimada de la cadera para determinar la velocidad de desplazamiento. Aplicando esta fórmula, se ha calculado que la mayoría de los dinosaurios caminaban entre 4 y 8 kilómetros por hora, similar a un humano. Algunos terópodos, sin embargo, dejaron rastros que indican velocidades de hasta 40 kilómetros por hora durante carreras cortas.',
      'En Corea del Sur, el sitio de Haenam Uhangri contiene más de 400 rastros de dinosaurios y pterosaurios conservados en estratos del Cretácico Superior. Los investigadores Han Sang-ho y Kim Jeong-yul documentaron en 2004 rastros de pequeños terópodos que cambiaban de dirección en respuesta a obstáculos, lo que demuestra toma de decisiones en tiempo real. También se hallaron huellas de dinosaurios que se sentaban, dejando marcas del isquion (hueso pélvico) y de las manos apoyadas, revelando posturas de descanso que no podrían inferirse solo a partir de esqueletos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2009, un equipo de paleontólogos descubrió en el sitio de Plagne, en el departamento de Ain en Francia, las huellas de dinosaurio más grandes jamás registradas. Cada huella de saurópodo mide 1.5 metros de diámetro y el rastro se extiende por más de 155 metros de longitud. Las pisadas fueron dejadas hace aproximadamente 150 millones de años por un saurópodo que pesaba al menos 35 toneladas y medía más de 25 metros de largo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La preservación de una huella fósil requiere condiciones muy específicas. El sedimento debe tener la humedad justa: demasiado seco y la pisada no se marca, demasiado húmedo y se deforma. Luego, la huella debe ser cubierta rápidamente por una nueva capa de sedimento diferente que la proteja de la erosión. Por cada huella que encontramos preservada, se estima que millones se perdieron, lo que hace de cada rastro un registro estadísticamente raro.' },
    ],
    fact: 'En el sitio de Lark Quarry, en Queensland, Australia, se conservan 3,300 huellas dejadas hace 95 millones de años. Durante décadas se interpretó como una estampida: un grupo de más de 150 pequeños dinosaurios huyendo de un gran terópodo depredador. En 2011, el paleontólogo Anthony Romilio reinterpretó las huellas del supuesto depredador como las de un ornitópodo herbívoro grande, lo que reformuló toda la narrativa del sitio y demostró que las huellas pueden ser reinterpretadas con nuevos métodos de análisis.',
  },
  {
    id: 'vida-en-manada',
    title: 'Vida en Manada',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/dinos_m6.png',
    image: '/assets/dinosaurios/dinos_m6.png',
    content: [
      'La evidencia de que muchos dinosaurios vivían en grupos proviene de múltiples fuentes: lechos de huesos (bone beds), rastros paralelos de huellas, y sitios de anidación comunal. Un lecho de huesos es una acumulación de restos fósiles de muchos individuos de la misma especie en un área geográfica reducida. Estos sitios se forman cuando un grupo de animales muere simultáneamente por un evento catastrófico como una inundación, una sequía severa o una erupción volcánica, y sus restos son depositados juntos por corrientes de agua o sedimentación.',
      'El paleontólogo Jack Horner, de la Universidad Estatal de Montana, transformó nuestra comprensión del comportamiento social de los dinosaurios con sus descubrimientos en la Formación Two Medicine de Montana a partir de 1978. Horner encontró un enorme lecho de huesos de Maiasaura peeblesorum que contenía restos de al menos 10,000 individuos distribuidos en una superficie de varios kilómetros cuadrados. El nombre Maiasaura significa "lagartija buena madre", y fue asignado porque los fósiles demostran que estos hadrosaurios anidaban en colonias organizadas, cuidaban a sus crías, y se desplazaban en manadas masivas.',
      'En la Formación Dinosaur Park de Alberta, Canadá, se han encontrado lechos de huesos de ceratopsianos (dinosaurios con cuernos como Centrosaurus y Styracosaurus) que contienen miles de individuos. El paleontólogo Philip Currie, del Museo Royal Tyrrell, documentó un lecho de huesos de Centrosaurus apertus con restos de al menos 300 individuos de todas las edades, desde crías hasta adultos maduros. La composición demográfica de este lecho de huesos se asemeja a la estructura de una manada de ñus o bisontes actuales que murió al intentar cruzar un río durante la migración.',
      'Los terópodos también mostraron comportamiento gregario, aunque de manera menos frecuente. En Argentina, se descubrió un sitio con siete individuos del terópodo Mapusaurus roseae, un carnívoro de 12 metros de largo emparentado con Giganotosaurus. Los paleontólogos Rodolfo Coria y Philip Currie publicaron en 2006 que estos animales probablemente cazaban en grupos coordinados para poder atacar presas tan grandes como los saurópodos titanosaurios, que podían superar las 70 toneladas. Esta estrategia recuerda a la caza en manada de los lobos modernos contra presas más grandes que ellos.',
      'En China, el paleontólogo Xu Xing documentó en 2008 un grupo de 25 individuos del pequeño terópodo Sinornithomimus dongi que murieron juntos atrapados en el lodo de un lago que se secaba. Todos los individuos eran juveniles de entre 1 y 7 años, sin presencia de adultos, lo que sugiere que los jóvenes formaban bandadas independientes mientras los adultos se dedicaban a la reproducción, un comportamiento observado en avestruces y emúes actuales. La ausencia de adultos en este grupo refuerza la hipótesis de segregación por edades dentro de poblaciones de dinosaurios.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El lecho de huesos de Hilda, en Alberta, Canadá, contiene restos de Centrosaurus en una extensión de 2.3 kilómetros cuadrados. Se estima que este único evento de mortalidad masiva involucró a varios miles de individuos. El paleontólogo David Eberth determinó en 2010 que la causa fue una tormenta tropical que provocó una inundación repentina mientras la manada cruzaba una llanura aluvial, un escenario comparable a las muertes masivas de ñus en el río Mara, en Kenia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para determinar si un lecho de huesos representa una manada real o una acumulación gradual, los paleontólogos analizan la tafonomía del sitio: la orientación de los huesos (si apuntan en la misma dirección, fueron transportados por agua), el grado de meteorización (si todos tienen el mismo nivel de desgaste, murieron al mismo tiempo) y la distribución de edades. Un lecho con individuos de todas las edades sugiere una manada mixta, mientras que uno con solo adultos podría indicar un grupo de machos solitarios.' },
    ],
    fact: 'En 2014, los paleontólogos Scott Persons y Philip Currie propusieron que los ceratopsianos como Triceratops usaban sus elaboradas estructuras craneales (cuernos y golas) no solo como defensa sino principalmente como señales de reconocimiento dentro de manadas grandes. Cada especie tenía un patrón único de cuernos y ornamentación craneal que habría permitido a los individuos identificar a miembros de su propia especie a distancia, de forma similar a cómo las rayas de cada cebra funcionan como un patrón individual de identificación dentro de las manadas africanas.',
  },
  {
    id: 'nidos-cuidado-parental',
    title: 'Nidos y Cuidado Parental',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/dinos_m6.png',
    image: '/assets/dinosaurios/dinos_m6.png',
    content: [
      'Los oviraptorosaruios, un grupo de terópodos emplumados del Cretácico, proporcionan la evidencia más directa de cuidado parental en dinosaurios no avianos. En 1993, el paleontólogo Mark Norell del Museo Americano de Historia Natural describió un fósil del desierto de Gobi en Mongolia que mostraba un Citipati osmolskae adulto sentado sobre un nido de huevos con los brazos extendidos alrededor de la nidada, en una postura idéntica a la de las gallinas y avestruces modernas cuando incuban. Este fósil, apodado "Big Mama", demostró que al menos algunos dinosaurios incubaban sus huevos con calor corporal.',
      'Los nidos de oviraptorosaruios están organizados en anillos concéntricos de huevos alargados, dispuestos en pares con el extremo puntiagudo orientado hacia el centro. Un nido típico contiene entre 12 y 24 huevos distribuidos en dos o tres anillos. El paleontólogo Kohei Tanaka, de la Universidad de Nagoya, demostró en 2018 que las especies más grandes, como Gigantoraptor (que pesaba hasta 2 toneladas), colocaban los huevos en un anillo amplio con un espacio vacío en el centro donde el adulto podía sentarse sin aplastar los huevos, una adaptación que resolvía el problema de la incubación por contacto en animales de gran masa corporal.',
      'En 2004, David Varricchio y colaboradores publicaron un estudio sobre Troodon formosus que reveló que el cuidado parental en ciertos dinosaurios terópodos era realizado por los machos, no por las hembras. Comparando el tamaño de las nidadas y la masa corporal de los adultos encontrados sobre los nidos con los patrones de las aves modernas, Varricchio determinó que los datos coincidían con el patrón de las aves donde el macho incuba (como avestruces, emúes y kiwis). En estas especies, la hembra pone los huevos y el macho los incuba durante semanas sin alimentarse.',
      'La evidencia de parasitismo de nido, donde una hembra deposita sus huevos en el nido de otra para que esta los críe, también se ha documentado en dinosaurios. En 2019, el paleontólogo Tzu-Ruei Yang publicó un análisis de un nido de oviraptorosaruio de la Formación Nanxiong en China que contenía huevos de dos tamaños distintos, lo que indica que al menos dos hembras diferentes depositaron huevos en el mismo nido. Este comportamiento es común en patos y cucús modernos, y su presencia en dinosaurios sugiere que las estrategias reproductivas eran tan diversas como las de las aves actuales.',
      'El tamaño de las nidadas variaba entre especies. Los hadrosaurios como Maiasaura ponían entre 30 y 40 huevos por nido, mientras que los oviraptorosaruios depositaban entre 12 y 24 huevos. Los saurópodos titanosaurios, a pesar de su tamaño adulto de hasta 30 metros, ponían huevos de solo 12 a 15 centímetros de diámetro. En Auca Mahuevo, en la Patagonia argentina, los paleontólogos Luis Chiappe y Lowell Dingus descubrieron en 1997 un sitio de anidación de titanosaurios que se extendía por varios kilómetros cuadrados, con miles de nidos agrupados. Algunos huevos conservaban embriones con piel preservada, mostrando que las crías tenían una textura cutánea diferente a la de los adultos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El nombre "oviraptor" significa "ladrón de huevos", un error histórico que se perpetuó durante décadas. En 1923, cuando Henry Fairfield Osborn describió el primer fósil de Oviraptor philoceratops, lo encontró junto a un nido de huevos que asumió pertenecían a Protoceratops. Osborn creyó que el animal estaba robando los huevos. Setenta años después, en 1993, se descubrió que los huevos eran del propio Oviraptor: no era un ladrón sino un padre protegiendo a su descendencia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La cáscara de los huevos de dinosaurio tenía una estructura microscópica de cristales de calcita organizados en columnas verticales, similar a la de los huevos de las aves modernas. El grosor de la cáscara variaba entre 0.5 y 4 milímetros. El paleontólogo Darla Zelenitsky de la Universidad de Calgary demostró que la porosidad de la cáscara indica el ambiente de incubación: huevos con menos poros se incubaban en nidos abiertos con calor corporal, mientras que los más porosos se cubrían con vegetación en descomposición que generaba calor y humedad.' },
    ],
    fact: 'En la Formación Javkhlant de Mongolia, un equipo dirigido por Yoshitsugu Kobayashi descubrió en 2019 un fósil de un dinosaurio terópodo adulto preservado sobre un nido que contenía al menos 24 huevos. Lo notable es que varios de los huevos contenían embriones en avanzado estado de desarrollo, lo cual confirma que el adulto permaneció incubando hasta las etapas finales de la eclosión. La temperatura de incubación, calculada mediante análisis de isótopos de oxígeno en las cáscaras, se estimó entre 30 y 38 grados Celsius, un rango comparable al de las aves modernas.',
  },
  {
    id: 'comunicacion-dinosaurios',
    title: 'Comunicación entre Dinosaurios',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/dinos_m6.png',
    image: '/assets/dinosaurios/dinos_m6.png',
    content: [
      'Los dinosaurios hadrosaurios (conocidos como "picos de pato") poseían crestas craneales huecas que funcionaban como resonadores acústicos. El caso más estudiado es el de Parasaurolophus walkeri, cuya cresta tubular curvada hacia atrás medía hasta 1.8 metros de longitud. En 1981, David Weishampel, de la Universidad Johns Hopkins, fue el primero en proponer que esta cresta funcionaba como un instrumento de viento natural. Sus cálculos indicaron que el aire expulsado a través de los pasajes nasales internos de la cresta podía producir sonidos de baja frecuencia, alrededor de 30 Hz, audibles a varios kilómetros de distancia.',
      'En 1998, un equipo del Museo del Estado de Nuevo México, liderado por Tom Williamson, realizó una tomografía computarizada (CT scan) de un cráneo de Parasaurolophus tubicen y creó un modelo digital tridimensional de sus pasajes nasales internos. Utilizando software de simulación acústica, el equipo reprodujo los sonidos que la cresta habría generado. El resultado fue un tono grave y resonante, similar al de un trombón o un didgeridoo, que habría sido efectivo para comunicación a larga distancia en ambientes boscosos del Cretácico tardío, hace unos 75 millones de años.',
      'La comunicación visual mediante coloración corporal también debió ser relevante en los dinosaurios. El Borealopelta markmitchelli, un nodosaurio del Cretácico de Canadá, conservó pigmentos originales que revelaron un patrón de contrasombreado: coloración oscura dorsal y clara ventral. Además, estudios sobre melanosomas (orgánulos que contienen pigmentos) preservados en dinosaurios emplumados como Sinosauropteryx y Anchiornis han permitido reconstruir patrones de color con bandas alternas de tonos claros y oscuros en la cola y las alas, lo que sugiere funciones de señalización social.',
      'Las estructuras craneales ornamentales de los ceratopsianos y hadrosaurios probablemente funcionaban como señales de reconocimiento específico entre especies y como indicadores de madurez sexual. El paleontólogo Kevin Padian de la Universidad de California en Berkeley argumentó en 2017 que las golas de los ceratopsianos, las crestas de los hadrosaurios y las placas de los estegosaurios evolucionaron principalmente como señales de reconocimiento entre especies, más que como armas o termorreguladores. Esta hipótesis se apoya en la gran diversidad de formas craneales entre especies que coexistían en las mismas formaciones geológicas.',
      'Los dinosaurios también pudieron comunicarse mediante sonidos producidos por estructuras distintas a las crestas craneales. Julia Clarke, de la Universidad de Texas en Austin, describió en 2016 un fósil del anquilosaurio Pinacosaurus grangeri que preservaba un aparato vocal modificado con sacos aéreos asociados a la tráquea. Clarke propuso que estos sacos habrían permitido generar vocalizaciones de baja frecuencia similares a los mugidos de los cocodrilos modernos, que producen infrasonidos de 20 Hz capaces de hacer vibrar el agua a su alrededor para señalar su posición y tamaño a posibles parejas o rivales.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2016, el paleontólogo Jakob Vinther, de la Universidad de Bristol, publicó la primera reconstrucción completa del color de un dinosaurio basada en melanosomas fósiles. El Psittacosaurus, un ceratopsiano del Cretácico temprano de China, tenía un patrón de contrasombreado, la espalda oscura y el vientre claro, que Vinther modeló en tres dimensiones bajo diferentes condiciones de iluminación. Los resultados indicaron que este dinosaurio vivía bajo la sombra del dosel forestal, donde el contrasombreado es más efectivo como camuflaje.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los hadrosaurios carecían de cuerdas vocales (como las aves modernas, que usan una siringe en lugar de una laringe). El sonido de la cresta de Parasaurolophus se producía por resonancia del aire dentro de los conductos nasales, similar al funcionamiento de un instrumento de viento. Cada especie de lambeosaurino tenía una cresta de forma diferente, lo que habría producido un sonido distintivo, permitiendo que animales de distintas especies se identificaran acústicamente incluso en la oscuridad o a través de vegetación densa.' },
    ],
    fact: 'En 2005, el paleontólogo Philip Senter de la Universidad de Fayetteville demostró, mediante análisis filogenético del aparato vocal de dinosaurios, que los dinosaurios no avianos probablemente no podían vocalizar como las aves modernas. En su lugar, habrían producido sonidos con la boca cerrada, similares a los arrullos de las palomas o los mugidos graves de los cocodrilos, transmitidos a través de la piel del cuello inflada con sacos aéreos. Este tipo de comunicación es efectiva a distancias cortas y particularmente útil en frecuencias bajas que penetran la vegetación densa.',
  },
  {
    id: 'migracion-territorio',
    title: 'Migración y Territorio',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/dinos_m6.png',
    image: '/assets/dinosaurios/dinos_m6.png',
    content: [
      'La evidencia de migración estacional en dinosaurios proviene de múltiples líneas de investigación independientes: análisis de isótopos estables en dientes y huesos, distribución geográfica de fósiles, y la estacionalidad de los sitios de anidación. Los isótopos de oxígeno incorporados en el esmalte dental durante el crecimiento de los dientes actúan como un registro químico del agua que el animal bebió. Si un dinosaurio se desplazaba entre regiones con diferente composición isotópica del agua (por ejemplo, tierras bajas costeras y montañas interiores), sus dientes registrarían esas variaciones estacionales.',
      'Henry Fricke, geoquímico de la Universidad de Colorado, publicó en 2011 un estudio pionero sobre migración en hadrosaurios del Cretácico tardío de Montana. Analizando los isótopos de oxígeno en dientes de Edmontosaurus y Hadrosaurus, Fricke encontró variaciones estacionales consistentes con desplazamientos de al menos 200 kilómetros entre zonas de alimentación de tierras bajas durante el verano y tierras altas durante el invierno. Este patrón se repitió en múltiples individuos y en dientes de diferentes estadios de crecimiento, lo que descartó la posibilidad de variaciones aleatorias.',
      'Los saurópodos titanosaurios, debido a sus enormes requerimientos alimenticios (un adulto de Argentinosaurus podía consumir más de 400 kilogramos de vegetación al día), habrían necesitado desplazarse continuamente para evitar el agotamiento de los recursos locales. El paleontólogo Mathew Wedel de la Universidad Western de Ciencias de la Salud calculó que una manada de 20 saurópodos adultos habría defoliado un área de bosque de varias hectáreas en cuestión de semanas, haciendo necesarios desplazamientos regulares.',
      'El comportamiento territorial en dinosaurios se infiere a partir de las estructuras utilizadas en combate intraespecífico. Los paquicefalosaurios, dinosaurios con cráneos engrosados, presentan evidencia de combates cabeza contra cabeza similares a los de los carneros modernos. En 2012, los paleontólogos Joseph Peterson y Christopher Vittore publicaron un estudio con tomografías de cráneos de Pachycephalosaurus que mostraban lesiones óseas, incluyendo fracturas curadas y áreas de hueso esponjoso dañado, consistentes con impactos repetidos a alta velocidad.',
      'Los terópodos grandes como Tyrannosaurus rex también mostraban marcas de combate intraespecífico. Los paleontólogos Darren Tanke y Philip Currie documentaron en 2000 un catálogo de lesiones faciales en cráneos de tiranosaurios, incluyendo surcos y perforaciones que coinciden con la mordida de otro tiranosaurio. La distribución de estas heridas, concentradas en la mandíbula inferior y los lados de la cara, sugiere enfrentamientos ritualizados por territorio o parejas, similares a las peleas entre cocodrilos machos que se muerden la mandíbula durante la temporada de apareamiento.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En las regiones polares del Cretácico, como la Formación Prince Creek en el norte de Alaska, se han encontrado fósiles de hadrosaurios y terópodos que vivían a latitudes de 70 grados norte. Durante el invierno, estas regiones experimentaban meses de oscuridad continua con temperaturas cercanas a los 2 grados Celsius. Algunos paleontólogos, como Anthony Fiorillo, argumentan que estos dinosaurios polares migraban al sur durante el invierno, recorriendo distancias de más de 2,600 kilómetros, comparable a la migración de los caribúes modernos en el Ártico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los isótopos de estroncio (Sr-87/Sr-86) en dientes fósiles proporcionan una segunda línea de evidencia independiente para la migración. Diferentes formaciones geológicas tienen firmas de estroncio distintas, y estas se incorporan en los dientes durante su formación. En 2017, el geoquímico Thomas Tütken demostró que los dientes de saurópodos jurásicos de la Formación Morrison en Norteamérica mostraban variaciones de estroncio compatibles con desplazamientos de al menos 300 kilómetros entre zonas de alimentación.' },
    ],
    fact: 'En 2008, el paleontólogo Gregory Erickson de la Universidad Estatal de Florida determinó que Tyrannosaurus rex alcanzaba su tamaño máximo de aproximadamente 9 toneladas alrededor de los 20 años de edad, tras un período de crecimiento acelerado entre los 14 y 18 años. La tasa de crecimiento máxima era de 2.1 kilogramos por día, comparable a la de las ballenas modernas. Este crecimiento rápido habría requerido enormes cantidades de alimento, estimadas en 40 a 60 kilogramos de carne al día, lo que implica que los tiranosaurios adultos habrían necesitado territorios de caza extensos, posiblemente de cientos de kilómetros cuadrados, similares a los de los osos pardos actuales.',
  },
  {
    id: 'dinosaurios-nocturnos',
    title: 'Dinosaurios Nocturnos',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/dinos_m6.png',
    image: '/assets/dinosaurios/dinos_m6.png',
    content: [
      'La pregunta de si los dinosaurios eran diurnos o nocturnos se respondió de manera cuantitativa en 2011, cuando Lars Schmitz y Ryosuke Motani, de la Universidad de California en Davis, publicaron un estudio en la revista Science que analizaba los anillos escleróticos de 33 especies de dinosaurios, pterosaurios y ancestros de mamíferos. El anillo esclerótico es una estructura ósea circular dentro del ojo, compuesta por placas óseas superpuestas, que determina la apertura máxima de la pupila y, por lo tanto, la cantidad de luz que puede entrar al ojo.',
      'Schmitz y Motani midieron dos parámetros clave: el diámetro interno del anillo esclerótico (que refleja el tamaño máximo de la pupila) y el diámetro de la órbita ocular. Comparando estas medidas con las de 164 especies de vertebrados modernos cuyo patrón de actividad es conocido (diurnos, nocturnos o crepusculares), los investigadores crearon un modelo estadístico que permitía predecir el patrón de actividad de animales extintos. El modelo clasificó correctamente al 92% de las especies modernas de referencia, lo que validó su aplicación a fósiles.',
      'Los resultados fueron reveladores: los grandes herbívoros como los hadrosaurios y los saurópodos resultaron ser catemerales, es decir, activos tanto de día como de noche, similar al patrón de los elefantes modernos que duermen solo 2 a 4 horas diarias. Los pequeños terópodos como Velociraptor y otros dromeosaurios mostraron adaptaciones claramente nocturnas, con anillos escleróticos de apertura amplia que permitirían la visión en condiciones de muy baja luminosidad, comparable a la de los búhos y gatos actuales.',
      'Los pterosaurios voladores presentaron una distribución mixta: los pterosaurios de gran envergadura como Pteranodon eran diurnos, mientras que los más pequeños como Ctenochasma tenían adaptaciones nocturnas. Esto tiene sentido ecológico, ya que los pterosaurios nocturnos pequeños habrían ocupado nichos similares a los de los murciélagos actuales, cazando insectos durante la noche para evitar la competencia con los pterosaurios diurnos más grandes.',
      'El estudio de Schmitz y Motani también demostró que la dicotomía simple entre "diurno" y "nocturno" es insuficiente para describir la ecología visual de los dinosaurios. Muchas especies mostraron adaptaciones crepusculares, activas durante el amanecer y el atardecer cuando la luz es intermedia. El protoceratopsiano Protoceratops andrewsi, de Mongolia, resultó ser nocturno según el análisis, lo que sugiere que vivía en un nicho temporal diferente al de sus depredadores diurnos como Velociraptor, desafiando la narrativa popular de una lucha a plena luz del día entre estas dos especies.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El fósil conocido como "Dinosaurios Luchadores" del desierto de Gobi, que muestra a un Velociraptor y un Protoceratops trabados en combate, fue preservado por una duna de arena que colapsó sobre ambos hace 74 millones de años. Según el análisis de Schmitz y Motani, Velociraptor era nocturno y Protoceratops también tenía adaptaciones nocturnas, lo que indica que este combate ocurrió probablemente durante la noche o el crepúsculo, no durante el día como suele representarse en reconstrucciones artísticas y documentales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El anillo esclerótico se conserva en los fósiles porque está compuesto de hueso. En las aves modernas (descendientes directos de los dinosaurios), el anillo esclerótico sigue presente y cumple la misma función. Los búhos, que son nocturnos, tienen anillos escleróticos con una apertura interna grande (pupila amplia), mientras que las águilas, diurnas, tienen una apertura proporcionalmente más pequeña. El diámetro del anillo esclerótico en Velociraptor era proporcionalmente tan grande como el de un búho, confirmando sus hábitos nocturnos.' },
    ],
    fact: 'El estudio de la visión nocturna en dinosaurios tiene implicaciones directas para entender la evolución de los mamíferos. Durante el Mesozoico, la mayoría de los mamíferos eran pequeños y nocturnos, y se ha propuesto que esto se debía a la presión depredadora de los dinosaurios diurnos. La investigación de Schmitz y Motani complicó esta "hipótesis del cuello de botella nocturno" al demostrar que muchos dinosaurios pequeños también eran nocturnos, lo que significa que los primeros mamíferos competían con dinosaurios incluso durante la noche, y su pequeño tamaño se debía a restricciones ecológicas más complejas que la simple evasión temporal de depredadores.',
  },
  {
    id: 'etologia-comparada',
    title: 'Etología Comparada',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/dinos_m6.png',
    image: '/assets/dinosaurios/dinos_m6.png',
    content: [
      'La etología comparada es el estudio del comportamiento animal mediante la comparación entre especies relacionadas evolutivamente. Para los dinosaurios, los dos grupos de referencia más relevantes son las aves (que son dinosaurios terópodos que sobrevivieron a la extinción) y los cocodrilianos (cocodrilos, caimanes y gaviales), que son los parientes vivos más cercanos de los dinosaurios fuera del grupo de las aves. Juntos, aves y cocodrilianos forman un grupo llamado Archosauria, y los comportamientos compartidos por ambos probablemente estaban presentes en sus ancestros comunes, incluyendo a los dinosaurios.',
      'Gregory Erickson, de la Universidad Estatal de Florida, y sus colaboradores establecieron en 2007 el "bracket filogenético extante" (Extant Phylogenetic Bracket o EPB) como método formal para inferir comportamientos en dinosaurios extintos. Si un comportamiento está presente tanto en aves como en cocodrilianos, se considera una inferencia de Nivel I: probablemente estaba presente en todos los dinosaurios. Si solo está en uno de los dos grupos, es una inferencia de Nivel II: posible pero no segura. Este método pone límites claros a lo que podemos y no podemos afirmar sobre el comportamiento de los dinosaurios.',
      'Las inferencias de Nivel I, compartidas por aves y cocodrilianos, incluyen: construcción de nidos en el suelo, cuidado parental de los huevos (al menos uno de los padres protege el nido), vocalizaciones para comunicación (ambos grupos producen sonidos con la boca cerrada), comportamiento territorial durante la temporada reproductiva, y cortejo con exhibiciones visuales. Estos comportamientos, al estar presentes en ambas ramas de los arcosaurios, se consideran ancestrales y probablemente existieron en todos los grupos de dinosaurios.',
      'Las inferencias de Nivel II, presentes en solo uno de los dos grupos, son más especulativas. El vuelo y el canto complejo son exclusivos de las aves; la emboscada acuática y la comunicación por infrasonidos son exclusivas de los cocodrilianos. No podemos asumir que los dinosaurios no avianos compartieran estos comportamientos derivados. Sin embargo, la incubación por contacto corporal se ha demostrado en dinosaurios terópodos mediante fósiles directos (como los oviraptorosaruios sobre sus nidos), elevando esta inferencia a un nivel de certeza mayor que el que el bracket filogenético solo proporcionaría.',
      'Un área donde la comparación con aves modernas ha sido particularmente productiva es en la reconstrucción del cortejo de los dinosaurios. En 2016, Martin Lockley y colaboradores publicaron el descubrimiento de marcas de raspado en areniscas del Cretácico de Colorado, similares a las que hacen los avestruces y las avutardas macho al raspar el suelo con las patas durante exhibiciones de cortejo. Las marcas, encontradas en el sitio de Alamosa y otros cuatro sitios en Colorado, medían hasta 2 metros de longitud y fueron interpretadas como evidencia directa de rituales de cortejo similares a los de las aves ratites modernas. Este es uno de los pocos casos donde el comportamiento de cortejo puede inferirse directamente del registro fósil.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los cocodrilos del Nilo hembras transportan a sus crías recién nacidas en la boca desde el nido hasta el agua, un comportamiento de cuidado parental documentado por primera vez en detalle por el naturalista Tony Pooley en 1962. En 2013, el paleontólogo David Varricchio propuso que los dinosaurios hadrosaurios podrían haber exhibido un nivel de cuidado parental similar o superior al de los cocodrilianos modernos, basándose en la evidencia de nidos con crías de diferentes tamaños, lo que indicaría que los padres alimentaban y protegían a las crías durante meses.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las aves modernas muestran comportamientos que heredaron de sus ancestros dinosaurianos. El comportamiento de aleteo con exhibición de plumas durante el cortejo en los gallos de pradera y los pavos reales tiene raíces en los dinosaurios emplumados del Cretácico. Las reconstrucciones de Caudipteryx, un dinosaurio emplumado del Cretácico temprano de China, muestran plumas ornamentales en la cola y las extremidades anteriores que habrían sido ineficientes para el vuelo pero efectivas para exhibiciones visuales, lo que indica que las plumas evolucionaron primero para exhibición y termorregulación, y solo posteriormente para el vuelo.' },
    ],
    fact: 'El paleontólogo John Ostrom, de la Universidad de Yale, fue el primero en proponer formalmente en 1969 que las aves descienden de los dinosaurios terópodos, basándose en su estudio del Deinonychus antirrhopus. Ostrom comparó la estructura esquelética de Deinonychus con la del ave fósil Archaeopteryx y encontró más de 20 caracteres anatómicos compartidos. Su trabajo, inicialmente controvertido, es hoy aceptado universalmente: cada vez que observamos a un gorrión construir un nido, a un cuervo resolver un problema o a una gallina incubar huevos, estamos observando comportamientos que evolucionaron hace más de 150 millones de años en dinosaurios terópodos del Jurásico.',
  },
];

// ——— Prehistoric Particle Field (Canvas Background) ———————————————————————
function PrehistoricField() {
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
      hue: Math.random() > 0.5 ? '93,138,104' : '193,120,41', // muted teal or burnt sienna
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

// ——— Dinosaur Behavior Header ————————————————————————————————————————————
function DinosaurBehaviorHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Organic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#dinoGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
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
        {/* Central footprint icon */}
        <ellipse cx="300" cy="26" rx="6" ry="8" fill="none" stroke="#5D8A68" strokeWidth="1.2" opacity="0.5" />
        <ellipse cx="293" cy="16" rx="3" ry="5" fill="none" stroke="#5D8A68" strokeWidth="1" opacity="0.4" transform="rotate(-12 293 16)" />
        <ellipse cx="300" cy="13" rx="3" ry="5" fill="none" stroke="#5D8A68" strokeWidth="1" opacity="0.4" />
        <ellipse cx="307" cy="16" rx="3" ry="5" fill="none" stroke="#5D8A68" strokeWidth="1" opacity="0.4" transform="rotate(12 307 16)" />
        <defs>
          <linearGradient id="dinoGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(93,138,104,0.9)" />
            <stop offset="100%" stopColor="rgba(93,138,104,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5D8A68" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">VIDA EN MANADA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(93,138,104,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">COMPORTAMIENTO DE LOS DINOSAURIOS</text>
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
          layoutId="activeDotDinosM6"
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
export default function InteractiveInfographic_DinosM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/dinosaurios/dinos_m6_bg.png)',
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
      <PrehistoricField />

      <DinosaurBehaviorHeader />

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
              🦕 ¡Has descubierto los secretos del comportamiento dinosauriano!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Etólogo Prehistórico
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
