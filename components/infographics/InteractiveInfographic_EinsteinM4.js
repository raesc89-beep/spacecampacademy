'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Quantum Physics themed) ────────────────────────
function DecoPhoton({ size = 70, color = '#D4A03C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Wavy light ray */}
      <path d="M5 30 Q12 20 20 30 Q28 40 35 30 Q42 20 50 30 Q55 35 58 30" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Photon particle */}
      <circle cx="50" cy="30" r="5" fill={color} opacity="0.4" />
      <circle cx="50" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Energy burst lines */}
      <line x1="50" y1="20" x2="50" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="57" y1="23" x2="60" y2="18" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="57" y1="37" x2="60" y2="42" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="50" y1="40" x2="50" y2="45" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoElectron({ size = 70, color = '#6EC6FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Metal surface */}
      <rect x="5" y="35" width="50" height="4" rx="2" fill={color} opacity="0.3" />
      {/* Ejected electrons */}
      <circle cx="15" cy="25" r="2.5" fill={color} opacity="0.5" />
      <circle cx="30" cy="18" r="2.5" fill={color} opacity="0.6" />
      <circle cx="45" cy="22" r="2.5" fill={color} opacity="0.5" />
      {/* Trajectory arrows */}
      <path d="M15 33 L15 27" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 33 L30 20" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M45 33 L45 24" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Arrow tips */}
      <path d="M28 20 L30 16 L32 20" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoDualWave({ size = 80, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Wave pattern */}
      <path d="M5 20 Q15 5 25 20 Q35 35 45 20 Q55 5 65 20 Q72 30 78 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Particle dots along wave */}
      <circle cx="15" cy="12" r="2" fill={color} opacity="0.4" />
      <circle cx="35" cy="28" r="2" fill={color} opacity="0.4" />
      <circle cx="55" cy="12" r="2" fill={color} opacity="0.4" />
      <circle cx="72" cy="25" r="2" fill={color} opacity="0.4" />
      {/* Uncertainty cloud */}
      <ellipse cx="40" cy="20" rx="12" ry="8" fill={color} opacity="0.08" />
    </svg>
  );
}

