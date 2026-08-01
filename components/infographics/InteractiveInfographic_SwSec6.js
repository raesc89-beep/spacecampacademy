'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Plasma Themed)
   ========================================================================= */

const DecoLightsaber = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <line x1="12" y1="2" x2="12" y2="16" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.9"/>
    <rect x="10" y="16" width="4" height="6" rx="1" stroke={color} strokeWidth="1.5" opacity="0.7"/>
    <line x1="9" y1="18" x2="15" y2="18" stroke={color} strokeWidth="1.5" opacity="0.8"/>
  </svg>
);

const DecoPlasmaBolt = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M4 12H20M6 8H18M8 4H16M6 16H18M8 20H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 3" opacity="0.8" />
    <circle cx="12" cy="12" r="4" fill={color} opacity="0.9" />
  </svg>
);

const DecoLightning = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={`${color}22`} />
  </svg>
);

const DecoShield = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={`${color}11`}/>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
  </svg>
);

const DecoAtom = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(30 12 12)" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(90 12 12)" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.5" transform="rotate(150 12 12)" opacity="0.8"/>
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

const DECO_MAP = {
  'plasma-estado': [DecoAtom, DecoLightning],
  'sable-laser': [DecoLightsaber, DecoPlasmaBolt],
  'blasters-energia': [DecoPlasmaBolt, DecoLightning],
  'escudos-deflectores': [DecoShield, DecoAtom],
  'fusion-nuclear': [DecoAtom, DecoShield],
  'rayos-ionicos': [DecoLightning, DecoPlasmaBolt],
  'estrella-muerte': [DecoLightsaber, DecoShield],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Chen, F. F. (1984). 'Introduction to Plasma Physics and Controlled Fusion'. Springer.",
  "Kruer, W. L. (2019). 'The Physics of Laser Plasma Interactions'. CRC Press.",
  "Wesson, J. (2011). 'Tokamaks' (International Series of Monographs on Physics). Oxford University Press.",
  "Betti, R., & Hurricane, O. A. (2016). 'Inertial-confinement fusion with lasers'. Nature Physics, 12(5), 435-448.",
  "Goebel, D. M., & Katz, I. (2008). 'Fundamentals of Electric Propulsion: Ion and Hall Thrusters'. JPL Space Science and Technology Series.",
  "Eliezer, S. (2002). 'The Interaction of High-Power Lasers with Plasmas'. Institute of Physics Publishing."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'plasma-estado',
    title: 'El Cuarto Estado de la Materia',
    color: '#FF5252',
    btnImage: '/assets/starwars/infographic_plasmas/btn_plasma_estado.png',
    image: '/assets/starwars/infographic_plasmas/hero_plasma_estado.png',
    bannerImage: '/assets/starwars/infographic_plasmas/banner_plasma_estado.png',
    bannerCaption: "El plasma es el cuarto estado de la materia y constituye más del 99% de la materia visible del universo.",
    content: [
      "Desde que somos pequeños en la escuela, nos enseñan que la materia existe principalmente en tres estados comunes: sólido (como un bloque de hielo congelado), líquido (como el agua fresca. Bebemos todos los días) y gas (como el vapor invisible que sale de una olla hirviendo). Pero resulta que estos tres estados son en realidad una rareza increíble en la inmensidad del universo. El universo está dominado por un misterioso y fascinante cuarto estado.",
      "Este cuarto estado de la materia es lo que los científicos de todo el mundo llaman 'plasma'. Para crear plasma de manera artificial o natural, debes tomar un gas común y calentarlo a temperaturas tan extremas y altas que los átomos mismos literalmente se rompen y se desarman por la violencia del calor. Cuando esto ocurre, los electrones, que son pequeñísimos, escapan de sus átomos, creando una sopa hirviente y brillante llena de partículas cargadas de electricidad.",
      "Lo que hace al plasma tan especial y distinto de cualquier gas normal es que, debido a. Está repleto de diminutas partículas cargadas eléctricamente vagando libremente por todas partes, responde y reacciona fuertemente a las fuerzas de los campos magnéticos y eléctricos. Si acercas un imán poderoso a un gas normal, no ocurre nada. Pero si acercas ese mismo imán gigante a una nube de plasma ardiente, puedes moldearlo, empujarlo y atraparlo como si estuvieras moldeando plastilina brillante.",
      "Aunque el plasma suene a ciencia ficción avanzada o parezca sacado exclusivamente de películas del futuro, lo vemos todos los días de nuestra vida. Nuestro sol abrasador, así como todas y cada una de las millones de estrellas parpadeantes que puedes ver en el cielo nocturno despejado, son en realidad gigantescas e inmensas bolas giratorias de plasma supercaliente. ¡De hecho, más del asombroso 99% de toda la materia visible en todo nuestro universo conocido está hecho enteramente de plasma!",
      "En el increíble y expansivo universo de Star Wars, los ingenieros galácticos y los maestros Jedi han aprendido hace muchísimo tiempo a manipular, estabilizar y controlar el impredecible plasma con una precisión asombrosa. Las armas más icónicas, peligrosas y famosas, así como los motores que permiten a las grandes naves cruceros viajar a través de las infinitas estrellas, utilizan la maravillosa física de los plasmas como su principal fuente de funcionamiento."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En toda la épica y larguísima saga de películas de Star Wars, desde las precuelas hasta las secuelas, siempre vemos gigantescas y majestuosas instalaciones industriales galácticas, como las refinerías de Naboo o la cámara de congelación en Bespin. Están dedicadas a extraer, purificar y procesar plasma de los profundos núcleos planetarios para usarlo como la fuente de combustible primordial de naves espaciales y ciudades.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En nuestro propio y hermoso planeta Tierra, el plasma natural es raro de observar directamente a nivel del suelo, pero sí existe. Destructiva: el núcleo central de un relámpago brillante durante una fuerte tormenta eléctrica es plasma puro alcanzando temperaturas asombrosamente altas, al igual que las mágicas, danzantes y coloridas luces de las hermosas auroras boreales en los polos.' 
      },
      {
        label: '¿Sabías que...?',
        icon: 'sparkles',
        text: 'Los antiguos e icónicos televisores de pantalla plana que pesaban muchísimo y. se volvieron populares a principios de los años 2000 eran conocidos popularmente como "televisores de plasma" justamente porque en su interior tenían millones de minúsculas celdas o burbujas microscópicas atrapadas entre dos gruesos paneles de cristal, las cuales se llenaban de verdaderos gases ionizados que brillaban intensamente para crear la imagen.'
      }
    ],
    fact: 'El plasma es científicamente el cuarto estado fundamental de la materia. Se forma cuando un gas se calienta a temperaturas tan extremas que sus átomos se ionizan por completo, liberando sus electrones y transformándose en una mezcla gaseosa pero altamente conductora de electricidad y sensible al magnetismo.'
  },
  {
    id: 'sable-laser',
    title: '¿Podremos Construir un Sable Láser?',
    color: '#448AFF',
    btnImage: '/assets/starwars/infographic_plasmas/btn_sable_laser.png',
    image: '/assets/starwars/infographic_plasmas/hero_sable_laser.png',
    bannerImage: '/assets/starwars/infographic_plasmas/banner_sable_laser.png',
    bannerCaption: "La contención magnética permite confinar plasma a millones de grados dentro de campos electromagnéticos toroidales.",
    content: [
      "El arma más elegante e icónica de un Caballero Jedi es, el sable de luz. Durante décadas enteras, millones de niños y grandes científicos brillantes de todo el mundo han soñado con poder construir uno real. El problema físico y tecnológico con los verdaderos láseres en nuestro universo es que la luz simplemente no se detiene a un metro de distancia. Si enciendes un láser real apuntando hacia el cielo abierto, el rayo de luz viaja infinitamente hacia el espacio sideral.",
      "Además, la luz normal o la luz de un láser no choca físicamente contra otra luz. Si cruzas los haces de luz brillante de dos linternas poderosas en la oscuridad, los rayos de luz simplemente pasan limpiamente uno a través del otro sin hacer ningún ruido de choque ni rebotar como lo hacen las famosas. Épicas espadas en los grandes combates de las películas. Entonces, para que un sable de luz sea posible en la vida real, no podría estar hecho de simples y puros fotones de luz.",
      "Aquí es exactamente donde entra la física avanzada de los plasmas. Los grandes científicos teóricos de la actualidad proponen y creen firmemente que, si algún día lográramos construir de verdad un sable de luz funcional, su brillante hoja letal no estaría compuesta de luz láser pura, sino de un fino, denso. Letal chorro de plasma supercaliente, ardiendo intensamente a miles y miles de grados centígrados, capaz de derretir gruesas puertas de metal blindado en un abrir y cerrar de ojos.",
      "Pero, ¿cómo demonios evitamos que ese plasma ardiente se expanda peligrosamente, te queme las manos y queme todo el lugar de inmediato? La increíble respuesta científica está en un concepto tecnológico llamado 'contención magnética'. Como aprendimos antes, el plasma reacciona fuertemente a los imanes. La empuñadura mecánica del sable de luz tendría que proyectar un poderosísimo campo magnético con forma de un largo tubo delgado e invisible.",
      "Este campo de fuerza magnética actuaría como una especie de resistente botella invisible e inquebrantable, manteniendo el ardiente gas ionizado perfectamente confinado dentro de una hoja que mide exactamente un metro de largo. Cuando dos de estos hipotéticos e increíbles sables de plasma magnético chocaran fuertemente en un intenso duelo cuerpo a cuerpo, las fortísimas y densas fuerzas magnéticas se repelerían y rebotarían espectacularmente entre sí, creando ese característico y electrizante choque letal."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el largometraje Episodio I: La Amenaza Fantasma, vemos al pacífico pero poderoso maestro Qui-Gon Jinn hundir su brillante sable de luz verde en las gigantescas y súper blindadas puertas de metal puro de la nave Federación de Comercio. El metal grueso a su alrededor inmediatamente comienza a brillar de color naranja brillante, a burbujear y a derretirse en forma líquida espectacular, una clara demostración de las increíbles temperaturas térmicas de un plasma confinado.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En la actualidad moderna, en muchas fábricas industriales gigantes alrededor de todo el planeta Tierra, ya utilizamos cortadoras de arco de plasma reales. Estas potentes máquinas industriales utilizan aire comprimido o gases especiales soplados a enormes e increíbles velocidades que, al pasar por un potente arco eléctrico, se transforman velozmente en un mortífero rayo de plasma a casi 30,000 grados Celsius.' 
      },
      {
        label: '¿Sabías que...?',
        icon: 'sparkles',
        text: 'Un extraordinario grupo de intrépidos físicos en la respetada Universidad de Harvard ha logrado un tremendo hito científico al hacer. puros fotones de luz (que normalmente jamás tienen masa propia) logren interactuar, chocar y rebotar unos con otros, uniéndose y formando un tipo de "molécula de luz". A esta nueva forma exótica y extraña de materia luminosa la llamaron, en tono de broma seria, materia"sable de luz".'
      }
    ],
    fact: 'Físicamente, un sable láser real no podría estar compuesto únicamente por luz, ya que los fotones no pueden detenerse a una distancia predeterminada. El modelo teórico más acertado propone un poderoso cañón que emite plasma confinado herméticamente en una robusta botella electromagnética invisible.'
  },
  {
    id: 'blasters-energia',
    title: 'Blasters: Armas de Energía Dirigida',
    color: '#FF6E40',
    btnImage: '/assets/starwars/infographic_plasmas/btn_blasters_energia.png',
    image: '/assets/starwars/infographic_plasmas/hero_blasters_energia.png',
    bannerImage: '/assets/starwars/infographic_plasmas/banner_blasters_energia.png',
    bannerCaption: "Los aceleradores de partículas impulsan iones a velocidades cercanas a la de la luz usando campos electromagnéticos.",
    content: [
      "En el universo galáctico, los soldados de asalto y los contrabandistas como Han Solo no utilizan armas que disparan balas de metal convencionales. En su lugar, utilizan blasters. Cuando se dispara un blaster, lo que sale volando por el aire no es un pedazo sólido de plomo, sino un proyectil brillante de color rojo, verde o azul compuesto de energía.",
      "Aunque a menudo se les llama armas láser, si observas cuidadosamente las escenas de acción, notarás que los disparos del blaster viajan como rayos cortos. Se mueven lo suficientemente lento como para que el ojo humano pueda verlos cruzar la habitación. ¡Un Jedi entrenado en la Fuerza puede incluso esquivarlos!",
      "La ciencia moderna nos indica que los blasters no pueden disparar láseres reales de luz pura. La luz viaja a 300,000 kilómetros por segundo y es invisible en el vacío. En realidad, los científicos sugieren que estas armas disparan grupos concentrados de plasma a alta temperatura, lo que explica su velocidad y visibilidad.",
      "Un blaster funcionaría ionizando un gas almacenado en su cargador con una fuerte descarga electromagnética y luego disparándolo a través de un acelerador de partículas en miniatura. El problema físico en el mundo real es que estos cúmulos de plasma, sin un contenedor que los mantenga unidos, se disiparían y enfriarían rápidamente en el aire.",
      "En la Tierra, ya se están desarrollando Armas de Energía Dirigida (DEW). Sistemas grandes como el láser ATHENA se prueban montados en vehículos pesados para interceptar pequeños drones a distancia. Sin embargo, la tecnología actual aún no puede miniaturizar y comprimir toda esa energía en una pistola portátil como las que vemos en el cine."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio IV: Una Nueva Esperanza, durante las batallas en los pasillos, los disparos de blaster rebotan contra las paredes y dejan marcas de quemaduras y metal derretido. Esto evidencia que el daño es térmico, producido por calor extremo, y no un impacto mecánico tradicional.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La Marina de los Estados Unidos ya ha instalado el Sistema de Armas Láser (LaWS) en algunos buques. A diferencia del blaster cinematográfico de colores brillantes, el LaWS dispara un rayo infrarrojo invisible al ojo humano y es silencioso.' 
      },
      {
        label: '¿Sabías que...?',
        icon: 'sparkles',
        text: 'Para crear el famoso sonido "pew-pew" de los blasters en la película de 1977, el diseñador de sonido Ben Burtt golpeó los cables tensores de una torre de radio con una llave metálica.'
      }
    ],
    fact: 'Los blasters de la ciencia ficción se comportan como disparadores de grupos de partículas de plasma confinado, en lugar de verdaderos láseres, ya que viajan mucho más lento que la velocidad de la luz.'
  },
  {
    id: 'escudos-deflectores',
    title: 'Escudos Deflectores: ¿Son Posibles?',
    color: '#40C4FF',
    btnImage: '/assets/starwars/infographic_plasmas/btn_escudos_deflectores.png',
    image: '/assets/starwars/infographic_plasmas/hero_escudos_deflectores.png',
    bannerImage: '/assets/starwars/infographic_plasmas/banner_escudos_deflectores.png',
    bannerCaption: "Los escudos electromagnéticos deflectan partículas cargadas, similar a cómo la magnetosfera terrestre protege del viento solar.",
    content: [
      "Cuando el Halcón Milenario huye de destructores imperiales o atraviesa un campo de asteroides, los pilotos ordenan activar los escudos deflectores. En cuestión de segundos, una cúpula de energía invisible recubre y protege la nave.",
      "Estos campos de fuerza tienen el poder de detener impactos directos de armas y el choque de rocas espaciales a alta velocidad. Los escudos absorben toda la energía cinética entrante, protegiendo el casco metálico de la nave sin sufrir abolladuras.",
      "Crear un escudo invisible que actúe como un muro de ladrillos contra objetos sólidos es casi imposible con nuestra física actual. Sin embargo, los ingenieros aeronáuticos están investigando conceptos que se acercan a esta tecnología de ciencia ficción.",
      "La propuesta científica más realista se basa en la física de los plasmas y el electromagnetismo. Un sistema de protección real implicaría proyectar una capa de plasma denso alrededor de un vehículo en fracciones de segundo.",
      "Cuando una onda de choque explosiva se acerca, este muro de gas sobrecalentado e ionizado podría absorber y dispersar gran parte de la energía mediante interacción electromagnética, mitigando el impacto de forma similar a los escudos galácticos."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio VI: El Retorno del Jedi, la segunda Estrella de la Muerte está protegida por un campo deflector masivo. Este escudo es proyectado desde un generador instalado en la superficie de la luna de Endor.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En 2015, la compañía aeroespacial Boeing patentó un "Método y sistema para la atenuación de ondas de choque mediante un arco electromagnético". Es un paso teórico hacia los escudos de fuerza reales.' 
      },
      {
        label: '¿Sabías que...?',
        icon: 'sparkles',
        text: 'Existen "ventanas de plasma" en laboratorios de física de partículas. Utilizan un campo magnético para contener una fina capa de plasma que separa el vacío del aire normal sin necesidad de usar un cristal sólido.'
      }
    ],
    fact: 'Los ingenieros investigan generadores de campos electromagnéticos que usan plasma ionizado para interceptar y dispersar ondas expansivas antes de que alcancen a los vehículos.'
  },
  {
    id: "fusion-nuclear",
    title: "Fusión Nuclear: La Energía de las Estrellas",
    color: "#FF1744",
    btnImage: "/assets/starwars/infographic_plasmas/btn_fusion_nuclear.png",
    image: "/assets/starwars/infographic_plasmas/hero_fusion_nuclear.png",
    bannerImage: "/assets/starwars/infographic_plasmas/banner_fusion_nuclear.png",
    bannerCaption: "Los reactores tokamak confinan plasma a 150 millones de grados en forma toroidal para lograr la fusión nuclear controlada.",
    content: [
      "Para que el temible Imperio Galáctico pueda hacer saltar a sus pesados Destructores Estelares a través del hiperespacio, se requiere una cantidad de energía brutal. Las fuentes de energía tradicionales, como el gas o los paneles solares, jamás serían suficientes para mover una fortaleza del tamaño de una ciudad entera. La respuesta a este inmenso desafío tecnológico se encuentra en dominar un proceso monumental llamado fusión nuclear, que es exactamente el mismo motor natural que enciende a nuestro brillante Sol y a todas las demás estrellas luminosas del firmamento nocturno.",
      "Imagina que tienes piezas de Lego esparcidas por toda tu habitación y decides unirlas con mucha fuerza para crear una figura nueva. En el corazón candente de nuestro Sol, a una temperatura sofocante de quince millones de grados Celsius y bajo una presión aplastante de doscientas cincuenta mil millones de atmósferas, la gravedad junta violentamente átomos de hidrógeno. Específicamente, une dos tipos especiales de hidrógeno llamados deuterio y tritio. Al fusionarse, estos se transforman en helio y liberan un destello cegador de energía pura durante el proceso.",
      "La meta científica más ambiciosa de nuestra era moderna es construir un \"sol embotellado\"aquí mismo en la Tierra. En Cadarache, Francia, treinta y cinco países están colaborando para construir el Reactor Termonuclear Experimental Internacional, conocido mundialmente como ITER. Este gigantesco proyecto de veintidós mil millones de dólares consiste en una máquina colosal de veintitrés mil toneladas. Su núcleo es un inmenso dispositivo llamado Tokamak, que tiene la forma exacta de una rosquilla de metal gigante diseñada para contener el fuego estelar.",
      "Dentro de este enorme Tokamak francés, el gas se calienta tanto que se convierte en plasma hirviente. Como ningún material conocido en el universo puede soportar tocar algo tan ridículamente caliente sin derretirse al instante, los ingenieros utilizan una trampa invisible. Emplean imanes superconductores potentes, enfriados a temperaturas glaciales, para crear un campo magnético en forma de anillo. Este campo invisible sostiene el plasma flotando en el vacío, evitando que toque las paredes metálicas de la cámara principal.",
      "El cinco de diciembre de dos mil veintidós, los científicos del National Ignition Facility en el Laboratorio Nacional Lawrence Livermore lograron un hito histórico espectacular. Usando rayos de luz ultraconcentrada, consiguieron por primera vez la \"ignición\"de la fusión. Introdujeron dos punto cero cinco megajulios de energía y lograron que la pequeña cápsula devolviera tres punto quince megajulios. ¡Produjeron más energía de la que gastaron! Este avance nos acerca al sueño de tener electricidad limpia e inagotable para iluminar todo el mundo."
    ],
    expandables: [
      { 
        label: "En la Película", 
        icon: "zap", 
        text: "En el complejo universo de Star Wars, los majestuosos e imponentes Destructores Estelares y las estaciones de batalla espaciales no funcionan con combustibles fósiles, sino que obtienen su notable poder destructivo de algo llamado reactores de hipermetria. Esta tecnología de ciencia ficción se basa conceptualmente en los principios reales de la fusión nuclear, utilizando inmensas cámaras de contención magnética para exprimir el plasma hasta. Libera la energía equivalente a la de una pequeña estrella atrapada en la sala de máquinas." 
      },
      { 
        label: "Dato Científico", 
        icon: "atom", 
        text: "Para que la fusión nuclear sea útil en nuestro planeta, necesitamos mantener el plasma contenido durante mucho tiempo. El colosal reactor ITER, actualmente en construcción y pesando lo mismo que tres torres Eiffel juntas, está diseñado específicamente para lograr producir quinientos megavatios de potencia de salida a partir de tan solo cincuenta megavatios de energía de entrada. Esto demostrará al mundo que la fusión a gran escala es tecnológicamente viable y sentará las bases para futuras centrales eléctricas comerciales que iluminarán nuestras ciudades." 
      },
      {
        label: "¿Sabías que...?",
        icon: "sparkles",
        text: "A diferencia de las peligrosas plantas nucleares tradicionales de fisión que dividen átomos pesados como el uranio y generan residuos tóxicos durante milenios, un reactor de fusión es inherentemente seguro. Si algo llega a fallar en la máquina o el campo magnético pierde estabilidad, el plasma simplemente se enfría y la reacción se apaga de inmediato en menos de un segundo, sin riesgo alguno de explosiones desastrosas o fugas radiactivas. Además, el combustible principal se puede extraer fácilmente del agua de mar común, garantizando reservas ilimitadas."
      }
    ],
    fact: "El deuterio, uno de los ingredientes fundamentales para encender la fusión nuclear, es un tipo pesado de hidrógeno que se encuentra de forma natural en nuestros vastos océanos. Hay suficiente deuterio mezclado en el agua de mar de nuestro planeta Tierra para satisfacer por completo. Sin interrupciones todas las inmensas necesidades energéticas de la humanidad moderna durante miles de millones de años, ofreciendo una esperanza brillante para nuestro futuro."
  },
  {
    id: "rayos-ionicos",
    title: "Cañones de Iones y Propulsión",
    color: "#2979FF",
    btnImage: "/assets/starwars/infographic_plasmas/btn_rayos_ionicos.png",
    image: "/assets/starwars/infographic_plasmas/hero_rayos_ionicos.png",
    bannerImage: "/assets/starwars/infographic_plasmas/banner_rayos_ionicos.png",
    bannerCaption: "Los motores iónicos aceleran gas xenón ionizado para generar empuje continuo, alcanzando velocidades de 90 km/s.",
    content: [
      "Cuando pensamos en batallas espaciales, normalmente imaginamos explosiones deslumbrantes que destruyen naves enemigas con fuego brillante y chispas voladoras. Sin embargo, en el helado y remoto planeta Hoth, los valientes rebeldes utilizaron un tipo diferente de armamento: el famoso cañón de iones defensivo. En lugar de perforar el blindaje metálico de los temibles Destructores Estelares, este enorme dispositivo azul disparaba relámpagos concentrados diseñados para sobrecargar los delicados circuitos electrónicos y dejar las máquinas apagadas y flotando a la deriva.",
      "En el mundo real de la ciencia contemporánea, los iones no se usan típicamente para crear cañones destructivos, sino para impulsar pacíficamente nuestras naves robóticas a través del silencioso vacío del sistema solar. La propulsión iónica funciona despojando a los átomos de un gas noble, como el xenón, de algunos de sus electrones. Al perder electrones, los átomos adquieren una carga eléctrica positiva y se convierten en iones puros. Luego, la nave espacial utiliza rejillas electrificadas potentes para repeler estos iones y dispararlos velozmente hacia atrás.",
      "Imagina que estás sentado en una patineta y decides lanzar pesadas pelotas de baloncesto hacia atrás con toda tu fuerza; la ley de la física hará que tu cuerpo ruede lentamente hacia adelante. De manera similar, al expulsar el gas ionizado a velocidades vertiginosas de hasta ciento cuarenta mil kilómetros por hora, el motor espacial genera un empuje suave pero constante. Aunque la fuerza inicial es tan leve como el peso de una simple hoja de papel sobre la palma de tu mano, en la ausencia de fricción del espacio, este empuje continuo te hará alcanzar velocidades récord a lo largo de varios meses.",
      "La eficiencia asombrosa de estos sistemas modernos es lo que fascina a los ingenieros espaciales. En la ingeniería de cohetes utilizamos un término llamado impulso específico para medir cuánto rendimiento obtenemos por cada gota de combustible. Mientras que los ruidosos cohetes químicos tradicionales alcanzan un impulso específico de trescientos a cuatrocientos cincuenta segundos, quemando toneladas de líquido en minutos, un silencioso motor iónico moderno puede lograr entre tres mil. Doce mil segundos, permitiendo misiones interplanetarias muchísimo más largas y económicas.",
      "Un ejemplo estelar de esta tecnología fue la legendaria misión Dawn de la NASA, que viajó valientemente por el cosmos desde el año dos mil siete hasta el dos mil dieciocho. Utilizando sus tres innovadores motores iónicos, esta pequeña sonda logró visitar, orbitar y estudiar detalladamente tanto al inmenso asteroide Vesta como al enigmático planeta enano Ceres. Además de viajar por el espacio, los humanos aceleramos iones terrestres en gigantescas máquinas subterráneas, como el Gran Colisionador de Hadrones del CERN, donde los protones alcanzan el noventa. Nueve punto noventa y nueve por ciento de la increíble velocidad de la luz."
    ],
    expandables: [
      { 
        label: "En la Película", 
        icon: "zap", 
        text: "En el comienzo de la inolvidable cinta El Imperio Contraataca, vemos a las fuerzas de la Alianza Rebelde disparando ráfagas esféricas de plasma azul verdoso desde la fría superficie del planeta Hoth. Este disparo no pretendía destrozar al enemigo, sino que era una inteligente medida táctica. Al golpear la estructura del Destructor Estelar Imperial que bloqueaba su ruta de escape, la enorme oleada de partículas cargadas inutilizó temporalmente todos sus sistemas de navegación, computadoras y pantallas tácticas, permitiendo a los transportes escapar a salvo." 
      },
      { 
        label: "Dato Científico", 
        icon: "atom", 
        text: "Aunque los cañones de iones reales no existen como armas antiaéreas, sí que construimos aceleradores de partículas potentes para desentrañar los secretos del universo temprano. En la frontera entre Francia y Suiza, bajo tierra, se encuentra el Gran Colisionador de Hadrones. Esta colosal pista circular de veintisiete kilómetros de circunferencia emplea campos magnéticos de altísima intensidad para acelerar haces de protones a energías incomprensibles antes de estrellarlos entre sí, recreando condiciones que existieron apenas milisegundos después del Big Bang." 
      },
      {
        label: "¿Sabías que...?",
        icon: "sparkles",
        text: "El récord mundial continuo de funcionamiento de un motor espacial en la historia de la humanidad lo ostenta un avanzado propulsor de iones estadounidense llamado NEXT-C. Durante rigurosas pruebas de resistencia en un laboratorio especializado en nuestro planeta Tierra, este dispositivo electromagnético funcionó sin detenerse durante más de cincuenta mil horas seguidas, lo que equivale a casi seis largos años de encendido ininterrumpido. Este tipo de extrema durabilidad es exactamente lo que los humanos necesitamos para futuras misiones ambiciosas hacia el lejano planeta Marte."
      }
    ],
    fact: "El brillante gas de xenón es el principal ingrediente preferido por los científicos para alimentar motores iónicos espaciales debido a que sus átomos son particularmente pesados en comparación con otros gases nobles. Al disparar partículas más pesadas por la parte trasera del motor, la nave obtiene un empujón mucho más fuerte hacia adelante por cada unidad de energía eléctrica consumida, maximizando el impulso específico."
  },
  {
    id: "estrella-muerte",
    title: "La Estrella de la Muerte: Superláseres",
    color: "#FF9100",
    btnImage: "/assets/starwars/infographic_plasmas/btn_estrella_muerte.png",
    image: "/assets/starwars/infographic_plasmas/hero_estrella_muerte.png",
    bannerImage: "/assets/starwars/infographic_plasmas/banner_estrella_muerte.png",
    bannerCaption: "Los láseres de alta potencia concentran fotones coherentes mediante cristales amplificadores para transferir energía a largas distancias.",
    content: [
      "La temible estación espacial esférica conocida como la Estrella de la Muerte se convirtió en el arma de terror definitiva del Imperio Galáctico. Su gigantesco cañón cóncavo podía disparar un haz de energía tan desmesuradamente poderoso que era capaz de aniquilar un planeta entero con un solo impacto, como tristemente lo demostró al pulverizar el pacífico mundo de Alderaan. Esta asombrosa demostración de fuerza letal en la gran pantalla ha inspirado a generaciones de ingenieros ópticos a estudiar meticulosamente hasta dónde pueden llegar las capacidades técnicas de la luz pura.",
      "Para comprender estos notables rayos destructores, primero debemos explorar la verdadera ciencia que se esconde detrás del fascinante acrónimo LASER, que en inglés significa \"Amplificación de Luz por Emisión Estimulada de Radiación\". Fue inventado en el año mil novecientos sesenta por el brillante físico estadounidense Theodore Maiman. A diferencia de las bombillas comunes que emiten luz difusa en todas las direcciones de la habitación, un láser genera ondas de luz idénticas. Perfectamente alineadas, permitiendo enfocar toda esa energía concentrada en un punto minúsculo a gran distancia sin perder potencia.",
      "Hoy en día, las instalaciones de investigación láser más avanzadas del mundo pueden desatar fuerzas enormees. El Laboratorio Nacional Lawrence Livermore en los Estados Unidos alberga una gigantesca instalación conocida como NIF, que maravilla a los expertos mundiales al disparar exactamente ciento noventa y dos láseres independientes simultáneamente. Todos estos haces se combinan magistralmente en una esfera dorada diminuta, concentrando una brutal energía lumínica sobre un objetivo que tiene el tamaño exacto de la pequeña goma de borrar en la punta de tu lápiz.",
      "La potencia abrumadora de estas máquinas es difícil de asimilar. Cuando el inmenso sistema del NIF se dispara a máxima capacidad, entrega aproximadamente dos punto cero cinco megajulios de energía concentrada en apenas unas pocas milmillonésimas de segundo. Durante ese pestañeo imperceptible, el complejo científico genera más poder momentáneo que toda la red eléctrica completa de los Estados Unidos. Esta tremenda hazaña técnica se realiza para estudiar el candente corazón de las estrellas en miniatura y probar intrincadas teorías sobre materiales bajo presiones astronómicas extremas.",
      "En el campo militar moderno, los láseres también están dando sus primeros y cautelosos pasos reales hacia la batalla. No destruyen planetas, pero sistemas defensivos contemporáneos como el cañón HELIOS de sesenta kilovatios de la Armada estadounidense, o el preciso interceptor táctico Dragonfire del Reino Unido, ya son una clara realidad técnica. Estas armas de precisión utilizan luz invisible e intensa que calienta silenciosamente la delgada cubierta de drones o pequeños botes a gran distancia hasta fundir sus metales, deteniendo las rápidas amenazas sin necesitar explosivos y sin hacer un ruido ensordecedor."
    ],
    expandables: [
      { 
        label: "En la Película", 
        icon: "zap", 
        text: "En el icónico Episodio Cuatro, los espectadores observan fascinados cómo ocho finos y vibrantes rayos luminosos verdes se encuentran en el centro geométrico del inmenso plato reflector de la estación espacial. Allí, misteriosamente se fusionan en un único superláser colosal y destructivo. La mitología nos relata que esta temible hazaña óptica se logra canalizando inmensas corrientes eléctricas a través de enormes. Raros cristales Kyber, los mismos minerales místicos sintonizados con la Fuerza que los nobles Caballeros Jedi utilizan cuidadosamente para construir sus emblemáticos sables de luz." 
      },
      { 
        label: "Dato Científico", 
        icon: "atom", 
        text: "Curiosamente, la ficción cinematográfica anticipó una brillante técnica de la física óptica real conocida hoy como la combinación coherente de haces. Para construir sistemas poderosos y evitar que los espejos frágiles se derritan por el calor acumulado, los ingenieros modernos dividen el láser en múltiples rayos independientes de baja intensidad. Justo antes de alcanzar su objetivo distante, estos haces separados convergen perfectamente sincronizados, multiplicando exponencialmente la fuerza total de su impacto sin destruir la delicada maquinaria de disparo interno." 
      },
      {
        label: "¿Sabías que...?",
        icon: "sparkles",
        text: "A pesar del poder abrumador mostrado por la imponente Estrella de la Muerte en el cine, destruir físicamente un planeta sólido del tamaño exacto de nuestra Tierra requeriría aproximadamente dos por diez a la treinta. Dos julios de energía bruta. Para poner este número ridículo en perspectiva mundana, necesitarías atrapar toda la deslumbrante producción energética que emite nuestro Sol ininterrumpidamente durante una semana entera. Soltarla instantáneamente en un solo destello cataclísmico para lograr un nivel tan extremo de devastación planetaria."
      }
    ],
    fact: "El primer prototipo de láser funcional en la historia de la ciencia fue exitosamente creado utilizando un cilindro sintético de rubí brillante que actuaba como núcleo central cristalino. El investigador iluminó intensamente este material rojizo utilizando una potente lámpara de destello en espiral parecida a los brillantes flashes que usaban las ruidosas cámaras fotográficas antiguas de la época."
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
  atom: <Atom size={18} />,
  sparkles: <Sparkles size={18} />
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
        color: '#448AFF',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(68, 138, 255, 0.4)'
      }}>
        FÍSICA DE PLASMAS
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        SABLES LÁSER &middot; BLASTERS &middot; FUSIÃ“N
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec6" : undefined}
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
       loading="lazy" />
      {isComplete && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px', background: node.color, borderRadius:'50%',
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

const ContentPanel = ({ node, onClose, onNext, isLast, setLightboxSrc }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoAtom;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoLightning;
  
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={node.btnImage} alt="icon" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}  loading="lazy" />
          </div>
          <h2 style={{ margin: 0, fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', color: '#FFF' }}>{node.title}</h2>
        </div>
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
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
            <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
              width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px',
            }} />
          </div>
        </div>

        <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[1]}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ position: 'relative', padding: '1.5rem', background: `linear-gradient(135deg, ${node.color}11, transparent)`, border: `1px solid ${node.color}33`, borderRadius: '12px' }}>
              <div style={{ position: 'absolute', top: -12, left: 16, background: '#0B0D17', padding: '0 8px', color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
                <Star size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> DATAFILA
              </div>
              <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.6, color: '#FFF', margin: 0 }}>
                {node.fact}
              </p>
            </div>
            <div>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
              ))}
            </div>
          </div>
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', marginTop: '2rem' }}>
            {node.content[2]}
          </p>

          {node.bannerImage && (
            <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${node.color}33` }}>
              <img src={node.bannerImage} alt="banner" onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              {node.bannerCaption && (
                <div style={{ background: '#1A1C29', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', color: '#90A4AE', fontFamily: '"Oswald", sans-serif', fontStyle: 'italic' }}>
                  {node.bannerCaption}
                </div>
              )}
            </div>
          )}

          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[3]}
          </p>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>
            {node.content[4]}
          </p>
        </div>
      </div>
      
      <div style={{ padding: '1rem 2rem', background: '#1A1C29', borderTop: `1px solid ${node.color}33`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ color: '#90A4AE', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
          ARCHIVOS DEL TEMPLO / {node.title.toUpperCase()}
        </div>
        <button 
          onClick={onNext}
          style={{ 
            background: node.color, 
            color: '#000', 
            border: 'none', 
            padding: '0.75rem 2rem', 
            borderRadius: '24px', 
            fontWeight: 'bold', 
            fontFamily: '"Oswald", sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: `0 4px 15px ${node.color}66`
          }}
        >
          {isLast ? 'FINALIZAR' : 'SIGUIENTE'} <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec6() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());

  const progress = (visitedNodes.size / INFOGRAPHIC_NODES.length) * 100;
  const isAllComplete = visitedNodes.size === INFOGRAPHIC_NODES.length;

  const handleNodeClick = (node) => {
    setActiveNode(node.id);
    if (!visitedNodes.has(node.id)) {
      setVisitedNodes(prev => new Set(prev).add(node.id));
    }
  };

  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode);
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) {
      const nextNode = INFOGRAPHIC_NODES[currentIndex + 1];
      handleNodeClick(nextNode);
    } else {
      setActiveNode(null);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#05060A', overflow: 'hidden', fontFamily: '"Lora", serif' }}>
      <StarField />
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_plasmas/bg_plasmas.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNode} />
        
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '800px', 
          height: '400px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <NodeButton node={node} isVisited={(id) => visitedNodes.has(id)} onClick={handleNodeClick} />
            </motion.div>
          ))}
        </div>

        <div style={{ width: '100%', maxWidth: '600px', marginTop: '4rem', background: '#1A1C29', borderRadius: '12px', padding: '1rem', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: '"Oswald", sans-serif', color: '#90A4AE' }}>
            <span>CONEXIÃ“N CON LA FUERZA</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: '100%', background: 'linear-gradient(90deg, #448AFF, #FF1744)', boxShadow: '0 0 10px #448AFF' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #FF5252, #2979FF)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(68, 138, 255, 0.4)' }}
            >
              <img src="/assets/starwars/infographic_plasmas/badge_plasmas.png" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              ¡ANÁLISIS DE PLASMA COMPLETADO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>


        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS HOLOCRÃ“N (Bibliografía)</h3>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', color: '#78909C', fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
        </div>

      </div>

      <AnimatePresence>
        {activeNode && (
          <ContentPanel 
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} 
            onClose={() => setActiveNode(null)}
            onNext={handleNext}
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode) === INFOGRAPHIC_NODES.length - 1}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
