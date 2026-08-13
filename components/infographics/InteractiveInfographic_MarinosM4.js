'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoMosasaurSkull({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Elongated skull outline */}
      <ellipse cx="30" cy="28" rx="22" ry="12" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="28" rx="15" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Eye socket */}
      <circle cx="22" cy="25" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="22" cy="25" r="1.5" fill={color} opacity="0.4" />
      {/* Jaw line */}
      <path d="M8 28 Q15 38 30 40 Q45 38 52 28" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Teeth marks */}
      {[12, 18, 24, 30, 36, 42, 48].map((x, i) => (
        <line key={i} x1={x} y1="34" x2={x} y2="38" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function DecoOceanWave({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.22, ...style }}>
      {/* Layered wave forms */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28" fill="none" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M10 14 Q18 8 26 14" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Bubbles */}
      <circle cx="58" cy="12" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="62" cy="8" r="1.2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="12" cy="36" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoTailFluke({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Crescent-shaped tail fluke */}
      <path d="M15 30 Q30 10 45 18 Q38 28 45 42 Q30 50 15 30Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Central vertebra line */}
      <line x1="15" y1="30" x2="45" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Fin rays */}
      {[20, 25, 30, 35, 40].map((x, i) => (
        <line key={i} x1={x} y1="22" x2={x} y2="38" stroke={color} strokeWidth="0.8" opacity="0.3" />
      ))}
      {/* Motion streaks */}
      <path d="M8 25 L12 27" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M8 35 L12 33" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function DecoAmmonite({ size = 60, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Spiral shell */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1.3" opacity="0.6" />
      <circle cx="30" cy="30" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.5" />
      {/* Septum lines */}
      <line x1="30" y1="8" x2="30" y2="14" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="52" y1="30" x2="46" y2="30" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="52" x2="30" y2="46" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="8" y1="30" x2="14" y2="30" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoFossil({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Rock outline */}
      <path d="M10 40 Q8 30 15 20 Q22 12 32 10 Q42 9 50 18 Q55 28 52 40 Q48 48 38 50 Q28 52 18 48 Q12 45 10 40Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Embedded bone fragments */}
      <line x1="20" y1="25" x2="35" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="25" y1="32" x2="40" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <circle cx="18" cy="35" r="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Texture marks */}
      <circle cx="42" cy="38" r="1" fill={color} opacity="0.3" />
      <circle cx="30" cy="42" r="1.5" fill={color} opacity="0.25" />
    </svg>
  );
}

function DecoVertebra({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Spine vertebrae chain */}
      {[12, 26, 40, 54, 68].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="20" r="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <circle cx={x} cy="20" r="2" fill={color} opacity="0.3" />
          {/* Neural spine */}
          <line x1={x} y1="15" x2={x} y2="8" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
          {/* Transverse process */}
          <line x1={x - 4} y1="20" x2={x - 7} y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
          <line x1={x + 4} y1="20" x2={x + 7} y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
        </g>
      ))}
      {/* Connecting line */}
      <line x1="12" y1="20" x2="68" y2="20" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'origenes-varanidos': [DecoMosasaurSkull, DecoFossil, DecoAmmonite],
  'tylosaurus-apex': [DecoTailFluke, DecoOceanWave, DecoMosasaurSkull],
  'mosasaurus-rey': [DecoMosasaurSkull, DecoVertebra, DecoTailFluke],
  'anatomia-monstruo': [DecoVertebra, DecoTailFluke, DecoMosasaurSkull],
  'diversidad-global': [DecoAmmonite, DecoFossil, DecoOceanWave],
  'mosasaurios-cine': [DecoOceanWave, DecoMosasaurSkull, DecoTailFluke],
  'apogeo-extincion': [DecoFossil, DecoAmmonite, DecoVertebra],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Russell, D. A. (1967). Systematics and Morphology of American Mosasaurs. Bulletin of the Peabody Museum of Natural History, Yale University, 23',
  'Lindgren, J., Caldwell, M. W., Konishi, T. & Chiappe, L. M. (2010). Convergent Evolution in Aquatic Tetrapods: Insights from an Exceptional Fossil Mosasaur. PLOS ONE, 5(8), e11998',
  'Polcyn, M. J., Jacobs, L. L., Araújo, R., Schulp, A. S. & Mateus, O. (2014). Physical drivers of mosasaur evolution. Palaeogeography, Palaeoclimatology, Palaeoecology, 400, 17–27',
  'Konishi, T., Brinkman, D., Massare, J. A. & Caldwell, M. W. (2015). Upper Cretaceous marine reptiles from the Western Interior Seaway. Canadian Journal of Earth Sciences, 52(5), 374–381',
  'Everhart, M. J. (2005). Oceans of Kansas: A Natural History of the Western Interior Sea. Indiana University Press',
  'Street, H. P. & Caldwell, M. W. (2017). Rediagnosis and redescription of Mosasaurus hoffmannii and an assessment of species assigned to Mosasaurus. Geological Magazine, 154(3), 521–557',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'origenes-varanidos',
    title: 'Los Lagartos que Conquistaron el Océano',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/infographic_m4/btn_origenes-varanidos.jpg',
    image: '/assets/reptiles_marinos/infographic_m4/hero_origenes-varanidos.jpg',
    content: [
      'Los mosasaurios no surgieron del mar sino de la tierra. Pertenecen al orden Squamata, el mismo grupo que incluye a los lagartos y las serpientes actuales. Estudios anatómicos y genéticos confirman que sus parientes vivos más cercanos son los varanos (familia Varanidae), como el dragón de Komodo y el varano acuático de Bengala. La transición de la vida terrestre a la marina ocurrió durante el Cretácico Superior, hace aproximadamente 98 millones de años, cuando un linaje de lagartos varánidos comenzó a explotar los recursos alimenticios costeros y, generación tras generación, desarrolló adaptaciones para la vida acuática.',
      'El primer fósil de mosasaurio reconocido por la ciencia fue descubierto en 1764 en las canteras de caliza de la montaña de San Pedro, cerca de Maastricht, en los Países Bajos. El cráneo fue encontrado por trabajadores de la cantera y pasó a manos del canónigo Theodorus Joannes Godding. El naturalista holandés Petrus Camper lo describió inicialmente como un pez gigante, pero su colega Adriaan Gilles Camper lo reidentificó correctamente como un reptil marino en 1799. Este espécimen, llamado Mosasaurus hoffmannii en honor al cirujano Johann Leonard Hoffmann, se convirtió en el holotipo del género.',
      'La historia de este fósil tiene un giro notable: durante las Guerras Napoleónicas, las tropas francesas capturaron Maastricht en 1795 y confiscaron el cráneo como botín de guerra. Según la tradición, lo intercambiaron por 600 botellas de vino. El fósil terminó en el Muséum National d\'Histoire Naturelle de París, donde permanece hasta hoy. Este evento convirtió al Mosasaurus en uno de los primeros reptiles extintos reconocidos formalmente, antes incluso de que Richard Owen acuñara el término "dinosaurio" en 1842.',
      'El nombre Mosasaurus significa "lagarto del río Mosa" (Mosa es el nombre latino del río Mosa que fluye por Maastricht). Los mosasaurios compartían el Cretácico tardío con otros reptiles marinos como los plesiosaurios, pero no estaban emparentados con ellos. Los plesiosaurios pertenecen a un linaje diferente (Sauropterygia) que se separó de los lagartos hace más de 250 millones de años. Esta distinción es relevante porque demuestra que la vida marina fue colonizada de forma independiente por múltiples grupos de reptiles.',
      'La transformación de lagarto terrestre a depredador oceánico implicó cambios anatómicos profundos que se desarrollaron a lo largo de millones de años. Las extremidades se aplanaron y acortaron para convertirse en aletas natatorias. La cola se alargó y desarrolló una aleta vertical. El cráneo se alargó para capturar presas escurridizas bajo el agua. Y la mandíbula desarrolló una articulación flexible que les permitía tragar presas de gran tamaño. Fósiles transicionales como Dallasaurus turneri, descubierto en Texas en 2005, muestran extremidades todavía funcionales para caminar, documentando los pasos intermedios de esta transición.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Aigialosaurus, descubierto en la isla de Hvar (Croacia) en 1854, es uno de los mosasaurios más primitivos conocidos. Medía apenas un metro de largo y conservaba extremidades bien desarrolladas con dedos diferenciados, capaces de soportar su peso en tierra. Los paleontólogos lo consideran una "forma transicional" entre los lagartos terrestres y los gigantes marinos que dominarían los océanos millones de años después.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de Bell y Polcyn (2005) demostró mediante análisis filogenético que los mosasaurios están más emparentados con las serpientes que con cualquier otro grupo de lagartos. Ambos comparten una mandíbula con articulación intracraneana (la capacidad de mover los huesos del paladar de forma independiente), lo que sugiere un ancestro común. Esta relación serpiente-mosasaurio sigue siendo debatida, pero el registro fósil aporta cada vez más evidencia a su favor.' },
    ],
    fact: 'El término "dinosaurio" fue creado por Richard Owen en 1842, pero el Mosasaurus hoffmannii fue descrito formalmente en 1829 por Gideon Mantell, basándose en el cráneo de Maastricht. Esto significa que los mosasaurios fueron reconocidos como reptiles gigantes extintos trece años ANTES de que existiera la palabra "dinosaurio". Los mosasaurios, sin embargo, no son dinosaurios: son lagartos escamosos (Squamata) que evolucionaron de forma paralela para ocupar el nicho de superdepredadores marinos durante los últimos 25 millones de años del Cretácico.',
  },
  {
    id: 'tylosaurus-apex',
    title: 'Tylosaurus: El Depredador Apex',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/infographic_m4/btn_tylosaurus-apex.jpg',
    image: '/assets/reptiles_marinos/infographic_m4/hero_tylosaurus-apex.jpg',
    content: [
      'Tylosaurus proriger es uno de los mosasaurios más grandes y mejor documentados del registro fósil. Alcanzaba longitudes de hasta 13 metros y fue el depredador dominante del Western Interior Seaway, un mar epicontinental que dividía América del Norte en dos masas terrestres durante el Cretácico Superior (entre 85 y 75 millones de años atrás). Este mar interior se extendía desde el actual Golfo de México hasta el Océano Ártico, con profundidades de hasta 800 metros y una anchura máxima de 1,600 kilómetros.',
      'El contenido estomacal fosilizado de especímenes de Tylosaurus ha proporcionado evidencia directa de su dieta. El paleontólogo Michael Everhart documentó en 2005 un espécimen del Museo Sternberg de Kansas que conservaba restos de un tiburón Squalicorax, un pez óseo Ichthyodectes, otro mosasaurio más pequeño (Clidastes) y un ave marina Hesperornis dentro de su cavidad abdominal. Este hallazgo demostró que Tylosaurus era un depredador oportunista que se alimentaba de prácticamente cualquier animal que pudiera capturar, incluyendo otros mosasaurios.',
      'La anatomía del Tylosaurus estaba optimizada para la velocidad y la potencia. Su hocico terminaba en una estructura ósea maciza y redondeada, sin dientes en el premaxilar, que probablemente se utilizaba para embestir a las presas o competidores. Estudios biomecánicos de Lindgren et al. (2011) calcularon que podía alcanzar velocidades de nado de hasta 40 km/h en arranques cortos, comparable a un delfín moderno. Su cuerpo era fusiforme (en forma de huso), lo que reducía la resistencia al agua.',
      'Los fósiles de Tylosaurus se concentran en los estados de Kansas, Dakota del Sur y Alabama en Estados Unidos, todos ellos parte del antiguo Western Interior Seaway. Las formaciones geológicas de Niobrara Chalk y Pierre Shale han producido centenares de especímenes. El Museo de Historia Natural Sternberg en Hays, Kansas, alberga uno de los esqueletos más completos jamás encontrados, con un 85% de los huesos originales preservados, incluyendo impresiones de piel que muestran escamas romboidales similares a las de un varano.',
      'Tylosaurus competía por su nicho ecológico con otros grandes mosasaurios como Platecarpus y Clidastes, además de tiburones como Cretoxyrhina mantelli (que alcanzaba 7 metros de largo). La coexistencia de múltiples depredadores de gran tamaño indica que el Western Interior Seaway era un ecosistema de alta productividad biológica, sostenido por corrientes de afloramiento que traían nutrientes desde las profundidades. Los fósiles de ammonites, peces y bivalvos abundantes en estas mismas formaciones confirman la riqueza del hábitat.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 1918, el paleontólogo Charles H. Sternberg descubrió un esqueleto de Tylosaurus en el condado de Logan, Kansas, con algo único: dentro de su cavidad torácica había restos de un plesiosaurio joven. Esto constituyó la primera evidencia fósil de un mosasaurio alimentándose de plesiosaurios, confirmando que los mosasaurios eran los depredadores supremos del Cretácico tardío, capaces de dominar incluso a otros grandes reptiles marinos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La estructura rostral (hocico) del Tylosaurus carece de dientes en su porción más anterior, a diferencia de otros mosasaurios. El paleontólogo Michael Caldwell (2007) propuso que esta estructura densa y redondeada funcionaba como un ariete: el animal embestía a sus presas a alta velocidad para aturdirlas antes de morderlas. Marcas de impacto y remodelación ósea en varios fósiles de Tylosaurus apoyan esta hipótesis de caza por embestida.' },
    ],
    fact: 'El Western Interior Seaway donde vivió Tylosaurus se formó cuando los niveles del mar subieron hasta 300 metros por encima de los actuales durante el Cretácico, inundando el centro de América del Norte. Kansas, que hoy está a 450 metros sobre el nivel del mar y es famoso por sus campos de trigo, estaba cubierto por un mar tropical habitado por tiburones de 7 metros, tortugas marinas de 4 metros, peces con dientes como sables y mosasaurios de 13 metros. Se han encontrado más de 3,000 especímenes de reptiles marinos solo en las formaciones de Kansas.',
  },
  {
    id: 'mosasaurus-rey',
    title: 'Mosasaurus: El Rey del Cretácico',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/infographic_m4/btn_mosasaurus-rey.jpg',
    image: '/assets/reptiles_marinos/infographic_m4/hero_mosasaurus-rey.jpg',
    content: [
      'Mosasaurus hoffmannii fue uno de los mosasaurios más grandes que existieron, con estimaciones de longitud que varían entre 13 y 17 metros según el estudio. Un análisis de Street y Caldwell (2017) publicado en Geological Magazine reexaminó el material tipo y concluyó que los ejemplares más grandes alcanzaban al menos 13 metros de longitud confirmada, con extrapolaciones que sugieren hasta 17 metros para individuos excepcionales. Esto lo coloca entre los depredadores marinos más grandes del Mesozoico, comparable en tamaño a una ballena jorobada actual.',
      'La fuerza de mordida del Mosasaurus era la más potente entre todos los reptiles marinos conocidos. Un estudio de Lingham-Soliar (1995) estimó una fuerza de cierre mandibular de aproximadamente 13,000 a 16,000 newtons, suficiente para triturar conchas de ammonites y caparazones de tortugas marinas. Sus dientes eran cónicos, robustos y curvados hacia atrás, diseñados no para cortar sino para agarrar y sujetar presas resbaladizas. Poseía dos filas funcionales de dientes en el paladar (dientes pterigoideos) que ayudaban a empujar el alimento hacia la garganta.',
      'Una característica notable del Mosasaurus era su probable capacidad de visión binocular parcial. El posicionamiento frontal de sus ojos, más convergente que el de otros mosasaurios, le proporcionaba un campo de visión tridimensional que mejoraba la percepción de la distancia, una ventaja crítica para un depredador que cazaba en aguas con visibilidad variable. Esta adaptación es paralela a la de las orcas modernas, otro superdepredador marino con campos visuales parcialmente superpuestos.',
      'Mosasaurus habitaba aguas costeras y pelágicas del Océano Atlántico Norte durante el Maastrichtiense (72-66 millones de años atrás), el último piso geológico del Cretácico. Sus fósiles se han encontrado en los Países Bajos, Bélgica, Estados Unidos (Nueva Jersey, Alabama, Mississippi), Marruecos, Turquía y Jordania. La distribución de fósiles en ambos lados del Atlántico indica que este animal cruzaba regularmente el océano, posiblemente siguiendo las migraciones de sus presas, de manera similar a como lo hacen los grandes tiburones blancos en la actualidad.',
      'Los fósiles marroquíes de la región de Khouribga han sido particularmente productivos para el estudio del Mosasaurus. Las minas de fosfato del norte de África han producido miles de dientes, mandíbulas y cráneos parciales, convirtiendo a Marruecos en una de las localidades fósiles más ricas del mundo para mosasaurios del Maastrichtiense. Los paleontólogos Nathalie Bardet y Xabier Pereda-Suberbiola han documentado al menos cinco géneros distintos de mosasaurios en estas formaciones, demostrando que múltiples especies coexistían en los mismos ecosistemas marinos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los dientes pterigoideos del Mosasaurus (ubicados en el paladar, detrás de los dientes principales) funcionaban como un "segundo juego de mandíbulas" interno. Cuando el animal atrapaba una presa, los dientes pterigoideos la empujaban hacia la garganta con un movimiento de vaivén, impidiendo que escapara. Las serpientes actuales utilizan un mecanismo casi idéntico, lo que refuerza la hipótesis de parentesco evolutivo entre mosasaurios y serpientes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un análisis isotópico de oxígeno realizado por Harrell et al. (2016) en dientes de Mosasaurus demostró que estos animales eran endotérmicos regionales: mantenían una temperatura corporal 5-12°C por encima de la del agua circundante. Esto les proporcionaba una ventaja metabólica para nadar más rápido y durante más tiempo que competidores de sangre fría, similar a lo que hacen hoy los atunes y ciertos tiburones como el tiburón blanco.' },
    ],
    fact: 'George Cuvier, considerado el fundador de la paleontología comparada, utilizó el cráneo de Mosasaurus hoffmannii en 1808 como una de sus pruebas clave de que la extinción de especies es un fenómeno real. Antes de Cuvier, la mayoría de los naturalistas creían que ninguna especie podía desaparecer permanentemente porque eso implicaría un "error" en la creación divina. El Mosasaurus fue una de las primeras evidencias irrefutables de que animales grandes y complejos habían existido y desaparecido para siempre.',
  },
  {
    id: 'anatomia-monstruo',
    title: 'Anatomía de un Monstruo Marino',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/infographic_m4/btn_anatomia-monstruo.jpg',
    image: '/assets/reptiles_marinos/infographic_m4/hero_anatomia-monstruo.jpg',
    content: [
      'La mandíbula de los mosasaurios poseía una articulación intracraneana que les permitía expandir lateralmente la boca, similar al mecanismo de las serpientes modernas. Esta "doble bisagra" mandibular consistía en una articulación flexible en el centro de cada hemimandíbula (la articulación intramandibular) que permitía que la parte posterior de la mandíbula se abriera independientemente de la parte anterior. El resultado era la capacidad de tragar presas de diámetro considerable sin necesidad de desmembrarlas, una adaptación clave para alimentarse de peces grandes y cefalópodos.',
      'En 2010, Johan Lindgren y su equipo publicaron en PLOS ONE un descubrimiento que transformó nuestra comprensión de la locomoción de los mosasaurios: un espécimen de Prognathodon de Harrana (Jordania) que conservaba impresiones de tejidos blandos alrededor de la cola. Estas impresiones revelaron una aleta caudal en forma de media luna (semilunar), similar a la de los tiburones y los ictiosaurios, en lugar de la cola aplanada como una anguila que se suponía anteriormente. Este descubrimiento demostró que los mosasaurios tardíos eran nadadores activos y veloces, no reptiles lentos que ondulaban como serpientes marinas.',
      'La piel de los mosasaurios no era lisa sino que estaba cubierta de escamas romboidales similares a las de las serpientes y los varanos. Fósiles excepcionales de la formación Smoky Hill Chalk de Kansas preservan impresiones de piel que muestran escamas pequeñas y solapadas de entre 2 y 5 milímetros, dispuestas en filas diagonales. Lindgren et al. (2014) analizaron la melanina fosilizada en estas escamas y determinaron que los mosasaurios presentaban un patrón de contratonalidad: dorso oscuro y vientre claro, el mismo camuflaje que utilizan hoy tiburones, delfines y pingüinos.',
      'El sistema respiratorio de los mosasaurios los obligaba a respirar en la superficie, como las ballenas y las tortugas marinas actuales. Sus narinas (orificios nasales) estaban ubicadas en la parte superior del cráneo, lo que les permitía respirar con un esfuerzo mínimo sin sacar toda la cabeza del agua. Se estima que podían contener la respiración durante 15-20 minutos, basándose en comparaciones con reptiles marinos modernos como las iguanas marinas de Galápagos y los cocodrilos de agua salada.',
      'Las extremidades de los mosasaurios evolucionaron de patas funcionales para caminar a aletas compactas de natación. En las formas más avanzadas como Plotosaurus, los huesos de las aletas se habían acortado y aplanado, con hiperfalangia (dedos con segmentos extra). Las aletas anteriores eran más grandes que las posteriores y se utilizaban principalmente para el control de dirección y la estabilización, mientras que la propulsión la generaba la cola musculosa y su aleta semilunar. Este patrón funcional es análogo al de los delfines modernos, un caso notable de convergencia evolutiva entre mamíferos y reptiles.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las esclerales óseas (anillos de hueso dentro del ojo) de los mosasaurios eran muy grandes, lo que indica ojos de gran tamaño adaptados a la visión en condiciones de baja luminosidad. El diámetro del anillo escleral en Tylosaurus alcanzaba los 10 centímetros, sugiriendo un ojo del tamaño de un pomelo. Esto les permitía cazar en aguas profundas y turbias donde otros depredadores no podían ver, ampliando su rango de caza a diferentes profundidades y horarios.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Lindgren et al. (2014) utilizaron espectrometría de masas de iones secundarios de tiempo de vuelo (ToF-SIMS) para identificar eumelanina y feomelanina fosilizada en las escamas de un mosasaurio de Kansas. Los resultados mostraron que el dorso contenía eumelanina densa (pigmento oscuro) mientras que el vientre carecía de ella. Este análisis químico directo de pigmentos de 85 millones de años es una de las pruebas más sólidas de coloración en animales fósiles jamás obtenida.' },
    ],
    fact: 'La convergencia evolutiva entre mosasaurios y delfines es uno de los ejemplos más estudiados en biología evolutiva. Ambos grupos partieron de ancestros terrestres cuadrúpedos, desarrollaron cuerpos fusiformes, convirtieron las patas en aletas, evolucionaron aletas caudales para propulsión, mantuvieron la respiración aérea, y se convirtieron en depredadores activos de alta velocidad. Esta transformación tomó aproximadamente 50 millones de años en los cetáceos (de Pakicetus al delfín moderno) y solo 25 millones de años en los mosasaurios (de Aigialosaurus a Mosasaurus), lo que sugiere que la presión selectiva del medio marino impulsa patrones evolutivos predecibles.',
  },
  {
    id: 'diversidad-global',
    title: 'Diversidad Global',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/infographic_m4/btn_diversidad-global.jpg',
    image: '/assets/reptiles_marinos/infographic_m4/hero_diversidad-global.jpg',
    content: [
      'La familia Mosasauridae incluye más de 40 especies distribuidas en al menos 20 géneros confirmados, con nuevas especies describiéndose regularmente. Esta diversidad refleja una radiación evolutiva que ocurrió en un periodo relativamente corto de tiempo geológico: desde los primeros mosasaurios primitivos hace 98 millones de años hasta su extinción hace 66 millones de años, la familia se diversificó en formas de todos los tamaños y estrategias alimentarias, ocupando nichos ecológicos equivalentes a los que hoy llenan delfines, orcas, focas, nutrias marinas e incluso tortugas marinas.',
      'Prognathodon saturator, descubierto en los Países Bajos y descrito por Dortangs et al. en 2002, fue uno de los mosasaurios más masivos y robustos. Con un cráneo de más de 1.2 metros de largo y dientes gruesos y redondeados, estaba especializado en triturar presas de caparazón duro como tortugas marinas y grandes ammonites. Su mandíbula mostraba una musculatura reforzada que indica una mordida de aplastamiento, en contraste con los dientes afilados de depredadores como Tylosaurus que estaban diseñados para perforar y sujetar.',
      'Globidens alabamaensis representa una especialización alimentaria única entre los mosasaurios. Sus dientes eran esféricos y bulbosos, muy distintos de los dientes cónicos típicos del grupo. Esta dentición estaba adaptada para triturar las conchas de bivalvos, gasterópodos y crustáceos, ocupando un nicho ecológico similar al de las rayas actuales que se alimentan de moluscos en el fondo marino. Globidens medía entre 3 y 6 metros de largo y sus fósiles se han encontrado en Alabama, Mississippi, Brasil, Marruecos, Angola y Nueva Zelanda.',
      'Plotosaurus bennisoni, descubierto en California en 1937, representa el pináculo de la adaptación acuática en los mosasaurios. Sus aletas eran las más aerodinámicas del grupo, con huesos extremadamente comprimidos y piel lisa. Su cola poseía la aleta semilunar más desarrollada conocida entre los mosasaurios. Los cálculos biomecánicos de Lindgren et al. (2007) sugieren que Plotosaurus era el nadador más rápido del grupo, potencialmente capaz de alcanzar velocidades sostenidas de 30-35 km/h, comparable a un delfín nariz de botella moderno.',
      'La distribución geográfica de los mosasaurios abarca todos los continentes, incluida la Antártida. En 2010, se descubrieron restos de mosasaurios en la Isla James Ross de la Antártida, demostrando que estos animales habitaban incluso los mares polares del Cretácico, cuando las temperaturas globales eran significativamente más altas que hoy. Los mosasaurios también se han encontrado en formaciones geológicas de Japón, Australia, Medio Oriente, África occidental, Madagascar y Sudamérica, confirmando su distribución planetaria y su capacidad para habitar tanto mares tropicales como templados.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Thalassotitan atrox, descrito por Longrich et al. en 2022 a partir de fósiles hallados en Marruecos, fue un mosasaurio con un cráneo corto y ancho de 1.4 metros de largo, dientes romos y desgastados, y una mordida similar a la de una orca. Junto a sus restos se encontraron huesos ácidos y corroídos de otros mosasaurios, plesiosaurios y tortugas. Los investigadores concluyeron que Thalassotitan era un hiperdepredador que se alimentaba regularmente de otros grandes reptiles marinos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un análisis de Polcyn et al. (2014) demostró que la diversificación de los mosasaurios se correlacionó directamente con los niveles del mar durante el Cretácico Superior. Cuando los mares subieron, la plataforma continental sumergida creó nuevos hábitats costeros, y la diversidad de mosasaurios aumentó. Cuando los niveles bajaron, la diversidad disminuyó. Esta correlación sugiere que los mosasaurios dependían de ecosistemas costeros productivos, no de los océanos profundos.' },
    ],
    fact: 'Hainosaurus bernardi, descubierto en Bélgica en 1885, fue durante mucho tiempo considerado el mosasaurio más grande con estimaciones de hasta 17 metros. Sin embargo, revisiones recientes de Lindgren (2005) y Lingham-Soliar (1995) han reducido la estimación a 12-13 metros. El problema con muchas estimaciones de tamaño de mosasaurios es que se basan en especímenes fragmentarios, y los paleontólogos deben extrapolar la longitud total a partir de cráneos o vértebras individuales. Cuando se descubren esqueletos más completos, las estimaciones suelen ser más conservadoras.',
  },
  {
    id: 'mosasaurios-cine',
    title: 'Los Mosasaurios y el Cine',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/infographic_m4/btn_mosasaurios-cine.jpg',
    image: '/assets/reptiles_marinos/infographic_m4/hero_mosasaurios-cine.jpg',
    content: [
      'La aparición del Mosasaurus en Jurassic World (2015) catapultó a estos reptiles al conocimiento popular. La escena en la que un mosasaurio gigante salta desde una laguna para devorar un tiburón blanco colgado como cebo se convirtió en uno de los momentos más recordados del cine de dinosaurios. La película presentó al Mosasaurus como un animal capaz de saltar fuera del agua por entero, similar a una orca o un gran tiburón blanco, y lo mostró como una criatura de un tamaño muy superior al que indica el registro fósil verificado.',
      'El Mosasaurus de Jurassic World fue representado con un tamaño estimado entre 25 y 30 metros de largo, según los artistas de efectos visuales de Industrial Light & Magic. Esto es aproximadamente el doble del tamaño real del Mosasaurus hoffmannii más grande conocido (13-17 metros según las estimaciones más generosas). La exageración del tamaño fue una decisión cinematográfica deliberada para crear impacto visual, pero generó confusión en el público general sobre las dimensiones reales de estos animales.',
      'Desde el punto de vista anatómico, la representación cinematográfica presenta varias diferencias con el animal real. El Mosasaurus de la película tiene una cabeza proporcionalmente más grande y robusta que el animal real, cuyo cráneo era más alargado y estrecho. Las aletas de la versión fílmica son más grandes y parecidas a las de una ballena, mientras que las aletas reales eran relativamente pequeñas. La película muestra al animal con una textura de piel similar a un cocodrilo, pero los fósiles indican escamas más finas, similares a las de un varano.',
      'Sin embargo, la película acertó en varios aspectos. El Mosasaurus es presentado como un depredador supremo capaz de alimentarse de tiburones, lo cual es coherente con el registro fósil: se han encontrado contenidos estomacales de mosasaurios con restos de tiburones. La capacidad de emboscar presas desde abajo también es plausible, ya que su coloración dorsal oscura y ventral clara sugiere que cazaban ascendiendo desde las profundidades. La película también muestra correctamente que el animal necesitaba respirar en la superficie.',
      'El impacto cultural de esta representación fue significativo. Tras el estreno de Jurassic World, el interés público en los mosasaurios aumentó de forma medible: las búsquedas de "mosasaurus" en Google se multiplicaron por 50 durante la primera semana de estreno. Varios museos de historia natural reportaron un aumento en las visitas a sus exhibiciones de reptiles marinos. La paleontóloga Hallie Street señaló que la película, pese a sus inexactitudes, cumplió una función divulgativa al presentar a un grupo de reptiles marinos que había permanecido en la sombra de los dinosaurios terrestres durante décadas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En Jurassic World: Fallen Kingdom (2018), el Mosasaurus escapa de la laguna del parque abandonado cuando los mercenarios abren las compuertas para recuperar huesos del Indominus Rex. El animal es mostrado nadando en el océano abierto y atacando surfistas. En la vida real, un depredador de ese tamaño necesitaría consumir entre 40 y 100 kilogramos de alimento al día (basado en estimaciones metabólicas de reptiles marinos grandes), por lo que tendría dificultades para encontrar suficiente alimento en océanos modernos con menor biodiversidad que los del Cretácico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La capacidad de un mosasaurio real para saltar fuera del agua como se muestra en la película es cuestionable pero no del todo descartable. Los grandes tiburones blancos (de hasta 6 metros) pueden saltar por entero fuera del agua ("breaching") alcanzando alturas de 3 metros. Las orcas (de hasta 9 metros) también realizan saltos parciales. Un mosasaurio de 13 metros tendría la masa y la potencia muscular para saltar parcialmente, pero un salto vertical completo como el de la película requeriría una potencia fisiológicamente difícil de alcanzar para un animal de más de 5 toneladas.' },
    ],
    fact: 'El diseñador de criaturas de Jurassic World, Aaron McBride, ha declarado en entrevistas que usó una combinación de cocodrilo de agua salada, varano de Komodo y gran tiburón blanco como referencias para crear el Mosasaurus de la película. El director Colin Trevorrow decidió duplicar su tamaño real porque en las primeras versiones con tamaño preciso, el animal "no parecía lo suficientemente amenazante" junto al Indominus Rex de 12 metros. Esta decisión ilustra el conflicto frecuente entre la precisión científica y las necesidades narrativas del cine comercial.',
  },
  {
    id: 'apogeo-extincion',
    title: 'Apogeo y Extinción',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/infographic_m4/btn_apogeo-extincion.jpg',
    image: '/assets/reptiles_marinos/infographic_m4/hero_apogeo-extincion.jpg',
    content: [
      'Los mosasaurios dominaron los océanos durante los últimos 25 millones de años del período Cretácico (91-66 millones de años atrás), un período conocido como la "Edad de los Mosasaurios". Durante este intervalo, reemplazaron progresivamente a los ictiosaurios (que se extinguieron hace 93 millones de años) y a los plesiosaurios de cuello largo (cuya diversidad declinó marcadamente) como los principales depredadores marinos. En el Maastrichtiense, los últimos 6 millones de años del Cretácico, los mosasaurios habían alcanzado su máxima diversidad con al menos 20 géneros coexistentes en los océanos globales.',
      'El apogeo de los mosasaurios coincidió con uno de los niveles del mar más altos de la historia de la Tierra. Durante el Cretácico Superior, los niveles del mar estaban entre 200 y 300 metros por encima de los actuales, inundando grandes extensiones de los continentes y creando vastos mares epicontinentales poco profundos. Estos mares someros, calentados por un clima global sin casquetes polares, sustentaban cadenas alimentarias de enorme productividad. Los mosasaurios ocupaban los niveles tróficos superiores de estos ecosistemas, desempeñando un papel ecológico equivalente al de las orcas, los grandes tiburones y las focas leopardo combinados.',
      'La extinción de los mosasaurios ocurrió durante el evento de extinción masiva del Cretácico-Paleógeno (K-Pg), hace 66.04 millones de años, causado por el impacto de un asteroide de 10-12 kilómetros de diámetro en lo que hoy es la península de Yucatán, México (cráter Chicxulub). El impacto liberó una energía equivalente a 10 mil millones de bombas de Hiroshima, generando tsunamis de hasta 1,500 metros de altura en las zonas más cercanas, oscurecimiento global por el polvo y los aerosoles inyectados a la estratosfera, y un colapso de las cadenas alimentarias oceánicas que duró entre 2 y 3 millones de años.',
      'Los mosasaurios eran particularmente vulnerables al colapso ecológico del K-Pg por varias razones: como depredadores de nivel trófico superior, dependían de abundantes poblaciones de presas que a su vez dependían del fitoplancton; su metabolismo elevado (endotermia regional) requería ingestas constantes de alimento; y su estrategia reproductiva de dar a luz crías vivas en mar abierto (viviparidad confirmada por el fósil de Carsosaurus con embriones descrito por Caldwell y Lee en 2001) no les proporcionaba refugio en aguas protegidas durante el caos ambiental.',
      'Tras la extinción de los mosasaurios, sus nichos ecológicos permanecieron vacíos durante millones de años. Los primeros cetáceos (ballenas y delfines) no aparecieron hasta hace 53 millones de años y no alcanzaron tamaños comparables a los de los mosasaurios hasta hace 35 millones de años. Los tiburones modernos, que sobrevivieron al K-Pg, expandieron su diversidad parcialmente para llenar algunos nichos, pero la recuperación completa de los ecosistemas marinos con depredadores de gran tamaño tomó entre 10 y 15 millones de años. La lentitud de esta recuperación ilustra el impacto profundo que tuvo la desaparición de los mosasaurios en la estructura de los océanos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cráter de Chicxulub fue identificado en 1978 por los geofísicos Glen Penfield y Antonio Camargo mientras buscaban petróleo para PEMEX en la península de Yucatán. El cráter tiene 180 kilómetros de diámetro y está enterrado bajo 600 metros de sedimentos. La confirmación de que fue causado por un impacto de asteroide no llegó hasta 1991, cuando Hildebrand et al. publicaron la evidencia de cuarzo de impacto y vidrio fundido en las muestras de perforación del sitio.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de Bardet (2012) documentó que la diversidad de mosasaurios NO estaba en declive antes del impacto de Chicxulub. A diferencia de lo que se sostenía anteriormente, los datos muestran que los mosasaurios eran tan diversos en el Maastrichtiense final como lo habían sido millones de años antes. Esto indica que su extinción fue abrupta, no gradual, y fue causada directamente por el impacto del asteroide y sus consecuencias ambientales, no por un declive evolutivo previo.' },
    ],
    fact: 'Si los mosasaurios no se hubieran extinguido, la evolución de los cetáceos podría haber tomado un camino muy diferente. Los paleontólogos Philip Gingerich y Mark Uhen han señalado que los primeros ancestros de las ballenas (Pakicetus, hace 53 millones de años) eran animales terrestres del tamaño de un lobo que comenzaron a explotar recursos acuáticos. Si los océanos hubieran estado ya ocupados por depredadores marinos de 13 metros con 25 millones de años de ventaja evolutiva, es posible que los mamíferos nunca hubieran logrado la transición completa al medio marino. La extinción de los mosasaurios abrió una ventana ecológica que los mamíferos tardaron millones de años en aprovechar.',
  },
];

