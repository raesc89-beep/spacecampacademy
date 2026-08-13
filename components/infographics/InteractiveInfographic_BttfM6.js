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
    id: 'hg-wells',
    title: 'La Primera Máquina del Tiempo',
    color: '#FF6B35',
    btnImage: '/assets/bttf/infographic_m6/btn_hg-wells.jpg',
    image: '/assets/bttf/infographic_m6/hero_hg-wells.jpg',
    content: [
      'En 1895, el escritor inglés H.G. Wells publicó \'La Máquina del Tiempo\', cambiando la concepción del viaje temporal. Wells imaginó un dispositivo mecánico capaz de avanzar y retroceder en el tiempo de forma controlada.',
      'Wells escribió esta obra diez años antes de que Einstein publicara su teoría de la relatividad. En ese momento, la ciencia consideraba que el tiempo era absoluto. Wells anticipó la idea de que el tiempo podía ser flexible.',
      'Previamente, la literatura abordaba el viaje temporal mediante elementos mágicos o sueños. La contribución de Wells fue introducir una máquina tecnológica, vinculando el concepto a la ciencia y la ingeniería.',
      'La novela también exploró dilemas filosóficos sobre el futuro de la humanidad. El protagonista viaja al año 802,701 y encuentra a la especie humana dividida en los Eloi y los Morlocks, planteando interrogantes sobre la evolución social.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En \'Regreso al Futuro\', Doc Brown es un inventor excéntrico que crea una máquina del tiempo en su garaje. Esto es un homenaje directo a H.G. Wells: un genio solitario que construye algo imposible. La diferencia es que Doc usa un DeLorean y Wells imaginó una silla con palancas de cristal. ¡Pero la idea fundamental es idéntica!' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'H.G. Wells predijo los tanques de guerra (en \'La Guerra de los Mundos\', 1898), los bombardeos aéreos (en \'La Guerra en el Aire\', 1908) y la energía nuclear (en \'The World Set Free\', 1914, ¡30 años antes de Hiroshima!). Winston Churchill lo consultaba sobre el futuro de la tecnología militar.' }
    ],
    fact: 'La novela \'La Máquina del Tiempo\'de Wells se ha adaptado al cine dos veces (1960 y 2002), pero ninguna captura la verdadera intención de Wells: era una crítica social sobre la desigualdad de clases en la Inglaterra victoriana. Los Eloi representaban a la aristocracia ociosa y los Morlocks a la clase trabajadora. ¡La ciencia ficción como espejo de la sociedad!'
  },
  {
    id: 'agujeros-gusano',
    title: 'Agujeros de Gusano',
    color: '#7C4DFF',
    btnImage: '/assets/bttf/infographic_m6/btn_agujeros-gusano.jpg',
    image: '/assets/bttf/infographic_m6/hero_agujeros-gusano.jpg',
    content: [
      'Un agujero de gusano es un atajo teórico a través del espacio-tiempo, que conectaría dos puntos distantes uniendo áreas curvadas del tejido espacial.',
      'En 1935, Einstein y Nathan Rosen propusieron esta teoría, conocida como \'puentes Einstein-Rosen\'. Postularon que la curvatura extrema del espacio-tiempo podría crear un túnel entre dos regiones separadas.',
      'El físico Kip Thorne propuso en 1988 que un agujero de gusano podría funcionar como máquina del tiempo. Si un extremo se acelera a velocidades cercanas a la de la luz, experimentaría dilatación temporal, existiendo en un momento diferente al otro extremo.',
      'La dificultad principal es que mantener abierto este túnel requeriría \'materia exótica\'con densidad de energía negativa. Actualmente, no hay evidencia de que esta materia exista en cantidades suficientes para este propósito.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En BTTF, el condensador de flujo crea una \'ruptura\'en el espacio-tiempo que el DeLorean atraviesa a 88 mph. Aunque la película no usa la palabra \'agujero de gusano\', la idea de un puente que conecta dos puntos distantes en el tiempo se basa en este mismo principio teórico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Kip Thorne escribió el primer artículo científico serio sobre agujeros de gusano como máquinas del tiempo en 1988... ¡inspirado por una pregunta de Carl Sagan! Sagan estaba escribiendo su novela \'Contact\'y necesitaba un método científicamente plausible para viajar instantáneamente. Le pidió ayuda a Thorne, y de esa consulta entre amigos salió un artículo que cambió la física teórica.' }
    ],
    fact: 'En 2019, los físicos Juan Maldacena y Alexei Milekhin propusieron un agujero de gusano \'humanamente atravesable\'que NO requeriría materia exótica, solo geometría del espacio-tiempo muy específica. El viaje tomaría menos de un segundo para el viajero, pero miles de años pasarían en el exterior. ¡Es un viaje al futuro, no al pasado!'
  },
  {
    id: 'motor-alcubierre',
    title: 'El Motor Warp',
    color: '#00E5FF',
    btnImage: '/assets/bttf/infographic_m6/btn_motor-alcubierre.jpg',
    image: '/assets/bttf/infographic_m6/hero_motor-alcubierre.jpg',
    content: [
      'En 1994, el físico Miguel Alcubierre propuso un modelo matemático que permitiría viajar a velocidades superiores a la de la luz sin violar la teoría de la relatividad general de Einstein.',
      'El motor de curvatura funcionaría expandiendo el espacio detrás de una nave y contrayéndolo por delante. La nave permanecería inmóvil dentro de una burbuja espaciotemporal, mientras que el espacio a su alrededor se desplazaría.',
      'Esto es compatible con la relatividad porque la restricción de velocidad lumínica aplica a objetos moviéndose a través del espacio, no a la expansión o contracción del espacio mismo.',
      'Los principales obstáculos del modelo de Alcubierre incluyen el requerimiento de enormes cantidades de materia exótica y la emisión de radiación letal. Aunque inviable tecnológicamente en el presente, representa un avance teórico importante.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El DeLorean no usa un motor warp, pero la idea de necesitar una velocidad específica (88 mph) para \'activar\'el viaje en el tiempo tiene una analogía real: en el motor Alcubierre, la burbuja necesita alcanzar una configuración energética precisa para formarse. Es como si hubiera un \'umbral\'que debes cruzar â€” ¡exactamente como las 88 millas por hora!' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Miguel Alcubierre, el físico mexicano que propuso el motor warp, se inspiró DIRECTAMENTE en Star Trek. Era fan de la serie cuando era niño en la Ciudad de México. Años después, como estudiante de doctorado en Gales, se preguntó: \'¿Podría la relatividad general permitir algo así?\'La respuesta fue sí. ¡De niño fan a físico que cambió el campo!' }
    ],
    fact: 'En 2021, el físico Erik Lentz publicó un artículo proponiendo una burbuja warp que NO necesitaría materia exótica, solo energía positiva organizada de una manera específica. Aunque necesitaría la energía equivalente a cientos de masas solares, es la primera vez que se elimina el requisito de materia exótica. La comunidad científica lo debate activamente.'
  },
  {
    id: 'delorean-ingenieria',
    title: 'Ingeniería del DeLorean',
    color: '#FFA726',
    btnImage: '/assets/bttf/infographic_m6/btn_delorean-ingenieria.jpg',
    image: '/assets/bttf/infographic_m6/hero_delorean-ingenieria.jpg',
    content: [
      'El DeLorean DMC-12 fue desarrollado por John DeLorean, quien estableció su fábrica en Irlanda del Norte con apoyo del gobierno británico.',
      'Su carrocería está fabricada en acero inoxidable sin pintar. Este material contiene cromo, el cual forma una capa de óxido que previene la corrosión.',
      'Las puertas de "ala de gaviota" se abren verticalmente mediante resortes de torsión y amortiguadores de gas, un diseño que facilita el acceso en espacios reducidos.',
      'La producción se limitó a 9,000 unidades entre 1981 y 1983 debido a problemas financieros. Actualmente, existen empresas dedicadas a la restauración y mantenimiento de los vehículos restantes.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El guion original de BTTF tenía la máquina del tiempo como un REFRIGERADOR, no un coche. Steven Spielberg (productor ejecutivo) temió que los niños se encerraran en refrigeradores imitando a Marty, así que los guionistas lo cambiaron a un coche. Eligieron el DeLorean porque su carrocería de acero y puertas de gaviota ya parecían una nave espacial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'A 88 mph (141 km/h), el DeLorean enfrenta una fuerza de arrastre aerodinámico de aproximadamente 450 Newtons. Su coeficiente aerodinámico (Cd) es de 0.35 â€” no es terrible, pero tampoco elegante. Para comparar: un Tesla Model S tiene 0.208. El motor V6 PRV de 2.8 litros del DeLorean producía solo 130 HP, lo justo para alcanzar 88 mph... ¡pero sin sobrar potencia!' }
    ],
    fact: 'En la vida real, el DeLorean era un coche bastante lento. Su motor V6 de 130 caballos (originalmente iba a ser un Wankel rotativo) lo aceleraba de 0 a 100 km/h en 10.5 segundos â€” más lento que un Honda Civic actual. La ironía es que la máquina del tiempo más famosa del cine necesita velocidad para funcionar, ¡pero el coche real era notoriamente lento!'
  },
  {
    id: 'condensador-flujo',
    title: 'El Condensador de Flujo',
    color: '#E040FB',
    btnImage: '/assets/bttf/infographic_m6/btn_condensador-flujo.jpg',
    image: '/assets/bttf/infographic_m6/hero_condensador-flujo.jpg',
    content: [
      'En la ficción, el condensador de flujo permite el viaje en el tiempo. Según la historia, Doc Brown ideó su diseño en forma de "Y" invertida tras un accidente doméstico en 1955.',
      'En la física, el flujo electromagnético es una magnitud real que cuantifica el campo magnético a través de una superficie. Sus variaciones pueden inducir corriente eléctrica, principio base de los generadores.',
      'El requerimiento energético de 1.21 gigavatios es comparable a la producción de una central nuclear. Los rayos naturales pueden alcanzar estas potencias, aunque durante fracciones de segundo.',
      'Posteriormente, el dispositivo utiliza un reactor de fusión que transforma materia en energía. La fusión nuclear, similar a la reacción en las estrellas, es un área activa de investigación para la generación de energía.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En los primeros borradores del guion de "Regreso al Futuro", la máquina del tiempo era un refrigerador forrado de plomo. Para obtener la energía inmensa necesaria para el viaje temporal, Marty debía llevar el refrigerador al centro de una prueba de explosión nuclear en Nevada.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2014, científicos de la Universidad de Queensland, Australia, crearon un dispositivo real que llamaron \'capacitor de flujo cuántico\'(quantum flux capacitor). No viaja en el tiempo, pero puede hacer que la información cuántica circule en dos direcciones simultáneamente â€” algo que las computadoras cuánticas necesitan. Los científicos reconocieron que el nombre fue un homenaje deliberado a BTTF.' }
    ],
    fact: 'El diseño en \'Y\'del condensador de flujo fue dibujado por el diseñador de producción Lawrence G. Paull. La forma tiene tres \'brazos\'que convergen en un centro brillante. Curiosamente, algunos chips de computadora modernos tienen una topología similar para distribuir energía. El condensador de flujo ficción inspiró investigación real en distribución de flujo energético.'
  },
  {
    id: 'turistas-futuro',
    title: '¿Dónde Están los Turistas?',
    color: '#66BB6A',
    btnImage: '/assets/bttf/infographic_m6/btn_turistas-futuro.jpg',
    image: '/assets/bttf/infographic_m6/hero_turistas-futuro.jpg',
    content: [
      'La paradoja sobre la ausencia de turistas temporales sugiere que, si el viaje al pasado fuera posible, deberíamos haber recibido visitantes del futuro.',
      'En 2009, el físico Stephen Hawking organizó una recepción para viajeros en el tiempo, enviando las invitaciones después del evento. Ningún invitado asistió, lo que ilustró esta paradoja.',
      'Algunas hipótesis proponen que el viaje al pasado solo sería posible hasta el momento de creación de la primera máquina, o que los visitantes evitan la detección.',
      'La Conjetura de Protección de la Cronología de Hawking sugiere que las leyes físicas impiden el viaje al pasado. Según esta idea, los efectos cuánticos destruirían cualquier máquina temporal antes de su uso.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En BTTF, la máquina del tiempo SOLO transporta a quien está dentro del DeLorean. No hay \'turistas\'aleatorios apareciendo del futuro porque solo existe UNA máquina (la de Doc). Cuando Biff roba el DeLorean en BTTF II, es la primera vez que alguien más la usa â€” y crea un desastre temporal. La película ilustra perfectamente por qué controlar el acceso a una máquina del tiempo es crucial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La paradoja del turista tiene una solución matemática elegante llamada \'Principio de Autoconsistencia de Novikov\'(1980s): las leyes de la física solo permitirían viajes al pasado que NO crean paradojas. No podrías matar a tu abuelo ni crear contradicciones. El universo te \'forzaría\'a actuar de manera consistente. Es como si la realidad tuviera un auto-corrector.' }
    ],
    fact: 'Hawking consideró su fiesta vacía como \'evidencia experimental\'(con humor) contra el viaje al pasado. Pero hay un detalle delicioso: un viajero del futuro inteligente SABRÍA que ir a la fiesta de Hawking confirmaría públicamente el viaje temporal, con consecuencias impredecibles. ¡Quizás la razón de no ir a la fiesta es que sería la peor decisión posible para un viajero del tiempo!'
  },
  {
    id: 'gobernanza-temporal',
    title: 'Gobernanza del Tiempo',
    color: '#FF7043',
    btnImage: '/assets/bttf/infographic_m6/btn_gobernanza-temporal.jpg',
    image: '/assets/bttf/infographic_m6/hero_gobernanza-temporal.jpg',
    content: [
      'Si se desarrollara tecnología para viajar en el tiempo, surgirían importantes cuestiones sobre su control y acceso, planteando desafíos éticos complejos.',
      'La escala de Kardashev clasifica a las civilizaciones según su uso de energía. Construir una máquina del tiempo requeriría un control energético muy superior al nivel actual de la humanidad.',
      'La capacidad de alterar eventos pasados genera dilemas sobre las consecuencias de dichos cambios. Algunos filósofos, como David Lewis, sostienen que cualquier alteración resultaría en una historia autoconsistente.',
      'La gestión de estas tecnologías implicaría definir la responsabilidad de preservar o modificar la historia, evitando conflictos sobre las alteraciones temporales.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Doc Brown destruye el DeLorean al final de BTTF III porque comprende que la máquina del tiempo es demasiado peligrosa. Es una decisión de \'gobernanza temporal\'personal: elige que nadie más pueda viajar en el tiempo. Sin embargo, Doc construye un NUEVO vehículo temporal (la locomotora) â€” sugiriendo que la tentación del viaje temporal es irresistible, incluso para su inventor.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La humanidad consume actualmente unos 18 terawatts de energía total (toda la electricidad, transporte, industria del planeta). Una civilización Tipo I necesitaría 174 petawatts (10,000 veces más). Una Tipo II usaría la energía total del Sol: 3.8 Ã— 10Â²â¶ watts. Para tener perspectiva: la energía que produce el Sol en UN SEGUNDO bastaría para alimentar toda la civilización humana actual durante 500,000 años.' }
    ],
    fact: 'En 2004, el astrofísico Richard Gott III calculó que la probabilidad de que nuestra civilización sobreviva lo suficiente para construir una máquina del tiempo es de menos del 5%, usando el \'Argumento del Juicio Final\'(Doomsday Argument). Su razonamiento estadístico sugiere que el hecho de que existamos tan temprano en la historia de la humanidad hace improbable que la humanidad dure millones de años más. ¡Demoledor pero fascinante!'
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

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
