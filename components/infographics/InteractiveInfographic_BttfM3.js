'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

/* ═══════════════════════════════════════════
   SVG DECORATIVE ELEMENTS — TIME PARADOXES
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════
   DECO_MAP  — 3 per node
   ═══════════════════════════ */
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

/* ═══════════════════════════════
   INFOGRAPHIC_NODES  — 8 nodes
   ═══════════════════════════════ */
const BIBLIOGRAPHY = [
  'Deutsch, D. (1991). Quantum mechanics near closed timelike lines, Physical Review D, 44',
  'Novikov, I.D. (1989). An analysis of the operation of a time machine, JETP, 68',
  'Lewis, D. (1976). The Paradoxes of Time Travel, American Philosophical Quarterly, 13',
  'Visser, M. (1995). Lorentzian Wormholes, Springer',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'paradoja-abuelo', title: 'La Paradoja del Abuelo', color: '#FFA500',
    btnImage: '/assets/bttf/infographic_paradojas/btn_abuelo.png',
    image: '/assets/bttf/infographic_paradojas/hero_abuelo.png',
    content: [
      '¿Qué es una paradoja? Es como un acertijo que no tiene respuesta. Piensa en esta frase: «Esta oración es falsa». Si es falsa, entonces dice la verdad, pero si dice la verdad... ¡entonces es falsa! Tu cerebro entra en un bucle infinito. Las paradojas temporales funcionan exactamente así, pero con viajes en el tiempo.',
      'La paradoja del abuelo es la más famosa: imagina que viajas al pasado y evitas que tu abuelo conozca a tu abuela. Si nunca se conocen, tus padres nunca nacen, y tú tampoco. Pero si tú nunca naces... ¡nunca puedes viajar al pasado para impedirlo! Es un círculo imposible que se repite para siempre.',
      'Detrás de esta paradoja hay física real. La Teoría de la Relatividad de Einstein (1905 y 1915) demostró que viajar al FUTURO es posible — ¡y ya está comprobado con relojes atómicos! Pero viajar al pasado crea problemas lógicos. Las ecuaciones de Einstein no lo prohíben explícitamente, lo cual preocupó al propio Einstein.',
      'En «Volver al Futuro», esta paradoja se muestra de forma brillante: cuando Marty accidentalmente impide que sus padres se conozcan en 1955, su mano empieza a desvanecerse y la foto familiar se borra poco a poco. Es una representación visual perfecta de cómo cambiar el pasado te destruiría a ti mismo.',
      'Los físicos se toman esto muy en serio. Kurt Gödel, el mejor amigo de Einstein en Princeton, encontró en 1949 soluciones a las ecuaciones de la Relatividad General que permiten «curvas temporales cerradas» — caminos matemáticos que te llevan al pasado. Le regaló esta solución a Einstein por su cumpleaños. Einstein quedó perturbado porque su propia teoría parecía permitir lo imposible.',
    ],
    fact: 'Kurt Gödel le regaló a Einstein un universo en rotación por su cumpleaños en 1949, demostrando que los viajes al pasado eran matemáticamente posibles según la propia teoría de Einstein. A Einstein le inquietó profundamente.',
  },
  {
    id: 'muchos-mundos', title: 'Universos Paralelos', color: '#00CCFF',
    btnImage: '/assets/bttf/infographic_paradojas/btn_mundos.png',
    image: '/assets/bttf/infographic_paradojas/hero_mundos.png',
    content: [
      'En 1957, un joven físico llamado Hugh Everett propuso una idea revolucionaria en su tesis doctoral: cada vez que ocurre un evento cuántico — como un electrón eligiendo ir a la izquierda o a la derecha — el universo se divide en dos. En uno va a la izquierda, en otro a la derecha. Y ambos universos son igual de reales.',
      '¡Esta idea resuelve la paradoja del abuelo! Si viajas al pasado y cambias algo, no estás cambiando TU pasado sino creando una línea temporal diferente. Tu universo original sigue intacto. Es como un río que se divide en dos ramas: ambas siguen fluyendo, solo que en direcciones distintas.',
      'En «Volver al Futuro Parte II», Doc Brown usa una pizarra para explicar exactamente esto. Dibuja cómo la línea temporal se bifurca cuando Biff roba el almanaque deportivo y crea un 1985 alternativo. ¡Los guionistas usaron física cuántica real como inspiración para la trama!',
      'La física detrás se llama «decoherencia cuántica». ¿Recuerdas al gato de Schrödinger? Un gato en una caja está teóricamente vivo Y muerto al mismo tiempo. En la interpretación de Muchos Mundos, ambas opciones ocurren: en un universo el gato vive, en otro no. La «superposición cuántica» es real a nivel subatómico — se ha demostrado en laboratorios miles de veces.',
      '¿Cuántos científicos creen en esto? En una encuesta de 2013 en una conferencia de fundamentos cuánticos, aproximadamente el 18% de los físicos favorecieron la interpretación de Muchos Mundos. Puede parecer poco, pero es la segunda más popular después de la interpretación de Copenhague. Físicos famosos como Sean Carroll y David Deutsch la defienden activamente.',
    ],
    fact: 'Hugh Everett propuso los Muchos Mundos en su tesis doctoral de 1957. Su director John Wheeler la apoyó, pero Niels Bohr la rechazó. Everett abandonó la física y se convirtió en contratista militar. Murió a los 51 años sin saber que su teoría se volvería respetada.',
  },
  {
    id: 'bootstrap', title: 'El Bucle Bootstrap', color: '#E040FB',
    btnImage: '/assets/bttf/infographic_paradojas/btn_bootstrap.png',
    image: '/assets/bttf/infographic_paradojas/hero_bootstrap.png',
    content: [
      '¿Qué pasa cuando algo existe sin haber sido creado jamás? Eso es una paradoja bootstrap. Imagina que encuentras un libro con la fórmula de una máquina del tiempo, la construyes, viajas al pasado y dejas el libro para que tu yo más joven lo encuentre. ¿Quién escribió la fórmula? ¡Nadie! La información existe en un bucle sin principio ni final.',
      'En «Volver al Futuro», esto sucede con «Johnny B. Goode». Marty toca la canción en el baile de 1955. El primo de Chuck Berry llama a Chuck y le dice: «¡Escucha este sonido nuevo!» Así que Chuck Berry aprende la canción... de Marty, quien la aprendió... de Chuck Berry. ¿Quién la compuso realmente? ¡Es un bucle perfecto sin origen!',
      'Otro ejemplo clásico: imagina que viajas al pasado y le das a Beethoven las partituras de su Quinta Sinfonía antes de que la componga. Beethoven la copia y se hace famoso. Tú aprendiste la sinfonía de Beethoven, pero Beethoven la aprendió de ti. La música existe, se puede tocar, se puede escuchar... pero nunca fue compuesta por nadie.',
      'Desde el punto de vista científico, las paradojas bootstrap son peculiares. No violan la termodinámica — la entropía sigue aumentando normalmente. Pero sí violan la causalidad: todo efecto debería tener una causa, y aquí la causa y el efecto son la misma cosa. Algunos físicos argumentan que esto no es realmente un problema si las curvas temporales cerradas existen.',
      'El escritor Robert Heinlein llevó esto al extremo en su relato «All You Zombies» (1959). En esta historia, una persona viaja en el tiempo y resulta ser su propia madre, su propio padre y su propio/a hijo/a. Es la paradoja bootstrap definitiva: un ser humano completo que se crea a sí mismo. ¡El bucle más cerrado posible!',
    ],
    fact: 'El nombre «paradoja bootstrap» viene del relato de Robert Heinlein «By His Bootstraps» (1941). La frase «levantarte tirando de tus propias botas» originalmente describía algo imposible — ¡no puedes levantarte tirando de tus propios zapatos!',
  },
  {
    id: 'gemelos', title: 'La Paradoja de los Gemelos', color: '#FF6B00',
    btnImage: '/assets/bttf/infographic_paradojas/btn_gemelos.png',
    image: '/assets/bttf/infographic_paradojas/hero_gemelos.png',
    content: [
      '¡Esto NO es realmente una paradoja — es física REAL y comprobada! La Teoría de la Relatividad Especial de Einstein (1905) nos dice algo asombroso: cuanto más rápido te mueves, más lento pasa el tiempo para ti. No es una ilusión ni un truco: el tiempo literalmente se estira.',
      'Explicación sencilla: si tu gemelo se sube a una nave que viaja al 90% de la velocidad de la luz durante 5 años (según su reloj), cuando regrese a la Tierra habrán pasado 11.5 años para ti. Tú tienes 11.5 años más, pero tu gemelo solo 5. ¡No es ciencia ficción, son las ecuaciones de Einstein!',
      'Esto fue COMPROBADO experimentalmente. En 1971, los físicos Hafele y Keating pusieron relojes atómicos en aviones comerciales que dieron la vuelta al mundo. Al aterrizar, los relojes del vuelo hacia el este habían perdido unos 59 nanosegundos, muy cerca de lo que las ecuaciones de Einstein predecían. ¡Es uno de los experimentos más elegantes de la historia!',
      'Lo usamos TODOS LOS DÍAS. Los satélites GPS orbitan la Tierra a gran velocidad y en gravedad más débil. Sus relojes se desfasan 38 microsegundos por día comparados con los relojes terrestres. Sin la corrección de Einstein, el GPS acumularía un error de ¡10 kilómetros diarios! Tu teléfono usa la relatividad cada vez que abres Google Maps.',
      'El astronauta Scott Kelly pasó 340 días en la Estación Espacial Internacional (2015-2016). La ISS orbita a 7.66 km/s. Cuando regresó, era 5 milisegundos más joven que su hermano gemelo idéntico Mark Kelly. Cinco milisegundos de viaje real al futuro. Scott Kelly es, literalmente, un viajero del tiempo.',
    ],
    fact: 'Scott Kelly es 5 milisegundos más joven que su gemelo idéntico Mark Kelly (ahora senador de EE.UU. por Arizona) porque pasó 520 días totales en el espacio. La ISS orbita a 7.66 km/s. Cada astronauta que regresa de la ISS ha viajado un poquito al futuro.',
  },
  {
    id: 'novikov', title: 'El Principio de Autoconsistencia', color: '#7C4DFF',
    btnImage: '/assets/bttf/infographic_paradojas/btn_novikov.png',
    image: '/assets/bttf/infographic_paradojas/hero_novikov.png',
    content: [
      'El físico ruso Igor Novikov propuso en los años 1980 una idea fascinante: ¿y si el universo simplemente NO PERMITE las paradojas? Su «Principio de Autoconsistencia» dice que cualquier evento que ocurra mediante viaje en el tiempo DEBE ser consistente con la historia. No puedes cambiar el pasado porque el universo no te deja.',
      'Imagínalo así: intentas viajar al pasado para impedir la primera cita de tus padres. Pero tu auto se descompone camino allá. Lo arreglas e intentas de nuevo, pero te pierdes. Lo intentas una tercera vez y te resbalas. SIEMPRE algo sale mal. El universo conspira para que la historia se mantenga intacta, como si tuviera un guardián invisible.',
      'Kip Thorne — quien ganó el Premio Nobel de Física en 2017 por detectar ondas gravitacionales — trabajó con Novikov en la fundamentación matemática de este principio. Thorne también fue el consultor científico de la película «Interstellar» (2014), donde estas ideas se exploran visualmente.',
      'Thorne diseñó un experimento mental famoso: una bola de billar entra en un agujero de gusano, sale en el pasado y choca con su versión anterior. ¿Se impide a sí misma entrar? Thorne demostró matemáticamente que la bola SIEMPRE rebota de una manera autoconsistente — nunca se impide su propia entrada, pero sí se desvía ligeramente.',
      'En «Volver al Futuro», esto es esencialmente lo que ocurre. A pesar de todos los cambios que Marty causa, la historia encuentra formas de reajustarse. Sus padres SÍ se enamoran al final, aunque de manera diferente. La línea temporal se dobla pero no se rompe, exactamente como predice Novikov.',
    ],
    fact: 'Kip Thorne ganó el Nobel de Física 2017 por detectar ondas gravitacionales. También fue consultor científico de «Interstellar» (2014) y sus ecuaciones del agujero negro Gargantúa fueron tan precisas que generaron artículos científicos reales. Literalmente convirtió una película en investigación.',
  },
  {
    id: 'delorean', title: 'Ciencia Detrás del DeLorean', color: '#FFA500',
    btnImage: '/assets/bttf/infographic_paradojas/btn_delorean.png',
    image: '/assets/bttf/infographic_paradojas/hero_delorean.png',
    content: [
      '¿Por qué 88 millas por hora? Bob Gale, el guionista, confesó que eligió ese número porque se veía bien en el velocímetro. Pero hay física real sobre velocidad y tiempo: según Einstein, cuanto más rápido te mueves, más se distorsiona el tiempo. A 88 mph no pasa nada especial, pero ¡a velocidades cercanas a la luz sí!',
      'El condensador de fluzo es ficción, pero el concepto de necesitar energía enorme es totalmente real. Para deformar el espacio-tiempo necesitarías «materia exótica» con energía negativa. Esto no es ciencia ficción barata: los físicos como Miguel Alcubierre han propuesto motores warp que necesitan exactamente este tipo de energía para funcionar.',
      '1.21 gigawatts: ¡es una unidad real de potencia! Un rayo descarga aproximadamente 1 terawatt (1,000 GW), pero solo durante microsegundos. Mantener 1.21 GW de forma sostenida equivale a la producción de un reactor nuclear completo. Doc Brown necesitaba la energía de una central nuclear o un rayo para alimentar el viaje temporal.',
      'Las estelas de fuego del DeLorean a 88 mph son icónicas pero no son física real. En la realidad, un objeto acercándose a la velocidad de la luz emitiría radiación de Cherenkov — un resplandor AZUL, no fuego naranja. Esta radiación ocurre cuando partículas viajan más rápido que la luz en un medio como el agua. ¡Se puede ver en reactores nucleares!',
      'El DeLorean DMC-12 real: solo se fabricaron 9,000 unidades entre 1981 y 1983. John DeLorean fue arrestado por tráfico de drogas intentando salvar su empresa, pero fue absuelto. El auto tenía puertas de ala de gaviota y carrocería de acero inoxidable. Su aspecto futurista fue la razón por la que Zemeckis y Gale lo eligieron para la película.',
    ],
    fact: 'El guion original tenía la máquina del tiempo como un refrigerador, no un auto. Steven Spielberg (productor ejecutivo) temía que los niños se encerraran en refrigeradores imitando la película, así que lo cambiaron a un auto. El DeLorean fue elegido porque su carrocería de acero y puertas de gaviota ya parecían una nave espacial.',
  },
  {
    id: 'cronologia', title: 'La Protección Cronológica', color: '#00E676',
    btnImage: '/assets/bttf/infographic_paradojas/btn_cronologia.png',
    image: '/assets/bttf/infographic_paradojas/hero_cronologia.png',
    content: [
      'En 1992, Stephen Hawking propuso la «Conjetura de Protección Cronológica»: las leyes de la física IMPIDEN viajar al pasado. No es que sea difícil o que necesites tecnología avanzada — según Hawking, el universo tiene reglas fundamentales que lo hacen físicamente imposible. Es la respuesta más radical a las paradojas temporales.',
      'Hawking hizo un experimento brillante en 2009: organizó una fiesta para viajeros del tiempo en la Universidad de Cambridge. Preparó champán, globos y un cartel de bienvenida. Pero envió las invitaciones DESPUÉS de la fiesta. Si el viaje al pasado fuera posible, alguien del futuro habría leído la invitación y asistido. Nadie apareció.',
      '¿Por qué la física podría impedirlo? Cuando intentas construir una máquina del tiempo usando un agujero de gusano, los efectos cuánticos cerca de la máquina crearían una acumulación infinita de energía. Esta energía destruiría la máquina antes de que pudiera funcionar. Es como si el universo dijera: «No, esto no va a pasar».',
      'Existe una idea relacionada llamada «censura cósmica»: el universo tiene protecciones incorporadas contra situaciones extremas. Así como los horizontes de eventos esconden las singularidades de los agujeros negros (para que no veamos física «rota»), la protección cronológica escondería o destruiría cualquier máquina del tiempo.',
      'Pero el propio Hawking admitió algo importante: no podemos DEMOSTRAR que el viaje al pasado es imposible hasta que tengamos una teoría completa de gravedad cuántica. La Relatividad General y la Mecánica Cuántica no están unificadas todavía. Mientras esa unificación no ocurra, la puerta al viaje temporal queda matemáticamente abierta.',
    ],
    fact: 'La fiesta de Stephen Hawking para viajeros del tiempo fue el 28 de junio de 2009 en Cambridge. Las invitaciones se enviaron DESPUÉS, con coordenadas exactas: 52°12\'21"N, 0°7\'4.7"E. Nadie apareció. Hawking mantuvo el champán listo por si acaso y dijo: «Tengo evidencia experimental de que el viaje en el tiempo no es posible.»',
  },
  {
    id: 'futuro-ciencia', title: 'El Futuro de la Ciencia del Tiempo', color: '#FFD740',
    btnImage: '/assets/bttf/infographic_paradojas/btn_futuro.png',
    image: '/assets/bttf/infographic_paradojas/hero_futuro.png',
    content: [
      'Lo que SABEMOS que funciona: viajar al futuro es real y está comprobado. El GPS corrige efectos relativistas cada día. Los astronautas de la ISS viajan al futuro milisegundos cada misión. En aceleradores de partículas como el CERN, las partículas subatómicas viajan al futuro constantemente — muones que deberían desintegrarse en microsegundos sobreviven mucho más porque el tiempo se ralentiza para ellos.',
      'Lo que NO sabemos: ¿Existen las curvas temporales cerradas de Gödel en el universo real? ¿Se pueden estabilizar los agujeros de gusano con materia exótica? ¿Es correcta la conjetura de protección cronológica de Hawking? Estas son preguntas abiertas que los mejores físicos del mundo están investigando ahora mismo.',
      'Las fronteras actuales de la investigación son fascinantes. La computación cuántica podría simular escenarios de viaje temporal. La conjetura ER=EPR (propuesta por Maldacena y Susskind en 2013) sugiere que los agujeros de gusano y el entrelazamiento cuántico son LA MISMA COSA. Si esto es correcto, cada par de partículas entrelazadas sería un micro-agujero de gusano.',
      'La ciencia ficción impulsa la ciencia real. «Volver al Futuro» inspiró a generaciones de físicos. «Interstellar» produjo artículos científicos reales sobre agujeros negros. «Tenet» de Nolan exploró la inversión de entropía. Kip Thorne, Premio Nobel, confirmó que las películas inspiran investigación genuina. La imaginación de hoy es la ciencia de mañana.',
      'La lección más importante: las paradojas no son solo acertijos divertidos — son herramientas científicas. Cada paradoja señala un hueco en nuestro conocimiento. La paradoja del abuelo nos muestra que no entendemos la causalidad completamente. La paradoja de los gemelos nos enseñó que el tiempo es relativo. Resolver paradojas es como resolver pistas: cada una nos acerca más a la verdad del universo.',
    ],
    fact: 'En 2014, científicos de la Universidad de Queensland simularon un fotón viajando a través de curvas temporales cerradas e interactuando con su versión más joven. La simulación mostró que el fotón SIEMPRE encontraba un camino autoconsistente, apoyando los modelos teóricos de viaje temporal autoconsistente. Fue la primera simulación cuántica de este tipo, publicada en Nature Communications.',
  },
];

