'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

/* =========================================================================
   1. DECORATIVE SVG COMPONENTS (Quantum Themed)
   ========================================================================= */

const DecoAtom = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(45 12 12)" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(-45 12 12)" stroke={color} strokeWidth="1.5" opacity="0.8"/>
    <circle cx="12" cy="12" r="2" fill={color} opacity="0.9"/>
  </svg>
);

const DecoWaveFunction = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M2 12C6 12 6 4 10 4C14 4 14 20 18 20C22 20 22 12 24 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
    <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
  </svg>
);

const DecoEntanglementSpiral = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7"/>
    <circle cx="8" cy="12" r="2" fill={color} opacity="0.9"/>
    <circle cx="16" cy="12" r="2" fill={color} opacity="0.9"/>
    <path d="M8 12C8 12 12 8 16 12" stroke={color} strokeWidth="1" opacity="0.6"/>
  </svg>
);

const DecoForceLightning = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.8"/>
    <path d="M15 4L7 12H13L12 18L19 10H14L15 4Z" stroke={color} strokeWidth="1" strokeLinejoin="round" opacity="0.4"/>
  </svg>
);

const DecoQubitOrbit = ({ size = 24, color = "currentColor", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    <ellipse cx="12" cy="12" rx="10" ry="3" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.8"/>
    <ellipse cx="12" cy="12" rx="3" ry="10" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.8"/>
    <circle cx="12" cy="12" r="1.5" fill={color}/>
    <circle cx="12" cy="2" r="2" fill={color} opacity="0.9"/>
  </svg>
);

const DECO_MAP = {
  'entrelazamiento-basico': [DecoEntanglementSpiral, DecoAtom],
  'epr-paradoja': [DecoAtom, DecoWaveFunction],
  'superposicion-cuantica': [DecoWaveFunction, DecoQubitOrbit],
  'teleportacion-cuantica': [DecoEntanglementSpiral, DecoForceLightning],
  'computacion-cuantica': [DecoQubitOrbit, DecoAtom],
  'no-localidad': [DecoEntanglementSpiral, DecoWaveFunction],
  'fuerza-universo': [DecoForceLightning, DecoQubitOrbit],
};

/* =========================================================================
   2. DATA & CONTENT
   ========================================================================= */

const BIBLIOGRAPHY = [
  "Einstein, A., Podolsky, B., & Rosen, N. (1935). 'Can Quantum-Mechanical Description of Physical Reality Be Considered Complete?'. Physical Review, 47(10), 777-780.",
  "Bell, J. S. (1964). 'On the Einstein Podolsky Rosen paradox'. Physics Physique Fizika, 1(3), 195-200.",
  "Aspect, A., Dalibard, J., & Roger, G. (1982). 'Experimental Test of Bell\\'s Inequalities Using Time-Varying Analyzers'. Physical Review Letters, 49(25), 1804-1807.",
  "SchrÃ¶dinger, E. (1935). 'Die gegenwÃ¤rtige Situation in der Quantenmechanik'. Naturwissenschaften, 23, 807-812.",
  "Bennett, C. H., et al. (1993). 'Teleporting an unknown quantum state via dual classical and Einstein-Podolsky-Rosen channels'. Physical Review Letters, 70(13), 1895-1899.",
  "Arute, F., et al. (2019). 'Quantum supremacy using a programmable superconducting processor'. Nature, 574(7779), 505-510."
];

const INFOGRAPHIC_NODES = [
  {
    id: 'entrelazamiento-basico',
    title: 'La Fuerza que Conecta Todo',
    color: '#B388FF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_entrelazamiento-basico.png',
    image: '/assets/starwars/infographic_fuerza/hero_entrelazamiento-basico.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_entrelazamiento-basico.png',
    bannerCaption: "RepresentaciÃ³n del entrelazamiento cuÃ¡ntico: dos partÃ­culas comparten estado instantÃ¡neamente sin importar la distancia.",
    content: [
      "Â¿Alguna vez has sentido una conexiÃ³n invisible con un amigo, sabiendo quÃ© piensa sin hablar? En la fÃ­sica, existe un fenÃ³meno real llamado 'entrelazamiento cuÃ¡ntico'. Ocurre cuando dos partÃ­culas subatÃ³micas interactÃºan y sus estados quedan vinculados. Lo que le sucede a una partÃ­cula afecta a la otra al instante, incluso si estÃ¡n separadas por aÃ±os luz en extremos opuestos del universo.",
      "Imagina que tienes dos dados mÃ¡gicos de seis caras. Si lanzas uno en la Tierra y sale un seis, el otro, en Marte, mostrarÃ¡ un seis al mismo tiempo. En los laboratorios, los cientÃ­ficos miden una propiedad llamada 'espÃ­n' en una partÃ­cula, y su gemela entrelazada adopta el estado opuesto instantÃ¡neamente, desafiando la fÃ­sica clÃ¡sica.",
      "Piensa en un par de guantes guardados en dos cajas separadas. Si abres una caja y encuentras el guante izquierdo, sabes de inmediato que la otra contiene el derecho. En el mundo cuÃ¡ntico, antes de abrir la caja, las partÃ­culas no tienen un estado definido. Solo al medirlas colapsan en una realidad fija.",
      "En el universo de Star Wars, los Jedi hablan de 'La Fuerza', un campo de energÃ­a que conecta todo. El entrelazamiento cuÃ¡ntico es lo mÃ¡s cercano que tenemos a esa conexiÃ³n en el mundo real. Sugiere que el universo no estÃ¡ hecho de piezas aisladas, sino de una red compleja donde la informaciÃ³n se relaciona a un nivel subatÃ³mico.",
      "CientÃ­ficos han verificado este fenÃ³meno utilizando pares de fotones, las partÃ­culas que componen la luz. Han separado estos fotones por cientos de kilÃ³metros mediante fibra Ã³ptica e incluso usando satÃ©lites desde el espacio. En cada prueba, la conexiÃ³n cuÃ¡ntica se mantuvo perfecta, demostrando que en el nivel subatÃ³mico, la distancia no es un obstÃ¡culo."
    ],
    expandables: [
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'Aunque nada material viaja mÃ¡s rÃ¡pido que la luz, la correlaciÃ³n entre dos partÃ­culas entrelazadas ocurre de forma instantÃ¡nea. Albert Einstein llamÃ³ a esto "acciÃ³n fantasmal a distancia", un misterio que ha fascinado a los fÃ­sicos por dÃ©cadas.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El fÃ­sico Erwin SchrÃ¶dinger acuÃ±Ã³ el tÃ©rmino "entrelazamiento" en 1935. Se dio cuenta de que no era solo un detalle de la mecÃ¡nica cuÃ¡ntica, sino la caracterÃ­stica principal que la separa de la fÃ­sica clÃ¡sica de Newton.' 
      },
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio VIII, Rey y Kylo Ren forman una "DÃ­ada en la Fuerza". Pueden hablar y verse a pesar de estar en planetas distintos. Esta conexiÃ³n es una metÃ¡fora del entrelazamiento cuÃ¡ntico, donde dos elementos estÃ¡n tan vinculados que parecen ignorar el espacio.' 
      }
    ],
    fact: 'El entrelazamiento cuÃ¡ntico es un fenÃ³meno comprobado en el que dos o mÃ¡s partÃ­culas quedan conectadas. El estado cuÃ¡ntico de una no puede describirse sin el de la otra, sin importar la distancia fÃ­sica que las separe.'
  },
  {
    id: 'epr-paradoja',
    title: 'La Paradoja EPR',
    color: '#00BCD4',
    btnImage: '/assets/starwars/infographic_fuerza/btn_epr-paradoja.png',
    image: '/assets/starwars/infographic_fuerza/hero_epr-paradoja.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_epr-paradoja.png',
    bannerCaption: "Albert Einstein, Boris Podolsky y Nathan Rosen propusieron en 1935 la paradoja EPR, cuestionando la mecÃ¡nica cuÃ¡ntica.",
    content: [
      "En 1935, Albert Einstein, Boris Podolsky y Nathan Rosen publicaron un documento que cuestionÃ³ los cimientos de la mecÃ¡nica cuÃ¡ntica. Este artÃ­culo se conoce como la 'Paradoja EPR' por las iniciales de sus autores. Einstein estaba incÃ³modo con la idea del entrelazamiento cuÃ¡ntico porque contradecÃ­a su TeorÃ­a de la Relatividad Especial, la cual establece que nada puede superar la velocidad de la luz.",
      "Einstein argumentaba que si el entrelazamiento fuera real e instantÃ¡neo, requerirÃ­a una 'acciÃ³n fantasmal a distancia'. Para Ã©l, el universo debÃ­a ser lÃ³gico y predecible. CreÃ­a que las partÃ­culas poseÃ­an informaciÃ³n oculta desde su origen, un concepto que llamÃ³ 'variables ocultas', las cuales los cientÃ­ficos aÃºn no podÃ­an detectar con las herramientas de la Ã©poca.",
      "Imagina a dos gemelos que se visten del mismo color todos los dÃ­as sin consultarse. Einstein dirÃ­a que no se comunican telepÃ¡ticamente por la maÃ±ana; mÃ¡s bien, acordaron en secreto usar ropa roja antes de separarse. SegÃºn su perspectiva, las partÃ­culas tenÃ­an instrucciones pre-programadas que daban la ilusiÃ³n de una conexiÃ³n instantÃ¡nea.",
      "En Star Wars, Han Solo dudaba del poder de la Fuerza, considerÃ¡ndola una serie de 'trucos baratos'. De manera similar, Einstein dudaba de la naturaleza aleatoria de la mecÃ¡nica cuÃ¡ntica. ExigÃ­a que el universo funcionara como una mÃ¡quina precisa, en lugar de depender de la probabilidad y la incertidumbre.",
      "Durante dÃ©cadas, la paradoja EPR fue solo un debate filosÃ³fico. ParecÃ­a imposible probar en un laboratorio si Einstein tenÃ­a razÃ³n con sus variables ocultas o si la teorÃ­a cuÃ¡ntica era correcta sobre la conexiÃ³n instantÃ¡nea. Sin embargo, este desacuerdo histÃ³rico impulsÃ³ el desarrollo de experimentos precisos para medir la naturaleza fundamental de la realidad."
    ],
    expandables: [
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'La frase "acciÃ³n fantasmal a distancia" fue usada por Einstein en una carta de 1947 dirigida a Max Born para criticar el entrelazamiento cuÃ¡ntico. Hoy en dÃ­a es uno de los tÃ©rminos mÃ¡s conocidos en fÃ­sica.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El artÃ­culo original de EPR, publicado en la revista Physical Review, sigue siendo uno de los documentos cientÃ­ficos mÃ¡s citados. Aunque buscaba demostrar fallas en la teorÃ­a cuÃ¡ntica, terminÃ³ inspirando descubrimientos reales.' 
      },
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el Episodio IV, el Almirante Motti se burla de la Fuerza llamÃ¡ndola "religiÃ³n antigua". Darth Vader le demuestra lo contrario asfixiÃ¡ndolo a distancia. Al igual que los efectos cuÃ¡nticos, hay fuerzas invisibles que tienen un impacto medible.' 
      }
    ],
    fact: 'La paradoja EPR de 1935 propuso que la mecÃ¡nica cuÃ¡ntica estaba incompleta y sugiriÃ³ la existencia de "variables ocultas locales" para explicar el comportamiento de las partÃ­culas mediante reglas clÃ¡sicas.'
  },
  {
    id: 'superposicion-cuantica',
    title: 'SuperposiciÃ³n: Ser Todo a la Vez',
    color: '#7C4DFF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_superposicion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_superposicion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_superposicion-cuantica.png',
    bannerCaption: "En mecÃ¡nica cuÃ¡ntica, una partÃ­cula puede existir en mÃºltiples estados simultÃ¡neamente hasta que es observada.",
    content: [
      "En el juego del escondite, no sabes si tu amigo estÃ¡ detrÃ¡s de la puerta o debajo de la cama hasta que lo encuentras. En el mundo microscÃ³pico, las partÃ­culas pueden estar en ambos lugares a la vez. A esto se le llama 'SuperposiciÃ³n CuÃ¡ntica'. Un electrÃ³n puede existir simultÃ¡neamente en estados contradictorios, como girar hacia arriba y hacia abajo, hasta el instante en que es medido.",
      "El experimento mental del 'Gato de SchrÃ¶dinger', propuesto en 1935, explica este concepto. Imagina un gato en una caja con un mecanismo radiactivo aleatorio. Antes de abrir la caja, la fÃ­sica cuÃ¡ntica establece que el gato estÃ¡ en una superposiciÃ³n: simultÃ¡neamente vivo y muerto. Solo la observaciÃ³n obliga a la realidad a definirse por un estado Ãºnico.",
      "Piensa en una moneda que gira rÃ¡pidamente en el aire. Mientras estÃ¡ en movimiento, no es ni 'cara' ni 'cruz', sino una mezcla de ambas posibilidades. Solo cuando la atrapas contra la mesa, lo que equivale a una mediciÃ³n en fÃ­sica cuÃ¡ntica, la moneda se detiene en un resultado definitivo.",
      "En Star Wars, el destino de Anakin Skywalker refleja una superposiciÃ³n emocional. Durante aÃ±os, Anakin luchÃ³ entre la luz de los Jedi y la oscuridad de los Sith. Ambas posibilidades coexistieron en su interior hasta que un evento clave lo obligÃ³ a tomar una decisiÃ³n, colapsando su destino y transformÃ¡ndolo en Darth Vader.",
      "Los fÃ­sicos cuÃ¡nticos utilizan herramientas matemÃ¡ticas llamadas 'funciones de onda' para calcular estas posibilidades. Estas ecuaciones no indican la ubicaciÃ³n exacta de una partÃ­cula, sino que ofrecen un mapa de probabilidades. Dominar la superposiciÃ³n es fundamental para desarrollar tecnologÃ­as modernas como las computadoras cuÃ¡nticas."
    ],
    expandables: [
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'El concepto de que el acto de medir un sistema cambia su estado se conoce como el "Efecto del Observador". Es uno de los principios mÃ¡s estudiados en la mecÃ¡nica cuÃ¡ntica.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El Experimento de la Doble Rendija demuestra la superposiciÃ³n. Al disparar electrones hacia una pared con dos ranuras, cada partÃ­cula pasa por ambas al mismo tiempo, creando un patrÃ³n de interferencia ondulatoria.' 
      },
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En el clÃ­max de El Retorno del Jedi, Darth Vader enfrenta una decisiÃ³n crÃ­tica. Sirve al Emperador pero tambiÃ©n quiere salvar a su hijo. Esta doble existencia colapsa en una Ãºnica realidad cuando decide actuar y derrotar al Emperador.' 
      }
    ],
    fact: 'La superposiciÃ³n establece que un sistema subatÃ³mico existe simultÃ¡neamente en todos sus estados posibles hasta que es medido, lo que causa el colapso de su funciÃ³n de onda.'
  },
  {
    id: 'teleportacion-cuantica',
    title: 'TeletransportaciÃ³n CuÃ¡ntica',
    color: '#18FFFF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_teleportacion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_teleportacion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_teleportacion-cuantica.png',
    bannerCaption: "La teleportaciÃ³n cuÃ¡ntica transfiere estados cuÃ¡nticos entre partÃ­culas distantes usando entrelazamiento.",
    content: [
      "La teletransportaciÃ³n cuÃ¡ntica no mueve objetos fÃ­sicos de un lugar a otro como ocurre en la ciencia ficciÃ³n. En los laboratorios reales, los cientÃ­ficos teletransportan informaciÃ³n cuÃ¡ntica, que es el conjunto de datos sobre cÃ³mo estÃ¡ estructurada una partÃ­cula. Usan el entrelazamiento cuÃ¡ntico para transferir el estado de un fotÃ³n de origen a otro en el destino.",
      "La materia sÃ³lida no viaja a travÃ©s del espacio. En lugar de transportar un Ã¡tomo fÃ­sico, se transfiere su identidad cuÃ¡ntica. Las propiedades exactas de la partÃ­cula original se copian en una partÃ­cula distante, asumiendo esta Ãºltima todas las caracterÃ­sticas de la primera de manera instantÃ¡nea.",
      "Imagina que construyes un castillo de bloques. En lugar de enviar los bloques por correo, usas un escÃ¡ner que lee el diseÃ±o, desarmando tu castillo en el proceso. EnvÃ­as las instrucciones a tu amigo, y sus propios bloques se ensamblan al instante en una copia idÃ©ntica del tuyo.",
      "En la Orden Jedi, la 'ProyecciÃ³n de la Fuerza' permite a un Jedi enviar una ilusiÃ³n realista de sÃ­ mismo a otro planeta. De forma similar, la teletransportaciÃ³n cuÃ¡ntica transfiere la informaciÃ³n de una partÃ­cula a travÃ©s del vacÃ­o, permitiendo que sus propiedades se manifiesten en otro lugar.",
      "Un principio fundamental en este proceso es el 'Teorema de No-ClonaciÃ³n'. Este dicta que es imposible hacer una copia exacta de un estado cuÃ¡ntico sin destruir el original. Por eso, al teletransportar la informaciÃ³n de una partÃ­cula, la partÃ­cula de origen pierde su identidad."
    ],
    expandables: [
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'En 2017, un equipo de cientÃ­ficos logrÃ³ teletransportar fotones desde la Tierra hasta el satÃ©lite Micius en el espacio, alcanzando una distancia rÃ©cord de mÃ¡s de 1.400 kilÃ³metros.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El protocolo de teletransportaciÃ³n cuÃ¡ntica fue propuesto en 1993 por un equipo liderado por Charles Bennett. Demostraron que la informaciÃ³n cuÃ¡ntica se puede reconstruir a distancia enviando solo dos bits clÃ¡sicos.' 
      },
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En Los Ãšltimos Jedi, Luke Skywalker utiliza la ProyecciÃ³n de la Fuerza en el planeta Crait. El esfuerzo de transmitir esta informaciÃ³n exige tanta energÃ­a que, en un paralelo al Teorema de No-ClonaciÃ³n, termina por consumir su cuerpo fÃ­sico.' 
      }
    ],
    fact: 'La teletransportaciÃ³n cuÃ¡ntica transfiere el estado exacto de una partÃ­cula a otra distante mediante entrelazamiento. El Teorema de No-ClonaciÃ³n impide duplicar la informaciÃ³n original, por lo que el estado de la primera partÃ­cula se destruye.'
  },
  {
    id: 'computacion-cuantica',
    title: 'Computadoras del Futuro',
    color: '#E040FB',
    btnImage: '/assets/starwars/infographic_fuerza/btn_computacion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_computacion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_computacion-cuantica.png',
    bannerCaption: "Los computadores cuÃ¡nticos utilizan qubits que procesan informaciÃ³n exponencialmente mÃ¡s rÃ¡pido que los bits clÃ¡sicos.",
    content: [
      "Las computadoras y los telÃ©fonos mÃ³viles utilizan un lenguaje binario basado en ceros y unos, conocidos como 'bits'. En este sistema clÃ¡sico, un interruptor electrÃ³nico puede estar apagado (0) o encendido (1), pero nunca ambas opciones al mismo tiempo.",
      "La computaciÃ³n cuÃ¡ntica introduce los 'qubits', o bits cuÃ¡nticos. Gracias a la superposiciÃ³n, un qubit puede representar un 0, un 1, o cualquier combinaciÃ³n de ambos de forma simultÃ¡nea. Esto se mantiene siempre y cuando el qubit no sea medido u observado.",
      "Imagina que estÃ¡s en un laberinto buscando la salida. Una computadora clÃ¡sica intentarÃ­a cada camino uno por uno hasta encontrar la puerta. Una computadora cuÃ¡ntica, en cambio, explora todos los caminos posibles al mismo tiempo, hallando la soluciÃ³n en una fracciÃ³n de segundo.",
      "En Star Wars, calcular rutas seguras a travÃ©s del hiperespacio requiere procesar millones de variables al instante. Evitar estrellas y asteroides a la velocidad de la luz exigirÃ­a la inmensa capacidad de cÃ¡lculo que promete la computaciÃ³n cuÃ¡ntica.",
      "Empresas como Google e IBM han construido las primeras computadoras cuÃ¡nticas en sus laboratorios. Estos equipos operan a temperaturas cercanas al cero absoluto, mÃ¡s frÃ­as que el espacio profundo, para proteger la informaciÃ³n de sus inestables qubits."
    ],
    expandables: [
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'En 2019, el procesador cuÃ¡ntico "Sycamore" de Google alcanzÃ³ la "supremacÃ­a cuÃ¡ntica" al resolver en 200 segundos un cÃ¡lculo que le habrÃ­a tomado miles de aÃ±os a una supercomputadora clÃ¡sica.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El mayor reto en la computaciÃ³n cuÃ¡ntica es la "decoherencia". Los qubits son frÃ¡giles y pueden perder su estado de superposiciÃ³n debido a variaciones mÃ­nimas de temperatura o vibraciones en el entorno.' 
      },
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En Una Nueva Esperanza, R2-D2 logra infiltrar la red de la Estrella de la Muerte en segundos. Para procesar cÃ³digos de seguridad a esa velocidad, un droide necesitarÃ­a procesadores con capacidades cuÃ¡nticas.' 
      }
    ],
    fact: 'La computaciÃ³n cuÃ¡ntica utiliza la superposiciÃ³n y el entrelazamiento para procesar datos. Mientras los bits clÃ¡sicos valen 0 o 1, los qubits mantienen estados de ambos valores simultÃ¡neamente.'
  },
  {
    id: 'no-localidad',
    title: 'ConexiÃ³n InstantÃ¡nea: No-Localidad',
    color: '#64FFDA',
    btnImage: '/assets/starwars/infographic_fuerza/btn_no-localidad.png',
    image: '/assets/starwars/infographic_fuerza/hero_no-localidad.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_no-localidad.png',
    bannerCaption: "La no-localidad cuÃ¡ntica permite que partÃ­culas entrelazadas se influyan mutuamente a cualquier distancia, demostrado por John Bell en 1964.",
    content: [
      "En el mundo cuÃ¡ntico, la distancia no limita la conexiÃ³n entre partÃ­culas. La 'no-localidad' es un principio comprobado que indica que eventos separados espacialmente pueden estar vinculados. PartÃ­culas entrelazadas se afectan mutuamente de inmediato sin que una seÃ±al fÃ­sica viaje entre ellas.",
      "Para resolver el debate de las variables ocultas propuesto por Einstein, el fÃ­sico John Bell diseÃ±Ã³ una prueba matemÃ¡tica en 1964. El 'Teorema de Bell' proporcionÃ³ las fÃ³rmulas para determinar si el universo funcionaba bajo reglas clÃ¡sicas predeterminadas o si la mecÃ¡nica cuÃ¡ntica era correcta.",
      "Imagina dos mÃ¡quinas de chicles conectadas. SegÃºn la fÃ­sica clÃ¡sica, ambas fueron cargadas con el mismo orden de colores predeterminado. La mecÃ¡nica cuÃ¡ntica plantea que los chicles no tienen color hasta que salen, y ambas mÃ¡quinas deciden instantÃ¡neamente producir un chicle rojo al mismo tiempo.",
      "Yoda enseÃ±a que el tamaÃ±o de los objetos y la distancia fÃ­sica no importan frente a la Fuerza. La Fuerza interconecta toda la galaxia sin limitaciones geogrÃ¡ficas, un concepto que funciona como paralelo a la no-localidad en la fÃ­sica cuÃ¡ntica.",
      "En 1982, el fÃ­sico Alain Aspect puso a prueba el Teorema de Bell. Usando detectores de fotones, confirmÃ³ que el universo no opera con variables ocultas locales. Esta comprobaciÃ³n de la 'acciÃ³n a distancia' le valiÃ³ el Premio Nobel de FÃ­sica en 2022."
    ],
    expandables: [
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'El principio de que las partes de un sistema entrelazado no pueden estudiarse de forma aislada se conoce como holismo cuÃ¡ntico. Refleja cÃ³mo ciertas propiedades solo existen en el sistema completo.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'El Premio Nobel de FÃ­sica 2022 fue otorgado a Alain Aspect, John Clauser y Anton Zeilinger. Se reconociÃ³ su trabajo experimental comprobando violaciones al Teorema de Bell con fotones entrelazados.' 
      },
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'En El Imperio Contraataca, Leia escucha telepÃ¡ticamente a Luke cuando Ã©l necesita ayuda. Esta conexiÃ³n instantÃ¡nea a larga distancia, sin transmisores, ilustra perfectamente el concepto de no-localidad.' 
      }
    ],
    fact: 'El Teorema de Bell de 1964 establece matemÃ¡ticamente que ninguna teorÃ­a de variables locales clÃ¡sicas puede explicar los resultados y correlaciones de la mecÃ¡nica cuÃ¡ntica.'
  },
  {
    id: 'fuerza-universo',
    title: 'La Fuerza del Universo Real',
    color: '#AA00FF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_fuerza-universo.png',
    image: '/assets/starwars/infographic_fuerza/hero_fuerza-universo.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_fuerza-universo.png',
    bannerCaption: "Las fuerzas fundamentales del universo â€” gravedad, electromagnetismo, nuclear fuerte y dÃ©bil â€” gobiernan toda la materia.",
    content: [
      "El espacio que existe entre las estrellas no es un vacÃ­o inerte. SegÃºn la fÃ­sica moderna, lo que consideramos espacio vacÃ­o estÃ¡ lleno de 'Campos CuÃ¡nticos'. Estos son mares invisibles de energÃ­a que vibran de manera continua en todo el universo.",
      "Estos campos energÃ©ticos se extienden por todo el cosmos. Las partÃ­culas fundamentales, como los electrones y fotones, son en realidad pequeÃ±as vibraciones u ondulaciones que surgen dentro de estos campos, de la misma forma en que una ola se eleva en el ocÃ©ano.",
      "Imagina un campo cuÃ¡ntico como la superficie tensa de un tambor. Cuando se le aporta energÃ­a, el parche vibra. De manera similar, cuando un campo cuÃ¡ntico se excita, da origen a una partÃ­cula material. Toda la materia es el resultado de la vibraciÃ³n de estos campos.",
      "Yoda describiÃ³ la Fuerza diciendo: 'La vida la crea, la hace crecer. Su energÃ­a nos rodea y nos une'. La fÃ­sica de campos sugiere algo parecido: no somos objetos aislados, sino nodos de energÃ­a interactuando dentro de un campo universal interconectado.",
      "El entrelazamiento y los campos cuÃ¡nticos muestran que el universo funciona como una red unificada. Todas las partÃ­culas y galaxias interactÃºan dentro de las mismas estructuras fundamentales. La ciencia demuestra que el cosmos es un sistema profundamente entrelazado."
    ],
    expandables: [
      { 
        label: 'Â¿SabÃ­as que...?', 
        icon: 'sparkles', 
        text: 'La misteriosa EnergÃ­a Oscura, responsable de acelerar la expansiÃ³n del universo, podrÃ­a estar directamente relacionada con la energÃ­a inherente del vacÃ­o cuÃ¡ntico.' 
      },
      { 
        label: 'Dato CientÃ­fico', 
        icon: 'atom', 
        text: 'En la TeorÃ­a CuÃ¡ntica de Campos, las partÃ­culas fundamentales como el bosÃ³n de Higgs no son esferas sÃ³lidas, sino excitaciones medibles dentro de su respectivo campo.' 
      },
      { 
        label: 'En la PelÃ­cula', 
        icon: 'zap', 
        text: 'Yoda le enseÃ±a a Luke: "Seres luminosos somos, no esta materia cruda". Esto resuena con la visiÃ³n cuÃ¡ntica, donde la base de la materia fÃ­sica es energÃ­a vibrando en campos invisibles.' 
      }
    ],
    fact: 'La TeorÃ­a CuÃ¡ntica de Campos demuestra que no existe un vacÃ­o absoluto. El universo estÃ¡ permeado por campos energÃ©ticos cuyas fluctuaciones dan origen a las partÃ­culas subatÃ³micas.'
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

const GalacticHeader = ({ nodes, activeId }) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: '"Oswald", sans-serif', 
        fontSize: '2.5rem', 
        fontWeight: 700, 
        color: '#E040FB',
        letterSpacing: '2px',
        margin: '0 0 0.5rem 0',
        textTransform: 'uppercase',
        textShadow: '0 2px 10px rgba(224, 64, 251, 0.4)'
      }}>
        CONEXIÃ“N CON LA FUERZA: ENTRELAZAMIENTO CUÃNTICO
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        FÃSICA CUÃNTICA &middot; SUPERPOSICIÃ“N &middot; NO-LOCALIDAD
      </h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
        {nodes.map(n => (
          <motion.div 
            key={n.id} 
            layoutId={n.id === activeId ? "activeDotSwSec4" : undefined}
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
  const DecoComp2 = DECO_MAP[node.id]?.[1] || DecoWaveFunction;
  
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
          
          <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#CFD8DC', marginTop: '1rem' }}>
            {node.content[2]}
          </p>

          {node.bannerImage && (
            <div style={{ margin: '2rem 0', borderRadius: '12px', overflow: 'hidden', border: `1px solid ${node.color}55` }}>
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

export default function InteractiveInfographic_SwSec4() {
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
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, backgroundImage: 'url(/assets/starwars/infographic_fuerza/bg_fuerza.png)', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />

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
              style={{ height: '100%', background: 'linear-gradient(90deg, #E040FB, #00BCD4)', boxShadow: '0 0 10px #00BCD4' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              style={{ marginTop: '2rem', background: 'linear-gradient(45deg, #7C4DFF, #18FFFF)', padding: '1.5rem 3rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1rem', color: '#FFF', fontWeight: 'bold', fontFamily: '"Oswald", sans-serif', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(124, 77, 255, 0.4)' }}
            >
              <img src="/assets/starwars/infographic_fuerza/badge_quantum.png" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              Â¡ENTRENAMIENTO CUÃNTICO COMPLETADO!
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
