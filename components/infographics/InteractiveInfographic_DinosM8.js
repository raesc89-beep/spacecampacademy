'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Feathers & Aves themed) ────────────────────────
function DecoFeather({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Feather quill */}
      <path d="M30 55 Q28 35 20 20 Q25 25 30 18 Q35 25 40 20 Q32 35 30 55" fill={color} opacity="0.3" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      {/* Central rachis */}
      <line x1="30" y1="55" x2="30" y2="12" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Barbs */}
      <line x1="30" y1="20" x2="22" y2="16" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="25" x2="21" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="30" x2="22" y2="28" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="35" x2="23" y2="34" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="20" x2="38" y2="16" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="25" x2="39" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="30" x2="38" y2="28" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="35" x2="37" y2="34" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Tip */}
      <circle cx="30" cy="10" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoFossil({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Fossil imprint circle */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="3 2" />
      {/* Skeleton outline */}
      <path d="M18 32 L24 28 L30 24 L36 22 L42 24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Rib lines */}
      <line x1="26" y1="28" x2="24" y2="34" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="24" x2="30" y2="32" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="34" y1="23" x2="35" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Head dot */}
      <circle cx="42" cy="24" r="3" fill={color} opacity="0.3" />
      {/* Rock texture dots */}
      <circle cx="14" cy="20" r="1" fill={color} opacity="0.3" />
      <circle cx="46" cy="40" r="1.5" fill={color} opacity="0.3" />
      <circle cx="20" cy="45" r="1" fill={color} opacity="0.25" />
    </svg>
  );
}

function DecoDinoWing({ size = 80, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Wing membrane shape */}
      <path d="M10 40 Q20 15 40 10 Q55 8 70 14 Q60 20 50 24 Q40 28 30 34 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Flight feather lines */}
      <line x1="40" y1="10" x2="35" y2="30" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="50" y1="12" x2="42" y2="28" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="60" y1="16" x2="48" y2="26" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Arm bone */}
      <path d="M10 40 L25 25 L40 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Claw dot */}
      <circle cx="10" cy="40" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoMelanosome({ size = 60, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Microscope-like circles representing melanosomes */}
      <circle cx="20" cy="20" r="6" fill={color} opacity="0.3" />
      <circle cx="38" cy="18" r="4" fill={color} opacity="0.25" />
      <circle cx="28" cy="35" r="5" fill={color} opacity="0.3" />
      <circle cx="42" cy="38" r="7" fill={color} opacity="0.2" />
      <circle cx="15" cy="42" r="3" fill={color} opacity="0.35" />
      {/* Connection lines */}
      <line x1="20" y1="20" x2="38" y2="18" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1="28" y1="35" x2="42" y2="38" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1="20" y1="20" x2="28" y2="35" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Outer frame */}
      <rect x="5" y="5" width="50" height="50" rx="8" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

