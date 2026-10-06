'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized flipper/paddle */}
      <ellipse cx="30" cy="30" rx="20" ry="8" fill={color} opacity="0.2" transform="rotate(-30 30 30)" />
      <path d="M15 35 Q25 20 45 25 Q40 35 25 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Water droplets */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="45" r="1.5" fill={color} opacity="0.4" />
      {/* Flow lines */}
      <path d="M8 20 Q18 18 22 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 40 Q48 38 52 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising air bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="25" cy="15" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="38" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="42" cy="22" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Shine on main bubble */}
      <path d="M17 42 Q18 40 20 41" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function DecoWave({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20 Q75 30 80 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28 Q75 38 80 33" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Foam dots */}
      <circle cx="20" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1.2" fill={color} opacity="0.35" />
      <circle cx="60" cy="14" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified reptile skull outline */}
      <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Eye sockets (sclerotic rings) */}
      <circle cx="22" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M15 32 Q22 42 30 44 Q38 42 45 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA/evolution helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      <line x1="23" y1="10" x2="37" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="50" x2="37" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermo({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer shape */}
      <rect x="27" y="8" width="6" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Temperature marks */}
      <line x1="34" y1="15" x2="38" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="27" x2="38" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="33" x2="38" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Heat waves */}
      <path d="M42 40 Q46 36 42 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 42 Q50 38 46 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "Faraday, M. (1838). Experimental Researches in Electricity, Eleventh Series: On Induction. Philosophical Transactions of the Royal Society of London, 128, 1-40.",
  "Faraday, M. (1839-1855). Experimental Researches in Electricity (3 vols.). London: Richard and John Edward Taylor.",
  "Feynman, R. P., Leighton, R. B. y Sands, M. (1964). The Feynman Lectures on Physics, Vol. II, cap. 5: Application of Gauss' Law. Caltech, feynmanlectures.caltech.edu",
  "NOAA National Weather Service. Lightning Safety: Understanding Lightning y Lightning Safety Tips. https://www.weather.gov/safety/lightning",
  "NASA. Apollo 12 Mission Overview (lanzamiento del 14 de noviembre de 1969). https://www.nasa.gov/mission/apollo-12/",
  "NASA/JPL. Juno Mission to Jupiter: Radiation Vault. https://www.jpl.nasa.gov/missions/juno",
  "NASA Goddard. MAVEN (Mars Atmosphere and Volatile EvolutioN) Mission. https://science.nasa.gov/mission/maven/"
];

