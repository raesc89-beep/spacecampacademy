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
  "Einstein, A. & Rosen, N. (1935). «The Particle Problem in the General Theory of Relativity». Physical Review 48, 73–77.",
  "Fuller, R. W. & Wheeler, J. A. (1962). «Causality and Multiply Connected Space-Time». Physical Review 128, 919–929.",
  "Morris, M. S. & Thorne, K. S. (1988). «Wormholes in spacetime and their use for interstellar travel: A tool for teaching general relativity». American Journal of Physics 56, 395–412.",
  "Morris, M. S., Thorne, K. S. & Yurtsever, U. (1988). «Wormholes, Time Machines, and the Weak Energy Condition». Physical Review Letters 61, 1446–1449.",
  "James, O., von Tunzelmann, E., Franklin, P. & Thorne, K. S. (2015). «Visualizing Interstellar's Wormhole». American Journal of Physics 83, 486–499.",
  "Einstein, A. (1936). «Lens-Like Action of a Star by the Deviation of Light in the Gravitational Field». Science 84, 506–507.",
  "Hawking, S. W. (1992). «Chronology protection conjecture». Physical Review D 46, 603–611.",
  "Nicholl, M. et al. (2020). «An outflow powers the optical rise of the nearby, fast-evolving tidal disruption event AT2019qiz». Monthly Notices of the Royal Astronomical Society 499, 482–504.",
  "Thorne, K. S. (2014). The Science of Interstellar. W. W. Norton & Company."
];

