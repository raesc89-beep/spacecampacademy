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
  'maquina-tiempo': [DecoGear, DecoClockFace, DecoBolt],
  'tiempo-newton': [DecoClockFace, DecoGear, DecoTimeline],
  'einstein-relativo': [DecoWormhole, DecoAtomSvg, DecoTimeline],
  'flecha-tiempo': [DecoTimeline, DecoBolt, DecoWormhole],
  'paradoja-causal': [DecoWormhole, DecoTimeline, DecoClockFace],
  'condensador-flujo': [DecoFluxCapacitor, DecoBolt, DecoAtomSvg],
  'legado-cientifico': [DecoAtomSvg, DecoClockFace, DecoGear],
}; const BIBLIOGRAPHY = ['Einstein, A. (1905). \'Zur Elektrodynamik bewegter Körper\', Annalen der Physik, 17',
  'Faraday, M. (1832). \'Experimental Researches in Electricity\', Philosophical Transactions',
  'Everett, H. (1957). \'Relative State Formulation of Quantum Mechanics\', Reviews of Modern Physics, 29',
  'Novikov, I.D. (1989). \'An Analysis of the Operation of a Time Machine\', Soviet Physics JETP, 68',
  'Hawking, S. (1988). A Brief History of Time, Bantam Books',
  'Gott, J.R. (2001). Time Travel in Einstein\'s Universe, Houghton Mifflin'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'maquina-tiempo',
    title: 'La Máquina del Tiempo',
    color: '#6EC6FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_maquina.png',
    image: '/assets/bttf/infographic_condensador/hero_maquina.png',
    content: [
      'El viaje en el tiempo es un concepto analizado seriamente por la física moderna. En la película Regreso al Futuro (1985), el director Robert Zemeckis usó el DeLorean DMC-12 como máquina del tiempo, equipado con el ficticio Condensador de Flujo que necesita 1.21 gigawatts para funcionar. Esta cifra equivale a la potencia de un pequeño reactor nuclear y fue elegida porque sonaba lo suficientemente imposible para justificar el uso de un rayo como fuente de energía.',
      'La posibilidad real de construir una máquina del tiempo es objeto de estudio en física teórica. Aunque nuestra percepción cotidiana sugiere que el tiempo avanza en una sola dirección, la física moderna revela que su naturaleza es más compleja. La Teoría de la Relatividad de Einstein demostró que el tiempo no es absoluto: puede estirarse o comprimirse dependiendo de la velocidad del observador y de la intensidad del campo gravitacional a su alrededor.',
      'A lo largo de la historia de la física, los modelos del tiempo han cambiado radicalmente. Isaac Newton en 1687 lo concebía como un río universal que fluía a la misma velocidad para todos los observadores en cualquier lugar del universo. Einstein en 1905 demolió esta visión demostrando que dos observadores que se mueven a velocidades diferentes medirán el tiempo de forma distinta — ambos con relojes igualmente precisos y ambos teniendo razón simultáneamente.',
      'Los físicos teóricos que estudian el viaje temporal usan herramientas matemáticas de la relatividad general de Einstein (1915), que describe cómo la materia y la energía curvan el espacio-tiempo, creando lo que llamamos gravedad. En teoría, si pudieras curvar el espacio-tiempo de forma suficientemente extrema, podrías crear un atajo entre dos puntos diferentes en el tiempo, lo que los físicos llaman un agujero de gusano. Kip Thorne del MIT formalizó esta posibilidad en 1988.',
      'El mayor obstáculo práctico no es conceptual sino energético. Crear las condiciones necesarias para doblar el espacio-tiempo de forma que permita viajar al pasado requeriría cantidades de energía que exceden todo lo que la humanidad puede generar actualmente. Por eso, aunque la física no prohíbe explícitamente el viaje temporal, ninguna tecnología previsible puede materializarlo.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Doc Brown revela su máquina del tiempo a Marty McFly en el aparcamiento del Twin Pines Mall a las 1:17 AM del 26 de octubre de 1985. El DeLorean sale marcha atrás del remolque entre nubes de vapor de nitrógeno líquido, y Doc explica que necesita 1.21 gigawatts y alcanzar 88 millas por hora (141 km/h). El número 88 mph fue elegido por Zemeckis porque sonaba convincente, no por ningún cálculo científico real. La película fue rechazada por casi todos los estudios de Hollywood antes de que Universal la aceptara.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'La idea original de Regreso al Futuro surgió cuando el guionista Bob Gale encontró el anuario de instituto de su padre y vio que había sido el presidente de la asociación de alumnos. Se preguntó: si hubiera ido al instituto con mi padre cuando era joven, ¿habríamos sido amigos? Esta pregunta filosófica sobre el pasado y las relaciones entre generaciones fue el germen de toda la historia. El guión tardó cuatro años en encontrar productor.' }
    ],
    fact: 'Aunque el viaje al pasado sigue siendo ciencia ficción, el viaje al futuro ya ha ocurrido en pequeña escala. Los astronautas en la Estación Espacial Internacional viajan al futuro durante su misión: a 27,600 km/h, el tiempo pasa ligeramente más despacio para ellos. Sergei Krikalev, el humano que más tiempo ha pasado en el espacio (803 días), es aproximadamente 0.02 segundos más joven que si hubiera permanecido en la Tierra — viajó 0.02 segundos hacia su propio futuro gracias a la dilatación temporal de Einstein.'
  },
  {
    id: 'tiempo-newton',
    title: 'El Tiempo de Newton',
    color: '#FFD740',
    btnImage: '/assets/bttf/infographic_condensador/btn_newton.png',
    image: '/assets/bttf/infographic_condensador/hero_newton.png',
    content: [
      'En 1687, Isaac Newton publicó sus Principia Mathematica, obra que transformó la comprensión del universo. Para Newton, el tiempo era un flujo uniforme y absoluto que avanzaba a la misma velocidad en todos los rincones del cosmos, sin importar la velocidad de los objetos ni la intensidad de la gravedad. Era como un escenario fijo e invisible sobre el que ocurrían todos los eventos del universo.',
      'Según esta visión clásica, un reloj en la Tierra y un reloj en el borde del universo marcarían exactamente el mismo tiempo simultáneamente. Esta idea parece intuitiva porque en la vida cotidiana, a velocidades humanas, la diferencia entre el tiempo newtoniano y el tiempo real de Einstein es tan pequeña que resulta imposible de detectar sin instrumentos científicos de alta precisión.',
      'En el universo de Newton, todo era en principio predecible. Si conocieras la posición y velocidad de cada partícula del universo en un instante dado, podrías calcular con exactitud el estado completo del universo en cualquier momento futuro o pasado. Esta visión determinista hacía que el viaje en el tiempo resultara conceptualmente imposible: si el tiempo es un flujo fijo y universal, no puede recorrerse en sentido contrario.',
      'La mecánica newtoniana sigue siendo útil para la ingeniería y la tecnología cotidiana. Los ingenieros que calculan trayectorias de cohetes, puentes o aviones usan las ecuaciones de Newton porque a velocidades ordinarias sus predicciones son correctas con altísima precisión. La sonda Voyager 1, lanzada en 1977 y hoy en el espacio interestelar, viaja según trayectorias calculadas con física newtoniana.',
      'A principios del siglo XX, Albert Einstein demostró que el modelo de Newton estaba incompleto. En 1905, su Teoría de la Relatividad Especial mostró que el tiempo depende de la velocidad del observador. En 1915, su Relatividad General amplió esto para incluir la gravedad: el tiempo pasa más despacio en regiones de mayor gravedad. Newton tenía razón en situaciones cotidianas, pero el universo en sus extremos funciona de manera muy diferente a un reloj mecánico.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El reloj de la torre del ayuntamiento de Hill Valley es el símbolo más potente del tiempo newtoniano en la película: una estructura imponente e inamovible que marca el ritmo de todo el pueblo desde hace décadas. La foto del reloj parado en 10:04 captura la idea de que un evento extraordinario, el rayo de 1955, puede congelar el tiempo en un instante. Hill Valley organizó su identidad durante 30 años en torno a ese único momento — una ilustración del tiempo como algo fijo e inmutable, tal como Newton lo concebía.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ecuaciones de Newton funcionan tan bien que la NASA las usa hoy para calcular trayectorias de sondas espaciales. La Voyager 1, lanzada en 1977 y actualmente a más de 23,000 millones de kilómetros de la Tierra, navega por el espacio interestelar siguiendo trayectorias calculadas con física newtoniana. Solo se necesitan correcciones relativistas cuando las sondas pasan cerca de planetas gigantes como Júpiter o Saturno, donde la gravedad es suficientemente intensa para que el tiempo se distorsione de forma medible.' }
    ],
    fact: 'Isaac Newton nunca se sintió completamente satisfecho con su concepto de tiempo absoluto porque no podía explicar qué lo causaba ni dónde residía en el universo. Lo aceptó y lo publicó porque hacía que sus ecuaciones de la gravedad funcionaran perfectamente para describir el movimiento de los planetas. Este es uno de los casos más famosos en la historia de la ciencia donde un científico adoptó una hipótesis por su utilidad práctica, aunque no pudiera fundamentarla filosóficamente. Habría que esperar 218 años para que Einstein explicara la naturaleza real del tiempo.'
  },
  {
    id: 'einstein-relativo',
    title: 'El Tiempo Elástico',
    color: '#B388FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_einstein.png',
    image: '/assets/bttf/infographic_condensador/hero_einstein.png',
    content: [
      'En 1905, Albert Einstein publicó su Teoría de la Relatividad Especial, una de las revoluciones más profundas de la física. Einstein partió de dos postulados: las leyes de la física son iguales para todos los observadores en movimiento uniforme, y la velocidad de la luz en el vacío (299,792 km/s) es siempre la misma, sin importar la velocidad de la fuente o del observador. De estos dos postulados surgió una consecuencia revolucionaria: el tiempo es relativo.',
      'Si un objeto viaja a gran velocidad, el tiempo transcurre más lentamente para él en comparación con un observador en reposo. Este fenómeno, llamado dilatación temporal, no es una ilusión óptica ni un error de medición — es una diferencia real en la cantidad de tiempo que transcurre. Dos observadores con relojes perfectamente sincronizados, que se separan y viajan a velocidades diferentes, al reunirse mostrarán tiempos distintos. Ambos relojes habrán funcionado correctamente.',
      'La dilatación temporal ha sido verificada con gran precisión experimental. En 1971, el experimento Hafele-Keating colocó relojes atómicos de cesio a bordo de aviones comerciales que circumnavegaron el mundo. Al regresar, los relojes de los aviones mostraban un tiempo ligeramente menor que los relojes en tierra. La diferencia era exactamente la predicha por Einstein. Hoy, los satélites GPS corrigen este efecto constantemente para mantener la precisión de ubicación.',
      'La dilatación temporal implica que el viaje al futuro es físicamente posible y real. Un astronauta que viajara al 99% de la velocidad de la luz durante 5 años de su propio tiempo, regresaría a la Tierra para encontrar que han pasado allí aproximadamente 35 años. Ha saltado 30 años hacia el futuro sin envejecer más que 5 años. Este efecto es física verificada, y ya ocurre en pequeña escala con cada astronauta en órbita.',
      'Einstein también demostró en 1915 que la gravedad afecta al tiempo. Su Teoría de la Relatividad General mostró que cerca de objetos masivos el tiempo pasa más despacio. Un reloj en la cima del Everest avanza ligeramente más rápido que uno al nivel del mar — la diferencia es real y medible con relojes atómicos modernos. Tiempo y espacio están profundamente entrelazados en lo que Einstein llamó el espacio-tiempo, una estructura cuatridimensional que la materia curva con su masa.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Doc Brown nombra a su perro Einstein en honor al físico alemán, con lógica narrativa: Einstein el perro es el primer ser en viajar en el tiempo en la película. Doc lo coloca en el DeLorean y lo envía exactamente un minuto hacia el futuro. Cuando el coche regresa al presente, Einstein llega sano desde el futuro, con su reloj mostrando un minuto de retraso respecto al reloj de Doc. Es la primera demostración de que la máquina funciona — y un homenaje al padre de la relatividad.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'El sistema GPS es el caso más cotidiano de relatividad de Einstein en acción. Los 24 satélites GPS orbitan a 20,200 km de altura y a 14,000 km/h. Por su velocidad, sus relojes avanzan 7 microsegundos más despacio por día (relatividad especial). Pero al estar más lejos de la gravedad terrestre, avanzan 45 microsegundos más rápido por día (relatividad general). La corrección neta es de 38 microsegundos diarios. Sin ella, el GPS acumularía un error de 11 kilómetros por día, haciendo inútil cualquier navegación.' }
    ],
    fact: 'El astronauta ruso Sergei Krikalev ostenta el récord del mayor viaje temporal humano. Pasó 803 días en el espacio — en la estación Mir y en la ISS — viajando a unos 27,600 km/h. Por la dilatación temporal, su reloj biológico avanzó unos 0.02 segundos menos que si hubiera permanecido en la Tierra. Krikalev es 0.02 segundos más joven de lo que sería si nunca hubiera ido al espacio — un viaje real, físico y verificado hacia su propio futuro, aunque de escala minúscula.'
  },
  {
    id: 'flecha-tiempo',
    title: 'La Flecha del Tiempo',
    color: '#FF8A80',
    btnImage: '/assets/bttf/infographic_condensador/btn_flecha.png',
    image: '/assets/bttf/infographic_condensador/hero_flecha.png',
    content: [
      'La Flecha del Tiempo es un concepto físico que describe por qué el tiempo parece fluir en una sola dirección: del pasado hacia el futuro. La palabra flecha fue elegida por el físico Arthur Eddington en 1927 para indicar que el tiempo no es un camino de doble sentido. En física, la medida del desorden de un sistema se llama entropía, y la flecha del tiempo está íntimamente ligada a cómo la entropía cambia con el tiempo.',
      'La Segunda Ley de la Termodinámica es una de las leyes más fundamentales de la física: establece que la entropía total de un sistema aislado siempre aumenta o, en el mejor caso, se mantiene igual. Nunca disminuye espontáneamente. Si mezclas tinta en agua, la tinta se dispersa y la mezcla se vuelve uniforme — jamás verás que la tinta se concentre sola de nuevo. Esta tendencia universal al desorden es la razón por la que el tiempo tiene una dirección preferida.',
      'A nivel de partículas individuales, las interacciones físicas son simétricas en el tiempo: las ecuaciones de la mecánica cuántica funcionan igual hacia adelante que hacia atrás. Si filmaras el choque de dos electrones y reprodujeras el video al revés, el evento seguiría siendo físicamente posible. La flecha del tiempo no existe a nivel microscópico — solo emerge cuando tienes enormes cantidades de partículas interactuando a escala macroscópica.',
      'Viajar al pasado, desde el punto de vista termodinámico, requeriría revertir el aumento de entropía de todo el sistema del universo — hacer que todos los sistemas desorganizados se reorganicen espontáneamente. Esto contradice la Segunda Ley de la Termodinámica de una manera tan fundamental que muchos físicos lo consideran el obstáculo más profundo contra el viaje al pasado, incluso más que los problemas energéticos o causales.',
      'Algunos físicos teóricos modernos proponen que la flecha del tiempo no es una ley fundamental del universo, sino una propiedad emergente de las condiciones iniciales del Big Bang. El universo comenzó hace 13,800 millones de años en un estado de entropía extraordinariamente baja — perfectamente ordenado. Desde entonces ha evolucionado hacia mayor desorden. Si el universo hubiera comenzado en el caos máximo, no habría antes ni después perceptibles, y la vida compleja como la nuestra sería imposible.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando Marty altera el pasado en 1955 y evita que sus padres se enamoren, la fotografía que lleva de su familia comienza a borrarse lentamente. Sus hermanos desaparecen uno por uno hasta que la foto queda casi en blanco. Esta escena ilustra el problema de la causalidad alterada: al cambiar la causa en el pasado, el efecto futuro se desvanece gradualmente. La película usa esta metáfora visual para hacer tangible lo que los físicos llaman bucle causal — cuando una causa elimina su propio efecto.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El físico Arthur Eddington, quien acuñó el término flecha del tiempo en 1927, propuso que la dirección del tiempo está gobernada por la entropía. Algunos físicos modernos, como Sean Carroll del Caltech, argumentan que la flecha del tiempo solo existe porque el Big Bang fue extraordinariamente ordenado. Si el universo hubiera comenzado en un estado de alta entropía, el tiempo no tendría dirección preferida. Vivimos en un universo con flecha del tiempo simplemente porque nacimos después del Big Bang.' }
    ],
    fact: 'El físico Arthur Eddington acuñó el término Flecha del Tiempo en 1927, en su libro La naturaleza del mundo físico. Eddington se preguntó: si las leyes matemáticas de la física no distinguen entre el pasado y el futuro, de dónde viene nuestra percepción de que el tiempo fluye en una sola dirección. Su respuesta: de la Segunda Ley de la Termodinámica. Esta flecha termodinámica es lo que nos permite recordar el pasado pero no el futuro, y envejecer hacia adelante, nunca hacia atrás.'
  },
  {
    id: 'paradoja-causal',
    title: 'La Paradoja del Abuelo',
    color: '#CE93D8',
    btnImage: '/assets/bttf/infographic_condensador/btn_paradoja.png',
    image: '/assets/bttf/infographic_condensador/hero_paradoja.png',
    content: [
      'La Paradoja del Abuelo es el argumento más clásico contra el viaje al pasado. El escenario: si viajas al pasado y evitas que tus abuelos se conozcan y tengan hijos, uno de tus padres no nacería. Por tanto, tú tampoco nacerías. Si no existes, no puedes viajar al pasado para evitar el encuentro. Pero si el encuentro ocurre, tu padre nace, tú naces y puedes viajar — y el ciclo comienza de nuevo, sin solución lógica posible.',
      'Esta situación representa una violación de la causalidad: el principio físico que establece que las causas siempre preceden a sus efectos y que un efecto no puede eliminar su propia causa. La causalidad es tan fundamental para la física que Stephen Hawking propuso en 1992 que las leyes de la física deben incluir un mecanismo de protección de la cronología, una barrera que impida crear bucles causales paradójicos.',
      'Una solución teórica viene de la interpretación de los Muchos Mundos de la mecánica cuántica, propuesta por Hugh Everett en 1957. Según esta interpretación, cuando un viajero temporal modifica el pasado, no altera su propia línea temporal de origen — en cambio, crea una nueva rama del universo que diverge desde ese punto de cambio. El viajero pasa a vivir en esta nueva rama, mientras que en su universo original todo sigue igual.',
      'Otra propuesta es el Principio de Autoconsistencia de Igor Novikov (1989). Este físico ruso sostuvo que los viajes temporales son posibles, pero solo si los eventos son autoconsistentes: cualquier acción del viajero en el pasado ya formaba parte de la historia. En otras palabras, el viajero no puede cambiar el pasado porque todo lo que hará ya está incluido en la historia que llevó al futuro desde el que viajó.',
      'En 2020, investigadores de la Universidad de Queensland publicaron un estudio matemático en Classical and Quantum Gravity demostrando que, a nivel cuántico, los sistemas pueden viajar al pasado e interactuar consigo mismos sin generar paradojas. Las ecuaciones de la mecánica cuántica se ajustan automáticamente para que el pasado sea siempre autoconsistente — tal como predecía Novikov. Este resultado sugiere que, si el viaje temporal fuera posible, las paradojas podrían resolverse matemáticamente.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Marty McFly se enfrenta directamente a una versión de la paradoja del abuelo. Al empujar a su padre fuera del camino del coche de su abuelo, ocupa su lugar y su madre Lorraine se enamora de él en lugar de su padre George. El resto de la película es la carrera de Marty para que sus padres se enamoren antes de que su existencia quede borrada. La fotografía de familia borrándose es la metáfora visual de cómo una causa eliminada en el pasado deshace sus efectos futuros.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Principio de Protección de la Cronología de Stephen Hawking (1992) propone que las leyes de la física impiden la formación de bucles causales cerrados — situaciones donde el efecto podría viajar al pasado y eliminar su causa. Hawking argumentó que, aunque la Relatividad General matemáticamente permite algunos tipos de máquinas del tiempo, efectos cuánticos siempre se amplifican justo en el momento crítico para destruir la máquina antes de que pueda usarse. Llamó a esto un mecanismo de autocensura del universo.' }
    ],
    fact: 'Stephen Hawking era tan escéptico del viaje al pasado que en 2009 organizó una fiesta de bienvenida para viajeros temporales, pero solo anunció la invitación después de que terminó. Razonó: si el viaje temporal al pasado fuera posible, algún viajero del futuro habría aparecido en la fiesta. Nadie llegó. Hawking consideró esto evidencia experimental informal de que nadie nunca inventará una máquina del tiempo funcional que permita regresar al año 2009.'
  },
  {
    id: 'condensador-flujo',
    title: 'El Condensador de Flujo',
    color: '#00E5FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_condensador.png',
    image: '/assets/bttf/infographic_condensador/hero_condensador.png',
    content: [
      'El Condensador de Flujo es la pieza central de la máquina del tiempo de Doc Brown. En electrónica real, un condensador almacena energía eléctrica entre dos conductores separados por un aislante. El flujo, en física, se refiere a la cantidad de campo magnético, eléctrico o gravitacional que atraviesa una superficie. Juntos, condensador de flujo sugiere un dispositivo que almacena y concentra algún tipo de campo de fuerza — una descripción técnica vaga pero convincente.',
      'El dispositivo ficticio requiere exactamente 1.21 gigawatts para operar. Un gigawatt equivale a 1,000 millones de watts. Para comparar: un reactor nuclear típico produce entre 1 y 1.5 gigawatts. Una descarga de rayo libera entre 1 y 5 gigawatts durante unos 30 microsegundos. La primera fuente de energía que Doc usa es un rayo canalizado desde la torre del ayuntamiento — técnicamente la única fuente capaz de liberar esa potencia instantáneamente en 1955.',
      'En la física real, para crear una máquina del tiempo basada en la relatividad general — como un agujero de gusano que conecte dos puntos del espacio-tiempo — se necesitaría materia exótica: material hipotético con densidad de energía negativa. La materia exótica no ha sido observada en cantidades macroscópicas. Algunos efectos cuánticos, como el efecto Casimir, muestran densidades de energía negativas en escalas subatómicas, pero nada suficiente para estabilizar un agujero de gusano transitable.',
      'El físico teórico Kip Thorne del Caltech, Premio Nobel de Física en 2017 por la detección de ondas gravitacionales, calculó en 1988 que un agujero de gusano transitable requeriría concentrar una cantidad de energía negativa equivalente a varias veces la masa-energía de Júpiter. Con los materiales y tecnologías actualmente conocidos, esto está completamente fuera del alcance. Thorne fue cuidadoso: nunca dijo que fuera físicamente imposible — solo que requeriría tecnología radicalmente superior a la actual.',
      'Mientras esperamos tecnología para curvar el espacio-tiempo, los físicos sí aceleran partículas subatómicas a velocidades cercanas a la de la luz en aceleradores como el Gran Colisionador de Hadrones del CERN. En esas condiciones, la dilatación temporal de Einstein es real y medible: los muones creados en colisiones a alta velocidad duran mucho más de lo que durarían en reposo, exactamente según las predicciones de la relatividad. El CERN es, en sentido estricto, la máquina más parecida a una máquina del tiempo que los humanos han construido.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Doc Brown tuvo la visión del condensador de flujo el 5 de noviembre de 1955, mientras colgaba un reloj en su baño y resbaló golpeándose la cabeza con el lavabo. La forma en Y del dispositivo le reveló el principio del viaje temporal. Este momento aparece como un flashback en la primera película y es considerado uno de los mejores momentos de revelación científica del cine. La fecha, 5 de noviembre de 1955, se convirtió en fecha icónica de la cultura popular internacional.' },
      { label: '¿Sabías que...?', icon: 'sparkles', text: 'El departamento de arte de la película construyó el condensador de flujo original usando partes de una caja de conexiones eléctricas, luces LED parpadeantes y tubos de vidrio. El resultado fue tan icónico que hoy existen réplicas oficiales, coleccionables y hasta cargadores USB para coche con su forma exacta en Y. Bob Gale, el guionista, pronunció gigawatts como jigawatts en la película porque así se lo dijo un asesor científico — y la pronunciación incorrecta se volvió parte de la cultura popular.' }
    ],
    fact: 'El término 1.21 gigawatts se hizo tan famoso que el Departamento de Energía de Estados Unidos lo ha usado en comunicados oficiales como referencia cultural. En el mundo real, 1.21 gigawatts equivale aproximadamente a la potencia de un reactor nuclear pequeño, o a la energía liberada por la combustión de 400 toneladas de gasolina en un segundo. La descarga de un rayo real libera entre 1 y 5 gigawatts, pero solo durante 30 microsegundos — no el tiempo suficiente para cargar ningún condensador de flujo.'
  },
  {
    id: 'legado-cientifico',
    title: 'Legado Científico',
    color: '#FFAB91',
    btnImage: '/assets/bttf/infographic_condensador/btn_legado.png',
    image: '/assets/bttf/infographic_condensador/hero_legado.png',
    content: [
      'Regreso al Futuro (1985) no solo fue un éxito cinematográfico — recaudó 381 millones de dólares en su estreno y ganó un Óscar por mejores efectos de sonido — sino que se convirtió en una de las mayores obras de divulgación científica de la historia del cine. Encuestas a físicos e ingenieros de varias universidades muestran que esta película fue una de las principales razones por las que eligieron sus carreras científicas. La figura de Doc Brown cambió la imagen pública del científico loco y solitario.',
      'La película logró algo difícil: simplificar conceptos físicos abstractos como la paradoja causal, las líneas temporales múltiples, la dilatación temporal y el continuo espacio-tiempo, haciéndolos accesibles a personas sin formación en física. No lo hizo con perfecta precisión científica — hay libertades creativas importantes — pero capturó la esencia de los problemas reales. Millones de personas aprendieron qué es una paradoja temporal o por qué la velocidad afecta al tiempo gracias a Marty McFly.',
      'La computación cuántica, uno de los campos tecnológicos más prometedores del siglo XXI, usa el concepto de qubit — una unidad de información cuántica. A diferencia del bit clásico que solo puede ser 0 o 1, un qubit puede estar en una superposición de ambos estados cuánticos simultáneamente. Esta propiedad permite a los ordenadores cuánticos explorar múltiples cálculos en paralelo, con aplicaciones en criptografía, simulación molecular y optimización de rutas logísticas.',
      'El físico Ronald Mallett, profesor de la Universidad de Connecticut, es uno de los investigadores más serios del mundo sobre el viaje temporal. Desde niño, tras la muerte de su padre, se propuso inventar una máquina del tiempo para volver a verlo. Publicó en 2003 una propuesta teórica usando láseres en rotación para crear un campo gravitacional que pueda torcer el tiempo. La propuesta es matemáticamente válida pero enfrentaría obstáculos de ingeniería enormes con la tecnología actual.',
      'El legado científico de Regreso al Futuro se mide también en la cultura académica. En 2015, cuando la película predecía el futuro, científicos de todo el mundo publicaron artículos comparando las predicciones de la película con la realidad. Física teórica, computación cuántica, ingeniería aeroespacial — todos los campos tienen investigadores que aprendieron a amar la ciencia viendo a Doc y Marty. Pocas obras de ficción han contribuido tanto a despertar vocaciones científicas en generaciones completas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Al final de la trilogía, en la parte III, Doc le da a Marty y Jennifer el mensaje más importante de toda la saga: Vuestro futuro no ha sido escrito todavía. El de nadie lo está. Vuestro futuro es el que vosotros os forjéis, así que haceos uno bueno. Esta frase sintetiza la filosofía implícita de toda la trilogía: el futuro no está determinado y nuestras decisiones en el presente tienen consecuencias reales. Es también el mejor resumen posible de por qué estudiar ciencia importa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 2015, el año al que viajaba Marty en la segunda película, físicos de la Universidad de Bristol bautizaron su nuevo simulador cuántico con el nombre Condensador de Flujo, en homenaje a la película. Este simulador permite estudiar procesos cuánticos al revés para entender mejor la termodinámica y la flecha del tiempo. El guiño de los físicos demuestra cuánto influyó la película en la cultura científica real de generaciones de investigadores.' }
    ],
    fact: 'En 2015, científicos de la Universidad de Bristol nombraron Condensador de Flujo a su nuevo simulador cuántico capaz de revertir la evolución temporal de los fotones, en homenaje a la película. También ese año, físicos del MIT publicaron un artículo evaluando si las predicciones tecnológicas de Regreso al Futuro II se habían cumplido. La conclusión: pantallas planas y videollamadas sí, hoverboards y coches voladores todavía no. La física real avanzó rápido en comunicaciones pero más despacio en propulsión — al menos de momento.'
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
          const colors = ['#6EC6FF','#FFD740','#B388FF','#FF8A80','#CE93D8','#00E5FF','#FFAB91'];
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
        <text x="300" y="80" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL CONDENSADOR DE FLUJO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">FÍSICA NUCLEAR Y CUÁNTICA</text>
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
          layoutId="activeDotBttfM1"
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
            pointerEvents: 'none',
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #6EC6FF, #FFAB91)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_BttfM1() {
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
      background: 'url(/assets/bttf/infographic_condensador/bg_condensador.png) center/cover',
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
