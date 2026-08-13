'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// â”€â”€â”€ SVG Decorative Elements (Time Travel themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoClockwork({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Clock hands */}
      <line x1="30" y1="30" x2="30" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="30" y1="30" x2="42" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Hour markers */}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
        const r1 = 21, r2 = 24, rad = (a * Math.PI) / 180;
        return <line key={i} x1={30+r1*Math.cos(rad)} y1={30+r1*Math.sin(rad)} x2={30+r2*Math.cos(rad)} y2={30+r2*Math.sin(rad)} stroke={color} strokeWidth="1.5" opacity="0.6" />;
      })}
      {/* Gear teeth */}
      {[15,45,75,105,135,165,195,225,255,285,315,345].map((a,i) => {
        const rad = (a * Math.PI) / 180;
        return <rect key={i} x={30+23*Math.cos(rad)-2} y={30+23*Math.sin(rad)-2} width="4" height="4" fill={color} opacity="0.3" transform={`rotate(${a} ${30+23*Math.cos(rad)} ${30+23*Math.sin(rad)})`} />;
      })}
    </svg>
  );
}

function DecoLightning({ size = 70, color = '#FFD700', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sparks */}
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoTimeline({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Main timeline */}
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Branch */}
      <path d="M40 20 Q50 10 65 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M40 20 Q50 30 65 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Nodes */}
      {[15, 30, 40, 55, 70].map((x,i) => <circle key={i} cx={x} cy="20" r="3" fill={color} opacity="0.5" />)}
      <circle cx="65" cy="8" r="2.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="32" r="2.5" fill={color} opacity="0.4" />
      {/* Arrow */}
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      {/* Electron orbits */}
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      {/* Electrons */}
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
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

function DecoDeLoreanSvg({ size = 80, color = '#90CAF9', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Car body silhouette */}
      <path d="M10 28 L18 28 L22 18 L35 14 L55 14 L62 18 L70 28 L72 28" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Wheels */}
      <circle cx="24" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Speed trails */}
      <line x1="2" y1="20" x2="12" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="4" y1="24" x2="14" y2="24" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="6" y1="28" x2="10" y2="28" stroke={color} strokeWidth="1" opacity="0.2" />
      {/* Fire trails */}
      <path d="M72 26 Q76 24 78 26 Q76 28 72 26" fill={color} opacity="0.3" />
      <path d="M72 30 Q76 28 78 30 Q76 32 72 30" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoFormula({ size = 70, color = '#FFAB91', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* E=mcÂ² stylized */}
      <text x="10" y="28" fill={color} fontSize="20" fontWeight="bold" fontFamily="serif" opacity="0.4">E=mcÂ²</text>
      {/* Floating particles */}
      <circle cx="58" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="62" cy="18" r="1" fill={color} opacity="0.4" />
      <circle cx="55" cy="36" r="1.5" fill={color} opacity="0.5" />
      <circle cx="8" cy="8" r="1" fill={color} opacity="0.3" />
      {/* Wavy lines */}
      <path d="M5 38 Q15 34 25 38 Q35 42 45 38" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'relatividad-basico': [DecoClockwork, DecoFormula, DecoAtomSvg],
  'delorean-velocidad': [DecoDeLoreanSvg, DecoLightning, DecoClockwork],'paradoja-abuelo': [DecoTimeline, DecoWormhole, DecoClockwork],'einstein-relatividad': [DecoFormula, DecoAtomSvg, DecoClockwork],
  'muchos-mundos': [DecoWormhole, DecoTimeline, DecoAtomSvg],
  'predicciones-2015': [DecoDeLoreanSvg, DecoLightning, DecoFormula],'ciencia-ficcion': [DecoWormhole, DecoFormula, DecoTimeline],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Einstein, A. (1905). Zur Elektrodynamik bewegter Korper, Annalen der Physik, 17',
  'Hawking, S. (1988). A Brief History of Time, Bantam Books',
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton',
  'Gott, J.R. (2001). Time Travel in Einstein\'s Universe, Houghton Mifflin',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'relatividad-basico',
    title: '¿Qué es el Tiempo?',
    color: '#6EC6FF',
    btnImage: '/assets/bttf/infographic_m2/btn_relatividad-basico.jpg',
    image: '/assets/bttf/infographic_m2/hero_relatividad-basico.jpg',
    content: [
      'Si tienes un reloj y tu amigo tiene otro idéntico, y tu amigo viaja en un cohete al 90% de la velocidad de la luz, su reloj se atrasaría respecto al tuyo. El tiempo transcurre más despacio para objetos en movimiento rápido.',
      'Esto fue demostrado por Albert Einstein en 1905 con la Teoría de la Relatividad Especial. En 1971, los físicos Joseph Hafele y Richard Keating lo comprobaron experimentalmente subiendo relojes atómicos a aviones. Tras dar la vuelta al mundo, estos relojes se atrasaron 59 nanosegundos respecto a los que se quedaron en tierra.',
      'Los satélites GPS aplican este principio. Por su velocidad (14,000 km/h), sus relojes se atrasan 7 microsegundos al día. Sin embargo, por estar más lejos de la gravedad terrestre, se adelantan 45 microsegundos diarios. El sistema corrige esta diferencia para evitar errores de ubicación.',
      'El tiempo posee una dirección. Los físicos lo denominan la "flecha del tiempo", relacionada con la entropía, que es la medida del desorden en un sistema. Los sistemas tienden a pasar de un estado ordenado a uno desordenado, marcando el avance temporal.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Si pudieras viajar al 99.9% de la velocidad de la luz, el tiempo pasaría para ti 22 veces más lento. Un viaje de 1 año para ti serían 22 años en la Tierra. ¡Volverías al futuro como Marty McFly!' },
      { label: 'En la Película', icon: 'zap', text: 'En "Regreso al Futuro", Doc Brown dice que el tiempo es la "cuarta dimensión". ¡Esto es correcto! Einstein unificó las tres dimensiones del espacio con el tiempo en un concepto llamado"espacio-tiempo" de cuatro dimensiones.' },
    ],
    fact: 'Los muones â€” partículas diminutas creadas cuando los rayos cósmicos golpean la atmósfera â€” viajan al 99.94% de la velocidad de la luz. Deberían desintegrarse antes de llegar al suelo, pero gracias a la dilatación temporal, el tiempo pasa tan lento para ellos que SÍ llegan. ¡La relatividad ocurre sobre nuestras cabezas todos los días!',
  },
  {
    id: 'delorean-velocidad',
    title: '88 Millas por Hora',
    color: '#FFD740',
    btnImage: '/assets/bttf/infographic_m2/btn_delorean-velocidad.jpg',
    image: '/assets/bttf/infographic_m2/hero_delorean-velocidad.jpg',
    content: [
      'En la película, el DeLorean debe alcanzar 88 millas por hora (141 km/h) para viajar en el tiempo. Aunque se muestra como una velocidad alta, un avión comercial promedio viaja a unos 900 km/h.',
      'Para que la dilatación temporal relativista sea notable, se requiere viajar a una fracción significativa de la velocidad de la luz (cerca de 1,079 millones de km/h). A la velocidad de la luz, se podrían dar 7.5 vueltas a la Tierra en un segundo.',
      'El modelo DeLorean DMC-12 fue fabricado en Irlanda del Norte entre 1981 y 1983. Se produjeron unas 9,000 unidades antes del cierre de la compañía. Se caracterizaba por su carrocería de acero inoxidable sin pintar y puertas de ala de gaviota.',
      'La película indica que la máquina del tiempo requiere 1.21 gigawatts de potencia, equivalente a la energía producida por un reactor nuclear o a la descarga de un rayo. En la ficción, esto se obtiene primero de plutonio y luego de un reactor de fusión.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las zapatillas Nike Mag de "Regreso al Futuro II" se hicieron realidad. Nike presentó en 2016 las Nike HyperAdapt con sistema de ajuste automático real. Solo se fabricaron 89 pares de las Mag originales, subastadas por hasta $200,000 dólares cada par para caridad.' },
      { label: 'Dato Científico', icon: 'atom', text: '1.21 gigawatts no es una cifra descabellada. La estación espacial ISS usa solo 120 kilowatts de energía solar. Un rayo produce entre 1 y 5 gigawatts, pero solo durante 30 microsegundos. La fusión nuclear controlada (como en ITER, Francia) podría producir 500 megawatts â€” todavía menos que lo que necesita el DeLorean.' },
    ],
    fact: 'El número "88 mph"fue elegido por los guionistas Bob Gale y Robert Zemeckis porque les gustó cómo se veía"88" en el velocímetro del DeLorean. No tiene ningún significado científico. Sin embargo, en el sistema métrico, 88 mph = 141.62 km/h, que casualmente es la velocidad máxima real que alcanzaba el DMC-12 original.',
  },
  {
    id: 'paradoja-abuelo',
    title: 'La Paradoja del Abuelo',
    color: '#FF8A80',
    btnImage: '/assets/bttf/infographic_m2/btn_paradoja-abuelo.jpg',
    image: '/assets/bttf/infographic_m2/hero_paradoja-abuelo.jpg',
    content: [
      'La Paradoja del Abuelo describe un problema de causalidad: si viajas al pasado y evitas que tus abuelos se conozcan, tus padres no nacerían y tú tampoco. Pero si tú no naces, no puedes viajar al pasado para alterar los eventos.',
      'Esta paradoja plantea una contradicción lógica fundamental sobre el viaje temporal hacia el pasado, creando un bucle causal irresoluble.',
      'La película ilustra este concepto de forma visual cuando Marty interfiere en el encuentro de sus padres en 1955 y comienza a desaparecer de una fotografía, indicando el riesgo de ser borrado de la existencia.',
      'La física teórica propone posibles soluciones. La Interpretación de Muchos Mundos sugiere que alterar el pasado crea una línea temporal paralela. El Principio de Autoconsistencia de Novikov plantea que las leyes de la física impiden acciones que generen paradojas.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Marty no es el único que casi causa una paradoja. En BTTF II, el viejo Biff roba el DeLorean y se da el almanaque deportivo a sí mismo en 1955, creando una línea temporal alternativa donde es millonario y Hill Valley es un desastre. Doc explica que el viaje creó una "tangente temporal" â€” una rama del tiempo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El filósofo David Lewis argumentó en 1976 que no hay paradoja real: si viajaras al pasado para "matar a tu abuelo", algo SIEMPRE lo impediría â€” te resbalarias, fallarías el tiro, cambiarías de opinión. El universo conspiraría para mantener la consistencia. ¡Es como si la realidad tuviera un sistema inmunológico!' },
    ],
    fact: 'En la física real, el concepto más cercano a una "paradoja temporal" ocurre a nivel cuántico. Las partículas de antimateria (como el positrón) se comportan matemáticamente como si fueran partículas normales viajando hacia atrás en el tiempo. El físico Richard Feynman propuso esta interpretación en 1949, ¡y las matemáticas funcionan perfectamente!',
  },
  {
    id: 'einstein-relatividad',
    title: 'Einstein y el Tiempo Elástico',
    color: '#B388FF',
    btnImage: '/assets/bttf/infographic_m2/btn_einstein-relatividad.jpg',
    image: '/assets/bttf/infographic_m2/hero_einstein-relatividad.jpg',
    content: [
      'En 1905, Albert Einstein publicó la Teoría de la Relatividad Especial, la cual postula que la percepción del tiempo es relativa y depende de la velocidad del observador.',
      'El modelo describe el tiempo como una dimensión elástica. A velocidades bajas el efecto de dilatación es imperceptible, pero se incrementa de forma significativa a medida que el objeto se acerca a la velocidad de la luz.',
      'La Paradoja de los Gemelos es un ejemplo teórico: si un gemelo viaja al 90% de la velocidad de la luz durante 5 años, al regresar encontraría que en la Tierra han pasado 11.5 años. Este es un efecto físico comprobado.',
      'El experimento de Hafele y Keating en 1971 demostró esta dilatación temporal utilizando relojes atómicos en vuelos comerciales, validando las predicciones matemáticas de Einstein.'
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'La ecuación más famosa del mundo, E=mcÂ², dice que la energía (E) es igual a la masa (m) multiplicada por la velocidad de la luz al cuadrado (cÂ²). Como c = 300,000 km/s, cÂ² es un número ENORME. Por eso una cantidad diminuta de masa contiene una cantidad colosal de energía. Una moneda de 1 centavo contiene suficiente energía (según E=mcÂ²) para abastecer a una ciudad pequeña durante varios días.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Einstein no ganó el Nobel por la relatividad sino por explicar el efecto fotoeléctrico (cómo la luz arranca electrones de los metales). El comité Nobel consideró la relatividad "demasiado teórica" en 1921. Hoy usamos el efecto fotoeléctrico en paneles solares y cámaras digitales.' },
    ],
    fact: 'El astronauta Scott Kelly pasó 340 días en la Estación Espacial Internacional (que orbita a 27,600 km/h). Cuando regresó, era 8.6 milisegundos más joven que su hermano gemelo Mark Kelly (también astronauta). ¡La paradoja de los gemelos ocurrió literalmente! Scott viajó una fracción infinitesimal al futuro.',
  },
  {
    id: 'muchos-mundos',
    title: 'Líneas Temporales Paralelas',
    color: '#CE93D8',
    btnImage: '/assets/bttf/infographic_m2/btn_muchos-mundos.jpg',
    image: '/assets/bttf/infographic_m2/hero_muchos-mundos.jpg',
    content: [
      'En la película, Doc Brown ilustra la ramificación de líneas temporales. Este concepto se asemeja a la Interpretación de Muchos Mundos de la mecánica cuántica.',
      'Propuesta por Hugh Everett III en 1957, esta teoría sugiere que cada evento cuántico provoca una ramificación del universo. Ambas posibilidades de un evento ocurren, pero en realidades separadas.',
      'Bajo este modelo, existirían múltiples universos paralelos producto de cada variación histórica, aunque no habría interacción directa entre ellos.',
      'El Principio de Incertidumbre de Heisenberg (1927) establece límites sobre la medición simultánea de la posición y velocidad de una partícula, lo que implica que ciertos eventos a nivel cuántico son probabilísticos, no deterministas.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando Biff altera 1955 con el almanaque, Doc explica que creó una "tangente temporal" â€” una línea alternativa del tiempo. En esta versión, Hill Valley es un paraíso del crimen y Biff es dueño de un casino. Doc y Marty deben volver a 1955 para restaurar la línea original. ¡Puro Everett en acción!' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Hugh Everett abandonó la física en 1960 porque nadie tomaba en serio su teoría. Se dedicó a trabajar para el Pentágono en análisis matemático militar. Murió en 1982 sin saber que su idea se convertiría en una de las interpretaciones más estudiadas y debatidas de la mecánica cuántica. Su hijo Mark Oliver Everett es el cantante de la banda de rock Eels.' },
    ],
    fact: 'Si la interpretación de Muchos Mundos es correcta, desde el Big Bang se han creado un número inimaginable de universos paralelos. El físico Max Tegmark calculó que la copia más cercana de ti â€” idéntica átomo por átomo â€” estaría a 10^(10^29) metros de distancia. Eso es un 1 seguido de 100,000,000,000,000,000,000,000,000,000 ceros de metros. ¡Lejos pero existente!',
  },
  {
    id: 'predicciones-2015',
    title: 'Predicciones del Futuro',
    color: '#80CBC4',
    btnImage: '/assets/bttf/infographic_m2/btn_predicciones-2015.jpg',
    image: '/assets/bttf/infographic_m2/hero_predicciones-2015.jpg',
    content: [
      'La secuela de la película imaginó el año 2015, anticipando tecnologías como las tabletas electrónicas, las pantallas planas, las videollamadas, el pago mediante biometría y las gafas inteligentes.',
      'Sin embargo, otras proyecciones no se cumplieron, como el uso masivo de autos voladores, la prevalencia del fax, o el uso cotidiano de ropa autoajustable y aerodeslizadores.',
      'Las predicciones suelen acertar en las tendencias generales de conectividad y miniaturización, pero divergen en el desarrollo de productos de consumo específicos.',
      'La película mostró la victoria de los Cubs de Chicago en la Serie Mundial de 2015. En la realidad, el equipo ganó el campeonato en 2016 tras una larga sequía de victorias.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las zapatillas Nike Mag de la película se hicieron realidad con el sistema "E.A.R.L." (Electro Adaptive Reactive Lacing). Este mecanismo usaba un sensor en el talón que activaba un micromotor a batería, el cual tensaba los cordones automáticamente al detectar el peso del pie del usuario.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El progreso tecnológico avanza más rápido en información que en transporte. En 1969 fuimos a la Luna; en 2026, el cohete más rápido viaja a velocidades similares. Pero la capacidad de computación se ha multiplicado por más de mil millones desde entonces. Por eso tenemos smartphones pero no coches voladores.' },
    ],
    fact: 'La predicción más profunda de BTTF no fue un gadget sino un concepto social: la película mostró un mundo donde la tecnología está integrada naturalmente en la vida cotidiana, donde las personas interactúan con dispositivos constantemente y la información es ubicua e inmediata. Esto describe perfectamente la realidad de 2015 y más allá. Los guionistas entendieron el ESPÍRITU del futuro, aunque no los detalles.',
  },
  {
    id: 'ciencia-ficcion',
    title: 'Ciencia Ficción como Brújula',
    color: '#FFAB91',
    btnImage: '/assets/bttf/infographic_m2/btn_ciencia-ficcion.jpg',
    image: '/assets/bttf/infographic_viajes_tiempo/hero_cienciaficcion.png',
    content: [
      'La ciencia ficción frecuentemente precede a las innovaciones tecnológicas. Los comunicadores de series televisivas inspiraron la invención del teléfono móvil, mientras que la literatura anticipó los submarinos y las tabletas electrónicas.',
      'El cine ha motivado a investigadores a explorar teorías sobre el tiempo y el espacio. Diversos físicos han analizado la viabilidad teórica de dispositivos de manipulación temporal basándose en principios gravitacionales.',
      'La causalidad, donde una causa precede a su efecto, es un principio fundamental en física. Stephen Hawking propuso que las leyes del universo impiden la formación de curvas temporales cerradas para preservar esta causalidad.',
      'La ciencia teórica aborda interrogantes sobre la naturaleza y dirección del tiempo, utilizando modelos matemáticos para establecer los límites físicos de los fenómenos descritos en la ficción.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Stephen Hawking organizó una "Fiesta para Viajeros del Tiempo"el 28 de junio de 2009 en la Universidad de Cambridge. Preparó champán, globos y un cartel de bienvenida... Pero envió las invitaciones DESPUÉS de la fiesta. Su lógica: si el viaje al pasado fuera posible, alguien del futuro habría recibido la invitación y asistido. Nadie vino. Hawking lo consideró"evidencia experimental" de que el viaje al pasado probablemente es imposible.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El físico Kip Thorne (Premio Nobel 2017) demostró en 1988 que los agujeros de gusano PODRÍAN permitir el viaje en el tiempo en teoría, pero requerirían "materia exótica"con energía negativa para mantenerlos abiertos. Aún no sabemos si la materia exótica existe. Thorne fue asesor científico de la película"Interstellar".' },
    ],
    fact: 'Michael J. Fox (Marty McFly) fue diagnosticado con Parkinson a los 29 años. Creó la Fundación Michael J. Fox, que ha recaudado más de $1,500 millones de dólares para investigación del Parkinson â€” más que cualquier otra fundación privada de enfermedad neurológica. La ciencia ficción que interpretó ahora financia ciencia real.',
  },
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
      hue: Math.random() > 0.5 ? '160,200,255' : '200,160,255', // blue or purple
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