function DecoQuantumAtom({ size = 60, color = '#80DEEA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      {/* Energy levels */}
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.25" strokeDasharray="4 4" />
      <circle cx="30" cy="30" r="27" fill="none" stroke={color} strokeWidth="1" opacity="0.2" strokeDasharray="5 5" />
      {/* Quantum jump arrow */}
      <path d="M42 30 Q48 20 42 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 14 L42 12 L44 16" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Photon emission */}
      <circle cx="48" cy="15" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoEntangle({ size = 70, color = '#CE93D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Two entangled particles */}
      <circle cx="15" cy="30" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="45" cy="30" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="15" cy="30" r="2.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="30" r="2.5" fill={color} opacity="0.5" />
      {/* Entanglement connection */}
      <path d="M21 30 Q30 20 39 30" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3 2" />
      <path d="M21 30 Q30 40 39 30" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3 2" />
      {/* Spin arrows */}
      <path d="M12 24 L15 20 L18 24" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M48 36 L45 40 L42 36" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoSolarCell({ size = 70, color = '#FFAB91', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Solar panel grid */}
      <rect x="12" y="18" width="36" height="28" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="24" y1="18" x2="24" y2="46" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="36" y1="18" x2="36" y2="46" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="12" y1="27" x2="48" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="12" y1="37" x2="48" y2="37" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Sun rays */}
      <line x1="20" y1="5" x2="20" y2="14" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="30" y1="3" x2="30" y2="14" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="40" y1="5" x2="40" y2="14" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Electricity symbol */}
      <path d="M28 50 L26 54 L30 52 L28 56" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'crisis-fisica-clasica': [DecoPhoton, DecoQuantumAtom, DecoDualWave],
  'fotones-luz-particulas': [DecoPhoton, DecoElectron, DecoQuantumAtom],
  'efecto-fotoelectrico': [DecoElectron, DecoPhoton, DecoSolarCell],
  'dualidad-onda-particula': [DecoDualWave, DecoQuantumAtom, DecoPhoton],
  'einstein-vs-bohr': [DecoQuantumAtom, DecoEntangle, DecoDualWave],
  'entrelazamiento-cuantico': [DecoEntangle, DecoQuantumAtom, DecoDualWave],
  'tecnologia-cuantica-hoy': [DecoSolarCell, DecoEntangle, DecoPhoton],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Isaacson, W. (2007). Einstein: His Life and Universe, Simon & Schuster',
  'Kumar, M. (2008). Quantum: Einstein, Bohr and the Great Debate About the Nature of Reality, Icon Books',
  'Pais, A. (1982). Subtle is the Lord: The Science and the Life of Albert Einstein, Oxford University Press',
  'Einstein, A., Podolsky, B. & Rosen, N. (1935). Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?, Physical Review, 47(10), 777–780',
  'Millikan, R.A. (1916). A Direct Photoelectric Determination of Planck\'s h, Physical Review, 7(3), 355–388',
  'Aspect, A., Dalibard, J. & Roger, G. (1982). Experimental Realization of Einstein-Podolsky-Rosen-Bohm Gedankenexperiment, Physical Review Letters, 49(2), 91–94',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'crisis-fisica-clasica',
    title: 'La Crisis de la Física Clásica',
    color: '#2C3E6B',
    btnImage: '/assets/einstein/einstein_m4.png',
    image: '/assets/einstein/einstein_m4.png',
    content: [
      'A finales del siglo XIX, los físicos creían que su disciplina estaba casi completa. Lord Kelvin declaró en 1900 que la física se encontraba resuelta salvo por "dos pequeñas nubes" en el horizonte. Esas dos nubes — el problema del cuerpo negro y el experimento de Michelson-Morley — terminarían demoliendo los cimientos de la física clásica. La primera nube conduciría directamente al nacimiento de la mecánica cuántica, una revolución que cambió para siempre nuestra comprensión de la materia, la energía y la luz.',
      'El problema del cuerpo negro era una cuestión concreta: cuando calientas un objeto hasta que brilla (como un trozo de metal al rojo vivo), ¿cómo se distribuye la energía de la luz que emite entre las distintas longitudes de onda? La física clásica, usando las leyes de la termodinámica y el electromagnetismo de Maxwell, predecía que un cuerpo negro emitiría cantidades infinitas de energía en las longitudes de onda más cortas (ultravioleta y más allá). Este resultado, conocido como la "catástrofe ultravioleta", era evidentemente absurdo: ningún objeto emite energía infinita.',
      'El físico alemán Max Planck se enfrentó a este problema durante meses. El 14 de diciembre de 1900, presentó ante la Sociedad de Física de Berlín una solución matemática que encajaba con los datos experimentales, pero que contradecía toda la física conocida hasta entonces. Planck propuso que la energía no se emite de forma continua (como el agua que fluye de un grifo), sino en paquetes discretos que él llamó "cuantos". Cada cuanto tiene una energía E = hν, donde h es una constante (ahora llamada constante de Planck, igual a 6.626 × 10⁻³⁴ julios·segundo) y ν es la frecuencia de la radiación.',
      'Lo notable es que Planck no creía que su descubrimiento reflejara la realidad física. Consideraba los cuantos como un truco matemático, una herramienta de cálculo que funcionaba para obtener las fórmulas correctas pero que no tenía un significado profundo. Durante años intentó reconciliar los cuantos con la física clásica, sin éxito. Sería un joven empleado de la Oficina de Patentes de Berna, Albert Einstein, quien en 1905 tomaría la idea de Planck con total seriedad y la llevaría a sus últimas consecuencias lógicas.',
      'La constante de Planck h es una de las cifras más pequeñas y más fundamentales de toda la física. Su valor diminuto (0.000000000000000000000000000000000663 julios·segundo) explica por qué no percibimos los efectos cuánticos en nuestra vida cotidiana: los cuantos de energía son tan pequeños a escala humana que parecen continuos. Pero a nivel de átomos y moléculas, la cuantización de la energía domina todo comportamiento físico. La fecha del 14 de diciembre de 1900 se considera hoy el nacimiento oficial de la física cuántica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Lord Kelvin (William Thomson), quien predijo que la física estaba casi completa en 1900, también calculó que la Tierra tenía entre 20 y 400 millones de años, un error porque desconocía la radiactividad como fuente de calor interno. La edad real de la Tierra es de 4,540 millones de años. Las dos "pequeñas nubes" que mencionó resultaron ser las semillas de las dos mayores revoluciones científicas del siglo XX: la mecánica cuántica y la teoría de la relatividad de Einstein.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La constante de Planck h = 6.62607015 × 10⁻³⁴ J·s es tan fundamental que desde mayo de 2019 se usa para definir el kilogramo. El Sistema Internacional de Unidades (SI) redefinió el kilogramo en términos de h, la velocidad de la luz y la frecuencia del cesio-133. Antes, el kilogramo se definía por un cilindro de platino-iridio guardado en París desde 1889, que perdía masa lentamente por contaminación superficial, lo cual hacía que la unidad cambiara con el tiempo.' },
    ],
    fact: 'Max Planck sufrió tragedias personales durante su vida: su primer hijo Karl murió en la Primera Guerra Mundial en 1916, su hijo Erwin fue ejecutado por los nazis en 1945 por participar en el complot para asesinar a Hitler, y su casa en Berlín fue destruida por bombardeos aliados en 1944, junto con todos sus documentos científicos originales. A pesar de todo, Planck nunca abandonó Alemania y recibió el Premio Nobel de Física en 1918 por su descubrimiento de los cuantos de energía.',
  },
  {
    id: 'fotones-luz-particulas',
    title: 'Fotones: La Luz Son Partículas',
    color: '#D4A03C',
    btnImage: '/assets/einstein/einstein_m4.png',
    image: '/assets/einstein/einstein_m4.png',
    content: [
      'En 1905, Albert Einstein publicó un artículo titulado "Sobre un punto de vista heurístico concerniente a la producción y transformación de la luz". En este trabajo, Einstein propuso algo radical: la luz no solo se emite y se absorbe en cuantos discretos (como Planck había sugerido), sino que la luz misma está compuesta de partículas individuales de energía. Cada partícula de luz — que más tarde el químico Gilbert Lewis llamaría "fotón" en 1926 — transporta una cantidad exacta de energía determinada por su frecuencia: E = hν.',
      'Esta idea era profundamente contraintuitiva porque desde los experimentos de Thomas Young en 1801, la comunidad científica había aceptado que la luz era una onda. El experimento de la doble rendija de Young mostraba patrones de interferencia que solo podían explicarse si la luz se comportaba como una onda, no como un torrente de partículas. Las ecuaciones de Maxwell de 1865 habían consolidado esta visión: la luz era una onda electromagnética que se propagaba a 299,792,458 metros por segundo en el vacío.',
      'Einstein no negó que la luz se comportara como onda en muchas circunstancias. Lo que propuso fue que la luz tiene una naturaleza dual: se comporta como onda cuando se propaga por el espacio, pero se comporta como partícula cuando interactúa con la materia. Esta dualidad era una idea nueva que no encajaba con ninguna categoría conocida. La comunidad física recibió la propuesta con escepticismo: incluso Planck, cuyo trabajo había inspirado a Einstein, consideró que la hipótesis del fotón era un paso demasiado lejos.',
      'El artículo de 1905 sobre los fotones fue el trabajo por el cual Einstein recibió el Premio Nobel de Física en 1921 — no por la teoría de la relatividad, como mucha gente cree. El comité Nobel consideró que la relatividad era "demasiado teórica" y que aún no había sido verificada de forma suficiente. En cambio, la teoría del fotón había sido confirmada experimentalmente por Robert Millikan entre 1912 y 1915, aunque el propio Millikan había emprendido sus experimentos con la intención de refutar a Einstein y demostrar que estaba equivocado.',
      'La confirmación experimental más directa de que la luz se comporta como partículas llegó con el efecto Compton en 1923. Arthur Compton demostró que los rayos X, al chocar con electrones, transfieren energía y momento exactamente como lo harían dos bolas de billar al colisionar. El fotón pierde energía (su longitud de onda aumenta) y el electrón sale disparado. Este resultado era imposible de explicar con el modelo ondulatorio y confirmó de forma definitiva que la luz transporta momento lineal como una partícula. Compton recibió el Nobel de Física en 1927 por este descubrimiento.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Einstein tenía solo 26 años en 1905, y era un empleado de nivel III en la Oficina de Patentes de Berna, Suiza. Ese año, conocido como su "Annus Mirabilis" (año milagroso), publicó cuatro artículos que cambiaron la física: el efecto fotoeléctrico, el movimiento browniano, la relatividad especial y la equivalencia masa-energía (E=mc²). Ningún científico, ni antes ni después, ha producido una cantidad semejante de descubrimientos fundamentales en un solo año.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Robert Millikan dedicó diez años (1905-1915) a intentar refutar la ecuación del efecto fotoeléctrico de Einstein. Realizó cientos de experimentos con distintos metales y frecuencias de luz, pero cada resultado confirmaba la predicción de Einstein con precisión. Millikan escribió en su artículo de 1916 que la ecuación de Einstein era "exacta" pero que la teoría del fotón era "insostenible". Irónicamente, Millikan recibió el Nobel en 1923 en parte por confirmar la misma teoría que intentaba destruir.' },
    ],
    fact: 'El nombre "fotón" no fue inventado por Einstein. Lo propuso el químico estadounidense Gilbert N. Lewis en una carta a la revista Nature publicada el 18 de diciembre de 1926. Lewis usó la palabra para describir algo diferente a lo que hoy entendemos por fotón: él imaginaba los fotones como entidades que se conservaban en número, lo cual es incorrecto. Sin embargo, el término era tan elegante y útil que la comunidad científica lo adoptó de inmediato con el significado de Einstein — un cuanto de radiación electromagnética — y se convirtió en una de las palabras más usadas en toda la física.',
  },
  {
    id: 'efecto-fotoelectrico',
    title: 'El Efecto Fotoeléctrico',
    color: '#3A5280',
    btnImage: '/assets/einstein/einstein_m4.png',
    image: '/assets/einstein/einstein_m4.png',
    content: [
      'El efecto fotoeléctrico es un fenómeno en el cual la luz, al incidir sobre la superficie de un metal, arranca electrones de ese metal. Fue observado por primera vez por Heinrich Hertz en 1887, mientras realizaba experimentos para confirmar la existencia de las ondas electromagnéticas predichas por Maxwell. Hertz notó que las chispas saltaban más fácilmente entre dos electrodos cuando se iluminaban con luz ultravioleta. Su asistente, Philipp Lenard, investigó el fenómeno en detalle entre 1899 y 1902 y descubrió resultados que la física clásica no podía explicar.',
      'Lenard encontró tres hechos sorprendentes. Primero, existe una frecuencia mínima (frecuencia umbral) por debajo de la cual no se arrancan electrones, sin importar cuánta luz incida sobre el metal. Segundo, la energía cinética de los electrones emitidos depende de la frecuencia de la luz, no de su intensidad. Tercero, si la frecuencia supera el umbral, los electrones se emiten de forma instantánea, sin ningún retraso medible. La física clásica predecía que una luz más intensa debería arrancar electrones más energéticos y que la luz débil necesitaría tiempo para acumular suficiente energía.',
      'Einstein explicó estos tres resultados de un golpe con la hipótesis del fotón. Si la luz está compuesta de partículas (fotones), cada fotón lleva una energía E = hν. Cuando un fotón golpea un electrón del metal, le transfiere toda su energía de una sola vez. Parte de esa energía se usa para liberar el electrón del metal (la "función de trabajo" φ, que depende del tipo de metal), y el resto se convierte en energía cinética del electrón. La ecuación es: Energía cinética = hν − φ. Si hν es menor que φ, el fotón no tiene suficiente energía para arrancar el electrón, explicando la frecuencia umbral.',
      'Robert Millikan, profesor de la Universidad de Chicago, decidió verificar experimentalmente la ecuación de Einstein entre 1912 y 1915. Construyó un aparato de vacío sofisticado donde raspaba superficies de metal fresco dentro de la cámara para eliminar la oxidación. Midió con precisión la energía cinética máxima de los electrones emitidos a diferentes frecuencias de luz. Sus resultados confirmaron la ecuación de Einstein con un error menor al 0.5%. Millikan también obtuvo un valor preciso de la constante de Planck h a partir de sus mediciones: h = 6.57 × 10⁻³⁴ J·s, cercano al valor moderno.',
      'El efecto fotoeléctrico tiene aplicaciones directas en la tecnología actual. Los paneles solares fotovoltaicos funcionan exactamente por este principio: los fotones de la luz solar golpean electrones en materiales semiconductores como el silicio, generando una corriente eléctrica. Los sensores de las cámaras digitales (CCD y CMOS) también usan el efecto fotoeléctrico para convertir luz en señales eléctricas que se almacenan como imágenes. Cada vez que tomas una foto con tu teléfono, estás aprovechando el descubrimiento de Einstein de 1905 sobre la naturaleza de la luz.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Philipp Lenard, quien realizó los primeros estudios detallados del efecto fotoeléctrico, recibió el Premio Nobel de Física en 1905. Sin embargo, se convirtió en un ferviente nazi y antisemita en la década de 1920. Lenard atacó públicamente a Einstein y promovió la "física aria" (Deutsche Physik), intentando eliminar las contribuciones de científicos judíos de la ciencia alemana. Su amargura personal se debía en parte a que Einstein había explicado teóricamente el fenómeno que Lenard había descubierto experimentalmente.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La función de trabajo φ varía entre metales. Para el cesio es 2.1 electronvoltios (eV), para el zinc es 4.3 eV, y para el platino es 5.6 eV. Esto significa que la luz visible (con fotones de 1.7 a 3.1 eV) puede arrancar electrones del cesio pero no del platino, que requiere luz ultravioleta. Los detectores de humo fotoeléctricos aprovechan este principio: un haz de luz incide sobre un sensor fotoeléctrico, y cuando el humo dispersa la luz y cambia la señal, se activa la alarma.' },
    ],
    fact: 'Heinrich Hertz, quien descubrió el efecto fotoeléctrico en 1887, murió en 1894 a los 36 años de granulomatosis con poliangitis. Nunca supo que su descubrimiento accidental conduciría a una revolución en la física. Cuando le preguntaron sobre las aplicaciones prácticas de las ondas electromagnéticas que él demostró, Hertz respondió: "No tiene ninguna utilidad práctica". Hoy, las ondas de radio, la televisión, el WiFi, los teléfonos celulares y Bluetooth funcionan con ondas electromagnéticas — exactamente las que Hertz consideró inútiles.',
  },
  {
    id: 'dualidad-onda-particula',
    title: 'Dualidad Onda-Partícula',
    color: '#C4922E',
    btnImage: '/assets/einstein/einstein_m4.png',
    image: '/assets/einstein/einstein_m4.png',
    content: [
      'En 1924, un joven aristocrata francés llamado Louis de Broglie presentó su tesis doctoral en la Universidad de París con una propuesta audaz: si la luz (que se consideraba onda) puede comportarse como partícula, entonces la materia (que se consideraba partícula) debería poder comportarse como onda. De Broglie propuso que toda partícula en movimiento tiene una longitud de onda asociada, dada por la ecuación λ = h/p, donde h es la constante de Planck y p es el momento (masa multiplicada por velocidad) de la partícula. Esta fue la primera formulación clara de la dualidad onda-partícula.',
      'La propuesta de de Broglie parecía tan extraña que los examinadores de su tesis no sabían si aprobarla o no. El presidente del jurado, Paul Langevin, envió una copia a Einstein para pedirle su opinión. Einstein respondió que de Broglie "ha levantado una esquina del gran velo" de la naturaleza. Con la aprobación de Einstein, la tesis fue aceptada. De Broglie recibió el Premio Nobel de Física en 1929, solo cinco años después. Fue el primer y único caso en que una tesis doctoral fue reconocida directamente con un Nobel.',
      'La verificación experimental llegó en 1927 cuando Clinton Davisson y Lester Germer, en los laboratorios Bell en Estados Unidos, dirigieron un haz de electrones contra un cristal de níquel y observaron un patrón de difracción, un fenómeno que solo se produce con ondas. De forma independiente, George Paget Thomson (hijo de J.J. Thomson, quien había descubierto que el electrón era una partícula en 1897) observó difracción de electrones al pasarlos a través de láminas delgadas de metal. Padre e hijo Thomson recibieron premios Nobel por descubrimientos opuestos: el padre por demostrar que el electrón es una partícula, el hijo por demostrar que es una onda.',
      'El efecto Compton de 1923 aportó otra pieza clave del rompecabezas. Arthur Compton disparó rayos X contra grafito y midió que los rayos X dispersados tenían una longitud de onda mayor que los originales. Esto solo se explica si los rayos X se comportan como partículas (fotones) que colisionan con electrones, transfiriendo parte de su energía y momento. La diferencia de longitud de onda coincidía exactamente con los cálculos basados en la conservación de energía y momento entre dos partículas, confirmando que los fotones poseen momento lineal p = h/λ.',
      'La dualidad onda-partícula no es una limitación de nuestros instrumentos de medición ni un defecto de nuestra comprensión: es una propiedad fundamental de la naturaleza. Todo objeto — electrones, protones, átomos, e incluso moléculas enteras — exhibe comportamiento ondulatorio si las condiciones son apropiadas. En 2019, investigadores de la Universidad de Viena demostraron difracción de moléculas de hasta 25,000 unidades de masa atómica (compuestas por más de 2,000 átomos), confirmando que la mecánica cuántica se aplica a objetos cada vez más grandes. La frontera entre el mundo cuántico y el clásico sigue siendo un tema de investigación activa.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Louis de Broglie era un príncipe francés (7.° Duque de Broglie). Originalmente estudió historia medieval antes de cambiar a la física, inspirado por las discusiones con su hermano mayor Maurice, que trabajaba en física experimental de rayos X. Su tesis doctoral de 1924 tenía solo unas 70 páginas, breves para los estándares académicos, pero cada página contenía ideas que transformaron la física. Einstein comentó que "una idea tan bella merece ser verdadera".' },
      { label: 'Dato Científico', icon: 'atom', text: 'La longitud de onda de de Broglie de un electrón moviéndose a 6 millones de metros por segundo es aproximadamente 0.12 nanómetros, comparable al tamaño de un átomo. Esta es la base del microscopio electrónico de transmisión (TEM), inventado en 1931 por Ernst Ruska. Al usar electrones en vez de luz visible, el TEM puede "ver" objetos miles de veces más pequeños que un microscopio óptico. Los microscopios electrónicos modernos alcanzan resoluciones de 0.05 nanómetros, permitiendo fotografiar átomos individuales.' },
    ],
    fact: 'J.J. Thomson descubrió el electrón como partícula en 1897 y recibió el Premio Nobel de Física en 1906. Su hijo George Paget Thomson demostró que el electrón se comporta como onda en 1927 y recibió el Premio Nobel de Física en 1937. Son la única pareja padre-hijo en ganar el Nobel de Física por descubrimientos sobre la misma entidad (el electrón) pero con conclusiones aparentemente opuestas. Ambos tenían razón: el electrón es simultáneamente partícula y onda, dependiendo de cómo se observe.',
  },
  {
    id: 'einstein-vs-bohr',
    title: 'Einstein vs Bohr',
    color: '#4A6694',
    btnImage: '/assets/einstein/einstein_m4.png',
    image: '/assets/einstein/einstein_m4.png',
    content: [
      'El debate más célebre de la historia de la física enfrentó a Albert Einstein y Niels Bohr durante casi tres décadas, desde 1925 hasta la muerte de Einstein en 1955. La disputa giraba en torno a una pregunta fundamental: ¿la mecánica cuántica describe la realidad completa, o es solo una aproximación de algo más profundo? Bohr defendía la interpretación de Copenhague, según la cual las partículas no tienen propiedades definidas hasta que son medidas, y la aleatoriedad cuántica es una característica fundamental de la naturaleza, no un reflejo de nuestra ignorancia.',
      'Einstein rechazaba esta interpretación con toda su fuerza intelectual. Su objeción más famosa la expresó en una carta a Max Born en diciembre de 1926: "La mecánica cuántica impone mucho respeto. Pero una voz interior me dice que no es todavía la verdad. La teoría da mucho, pero apenas nos acerca al secreto del Viejo. En todo caso, estoy convencido de que Él no juega a los dados." Esta frase se ha resumido popularmente como "Dios no juega a los dados", y representa la convicción de Einstein de que el universo obedece leyes deterministas, no probabilísticas.',
      'Los enfrentamientos más memorables ocurrieron en los Congresos Solvay de 1927 y 1930 en Bruselas. En cada congreso, Einstein presentaba "experimentos mentales" diseñados para revelar contradicciones internas en la mecánica cuántica. En 1927, propuso un experimento con rendijas que supuestamente violaba el principio de incertidumbre de Heisenberg. Bohr pasó la noche analizando el argumento y al día siguiente demostró que Einstein no había considerado todos los efectos cuánticos. En 1930, Einstein ideó un "reloj de fotones" que parecía violar la relación de incertidumbre energía-tiempo. Bohr refutó el argumento usando la propia teoría de la relatividad general de Einstein.',
      'En mayo de 1935, Einstein lanzó su ataque más sofisticado: el artículo EPR (Einstein-Podolsky-Rosen), publicado en Physical Review. El artículo describía un escenario donde dos partículas interactúan y luego se separan. Según la mecánica cuántica, medir una propiedad de una partícula determina instantáneamente la propiedad correspondiente de la otra, sin importar la distancia que las separe. Einstein consideraba esto una "acción fantasmagórica a distancia" que violaba la relatividad (ninguna información puede viajar más rápido que la luz) y argumentaba que las partículas debían tener valores predeterminados antes de la medición — las llamadas "variables ocultas".',
      'Bohr respondió al artículo EPR con su propio artículo en Physical Review, con el mismo título, argumentando que Einstein aplicaba conceptos clásicos de forma inapropiada al mundo cuántico. Para Bohr, las dos partículas forman un sistema inseparable: no tiene sentido hablar de las propiedades de una sin considerar cómo se mide la otra. El debate quedó en un empate filosófico durante décadas. Einstein murió en 1955 sin aceptar la interpretación de Copenhague, y Bohr murió en 1962 con un diagrama del experimento de Einstein en su pizarra. El veredicto experimental no llegaría hasta 1982.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Niels Bohr respondió a la frase de Einstein sobre los dados con una réplica igual de memorable: "Einstein, deja de decirle a Dios lo que debe hacer." A pesar de sus profundos desacuerdos científicos, Einstein y Bohr mantenían un enorme respeto mutuo. Einstein escribió que Bohr era "una de las mentes científicas más grandes de nuestro tiempo" y Bohr dijo que las objeciones de Einstein habían sido "un estímulo para la clarificación de los fundamentos de la mecánica cuántica".' },
      { label: 'Dato Científico', icon: 'atom', text: 'El principio de incertidumbre de Werner Heisenberg, formulado en 1927, establece que es físicamente imposible conocer simultáneamente con precisión exacta la posición y el momento de una partícula. La relación matemática es Δx · Δp ≥ ħ/2, donde ħ = h/(2π). Esto no se debe a limitaciones instrumentales: es una propiedad intrínseca de la naturaleza. En la práctica, si determines la posición de un electrón con una precisión de 0.01 nanómetros, su velocidad queda indeterminada en al menos 7.3 millones de metros por segundo.' },
    ],
    fact: 'Cuando Niels Bohr murió el 18 de noviembre de 1962, los físicos que entraron a su despacho encontraron la pizarra con un dibujo del experimento mental de la "caja de fotones" de Einstein, el mismo argumento que Einstein había presentado en el Congreso Solvay de 1930. Más de treinta años después, Bohr seguía reflexionando sobre las objeciones de su rival. Este detalle revela la profundidad del debate: no era una simple discusión académica, sino una confrontación sobre la naturaleza misma de la realidad física.',
  },
  {
    id: 'entrelazamiento-cuantico',
    title: 'Entrelazamiento Cuántico',
    color: '#B88420',
    btnImage: '/assets/einstein/einstein_m4.png',
    image: '/assets/einstein/einstein_m4.png',
    content: [
      'El entrelazamiento cuántico es el fenómeno por el cual dos o más partículas quedan correlacionadas de tal manera que el estado cuántico de una no puede describirse independientemente del estado de las otras, sin importar la distancia que las separe. Si mides una propiedad de una partícula entrelazada (por ejemplo, el espín de un electrón), instantáneamente conoces la propiedad correspondiente de su compañera, aunque esté al otro lado del universo. Einstein lo llamó "spukhafte Fernwirkung" — acción fantasmagórica a distancia — y lo consideraba una prueba de que la mecánica cuántica estaba incompleta.',
      'Durante 30 años, el debate EPR pareció ser puramente filosófico, sin posibilidad de resolución experimental. Eso cambió en 1964, cuando el físico irlandés John Stewart Bell, trabajando en el CERN en Ginebra, demostró un teorema que permitía distinguir experimentalmente entre la mecánica cuántica y las teorías de variables ocultas de Einstein. Bell derivó una desigualdad matemática (las desigualdades de Bell) que cualquier teoría de variables ocultas locales debe satisfacer. Si la mecánica cuántica es correcta, las desigualdades de Bell se violan en ciertos experimentos.',
      'Los primeros experimentos que pusieron a prueba las desigualdades de Bell fueron realizados por John Clauser en 1972 y Stuart Freedman en la Universidad de Berkeley, usando pares de fotones entrelazados emitidos por átomos de calcio excitados. Sus resultados violaban las desigualdades de Bell, apoyando la mecánica cuántica. Sin embargo, estos experimentos tempranos tenían "lagunas" (loopholes) que dejaban abierta la posibilidad de explicaciones alternativas. El experimento definitivo requería cerrar todas las lagunas simultáneamente.',
      'En 1982, Alain Aspect y su equipo en el Instituto de Óptica de Orsay, Francia, realizaron una serie de experimentos que representan un hito en la historia de la física. Aspect usó pares de fotones entrelazados y, por primera vez, cambió la orientación de los detectores mientras los fotones estaban en vuelo, eliminando la posibilidad de que las partículas "supieran" de antemano qué medición se realizaría. Los resultados violaron las desigualdades de Bell por 40 desviaciones estándar, un nivel de confianza estadística enorme, confirmando que Einstein estaba equivocado sobre las variables ocultas locales.',
      'En octubre de 2022, el Premio Nobel de Física fue otorgado a Alain Aspect, John Clauser y Anton Zeilinger "por experimentos con fotones entrelazados, estableciendo la violación de las desigualdades de Bell y siendo pioneros en la ciencia de la información cuántica". Zeilinger, de la Universidad de Viena, había realizado en 1997 el primer experimento de teletransportación cuántica, transfiriendo el estado cuántico de un fotón a otro a distancia. En 2017, el satélite chino Micius logró entrelazamiento cuántico entre pares de fotones separados por 1,203 kilómetros, demostrando que el fenómeno funciona a escalas planetarias.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'John Bell era un físico de origen humilde de Belfast, Irlanda del Norte. Trabajaba en el CERN como diseñador de aceleradores de partículas y desarrolló su teorema sobre el entrelazamiento durante un año sabático en 1964. Bell creía personalmente que Einstein podría tener razón y esperaba que los experimentos confirmaran las variables ocultas. Cuando los experimentos demostraron lo contrario, Bell aceptó los resultados con elegancia y dedicó el resto de su carrera a comprender las implicaciones filosóficas. Murió en 1990 a los 62 años, sin recibir el Nobel que muchos consideran merecido.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La teletransportación cuántica no transmite materia ni energía más rápido que la luz. Lo que se transfiere es información cuántica — el estado de una partícula — usando un par entrelazado y un canal de comunicación clásico (que viaja a la velocidad de la luz o menor). El estado original se destruye en el proceso, cumpliendo con el teorema de no-clonación cuántica. El satélite Micius, lanzado por China en 2016, logró teletransportar estados cuánticos entre Pekín y Viena (7,600 km) en 2018, estableciendo un récord de distancia para comunicación cuántica segura.' },
    ],
    fact: 'Anton Zeilinger, co-ganador del Nobel 2022, realizó un experimento en 2012 usando luz de cuásares distantes (quásares) para determinar aleatoriamente las configuraciones de sus detectores. La luz de estos cuásares fue emitida hace 600 años, antes de que naciera cualquier humano involucrado en el experimento. Esto cerró la "laguna de libertad de elección" — la posibilidad de que algún factor oculto hubiera predeterminado tanto los ajustes de los detectores como los resultados. El universo mismo sirvió como generador de números aleatorios.',
  },
  {
    id: 'tecnologia-cuantica-hoy',
    title: 'Tecnología Cuántica Hoy',
    color: '#1E2D52',
    btnImage: '/assets/einstein/einstein_m4.png',
    image: '/assets/einstein/einstein_m4.png',
    content: [
      'El efecto fotoeléctrico descubierto por Einstein en 1905 es el principio fundamental detrás de los paneles solares fotovoltaicos que hoy generan electricidad en todo el mundo. En 2023, la capacidad solar instalada globalmente superó los 1,600 gigavatios (GW), suficiente para abastecer a más de 800 millones de hogares. La eficiencia de las células solares de silicio cristalino ha pasado del 6% en 1954 (cuando los Laboratorios Bell fabricaron la primera célula solar práctica) al 26.8% en 2023, acercándose al límite teórico de Shockley-Queisser del 33.7% para una única unión de silicio.',
      'Los LEDs (diodos emisores de luz) funcionan por el proceso inverso al efecto fotoeléctrico: en lugar de que un fotón arranque un electrón, un electrón libera un fotón al pasar por una unión semiconductora. Shuji Nakamura, Isamu Akasaki y Hiroshi Amano recibieron el Premio Nobel de Física en 2014 por inventar el LED azul eficiente en la década de 1990, lo que permitió crear LEDs blancos combinando LED azul con fósforo. Hoy, los LEDs consumen un 75% menos de electricidad que las bombillas incandescentes y duran 25 veces más, ahorrando globalmente más de 500 teravatios-hora de electricidad al año.',
      'Los láseres (Light Amplification by Stimulated Emission of Radiation) se basan en otro concepto propuesto por Einstein en 1917: la emisión estimulada. Einstein demostró teóricamente que un fotón puede "estimular" a un átomo excitado para que emita otro fotón idéntico — con la misma frecuencia, fase y dirección. Theodore Maiman construyó el primer láser funcional el 16 de mayo de 1960 usando un cristal de rubí. Hoy los láseres están en reproductores Blu-ray, cirugías oculares LASIK, escáneres de supermercado, comunicaciones por fibra óptica y sistemas de navegación LIDAR.',
      'La computación cuántica representa la frontera más avanzada de la tecnología basada en principios cuánticos. En octubre de 2019, Google anunció que su procesador cuántico Sycamore, con 53 qubits (bits cuánticos), había completado en 200 segundos un cálculo que a la supercomputadora más potente del momento le habría tomado 10,000 años. IBM cuestionó esta cifra, estimando que su supercomputadora Summit podría hacerlo en 2.5 días con técnicas optimizadas. En 2023, IBM presentó su procesador Condor con 1,121 qubits, acercándose a aplicaciones prácticas.',
      'La criptografía cuántica utiliza los principios del entrelazamiento y la incertidumbre de Heisenberg para crear sistemas de comunicación que son teóricamente imposibles de interceptar sin ser detectados. Si alguien intenta espiar un mensaje cuántico, el acto de medición altera inevitablemente el estado de los fotones, alertando a los comunicantes. China desplegó en 2017 una red de comunicación cuántica de 2,000 kilómetros entre Pekín y Shanghái, y el satélite Micius ha demostrado distribución cuántica de claves a distancias intercontinentales. Bancos, gobiernos y militares de varios países ya usan o prueban estos sistemas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La primera célula solar fue inventada en 1883 por Charles Fritts, quien recubrió selenio con una fina capa de oro. Tenía una eficiencia de solo el 1%. Albert Einstein proporcionó la explicación teórica del efecto fotoeléctrico en 1905. En 1954, Gerald Pearson, Calvin Fuller y Daryl Chapin de los Laboratorios Bell crearon la primera célula solar de silicio con un 6% de eficiencia. Hoy, células solares experimentales de múltiples uniones (perovskita sobre silicio) han superado el 33% de eficiencia, y la energía solar ya es más barata que el carbón en la mayoría de los países.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un qubit (bit cuántico) puede existir en una superposición de estados 0 y 1 simultáneamente, a diferencia de un bit clásico que solo puede ser 0 o 1. Con n qubits, un computador cuántico puede procesar 2ⁿ estados a la vez. Un procesador de 300 qubits podría, en principio, representar más estados simultáneos que el número de átomos en el universo observable (estimado en 10⁸⁰). Sin embargo, los qubits son extremadamente frágiles: los procesadores de Google e IBM operan a temperaturas de 15 milikelvin (-273.135 °C), más frío que el espacio exterior.' },
    ],
    fact: 'En 2022, la energía solar representó el 4.5% de la generación eléctrica mundial, pero es la fuente de energía de más rápido crecimiento en la historia. La Agencia Internacional de Energía (AIE) proyecta que para 2030, la capacidad solar instalada podría triplicarse. Todo esto se debe al efecto fotoeléctrico explicado por Einstein en 1905. Un solo descubrimiento teórico de un empleado de oficina de patentes de 26 años generó una industria global que en 2023 superó los 380 mil millones de dólares anuales y emplea a más de 4.3 millones de personas en todo el mundo.',
  },
];

