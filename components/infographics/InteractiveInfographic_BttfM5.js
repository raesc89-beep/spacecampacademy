'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SVG DECORATIVE ELEMENTS â€” ANTI-GRAVITY
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const DecoMagneticField = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 60 60" width={60 * s} height={60 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
    <ellipse cx="30" cy="30" rx="26" ry="12" fill="none" stroke="#E040FB" strokeWidth="1.5" opacity=".4" />
    <ellipse cx="30" cy="30" rx="18" ry="8" fill="none" stroke="#00CCFF" strokeWidth="1" opacity=".3" />
    <circle cx="30" cy="30" r="3" fill="#E040FB" opacity=".6" />
    <circle cx="30" cy="18" r="1.5" fill="#00CCFF" opacity=".5" />
    <circle cx="30" cy="42" r="1.5" fill="#00CCFF" opacity=".5" />
  </motion.svg>
);

const DecoHoverboard = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 80 30" width={80 * s} height={30 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ y: [-3, 3, -3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
    <rect x="10" y="5" width="60" height="10" rx="5" fill="#E040FB" opacity=".35" />
    <ellipse cx="40" cy="22" rx="30" ry="4" fill="#E040FB" opacity=".15" />
    <line x1="20" y1="15" x2="20" y2="22" stroke="#E040FB" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
    <line x1="60" y1="15" x2="60" y2="22" stroke="#E040FB" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
  </motion.svg>
);

const DecoSuperconductor = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 50 50" width={50 * s} height={50 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4, repeat: Infinity }}>
    <rect x="10" y="20" width="30" height="6" rx="3" fill="#00E676" opacity=".6" />
    <line x1="15" y1="26" x2="15" y2="35" stroke="#00E676" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
    <line x1="25" y1="26" x2="25" y2="38" stroke="#00E676" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
    <line x1="35" y1="26" x2="35" y2="35" stroke="#00E676" strokeWidth=".8" opacity=".3" strokeDasharray="2 2" />
    <line x1="10" y1="40" x2="40" y2="40" stroke="#00CCFF" strokeWidth="2" opacity=".4" />
  </motion.svg>
);

const DecoLevitatingDisc = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 40 40" width={40 * s} height={40 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ y: [-4, 4, -4], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
    <ellipse cx="20" cy="15" rx="14" ry="5" fill="#7C4DFF" opacity=".4" />
    <ellipse cx="20" cy="15" rx="10" ry="3" fill="#7C4DFF" opacity=".2" />
    <ellipse cx="20" cy="30" rx="12" ry="3" fill="#7C4DFF" opacity=".1" />
  </motion.svg>
);

const DecoEddyCurrent = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 60 40" width={60 * s} height={40 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3.5, repeat: Infinity }}>
    {[0, 1, 2].map(i => (
      <ellipse key={i} cx="30" cy="20" rx={12 + i * 8} ry={5 + i * 3}
        fill="none" stroke="#FF6B00" strokeWidth="1" opacity={0.3 - i * 0.08} />
    ))}
    <circle cx="30" cy="20" r="3" fill="#FF6B00" opacity=".5" />
  </motion.svg>
);

const DecoGraviton = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 40 40" width={40 * s} height={40 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ rotate: 360, scale: [1, 1.15, 1] }}
    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
    <circle cx="20" cy="20" r="3" fill="#FF5252" opacity=".6" />
    {[0, 60, 120, 180, 240, 300].map(a => (
      <circle key={a}
        cx={20 + 12 * Math.cos(a * Math.PI / 180)}
        cy={20 + 12 * Math.sin(a * Math.PI / 180)}
        r="1.5" fill="#FF5252" opacity=".35" />
    ))}
    <circle cx="20" cy="20" r="15" fill="none" stroke="#FF5252" strokeWidth=".8" opacity=".2" />
  </motion.svg>
);