// â”€â”€â”€ Time Travel Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TimeTravelHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(110,198,255,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6EC6FF','#FFD740','#FF8A80','#B388FF','#CE93D8','#80CBC4','#FFAB91'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central clock icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#6EC6FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#6EC6FF" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#6EC6FF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#6EC6FF" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(110,198,255,0.2)" />
            <stop offset="50%" stopColor="rgba(110,198,255,0.9)" />
            <stop offset="100%" stopColor="rgba(110,198,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#6EC6FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">VIAJES EN EL TIEMPO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(110,198,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DETRÁS DE LA FICCIÓN</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button (matching M9 Dendera style) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(110,198,255,0.2)'}`,
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
          layoutId="activeDotBttfM2"
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
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
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

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(110,198,255,0.15)',
    }}>
      <Star size={14} style={{ color: '#6EC6FF', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #6EC6FF, #B388FF)', borderRadius: '3px', boxShadow: '0 0 8px rgba(110,198,255,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#6EC6FF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_BttfM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/bttf/infographic_viajes_tiempo/bg_viajes_tiempo.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(110,198,255,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <TemporalField />

      <TimeTravelHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(110,198,255,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(110,198,255,0.08)', borderRadius: '16px',
              border: '1px solid rgba(110,198,255,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#6EC6FF', fontSize: '1.1rem', fontWeight: 'bold' }}>
              ðŸ† ¡Has dominado los secretos del Viaje en el Tiempo!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Viajero Temporal
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* â”€â”€â”€ Bibliografía â”€â”€â”€ */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ðŸ“š Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