// ─── Quantum Particle Field (Canvas Background) ─────────────────────────────
function QuantumField() {
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
      hue: Math.random() > 0.5 ? '212,160,60' : '44,62,107', // amber or navy
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

// ─── Quantum Header ──────────────────────────────────────────────────────────
function QuantumHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,160,60,0.3))' }}>
        {/* Quantum arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#quantGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 energy level markers */}
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
        {/* Central photon icon */}
        <circle cx="300" cy="28" r="10" fill="none" stroke="#D4A03C" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="28" r="4" fill="#D4A03C" opacity="0.5" />
        <path d="M282 28 Q290 22 298 28 Q306 34 314 28" fill="none" stroke="#D4A03C" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="quantGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,160,60,0.2)" />
            <stop offset="50%" stopColor="rgba(212,160,60,0.9)" />
            <stop offset="100%" stopColor="rgba(212,160,60,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="78" textAnchor="middle" fill="#D4A03C" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">MECÁNICA CUÁNTICA</text>
        <text x="300" y="98" textAnchor="middle" fill="rgba(212,160,60,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL EFECTO FOTOELÉCTRICO Y LA LUZ</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
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
          layoutId="activeDotEinsteinM4"
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
export default function InteractiveInfographic_EinsteinM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/einstein/einstein_m4.png)',
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
      <QuantumField />

      <QuantumHeader />

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
              🏆 ¡Has dominado los secretos de la Mecánica Cuántica!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Físico Cuántico
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
