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
};

const BIBLIOGRAPHY = [
  'Einstein, A. (1905). \'Zur Elektrodynamik bewegter KÃ¶rper\', Annalen der Physik, 17',
  'Faraday, M. (1832). \'Experimental Researches in Electricity\', Philosophical Transactions',
  'Everett, H. (1957). \'Relative State Formulation of Quantum Mechanics\', Reviews of Modern Physics, 29',
  'Novikov, I.D. (1989). \'An Analysis of the Operation of a Time Machine\', Soviet Physics JETP, 68',
  'Hawking, S. (1988). A Brief History of Time, Bantam Books',
  'Gott, J.R. (2001). Time Travel in Einstein\'s Universe, Houghton Mifflin'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'maquina-tiempo',
    title: 'La MÃ¡quina del Tiempo',
    color: '#6EC6FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_maquina.png',
    image: '/assets/bttf/infographic_condensador/hero_maquina.png',
    content: [
      'Â¡Imagina que pudieras construir una mÃ¡quina para viajar al pasado y conocer a tus abuelos cuando eran niÃ±os! El viaje en el tiempo es un concepto que la fÃ­sica moderna estudia seriamente. En la pelÃ­cula Regreso al Futuro (1985), esta idea cobra vida de una manera espectacular. En lugar de una caja aburrida, el inventor Doc Brown utiliza un coche deportivo DeLorean para saltar a travÃ©s de las dÃ©cadas.',
      'Pero, Â¿es posible construir una mÃ¡quina asÃ­ en la vida real? Desde hace siglos, los cientÃ­ficos se han hecho esa misma pregunta. Para nosotros, el tiempo parece avanzar siempre en una sola direcciÃ³n, como un rÃ­o que nunca fluye hacia atrÃ¡s. Sin embargo, la fÃ­sica moderna nos dice que el tiempo es mucho mÃ¡s misterioso de lo que parece a simple vista.',
      'Para entender cÃ³mo podrÃ­a funcionar una mÃ¡quina del tiempo, primero debemos entender quÃ© es el tiempo en sÃ­ mismo. A lo largo de la historia, nuestra forma de ver el tiempo ha cambiado radicalmente. Pasamos de creer que era como un reloj gigante e inmutable, a descubrir que en realidad es flexible y se puede estirar. Cada nuevo descubrimiento nos acerca mÃ¡s a comprender si el viaje temporal es ciencia o solo ficciÃ³n.',
      'Aunque todavÃ­a no podemos ir a comprar plutonio a la tienda de la esquina ni viajar a 1955, los fÃ­sicos teÃ³ricos estudian las matemÃ¡ticas detrÃ¡s del viaje en el tiempo. Usan ecuaciones complejas para ver si el universo permite, aunque sea en teorÃ­a, que algo viaje hacia el pasado. Â¡Y los resultados son alucinantes! PrepÃ¡rate para un viaje por la ciencia mÃ¡s asombrosa del universo.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Doc Brown revela por primera vez su mÃ¡quina del tiempo a Marty McFly en el aparcamiento del centro comercial Twin Pines Mall. En esta escena icÃ³nica, vemos al DeLorean salir marcha atrÃ¡s del camiÃ³n envuelto en humo. Â¡Es el momento exacto en que la historia del cine cambiÃ³ para siempre!' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El director Robert Zemeckis y el escritor Bob Gale tuvieron la idea original de la pelÃ­cula cuando Bob encontrÃ³ el anuario del instituto de su padre. Se preguntÃ³: "Si hubiera ido al instituto con mi padre, Â¿habrÃ­amos sido amigos?". Â¡Esa simple pregunta dio origen a toda la aventura!' }
    ],
    fact: 'Aunque el viaje al pasado sigue siendo ficciÃ³n, los astronautas en la EstaciÃ³n Espacial Internacional viajan literalmente al futuro. Como se mueven tan rÃ¡pido, el tiempo pasa ligeramente mÃ¡s despacio para ellos. Â¡Cuando regresan a la Tierra, son unos milisegundos mÃ¡s jÃ³venes de lo que habrÃ­an sido!'
  },
  {
    id: 'tiempo-newton',
    title: 'El Tiempo de Newton',
    color: '#FFD740',
    btnImage: '/assets/bttf/infographic_condensador/btn_newton.png',
    image: '/assets/bttf/infographic_condensador/hero_newton.png',
    content: [
      'Imagina el universo como un enorme reloj de cuerda, preciso y exacto. AsÃ­ es como el brillante cientÃ­fico Isaac Newton imaginaba el tiempo en el siglo XVII. Para Ã©l, el tiempo era absoluto y universal. Esto significaba que un segundo en la Tierra duraba exactamente lo mismo que un segundo en Marte, o en la galaxia mÃ¡s lejana. El tiempo simplemente avanzaba, sin que nada pudiera alterarlo.',
      'SegÃºn esta visiÃ³n clÃ¡sica, el tiempo era como el escenario vacÃ­o donde ocurrÃ­an los eventos del universo, pero el escenario nunca cambiaba. PodÃ­as ir rÃ¡pido o despacio, pero el reloj del universo seguÃ­a haciendo \'tic-tac\' al mismo ritmo para todos. Esta idea tenÃ­a mucho sentido comÃºn. DespuÃ©s de todo, es lo que experimentamos todos los dÃ­as en nuestras vidas.',
      'En el universo mecÃ¡nico de Newton, si conocÃ­as la posiciÃ³n y la velocidad de todas las partÃ­culas del universo en este instante, podÃ­as calcular exactamente dÃ³nde estarÃ­an en el futuro y dÃ³nde estuvieron en el pasado. Era un universo predecible. Si esto fuera 100% cierto, el viaje en el tiempo serÃ­a absolutamente imposible, porque el tiempo serÃ­a una pista rÃ­gida de una sola direcciÃ³n.',
      'Aunque la fÃ­sica de Newton nos permitiÃ³ enviar cohetes a la Luna y construir los edificios en los que vivimos, resultÃ³ que no contaba toda la historia sobre el tiempo. A principios del siglo XX, un joven empleado de patentes llamado Albert Einstein replantearÃ­a esta visiÃ³n universal, proponiendo que el tiempo es en realidad flexible y dependiente del observador.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'El reloj de la torre del ayuntamiento de Hill Valley es un sÃ­mbolo perfecto del tiempo newtoniano: firme, inamovible y marcando el ritmo de todo el pueblo. Cuando un rayo lo detiene en 1955, representa cÃ³mo un evento extraordinario puede congelar el flujo normal del tiempo.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'Las ecuaciones de movimiento de Newton funcionan tan bien para nuestra vida cotidiana que los ingenieros de la NASA todavÃ­a las usan hoy en dÃ­a para calcular las trayectorias de las sondas espaciales que viajan a otros planetas. Solo necesitan corregirlas ligeramente para misiones muy especiales.' }
    ],
    fact: 'El propio Isaac Newton no estaba del todo feliz con su idea del tiempo absoluto, porque no podÃ­a explicar de dÃ³nde venÃ­a. Lo aceptÃ³ porque hacÃ­a que sus matemÃ¡ticas sobre la gravedad funcionaran a la perfecciÃ³n. Â¡A veces, en ciencia, tienes que aceptar algo misterioso para poder avanzar!'
  },
  {
    id: 'einstein-relativo',
    title: 'El Tiempo ElÃ¡stico',
    color: '#B388FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_einstein.png',
    image: '/assets/bttf/infographic_condensador/hero_einstein.png',
    content: [
      'En 1905, Albert Einstein revolucionÃ³ la ciencia al proponer que el tiempo no transcurre igual para todos. DescubriÃ³ que el tiempo es relativo, lo que significa que pasa a diferente velocidad dependiendo de lo rÃ¡pido que te muevas. Imagina que el tiempo es como una goma elÃ¡stica: si viajas muy rÃ¡pido, la goma se estira y el tiempo pasa mÃ¡s despacio para ti que para alguien que estÃ¡ quieto.',
      'Esto se llama \'dilataciÃ³n temporal\'. Y no es solo una mera teorÃ­a, Â¡se ha comprobado con relojes atÃ³micos ultraprecisos! Si subes un reloj a un aviÃ³n rÃ¡pido y lo comparas con otro que se quedÃ³ en tierra, el reloj del aviÃ³n marcarÃ¡ una hora ligeramente anterior. A velocidades normales no lo notamos, pero si viajaras al 99.9% de la velocidad de la luz, Â¡el tiempo para ti pasarÃ­a 22 veces mÃ¡s lento!',
      'Esto significa que el viaje al futuro es cientÃ­ficamente real. Si te subes a una nave espacial sÃºper rÃ¡pida, das una vuelta por el espacio durante lo que para ti es 1 aÃ±o, y luego vuelves a la Tierra, podrÃ­as encontrar que aquÃ­ han pasado 20 aÃ±os. TÃº solo habrÃ­as envejecido un aÃ±o, pero tus amigos serÃ­an dos dÃ©cadas mayores. Â¡HabrÃ­as viajado al futuro de la Tierra!',
      'Einstein tambiÃ©n descubriÃ³ que la gravedad afecta al tiempo. Cerca de un objeto muy masivo, como la Tierra o un agujero negro, el tiempo transcurre mÃ¡s lentamente que en el espacio profundo. AsÃ­ que el espacio y el tiempo no estÃ¡n separados, sino entrelazados en algo que Ã©l llamÃ³ \'espacio-tiempo\'. Â¡Es como un tejido cÃ³smico que puede doblarse, estirarse y curvarse!'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Doc Brown nombra a su perro Einstein en honor al famoso fÃ­sico. Como primera prueba, Doc pone a Einstein en el DeLorean y lo envÃ­a un minuto hacia el futuro. El perro llega perfectamente a salvo, habiendo "saltado" un minuto del tiempo del aparcamiento.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El sistema GPS de tu telÃ©fono mÃ³vil no funcionarÃ­a si no tomÃ¡ramos en cuenta a Einstein. Los satÃ©lites GPS se mueven rÃ¡pido y tienen menos gravedad que nosotros en la Tierra. Si no corrigiÃ©ramos la hora por la dilataciÃ³n temporal de la relatividad, los mapas del mÃ³vil fallarÃ­an por varios kilÃ³metros en solo un dÃ­a.' }
    ],
    fact: 'El astronauta ruso Sergei Krikalev tiene el rÃ©cord del mayor salto temporal humano. PasÃ³ 803 dÃ­as en el espacio viajando a 27,000 km/h. Por la dilataciÃ³n del tiempo, Â¡viajÃ³ 0.02 segundos hacia el futuro! Sus cÃ©lulas son 0.02 segundos mÃ¡s jÃ³venes que si se hubiera quedado en la Tierra.'
  },
  {
    id: 'flecha-tiempo',
    title: 'La Flecha del Tiempo',
    color: '#FF8A80',
    btnImage: '/assets/bttf/infographic_condensador/btn_flecha.png',
    image: '/assets/bttf/infographic_condensador/hero_flecha.png',
    content: [
      'Â¿Por quÃ© puedes romper un huevo para hacer una tortilla, pero no puedes convertir una tortilla en un huevo entero? Esta pregunta aparentemente tonta esconde uno de los mayores secretos de la fÃ­sica: la \'Flecha del Tiempo\'. En nuestro universo, las cosas tienden a pasar del orden al desorden. A este desorden creciente los cientÃ­ficos lo llaman \'entropÃ­a\'.',
      'La Segunda Ley de la TermodinÃ¡mica dice que la entropÃ­a (el desorden) del universo siempre aumenta. Piensa en tu habitaciÃ³n: si no la ordenas activamente, se vuelve mÃ¡s desordenada con el tiempo, nunca se ordena sola mÃ¡gicamente. Esta ley es la razÃ³n por la que el tiempo parece tener una sola direcciÃ³n. El futuro siempre serÃ¡ mÃ¡s desordenado que el pasado.',
      'Si pudieras ver una pelÃ­cula de cristal rompiÃ©ndose, sabrÃ­as inmediatamente si la cinta estÃ¡ avanzando o retrocediendo. Pero curiosamente, a nivel de los Ã¡tomos individuales, las leyes de la fÃ­sica funcionan igual hacia adelante que hacia atrÃ¡s. Si ves chocar dos Ã¡tomos de billar, no podrÃ­as decir si el video va hacia adelante o en reversa. La flecha del tiempo solo aparece cuando tenemos MUCHOS Ã¡tomos juntos.',
      'Viajar al pasado significa luchar contra esta flecha del tiempo. SignificarÃ­a ir de un estado de mayor entropÃ­a a uno de menor entropÃ­a, obligando al universo a \'ordenarse\' de nuevo. Por eso a la naturaleza no le gusta el viaje al pasado. Â¡Es como intentar que todo el humo de una fogata vuelva a entrar en un trozo de madera quemada!'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Cuando Marty altera el pasado y evita que sus padres se enamoren, vemos que la fotografÃ­a de su familia comienza a borrarse lentamente. Sus hermanos desaparecen uno por uno. Esto ilustra la "entropÃ­a de la causalidad": al cambiar la causa en el pasado, el efecto futuro se desvanece.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'Algunos fÃ­sicos creen que la flecha del tiempo solo existe por las condiciones especiales del Big Bang. El universo comenzÃ³ en un estado de bajÃ­sima entropÃ­a (muy ordenado). Como si el universo fuera un reloj de cuerda que se tensÃ³ al mÃ¡ximo al principio y lleva 13,800 millones de aÃ±os desenrollÃ¡ndose.' }
    ],
    fact: 'El fÃ­sico Arthur Eddington fue quien inventÃ³ el tÃ©rmino "Flecha del Tiempo" en 1927. Se dio cuenta de que si las leyes matemÃ¡ticas no distinguen entre el pasado y el futuro, tenÃ­a que haber una "flecha" termodinÃ¡mica que nos dijera hacia dÃ³nde fluyen las cosas en la realidad.'
  },
  {
    id: 'paradoja-causal',
    title: 'La Paradoja del Abuelo',
    color: '#CE93D8',
    btnImage: '/assets/bttf/infographic_condensador/btn_paradoja.png',
    image: '/assets/bttf/infographic_condensador/hero_paradoja.png',
    content: [
      'El mayor dolor de cabeza del viaje temporal se llama la Paradoja del Abuelo. Funciona asÃ­: imagÃ­nate que viajas al pasado y, por accidente, impides que tus abuelos se conozcan. Si no se conocen, uno de tus padres nunca nace. Si tu padre no nace, Â¡tÃº tampoco naces! Pero si tÃº no naciste, Â¿quiÃ©n viajÃ³ al pasado para impedir que se conocieran? Es un verdadero rompecabezas lÃ³gico.',
      'En fÃ­sica, esto se llama una violaciÃ³n de la causalidad. La causa (tÃº viajando al pasado) elimina el efecto (tÃº naciendo), lo cual elimina la causa. Es un bucle sin sentido. Algunos fÃ­sicos creen que esto demuestra que viajar al pasado es imposible. Las leyes de la naturaleza simplemente impedirÃ­an que construyeras la mÃ¡quina para evitar este lÃ­o matemÃ¡tico.',
      'Pero hay otras dos soluciones teÃ³ricas posibles. La primera es la teorÃ­a de los \'Muchos Mundos\' o universos paralelos de Hugh Everett (1957). Si viajas al pasado y cambias algo, en realidad estÃ¡s creando una nueva rama en la lÃ­nea temporal. Tu universo original sigue existiendo sin ti, pero ahora tÃº estÃ¡s en un universo paralelo donde la historia es diferente.',
      'La otra soluciÃ³n brillante es el Principio de Autoconsistencia de Igor Novikov (1989). Dice que si viajas al pasado, hagas lo que hagas, ya formaba parte de la historia. Si intentas impedir que tus abuelos se conozcan, te resbalarÃ¡s, chocarÃ¡s con ellos, Â¡y resultarÃ¡s ser la causa por la que se conocieron! El universo se auto-corrige para que la historia sea una historia coherente y sin paradojas.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Marty se enfrenta directamente a la paradoja del abuelo (Â¡o de los padres!). Al empujar a su padre fuera del camino del coche del abuelo de Lorraine, Ã©l ocupa su lugar y su madre se enamora de Ã©l. Pasa el resto de la pelÃ­cula intentando desesperadamente arreglar este error causal para asegurar su propia existencia.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'En 2020, investigadores de la Universidad de Queensland demostraron matemÃ¡ticamente que, a nivel cuÃ¡ntico, un sistema puede viajar al pasado e interactuar consigo mismo sin crear paradojas. Las matemÃ¡ticas se "ajustan" solas para evitar la contradicciÃ³n, tal como predecÃ­a la teorÃ­a de Novikov.' }
    ],
    fact: 'Stephen Hawking odiaba las paradojas temporales. Propuso que las leyes de la fÃ­sica deben tener un mecanismo de defensa incorporado (que Ã©l llamÃ³ "ProtecciÃ³n de la CronologÃ­a") que impide viajar al pasado, Â¡solo para mantener el universo a salvo de los viajeros temporales!'
  },
  {
    id: 'condensador-flujo',
    title: 'El Condensador de Flujo',
    color: '#00E5FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_condensador.png',
    image: '/assets/bttf/infographic_condensador/hero_condensador.png',
    content: [
      'Hablemos del componente central de la mÃ¡quina: el Condensador de Flujo. Aunque fue inventado para la pelÃ­cula, su nombre suena increÃ­blemente cientÃ­fico. En el mundo real, un \'condensador\' es un componente electrÃ³nico que almacena energÃ­a, como una baterÃ­a temporal rÃ¡pida. Y el \'flujo\' se refiere a lÃ­neas de campo magnÃ©tico o electromagnÃ©tico cruzando un espacio. Â¡AsÃ­ que un condensador de flujo sonarÃ­a como algo que almacena energÃ­a magnÃ©tica extrema!',
      'En la ficciÃ³n, este aparato necesita generar 1.21 Gigavatios de energÃ­a para crear una ruptura en el continuo espacio-tiempo. Esta es una cantidad colosal de poder. Un Gigavatio equivale a mil millones de vatios. Para que te hagas una idea, Â¡un relÃ¡mpago gigante o una gran central nuclear producen aproximadamente 1.2 Gigavatios! Doc Brown no exageraba cuando decÃ­a que necesitaba mucha energÃ­a.',
      'Si quisiÃ©ramos curvar el espacio-tiempo de verdad (como proponÃ­a Einstein para crear tÃºneles o agujeros de gusano), necesitarÃ­amos mucha mÃ¡s energÃ­a que un rayo. NecesitarÃ­amos \'materia exÃ³tica\', un tipo teÃ³rico de materia que tiene masa negativa. Imagina una pelota de tenis que, si la empujas hacia la derecha, Â¡acelera hacia la izquierda! Esta extraÃ±a materia podrÃ­a mantener abierto un tÃºnel en el tiempo.',
      'El diseÃ±o en forma de \'Y\' del condensador de flujo, con sus luces parpadeantes y chispas, es el cerebro de la mÃ¡quina del tiempo. Canaliza la inmensa energÃ­a del plutonio (o del rayo) y la enfoca para envolver al DeLorean en una burbuja de espacio-tiempo. Dentro de la burbuja, las reglas normales de Einstein se suspenden, permitiendo que el coche resbale hacia el pasado o el futuro.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'El 5 de noviembre de 1955, Doc Brown resbalÃ³ en su baÃ±o mientras colgaba un reloj, se golpeÃ³ la cabeza con el lavabo, y al despertar tuvo la visiÃ³n de la forma en "Y". AsÃ­ naciÃ³ el condensador de flujo. Â¡A veces los mayores descubrimientos empiezan con un buen chichÃ³n en la cabeza!' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Cuando filmaron la pelÃ­cula, el departamento de arte construyÃ³ el condensador de flujo usando partes de una caja de conexiones elÃ©ctricas, luces LED parpadeantes y tubos de vidrio. Fue tan icÃ³nico que hoy en dÃ­a puedes comprar cargadores USB para el coche con su forma exacta.' }
    ],
    fact: 'El tÃ©rmino "1.21 Gigawatts" se hizo tan famoso que el Departamento de EnergÃ­a de EE.UU. a veces usa la broma en sus informes. Curiosamente, Bob Gale y Robert Zemeckis pronunciaron mal la palabra "gigawatts" como "jigowatts" en la pelÃ­cula, porque asÃ­ se lo pronunciÃ³ un asesor cientÃ­fico despistado.'
  },
  {
    id: 'legado-cientifico',
    title: 'Legado CientÃ­fico',
    color: '#FFAB91',
    btnImage: '/assets/bttf/infographic_condensador/btn_legado.png',
    image: '/assets/bttf/infographic_condensador/hero_legado.png',
    content: [
      'Â¿Puede una pelÃ­cula divertida de Hollywood cambiar la ciencia real? Â¡Absolutamente! Regreso al Futuro no solo rompiÃ³ la taquilla en 1985; tambiÃ©n encendiÃ³ la imaginaciÃ³n de toda una generaciÃ³n de futuros cientÃ­ficos, fÃ­sicos e ingenieros. Muchos investigadores cuÃ¡nticos de hoy en dÃ­a confiesan que su amor por el espacio-tiempo comenzÃ³ viendo un DeLorean acelerar a 88 millas por hora.',
      'La pelÃ­cula hizo que conceptos increÃ­blemente complejos, como las paradojas causales, las lÃ­neas de tiempo alternativas y el continuo espacio-tiempo, fueran fÃ¡ciles de entender para todo el mundo. Doc Brown usando una pizarra para explicar cÃ³mo se bifurca la historia en 1985 alternativo es quizÃ¡s la mejor clase de fÃ­sica teÃ³rica que se ha dado en el cine.',
      'Incluso hoy, los cientÃ­ficos que estudian la computaciÃ³n cuÃ¡ntica usan tÃ©rminos inspirados en el viaje en el tiempo. Las computadoras cuÃ¡nticas usan \'qubits\' que pueden existir en mÃºltiples estados a la vez, como si exploraran muchas lÃ­neas temporales alternativas para encontrar la respuesta correcta a un problema sÃºper complejo al mismo tiempo.',
      'El mayor legado de la mÃ¡quina del tiempo de Doc Brown no es si es posible construirla o no, sino su capacidad de motivar al pÃºblico general a pensar en conceptos complejos de la fÃ­sica moderna.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Al final de la trilogÃ­a, Doc le da a Marty y Jennifer un consejo maravilloso: "Vuestro futuro no ha sido escrito todavÃ­a. El de nadie lo estÃ¡. Vuestro futuro es el que vosotros os labrÃ©is, asÃ­ que haceos uno bueno". Es el mensaje definitivo sobre la ciencia y el libre albedrÃ­o.' },
      { label: 'Dato CientÃ­fico', icon: 'atom', text: 'El fÃ­sico Ronald Mallett, profesor en la Universidad de Connecticut, ha dedicado toda su vida a intentar construir una mÃ¡quina del tiempo real usando lÃ¡seres en rotaciÃ³n para curvar el espacio. DecidiÃ³ dedicar su vida a esto cuando leyÃ³ novelas de ciencia ficciÃ³n tras la muerte de su padre.' }
    ],
    fact: 'En el aÃ±o 2015 (el aÃ±o al que viaja Marty en la segunda pelÃ­cula), fÃ­sicos de la Universidad de Bristol nombraron a su nuevo simulador cuÃ¡ntico capaz de revertir la evoluciÃ³n de los fotones... "El Condensador de Flujo". Â¡Un homenaje cientÃ­fico total!'
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">FÃSICA NUCLEAR Y CUÃNTICA</text>
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
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.3px',
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
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
                position: 'absolute',
                ...pos,
                zIndex: 1,
                pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
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
        <span>Progreso de ExploraciÃ³n</span>
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
            Toca cada cÃ­rculo para explorar
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
                ðŸ† Â¡Has dominado los secretos de la MÃ¡quina del Tiempo!
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                Has explorado toda la ciencia detrÃ¡s de las mÃ¡quinas del tiempo. Â¿EstÃ¡s listo para poner a prueba tus conocimientos?
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
            Fuentes CientÃ­ficas y BibliografÃ­a
          </h5>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((item, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#00E5FF', opacity: 0.5 }}>â€¢</span>
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
