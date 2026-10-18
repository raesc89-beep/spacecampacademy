'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (Time Machine themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoGear({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <rect
            key={i}
            x={30 + 19 * Math.cos(rad) - 3}
            y={30 + 19 * Math.sin(rad) - 3}
            width="6"
            height="6"
            fill={color}
            opacity="0.6"
            transform={`rotate(${a} ${30 + 19 * Math.cos(rad)} ${30 + 19 * Math.sin(rad)})`}
          />
        );
      })}
    </svg>
  );
}

function DecoWormhole({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Concentric spiraling rings */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.8" />
      {/* Distortion streaks */}
      <path d="M30 6 Q35 15 30 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M54 30 Q45 35 42 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 54 Q25 45 30 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M6 30 Q15 25 18 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoFluxCapacitor({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Y-shape */}
      <path d="M30 30 L15 15 M30 30 L45 15 M30 30 L30 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Glowing centers */}
      <circle cx="30" cy="30" r="3" fill={color} />
      <circle cx="15" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="45" cy="15" r="2" fill={color} opacity="0.8" />
      <circle cx="30" cy="48" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoClockFace({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.6" />;
      })}
    </svg>
  );
}

function DecoTimeline({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M40 20 Q50 10 65 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M40 20 Q50 30 65 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {[15, 30, 40, 55, 70].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill={color} opacity="0.5" />)}
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="32" r="2.5" fill={color} opacity="0.4" />
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoBolt({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

const DECO_MAP = {
  'hg-wells': [DecoGear, DecoClockFace, DecoTimeline],
  'agujeros-gusano': [DecoWormhole, DecoAtomSvg, DecoGear],
  'motor-alcubierre': [DecoAtomSvg, DecoTimeline, DecoBolt],
  'delorean-ingenieria': [DecoGear, DecoBolt, DecoClockFace],
  'condensador-flujo': [DecoFluxCapacitor, DecoBolt, DecoAtomSvg],
  'turistas-futuro': [DecoTimeline, DecoClockFace, DecoWormhole],
  'gobernanza-temporal': [DecoClockFace, DecoGear, DecoTimeline],
}; const BIBLIOGRAPHY = ['Wells, H.G. (1895). The Time Machine, William Heinemann',
  'Thorne, K.S. (1994). Black Holes and Time Warps, W.W. Norton',
  'Alcubierre, M. (1994). "The Warp Drive: Hyper-Fast Travel Within General Relativity", Classical and Quantum Gravity, 11',
  'Hawking, S. (1992). "Chronology Protection Conjecture", Physical Review D, 46',
  'Visser, M. (1995). Lorentzian Wormholes: From Einstein to Hawking, AIP Press',
  'Gott, J.R. (2001). Time Travel in Einstein\'s Universe, Houghton Mifflin',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "hg-wells",
    diagramImage: '/assets/bttf/infographic_m6/diagram_hg-wells.webp',
    diagramCaption: 'H.G. Wells y su Máquina del Tiempo: el origen literario del viaje temporal',
    "title": "La Primera Máquina del Tiempo",
    "color": "#FF6B35",
    "btnImage": "/assets/bttf/infographic_maquina_tiempo/btn_wells.webp",
    "image": "/assets/bttf/infographic_maquina_tiempo/hero_wells.webp",
    "content": [
      "En la cultura audiovisual moderna, la imagen definitiva de una máquina del tiempo es un reluciente deportivo DeLorean plateado con puertas de ala de gaviota y luces de neón azules. Robert Zemeckis transformó la idea del salto temporal en una aventura sobre ruedas por los suburbios estadounidenses. Sin embargo, toda esta mitología contemporánea desciende en línea directa de una obra literaria fundacional escrita casi un siglo antes: la célebre novela corta La máquina del tiempo publicada por el británico H. G. Wells en 1895.",
      "Antes de la obra de Wells, los viajes en el tiempo en la literatura tradicional se explicaban mediante encantamientos mágicos, visiones oníricas o siestas prolongadas como en el cuento de Rip Van Winkle de Washington Irving. Herbert George Wells fue el primero en introducir una máquina mecánica con palancas de marfil, cristal de roca y latón que trataba el tiempo no como un misterio místico, sino explícitamente como una cuarta dimensión geométrica del espacio que un aparato humano podía recorrer hacia atrás o adelante.",
      "Lo asombroso del planteamiento wellsiano es que su intuición geométrica precedió en toda una década a la publicación formal de la relatividad especial de Albert Einstein en 1905 y al formalismo tetradimensional de Hermann Minkowski en 1908. En el primer capítulo de la novela, el Viajero del Tiempo explica a un grupo de académicos incrédulos que cualquier cuerpo físico real debe poseer cuatro dimensiones fundamentales: longitud, anchura, grosor y duración temporal, sin la cual ningún objeto puede existir en la realidad física.",
      "Wells utilizó esta máquina mecánica victoriana como un poderoso vehículo sociológico para proyectar las desigualdades de la Revolución Industrial hacia el año 802.701 d.C., donde la humanidad se ha dividido biológicamente en dos especies degeneradas: los frágiles y ociosos Eloi en la superficie y los monstruosos y laboriosos Morlocks en el subsuelo subterráneo, demostrando que la mejor ciencia ficción utiliza el futuro como un espejo crítico de los dilemas éticos y políticos del presente.",
      "El doctor Emmett Brown es el heredero espiritual indiscutible de ese Viajero del Tiempo victoriano de Wells. En la tercera entrega de la saga cinematográfica, el Doc rinde un explícito y conmovedor homenaje al autor inglés bautizando a sus dos hijos pequeños nacidos en el siglo XIX con los nombres de Julio y Verne, conectando de forma entrañable las raíces literarias del siglo XIX con la ciencia ficción cinematográfica del siglo XX."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el desenlace de Regreso al Futuro Parte III, el doctor Emmett Brown y su esposa Clara Clayton presentan formalmente a sus dos hijos ante un atónito Marty McFly en la estación de ferrocarril de 1985. Los dos niños se llaman Julio y Verne Brown, un tributo cinematográfico reverente a Jules Verne, el maestro literario de los viajes extraordinarios del siglo XIX."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El matemático alemán Hermann Minkowski introdujo en 1908 su célebre formulación geométrica tetradimensional del espaciotiempo con la frase: «De ahora en adelante el espacio por sí mismo y el tiempo por sí mismo están condenados a desvanecerse en meras sombras, y solo una especie de unión de ambos preservará una realidad independiente»."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m6/banner_hg-wells.webp",
    "bannerCaption": "H.G. Wells y su Máquina del Tiempo: el origen literario del viaje temporal",
    "fact": "La primera edición de la novela The Time Machine de H. G. Wells fue publicada por la editorial londinense William Heinemann en mayo de 1895 con una tirada inicial de 10.000 ejemplares en rústica, vendiéndose en pocos meses y consagrando el término «máquina del tiempo» en el vocabulario de todas las lenguas modernas del mundo civilizado."
  },
  {
    "id": "agujeros-gusano",
    diagramImage: '/assets/bttf/infographic_m6/diagram_agujeros-gusano.webp',
    diagramCaption: 'Agujeros de gusano traversables: túneles teóricos a través del espacio-tiempo',
    "title": "Agujeros de Gusano",
    "color": "#7C4DFF",
    "btnImage": "/assets/bttf/infographic_maquina_tiempo/btn_gusano.webp",
    "image": "/assets/bttf/infographic_maquina_tiempo/hero_gusano.webp",
    "content": [
      "En la ficción de Regreso al Futuro, el DeLorean atraviesa una nube brillante de chispas eléctricas y descargas de plasma para aparecer instantáneamente en otra fecha sin recorrer el espacio intermedio. Esta forma de salto dimensional recuerda conceptualmente a una de las predicciones más fascinantes de la relatividad general de Albert Einstein: los puentes de Einstein-Rosen, conocidos popularmente en la física moderna como agujeros de gusano o túneles topológicos del espaciotiempo.",
      "Propuestos inicialmente en 1935 por Albert Einstein y Nathan Rosen como soluciones matemáticas puras para describir partículas elementales en el marco de la gravitación clásica, los agujeros de gusano son hipotéticos atajos espaciales que conectan dos regiones distantes del cosmos a través de una garganta hiperespacial. Décadas más tarde, el físico John Archibald Wheeler acuñó el término «wormhole», comparando el universo con una manzana donde un gusano perfora un túnel central directo en lugar de arrastrarse por la superficie curva de la fruta.",
      "En 1988, el astrofísico de Caltech Kip Thorne y sus estudiantes Michael Morris y Ulvi Yurtsever publicaron un estudio trascendental en la revista Physical Review Letters que demostró cómo un agujero de gusano podría transformarse teóricamente en una auténtica máquina del tiempo. Si una de las dos bocas del túnel se acelera a velocidades cercanas a la luz o se coloca cerca de un pozo gravitatorio intenso, la dilatación temporal de Einstein crea un desfase cronológico permanente entre ambas entradas.",
      "Un viajero que ingrese por la boca acelerada y salga por la boca estacionaria emergería físicamente en el pasado de la región externa, completando un viaje temporal a través de una curva temporal cerrada. No obstante, mantener abierto un agujero de gusano de tamaño macroscópico apto para naves humanas requiere desafiar la física conocida: las fuerzas gravitatorias colapsarían la garganta en un microsegundo a menos que esté forrada internamente con materia exótica que posea densidades de energía negativas.",
      "La existencia de densidades de energía negativa está demostrada a escala cuántica microscópica mediante el efecto Casimir, descubierto en 1948 por el físico Hendrik Casimir, donde la presión de radiación entre dos placas conductoras paralelas en el vacío se vuelve negativa respecto al exterior. Sin embargo, extrapolar este efecto cuántico infinitesimal para mantener abierta una garganta gravitatoria de varios metros representa un obstáculo de ingeniería cósmica que roza lo insuperable."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Para crear el efecto visual del salto temporal del DeLorean en 1985, los artistas de efectos ópticos de Industrial Light & Magic filmaron descargas eléctricas reales sobre una maqueta a escala y combinaron varias capas de animación óptica fotograma a fotograma para simular el colapso luminoso del espacio antes de que el coche desaparezca dejando dos huellas de fuego sobre el asfalto."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El efecto Casimir predice una fuerza de atracción entre dos placas metálicas neutras situadas en el vacío cuántico separadas por distancias nanométricas. Esta fuerza se debe a que la cavidad entre las placas restringe los modos de longitud de onda de los fotones virtuales del vacío, generando una densidad de energía neta inferior a la del vacío exterior circundante."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m6/banner_agujeros-gusano.webp",
    "bannerCaption": "Agujeros de gusano traversables: túneles teóricos a través del espacio-tiempo",
    "fact": "En su estudio pionero de 1988, Kip Thorne calculó que para estabilizar un agujero de gusano esférico de Morris-Thorne de 1 metro de diámetro se necesitaría una tensión radial negativa colosal en la garganta equivalente a 10 elevado a la potencia de 38 pascales, una presión negativa de magnitud astronómica muy superior a la presión reinante en el centro de las estrellas más masivas."
  },
  {
    "id": "motor-alcubierre",
    diagramImage: '/assets/bttf/infographic_m6/diagram_motor-alcubierre.webp',
    diagramCaption: 'El motor Alcubierre: viaje superlumínico comprimiendo el espacio-tiempo',
    "title": "El Motor Warp",
    "color": "#00E5FF",
    "btnImage": "/assets/bttf/infographic_maquina_tiempo/btn_warp.webp",
    "image": "/assets/bttf/infographic_maquina_tiempo/hero_warp.webp",
    "content": [
      "En Regreso al Futuro Parte II, cuando el DeLorean vuela a través del cielo del año 2015 o salta entre siglos, los personajes parecen eludir las barreras impuestas por la relatividad especial sin experimentar aumentos infinitos de masa relativista. En 1994, el físico teórico mexicano Miguel Alcubierre Moya propuso un modelo matemático asombroso dentro de la relatividad general que revolucionó la ciencia de la propulsión superlumínica: la métrica de Alcubierre o motor de curvatura warp.",
      "Inspirado por la ciencia ficción televisiva de Star Trek mientras cursaba sus estudios doctorales en la Universidad de Gales en Cardiff, Alcubierre demostró que una nave espacial podría viajar formalmente a mayor velocidad que la luz respecto a observadores distantes sin violar la velocidad local de la luz. El secreto reside en no mover la nave a través del espacio local, sino en deformar la propia geometría del espaciotiempo que rodea al vehículo.",
      "La métrica de Alcubierre propone generar una «burbuja de curvatura» que comprime el espaciotiempo delante de la nave y expande el espaciotiempo detrás de ella en igual proporción. La nave espacial permanece en reposo relativo en el interior de una región de espacio plano en el centro de la burbuja, lo que protege a los tripulantes de fuerzas de aceleración gravitatoria mortales y de efectos destructivos de dilatación temporal relativista mientras la burbuja se desliza a velocidades superlumínicas arbitrarias.",
      "El vínculo fascinante entre el motor de Alcubierre y las máquinas del tiempo fue demostrado poco después por físicos teóricos como Allen Everett. Si las leyes fundamentales de la naturaleza permitieran mover una burbuja de curvatura a velocidades hiperlumínicas a través del espacio plano, dos o más de estos motores coordinados en marcos de referencia móviles permitirían construir trayectorias espaciales que regresan al punto de origen antes de haber partido, formando una curva temporal cerrada.",
      "Al igual que los agujeros de gusano transitables de Thorne, el gran talón de Aquiles de la métrica de Alcubierre es su dependencia matemática ineludible de la materia exótica con energía negativa. Cálculos iniciales sugerían que la energía negativa necesaria para envolver una nave de tamaño modesto equivaldría a la masa total de todo el universo observable, aunque refinamientos geométricos posteriores han logrado reducir ese requerimiento teórico a masas del orden de la masa del planeta Júpiter."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El célebre DeLorean DMC-12 modificado por el Doc Brown exhibe dos grandes tubos de escape plateados en su parte trasera que expulsan vapor criogénico y condensación tras cada salto. Zemeckis y Gale querían que el automóvil pareciera un cruce tosco y verosímil entre un caza militar a reacción de los años ochenta y una nave espacial ensamblada en un garaje suburbano."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad de la luz en el vacío es una barrera insuperable para cualquier cuerpo que se mueva «a través» del espacio local, según la relatividad especial. Sin embargo, las ecuaciones de Einstein en la relatividad general no imponen ningún límite de velocidad a la rapidez con la que el propio tejido del espaciotiempo puede expandirse, contraerse o deformarse dinámicamente."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m6/banner_motor-alcubierre.webp",
    "bannerCaption": "El motor Alcubierre: viaje superlumínico comprimiendo el espacio-tiempo",
    "fact": "El físico e ingeniero aeroespacial de la NASA Harold «Sonny» White propuso en 2011 una modificación a la geometría de la burbuja de Alcubierre suavizando la interfaz del anillo de curvatura mediante oscilaciones de intensidad; sus cálculos teóricos demostraron que esta optimización reducía el requerimiento de energía exótica desde el equivalente a la masa de Júpiter hasta unos 700 kilogramos de masa-energía."
  },
  {
    "id": "delorean-ingenieria",
    diagramImage: '/assets/bttf/infographic_m6/diagram_delorean-ingenieria.webp',
    diagramCaption: 'La ingeniería real del DeLorean DMC-12: el auto que inspiro a la máquina del tiempo',
    "title": "Ingeniería del DeLorean",
    "color": "#FFA726",
    "btnImage": "/assets/bttf/infographic_maquina_tiempo/btn_delorean.webp",
    "image": "/assets/bttf/infographic_maquina_tiempo/hero_delorean.webp",
    "content": [
      "En la gran pantalla, el DeLorean DMC-12 aparece como un prodigio de la tecnología científica capaz de saltar épocas con la precisión de un bisturí y aterrizar intacto sobre el barro de 1885 o el asfalto de 1955. La magia del celuloide oculta que, bajo esa carrocería plateada de acero inoxidable, el automóvil real era un vehículo sumamente complejo, pesado y repleto de compromisos mecánicos que rozaron la pesadilla de ingeniería durante su accidentada fabricación industrial en Irlanda del Norte.",
      "El chasis del automóvil fue rediseñado por el legendario ingeniero británico Colin Chapman, fundador de la escudería de Fórmula 1 Lotus Cars. Chapman implementó una estructura de chasis de acero en doble «Y» similar a la del deportivo Lotus Esprit, complementada con un cuerpo monocasco inferior de plástico reforzado con fibra de vidrio (ERPC). Esta base servía de soporte estructural para los paneles exteriores de acero inoxidable austenítico cepillado de 1,2 milímetros de espesor.",
      "Uno de los elementos visuales más icónicos del vehículo son sus puertas de ala de gaviota con apertura vertical. A diferencia de las puertas convencionales con bisagras laterales, estas requerían barras de torsión criogénicas de aleación especial de titanio y puntales neumáticos de gas presurizado para contrarrestar el considerable peso del metal y permitir que una persona pudiera abrir la puerta hacia arriba con un esfuerzo mínimo de solo unos pocos kilogramos de fuerza.",
      "En las secuencias de filmación de la trilogía, el equipo de efectos especiales mecánicos liderado por Michael Lantieri tuvo que resolver constantes dolores de cabeza mecánicos. El sistema eléctrico original del DeLorean de serie era notoriamente frágil y sufría continuas caídas de tensión eléctrica cuando se conectaban los cientos de bombillas halógenas, sintetizadores de sonido estéreo y pantallas de tubos fluorescentes de neón instaladas en el salpicadero interior por los cineastas.",
      "La integración del reactor nuclear de fisión en el maletero trasero añadió un peso considerable a un vehículo que ya sufría de una distribución de masas desequilibrada (con más del 65% del peso total cargado sobre el eje posterior). Para evitar que el morro del coche se levantara durante las aceleraciones bruscas en los rodajes nocturnos, los mecánicos de producción instalaron contrapesos de plomo en el vano delantero y amortiguadores de competición reforzados."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Durante los rodajes en el desierto de Mojave para las escenas de 1885 en Regreso al Futuro Parte III, el terreno accidentado y las rocas destruyeron continuamente los bajos del coche deportivo. El equipo técnico construyó un chasis especial montado sobre el bastidor de un todoterreno Volkswagen buggy para que el coche pudiera rodar a gran velocidad sobre las vías del tren de vapor."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las barras de torsión criogénicas de las puertas de ala de gaviota del DeLorean fueron diseñadas por la compañía Grumman Aerospace. El metal era sometido a un tratamiento térmico criogénico extremo sumergiéndolo en nitrógeno líquido para fijar la estructura metalográfica de la aleación y evitar que la barra perdiera elasticidad mecánica tras miles de aperturas continuas."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m6/banner_delorean-ingenieria.webp",
    "bannerCaption": "La ingeniería real del DeLorean DMC-12: el auto que inspiro a la máquina del tiempo",
    "fact": "El DeLorean DMC-12 poseía un coeficiente de resistencia aerodinámica (Cx) de aproximadamente 0,35 a 0,37 en su versión comercial de fábrica; al instalar en el exterior las tuberías de refrigeración, bobinas magnéticas y rejillas del condensador temporal para la película, su resistencia aerodinámica empeoró drásticamente, obligando a usar motores V8 trucados para las tomas dinámicas."
  },
  {
    "id": "condensador-flujo",
    diagramImage: '/assets/bttf/infographic_m6/diagram_condensador-flujo.webp',
    diagramCaption: 'El condensador de flujo: la pieza que hace posible el viaje en el tiempo',
    "title": "El Condensador de Flujo",
    "color": "#E040FB",
    "btnImage": "/assets/bttf/infographic_maquina_tiempo/btn_condensador.webp",
    "image": "/assets/bttf/infographic_maquina_tiempo/hero_condensador.webp",
    "content": [
      "«Esto es lo que hace que los viajes en el tiempo sean posibles: el condensador de flujo», pronuncia un solemne Emmett Brown señalando una caja metálica montada entre los dos respaldos de los asientos del DeLorean. En la mitología cinematográfica, este artefacto trifásico con luces pulsantes es el corazón místico de la máquina. Aunque en la ciencia real no existe ningún dispositivo con ese nombre, el concepto condensa ideas fascinantes del electromagnetismo de altas energías y la física de condensadores.",
      "En la ingeniería eléctrica convencional, un condensador o capacitor es un componente pasivo diseñado para almacenar energía electrostática en un campo eléctrico generado entre dos placas conductoras separadas por un material aislante dieléctrico. Cuando un condensador se descarga bruscamente en un circuito oscilante RLC, es capaz de entregar potencias de pico gigantescas en fracciones de microsegundo, un principio empleado en los láseres de fusión del National Ignition Facility y en los desfibriladores médicos.",
      "La ficción cinematográfica postula que el condensador de flujo no almacena meras cargas eléctricas de electrones, sino un misterioso «flujo temporal» concentrado que se libera cuando el coche alcanza exactamente 88 millas por hora. Para alimentar este proceso, el Doc recurre inicialmente a pastillas de plutonio 239 militar que alimentan un reactor nuclear de fisión instalado en el maletero del coche, capaz de generar la colosal potencia instantánea de 1,21 gigavatios declarada por el inventor.",
      "Si interpretamos este dispositivo con los ojos de la física moderna, el condensador de flujo funcionaría de manera análoga a un generador de curvatura espaciotemporal ultraconcentrado. Para rasgar la geometría plana del espaciotiempo y abrir una garganta de tipo agujero de gusano durante una milésima de segundo en la trayectoria del vehículo, se requeriría una densidad de energía puntual equiparable a la liberada en el colapso gravitatorio de una supernova en miniatura.",
      "El diseño estético del condensador, con sus tres brazos luminosos formando una «Y» mayúscula que convergen en un punto nodal central, es una obra maestra de diseño industrial de Hollywood. Transmite visualmente al cerebro humano la idea intuitiva de líneas de fuerza que se concentran en un único punto focal, logrando que un concepto de pura fantasía científica se sienta tangible, peligroso y tecnológicamente creíble para el espectador."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La célebre caja del condensador de flujo fue fabricada por el departamento de atrezo utilizando una caja de fusibles eléctricos industriales de la marca Stahlin Enclosures. Las luces pulsantes de color ámbar y azul se consiguieron con bombillas incandescentes de salpicadero conectadas a un secuenciador electrónico casero que aceleraba el parpadeo a medida que el coche ganaba velocidad."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En electromagnetismo clásico, el término «flujo» designa formalmente la cantidad de campo magnético o eléctrico que atraviesa una superficie cerrada determinada, medido matemáticamente a través de las leyes fundamentales de Gauss y Maxwell. El flujo magnético se mide en el Sistema Internacional en webers, que equivale a voltios multiplicados por segundo."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m6/banner_condensador-flujo.webp",
    "bannerCaption": "El condensador de flujo: la pieza que hace posible el viaje en el tiempo",
    "fact": "El isótopo de plutonio 239 utilizado en la película para suministrar la energía nuclear inicial posee una vida media radiactiva de 24.110 años y emite partículas alfa de alta energía; su masa crítica para una esfera metálica desnuda sin reflector es de aproximadamente 10 kilogramos, con un diámetro de solo 10 centímetros debido a su extrema densidad física de 19,86 g/cm³."
  },
  {
    "id": "turistas-futuro",
    diagramImage: '/assets/bttf/infographic_m6/diagram_turistas-futuro.webp',
    diagramCaption: 'El turismo temporal del futuro: visitar la historia sin cambiarla',
    "title": "¿Dónde Están los Turistas?",
    "color": "#66BB6A",
    "btnImage": "/assets/bttf/infographic_maquina_tiempo/btn_turistas.webp",
    "image": "/assets/bttf/infographic_maquina_tiempo/hero_turistas.webp",
    "content": [
      "En Regreso al Futuro Parte II, Marty McFly compra un modesto libro de estadísticas deportivas en una tienda de antigüedades del año 2015 con la intención egoísta de hacerse millonario apostando en su propio tiempo. Este acto cómico toca un punto neurálgico de la física teórica y la cosmología de civilizaciones: si el ser humano inventará la máquina del tiempo en algún momento de los próximos diez mil o diez millones de años, ¿por qué no vemos a turistas del futuro pululando por nuestras ciudades históricas?",
      "Este interrogante es una variante temporal directa de la célebre paradoja de Fermi formulada por el físico Enrico Fermi en 1950 respecto a los extraterrestres: si el cosmos es tan antiguo y vasto, ¿dónde está todo el mundo? En el contexto de los viajes en el tiempo, si la tecnología para viajar al pasado llega a ser descubierta por civilizaciones avanzadas, el registro histórico de todas las épocas humanas debería estar repleto de crónicas irrefutables de visitantes con tecnologías hiperavanzadas.",
      "Los físicos teóricos ofrecen varias explicaciones rigurosas a esta aparente ausencia. La primera explicación técnica proviene de las soluciones matemáticas de agujeros de gusano de Morris y Thorne: una máquina del tiempo basada en la física de la relatividad general jamás puede viajar a una fecha anterior al momento exacto en que la máquina fue encendida y activada por primera vez. Como aún no hemos construido la primera máquina del tiempo en la Tierra, el pasado permanece cerrado para el futuro.",
      "Una segunda hipótesis proviene de la sociología de civilizaciones y la ética de la preservación histórica, similar a la directiva primaria de no interferencia de la literatura de ficción. Los viajeros del futuro podrían poseer tecnologías de invisibilidad óptica cuántica tan sofisticadas que observarían nuestros acontecimientos en modo pasivo sin interactuar físicamente ni alterar los registros materiales para evitar desencadenar cataclismos causales o ramificaciones indeseadas.",
      "La tercera posibilidad, defendida por físicos escépticos como Stephen Hawking, es mucho más tajante y desmitificadora: los turistas del futuro no están entre nosotros por la sencilla razón de que las leyes inviolables de la termodinámica, la radiación cuántica y la gravitación prohíben de forma absoluta y permanente el viaje físico de seres macroscópicos hacia el pasado, convirtiendo los saltos pretéritos en una quimera exclusivamente literaria."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El libro del almanaque deportivo Gray's Sports Almanac 1950-2000, con los resultados oficiales de cincuenta años de fútbol americano, béisbol, boxeo y carreras de caballos, es el motor dramático que destruye la línea temporal original. En el rodaje de 1989 se imprimieron decenas de copias con páginas interiores rellenas de resultados deportivos auténticos combinados con tipografías ficticias."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En física de agujeros de gusano de Lorentzian, el horizonte de Cauchy marca el instante límite en el que se forma la primera curva temporal cerrada. Los cálculos cuánticos demuestran que en ese instante exacto la radiación de vacío se amplifica hasta densidades energéticas destructivas, impidiendo que el túnel conecte con instantes previos al encendido del dispositivo."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m6/banner_turistas-futuro.webp",
    "bannerCaption": "El turismo temporal del futuro: visitar la historia sin cambiarla",
    "fact": "El 28 de junio de 2009, Stephen Hawking celebró en el Gonville and Caius College de Cambridge su fiesta para viajeros temporales con champán y canapés selectos; las invitaciones, con coordenadas GPS exactas (52° 12' 21\" N, 0° 7' 4\" E), se publicaron tras la fiesta y continúan grabadas en registros digitales a la espera de que alguien aparezca."
  },
  {
    "id": "gobernanza-temporal",
    diagramImage: '/assets/bttf/infographic_m6/diagram_gobernanza-temporal.webp',
    diagramCaption: 'La gobernanza ética del viaje temporal: leyes y organismos del futuro',
    "title": "Gobernanza del Tiempo",
    "color": "#FF7043",
    "btnImage": "/assets/bttf/infographic_maquina_tiempo/btn_gobernanza.webp",
    "image": "/assets/bttf/infographic_maquina_tiempo/hero_gobernanza.webp",
    "content": [
      "A lo largo de las tres entregas de Regreso al Futuro, el doctor Emmett Brown vive en una angustia moral permanente ante el poder destructivo de su propia creación. Advierte a Marty contra el riesgo de alterar matrimonios, ganar dinero fácil o destruir el tejido del espaciotiempo, llegando a la conclusión desgarradora de que la máquina debe ser destruida por el bien de la humanidad. Esta reflexión cinematográfica plantea un debate ético crucial: si el viaje en el tiempo fuera posible, ¿cómo debería regularse y gobernarse?",
      "La ciencia ficción ha imaginado diversas estructuras de gobernanza para administrar el tiempo: desde la «Patrulla del Tiempo» concebida por el escritor Poul Anderson hasta la compleja burocracia de la TVA en los cómics contemporáneos. Estas agencias operan con agentes temporales dedicados a monitorizar las líneas de universo, erradicar contrabandistas cronológicos y neutralizar anomalías causales que amenacen con borrar civilizaciones enteras del tapiz histórico.",
      "Desde la perspectiva de la teoría de juegos y las relaciones internacionales contemporáneas, una máquina del tiempo representaría el arma asimétrica suprema y definitiva, infinitamente más peligrosa y desestabilizadora que el arsenal termonuclear más potente. Si una nación o corporación tuviera la capacidad de viajar al pasado para sabotear el desarrollo científico, industrial o militar de sus rivales antes de que nazcan, la estabilidad geopolítica del planeta colapsaría instantáneamente.",
      "El problema de la regulación se complica aún más al considerar la economía y los derechos ontológicos fundamentales. ¿A quién pertenecería un invento o descubrimiento científico si un viajero viaja al pasado para registrarlo antes que su autor original? ¿Qué tribunal civil o penal tendría jurisdicción legal sobre un delito cometido en un siglo pretérito por una persona que biológicamente nació trescientos años después en una jurisdicción soberana inexistente en aquella época?",
      "La lección humanista que nos deja la trilogía trasciende las ecuaciones de la física relativista. En su mensaje de despedida antes de desaparecer hacia nuevas aventuras en el espaciotiempo, el Doc Brown nos recuerda que la mejor forma de gobernar el tiempo es vivir con responsabilidad moral en nuestro propio presente, comprendiendo que el futuro de la sociedad se construye con las decisiones cotidianas que tomamos en este preciso instante."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Al final de la tercera entrega cinematográfica, el DeLorean es arrollado e instantáneamente pulverizado por una locomotora de carga moderna al aparecer sobre las vías en 1985. Marty contempla los restos mecánicos destrozados con alivio y aceptación, mientras el Doc Brown le envía una carta afirmando que la máquina finalmente está donde debía estar: destruida."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En filosofía de la ciencia y metafísica temporal, la teoría del eternalismo sostiene que todos los puntos del tiempo (pasado, presente y futuro) poseen exactamente el mismo estatus ontológico de existencia real en el universo de bloque, lo que plantea dilemas éticos profundos sobre si las acciones futuras son ya inmutables o susceptibles de elección moral."
      }
    ],
    "bannerImage": "/assets/bttf/infographic_m6/banner_gobernanza-temporal.webp",
    "bannerCaption": "La gobernanza ética del viaje temporal: leyes y organismos del futuro",
    "fact": "El Tratado sobre el Espacio Ultraterrestre de las Naciones Unidas de 1967, firmado por más de 110 países para regular la exploración pacífica de la Luna y otros cuerpos celestes prohibiendo armas de destrucción masiva orbitales, es citado a menudo por juristas internacionales como el modelo normativo preliminar a seguir en caso de que la humanidad desarrolle tecnologías temporales."
  }
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TemporalField() {
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
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.5 ? '0, 229, 255' : '255, 167, 38',
      gearSize: Math.random() * 3 + 1,
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
        // Gear-like particle
        for (let j = 0; j < 6; j++) {
          const a = (j * Math.PI) / 3 + t * p.speed;
          const outerR = p.r * p.gearSize;
          ctx.lineTo(p.x + Math.cos(a) * outerR, p.y + Math.sin(a) * outerR);
          ctx.lineTo(p.x + Math.cos(a + 0.3) * p.r, p.y + Math.sin(a + 0.3) * p.r);
        }
        ctx.closePath();
        
        ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// â”€â”€â”€ Time Machine Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeMachineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FF6B35','#7C4DFF','#00E5FF','#FFA726','#E040FB','#66BB6A','#FF7043'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central gear icon */}
        <path d="M300 22 l1 2 a10 10 0 0 1 2 1 l2 -1 l2 2 l-1 2 a10 10 0 0 1 1 2 l2 1 l-2 2 l-1 2 a10 10 0 0 1 -2 1 l-2 1 l-2 -2 l-1 -2 a10 10 0 0 1 -1 -2 l-2 -1 l2 -2 z" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="10" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#00E5FF" opacity="0.5" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA MÁQUINA DEL TIEMPO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DETRÁS DE LA FICCIÓN</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (matching style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          layoutId="activeDotBttfM6"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
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
            background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none'
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}
              {/* Banner image */}
              {node.bannerImage && (
                <div className="mt-4 rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={node.bannerImage}
                    alt={node.bannerCaption || node.title}
                    className="w-full object-cover"
                    style={{ maxHeight: '220px' }}
                  />
                  {node.bannerCaption && (
                    <p className="text-xs text-center text-white/50 py-1 px-2 bg-black/20">
                      {node.bannerCaption}
                    </p>
                  )}

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

                </div>
              )}

        {/* â”€â”€â”€ Fact Box â”€â”€â”€ */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '1.5rem',
            padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}
        >
          <Sparkles size={24} color={node.color} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            {node.fact}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ visited, total }) {
  const progress = (visited.length / total) * 100;
  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
        <span>Progreso de Exploración</span>
        <span>{visited.length} / {total} Completado</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #00E5FF, #FF6B35)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_BttfM6() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!visitedNodes.includes(id)) {
      setVisitedNodes(prev => [...prev, id]);
    }
  };

  const allCompleted = visitedNodes.length === INFOGRAPHIC_NODES.length;

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: 'url(/assets/bttf/infographic_maquina_tiempo/bg_maquina_tiempo.png) center/cover',
      position: 'relative',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '2rem 1rem',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%)',
        zIndex: 1,
      }} />

      <TemporalField />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: '1100px', margin: '0 auto',
        border: '1px solid rgba(0,229,255,0.12)',
        borderRadius: '24px',
        padding: '2rem',
        background: 'rgba(10, 12, 30, 0.4)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,229,255,0.05)',
      }}>
        <TimeMachineHeader />
        
        <ProgressBar visited={visitedNodes} total={INFOGRAPHIC_NODES.length} />

        {!activeNode && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '2rem' }}
          >
            Toca cada círculo para explorar
          </motion.p>
        )}

        {/* Nodes Grid */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              onClick={() => handleNodeClick(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeNode && (
            <ContentPanel
              key={activeNode}
              node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
              onClose={() => setActiveNode(null)}
              setLightboxSrc={setLightboxSrc}
            />
          )}
        </AnimatePresence>

        {/* Completion Message */}
        <AnimatePresence>
          {allCompleted && !activeNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                marginTop: '3rem', padding: '2rem',
                background: 'linear-gradient(135deg, rgba(0,229,255,0.1), rgba(255,107,53,0.1))',
                borderRadius: '16px', border: '1px solid rgba(0,229,255,0.2)',
                textAlign: 'center',
              }}
            >
              <h4 style={{ color: '#00E5FF', margin: '0 0 1rem', fontSize: '1.5rem' }}>
                ðŸ† ¡Has dominado los secretos de la Máquina del Tiempo!
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                Has explorado toda la ciencia detrás de las máquinas del tiempo. ¿Estás listo para poner a prueba tus conocimientos?
              </p>
              <button style={{
                padding: '0.8rem 2rem', background: '#00E5FF', color: '#0B0E2D',
                border: 'none', borderRadius: '30px', fontWeight: 'bold',
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 0 15px rgba(0,229,255,0.4)'
              }}>
                Ir al Quiz Final <ChevronRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bibliography */}
        <div style={{ marginTop: '4rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          <h5 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: '0 0 1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes Científicas y Bibliografía
          </h5>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((item, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#00E5FF', opacity: 0.5 }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
