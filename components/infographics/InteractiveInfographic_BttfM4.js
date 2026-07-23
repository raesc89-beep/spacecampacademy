'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
// ─── SVG Decorative Elements (Time Machine themed) ────────────────────────────
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
  'naturaleza-tiempo': [DecoGear, DecoClockFace, DecoTimeline],
  'simultaneidad': [DecoWormhole, DecoAtomSvg, DecoGear],
  'entropia': [DecoAtomSvg, DecoTimeline, DecoBolt],
  'memoria-tiempo': [DecoGear, DecoBolt, DecoClockFace],
  'cuantica-tiempo': [DecoFluxCapacitor, DecoBolt, DecoAtomSvg],
  'viaje-futuro': [DecoTimeline, DecoClockFace, DecoWormhole],
  'viaje-pasado': [DecoClockFace, DecoGear, DecoTimeline],
};

const BIBLIOGRAPHY = [
  "Boltzmann, L. (1877). 'Über die Beziehung zwischen dem zweiten Hauptsatze', Sitzungsberichte der Kaiserlichen Akademie der Wissenschaften",
  "Hawking, S. (1988). A Brief History of Time, Bantam Books",
  "Penrose, R. (2004). The Road to Reality, Jonathan Cape",
  "Carroll, S. (2010). From Eternity to Here: The Quest for the Ultimate Theory of Time, Dutton",
  "Barbour, J. (1999). The End of Time, Oxford University Press",
  "Hafele, J.C. & Keating, R.E. (1972). 'Around-the-World Atomic Clocks', Science, 177"
];

