'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Space Engineering Themed)
   ========================================================================= */

const DecoGear = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" opacity="0.9"/>
  </svg>
);

const DecoRocket = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5m2-2l7-7a3.53 3.53 0 00-5-5l-7 7m5 5l-5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
    <circle cx="14" cy="10" r="1.5" stroke={color} strokeWidth="1.5" opacity="0.9"/>
    <path d="M9.5 9.5l-3.5 3.5m5-5l3.5-3.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
  </svg>
);

const DecoSatellite = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M8 12a4 4 0 018 0M8 8a8 8 0 018 0M8 4a12 12 0 018 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    <rect x="3" y="16" width="18" height="4" rx="1" stroke={color} strokeWidth="1.5" opacity="0.9"/>
    <path d="M12 16v-2m-4 2v-2m8 2v-2" stroke={color} strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

const DecoSpaceStation = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <rect x="4" y="10" width="16" height="4" rx="1" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <rect x="2" y="8" width="4" height="8" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <rect x="18" y="8" width="4" height="8" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.9"/>
    <path d="M12 10V6m0 8v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const DecoWrench = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
  </svg>
);

const DECO_MAP = {
  'iss-naves': [DecoSpaceStation, DecoGear],
  'materiales': [DecoGear, DecoWrench],
  'propulsion': [DecoRocket, DecoGear],
  'megaestructuras': [DecoSpaceStation, DecoSatellite],
  'mineria': [DecoWrench, DecoGear],
  'soporte-vital': [DecoSatellite, DecoSpaceStation],
  'gravedad': [DecoGear, DecoSpaceStation],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "NASA (2023). 'International Space Station Facts and Figures'. NASA History Office.",
  "O'Neill, G. K. (1974). 'The Colonization of Space'. Physics Today, 27(9), 32-40.",
  "Dyson, F. J. (1960). 'Search for Artificial Stellar Sources of Infrared Radiation'. Science, 131(3409).",
  "Zubrin, R. (1996). 'The Case for Mars: The Plan to Settle the Red Planet and Why We Must'. Free Press.",
  "Bussard, R. W. (1960). 'Galactic Matter and Interstellar Flight'. Astronautica Acta, 6, 179-194.",
  "Lewis, J. S. (1996). 'Mining the Sky: Untold Riches from the Asteroids, Comets, and Planets'. Addison-Wesley."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'iss-naves',
    title: 'De la ISS a los Destructores Estelares',
    color: '#90CAF9',
    btnImage: '/assets/starwars/infographic_cruceros/btn_iss-naves.png',
    image: '/assets/starwars/infographic_cruceros/hero_iss-naves.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_iss-naves.png',
    bannerCaption: 'La inmensidad del espacio requiere naves gigantescas para su exploración.',
    content: [
      "¿Te imaginas construir una ciudad flotante en la inmensidad del espacio exterior? En el asombroso universo de Star Wars, los majestuosos Destructores Estelares Imperiales miden aproximadamente 1,600 metros de largo, lo que equivale a más de 16 campos de fútbol completos unidos. Para lograr semejante hazaña de ingeniería, el Imperio Galáctico utiliza enormes y complejos astilleros orbitales donde miles de trabajadores y androides ensamblan estas naves directamente en el vacío del espacio, evitando el inmenso costo de levantar todo ese peso desde la superficie planetaria.",
      "En nuestro mundo real, la Estación Espacial Internacional (ISS) es la estructura artificial más grande, compleja y costosa que los seres humanos hemos logrado construir y mantener en órbita. Mide alrededor de 109 metros de punta a punta, lo que la hace apenas del tamaño de un solo campo de fútbol. Aunque parezca diminuta al compararla con un imponente Destructor Estelar, la ISS es un absoluto milagro tecnológico y un triunfo de la ingeniería humana que ha estado continuamente habitada por astronautas desde noviembre del año 2000.",
      "Imagina que la ISS es como un gigantesco y costoso set de piezas de LEGO que flota a 408 kilómetros sobre nuestras cabezas. Para construir este laboratorio espacial que pesa aproximadamente 420,000 kilogramos, se requirió el enorme esfuerzo de 15 países diferentes y se necesitaron lanzar más de 40 misiones espaciales separadas. Cada módulo presurizado, panel solar y brazo robótico tuvo que ser lanzado individualmente al espacio usando los poderosos Transbordadores Espaciales y cohetes rusos, para luego ser ensamblados cuidadosamente por astronautas en largas y peligrosas caminatas espaciales.",
      "Viajar en el espacio no es como manejar un automóvil en la carretera; la ISS se mueve a la asombrosa velocidad de 27,600 kilómetros por hora. A este ritmo vertiginoso, la estación completa una órbita alrededor de toda la Tierra cada 90 minutos. Esto significa que los valientes astronautas que viven allí arriba son testigos de 16 amaneceres y 16 atardeceres cada día de 24 horas. Construir una nave del tamaño de un Destructor Estelar requeriría que nuestra civilización humana diera un salto tecnológico masivo hacia la industrialización y construcción orbital a gran escala.",
      "El asombroso éxito sostenido de la ISS nos demuestra empíricamente que la colaboración internacional masiva puede lograr lo que parecía ciencia ficción hace apenas unas décadas. En el brillante futuro de la exploración espacial, la humanidad inevitablemente utilizará las valiosas lecciones aprendidas en la construcción y mantenimiento de la Estación Espacial Internacional para diseñar, ensamblar y pilotar auténticas y colosales naves interplanetarias que algún día nos llevarán sanos y salvos a las distantes estrellas y planetas inexplorados de nuestra Vía Láctea."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio IV: Una Nueva Esperanza, vemos por primera vez un colosal Destructor Estelar Imperial persiguiendo a la diminuta nave rebelde Tantive IV. Esta famosa toma inicial fue diseñada específicamente para mostrar el abrumador poder y el tamaño titánico del Imperio Galáctico, estableciendo visualmente que sus recursos industriales y capacidades de construcción en astilleros orbitales como los de Kuat superan por mucho a cualquier otra facción, permitiéndoles fabricar gigantescas flotas de guerra para controlar toda la galaxia.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La Estación Espacial Internacional (ISS) no está totalmente libre de la fuerza de gravedad; en realidad, se encuentra en un constante estado de caída libre perpetua alrededor del planeta Tierra. Debido a que se mueve hacia adelante a una increíble velocidad de 7.6 kilómetros por segundo, la curvatura de la Tierra cae por debajo de ella al mismo ritmo que la estación cae hacia el suelo, lo que crea el famoso efecto de ingravidez o microgravedad que experimentan diariamente los astronautas a bordo.' 
      }
    ],
    fact: 'La Estación Espacial Internacional es el objeto artificial más caro jamás construido por el ser humano, con un costo total estimado en más de 150 mil millones de dólares. Flota a más de 400 kilómetros de altura y es visible desde la Tierra a simple vista como una estrella brillante que se mueve rápidamente cruzando el cielo nocturno.'
  },
  {
    id: 'materiales',
    title: 'Supermateriales del Futuro',
    color: '#B0BEC5',
    btnImage: '/assets/starwars/infographic_cruceros/btn_materiales.png',
    image: '/assets/starwars/infographic_cruceros/hero_materiales.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_materiales.png',
    bannerCaption: 'Nuevas aleaciones y aerogeles permitirán estructuras imposibles hoy.',
    content: [
      "Construir naves espaciales masivas requiere materiales extraordinarios que desafíen los límites de la física y la química conocidas. Si intentáramos construir un Destructor Estelar gigante usando el acero tradicional que utilizamos para los barcos en la Tierra, sería tan pesado e ineficiente que requeriría una cantidad absurda e imposible de combustible solo para moverlo un poco. Es por esto que los verdaderos ingenieros aeroespaciales buscan incesantemente crear o descubrir supermateriales que sean extremadamente ligeros pero más resistentes que el diamante.",
      "Uno de los campeones modernos de la ingeniería espacial es la fibra de carbono. Imagina un material que está tejido meticulosamente como si fuera tela o ropa de altísima calidad, pero que resulta ser cinco veces más fuerte que el acero endurecido y pesa una pequeña fracción del mismo. La fibra de carbono se fabrica entrelazando millones de hilos microscópicos de carbono puros y luego endureciéndolos con resinas especiales, lo que la hace perfecta para construir los fuselajes de naves de última generación y los gigantescos tanques de combustible de los cohetes modernos.",
      "Para proteger a las naves del infierno ardiente que experimentan al reingresar a la atmósfera terrestre y de las temperaturas extremas del vacío espacial, la NASA utiliza las asombrosas aleaciones de titanio. El titanio es un metal fascinante que no se corroe con el tiempo y mantiene su increíble fuerza estructural incluso cuando está sometido a temperaturas donde otros metales comunes simplemente se derretirían como si fueran mantequilla caliente o se quebrarían como frágiles cristales helados en el profundo frío del espacio profundo.",
      "Aún más sorprendentes son los modernos aerogeles, una clase asombrosa de materiales ultraligeros que los científicos suelen apodar con el poético nombre de 'humo congelado'. Un aerogel está compuesto por más de un 99% de aire puro atrapado en una red tridimensional microscópica de sílice. A pesar de ser tan ligero que casi flota y apenas se siente al tocarlo, es uno de los mejores aislantes térmicos jamás inventados en la historia de la humanidad, capaz de proteger fácilmente una delicada flor del intenso fuego directo de un soplete.",
      "En las futuras décadas, el desarrollo de nanomateriales revolucionarios como el grafeno o los prometedores nanotubos de carbono, nos permitirá manufacturar y ensamblar componentes para naves espaciales colosales. Estos materiales hiperavanzados no solo reducirán dramáticamente el inmenso costo de los lanzamientos al espacio al ser mucho más ligeros, sino que poseerán la resistencia crítica necesaria para soportar los rigurosos impactos de micrometeoritos a altas velocidades y las tremendas fuerzas estructurales de un viaje interplanetario veloz y seguro."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el rico universo de Star Wars, los cascos y el fuerte blindaje de las naves espaciales, como las cazas estelares X-Wing y los imponentes Destructores, están forjados frecuentemente con aleaciones de supermateriales de ciencia ficción como el famoso \'Duracero\' o el impenetrable \'Mandaloriano\' (Beskar). Estos materiales ficticios combinan milagrosamente una extrema ligereza con la capacidad de absorber de manera impecable el impacto térmico directo de los potentes y letales disparos de armas bláster y turboláseres pesados.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El aerogel de sílice ostenta oficialmente el Récord Guinness Mundial como el material sólido más ligero jamás creado en la Tierra. A pesar de que su densidad visual se asemeja bastante a un fantasma o a una nube congelada, un bloque de aerogel del tamaño de un ser humano pesa menos de medio kilogramo, pero es tan resistente que puede soportar estoicamente hasta 4,000 veces su propio peso antes de colapsar bajo la presión mecánicamente aplicada.' 
      }
    ],
    fact: 'El grafeno, descubierto empíricamente en 2004, está formado por una sola capa atómica de carbono. Es 200 veces más fuerte que el acero estructural, altamente flexible y el mejor conductor eléctrico a temperatura ambiente, perfilándose como el material clave para los cascos de las naves espaciales interplanetarias.'
  },
  {
    id: 'propulsion',
    title: 'Motores Estelares: Química a Iones',
    color: '#FFB74D',
    btnImage: '/assets/starwars/infographic_cruceros/btn_propulsion.png',
    image: '/assets/starwars/infographic_cruceros/hero_propulsion.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_propulsion.png',
    bannerCaption: 'La velocidad de la luz aún está lejos, pero los motores iónicos ya son una realidad científica.',
    content: [
      "Para mover cualquier nave espacial, sin importar su tamaño, necesitas un avanzado y potente sistema de propulsión. Imagina que viajas patinando sobre hielo y llevas en tus brazos una pesada bola de boliche; si lanzas repentinamente la bola con fuerza hacia adelante, tu cuerpo se deslizará forzosamente hacia atrás debido a la física clásica. Así es exactamente como funciona el principio de acción y reacción en el espacio absoluto. Las naves tienen que arrojar masivamente gases u otras partículas a altísimas velocidades para poder avanzar hacia su lejano destino final.",
      "La inmensa mayoría de los cohetes que usamos actualmente en la Tierra, como los poderosos cohetes Falcon 9 de la empresa SpaceX, utilizan motores de propulsión química. Estos potentes motores funcionan mezclando violentamente y quemando enormes cantidades de un combustible (como el hidrógeno líquido o el queroseno) con un potente oxidante (como el oxígeno puro) en una cámara de combustión. Esto crea una masiva explosión controlada dirigida hacia atrás. Son fabulosos y muy necesarios para escapar de la aplastante gravedad terrestre, pero consumen demasiado combustible muy rápidamente.",
      "Para los larguísimos y lentos viajes interplanetarios de meses o años, los ingenieros de la NASA y otras agencias han desarrollado con éxito los llamados Motores Iónicos. En lugar de utilizar grandes llamaradas y violentas explosiones químicas, un motor iónico utiliza energía solar o generadores eléctricos para cargar eléctricamente y acelerar átomos pesados de un gas noble, usualmente Xenón. Estos átomos ionizados salen disparados del motor a velocidades increíbles, creando un empuje físico sumamente tenue pero extremadamente constante y eficiente en el tiempo.",
      "Si quisiéramos empujar naves del inmenso tamaño de una verdadera ciudad o de un Destructor Estelar a grandes fracciones de la velocidad de la luz, tal vez usaríamos las poéticas y hermosas Velas Solares o incluso la propulsión nuclear. Una vela solar no usa absolutamente ningún combustible interno, sino que despliega espejos ultradelgados gigantescos para capturar literalmente la sutil presión física y el empuje de las partículas de luz (fotones) provenientes de una estrella cercana o de láseres gigantes apuntados desde la Tierra, empujando la nave sin fin.",
      "El asombroso proyecto DRACO, que actualmente están desarrollando en colaboración la agencia NASA y DARPA, tiene como principal objetivo científico crear y probar un potente cohete de propulsión térmica nuclear operativa para finales de esta misma década. Este avanzado cohete utilizará un pequeño reactor de fisión nuclear para calentar eficientemente el hidrógeno líquido a temperaturas extremas, expandiéndolo y disparándolo a enorme velocidad. Este salto tecnológico crítico podría llevar exitosamente a los humanos al distante planeta Marte en apenas 45 días en lugar de esperar los 7 largos meses actuales."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el universo cinematográfico de Star Wars, las pequeñas cazas estelares TIE Fighter utilizadas por el Imperio (las icónicas naves que tienen gigantescos paneles solares hexagonales a los lados) reciben exactamente su célebre nombre del acrónimo técnico en inglés "Twin Ion Engine" (Motor Iónico Gemelo), demostrando explícitamente cómo la verdadera física y propulsión científica inspiró el diseño original de estas naves icónicas de George Lucas.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La exitosa sonda espacial de la NASA llamada Dawn, impulsada exclusivamente por la revolucionaria propulsión iónica, logró el increíble hito histórico de ser la primera y única nave espacial robótica en orbitar dos cuerpos celestes distintos y distantes más allá del sistema Tierra-Luna: primero el gran asteroide Vesta, y posteriormente el planeta enano Ceres en el frío cinturón de asteroides principal.' 
      }
    ],
    fact: 'El empuje físico producido por los motores iónicos actuales es tan débil como el peso de un papel en tu mano (unos pocos milinewtons). Sin embargo, al operar continuamente durante meses en el vacío absoluto sin fricción, pueden acelerar naves a más de 320,000 kilómetros por hora, batiendo todos los récords.'
  },
  {
    id: 'megaestructuras',
    title: 'Megaestructuras de Ingeniería',
    color: '#CE93D8',
    btnImage: '/assets/starwars/infographic_cruceros/btn_megaestructuras.png',
    image: '/assets/starwars/infographic_cruceros/hero_megaestructuras.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_megaestructuras.png',
    bannerCaption: 'Cilindros de O\'Neill y Esferas de Dyson: los sueños monumentales de los arquitectos del espacio.',
    content: [
      "Más allá de las naves espaciales tradicionales, los científicos, ingenieros y físicos teóricos han soñado despiertos durante muchas décadas con la construcción de las llamadas Megaestructuras Espaciales. Estas son construcciones artificiales de un tamaño tan inmenso e incomprensible que podrían albergar a millones, o incluso a miles de millones, de seres humanos viviendo en confortables ciudades espaciales enteras, con montañas artificiales, lagos de agua dulce, sistemas climáticos propios controlados y ecosistemas completos funcionando en el oscuro y frío vacío sideral.",
      "En el año 1974, el brillante físico de la Universidad de Princeton, Gerard O'Neill, propuso matemáticamente la construcción factible de los famosos 'Cilindros de O'Neill'. Estos serían hábitats espaciales gigantescos formados por inmensos cilindros interconectados que medirían aproximadamente 8 kilómetros de ancho y más de 30 kilómetros de largo. Al hacer girar mecánicamente y de forma continua estos inmensos cilindros sobre su propio eje longitudinal, la constante fuerza centrífuga generada crearía instantáneamente la mágica ilusión física de una gravedad terrestre perfecta en las paredes internas curvadas.",
      "Una idea incluso mucho más ambiciosa y alucinante que los cilindros espaciales es la legendaria 'Esfera de Dyson', imaginada detalladamente por el prestigioso físico cuántico Freeman Dyson en la década de 1960. Imagina una megaestructura esférica de tamaño planetario que rodea y envuelve completamente, o en gran parte, a una estrella anfitriona como nuestro Sol, con el asombroso y único objetivo de capturar eficientemente cada pequeño rayo de luz, calor y energía electromagnética que esta emita hacia el vasto universo que la rodea constantemente.",
      "Si una civilización espacial muy avanzada lograra realmente construir una Esfera de Dyson completa alrededor del Sol, capturaría la asombrosa y gigantesca cantidad de casi 400 trillones de vatios de energía continua y totalmente limpia. Esto sería, literalmente, suficiente energía térmica y eléctrica disponible para alimentar cómodamente a una mega-civilización interestelar miles de millones de veces más grande y avanzada tecnológicamente que la nuestra. Ante este nivel casi divino de poder, incluso una colosal y letal Estrella de la Muerte parecería un simple juguete.",
      "Aunque por el momento construir cualquiera de estas inmensas megaestructuras excede ampliamente nuestras actuales capacidades industriales, económicas y tecnológicas modernas, estudiar con profundo detalle estos conceptos futuristas empuja agresivamente los límites de nuestra creatividad técnica e ingenieril y nos prepara mentalmente. El propio visionario espacial moderno, Jeff Bezos, ha citado a menudo los cilindros de O'Neill como una inspiración directa y fundamental para el futuro a largo plazo de los asentamientos y colonias de la humanidad trabajando armónicamente en el sistema solar."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el canon oficial de Star Wars, la inmensa, amenazante y aterradora Base Starkiller (vista en el Episodio VII: El Despertar de la Fuerza) es, en términos científicos y de ingeniería, una perversa y letal variación extrema de una megaestructura del tipo Esfera de Dyson. Absorbe de manera monstruosa y casi instantánea toda la energía vital y el plasma ardiente de una estrella local cercana para alimentar y potenciar de manera apocalíptica su superarma destructora de sistemas planetarios enteros.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En el año científico 2015, los atónitos astrónomos detectaron fuertes, erráticas e inexplicables fluctuaciones y caídas masivas en el brillo luminoso de la lejana Estrella de Tabby (KIC 8462852). Durante meses, la comunidad astronómica debatió seriamente la exótica y emocionante posibilidad teórica de que una gigantesca megaestructura alienígena en plena construcción estuviera bloqueando la luz estelar. Estudios detallados posteriores apuntaron a densas nubes de polvo interestelar oscuro.' 
      }
    ],
    fact: 'El principal obstáculo físico para construir una esfera de Dyson no es obtener la energía necesaria, sino encontrar y extraer la cantidad absurda de materia bruta y minerales de construcción que se requerirían, lo que obligaría a desmantelar completamente planetas gaseosos o rocosos enteros como Júpiter y Mercurio.'
  },
  {
    id: 'mineria',
    title: 'Minería de Asteroides',
    color: '#FFD54F',
    btnImage: '/assets/starwars/infographic_cruceros/btn_mineria.png',
    image: '/assets/starwars/infographic_cruceros/hero_mineria.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_mineria.png',
    bannerCaption: 'Extraer recursos en el espacio evitará la enorme carga de lanzar materiales desde la Tierra.',
    content: [
      "Construir flotas de cruceros estelares gigantescos o inmensas colonias orbitales enfrentaría rápidamente un gravísimo problema logístico y financiero: escapar de la profunda y fuerte pozo gravitatorio de la Tierra. Hoy en día, lanzar incluso un solo kilogramo de metal pesado al espacio exterior cuesta miles de dólares en costoso combustible químico especializado y complejas operaciones de ingeniería. Imagina cuánto dinero y energía se requeriría para levantar las millones de toneladas necesarias para un colosal Destructor Estelar. Sería, en términos prácticos, algo económicamente inviable para nosotros.",
      "La ingeniosa y audaz solución que los ingenieros visionarios tienen en mente para superar este pesado obstáculo terrestre se llama: Minería de Asteroides. En lugar de extraer los metales de las profundidades de nuestras montañas y enviarlos fatigosamente hacia arriba, la humanidad irá a buscar las inmensas riquezas minerales que están esperando intactas allá arriba, flotando pacíficamente y sin dueño, en forma de grandes asteroides y cometas primordiales ricos en elementos útiles orbitando silenciosamente entre los fríos mundos rocosos.",
      "Para poner esto en perspectiva científica, imagina al extraordinario asteroide metálico llamado Psyche 16, una inmensa y oscura roca espacial metálica de casi 200 kilómetros de diámetro orbitando mas allá de Marte. La NASA lanzó una costosa sonda de exploración en 2023 exclusivamente para estudiarlo detalladamente porque, según estimaciones conservadoras, contiene suficientes cantidades de hierro puro, níquel y oro valioso como para ser valorado en la inimaginable e irreal cifra de aproximadamente 10,000 cuatrillones de dólares terrestres.",
      "Además de proveernos de metales pesados increíblemente útiles para la masiva y pesada construcción de infraestructuras orbitales duraderas, la minería espacial resolvería brillantemente el mayor problema crítico del viaje profundo e interplanetario: el preciado combustible líquido de propulsión. Muchos asteroides oscuros, de tipo C (carbonáceos), contienen abundante agua (H2O) congelada en su interior. Usando energía de paneles solares, esa agua pura puede ser separada químicamente en sus componentes básicos, creando el combustible para los cohetes espaciales.",
      "En un futuro a largo plazo, las gigantescas naves espaciales industriales que funcionarán como avanzadas refinerías automatizadas voladoras, se acoplarán suavemente a oscuros asteroides a millones de kilómetros de la Tierra. Extraerán sus minerales preciosos usando enjambres robóticos e impresoras 3D masivas sin afectar en absoluto el delicado medioambiente terrestre, sentando así las robustas bases industriales inagotables para una expansión pacífica, sustentable y grandiosa de la audaz civilización humana hacia el lejano sistema solar profundo y más allá."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el emocionante e intenso Episodio V: El Imperio Contraataca, el piloto Han Solo navega con maestría casi suicida la famosa y destartalada nave Halcón Milenario directamente hacia un letal y turbulento campo de grandes asteroides caóticos para evadir eficazmente a sus enfurecidos perseguidores del Imperio. En nuestro verdadero sistema solar pacífico, los densos asteroides están, afortunadamente para las naves espaciales y los pilotos, separados generalmente por distancias inmensas de cientos de miles de kilómetros vacíos entre sí.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'Varios asteroides clasificados como Cercanos a la Tierra (NEAs por sus siglas en inglés astronómico) han sido minados en la historia real pero de forma microscópica. Las exitosas e increíbles misiones robóticas internacionales conocidas como Hayabusa2 de la agencia japonesa JAXA y OSIRIS-REx de la NASA estadounidense lograron aterrizar efímeramente y recuperar con éxito gramos de preciosas rocas prístinas y rico polvo primordial espacial de asteroides lejanos, y las trajeron a la Tierra ilesas para estudio científico minucioso.' 
      }
    ],
    fact: 'El Tratado del Espacio Exterior firmado por Naciones Unidas establece que ningún país puede reclamar la propiedad soberana de los cuerpos celestes. Sin embargo, naciones como Estados Unidos y Luxemburgo ya aprobaron polémicas leyes que legalmente permiten a empresas privadas ser dueñas, explotar y vender los recursos de los asteroides.'
  },
  {
    id: 'soporte-vital',
    title: 'Reciclar para Sobrevivir',
    color: '#81C784',
    btnImage: '/assets/starwars/infographic_cruceros/btn_soporte-vital.png',
    image: '/assets/starwars/infographic_cruceros/hero_soporte-vital.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_soporte-vital.png',
    bannerCaption: 'En el vacío del cosmos, el agua limpia y el oxígeno fresco son los tesoros más valiosos.',
    content: [
      "En las emocionantes películas y series de ciencia ficción solemos centrarnos totalmente en los poderosos motores brillantes y en los ruidosos disparos de láser verde oscuro, pero el sistema técnico más importante a bordo de absolutamente cualquier nave espacial tripulada por humanos no son sus temibles cañones, sino el sofisticado Sistema de Soporte Vital (ECLSS, por sus siglas en inglés). Sin este complejo equipo electromecánico crítico, los delicados astronautas a bordo no podrían sobrevivir ni siquiera unos pocos minutos en el letal e implacable vacío del despiadado espacio exterior.",
      "El agua pura y limpia es extraordinariamente pesada y terriblemente costosa de transportar desde la Tierra en enormes cohetes, por lo que las verdaderas naves espaciales, como la moderna ISS, utilizan asombrosos sistemas de reciclaje extremo. En la actual Estación Espacial Internacional, el vital y valioso líquido se recicla casi a un increíble nivel del 93%. ¡Sí, leíste bien! Incluso el sudor recolectado y hasta la orina de los astronautas se filtra minuciosamente, se purifica químicamente a niveles extremos y se vuelve a convertir rápidamente en agua cristalina, limpia y completamente potable.",
      "¿Y cómo hacen exactamente para respirar los tripulantes sin asfixiarse allí arriba tan lejos de nuestro hogar azul? El complejo y costoso sistema de la ISS genera continuamente abundante oxígeno fresco y limpio que inunda los pasillos utilizando una reacción química controlada de laboratorio conocida como 'electrólisis'. Esta increíble tecnología utiliza potente y constante electricidad generada por los extensos y masivos paneles solares para romper violentamente las moléculas de agua purificada (H2O) en sus dos valiosos gases componentes originales y básicos: el oxígeno puro para la vital respiración y el volátil hidrógeno.",
      "El otro gran problema ambiental interno e invisible en los lugares sellados como los módulos espaciales y submarinos es que, cada vez que exhalamos fuertemente el aire, producimos rápidamente el letal gas de dióxido de carbono (CO2). Si este insidioso y peligroso gas se acumulara sin interrupción, intoxicaría y mataría a toda la pobre tripulación de forma asfixiante. Para evitar activamente esta tragedia invisible, las naves emplean avanzadas 'máquinas fregadoras' o densos filtros químicos que capturan rápidamente y eliminan eficientemente todo ese CO2 mortífero del aire circulante.",
      "Para una inmensa e intimidante nave interplanetaria militar del colosal tamaño de un Destructor Estelar, que alberga rutinariamente a más de 37,000 personas como su tripulación y tropas terrestres, necesitarías asombrosos sistemas de soporte vital gigantes que ocupen y consuman el volumen de ruidosas fábricas terrestres enteras y complejas plantas de tratamiento urbano, funcionando silenciosamente las incansables 24 horas continuas de todos los largos días en el lejano cosmos profundo, sin presentar ni una falla simple."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el icónico y trágico principio original del famoso Episodio IV: Una Nueva Esperanza, el humilde joven granjero de humedad de arena y polvo estelar rubio, Luke Skywalker, reside monótonamente en una calurosa y rústica finca granja especializada en el inhóspito, calcinado y desértico planeta arenoso binario llamado Tatooine. Trabajan árduamente todo el largo día bajo los ardientes soles dobles para extraer escasa humedad del caluroso aire ambiental árido y rudo utilizando altos y anticuados vaporadores tecnológicos; esto es puramente tecnología realista parecida a recicladores.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Para resolver a largo plazo y de forma autosustentable el masivo problema de la constante purificación del pesado y enrarecido aire sucio viciado, la avanzada y optimista agencia europea ESA y la NASA de Estados Unidos están activamente probando con gran éxito cultivar cuidadosamente minúsculas, microscópicas e increíbles microalgas fotosintéticas eficientes y plantas verdes a bordo, para que ellas milagrosamente absorban el letal gas venenoso e inyecten abundante, nutritivo y rico oxígeno puro mediante biología natural.' 
      }
    ],
    fact: 'A pesar del excelente sistema de reciclaje del 93%, los astronautas en la ISS aún requieren entregas periódicas de agua desde la Tierra. Sin embargo, para viajar a Marte o a lunas más lejanas, los ingenieros espaciales necesitarán desarrollar un sistema que recicle hasta un 98% de los fluidos biológicos y ambientales de la tripulación.'
  },
  {
    id: 'gravedad',
    title: 'Creando Gravedad Artificial',
    color: '#64B5F6',
    btnImage: '/assets/starwars/infographic_cruceros/btn_gravedad.png',
    image: '/assets/starwars/infographic_cruceros/hero_gravedad.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_gravedad.png',
    bannerCaption: 'La microgravedad prolongada debilita los huesos; la rotación podría ser nuestra única salvación biológica.',
    content: [
      "En casi todas las entretenidas series de televisión y asombrosas películas de aventuras espaciales interestelares, curiosamente las valientes tripulaciones siempre caminan cómodamente, charlan animadamente, trabajan diligentemente y pasean tranquilamente por los brillantes pasillos de sus maravillosas naves inmensas, exactamente como si mágicamente estuvieran caminando por un supermercado terrestre. Pero lo cierto y real es que la gravedad artificial es uno de los problemas médicos y físicos más desafiantes y menos resueltos que existen en la difícil ciencia espacial moderna.",
      "En la valiente y arriesgada vida real en la Estación Espacial, todos los fornidos astronautas flotan constantemente de manera ingrávida y divertida en el incómodo y peligroso fenómeno conocido como la persistente 'microgravedad' continua. Aunque se vea increíble, divertido y mágico en las fotos borrosas, esto lamentablemente causa daños graves en la fisiología corporal humana; causa una peligrosa y severa pérdida alarmante de densidad y masa ósea del esqueleto frágil, reduce peligrosamente un porcentaje de masa muscular fuerte vital y causa alteraciones perjudiciales imprevisibles en todo su sensible y crucial ritmo cardíaco sanguíneo.",
      "La única, fascinante, y verdaderamente posible solución realista probada mecánicamente que tenemos actualmente documentada según las avanzadas leyes estrictas que estipula firmemente y con rigor la majestuosa física teórica, es construir meticulosamente las largas secciones de enormes anillos masivos rotantes ininterrumpidos e inmensos unidos con fuerza al exterior de nuestra futurista y grandiosa nave colonizadora, haciéndolos dar vueltas constantes como una interminable noria enorme. Al rotar, la misma y poderosa fuerza mecánica conocida como inercia empujaría fuertemente a las personas directo hacia afuera.",
      "Esta asombrosa, milagrosa y prometedora maravillosa técnica llamada la pura y genuina 'fuerza centrífuga' obligaría contundentemente e inexorablemente a los felices ocupantes y la pequeña tripulación estelar hacia las firmes y curvadas paredes externas, haciéndoles sentir increíblemente una gran pesadez constante que simularía excelentemente y con bastante éxito y precisión matemática un ambiente de acogedora, natural y confortable gravedad planetaria terrestre normal de un glorioso G en su suelo curvo, salvando completamente su frágil y comprometida salud esquelética biológica de manera notable.",
      "Sin embargo y lastimosamente, para generar exitosamente algo muy similar o parecido a una gravedad terrestre completa y que sea sumamente cómoda y no cause mareos biológicos persistentes ni náuseas humanas en un anillo cilíndrico de unos 100 metros radiales de largo, indiscutiblemente necesitarías impulsarlo mecánicamente con un complejo rotor y mantenerlo eternamente rotando fuertemente a unas precisas, ruidosas y firmes 3 increíbles revoluciones exactas e ininterrumpidas por incesante minuto de rotación constante y perfecta de forma inalterable y estable sin fluctuaciones por muchos meses y años solitarios."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Lamentablemente, en todo el inmenso e icónico universo del director George Lucas de Star Wars, casi el cien por ciento absoluto de casi todas las fantásticas naves espaciales interestelares utilizan unos asombrosos, imposibles, e inexistentes misteriosos "generadores especiales ocultos mágicos estelares repulsores masivos de placas de gravitación del piso" falsos sin moverse. Sin embargo, en la famosa e inolvidable cinta épica espacial legendaria 2001: Odisea del Espacio y en Interestelar vemos inmensos cilindros que usan magistralmente principios científicos y físicos de fuerza gravitacional centrífuga correctos y verdaderos.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Científicamente y en los registros médicos, el prolongado y arriesgado tiempo sin gravedad que sufre cualquier asombroso astronauta ruso o de la NASA ha significado estadísticamente para el organismo humano una seria alteración de su cuerpo: los líquidos del robusto ser humano como su sangre suben inmediatamente de golpe directo de las piernas fuertes para hinchar inusitadamente todo el tejido frágil capilar y sanguíneo interior de la cabeza del astronauta por meses, dándole curiosamente lo que NASA llama una \'cara hinchada\' y muy raras e inusuales \'piernas de ave\' raquíticas extremadamente frágiles que preocupan a los médicos.' 
      }
    ],
    fact: 'La fuerza de Coriolis, un extraño fenómeno físico en ambientes rotativos, causaría que los objetos lanzados al aire en una nave giratoria parecieran curvar su trayectoria en vuelo, lo que podría marear fuertemente y causar nauseas a la tripulación hasta que lograran adaptarse neurológicamente a la nueva realidad física del entorno artificial.'
  }
];

