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
      'En «Volver al Futuro Parte II» (1989), Marty McFly llega al año 2015 y descubre los aeropatines â€” ¡patinetas que flotan! La película muestra a chicos usándolos en la plaza de Hill Valley. El director Robert Zemeckis hizo una broma diciendo que los aeropatines eran reales pero que los grupos de padres no permitían venderlos. ¡Mucha gente le creyó!',
      '¿Cómo los filmaron? Los actores estaban parados en tablas reales sujetas con cables y arneses. El equipo usó tecnología de pantalla azul y plataformas mecánicas. Michael J. Fox tuvo que repetir muchas tomas porque el arnés era incómodo. ¡El aeropatín rosa de Mattel se convirtió en uno de los accesorios de película más icónicos de la historia!',
      'La película predijo que 2015 tendría aeropatines, y cuando llegó el 2015 real, ¿todavía no los teníamos... O sí? ¡Compañías como Lexus y Hendo SÍ crearon aeropatines funcionales ese año, inspirados por la película! La ciencia ficción se convirtió en realidad científica, solo que no exactamente como la imaginaron.',
      'La física en la película: el aeropatín parece repeler la gravedad misma. En realidad, no puedes simplemente cancelar la gravedad â€” es una de las cuatro fuerzas fundamentales del universo. Pero SÍ puedes crear una fuerza hacia arriba lo suficientemente fuerte para contrarrestarla. ¡Eso es lo que hace la levitación magnética!',
      'Mattel sacó juguetes de aeropatín después de BTTF2. Eran solo tablas normales sin ruedas (no flotaban). La utilería original de la película se vendió en una subasta por $501,000 dólares en 2021. Solo existen un puñado de aeropatines usados en la filmación.',
    ],
    fact: 'El icónico aeropatín rosa de Mattel que usó Michael J. Fox no era más que una tabla de madera de un scooter modificada. Los utileros de la película le quitaron las ruedas, la repintaron con colores brillantes y le agregaron un parche de velcro para que los zapatos del actor se mantuvieran en su lugar.',
  },
  {
    id: 'maglev', title: 'Trenes Maglev: Levitación Real', color: '#00CCFF',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_maglev.png',
    image: '/assets/bttf/infographic_aeropatines/hero_maglev.png',
    content: [
      '¡Los trenes de levitación magnética (maglev) son REALES y vuelan! No por el aire como aviones, sino que flotan sobre sus vías sin contacto alguno. Imagina un tren que nunca toca los rieles â€” sin fricción, sin ruedas, solo un colchón de fuerza magnética invisible. Es lo más cercano a un aeropatín real.',
      'El Maglev de Shanghái en China alcanza 431 km/h (268 mph) en servicio regular desde 2004. Usa suspensión electromagnética (EMS) donde electroimanes en el tren son atraídos hacia arriba por un riel de acero. ¡El espacio es de solo 10mm! Es como un abrazo magnético que levanta todo el tren.',
      'El SCMaglev de Japón estableció el récord mundial de velocidad: 603 km/h (375 mph) en 2015. Usa imanes superconductores enfriados a -269°C con helio líquido. A esa temperatura, los imanes se vuelven poderosos. El tren flota 10cm sobre la vía. ¡Un viaje de Tokio a Osaka que toma 2.5 horas en tren bala tomaría solo 40 minutos!',
      '¿Cómo funciona? Piensa en dos imanes: cuando empujas los mismos polos juntos (Norte-Norte o Sur-Sur), se repelen. Ahora imagina miles de imanes súper poderosos haciendo esto debajo de un tren. La fuerza de repulsión levanta todo el tren de la vía. Imanes guía a los lados lo mantienen centrado.',
      'El efecto Meissner es el verdadero superpoder: cuando ciertos materiales se enfrían por debajo de una temperatura crítica, se convierten en superconductores y expulsan los campos magnéticos. Esto significa que un imán colocado sobre un superconductor flotará â€” es empujado físicamente por el campo expulsado. Es real, se demuestra en laboratorios de todo el mundo, y es la base de los trenes más rápidos de la Tierra.',
    ],
    fact: 'El Maglev de Shanghái acelera de 0 a 431 km/h en solo 2 minutos. El viaje del aeropuerto a la ciudad toma solo 7 minutos y 20 segundos. Durante el viaje, puedes sostener una moneda de canto sobre la bandeja ¡y no se cae! â€” no hay vibración porque el tren nunca toca la vía.',
  },
  {
    id: 'lexus', title: 'El Hoverboard de Lexus (2015)', color: '#7C4DFF',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_lexus.png',
    image: '/assets/bttf/infographic_aeropatines/hero_lexus.png',
    content: [
      'En 2015 â€” el año exacto que BTTF2 predijo los aeropatines â€” Lexus (la compañía de autos) reveló un aeropatín funcional REAL llamado «SLIDE». Se veía como algo de la película: elegante, humeante con vapor, flotando sobre el suelo. El mundo entero lo quiso saber. Y sí, era real.',
      'Cómo funciona: El SLIDE usa dos criostatos (contenedores) llenos de superconductores enfriados a -197°C usando nitrógeno líquido. Los superconductores crean el efecto Meissner, que repele campos magnéticos. La tabla flota porque es empujada físicamente lejos de los imanes incrustados en la superficie debajo.',
      'El truco: Lexus construyó un skatepark PERSONALIZADO en Barcelona, España, con imanes permanentes ocultos bajo la superficie de concreto. El aeropatín SOLO funciona en esa pista específica. Llévalo a una banqueta normal y simplemente se queda ahí. ¡La pista magnética costó millones de euros construir!',
      'El nitrógeno líquido se acaba después de unos 10-20 minutos, así que la tabla gradualmente se hunde mientras los superconductores se calientan. Los pilotos tenían que rellenar el nitrógeno entre corridas. El skateboarder profesional Ross McGouran fue el primero en montarlo exitosamente. Le tomó semanas de práctica â€” ¡flotar en una superficie sin fricción NO es nada como patinar normalmente!',
      'Todo el proyecto fue una campaña publicitaria â€” Lexus gastó aproximadamente $10+ millones en el aeropatín para promover su marca. Pero la CIENCIA era 100% real. Sin trucos, sin cables, sin CGI. Pura física de superconductores. Demostró que flotar sobre campos magnéticos es posible, solo que no (todavía) práctico.',
    ],
    fact: 'Cuando Ross McGouran intentó el aeropatín de Lexus por primera vez, ¡se cayó inmediatamente! No hay fricción contra qué empujar â€” girar, frenar y balancearte son diferentes al skateboarding. Dijo que era como «intentar pararte sobre una bola de hielo». Le tomó 6 semanas de práctica dominar trucos básicos.',
  },
  {
    id: 'hendo', title: 'El Hendo Hoverboard y Tony Hawk', color: '#FF6B00',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_hendo.png',
    image: '/assets/bttf/infographic_aeropatines/hero_hendo.png',
    content: [
      'En 2014, un año antes del proyecto Lexus, una compañía llamada Arx Pax creó el Hendo Hoverboard. ¡El legendario skateboarder Tony Hawk fue uno de los primeros en montarlo! El video de Tony Hawk en un aeropatín real se hizo viral â€” fue como ver el futuro llegar.',
      'El Hendo usa una tecnología diferente a Lexus: la Ley de Lenz y corrientes de Foucault. Cuando un imán se mueve cerca de una superficie conductora (como cobre o aluminio), crea corrientes eléctricas arremolinadas en el metal. ¡Estas corrientes generan su propio campo magnético que empuja CONTRA el imán original! Mientras más rápido te muevas, ¡más fuerte la repulsión!',
      'Piénsalo así: deja caer un imán por un tubo de cobre. En vez de caer rápido, se desliza lentamente â€” casi flotando. El cobre no es magnético, pero el imán en movimiento crea corrientes eléctricas que luchan contra su movimiento. El Hendo escala esto con imanes giratorios que crean una fuerza de flotación constante.',
      'La limitación: el Hendo SOLO funciona sobre superficies metálicas conductoras â€” láminas de cobre o aluminio. Llévalo afuera al concreto o asfalto y no pasa nada. Los fundadores, Greg y Jill Henderson, crearon la tecnología de flotación para protección contra terremotos â€” ¡su verdadero objetivo era levitar edificios enteros durante sismos!',
      'El Hendo 2.0 (su versión mejorada) usó una campaña de Kickstarter y recaudó $510,590 dólares de 3,169 patrocinadores. El respaldo de Tony Hawk fue crucial. La tabla flota aproximadamente 2.5 cm sobre la superficie y puede soportar un jinete de hasta 136 kg. Suena como una aspiradora cuando funciona â€” ¡los imanes giratorios crean un zumbido fuerte!',
    ],
    fact: 'Para financiar su primer modelo de aeropatín, Hendo lanzó una campaña en Kickstarter en 2014 con una meta de $250,000 dólares. El proyecto fue un éxito masivo y recaudó más de $510,000. Los patrocinadores que aportaron $10,000 o más recibieron uno de los primeros diez aeropatines funcionales producidos.',
  },
  {
    id: 'newton', title: 'Las Leyes de Newton y la Gravedad', color: '#FFA500',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_newton.png',
    image: '/assets/bttf/infographic_aeropatines/hero_newton.png',
    content: [
      'Para entender los aeropatines, primero necesitas entender contra qué estás luchando: la gravedad. Isaac Newton (1687) descubrió que cada objeto con masa atrae a cada otro objeto con masa. La Tierra te jala hacia abajo con una fuerza calculada por F = m Ã— g, donde g = 9.8 m/sÂ². Eso significa que por cada kilogramo que pesas, ¡la Tierra te jala con 9.8 Newtons de fuerza!',
      'Experimento sencillo: sostén un libro en tu mano. ¿Sientes el peso? Eso es la gravedad jalándolo hacia abajo a 9.8 m/sÂ². Ahora piensa: tus músculos empujan HACIA ARRIBA con exactamente la misma fuerza. El libro no se mueve porque las fuerzas se cancelan. Un aeropatín hace lo mismo â€” empuja hacia arriba con una fuerza magnética o electromagnética igual a la de la gravedad.',
      'Gravedad en otros mundos: en la Luna, g = 1.6 m/sÂ² (aproximadamente 1/6 de la Tierra). ¡Un niño de 60 kg pesa 588 Newtons en la Tierra pero solo 96 Newtons en la Luna! Podrías saltar 6 veces más alto. En Júpiter, g = 24.8 m/sÂ² â€” pesarías 2.5 veces más y un aeropatín necesitaría 2.5 veces más potencia para levantarte.',
      'La Tercera Ley de Newton es el secreto de los aeropatines: «Para cada acción, hay una reacción igual y opuesta». Cuando los imanes empujan HACIA ABAJO sobre una superficie conductora, la superficie empuja al aeropatín HACIA ARRIBA. El par acción-reacción crea la flotación. Así también funcionan los cohetes â€” el gas caliente empuja hacia abajo, el cohete empuja hacia arriba.',
      'Dato de gravedad divertido: ¡si sueltas una pluma y una bola de boliche en el vacío (sin aire), tocan el suelo al EXACTO mismo tiempo! Galileo descubrió esto en los 1600s, y el astronauta del Apollo 15, David Scott, lo demostró en la Luna en 1971 dejando caer un martillo y una pluma. En el vacío, todo cae a la misma velocidad porque la gravedad acelera todos los objetos por igual.',
    ],
    fact: 'En 1971, el astronauta del Apollo 15 David Scott se paró en la Luna y soltó un martillo y una pluma al mismo tiempo en televisión en vivo. Golpearon la superficie lunar simultáneamente. Dijo «¡Qué tal! Esto demuestra que el Sr. Galileo tenía razón.» El video ha sido visto más de 20 millones de veces en YouTube.',
  },
  {
    id: 'quantum', title: 'Levitación Cuántica: Flux Pinning', color: '#00E676',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_quantum.png',
    image: '/assets/bttf/infographic_aeropatines/hero_quantum.png',
    content: [
      'La levitación cuántica es uno de los fenómenos más asombrosos de la física. Un disco superconductor, enfriado con nitrógeno líquido a -196°C, puede colocarse sobre una pista magnética y se BLOQUEARÁ en el aire. No solo flota â€” se BLOQUEA. Puedes empujarlo y regresa a su posición. Puedes voltear la pista de cabeza y el disco cuelga debajo sin caerse. ¡Es increíble!',
      'Este fenómeno se llama «flux pinning» o «bloqueo cuántico». Cuando un superconductor Tipo II se enfría, diminutos tubos de campo magnético (llamados tubos de flujo o vórtices) quedan atrapados dentro de imperfecciones microscópicas del superconductor. Estos tubos actúan como pines que bloquean al superconductor en una posición específica dentro del campo magnético.',
      'La demostración más famosa fue del Dr. Boaz Almog en la Universidad de Tel Aviv en 2011. Su charla TED mostrando un disco superconductor flotando sobre una pista circular se hizo viral con más de 5 millones de vistas. El disco se mueve suavemente por la pista como un aeropatín real â€” sin fricción, silencioso, mágico.',
      '¿Por qué es «cuántica»? Porque la superconductividad misma es un fenómeno de mecánica cuántica. Debajo de la temperatura crítica, los electrones en el material forman «pares de Cooper» que se mueven sin resistencia. Estos electrones emparejados crean un estado cuántico donde la corriente eléctrica fluye para siempre sin perder energía. Es literalmente un milagro cuántico ocurriendo a escala macroscópica (visible).',
      'Aplicaciones reales hoy: la levitación cuántica se usa en algunos prototipos maglev y ha sido propuesta para rodamientos sin fricción en volantes de inercia para almacenamiento de energía. Científicos del MIT la están explorando para infraestructura de computación cuántica. La principal limitación es la temperatura â€” mantener las cosas a -196°C requiere nitrógeno líquido constante. Si alguien inventa un superconductor a temperatura ambiente, los aeropatines de levitación cuántica se vuelven posibles.',
    ],
    fact: 'En la Universidad de Tel Aviv, el Dr. Boaz Almog demostró un disco superconductor de solo 0.5 mm de espesor â€” más delgado que una tarjeta de crédito â€” flotando en una pista magnética cargando 70,000 veces su propio peso. Inclinó la pista a 90 grados y el disco se quedó bloqueado. La volteó de cabeza y el disco colgó sin caerse. La audiencia quedó boquiabierta.',
  },
  {
    id: 'electro', title: 'Suspensión EM en la Vida Real', color: '#FFD740',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_electro.png',
    image: '/assets/bttf/infographic_aeropatines/hero_electro.png',
    content: [
      'La suspensión electromagnética (EMS) se usa todos los días en tecnología real. El ejemplo más visible: trenes maglev. Pero EMS también aparece en lugares inesperados. Los rodamientos magnéticos en turbinas industriales eliminan la fricción. Algunos elevadores experimentales usan levitación electromagnética. ¡Hasta tu disco duro tiene un cabezal de lectura-escritura que «vuela» sobre un colchón de aire a solo nanómetros sobre el disco giratorio!',
      'Hay dos tipos principales: EMS (suspensión electromagnética) usa atracción â€” los electroimanes son jalados HACIA ARRIBA hacia un riel ferromagnético arriba. EDS (suspensión electrodinámica) usa repulsión â€” los imanes en movimiento crean corrientes de Foucault en una vía conductora que empujan el vehículo HACIA ARRIBA. Ambos funcionan, pero EDS requiere alta velocidad para generar suficiente sustentación.',
      'El concepto Hyperloop (propuesto por Elon Musk en 2013) combina levitación electromagnética con tubos de casi-vacío. Al eliminar la resistencia del aire Y la fricción de la vía, los vehículos podrían teóricamente viajar a más de 1,000 km/h. Virgin Hyperloop logró la primera prueba con humanos en 2020 en el desierto de Nevada â€” dos pasajeros viajaron a velocidad modesta pero en un tubo de vacío real.',
      'Las turbinas eólicas de levitación magnética son una innovación real: el eje de la turbina flota sobre imanes en vez de rodamientos mecánicos. Esto elimina pérdidas por fricción (los rodamientos desperdician 5-10% de energía), reduce el ruido y extiende la vida útil de la turbina. ¡Ingenieros chinos han construido turbinas MagLev que generan energía con vientos de solo 1.5 m/s! â€” las turbinas regulares necesitan al menos 3-4 m/s.',
      'La levitación acústica es otra forma real de flotar: usando ondas sonoras enfocadas, puedes suspender objetos pequeños en el aire. Funciona con gotas de agua, pequeñas cuentas, e incluso insectos pequeños (sin hacerles daño). Científicos de la Universidad de Bristol crearon un «rayo tractor» usando 64 bocinas diminutas que pueden mover objetos por el aire usando solo sonido. No es anti-gravedad, ¡pero SÍ es levitación real!',
    ],
    fact: 'Dentro del disco duro de tu computadora, el cabezal de lectura-escritura «vuela» a solo 3-5 nanómetros sobre el disco giratorio â€” eso es aproximadamente 1/20,000 del ancho de un cabello humano. Si el cabezal fuera un Boeing 747, estaría volando a 800 km/h a solo 1 milímetro sobre el suelo. Cualquier partícula de polvo a esa escala sería como una montaña. Por eso los discos duros están sellados.',
  },
  {
    id: 'futuro-antgrav', title: 'El Futuro de la Antigravedad', color: '#FF5252',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_futuro.png',
    image: '/assets/bttf/infographic_aeropatines/hero_futuro.png',
    content: [
      'Lo que SABEMOS que funciona hoy: levitación magnética (trenes maglev), levitación cuántica con superconductores (demostraciones de laboratorio), suspensión electromagnética (rodamientos industriales), levitación acústica (objetos pequeños sobre ondas sonoras) y flotación por Ley de Lenz (tabla Hendo sobre superficies de cobre). Todo es REAL, probado y usado.',
      'Lo que NO sabemos aún: si la verdadera antigravedad (cancelar la fuerza gravitacional misma) es posible. El gravitón â€” la partícula teórica que transporta la fuerza gravitacional â€” nunca ha sido detectado. Si pudiéramos manipular gravitones de la misma forma que manipulamos fotones (luz), podríamos teóricamente crear campos antigravitacionales. Pero esto está muy lejos de la ciencia actual.',
      'El laboratorio Eagleworks de la NASA (oficialmente el Laboratorio de Física de Propulsión Avanzada) ha probado conceptos controversiales como el «EmDrive» â€” un motor que aparentaba crear empuje sin propelente. Los resultados iniciales fueron emocionantes pero experimentos posteriores mostraron que el efecto probablemente era error de medición. La ciencia real requiere pruebas rigurosas, y afirmaciones extraordinarias necesitan evidencia extraordinaria.',
      'Los metamateriales son una frontera emocionante: materiales diseñados con estructuras más pequeñas que la longitud de onda de las ondas con las que interactúan. Los científicos han creado metamateriales que curvan la luz alrededor de objetos (¡capas de invisibilidad!). ¿Podrían principios similares funcionar para la gravedad? Algunos físicos teorizan que los metamateriales gravitacionales podrían algún día blindar o redirigir ondas gravitacionales.',
      'El sueño de un aeropatín personal no ha muerto â€” está evolucionando. Los superconductores a temperatura ambiente (si se logran) revolucionarían todo. En 2023, un equipo coreano afirmó haber creado uno (llamado LK-99) pero otros laboratorios no pudieron replicarlo. La búsqueda continúa. Mientras tanto, las tablas de vuelo con drones (como el Omni Hoverboard de Catalin Alexandru Duru, que voló 275.9 metros en 2015, récord Guinness) demuestran que ¡el vuelo personal SÍ es alcanzable!',
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
