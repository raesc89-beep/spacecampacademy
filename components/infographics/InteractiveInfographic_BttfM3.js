'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SVG DECORATIVE ELEMENTS â€” TIME PARADOXES
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const DecoWormhole = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 60 60" width={60 * s} height={60 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
    <ellipse cx="30" cy="30" rx="26" ry="14" fill="none" stroke="#00CCFF" strokeWidth="1.5" opacity=".45" />
    <ellipse cx="30" cy="30" rx="18" ry="9" fill="none" stroke="#E040FB" strokeWidth="1" opacity=".35" />
    <ellipse cx="30" cy="30" rx="10" ry="5" fill="none" stroke="#FFA500" strokeWidth=".8" opacity=".5" />
    <circle cx="30" cy="30" r="2" fill="#fff" opacity=".7" />
  </motion.svg>
);

const DecoClock = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 50 50" width={50 * s} height={50 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ rotate: -360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}>
    <circle cx="25" cy="25" r="22" fill="none" stroke="#FFA500" strokeWidth="1.2" opacity=".4" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => (
      <line key={a} x1={25 + 19 * Math.cos(a * Math.PI / 180)} y1={25 + 19 * Math.sin(a * Math.PI / 180)}
        x2={25 + 22 * Math.cos(a * Math.PI / 180)} y2={25 + 22 * Math.sin(a * Math.PI / 180)}
        stroke="#FFA500" strokeWidth="1" opacity=".5" />
    ))}
    <motion.line x1="25" y1="25" x2="25" y2="10" stroke="#00CCFF" strokeWidth="1.5" strokeLinecap="round" opacity=".6"
      animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '25px 25px' }} />
    <motion.line x1="25" y1="25" x2="35" y2="25" stroke="#FFA500" strokeWidth="1" strokeLinecap="round" opacity=".5"
      animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      style={{ transformOrigin: '25px 25px' }} />
  </motion.svg>
);

const DecoDeloreanTrail = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 80 30" width={80 * s} height={30 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, repeat: Infinity }}>
    <line x1="0" y1="15" x2="70" y2="15" stroke="#FFA500" strokeWidth="2" strokeDasharray="4 6" opacity=".5" />
    <line x1="0" y1="10" x2="65" y2="10" stroke="#FF6B00" strokeWidth="1" strokeDasharray="3 8" opacity=".3" />
    <line x1="0" y1="20" x2="65" y2="20" stroke="#FF6B00" strokeWidth="1" strokeDasharray="3 8" opacity=".3" />
    <circle cx="74" cy="15" r="3" fill="#FFA500" opacity=".7" />
  </motion.svg>
);

const DecoInfinityLoop = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 70 36" width={70 * s} height={36 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.55, 0.3] }}
    transition={{ duration: 5, repeat: Infinity }}>
    <path d="M35 18c0-8 12-16 20-8s-4 24-20 8c-16 16-28 0-20-8s20 0 20 8z"
      fill="none" stroke="#E040FB" strokeWidth="1.5" opacity=".5" />
  </motion.svg>
);

const DecoBranchTimeline = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 60 60" width={60 * s} height={60 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 4, repeat: Infinity }}>
    <line x1="5" y1="30" x2="30" y2="30" stroke="#00CCFF" strokeWidth="1.5" opacity=".6" />
    <line x1="30" y1="30" x2="55" y2="12" stroke="#00E676" strokeWidth="1.2" opacity=".5" />
    <line x1="30" y1="30" x2="55" y2="30" stroke="#FFA500" strokeWidth="1.2" opacity=".5" />
    <line x1="30" y1="30" x2="55" y2="48" stroke="#E040FB" strokeWidth="1.2" opacity=".5" />
    <circle cx="30" cy="30" r="3" fill="#FFD740" opacity=".6" />
    <circle cx="55" cy="12" r="2" fill="#00E676" opacity=".5" />
    <circle cx="55" cy="30" r="2" fill="#FFA500" opacity=".5" />
    <circle cx="55" cy="48" r="2" fill="#E040FB" opacity=".5" />
  </motion.svg>
);