const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }
};

const EXPAND_ICONS = {
  zap: <Zap size={18} />,
  clock: <Clock size={18} />,
  atom: <Atom size={18} />
};

/* =========================================================================
   3. COMPONENTS
   ========================================================================= */

const StarField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);
    
    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: (Math.random() * 0.05) + 0.01
    }));

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        star.opacity += star.speed;
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.abs(star.opacity)})`;
        ctx.fill();
      });
      
      if (Math.random() < 0.005) {
        ctx.beginPath();
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * (canvas.height / 2);
        ctx.moveTo(startX, startY);
        ctx.lineTo(startX - 20, startY + 20);
        ctx.strokeStyle = 'rgba(200,220,255,0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    
    return () => {
      window.removeEventListener('resize', setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
};

const GalacticHeader = ({ nodes, activeId }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: '"Oswald", sans-serif', 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        color: '#AB47BC',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(171, 71, 188, 0.4)'
      }}>
        CONSTRUYENDO NAVES COLOSALES
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        ASTILLEROS &middot; PROPULSIÓN &middot; MEGAESTRUCTURAS
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec8" : undefined}
            style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: n.id === activeId ? n.color : '#2A2D3E', transition: 'background-color 0.3s' }} 
          />
        ))}
      </div>
    </div>
  );
};

const NodeButton = ({ node, isVisited, onClick }) => {
  const isComplete = isVisited(node.id);
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(node)}
      style={{
        position: 'relative',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        padding: 0,
        border: `3px solid ${isComplete ? node.color : '#333'}`,
        background: '#1A1C29',
        cursor: 'pointer',
        overflow: 'hidden',
        boxShadow: isComplete ? `0 0 15px ${node.color}55` : 'none',
        zIndex: 10
      }}
    >
      <img 
        src={node.btnImage} 
        alt={node.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isComplete ? 1 : 0.6 }}
      />
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          background: node.color,
          borderRadius: '50%',
          padding: '2px'
        }}>
          <Sparkles size={12} color="#000" />
        </div>
      )}
    </motion.button>
  );
};

const ExpandableSection = ({ data, color, direction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const variant = dirVariants[direction] || dirVariants.up;
  
  return (
    <div style={{ marginBottom: '1rem', background: '#1A1C29', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${color}33` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          background: isOpen ? `${color}11` : 'transparent',
          border: 'none',
          color: '#FFF',
          cursor: 'pointer',
          fontFamily: '"Oswald", sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: color }}>{EXPAND_ICONS[data.icon] || <Star size={18}/>}</span>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{data.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={variant}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.6, color: '#CFD8DC' }}>
              {data.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentPanel = ({ node, onClose, onNext, isLast }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoGear;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoSpaceStation;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed',
        inset: '2rem',
        background: '#0B0D17',
        borderRadius: '24px',
        overflow: 'hidden',
        zIndex: 100,
        boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${node.color}33`,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DecoComp1 size={200} color={node.color} style={{ position: 'absolute', top: '-50px', left: '-50px', opacity: 0.05, zIndex: 0 }} />
      <DecoComp2 size={150} color={node.color} style={{ position: 'absolute', bottom: '10%', right: '-20px', opacity: 0.05, zIndex: 0 }} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: `linear-gradient(90deg, #1A1C29 0%, ${node.color}22 100%)`, zIndex: 10, borderBottom: `1px solid ${node.color}33` }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: 0, fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', color: '#FFF' }}>
          <span style={{
            display: 'inline-flex', width: '40px', height: '40px',
            borderRadius: '50%', overflow: 'hidden',
            border: `2px solid ${node.color}40`,
            flexShrink: 0,
          }}>
            <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </span>
          {node.title}
        </h3>
        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#FFF', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
          <X size={24} />
        </button>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>
                {node.content[0].charAt(0)}
              </span>
              {node.content[0].substring(1)}
            </p>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0', marginTop: '1rem' }}>
              {node.content[1]}
            </p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', height: '100%' }}>
            <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, minHeight: '280px', borderLeft: `4px solid ${node.color}` }} />
          </div>
        </div>

        <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', margin: 0, padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              {node.content[2]}
            </p>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', margin: 0, padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              {node.content[3]}
            </p>
          </div>
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', margin: '1rem 0 0 0', padding: '1.5rem', background: `linear-gradient(90deg, ${node.color}11, transparent)`, borderRadius: '12px', borderLeft: `4px solid ${node.color}` }}>
            {node.content[4]}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
            ))}
          </div>
          
          {node.bannerImage && (
            <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
              <img src={node.bannerImage} alt={node.bannerCaption || ''} 
                   onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
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

          <div style={{ position: 'relative', padding: '1.5rem', background: `linear-gradient(135deg, ${node.color}11, transparent)`, border: `1px solid ${node.color}33`, borderRadius: '12px' }}>
            <div style={{ position: 'absolute', top: -12, left: 16, background: '#0B0D17', padding: '0 8px', color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
              <Star size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> DATO FASCINANTE
            </div>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.6, color: '#FFF', margin: 0 }}>
              {node.fact}
            </p>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', paddingBottom: '2rem' }}>
            <button
              onClick={onNext}
              style={{
                background: `linear-gradient(45deg, ${node.color}, ${node.color}88)`,
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '30px',
                color: '#000',
                fontWeight: 'bold',
                fontFamily: '"Oswald", sans-serif',
                fontSize: '1.1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: `0 4px 15px ${node.color}66`
              }}
            >
              {isLast ? 'COMPLETAR ENTRENAMIENTO' : 'SIGUIENTE LECCIÓN'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec8() {
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [activeNodeId, setActiveNodeId] = useState(null);
  
  const handleNodeClick = (node) => setActiveNodeId(node.id);
  
  const handleClose = () => setActiveNodeId(null);
  
  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNodeId);
    if (!visitedNodes.includes(activeNodeId)) {
      setVisitedNodes([...visitedNodes, activeNodeId]);
    }
    
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      setActiveNodeId(INFOGRAPHIC_NODES[currentIndex + 1].id);
    } else {
      setActiveNodeId(null);
    }
  };
  
  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);
  
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '600px', background: '#0B0D17', borderRadius: '16px', overflow: 'hidden', padding: '2rem', backgroundImage: "url('/assets/starwars/infographic_cruceros/bg_cruceros.png')", backgroundSize: 'cover', backgroundPosition: 'center', color: '#FFF', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <StarField />
      
      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNodeId} />
        
        <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem', padding: '2rem 0' }}>
          {INFOGRAPHIC_NODES.map((node) => (
            <NodeButton 
              key={node.id}
              node={node}
              isVisited={(id) => visitedNodes.includes(id)}
              onClick={handleNodeClick}
            />
          ))}
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', borderRadius: '0 0 16px 16px' }}>
          <h4 style={{ fontFamily: '"Oswald", sans-serif', color: '#AB47BC', marginTop: 0 }}>📚 Fuentes y Referencias Académicas</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontFamily: '"Lora", serif', fontSize: '0.9rem', color: '#B0BEC5' }}>
            {BIBLIOGRAPHY.map((ref, i) => <li key={i} style={{ marginBottom: '0.5rem' }}>{ref}</li>)}
          </ul>
        </div>
      </div>
      
      <AnimatePresence>
        {activeNode && (
          <ContentPanel 
            key={activeNode.id}
            node={activeNode}
            onClose={handleClose}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode.id) === INFOGRAPHIC_NODES.length - 1}
          />
        )}
      </AnimatePresence>

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
