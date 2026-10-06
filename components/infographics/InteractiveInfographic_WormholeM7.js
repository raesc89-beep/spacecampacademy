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
  "Fuller, R. W. y Wheeler, J. A. (1962). Causality and Multiply Connected Space-Time. Physical Review, 128, 919-929.",
  "Ellis, H. G. (1973). Ether flow through a drainhole: A particle model in general relativity. Journal of Mathematical Physics, 14, 104-118.",
  "James, O., von Tunzelmann, E., Franklin, P. y Thorne, K. S. (2015). Visualizing Interstellar's Wormhole. American Journal of Physics, 83, 486-499.",
  "Thorne, K. S. (2014). The Science of Interstellar. W. W. Norton & Company.",
  "Visser, M. (1995). Lorentzian Wormholes: From Einstein to Hawking. AIP Press / Springer.",
  "NASA Jet Propulsion Laboratory. Voyager Mission Status (página oficial de estado de las sondas Voyager), science.nasa.gov / voyager.jpl.nasa.gov."
];

const INFOGRAPHIC_NODES = [
  {
    id: "el-cuello-que-se-cierra",
    bannerImage: '/assets/wormhole/infographic_m7/banner_el-cuello-que-se-cierra.webp',
    bannerCaption: "En 1962, Fuller y Wheeler mostraron que el puente de Einstein-Rosen se estrangula más rápido de lo que la luz puede cruzarlo.",
    title: "El Cuello que Quiere Cerrarse",
    color: '#5B7A99',
    btnImage: '/assets/wormhole/infographic_m7/btn_el-cuello-que-se-cierra.webp',
    image: '/assets/wormhole/infographic_m7/hero_el-cuello-que-se-cierra.webp',
    content: [
      "El primer agujero de gusano que apareció en las ecuaciones de Einstein fue el puente de Einstein-Rosen, descrito en 1935. Durante décadas se pensó que quizá podía usarse como túnel, pero en 1962 Robert Fuller y John Wheeler analizaron cómo cambia con el tiempo y descubrieron un problema grave. El cuello del puente se abre y se cierra tan deprisa que ni siquiera un rayo de luz alcanza a pasar de un lado al otro. Cualquier viajero quedaría atrapado y aplastado en una singularidad.",
      "¿Por qué ocurre esto? La razón es que la gravedad de la materia y la energía normales siempre atrae. Si tienes un túnel hecho de espacio-tiempo curvado, su propia gravedad tiende a estrujarlo hacia dentro, igual que un globo de agua cae y se aplasta si nada lo sostiene. Toda la materia que conocemos, desde las rocas hasta la luz, empuja el espacio-tiempo en la misma dirección: hacia el colapso. Por eso un agujero de gusano hecho solo de materia normal no puede mantenerse abierto.",
      "En 1988, Michael Morris y Kip Thorne se hicieron la pregunta al revés. En lugar de partir de una materia conocida y ver qué forma tomaba el espacio-tiempo, primero dibujaron la forma del túnel que querían: un cuello estable, con dos bocas y sin peligros para los viajeros. Luego usaron las ecuaciones de Einstein para calcular qué tipo de materia haría falta para sostener esa forma. Es como diseñar primero un puente bonito y después averiguar qué materiales lo soportarían.",
      "El resultado fue claro: el cuello debe abrirse hacia fuera a ambos lados, como la parte estrecha de un reloj de arena. Los físicos llaman a esto la condición de ensanchamiento. Para que los rayos de luz que entran juntos por una boca salgan separándose por la otra, la materia en el cuello debe tener energía negativa, al menos vista por esos rayos de luz. Esa materia, que ejercería un efecto gravitatorio repulsivo, recibe el nombre de materia exótica en los artículos científicos.",
      "La materia exótica funcionaría como un andamio invisible que empuja las paredes del cuello hacia fuera y equilibra la tendencia al colapso. En los modelos se concentra sobre todo alrededor de la parte más estrecha del túnel. Nadie ha fabricado materia exótica en cantidades grandes, aunque la física cuántica permite pequeñas regiones de energía negativa, como en el efecto Casimir. Entender esta pieza es el primer paso para entender cómo funcionaría un agujero de gusano traversable."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La palabra «agujero de gusano» se le ocurrió a John Wheeler en 1957, en un artículo con Charles Misner. La imagen viene de una manzana: una hormiga tendría que rodear toda la superficie para llegar al otro lado, pero un gusano que la atraviesa por dentro toma un atajo. Wheeler también popularizó el término «agujero negro» a finales de los años sesenta." },
      { label: "Dato Científico", icon: "atom", text: "En lenguaje técnico, el agujero de gusano de Morris y Thorne viola la condición de energía nula, que dice que cualquier rayo de luz debería medir una densidad de energía no negativa. Toda la materia clásica conocida cumple esta condición. Su violación es la razón por la que los físicos dicen que un agujero de gusano traversable requiere física fuera de lo común." }
    ],
    fact: "El efecto Casimir fue predicho por el físico neerlandés Hendrik Casimir en 1948: dos placas metálicas muy cercanas en el vacío se atraen porque entre ellas caben menos fluctuaciones cuánticas que fuera. La región entre las placas tiene una energía menor que el vacío normal, es decir, negativa respecto a él. Steve Lamoreaux midió el efecto con buena precisión en 1997, confirmando que la energía negativa existe a pequeña escala.",
  },
  {
    id: "dos-bocas-un-cuello",
    bannerImage: '/assets/wormhole/infographic_m7/banner_dos-bocas-un-cuello.webp',
    bannerCaption: "Un agujero de gusano traversable típico tiene dos bocas unidas por un cuello, y puede recorrerse en ambos sentidos.",
    title: "Dos Bocas y un Cuello",
    color: '#7A6C8F',
    btnImage: '/assets/wormhole/infographic_m7/btn_dos-bocas-un-cuello.webp',
    image: '/assets/wormhole/infographic_m7/hero_dos-bocas-un-cuello.webp',
    content: [
      "Un agujero de gusano traversable, como el que describieron Morris y Thorne, tiene tres partes principales. Hay dos bocas, cada una situada en una región distinta del espacio, y entre ellas se encuentra el cuello o garganta, que es el túnel propiamente dicho. El cuello tiene un radio mínimo en su punto más estrecho y una cierta longitud medida desde dentro. Lo más importante es que el camino a través del cuello puede ser muchísimo más corto que la distancia entre las bocas por el espacio exterior.",
      "Los agujeros de gusano traversables funcionarían en los dos sentidos. Podrías entrar por la boca A y salir por la boca B, o hacer el viaje contrario, igual que un túnel de carretera que atraviesa una montaña. Esto los distingue de los agujeros negros, donde el horizonte de eventos es una puerta de un solo sentido: puedes entrar, pero nunca salir. En un agujero de gusano traversable, por diseño, no existe ningún horizonte que atrape al viajero.",
      "Para imaginar la forma, los físicos usan diagramas de inmersión. Se toma una rebanada plana del espacio y se dibuja como una hoja de goma doblada. Si la hoja se dobla como una letra U, las dos partes quedan cerca por encima aunque estén lejos sobre la hoja. Un agujero de gusano sería un tubo que conecta esas dos partes, como el cuello de un reloj de arena. Hay que recordar que la hoja doblada es solo una ayuda visual y que no necesitamos dimensiones extra para que el túnel exista.",
      "Los modelos permiten dos tipos de conexiones. Un agujero de gusano intrauniverso conectaría dos lugares de nuestro propio universo, por ejemplo la Tierra y una estrella lejana. Un agujero de gusano interuniverso conectaría nuestro universo con otro universo distinto, si es que existe. Las ecuaciones de la relatividad general aceptan ambas posibilidades, pero hasta ahora no tenemos ninguna observación que confirme la existencia de agujeros de gusano de ningún tipo.",
      "Las bocas no estarían fijadas como clavos en el espacio. Al ser objetos con gravedad, se moverían si algo tirara de ellas, como cualquier planeta o estrella. Por eso los físicos pueden imaginar que una civilización arrastrara una boca a otro lugar con naves espaciales, algo que justamente se usa en los experimentos mentales de viaje en el tiempo. En todos los casos, la conexión a través del cuello se mantendría mientras el agujero de gusano siguiera estable."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Ya en 1916, solo unos meses después de que Einstein publicara la relatividad general, el físico austriaco Ludwig Flamm estudió la solución de Schwarzschild para una masa esférica y notó que tenía una estructura parecida a un túnel entre dos regiones del espacio. Por eso a veces se le considera el primero en describir, sin darle ese nombre, un agujero de gusano." },
      { label: "Dato Científico", icon: "atom", text: "Los diagramas de inmersión muestran solo una rebanada del espacio en un instante y con una dimensión eliminada. La superficie curvada no indica que el espacio esté dentro de algo, sino cómo cambian las distancias. En el agujero de gusano de Morris y Thorne, la rebanada se ve como dos embudos unidos por su parte estrecha, y el círculo más pequeño marca el radio de la garganta." }
    ],
    fact: "Matemáticamente, el cuello de un agujero de gusano puede tener cualquier longitud: desde casi cero hasta muchos kilómetros. Esa longitud no depende de la distancia entre las bocas por el espacio exterior. Dos bocas separadas por miles de años luz podrían estar conectadas por un cuello de pocos metros. Esta libertad es la que convierte a los agujeros de gusano en atajos en las ecuaciones, aunque no sepamos si existen.",
  },
  {
    id: "viaje-sin-singularidad",
    bannerImage: '/assets/wormhole/infographic_m7/banner_viaje-sin-singularidad.webp',
    bannerCaption: "Morris y Thorne exigieron que su túnel no tuviera horizonte ni singularidad y que las fuerzas sobre el viajero fueran soportables.",
    title: "Un Viaje sin Singularidad",
    color: '#6B8E7F',
    btnImage: '/assets/wormhole/infographic_m7/btn_viaje-sin-singularidad.webp',
    image: '/assets/wormhole/infographic_m7/hero_viaje-sin-singularidad.webp',
    content: [
      "Cuando Morris y Thorne diseñaron su agujero de gusano en 1988, escribieron una lista de condiciones que debía cumplir para ser útil a viajeros humanos. Su artículo se publicó en la revista American Journal of Physics, pensada para profesores, porque querían que sirviera para enseñar relatividad general. La primera condición era obvia pero esencial: no debía haber ningún horizonte de eventos, porque un horizonte impediría regresar por el mismo camino y convertiría el túnel en una trampa.",
      "La segunda condición era que no hubiera singularidad. En un agujero negro, según la relatividad general, la materia que cae termina en una singularidad, un lugar donde la curvatura del espacio-tiempo se vuelve infinita y las ecuaciones dejan de funcionar. En el agujero de gusano diseñado por Morris y Thorne, el espacio-tiempo es suave en todo el recorrido. La curvatura puede ser intensa en el cuello, pero siempre tiene un valor finito y los viajeros no encuentran ningún punto de destrucción total.",
      "La tercera condición tenía que ver con el cuerpo humano. Las fuerzas que sentiría el viajero no debían superar demasiado la gravedad de la Tierra. Esto incluye la aceleración de la nave y también las fuerzas de marea, que estiran el cuerpo cuando la gravedad cambia de un punto a otro. Para cumplirla, el cuello tiene que ser grande y su curvatura debe cambiar de forma gradual. Morris y Thorne calcularon que, con un diseño adecuado, una persona podría cruzar sin sufrir daños.",
      "La cuarta condición era práctica: el viaje debía durar un tiempo razonable, del orden de un año o menos, tanto para el viajero como para quienes lo esperaban fuera. De nada serviría un atajo si cruzarlo tomara siglos. Además, la materia exótica que sostiene el cuello no debía tocar a la nave, y debía ser posible fabricar el agujero de gusano con materiales y energías que, al menos en principio, la física permite. Esta última condición es la más difícil de cumplir.",
      "Lo interesante de esta lista es que convierte una idea de ciencia ficción en un problema de ingeniería teórica. En vez de preguntarse si existe un túnel mágico, los físicos pueden comprobar, condición por condición, qué es posible y qué no. Así descubrieron que casi todo puede diseñarse en las ecuaciones excepto un punto clave: la necesidad de energía negativa. Gracias a ese trabajo, hoy sabemos con precisión cuál es el obstáculo principal que separa la teoría de la realidad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Michael Morris era estudiante de doctorado de Kip Thorne cuando escribieron juntos el artículo de 1988. Thorne cuenta en su libro «Agujeros negros y tiempo curvo» que el trabajo empezó porque su amigo Carl Sagan le pidió consejo para la novela «Contacto», publicada en 1985. Una pregunta de un escritor terminó produciendo uno de los artículos más citados sobre agujeros de gusano." },
      { label: "Dato Científico", icon: "atom", text: "Una singularidad no es un objeto físico, sino una señal de que la teoría falla. En 1965, Roger Penrose demostró que, bajo condiciones muy generales, el colapso gravitatorio de una estrella produce una singularidad. Por este trabajo recibió el Premio Nobel de Física en 2020. Los agujeros de gusano traversables evitan su teorema justamente porque violan las condiciones de energía." }
    ],
    fact: "Las fuerzas de marea dependen de la diferencia de gravedad entre la cabeza y los pies. En la superficie de la Tierra, esa diferencia es menor que una millonésima de la gravedad normal, por eso no la notamos. En un agujero de gusano gentil, Morris y Thorne pedían que esa diferencia no superara aproximadamente la gravedad terrestre a lo largo de un cuerpo humano, lo que obliga a que el cuello sea enorme.",
  },
  {
    id: "ventana-esferica",
    bannerImage: '/assets/wormhole/infographic_m7/banner_ventana-esferica.webp',
    bannerCaption: "Desde fuera, la boca de un agujero de gusano se vería como una esfera que muestra, distorsionado, el cielo del otro extremo.",
    title: "Una Ventana Esférica a Otro Cielo",
    color: '#9C7A5B',
    btnImage: '/assets/wormhole/infographic_m7/btn_ventana-esferica.webp',
    image: '/assets/wormhole/infographic_m7/hero_ventana-esferica.webp',
    content: [
      "En los dibujos animados, un agujero de gusano suele aparecer como un remolino plano o un hoyo negro en el espacio. La física dice algo distinto. Como vivimos en un espacio de tres dimensiones, la boca de un agujero de gusano sería una esfera, no un círculo plano. Podrías rodearla volando con tu nave y, desde cualquier dirección, verías lo mismo: una bola que funciona como una ventana. Dentro de esa bola aparecería la luz que viene del otro extremo del túnel.",
      "Esto es muy diferente de lo que se ve al mirar un agujero negro. Un agujero negro tiene un horizonte de eventos del que ninguna luz escapa, así que se ve como una sombra oscura rodeada por la luz desviada de las estrellas y del gas caliente. En cambio, la luz puede atravesar un agujero de gusano traversable. Por eso, al mirar su boca, no verías una sombra, sino estrellas, nebulosas y galaxias de la región del universo a la que conduce el túnel.",
      "La imagen no sería una ventana limpia como la de una casa. La gravedad de la boca y la curvatura del cuello desviarían los rayos de luz, un fenómeno llamado lente gravitacional. El cielo del otro lado aparecería comprimido y deformado dentro de la esfera, y alrededor de ella el cielo de nuestro lado también se vería distorsionado. Algunas estrellas podrían verse varias veces, en distintas posiciones, porque su luz llegaría al observador siguiendo caminos diferentes.",
      "Los físicos pueden calcular estas imágenes con mucha precisión trazando el recorrido de millones de rayos de luz a través del espacio-tiempo curvado. Ese método se llama trazado de rayos y es parecido al que usan las películas animadas por computadora para crear reflejos y sombras realistas. La diferencia es que, en lugar de seguir líneas rectas, los rayos siguen las curvas que dictan las ecuaciones de Einstein. El resultado muestra cómo se vería realmente la boca.",
      "Una consecuencia curiosa es que un agujero de gusano podría confundirse con otros objetos si estuviera muy lejos. Los astrónomos han propuesto que, si existieran agujeros de gusano naturales, la forma en que desvían la luz de las estrellas del fondo sería ligeramente distinta a la de un agujero negro o una estrella. Hasta ahora no se ha detectado ninguna señal así. Mientras tanto, las simulaciones nos permiten imaginar con rigor cómo se vería esta ventana al otro cielo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 2019, el Telescopio del Horizonte de Sucesos publicó la primera imagen de la sombra de un agujero negro, el de la galaxia M87, y en 2022 la de Sagitario A*, en el centro de nuestra galaxia. Ambas muestran un anillo brillante alrededor de una zona oscura. Si algún día se observara la boca de un agujero de gusano, la ausencia de esa sombra sería una de las pistas clave." },
      { label: "Dato Científico", icon: "atom", text: "La lente gravitacional fue confirmada por primera vez en 1919, durante un eclipse total de Sol, por las expediciones organizadas por Arthur Eddington y Frank Dyson. Midieron que la luz de estrellas que pasaba cerca del Sol se desviaba según lo predicho por la relatividad general. Hoy se usan lentes gravitacionales para estudiar galaxias lejanas y la distribución de la materia oscura." }
    ],
    fact: "Cuando una fuente de luz, un objeto masivo y un observador están perfectamente alineados, la luz desviada forma un círculo llamado anillo de Einstein. Los telescopios han fotografiado muchos anillos de Einstein producidos por galaxias. En las simulaciones de agujeros de gusano también aparecen anillos y arcos parecidos alrededor de la esfera de la boca, causados por la intensa curvatura del espacio-tiempo.",
  },
  {
    id: "agujero-de-interstellar",
    bannerImage: '/assets/wormhole/infographic_m7/banner_agujero-de-interstellar.webp',
    bannerCaption: "Para la película Interstellar (2014), el estudio Double Negative y Kip Thorne simularon con física real cómo se vería un agujero de gusano.",
    title: "El Agujero de Gusano de Interstellar",
    color: '#8A6F6F',
    btnImage: '/assets/wormhole/infographic_m7/btn_agujero-de-interstellar.webp',
    image: '/assets/wormhole/infographic_m7/hero_agujero-de-interstellar.webp',
    content: [
      "La película «Interstellar», dirigida por Christopher Nolan y estrenada en 2014, cuenta la historia de unos astronautas que atraviesan un agujero de gusano situado cerca de Saturno para buscar un nuevo hogar para la humanidad. Lo especial de esta película es que el físico Kip Thorne participó como asesor científico y productor ejecutivo. Su objetivo era que las imágenes de los agujeros negros y del agujero de gusano estuvieran basadas en las ecuaciones de la relatividad general.",
      "Para lograrlo, el equipo de efectos visuales del estudio británico Double Negative, liderado por Paul Franklin, Oliver James y Eugénie von Tunzelmann, desarrolló un programa de computadora llamado DNGR. Este programa trazaba la trayectoria de los rayos de luz a través del espacio-tiempo curvado usando ecuaciones que Thorne había escrito. En lugar de inventar un efecto llamativo, los artistas dejaron que la física decidiera qué aspecto tendrían los objetos en la pantalla.",
      "El resultado fue una esfera transparente que muestra, distorsionado, el cielo de una galaxia lejana. En la película, el agujero de gusano se ve como una bola de cristal flotando en el espacio, con estrellas y nubes de gas deformadas en su interior. El equipo pudo ajustar tres características del túnel: el radio del cuello, su longitud y qué tan rápido se aplana el espacio alrededor de la boca, un parámetro que controla la intensidad de la lente gravitacional y el tamaño de la imagen.",
      "En 2015, James, von Tunzelmann, Franklin y Thorne publicaron un artículo científico titulado «Visualizing Interstellar's Wormhole» en la revista American Journal of Physics. Allí explican las ecuaciones usadas y cómo cambia la imagen al modificar cada parámetro. También publicaron un artículo sobre el agujero negro Gargantúa en la revista Classical and Quantum Gravity. Es raro que una película produzca investigación publicada, pero en este caso el arte y la ciencia avanzaron juntos.",
      "Aun así, la película tomó algunas licencias. Por razones de narrativa visual, el viaje dentro del agujero de gusano se muestra con efectos dramáticos, y la existencia y estabilidad del túnel se presentan como obra de seres desconocidos, porque nadie sabe cómo crear uno. Lo que sí es fiel a la física es la apariencia de la boca vista desde fuera. «Interstellar» ganó el Óscar a los mejores efectos visuales en 2015, en parte gracias a ese trabajo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Kip Thorne escribió el libro «La ciencia de Interstellar», publicado en 2014, para explicar la física detrás de cada escena de la película. En él separa con cuidado tres tipos de ideas: las que son ciencia establecida, las que son conjeturas razonables de los científicos y las que son especulación pura. Es una forma muy útil de pensar cualquier historia de ciencia ficción." },
      { label: "Dato Científico", icon: "atom", text: "El programa DNGR, siglas en inglés de Double Negative Gravitational Renderer, no seguía rayos de luz individuales como los programas habituales, sino haces de luz. Así podía calcular cómo se estira y se enfoca cada haz al pasar cerca de objetos con gravedad intensa, evitando parpadeos en la imagen final. Algunas imágenes requerían más de un día de cálculo por fotograma." }
    ],
    fact: "Las simulaciones para «Interstellar» mostraron que, si el cuello del agujero de gusano es largo, el viajero vería dentro de la boca varias imágenes repetidas del cielo del otro lado, porque la luz puede dar vueltas alrededor del cuello antes de salir. Cuanto más corto es el cuello, más simple es la imagen. Por eso el equipo eligió un cuello corto, que daba una imagen clara y bonita para el público.",
  },
  {
    id: "entrar-sin-caer",
    bannerImage: '/assets/wormhole/infographic_m7/banner_entrar-sin-caer.webp',
    bannerCaption: "En 1973, Homer Ellis describió un agujero de gusano que no atrae a los objetos lejanos: un túnel sin masa aparente.",
    title: "Entrar sin Caer",
    color: '#4F6D7A',
    btnImage: '/assets/wormhole/infographic_m7/btn_entrar-sin-caer.webp',
    image: '/assets/wormhole/infographic_m7/hero_entrar-sin-caer.webp',
    content: [
      "Una idea común es que entrar en un agujero de gusano sería como caer por un pozo: una vez cerca, la gravedad te arrastraría sin remedio. La física es más interesante. Si la boca tiene masa, desde lejos atraería a tu nave como lo haría un planeta o una estrella. Pero nada te obliga a entrar. Podrías orbitar alrededor de la boca, alejarte encendiendo los motores o acercarte con cuidado, igual que hacen las sondas espaciales al pasar cerca de los planetas.",
      "Lo curioso es que la masa de la boca, vista desde fuera, depende del balance entre la materia normal y la materia exótica que sostiene el cuello. En 1973, el físico estadounidense Homer Ellis publicó una solución de las ecuaciones de Einstein que él llamó drenaje, porque la imaginaba como un desagüe en el espacio-tiempo. En una de sus versiones, el túnel no tiene masa neta: desde lejos no atrae ni repele, y solo al acercarse se nota la curvatura del cuello.",
      "En un túnel como el de Ellis, entrar sería más parecido a cruzar una puerta que a caer en un precipicio. El viajero llegaría al borde de la boca y, siguiendo una trayectoria normal, sin cambios bruscos, pasaría al cuello. Allí la geometría del espacio-tiempo lo guiaría hacia la otra boca. Morris y Thorne usaron soluciones de este tipo como ejemplo en su artículo de 1988, porque son de las más sencillas para entender cómo funciona un agujero de gusano traversable.",
      "Si la boca sí tuviera masa, el viajero sentiría primero una atracción al acercarse, como si se aproximara a un planeta, pero no encontraría una superficie dura donde estrellarse. Al cruzar el punto más estrecho del cuello, todo se invertiría: ahora la gravedad de la otra boca tiraría hacia fuera, hacia la salida. Por eso los físicos dicen que, en un agujero de gusano traversable, el cuello se comporta como la cima de una colina entre dos valles, más que como el fondo de un pozo.",
      "Esta imagen ayuda a responder una pregunta frecuente: ¿haría falta mucha velocidad para atravesar el túnel? En un diseño ideal, no. El viajero podría avanzar despacio, con sus propios motores, y cruzar el cuello sin que la gravedad lo acelerara de forma peligrosa. Lo que permitiría el viaje rápido entre estrellas no sería una velocidad enorme, sino el hecho de que el camino a través del cuello es mucho más corto que el camino por el espacio exterior."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El mismo año 1973, el físico ruso Kirill Bronnikov publicó de forma independiente una solución muy parecida a la de Ellis. Por eso en algunos libros se habla del agujero de gusano de Ellis-Bronnikov. Ambos trabajos aparecieron más de una década antes de que Morris y Thorne hicieran famosos los agujeros de gusano traversables." },
      { label: "Dato Científico", icon: "atom", text: "La solución de Ellis se sostiene con un campo escalar especial cuya energía tiene el signo contrario al habitual; los físicos lo llaman campo fantasma. No se conoce ningún campo así en la naturaleza. Aun así, la solución es muy útil como modelo de prueba porque es estática, simétrica y fácil de estudiar, y por eso aparece en muchos cursos de relatividad general." }
    ],
    fact: "Las sondas espaciales usan la gravedad de los planetas para cambiar su velocidad y su dirección sin gastar combustible, una maniobra llamada asistencia gravitatoria. Las Voyager 1 y 2 aprovecharon a Júpiter y Saturno para acelerar hacia el sistema solar exterior. Una nave que se acercara a la boca de un agujero de gusano con masa podría usar una maniobra parecida para ajustar su trayectoria de entrada.",
  },
  {
    id: "atajo-para-mensajes",
    bannerImage: '/assets/wormhole/infographic_m7/banner_atajo-para-mensajes.webp',
    bannerCaption: "La luz tarda más de 22 horas en llegar a la Voyager 1; a través de un agujero de gusano, la señal recorrería un camino mucho más corto.",
    title: "Un Atajo para los Mensajes",
    color: '#6F7F5B',
    btnImage: '/assets/wormhole/infographic_m7/btn_atajo-para-mensajes.webp',
    image: '/assets/wormhole/infographic_m7/hero_atajo-para-mensajes.webp',
    content: [
      "En el espacio, incluso la luz necesita tiempo para llegar a su destino. Una señal de radio tarda alrededor de 1.3 segundos en llegar a la Luna, entre unos 3 y 22 minutos en llegar a Marte según la posición de los planetas y más de 22 horas en alcanzar la sonda Voyager 1, que está más allá de los límites del viento solar. Por eso los controladores no pueden manejar los robots de Marte con un mando en tiempo real: cada orden llega con retraso.",
      "Si miramos más lejos, las distancias se vuelven enormes. Próxima Centauri, la estrella más cercana al Sol, está a unos 4.2 años luz, así que una conversación con alguien que viviera allí tendría pausas de más de ocho años entre pregunta y respuesta. La galaxia de Andrómeda está a unos 2.5 millones de años luz. Un mensaje enviado hoy llegaría cuando la humanidad, probablemente, ya fuera muy diferente. Para la comunicación interestelar, la velocidad de la luz es una barrera muy real.",
      "Un agujero de gusano traversable cambiaría por completo esta situación, no porque la señal viaje más rápido que la luz, sino porque recorrería un camino más corto. Si el cuello mide unos pocos kilómetros, una señal de radio lo cruzaría en millonésimas de segundo, aunque las bocas estuvieran separadas por años luz. Para quienes están a cada lado, la comunicación parecería casi instantánea. Este es el sentido en que los físicos dicen que un agujero de gusano es un atajo.",
      "Sin embargo, mantener abierto un canal así sería muy costoso según los modelos actuales. El cuello necesitaría energía negativa de forma continua, y cualquier señal o nave que lo atravesara añadiría su propia energía, que podría desestabilizarlo. Algunos estudios teóricos sugieren que agujeros de gusano muy pequeños, incluso microscópicos, serían más fáciles de sostener y solo dejarían pasar señales. Pero ni siquiera esos pequeños túneles han sido creados ni observados jamás.",
      "Hay además una consecuencia importante que conecta con otros módulos del curso. Si dos lugares lejanos pueden comunicarse por un atajo, y una de las bocas se mueve o se coloca en un campo gravitatorio intenso, el atajo podría conectar también momentos distintos del tiempo. Esto haría posibles los mensajes al pasado y sus paradojas. Por eso muchos físicos sospechan que la naturaleza pone límites a estos atajos, aunque todavía no sabemos exactamente cuáles."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La Voyager 1 fue lanzada en 1977 y en 2012 se convirtió en el primer objeto fabricado por humanos en entrar en el espacio interestelar. Sus transmisores tienen una potencia de unos 22 vatios, menos que una bombilla común, y aun así las grandes antenas de la Red de Espacio Profundo de la NASA logran captar su señal, debilísima, después de viajar más de veinte mil millones de kilómetros." },
      { label: "Dato Científico", icon: "atom", text: "Un año luz es la distancia que recorre la luz en un año en el vacío: unos 9.46 billones de kilómetros. La luz viaja a unos 299,792 kilómetros por segundo, así que da más de siete vueltas a la Tierra en un segundo. Aunque parece rapidísima, en escalas galácticas se vuelve lenta: cruzar la Vía Láctea le toma unos cien mil años." }
    ],
    fact: "Ningún experimento ha encontrado jamás una señal que viaje más rápido que la luz. En 2011, el experimento OPERA anunció neutrinos aparentemente más rápidos que la luz, pero en 2012 se descubrió que el resultado se debía a un cable de fibra óptica mal conectado. Por eso los agujeros de gusano resultan tan interesantes en teoría: permitirían llegar antes sin romper ese límite de velocidad dentro del túnel.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM7)" strokeWidth="2.5" strokeLinecap="round" />
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
          <linearGradient id="gradWormholeM7" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ANATOMÍA DE UN ATAJO CÓSMICO</text>
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
          layoutId="activeDotWormholeM7"
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
export default function InteractiveInfographic_WormholeM7() {
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
              🏆 Bocas, cuello, energía negativa y la ventana esférica hacia otro cielo
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
