'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#A0729E', style = {} }) {
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
  "Abbott, B. P. et al. (LIGO Scientific Collaboration y Virgo Collaboration) (2016). Observation of Gravitational Waves from a Binary Black Hole Merger. Physical Review Letters, 116, 061102.",
  "Abbott, B. P. et al. (LIGO Scientific Collaboration y Virgo Collaboration) (2017). GW170817: Observation of Gravitational Waves from a Binary Neutron Star Inspiral. Physical Review Letters, 119, 161101.",
  "Burbidge, E. M.; Burbidge, G. R.; Fowler, W. A.; Hoyle, F. (1957). Synthesis of the Elements in Stars. Reviews of Modern Physics, 29, 547-650.",
  "van der Marel, R. P. et al. (2012). The M31 Velocity Vector. III. Future Milky Way-M31-M33 Orbital Evolution, Merging, and Fate of the Sun. The Astrophysical Journal, 753, 9.",
  "Clowe, D. et al. (2006). A Direct Empirical Proof of the Existence of Dark Matter. The Astrophysical Journal Letters, 648, L109-L113.",
  "Tylenda, R. et al. (2011). V1309 Scorpii: merger of a contact binary. Astronomy & Astrophysics, 528, A114.",
  "Sawala, T. et al. (2025). No certainty of a Milky Way-Andromeda collision. Nature Astronomy.",
  "Levin, Janna (2016). Black Hole Blues and Other Songs from Outer Space. Nueva York: Alfred A. Knopf."
];