/* ══════════════════════════════════
   TEMPORAL FIELD — animated canvas
   ══════════════════════════════════ */
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

/* ═══════════════════════
   SVG HEADER  — vortex
   ═══════════════════════ */
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

/* ═══════════════════════════
   EXPANDABLE PARAGRAPH
   ═══════════════════════════ */
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

/* ═══════════════════════
   NODE BUTTON
   ═══════════════════════ */
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
        position: 'absolute', inset: 0, borderRadius: 6, zIndex: 2, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.15) 2px, rgba(0,0,0,.15) 4px)',
        mixBlendMode: 'overlay',
      }} />
      {/* Chrome corner accents */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8, borderTop: `2px solid ${node.color}`, borderLeft: `2px solid ${node.color}`, borderRadius: '6px 0 0 0', zIndex: 3 }} />
      <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderTop: `2px solid ${node.color}`, borderRight: `2px solid ${node.color}`, borderRadius: '0 6px 0 0', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 8, borderBottom: `2px solid ${node.color}`, borderLeft: `2px solid ${node.color}`, borderRadius: '0 0 0 6px', zIndex: 3 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderBottom: `2px solid ${node.color}`, borderRight: `2px solid ${node.color}`, borderRadius: '0 0 6px 0', zIndex: 3 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={node.btnImage} alt={node.title}
        style={{ width: '100%', height: '100%', borderRadius: 5, objectFit: 'cover', filter: isActive ? 'saturate(1.3) brightness(1.1)' : 'saturate(0.85) brightness(0.9)' }} />
      {isExplored && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{
            position: 'absolute', top: -6, right: -6, width: 22, height: 22, borderRadius: 4,
            background: 'linear-gradient(135deg, #00E676, #00C853)', border: '2px solid #0a0a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4,
            boxShadow: '0 0 8px #00E67688',
          }}>
          <svg viewBox="0 0 16 16" width={12} height={12}>
            <path d="M3 8l3 3 7-7" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
      <div style={{
        position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap',
        fontSize: 8, fontWeight: 800, color: node.color, letterSpacing: 1.5, textTransform: 'uppercase',
        textShadow: `0 0 8px ${node.color}88, 0 1px 3px rgba(0,0,0,.9)`,
        fontFamily: "'Exo 2', 'Courier New', monospace",
      }}>
        {node.title.length > 14 ? node.title.slice(0, 13) + '…' : node.title}
      </div>
    </motion.button>
  );
}

/* ═══════════════════════
   CONTENT PANEL
   ═══════════════════════ */
function ContentPanel({ node, onClose }) {
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

      {/* ─── HERO: two-column (estándar Abu Simbel) ─── */}
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
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

      {/* ─── MAGAZINE BODY — M9-standard 2-column grid ─── */}
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
                  position: 'absolute', top: -8, left: 12,
                  background: node.color, color: '#0a0a1a',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: 8, letterSpacing: 1,
                }}>
                  {i === 0 ? '◆' : i === 1 ? '◇' : '★'}
                </div>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: '#ccc' }}>{p}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── FACT ─── */}
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

/* ═══════════════════════
   PROGRESS BAR
   ═══════════════════════ */
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

/* ══════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════ */
export default function InteractiveInfographic_BttfM3() {
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

      {/* ─── CONTENT ─── */}
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
          {activeNode && <ContentPanel key={activeNode.id} node={activeNode} onClose={() => setActiveId(null)} />}
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
                ⏰ ¡Has dominado las Paradojas del Tiempo!
              </p>
              <p style={{ fontSize: 14, color: '#ccc', margin: 0 }}>
                Ahora puedes tomar el quiz para ganar tu insignia de Viajero Temporal
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
      </div>
    </div>
  );
}
