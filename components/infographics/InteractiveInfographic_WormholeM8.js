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
  "Morris, M. S. y Thorne, K. S. (1988). Wormholes in spacetime and their use for interstellar travel: A tool for teaching general relativity. American Journal of Physics, 56, 395-412.",
  "Pound, R. V. y Rebka, G. A. (1960). Apparent Weight of Photons. Physical Review Letters, 4, 337-341.",
  "Ford, L. H. y Roman, T. A. (1996). Quantum field theory constrains traversable wormhole geometries. Physical Review D, 53, 5496-5507.",
  "Hawking, S. W. (1974). Black hole explosions? Nature, 248, 30-31.",
  "Nicholl, M. et al. (2020). An outflow powers the optical rise of the nearby, fast-evolving tidal disruption event AT2019qiz. Monthly Notices of the Royal Astronomical Society, 499, 482-504.",
  "Maldacena, J. y Susskind, L. (2013). Cool horizons for entangled black holes. Fortschritte der Physik, 61, 781-811.",
  "Event Horizon Telescope Collaboration (2022). First Sagittarius A* Event Horizon Telescope Results. I. The Shadow of the Supermassive Black Hole in the Center of the Milky Way. The Astrophysical Journal Letters, 930, L12.",
  "Thorne, K. S. (1994). Black Holes and Time Warps: Einstein's Outrageous Legacy. W. W. Norton & Company."
];