const INFOGRAPHIC_NODES = [
  {
    id: "espacio-casi-vacio",
    bannerImage: '/assets/colisiones/infographic_m1/banner_espacio-casi-vacio.webp',
    bannerCaption: "Las estrellas están tan separadas que, cerca del Sol, la vecina más próxima se encuentra a 4.24 años luz.",
    title: "¿Por Qué las Estrellas Casi Nunca Chocan?",
    color: '#3E4A61',
    btnImage: '/assets/colisiones/infographic_m1/btn_espacio-casi-vacio.webp',
    image: '/assets/colisiones/infographic_m1/hero_espacio-casi-vacio.webp',
    content: [
      "Cuando imaginamos el espacio lleno de estrellas, parece que deberían chocar todo el tiempo. En realidad, las distancias entre ellas son enormes. La estrella más cercana al Sol, Próxima Centauri, está a 4.24 años luz, unos 40 billones de kilómetros. La luz, que viaja a 300,000 kilómetros por segundo, tarda más de cuatro años en recorrer esa distancia. Comparado con el tamaño de las estrellas, el espacio entre ellas está casi vacío.",
      "Un ejemplo ayuda a entenderlo. El Sol mide unos 1.4 millones de kilómetros de diámetro. Si lo redujéramos al tamaño de un grano de arena de un milímetro, Próxima Centauri sería otro grano de arena a unos 29 kilómetros de distancia. En toda una ciudad grande solo habría unos pocos granos de arena. Por eso, la probabilidad de que dos estrellas choquen directamente en una zona como la nuestra es muy pequeña, incluso en miles de millones de años.",
      "Las estrellas de la Vía Láctea se mueven alrededor del centro de la galaxia. El Sol, por ejemplo, viaja a unos 230 kilómetros por segundo y tarda entre 225 y 250 millones de años en dar una vuelta completa. Aunque todas las estrellas se mueven, lo hacen en direcciones parecidas, como coches en una autopista muy ancha y casi vacía. Los acercamientos entre estrellas ocurren, pero casi siempre a distancias de miles de millones de kilómetros, sin choque.",
      "Los astrónomos han estudiado qué estrellas pasarán cerca del Sol en el futuro usando los datos del satélite Gaia, de la Agencia Espacial Europea. Una de ellas es Gliese 710, una estrella enana que dentro de aproximadamente 1.3 millones de años pasará a una distancia de menos de un año luz del Sol. No chocará con el Sol ni con la Tierra, pero su gravedad podría alterar la Nube de Oort, la región lejana donde se forman muchos cometas, y enviar algunos hacia el interior del sistema solar.",
      "Aunque los choques directos son raros en nuestra zona, hay lugares del universo donde las estrellas están mucho más juntas, y allí las colisiones sí ocurren. También hay estrellas que viven en pareja, girando una alrededor de la otra, y que con el tiempo pueden acercarse hasta fusionarse. Además, cuando galaxias enteras chocan, sus nubes de gas sí se comprimen. En este módulo veremos esos casos: cúmulos densos, fusiones de estrellas, estrellas de neutrones, ondas gravitacionales y choques de galaxias."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Próxima Centauri forma parte de un sistema de tres estrellas junto con Alfa Centauri A y Alfa Centauri B, que están un poco más lejos, a unos 4.37 años luz. Alrededor de Próxima Centauri se descubrió en 2016 un planeta llamado Próxima Centauri b, con una masa parecida a la de la Tierra. Es el planeta conocido más cercano fuera del sistema solar." },
      { label: "Dato Científico", icon: "atom", text: "Un año luz es una medida de distancia, no de tiempo. Es la distancia que recorre la luz en un año: unos 9.46 billones de kilómetros. Los astrónomos también usan el pársec, que equivale a unos 3.26 años luz. Estas unidades permiten escribir con números manejables las distancias enormes que hay entre las estrellas y entre las galaxias." }
    ],
    fact: "Las sondas Voyager 1 y Voyager 2, lanzadas en 1977, son los objetos fabricados por humanos que han viajado más lejos. Aun así, a su velocidad actual de unos 17 kilómetros por segundo, Voyager 1 tardaría más de 70,000 años en recorrer una distancia igual a la que nos separa de Próxima Centauri. Esto muestra lo vacío que está el espacio entre las estrellas.",
  },
  {
    id: "cumulos-densos",
    bannerImage: '/assets/colisiones/infographic_m1/banner_cumulos-densos.webp',
    bannerCaption: "En el centro de los cúmulos globulares las estrellas están tan juntas que algunas chocan y forman rezagadas azules.",
    title: "Cúmulos Globulares: Donde Sí Hay Choques",
    color: '#5A4E6E',
    btnImage: '/assets/colisiones/infographic_m1/btn_cumulos-densos.webp',
    image: '/assets/colisiones/infographic_m1/hero_cumulos-densos.webp',
    content: [
      "Los cúmulos globulares son grupos esféricos de cientos de miles o incluso millones de estrellas muy antiguas, unidas por la gravedad. La Vía Láctea tiene alrededor de 150 cúmulos globulares conocidos, distribuidos en un halo alrededor del disco de la galaxia. Muchas de sus estrellas tienen más de 10,000 millones de años. El más grande de nuestra galaxia es Omega Centauri, que se puede ver a simple vista desde el hemisferio sur como una mancha difusa en la constelación de Centauro.",
      "En el centro de un cúmulo globular, las estrellas están muchísimo más juntas que cerca del Sol. En algunos núcleos, la densidad puede ser cientos de miles o hasta un millón de veces mayor que en nuestro vecindario. Si viviéramos en un planeta allí, el cielo nocturno estaría lleno de miles de estrellas muy brillantes. Con tanta cercanía, los encuentros entre estrellas son mucho más frecuentes, y a lo largo de miles de millones de años algunas terminan chocando o fusionándose.",
      "En 1953, el astrónomo estadounidense Allan Sandage estudió el cúmulo globular M3 y encontró algo extraño: estrellas más azules y brillantes de lo que deberían ser para la edad del cúmulo. En un cúmulo tan viejo, las estrellas grandes y azules ya deberían haber agotado su combustible. A estas estrellas se les llamó rezagadas azules, porque parecen haberse quedado atrás en su evolución, como si fueran más jóvenes que sus vecinas.",
      "Hoy los astrónomos tienen dos explicaciones principales para las rezagadas azules, y probablemente ambas son correctas en distintos casos. La primera es la colisión: dos estrellas chocan y se unen en una sola estrella más masiva, caliente y azul. La segunda es la transferencia de masa: en un par de estrellas que giran muy juntas, una le roba gas a la otra y crece. El Telescopio Espacial Hubble ha encontrado muchas rezagadas azules en los centros de cúmulos como 47 Tucanae, donde los choques son más probables.",
      "Otra zona con estrellas muy juntas es el centro de nuestra galaxia. Allí, a unos 26,000 años luz de la Tierra, hay un agujero negro supermasivo llamado Sagitario A*, con una masa de unos 4 millones de soles, rodeado por un cúmulo de estrellas muy denso. Los astrónomos Reinhard Genzel y Andrea Ghez siguieron durante décadas las órbitas de las estrellas cercanas a ese agujero negro, y por ese trabajo recibieron el Premio Nobel de Física en 2020, junto con Roger Penrose."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En noviembre de 1974, desde el radiotelescopio de Arecibo en Puerto Rico, se envió un mensaje de radio hacia el cúmulo globular M13, en la constelación de Hércules, a unos 25,000 años luz. El mensaje, diseñado por Frank Drake con la ayuda de Carl Sagan y otros, incluía números, una figura humana y un dibujo del sistema solar. Tardará unos 25,000 años en llegar." },
      { label: "Dato Científico", icon: "atom", text: "Las estrellas grandes viven menos que las pequeñas porque queman su combustible mucho más rápido. Una estrella con diez veces la masa del Sol vive unas decenas de millones de años, mientras que el Sol vivirá unos 10,000 millones de años. Por eso, en un cúmulo muy antiguo solo deberían quedar estrellas pequeñas, y las rezagadas azules llaman tanto la atención." }
    ],
    fact: "Omega Centauri contiene unos 10 millones de estrellas y es tan diferente de otros cúmulos que muchos astrónomos creen que podría ser el núcleo de una galaxia pequeña que la Vía Láctea absorbió hace miles de millones de años. En 2024, un equipo que usó datos del Hubble anunció evidencias de un agujero negro de masa intermedia en su centro, de al menos 8,200 masas solares.",
  },
  {
    id: "fusiones-binarias",
    bannerImage: '/assets/colisiones/infographic_m1/banner_fusiones-binarias.webp',
    bannerCaption: "En 2008 la estrella V1309 Scorpii brilló de pronto: dos estrellas que giraban juntas se fusionaron en una sola.",
    title: "Estrellas en Pareja que se Fusionan",
    color: '#7A4E3B',
    btnImage: '/assets/colisiones/infographic_m1/btn_fusiones-binarias.webp',
    image: '/assets/colisiones/infographic_m1/hero_fusiones-binarias.webp',
    content: [
      "Más o menos la mitad de las estrellas parecidas al Sol tienen al menos una compañera. Estos sistemas se llaman estrellas binarias. En algunos casos, las dos estrellas están tan cerca que se tocan y comparten una envoltura de gas: son las binarias de contacto. Con el tiempo, estas parejas pueden perder energía y acercarse cada vez más, hasta que terminan fusionándose en una sola estrella. Este tipo de fusión es mucho más común que los choques directos entre estrellas que vienen de lejos.",
      "El caso mejor estudiado es el de V1309 Scorpii, una estrella en la constelación del Escorpión. En 2008, su brillo aumentó de golpe miles de veces y después se fue apagando mientras se volvía muy roja. Los astrónomos revisaron datos antiguos del proyecto OGLE, un sondeo polaco que había observado esa región del cielo durante años. Encontraron que antes de la explosión había dos estrellas que giraban una alrededor de la otra en aproximadamente 1.4 días, y que ese periodo se acortaba cada año.",
      "En 2011, el astrónomo polaco Romuald Tylenda y su equipo publicaron que V1309 Scorpii había sido la fusión de una binaria de contacto. Era la primera vez que se observaba a dos estrellas antes, durante y después de unirse. Este tipo de explosión se conoce como nova roja luminosa. Es más brillante que una nova común, pero menos que una supernova, y deja como resultado una sola estrella fría, rodeada de polvo y gas expulsados durante la fusión.",
      "Otro caso famoso es V838 Monocerotis, en la constelación del Unicornio. En enero de 2002, esta estrella aumentó su brillo de forma repentina. Durante los meses siguientes, el Telescopio Espacial Hubble fotografió un eco de luz: el destello iluminó poco a poco capas de polvo que ya rodeaban la estrella, creando imágenes que parecían una explosión creciente. Varios astrónomos propusieron que el estallido se debió a la fusión de una estrella con otra más pequeña, aunque la causa sigue en estudio.",
      "Predecir una fusión es difícil. En 2017, un equipo dirigido por Larry Molnar, del Calvin College en Estados Unidos, anunció que la binaria KIC 9832227 se fusionaría alrededor de 2022 y sería visible a simple vista. La noticia fue muy comentada. Pero en 2018 otro equipo, encabezado por Quentin Socia, descubrió un error en uno de los datos antiguos usados para el cálculo. Al corregirlo, la predicción desapareció. Es un buen ejemplo de cómo la ciencia revisa y corrige sus propios resultados."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las imágenes del eco de luz de V838 Monocerotis tomadas por el Hubble entre 2002 y 2006 se convirtieron en algunas de las más famosas del telescopio. Mucha gente pensó que mostraban una nube de gas expandiéndose a gran velocidad. En realidad, el polvo ya estaba ahí; lo que avanzaba era la luz del destello, que iba iluminando capas cada vez más lejanas." },
      { label: "Dato Científico", icon: "atom", text: "Una binaria de contacto pierde energía orbital de varias maneras, por ejemplo cuando expulsa gas al espacio o por la interacción de sus campos magnéticos. Al perder energía, las estrellas se acercan y giran más rápido, y el periodo orbital se acorta. Medir con precisión ese periodo durante años permite detectar sistemas que podrían estar cerca de fusionarse." }
    ],
    fact: "Algunos astrónomos estiman que en la Vía Láctea ocurre una nova roja luminosa de brillo moderado cada pocos años, aunque muchas pasan desapercibidas por el polvo de la galaxia. Los nuevos telescopios de sondeo, como el Observatorio Vera C. Rubin en Chile, que empezó a operar en 2025, podrán detectar muchas más y estudiar cómo se fusionan las estrellas.",
  },
  {
    id: "kilonova-oro",
    bannerImage: '/assets/colisiones/infographic_m1/banner_kilonova-oro.webp',
    bannerCaption: "En 2017 se observó por primera vez el choque de dos estrellas de neutrones, que produjo una kilonova y metales pesados.",
    title: "Estrellas de Neutrones: Kilonovas y Oro",
    color: '#6B5B3E',
    btnImage: '/assets/colisiones/infographic_m1/btn_kilonova-oro.webp',
    image: '/assets/colisiones/infographic_m1/hero_kilonova-oro.webp',
    content: [
      "Una estrella de neutrones es lo que queda cuando una estrella con mucha masa, al menos unas ocho veces la del Sol, explota como supernova y su núcleo colapsa. El resultado es una esfera de unos 20 kilómetros de diámetro, del tamaño de una ciudad, pero con alrededor de 1.4 veces la masa del Sol. Su materia está tan comprimida que una cucharadita pesaría en la Tierra cerca de mil millones de toneladas. Algunas giran cientos de veces por segundo y emiten pulsos de radio: son los púlsares.",
      "A veces, dos estrellas de neutrones forman una pareja y giran una alrededor de la otra. Con el tiempo, emiten ondas gravitacionales, pierden energía y se acercan en espiral. En sus últimos segundos giran cientos de veces por segundo hasta que chocan. El choque libera una cantidad enorme de energía y expulsa al espacio materia muy rica en neutrones. Ese material produce un destello llamado kilonova, unas mil veces más brillante que una nova común, de ahí el prefijo «kilo».",
      "El 17 de agosto de 2017, los detectores LIGO, en Estados Unidos, y Virgo, en Italia, registraron ondas gravitacionales de un choque de estrellas de neutrones. El evento se llamó GW170817. Unos 1.7 segundos después, el telescopio espacial Fermi de la NASA detectó un breve estallido de rayos gamma de la misma región. En las horas siguientes, telescopios en Chile encontraron una nueva luz en la galaxia NGC 4993, en la constelación de Hidra, a unos 130 millones de años luz. Era la primera kilonova observada con tanto detalle.",
      "En las semanas siguientes, unos 70 observatorios en tierra y en el espacio estudiaron la kilonova en rayos gamma, rayos X, luz visible, infrarrojo y ondas de radio. Su luz cambió de azul a rojo en pocos días, como habían predicho los modelos teóricos. El análisis de su espectro mostró la presencia de elementos pesados recién formados. En 2019, un equipo europeo identificó en esa luz al estroncio, la primera vez que se detectaba un elemento concreto creado en el choque de estrellas de neutrones.",
      "Los elementos más pesados que el hierro, como el oro, el platino y el uranio, no se forman en el interior de estrellas como el Sol. Necesitan un proceso llamado captura rápida de neutrones, o proceso r, en el que los núcleos atómicos absorben neutrones muy rápido. En 1957, Margaret Burbidge, Geoffrey Burbidge, William Fowler y Fred Hoyle publicaron un artículo clásico que explicaba cómo se forman los elementos en las estrellas. Hoy, los choques de estrellas de neutrones y algunos tipos poco comunes de supernovas son los principales candidatos para producir gran parte del oro del universo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El oro de un anillo o de una medalla probablemente se formó hace miles de millones de años en eventos cósmicos como el choque de dos estrellas de neutrones, antes de que existieran el Sol y la Tierra. Ese material viajó por la galaxia, se mezcló con nubes de gas y polvo, y terminó formando parte de la nube de la que nació nuestro sistema solar, hace unos 4,600 millones de años." },
      { label: "Dato Científico", icon: "atom", text: "En una estrella de neutrones, la gravedad es tan fuerte que aplasta los átomos: los electrones se combinan con los protones y forman neutrones. Lo que queda es una materia hecha casi solo de neutrones, con una densidad parecida a la del núcleo de un átomo. Si una estrella de neutrones gana demasiada masa, puede colapsar todavía más y convertirse en un agujero negro." }
    ],
    fact: "La kilonova de GW170817 produjo, según algunas estimaciones, una cantidad de oro y platino equivalente a varias veces la masa de la Tierra. Las cifras exactas todavía se debaten, porque dependen de los modelos usados para interpretar la luz. Lo que sí quedó demostrado es que los choques de estrellas de neutrones fabrican elementos pesados, algo que antes solo se había predicho con cálculos.",
  },
  {
    id: "ondas-gravitacionales-ligo",
    bannerImage: '/assets/colisiones/infographic_m1/banner_ondas-gravitacionales-ligo.webp',
    bannerCaption: "El 14 de septiembre de 2015 LIGO detectó por primera vez ondas gravitacionales, producidas por dos agujeros negros al fusionarse.",
    title: "Ondas Gravitacionales y LIGO",
    color: '#2F4858',
    btnImage: '/assets/colisiones/infographic_m1/btn_ondas-gravitacionales-ligo.webp',
    image: '/assets/colisiones/infographic_m1/hero_ondas-gravitacionales-ligo.webp',
    content: [
      "Las ondas gravitacionales son perturbaciones del espacio-tiempo producidas por masas que aceleran, como dos objetos muy densos que giran uno alrededor del otro. Viajan a la velocidad de la luz y, al pasar, estiran y comprimen el espacio de forma minúscula. Albert Einstein las predijo en 1916 a partir de su teoría de la relatividad general, publicada un año antes. Él mismo pensaba que serían tan débiles que nunca podrían detectarse con instrumentos humanos.",
      "La primera prueba indirecta llegó en 1974. Los astrónomos Russell Hulse y Joseph Taylor descubrieron con el radiotelescopio de Arecibo, en Puerto Rico, un púlsar que giraba en pareja con otra estrella de neutrones, llamado PSR B1913+16. Al medirlo durante años, comprobaron que su órbita se encogía exactamente como predecía Einstein si el sistema perdía energía en forma de ondas gravitacionales. Por ese descubrimiento recibieron el Premio Nobel de Física en 1993.",
      "Para detectar las ondas directamente se construyó LIGO, el Observatorio de Ondas Gravitacionales por Interferometría Láser. Tiene dos detectores en Estados Unidos: uno en Hanford, en el estado de Washington, y otro en Livingston, en Luisiana, separados por unos 3,000 kilómetros. Cada detector tiene dos brazos en forma de L de 4 kilómetros de largo. Un rayo láser viaja por los brazos, rebota en espejos y se combina de nuevo. Si pasa una onda gravitacional, la longitud de los brazos cambia un poco y la luz lo revela.",
      "El 14 de septiembre de 2015, ambos detectores de LIGO registraron una señal que duró unas dos décimas de segundo. Llegó primero a Livingston y unos 7 milisegundos después a Hanford. Venía de dos agujeros negros de unas 36 y 29 masas solares que se fusionaron a unos 1,300 millones de años luz de distancia. En la fusión, una cantidad de energía equivalente a unas 3 masas solares se convirtió en ondas gravitacionales. El descubrimiento se anunció el 11 de febrero de 2016 y la señal se llamó GW150914.",
      "En 2017, Rainer Weiss, Barry Barish y Kip Thorne recibieron el Premio Nobel de Física por sus contribuciones decisivas a LIGO y a la detección de ondas gravitacionales. Hoy LIGO trabaja junto con el detector Virgo, cerca de Pisa, en Italia, y KAGRA, en Japón. Hasta 2020, la red había confirmado unas 90 detecciones, la mayoría fusiones de agujeros negros. La Agencia Espacial Europea prepara LISA, un detector formado por tres naves en el espacio, cuyo lanzamiento está previsto para mediados de la década de 2030."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las ondas gravitacionales no son sonido, pero los científicos pueden convertir su señal en sonido para escucharla. La señal de GW150914 sube rápidamente de tono al final, como un pequeño «chirp» o gorjeo de pájaro. Ese aumento de tono ocurre porque los dos agujeros negros giraban cada vez más rápido justo antes de fusionarse en uno solo." },
      { label: "Dato Científico", icon: "atom", text: "Los cambios que mide LIGO son extremadamente pequeños. La onda de GW150914 cambió la longitud de los brazos de 4 kilómetros en una fracción del tamaño de un protón. Para lograr esa precisión, los espejos cuelgan de sistemas de suspensión que los aíslan de vibraciones del suelo, y los láseres viajan dentro de tubos con uno de los vacíos más grandes de la Tierra." }
    ],
    fact: "Tener dos detectores separados por 3,000 kilómetros es clave. Un camión que pasa, un sismo o una tormenta pueden mover un detector, pero es muy improbable que afecten a los dos de la misma forma en el mismo instante. Una onda gravitacional real llega a ambos con una diferencia de pocos milisegundos, el tiempo que tarda la luz en recorrer la distancia entre ellos.",
  },
  {
    id: "galaxias-en-choque",
    bannerImage: '/assets/colisiones/infographic_m1/banner_galaxias-en-choque.webp',
    bannerCaption: "Las galaxias Antenas, a unos 45-65 millones de años luz, muestran cómo un choque galáctico enciende nuevas estrellas.",
    title: "Galaxias que Chocan",
    color: '#3F5E5A',
    btnImage: '/assets/colisiones/infographic_m1/btn_galaxias-en-choque.webp',
    image: '/assets/colisiones/infographic_m1/hero_galaxias-en-choque.webp',
    content: [
      "A diferencia de las estrellas, las galaxias sí chocan con frecuencia. La razón es que la distancia entre galaxias es pequeña comparada con su tamaño. La Vía Láctea mide unos 100,000 años luz de diámetro, y la galaxia grande más cercana, Andrómeda, está a unos 2.5 millones de años luz, apenas unas 25 veces el diámetro de nuestra galaxia. Además, las galaxias se agrupan por la gravedad en grupos y cúmulos, lo que hace los encuentros todavía más comunes.",
      "Cuando dos galaxias chocan, casi ninguna de sus estrellas choca con otra, porque entre ellas hay mucho espacio vacío. Lo que sí chocan son las enormes nubes de gas y polvo. Al comprimirse, el gas se vuelve más denso y forma muchísimas estrellas nuevas en poco tiempo, un fenómeno llamado brote estelar. Las galaxias Antenas, conocidas como NGC 4038 y NGC 4039, en la constelación del Cuervo, son un ejemplo famoso: el Hubble mostró en ellas miles de cúmulos de estrellas jóvenes.",
      "Los choques también cambian la forma de las galaxias. La gravedad estira las estrellas y el gas en largas colas, como las que dan nombre a las Antenas o a las galaxias Ratones, NGC 4676. Cuando dos galaxias espirales de tamaño parecido se fusionan por completo, después de cientos de millones de años, suelen formar una galaxia elíptica, con forma de balón aplastado, poco gas y estrellas más viejas y rojizas. Por eso muchas galaxias elípticas gigantes se consideran el resultado de varias fusiones.",
      "Los choques de cúmulos de galaxias ayudaron a estudiar la materia oscura, una forma de materia que no emite ni absorbe luz pero tiene gravedad. En el Cúmulo Bala, el resultado de un choque entre dos cúmulos, el gas caliente visto con el telescopio de rayos X Chandra quedó frenado en el centro. Sin embargo, la mayor parte de la masa, medida por cómo desvía la luz de galaxias lejanas, siguió de largo. En 2006, Douglas Clowe y su equipo presentaron este caso como una prueba directa de la materia oscura.",
      "Nuestra propia galaxia ha crecido absorbiendo otras más pequeñas. Con datos del satélite Gaia, en 2018 un equipo dirigido por la astrónoma Amina Helmi mostró que la Vía Láctea se fusionó con una galaxia llamada Gaia-Encélado hace unos 10,000 millones de años. Hoy, la Vía Láctea está absorbiendo poco a poco a la galaxia enana de Sagitario. En 2022, el telescopio espacial James Webb fotografió con gran detalle choques como el del Quinteto de Stephan y la galaxia Rueda de Carro."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La galaxia Rueda de Carro, a unos 500 millones de años luz en la constelación del Escultor, tiene forma de anillo con radios porque una galaxia más pequeña la atravesó por el centro hace cientos de millones de años. El choque generó una onda que se propagó hacia afuera, como cuando lanzas una piedra a un estanque, y formó un anillo de estrellas nuevas." },
      { label: "Dato Científico", icon: "atom", text: "Según las mediciones del satélite Planck de la Agencia Espacial Europea, la materia oscura forma cerca del 27% del contenido de energía y masa del universo, la materia normal cerca del 5% y la energía oscura alrededor del 68%. La materia oscura no se ha detectado directamente en laboratorios, pero su gravedad se nota en galaxias y cúmulos." }
    ],
    fact: "Los choques de galaxias pueden alimentar a sus agujeros negros centrales. El gas que cae hacia el centro durante la fusión puede caer en el agujero negro supermasivo y hacer que brille como un cuásar, uno de los objetos más luminosos del universo. Si las dos galaxias tienen agujeros negros, con el tiempo estos también pueden fusionarse y emitir ondas gravitacionales.",
  },
  {
    id: "andromeda-futuro",
    bannerImage: '/assets/colisiones/infographic_m1/banner_andromeda-futuro.webp',
    bannerCaption: "Andrómeda se acerca a la Vía Láctea a unos 110 km/s; la estimación clásica sitúa un choque dentro de unos 4,000 millones de años.",
    title: "La Vía Láctea y Andrómeda: El Futuro",
    color: '#4A5D73',
    btnImage: '/assets/colisiones/infographic_m1/btn_andromeda-futuro.webp',
    image: '/assets/colisiones/infographic_m1/hero_andromeda-futuro.webp',
    content: [
      "La galaxia de Andrómeda, también llamada M31, es la galaxia grande más cercana a la nuestra. Está a unos 2.5 millones de años luz y contiene alrededor de un billón de estrellas, más que la Vía Láctea. Desde hace un siglo se sabe que se acerca a nosotros. En 1912, el astrónomo Vesto Slipher midió el desplazamiento de su luz hacia el azul, lo que indica que viene en nuestra dirección. Hoy se sabe que se aproxima a unos 110 kilómetros por segundo.",
      "Saber si Andrómeda chocará con nosotros requiere medir también su movimiento lateral, que es muy difícil de detectar. En 2012, un equipo dirigido por Roeland van der Marel, del Instituto de Ciencia del Telescopio Espacial en Estados Unidos, usó imágenes del Hubble tomadas con años de diferencia para medir ese movimiento. Concluyeron que el choque era muy probable dentro de unos 4,000 millones de años y que las dos galaxias se fusionarían en una gran galaxia elíptica unos 2,000 millones de años después.",
      "En 2025, un equipo dirigido por Till Sawala, de la Universidad de Helsinki, publicó en la revista Nature Astronomy un nuevo análisis con datos del Hubble y del satélite Gaia. Tomaron en cuenta las incertidumbres de las mediciones y la influencia de otras galaxias, como la Gran Nube de Magallanes y la galaxia del Triángulo. Su resultado fue que la probabilidad de una fusión en los próximos 10,000 millones de años es de alrededor del 50%, y mucho menor en los próximos 5,000 millones. El futuro todavía no está decidido.",
      "Si el choque ocurre, la Tierra probablemente no sufrirá daños por choques entre estrellas, porque, igual que en otras fusiones de galaxias, casi ninguna estrella chocará con otra. Lo que sí cambiaría es la posición del Sol dentro de la nueva galaxia: los modelos indican que podría quedar en una órbita más alejada del centro. En el cielo nocturno, Andrómeda se vería cada vez más grande, hasta ocupar gran parte del cielo antes de la fusión. A la galaxia resultante a veces se la llama, de manera informal, Lactómeda.",
      "Para entonces, el Sol también habrá cambiado. Dentro de unos 5,000 millones de años, agotará el hidrógeno de su núcleo y se convertirá en una gigante roja, mucho más grande que hoy. Mucho antes de eso, dentro de unos mil millones de años, su brillo creciente habrá calentado la Tierra lo suficiente para evaporar los océanos. Por eso, el posible choque con Andrómeda no es una amenaza para la humanidad actual, pero sí es una forma de entender que las galaxias, como las estrellas, cambian y evolucionan."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Andrómeda es el objeto más lejano que la mayoría de las personas puede ver a simple vista, desde un lugar oscuro y sin contaminación lumínica. Se ve como una mancha alargada y tenue en la constelación de Andrómeda, en el cielo de otoño del hemisferio norte. La luz que vemos esta noche salió de ella hace unos 2.5 millones de años, cuando los primeros humanos del género Homo vivían en África." },
      { label: "Dato Científico", icon: "atom", text: "El corrimiento hacia el azul ocurre por el efecto Doppler. Cuando una fuente de luz se acerca, sus ondas llegan más juntas y la luz se desplaza hacia longitudes de onda más cortas, del lado azul del espectro. Cuando se aleja, se desplaza hacia el rojo. Es el mismo efecto que hace que la sirena de una ambulancia suene más aguda al acercarse y más grave al alejarse." }
    ],
    fact: "Antes de un posible encuentro con Andrómeda, la Vía Láctea probablemente se fusionará con la Gran Nube de Magallanes, una galaxia satélite visible a simple vista desde el hemisferio sur. Un estudio publicado en 2019 por Marius Cautun y su equipo estimó que esa fusión podría ocurrir dentro de unos 2,500 millones de años, mucho antes que el encuentro con Andrómeda.",
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
      hue: Math.random() > 0.5 ? '160,114,158' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(160,114,158,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradColisionesEstelares)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#3E4A61", "#5A4E6E", "#7A4E3B", "#6B5B3E", "#2F4858", "#3F5E5A", "#4A5D73"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#A0729E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#A0729E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradColisionesEstelares" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(160,114,158,0.2)" />
            <stop offset="50%" stopColor="rgba(160,114,158,0.9)" />
            <stop offset="100%" stopColor="rgba(160,114,158,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#A0729E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CUANDO ESTRELLAS Y GALAXIAS CHOCAN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(160,114,158,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">OBJETOS ESTELARES</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(160,114,158,0.2)'}`,
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
          layoutId="activeDotColisionesEstelares"
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
      border: '1px solid rgba(160,114,158,0.15)',
    }}>
      <Star size={14} style={{ color: '#A0729E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #A0729E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(160,114,158,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#A0729E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_ColisionesEstelares() {
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
      border: '1px solid rgba(160,114,158,0.12)',
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
            textAlign: 'center', color: 'rgba(160,114,158,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(160,114,158,0.08)', borderRadius: '16px',
              border: '1px solid rgba(160,114,158,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#A0729E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Colisionador Cósmico! Dominas kilonovas, ondas gravitacionales y galaxias.
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
