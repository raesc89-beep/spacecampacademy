'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#9FB3C8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized flipper/paddle */}
      <ellipse cx="30" cy="30" rx="20" ry="8" fill={color} opacity="0.2" transform="rotate(-30 30 30)" />
      <path d="M15 35 Q25 20 45 25 Q40 35 25 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Water droplets */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="45" r="1.5" fill={color} opacity="0.4" />
      {/* Flow lines */}
      <path d="M8 20 Q18 18 22 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 40 Q48 38 52 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising air bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="25" cy="15" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="38" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="42" cy="22" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Shine on main bubble */}
      <path d="M17 42 Q18 40 20 41" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function DecoWave({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20 Q75 30 80 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28 Q75 38 80 33" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Foam dots */}
      <circle cx="20" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1.2" fill={color} opacity="0.35" />
      <circle cx="60" cy="14" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified reptile skull outline */}
      <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Eye sockets (sclerotic rings) */}
      <circle cx="22" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M15 32 Q22 42 30 44 Q38 42 45 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA/evolution helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      <line x1="23" y1="10" x2="37" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="50" x2="37" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermo({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer shape */}
      <rect x="27" y="8" width="6" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Temperature marks */}
      <line x1="34" y1="15" x2="38" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="27" x2="38" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="33" x2="38" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Heat waves */}
      <path d="M42 40 Q46 36 42 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 42 Q50 38 46 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  "Morris, M. S., Thorne, K. S. y Yurtsever, U. (1988). Wormholes, Time Machines, and the Weak Energy Condition. Physical Review Letters, 61, 1446-1449.",
  "Hawking, S. W. (1992). Chronology protection conjecture. Physical Review D, 46, 603-611.",
  "Friedman, J., Morris, M. S., Novikov, I. D., Echeverria, F., Klinkhammer, G., Thorne, K. S. y Yurtsever, U. (1990). Cauchy problem in spacetimes with closed timelike curves. Physical Review D, 42, 1915-1930.",
  "Echeverria, F., Klinkhammer, G. y Thorne, K. S. (1991). Billiard balls in wormhole spacetimes with closed timelike curves: Classical theory. Physical Review D, 44, 1077-1099.",
  "Everett, H. (1957). «Relative State» Formulation of Quantum Mechanics. Reviews of Modern Physics, 29, 454-462.",
  "Hafele, J. C. y Keating, R. E. (1972). Around-the-World Atomic Clocks: Observed Relativistic Time Gains. Science, 177, 168-170.",
  "Thorne, K. S. (1994). Black Holes and Time Warps: Einstein's Outrageous Legacy. W. W. Norton & Company.",
  "Kim, S.-W. y Thorne, K. S. (1991). Do vacuum fluctuations prevent the creation of closed timelike curves? Physical Review D, 43, 3929-3947."
];

