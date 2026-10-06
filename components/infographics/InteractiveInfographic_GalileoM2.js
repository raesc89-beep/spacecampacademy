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
  "Bagenal, F., Dowling, T. E. y McKinnon, W. B. (eds.) (2004). Jupiter: The Planet, Satellites and Magnetosphere. Cambridge: Cambridge University Press.",
  "Peale, S. J., Cassen, P. y Reynolds, R. T. (1979). Melting of Io by tidal dissipation. Science, 203(4383), 892-894.",
  "Saur, J. et al. (2015). The search for a subsurface ocean in Ganymede with Hubble Space Telescope observations of its auroral ovals. Journal of Geophysical Research: Space Physics, 120, 1715-1737.",
  "Trumbo, S. K., Brown, M. E. y Hand, K. P. (2019). Sodium chloride on the surface of Europa. Science Advances, 5(6), eaaw7123.",
  "NASA Science. Jupiter Moons. https://science.nasa.gov/jupiter/jupiter-moons/",
  "NASA JPL. Europa Clipper. https://europa.nasa.gov",
  "ESA. Juice - Jupiter Icy Moons Explorer. https://www.esa.int/Science_Exploration/Space_Science/Juice"
];

const INFOGRAPHIC_NODES = [
  {
    id: "noche-del-7-de-enero",
    bannerImage: '/assets/galileo/infographic_m2/banner_noche-del-7-de-enero.webp',
    bannerCaption: "El 7 de enero de 1610 Galileo vio tres puntos de luz junto a Júpiter; el 13 de enero ya contaba cuatro.",
    title: "La noche del 7 de enero de 1610",
    color: '#9A6B4F',
    btnImage: '/assets/galileo/infographic_m2/btn_noche-del-7-de-enero.webp',
    image: '/assets/galileo/infographic_m2/hero_noche-del-7-de-enero.webp',
    content: [
      "El 7 de enero de 1610, desde Padua, Galileo dirigió su telescopio de unos veinte aumentos hacia Júpiter, que brillaba con fuerza en el cielo de invierno. Junto al planeta vio tres pequeños puntos de luz, dos al este y uno al oeste, casi en línea recta. Pensó que eran estrellas lejanas que por casualidad estaban en esa dirección, aunque le llamó la atención que estuvieran tan alineadas y que brillaran tanto para su pequeño tamaño. Dibujó la escena y anotó la fecha y la hora.",
      "La noche siguiente, el 8 de enero, volvió a mirar y se llevó una sorpresa: los tres puntos estaban ahora todos al oeste de Júpiter y más juntos entre sí. Si eran estrellas fijas, la única explicación sería que Júpiter se hubiera movido en dirección contraria a la que predecían las tablas astronómicas. Galileo decidió seguir observando para salir de dudas. El 9 de enero el cielo estuvo nublado, pero el 10 vio solo dos puntos, ambos al este, y sospechó que el tercero estaba escondido detrás del planeta.",
      "El 11 de enero ya estaba convencido: aquellos puntos no eran estrellas, sino cuerpos que se movían alrededor de Júpiter, igual que, según Copérnico, Venus y Mercurio giran alrededor del Sol. El 13 de enero vio por primera vez los cuatro a la vez. Durante las semanas siguientes siguió observando siempre que el cielo lo permitía, a veces varias veces en la misma noche, para no perder ningún cambio de posición. Volver a mirar y registrar cada noche fue lo que convirtió una sospecha en un descubrimiento.",
      "Este hallazgo tenía algo extraordinario: era la primera vez en la historia que alguien veía lunas alrededor de otro planeta. Hasta entonces, la única luna conocida era la nuestra. Para los defensores del modelo geocéntrico, la Tierra era el centro de todos los movimientos celestes. Pero allí había cuatro cuerpos que claramente giraban alrededor de Júpiter y no de la Tierra. No todo en el universo orbitaba nuestro planeta, y esa era una evidencia que cualquiera con un telescopio podía comprobar.",
      "El descubrimiento también derribaba un argumento muy usado contra Copérnico. Los críticos decían que, si la Tierra viajara alrededor del Sol, la Luna se quedaría atrás porque no podría seguirla. Pero todos, geocentristas incluidos, aceptaban que Júpiter se desplazaba por el cielo, y ahora se veía que lo hacía acompañado de cuatro lunas sin perder ninguna. Si un planeta en movimiento podía conservar sus satélites, la Tierra también podía moverse sin perder a la Luna."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las observaciones de Galileo en Padua se hicieron en pleno invierno, y exigían permanecer quieto durante largos ratos con el ojo pegado al ocular. En el «Sidereus Nuncius» advirtió que el instrumento debía mantenerse firme, porque cualquier temblor hacía bailar la imagen. Además, el campo de visión era tan pequeño que encontrar Júpiter y mantenerlo en el centro requería mucha práctica. Aun así, registró sus observaciones casi todas las noches despejadas durante dos meses." },
      { label: "Dato Científico", icon: "atom", text: "Júpiter es el planeta más grande del sistema solar: su diámetro ecuatorial es de unos 143,000 kilómetros, más de once veces el de la Tierra, y su masa es unas 318 veces mayor. Está a una distancia media del Sol de unos 778 millones de kilómetros y tarda casi 12 años en completar una órbita. Visto desde la Tierra, es uno de los objetos más brillantes del cielo nocturno después de la Luna y Venus, por eso Galileo pudo encontrarlo con facilidad." }
    ],
    fact: "Júpiter gira sobre sí mismo en menos de 10 horas, el día más corto de todos los planetas del sistema solar. Esa rotación tan rápida lo achata: su diámetro de polo a polo es unos 9,000 kilómetros menor que en el ecuador. Con un telescopio pequeño se distinguen sus bandas de nubes oscuras y claras, que Galileo no llegó a ver con claridad, y con algo más de abertura la Gran Mancha Roja, una tormenta mayor que la Tierra que se observa de forma continua desde hace casi dos siglos.",
  },
  {
    id: "registro-noche-a-noche",
    bannerImage: '/assets/galileo/infographic_m2/banner_registro-noche-a-noche.webp',
    bannerCaption: "Galileo registró la posición de las lunas cada noche despejada y publicó decenas de diagramas en el Sidereus Nuncius.",
    title: "Observar, anotar, repetir",
    color: '#7D705E',
    btnImage: '/assets/galileo/infographic_m2/btn_registro-noche-a-noche.webp',
    image: '/assets/galileo/infographic_m2/hero_registro-noche-a-noche.webp',
    content: [
      "Lo que convirtió el descubrimiento en ciencia fue la constancia. Galileo volvía a observar Júpiter cada noche despejada y dibujaba con cuidado la posición de cada luna respecto al planeta. Anotaba la fecha, la hora y las distancias aproximadas, que estimaba en diámetros de Júpiter o en minutos de arco. A veces observaba dos o tres veces en la misma noche para ver cómo cambiaban las posiciones en pocas horas. Así reunió una serie de datos que nadie podía descartar como una ilusión momentánea.",
      "En el «Sidereus Nuncius», publicado en Venecia el 13 de marzo de 1610, Galileo incluyó sus observaciones desde el 7 de enero hasta el 2 de marzo, acompañadas de decenas de pequeños diagramas. En cada uno se ve un círculo que representa a Júpiter y unos asteriscos que representan las lunas, alineados en una franja. Al recorrer las páginas, el lector podía seguir el baile de los satélites de un lado a otro del planeta, como si viera los fotogramas de una película hecha a mano.",
      "Analizando sus registros, Galileo notó patrones. Las lunas siempre aparecían en una línea casi recta, lo que indicaba que sus órbitas estaban en un mismo plano y que las veíamos casi de canto. Además, las lunas más cercanas a Júpiter se movían más rápido que las más alejadas, igual que en el sistema solar los planetas cercanos al Sol se mueven más rápido que los lejanos. Júpiter y sus lunas parecían un sistema solar en miniatura, un modelo a escala de lo que proponía Copérnico.",
      "Calcular los periodos de cada luna le llevó más tiempo, porque las cuatro se confundían entre sí y a veces se ocultaban tras el planeta o pasaban por delante de él. Tras casi dos años de observaciones, en 1612 Galileo publicó periodos muy cercanos a los actuales. Hoy sabemos que Ío tarda 1.77 días en dar una vuelta a Júpiter, Europa 3.55 días, Ganimedes 7.15 días y Calisto 16.69 días. Para un astrónomo con un telescopio de madera y relojes poco precisos, fue un logro notable.",
      "Este modo de trabajar, que repite la observación muchas veces y registra los datos de forma ordenada, es una de las bases del método científico. Una sola observación puede engañar; muchas observaciones coherentes construyen una evidencia sólida. Galileo no pidió que le creyeran por ser profesor ni por tener contactos importantes: presentó datos y dibujos que cualquiera podía comparar con el cielo. Esa es la gran lección de las lunas de Júpiter para cualquier científico, joven o adulto."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1612, Galileo publicó los periodos de las lunas de Júpiter al comienzo de su «Discurso sobre las cosas que están sobre el agua», un libro que en realidad trataba de cuerpos flotantes e hidrostática. Lo hizo así porque quería dejar constancia pública de sus cálculos cuanto antes. Durante años intentó elaborar tablas que predijeran las posiciones de las lunas con exactitud, un trabajo enorme que obligaba a tener en cuenta los eclipses causados por la sombra de Júpiter." },
      { label: "Dato Científico", icon: "atom", text: "La tercera ley de Kepler, publicada en 1619, establece que el cuadrado del periodo orbital es proporcional al cubo de la distancia media al cuerpo central. Esta ley, descubierta para los planetas, también se cumple para las lunas de Júpiter. Calisto está unas 4.46 veces más lejos de Júpiter que Ío, y su periodo es unas 9.43 veces más largo. Si calculas 4.46 al cubo y 9.43 al cuadrado, obtendrás casi el mismo número: alrededor de 89." }
    ],
    fact: "Las lunas galileanas se ven casi siempre en línea porque sus órbitas están muy cerca del plano del ecuador de Júpiter, y desde la Tierra miramos ese plano casi de perfil. Por eso, al observarlas, parecen moverse de un lado a otro en una línea recta, acercándose y alejándose del planeta. En realidad trazan órbitas casi circulares, pero las vemos de canto, como si miráramos un tiovivo desde el borde de la plataforma: los caballitos parecen ir y venir de izquierda a derecha.",
  },
  {
    id: "nombres-mediceos-y-marius",
    bannerImage: '/assets/galileo/infographic_m2/banner_nombres-mediceos-y-marius.webp',
    bannerCaption: "Galileo las llamó estrellas mediceas; los nombres Ío, Europa, Ganimedes y Calisto los propuso Simon Marius por idea de Kepler.",
    title: "De las estrellas mediceas a los nombres mitológicos",
    color: '#8A6F7A',
    btnImage: '/assets/galileo/infographic_m2/btn_nombres-mediceos-y-marius.webp',
    image: '/assets/galileo/infographic_m2/hero_nombres-mediceos-y-marius.webp',
    content: [
      "Galileo quiso aprovechar su descubrimiento para conseguir un puesto mejor. Dedicó las cuatro lunas a la poderosa familia Médici, que gobernaba Florencia, y las llamó «estrellas mediceas», en honor al gran duque Cosme II y sus tres hermanos. Primero pensó llamarlas «estrellas cósmicas», jugando con el nombre de Cosme, pero cambió de idea antes de publicar. El homenaje funcionó: en 1610 Cosme II lo nombró matemático y filósofo de su corte, y Galileo se trasladó a Florencia.",
      "Al mismo tiempo, el astrónomo alemán Simon Marius, que trabajaba en Ansbach, también observaba Júpiter con un telescopio. En 1614 publicó el libro «Mundus Iovialis», donde aseguraba haber visto las lunas desde finales de 1609. Galileo lo acusó de plagio, y durante siglos Marius tuvo mala fama. Hoy muchos historiadores creen que sus observaciones fueron independientes, aunque Galileo fue el primero en publicarlas. Por eso el crédito principal del descubrimiento sigue siendo suyo.",
      "Marius propuso los nombres que usamos hoy, siguiendo una sugerencia que, según contó, le hizo Johannes Kepler en 1613: Ío, Europa, Ganimedes y Calisto. Son personajes de la mitología griega relacionados con Zeus, el dios que los romanos llamaban Júpiter. Durante mucho tiempo, sin embargo, estos nombres casi no se usaron. Los astrónomos preferían numerar las lunas del I al IV según su distancia al planeta. Los nombres mitológicos solo se volvieron de uso común a mediados del siglo XX.",
      "Cada nombre tiene su historia. Ío fue una sacerdotisa de Hera convertida en vaca; Europa, una princesa fenicia que, según el mito, dio nombre al continente europeo; Ganimedes, un joven troyano que se convirtió en el copero de los dioses del Olimpo; y Calisto, una ninfa transformada en osa que, según la leyenda, terminó en el cielo como la constelación de la Osa Mayor. Desde entonces, la tradición ha sido dar a las lunas de Júpiter nombres de personajes relacionados con Zeus.",
      "Hoy la Unión Astronómica Internacional es la organización encargada de aprobar los nombres de los cuerpos celestes. Júpiter tiene más de noventa lunas conocidas, y la mayoría son pequeñas rocas de pocos kilómetros descubiertas con grandes telescopios en las últimas décadas. Sin embargo, las cuatro galileanas siguen siendo, con enorme diferencia, las más grandes: juntas reúnen más del 99% de la masa de todo lo que orbita a Júpiter. Son, por méritos propios, la familia principal del planeta gigante."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Galileo intentó convencer a los gobernantes de que su descubrimiento tenía usos prácticos. En los años siguientes ofreció al rey de España y, más tarde, a los Estados Generales de los Países Bajos un método para calcular la longitud geográfica en el mar usando las lunas de Júpiter. Incluso diseñó un casco con un telescopio incorporado, llamado «celatone», para observar desde la cubierta de un barco. Ninguno de los dos gobiernos llegó a adoptar su propuesta." },
      { label: "Dato Científico", icon: "atom", text: "Las lunas galileanas se designan también con números romanos según su distancia a Júpiter: Ío es Júpiter I, Europa es Júpiter II, Ganimedes es Júpiter III y Calisto es Júpiter IV. Para los satélites descubiertos después, los números se asignaron en el orden en que se iban encontrando. Así, Amaltea, descubierta en 1892 por el astrónomo estadounidense Edward Emerson Barnard, es Júpiter V, aunque orbita más cerca del planeta que la propia Ío." }
    ],
    fact: "Las cuatro lunas galileanas tienen un brillo de entre magnitud 4.6 y 5.7, así que en teoría serían visibles a simple vista en un cielo oscuro si el resplandor de Júpiter no las ocultara. Algunas personas con vista excepcional afirman haber distinguido alguna sin telescopio. El historiador chino Xi Zezong propuso en 1981 que el astrónomo Gan De habría registrado una pequeña estrella rojiza junto a Júpiter hacia el siglo IV antes de Cristo, aunque esta interpretación sigue siendo discutida.",
  },
  {
    id: "io-mundo-volcanico",
    bannerImage: '/assets/galileo/infographic_m2/banner_io-mundo-volcanico.webp',
    bannerCaption: "Ío es el mundo más volcánico del sistema solar: las mareas de Júpiter lo calientan y mantienen activos cientos de volcanes.",
    title: "Ío, el mundo de los volcanes",
    color: '#A0794E',
    btnImage: '/assets/galileo/infographic_m2/btn_io-mundo-volcanico.webp',
    image: '/assets/galileo/infographic_m2/hero_io-mundo-volcanico.webp',
    content: [
      "Ío es la luna galileana más cercana a Júpiter: gira a unos 422,000 kilómetros del planeta, una distancia parecida a la que separa la Luna de la Tierra, y completa una vuelta en 1.77 días. Su diámetro es de unos 3,640 kilómetros, apenas un poco mayor que el de nuestra Luna. Pero ahí terminan las semejanzas. Ío es el cuerpo con mayor actividad volcánica de todo el sistema solar, con más de 400 volcanes activos que expulsan lava y columnas de compuestos de azufre hacia el espacio.",
      "Su superficie tiene colores sorprendentes: amarillos, naranjas, rojos, blancos y negros, que se deben sobre todo a compuestos de azufre y a dióxido de azufre congelado. Algunas columnas volcánicas alcanzan cientos de kilómetros de altura, y la lava de ciertos volcanes es más caliente que la de la mayoría de los volcanes terrestres actuales. Uno de los más poderosos es Loki Patera, un enorme lago de lava de unos 200 kilómetros de diámetro cuyo brillo aumenta periódicamente cuando su corteza se renueva.",
      "¿De dónde sale tanto calor en una luna tan pequeña? La respuesta está en las mareas. Júpiter es tan masivo que su gravedad deforma a Ío, estirándola un poco. Si la órbita de Ío fuera un círculo perfecto, esa deformación sería constante. Pero su órbita es ligeramente ovalada, de modo que unas veces está más cerca de Júpiter y otras más lejos. Su superficie sube y baja hasta unos 100 metros en cada vuelta, y esa flexión constante genera fricción y calor en su interior.",
      "¿Y por qué la órbita de Ío no se vuelve circular con el tiempo? Por la resonancia de Laplace. Mientras Ganimedes da una vuelta a Júpiter, Europa da dos e Ío da cuatro. Esta relación 1:2:4 hace que los encuentros entre las lunas se repitan siempre en los mismos lugares de sus órbitas, con pequeños tirones gravitacionales regulares, como un columpio empujado siempre en el momento justo. Esos tirones mantienen ovalada la órbita de Ío. El matemático Pierre-Simon Laplace estudió esta resonancia a finales del siglo XVIII.",
      "En marzo de 1979, la sonda Voyager 1 pasó junto a Júpiter y fotografió Ío. La ingeniera Linda Morabito, que analizaba las imágenes para la navegación de la sonda, descubrió una extraña nube en forma de paraguas sobre el borde de la luna: era la primera erupción volcánica observada fuera de la Tierra. Pocos días antes, los científicos Stanton Peale, Patrick Cassen y Ray Reynolds habían publicado en la revista Science la predicción de que el calentamiento por mareas podía fundir el interior de Ío."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El volcanismo de Ío alimenta un gigantesco anillo de partículas cargadas alrededor de Júpiter, llamado toro de plasma de Ío. Cada segundo, Ío pierde alrededor de una tonelada de material, sobre todo azufre y oxígeno, que queda atrapado por el campo magnético de Júpiter. Además, Ío y Júpiter están conectados por una enorme corriente eléctrica que deja una mancha brillante en las auroras del planeta, conocida como la huella de Ío." },
      { label: "Dato Científico", icon: "atom", text: "El calor que sale del interior de Ío es tan intenso que su flujo térmico medio por metro cuadrado es unas 25 a 30 veces mayor que el de la Tierra. La sonda Juno de la NASA, que orbita Júpiter desde 2016, pasó a unos 1,500 kilómetros de Ío a finales de 2023 y comienzos de 2024. Sus datos de gravedad indican que Ío no tiene un océano global de magma cerca de la superficie, sino que sus volcanes se alimentan de un interior caliente y parcialmente fundido de forma más localizada." }
    ],
    fact: "Ío tiene la superficie más joven del sistema solar. Los volcanes la cubren de lava y compuestos de azufre a tal velocidad que borran los cráteres de impacto antes de que puedan acumularse. Las sondas no han encontrado cráteres de impacto en Ío, mientras que en Calisto, la luna galileana más alejada, hay tantos que se superponen unos a otros. Comparar estas dos lunas es comparar un mundo que se renueva constantemente con otro que apenas ha cambiado en miles de millones de años.",
  },
  {
    id: "europa-oceano-bajo-hielo",
    bannerImage: '/assets/galileo/infographic_m2/banner_europa-oceano-bajo-hielo.webp',
    bannerCaption: "Bajo su corteza de hielo, Europa esconde un océano de agua salada que podría tener el doble de agua que los océanos terrestres.",
    title: "Europa, un océano bajo el hielo",
    color: '#5F7C8A',
    btnImage: '/assets/galileo/infographic_m2/btn_europa-oceano-bajo-hielo.webp',
    image: '/assets/galileo/infographic_m2/hero_europa-oceano-bajo-hielo.webp',
    content: [
      "Europa es la más pequeña de las cuatro lunas galileanas, con unos 3,120 kilómetros de diámetro, un poco menos que nuestra Luna. Tarda 3.55 días en dar una vuelta a Júpiter. Su superficie es una de las más lisas del sistema solar: casi no tiene montañas ni grandes cráteres, y está cubierta de hielo de agua cruzado por largas grietas y bandas de color rojizo. Esa apariencia llamó la atención de los científicos desde que las sondas Voyager la fotografiaron en 1979.",
      "Las observaciones de la sonda Galileo de la NASA, que estudió Júpiter entre 1995 y 2003, dieron la pista clave. Su magnetómetro detectó que Europa altera el campo magnético de Júpiter de una forma que se explica muy bien si bajo el hielo hay una capa de agua salada, que conduce la electricidad. Además, su superficie muestra zonas de caos, donde bloques de hielo parecen haberse roto, desplazado y vuelto a congelar, como placas que flotan sobre un líquido.",
      "Hoy la mayoría de los científicos piensa que Europa tiene un océano global de agua líquida bajo una corteza de hielo que podría tener entre unos 15 y 25 kilómetros de grosor. Ese océano tendría entre 60 y 150 kilómetros de profundidad, y podría contener aproximadamente el doble de agua que todos los océanos de la Tierra juntos. El agua se mantiene líquida gracias al calor de las mareas de Júpiter, el mismo mecanismo que calienta Ío, aunque en Europa actúa con menos intensidad.",
      "Para que exista vida como la conocemos se necesitan tres ingredientes: agua líquida, una fuente de energía y ciertos elementos químicos como carbono, hidrógeno, oxígeno, nitrógeno, fósforo y azufre. Europa podría reunir los tres. En el fondo de su océano podría haber fuentes hidrotermales parecidas a las de los océanos terrestres, donde comunidades de microbios viven sin luz solar. Por eso Europa es uno de los lugares más prometedores del sistema solar para buscar vida fuera de la Tierra.",
      "La NASA lanzó la misión Europa Clipper el 14 de octubre de 2024. Está previsto que llegue a Júpiter en 2030 y realice unos 49 sobrevuelos cercanos de Europa, algunos a solo 25 kilómetros de su superficie. Lleva cámaras, un radar capaz de sondear el hielo y espectrómetros para estudiar la composición de su superficie y sus posibles columnas de vapor. Su objetivo no es encontrar vida directamente, sino comprobar si Europa tiene las condiciones necesarias para albergarla."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los colores de algunas regiones de Europa podrían deberse a sales, como el cloruro de sodio, la misma sal que usamos en la cocina, que el océano interior habría hecho subir a la superficie. En 2019, un estudio con el telescopio espacial Hubble detectó señales compatibles con sal común en una región llamada Tara Regio. Si se confirma, sería otra pista de que el océano interior interactúa con el fondo rocoso, como ocurre con los mares de la Tierra." },
      { label: "Dato Científico", icon: "atom", text: "El Telescopio Espacial Hubble detectó en 2012 y 2016 posibles columnas de vapor de agua saliendo de Europa, aunque esas observaciones están en el límite de lo que el telescopio puede medir y siguen siendo debatidas. En 2023, el James Webb detectó dióxido de carbono en la superficie de Europa, concentrado en Tara Regio, una zona de terreno caótico. Los científicos creen que ese carbono probablemente procede del océano interior, lo que aumenta el interés de Europa para la astrobiología." }
    ],
    fact: "Al final de su misión, en septiembre de 2003, la sonda Galileo fue dirigida a propósito hacia la atmósfera de Júpiter, donde se destruyó. Los ingenieros de la NASA tomaron esa decisión porque la nave se estaba quedando sin combustible y, sin control, podría haber chocado algún día contra Europa. Si llevaba microbios terrestres resistentes, podría haber contaminado un mundo que quizá tenga vida propia. Proteger otros mundos de nuestros microbios se llama protección planetaria.",
  },
  {
    id: "ganimedes-y-calisto",
    bannerImage: '/assets/galileo/infographic_m2/banner_ganimedes-y-calisto.webp',
    bannerCaption: "Ganimedes es la luna más grande del sistema solar y tiene campo magnético; Calisto es uno de los mundos más craterizados.",
    title: "Ganimedes y Calisto, los gigantes helados",
    color: '#6E7A66',
    btnImage: '/assets/galileo/infographic_m2/btn_ganimedes-y-calisto.webp',
    image: '/assets/galileo/infographic_m2/hero_ganimedes-y-calisto.webp',
    content: [
      "Ganimedes es la luna más grande del sistema solar. Mide unos 5,270 kilómetros de diámetro, más que el planeta Mercurio, que tiene unos 4,880. Sin embargo, Ganimedes tiene menos de la mitad de la masa de Mercurio, porque está formado por una mezcla de roca y hielo, mientras que Mercurio es un mundo denso con un enorme núcleo de hierro. Tarda 7.15 días en dar una vuelta a Júpiter y, como todas las lunas galileanas, siempre le muestra la misma cara, igual que la Luna a la Tierra.",
      "En 1996, la sonda Galileo descubrió algo inesperado: Ganimedes tiene su propio campo magnético, generado en su núcleo de hierro líquido. Es la única luna conocida que lo tiene. Ese campo produce auroras alrededor de sus polos. En 2015, un equipo científico usó el telescopio Hubble para estudiar cómo oscilaban esas auroras y concluyó que bajo la superficie de Ganimedes hay un océano salado, probablemente atrapado entre capas de hielo a gran profundidad.",
      "Calisto es la luna galileana más alejada de Júpiter: orbita a casi dos millones de kilómetros del planeta y tarda 16.69 días en completar una vuelta. Con unos 4,820 kilómetros de diámetro, es casi del tamaño de Mercurio y la tercera luna más grande del sistema solar, después de Ganimedes y Titán. Su superficie oscura está completamente cubierta de cráteres de impacto; es uno de los cuerpos más craterizados que conocemos, como un archivo de los choques ocurridos durante miles de millones de años.",
      "La razón de tanta diferencia entre lunas vecinas está, en parte, en la distancia a Júpiter. Ío, la más cercana, sufre mareas tan fuertes que hierve de volcanes. Europa recibe menos calor, suficiente para mantener un océano bajo el hielo. Ganimedes muestra zonas antiguas y oscuras junto a regiones más jóvenes y claras, llenas de surcos. Calisto, la más lejana, apenas recibe calentamiento por mareas y no forma parte de la resonancia, así que su superficie casi no ha cambiado en miles de millones de años.",
      "La Agencia Espacial Europea lanzó en abril de 2023 la misión JUICE, el Explorador de las Lunas Heladas de Júpiter. Está previsto que llegue en 2031 y que estudie Europa, Ganimedes y Calisto con varios sobrevuelos. Su mayor desafío llegará a finales de 2034, cuando se convierta en la primera nave en orbitar una luna distinta de la nuestra: Ganimedes. Allí medirá su campo magnético, su océano interior y su corteza helada para entender si este gigante helado podría ser habitable."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En Calisto se encuentra Valhalla, una de las estructuras de impacto más grandes del sistema solar. Es una gigantesca diana formada por anillos concéntricos que se extienden hasta unos 3,800 kilómetros de diámetro, como las ondas que se forman al tirar una piedra a un estanque, pero congeladas en el hielo. El nombre viene de la mitología nórdica, porque muchos accidentes de Calisto llevan nombres de lugares y personajes de las leyendas del norte de Europa." },
      { label: "Dato Científico", icon: "atom", text: "Las cuatro lunas galileanas muestran un patrón de densidad: cuanto más lejos de Júpiter, menos densas son. Ío tiene unos 3.5 gramos por centímetro cúbico; Europa, unos 3.0; Ganimedes, cerca de 1.9; y Calisto, unos 1.8, porque las dos últimas contienen mucho más hielo. Los científicos creen que esto refleja cómo se formaron: cerca de Júpiter, el calor del planeta joven dificultó que se acumulara hielo, igual que el Sol influyó en la formación de los planetas rocosos y los gigantes." }
    ],
    fact: "Ganimedes es tan grande que, si orbitara alrededor del Sol en lugar de Júpiter, probablemente se consideraría un planeta. Lo mismo podría decirse de Calisto. Lo curioso es que Galileo, al verlas por primera vez en 1610, las describió como «planetas» que giraban alrededor de Júpiter, porque en aquella época la palabra luna solo se usaba para la nuestra. El término satélite, aplicado a estos cuerpos, lo popularizaría poco después Johannes Kepler en sus escritos sobre los descubrimientos de Galileo.",
  },
  {
    id: "reloj-del-cielo-y-velocidad-luz",
    bannerImage: '/assets/galileo/infographic_m2/banner_reloj-del-cielo-y-velocidad-luz.webp',
    bannerCaption: "Los eclipses de las lunas de Júpiter sirvieron para medir longitudes en mapas y, en 1676, para mostrar que la luz tiene velocidad.",
    title: "Un reloj en el cielo y la velocidad de la luz",
    color: '#706488',
    btnImage: '/assets/galileo/infographic_m2/btn_reloj-del-cielo-y-velocidad-luz.webp',
    image: '/assets/galileo/infographic_m2/hero_reloj-del-cielo-y-velocidad-luz.webp',
    content: [
      "En el siglo XVII, los navegantes tenían un problema grave: no sabían calcular bien la longitud, es decir, su posición este-oeste en el mar. Para hacerlo necesitaban comparar la hora local con la hora de un lugar de referencia en el mismo momento. Galileo se dio cuenta de que los eclipses de las lunas de Júpiter, cuando entran en la sombra del planeta, ocurren en instantes que pueden predecirse. Con tablas precisas, esos eclipses funcionarían como un reloj visible desde cualquier lugar de la Tierra.",
      "El método resultó muy difícil de usar en un barco, porque el movimiento de las olas impedía mantener un telescopio largo apuntando a Júpiter. Pero en tierra firme dio grandes resultados. En 1668, el astrónomo Giovanni Domenico Cassini publicó tablas mejoradas de los eclipses de las lunas, y los cartógrafos franceses las usaron para medir la longitud de muchos lugares. Gracias a ello, los nuevos mapas de Francia mostraron que su costa oeste estaba bastante más al este de lo que se creía.",
      "Mientras estudiaba esos eclipses, el astrónomo danés Ole Rømer, que trabajaba en el Observatorio de París, notó algo extraño en 1676. Los eclipses de Ío se adelantaban cuando la Tierra estaba más cerca de Júpiter y se retrasaban cuando estaba más lejos. Rømer explicó que la luz tardaba más en llegar cuando tenía que recorrer más distancia: la luz no viajaba de forma instantánea, sino con una velocidad finita. Fue la primera prueba de que la luz necesita tiempo para ir de un lugar a otro.",
      "Rømer estimó que la luz tardaba unos 22 minutos en cruzar el diámetro de la órbita terrestre; hoy sabemos que son unos 16 minutos y medio. Con datos como estos, Christiaan Huygens calculó una velocidad de unos 220,000 kilómetros por segundo, del mismo orden que el valor real, que es de casi 300,000 kilómetros por segundo. Que las lunas descubiertas por Galileo sirvieran para medir la velocidad de la luz muestra cómo un descubrimiento puede abrir caminos que nadie imaginaba en su momento.",
      "Hoy puedes ver las lunas galileanas desde tu casa. Con unos binoculares firmes, apoyados en algo estable, aparecen como pequeños puntos de luz alineados junto a Júpiter. Con un telescopio pequeño verás que cambian de posición de una noche a otra, y a veces podrás observar cómo una luna desaparece en la sombra del planeta o proyecta su propia sombra sobre él. Si dibujas sus posiciones durante varias noches, como hizo Galileo, estarás haciendo el mismo trabajo científico que él hizo en 1610."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En 1714, el Parlamento británico ofreció un gran premio, de hasta 20,000 libras, a quien encontrara un método práctico para medir la longitud en el mar. El problema se resolvió finalmente con relojes muy precisos, llamados cronómetros marinos, como los que fabricó el relojero inglés John Harrison en el siglo XVIII. Sin embargo, durante más de un siglo, los eclipses de las lunas de Júpiter fueron uno de los métodos más exactos para medir la longitud en tierra firme y elaborar mapas." },
      { label: "Dato Científico", icon: "atom", text: "La luz de Júpiter tarda en llegar a la Tierra entre unos 33 y 54 minutos, según la posición de los dos planetas en sus órbitas. Eso significa que, cuando miras las lunas galileanas, no las ves como están en ese instante, sino como estaban hace más de media hora. La variación de ese tiempo de viaje, que depende sobre todo del tamaño de la órbita terrestre, es justamente el efecto que Rømer detectó al comparar los eclipses de Ío a lo largo del año." }
    ],
    fact: "La sonda Galileo de la NASA fue lanzada en 1989 desde el transbordador espacial Atlantis y llegó a Júpiter en diciembre de 1995. Fue la primera nave en orbitar Júpiter y la primera en enviar una sonda al interior de su atmósfera. Durante casi ocho años estudió las cuatro lunas galileanas y aportó pruebas del océano de Europa, del campo magnético de Ganimedes y de la intensa actividad de Ío, continuando el trabajo que Galileo había comenzado con su telescopio casi cuatro siglos antes.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradGalileoM2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#9A6B4F", "#7D705E", "#8A6F7A", "#A0794E", "#5F7C8A", "#6E7A66", "#706488"];
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
          <linearGradient id="gradGalileoM2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(224,162,122,0.2)" />
            <stop offset="50%" stopColor="rgba(224,162,122,0.9)" />
            <stop offset="100%" stopColor="rgba(224,162,122,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E0A27A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CUATRO MUNDOS ALREDEDOR DE JÚPITER</text>
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
          layoutId="activeDotGalileoM2"
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
export default function InteractiveInfographic_GalileoM2() {
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
              🏆 Insignia Cazador de Lunas · Ío, Europa, Ganimedes y Calisto desde 1610
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
