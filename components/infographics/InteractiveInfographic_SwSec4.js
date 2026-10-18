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
  'teleportacion-cuantica': [DecoEntanglementSpiral, DecoForceLightning],'computacion-cuantica': [DecoQubitOrbit, DecoAtom],
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
    "id": "entrelazamiento-basico",
    diagramImage: '/assets/starwars/infographic_fuerza/diagram_entrelazamiento-basico.webp',
    diagramCaption: 'Representación del entrelazamiento cuántico: dos partículas comparten estado instantáneamente sin importar la distancia.',
    "title": "La Fuerza que Conecta Todo",
    "color": "#B388FF",
    "btnImage": "/assets/starwars/infographic_fuerza/btn_entrelazamiento-basico.webp",
    "image": "/assets/starwars/infographic_fuerza/hero_entrelazamiento-basico.webp",
    "bannerImage": "/assets/starwars/infographic_fuerza/banner_entrelazamiento-basico.webp",
    "bannerCaption": "Representación del entrelazamiento cuántico: dos partículas comparten estado instantáneamente sin importar la distancia.",
    "content": [
      "El entrelazamiento cuántico es uno de los fenómenos más desconcertantes y comprobados de la física moderna. Cuando dos partículas subatómicas interactúan estrechamente o se originan a partir de un mismo evento cuántico, sus propiedades físicas quedan vinculadas de manera intrínseca. A partir de ese instante, dejan de comportarse como entidades independientes y pasan a compartir una única función de onda matemática indivisible, sin importar que luego viajen a extremos opuestos de la galaxia.",
      "Si medimos el estado físico de una de las partículas entrelazadas, como su espín angular o su plano de polarización electromagnética, su función de onda colapsa instantáneamente en un resultado bien definido. En ese mismo microsegundo exacto, la partícula gemela adopta el estado complementario correspondiente, aun cuando se encuentre a millones de kilómetros de distancia. Esta correlación no requiere cables, ondas electromagnéticas ni señales mecánicas viajando a través del espacio interpuesto.",
      "En los laboratorios de óptica cuántica, los físicos generan pares de fotones entrelazados mediante un proceso denominado conversión paramétrica descendente espontánea. Al disparar un rayo láser ultravioleta contra un cristal no lineal de beta-borato de bario, un fotón de alta energía se divide espontáneamente en dos fotones de menor frecuencia cuyas polarizaciones están irremediablemente entrelazadas en un estado puro de Bell, listos para ser transmitidos por fibras ópticas hacia detectores separados.",
      "A pesar de esta conexión inmediata, el entrelazamiento cuántico respeta rigurosamente la teoría de la relatividad especial y no permite la transmisión de información más rápida que la luz. El teorema de no-comunicación matemática demuestra que los resultados individuales observados por cada receptor son completamente aleatorios e impredecibles; la correlación cuántica solo puede manifestarse cuando ambos observadores se comunican mediante un canal clásico convencional para comparar sus mediciones.",
      "En la saga Star Wars, los Maestros Jedi describen la Fuerza como una energía mística que vincula a todos los seres vivos del cosmos. Aunque la física no ha descubierto campos místicos conscientes, el entrelazamiento cuántico demuestra que la naturaleza posee una estructura fundamental no local, donde las partículas del universo primitivo que estuvieron en contacto en el Big Bang conservan sutiles huellas de interconexión física a lo largo del tejido espaciotemporal."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En Una Nueva Esperanza, Obi-Wan Kenobi explica a Luke en el Halcón Milenario que «La Fuerza es lo que le da al Jedi su poder; es un campo de energía creado por todas las cosas vivientes, nos rodea, nos penetra y mantiene unida a la galaxia». En la física cuántica, no existe una energía mística consciente, pero el entrelazamiento crea una interdependencia física objetiva entre partículas separadas por años luz."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En el año 2022, el Premio Nobel de Física fue otorgado conjuntamente a Alain Aspect, John Clauser y Anton Zeilinger por sus experimentos pioneros con fotones entrelazados que demostraron de forma incontestable la violación de las desigualdades de Bell, confirmando que la naturaleza no se rige por el principio clásico del realismo local."
      }
    ],
    "fact": "En los experimentos de entrelazamiento fotónico contemporáneos con cristales no lineales, se generan más de un millón de pares de fotones correlacionados por segundo con una fidelidad cuántica superior al noventa y nueve por ciento, verificable mediante tomografía de estado cuántico y matrices de densidad."
  },
  {
    "id": "epr-paradoja",
    diagramImage: '/assets/starwars/infographic_fuerza/diagram_epr-paradoja.webp',
    diagramCaption: 'Albert Einstein, Boris Podolsky y Nathan Rosen propusieron en 1935 la paradoja EPR, cuestionando la mecánica cuántica.',
    "title": "La Paradoja EPR",
    "color": "#00BCD4",
    "btnImage": "/assets/starwars/infographic_fuerza/btn_epr-paradoja.webp",
    "image": "/assets/starwars/infographic_fuerza/hero_epr-paradoja.webp",
    "bannerImage": "/assets/starwars/infographic_fuerza/banner_epr-paradoja.webp",
    "bannerCaption": "Albert Einstein, Boris Podolsky y Nathan Rosen propusieron en 1935 la paradoja EPR, cuestionando la mecánica cuántica.",
    "content": [
      "En el año 1935, Albert Einstein, Boris Podolsky y Nathan Rosen publicaron en la prestigiosa revista Physical Review un artículo histórico titulado «¿Puede la descripción cuántica de la realidad física considerarse completa?». En este trabajo, conocido universalmente por el acrónimo EPR, los tres científicos presentaron un experimento mental diseñado para demostrar que la mecánica cuántica era una teoría incompleta que requería principios más profundos.",
      "Einstein rechazaba con firmeza la idea de que una medición efectuada sobre una partícula pudiera influir de manera instantánea en otra partícula lejana, bautizando con ironía este fenómeno como «spukhafte Fernwirkung» o «acción fantasmal a distancia». Para Einstein, cualquier teoría física sensata debía fundamentarse en dos postulados innegociables: el realismo, que afirma que los objetos poseen propiedades fijas independientes de la observación, y la localidad, que prohíbe que las influencias físicas viajen más rápido que la luz.",
      "Para preservar el realismo local, los autores del artículo EPR propusieron la existencia de «variables ocultas locales». Según su razonamiento, las dos partículas debían poseer desde el momento de su separación una serie de parámetros internos predeterminados y aún no descubiertos por la ciencia, similares a un par de guantes dentro de dos cajas cerradas: si abres una caja y encuentras el guante izquierdo, sabes al instante que la otra caja contiene el guante derecho sin necesidad de ninguna magia.",
      "Niels Bohr, líder de la célebre Escuela de Copenhague, respondió de inmediato argumentando que la visión mecanicista clásica de Einstein no era aplicable al micromundo cuántico. Bohr defendió el principio de complementariedad, sosteniendo que las partículas no poseen propiedades definidas con anterioridad a su medición y que el acto de observar interactúa de forma indivisible con el sistema experimental completo, conformando una realidad contextual irreductible.",
      "Durante casi tres décadas, la controversia EPR fue considerada un mero debate filosófico e interpretable sin consecuencias prácticas verificables. Sin embargo, en 1964, el físico norirlandés John Stewart Bell cambió para siempre la historia de la ciencia al formular un teorema matemático que permitía medir en el laboratorio si Einstein o Bohr tenían razón, transformando una paradoja epistemológica en uno de los mayores triunfos de la física experimental."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Cuando Darth Vader percibe la presencia de Obi-Wan en la primera Estrella de la Muerte («Siento una perturbación en la Fuerza»), la conexión ocurre de forma instantánea a través del espacio. Einstein habría calificado esa comunicación mental inmediata como una acción fantasmal imposible según las leyes relativistas que limitan la velocidad cósmica."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El artículo original EPR publicado en Physical Review en mayo de 1935 contiene apenas cuatro páginas, pero se convirtió en uno de los textos más citados y debatidos de la historia científica universal, sentando paradójicamente las bases fundacionales de la moderna teoría de la información cuántica y la computación avanzada."
      }
    ],
    "fact": "El teorema de Bell demostró en 1964 que ninguna teoría física determinista de variables ocultas locales puede reproducir todas las predicciones estadísticas de la mecánica cuántica, estableciendo un límite matemático cuantificable mediante la desigualdad CHSH que la naturaleza viola empíricamente hasta el valor de dos raíz de dos."
  },
  {
    "id": "superposicion-cuantica",
    diagramImage: '/assets/starwars/infographic_fuerza/diagram_superposicion-cuantica.webp',
    diagramCaption: 'En mecánica cuántica, una partícula puede existir en múltiples estados simultáneamente hasta que es observada.',
    "title": "Superposición: Ser Todo a la Vez",
    "color": "#7C4DFF",
    "btnImage": "/assets/starwars/infographic_fuerza/btn_superposicion-cuantica.webp",
    "image": "/assets/starwars/infographic_fuerza/hero_superposicion-cuantica.webp",
    "bannerImage": "/assets/starwars/infographic_fuerza/banner_superposicion-cuantica.webp",
    "bannerCaption": "En mecánica cuántica, una partícula puede existir en múltiples estados simultáneamente hasta que es observada.",
    "content": [
      "El principio de superposición cuántica establece que cualquier sistema físico a escala subatómica puede encontrarse simultáneamente en una combinación lineal de múltiples estados posibles hasta que se realiza una medición. Mientras que en la informática tradicional un bit clásico solo puede ser un cero o un uno, un bit cuántico o qubit puede residir en un continuo infinito de estados superpuestos descritos geométricamente sobre la superficie de la llamada esfera de Bloch.",
      "Para ilustrar lo contraintuitivo de este principio llevado a la vida cotidiana, Erwin Schrödinger ideó en 1935 su célebre paradoja del gato. Imaginó un felino encerrado dentro de una cámara de acero junto a un núcleo radiactivo que tiene un cincuenta por ciento de probabilidades de desintegrarse en una hora, activando un veneno mortal. Según la mecánica cuántica estricta sin medición, el estado del gato dentro de la caja es una superposición coherente: está vivo y muerto al mismo tiempo.",
      "La razón por la cual no vemos personas u objetos cotidianos en estados de superposición viva y muerta es el fenómeno de la decoherencia cuántica. Cuando un sistema cuántico interactúa con su entorno térmico circundante, los incontables choques con fotones de luz y moléculas de aire destruyen las relaciones de fase de la función de onda en fracciones infinitesimales de segundo, forzando al sistema a colapsar de inmediato en un único estado clásico determinado.",
      "Para conservar la superposición cuántica durante tiempos prolongados, los laboratorios contemporáneos aíslan átomos individuales en cámaras de ultraalto vacío criogénico enfriadas con rayos láser hasta temperaturas cercanas al cero absoluto. Mediante trampas electromagnéticas de radiofrecuencia Paul, los científicos atrapan iones cargados de iterbio o calcio, manteniendo estados de superposición cuántica estables durante varios segundos para realizar operaciones lógicas de cómputo.",
      "La superposición tiene aplicaciones prácticas de vanguardia en la metrología cuántica y la navegación autónoma. Los interferómetros atómicos dividen paquetes de ondas de átomos en trayectorias superpuestas separadas espacialmente; al recombinarlas, las franjas de interferencia resultantes permiten medir el campo gravitatorio de la Tierra con una sensibilidad sin precedentes, detectando túneles subterráneos o minerales sin necesidad de satélites GPS."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el entrenamiento Jedi, Luke aprende a mantener la mente en calma para percibir múltiples destinos y posibilidades alternativas simultáneamente, como si el futuro fuera un árbol de ramas superpuestas. La mecánica cuántica formaliza este concepto: mientras no se realice una medición, el sistema contiene todas las posibilidades coexistiendo en su función de onda."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Físicos de la Universidad de Viena dirigidos por Markus Arndt han demostrado la superposición cuántica y la interferencia ondulatoria utilizando macromoléculas biológicas sintetizadas con más de dos mil átomos y masas superiores a veinticinco mil unidades de masa atómica, difuminando la frontera clásico-cuántica experimental."
      }
    ],
    "fact": "El tiempo de decoherencia para un objeto microscópico en el aire a temperatura ambiente es del orden de diez elevado a la menos veinte segundos debido al bombardeo colisional de moléculas; por ello, los procesadores cuánticos operan dentro de criostatos de dilución de helio a quince milikelvin, más fríos que el espacio profundo."
  },
  {
    "id": "teleportacion-cuantica",
    diagramImage: '/assets/starwars/infographic_fuerza/diagram_teleportacion-cuantica.webp',
    diagramCaption: 'La teleportación cuántica transfiere estados cuánticos entre partículas distantes usando entrelazamiento.',
    "title": "Teletransportación Cuántica",
    "color": "#18FFFF",
    "btnImage": "/assets/starwars/infographic_fuerza/btn_teleportacion-cuantica.webp",
    "image": "/assets/starwars/infographic_fuerza/hero_teleportacion-cuantica.webp",
    "bannerImage": "/assets/starwars/infographic_fuerza/banner_teleportacion-cuantica.webp",
    "bannerCaption": "La teleportación cuántica transfiere estados cuánticos entre partículas distantes usando entrelazamiento.",
    "content": [
      "En el año 1993, un equipo de físicos teóricos encabezado por Charles Bennett propuso un protocolo revolucionario denominado teletransportación cuántica. Lejos de desintegrar objetos sólidos para reconstruirlos en otro lugar como en las novelas de ciencia ficción, este protocolo físico permite transferir el estado cuántico exacto e desconocido de una partícula hacia otra partícula idéntica situada a gran distancia, sin que la partícula viaje por el espacio interpuesto.",
      "El mecanismo operativo exige compartir previamente un par de partículas entrelazadas entre la emisora, habitualmente llamada Alicia, y el receptor, Bob. Cuando Alicia desea teletransportar el estado de un fotón desconocido a Bob, realiza una medición conjunta de estado de Bell entre el fotón desconocido y su mitad del par entrelazado. Esta medición entrelaza las dos partículas de Alicia y destruye irreversiblemente el estado original que se quería transmitir.",
      "Como resultado de su medición cuántica, Alicia obtiene dos bits clásicos de información convencional. Alicia debe transmitir estos dos bits clásicos a Bob a través de una línea de comunicación tradicional, como un cable de fibra óptica o un enlace de radio por satélite. Una vez que Bob recibe los dos bits, aplica una operación matemática de rotación unitaria (denominadas matrices de Pauli) sobre su partícula entrelazada, transformándola en una réplica exacta del estado original.",
      "Este protocolo cumple con absoluta fidelidad dos de las leyes más inviolables del cosmos: el límite de la velocidad de la luz y el teorema de no-clonación cuántica. Debido a que Bob necesita esperar la llegada de los dos bits clásicos enviados por Alicia, la teletransportación cuántica jamás puede ocurrir más rápido que la luz. Además, como el estado original de Alicia queda destruido durante la medición, la información cuántica no se duplica, sino que se transfiere fielmente.",
      "En la práctica experimental contemporánea, la teletransportación cuántica se ha logrado a través de cientos de kilómetros. En 2017, el satélite espacial cuántico chino Micius batió todos los récords mundiales al teletransportar estados cuánticos de fotones desde una estación terrena situada en el Tíbet hasta el satélite en órbita a mil cuatrocientos kilómetros de altitud, marcando el nacimiento de la futura red de comunicaciones cuánticas globales inviolables."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Las proyecciones de la Fuerza, como la realizada por Luke Skywalker desde el planeta Ahch-To hasta Crait en Los Últimos Jedi, permiten proyectar una presencia vívida a través de la galaxia. La teletransportación cuántica real transmite información de estado a través de la distancia, pero requiere partículas físicas preexistentes en ambos extremos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El teorema de no clonación, formulado por Wootters, Zurek y Dieks en 1982, demuestra rigurosamente a partir de la linealidad de los operadores mecánicos cuánticos que es imposible crear una copia idéntica e independiente de un estado cuántico desconocido arbitrario sin alterarlo irremediablemente durante el intento de medición."
      }
    ],
    "fact": "En el experimento del satélite Micius en 2017, la teletransportación cuántica cubrió una distancia orbital de hasta mil cuatrocientos kilómetros utilizando enlaces ópticos láser espacio-tierra, logrando una fidelidad de transferencia de estado cuántico comprendida entre el ochenta por ciento y el noventa y cinco por ciento."
  },
  {
    "id": "computacion-cuantica",
    diagramImage: '/assets/starwars/infographic_fuerza/diagram_computacion-cuantica.webp',
    diagramCaption: 'Los computadores cuánticos utilizan qubits que procesan información exponencialmente más rápido que los bits clásicos.',
    "title": "Computadoras del Futuro",
    "color": "#E040FB",
    "btnImage": "/assets/starwars/infographic_fuerza/btn_computacion-cuantica.webp",
    "image": "/assets/starwars/infographic_fuerza/hero_computacion-cuantica.webp",
    "bannerImage": "/assets/starwars/infographic_fuerza/banner_computacion-cuantica.webp",
    "bannerCaption": "Los computadores cuánticos utilizan qubits que procesan información exponencialmente más rápido que los bits clásicos.",
    "content": [
      "La computación cuántica representa el cambio de paradigma más radical en la historia del procesamiento de datos desde la invención del transistor de silicio. Mientras que una supercomputadora clásica procesa información evaluando combinaciones binarias de ceros y unos de forma secuencial, un procesador cuántico aprovecha la superposición y el entrelazamiento para mantener y manipular simultáneamente dos elevado a la N estados posibles con solo N qubits.",
      "Este paralelismo intrínseco permite ejecutar algoritmos matemáticos especializados diseñados para resolver problemas intratables para la computación tradicional. El algoritmo de Peter Shor, descubierto en 1994, demostró que una computadora cuántica suficientemente potente puede descomponer números enteros gigantescos en factores primos en tiempo polinómico, amenazando con quebrar los protocolos de cifrado criptográfico RSA que protegen las comunicaciones financieras mundiales.",
      "Las plataformas de hardware cuántico más avanzadas emplean circuitos superconductores milimétricos refrigerados casi al cero absoluto. En estos dispositivos, bucles de metal superconductor separados por barreras aislantes ultrafinas forman uniones Josephson (qubits transmon). Mediante pulsos de microondas de alta precisión afinados a frecuencias de gigahercios, los ingenieros manipulan las amplitudes y fases de superposición de los circuitos con un control nanométrico.",
      "El gran reto que enfrenta la industria es la corrección cuántica de errores. Debido a la extrema fragilidad de los estados cuánticos ante el calor y el electromagnetismo ambiental, los qubits físicos acumulan pequeñas desviaciones de fase y volteos de bit. Los científicos implementan códigos de superficie cuánticos que entrelazan decenas o cientos de qubits físicos redundantes para crear un único «qubit lógico» tolerante a fallos y autoprotegido.",
      "El mayor impacto científico de las computadoras cuánticas residirá en la simulación directa de la química molecular y la física de materiales complejos. Descifrar el comportamiento exacto de catalizadores enzimáticos para sintetizar fertilizantes verdes o diseñar superconductores de alta temperatura que funcionen sin refrigeración criogénica son tareas que solo una máquina que hable el lenguaje nativo de la cuántica puede conquistar."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Los droides astromecánicos como R2-D2 y las computadoras del Halcón Milenario calculan trayectorias hiperespaciales complejas en fracciones de segundo para evitar colisiones con agujeros negros o supernovas. Las futuras computadoras cuánticas optimizarán la navegación orbital espacial mediante algoritmos cuánticos de búsqueda ultraveloz."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En 2019, el procesador Sycamore de Google demostró la ventaja cuántica computacional al ejecutar una tarea de muestreo de circuitos aleatorios en doscientos segundos, un cálculo que en ese momento se estimaba que tomaría miles de años a la supercomputadora clásica más potente del planeta Tierra, marcando un punto de inflexión histórico en la física aplicada y en el procesamiento cuántico masivo de datos."
      }
    ],
    "fact": "Un procesador cuántico con trescientos qubits entrelazados en superposición coherente puede almacenar simultáneamente tantos números como átomos existen en todo el universo observable (dos elevado a la trescientos, una cifra astronómica de aproximadamente diez elevado a la noventa estados simultáneos)."
  },
  {
    "id": "no-localidad",
    diagramImage: '/assets/starwars/infographic_fuerza/diagram_no-localidad.webp',
    diagramCaption: 'La no-localidad cuántica permite que partículas entrelazadas se influyan mutuamente a cualquier distancia, demostrado por John Bell en 1964.',
    "title": "Conexión Instantánea: No-Localidad",
    "color": "#64FFDA",
    "btnImage": "/assets/starwars/infographic_fuerza/btn_no-localidad.webp",
    "image": "/assets/starwars/infographic_fuerza/hero_no-localidad.webp",
    "bannerImage": "/assets/starwars/infographic_fuerza/banner_no-localidad.webp",
    "bannerCaption": "La no-localidad cuántica permite que partículas entrelazadas se influyan mutuamente a cualquier distancia, demostrado por John Bell en 1964.",
    "content": [
      "El principio de no-localidad cuántica es la confirmación experimental de que el universo físico no está construido exclusivamente sobre interacciones locales mediadas por fuerzas que viajan en el espacio. Dos partículas que han compartido un estado entrelazado responden a las mediciones con correlaciones estadísticas que desafían cualquier intento de explicación mediante señales que viajen a través del espacio interpuesto respetando el límite de la luz.",
      "En 1964, John Stewart Bell formuló una desigualdad matemática que estableció una línea divisoria inmutable entre la física clásica local y la mecánica cuántica. Bell demostró que si dos partículas separadas poseen propiedades preexistentes y no se comunican de forma instantánea, el valor matemático de ciertas correlaciones angulares de espín jamás puede exceder el número dos. Si la naturaleza superaba ese valor, el realismo local quedaba formalmente refutado.",
      "Los históricos experimentos liderados por Alain Aspect en la Universidad de París-Sur en 1982 zanjaron la discusión. Aspect utilizó interruptores ópticos ultrarrápidos que cambiaban la orientación de los polarizadores cada diez nanosegundos, mientras los fotones ya estaban viajando a la velocidad de la luz hacia los detectores. No existía tiempo físico suficiente para que los analizadores intercambiaran señales lumínicas, y aun así, la correlación cuántica violó la desigualdad de Bell con rotundidad.",
      "Durante los años posteriores, los escépticos plantearon diversas «lagunas experimentales», como la posibilidad de que los detectores solo captaran una muestra sesgada de fotones o que las opciones de medición no fueran genuinamente aleatorias. En 2015, experimentos pioneros simultáneos en la Universidad Tecnológica de Delft, en Viena y en el instituto NIST de Estados Unidos cerraron todas las lagunas posibles, certificando de forma definitiva que el universo es no local.",
      "La no-localidad no quebranta la teoría de la relatividad especial porque no permite enviar mensajes telegráficos instantáneos: cada observador local solo registra números aleatorios que no transmiten información útil por sí mismos. No obstante, este descubrimiento sacudió los cimientos filosóficos de la ciencia occidental, demostrando que en el tejido más íntimo de la realidad cósmica, el espacio no separa las cosas tan completamente como creíamos."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Cuando el planeta Alderaan es destruido por la Estrella de la Muerte en Una Nueva Esperanza, Obi-Wan Kenobi siente una repentina conmoción a años luz de distancia: «Sentí una gran perturbación en la Fuerza, como si millones de voces gritaran de terror y fueran silenciadas de repente». La no-localidad refleja esa interconexión sutil entre extremos cósmicos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La velocidad aparente de la correlación cuántica fue medida experimentalmente en Ginebra por el equipo de Nicolas Gisin, demostrando que si existiera alguna señal física oculta viajando entre partículas entrelazadas, debería propagarse al menos a diez mil veces la velocidad de la luz en el vacío, confirmando la naturaleza no-local intrínseca y revolucionaria postulada por la mecánica cuántica moderna."
      }
    ],
    "fact": "El límite de Tsirelson establece el techo cuántico absoluto para las correlaciones no locales en dos raíz de dos (aproximadamente dos coma ochenta y dos); la mecánica cuántica viola el límite clásico de Bell de dos, pero se detiene exactamente en este umbral sin violar la causalidad relativista del espacio-tiempo."
  },
  {
    "id": "fuerza-universo",
    diagramImage: '/assets/starwars/infographic_fuerza/diagram_fuerza-universo.webp',
    diagramCaption: 'Las fuerzas fundamentales del universo â€” gravedad, electromagnetismo, nuclear fuerte y débil â€” gobiernan toda la materia.',
    "title": "La Fuerza del Universo Real",
    "color": "#AA00FF",
    "btnImage": "/assets/starwars/infographic_fuerza/btn_fuerza-universo.webp",
    "image": "/assets/starwars/infographic_fuerza/hero_fuerza-universo.webp",
    "bannerImage": "/assets/starwars/infographic_fuerza/banner_fuerza-universo.webp",
    "bannerCaption": "Las fuerzas fundamentales del universo â€” gravedad, electromagnetismo, nuclear fuerte y débil â€” gobiernan toda la materia.",
    "content": [
      "En la cosmología de Star Wars, la Fuerza es una entidad unificada que conecta y armoniza todo el cosmos observable. En la física fundamental contemporánea, los científicos han desentrañado que el funcionamiento del universo no depende de una sola energía mística, sino de cuatro interacciones o fuerzas fundamentales rigurosamente descritas por el Modelo Estándar de la física de partículas y la Teoría de la Relatividad General de Albert Einstein.",
      "La gravedad es la interacción más familiar y al mismo tiempo la más enigmática a escala cuántica. Einstein demostró que la gravedad no es una fuerza de atracción convencional transmitida por el éter, sino la curvatura geométrica del tejido cuadridimensional del espacio-tiempo provocada por la presencia de masa y energía. Aunque es la más débil de todas las fuerzas a nivel atómico, su alcance infinito y su carácter acumulativo moldean las órbitas planetarias, las estrellas y las galaxias.",
      "El electromagnetismo, mediado por el intercambio de fotones sin masa, rige todos los fenómenos atómicos, la óptica, la electricidad y las reacciones químicas que permiten la vida biológica. Las otras dos fuerzas actúan confinadas exclusivamente en el interior del núcleo atómico: la fuerza nuclear fuerte, mediada por gluones, mantiene unidos a los quarks para formar protones y neutrones, mientras que la fuerza nuclear débil, mediada por bosones W y Z, desencadena la radiactividad y la fusión estelar.",
      "Un componente crucial en esta arquitectura es el campo de Higgs, confirmado experimentalmente en 2012 en el Gran Colisionador de Hadrones del CERN en Ginebra. Este campo escalar impregna todo el espacio cósmico desde los primeros instantes del Big Bang. Al interactuar con el campo de Higgs, partículas fundamentales como los quarks y los electrones experimentan una resistencia al cambio de movimiento que percibimos empíricamente como su masa inercial.",
      "El gran santo grial de la física teórica moderna es lograr la unificación de estas cuatro fuerzas en un único marco matemático consistente: una Teoría de la Gran Unificación completada por una Teoría del Todo. Candidatas como la Teoría de Cuerdas y la Gravedad Cuántica de Bucles postulan que a temperaturas extremas en el nacimiento del cosmos, todas las fuerzas se fundían en una sola interacción primordial simétrica y perfecta."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El Gran Maestro Yoda enseña a Luke que «el tamaño no importa; mírame a mí, ¿por mi tamaño me juzgas? Pues no deberías, porque mi aliada es la Fuerza, y una poderosa aliada es». En la física de partículas, las partículas más diminutas e invisibles como el bosón de Higgs son las responsables de otorgar masa a toda la materia de la galaxia."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El Gran Colisionador de Hadrones del CERN en Ginebra es un anillo subterráneo de veintisiete kilómetros de circunferencia donde protones colisionan a trece coma seis teraelectronvoltios a una velocidad del noventa y nueve coma noventa y nueve por ciento de la velocidad de la luz para estudiar las fuerzas primordiales."
      }
    ],
    "fact": "De las cuatro fuerzas fundamentales, la gravedad es con diferencia la más tenue: la fuerza electromagnética de repulsión entre dos protones es aproximadamente diez elevado a treinta y seis veces más potente que su atracción gravitatoria mutua; la gravedad solo domina a escala astronómica gracias a la neutralidad de la carga eléctrica."
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
        CONEXIÓN CON LA FUERZA: ENTRELAZAMIENTO CUÁNTICO
      </h1>
      <h2 style={{
        fontFamily: '"Lora", serif',
        fontSize: '1rem',
        color: '#B0BEC5',
        margin: 0,
        letterSpacing: '1px'
      }}>
        FÍSICA CUÁNTICA &middot; SUPERPOSICIÓN &middot; NO-LOCALIDAD
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
              <img src={node.bannerImage} alt="banner" onClick={() => setLightboxSrc(node.bannerImage)}

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}
 style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', cursor: 'pointer', display: 'block' }} />
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
            <span>CONEXIÓN CON LA FUERZA</span>
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
              <img src="/assets/starwars/infographic_fuerza/badge_quantum.webp" alt="Badge" style={{ width: '40px', height: '40px', borderRadius: '50%' }}  loading="lazy" />
              ¡ENTRENAMIENTO CUÁNTICO COMPLETADO!
              <Sparkles size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: '5rem', width: '100%', maxWidth: '800px', background: '#0B0D17', border: '1px solid #333', borderRadius: '12px', padding: '2rem', textAlign: 'left' }}>
          <h3 style={{ fontFamily: '"Oswald", sans-serif', color: '#B0BEC5', fontSize: '1.2rem', marginTop: 0, borderBottom: '1px solid #333', paddingBottom: '1rem' }}>ARCHIVOS HOLOCRÓN (Bibliografía)</h3>
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
