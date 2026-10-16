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
    "id": "paradoja-abuelo",
    "title": "La Paradoja del Abuelo",
    "color": "#FFA500",
    "btnImage": "/assets/bttf/infographic_paradojas/btn_abuelo.webp",
    "image": "/assets/bttf/infographic_paradojas/hero_abuelo.webp",
    "content": [
      "En la narrativa de Regreso al Futuro, alterar un detalle en 1955 desencadena un efecto dominó que casi borra de la existencia a Marty McFly mientras toca la guitarra en el baile escolar. El cine utiliza una desaparición gradual y poética para generar tensión dramática en el espectador. Sin embargo, para la física teórica y la lógica formal, las paradojas temporales no conceden plazos de gracia: plantean una contradicción causal absoluta e instantánea en la que una acción en el pasado elimina la condición necesaria de su propia existencia futura.",
      "El dilema clásico del abuelo fue popularizado por la literatura de ciencia ficción en la década de 1930 y refinado por filósofos de la ciencia como René Barjavel. La premisa desafía el principio fundamental de causalidad: si un individuo viaja al pasado y evita que sus abuelos se conozcan, nunca nacerá. Pero si nunca nace, no existe nadie que viaje en el tiempo para impedir dicho encuentro. Esta retroalimentación destructiva convierte el continuo temporal en una ecuación irresoluble sin solución real.",
      "Desde la teoría de la relatividad general, el problema adquiere rigor matemático al estudiar las llamadas curvas temporales cerradas. Estas curvas son trayectorias espaciotemporales que regresan a su propio punto de partida cronológico, permitidas formalmente por las ecuaciones de campo de Albert Einstein en universos con geometrías rotatorias o agujeros de gusano. Si una partícula material sigue una de estas trayectorias, su interacción consigo misma en el pasado no puede violar la consistencia matemática global.",
      "Para los físicos modernos, la paradoja revela que la concepción clásica del libre albedrío humano colisiona frontalmente con la topología del espaciotiempo tetradimensional. Si el pasado es una región física ya existente en un universo de bloque cósmico, no se puede «reescribir» como un documento digital. Cualquier intento de intervenir en el pasado ya formaba parte intrínseca de los sucesos acaecidos, haciendo que la historia sea fija, coherente y unívoca para cualquier observador.",
      "En el laboratorio de la física de partículas, los experimentos con fotones entrelazados cuánticos ayudan a estudiar modelos análogos de bucles temporales cerrados. Estas investigaciones sugieren que a escala subatómica la información cuántica no puede destruirse mediante interferencias paradójicas: las probabilidades cuánticas se reorganizan espontáneamente de forma que los estados incompatibles con la conservación de la energía se cancelan por completo mediante interferencia destructiva."
    ],
    "bannerImage": "/assets/bttf/infographic_m3/banner_paradoja-abuelo.webp",
    "bannerCaption": "El análisis profundo de la paradoja del abuelo y sus implicaciones lógicas",
    "fact": "En 1949, el insigne lógico austríaco Kurt Gödel demostró matemáticamente ante su colega Albert Einstein que en un universo rotatorio ideal las ecuaciones de la relatividad general permiten trayectorias espaciales cerradas hacia el pasado sin necesidad de materia exótica, obligando a replantear la definición filosófica del tiempo cósmico universal.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Durante la preproducción de 1984, los guionistas Bob Gale y Robert Zemeckis debatieron intensamente cómo resolver la paradoja en pantalla sin aburrir a los adolescentes con física teórica. Su solución visual maestra fue la fotografía Polaroid donde los hermanos de Marty se desvanecen de arriba hacia abajo, una metáfora visual intuitiva que se convirtió en un hito del lenguaje cinematográfico de los años ochenta."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El físico teórico Seth Lloyd dirigió en el Instituto Tecnológico de Massachusetts (MIT) un experimento innovador en 2011 simulando curvas temporales cerradas mediante computación cuántica post-seleccionada. El estudio confirmó matemáticamente que las partículas cuánticas seleccionadas filtran automáticamente cualquier intento de alterar estados pasados, eliminando la paradoja sin romper las leyes causales."
      }
    ]
  },
  {
    "id": "muchos-mundos",
    "title": "Universos Paralelos",
    "color": "#00CCFF",
    "btnImage": "/assets/bttf/infographic_paradojas/btn_mundos.webp",
    "image": "/assets/bttf/infographic_paradojas/hero_mundos.webp",
    "content": [
      "Cuando el Doc Brown dibuja en la pizarra escolar una segunda línea temporal ramificada para ilustrar el desastre provocado por Biff Tannen, la película adopta una variante simplificada del multiverso cuántico. En el celuloide, viajar al pasado y alterar un hecho crea una realidad paralela que solapa y anula la anterior. En la física cuántica contemporánea, sin embargo, el postulado de los muchos mundos no destruye ninguna realidad previa: sostiene que todas las historias físicamente concebibles se despliegan simultáneamente en ramas coexistentes.",
      "La hipótesis fue formulada en 1957 por el físico Hugh Everett III como respuesta al enigmático problema de la medida en mecánica cuántica. En la interpretación ortodoxa de Copenhague, una partícula como un electrón se encuentra en múltiples estados posibles hasta que un observador mide su posición, momento en el cual la función de onda colapsa al azar. Everett propuso que el colapso jamás ocurre: en su lugar, el universo se bifurca en tantas copias tangibles como resultados posibles existan.",
      "Aplicada a las paradojas temporales, la hipótesis de Everett ofrece una elegante vía de escape lógica. Si un viajero regresa al pasado y altera las circunstancias históricas, no interfiere con su propia línea temporal de procedencia, sino que inaugura una nueva rama cuántica independiente. En esa nueva realidad alternativa los acontecimientos transcurren según las nuevas causas, mientras que en el universo de partida el viajero simplemente desapareció sin alterar la memoria de los suyos.",
      "Esta formulación matemática descansa sobre el concepto de decoherencia cuántica, estudiado en profundidad por físicos como Wojciech Zurek. La decoherencia describe cómo las interacciones incesantes entre un sistema cuántico microscópico y su entorno térmico destruyen la interferencia entre ramas paralelas en fracciones ínfimas de segundo, impidiendo que los observadores macroscópicos perciban la coexistencia simultánea de los universos paralelos vecinos.",
      "Pese a su asombrosa belleza matemática, la teoría de los muchos mundos enfrenta debates epistemológicos cruciales entre la comunidad científica internacional. Dado que las diversas ramas cuánticas no pueden comunicarse entre sí por medios electromagnéticos convencionales una vez desacopladas, muchos físicos consideran que la teoría es sumamente difícil de verificar empíricamente, aunque ofrece la formulación más limpia y determinista de las ecuaciones de Schrödinger conocidas."
    ],
    "bannerImage": "/assets/bttf/infographic_m3/banner_muchos-mundos.webp",
    "bannerCaption": "Universos paralelos y ramas de realidad según la interpretación de muchos mundos",
    "fact": "En el marco de la cosmología de inflación eterna desarrollada por Alan Guth, se calcula que el número de universos de bolsillo aislados con diferentes condiciones físicas iniciales podría superar el número 10 elevado a la potencia de 10 elevado a 10.000.000, una escala de multiplicidad cósmica donde cualquier configuración molecular imaginable se repite infinitas veces.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La recreación del Hill Valley alternativo de 1985 fue uno de los rodajes más oscuros y exigentes de Regreso al Futuro Parte II. El plató principal de los estudios Universal fue transformado por completo con grafitis, humo, pandillas callejeras y el gigantesco rascacielos-casino de Pleasure Paradise de Biff, inspirándose libremente en la atmósfera opresiva del clásico cinematográfico ¡Qué bello es vivir!."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El célebre físico David Deutsch, pionero británico de la computación cuántica en la Universidad de Oxford, publicó en 1991 un artículo seminal en Physical Review D demostrando formalmente que los viajes temporales a través de curvas temporales cerradas en un multiverso cuántico de Everett son completamente consistentes y carecen de cualquier contradicción paradójica causal."
      }
    ]
  },
  {
    "id": "bootstrap",
    "title": "El Bucle Bootstrap",
    "color": "#E040FB",
    "btnImage": "/assets/bttf/infographic_paradojas/btn_bootstrap.webp",
    "image": "/assets/bttf/infographic_paradojas/hero_bootstrap.webp",
    "content": [
      "En la electrizante escena final del baile escolar, Marty McFly sube al escenario y toca con virtuosismo el tema «Johnny B. Goode» ante una multitud atónita de 1955, mientras Marvin Berry telefonea a su primo Chuck Berry para que escuche ese sonido revolucionario. Este memorable momento cinematográfico encarna la llamada paradoja ontológica o bucle bootstrap: una situación circular donde un objeto, idea o melodía viaja al pasado y se convierte en la fuente inspiradora de sí misma, sin poseer un punto de creación original.",
      "El término bootstrap proviene de la expresión inglesa «pull oneself up by one's bootstraps», aludiendo a la imposibilidad mecánica de levantarse a uno mismo en el aire tirando de los cordones de las propias botas. En el terreno de la física teórica y la filosofía del tiempo, el dilema no gira en torno a la contradicción lógica de una acción como matar al abuelo, sino a la génesis de la información: ¿quién compuso originalmente la canción si Chuck la copió de Marty y Marty la aprendió del disco de Chuck?",
      "Desde la teoría de la información de Claude Shannon y la termodinámica estadística, los bucles ontológicos plantean un quebradero de cabeza extraordinario. La información no es una abstracción inmaterial: requiere soporte físico y energía termodinámica para codificarse en bits o vibraciones sonoras. Si un fragmento de información circula indefinidamente en un circuito causal cerrado sin un acto de creación disipativa, el sistema viola el principio de causalidad informacional.",
      "Los físicos teóricos analizan este fenómeno mediante partículas virtuales que emergen espontáneamente del vacío cuántico en horizontes de sucesos. Sin embargo, a escala macroscópica, un manuscrito o una partitura física atrapada en un bucle cerrado estaría sometida a la degradación entrópica ineludible: con cada ciclo temporal, el papel envejecería y la tinta se degradaría paulatinamente por oxidación, contradiciendo la noción de un ciclo inmutable y perfectamente cerrado.",
      "Pese a estas objeciones físicas clásicas, en ciertas soluciones matemáticas de la relatividad general no existe ninguna ley que prohíba de forma explícita las trayectorias causales circulares consistentes para campos cuánticos escalares. Si el bucle cerrado no genera inconsistencias globales ni produce paradojas de no-existencia, la matemática abstracta del espaciotiempo lo acepta como una solución matemáticamente permitida, aunque físicamente desconcertante."
    ],
    "bannerImage": "/assets/bttf/infographic_m3/banner_bootstrap.webp",
    "bannerCaption": "El bucle bootstrap: paradoja de información sin origen causal",
    "fact": "La guitarra Gibson ES-345 que Marty McFly utiliza en el baile escolar de 1955 presenta un error cronológico fascinante: ese modelo de instrumento eléctrico con selector estéreo Varitone no fue fabricado ni comercializado por la factoría Gibson hasta el año 1958, convirtiendo al propio instrumento material en un objeto adelantado a su tiempo histórico real.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Michael J. Fox no cantó ni tocó los acordes definitivos en la pista sonora original de la película: la voz perteneció al cantante Mark Campbell y los solos de guitarra fueron ejecutados con maestría por el guitarrista Tim May. Sin embargo, Fox ensayó intensamente durante semanas con un profesor particular para aprender a colocar los dedos en los trastes exactos de la Gibson ES-345 roja de 1958."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La paradoja bootstrap fue descrita formalmente en la literatura de ciencia ficción por Robert A. Heinlein en su cuento de 1941 «By His Bootstraps». En física moderna de agujeros negros, la conservación de la información cuántica estudiada por Leonard Susskind y Gerard 't Hooft reafirma que la información cósmica jamás puede surgir de la nada ni destruirse sin huella observable."
      }
    ]
  },
  {
    "id": "gemelos",
    "title": "La Paradoja de los Gemelos",
    "color": "#FF6B00",
    "btnImage": "/assets/bttf/infographic_paradojas/btn_gemelos.webp",
    "image": "/assets/bttf/infographic_paradojas/hero_gemelos.webp",
    "content": [
      "A diferencia de las máquinas del tiempo que requieren saltos retroactivos mágicos en el guion de cine, la física relativista real posee un método científicamente demostrado para viajar hacia el futuro: la aceleración cinemática. En Regreso al Futuro, el Doc sincroniza dos cronómetros de pulsera y envía a su perro Einstein un minuto al futuro a bordo del DeLorean. Esta escena traslada al lenguaje cinematográfico la célebre paradoja de los gemelos, propuesta por Albert Einstein y Paul Langevin para ilustrar la dilatación temporal.",
      "El experimento mental original plantea a dos hermanos gemelos idénticos en la Tierra. Uno de ellos aborda una nave espacial que viaja a una fracción considerable de la velocidad de la luz hacia una estrella vecina, mientras el otro permanece en reposo en el hogar terrestre. Al regresar de su expedición interestelar, el astronauta descubre con asombro que mientras para él transcurrieron apenas un par de años biológicos, su hermano gemelo ha envejecido décadas y luce como un anciano respetable.",
      "La aparente paradoja radica en la cuestión de la simetría: desde la perspectiva relativista del gemelo viajero, ¿no es la Tierra la que se aleja a gran velocidad, y por tanto el hermano terrestre debería ser el más joven? La resolución de este aparente conflicto reside en que ambos marcos de referencia no son equivalentes. El gemelo terrestre permanece en un sistema de referencia inercial constante, mientras que el gemelo viajero experimenta aceleraciones brutales al despegar, frenar y dar la vuelta a su nave espacial.",
      "La aceleración rompe la simetría inercial y curva la línea de universo del viajero en el espaciotiempo de Minkowski. El cálculo riguroso del tiempo propio a lo largo de esa trayectoria demuestra que el intervalo temporal transcurrido para el gemelo acelerado es estrictamente menor que para el gemelo inercial, un resultado que ha sido verificado con precisión nanométrica mediante aceleradores de partículas de alta energía en centros como el CERN de Ginebra.",
      "En la vida cotidiana, este fenómeno relativista es imperceptible porque los seres humanos nos movemos a velocidades ridículas en comparación con la velocidad de la luz. Sin embargo, para los satélites de telecomunicaciones, sondas espaciales interplanetarias y partículas subatómicas de alta energía cósmica, la dilatación cinemática del tiempo es un efecto cotidiano fundamental que la ingeniería moderna debe calcular con exactitud milimétrica para evitar fallos de posicionamiento global."
    ],
    "bannerImage": "/assets/bttf/infographic_m3/banner_gemelos.webp",
    "bannerCaption": "La paradoja de los gemelos: dilatación del tiempo en viaje relativista",
    "fact": "Los astronautas gemelos de la NASA Scott y Mark Kelly participaron en un experimento biomédico en 2015: tras pasar Scott 340 días continuos en la Estación Espacial Internacional a 27.600 km/h, regresó a la Tierra siendo biológicamente 8,6 milisegundos más joven que su hermano gemelo Mark, quien permaneció en tierra firme durante todo el año de la misión.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Los dos cronómetros idénticos de lectura digital utilizados en la primera prueba del DeLorean en el aparcamiento comercial eran modelos comerciales de la marca Seiko acoplados a carcasas metálicas protectoras. El primer salto cronometrado duró exactamente un minuto terrestre, marcando las 01:21 horas con precisión ante la mirada asombrada de Marty y la euforia desbordante del científico."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los muones producidos por el impacto de rayos cósmicos en las capas altas de la atmósfera terrestre poseen una vida media en reposo de solo 2,2 microsegundos. Sin embargo, al viajar a velocidades superiores al 99,9% de la velocidad de la luz, su reloj interno se dilata tanto que logran alcanzar la superficie terrestre antes de desintegrarse, confirmando experimentalmente la dilatación temporal."
      }
    ]
  },
  {
    "id": "novikov",
    "title": "El Principio de Autoconsistencia",
    "color": "#7C4DFF",
    "btnImage": "/assets/bttf/infographic_paradojas/btn_novikov.webp",
    "image": "/assets/bttf/infographic_paradojas/hero_novikov.webp",
    "content": [
      "En la ficción cinematográfica, las reglas del viaje temporal suelen premiar la intervención activa de los héroes: Marty McFly lucha con uñas y dientes para vencer al matón Biff y lograr que sus padres se enamoren en 1955. La trama asume que la historia es plástica y modificable. Sin embargo, a mediados de la década de 1980, el prestigioso astrofísico ruso Igor Dmitriyevich Novikov formuló un principio físico radicalmente opuesto: si las leyes de la física permiten viajar al pasado, la probabilidad de provocar una paradoja es exactamente cero.",
      "El principio de autoconsistencia de Novikov postula que en presencia de curvas temporales cerradas solo pueden manifestarse localmente aquellos acontecimientos que sean globalmente coherentes con la historia preexistente. Cualquier intento deliberado por parte de un viajero temporal de cambiar un acontecimiento ya registrado en el pasado fracasará inevitablemente por causas fortuitas, mecánicas o biológicas, garantizando que el pasado no se reescriba jamás sino que se cumpla de forma inexorable.",
      "Bajo la óptica de Novikov, si una persona viaja al pasado con el propósito explícito de impedir el accidente automovilístico de un ser querido, sus propias acciones en el pasado resultarán ser la causa fortuita o inadvertida que desató dicho accidente. Lejos de cambiar la historia, el viajero descubre con impotencia que siempre formó parte del engranaje causal original, cerrando el bucle histórico sin dejar margen para líneas temporales alternativas ni vacíos lógicos.",
      "Desde la formulación matemática de caminos de Richard Feynman en física cuántica, el principio de Novikov encuentra un respaldo asombroso. Al sumar todas las historias posibles para una partícula cuántica que recorre una curva temporal cerrada, aquellas trayectorias que contienen contradicciones causales poseen amplitudes de probabilidad que se interfieren y anulan destructivamente por completo, sobreviviendo exclusivamente las trayectorias globales matemáticamente consistentes.",
      "Esta visión elimina el caos paradójico sin recurrir a la proliferación de universos paralelos de Everett, pero arroja una profunda sombra filosófica sobre la libertad de acción en el cosmos. Para los seres conscientes, el universo de Novikov se comporta como una obra de teatro cósmica donde el guion completo ya ha sido interpretado y archivado: podemos movernos hacia atrás en el escenario, pero estamos obligados por las leyes de la termodinámica y la gravitación a recitar los mismos parlamentos previstos."
    ],
    "bannerImage": "/assets/bttf/infographic_m3/banner_novikov.webp",
    "bannerCaption": "El principio de autoconsistencia de Novikov: el pasado no puede cambiarse",
    "fact": "El astrofísico Igor Novikov fue uno de los pioneros en estudiar los agujeros negros en la Unión Soviética junto a Yakov Zel'dovich y propuso en 1964 que los agujeros blancos podrían constituir los puntos de salida de túneles espaciotemporales, investigaciones pioneras que sentaron las bases matemáticas de la física gravitatoria de bucles modernos.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Paradójicamente, la primera entrega de Regreso al Futuro coquetea con el principio de Novikov en detalles ingeniosos: cuando Marty choca accidentalmente contra uno de los dos pinos de la granja Peabody en 1955, provoca que el centro comercial de 1985 cambie su nombre original de «Twin Pines Mall» a «Lone Pine Mall», mostrando una causa pasada que ya modeló sutilmente su entorno inicial."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El físico teórico Kip Thorne colaboró estrechamente con Igor Novikov en la década de 1980 explorando soluciones relativistas para billares de Polchinski en agujeros de gusano. Sus cálculos publicados demostraron que para cualquier condición de lanzamiento inicial existen trayectorias autoconsistentes que evitan cualquier choque paradójico entre la bola del futuro y la del pasado."
      }
    ]
  },
  {
    "id": "delorean",
    "title": "Ciencia Detrás del DeLorean",
    "color": "#FFA500",
    "btnImage": "/assets/bttf/infographic_paradojas/btn_delorean.webp",
    "image": "/assets/bttf/infographic_paradojas/hero_delorean.webp",
    "content": [
      "El doctor Emmett Brown justificó la elección de su bólido ante un perplejo Marty con una frase grabada en la memoria colectiva: «Si vas a construir una máquina del tiempo en un coche, ¿por qué no hacerlo con estilo?». Además de su belleza estética, el Doc argumentó que la carrocería de acero inoxidable facilitaba la dispersión adecuada del flujo temporal durante el salto. En el mundo del diseño automotriz de 1981, el DeLorean DMC-12 era una rareza tecnológica cargada de audacia mecánica y fragilidad empresarial.",
      "Diseñado por el legendario estilista italiano Giorgetto Giugiaro y concebido por el ejecutivo John DeLorean, el automóvil presentaba paneles exteriores de acero inoxidable austenítico cepillado de grado 304, montados sobre una estructura interna de plástico reforzado con fibra de vidrio y chasis Lotus. Esta aleación metálica, comúnmente utilizada en la industria química y aeroespacial por su resistencia a la corrosión salina, carecía de pintura protectora, otorgándole una apariencia metálica plateada de vanguardia.",
      "Desde la ingeniería electromagnética real, una carrocería metálica cerrada como la del DeLorean actúa como una excelente jaula de Faraday, descubierta por Michael Faraday en 1836. Cuando el vehículo es alcanzado por el rayo en la torre del reloj en la escena climática de 1955, la enorme corriente eléctrica de la descarga atmosférica viaja por la superficie externa conductora de acero inoxidable y se disipa hacia el suelo, protegiendo a los ocupantes y los circuitos de a bordo de electrocución letal.",
      "Sin embargo, las prestaciones mecánicas del automóvil real distaban mucho del bólido superdeportivo proyectado en pantalla. Con un peso superior a 1.230 kilogramos y equipado con un motor atmosférico PRV V6 de 2,85 litros desarrollado conjuntamente por Peugeot, Renault y Volvo, el vehículo producía apenas unos modestos 130 caballos de fuerza en su versión estadounidense, tardando más de 10,5 segundos en acelerar de cero a 88 millas por hora en condiciones ordinarias.",
      "Para las complejas secuencias de acción cinematográfica, el equipo técnico de efectos mecánicos tuvo que modificar profundamente los motores de varios ejemplares de producción, reemplazando el bloque motriz original por motores de ocho cilindros en V más potentes e instalando sistemas de frenado de disco de alto rendimiento para garantizar maniobras seguras en los aparcamientos y calles de rodaje californianas sin poner en peligro a los especialistas de acción."
    ],
    "bannerImage": "/assets/bttf/infographic_m3/banner_delorean.webp",
    "bannerCaption": "La ciencia real detrás del diseño del DeLorean máquina del tiempo",
    "fact": "La fábrica de DeLorean Motor Cars construyó un total de aproximadamente 9.000 unidades en Dunmurry, Irlanda del Norte, entre enero de 1981 y finales de 1982 antes de declararse en quiebra económica; se calcula que en la actualidad sobreviven más de 6.500 ejemplares cuidados con devoción por coleccionistas automovilísticos de todo el globo terráqueo.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La producción empleó un total de seis automóviles DeLorean DMC-12 auténticos durante el rodaje de la trilogía, además de un modelo de fibra de vidrio a escala real construido expresamente para las tomas aéreas de efectos especiales donde el coche levita en el año 2015 bajo la supervisión de la compañía Industrial Light & Magic de George Lucas."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El acero inoxidable austenítico de grado 304 utilizado en los paneles del DeLorean contiene un 18% de cromo y un 8% de níquel, lo que confiere una estructura cristalina cúbica centrada en las caras (austenita) no magnética a temperatura ambiente, exhibiendo una resistividad eléctrica de 72 microohmios por centímetro idónea para disipar corrientes electrostáticas."
      }
    ]
  },
  {
    "id": "cronologia",
    "title": "La Protección Cronológica",
    "color": "#00E676",
    "btnImage": "/assets/bttf/infographic_paradojas/btn_cronologia.webp",
    "image": "/assets/bttf/infographic_paradojas/hero_cronologia.webp",
    "content": [
      "En la gran pantalla, los personajes desafían el tiempo a su antojo siempre que consigan suficiente plutonio o conecten un gancho a un cable eléctrico en el instante preciso del rayo. Pero en el universo real, ¿por qué no estamos rodeados de turistas temporales venidos del siglo XXX? A comienzos de la década de 1990, el célebre físico británico Stephen Hawking propuso una respuesta científica contundente a este enigma cósmico: la conjetura de protección cronológica de la física relativista.",
      "Hawking formuló su conjetura tras revisar minuciosamente los modelos matemáticos de agujeros de gusano transitables desarrollados por Kip Thorne y Michael Morris. El científico de Cambridge demostró que tan pronto como una configuración geométrica del espaciotiempo comienza a desarrollar una curva temporal cerrada, las fluctuaciones de vacío de la mecánica cuántica se retroalimentan de forma destructiva a través del túnel temporal a la velocidad de la luz, generando una explosión de energía destructiva.",
      "Este fenómeno es idéntico al chirrido ensordecedor que se produce en un concierto de música cuando un cantante acerca accidentalmente el micrófono al altavoz: el sonido emitido entra por el micrófono, se amplifica, sale por el altavoz y vuelve a entrar en una fracción de segundo, multiplicándose exponencialmente hasta saturar los amplificadores de audio. En el tejido espaciotemporal cuántico, esta resonancia desbocada de energía del punto cero destruiría el túnel en el preciso instante de formarse.",
      "La conjetura de protección cronológica estipula de forma poética y rigurosa que «las leyes de la física conspiran conjuntamente para evitar el viaje en el tiempo al pasado por parte de objetos macroscópicos, protegiendo así la historia para el deleite de los historiadores». Aunque todavía carecemos de una teoría unificada definitiva de la gravedad cuántica para demostrarla con certeza absoluta, la conjetura goza de amplio consenso entre los cosmólogos teóricos modernos.",
      "Comprender la protección cronológica obliga a distinguir nítidamente entre dos direcciones temporales asimétricas. El viaje hacia el futuro está plenamente avalado por la teoría de la relatividad y es un hecho cotidiano para partículas y satélites espaciales; en cambio, el viaje hacia el pasado parece chocar contra una barrera termodinámica y cuántica insalvable que preserva la coherencia causal del cosmos e impide que la realidad se disuelva en un caos autorreferencial."
    ],
    "bannerImage": "/assets/bttf/infographic_m3/banner_cronologia.webp",
    "bannerCaption": "La conjetura de protección cronológica de Hawking",
    "fact": "En su artículo científico de 1992 publicado en Physical Review D bajo el título «Chronology Protection Conjecture», Stephen Hawking calculó formalmente que para mantener estable un agujero de gusano sin que las fluctuaciones cuánticas lo hicieran estallar se requeriría una densidad de energía negativa superior a la masa total de galaxias enteras condensadas.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el guion original de Regreso al Futuro, el Doc Brown advierte reiteradamente sobre las consecuencias cósmicas catastróficas de alterar el continuo temporal, advirtiendo que una alteración no resuelta podría provocar una reacción en cadena que destruiría el tejido mismo del espaciotiempo y aniquilaría el universo entero, un temor dramático muy afín a la hipótesis de Hawking."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En teoría cuántica de campos en espacios curvos, el tensor de energía-impulso renormalizado diverge asintóticamente cuando una geodésica se aproxima a un horizonte de Cauchy. Esto significa que la densidad de energía cuántica se vuelve matemáticamente infinita en el umbral de la máquina del tiempo, confirmando el mecanismo destructor postulado por Stephen Hawking."
      }
    ]
  },
  {
    "id": "futuro-ciencia",
    "title": "El Futuro de la Ciencia del Tiempo",
    "color": "#FFD740",
    "btnImage": "/assets/bttf/infographic_paradojas/btn_futuro.webp",
    "image": "/assets/bttf/infographic_paradojas/hero_futuro.webp",
    "content": [
      "Las aventuras de Marty McFly a lo largo de tres siglos cinematográficos distintos demuestran que el ser humano siempre ha sentido una fascinación irrefrenable por descifrar el reloj cósmico. Mientras que el cine explora estas ideas mediante aventuras heroicas con efectos especiales deslumbrantes, los laboratorios científicos del siglo XXI abordan el misterio del tiempo con herramientas experimentales de una precisión inconcebible para las generaciones pasadas de científicos y pensadores ilustrados.",
      "En la vanguardia de la metrología contemporánea, los relojes atómicos de red óptica basados en átomos de estroncio e iterbio han alcanzado una exactitud tan colosal que no perderían un solo segundo aunque hubieran estado funcionando ininterrumpidamente desde el instante inicial del Big Bang, hace 13.800 millones de años. Estos prodigios técnicos son capaces de detectar la dilatación gravitatoria einsteiniana provocada por una diferencia de elevación de apenas dos milímetros en la superficie de un laboratorio.",
      "Paralelamente, los avances teóricos en gravedad cuántica de bucles y teoría de cuerdas sugieren que el tiempo continuo podría no ser una propiedad fundamental del cosmos, sino una propiedad emergente a gran escala, comparable a la temperatura o la presión de un gas. A nivel ultra-microscópico, en la escala de Planck de 10 a la menos 35 metros, el espaciotiempo se comportaría como una espuma cuántica discontinua donde el concepto convencional de orden cronológico antes y después pierde su sentido operativo.",
      "La física de la información cuántica también está reescribiendo la conexión íntima entre la entropía termodinámica y el flujo del tiempo. Investigadores internacionales en termodinámica cuántica estudian cómo el entrelazamiento entre partículas subatómicas actúa como el pegamento invisible que genera la flecha irreversible del tiempo macroscópico, transformando la memoria cuántica en un testigo indeleble de cada interacción física acontecida en el universo.",
      "Aunque construir un vehículo capaz de saltar a voluntad hacia épocas pretéritas seguirá perteneciendo con casi total seguridad a la fantasía cinematográfica más querida, la búsqueda científica de la naturaleza del tiempo nos está revelando los secretos más profundos de la creación cósmica. Cada ecuación resuelta y cada medición atómica de alta precisión nos acerca a descifrar quiénes somos, de dónde venimos y hacia qué horizonte futuro se encamina la especie humana."
    ],
    "bannerImage": "/assets/bttf/infographic_m3/banner_futuro-ciencia.webp",
    "bannerCaption": "El futuro de la ciencia del tiempo: de la teoría a la posibilidad",
    "fact": "La escala de tiempo de Planck, fijada en aproximadamente 5,39 x 10 a la menos 44 segundos, representa el intervalo temporal más diminuto con significado físico en la teoría cuántica actual; ningún instrumento experimental concebible puede medir lapsos inferiores sin que la energía requerida colapse el espacio en un micro-agujero negro gravitacional.",
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El célebre reloj de la torre del tribunal de Hill Valley, detenido a las 10:04 de la noche tras el impacto del rayo del 12 de noviembre de 1955, es el símbolo visual supremo de la trilogía. En la escena final de la tercera entrega, el Doc y Clara regalan a Marty un cuadro conmemorativo con la esfera del reloj restaurada como homenaje a su amistad a través del tiempo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El Instituto Nacional de Estándares y Tecnología (NIST) de Estados Unidos y la Universidad de Colorado operan relojes de red óptica de estroncio con una incertidumbre fraccionaria de frecuencia inferior a 1 parte en 10 elevado a 18. Esta sensibilidad permite usar los relojes como sensores geofísicos ultrasensibles para cartografiar el manto terrestre y buscar ondas gravitatorias."
      }
    ]
  }
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
    
      {/* Banner image */}
      {node.bannerImage && (
        <div className="mt-4 mx-7 mb-4 rounded-xl overflow-hidden border border-white/10">
          <img
            src={node.bannerImage}
            alt={node.bannerCaption || node.title}
            className="w-full object-cover"
            style={{ maxHeight: '220px' }}
          />
          {node.bannerCaption && (
            <p className="text-xs text-center text-white/50 py-1 px-2 bg-black/20">
              {node.bannerCaption}
            </p>
          )}
        </div>
      )}
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
