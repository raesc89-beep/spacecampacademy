'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Dinosaur / Paleontology themed) ————————————————
function DecoBone({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Femur bone silhouette */}
      <ellipse cx="15" cy="12" rx="6" ry="5" fill={color} opacity="0.4" />
      <ellipse cx="10" cy="14" rx="4" ry="3.5" fill={color} opacity="0.3" />
      <rect x="13" y="14" width="6" height="30" rx="3" fill={color} opacity="0.35" />
      <ellipse cx="18" cy="46" rx="5" ry="4" fill={color} opacity="0.4" />
      <ellipse cx="12" cy="48" rx="4" ry="3.5" fill={color} opacity="0.3" />
      {/* Cracks */}
      <line x1="14" y1="22" x2="18" y2="28" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="16" y1="32" x2="13" y2="37" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoFootprint({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Three-toed theropod footprint */}
      <ellipse cx="30" cy="38" rx="10" ry="8" fill={color} opacity="0.3" />
      <ellipse cx="22" cy="18" rx="4" ry="9" fill={color} opacity="0.35" transform="rotate(-20 22 18)" />
      <ellipse cx="30" cy="14" rx="3.5" ry="10" fill={color} opacity="0.35" />
      <ellipse cx="38" cy="18" rx="4" ry="9" fill={color} opacity="0.35" transform="rotate(20 38 18)" />
      {/* Claw marks */}
      <circle cx="20" cy="10" r="2" fill={color} opacity="0.4" />
      <circle cx="30" cy="5" r="2" fill={color} opacity="0.4" />
      <circle cx="40" cy="10" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoFern({ size = 70, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Fern frond — Mesozoic flora */}
      <line x1="30" y1="55" x2="30" y2="10" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {[12, 18, 24, 30, 36, 42].map((y, i) => {
        const len = 8 + (6 - i) * 2;
        return (
          <g key={i}>
            <path d={`M30 ${y} Q${30 - len} ${y - 4} ${30 - len - 2} ${y - 6}`} fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
            <path d={`M30 ${y} Q${30 + len} ${y - 4} ${30 + len + 2} ${y - 6}`} fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
          </g>
        );
      })}
      <circle cx="30" cy="8" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoStrata({ size = 80, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Geological strata layers */}
      <path d="M5 35 Q20 33 40 35 Q60 37 75 34" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M5 28 Q25 25 45 27 Q65 29 75 26" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M5 20 Q30 17 50 19 Q65 21 75 18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <path d="M5 12 Q20 10 40 12 Q55 14 75 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Embedded fossil hint */}
      <circle cx="35" cy="27" r="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="55" cy="20" r="2" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

function DecoSkull({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Theropod skull outline */}
      <path d="M10 35 Q10 15 25 12 Q35 10 45 14 Q52 18 54 25 Q55 30 50 35 L45 36 L42 33 L38 36 L34 33 L30 36 L10 35Z"
        fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Eye socket */}
      <circle cx="38" cy="22" r="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="38" cy="22" r="2" fill={color} opacity="0.2" />
      {/* Nostril */}
      <ellipse cx="18" cy="24" rx="3" ry="2" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Jaw line */}
      <path d="M10 35 Q15 42 30 44 Q42 43 50 35" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
    </svg>
  );
}

function DecoGondwana({ size = 70, color = '#7D6B99', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Supercontinent splitting — two landmasses drifting */}
      <path d="M8 28 Q12 18 22 16 Q28 15 30 20 Q32 26 28 32 Q22 38 14 35 Q8 33 8 28Z"
        fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      <path d="M34 22 Q38 14 48 16 Q54 18 53 26 Q52 34 46 38 Q38 40 34 34 Q32 28 34 22Z"
        fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
      {/* Drift arrows */}
      <path d="M26 24 L30 24" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M36 24 L32 24" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Rift line */}
      <line x1="30" y1="12" x2="30" y2="50" stroke={color} strokeWidth="0.8" strokeDasharray="3,3" opacity="0.3" />
    </svg>
  );
}

function DecoAmmonite({ size = 60, color = '#3E7C8B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ammonite spiral shell */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.4" />
      {/* Ribs / chambers */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const r1 = 10 + i * 1.3, r2 = 22;
        return <line key={i} x1={30 + r1 * Math.cos(rad)} y1={30 + r1 * Math.sin(rad)}
          x2={30 + r2 * Math.cos(rad)} y2={30 + r2 * Math.sin(rad)}
          stroke={color} strokeWidth="0.7" opacity="0.25" />;
      })}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'tesoro-paleontologico': [DecoGondwana, DecoStrata, DecoAmmonite],
  'argentinosaurus-grande': [DecoBone, DecoStrata, DecoFern],
  'giganotosaurus-rival': [DecoSkull, DecoFootprint, DecoBone],
  'eoraptor-primeros': [DecoAmmonite, DecoFern, DecoStrata],
  'carnotaurus-toro': [DecoSkull, DecoBone, DecoFootprint],
  'patagotitan-escala': [DecoBone, DecoGondwana, DecoStrata],
  'paleontologia-hoy': [DecoAmmonite, DecoSkull, DecoFern],
};

