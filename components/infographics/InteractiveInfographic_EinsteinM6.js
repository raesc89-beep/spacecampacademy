'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Cosmology themed) ————————————————————————
function DecoGalaxy({ size = 70, color = '#D4A03C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(45 30 30)" />
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" transform="rotate(90 30 30)" />
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" transform="rotate(135 30 30)" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.9" />
      {/* Spiral arm stars */}
      <circle cx="48" cy="26" r="1.2" fill={color} opacity="0.5" />
      <circle cx="12" cy="34" r="1.2" fill={color} opacity="0.5" />
      <circle cx="38" cy="16" r="0.8" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoLambda({ size = 70, color = '#D4A03C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Lambda symbol */}
      <text x="18" y="42" fill={color} fontSize="36" fontWeight="bold" fontFamily="serif" opacity="0.5">Λ</text>
      {/* Surrounding energy dots */}
      <circle cx="50" cy="12" r="1.5" fill={color} opacity="0.4" />
      <circle cx="8" cy="18" r="1" fill={color} opacity="0.3" />
      <circle cx="52" cy="45" r="1.2" fill={color} opacity="0.4" />
      <circle cx="10" cy="50" r="1" fill={color} opacity="0.3" />
      {/* Expansion arrows */}
      <path d="M45 20 L52 15" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      <path d="M45 40 L52 45" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

function DecoLens({ size = 70, color = '#3A5280', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Gravitational lens effect */}
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.3" />
      {/* Bent light rays */}
      <path d="M5 15 Q20 28 30 24" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M5 45 Q20 32 30 36" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M55 15 Q40 28 30 24" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M55 45 Q40 32 30 36" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Einstein ring */}
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

function DecoBEC({ size = 60, color = '#4A6694', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Wave function / condensate */}
      <path d="M5 30 Q15 15 25 30 Q35 45 45 30 Q50 22 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M5 35 Q15 20 25 35 Q35 50 45 35 Q50 27 55 35" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Coherent particles */}
      {[12, 20, 28, 36, 44].map((x, i) => (
        <circle key={i} cx={x} cy="30" r="3" fill={color} opacity={0.2 + i * 0.05} />
      ))}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.15" />
    </svg>
  );
}

function DecoSpacetime({ size = 70, color = '#C4922E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Curved spacetime grid */}
      <path d="M5 20 Q30 35 55 20" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M5 30 Q30 45 55 30" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M5 40 Q30 55 55 40" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M15 10 Q20 30 15 50" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M30 10 Q35 30 30 50" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <path d="M45 10 Q50 30 45 50" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Mass distortion */}
      <circle cx="30" cy="35" r="5" fill={color} opacity="0.3" />
      <circle cx="30" cy="35" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoUnify({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Four forces converging */}
      <line x1="10" y1="10" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="50" y1="10" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="10" y1="50" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Force labels */}
      <circle cx="10" cy="10" r="4" fill={color} opacity="0.3" />
      <circle cx="50" cy="10" r="4" fill={color} opacity="0.3" />
      <circle cx="10" cy="50" r="4" fill={color} opacity="0.3" />
      <circle cx="50" cy="50" r="4" fill={color} opacity="0.3" />
      {/* Central unification point */}
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.2" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'constante-cosmologica': [DecoLambda, DecoGalaxy, DecoSpacetime],
  'expansion-universo': [DecoGalaxy, DecoSpacetime, DecoLambda],
  'lentes-gravitacionales': [DecoLens, DecoSpacetime, DecoGalaxy],
  'condensado-bose-einstein': [DecoBEC, DecoLambda, DecoLens],
  'cosmologia-moderna': [DecoGalaxy, DecoLens, DecoUnify],
  'busqueda-unificacion': [DecoUnify, DecoBEC, DecoSpacetime],
  'einstein-tenia-razon': [DecoSpacetime, DecoLens, DecoGalaxy],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Isaacson, W. (2007). Einstein: His Life and Universe, Simon & Schuster',
  'Weinberg, S. (2008). Cosmology, Oxford University Press',
  'Peebles, P.J.E. (2020). Cosmology\'s Century: An Inside History of Our Modern Understanding of the Universe, Princeton University Press',
  'Planck Collaboration (2018). Planck 2018 Results. VI. Cosmological Parameters, Astronomy & Astrophysics, 641, A6',
  'Perlmutter, S. et al. (1999). Measurements of Ω and Λ from 42 High-Redshift Supernovae, The Astrophysical Journal, 517(2), 565-586',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'constante-cosmologica',
    title: 'La Constante Cosmológica',
    color: '#2C3E6B',
    btnImage: '/assets/albert_einstein/infographic_m6/btn_constante-cosmologica.jpg',
    image: '/assets/albert_einstein/infographic_m6/hero_constante-cosmologica.jpg',
    content: [
      'En 1917, Albert Einstein aplicó sus ecuaciones de la relatividad general al universo en su conjunto y obtuvo un resultado que lo inquietó: las ecuaciones predecían que el universo debía estar expandiéndose o contrayéndose. En aquella época, la mayoría de los científicos creían que el cosmos era estático y eterno, sin cambios a gran escala. Para forzar una solución estática, Einstein introdujo un término adicional en sus ecuaciones que denominó la constante cosmológica, representada por la letra griega lambda (Λ). Este término actuaba como una fuerza repulsiva que contrarrestaba la gravedad a escalas cósmicas, manteniendo el universo en equilibrio.',
      'La constante cosmológica fue una solución ingeniosa pero problemática. El físico neerlandés Willem de Sitter demostró en el mismo año 1917 que existían otras soluciones a las ecuaciones de Einstein que describían un universo en expansión, incluso con la constante cosmológica presente. El astrónomo ruso Alexander Friedmann publicó en 1922 soluciones completas que mostraban universos dinámicos, en expansión o contracción, sin necesidad de la constante. Einstein inicialmente rechazó el trabajo de Friedmann, pero luego reconoció su validez matemática.',
      'Cuando Edwin Hubble demostró en 1929 que las galaxias se alejan unas de otras, confirmando la expansión del universo, Einstein abandonó la constante cosmológica y supuestamente la llamó su "mayor error" (größte Eselei). El físico George Gamow reportó esta declaración en su autobiografía de 1970, aunque algunos historiadores debaten si Einstein usó esas palabras exactas. Lo que está documentado es que Einstein consideró innecesario el término lambda una vez que la expansión fue confirmada observacionalmente por los datos de Hubble y Milton Humason.',
      'La rehabilitación de la constante cosmológica llegó en 1998, cuando dos equipos independientes de astrónomos — el Supernova Cosmology Project liderado por Saul Perlmutter y el High-z Supernova Search Team de Adam Riess y Brian Schmidt — descubrieron que la expansión del universo se está acelerando. Al observar supernovas tipo Ia en galaxias distantes, encontraron que estas explosiones estelares eran más tenues de lo esperado, indicando que las galaxias se alejan cada vez más rápido. Este descubrimiento requería una fuerza repulsiva que actúa a escala cósmica, exactamente como la constante cosmológica de Einstein.',
      'Perlmutter, Schmidt y Riess recibieron el Premio Nobel de Física en 2011 por este hallazgo. La energía oscura, que hoy se asocia con la constante cosmológica, constituye aproximadamente el 68% del contenido energético total del universo según las mediciones del satélite Planck publicadas en 2018. El "mayor error" de Einstein resultó ser una de sus intuiciones más profundas: el universo contiene una energía inherente al espacio vacío que impulsa su expansión acelerada. Las ecuaciones originales de 1917 contenían la respuesta correcta que la tecnología de su época no podía verificar.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La constante cosmológica tiene un valor medido de aproximadamente 1.1056 × 10⁻⁵² m⁻², un número tan pequeño que resulta casi nulo a escalas humanas o incluso del sistema solar. Sin embargo, a distancias de miles de millones de años luz, su efecto acumulativo domina sobre la gravedad y empuja al cosmos a expandirse cada vez más rápido. Si fuera apenas diez veces mayor, las estrellas y galaxias nunca se habrían formado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El problema de la constante cosmológica es considerado uno de los mayores enigmas de la física moderna. La mecánica cuántica predice que el vacío debería tener una densidad de energía 10¹²⁰ veces mayor que el valor observado de la constante cosmológica. Esta discrepancia de 120 órdenes de magnitud es la predicción más errónea en la historia de la física teórica, y aún no tiene explicación satisfactoria. Steven Weinberg propuso en 1987 un argumento antrópico para explicarla.' },
    ],
    fact: 'Einstein escribió en una carta de 1947 al físico Georges Lemaître que la introducción de la constante cosmológica había sido su "mayor equivocación". Sin embargo, el propio Lemaître respondió que la constante cosmológica era necesaria y que Einstein no debería avergonzarse de haberla propuesto. En 2019, el Telescopio Espacial Hubble midió la tasa de expansión del universo en 74.03 ± 1.42 km/s/Mpc, confirmando que la energía oscura asociada a Λ es real y domina la dinámica cósmica actual.',
  },
  {
    id: 'expansion-universo',
    title: 'Expansión del Universo',
    color: '#D4A03C',
    btnImage: '/assets/albert_einstein/infographic_m6/btn_expansion-universo.jpg',
    image: '/assets/albert_einstein/infographic_m6/hero_expansion-universo.jpg',
    content: [
      'La idea de que el universo se expande fue propuesta teóricamente antes de ser confirmada por observaciones. En 1927, el sacerdote y físico belga Georges Lemaître publicó un artículo en los Annales de la Société Scientifique de Bruxelles donde derivó de las ecuaciones de Einstein una relación entre la velocidad de recesión de las galaxias y su distancia. Lemaître obtuvo un valor de la tasa de expansión de aproximadamente 625 km/s/Mpc, usando datos de Vesto Slipher sobre corrimientos al rojo y estimaciones de distancias de Hubble. Su trabajo fue publicado en francés y pasó desapercibido para la comunidad anglófona.',
      'Edwin Hubble, trabajando en el Observatorio de Monte Wilson en California con el telescopio Hooker de 2.5 metros de diámetro (el más grande del mundo en esa época), publicó en 1929 su célebre artículo "A Relation between Distance and Radial Velocity among Extra-Galactic Nebulae". Usando cefeidas variables como indicadores de distancia, Hubble demostró que las galaxias se alejan de nosotros con velocidades proporcionales a su distancia. La relación v = H₀d, donde H₀ es la constante de Hubble, se convirtió en uno de los pilares de la cosmología moderna.',
      'A partir de la expansión observada, Lemaître propuso en 1931 la hipótesis del "átomo primitivo": si el universo se expande, en el pasado debió ser más pequeño y denso, hasta llegar a un punto de densidad infinita. Esta idea fue el germen de lo que hoy conocemos como la teoría del Big Bang. El término "Big Bang" fue acuñado de forma despectiva en 1949 por el astrónomo británico Fred Hoyle durante un programa de radio de la BBC, ya que Hoyle defendía un modelo de universo estacionario donde se creaba materia continuamente para mantener la densidad constante.',
      'La confirmación observacional del Big Bang llegó en 1965, cuando Arno Penzias y Robert Wilson, ingenieros de los Laboratorios Bell en Holmdel, Nueva Jersey, detectaron accidentalmente un ruido de fondo uniforme en su antena de microondas que no podían eliminar. Habían descubierto la radiación cósmica de fondo de microondas (CMB), predicha en 1948 por Ralph Alpher y Robert Herman como el resplandor residual del universo primitivo caliente. La CMB tiene una temperatura de 2.725 kelvin (-270.425 °C) y es uniforme en todas las direcciones con variaciones de apenas 1 parte en 100,000.',
      'Penzias y Wilson recibieron el Premio Nobel de Física en 1978 por su descubrimiento. Las mediciones posteriores del satélite COBE (1989-1993), liderado por John Mather y George Smoot, confirmaron que la CMB tiene un espectro de cuerpo negro perfecto y revelaron las diminutas fluctuaciones de temperatura que representan las semillas de las futuras galaxias y cúmulos de galaxias. Mather y Smoot recibieron el Nobel en 2006. Hoy sabemos que el universo tiene 13,800 millones de años de edad, determinado con una precisión del 0.2% gracias a las mediciones del satélite Planck de la Agencia Espacial Europea.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La expansión del universo no significa que las galaxias se muevan "a través" del espacio. Es el propio espacio entre las galaxias el que se estira. Una analogía útil es imaginar puntos dibujados en un globo que se infla: los puntos no se mueven sobre la superficie, pero la distancia entre ellos aumenta. Por esta razón, galaxias suficientemente lejanas se alejan de nosotros a velocidades superiores a la de la luz, lo cual no viola la relatividad porque no es movimiento a través del espacio sino expansión del espacio mismo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Existe una "tensión" en cosmología moderna: las mediciones locales de la constante de Hubble (usando cefeidas y supernovas) dan un valor de 73.04 ± 1.04 km/s/Mpc, mientras que las mediciones del satélite Planck basadas en la radiación cósmica de fondo dan 67.4 ± 0.5 km/s/Mpc. Esta diferencia de casi 9% tiene una significación estadística de más de 5 sigma, lo que sugiere que podría haber física nueva que no entendemos. El Telescopio Espacial James Webb está ayudando a resolver esta discrepancia.' },
    ],
    fact: 'Georges Lemaître conoció personalmente a Einstein en 1927 durante la Conferencia Solvay en Bruselas y le presentó su teoría de la expansión. Einstein le respondió: "Sus cálculos son correctos, pero su física es abominable". Tres años después, durante una visita de Lemaître al Monte Wilson en 1933, Einstein escuchó una conferencia del sacerdote-físico y al final se puso de pie y dijo: "Esta es la explicación más bella y satisfactoria de la creación que he escuchado jamás". La humildad intelectual de Einstein para cambiar de opinión es un modelo para todo científico.',
  },
  {
    id: 'lentes-gravitacionales',
    title: 'Lentes Gravitacionales',
    color: '#3A5280',
    btnImage: '/assets/albert_einstein/infographic_m6/btn_lentes-gravitacionales.jpg',
    image: '/assets/albert_einstein/infographic_m6/hero_lentes-gravitacionales.jpg',
    content: [
      'La relatividad general predice que la masa curva el espacio-tiempo, y que la luz viaja siguiendo estas curvaturas. En 1936, Einstein publicó un breve artículo en la revista Science titulado "Lens-Like Action of a Star by the Deviation of Light in the Gravitational Field", donde calculó que una estrella podría actuar como una lente gravitacional, desviando y amplificando la luz de una estrella más lejana alineada detrás de ella. Einstein describió la formación de un anillo de luz completo cuando la alineación es exacta, pero concluyó que el efecto sería demasiado débil para observarse con estrellas individuales.',
      'El astrónomo suizo-estadounidense Fritz Zwicky fue más visionario. En un artículo de 1937 publicado en Physical Review, Zwicky propuso que galaxias enteras, no solo estrellas, podrían actuar como lentes gravitacionales. Calculó que el efecto sería mucho más notable con objetos masivos como galaxias y cúmulos de galaxias, produciendo imágenes múltiples y arcos luminosos de fuentes distantes. Zwicky también predijo que este fenómeno podría usarse como un "telescopio natural" para observar objetos demasiado lejanos y débiles para detectar de otra forma.',
      'La primera lente gravitacional fue descubierta en 1979 por Dennis Walsh, Bob Carswell y Ray Weymann, quienes observaron dos imágenes del quásar QSO 0957+561 con espectros idénticos, separadas por 6 segundos de arco. La galaxia responsable de la deflexión se encontraba entre el quásar y la Tierra, a una distancia de 3,700 millones de años luz. Este descubrimiento confirmó las predicciones de Einstein y Zwicky con cuatro décadas de diferencia, y abrió un campo completamente nuevo en la astrofísica observacional.',
      'Los anillos de Einstein — círculos completos o casi completos de luz formados cuando la fuente, la lente y el observador están alineados — fueron observados por primera vez por el radiotelescopio VLA (Very Large Array) en 1988 con la fuente de radio MG1131+0456. El Telescopio Espacial Hubble ha capturado numerosos ejemplos de anillos de Einstein y arcos gravitacionales, particularmente en cúmulos de galaxias masivos como Abell 370 y MACS J0416, donde las imágenes distorsionadas de galaxias de fondo crean patrones visuales que permiten mapear la distribución de materia oscura en el cúmulo.',
      'Las lentes gravitacionales se han convertido en una herramienta fundamental para detectar y mapear la materia oscura. Dado que la materia oscura no emite ni absorbe luz pero sí curva el espacio-tiempo, su presencia solo puede inferirse por sus efectos gravitacionales. El programa de lentes gravitacionales débiles (weak lensing) del Dark Energy Survey, que cubrió 5,000 grados cuadrados del cielo entre 2013 y 2019, ha producido los mapas más detallados de la distribución de materia oscura en el universo. En 2023, el Telescopio Espacial James Webb detectó la galaxia más lejana amplificada por una lente gravitacional, a un corrimiento al rojo de z = 13, cuando el universo tenía apenas 330 millones de años.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Fritz Zwicky fue el primero en proponer la existencia de materia oscura en 1933, al observar que las galaxias del Cúmulo de Coma se movían demasiado rápido para estar unidas solo por la masa visible. Calculó que debía existir unas 400 veces más masa de la que se podía ver (estimación posterior corregida a unas 10 veces). Zwicky también acuñó el término "supernova" y catalogó más de 10,000 cúmulos de galaxias, pero su personalidad conflictiva hizo que muchos colegas lo ignoraran durante décadas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las microlentes gravitacionales permiten detectar planetas extrasolares. Cuando una estrella con un planeta pasa frente a una estrella de fondo, la gravedad del planeta causa una distorsión adicional y breve en la curva de luz amplificada. El proyecto OGLE (Optical Gravitational Lensing Experiment) ha detectado más de 200 planetas con este método desde 1992, incluyendo planetas que orbitan estrellas a 25,000 años luz de distancia, mucho más lejos de lo que otros métodos de detección pueden alcanzar.' },
    ],
    fact: 'En noviembre de 2014, el Telescopio Espacial Hubble observó una supernova cuya luz fue dividida en cuatro imágenes por la galaxia lente MACS J1149 en una configuración conocida como Cruz de Einstein. Los astrónomos predijeron que una quinta imagen aparecería aproximadamente un año después, debido al diferente camino que la luz debía recorrer. En diciembre de 2015, la imagen predicha apareció exactamente donde se esperaba. Fue la primera vez en la historia que se predijo correctamente la aparición de una supernova, una prueba directa y contundente de la relatividad general.',
  },
  {
    id: 'condensado-bose-einstein',
    title: 'Condensado de Bose-Einstein',
    color: '#C4922E',
    btnImage: '/assets/albert_einstein/infographic_m6/btn_condensado-bose-einstein.jpg',
    image: '/assets/albert_einstein/infographic_m6/hero_condensado-bose-einstein.jpg',
    content: [
      'En 1924, el físico indio Satyendra Nath Bose envió a Einstein un artículo donde derivaba la ley de radiación de Planck usando un nuevo método estadístico para contar fotones. Bose trataba los fotones como partículas indistinguibles, una idea radical que contradecía la física clásica donde cada partícula era única. Einstein reconoció la importancia del trabajo, lo tradujo al alemán y lo presentó para su publicación en la revista Zeitschrift für Physik. Luego, Einstein extendió el método de Bose a los átomos y predijo un nuevo estado de la materia.',
      'Einstein calculó que si se enfriaban átomos de un gas ideal a temperaturas extremadamente cercanas al cero absoluto (-273.15 °C), una fracción significativa de los átomos colapsaría al mismo estado cuántico de mínima energía. En este estado, los átomos perderían su identidad individual y se comportarían como una única entidad cuántica macroscópica, gobernada por las leyes de la mecánica cuántica. Este fenómeno, denominado condensación de Bose-Einstein, representaba la manifestación de efectos cuánticos a escala visible, algo sin precedentes en la física de los años 1920.',
      'La predicción de Einstein permaneció sin verificación experimental durante 71 años. El obstáculo principal era alcanzar las temperaturas necesarias: menos de una millonésima de grado por encima del cero absoluto. En junio de 1995, los físicos Eric Cornell y Carl Wieman del JILA (Joint Institute for Laboratory Astrophysics) en la Universidad de Colorado, Boulder, lograron crear el primer condensado de Bose-Einstein usando una muestra de aproximadamente 2,000 átomos de rubidio-87 enfriados a 170 nanokelvins (0.00000017 grados por encima del cero absoluto) mediante una combinación de enfriamiento láser y evaporación magnética.',
      'Cuatro meses después del logro de Cornell y Wieman, Wolfgang Ketterle del MIT produjo independientemente un condensado de Bose-Einstein con átomos de sodio-23, con una muestra cien veces mayor que permitió realizar mediciones más detalladas. Ketterle demostró la coherencia cuántica del condensado al dividirlo en dos partes y observar patrones de interferencia cuando se recombinaban, confirmando que los millones de átomos actuaban como una onda cuántica unificada. Cornell, Wieman y Ketterle compartieron el Premio Nobel de Física en 2001 por estos trabajos pioneros.',
      'Los condensados de Bose-Einstein tienen aplicaciones que van más allá de la física fundamental. Se utilizan como simuladores cuánticos para estudiar fenómenos de materia condensada como la superfluidez y la superconductividad en condiciones controladas. En 2018, la misión Cold Atom Lab de la NASA creó un BEC en la Estación Espacial Internacional, donde la microgravedad permite mantener el condensado durante más de 10 segundos (comparado con fracciones de segundo en la Tierra). Los BEC también se investigan como componentes para relojes atómicos de precisión extrema, interferómetros atómicos para detectar ondas gravitacionales y sensores cuánticos para navegación sin GPS.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Satyendra Nath Bose nunca obtuvo un doctorado, y su artículo original de 1924 fue rechazado por la revista Philosophical Magazine antes de que lo enviara directamente a Einstein. Bose escribió la carta a Einstein en inglés, y Einstein respondió en alemán. A pesar de que la estadística de Bose-Einstein lleva su nombre y fundamenta la física de partículas moderna, Bose nunca recibió el Premio Nobel. Las partículas que obedecen su estadística se llaman bosones en su honor, incluyendo el famoso bosón de Higgs descubierto en el CERN en 2012.' },
      { label: 'Dato Científico', icon: 'atom', text: 'A la temperatura del condensado de Bose-Einstein (170 nanokelvins), la longitud de onda de De Broglie de los átomos se vuelve comparable a la distancia entre ellos. Esto significa que las funciones de onda individuales de los átomos se superponen y fusionan en una única función de onda macroscópica. Es como si millones de instrumentos musicales tocaran exactamente la misma nota en perfecta sincronía. El BEC es el estado más frío conocido en el universo: es más frío que el espacio interestelar profundo, que tiene una temperatura de 2.725 kelvin.' },
    ],
    fact: 'En 2010, físicos de la Universidad de Bonn lograron crear un condensado de Bose-Einstein con fotones (partículas de luz), algo que Einstein y Bose habían considerado teóricamente pero que se creía técnicamente impracticable. El equipo, liderado por Martin Weitz, confinó fotones en una microcavidad óptica llena de una solución de colorante, enfriándolos hasta que se condensaron en el mismo estado cuántico. Este BEC fotónico emitía un haz de luz coherente similar a un láser pero con propiedades cuánticas distintas, abriendo posibilidades para nuevas fuentes de luz y tecnologías de computación cuántica.',
  },
  {
    id: 'cosmologia-moderna',
    title: 'Cosmología Moderna',
    color: '#4A6694',
    btnImage: '/assets/albert_einstein/infographic_m6/btn_cosmologia-moderna.jpg',
    image: '/assets/albert_einstein/infographic_m6/hero_cosmologia-moderna.jpg',
    content: [
      'El modelo estándar de la cosmología moderna, conocido como ΛCDM (Lambda-Cold Dark Matter), se construye directamente sobre las ecuaciones de la relatividad general de Einstein con la constante cosmológica (Λ) y materia oscura fría (CDM). Según las mediciones del satélite Planck de la ESA publicadas en 2018, el universo está compuesto por 68.3% de energía oscura, 26.8% de materia oscura y apenas 4.9% de materia ordinaria (bariónica): los átomos que forman estrellas, planetas y seres humanos. Todo lo que podemos ver con telescopios representa menos del 5% del contenido del universo.',
      'El satélite WMAP (Wilkinson Microwave Anisotropy Probe) de la NASA, que operó entre 2001 y 2010, produjo el primer mapa detallado de las anisotropías de la radiación cósmica de fondo con una resolución angular de 0.23 grados. Estos datos permitieron determinar que el universo es espacialmente plano (con una curvatura compatible con cero dentro del 0.4%), que su edad es de 13,770 ± 130 millones de años, y que las primeras estrellas se formaron aproximadamente 400 millones de años después del Big Bang. El equipo de WMAP, liderado por Charles Bennett de la Universidad Johns Hopkins, publicó más de 5,000 artículos científicos basados en estos datos.',
      'El satélite Planck de la ESA, lanzado en mayo de 2009 y operativo hasta octubre de 2013, refinó las mediciones de WMAP con una sensibilidad tres veces mayor y una resolución angular de 5 minutos de arco. Los resultados de Planck establecieron la edad del universo en 13,800 ± 20 millones de años, la constante de Hubble en 67.4 ± 0.5 km/s/Mpc, y confirmaron que las fluctuaciones primordiales de densidad siguen un espectro casi invariante de escala, consistente con la teoría de inflación cósmica propuesta por Alan Guth en 1981.',
      'La materia oscura fue propuesta por primera vez por Fritz Zwicky en 1933 al estudiar el Cúmulo de Coma, y confirmada en los años 1970 por Vera Rubin y Kent Ford al medir las curvas de rotación de galaxias espirales. Rubin demostró que las estrellas en los bordes de las galaxias orbitan a la misma velocidad que las del centro, violando las leyes de Kepler a menos que exista una gran cantidad de masa invisible. A pesar de décadas de búsqueda, la naturaleza de la materia oscura sigue siendo uno de los mayores misterios. Los detectores subterráneos como XENON1T en el Gran Sasso (Italia) y LUX-ZEPLIN en Dakota del Sur (EE.UU.) buscan interacciones directas con partículas de materia oscura sin éxito concluyente hasta la fecha.',
      'La energía oscura, responsable de la expansión acelerada del universo, es aún más misteriosa que la materia oscura. Podría ser la constante cosmológica de Einstein (energía del vacío), pero también podría ser un campo dinámico que cambia con el tiempo, denominado "quintaesencia". El Dark Energy Spectroscopic Instrument (DESI), que comenzó operaciones en 2021 en el Observatorio Nacional de Kitt Peak en Arizona, está mapeando las posiciones de 35 millones de galaxias y quásares para medir la historia de expansión del universo con precisión sin precedentes. Sus primeros resultados, publicados en 2024, sugieren indicios de que la energía oscura podría estar variando con el tiempo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El satélite Planck midió la temperatura de la radiación cósmica de fondo con una precisión de 0.000001 kelvin. Las diminutas variaciones de temperatura en el CMB (del orden de 1 parte en 100,000) representan las pequeñas irregularidades de densidad en el universo primitivo que, amplificadas por la gravedad durante miles de millones de años, dieron origen a todas las galaxias, estrellas y planetas que observamos hoy. Sin estas fluctuaciones cuánticas, el universo sería una sopa uniforme de gas sin estructura alguna.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Vera Rubin fue sistemáticamente ignorada por el comité del Premio Nobel a pesar de sus contribuciones fundamentales a la evidencia de materia oscura. Rubin murió en 2016 sin recibir el Nobel, generando un intenso debate sobre el sesgo de género en la ciencia. En su honor, el Observatorio Vera C. Rubin, ubicado en Cerro Pachón, Chile, con un espejo de 8.4 metros, comenzará en 2025 un sondeo de 10 años llamado LSST que fotografiará todo el cielo visible cada 3 noches, generando 20 terabytes de datos por noche.' },
    ],
    fact: 'El modelo ΛCDM tiene solo seis parámetros libres que describen todo el universo observable: la densidad de materia bariónica (Ωb), la densidad de materia oscura (Ωc), la edad del universo (t₀), el índice espectral de las perturbaciones primordiales (nₛ), la amplitud de las fluctuaciones (Aₛ) y la profundidad óptica de reionización (τ). Con estos seis números, derivados de las ecuaciones de Einstein, se puede calcular la edad, composición, geometría y destino del cosmos con una precisión superior al 1%. Es la prueba más contundente de que la relatividad general describe correctamente el universo a gran escala.',
  },
  {
    id: 'busqueda-unificacion',
    title: 'La Búsqueda de la Unificación',
    color: '#B88420',
    btnImage: '/assets/albert_einstein/infographic_m6/btn_busqueda-unificacion.jpg',
    image: '/assets/albert_einstein/infographic_m6/hero_busqueda-unificacion.jpg',
    content: [
      'Durante los últimos 30 años de su vida, desde 1925 hasta su muerte en 1955, Einstein dedicó la mayor parte de su esfuerzo intelectual a encontrar una teoría del campo unificado que combinara la gravedad (descrita por la relatividad general) con el electromagnetismo (descrito por las ecuaciones de Maxwell) en un único marco matemático. Einstein buscaba una ecuación maestra que describiera todas las fuerzas de la naturaleza como manifestaciones de una sola realidad geométrica subyacente. En su mesa de noche cuando murió se encontraron hojas con cálculos para esta teoría inacabada.',
      'El enfoque de Einstein fue puramente geométrico: intentó extender las matemáticas de la relatividad general añadiendo dimensiones adicionales al espacio-tiempo o modificando su estructura geométrica. Siguió las ideas de Theodor Kaluza, quien en 1921 demostró que las ecuaciones de Maxwell podían derivarse de la relatividad general si se añadía una quinta dimensión espacial compactificada, y de Oskar Klein, quien en 1926 propuso que esta dimensión extra estaba enrollada a una escala de 10⁻³⁵ metros, demasiado pequeña para ser detectada. Einstein publicó más de 25 artículos sobre teorías unificadas, pero ninguno produjo predicciones verificables.',
      'La comunidad física contemporánea consideraba que Einstein estaba trabajando en un problema prematuro. Las fuerzas nucleares fuerte y débil aún no estaban bien comprendidas en las décadas de 1930 y 1940, por lo que unificar solo gravedad y electromagnetismo dejaba fuera la mitad del panorama. Además, Einstein rechazaba las interpretaciones probabilísticas de la mecánica cuántica, resumido en su frase a Max Born: "Dios no juega a los dados". Esta posición filosófica lo aisló de los avances en la teoría cuántica de campos que dominaban la física de partículas en esa época.',
      'El sueño de Einstein encontró herederos en la teoría de cuerdas, propuesta independientemente por Gabriele Veneziano en 1968 y desarrollada por John Schwarz, Michael Green y Edward Witten en las décadas siguientes. La teoría de cuerdas propone que las partículas fundamentales no son puntos sino cuerdas unidimensionales vibrantes cuyas diferentes frecuencias de vibración producen las distintas partículas observadas. En su versión más desarrollada (teoría M, propuesta por Witten en 1995), requiere 11 dimensiones del espacio-tiempo y contiene la gravedad de forma natural, logrando en principio lo que Einstein buscó sin éxito.',
      'La gravedad cuántica de lazos es un enfoque alternativo desarrollado por Abhay Ashtekar, Carlo Rovelli y Lee Smolin desde los años 1980, que cuantiza directamente el espacio-tiempo sin añadir dimensiones extra. En esta teoría, el espacio no es continuo sino que está formado por unidades discretas (cuantos de área y volumen) con un tamaño mínimo de la longitud de Planck: 1.616 × 10⁻³⁵ metros. Ambas aproximaciones — cuerdas y lazos — siguen siendo matemáticamente consistentes pero carecen de verificación experimental directa, ya que las energías necesarias para probarlas superan con creces la capacidad de cualquier acelerador de partículas construido o propuesto.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 1929, un periódico de Nueva York publicó en primera plana que Einstein había completado su teoría del campo unificado. Más de 100 periodistas acudieron a la Academia Prusiana de Ciencias en Berlín para cubrir el evento. Einstein tuvo que publicar una retractación semanas después al descubrir errores en su formulación. Este ciclo de anuncio-retractación se repitió varias veces durante las décadas siguientes, convirtiendo a Einstein en un personaje trágico de la física: el genio que resolvió los mayores problemas pero no pudo resolver el que más le importaba.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La energía de Planck, necesaria para probar directamente la gravedad cuántica, es de aproximadamente 1.22 × 10¹⁹ GeV (gigaelectronvoltios). El Gran Colisionador de Hadrones del CERN alcanza energías de 13,600 GeV, lo que significa que necesitaríamos un acelerador 10¹⁵ veces más potente, algo tecnológicamente impracticable. Sin embargo, señales indirectas podrían observarse en las ondas gravitacionales primordiales, en las anisotropías del CMB o en comportamientos anómalos de partículas a altas energías. Los detectores LISA y Einstein Telescope buscarán estas señales.' },
    ],
    fact: 'Wolfgang Pauli, uno de los críticos más agudos de Einstein, escribió sobre los intentos de unificación de Einstein: "Lo que Dios ha separado, que ningún hombre lo una". Pauli se refería a que la gravedad y la mecánica cuántica parecen operar bajo reglas fundamentalmente distintas. Sin embargo, en 2019, la fotografía del agujero negro M87* por el Event Horizon Telescope mostró una región donde ambas teorías deben aplicarse simultáneamente: el horizonte de eventos. Esta imagen, que requirió ocho telescopios distribuidos por todo el planeta trabajando como un interferómetro del tamaño de la Tierra, ha motivado nuevos esfuerzos para encontrar la teoría cuántica de la gravedad que Einstein buscó durante tres décadas.',
  },
  {
    id: 'einstein-tenia-razon',
    title: 'Einstein Tenía Razón',
    color: '#1E2D52',
    btnImage: '/assets/albert_einstein/infographic_m6/btn_einstein-tenia-razon.jpg',
    image: '/assets/albert_einstein/infographic_m6/hero_einstein-tenia-razon.jpg',
    content: [
      'Cada predicción cuantitativa de la relatividad general de Einstein ha sido confirmada experimentalmente con precisión creciente durante más de un siglo. La primera prueba llegó el 29 de mayo de 1919, cuando las expediciones de Arthur Eddington a la isla de Príncipe (frente a África occidental) y Andrew Crommelin a Sobral (Brasil) fotografiaron estrellas durante un eclipse total de sol. La desviación medida fue de 1.98 ± 0.16 segundos de arco, consistente con la predicción de Einstein de 1.75 segundos de arco y descartando la predicción newtoniana de 0.87 segundos de arco. El resultado fue anunciado el 6 de noviembre de 1919 en la Royal Society de Londres.',
      'Las ondas gravitacionales, predichas por Einstein en 1916 como ondulaciones en el espacio-tiempo producidas por masas aceleradas, fueron detectadas directamente por primera vez el 14 de septiembre de 2015 por los detectores LIGO (Laser Interferometer Gravitational-Wave Observatory) en Hanford, Washington, y Livingston, Luisiana. La señal GW150914 correspondía a la fusión de dos agujeros negros de 36 y 29 masas solares a 1,300 millones de años luz de distancia. El evento liberó más energía que todas las estrellas del universo observable combinadas durante una fracción de segundo. Rainer Weiss, Barry Barish y Kip Thorne recibieron el Nobel de Física en 2017.',
      'El arrastre de marco (frame-dragging), predicho por los físicos Josef Lense y Hans Thirring en 1918 usando la relatividad general, fue medido directamente por la misión Gravity Probe B de la NASA, lanzada en 2004. Esta misión usó cuatro giroscopios esféricos de cuarzo — las esferas más perfectas jamás fabricadas, con desviaciones de menos de 40 átomos — para medir cómo la rotación de la Tierra arrastra el espacio-tiempo a su alrededor. El resultado, publicado en 2011, confirmó la predicción de Einstein con una precisión del 19%: la Tierra desvía el espacio-tiempo 37.2 milisegundos de arco por año.',
      'La dilatación gravitacional del tiempo, predicha por Einstein en 1907, establece que los relojes en un campo gravitacional más intenso marcan más lento que los que están en un campo débil. Este efecto ha sido verificado con relojes atómicos colocados a diferentes altitudes. En 2010, investigadores del NIST (National Institute of Standards and Technology) demostraron que un reloj atómico de aluminio situado 33 centímetros por encima de otro medía una diferencia de tiempo de 4 partes en 10¹⁷, exactamente como predice la relatividad. Los satélites GPS corrigen 45 microsegundos diarios de adelanto gravitacional para funcionar con precisión de metros.',
      'En 2019, el Event Horizon Telescope produjo la primera imagen directa de un agujero negro: M87*, en el centro de la galaxia Messier 87, a 55 millones de años luz de distancia. La sombra circular del agujero negro, de 42 microsegundos de arco de diámetro, rodeada por un anillo de emisión asimétrico, coincidió con las predicciones de la relatividad general con un error menor al 10%. En mayo de 2022, el EHT reveló la imagen de Sagitario A*, el agujero negro supermasivo en el centro de nuestra Vía Láctea, con una masa de 4 millones de soles. Cada nueva observación, cada nueva tecnología y cada nuevo experimento han confirmado que Albert Einstein describió la gravedad correctamente hace más de un siglo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los detectores LIGO son los instrumentos de medición más sensibles jamás construidos. Cada detector consiste en dos brazos perpendiculares de 4 kilómetros de longitud por los que viajan haces de láser. LIGO puede detectar cambios en la longitud de sus brazos de 10⁻¹⁹ metros: una diezmilésima del diámetro de un protón. Es como medir la distancia a la estrella más cercana (Alpha Centauri, a 4.37 años luz) con la precisión del grosor de un cabello humano. La señal GW150914 duró apenas 0.2 segundos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El 17 de agosto de 2017, LIGO y Virgo detectaron ondas gravitacionales de la fusión de dos estrellas de neutrones (GW170817). Apenas 1.7 segundos después, el satélite Fermi detectó un estallido de rayos gamma de la misma fuente. Más de 70 telescopios en todo el mundo observaron la kilonova resultante en diferentes longitudes de onda. Este evento confirmó que las ondas gravitacionales viajan exactamente a la velocidad de la luz (con una diferencia menor a 3 partes en 10¹⁵), verificó que los elementos pesados como el oro y el platino se forman en fusiones de estrellas de neutrones, e inauguró la era de la astronomía multi-mensajero.' },
    ],
    fact: 'En 2016, la misión MICROSCOPE de la Agencia Espacial Francesa puso a prueba el principio de equivalencia de Einstein — que la masa gravitacional y la masa inercial son idénticas — con una precisión de 10⁻¹⁵, la prueba más precisa jamás realizada. El resultado confirmó la equivalencia con cero desviación dentro del margen de error. Si se hubiera encontrado una diferencia, habría sido la primera señal de física más allá de la relatividad general. Desde 1905, absolutamente ningún experimento ha contradicho las predicciones de Einstein. La relatividad general cumplió 110 años en 2025 y sigue siendo la descripción más precisa de la gravedad que la humanidad posee.',
  },
];

