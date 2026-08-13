'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Interstellar themed) ────────────────────────────
function DecoComet({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M45 15 L25 35 Q15 45 10 50 Q5 55 10 45 Q15 35 25 25 Z" fill={color} opacity="0.3" />
      <circle cx="45" cy="15" r="6" fill={color} opacity="0.8" />
      <path d="M45 15 L15 25 M45 15 L35 45 M45 15 L20 30" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  );
}

function DecoOrbit({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} />
      <path d="M5 55 Q30 20 55 55" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M5 55 Q30 20 55 55" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.3" />
      <circle cx="15" cy="43" r="2" fill={color} opacity="0.7" />
      <circle cx="45" cy="43" r="2" fill={color} opacity="0.7" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#448AFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 50 L50 50 L45 35 L15 35 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <circle cx="30" cy="35" r="15" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M20 25 L40 10 L45 15 L25 30 Z" fill={color} opacity="0.4" />
      <line x1="25" y1="30" x2="20" y2="25" stroke={color} strokeWidth="2" />
      <line x1="45" y1="15" x2="40" y2="10" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoAsteroid({ size = 70, color = '#FF9100', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 L45 15 L50 30 L40 48 L20 50 L10 35 L15 20 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8" />
      <circle cx="25" cy="25" r="3" fill={color} opacity="0.4" />
      <circle cx="38" cy="35" r="4" fill={color} opacity="0.5" />
      <circle cx="20" cy="40" r="2" fill={color} opacity="0.3" />
      <path d="M30 10 L45 15 L50 30 L40 48 L20 50 L10 35 L15 20 Z" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoRocket({ size = 70, color = '#FFD740', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 Q40 25 35 45 L25 45 Q20 25 30 10 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M25 45 L20 55 M35 45 L40 55 M28 45 L30 55 M32 45 L30 55" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.7" />
      <path d="M30 10 Q40 25 35 45 L25 45 Q20 25 30 10 Z" fill={color} opacity="0.2" />
    </svg>
  );
}

const DECO_MAP = {
  'que-es-interestelar': [DecoAsteroid, DecoOrbit, DecoComet],
  'velocidad-escape': [DecoRocket, DecoOrbit, DecoAsteroid],
  'orbita-hiperbolica': [DecoOrbit, DecoTelescope, DecoComet],
  'catalogo-nomadas': [DecoAsteroid, DecoComet, DecoTelescope],
  'deteccion-pan-starrs': [DecoTelescope, DecoAsteroid, DecoOrbit],
  'composicion-quimica': [DecoComet, DecoAsteroid, DecoRocket],
  'futuro-caza': [DecoRocket, DecoTelescope, DecoOrbit],
}; const BIBLIOGRAPHY = ['Meech, K. et al. (2017). "A brief visit from a red and extremely elongated interstellar asteroid", Nature, 552',
  '\'Oumuamua ISSI Team (2019). "The natural history of \'Oumuamua", Nature Astronomy, 3',
  'Jewitt, D. & Luu, J. (2019). "Initial Characterization of Interstellar Comet 2I/Borisov", The Astrophysical Journal Letters, 886',
  'Seligman, D. & Laughlin, G. (2018). "The Feasibility and Benefits of In Situ Exploration of \'Oumuamua-like Objects", The Astronomical Journal, 155'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-es-interestelar',
    title: '¿Qué es Interestelar?',
    color: '#00E5FF',
    btnImage: '/assets/interestelar/infographic_m1/btn_que-es-interestelar.jpg',
    image: '/assets/interestelar/infographic_m1/hero_que-es-interestelar.jpg',
    content: [
      'Imagina que nuestro Sistema Solar es tu vecindario, donde el Sol es tu casa y los planetas son las casas de los vecinos. Todos giran por las mismas calles gracias a la gravedad del Sol, que los mantiene unidos. Pero de repente, ves un visitante que viene desde una ciudad lejana, cruza rápido y se va. Eso es un objeto interestelar. Es un viajero cósmico que nació alrededor de otra estrella a billones de kilómetros. Solo está de paso por nuestro vecindario estelar.',
      '¿Cómo sabemos que no son de aquí? La respuesta está en su movimiento. Los planetas, asteroides y cometas de nuestro Sistema Solar viajan en órbitas elípticas. Es como si estuvieran atados al Sol con una cuerda. En cambio, los objetos interestelares no están atados a nuestra estrella. Tienen mucha energía y se mueven rápido. La gravedad del Sol no es fuerte para atraparlos. Llegan desde el espacio profundo, se acercan al Sol y salen disparados.',
      'El primer visitante interestelar descubierto se llamó \'Oumuamua, que significa "primer mensajero" en hawaiano. Fue descubierto en el año 2017. Fue un descubrimiento emocionante porque nunca habíamos logrado detectar uno. \'Oumuamua era un objeto extraño con forma de cigarro alargado. Nunca habíamos visto algo así en los asteroides de nuestro vecindario.',
      'En 2019, el astrónomo Gennadiy Borisov descubrió el segundo objeto interestelar. Lo llamaron cometa 2I/Borisov. A diferencia de \'Oumuamua, Borisov se comportaba como los cometas de nuestro Sistema Solar. Al acercarse al Sol, su hielo comenzó a derretirse. Formó una cola brillante de gas y polvo. Esto demostró que alrededor de otras estrellas también se forman cometas de hielo.',
      'Estudiar estos objetos es como recibir botellas con mensajes de estrellas lejanas. Aún no tenemos la tecnología para enviar naves a otros sistemas estelares. Los objetos interestelares nos traen muestras de otros mundos. Al analizar su luz y sus gases, podemos saber de qué están hechos los planetas lejanos. Así, cada objeto nos regala un pedazo del rompecabezas del universo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los astrónomos calculan que hay al menos diez mil objetos interestelares del tamaño de \'Oumuamua cruzando la órbita de Neptuno. Son tantos porque cada estrella expulsa millones de estas rocas cuando sus planetas se forman. Así se crea una sopa de asteroides que vagan por el espacio interestelar.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad de estos nómadas cósmicos es alta. \'Oumuamua entró al Sistema Solar a más de 90,000 kilómetros por hora. Al pasar cerca del Sol, la gravedad lo aceleró. Alcanzó una velocidad máxima de 315,000 kilómetros por hora. Es suficiente para cruzar la Tierra en pocos segundos.' }
    ],
    fact: 'El nombre técnico de \'Oumuamua es 1I/2017 U1. La "I" representa la palabra "Interestelar". Fue la primera vez que la Unión Astronómica Internacional creó una categoría nueva para un objeto. Antes, solo existían las letras"A" para Asteroides y "C" para Cometas. Este asteroide revolucionó las nomenclaturas.',
  },
  {
    id: 'velocidad-escape',
    title: 'Velocidad de Escape',
    color: '#B388FF',
    btnImage: '/assets/interestelar/infographic_m1/btn_velocidad-escape.jpg',
    image: '/assets/interestelar/infographic_m1/hero_velocidad-escape.jpg',
    content: [
      'Imagina lanzar una pelota hacia arriba. Si la lanzas despacio, vuelve a caer. Si la lanzas con más fuerza, sube más alto. Pero si la lanzas con una fuerza enorme, la gravedad de la Tierra ya no la detendrá. La pelota seguiría viajando hacia el espacio. Esa velocidad se conoce como "velocidad de escape". Cada planeta y estrella tiene la suya dependiendo de su gravedad.',
      'Para escapar de la Tierra, un cohete necesita viajar a 11.2 kilómetros por segundo. A esa velocidad, el cohete puede romper la gravedad terrestre y viajar a la Luna o Marte. Pero para escapar del Sol y abandonar nuestro Sistema Solar, tendrías que viajar más rápido. El Sol es masivo y su gravedad es muy fuerte. Su velocidad de escape es de 617 kilómetros por segundo.',
      'Aquí es donde los objetos interestelares demuestran que no son de aquí. Cuando los astrónomos midieron la velocidad de \'Oumuamua y del cometa Borisov, se dieron cuenta de que viajaban muy rápido. Se movían a una velocidad mayor que la velocidad de escape del Sol. Esto significa que es imposible que la gravedad del Sol los haya capturado. Siempre han sido viajeros libres.',
      'Es como ver un auto de carreras pasar por una zona escolar. Por su velocidad, sabes que no pertenece a ese lugar y solo está cruzando. Las sondas Voyager tuvieron que usar la gravedad de planetas como Júpiter y Saturno para ganar velocidad. Así lograron alcanzar la velocidad de escape necesaria para abandonar el Sistema Solar.',
      '¿Cómo lograron estos objetos de hielo y roca alcanzar velocidades tan altas? Creemos que fueron expulsados de sus sistemas estelares originales. Esto ocurre cuando planetas gigantes como Júpiter migran de sus órbitas. Así patean miles de asteroides y cometas hacia el espacio profundo como pelotas en un juego cósmico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Incluso los agujeros negros tienen una velocidad de escape, pero es mayor que la velocidad de la luz. Como nada puede viajar más rápido que la luz, ninguna nave puede escapar de la atracción de un agujero negro una vez que cruza el horizonte de eventos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las sondas Voyager 1 y 2 son los objetos humanos más rápidos y alejados en el espacio. Viajan a unos 17 kilómetros por segundo a través de la heliopausa. Ya lograron superar la velocidad de escape para dejar el Sol. En miles de millones de años, podrían ser descubiertas por alienígenas.' }
    ],
    fact: 'Para calcular la velocidad de escape de un planeta, los físicos usan una ecuación matemática de Newton. Es la raíz cuadrada de dos veces la constante gravitacional, multiplicada por la masa del astro, y dividida por su radio. Esta fórmula permite planear misiones espaciales seguras.',
  },
  {
    id: 'orbita-hiperbolica',
    title: 'Ãƒ"rbitas Hiperbólicas',
    color: '#64FFDA',
    btnImage: '/assets/interestelar/infographic_m1/btn_orbita-hiperbolica.jpg',
    image: '/assets/interestelar/infographic_m1/hero_orbita-hiperbolica.jpg',
    content: [
      'Piensa en las vías de una montaña rusa. Si forman un círculo o un óvalo cerrado, el carrito dará vueltas pasando por el mismo lugar. Así funcionan las órbitas elípticas de planetas como la Tierra, que repiten su camino alrededor del Sol. Pero, ¿qué pasaría si la vía nunca se cierra, hace una curva y se pierde? Esa trayectoria abierta es una órbita hiperbólica.',
      'Para los astrónomos, la forma del camino que sigue un objeto es una huella para saber de dónde viene. Utilizan un número llamado "excentricidad matemática" para medir qué tan abierta es una órbita. Si es cero, es un círculo perfecto. Si está entre cero y uno, es una elipse cerrada. Si es mayor a uno, el camino está abierto y forma una hipérbola. Esto prueba que el objeto proviene del espacio interestelar.',
      'Cuando descubrieron a \'Oumuamua, los computadores calcularon su trayectoria basándose en fotos. El resultado dejó a los científicos sorprendidos: su excentricidad era de 1.2. Esto era algo nunca antes registrado en la historia de la observación. Era la firma de una órbita hiperbólica. Esto confirmó que \'Oumuamua venía desde más allá de las fronteras de nuestro Sistema Solar y se iría sin retorno.',
      'El cometa Borisov tuvo un número aún más asombroso. Su excentricidad fue calculada en más de 3.3. Esto significa que su camino era mucho más directo. Entraba y salía de nuestro sistema casi en línea recta, sufriendo una pequeña desviación al pasar cerca del Sol. Esta trayectoria nos ayudó a deducir que Borisov viajaba a una velocidad muy alta desde antes de sentir la gravedad de nuestra estrella.',
      'Trazar estas órbitas no es una tarea fácil. Se requiere que telescopios de todo el mundo tomen cientos de fotografías durante varias semanas. Esto sirve para medir cómo se mueve ese punto de luz contra el fondo de estrellas. Con los puntos conectados, las leyes de la gravedad de Newton nos permiten predecir en qué sitio estará el objeto en el futuro.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Además de las órbitas elípticas cerradas y las hiperbólicas abiertas, existe una órbita parabólica. Se distingue porque su excentricidad es igual a 1.0. Muchos cometas provenientes de la Nube de Oort viajan con trayectorias que son casi parabólicas en sus recorridos más distantes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La sonda robótica New Horizons, que visitó Plutón, viaja en una órbita hiperbólica. Fue provocada por los cohetes que la lanzaron y un empujón de la gravedad de Júpiter. Su excentricidad orbital es superior a 1, lo que significa que acabará flotando en el espacio interestelar.' }
    ],
    fact: 'La matemática necesaria para comprender las órbitas de los planetas, cometas y objetos interestelares fue descrita por el científico Isaac Newton. Lo hizo en su libro "Principia Mathematica", publicado en el año 1687.',
  },
  {
    id: 'catalogo-nomadas',
    title: 'El Catálogo de Nómadas',
    color: '#FF9100',
    btnImage: '/assets/interestelar/infographic_m1/btn_catalogo-nomadas.jpg',
    image: '/assets/interestelar/infographic_m1/hero_catalogo-nomadas.jpg',
    content: [
      'A pesar de que el universo es inmenso y tiene miles de millones de años, nuestro catálogo de objetos interestelares es muy pequeño. Hasta el momento, los astrónomos solo tienen el registro de dos visitantes confirmados. El primero es \'Oumuamua, la roca interestelar que descubrimos en 2017. El segundo es 2I/Borisov, el cometa interestelar descubierto en 2019. Lograr encontrar estos objetos en la oscuridad del universo es una tarea difícil.',
      'Sin embargo, el hecho de que solo hayamos observado a dos astros interestelares no significa que no existan más. Los astrofísicos han utilizado modelos matemáticos para estimar su población. Ellos creen que el espacio interestelar está lleno de asteroides y cuerpos que viajan a gran velocidad.',
      'Entonces, ¿si hay tantas rocas nómadas volando cerca nuestro, por qué no las vemos a diario? Porque el universo es enorme y estos objetos son pequeños y fríos. A diferencia de las estrellas que emiten luz propia, estos asteroides son oscuros. Solo reflejan una pequeña parte de luz originada por el Sol.',
      'Existe una sub-categoría de posibles visitantes espaciales: los meteoros. En el año 2014, un meteoro de menos de un metro de diámetro estalló por la fricción en la atmósfera de la Tierra sobre el Océano Pacífico. Tiempo después, los observadores descubrieron que el meteoro IM1 era interestelar por su alta energía y velocidad hiperbólica.',
      'En el futuro, nuestro catálogo de asteroides y cometas nómadas crecerá. Esto será impulsado por la inauguración de nuevas generaciones de observatorios terrestres y telescopios espaciales muy sensibles.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El descubridor del objeto interestelar 2I/Borisov no fue un profesor de universidad ni trabajaba para agencias gubernamentales. Gennadiy Borisov es un astrónomo aficionado que construyó sus propios telescopios.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El nombre hawaiano del primer objeto interestelar, \'Oumuamua, significa "el mensajero que llega de lejos". Fue seleccionado cuidadosamente para representar su origen desde un sistema estelar remoto.' }
    ],
    fact: 'Muchos biólogos y astrofísicos especulan sobre la teoría de la "panspermia". Esta teoría sugiere que la vida microscópica básica pudo haber llegado a la Tierra en pedazos de roca cósmica o meteoritos interestelares.',
  },
  {
    id: 'deteccion-pan-starrs',
    title: 'Pan-STARRS y Telescopios',
    color: '#448AFF',
    btnImage: '/assets/interestelar/infographic_m1/btn_deteccion-pan-starrs.jpg',
    image: '/assets/interestelar/infographic_m1/hero_espacio-entre-estrellas.jpg',
    content: [
      'Cazar objetos interestelares veloces y oscuros es una tarea titánica. Es similar a intentar atrapar un insecto escurridizo volando en una habitación a oscuras. Para lograrlo, los telescopios, cámaras fotográficas y observatorios de hoy en día son muy potentes.',
      'Un ejemplo es el sistema robótico Pan-STARRS. Su lente funciona como un ojo telescópico que escanea el cielo nocturno pacientemente. Observa todos los rincones cada madrugada de forma rápida y cíclica. Su cámara digital tiene mil millones de píxeles sensibles a la luz.',
      'Durante una noche histórica, la red de computadoras del Pan-STARRS detectó el paso de un punto estelar difuso. Se movía a una velocidad muy alta para cruzar el cielo. El software automático levantó una alarma al notar este movimiento inusual y rápido.',
      'Para poder encontrar más objetos oscuros y veloces en medio del vacío cósmico, debemos construir mejores herramientas. Se necesitan nuevos telescopios gigantes con cámaras muy sensibles que logren atrapar luz tenue, como el observatorio Vera C. Rubin en Chile.',
      'Con el desarrollo tecnológico actual de la astronomía moderna, el futuro se abre ante los científicos. Los astrónomos e ingenieros están muy entusiasmados por las nuevas posibilidades de descubrimiento.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La cámara digital construida para el Observatorio Vera C. Rubin es enorme. Tiene el tamaño de un automóvil pequeño y un lente frontal de 1.57 metros de diámetro para observar el cielo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Cada noche, cuando el telescopio observa una estrella, la computadora procesa una gran cantidad de fotos. La velocidad extrema y el movimiento del objeto capturado demuestran matemáticamente que proviene de lejos.' }
    ],
    fact: 'El telescopio espacial James Webb es un invento increíble para la astronomía infrarroja. Su diseño sensible le permite observar el universo profundo con gran precisión, listo para descubrir objetos interestelares.',
  },
  {
    id: 'composicion-quimica',
    title: 'Composición Química',
    color: '#FF80AB',
    btnImage: '/assets/interestelar/infographic_m1/btn_composicion-quimica.jpg',
    image: '/assets/interestelar/infographic_m1/hero_composicion-quimica.jpg',
    content: [
      'Saber de qué están hechos los objetos interestelares a distancia es todo un reto. Los astrónomos analizan qué metales, hielos o polvo antiguo están en el interior de estos asteroides lejanos. Es como intentar adivinar los ingredientes de una receta sin probarla.',
      'Cuando los científicos aplicaron la técnica de espectroscopia a \'Oumuamua, se llevaron sorpresas. Encontraron que la roca interestelar no expulsaba gases ni polvo como lo hacen los cometas en sus recorridos. Parece que los fuertes rayos cósmicos le dieron una superficie dura de color rojizo.',
      'Además, \'Oumuamua guardaba otro misterio inesperado. Su forma alargada y su comportamiento al acelerar sin emitir gases dejó perplejos a los físicos y astrónomos más experimentados. Aún hay debates sobre su origen exacto.',
      'En contraste, la aparición del segundo visitante estelar fue diferente. El cometa 2I/Borisov fue un evento visible y activo. A diferencia de la roca seca, Borisov mostró una cola brillante de gas y polvo, lo que hizo su composición química más fácil de leer.',
      'Esta diferencia química radical resulta ser un tesoro cósmico para los exploradores astrofísicos. Nos muestra que existen diferentes tipos de objetos expulsados de otros sistemas estelares, algunos helados y otros rocosos con superficies ricas en monóxido.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El profesor e investigador astrofísico de Harvard, Avi Loeb, publicó una teoría controvertida. Sugirió que la forma inusual de \'Oumuamua podría ser el resultado de tecnología alienígena.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El color rojizo pálido observado en la superficie de \'Oumuamua y otros objetos espaciales es causado por las tolinas. Son compuestos orgánicos formados cuando sustancias ricas en carbono son irradiadas por luz ultravioleta.' }
    ],
    fact: 'Gran parte del universo está compuesto de polvo estelar y los mismos materiales astronómicos básicos. Estos elementos primordiales se forjaron en el interior de estrellas y se dispersaron por el espacio.',
  },
  {
    id: 'futuro-caza',
    title: 'El Futuro de la Caza',
    color: '#FFD740',
    btnImage: '/assets/interestelar/infographic_m1/btn_futuro-caza.jpg',
    image: '/assets/interestelar/infographic_m1/hero_futuro-caza.jpg',
    content: [
      'Al considerar que los objetos interestelares son como botellas con mensajes, parece lógico intentar atraparlos. Los científicos sueñan con poder estudiar su composición directamente en el futuro.',
      'Como solución a este problema técnico, la Agencia Espacial Europea ha decidido construir la sonda Comet Interceptor. Su misión será esperar en el espacio y salir a cazar un cometa prístino o un visitante interestelar.',
      'Cuando se detecte el paso de un nuevo sistema espacial, la sonda despertará. Se impulsará fuertemente para volar e interceptar al objeto antes de que abandone nuestro vecindario.',
      'Otra propuesta científica es el Proyecto Lyra. Buscaría enviar una nave muy rápida para alcanzar a \'Oumuamua o futuros nómadas interestelares en un viaje lejano, utilizando tecnologías de propulsión avanzadas.',
      'Todo esto convierte a la persecución de cometas errantes en la nueva frontera de la exploración. Es una aventura científica que nos permitirá aprender más sobre la formación de otros sistemas solares.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La sonda Comet Interceptor esperará en un punto espacial llamado Lagrange 2. Es un lugar muy estable donde las fuerzas gravitacionales de la Tierra y el Sol se equilibran.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para viajar más rápido en el espacio profundo, los ingenieros planean usar propulsores iónicos modernos. Estos sistemas aceleran partículas para generar un empuje constante y eficiente durante el viaje.' }
    ],
    fact: 'Los humanos ya hemos lanzado naves que viajan por el espacio interestelar. Las sondas Voyager y las Pioneer han cruzado el límite de nuestro Sistema Solar y ahora son embajadores nómadas.',
  },
];

