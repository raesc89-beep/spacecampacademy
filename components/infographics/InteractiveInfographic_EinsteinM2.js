'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Special Relativity themed) ────────────────────
function DecoLightCone({ size = 70, color = '#D4A03C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Light cone shape */}
      <line x1="30" y1="5" x2="30" y2="55" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 30 L10 5 M30 30 L50 5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M30 30 L10 55 M30 30 L50 55" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Worldline */}
      <path d="M25 55 Q28 40 30 30 Q32 20 35 5" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="3 2" />
    </svg>
  );
}

function DecoSpacetimeGrid({ size = 70, color = '#3A5280', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Curved spacetime grid */}
      {[15, 25, 35, 45].map((y, i) => (
        <path key={`h${i}`} d={`M5 ${y} Q30 ${y + (i === 1 || i === 2 ? 8 : 3)} 55 ${y}`} fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      ))}
      {[15, 25, 35, 45].map((x, i) => (
        <path key={`v${i}`} d={`M${x} 5 Q${x + (i === 1 || i === 2 ? 5 : 2)} 30 ${x} 55`} fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      ))}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoPhoton({ size = 70, color = '#D4A03C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Wave-particle duality */}
      <path d="M5 30 Q12 18 20 30 Q28 42 35 30 Q42 18 50 30 Q55 38 58 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="55" cy="30" r="4" fill={color} opacity="0.4" />
      {/* Photon particles */}
      <circle cx="10" cy="22" r="1.5" fill={color} opacity="0.5" />
      <circle cx="25" cy="38" r="1" fill={color} opacity="0.4" />
      <circle cx="42" cy="20" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoClockDilation({ size = 70, color = '#C4922E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Two clocks at different rates */}
      <circle cx="20" cy="25" r="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="20" cy="25" r="2" fill={color} opacity="0.5" />
      <line x1="20" y1="25" x2="20" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="20" y1="25" x2="27" y2="22" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Second clock (stretched/dilated) */}
      <ellipse cx="42" cy="38" rx="10" ry="14" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="42" cy="38" r="1.5" fill={color} opacity="0.4" />
      <line x1="42" y1="38" x2="42" y2="28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Arrow between */}
      <path d="M30 28 L36 33" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoEmc2({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* E=mc² stylized */}
      <text x="10" y="28" fill={color} fontSize="20" fontWeight="bold" fontFamily="serif" opacity="0.4">E=mc²</text>
      {/* Energy rays */}
      <line x1="58" y1="12" x2="65" y2="5" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="60" y1="18" x2="68" y2="14" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="58" y1="28" x2="66" y2="32" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="56" cy="20" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoSatellite({ size = 80, color = '#4A6694', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Satellite body */}
      <rect x="32" y="18" width="16" height="12" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Solar panels */}
      <rect x="8" y="20" width="22" height="8" rx="1" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <rect x="50" y="20" width="22" height="8" rx="1" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Panel lines */}
      <line x1="14" y1="20" x2="14" y2="28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="20" y1="20" x2="20" y2="28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="56" y1="20" x2="56" y2="28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="62" y1="20" x2="62" y2="28" stroke={color} strokeWidth="0.5" opacity="0.3" />
      {/* Signal waves */}
      <path d="M40 32 Q38 38 36 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 32 Q42 38 44 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Antenna */}
      <line x1="40" y1="18" x2="40" y2="12" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="40" cy="10" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'annus-mirabilis': [DecoPhoton, DecoEmc2, DecoSpacetimeGrid],
  'postulados-relatividad': [DecoLightCone, DecoPhoton, DecoSpacetimeGrid],
  'dilatacion-temporal': [DecoClockDilation, DecoLightCone, DecoPhoton],
  'contraccion-longitud': [DecoSpacetimeGrid, DecoLightCone, DecoClockDilation],
  'equivalencia-masa-energia': [DecoEmc2, DecoPhoton, DecoLightCone],
  'evidencia-experimental': [DecoSatellite, DecoClockDilation, DecoEmc2],
  'relatividad-cotidiana': [DecoSatellite, DecoEmc2, DecoSpacetimeGrid],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Isaacson, W. (2007). Einstein: His Life and Universe, Simon & Schuster',
  'Pais, A. (1982). Subtle is the Lord: The Science and the Life of Albert Einstein, Oxford University Press',
  'Einstein, A. (1905). Zur Elektrodynamik bewegter Körper, Annalen der Physik, 17(10), 891–921',
  'Hafele, J.C. & Keating, R.E. (1972). Around-the-World Atomic Clocks: Predicted Relativistic Time Gains, Science, 177(4044), 166–168',
  'Taylor, E.F. & Wheeler, J.A. (1992). Spacetime Physics: Introduction to Special Relativity, 2nd ed., W.H. Freeman',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'annus-mirabilis',
    title: 'El Año Milagroso: 1905',
    color: '#2C3E6B',
    btnImage: '/assets/einstein/einstein_m2.png',
    image: '/assets/einstein/einstein_m2.png',
    content: [
      'En 1905, un empleado de 26 años en la Oficina Federal de Patentes de Berna, Suiza, publicó cuatro artículos científicos en la revista Annalen der Physik que transformaron la física para siempre. Ese empleado era Albert Einstein, y los historiadores de la ciencia llaman a 1905 el "Annus Mirabilis" (año milagroso en latín). Einstein no tenía laboratorio, ni asistentes, ni posición universitaria. Trabajaba seis días a la semana evaluando solicitudes de inventos, y desarrollaba sus teorías en su tiempo libre, usando solamente papel, lápiz y su capacidad de razonamiento abstracto. Ningún otro científico en la historia ha producido contribuciones de esa magnitud en un solo año.',
      'El primer artículo, publicado en marzo, explicaba el efecto fotoeléctrico proponiendo que la luz se comporta como paquetes discretos de energía llamados "cuantos de luz" (hoy conocidos como fotones). Esta idea contradecía la teoría ondulatoria clásica de la luz y fue tan significativa que le valió el Premio Nobel de Física en 1921. El segundo artículo, de mayo, demostró matemáticamente que el movimiento errático de partículas suspendidas en un líquido (movimiento browniano, observado por Robert Brown en 1827) era causado por colisiones con moléculas invisibles, proporcionando evidencia directa de la existencia de los átomos.',
      'El tercer artículo, publicado en junio de 1905, presentaba la Teoría de la Relatividad Especial. Einstein partió de dos postulados simples y dedujo consecuencias que desafiaban toda intuición cotidiana: el tiempo puede transcurrir a ritmos diferentes, los objetos se encogen cuando se mueven, y nada puede superar la velocidad de la luz. Este artículo redefinió los conceptos de espacio y tiempo que la humanidad había aceptado durante más de dos siglos desde Isaac Newton.',
      'El cuarto artículo, de septiembre de 1905, era un complemento de apenas tres páginas que contenía la ecuación más conocida de la historia: E=mc². Einstein demostró que la masa y la energía son manifestaciones de lo mismo, y que una cantidad mínima de masa puede convertirse en una cantidad enorme de energía. Esta relación explica cómo funcionan las estrellas, las centrales nucleares y los aceleradores de partículas.',
      'Cuando Max von Laue, un joven profesor de la Universidad de Berna, leyó el artículo sobre la relatividad, viajó a la oficina de patentes para conocer al autor. Esperaba encontrar un distinguido académico, pero se encontró con un joven desaliñado rodeado de papeles de solicitudes de inventos. Von Laue quedó tan impresionado que se convirtió en uno de los primeros defensores públicos de la relatividad. Para 1909, Einstein ya era profesor en la Universidad de Zúrich, y para 1914 dirigía el Instituto Kaiser Wilhelm de Física en Berlín.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Einstein envió su tesis doctoral a la Universidad de Zúrich el mismo año que publicó los cuatro artículos. Su tesis trataba sobre un método para determinar el tamaño de las moléculas midiendo la viscosidad de soluciones de azúcar. Fue rechazada inicialmente por ser "demasiado corta". Einstein añadió una sola oración y fue aceptada. Esa tesis se convirtió en su trabajo más citado durante décadas, superando incluso a la relatividad en número de referencias académicas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los cuatro artículos de 1905 abordaron campos diferentes de la física: la teoría cuántica (efecto fotoeléctrico), la mecánica estadística (movimiento browniano), la cinemática (relatividad especial) y la equivalencia masa-energía (E=mc²). La revista Annalen der Physik era editada por Max Planck, quien reconoció la importancia del trabajo de Einstein antes que la mayoría de la comunidad científica. Planck envió a su asistente Max von Laue a investigar quién era ese desconocido autor.' },
    ],
    fact: 'Einstein escribió el artículo sobre la relatividad especial en solo cinco semanas, entre finales de mayo y junio de 1905. Lo completó durante sus horas libres mientras trabajaba evaluando patentes de 8:00 a 18:00 horas, seis días a la semana. Según su correspondencia con su amigo Conrad Habicht, fechada el 18 de mayo de 1905, describió el artículo como un trabajo que modificaría "la teoría del espacio y el tiempo". En ese momento, su salario anual era de 3,500 francos suizos.',
  },
  {
    id: 'postulados-relatividad',
    title: 'Los Dos Postulados',
    color: '#D4A03C',
    btnImage: '/assets/einstein/einstein_m2.png',
    image: '/assets/einstein/einstein_m2.png',
    content: [
      'La Teoría de la Relatividad Especial se fundamenta en dos postulados que Einstein presentó en su artículo de junio de 1905 titulado "Sobre la electrodinámica de los cuerpos en movimiento". El primer postulado, llamado principio de relatividad, establece que las leyes de la física son idénticas para todos los observadores que se mueven a velocidad constante (sistemas de referencia inerciales). Esto significa que si estás dentro de un tren que se desplaza a velocidad uniforme sin ventanas, ningún experimento físico puede determinar si el tren está en movimiento o detenido. Las ecuaciones de la mecánica, el electromagnetismo y todas las demás leyes funcionan exactamente igual.',
      'El segundo postulado afirma que la velocidad de la luz en el vacío es una constante universal: exactamente 299,792,458 metros por segundo, sin importar la velocidad del observador ni la de la fuente de luz. Si enciendes una linterna mientras corres hacia adelante, la luz no viaja más rápido que si la enciendes estando quieto. Este principio contradice la intuición cotidiana: si lanzas una pelota desde un auto en movimiento, la pelota viaja más rápido respecto al suelo. Pero la luz no se comporta así. Su velocidad es un límite absoluto del universo.',
      'Einstein llegó a estos postulados tras reflexionar sobre una pregunta que lo perseguía desde los 16 años: ¿qué vería una persona si pudiera viajar junto a un rayo de luz a la misma velocidad? Según la física clásica de Newton, esa persona vería la onda electromagnética "congelada" en el espacio, pero las ecuaciones de Maxwell del electromagnetismo no permiten esa situación. Einstein resolvió la contradicción eliminando el concepto de tiempo absoluto: el tiempo transcurre de manera diferente para observadores que se mueven a velocidades distintas.',
      'Antes de Einstein, los físicos como Hendrik Lorentz y Henri Poincaré habían desarrollado ecuaciones matemáticas similares (las transformaciones de Lorentz), pero las interpretaban como efectos mecánicos sobre la materia. Einstein dio un paso conceptual diferente: propuso que el espacio y el tiempo mismos se deforman. No es que los relojes funcionen mal a alta velocidad; es que el tiempo real transcurre a un ritmo diferente. Esta reinterpretación fue lo que hizo que su teoría fuera una revolución conceptual y no solo un ajuste matemático.',
      'La combinación de estos dos postulados produce consecuencias verificables: la dilatación del tiempo, la contracción de la longitud, la relatividad de la simultaneidad (dos eventos que son simultáneos para un observador pueden no serlo para otro) y la imposibilidad de superar la velocidad de la luz. En 1908, el matemático Hermann Minkowski reformuló la relatividad especial en un marco geométrico de cuatro dimensiones (tres espaciales y una temporal), creando el concepto de "espacio-tiempo". Minkowski había sido profesor de Einstein en Zúrich y declaró que "el espacio por sí solo y el tiempo por sí solo están condenados a desvanecerse como meras sombras".'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Einstein no fue el primero en formular las ecuaciones de la relatividad. Hendrik Lorentz publicó las transformaciones matemáticas en 1904, y Henri Poincaré usó el término "principio de relatividad" en 1905, pocas semanas antes que Einstein. Sin embargo, ambos interpretaron las ecuaciones como efectos dinámicos sobre la materia, mientras que Einstein reinterpretó el espacio y el tiempo mismos. Por eso la teoría lleva el nombre de Einstein y no de Lorentz o Poincaré. La diferencia no fue matemática sino conceptual.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad de la luz en el vacío (299,792,458 m/s) es tan fundamental que desde 1983 el metro se define en función de ella: un metro es la distancia que la luz recorre en el vacío en exactamente 1/299,792,458 de segundo. Esto significa que la velocidad de la luz es exacta por definición, no por medición. El experimento de Michelson y Morley en 1887 demostró que la velocidad de la luz es constante en todas las direcciones, descartando la existencia del "éter luminífero" que los físicos del siglo XIX consideraban necesario.' },
    ],
    fact: 'El artículo original de Einstein sobre la relatividad especial no contiene ni una sola referencia bibliográfica a otros artículos científicos, algo extremadamente inusual incluso en 1905. Einstein solo mencionó a Newton y Maxwell en el texto. Según el historiador de la ciencia John Stachel, esto se debió en parte a que Einstein trabajaba aislado de la comunidad académica en su oficina de patentes y no tenía acceso regular a las publicaciones más recientes de Lorentz y Poincaré.',
  },
  {
    id: 'dilatacion-temporal',
    title: 'Dilatación del Tiempo',
    color: '#3A5280',
    btnImage: '/assets/einstein/einstein_m2.png',
    image: '/assets/einstein/einstein_m2.png',
    content: [
      'La dilatación temporal es una de las consecuencias más sorprendentes de la relatividad especial: el tiempo transcurre más lentamente para un objeto que se mueve a alta velocidad en relación con un observador estacionario. Este efecto es real y medible, no una ilusión. La magnitud de la dilatación depende del factor de Lorentz, representado por la letra griega gamma (γ), que se calcula como 1 dividido entre la raíz cuadrada de (1 menos v²/c²), donde v es la velocidad del objeto y c es la velocidad de la luz. A velocidades cotidianas, γ es prácticamente 1 y el efecto es imperceptible. Al 87% de la velocidad de la luz, el tiempo pasa dos veces más lento.',
      'La Paradoja de los Gemelos ilustra la dilatación temporal de forma clara. Imagina dos gemelos: uno permanece en la Tierra mientras el otro viaja en una nave espacial al 90% de la velocidad de la luz durante 5 años medidos en la nave. Cuando el viajero regresa, descubre que en la Tierra han pasado 11.5 años. Su hermano gemelo ha envejecido 6.5 años más que él. Esto no es una paradoja real en el sentido lógico: la asimetría se explica porque el gemelo viajero tuvo que acelerar, cambiar de dirección y desacelerar, rompiendo la simetría entre ambos observadores.',
      'La prueba experimental más directa de la dilatación temporal proviene de los muones, partículas subatómicas creadas cuando los rayos cósmicos colisionan con la atmósfera terrestre a unos 15 kilómetros de altitud. Los muones tienen una vida media de solo 2.2 microsegundos, y viajan al 99.94% de la velocidad de la luz. Sin la relatividad, recorrerían apenas 660 metros antes de desintegrarse y nunca llegarían al suelo. Sin embargo, los detectores en la superficie terrestre registran cantidades significativas de muones. La explicación es la dilatación temporal: desde nuestro marco de referencia, el "reloj" del muón funciona 22 veces más lento, dándole tiempo suficiente para recorrer los 15 kilómetros.',
      'En 1971, los físicos Joseph Hafele y Richard Keating realizaron un experimento que se convirtió en una de las pruebas más célebres de la relatividad. Colocaron cuatro relojes atómicos de cesio en aviones comerciales que dieron la vuelta al mundo: dos vuelos hacia el este y dos hacia el oeste. Compararon los relojes viajeros con relojes de referencia en el Observatorio Naval de los Estados Unidos en Washington. Los relojes que volaron hacia el este se atrasaron 59 nanosegundos (billonésimas de segundo), y los que volaron hacia el oeste se adelantaron 273 nanosegundos, valores consistentes con las predicciones combinadas de la relatividad especial y general.',
      'La dilatación temporal tiene una consecuencia profunda sobre la naturaleza del universo: la simultaneidad es relativa. Dos eventos que ocurren "al mismo tiempo" para un observador pueden suceder en momentos diferentes para otro observador que se mueve a una velocidad distinta. Esto significa que no existe un "ahora" universal compartido por todos los observadores del cosmos. El físico Brian Greene lo expresó así: "Tu ahora en la Tierra y el ahora de alguien en la galaxia de Andrómeda pueden diferir en cientos de años, dependiendo de cómo se muevan uno respecto al otro".'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El astronauta Serguéi Krikaliov acumula el récord de dilatación temporal humana. Pasó 803 días en órbita a bordo de la Estación Espacial Internacional y la estación Mir, viajando a unos 27,600 km/h. Según los cálculos de la relatividad especial, Krikaliov es aproximadamente 0.02 segundos más joven que si hubiera permanecido en la Tierra durante ese mismo período. Viajó literalmente una fracción de segundo al futuro respecto a las personas en la superficie terrestre.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En el acelerador de partículas del CERN en Ginebra, los protones circulan al 99.999999% de la velocidad de la luz. A esa velocidad, el factor de Lorentz γ es aproximadamente 7,454, lo que significa que un segundo para el protón equivale a más de dos horas en el laboratorio. Estas partículas recorren el anillo de 27 kilómetros del Gran Colisionador de Hadrones (LHC) unas 11,245 veces por segundo, y los físicos deben calcular los efectos relativistas con extrema precisión para interpretar correctamente los resultados de las colisiones.' },
    ],
    fact: 'En 2010, investigadores del Instituto Nacional de Estándares y Tecnología (NIST) de Estados Unidos demostraron la dilatación temporal con relojes ópticos de aluminio separados por una diferencia de altitud de solo 33 centímetros. El reloj ubicado más abajo (más cerca del centro de la Tierra y por tanto en un campo gravitatorio más intenso) marchaba más lentamente que el reloj superior, con una diferencia de 4 partes en 10^17 por cada metro de altitud. Este resultado confirmó que la dilatación del tiempo no requiere velocidades cósmicas: ocurre en tu propia habitación.',
  },
  {
    id: 'contraccion-longitud',
    title: 'Contracción de la Longitud',
    color: '#C4922E',
    btnImage: '/assets/einstein/einstein_m2.png',
    image: '/assets/einstein/einstein_m2.png',
    content: [
      'La contracción de la longitud, también llamada contracción de Lorentz-FitzGerald, es otro efecto predicho por la relatividad especial: un objeto en movimiento se acorta en la dirección de su desplazamiento, según lo mide un observador estacionario. Si una nave espacial de 100 metros de longitud pasara frente a ti al 87% de la velocidad de la luz (donde el factor de Lorentz γ = 2), la verías con una longitud de solo 50 metros. A mayor velocidad, mayor contracción. Al 99.5% de la velocidad de la luz, la nave mediría apenas 10 metros. Los pasajeros de la nave, sin embargo, no notarían ningún cambio: para ellos, la nave mantiene su longitud original.',
      'Este efecto fue propuesto independientemente por George FitzGerald en 1889 y Hendrik Lorentz en 1892, antes de que Einstein formulara la relatividad especial. Ambos sugirieron que los objetos se contraían físicamente al moverse a través del "éter luminífero" (un medio hipotético que se pensaba necesario para la propagación de la luz). Einstein reinterpretó la contracción no como un efecto mecánico sobre la materia, sino como una propiedad del espacio-tiempo: las distancias medidas dependen del estado de movimiento del observador.',
      'La contracción de la longitud resuelve una aparente paradoja en el experimento de los muones atmosféricos. Desde el punto de vista del muón (que "piensa" que está en reposo mientras la Tierra se acerca a él al 99.94% de la velocidad de la luz), los 15 kilómetros de atmósfera entre el punto donde se crea y la superficie terrestre se contraen a solo unos 680 metros. A esa distancia reducida, el muón tiene tiempo suficiente para llegar al suelo en sus escasos 2.2 microsegundos de vida. Ambas explicaciones — dilatación temporal vista desde la Tierra, y contracción de longitud vista desde el muón — son igualmente válidas y producen el mismo resultado.',
      'La contracción de la longitud solo afecta la dimensión paralela al movimiento. Si una esfera se moviera al 90% de la velocidad de la luz, se vería aplastada como un disco en la dirección del movimiento, pero mantendría su diámetro normal en las direcciones perpendiculares. El matemático Roger Penrose demostró en 1959 que una esfera en movimiento relativista, aunque contraída, seguiría viéndose como una esfera circular en una fotografía debido a los efectos de la aberración de la luz. La contracción es real, pero su apariencia visual depende del ángulo de observación.',
      'La fórmula de la contracción de la longitud es L = L₀/γ, donde L₀ es la longitud propia del objeto (medida en su marco de reposo) y γ es el factor de Lorentz. A velocidades cotidianas, el efecto es minúsculo: un avión que vuela a 900 km/h se contrae en aproximadamente 0.000000000001 metros, una billonésima de metro, menos que el diámetro de un átomo de hidrógeno. Por eso la contracción es indetectable en la vida diaria. Solo en aceleradores de partículas, donde las partículas alcanzan velocidades superiores al 99% de la velocidad de la luz, el efecto se vuelve dominante y debe incluirse en todos los cálculos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En el Gran Colisionador de Hadrones del CERN, los núcleos de plomo se aceleran hasta el 99.9999991% de la velocidad de la luz. A esa velocidad, un núcleo de plomo, que normalmente es esférico con un diámetro de 14 femtómetros, se contrae hasta parecer un disco plano de solo 0.0003 femtómetros de grosor en la dirección del movimiento. Los físicos deben tener en cuenta esta geometría extrema al calcular las colisiones entre los núcleos acelerados en direcciones opuestas dentro del acelerador.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La contracción de la longitud genera lo que los físicos llaman "la paradoja del granero y la escalera". Si una escalera de 10 metros se mueve al 87% de la velocidad de la luz, un observador en un granero de 5 metros la vería contraída a 5 metros, cabiendo dentro. Pero desde la perspectiva de la escalera, el granero está contraído a 2.5 metros y la escalera no cabe. La resolución radica en la relatividad de la simultaneidad: los observadores no coinciden sobre qué eventos ocurren "al mismo tiempo", y ambas descripciones son consistentes.' },
    ],
    fact: 'La contracción de la longitud tiene una consecuencia interesante para los viajes interestelares. Si una nave viajara al 99.99% de la velocidad de la luz hacia Alfa Centauri (a 4.37 años luz de distancia), sus tripulantes medirían la distancia como solo 0.062 años luz, aproximadamente 586 mil millones de metros en lugar de los 41.3 billones de metros reales. El viaje, que desde la Tierra dura 4.37 años, para los tripulantes duraría solo 22.5 días. Sin embargo, cuando llegaran, habrían pasado 4.37 años en la Tierra.',
  },
  {
    id: 'equivalencia-masa-energia',
    title: 'E=mc²: Masa y Energía',
    color: '#4A6694',
    btnImage: '/assets/einstein/einstein_m2.png',
    image: '/assets/einstein/einstein_m2.png',
    content: [
      'La ecuación E=mc² fue presentada por Einstein en septiembre de 1905 en un artículo de solo tres páginas titulado "¿Depende la inercia de un cuerpo de su contenido de energía?". La respuesta era sí: la masa de un objeto aumenta cuando absorbe energía y disminuye cuando la emite. La ecuación establece que la energía (E) contenida en un cuerpo en reposo es igual a su masa (m) multiplicada por la velocidad de la luz al cuadrado (c²). Como c = 299,792,458 m/s, el valor de c² es aproximadamente 9 × 10^16, lo que significa que incluso una masa diminuta contiene una cantidad enorme de energía.',
      'Para dimensionar la cantidad de energía encerrada en la materia: un clip de papel de un gramo contiene, según E=mc², aproximadamente 9 × 10^13 julios de energía. Esa cantidad es equivalente a la detonación de 21,000 toneladas de dinamita, comparable a la bomba atómica de Hiroshima. Un litro de agua, con una masa de un kilogramo, contiene 9 × 10^16 julios, suficientes para abastecer de electricidad a una ciudad de 100,000 habitantes durante más de tres años. Sin embargo, convertir masa en energía con total eficiencia no es posible con la tecnología actual: solo las reacciones nucleares logran convertir una fracción.',
      'El Sol es la demostración más visible de E=mc² en acción. En su núcleo, a una temperatura de 15 millones de grados Celsius y una presión de 250 mil millones de atmósferas, cuatro protones (núcleos de hidrógeno) se fusionan para formar un núcleo de helio-4 a través de la cadena protón-protón. La masa del helio-4 resultante es un 0.7% menor que la masa combinada de los cuatro protones originales. Esa diferencia de masa, 4.3 × 10^-12 kilogramos por reacción, se transforma en energía. El Sol convierte aproximadamente 4.26 millones de toneladas de masa en energía pura cada segundo, y ha mantenido ese ritmo durante 4,600 millones de años.',
      'La ecuación también funciona en dirección inversa: la energía puede crear masa. En los aceleradores de partículas como el Gran Colisionador de Hadrones (LHC) del CERN, los protones se aceleran hasta el 99.9999991% de la velocidad de la luz y colisionan entre sí. La energía cinética liberada en el impacto se convierte en partículas nuevas con masa, según E=mc². Así se descubrió el bosón de Higgs el 4 de julio de 2012, con una masa de 125 GeV/c² (equivalente a 2.2 × 10^-25 kilogramos). Peter Higgs había predicho la existencia de esta partícula en 1964.',
      'Una consecuencia directa de E=mc² es que un objeto con masa nunca puede alcanzar la velocidad de la luz. A medida que un objeto se acerca a c, su energía cinética aumenta sin límite y, dado que la energía tiene masa, la masa efectiva del objeto también crece sin límite. Se necesitaría una cantidad infinita de energía para acelerar cualquier objeto con masa hasta la velocidad de la luz. Solo las partículas sin masa, como los fotones, pueden viajar exactamente a c. Esta es la razón fundamental por la que la velocidad de la luz es el límite de velocidad del universo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Einstein no escribió originalmente E=mc². En su artículo de 1905, expresó la relación como L = mv², donde L era la energía cinética perdida y v la velocidad de la luz (usaba v en lugar de c). La notación moderna E=mc² fue popularizada por otros físicos en las décadas siguientes. Además, la ecuación completa para objetos en movimiento es E² = (mc²)² + (pc)², donde p es el momento lineal. La versión E=mc² aplica solo a objetos en reposo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La bomba atómica lanzada sobre Hiroshima el 6 de agosto de 1945 contenía 64 kilogramos de uranio-235, pero solo unos 700 miligramos de masa (menos de un gramo) se convirtieron en energía. Esa fracción liberó una explosión equivalente a 15,000 toneladas de TNT. Einstein no participó en la construcción de la bomba, pero en 1939 firmó una carta al presidente Roosevelt advirtiendo sobre la posibilidad de que Alemania desarrollara armas nucleares, lo que impulsó el Proyecto Manhattan.' },
    ],
    fact: 'En la vida cotidiana, E=mc² opera de formas sutiles pero reales. Cuando un resorte se comprime, su masa aumenta en una cantidad minúscula porque la energía potencial elástica almacenada tiene masa equivalente. Cuando calientas un kilogramo de agua de 20°C a 100°C, su masa aumenta en aproximadamente 3.7 × 10^-12 kilogramos (3.7 picogramos). Cuando una batería de teléfono está cargada, pesa más que cuando está descargada, aunque la diferencia es de solo 10^-11 gramos, indetectable con cualquier balanza existente.',
  },
  {
    id: 'evidencia-experimental',
    title: 'Evidencia Experimental',
    color: '#B88420',
    btnImage: '/assets/einstein/einstein_m2.png',
    image: '/assets/einstein/einstein_m2.png',
    content: [
      'La relatividad especial no es una especulación teórica: es una de las teorías más comprobadas de la física. El experimento de Hafele-Keating de 1971 fue una de las primeras verificaciones directas de la dilatación temporal. Joseph Hafele (Universidad de Washington en St. Louis) y Richard Keating (Observatorio Naval de EE.UU.) embarcaron cuatro relojes atómicos de cesio (HP modelo 5061A) en vuelos comerciales alrededor del mundo. Los relojes que viajaron hacia el este se atrasaron 59 ± 10 nanosegundos, y los que volaron hacia el oeste se adelantaron 273 ± 7 nanosegundos, coincidiendo con las predicciones de la relatividad dentro del margen de error experimental.',
      'Los aceleradores de partículas proporcionan verificación constante de la relatividad especial. En el sincrotrón del CERN, los muones acelerados al 99.94% de la velocidad de la luz muestran una vida media de 64.4 microsegundos, exactamente 29.3 veces mayor que los 2.2 microsegundos medidos en reposo. Este resultado concuerda con el factor de Lorentz γ = 29.3 predicho para esa velocidad. Cada día, miles de colisiones en aceleradores de todo el mundo confirman las predicciones relativistas con una precisión de partes por billón.',
      'En 1938, Herbert Ives y G.R. Stilwell realizaron un experimento que confirmó la dilatación temporal midiendo el efecto Doppler transversal de la luz emitida por iones de hidrógeno en movimiento. Observaron un corrimiento en la frecuencia de la luz que solo podía explicarse por la dilatación temporal predicha por la relatividad especial. Este experimento fue repetido con mayor precisión por Mandelberg y Witten en 1962, y por Hasselkamp, Mondry y Scharmann en 1979, siempre con resultados consistentes con la teoría de Einstein.',
      'Los rayos cósmicos que impactan la atmósfera terrestre generan partículas llamadas piones, que a su vez se desintegran en muones. Estos muones viajan al 99.94% de la velocidad de la luz y tienen una vida media de 2.2 microsegundos en reposo. Sin la dilatación temporal, solo una fracción diminuta llegaría a la superficie terrestre desde los 15 kilómetros de altitud donde se crean. Sin embargo, los detectores en la superficie registran cantidades de muones consistentes con un factor de dilatación temporal de γ ≈ 22, confirmando la relatividad especial de forma natural y continua.',
      'En 2014, investigadores del Instituto Max Planck de Física Nuclear en Heidelberg, Alemania, utilizaron iones de litio-7 acelerados al 33.8% de la velocidad de la luz para medir la dilatación temporal con una precisión sin precedentes. Los resultados coincidieron con las predicciones de la relatividad especial con una incertidumbre de solo 2 partes en mil millones (2 × 10^-9), convirtiendo esta medición en una de las verificaciones más precisas de la teoría de Einstein. Cada nueva generación de experimentos refuerza la validez de la relatividad con mayor exactitud.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El experimento de Hafele-Keating costó solo 8,000 dólares en boletos de avión, un presupuesto ridículo para un experimento que confirmó una teoría fundamental de la física. Hafele y Keating compraron asientos de primera clase para los relojes atómicos y los acompañaron en los vuelos. Las aerolíneas Pan Am y TWA colaboraron proporcionando los asientos. El artículo, publicado en la revista Science en julio de 1972, se convirtió en uno de los trabajos más citados de la física experimental.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La aniquilación de materia y antimateria es la confirmación más pura de E=mc². Cuando un electrón colisiona con su antipartícula (un positrón), ambas partículas se aniquilan por completo y toda su masa se convierte en energía en forma de dos fotones gamma. La masa combinada del par electrón-positrón es de 1.82 × 10^-30 kg, y la energía resultante es exactamente 1.022 MeV, el valor predicho por E=mc². Este proceso se utiliza en la tomografía por emisión de positrones (PET) para diagnóstico médico.' },
    ],
    fact: 'En 2011, la colaboración OPERA del laboratorio Gran Sasso en Italia anunció que había detectado neutrinos viajando más rápido que la luz, lo que habría refutado la relatividad especial. La noticia generó una conmoción mundial. Después de meses de revisiones, se descubrió que un cable de fibra óptica mal conectado en el sistema de cronometraje causaba un error de 73 nanosegundos. Una vez corregido el cable, los neutrinos viajaban exactamente a la velocidad esperada. La relatividad especial sobrevivió intacta a su prueba más mediática.',
  },
  {
    id: 'relatividad-cotidiana',
    title: 'Relatividad en Tu Vida',
    color: '#1E2D52',
    btnImage: '/assets/einstein/einstein_m2.png',
    image: '/assets/einstein/einstein_m2.png',
    content: [
      'El Sistema de Posicionamiento Global (GPS) es la aplicación más directa de la relatividad especial en la vida cotidiana. Los 31 satélites GPS orbitan la Tierra a una altitud de 20,200 kilómetros y a una velocidad de 14,000 km/h. La relatividad especial predice que sus relojes atómicos se atrasan 7 microsegundos por día respecto a los relojes en la superficie terrestre, debido a su velocidad. La relatividad general (que trata la gravedad) predice un adelanto de 45 microsegundos diarios porque los satélites están en un campo gravitatorio más débil. El efecto neto es un adelanto de 38 microsegundos por día. Sin la corrección relativista, las posiciones del GPS acumularían un error de 10 kilómetros diarios.',
      'Las centrales nucleares generan electricidad gracias a E=mc². En un reactor de fisión, átomos pesados de uranio-235 se rompen al ser bombardeados con neutrones, produciendo fragmentos cuya masa total es ligeramente menor que la del átomo original. Esa diferencia de masa se convierte en energía térmica que calienta agua para generar vapor y mover turbinas eléctricas. Un kilogramo de uranio-235 produce la misma energía que 3,000 toneladas de carbón. En 2023, 440 reactores nucleares en 32 países proporcionaban aproximadamente el 10% de la electricidad mundial.',
      'La tomografía por emisión de positrones (PET) utiliza la aniquilación materia-antimateria, una consecuencia directa de E=mc², para diagnosticar enfermedades. Se inyecta al paciente una sustancia marcada con un isótopo radiactivo que emite positrones (antielectrones). Cuando un positrón se encuentra con un electrón del cuerpo, ambos se aniquilan y producen dos fotones gamma que viajan en direcciones opuestas. Detectores alrededor del paciente registran estos fotones y reconstruyen una imagen tridimensional que muestra dónde se concentra la actividad metabólica, permitiendo detectar tumores y enfermedades neurológicas.',
      'Los aceleradores de partículas, que dependen fundamentalmente de la relatividad especial, han producido tecnologías con aplicaciones médicas y científicas. La radioterapia con haces de protones utiliza principios relativistas para calcular la energía necesaria para destruir tumores con precisión milimétrica. La World Wide Web fue inventada en 1989 por Tim Berners-Lee en el CERN, originalmente como una herramienta para que los físicos de partículas compartieran datos experimentales. El sincrotrón, un tipo de acelerador, genera luz ultrabrillante usada para estudiar la estructura de proteínas y desarrollar nuevos fármacos.',
      'Tu teléfono inteligente depende de la física cuántica y la relatividad de maneras que rara vez se mencionan. Los semiconductores que forman el procesador funcionan según la mecánica cuántica (el efecto fotoeléctrico explicado por Einstein en 1905). La pantalla táctil capacitiva depende de propiedades electrónicas que solo se entienden con la física cuántica. Y cada vez que usas Google Maps o cualquier aplicación de navegación, la señal de GPS que recibes ha sido corregida por efectos relativistas. Sin las correcciones derivadas de la teoría de Einstein, la navegación por satélite sería inútil después de unas pocas horas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los ingenieros del sistema GPS debatieron durante los años 1970 si incluir las correcciones relativistas en los relojes de los satélites. Algunos argumentaban que los efectos serían demasiado pequeños para importar. Se decidió incluir un mecanismo de corrección pero dejarlo desactivado al principio para probar. Cuando se activó el primer satélite sin corrección, el error de posición creció a razón de 10 km por día. Las correcciones relativistas se activaron de inmediato y han funcionado continuamente desde entonces en todos los satélites GPS.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La energía nuclear de fisión es aproximadamente un millón de veces más densa que la energía química. Un kilogramo de uranio-235 completamente fisionado libera 8.2 × 10^13 julios, mientras que un kilogramo de gasolina produce solo 4.6 × 10^7 julios. La diferencia se debe a que las reacciones nucleares convierten una fracción de la masa en energía (según E=mc²), mientras que las reacciones químicas solo reorganizan electrones sin cambiar la masa de los núcleos atómicos. El proyecto ITER, en Cadarache, Francia, busca lograr la fusión nuclear controlada para 2035.' },
    ],
    fact: 'La relatividad especial tiene un impacto directo en la seguridad de la aviación moderna. Los sistemas de navegación por satélite utilizados por todos los aviones comerciales dependen de correcciones relativistas para funcionar con precisión. El estándar WAAS (Wide Area Augmentation System) de la FAA corrige tanto los efectos de la relatividad especial como los de la general para garantizar una precisión de posicionamiento de 1 a 2 metros. Sin estas correcciones, basadas en las ecuaciones de Einstein de 1905, los aviones no podrían realizar aterrizajes instrumentales con la seguridad requerida.',
  },
];