const INFOGRAPHIC_NODES = [
  {
    id: "puente-que-se-cierra",
    bannerImage: '/assets/wormhole/infographic_m9/banner_puente-que-se-cierra.webp',
    bannerCaption: "En 1962, Fuller y Wheeler demostraron que el puente de Einstein-Rosen se estrangula tan rápido que ni la luz alcanza a cruzarlo.",
    title: "El puente de Einstein-Rosen se cierra",
    color: '#6B7A8F',
    btnImage: '/assets/wormhole/infographic_m9/btn_puente-que-se-cierra.webp',
    image: '/assets/wormhole/infographic_m9/hero_puente-que-se-cierra.webp',
    content: [
      "Imagina que tu nave se desvía y cae hacia un agujero de gusano natural, del tipo que Albert Einstein y Nathan Rosen describieron en 1935. Ellos encontraron, dentro de las ecuaciones de la relatividad general, una especie de puente que une dos regiones del espacio-tiempo. Suena a atajo perfecto, pero hay una trampa enorme: ese puente no es una estructura fija. Está dentro de un agujero negro, rodeado por un horizonte de eventos, y su forma cambia con el tiempo de una manera muy peligrosa.",
      "En 1962, los físicos Robert Fuller y John Wheeler calcularon qué le pasa al puente con el paso del tiempo. Descubrieron que la garganta se abre hasta un tamaño máximo y luego se estrangula, como un globo alargado que alguien pellizca por la mitad. Todo ocurre tan rápido que ni siquiera un rayo de luz alcanza a pasar de un lado al otro antes del cierre. Si la luz, que es lo más rápido del universo, no lo logra, una nave con astronautas tampoco tiene ninguna oportunidad.",
      "¿Qué queda cuando el puente se cierra? Las ecuaciones dicen que en lugar del túnel aparece una singularidad: una zona donde la curvatura del espacio-tiempo crece sin límite y la teoría de Einstein deja de dar respuestas útiles. Cualquier cosa que haya cruzado el horizonte termina dirigiéndose hacia ella. Por eso, caer en un puente de Einstein-Rosen es, en la práctica, lo mismo que caer en un agujero negro: no existe una salida hacia otro universo, solo un viaje de ida.",
      "Los científicos llaman a este tipo de túnel «no transitable», porque nada puede atravesarlo de punta a punta. Es una diferencia clave con los agujeros de gusano «transitables» que estudiaron Michael Morris y Kip Thorne en 1988. Para que un túnel se mantenga abierto haría falta algo que empuje sus paredes hacia afuera, una forma de materia o energía con propiedades muy raras que nadie ha conseguido reunir en cantidades útiles. Sin ese soporte, la gravedad siempre gana y el túnel se derrumba.",
      "Además del colapso, un agujero de gusano natural sería un lugar hostil por otras razones. Alrededor de los agujeros negros reales suele haber gas muy caliente que gira a gran velocidad y emite rayos X, como los que registran telescopios espaciales como Chandra. Una nave que se acercara sin protección recibiría radiación intensa mucho antes de llegar al horizonte. Por eso, cualquier exploración de estos objetos empezaría con sondas robóticas, nunca con una tripulación humana a bordo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Einstein y Rosen no buscaban un atajo para viajar. Su artículo de 1935 intentaba describir partículas elementales, como el electrón, usando solo la geometría del espacio-tiempo. El término «agujero de gusano» llegó mucho después: lo acuñó John Wheeler en 1957, comparando el túnel con el camino que abre un gusano a través de una manzana para llegar al otro lado sin tener que rodearla." },
      { label: "Dato Científico", icon: "atom", text: "La descripción completa del espacio-tiempo de un agujero negro sin rotación, publicada por Martin Kruskal y George Szekeres en 1960, muestra dos regiones exteriores unidas por el puente. Pero ese mismo mapa revela que ningún camino permitido para la luz o la materia conecta ambas regiones. Es decir, el puente aparece en las ecuaciones, pero nadie podría recorrerlo de un extremo al otro." }
    ],
    fact: "El puente aparece escondido en la solución que Karl Schwarzschild encontró en 1916 para la gravedad de una masa esférica. Durante casi medio siglo se discutió si podría servir para viajar entre regiones lejanas del universo. El trabajo de Fuller y Wheeler, publicado en 1962 en la revista Physical Review, cerró la discusión: en su forma natural, el puente es dinámico, inestable y no transitable.",
  },
  {
    id: "fuerzas-de-marea",
    bannerImage: '/assets/wormhole/infographic_m9/banner_fuerzas-de-marea.webp',
    bannerCaption: "Cerca de un agujero negro de 10 masas solares, la diferencia de gravedad entre cabeza y pies destrozaría a una persona antes del horizonte.",
    title: "Fuerzas de marea: el estirón cósmico",
    color: '#7D6E83',
    btnImage: '/assets/wormhole/infographic_m9/btn_fuerzas-de-marea.webp',
    image: '/assets/wormhole/infographic_m9/hero_fuerzas-de-marea.webp',
    content: [
      "La gravedad se debilita con la distancia. En la Tierra, la diferencia entre la atracción que sienten tu cabeza y tus pies es tan pequeña que no la notas. Pero cerca de un objeto muy compacto, como un agujero negro, la gravedad cambia muchísimo en apenas unos metros. Si cayeras con los pies por delante, tus pies serían atraídos con más fuerza que tu cabeza. Esa diferencia de tirones se llama fuerza de marea, y es la misma que, de forma muy suave, provoca las mareas de los océanos por la Luna.",
      "Cuando la fuerza de marea es extrema, el cuerpo se estira a lo largo de la dirección de caída y se comprime por los costados. Los astrofísicos llaman a esto «espaguetización», porque el objeto termina alargado como un fideo. El término aparece en el famoso libro «Breve historia del tiempo», de Stephen Hawking, publicado en 1988. Aunque suena gracioso, describe un proceso real que los telescopios han observado en estrellas desgarradas por agujeros negros en otras galaxias.",
      "Lo sorprendente es que los agujeros negros pequeños son más peligrosos en sus bordes que los gigantes. En uno de unas diez masas solares, cuyo horizonte mide unos 30 kilómetros de radio, la marea destrozaría a una persona cientos de kilómetros antes de llegar al horizonte. En cambio, en un agujero negro supermasivo, de millones de masas solares, la curvatura en el horizonte es tan suave que podrías cruzarlo sin sentir nada especial. El peligro aparecería después, mucho más adentro.",
      "En 2020, un equipo de astrónomos observó con telescopios del Observatorio Europeo Austral una estrella siendo espaguetizada por un agujero negro en una galaxia a unos 215 millones de años luz. El evento, llamado AT2019qiz, fue uno de los más cercanos registrados de este tipo, conocidos como «eventos de disrupción por marea». Parte del gas estelar cayó hacia el agujero negro y otra parte salió disparada, produciendo un destello que pudo seguirse durante meses.",
      "Para un agujero de gusano transitable, Morris y Thorne pusieron una regla de diseño muy humana: que la fuerza de marea sobre un viajero nunca supere la aceleración que sentimos en la superficie de la Tierra. Con esa condición, cruzar el túnel no sería más incómodo que estar de pie en tu casa. Esto muestra la gran diferencia entre un túnel natural, que destroza, y uno diseñado, que protegería a sus pasajeros. Por ahora, ese diseño existe únicamente en el papel."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La Luna sufre la marea de la Tierra, y por eso siempre nos muestra la misma cara. Durante millones de años, las fuerzas de marea frenaron su giro hasta sincronizarlo con su órbita alrededor de nuestro planeta. La Luna, a su vez, estira nuestros océanos: esa es la razón de que haya dos mareas altas cada día. Es el mismo efecto que cerca de un agujero negro, pero muchísimo más suave." },
      { label: "Dato Científico", icon: "atom", text: "La fuerza de marea crece con la masa del objeto, pero disminuye con el cubo de la distancia. Como el radio del horizonte crece en proporción directa a la masa, la marea justo en el horizonte disminuye con el cuadrado de la masa. Por eso, en el horizonte de un agujero negro mil veces más masivo que otro, la marea es un millón de veces más débil." }
    ],
    fact: "Los eventos de disrupción por marea se descubren hoy gracias a sondeos automáticos del cielo, como el Zwicky Transient Facility en California, que detectó AT2019qiz y registra destellos nuevos cada noche. Ya se conocen decenas de estos eventos. Cada uno permite estimar la masa del agujero negro escondido en el centro de una galaxia, incluso cuando ese agujero negro está casi inactivo y no brilla por sí mismo.",
  },
  {
    id: "anillo-de-einstein",
    bannerImage: '/assets/wormhole/infographic_m9/banner_anillo-de-einstein.webp',
    bannerCaption: "La gravedad curva la luz: en 1919, Eddington midió cómo el Sol desviaba la luz de estrellas lejanas durante un eclipse total.",
    title: "Lentes gravitacionales y el anillo de Einstein",
    color: '#5F7F86',
    btnImage: '/assets/wormhole/infographic_m9/btn_anillo-de-einstein.webp',
    image: '/assets/wormhole/infographic_m9/hero_anillo-de-einstein.webp',
    content: [
      "Al acercarte a la boca de un agujero de gusano transitable, lo primero que notarías sería algo extraño en el cielo. Las estrellas cercanas a la boca parecerían desplazarse, deformarse y apretujarse alrededor de ella, formando un anillo luminoso. Esto sucede porque la curvatura del espacio-tiempo desvía la trayectoria de la luz, igual que una lupa de vidrio desvía los rayos del Sol. A este fenómeno se le llama lente gravitacional, y es una de las predicciones mejor comprobadas de la relatividad.",
      "La primera prueba llegó en 1919. Durante un eclipse total de Sol, expediciones británicas impulsadas por Arthur Eddington y Frank Dyson fotografiaron estrellas que aparecían junto al disco solar oscurecido. Al comparar sus posiciones con fotografías tomadas de noche, vieron que se habían desplazado un poco. La luz de esas estrellas se había curvado al pasar junto al Sol, en una cantidad cercana a la predicha por Einstein. La noticia convirtió a Einstein en una celebridad mundial.",
      "Cuando una fuente de luz lejana, un objeto masivo y el observador quedan perfectamente alineados, ocurre algo especial: la luz rodea la masa por todos lados por igual y llega al observador formando un círculo completo. Eso es un anillo de Einstein. El físico ruso Orest Chwolson describió la idea en 1924, y Einstein publicó su propio cálculo en 1936 en la revista Science, aunque pensaba que sería casi imposible observarlo con los telescopios de su época.",
      "Por suerte, Einstein se equivocó en eso. En 1988, astrónomos que usaban el radiotelescopio Very Large Array, en Nuevo México, descubrieron el primer anillo de Einstein, llamado MG1131+0456. Hoy se conocen muchísimos, y los telescopios espaciales Hubble y James Webb han fotografiado anillos casi perfectos alrededor de galaxias lejanas. Las lentes gravitacionales se usan incluso como «telescopios naturales» que amplifican la luz de galaxias que de otro modo serían invisibles.",
      "En la boca de un agujero de gusano, la lente tendría un ingrediente extra. Además de desviar la luz de nuestro lado del universo, la boca dejaría pasar luz del otro extremo del túnel. Así, el anillo luminoso estaría formado por la imagen distorsionada de nuestro propio cielo, mientras que en el centro aparecería el cielo del destino. Los científicos que crearon las imágenes de la película «Interstellar» calcularon este efecto con gran precisión usando las ecuaciones de la relatividad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Una lente gravitacional puede producir varias imágenes del mismo objeto. En 2014 se descubrió la supernova Refsdal, cuya luz llegó en cuatro imágenes alrededor de una galaxia del cúmulo MACS J1149. Los astrónomos predijeron que una quinta imagen aparecería tiempo después, porque esa luz recorría un camino más largo, y a finales de 2015 la vieron aparecer justo donde se esperaba." },
      { label: "Dato Científico", icon: "atom", text: "Según la relatividad general, un rayo de luz que roza el borde del Sol se desvía 1.75 segundos de arco, el doble de lo que se obtiene con la gravedad de Newton tratando la luz como partículas. Un segundo de arco es el tamaño aparente de una moneda vista a casi cinco kilómetros de distancia. Medir algo tan pequeño en 1919 fue un logro técnico impresionante." }
    ],
    fact: "La lente gravitacional no solo funciona con galaxias. Cuando una estrella pasa frente a otra más lejana, la abrillanta durante días o semanas: es la microlente gravitacional. Con esta técnica se han descubierto exoplanetas, porque un planeta alrededor de la estrella que actúa como lente produce un pequeño pico extra de brillo. El futuro telescopio espacial Nancy Grace Roman de la NASA buscará cientos de planetas de esta manera.",
  },
  {
    id: "boca-esfera-de-cristal",
    bannerImage: '/assets/wormhole/infographic_m9/banner_boca-esfera-de-cristal.webp',
    bannerCaption: "Para «Interstellar» (2014), Kip Thorne y el estudio Double Negative calcularon cómo se vería la boca esférica de un agujero de gusano.",
    title: "La boca: una esfera de cristal hacia otro cielo",
    color: '#8A7B65',
    btnImage: '/assets/wormhole/infographic_m9/btn_boca-esfera-de-cristal.webp',
    image: '/assets/wormhole/infographic_m9/hero_boca-esfera-de-cristal.webp',
    content: [
      "En las películas, los agujeros de gusano suelen dibujarse como embudos o remolinos planos. Pero en nuestro espacio de tres dimensiones, la boca de un agujero de gusano transitable sería una esfera. Desde lejos parecería una bola brillante, algo así como una esfera de cristal que, en lugar de reflejar lo que tienes alrededor, muestra el paisaje de otra región del universo. Los dibujos de embudo de los libros son solo una ayuda visual que elimina una dimensión para que podamos imaginarlo.",
      "En 2015, Oliver James, Eugénie von Tunzelmann, Paul Franklin y Kip Thorne publicaron en la revista American Journal of Physics un artículo explicando cómo crearon el agujero de gusano de «Interstellar». Programaron las trayectorias de millones de rayos de luz siguiendo las ecuaciones de la relatividad. Probaron diferentes longitudes del túnel y anchuras de la zona de lente, y estudiaron cómo cambiaba la imagen. El resultado fue una esfera con galaxias del otro lado y nuestro cielo deformado en sus bordes.",
      "A medida que tu nave se acercara, la esfera crecería en tu campo de visión más rápido que un objeto normal, porque la curvatura amplificaría la imagen. El cielo del otro extremo se iría «abriendo» frente a ti, ocupando una porción cada vez mayor de lo que ves. Mientras tanto, el cielo de tu lado del universo quedaría empujado hacia los bordes, comprimido en el anillo luminoso que rodea la boca. Sería como acercar la cara a una ventana redonda que no deja de agrandarse.",
      "En un agujero de gusano de túnel muy corto, como el que imaginaron Morris y Thorne para explicar la teoría, la boca y la garganta prácticamente coinciden. Al llegar a ese punto, la imagen del otro extremo ocuparía exactamente la mitad de tu campo de visión: delante de ti, el cielo nuevo; detrás, el cielo que dejas. Es el momento de equilibrio perfecto del viaje, como estar justo en el marco de una puerta que separa dos habitaciones muy diferentes.",
      "Este tipo de cálculos no son solo para el cine. Programas de trazado de rayos parecidos ayudan a los astrónomos a interpretar imágenes reales, como las sombras de agujeros negros obtenidas por el Telescopio del Horizonte de Eventos. Algunos investigadores han propuesto buscar agujeros de gusano comparando la sombra que producirían con la de un agujero negro. Hasta ahora, todas las observaciones encajan con agujeros negros normales, sin ninguna señal de túneles."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El trabajo para «Interstellar» produjo resultados científicos inesperados. El equipo de efectos visuales desarrolló una técnica nueva de trazado de rayos para evitar parpadeos en la imagen, y con ella estudió también el agujero negro giratorio Gargantúa. Esos hallazgos se publicaron en revistas científicas revisadas por expertos, algo muy poco común para una película de Hollywood." },
      { label: "Dato Científico", icon: "atom", text: "En el modelo de Morris y Thorne, la geometría del agujero de gusano se describe con dos funciones: una de forma, que fija el perfil del túnel, y otra de corrimiento al rojo, que controla cómo cambia el ritmo del tiempo a lo largo de él. Si esta segunda función vale cero, el reloj del viajero y los relojes lejanos marcan el mismo ritmo, y la luz que cruza no cambia de color." }
    ],
    fact: "Kip Thorne fue asesor científico y productor ejecutivo de «Interstellar», estrenada en 2014. Tres años después, en 2017, recibió el Premio Nobel de Física junto con Rainer Weiss y Barry Barish por su papel decisivo en el detector LIGO y la observación de ondas gravitacionales, otra predicción de la relatividad general confirmada en 2015, un siglo después de que Einstein formulara su teoría.",
  },
  {
    id: "dentro-de-la-garganta",
    bannerImage: '/assets/wormhole/infographic_m9/banner_dentro-de-la-garganta.webp',
    bannerCaption: "Desde el interior del túnel verías dos cielos: el del destino al frente y el de tu punto de partida detrás de ti.",
    title: "Dentro de la garganta: dos cielos a la vez",
    color: '#5E7F6B',
    btnImage: '/assets/wormhole/infographic_m9/btn_dentro-de-la-garganta.webp',
    image: '/assets/wormhole/infographic_m9/hero_dentro-de-la-garganta.webp',
    content: [
      "Una vez dentro del cuello del agujero de gusano, que los físicos llaman garganta, la experiencia sería muy particular. Mirando hacia adelante verías el cielo del destino, con sus estrellas y galaxias, comprimido en un disco luminoso. Mirando hacia atrás verías el cielo de tu punto de partida, también encogido en otro disco. A los lados, la luz que viaja rodeando el túnel podría producir imágenes repetidas y distorsionadas. Sería como estar en un pasillo con ventanas redondas en ambos extremos.",
      "¿Por qué ves ambos cielos? Porque en un agujero de gusano transitable la luz sí puede recorrer el túnel en las dos direcciones. Los rayos que salieron de las estrellas del destino entran por la boca lejana, atraviesan la garganta y llegan a tus ojos desde el frente. Los rayos de las estrellas de tu hogar entran por la boca cercana y te alcanzan desde atrás. Tu cerebro interpreta toda esa luz como si viniera de dos direcciones distintas, y eso es exactamente lo que ocurre.",
      "La sensación física dependería del diseño del túnel. Si las fuerzas de marea se mantuvieran por debajo de una gravedad terrestre, como exigían Morris y Thorne, apenas notarías nada: viajarías como en una cápsula en caída libre, flotando sin peso. En un túnel con mareas más intensas sentirías que algo te estira a lo largo y te aprieta por los lados. Por eso, en el diseño ideal, la garganta debería ser mucho más ancha que la nave, para suavizar la curvatura.",
      "El ritmo del tiempo también podría cambiar. La relatividad general enseña que los relojes marchan más lento donde la gravedad es más intensa, un efecto comprobado con relojes atómicos y que incluso debe corregirse para que funcione el GPS. Si el túnel tuviera zonas de gravedad diferente, tu reloj se adelantaría o atrasaría respecto al de quienes esperan fuera. Si los diseñadores eligieran una geometría sin ese efecto, todos los relojes coincidirían al final del viaje.",
      "Hay un detalle que confunde a muchas personas: dentro del túnel no viajarías más rápido que la luz. Localmente, tu nave siempre se movería más despacio que un rayo de luz que pasara a su lado. El truco del agujero de gusano es que la distancia a recorrer por dentro sería mucho más corta que la distancia por fuera. Es como cruzar una montaña por un túnel en lugar de rodearla: no corres más, simplemente tomas un camino más corto."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los satélites GPS llevan relojes atómicos que, sin corrección, se desfasarían unos 38 microsegundos por día respecto a los relojes del suelo. La mayor parte se debe a que, a su altura, la gravedad terrestre es más débil y el tiempo corre más rápido. Si no se tuviera en cuenta la relatividad, los errores de posición del GPS crecerían varios kilómetros cada día." },
      { label: "Dato Científico", icon: "atom", text: "En 1959, Robert Pound y Glen Rebka midieron en la Universidad de Harvard cómo cambiaba la frecuencia de rayos gamma al subir y bajar por una torre de 22.5 metros. Fue la primera medición de laboratorio del corrimiento al rojo gravitacional. Coincidió con la relatividad general con una precisión de alrededor del diez por ciento, mejorada años después hasta el uno por ciento." }
    ],
    fact: "En 2010, investigadores del NIST, en Estados Unidos, compararon dos relojes atómicos ópticos tras elevar uno de ellos apenas unos 33 centímetros. El reloj más alto avanzó un poquito más rápido, tal como predice la teoría de Einstein. Es una prueba de que la gravedad afecta al tiempo incluso a la escala de una mesa de laboratorio, y no solo cerca de estrellas o agujeros negros.",
  },
  {
    id: "atajo-en-el-tiempo",
    bannerImage: '/assets/wormhole/infographic_m9/banner_atajo-en-el-tiempo.webp',
    bannerCaption: "En 1988, Morris, Thorne y Yurtsever mostraron que mover una boca a gran velocidad podría convertir un agujero de gusano en máquina del tiempo.",
    title: "Un atajo en el tiempo",
    color: '#806A7A',
    btnImage: '/assets/wormhole/infographic_m9/btn_atajo-en-el-tiempo.webp',
    image: '/assets/wormhole/infographic_m9/hero_atajo-en-el-tiempo.webp',
    content: [
      "Un agujero de gusano no solo conectaría lugares distintos: en teoría también podría conectar momentos distintos. En 1988, Michael Morris, Kip Thorne y Ulvi Yurtsever publicaron en la revista Physical Review Letters una idea sorprendente. Si se lleva una de las bocas del túnel de viaje a una velocidad cercana a la de la luz y luego se la trae de regreso, sus relojes quedarían atrasados respecto a los de la otra boca. Es la famosa paradoja de los gemelos aplicada a un túnel.",
      "Imagina a dos gemelas: una se queda en la Tierra y la otra viaja en una nave muy rápida. Al regresar, la viajera es más joven, porque para ella el tiempo transcurrió más despacio. Este efecto, llamado dilatación del tiempo, está comprobado: en 1971, Joseph Hafele y Richard Keating llevaron relojes atómicos alrededor del mundo en aviones comerciales y midieron diferencias de nanosegundos. Con un agujero de gusano, esa diferencia de edad entre las bocas se convierte en un puente entre épocas.",
      "Si cruzaras un agujero de gusano así, tu cuerpo no sentiría nada especial. No verías el tiempo correr hacia atrás ni rejuvenecerías durante el trayecto. Tu reloj de pulsera seguiría avanzando normalmente, segundo a segundo. Simplemente saldrías por la otra boca y notarías que el entorno no corresponde al momento que esperabas: personas distintas, edificios que aún no existen o que ya desaparecieron. Según cómo se hubiera preparado el túnel, la diferencia podría ser de segundos o de muchos años.",
      "Viajar al pasado provoca paradojas famosas, como la del abuelo: ¿qué pasaría si impidieras tu propio nacimiento? En 1991, un grupo que incluía a Kip Thorne estudió una versión más sencilla con bolas de billar que entran en un agujero de gusano y chocan con su propio pasado. Encontraron que siempre existen trayectorias coherentes, sin contradicciones. Esto apoya el «principio de autoconsistencia» del físico ruso Ígor Nóvikov: la naturaleza solo permitiría historias que no se contradigan.",
      "Stephen Hawking era escéptico. En 1992 propuso la «conjetura de protección de la cronología»: las leyes de la física impedirían que se formaran máquinas del tiempo. Sus cálculos sugerían que, justo cuando un agujero de gusano estuviera por convertirse en máquina del tiempo, las fluctuaciones cuánticas del vacío se amplificarían sin control y lo destruirían. Bromeaba diciendo que una buena prueba era que no nos visitan turistas del futuro. La cuestión sigue abierta."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 2009, Stephen Hawking organizó una fiesta para viajeros del tiempo en la Universidad de Cambridge. Preparó champaña y bocadillos, pero envió las invitaciones solo después de que la fiesta había terminado, para que únicamente alguien del futuro pudiera enterarse a tiempo. Nadie llegó. Para Hawking, aquella broma era un experimento divertido que apoyaba su idea de que viajar al pasado no es posible." },
      { label: "Dato Científico", icon: "atom", text: "Incluso con un agujero de gusano convertido en máquina del tiempo, este modelo tiene un límite importante: nunca podrías viajar a un momento anterior a la creación de la máquina. La boca atrasada solo conecta con fechas posteriores al instante en que el túnel quedó preparado. Por eso no podríamos visitar a los dinosaurios, a menos que alguien hubiera construido una máquina así hace 66 millones de años." }
    ],
    fact: "Los astronautas de la Estación Espacial Internacional son, literalmente, viajeros hacia el futuro. Como se mueven a unos 28,000 kilómetros por hora, su tiempo pasa un poco más despacio que el nuestro, aunque la gravedad algo menor en órbita compensa una pequeña parte. Tras seis meses en órbita, un astronauta regresa unos milisegundos más joven de lo que sería si se hubiera quedado en la Tierra.",
  },
  {
    id: "senales-y-salida",
    bannerImage: '/assets/wormhole/infographic_m9/banner_senales-y-salida.webp',
    bannerCaption: "Si la luz cruza el túnel, también lo harían las ondas de radio: podrías hablar con tu base durante el viaje, si el diseño lo permite.",
    title: "Mensajes desde el túnel y la salida",
    color: '#6F7D5C',
    btnImage: '/assets/wormhole/infographic_m9/btn_senales-y-salida.webp',
    image: '/assets/wormhole/infographic_m9/hero_senales-y-salida.webp',
    content: [
      "¿Podrías llamar a casa mientras cruzas el agujero de gusano? Las ondas de radio son luz que nuestros ojos no ven, y viajan exactamente a la misma velocidad. Si el túnel es transitable para la luz, también lo sería para la radio. Tu nave podría enviar mensajes hacia atrás, por la boca de entrada, y recibir respuestas. Si en cambio el diseño absorbiera o bloqueara la radiación, quedarías aislado del universo, como cuando un auto entra en un túnel de montaña y pierde la señal del teléfono.",
      "La radio espacial ya funciona a distancias enormes. Las sondas Voyager, lanzadas en 1977, siguen enviando datos desde más allá de la heliosfera, a más de 20,000 millones de kilómetros de la Tierra. Sus señales tardan cerca de un día en llegar, viajando a la velocidad de la luz. Con un agujero de gusano, la distancia recorrida por la señal sería la del túnel, quizá muy corta, así que la comunicación podría ser casi inmediata aunque la nave estuviera al otro lado de la galaxia.",
      "Habría un fenómeno curioso con el color de las señales. Si el túnel tuviera zonas de gravedad distinta, las ondas que lo cruzan cambiarían de frecuencia: se volverían más rojizas al salir de una zona de gravedad intensa y más azuladas al caer hacia ella. Los ingenieros tendrían que ajustar sus receptores para compensarlo. En el modelo más sencillo de Morris y Thorne, sin diferencias en el ritmo del tiempo, este efecto desaparecería y la señal llegaría con el mismo color con que salió.",
      "Al acercarte a la boca de salida, la experiencia visual sería la inversa de la entrada. El cielo del destino, que antes veías como un disco al frente, se abriría hasta rodearte por completo. El cielo de tu punto de partida se iría encogiendo detrás de ti, convertido en una esfera luminosa cada vez más pequeña. Al alejarte lo suficiente, esa esfera parecería un objeto brillante más en el firmamento: una ventana diminuta hacia el lugar del que vienes.",
      "Todo esto describe un viaje que hoy pertenece a la física teórica, no a la ingeniería. No se ha observado ningún agujero de gusano, natural o artificial, y mantener uno abierto exigiría energía negativa en cantidades que nadie sabe cómo reunir. Aun así, imaginar el viaje con rigor tiene mucho valor: obliga a usar correctamente la relatividad, enseña cómo se comporta la luz en espacios curvos y ayuda a descubrir los límites de nuestras teorías. Ese es el verdadero destino de esta exploración."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La sonda Voyager 1 transmite con una potencia de apenas unos 20 vatios, parecida a la de una bombilla de refrigerador. Para captar una señal tan débil desde tan lejos, la NASA usa la Red de Espacio Profundo, con antenas de hasta 70 metros de diámetro en California, España y Australia, repartidas alrededor del planeta para poder escuchar todo el cielo en cualquier momento." },
      { label: "Dato Científico", icon: "atom", text: "El corrimiento al rojo gravitacional se ha medido en el espacio con gran precisión. En 1976, el experimento Gravity Probe A lanzó un reloj máser de hidrógeno a unos 10,000 kilómetros de altura y comparó su ritmo con relojes en tierra durante el vuelo. Confirmó la predicción de Einstein con una precisión de unas 70 partes por millón, un récord que se mantuvo durante décadas." }
    ],
    fact: "La señal de radio más lejana que la humanidad recibe con regularidad viene de la Voyager 1, que en 2012 se convirtió en el primer objeto fabricado por humanos en entrar al espacio interestelar. Los ingenieros calculan que sus generadores nucleares dejarán de alimentar los instrumentos hacia la década de 2030. Después, la sonda seguirá viajando en silencio alrededor de la galaxia durante miles de millones de años.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM9)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6B7A8F", "#7D6E83", "#5F7F86", "#8A7B65", "#5E7F6B", "#806A7A", "#6F7D5C"];
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
          <linearGradient id="gradWormholeM9" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LA CAÍDA: DEL PELIGRO AL ESPECTÁCULO</text>
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
          layoutId="activeDotWormholeM9"
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
export default function InteractiveInfographic_WormholeM9() {
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
              🏆 Viajero Cuántico · Módulo 9 · Lo que verías al caer en un agujero de gusano
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
