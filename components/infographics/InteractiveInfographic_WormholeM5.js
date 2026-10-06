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
  "Visser, M. (1989). Traversable wormholes: Some simple examples. Physical Review D, 39, 3182-3184.",
  "Visser, M. (1995). Lorentzian Wormholes: From Einstein to Hawking. AIP Press.",
  "Friedman, J. L., Schleich, K. y Witt, D. M. (1993). Topological censorship. Physical Review Letters, 71, 1486-1489.",
  "Ford, L. H. y Roman, T. A. (1996). Quantum field theory constrains traversable wormhole geometries. Physical Review D, 53, 5496-5507.",
  "Shinkai, H. y Hayward, S. A. (2002). Fate of the first traversible wormhole: Black-hole collapse or inflationary expansion. Physical Review D, 66, 044005.",
  "Visser, M., Kar, S. y Dadhich, N. (2003). Traversable wormholes with arbitrarily small energy condition violations. Physical Review Letters, 90, 201102.",
  "Lamoreaux, S. K. (1997). Demonstration of the Casimir Force in the 0.6 to 6 μm Range. Physical Review Letters, 78, 5-8.",
  "James, O., von Tunzelmann, E., Franklin, P. y Thorne, K. S. (2015). Visualizing Interstellar's Wormhole. American Journal of Physics, 83, 486-499.",
  "Gao, P., Jafferis, D. L. y Wall, A. C. (2017). Traversable wormholes via a double trace deformation. Journal of High Energy Physics, 2017(12), 151."
];