const INFOGRAPHIC_NODES = [
  {
    id: "travesia-paso-a-paso",
    bannerImage: '/assets/wormhole/infographic_m8/banner_travesia-paso-a-paso.webp',
    bannerCaption: "Un agujero de gusano no acelera la nave más allá de la luz: solo le ofrece un camino mucho más corto entre dos lugares.",
    title: "La Travesía Paso a Paso",
    color: '#5B7A99',
    btnImage: '/assets/wormhole/infographic_m8/btn_travesia-paso-a-paso.webp',
    image: '/assets/wormhole/infographic_m8/hero_travesia-paso-a-paso.webp',
    content: [
      "Imagina que un agujero de gusano ya existe y está estabilizado. Tu nave se acerca a la primera boca a una velocidad normal para una misión espacial. Para la nave más rápida construida hasta ahora, la sonda solar Parker, eso significa unos 690,000 kilómetros por hora en su punto más cercano al Sol, apenas un 0.064 % de la velocidad de la luz. Aunque parezca muchísimo, a esa velocidad llegar a la estrella más cercana tomaría miles de años. El agujero de gusano es lo que cambia las reglas.",
      "La clave es entender qué hace exactamente el túnel. En relatividad, nada puede moverse localmente más rápido que la luz: si en cualquier punto del viaje midieras tu velocidad con una regla y un reloj a tu lado, siempre te daría menos que la velocidad de la luz. El agujero de gusano respeta esa regla. Lo que hace es ofrecer un camino diferente, cuya longitud medida desde dentro puede ser de solo unos kilómetros, aunque las bocas estén separadas por años luz en el espacio exterior.",
      "Hagamos una cuenta sencilla. Si el cuello midiera mil kilómetros y la nave avanzara a diez kilómetros por segundo, una velocidad típica de las sondas actuales, el cruce duraría unos cien segundos, menos de dos minutos. Al salir por la otra boca, la tripulación estaría en otra región de la galaxia. Para un observador que comparara la distancia entre las bocas por fuera con el tiempo del viaje, parecería que la nave fue más rápido que la luz, pero en realidad solo tomó un atajo.",
      "Durante el trayecto, la tripulación vería por delante el cielo del destino, cada vez más grande, y por detrás el cielo de origen, cada vez más pequeño y distorsionado. En un túnel bien diseñado no habría sacudidas violentas: las fuerzas sobre la nave cambiarían de manera gradual. La materia exótica que mantiene abierto el cuello tendría que estar separada del camino de la nave, porque nadie sabe qué efectos tendría el contacto directo con una materia de energía negativa.",
      "Al cruzar el punto más estrecho del cuello, la nave pasaría de la región dominada por la primera boca a la de la segunda. Desde ahí, la gravedad tiraría suavemente hacia la salida. Hay que recordar que todo esto describe soluciones matemáticas de las ecuaciones de Einstein, no observaciones. Sabemos cómo funcionaría el viaje si el túnel existiera, pero no sabemos si la naturaleza permite crear uno, ni si alguno se formó de manera natural en el universo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La sonda solar Parker de la NASA, lanzada en 2018, batió el récord de velocidad de un objeto fabricado por humanos en diciembre de 2024, al pasar a unos 6.1 millones de kilómetros de la superficie del Sol. Aun así, la luz es más de mil quinientas veces más rápida. Esa enorme diferencia explica por qué los viajes interestelares son tan difíciles con cohetes." },
      { label: "Dato Científico", icon: "atom", text: "En relatividad se distingue entre el tiempo propio, que mide el reloj que lleva el viajero, y el tiempo coordenado, que miden observadores lejanos. En el agujero de gusano de Morris y Thorne, ambos tiempos pueden ser parecidos si el túnel está lejos de campos gravitatorios intensos, de modo que la tripulación y quienes la esperan medirían duraciones de viaje similares." }
    ],
    fact: "La estrella más cercana al Sol, Próxima Centauri, está a unos 40 billones de kilómetros. A diez kilómetros por segundo, una nave tardaría más de 120,000 años en llegar. Un agujero de gusano con un cuello de mil kilómetros reduciría el viaje a menos de dos minutos, sin que la nave superara nunca la velocidad de la luz. Esa es la promesa teórica que hace tan atractivos estos túneles.",
  },
  {
    id: "reloj-que-se-congela",
    bannerImage: '/assets/wormhole/infographic_m8/banner_reloj-que-se-congela.webp',
    bannerCaption: "Desde lejos, un objeto que cae a un agujero negro parece frenarse, enrojecer y apagarse sin llegar a cruzar el horizonte.",
    title: "Visto desde Fuera: un Reloj que se Congela",
    color: '#7A6C8F',
    btnImage: '/assets/wormhole/infographic_m8/btn_reloj-que-se-congela.webp',
    image: '/assets/wormhole/infographic_m8/hero_reloj-que-se-congela.webp',
    content: [
      "Para entender por qué un agujero de gusano traversable es tan diferente de un agujero negro, conviene ver qué pasa cuando algo cae en un agujero negro real. Supón que una sonda con una luz parpadeante cae hacia uno, mientras tú la observas desde muy lejos con un telescopio. Al principio verás los destellos a su ritmo normal. Pero a medida que la sonda se acerca al horizonte de eventos, los destellos te llegarán cada vez más separados en el tiempo, como si su reloj se fuera frenando.",
      "Esto ocurre por la dilatación temporal gravitacional. Cerca del horizonte, el tiempo de la sonda pasa muy despacio comparado con el tuyo, y además la luz que emite necesita cada vez más tiempo para escapar del pozo gravitatorio. Desde tu punto de vista, la sonda parecerá acercarse al horizonte sin cruzarlo nunca. Por esta razón, en los años sesenta varios físicos soviéticos llamaban a estos objetos «estrellas congeladas», antes de que se popularizara el nombre de agujero negro.",
      "Al mismo tiempo, la luz de la sonda cambiará de color. Al salir del pozo gravitatorio, cada fotón pierde energía, y en la luz menos energía significa una longitud de onda más larga. La luz azul se vuelve verde, luego roja, después infrarroja y, por último, ondas de radio cada vez más débiles. A este efecto se le llama corrimiento al rojo gravitacional. Además, te llegarán cada vez menos fotones, así que la imagen se apagará rapidísimo hasta volverse invisible.",
      "En la práctica, la sonda no se quedaría pegada a la vista para siempre. Para un agujero negro de pocas masas solares, la luz se debilitaría hasta ser indetectable en mucho menos de un segundo. Lo que permanecería sería solo la huella matemática de la sonda en el horizonte, imposible de observar. Esta es la gran diferencia con un agujero de gusano traversable, donde la luz de la sonda seguiría su camino a través del cuello y aparecería al otro lado sin desaparecer.",
      "Este comportamiento también es una prueba de por qué la frontera de un agujero negro es tan especial. El horizonte no es una superficie sólida, sino el límite a partir del cual ni la luz puede escapar. Un agujero de gusano traversable, por diseño, no tiene horizonte. Por eso, si observaras una sonda cayendo hacia la boca de un agujero de gusano, verías su luz un poco desviada y enrojecida por la gravedad de la boca, pero no la verías congelarse para siempre."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1959, Robert Pound y Glen Rebka midieron por primera vez el corrimiento al rojo gravitacional en la Tierra. Enviaron rayos gamma de arriba abajo por una torre de la Universidad de Harvard de unos 22.5 metros de altura y detectaron un cambio diminuto en su energía, justo el que predecía la relatividad general. Su resultado se publicó en 1960." },
      { label: "Dato Científico", icon: "atom", text: "El corrimiento al rojo gravitacional también se ha medido en estrellas. La luz de la enana blanca Sirio B, compañera de la estrella más brillante del cielo nocturno, llega ligeramente desplazada hacia el rojo por su enorme gravedad superficial. Mediciones con el telescopio espacial Hubble publicadas en 2005 confirmaron ese corrimiento de acuerdo con la relatividad general." }
    ],
    fact: "El nombre «agujero negro» se hizo popular a partir de 1967, cuando el físico John Wheeler lo usó en una conferencia y luego en sus escritos. Antes, en Occidente se hablaba de «objetos colapsados» y en la Unión Soviética de «estrellas congeladas». Ambos nombres antiguos describían bien lo que ve un observador lejano: un objeto que parece detenerse en su propia frontera.",
  },
  {
    id: "cruzar-el-horizonte",
    bannerImage: '/assets/wormhole/infographic_m8/banner_cruzar-el-horizonte.webp',
    bannerCaption: "El horizonte de Sagitario A* mide unos 24 millones de km de diámetro; cruzarlo no se notaría en el momento.",
    title: "Visto desde Dentro: Cruzar sin Notarlo",
    color: '#6B8E7F',
    btnImage: '/assets/wormhole/infographic_m8/btn_cruzar-el-horizonte.webp',
    image: '/assets/wormhole/infographic_m8/hero_cruzar-el-horizonte.webp',
    content: [
      "Ahora cambiemos de punto de vista y viajemos dentro de la sonda que cae. Para ti, como tripulante, el reloj de a bordo funciona perfectamente normal: tu corazón late al mismo ritmo y los minutos duran lo de siempre. No ves nada que se congele. Lo que para el observador lejano parecía una caída eterna, para ti es un viaje de duración finita. Ambos puntos de vista son correctos al mismo tiempo, porque en relatividad el tiempo depende de quién lo mida.",
      "¿Y qué sientes al cruzar el horizonte de eventos? Si el agujero negro es suficientemente grande, absolutamente nada especial. No hay una pared, ni una explosión, ni un letrero que diga «punto sin retorno». Esto se debe al principio de equivalencia de Einstein: una persona en caída libre no siente su propio peso. El horizonte es una frontera definida por la luz, no por la materia, así que no se puede detectar localmente en el instante de cruzarlo.",
      "El tamaño del horizonte depende de la masa del agujero negro: es de unos 3 kilómetros de radio por cada masa del Sol. El agujero negro del centro de nuestra galaxia, Sagitario A*, tiene unos 4 millones de masas solares, así que su horizonte mide alrededor de 12 millones de kilómetros de radio. El de la galaxia M87 tiene unos 6,500 millones de masas solares y un horizonte más grande que la órbita de Neptuno. Ambos han sido fotografiados por el Telescopio del Horizonte de Sucesos.",
      "Pero que no se sienta nada no significa que todo vaya bien. Una vez dentro del horizonte, ningún motor por potente que sea permite salir, porque todas las trayectorias posibles apuntan hacia el centro. Según la relatividad general, el viajero terminaría en la singularidad en un tiempo finito. Para un agujero negro como Sagitario A*, ese tiempo sería, como máximo, de alrededor de un minuto desde el horizonte, sin importar cuánto intentara escapar.",
      "Esta es la diferencia más importante con un agujero de gusano traversable. En el túnel de Morris y Thorne no hay horizonte, así que en cualquier momento el viajero podría dar la vuelta y regresar por donde vino. Tampoco hay singularidad al final del camino, sino otra boca que se abre a un cielo nuevo. Por eso los físicos insisten en que un agujero negro no es un agujero de gusano utilizable, aunque en las películas a veces se confundan."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Einstein llamó al principio de equivalencia «el pensamiento más feliz de mi vida». En 1907 se dio cuenta de que una persona que cae desde un tejado no siente su propio peso. Hoy los astronautas de la Estación Espacial Internacional lo comprueban cada día: flotan no porque no haya gravedad, sino porque están en caída libre continua alrededor de la Tierra." },
      { label: "Dato Científico", icon: "atom", text: "La imagen de Sagitario A* publicada en 2022 por el Telescopio del Horizonte de Sucesos se obtuvo combinando radiotelescopios repartidos por todo el planeta, que funcionaron como una antena virtual del tamaño de la Tierra. La sombra observada coincide con el tamaño predicho por la relatividad general para un agujero negro de unos 4 millones de masas solares." }
    ],
    fact: "La órbita de Neptuno tiene un radio de unos 4,500 millones de kilómetros, unas 30 veces la distancia entre la Tierra y el Sol. El horizonte del agujero negro de M87 es aún mayor: su radio supera los 19,000 millones de kilómetros. Si ese agujero negro estuviera en lugar del Sol, todo el sistema solar planetario quedaría dentro de su horizonte de eventos.",
  },
  {
    id: "espaguetizacion",
    bannerImage: '/assets/wormhole/infographic_m8/banner_espaguetizacion.webp',
    bannerCaption: "Las fuerzas de marea estiran a lo largo y comprimen a lo ancho; en 2019 se observó una estrella destrozada así por un agujero negro.",
    title: "Espaguetización",
    color: '#9C7A5B',
    btnImage: '/assets/wormhole/infographic_m8/btn_espaguetizacion.webp',
    image: '/assets/wormhole/infographic_m8/hero_espaguetizacion.webp',
    content: [
      "La palabra espaguetización suena a broma, pero describe un fenómeno real de la gravedad. Ocurre cuando las fuerzas de marea son tan intensas que estiran un objeto a lo largo y lo aprietan a lo ancho, hasta convertirlo en algo parecido a un largo fideo. La palabra se popularizó gracias a divulgadores como Stephen Hawking, que en su libro «Breve historia del tiempo», de 1988, describió cómo un astronauta que cayera en un agujero negro sería estirado como un espagueti.",
      "Las fuerzas de marea aparecen porque la gravedad se debilita con la distancia. Si caes de pie hacia un agujero negro, tus pies están más cerca que tu cabeza, así que sienten un tirón más fuerte. La diferencia entre ambos tirones te estira. Al mismo tiempo, tus hombros caen hacia el mismo centro desde direcciones un poco distintas, y eso te comprime de lado. Es el mismo efecto que, a escala mucho menor, produce las mareas de los océanos con la Luna.",
      "Lo sorprendente es que los agujeros negros pequeños son los más peligrosos en este sentido. Para un agujero negro de unas diez masas solares, las fuerzas de marea se vuelven mortales para una persona a unos miles de kilómetros del centro, mucho antes de llegar a su horizonte, que mide solo unos 30 kilómetros de radio. En cambio, en el horizonte de un agujero negro supermasivo como Sagitario A*, la diferencia de gravedad entre cabeza y pies sería diminuta e imperceptible.",
      "La espaguetización no es solo teoría. Los astrónomos observan eventos de disrupción de marea, que ocurren cuando una estrella pasa demasiado cerca de un agujero negro supermasivo y es despedazada. En 2019 se detectó el evento AT2019qiz, en una galaxia a unos 215 millones de años luz. Una estrella de masa parecida a la del Sol fue estirada por un agujero negro de alrededor de un millón de masas solares, y parte de su material fue tragado mientras otra parte salía despedida.",
      "Estos eventos producen destellos muy brillantes que duran semanas o meses, y los telescopios pueden estudiar cómo cambian su luz y su temperatura. El caso de AT2019qiz fue especialmente útil porque se descubrió pronto, lo que permitió seguir su evolución desde el principio, según explicó el Observatorio Europeo Austral en 2020. Cada nueva observación de este tipo confirma que las fuerzas de marea predichas por la relatividad general actúan tal como dicen las ecuaciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las fuerzas de marea también actúan en nuestro sistema solar. Io, una luna de Júpiter, se deforma constantemente por la gravedad del planeta y de las otras lunas, y la fricción interna la calienta tanto que es el cuerpo con más actividad volcánica conocida. Y en 1992 el cometa Shoemaker-Levy 9 fue partido en más de veinte fragmentos por la marea de Júpiter." },
      { label: "Dato Científico", icon: "atom", text: "La intensidad de la marea crece muy rápido al acercarse: depende de la masa dividida entre el cubo de la distancia. Como el radio del horizonte crece en proporción a la masa, la marea justo en el horizonte disminuye con el cuadrado de la masa. Por eso un agujero negro mil veces más masivo tiene en su horizonte una marea un millón de veces más suave." }
    ],
    fact: "Las mareas oceánicas de la Tierra se deben a la misma física que la espaguetización. La Luna atrae con más fuerza el océano del lado más cercano que el centro de la Tierra, y al centro más que al océano del lado opuesto. El resultado son dos abultamientos de agua, lo que explica que en muchas costas haya dos mareas altas cada día, aproximadamente cada 12 horas y 25 minutos.",
  },
  {
    id: "tunel-sin-espagueti",
    bannerImage: '/assets/wormhole/infographic_m8/banner_tunel-sin-espagueti.webp',
    bannerCaption: "Un agujero de gusano traversable bien diseñado minimizaría las fuerzas de marea para que el viajero llegue intacto.",
    title: "Un Túnel Diseñado contra las Mareas",
    color: '#8A6F6F',
    btnImage: '/assets/wormhole/infographic_m8/btn_tunel-sin-espagueti.webp',
    image: '/assets/wormhole/infographic_m8/hero_tunel-sin-espagueti.webp',
    content: [
      "Si las fuerzas de marea pueden convertir a un viajero en espagueti, ¿cómo podría alguien atravesar un agujero de gusano sin sufrir ese destino? La respuesta está en el diseño. A diferencia de un agujero negro, cuya forma queda fijada por su masa, un agujero de gusano traversable es una solución que los físicos pueden ajustar en las ecuaciones. Morris y Thorne aprovecharon esa libertad para elegir una geometría en la que las fuerzas de marea fueran pequeñas en todo el recorrido.",
      "El principio es sencillo: las mareas dependen de lo rápido que cambia la gravedad de un punto a otro. Si el cuello es pequeño y muy curvado, la gravedad cambia bruscamente en distancias cortas y estira con fuerza. Si el cuello es amplio y su curvatura cambia poco a poco, la diferencia entre la cabeza y los pies es mínima. Es la misma razón por la que el horizonte de un agujero negro supermasivo es más amable que el de uno pequeño, solo que aquí se elige a propósito.",
      "Además, el viajero no tendría que acercarse a ninguna singularidad, porque en el diseño de Morris y Thorne no existe. En un agujero negro, aunque el horizonte sea amable, la marea crece sin límite al acercarse al centro, y la espaguetización termina ocurriendo tarde o temprano. En el agujero de gusano traversable, la curvatura alcanza su valor máximo en el cuello y luego vuelve a disminuir. El viajero pasaría por la zona más curvada y saldría por la otra boca sin daños.",
      "Este diseño tiene un precio. Para que un ser humano no sea estirado, el cuello tendría que ser grande, y cuanto mayor es la abertura que se quiere mantener, más difícil resulta organizar la energía negativa que la sostiene. En 1996, los físicos Larry Ford y Thomas Roman demostraron que las leyes cuánticas limitan cuánta energía negativa puede acumularse y durante cuánto tiempo, y concluyeron que, para túneles grandes, esa energía tendría que concentrarse en una capa extraordinariamente delgada.",
      "Más tarde se propusieron diseños más ingeniosos. En 2003, Matt Visser, Sayan Kar y Naresh Dadhich mostraron que, en principio, la cantidad total de energía negativa necesaria podría hacerse tan pequeña como se quisiera ajustando la forma del túnel, aunque nunca exactamente cero. Ninguno de estos diseños resuelve todos los problemas, pero muestran que evitar la espaguetización es posible en las ecuaciones. La gran incógnita sigue siendo si la naturaleza permite fabricar la energía negativa necesaria."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los pilotos de cazas y los astronautas entrenan en centrifugadoras que giran a gran velocidad para soportar varias veces la gravedad terrestre. Sin trajes especiales, una persona sentada suele perder la visión o el conocimiento por encima de unos 4 a 6 g sostenidos. Por eso Morris y Thorne eligieron como límite para su túnel fuerzas cercanas a 1 g, la gravedad que sentimos a diario." },
      { label: "Dato Científico", icon: "atom", text: "Las llamadas desigualdades cuánticas, estudiadas por Ford y Roman desde principios de los años noventa, dicen que cuanto más intensa es una región de energía negativa, menos tiempo puede durar o más pequeña tiene que ser. Además, suele ir acompañada de energía positiva cercana que la compensa. Estas reglas son una de las mayores dificultades para estabilizar agujeros de gusano grandes." }
    ],
    fact: "Para el cuerpo humano, lo peligroso no es la gravedad en sí, sino sus diferencias. En caída libre podrías estar cerca de un objeto con una gravedad enorme sin sentir nada, siempre que la gravedad fuera casi igual en tu cabeza y en tus pies. Por eso los astronautas en órbita flotan tranquilos, aunque la gravedad terrestre a 400 kilómetros de altura siga siendo cerca del 90 % de la que hay en el suelo.",
  },
  {
    id: "inestabilidad-cuantica",
    bannerImage: '/assets/wormhole/infographic_m8/banner_inestabilidad-cuantica.webp',
    bannerCaption: "Las fluctuaciones del vacío cuántico podrían amplificarse en el cuello y hacer colapsar el túnel antes de que alguien lo cruce.",
    title: "El Problema de la Estabilidad Cuántica",
    color: '#4F6D7A',
    btnImage: '/assets/wormhole/infographic_m8/btn_inestabilidad-cuantica.webp',
    image: '/assets/wormhole/infographic_m8/hero_inestabilidad-cuantica.webp',
    content: [
      "Aunque se consiguiera materia exótica y se diseñara un cuello amable con los viajeros, quedaría otro obstáculo enorme: la física cuántica. Según la mecánica cuántica, el vacío nunca está completamente quieto. En cada rincón del espacio aparecen y desaparecen pequeñas fluctuaciones de energía, como un murmullo de fondo que no se puede apagar. En la vida diaria no las notamos, pero en regiones donde el espacio-tiempo está muy curvado sus efectos pueden volverse importantes.",
      "Un ejemplo famoso es la radiación de Hawking. En 1974, Stephen Hawking calculó que, por efectos cuánticos cerca del horizonte, los agujeros negros deberían emitir una débil radiación y perder masa muy lentamente. Este resultado mostró que la curvatura extrema del espacio-tiempo puede transformar las fluctuaciones del vacío en energía real. Para los agujeros negros de masa estelar esta radiación es tan débil que no se ha podido detectar, pero el cálculo se considera muy sólido.",
      "Algo parecido podría ocurrir en un agujero de gusano. La geometría tan curvada del cuello podría amplificar las fluctuaciones cuánticas, y algunos cálculos sugieren que la energía resultante sería suficiente para deformar el túnel y hacerlo colapsar. A esto se le llama el problema de la estabilidad cuántica: incluso si se construye un agujero de gusano con materia exótica, el propio vacío podría destruirlo antes de que cualquier viajero alcanzara a cruzarlo.",
      "El problema se vuelve más grave si el túnel se convierte en una máquina del tiempo, porque entonces las fluctuaciones pueden dar vueltas por el cuello y sumarse a sí mismas. Pero incluso en agujeros de gusano normales, la pregunta sigue abierta. Hay cálculos que encuentran efectos peligrosos y otros que encuentran configuraciones donde los efectos cuánticos son pequeños. Para decidir quién tiene razón haría falta una teoría completa de la gravedad cuántica que todavía no existe.",
      "Algunos físicos han propuesto que un tipo especial de campo cuántico, con propiedades muy concretas, podría estabilizar el túnel contra estas fluctuaciones. Sin embargo, esa materia hipotética está aún más lejos de lo que conocemos que la propia materia exótica. Por ahora, la conclusión honesta es esta: no sabemos si un agujero de gusano traversable macroscópico puede sobrevivir a la física cuántica. Es uno de los mayores obstáculos teóricos de todo el campo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las fluctuaciones del vacío tienen efectos medibles en los átomos. En 1947, Willis Lamb descubrió que dos niveles de energía del átomo de hidrógeno que debían ser iguales estaban ligeramente separados. Esa pequeña diferencia, llamada desplazamiento de Lamb, se explica por la interacción del electrón con el vacío cuántico, y le valió el Premio Nobel de Física en 1955." },
      { label: "Dato Científico", icon: "atom", text: "La radiación de Hawking tiene una temperatura inversamente proporcional a la masa del agujero negro. Para un agujero negro de una masa solar, sería de solo unas 60 milmillonésimas de grado por encima del cero absoluto, mucho más fría que el fondo cósmico de microondas, que está a unos 2.7 kelvin. Por eso hoy esos agujeros negros absorben más radiación de la que emiten." }
    ],
    fact: "El cero absoluto, 0 kelvin o unos 273.15 grados bajo cero, es la temperatura más baja posible. Ni siquiera allí desaparecen las fluctuaciones cuánticas: quedan las llamadas fluctuaciones del punto cero. Por eso el helio líquido no se congela a presión normal, ni siquiera muy cerca del cero absoluto. El vacío cuántico es real y medible, y cualquier agujero de gusano tendría que convivir con él.",
  },
  {
    id: "por-que-seguir-investigando",
    bannerImage: '/assets/wormhole/infographic_m8/banner_por-que-seguir-investigando.webp',
    bannerCaption: "Estudiar agujeros de gusano, aunque quizá no existan, revela pistas sobre la gravedad, la mecánica cuántica y el espacio-tiempo.",
    title: "¿Por Qué Seguir Investigando?",
    color: '#6F7F5B',
    btnImage: '/assets/wormhole/infographic_m8/btn_por-que-seguir-investigando.webp',
    image: '/assets/wormhole/infographic_m8/hero_por-que-seguir-investigando.webp',
    content: [
      "Después de tantos obstáculos, es normal preguntarse si vale la pena estudiar algo que quizá sea imposible. La respuesta de los físicos es un sí rotundo. Los agujeros de gusano funcionan como un laboratorio de ideas: llevan la relatividad general y la mecánica cuántica a situaciones tan extremas que obligan a ambas teorías a mostrar sus límites. Cuando una teoría falla en un experimento mental, nos indica dónde buscar la física nueva que todavía no conocemos.",
      "Esta forma de trabajar ya ha dado frutos. Al intentar sostener agujeros de gusano, Larry Ford y Thomas Roman desarrollaron las desigualdades cuánticas, que hoy se usan para entender cuánta energía negativa permite la naturaleza en cualquier situación. Stephen Hawking formuló la conjetura de protección de la cronología. Y el artículo de Morris y Thorne se convirtió en una herramienta para enseñar relatividad general en universidades de todo el mundo, tal como sus autores querían.",
      "En 2013, Juan Maldacena y Leonard Susskind propusieron una idea audaz llamada ER igual a EPR. Sugiere que el entrelazamiento cuántico, esa conexión misteriosa entre partículas que Einstein, Podolsky y Rosen discutieron en 1935, podría estar relacionado con los puentes de Einstein-Rosen descritos ese mismo año. Si fuera cierta, la geometría del espacio-tiempo podría surgir de conexiones cuánticas, y los agujeros de gusano serían una pieza clave para entender la gravedad cuántica.",
      "Poco después, en 2016, Ping Gao, Daniel Jafferis y Aron Wall encontraron un modelo teórico en el que un agujero de gusano se vuelve traversable gracias a una conexión cuántica entre sus dos extremos. En su modelo, cruzarlo no es más rápido que ir por fuera, así que no sirve como atajo ni rompe la causalidad. Aun así, fue un resultado importante porque mostró una forma concreta y controlada de obtener la energía negativa necesaria mediante efectos cuánticos.",
      "Estas ideas inspiraron incluso simulaciones en computadoras cuánticas, que estudian modelos matemáticos de agujeros de gusano sin crear túneles reales. Quizá nunca viajemos por un agujero de gusano, pero preguntarnos cómo funcionaría uno ya nos ha enseñado mucho sobre el universo. Kip Thorne, que empezó a estudiarlos por una pregunta de Carl Sagan, recibió en 2017 el Premio Nobel de Física por las ondas gravitacionales. La curiosidad, bien guiada, siempre lleva a algún lugar."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El año 1935 fue muy especial para Einstein y Nathan Rosen. En mayo publicaron, junto a Boris Podolsky, el famoso artículo EPR sobre el entrelazamiento cuántico, y en julio publicaron con Rosen el artículo del puente que hoy lleva sus nombres. Durante casi ochenta años nadie relacionó seriamente ambos trabajos, hasta la propuesta de Maldacena y Susskind en 2013." },
      { label: "Dato Científico", icon: "atom", text: "En 2022, un equipo dirigido por Daniel Jafferis y Maria Spiropulu publicó en la revista Nature una simulación en el procesador cuántico Sycamore de Google. Usaron nueve qubits para estudiar un modelo matemático relacionado con un agujero de gusano traversable. Los propios autores aclararon que no crearon un túnel en el espacio real, y otros físicos debatieron después el alcance del resultado." }
    ],
    fact: "Muchos avances científicos nacieron de preguntas que parecían imposibles. La relatividad empezó cuando el joven Einstein se preguntó cómo se vería un rayo de luz si pudiera viajar a su lado. Las ecuaciones que describen hoy el GPS, los agujeros negros y las ondas gravitacionales salieron de esa curiosidad. Los agujeros de gusano son una de las grandes preguntas de este tipo en la física actual.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM8)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="gradWormholeM8" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA TRAVESÍA Y SUS PELIGROS</text>
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
          layoutId="activeDotWormholeM8"
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
export default function InteractiveInfographic_WormholeM8() {
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
              🏆 Cruzar el túnel, relojes congelados, espaguetización y el vacío cuántico
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
