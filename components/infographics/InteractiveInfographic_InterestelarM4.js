'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Alert/Surveillance themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoRadar({ size = 70, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.8" />
      <line x1="30" y1="30" x2="30" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M 30 30 L 47 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M 30 30 L 13 47" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Radar sweep wedge */}
      <path d="M 30 30 L 30 6 A 24 24 0 0 1 47 13 Z" fill={color} opacity="0.15" />
      <circle cx="20" cy="15" r="2" fill={color} opacity="0.9" />
      <circle cx="45" cy="40" r="1.5" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoAlert({ size = 70, color = '#F44336', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 30 5 L 5 50 L 55 50 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8" />
      <path d="M 30 15 L 12 47 L 48 47 Z" fill={color} opacity="0.1" />
      <line x1="30" y1="22" x2="30" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
      <circle cx="30" cy="44" r="2.5" fill={color} opacity="0.9" />
      {/* Pulse rings */}
      <path d="M 30 2 L 2 52 L 58 52 Z" fill="none" stroke={color} strokeWidth="1" strokeLinejoin="round" opacity="0.3" />
      <path d="M 30 -1 L -1 54 L 61 54 Z" fill="none" stroke={color} strokeWidth="0.5" strokeLinejoin="round" opacity="0.1" />
    </svg>
  );
}