const INFOGRAPHIC_NODES = [
  {
    id: "tiempo-elastico",
    bannerImage: '/assets/wormhole/infographic_m6/banner_tiempo-elastico.webp',
    bannerCaption: "Los relojes de los satélites GPS ganan unos 38 microsegundos al día frente a los del suelo por efectos relativistas.",
    title: "El Tiempo Es Elástico",
    color: '#5B7A99',
    btnImage: '/assets/wormhole/infographic_m6/btn_tiempo-elastico.webp',
    image: '/assets/wormhole/infographic_m6/hero_tiempo-elastico.webp',
    content: [
      "Para entender por qué un agujero de gusano podría convertirse en una máquina del tiempo, primero hay que aceptar una idea rarísima de Einstein: el tiempo no corre igual para todos. En 1905, con la relatividad especial, Einstein mostró que un reloj que se mueve muy rápido marca el tiempo más despacio que uno en reposo. A este efecto se le llama dilatación temporal por velocidad. No es un truco del reloj: cualquier proceso, desde el latido de un corazón hasta la desintegración de una partícula, se vuelve más lento.",
      "Diez años después, en 1915, la relatividad general añadió una segunda forma de estirar el tiempo: la gravedad. Cuanto más profundo estás en un campo gravitatorio, más despacio pasa tu tiempo comparado con alguien que está lejos. Por eso un reloj al nivel del mar avanza un poquito más lento que uno en la cima de una montaña. La diferencia en la Tierra es diminuta, pero cerca de una estrella de neutrones o de un agujero negro se vuelve enorme y fácil de notar.",
      "Estas ideas no son solo teoría. En 1971 los físicos Joseph Hafele y Richard Keating subieron relojes atómicos de cesio a aviones comerciales y les dieron la vuelta al mundo, primero hacia el este y luego hacia el oeste. Al aterrizar, los relojes ya no coincidían con los que se quedaron en el laboratorio del Observatorio Naval de Estados Unidos. Las diferencias, de unas decenas a cientos de nanosegundos, coincidieron con lo que predecían juntas la velocidad y la gravedad.",
      "Hoy usamos esta física todos los días sin darnos cuenta. Los satélites del sistema GPS orbitan a unos 20,200 kilómetros de altura y viajan a casi 14,000 kilómetros por hora. Su velocidad hace que sus relojes se atrasen unos 7 microsegundos al día, pero la menor gravedad allá arriba los adelanta unos 45. El resultado neto es una ganancia de unos 38 microsegundos diarios, y los ingenieros la corrigen para que tu teléfono no se equivoque de ubicación.",
      "Si nadie corrigiera esos 38 microsegundos, el error de posición del GPS crecería unos diez kilómetros cada día, porque las señales de radio viajan a la velocidad de la luz y cualquier error de tiempo se convierte en error de distancia. Así que cada vez que un mapa te guía por la ciudad, estás comprobando que el tiempo realmente es elástico. Esa elasticidad es la pieza clave que, aplicada a las dos bocas de un agujero de gusano, abre la puerta teórica al viaje en el tiempo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 2010, científicos del NIST en Estados Unidos usaron relojes ópticos de aluminio tan precisos que detectaron la diferencia del paso del tiempo cuando subieron uno de ellos apenas unos 33 centímetros. Es decir, tu cabeza envejece un poquito más rápido que tus pies, aunque la diferencia a lo largo de toda una vida es de una fracción diminuta de segundo, imposible de notar sin estos instrumentos." },
      { label: "Dato Científico", icon: "atom", text: "La dilatación temporal por velocidad depende del llamado factor de Lorentz. A velocidades cotidianas es prácticamente igual a uno, pero al 87 % de la velocidad de la luz vale dos: un reloj en movimiento marcaría una hora mientras el reloj en reposo marca dos. En los aceleradores de partículas, los muones que viajan casi a la velocidad de la luz viven muchas veces más de lo normal, tal como predice la teoría." }
    ],
    fact: "Los muones son partículas que se crean cuando los rayos cósmicos chocan con la parte alta de la atmósfera, a unos 15 kilómetros de altura. En reposo viven solo unos 2.2 microsegundos, tiempo en el que no deberían llegar al suelo. Sin embargo, los detectamos en grandes cantidades al nivel del mar porque viajan tan rápido que su tiempo se dilata. Es una de las pruebas naturales más bonitas de la relatividad especial.",
  },
  {
    id: "bocas-desfasadas",
    bannerImage: '/assets/wormhole/infographic_m6/banner_bocas-desfasadas.webp',
    bannerCaption: "En 1988, Morris, Thorne y Yurtsever mostraron que mover una boca a gran velocidad desfasa el tiempo entre ambos extremos.",
    title: "Dos Bocas, Dos Relojes",
    color: '#7A6C8F',
    btnImage: '/assets/wormhole/infographic_m6/btn_bocas-desfasadas.webp',
    image: '/assets/wormhole/infographic_m6/hero_bocas-desfasadas.webp',
    content: [
      "Imagina un agujero de gusano traversable cuyas dos bocas empiezan una junto a la otra, dentro de un laboratorio. Al principio, un reloj colocado en la boca A y otro colocado en la boca B marcan exactamente la misma hora. Además, mirando a través del túnel, cada reloj se ve sincronizado con el otro. Ahora viene el truco: dejamos la boca A quieta en el laboratorio y montamos la boca B en una nave espacial capaz de viajar a una fracción enorme de la velocidad de la luz.",
      "La nave se lleva la boca B en un viaje de ida y vuelta muy rápido. Por la dilatación temporal, el reloj de la boca B envejece menos que el de la boca A, igual que en la famosa paradoja de los gemelos, donde el hermano viajero regresa más joven. Cuando la nave vuelve y deja la boca B otra vez en el laboratorio, los dos relojes ya no coinciden vistos desde fuera: la boca B se ha quedado atrasada, por ejemplo, diez años respecto a la boca A.",
      "Lo fascinante es lo que ocurre dentro del túnel. Según el análisis de Michael Morris, Kip Thorne y Ulvi Yurtsever publicado en 1988 en Physical Review Letters, a través del cuello los relojes siguen viéndose sincronizados, porque el viaje rápido ocurrió fuera del túnel, no dentro. Entonces, si entras por la boca B, que está en el «año atrasado», y sales por la boca A, apareces en el pasado del laboratorio. Si haces el recorrido contrario, saltas hacia el futuro.",
      "Hay una segunda manera de conseguir el mismo desfase sin usar naves rapidísimas: aprovechar la gravedad. En 1990, Valery Frolov e Igor Novikov estudiaron qué pasaría si una de las bocas se colocara cerca de un objeto muy masivo, como una estrella de neutrones. Allí el tiempo correría más lento por la dilatación gravitacional, y con el paso de los años las dos bocas acumularían una diferencia de tiempo, igual que en el caso de la nave, pero sin moverse a gran velocidad.",
      "En ambos casos, el agujero de gusano no fabrica el tiempo de la nada: solo conecta dos lugares cuyos relojes se han separado por efectos que ya medimos en la Tierra. Por eso los físicos dicen que, si alguna vez existiera un agujero de gusano traversable, convertirlo en máquina del tiempo sería casi un paso extra sencillo. Esa conclusión inquietante es la razón por la que tantos investigadores han intentado averiguar si la naturaleza tiene alguna forma de impedirlo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La paradoja de los gemelos se ha comprobado con partículas y con relojes atómicos, aunque nunca con personas a velocidades extremas. El astronauta Scott Kelly pasó casi un año en la Estación Espacial Internacional mientras su gemelo Mark permanecía en la Tierra. Por la velocidad orbital, Scott regresó unos milisegundos más «joven» que su hermano, un efecto real pero diminuto." },
      { label: "Dato Científico", icon: "atom", text: "En relatividad general, una máquina del tiempo se describe como un espacio-tiempo con curvas temporales cerradas: trayectorias que, recorridas por un viajero siempre más lento que la luz, terminan en el mismo lugar y momento en que empezaron. El agujero de gusano con bocas desfasadas es uno de los ejemplos más estudiados de cómo podrían aparecer estas curvas a partir de física conocida." }
    ],
    fact: "El artículo de Morris, Thorne y Yurtsever de 1988 se titulaba «Agujeros de gusano, máquinas del tiempo y la condición de energía débil». Su objetivo no era animar a construir máquinas del tiempo, sino usar ese caso extremo para poner a prueba las leyes de la física. Kip Thorne recibió después, en 2017, el Premio Nobel de Física junto a Rainer Weiss y Barry Barish por la detección de ondas gravitacionales con LIGO.",
  },
  {
    id: "maquina-con-limite",
    bannerImage: '/assets/wormhole/infographic_m6/banner_maquina-con-limite.webp',
    bannerCaption: "Un agujero de gusano desfasado solo permitiría volver hasta el momento en que se creó el desfase, nunca antes.",
    title: "Una Máquina del Tiempo con Límite",
    color: '#6B8E7F',
    btnImage: '/assets/wormhole/infographic_m6/btn_maquina-con-limite.webp',
    image: '/assets/wormhole/infographic_m6/hero_maquina-con-limite.webp',
    content: [
      "Las películas suelen mostrar máquinas del tiempo capaces de llevarte a cualquier época, como al tiempo de los dinosaurios o al antiguo Egipto. La máquina de agujero de gusano que imaginaron los físicos tiene una regla muy distinta y mucho más estricta: solo podrías regresar hasta el momento en que la máquina empezó a funcionar. Si las dos bocas se desfasaron diez años a partir de 2050, lo más lejos que podrías llegar sería el año 2050, nunca a una época anterior a esa.",
      "La razón es sencilla cuando la piensas con calma. El agujero de gusano conecta el reloj de una boca con el de la otra. Antes de que existiera el desfase, ambos relojes marcaban la misma hora y el túnel no conectaba tiempos distintos. Por eso no hay forma de usarlo para llegar a un pasado en el que el túnel todavía no estaba desfasado. Esta propiedad tiene una consecuencia curiosa que muchos científicos han comentado: explicaría por qué no vemos turistas del futuro visitándonos hoy.",
      "Si algún día alguien construyera una de estas máquinas, los viajeros del futuro solo podrían volver a fechas posteriores a su fabricación. Como hoy nadie ha construido ninguna, ningún visitante del futuro podría aparecer en nuestro presente usando este método. Kip Thorne explicó esta idea en su libro divulgativo de 1994, «Agujeros negros y tiempo curvo», donde describe con detalle cómo él y sus estudiantes analizaron estas máquinas del tiempo en el Instituto Tecnológico de California.",
      "Aun así, el diseño tiene muchos problemas. Para desfasar las bocas habría que mover una de ellas a velocidades cercanas a la de la luz o dejarla durante años junto a un objeto muy masivo, y en ambos casos el agujero de gusano tendría que sobrevivir intacto. Además, todo el sistema depende de mantener abierto el cuello con energía negativa, algo que nadie sabe producir en las cantidades necesarias. Por eso estas máquinas siguen siendo experimentos mentales, no proyectos de ingeniería.",
      "Los experimentos mentales, sin embargo, son herramientas muy poderosas en física. Einstein imaginaba trenes que viajaban a la velocidad de la luz y ascensores en caída libre, y de esas ideas salieron sus teorías. De la misma manera, imaginar una máquina del tiempo con agujeros de gusano obliga a los físicos a preguntarse qué leyes podrían prohibirla. Responder esa pregunta nos acerca a entender cómo se combinan la gravedad y la mecánica cuántica, el gran problema abierto de la física."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El 28 de junio de 2009, Stephen Hawking organizó una fiesta para viajeros del tiempo en la Universidad de Cambridge, con globos, canapés y champán. Lo divertido es que envió las invitaciones después de la fiesta, para que solo pudieran asistir visitantes del futuro. Nadie llegó. Hawking lo presentó con humor como una pequeña prueba experimental en contra del viaje al pasado." },
      { label: "Dato Científico", icon: "atom", text: "Además de los agujeros de gusano, otras soluciones de las ecuaciones de Einstein contienen curvas temporales cerradas. En 1949, el matemático Kurt Gödel encontró un universo en rotación donde el viaje al pasado sería posible en principio. Nuestro universo no gira de esa manera según las observaciones, pero la solución de Gödel demostró que la relatividad general no prohíbe por sí sola las máquinas del tiempo." }
    ],
    fact: "El físico Frank Tipler propuso en 1974 otra máquina del tiempo teórica: un cilindro infinitamente largo, muy denso y girando a enorme velocidad. Más tarde, Stephen Hawking demostró en 1992 que una máquina del tiempo construida en una región finita del espacio necesitaría energía negativa, igual que los agujeros de gusano traversables. Así, todas las rutas teóricas hacia el pasado chocan con el mismo obstáculo físico.",
  },
  {
    id: "proteccion-cronologia",
    bannerImage: '/assets/wormhole/infographic_m6/banner_proteccion-cronologia.webp',
    bannerCaption: "En 1992, Stephen Hawking propuso que las leyes de la física impiden que se formen máquinas del tiempo.",
    title: "La Protección de la Cronología",
    color: '#9C7A5B',
    btnImage: '/assets/wormhole/infographic_m6/btn_proteccion-cronologia.webp',
    image: '/assets/wormhole/infographic_m6/hero_proteccion-cronologia.webp',
    content: [
      "Ante la posibilidad de construir máquinas del tiempo con agujeros de gusano, Stephen Hawking publicó en 1992 un artículo titulado «Conjetura de protección de la cronología» en la revista Physical Review D. Su propuesta era clara y audaz: las leyes de la física siempre se las arreglarían para impedir que aparezcan curvas temporales cerradas, es decir, caminos que permitan regresar al propio pasado. Con su humor característico, decía que esto haría el universo seguro para los historiadores.",
      "La palabra «conjetura» es importante. En ciencia, una conjetura es una idea que parece probable y está apoyada por argumentos, pero que todavía no se ha demostrado por completo. Hawking no podía probar que el viaje al pasado sea imposible, porque para eso haría falta una teoría completa de la gravedad cuántica que aún no tenemos. Lo que sí ofreció fueron cálculos que indicaban que la física cuántica tiende a destruir cualquier máquina del tiempo justo cuando está a punto de formarse.",
      "El argumento se basa en el vacío cuántico. Según la mecánica cuántica, el espacio vacío no está realmente vacío: hay fluctuaciones de energía que aparecen y desaparecen constantemente. Cuando un agujero de gusano empieza a convertirse en máquina del tiempo, la luz y esas fluctuaciones pueden recorrer el túnel, regresar al mismo instante y sumarse a sí mismas una y otra vez. Es parecido al chirrido que se produce cuando un micrófono capta el sonido de su propio altavoz.",
      "En los cálculos de Hawking, esa retroalimentación hace que la energía del vacío crezca sin límite en la frontera donde empezaría el viaje al pasado, una superficie que los físicos llaman horizonte de Cauchy. Una energía tan enorme deformaría el espacio-tiempo hasta destruir el agujero de gusano antes de que alguien pudiera usarlo. Un año antes, Sung-Won Kim y Kip Thorne habían estudiado el mismo problema y concluido que el crecimiento podría detenerse a escalas diminutas.",
      "Ese desacuerdo entre grandes físicos es una buena lección sobre cómo funciona la ciencia. Kim y Thorne pensaban que el efecto solo se volvería peligroso a la escala de Planck, unos 10 elevado a menos 35 metros, donde ya no sabemos qué leyes rigen. Hawking creía que bastaba para proteger la cronología. Hasta hoy la cuestión sigue abierta, y la mayoría de los expertos coincide en que solo una teoría de la gravedad cuántica podrá dar la respuesta definitiva."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Stephen Hawking y Kip Thorne eran amigos y les encantaba hacer apuestas científicas. Una de las más famosas fue sobre si el objeto Cygnus X-1 era un agujero negro: Hawking apostó que no lo era para tener un consuelo si se equivocaba con su propio trabajo. En 1990 reconoció su derrota, porque las pruebas a favor de que Cygnus X-1 es un agujero negro se habían vuelto muy sólidas." },
      { label: "Dato Científico", icon: "atom", text: "El horizonte de Cauchy es la frontera de la región del espacio-tiempo en la que el futuro puede predecirse por completo a partir del pasado. Más allá de ella, la existencia de curvas temporales cerradas rompe esa predicción. Hawking demostró que si una máquina del tiempo se crea en una región finita, su horizonte de Cauchy necesita energía negativa para formarse, lo que conecta este problema con los agujeros de gusano." }
    ],
    fact: "La longitud de Planck es una distancia diminuta en la que se espera que nuestras teorías actuales dejen de funcionar: aproximadamente 1.6 por 10 elevado a menos 35 metros. El diámetro de un protón es unos cien trillones de veces mayor. A esa escala, se espera que la gravedad y la mecánica cuántica tengan la misma importancia, y por eso los cálculos de Hawking, Kim y Thorne no pueden decidir con total certeza si el vacío cuántico destruye siempre las máquinas del tiempo.",
  },
  {
    id: "paradoja-del-abuelo",
    bannerImage: '/assets/wormhole/infographic_m6/banner_paradoja-del-abuelo.webp',
    bannerCaption: "Si viajas al pasado e impides el nacimiento de tu abuelo, ¿quién hizo el viaje? Es la paradoja temporal más famosa.",
    title: "La Paradoja del Abuelo",
    color: '#8A6F6F',
    btnImage: '/assets/wormhole/infographic_m6/btn_paradoja-del-abuelo.webp',
    image: '/assets/wormhole/infographic_m6/hero_paradoja-del-abuelo.webp',
    content: [
      "La paradoja del abuelo es el problema clásico de cualquier viaje al pasado. Supón que viajas décadas atrás y, por accidente, impides que tu abuelo conozca a tu abuela. Entonces tu padre o tu madre nunca nacerían, y tú tampoco. Pero si tú nunca naciste, nadie pudo viajar al pasado para impedir aquel encuentro, así que tus abuelos sí se conocieron y tú sí naciste. La historia se muerde la cola y no hay manera de decidir qué ocurrió realmente.",
      "Este tipo de razonamiento circular se llama paradoja lógica: una situación en la que dos conclusiones contradictorias parecen seguir de las mismas reglas. Los escritores de ciencia ficción la exploraron durante el siglo XX, y una de las primeras novelas que la planteó con claridad fue «El viajero imprudente», publicada en 1943 por el francés René Barjavel. Desde entonces aparece en películas, series y cómics, y es la primera objeción que casi todos piensan al oír hablar de máquinas del tiempo.",
      "Para los físicos, la paradoja del abuelo no es solo un juego de palabras. Las leyes de la física, tal como las conocemos, funcionan muy bien cuando las causas ocurren antes que los efectos. Ese orden se llama causalidad, y es la base de casi todas nuestras predicciones científicas. Si un viaje al pasado permitiera que un efecto destruyera su propia causa, la física dejaría de poder describir el mundo de forma coherente, y eso es algo que ninguna teoría seria puede aceptar sin una solución.",
      "Por eso, cuando Morris, Thorne y Yurtsever mostraron que los agujeros de gusano podían convertirse en máquinas del tiempo, la paradoja del abuelo pasó de los libros de ciencia ficción a las revistas científicas. Los investigadores se preguntaron si existen reglas físicas que eviten la contradicción. Básicamente surgieron tres respuestas posibles: que el viaje al pasado sea imposible, que la historia solo admita sucesos coherentes consigo mismos o que el viajero llegue a una historia distinta.",
      "La primera respuesta corresponde a la conjetura de protección de la cronología de Hawking. La segunda es el principio de autoconsistencia, defendido por Igor Novikov. La tercera se apoya en la interpretación de los muchos mundos de la mecánica cuántica. Ninguna de las tres ha sido confirmada por experimentos, porque no tenemos máquinas del tiempo para probarlas. Lo que sí sabemos es que cada una exige cambios profundos en nuestra manera de entender la realidad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Existe una versión de la paradoja que no necesita personas: la paradoja de Polchinski. El físico Joseph Polchinski imaginó una bola de billar que entra en un agujero de gusano, sale en el pasado y golpea a su propia versión más joven, desviándola para que nunca entre al túnel. Es la paradoja del abuelo convertida en un problema de física que se puede estudiar con ecuaciones." },
      { label: "Dato Científico", icon: "atom", text: "Además de la paradoja del abuelo, existe la paradoja del bucle causal o de la información. En ella, un objeto o una idea viaja al pasado y se convierte en la causa de sí mismo, sin que nadie la haya creado nunca. No hay contradicción lógica, pero sí un misterio: la información parece surgir de la nada, algo que choca con nuestra intuición sobre de dónde vienen las cosas." }
    ],
    fact: "La causalidad está protegida en la relatividad especial por un límite muy concreto: ninguna señal ni objeto puede viajar más rápido que la luz en el vacío, unos 299,792 kilómetros por segundo. Si ese límite se rompiera localmente, los observadores en movimiento podrían ver efectos antes que sus causas. Los agujeros de gusano no rompen ese límite dentro del túnel, pero conectan regiones lejanas de forma que reaparece el mismo riesgo.",
  },
  {
    id: "historias-consistentes",
    bannerImage: '/assets/wormhole/infographic_m6/banner_historias-consistentes.webp',
    bannerCaption: "Según el principio de Novikov, solo ocurren las historias que no se contradicen a sí mismas, aunque haya viajes al pasado.",
    title: "Historias Consistentes",
    color: '#4F6D7A',
    btnImage: '/assets/wormhole/infographic_m6/btn_historias-consistentes.webp',
    image: '/assets/wormhole/infographic_m6/hero_historias-consistentes.webp',
    content: [
      "En la década de 1980, el astrofísico ruso Igor Novikov propuso una salida elegante a las paradojas temporales: el principio de autoconsistencia. Según esta idea, aunque existieran viajes al pasado, solo podrían ocurrir sucesos que fueran coherentes con todo lo que ya pasó. Si viajas atrás en el tiempo, no puedes cambiar la historia, porque ya formabas parte de ella desde el principio. Tus acciones en el pasado son justamente las que ayudaron a que el presente sea como es.",
      "Piensa en un ejemplo sencillo. Si intentas viajar al pasado para impedir el encuentro de tus abuelos, algo saldrá mal: llegarás tarde, te tropezarás o incluso, sin querer, serás tú quien los presente. Según Novikov, no hace falta una fuerza mágica que te detenga. Simplemente, las únicas historias que pueden existir en un universo con viajes al pasado son las que encajan como piezas de un rompecabezas, sin bordes que se contradigan entre sí.",
      "Para comprobar si esta idea tiene sentido físico, Kip Thorne y sus estudiantes Fernando Echeverria y Gunnar Klinkhammer estudiaron con ecuaciones el problema de la bola de billar en un agujero de gusano con bocas desfasadas. Su artículo de 1991 en Physical Review D mostró algo sorprendente: para las condiciones iniciales que parecían llevar a una paradoja, siempre encontraron al menos una trayectoria consistente, en la que la bola recibe un golpe suave y entra al túnel con un ángulo distinto.",
      "En esas soluciones, la bola del futuro no impide que su versión del pasado entre en el agujero de gusano, sino que solo la desvía un poco. Esa pequeña desviación es precisamente la que hace que la bola salga del túnel en la dirección justa para dar ese mismo golpe. La historia se cierra sobre sí misma sin contradicciones. Lo curioso es que, en muchos casos, los físicos encontraron no una sino varias trayectorias consistentes posibles para las mismas condiciones iniciales.",
      "Esa multiplicidad plantea una nueva pregunta: si hay varias historias coherentes, ¿cuál elige la naturaleza? La física clásica no da una respuesta, y algunos investigadores han propuesto que la mecánica cuántica podría asignar una probabilidad a cada historia. El principio de autoconsistencia no está demostrado, pero tiene una gran ventaja: permite estudiar los viajes al pasado sin abandonar la lógica. Por eso sigue siendo una de las ideas más discutidas en física teórica."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Muchas historias de ciencia ficción usan, sin decirlo, el principio de Novikov. En «Harry Potter y el prisionero de Azkaban», los viajes con el giratiempo no cambian el pasado: Harry descubre que él mismo fue quien produjo el patronus que lo salvó antes. Ese tipo de trama, donde todo encaja al final, es un ejemplo de historia autoconsistente." },
      { label: "Dato Científico", icon: "atom", text: "En 1990, un equipo formado por John Friedman, Michael Morris, Igor Novikov, Fernando Echeverria, Gunnar Klinkhammer, Kip Thorne y Ulvi Yurtsever publicó un estudio sobre el problema de predecir el futuro en espacio-tiempos con curvas temporales cerradas. En ese trabajo formularon de manera explícita el principio de autoconsistencia como una regla para analizar estos sistemas." }
    ],
    fact: "El estudio de las bolas de billar en agujeros de gusano se considera un modelo de juguete: simplifica el mundo real para poder resolver las ecuaciones con exactitud. Los físicos usan modelos de juguete para descubrir ideas que luego se ponen a prueba en situaciones más complejas. Gracias a este modelo se demostró que las paradojas no aparecen de forma inevitable, aunque eso no garantiza que el viaje al pasado sea posible.",
  },
  {
    id: "muchos-mundos",
    bannerImage: '/assets/wormhole/infographic_m6/banner_muchos-mundos.webp',
    bannerCaption: "Hugh Everett III propuso en 1957 que la realidad se ramifica con cada suceso cuántico; algunos lo usan contra las paradojas.",
    title: "La Salida de los Muchos Mundos",
    color: '#6F7F5B',
    btnImage: '/assets/wormhole/infographic_m6/btn_muchos-mundos.webp',
    image: '/assets/wormhole/infographic_m6/hero_muchos-mundos.webp',
    content: [
      "En 1957, un estudiante de doctorado de la Universidad de Princeton llamado Hugh Everett III publicó una idea atrevida en la revista Reviews of Modern Physics. La mecánica cuántica dice que una partícula puede estar en una mezcla de varios estados a la vez hasta que se mide. Everett propuso que, en lugar de que la medición elija un solo resultado, la realidad entera se ramifica: en una rama aparece un resultado y en otra rama aparece el otro, y ambas continúan existiendo.",
      "Al principio, la idea de Everett recibió poca atención. Fue el físico Bryce DeWitt quien, en los años setenta, la popularizó con el nombre de «interpretación de los muchos mundos». Según ella, cada vez que ocurre un suceso cuántico con varios resultados posibles, el universo se divide en ramas que ya no pueden comunicarse entre sí. Hoy es una de las interpretaciones de la mecánica cuántica más discutidas, junto con la interpretación de Copenhague y otras propuestas.",
      "¿Qué tiene que ver esto con el viaje en el tiempo? En 1991, el físico británico David Deutsch, de la Universidad de Oxford, estudió cómo se comportarían los sistemas cuánticos cerca de curvas temporales cerradas. Sus cálculos sugerían que, desde el punto de vista de los muchos mundos, un viajero que regresa al pasado podría llegar a una rama distinta de la historia. Allí podría cambiar lo que quisiera, incluso impedir el encuentro de sus abuelos, sin borrar su propio origen.",
      "Con esta idea, la paradoja del abuelo desaparece, pero a cambio hay que aceptar una realidad enormemente más grande de la que vemos. El viajero no regresaría nunca a su propio pasado, sino al pasado de otra rama del universo, casi idéntica hasta el momento de su llegada. En su historia original nada cambiaría. Muchos físicos encuentran esta solución atractiva por su lógica, mientras que otros la critican porque los otros mundos no pueden observarse ni comprobarse directamente.",
      "Este es un buen momento para recordar la diferencia entre lo que sabemos y lo que especulamos. Sabemos que la dilatación temporal es real porque la medimos todos los días. Las máquinas del tiempo con agujeros de gusano, en cambio, son soluciones matemáticas sin evidencia experimental, y las tres respuestas a las paradojas son hipótesis. Los físicos esperan que una futura teoría de la gravedad cuántica diga cuál de ellas describe la naturaleza, o si todas están equivocadas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Hugh Everett III abandonó la física académica poco después de publicar su tesis y trabajó durante años en análisis militar y computación para el Departamento de Defensa de Estados Unidos. No vivió para ver cómo su idea se volvía famosa entre los físicos teóricos: murió en 1982, cuando la interpretación de los muchos mundos apenas empezaba a ganar popularidad." },
      { label: "Dato Científico", icon: "atom", text: "David Deutsch es también uno de los pioneros de la computación cuántica. En 1985 describió una computadora cuántica universal, capaz en principio de simular cualquier sistema físico. Su interés por los muchos mundos y por las curvas temporales cerradas está conectado: para él, la mecánica cuántica y la información son la clave para entender qué permite o prohíbe la naturaleza." }
    ],
    fact: "La relatividad general y la mecánica cuántica son las dos teorías más exitosas de la física, pero no encajan bien cuando se combinan, por ejemplo dentro de un agujero negro o en la garganta de un agujero de gusano. Candidatas como la teoría de cuerdas o la gravedad cuántica de lazos intentan unirlas. Hasta ahora ninguna ha sido confirmada experimentalmente, y por eso las paradojas temporales siguen sin una solución definitiva.",
  }
];

