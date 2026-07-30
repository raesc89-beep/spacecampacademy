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
    bannerCaption: 'La inmensidad del espacio requiere naves gigantescas para su exploraciÃ³n.',
    content: [
      "Â¿Te imaginas construir una ciudad flotante en la inmensidad del espacio exterior? En el asombroso universo de Star Wars, los majestuosos Destructores Estelares Imperiales miden aproximadamente 1,600 metros de largo, lo que equivale a mÃ¡s de 16 campos de fÃºtbol completos unidos. Para lograr semejante hazaÃ±a de ingenierÃ­a, el Imperio GalÃ¡ctico utiliza enormes y complejos astilleros orbitales donde miles de trabajadores y androides ensamblan estas naves directamente en el vacÃ­o del espacio, evitando el inmenso costo de levantar todo ese peso desde la superficie planetaria.",
      "En nuestro mundo real, la EstaciÃ³n Espacial Internacional (ISS) es la estructura artificial mÃ¡s grande, compleja y costosa que los seres humanos hemos logrado construir y mantener en Ã³rbita. Mide alrededor de 109 metros de punta a punta, lo que la hace apenas del tamaÃ±o de un solo campo de fÃºtbol. Aunque parezca diminuta al compararla con un imponente Destructor Estelar, la ISS es un absoluto milagro tecnolÃ³gico y un triunfo de la ingenierÃ­a humana que ha estado continuamente habitada por astronautas desde noviembre del aÃ±o 2000.",
      "Imagina que la ISS es como un gigantesco y costoso set de piezas de LEGO que flota a 408 kilÃ³metros sobre nuestras cabezas. Para construir este laboratorio espacial que pesa aproximadamente 420,000 kilogramos, se requiriÃ³ el enorme esfuerzo de 15 paÃ­ses diferentes y se necesitaron lanzar mÃ¡s de 40 misiones espaciales separadas. Cada mÃ³dulo presurizado, panel solar y brazo robÃ³tico tuvo que ser lanzado individualmente al espacio usando los poderosos Transbordadores Espaciales y cohetes rusos, para luego ser ensamblados cuidadosamente por astronautas en largas y peligrosas caminatas espaciales.",
      "Viajar en el espacio no es como manejar un automÃ³vil en la carretera; la ISS se mueve a la asombrosa velocidad de 27,600 kilÃ³metros por hora. A este ritmo vertiginoso, la estaciÃ³n completa una Ã³rbita alrededor de toda la Tierra cada 90 minutos. Esto significa que los valientes astronautas que viven allÃ­ arriba son testigos de 16 amaneceres y 16 atardeceres cada dÃ­a de 24 horas. Construir una nave del tamaÃ±o de un Destructor Estelar requerirÃ­a que nuestra civilizaciÃ³n humana diera un salto tecnolÃ³gico masivo hacia la industrializaciÃ³n y construcciÃ³n orbital a gran escala.",
      "El asombroso Ã©xito sostenido de la ISS nos demuestra empÃ­ricamente que la colaboraciÃ³n internacional masiva puede lograr lo que parecÃ­a ciencia ficciÃ³n hace apenas unas dÃ©cadas. En el brillante futuro de la exploraciÃ³n espacial, la humanidad inevitablemente utilizarÃ¡ las valiosas lecciones aprendidas en la construcciÃ³n y mantenimiento de la EstaciÃ³n Espacial Internacional para diseÃ±ar, ensamblar y pilotar autÃ©nticas y colosales naves interplanetarias que algÃºn dÃ­a nos llevarÃ¡n sanos y salvos a las distantes estrellas y planetas inexplorados de nuestra VÃ­a LÃ¡ctea."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio IV: Una Nueva Esperanza, vemos por primera vez un colosal Destructor Estelar Imperial persiguiendo a la diminuta nave rebelde Tantive IV. Esta famosa toma inicial fue diseÃ±ada especÃ­ficamente para mostrar el abrumador poder y el tamaÃ±o titÃ¡nico del Imperio GalÃ¡ctico, estableciendo visualmente que sus recursos industriales y capacidades de construcciÃ³n en astilleros orbitales como los de Kuat superan por mucho a cualquier otra facciÃ³n, permitiÃ©ndoles fabricar gigantescas flotas de guerra para controlar toda la galaxia.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La EstaciÃ³n Espacial Internacional (ISS) no estÃ¡ totalmente libre de la fuerza de gravedad; en realidad, se encuentra en un constante estado de caÃ­da libre perpetua alrededor del planeta Tierra. Debido a que se mueve hacia adelante a una increÃ­ble velocidad de 7.6 kilÃ³metros por segundo, la curvatura de la Tierra cae por debajo de ella al mismo ritmo que la estaciÃ³n cae hacia el suelo, lo que crea el famoso efecto de ingravidez o microgravedad que experimentan diariamente los astronautas a bordo.' 
      }
    ],
    fact: 'La EstaciÃ³n Espacial Internacional es el objeto artificial mÃ¡s caro jamÃ¡s construido por el ser humano, con un costo total estimado en mÃ¡s de 150 mil millones de dÃ³lares. Flota a mÃ¡s de 400 kilÃ³metros de altura y es visible desde la Tierra a simple vista como una estrella brillante que se mueve rÃ¡pidamente cruzando el cielo nocturno.'
  },
  {
    id: 'materiales',
    title: 'Supermateriales del Futuro',
    color: '#B0BEC5',
    btnImage: '/assets/starwars/infographic_cruceros/btn_materiales.png',
    image: '/assets/starwars/infographic_cruceros/hero_materiales.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_materiales.png',
    bannerCaption: 'Nuevas aleaciones y aerogeles permitirÃ¡n estructuras imposibles hoy.',
    content: [
      "Construir naves espaciales masivas requiere materiales extraordinarios que desafÃ­en los lÃ­mites de la fÃ­sica y la quÃ­mica conocidas. Si intentÃ¡ramos construir un Destructor Estelar gigante usando el acero tradicional que utilizamos para los barcos en la Tierra, serÃ­a tan pesado e ineficiente que requerirÃ­a una cantidad absurda e imposible de combustible solo para moverlo un poco. Es por esto que los verdaderos ingenieros aeroespaciales buscan incesantemente crear o descubrir supermateriales que sean extremadamente ligeros pero mÃ¡s resistentes que el diamante.",
      "Uno de los campeones modernos de la ingenierÃ­a espacial es la fibra de carbono. Imagina un material que estÃ¡ tejido meticulosamente como si fuera tela o ropa de altÃ­sima calidad, pero que resulta ser cinco veces mÃ¡s fuerte que el acero endurecido y pesa una pequeÃ±a fracciÃ³n del mismo. La fibra de carbono se fabrica entrelazando millones de hilos microscÃ³picos de carbono puros y luego endureciÃ©ndolos con resinas especiales, lo que la hace perfecta para construir los fuselajes de naves de Ãºltima generaciÃ³n y los gigantescos tanques de combustible de los cohetes modernos.",
      "Para proteger a las naves del infierno ardiente que experimentan al reingresar a la atmÃ³sfera terrestre y de las temperaturas extremas del vacÃ­o espacial, la NASA utiliza las asombrosas aleaciones de titanio. El titanio es un metal fascinante que no se corroe con el tiempo y mantiene su increÃ­ble fuerza estructural incluso cuando estÃ¡ sometido a temperaturas donde otros metales comunes simplemente se derretirÃ­an como si fueran mantequilla caliente o se quebrarÃ­an como frÃ¡giles cristales helados en el profundo frÃ­o del espacio profundo.",
      "AÃºn mÃ¡s sorprendentes son los modernos aerogeles, una clase asombrosa de materiales ultraligeros que los cientÃ­ficos suelen apodar con el poÃ©tico nombre de 'humo congelado'. Un aerogel estÃ¡ compuesto por mÃ¡s de un 99% de aire puro atrapado en una red tridimensional microscÃ³pica de sÃ­lice. A pesar de ser tan ligero que casi flota y apenas se siente al tocarlo, es uno de los mejores aislantes tÃ©rmicos jamÃ¡s inventados en la historia de la humanidad, capaz de proteger fÃ¡cilmente una delicada flor del intenso fuego directo de un soplete.",
      "En las futuras dÃ©cadas, el desarrollo de nanomateriales revolucionarios como el grafeno o los prometedores nanotubos de carbono, nos permitirÃ¡ manufacturar y ensamblar componentes para naves espaciales colosales. Estos materiales hiperavanzados no solo reducirÃ¡n dramÃ¡ticamente el inmenso costo de los lanzamientos al espacio al ser mucho mÃ¡s ligeros, sino que poseerÃ¡n la resistencia crÃ­tica necesaria para soportar los rigurosos impactos de micrometeoritos a altas velocidades y las tremendas fuerzas estructurales de un viaje interplanetario veloz y seguro."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el rico universo de Star Wars, los cascos y el fuerte blindaje de las naves espaciales, como las cazas estelares X-Wing y los imponentes Destructores, estÃ¡n forjados frecuentemente con aleaciones de supermateriales de ciencia ficciÃ³n como el famoso \'Duracero\' o el impenetrable \'Mandaloriano\' (Beskar). Estos materiales ficticios combinan milagrosamente una extrema ligereza con la capacidad de absorber de manera impecable el impacto tÃ©rmico directo de los potentes y letales disparos de armas blÃ¡ster y turbolÃ¡seres pesados.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El aerogel de sÃ­lice ostenta oficialmente el RÃ©cord Guinness Mundial como el material sÃ³lido mÃ¡s ligero jamÃ¡s creado en la Tierra. A pesar de que su densidad visual se asemeja bastante a un fantasma o a una nube congelada, un bloque de aerogel del tamaÃ±o de un ser humano pesa menos de medio kilogramo, pero es tan resistente que puede soportar estoicamente hasta 4,000 veces su propio peso antes de colapsar bajo la presiÃ³n mecÃ¡nicamente aplicada.' 
      }
    ],
    fact: 'El grafeno, descubierto empÃ­ricamente en 2004, estÃ¡ formado por una sola capa atÃ³mica de carbono. Es 200 veces mÃ¡s fuerte que el acero estructural, altamente flexible y el mejor conductor elÃ©ctrico a temperatura ambiente, perfilÃ¡ndose como el material clave para los cascos de las naves espaciales interplanetarias.'
  },
  {
    id: 'propulsion',
    title: 'Motores Estelares: QuÃ­mica a Iones',
    color: '#FFB74D',
    btnImage: '/assets/starwars/infographic_cruceros/btn_propulsion.png',
    image: '/assets/starwars/infographic_cruceros/hero_propulsion.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_propulsion.png',
    bannerCaption: 'La velocidad de la luz aÃºn estÃ¡ lejos, pero los motores iÃ³nicos ya son una realidad cientÃ­fica.',
    content: [
      "Para mover cualquier nave espacial, sin importar su tamaÃ±o, necesitas un avanzado y potente sistema de propulsiÃ³n. Imagina que viajas patinando sobre hielo y llevas en tus brazos una pesada bola de boliche; si lanzas repentinamente la bola con fuerza hacia adelante, tu cuerpo se deslizarÃ¡ forzosamente hacia atrÃ¡s debido a la fÃ­sica clÃ¡sica. AsÃ­ es exactamente como funciona el principio de acciÃ³n y reacciÃ³n en el espacio absoluto. Las naves tienen que arrojar masivamente gases u otras partÃ­culas a altÃ­simas velocidades para poder avanzar hacia su lejano destino final.",
      "La inmensa mayorÃ­a de los cohetes que usamos actualmente en la Tierra, como los poderosos cohetes Falcon 9 de la empresa SpaceX, utilizan motores de propulsiÃ³n quÃ­mica. Estos potentes motores funcionan mezclando violentamente y quemando enormes cantidades de un combustible (como el hidrÃ³geno lÃ­quido o el queroseno) con un potente oxidante (como el oxÃ­geno puro) en una cÃ¡mara de combustiÃ³n. Esto crea una masiva explosiÃ³n controlada dirigida hacia atrÃ¡s. Son fabulosos y muy necesarios para escapar de la aplastante gravedad terrestre, pero consumen demasiado combustible muy rÃ¡pidamente.",
      "Para los larguÃ­simos y lentos viajes interplanetarios de meses o aÃ±os, los ingenieros de la NASA y otras agencias han desarrollado con Ã©xito los llamados Motores IÃ³nicos. En lugar de utilizar grandes llamaradas y violentas explosiones quÃ­micas, un motor iÃ³nico utiliza energÃ­a solar o generadores elÃ©ctricos para cargar elÃ©ctricamente y acelerar Ã¡tomos pesados de un gas noble, usualmente XenÃ³n. Estos Ã¡tomos ionizados salen disparados del motor a velocidades increÃ­bles, creando un empuje fÃ­sico sumamente tenue pero extremadamente constante y eficiente en el tiempo.",
      "Si quisiÃ©ramos empujar naves del inmenso tamaÃ±o de una verdadera ciudad o de un Destructor Estelar a grandes fracciones de la velocidad de la luz, tal vez usarÃ­amos las poÃ©ticas y hermosas Velas Solares o incluso la propulsiÃ³n nuclear. Una vela solar no usa absolutamente ningÃºn combustible interno, sino que despliega espejos ultradelgados gigantescos para capturar literalmente la sutil presiÃ³n fÃ­sica y el empuje de las partÃ­culas de luz (fotones) provenientes de una estrella cercana o de lÃ¡seres gigantes apuntados desde la Tierra, empujando la nave sin fin.",
      "El asombroso proyecto DRACO, que actualmente estÃ¡n desarrollando en colaboraciÃ³n la agencia NASA y DARPA, tiene como principal objetivo cientÃ­fico crear y probar un potente cohete de propulsiÃ³n tÃ©rmica nuclear operativa para finales de esta misma dÃ©cada. Este avanzado cohete utilizarÃ¡ un pequeÃ±o reactor de fisiÃ³n nuclear para calentar eficientemente el hidrÃ³geno lÃ­quido a temperaturas extremas, expandiÃ©ndolo y disparÃ¡ndolo a enorme velocidad. Este salto tecnolÃ³gico crÃ­tico podrÃ­a llevar exitosamente a los humanos al distante planeta Marte en apenas 45 dÃ­as en lugar de esperar los 7 largos meses actuales."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el universo cinematogrÃ¡fico de Star Wars, las pequeÃ±as cazas estelares TIE Fighter utilizadas por el Imperio (las icÃ³nicas naves que tienen gigantescos paneles solares hexagonales a los lados) reciben exactamente su cÃ©lebre nombre del acrÃ³nimo tÃ©cnico en inglÃ©s "Twin Ion Engine" (Motor IÃ³nico Gemelo), demostrando explÃ­citamente cÃ³mo la verdadera fÃ­sica y propulsiÃ³n cientÃ­fica inspirÃ³ el diseÃ±o original de estas naves icÃ³nicas de George Lucas.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La exitosa sonda espacial de la NASA llamada Dawn, impulsada exclusivamente por la revolucionaria propulsiÃ³n iÃ³nica, logrÃ³ el increÃ­ble hito histÃ³rico de ser la primera y Ãºnica nave espacial robÃ³tica en orbitar dos cuerpos celestes distintos y distantes mÃ¡s allÃ¡ del sistema Tierra-Luna: primero el gran asteroide Vesta, y posteriormente el planeta enano Ceres en el frÃ­o cinturÃ³n de asteroides principal.' 
      }
    ],
    fact: 'El empuje fÃ­sico producido por los motores iÃ³nicos actuales es tan dÃ©bil como el peso de un papel en tu mano (unos pocos milinewtons). Sin embargo, al operar continuamente durante meses en el vacÃ­o absoluto sin fricciÃ³n, pueden acelerar naves a mÃ¡s de 320,000 kilÃ³metros por hora, batiendo todos los rÃ©cords.'
  },
  {
    id: 'megaestructuras',
    title: 'Megaestructuras de IngenierÃ­a',
    color: '#CE93D8',
    btnImage: '/assets/starwars/infographic_cruceros/btn_megaestructuras.png',
    image: '/assets/starwars/infographic_cruceros/hero_megaestructuras.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_megaestructuras.png',
    bannerCaption: 'Cilindros de O\'Neill y Esferas de Dyson: los sueÃ±os monumentales de los arquitectos del espacio.',
    content: [
      "MÃ¡s allÃ¡ de las naves espaciales tradicionales, los cientÃ­ficos, ingenieros y fÃ­sicos teÃ³ricos han soÃ±ado despiertos durante muchas dÃ©cadas con la construcciÃ³n de las llamadas Megaestructuras Espaciales. Estas son construcciones artificiales de un tamaÃ±o tan inmenso e incomprensible que podrÃ­an albergar a millones, o incluso a miles de millones, de seres humanos viviendo en confortables ciudades espaciales enteras, con montaÃ±as artificiales, lagos de agua dulce, sistemas climÃ¡ticos propios controlados y ecosistemas completos funcionando en el oscuro y frÃ­o vacÃ­o sideral.",
      "En el aÃ±o 1974, el brillante fÃ­sico de la Universidad de Princeton, Gerard O'Neill, propuso matemÃ¡ticamente la construcciÃ³n factible de los famosos 'Cilindros de O'Neill'. Estos serÃ­an hÃ¡bitats espaciales gigantescos formados por inmensos cilindros interconectados que medirÃ­an aproximadamente 8 kilÃ³metros de ancho y mÃ¡s de 30 kilÃ³metros de largo. Al hacer girar mecÃ¡nicamente y de forma continua estos inmensos cilindros sobre su propio eje longitudinal, la constante fuerza centrÃ­fuga generada crearÃ­a instantÃ¡neamente la mÃ¡gica ilusiÃ³n fÃ­sica de una gravedad terrestre perfecta en las paredes internas curvadas.",
      "Una idea incluso mucho mÃ¡s ambiciosa y alucinante que los cilindros espaciales es la legendaria 'Esfera de Dyson', imaginada detalladamente por el prestigioso fÃ­sico cuÃ¡ntico Freeman Dyson en la dÃ©cada de 1960. Imagina una megaestructura esfÃ©rica de tamaÃ±o planetario que rodea y envuelve completamente, o en gran parte, a una estrella anfitriona como nuestro Sol, con el asombroso y Ãºnico objetivo de capturar eficientemente cada pequeÃ±o rayo de luz, calor y energÃ­a electromagnÃ©tica que esta emita hacia el vasto universo que la rodea constantemente.",
      "Si una civilizaciÃ³n espacial muy avanzada lograra realmente construir una Esfera de Dyson completa alrededor del Sol, capturarÃ­a la asombrosa y gigantesca cantidad de casi 400 trillones de vatios de energÃ­a continua y totalmente limpia. Esto serÃ­a, literalmente, suficiente energÃ­a tÃ©rmica y elÃ©ctrica disponible para alimentar cÃ³modamente a una mega-civilizaciÃ³n interestelar miles de millones de veces mÃ¡s grande y avanzada tecnolÃ³gicamente que la nuestra. Ante este nivel casi divino de poder, incluso una colosal y letal Estrella de la Muerte parecerÃ­a un simple juguete.",
      "Aunque por el momento construir cualquiera de estas inmensas megaestructuras excede ampliamente nuestras actuales capacidades industriales, econÃ³micas y tecnolÃ³gicas modernas, estudiar con profundo detalle estos conceptos futuristas empuja agresivamente los lÃ­mites de nuestra creatividad tÃ©cnica e ingenieril y nos prepara mentalmente. El propio visionario espacial moderno, Jeff Bezos, ha citado a menudo los cilindros de O'Neill como una inspiraciÃ³n directa y fundamental para el futuro a largo plazo de los asentamientos y colonias de la humanidad trabajando armÃ³nicamente en el sistema solar."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el canon oficial de Star Wars, la inmensa, amenazante y aterradora Base Starkiller (vista en el Episodio VII: El Despertar de la Fuerza) es, en tÃ©rminos cientÃ­ficos y de ingenierÃ­a, una perversa y letal variaciÃ³n extrema de una megaestructura del tipo Esfera de Dyson. Absorbe de manera monstruosa y casi instantÃ¡nea toda la energÃ­a vital y el plasma ardiente de una estrella local cercana para alimentar y potenciar de manera apocalÃ­ptica su superarma destructora de sistemas planetarios enteros.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'En el aÃ±o cientÃ­fico 2015, los atÃ³nitos astrÃ³nomos detectaron fuertes, errÃ¡ticas e inexplicables fluctuaciones y caÃ­das masivas en el brillo luminoso de la lejana Estrella de Tabby (KIC 8462852). Durante meses, la comunidad astronÃ³mica debatiÃ³ seriamente la exÃ³tica y emocionante posibilidad teÃ³rica de que una gigantesca megaestructura alienÃ­gena en plena construcciÃ³n estuviera bloqueando la luz estelar. Estudios detallados posteriores apuntaron a densas nubes de polvo interestelar oscuro.' 
      }
    ],
    fact: 'El principal obstÃ¡culo fÃ­sico para construir una esfera de Dyson no es obtener la energÃ­a necesaria, sino encontrar y extraer la cantidad absurda de materia bruta y minerales de construcciÃ³n que se requerirÃ­an, lo que obligarÃ­a a desmantelar completamente planetas gaseosos o rocosos enteros como JÃºpiter y Mercurio.'
  },
  {
    id: 'mineria',
    title: 'MinerÃ­a de Asteroides',
    color: '#FFD54F',
    btnImage: '/assets/starwars/infographic_cruceros/btn_mineria.png',
    image: '/assets/starwars/infographic_cruceros/hero_mineria.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_mineria.png',
    bannerCaption: 'Extraer recursos en el espacio evitarÃ¡ la enorme carga de lanzar materiales desde la Tierra.',
    content: [
      "Construir flotas de cruceros estelares gigantescos o inmensas colonias orbitales enfrentarÃ­a rÃ¡pidamente un gravÃ­simo problema logÃ­stico y financiero: escapar de la profunda y fuerte pozo gravitatorio de la Tierra. Hoy en dÃ­a, lanzar incluso un solo kilogramo de metal pesado al espacio exterior cuesta miles de dÃ³lares en costoso combustible quÃ­mico especializado y complejas operaciones de ingenierÃ­a. Imagina cuÃ¡nto dinero y energÃ­a se requerirÃ­a para levantar las millones de toneladas necesarias para un colosal Destructor Estelar. SerÃ­a, en tÃ©rminos prÃ¡cticos, algo econÃ³micamente inviable para nosotros.",
      "La ingeniosa y audaz soluciÃ³n que los ingenieros visionarios tienen en mente para superar este pesado obstÃ¡culo terrestre se llama: MinerÃ­a de Asteroides. En lugar de extraer los metales de las profundidades de nuestras montaÃ±as y enviarlos fatigosamente hacia arriba, la humanidad irÃ¡ a buscar las inmensas riquezas minerales que estÃ¡n esperando intactas allÃ¡ arriba, flotando pacÃ­ficamente y sin dueÃ±o, en forma de grandes asteroides y cometas primordiales ricos en elementos Ãºtiles orbitando silenciosamente entre los frÃ­os mundos rocosos.",
      "Para poner esto en perspectiva cientÃ­fica, imagina al extraordinario asteroide metÃ¡lico llamado Psyche 16, una inmensa y oscura roca espacial metÃ¡lica de casi 200 kilÃ³metros de diÃ¡metro orbitando mas allÃ¡ de Marte. La NASA lanzÃ³ una costosa sonda de exploraciÃ³n en 2023 exclusivamente para estudiarlo detalladamente porque, segÃºn estimaciones conservadoras, contiene suficientes cantidades de hierro puro, nÃ­quel y oro valioso como para ser valorado en la inimaginable e irreal cifra de aproximadamente 10,000 cuatrillones de dÃ³lares terrestres.",
      "AdemÃ¡s de proveernos de metales pesados increÃ­blemente Ãºtiles para la masiva y pesada construcciÃ³n de infraestructuras orbitales duraderas, la minerÃ­a espacial resolverÃ­a brillantemente el mayor problema crÃ­tico del viaje profundo e interplanetario: el preciado combustible lÃ­quido de propulsiÃ³n. Muchos asteroides oscuros, de tipo C (carbonÃ¡ceos), contienen abundante agua (H2O) congelada en su interior. Usando energÃ­a de paneles solares, esa agua pura puede ser separada quÃ­micamente en sus componentes bÃ¡sicos, creando el combustible para los cohetes espaciales.",
      "En un futuro a largo plazo, las gigantescas naves espaciales industriales que funcionarÃ¡n como avanzadas refinerÃ­as automatizadas voladoras, se acoplarÃ¡n suavemente a oscuros asteroides a millones de kilÃ³metros de la Tierra. ExtraerÃ¡n sus minerales preciosos usando enjambres robÃ³ticos e impresoras 3D masivas sin afectar en absoluto el delicado medioambiente terrestre, sentando asÃ­ las robustas bases industriales inagotables para una expansiÃ³n pacÃ­fica, sustentable y grandiosa de la audaz civilizaciÃ³n humana hacia el lejano sistema solar profundo y mÃ¡s allÃ¡."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el emocionante e intenso Episodio V: El Imperio Contraataca, el piloto Han Solo navega con maestrÃ­a casi suicida la famosa y destartalada nave HalcÃ³n Milenario directamente hacia un letal y turbulento campo de grandes asteroides caÃ³ticos para evadir eficazmente a sus enfurecidos perseguidores del Imperio. En nuestro verdadero sistema solar pacÃ­fico, los densos asteroides estÃ¡n, afortunadamente para las naves espaciales y los pilotos, separados generalmente por distancias inmensas de cientos de miles de kilÃ³metros vacÃ­os entre sÃ­.' 
      },
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'clock', 
        text: 'Varios asteroides clasificados como Cercanos a la Tierra (NEAs por sus siglas en inglÃ©s astronÃ³mico) han sido minados en la historia real pero de forma microscÃ³pica. Las exitosas e increÃ­bles misiones robÃ³ticas internacionales conocidas como Hayabusa2 de la agencia japonesa JAXA y OSIRIS-REx de la NASA estadounidense lograron aterrizar efÃ­meramente y recuperar con Ã©xito gramos de preciosas rocas prÃ­stinas y rico polvo primordial espacial de asteroides lejanos, y las trajeron a la Tierra ilesas para estudio cientÃ­fico minucioso.' 
      }
    ],
    fact: 'El Tratado del Espacio Exterior firmado por Naciones Unidas establece que ningÃºn paÃ­s puede reclamar la propiedad soberana de los cuerpos celestes. Sin embargo, naciones como Estados Unidos y Luxemburgo ya aprobaron polÃ©micas leyes que legalmente permiten a empresas privadas ser dueÃ±as, explotar y vender los recursos de los asteroides.'
  },
  {
    id: 'soporte-vital',
    title: 'Reciclar para Sobrevivir',
    color: '#81C784',
    btnImage: '/assets/starwars/infographic_cruceros/btn_soporte-vital.png',
    image: '/assets/starwars/infographic_cruceros/hero_soporte-vital.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_soporte-vital.png',
    bannerCaption: 'En el vacÃ­o del cosmos, el agua limpia y el oxÃ­geno fresco son los tesoros mÃ¡s valiosos.',
    content: [
      "En las emocionantes pelÃ­culas y series de ciencia ficciÃ³n solemos centrarnos totalmente en los poderosos motores brillantes y en los ruidosos disparos de lÃ¡ser verde oscuro, pero el sistema tÃ©cnico mÃ¡s importante a bordo de absolutamente cualquier nave espacial tripulada por humanos no son sus temibles caÃ±ones, sino el sofisticado Sistema de Soporte Vital (ECLSS, por sus siglas en inglÃ©s). Sin este complejo equipo electromecÃ¡nico crÃ­tico, los delicados astronautas a bordo no podrÃ­an sobrevivir ni siquiera unos pocos minutos en el letal e implacable vacÃ­o del despiadado espacio exterior.",
      "El agua pura y limpia es extraordinariamente pesada y terriblemente costosa de transportar desde la Tierra en enormes cohetes, por lo que las verdaderas naves espaciales, como la moderna ISS, utilizan asombrosos sistemas de reciclaje extremo. En la actual EstaciÃ³n Espacial Internacional, el vital y valioso lÃ­quido se recicla casi a un increÃ­ble nivel del 93%. Â¡SÃ­, leÃ­ste bien! Incluso el sudor recolectado y hasta la orina de los astronautas se filtra minuciosamente, se purifica quÃ­micamente a niveles extremos y se vuelve a convertir rÃ¡pidamente en agua cristalina, limpia y completamente potable.",
      "Â¿Y cÃ³mo hacen exactamente para respirar los tripulantes sin asfixiarse allÃ­ arriba tan lejos de nuestro hogar azul? El complejo y costoso sistema de la ISS genera continuamente abundante oxÃ­geno fresco y limpio que inunda los pasillos utilizando una reacciÃ³n quÃ­mica controlada de laboratorio conocida como 'electrÃ³lisis'. Esta increÃ­ble tecnologÃ­a utiliza potente y constante electricidad generada por los extensos y masivos paneles solares para romper violentamente las molÃ©culas de agua purificada (H2O) en sus dos valiosos gases componentes originales y bÃ¡sicos: el oxÃ­geno puro para la vital respiraciÃ³n y el volÃ¡til hidrÃ³geno.",
      "El otro gran problema ambiental interno e invisible en los lugares sellados como los mÃ³dulos espaciales y submarinos es que, cada vez que exhalamos fuertemente el aire, producimos rÃ¡pidamente el letal gas de diÃ³xido de carbono (CO2). Si este insidioso y peligroso gas se acumulara sin interrupciÃ³n, intoxicarÃ­a y matarÃ­a a toda la pobre tripulaciÃ³n de forma asfixiante. Para evitar activamente esta tragedia invisible, las naves emplean avanzadas 'mÃ¡quinas fregadoras' o densos filtros quÃ­micos que capturan rÃ¡pidamente y eliminan eficientemente todo ese CO2 mortÃ­fero del aire circulante.",
      "Para una inmensa e intimidante nave interplanetaria militar del colosal tamaÃ±o de un Destructor Estelar, que alberga rutinariamente a mÃ¡s de 37,000 personas como su tripulaciÃ³n y tropas terrestres, necesitarÃ­as asombrosos sistemas de soporte vital gigantes que ocupen y consuman el volumen de ruidosas fÃ¡bricas terrestres enteras y complejas plantas de tratamiento urbano, funcionando silenciosamente las incansables 24 horas continuas de todos los largos dÃ­as en el lejano cosmos profundo, sin presentar ni una falla simple."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el icÃ³nico y trÃ¡gico principio original del famoso Episodio IV: Una Nueva Esperanza, el humilde joven granjero de humedad de arena y polvo estelar rubio, Luke Skywalker, reside monÃ³tonamente en una calurosa y rÃºstica finca granja especializada en el inhÃ³spito, calcinado y desÃ©rtico planeta arenoso binario llamado Tatooine. Trabajan Ã¡rduamente todo el largo dÃ­a bajo los ardientes soles dobles para extraer escasa humedad del caluroso aire ambiental Ã¡rido y rudo utilizando altos y anticuados vaporadores tecnolÃ³gicos; esto es puramente tecnologÃ­a realista parecida a recicladores.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Para resolver a largo plazo y de forma autosustentable el masivo problema de la constante purificaciÃ³n del pesado y enrarecido aire sucio viciado, la avanzada y optimista agencia europea ESA y la NASA de Estados Unidos estÃ¡n activamente probando con gran Ã©xito cultivar cuidadosamente minÃºsculas, microscÃ³picas e increÃ­bles microalgas fotosintÃ©ticas eficientes y plantas verdes a bordo, para que ellas milagrosamente absorban el letal gas venenoso e inyecten abundante, nutritivo y rico oxÃ­geno puro mediante biologÃ­a natural.' 
      }
    ],
    fact: 'A pesar del excelente sistema de reciclaje del 93%, los astronautas en la ISS aÃºn requieren entregas periÃ³dicas de agua desde la Tierra. Sin embargo, para viajar a Marte o a lunas mÃ¡s lejanas, los ingenieros espaciales necesitarÃ¡n desarrollar un sistema que recicle hasta un 98% de los fluidos biolÃ³gicos y ambientales de la tripulaciÃ³n.'
  },
  {
    id: 'gravedad',
    title: 'Creando Gravedad Artificial',
    color: '#64B5F6',
    btnImage: '/assets/starwars/infographic_cruceros/btn_gravedad.png',
    image: '/assets/starwars/infographic_cruceros/hero_gravedad.png',
    bannerImage: '/assets/starwars/infographic_cruceros/banner_gravedad.png',
    bannerCaption: 'La microgravedad prolongada debilita los huesos; la rotaciÃ³n podrÃ­a ser nuestra Ãºnica salvaciÃ³n biolÃ³gica.',
    content: [
      "En las pelÃ­culas de ciencia ficciÃ³n, las tripulaciones suelen caminar cÃ³modamente por los pasillos de sus naves, como si estuvieran en la Tierra. Sin embargo, generar gravedad artificial es uno de los problemas mÃ©dicos y fÃ­sicos mÃ¡s complejos y menos resueltos en la exploraciÃ³n espacial real.",
      "En la EstaciÃ³n Espacial Internacional (ISS), los astronautas viven en estado de microgravedad. Aunque flotar parece divertido, la falta de peso causa daÃ±os en la fisiologÃ­a humana: produce pÃ©rdida de masa Ã³sea, reduce el tejido muscular y altera el ritmo cardÃ­aco. Los astronautas deben hacer ejercicio horas al dÃ­a para mitigar estos efectos.",
      "La soluciÃ³n teÃ³rica mÃ¡s viable basada en la fÃ­sica clÃ¡sica es la rotaciÃ³n. Para un viaje interplanetario largo, podrÃ­amos construir enormes anillos o cilindros en la nave. Al hacer girar esta estructura de forma constante, la inercia empujarÃ­a a las personas hacia las paredes externas.",
      "Esta tÃ©cnica, basada en la fuerza centrÃ­fuga, obligarÃ­a a los ocupantes hacia el exterior de la curva. Esa presiÃ³n simularÃ­a la gravedad terrestre, permitiendo a los astronautas caminar sobre las paredes internas y protegiendo su salud Ã³sea y muscular durante meses de viaje.",
      "Para generar una gravedad equivalente a la de la Tierra sin causar mareos por la fuerza de Coriolis, un anillo de 100 metros de radio tendrÃ­a que girar a unas 3 revoluciones por minuto. Mantener ese movimiento requerirÃ­a un diseÃ±o mecÃ¡nico preciso y energÃ­a constante."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el universo de Star Wars, las naves utilizan placas de gravedad artificial instaladas bajo el suelo para mantener a la tripulaciÃ³n firme, una tecnologÃ­a que no existe en el mundo real. En cambio, pelÃ­culas como "2001: Odisea del Espacio" o "Interestelar" muestran anillos giratorios precisos que emplean la fuerza centrÃ­fuga real.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'Sin la gravedad jalando hacia abajo, los fluidos corporales de los astronautas, como la sangre, se desplazan hacia la parte superior del cuerpo. Esto provoca que el rostro se hinche temporalmente y que las piernas pierdan volumen y se adelgacen, una condiciÃ³n que la NASA monitorea de cerca.' 
      }
    ],
    fact: 'La fuerza de Coriolis, un efecto fÃ­sico en ambientes rotativos, causarÃ­a que los objetos lanzados al aire en una nave giratoria describan trayectorias curvas. Esto podrÃ­a desorientar a la tripulaciÃ³n hasta que logren adaptarse neurolÃ³gicamente a la gravedad artificial.'
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
          <h4 style={{ fontFamily: '"Oswald", sans-serif', color: '#AB47BC', marginTop: 0 }}>ðŸ“š Fuentes y Referencias AcadÃ©micas</h4>
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