function DecoSatellite({ size = 70, color = '#2196F3', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Solar panels */}
      <rect x="5" y="25" width="15" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <rect x="40" y="25" width="15" height="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      {/* Panel grids */}
      <line x1="10" y1="25" x2="10" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="15" y1="25" x2="15" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="45" y1="25" x2="45" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="50" y1="25" x2="50" y2="35" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Central body */}
      <rect x="22" y="20" width="16" height="20" fill="none" stroke={color} strokeWidth="2" opacity="0.9" />
      <rect x="24" y="22" width="12" height="16" fill={color} opacity="0.2" />
      {/* Antenna */}
      <path d="M 30 20 L 30 5 L 25 5 L 35 5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" strokeLinejoin="round" />
      {/* Signal waves */}
      <path d="M 20 8 A 12 12 0 0 1 40 8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <path d="M 15 3 A 18 18 0 0 1 45 3" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function DecoDataStream({ size = 70, color = '#00ACC1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <line x1="10" y1="5" x2="10" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" strokeDasharray="4 4" />
      <line x1="10" y1="35" x2="10" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" strokeDasharray="2 6" />
      
      <line x1="25" y1="15" x2="25" y2="55" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" strokeDasharray="8 4 2 4" />
      
      <line x1="40" y1="5" x2="40" y2="45" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" strokeDasharray="6 2 2 2" />
      
      <line x1="55" y1="20" x2="55" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" strokeDasharray="3 3" />
      
      {/* Data nodes */}
      <rect x="8" y="28" width="4" height="4" fill={color} opacity="0.8" />
      <rect x="23" y="8" width="4" height="4" fill={color} opacity="0.9" />
      <rect x="38" y="50" width="4" height="4" fill={color} opacity="0.7" />
      <rect x="53" y="12" width="4" height="4" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoLens({ size = 70, color = '#9C27B0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Outer rim */}
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="30" r="28" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" strokeDasharray="2 4" />
      {/* Lens reflection/curvature */}
      <path d="M 12 18 A 20 20 0 0 1 42 18" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <path d="M 15 24 A 15 15 0 0 1 35 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.2" />
      {/* Crosshairs */}
      <line x1="30" y1="4" x2="30" y2="15" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <line x1="30" y1="45" x2="30" y2="56" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <line x1="4" y1="30" x2="15" y2="30" stroke={color} strokeWidth="1.5" opacity="0.8" />
      <line x1="45" y1="30" x2="56" y2="30" stroke={color} strokeWidth="1.5" opacity="0.8" />
      {/* Central focus */}
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.9" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'sistema-atlas': [DecoRadar, DecoSatellite, DecoDataStream],
  'deteccion-automatica': [DecoDataStream, DecoAlert, DecoLens],
  'candidatos-interestelares': [DecoRadar, DecoLens, DecoAlert],
  'falsos-positivos': [DecoAlert, DecoDataStream, DecoLens],
  'velocidad-deteccion': [DecoRadar, DecoAlert, DecoDataStream],
  'lsst-vera-rubin': [DecoLens, DecoSatellite, DecoRadar],
  'red-global-vigilancia': [DecoSatellite, DecoDataStream, DecoAlert],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Tonry, J.L. et al. (2018). "ATLAS: A High-Cadence All-Sky Survey System", PASP, 130',
  'IveziÄ‡, Å½. et al. (2019). "LSST: From Science Drivers to Reference Design", ApJ, 873',
  'Engelhardt, T. et al. (2017). "An Observational Upper Limit on the Interstellar Number Density of Asteroids and Comets", AJ, 153',
  'Trilling, D. et al. (2017). "Implications for Planetary System Formation from Interstellar Object 1I/2017 U1", ApJ Letters, 850',
  'Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "sistema-atlas",
    "title": "El Sistema ATLAS",
    "color": "#66BB6A",
    "btnImage": "/assets/interestelar/infographic_m4/btn_sistema-atlas.jpg",
    "image": "/assets/interestelar/infographic_m4/hero_sistema-atlas.jpg",
    "content": [
      "El Sistema de Última Alerta de Impacto Terrestre de Asteroides, conocido formalmente por su acrónimo en inglés ATLAS (Asteroid Terrestrial-impact Last Alert System), es una infraestructura de vigilancia astronómica desarrollada por la Universidad de Hawái con financiamiento directo de la Oficina de Coordinación de Defensa Planetaria de la NASA. Su diseño óptico automatizado permite escanear el cielo cada noche con una eficiencia excepcional.",
      "El proyecto se diseñó con un propósito primordial: escanear ininterrumpidamente la totalidad de la bóveda celeste visible varias veces por semana para identificar objetos celestes en movimiento rápido antes de que puedan colisionar contra la Tierra o perderse en la inmensidad del espacio profundo. Gracias a sus telescopios de amplio campo, puede alertar con días o semanas de antelación sobre pequeños asteroides y cuerpos errantes.",
      "Inicialmente, el sistema constaba de dos telescopios gemelos automatizados ubicados en cimas estratégicas del archipiélago hawaiano: uno en la cumbre del volcán Haleakala en la isla de Maui y el segundo en el Observatorio de Maunaloa en la isla grande de Hawái. Esta disposición insular ofrecía cielos nocturnos con extraordinaria transparencia atmosférica.",
      "Para transformar ATLAS en un escudo de vigilancia planetaria ininterrumpida de veinticuatro horas, la red se expandió hacia el hemisferio sur con la instalación de dos estaciones idénticas adicionales: una en el Observatorio Astronómico de Sudáfrica en Sutherland y otra en el Observatorio El Sauce en la región de Coquimbo en Chile. Esta cobertura global de cuatro estaciones complementa los hemisferios norte y sur sin interrupciones estacionales ni desfases horarios.",
      "Cada una de las cuatro unidades está equipada con un telescopio reflector de cincuenta centímetros de apertura dotado de óptica Schmidt-Wright ultrarrápida f/2. Esta configuración óptica avanzada permite abarcar un campo visual inmenso de casi treinta grados cuadrados por disparo, equivalente al área de más de cien Lunas llenas proyectadas sobre el firmamento."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los telescopios de ATLAS no tienen operadores humanos mirando por oculares por la noche. Sus cúpulas abren automáticamente al ocultarse el Sol si las estaciones meteorológicas confirman la ausencia de nubes o lluvia, apuntan de manera robótica, procesan gigabytes de datos en segundos y envían alertas al instante sin intervención humana."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Cada estación de ATLAS utiliza una cámara CCD masiva de 110 megapíxeles enfriada criogénicamente que alcanza una magnitud límite de 19.5 en una exposición simple de treinta segundos. Esta sensibilidad instrumental permite detectar asteroides de cien metros de diámetro a distancias superiores a cuatro millones de kilómetros."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m4/banner_sistema-atlas.webp",
    "bannerCaption": "Sistema ATLAS: cubre el cielo completo dos veces por noche buscando objetos de movimiento rápido",
    "fact": "La red de cuatro telescopios robotizados del sistema ATLAS inspecciona el firmamento nocturno completo cada 24 horas desde Hawái, Sudáfrica y Chile. Su campo de visión de 30 grados cuadrados por toma y su procesamiento digital instantáneo la convierten en una de las mayores plataformas mundiales de detección de intrusos interestelares."
  },
  {
    "id": "deteccion-automatica",
    "title": "Detección Automática",
    "color": "#F44336",
    "btnImage": "/assets/interestelar/infographic_m4/btn_deteccion-automatica.jpg",
    "image": "/assets/interestelar/infographic_m4/hero_deteccion-automatica.jpg",
    "content": [
      "El volumen de datos digitales generado por los sensores de sondeos astronómicos modernos supera ampliamente la capacidad de análisis visual de cualquier equipo de astrónomos humanos. Cada noche de observación despejada produce decenas de miles de imágenes de alta resolución que contienen cientos de millones de estrellas y galaxias de fondo. Por esta razón, el procesamiento automatizado mediante redes neuronales y algoritmos de visión artificial resulta imprescindible.",
      "Para identificar objetos en movimiento entre esa marea de luz estelar, los sistemas informáticos de ATLAS y Pan-STARRS recurren a algoritmos avanzados de sustracción digital de imágenes. El método consiste en tomar una fotografía astronómica del cielo nocturno y restarle píxel a píxel una plantilla estelar de referencia calibrada previamente del mismo sector cósmico.",
      "Al restar digitalmente la imagen de referencia, todas las estrellas fijas, nebulosas y galaxias lejanas con brillo constante se cancelan matemáticamente de la ecuación, dejando un fondo negro uniforme. Si en la nueva fotografía aparece un cuerpo que ha cambiado de posición o un punto con brillo variable, este resalta de inmediato como un residuo positivo.",
      "Para verificar que el punto detectado no sea un defecto térmico de la cámara, un rayo cósmico ionizante o un satélite artificial en órbita baja, el telescopio toma cuatro exposiciones consecutivas separadas por intervalos de doce a quince minutos. Los algoritmos de seguimiento cinemático buscan agrupaciones de detecciones que sigan una línea recta coherente en el plano del cielo.",
      "Una vez que el software confirma la presencia de un rastro cinemático genuino, genera de forma completamente autónoma un paquete de datos astrométricos denominado tracklet. Este registro incluye las coordenadas ecuatoriales de ascensión recta y declinación junto con la fecha y hora exacta con precisión de milisegundos. Este paquete se envía de inmediato al Centro de Planetas Menores (MPC) para su distribución en red a observatorios de todo el mundo."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Antes de la llegada de las computadoras modernas, los astrónomos como Clyde Tombaugh descubrieron Plutón usando un microscopio de parpadeo manual. Miraban con sus propios ojos a través de una lente alternando mecánicamente dos placas de vidrio fotográficas para ver qué diminuto punto se movía entre miles de estrellas fijas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los algoritmos de sustracción digital utilizan el método de convolución matemática de Alard y Lupton, adaptando la función de dispersión de punto (PSF) de cada imagen para compensar las fluctuaciones en la turbulencia atmosférica local entre la imagen nueva y la plantilla estelar histórica, minimizando los artefactos ópticos espurios y falsas alarmas provocadas por el parpadeo de las estrellas."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m4/banner_deteccion-automatica.webp",
    "bannerCaption": "Detección automática: IA clasifica millones de detecciones nocturnas para encontrar objetos inusuales",
    "fact": "Los algoritmos de sustracción digital de imágenes procesan cuatro exposiciones consecutivas en menos de cinco minutos por campo celeste. Al restar la plantilla estelar de referencia, el software aísla automáticamente cualquier fuente móvil de luz, generando tracklets astrométricos que se envían al Minor Planet Center de la IAU sin intervención humana."
  },
  {
    "id": "candidatos-interestelares",
    "title": "Candidatos a 3I",
    "color": "#FF9800",
    "btnImage": "/assets/interestelar/infographic_m4/btn_candidatos-interestelares.jpg",
    "image": "/assets/interestelar/infographic_m4/hero_candidatos-interestelares.jpg",
    "content": [
      "Tras los descubrimientos históricos de 1I/'Oumuamua en 2017 y de 2I/Borisov en 2019, la comunidad astronómica mundial entró en una fase de intensa búsqueda permanente del codiciado tercer visitante interestelar oficial, cuyo nombre técnico en el catálogo formal será 3I. Los astrónomos proyectan que decenas de estos objetos cruzan el sistema solar interior cada año, esperando ser detectados por los nuevos sondeos de alta sensibilidad.",
      "Casi todas las semanas, los sistemas de sondeo automatizados detectan objetos que ingresan en la página de confirmación de objetos cercanos a la Tierra (NEOCP) con soluciones orbitales preliminares que exhiben excentricidades ligeramente superiores a 1.0. Estos hallazgos suscitan de inmediato una gran expectación en observatorios profesionales de todo el mundo.",
      "Sin embargo, otorgar la designación formal de objeto interestelar requiere superar rigurosos filtros científicos establecidos por la Unión Astronómica Internacional. Una excentricidad hiperbólica aparente en un arco de observación muy corto de apenas unas horas suele ser un artefacto matemático originado por errores instrumentales en las coordenadas.",
      "Varios candidatos prometedores han acaparado titulares mediáticos internacionales antes de ser desclasificados. Un caso célebre fue el bólido CNEOS 2014-01-08, denominado informalmente IM1, un meteoro registrado por sensores del Departamento de Defensa de los Estados Unidos que impactó en la atmósfera terrestre cerca de Papúa Nueva Guinea a una velocidad heliocéntrica estimada en más de cuarenta kilómetros por segundo.",
      "Aunque algunos astrofísicos argumentaron que la velocidad de impacto de IM1 demostraba un origen foráneo al sistema solar, la comunidad de expertos en dinámicas de meteoros expresó serias reservas debido a la falta de incertidumbres calibradas en los sensores militares originales. La Unión Astronómica Internacional no otorga designaciones «I» sin datos de seguimiento astrométrico telescópico verificables."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El catálogo oficial de la IAU solo tiene dos miembros: 1I/'Oumuamua y 2I/Borisov. El puesto para «3I» permanece vacante y reservado en las bases de datos mundiales, esperando al próximo cuerpo celeste que demuestre con mediciones irrefutables haber nacido alrededor de otra estrella de nuestra galaxia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Para que el Minor Planet Center otorgue una designación de clase «I», el objeto debe contar con al menos varias docenas de observaciones astrométricas independientes distribuidas en un arco temporal suficiente para reducir el error de la excentricidad orbital calculada a un nivel de significancia estadística superior a 5 sigma."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m4/banner_candidatos-interestelares.webp",
    "bannerCaption": "Candidatos interestelares: distinguir verdaderos visitantes de objetos del sistema solar perturbados",
    "fact": "La adjudicación de la designación oficial 3I exige que el candidato cuente con un arco observacional multi-nocturno que descarte errores de medición y confirme una excentricidad e > 1 respecto al baricentro del sistema solar. Hasta la fecha, candidatos polémicos como el bólido CNEOS 2014-01-08 no han cumplido los criterios formales de la IAU."
  },
  {
    "id": "falsos-positivos",
    "title": "Trampas de Júpiter",
    "color": "#00ACC1",
    "btnImage": "/assets/interestelar/infographic_m4/btn_falsos-positivos.jpg",
    "image": "/assets/interestelar/infographic_m4/hero_falsos-positivos.jpg",
    "content": [
      "Uno de los desafíos matemáticos más delicados en la identificación de verdaderos visitantes interestelares es la existencia de falsos positivos dinámicos ocasionados por la influencia gravitatoria colosal del planeta Júpiter. Este fenómeno físico es conocido coloquialmente entre los astrodinámicos como las trampas gravitatorias de Júpiter. Estos encuentros pueden desviar asteroides ordinarios y simular erróneamente trayectorias hiperbólicas externas.",
      "Cuando un cometa ordinario procedente de los confines de la nube de Oort se aproxima hacia el sistema solar interior en una órbita elíptica alargada ligada gravitacionalmente al Sol con una excentricidad original de 0.999, puede experimentar un encuentro cercano accidental con el gigante gaseoso Júpiter. Esta aproximación crítica perturba radicalmente sus parámetros orbitales, alterando su velocidad relativa y dirección en el espacio interplanetario.",
      "La enorme masa del planeta gigante, que equivale a más de trescientas veces la masa de la Tierra, puede transferir una fracción significativa de su propio momento orbital al cometa mediante el mecanismo de asistencia gravitatoria o efecto honda. Esta interacción de tres cuerpos acelera al cometa, incrementando su energía cinética específica. Como resultado directo, la excentricidad orbital calculada puede superar temporalmente el valor unitario de 1.0.",
      "Como consecuencia directa de este empujón gravitatorio, la excentricidad de la órbita heliocéntrica instantánea del cometa puede superar el valor crítico de 1.0, alcanzando cifras de 1.01 o 1.05. Si un telescopio terrestre descubre al objeto justo después de esta interacción, los parámetros preliminares indicarán erróneamente que se trata de un cuerpo hiperbólico foráneo.",
      "Para desenmascarar estas ilusiones dinámicas, los astrofísicos no calculan la trayectoria respecto al centro físico del Sol, sino respecto al baricentro del sistema solar, que es el centro común de masa de todos los planetas y el Sol combinados. Luego integran las ecuaciones orbitales hacia atrás en el tiempo a lo largo de décadas o siglos. Si la energía orbital previa al encuentro con Júpiter era negativa, el objeto se descarta como verdadero visitante interestelar."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El planeta Júpiter funciona como un colosal cañón gravitatorio en nuestro sistema solar. A lo largo de la historia cósmica ha arrojado miles de millones de cometas nativos al medio interestelar, enviándolos como falsos visitantes a otros sistemas estelares lejanos donde confundirán a los astrónomos de otros mundos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La diferencia entre la excentricidad heliocéntrica y la baricéntrica puede alcanzar hasta 0.05 unidades debido a la oscilación periódica del Sol alrededor del centro de masas del sistema solar, impulsada principalmente por el movimiento orbital de Júpiter y Saturno a distancias de entre 5 y 10 unidades astronómicas."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m4/banner_falsos-positivos.webp",
    "bannerCaption": "Falsos positivos: el desgasamiento cometario puede simular órbitas hiperbólicas engañando a los detectores",
    "fact": "Muchos cometas locales alcanzan excentricidades heliocéntricas temporales superiores a e = 1.0 tras sufrir una asistencia gravitatoria con Júpiter. Para clasificarlos correctamente, los astrónomos calculan la órbita baricéntrica original hacia el pasado, verificando si el cuerpo ya estaba confinado en el sistema solar antes del encuentro planetario."
  },
  {
    "id": "velocidad-deteccion",
    "title": "La Necesidad de Velocidad",
    "color": "#9C27B0",
    "btnImage": "/assets/interestelar/infographic_m4/btn_velocidad-deteccion.jpg",
    "image": "/assets/interestelar/infographic_m4/hero_velocidad-deteccion.jpg",
    "content": [
      "En la astronomía de cuerpos interestelares, el tiempo de respuesta es el factor más implacable y determinante. A diferencia de los asteroides del cinturón principal que orbitan pacientemente alrededor del Sol durante miles de millones de años, un visitante interestelar cruza la zona observable de nuestro sistema planetario en cuestión de pocas semanas.",
      "Estos objetos se desplazan a velocidades relativas extraordinarias que superan holgadamente los treinta a cincuenta kilómetros por segundo. Cuando un telescopio automático de gran campo detecta por primera vez a un intruso interestelar, este suele encontrarse ya en su punto de máxima proximidad o alejándose rápidamente hacia las tinieblas cósmicas.",
      "Cada día de demora en realizar observaciones de seguimiento provoca que la elipse de incertidumbre matemática sobre su posición en el cielo se multiplique de forma geométrica. Si los telescopios terrestres no reaccionan en un lapso de veinticuatro a cuarenta y ocho horas, el objeto puede desvanecerse para siempre sin que se logren caracterizar sus propiedades físicas.",
      "La rapidez en la confirmación es indispensable para planificar mediciones complejas con grandes observatorios como el Very Large Telescope, el Observatorio Keck o el Telescopio Espacial James Webb. Obtener tiempo de observación urgente mediante protocolos de interrupción de objetivos de oportunidad requiere una justificación astrométrica impecable.",
      "Además, la ventana óptima para estudiar la composición química de los hielos y la presencia de desgasificación activa ocurre exclusivamente cuando el objeto se encuentra dentro de la línea de congelación del agua, a menos de tres unidades astronómicas del Sol, donde el calor estelar sublima sus capas volátiles superficiales. Fuera de esta frontera térmica helada, los cometas apagan su actividad y se vuelven demasiado tenues para los espectrógrafos terrestres."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Con 'Oumuamua, los astrónomos perdieron casi todo el perihelio porque el objeto pasó por detrás del Sol antes de ser descubierto cuando ya se alejaba. La comunidad científica aprendió una lección crucial: unos pocos días de retraso en la detección pueden significar perder el 90 por ciento de los datos más valiosos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El flujo lumínico aparente de un cuerpo celeste que se aleja en una trayectoria hiperbólica decae con una función proporcional a 1 sobre la distancia al Sol al cuadrado multiplicada por la distancia a la Tierra al cuadrado (1 / r²Δ²), lo que reduce su brillo en varias magnitudes en cuestión de días."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m4/banner_velocidad-deteccion.webp",
    "bannerCaption": "El desafío de la velocidad: los visitantes huyen antes de que los detectemos, tenemos horas para reaccionar",
    "fact": "Debido a velocidades cinemáticas de entre 30 y 60 km/s, la luminosidad de un objeto interestelar en retirada decae exponencialmente según la ley 1/(r²Δ²). Una demora de solo 48 horas en la confirmación astrométrica puede duplicar el área de incertidumbre orbital y dejarlo fuera del alcance de los mayores telescopios ópticos del mundo."
  },
  {
    "id": "lsst-vera-rubin",
    "title": "Telescopio Vera Rubin",
    "color": "#2196F3",
    "btnImage": "/assets/interestelar/infographic_m4/btn_lsst-vera-rubin.jpg",
    "image": "/assets/interestelar/infographic_m4/hero_lsst-vera-rubin.jpg",
    "content": [
      "La próxima gran revolución en la detección y estudio sistemático de visitantes interestelares tiene nombre propio: el Observatorio Vera C. Rubin, una colosal instalación astronómica construida sobre el cerro Pachón en la cordillera de los Andes chilenos, financiada conjuntamente por la Fundación Nacional de Ciencias y el Departamento de Energía de Estados Unidos.",
      "El observatorio alberga el telescopio de sondeo sinóptico de 8.4 metros de apertura dotado de un diseño óptico de tres espejos curvos extraordinariamente compacto que proporciona un campo de visión de diez grados cuadrados, complementado con la cámara digital astronómica más grande y compleja construida jamás en la historia de la humanidad. Esta formidable configuración óptica permite capturar un área celeste equivalente a cuarenta lunas llenas en una sola exposición.",
      "Esta cámara titánica posee una resolución física de 3.200 megapíxeles (3.2 gigapíxeles) y está integrada por un mosaico de 189 sensores CCD de silicio enfriados criogénicamente a cien grados bajo cero. Su tamaño es comparable al de un automóvil utilitario y su peso total supera las tres toneladas de ingeniería optomecánica de vanguardia. Su sensibilidad extrema es capaz de detectar fuentes astronómicas con un brillo millones de veces inferior al límite del ojo humano.",
      "A través de su programa insignia, el Legacy Survey of Space and Time (LSST), el telescopio Vera Rubin fotografiará todo el cielo del hemisferio sur cada tres o cuatro noches consecutivas durante una década completa. Cada imagen capturará detalles con una magnitud límite de 24.5, una sensibilidad fotométrica millones de veces superior a la visión humana.",
      "Los modelos estadísticos de población astrofísica predicen que el LSST no encontrará uno o dos visitantes aislados por década, sino que descubrirá entre cinco y varias decenas de objetos interestelares cada año. Esta abundancia de detecciones transformará el estudio de intrusos extrasolares de casos anecdóticos aislados en una ciencia demográfica rigurosa."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La lente óptica frontal de la cámara del telescopio Vera Rubin mide más de 1.5 metros de diámetro y fue certificada por el Libro Guinness de los Récords como la lente óptica individual más grande construida por la humanidad para un instrumento científico en toda la historia de la tecnología, pulida con precisión óptica nanométrica para evitar cualquier aberración esférica en las imágenes."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El sondeo LSST generará aproximadamente quince terabytes de datos brutos cada noche de observación, produciendo cerca de diez millones de alertas de fuentes transitorias o variables por noche que serán procesadas y distribuidas a la comunidad astronómica en menos de sesenta segundos por evento, impulsando una revolución masiva en el análisis astrofísico en tiempo real."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m4/banner_lsst-vera-rubin.webp",
    "bannerCaption": "Vera Rubin LSST: el telescopio que detectará un objeto interestelar por año desde 2025",
    "fact": "El Observatorio Vera C. Rubin en Chile, equipado con un espejo de 8.4 metros y la cámara digital astronómica más grande del mundo de 3.2 gigapíxeles, iniciará el sondeo LSST con capacidad de alcanzar magnitud 24.5. Se proyecta que descubrirá decenas de objetos interestelares por año, revolucionando la astronomía observacional."
  },
  {
    "id": "red-global-vigilancia",
    "title": "La Red Global",
    "color": "#FDD835",
    "btnImage": "/assets/interestelar/infographic_m4/btn_red-global-vigilancia.jpg",
    "image": "/assets/interestelar/infographic_m4/hero_red-global-vigilancia.jpg",
    "content": [
      "La protección de nuestro planeta contra impactos cósmicos y la búsqueda de mensajeros de otros mundos no depende del esfuerzo solitario de una única nación o telescopio, sino de una intrincada y coordinada arquitectura internacional conocida como la Red Internacional de Alerta de Asteroides (IAWN, por sus siglas en inglés). Esta alianza congrega observatorios profesionales, agencias espaciales y científicos de los cinco continentes bajo los auspicios de la ONU.",
      "Esta red opera bajo el patrocinio formal de la Oficina de Asuntos del Espacio Ultraterrestre de las Naciones Unidas (UNOOSA) y articula a las principales agencias espaciales del planeta, incluyendo a la NASA, la Agencia Espacial Europea (ESA), la Agencia Japonesa de Exploración Aeroespacial (JAXA) y decenas de observatorios universitarios de todos los continentes.",
      "Dentro de este engranaje internacional, los grandes sistemas de escaneo de campo amplio como ATLAS en Hawái, Chile y Sudáfrica, Pan-STARRS en Maui y el Catalina Sky Survey en las montañas de Arizona actúan como los ojos exploradores de vanguardia, barriendo miles de grados cuadrados de cielo en busca de fuentes anómalas. Cada alerta generada activa telescopios de seguimiento de mayor tamaño como el VLT en Paranal o el Keck en Mauna Kea para caracterizar el objeto.",
      "Cuando alguno de estos sondeos detecta un candidato hiperbólico o un objeto potencialmente peligroso, la información fluye al instante hacia las estaciones de seguimiento astrométrico de alta precisión, que incluyen telescopios ópticos de gran apertura, observatorios de seguimiento rápido en Europa y Asia, y las estaciones de radar planetario de Goldstone.",
      "Esta sinergia global garantiza una vigilancia continua sin puntos ciegos temporales provocados por la rotación de la Tierra. Si el cielo se nubla en el desierto de Atacama en Chile o amanece sobre el océano Pacífico, telescopios gemelos ubicados en Sudáfrica, Australia o las Islas Canarias toman el relevo de forma inmediata y automática. De este modo, ningún objeto con trayectoria de interés crítico pasa desapercibido por falta de cobertura observacional."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La red de defensa planetaria tiene acuerdos formales para que los astrónomos puedan solicitar la interrupción inmediata de observaciones rutinarias en los mayores telescopios del mundo en caso de descubrir un objeto hiperbólico con rumbo de colisión o de extraordinario valor científico, permitiendo reorientar espejos de ocho a diez metros hacia el objetivo en cuestión de minutos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La Red Internacional de Alerta de Asteroides (IAWN) y el Grupo Asesor de Planificación de Misiones Espaciales (SMPAG) coordinan protocolos respaldados por la ONU que integran mediciones astrométricas de más de sesenta observatorios acreditados en veinticinco países diferentes, garantizando una respuesta coordinada ante cualquier peligro astronómico inminente para la Tierra."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m4/banner_red-global-vigilancia.webp",
    "bannerCaption": "Red global de vigilancia: telescopios en todo el mundo comparten datos en tiempo real para no perder visitantes",
    "fact": "La Red Internacional de Alerta de Asteroides (IAWN), avalada por la ONU, articula observatorios en 25 países coordinando a ATLAS, Pan-STARRS y el Catalina Sky Survey. Esta red global garantiza seguimiento continuo las 24 horas del día sin interrupciones por rotación terrestre, asegurando la detección oportuna de objetos hiperbólicos."
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
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '244,67,54' : '33,150,243', // red or blue
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

// â”€â”€â”€ Themed Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SurveillanceHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(244,67,54,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#alertGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 network markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#66BB6A','#F44336','#FF9800','#00ACC1','#9C27B0','#2196F3','#FDD835'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central radar icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#F44336" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#F44336" opacity="0.5" />
        <path d="M 300 30 L 310 20" stroke="#F44336" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 300 30 L 300 16 A 14 14 0 0 1 310 20 Z" fill="#F44336" opacity="0.2" />
        <defs>
          <linearGradient id="alertGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(244,67,54,0.2)" />
            <stop offset="50%" stopColor="rgba(244,67,54,0.9)" />
            <stop offset="100%" stopColor="rgba(244,67,54,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#F44336" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ATLAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(244,67,54,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA RED DE VIGILANCIA CÓSMICA</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.2)'}`,
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
          layoutId="activeDotInterestelarM4"
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

// â”€â”€â”€ Expandable Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€â”€ Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* Hero Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
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

      {/* Body */}
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

        {/* Expandables */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              textTransform: 'uppercase', letterSpacing: '1px',
            }}>
              <Star size={16} /> Exploración Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* Fact Block */}
        {/* --- Banner Image --- */}
        {node.bannerImage && (
          <div style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
            position: 'relative',
            zIndex: 2
          }}>
            <img
              src={node.bannerImage}
              alt={node.bannerCaption || node.title}
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }}
              loading="lazy"
            />
            {node.bannerCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', marginTop: '0.4rem', fontStyle: 'italic' }}>
                {node.bannerCaption}
              </p>
            )}
          </div>
        )}

        {node.fact && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: `linear-gradient(135deg, ${node.color}15, ${node.color}05)`,
              borderRadius: '16px',
              border: `1px solid ${node.color}40`,
              display: 'flex',
              gap: '1.2rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: `0 0 15px ${node.color}50`,
            }}>
              <Sparkles size={20} color="#0B0E2D" />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1rem', fontWeight: 800 }}>Dato Curioso</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                {node.fact}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM4() {
  const [activeNode, setActiveNode] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const handleNodeClick = (id) => {
    setActiveNode(activeNode === id ? null : id);
    if (!explored.has(id)) {
      setExplored(new Set(explored).add(id));
    }
  };

  const progress = Math.round((explored.size / INFOGRAPHIC_NODES.length) * 100);

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      background: '#050714',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      position: 'relative',
      overflow: 'hidden',
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <TemporalField />
      
      <SurveillanceHeader />

      <div style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '100px',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        backdropFilter: 'blur(10px)',
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

      <div style={{
        position: 'relative', zIndex: 2,
        height: '4px', background: 'rgba(255,255,255,0.1)',
        borderRadius: '4px', overflow: 'hidden',
        marginBottom: '1rem',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{ height: '100%', background: '#F44336', boxShadow: '0 0 10px #F44336' }}
        />
      </div>
      <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
        Progreso de la misión: {progress}%
      </div>

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

      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: '0.8rem',
        color: 'rgba(255,255,255,0.5)',
        position: 'relative',
        zIndex: 2,
      }}>
        <h5 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.7)' }}>REFERENCIAS CIENTÍFICAS (MÓDULO 4)</h5>
        <ul style={{ margin: 0, paddingLeft: '1.2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i}>{ref}</li>
          ))}
        </ul>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