const DecoQuantumParticle = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 40 40" width={40 * s} height={40 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ rotate: 360, scale: [1, 1.15, 1] }}
    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
    <circle cx="20" cy="20" r="3" fill="#00CCFF" opacity=".6" />
    <ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="#7C4DFF" strokeWidth=".8" opacity=".35" />
    <ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="#00CCFF" strokeWidth=".8" opacity=".35"
      transform="rotate(60 20 20)" />
    <ellipse cx="20" cy="20" rx="16" ry="6" fill="none" stroke="#FFA500" strokeWidth=".8" opacity=".35"
      transform="rotate(120 20 20)" />
  </motion.svg>
);

const DecoFluxLines = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 50 50" width={50 * s} height={50 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ opacity: [0.2, 0.5, 0.2], y: [0, -6, 0] }}
    transition={{ duration: 3.5, repeat: Infinity }}>
    <path d="M10 40 Q15 20 25 25 Q35 30 40 10" fill="none" stroke="#FFD740" strokeWidth="1.2" opacity=".45" />
    <path d="M5 38 Q18 15 25 20 Q32 25 45 8" fill="none" stroke="#FFA500" strokeWidth=".8" opacity=".3" />
    <circle cx="25" cy="25" r="2" fill="#FFD740" opacity=".6" />
  </motion.svg>
);

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DECO_MAP  â€” 3 per node
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const DECO_MAP = {
  'paradoja-abuelo': [
    <DecoInfinityLoop key="d0" x="2%" y="12%" s={1.1} />,
    <DecoClock key="d1" x="88%" y="60%" s={0.9} />,
    <DecoWormhole key="d2" x="70%" y="8%" s={0.8} />,
  ],
  'muchos-mundos': [
    <DecoBranchTimeline key="d0" x="5%" y="20%" s={1.2} />,
    <DecoQuantumParticle key="d1" x="85%" y="15%" s={1} />,
    <DecoWormhole key="d2" x="75%" y="70%" s={0.9} />,
  ],
  bootstrap: [
    <DecoInfinityLoop key="d0" x="80%" y="12%" s={1.1} />,
    <DecoFluxLines key="d1" x="6%" y="65%" s={1} />,
    <DecoClock key="d2" x="90%" y="55%" s={0.8} />,
  ],
  gemelos: [
    <DecoDeloreanTrail key="d0" x="3%" y="18%" s={1} />,
    <DecoQuantumParticle key="d1" x="82%" y="10%" s={1.1} />,
    <DecoClock key="d2" x="5%" y="70%" s={0.9} />,
  ],
  novikov: [
    <DecoInfinityLoop key="d0" x="85%" y="20%" s={1} />,
    <DecoBranchTimeline key="d1" x="4%" y="14%" s={1} />,
    <DecoFluxLines key="d2" x="78%" y="68%" s={0.9} />,
  ],
  delorean: [
    <DecoDeloreanTrail key="d0" x="5%" y="10%" s={1.2} />,
    <DecoFluxLines key="d1" x="80%" y="15%" s={1} />,
    <DecoWormhole key="d2" x="6%" y="72%" s={0.8} />,
  ],
  cronologia: [
    <DecoClock key="d0" x="85%" y="12%" s={1.1} />,
    <DecoQuantumParticle key="d1" x="8%" y="60%" s={1} />,
    <DecoBranchTimeline key="d2" x="78%" y="65%" s={0.9} />,
  ],
  'futuro-ciencia': [
    <DecoWormhole key="d0" x="6%" y="15%" s={1.1} />,
    <DecoDeloreanTrail key="d1" x="75%" y="8%" s={1} />,
    <DecoQuantumParticle key="d2" x="85%" y="62%" s={1} />,
  ],
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   INFOGRAPHIC_NODES  â€” 8 nodes
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const BIBLIOGRAPHY = [
  'Deutsch, D. (1991). Quantum mechanics near closed timelike lines, Physical Review D, 44',
  'Novikov, I.D. (1989). An analysis of the operation of a time machine, JETP, 68',
  'Lewis, D. (1976). The Paradoxes of Time Travel, American Philosophical Quarterly, 13',
  'Visser, M. (1995). Lorentzian Wormholes, Springer',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'paradoja-abuelo', title: 'La Paradoja del Abuelo', color: '#FFA500',
    btnImage: '/assets/bttf/infographic_m3/btn_paradoja-abuelo.jpg',
    image: '/assets/bttf/infographic_m3/hero_paradoja-abuelo.jpg',
    content: [
      'Una paradoja es una premisa sin solución lógica. Por ejemplo: «Esta oración es falsa». Si es falsa, dice la verdad, pero si dice la verdad, debería ser falsa. Las paradojas temporales operan de la misma manera, creando bucles lógicos.',
      'La paradoja del abuelo plantea que viajas al pasado e impides que tus abuelos se conozcan. Si no se conocen, tus padres no nacen, y tú tampoco. Pero si no naces, no puedes viajar al pasado.',
      'Las bases de esta paradoja se encuentran en la física. La Teoría de la Relatividad de Einstein permite viajar al futuro, lo cual ha sido comprobado, pero viajar al pasado genera inconsistencias lógicas. Las ecuaciones de Einstein no prohíben el viaje al pasado de forma directa.',
      'En «Volver al Futuro», esta paradoja ocurre cuando Marty impide que sus padres se conozcan. Su mano comienza a desvanecerse, ilustrando cómo alterar el pasado elimina la propia existencia del viajero.',
      'En 1949, el matemático Kurt Gödel encontró soluciones a las ecuaciones de la Relatividad que permiten «curvas temporales cerradas», es decir, trayectorias matemáticas hacia el pasado. Este hallazgo preocupó a Einstein porque su teoría permitía situaciones lógicamente inconsistentes.',
    ],
    fact: 'Kurt Gödel le regaló a Einstein un universo en rotación por su cumpleaños en 1949, demostrando que los viajes al pasado eran matemáticamente posibles según la propia teoría de Einstein. A Einstein le inquietó profundamente.',
  },
  {
    id: 'muchos-mundos', title: 'Universos Paralelos', color: '#00CCFF',
    btnImage: '/assets/bttf/infographic_m3/btn_muchos-mundos.jpg',
    image: '/assets/bttf/infographic_m3/hero_muchos-mundos.jpg',
    content: [
      'En 1957, el físico Hugh Everett propuso que, en cada evento cuántico, el universo se divide. Si una partícula puede tomar dos caminos, el universo se separa en dos ramas distintas. En ambas, la realidad continúa.',
      'Esta teoría resuelve la paradoja del abuelo. Si viajas al pasado y modificas un evento, no cambias tu propia historia, sino que creas una línea temporal alterna. Tu universo original permanece intacto.',
      'En «Volver al Futuro Parte II», Doc Brown explica este concepto al mostrar cómo la línea temporal se divide cuando Biff altera el pasado, creando un 1985 alternativo.',
      'Este concepto se relaciona con la «decoherencia cuántica». En el experimento del gato de Schrödinger, el animal está en una superposición de estados. En la interpretación de Muchos Mundos, ambas opciones ocurren en ramas diferentes de la realidad.',
      'En una encuesta de 2013, aproximadamente el 18% de los físicos especialistas apoyaban la interpretación de Muchos Mundos. Es la segunda opción más aceptada después de la interpretación de Copenhague.',
    ],
    fact: 'Hugh Everett propuso los Muchos Mundos en su tesis doctoral de 1957. Su director John Wheeler la apoyó, pero Niels Bohr la rechazó. Everett abandonó la física y se convirtió en contratista militar. Murió a los 51 años sin saber que su teoría se volvería respetada.',
  },
  {
    id: 'bootstrap', title: 'El Bucle Bootstrap', color: '#E040FB',
    btnImage: '/assets/bttf/infographic_m3/btn_bootstrap.jpg',
    image: '/assets/bttf/infographic_m3/hero_bootstrap.jpg',
    content: [
      'Una paradoja de bootstrap ocurre cuando un objeto o información existe sin haber sido creado. Si encuentras los planos de una máquina del tiempo, la construyes, viajas al pasado y dejas los planos para que los encuentres, la información existe en un bucle cerrado.',
      'En la película, esto ocurre con la canción «Johnny B. Goode». Marty la toca en 1955, Chuck Berry la escucha por teléfono y la aprende de Marty, quien originalmente la aprendió de Chuck. Nadie compuso la canción.',
      'Si un viajero le entrega a Beethoven las partituras de la Quinta Sinfonía antes de que la escriba, y luego las aprende del mismo Beethoven, la música carece de un creador original.',
      'Las paradojas de bootstrap no violan la termodinámica, ya que la entropía sigue aumentando. Sin embargo, violan el principio de causalidad, porque la causa y el efecto se vuelven indistinguibles.',
      'El relato «All You Zombies» de Robert Heinlein explora este concepto: una persona viaja en el tiempo y resulta ser su propia madre y su propio padre. Es el ejemplo de un individuo creado en un bucle temporal sin origen externo.',
    ],
    fact: 'El nombre «paradoja bootstrap» viene del relato de Robert Heinlein «By His Bootstraps» (1941). La frase «levantarte tirando de tus propias botas» originalmente describía algo imposible â€” ¡no puedes levantarte tirando de tus propios zapatos!',
  },
  {
    id: 'gemelos', title: 'La Paradoja de los Gemelos', color: '#FF6B00',
    btnImage: '/assets/bttf/infographic_m3/btn_gemelos.jpg',
    image: '/assets/bttf/infographic_m3/hero_gemelos.jpg',
    content: [
      'La paradoja de los gemelos se basa en principios físicos comprobados. La Teoría de la Relatividad Especial (1905) establece que el tiempo transcurre más lento a medida que aumenta la velocidad del observador.',
      'Si un gemelo viaja al espacio al 90% de la velocidad de la luz durante 5 años, al regresar a la Tierra habrán pasado 11.5 años para su hermano. La diferencia de edad es un efecto físico real.',
      'En 1971, el experimento de Hafele-Keating comprobó este efecto volando relojes atómicos en aviones comerciales. Los relojes a bordo registraron una pérdida de tiempo respecto a los relojes en tierra, tal como predecía la relatividad.',
      'Los satélites GPS aplican estos ajustes a diario. Por orbitar a gran velocidad y menor gravedad terrestre, sus relojes se desfasan 38 microsegundos por día. Sin compensación relativista, el sistema acumularía grandes errores de posición.',
      'El astronauta Scott Kelly pasó 340 días en la Estación Espacial Internacional. Al volver a la Tierra, resultó ser 5 milisegundos más joven que su hermano gemelo, convirtiéndose en un viajero hacia el futuro.',
    ],
    fact: 'Scott Kelly es 5 milisegundos más joven que su gemelo idéntico Mark Kelly (ahora senador de EE.UU. Por Arizona) porque pasó 520 días totales en el espacio. La ISS orbita a 7.66 km/s. Cada astronauta que regresa de la ISS ha viajado un poquito al futuro.',
  },
  {
    id: 'novikov', title: 'El Principio de Autoconsistencia', color: '#7C4DFF',
    btnImage: '/assets/bttf/infographic_m3/btn_novikov.jpg',
    image: '/assets/bttf/infographic_m3/hero_novikov.jpg',
    content: [
      'El físico Igor Novikov propuso que el universo no permite paradojas temporales. Su Principio de Autoconsistencia establece que los eventos influenciados por un viajero en el tiempo deben ser consistentes con la historia previa.',
      'Según este principio, si intentas alterar el pasado, los factores externos lo impedirán. El universo forzará los eventos para mantener la línea temporal sin alteraciones contradictorias.',
      'Kip Thorne trabajó con Novikov en el desarrollo matemático de este principio y lo aplicó en asesorías científicas para obras de ficción, manteniendo coherencia con las leyes de la física.',
      'Thorne analizó un experimento donde una bola de billar viaja al pasado por un agujero de gusano e impacta contra su versión anterior. Demostró matemáticamente que el choque desvía la bola de una manera que previene paradojas.',
      'En la película, la historia se reajusta tras los cambios provocados por Marty. Sus padres terminan juntos mediante eventos diferentes, manteniendo la consistencia de su propia existencia.',
    ],
    fact: 'Kip Thorne ganó el Nobel de Física 2017 por detectar ondas gravitacionales. También fue consultor científico de «Interstellar» (2014) y sus ecuaciones del agujero negro Gargantúa fueron tan precisas que generaron artículos científicos reales. Literalmente convirtió una película en investigación.',
  },
  {
    id: 'delorean', title: 'Ciencia Detrás del DeLorean', color: '#FFA500',
    btnImage: '/assets/bttf/infographic_m3/btn_delorean.jpg',
    image: '/assets/bttf/infographic_m3/hero_delorean.jpg',
    content: [
      'Según la relatividad, el tiempo se distorsiona conforme un objeto acelera. Alcanzar el límite de la velocidad de la luz produce efectos temporales marcados.',
      'Para deformar el espacio-tiempo se requiere materia exótica con energía negativa. Modelos teóricos como el motor warp de Alcubierre dependen de este tipo de energía para funcionar.',
      'El DeLorean requería 1.21 gigawatts de potencia, una cantidad equivalente a la producida por un reactor nuclear. Esta demanda energética concuerda con las necesidades teóricas para la manipulación espacial.',
      'A velocidades cercanas a la de la luz, un objeto emitiría radiación de Cherenkov en un espectro azul, distinta a las llamas naranjas presentadas en la película.',
      'El DeLorean DMC-12 fue seleccionado para la película por su carrocería de acero inoxidable y sus puertas de ala de gaviota. Se fabricaron aproximadamente 9,000 unidades en la década de 1980.',
    ],
    fact: 'El guion original tenía la máquina del tiempo como un refrigerador, no un auto. Steven Spielberg (productor ejecutivo) temía que los niños se encerraran en refrigeradores imitando la película, así que lo cambiaron a un auto. El DeLorean fue elegido porque su carrocería de acero y puertas de gaviota ya parecían una nave espacial.',
  },
  {
    id: 'cronologia', title: 'La Protección Cronológica', color: '#00E676',
    btnImage: '/assets/bttf/infographic_m3/btn_cronologia.jpg',
    image: '/assets/bttf/infographic_m3/hero_cronologia.jpg',
    content: [
      'En 1992, Stephen Hawking propuso la Conjetura de Protección Cronológica, argumentando que las leyes de la física impiden la formación de curvas cerradas de tiempo para evitar el viaje al pasado.',
      'Hawking organizó una fiesta para viajeros del tiempo en 2009, enviando las invitaciones después del evento. Ningún viajero asistió a la celebración.',
      'La formación de una máquina del tiempo mediante agujeros de gusano produciría inestabilidades cuánticas. La concentración de energía destruiría la estructura antes de ser funcional.',
      'El concepto de «censura cósmica» sugiere que el universo oculta singularidades, del mismo modo que los agujeros negros se ocultan tras sus horizontes de eventos. Esta protección mantendría la coherencia causal.',
      'El viaje al pasado permanece en un estado teórico indefinido porque la Relatividad General y la Mecánica Cuántica no han sido unificadas. Una teoría de gravedad cuántica podría resolver definitivamente esta cuestión.',
    ],
    fact: 'La fiesta de Stephen Hawking para viajeros del tiempo fue el 28 de junio de 2009 en Cambridge. Las invitaciones se enviaron DESPUÉS, con coordenadas exactas: 52°12\'21"N, 0°7\'4.7"E. Nadie apareció. Hawking mantuvo el champán listo por si acaso y dijo: «Tengo evidencia experimental de que el viaje en el tiempo no es posible.»',
  },
  {
    id: 'futuro-ciencia', title: 'El Futuro de la Ciencia del Tiempo', color: '#FFD740',
    btnImage: '/assets/bttf/infographic_m3/btn_futuro-ciencia.jpg',
    image: '/assets/bttf/infographic_m3/hero_futuro-ciencia.jpg',
    content: [
      'El viaje al futuro es un fenómeno comprobado por la dilatación temporal de la relatividad. Efectos similares se miden en el GPS, los vuelos espaciales y los aceleradores de partículas.',
      'La viabilidad del viaje al pasado, la estabilización de agujeros de gusano y la Conjetura de Protección Cronológica son problemas pendientes en la investigación física actual.',
      'La conjetura ER=EPR plantea que los agujeros de gusano y el entrelazamiento cuántico son el mismo fenómeno. De ser correcta, proporcionaría un modelo físico sobre cómo la información conecta diferentes puntos espaciotemporales.',
      'Las representaciones del viaje temporal en la ciencia ficción han estimulado la formulación de hipótesis matemáticas e impulsan la exploración de la física teórica.',
      'Las paradojas temporales operan como herramientas para identificar fallos en los modelos actuales. Cuestionar la causalidad o la dirección del tiempo promueve el avance en nuestra comprensión del universo.',
    ],
    fact: 'En 2014, científicos de la Universidad de Queensland simularon un fotón viajando a través de curvas temporales cerradas e interactuando con su versión más joven. La simulación mostró que el fotón SIEMPRE encontraba un camino autoconsistente, apoyando los modelos teóricos de viaje temporal autoconsistente. Fue la primera simulación cuántica de este tipo, publicada en Nature Communications.',
  },
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   TEMPORAL FIELD â€” animated canvas
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function TemporalField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf, w, h;
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const N = 90;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.2 + 0.6,
      color: Math.random() > 0.5 ? '#00CCFF' : '#FFA500',
      isGear: Math.random() < 0.12,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.save();
        ctx.globalAlpha = 0.45;
        if (p.isGear) {
          ctx.translate(p.x, p.y);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            const ro = p.r * 2.5, ri = p.r * 1.6;
            ctx.lineTo(Math.cos(a) * ro, Math.sin(a) * ro);
            const a2 = ((i + 0.5) / 8) * Math.PI * 2;
            ctx.lineTo(Math.cos(a2) * ri, Math.sin(a2) * ri);
          }
          ctx.closePath(); ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SVG HEADER  â€” vortex
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ParadoxHeader() {
  return (
    <svg viewBox="0 0 600 90" style={{ width: '100%', maxWidth: 600, display: 'block', margin: '0 auto' }}>
      {/* vortex rings */}
      <ellipse cx="300" cy="45" rx="280" ry="30" fill="none" stroke="#00CCFF" strokeWidth="0.8" opacity=".25" />
      <ellipse cx="300" cy="45" rx="220" ry="22" fill="none" stroke="#E040FB" strokeWidth="0.6" opacity=".2" />
      <ellipse cx="300" cy="45" rx="160" ry="15" fill="none" stroke="#FFA500" strokeWidth="0.5" opacity=".2" />
      {/* title */}
      <text x="300" y="42" textAnchor="middle" fill="#FFA500" fontSize="22" fontWeight="800"
        fontFamily="'Orbitron',sans-serif" letterSpacing="3">PARADOJAS TEMPORALES</text>
      <text x="300" y="62" textAnchor="middle" fill="#00CCFF" fontSize="10" fontWeight="600"
        fontFamily="'Exo 2',sans-serif" letterSpacing="5" opacity=".7">LA CIENCIA DE VOLVER AL FUTURO</text>
      {/* decorative dots */}
      <circle cx="80" cy="45" r="2" fill="#FFA500" opacity=".5" />
      <circle cx="520" cy="45" r="2" fill="#00CCFF" opacity=".5" />
      <circle cx="50" cy="45" r="1.2" fill="#E040FB" opacity=".35" />
      <circle cx="550" cy="45" r="1.2" fill="#E040FB" opacity=".35" />
    </svg>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   EXPANDABLE PARAGRAPH
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const EXPAND_DIRS = ['down', 'down', 'down', 'down'];
function seededDir(i) { return 'down'; }

const dirVariants = {
  down:  { hidden: { height: 0, opacity: 0, y: 8 },  visible: { height: 'auto', opacity: 1, y: 0 } },
};

function ExpandIcon({ open }) {
  return (
    <motion.svg viewBox="0 0 24 24" width={18} height={18} animate={{ rotate: open ? 90 : 0 }}
      style={{ flexShrink: 0, cursor: 'pointer' }}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="#00CCFF" strokeWidth="1.5" opacity=".6" />
      <motion.path d="M9 6 L9 12 L12 9" fill="none" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round"
        animate={{ rotate: open ? 180 : 0 }} style={{ transformOrigin: '12px 12px' }} />
      <circle cx="12" cy="16" r="1" fill="#FFA500" opacity=".7" />
    </motion.svg>
  );
}

function ExpandableParagraph({ text, index, nodeColor }) {
  const [open, setOpen] = useState(false);
  const dir = seededDir(index);
  const firstSentence = text.split(/(?<=\.)\s/)[0];
  const rest = text.slice(firstSentence.length).trim();
  const v = dirVariants[dir];

  return (
    <div style={{ marginBottom: 10, background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '10px 12px',
      borderLeft: `3px solid ${nodeColor}44`, cursor: 'pointer' }} onClick={() => setOpen(o => !o)}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <ExpandIcon open={open} />
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#ddd' }}>
          {firstSentence}
          {!open && rest && <span style={{ color: '#888' }}> ...</span>}
        </p>
      </div>
      <AnimatePresence>
        {open && rest && (
          <motion.div
            key="exp"
            variants={v}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden', marginTop: 6, paddingLeft: 26 }}
          >
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: '#ccc' }}>{rest}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   NODE BUTTON
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function NodeButton({ node, isActive, isExplored, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'relative', width: 78, height: 78, borderRadius: 8,
        border: `2px solid ${node.color}`,
        borderTop: `2px solid ${node.color}cc`,
        borderBottom: `3px solid ${node.color}66`,
        background: `linear-gradient(135deg, #1a1a2e 0%, #0f0f23 50%, #1a1a2e 100%)`,
        cursor: 'pointer', padding: 3, outline: 'none',
        boxShadow: isActive
          ? `0 0 20px ${node.color}aa, 0 0 40px ${node.color}44, inset 0 0 15px ${node.color}33, 0 4px 8px rgba(0,0,0,.6)`
          : `0 0 8px ${node.color}44, 0 2px 6px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08)`,
        transition: 'box-shadow .3s, border-color .3s',
        overflow: 'hidden',
      }}
    >
      {/* Retro CRT scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 6, zIndex: 2, pointerEvents:'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0.15) 2px, rgba(0,0,0.15) 4px)',
        mixBlendMode: 'overlay',
      }} />
      {/* Chrome corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8, borderTop: `2px solid ${node.color}`, borderLeft: `2px solid ${node.color}`, borderRadius: '6px 0 0 0', zIndex: 3 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderTop: `2px solid ${node.color}`, borderRight: `2px solid ${node.color}`, borderRadius: '0 6px 0 0', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 8, borderBottom: `2px solid ${node.color}`, borderLeft: `2px solid ${node.color}`, borderRadius: '0 0 0 6px', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderBottom: `2px solid ${node.color}`, borderRight: `2px solid ${node.color}`, borderRadius: '0 0 6px 0', zIndex: 3 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={node.btnImage} alt={node.title}
        style={{ width: '100%', height: '100%', borderRadius: 5, objectFit: 'cover', filter: isActive ? 'saturate(1.3) brightness(1.1)' : 'saturate(0.85) brightness(0.9)' }}  loading="lazy" />
      {isExplored && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{
            position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: 4, background:'linear-gradient(135deg, #00E676, #00C853)', border: '2px solid #0a0a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4,
            boxShadow: '0 0 8px #00E67688',
          }}>
          <svg viewBox="0 0 16 16" width={12} height={12}>
            <path d="M3 8l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
      <div style={{
        position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontSize: 8, fontWeight: 800, color: node.color, letterSpacing: 1.5, textTransform:'uppercase',
        textShadow: `0 0 8px ${node.color}88, 0 1px 3px rgba(0,0,0,.9)`,
        fontFamily: "'Exo 2', 'Courier New', monospace",
      }}>
        {node.title.length > 14 ? node.title.slice(0, 13) + '…' : node.title}
      </div>
    </motion.button>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CONTENT PANEL
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ContentPanel({ node, onClose, setLightboxSrc }) {
  if (!node) return null;
  const heroParas = node.content.slice(0, 2);
  const bodyParas = node.content.slice(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'relative', width: '100%', maxWidth: 900, margin: '0 auto',
        background: 'rgba(8,4,18,0.94)', borderRadius: 16,
        border: `1px solid ${node.color}44`, padding: 0, overflow: 'hidden',
        boxShadow: `0 0 40px ${node.color}22`,
      }}
    >
      {/* close btn */}
      <button onClick={onClose} style={{
        position: 'absolute', top: 12, right: 12, zIndex: 10, background: 'rgba(255,255,255,0.08)',
        border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex',
        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}>
        <X size={16} color="#fff" />
      </button>

      {/* â”€â”€â”€ HERO: two-column (estándar Abu Simbel) â”€â”€â”€ */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
        minHeight: '280px',
      }}>
        {/* hero image */}
        <div style={{
          position: 'relative', overflow: 'hidden', height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title}
            onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)`, pointerEvents: 'none' }} />
        </div>
        {/* hero text */}
        <div style={{ padding: '28px 28px 20px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{
            margin: '0 0 14px', fontSize: 22, fontWeight: 800, color: node.color,
            fontFamily: "'Orbitron',sans-serif", letterSpacing: 1,
          }}>{node.title}</h2>
          {heroParas.map((p, i) => (
            <p key={i} style={{ fontSize: 14, lineHeight: 1.7, color: '#ccc', margin: '0 0 10px' }}>{p}</p>
          ))}
        </div>
      </div>

      {/* â”€â”€â”€ MAGAZINE BODY â€” M9-standard 2-column grid â”€â”€â”€ */}
      <div style={{ padding: '20px 28px 14px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem',
        }}>
          {bodyParas.map((p, i) => {
            const isWide = i === bodyParas.length - 1 && (bodyParas.length % 2 !== 0);
            return (
              <div key={i} style={{
                gridColumn: isWide ? '1 / -1' : 'auto',
                background: 'rgba(255,255,255,0.02)', borderRadius: 12,
                padding: '1.2rem', borderLeft: `3px solid ${node.color}30`,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', top: -8, left: 12, background: node.color, color:'#0a0a1a',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: 8, letterSpacing: 1,
                }}>
                  {i === 0 ? 'â—†' : i === 1 ? 'â—‡' : 'â˜…'}
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: '#ccc' }}>{p}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* â”€â”€â”€ FACT â”€â”€â”€ */}
      <div style={{
        margin: '0 28px 20px', padding: '14px 16px', borderRadius: 10,
        background: `linear-gradient(90deg, ${node.color}14, transparent)`,
        borderLeft: `4px solid ${node.color}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <Sparkles size={14} color={node.color} />
          <span style={{ fontSize: 11, fontWeight: 800, color: node.color, textTransform: 'uppercase', letterSpacing: 1 }}>
            Dato Fascinante
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: '#bbb', fontStyle: 'italic' }}>{node.fact}</p>
      </div>
    </motion.div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PROGRESS BAR
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function ProgressBar({ explored, total }) {
  const pct = Math.round((explored / total) * 100);
  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: '#aaa', fontWeight: 600 }}>Progreso</span>
        <span style={{ fontSize: 11, color: '#FFA500', fontWeight: 700 }}>{explored}/{total} explorados</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#FFA500,#00CCFF)' }}
        />
      </div>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN COMPONENT
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function InteractiveInfographic_BttfM3() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeId) || null;
  const allExplored = explored.size === INFOGRAPHIC_NODES.length;

  const handleSelect = useCallback((id) => {
    setActiveId(id);
    setExplored(prev => { const s = new Set(prev); s.add(id); return s; });
  }, []);

  return (
    <div style={{
      position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden',
      background: 'linear-gradient(180deg, #0a0416 0%, #110828 40%, #0d0520 100%)',
      fontFamily: "'Exo 2','Segoe UI',sans-serif", color: '#fff',
    }}>
      {/* bg image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/bttf/infographic_paradojas/bg_paradojas.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none',
      }} />

      {/* canvas particles */}
      <TemporalField />

      {/* decorations for active node */}
      {activeId && DECO_MAP[activeId] && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
          {DECO_MAP[activeId]}
        </div>
      )}

      {/* â”€â”€â”€ CONTENT â”€â”€â”€ */}
      <div style={{ position: 'relative', zIndex: 2, padding: '32px 16px 48px' }}>
        {/* header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <ParadoxHeader />
        </motion.div>

        {/* node buttons */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: 36, margin: '40px auto 36px', maxWidth: 700,
        }}>
          {INFOGRAPHIC_NODES.map(n => (
            <NodeButton key={n.id} node={n} isActive={activeId === n.id}
              isExplored={explored.has(n.id)} onClick={() => handleSelect(n.id)} />
          ))}
        </div>

        {/* progress */}
        <div style={{ marginBottom: 30 }}>
          <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
        </div>

        {/* panel */}
        <AnimatePresence mode="wait">
          {activeNode && <ContentPanel key={activeNode.id} node={activeNode} onClose={() => setActiveId(null)} setLightboxSrc={setLightboxSrc} />}
        </AnimatePresence>

        {/* completion message */}
        <AnimatePresence>
          {allExplored && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              style={{
                marginTop: 36, textAlign: 'center', padding: '28px 20px', borderRadius: 16,
                background: 'rgba(255,165,0,0.08)', border: '1px solid #FFA50044', maxWidth: 520, margin: '36px auto 0',
              }}
            >
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Star size={36} color="#FFD740" fill="#FFD740" style={{ margin: '0 auto 10px', display: 'block' }} />
              </motion.div>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#FFA500', margin: '0 0 8px', fontFamily: "'Orbitron',sans-serif" }}>
                â° ¡Has dominado las Paradojas del Tiempo!
              </p>
              <p style={{ fontSize: 14, color: '#ccc', margin: 0 }}>
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
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