function DecoClaw({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Raptor sickle claw */}
      <path d="M25 50 Q20 35 22 25 Q25 15 35 10 Q38 15 36 25 Q34 35 30 45 Z" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Claw tip highlight */}
      <circle cx="35" cy="10" r="2" fill={color} opacity="0.5" />
      {/* Scratches */}
      <line x1="42" y1="20" x2="50" y2="30" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <line x1="44" y1="18" x2="52" y2="28" stroke={color} strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
      <line x1="46" y1="16" x2="54" y2="26" stroke={color} strokeWidth="0.6" opacity="0.2" strokeLinecap="round" />
      {/* Small feather at base */}
      <path d="M18 48 Q15 42 18 38 Q20 42 22 48 Z" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoPhylogeny({ size = 80, color = '#7D6B99', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.2, ...style }}>
      {/* Phylogenetic tree */}
      <line x1="10" y1="48" x2="40" y2="28" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="40" y1="28" x2="60" y2="10" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="40" y1="28" x2="70" y2="28" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="25" y1="38" x2="50" y2="48" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <line x1="40" y1="28" x2="55" y2="42" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      {/* Nodes */}
      <circle cx="10" cy="48" r="3" fill={color} opacity="0.4" />
      <circle cx="40" cy="28" r="3.5" fill={color} opacity="0.5" />
      <circle cx="60" cy="10" r="3" fill={color} opacity="0.4" />
      <circle cx="70" cy="28" r="2.5" fill={color} opacity="0.4" />
      <circle cx="50" cy="48" r="2.5" fill={color} opacity="0.35" />
      <circle cx="55" cy="42" r="2.5" fill={color} opacity="0.35" />
      {/* Label ticks */}
      <line x1="58" y1="10" x2="55" y2="8" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="72" y1="28" x2="75" y2="26" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'sinosauropteryx-descubrimiento': [DecoFossil, DecoFeather, DecoMelanosome],
  'archaeopteryx-eslabon': [DecoDinoWing, DecoFossil, DecoFeather],
  'plumas-funciones': [DecoFeather, DecoMelanosome, DecoDinoWing],
  'dromeosaurios-emplumados': [DecoClaw, DecoFeather, DecoFossil],
  'origen-vuelo': [DecoDinoWing, DecoFeather, DecoClaw],
  'colores-prehistoricos': [DecoMelanosome, DecoFeather, DecoFossil],
  'aves-dinosaurios-vivos': [DecoPhylogeny, DecoDinoWing, DecoFeather],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Xu, X. et al. (2014). An integrative approach to understanding bird origins, Science, 346(6215)',
  'Brusatte, S.L. (2018). The Rise and Fall of the Dinosaurs, William Morrow / HarperCollins',
  'Prum, R.O. (2017). The Evolution of Beauty: How Darwin\'s Forgotten Theory of Mate Choice Shapes the Animal World, Doubleday',
  'Li, Q. et al. (2010). Plumage Color Patterns of an Extinct Dinosaur, Science, 327(5971), pp. 1369–1372',
  'Xu, X., Zhou, Z. & Prum, R.O. (2001). Branched integumental structures in Sinornithosaurus, Nature, 410, pp. 200–204',
  'Norell, M.A. & Xu, X. (2005). Feathered Dinosaurs, Annual Review of Earth and Planetary Sciences, 33, pp. 277–299',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'sinosauropteryx-descubrimiento',
    title: 'El Descubrimiento que Cambió Todo',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/infographic_m8/btn_sinosauropteryx-descubrimiento.jpg',
    image: '/assets/dinosaurios/infographic_m8/hero_sinosauropteryx-descubrimiento.jpg',
    content: [
      'En 1996, el paleontólogo Ji Qiang presentó al mundo un fósil hallado en la Formación Yixian de Liaoning, China, que transformó para siempre nuestra comprensión de los dinosaurios. El espécimen, bautizado como Sinosauropteryx prima, conservaba a lo largo de su cuerpo estructuras filamentosas que no podían interpretarse como otra cosa que plumas primitivas. Estas fibras, de entre 13 y 35 milímetros de longitud, cubrían el cuello, la espalda y la cola del animal, formando un patrón que recordaba al plumón de los polluelos actuales. El hallazgo fue publicado oficialmente por Ji y Ji en la revista Nature en 1996.',
      'Sinosauropteryx era un terópodo pequeño, de aproximadamente un metro de longitud total y unos 2.5 kilogramos de peso estimado. Pertenecía al grupo de los compsognátidos, carnívoros bípedos ágiles que cazaban insectos y lagartos. El fósil preservaba incluso el contenido de su estómago, donde se identificó un lagarto parcialmente digerido, lo que proporcionó datos directos sobre su dieta. Las condiciones excepcionales de fosilización en Liaoning, donde ceniza volcánica cubrió rápidamente los organismos, permitieron la conservación de tejidos blandos que normalmente se pierden durante el proceso de fosilización.',
      'El impacto de este descubrimiento fue profundo porque demostró que las plumas no eran exclusivas de las aves. Durante más de un siglo, los paleontólogos habían debatido la relación entre dinosaurios y aves. Thomas Henry Huxley propuso la conexión en 1868, pero la falta de evidencia directa de plumas en dinosaurios no aviares mantuvo el debate abierto. Sinosauropteryx proporcionó la primera prueba física irrefutable de que las estructuras tegumentarias similares a plumas existían en dinosaurios que claramente no eran aves y que no podían volar.',
      'Tras el descubrimiento de Sinosauropteryx, la Formación Yixian produjo una avalancha de fósiles emplumados. Entre 1996 y 2015 se describieron más de 40 especies de dinosaurios con diferentes tipos de plumas en China. Estos hallazgos incluyen desde filamentos simples hasta plumas asimétricas aptas para el vuelo. La provincia de Liaoning se convirtió en el yacimiento paleontológico más productivo del mundo para estudiar la evolución de las plumas, generando más datos en dos décadas que los acumulados en los 150 años anteriores.',
      'El contexto geológico de estos descubrimientos es relevante. La Formación Yixian data del Cretácico Inferior, entre 130 y 120 millones de años atrás. El ambiente era un ecosistema lacustre rodeado de bosques de coníferas, con actividad volcánica frecuente. Las erupciones producían nubes de ceniza fina que sepultaban organismos de forma rápida y uniforme, creando un tipo de preservación conocido como Lagerstätte, donde incluso los detalles más delicados de la anatomía quedan registrados en la roca con una resolución que permite análisis microscópicos detallados.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer fósil de Sinosauropteryx fue descubierto por un granjero llamado Li Yumin mientras buscaba fósiles para venderlos en mercados locales. El comercio de fósiles en la provincia de Liaoning era tan común que muchos especímenes científicos importantes fueron inicialmente encontrados por agricultores y vendedores, no por científicos profesionales. Li Yumin partió la losa en dos y vendió cada mitad por separado. Los paleontólogos tuvieron que reunir ambas partes para estudiar el fósil completo, lo que tomó varios meses de negociaciones.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las estructuras filamentosas de Sinosauropteryx no son plumas en el sentido moderno. Son protoPlumas de tipo 1 según la clasificación de Richard Prum (publicada en 2002 en The Quarterly Review of Biology), que consisten en filamentos simples sin ramificaciones. Las plumas modernas poseen un raquis central con barbas y bárbulas que se entrelazan mediante ganchitos microscópicos. Las protoplumas de Sinosauropteryx representan la etapa evolutiva más básica, equivalente al primer paso en un modelo de cinco etapas que culmina con la pluma de vuelo asimétrica.' },
    ],
    fact: 'En 2010, un equipo liderado por Fucheng Zhang, de la Universidad de Pekín, identificó melanosomas (orgánulos que contienen pigmentos) en las protoplumas de Sinosauropteryx. El análisis reveló dos tipos: eumelanosomas (alargados, asociados a colores oscuros) y feomelanosomas (esféricos, asociados a tonos rojizos y anaranjados). Esto demostró que Sinosauropteryx tenía un patrón de bandas alternas claras y oscuras en su cola, similar al de un mapache actual, constituyendo la primera reconstrucción de color de un dinosaurio basada en evidencia física directa.',
  },
  {
    id: 'archaeopteryx-eslabon',
    title: 'Archaeopteryx: El Eslabón',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/infographic_m8/btn_archaeopteryx-eslabon.jpg',
    image: '/assets/dinosaurios/infographic_m8/hero_archaeopteryx-eslabon.jpg',
    content: [
      'En 1861, apenas dos años después de que Charles Darwin publicara "El Origen de las Especies", apareció en las canteras de caliza de Solnhofen, en Baviera (Alemania), uno de los fósiles más importantes de la historia de la paleontología. Archaeopteryx lithographica combinaba rasgos de reptil y de ave en un mismo organismo: tenía dientes en las mandíbulas, garras en los dedos de las alas y una cola ósea larga como un dinosaurio, pero también poseía plumas asimétricas con la estructura necesaria para el vuelo activo. El momento de su descubrimiento fue relevante porque proporcionó la primera evidencia fósil de una forma de transición entre dos grupos de vertebrados.',
      'Hasta la fecha se han identificado 13 especímenes atribuidos a Archaeopteryx, todos procedentes de las calizas litográficas de Solnhofen, que datan del Jurásico Superior, hace unos 150 millones de años. El más conocido es el espécimen de Berlín, adquirido por el Museo de Historia Natural de esa ciudad en 1880 por 20,000 marcos de oro. Cada espécimen varía en su grado de preservación: algunos conservan impresiones detalladas de plumas, mientras que otros muestran principalmente el esqueleto. Las diferencias entre los especímenes han generado debates sobre si todos pertenecen a la misma especie o representan varias especies distintas.',
      'Archaeopteryx tenía el tamaño aproximado de una urraca europea actual, con una envergadura de unos 50 centímetros y un peso estimado de 0.8 a 1 kilogramo. Su cerebro, analizado mediante tomografía computarizada en 2004 por Angela Milner y colaboradores del Museo de Historia Natural de Londres, mostraba un desarrollo notable de las regiones visuales y de equilibrio, comparable al de las aves modernas. Sin embargo, su capacidad de vuelo probablemente era limitada: carecía de quilla esternal (el hueso donde se insertan los músculos de vuelo en las aves actuales) y su esternón era plano y delgado.',
      'La posición taxonómica de Archaeopteryx ha sido objeto de revisiones constantes. Tradicionalmente se le clasificó como el ave más primitiva conocida, pero análisis filogenéticos recientes, como el publicado por Xu Xing en 2011 en Nature, lo ubicaron más cerca de los deinonicosaurios (el grupo que incluye a Velociraptor) que de las aves modernas. Este resultado, aunque debatido, ilustra que la frontera entre "dinosaurios" y "aves" es mucho más difusa de lo que se pensaba. No existe una línea clara donde termina un dinosaurio y empieza un ave; la transición fue gradual, con múltiples linajes experimentando diferentes combinaciones de rasgos aviares.',
      'Las calizas de Solnhofen se formaron en una laguna tropical poco profunda con aguas hipersalinas y pobres en oxígeno. Los organismos que caían al fondo se preservaban con un detalle excepcional porque la ausencia de oxígeno impedía la descomposición y la falta de corrientes evitaba la dispersión de los restos. Estas condiciones crearon un Lagerstätte del Jurásico que también preservó medusas, libélulas con envergaduras de 15 centímetros, y el pterosaurio Rhamphorhynchus. La caliza fue explotada comercialmente para la industria de impresión litográfica, y fue precisamente un trabajador de cantera quien encontró la primera pluma aislada de Archaeopteryx en 1860.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El espécimen de Londres de Archaeopteryx fue comprado por el Museo de Historia Natural de Londres en 1862 por 700 libras esterlinas, una cantidad que equivale a unos 100,000 dólares actuales ajustados por inflación. El vendedor fue el médico Karl Häberlein, quien aceptó el fósil como pago de honorarios médicos de los trabajadores de la cantera. Richard Owen, el científico que acuñó la palabra "dinosaurio" en 1842, fue quien gestionó la compra y quien publicó la primera descripción científica formal del espécimen.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio publicado en 2012 por Ryan Carney en Nature Communications analizó la primera pluma aislada de Archaeopteryx mediante microscopía electrónica de barrido y encontró melanosomas que indicaban una coloración negra mate. La pluma era una cobertora del ala, no una pluma de vuelo primaria. Este análisis demostró que Archaeopteryx tenía plumas oscuras, no multicolores como se representaba en muchas ilustraciones previas. La forma y densidad de los melanosomas coincidían con el patrón observado en las plumas negras de los cuervos actuales.' },
    ],
    fact: 'Archaeopteryx vivió hace 150 millones de años, pero las aves modernas (Neornithes) no aparecieron hasta hace unos 70 millones de años. Esto significa que Archaeopteryx está más alejado temporalmente de un gorrión actual de lo que los humanos estamos del Tyrannosaurus rex. Los 80 millones de años que separan a Archaeopteryx de las aves modernas fueron un período de intensa experimentación evolutiva donde surgieron y se extinguieron múltiples linajes de aves primitivas, como Confuciusornis (que tenía pico sin dientes) y los enantiornites (el grupo de aves más diverso del Cretácico, con más de 60 especies descritas).',
  },
  {
    id: 'plumas-funciones',
    title: 'Plumas: No Solo para Volar',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/infographic_m8/btn_plumas-funciones.jpg',
    image: '/assets/dinosaurios/infographic_m8/hero_plumas-funciones.jpg',
    content: [
      'Las plumas son las estructuras tegumentarias más complejas de cualquier vertebrado, y su origen evolutivo precedió al vuelo por decenas de millones de años. Richard Prum, ornitólogo de la Universidad de Yale, propuso en 1999 un modelo de desarrollo de las plumas en cinco etapas que explica cómo estas estructuras evolucionaron gradualmente. La etapa 1 es un filamento simple (como los de Sinosauropteryx); la etapa 2 es un racimo de filamentos unidos en la base; la etapa 3 añade un raquis central; la etapa 4 desarrolla barbas con bárbulas interconectadas; y la etapa 5 produce la pluma asimétrica necesaria para el vuelo. Los fósiles de Liaoning muestran dinosaurios en cada una de estas etapas.',
      'La función original de las plumas fue probablemente el aislamiento térmico. Los dinosaurios terópodos eran animales de metabolismo activo que necesitaban mantener su temperatura corporal estable. Un estudio de 2014 publicado en Science por Godefroit y colaboradores describió el dinosaurio Kulindadromeus, hallado en Siberia, que poseía estructuras similares a plumas no solo en un terópodo sino en un ornitisquio (dinosaurio con cadera de ave). Este hallazgo sugirió que las protoplumas podrían haber estado presentes en el ancestro común de todos los dinosaurios, lo que situaría su origen hace más de 240 millones de años, en el Triásico Medio.',
      'Las plumas cumplieron funciones de exhibición sexual mucho antes de servir para volar. Epidexipteryx, un dinosaurio del tamaño de una paloma descrito en 2008 por Zhang y colaboradores en Nature, tenía cuatro plumas ornamentales larguísimas en la cola que no servían para el vuelo ni para el aislamiento. Estas plumas de exhibición eran similares en concepto a las plumas de cola del pavo real. Caudipteryx, descrito en 1998, presentaba un abanico de plumas simétricas en los brazos y la cola que probablemente usaba en rituales de cortejo. Estas evidencias indican que la selección sexual fue un motor evolutivo clave en la diversificación de las plumas.',
      'La función de incubación también fue relevante. En 1995, Mark Norell y sus colegas del Museo Americano de Historia Natural descubrieron un espécimen de Citipati osmolskae (un oviraptorosaurio) fosilizado sobre un nido de huevos en una postura idéntica a la que adoptan las aves modernas cuando incuban. Los brazos del animal estaban extendidos sobre los huevos, cubriendo la periferia del nido. Si estos dinosaurios tenían plumas en los brazos (como sugieren fósiles de parientes cercanos), la postura solo tiene sentido funcional si las plumas proporcionaban cobertura térmica a los huevos, de modo similar a como una gallina actual protege sus huevos con sus alas emplumadas.',
      'Las plumas modernas poseen una microestructura de ingeniería notable. Cada bárbula tiene ganchitos microscópicos (hámulis) que se entrelazan con las bárbulas adyacentes como un cierre de velcro natural. Una sola pluma de vuelo de un halcón peregrino contiene más de un millón de bárbulas interconectadas. Esta estructura crea una superficie aerodinámica ligera pero resistente que puede soportar las fuerzas del vuelo a más de 300 kilómetros por hora. Las plumas también son impermeables gracias a la cera producida por la glándula uropigial, y se renuevan periódicamente mediante la muda, un proceso controlado hormonalmente que reemplaza las plumas desgastadas sin comprometer la capacidad de vuelo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las plumas están hechas de beta-queratina, la misma proteína que forma las escamas de los reptiles. En 2016, un equipo liderado por Liana Fun en la Universidad de Yale demostró que las plumas y las escamas comparten los mismos genes reguladores de desarrollo (llamados genes Shh y BMP), y que manipulando estos genes en embriones de cocodrilo se podían inducir estructuras similares a plumas. Esto confirmó que las plumas evolucionaron como una modificación de las escamas reptilianas preexistentes, no como una estructura completamente nueva.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El número de plumas varía según la especie de ave. Un colibrí tiene entre 900 y 1,000 plumas, mientras que un cisne de tundra puede tener hasta 25,216 plumas (contadas individualmente por el ornitólogo Peter Wetmore en 1936). Más del 80% de las plumas de un cisne se concentran en la cabeza y el cuello. Las plumas representan entre el 5% y el 10% del peso corporal total de un ave, y un albatros errante, que tiene la mayor envergadura de cualquier ave viva (hasta 3.5 metros), posee plumas de vuelo que miden más de 40 centímetros de longitud individual.' },
    ],
    fact: 'En 2016, un equipo liderado por Lida Xing de la Universidad de Geociencias de China publicó en la revista Current Biology el hallazgo de una cola de dinosaurio emplumado preservada en ámbar birmano de 99 millones de años de antigüedad. La pieza, de 36.73 milímetros de longitud, conservaba ocho vértebras caudales cubiertas de plumas con barbas y bárbulas visibles en tres dimensiones, no aplastadas como ocurre en los fósiles de roca. El análisis de tomografía computarizada reveló que la cola pertenecía a un celurosaurio juvenil, y que las plumas tenían una coloración castaña en la superficie superior y blanca en la inferior.',
  },
  {
    id: 'dromeosaurios-emplumados',
    title: 'Los Dromeosaurios Emplumados',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/infographic_m8/btn_dromeosaurios-emplumados.jpg',
    image: '/assets/dinosaurios/infographic_m8/hero_dromeosaurios-emplumados.jpg',
    content: [
      'Los dromeosáuridos, conocidos popularmente como "raptores", constituyen la familia de dinosaurios más estrechamente emparentada con las aves. Estos depredadores bípedos se distinguen por su garra retráctil en forma de hoz en el segundo dedo del pie, que podía medir hasta 16 centímetros en las especies más grandes. Desde el descubrimiento de Sinornithosaurus millenii en 1999 por Xu Xing, Xu y Prum, sabemos que estos dinosaurios estaban cubiertos de plumas filamentosas ramificadas. El espécimen, hallado en Liaoning, China, preservaba impresiones de plumas en la cabeza, los brazos, las piernas y la cola, demostrando que los "raptores" del Cretácico se parecían más a aves de presa que a lagartos.',
      'Microraptor gui, descrito por Xu Xing en 2003 en la revista Nature, revolucionó la paleontología al revelar un dinosaurio con cuatro alas funcionales. Este dromeosáurido de aproximadamente 77 centímetros de longitud y unos 900 gramos de peso poseía plumas de vuelo largas y asimétricas no solo en los brazos sino también en las patas traseras, formando un segundo par de superficies sustentadoras. Análisis aerodinámicos publicados por Chatterjee y Templin en 2007 sugirieron que Microraptor planeaba entre los árboles usando sus cuatro alas como un biplano biológico, con las patas extendidas lateralmente y hacia atrás para maximizar la superficie de sustentación.',
      'Zhenyuanlong suni, descrito en 2015 por Lü y Brusatte en la revista Scientific Reports, presentó una paradoja: era un dromeosáurido relativamente grande (1.65 metros de longitud, unos 20 kilogramos) con alas que poseían plumas de vuelo largas y penáceas pero que eran demasiado cortas para permitir el vuelo. Las alas de Zhenyuanlong medían solo el 60% de lo necesario para sostener su peso en el aire. Este hallazgo demostró que las plumas de vuelo no evolucionaron necesariamente para volar; en animales como Zhenyuanlong probablemente servían para exhibición, protección de los huevos durante la incubación, o estabilización durante la carrera.',
      'Deinonychus antirrhopus, descrito por John Ostrom en 1969, fue el dinosaurio que inició la revolución científica sobre la relación dinosaurios-aves. Aunque el espécimen original no preservaba plumas (las condiciones de fosilización en Montana, Estados Unidos, no favorecen la conservación de tejidos blandos), la anatomía de Deinonychus era tan similar a la de las aves que Ostrom propuso formalmente en 1976 que las aves descienden de los dinosaurios terópodos. Deinonychus medía 3.4 metros de longitud, pesaba unos 73 kilogramos y cazaba en grupos, como indican yacimientos donde múltiples individuos aparecen junto a un herbívoro Tenontosaurus.',
      'Velociraptor mongoliensis, de Mongolia, fue descubierto en 1924 por la expedición del Museo Americano de Historia Natural al desierto del Gobi. A diferencia de su representación en películas de ciencia ficción (donde aparece sin plumas y con tamaño exagerado), Velociraptor medía solo 2 metros de longitud, pesaba unos 15 kilogramos y estaba cubierto de plumas. En 2007, Turner, Makovicky y Norell publicaron en Science el descubrimiento de protuberancias para la inserción de plumas (llamadas quill knobs) en el cúbito de un Velociraptor, las mismas estructuras que anclan las plumas de vuelo en las aves modernas. Esto confirmó la presencia de plumas grandes y penáceas en sus antebrazos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El fósil más famoso de Mongolia muestra a un Velociraptor y un Protoceratops trabados en combate mortal, preservados por una tormenta de arena que los sepultó instantáneamente hace 74 millones de años. El Velociraptor tiene su garra clavada en la garganta del Protoceratops, mientras el herbívoro muerde el brazo del depredador. Este espécimen, conocido como "Los Dinosaurios Luchadores", fue descubierto en 1971 en Tugriken Shireh, Mongolia, y se exhibe en el Museo de Ciencias Naturales de la Academia Polaca de Ciencias en Varsovia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Estudios biomecánicos de la garra en hoz de los dromeosáuridos, publicados por Manning y colaboradores en 2006 en la revista Biology Letters, utilizaron modelos computarizados y pruebas con garras artificiales para demostrar que la garra no servía para destripar a las presas (como se muestra en la ficción) sino para sujetarse al cuerpo de animales más grandes, funcionando como un crampón. El dinosaurio trepaba sobre su presa y la desgarraba con las mandíbulas y las garras de las manos, un comportamiento similar al de las águilas arpía actuales cuando capturan monos.' },
    ],
    fact: 'Microraptor tenía un plumaje negro iridiscente. En 2012, Li y colaboradores publicaron en Science un análisis de los melanosomas de Microraptor que reveló una disposición organizada en capas delgadas, idéntica a la que produce la iridiscencia en las plumas de los estorninos y los cuervos actuales. Esto significa que Microraptor brillaba con reflejos metálicos azules y verdes bajo la luz del sol hace 120 millones de años. La iridiscencia en aves modernas se asocia con exhibición sexual, lo que sugiere que la selección de pareja basada en el aspecto visual del plumaje ya operaba en el Cretácico Inferior.',
  },
  {
    id: 'origen-vuelo',
    title: 'Cómo Aprendieron a Volar',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/infographic_m8/btn_origen-vuelo.jpg',
    image: '/assets/dinosaurios/infographic_m8/hero_origen-vuelo.jpg',
    content: [
      'El origen del vuelo en las aves es uno de los debates más prolongados de la biología evolutiva, con dos hipótesis principales que compiten desde hace más de un siglo. La hipótesis "desde el suelo hacia arriba" (cursorial), propuesta inicialmente por Samuel Williston en 1879 y desarrollada por John Ostrom en 1979, plantea que los dinosaurios terópodos corredores desarrollaron las alas para generar sustentación mientras corrían a alta velocidad, hasta que eventualmente despegaron del suelo. La hipótesis alternativa, "desde los árboles hacia abajo" (arbórea), propuesta por Othniel Charles Marsh en 1880, sugiere que dinosaurios arborícolas desarrollaron primero la capacidad de planeo antes de evolucionar el vuelo activo con aleteo.',
      'En 2003, Kenneth Dial de la Universidad de Montana propuso una tercera explicación que ha ganado aceptación considerable: la carrera con asistencia alar (WAIR, por sus siglas en inglés, Wing-Assisted Incline Running). Dial observó que los polluelos de perdiz chukar (Alectoris chukar) usan sus alas, incluso antes de poder volar, para generar tracción contra superficies inclinadas. Las alas no proporcionan sustentación sino que empujan al ave contra la pendiente, mejorando la tracción de las patas. Polluelos de apenas 4 días con plumas rudimentarias podían subir pendientes de 60 grados usando esta técnica, y a los 20 días escalaban superficies completamente verticales.',
      'La hipótesis WAIR resuelve un problema central de las otras dos teorías: explica para qué sirven las alas antes de que puedan generar suficiente sustentación para el vuelo. Un ala a medio desarrollar no sirve para volar pero sí puede ayudar a subir pendientes, escapar de depredadores trepando a troncos y rocas, y estabilizar al animal durante saltos y carreras en terreno irregular. Cada incremento en el tamaño y la complejidad de las plumas proporciona una ventaja funcional inmediata, eliminando la necesidad de invocar un "salto" evolutivo improbable desde un animal sin alas a uno que vuela.',
      'Los fósiles de Microraptor y otros dinosaurios de cuatro alas como Anchiornis y Changyuraptor añaden complejidad al debate. Estos animales tenían plumas de vuelo tanto en los brazos como en las patas, lo que sugiere que el vuelo pudo haber pasado por una etapa tetrapterigial (de cuatro alas) antes de reducirse al plan biajar (dos alas) de las aves modernas. Changyuraptor, descrito en 2014 por Han y colaboradores, pesaba 4 kilogramos y tenía las plumas de cola más largas conocidas de cualquier dinosaurio no aviar (30 centímetros), que funcionaban como estabilizadores durante el planeo y el descenso.',
      'La transición al vuelo activo con aleteo requirió modificaciones anatómicas específicas que aparecieron gradualmente en el linaje que conduce a las aves. Entre las más importantes están: la fusión de la clavícula en una fúrcula (hueso de la suerte) que actúa como resorte elástico durante el aleteo; el desarrollo de una quilla esternal para la inserción de músculos pectorales potentes; la reducción y fusión de los huesos de la mano para formar un carpometacarpo rígido; y la reducción de la cola ósea, reemplazada por un pigostilo que soporta las plumas timoneras. Cada una de estas modificaciones aparece parcialmente desarrollada en diferentes dinosaurios fósiles, creando una secuencia evolutiva documentada en el registro fósil.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Kenneth Dial diseñó un experimento donde filmó polluelos de perdiz en cámaras de alta velocidad (500 fotogramas por segundo) mientras corrían por rampas de diferentes ángulos. Los polluelos más jóvenes, que apenas tenían plumas, ya usaban el movimiento de aleteo para subir pendientes. Dial también probó cortando las plumas de vuelo de algunos polluelos, y estos perdieron la capacidad de subir pendientes pronunciadas, demostrando que las plumas eran esenciales para la técnica WAIR incluso antes de que permitieran el vuelo propiamente dicho.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El análisis biomecánico del vuelo de Microraptor, realizado mediante túnel de viento con modelos a escala por Dyke y colaboradores en 2013 (publicado en Nature Communications), demostró que Microraptor era más eficiente como planeador que como volador con aleteo. Su velocidad óptima de planeo era de 10 a 15 metros por segundo con un ángulo de descenso de 5 a 7 grados. Las patas traseras emplumadas actuaban como superficies de sustentación secundarias que aumentaban la eficiencia aerodinámica un 20% respecto a un modelo con solo dos alas delanteras.' },
    ],
    fact: 'Las aves modernas descienden de un linaje de dinosaurios terópodos que sobrevivió a la extinción masiva del final del Cretácico hace 66 millones de años. Un estudio de 2015 publicado en Current Biology por Brusatte y colaboradores determinó que las aves que sobrevivieron al impacto del asteroide Chicxulub eran de tamaño pequeño (menos de 1 kilogramo), terrestres y con picos sin dientes. Todas las aves con dientes, todas las de gran tamaño y todas las arborícolas obligadas se extinguieron. Las aproximadamente 10,000 especies de aves vivas hoy descienden de un número reducido de linajes supervivientes que se diversificaron explosivamente en los primeros 10 a 15 millones de años del Cenozoico.',
  },
  {
    id: 'colores-prehistoricos',
    title: 'Colores Prehistóricos',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/infographic_m8/btn_colores-prehistoricos.jpg',
    image: '/assets/dinosaurios/infographic_m8/hero_colores-prehistoricos.jpg',
    content: [
      'Durante más de 150 años, los colores de los dinosaurios fueron pura especulación artística. Todo cambió en 2010 cuando un equipo liderado por Quanguo Li de la Universidad de Pekín publicó en Science la primera reconstrucción completa del color de un dinosaurio basada en evidencia física. El estudio se centró en Anchiornis huxleyi, un dinosaurio emplumado del Jurásico Superior (hace 160 millones de años), y reveló un patrón de coloración preciso: cuerpo mayormente gris oscuro, cresta de plumas rojizas en la cabeza, y un patrón de bandas blancas y negras en las alas, similar al de un pájaro carpintero actual.',
      'El método se basa en los melanosomas, orgánulos microscópicos contenidos dentro de las células que producen los pigmentos de melanina. Los eumelanosomas son alargados (como salchichas) y producen colores negros y grises, mientras que los feomelanosomas son esféricos y producen tonos rojizos, anaranjados y amarillentos. Estas estructuras se preservan como moldes fósiles que mantienen su forma original durante millones de años. Li y sus colegas compararon estadísticamente la forma y densidad de los melanosomas fósiles con una base de datos de melanosomas de más de 100 especies de aves modernas para determinar los colores correspondientes.',
      'El estudio de Anchiornis utilizó 29 muestras tomadas de diferentes partes del cuerpo del fósil y analizó la forma, el tamaño y la densidad de distribución de los melanosomas en cada una. Los resultados mostraron que las plumas de la cresta contenían exclusivamente feomelanosomas (color rojizo), las plumas del cuerpo contenían eumelanosomas densamente empaquetados (negro/gris oscuro), y las plumas de las alas contenían zonas sin melanosomas (blancas) alternadas con zonas de eumelanosomas (negras). La precisión del método permite determinar el color con un nivel de confianza estadística del 90% según las comparaciones con aves actuales.',
      'Tras el estudio de Anchiornis, se han reconstruido los colores de más de una docena de dinosaurios y aves primitivas. Sinosauropteryx tenía bandas alternas rojizas y blancas en la cola (Zhang et al., 2010). Microraptor era negro iridiscente (Li et al., 2012). El ave primitiva Eosinopteryx tenía un plumaje pardo uniforme sin patrones distintivos (Godefroit et al., 2013). Borealopelta, un nodosaurio del Cretácico de Alberta, Canadá, mostraba un patrón de contrasombreado (oscuro arriba, claro abajo), el mismo camuflaje que usan muchos animales actuales, sugiriendo que este dinosaurio blindado era presa de depredadores más grandes.',
      'Los colores de los dinosaurios no solo responden a preguntas estéticas sino que proporcionan información sobre el comportamiento, la ecología y las presiones de selección de estos animales. El contrasombreado de Borealopelta indica que, a pesar de su blindaje, vivía bajo amenaza de depredadores. La iridiscencia de Microraptor sugiere un sistema de selección sexual basado en señales visuales. Las bandas de Sinosauropteryx podrían haber funcionado como camuflaje disruptivo en ambientes con vegetación mezclada. Cada patrón de coloración cuenta una historia sobre cómo vivía el animal y cómo interactuaba con su entorno hace más de cien millones de años.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Jakob Vinther, uno de los investigadores clave en la paleocolorimetría, descubrió la técnica casi por accidente. En 2008, mientras estudiaba un calamar fósil del Jurásico, notó que las estructuras que otros investigadores habían identificado como bacterias fosilizadas en plumas fósiles eran en realidad melanosomas. Este error de identificación había persistido durante décadas en la literatura paleontológica. Una vez corregida la interpretación, se abrió la posibilidad de usar los melanosomas como indicadores de color en cualquier fósil que los preservara.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los colores estructurales (iridiscencia, azules, verdes) se producen por la interacción de la luz con nanoestructuras en las plumas, no por pigmentos químicos. En 2015, un estudio de Chad Eliason publicado en el Journal of the Royal Society Interface demostró que estas nanoestructuras, compuestas por capas ordenadas de melanosomas y queratina, también se preservan en fósiles. El espaciado entre las capas determina el color reflejado, siguiendo las leyes de la interferencia de película delgada, el mismo principio que produce los colores en las burbujas de jabón y las manchas de aceite.' },
    ],
    fact: 'Borealopelta markmitchelli, un nodosaurio del Cretácico de Alberta (Canadá), es el dinosaurio con la mejor preservación de color jamás encontrada. Descubierto en 2011 por el operador de maquinaria pesada Shawn Funk en una mina de arenas bituminosas, el fósil conserva la piel, la armadura ósea y los pigmentos en su posición tridimensional original. Un estudio de 2017 publicado en Current Biology por Caleb Brown y colaboradores del Museo Real Tyrrell analizó compuestos orgánicos de la piel y determinó que tenía la espalda rojiza-marrón y el vientre claro, un patrón de contrasombreado que sugiere que era presa de terópodos grandes a pesar de pesar 1,300 kilogramos.',
  },
  {
    id: 'aves-dinosaurios-vivos',
    title: 'Aves: Dinosaurios Vivos',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/infographic_m8/btn_aves-dinosaurios-vivos.jpg',
    image: '/assets/dinosaurios/infographic_m8/hero_aves-dinosaurios-vivos.jpg',
    content: [
      'Hoy existen más de 10,800 especies de aves descritas, distribuidas en todos los continentes, desde los pingüinos emperador que soportan temperaturas de -60°C en la Antártida hasta los colibríes que habitan selvas tropicales a nivel del mar. Cada una de estas especies es, en términos taxonómicos estrictos, un dinosaurio. No desciende "de los dinosaurios" como si fuera algo separado: las aves SON dinosaurios terópodos, del mismo modo que los humanos son mamíferos. La clasificación filogenética (cladística) establece que un grupo biológico incluye al ancestro común y a todos sus descendientes, lo que significa que los dinosaurios no se extinguieron hace 66 millones de años. Se extinguieron los dinosaurios no aviares.',
      'La revolución científica que estableció esta relación comenzó con John Ostrom de la Universidad de Yale. En 1969, Ostrom describió Deinonychus antirrhopus y notó similitudes anatómicas detalladas con Archaeopteryx. En 1976 publicó su artículo "Archaeopteryx and the Origin of Birds", donde presentó una lista de más de 20 características compartidas entre los terópodos y las aves, incluyendo la fúrcula (hueso de la suerte), los huesos huecos con sacos aéreos, las piernas digitígradas y la postura bípeda. Antes de Ostrom, la teoría predominante desde la década de 1920 conectaba a las aves con los arcosaurios primitivos, saltándose a los dinosaurios por completo.',
      'La evidencia molecular confirma la relación dinosaurios-aves de forma independiente. En 2008, Mary Schweitzer de la Universidad Estatal de Carolina del Norte publicó en Science la extracción de secuencias de colágeno del fémur de un Tyrannosaurus rex de 68 millones de años. La comparación de estas secuencias proteicas con las de animales vivos mostró que el pariente más cercano del T. rex entre los organismos actuales es la gallina (Gallus gallus), seguida por el avestruz (Struthio camelus). Este resultado fue replicado en 2009 con proteínas extraídas de un Brachylophosaurus (un hadrosaurio), confirmando que las aves son los dinosaurios vivos más directamente relacionados.',
      'Las aves retienen múltiples características heredadas de sus ancestros dinosaurios que se pueden observar directamente. Las escamas en sus patas son homólogas a las escamas de los dinosaurios. Sus huesos son huecos y conectados a un sistema de sacos aéreos que mejora la eficiencia respiratoria, idéntico al sistema inferido en terópodos como Aerosteon (descrito por Sereno en 2008). Muchas aves, como las grullas y los casuarios, son bípedas con una postura erguida similar a la de los terópodos. El hoatzin (Opisthocomus hoazin) de Sudamérica tiene garras funcionales en las alas durante su etapa juvenil, un rasgo que recuerda directamente a Archaeopteryx.',
      'La diversificación de las aves modernas ocurrió principalmente después de la extinción masiva del Cretácico-Paleógeno. Un estudio filogenómico de 2014 publicado en Science por Jarvis y colaboradores, basado en los genomas completos de 48 especies de aves, determinó que la mayoría de los órdenes de aves actuales se originaron en un período de diversificación acelerada entre 66 y 50 millones de años atrás. Los neoaves (que incluyen al 95% de las especies de aves modernas) se diversificaron para ocupar los nichos ecológicos dejados vacantes por los dinosaurios no aviares, los pterosaurios y las aves dentadas que se extinguieron. En menos de 15 millones de años, las aves evolucionaron formas tan diversas como los búhos, los loros, los flamencos, los pelícanos y las rapaces.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El avestruz (Struthio camelus) es el ave viva más grande, con un peso de hasta 156 kilogramos y una altura de 2.7 metros. Sus huevos pesan 1.4 kilogramos cada uno (equivalente a 24 huevos de gallina). A pesar de no volar, el avestruz puede correr a 72 kilómetros por hora sostenidos, lo que lo convierte en el animal bípedo más rápido del planeta. Su velocidad y anatomía recuerdan a la de los ornitomimosaurios del Cretácico, dinosaurios terópodos corredores que convergieron en forma corporal con las avestruces modernas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 2015, Bhart-Anjan Bhullar y Arhat Abzhanov, de las universidades de Yale y Harvard respectivamente, manipularon genes en embriones de pollo para revertir el pico a una configuración de hocico similar a la de los dinosaurios ancestrales. Modificando las proteínas de señalización FGF y WNT en la región facial, obtuvieron embriones con un palatino y un premaxilar sin fusionar, similares a los de Velociraptor. El experimento no buscaba crear un "pollosaurio" sino comprender los mecanismos genéticos que transformaron el hocico de dinosaurio en el pico de ave.' },
    ],
    fact: 'El aves del paraíso soberbia (Lophorina superba) de Nueva Guinea posee las plumas más negras conocidas en la naturaleza. Un estudio de 2018 publicado en Nature Communications por Dakota McCoy demostró que estas plumas absorben el 99.95% de la luz incidente, comparable al material artificial Vantablack (99.965%). La estructura que produce esta negrura extrema no es un pigmento sino una microestructura de barbas modificadas que atrapa la luz mediante múltiples reflexiones internas, como un bosque microscópico de espinas. Esta adaptación potencia el contraste de las manchas de color brillante durante los rituales de cortejo, un ejemplo actual de la selección sexual que ya operaba en los dinosaurios emplumados del Cretácico.',
  },
];

// ─── Prehistoric Particle Field (Canvas Background) ──────────────────────────
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

// ─── Feathered Dino Header ───────────────────────────────────────────────────
function FeatheredDinoHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Evolutionary arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#dinoGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 evolutionary markers */}
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
        {/* Central feather icon */}
        <path d="M300 38 Q298 28 294 22 Q298 25 300 18 Q302 25 306 22 Q302 28 300 38" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" strokeLinejoin="round" />
        <line x1="300" y1="38" x2="300" y2="18" stroke="#5D8A68" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="dinoGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(93,138,104,0.9)" />
            <stop offset="100%" stopColor="rgba(93,138,104,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5D8A68" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">PLUMAS Y AVES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(93,138,104,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL ORIGEN DE LAS AVES DESDE LOS DINOSAURIOS</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ─────────────────────────────
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
          layoutId="activeDotDinosM8"
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

// ─── Expandable Section with Random Direction ────────────────────────────────
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

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* Video Section */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
            ))}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
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

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_DinosM8() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/dinosaurios/dinos_m8_bg.png)',
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

      <FeatheredDinoHeader />

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
              🏆 ¡Has dominado los secretos de las Plumas y el Origen de las Aves!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Navegante del Cretácico
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