const INFOGRAPHIC_NODES = [
  {
    id: "campos-invisibles",
    bannerImage: '/assets/faraday/infographic_m3/banner_campos-invisibles.webp',
    bannerCaption: "Faraday imaginó el espacio lleno de «líneas de fuerza»: la idea de campo que explica por qué funciona su jaula.",
    title: "Faraday y los campos invisibles",
    color: '#5B7A8C',
    btnImage: '/assets/faraday/infographic_m3/btn_campos-invisibles.webp',
    image: '/assets/faraday/infographic_m3/hero_campos-invisibles.webp',
    content: [
      "Antes de construir su famosa jaula, Michael Faraday tuvo que imaginar algo que nadie podía ver. En su época, muchos científicos pensaban que dos cargas eléctricas o dos imanes se atraían «a distancia», a través del vacío, sin nada en medio. Faraday no estaba convencido. Para él, el espacio que rodea a un imán o a un objeto cargado está lleno de «líneas de fuerza» que transmiten el empujón o el tirón. Hoy llamamos a esa idea campo, y es una de las herramientas más poderosas de toda la física moderna.",
      "Puedes ver las líneas de un campo magnético con un experimento casero. Coloca un imán bajo una hoja de papel y espolvorea limaduras de hierro encima: los diminutos trocitos se ordenan en curvas que salen del polo norte y regresan al polo sur. Faraday dibujó cientos de patrones así en sus cuadernos. Con las cargas eléctricas ocurre algo parecido: alrededor de un objeto electrizado existe un campo eléctrico que empuja a otras cargas, aunque no lo podamos ver ni tocar.",
      "Aquí aparece la pregunta clave de este módulo: ¿qué le pasa a un campo eléctrico cuando se encuentra con un metal? Los metales están llenos de electrones que se mueven con libertad. Cuando un campo eléctrico externo llega, esos electrones se desplazan casi al instante y se acomodan en la superficie del metal. Al reorganizarse, crean su propio campo, que se opone al de afuera. El resultado sorprende: dentro de un conductor en equilibrio, el campo eléctrico total vale cero.",
      "Faraday comprendió que esta propiedad no solo vale para un bloque macizo de metal, sino también para una caja hueca. Si el interior está rodeado por completo de material conductor, las cargas se quedan en la cara exterior y el espacio de adentro queda tranquilo, como si afuera no pasara nada. Esa caja protectora es lo que hoy llamamos jaula de Faraday. No necesita ser sólida: una malla o red metálica funciona igual de bien si sus agujeros son lo bastante pequeños.",
      "La jaula de Faraday es, por tanto, la consecuencia práctica de una idea abstracta. Primero vino la imagen mental de los campos; después, el razonamiento sobre cómo se mueven las cargas en un metal; y al final, un experimento que cualquiera podía comprobar. En los siguientes nodos verás cómo Faraday puso a prueba esta idea en 1836, por qué tu horno de microondas es una jaula, cómo te protege un auto de un rayo y cómo las naves espaciales usan el mismo principio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Faraday casi no sabía matemáticas avanzadas. Dejó la escuela muy joven y nunca aprendió cálculo. Por eso pensaba con imágenes: líneas, curvas y patrones que podía dibujar. Años después, el físico escocés James Clerk Maxwell tradujo esas imágenes a ecuaciones y descubrió que eran correctas. A veces una buena imagen mental vale tanto como una página llena de fórmulas, siempre que se ponga a prueba con experimentos." },
      { label: "Dato Científico", icon: "atom", text: "Los electrones de un metal reaccionan a un campo externo en tiempos extremadamente cortos, mucho menores que una millonésima de segundo. Por eso, en casi cualquier situación cotidiana, un conductor anula su campo interior de inmediato. Esta propiedad se deduce de la ley de Gauss, una de las cuatro ecuaciones de Maxwell, y explica por qué toda carga en exceso de un conductor termina en su superficie exterior." }
    ],
    fact: "Las limaduras de hierro no muestran el campo eléctrico, sino el magnético. Para ver líneas de campo eléctrico, los profesores usan semillas de pasto flotando en aceite junto a dos electrodos con alto voltaje: las semillas se alinean igual que las limaduras. Faraday insistía en que estas líneas eran algo físicamente real y no un simple dibujo, una idea audaz que la física del siglo XX terminó confirmando con la teoría de campos.",
  },
  {
    id: "experimento-1836",
    bannerImage: '/assets/faraday/infographic_m3/banner_experimento-1836.webp',
    bannerCaption: "En 1836 Faraday forró un cuarto de 3.7 m con metal, lo electrificó por fuera y comprobó que dentro no había carga.",
    title: "El cuarto metálico de 1836",
    color: '#8A6F5A',
    btnImage: '/assets/faraday/infographic_m3/btn_experimento-1836.webp',
    image: '/assets/faraday/infographic_m3/hero_experimento-1836.webp',
    content: [
      "En 1836, Faraday llevó su idea a lo grande en la Royal Institution de Londres, donde trabajaba. Mandó construir un cubo de unos 3.7 metros por lado (12 pies), con un ligero armazón de madera recorrido por alambres de cobre y cubierto de papel con bandas de papel de estaño. Luego usó una potente máquina electrostática para cargar la estructura desde afuera, con tanta electricidad que saltaban chispas y descargas por las paredes exteriores. Y entonces hizo algo valiente: se metió dentro.",
      "Dentro del cubo, Faraday llevó velas encendidas, electrómetros y otros instrumentos capaces de detectar la más mínima carga eléctrica. Un electroscopio, por ejemplo, tiene dos hojitas metálicas que se separan cuando reciben carga. Mientras afuera las paredes chisporroteaban, los instrumentos de adentro no se movían en absoluto. Faraday escribió que no pudo encontrar la menor influencia eléctrica en el interior, aunque el exterior estuviera cargado con muchísima intensidad.",
      "El experimento demostraba algo fundamental: la carga eléctrica en exceso de un conductor se queda en su superficie exterior y no afecta lo que hay dentro. No importaba cuánta electricidad se acumulara en las paredes; el interior seguía protegido. Faraday describió estos resultados en sus «Investigaciones experimentales sobre la electricidad», la gran serie de artículos que publicó durante más de veinte años y que todavía se puede consultar en bibliotecas y en línea.",
      "Faraday no fue el primero en notar el efecto. Hacia 1755, Benjamin Franklin colgó una bolita de corcho dentro de un recipiente metálico cargado y vio que no era atraída por las paredes, aunque afuera sí lo habría sido. Franklin, que lo contó en una carta, reconoció que no conocía la razón. Faraday convirtió esa curiosidad en un principio general, lo comprobó con cuidado y lo llevó a escala humana. Por eso hoy el dispositivo lleva su nombre y no el de Franklin.",
      "Años después, en 1843, Faraday hizo otro experimento famoso con una cubeta metálica para hielo. Introducía una esfera cargada en la cubeta sin tocarla y observaba que en la superficie exterior aparecía una carga igual. Este «experimento de la cubeta de hielo» confirmó que la carga se redistribuye en los conductores de forma precisa y predecible. Juntos, el cubo de 1836 y la cubeta de 1843 son la base experimental de la jaula de Faraday y de la electrostática moderna."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Faraday pasó tiempo dentro de su cubo electrificado como si fuera su oficina. En sus notas escribió que entró en el cubo y vivió en él, usando velas, electrómetros y todo tipo de pruebas, sin encontrar ningún efecto de la electricidad exterior. Hoy algunos museos de ciencia repiten la demostración: una persona entra en una jaula metálica mientras chispas artificiales golpean el exterior, y sale sin un rasguño." },
      { label: "Dato Científico", icon: "atom", text: "El cubo de Faraday medía 12 pies por lado, es decir, cerca de 3.7 metros. Su armazón de madera estaba recorrido por alambres de cobre que formaban una gran red, y todo se cubrió con papel y bandas de papel de estaño bien conectadas entre sí. Esa red conductora continua era la clave: si las partes metálicas no estuvieran unidas, las cargas no podrían redistribuirse por toda la superficie y el escudo fallaría." }
    ],
    fact: "El año del experimento del cuarto metálico es 1836, aunque Faraday lo publicó un poco después dentro de la undécima serie de sus Investigaciones experimentales. No debe confundirse con 1831, el año en que descubrió la inducción electromagnética. En solo cinco años, Faraday pasó de demostrar que un imán en movimiento genera electricidad a demostrar que una caja de metal puede bloquear los campos eléctricos exteriores.",
  },
  {
    id: "como-funciona-jaula",
    bannerImage: '/assets/faraday/infographic_m3/banner_como-funciona-jaula.webp',
    bannerCaption: "Los electrones del metal se reacomodan y anulan el campo exterior; una malla funciona si sus huecos son menores que la onda.",
    title: "¿Cómo funciona la jaula?",
    color: '#6E8B74',
    btnImage: '/assets/faraday/infographic_m3/btn_como-funciona-jaula.webp',
    image: '/assets/faraday/infographic_m3/hero_como-funciona-jaula.webp',
    content: [
      "Imagina que una nube de tormenta con carga negativa se acerca a una caja de metal. Los electrones libres del metal sienten un empujón y se alejan, acumulándose en el lado opuesto de la caja, mientras que el lado cercano queda con carga positiva. Esta separación de cargas se llama inducción electrostática. Las cargas reacomodadas generan un campo eléctrico propio que, dentro de la caja, apunta justo en sentido contrario al de la nube. Ambos campos se cancelan.",
      "El reacomodo se detiene en el momento exacto en que el campo interior llega a cero, porque mientras quede algo de campo los electrones seguirán moviéndose. Por eso se dice que el conductor alcanza el equilibrio electrostático. Es un mecanismo que se ajusta solo: si el campo exterior crece, los electrones se reorganizan más; si cambia de dirección, se reorganizan en otra dirección. El interior permanece protegido sin que nadie tenga que encender ni apagar nada.",
      "¿Y si la jaula tiene agujeros? Aquí entra en juego el tamaño de las ondas. La luz, las ondas de radio y las microondas son ondas electromagnéticas, cada una con su longitud de onda. Una malla metálica bloquea bien las ondas cuya longitud es mucho mayor que el tamaño de sus huecos. En cambio, las ondas más pequeñas que los agujeros pueden colarse. Por eso una red con huecos de pocos milímetros detiene las microondas, pero deja pasar la luz visible.",
      "Una jaula de Faraday no es un escudo perfecto contra todo. Funciona muy bien frente a campos eléctricos estáticos y ondas de radio, pero no bloquea un campo magnético constante, como el de la Tierra: una brújula dentro de una jaula de cobre sigue apuntando al norte. Para frenar campos magnéticos lentos se usan aleaciones especiales muy permeables, como el mu-metal. Además, si la jaula tiene ranuras largas, uniones mal hechas o cables que la atraviesan, el blindaje se debilita.",
      "Otro detalle importante es el grosor del metal. Las ondas electromagnéticas que llegan a un conductor no se detienen en la superficie misma, sino que penetran una pequeña distancia antes de apagarse. Esa distancia se llama profundidad de penetración, relacionada con el llamado efecto pelicular, y es menor cuanto mayor es la frecuencia de la onda y cuanto mejor conduce el metal. Por eso para frecuencias altas basta una lámina delgada de cobre o aluminio, mientras que para frecuencias bajas se necesita más espesor."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Una persona dentro de una jaula de Faraday no siente nada, aunque toque sus paredes por dentro. Como la carga se acumula en la cara exterior, la superficie interior no presenta una diferencia de potencial peligrosa. Esto permite que en demostraciones científicas alguien dentro de una jaula toque la malla mientras afuera saltan chispas de cientos de miles de voltios generadas por una bobina de Tesla, sin recibir ninguna descarga." },
      { label: "Dato Científico", icon: "atom", text: "La regla práctica de los ingenieros es que los huecos de una malla deben ser mucho más pequeños que la longitud de onda que se quiere bloquear; muchos usan como referencia una décima parte o menos. Una onda de radio FM mide unos 3 metros, la de un teléfono móvil entre unos 10 y 40 centímetros y la de un horno de microondas unos 12 centímetros, así que cada blindaje se diseña según la frecuencia que debe detener." }
    ],
    fact: "Dentro de un conductor hueco cerrado y sin cargas en su interior, el campo eléctrico estático es exactamente cero, sin importar la forma de la caja: puede ser un cubo, una esfera o la carrocería irregular de un auto. Este resultado se demuestra con la ley de Gauss y se ha comprobado experimentalmente con enorme precisión, hasta el punto de usarse para verificar que la fuerza eléctrica sigue con exactitud la ley del inverso del cuadrado de la distancia.",
  },
  {
    id: "microondas-y-hogar",
    bannerImage: '/assets/faraday/infographic_m3/banner_microondas-y-hogar.webp',
    bannerCaption: "El horno de microondas es una jaula de Faraday: su caja metálica y la rejilla de la puerta mantienen las ondas dentro.",
    title: "Jaulas en tu casa",
    color: '#7D6B8F',
    btnImage: '/assets/faraday/infographic_m3/btn_microondas-y-hogar.webp',
    image: '/assets/faraday/infographic_m3/hero_microondas-y-hogar.webp',
    content: [
      "El ejemplo más cercano de jaula de Faraday probablemente está en tu cocina. Un horno de microondas produce ondas electromagnéticas de alrededor de 2.45 gigahercios, que hacen vibrar las moléculas de agua de los alimentos y los calientan. Esas ondas no deben salir del aparato, así que el horno está construido como una caja de metal completamente cerrada. Funciona como una jaula de Faraday al revés: en lugar de impedir que algo entre, impide que la energía salga.",
      "¿Y la puerta de vidrio por la que miras tu comida? Si la observas de cerca, verás una rejilla metálica con agujeritos. La longitud de onda de las microondas del horno es de unos 12 centímetros, mientras que los agujeros de la rejilla miden apenas unos milímetros. Las microondas son demasiado grandes para pasar, pero la luz visible, cuya longitud de onda es de menos de una milésima de milímetro, atraviesa sin problema. Así puedes ver sin dejar escapar la radiación.",
      "Los ascensores son otra jaula de Faraday involuntaria. Su cabina de metal, rodeada por un hueco de concreto reforzado con acero, bloquea buena parte de las señales de radio. Por eso a veces el teléfono móvil pierde la señal al subir al elevador. Lo mismo ocurre en algunos estacionamientos subterráneos, túneles y edificios con mucha estructura metálica. No es un defecto del teléfono: es la física de Faraday actuando sobre las ondas que conectan tu celular con las antenas.",
      "En los hospitales, las salas de resonancia magnética están forradas con láminas o mallas de cobre. Esas máquinas detectan señales de radio muy débiles emitidas por los átomos de hidrógeno del cuerpo, y cualquier interferencia externa, como una estación de radio o un teléfono, arruinaría la imagen. El blindaje de cobre convierte toda la sala en una jaula de Faraday que deja fuera el ruido electromagnético. Es el mismo principio que Faraday probó en 1836, aplicado a la medicina.",
      "También existen jaulas de Faraday de bolsillo. Hay fundas metalizadas que bloquean las señales de las llaves inalámbricas de los autos para evitar robos, y bolsas especiales donde los investigadores forenses guardan teléfonos para que nadie pueda borrarlos a distancia. Los cables coaxiales de la televisión llevan una malla metálica que envuelve el conductor central y lo protege de interferencias. Incluso muchos aparatos electrónicos tienen pequeñas tapas metálicas sobre sus chips para blindarlos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El horno de microondas se inventó casi por accidente. Hacia 1945, el ingeniero estadounidense Percy Spencer trabajaba con magnetrones, los tubos que generan microondas para los radares, y notó que una barra de chocolate se había derretido en su bolsillo. Pronto probó con granos de maíz y obtuvo palomitas. El primer horno comercial, llamado Radarange, medía casi dos metros de altura y pesaba más de 300 kilogramos." },
      { label: "Dato Científico", icon: "atom", text: "Las microondas del horno, de unos 2.45 gigahercios, tienen una longitud de onda cercana a 12.2 centímetros. Esta frecuencia pertenece a una banda reservada internacionalmente para usos industriales, científicos y médicos, y el agua de los alimentos la absorbe bien sin que toda la energía se quede en la superficie. El Wi-Fi de 2.4 gigahercios usa una banda vecina, y por eso un horno con mala protección puede interferir con la conexión." }
    ],
    fact: "Puedes comprobar el efecto jaula con ayuda de un adulto: envuelve un teléfono móvil por completo en dos o tres capas de papel aluminio y pide a alguien que te llame. En muchos casos la llamada no entrará, porque el aluminio bloquea las ondas de radio. Si dejas una abertura, la señal puede colarse de nuevo. Nunca metas papel aluminio ni objetos metálicos dentro de un horno de microondas encendido, porque pueden producir chispas peligrosas.",
  },
  {
    id: "rayos-autos-aviones",
    bannerImage: '/assets/faraday/infographic_m3/banner_rayos-autos-aviones.webp',
    bannerCaption: "Un auto con techo metálico protege de un rayo por su carrocería, no por sus neumáticos: la corriente fluye por fuera.",
    title: "Rayos, autos y aviones",
    color: '#8C7A4F',
    btnImage: '/assets/faraday/infographic_m3/btn_rayos-autos-aviones.webp',
    image: '/assets/faraday/infographic_m3/hero_rayos-autos-aviones.webp',
    content: [
      "Un rayo es una descarga eléctrica gigantesca entre una nube y el suelo, o entre nubes. Según el Servicio Meteorológico Nacional de Estados Unidos, un rayo típico tiene unos 300 millones de voltios y alrededor de 30,000 amperios, y calienta el aire de su canal hasta cerca de 28,000 °C, unas cinco veces la temperatura de la superficie del Sol. Esa energía puede ser mortal para las personas, así que saber dónde refugiarse durante una tormenta es muy importante.",
      "Mucha gente cree que dentro de un auto estamos seguros porque los neumáticos de goma nos aíslan del suelo. Es un mito. Un rayo que ha atravesado kilómetros de aire no se detiene por unos centímetros de caucho. La verdadera razón es la carrocería metálica, que funciona como una jaula de Faraday. Cuando el rayo golpea el auto, la corriente viaja por la superficie exterior del metal y luego salta al suelo, sin pasar por el interior donde están los pasajeros.",
      "Para que esta protección funcione, el vehículo debe tener techo de metal. Los autos convertibles, los de techo de lona y los fabricados con fibra de vidrio o plástico no ofrecen la misma seguridad. También conviene no tocar las piezas metálicas conectadas a la carrocería durante la tormenta. Un rayo puede dañar el sistema eléctrico del auto, reventar algún neumático o romper un vidrio, pero las personas dentro de un vehículo de techo metálico suelen salir ilesas.",
      "Los aviones comerciales son jaulas de Faraday voladoras. Se estima que cada avión de pasajeros recibe en promedio el impacto de un rayo aproximadamente una vez al año. El rayo suele entrar por la punta del morro o de un ala, recorre el fuselaje metálico por fuera y sale por la cola o por otro extremo. Los aviones modernos fabricados con materiales compuestos incorporan mallas de cobre o aluminio bajo su piel para conducir la corriente igual que lo haría el metal.",
      "Los edificios también se protegen con principios parecidos. Los pararrayos, inventados por Benjamin Franklin hacia 1752, ofrecen un camino metálico seguro para que la corriente del rayo llegue a tierra sin atravesar paredes ni personas. En algunas construcciones, como polvorines o estaciones de radar, se instalan redes completas de conductores en el techo y las paredes que funcionan como una jaula de Faraday a escala de edificio. Así se protegen equipos sensibles y materiales peligrosos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los electricistas que reparan líneas de alta tensión sin cortar la corriente usan trajes conductores. Son overoles tejidos con hilos metálicos que envuelven todo el cuerpo y funcionan como una jaula de Faraday portátil. Algunos trabajadores llegan a las líneas desde un helicóptero y se conectan directamente al cable de cientos de miles de voltios. Como el traje mantiene todo su cuerpo al mismo potencial, la corriente no pasa a través de ellos." },
      { label: "Dato Científico", icon: "atom", text: "Un rayo dura en total menos de un segundo y suele estar formado por varias descargas sucesivas por el mismo canal, cada una muy breve. Como la corriente cambia muy deprisa, tiende a viajar por la superficie de los conductores, justo como predice el efecto pelicular. Por eso la carrocería de un auto o el fuselaje de un avión conducen el rayo por fuera y protegen a quienes están dentro, siempre que la estructura metálica sea continua." }
    ],
    fact: "La regla de seguridad más importante ante una tormenta es sencilla: «cuando truena, vete adentro». Si puedes oír un trueno, estás lo bastante cerca para que te alcance un rayo. Los refugios más seguros son los edificios cerrados con instalación eléctrica y fontanería, o un vehículo con techo metálico y ventanas cerradas. Las tiendas de campaña, los kioscos abiertos y los árboles aislados no protegen; al contrario, pueden aumentar el peligro.",
  },
  {
    id: "naves-espaciales",
    bannerImage: '/assets/faraday/infographic_m3/banner_naves-espaciales.webp',
    bannerCaption: "Las naves usan cajas y blindajes metálicos para proteger su electrónica de descargas, interferencias y radiación espacial.",
    title: "Escudos para naves espaciales",
    color: '#4F6D7A',
    btnImage: '/assets/faraday/infographic_m3/btn_naves-espaciales.webp',
    image: '/assets/faraday/infographic_m3/hero_naves-espaciales.webp',
    content: [
      "El espacio parece vacío, pero es un ambiente eléctricamente hostil. Las naves atraviesan partículas cargadas que llegan del Sol con el viento solar, que quedan atrapadas en los cinturones de radiación de la Tierra o que vienen de fuera del sistema solar como rayos cósmicos. Estas partículas pueden cargar eléctricamente la superficie de una nave, provocar chispas internas y alterar los circuitos electrónicos. Por eso los ingenieros espaciales aplican el principio de Faraday en casi cada componente.",
      "La primera línea de defensa es la estructura metálica. Muchas computadoras de a bordo, radios y sensores se alojan en cajas de aluminio cerradas que actúan como jaulas de Faraday. Así se bloquean las interferencias electromagnéticas, tanto las que llegan de afuera como las que producen los propios aparatos de la nave. Además, las piezas metálicas se conectan eléctricamente entre sí, para que la nave tenga el mismo potencial en todas partes y las cargas no se acumulen en un solo lugar.",
      "Un caso famoso ocurrió el 14 de noviembre de 1969, durante el despegue del Apolo 12. Unos 36 segundos después de salir de la plataforma, el cohete Saturno V fue alcanzado por un rayo, y unos 16 segundos más tarde, por otro. Muchas luces de alarma se encendieron y varios sistemas eléctricos de la cápsula se desconectaron. Gracias a una rápida instrucción del controlador John Aaron desde Tierra, la tripulación restableció los sistemas y la misión continuó hasta alunizar con éxito.",
      "Para la radiación más energética, la idea de Faraday se combina con blindajes gruesos. Las partículas de alta energía no se detienen con una lámina delgada, porque no son campos que se puedan anular, sino proyectiles diminutos que hay que frenar con materia. La sonda Juno de la NASA, que orbita Júpiter desde 2016, protege sus computadoras principales dentro de una bóveda de titanio con paredes de alrededor de un centímetro de grosor, porque la radiación de Júpiter es de las más intensas del sistema solar.",
      "Los astronautas también dependen de estos escudos. La Estación Espacial Internacional orbita a unos 400 kilómetros de altura, todavía dentro de la magnetosfera terrestre, que desvía gran parte de las partículas del viento solar. Su casco de aluminio y los equipos y depósitos de agua del interior absorben parte de la radiación restante. Para viajes más largos, como los futuros vuelos a Marte, los ingenieros estudian materiales ricos en hidrógeno, como el polietileno, que frenan mejor ciertas partículas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El Apolo 12 provocó él mismo los rayos que lo golpearon. El enorme cohete y su larga columna de gases calientes, muy conductora, actuaron como un pararrayos gigante dentro de una nube cargada. Desde entonces, la NASA aplica reglas meteorológicas estrictas para los lanzamientos y no despega si hay ciertas nubes eléctricas cerca. La breve instrucción de John Aaron, «SCE a AUX», se convirtió en una leyenda del control de misiones." },
      { label: "Dato Científico", icon: "atom", text: "Las naves en órbita pueden acumular miles de voltios de carga en sus superficies, sobre todo cuando cruzan regiones con electrones energéticos o cuando una parte queda en sombra y otra al sol. Si esa carga se libera de golpe, produce una chispa capaz de dañar circuitos. Para evitarlo, los ingenieros recubren las superficies con materiales levemente conductores y conectan todas las piezas a una tierra común, aplicando la misma lógica que hace funcionar la jaula de Faraday." }
    ],
    fact: "Los cinturones de Van Allen, dos grandes anillos de partículas cargadas atrapadas por el campo magnético terrestre, fueron descubiertos en 1958 gracias al Explorer 1, el primer satélite de Estados Unidos, con un detector diseñado por el equipo del físico James Van Allen. Las naves que deben atravesarlos, como las misiones Apolo hacia la Luna, lo hacen con rapidez para limitar la dosis de radiación que reciben sus tripulantes y sus aparatos electrónicos.",
  },
  {
    id: "escudo-magnetico-tierra",
    bannerImage: '/assets/faraday/infographic_m3/banner_escudo-magnetico-tierra.webp',
    bannerCaption: "La magnetosfera desvía el viento solar como un escudo natural; sin ese escudo, Marte perdió gran parte de su atmósfera.",
    title: "La Tierra, un planeta blindado",
    color: '#8F5F5F',
    btnImage: '/assets/faraday/infographic_m3/btn_escudo-magnetico-tierra.webp',
    image: '/assets/faraday/infographic_m3/hero_escudo-magnetico-tierra.webp',
    content: [
      "La Tierra también tiene un escudo, aunque funciona de manera diferente a la jaula de Faraday. En el núcleo externo de nuestro planeta, a unos 2,900 kilómetros bajo nuestros pies, circula hierro fundido. El movimiento de ese metal líquido conductor genera corrientes eléctricas que, a su vez, producen el campo magnético terrestre. Este proceso se llama geodinamo, y crea alrededor del planeta una burbuja magnética llamada magnetosfera, que se extiende decenas de miles de kilómetros hacia el espacio.",
      "La magnetosfera nos protege del viento solar, un chorro continuo de partículas cargadas, sobre todo protones y electrones, que el Sol lanza a velocidades de entre 400 y 800 kilómetros por segundo. Como las partículas cargadas no pueden cruzar fácilmente las líneas del campo magnético, la mayoría son desviadas alrededor del planeta. Es una diferencia importante con la jaula de Faraday: la jaula anula campos eléctricos con un metal, mientras que la magnetosfera desvía partículas con un campo magnético.",
      "Marte nos muestra qué pasa sin ese escudo. Hace unos 4,000 millones de años, el planeta rojo perdió su campo magnético global, probablemente porque su núcleo se enfrió y su dinamo se detuvo. Sin protección, el viento solar fue arrancando poco a poco su atmósfera. La sonda MAVEN de la NASA, que estudia Marte desde 2014, ha medido cómo el planeta sigue perdiendo gas al espacio. Hoy la presión de la atmósfera marciana es menos del 1 % de la terrestre.",
      "Cuando el Sol lanza tormentas muy intensas, algunas partículas logran entrar por las regiones polares, donde las líneas del campo magnético se curvan hacia el suelo. Al chocar con el oxígeno y el nitrógeno de la alta atmósfera, entre unos 100 y 300 kilómetros de altura, los hacen brillar y aparecen las auroras boreales y australes. El oxígeno produce los tonos verdes y rojos, y el nitrógeno aporta destellos azules y violetas. Son la prueba visible de que nuestro escudo magnético está trabajando.",
      "Las tormentas solares también nos recuerdan la ley de inducción de Faraday. El 13 de marzo de 1989, una fuerte tormenta geomagnética hizo variar el campo magnético terrestre tan deprisa que indujo corrientes eléctricas en las líneas de alta tensión de Quebec, en Canadá. Los transformadores se sobrecargaron y unos seis millones de personas se quedaron sin electricidad durante unas nueve horas. Por eso hoy las compañías eléctricas y las agencias espaciales vigilan el clima espacial todos los días."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El polo norte magnético se mueve. Durante buena parte del siglo XX estuvo en el norte de Canadá, pero en las últimas décadas se ha desplazado hacia Siberia a velocidades que llegaron a unos 50 kilómetros por año. Por eso los mapas y los sistemas de navegación de aviones, barcos y teléfonos usan un modelo del campo magnético que se actualiza periódicamente, llamado Modelo Magnético Mundial." },
      { label: "Dato Científico", icon: "atom", text: "El campo magnético en la superficie terrestre es débil: va de unos 25 a 65 microteslas, es decir, alrededor de 0.00005 teslas. Un imán de refrigerador es unas cien veces más intenso, y una máquina de resonancia magnética, decenas de miles de veces. Sin embargo, el campo terrestre ocupa un volumen enorme alrededor del planeta, y es esa extensión, no su intensidad, la que le permite desviar el viento solar de forma tan eficaz." }
    ],
    fact: "La tormenta solar más intensa registrada es el evento Carrington de 1859, llamado así por el astrónomo inglés Richard Carrington, que observó la llamarada que lo originó. Hubo auroras visibles en lugares tan al sur como el Caribe, y los cables de telégrafo de Europa y América lanzaron chispas porque el campo magnético cambiante inducía corrientes en ellos. Faraday aún vivía en Londres: fue una demostración planetaria de su propia ley de inducción.",
  }
];

