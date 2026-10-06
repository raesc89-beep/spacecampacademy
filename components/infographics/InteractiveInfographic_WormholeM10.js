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
  "Morris, M. S. & Thorne, K. S. (1988). «Wormholes in spacetime and their use for interstellar travel: A tool for teaching general relativity». American Journal of Physics 56, 395–412.",
  "Kruskal, M. D. (1960). «Maximal Extension of Schwarzschild Metric». Physical Review 119, 1743–1745.",
  "Penrose, R. (1965). «Gravitational Collapse and Space-Time Singularities». Physical Review Letters 14, 57–59.",
  "Hawking, S. W. (1975). «Particle Creation by Black Holes». Communications in Mathematical Physics 43, 199–220.",
  "Hawking, S. W. (1976). «Breakdown of Predictability in Gravitational Collapse». Physical Review D 14, 2460–2473.",
  "Page, D. N. (1993). «Information in Black Hole Radiation». Physical Review Letters 71, 3743–3746.",
  "Smolin, L. (1992). «Did the Universe Evolve?». Classical and Quantum Gravity 9, 173–191.",
  "Event Horizon Telescope Collaboration (2022). «First Sagittarius A* Event Horizon Telescope Results. I.». The Astrophysical Journal Letters 930, L12.",
  "GRAVITY Collaboration (2018). «Detection of the gravitational redshift in the orbit of the star S2 near the Galactic centre massive black hole». Astronomy & Astrophysics 615, L15."
];