const DecoFluxLines = ({ x, y, s = 1 }) => (
  <motion.svg viewBox="0 0 70 50" width={70 * s} height={50 * s}
    style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
    animate={{ opacity: [0.2, 0.45, 0.2] }} transition={{ duration: 4, repeat: Infinity }}>
    {[0, 1, 2, 3].map(i => (
      <path key={i} d={`M${10 + i * 15} 40 Q${17 + i * 15} 15 ${25 + i * 15} 40`}
        fill="none" stroke="#00CCFF" strokeWidth="1.2" opacity={0.35 - i * 0.05} />
    ))}
  </motion.svg>
);

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DECO_MAP per node
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const DECO_MAP = {
  pelicula: [
    <DecoHoverboard key="d0" x="5%" y="12%" s={1.3} />,
    <DecoMagneticField key="d1" x="82%" y="18%" s={0.9} />,
    <DecoFluxLines key="d2" x="8%" y="70%" s={1} />,
  ],
  maglev: [
    <DecoFluxLines key="d0" x="4%" y="10%" s={1.2} />,
    <DecoMagneticField key="d1" x="85%" y="65%" s={1} />,
    <DecoSuperconductor key="d2" x="80%" y="12%" s={0.9} />,
  ],
  lexus: [
    <DecoSuperconductor key="d0" x="6%" y="15%" s={1.1} />,
    <DecoLevitatingDisc key="d1" x="82%" y="10%" s={1} />,
    <DecoFluxLines key="d2" x="78%" y="68%" s={0.9} />,
  ],
  hendo: [
    <DecoEddyCurrent key="d0" x="5%" y="10%" s={1.2} />,
    <DecoHoverboard key="d1" x="80%" y="15%" s={1} />,
    <DecoMagneticField key="d2" x="8%" y="65%" s={0.8} />,
  ],
  newton: [
    <DecoGraviton key="d0" x="85%" y="12%" s={1.1} />,
    <DecoFluxLines key="d1" x="5%" y="60%" s={1} />,
    <DecoLevitatingDisc key="d2" x="80%" y="62%" s={0.9} />,
  ],
  quantum: [
    <DecoSuperconductor key="d0" x="6%" y="12%" s={1.3} />,
    <DecoMagneticField key="d1" x="82%" y="10%" s={1} />,
    <DecoLevitatingDisc key="d2" x="85%" y="65%" s={1} />,
  ],
  electro: [
    <DecoEddyCurrent key="d0" x="4%" y="15%" s={1.1} />,
    <DecoFluxLines key="d1" x="80%" y="12%" s={1} />,
    <DecoHoverboard key="d2" x="6%" y="68%" s={1} />,
  ],
  'futuro-antgrav': [
    <DecoGraviton key="d0" x="6%" y="10%" s={1.2} />,
    <DecoHoverboard key="d1" x="78%" y="8%" s={1.1} />,
    <DecoSuperconductor key="d2" x="82%" y="62%" s={1} />,
  ],
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   INFOGRAPHIC_NODES â€” 8 nodes
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const BIBLIOGRAPHY = [
  'Bachelet, E. (1912). Levitating Transmitting Apparatus, US Patent 1,020,942',
  'Earnshaw, S. (1842). On the nature of the molecular forces, Trans. Cambridge Phil. Soc. 7',
  'Braunbeck, W. (1939). Freischwebende Korper im elektrischen und magnetischen Feld, Zeitschrift fur Physik, 112',
  'Simon, M.D. Et al. (1997). Spin stabilized magnetic levitation, American Journal of Physics, 65',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'pelicula', title: 'El Aeropatín en la Película', color: '#E040FB',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_pelicula.png',
    image: '/assets/bttf/infographic_aeropatines/hero_pelicula.png',
    content: [
      'En «Volver al Futuro Parte II» (1989), Marty McFly viaja al año 2015 y utiliza un aeropatín (una tabla flotante). La película muestra el uso de estos dispositivos en la ciudad. El director Robert Zemeckis bromeó afirmando que los aeropatines existían pero no se comercializaban por motivos de seguridad.',
      'Para filmar estas escenas, los actores utilizaron tablas sujetas con arneses y cables. La producción empleó pantallas azules y plataformas mecánicas. El accesorio original, un aeropatín rosa, se convirtió en un elemento representativo del cine de ciencia ficción.',
      'La predicción de la película inspiró desarrollos tecnológicos. En 2015, empresas como Lexus y Hendo presentaron prototipos funcionales de aeropatines, trasladando el concepto a aplicaciones científicas reales.',
      'En la ficción, el aeropatín parece anular la gravedad, una de las fuerzas fundamentales del universo. En la realidad, esto se logra generando una fuerza de repulsión ascendente mediante levitación magnética.',
      'Posteriormente al estreno, se comercializaron réplicas que no flotaban. Un modelo original utilizado en la filmación fue subastado en 2021 por 501,000 dólares. Existen pocos ejemplares auténticos de esta utilería.'
    ],
    fact: 'El icónico aeropatín rosa de Mattel que usó Michael J. Fox no era más que una tabla de madera de un scooter modificada. Los utileros de la película le quitaron las ruedas, la repintaron con colores brillantes y le agregaron un parche de velcro para que los zapatos del actor se mantuvieran en su lugar.',
  },
  {
    id: 'maglev', title: 'Trenes Maglev: Levitación Real', color: '#00CCFF',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_maglev.png',
    image: '/assets/bttf/infographic_aeropatines/hero_maglev.png',
    content: [
      'Los trenes de levitación magnética (maglev) operan flotando sobre sus vías. Al carecer de contacto físico, se elimina la fricción mecánica, operando sobre un campo magnético.',
      'El sistema Maglev de Shanghái alcanza los 431 km/h. Utiliza un sistema de suspensión electromagnética (EMS) en el cual los electroimanes del vehículo son atraídos hacia un riel ferromagnético, manteniendo un espacio libre de 10 milímetros.',
      'En 2015, el tren SCMaglev de Japón alcanzó los 603 km/h. Emplea imanes superconductores enfriados con helio líquido, generando una fuerza que eleva el tren 10 centímetros sobre la vía.',
      'El principio básico es la repulsión magnética entre polos iguales. Este sistema se amplifica utilizando electroimanes potentes en la base del vehículo, mientras que imanes laterales aseguran su alineación en la vía.',
      'El efecto Meissner ocurre cuando ciertos materiales, al enfriarse por debajo de una temperatura crítica, se convierten en superconductores y expelen campos magnéticos. Esto genera una fuerza de levitación que mantiene al superconductor suspendido, principio físico aplicado en la tecnología maglev.'
    ],
    fact: 'El Maglev de Shanghái acelera de 0 a 431 km/h en solo 2 minutos. El viaje del aeropuerto a la ciudad toma solo 7 minutos y 20 segundos. Durante el viaje, puedes sostener una moneda de canto sobre la bandeja ¡y no se cae! â€” no hay vibración porque el tren nunca toca la vía.',
  },
  {
    id: 'lexus', title: 'El Hoverboard de Lexus (2015)', color: '#7C4DFF',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_lexus.png',
    image: '/assets/bttf/infographic_aeropatines/hero_lexus.png',
    content: [
      'En 2015, la compañía automotriz Lexus presentó un prototipo funcional denominado "SLIDE", un aeropatín diseñado para levitar usando tecnología de superconductores.',
      'El dispositivo integra criostatos con superconductores enfriados a -197°C mediante nitrógeno líquido. Estos materiales aprovechan el efecto Meissner para levitar al repeler los campos magnéticos de una superficie inferior.',
      'La demostración se realizó en una pista construida en Barcelona que integraba imanes bajo el concreto. El aeropatín requiere esta infraestructura específica para levitar, siendo inoperante en superficies comunes.',
      'Debido a que el nitrógeno líquido se evapora en aproximadamente 20 minutos, los criostatos requieren recargas frecuentes. Operar el dispositivo requiere habilidad, ya que la ausencia de fricción cambia por completo la dinámica de movimiento.',
      'La iniciativa, aunque fue una campaña publicitaria, demostró la viabilidad técnica de la levitación mediante superconductores en vehículos personales ligeros.'
    ],
    fact: 'Cuando Ross McGouran intentó el aeropatín de Lexus por primera vez, ¡se cayó inmediatamente! No hay fricción contra qué empujar â€” girar, frenar y balancearte son diferentes al skateboarding. Dijo que era como «intentar pararte sobre una bola de hielo». Le tomó 6 semanas de práctica dominar trucos básicos.',
  },
  {
    id: 'hendo', title: 'El Hendo Hoverboard y Tony Hawk', color: '#FF6B00',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_hendo.png',
    image: '/assets/bttf/infographic_aeropatines/hero_hendo.png',
    content: [
      'En 2014, Arx Pax desarrolló el aeropatín Hendo. El prototipo generó atención tras una demostración en la que participó el deportista Tony Hawk.',
      'El dispositivo utiliza la Ley de Lenz y corrientes de Foucault. El movimiento de un campo magnético sobre una superficie conductora genera corrientes eléctricas inducidas, las cuales crean un campo magnético que se opone al movimiento original.',
      'Al incorporar motores que giran conjuntos de imanes, el dispositivo genera corrientes en una superficie metálica, produciendo una fuerza de levitación constante.',
      'Esta tecnología requiere superficies conductoras, como paneles de cobre o aluminio, por lo que no opera sobre asfalto o concreto. Su objetivo original era desarrollar sistemas de levitación arquitectónica para mitigar daños sísmicos.',
      'El prototipo Hendo logró financiarse parcialmente a través de campañas de participación pública. El dispositivo flota a 2.5 centímetros de la superficie y emite un ruido característico debido al giro de los motores magnéticos.'
    ],
    fact: 'Para financiar su primer modelo de aeropatín, Hendo lanzó una campaña en Kickstarter en 2014 con una meta de $250,000 dólares. El proyecto fue un éxito masivo y recaudó más de $510,000. Los patrocinadores que aportaron $10,000 o más recibieron uno de los primeros diez aeropatines funcionales producidos.',
  },
  {
    id: 'newton', title: 'Las Leyes de Newton y la Gravedad', color: '#FFA500',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_newton.png',
    image: '/assets/bttf/infographic_aeropatines/hero_newton.png',
    content: [
      'La ley de la gravitación universal de Isaac Newton (1687) establece que todo objeto con masa atrae a otros objetos. En la Tierra, esta aceleración es de 9.8 m/s².',
      'Cuando un objeto sostiene otro, ejerce una fuerza ascendente que iguala a la fuerza gravitacional descendente. Un sistema de levitación opera mediante un principio similar, aplicando una fuerza que contrarresta la gravedad.',
      'La aceleración gravitacional varía según el cuerpo celeste. En la Luna es de 1.6 m/s² (aproximadamente una sexta parte de la terrestre), mientras que en Júpiter es de 24.8 m/s².',
      'La Tercera Ley de Newton, que postula que toda acción tiene una reacción igual y opuesta, es fundamental. Los imanes ejercen una fuerza hacia abajo sobre la superficie conductora, la cual reacciona empujando el dispositivo hacia arriba.',
      'En ausencia de resistencia del aire (vacío), todos los objetos caen a la misma velocidad independientemente de su masa, ya que la gravedad los acelera por igual. Galileo propuso este principio en el siglo XVII.'
    ],
    fact: 'En 1971, el astronauta del Apollo 15 David Scott se paró en la Luna y soltó un martillo y una pluma al mismo tiempo en televisión en vivo. Golpearon la superficie lunar simultáneamente. Dijo «¡Qué tal! Esto demuestra que el Sr. Galileo tenía razón.» El video ha sido visto más de 20 millones de veces en YouTube.',
  },
  {
    id: 'quantum', title: 'Levitación Cuántica: Flux Pinning', color: '#00E676',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_quantum.png',
    image: '/assets/bttf/infographic_aeropatines/hero_quantum.png',
    content: [
      'La levitación cuántica permite que un disco superconductor, enfriado a -196°C, quede fijo en el aire sobre una pista magnética. El disco mantiene su posición incluso si se altera la orientación de la pista.',
      'Este fenómeno se conoce como bloqueo cuántico o flux pinning. En los superconductores de Tipo II, las líneas de campo magnético quedan atrapadas en las imperfecciones del material, fijando al superconductor en su posición relativa al campo magnético.',
      'En 2011, el Dr. Boaz Almog realizó una demostración en la que un disco superconductor levitaba a lo largo de una pista circular sin fricción mecánica.',
      'La superconductividad es un fenómeno cuántico macroscópico. A bajas temperaturas, los electrones forman pares de Cooper que se desplazan sin resistencia eléctrica, permitiendo el flujo de corriente sin pérdida de energía.',
      'Actualmente, se investiga su aplicación en trenes maglev, rodamientos de precisión y almacenamiento de energía. El requisito de operar a temperaturas criogénicas representa su principal limitación técnica.'
    ],
    fact: 'En la Universidad de Tel Aviv, el Dr. Boaz Almog demostró un disco superconductor de solo 0.5 mm de espesor â€” más delgado que una tarjeta de crédito â€” flotando en una pista magnética cargando 70,000 veces su propio peso. Inclinó la pista a 90 grados y el disco se quedó bloqueado. La volteó de cabeza y el disco colgó sin caerse. La audiencia quedó boquiabierta.',
  },
  {
    id: 'electro', title: 'Suspensión EM en la Vida Real', color: '#FFD740',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_electro.png',
    image: '/assets/bttf/infographic_aeropatines/hero_electro.png',
    content: [
      'La suspensión electromagnética se emplea en trenes maglev, rodamientos magnéticos para turbinas industriales y cabezales de discos duros, los cuales operan a nanómetros de la superficie del disco magnético.',
      'Existen dos variantes: la suspensión electromagnética (EMS), que utiliza atracción entre electroimanes y un riel ferromagnético superior, y la electrodinámica (EDS), basada en la repulsión magnética sobre una vía conductora, que requiere alta velocidad inicial.',
      'El concepto Hyperloop propone integrar levitación electromagnética en tubos de baja presión. Al minimizar la resistencia aerodinámica y mecánica, se proyectan velocidades superiores a los 1,000 km/h.',
      'Las turbinas eólicas con eje de levitación magnética reducen la fricción mecánica, incrementando su eficiencia energética y disminuyendo el desgaste operativo. Estas turbinas pueden generar energía con vientos de menor intensidad.',
      'La levitación acústica utiliza la presión de radiación de las ondas sonoras para mantener pequeños objetos suspendidos en los nodos de una onda estacionaria, permitiendo la manipulación sin contacto físico.'
    ],
    fact: 'Dentro del disco duro de tu computadora, el cabezal de lectura-escritura «vuela» a solo 3-5 nanómetros sobre el disco giratorio — eso es aproximadamente 1/20,000 del ancho de un cabello humano. Si el cabezal fuera un Boeing 747, estaría volando a 800 km/h a solo 1 milímetro sobre el suelo. Cualquier partícula de polvo a esa escala sería como una montaña. Por eso los discos duros están sellados.',
  },
  {
    id: 'futuro-antgrav', title: 'El Futuro de la Antigravedad', color: '#FF5252',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_futuro.png',
    image: '/assets/bttf/infographic_aeropatines/hero_futuro.png',
    content: [
      'Las tecnologías de levitación demostradas incluyen levitación magnética, bloqueo cuántico, suspensión electromagnética y levitación acústica.',
      'En física teórica, la posibilidad de anular el campo gravitacional mediante antigravedad permanece como una hipótesis no demostrada, ya que aún no se ha detectado experimentalmente el gravitón, la partícula mediadora de la gravedad.',
      'Investigaciones como el motor "EmDrive", evaluadas por la NASA, sugirieron empuje sin propelente, pero experimentos posteriores atribuyeron los resultados a errores de medición. Los avances científicos requieren verificación rigurosa.',
      'El desarrollo de metamateriales (estructuras a escala sub-longitud de onda) ha permitido desviar ondas electromagnéticas, como la luz. Teóricamente, estructuras análogas podrían interactuar con ondas gravitacionales, aunque esto es especulativo.',
      'La innovación en transporte personal continúa. La investigación en superconductores a temperatura ambiente sigue su curso. Paralelamente, vehículos aéreos personales basados en propulsión de drones han demostrado vuelos funcionales, logrando hitos en la aviación experimental.'
    ],
    fact: 'En 2015, el inventor canadiense Catalin Alexandru Duru estableció el Récord Guinness para el vuelo más largo en aeropatín: 275.9 metros a una altura de 5 metros. Su tabla usaba hélices de dron, no imanes. En 2019, el inventor francés Franky Zapata cruzó el Canal de la Mancha en su Flyboard Air â€” 35 km en 22 minutos a velocidades de hasta 170 km/h y alturas de hasta 15 metros. Literalmente voló sobre el mar en un aeropatín.',
  },
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ANTI-GRAVITY FIELD â€” animated canvas
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function AntiGravityField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf, w, h;
    const resize = () => { w = c.width = c.offsetWidth; h = c.height = c.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const N = 80;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2.2 + 0.5,
      color: Math.random() > 0.5 ? '#E040FB' : '#00CCFF',
      isDisc: Math.random() < 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.save();
        ctx.globalAlpha = 0.4;
        if (p.isDisc) {
          ctx.translate(p.x, p.y);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 3, p.r * 1.2, 0, 0, Math.PI * 2);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
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
   SVG HEADER â€” hover
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
function HoverHeader() {
  return (
    <svg viewBox="0 0 600 90" style={{ width: '100%', maxWidth: 600, display: 'block', margin: '0 auto' }}>
      {/* magnetic field rings */}
      <ellipse cx="300" cy="45" rx="280" ry="28" fill="none" stroke="#E040FB" strokeWidth="0.8" opacity=".2" />
      <ellipse cx="300" cy="45" rx="220" ry="20" fill="none" stroke="#00CCFF" strokeWidth="0.6" opacity=".18" />
      <ellipse cx="300" cy="45" rx="160" ry="14" fill="none" stroke="#7C4DFF" strokeWidth="0.5" opacity=".15" />
      {/* hoverboard silhouette */}
      <rect x="240" y="68" width="120" height="6" rx="3" fill="#E040FB" opacity=".2" />
      <ellipse cx="300" cy="78" rx="50" ry="4" fill="#E040FB" opacity=".1" />
      {/* title */}
      <text x="300" y="40" textAnchor="middle" fill="#E040FB" fontSize="20" fontWeight="800"
        fontFamily="'Orbitron',sans-serif" letterSpacing="2.5">AEROPATINES Y ANTIGRAVEDAD</text>
      <text x="300" y="58" textAnchor="middle" fill="#00CCFF" fontSize="10" fontWeight="600"
        fontFamily="'Exo 2',sans-serif" letterSpacing="4" opacity=".7">LA CIENCIA DE VOLVER AL FUTURO</text>
      {/* decorative dots */}
      <circle cx="70" cy="45" r="2" fill="#E040FB" opacity=".45" />
      <circle cx="530" cy="45" r="2" fill="#00CCFF" opacity=".45" />
      <circle cx="40" cy="45" r="1.2" fill="#7C4DFF" opacity=".3" />
      <circle cx="560" cy="45" r="1.2" fill="#7C4DFF" opacity=".3" />
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
      <motion.path d="M9 6 L9 12 L12 9" fill="none" stroke="#E040FB" strokeWidth="1.5" strokeLinecap="round"
        animate={{ rotate: open ? 180 : 0 }} style={{ transformOrigin: '12px 12px' }} />
      <circle cx="12" cy="16" r="1" fill="#E040FB" opacity=".7" />
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
        <span style={{ fontSize: 11, color: '#E040FB', fontWeight: 700 }}>{explored}/{total} explorados</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
          style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#E040FB,#00CCFF)' }}
        />
      </div>
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   MAIN COMPONENT
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function InteractiveInfographic_BttfM5() {
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
      background: 'linear-gradient(180deg, #0a0520 0%, #1a0a2e 40%, #0d0418 100%)',
      fontFamily: "'Exo 2','Segoe UI',sans-serif", color: '#fff',
    }}>
      {/* bg image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/assets/bttf/infographic_aeropatines/bg_aeropatines.png)',
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18, pointerEvents: 'none',
      }} />

      {/* canvas particles */}
      <AntiGravityField />

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
          <HoverHeader />
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
                background: 'rgba(224,64,251,0.08)', border: '1px solid #E040FB44', maxWidth: 520, margin: '36px auto 0',
              }}
            >
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Star size={36} color="#E040FB" fill="#E040FB" style={{ margin: '0 auto 10px', display: 'block' }} />
              </motion.div>
              <p style={{ fontSize: 20, fontWeight: 800, color: '#E040FB', margin: '0 0 8px', fontFamily: "'Orbitron',sans-serif" }}>
                ðŸ›¹ ¡Has dominado la Antigravedad!
              </p>
              <p style={{ fontSize: 14, color: '#ccc', margin: 0 }}>
                Ahora puedes tomar el quiz para ganar tu insignia de Ingeniero Antigravitacional
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