export default function InteractiveInfographic_InterestelarM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%),',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <CosmicDustField />
      <InterestelarHeader />
      
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #a78bfa)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.3)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.05)',
      }}>
        {INFOGRAPHIC_NODES.map((node, i) => (
          <NodeButton
            key={node.id}
            node={node}
            index={i}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 3, flex: 1 }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '300px',
                color: 'rgba(255,255,255,0.4)', textAlign: 'center', gap: '1rem',
              }}
            >
              <Sparkles size={32} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', maxWidth: '300px', lineHeight: 1.6 }}>
                Selecciona uno de los módulos para explorar la ciencia detrás de los nómadas del cosmos.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' }}>
          Referencias Científicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.2)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid rgba(0,229,255,0.3)' }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}

function CosmicDustField() {
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
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
      hue: Math.random() > 0.5 ? '0, 229, 255' : '179, 136, 255',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
        p.x += p.driftX;
        p.y += p.driftY;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
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

function InterestelarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,229,255,0.3))' }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#orbitGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          const colors = ['#00E5FF','#B388FF','#64FFDA','#FF9100','#448AFF','#FF80AB','#FFD740'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke="#00E5FF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill="#00E5FF" opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0,229,255,0.2)" />
            <stop offset="50%" stopColor="rgba(0,229,255,0.9)" />
            <stop offset="100%" stopColor="rgba(0,229,255,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill="#00E5FF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">NÓMADAS DEL COSMOS</text>
        <text x="300" y="95" textAnchor="middle" fill="rgba(0,229,255,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">OBJETOS INTERESTELARES</text>
      </svg>
    </div>
  );
}

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
          layoutId="activeDotInterestelar"
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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(10, 12, 30, 0.92)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}
        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