const INFOGRAPHIC_NODES = [
  {
    id: "viaje-de-diseno",
    bannerImage: '/assets/wormhole/infographic_m10/banner_viaje-de-diseno.webp',
    bannerCaption: "Morris y Thorne diseñaron en 1988 un túnel teórico donde la marea nunca supera la gravedad terrestre y el viaje resulta cómodo.",
    title: "Un viaje de diseño: el túnel ideal",
    color: '#5D7383',
    btnImage: '/assets/wormhole/infographic_m10/btn_viaje-de-diseno.webp',
    image: '/assets/wormhole/infographic_m10/hero_viaje-de-diseno.webp',
    content: [
      "Ahora imagina el caso opuesto al desastre: un agujero de gusano transitable, estabilizado y construido con todo cuidado por una civilización muy avanzada. En 1988, Michael Morris y Kip Thorne se preguntaron qué condiciones debería cumplir un túnel así para que lo cruzara una persona sin sufrir daño. No buscaban un objeto que existiera en la naturaleza, sino una herramienta para enseñar relatividad general, empezando por el viaje deseado y deduciendo la forma del túnel.",
      "Su lista de requisitos era muy concreta. El túnel no debía tener horizonte de eventos, para que el viajero pudiera regresar. Las fuerzas de marea sobre un cuerpo humano debían ser menores que la gravedad de la Tierra. La aceleración que sintiera la nave tampoco debía superar esa gravedad. Y el viaje completo, medido tanto por el viajero como por las estaciones de salida y llegada, debía durar un tiempo razonable, del orden de un año, en lugar de siglos.",
      "Con esos requisitos, el viaje sería sorprendentemente tranquilo. Dentro de la garganta, la nave podría avanzar en caída libre, con la tripulación flotando sin peso, como en la Estación Espacial Internacional. No habría tirones bruscos ni sensación de velocidad: los pasajeros solo verían el cielo cambiar a su alrededor. Si los relojes del túnel marcharan al mismo ritmo que los de fuera, los viajeros llegarían habiendo envejecido lo mismo que quienes los esperaban en casa.",
      "El precio de esa comodidad es enorme. Para mantener abierta la garganta, Morris y Thorne encontraron que se necesitaría un material con una propiedad muy rara: una densidad de energía negativa, al menos para algunos observadores. Los físicos lo llaman «materia exótica». La física cuántica permite pequeñas cantidades de energía negativa, como en el efecto Casimir, pero no se conoce ninguna forma de acumular la cantidad necesaria para sostener un túnel del tamaño de una nave.",
      "Por eso, el túnel ideal es un experimento mental, no un plano de construcción. Sin embargo, ha sido muy útil: obligó a los físicos a estudiar qué leyes de la naturaleza permiten o prohíben ciertos viajes, e impulsó investigaciones sobre la energía negativa, las fluctuaciones cuánticas y la estructura del espacio-tiempo. La lección para un cadete es clara: caer en un agujero de gusano natural y cruzar uno diseñado se diferencian como un accidente y una misión planificada."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La investigación de Morris y Thorne nació de una novela. En 1985, el astrónomo Carl Sagan le pidió a Kip Thorne que revisara la física de su libro «Contacto», donde la protagonista viajaba a través de un agujero negro. Thorne le sugirió usar un agujero de gusano y empezó a estudiar en serio si un túnel así podría existir. De esa consulta surgió toda una línea de investigación." },
      { label: "Dato Científico", icon: "atom", text: "El efecto Casimir, predicho por el físico neerlandés Hendrik Casimir en 1948, aparece entre dos placas metálicas muy cercanas en el vacío. Entre ellas caben menos modos de fluctuación cuántica que afuera, y por eso las placas se atraen. En esa región la densidad de energía es menor que la del vacío normal, es decir, negativa. Steve Lamoreaux lo midió con precisión en 1997." }
    ],
    fact: "En la película «Contact», de 1997, basada en la novela de Carl Sagan, la actriz Jodie Foster interpreta a la astrónoma Ellie Arroway, que viaja por una red de agujeros de gusano. La consulta de Sagan a Thorne fue tan fructífera que el artículo de Morris y Thorne de 1988 se convirtió en una de las referencias más citadas sobre agujeros de gusano transitables.",
  },
  {
    id: "horizonte-sin-retorno",
    bannerImage: '/assets/wormhole/infographic_m10/banner_horizonte-sin-retorno.webp',
    bannerCaption: "El radio del horizonte de un agujero negro crece con su masa: unos 3 km por cada masa solar, sin importar de qué esté hecho.",
    title: "El horizonte de eventos: la puerta sin regreso",
    color: '#7A6C5D',
    btnImage: '/assets/wormhole/infographic_m10/btn_horizonte-sin-retorno.webp',
    image: '/assets/wormhole/infographic_m10/hero_horizonte-sin-retorno.webp',
    content: [
      "Volvamos ahora al caso natural: un agujero de gusano no transitable como el que existe, matemáticamente, dentro de un agujero negro. Lo que lo rodea es el horizonte de eventos, una superficie invisible que marca el punto sin retorno. Fuera de ella, una nave con motores potentes aún podría escapar. Dentro de ella, ni siquiera la luz puede salir. No hay muro ni superficie sólida: si cruzaras el horizonte de un agujero negro grande, no verías ninguna señal que te avisara.",
      "El tamaño del horizonte depende solo de la masa. Se calcula con el radio de Schwarzschild, en honor a Karl Schwarzschild, que en 1916 encontró la primera solución exacta de las ecuaciones de Einstein mientras servía como soldado en la Primera Guerra Mundial. Por cada masa solar, el radio es de unos tres kilómetros. Si comprimieras la Tierra entera hasta convertirla en agujero negro, su horizonte tendría un radio de apenas unos nueve milímetros.",
      "Durante décadas, muchos físicos pensaron que el horizonte era un defecto de las matemáticas. En 1939, Robert Oppenheimer y Hartland Snyder calcularon que una estrella suficientemente masiva, al agotar su combustible, colapsaría sin que nada pudiera detenerla. En 1958, David Finkelstein mostró que el horizonte actúa como una membrana de un solo sentido: las cosas pueden entrar, pero nunca salir. En 1967, John Wheeler popularizó el nombre «agujero negro» para estos objetos.",
      "En 1960, Martin Kruskal y, por separado, George Szekeres encontraron una forma de dibujar el espacio-tiempo completo de un agujero negro ideal, sin rotación y eterno. En ese mapa aparecen dos universos exteriores unidos por el puente de Einstein-Rosen, escondido tras los horizontes. Pero ninguna trayectoria permitida conecta un universo con el otro: cualquier viajero que entre termina en la singularidad. Además, los agujeros negros reales, nacidos de estrellas, ni siquiera tendrían ese segundo universo.",
      "Hoy sabemos que los agujeros negros son reales. En 2015, el observatorio LIGO detectó por primera vez ondas gravitacionales producidas por la fusión de dos agujeros negros, y en 2019 el Telescopio del Horizonte de Eventos mostró la primera imagen de la sombra de uno, en el centro de la galaxia M87. En 2022 presentó la imagen de Sagitario A*, el agujero negro del centro de nuestra Vía Láctea. Son pruebas muy sólidas de que estos objetos extremos existen."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El científico inglés John Michell imaginó en 1783 «estrellas oscuras» tan masivas que la luz no podría escapar de ellas. Usó la gravedad de Newton y la idea de que la luz estaba formada por partículas. Su razonamiento no era correcto en todos los detalles, pero se adelantó más de un siglo a la idea moderna de agujero negro, que solo se entendería bien con la relatividad general." },
      { label: "Dato Científico", icon: "atom", text: "El radio de Schwarzschild se calcula como dos veces la constante de gravitación por la masa, dividido entre la velocidad de la luz al cuadrado. Para el Sol da unos 2.95 kilómetros. Para Sagitario A*, de unos 4 millones de masas solares, resulta del orden de 12 millones de kilómetros, aproximadamente 17 veces el radio del Sol, aunque toda esa masa ocupe un volumen tan pequeño." }
    ],
    fact: "La imagen de Sagitario A* fue presentada el 12 de mayo de 2022 por la colaboración del Telescopio del Horizonte de Eventos, que combina radiotelescopios de todo el planeta, incluido el Gran Telescopio Milimétrico Alfonso Serrano, en México. Al sincronizarlos con relojes atómicos, funcionan como una antena virtual del tamaño de la Tierra, capaz de distinguir detalles minúsculos en el cielo.",
  },
  {
    id: "espacio-y-tiempo-intercambian",
    bannerImage: '/assets/wormhole/infographic_m10/banner_espacio-y-tiempo-intercambian.webp',
    bannerCaption: "Dentro del horizonte, la singularidad deja de ser un lugar y se convierte en un momento de tu futuro, imposible de esquivar.",
    title: "Cuando el espacio y el tiempo cambian de papel",
    color: '#66708A',
    btnImage: '/assets/wormhole/infographic_m10/btn_espacio-y-tiempo-intercambian.webp',
    image: '/assets/wormhole/infographic_m10/hero_espacio-y-tiempo-intercambian.webp',
    content: [
      "Lo más extraño de entrar en un agujero negro no es lo que verías, sino lo que les pasa al espacio y al tiempo. Fuera del horizonte puedes moverte a la izquierda o a la derecha, acercarte o alejarte, pero el tiempo siempre avanza hacia el futuro y no puedes detenerlo. Dentro del horizonte de un agujero negro sin rotación, las ecuaciones muestran que la dirección hacia el centro adquiere ese mismo carácter: avanzar hacia adentro se vuelve tan obligatorio como avanzar en el tiempo.",
      "Por eso, la singularidad no es un lugar que podrías esquivar con un buen piloto. Es un momento en tu futuro, como el día de mañana. Así como no puedes evitar que llegue el martes después del lunes, una vez dentro del horizonte no puedes evitar llegar a la singularidad. Encender los motores no ayuda: los cálculos muestran que acelerar en cualquier dirección solo acortaría el tiempo que te queda. Paradójicamente, el viaje más largo se consigue dejándose caer libremente.",
      "La singularidad es la región donde, según la relatividad general, la curvatura y la densidad se vuelven infinitas. En 1965, el físico británico Roger Penrose demostró un teorema matemático: una vez que se forma una superficie atrapada, de la que ni la luz puede alejarse, la aparición de una singularidad es inevitable bajo condiciones muy generales. Por este trabajo recibió el Premio Nobel de Física en 2020, compartido con Reinhard Genzel y Andrea Ghez.",
      "Genzel y Ghez obtuvieron su parte del premio por descubrir un objeto compacto supermasivo en el centro de nuestra galaxia. Durante casi tres décadas siguieron las órbitas de estrellas que giran alrededor de un punto invisible llamado Sagitario A*. Una de ellas, la estrella S2, completa una vuelta cada 16 años y se acerca a solo unas 120 veces la distancia entre la Tierra y el Sol. Para explicar esas órbitas tan rápidas, el objeto central debe tener unos 4 millones de masas solares.",
      "Muchos físicos piensan que la singularidad no es real, sino una señal de que la relatividad general deja de funcionar en condiciones tan extremas. Cerca del centro, la gravedad actuaría a escalas tan pequeñas que los efectos cuánticos serían importantes, y necesitaríamos una teoría de gravedad cuántica que aún no tenemos. Algunas propuestas sugieren que en lugar de un punto infinito habría una región muy densa pero finita. Nadie lo sabe todavía: es uno de los grandes misterios abiertos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los agujeros negros reales giran, y eso cambia su interior. La solución para un agujero negro en rotación la encontró el matemático neozelandés Roy Kerr en 1963. En ella, la singularidad no es un punto sino un anillo, y aparece un segundo horizonte interior. Muchos físicos creen que esa zona interior sería inestable en un agujero negro real, así que su verdadero aspecto sigue en estudio." },
      { label: "Dato Científico", icon: "atom", text: "En las coordenadas de Schwarzschild, fuera del horizonte la coordenada radial r se comporta como espacio y la coordenada t como tiempo. Al cruzar el horizonte, los signos de los términos de la métrica que las acompañan se invierten. Eso significa que r pasa a comportarse como una coordenada de tiempo cuyo valor solo puede disminuir, de modo que el punto r igual a cero queda en el futuro." }
    ],
    fact: "Roger Penrose también inventó los «diagramas de Penrose», mapas que comprimen todo el espacio-tiempo infinito en un dibujo finito, manteniendo los rayos de luz siempre a 45 grados. En ellos se ve de un vistazo qué regiones pueden comunicarse entre sí. Es la herramienta que usan los físicos para mostrar por qué nada escapa de un agujero negro y por qué el puente de Einstein-Rosen no es transitable.",
  },
  {
    id: "cuanto-dura-la-caida",
    bannerImage: '/assets/wormhole/infographic_m10/banner_cuanto-dura-la-caida.webp',
    bannerCaption: "En Sagitario A*, el tiempo máximo entre el horizonte y la singularidad sería de alrededor de un minuto; en M87*, más de un día.",
    title: "¿Cuánto tiempo te quedaría?",
    color: '#7F6A6A',
    btnImage: '/assets/wormhole/infographic_m10/btn_cuanto-dura-la-caida.webp',
    image: '/assets/wormhole/infographic_m10/hero_cuanto-dura-la-caida.webp',
    content: [
      "Supongamos que cruzas el horizonte de un agujero negro supermasivo. ¿Cuánto tiempo pasaría en tu reloj antes de llegar a la singularidad? La relatividad general permite calcularlo. Para un agujero negro sin rotación, el tiempo máximo posible es proporcional a su masa: cuanto más masivo, más tiempo te queda. Ese máximo se alcanza si te dejas caer libremente desde el horizonte, sin encender motores. En agujeros negros de masa estelar, todo terminaría en una fracción de milisegundo.",
      "Para Sagitario A*, de unos 4 millones de masas solares, el horizonte tiene un radio de unos 12 millones de kilómetros. Aun así, el tiempo máximo de caída desde el horizonte hasta la singularidad es de alrededor de un minuto. Durante ese minuto, las fuerzas de marea crecerían rápidamente hasta volverse destructivas en los últimos instantes. En el horizonte mismo, en cambio, la marea sería tan suave que no sentirías nada fuera de lo común.",
      "En agujeros negros todavía más grandes, el tiempo crece. El agujero negro de la galaxia M87, fotografiado en 2019, tiene unos 6,500 millones de masas solares. Para él, el tiempo máximo de caída sería de más de un día entero. En los agujeros negros más gigantescos conocidos, que superan las diez mil millones de masas solares, el viaje interior podría durar días. Por eso los físicos dicen que, tras cruzar un horizonte supermasivo, se podría sobrevivir minutos o incluso horas.",
      "¿Qué verías durante la caída? La luz del universo exterior seguiría entrando detrás de ti, así que podrías ver las estrellas, aunque muy deformadas y concentradas en una zona del cielo. Hacia el centro todo se vería oscuro. El astrofísico Andrew Hamilton, de la Universidad de Colorado, ha creado simulaciones por computadora que recrean este viaje con las ecuaciones de la relatividad. Lo que nunca verías es la singularidad: como está en tu futuro, ninguna luz puede llegar desde ella hasta ti.",
      "Estos cálculos explican una idea importante: el peligro de un agujero negro no siempre está en el horizonte. En los pequeños, el horizonte está rodeado de mareas mortales; en los gigantes, cruzarlo es casi un paseo, pero el final es igual de inevitable. Por eso los científicos estudian con especial interés los agujeros negros supermasivos: alrededor de su horizonte la física todavía se comporta de forma relativamente tranquila, ideal para poner a prueba nuestras teorías con observaciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La palabra «horizonte» se eligió por una buena razón. Igual que en el mar no puedes ver los barcos que están más allá del horizonte, nadie fuera de un agujero negro puede ver lo que ocurre dentro. La diferencia es que el horizonte del mar se mueve contigo cuando navegas, mientras que el de un agujero negro marca una frontera real en el espacio-tiempo que no depende de quién lo mire." },
      { label: "Dato Científico", icon: "atom", text: "El tiempo propio máximo entre el horizonte y la singularidad de un agujero negro de Schwarzschild es igual a pi multiplicado por la constante de gravitación y la masa, dividido entre el cubo de la velocidad de la luz. Para una masa solar da unos 15 microsegundos; para Sagitario A*, alrededor de un minuto; y para M87*, con sus 6,500 millones de soles, supera las 27 horas." }
    ],
    fact: "La masa de M87* se estimó también a partir de la propia imagen del Telescopio del Horizonte de Eventos: el anillo luminoso mide unos 42 microsegundos de arco, lo que coincide con lo esperado para unos 6,500 millones de soles. Ver un detalle de ese tamaño equivale a distinguir desde la Tierra un objeto del tamaño de una naranja colocado sobre la superficie de la Luna.",
  },
  {
    id: "universos-bebe",
    bannerImage: '/assets/wormhole/infographic_m10/banner_universos-bebe.webp',
    bannerCaption: "En 1992, Lee Smolin propuso que cada agujero negro podría dar origen a un universo nuevo con leyes físicas ligeramente distintas.",
    title: "¿Universos bebé dentro de los agujeros negros?",
    color: '#5F7D74',
    btnImage: '/assets/wormhole/infographic_m10/btn_universos-bebe.webp',
    image: '/assets/wormhole/infographic_m10/hero_universos-bebe.webp',
    content: [
      "Si la singularidad no existe en una teoría completa, ¿qué hay en su lugar? Algunas propuestas audaces sugieren que el colapso podría rebotar y dar lugar a una nueva región de espacio-tiempo en expansión, un «universo bebé» desconectado del nuestro. En 1989, los físicos Valeri Frolov, Moisei Markov y Viatcheslav Mukhanov estudiaron modelos en los que el interior de un agujero negro se convierte en un universo cerrado. Son ideas matemáticas, no observaciones.",
      "En 1992, el físico estadounidense Lee Smolin llevó la idea más lejos con su propuesta de «selección natural cosmológica». Imaginó que cada universo bebé nace con constantes físicas un poco distintas de las de su universo padre, igual que los hijos heredan rasgos de sus padres con pequeñas variaciones. Los universos cuyas leyes favorecen la formación de muchas estrellas y agujeros negros tendrían más «descendencia». Con el tiempo, abundarían los universos parecidos al nuestro.",
      "La idea intenta responder una pregunta profunda: ¿por qué las constantes de la física tienen justo los valores que tienen? Si la fuerza de la gravedad, la masa del electrón o la intensidad de las fuerzas nucleares fueran algo diferentes, quizá no se formarían estrellas duraderas, ni carbono, ni planetas, ni vida. A este aparente «ajuste fino» se le han propuesto varias explicaciones, y la de Smolin es de las más originales porque toma prestado el razonamiento de la evolución de Darwin.",
      "Lo interesante es que Smolin buscó predicciones que se pudieran comprobar. Si nuestro universo estuviera optimizado para producir agujeros negros, cambiar ligeramente cualquier constante debería reducir su número. Una de sus predicciones se refiere a la masa máxima de las estrellas de neutrones, los restos estelares que no llegan a convertirse en agujeros negros. El descubrimiento de estrellas de neutrones de unas dos masas solares forma parte del debate sobre si la idea sobrevive.",
      "Hoy, la selección natural cosmológica es una hipótesis especulativa y minoritaria. No hay manera de observar un universo bebé, porque estaría separado del nuestro por el horizonte. Muchos físicos piensan que no es comprobable en la práctica, mientras otros la valoran como ejemplo de cómo plantear preguntas atrevidas exigiendo predicciones. Para un cadete, la lección es distinguir entre lo establecido, como la existencia de agujeros negros, y lo que todavía es una idea en discusión."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Una de las estrellas de neutrones más masivas medidas con precisión, el púlsar PSR J0740+6620, tiene alrededor de 2.08 masas solares. Concentra toda esa materia en una esfera de unos 25 kilómetros de diámetro, más o menos el tamaño de una ciudad. Una cucharadita de su material pesaría miles de millones de toneladas en la superficie de la Tierra." },
      { label: "Dato Científico", icon: "atom", text: "En el modelo de Frolov, Markov y Mukhanov, la materia que colapsa dentro del agujero negro alcanza una densidad máxima cercana a la densidad de Planck, del orden de 10 elevado a 96 kilogramos por metro cúbico. En lugar de seguir comprimiéndose hasta el infinito, el interior pasa a comportarse como un pequeño universo en expansión, parecido al espacio-tiempo de De Sitter." }
    ],
    fact: "Lee Smolin es uno de los fundadores de la gravedad cuántica de bucles y trabaja en el Instituto Perimeter de Física Teórica, en Canadá. Expuso su idea de los universos bebé para el gran público en el libro «La vida del cosmos», publicado en inglés en 1997, donde también discute cómo la ciencia puede poner a prueba hipótesis sobre el origen de las leyes físicas.",
  },
  {
    id: "mensajes-que-no-salen",
    bannerImage: '/assets/wormhole/infographic_m10/banner_mensajes-que-no-salen.webp',
    bannerCaption: "Para un observador lejano, una sonda que cae parece frenarse y enrojecer junto al horizonte hasta desvanecerse por completo.",
    title: "Mensajes que nunca salen",
    color: '#8A7766',
    btnImage: '/assets/wormhole/infographic_m10/btn_mensajes-que-no-salen.webp',
    image: '/assets/wormhole/infographic_m10/hero_mensajes-que-no-salen.webp',
    content: [
      "Imagina que dejas caer hacia un agujero negro una sonda con una lámpara que parpadea una vez por segundo, y la observas desde una nave segura. Al principio, los destellos llegan casi a tiempo. Pero a medida que la sonda se acerca al horizonte, los destellos se espacian cada vez más: dos segundos, diez, una hora. La luz también se vuelve más rojiza. Esto ocurre porque la luz pierde energía al salir de un pozo de gravedad tan profundo, y el tiempo de la sonda parece transcurrir más lento.",
      "Para el observador lejano, la sonda nunca llega a cruzar el horizonte. Su imagen parece quedarse pegada en el borde, cada vez más tenue y roja, hasta volverse invisible porque su luz se estira a longitudes de onda imposibles de detectar. En cambio, para la sonda no ocurre nada especial: cruza el horizonte en un tiempo finito según su propio reloj. Ambas descripciones son correctas, porque cada una corresponde al punto de vista de un observador distinto.",
      "Ahora imagina que la sonda, ya dentro, envía un mensaje de radio pidiendo ayuda. Ese mensaje nunca llegará afuera. Dentro del horizonte, incluso la luz emitida «hacia afuera» avanza hacia la singularidad, solo que un poco más despacio que la sonda. Esto crea una profunda asimetría: el interior puede recibir información del exterior, porque la luz de las estrellas sigue entrando, pero el exterior nunca puede recibir información del interior.",
      "Esto significa que nadie podrá ver directamente lo que ocurre dentro de un agujero negro, ni siquiera con el telescopio más poderoso imaginable. Lo que los astrónomos observan es el entorno: el gas caliente que gira alrededor, las estrellas que orbitan cerca, las ondas gravitacionales de las fusiones y la sombra que el horizonte proyecta sobre la luz de fondo. Todo lo que sabemos sobre el interior se deduce de forma indirecta, combinando teoría y observaciones del exterior.",
      "Según el llamado «teorema de no pelo», un agujero negro aislado queda descrito por muy pocas cantidades: su masa, su rotación y su carga eléctrica. Todo lo demás sobre la materia que lo formó, ya fueran estrellas, planetas o naves, parece borrarse para el observador exterior. John Wheeler lo resumió con la frase «los agujeros negros no tienen pelo». Esta pérdida aparente de detalles es el punto de partida de uno de los mayores enigmas de la física moderna."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La sombra de M87* fotografiada en 2019 es más grande que el propio horizonte. La gravedad curva la luz que pasa cerca del agujero negro, y eso agranda la zona oscura hasta unas dos veces y media el radio del horizonte. Los astrónomos usan esta relación, predicha por la relatividad general, para calcular la masa del agujero negro a partir del tamaño de su sombra." },
      { label: "Dato Científico", icon: "atom", text: "Para una fuente en reposo cerca de un agujero negro sin rotación, la frecuencia que llega a un observador lejano se multiplica por la raíz cuadrada de uno menos el cociente entre el radio de Schwarzschild y la distancia al centro. Cuando la fuente se acerca al horizonte, esa raíz tiende a cero, y la frecuencia observada también. Por eso su imagen se vuelve cada vez más roja." }
    ],
    fact: "En 2018, el instrumento GRAVITY del Very Large Telescope, en Chile, midió por primera vez el corrimiento al rojo gravitacional en la luz de la estrella S2 cuando pasó lo más cerca de Sagitario A*. La luz llegó ligeramente más roja de lo que predice la física de Newton, justo como anticipaba la relatividad general de Einstein, en uno de los entornos gravitacionales más intensos jamás estudiados.",
  },
  {
    id: "paradoja-de-la-informacion",
    bannerImage: '/assets/wormhole/infographic_m10/banner_paradoja-de-la-informacion.webp',
    bannerCaption: "En 1974, Stephen Hawking calculó que los agujeros negros emiten una radiación muy débil y, con el tiempo, podrían evaporarse.",
    title: "La paradoja de la información de Hawking",
    color: '#6B6F86',
    btnImage: '/assets/wormhole/infographic_m10/btn_paradoja-de-la-informacion.webp',
    image: '/assets/wormhole/infographic_m10/hero_paradoja-de-la-informacion.webp',
    content: [
      "En 1974, Stephen Hawking sorprendió a los físicos al combinar la relatividad general con la mecánica cuántica cerca del horizonte. Descubrió que los agujeros negros no son completamente negros: emiten una radiación muy débil, hoy llamada radiación de Hawking, como si fueran objetos con una temperatura. Cuanto más pequeño es el agujero negro, más caliente está y más rápido radia. Al perder energía, pierde masa, y en un tiempo larguísimo podría evaporarse por completo.",
      "Las cifras son asombrosas. Un agujero negro de una masa solar tendría una temperatura de unas 60 milmillonésimas de grado sobre el cero absoluto, mucho más frío que la radiación de fondo cósmico que llena el universo. Por eso, hoy absorbe más energía de la que emite. Para evaporarse necesitaría alrededor de 10 elevado a 67 años, muchísimo más que la edad actual del universo, de unos 13,800 millones de años. La radiación de Hawking nunca se ha detectado directamente.",
      "Aquí aparece el problema. La mecánica cuántica dice que la información nunca se destruye del todo: en principio, conociendo el estado final, se podría reconstruir el estado inicial. Pero los cálculos de Hawking indicaban que la radiación emitida es térmica, como un ruido sin rastro de lo que cayó. Si el agujero negro se evapora y solo queda ese ruido, la información de todo lo que entró habría desaparecido. En 1976, Hawking planteó formalmente esta contradicción.",
      "Durante décadas, los físicos discutieron. En 1997, Hawking y Kip Thorne apostaron contra John Preskill que la información se perdía. En 2004, Hawking reconoció públicamente que había cambiado de opinión y le entregó a Preskill una enciclopedia de béisbol, «de la cual la información puede recuperarse a voluntad». Thorne no se dio por vencido. Antes, en 1993, Don Page había mostrado cómo debería evolucionar la información en la radiación si se conserva: la llamada curva de Page.",
      "En 2019, varios equipos de investigadores, entre ellos Geoff Penington y el grupo de Ahmed Almheiri, Netta Engelhardt, Donald Marolf y Henry Maxfield, calcularon que la curva de Page puede reproducirse con nuevas herramientas de gravedad cuántica, usando regiones llamadas «islas». Es un avance importante que sugiere que la información sí escapa de alguna manera, pero el mecanismo exacto todavía se discute. La paradoja sigue siendo uno de los grandes misterios abiertos de la física."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La piedra conmemorativa de Stephen Hawking en la Abadía de Westminster, en Londres, lleva grabada la fórmula de la temperatura de los agujeros negros. Sus cenizas fueron depositadas allí en 2018, muy cerca de las tumbas de Isaac Newton y Charles Darwin. Es un homenaje al descubrimiento que unió por primera vez la gravedad, la mecánica cuántica y la termodinámica." },
      { label: "Dato Científico", icon: "atom", text: "La temperatura de Hawking es inversamente proporcional a la masa: es igual a la constante de Planck reducida por la velocidad de la luz al cubo, dividida entre ocho pi por la constante de gravitación, la masa y la constante de Boltzmann. Un agujero negro con algo más de la mitad de la masa de la Luna tendría la misma temperatura que el fondo cósmico, unos 2.7 kelvin." }
    ],
    fact: "En 2016, el físico Jeff Steinhauer, del Technion de Israel, observó en el laboratorio una versión análoga de la radiación de Hawking usando un condensado de Bose-Einstein, un gas de átomos ultrafríos en el que el sonido no puede escapar de cierta región, como la luz en un agujero negro. No es un agujero negro real, pero apoya la idea de que el mecanismo de Hawking funciona.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM10)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5D7383", "#7A6C5D", "#66708A", "#7F6A6A", "#5F7D74", "#8A7766", "#6B6F86"];
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
          <linearGradient id="gradWormholeM10" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">AL OTRO LADO DEL HORIZONTE</text>
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
          layoutId="activeDotWormholeM10"
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
export default function InteractiveInfographic_WormholeM10() {
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
              🏆 Viajero Cuántico · Módulo 10 · Horizontes, singularidades y universos bebé
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
