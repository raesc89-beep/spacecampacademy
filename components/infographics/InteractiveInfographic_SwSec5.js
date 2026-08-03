"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Biology Themed)
   ========================================================================= */

const DecoCell = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity="0.8" strokeDasharray="4 2"/>
    <circle cx="12" cy="12" r="4" fill={color} opacity="0.6"/>
    <circle cx="7" cy="9" r="1.5" fill={color} opacity="0.7"/>
    <circle cx="16" cy="14" r="2" fill={color} opacity="0.5"/>
  </svg>
);

const DecoDNA = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M4 4c4 4 12 12 16 16M4 20C8 16 16 8 20 4" stroke={color} strokeWidth="1.5" opacity="0.8" strokeLinecap="round"/>
    <line x1="6" y1="6" x2="10" y2="10" stroke={color} opacity="0.5"/>
    <line x1="14" y1="14" x2="18" y2="18" stroke={color} opacity="0.5"/>
    <line x1="6" y1="18" x2="10" y2="14" stroke={color} opacity="0.5"/>
    <line x1="14" y1="10" x2="18" y2="6" stroke={color} opacity="0.5"/>
  </svg>
);

const DecoMicrobe = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <rect x="6" y="8" width="12" height="8" rx="4" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <path d="M2 12h4M18 12h4M8 6V2M16 6V2M8 18v4M16 18v4" stroke={color} strokeWidth="1.5" opacity="0.6" strokeLinecap="round"/>
  </svg>
);

const DecoBone = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M7 7a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4zm0 10a2 2 0 100-4 2 2 0 000 4zM7 17a2 2 0 100-4 2 2 0 000 4zm0-10l10 10M17 7L7 17" stroke={color} strokeWidth="1.5" opacity="0.8" strokeLinecap="round"/>
  </svg>
);

const DecoLeaf = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M12 2C6.48 2 2 6.48 2 12s10 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <path d="M12 22V12" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <path d="M12 16l4-4M12 12l-4-4" stroke={color} strokeWidth="1.5" opacity="0.5"/>
  </svg>
);

const DecoEye = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M2 12c0 0 4-8 10-8s10 8 10 8-4 8-10 8-10-8-10-8z" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" opacity="0.9"/>
  </svg>
);

