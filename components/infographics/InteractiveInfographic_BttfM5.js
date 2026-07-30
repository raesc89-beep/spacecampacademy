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
  'Earnshaw, S. (1842). On the nature of the molecular forces, Trans. Cambridge Phil. Soc., 7',
  'Braunbeck, W. (1939). Freischwebende Korper im elektrischen und magnetischen Feld, Zeitschrift fur Physik, 112',
  'Simon, M.D. et al. (1997). Spin stabilized magnetic levitation, American Journal of Physics, 65',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'pelicula', title: 'El AeropatÃ­n en la PelÃ­cula', color: '#E040FB',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_pelicula.png',
    image: '/assets/bttf/infographic_aeropatines/hero_pelicula.png',
    content: [
      'En Â«Volver al Futuro Parte IIÂ» (1989), Marty McFly llega al aÃ±o 2015 y descubre los aeropatines â€” Â¡patinetas que flotan! La pelÃ­cula muestra a chicos usÃ¡ndolos en la plaza de Hill Valley. El director Robert Zemeckis hizo una broma diciendo que los aeropatines eran reales pero que los grupos de padres no permitÃ­an venderlos. Â¡Mucha gente le creyÃ³!',
      'Â¿CÃ³mo los filmaron? Los actores estaban parados en tablas reales sujetas con cables y arneses. El equipo usÃ³ tecnologÃ­a de pantalla azul y plataformas mecÃ¡nicas. Michael J. Fox tuvo que repetir muchas tomas porque el arnÃ©s era incÃ³modo. Â¡El aeropatÃ­n rosa de Mattel se convirtiÃ³ en uno de los accesorios de pelÃ­cula mÃ¡s icÃ³nicos de la historia!',
      'La pelÃ­cula predijo que 2015 tendrÃ­a aeropatines, y cuando llegÃ³ el 2015 real, Â¿todavÃ­a no los tenÃ­amos... o sÃ­? Â¡CompaÃ±Ã­as como Lexus y Hendo SÃ crearon aeropatines funcionales ese aÃ±o, inspirados por la pelÃ­cula! La ciencia ficciÃ³n se convirtiÃ³ en realidad cientÃ­fica, solo que no exactamente como la imaginaron.',
      'La fÃ­sica en la pelÃ­cula: el aeropatÃ­n parece repeler la gravedad misma. En realidad, no puedes simplemente cancelar la gravedad â€” es una de las cuatro fuerzas fundamentales del universo. Pero SÃ puedes crear una fuerza hacia arriba lo suficientemente fuerte para contrarrestarla. Â¡Eso es lo que hace la levitaciÃ³n magnÃ©tica!',
      'Mattel sacÃ³ juguetes de aeropatÃ­n despuÃ©s de BTTF2. Eran solo tablas normales sin ruedas (no flotaban). La utilerÃ­a original de la pelÃ­cula se vendiÃ³ en una subasta por $501,000 dÃ³lares en 2021. Solo existen un puÃ±ado de aeropatines usados en la filmaciÃ³n.',
    ],
    fact: 'El icÃ³nico aeropatÃ­n rosa de Mattel que usÃ³ Michael J. Fox no era mÃ¡s que una tabla de madera de un scooter modificada. Los utileros de la pelÃ­cula le quitaron las ruedas, la repintaron con colores brillantes y le agregaron un parche de velcro para que los zapatos del actor se mantuvieran en su lugar.',
  },
  {
    id: 'maglev', title: 'Trenes Maglev: LevitaciÃ³n Real', color: '#00CCFF',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_maglev.png',
    image: '/assets/bttf/infographic_aeropatines/hero_maglev.png',
    content: [
      'Â¡Los trenes de levitaciÃ³n magnÃ©tica (maglev) son REALES y vuelan! No por el aire como aviones, sino que flotan sobre sus vÃ­as sin contacto alguno. Imagina un tren que nunca toca los rieles â€” sin fricciÃ³n, sin ruedas, solo un colchÃ³n de fuerza magnÃ©tica invisible. Es lo mÃ¡s cercano a un aeropatÃ­n real.',
      'El Maglev de ShanghÃ¡i en China alcanza 431 km/h (268 mph) en servicio regular desde 2004. Usa suspensiÃ³n electromagnÃ©tica (EMS) donde electroimanes en el tren son atraÃ­dos hacia arriba por un riel de acero. Â¡El espacio es de solo 10mm! Es como un abrazo magnÃ©tico que levanta todo el tren.',
      'El SCMaglev de JapÃ³n estableciÃ³ el rÃ©cord mundial de velocidad: 603 km/h (375 mph) en 2015. Usa imanes superconductores enfriados a -269Â°C con helio lÃ­quido. A esa temperatura, los imanes se vuelven increÃ­blemente poderosos. El tren flota 10cm sobre la vÃ­a. Â¡Un viaje de Tokio a Osaka que toma 2.5 horas en tren bala tomarÃ­a solo 40 minutos!',
      'Â¿CÃ³mo funciona? Piensa en dos imanes: cuando empujas los mismos polos juntos (Norte-Norte o Sur-Sur), se repelen. Ahora imagina miles de imanes sÃºper poderosos haciendo esto debajo de un tren. La fuerza de repulsiÃ³n levanta todo el tren de la vÃ­a. Imanes guÃ­a a los lados lo mantienen centrado.',
      'El efecto Meissner es el verdadero superpoder: cuando ciertos materiales se enfrÃ­an por debajo de una temperatura crÃ­tica, se convierten en superconductores y expulsan completamente los campos magnÃ©ticos. Esto significa que un imÃ¡n colocado sobre un superconductor flotarÃ¡ â€” es empujado fÃ­sicamente por el campo expulsado. Es real, se demuestra en laboratorios de todo el mundo, y es la base de los trenes mÃ¡s rÃ¡pidos de la Tierra.',
    ],
    fact: 'El Maglev de ShanghÃ¡i acelera de 0 a 431 km/h en solo 2 minutos. El viaje del aeropuerto a la ciudad toma solo 7 minutos y 20 segundos. Durante el viaje, puedes sostener una moneda de canto sobre la bandeja Â¡y no se cae! â€” no hay vibraciÃ³n porque el tren nunca toca la vÃ­a.',
  },
  {
    id: 'lexus', title: 'El Hoverboard de Lexus (2015)', color: '#7C4DFF',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_lexus.png',
    image: '/assets/bttf/infographic_aeropatines/hero_lexus.png',
    content: [
      'En 2015 â€” el aÃ±o exacto que BTTF2 predijo los aeropatines â€” Lexus (la compaÃ±Ã­a de autos) revelÃ³ un aeropatÃ­n funcional REAL llamado Â«SLIDEÂ». Se veÃ­a como algo de la pelÃ­cula: elegante, humeante con vapor, flotando sobre el suelo. El mundo entero lo quiso saber. Y sÃ­, era real.',
      'CÃ³mo funciona: El SLIDE usa dos criostatos (contenedores) llenos de superconductores enfriados a -197Â°C usando nitrÃ³geno lÃ­quido. Los superconductores crean el efecto Meissner, que repele campos magnÃ©ticos. La tabla flota porque es empujada fÃ­sicamente lejos de los imanes incrustados en la superficie debajo.',
      'El truco: Lexus construyÃ³ un skatepark PERSONALIZADO en Barcelona, EspaÃ±a, con imanes permanentes ocultos bajo la superficie de concreto. El aeropatÃ­n SOLO funciona en esa pista especÃ­fica. LlÃ©valo a una banqueta normal y simplemente se queda ahÃ­. Â¡La pista magnÃ©tica costÃ³ millones de euros construir!',
      'El nitrÃ³geno lÃ­quido se acaba despuÃ©s de unos 10-20 minutos, asÃ­ que la tabla gradualmente se hunde mientras los superconductores se calientan. Los pilotos tenÃ­an que rellenar el nitrÃ³geno entre corridas. El skateboarder profesional Ross McGouran fue el primero en montarlo exitosamente. Le tomÃ³ semanas de prÃ¡ctica â€” Â¡flotar en una superficie sin fricciÃ³n NO es nada como patinar normalmente!',
      'Todo el proyecto fue una campaÃ±a publicitaria â€” Lexus gastÃ³ aproximadamente $10+ millones en el aeropatÃ­n para promover su marca. Pero la CIENCIA era 100% real. Sin trucos, sin cables, sin CGI. Pura fÃ­sica de superconductores. DemostrÃ³ que flotar sobre campos magnÃ©ticos es posible, solo que no (todavÃ­a) prÃ¡ctico.',
    ],
    fact: 'Cuando Ross McGouran intentÃ³ el aeropatÃ­n de Lexus por primera vez, Â¡se cayÃ³ inmediatamente! No hay fricciÃ³n contra quÃ© empujar â€” girar, frenar y balancearte son completamente diferentes al skateboarding. Dijo que era como Â«intentar pararte sobre una bola de hieloÂ». Le tomÃ³ 6 semanas de prÃ¡ctica dominar trucos bÃ¡sicos.',
  },
  {
    id: 'hendo', title: 'El Hendo Hoverboard y Tony Hawk', color: '#FF6B00',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_hendo.png',
    image: '/assets/bttf/infographic_aeropatines/hero_hendo.png',
    content: [
      'En 2014, un aÃ±o antes del proyecto Lexus, una compaÃ±Ã­a llamada Arx Pax creÃ³ el Hendo Hoverboard. Â¡El legendario skateboarder Tony Hawk fue uno de los primeros en montarlo! El video de Tony Hawk en un aeropatÃ­n real se hizo viral â€” fue como ver el futuro llegar.',
      'El Hendo usa una tecnologÃ­a completamente diferente a Lexus: la Ley de Lenz y corrientes de Foucault. Cuando un imÃ¡n se mueve cerca de una superficie conductora (como cobre o aluminio), crea corrientes elÃ©ctricas arremolinadas en el metal. Â¡Estas corrientes generan su propio campo magnÃ©tico que empuja CONTRA el imÃ¡n original! Mientras mÃ¡s rÃ¡pido te muevas, Â¡mÃ¡s fuerte la repulsiÃ³n!',
      'PiÃ©nsalo asÃ­: deja caer un imÃ¡n por un tubo de cobre. En vez de caer rÃ¡pido, se desliza lentamente â€” casi flotando. El cobre no es magnÃ©tico, pero el imÃ¡n en movimiento crea corrientes elÃ©ctricas que luchan contra su movimiento. El Hendo escala esto con imanes giratorios que crean una fuerza de flotaciÃ³n constante.',
      'La limitaciÃ³n: el Hendo SOLO funciona sobre superficies metÃ¡licas conductoras â€” lÃ¡minas de cobre o aluminio. LlÃ©valo afuera al concreto o asfalto y no pasa nada. Los fundadores, Greg y Jill Henderson, crearon la tecnologÃ­a de flotaciÃ³n para protecciÃ³n contra terremotos â€” Â¡su verdadero objetivo era levitar edificios enteros durante sismos!',
      'El Hendo 2.0 (su versiÃ³n mejorada) usÃ³ una campaÃ±a de Kickstarter y recaudÃ³ $510,590 dÃ³lares de 3,169 patrocinadores. El respaldo de Tony Hawk fue crucial. La tabla flota aproximadamente 2.5 cm sobre la superficie y puede soportar un jinete de hasta 136 kg. Suena como una aspiradora cuando funciona â€” Â¡los imanes giratorios crean un zumbido fuerte!',
    ],
    fact: 'Para financiar su primer modelo de aeropatÃ­n, Hendo lanzÃ³ una campaÃ±a en Kickstarter en 2014 con una meta de $250,000 dÃ³lares. El proyecto fue un Ã©xito masivo y recaudÃ³ mÃ¡s de $510,000. Los patrocinadores que aportaron $10,000 o mÃ¡s recibieron uno de los primeros diez aeropatines funcionales producidos.',
  },
  {
    id: 'newton', title: 'Las Leyes de Newton y la Gravedad', color: '#FFA500',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_newton.png',
    image: '/assets/bttf/infographic_aeropatines/hero_newton.png',
    content: [
      'Para entender los aeropatines, primero necesitas entender contra quÃ© estÃ¡s luchando: la gravedad. Isaac Newton (1687) descubriÃ³ que cada objeto con masa atrae a cada otro objeto con masa. La Tierra te jala hacia abajo con una fuerza calculada por F = m Ã— g, donde g = 9.8 m/sÂ². Eso significa que por cada kilogramo que pesas, Â¡la Tierra te jala con 9.8 Newtons de fuerza!',
      'Experimento sencillo: sostÃ©n un libro en tu mano. Â¿Sientes el peso? Eso es la gravedad jalÃ¡ndolo hacia abajo a 9.8 m/sÂ². Ahora piensa: tus mÃºsculos empujan HACIA ARRIBA con exactamente la misma fuerza. El libro no se mueve porque las fuerzas se cancelan. Un aeropatÃ­n hace lo mismo â€” empuja hacia arriba con una fuerza magnÃ©tica o electromagnÃ©tica igual a la de la gravedad.',
      'Gravedad en otros mundos: en la Luna, g = 1.6 m/sÂ² (aproximadamente 1/6 de la Tierra). Â¡Un niÃ±o de 60 kg pesa 588 Newtons en la Tierra pero solo 96 Newtons en la Luna! PodrÃ­as saltar 6 veces mÃ¡s alto. En JÃºpiter, g = 24.8 m/sÂ² â€” pesarÃ­as 2.5 veces mÃ¡s y un aeropatÃ­n necesitarÃ­a 2.5 veces mÃ¡s potencia para levantarte.',
      'La Tercera Ley de Newton es el secreto de los aeropatines: Â«Para cada acciÃ³n, hay una reacciÃ³n igual y opuestaÂ». Cuando los imanes empujan HACIA ABAJO sobre una superficie conductora, la superficie empuja al aeropatÃ­n HACIA ARRIBA. El par acciÃ³n-reacciÃ³n crea la flotaciÃ³n. AsÃ­ tambiÃ©n funcionan los cohetes â€” el gas caliente empuja hacia abajo, el cohete empuja hacia arriba.',
      'Dato de gravedad divertido: Â¡si sueltas una pluma y una bola de boliche en el vacÃ­o (sin aire), tocan el suelo al EXACTO mismo tiempo! Galileo descubriÃ³ esto en los 1600s, y el astronauta del Apollo 15, David Scott, lo demostrÃ³ en la Luna en 1971 dejando caer un martillo y una pluma. En el vacÃ­o, todo cae a la misma velocidad porque la gravedad acelera todos los objetos por igual.',
    ],
    fact: 'En 1971, el astronauta del Apollo 15 David Scott se parÃ³ en la Luna y soltÃ³ un martillo y una pluma al mismo tiempo en televisiÃ³n en vivo. Golpearon la superficie lunar simultÃ¡neamente. Dijo Â«Â¡QuÃ© tal! Esto demuestra que el Sr. Galileo tenÃ­a razÃ³n.Â» El video ha sido visto mÃ¡s de 20 millones de veces en YouTube.',
  },
  {
    id: 'quantum', title: 'LevitaciÃ³n CuÃ¡ntica: Flux Pinning', color: '#00E676',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_quantum.png',
    image: '/assets/bttf/infographic_aeropatines/hero_quantum.png',
    content: [
      'La levitaciÃ³n cuÃ¡ntica es uno de los fenÃ³menos mÃ¡s asombrosos de la fÃ­sica. Un disco superconductor, enfriado con nitrÃ³geno lÃ­quido a -196Â°C, puede colocarse sobre una pista magnÃ©tica y se BLOQUEARÃ en el aire. No solo flota â€” se BLOQUEA. Puedes empujarlo y regresa a su posiciÃ³n. Puedes voltear la pista de cabeza y el disco cuelga debajo sin caerse. Â¡Es increÃ­ble!',
      'Este fenÃ³meno se llama Â«flux pinningÂ» o Â«bloqueo cuÃ¡nticoÂ». Cuando un superconductor Tipo II se enfrÃ­a, diminutos tubos de campo magnÃ©tico (llamados tubos de flujo o vÃ³rtices) quedan atrapados dentro de imperfecciones microscÃ³picas del superconductor. Estos tubos actÃºan como pines que bloquean al superconductor en una posiciÃ³n especÃ­fica dentro del campo magnÃ©tico.',
      'La demostraciÃ³n mÃ¡s famosa fue del Dr. Boaz Almog en la Universidad de Tel Aviv en 2011. Su charla TED mostrando un disco superconductor flotando sobre una pista circular se hizo viral con mÃ¡s de 5 millones de vistas. El disco se mueve suavemente por la pista como un aeropatÃ­n real â€” sin fricciÃ³n, silencioso, mÃ¡gico.',
      'Â¿Por quÃ© es Â«cuÃ¡nticaÂ»? Porque la superconductividad misma es un fenÃ³meno de mecÃ¡nica cuÃ¡ntica. Debajo de la temperatura crÃ­tica, los electrones en el material forman Â«pares de CooperÂ» que se mueven sin resistencia. Estos electrones emparejados crean un estado cuÃ¡ntico donde la corriente elÃ©ctrica fluye para siempre sin perder energÃ­a. Es literalmente un milagro cuÃ¡ntico ocurriendo a escala macroscÃ³pica (visible).',
      'Aplicaciones reales hoy: la levitaciÃ³n cuÃ¡ntica se usa en algunos prototipos maglev y ha sido propuesta para rodamientos sin fricciÃ³n en volantes de inercia para almacenamiento de energÃ­a. CientÃ­ficos del MIT la estÃ¡n explorando para infraestructura de computaciÃ³n cuÃ¡ntica. La principal limitaciÃ³n es la temperatura â€” mantener las cosas a -196Â°C requiere nitrÃ³geno lÃ­quido constante. Si alguien inventa un superconductor a temperatura ambiente, los aeropatines de levitaciÃ³n cuÃ¡ntica se vuelven posibles.',
    ],
    fact: 'En la Universidad de Tel Aviv, el Dr. Boaz Almog demostrÃ³ un disco superconductor de solo 0.5 mm de espesor â€” mÃ¡s delgado que una tarjeta de crÃ©dito â€” flotando en una pista magnÃ©tica cargando 70,000 veces su propio peso. InclinÃ³ la pista a 90 grados y el disco se quedÃ³ bloqueado. La volteÃ³ de cabeza y el disco colgÃ³ sin caerse. La audiencia quedÃ³ boquiabierta.',
  },
  {
    id: 'electro', title: 'SuspensiÃ³n EM en la Vida Real', color: '#FFD740',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_electro.png',
    image: '/assets/bttf/infographic_aeropatines/hero_electro.png',
    content: [
      'La suspensiÃ³n electromagnÃ©tica (EMS) se usa todos los dÃ­as en tecnologÃ­a real. El ejemplo mÃ¡s visible: trenes maglev. Pero EMS tambiÃ©n aparece en lugares inesperados. Los rodamientos magnÃ©ticos en turbinas industriales eliminan la fricciÃ³n. Algunos elevadores experimentales usan levitaciÃ³n electromagnÃ©tica. Â¡Hasta tu disco duro tiene un cabezal de lectura-escritura que Â«vuelaÂ» sobre un colchÃ³n de aire a solo nanÃ³metros sobre el disco giratorio!',
      'Hay dos tipos principales: EMS (suspensiÃ³n electromagnÃ©tica) usa atracciÃ³n â€” los electroimanes son jalados HACIA ARRIBA hacia un riel ferromagnÃ©tico arriba. EDS (suspensiÃ³n electrodinÃ¡mica) usa repulsiÃ³n â€” los imanes en movimiento crean corrientes de Foucault en una vÃ­a conductora que empujan el vehÃ­culo HACIA ARRIBA. Ambos funcionan, pero EDS requiere alta velocidad para generar suficiente sustentaciÃ³n.',
      'El concepto Hyperloop (propuesto por Elon Musk en 2013) combina levitaciÃ³n electromagnÃ©tica con tubos de casi-vacÃ­o. Al eliminar la resistencia del aire Y la fricciÃ³n de la vÃ­a, los vehÃ­culos podrÃ­an teÃ³ricamente viajar a mÃ¡s de 1,000 km/h. Virgin Hyperloop logrÃ³ la primera prueba con humanos en 2020 en el desierto de Nevada â€” dos pasajeros viajaron a velocidad modesta pero en un tubo de vacÃ­o real.',
      'Las turbinas eÃ³licas de levitaciÃ³n magnÃ©tica son una innovaciÃ³n real: el eje de la turbina flota sobre imanes en vez de rodamientos mecÃ¡nicos. Esto elimina pÃ©rdidas por fricciÃ³n (los rodamientos desperdician 5-10% de energÃ­a), reduce el ruido y extiende la vida Ãºtil de la turbina. Â¡Ingenieros chinos han construido turbinas MagLev que generan energÃ­a con vientos de solo 1.5 m/s! â€” las turbinas regulares necesitan al menos 3-4 m/s.',
      'La levitaciÃ³n acÃºstica es otra forma real de flotar: usando ondas sonoras enfocadas, puedes suspender objetos pequeÃ±os en el aire. Funciona con gotas de agua, pequeÃ±as cuentas, e incluso insectos pequeÃ±os (sin hacerles daÃ±o). CientÃ­ficos de la Universidad de Bristol crearon un Â«rayo tractorÂ» usando 64 bocinas diminutas que pueden mover objetos por el aire usando solo sonido. No es anti-gravedad, Â¡pero SÃ es levitaciÃ³n real!',
    ],
    fact: 'Dentro del disco duro de tu computadora, el cabezal de lectura-escritura Â«vuelaÂ» a solo 3-5 nanÃ³metros sobre el disco giratorio â€” eso es aproximadamente 1/20,000 del ancho de un cabello humano. Si el cabezal fuera un Boeing 747, estarÃ­a volando a 800 km/h a solo 1 milÃ­metro sobre el suelo. Cualquier partÃ­cula de polvo a esa escala serÃ­a como una montaÃ±a. Por eso los discos duros estÃ¡n sellados.',
  },
  {
    id: 'futuro-antgrav', title: 'El Futuro de la Antigravedad', color: '#FF5252',
    btnImage: '/assets/bttf/infographic_aeropatines/btn_futuro.png',
    image: '/assets/bttf/infographic_aeropatines/hero_futuro.png',
    content: [
      'Lo que SABEMOS que funciona hoy: levitaciÃ³n magnÃ©tica (trenes maglev), levitaciÃ³n cuÃ¡ntica con superconductores (demostraciones de laboratorio), suspensiÃ³n electromagnÃ©tica (rodamientos industriales), levitaciÃ³n acÃºstica (objetos pequeÃ±os sobre ondas sonoras) y flotaciÃ³n por Ley de Lenz (tabla Hendo sobre superficies de cobre). Todo es REAL, probado y usado.',
      'Lo que NO sabemos aÃºn: si la verdadera antigravedad (cancelar la fuerza gravitacional misma) es posible. El gravitÃ³n â€” la partÃ­cula teÃ³rica que transporta la fuerza gravitacional â€” nunca ha sido detectado. Si pudiÃ©ramos manipular gravitones de la misma forma que manipulamos fotones (luz), podrÃ­amos teÃ³ricamente crear campos antigravitacionales. Pero esto estÃ¡ muy lejos de la ciencia actual.',
      'El laboratorio Eagleworks de la NASA (oficialmente el Laboratorio de FÃ­sica de PropulsiÃ³n Avanzada) ha probado conceptos controversiales como el Â«EmDriveÂ» â€” un motor que aparentaba crear empuje sin propelente. Los resultados iniciales fueron emocionantes pero experimentos posteriores mostraron que el efecto probablemente era error de mediciÃ³n. La ciencia real requiere pruebas rigurosas, y afirmaciones extraordinarias necesitan evidencia extraordinaria.',
      'Los metamateriales son una frontera emocionante: materiales diseÃ±ados con estructuras mÃ¡s pequeÃ±as que la longitud de onda de las ondas con las que interactÃºan. Los cientÃ­ficos han creado metamateriales que curvan la luz alrededor de objetos (Â¡capas de invisibilidad!). Â¿PodrÃ­an principios similares funcionar para la gravedad? Algunos fÃ­sicos teorizan que los metamateriales gravitacionales podrÃ­an algÃºn dÃ­a blindar o redirigir ondas gravitacionales.',
      'El sueÃ±o de un aeropatÃ­n personal no ha muerto â€” estÃ¡ evolucionando. Los superconductores a temperatura ambiente (si se logran) revolucionarÃ­an todo. En 2023, un equipo coreano afirmÃ³ haber creado uno (llamado LK-99) pero otros laboratorios no pudieron replicarlo. La bÃºsqueda continÃºa. Mientras tanto, las tablas de vuelo con drones (como el Omni Hoverboard de Catalin Alexandru Duru, que volÃ³ 275.9 metros en 2015, rÃ©cord Guinness) demuestran que Â¡el vuelo personal SÃ es alcanzable!',
    ],
    fact: 'En 2015, el inventor canadiense Catalin Alexandru Duru estableciÃ³ el RÃ©cord Guinness para el vuelo mÃ¡s largo en aeropatÃ­n: 275.9 metros a una altura de 5 metros. Su tabla usaba hÃ©lices de dron, no imanes. En 2019, el inventor francÃ©s Franky Zapata cruzÃ³ el Canal de la Mancha en su Flyboard Air â€” 35 km en 22 minutos a velocidades de hasta 170 km/h y alturas de hasta 15 metros. Literalmente volÃ³ sobre el mar en un aeropatÃ­n.',
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
        style={{ width: '100%', height: '100%', borderRadius: 5, objectFit: 'cover', filter: isActive ? 'saturate(1.3) brightness(1.1)' : 'saturate(0.85) brightness(0.9)' }}  loading="lazy" />
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
        {node.title.length > 14 ? node.title.slice(0, 13) + 'â€¦' : node.title}
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

      {/* â”€â”€â”€ HERO: two-column (estÃ¡ndar Abu Simbel) â”€â”€â”€ */}
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
                  position: 'absolute', top: -8, left: 12,
                  background: node.color, color: '#0a0a1a',
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
                ðŸ›¹ Â¡Has dominado la Antigravedad!
              </p>
              <p style={{ fontSize: 14, color: '#ccc', margin: 0 }}>
                Ahora puedes tomar el quiz para ganar tu insignia de Ingeniero Antigravitacional
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* â”€â”€â”€ BibliografÃ­a â”€â”€â”€ */}
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
              <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>â€¢ {ref}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