// ─── Relativistic Particle Field (Canvas Background) ────────────────────────
function RelativisticField() {
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
      hue: Math.random() > 0.5 ? '44,62,107' : '212,160,60', // navy or amber
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

// ─── Relativity Header ──────────────────────────────────────────────────────
function RelativityHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,160,60,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#relGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#2C3E6B','#D4A03C','#3A5280','#C4922E','#4A6694','#B88420','#1E2D52'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central E=mc² icon */}
        <text x="300" y="36" textAnchor="middle" fill="#D4A03C" fontSize="14" fontWeight="bold" fontFamily="serif" opacity="0.6">E=mc²</text>
        <defs>
          <linearGradient id="relGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(44,62,107,0.2)" />
            <stop offset="50%" stopColor="rgba(212,160,60,0.9)" />
            <stop offset="100%" stopColor="rgba(44,62,107,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A03C" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA RELATIVIDAD ESPECIAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,160,60,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EINSTEIN Y LA NATURALEZA DEL ESPACIO-TIEMPO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ────────────────────────────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,160,60,0.2)'}`,
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
          layoutId="activeDotEinsteinM2"
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

        {/* Video Player */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
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
      border: '1px solid rgba(212,160,60,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A03C', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #2C3E6B, #D4A03C)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,160,60,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A03C', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_EinsteinM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/einstein/infographic_relatividad/bg_relatividad.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,160,60,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <RelativisticField />

      <RelativityHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,160,60,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,160,60,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,160,60,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A03C', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de la Relatividad Especial!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Arquitecto del Cambio
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
