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
  "Schwarzschild, K. (1916). Über das Gravitationsfeld eines Massenpunktes nach der Einsteinschen Theorie. Sitzungsberichte der Königlich Preussischen Akademie der Wissenschaften, 189-196.",
  "Flamm, L. (1916). Beiträge zur Einsteinschen Gravitationstheorie. Physikalische Zeitschrift, 17, 448-454.",
  "Oppenheimer, J. R., & Snyder, H. (1939). On Continued Gravitational Contraction. Physical Review, 56(5), 455-459.",
  "Kruskal, M. D. (1960). Maximal Extension of Schwarzschild Metric. Physical Review, 119(5), 1743-1745.",
  "Kerr, R. P. (1963). Gravitational Field of a Spinning Mass as an Example of Algebraically Special Metrics. Physical Review Letters, 11(5), 237-238.",
  "Hawking, S. W. (1974). Black hole explosions? Nature, 248, 30-31.",
  "Event Horizon Telescope Collaboration (2022). First Sagittarius A* Event Horizon Telescope Results. I. The Shadow of the Supermassive Black Hole in the Center of the Milky Way. The Astrophysical Journal Letters, 930(2), L12.",
  "Miller-Jones, J. C. A., et al. (2021). Cygnus X-1 contains a 21-solar mass black hole: Implications for massive star winds. Science, 371(6533), 1046-1049.",
  "Thorne, K. S. (1994). Black Holes and Time Warps: Einstein's Outrageous Legacy. W. W. Norton & Company."
];

