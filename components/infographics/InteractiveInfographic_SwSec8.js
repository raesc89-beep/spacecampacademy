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
    bannerCaption: 'El espacio requiere naves gigantescas para su exploración.',
    content: [
      "¿Te imaginas construir una ciudad en el espacio? En Star Wars, los Destructores Estelares miden 1,600 metros de largo. Esto equivale a 16 campos de fútbol. Para lograr esta hazaña, el Imperio utiliza astilleros orbitales. Allí, miles de trabajadores y androides ensamblan naves en el vacío, evitando el costo de levantar su peso desde la superficie.",
      "En nuestro mundo, la Estación Espacial Internacional (ISS) es la estructura artificial más grande que los humanos han construido en órbita. Mide unos 109 metros de punta a punta, el tamaño de un campo de fútbol. Aunque parezca pequeña, la ISS es un triunfo de la ingeniería que ha estado habitada por astronautas desde el año 2000.",
      "Imagina que la ISS es como un set de piezas de LEGO que flota a 408 kilómetros sobre nosotros. Para construir este laboratorio de 420,000 kilogramos, se requirió el esfuerzo de 15 países. Se necesitaron más de 40 misiones espaciales. Cada módulo y panel solar fue lanzado individualmente y ensamblado por astronautas en caminatas espaciales.",
      "La ISS se mueve a una velocidad de 27,600 kilómetros por hora. A este ritmo, la estación completa una órbita alrededor de la Tierra cada 90 minutos. Esto significa que los astronautas ven 16 amaneceres y 16 atardeceres al día. Construir una nave mayor requeriría un salto tecnológico hacia la construcción orbital a gran escala.",
      "El éxito de la ISS demuestra que la colaboración internacional puede lograr lo que parecía ciencia ficción. En el futuro de la exploración espacial, la humanidad utilizará las lecciones aprendidas de la ISS. Así podremos diseñar, ensamblar y pilotar naves interplanetarias que algún día nos llevarán a las estrellas de nuestra Vía Láctea."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio IV, vemos un Destructor Estelar persiguiendo a la nave Tantive IV. Esta toma inicial fue diseñada para mostrar el poder del Imperio. Sus recursos industriales en astilleros orbitales como los de Kuat superan a cualquier otra facción, permitiendo fabricar flotas de guerra.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La ISS no está libre de la fuerza de gravedad. Se encuentra en un estado de caída libre perpetua alrededor de la Tierra. Como se mueve a 7.6 kilómetros por segundo, la curvatura de la Tierra cae bajo ella al mismo ritmo. Esto crea el efecto de microgravedad.' 
      }
    ],
    fact: 'La ISS es el objeto artificial más caro construido, con un costo de 150 mil millones de dólares. Flota a más de 400 kilómetros de altura y es visible desde la Tierra como una estrella brillante.'
  },
  {
    id: 'materiales',
    title: 'Supermateriales del Futuro',
    color: '#B0BEC5',
    btnImage: '/assets/starwars/infographic_cruceros/btn_materiales.png',
    image: '/assets/starwars/infographic_cruceros/hero_materiales.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_materiales.png',
    bannerCaption: 'Nuevas aleaciones permitirán estructuras imposibles hoy.',
    content: [
      "Construir naves espaciales requiere materiales que desafíen los límites de la física. Si usáramos el acero tradicional, sería tan pesado que requeriría una cantidad imposible de combustible para moverse. Por esto, los ingenieros aeroespaciales buscan crear supermateriales ligeros pero más resistentes que el diamante.",
      "Uno de los campeones de la ingeniería espacial es la fibra de carbono. Este material resulta ser cinco veces más fuerte que el acero endurecido y mucho más ligero. Se fabrica entrelazando hilos de carbono y endureciéndolos con resinas. Es ideal para construir los fuselajes de naves modernas.",
      "Para proteger a las naves del calor extremo al reingresar a la atmósfera, la NASA utiliza aleaciones de titanio. El titanio es un metal que no se corroe. Mantiene su fuerza estructural incluso a temperaturas donde otros metales se derretirían o se quebrarían por el frío del espacio.",
      "Aún más sorprendentes son los aerogeles, materiales ultraligeros que los científicos llaman 'humo congelado'. Un aerogel está compuesto por un 99% de aire atrapado en una red de sílice. A pesar de ser muy ligero, es uno de los mejores aislantes térmicos jamás inventados. Puede proteger una flor del fuego de un soplete.",
      "En las futuras décadas, el desarrollo de nanomateriales como el grafeno permitirá ensamblar componentes para naves colosales. Estos materiales reducirán el costo de los lanzamientos al ser más ligeros. Además, poseerán la resistencia necesaria para soportar impactos de micrometeoritos a altas velocidades."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el universo de Star Wars, los cascos y el blindaje de las naves están forjados con aleaciones ficticias. Algunos ejemplos son el Duracero o el Beskar mandaloriano. Estos materiales combinan ligereza con la capacidad de absorber el impacto de los disparos bláster.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El aerogel de sílice ostenta el Récord Guinness como el material sólido más ligero de la Tierra. Un bloque de aerogel del tamaño de un humano pesa menos de medio kilogramo. Sin embargo, puede soportar hasta 4,000 veces su propio peso antes de colapsar.' 
      }
    ],
    fact: 'El grafeno, descubierto en 2004, está formado por una sola capa atómica de carbono. Es 200 veces más fuerte que el acero, altamente flexible y un buen conductor eléctrico.'
  },
  {
    id: 'propulsion',
    title: 'Motores Estelares: Química a Iones',
    color: '#FFB74D',
    btnImage: '/assets/starwars/infographic_cruceros/btn_propulsion.png',
    image: '/assets/starwars/infographic_cruceros/hero_propulsion.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_propulsion.png',
    bannerCaption: 'Los motores iónicos ya son una realidad científica.',
    content: [
      "Para mover cualquier nave espacial, necesitas un sistema de propulsión. Imagina que viajas patinando sobre hielo y lanzas una bola de boliche hacia adelante. Tu cuerpo se deslizará hacia atrás debido a la física clásica. Las naves arrojan gases a altas velocidades para avanzar por el principio de acción y reacción.",
      "La mayoría de los cohetes actuales, como los cohetes Falcon 9 de SpaceX, utilizan propulsión química. Estos motores mezclan un combustible con un oxidante en una cámara de combustión. Esto crea una explosión controlada dirigida hacia atrás. Son necesarios para escapar de la gravedad terrestre, pero consumen combustible rápidamente.",
      "Para viajes interplanetarios de meses o años, los ingenieros han desarrollado los motores iónicos. En lugar de explosiones químicas, un motor iónico utiliza energía eléctrica para acelerar átomos de un gas noble como el Xenón. Estos átomos salen disparados, creando un empuje constante en el tiempo.",
      "Si quisiéramos empujar naves del tamaño de un Destructor Estelar, usaríamos velas solares o propulsión nuclear. Una vela solar despliega espejos gigantescos para capturar la presión de los fotones provenientes de una estrella. Esto empujaría la nave sin usar combustible interno.",
      "El proyecto DRACO de la NASA y DARPA busca crear un cohete de propulsión térmica nuclear. Este cohete usará un reactor de fisión nuclear para calentar hidrógeno líquido y dispararlo a gran velocidad. Este salto tecnológico podría llevar a los humanos a Marte en solo 45 días."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Las cazas TIE del Imperio reciben su nombre del acrónimo en inglés "Twin Ion Engine". Esto demuestra cómo la física y propulsión científica real inspiró el diseño original de estas naves icónicas en Star Wars.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'La sonda espacial Dawn, impulsada por propulsión iónica, logró ser la primera nave en orbitar dos cuerpos celestes distintos. Primero visitó el asteroide Vesta y luego el planeta enano Ceres, ubicados en el cinturón de asteroides.' 
      }
    ],
    fact: 'El empuje producido por los motores iónicos actuales es tan débil como el peso de un papel. Sin embargo, al operar continuamente en el vacío, pueden acelerar naves a más de 320,000 kilómetros por hora.'
  },
  {
    id: 'megaestructuras',
    title: 'Megaestructuras de Ingeniería',
    color: '#CE93D8',
    btnImage: '/assets/starwars/infographic_cruceros/btn_megaestructuras.png',
    image: '/assets/starwars/infographic_cruceros/hero_megaestructuras.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_megaestructuras.png',
    bannerCaption: 'Cilindros de O\'Neill y Esferas de Dyson: sueños de arquitectos del espacio.',
    content: [
      "Más allá de las naves tradicionales, los científicos han imaginado construir megaestructuras espaciales. Son construcciones de tamaño inmenso que podrían albergar a millones de personas. Contarían con ciudades espaciales, montañas artificiales y ecosistemas completos en el vacío sideral.",
      "En 1974, el físico Gerard O'Neill propuso los 'Cilindros de O'Neill'. Estos serían hábitats formados por cilindros que medirían 8 kilómetros de ancho y 30 kilómetros de largo. Al hacer girar estos cilindros, la fuerza centrífuga crearía la ilusión de una gravedad terrestre en sus paredes internas.",
      "Una idea más ambiciosa es la 'Esfera de Dyson', propuesta por el físico Freeman Dyson en la década de 1960. Se trata de una estructura esférica de tamaño planetario que rodea a una estrella. Su objetivo es capturar cada rayo de luz y energía que la estrella emita.",
      "Si una civilización lograra construir una Esfera de Dyson alrededor del Sol, capturaría 400 trillones de vatios de energía. Esto sería suficiente para alimentar a una civilización interestelar. Ante este nivel de poder, incluso una Estrella de la Muerte parecería pequeña.",
      "Aunque construir estas megaestructuras excede nuestras capacidades actuales, estudiar estos conceptos empuja los límites de la ingeniería. Visionarios modernos como Jeff Bezos han citado los cilindros de O'Neill como una inspiración para el futuro de las colonias humanas en el sistema solar."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el canon de Star Wars, la Base Starkiller es una variación de una Esfera de Dyson. Absorbe de manera casi instantánea toda la energía de una estrella local para alimentar su superarma destructora de planetas.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En 2015, los astrónomos detectaron fluctuaciones en el brillo de la Estrella de Tabby. Se debatió la posibilidad de que una megaestructura alienígena estuviera bloqueando la luz estelar. Estudios posteriores indicaron que eran nubes de polvo interestelar.' 
      }
    ],
    fact: 'El principal obstáculo para construir una Esfera de Dyson no es obtener la energía, sino encontrar la materia bruta necesaria. Esto obligaría a desmantelar planetas enteros como Júpiter y Mercurio.'
  },
  {
    id: 'mineria',
    title: 'Minería de Asteroides',
    color: '#FFD54F',
    btnImage: '/assets/starwars/infographic_cruceros/btn_mineria.png',
    image: '/assets/starwars/infographic_cruceros/hero_mineria.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_mineria.png',
    bannerCaption: 'Extraer recursos en el espacio evitará la carga de lanzar materiales desde la Tierra.',
    content: [
      "Construir cruceros estelares o colonias orbitales enfrentaría un grave problema logístico: escapar de la gravedad terrestre. Lanzar un kilogramo de metal al espacio cuesta miles de dólares en combustible. Levantar las toneladas necesarias para un Destructor Estelar sería económicamente inviable.",
      "La solución audaz que los ingenieros tienen en mente es la minería de asteroides. En lugar de extraer metales en la Tierra y enviarlos hacia arriba, buscaremos riquezas minerales en el espacio. Hay asteroides ricos en elementos útiles orbitando entre los mundos rocosos.",
      "Para poner esto en perspectiva, el asteroide metálico Psyche 16 tiene casi 200 kilómetros de diámetro. La NASA lanzó una sonda en 2023 para estudiarlo. Contiene grandes cantidades de hierro, níquel y oro, con un valor estimado de 10,000 cuatrillones de dólares.",
      "Además de proveer metales, la minería espacial resolvería el problema del combustible. Muchos asteroides carbonáceos contienen agua congelada en su interior. Usando paneles solares, esa agua puede ser separada químicamente en oxígeno e hidrógeno, creando combustible para cohetes.",
      "En el futuro, naves industriales automatizadas se acoplarán a asteroides lejanos. Extraerán sus minerales usando impresoras 3D y robots, sin afectar el medioambiente terrestre. Esto sentará las bases industriales para la expansión de la civilización humana hacia el sistema solar."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio V, Han Solo navega el Halcón Milenario hacia un campo de asteroides caótico para evadir al Imperio. En nuestro sistema solar real, los asteroides están separados por distancias de cientos de miles de kilómetros.' 
      },
      { 
        label: '¿Sabías que...?', 
        icon: 'clock', 
        text: 'Varios asteroides han sido minados a nivel microscópico. Misiones como Hayabusa2 de JAXA y OSIRIS-REx de la NASA lograron aterrizar y recuperar polvo espacial de asteroides lejanos. Las muestras fueron traídas a la Tierra para su estudio.' 
      }
    ],
    fact: 'El Tratado del Espacio Exterior establece que ningún país puede reclamar la propiedad de los cuerpos celestes. Sin embargo, naciones como Estados Unidos han aprobado leyes que permiten a empresas privadas vender los recursos de los asteroides.'
  },
  {
    id: 'soporte-vital',
    title: 'Reciclar para Sobrevivir',
    color: '#81C784',
    btnImage: '/assets/starwars/infographic_cruceros/btn_soporte-vital.png',
    image: '/assets/starwars/infographic_cruceros/hero_soporte-vital.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_soporte-vital.png',
    bannerCaption: 'En el vacío, el agua y el oxígeno son tesoros valiosos.',
    content: [
      "En la ciencia ficción solemos centrarnos en los motores y disparos láser. Sin embargo, el sistema más importante en cualquier nave tripulada es el Sistema de Soporte Vital (ECLSS). Sin este equipo, los astronautas no podrían sobrevivir en el vacío del espacio.",
      "El agua limpia es pesada y costosa de transportar desde la Tierra en cohetes. Por eso, naves como la ISS utilizan sistemas de reciclaje extremo. Allí, el líquido se recicla casi a un 93%. El sudor y la orina se purifican para convertirse en agua potable.",
      "Para que los tripulantes respiren, el sistema de la ISS genera oxígeno fresco usando una reacción conocida como electrólisis. Esta tecnología utiliza electricidad de los paneles solares para romper las moléculas de agua en sus gases componentes: oxígeno e hidrógeno.",
      "Otro problema ambiental en lugares sellados es la acumulación de dióxido de carbono (CO2) cuando exhalamos. Si este gas se acumulara, asfixiaría a la tripulación. Para evitarlo, las naves emplean máquinas fregadoras y filtros químicos que eliminan el CO2 del aire.",
      "Para una nave del tamaño de un Destructor Estelar, que alberga a más de 37,000 personas, se necesitarían sistemas de soporte vital gigantes. Ocuparían el volumen de plantas de tratamiento terrestre, funcionando de manera continua en el cosmos sin presentar fallas."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio IV, Luke Skywalker vive en Tatooine, un planeta desértico. En su granja extraen humedad del aire utilizando altos vaporadores. Esta es una tecnología realista parecida a los recicladores de las naves espaciales.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Para resolver la purificación del aire a largo plazo, agencias como la ESA y la NASA están probando cultivar microalgas y plantas a bordo. Estas absorben el dióxido de carbono e inyectan oxígeno mediante la fotosíntesis natural.' 
      }
    ],
    fact: 'A pesar del reciclaje del 93%, la ISS aún requiere entregas de agua desde la Tierra. Para viajar a Marte, los ingenieros deberán desarrollar un sistema que recicle hasta un 98% de los fluidos de la tripulación.'
  },
  {
    id: 'gravedad',
    title: 'Creando Gravedad Artificial',
    color: '#64B5F6',
    btnImage: '/assets/starwars/infographic_cruceros/btn_gravedad.png',
    image: '/assets/starwars/infographic_cruceros/hero_gravedad.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_gravedad.png',
    bannerCaption: 'La microgravedad debilita los huesos; la rotación podría ser nuestra salvación.',
    content: [
      "En las películas, las tripulaciones caminan cómodamente por los pasillos de sus naves. Sin embargo, generar gravedad artificial es uno de los problemas físicos más complejos en la exploración espacial real.",
      "En la ISS, los astronautas viven en microgravedad. Aunque flotar parece divertido, la falta de peso causa daños en la fisiología humana. Produce pérdida de masa ósea, reduce el tejido muscular y altera el ritmo cardíaco. Los astronautas deben hacer ejercicio horas al día.",
      "La solución teórica más viable es la rotación. Para un viaje largo, podríamos construir anillos o cilindros en la nave. Al hacer girar esta estructura de forma constante, la inercia empujaría a las personas hacia las paredes.",
      "Esta técnica obligaría a los ocupantes hacia el exterior de la curva. Esa presión simularía la gravedad terrestre. Así, los astronautas caminarían sobre las paredes internas y protegerían su salud durante meses de viaje.",
      "Para generar una gravedad equivalente a la Tierra sin causar mareos, un anillo de 100 metros de radio tendría que girar a 3 revoluciones por minuto. Mantener ese movimiento requeriría un diseño preciso y energía constante."
    ],
    expandables: [
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En Star Wars, las naves utilizan placas de gravedad instaladas bajo el suelo para mantener a la tripulación firme, una tecnología irreal. En cambio, películas como "2001: Odisea del Espacio" muestran anillos giratorios que emplean la fuerza centrífuga.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'Sin la gravedad jalando hacia abajo, los fluidos corporales como la sangre se desplazan hacia la parte superior del cuerpo. Esto provoca que el rostro se hinche y que las piernas pierdan volumen, condición que la NASA monitorea.' 
      }
    ],
    fact: 'La fuerza de Coriolis en ambientes rotativos causaría que los objetos lanzados al aire describan trayectorias curvas. Esto podría desorientar a la tripulación hasta que logren adaptarse a la gravedad artificial.'
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
        ASTILLEROS &middot; PROPULSIÃ“N &middot; MEGAESTRUCTURAS
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
            <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <ExpandableSection key={i} data={exp} color={node.color} direction={DIRECTIONS[i % DIRECTIONS.length]} />
            ))}
          </div>
          
          {node.bannerImage && (
            <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
              <img src={node.bannerImage} alt={node.bannerCaption || ''} 
                   onClick={() => setLightboxSrc(node.bannerImage)} style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)', pointerEvents: 'none' }} />
              {node.bannerCaption && (
                <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                            fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                            textShadow: '0 1px 3px rgba(0,0,0,0.8)', pointerEvents: 'none' }}>
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
              {isLast ? 'COMPLETAR ENTRENAMIENTO' : 'SIGUIENTE LECCIÃ“N'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function InteractiveInfographic_SwSec8() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
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
          <h4 style={{ fontFamily: '"Oswald", sans-serif', color: '#AB47BC', marginTop: 0 }}>ðŸ“š Fuentes y Referencias Académicas</h4>
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
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      {/* ImageLightbox Â§15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