// ─── Marine Particle Field (Canvas Background) ──────────────────────────────
function MarineParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    const w = canvas.width, h = canvas.height;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? '159,179,200' : '184,125,94', // slate blue or copper
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.08;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        if (p.x < -5 || p.x > w + 5) p.x = Math.random() * w;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

// ─── Marine Header ──────────────────────────────────────────────────────────
function MarineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(159,179,200,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM6)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7A99", "#7A6C8F", "#6B8E7F", "#9C7A5B", "#8A6F6F", "#4F6D7A", "#6F7F5B"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#9FB3C8" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#9FB3C8" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradWormholeM6" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TÚNELES QUE TAMBIÉN CRUZAN EL TIEMPO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(159,179,200,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">AGUJEROS DE GUSANO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ────────────────────────────
function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(159,179,200,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute',
              inset: '-4px',
              borderRadius: '50%',
              border: `2px solid ${node.color}`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '100px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotWormholeM6"
          style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: node.color,
            boxShadow: `0 0 8px ${node.color}`,
          }}
        />
      )}
    </motion.button>
  );
}

// ─── Expandable Section with Random Direction ────────────────────────────────
const DIRECTIONS = ['up', 'down', 'left', 'right'];
const dirVariants = {
  up:    { hidden: { y: -30, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 30, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -30, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 30, opacity: 0 },  visible: { x: 0, opacity: 1 } },
};

