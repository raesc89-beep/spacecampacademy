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
  "Morris, M. S., Thorne, K. S., Yurtsever, U. (1988). «Wormholes, time machines, and the weak energy condition». Physical Review Letters, 61, 1446–1449.",
  "Friedman, J., Morris, M. S., Novikov, I. D., Echeverria, F., Klinkhammer, G., Thorne, K. S., Yurtsever, U. (1990). «Cauchy problem in spacetimes with closed timelike curves». Physical Review D, 42, 1915.",
  "Echeverria, F., Klinkhammer, G., Thorne, K. S. (1991). «Billiard balls in wormhole spacetimes with closed timelike curves: Classical theory». Physical Review D, 44, 1077.",
  "Deutsch, D. (1991). «Quantum mechanics near closed timelike lines». Physical Review D, 44, 3197.",
  "Hawking, S. W. (1992). «Chronology protection conjecture». Physical Review D, 46, 603.",
  "Lossev, A., Novikov, I. D. (1992). «The Jinn of the time machine: non-trivial self-consistent solutions». Classical and Quantum Gravity, 9, 2309.",
  "Lloyd, S., Maccone, L., Garcia-Patron, R., et al. (2011). «Closed timelike curves via postselection: theory and experimental test of consistency». Physical Review Letters, 106, 040403.",
  "Thorne, K. S. (1994). Black Holes and Time Warps: Einstein's Outrageous Legacy. W. W. Norton."
];

