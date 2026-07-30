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
    title: 'Vida en lo Imposible: ExtremÃ³filos',
    color: '#66BB6A',
    btnImage: '/assets/starwars/infographic_fauna/btn_extremofilos.png',
    image: '/assets/starwars/infographic_fauna/hero_extremofilos.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_extremofilos.png',
    bannerCaption: "Los tardÃ­grados sobreviven condiciones extremas: vacÃ­o espacial, radiaciÃ³n y temperaturas de âˆ’272Â°C a 150Â°C.",
    content: [
      "Â¿Alguna vez te has preguntado cÃ³mo serÃ­a vivir en un volcÃ¡n en erupciÃ³n, en el fondo del ocÃ©ano o flotando en el espacio? Para los humanos, esto es imposible. Sin embargo, en la Tierra existen pequeÃ±os organismos biolÃ³gicos que consideran estos ambientes extremos como su hogar. Los cientÃ­ficos los llaman 'extremÃ³filos', que significa amantes de lo extremo.",
      "El campeÃ³n de los extremÃ³filos es un animal microscÃ³pico llamado tardÃ­grado, tambiÃ©n conocido como osito de agua. Estas diminutas criaturas de ocho patas pueden sobrevivir a temperaturas de mÃ¡s de 150 grados Celsius y a frÃ­os espantosos de casi -270 grados Celsius. Si se secan, se encogen en una bolita llamada 'ton' y pueden pasar dÃ©cadas sin agua, despertando cuando finalmente los mojas.",
      "Los tardÃ­grados no estÃ¡n solos. Existe una bacteria llamada Deinococcus radiodurans, conocida como 'Conan la Bacteria'. Puede sobrevivir a niveles de radiaciÃ³n que destruirÃ­an el ADN de un ser humano miles de veces. Cuando la radiaciÃ³n rompe su cÃ³digo genÃ©tico, esta bacteria tiene un sistema de reparaciÃ³n rÃ¡pido que vuelve a unir las piezas en cuestiÃ³n de horas.",
      "Estos descubrimientos terrestres han revolucionado la astrobiologÃ­a, la ciencia que estudia la vida en el universo. Antes, los cientÃ­ficos creÃ­an que un planeta necesitaba tener un clima templado como la Tierra para albergar vida. Pero al descubrir a los extremÃ³filos, comprendieron que la vida podrÃ­a esconderse en lugares que pensÃ¡bamos imposibles, como debajo del hielo de Europa (una luna de JÃºpiter) o en Marte.",
      "En el universo de Star Wars, la variedad de planetas extremos estÃ¡ directamente inspirada en la asombrosa biologÃ­a de la Tierra. Si un planeta rocoso estÃ¡ cubierto de lava como Mustafar, o congelado bajo gruesas capas de hielo como Hoth, la biologÃ­a nos enseÃ±a que, si hay energÃ­a, la vida puede prosperar."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En El Imperio Contraataca, vemos a la babosa espacial (Exogorth), una criatura que vive dentro de tÃºneles en asteroides en el vacÃ­o del espacio. Este es un ejemplo cinematogrÃ¡fico de un monstruo espacial concebido como un organismo extremÃ³filo.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Para sobrevivir a la desecaciÃ³n, los tardÃ­grados producen una proteÃ­na especial llamada ProteÃ­na IntrÃ­nsecamente Desordenada (TDP). Cuando el agua desaparece de sus cuerpos, estas proteÃ­nas forman un escudo protector similar al cristal.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'Los tardÃ­grados fueron los primeros animales multicelulares en sobrevivir al vacÃ­o del espacio exterior. En 2007, un grupo de investigadores los enviÃ³ a bordo de la nave cientÃ­fica FOTON-M3, exponiÃ©ndolos directamente al espacio sin protecciÃ³n.' 
      }
    ],
    fact: 'La astrobiologÃ­a estudia las posibilidades matemÃ¡ticas y biolÃ³gicas de encontrar vida extraterrestre basÃ¡ndose en los modelos de supervivencia de los organismos extremÃ³filos terrestres.'
  },
  {
    id: 'sarlacc-digestivo',
    title: 'El Sarlacc: DigestiÃ³n de 1000 AÃ±os',
    color: '#FFB74D',
    btnImage: '/assets/starwars/infographic_fauna/btn_sarlacc_digestivo.png',
    image: '/assets/starwars/infographic_fauna/hero_sarlacc_digestivo.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_sarlacc_digestivo.png',
    bannerCaption: "Los depredadores emboscadores, como las araÃ±as trampilla, emplean estrategias pasivas para capturar presas sin persecuciÃ³n.",
    content: [
      "Imagina caer en un foso profundo y resbaladizo cuyas paredes estÃ¡n vivas y llenas de dientes. AsÃ­ funciona el Sarlacc en Tatooine, un gigantesco depredador pasivo. Aunque parezca de otro mundo, en la Tierra existen criaturas asombrosas que tambiÃ©n esperan pacientemente a que sus presas caigan directamente en sus bocas.",
      "El androide C-3PO menciona que ser tragado por un Sarlacc significa ser digerido a lo largo de mil aÃ±os de sufrimiento continuo. Desde una perspectiva biolÃ³gica terrestre, una digestiÃ³n tan prolongada es imposible, pero el concepto se inspira en organismos reales que disuelven a sus vÃ­ctimas mediante un complejo proceso quÃ­mico.",
      "En nuestro planeta, las plantas carnÃ­voras como las del gÃ©nero Nepenthes habitan zonas pantanosas con suelos carentes de nitrÃ³geno. Para sobrevivir, desarrollan estructuras en forma de jarra profunda que actÃºan como trampas. Cuando un insecto cae, no puede escapar y se convierte en el alimento que la planta necesita para crecer.",
      "El secreto de este letal proceso biolÃ³gico reside en las enzimas digestivas. Estas diminutas proteÃ­nas actÃºan como agentes destructores que descomponen las molÃ©culas de la presa. En el fondo de la trampa, un caldo quÃ­mico altamente corrosivo transforma los tejidos sÃ³lidos en nutrientes lÃ­quidos asimilables.",
      "La prÃ³xima vez que veas al cazarrecompensas Boba Fett caer en las fauces de la enorme bestia del desierto, recuerda que los sistemas digestivos reales pueden ser igual de sorprendentes. La naturaleza nos demuestra que no siempre el cazador mÃ¡s rÃ¡pido gana; a veces, la paciencia y un estÃ³mago resistente son armas mucho mÃ¡s eficaces."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio VI: El Retorno del Jedi, el lÃ­der criminal Jabba el Hutt condena a Luke Skywalker y sus amigos a ser devorados por el Sarlacc en el pozo de Carkoon. Esta criatura se ha convertido en uno de los monstruos mÃ¡s icÃ³nicos de la saga por su peculiar mÃ©todo de ejecuciÃ³n.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La planta carnÃ­vora gigante Nepenthes rajah de Borneo tiene una trampa tan grande que ocasionalmente puede capturar y digerir pequeÃ±os vertebrados, como ranas e incluso ratones. Su trampa contiene hasta dos litros y medio de fluido digestivo altamente especializado.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'Algunas avispas parasitoides inyectan sus huevos directamente dentro de orugas vivas. Al nacer, las larvas devoran lentamente a la oruga desde adentro, evitando consumir sus Ã³rganos vitales para mantenerla viva el mayor tiempo posible, similar al lento proceso digestivo del Sarlacc.' 
      }
    ],
    fact: 'El estÃ³mago humano debe producir una gruesa capa de mucosidad protectora de forma constante. Sin esta barrera esencial, los potentes Ã¡cidos y las enzimas gÃ¡stricas literalmente comenzarÃ­an a digerir los propios tejidos del estÃ³mago.'
  },
  {
    id: 'rancor-megafauna',
    title: 'El Rancor: Megafauna PrehistÃ³rica',
    color: '#26A69A',
    btnImage: '/assets/starwars/infographic_fauna/btn_rancor_megafauna.png',
    image: '/assets/starwars/infographic_fauna/hero_rancor_megafauna.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_rancor_megafauna.png',
    bannerCaption: "La megafauna terrestre, como el Paraceratherium de 20 toneladas, requerÃ­a estructuras Ã³seas reforzadas por la ley del cuadrado-cubo.",
    content: [
      "Cuando la inmensa puerta del calabozo de Jabba se levanta, emerge una de las criaturas carnÃ­voras mÃ¡s aterradoras de la galaxia: el Rancor. Este monstruo bÃ­pedo con garras gigantes y piel blindada parece una pesadilla imparable. Pero diseÃ±ar biolÃ³gicamente a un gigante asÃ­ requiere algo mÃ¡s que imaginaciÃ³n.",
      "El tamaÃ±o de los animales estÃ¡ estrictamente limitado por una regla fÃ­sica fundamental: la ley del cuadrado-cubo. A medida que un ser vivo crece, su volumen y peso aumentan mucho mÃ¡s rÃ¡pido que la fuerza de sus huesos o mÃºsculos. Un animal gigantesco necesita adaptaciones extremas solo para poder sostener su propio peso.",
      "Para que criaturas enormes como los antiguos dinosaurios terÃ³podos, como el Tyrannosaurus rex, pudieran caminar sin fracturarse las piernas, necesitaban huesos increÃ­blemente densos y fuertes. AdemÃ¡s, requerÃ­an una musculatura adaptada para soportar y mover grandes masas, lo que limita significativamente su agilidad y velocidad mÃ¡xima.",
      "Un monstruo del tamaÃ±o del Rancor tendrÃ­a requerimientos calÃ³ricos colosales. Para mantener su metabolismo activo y reparar sus tejidos, necesitarÃ­a consumir enormes cantidades de alimento a diario. Esto obliga a los grandes depredadores a pasar la mayor parte de su tiempo cazando o consumiendo grandes presas para sobrevivir.",
      "Aunque ya no tenemos grandes dinosaurios carnÃ­voros caminando por la Tierra, el estudio de la megafauna prehistÃ³rica nos ayuda a comprender los lÃ­mites biolÃ³gicos. Estos titanes del pasado demuestran que el tamaÃ±o extremo es posible, pero siempre viene acompaÃ±ado de un delicado equilibrio energÃ©tico y biomecÃ¡nico."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio VI: El Retorno del Jedi, Luke Skywalker se enfrenta al feroz Rancor de Jabba desarmado. Usando su astucia en lugar de fuerza bruta, logra derrotarlo aplastÃ¡ndolo con la gran puerta de la cueva, demostrando que el tamaÃ±o masivo tambiÃ©n tiene desventajas tÃ¡cticas.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La piel de los grandes mamÃ­feros terrestres, como los elefantes o rinocerontes, es gruesa y altamente resistente. Sin embargo, carecen de pelaje extenso porque su gran volumen corporal dificulta la disipaciÃ³n de calor; tener una piel expuesta les permite regular mejor su temperatura.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'El animal mÃ¡s grande que jamÃ¡s ha existido en la Tierra no es un dinosaurio, sino la ballena azul contemporÃ¡nea. El medio acuÃ¡tico proporciona flotabilidad, contrarrestando los efectos de la gravedad y permitiÃ©ndole alcanzar tamaÃ±os de hasta 30 metros de largo que serÃ­an imposibles en tierra firme.' 
      }
    ],
    fact: 'La ley del cuadrado-cubo, descrita por Galileo Galilei en 1638, establece que cuando un objeto aumenta de tamaÃ±o, su superficie crece al cuadrado mientras que su volumen crece al cubo, dictando asÃ­ el lÃ­mite de tamaÃ±o de cualquier animal terrestre.'
  },
  {
    id: 'tauntaun-adaptacion',
    title: 'Tauntauns: AdaptaciÃ³n al FrÃ­o Extremo',
    color: '#AED581',
    btnImage: '/assets/starwars/infographic_fauna/btn_tauntaun_adaptacion.png',
    image: '/assets/starwars/infographic_fauna/hero_tauntaun_adaptacion.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_tauntaun_adaptacion.png',
    bannerCaption: "Los mamÃ­feros Ã¡rticos desarrollan grasa subcutÃ¡nea, contracorriente vascular y pelaje multicapa para sobrevivir a âˆ’50Â°C.",
    content: [
      "Imaginen que estÃ¡n caminando en un lugar tan frÃ­o que incluso el aliento se congela en el aire antes de tocar el suelo. AsÃ­ es el planeta helado de Hoth, un mundo implacable con temperaturas mortales. Para sobrevivir en ambientes tan extremos, los animales no pueden simplemente ponerse un abrigo de invierno. Deben poseer adaptaciones biolÃ³gicas fascinantes que funcionan como una armadura invisible contra la temperatura. La naturaleza, en su infinita sabidurÃ­a, ha desarrollado ingeniosas estrategias para mantener el calor corporal, desde alteraciones en la circulaciÃ³n sanguÃ­nea hasta la creaciÃ³n de anticongelantes biolÃ³gicos internos.",
      "Un mecanismo crucial que utilizan los animales del Ãrtico terrestre es el intercambio de calor a contracorriente. Piensen en esto como un sistema de tuberÃ­as inteligente donde las arterias cÃ¡lidas que bajan del corazÃ³n calientan la sangre frÃ­a de las venas que regresa de las extremidades. De este modo, el calor se retiene en el nÃºcleo vital del cuerpo y no se pierde por las patas o las aletas. Es como si el cuerpo reciclara constantemente su propia calefacciÃ³n, asegurando que los Ã³rganos principales funcionen perfectamente mientras las patas pueden soportar el hielo sin llegar a congelarse.",
      "Otra estrategia formidable es la termogÃ©nesis que se produce en el tejido adiposo marrÃ³n, una grasa especializada diseÃ±ada especÃ­ficamente para generar calor en lugar de simplemente almacenar energÃ­a. Funciona casi como un motor interno de combustiÃ³n que se enciende cuando las temperaturas caen drÃ¡sticamente. AdemÃ¡s, animales como el zorro Ã¡rtico poseen un pelaje extraordinario compuesto por pelos que tienen el centro hueco. Este espacio vacÃ­o atrapa el aire caliente cerca de la piel, creando un excelente aislamiento tÃ©rmico que funciona exactamente como el doble cristal de las ventanas en una casa moderna.",
      "El verdadero salto cientÃ­fico ocurriÃ³ en el aÃ±o 1969, cuando el investigador Arthur DeVries hizo un descubrimiento que cambiÃ³ la biologÃ­a marina para siempre. Mientras estudiaba peces en las aguas gÃ©lidas de la AntÃ¡rtida, notÃ³ que estos no se convertÃ­an en bloques de hielo a pesar de estar en un medio a temperaturas bajo cero. DeVries descubriÃ³ que la sangre de estos peces contenÃ­a unas proteÃ­nas especiales que evitaban la cristalizaciÃ³n del agua en sus venas, actuando igual que el lÃ­quido anticongelante que ponemos en el motor de un automÃ³vil durante el invierno extremo.",
      "Estas proteÃ­nas anticongelantes, tambiÃ©n conocidas como AFPs, se adhieren a los cristales microscÃ³picos de hielo y evitan que crezcan y rompan las cÃ©lulas desde adentro. Al explorar la galaxia, vemos paralelos impresionantes en la ciencia ficciÃ³n. En el clÃ¡sico del cine, cuando el contrabandista Han Solo utiliza su sable de luz para abrir el vientre del Tauntaun caÃ­do y proteger a Luke Skywalker, nos muestra que el interior de estas criaturas debe mantener un inmenso calor biolÃ³gico, usando gruesas capas de grasa y probablemente sistemas internos muy similares a los de nuestros propios animales polares."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: "En El Imperio Contraataca (1980), los rebeldes utilizan a los Tauntauns como monturas de patrullaje porque sus adaptaciones biolÃ³gicas superan a las mÃ¡quinas, las cuales se congelan constantemente en el clima severo de Hoth. La icÃ³nica escena donde Han Solo resguarda a Luke Skywalker dentro del cuerpo cÃ¡lido de su montura subraya perfectamente el concepto de aislamiento tÃ©rmico animal extremo." 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: "El aislamiento proporcionado por el pelaje del zorro Ã¡rtico es tan excepcionalmente eficiente que el animal no empieza a temblar ni a sentir frÃ­o hasta que la temperatura ambiente desciende por debajo de los asombrosos menos 70 grados Celsius. Sus pelos con un nÃºcleo hueco atrapan el aire aislante, reduciendo al mÃ­nimo absoluto la transferencia tÃ©rmica hacia el entorno exterior helado." 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: "El descubrimiento de las proteÃ­nas anticongelantes por el cientÃ­fico Arthur DeVries en 1969 no solo nos ayudÃ³ a comprender cÃ³mo sobreviven los peces antÃ¡rticos, sino que ha inspirado aplicaciones prÃ¡cticas en nuestra vida diaria, desde mejorar la textura de los helados comerciales hasta prolongar el tiempo de viabilidad de los Ã³rganos humanos durante los trasplantes mÃ©dicos crÃ­ticos." 
      }
    ],
    fact: "El tejido adiposo marrÃ³n es un tipo especializado de grasa que quema calorÃ­as directamente para generar calor corporal vital sin necesidad de temblar. Al mismo tiempo, las proteÃ­nas anticongelantes detienen el crecimiento de los diminutos cristales de hielo en el torrente sanguÃ­neo, protegiendo las membranas celulares y permitiendo que la vida florezca incluso en los climas mÃ¡s inclementes de la Tierra."
  },
  {
    id: 'purrgil-migracion',
    title: 'Los Purrgil: MigraciÃ³n Espacial',
    color: '#FF7043',
    btnImage: '/assets/starwars/infographic_fauna/btn_purrgil_migracion.png',
    image: '/assets/starwars/infographic_fauna/hero_purrgil_migracion.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_purrgil_migracion.png',
    bannerCaption: "Las ballenas jorobadas migran 8,000 km guiÃ¡ndose por el campo magnÃ©tico terrestre, fenÃ³meno llamado magnetorrecepciÃ³n.",
    content: [
      "El reino animal estÃ¡ lleno de viajeros incansables que emprenden trayectos Ã©picos a travÃ©s del mundo entero sin el uso de mapas o sistemas de posicionamiento satelital. Esta inmensa capacidad para la migraciÃ³n es uno de los mayores misterios biolÃ³gicos de la naturaleza. Organismos de diversas especies cruzan ocÃ©anos y continentes enteros guiados por seÃ±ales invisibles del entorno, superando obstÃ¡culos formidables y condiciones climÃ¡ticas extremas para llegar con una precisiÃ³n impecable a sus destinos de reproducciÃ³n o alimentaciÃ³n.",
      "Uno de los ejemplos mÃ¡s notables de resistencia es el del charrÃ¡n Ã¡rtico, un ave marina relativamente pequeÃ±a que realiza un recorrido migratorio anual de aproximadamente setenta mil kilÃ³metros. Viaja desde las zonas de crÃ­a en el Ãrtico hasta la AntÃ¡rtida y regresa en un ciclo continuo, experimentando dos veranos cada aÃ±o y viendo mÃ¡s luz diurna que cualquier otra criatura del planeta. Este impresionante viaje de resistencia demuestra cÃ³mo la evoluciÃ³n ha dotado a ciertas especies de capacidades fÃ­sicas y de navegaciÃ³n incomparables.",
      "Â¿Pero cÃ³mo logran orientarse exactamente estos animales majestuosos? La respuesta reside en un fenÃ³meno conocido como magnetorrecepciÃ³n. Se ha descubierto que diversas especies, incluyendo ciertas aves y tortugas marinas, poseen pequeÃ±os cristales de magnetita, un mineral de Ã³xido de hierro con la fÃ³rmula quÃ­mica Fe3O4, alojados principalmente en sus picos o sistemas nerviosos. Esta maravilla biolÃ³gica funciona como una brÃºjula interna, permitiÃ©ndoles percibir de manera directa el campo magnÃ©tico de la Tierra y ajustar sus rutas migratorias.",
      "Otro caso fascinante es el de la migraciÃ³n de las majestuosas mariposas monarca, que viajan miles de kilÃ³metros desde AmÃ©rica del Norte hasta los cÃ¡lidos bosques de MÃ©xico. A diferencia de las aves, estas mariposas utilizan principalmente una especie de compÃ¡s solar interno, midiendo meticulosamente la posiciÃ³n del sol en el firmamento combinado con su propio reloj circadiano para mantener la direcciÃ³n correcta. A esto se suma el canto de las inmensas ballenas jorobadas, que puede viajar mÃ¡s de tres mil kilÃ³metros bajo el agua oceÃ¡nica.",
      "La ciencia de la migraciÃ³n y la navegaciÃ³n innata se refleja de manera espectacular en la galaxia de ficciÃ³n. Los gigantescos Purrgil, las famosas ballenas espaciales vistas en la serie animada Star Wars Rebels, son capaces de navegar por el oscuro vacÃ­o del cosmos y entrar en el hiperespacio sin tecnologÃ­a alguna. AsÃ­ como nuestros animales terrestres leen los campos magnÃ©ticos del planeta, los Purrgil deben percibir flujos de energÃ­a estelar o redes gravitacionales para trazar rutas interestelares de forma biolÃ³gica y completamente natural."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: "En la aclamada serie animada Star Wars Rebels y posteriormente en la serie de acciÃ³n real Ahsoka, descubrimos que los Purrgil son los responsables originales de inspirar la tecnologÃ­a de los motores hiperespaciales. Observando a estas magnÃ­ficas bestias, los primeros ingenieros galÃ¡cticos aprendieron a surcar las estrellas usando rutas seguras naturales similares a las grandes autopistas migratorias." 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: "La magnetita encontrada en los picos de muchas aves migratorias responde fÃ­sicamente a los cambios de intensidad e inclinaciÃ³n del campo magnÃ©tico terrestre. El Ã³xido de hierro Fe3O4 forma estructuras minÃºsculas que transmiten seÃ±ales nerviosas directamente al cerebro del ave, permitiendo que el organismo literalmente sienta y visualice su posiciÃ³n global con un margen de error verdaderamente minÃºsculo." 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: "Las enormes ballenas jorobadas no solo migran distancias masivas de hasta veinticinco mil kilÃ³metros anuales, sino que utilizan el agua como un fenomenal conductor acÃºstico para transmitir sus complejos cantos a mÃ¡s de tres mil kilÃ³metros de distancia. Esta comunicaciÃ³n sonora les ayuda a mantener al grupo unido a travÃ©s de las inmensas y vastas cuencas oceÃ¡nicas del mundo." 
      }
    ],
    fact: "La extraordinaria capacidad de magnetorrecepciÃ³n permite que animales que jamÃ¡s han recorrido una ruta especÃ­fica puedan encontrar su camino guiados por el campo magnÃ©tico de la Tierra. El pequeÃ±o charrÃ¡n Ã¡rtico completa una travesÃ­a de 70,000 kilÃ³metros al aÃ±o, el viaje migratorio mÃ¡s largo de cualquier especie conocida por la ciencia biolÃ³gica moderna."
  },
  {
    id: 'bioluminiscencia',
    title: 'Criaturas Brillantes del Espacio',
    color: '#4DB6AC',
    btnImage: '/assets/starwars/infographic_fauna/btn_bioluminiscencia.png',
    image: '/assets/starwars/infographic_fauna/hero_bioluminiscencia.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_bioluminiscencia.png',
    bannerCaption: "La bioluminiscencia es una reacciÃ³n quÃ­mica entre luciferina y luciferasa que produce luz sin calor en organismos marinos.",
    content: [
      "Cuando exploramos las partes mÃ¡s recÃ³nditas de la naturaleza, especialmente los inmensos abismos marinos donde la luz solar jamÃ¡s logra penetrar, encontramos un espectÃ¡culo brillante casi mÃ¡gico. La bioluminiscencia es la capacidad espectacular de un organismo vivo para producir y emitir su propia luz. Este fenÃ³meno, en lugar de ser una simple fantasÃ­a visual, es el resultado directo de una reacciÃ³n quÃ­mica frÃ­a y sumamente eficiente que ha evolucionado de forma independiente en decenas de grupos animales diferentes a lo largo del tiempo biolÃ³gico.",
      "El corazÃ³n quÃ­mico de este deslumbrante fenÃ³meno se basa en dos componentes moleculares clave: la molÃ©cula llamada luciferina y la enzima denominada luciferasa. Cuando la luciferina reacciona con el oxÃ­geno, la enzima luciferasa actÃºa como un acelerador catalÃ­tico que permite la liberaciÃ³n de energÃ­a luminosa en forma de fotones. Es una luz excepcionalmente frÃ­a, lo que significa que casi no genera calor, a diferencia de nuestras bombillas incandescentes tradicionales donde una gran cantidad de energÃ­a se desperdicia trÃ¡gicamente por el calentamiento.",
      "En las profundidades del vasto ocÃ©ano terrestre, se estima que un setenta y seis por ciento de todos los organismos pelÃ¡gicos tienen la capacidad de producir bioluminiscencia. Peces abisales, como el aterrador pero fascinante pez pescador, utilizan esta luz brillante como una trampa colgante para engaÃ±ar y atraer a sus presas en la mÃ¡s absoluta oscuridad. AdemÃ¡s, criaturas microscÃ³picas como los dinoflagelados pueden iluminar las olas marinas durante la noche en un espectÃ¡culo masivo de defensa sincronizada, asustando a los depredadores menores.",
      "El impacto de este estudio en la ciencia moderna ha sido verdaderamente monumental. En el aÃ±o 2008, el Premio Nobel de QuÃ­mica fue otorgado por el aislamiento y desarrollo de la ProteÃ­na Verde Fluorescente, tambiÃ©n conocida como GFP, extraÃ­da originalmente de la medusa Aequorea victoria. Esta proteÃ­na revolucionaria permite a los investigadores mÃ©dicos iluminar el interior de cÃ©lulas vivas y rastrear el crecimiento de tumores o el desarrollo neuronal, cambiando para siempre el panorama de la investigaciÃ³n mÃ©dica y la ingenierÃ­a genÃ©tica.",
      "En el rico universo de la ciencia ficciÃ³n galÃ¡ctica, a menudo presenciamos selvas brillantes, cavernas fluorescentes y extraÃ±as criaturas luminosas que habitan planetas exÃ³ticos carentes de un sol intenso. Estos mundos oscuros pero llenos de luz biolÃ³gica no son tan descabellados si miramos las maravillas fosforescentes de nuestras propias trincheras oceÃ¡nicas. La naturaleza demuestra una y otra vez que la capacidad de generar luz propia es una adaptaciÃ³n universal poderosa para sobrevivir, cazar y comunicarse en los entornos mÃ¡s carentes de energÃ­a."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: "En episodios de The Clone Wars, observamos la espesa e intrigante selva del planeta Umbara, donde la flora y fauna locales desprenden un fulgor iridiscente en una oscuridad perpetua. Del mismo modo, en las cuevas cristalinas de las regiones desconocidas, diversas especies de insectos y bestias generan luz frÃ­a, reflejando fielmente cÃ³mo operan los ecosistemas en las oscuras y gÃ©lidas trincheras oceÃ¡nicas de nuestro planeta." 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: "La reacciÃ³n quÃ­mica responsable de la bioluminiscencia es energÃ©ticamente tan perfecta que el 98% de la energÃ­a consumida por las molÃ©culas se libera puramente en forma de fotones de luz, con apenas un mÃ­nimo residuo tÃ©rmico. Comparada con las bombillas incandescentes del pasado, que desperdician hasta el 90% de su energÃ­a emitiendo un calor inÃºtil, la biologÃ­a sigue siendo infinitamente superior a nuestra tecnologÃ­a." 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: "El descubrimiento de la ProteÃ­na Verde Fluorescente (GFP) de la medusa Aequorea victoria revolucionÃ³ el campo mÃ©dico de la biologÃ­a molecular celular. Fue tan indispensable para iluminar procesos invisibles que los cientÃ­ficos Osamu Shimomura, Martin Chalfie y Roger Y. Tsien fueron galardonados conjuntamente con el cÃ©lebre y muy prestigioso Premio Nobel de QuÃ­mica en el memorable aÃ±o 2008 por este monumental avance cientÃ­fico." 
      }
    ],
    fact: "MÃ¡s del 76% de los organismos que habitan la columna de agua profunda en los ocÃ©anos del mundo producen algÃºn tipo de luz bioluminiscente. La reacciÃ³n de luciferina y luciferasa es un ejemplo perfecto de convergencia evolutiva, donde la naturaleza encontrÃ³ la misma soluciÃ³n brillante una y otra vez para iluminar la oscuridad extrema."
  },
  {
    id: 'exobiologia-futuro',
    title: 'Buscando Vida Extraterrestre',
    color: '#8BC34A',
    btnImage: '/assets/starwars/infographic_fauna/btn_exobiologia_futuro.png',
    image: '/assets/starwars/infographic_fauna/hero_exobiologia_futuro.png',
    bannerImage: '/assets/starwars/infographic_fauna/banner_exobiologia_futuro.png',
    bannerCaption: "El telescopio James Webb analiza las atmÃ³sferas de exoplanetas buscando biofirmas como oxÃ­geno, metano y vapor de agua.",
    content: [
      "Desde los albores de la civilizaciÃ³n, el ser humano ha contemplado la inmensidad del firmamento nocturno preguntÃ¡ndose si estamos completamente solos en el vasto cosmos. Esta profunda interrogante filosÃ³fica ha dado origen a la astrobiologÃ­a, una disciplina cientÃ­fica moderna que combina la astronomÃ­a, la biologÃ­a molecular y la geologÃ­a planetaria para rastrear la presencia de ecosistemas orgÃ¡nicos mÃ¡s allÃ¡ de nuestro planeta natal, utilizando la rigurosa metodologÃ­a empÃ­rica para descifrar los misterios de la evoluciÃ³n estelar.",
      "Para ordenar nuestras expectativas sobre la vida galÃ¡ctica, el cÃ©lebre astrÃ³nomo Frank Drake formulÃ³ en 1961 su famosa ecuaciÃ³n matemÃ¡tica probabilÃ­stica. La EcuaciÃ³n de Drake calcula teÃ³ricamente el nÃºmero de civilizaciones activas y comunicativas dentro de la VÃ­a LÃ¡ctea, considerando factores variables como la tasa de formaciÃ³n de estrellas adecuadas, la fracciÃ³n de aquellas con sistemas planetarios y la remota posibilidad de que emerja tecnologÃ­a detectable. Es un marco de referencia fenomenal para dimensionar las matemÃ¡ticas cÃ³smicas de la existencia.",
      "Nuestra exploraciÃ³n no se detiene en meras suposiciones teÃ³ricas. Proyectos emblemÃ¡ticos como el programa SETI se dedican a escanear activamente los cielos en busca de anomalÃ­as de radiofrecuencia. El ejemplo mÃ¡s famoso de este esfuerzo ocurriÃ³ en 1977, cuando el radiotelescopio Big Ear detectÃ³ la enigmÃ¡tica SeÃ±al Wow!, una transmisiÃ³n de banda estrecha sorprendentemente intensa que durÃ³ 72 segundos. Aunque su origen nunca fue plenamente explicado, sigue siendo el candidato mÃ¡s intrigante en la histÃ³rica bÃºsqueda de transmisiones alienÃ­genas inteligentes.",
      "Actualmente, la esperanza de encontrar microorganismos vivos se concentra muy cerca de nuestro hogar solar, especÃ­ficamente en las lunas oceÃ¡nicas de los planetas gigantes. Encelado, satÃ©lite de Saturno, y Europa, satÃ©lite de JÃºpiter, ocultan gigantescos ocÃ©anos lÃ­quidos bajo gruesas capas de hielo glacial. Los cientÃ­ficos sospechan que, impulsados por chimeneas hidrotermales submarinas en sus lechos oceÃ¡nicos, estos entornos oscuros y cÃ¡lidos albergan las condiciones biolÃ³gicas quÃ­micas exactas para sostener formas de vida extremÃ³filas semejantes a las terrestres.",
      "En un salto tecnolÃ³gico sin precedentes, el monumental Telescopio Espacial James Webb ahora puede analizar las atmÃ³sferas de exoplanetas situados a aÃ±os luz de distancia. Al descomponer la luz de sus soles a travÃ©s de un espectrÃ³grafo preciso, los astrofÃ­sicos buscan activamente biofirmas moleculares inequÃ­vocas, como metano y oxÃ­geno, que delaten procesos biolÃ³gicos subyacentes. El universo rebosante de flora y fauna de las pelÃ­culas clÃ¡sicas nos inspira constantemente a perfeccionar nuestras herramientas y seguir mirando con asombro hacia lo desconocido."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: "El extenso universo cinematogrÃ¡fico nos muestra un tapiz inagotable donde miles de formas de vida diferentes interactÃºan diariamente en planetas y estaciones espaciales densamente pobladas. La existencia de especies infinitamente variadas como los Wookiees, los Mon Calamari y los misteriosos y ancestrales Yoda resuenan directamente con el optimismo cientÃ­fico moderno de que los mundos alienÃ­genas podrÃ­an albergar biomas y ecosistemas profundamente complejos y diversos." 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: "El Telescopio Espacial James Webb utiliza la avanzada tÃ©cnica de espectroscopÃ­a de trÃ¡nsito para detectar biofirmas. Cuando un planeta lejano pasa frente a su estrella madre, la luz estelar es filtrada por la atmÃ³sfera planetaria. Los distintos gases absorben ciertas longitudes de onda especÃ­ficas, creando un cÃ³digo de barras quÃ­mico Ãºnico que los astrÃ³nomos pueden leer y analizar meticulosamente desde la seguridad de nuestro sistema solar." 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: "El famoso y aÃºn inexplicable misterio de la SeÃ±al Wow! de 1977 recibiÃ³ su inusual nombre debido a que el astrÃ³nomo voluntario Jerry R. Ehman quedÃ³ tan impactado por la abrumadora y clara intensidad del registro de radio impreso en papel continuo, que circulÃ³ los datos astronÃ³micos con un bolÃ­grafo rojo y escribiÃ³ la palabra inglesa Wow en el margen superior de la histÃ³rica hoja de investigaciÃ³n." 
      }
    ],
    fact: "La astrobiologÃ­a moderna se enfoca en detectar gases inestables como el metano o el oxÃ­geno en atmÃ³sferas lejanas de otros mundos, ya que la coexistencia simultÃ¡nea de estos elementos quÃ­micos suele requerir una reposiciÃ³n biolÃ³gica continua. Encelado y Europa son hoy los principales candidatos de nuestro vecindario solar."
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
        XENOBIOLOGÃA Y LA FAUNA DE STAR WARS
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        BIOLOGÃA EXTREMA &middot; MEGAFAUNA &middot; ADAPTACIÃ“N
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
            <span>CONOCIMIENTO XENOBIOLÃ“GICO</span><span>{Math.round(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#0B0D17', borderRadius: '4px', overflow: 'hidden' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} style={{ height: '100%', background: 'linear-gradient(90deg, #AB47BC, #42A5F5)', boxShadow: '0 0 10px #42A5F5' }} />
          </div>
        </div>
        <AnimatePresence>
          {isAllComplete && (
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #00CED1, #7B68EE)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(123, 104, 238, 0.4)' }}>
              <img src="/assets/starwars/infographic_fauna/badge_fauna.png" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              Â¡DATOS XENOBIOLÃ“GICOS COMPLETADOS!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS HOLOCRÃ“N (BibliografÃ­a)</h3>
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