// ——— Content Data ————————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Bonaparte, J.F. (1996). Cretaceous Tetrapods of Argentina. Münchner Geowissenschaftliche Abhandlungen, 30, 73-130',
  'Coria, R.A. & Salgado, L. (1995). A new giant carnivorous dinosaur from the Cretaceous of Patagonia. Nature, 377, 224-226',
  'Sereno, P.C., Forster, C.A., Rogers, R.R. & Monetta, A.M. (1993). Primitive dinosaur skeleton from Argentina and the early evolution of Dinosauria. Nature, 361, 64-66',
  'Carballido, J.L., Pol, D., Otero, A., et al. (2017). A new giant titanosaur sheds light on body mass evolution among sauropod dinosaurs. Proceedings of the Royal Society B, 284, 20171219',
  'Novas, F.E. (2009). The Age of Dinosaurs in South America. Indiana University Press',
  'Bonaparte, J.F. (1985). A horned Cretaceous carnosaur from Patagonia. National Geographic Research, 1(1), 149-151',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tesoro-paleontologico',
    title: 'El Tesoro Paleontológico de Sudamérica',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/dinos_m10.png',
    image: '/assets/dinosaurios/dinos_m10.png',
    content: [
      'Argentina es uno de los países con mayor riqueza de fósiles de dinosaurios en el mundo. Su territorio contiene rocas sedimentarias del período Triásico (252-201 millones de años), Jurásico (201-145 millones de años) y Cretácico (145-66 millones de años), lo que permite estudiar la historia completa de los dinosaurios desde sus orígenes hasta su extinción. Más de 80 especies de dinosaurios han sido descritas a partir de fósiles encontrados en territorio argentino, una cifra que sitúa al país entre los tres más productivos del mundo junto con Estados Unidos y China.',
      'La razón geológica de esta riqueza radica en el supercontinente Gondwana. Durante la era Mesozoica, Sudamérica, África, la Antártida, Australia e India formaban una masa de tierra continua. Gondwana comenzó a fragmentarse hace unos 180 millones de años, y la separación entre Sudamérica y África se completó hace aproximadamente 130 millones de años. Este aislamiento geográfico produjo una evolución única de los dinosaurios sudamericanos, diferente de la que ocurría en Laurasia (los actuales continentes del norte).',
      'La Patagonia argentina es especialmente productiva. Las formaciones geológicas de las provincias de Neuquén, Río Negro y Chubut han proporcionado algunos de los dinosaurios más grandes y más primitivos jamás hallados. La Formación Huincul, la Formación Allen y la Formación Candeleros son solo algunas de las unidades geológicas que han producido descubrimientos de relevancia global. El clima seco de la región favorece la erosión que expone los fósiles, facilitando su hallazgo por equipos de campo.',
      'Además de la Patagonia, el noroeste argentino alberga tesoros del Triásico. La provincia de San Juan contiene el Parque Provincial Ischigualasto, conocido como el Valle de la Luna. Este sitio, declarado Patrimonio de la Humanidad por la UNESCO en el año 2000, preserva una secuencia continua de sedimentos del Triásico Tardío (entre 231 y 225 millones de años) donde se han encontrado los dinosaurios más antiguos conocidos en el registro fósil mundial.',
      'Las formaciones geológicas argentinas cubren un rango temporal de más de 170 millones de años. Desde los sedimentos triásicos de Ischigualasto hasta las capas cretácicas tardías de la Patagonia, el registro fósil argentino permite reconstruir cómo los dinosaurios pasaron de ser animales pequeños y marginales a dominar los ecosistemas terrestres durante más de 160 millones de años. Cada provincia geológica aporta una pieza distinta al rompecabezas evolutivo de estos animales.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer dinosaurio descrito científicamente en Sudamérica fue el Staurikosaurus, hallado en Brasil en 1936 y nombrado en 1970 por el paleontólogo Edwin Colbert. Sin embargo, los descubrimientos más numerosos han ocurrido en Argentina. El paleontólogo José Fernando Bonaparte, apodado "el dueño de los dinosaurios", describió más de 25 nuevas especies entre 1960 y 2000, transformando la paleontología sudamericana en una disciplina de relevancia internacional reconocida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Gondwana no se separó de forma abrupta. El proceso tomó más de 100 millones de años. La separación entre Sudamérica y África creó el Océano Atlántico Sur, que hoy tiene un ancho de unos 7,400 kilómetros en su punto más extenso. La deriva continental continúa: las placas sudamericana y africana se alejan a una velocidad medida de 2.5 centímetros por año, aproximadamente la velocidad a la que crecen las uñas humanas.' },
    ],
    fact: 'En 2014, un estudio publicado en la revista PLOS ONE estimó que entre 1,543 y 2,468 géneros de dinosaurios existieron durante la era Mesozoica. Hasta la fecha, solo unos 1,100 géneros han sido nombrados. Esto significa que entre el 30% y el 55% de todos los dinosaurios que caminaron por la Tierra aún no han sido descubiertos. Argentina, con sus vastas extensiones de roca mesozoica apenas explorada, tiene el potencial de revelar cientos de especies nuevas en las próximas décadas.',
  },
  {
    id: 'argentinosaurus-grande',
    title: 'Argentinosaurus: El Más Grande',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/dinos_m10.png',
    image: '/assets/dinosaurios/dinos_m10.png',
    content: [
      'El Argentinosaurus huinculensis fue descrito en 1993 por los paleontólogos José Fernando Bonaparte y Rodolfo Coria. Los fósiles fueron hallados en la Formación Huincul, provincia de Neuquén, en la Patagonia argentina. El material original incluye vértebras dorsales, costillas, el sacro y una tibia, suficientes para estimar las proporciones del animal completo. Con una longitud estimada de 30 a 40 metros y un peso de entre 65 y 80 toneladas, el Argentinosaurus es uno de los animales terrestres más grandes que han existido.',
      'Las vértebras dorsales del Argentinosaurus miden hasta 159 centímetros de alto. Para sostener su cuerpo, cada vértebra tenía una estructura interna de hueso esponjoso que reducía el peso sin perder resistencia, un diseño convergente con las vigas de acero usadas en la ingeniería moderna. La tibia medía 155 centímetros de longitud. Los cálculos biomecánicos indican que el animal necesitaba moverse a velocidades moderadas de entre 5 y 8 kilómetros por hora para evitar fracturas por estrés en sus extremidades.',
      'La alimentación de un animal de estas dimensiones plantea interrogantes sobre la productividad de los ecosistemas cretácicos. Se estima que el Argentinosaurus necesitaba consumir entre 400 y 500 kilogramos de vegetación al día. Su dieta probablemente incluía coníferas, helechos arborescentes y las primeras plantas con flores que comenzaban a diversificarse durante el Cretácico medio, hace unos 95 millones de años. Su largo cuello, estimado en 12 a 15 metros, le permitía alcanzar vegetación a diferentes alturas sin mover su cuerpo masivo.',
      'El Argentinosaurus pertenece al grupo Titanosauria, un clado de saurópodos que alcanzó su máxima diversidad en los continentes meridionales durante el Cretácico. Los titanosaurios evolucionaron una serie de adaptaciones únicas: osteodermos (placas óseas en la piel), un esqueleto axial con amplias cavidades neumáticas para reducir peso, y un sistema de sacos aéreos conectado a los pulmones similar al de las aves modernas. Este sistema respiratorio les permitía una ventilación más eficiente que la de los mamíferos.',
      'El descubrimiento del Argentinosaurus en 1993 puso a la paleontología argentina en el centro de la atención científica global. La Formación Huincul, donde fue hallado, tiene una antigüedad de aproximadamente 96 a 94 millones de años (Cenomaniano-Turoniano) y ha producido otros gigantes como el terópodo Mapusaurus roseae, un depredador de 12 metros que posiblemente cazaba en grupos y que podría haber atacado saurópodos juveniles. Este ecosistema patagónico albergaba una cadena alimentaria de dimensiones sin paralelo en la historia terrestre.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Un huevo de Argentinosaurus tenía aproximadamente el tamaño de un balón de fútbol, unos 30 centímetros de diámetro. Esto significa que una cría recién nacida pesaba alrededor de 5 kilogramos y debía multiplicar su peso por más de 14,000 veces para alcanzar el tamaño adulto. Los estudios de histología ósea indican que los titanosaurios crecían a tasas de hasta 40 kilogramos por día durante su fase de crecimiento más rápida, entre los 10 y 30 años de edad.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La presión sanguínea necesaria para bombear sangre desde el corazón hasta el cerebro a 8 metros de altura ha sido calculada en aproximadamente 700 mmHg, más de cuatro veces la presión arterial humana normal (120 mmHg). El corazón del Argentinosaurus probablemente pesaba más de 100 kilogramos y bombeaba alrededor de 80 litros de sangre por minuto. Estos cálculos se basan en modelos alométricos publicados por Seymour y Lillywhite en el año 2000 en la revista Comparative Biochemistry and Physiology.' },
    ],
    fact: 'En 2019, un estudio publicado por Bernardo González Riga y colaboradores en la revista Cretaceous Research demostró que los titanosaurios patagónicos poseían un sistema de ventilación pulmonar con sacos aéreos que penetraban incluso en las vértebras cervicales y dorsales. Este mecanismo, idéntico en principio al de las aves modernas, les permitía mantener un flujo de aire unidireccional a través de los pulmones, un sistema entre un 30% y un 33% más eficiente que el sistema bidireccional de los mamíferos.',
  },
  {
    id: 'giganotosaurus-rival',
    title: 'Giganotosaurus: El Rival del Rex',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/dinos_m10.png',
    image: '/assets/dinosaurios/dinos_m10.png',
    content: [
      'Giganotosaurus carolinii fue descrito en 1995 por Rodolfo Coria y Leonardo Salgado en la revista Nature. El holotipo fue descubierto en 1993 por el cazador de fósiles aficionado Rubén Carolini en la Formación Candeleros, provincia de Neuquén, Argentina. Con una longitud estimada de 12 a 13.2 metros y un peso de entre 6 y 8 toneladas, Giganotosaurus rivalizaba con el Tyrannosaurus rex en tamaño y representa uno de los mayores depredadores terrestres conocidos.',
      'El cráneo del Giganotosaurus es uno de los más grandes jamás medidos en un terópodo. El holotipo tiene un cráneo de 1.53 metros de longitud, y un segundo espécimen más grande sugiere cráneos de hasta 1.95 metros. A diferencia del T. rex, cuya mordida generaba una fuerza de 35,000 a 57,000 newtons, el Giganotosaurus tenía una mordida más débil pero dientes más delgados y afilados, diseñados para cortar tejido muscular en lugar de triturar hueso. Su estrategia de caza se asemejaba más a la de un lobo con cuchillas que a la de un cocodrilo con prensa.',
      'Giganotosaurus pertenece a la familia Carcharodontosauridae, un grupo de terópodos que dominó los ecosistemas del Hemisferio Sur durante el Cretácico. Sus parientes incluyen al Carcharodontosaurus de África del Norte y al Mapusaurus de Argentina. El nombre de la familia proviene del griego y significa "lagartos con dientes de tiburón", una referencia a sus dientes lateralmente comprimidos y finamente aserrados, similares a los del gran tiburón blanco (Carcharodon carcharias).',
      'Los análisis de los canales semicirculares del oído interno, realizados mediante tomografía computarizada, revelaron que Giganotosaurus tenía un sentido del equilibrio adaptado para movimientos rápidos laterales de la cabeza. Esto sugiere que podría haber utilizado su mandíbula como un hacha, golpeando a las presas con movimientos de barrido en lugar de sujetar y triturar. Este estilo de ataque es consistente con la caza de saurópodos grandes, donde el depredador infligía heridas múltiples hasta debilitar a la presa.',
      'La coexistencia temporal del Giganotosaurus con los titanosaurios gigantes de la Formación Candeleros (hace 98-96 millones de años) plantea cuestiones sobre las dinámicas predador-presa del Cretácico sudamericano. El descubrimiento del Mapusaurus roseae en un sitio con múltiples individuos ha llevado a la hipótesis de que estos carcarodontosáuridos cazaban en grupos, lo que les habría permitido atacar presas mucho mayores que ellos. Si Giganotosaurus compartía este comportamiento, manadas de estos depredadores de 12 metros habrían representado una amenaza real incluso para los saurópodos adultos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Rubén Carolini, el descubridor del Giganotosaurus, era un mecánico automotriz aficionado a la paleontología que encontró el fósil mientras exploraba el desierto patagónico en su tiempo libre. Tras reportar el hallazgo al Museo Carmen Funes de Plaza Huincul, los paleontólogos tardaron dos temporadas de campo (1993-1994) en excavar el esqueleto, que estaba preservado en un 70%. La especie fue nombrada carolinii en su honor, un reconocimiento poco habitual para un coleccionista no profesional.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio publicado por François Therrien y Donald Henderson en 2007 en la revista Journal of Vertebrate Paleontology comparó la fuerza de mordida de 40 especies de terópodos. El T. rex generaba entre 35,000 y 57,000 newtons, mientras que el Giganotosaurus producía entre 10,000 y 15,000 newtons. Sin embargo, los dientes del Giganotosaurus eran más eficientes para cortar carne, con bordes aserrados de 12 a 14 dentículos por milímetro, similares a un cuchillo de sierra.' },
    ],
    fact: 'El cerebro del Giganotosaurus era proporcionalmente más pequeño que el del T. rex. Un endocranio digital reconstruido a partir de tomografía computarizada en 2004 por Juan Canale y colaboradores reveló un volumen encefálico de apenas 275 centímetros cúbicos, comparable al de un plátano grande. El T. rex, con un volumen cerebral de unos 400 centímetros cúbicos y lóbulos olfativos prominentes, tenía un cerebro un 45% más grande en proporción a su masa corporal, lo que sugiere capacidades cognitivas y sensoriales superiores.',
  },
  {
    id: 'eoraptor-primeros',
    title: 'Eoraptor y los Primeros',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/dinos_m10.png',
    image: '/assets/dinosaurios/dinos_m10.png',
    content: [
      'Eoraptor lunensis fue descrito en 1993 por Paul Sereno, Catherine Forster, Raymond Rogers y Alfredo Monetta, a partir de un esqueleto casi completo encontrado en el Parque Provincial Ischigualasto, provincia de San Juan, Argentina. Con una antigüedad de aproximadamente 231 millones de años (Triásico Tardío, piso Carniano), Eoraptor es uno de los dinosaurios más antiguos conocidos. Medía solo un metro de longitud y pesaba unos 10 kilogramos, un contraste radical con los gigantes que sus descendientes producirían millones de años después.',
      'Ischigualasto, conocido popularmente como el Valle de la Luna por su paisaje lunar de rocas erosionadas, es uno de los pocos lugares del mundo que preserva una secuencia continua de sedimentos del Triásico Tardío. La formación se extiende por unos 700 metros de espesor y representa aproximadamente 6 millones de años de depositación. Fue declarada Patrimonio de la Humanidad por la UNESCO en el año 2000 junto con el Parque Nacional Talampaya. Las condiciones de sepultamiento rápido por inundaciones estacionales favorecieron la preservación de esqueletos articulados.',
      'Junto con Eoraptor, Ischigualasto ha producido otros dinosaurios tempranos fundamentales. Herrerasaurus ischigualastensis, descrito por Osvaldo Reig en 1963, es un depredador de 3 a 4 metros que fue uno de los primeros dinosaurios en desarrollar adaptaciones carnívoras especializadas. Pisanosaurus mertii, también de Ischigualasto, fue considerado durante décadas el ornitisquio más antiguo del mundo (166 centímetros de largo), aunque estudios recientes de 2017 cuestionan su clasificación como dinosaurio y lo reubican como un silesáurido.',
      'Los primeros dinosaurios del Triásico Tardío no eran los animales dominantes de sus ecosistemas. En Ischigualasto, los dinosaurios representaban menos del 10% de la fauna de vertebrados. Los dominantes eran los rincosaurios (herbívoros parecidos a reptiles rechonchos), los cinodontos (ancestros de los mamíferos) y los crurotarsianos (parientes de los cocodrilos). Los dinosaurios solo se convirtieron en el grupo dominante tras la extinción del Triásico-Jurásico hace 201 millones de años, que eliminó a la mayoría de sus competidores.',
      'El análisis anatómico del Eoraptor revela una mezcla de características primitivas y derivadas que lo sitúan cerca de la base del árbol evolutivo de los dinosaurios. Sus dientes incluyen formas tanto puntiagudas (para carne) como aplanadas (para plantas), lo que sugiere una dieta omnívora. Sus manos tenían cinco dedos, pero solo tres eran funcionales para la manipulación. Estudios filogenéticos recientes, publicados por Martínez et al. en 2011 en la revista Journal of Systematic Palaeontology, reclasificaron a Eoraptor como un sauropodomorfo basal en lugar de un terópodo, lo que significa que estaba más emparentado con los futuros gigantes herbívoros que con los depredadores.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El nombre Eoraptor lunensis significa "ladrón del amanecer del Valle de la Luna". "Eo" proviene del griego eos (amanecer), en referencia a su posición temprana en la historia evolutiva de los dinosaurios. "Raptor" significa ladrón o saqueador en latín. "Lunensis" hace referencia al Valle de la Luna, donde fue descubierto. Paul Sereno eligió este nombre para enfatizar que el animal representaba literalmente el "amanecer" de la era de los dinosaurios, hace 231 millones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La datación radiométrica de las cenizas volcánicas intercaladas en la Formación Ischigualasto ha permitido establecer edades precisas para los fósiles. El método utiliza el decaimiento del isótopo argón-40 al argón-39 (40Ar/39Ar) en cristales de sanidina. Claudia Marsicano y colaboradores publicaron en 2016 edades de 231.4 ± 0.3 millones de años para los niveles que contienen Eoraptor, con un margen de error de solo 300,000 años, una precisión notable para rocas tan antiguas.' },
    ],
    fact: 'Los sedimentos de Ischigualasto contienen evidencia directa de la atmósfera del Triásico Tardío. El análisis de isótopos de carbono-13 en paleosoles (suelos fósiles) indica que la concentración de CO₂ atmosférico era de entre 1,500 y 2,500 partes por millón, entre 4 y 6 veces superior al nivel preindustrial de 280 ppm. Esta concentración elevada de gases de efecto invernadero producía un clima global cálido sin casquetes polares, con temperaturas medias globales entre 5 y 10 grados Celsius por encima de las actuales.',
  },
  {
    id: 'carnotaurus-toro',
    title: 'Carnotaurus: El Toro Carnívoro',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/dinos_m10.png',
    image: '/assets/dinosaurios/dinos_m10.png',
    content: [
      'Carnotaurus sastrei fue descrito en 1985 por el paleontólogo José Fernando Bonaparte a partir de un esqueleto excepcionalmente completo hallado en la Formación La Colonia, provincia de Chubut, Patagonia argentina. El nombre significa "toro carnívoro" (del latín carno = carne, taurus = toro) y hace referencia a los dos cuernos robustos que sobresalen por encima de sus ojos, una característica única entre los dinosaurios terópodos. La especie fue nombrada en honor a Ángel Sastre, el propietario de la estancia donde se realizó el hallazgo.',
      'Carnotaurus medía entre 7.5 y 9 metros de longitud y pesaba aproximadamente 1,500 kilogramos. Su rasgo más distintivo, además de los cuernos, son sus extremidades anteriores atrofiadas, proporcionalmente más pequeñas que las del T. rex. Los brazos del Carnotaurus eran tan reducidos que los cuatro dedos de cada mano estaban prácticamente inmovilizados, sin garras funcionales. Los estudios biomecánicos sugieren que estos brazos vestigiales no cumplían ninguna función locomotora o de manipulación y representaban un estado avanzado de reducción evolutiva.',
      'El cráneo del Carnotaurus es notablemente corto y profundo comparado con otros terópodos de su tamaño. Los análisis de elementos finitos realizados por Mazzetta, Fariña y Vizcaíno en 2004 demostraron que su cráneo podía absorber impactos verticales significativos, lo que ha llevado a la hipótesis de que los cuernos eran utilizados en combates intraespecíficos, similar al comportamiento de embestida observado en bóvidos y cérvidos actuales. La fuerza de mordida era relativamente débil, estimada en unos 3,000 newtons.',
      'Uno de los aspectos más notables del holotipo de Carnotaurus es la preservación de impresiones de piel en varias regiones del cuerpo. Estas impresiones revelan que la piel estaba cubierta por filas de escamas no superpuestas, con tubérculos cónicos más grandes (de hasta 5 centímetros de diámetro) distribuidos en hileras regulares a lo largo del cuello, el costado y la cola. No se encontró evidencia de plumas, lo que sugiere que los abelisáuridos grandes conservaron una cobertura escamosa similar a la de los cocodrilos modernos.',
      'Carnotaurus pertenece a la familia Abelisauridae, un grupo de terópodos que dominó los ecosistemas depredadores del Hemisferio Sur durante el Cretácico, ocupando el nicho ecológico que los tiranosáuridos ocupaban en el norte. Los abelisáuridos incluyen al Majungasaurus de Madagascar, al Aucasaurus de Argentina y al Rajasaurus de India. Su distribución geográfica refleja la antigua conexión entre estos territorios a través de Gondwana. La Formación La Colonia, donde se halló el Carnotaurus, tiene una antigüedad de entre 72 y 69 millones de años (Campaniano-Maastrichtiano).',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Bonaparte tardó cuatro temporadas de campo (1984-1987) en excavar por completo el esqueleto de Carnotaurus. El fósil estaba preservado en un nódulo de roca extremadamente dura que requirió herramientas neumáticas y ácido fórmico diluido para su preparación en laboratorio. El proceso de preparación del holotipo tomó más de tres años adicionales. Este espécimen se conserva actualmente en el Museo Argentino de Ciencias Naturales Bernardino Rivadavia en Buenos Aires.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio publicado por Scott Persons y Philip Currie en 2011 en la revista PLOS ONE analizó la musculatura caudal del Carnotaurus mediante la reconstrucción de los puntos de inserción muscular en las vértebras de la cola. Concluyeron que Carnotaurus poseía el músculo caudofemoralis más desarrollado de todos los terópodos conocidos, lo que le habría permitido alcanzar velocidades de hasta 48 a 56 kilómetros por hora, convirtiéndolo en uno de los grandes terópodos más veloces registrados.' },
    ],
    fact: 'Las impresiones de piel del Carnotaurus cubren un área total de más de 1,800 centímetros cuadrados del cuerpo original, convirtiéndolas en las muestras de piel de terópodo más extensas conocidas hasta la fecha de su publicación. En 2021, Christophe Hendrickx y colaboradores publicaron un estudio detallado en la revista Cretaceous Research donde documentaron más de 1,000 escamas individuales en diferentes regiones corporales, revelando un patrón de variación regional donde las escamas del cuello eran hasta un 65% más grandes que las del tronco.',
  },
  {
    id: 'patagotitan-escala',
    title: 'Patagotitan: Redefiniendo la Escala',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/dinos_m10.png',
    image: '/assets/dinosaurios/dinos_m10.png',
    content: [
      'Patagotitan mayorum fue descrito formalmente en 2017 por José Luis Carballido, Diego Pol, Alejandro Otero y un equipo de investigadores del Museo Paleontológico Egidio Feruglio (MEF) en Trelew, Chubut. El artículo fue publicado en Proceedings of the Royal Society B. Los fósiles fueron hallados en la Formación Cerro Barcino, en la provincia de Chubut, Argentina, y representan al menos seis individuos diferentes. Con un peso estimado de 69 toneladas y una longitud de 37 metros, Patagotitan es considerado el animal terrestre más grande jamás pesado con rigor científico.',
      'La estimación de masa del Patagotitan se basó en el método de perímetro mínimo del estilopodio, que mide la circunferencia del fémur y del húmero para calcular la masa corporal. Este método, desarrollado por Campione y Evans en 2012, tiene un margen de error menor que las estimaciones volumétricas. El fémur del Patagotitan mide 2.38 metros de longitud con una circunferencia mínima de 86 centímetros. Estos valores, combinados con los del húmero, producen una estimación de 69,000 ± 15,000 kilogramos.',
      'El sitio de excavación contenía más de 150 huesos pertenecientes a al menos seis individuos de tamaño similar. La acumulación de tantos esqueletos en un solo lugar sugiere un evento de mortalidad masiva, posiblemente una sequía prolongada que concentró a los animales alrededor de una fuente de agua menguante. Los huesos muestran señales de meteorización diferencial, lo que indica que los animales no murieron simultáneamente sino en episodios separados durante un período de tiempo que podría abarcar décadas.',
      'El descubrimiento del Patagotitan fue realizado por un peón de campo llamado Aurelio Hernández en 2010, quien notó un hueso que sobresalía de una ladera erosionada en la estancia La Flecha. La excavación formal comenzó en 2013 y se extendió durante siete temporadas de campo. Cada fémur requirió un equipo de ocho personas y una grúa para ser extraído del sedimento. El transporte de los bloques de yeso que contenían los fósiles más grandes necesitó camiones de carga pesada adaptados para los caminos rurales de la Patagonia.',
      'La Formación Cerro Barcino, donde se halló Patagotitan, tiene una antigüedad de entre 101 y 95 millones de años (Albiano-Cenomaniano). El análisis paleoecológico del sitio, basado en la mineralogía de los sedimentos y el polen fósil, indica un ambiente de llanura aluvial con vegetación de coníferas y helechos, cruzada por ríos estacionales. Las temperaturas medias anuales se estiman en unos 20 grados Celsius, con estaciones secas marcadas. Este ambiente rico en vegetación podía sostener a herbívoros de proporciones extremas como el Patagotitan.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Una réplica completa del esqueleto de Patagotitan fue instalada en enero de 2016 en el Museo Americano de Historia Natural de Nueva York. El montaje mide 37 metros de largo y es tan grande que la cabeza sobresale por la puerta de la sala de exhibición hacia el pasillo principal del museo. Fue construido a partir de moldes de fibra de vidrio de los huesos originales y requirió un equipo de técnicos trabajando durante 18 meses para ensamblarse.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La histología ósea del Patagotitan, analizada mediante cortes microscópicos de sus huesos largos, revela líneas de crecimiento interrumpido (LAGs) que indican que los individuos del sitio tenían entre 15 y 25 años de edad. Dado que ninguno de los esqueletos muestra la ralentización del crecimiento típica de la madurez esquelética completa, es posible que los Patagotitan adultos fueran aún más grandes que los especímenes conocidos, lo que elevaría las estimaciones de masa por encima de las 70 toneladas.' },
    ],
    fact: 'Carballido y colaboradores calcularon que el corazón del Patagotitan pesaba aproximadamente 200 kilogramos y bombeaba unos 120 litros de sangre por minuto. Para enviar sangre al cerebro, situado a unos 10 metros de altura cuando el cuello estaba erguido, necesitaba generar una presión arterial sistólica de al menos 800 mmHg, más de cinco veces la presión arterial normal de un ser humano (120 mmHg). Esta demanda cardiovascular representa uno de los desafíos fisiológicos más extremos conocidos en la biología de los vertebrados.',
  },
  {
    id: 'paleontologia-hoy',
    title: 'Paleontología Latinoamericana Hoy',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/dinos_m10.png',
    image: '/assets/dinosaurios/dinos_m10.png',
    content: [
      'La paleontología latinoamericana vive un período de productividad sin precedentes. Entre 2010 y 2023, se describieron más de 120 nuevas especies de dinosaurios en la región, con Argentina, Brasil y Chile liderando los descubrimientos. Los museos paleontológicos de la Patagonia, como el MEF de Trelew, el Museo Carmen Funes de Plaza Huincul y el Museo de Cipolletti, se han convertido en centros de investigación de primer nivel que colaboran con instituciones de Estados Unidos, Europa y China en proyectos conjuntos.',
      'Brasil ha producido hallazgos de importancia global en los últimos años. El Oxalaia quilombensis, descrito en 2011, es un espinosáurido de 12 a 14 metros hallado en la Formación Alcântara del estado de Maranhão. Los espinosáuridos brasileños proporcionan evidencia de la conexión entre África y Sudamérica durante el Cretácico temprano, ya que sus parientes más cercanos, como el Spinosaurus aegyptiacus, se encuentran en el norte de África. Además, la Formación Santa Maria en Rio Grande do Sul ha producido dinosaurios triásicos comparables a los de Ischigualasto.',
      'Chile ha contribuido con descubrimientos notables en la última década. En 2021, Alexander Vargas y su equipo describieron a Stegouros elengassen, un anquilosaurio del Cretácico tardío hallado en la Región de Magallanes. Su cola terminaba en una estructura plana y armada con osteodermos fusionados, diferente al mazo caudal de otros anquilosaurios. Este hallazgo reveló un linaje previamente desconocido de dinosaurios acorazados endémicos de Gondwana, que evolucionaron de forma independiente a sus parientes del Hemisferio Norte.',
      'México también ha enriquecido el registro fósil de dinosaurios norteamericanos. El Coahuilaceratops magnacuerna, descrito en 2010 por Mark Loewen y colaboradores, es un ceratopsio del Cretácico tardío (hace 72 millones de años) hallado en el estado de Coahuila. Sus cuernos supraorbitales, de hasta 1.2 metros de longitud, son los más largos registrados en cualquier ceratopsio. La Formación Cerro del Pueblo de Coahuila ha producido también hadrosaurios, tiranosáuridos y tortugas fósiles que documentan los ecosistemas del noreste de México durante los últimos millones de años del Cretácico.',
      'La tecnología está transformando el trabajo de campo y de laboratorio en toda la región. Los paleontólogos latinoamericanos utilizan escáneres de tomografía computarizada para estudiar la estructura interna de los fósiles sin destruirlos, fotogrametría con drones para mapear sitios de excavación con precisión centimétrica, y análisis geoquímicos de isótopos estables para reconstruir las dietas y los ambientes de los dinosaurios. La inteligencia artificial se está aplicando para identificar automáticamente fragmentos óseos y predecir la ubicación de nuevos yacimientos a partir de imágenes satelitales y modelos geológicos digitales.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La paleontóloga argentina Marta Fernández, del Museo de La Plata, lidera uno de los proyectos más ambiciosos de la paleontología latinoamericana: la exploración de la Antártida en busca de dinosaurios. Desde la década de 1990, expediciones argentinas a la isla James Ross han descubierto hadrosaurios, anquilosaurios y aves fósiles del Cretácico tardío. Estos hallazgos demuestran que los dinosaurios habitaron el continente antártico cuando su clima era templado, con temperaturas medias anuales de entre 10 y 15 grados Celsius.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio publicado en 2020 en la revista Current Biology por Mauricio Cerroni y colaboradores del CONICET (Consejo Nacional de Investigaciones Científicas y Técnicas de Argentina) utilizó sincrotrón de rayos X en el European Synchrotron Radiation Facility (ESRF) de Grenoble, Francia, para analizar un embrión de titanosaurio preservado dentro de su huevo. El análisis reveló un cuerno facial presente en la cría pero ausente en los adultos, similar al "diente de huevo" que usan los reptiles modernos para romper la cáscara al nacer.' },
    ],
    fact: 'Según datos del Paleobiology Database (PBDB), consultados en 2023, Argentina ocupa el segundo lugar mundial en diversidad de géneros de dinosaurios nombrados, con más de 85 géneros válidos, solo detrás de Estados Unidos con más de 190 géneros. China ocupa el tercer lugar con unos 80 géneros. Sin embargo, cuando se ajusta por área de afloramiento de roca mesozoica disponible para prospección, Argentina tiene la densidad de descubrimientos más alta del mundo, un indicador del potencial paleontológico aún no explotado de la Patagonia y el noroeste argentino.',
  },
];

// ——— Fossil Particle Field (Canvas Background) ——————————————————————————————
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

// ——— Dinosaur Dig Header ————————————————————————————————————————————————————
function DinoHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Geological arc */}
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
        {/* Central fossil icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#5D8A68" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#5D8A68" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="dinoGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(93,138,104,0.9)" />
            <stop offset="100%" stopColor="rgba(93,138,104,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5D8A68" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DINOSAURIOS DE ARGENTINA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(93,138,104,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">TESOROS PALEONTOLÓGICOS DE LATINOAMÉRICA</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) —————————————————————————————
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
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
          layoutId="activeDotDinosM10"
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

// ——— Expandable Section with Random Direction ————————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————————
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em',
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase',
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

// ——— Progress Bar ————————————————————————————————————————————————————————————
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

// ——— Main Infographic Component ——————————————————————————————————————————————
export default function InteractiveInfographic_DinosM10() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(15,12,10,0.8) 40%, rgba(10,10,15,0.88) 100%), url(/assets/dinosaurios/dinos_m10.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(93,138,104,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <FossilField />

      <DinoHeader />

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
              🏆 ¡Has explorado todos los dinosaurios de Argentina y Latinoamérica!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Paleontólogo del Futuro
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

      {/* ImageLightbox */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