const INFOGRAPHIC_NODES = [
  {
    id: "tunel-maquina-tiempo",
    bannerImage: '/assets/wormhole/infographic_m13/banner_tunel-maquina-tiempo.webp',
    bannerCaption: "En 1988, Morris, Thorne y Yurtsever mostraron que mover una boca de un agujero de gusano podría crear una máquina del tiempo.",
    title: "Cómo un Túnel se Vuelve Máquina del Tiempo",
    color: '#6E5B8C',
    btnImage: '/assets/wormhole/infographic_m13/btn_tunel-maquina-tiempo.webp',
    image: '/assets/wormhole/infographic_m13/hero_tunel-maquina-tiempo.webp',
    content: [
      "Para entender las paradojas temporales primero hay que aceptar algo que Einstein demostró en 1905: el tiempo no transcurre igual para todos. Cuanto más rápido te mueves respecto a otra persona, más lento pasa tu reloj visto desde ella. Este efecto, llamado dilatación temporal, se comprueba a diario. Los muones, partículas creadas por rayos cósmicos en lo alto de la atmósfera, viven en reposo unas dos millonésimas de segundo, pero llegan al suelo porque, al viajar casi a la velocidad de la luz, su tiempo se estira.",
      "El ejemplo clásico es la paradoja de los gemelos. Una gemela se queda en la Tierra mientras su hermano viaja en una nave al 99 % de la velocidad de la luz. A esa velocidad, el reloj del viajero avanza unas siete veces más despacio. Si él vuelve tras lo que para él fue un año, descubrirá que en la Tierra han pasado unos siete. Ambos estaban vivos y sanos todo el tiempo, pero ya no tienen la misma edad. No es una ilusión: es la forma en que el universo mide el tiempo.",
      "En 1988, Michael Morris, Kip Thorne y Ulvi Yurtsever publicaron un artículo que combinaba esta idea con los agujeros de gusano. Imagina un túnel con dos bocas: una se queda quieta en la Tierra y la otra se lleva de viaje a velocidades cercanas a la luz y luego se trae de regreso. Visto a través de la garganta, el tiempo de ambas bocas sigue sincronizado, porque el túnel es muy corto. Pero visto desde fuera, la boca viajera ha envejecido menos, igual que el gemelo de la nave espacial.",
      "El resultado es sorprendente. Si la boca viajera quedó, por ejemplo, nueve años atrasada respecto a la boca fija, quien entre por ella saldrá por la otra nueve años antes en la historia de la Tierra. Y quien entre por la boca fija saldrá nueve años en el futuro. Hay una regla importante: con este método nunca se puede viajar a una época anterior al momento en que la máquina empezó a funcionar. El túnel conecta dos instantes, pero no puede llevarte a cuando todavía no existía la diferencia de tiempos.",
      "Los físicos llaman curvas temporales cerradas a los caminos que permiten regresar al propio pasado. No son un invento exclusivo de los agujeros de gusano. En 1949, el matemático Kurt Gödel encontró una solución de las ecuaciones de Einstein que describía un universo en rotación en el que también existían. Lo inquietante es que la relatividad general, por sí sola, no las prohíbe. Por eso, en cuanto aparecen, surgen inmediatamente las paradojas que estudiaremos en este módulo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Tu teléfono usa la relatividad sin que lo notes. Los satélites del sistema GPS se mueven tan rápido que su movimiento les hace perder unos 7 microsegundos al día, pero como están más lejos de la masa de la Tierra, la gravedad más débil les hace ganar unos 45. El balance neto es de unos 38 microsegundos diarios de adelanto. Si los ingenieros no corrigieran esa diferencia, los errores de posición crecerían varios kilómetros cada día." },
      { label: "Dato Científico", icon: "atom", text: "En 1949, Kurt Gödel regaló a su amigo Albert Einstein, por su setenta cumpleaños, una solución de la relatividad general que describía un universo en rotación con curvas temporales cerradas. En ese universo, un viajero podría, en principio, visitar su propio pasado sin superar nunca la velocidad de la luz. Einstein reconoció que el resultado le inquietaba. Nuestro universo no parece girar así, pero el ejemplo demostró que las ecuaciones permiten el viaje al pasado." }
    ],
    fact: "Dato Clave: una máquina del tiempo construida con un agujero de gusano solo permitiría viajar hasta el momento en que se creó la diferencia de tiempo entre sus bocas, nunca antes. Por eso, aunque mañana se fabricara una, nadie podría usarla para visitar los dinosaurios ni la Edad Media. Esta limitación aparece en el artículo de Morris, Thorne y Yurtsever de 1988 y es un detalle que casi todas las películas de ciencia ficción ignoran.",
  },
  {
    id: "paradoja-abuelo-logica",
    bannerImage: '/assets/wormhole/infographic_m13/banner_paradoja-abuelo-logica.webp',
    bannerCaption: "Una versión clásica aparece en la novela «Le Voyageur imprudent» (1943) de René Barjavel, donde un viajero mata a un antepasado.",
    title: "La Paradoja del Abuelo",
    color: '#8C6B5B',
    btnImage: '/assets/wormhole/infographic_m13/btn_paradoja-abuelo-logica.webp',
    image: '/assets/wormhole/infographic_m13/hero_paradoja-abuelo-logica.webp',
    content: [
      "La paradoja más famosa del viaje en el tiempo es la del abuelo. Imagina que viajas al pasado y, por accidente, impides que tu abuelo conozca a tu abuela. Si ellos nunca se conocen, tus padres no nacen, y tú tampoco. Pero si tú no naces, nunca podrías haber viajado al pasado para impedir aquel encuentro. Y si no lo impides, tus abuelos se conocen, tú naces y vuelves a viajar. El razonamiento da vueltas sin fin, como una serpiente que se muerde la cola, sin llegar nunca a una respuesta estable.",
      "Lo que hace tan grave esta paradoja es que no se trata de algo difícil o improbable, sino de una contradicción lógica. Un mismo hecho tendría que ocurrir y no ocurrir a la vez. En matemáticas y en física, cuando una teoría permite una contradicción, es una señal de alarma: algo en ella está incompleto o mal planteado. Por eso los físicos no pueden tratar esta historia como un simple juego de ciencia ficción. Si la relatividad permite máquinas del tiempo, debe explicar qué impide esta clase de contradicciones.",
      "La idea es antigua en la literatura. Una de sus versiones más conocidas aparece en la novela «Le Voyageur imprudent», publicada en 1943 por el escritor francés René Barjavel, en la que un viajero del tiempo termina matando por accidente a un antepasado suyo. Desde entonces, cientos de relatos, series y películas han jugado con esta idea. Durante décadas, la mayoría de los físicos la consideraron una curiosidad filosófica, porque nadie pensaba que la naturaleza permitiera realmente viajar al pasado.",
      "Todo cambió a finales de los años ochenta, cuando los trabajos de Thorne y su equipo mostraron que los agujeros de gusano transitables podrían convertirse en máquinas del tiempo sin violar ninguna ecuación de la relatividad general. De pronto, la paradoja del abuelo se convirtió en un problema serio de física. Surgieron tres grandes caminos para resolverla: que las leyes de la naturaleza impidan las máquinas del tiempo, que solo permitan historias coherentes, o que el viajero llegue a una historia distinta de la suya.",
      "Una dificultad de la versión con el abuelo es que mezcla la física con la voluntad humana. ¿Qué detiene al viajero? ¿Un tropiezo, un arma que se encasquilla, un cambio de opinión? Discutir sobre decisiones y libre albedrío complica mucho el análisis científico. Por eso los físicos prefirieron reformular el problema con objetos sencillos que obedecen leyes conocidas, sin intenciones ni decisiones. Así nació la versión con bolas de billar, que permite estudiar la paradoja con ecuaciones precisas en lugar de con opiniones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En la película «Regreso al futuro», estrenada en 1985, Marty McFly viaja a 1955 e interfiere sin querer en el primer encuentro de sus padres. Para mostrar el peligro, la película usa una fotografía familiar en la que Marty y sus hermanos van desapareciendo poco a poco. Es una representación divertida de la paradoja del abuelo, aunque desde el punto de vista de la física plantea más preguntas que respuestas sobre cómo funcionaría realmente el tiempo." },
      { label: "Dato Científico", icon: "atom", text: "En física, predecir el futuro de un sistema consiste en resolver un problema de valores iniciales: conociendo el estado del universo en un instante, las ecuaciones determinan lo que sucederá después. Cuando existen curvas temporales cerradas, el futuro puede influir en el pasado y ese método deja de funcionar de forma normal. Algunas condiciones iniciales podrían no tener ninguna solución coherente. Esa ausencia de solución es, matemáticamente, la paradoja del abuelo." }
    ],
    fact: "Dato Clave: la paradoja del abuelo no demuestra que el viaje al pasado sea imposible, sino que cualquier teoría que lo permita debe incluir una regla adicional que evite las contradicciones. Las tres propuestas principales son la protección de la cronología de Stephen Hawking, el principio de autoconsistencia de Ígor Nóvikov y las historias múltiples inspiradas en la interpretación de los muchos mundos de la mecánica cuántica.",
  },
  {
    id: "billar-polchinski",
    bannerImage: '/assets/wormhole/infographic_m13/banner_billar-polchinski.webp',
    bannerCaption: "Joseph Polchinski planteó a Kip Thorne una paradoja con bolas de billar; Echeverria, Klinkhammer y Thorne la analizaron en 1991.",
    title: "La Paradoja del Billar",
    color: '#5B8C7A',
    btnImage: '/assets/wormhole/infographic_m13/btn_billar-polchinski.webp',
    image: '/assets/wormhole/infographic_m13/hero_billar-polchinski.webp',
    content: [
      "A finales de los años ochenta, el físico Joseph Polchinski escribió a Kip Thorne con un desafío ingenioso. Olvidemos a los abuelos y a las personas: imaginemos solo una bola de billar y un agujero de gusano convertido en máquina del tiempo. Una bola no tiene voluntad, no duda ni cambia de opinión. Simplemente rueda y choca obedeciendo las leyes de Newton y de la relatividad. Si incluso con algo tan simple aparece una contradicción, entonces el problema está en la física y no en la psicología.",
      "El planteamiento es el siguiente. Una bola rueda hacia la boca A del agujero de gusano siguiendo una trayectoria precisa. Al entrar, sale por la boca B unos instantes antes en el tiempo. Desde allí avanza y golpea a su versión más joven, que todavía se dirigía hacia la boca A. El golpe desvía a la bola joven, de modo que esta nunca entra en el agujero de gusano. Pero si nunca entra, no puede salir por la boca B en el pasado, y entonces nunca habría golpeado a nadie. Es la paradoja del abuelo con bolas.",
      "Kip Thorne encargó el problema a dos de sus estudiantes del Instituto Tecnológico de California, Fernando Echeverria y Gunnar Klinkhammer. Durante meses analizaron muchísimas trayectorias posibles, buscando alguna condición inicial que no tuviera una historia coherente. En 1991 publicaron sus resultados en la revista Physical Review D. La sorpresa fue enorme: para todas las trayectorias iniciales que estudiaron, siempre encontraron al menos una historia en la que no aparecía ninguna contradicción.",
      "La clave estaba en los choques suaves. En una de las soluciones, la bola que sale del futuro no golpea de frente a su versión joven, sino de refilón. Ese pequeño golpe lateral desvía un poco a la bola joven, que entra en la boca A con un ángulo ligeramente distinto. Precisamente por entrar con ese ángulo, sale por la boca B siguiendo el camino exacto que la lleva a dar ese mismo golpe de refilón. La historia se cierra sobre sí misma como un círculo perfecto, sin contradicción alguna.",
      "El estudio reveló algo aún más extraño. El problema no era que hubiera muy pocas soluciones, sino que a veces había demasiadas. Para ciertas condiciones iniciales existían infinitas historias coherentes posibles, y las leyes clásicas no indicaban cuál ocurriría. Thorne y Klinkhammer recurrieron entonces a la mecánica cuántica, usando la suma sobre historias de Richard Feynman, que asigna una probabilidad a cada camino posible. Así, la física cuántica podría decirnos qué historias son más probables cuando hay varias opciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Joseph Polchinski, el físico que planteó la paradoja del billar, se convirtió después en uno de los grandes expertos mundiales en teoría de cuerdas. En 1995 descubrió la importancia de las D-branas, unas superficies en las que pueden terminar las cuerdas, y ese trabajo transformó por completo esa área de investigación. Su pregunta sobre las bolas de billar muestra que los grandes científicos también disfrutan inventando rompecabezas sencillos que obligan a pensar con claridad." },
      { label: "Dato Científico", icon: "atom", text: "La suma sobre historias, formulada por Richard Feynman en los años cuarenta, dice que una partícula cuántica no sigue un único camino, sino que explora todos los posibles a la vez. Cada camino contribuye con un peso, y combinando todos se obtiene la probabilidad de cada resultado. Aplicada a la paradoja del billar, esta herramienta permite calcular qué historias autoconsistentes son más probables cuando las leyes clásicas ofrecen muchas opciones distintas." }
    ],
    fact: "Dato Clave: en 1991, Echeverria, Klinkhammer y Thorne no encontraron ninguna trayectoria inicial de una bola de billar que llevara a una paradoja inevitable. Siempre existía al menos una historia coherente, generalmente con un golpe de refilón. Este resultado inesperado sugirió que las máquinas del tiempo, si existieran, no tendrían por qué romper la lógica, aunque sí podrían volver ambiguo cuál de varios futuros posibles termina ocurriendo.",
  },
  {
    id: "principio-novikov",
    bannerImage: '/assets/wormhole/infographic_m13/banner_principio-novikov.webp',
    bannerCaption: "Ígor Nóvikov propuso en los años ochenta que solo pueden ocurrir historias que sean coherentes consigo mismas.",
    title: "El Principio de Autoconsistencia de Nóvikov",
    color: '#7A8C5B',
    btnImage: '/assets/wormhole/infographic_m13/btn_principio-novikov.webp',
    image: '/assets/wormhole/infographic_m13/hero_principio-novikov.webp',
    content: [
      "El astrofísico ruso Ígor Nóvikov, pionero en el estudio de los agujeros negros y colaborador del célebre Yákov Zeldóvich, propuso una regla sencilla para evitar las paradojas: solo pueden ocurrir secuencias de acontecimientos que sean coherentes consigo mismas. Si un viaje al pasado fuera a provocar una contradicción, ese viaje simplemente no sucede de esa forma. Las leyes de la física no permitirían historias imposibles, del mismo modo que no permiten que una piedra caiga hacia arriba.",
      "La mejor manera de imaginar este principio es pensar en la historia del universo como un tapiz ya tejido, en el que cada hilo ocupa su lugar de principio a fin. Si un viajero del tiempo visita el pasado, su visita no cambia el tapiz: siempre formó parte de él. Todo lo que haga en el pasado ya había ocurrido antes de que partiera. Según Nóvikov, el viajero no puede borrar su propia existencia, porque los hechos del pasado incluyen desde el principio todo lo que él hizo durante su visita.",
      "En 1990, Nóvikov se unió a John Friedman, Michael Morris, Kip Thorne, Ulvi Yurtsever, Fernando Echeverria y Gunnar Klinkhammer para publicar un estudio matemático detallado. Analizaron cómo se comportan los campos y las partículas cuando existen curvas temporales cerradas. Concluyeron que, en los casos estudiados, el principio de autoconsistencia no necesitaba añadirse como una regla mágica: las propias ecuaciones de la física parecían ofrecer siempre soluciones coherentes, como ocurrió después con las bolas de billar.",
      "En 2011, un equipo dirigido por Seth Lloyd, del Instituto Tecnológico de Massachusetts, puso a prueba una versión cuántica de estas ideas en el laboratorio. Usando fotones y una técnica llamada teleportación con poselección, simularon el comportamiento de una partícula que viaja hacia atrás en el tiempo e intenta impedir su propio viaje. En el experimento, los intentos de crear una paradoja fracasaban siempre: solo se registraban los resultados coherentes. No fue un viaje real, sino una simulación del modelo matemático.",
      "Este principio genera una pregunta filosófica incómoda: ¿tendría libre albedrío el viajero? Nóvikov respondía que el problema no es tan extraño como parece. Ya ahora, nuestras acciones están limitadas por las leyes de la física: no podemos caminar por el techo ni atravesar paredes, y no por ello sentimos que hemos perdido nuestra libertad. Del mismo modo, en un universo con máquinas del tiempo, simplemente no estaría a nuestro alcance hacer algo que contradijera lo que ya ocurrió en el pasado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En «Harry Potter y el prisionero de Azkaban», publicado en 1999, Harry y Hermione usan un giratiempo para volver unas horas al pasado. Antes de viajar, Harry ve a una figura misteriosa que lo salva de los dementores con un patronus; después descubre que esa figura era él mismo. Todo lo que hacen en el pasado ya había ocurrido. Es un ejemplo literario muy claro de una historia autoconsistente, tal como la imaginaba Nóvikov." },
      { label: "Dato Científico", icon: "atom", text: "El experimento de 2011 se basa en la poselección: se realizan muchas pruebas y solo se conservan aquellas en las que una medición da un resultado concreto. Con esa técnica se puede reproducir el comportamiento de un fotón que interactúa con su propio pasado. Los físicos insisten en que no se envió nada al pasado; lo que se comprobó fue que el modelo matemático de curvas temporales cerradas basado en la poselección produce siempre historias coherentes." }
    ],
    fact: "Dato Clave: el principio de autoconsistencia de Nóvikov no prohíbe el viaje al pasado, sino que impide cambiarlo. El pasado ya incluye todas las visitas de los viajeros del tiempo. En 2011, un experimento con fotones dirigido por Seth Lloyd simuló este tipo de bucles cuánticos y comprobó que, dentro del modelo estudiado, los intentos de producir una paradoja nunca daban resultados contradictorios.",
  },
  {
    id: "muchos-mundos-ramas",
    bannerImage: '/assets/wormhole/infographic_m13/banner_muchos-mundos-ramas.webp',
    bannerCaption: "Hugh Everett propuso en 1957 la interpretación de los muchos mundos; David Deutsch la aplicó al viaje en el tiempo en 1991.",
    title: "Universos Paralelos: la Salida de los Muchos Mundos",
    color: '#5B6F8C',
    btnImage: '/assets/wormhole/infographic_m13/btn_muchos-mundos-ramas.webp',
    image: '/assets/wormhole/infographic_m13/hero_muchos-mundos-ramas.webp',
    content: [
      "La mecánica cuántica describe las partículas mediante superposiciones: antes de medirlo, un electrón puede estar en una mezcla de varias posibilidades a la vez. Pero cuando lo medimos, siempre obtenemos un único resultado. ¿Qué ocurre con las demás posibilidades? Esta pregunta, conocida como el problema de la medida, no tiene una respuesta aceptada por todos. Existen varias interpretaciones, y una de ellas ofrece una salida muy llamativa para la paradoja del abuelo: los muchos mundos.",
      "En 1957, Hugh Everett, un estudiante de doctorado de la Universidad de Princeton dirigido por John Wheeler, propuso que la superposición nunca desaparece. Según su idea, cada vez que se produce una medición, el universo se divide en ramas, y en cada rama se obtiene uno de los resultados posibles. Todas las ramas son igual de reales, aunque no pueden comunicarse entre sí. En 1970, el físico Bryce DeWitt popularizó esta propuesta con el nombre con el que la conocemos hoy: la interpretación de los muchos mundos.",
      "En 1991, el físico británico David Deutsch, de la Universidad de Oxford, estudió cómo se comportaría la mecánica cuántica cerca de las curvas temporales cerradas. Desarrolló un modelo matemático en el que siempre existe una solución coherente, sin importar lo que intente hacer el viajero. Deutsch interpretó sus resultados desde la perspectiva de los muchos mundos: quien viaja al pasado no regresa a su propia historia, sino que llega a otra rama del universo, que a partir de ese momento evoluciona de forma diferente.",
      "Con esta idea, la paradoja del abuelo se disuelve. Supongamos que el viajero procede de la rama A, en la que su abuelo vivió, tuvo hijos y él nació. Al viajar al pasado aparece en la rama B, y allí impide que su abuelo conozca a su abuela. En la rama B, el viajero nunca nacerá, pero eso no importa, porque él no procede de ella. Su origen sigue intacto en la rama A. No hay contradicción, porque nadie destruye su propio pasado: solo modifica un pasado que pertenece a otra historia.",
      "Esta solución, sin embargo, tiene costos importantes. La interpretación de los muchos mundos no se ha podido comprobar con ningún experimento, porque las ramas no se pueden observar directamente, y muchos físicos prefieren otras interpretaciones. Además, el modelo de Deutsch tiene propiedades matemáticas poco habituales que todavía se debaten. También conviene recordar que esas ramas no son lugares a los que se pueda viajar como a otro planeta: son historias distintas del mismo universo cuántico."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Hugh Everett se sintió decepcionado por la poca atención que recibió su idea y abandonó la física académica poco después de doctorarse. Trabajó durante años en análisis militar y en empresas de computación. Su hijo, Mark Oliver Everett, es el líder de la banda de rock estadounidense Eels. En 2007 protagonizó un documental de la BBC en el que intentaba comprender las ideas de su padre sobre los universos paralelos." },
      { label: "Dato Científico", icon: "atom", text: "David Deutsch es también uno de los padres de la computación cuántica. En 1985 describió la primera computadora cuántica universal, capaz en principio de simular cualquier sistema físico. Para él, la potencia de esas máquinas es una pista a favor de los muchos mundos, porque podrían realizar cálculos en muchas ramas a la vez. Otros físicos explican la computación cuántica sin necesidad de esa interpretación, por lo que el debate sigue abierto." }
    ],
    fact: "Dato Clave: en el modelo de David Deutsch de 1991, la mecánica cuántica cerca de las curvas temporales cerradas siempre admite una solución coherente. Interpretado con los muchos mundos de Hugh Everett, el viajero que va al pasado llega a una rama alternativa de la historia. Así, impedir el encuentro de sus abuelos no afectaría a su universo de origen, aunque esta interpretación todavía no ha podido comprobarse experimentalmente.",
  },
  {
    id: "paradoja-conocimiento-bucle",
    bannerImage: '/assets/wormhole/infographic_m13/banner_paradoja-conocimiento-bucle.webp',
    bannerCaption: "El nombre inglés «bootstrap paradox» procede del relato «By His Bootstraps» (1941), de Robert A. Heinlein, sobre un bucle temporal.",
    title: "La Paradoja del Conocimiento",
    color: '#8C5B7A',
    btnImage: '/assets/wormhole/infographic_m13/btn_paradoja-conocimiento-bucle.webp',
    image: '/assets/wormhole/infographic_m13/hero_paradoja-conocimiento-bucle.webp',
    content: [
      "Existe una paradoja más sutil que la del abuelo, porque no contiene ninguna contradicción. Imagina que una científica del futuro viaja a 1905 y le explica al joven Albert Einstein la teoría de la relatividad. Einstein la estudia, la publica y, siglos después, la científica la aprende en sus libros de texto antes de viajar al pasado. La historia es perfectamente coherente: todo encaja. Pero surge una pregunta inquietante: ¿quién inventó realmente la relatividad? La idea parece no haber sido creada por nadie.",
      "Este tipo de bucle se llama paradoja del conocimiento o, en inglés, bootstrap paradox. El nombre procede de la expresión popular que habla de levantarse a uno mismo tirando de los cordones de las botas, algo imposible. Se hizo famoso gracias al relato «By His Bootstraps», publicado en 1941 por el escritor estadounidense Robert A. Heinlein, en el que un hombre se encuentra repetidamente con versiones de sí mismo de distintos momentos, y todas ellas forman un círculo cerrado sin un comienzo claro.",
      "En 1992, el físico Andrei Lossev e Ígor Nóvikov analizaron este fenómeno con rigor matemático. Llamaron genio de la máquina del tiempo, inspirándose en los genios de los cuentos, a cualquier objeto o información que existe en un bucle temporal sin haber sido fabricado nunca. Un ejemplo sería una bola de billar que sale de un agujero de gusano, rueda, entra por la otra boca y vuelve a salir en el pasado. Su existencia no viola las ecuaciones, pero la bola no tendría ningún origen dentro de la historia.",
      "Aquí aparece un problema con la termodinámica. Su segundo principio dice que la entropía, una medida del desorden, tiende a aumentar: los objetos se desgastan, se rayan y envejecen. Una bola que circula en un bucle debería regresar exactamente en el mismo estado en que salió, sin un solo rasguño adicional. Lossev y Nóvikov señalaron que, para que un objeto material forme un bucle, su desgaste tendría que ser reparado en algún punto del ciclo. Con la información pura, en cambio, el problema del desgaste es menos evidente.",
      "En 1994, David Deutsch y Michael Lockwood propusieron otro argumento en la revista Scientific American. Según ellos, el conocimiento nuevo solo puede aparecer mediante procesos creativos, como la evolución biológica o el razonamiento. Un bucle de información en el que una teoría surge de la nada violaría esa regla. Por eso, aunque la paradoja del conocimiento no sea una contradicción lógica, muchos físicos la consideran una señal de que el universo podría tener mecanismos adicionales para impedir estos bucles."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En el episodio «Before the Flood» de la serie británica «Doctor Who», emitido en 2015, el Doctor explica la paradoja del conocimiento con un ejemplo musical. Cuenta la historia de un viajero que copia las partituras de Beethoven, viaja al pasado y descubre que el compositor no existe. Entonces publica él mismo las obras. Así, la música queda atrapada en un bucle: nadie la compuso realmente, pero existe y forma parte de la historia." },
      { label: "Dato Científico", icon: "atom", text: "El segundo principio de la termodinámica no es una ley absoluta como la conservación de la energía, sino una ley estadística. Hay muchísimas más formas de estar desordenado que ordenado, por eso el desorden casi siempre aumenta. Una taza rota nunca se recompone sola, no porque esté prohibido, sino porque es astronómicamente improbable. Un objeto que circula sin desgastarse en un bucle temporal exigiría una casualidad igual de improbable o algún proceso de reparación." }
    ],
    fact: "Dato Clave: a diferencia de la paradoja del abuelo, la paradoja del conocimiento es lógicamente coherente: nada ocurre y deja de ocurrir a la vez. Su problema es otro: información u objetos que existen sin haber sido creados nunca. Lossev y Nóvikov llamaron genios de la máquina del tiempo a estos objetos en 1992, y señalaron que la termodinámica impone condiciones muy estrictas para que puedan existir.",
  },
  {
    id: "proteccion-cronologia-hawking",
    bannerImage: '/assets/wormhole/infographic_m13/banner_proteccion-cronologia-hawking.webp',
    bannerCaption: "En 1992, Stephen Hawking propuso la conjetura de protección de la cronología: las leyes físicas impedirían las máquinas del tiempo.",
    title: "La Protección de la Cronología",
    color: '#6B6B8C',
    btnImage: '/assets/wormhole/infographic_m13/btn_proteccion-cronologia-hawking.webp',
    image: '/assets/wormhole/infographic_m13/hero_proteccion-cronologia-hawking.webp',
    content: [
      "Frente a las soluciones de Nóvikov y Deutsch, Stephen Hawking propuso en 1992 una respuesta más tajante: las leyes de la física impiden que se formen las máquinas del tiempo. La llamó conjetura de protección de la cronología. En su artículo escribió, con su humor característico, que parecía existir una agencia de protección de la cronología que impide la aparición de curvas temporales cerradas y hace que el universo sea seguro para los historiadores. Si tenía razón, no habría paradojas que resolver.",
      "Su argumento se apoyaba en un cálculo de 1991 de Sung-Won Kim y Kip Thorne. Ellos estudiaron qué ocurre con las fluctuaciones cuánticas del vacío cuando un agujero de gusano está a punto de convertirse en máquina del tiempo. Descubrieron que las partículas virtuales podrían recorrer el túnel, regresar a su punto de partida en el mismo instante y sumarse a sí mismas una y otra vez. Esa retroalimentación haría crecer sin límite la energía cerca del llamado horizonte de cronología.",
      "Kim y Thorne pensaban que la gravedad cuántica podría frenar ese crecimiento justo a tiempo, a escalas extremadamente pequeñas. Hawking, en cambio, argumentó que la energía acumulada sería suficiente para deformar el espacio-tiempo y destruir el agujero de gusano antes de que funcionara como máquina del tiempo. En 1997, Bernard Kay, Marek Radzikowski y Robert Wald demostraron un teorema según el cual las fórmulas habituales de la física cuántica dejan de estar bien definidas en ese horizonte.",
      "Hawking también usaba un argumento más sencillo: si el viaje en el tiempo fuera posible, ¿dónde están los turistas del futuro? Este razonamiento es ingenioso, pero no es definitivo. Como vimos al inicio del módulo, una máquina del tiempo basada en agujeros de gusano solo permite viajar hasta el momento de su creación. Si nadie ha construido todavía ninguna, ningún turista podría haber llegado a nuestra época, aunque en el futuro existieran. La ausencia de visitantes, por tanto, no demuestra nada por sí sola.",
      "La protección de la cronología sigue siendo una conjetura, no un teorema demostrado. Su resolución definitiva requerirá una teoría cuántica de la gravedad que todavía no tenemos. Precisamente por eso las paradojas temporales son tan valiosas: no son solo curiosidades para la ciencia ficción, sino herramientas que muestran dónde fallan nuestras teorías actuales. Cuando una teoría produce resultados paradójicos, nos avisa de que debemos buscar una descripción más profunda de la naturaleza."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El 28 de junio de 2009, Stephen Hawking organizó una fiesta para viajeros del tiempo en la Universidad de Cambridge. Preparó globos, canapés y champán, pero no envió las invitaciones hasta después de la fiesta. Así, solo alguien capaz de viajar al pasado podría haber asistido. No se presentó nadie. Hawking contó la anécdota en una serie documental de 2010 como prueba humorística de que el viaje al pasado podría no ser posible." },
      { label: "Dato Científico", icon: "atom", text: "El teorema de Kay, Radzikowski y Wald, publicado en 1997, demostró que en un espacio-tiempo con un horizonte de cronología la cantidad que describe la energía de los campos cuánticos no puede definirse correctamente en ese horizonte. Esto no prueba que las máquinas del tiempo sean imposibles, pero sí indica que la física actual deja de funcionar justo donde se formarían. Solo una teoría cuántica de la gravedad podría decir qué ocurre realmente allí." }
    ],
    fact: "Dato Clave: según la conjetura de protección de la cronología de Stephen Hawking, las fluctuaciones cuánticas del vacío se amplificarían al recorrer una y otra vez un agujero de gusano a punto de convertirse en máquina del tiempo. La energía acumulada destruiría el túnel antes de que nadie pudiera usarlo. Desde 1992 sigue siendo una conjetura, y resolverla exigirá una teoría cuántica de la gravedad.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM13)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6E5B8C", "#8C6B5B", "#5B8C7A", "#7A8C5B", "#5B6F8C", "#8C5B7A", "#6B6B8C"];
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
          <linearGradient id="gradWormholeM13" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">BUCLES, ABUELOS Y BOLAS DE BILLAR</text>
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
          layoutId="activeDotWormholeM13"
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
export default function InteractiveInfographic_WormholeM13() {
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
              🏆 Cuando un túnel cósmico se convierte en máquina del tiempo, la lógica se pone a prueba
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