const INFOGRAPHIC_NODES = [
  {
    id: "schwarzschild-carta-desde-el-frente",
    bannerImage: '/assets/wormhole/infographic_m3/banner_schwarzschild-carta-desde-el-frente.webp',
    bannerCaption: "Karl Schwarzschild envió su solución a Einstein en diciembre de 1915 desde el frente ruso; Einstein la presentó en enero de 1916.",
    title: "1916: una solución escrita en el frente de guerra",
    color: '#4F5D73',
    btnImage: '/assets/wormhole/infographic_m3/btn_schwarzschild-carta-desde-el-frente.webp',
    image: '/assets/wormhole/infographic_m3/hero_schwarzschild-carta-desde-el-frente.webp',
    content: [
      "La idea de un astro del que la luz no puede escapar es más antigua que la relatividad. En 1783, el clérigo y científico inglés John Michell razonó con la física de Newton que una estrella con la misma densidad que el Sol, pero unas 500 veces más grande, tendría una gravedad tan intensa que ni la luz podría alejarse de ella. Llamó a estos objetos «estrellas oscuras». Pocos años después, en 1796, el francés Pierre-Simon Laplace llegó a una conclusión parecida. Pero sin una teoría correcta de la gravedad, la idea quedó olvidada.",
      "Esa teoría llegó en noviembre de 1915, cuando Einstein presentó las ecuaciones de la relatividad general. Eran tan complicadas que el propio Einstein solo había podido resolverlas de forma aproximada. Sin embargo, apenas unas semanas después, el astrónomo alemán Karl Schwarzschild encontró una solución exacta. Schwarzschild, director del Observatorio Astrofísico de Potsdam, se había alistado como voluntario en el ejército alemán a pesar de tener más de cuarenta años, y servía como oficial de artillería en el frente ruso.",
      "El 22 de diciembre de 1915, Schwarzschild escribió a Einstein una carta con su resultado: la descripción exacta del espacio-tiempo alrededor de una masa esférica que no gira. Einstein respondió sorprendido de que el problema pudiera resolverse de una manera tan sencilla, y el 13 de enero de 1916 presentó el trabajo ante la Academia Prusiana de Ciencias en nombre de su autor. Poco después, Schwarzschild enfermó de pénfigo, una rara enfermedad de la piel, y murió el 11 de mayo de 1916, con solo 42 años.",
      "La solución de Schwarzschild contenía una distancia muy especial, hoy llamada radio de Schwarzschild. Si toda la masa de un objeto se comprimiera dentro de una esfera de ese radio, ni la luz podría escapar de ella. El radio depende solo de la masa: se obtiene multiplicando la masa por dos veces la constante de gravitación y dividiendo entre el cuadrado de la velocidad de la luz. En aquella época, casi nadie, ni siquiera Schwarzschild o Einstein, creía que un objeto real pudiera comprimirse tanto. Parecía una rareza de las matemáticas.",
      "Ese mismo año, el físico austriaco Ludwig Flamm, de Viena, publicó un análisis geométrico de la solución. Mostró que, si se representa una rebanada del espacio de Schwarzschild, su forma se parece a un embudo curvado, una superficie conocida hoy como paraboloide de Flamm. Esa forma sugería que la geometría podía continuar más allá de la cintura del embudo, hacia otra región. Pasarían casi veinte años hasta que Einstein y Rosen retomaran esta idea, y varias décadas más hasta que los físicos entendieran de verdad qué significaba."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Karl Schwarzschild fue un científico extraordinariamente versátil: además de relatividad, trabajó en óptica, en fotografía astronómica y en el estudio de las atmósferas de las estrellas. Su hijo, Martin Schwarzschild, también fue un astrofísico célebre. Salió de Alemania en 1937 y, como profesor en la Universidad de Princeton, en Estados Unidos, se convirtió en uno de los grandes expertos en la evolución de las estrellas." },
      { label: "Dato Científico", icon: "atom", text: "Ludwig Flamm estaba unido por familia a otro gigante de la física: se casó con Elsa, hija de Ludwig Boltzmann, el científico que explicó el calor y la entropía a partir del movimiento de los átomos. Flamm fue durante muchos años profesor de física en la Universidad Técnica de Viena. Su análisis de 1916 es considerado hoy uno de los primeros antecedentes matemáticos de los agujeros de gusano." }
    ],
    fact: "La velocidad de escape es la velocidad mínima que necesita un objeto para alejarse para siempre de un astro sin seguir impulsándose. En la Tierra es de unos 11.2 kilómetros por segundo, y en la superficie del Sol, de unos 618. En el radio de Schwarzschild, la velocidad de escape iguala a la de la luz. Curiosamente, la fórmula de Newton para la velocidad de escape da el mismo radio que la relatividad general, aunque el razonamiento de fondo sea muy distinto.",
  },
  {
    id: "horizonte-de-eventos",
    bannerImage: '/assets/wormhole/infographic_m3/banner_horizonte-de-eventos.webp',
    bannerCaption: "El horizonte de eventos, o de sucesos, es la frontera de un agujero negro: lo que lo cruza hacia dentro ya no puede volver a salir.",
    title: "El horizonte de eventos: la frontera sin retorno",
    color: '#735F4F',
    btnImage: '/assets/wormhole/infographic_m3/btn_horizonte-de-eventos.webp',
    image: '/assets/wormhole/infographic_m3/hero_horizonte-de-eventos.webp',
    content: [
      "Un agujero negro es una región del espacio-tiempo donde la gravedad es tan intensa que nada puede escapar de ella, ni siquiera la luz. Su frontera se llama horizonte de eventos, también conocido como horizonte de sucesos. No es una superficie sólida ni una pared: es una frontera invisible en el espacio. Desde fuera es posible acercarse a ella y alejarse de nuevo, pero una vez que algo la cruza hacia dentro, todos sus caminos posibles conducen hacia el interior. Es un viaje de ida, sin billete de regreso.",
      "El nombre tiene una lógica. Un evento o suceso, en física, es algo que ocurre en un lugar y un momento concretos. Lo que pasa dentro del horizonte no puede enviar ninguna señal hacia fuera, así que para un observador lejano esos sucesos quedan ocultos para siempre, igual que lo que está más allá del horizonte del mar queda fuera de la vista de un marinero. Por eso decimos que un agujero negro es negro: no porque esté pintado de oscuro, sino porque ninguna luz producida en su interior puede llegar hasta nosotros.",
      "Cerca del horizonte ocurren efectos extraños. Según la relatividad general, el tiempo pasa más despacio cuanto más intensa es la gravedad. Si observaras desde lejos a una sonda que cae hacia un agujero negro, la verías moverse cada vez más lentamente, y su luz se volvería cada vez más rojiza y débil, hasta desaparecer. En cambio, para la propia sonda, el tiempo correría con normalidad y cruzaría el horizonte en un instante finito, sin notar ninguna frontera especial si el agujero negro fuera muy grande.",
      "Una idea muy extendida, pero falsa, es que los agujeros negros son aspiradoras cósmicas que se tragan todo lo que hay a su alrededor. Lejos del horizonte, la gravedad de un agujero negro es igual a la de cualquier otro objeto de la misma masa. Si el Sol se convirtiera de repente en un agujero negro de su misma masa, algo que no puede ocurrir porque no tiene masa suficiente, la Tierra seguiría girando en la misma órbita. Lo único que cambiaría es que dejaríamos de recibir su luz y su calor.",
      "Un poco por fuera del horizonte existe otra zona curiosa, la esfera de fotones. Para un agujero negro sin rotación está a una vez y media el radio del horizonte, y allí la gravedad es tan intensa que la luz puede dar vueltas en círculo alrededor del agujero negro. Esas órbitas son inestables: un rayo de luz que pase por allí termina escapando o cayendo. Por este efecto, la sombra que vemos de un agujero negro parece más grande que el propio horizonte, unas dos veces y media su tamaño."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La luz pierde energía al salir de un campo gravitatorio y su color se desplaza hacia el rojo. Este corrimiento al rojo gravitacional se ha medido en la Tierra: en 1959, Robert Pound y Glen Rebka, de la Universidad de Harvard, enviaron rayos gamma a lo largo de una torre de unos 22 metros y comprobaron que su frecuencia cambiaba justo lo que predecía Einstein. Llevado al extremo, el mismo efecto apaga la luz cerca del horizonte." },
      { label: "Dato Científico", icon: "atom", text: "Dentro del horizonte se encuentra, según la relatividad general, la singularidad: un lugar donde la curvatura del espacio-tiempo se vuelve infinita. En 1965, el matemático británico Roger Penrose demostró que, una vez formado un horizonte, la aparición de una singularidad es inevitable según la teoría. Por este trabajo recibió en 2020 el Premio Nobel de Física. Muchos físicos piensan que una futura teoría cuántica de la gravedad cambiará esta imagen." }
    ],
    fact: "Para un agujero negro con la masa del Sol, el horizonte tendría unos 6 kilómetros de diámetro, el tamaño de una ciudad pequeña. El radio crece en proporción directa a la masa: un agujero negro diez veces más masivo tiene un horizonte diez veces más grande. Por eso los agujeros negros supermasivos más grandes que se conocen tienen horizontes mayores que toda la órbita de Neptuno, el planeta más lejano de nuestro sistema solar.",
  },
  {
    id: "colapso-estelar-tipos",
    bannerImage: '/assets/wormhole/infographic_m3/banner_colapso-estelar-tipos.webp',
    bannerCaption: "Las estrellas de unas 20 masas solares o más pueden terminar su vida colapsando y formando un agujero negro de masa estelar.",
    title: "Cómo nacen los agujeros negros",
    color: '#5F7350',
    btnImage: '/assets/wormhole/infographic_m3/btn_colapso-estelar-tipos.webp',
    image: '/assets/wormhole/infographic_m3/hero_colapso-estelar-tipos.webp',
    content: [
      "Durante décadas, los agujeros negros parecieron solo matemáticas. En 1930, el joven físico indio Subrahmanyan Chandrasekhar, que tenía 19 años y viajaba en barco para estudiar en Inglaterra, calculó que una estrella muerta del tipo enana blanca no puede tener más de unas 1.4 veces la masa del Sol. Por encima de ese límite, su propia gravedad la aplastaría. El famoso astrónomo Arthur Eddington se burló públicamente de la idea, pero Chandrasekhar tenía razón, y en 1983 recibió el Premio Nobel de Física.",
      "En 1939, el físico estadounidense Robert Oppenheimer y su estudiante Hartland Snyder dieron un paso más. Calcularon qué le pasaría a una estrella muy masiva que se quedara sin combustible si nada pudiera detener su caída: se contraería sin fin hasta quedar encerrada dentro de su radio de Schwarzschild. Fue la primera descripción de cómo se forma un agujero negro. Su artículo se publicó el 1 de septiembre de 1939, el mismo día en que comenzó la Segunda Guerra Mundial, y pasó casi inadvertido durante años.",
      "Hoy sabemos cómo ocurre. Una estrella brilla porque en su núcleo fusiona elementos ligeros en otros más pesados, y la energía liberada la sostiene contra su propia gravedad. Cuando una estrella de gran masa acumula en su centro un núcleo de hierro, la fusión ya no produce energía y el núcleo se derrumba en menos de un segundo. Muchas de estas estrellas estallan como supernovas y dejan una estrella de neutrones. Pero si el núcleo que queda supera unas dos o tres masas solares, nada puede detener el colapso y nace un agujero negro.",
      "El primer candidato sólido fue Cygnus X-1, una fuente de rayos X en la constelación del Cisne descubierta en 1964 por instrumentos a bordo de un cohete. A comienzos de los años setenta, los astrónomos observaron que una estrella supergigante azul giraba alrededor de un compañero invisible demasiado masivo para ser una estrella de neutrones. Mediciones de 2021 indican que ese compañero tiene unas 21 veces la masa del Sol y está a unos 7,200 años luz. El gas que le roba a la supergigante se calienta tanto que emite rayos X.",
      "Los astrónomos clasifican los agujeros negros por su masa. Los de masa estelar, que nacen de estrellas, tienen desde unas pocas hasta alrededor de cien veces la masa del Sol. Los supermasivos, que se encuentran en el centro de casi todas las galaxias grandes, tienen de millones a miles de millones de masas solares. Entre ambos grupos estarían los de masa intermedia, mucho más difíciles de encontrar; en 2020, LIGO y Virgo anunciaron la formación de uno de unas 142 masas solares a partir de la fusión de otros dos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1974, Kip Thorne y Stephen Hawking hicieron una famosa apuesta sobre Cygnus X-1. Hawking, que había dedicado gran parte de su carrera a los agujeros negros, apostó a que no era uno, como una especie de seguro: si resultaba que no existían, al menos ganaría la apuesta. En 1990, con las pruebas acumuladas durante más de quince años, Hawking reconoció que había perdido y firmó el documento de la apuesta." },
      { label: "Dato Científico", icon: "atom", text: "Una estrella de neutrones es tan densa que una cucharadita de su material pesaría miles de millones de toneladas en la Tierra. Suele tener alrededor de 1.4 veces la masa del Sol comprimida en una esfera de unos 20 kilómetros de diámetro. Es el último escalón antes de un agujero negro: si una estrella de neutrones gana demasiada masa, por ejemplo al robar gas a una compañera, puede colapsar del todo." }
    ],
    fact: "No todas las estrellas grandes terminan igual. Que una estrella acabe como estrella de neutrones o como agujero negro depende no solo de su masa inicial, sino también de cuánta masa pierde en vientos estelares, de si tiene una compañera y de su composición química. Por eso la cifra de unas 20 masas solares es solo orientativa. Algunos astrónomos buscan incluso estrellas que parecen desaparecer sin explotar, convirtiéndose directamente en agujeros negros.",
  },
  {
    id: "sagitario-a-estrella",
    bannerImage: '/assets/wormhole/infographic_m3/banner_sagitario-a-estrella.webp',
    bannerCaption: "Sagitario A*, en el centro de la Vía Láctea, tiene unos 4 millones de masas solares; el EHT publicó su primera imagen en 2022.",
    title: "Sagitario A*: el gigante de nuestra galaxia",
    color: '#6A4F73',
    btnImage: '/assets/wormhole/infographic_m3/btn_sagitario-a-estrella.webp',
    image: '/assets/wormhole/infographic_m3/hero_sagitario-a-estrella.webp',
    content: [
      "En el centro de nuestra galaxia, a unos 27,000 años luz de la Tierra en dirección a la constelación de Sagitario, se esconde un agujero negro supermasivo llamado Sagitario A*. En inglés se lee «A-star» y en español solemos decir «Sagitario A estrella». Su masa equivale a unos cuatro millones de soles. Fue detectado en 1974 como una fuente de ondas de radio muy compacta por los astrónomos Bruce Balick y Robert Brown, usando radiotelescopios del Observatorio Nacional de Radioastronomía de Estados Unidos.",
      "¿Cómo se sabe que hay un agujero negro allí si no se puede ver? Observando a sus vecinas. Desde los años noventa, dos equipos, uno dirigido por el alemán Reinhard Genzel y otro por la estadounidense Andrea Ghez, siguieron durante décadas el movimiento de las estrellas que giran alrededor del centro galáctico. Usaron telescopios infrarrojos, capaces de atravesar el polvo que oculta esa región. Las órbitas revelaron que las estrellas giran alrededor de un objeto invisible, extremadamente compacto y con millones de veces la masa del Sol.",
      "La estrella más famosa de ese grupo se llama S2. Completa una vuelta alrededor de Sagitario A* cada 16 años, y en su punto más cercano, alcanzado en 2018, pasó a unas 120 veces la distancia entre la Tierra y el Sol, a más de 7,000 kilómetros por segundo. Ningún objeto conocido, salvo un agujero negro, puede concentrar tanta masa en un espacio tan pequeño. Por este trabajo, Genzel y Ghez recibieron en 2020 el Premio Nobel de Física, compartido con Roger Penrose.",
      "Ver la silueta de un agujero negro requiere un telescopio enorme. El Telescopio del Horizonte de Sucesos, conocido como EHT, no es un solo aparato: une radiotelescopios repartidos por todo el planeta, desde Hawái y Chile hasta España, la Antártida y México, para que funcionen como una antena del tamaño de la Tierra. En 2019 presentó la primera imagen de un agujero negro, el del centro de la galaxia M87, y el 12 de mayo de 2022 publicó la de Sagitario A*: un anillo brillante de gas caliente rodeando una sombra oscura.",
      "Fotografiar a Sagitario A* fue más difícil que fotografiar a M87*. Aunque está mucho más cerca, es más de mil veces menos masivo, así que el gas que lo rodea da una vuelta completa en minutos y la imagen cambiaba mientras se tomaba. Los datos se recogieron en abril de 2017 y el análisis tardó cinco años. La imagen coincidió con lo que predice la relatividad general para un agujero negro de cuatro millones de masas solares: una nueva prueba de que el corazón de nuestra galaxia alberga uno de estos objetos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Según la comparación del propio equipo del EHT, captar la sombra de Sagitario A* desde la Tierra es tan difícil como ver una dona sobre la superficie de la Luna. El anillo de la imagen mide unos 52 microsegundos de arco. Para lograr esa nitidez, relojes atómicos marcan con enorme precisión los datos de cada observatorio, y los discos duros con la información se transportan en avión hasta los centros donde se combinan." },
      { label: "Dato Científico", icon: "atom", text: "El horizonte de Sagitario A* mediría unos 24 millones de kilómetros de diámetro, unas 17 veces el diámetro del Sol, y cabría con holgura dentro de la órbita de Mercurio. Para su enorme masa, es un agujero negro tranquilo: actualmente consume muy poco gas, por eso brilla poco comparado con los núcleos activos de otras galaxias, que pueden llegar a superar en brillo a todas las estrellas de su galaxia juntas." }
    ],
    fact: "Se cree que casi todas las galaxias grandes tienen un agujero negro supermasivo en su centro, y que galaxia y agujero negro crecen juntos. El de la galaxia M87, a unos 55 millones de años luz, tiene unos 6,500 millones de masas solares. Cómo se formaron tan rápido estos gigantes cuando el universo era joven es una de las preguntas abiertas que hoy investiga el telescopio espacial James Webb.",
  },
  {
    id: "kruskal-puente-no-atravesable",
    bannerImage: '/assets/wormhole/infographic_m3/banner_kruskal-puente-no-atravesable.webp',
    bannerCaption: "En 1960 Kruskal y Szekeres describieron la geometría completa de Schwarzschild: dos regiones exteriores unidas por un puente.",
    title: "Por qué el puente de Einstein-Rosen no se puede cruzar",
    color: '#73504F',
    btnImage: '/assets/wormhole/infographic_m3/btn_kruskal-puente-no-atravesable.webp',
    image: '/assets/wormhole/infographic_m3/hero_kruskal-puente-no-atravesable.webp',
    content: [
      "Durante décadas, los físicos discutieron qué ocurría exactamente en el radio de Schwarzschild. En las coordenadas originales, las ecuaciones parecían volverse infinitas allí. En 1933, el sacerdote y cosmólogo belga Georges Lemaître mostró que ese infinito era solo un problema de la forma de medir, no algo físico. Y en 1960, el estadounidense Martin Kruskal y el húngaro-australiano George Szekeres, de forma independiente, encontraron unas coordenadas que permitían dibujar el espacio-tiempo de Schwarzschild completo, sin cortes.",
      "El mapa completo, llamado diagrama de Kruskal, resultó sorprendente. No mostraba una sola región exterior, la de nuestro universo, sino dos, como dos universos idénticos. Entre ellas aparecían dos regiones interiores: un agujero negro, del que nada puede salir, y un agujero blanco, en el que nada puede entrar. En un instante determinado, las dos regiones exteriores quedan unidas por una garganta: es el puente de Einstein-Rosen visto en toda su historia, desde que se abre hasta que se cierra.",
      "En el diagrama de Kruskal, los rayos de luz se dibujan siempre como líneas inclinadas a 45 grados, y cualquier viajero con masa debe moverse por caminos más empinados que esas líneas. Esto permite ver de un vistazo qué trayectorias son posibles. Y el resultado es claro: no existe ningún camino permitido que vaya de una región exterior a la otra. Para cruzar el puente habría que moverse más rápido que la luz. Cualquier viajero que entre por un lado acabará en la región del agujero negro y, finalmente, en la singularidad.",
      "Dicho de otro modo, el puente se forma y colapsa tan deprisa que ningún objeto, ni siquiera un rayo de luz, puede atravesarlo. Por eso se dice que el agujero de gusano de Einstein-Rosen no es atravesable. No es un problema de tamaño ni de temperatura, sino de geometría y de tiempo: la garganta se estrangula antes de que nada pueda pasar. Esta conclusión, confirmada por el análisis de Robert Fuller y John Wheeler en 1962, convirtió el puente en una lección sobre los límites de la relatividad, no en una puerta hacia otro universo.",
      "Hay otra razón importante. El diagrama de Kruskal describe un agujero negro eterno, que existe desde siempre y para siempre, en un universo vacío. Los agujeros negros reales nacen del colapso de estrellas, y en ese caso la geometría es diferente: la materia de la estrella que cae ocupa el lugar donde estarían el agujero blanco y el segundo universo, como muestra el modelo de Oppenheimer y Snyder. En un agujero negro formado por colapso no existe ningún puente de Einstein-Rosen, ni siquiera uno que se cierre."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La historia del diagrama de Kruskal tiene un giro curioso. Martin Kruskal, experto en física de plasmas, encontró las nuevas coordenadas años antes, pero no les dio importancia y no las publicó. John Wheeler supo del resultado, comprendió su valor y escribió él mismo el artículo, que envió a la revista Physical Review con Kruskal como único autor. Kruskal se enteró cuando el trabajo ya estaba en camino de publicarse." },
      { label: "Dato Científico", icon: "atom", text: "En los años sesenta, Roger Penrose inventó otro tipo de mapa, el diagrama de Penrose, que comprime todo un espacio-tiempo infinito en un dibujo finito sin alterar la inclinación de los rayos de luz. Con él, el horizonte, la singularidad y los infinitos del pasado y del futuro caben en una sola hoja. Estos diagramas se siguen usando para analizar si un agujero de gusano puede atravesarse o no." }
    ],
    fact: "Los agujeros blancos son soluciones válidas de las ecuaciones de Einstein, pero nunca se ha observado ninguno. Serían como la versión al revés en el tiempo de un agujero negro: solo expulsarían materia y luz, y nada podría entrar en ellos. Muchos físicos creen que no pueden formarse en la naturaleza porque serían muy inestables, y que incluso un poco de materia que se acercara a ellos bastaría para hacerlos colapsar en un agujero negro.",
  },
  {
    id: "kerr-agujeros-que-giran",
    bannerImage: '/assets/wormhole/infographic_m3/banner_kerr-agujeros-que-giran.webp',
    bannerCaption: "En 1963 el matemático neozelandés Roy Kerr encontró la solución exacta que describe un agujero negro en rotación.",
    title: "Kerr: los agujeros negros que giran",
    color: '#4F7370',
    btnImage: '/assets/wormhole/infographic_m3/btn_kerr-agujeros-que-giran.webp',
    image: '/assets/wormhole/infographic_m3/hero_kerr-agujeros-que-giran.webp',
    content: [
      "Las estrellas giran, así que los agujeros negros que nacen de ellas también deberían hacerlo. Sin embargo, durante casi medio siglo nadie encontró la solución de las ecuaciones de Einstein para una masa en rotación. Lo logró en 1963 el matemático neozelandés Roy Kerr, que entonces trabajaba en la Universidad de Texas en Austin. Su artículo, de apenas dos páginas, describe lo que hoy llamamos agujero negro de Kerr, y se considera uno de los resultados más importantes de la relatividad general.",
      "Un agujero negro de Kerr tiene una estructura más compleja que el de Schwarzschild. Tiene dos horizontes, uno exterior y otro interior, uno dentro del otro. El exterior es el verdadero horizonte de eventos, la frontera sin retorno. Más adentro del interior, la singularidad ya no es un punto, sino un anillo. Algunos físicos especularon con que un viajero podría pasar a través de ese anillo y salir a otra región del espacio-tiempo, por lo que los agujeros de Kerr se relacionaron pronto con los agujeros de gusano.",
      "Fuera del horizonte exterior hay una región con forma de esfera aplastada llamada ergosfera. Allí, el giro del agujero negro arrastra al propio espacio-tiempo como un remolino arrastra el agua. Dentro de la ergosfera nada puede quedarse quieto respecto a las estrellas lejanas: todo es obligado a girar en el mismo sentido que el agujero negro. Sin embargo, como la ergosfera está fuera del horizonte, todavía es posible escapar de ella. En 1969, Roger Penrose mostró que, en teoría, se podría extraer energía de la rotación aprovechando esta región.",
      "La idea de usar un agujero de Kerr como puerta tiene un problema. Los cálculos de los físicos Eric Poisson y Werner Israel, en 1990, indicaron que el horizonte interior es muy inestable: la radiación y la materia que caen se acumulan allí con una energía cada vez mayor, en un proceso llamado inflación de masa. Es probable que esa región se convierta en una barrera destructiva. Por eso la mayoría de los físicos piensa que tampoco un agujero negro en rotación ofrece un atajo seguro hacia otro lugar del universo.",
      "El arrastre del espacio-tiempo por un cuerpo que gira no es exclusivo de los agujeros negros: la Tierra también lo produce, aunque de forma diminuta. La misión Gravity Probe B de la NASA, con resultados publicados en 2011, midió este efecto con giroscopios en órbita y confirmó la predicción de la relatividad general. Además, según el llamado teorema de no pelo, un agujero negro queda descrito por solo tres números: su masa, su giro y su carga eléctrica. Todo lo demás sobre la materia que lo formó desaparece de la vista."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El agujero negro Gargantúa de la película «Interstellar» es un agujero de Kerr que gira casi a la velocidad máxima permitida por la teoría. Esa rotación explica la forma asimétrica de su imagen y por qué el tiempo pasa tan despacio cerca de él. Muchos agujeros negros reales también giran muy rápido: las mediciones indican que algunos, como el del sistema GRS 1915+105, se acercan al límite teórico de rotación." },
      { label: "Dato Científico", icon: "atom", text: "Los agujeros negros con carga eléctrica se describen con la solución de Reissner-Nordström, encontrada entre 1916 y 1918 por Hans Reissner y Gunnar Nordström. En 1965, Ezra Newman y sus colaboradores hallaron la solución más general, para un agujero negro que gira y tiene carga, llamada de Kerr-Newman. En la práctica, los astrónomos piensan que los agujeros negros reales casi no tienen carga, porque atraerían rápidamente cargas opuestas." }
    ],
    fact: "Gravity Probe B llevaba cuatro giroscopios formados por esferas de cuarzo del tamaño de una pelota de ping-pong, consideradas entre los objetos más redondos fabricados jamás. El arrastre del espacio-tiempo por la Tierra hizo que los ejes de esos giroscopios se desviaran unos 37 milisegundos de arco por año, un ángulo equivalente al grosor de un cabello humano visto a unos 400 metros de distancia.",
  },
  {
    id: "radiacion-hawking-informacion",
    bannerImage: '/assets/wormhole/infographic_m3/banner_radiacion-hawking-informacion.webp',
    bannerCaption: "En 1974 Stephen Hawking predijo que los agujeros negros emiten una débil radiación térmica por efectos cuánticos y pueden evaporarse.",
    title: "La radiación de Hawking y el misterio de la información",
    color: '#706A4F',
    btnImage: '/assets/wormhole/infographic_m3/btn_radiacion-hawking-informacion.webp',
    image: '/assets/wormhole/infographic_m3/hero_radiacion-hawking-informacion.webp',
    content: [
      "Durante años se pensó que nada podía salir de un agujero negro. En 1974, el físico británico Stephen Hawking, de la Universidad de Cambridge, sorprendió a todos al combinar la relatividad general con la mecánica cuántica. Sus cálculos mostraron que, por efectos cuánticos cerca del horizonte, un agujero negro debería emitir una radiación muy débil, como un cuerpo caliente. Hoy se llama radiación de Hawking. Publicó la idea en la revista Nature con un título provocador: «¿Explosiones de agujeros negros?».",
      "Poco antes, en 1972, el físico Jacob Bekenstein, nacido en la Ciudad de México, había propuesto que los agujeros negros tienen entropía, una medida del desorden, proporcional al área de su horizonte. Hawking al principio no estaba de acuerdo, pero sus propios cálculos le dieron la razón a Bekenstein: si un agujero negro tiene entropía, también debe tener temperatura y debe radiar. La temperatura es inversamente proporcional a la masa: cuanto más grande es el agujero negro, más frío está. Uno con la masa del Sol estaría a unas 60 milmillonésimas de grado sobre el cero absoluto.",
      "Al emitir radiación, un agujero negro pierde energía y, por tanto, masa. Con el tiempo podría evaporarse por completo. Pero para los agujeros negros conocidos ese proceso es lentísimo: uno de masa solar tardaría unos 10⁶⁷ años, muchísimo más que la edad actual del universo, de unos 13,800 millones de años. Además, como están más fríos que la radiación de fondo que llena el cosmos, a 2.7 grados sobre el cero absoluto, hoy absorben más energía de la que emiten. Por eso la radiación de Hawking nunca se ha observado directamente.",
      "Los físicos han buscado formas indirectas de ponerla a prueba. En 2016 y 2019, el físico Jeff Steinhauer, del Technion de Israel, creó en su laboratorio un «agujero negro sónico»: un flujo de átomos ultrafríos en el que el sonido no puede escapar de cierta región, igual que la luz no escapa de un horizonte. Observó una radiación de ondas sonoras con las características que predice Hawking. Es un análogo, no un agujero negro real, pero muestra que el mecanismo que Hawking propuso funciona en sistemas físicos reales.",
      "La radiación de Hawking trajo un gran enigma, la paradoja de la información. Según la mecánica cuántica, la información sobre un sistema nunca se destruye del todo: en principio, podría reconstruirse. Pero si un agujero negro se evapora dejando solo radiación térmica, sin rastro de lo que cayó dentro, la información parecería perdida. En 1976, Hawking planteó el problema y durante décadas defendió que la información se pierde. En 2004 cambió de opinión. Hoy la mayoría de los físicos cree que se conserva, pero nadie sabe todavía cómo exactamente."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Stephen Hawking nació en Oxford, Inglaterra, el 8 de enero de 1942, exactamente 300 años después de la muerte de Galileo Galilei. A los 21 años le diagnosticaron una enfermedad degenerativa de las neuronas motoras, conocida como ELA, y los médicos le dieron pocos años de vida. Vivió hasta los 76 y siguió investigando con ayuda de un sintetizador de voz. Su libro «Breve historia del tiempo», de 1988, vendió millones de ejemplares." },
      { label: "Dato Científico", icon: "atom", text: "Los agujeros negros más pequeños serían los más calientes y los que se evaporarían más rápido. Algunos físicos han propuesto que en el universo primitivo pudieron formarse agujeros negros primordiales con la masa de una montaña, de cientos de millones de toneladas. Esos agujeros negros diminutos estarían terminando de evaporarse en nuestra época con un destello final de rayos gamma. Los telescopios espaciales los han buscado, pero hasta ahora no se ha detectado ninguno." }
    ],
    fact: "Una de las pistas para resolver la paradoja es la llamada curva de Page, descrita por el físico Don Page en 1993: si la información se conserva, la radiación debería empezar a revelar lo que cayó dentro cuando el agujero negro ha perdido aproximadamente la mitad de su entropía. En 2019, varios grupos de físicos lograron reproducir esa curva con cálculos teóricos, un avance importante aunque todavía incompleto.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM3)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#4F5D73", "#735F4F", "#5F7350", "#6A4F73", "#73504F", "#4F7370", "#706A4F"];
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
          <linearGradient id="gradWormholeM3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DE SCHWARZSCHILD A HAWKING</text>
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
          layoutId="activeDotWormholeM3"
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
export default function InteractiveInfographic_WormholeM3() {
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
              🏆 Los agujeros negros: la otra cara de la historia de los agujeros de gusano
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