const DECO_MAP = {
  'extremofilos': [DecoMicrobe, DecoDNA],
  'sarlacc-digestivo': [DecoLeaf, DecoCell],
  'rancor-megafauna': [DecoBone, DecoDNA],
  'tauntaun-adaptacion': [DecoCell, DecoBone],
  'purrgil-migracion': [DecoEye, DecoDNA],
  'bioluminiscencia': [DecoCell, DecoMicrobe],
  'exobiologia-futuro': [DecoDNA, DecoEye],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Cockell, C. S. (2015). 'Astrobiology: Understanding Life in the Universe'. John Wiley & Sons.",
  "Horikoshi, K., & Grant, W. D. (1998). 'Extremophiles: Microbial Life in Extreme Environments'. Wiley-Liss.",
  "Gould, S. J. (1989). 'Wonderful Life: The Burgess Shale and the Nature of History'. W. W. Norton & Company.",
  "Schmidt-Nielsen, K. (1984). 'Scaling: Why is Animal Size so Important?'. Cambridge University Press.",
  "Lohmann, K. J., et al. (2001). 'Magnetic orientation and navigation in marine turtles, owls, and fishes'. Journal of Experimental Biology.",
  "Haddock, S. H. D., et al. (2010). 'Bioluminescence in the Sea'. Annual Review of Marine Science, 2, 443-493."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'extremofilos',
    title: 'Vida en lo Imposible: Extremófilos',
    color: '#66BB6A',
    btnImage: '/assets/starwars/infographic_fauna/btn_extremofilos.png',
    image: '/assets/starwars/infographic_fauna/hero_extremofilos.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_extremofilos.png',
    bannerCaption: "Los tardígrados sobreviven condiciones extremas: vacío espacial, radiación y temperaturas de âˆ’272°C a 150°C.",
    content: [
      "¿Alguna vez te has preguntado cómo sería vivir en un volcán en erupción, en el fondo del océano o flotando en el espacio? Para los humanos, esto es imposible. Sin embargo, en la Tierra existen pequeños organismos biológicos que consideran estos ambientes extremos como su hogar. Los científicos los llaman 'extremófilos', que significa amantes de lo extremo.",
      "El campeón de los extremófilos es un animal microscópico llamado tardígrado, también conocido como osito de agua. Estas diminutas criaturas de ocho patas pueden sobrevivir a temperaturas de más de 150 grados Celsius y a fríos espantosos de casi -270 grados Celsius. Si se secan, se encogen en una bolita llamada 'ton' y pueden pasar décadas sin agua, despertando cuando finalmente los mojas.",
      "Los tardígrados no están solos. Existe una bacteria llamada Deinococcus radiodurans, conocida como 'Conan la Bacteria'. Puede sobrevivir a niveles de radiación que destruirían el ADN de un ser humano miles de veces. Cuando la radiación rompe su código genético, esta bacteria tiene un sistema de reparación rápido que vuelve a unir las piezas en cuestión de horas.",
      "Estos descubrimientos terrestres han revolucionado la astrobiología, la ciencia que estudia la vida en el universo. Antes, los científicos creían que un planeta necesitaba tener un clima templado como la Tierra para albergar vida. Pero al descubrir a los extremófilos, comprendieron que la vida podría esconderse en lugares que pensábamos imposibles, como debajo del hielo de Europa (una luna de Júpiter) o en Marte.",
      "En el universo de Star Wars, la variedad de planetas extremos está directamente inspirada en la asombrosa biología de la Tierra. Si un planeta rocoso está cubierto de lava como Mustafar, o congelado bajo gruesas capas de hielo como Hoth, la biología nos enseña que, si hay energía, la vida puede prosperar."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En El Imperio Contraataca, vemos a la babosa espacial (Exogorth), una criatura que vive dentro de túneles en asteroides en el vacío del espacio. Este es un ejemplo cinematográfico de un monstruo espacial concebido como un organismo extremófilo.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Para sobrevivir a la desecación, los tardígrados producen una proteína especial llamada Proteína Intrínsecamente Desordenada (TDP). Cuando el agua desaparece de sus cuerpos, estas proteínas forman un escudo protector similar al cristal.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'Los tardígrados fueron los primeros animales multicelulares en sobrevivir al vacío del espacio exterior. En 2007, un grupo de investigadores los envió a bordo de la nave científica FOTON-M3, exponiéndolos directamente al espacio sin protección.' 
      }
    ],
    fact: 'La astrobiología estudia las posibilidades matemáticas y biológicas de encontrar vida extraterrestre basándose en los modelos de supervivencia de los organismos extremófilos terrestres.'
  },
  {
    id: 'sarlacc-digestivo',
    title: 'El Sarlacc: Digestión de 1000 Años',
    color: '#FFB74D',
    btnImage: '/assets/starwars/infographic_fauna/btn_sarlacc_digestivo.png',
    image: '/assets/starwars/infographic_fauna/hero_sarlacc_digestivo.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_sarlacc_digestivo.png',
    bannerCaption: "Los depredadores emboscadores, como las arañas trampilla, emplean estrategias pasivas para capturar presas sin persecución.",
    content: [
      "Imagina caer en un foso profundo y resbaladizo cuyas paredes están vivas y llenas de dientes. Así funciona el Sarlacc en Tatooine, un gigantesco depredador pasivo. Aunque parezca de otro mundo, en la Tierra existen criaturas asombrosas que también esperan pacientemente a que sus presas caigan directamente en sus bocas.",
      "El androide C-3PO menciona que ser tragado por un Sarlacc significa ser digerido a lo largo de mil años de sufrimiento continuo. Desde una perspectiva biológica terrestre, una digestión tan prolongada es imposible, pero el concepto se inspira en organismos reales que disuelven a sus víctimas mediante un complejo proceso químico.",
      "En nuestro planeta, las plantas carnívoras como las del género Nepenthes habitan zonas pantanosas con suelos carentes de nitrógeno. Para sobrevivir, desarrollan estructuras en forma de jarra profunda que actúan como trampas. Cuando un insecto cae, no puede escapar y se convierte en el alimento que la planta necesita para crecer.",
      "El secreto de este letal proceso biológico reside en las enzimas digestivas. Estas diminutas proteínas actúan como agentes destructores que descomponen las moléculas de la presa. En el fondo de la trampa, un caldo químico altamente corrosivo transforma los tejidos sólidos en nutrientes líquidos asimilables.",
      "La próxima vez que veas al cazarrecompensas Boba Fett caer en las fauces de la enorme bestia del desierto, recuerda que los sistemas digestivos reales pueden ser igual de sorprendentes. La naturaleza nos demuestra que no siempre el cazador más rápido gana; a veces, la paciencia y un estómago resistente son armas mucho más eficaces."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio VI: El Retorno del Jedi, el líder criminal Jabba el Hutt condena a Luke Skywalker y sus amigos a ser devorados por el Sarlacc en el pozo de Carkoon. Esta criatura se ha convertido en uno de los monstruos más icónicos de la saga por su peculiar método de ejecución.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La planta carnívora gigante Nepenthes rajah de Borneo tiene una trampa tan grande que ocasionalmente puede capturar y digerir pequeños vertebrados, como ranas e incluso ratones. Su trampa contiene hasta dos litros y medio de fluido digestivo altamente especializado.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'Algunas avispas parasitoides inyectan sus huevos directamente dentro de orugas vivas. Al nacer, las larvas devoran lentamente a la oruga desde adentro, evitando consumir sus órganos vitales para mantenerla viva el mayor tiempo posible, similar al lento proceso digestivo del Sarlacc.' 
      }
    ],
    fact: 'El estómago humano debe producir una gruesa capa de mucosidad protectora de forma constante. Sin esta barrera esencial, los potentes ácidos y las enzimas gástricas literalmente comenzarían a digerir los propios tejidos del estómago.'
  },
  {
    id: 'rancor-megafauna',
    title: 'El Rancor: Megafauna Prehistórica',
    color: '#26A69A',
    btnImage: '/assets/starwars/infographic_fauna/btn_rancor_megafauna.png',
    image: '/assets/starwars/infographic_fauna/hero_rancor_megafauna.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_rancor_megafauna.png',
    bannerCaption: "La megafauna terrestre, como el Paraceratherium de 20 toneladas, requería estructuras óseas reforzadas por la ley del cuadrado-cubo.",
    content: [
      "Cuando la puerta del calabozo de Jabba se levanta, emerge una de las criaturas carnívoras más aterradoras de la galaxia: el Rancor. Este monstruo bípedo con garras gigantes y piel blindada parece una pesadilla imparable. Pero diseñar biológicamente a un gigante así requiere algo más que imaginación.",
      "El tamaño de los animales está estrictamente limitado por una regla física fundamental: la ley del cuadrado-cubo. A medida que un ser vivo crece, su volumen y peso aumentan mucho más rápido que la fuerza de sus huesos o músculos. Un animal gigantesco necesita adaptaciones extremas solo para poder sostener su propio peso.",
      "Para que criaturas enormes como los antiguos dinosaurios terópodos, como el Tyrannosaurus rex, pudieran caminar sin fracturarse las piernas, necesitaban huesos densos y fuertes. Además, requerían una musculatura adaptada para soportar y mover grandes masas, lo que limita significativamente su agilidad y velocidad máxima.",
      "Un monstruo del tamaño del Rancor tendría requerimientos calóricos colosales. Para mantener su metabolismo activo y reparar sus tejidos, necesitaría consumir enormes cantidades de alimento a diario. Esto obliga a los grandes depredadores a pasar la mayor parte de su tiempo cazando o consumiendo grandes presas para sobrevivir.",
      "Aunque ya no tenemos grandes dinosaurios carnívoros caminando por la Tierra, el estudio de la megafauna prehistórica nos ayuda a comprender los límites biológicos. Estos titanes del pasado demuestran que el tamaño extremo es posible, pero siempre viene acompañado de un delicado equilibrio energético y biomecánico."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio VI: El Retorno del Jedi, Luke Skywalker se enfrenta al feroz Rancor de Jabba desarmado. Usando su astucia en lugar de fuerza bruta, logra derrotarlo aplastándolo con la gran puerta de la cueva, demostrando que el tamaño masivo también tiene desventajas tácticas.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La piel de los grandes mamíferos terrestres, como los elefantes o rinocerontes, es gruesa y altamente resistente. Sin embargo, carecen de pelaje extenso porque su gran volumen corporal dificulta la disipación de calor; tener una piel expuesta les permite regular mejor su temperatura.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'El animal más grande que jamás ha existido en la Tierra no es un dinosaurio, sino la ballena azul contemporánea. El medio acuático proporciona flotabilidad, contrarrestando los efectos de la gravedad y permitiéndole alcanzar tamaños de hasta 30 metros de largo que serían imposibles en tierra firme.' 
      }
    ],
    fact: 'La ley del cuadrado-cubo, descrita por Galileo Galilei en 1638, establece que cuando un objeto aumenta de tamaño, su superficie crece al cuadrado mientras que su volumen crece al cubo, dictando así el límite de tamaño de cualquier animal terrestre.'
  },
  {
    id: 'tauntaun-adaptacion',
    title: 'Tauntauns: Adaptación al Frío Extremo',
    color: '#AED581',
    btnImage: '/assets/starwars/infographic_fauna/btn_tauntaun_adaptacion.png',
    image: '/assets/starwars/infographic_fauna/hero_tauntaun_adaptacion.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_tauntaun_adaptacion.png',
    bannerCaption: "Los mamíferos árticos desarrollan grasa subcutánea, contracorriente vascular y pelaje multicapa para sobrevivir a âˆ’50°C.",
    content: [
      "Imaginen que están caminando en un lugar tan frío que incluso el aliento se congela en el aire antes de tocar el suelo. Así es el planeta helado de Hoth, un mundo implacable con temperaturas mortales. Para sobrevivir en ambientes tan extremos, los animales no pueden simplemente ponerse un abrigo de invierno. Deben poseer adaptaciones biológicas fascinantes que funcionan como una armadura invisible contra la temperatura. La naturaleza, en su infinita sabiduría, ha desarrollado ingeniosas estrategias para mantener el calor corporal, desde alteraciones en la circulación sanguínea hasta la creación de anticongelantes biológicos internos.",
      "Un mecanismo crucial que utilizan los animales del Ártico terrestre es el intercambio de calor a contracorriente. Piensen en esto como un sistema de tuberías inteligente donde las arterias cálidas que bajan del corazón calientan la sangre fría de las venas que regresa de las extremidades. De este modo, el calor se retiene en el núcleo vital del cuerpo y no se pierde por las patas o las aletas. Es como si el cuerpo reciclara constantemente su propia calefacción, asegurando que los órganos principales funcionen perfectamente mientras las patas pueden soportar el hielo sin llegar a congelarse.",
      "Otra estrategia notable es la termogénesis que se produce en el tejido adiposo marrón, una grasa especializada diseñada específicamente para generar calor en lugar de simplemente almacenar energía. Funciona casi como un motor interno de combustión que se enciende cuando las temperaturas caen drásticamente. Además, animales como el zorro ártico poseen un pelaje extraordinario compuesto por pelos que tienen el centro hueco. Este espacio vacío atrapa el aire caliente cerca de la piel, creando un excelente aislamiento térmico que funciona exactamente como el doble cristal de las ventanas en una casa moderna.",
      "El verdadero salto científico ocurrió en el año 1969, cuando el investigador Arthur DeVries hizo un descubrimiento que cambió la biología marina para siempre. Mientras estudiaba peces en las aguas gélidas de la Antártida, notó que estos no se convertían en bloques de hielo a pesar de estar en un medio a temperaturas bajo cero. DeVries descubrió que la sangre de estos peces contenía unas proteínas especiales que evitaban la cristalización del agua en sus venas, actuando igual que el líquido anticongelante que ponemos en el motor de un automóvil durante el invierno extremo.",
      "Estas proteínas anticongelantes, también conocidas como AFPs, se adhieren a los cristales microscópicos de hielo y evitan que crezcan y rompan las células desde adentro. Al explorar la galaxia, vemos paralelos impresionantes en la ciencia ficción. En el clásico del cine, cuando el contrabandista Han Solo utiliza su sable de luz para abrir el vientre del Tauntaun caído y proteger a Luke Skywalker, nos muestra. El interior de estas criaturas debe mantener un inmenso calor biológico, usando gruesas capas de grasa y probablemente sistemas internos similares a los de nuestros propios animales polares."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: "En El Imperio Contraataca (1980), los rebeldes utilizan a los Tauntauns como monturas de patrullaje porque sus adaptaciones biológicas superan a las máquinas, las cuales se congelan constantemente en el clima severo de Hoth. La icónica escena donde Han Solo resguarda a Luke Skywalker dentro del cuerpo cálido de su montura subraya perfectamente el concepto de aislamiento térmico animal extremo." 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: "El aislamiento proporcionado por el pelaje del zorro ártico es tan excepcionalmente eficiente que el animal no empieza a temblar ni a sentir frío hasta que la temperatura ambiente desciende por debajo de los asombrosos menos 70 grados Celsius. Sus pelos con un núcleo hueco atrapan el aire aislante, reduciendo al mínimo absoluto la transferencia térmica hacia el entorno exterior helado." 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: "El descubrimiento de las proteínas anticongelantes por el científico Arthur DeVries en 1969 no solo nos ayudó a comprender cómo sobreviven los peces antárticos, sino. Ha inspirado aplicaciones prácticas en nuestra vida diaria, desde mejorar la textura de los helados comerciales hasta prolongar el tiempo de viabilidad de los órganos humanos durante los trasplantes médicos críticos." 
      }
    ],
    fact: "El tejido adiposo marrón es un tipo especializado de grasa que quema calorías directamente para generar calor corporal vital sin necesidad de temblar. Al mismo tiempo, las proteínas anticongelantes detienen el crecimiento de los diminutos cristales de hielo en el torrente sanguíneo, protegiendo las membranas celulares y permitiendo que la vida florezca incluso en los climas más inclementes de la Tierra."
  },
  {
    id: 'purrgil-migracion',
    title: 'Los Purrgil: Migración Espacial',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_fauna/btn_purrgil_migracion.png',
    image: '/assets/starwars/infographic_fauna/hero_purrgil_migracion.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_purrgil_migracion.png',
    bannerCaption: "Las ballenas jorobadas migran 8,000 km guiándose por el campo magnético terrestre, fenómeno llamado magnetorrecepción.",
    content: [
      "El reino animal está lleno de viajeros incansables que emprenden trayectos épicos a través del mundo entero sin el uso de mapas o sistemas de posicionamiento satelital. Esta capacidad para la migración es uno de los mayores misterios biológicos de la naturaleza. Organismos de diversas especies cruzan océanos y continentes enteros guiados por señales invisibles del entorno, superando obstáculos notables y condiciones climáticas extremas para llegar con una precisión impecable a sus destinos de reproducción o alimentación.",
      "Uno de los ejemplos más notables de resistencia es el del charrán ártico, un ave marina relativamente pequeña que realiza un recorrido migratorio anual de aproximadamente setenta mil kilómetros. Viaja desde las zonas de cría en el Ártico hasta la Antártida y regresa en un ciclo continuo, experimentando dos veranos cada año y viendo más luz diurna que cualquier otra criatura del planeta. Este impresionante viaje de resistencia demuestra cómo la evolución ha dotado a ciertas especies de capacidades físicas y de navegación incomparables.",
      "¿Pero cómo logran orientarse exactamente estos animales majestuosos? La respuesta reside en un fenómeno conocido como magnetorrecepción. Se ha descubierto que diversas especies, incluyendo ciertas aves y tortugas marinas, poseen pequeños cristales de magnetita, un mineral de óxido de hierro con la fórmula química Fe3O4, alojados principalmente en sus picos o sistemas nerviosos. Esta maravilla biológica funciona como una brújula interna, permitiéndoles percibir de manera directa el campo magnético de la Tierra y ajustar sus rutas migratorias.",
      "Otro caso fascinante es el de la migración de las majestuosas mariposas monarca, que viajan miles de kilómetros desde América del Norte hasta los cálidos bosques de México. A diferencia de las aves, estas mariposas utilizan principalmente una especie de compás solar interno, midiendo meticulosamente la posición del sol en el firmamento combinado con su propio reloj circadiano para mantener la dirección correcta. A esto se suma el canto de las inmensas ballenas jorobadas, que puede viajar más de tres mil kilómetros bajo el agua oceánica.",
      "La ciencia de la migración y la navegación innata se refleja en la galaxia de ficción. Los gigantescos Purrgil, las famosas ballenas espaciales vistas en la serie animada Star Wars Rebels, son capaces de navegar por el oscuro vacío del cosmos y entrar en el hiperespacio sin tecnología alguna. Así como nuestros animales terrestres leen los campos magnéticos del planeta, los Purrgil deben percibir flujos de energía estelar o redes gravitacionales para trazar rutas interestelares de forma biológica y natural."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: "En la aclamada serie animada Star Wars Rebels y posteriormente en la serie de acción real Ahsoka, descubrimos que los Purrgil son los responsables originales de inspirar la tecnología de los motores hiperespaciales. Observando a estas magníficas bestias, los primeros ingenieros galácticos aprendieron a surcar las estrellas usando rutas seguras naturales similares a las grandes autopistas migratorias." 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: "La magnetita encontrada en los picos de muchas aves migratorias responde físicamente a los cambios de intensidad e inclinación del campo magnético terrestre. El óxido de hierro Fe3O4 forma estructuras minúsculas que transmiten señales nerviosas directamente al cerebro del ave, permitiendo que el organismo literalmente sienta y visualice su posición global con un margen de error minúsculo." 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: "Las enormes ballenas jorobadas no solo migran distancias masivas de hasta veinticinco mil kilómetros anuales, sino que utilizan el agua como un fenomenal conductor acústico para transmitir sus complejos cantos a más de tres mil kilómetros de distancia. Esta comunicación sonora les ayuda a mantener al grupo unido a través de las inmensas y vastas cuencas oceánicas del mundo." 
      }
    ],
    fact: "La extraordinaria capacidad de magnetorrecepción permite que animales que jamás han recorrido una ruta específica puedan encontrar su camino guiados por el campo magnético de la Tierra. El pequeño charrán ártico completa una travesía de 70,000 kilómetros al año, el viaje migratorio más largo de cualquier especie conocida por la ciencia biológica moderna."
  },
  {
    id: 'bioluminiscencia',
    title: 'Criaturas Brillantes del Espacio',
    color: '#4DB6AC',
    btnImage: '/assets/starwars/infographic_fauna/btn_bioluminiscencia.png',
    image: '/assets/starwars/infographic_fauna/hero_bioluminiscencia.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_bioluminiscencia.png',
    bannerCaption: "La bioluminiscencia es una reacción química entre luciferina y luciferasa que produce luz sin calor en organismos marinos.",
    content: [
      "Cuando exploramos las partes más recónditas de la naturaleza, especialmente los inmensos abismos marinos donde la luz solar jamás logra penetrar, encontramos un espectáculo brillante casi mágico. La bioluminiscencia es la capacidad espectacular de un organismo vivo para producir y emitir su propia luz. Este fenómeno, en lugar de ser una simple fantasía visual, es el resultado directo de una reacción química fría y eficiente que ha evolucionado de forma independiente en decenas de grupos animales diferentes a lo largo del tiempo biológico.",
      "El corazón químico de este deslumbrante fenómeno se basa en dos componentes moleculares clave: la molécula llamada luciferina y la enzima denominada luciferasa. Cuando la luciferina reacciona con el oxígeno, la enzima luciferasa actúa como un acelerador catalítico que permite la liberación de energía luminosa en forma de fotones. Es una luz excepcionalmente fría, lo que significa que casi no genera calor, a diferencia de nuestras bombillas incandescentes tradicionales donde una gran cantidad de energía se desperdicia trágicamente por el calentamiento.",
      "En las profundidades del vasto océano terrestre, se estima que un setenta y seis por ciento de todos los organismos pelágicos tienen la capacidad de producir bioluminiscencia. Peces abisales, como el aterrador pero fascinante pez pescador, utilizan esta luz brillante como una trampa colgante para engañar y atraer a sus presas en la más absoluta oscuridad. Además, criaturas microscópicas como los dinoflagelados pueden iluminar las olas marinas durante la noche en un espectáculo masivo de defensa sincronizada, asustando a los depredadores menores.",
      "El impacto de este estudio en la ciencia moderna ha sido monumental. En el año 2008, el Premio Nobel de Química fue otorgado por el aislamiento y desarrollo de la Proteína Verde Fluorescente, también conocida como GFP, extraída originalmente de la medusa Aequorea victoria. Esta proteína revolucionaria permite a los investigadores médicos iluminar el interior de células vivas y rastrear el crecimiento de tumores o el desarrollo neuronal, cambiando para siempre el panorama de la investigación médica y la ingeniería genética.",
      "En el rico universo de la ciencia ficción galáctica, a menudo presenciamos selvas brillantes, cavernas fluorescentes y extrañas criaturas luminosas que habitan planetas exóticos carentes de un sol intenso. Estos mundos oscuros pero llenos de luz biológica no son tan descabellados si miramos las maravillas fosforescentes de nuestras propias trincheras oceánicas. La naturaleza demuestra una y otra vez que la capacidad de generar luz propia es una adaptación universal poderosa para sobrevivir, cazar y comunicarse en los entornos más carentes de energía."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: "En episodios de The Clone Wars, observamos la espesa e intrigante selva del planeta Umbara, donde la flora y fauna locales desprenden un fulgor iridiscente en una oscuridad perpetua. Del mismo modo, en las cuevas cristalinas de las regiones desconocidas, diversas especies de insectos y bestias generan luz fría, reflejando fielmente cómo operan los ecosistemas en las oscuras y gélidas trincheras oceánicas de nuestro planeta." 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: "La reacción química responsable de la bioluminiscencia es energéticamente tan perfecta que el 98% de la energía consumida por las moléculas se libera puramente en forma de fotones de luz, con apenas un mínimo residuo térmico. Comparada con las bombillas incandescentes del pasado, que desperdician hasta el 90% de su energía emitiendo un calor inútil, la biología sigue siendo infinitamente superior a nuestra tecnología." 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: "El descubrimiento de la Proteína Verde Fluorescente (GFP) de la medusa Aequorea victoria revolucionó el campo médico de la biología molecular celular. Fue tan indispensable para iluminar procesos invisibles que los científicos Osamu Shimomura, Martin Chalfie y Roger Y. Tsien fueron galardonados conjuntamente con el célebre y prestigioso Premio Nobel de Química en el memorable año 2008 por este monumental avance científico." 
      }
    ],
    fact: "Más del 76% de los organismos que habitan la columna de agua profunda en los océanos del mundo producen algún tipo de luz bioluminiscente. La reacción de luciferina y luciferasa es un ejemplo perfecto de convergencia evolutiva, donde la naturaleza encontró la misma solución brillante una y otra vez para iluminar la oscuridad extrema."
  },
  {
    id: 'exobiologia-futuro',
    title: 'Buscando Vida Extraterrestre',
    color: '#8BC34A',
    btnImage: '/assets/starwars/infographic_fauna/btn_exobiologia_futuro.png',
    image: '/assets/starwars/infographic_fauna/hero_exobiologia_futuro.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_exobiologia_futuro.png',
    bannerCaption: "El telescopio James Webb analiza las atmósferas de exoplanetas buscando biofirmas como oxígeno, metano y vapor de agua.",
    content: [
      "Desde los albores de la civilización, el ser humano ha contemplado la inmensidad del firmamento nocturno preguntándose si estamos solos en el vasto cosmos. Esta profunda interrogante filosófica ha dado origen a la astrobiología, una disciplina científica moderna que combina la astronomía, la biología molecular. La geología planetaria para rastrear la presencia de ecosistemas orgánicos más allá de nuestro planeta natal, utilizando la rigurosa metodología empírica para descifrar los misterios de la evolución estelar.",
      "Para ordenar nuestras expectativas sobre la vida galáctica, el célebre astrónomo Frank Drake formuló en 1961 su ecuación matemática probabilística. La Ecuación de Drake calcula teóricamente el número de civilizaciones activas. Comunicativas dentro de la Vía Láctea, considerando factores variables como la tasa de formación de estrellas adecuadas, la fracción de aquellas con sistemas planetarios y la remota posibilidad de que emerja tecnología detectable. Es un marco de referencia fenomenal para dimensionar las matemáticas cósmicas de la existencia.",
      "Nuestra exploración no se detiene en meras suposiciones teóricas. Proyectos emblemáticos como el programa SETI se dedican a escanear activamente los cielos en busca de anomalías de radiofrecuencia. El ejemplo más famoso de este esfuerzo ocurrió en 1977, cuando el radiotelescopio Big Ear detectó la enigmática Señal Wow!, una transmisión de banda estrecha sorprendentemente intensa que duró 72 segundos. Aunque su origen nunca fue plenamente explicado, sigue siendo el candidato más intrigante en la histórica búsqueda de transmisiones alienígenas inteligentes.",
      "Actualmente, la esperanza de encontrar microorganismos vivos se concentra cerca de nuestro hogar solar, específicamente en las lunas oceánicas de los planetas gigantes. Encelado, satélite de Saturno, y Europa, satélite de Júpiter, ocultan gigantescos océanos líquidos bajo gruesas capas de hielo glacial. Los científicos sospechan que, impulsados por chimeneas hidrotermales submarinas en sus lechos oceánicos, estos entornos oscuros y cálidos albergan las condiciones biológicas químicas exactas para sostener formas de vida extremófilas semejantes a las terrestres.",
      "En un salto tecnológico sin precedentes, el monumental Telescopio Espacial James Webb ahora puede analizar las atmósferas de exoplanetas situados a años luz de distancia. Al descomponer la luz de sus soles a través de un espectrógrafo preciso, los astrofísicos buscan activamente biofirmas moleculares inequívocas, como metano y oxígeno, que delaten procesos biológicos subyacentes. El universo rebosante de flora y fauna de las películas clásicas nos inspira constantemente a perfeccionar nuestras herramientas y seguir mirando con asombro hacia lo desconocido."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: "El extenso universo cinematográfico nos muestra un tapiz inagotable donde miles de formas de vida diferentes interactúan diariamente en planetas y estaciones espaciales densamente pobladas. La existencia de especies infinitamente variadas como los Wookiees, los Mon Calamari y los misteriosos y ancestrales Yoda resuenan directamente con el optimismo científico moderno de que los mundos alienígenas podrían albergar biomas y ecosistemas complejos y diversos." 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: "El Telescopio Espacial James Webb utiliza la avanzada técnica de espectroscopía de tránsito para detectar biofirmas. Cuando un planeta lejano pasa frente a su estrella madre, la luz estelar es filtrada por la atmósfera planetaria. Los distintos gases absorben ciertas longitudes de onda específicas, creando un código de barras químico único que los astrónomos pueden leer y analizar meticulosamente desde la seguridad de nuestro sistema solar." 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: "El famoso y aún inexplicable misterio de la Señal Wow! de 1977 recibió su inusual nombre debido a que el astrónomo voluntario Jerry R. Ehman quedó tan impactado por la abrumadora y clara intensidad del registro de radio impreso en papel continuo. Circuló los datos astronómicos con un bolígrafo rojo y escribió la palabra inglesa Wow en el margen superior de la histórica hoja de investigación." 
      }
    ],
    fact: "La astrobiología moderna se enfoca en detectar gases inestables como el metano o el oxígeno en atmósferas lejanas de otros mundos, ya que la coexistencia simultánea de estos elementos químicos suele requerir una reposición biológica continua. Encelado y Europa son hoy los principales candidatos de nuestro vecindario solar."
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
    const setSize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
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
        XENOBIOLOGÍA Y LA FAUNA DE STAR WARS
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        BIOLOGÍA EXTREMA &middot; MEGAFAUNA &middot; ADAPTACIÓN
      </h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec5" : undefined}
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
        <div style={{ position: 'absolute', top: '5px', right: '5px', background: node.color, borderRadius: '50%', padding: '2px' }}>
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
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: isOpen ? `${color}11` : 'transparent', border: 'none', color: '#FFF', cursor: 'pointer', fontFamily: '"Oswald", sans-serif' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: color }}>{EXPAND_ICONS[data.icon] || <Star size={18}/>}</span>
          <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>{data.label}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}><ChevronDown size={18} color={color} /></motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div variants={variant} initial="hidden" animate="visible" exit="hidden" style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.6, color: '#CFD8DC' }}>{data.text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentPanel = ({ node, onClose, onNext, isLast, setLightboxSrc }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const DecoComp1 = DECO_MAP[node.id]?.[0] || DecoDNA;
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoCell;
  return (
    <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ position: 'fixed', inset: '2rem', background: '#0B0D17', borderRadius: '24px', overflow: 'hidden', zIndex: 100, boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px ${node.color}33`, display: 'flex', flexDirection: 'column' }}>
      <DecoComp1 size={200} color={node.color} style={{ position: 'absolute', top: '-50px', left: '-50px', opacity: 0.05, zIndex: 0 }} />
      <DecoComp2 size={150} color={node.color} style={{ position: 'absolute', bottom: '10%', right: '-20px', opacity: 0.05, zIndex: 0 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', background: `linear-gradient(90deg, #1A1C29 0%, ${node.color}22 100%)`, zIndex: 10, borderBottom: `1px solid ${node.color}33` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={node.btnImage} alt="icon" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}  loading="lazy" />
          </div>
          <h2 style={{ margin: 0, fontFamily: '"Oswald", sans-serif', fontSize: '1.5rem', color: '#FFF' }}>{node.title}</h2>
        </div>
        <button onClick={onClose} style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#FFF', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}><X size={24} /></button>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '280px' }}>
          <div style={{ padding: '2rem', background: '#1A1C29', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#E0E0E0' }}>
              <span style={{ fontSize: '3rem', float: 'left', lineHeight: '2.5rem', paddingRight: '8px', color: node.color, fontFamily: '"Oswald", sans-serif' }}>{node.content[0].charAt(0)}</span>
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
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>{node.content[1]}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            <div style={{ position: 'relative', padding: '1.5rem', background: `linear-gradient(135deg, ${node.color}11, transparent)`, border: `1px solid ${node.color}33`, borderRadius: '12px' }}>
              <div style={{ position: 'absolute', top: -12, left: 16, background: '#0B0D17', padding: '0 8px', color: node.color, fontWeight: 'bold', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>
                <Star size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}/> DATAFILA
              </div>
              <p style={{ fontFamily: '"Lora", serif', fontSize: '1rem', lineHeight: 1.6, color: '#FFF', margin: 0 }}>{node.fact}</p>
            </div>
            <div>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
              ))}
            </div>
          </div>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', marginTop: '1rem' }}>{node.content[2]}</p>
          {node.bannerImage && (
            <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${node.color}55` }}>
              <img src={node.bannerImage} alt="banner" onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              {node.bannerCaption && (
                <div style={{ background: '#1A1C29', padding: '0.75rem', textAlign: 'center', fontSize: '0.9rem', color: '#90A4AE', fontFamily: '"Oswald", sans-serif', fontStyle: 'italic' }}>{node.bannerCaption}</div>
              )}
            </div>
          )}
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>{node.content[3]}</p>
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC' }}>{node.content[4]}</p>
        </div>
      </div>
      <div style={{ padding: '1rem 2rem', background: '#1A1C29', borderTop: `1px solid ${node.color}33`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <div style={{ color: '#90A4AE', fontSize: '0.9rem', fontFamily: '"Oswald", sans-serif' }}>ARCHIVOS DEL TEMPLO / {node.title.toUpperCase()}</div>
        <button onClick={onNext} style={{ background: node.color, color: '#000', border: 'none', padding: '0.75rem 2rem', borderRadius: '24px', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: `0 4px 15px ${node.color}66` }}>
          {isLast ? 'FINALIZAR' : 'SIGUIENTE'} <ChevronRight size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec5() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const progress = (visitedNodes.size / INFOGRAPHIC_NODES.length) * 100;
  const isAllComplete = visitedNodes.size === INFOGRAPHIC_NODES.length;
  const handleNodeClick = (node) => { setActiveNode(node.id); if (!visitedNodes.has(node.id)) { setVisitedNodes(prev => new Set(prev).add(node.id)); } };
  const handleNext = () => {
    const currentIndex = INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode);
    if (currentIndex < INFOGRAPHIC_NODES.length - 1) { handleNodeClick(INFOGRAPHIC_NODES[currentIndex + 1]); }
    else { setActiveNode(null); }
  };
  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: '#05060A', overflow: 'hidden', fontFamily: '"Lora", serif' }}>
      <StarField />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_fauna/bg_fauna.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 10, padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GalacticHeader nodes={INFOGRAPHIC_NODES} activeId={activeNode} />
        <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '400px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: '3rem' }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <motion.div key={node.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <NodeButton node={node} isVisited={(id) => visitedNodes.has(id)} onClick={handleNodeClick} />
            </motion.div>
          ))}
        </div>
        <div style={{ width: '100%', maxWidth: '600px', marginTop: '4rem', background: '#1A1C29', borderRadius: '12px', padding: '1rem', border: '1px solid #333' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontFamily: '"Oswald", sans-serif', color: '#90A4AE' }}>
            <span>CONOCIMIENTO XENOBIOLÓGICO</span><span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #AB47BC, #42A5F5)', boxShadow: '0 0 10px #42A5F5' }} />
          </div>
        </div>
        <AnimatePresence>
          {isAllComplete && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #00CED1, #7B68EE)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(123, 104, 238, 0.4)' }}>
              <img src="/assets/starwars/infographic_fauna/badge_fauna.png" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              ¡DATOS XENOBIOLÓGICOS COMPLETADOS!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS HOLOCRÓN (Bibliografía)</h3>
          <ul style={{ margin: 0, padding: '0 0 0 1rem', color: '#78909C', fontFamily: '"Lora", serif', fontSize: '0.9rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((item, idx) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>)}
          </ul>
        </div>
      </div>
      <AnimatePresence>
        {activeNode && (
          <ContentPanel 
            node={INFOGRAPHIC_NODES.find(n => n.id === activeNode)} 
            onClose={() => setActiveNode(null)} onNext={handleNext} 
            isLast={INFOGRAPHIC_NODES.findIndex(n => n.id === activeNode) === INFOGRAPHIC_NODES.length - 1} 
            setLightboxSrc={setLightboxSrc} 
          />
        )}
      </AnimatePresence>
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
