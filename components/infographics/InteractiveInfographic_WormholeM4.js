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
  "Einstein, A. y Rosen, N. (1935). The Particle Problem in the General Theory of Relativity. Physical Review, 48, 73-77.",
  "Wheeler, J. A. (1955). Geons. Physical Review, 97, 511-536.",
  "Misner, C. W. y Wheeler, J. A. (1957). Classical physics as geometry. Annals of Physics, 2, 525-603.",
  "Minkowski, H. (1909). Raum und Zeit. Physikalische Zeitschrift, 10, 104-111.",
  "Dyson, F. W., Eddington, A. S. y Davidson, C. (1920). A Determination of the Deflection of Light by the Sun's Gravitational Field, from Observations Made at the Total Eclipse of May 29, 1919. Philosophical Transactions of the Royal Society A, 220, 291-333.",
  "Pound, R. V. y Rebka, G. A. (1960). Apparent Weight of Photons. Physical Review Letters, 4, 337-341.",
  "Vessot, R. F. C. et al. (1980). Test of Relativistic Gravitation with a Space-Borne Hydrogen Maser. Physical Review Letters, 45, 2081-2084.",
  "Geroch, R. P. (1967). Topology in General Relativity. Journal of Mathematical Physics, 8, 782-786.",
  "Misner, C. W., Thorne, K. S. y Wheeler, J. A. (1973). Gravitation. W. H. Freeman.",
  "Abdo, A. A. et al. (2009). A limit on the variation of the speed of light arising from quantum gravity effects. Nature, 462, 331-334."
];