// ─── Marine Particle Field (Canvas Background) ──────────────────────────────
function MarineParticleField() {
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
      hue: Math.random() > 0.5 ? '184,125,94' : '184,125,94', // slate blue or copper
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

// ─── Marine Header ──────────────────────────────────────────────────────────
function MarineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(184,125,94,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradFaradayM3)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7A8C", "#8A6F5A", "#6E8B74", "#7D6B8F", "#8C7A4F", "#4F6D7A", "#8F5F5F"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#B87D5E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#B87D5E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradFaradayM3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(184,125,94,0.2)" />
            <stop offset="50%" stopColor="rgba(184,125,94,0.9)" />
            <stop offset="100%" stopColor="rgba(184,125,94,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B87D5E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL ESCUDO INVISIBLE DE METAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(184,125,94,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MICHAEL FARADAY</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(184,125,94,0.2)'}`,
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
          layoutId="activeDotFaradayM3"
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

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
        {node.bannerImage && (
              <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                <img src={node.bannerImage} alt={node.bannerCaption || ''}
                     style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
                {node.bannerCaption && (
                  <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                              fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                              textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                    {node.bannerCaption}
                  </p>
                )}
              </div>
            )}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(184,125,94,0.15)',
    }}>
      <Star size={14} style={{ color: '#B87D5E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #B87D5E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(184,125,94,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#B87D5E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_FaradayM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.96) 0%, rgba(15,10,35,0.94) 40%, rgba(10,12,30,0.97) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(184,125,94,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MarineParticleField />

      <MarineHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(184,125,94,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(184,125,94,0.08)', borderRadius: '16px',
              border: '1px solid rgba(184,125,94,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#B87D5E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Maestro del Escudo: campos, jaulas metálicas y escudos espaciales
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia
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

      {/* ImageLightbox */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
