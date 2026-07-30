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
  "Schrödinger, E. (1935). 'Die gegenwärtige Situation in der Quantenmechanik'. Naturwissenschaften, 23, 807-812.",
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
    bannerCaption: "Representación del entrelazamiento cuántico: dos partículas comparten estado instantáneamente sin importar la distancia.",
    content: [
      "¿Alguna vez has sentido una conexión invisible con un amigo, sabiendo qué piensa sin hablar? En la física, existe un fenómeno real llamado 'entrelazamiento cuántico'. Ocurre cuando dos partículas subatómicas interactúan y sus estados quedan vinculados. Lo que le sucede a una partícula afecta a la otra al instante, incluso si están separadas por años luz en extremos opuestos del universo.",
      "Imagina que tienes dos dados mágicos de seis caras. Si lanzas uno en la Tierra y sale un seis, el otro, en Marte, mostrará un seis al mismo tiempo. En los laboratorios, los científicos miden una propiedad llamada 'espín' en una partícula, y su gemela entrelazada adopta el estado opuesto instantáneamente, desafiando la física clásica.",
      "Piensa en un par de guantes guardados en dos cajas separadas. Si abres una caja y encuentras el guante izquierdo, sabes de inmediato que la otra contiene el derecho. En el mundo cuántico, antes de abrir la caja, las partículas no tienen un estado definido. Solo al medirlas colapsan en una realidad fija.",
      "En el universo de Star Wars, los Jedi hablan de 'La Fuerza', un campo de energía que conecta todo. El entrelazamiento cuántico es lo más cercano que tenemos a esa conexión en el mundo real. Sugiere que el universo no está hecho de piezas aisladas, sino de una red compleja donde la información se relaciona a un nivel subatómico.",
      "Científicos han verificado este fenómeno utilizando pares de fotones, las partículas que componen la luz. Han separado estos fotones por cientos de kilómetros mediante fibra óptica e incluso usando satélites desde el espacio. En cada prueba, la conexión cuántica se mantuvo perfecta, demostrando que en el nivel subatómico, la distancia no es un obstáculo."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'Aunque nada material viaja más rápido que la luz, la correlación entre dos partículas entrelazadas ocurre de forma instantánea. Albert Einstein llamó a esto "acción fantasmal a distancia", un misterio que ha fascinado a los físicos por décadas.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El físico Erwin Schrödinger acuñó el término "entrelazamiento" en 1935. Se dio cuenta de que no era solo un detalle de la mecánica cuántica, sino la característica principal que la separa de la física clásica de Newton.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio VIII, Rey y Kylo Ren forman una "Díada en la Fuerza". Pueden hablar y verse a pesar de estar en planetas distintos. Esta conexión es una metáfora del entrelazamiento cuántico, donde dos elementos están tan vinculados que parecen ignorar el espacio.' 
      }
    ],
    fact: 'El entrelazamiento cuántico es un fenómeno comprobado en el que dos o más partículas quedan conectadas. El estado cuántico de una no puede describirse sin el de la otra, sin importar la distancia física que las separe.'
  },
  {
    id: 'epr-paradoja',
    title: 'La Paradoja EPR',
    color: '#00BCD4',
    btnImage: '/assets/starwars/infographic_fuerza/btn_epr-paradoja.png',
    image: '/assets/starwars/infographic_fuerza/hero_epr-paradoja.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_epr-paradoja.png',
    bannerCaption: "Albert Einstein, Boris Podolsky y Nathan Rosen propusieron en 1935 la paradoja EPR, cuestionando la mecánica cuántica.",
    content: [
      "En 1935, Albert Einstein, Boris Podolsky y Nathan Rosen publicaron un documento que cuestionó los cimientos de la mecánica cuántica. Este artículo se conoce como la 'Paradoja EPR' por las iniciales de sus autores. Einstein estaba incómodo con la idea del entrelazamiento cuántico porque contradecía su Teoría de la Relatividad Especial, la cual establece que nada puede superar la velocidad de la luz.",
      "Einstein argumentaba que si el entrelazamiento fuera real e instantáneo, requeriría una 'acción fantasmal a distancia'. Para él, el universo debía ser lógico y predecible. Creía que las partículas poseían información oculta desde su origen, un concepto que llamó 'variables ocultas', las cuales los científicos aún no podían detectar con las herramientas de la época.",
      "Imagina a dos gemelos que se visten del mismo color todos los días sin consultarse. Einstein diría que no se comunican telepáticamente por la mañana; más bien, acordaron en secreto usar ropa roja antes de separarse. Según su perspectiva, las partículas tenían instrucciones pre-programadas que daban la ilusión de una conexión instantánea.",
      "En Star Wars, Han Solo dudaba del poder de la Fuerza, considerándola una serie de 'trucos baratos'. De manera similar, Einstein dudaba de la naturaleza aleatoria de la mecánica cuántica. Exigía que el universo funcionara como una máquina precisa, en lugar de depender de la probabilidad y la incertidumbre.",
      "Durante décadas, la paradoja EPR fue solo un debate filosófico. Parecía imposible probar en un laboratorio si Einstein tenía razón con sus variables ocultas o si la teoría cuántica era correcta sobre la conexión instantánea. Sin embargo, este desacuerdo histórico impulsó el desarrollo de experimentos precisos para medir la naturaleza fundamental de la realidad."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'La frase "acción fantasmal a distancia" fue usada por Einstein en una carta de 1947 dirigida a Max Born para criticar el entrelazamiento cuántico. Hoy en día es uno de los términos más conocidos en física.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El artículo original de EPR, publicado en la revista Physical Review, sigue siendo uno de los documentos científicos más citados. Aunque buscaba demostrar fallas en la teoría cuántica, terminó inspirando descubrimientos reales.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el Episodio IV, el Almirante Motti se burla de la Fuerza llamándola "religión antigua". Darth Vader le demuestra lo contrario asfixiándolo a distancia. Al igual que los efectos cuánticos, hay fuerzas invisibles que tienen un impacto medible.' 
      }
    ],
    fact: 'La paradoja EPR de 1935 propuso que la mecánica cuántica estaba incompleta y sugirió la existencia de "variables ocultas locales" para explicar el comportamiento de las partículas mediante reglas clásicas.'
  },
  {
    id: 'superposicion-cuantica',
    title: 'Superposición: Ser Todo a la Vez',
    color: '#7C4DFF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_superposicion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_superposicion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_superposicion-cuantica.png',
    bannerCaption: "En mecánica cuántica, una partícula puede existir en múltiples estados simultáneamente hasta que es observada.",
    content: [
      "En el juego del escondite, no sabes si tu amigo está detrás de la puerta o debajo de la cama hasta que lo encuentras. En el mundo microscópico, las partículas pueden estar en ambos lugares a la vez. A esto se le llama 'Superposición Cuántica'. Un electrón puede existir simultáneamente en estados contradictorios, como girar hacia arriba y hacia abajo, hasta el instante en que es medido.",
      "El experimento mental del 'Gato de Schrödinger', propuesto en 1935, explica este concepto. Imagina un gato en una caja con un mecanismo radiactivo aleatorio. Antes de abrir la caja, la física cuántica establece que el gato está en una superposición: simultáneamente vivo y muerto. Solo la observación obliga a la realidad a definirse por un estado único.",
      "Piensa en una moneda que gira rápidamente en el aire. Mientras está en movimiento, no es ni 'cara' ni 'cruz', sino una mezcla de ambas posibilidades. Solo cuando la atrapas contra la mesa, lo que equivale a una medición en física cuántica, la moneda se detiene en un resultado definitivo.",
      "En Star Wars, el destino de Anakin Skywalker refleja una superposición emocional. Durante años, Anakin luchó entre la luz de los Jedi y la oscuridad de los Sith. Ambas posibilidades coexistieron en su interior hasta que un evento clave lo obligó a tomar una decisión, colapsando su destino y transformándolo en Darth Vader.",
      "Los físicos cuánticos utilizan herramientas matemáticas llamadas 'funciones de onda' para calcular estas posibilidades. Estas ecuaciones no indican la ubicación exacta de una partícula, sino que ofrecen un mapa de probabilidades. Dominar la superposición es fundamental para desarrollar tecnologías modernas como las computadoras cuánticas."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'El concepto de que el acto de medir un sistema cambia su estado se conoce como el "Efecto del Observador". Es uno de los principios más estudiados en la mecánica cuántica.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El Experimento de la Doble Rendija demuestra la superposición. Al disparar electrones hacia una pared con dos ranuras, cada partícula pasa por ambas al mismo tiempo, creando un patrón de interferencia ondulatoria.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En el clímax de El Retorno del Jedi, Darth Vader enfrenta una decisión crítica. Sirve al Emperador pero también quiere salvar a su hijo. Esta doble existencia colapsa en una única realidad cuando decide actuar y derrotar al Emperador.' 
      }
    ],
    fact: 'La superposición establece que un sistema subatómico existe simultáneamente en todos sus estados posibles hasta que es medido, lo que causa el colapso de su función de onda.'
  },
  {
    id: 'teleportacion-cuantica',
    title: 'Teletransportación Cuántica',
    color: '#18FFFF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_teleportacion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_teleportacion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_teleportacion-cuantica.png',
    bannerCaption: "La teleportación cuántica transfiere estados cuánticos entre partículas distantes usando entrelazamiento.",
    content: [
      "La teletransportación cuántica no mueve objetos físicos de un lugar a otro como ocurre en la ciencia ficción. En los laboratorios reales, los científicos teletransportan información cuántica, que es el conjunto de datos sobre cómo está estructurada una partícula. Usan el entrelazamiento cuántico para transferir el estado de un fotón de origen a otro en el destino.",
      "La materia sólida no viaja a través del espacio. En lugar de transportar un átomo físico, se transfiere su identidad cuántica. Las propiedades exactas de la partícula original se copian en una partícula distante, asumiendo esta última todas las características de la primera de manera instantánea.",
      "Imagina que construyes un castillo de bloques. En lugar de enviar los bloques por correo, usas un escáner que lee el diseño, desarmando tu castillo en el proceso. Envías las instrucciones a tu amigo, y sus propios bloques se ensamblan al instante en una copia idéntica del tuyo.",
      "En la Orden Jedi, la 'Proyección de la Fuerza' permite a un Jedi enviar una ilusión realista de sí mismo a otro planeta. De forma similar, la teletransportación cuántica transfiere la información de una partícula a través del vacío, permitiendo que sus propiedades se manifiesten en otro lugar.",
      "Un principio fundamental en este proceso es el 'Teorema de No-Clonación'. Este dicta que es imposible hacer una copia exacta de un estado cuántico sin destruir el original. Por eso, al teletransportar la información de una partícula, la partícula de origen pierde su identidad."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'En 2017, un equipo de científicos logró teletransportar fotones desde la Tierra hasta el satélite Micius en el espacio, alcanzando una distancia récord de más de 1.400 kilómetros.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El protocolo de teletransportación cuántica fue propuesto en 1993 por un equipo liderado por Charles Bennett. Demostraron que la información cuántica se puede reconstruir a distancia enviando solo dos bits clásicos.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En Los Últimos Jedi, Luke Skywalker utiliza la Proyección de la Fuerza en el planeta Crait. El esfuerzo de transmitir esta información exige tanta energía que, en un paralelo al Teorema de No-Clonación, termina por consumir su cuerpo físico.' 
      }
    ],
    fact: 'La teletransportación cuántica transfiere el estado exacto de una partícula a otra distante mediante entrelazamiento. El Teorema de No-Clonación impide duplicar la información original, por lo que el estado de la primera partícula se destruye.'
  },
  {
    id: 'computacion-cuantica',
    title: 'Computadoras del Futuro',
    color: '#E040FB',
    btnImage: '/assets/starwars/infographic_fuerza/btn_computacion-cuantica.png',
    image: '/assets/starwars/infographic_fuerza/hero_computacion-cuantica.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_computacion-cuantica.png',
    bannerCaption: "Los computadores cuánticos utilizan qubits que procesan información exponencialmente más rápido que los bits clásicos.",
    content: [
      "Las computadoras y los teléfonos móviles utilizan un lenguaje binario basado en ceros y unos, conocidos como 'bits'. En este sistema clásico, un interruptor electrónico puede estar apagado (0) o encendido (1), pero nunca ambas opciones al mismo tiempo.",
      "La computación cuántica introduce los 'qubits', o bits cuánticos. Gracias a la superposición, un qubit puede representar un 0, un 1, o cualquier combinación de ambos de forma simultánea. Esto se mantiene siempre y cuando el qubit no sea medido u observado.",
      "Imagina que estás en un laberinto buscando la salida. Una computadora clásica intentaría cada camino uno por uno hasta encontrar la puerta. Una computadora cuántica, en cambio, explora todos los caminos posibles al mismo tiempo, hallando la solución en una fracción de segundo.",
      "En Star Wars, calcular rutas seguras a través del hiperespacio requiere procesar millones de variables al instante. Evitar estrellas y asteroides a la velocidad de la luz exigiría la inmensa capacidad de cálculo que promete la computación cuántica.",
      "Empresas como Google e IBM han construido las primeras computadoras cuánticas en sus laboratorios. Estos equipos operan a temperaturas cercanas al cero absoluto, más frías que el espacio profundo, para proteger la información de sus inestables qubits."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'En 2019, el procesador cuántico "Sycamore" de Google alcanzó la "supremacía cuántica" al resolver en 200 segundos un cálculo que le habría tomado miles de años a una supercomputadora clásica.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El mayor reto en la computación cuántica es la "decoherencia". Los qubits son frágiles y pueden perder su estado de superposición debido a variaciones mínimas de temperatura o vibraciones en el entorno.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En Una Nueva Esperanza, R2-D2 logra infiltrar la red de la Estrella de la Muerte en segundos. Para procesar códigos de seguridad a esa velocidad, un droide necesitaría procesadores con capacidades cuánticas.' 
      }
    ],
    fact: 'La computación cuántica utiliza la superposición y el entrelazamiento para procesar datos. Mientras los bits clásicos valen 0 o 1, los qubits mantienen estados de ambos valores simultáneamente.'
  },
  {
    id: 'no-localidad',
    title: 'Conexión Instantánea: No-Localidad',
    color: '#64FFDA',
    btnImage: '/assets/starwars/infographic_fuerza/btn_no-localidad.png',
    image: '/assets/starwars/infographic_fuerza/hero_no-localidad.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_no-localidad.png',
    bannerCaption: "La no-localidad cuántica permite que partículas entrelazadas se influyan mutuamente a cualquier distancia, demostrado por John Bell en 1964.",
    content: [
      "En el mundo cuántico, la distancia no limita la conexión entre partículas. La 'no-localidad' es un principio comprobado que indica que eventos separados espacialmente pueden estar vinculados. Partículas entrelazadas se afectan mutuamente de inmediato sin que una señal física viaje entre ellas.",
      "Para resolver el debate de las variables ocultas propuesto por Einstein, el físico John Bell diseñó una prueba matemática en 1964. El 'Teorema de Bell' proporcionó las fórmulas para determinar si el universo funcionaba bajo reglas clásicas predeterminadas o si la mecánica cuántica era correcta.",
      "Imagina dos máquinas de chicles conectadas. Según la física clásica, ambas fueron cargadas con el mismo orden de colores predeterminado. La mecánica cuántica plantea que los chicles no tienen color hasta que salen, y ambas máquinas deciden instantáneamente producir un chicle rojo al mismo tiempo.",
      "Yoda enseña que el tamaño de los objetos y la distancia física no importan frente a la Fuerza. La Fuerza interconecta toda la galaxia sin limitaciones geográficas, un concepto que funciona como paralelo a la no-localidad en la física cuántica.",
      "En 1982, el físico Alain Aspect puso a prueba el Teorema de Bell. Usando detectores de fotones, confirmó que el universo no opera con variables ocultas locales. Esta comprobación de la 'acción a distancia' le valió el Premio Nobel de Física en 2022."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'El principio de que las partes de un sistema entrelazado no pueden estudiarse de forma aislada se conoce como holismo cuántico. Refleja cómo ciertas propiedades solo existen en el sistema completo.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'El Premio Nobel de Física 2022 fue otorgado a Alain Aspect, John Clauser y Anton Zeilinger. Se reconoció su trabajo experimental comprobando violaciones al Teorema de Bell con fotones entrelazados.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'En El Imperio Contraataca, Leia escucha telepáticamente a Luke cuando él necesita ayuda. Esta conexión instantánea a larga distancia, sin transmisores, ilustra perfectamente el concepto de no-localidad.' 
      }
    ],
    fact: 'El Teorema de Bell de 1964 establece matemáticamente que ninguna teoría de variables locales clásicas puede explicar los resultados y correlaciones de la mecánica cuántica.'
  },
  {
    id: 'fuerza-universo',
    title: 'La Fuerza del Universo Real',
    color: '#AA00FF',
    btnImage: '/assets/starwars/infographic_fuerza/btn_fuerza-universo.png',
    image: '/assets/starwars/infographic_fuerza/hero_fuerza-universo.png',
    bannerImage: '/assets/starwars/infographic_fuerza/banner_fuerza-universo.png',
    bannerCaption: "Las fuerzas fundamentales del universo â€” gravedad, electromagnetismo, nuclear fuerte y débil â€” gobiernan toda la materia.",
    content: [
      "El espacio que existe entre las estrellas no es un vacío inerte. Según la física moderna, lo que consideramos espacio vacío está lleno de 'Campos Cuánticos'. Estos son mares invisibles de energía que vibran de manera continua en todo el universo.",
      "Estos campos energéticos se extienden por todo el cosmos. Las partículas fundamentales, como los electrones y fotones, son en realidad pequeñas vibraciones u ondulaciones que surgen dentro de estos campos, de la misma forma en que una ola se eleva en el océano.",
      "Imagina un campo cuántico como la superficie tensa de un tambor. Cuando se le aporta energía, el parche vibra. De manera similar, cuando un campo cuántico se excita, da origen a una partícula material. Toda la materia es el resultado de la vibración de estos campos.",
      "Yoda describió la Fuerza diciendo: 'La vida la crea, la hace crecer. Su energía nos rodea y nos une'. La física de campos sugiere algo parecido: no somos objetos aislados, sino nodos de energía interactuando dentro de un campo universal interconectado.",
      "El entrelazamiento y los campos cuánticos muestran que el universo funciona como una red unificada. Todas las partículas y galaxias interactúan dentro de las mismas estructuras fundamentales. La ciencia demuestra que el cosmos es un sistema profundamente entrelazado."
    ],
    expandables: [
      { 
        label: '¿Sabías que...?', 
        icon: 'sparkles', 
        text: 'La misteriosa Energía Oscura, responsable de acelerar la expansión del universo, podría estar directamente relacionada con la energía inherente del vacío cuántico.' 
      },
      { 
        label: 'Dato Científico', 
        icon: 'atom', 
        text: 'En la Teoría Cuántica de Campos, las partículas fundamentales como el bosón de Higgs no son esferas sólidas, sino excitaciones medibles dentro de su respectivo campo.' 
      },
      { 
        label: 'En la Película', 
        icon: 'zap', 
        text: 'Yoda le enseña a Luke: "Seres luminosos somos, no esta materia cruda". Esto resuena con la visión cuántica, donde la base de la materia física es energía vibrando en campos invisibles.' 
      }
    ],
    fact: 'La Teoría Cuántica de Campos demuestra que no existe un vacío absoluto. El universo está permeado por campos energéticos cuyas fluctuaciones dan origen a las partículas subatómicas.'
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
        CONEXIÃ“N CON LA FUERZA: ENTRELAZAMIENTO CUÁNTICO
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        FÍSICA CUÁNTICA &middot; SUPERPOSICIÃ“N &middot; NO-LOCALIDAD
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
              ¡ENTRENAMIENTO CUÁNTICO COMPLETADO!
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
