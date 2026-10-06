'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#E0A27A', style = {} }) {
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
  "Galilei, G. (1610). Sidereus Nuncius. Venecia: Tommaso Baglioni.",
  "Van Helden, A. (trad. y ed.) (1989). Sidereus Nuncius, or The Sidereal Messenger. Chicago: University of Chicago Press.",
  "Drake, S. (1978). Galileo at Work: His Scientific Biography. Chicago: University of Chicago Press.",
  "King, H. C. (1955). The History of the Telescope. Londres: Charles Griffin & Co.",
  "Museo Galileo – Istituto e Museo di Storia della Scienza, Florencia. Catálogo en línea de los telescopios de Galileo. https://www.museogalileo.it",
  "Falchi, F. et al. (2016). The new world atlas of artificial night sky brightness. Science Advances, 2(6), e1600377.",
  "NASA. James Webb Space Telescope: mission overview. https://science.nasa.gov/mission/webb/"
];

const INFOGRAPHIC_NODES = [
  {
    id: "de-holanda-a-padua",
    bannerImage: '/assets/galileo/infographic_m1/banner_de-holanda-a-padua.webp',
    bannerCaption: "En 1609 Galileo construyó su propio anteojo en Padua y lo mostró al Senado de Venecia desde el campanario de San Marcos.",
    title: "Del anteojo holandés al taller de Padua",
    color: '#5E7A96',
    btnImage: '/assets/galileo/infographic_m1/btn_de-holanda-a-padua.webp',
    image: '/assets/galileo/infographic_m1/hero_de-holanda-a-padua.webp',
    content: [
      "En el otoño de 1608, un fabricante de lentes llamado Hans Lippershey, que trabajaba en Middelburg (Países Bajos), pidió a los Estados Generales una patente para un instrumento que hacía ver cerca las cosas lejanas. Se la negaron, en parte porque otros artesanos, como Jacob Metius, afirmaban haber construido aparatos parecidos. Aun así, la noticia del «anteojo holandés» corrió por Europa en pocos meses y pronto se vendían versiones sencillas en ferias y tiendas de París y de otras ciudades.",
      "En 1609, Galileo Galilei tenía 45 años y era profesor de matemáticas en la Universidad de Padua, dentro de la República de Venecia. Había nacido en Pisa en 1564 y ya era conocido por sus estudios sobre el movimiento de los cuerpos. Cuando escuchó hablar del anteojo holandés, no se conformó con comprar uno: razonó cómo debían combinarse las lentes y construyó el suyo propio. Según contó él mismo, le bastó entender el principio de la refracción para reproducir el invento en muy poco tiempo.",
      "Su primer instrumento aumentaba unas tres veces. En agosto de 1609 ya tenía uno de unos ocho o nueve aumentos y lo presentó a los senadores venecianos, que subieron al campanario de San Marcos para mirar el horizonte. Con él podían distinguir barcos que se acercaban al puerto unas dos horas antes de verlos a simple vista. Para una república que vivía del comercio marítimo, aquello tenía un enorme valor militar y económico, así que el Senado le duplicó el salario y le ofreció su cátedra de por vida.",
      "Lo verdaderamente revolucionario no fue fabricar el aparato, sino decidir hacia dónde apuntarlo. Otros lo usaban para ver barcos, torres o soldados enemigos. Galileo lo dirigió al cielo nocturno de forma sistemática, noche tras noche, y anotó todo lo que veía con dibujos y medidas. A finales de 1609 ya había mejorado sus lentes hasta alcanzar unos 20 aumentos, suficientes para descubrir detalles que ningún ser humano había observado antes en toda la historia.",
      "Galileo no fue el único en mirar arriba con un anteojo. En Inglaterra, el matemático Thomas Harriot dibujó la Luna con un telescopio en julio de 1609, unos meses antes que él. Sin embargo, Harriot no publicó sus observaciones y su trabajo quedó olvidado durante siglos. Galileo, en cambio, interpretó lo que veía, lo comparó con las ideas aceptadas y lo dio a conocer rápidamente. Por eso decimos que la revolución del telescopio comenzó con él: no solo vio, sino que explicó y compartió."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La palabra «telescopio» no existía cuando Galileo empezó a usar el instrumento. Él lo llamaba «perspicillum» o simplemente anteojo. El nombre fue propuesto en 1611 por el erudito griego Giovanni Demisiani durante un banquete organizado en Roma por la Accademia dei Lincei en honor a Galileo. Viene de dos palabras griegas: «tele», que significa lejos, y «skopein», que significa mirar. Es decir, telescopio quiere decir literalmente «mirar lejos»." },
      { label: "Dato Científico", icon: "atom", text: "Un anteojo funciona gracias a la refracción, el cambio de dirección que sufre la luz cuando pasa de un material a otro, por ejemplo del aire al vidrio. Una lente convexa, más gruesa en el centro, desvía los rayos hacia un punto llamado foco. Cuanto más curva es la lente, más cerca queda ese foco. Combinando dos lentes con focos diferentes se consigue que un objeto lejano ocupe un ángulo mayor en nuestro ojo, y eso es lo que percibimos como aumento." }
    ],
    fact: "Galileo nació en Pisa el 15 de febrero de 1564, pero sus grandes descubrimientos telescópicos de 1609 y principios de 1610 los hizo en Padua, donde enseñó matemáticas durante dieciocho años, de 1592 a 1610. En septiembre de 1610 se mudó a Florencia como matemático y filósofo del gran duque Cosme II de Médici. La imagen de Galileo subiendo con su telescopio a la torre de Pisa mezcla dos historias distintas: la de sus estudios del movimiento y la de sus observaciones astronómicas.",
  },
  {
    id: "dentro-del-anteojo-galileano",
    bannerImage: '/assets/galileo/infographic_m1/banner_dentro-del-anteojo-galileano.webp',
    bannerCaption: "El anteojo galileano combinaba una lente convexa al frente y una cóncava junto al ojo, y mostraba la imagen derecha.",
    title: "Dentro del anteojo galileano",
    color: '#7A6A55',
    btnImage: '/assets/galileo/infographic_m1/btn_dentro-del-anteojo-galileano.webp',
    image: '/assets/galileo/infographic_m1/hero_dentro-del-anteojo-galileano.webp',
    content: [
      "El telescopio de Galileo era un tubo de madera forrado de papel o cuero con dos lentes de vidrio. Al frente llevaba una lente convexa, llamada objetivo, que recogía la luz de los astros y la hacía converger. Cerca del ojo colocaba una lente cóncava, el ocular, que interceptaba los rayos antes de que llegaran al foco y los volvía a enviar casi paralelos hacia la pupila. El resultado era una imagen ampliada y derecha, es decir, que no aparecía cabeza abajo como en otros diseños posteriores.",
      "El aumento de un telescopio se calcula dividiendo la distancia focal del objetivo entre la del ocular. Si el objetivo concentra la luz a un metro de distancia y el ocular tiene un foco de cinco centímetros, el instrumento aumenta veinte veces. Galileo entendió esta regla y por eso buscó objetivos de curvatura suave y focos largos, junto con oculares muy curvos. Así pasó de unos tres aumentos a unos veinte en pocos meses, y más tarde llegó a fabricar instrumentos de alrededor de treinta.",
      "Conseguir buenas lentes era lo más difícil. El vidrio de la época contenía burbujas e impurezas que deformaban las imágenes. Galileo conseguía piezas de vidrio, probablemente de los hornos de Murano y de Florencia, y las tallaba y pulía en su taller con moldes y abrasivos cada vez más finos. Descartaba muchas piezas: de las numerosas lentes que pulía, solo unas pocas servían para la astronomía. Esa paciencia artesanal explica por qué sus telescopios superaban a casi todos los que circulaban por Europa.",
      "El diseño galileano tenía un problema importante: un campo de visión muy estrecho. A través de su anteojo de veinte aumentos solo se veía a la vez una pequeña parte de la Luna, así que Galileo tenía que mover el tubo con cuidado para recorrerla. Además, las lentes simples separaban los colores de la luz y producían bordes irisados alrededor de los objetos brillantes. Para reducir este defecto, Galileo tapaba parte del objetivo con un diafragma, sacrificando algo de luz a cambio de una imagen más nítida.",
      "Hoy se conservan dos telescopios atribuidos a Galileo en el Museo Galileo de Florencia. Son tubos largos y delgados, el mayor de más de un metro, con un aspecto modesto para todo lo que lograron. En el mismo museo se guarda una lente objetivo agrietada, montada en un marco de marfil, que según la tradición pertenecía al telescopio con el que descubrió las lunas de Júpiter. Ver esas piezas recuerda que la gran ciencia puede empezar con instrumentos sencillos, siempre que se usen con rigor y curiosidad."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1611, Johannes Kepler propuso en su obra «Dioptrice» un telescopio distinto, con dos lentes convexas. Ese diseño invierte la imagen, pero ofrece un campo de visión mucho más amplio y permite colocar retículas para medir posiciones. Por eso, a lo largo del siglo XVII, el telescopio kepleriano o astronómico sustituyó al galileano en los observatorios. El diseño de Galileo sobrevivió en los prismáticos de teatro, que siguen siendo pequeños, ligeros y muestran la imagen derecha." },
      { label: "Dato Científico", icon: "atom", text: "Las lentes simples sufren aberración cromática porque el vidrio desvía cada color con un ángulo ligeramente distinto: el azul se refracta más que el rojo y llega a foco antes. Por eso los primeros telescopios mostraban halos de colores alrededor de los astros brillantes. El problema se redujo en el siglo XVIII con las lentes acromáticas, que unen dos tipos de vidrio con propiedades ópticas diferentes, llamados crown y flint, para que los colores principales coincidan en el mismo punto." }
    ],
    fact: "Un telescopio no solo aumenta: también recoge más luz que el ojo. La pupila humana, dilatada en la oscuridad, mide unos 7 milímetros, mientras que los objetivos de Galileo tenían unos pocos centímetros de abertura útil. Como la luz recogida depende del área, un objetivo de 3 centímetros capta casi veinte veces más luz que el ojo desnudo. Por eso Galileo pudo ver estrellas que nadie había visto: no estaban más cerca, simplemente su anteojo reunía suficiente luz para hacerlas visibles.",
  },
  {
    id: "montanas-y-crateres-lunares",
    bannerImage: '/assets/galileo/infographic_m1/banner_montanas-y-crateres-lunares.webp',
    bannerCaption: "Galileo observó la Luna a finales de 1609 y descubrió que estaba cubierta de montañas, cráteres y llanuras, no lisa como se creía.",
    title: "Una Luna con montañas y cráteres",
    color: '#6E7B85',
    btnImage: '/assets/galileo/infographic_m1/btn_montanas-y-crateres-lunares.webp',
    image: '/assets/galileo/infographic_m1/hero_montanas-y-crateres-lunares.webp',
    content: [
      "Entre finales de noviembre y diciembre de 1609, Galileo dedicó muchas noches a observar la Luna con su anteojo de unos veinte aumentos. Según la física de Aristóteles, todos los cuerpos celestes estaban hechos de una sustancia perfecta, el éter, y debían ser esferas lisas e inmutables. Lo que Galileo vio contradecía por completo esa idea: la superficie lunar era áspera, irregular y llena de relieves, con zonas oscuras más llanas y zonas claras repletas de elevaciones y hoyos circulares.",
      "La clave estaba en el terminador, la línea que separa la parte iluminada de la parte oscura de la Luna. Galileo notó que cerca de esa línea aparecían puntitos de luz dentro de la zona en sombra, que poco a poco se agrandaban y se unían a la parte iluminada. Lo explicó igual que ocurre al amanecer en la Tierra: las cumbres de las montañas reciben la luz del Sol antes que los valles. También vio que los cráteres tenían el borde iluminado de un lado y una sombra negra del otro.",
      "Galileo no se limitó a describir, sino que midió. Calculó la distancia entre el terminador y uno de esos puntos luminosos y, usando geometría con triángulos rectángulos y el tamaño conocido de la Luna, estimó la altura de la montaña. Su resultado fue que algunas montañas lunares alcanzaban varios kilómetros de altura, comparables o superiores a las más altas que se conocían en Europa. Fue una de las primeras veces que alguien midió el relieve de otro mundo con un método matemático.",
      "Las mediciones modernas confirman que Galileo iba por buen camino. Gracias a sondas como el Lunar Reconnaissance Orbiter de la NASA, hoy sabemos que la Luna tiene montañas de más de 5,000 metros, como Mons Huygens en los Montes Apeninos, y cráteres de todos los tamaños, desde pequeños hoyos hasta enormes cuencas de cientos de kilómetros. Las manchas oscuras que Galileo veía, llamadas mares, son en realidad grandes llanuras de lava solidificada hace miles de millones de años.",
      "Galileo dibujó lo que veía con aguadas de tinta sepia que todavía se conservan en la Biblioteca Nacional Central de Florencia. En los grabados de su libro aparecen las fases de la Luna con su terminador quebrado y un gran cráter cerca del centro del disco que exageró un poco para que se entendiera mejor. Su conclusión fue revolucionaria: la Luna era un mundo con relieves, parecido en ese sentido a la Tierra. Si el cielo no era perfecto, la barrera entre lo terrestre y lo celeste empezaba a derrumbarse."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Galileo también explicó la luz cenicienta, el tenue brillo que permite ver la parte oscura de la Luna cuando está en fase creciente delgada. Dijo que esa luz es luz del Sol reflejada por la Tierra hacia la Luna, que luego vuelve a nosotros. Leonardo da Vinci había propuesto la misma idea un siglo antes en sus cuadernos, pero nunca la publicó. Esta explicación implicaba algo muy atrevido para la época: que la Tierra brilla en el cielo lunar como un planeta más." },
      { label: "Dato Científico", icon: "atom", text: "La Luna no tiene una atmósfera densa ni agua líquida, así que casi no hay erosión. Por eso conserva cráteres de impacto formados hace miles de millones de años, mientras que en la Tierra la lluvia, el viento y la tectónica de placas borran la mayoría. Las sombras se ven tan negras y nítidas en la Luna precisamente porque no hay aire que disperse la luz. Ese contraste extremo fue lo que permitió a Galileo calcular las alturas de las montañas a partir de sus luces y sombras." }
    ],
    fact: "Para estimar la altura de una montaña lunar, Galileo imaginó un triángulo rectángulo formado por el centro de la Luna, un punto del terminador y la cumbre iluminada. Conociendo el radio lunar y la distancia de la cumbre al terminador, aplicó el teorema de Pitágoras para obtener la altura. Es el mismo razonamiento que puedes usar hoy con una buena foto de la Luna en cuarto creciente, una regla y un poco de geometría escolar para medir montañas a unos 384,000 kilómetros de distancia.",
  },
  {
    id: "via-lactea-en-estrellas",
    bannerImage: '/assets/galileo/infographic_m1/banner_via-lactea-en-estrellas.webp',
    bannerCaption: "Con su telescopio, Galileo descubrió que la franja blanca de la Vía Láctea estaba formada por innumerables estrellas débiles.",
    title: "La Vía Láctea se convierte en estrellas",
    color: '#5F6E8C',
    btnImage: '/assets/galileo/infographic_m1/btn_via-lactea-en-estrellas.webp',
    image: '/assets/galileo/infographic_m1/hero_via-lactea-en-estrellas.webp',
    content: [
      "Desde la Antigüedad, la Vía Láctea era un misterio. Se veía como una franja blanquecina y difusa que cruzaba el cielo de lado a lado, y los griegos la explicaban con mitos, como la leche derramada de la diosa Hera. Aristóteles pensaba que era un fenómeno de la atmósfera superior, parecido a los cometas. Algunos filósofos, como Demócrito, habían sugerido que podía estar formada por muchas estrellas demasiado pequeñas para distinguirse, pero nadie tenía forma de comprobarlo.",
      "Cuando Galileo apuntó su anteojo hacia esa franja de luz, la nube se deshizo en una multitud de estrellas individuales. Escribió que la Vía Láctea no era otra cosa que un conjunto de innumerables estrellas agrupadas en montones, y que cualquiera que la mirara con el telescopio podía comprobarlo por sí mismo. Con esta afirmación, un debate de dos mil años quedaba resuelto por la observación directa. Era la primera vez que un instrumento respondía de forma tan clara una pregunta de la filosofía natural.",
      "Galileo también examinó cúmulos y constelaciones conocidas. En las Pléyades, donde a simple vista se distinguen unas seis o siete estrellas, contó más de cuarenta y dibujó treinta y seis en su libro. Alrededor del cinturón y la espada de Orión añadió más de ochenta estrellas, cuando el ojo solo ve unas pocas. Además, comprobó que algunas manchas nebulosas del cielo, como el cúmulo del Pesebre en la constelación de Cáncer, eran en realidad grupos compactos de estrellas débiles.",
      "Otra observación sorprendente fue la diferencia entre planetas y estrellas. Con el telescopio, los planetas aparecían como pequeños discos redondos, como lunas diminutas, mientras que las estrellas seguían viéndose como puntos brillantes, sin tamaño apreciable. Galileo dedujo que las estrellas debían estar muchísimo más lejos que los planetas. Esto encajaba con la idea de Copérnico de un universo enorme, en el que las estrellas no estaban pegadas a una esfera cercana sino a distancias inmensas.",
      "Lo que comenzó con Galileo continuó durante siglos. A finales del siglo XVIII, William Herschel contó estrellas en cientos de regiones del cielo para estimar la forma de nuestra galaxia. En el siglo XX supimos que la Vía Láctea es una galaxia espiral con entre 100,000 y 400,000 millones de estrellas, y que el Sol está en uno de sus brazos, a unos 26,000 años luz del centro. Cada vez que ves esa franja blanca en una noche oscura, estás mirando el disco de tu propia galaxia desde dentro."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El nombre de nuestra galaxia viene del latín «Via Lactea», que significa camino de leche, y la palabra galaxia procede del griego «galaxias», relacionado con «gala», que también significa leche. En muchas culturas recibió otros nombres: en partes de España se le llamaba Camino de Santiago, porque parecía guiar a los peregrinos, y en varias tradiciones de Asia oriental se la conoce como el Río Plateado o Río Celeste. Todos describen la misma banda de luz que Galileo resolvió en estrellas." },
      { label: "Dato Científico", icon: "atom", text: "Hoy sabemos que la luz difusa de la Vía Láctea no solo proviene de estrellas: también hay enormes nubes de gas y polvo interestelar. Las franjas oscuras que se ven dentro de ella, como la Gran Grieta en las constelaciones del Cisne y el Águila, son regiones donde el polvo bloquea la luz de las estrellas que hay detrás. Los telescopios infrarrojos, como el James Webb, pueden atravesar ese polvo y revelar estrellas en formación que Galileo jamás habría podido ver." }
    ],
    fact: "Para ver la Vía Láctea como la vio Galileo necesitas un cielo oscuro, lejos de las luces de las ciudades. Según el nuevo atlas mundial del brillo artificial del cielo nocturno, publicado en 2016 en la revista Science Advances, más de un tercio de la humanidad ya no puede ver la Vía Láctea desde donde vive por culpa de la contaminación lumínica. Con unos simples binoculares, en una noche sin Luna y en el campo, puedes repetir la experiencia de Galileo y ver cómo la nube se convierte en estrellas.",
  },
  {
    id: "lunas-fases-y-manchas",
    bannerImage: '/assets/galileo/infographic_m1/banner_lunas-fases-y-manchas.webp',
    bannerCaption: "Galileo descubrió cuatro lunas de Júpiter en enero de 1610 y, meses después, que Venus tenía fases completas como la Luna.",
    title: "Lunas de Júpiter, fases de Venus y manchas solares",
    color: '#8A7356',
    btnImage: '/assets/galileo/infographic_m1/btn_lunas-fases-y-manchas.webp',
    image: '/assets/galileo/infographic_m1/hero_lunas-fases-y-manchas.webp',
    content: [
      "En enero de 1610, Galileo apuntó su telescopio a Júpiter y vio tres pequeñas estrellas alineadas junto al planeta. En las noches siguientes cambiaban de lugar, a veces desaparecía alguna y el 13 de enero vio una cuarta. Pronto comprendió que no eran estrellas, sino cuatro lunas que giraban alrededor de Júpiter. Era la primera vez que se descubrían satélites de otro planeta, y la prueba de que no todos los cuerpos del cielo orbitaban alrededor de la Tierra, como afirmaba el modelo de Ptolomeo.",
      "Hoy esas cuatro lunas se llaman Ío, Europa, Ganimedes y Calisto, y se conocen como satélites galileanos. Galileo las bautizó como «estrellas mediceas» en honor a la familia Médici de Florencia, y esa dedicatoria le ayudó a conseguir el puesto de matemático de la corte del gran duque. Las lunas también resolvían una objeción contra Copérnico: si la Tierra se moviera, decían los críticos, dejaría atrás a la Luna. Júpiter demostraba que un planeta en movimiento puede llevar sus lunas consigo.",
      "Entre septiembre y diciembre de 1610, ya en Florencia, Galileo observó que Venus cambiaba de forma como la Luna: pasaba de un disco casi completo y pequeño a una media luna y después a una fina hoz mucho más grande. En el sistema de Ptolomeo, Venus siempre estaba entre la Tierra y el Sol, así que nunca podía mostrar una fase casi llena. Las fases completas solo se explicaban si Venus giraba alrededor del Sol. Para proteger su prioridad, Galileo anunció primero el hallazgo escondido en un anagrama latino.",
      "Conviene ser precisos: las fases de Venus refutaban el modelo de Ptolomeo, pero no demostraban por sí solas que la Tierra se moviera. El astrónomo danés Tycho Brahe había propuesto un sistema mixto en el que los planetas giraban alrededor del Sol y el Sol giraba alrededor de una Tierra inmóvil, y ese modelo también explicaba las fases. La confirmación del movimiento terrestre llegó más tarde, con las leyes de Kepler, la gravitación de Newton y la aberración de la luz descubierta por James Bradley en 1729.",
      "Galileo también estudió el Sol, proyectando su imagen sobre un papel para no dañarse la vista. En 1613 publicó sus «Cartas sobre las manchas solares», donde mostró que esas manchas oscuras estaban en la superficie del Sol, cambiaban de forma y se desplazaban por el disco. Dedujo que el Sol giraba sobre sí mismo en alrededor de un mes. Hoy sabemos que su rotación dura unos 25 días en el ecuador y más de 30 cerca de los polos. Era otra prueba de que los astros no eran perfectos ni inmutables."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El anagrama de Venus decía «Haec immatura a me iam frustra leguntur o.y.», que significa «Estas cosas inmaduras las busco ahora en vano». Reordenando las letras se obtenía «Cynthiae figuras aemulatur mater amorum»: la madre de los amores, es decir Venus, imita las formas de Cintia, que es la Luna. Los científicos de la época usaban anagramas para registrar un descubrimiento sin revelarlo todavía, y así podían demostrar después quién lo había hecho primero." },
      { label: "Dato Científico", icon: "atom", text: "Galileo también miró Saturno en 1610 y le pareció ver tres cuerpos: un planeta central con dos más pequeños a los lados. Su telescopio no tenía suficiente resolución para mostrar lo que realmente eran: los anillos. En 1612 los «acompañantes» desaparecieron, porque los anillos se veían de canto desde la Tierra. Fue Christiaan Huygens quien, en 1659, explicó que Saturno está rodeado por un anillo delgado y plano que no toca al planeta." }
    ],
    fact: "Observar el Sol directamente con un telescopio o con binoculares puede causar daños graves e irreversibles en los ojos en una fracción de segundo. Los astrónomos usan filtros solares certificados que bloquean casi toda la luz, o el método de proyección, en el que el telescopio envía la imagen del Sol a una cartulina blanca. Existe la leyenda de que Galileo quedó ciego por mirar el Sol, pero los historiadores atribuyen su ceguera, que llegó en 1638, a enfermedades oculares como el glaucoma o las cataratas.",
  },
  {
    id: "sidereus-nuncius-y-metodo",
    bannerImage: '/assets/galileo/infographic_m1/banner_sidereus-nuncius-y-metodo.webp',
    bannerCaption: "El 13 de marzo de 1610 Galileo publicó Sidereus Nuncius, un breve libro con pruebas que cualquiera podía comprobar.",
    title: "Sidereus Nuncius y el método de Galileo",
    color: '#6B7F6A',
    btnImage: '/assets/galileo/infographic_m1/btn_sidereus-nuncius-y-metodo.webp',
    image: '/assets/galileo/infographic_m1/hero_sidereus-nuncius-y-metodo.webp',
    content: [
      "El 13 de marzo de 1610, apenas dos meses después de ver las lunas de Júpiter, Galileo publicó en Venecia un librito en latín titulado «Sidereus Nuncius», que se traduce como «Mensajero Sideral» o «Mensaje de las estrellas». Tenía unas sesenta páginas y contaba sus descubrimientos sobre la Luna, las estrellas, la Vía Láctea y los cuatro satélites de Júpiter. Se imprimieron unos 550 ejemplares, que se agotaron enseguida. Muy pronto se hablaba de él en las cortes y universidades de toda Europa.",
      "El libro era breve y directo, pensado para convencer con pruebas. Incluía grabados de la Luna con su superficie montañosa y decenas de pequeños diagramas que mostraban, noche a noche, la posición de los satélites alrededor de Júpiter. Cualquiera con un buen telescopio podía repetir las observaciones y comprobarlas. Esa es una de las ideas centrales de la ciencia moderna: una afirmación no se acepta porque la diga una autoridad, sino porque otros pueden verificarla con los mismos métodos.",
      "No todos lo creyeron al principio. Algunos profesores se negaron a mirar por el telescopio, convencidos de que mostraba ilusiones ópticas, y otros no lograban ver nada con instrumentos de mala calidad. Johannes Kepler, el gran astrónomo de la corte imperial en Praga, respondió con entusiasmo en abril de 1610 con un texto de apoyo y, meses después, confirmó las lunas con un telescopio prestado. En 1611, los astrónomos jesuitas del Colegio Romano también verificaron los descubrimientos de Galileo.",
      "El método de Galileo combinaba tres pasos que hoy parecen evidentes pero entonces eran novedosos: observar con cuidado, medir con números y sacar conclusiones basadas en evidencias. No le bastaba con decir que había montañas en la Luna; calculaba su altura. No decía solo que Júpiter tenía lunas; registraba sus posiciones y, más tarde, calculó sus periodos orbitales. Esta manera de trabajar, que une experimento, observación y matemáticas, es la base de lo que hoy llamamos método científico.",
      "Galileo resumió su visión en «El ensayador», publicado en 1623, con una frase famosa: el gran libro del universo está escrito en lengua matemática, y sus caracteres son triángulos, círculos y otras figuras geométricas. Para él, entender la naturaleza exigía medir y calcular, no repetir lo que decían los textos antiguos. Por eso se le considera uno de los padres de la ciencia moderna, junto a figuras como Kepler y, más tarde, Isaac Newton, que construiría su física sobre estos cimientos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Galileo dedicó el «Sidereus Nuncius» a Cosme II de Médici, gran duque de Toscana, que había sido alumno suyo. Además, le hizo llegar un telescopio para que pudiera ver las lunas con sus propios ojos. La estrategia funcionó: en 1610 Cosme lo nombró matemático y filósofo principal de su corte, con un buen sueldo y sin obligación de dar clases. Así Galileo pudo dedicarse por completo a investigar, algo poco común para un científico de su tiempo." },
      { label: "Dato Científico", icon: "atom", text: "Una buena observación debe ser reproducible: otra persona, en otro lugar y con un instrumento similar, debe obtener el mismo resultado. Por eso Galileo envió telescopios a varios príncipes y sabios de Europa, para que pudieran comprobar sus afirmaciones. Hoy los científicos hacen algo parecido cuando publican sus datos y métodos en revistas revisadas por otros expertos, un proceso llamado revisión por pares, que ayuda a detectar errores antes de aceptar un descubrimiento." }
    ],
    fact: "En 2009, la Organización de las Naciones Unidas y la Unión Astronómica Internacional celebraron el Año Internacional de la Astronomía para conmemorar los 400 años de las primeras observaciones telescópicas de Galileo. Millones de personas en más de cien países participaron en actividades de observación pública. Uno de los proyectos más conocidos fue el Galileoscopio, un telescopio económico y fácil de montar, diseñado para que estudiantes de todo el mundo pudieran ver los mismos astros que vio Galileo.",
  },
  {
    id: "del-anteojo-al-james-webb",
    bannerImage: '/assets/galileo/infographic_m1/banner_del-anteojo-al-james-webb.webp',
    bannerCaption: "De la lente pulida de Galileo al espejo de 6.5 metros del James Webb: cuatro siglos de telescopios cada vez más poderosos.",
    title: "Del anteojo de Galileo al James Webb",
    color: '#56707A',
    btnImage: '/assets/galileo/infographic_m1/btn_del-anteojo-al-james-webb.webp',
    image: '/assets/galileo/infographic_m1/hero_del-anteojo-al-james-webb.webp',
    content: [
      "Después de Galileo, los telescopios crecieron rápidamente. Los refractores se hicieron cada vez más largos para reducir los defectos de color, y en el siglo XVII algunos astrónomos usaban tubos de decenas de metros colgados de mástiles. En 1668, Isaac Newton construyó un telescopio reflector que usaba un espejo curvo en lugar de una lente para concentrar la luz. Los espejos no separan los colores y pueden fabricarse más grandes que las lentes, así que el diseño de Newton abrió el camino a los gigantes modernos.",
      "El refractor más grande construido para la investigación científica está en el Observatorio Yerkes, en Wisconsin, Estados Unidos, inaugurado en 1897. Su lente objetivo mide 102 centímetros de diámetro. Lentes más grandes resultan poco prácticas porque el vidrio solo puede sujetarse por los bordes, se deforma bajo su propio peso y absorbe parte de la luz. Por eso, los grandes telescopios de los siglos XX y XXI, como los de los observatorios de Chile o Hawái, usan espejos que pueden medir más de ocho metros.",
      "En 1990 se lanzó el Telescopio Espacial Hubble, con un espejo de 2.4 metros, que observa desde fuera de la atmósfera y evita la turbulencia del aire que hace titilar a las estrellas. El 25 de diciembre de 2021 despegó el Telescopio Espacial James Webb, con un espejo primario de 6.5 metros formado por 18 segmentos hexagonales recubiertos de oro. Webb observa en luz infrarroja y puede detectar galaxias cuya luz salió hace más de 13,000 millones de años, poco después del origen del universo.",
      "La diferencia de capacidad es enorme. El objetivo de Galileo tenía unos pocos centímetros de abertura útil; el espejo del Webb tiene una superficie colectora de unos 25 metros cuadrados. Eso significa que recoge decenas de miles de veces más luz que el anteojo de 1609. Sin embargo, la lógica es la misma: reunir la luz de objetos lejanos, ampliar su imagen y medir con precisión lo que muestran. Cada generación de telescopios ha seguido el camino abierto por aquel profesor de Padua.",
      "Lo más asombroso es que hoy cualquier persona puede repetir los descubrimientos de Galileo. Un telescopio de aficionado de 60 a 80 milímetros de abertura, o incluso unos binoculares firmes, muestran los cráteres de la Luna, las cuatro lunas de Júpiter y, con telescopio, las fases de Venus. Muchos clubes de astronomía y planetarios organizan noches de observación gratuitas. La ciencia que comenzó con un tubo de madera en 1609 está al alcance de cualquier niña o niño curioso que se anime a mirar hacia arriba."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Cuando el Hubble se lanzó en 1990, sus primeras imágenes salieron borrosas porque su espejo principal tenía un error de forma en los bordes de apenas unas dos milésimas de milímetro. En diciembre de 1993, astronautas del transbordador Endeavour instalaron un sistema de corrección óptica, una especie de gafas para el telescopio. Desde entonces el Hubble ha tomado algunas de las imágenes más famosas del universo, como el Campo Ultra Profundo, repleto de galaxias lejanas." },
      { label: "Dato Científico", icon: "atom", text: "La capacidad de un telescopio para distinguir detalles, llamada resolución, depende del diámetro de su objetivo y de la longitud de onda de la luz. Cuanto mayor es la abertura, más finos son los detalles que se pueden separar. Por eso los astrónomos construyen espejos cada vez más grandes: el Telescopio Extremadamente Grande del Observatorio Europeo Austral, en construcción en el desierto de Atacama, en Chile, tendrá un espejo de 39 metros formado por casi 800 segmentos." }
    ],
    fact: "El James Webb no orbita la Tierra como el Hubble. Está situado cerca del punto de Lagrange L2, a unos 1.5 millones de kilómetros de nuestro planeta, en dirección opuesta al Sol. Allí, un parasol del tamaño aproximado de una cancha de tenis lo protege del calor del Sol, la Tierra y la Luna, para que sus instrumentos se mantengan por debajo de unos 220 grados bajo cero. Ese frío extremo es necesario para detectar la débil luz infrarroja de las galaxias más lejanas.",
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
      hue: Math.random() > 0.5 ? '224,162,122' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(224,162,122,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradGalileoM1)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5E7A96", "#7A6A55", "#6E7B85", "#5F6E8C", "#8A7356", "#6B7F6A", "#56707A"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#E0A27A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#E0A27A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradGalileoM1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(224,162,122,0.2)" />
            <stop offset="50%" stopColor="rgba(224,162,122,0.9)" />
            <stop offset="100%" stopColor="rgba(224,162,122,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E0A27A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL CIELO A TRAVÉS DE UNA LENTE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(224,162,122,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">GALILEO GALILEI</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(224,162,122,0.2)'}`,
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
          layoutId="activeDotGalileoM1"
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
      border: '1px solid rgba(224,162,122,0.15)',
    }}>
      <Star size={14} style={{ color: '#E0A27A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #E0A27A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(224,162,122,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#E0A27A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_GalileoM1() {
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
      border: '1px solid rgba(224,162,122,0.12)',
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
            textAlign: 'center', color: 'rgba(224,162,122,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(224,162,122,0.08)', borderRadius: '16px',
              border: '1px solid rgba(224,162,122,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#E0A27A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Insignia Observador del Cielo · Galileo Galilei, Padua, 1609-1610
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
