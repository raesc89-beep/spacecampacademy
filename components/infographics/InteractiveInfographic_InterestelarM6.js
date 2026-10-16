'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Voyager themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoVoyager({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 22 L30 5 L35 5" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 30 L5 30 L5 35" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <line x1="15" y1="15" x2="24" y2="24" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="45" y1="45" x2="36" y2="36" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 38 22 Q 45 15 50 10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="50" cy="10" r="2" fill={color} />
    </svg>
  );
}

function DecoGoldenRecord({ size = 70, color = '#FF8A65', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.7" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.8" />
      <path d="M30 6 L30 10" stroke={color} strokeWidth="2" />
      <path d="M54 30 L50 30" stroke={color} strokeWidth="2" />
      <path d="M30 54 L30 50" stroke={color} strokeWidth="2" />
      <path d="M6 30 L10 30" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoPlanetFlyby({ size = 70, color = '#2979FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="15" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="30" rx="25" ry="8" fill="none" stroke={color} strokeWidth="1.5" transform="rotate(20 30 30)" />
      <path d="M 5 50 Q 20 45 30 30 T 55 10" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
      <circle cx="55" cy="10" r="2" fill={color} />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoAntenna({ size = 70, color = '#90A4AE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M 10 20 Q 30 5 50 20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 15 25 Q 30 15 45 25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 20 30 Q 30 25 40 30" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="10" x2="30" y2="50" stroke={color} strokeWidth="2" />
      <line x1="25" y1="50" x2="35" y2="50" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="10" r="2" fill={color} />
    </svg>
  );
}

function DecoRTG({ size = 70, color = '#00E676', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="20" y="15" width="20" height="30" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="25" x2="45" y2="25" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="30" x2="45" y2="30" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="35" x2="45" y2="35" stroke={color} strokeWidth="1" opacity="0.6" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="15" r="2" fill={color} />
      <path d="M 30 5 L 30 15" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

const DECO_MAP = {
  'lanzamiento-1977': [DecoVoyager, DecoPlanetFlyby, DecoAntenna],
  'gran-tour-planetario': [DecoPlanetFlyby, DecoVoyager, DecoRTG],
  'disco-de-oro': [DecoGoldenRecord, DecoAntenna, DecoVoyager],'heliopausa-cruce': [DecoVoyager, DecoAntenna, DecoPlanetFlyby],
  'espacio-interestelar': [DecoAntenna, DecoVoyager, DecoGoldenRecord],'energia-plutonio': [DecoRTG, DecoVoyager, DecoPlanetFlyby],
  'legado-humanidad': [DecoGoldenRecord, DecoVoyager, DecoAntenna],
}; const BIBLIOGRAPHY = ['Stone, E.C. et al. (2013). "Voyager 1 Observes Low-Energy Galactic Cosmic Rays in a Region Depleted of Heliospheric Ions", Science, 341',
  'Gurnett, D.A. et al. (2013). "In Situ Observations of Interstellar Plasma with Voyager 1", Science, 341',
  'Burlaga, L.F. et al. (2019). "Magnetic field and particle measurements made by Voyager 2 at the heliopause", Nature Astronomy, 3',
  'Sagan, C. Et al. (1978). Murmurs of Earth: The Voyager Interstellar Record, Random House',
  'Kohlhase, C. & Penzo, P. (1977). "Voyager Mission Description", Space Science Reviews, 21',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "lanzamiento-1977",
    "title": "El Lanzamiento",
    "color": "#FFD54F",
    "btnImage": "/assets/interestelar/infographic_m6/btn_lanzamiento-1977.jpg",
    "image": "/assets/interestelar/infographic_m6/hero_lanzamiento-1977.jpg",
    "content": [
      "En el verano de 1977, la NASA inauguró una de las mayores hazañas científicas de la era espacial desde la base de Cabo Cañaveral en Florida. El objetivo era enviar dos naves robóticas gemelas hacia los confines inexplorados del sistema solar exterior aprovechando una alineación geométrica de los cuatro mundos gigantes gaseosos que ocurre únicamente una vez cada 175 años.",
      "Curiosamente, la sonda Voyager 2 fue lanzada primero, el 20 de agosto de 1977, impulsada por un cohete Titan IIIE-Centaur. Se le asignó una trayectoria balística más abierta que le permitiría sobrevolar Júpiter, Saturno, Urano y Neptuno. Su hermana gemela, la Voyager 1, despegó dos semanas más tarde, el 5 de septiembre de 1977, siguiendo una trayectoria más directa y veloz.",
      "El cohete Titan IIIE incorporaba una tercera etapa criogénica Centaur de hidrógeno líquido y una cuarta etapa de combustible sólido Star-37E. Esta potente combinación de propulsores impartió a las naves una energía de inyección hiperbólica C3 superior a los ciento cinco kilómetros cuadrados por segundo al cuadrado, permitiéndoles cruzar la órbita de la Luna en menos de diez horas de vuelo.",
      "El diseño mecánico de cada sonda Voyager fue concebido para operar de manera autónoma en un entorno cósmico gélido y hostil a miles de millones de kilómetros de cualquier asistencia humana. Su estructura principal está dominada por una gigantesca antena parabólica reflectora de alta ganancia de 3.7 metros de diámetro, construida con fibra de grafito ultraligera.",
      "A pesar de contar con computadoras de a bordo cuya memoria total apenas alcanzaba unos sesenta y ocho kilobytes —una capacidad de cómputo millones de veces inferior a la de cualquier teléfono inteligente moderno—, los ingenieros del Laboratorio de Propulsión a Chorro (JPL) programaron rutinas de autodiagnóstico capaces de solucionar fallos mecánicos imprevistos en ruta."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La alineación planetaria de Júpiter, Saturno, Urano y Neptuno fue calculada por el joven matemático del JPL Gary Flandro en 1965 mientras trabajaba en el diseño de trayectorias gravitatorias. Descubrió que los planetas no volverían a colocarse en esa misma posición geométrica favorable hasta mediados del siglo XXII."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La etapa Centaur D-1T empleó dos motores Pratt & Whitney RL10A-3-3 que quemaban hidrógeno y oxígeno líquidos con un impulso específico en el vacío de 444 segundos. Esta configuración imprimió una velocidad de escape de 15.3 kilómetros por segundo respecto a la superficie terrestre en el momento de la desconexión."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m6/banner_lanzamiento-1977.webp",
    "bannerCaption": "Lanzamiento 1977: Voyager 1 y 2 despegaron con pocas semanas de diferencia iniciando la gran gira planetaria",
    "fact": "El programa Voyager de la NASA aprovechó una alineación geométrica de los cuatro gigantes gaseosos que ocurre una vez cada 175 años. Utilizando cohetes Titan IIIE-Centaur en 1977, Voyager 2 despegó el 20 de agosto y Voyager 1 el 5 de septiembre, alcanzando una energía hiperbólica C3 récord superior a 105 km²/s²."
  },
  {
    "id": "gran-tour-planetario",
    "title": "El Gran Tour",
    "color": "#2979FF",
    "btnImage": "/assets/interestelar/infographic_m6/btn_gran-tour-planetario.jpg",
    "image": "/assets/interestelar/infographic_m6/hero_gran-tour-planetario.jpg",
    "content": [
      "El periplo de las naves Voyager por los planetas exteriores representó una obra maestra de la mecánica celeste aplicada. Los ingenieros de la misión utilizaron la técnica de asistencia gravitatoria, o efecto honda planetario, para impulsar a las naves de un planeta al siguiente sin necesidad de transportar pesados cargamentos de propelente químico en sus depósitos.",
      "Al sobrevolar un planeta gigante por detrás en su trayectoria orbital, la nave aprovecha el colosal pozo de potencial gravitatorio del mundo para robar una fracción infinitesimal del momento angular planetario. Este intercambio de energía desvía y acelera drásticamente a la sonda espacial respecto al Sol, catapultándola hacia su próximo objetivo a velocidades muy superiores.",
      "Voyager 1 alcanzó el sistema de Júpiter en marzo de 1979 y Saturno en noviembre de 1980. En Júpiter, las imágenes de la nave descubrieron con asombro volcanes de azufre activos en erupción sobre la luna Ío —detectados por la ingeniera Linda Morabito— y revelaron una corteza agrietada de hielo puro en Europa que ocultaba un océano líquido global bajo su superficie.",
      "En Saturno, Voyager 1 realizó una maniobra prioritaria para estudiar de cerca la densa atmósfera anaranjada de Titán, rica en nitrógeno e hidrocarburos. La gravedad de Titán desvió la trayectoria de Voyager 1 fuera del plano de la eclíptica hacia el norte galáctico, impidiéndole continuar hacia otros planetas pero lanzándola en una ruta directa hacia el medio interestelar.",
      "Voyager 2 completó el Gran Tour en su totalidad. Tras estudiar Júpiter y Saturno, prosiguió su vuelo hacia el gélido gigante de hielo Urano en enero de 1986, descubriendo diez lunas nuevas y dos anillos oscuros. En agosto de 1989 sobrevoló Neptuno a escasos cuatro mil kilómetros sobre su polo norte, fotografiando la Gran Mancha Oscura y géiseres activos de nitrógeno en Tritón."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El descubrimiento de volcanes activos en Ío por la Voyager 1 fue el primer hallazgo de vulcanismo activo fuera de la Tierra en toda la historia. La ingeniera Linda Morabito advirtió una extraña nube en forma de hongo en el borde de la luna mientras procesaba fotografías para calibrar la navegación óptica de la sonda."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Durante el sobrevuelo de Júpiter, la Voyager 1 experimentó un incremento de velocidad heliocéntrica de aproximadamente 13 kilómetros por segundo mediante asistencia gravitatoria pura, mientras que la rotación orbital de Júpiter se ralentizó en una magnitud teórica imperceptible de 10⁻²⁴ segundos por año."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m6/banner_gran-tour-planetario.webp",
    "bannerCaption": "La Gran Gira Planetaria: alineación de 175 años que permitió visitar Júpiter, Saturno, Urano y Neptuno",
    "fact": "Mediante asistencias gravitatorias consecutivas en Júpiter y Saturno, las sondas Voyager transformaron la planetología moderna. Voyager 1 descubrió el vulcanismo activo de Ío y la atmósfera de Titán, mientras que Voyager 2 culminó el Gran Tour visitando Urano en 1986 y Neptuno en 1989 antes de enfilar hacia el vacío interestelar."
  },
  {
    "id": "disco-de-oro",
    "title": "El Disco de Oro",
    "color": "#FF8A65",
    "btnImage": "/assets/interestelar/infographic_m6/btn_disco-de-oro.jpg",
    "image": "/assets/interestelar/infographic_m6/hero_disco-de-oro.jpg",
    "content": [
      "Conscientes de que las dos sondas Voyager navegarían por el espacio interestelar durante millones o miles de millones de años mucho después de que la civilización terrestre pudiera haberse extinguido, la NASA aprobó la instalación de un mensaje interestelar formal a bordo de cada una de las dos naves cósmicas. Este disco fonográfico de cobre bañado en oro fue diseñado por un comité encabezado por el célebre astrónomo y divulgador Carl Sagan.",
      "El proyecto fue liderado por un comité científico presidido por el célebre astrónomo Carl Sagan de la Universidad de Cornell, junto a Ann Druyan, Frank Drake y Timothy Ferris. Diseñaron el Disco de Oro de las Voyager (The Golden Record), un fonógrafo de doce pulgadas fabricado en cobre bañado en oro y protegido por una carcasa hermética de aluminio anodizado.",
      "En la cubierta exterior del disco se grabaron diagramas explicativos concebidos como un manual de instrucciones universal en lenguaje físico y matemático. Incluye un mapa de catorce púlsares milimétricos que triangulan la posición exacta del Sol respecto a fuentes periódicas galácticas y el esquema de la transición hiperfina del átomo de hidrógeno como estándar de tiempo y escala métrica.",
      "El disco contiene 115 fotografías y diagramas científicos codificados en señales analógicas de televisión que ilustran la anatomía humana, el ADN, la biosfera, paisajes terrestres, ciudades y tecnologías. Asimismo, alberga saludos verbales en cincuenta y cinco idiomas humanos antiguos y modernos, un mensaje de bienvenida de las Naciones Unidas y el canto ancestral de ballenas jorobadas.",
      "La sección sonora incluye una biblioteca acústica de los Sonidos de la Tierra: truenos de tormentas, olas rompiendo en costas rocosas, viento en bosques, pasos humanos, el motor de un tren a vapor y el despegue de un cohete Saturno V. La música ocupa noventa minutos con composiciones maestras de Bach, Beethoven, Mozart, Stravinski, Chuck Berry, Blind Willie Johnson y piezas folclóricas de los cinco continentes."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Junto al disco se incluyó una aguja fonográfica de zafiro puro dentro de la carcasa protectora con instrucciones visuales sobre cómo hacer girar el disco a una velocidad exacta de 16.66 revoluciones por minuto para reproducir el audio analógico grabado en los surcos metálicos, complementadas con diagramas grabados con precisión atómica sobre la transición hiperfina del hidrógeno."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La cubierta del disco contiene una capa galvanizada ultrafina de uranio-238 puro electrodepositado. Debido a que el U-238 decae mediante emisión alfa con una vida media conocida de 4.468 millones de años, cualquier civilización alienígena receptora podrá calcular la fecha exacta de fabricación midiendo la proporción residual de plomo."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m6/banner_disco-de-oro.webp",
    "bannerCaption": "El Disco de Oro: 116 imágenes y sonidos de la Tierra enviados al cosmos como mensaje de la humanidad",
    "fact": "El Disco de Oro viaja montado en ambas sondas Voyager como un mensaje imperecedero de doce pulgadas bañado en oro. Diseñado por Carl Sagan y su equipo, contiene 115 imágenes codificadas, saludos en 55 lenguas humanas, sonidos terrestres y 90 minutos de música mundial, junto con un reloj radiactivo de uranio-238 para datar la misión."
  },
  {
    "id": "heliopausa-cruce",
    "title": "Cruzando la Heliopausa",
    "color": "#00E676",
    "btnImage": "/assets/interestelar/infographic_m6/btn_heliopausa-cruce.jpg",
    "image": "/assets/interestelar/infographic_m6/hero_heliopausa-cruce.jpg",
    "content": [
      "A lo largo de su viaje hacia el exterior, las sondas Voyager se mantuvieron inmersas dentro de la heliosfera, una gigantesca burbuja magnética de gas ionizado soplada por el viento solar que fluye desde nuestra estrella a velocidades supersónicas de cientos de kilómetros por segundo, protegiendo a los planetas de la radiación cósmica galáctica. Esta frontera dinámica se extiende mucho más allá de la órbita de Plutón, frenando partículas altamente energéticas del medio interestelar.",
      "En la periferia remota de esta burbuja, el viento solar colisiona contra el gas interestelar frío y denso. Primero atraviesa el frente de choque de terminación (termination shock), donde el flujo solar desacelera bruscamente de régimen supersónico a subsónico. Más allá se extiende la heliofunda (heliosheath), una zona turbulenta de transición magnética.",
      "El límite definitivo e impenetrable entre la atmósfera solar y el medio interestelar local es la heliopausa. En esta frontera astrofísica crítica, la presión dinámica del viento solar se iguala con la presión combinada del gas ionizado y los campos magnéticos del medio interestelar galáctico, sellando la frontera del dominio estelar directo del Sol.",
      "El 25 de agosto de 2012, los sensores de la Voyager 1 registraron un cambio físico monumental a una distancia de 121.6 unidades astronómicas del Sol (unos 18.200 millones de kilómetros). El detector de rayos cósmicos liderado por el astrofísico Edward Stone observó una caída abrupta del cien por ciento en las partículas solares de baja energía. Al mismo tiempo, las lecturas de rayos cósmicos de origen galáctico se dispararon, confirmando el cruce histórico de la heliopausa.",
      "Simultáneamente, el flujo de rayos cósmicos galácticos de alta energía procedentes de supernovas lejanas se disparó en más de un treinta por ciento. Semanas después, una oscilación provocada por una erupción solar previa permitió al instrumento de ondas de plasma medir una densidad electrónica de 0.08 electrones por centímetro cúbico, cuarenta veces superior a la heliosfera. Voyager 1 había penetrado formalmente en el medio interestelar."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante meses antes del cruce histórico, los científicos discutían acaloradamente si la Voyager 1 ya había salido del sistema solar o si se encontraba en una región magnética desconocida. El veredicto final llegó cuando una llamarada solar tardó un año en alcanzar a la sonda y provocó que el plasma interestelar denso vibrara como una campana cósmica."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El instrumento PWS de ondas de plasma de Voyager 1 midió frecuencias de oscilación de plasma de 2.6 a 3.1 kilohercios, lo que permitió deducir una densidad electrónica local de ne ≈ 0.08 cm⁻³, característica inequívoca del medio interestelar no perturbado por el viento solar, ofreciendo la primera medición empírica directa de la materia situada fuera de la influencia heliosférica del Sol."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m6/banner_heliopausa-cruce.webp",
    "bannerCaption": "Cruce de la heliopausa: Voyager 1 entró al espacio interestelar en agosto 2012, primera vez en la historia",
    "fact": "Voyager 1 cruzó formalmente la heliopausa el 25 de agosto de 2012 a 121.6 UA del Sol, convirtiéndose en el primer artefacto humano en penetrar en el medio interestelar. Voyager 2 confirmó el cruce el 5 de noviembre de 2018 a 119 UA, registrando una densidad de plasma de 0.08 e⁻/cm³ y un salto en los rayos cósmicos galácticos."
  },
  {
    "id": "espacio-interestelar",
    "title": "En el Espacio Interestelar",
    "color": "#B388FF",
    "btnImage": "/assets/interestelar/infographic_m6/btn_espacio-interestelar.jpg",
    "image": "/assets/interestelar/infographic_m6/hero_espacio-interestelar.jpg",
    "content": [
      "Navegar por el espacio interestelar no significa haber abandonado por completo la influencia gravitatoria del Sol. Aunque las sondas Voyager se encuentran fuera del alcance del viento solar en términos de física de plasmas, la atracción gravitacional de nuestra estrella domina una región inmensamente más vasta que se extiende a lo largo de un año luz de radio.",
      "Las sondas tardarán aproximadamente trescientos años en alcanzar el borde interno de la nube de Oort, el colosal almacén esférico que alberga billones de cometas primordiales congelados. Cruzar de lado a lado la espesura de esta nube helada les exigirá unos treinta mil años de navegación balística continua a sus velocidades actuales. Este largo periplo interestelar demuestra las dimensiones abrumadoras del sistema solar exterior más allá de los planetas conocidos.",
      "Actualmente, la sonda Voyager 1 se desplaza a una velocidad heliocéntrica de aproximadamente 16.9 kilómetros por segundo (equivalente a unas 3.56 unidades astronómicas por año) alejándose hacia la constelación de Ofiuco. Por su parte, la Voyager 2 se desplaza a 15.3 kilómetros por segundo (unas 3.23 unidades astronómicas por año) con rumbo hacia la constelación de Pavo.",
      "La distancia que las separa de la Tierra es tan monumental que las comunicaciones por radio operan con retrasos asombrosos gobernados por la velocidad constante de la luz en el vacío. Una señal electromagnética enviada desde las antenas terrestres de la Red de Espacio Profundo de la NASA tarda más de veintidós horas y media en alcanzar a la Voyager 1, y otras veintidós horas y media en retornar con su respuesta.",
      "Para captar las tenues transmisiones de radio de las sondas, cuya potencia de emisión es de tan solo veintidós vatios —equivalente a la bombilla pequeña de un refrigerador doméstico—, la NASA debe sincronizar las gigantescas antenas parabólicas de setenta metros de diámetro situadas en Madrid, California y Canberra. Estas colosales estaciones de la Red del Espacio Profundo (DSN) aplican amplificadores criogénicos maser para extraer los datos del ruido cósmico."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La señal de radio recibida en la Tierra de la Voyager 1 llega con una potencia ridícula de una fracción de una trillonésima de vatio (10⁻²⁰ vatios). La energía total de todas las señales recibidas desde su lanzamiento en 1977 no alcanzaría para encender una vela durante medio segundo, exigiendo el procesado digital de señales más sensible y sofisticado jamás diseñado por la ingeniería de telecomunicaciones."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "A una distancia heliocéntrica superior a 160 unidades astronómicas, el tiempo de propagación de la señal de radio unidireccional de la Voyager 1 supera las 22.5 horas luz. Las correcciones Doppler demuestran que la velocidad asintótica se mantiene estable con variaciones gravitatorias residuales inferiores a milímetros por segundo."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m6/banner_espacio-interestelar.webp",
    "bannerCaption": "En el espacio interestelar: Voyager mide en tiempo real el medio interestelar a más de 163 UA del Sol",
    "fact": "En el medio interestelar, Voyager 1 viaja a 16.9 km/s (3.56 UA/año) a más de 160 UA del Sol, mientras que Voyager 2 avanza a 15.3 km/s. Una señal de radio a la velocidad de la luz tarda más de 22 horas y media en cruzar la distancia unidireccional entre la Tierra y Voyager 1, requiriendo antenas parabólicas de 70 metros de la DSN."
  },
  {
    "id": "energia-plutonio",
    "title": "Energía de Plutonio",
    "color": "#FFD740",
    "btnImage": "/assets/interestelar/infographic_m6/btn_energia-plutonio.jpg",
    "image": "/assets/interestelar/infographic_m6/hero_energia-plutonio.jpg",
    "content": [
      "A distancias superiores a las cien unidades astronómicas del Sol, el uso de paneles solares fotovoltaicos es absolutamente inviable. A esa distancia cósmica, el Sol no se percibe como un disco térmico cegador, sino como una estrella puntual intensamente brillante que suministra una diezmilésima parte de la luz que baña a nuestro planeta natal. En ese gélido vacío espacial, únicamente la desintegración radiactiva controlada puede proveer el calor y la electricidad necesarios.",
      "Para suministrar energía eléctrica ininterrumpida a sus ordenadores, transmisores y sensores durante décadas, cada nave Voyager fue equipada con tres generadores termoeléctricos de radioisótopos (RTG, por sus siglas en inglés) montados sobre un brazo mecánico extensible alejado deliberadamente de los instrumentos científicos más delicados. Este distanciamiento geométrico impidió que la radiación y el calor emitidos interfirieran con los magnetómetros y detectores de partículas.",
      "Cada RTG contiene esferas cerámicas compactas de dióxido de plutonio enriquecidas con el isótopo radiactivo plutonio-238 (Pu-238). Este isótopo inestable decae emitiendo partículas alfa de alta energía que son absorbidas por el propio material blindado, generando un calor espontáneo y constante superior a los setecientos grados Celsius. Pares de termopares de silicio-germanio convierten directamente este gradiente térmico en corriente eléctrica continua sin piezas móviles.",
      "Alrededor del núcleo radiactivo caliente se disponen cientos de termopares fabricados con una aleación semiconductora de silicio y germanio. Basándose en el efecto físico Seebeck, los termopares convierten directamente el gradiente térmico entre el núcleo ardiente de plutonio y el gélido frío del espacio circundante en corriente eléctrica continua útil.",
      "En el momento del despegue en 1977, los tres generadores térmicos de cada nave suministraban cuatrocientos setenta vatios de potencia eléctrica. Sin embargo, el plutonio-238 tiene una vida media de 87.7 años y los termopares sufren degradación atómica paulatina, lo que reduce la potencia disponible en unos cuatro vatios por año. Para prolongar la vida útil de las sondas, los ingenieros desconectaron progresivamente los calentadores e instrumentos no esenciales."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las famosas cámaras fotográficas de ambas sondas Voyager fueron desconectadas definitivamente por la NASA en 1990 poco después de tomar el «Pálido Punto Azul». Mantenerlas calientes en el espacio consumía demasiada electricidad que era indispensable reservar para los detectores de partículas y la antena principal."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Cada unidad MHW-RTG contiene 4.5 kilogramos de óxido de plutonio-238 distribuidos en veinticuatro esferas de combustible cerámico prensado. El efecto Seebeck genera electricidad estática con una eficiencia de conversión térmica a eléctrica de aproximadamente 6.6 por ciento en circuito cerrado, garantizando un funcionamiento termoeléctrico ininterrumpido durante más de medio siglo en el vacío espacial."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m6/banner_energia-plutonio.webp",
    "bannerCaption": "Energía de plutonio: los RTG de Voyager convierten el calor del Pu-238 en electricidad, ahora con menos de 40W",
    "fact": "Las sondas Voyager funcionan con tres generadores termoeléctricos de radioisótopos (RTG) cargados con plutonio-238, cuya desintegración alfa con vida media de 87.7 años genera calor convertido en electricidad mediante termopares de silicio-germanio. Su potencia decrece ~4 W al año, permitiendo su operación científica hasta cerca de 2030."
  },
  {
    "id": "legado-humanidad",
    "title": "El Legado",
    "color": "#80CBC4",
    "btnImage": "/assets/interestelar/infographic_m6/btn_legado-humanidad.jpg",
    "image": "/assets/interestelar/infographic_m6/hero_legado-humanidad.jpg",
    "content": [
      "Las sondas espaciales Voyager representan una de las cumbres más nobles y trascendentes de la creatividad, la ciencia y la tecnología de la civilización humana. Cuando sus últimos generadores de plutonio se apaguen hacia la década de 2030 y sus antenas enmudezcan definitivamente, su periplo cósmico no habrá terminado; en realidad, apenas estará comenzando.",
      "Desprovistas de energía y flotando en el más absoluto silencio en el vacío galáctico a cientos de grados bajo cero, ambas naves continuarán desplazándose por inercia balística pura a lo largo de una órbita circular alrededor del centro masivo de la Vía Láctea, completando una revolución galáctica completa cada doscientos veinticinco millones de años.",
      "En aproximadamente cuarenta mil años terrestres, la sonda Voyager 1 pasará a una distancia de 1.6 años luz de la estrella enana roja Gliese 445 en la constelación boreal de Camelopardalis. Por su parte, la Voyager 2 se aproximará a 1.7 años luz de la estrella Ross 248 en la constelación de Andrómeda en una escala temporal similar. Ambas continuarán su silenciosa órbita galáctica alrededor del centro de la Vía Láctea durante miles de millones de años.",
      "En el espacio profundo interestelar no existen vientos, lluvia, erosión geológica ni atmósferas que desgasten las estructuras mecánicas. Salvo por el impacto sumamente improbable de un micrometeoroide denso, los armazones de aluminio, las antenas de grafito y los Discos de Oro de las Voyager permanecerán prácticamente intactos durante miles de millones de años.",
      "Es un hecho científico contrastado que las dos sondas Voyager sobrevivirán a la propia existencia de la vida sobre la faz de la Tierra. Mucho después de que los océanos terrestres se evaporen bajo la radiación de un Sol agonizante transformado en gigante roja dentro de cinco mil millones de años, las naves seguirán surcando la oscuridad de la galaxia."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El 14 de febrero de 1990, a petición de Carl Sagan, la Voyager 1 giró sus cámaras por última vez hacia el sistema solar interior y fotografió a la Tierra a 6.000 millones de kilómetros de distancia como un diminuto píxel azul brillante, inspirando la legendaria reflexión del «Pálido Punto Azul», recordándonos la fragilidad de nuestro hogar común y la responsabilidad compartida de preservar la vida en el cosmos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La tasa de erosión por colisiones de polvo interestelar sobre el fuselaje de las Voyager se estima en menos de un nanómetro por cada millón de años de navegación en el medio interestelar local, lo que asegura que los surcos analógicos del Disco de Oro perdurarán legibles por más de 1.000 millones de años."
      }
    ],
    "bannerImage": "/assets/interestelar/infographic_m6/banner_legado-humanidad.webp",
    "bannerCaption": "El legado de Voyager: símbolo de la curiosidad humana que sigue hablando con la Tierra desde 23,000 millones de km",
    "fact": "Las sondas Voyager continuarán orbitando el centro de la Vía Láctea cada 225 millones de años durante miles de millones de años tras agotar su energía en ~2030. En ~40.000 años, Voyager 1 pasará a 1.6 años luz de Gliese 445 y Voyager 2 a 1.7 años luz de Ross 248, sobreviviendo como cápsulas del tiempo intactas más allá de la vida del Sol."
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
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.005 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      hue: Math.random() > 0.5 ? '255,213,79' : '41,121,255', // gold or blue
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.05;
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

// â”€â”€â”€ Voyager Space Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function VoyagerHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,213,79,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#voyagerGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#FFD54F','#2979FF','#FF8A65','#00E676','#B388FF','#FFD740','#80CBC4'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="16" fill="none" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="4" fill="#FFD54F" opacity="0.5" />
        <path d="M290 30 L310 30 M300 20 L300 40" stroke="#FFD54F" strokeWidth="1.5" opacity="0.6" />
        <defs>
          <linearGradient id="voyagerGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,213,79,0.2)" />
            <stop offset="50%" stopColor="rgba(255,213,79,0.9)" />
            <stop offset="100%" stopColor="rgba(255,213,79,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FFD54F" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">VOYAGER 1 Y 2</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(255,213,79,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EXPLORADORES DEL VACÍO INTERESTELAR</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          layoutId="activeDotInterestelarM6"
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
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 800, color: node.color, display:'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} /> Explora Más
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, idx) => (
                <ExpandableSection key={idx} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

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

        {/* â”€â”€â”€ Highlight Fact â”€â”€â”€ */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${node.color}15, transparent)`,
          border: `1px solid ${node.color}40`,
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            position: 'absolute', top: '-15px', left: '1.5rem',
            background: '#0B0E2D', padding: '0 10px',
            color: node.color, display: 'flex', alignItems: 'center', gap: '0.5rem',
            fontWeight: 800, fontSize: '0.9rem', letterSpacing: '1px',
          }}>
            <Sparkles size={16} /> DATO CIENTÍFICO
          </div>
          <p style={{
            margin: 0, fontSize: '1.05rem', lineHeight: 1.6,
            color: 'rgba(255,255,255,0.95)', fontStyle: 'italic',
            textAlign: 'center',
          }}>
            "{node.fact}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterestelarM6() {
  const [activeNode, setActiveNode] = useState(null);
  const [exploredNodes, setExploredNodes] = useState(new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    if (activeNode === id) {
      setActiveNode(null);
    } else {
      setActiveNode(id);
      setExploredNodes(prev => new Set(prev).add(id));
    }
  };

  const progress = Math.round((exploredNodes.size / INFOGRAPHIC_NODES.length) * 100);

  return (
    <div style={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      background: '#050714',
      borderRadius: '24px',
      padding: '2rem',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#E2E8F0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <TemporalField />
      
      <VoyagerHeader />

      {/* ProgressBar tracking explored nodes */}
      <div style={{ position: 'relative', zIndex: 2, marginTop: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%', background: '#FFD54F' }}
          />
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#FFD54F' }}>
          {progress}% EXPLORADO
        </span>
      </div>

      {/* Nodes Map */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
        zIndex: 2,
        padding: '1rem 0',
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
        {activeNode && (
          <ContentPanel
            key={activeNode}
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)}
            onClose={() => setActiveNode(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      {/* Bibliography */}
      <div style={{
        marginTop: '4rem',
        padding: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        zIndex: 2,
      }}>
        <h5 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Referencias Científicas
        </h5>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.5rem' }}>
          {BIBLIOGRAPHY.map((bib, i) => (
            <li key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', display: 'flex', gap: '0.5rem' }}>
              <span style={{ color: '#FFD54F' }}>•</span> {bib}
            </li>
          ))}
        </ul>
      </div>

      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Vista Detallada"
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}