// ——— Cosmic Particle Field (Canvas Background) ————————————————————————
function CosmicField() {
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

// ——— Einstein Universe Header ——————————————————————————————————————
function EinsteinUniverseHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,160,60,0.3))' }}>
        {/* Cosmic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#einsteinGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
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
        {/* Central galaxy icon */}
        <ellipse cx="300" cy="30" rx="14" ry="6" fill="none" stroke="#D4A03C" strokeWidth="1.2" opacity="0.5" />
        <ellipse cx="300" cy="30" rx="14" ry="6" fill="none" stroke="#D4A03C" strokeWidth="1" opacity="0.4" transform="rotate(60 300 30)" />
        <circle cx="300" cy="30" r="3" fill="#D4A03C" opacity="0.6" />
        <defs>
          <linearGradient id="einsteinGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,160,60,0.2)" />
            <stop offset="50%" stopColor="rgba(212,160,60,0.9)" />
            <stop offset="100%" stopColor="rgba(212,160,60,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A03C" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL UNIVERSO DE EINSTEIN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,160,60,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">COSMOLOGÍA Y LEGADO CIENTÍFICO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ———————————————————
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
          layoutId="activeDotEinsteinM6"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

// ——— Magazine-Style Content Panel ——————————————————————————————————————
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

        {/* ——— Expandable Interactive Sections ——— */}
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

// ——— Progress Bar ————————————————————————————————————————————————————
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

// ——— Main Infographic Component ——————————————————————————————————————
export default function InteractiveInfographic_EinsteinM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/einstein/einstein_m6_bg.png)',
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
      <CosmicField />

      <EinsteinUniverseHeader />

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
              🏆 ¡Has explorado todo el Universo de Einstein!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Cosmólogo
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