const INFOGRAPHIC_NODES = [
  {
    id: 'naturaleza-tiempo',
    title: 'La Naturaleza del Tiempo',
    color: '#7C4DFF',
    btnImage: '/assets/bttf/infographic_gigawatts/btn_naturaleza.png',
    image: '/assets/bttf/infographic_gigawatts/hero_naturaleza.png',
    content: [
      '¿Qué es exactamente el tiempo? El filósofo San Agustín dijo una vez: "Si nadie me lo pregunta, lo sé; pero si trato de explicarlo, no lo sé." Durante mucho tiempo, la humanidad creyó que el tiempo era como un río gigante y constante. Pensábamos que fluía a la misma velocidad en todo el universo, sin importar dónde estuvieras.',
      'Isaac Newton, el famoso científico de la gravedad, describió el tiempo como un reloj perfecto e inalterable. Según Newton, si tú y yo tenemos relojes sincronizados, siempre marcarán la misma hora, incluso si uno de nosotros viaja a otra estrella. Esta visión clásica hizo que entender el universo pareciera muy ordenado.',
      'Sin embargo, Albert Einstein llegó para cambiarlo todo. Einstein descubrió que el tiempo NO es absoluto. De hecho, el tiempo es elástico: puede estirarse y comprimirse. A diferencia de un río uniforme, el tiempo es más como una cama elástica, que se dobla dependiendo de la masa de los objetos y la velocidad a la que te mueves.',
      'Esto significa que no hay un solo "reloj" maestro para todo el universo. Cada persona, cada planeta y cada estrella tiene su propio ritmo de tiempo. Esta idea filosófica y científica es la base de todo lo que entendemos hoy sobre los viajes temporales y el espacio-tiempo.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En "Regreso al Futuro II", Doc Brown utiliza una pizarra para explicar a Marty cómo sus acciones han alterado la naturaleza de su tiempo. Dibuja una línea de tiempo recta y luego muestra cómo se divide en un 1985 alternativo. Esta es una brillante visualización de la idea de que el tiempo puede tomar múltiples direcciones dependiendo de nuestras elecciones.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'A nivel fundamental de la física cuántica, muchas ecuaciones funcionan igual de bien hacia adelante o hacia atrás en el tiempo. La dirección del tiempo no está codificada en las leyes más básicas del universo, lo que ha llevado a algunos físicos a sugerir que el flujo del tiempo podría ser una ilusión.' }
    ],
    fact: 'San Agustín, en el siglo IV, propuso que el pasado y el futuro no existen realmente; solo existe un "presente continuo" en la mente humana. Esta antigua idea sigue debatiéndose entre los físicos teóricos de hoy en día.'
  },
  {
    id: 'simultaneidad',
    title: 'La Simultaneidad',
    color: '#FF6B35',
    btnImage: '/assets/bttf/infographic_gigawatts/btn_simultaneidad.png',
    image: '/assets/bttf/infographic_gigawatts/hero_simultaneidad.png',
    content: [
      '¿Alguna vez has pensado que algo ocurrió "al mismo tiempo"? Einstein demostró que eventos que parecen simultáneos para una persona pueden ocurrir en momentos distintos para otra. Esto se conoce como la Relatividad de la Simultaneidad, y es uno de los conceptos más sorprendentes de la física moderna.',
      'Para explicarlo, Einstein imaginó un tren en movimiento. Si dos rayos caen al mismo tiempo en los extremos del tren, alguien parado afuera lo verá suceder a la vez. Pero un pasajero dentro del tren, que se mueve hacia uno de los rayos, verá ese rayo caer primero, porque la luz llega a sus ojos un instante antes.',
      '¿Quién de los dos tiene razón? ¡Ambos! No existe un punto de vista "correcto" en el universo. La simultaneidad depende totalmente de tu estado de movimiento. Esto destruye la idea de que podemos decir con certeza qué ocurrió "ahora mismo" en otra galaxia.',
      'Esto tiene profundas consecuencias. Si el "ahora" de una persona es diferente al de otra, entonces el pasado, el presente y el futuro deben existir todos de alguna forma al mismo tiempo. Es lo que los científicos llaman el "Universo Bloque", donde todos los momentos están congelados en una estructura de cuatro dimensiones.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Hay momentos en la saga donde Marty y Doc experimentan los mismos eventos desde perspectivas de tiempo totalmente diferentes. En la primera película, el "presente" de Marty en 1985 ocurre simultáneamente con el "futuro" que el Doc original de 1955 está intentando cambiar. Sus líneas temporales personales se cruzan de forma fascinante.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Debido a la velocidad a la que la luz viaja desde las estrellas, siempre estamos viendo el pasado. Si la estrella Betelgeuse explotara hoy mismo, los humanos no se enterarían hasta dentro de unos 600 años. Por lo tanto, el concepto de "simultaneidad" a escalas cósmicas pierde su significado habitual.' }
    ],
    fact: 'Si te estás moviendo rápidamente respecto a una persona en la otra punta del universo, tu "ahora" podría incluir eventos que para ellos ocurrieron en el siglo XIX, o eventos que sucederán en el siglo XXII.'
  },
  {
    id: 'entropia',
    title: 'Entropía y Desorden',
    color: '#00E5FF',
    btnImage: '/assets/bttf/infographic_gigawatts/btn_entropia.png',
    image: '/assets/bttf/infographic_gigawatts/hero_entropia.png',
    content: [
      'Si rompes un huevo, no puedes volver a unirlo. Si mezclas café y leche, no puedes separarlos después. Esta tendencia de las cosas a ir del orden al desorden se llama entropía. Es la esencia de la Segunda Ley de la Termodinámica y es crucial para entender la energía.',
      'La entropía es lo único en la física fundamental que nos da una dirección real para el tiempo. Las ecuaciones de movimiento funcionan igual hacia atrás que hacia adelante, pero el universo en su conjunto siempre se vuelve más desordenado. A esto lo llamamos la "flecha del tiempo", apuntando siempre hacia un mayor caos.',
      'Para que la entropía aumente ahora, el universo tuvo que empezar en un estado de bajísima entropía, es decir, muy ordenado. Los científicos creen que el Big Bang fue este estado especial. Toda la historia del universo, desde las galaxias hasta la vida misma, es un proceso gradual de aumento de entropía.',
      'Aprovechar la energía, como la de 1.21 gigawatts, siempre implica generar calor y aumentar la entropía global. Un DeLorean viajando en el tiempo requeriría manejar enormes cantidades de energía de forma concentrada, luchando temporalmente contra esta tendencia natural hacia el desorden.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Cuando el viejo Biff le entrega el almanaque deportivo a su yo joven, desata una cascada de eventos que aumenta drásticamente el "desorden" (la entropía) de la línea temporal. El Hill Valley pacífico se convierte en un caos dominado por el crimen. Es una representación metafórica perfecta de cómo el caos tiende a dominar si se altera el orden inicial.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El físico Ludwig Boltzmann, quien formuló las ecuaciones de la entropía, sugirió que tal vez vivimos en una rara burbuja de baja entropía dentro de un multiverso inmenso. Esta idea ayudó a sentar las bases de la cosmología moderna.' }
    ],
    fact: 'El hielo derritiéndose en un vaso de agua es un ejemplo perfecto del aumento de entropía. El calor se distribuye y las moléculas de agua se vuelven más caóticas. ¡El flujo del tiempo se puede medir con un cubo de hielo!'
  },
  {
    id: 'memoria-tiempo',
    title: 'Memoria y el Tiempo',
    color: '#FFA726',
    btnImage: '/assets/bttf/infographic_gigawatts/btn_memoria.png',
    image: '/assets/bttf/infographic_gigawatts/hero_memoria.png',
    content: [
      '¿Por qué recordamos el pasado y no el futuro? Suena a una pregunta obvia, pero para la física es un misterio profundo. La memoria es, en esencia, la huella digital del tiempo impresa en nuestro cerebro, creada por los procesos de aumento de entropía que dejan marcas físicas.',
      'Cuando experimentamos algo, las conexiones en nuestro cerebro (las sinapsis) cambian de forma física. Este proceso requiere energía y genera calor, dejando un rastro irreversible de información. Los recuerdos son como huellas en la arena: solo pueden formarse después de que alguien haya caminado por allí.',
      'Algunos filósofos sugieren que nuestra percepción del tiempo que "fluye" se debe únicamente a la forma en que el cerebro procesa y almacena memorias secuencialmente. Sin esta capacidad de recordar el estado anterior y compararlo con el nuevo, no sentiríamos el paso del tiempo.',
      'Si pudiéramos viajar al pasado, nos enfrentaríamos a problemas con nuestras propias memorias. Si un viajero del tiempo cambia su propio pasado de manera que nunca construyó la máquina, ¿de dónde provienen los recuerdos físicos almacenados en su cerebro? La memoria ancla nuestra identidad a nuestra línea temporal.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Uno de los elementos visuales más icónicos de BTTF es la fotografía de la familia de Marty. A medida que él altera el pasado, sus hermanos (y eventualmente él mismo) comienzan a borrarse de la foto. Esto ilustra cómo las alteraciones temporales destruyen las pruebas físicas (como fotos o memorias) del pasado original.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los ordenadores también tienen una flecha del tiempo ligada a la memoria. El Principio de Landauer establece que borrar un solo bit de información en un ordenador siempre liberará una pequeña cantidad de calor. La memoria y la entropía térmica están unidas.' }
    ],
    fact: 'El "presente" que percibes tiene en realidad unos 80 milisegundos de retraso. El cerebro tarda ese tiempo en juntar la información de la vista, el oído y el tacto, para crear un momento coherente. ¡Siempre vives en el pasado reciente!'
  },
  {
    id: 'cuantica-tiempo',
    title: 'Mecánica Cuántica',
    color: '#E040FB',
    btnImage: '/assets/bttf/infographic_gigawatts/btn_cuantica.png',
    image: '/assets/bttf/infographic_gigawatts/hero_cuantica.png',
    content: [
      'A nivel microscópico, las reglas del universo se vuelven increíblemente extrañas. La mecánica cuántica nos dice que las partículas como electrones o fotones pueden estar en múltiples estados a la vez. Sin embargo, cuando las observamos, "colapsan" en un estado único y definido. Este momento de colapso define el antes y el después.',
      'Para algunos físicos, el tiempo podría no ser una característica fundamental del universo, sino algo "emergente". Igual que la temperatura emerge de millones de moléculas chocando entre sí, el tiempo podría surgir del entrelazamiento cuántico entre incontables partículas en todo el cosmos.',
      'La famosa ecuación de Wheeler-DeWitt, un intento de combinar la cuántica con la gravedad, no incluye la variable del tiempo. Según esta ecuación, el universo en su estado más puro y matemático está congelado y estático. Es nuestra perspectiva dentro del universo la que genera la ilusión del cambio.',
      'Si alguna vez logramos viajar en el tiempo o generar energías tan precisas como 1.21 gigawatts, la solución probablemente estará en dominar la física cuántica. Los computadores cuánticos del futuro podrían simular o incluso manipular eventos a escalas subatómicas de formas que hoy parecen magia.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El momento exacto en que el rayo golpea la torre del reloj (a las 10:04 pm) requiere una transferencia precisa de energía cuántica. Doc Brown tiene que calcular el milisegundo exacto para que la energía canalice hacia el condensador de flujo. Es una metáfora de los eventos cuánticos precisos y repentinos que cambian el curso del universo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Un experimento famoso conocido como el "Borrador Cuántico de Elección Retardada" sugiere que, a escala subatómica, una medición en el presente puede aparentemente influir en el estado de un fotón en el pasado. ¡El tiempo a nivel cuántico es verdaderamente extraño!' }
    ],
    fact: 'Las partículas cuánticas pueden entrar en un estado de superposición donde están, de alguna forma, "fuera" del flujo normal del tiempo. Solo interactúan con la historia cuando se enredan con el mundo macroscópico.'
  },
  {
    id: 'viaje-futuro',
    title: 'Viaje al Futuro',
    color: '#66BB6A',
    btnImage: '/assets/bttf/infographic_gigawatts/btn_futuro.png',
    image: '/assets/bttf/infographic_gigawatts/hero_futuro.png',
    content: [
      'Viajar al futuro no es ciencia ficción: ¡es un hecho comprobado! La teoría de la relatividad de Einstein demuestra que si te mueves a gran velocidad, el tiempo pasará más lento para ti en comparación con alguien que se queda quieto. Este fenómeno se llama "dilatación del tiempo".',
      'Lo hemos comprobado en experimentos reales. Cuando volamos relojes atómicos muy precisos alrededor del mundo en aviones a reacción, regresan marcando fracciones de segundo menos que los relojes que se quedaron en la Tierra. Los viajeros han envejecido menos que nosotros.',
      'Los astronautas en la Estación Espacial Internacional (ISS) viajan a más de 27,000 km/h. Tras pasar meses en el espacio, regresan a la Tierra habiendo viajado una pequeña fracción de segundo hacia el futuro. El astronauta Sergei Krikalev viajó aproximadamente 0.02 segundos al futuro tras pasar más de 800 días en órbita.',
      'Además, los satélites GPS que usamos para la navegación deben ajustar continuamente sus relojes internos. Debido a su velocidad y a estar más lejos de la gravedad terrestre, su tiempo no coincide con el nuestro. Sin las matemáticas del viaje al futuro de Einstein, el GPS fallaría en cuestión de horas.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En "Regreso al Futuro II", Marty viaja al año 2015 y encuentra patinetas voladoras, zapatos que se abrochan solos y publicidad holográfica. Aunque la película sobreestimó algunas tecnologías, la idea de dar un "salto" y encontrar una sociedad transformada por la innovación tecnológica captura la esencia del viaje hacia el futuro.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Partículas subatómicas llamadas muones, que se crean cuando los rayos cósmicos chocan con la atmósfera, duran tan poco que deberían desintegrarse antes de llegar al suelo. Sin embargo, llegan a la superficie porque viajan casi a la velocidad de la luz, lo que "ralentiza" su reloj interno. ¡Ellos experimentan su propio viaje al futuro!' }
    ],
    fact: 'Si pudieras viajar en una nave al 99.99% de la velocidad de la luz durante lo que para ti sería 1 año, al volver a la Tierra descubrirías que han pasado casi 70 años. ¡Habrías saltado al futuro de la humanidad!'
  },
  {
    id: 'viaje-pasado',
    title: 'Viaje al Pasado',
    color: '#FF7043',
    btnImage: '/assets/bttf/infographic_gigawatts/btn_pasado.png',
    image: '/assets/bttf/infographic_gigawatts/hero_pasado.png',
    content: [
      'Mientras viajar al futuro está comprobado, viajar al pasado es el verdadero desafío. Según las matemáticas de la relatividad general, el espacio-tiempo puede doblarse sobre sí mismo creando "Curvas Cerradas de Tiempo". En teoría, si siguieras una de estas curvas, volverías a un momento anterior en el tiempo.',
      'El problema con el viaje al pasado son las violaciones de la causalidad, más conocidas como paradojas temporales. La "paradoja del abuelo" nos pregunta: ¿Qué pasa si viajas en el tiempo e impides que tus abuelos se conozcan? Si no naces, no puedes viajar en el tiempo, pero si no viajas, sí naces. Es una contradicción lógica.',
      'Para evitar estos dolores de cabeza cósmicos, Stephen Hawking propuso la "Conjetura de Protección de la Cronología". Según él, las leyes de la física evitarán siempre la creación de curvas cerradas de tiempo a nivel macroscópico. Si intentas crear una máquina del tiempo hacia el pasado, fluctuaciones cuánticas la destruirán antes de que funcione.',
      'Otra posible solución a las paradojas son los universos paralelos. En esta interpretación, si cambias algo en el pasado, no alteras tu línea temporal original, sino que creas una nueva rama de la realidad. Cada decisión y viaje en el tiempo generaría un nuevo universo independiente.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La trama de la primera película gira exactamente en torno al peligro del viaje al pasado. Al interactuar con sus padres adolescentes en 1955, Marty rompe la cadena causal que lleva a su propio nacimiento, corriendo el riesgo de ser borrado de la existencia. Él debe actuar como un "reparador" de la línea temporal para salvarse.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El físico Kip Thorne descubrió matemáticamente que podrías, en teoría, convertir un agujero de gusano en una máquina para viajar al pasado moviendo uno de sus extremos a casi la velocidad de la luz y luego trayéndolo de vuelta.' }
    ],
    fact: 'A nivel de las matemáticas puras de Einstein, viajar al pasado está permitido. Son las complicaciones y paradojas lógicas posteriores las que hacen que los físicos sospechen que el universo debe tener un mecanismo oculto para prohibirlo.'
  }
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
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

// ─── Time Machine Header ──────────────────────────────────────────────────────
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
          const colors = ['#7C4DFF','#FF6B35','#00E5FF','#FFA726','#E040FB','#66BB6A','#FF7043'];
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
        <text x="300" y="80" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ENERGÍA A 1.21 GIGAWATTS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DE LA ENERGÍA Y EL TIEMPO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching style) ─────────────────────────
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
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
          layoutId="activeDotBttfM4"
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
  const [lightboxSrc, setLightboxSrc] = useState(null);
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
function ContentPanel({ node, onClose }) {
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Fact Box ─── */}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #00E5FF, #FF6B35)', borderRadius: '3px' }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InteractiveInfographic_BttfM4() {
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
      background: 'url(/assets/bttf/infographic_gigawatts/bg_gigawatts.png) center/cover',
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
                🏆 ¡Has dominado los secretos de la Máquina del Tiempo!
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
