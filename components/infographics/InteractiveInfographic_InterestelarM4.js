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
    id: 'sistema-atlas',
    title: 'El Sistema ATLAS',
    color: '#66BB6A',
    btnImage: '/assets/interestelar/infographic_m4/btn_sistema-atlas.jpg',
    image: '/assets/interestelar/infographic_m4/hero_sistema-atlas.jpg',
    content: [
      'El Sistema de Última Alerta de Impacto Terrestre de Asteroides (ATLAS) vigila el cielo nocturno. Financiado por la NASA, busca objetos que se acercan a la Tierra. Aunque su objetivo inicial eran los asteroides locales, ahora es una herramienta clave para detectar visitantes interestelares.',
      'ATLAS cuenta con cuatro telescopios ubicados en Hawái, Chile y Sudáfrica. Esta distribución global permite observar el cielo continuamente. Al estar en diferentes husos horarios y hemisferios, el sistema reduce los puntos ciegos donde los objetos rápidos podrían ocultarse.',
      'A diferencia de otros telescopios, ATLAS tiene un campo de visión amplio. Utiliza lentes gran angular y sensores de 100 megapíxeles para escanear el cielo. Cada exposición captura una gran porción del firmamento, permitiendo observar todo el cielo visible cada 24 horas.',
      'La clave de ATLAS es la rapidez con la que vuelve a observar la misma región. Toma cuatro exposiciones por noche de cada zona. Mientras las estrellas permanecen fijas, los objetos cercanos o interestelares cambian de posición entre las imágenes.',
      'El sistema genera grandes cantidades de datos que se procesan cada noche. ATLAS ha descubierto cientos de cometas y miles de asteroides. Su capacidad de escaneo lo hace ideal para interceptar objetos que viajan a altas velocidades desde otros sistemas estelares.'
    ],
    expandables: [
      { label: 'Eventos Transitorios', icon: 'clock', text: 'ATLAS también detecta otros eventos celestes. Identifica supernovas, estrellas variables y destellos de colisiones estelares. Funciona como un sistema de vigilancia para diversos fenómenos astronómicos.' },
      { label: 'Ingeniería Óptica', icon: 'zap', text: 'Cada telescopio ATLAS tiene un espejo primario de 50 centímetros. Aunque es pequeño para los estándares actuales, su diseño óptico y sensores le permiten escanear grandes áreas del cielo con gran eficiencia.' }
    ],
    fact: 'ATLAS descubrió el cometa C/2019 Y4 y ha detectado asteroides pequeños horas antes de que ingresaran a la atmósfera terrestre. Su eficacia para identificar objetos rápidos está comprobada.'
  },
  {
    id: 'deteccion-automatica',
    title: 'Detección Automática',
    color: '#F44336',
    btnImage: '/assets/interestelar/infographic_m4/btn_deteccion-automatica.jpg',
    image: '/assets/interestelar/infographic_m4/hero_deteccion-automatica.jpg',
    content: [
      'Procesar millones de imágenes requiere sistemas automatizados. Antes, los astrónomos usaban un microscopio de parpadeo para buscar cambios entre fotografías. Hoy, las computadoras analizan los datos de manera más rápida y eficiente.',
      'El software de ATLAS alinea las imágenes y resta la primera de la segunda. Las estrellas estáticas se eliminan del resultado final. Los objetos que se mueven o cambian de brillo permanecen visibles en la imagen procesada.',
      'Esta resta matemática presenta desafíos. El ruido de los sensores, los rayos cósmicos y los satélites generan falsas alarmas. ATLAS produce millones de detecciones por noche, y la mayoría son errores o basura espacial.',
      'Los algoritmos de aprendizaje automático filtran estas señales. Analizan la forma, el brillo, la velocidad y la trayectoria de cada punto de luz. Este proceso selecciona a los candidatos reales que los astrónomos deben revisar.',
      'El software detecta objetos con velocidades inusuales o trayectorias extrañas. Los visitantes interestelares pueden moverse tan rápido que dejan una línea en lugar de un punto. El sistema está diseñado para identificar estos trazos antes de que desaparezcan.'
    ],
    expandables: [
      { label: 'El Desafío de los Satélites', icon: 'zap', text: 'Las constelaciones de satélites dejan trazos brillantes que afectan las imágenes. Los sistemas como ATLAS actualizan sus algoritmos para reconocer y eliminar estos rastros de sus datos científicos.' },
      { label: 'Detección de Trazos', icon: 'atom', text: 'Los objetos muy rápidos cruzan el campo de visión durante la exposición de la cámara, creando una línea. Los algoritmos de Streak Detection buscan estos trazos para identificar cuerpos veloces o cercanos.' }
    ],
    fact: 'En 1930, Clyde Tombaugh pasó un año buscando Plutón en placas fotográficas. Hoy, los algoritmos de ATLAS procesan una cantidad equivalente de datos en solo cinco minutos.'
  },
  {
    id: 'candidatos-interestelares',
    title: 'Candidatos a 3I',
    color: '#FF9800',
    btnImage: '/assets/interestelar/infographic_m4/btn_candidatos-interestelares.jpg',
    image: '/assets/interestelar/infographic_m4/hero_candidatos-interestelares.jpg',
    content: [
      'La búsqueda del tercer objeto interestelar (3I) es una prioridad en astronomía. Los sistemas de vigilancia identifican candidatos con trayectorias que parecen ajenas a nuestro Sol. Sin embargo, confirmar su origen requiere evidencia rigurosa.',
      'La excentricidad orbital determina si un objeto es interestelar. Los planetas tienen órbitas casi circulares, y los cometas locales tienen órbitas elípticas. Una excentricidad mayor a 1 indica una órbita hiperbólica y un origen externo al sistema solar.',
      'Calcular la órbita inicial es difícil. Se basa en pocas observaciones tomadas durante un tiempo corto, lo que genera un margen de error. Un objeto local puede parecer interestelar si los datos iniciales son imprecisos.',
      'Cuando se anuncia un candidato, los telescopios del mundo buscan más datos. Semanas de observación ayudan a refinar la trayectoria. A menudo, las órbitas hiperbólicas iniciales se corrigen y los objetos resultan ser cometas locales.',
      'Confirmar un objeto interestelar es valioso porque aporta información sobre otros sistemas planetarios. Estudiar su composición ayuda a entender cómo se forman los planetas. Encontrar estos objetos requiere observaciones rápidas y precisas.'
    ],
    expandables: [
      { label: 'Falsas Alarmas', icon: 'clock', text: 'Algunos candidatos iniciales, como A/2017 U7, parecían tener órbitas hiperbólicas. Observaciones posteriores demostraron que pertenecían a la Nube de Oort y tenían órbitas elípticas extremas.' },
      { label: 'Aceleración por Gases', icon: 'atom', text: 'La sublimación del hielo crea chorros de gas que alteran la órbita de un cometa. Los astrónomos deben distinguir esta aceleración no gravitacional de una verdadera trayectoria interestelar.' }
    ],
    fact: 'El cometa 2I/Borisov tuvo una excentricidad confirmada de 3.3. Esta cifra tan alta demostró matemáticamente que no pertenecía al sistema solar, a diferencia de los candidatos que se corrigen a valores menores a 1.'
  },
  {
    id: 'falsos-positivos',
    title: 'Trampas de Júpiter',
    color: '#00ACC1',
    btnImage: '/assets/interestelar/infographic_m4/btn_falsos-positivos.jpg',
    image: '/assets/interestelar/infographic_m4/hero_falsos-positivos.jpg',
    content: [
      'No todas las órbitas de escape provienen del espacio profundo. Los cometas locales pueden parecer interestelares debido a interacciones gravitacionales. Júpiter, con su gran masa, puede alterar las trayectorias de los objetos cercanos.',
      'Los cometas de la Nube de Oort tienen órbitas elípticas. Si se acercan a Júpiter o Saturno, la gravedad de los planetas puede acelerarlos. Este efecto cambia su velocidad y altera su órbita original.',
      'Si el cometa gana suficiente velocidad, supera la velocidad de escape del Sol. Su órbita elíptica se convierte en hiperbólica. Si se detecta después de este encuentro, parece un objeto interestelar aunque nació en nuestro sistema.',
      'Estos casos se conocen como falsos positivos dinámicos. Para identificarlos, los científicos simulan la órbita hacia atrás en el tiempo. Si la trayectoria muestra un encuentro cercano con Júpiter, se descarta su origen extrasolar.',
      'La interacción planetaria también explica órbitas inusuales como la de Sedna. Aunque no se acerca a Neptuno, tiene una órbita muy alargada. Algunos sugieren que una estrella cercana afectó su trayectoria hace miles de millones de años.'
    ],
    expandables: [
      { label: 'Asistencia Gravitacional', icon: 'zap', text: 'Las misiones espaciales usan la gravedad de Júpiter para acelerar sondas. Este mismo efecto natural expulsa cometas de la Nube de Oort hacia el espacio interestelar.' },
      { label: 'Simulación Orbital', icon: 'clock', text: 'Los astrónomos usan integradores numéricos para simular el pasado de un objeto. Determinar la órbita requiere observaciones precisas para evitar errores en las simulaciones a largo plazo.' }
    ],
    fact: 'El cometa C/1980 E1 tiene una trayectoria de escape hiperbólica. Las simulaciones revelaron que pasó cerca de Júpiter en 1980, lo que cambió su órbita y lo expulsó del sistema solar.'
  },
  {
    id: 'velocidad-deteccion',
    title: 'La Necesidad de Velocidad',
    color: '#9C27B0',
    btnImage: '/assets/interestelar/infographic_m4/btn_velocidad-deteccion.jpg',
    image: '/assets/interestelar/infographic_m4/hero_velocidad-deteccion.jpg',
    content: [
      'El tiempo es crítico para estudiar los objetos interestelares. Estos cuerpos viajan a velocidades muy altas. Oumuamua entró al sistema solar a 26 kilómetros por segundo y aceleró cerca del Sol.',
      'Su gran velocidad significa que cruzan el sistema solar interior rápidamente. Permanecen visibles para nuestros telescopios solo por semanas o meses. Si no se detectan a tiempo, desaparecen en el espacio profundo.',
      'Cuando un sistema identifica un candidato, alerta a la comunidad científica. Los astrónomos tienen poco tiempo para apuntar los telescopios más grandes hacia el objeto. Esta respuesta rápida es fundamental para obtener datos detallados.',
      'A medida que el objeto se aleja, su brillo disminuye drásticamente. Se necesita tomar su espectro de luz mientras está cerca para conocer su composición química. Si se pierde esta ventana, la información desaparece.',
      'Los observatorios han creado protocolos para estos casos. Los investigadores pueden interrumpir otras observaciones para estudiar un candidato a objeto interestelar. Esta prioridad permite capturar datos antes de que el visitante se aleje.'
    ],
    expandables: [
      { label: 'El Caso Oumuamua', icon: 'clock', text: 'Oumuamua fue descubierto después de pasar su punto más cercano al Sol. Los astrónomos tuvieron menos de tres semanas para estudiarlo antes de que su brillo fuera indetectable.' },
      { label: 'Análisis de Luz', icon: 'atom', text: 'La espectroscopía descompone la luz en diferentes colores. Las líneas resultantes revelan los componentes químicos del objeto. Este análisis requiere mucha luz y proximidad.' }
    ],
    fact: 'La Agencia Espacial Europea diseña la misión Comet Interceptor. El objetivo es lanzar una sonda y mantenerla en órbita para interceptar un objeto interestelar poco después de su descubrimiento.'
  },
  {
    id: 'lsst-vera-rubin',
    title: 'Telescopio Vera Rubin',
    color: '#2196F3',
    btnImage: '/assets/interestelar/infographic_m4/btn_lsst-vera-rubin.jpg',
    image: '/assets/interestelar/infographic_m4/hero_lsst-vera-rubin.jpg',
    content: [
      'El Observatorio Vera C. Rubin, en Chile, mejorará la detección de objetos interestelares. Albergará la Investigación del Espacio y el Tiempo como Legado (LSST). Este proyecto cambiará cómo observamos el cielo nocturno.',
      'El telescopio tiene un espejo primario de 8.4 metros de diámetro. Su gran tamaño le permite recolectar mucha luz y ver objetos tenues. Combina una apertura amplia con un gran campo de visión.',
      'La cámara del LSST tiene 3,200 megapíxeles. Es la cámara digital más grande construida para la astronomía. Podrá fotografiar amplias zonas del cielo del hemisferio sur cada pocos días.',
      'Cada imagen capturará objetos muy débiles. El telescopio generará decenas de petabytes de datos durante su misión. Las supercomputadoras analizarán esta información en tiempo real para emitir alertas rápidas sobre objetos en movimiento.',
      'Los astrónomos esperan que el LSST descubra varios objetos interestelares cada año. Su sensibilidad permitirá detectar a estos visitantes con mayor frecuencia. Esto convertirá los hallazgos aislados en un estudio estadístico detallado.'
    ],
    expandables: [
      { label: 'Diseño del Espejo', icon: 'zap', text: 'Los espejos primario y terciario del telescopio están tallados en la misma pieza de vidrio. Este diseño compacto permite que el telescopio se mueva rápidamente para tomar múltiples fotografías.' },
      { label: 'Procesamiento de Datos', icon: 'atom', text: 'El observatorio enviará datos a través de fibra óptica a centros de supercomputación. Las alertas rápidas permitirán que telescopios automatizados observen fenómenos transitorios casi de inmediato.' }
    ],
    fact: 'El observatorio honra a Vera C. Rubin, quien aportó evidencia sobre la materia oscura. El telescopio también mapeará la distribución de materia oscura en el universo.'
  },
  {
    id: 'red-global-vigilancia',
    title: 'La Red Global',
    color: '#FDD835',
    btnImage: '/assets/interestelar/infographic_m4/btn_red-global-vigilancia.jpg',
    image: '/assets/interestelar/infographic_m4/hero_red-global-vigilancia.jpg',
    content: [
      'Descubrir objetos interestelares requiere colaboración internacional. Cuando un telescopio detecta algo inusual, comparte la información. El Centro de Planetas Menores (MPC) centraliza estos datos a nivel mundial.',
      'El MPC recopila observaciones de asteroides y cometas. Publica coordenadas de posibles nuevos objetos en una página pública. Los observatorios del mundo monitorean esta información para realizar observaciones de seguimiento.',
      'Los telescopios globales se relevan a medida que la Tierra gira. Diferentes países asumen el seguimiento para asegurar una cobertura continua. Esto es vital para calcular trayectorias precisas rápidamente.',
      'La astronomía ciudadana también juega un rol clave. Astrónomos aficionados con equipos precisos aportan miles de mediciones al MPC. El cometa Borisov fue descubierto por un aficionado, mostrando el valor de la observación independiente.',
      'Compartir datos de manera abierta es esencial para estudiar objetos interestelares. La red global permite organizar observaciones y refinar órbitas. La exploración del espacio es un esfuerzo conjunto de la comunidad internacional.'
    ],
    expandables: [
      { label: 'Procesamiento con IA', icon: 'zap', text: 'El MPC usa algoritmos para filtrar observaciones ruidosas. Enlazan datos de diferentes telescopios para calcular órbitas precisas. Este proceso es fundamental para la confirmación de nuevos objetos.' },
      { label: 'Acceso Público', icon: 'clock', text: 'Cualquier persona puede acceder a las predicciones orbitales del MPC. Muchas instituciones educativas usan estos datos para enseñar matemáticas y mecánica celeste a los estudiantes.' }
    ],
    fact: 'El cometa 2I/Borisov fue descubierto por un astrónomo aficionado que construyó su propio telescopio. Su hallazgo resalta la importancia de la observación astronómica más allá de los grandes observatorios profesionales.'
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(244,67,54,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA RED DE VIGILANCIA CÃ“SMICA</text>
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
        <h5 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.7)' }}>REFERENCIAS CIENTÍFICAS (MÃ“DULO 4)</h5>
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