const INFOGRAPHIC_NODES = [
  {
    id: "bocas-esfericas",
    bannerImage: '/assets/wormhole/infographic_m5/banner_bocas-esfericas.webp',
    bannerCaption: "La boca de un agujero de gusano se vería como una esfera de cristal que muestra, deformado, el paisaje del otro extremo.",
    title: "Bocas Esféricas, No Agujeros Planos",
    color: '#4E6E81',
    btnImage: '/assets/wormhole/infographic_m5/btn_bocas-esfericas.webp',
    image: '/assets/wormhole/infographic_m5/hero_bocas-esfericas.webp',
    content: [
      "En los dibujos, un agujero de gusano suele aparecer como un embudo sobre una superficie plana. Ese dibujo es útil, pero engaña: representa un espacio de solo dos dimensiones. En nuestro espacio de tres dimensiones, la entrada de un agujero de gusano, llamada boca, no sería un círculo plano como la boca de un pozo, sino una esfera. Podrías acercarte a ella desde cualquier dirección, por arriba, por abajo o por los lados, y siempre verías una forma redonda.",
      "¿Qué verías dentro de esa esfera? No una superficie oscura, sino el paisaje del otro extremo del túnel. La luz de las estrellas y galaxias del otro lado atravesaría el agujero de gusano y saldría por la boca que tienes delante. Por eso la boca parecería una bola de cristal que muestra otra región del universo, con sus estrellas y nebulosas comprimidas y deformadas. Alrededor de la esfera, además, verías tu propio cielo distorsionado por la gravedad de la boca.",
      "Esa distorsión se llama lente gravitacional. La masa y la geometría de la boca curvan los rayos de luz que pasan cerca, de forma parecida a como una lupa desvía la luz. Las estrellas que están justo detrás aparecerían estiradas en arcos o incluso duplicadas, y si la alineación fuera perfecta se formaría un anillo luminoso. A diferencia de un agujero negro, la boca de un agujero de gusano traversable no tendría horizonte de eventos, así que no habría una zona negra de la que nada regresa.",
      "Durante mucho tiempo estas imágenes fueron solo cálculos. En 2014, la película «Interstellar», de Christopher Nolan, mostró una boca de agujero de gusano calculada con las ecuaciones de la relatividad general. Kip Thorne fue asesor científico y productor ejecutivo, y trabajó con el equipo de efectos visuales de la empresa Double Negative. El resultado fue una esfera que muestra una galaxia lejana, y el método se publicó en 2015 en la revista American Journal of Physics.",
      "En la película, el agujero de gusano aparece cerca de Saturno, y desde la nave Endurance se ve como una bola brillante con estrellas de otra galaxia en su interior. El equipo comprobó que el aspecto de la esfera depende sobre todo de tres medidas: el radio de la garganta, la longitud del túnel y cuánto se curva el espacio alrededor de la boca. Al cambiar esos valores cambiaban el tamaño de la imagen del otro lado y la cantidad de imágenes repetidas del cielo, así que se eligieron con cuidado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "«Interstellar» ganó en 2015 el Óscar a los mejores efectos visuales. Para mostrar el agujero de gusano y el agujero negro Gargantúa, el equipo de Double Negative desarrolló un programa que sigue la trayectoria de haces de luz en el espacio-tiempo curvo. Algunos fotogramas necesitaron hasta 100 horas de cálculo, y el proyecto produjo también artículos científicos sobre la apariencia de los agujeros negros en rotación." },
      { label: "Dato Científico", icon: "atom", text: "Los físicos representan los agujeros de gusano con diagramas de inmersión: toman una rebanada de dos dimensiones del espacio y la dibujan como si fuera una superficie dentro de un espacio de tres dimensiones. Así aparece el famoso embudo doble. Pero el espacio que rodea el embudo en el dibujo no existe en la realidad: es solo una ayuda visual para entender cómo cambian las distancias dentro del túnel." }
    ],
    fact: "En 1973, el físico estadounidense Homer Ellis publicó una solución de las ecuaciones de Einstein que describe un túnel con dos bocas, al que llamó «drainhole», algo así como desagüe. Ese mismo año, el ruso Kirill Bronnikov encontró de forma independiente una solución parecida. Hoy se considera uno de los primeros modelos de agujero de gusano que, en principio, podría cruzarse, aunque necesita un campo con propiedades exóticas.",
  },
  {
    id: "garganta-y-atajo",
    bannerImage: '/assets/wormhole/infographic_m5/banner_garganta-y-atajo.webp',
    bannerCaption: "La garganta es la parte más estrecha del túnel; su forma decide cuánto dura el viaje y qué fuerzas sentiría el viajero.",
    title: "La Garganta: El Punto Más Estrecho",
    color: '#7B6E5A',
    btnImage: '/assets/wormhole/infographic_m5/btn_garganta-y-atajo.webp',
    image: '/assets/wormhole/infographic_m5/hero_garganta-y-atajo.webp',
    content: [
      "Si las bocas son las puertas, la garganta es el pasillo. Se llama así a la región más estrecha del agujero de gusano, el punto donde el túnel deja de cerrarse y empieza a abrirse otra vez hacia la otra boca. En los modelos más sencillos, la garganta también es esférica, y su tamaño se describe con un solo número: su radio. Ese radio podría ser, en teoría, de unos pocos metros o de muchos kilómetros, según la solución matemática que se elija.",
      "En 1988, Michael Morris y Kip Thorne, del Instituto Tecnológico de California, publicaron un artículo en la revista American Journal of Physics que cambió el enfoque. En lugar de buscar agujeros de gusano entre las soluciones conocidas, decidieron diseñarlos como lo haría un ingeniero: primero eligieron la forma del túnel que querían y después calcularon, con las ecuaciones de Einstein, qué tipo de materia haría falta para mantenerlo así. La respuesta resultó ser la parte más difícil.",
      "Su descripción usa dos funciones matemáticas. La primera, llamada función de forma, dice cómo cambia el tamaño del túnel desde la garganta hasta las bocas. La segunda, llamada función de corrimiento al rojo, indica cómo corre el tiempo en cada punto y, con eso, cuánta gravedad se siente. Morris y Thorne mostraron que se puede elegir esta segunda función para que la gravedad dentro del túnel sea muy débil, o incluso nula, de modo que nadie caería hacia el centro.",
      "Esto corrige una idea común: un agujero de gusano traversable no tiene por qué tirar con fuerza de todo lo que se acerca. Visto desde lejos, cada boca tendría cierta masa y atraería a los objetos como cualquier astro, pero cuánto depende del diseño. Lo que el agujero de gusano no puede tener, si queremos cruzarlo, es un horizonte de eventos, porque ese horizonte impediría el regreso. Morris y Thorne pusieron esa condición en su lista de requisitos para que el viaje fuera posible.",
      "La longitud del túnel es otro dato clave. La distancia entre las bocas a través de la garganta no tiene que ver con la distancia entre ellas por el espacio normal. Las dos bocas podrían estar separadas por miles de años luz en nuestro universo y, aun así, estar unidas por un túnel de unos cientos de metros. Así funcionaría el atajo: el viajero no iría más rápido que la luz, sino que recorrería un camino mucho más corto que el que tendría que seguir un rayo de luz por fuera."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El artículo de Morris y Thorne nació de una consulta de Carl Sagan. En 1985, mientras terminaba su novela «Contacto», Sagan pidió consejo a Thorne para que el viaje de su protagonista fuera científicamente razonable. Thorne y su estudiante Morris aprovecharon el problema para escribir un artículo pensado como herramienta para enseñar relatividad general a estudiantes universitarios." },
      { label: "Dato Científico", icon: "atom", text: "En la métrica de Morris-Thorne, la función de forma suele escribirse con la letra b y la función de corrimiento al rojo con la letra griega fi. En la garganta, el valor de b coincide exactamente con el radio del túnel. Para que el túnel se ensanche a ambos lados, su forma debe abrirse como una trompeta, una exigencia que los físicos llaman condición de ensanchamiento y que conduce directamente a la necesidad de materia exótica." }
    ],
    fact: "El interior de un agujero de gusano se parece a un reloj de arena: ancho en los extremos y estrecho en el centro. Pero hay una diferencia importante. La parte estrecha de un reloj de arena está rodeada de aire y se puede mirar desde fuera, mientras que en un agujero de gusano no existe un exterior del túnel desde el cual observar la garganta: el túnel es el propio espacio, y solo se puede recorrer por dentro.",
  },
  {
    id: "puente-que-se-cierra",
    bannerImage: '/assets/wormhole/infographic_m5/banner_puente-que-se-cierra.webp',
    bannerCaption: "En 1962, Fuller y Wheeler mostraron que el puente de Einstein-Rosen se abre y se estrangula tan rápido que ni la luz lo cruza.",
    title: "Un Puente Que Se Cierra Solo",
    color: '#6E5F7F',
    btnImage: '/assets/wormhole/infographic_m5/btn_puente-que-se-cierra.webp',
    image: '/assets/wormhole/infographic_m5/hero_puente-que-se-cierra.webp',
    content: [
      "Einstein y Rosen describieron su puente en 1935 como una estructura que parecía estática, es decir, que no cambiaba con el tiempo. Pero aquella descripción usaba coordenadas que no mostraban todo el espacio-tiempo. En 1960, Martin Kruskal y George Szekeres encontraron, cada uno por su lado, una forma de dibujar el espacio-tiempo completo de un agujero negro de Schwarzschild eterno. Con ese mapa quedó claro que el puente no es estático, sino que evoluciona con el tiempo.",
      "En 1962, Robert Fuller y John Wheeler analizaron con detalle qué le pasa al puente. Descubrieron que la garganta empieza cerrada, se abre hasta un tamaño máximo y vuelve a cerrarse, todo en un instante. La apertura dura tan poco que ni siquiera un rayo de luz alcanzaría a cruzar de un lado al otro antes de que el puente se estrangule. Cualquier viajero que lo intentara quedaría atrapado y terminaría en la singularidad del interior del agujero negro.",
      "Por eso los físicos dicen que el puente de Einstein-Rosen no es traversable. No es un túnel que nadie ha cruzado aún: es un túnel que la propia geometría impide cruzar. Además, el puente completo solo existe en un agujero negro ideal que ha estado ahí desde siempre. Los agujeros negros reales nacen del colapso de estrellas, y en ellos ni siquiera aparece la segunda región exterior, porque la materia de la estrella ocupa el lugar donde estaría el puente.",
      "¿Y los agujeros de gusano diseñados para cruzarse? También tienen un problema serio: la estabilidad. Un objeto es estable si, al empujarlo un poco, vuelve a su estado original, como una canica en el fondo de un tazón. Es inestable si un empujón diminuto lo aleja cada vez más, como una canica en la cima de una colina. Los cálculos indican que muchos modelos de agujero de gusano se comportan como la canica en la cima: la más mínima perturbación los saca del equilibrio.",
      "En 2002, Hisa-aki Shinkai y Sean Hayward simularon por computadora el agujero de gusano de Ellis, uno de los modelos traversables más estudiados. Encontraron que, al añadir un pulso diminuto de energía normal, el túnel colapsaba hasta formar un agujero negro y, si el pulso era de energía negativa, se expandía sin control. Cualquier viajero, o incluso la luz que lo cruzara, sería una perturbación, así que un agujero de gusano real necesitaría algún mecanismo que lo estabilizara."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El mapa de Kruskal y Szekeres muestra cuatro regiones: nuestro universo, otro universo exterior, el interior del agujero negro y una región llamada agujero blanco, de la que todo sale y en la que nada puede entrar. Los agujeros blancos son soluciones válidas de las ecuaciones de Einstein, pero nunca se ha observado ninguno, y la mayoría de los físicos cree que no se forman en la naturaleza." },
      { label: "Dato Científico", icon: "atom", text: "Para ver por qué la luz no alcanza a cruzar, los físicos usan diagramas de Penrose, ideados por Roger Penrose en los años sesenta. En ellos los rayos de luz siempre viajan en líneas inclinadas a 45 grados. En el diagrama del agujero negro eterno, ninguna de esas líneas puede ir de un universo exterior al otro: todo camino termina en la singularidad. Penrose recibió el Premio Nobel de Física en 2020." }
    ],
    fact: "Los agujeros negros de masa estelar se forman cuando el núcleo de una estrella muy masiva colapsa al final de su vida. En ese colapso, la estrella cae hacia adentro y el espacio-tiempo resultante solo tiene un exterior: el nuestro. Por eso, aunque el agujero negro eterno de los libros de texto contiene un puente matemático, en los agujeros negros reales no se espera encontrar un camino hacia otro universo.",
  },
  {
    id: "materia-exotica",
    bannerImage: '/assets/wormhole/infographic_m5/banner_materia-exotica.webp',
    bannerCaption: "Para mantener abierta la garganta haría falta materia exótica, con una tensión mayor que su propia densidad de energía.",
    title: "Materia Exótica: Abrir en Vez de Cerrar",
    color: '#5C7F73',
    btnImage: '/assets/wormhole/infographic_m5/btn_materia-exotica.webp',
    image: '/assets/wormhole/infographic_m5/hero_materia-exotica.webp',
    content: [
      "Morris y Thorne descubrieron que la gravedad de la materia normal siempre tiende a cerrar la garganta. La razón es que la materia ordinaria enfoca los rayos de luz, como una lupa, y los hace converger. En cambio, una garganta que se ensancha hacia ambas bocas necesita que los rayos de luz que llegan juntos se separen al salir. Para lograr ese efecto, que funciona como una lente divergente, el material del túnel debe tener propiedades que ninguna sustancia conocida tiene en grandes cantidades.",
      "Los físicos llaman materia exótica a ese material. En la garganta debería existir una tensión enorme en la dirección del túnel, es decir, una presión negativa, como la de una cuerda estirada, tan grande que superara la densidad de energía del propio material. Esa combinación produce una gravedad repulsiva: en lugar de cerrar el túnel, lo mantiene abierto. Además, un observador que cruzara la garganta a gran velocidad mediría allí una densidad de energía menor que cero.",
      "Es importante no confundir la materia exótica con otras cosas que suenan parecido. No es antimateria: la antimateria, como el positrón descubierto en 1932, tiene energía positiva y cae hacia abajo igual que la materia normal, como confirmó en 2023 el experimento ALPHA-g del CERN con átomos de antihidrógeno. Tampoco es materia oscura, que se detecta por su gravedad atractiva en las galaxias y se comporta como una masa positiva más.",
      "¿Y la energía oscura, que acelera la expansión del universo? Tiene presión negativa, y por eso a veces se compara con la materia exótica. Pero en su forma más aceptada, la constante cosmológica, su tensión es exactamente igual a su densidad de energía, no mayor, así que no alcanza para abrir un túnel. Solo una forma hipotética llamada energía fantasma, con más tensión que energía, serviría. Las mediciones actuales son compatibles con una constante cosmológica, aunque el debate sigue abierto.",
      "Entonces, ¿existe algo con energía negativa? Sí, en cantidades pequeñísimas. En 1948, el físico neerlandés Hendrik Casimir predijo que dos placas metálicas paralelas, muy cercanas en el vacío, se atraen porque entre ellas caben menos fluctuaciones cuánticas que afuera. La densidad de energía entre las placas queda por debajo de la del vacío normal. Steve Lamoreaux midió esta fuerza con precisión en 1997, y hoy el efecto Casimir es un resultado bien comprobado."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El efecto Casimir es imperceptible a distancias cotidianas, pero crece muy rápido al acercar las placas. Cuando están separadas unos 10 nanómetros, apenas unas cien veces el tamaño de un átomo, la fuerza por unidad de área es comparable a la presión atmosférica. Por eso los ingenieros que diseñan micromáquinas deben tenerlo en cuenta, ya que puede hacer que piezas diminutas se peguen entre sí." },
      { label: "Dato Científico", icon: "atom", text: "La luz comprimida, llamada en inglés squeezed light, es otra situación en la que la física cuántica permite energía negativa durante instantes. En ella, las fluctuaciones del campo electromagnético bajan del nivel del vacío en ciertos momentos, a cambio de crecer en otros. Esta técnica se usa hoy en los detectores LIGO y Virgo para reducir el ruido cuántico y escuchar mejor las ondas gravitacionales." }
    ],
    fact: "Morris y Thorne llamaron materia exótica a cualquier material cuya tensión supere su densidad de energía. No inventaron esta necesidad por gusto: las ecuaciones de Einstein la exigen para cualquier túnel que se ensanche a ambos lados de su garganta. Años después, David Hochberg y Matt Visser demostraron que esto vale de forma muy general, no solo para los modelos esféricos y sencillos del artículo original.",
  },
  {
    id: "condiciones-de-energia",
    bannerImage: '/assets/wormhole/infographic_m5/banner_condiciones-de-energia.webp',
    bannerCaption: "Las condiciones de energía son reglas que cumple la materia ordinaria; los agujeros de gusano traversables necesitan violarlas.",
    title: "Las Condiciones de Energía",
    color: '#8E6E58',
    btnImage: '/assets/wormhole/infographic_m5/btn_condiciones-de-energia.webp',
    image: '/assets/wormhole/infographic_m5/hero_condiciones-de-energia.webp',
    content: [
      "Las ecuaciones de Einstein, por sí solas, aceptan casi cualquier forma del espacio-tiempo si se permite cualquier tipo de materia. Para separar lo físicamente razonable de lo absurdo, los físicos añadieron unas reglas llamadas condiciones de energía. Son restricciones que dicen, en esencia, que la densidad de energía medida por cualquier observador nunca debe ser negativa y que la gravedad de la materia debe ser atractiva. Toda la materia que conocemos en grandes cantidades las cumple.",
      "Hay varias versiones. La condición de energía débil dice que todo observador mide una densidad de energía positiva o cero. La condición de energía nula es parecida, pero se refiere a lo que se mediría viajando casi a la velocidad de la luz. La condición fuerte exige que la gravedad siempre atraiga, y la condición dominante agrega que la energía no puede fluir más rápido que la luz. Cada una sirve para demostrar distintos teoremas sobre los agujeros negros y el universo.",
      "Los agujeros de gusano traversables violan la condición de energía nula en su garganta, que es la más débil de todas y la más difícil de romper. Morris y Thorne lo mostraron en 1988 para su modelo, y en 1993 John Friedman, Kristin Schleich y Donald Witt probaron un resultado más general, llamado teorema de censura topológica: si la materia cumple una versión promediada de esa condición, ningún viajero puede atravesar un túnel en el espacio y volver a salir a nuestro universo.",
      "Que las condiciones de energía sean razonables no significa que sean leyes absolutas. La física cuántica permite violarlas de forma local y breve, como ocurre en el efecto Casimir o en la luz comprimida. Además, la condición fuerte se viola a escala cósmica: la energía oscura hace que la expansión del universo se acelere, algo que se descubrió en 1998 al estudiar supernovas lejanas y que mereció el Premio Nobel de Física de 2011. Esa violación, sin embargo, no basta para abrir un túnel.",
      "La naturaleza parece poner límites a esas violaciones. En los años noventa, Lawrence Ford y Thomas Roman desarrollaron las llamadas desigualdades cuánticas: cuanto más negativa es la energía en un lugar, menos tiempo puede durar, y suele ir seguida de una cantidad mayor de energía positiva. Ellos mismos lo compararon con un préstamo con intereses: la naturaleza te deja deber energía, pero por poco tiempo y a cambio de devolver después un poco más de lo que pediste."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las condiciones de energía son también la base de los famosos teoremas de singularidad de Roger Penrose y Stephen Hawking, publicados entre 1965 y 1970. Estos teoremas muestran que, si la materia cumple esas condiciones, el colapso de una estrella muy masiva y el origen del universo llevan inevitablemente a una singularidad, un lugar donde la relatividad general deja de funcionar." },
      { label: "Dato Científico", icon: "atom", text: "La condición de energía nula promediada, conocida por sus siglas en inglés ANEC, pide que la energía sumada a lo largo de todo el recorrido de un rayo de luz no sea negativa. Es más tolerante que la versión local, porque admite zonas de energía negativa compensadas por otras. Entre 2016 y 2017 se demostró que la ANEC se cumple en una amplia clase de teorías cuánticas en espacio-tiempo plano." }
    ],
    fact: "La expansión acelerada del universo se descubrió midiendo supernovas de tipo Ia, explosiones de enanas blancas cuyo brillo máximo es casi uniforme y que sirven como «velas estándar». Dos equipos independientes, dirigidos por Saul Perlmutter y por Brian Schmidt y Adam Riess, encontraron en 1998 que las supernovas lejanas brillaban menos de lo esperado, señal de que el universo se expande cada vez más rápido.",
  },
  {
    id: "cuanta-energia-negativa",
    bannerImage: '/assets/wormhole/infographic_m5/banner_cuanta-energia-negativa.webp',
    bannerCaption: "Según estimaciones de Matt Visser, una garganta de un metro necesitaría energía negativa equivalente a la masa de Júpiter.",
    title: "¿Cuánta Energía Negativa Haría Falta?",
    color: '#6B6F8F',
    btnImage: '/assets/wormhole/infographic_m5/btn_cuanta-energia-negativa.webp',
    image: '/assets/wormhole/infographic_m5/hero_cuanta-energia-negativa.webp',
    content: [
      "Saber que se necesita materia exótica es solo la mitad del problema; la otra mitad es cuánta. Uno de los cálculos más citados proviene del físico neozelandés Matt Visser, que en 1989 estudió agujeros de gusano de capa delgada, en los que toda la materia exótica se concentra en una superficie muy fina alrededor de la garganta. Con ese modelo, la cantidad necesaria depende sobre todo del tamaño del túnel: cuanto más ancha es la garganta, más energía negativa hace falta.",
      "Los números son enormes. Para una garganta de apenas un metro de radio, la energía negativa necesaria equivale, mediante la famosa fórmula E = mc², a una masa negativa del orden de la de Júpiter, el planeta más grande del sistema solar, unas 318 veces más masivo que la Tierra. Como la cantidad crece en proporción al tamaño, una garganta mil veces más ancha necesitaría unas mil veces más energía negativa. Nada en el universo conocido ofrece esas cantidades.",
      "Para comparar, el efecto Casimir produce densidades de energía negativa muchísimo más pequeñas y solo en volúmenes diminutos, entre placas separadas por menos de una milésima de milímetro. Por eso la mayoría de los físicos considera que construir un agujero de gusano macroscópico está fuera del alcance de cualquier tecnología previsible. Esto no significa que las leyes de la física lo prohíban con certeza, sino que requeriría recursos y procesos que hoy son completamente desconocidos.",
      "Las desigualdades cuánticas de Ford y Roman empeoran el panorama. En 1996 aplicaron sus límites a los agujeros de gusano y encontraron que, si la energía negativa proviene de campos cuánticos, en la mayoría de los modelos tendría que concentrarse en una banda extremadamente delgada comparada con el tamaño de la garganta. El resultado sería un túnel con regiones de curvatura muy intensa, justo lo contrario de lo que desea un viajero que busca un paso suave y seguro.",
      "No todo son malas noticias. En 2003, Matt Visser, Sayan Kar y Naresh Dadhich publicaron en Physical Review Letters que, eligiendo bien la forma del túnel, la violación total de las condiciones de energía puede hacerse tan pequeña como se quiera, aunque nunca cero. Y en 2017, Ping Gao, Daniel Jafferis y Aron Wall describieron un agujero de gusano traversable dentro de un modelo teórico de gravedad cuántica, abierto gracias a una conexión cuántica entre sus dos bocas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 2022, un equipo dirigido por Daniel Jafferis y Maria Spiropulu usó el procesador cuántico Sycamore de Google para simular un modelo que, matemáticamente, se comporta como un agujero de gusano traversable diminuto. Muchos titulares dijeron que habían creado un agujero de gusano, pero no fue así: se trató de una simulación con nueve cúbits que reproduce algunos rasgos del modelo, no de un túnel real en el espacio." },
      { label: "Dato Científico", icon: "atom", text: "El agujero de gusano de Gao, Jafferis y Wall tiene una peculiaridad: cruzarlo tarda más que enviar una señal por el espacio exterior entre sus dos bocas. Por eso no sirve como atajo, pero demuestra que, en ciertos modelos cuánticos, una garganta puede abrirse y dejar pasar información sin romper la causalidad. Es una herramienta teórica para estudiar cómo se relacionan la gravedad y el entrelazamiento cuántico." }
    ],
    fact: "Júpiter tiene una masa de unos 1.9 por 10 elevado a 27 kilogramos, más del doble de la de todos los demás planetas del sistema solar juntos. Si convirtiéramos toda esa masa en energía con la fórmula de Einstein, obtendríamos más energía de la que el Sol emitirá en toda su vida, de unos 10,000 millones de años. Esa es la escala de energía, pero negativa, que pedirían los modelos más simples.",
  },
  {
    id: "fuerzas-de-marea",
    bannerImage: '/assets/wormhole/infographic_m5/banner_fuerzas-de-marea.webp',
    bannerCaption: "Las fuerzas de marea estiran a lo largo y aprietan a lo ancho; Morris y Thorne exigieron que no superaran la gravedad terrestre.",
    title: "Fuerzas de Marea: El Estirón del Viajero",
    color: '#7F8A6A',
    btnImage: '/assets/wormhole/infographic_m5/btn_fuerzas-de-marea.webp',
    image: '/assets/wormhole/infographic_m5/hero_fuerzas-de-marea.webp',
    content: [
      "Las fuerzas de marea aparecen cuando la gravedad no es igual en todas las partes de un objeto. En la Tierra, la Luna atrae con un poco más de fuerza el océano del lado que la mira que el centro del planeta, y con un poco menos el océano del lado opuesto. Esa diferencia estira la Tierra a lo largo de la línea que apunta a la Luna y produce dos abultamientos de agua; por eso en muchas costas hay dos mareas altas cada día.",
      "El Sol también provoca mareas, aunque su efecto es menos de la mitad del de la Luna, porque las mareas dependen de cuánto cambia la gravedad con la distancia y no solo de su fuerza total. Cuando el Sol, la Luna y la Tierra se alinean, en luna nueva y luna llena, sus efectos se suman y se producen las mareas vivas, más intensas. Cuando forman un ángulo recto, en los cuartos creciente y menguante, se producen las mareas muertas, más suaves.",
      "En un lugar de gravedad extrema, las fuerzas de marea pueden ser terribles. Un astronauta que cayera de pies hacia un agujero negro de masa estelar sentiría que sus pies son atraídos con mucha más fuerza que su cabeza, mientras sus costados se aprietan hacia adentro. El resultado sería un estiramiento brutal que los físicos llaman, con humor, espaguetización. En un agujero negro de unas pocas masas solares, esto ocurriría incluso antes de llegar al horizonte de eventos.",
      "En un agujero de gusano, las fuerzas de marea dependen de cómo cambia la curvatura a lo largo del túnel. Por eso Morris y Thorne incluyeron en su diseño un requisito muy concreto: que la diferencia de aceleración entre la cabeza y los pies de un viajero de unos dos metros no superara la gravedad de la superficie terrestre, unos 9.8 metros por segundo cada segundo. Para cumplirlo, la garganta debe ser lo bastante grande y la curvatura debe cambiar de manera gradual.",
      "Morris y Thorne pidieron también que el viaje fuera cómodo en otros sentidos: que el viajero no sintiera aceleraciones mayores que la gravedad terrestre y que el trayecto completo durara alrededor de un año o menos, tanto para él como para quienes lo esperaran en las estaciones de cada boca. Estas condiciones convirtieron una idea de ciencia ficción en una lista concreta de problemas, que permite medir con claridad cuán lejos estamos de un agujero de gusano que se pueda usar."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En el centro de nuestra galaxia, el agujero negro Sagitario A* tiene unos 4 millones de veces la masa del Sol. Por ser tan grande, sus fuerzas de marea en el horizonte de eventos son suaves, y un astronauta podría cruzarlo sin sentir el estirón. Paradójicamente, cuanto más masivo es un agujero negro, más amable resulta en su borde, aunque el destino final en su interior sea el mismo." },
      { label: "Dato Científico", icon: "atom", text: "Los astronautas en órbita también experimentan fuerzas de marea diminutas. En la Estación Espacial Internacional, solo el centro de masa sigue exactamente una órbita libre; los objetos situados un poco más arriba o más abajo tienden a separarse lentamente de él. Este efecto, junto con el leve frenado causado por los restos de atmósfera, explica por qué dentro de la estación no hay una ingravidez perfecta, sino microgravedad." }
    ],
    fact: "En 2019, astrónomos que usaban telescopios del Observatorio Europeo Austral, entre otros, siguieron un destello llamado AT2019qiz: una estrella que se acercó demasiado a un agujero negro supermasivo, a unos 215 millones de años luz, y fue desgarrada por sus fuerzas de marea. Estos eventos de disrupción por marea muestran que la espaguetización no es solo un experimento mental, sino algo que el universo hace de verdad.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM5)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#4E6E81", "#7B6E5A", "#6E5F7F", "#5C7F73", "#8E6E58", "#6B6F8F", "#7F8A6A"];
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
          <linearGradient id="gradWormholeM5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">BOCAS, GARGANTAS Y ENERGÍA NEGATIVA</text>
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
          layoutId="activeDotWormholeM5"
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
export default function InteractiveInfographic_WormholeM5() {
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
              🏆 Cómo serían sus bocas, qué los sostiene y qué sentiría quien los cruce
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
