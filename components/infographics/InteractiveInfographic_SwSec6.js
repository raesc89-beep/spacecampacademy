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
    bannerCaption: "El plasma es el cuarto estado de la materia y constituye mÃ¡s del 99% de la materia visible del universo.",
    content: [
      "Desde que somos muy pequeÃ±os en la escuela, nos enseÃ±an que la materia existe principalmente en tres estados comunes: sÃ³lido (como un bloque de hielo congelado), lÃ­quido (como el agua fresca que bebemos todos los dÃ­as) y gas (como el vapor invisible que sale de una olla hirviendo). Pero resulta que estos tres estados son en realidad una rareza increÃ­ble en la inmensidad del universo. El universo estÃ¡ dominado por un misterioso y fascinante cuarto estado.",
      "Este cuarto estado de la materia es lo que los cientÃ­ficos de todo el mundo llaman 'plasma'. Para crear plasma de manera artificial o natural, debes tomar un gas comÃºn y calentarlo a temperaturas tan increÃ­blemente extremas y altas que los Ã¡tomos mismos literalmente se rompen y se desarman por la violencia del calor. Cuando esto ocurre, los electrones, que son pequeÃ±Ã­simos, escapan de sus Ã¡tomos, creando una sopa hirviente y brillante llena de partÃ­culas cargadas de electricidad.",
      "Lo que hace al plasma tan especial y totalmente distinto de cualquier gas normal es que, debido a que estÃ¡ repleto de diminutas partÃ­culas cargadas elÃ©ctricamente vagando libremente por todas partes, responde y reacciona fuertemente a las fuerzas de los campos magnÃ©ticos y elÃ©ctricos. Si acercas un imÃ¡n verdaderamente poderoso a un gas normal, no ocurre absolutamente nada. Pero si acercas ese mismo imÃ¡n gigante a una nube de plasma ardiente, puedes moldearlo, empujarlo y atraparlo como si estuvieras moldeando plastilina brillante.",
      "Aunque el plasma suene a ciencia ficciÃ³n avanzada o parezca sacado exclusivamente de pelÃ­culas del futuro, lo vemos absolutamente todos los dÃ­as de nuestra vida. Nuestro sol abrasador, asÃ­ como todas y cada una de las millones de estrellas parpadeantes que puedes ver en el cielo nocturno despejado, son en realidad gigantescas e inmensas bolas giratorias de plasma supercaliente. Â¡De hecho, mÃ¡s del asombroso 99% de toda la materia visible en todo nuestro universo conocido estÃ¡ hecho enteramente de plasma!",
      "En el increÃ­ble y expansivo universo de Star Wars, los ingenieros galÃ¡cticos y los maestros Jedi han aprendido hace muchÃ­simo tiempo a manipular, estabilizar y controlar el impredecible plasma con una precisiÃ³n asombrosa. Las armas mÃ¡s icÃ³nicas, peligrosas y famosas, asÃ­ como los motores que permiten a las grandes naves cruceros viajar a travÃ©s de las infinitas estrellas, utilizan la maravillosa fÃ­sica de los plasmas como su principal fuente de funcionamiento."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En toda la Ã©pica y larguÃ­sima saga de pelÃ­culas de Star Wars, desde las precuelas hasta las secuelas, siempre vemos gigantescas y majestuosas instalaciones industriales galÃ¡cticas, como las refinerÃ­as de Naboo o la cÃ¡mara de congelaciÃ³n en Bespin, que estÃ¡n dedicadas a extraer, purificar y procesar plasma de los profundos nÃºcleos planetarios para usarlo como la fuente de combustible primordial de naves espaciales y ciudades.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'En nuestro propio y hermoso planeta Tierra, el plasma natural es bastante raro de observar directamente a nivel del suelo, pero sÃ­ existe de forma espectacular y destructiva: el nÃºcleo central de un relÃ¡mpago brillante durante una fuerte tormenta elÃ©ctrica es plasma puro alcanzando temperaturas asombrosamente altas, al igual que las mÃ¡gicas, danzantes y coloridas luces de las hermosas auroras boreales en los polos.' 
      },
      {
        label: 'Â¿SabÃ­as que...?',
        icon: 'sparkles',
        text: 'Los antiguos e icÃ³nicos televisores de pantalla plana que pesaban muchÃ­simo y que se volvieron muy populares a principios de los aÃ±os 2000 eran conocidos popularmente como "televisores de plasma" justamente porque en su interior tenÃ­an millones de minÃºsculas celdas o burbujas microscÃ³picas atrapadas entre dos gruesos paneles de cristal, las cuales se llenaban de verdaderos gases ionizados que brillaban intensamente para crear la imagen.'
      }
    ],
    fact: 'El plasma es cientÃ­ficamente el cuarto estado fundamental de la materia. Se forma cuando un gas se calienta a temperaturas tan sumamente extremas que sus Ã¡tomos se ionizan por completo, liberando sus electrones y transformÃ¡ndose en una mezcla gaseosa pero altamente conductora de electricidad y sensible al magnetismo.'
  },
  {
    id: 'sable-laser',
    title: 'Â¿Podremos Construir un Sable LÃ¡ser?',
    color: '#448AFF',
    btnImage: '/assets/starwars/infographic_plasmas/btn_sable_laser.png',
    image: '/assets/starwars/infographic_plasmas/hero_sable_laser.png',
    bannerImage: '/assets/starwars/infographic_plasmas/banner_sable_laser.png',
    bannerCaption: "La contenciÃ³n magnÃ©tica permite confinar plasma a millones de grados dentro de campos electromagnÃ©ticos toroidales.",
    content: [
      "El arma mÃ¡s elegante e icÃ³nica de un Caballero Jedi es, sin duda alguna, el sable de luz. Durante dÃ©cadas enteras, millones de niÃ±os y grandes cientÃ­ficos brillantes de todo el mundo han soÃ±ado con poder construir uno real. El problema fÃ­sico y tecnolÃ³gico con los verdaderos lÃ¡seres en nuestro universo es que la luz simplemente no se detiene a un metro de distancia. Si enciendes un lÃ¡ser real apuntando hacia el cielo abierto, el rayo de luz viaja infinitamente hacia el espacio sideral.",
      "AdemÃ¡s, la luz normal o la luz de un lÃ¡ser no choca fÃ­sicamente contra otra luz. Si cruzas los haces de luz brillante de dos linternas poderosas en la oscuridad, los rayos de luz simplemente pasan limpiamente uno a travÃ©s del otro sin hacer ningÃºn ruido de choque ni rebotar como lo hacen las famosas y Ã©picas espadas en los grandiosos combates de las pelÃ­culas. Entonces, para que un sable de luz sea posible en la vida real, no podrÃ­a estar hecho de simples y puros fotones de luz.",
      "AquÃ­ es exactamente donde entra la fÃ­sica avanzada de los plasmas. Los grandes cientÃ­ficos teÃ³ricos de la actualidad proponen y creen firmemente que, si algÃºn dÃ­a logrÃ¡ramos construir de verdad un sable de luz funcional, su brillante hoja letal no estarÃ­a compuesta de luz lÃ¡ser pura, sino de un fino, denso y letal chorro de plasma supercaliente, ardiendo intensamente a miles y miles de grados centÃ­grados, capaz de derretir gruesas puertas de metal blindado en un abrir y cerrar de ojos.",
      "Pero, Â¿cÃ³mo demonios evitamos que ese plasma ardiente se expanda peligrosamente, te queme las manos y queme todo el lugar de inmediato? La increÃ­ble respuesta cientÃ­fica estÃ¡ en un concepto tecnolÃ³gico llamado 'contenciÃ³n magnÃ©tica'. Como aprendimos antes, el plasma reacciona fuertemente a los imanes. La empuÃ±adura mecÃ¡nica del sable de luz tendrÃ­a que proyectar un poderosÃ­simo campo magnÃ©tico con forma de un largo tubo delgado e invisible.",
      "Este campo de fuerza magnÃ©tica actuarÃ­a como una especie de resistente botella invisible e inquebrantable, manteniendo el ardiente gas ionizado perfectamente confinado dentro de una hoja que mide exactamente un metro de largo. Cuando dos de estos hipotÃ©ticos e increÃ­bles sables de plasma magnÃ©tico chocaran fuertemente en un intenso duelo cuerpo a cuerpo, las fortÃ­simas y densas fuerzas magnÃ©ticas se repelerÃ­an y rebotarÃ­an espectacularmente entre sÃ­, creando ese caracterÃ­stico y electrizante choque letal."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el largometraje Episodio I: La Amenaza Fantasma, vemos al pacÃ­fico pero poderoso maestro Qui-Gon Jinn hundir profundamente su brillante sable de luz verde en las gigantescas y sÃºper blindadas puertas de metal puro de la nave FederaciÃ³n de Comercio. El metal grueso a su alrededor inmediatamente comienza a brillar de color naranja brillante, a burbujear y a derretirse en forma lÃ­quida espectacular, una clara demostraciÃ³n de las increÃ­bles temperaturas tÃ©rmicas de un plasma confinado.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'En la actualidad moderna, en muchas fÃ¡bricas industriales gigantes alrededor de todo el planeta Tierra, ya utilizamos cortadoras de arco de plasma reales. Estas potentes mÃ¡quinas industriales utilizan aire comprimido o gases especiales soplados a enormes e increÃ­bles velocidades que, al pasar por un potente arco elÃ©ctrico, se transforman velozmente en un mortÃ­fero rayo de plasma a casi 30,000 grados Celsius.' 
      },
      {
        label: 'Â¿SabÃ­as que...?',
        icon: 'sparkles',
        text: 'Un extraordinario grupo de intrÃ©pidos fÃ­sicos en la respetada Universidad de Harvard ha logrado un tremendo hito cientÃ­fico al hacer que puros fotones de luz (que normalmente jamÃ¡s tienen masa propia) logren interactuar, chocar y rebotar unos con otros, uniÃ©ndose y formando un tipo de "molÃ©cula de luz". A esta nueva forma exÃ³tica y muy extraÃ±a de materia luminosa la llamaron, en tono de broma seria, materia "sable de luz".'
      }
    ],
    fact: 'FÃ­sicamente, un sable lÃ¡ser real no podrÃ­a estar compuesto Ãºnicamente por luz, ya que los fotones no pueden detenerse a una distancia predeterminada. El modelo teÃ³rico mÃ¡s acertado propone un poderoso caÃ±Ã³n que emite plasma confinado hermÃ©ticamente en una robusta botella electromagnÃ©tica invisible.'
  },
  {
    id: 'blasters-energia',
    title: 'Blasters: Armas de EnergÃ­a Dirigida',
    color: '#FF6E40',
    btnImage: '/assets/starwars/infographic_plasmas/btn_blasters_energia.png',
    image: '/assets/starwars/infographic_plasmas/hero_blasters_energia.png',
    bannerImage: '/assets/starwars/infographic_plasmas/banner_blasters_energia.png',
    bannerCaption: "Los aceleradores de partÃ­culas impulsan iones a velocidades cercanas a la de la luz usando campos electromagnÃ©ticos.",
    content: [
      "En el universo galÃ¡ctico, los soldados de asalto y los contrabandistas como Han Solo no utilizan armas que disparan balas de metal convencionales. En su lugar, utilizan blasters. Cuando se dispara un blaster, lo que sale volando por el aire no es un pedazo sÃ³lido de plomo, sino un proyectil brillante de color rojo, verde o azul compuesto de energÃ­a.",
      "Aunque a menudo se les llama armas lÃ¡ser, si observas cuidadosamente las escenas de acciÃ³n, notarÃ¡s que los disparos del blaster viajan como rayos cortos. Se mueven lo suficientemente lento como para que el ojo humano pueda verlos cruzar la habitaciÃ³n. Â¡Un Jedi entrenado en la Fuerza puede incluso esquivarlos!",
      "La ciencia moderna nos indica que los blasters no pueden disparar lÃ¡seres reales de luz pura. La luz viaja a 300,000 kilÃ³metros por segundo y es invisible en el vacÃ­o. En realidad, los cientÃ­ficos sugieren que estas armas disparan grupos concentrados de plasma a alta temperatura, lo que explica su velocidad y visibilidad.",
      "Un blaster funcionarÃ­a ionizando un gas almacenado en su cargador con una fuerte descarga electromagnÃ©tica y luego disparÃ¡ndolo a travÃ©s de un acelerador de partÃ­culas en miniatura. El problema fÃ­sico en el mundo real es que estos cÃºmulos de plasma, sin un contenedor que los mantenga unidos, se disiparÃ­an y enfriarÃ­an rÃ¡pidamente en el aire.",
      "En la Tierra, ya se estÃ¡n desarrollando Armas de EnergÃ­a Dirigida (DEW). Sistemas grandes como el lÃ¡ser ATHENA se prueban montados en vehÃ­culos pesados para interceptar pequeÃ±os drones a distancia. Sin embargo, la tecnologÃ­a actual aÃºn no puede miniaturizar y comprimir toda esa energÃ­a en una pistola portÃ¡til como las que vemos en el cine."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio IV: Una Nueva Esperanza, durante las batallas en los pasillos, los disparos de blaster rebotan contra las paredes y dejan marcas de quemaduras y metal derretido. Esto evidencia que el daÃ±o es tÃ©rmico, producido por calor extremo, y no un impacto mecÃ¡nico tradicional.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'La Marina de los Estados Unidos ya ha instalado el Sistema de Armas LÃ¡ser (LaWS) en algunos buques. A diferencia del blaster cinematogrÃ¡fico de colores brillantes, el LaWS dispara un rayo infrarrojo completamente invisible al ojo humano y es silencioso.' 
      },
      {
        label: 'Â¿SabÃ­as que...?',
        icon: 'sparkles',
        text: 'Para crear el famoso sonido "pew-pew" de los blasters en la pelÃ­cula de 1977, el diseÃ±ador de sonido Ben Burtt golpeÃ³ los cables tensores de una torre de radio con una llave metÃ¡lica.'
      }
    ],
    fact: 'Los blasters de la ciencia ficciÃ³n se comportan como disparadores de grupos de partÃ­culas de plasma confinado, en lugar de verdaderos lÃ¡seres, ya que viajan mucho mÃ¡s lento que la velocidad de la luz.'
  },
  {
    id: 'escudos-deflectores',
    title: 'Escudos Deflectores: Â¿Son Posibles?',
    color: '#40C4FF',
    btnImage: '/assets/starwars/infographic_plasmas/btn_escudos_deflectores.png',
    image: '/assets/starwars/infographic_plasmas/hero_escudos_deflectores.png',
    bannerImage: '/assets/starwars/infographic_plasmas/banner_escudos_deflectores.png',
    bannerCaption: "Los escudos electromagnÃ©ticos deflectan partÃ­culas cargadas, similar a cÃ³mo la magnetosfera terrestre protege del viento solar.",
    content: [
      "Cuando el HalcÃ³n Milenario huye de destructores imperiales o atraviesa un campo de asteroides, los pilotos ordenan activar los escudos deflectores. En cuestiÃ³n de segundos, una cÃºpula de energÃ­a invisible recubre y protege la nave.",
      "Estos campos de fuerza tienen el poder de detener impactos directos de armas y el choque de rocas espaciales a alta velocidad. Los escudos absorben toda la energÃ­a cinÃ©tica entrante, protegiendo el casco metÃ¡lico de la nave sin sufrir abolladuras.",
      "Crear un escudo invisible que actÃºe como un muro de ladrillos contra objetos sÃ³lidos es casi imposible con nuestra fÃ­sica actual. Sin embargo, los ingenieros aeronÃ¡uticos estÃ¡n investigando conceptos que se acercan bastante a esta tecnologÃ­a de ciencia ficciÃ³n.",
      "La propuesta cientÃ­fica mÃ¡s realista se basa en la fÃ­sica de los plasmas y el electromagnetismo. Un sistema de protecciÃ³n real implicarÃ­a proyectar una capa de plasma extremadamente denso alrededor de un vehÃ­culo en fracciones de segundo.",
      "Cuando una onda de choque explosiva se acerca, este muro de gas sobrecalentado e ionizado podrÃ­a absorber y dispersar gran parte de la energÃ­a mediante interacciÃ³n electromagnÃ©tica, mitigando el impacto de forma similar a los escudos galÃ¡cticos."
    ],
    expandables: [
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio VI: El Retorno del Jedi, la segunda Estrella de la Muerte estÃ¡ protegida por un campo deflector masivo. Este escudo es proyectado desde un generador instalado en la superficie de la luna de Endor.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'En 2015, la compaÃ±Ã­a aeroespacial Boeing patentÃ³ un "MÃ©todo y sistema para la atenuaciÃ³n de ondas de choque mediante un arco electromagnÃ©tico". Es un paso teÃ³rico hacia los escudos de fuerza reales.' 
      },
      {
        label: 'Â¿SabÃ­as que...?',
        icon: 'sparkles',
        text: 'Existen "ventanas de plasma" en laboratorios de fÃ­sica de partÃ­culas. Utilizan un campo magnÃ©tico para contener una fina capa de plasma que separa el vacÃ­o del aire normal sin necesidad de usar un cristal sÃ³lido.'
      }
    ],
    fact: 'Los ingenieros investigan generadores de campos electromagnÃ©ticos que usan plasma ionizado para interceptar y dispersar ondas expansivas antes de que alcancen a los vehÃ­culos.'
  },
  {
    id: "fusion-nuclear",
    title: "FusiÃ³n Nuclear: La EnergÃ­a de las Estrellas",
    color: "#FF1744",
    btnImage: "/assets/starwars/infographic_plasmas/btn_fusion_nuclear.png",
    image: "/assets/starwars/infographic_plasmas/hero_fusion_nuclear.png",
    bannerImage: "/assets/starwars/infographic_plasmas/banner_fusion_nuclear.png",
    bannerCaption: "Los reactores tokamak confinan plasma a 150 millones de grados en forma toroidal para lograr la fusiÃ³n nuclear controlada.",
    content: [
      "Para que el temible Imperio GalÃ¡ctico pueda hacer saltar a sus pesados Destructores Estelares a travÃ©s del hiperespacio, se requiere una cantidad de energÃ­a brutal. Las fuentes de energÃ­a tradicionales, como el gas o los paneles solares, jamÃ¡s serÃ­an suficientes para mover una fortaleza del tamaÃ±o de una ciudad entera. La respuesta a este inmenso desafÃ­o tecnolÃ³gico se encuentra en dominar un proceso monumental llamado fusiÃ³n nuclear, que es exactamente el mismo motor natural que enciende a nuestro brillante Sol y a todas las demÃ¡s estrellas luminosas del firmamento nocturno.",
      "Imagina que tienes piezas de Lego esparcidas por toda tu habitaciÃ³n y decides unirlas con mucha fuerza para crear una figura nueva. En el corazÃ³n candente de nuestro Sol, a una temperatura sofocante de quince millones de grados Celsius y bajo una presiÃ³n aplastante de doscientas cincuenta mil millones de atmÃ³sferas, la gravedad junta violentamente Ã¡tomos de hidrÃ³geno. EspecÃ­ficamente, une dos tipos especiales de hidrÃ³geno llamados deuterio y tritio. Al fusionarse, estos se transforman en helio y liberan un destello cegador de energÃ­a pura durante el proceso.",
      "La meta cientÃ­fica mÃ¡s ambiciosa de nuestra era moderna es construir un \"sol embotellado\" aquÃ­ mismo en la Tierra. En Cadarache, Francia, treinta y cinco paÃ­ses estÃ¡n colaborando para construir el Reactor Termonuclear Experimental Internacional, conocido mundialmente como ITER. Este gigantesco proyecto de veintidÃ³s mil millones de dÃ³lares consiste en una mÃ¡quina colosal de veintitrÃ©s mil toneladas. Su nÃºcleo es un inmenso dispositivo llamado Tokamak, que tiene la forma exacta de una rosquilla de metal gigante diseÃ±ada para contener el fuego estelar.",
      "Dentro de este enorme Tokamak francÃ©s, el gas se calienta tanto que se convierte en plasma hirviente. Como ningÃºn material conocido en el universo puede soportar tocar algo tan ridÃ­culamente caliente sin derretirse al instante, los ingenieros utilizan una trampa invisible. Emplean imanes superconductores extremadamente potentes, enfriados a temperaturas glaciales, para crear un campo magnÃ©tico en forma de anillo. Este campo invisible sostiene el plasma flotando en el vacÃ­o, evitando que toque las paredes metÃ¡licas de la cÃ¡mara principal.",
      "El cinco de diciembre de dos mil veintidÃ³s, los cientÃ­ficos del National Ignition Facility en el Laboratorio Nacional Lawrence Livermore lograron un hito histÃ³rico espectacular. Usando rayos de luz ultraconcentrada, consiguieron por primera vez la \"igniciÃ³n\" de la fusiÃ³n. Introdujeron dos punto cero cinco megajulios de energÃ­a y lograron que la pequeÃ±a cÃ¡psula devolviera tres punto quince megajulios. Â¡Produjeron mÃ¡s energÃ­a de la que gastaron! Este avance nos acerca al sueÃ±o de tener electricidad completamente limpia e inagotable para iluminar todo el mundo."
    ],
    expandables: [
      { 
        label: "En la PelÃ­cula", 
        icon: "zap", 
        text: "En el complejo universo de Star Wars, los majestuosos e imponentes Destructores Estelares y las estaciones de batalla espaciales no funcionan con combustibles fÃ³siles, sino que obtienen su formidable poder destructivo de algo llamado reactores de hipermetria. Esta tecnologÃ­a de ciencia ficciÃ³n se basa conceptualmente en los principios reales de la fusiÃ³n nuclear, utilizando inmensas cÃ¡maras de contenciÃ³n magnÃ©tica para exprimir el plasma hasta que libera la energÃ­a equivalente a la de una pequeÃ±a estrella atrapada en la sala de mÃ¡quinas." 
      },
      { 
        label: "Dato CientÃ­fico", 
        icon: "atom", 
        text: "Para que la fusiÃ³n nuclear sea verdaderamente Ãºtil en nuestro planeta, necesitamos mantener el plasma contenido durante mucho tiempo. El colosal reactor ITER, actualmente en construcciÃ³n y pesando lo mismo que tres torres Eiffel juntas, estÃ¡ diseÃ±ado especÃ­ficamente para lograr producir quinientos megavatios de potencia de salida a partir de tan solo cincuenta megavatios de energÃ­a de entrada. Esto demostrarÃ¡ al mundo que la fusiÃ³n a gran escala es tecnolÃ³gicamente viable y sentarÃ¡ las bases para futuras centrales elÃ©ctricas comerciales que iluminarÃ¡n nuestras ciudades." 
      },
      {
        label: "Â¿SabÃ­as que...?",
        icon: "sparkles",
        text: "A diferencia de las peligrosas plantas nucleares tradicionales de fisiÃ³n que dividen Ã¡tomos pesados como el uranio y generan residuos tÃ³xicos durante milenios, un reactor de fusiÃ³n es inherentemente seguro. Si algo llega a fallar en la mÃ¡quina o el campo magnÃ©tico pierde estabilidad, el plasma simplemente se enfrÃ­a y la reacciÃ³n se apaga de inmediato en menos de un segundo, sin riesgo alguno de explosiones desastrosas o fugas radiactivas. AdemÃ¡s, el combustible principal se puede extraer fÃ¡cilmente del agua de mar comÃºn, garantizando reservas ilimitadas."
      }
    ],
    fact: "El deuterio, uno de los ingredientes fundamentales para encender la fusiÃ³n nuclear, es un tipo pesado de hidrÃ³geno que se encuentra de forma natural en nuestros vastos ocÃ©anos. Hay suficiente deuterio mezclado en el agua de mar de nuestro planeta Tierra para satisfacer por completo y sin interrupciones todas las inmensas necesidades energÃ©ticas de la humanidad moderna durante miles de millones de aÃ±os, ofreciendo una esperanza brillante para nuestro futuro."
  },
  {
    id: "rayos-ionicos",
    title: "CaÃ±ones de Iones y PropulsiÃ³n",
    color: "#2979FF",
    btnImage: "/assets/starwars/infographic_plasmas/btn_rayos_ionicos.png",
    image: "/assets/starwars/infographic_plasmas/hero_rayos_ionicos.png",
    bannerImage: "/assets/starwars/infographic_plasmas/banner_rayos_ionicos.png",
    bannerCaption: "Los motores iÃ³nicos aceleran gas xenÃ³n ionizado para generar empuje continuo, alcanzando velocidades de 90 km/s.",
    content: [
      "Cuando pensamos en batallas espaciales, normalmente imaginamos explosiones deslumbrantes que destruyen naves enemigas con fuego brillante y chispas voladoras. Sin embargo, en el helado y remoto planeta Hoth, los valientes rebeldes utilizaron un tipo diferente de armamento: el famoso caÃ±Ã³n de iones defensivo. En lugar de perforar el blindaje metÃ¡lico de los temibles Destructores Estelares, este enorme dispositivo azul disparaba relÃ¡mpagos concentrados diseÃ±ados para sobrecargar los delicados circuitos electrÃ³nicos y dejar las mÃ¡quinas totalmente apagadas y flotando a la deriva.",
      "En el mundo real de la ciencia contemporÃ¡nea, los iones no se usan tÃ­picamente para crear caÃ±ones destructivos, sino para impulsar pacÃ­ficamente nuestras naves robÃ³ticas a travÃ©s del silencioso vacÃ­o del sistema solar. La propulsiÃ³n iÃ³nica funciona despojando a los Ã¡tomos de un gas noble, como el xenÃ³n, de algunos de sus electrones. Al perder electrones, los Ã¡tomos adquieren una carga elÃ©ctrica positiva y se convierten en iones puros. Luego, la nave espacial utiliza rejillas electrificadas muy potentes para repeler estos iones y dispararlos velozmente hacia atrÃ¡s.",
      "Imagina que estÃ¡s sentado en una patineta y decides lanzar pesadas pelotas de baloncesto hacia atrÃ¡s con toda tu fuerza; la ley de la fÃ­sica harÃ¡ que tu cuerpo ruede lentamente hacia adelante. De manera muy similar, al expulsar el gas ionizado a velocidades vertiginosas de hasta ciento cuarenta mil kilÃ³metros por hora, el motor espacial genera un empuje suave pero increÃ­blemente constante. Aunque la fuerza inicial es tan leve como el peso de una simple hoja de papel sobre la palma de tu mano, en la ausencia de fricciÃ³n del espacio, este empuje continuo te harÃ¡ alcanzar velocidades rÃ©cord a lo largo de varios meses.",
      "La eficiencia asombrosa de estos sistemas modernos es lo que realmente fascina a los ingenieros espaciales. En la ingenierÃ­a de cohetes utilizamos un tÃ©rmino llamado impulso especÃ­fico para medir cuÃ¡nto rendimiento obtenemos por cada gota de combustible. Mientras que los ruidosos cohetes quÃ­micos tradicionales alcanzan un impulso especÃ­fico de trescientos a cuatrocientos cincuenta segundos, quemando toneladas de lÃ­quido en minutos, un silencioso motor iÃ³nico moderno puede lograr entre tres mil y doce mil segundos, permitiendo misiones interplanetarias muchÃ­simo mÃ¡s largas y econÃ³micas.",
      "Un ejemplo estelar de esta tecnologÃ­a fue la legendaria misiÃ³n Dawn de la NASA, que viajÃ³ valientemente por el cosmos desde el aÃ±o dos mil siete hasta el dos mil dieciocho. Utilizando sus tres innovadores motores iÃ³nicos, esta pequeÃ±a sonda logrÃ³ visitar, orbitar y estudiar detalladamente tanto al inmenso asteroide Vesta como al enigmÃ¡tico planeta enano Ceres. AdemÃ¡s de viajar por el espacio, los humanos aceleramos iones terrestres en gigantescas mÃ¡quinas subterrÃ¡neas, como el Gran Colisionador de Hadrones del CERN, donde los protones alcanzan el noventa y nueve punto noventa y nueve por ciento de la increÃ­ble velocidad de la luz."
    ],
    expandables: [
      { 
        label: "En la PelÃ­cula", 
        icon: "zap", 
        text: "En el comienzo de la inolvidable cinta El Imperio Contraataca, vemos a las fuerzas de la Alianza Rebelde disparando rÃ¡fagas esfÃ©ricas de plasma azul verdoso desde la frÃ­a superficie del planeta Hoth. Este disparo no pretendÃ­a destrozar al enemigo, sino que era una inteligente medida tÃ¡ctica. Al golpear la estructura del Destructor Estelar Imperial que bloqueaba su ruta de escape, la enorme oleada de partÃ­culas cargadas inutilizÃ³ temporalmente todos sus sistemas de navegaciÃ³n, computadoras y pantallas tÃ¡cticas, permitiendo a los transportes escapar a salvo." 
      },
      { 
        label: "Dato CientÃ­fico", 
        icon: "atom", 
        text: "Aunque los caÃ±ones de iones reales no existen como armas antiaÃ©reas, sÃ­ que construimos aceleradores de partÃ­culas extremadamente potentes para desentraÃ±ar los secretos del universo temprano. En la frontera entre Francia y Suiza, bajo tierra, se encuentra el Gran Colisionador de Hadrones. Esta colosal pista circular de veintisiete kilÃ³metros de circunferencia emplea campos magnÃ©ticos de altÃ­sima intensidad para acelerar haces de protones a energÃ­as incomprensibles antes de estrellarlos entre sÃ­, recreando condiciones que existieron apenas milisegundos despuÃ©s del Big Bang." 
      },
      {
        label: "Â¿SabÃ­as que...?",
        icon: "sparkles",
        text: "El rÃ©cord mundial continuo de funcionamiento de un motor espacial en la historia de la humanidad lo ostenta un avanzado propulsor de iones estadounidense llamado NEXT-C. Durante rigurosas pruebas de resistencia en un laboratorio especializado en nuestro planeta Tierra, este dispositivo electromagnÃ©tico funcionÃ³ sin detenerse durante mÃ¡s de cincuenta mil horas seguidas, lo que equivale a casi seis largos aÃ±os de encendido ininterrumpido. Este tipo de extrema durabilidad es exactamente lo que los humanos necesitamos para futuras misiones ambiciosas hacia el lejano planeta Marte."
      }
    ],
    fact: "El brillante gas de xenÃ³n es el principal ingrediente preferido por los cientÃ­ficos para alimentar motores iÃ³nicos espaciales debido a que sus Ã¡tomos son particularmente pesados en comparaciÃ³n con otros gases nobles. Al disparar partÃ­culas mÃ¡s pesadas por la parte trasera del motor, la nave obtiene un empujÃ³n mucho mÃ¡s fuerte hacia adelante por cada unidad de energÃ­a elÃ©ctrica consumida, maximizando el impulso especÃ­fico."
  },
  {
    id: "estrella-muerte",
    title: "La Estrella de la Muerte: SuperlÃ¡seres",
    color: "#FF9100",
    btnImage: "/assets/starwars/infographic_plasmas/btn_estrella_muerte.png",
    image: "/assets/starwars/infographic_plasmas/hero_estrella_muerte.png",
    bannerImage: "/assets/starwars/infographic_plasmas/banner_estrella_muerte.png",
    bannerCaption: "Los lÃ¡seres de alta potencia concentran fotones coherentes mediante cristales amplificadores para transferir energÃ­a a largas distancias.",
    content: [
      "La temible estaciÃ³n espacial esfÃ©rica conocida como la Estrella de la Muerte se convirtiÃ³ en el arma de terror definitiva del Imperio GalÃ¡ctico. Su gigantesco caÃ±Ã³n cÃ³ncavo podÃ­a disparar un haz de energÃ­a tan desmesuradamente poderoso que era capaz de aniquilar un planeta entero con un solo impacto, como tristemente lo demostrÃ³ al pulverizar el pacÃ­fico mundo de Alderaan. Esta asombrosa demostraciÃ³n de fuerza letal en la gran pantalla ha inspirado a generaciones de ingenieros Ã³pticos a estudiar meticulosamente hasta dÃ³nde pueden llegar realmente las capacidades tÃ©cnicas de la luz pura.",
      "Para comprender estos formidables rayos destructores, primero debemos explorar la verdadera ciencia que se esconde detrÃ¡s del fascinante acrÃ³nimo LASER, que en inglÃ©s significa \"AmplificaciÃ³n de Luz por EmisiÃ³n Estimulada de RadiaciÃ³n\". Fue inventado en el aÃ±o mil novecientos sesenta por el brillante fÃ­sico estadounidense Theodore Maiman. A diferencia de las bombillas comunes que emiten luz difusa en todas las direcciones de la habitaciÃ³n, un lÃ¡ser genera ondas de luz idÃ©nticas y perfectamente alineadas, permitiendo enfocar toda esa energÃ­a concentrada en un punto minÃºsculo a gran distancia sin perder potencia.",
      "Hoy en dÃ­a, las instalaciones de investigaciÃ³n lÃ¡ser mÃ¡s avanzadas del mundo pueden desatar fuerzas verdaderamente descomunales. El Laboratorio Nacional Lawrence Livermore en los Estados Unidos alberga una gigantesca instalaciÃ³n conocida como NIF, que maravilla a los expertos mundiales al disparar exactamente ciento noventa y dos lÃ¡seres independientes simultÃ¡neamente. Todos estos haces se combinan magistralmente en una esfera dorada diminuta, concentrando una brutal energÃ­a lumÃ­nica sobre un objetivo que tiene el tamaÃ±o exacto de la pequeÃ±a goma de borrar en la punta de tu lÃ¡piz.",
      "La potencia abrumadora de estas mÃ¡quinas es difÃ­cil de asimilar. Cuando el inmenso sistema del NIF se dispara a mÃ¡xima capacidad, entrega aproximadamente dos punto cero cinco megajulios de energÃ­a concentrada en apenas unas pocas milmillonÃ©simas de segundo. Durante ese pestaÃ±eo imperceptible, el complejo cientÃ­fico genera mÃ¡s poder momentÃ¡neo que toda la red elÃ©ctrica completa de los Estados Unidos. Esta tremenda hazaÃ±a tÃ©cnica se realiza para estudiar el candente corazÃ³n de las estrellas en miniatura y probar intrincadas teorÃ­as sobre materiales bajo presiones astronÃ³micas extremas.",
      "En el campo militar moderno, los lÃ¡seres tambiÃ©n estÃ¡n dando sus primeros y cautelosos pasos reales hacia la batalla. No destruyen planetas, pero sistemas defensivos contemporÃ¡neos como el caÃ±Ã³n HELIOS de sesenta kilovatios de la Armada estadounidense, o el preciso interceptor tÃ¡ctico Dragonfire del Reino Unido, ya son una clara realidad tÃ©cnica. Estas armas de precisiÃ³n utilizan luz invisible e intensa que calienta silenciosamente la delgada cubierta de drones o pequeÃ±os botes a gran distancia hasta fundir sus metales, deteniendo las rÃ¡pidas amenazas sin necesitar explosivos y sin hacer un ruido ensordecedor."
    ],
    expandables: [
      { 
        label: "En la PelÃ­cula", 
        icon: "zap", 
        text: "En el icÃ³nico Episodio Cuatro, los espectadores observan fascinados cÃ³mo ocho finos y vibrantes rayos luminosos verdes se encuentran en el centro geomÃ©trico del inmenso plato reflector de la estaciÃ³n espacial. AllÃ­, misteriosamente se fusionan en un Ãºnico superlÃ¡ser colosal y destructivo. La mitologÃ­a nos relata que esta temible hazaÃ±a Ã³ptica se logra canalizando inmensas corrientes elÃ©ctricas a travÃ©s de enormes y raros cristales Kyber, los mismos minerales mÃ­sticos sintonizados con la Fuerza que los nobles Caballeros Jedi utilizan cuidadosamente para construir sus emblemÃ¡ticos sables de luz." 
      },
      { 
        label: "Dato CientÃ­fico", 
        icon: "atom", 
        text: "Curiosamente, la ficciÃ³n cinematogrÃ¡fica anticipÃ³ una brillante tÃ©cnica de la fÃ­sica Ã³ptica real conocida hoy como la combinaciÃ³n coherente de haces. Para construir sistemas extremadamente poderosos y evitar que los espejos frÃ¡giles se derritan por el calor acumulado, los ingenieros modernos dividen el lÃ¡ser en mÃºltiples rayos independientes de baja intensidad. Justo antes de alcanzar su objetivo distante, estos haces separados convergen perfectamente sincronizados, multiplicando exponencialmente la fuerza total de su impacto sin destruir la delicada maquinaria de disparo interno." 
      },
      {
        label: "Â¿SabÃ­as que...?",
        icon: "sparkles",
        text: "A pesar del poder abrumador mostrado por la imponente Estrella de la Muerte en el cine, destruir fÃ­sicamente un planeta sÃ³lido del tamaÃ±o exacto de nuestra Tierra requerirÃ­a aproximadamente dos por diez a la treinta y dos julios de energÃ­a bruta. Para poner este nÃºmero ridÃ­culo en perspectiva mundana, necesitarÃ­as atrapar absolutamente toda la deslumbrante producciÃ³n energÃ©tica que emite nuestro Sol ininterrumpidamente durante una semana entera y soltarla instantÃ¡neamente en un solo destello cataclÃ­smico para lograr un nivel tan extremo de devastaciÃ³n planetaria."
      }
    ],
    fact: "El primer prototipo de lÃ¡ser funcional en la historia de la ciencia fue exitosamente creado utilizando un cilindro sintÃ©tico de rubÃ­ brillante que actuaba como nÃºcleo central cristalino. El investigador iluminÃ³ intensamente este material rojizo utilizando una potente lÃ¡mpara de destello en espiral muy parecida a los brillantes flashes que usaban las ruidosas cÃ¡maras fotogrÃ¡ficas antiguas de la Ã©poca."
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
        FÃSICA DE PLASMAS
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        SABLES LÃSER &middot; BLASTERS &middot; FUSIÃ“N
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
              Â¡ANÃLISIS DE PLASMA COMPLETADO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>


        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS HOLOCRÃ“N (BibliografÃ­a)</h3>
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