const INFOGRAPHIC_NODES = [
  {
    id: "puentes-einstein-rosen",
    bannerImage: '/assets/wormhole/infographic_m4/banner_puentes-einstein-rosen.webp',
    bannerCaption: "En 1935, Einstein y Nathan Rosen publicaron en Physical Review el artículo que dio origen a los «puentes» del espacio-tiempo.",
    title: "1935: Los Puentes de Einstein-Rosen",
    color: '#6A7F99',
    btnImage: '/assets/wormhole/infographic_m4/btn_puentes-einstein-rosen.webp',
    image: '/assets/wormhole/infographic_m4/hero_puentes-einstein-rosen.webp',
    content: [
      "En 1935, Albert Einstein trabajaba en el Instituto de Estudios Avanzados de Princeton, en Estados Unidos, junto a un joven ayudante llamado Nathan Rosen. Ese año publicaron en la revista Physical Review un artículo titulado «El problema de las partículas en la teoría general de la relatividad». Su meta no era viajar por el cosmos, sino algo mucho más modesto en apariencia: describir partículas elementales, como el electrón, usando únicamente la geometría del espacio-tiempo.",
      "El problema que les preocupaba eran las singularidades, puntos donde las ecuaciones dan valores infinitos y dejan de tener sentido. La solución de Schwarzschild, que estudiaste en el módulo anterior, tiene una zona conflictiva de ese tipo. Einstein y Rosen usaron un cambio ingenioso de coordenadas para evitarla y descubrieron que el espacio se podía describir como dos hojas idénticas unidas por un cuello estrecho. A esa conexión se le llamó desde entonces puente de Einstein-Rosen.",
      "Cada una de esas dos hojas era una región enorme del espacio, prácticamente plana lejos del puente, como dos universos gemelos pegados por un cuello. Einstein y Rosen imaginaron que una partícula podría ser justamente ese puente visto desde afuera. La idea era elegante, porque convertía la materia en pura geometría, pero no prosperó: no lograba reproducir las propiedades de las partículas reales ni incluir la mecánica cuántica, que ya explicaba el electrón con enorme éxito.",
      "Curiosamente, en su artículo Einstein y Rosen no citaron a Ludwig Flamm, el físico austriaco que en 1916 ya había descrito una geometría parecida, en forma de embudo, al estudiar la solución de Schwarzschild. Todo indica que llegaron a la misma estructura por su cuenta y con métodos distintos. Esto pasa con frecuencia en ciencia: cuando las ecuaciones esconden una idea, varios investigadores pueden encontrarla de manera independiente, a veces con décadas de diferencia entre ellos.",
      "Lo más sorprendente es que el puente de Einstein-Rosen no se pensó como un atajo. En 1935 nadie hablaba de cruzarlo, y tampoco se entendía bien qué era un agujero negro: esa comprensión llegó hasta los años sesenta. Solo mucho después los físicos se dieron cuenta de que el puente forma parte del interior de un agujero negro eterno idealizado y de que no puede atravesarse. Aun así, aquel artículo de solo cinco páginas plantó la semilla de todos los agujeros de gusano que se estudian hoy."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Ese mismo año de 1935, Einstein y Rosen publicaron junto con Boris Podolsky otro artículo famosísimo, conocido como EPR por las iniciales de sus autores, sobre el entrelazamiento cuántico. Durante décadas pareció que ambos trabajos no tenían nada que ver. En 2013, Juan Maldacena y Leonard Susskind propusieron la conjetura «ER = EPR», que sugiere que dos partículas entrelazadas podrían estar unidas por un diminuto puente de Einstein-Rosen. Es una idea especulativa, pero muy estudiada." },
      { label: "Dato Científico", icon: "atom", text: "Nathan Rosen nació en Brooklyn, Nueva York, en 1909, y trabajó como ayudante de Einstein a mediados de los años treinta. En 1953 se mudó a Israel, donde ayudó a desarrollar la física en el Technion, el Instituto Tecnológico de Israel, en la ciudad de Haifa. A lo largo de su carrera siguió investigando en relatividad general y en teorías alternativas de la gravedad, hasta su muerte en 1995." }
    ],
    fact: "Einstein se mudó a Estados Unidos en 1933, cuando el ascenso del nazismo en Alemania lo obligó a dejar Europa. Se instaló en Princeton, Nueva Jersey, donde trabajó en el Instituto de Estudios Avanzados hasta su muerte en 1955. Allí pasó sus últimos veinte años buscando una teoría que unificara la gravedad y el electromagnetismo, un objetivo que no alcanzó y que los físicos siguen persiguiendo hoy de otras formas.",
  },
  {
    id: "wheeler-bautiza-el-gusano",
    bannerImage: '/assets/wormhole/infographic_m4/banner_wheeler-bautiza-el-gusano.webp',
    bannerCaption: "En 1957, Charles Misner y John A. Wheeler usaron por primera vez la palabra «wormhole»: agujero de gusano.",
    title: "Wheeler Bautiza al «Gusano»",
    color: '#8C7A6B',
    btnImage: '/assets/wormhole/infographic_m4/btn_wheeler-bautiza-el-gusano.webp',
    image: '/assets/wormhole/infographic_m4/hero_wheeler-bautiza-el-gusano.webp',
    content: [
      "Durante veinte años, los puentes de Einstein-Rosen quedaron casi olvidados. Quien los rescató fue John Archibald Wheeler, un físico estadounidense de la Universidad de Princeton que había trabajado en física nuclear junto al danés Niels Bohr. A mediados de los años cincuenta, Wheeler decidió dedicarse a la relatividad general, que entonces era un área poco popular, y se propuso averiguar hasta dónde podía llegar la idea de que todo en la física es, en el fondo, geometría.",
      "En 1955 publicó un artículo sobre los «geones», paquetes de ondas electromagnéticas o gravitacionales que se mantendrían unidos por su propia gravedad. En ese trabajo describió espacios con conexiones múltiples, es decir, con túneles que unen regiones distintas. Dos años después, en 1957, Wheeler y su estudiante Charles Misner publicaron un largo artículo en la revista Annals of Physics donde aparece la palabra inglesa wormhole, que en español traducimos como agujero de gusano.",
      "El nombre evoca una imagen muy fácil de recordar. Piensa en una manzana y en una hormiga que quiere ir de un lado de la fruta al lado opuesto. La hormiga tendría que caminar por toda la cáscara, pero un gusano que perfora la manzana llega por dentro, recorriendo una distancia mucho menor. La cáscara representa nuestro espacio y el túnel del gusano representa el atajo. Esta analogía se volvió tan popular que hoy aparece en casi cualquier libro de divulgación sobre el tema.",
      "Wheeler tenía un motivo muy concreto para estudiar estos túneles: su idea de «carga sin carga». Imaginó que las líneas de un campo eléctrico podrían entrar por una boca del agujero de gusano y salir por la otra. Un observador que viera solo la primera boca pensaría que allí hay una carga negativa, porque las líneas entran, y otro observador vería una carga positiva en la segunda boca. Así, la carga eléctrica sería solo una consecuencia de la forma del espacio, sin partículas.",
      "Igual que el modelo de Einstein y Rosen, la idea de carga sin carga no logró explicar las partículas reales, pero dejó un legado enorme. Wheeler convirtió los agujeros de gusano en un tema serio de investigación y formó a varias generaciones de físicos. Entre sus estudiantes de doctorado estuvieron Richard Feynman, Hugh Everett y Kip Thorne, quien décadas después estudiaría los agujeros de gusano que se podrían cruzar. Wheeler murió en 2008, a los 96 años de edad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Wheeler era un genio para los nombres. Además de introducir «agujero de gusano», en 1967 difundió la expresión «agujero negro» durante una conferencia en Nueva York, después de que alguien del público la sugiriera. También popularizó la frase «los agujeros negros no tienen pelo», que resume que estos objetos se describen solo con tres datos: su masa, su carga eléctrica y su giro." },
      { label: "Dato Científico", icon: "atom", text: "Junto con Charles Misner y Kip Thorne, Wheeler escribió en 1973 el libro de texto «Gravitation», de más de 1,200 páginas, que los estudiantes llaman «MTW» por las iniciales de sus autores. Allí se resume la relatividad general con una idea célebre de Wheeler: el espacio-tiempo le dice a la materia cómo moverse, y la materia le dice al espacio-tiempo cómo curvarse." }
    ],
    fact: "En 1939, Wheeler publicó con Niels Bohr la primera explicación teórica detallada de la fisión nuclear, y durante la Segunda Guerra Mundial participó en el Proyecto Manhattan. Su paso de la física nuclear a la gravitación fue muy influyente: en las décadas de 1960 y 1970 ayudó a que la relatividad general dejara de ser un tema marginal y se convirtiera en una de las áreas más activas de la física.",
  },
  {
    id: "espacio-tiempo-unificado",
    bannerImage: '/assets/wormhole/infographic_m4/banner_espacio-tiempo-unificado.webp',
    bannerCaption: "En 1908, Hermann Minkowski mostró que la relatividad especial se describe mejor uniendo espacio y tiempo en cuatro dimensiones.",
    title: "Espacio y Tiempo: Un Solo Tejido",
    color: '#5F7F8C',
    btnImage: '/assets/wormhole/infographic_m4/btn_espacio-tiempo-unificado.webp',
    image: '/assets/wormhole/infographic_m4/hero_espacio-tiempo-unificado.webp',
    content: [
      "Para entender un agujero de gusano hay que entender primero el escenario donde existiría: el espacio-tiempo. En la vida diaria pensamos en el espacio con tres dimensiones, largo, ancho y alto, y en el tiempo como algo separado que avanza igual para todos. Para ubicar un suceso, como una fiesta de cumpleaños, necesitamos cuatro datos: tres que dicen dónde ocurre y uno que dice cuándo. Los físicos llaman evento a cada punto de ese mapa de cuatro dimensiones.",
      "En 1905, Albert Einstein publicó la relatividad especial y demostró algo inesperado: las medidas de distancia y de tiempo dependen de cómo se mueve quien las hace. Dos observadores que viajan a velocidades distintas no siempre coinciden en cuánto mide un objeto ni en cuánto dura un suceso, y ni siquiera en si dos sucesos lejanos ocurren a la vez. Lo que sí comparten es la velocidad de la luz en el vacío, que es la misma para todos: unos 299,792 kilómetros por segundo.",
      "Tres años después, el matemático Hermann Minkowski, que había sido profesor de Einstein en Zúrich, dio un paso decisivo. En una conferencia en la ciudad alemana de Colonia, en septiembre de 1908, mostró que la relatividad especial se vuelve mucho más sencilla si se unen espacio y tiempo en una sola geometría de cuatro dimensiones. Su frase más famosa lo resume: el espacio por sí solo y el tiempo por sí solo están condenados a desvanecerse como sombras, y solo una unión de ambos conservará realidad.",
      "Al principio, Einstein vio la idea de Minkowski como una complicación matemática innecesaria, pero pronto cambió de opinión: sin el espacio-tiempo de cuatro dimensiones no habría podido construir la relatividad general. En esa geometría, lo que un observador mide como espacio otro lo mide en parte como tiempo, y viceversa, igual que dos personas que miran una misma mesa desde ángulos distintos le ven anchos diferentes, aunque la mesa sea exactamente la misma.",
      "Así, cuando decimos que espacio y tiempo son aspectos de una misma realidad, hablamos de una idea construida entre Einstein y Minkowski. Es un tejido de cuatro dimensiones que no podemos visualizar directamente, y por eso los físicos dibujan diagramas con menos dimensiones. Un agujero de gusano sería una conexión dentro de ese tejido: un camino que une dos eventos, en lugares o incluso épocas distintas, sin pasar por la ruta normal que todos los demás recorremos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Minkowski no llegó a ver el éxito de su idea. Murió de forma repentina en enero de 1909, a los 44 años, por una apendicitis, apenas unos meses después de su célebre conferencia. Se cuenta que, cuando Einstein era su alumno en el Politécnico de Zúrich, Minkowski lo consideraba poco aplicado porque faltaba a muchas clases, y por eso le sorprendió tanto que aquel estudiante revolucionara la física." },
      { label: "Dato Científico", icon: "atom", text: "En el espacio-tiempo de Minkowski existe una cantidad que todos los observadores miden igual, llamada intervalo. Combina la distancia entre dos eventos y el tiempo que los separa, multiplicado por la velocidad de la luz, con un signo menos entre ellos. Gracias a ese signo, el espacio-tiempo no se comporta como la geometría escolar, y aparecen los conos de luz que separan el pasado, el futuro y la región que no puede afectarnos." }
    ],
    fact: "La luz del Sol tarda unos 8 minutos y 20 segundos en llegar a la Tierra. Eso significa que siempre vemos el Sol como era hace poco más de ocho minutos, y a las estrellas lejanas como eran hace años, siglos o milenios. Mirar el cielo nocturno es, literalmente, mirar el pasado en el espacio-tiempo, porque la luz necesita tiempo para recorrer cada distancia que la separa de nuestros ojos.",
  },
  {
    id: "la-curvatura-es-gravedad",
    bannerImage: '/assets/wormhole/infographic_m4/banner_la-curvatura-es-gravedad.webp',
    bannerCaption: "En noviembre de 1915, Einstein presentó las ecuaciones de la relatividad general: la gravedad es la curvatura del espacio-tiempo.",
    title: "La Gravedad Es Curvatura",
    color: '#7D6B8A',
    btnImage: '/assets/wormhole/infographic_m4/btn_la-curvatura-es-gravedad.webp',
    image: '/assets/wormhole/infographic_m4/hero_la-curvatura-es-gravedad.webp',
    content: [
      "En noviembre de 1915, Einstein presentó ante la Academia Prusiana de Ciencias, en Berlín, las ecuaciones finales de la relatividad general. Su idea central cambió para siempre nuestra visión de la gravedad: la masa y la energía curvan el espacio-tiempo, y esa curvatura es lo que sentimos como gravedad. Para Isaac Newton la gravedad era una fuerza misteriosa que actuaba a distancia; para Einstein es la forma misma del escenario donde ocurre todo lo que existe.",
      "Los objetos que se mueven libremente siguen las trayectorias más rectas posibles dentro de ese espacio-tiempo curvo, que los matemáticos llaman geodésicas. En una superficie plana, una geodésica es una línea recta; sobre una esfera como la Tierra es un arco de círculo máximo, y por eso las rutas de los aviones que cruzan océanos parecen curvas en los mapas planos. Del mismo modo, la Tierra gira alrededor del Sol porque sigue una geodésica en el espacio-tiempo deformado por la masa solar.",
      "Para imaginarlo se usa a menudo una tela elástica tensa con una bola pesada en el centro. La tela se hunde, y una canica lanzada cerca de la bola rueda siguiendo una curva, como un planeta en órbita. La analogía ayuda, pero tiene límites: en ella la canica cae porque la gravedad de la Tierra tira hacia abajo, y además solo muestra la curvatura del espacio. En la realidad, para objetos lentos lo más importante es la curvatura del tiempo, que hace que los relojes cerca de grandes masas marchen más despacio.",
      "La primera prueba de la nueva teoría llegó de inmediato con el planeta Mercurio. En 1859, el astrónomo francés Urbain Le Verrier había notado que el punto de la órbita de Mercurio más cercano al Sol avanza un poco más de lo que predecía Newton. El valor aceptado de ese exceso es de unos 43 segundos de arco por siglo, una cantidad diminuta. En 1915 Einstein obtuvo con sus ecuaciones justamente ese valor, y contó después que la emoción le provocó palpitaciones durante días.",
      "Si la masa curva el espacio-tiempo, surge una pregunta natural: ¿cuánto puede curvarse? Cerca de la Tierra la curvatura es suave, mientras que alrededor de una estrella de neutrones o de un agujero negro se vuelve extrema. Los agujeros de gusano llevan esa idea todavía más lejos: no se trata solo de doblar el tejido, sino de que forme un túnel que conecte dos regiones lejanas. Las ecuaciones de Einstein permiten escribir esas geometrías; la gran duda es si la naturaleza las fabrica."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El principio de equivalencia fue la pista que llevó a Einstein a la relatividad general. En 1907 se le ocurrió lo que más tarde llamó la idea más feliz de su vida: una persona en caída libre no siente su propio peso. Dentro de un ascensor que cae, todo flota igual que en el espacio. Por eso la gravedad y la aceleración resultan indistinguibles a pequeña escala, y la gravedad puede entenderse como geometría." },
      { label: "Dato Científico", icon: "atom", text: "Las ecuaciones de campo de Einstein se escriben de forma muy compacta, pero equivalen a diez ecuaciones acopladas y muy difíciles de resolver. De un lado describen la curvatura del espacio-tiempo y del otro la materia y la energía que contiene. Por eso, para estudiar agujeros de gusano, los físicos suelen trabajar al revés: primero eligen la forma del túnel y después calculan qué materia haría falta para sostenerlo." }
    ],
    fact: "En septiembre de 2015, los detectores LIGO, en Estados Unidos, captaron por primera vez ondas gravitacionales: diminutas ondulaciones del espacio-tiempo producidas por el choque de dos agujeros negros a unos 1,300 millones de años luz. La señal estiró y encogió los brazos de 4 kilómetros del detector menos de una milésima del tamaño de un protón, y confirmó que el propio espacio-tiempo puede vibrar.",
  },
  {
    id: "pruebas-eclipse-y-gps",
    bannerImage: '/assets/wormhole/infographic_m4/banner_pruebas-eclipse-y-gps.webp',
    bannerCaption: "El 29 de mayo de 1919, durante un eclipse total, se midió que la luz estelar se curva al pasar junto al Sol, como predijo Einstein.",
    title: "La Prueba del Eclipse y el GPS",
    color: '#9A8A5E',
    btnImage: '/assets/wormhole/infographic_m4/btn_pruebas-eclipse-y-gps.webp',
    image: '/assets/wormhole/infographic_m4/hero_pruebas-eclipse-y-gps.webp',
    content: [
      "La relatividad general hacía una predicción que se podía comprobar: la luz de una estrella lejana debía desviarse al pasar cerca del Sol, porque viaja por el espacio-tiempo curvado por su masa. Einstein calculó una desviación de 1.75 segundos de arco para un rayo que rozara el borde solar, el doble de lo que se obtenía con un razonamiento basado en Newton. El problema era ver estrellas junto al Sol, porque su brillo lo impide durante el día.",
      "La solución fue esperar un eclipse total, cuando la Luna tapa el disco solar y el cielo se oscurece. El astrónomo real británico Frank Dyson organizó dos expediciones para el eclipse del 29 de mayo de 1919. Arthur Eddington viajó a la isla de Príncipe, frente a la costa occidental de África, y otro equipo se instaló en Sobral, en el norte de Brasil. Ambos fotografiaron las estrellas del cúmulo de las Híades, que ese día quedaban muy cerca del Sol en el cielo.",
      "Después compararon esas fotografías con otras del mismo grupo de estrellas tomadas meses antes, de noche, cuando el Sol estaba en otra parte del cielo. Las estrellas cercanas al Sol aparecían ligeramente desplazadas, y la desviación medida coincidía mejor con la predicción de Einstein que con la de Newton. Los resultados se anunciaron el 6 de noviembre de 1919 en Londres, y al día siguiente los periódicos hablaban de una revolución en la ciencia.",
      "Las mediciones de 1919 tenían errores grandes, y algunos historiadores han discutido si eran tan concluyentes como se dijo. Por eso los astrónomos repitieron la prueba en eclipses posteriores y, desde finales de los años sesenta, con radiotelescopios que miden la desviación de las ondas de radio de quásares lejanos. Hoy sabemos que Einstein tenía razón con una precisión mejor que una parte en mil. Ese mismo efecto, llamado lente gravitacional, permite ver galaxias lejanas amplificadas por otras.",
      "La curvatura del tiempo también se ha medido aquí en la Tierra. En 1959, Robert Pound y Glen Rebka enviaron rayos gamma por una torre de 22.5 metros en la Universidad de Harvard y detectaron el diminuto cambio de frecuencia causado por la gravedad. Hoy el sistema GPS depende del mismo fenómeno: sus satélites viajan muy rápido y lejos de la superficie, donde el espacio-tiempo está menos curvado y el tiempo corre distinto. Sin corregir esos efectos, sus posiciones fallarían varios kilómetros al día."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las noticias de 1919 convirtieron a Einstein en una celebridad mundial casi de la noche a la mañana. El diario londinense The Times tituló «Revolución en la ciencia» y, pocos días después, The New York Times publicó que las luces del cielo estaban «todas torcidas». Desde entonces, su rostro y su cabello despeinado se volvieron el símbolo popular del genio científico en todo el planeta." },
      { label: "Dato Científico", icon: "atom", text: "En 1979 se descubrió la primera lente gravitacional: el llamado quásar doble Q0957+561, que en realidad es un solo quásar cuya luz se divide en dos imágenes por la gravedad de una galaxia que está delante. Cuando la alineación entre la fuente, la lente y la Tierra es casi perfecta, la imagen se convierte en un círculo de luz llamado anillo de Einstein, y hoy se conocen cientos de ellos." }
    ],
    fact: "En 1976, la misión Gravity Probe A lanzó en un cohete un reloj atómico de hidrógeno hasta unos 10,000 kilómetros de altura y lo comparó con un reloj idéntico en tierra. El reloj en altura avanzó más rápido, tal como predice la relatividad general, con una coincidencia de alrededor de 70 partes por millón. Durante décadas fue la medición más precisa del efecto de la gravedad sobre el paso del tiempo.",
  },
  {
    id: "topologia-del-espacio",
    bannerImage: '/assets/wormhole/infographic_m4/banner_topologia-del-espacio.webp',
    bannerCaption: "Para la topología, una taza con asa y una dona son la misma figura: ambas tienen exactamente un agujero.",
    title: "Topología: La Forma Que No Cambia",
    color: '#5E7D6A',
    btnImage: '/assets/wormhole/infographic_m4/btn_topologia-del-espacio.webp',
    image: '/assets/wormhole/infographic_m4/hero_topologia-del-espacio.webp',
    content: [
      "La topología es una rama de las matemáticas que estudia las propiedades de las formas que no cambian cuando las deformamos con suavidad, sin cortar ni pegar. Puedes estirar, aplastar o doblar una figura de plastilina, y para la topología sigue siendo la misma. Lo que importa no son las distancias ni los ángulos, sino propiedades más profundas, como cuántos agujeros tiene un objeto o si está hecho de una sola pieza o de varias piezas separadas.",
      "El ejemplo favorito de los matemáticos es la taza de café y la dona. Si tuvieras una taza de plastilina, podrías ir aplastándola poco a poco hasta convertirla en una dona sin romperla, porque ambas tienen exactamente un agujero: el asa de la taza y el centro de la dona. En cambio, una pelota no puede convertirse en dona sin perforarla. Por eso los topólogos dicen, en broma, que no saben distinguir su taza de café de su desayuno.",
      "Esta rama tiene una historia larga. En 1736, Leonhard Euler resolvió el problema de los siete puentes de Königsberg, en Prusia, y mostró que no se podían cruzar todos una sola vez en un mismo paseo. Para lograrlo ignoró distancias y formas, y se fijó solo en las conexiones, una manera de pensar muy topológica. En 1847, el alemán Johann Benedict Listing usó por primera vez la palabra topología, y a finales del siglo XIX Henri Poincaré la convirtió en una disciplina formal.",
      "¿Por qué importa esto para los agujeros de gusano? Curvar el espacio-tiempo, como hace el Sol, no cambia su topología, igual que doblar una hoja de papel no la perfora. Un agujero de gusano, en cambio, es como añadir un asa al universo: un tubo que une dos zonas que antes solo se conectaban por el camino largo. Los matemáticos dicen que un espacio así es múltiplemente conexo, porque contiene caminos que no se pueden deformar unos en otros sin atravesar el túnel.",
      "Crear un agujero de gusano donde antes no había nada exigiría cambiar la topología del espacio, y eso parece muy difícil. En 1967, el físico Robert Geroch demostró un teorema importante: en la relatividad general clásica, un cambio de topología en una región limitada solo puede ocurrir si aparecen curvas temporales cerradas, es decir, caminos hacia el pasado, o si el espacio-tiempo deja de ser regular. Por eso muchos físicos creen que, de existir, los agujeros de gusano tendrían un origen cuántico o primordial."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La conjetura de Poincaré, planteada en 1904, preguntaba si toda forma de tres dimensiones cerrada y sin agujeros es, en esencia, una esfera. Durante casi un siglo nadie pudo demostrarla. Lo logró el matemático ruso Grigori Perelman entre 2002 y 2003, y después rechazó tanto la Medalla Fields en 2006 como el premio de un millón de dólares que le ofreció el Instituto Clay en 2010." },
      { label: "Dato Científico", icon: "atom", text: "La cinta de Möbius, descrita en 1858 por August Ferdinand Möbius y, de forma independiente, por Johann Benedict Listing, es una tira de papel a la que se le da media vuelta antes de pegar sus extremos. Tiene una sola cara y un solo borde: si dibujas una línea por el centro sin levantar el lápiz, recorres toda la cinta y vuelves al punto de partida habiendo pasado por ambos «lados»." }
    ],
    fact: "Los topólogos clasifican las superficies cerradas según su número de agujeros, al que llaman género. Una esfera tiene género cero, una dona tiene género uno y un pretzel con tres agujeros tiene género tres. De forma parecida, cada agujero de gusano que conectara dos regiones de un mismo universo le añadiría un asa más a la forma total del espacio, haciendo más compleja su topología.",
  },
  {
    id: "espuma-cuantica",
    bannerImage: '/assets/wormhole/infographic_m4/banner_espuma-cuantica.webp',
    bannerCaption: "Wheeler propuso que, a escalas de unos 10 elevado a menos 35 metros, el espacio-tiempo podría bullir como una espuma.",
    title: "La Espuma Cuántica de Wheeler",
    color: '#8A5F66',
    btnImage: '/assets/wormhole/infographic_m4/btn_espuma-cuantica.webp',
    image: '/assets/wormhole/infographic_m4/hero_espuma-cuantica.webp',
    content: [
      "Hasta ahora hemos hablado del espacio-tiempo como una tela suave. Pero la física cuántica, que describe el mundo de los átomos y las partículas, dice que a escalas muy pequeñas nada está completamente quieto. Por el principio de incertidumbre de Werner Heisenberg, formulado en 1927, la energía de una región diminuta del espacio fluctúa sin parar. Wheeler se preguntó qué le pasaría a la geometría del espacio-tiempo si también estuviera sujeta a esas fluctuaciones.",
      "Su respuesta, desarrollada desde mediados de los años cincuenta, fue sorprendente. Si miráramos el espacio con un microscopio imposible, cada vez más potente, primero lo veríamos liso, como el mar visto desde un avión. Al acercarnos muchísimo aparecerían olas cada vez más agitadas, y en la escala más pequeña el espacio-tiempo se volvería turbulento, con burbujas y túneles diminutos que se forman y desaparecen sin cesar. Wheeler llamó a esa estructura espuma cuántica.",
      "La escala donde ocurriría esto se llama escala de Planck, en honor al físico alemán Max Planck, que en 1899 propuso un sistema de unidades basado en constantes fundamentales de la naturaleza. La longitud de Planck mide unos 1.6 por 10 elevado a menos 35 metros, y el tiempo de Planck, unos 5.4 por 10 elevado a menos 44 segundos, que es lo que tarda la luz en recorrer esa distancia. Son cantidades tan pequeñas que ninguna tecnología actual puede explorarlas directamente.",
      "En la espuma de Wheeler, los microagujeros de gusano serían parte del paisaje normal del vacío, abriéndose y cerrándose en tiempos de Planck. Algunos físicos se han preguntado si una civilización muy avanzada podría atrapar uno de ellos y agrandarlo hasta un tamaño útil, una posibilidad que Morris y Thorne mencionaron en 1988. Nadie sabe cómo hacerlo, y ni siquiera es seguro que la espuma exista: para describirla haría falta una teoría completa de la gravedad cuántica.",
      "Aunque no podemos ver la escala de Planck, sí podemos buscar huellas indirectas. Si el espacio-tiempo fuera espumoso, la luz de distintas energías podría viajar a velocidades ligeramente diferentes al cruzar distancias enormes. En 2009, el telescopio espacial Fermi observó un estallido de rayos gamma llamado GRB 090510, cuya luz viajó miles de millones de años, y sus fotones de alta y baja energía llegaron casi juntos, descartando las versiones más simples de ese efecto."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La palabra «espuma» no es casual. Wheeler comparaba el espacio-tiempo con la superficie del océano: vista desde un avión parece lisa, vista desde un barco está llena de olas y, de muy cerca, se convierte en espuma blanca con burbujas que nacen y revientan. Le gustaba usar estas imágenes porque permitían a cualquier persona imaginar ideas que, escritas en ecuaciones, solo entienden los especialistas." },
      { label: "Dato Científico", icon: "atom", text: "En 1947, Willis Lamb y Robert Retherford midieron un desplazamiento diminuto entre dos niveles de energía del átomo de hidrógeno que, según la teoría de entonces, debían ser idénticos. La explicación es que el electrón interactúa con las fluctuaciones del vacío cuántico. Este desplazamiento de Lamb fue una prueba clave de que el vacío no está realmente vacío, y Lamb recibió por él el Premio Nobel de Física en 1955." }
    ],
    fact: "El acelerador de partículas más potente del mundo, el Gran Colisionador de Hadrones del CERN, cerca de Ginebra, tiene un túnel circular de 27 kilómetros y alcanza energías de 13.6 teraelectronvoltios en sus choques. Para explorar directamente la escala de Planck haría falta una energía casi mil billones de veces mayor, algo imposible de lograr con cualquier máquina que podamos imaginar hoy.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM4)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6A7F99", "#8C7A6B", "#5F7F8C", "#7D6B8A", "#9A8A5E", "#5E7D6A", "#8A5F66"];
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
          <linearGradient id="gradWormholeM4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DEL PUENTE DE 1935 A LA ESPUMA CUÁNTICA</text>
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
          layoutId="activeDotWormholeM4"
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
export default function InteractiveInfographic_WormholeM4() {
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
              🏆 Einstein-Rosen, Wheeler, el espacio-tiempo curvo y la topología del cosmos
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
