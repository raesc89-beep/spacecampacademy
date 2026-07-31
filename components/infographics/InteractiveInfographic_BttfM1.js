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
}; const BIBLIOGRAPHY = ['Einstein, A. (1905). \'Zur Elektrodynamik bewegter Körper\', Annalen der Physik, 17',
  'Faraday, M. (1832). \'Experimental Researches in Electricity\', Philosophical Transactions',
  'Everett, H. (1957). \'Relative State Formulation of Quantum Mechanics\', Reviews of Modern Physics, 29',
  'Novikov, I.D. (1989). \'An Analysis of the Operation of a Time Machine\', Soviet Physics JETP, 68',
  'Hawking, S. (1988). A Brief History of Time, Bantam Books',
  'Gott, J.R. (2001). Time Travel in Einstein\'s Universe, Houghton Mifflin'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'maquina-tiempo',
    title: 'La Máquina del Tiempo',
    color: '#6EC6FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_maquina.png',
    image: '/assets/bttf/infographic_condensador/hero_maquina.png',
    content: [
      '¡Imagina que pudieras construir una máquina para viajar al pasado y conocer a tus abuelos cuando eran niños! El viaje en el tiempo es un concepto que la física moderna estudia seriamente. En la película Regreso al Futuro (1985), esta idea cobra vida de una manera espectacular. En lugar de una caja aburrida, el inventor Doc Brown utiliza un coche deportivo DeLorean para saltar a través de las décadas.',
      'Pero, ¿es posible construir una máquina así en la vida real? Desde hace siglos, los científicos se han hecho esa misma pregunta. Para nosotros, el tiempo parece avanzar siempre en una sola dirección, como un río que nunca fluye hacia atrás. Sin embargo, la física moderna nos dice que el tiempo es mucho más misterioso de lo que parece a simple vista.',
      'Para entender cómo podría funcionar una máquina del tiempo, primero debemos entender qué es el tiempo en sí mismo. A lo largo de la historia, nuestra forma de ver el tiempo ha cambiado radicalmente. Pasamos de creer que era como un reloj gigante e inmutable, a descubrir que en realidad es flexible y se puede estirar. Cada nuevo descubrimiento nos acerca más a comprender si el viaje temporal es ciencia o solo ficción.',
      'Aunque todavía no podemos ir a comprar plutonio a la tienda de la esquina ni viajar a 1955, los físicos teóricos estudian las matemáticas detrás del viaje en el tiempo. Usan ecuaciones complejas para ver si el universo permite, aunque sea en teoría, que algo viaje hacia el pasado. ¡Y los resultados son alucinantes! Prepárate para un viaje por la ciencia más asombrosa del universo.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Doc Brown revela por primera vez su máquina del tiempo a Marty McFly en el aparcamiento del centro comercial Twin Pines Mall. En esta escena icónica, vemos al DeLorean salir marcha atrás del camión envuelto en humo. ¡Es el momento exacto en que la historia del cine cambió para siempre!' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El director Robert Zemeckis y el escritor Bob Gale tuvieron la idea original de la película cuando Bob encontró el anuario del instituto de su padre. Se preguntó: "Si hubiera ido al instituto con mi padre, ¿habríamos sido amigos?". ¡Esa simple pregunta dio origen a toda la aventura!' }
    ],
    fact: 'Aunque el viaje al pasado sigue siendo ficción, los astronautas en la Estación Espacial Internacional viajan literalmente al futuro. Como se mueven tan rápido, el tiempo pasa ligeramente más despacio para ellos. ¡Cuando regresan a la Tierra, son unos milisegundos más jóvenes de lo que habrían sido!'
  },
  {
    id: 'tiempo-newton',
    title: 'El Tiempo de Newton',
    color: '#FFD740',
    btnImage: '/assets/bttf/infographic_condensador/btn_newton.png',
    image: '/assets/bttf/infographic_condensador/hero_newton.png',
    content: [
      'Imagina el universo como un enorme reloj de cuerda, preciso y exacto. Así es como el brillante científico Isaac Newton imaginaba el tiempo en el siglo XVII. Para él, el tiempo era absoluto y universal. Esto significaba que un segundo en la Tierra duraba exactamente lo mismo que un segundo en Marte, o en la galaxia más lejana. El tiempo simplemente avanzaba, sin que nada pudiera alterarlo.',
      'Según esta visión clásica, el tiempo era como el escenario vacío donde ocurrían los eventos del universo, pero el escenario nunca cambiaba. Podías ir rápido o despacio, pero el reloj del universo seguía haciendo \'tic-tac\'al mismo ritmo para todos. Esta idea tenía mucho sentido común. Después de todo, es lo que experimentamos todos los días en nuestras vidas.',
      'En el universo mecánico de Newton, si conocías la posición y la velocidad de todas las partículas del universo en este instante, podías calcular exactamente dónde estarían en el futuro y dónde estuvieron en el pasado. Era un universo predecible. Si esto fuera 100% cierto, el viaje en el tiempo sería imposible, porque el tiempo sería una pista rígida de una sola dirección.',
      'Aunque la física de Newton nos permitió enviar cohetes a la Luna y construir los edificios en los que vivimos, resultó que no contaba toda la historia sobre el tiempo. A principios del siglo XX, un joven empleado de patentes llamado Albert Einstein replantearía esta visión universal, proponiendo que el tiempo es en realidad flexible y dependiente del observador.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El reloj de la torre del ayuntamiento de Hill Valley es un símbolo perfecto del tiempo newtoniano: firme, inamovible y marcando el ritmo de todo el pueblo. Cuando un rayo lo detiene en 1955, representa cómo un evento extraordinario puede congelar el flujo normal del tiempo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ecuaciones de movimiento de Newton funcionan tan bien para nuestra vida cotidiana que los ingenieros de la NASA todavía las usan hoy en día para calcular las trayectorias de las sondas espaciales que viajan a otros planetas. Solo necesitan corregirlas ligeramente para misiones muy especiales.' }
    ],
    fact: 'El propio Isaac Newton no estaba del todo feliz con su idea del tiempo absoluto, porque no podía explicar de dónde venía. Lo aceptó porque hacía que sus matemáticas sobre la gravedad funcionaran a la perfección. ¡A veces, en ciencia, tienes que aceptar algo misterioso para poder avanzar!'
  },
  {
    id: 'einstein-relativo',
    title: 'El Tiempo Elástico',
    color: '#B388FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_einstein.png',
    image: '/assets/bttf/infographic_condensador/hero_einstein.png',
    content: [
      'En 1905, Albert Einstein revolucionó la ciencia al proponer que el tiempo no transcurre igual para todos. Descubrió que el tiempo es relativo, lo que significa que pasa a diferente velocidad dependiendo de lo rápido que te muevas. Imagina que el tiempo es como una goma elástica: si viajas muy rápido, la goma se estira y el tiempo pasa más despacio para ti que para alguien que está quieto.',
      'Esto se llama \'dilatación temporal\'. Y no es solo una mera teoría, ¡se ha comprobado con relojes atómicos ultraprecisos! Si subes un reloj a un avión rápido y lo comparas con otro que se quedó en tierra, el reloj del avión marcará una hora ligeramente anterior. A velocidades normales no lo notamos, pero si viajaras al 99.9% de la velocidad de la luz, ¡el tiempo para ti pasaría 22 veces más lento!',
      'Esto significa que el viaje al futuro es científicamente real. Si te subes a una nave espacial súper rápida, das una vuelta por el espacio durante lo que para ti es 1 año, y luego vuelves a la Tierra, podrías encontrar que aquí han pasado 20 años. Tú solo habrías envejecido un año, pero tus amigos serían dos décadas mayores. ¡Habrías viajado al futuro de la Tierra!',
      'Einstein también descubrió que la gravedad afecta al tiempo. Cerca de un objeto muy masivo, como la Tierra o un agujero negro, el tiempo transcurre más lentamente que en el espacio profundo. Así que el espacio y el tiempo no están separados, sino entrelazados en algo que él llamó \'espacio-tiempo\'. ¡Es como un tejido cósmico que puede doblarse, estirarse y curvarse!'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Doc Brown nombra a su perro Einstein en honor al famoso físico. Como primera prueba, Doc pone a Einstein en el DeLorean y lo envía un minuto hacia el futuro. El perro llega perfectamente a salvo, habiendo "saltado" un minuto del tiempo del aparcamiento.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sistema GPS de tu teléfono móvil no funcionaría si no tomáramos en cuenta a Einstein. Los satélites GPS se mueven rápido y tienen menos gravedad que nosotros en la Tierra. Si no corrigiéramos la hora por la dilatación temporal de la relatividad, los mapas del móvil fallarían por varios kilómetros en solo un día.' }
    ],
    fact: 'El astronauta ruso Sergei Krikalev tiene el récord del mayor salto temporal humano. Pasó 803 días en el espacio viajando a 27,000 km/h. Por la dilatación del tiempo, ¡viajó 0.02 segundos hacia el futuro! Sus células son 0.02 segundos más jóvenes que si se hubiera quedado en la Tierra.'
  },
  {
    id: 'flecha-tiempo',
    title: 'La Flecha del Tiempo',
    color: '#FF8A80',
    btnImage: '/assets/bttf/infographic_condensador/btn_flecha.png',
    image: '/assets/bttf/infographic_condensador/hero_flecha.png',
    content: [
      '¿Por qué puedes romper un huevo para hacer una tortilla, pero no puedes convertir una tortilla en un huevo entero? Esta pregunta aparentemente tonta esconde uno de los mayores secretos de la física: la \'Flecha del Tiempo\'. En nuestro universo, las cosas tienden a pasar del orden al desorden. A este desorden creciente los científicos lo llaman \'entropía\'.',
      'La Segunda Ley de la Termodinámica dice que la entropía (el desorden) del universo siempre aumenta. Piensa en tu habitación: si no la ordenas activamente, se vuelve más desordenada con el tiempo, nunca se ordena sola mágicamente. Esta ley es la razón por la que el tiempo parece tener una sola dirección. El futuro siempre será más desordenado que el pasado.',
      'Si pudieras ver una película de cristal rompiéndose, sabrías inmediatamente si la cinta está avanzando o retrocediendo. Pero curiosamente, a nivel de los átomos individuales, las leyes de la física funcionan igual hacia adelante que hacia atrás. Si ves chocar dos átomos de billar, no podrías decir si el video va hacia adelante o en reversa. La flecha del tiempo solo aparece cuando tenemos MUCHOS átomos juntos.',
      'Viajar al pasado significa luchar contra esta flecha del tiempo. Significaría ir de un estado de mayor entropía a uno de menor entropía, obligando al universo a \'ordenarse\'de nuevo. Por eso a la naturaleza no le gusta el viaje al pasado. ¡Es como intentar que todo el humo de una fogata vuelva a entrar en un trozo de madera quemada!'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando Marty altera el pasado y evita que sus padres se enamoren, vemos que la fotografía de su familia comienza a borrarse lentamente. Sus hermanos desaparecen uno por uno. Esto ilustra la "entropía de la causalidad": al cambiar la causa en el pasado, el efecto futuro se desvanece.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Algunos físicos creen que la flecha del tiempo solo existe por las condiciones especiales del Big Bang. El universo comenzó en un estado de bajísima entropía (muy ordenado). Como si el universo fuera un reloj de cuerda que se tensó al máximo al principio y lleva 13,800 millones de años desenrollándose.' }
    ],
    fact: 'El físico Arthur Eddington fue quien inventó el término "Flecha del Tiempo"en 1927. Se dio cuenta de que si las leyes matemáticas no distinguen entre el pasado y el futuro, tenía que haber una"flecha" termodinámica que nos dijera hacia dónde fluyen las cosas en la realidad.'
  },
  {
    id: 'paradoja-causal',
    title: 'La Paradoja del Abuelo',
    color: '#CE93D8',
    btnImage: '/assets/bttf/infographic_condensador/btn_paradoja.png',
    image: '/assets/bttf/infographic_condensador/hero_paradoja.png',
    content: [
      'El mayor dolor de cabeza del viaje temporal se llama la Paradoja del Abuelo. Funciona así: imagínate que viajas al pasado y, por accidente, impides que tus abuelos se conozcan. Si no se conocen, uno de tus padres nunca nace. Si tu padre no nace, ¡tú tampoco naces! Pero si tú no naciste, ¿quién viajó al pasado para impedir que se conocieran? Es un verdadero rompecabezas lógico.',
      'En física, esto se llama una violación de la causalidad. La causa (tú viajando al pasado) elimina el efecto (tú naciendo), lo cual elimina la causa. Es un bucle sin sentido. Algunos físicos creen que esto demuestra que viajar al pasado es imposible. Las leyes de la naturaleza simplemente impedirían que construyeras la máquina para evitar este lío matemático.',
      'Pero hay otras dos soluciones teóricas posibles. La primera es la teoría de los \'Muchos Mundos\'o universos paralelos de Hugh Everett (1957). Si viajas al pasado y cambias algo, en realidad estás creando una nueva rama en la línea temporal. Tu universo original sigue existiendo sin ti, pero ahora tú estás en un universo paralelo donde la historia es diferente.',
      'La otra solución brillante es el Principio de Autoconsistencia de Igor Novikov (1989). Dice que si viajas al pasado, hagas lo que hagas, ya formaba parte de la historia. Si intentas impedir que tus abuelos se conozcan, te resbalarás, chocarás con ellos, ¡y resultarás ser la causa por la que se conocieron! El universo se auto-corrige para que la historia sea una historia coherente y sin paradojas.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Marty se enfrenta directamente a la paradoja del abuelo (¡o de los padres!). Al empujar a su padre fuera del camino del coche del abuelo de Lorraine, él ocupa su lugar y su madre se enamora de él. Pasa el resto de la película intentando desesperadamente arreglar este error causal para asegurar su propia existencia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 2020, investigadores de la Universidad de Queensland demostraron matemáticamente que, a nivel cuántico, un sistema puede viajar al pasado e interactuar consigo mismo sin crear paradojas. Las matemáticas se "ajustan" solas para evitar la contradicción, tal como predecía la teoría de Novikov.' }
    ],
    fact: 'Stephen Hawking odiaba las paradojas temporales. Propuso que las leyes de la física deben tener un mecanismo de defensa incorporado (que él llamó "Protección de la Cronología") que impide viajar al pasado, ¡solo para mantener el universo a salvo de los viajeros temporales!'
  },
  {
    id: 'condensador-flujo',
    title: 'El Condensador de Flujo',
    color: '#00E5FF',
    btnImage: '/assets/bttf/infographic_condensador/btn_condensador.png',
    image: '/assets/bttf/infographic_condensador/hero_condensador.png',
    content: [
      'Hablemos del componente central de la máquina: el Condensador de Flujo. Aunque fue inventado para la película, su nombre suena científico. En el mundo real, un \'condensador\'es un componente electrónico que almacena energía, como una batería temporal rápida. Y el \'flujo\'se refiere a líneas de campo magnético o electromagnético cruzando un espacio. ¡Así que un condensador de flujo sonaría como algo que almacena energía magnética extrema!',
      'En la ficción, este aparato necesita generar 1.21 Gigavatios de energía para crear una ruptura en el continuo espacio-tiempo. Esta es una cantidad colosal de poder. Un Gigavatio equivale a mil millones de vatios. Para que te hagas una idea, ¡un relámpago gigante o una gran central nuclear producen aproximadamente 1.2 Gigavatios! Doc Brown no exageraba cuando decía que necesitaba mucha energía.',
      'Si quisiéramos curvar el espacio-tiempo de verdad (como proponía Einstein para crear túneles o agujeros de gusano), necesitaríamos mucha más energía que un rayo. Necesitaríamos \'materia exótica\', un tipo teórico de materia que tiene masa negativa. Imagina una pelota de tenis que, si la empujas hacia la derecha, ¡acelera hacia la izquierda! Esta extraña materia podría mantener abierto un túnel en el tiempo.',
      'El diseño en forma de \'Y\'del condensador de flujo, con sus luces parpadeantes y chispas, es el cerebro de la máquina del tiempo. Canaliza la inmensa energía del plutonio (o del rayo) y la enfoca para envolver al DeLorean en una burbuja de espacio-tiempo. Dentro de la burbuja, las reglas normales de Einstein se suspenden, permitiendo que el coche resbale hacia el pasado o el futuro.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El 5 de noviembre de 1955, Doc Brown resbaló en su baño mientras colgaba un reloj, se golpeó la cabeza con el lavabo, y al despertar tuvo la visión de la forma en "Y". Así nació el condensador de flujo. ¡A veces los mayores descubrimientos empiezan con un buen chichón en la cabeza!' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando filmaron la película, el departamento de arte construyó el condensador de flujo usando partes de una caja de conexiones eléctricas, luces LED parpadeantes y tubos de vidrio. Fue tan icónico que hoy en día puedes comprar cargadores USB para el coche con su forma exacta.' }
    ],
    fact: 'El término "1.21 Gigawatts"se hizo tan famoso que el Departamento de Energía de EE.UU. A veces usa la broma en sus informes. Curiosamente, Bob Gale y Robert Zemeckis pronunciaron mal la palabra"gigawatts" como "jigowatts" en la película, porque así se lo pronunció un asesor científico despistado.'
  },
  {
    id: 'legado-cientifico',
    title: 'Legado Científico',
    color: '#FFAB91',
    btnImage: '/assets/bttf/infographic_condensador/btn_legado.png',
    image: '/assets/bttf/infographic_condensador/hero_legado.png',
    content: [
      '¿Puede una película divertida de Hollywood cambiar la ciencia real? ¡Absolutamente! Regreso al Futuro no solo rompió la taquilla en 1985; también encendió la imaginación de toda una generación de futuros científicos, físicos e ingenieros. Muchos investigadores cuánticos de hoy en día confiesan que su amor por el espacio-tiempo comenzó viendo un DeLorean acelerar a 88 millas por hora.',
      'La película hizo que conceptos complejos, como las paradojas causales, las líneas de tiempo alternativas y el continuo espacio-tiempo, fueran fáciles de entender para todo el mundo. Doc Brown usando una pizarra para explicar cómo se bifurca la historia en 1985 alternativo es quizás la mejor clase de física teórica que se ha dado en el cine.',
      'Incluso hoy, los científicos que estudian la computación cuántica usan términos inspirados en el viaje en el tiempo. Las computadoras cuánticas usan \'qubits\'que pueden existir en múltiples estados a la vez, como si exploraran muchas líneas temporales alternativas para encontrar la respuesta correcta a un problema súper complejo al mismo tiempo.',
      'El mayor legado de la máquina del tiempo de Doc Brown no es si es posible construirla o no, sino su capacidad de motivar al público general a pensar en conceptos complejos de la física moderna.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Al final de la trilogía, Doc le da a Marty y Jennifer un consejo maravilloso: "Vuestro futuro no ha sido escrito todavía. El de nadie lo está. Vuestro futuro es el que vosotros os labréis, así que haceos uno bueno". Es el mensaje definitivo sobre la ciencia y el libre albedrío.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El físico Ronald Mallett, profesor en la Universidad de Connecticut, ha dedicado toda su vida a intentar construir una máquina del tiempo real usando láseres en rotación para curvar el espacio. Decidió dedicar su vida a esto cuando leyó novelas de ciencia ficción tras la muerte de su padre.' }
    ],
    fact: 'En el año 2015 (el año al que viaja Marty en la segunda película), físicos de la Universidad de Bristol nombraron a su nuevo simulador cuántico capaz de revertir la evolución de los fotones... "El Condensador de Flujo". ¡Un homenaje científico total!'
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">FÍSICA NUCLEAR Y CUÁNTICA</text>
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
                position: 'absolute'...pos, zIndex: 1, pointerEvents:'none',
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
        <span>Progreso de Exploración</span>
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
            Toca cada círculo para explorar
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
                ðŸ† ¡Has dominado los secretos de la Máquina del Tiempo!
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                Has explorado toda la ciencia detrás de las máquinas del tiempo. ¿Estás listo para poner a prueba tus conocimientos?
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
            Fuentes Científicas y Bibliografía
          </h5>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {BIBLIOGRAPHY.map((item, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: '#00E5FF', opacity: 0.5 }}>•</span>
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