const EXPAND_ICONS = {
  clock: Clock,
  zap: Zap,
  atom: Atom,
};

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem',
      borderRadius: '14px',
      border: `1px solid ${color}25`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}08, transparent)`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}12` }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.7rem',
          padding: '0.8rem 1rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComp size={14} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.7 }} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dirVariants[dir]}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{
              margin: 0, fontSize: '0.9rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`,
              paddingLeft: '0.8rem',
            }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  
  const decoPositions = [
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(10, 12, 30, 0.92)',
        backdropFilter: 'blur(24px)',
        border: `1px solid ${node.color}30`,
        borderRadius: '24px',
        position: 'relative',
        zIndex: 3,
        marginTop: '1rem',
        overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10,
        background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* ─── Two-Column Hero Section ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '280px',
      }}>
        {/* Left: Hero Image */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
          background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))`,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{
            width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9,
            minHeight: '280px',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px',
            background: `linear-gradient(transparent, ${node.color}15)`,
          }} />
        </div>

        {/* Right: Title + first 2 paragraphs */}
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}

          <h3 style={{
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>

          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{
              margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75,
              color: 'rgba(255,255,255,0.85)',
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* ─── Magazine Body ─── */}
      <div style={{
        padding: '1.5rem 2rem 2rem',
        position: 'relative',
      }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', ...pos, zIndex: 1, pointerEvents:'none',
              }}
            >
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.2rem 2rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div
                key={i}
                style={{
                  gridColumn: isWide ? '1 / -1' : 'auto',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  padding: '1.2rem',
                  borderLeft: `3px solid ${node.color}30`,
                  position: 'relative',
                }}
              >
                <div style={{
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0B0E2D',
                  fontSize: '0.65rem', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '8px',
                  letterSpacing: '1px',
                }}>
                  {i === 0 ? '◆' : '◇'}
                </div>
                <p style={{
                  margin: 0, fontSize: '0.95rem', lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.85)',
                }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {/* ─── Expandable Interactive Sections ─── */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
        {node.bannerImage && (
              <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                <img src={node.bannerImage} alt={node.bannerCaption || ''}
                     style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
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
              {node.fact && (
          <div style={{
            marginTop: '1.5rem',
            background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`,
            borderRadius: '16px',
            padding: '1.2rem 1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            position: 'relative',
            zIndex: 2,
          }}>
            <div style={{
              flexShrink: 0,
              width: '36px', height: '36px',
              borderRadius: '50%',
              background: `${node.color}20`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase',
              }}>
                Dato Científico
              </span>
              <p style={{
                margin: '0.3rem 0 0', fontStyle: 'italic',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.92rem', lineHeight: 1.7,
              }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(159,179,200,0.15)',
    }}>
      <Star size={14} style={{ color: '#9FB3C8', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #9FB3C8, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(159,179,200,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#9FB3C8', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_WormholeM6() {
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [explored, setExplored] = useState(new Set());

  const handleNodeClick = (nodeId) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
      setExplored(prev => new Set([...prev, nodeId]));
    }
  };

  const activeData = INFOGRAPHIC_NODES.find(n => n.id === activeNode);

  return (
    <div style={{
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.96) 0%, rgba(15,10,35,0.94) 40%, rgba(10,12,30,0.97) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(159,179,200,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MarineParticleField />

      <MarineHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(159,179,200,0.7)', fontSize: '0.85rem',
            marginBottom: '1rem', position: 'relative', zIndex: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
          }}
        >
          <ChevronRight size={14} /> Toca cada círculo para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0.8rem 1.2rem',
        position: 'relative',
        zIndex: 2,
        marginBottom: '1rem',
        padding: '0 0.5rem',
      }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton
            key={node.id}
            node={node}
            index={index}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && (
          <ContentPanel
            key={activeData.id}
            node={activeData}
            onClose={() => setActiveNode(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginTop: '1.5rem', padding: '1rem',
              background: 'rgba(159,179,200,0.08)', borderRadius: '16px',
              border: '1px solid rgba(159,179,200,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#9FB3C8', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Dilatación temporal, máquinas del tiempo, paradojas y muchos mundos
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ─── Bibliografía ─── */}
      <div style={{
        marginTop: '2rem', padding: '1.5rem 2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 16px 16px',
      }}>
        <h4 style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          📚 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.8,
          listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>• {ref}</li>
          ))}
        </ul>
      </div>

      {/* ImageLightbox */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