// ─── Abyssal Particle Field (Canvas Background) ────────────────────────────
function AbyssalField() {
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94', // slate blue or soft copper
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y += 0.06;
        if (p.y > h + 5) { p.y = -5; p.x = Math.random() * w; }
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

// ─── Mosasaur Header ────────────────────────────────────────────────────────
function MosasaurHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Oceanic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mosGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 depth markers */}
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
        {/* Central mosasaur silhouette icon */}
        <ellipse cx="300" cy="28" rx="16" ry="6" fill="none" stroke="#5B7B9A" strokeWidth="1.2" opacity="0.5" />
        <path d="M284 28 L278 25 L276 28 L278 31 L284 28" fill="none" stroke="#5B7B9A" strokeWidth="1" opacity="0.5" />
        <path d="M316 28 Q320 24 324 28 Q320 32 316 28" fill="#5B7B9A" opacity="0.3" />
        <circle cx="290" cy="26" r="1.5" fill="#5B7B9A" opacity="0.5" />
        <defs>
          <linearGradient id="mosGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MOSASAURIOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LOS ÚLTIMOS REYES DEL MAR</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching M9 Dendera style) ─────────────────────────
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
          layoutId="activeDotMarinosM4"
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

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
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

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MarinosM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/marinos_m4.png)',
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
      <AbyssalField />

      <MosasaurHeader />

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
              🏆 ¡Has dominado los secretos de los Mosasaurios!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Investigador de Mosasaurios
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
