'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#D4A843', style = {} }) {
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
  "Copérnico, N. (1987). Sobre las revoluciones de los orbes celestes. Edición de Carlos Mínguez y Mercedes Testal. Madrid: Tecnos.",
  "Swerdlow, N. M., & Neugebauer, O. (1984). Mathematical Astronomy in Copernicus's De Revolutionibus. New York: Springer.",
  "Van Helden, A. (1977). «The Invention of the Telescope». Transactions of the American Philosophical Society, 67(4), 1-67.",
  "Gingerich, O. (2004). The Book Nobody Read: Chasing the Revolutions of Nicolaus Copernicus. New York: Walker & Company.",
  "Hoskin, M. (ed.) (1999). The Cambridge Concise History of Astronomy. Cambridge University Press.",
  "Rabin, S. (2019). «Nicolaus Copernicus». Stanford Encyclopedia of Philosophy. https://plato.stanford.edu/entries/copernicus/"
];

const INFOGRAPHIC_NODES = [
  {
    id: "ojo-desnudo-antes-del-telescopio",
    bannerImage: '/assets/copernico/infographic_m4/banner_ojo-desnudo-antes-del-telescopio.webp',
    bannerCaption: "Copérnico murió en 1543; el telescopio apareció en los Países Bajos en 1608, más de 60 años después de su muerte.",
    title: "Un mundo antes del telescopio",
    color: '#6F6A58',
    btnImage: '/assets/copernico/infographic_m4/btn_ojo-desnudo-antes-del-telescopio.webp',
    image: '/assets/copernico/infographic_m4/hero_ojo-desnudo-antes-del-telescopio.webp',
    content: [
      "Hoy es difícil imaginar la astronomía sin telescopios, pero Copérnico construyó toda su teoría sin ninguno. Murió en 1543, y el primer telescopio documentado apareció en 1608, cuando el fabricante de lentes Hans Lipperhey solicitó una patente en los Países Bajos para un instrumento que hacía ver cerca los objetos lejanos. Habían pasado sesenta y cinco años desde la muerte de Copérnico, así que nunca pudo mirar por uno.",
      "La noticia del invento se extendió rápidamente por Europa. En 1609, Galileo Galilei construyó sus propios telescopios y los apuntó al cielo, y en 1610 publicó sus descubrimientos en un pequeño libro llamado El mensajero sideral: montañas en la Luna, cuatro satélites alrededor de Júpiter e incontables estrellas invisibles a simple vista. Todo eso llegó demasiado tarde para Copérnico, que trabajó solo con sus ojos.",
      "La astronomía a ojo desnudo tiene límites claros. Una persona con buena vista, en un lugar oscuro, puede ver estrellas hasta cierto brillo mínimo, y en todo el cielo hay unas 9,000 estrellas visibles sin instrumentos, aunque solo una parte está sobre el horizonte a la vez. Además, el ojo humano no distingue detalles menores de un minuto de arco, aproximadamente el tamaño aparente de una moneda vista a unos 80 metros.",
      "Sin telescopio, los planetas parecen simples puntos de luz que se mueven lentamente entre las estrellas. A simple vista se pueden ver cinco: Mercurio, Venus, Marte, Júpiter y Saturno. Urano, aunque en condiciones muy buenas puede llegar a verse como un punto débil, no fue reconocido como planeta hasta 1781, y Neptuno solo se descubrió en 1846 con telescopio. El sistema de Copérnico, por tanto, tenía seis planetas, incluida la Tierra.",
      "Lo que sí podía medir un astrónomo como Copérnico eran posiciones: ángulos entre astros, alturas sobre el horizonte y momentos exactos de ciertos fenómenos. Con esas medidas, repetidas durante años y combinadas con registros antiguos, se podían reconstruir los movimientos de los planetas. Por eso la astronomía de su época era, sobre todo, una ciencia de ángulos, tiempos y geometría, más que de imágenes."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Puedes medir ángulos en el cielo con tu propia mano. Con el brazo bien estirado, el ancho de tu dedo meñique cubre aproximadamente un grado, el puño cerrado unos diez grados y la mano abierta, del pulgar al meñique, unos veinte. La Luna llena ocupa solo medio grado, menos que tu meñique. Es una forma sencilla de practicar la astronomía a ojo desnudo como lo hacían los antiguos." },
      { label: "Dato Científico", icon: "atom", text: "Un minuto de arco es la sexagésima parte de un grado, y un segundo de arco es la sexagésima parte de un minuto. El círculo completo tiene 360 grados, es decir, 21,600 minutos o 1,296,000 segundos de arco. Este sistema de dividir en sesenta viene de la antigua Babilonia, y es el mismo que usamos para dividir las horas en minutos y los minutos en segundos." }
    ],
    fact: "Aunque Copérnico no tenía telescopio, su modelo hizo predicciones que el telescopio confirmó después. La más famosa son las fases de Venus: en el sistema heliocéntrico, Venus debía mostrar un ciclo completo de fases, desde casi lleno hasta una delgada media luna. Galileo las observó en 1610, unos 67 años después de la muerte de Copérnico, y fueron una prueba de peso contra el modelo de Ptolomeo.",
  },
  {
    id: "ojo-desnudo-triquetrum-y-cuadrante",
    bannerImage: '/assets/copernico/infographic_m4/banner_ojo-desnudo-triquetrum-y-cuadrante.webp',
    bannerCaption: "El triquetrum, de tres reglas articuladas de madera, medía la altura de los astros; Copérnico lo describe en De revolutionibus.",
    title: "Triquetrum, cuadrante y esfera armilar",
    color: '#7A6250',
    btnImage: '/assets/copernico/infographic_m4/btn_ojo-desnudo-triquetrum-y-cuadrante.webp',
    image: '/assets/copernico/infographic_m4/hero_ojo-desnudo-triquetrum-y-cuadrante.webp',
    content: [
      "El instrumento más asociado con Copérnico es el triquetrum, también llamado reglas paralácticas. Estaba formado por tres reglas de madera unidas por articulaciones: una vertical fija, otra que giraba para apuntar al astro y una tercera graduada que cerraba el triángulo. Al apuntar al objeto, la posición de las reglas permitía calcular su distancia al cenit, es decir, cuánto se alejaba del punto situado justo encima del observador.",
      "Este instrumento no era un invento de Copérnico: ya lo había descrito Ptolomeo en el Almagesto, unos 1,400 años antes. Copérnico explicó cómo construirlo en el Libro IV de De revolutionibus y lo usó sobre todo para observar la Luna, cuya posición cambia rápidamente. Era sencillo de fabricar con madera y su tamaño, de varios metros, ayudaba a que las marcas de la escala estuvieran más separadas y fueran más fáciles de leer.",
      "Otro instrumento fundamental era el cuadrante, un cuarto de círculo graduado de 0 a 90 grados. Copérnico describe en el Libro II cómo construir uno para medir la altura del Sol al mediodía, cuando cruza el meridiano. Comparando esa altura en los solsticios de verano e invierno, se puede calcular la inclinación del eje terrestre respecto a la órbita, un valor de unos 23.5 grados que es la causa de las estaciones del año.",
      "El tercero era la esfera armilar, que en la tradición de Ptolomeo también se llamaba astrolabio. Estaba formada por varios anillos metálicos que representaban los círculos principales del cielo, como el ecuador celeste y la eclíptica, el camino aparente del Sol. Alineándola con el cielo, se podían medir directamente las coordenadas de un astro. No hay que confundirla con el astrolabio plano, un disco grabado muy usado para calcular la hora y la posición de las estrellas.",
      "Todos estos instrumentos tenían algo en común: estaban hechos para medir ángulos con la mayor precisión posible usando solo la vista. Una regla con dos pequeñas mirillas, llamadas pínulas, servía para alinear el ojo con el astro. Cuanto más grande y mejor construido estaba el instrumento, más finas podían ser sus divisiones. Con ellos, Copérnico lograba precisiones de alrededor de diez minutos de arco, aceptables para su época."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El triquetrum de madera de Copérnico tuvo una segunda vida. En 1584, un canónigo de Frombork se lo regaló al gran astrónomo danés Tycho Brahe, que lo recibió con enorme emoción. Tycho lo colocó en su observatorio de la isla de Hven y le dedicó un poema en latín en honor a Copérnico. Para él era como una reliquia del astrónomo que había puesto la Tierra en movimiento." },
      { label: "Dato Científico", icon: "atom", text: "La precisión de un instrumento de ángulos depende mucho de su tamaño. En un círculo de un metro de radio, un grado ocupa unos 17 milímetros, y un minuto de arco menos de tres décimas de milímetro. Por eso Tycho Brahe construyó instrumentos enormes, como un cuadrante mural de casi dos metros de radio, y consiguió precisiones de uno o dos minutos de arco, cerca del límite del ojo humano." }
    ],
    fact: "El sextante, que aparece como opción en algunas preguntas sobre instrumentos antiguos, no existía en tiempos de Copérnico. El sextante de reflexión con espejos, usado por los navegantes para medir la altura del Sol desde un barco, se desarrolló en el siglo XVIII a partir del octante de John Hadley, presentado en 1731. Copérnico trabajó con triquetrum, cuadrante y esfera armilar.",
  },
  {
    id: "ojo-desnudo-frombork",
    bannerImage: '/assets/copernico/infographic_m4/banner_ojo-desnudo-frombork.webp',
    bannerCaption: "Copérnico vivió la mayor parte de su vida adulta en Frombork (Frauenburg), Polonia, como canónigo de su catedral.",
    title: "Frombork: un observatorio junto al Báltico",
    color: '#5A6E80',
    btnImage: '/assets/copernico/infographic_m4/btn_ojo-desnudo-frombork.webp',
    image: '/assets/copernico/infographic_m4/hero_ojo-desnudo-frombork.webp',
    content: [
      "Copérnico pasó la mayor parte de su vida adulta en Frombork, llamada Frauenburg en alemán, una pequeña ciudad del norte de Polonia situada a orillas de la laguna del Vístula, muy cerca del mar Báltico. Allí trabajaba como canónigo del cabildo de la catedral de Varmia, un cargo religioso y administrativo que le daba un ingreso estable y le permitía dedicar tiempo a la astronomía. Se instaló allí de forma estable hacia 1510.",
      "No tenía un observatorio especial como los que conocemos hoy. Observaba desde los terrenos de la catedral, que estaba rodeada por murallas y torres. Según la tradición, usaba una de esas torres como vivienda y lugar de observación, y hoy se la conoce como la Torre de Copérnico. También se cree que disponía de una plataforma o espacio abierto donde colocaba sus instrumentos de madera para medir los astros.",
      "Su trabajo como canónigo era muy variado. Administraba tierras y aldeas del cabildo, atendía como médico a otros canónigos y al obispo, y participaba en asuntos políticos de la región. Entre 1516 y 1521 vivió temporalmente en el castillo de Olsztyn como administrador, y en 1520 y 1521 ayudó a organizar la defensa de ese castillo durante la guerra contra la Orden Teutónica. La astronomía la hacía en sus ratos libres.",
      "El clima no ayudaba. El norte de Polonia tiene muchos días nublados, sobre todo en otoño e invierno, y la humedad de la laguna producía nieblas frecuentes. En De revolutionibus, Copérnico lamentó que las nieblas del Vístula le impedían ver a Mercurio, que siempre aparece bajo y cerca del horizonte, y comentó que los astrónomos de Alejandría tenían la ventaja de un cielo mucho más despejado.",
      "Frombork está a unos 54 grados de latitud norte, mucho más al norte que Alejandría, que se encuentra a unos 31 grados. Esto significa que, desde Frombork, algunas estrellas del sur nunca se elevan sobre el horizonte, mientras que en verano las noches son cortas y el cielo no llega a oscurecerse por completo. Copérnico tenía que aprovechar las noches despejadas y largas del invierno para hacer muchas de sus observaciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En el castillo de Olsztyn todavía se conserva una tabla astronómica que, según se cree, Copérnico dibujó en la pared de un corredor hacia 1517. Usando un pequeño espejo colocado en la ventana, la luz del Sol se reflejaba sobre las líneas de la pared, y así podía seguir la posición del Sol y estimar la fecha de los equinoccios. Es uno de los pocos rastros físicos de su trabajo que sobreviven." },
      { label: "Dato Científico", icon: "atom", text: "La latitud de un lugar es igual a la altura de la estrella Polar sobre el horizonte, con una pequeña corrección. Desde Frombork, la Polar está a unos 54 grados de altura, mientras que desde Ciudad de México se ve a unos 19 grados, y desde el ecuador justo en el horizonte. Los astrónomos de Copérnico medían la latitud de su observatorio precisamente así, con un cuadrante." }
    ],
    fact: "Copérnico también estudió medicina en la Universidad de Padua y ejerció como médico durante gran parte de su vida. Entre sus pacientes estuvieron su tío, el obispo Lucas Watzenrode, y otros miembros del cabildo de Varmia. En su biblioteca, que hoy se conserva en gran parte en Suecia tras ser llevada como botín de guerra en el siglo XVII, había numerosos libros de medicina junto a los de astronomía.",
  },
  {
    id: "ojo-desnudo-mercurio-y-venus",
    bannerImage: '/assets/copernico/infographic_m4/banner_ojo-desnudo-mercurio-y-venus.webp',
    bannerCaption: "Venus nunca se aleja del Sol más de unos 47 grados y Mercurio unos 28: ambos orbitan por dentro de la órbita terrestre.",
    title: "Mercurio y Venus, los planetas que no se alejan del Sol",
    color: '#8A7A5E',
    btnImage: '/assets/copernico/infographic_m4/btn_ojo-desnudo-mercurio-y-venus.webp',
    image: '/assets/copernico/infographic_m4/hero_ojo-desnudo-mercurio-y-venus.webp',
    content: [
      "Si observas el cielo durante meses, notarás algo curioso: Mercurio y Venus nunca aparecen a medianoche en lo alto del cielo. Siempre se ven cerca del Sol, ya sea en el oeste poco después del atardecer o en el este poco antes del amanecer. Por eso a Venus se le ha llamado lucero del alba o lucero de la tarde, según el momento en que aparece, e incluso los antiguos griegos pensaron al principio que eran dos astros distintos.",
      "La distancia angular máxima a la que un planeta puede alejarse del Sol, vista desde la Tierra, se llama máxima elongación. Para Venus es de unos 45 a 47 grados, y para Mercurio varía entre unos 18 y 28 grados. Los planetas Marte, Júpiter y Saturno, en cambio, pueden aparecer en cualquier parte del zodíaco, incluso justo en el lado opuesto al Sol, a 180 grados, en lo que se llama oposición.",
      "En el modelo de Ptolomeo, esta conducta tenía que imponerse de forma artificial: los centros de los epiciclos de Mercurio y Venus debían permanecer siempre alineados con el Sol, sin ninguna razón física para ello. Era una regla añadida al sistema para que coincidiera con lo observado. Además, ese modelo no permitía decidir con seguridad si Mercurio y Venus estaban más cerca o más lejos de la Tierra que el propio Sol.",
      "En el sistema de Copérnico, la explicación era inmediata. Mercurio y Venus giran alrededor del Sol en órbitas más pequeñas que la de la Tierra. Desde nuestra posición, por fuera de esas órbitas, siempre los vemos en la misma dirección general que el Sol, como si miráramos desde fuera de una pista de carreras a dos corredores que dan vueltas alrededor de un poste central. Nunca pueden quedar a nuestra espalda.",
      "Este razonamiento permitió además calcular el tamaño de sus órbitas. Cuando un planeta interior está en su máxima elongación, la Tierra, el planeta y el Sol forman un triángulo rectángulo. Con trigonometría, Copérnico obtuvo que Venus está a unas 0.72 veces la distancia Tierra-Sol y Mercurio a unas 0.38 veces, valores muy cercanos a los modernos. La simple observación a ojo desnudo bastaba para medir el sistema solar interior."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Venus es, después del Sol y la Luna, el objeto natural más brillante del cielo. En sus mejores momentos es tan luminoso que puede verse a pleno día si sabes exactamente dónde mirar, e incluso puede proyectar sombras débiles en una noche sin Luna y lejos de las luces de la ciudad. Su brillo se debe a sus nubes de ácido sulfúrico, que reflejan la mayor parte de la luz del Sol." },
      { label: "Dato Científico", icon: "atom", text: "Como Mercurio y Venus orbitan por dentro de la Tierra, a veces pasan exactamente por delante del disco solar, en un fenómeno llamado tránsito. Los tránsitos de Mercurio ocurren unas trece veces por siglo, el último en noviembre de 2019. Los de Venus son rarísimos: suceden en parejas separadas por ocho años, y los últimos fueron en 2004 y 2012. El próximo será en diciembre de 2117." }
    ],
    fact: "Copérnico nunca logró observar bien a Mercurio desde Frombork, por su cercanía al Sol y las nieblas del Vístula, y tuvo que basarse en gran parte en observaciones de otros astrónomos. Hay una anécdota muy repetida según la cual lamentó en su lecho de muerte no haber visto nunca Mercurio, pero no hay pruebas documentales de esa frase; lo que sí escribió es que ese planeta le resultaba muy difícil de observar.",
  },
  {
    id: "ojo-desnudo-luna-y-eclipses",
    bannerImage: '/assets/copernico/infographic_m4/banner_ojo-desnudo-luna-y-eclipses.webp',
    bannerCaption: "El 9 de marzo de 1497, en Bolonia, Copérnico observó cómo la Luna ocultaba la estrella Aldebarán: su primera observación registrada.",
    title: "La Luna, las ocultaciones y los eclipses",
    color: '#666A7E',
    btnImage: '/assets/copernico/infographic_m4/btn_ojo-desnudo-luna-y-eclipses.webp',
    image: '/assets/copernico/infographic_m4/hero_ojo-desnudo-luna-y-eclipses.webp',
    content: [
      "La primera observación astronómica registrada de Copérnico ocurrió el 9 de marzo de 1497, cuando era estudiante en Bolonia, Italia. Esa noche observó cómo la Luna pasaba por delante de la brillante estrella Aldebarán, en la constelación de Tauro, y la ocultaba. Estas ocultaciones son muy útiles, porque el momento exacto en que la estrella desaparece permite medir con precisión la posición de la Luna en el cielo.",
      "En Bolonia, Copérnico vivió en casa del astrónomo Domenico Maria Novara, de quien fue asistente. Con él aprendió a observar sistemáticamente y a cuestionar los datos antiguos. La Luna es un objeto ideal para practicar porque se mueve muy rápido: avanza aproximadamente su propio diámetro cada hora respecto a las estrellas de fondo, y completa una vuelta en unos 27.3 días. Su ciclo de fases, el mes sinódico, dura unos 29.5 días.",
      "Copérnico encontró un grave problema en el modelo lunar de Ptolomeo. Según ese modelo, la distancia de la Luna a la Tierra cambiaba tanto que, en ciertos momentos, su tamaño aparente debería ser casi el doble que en otros. Pero cualquiera que mire la Luna puede comprobar que eso no ocurre. El modelo de Copérnico redujo esa variación a valores mucho más cercanos a los reales, una de sus mejoras técnicas importantes.",
      "Hoy sabemos que la distancia de la Luna varía entre unos 356,000 y 407,000 kilómetros, con un promedio de unos 384,400 kilómetros. Por eso su tamaño aparente cambia solo alrededor de un 14 por ciento entre el punto más cercano y el más lejano. Cuando una Luna llena coincide con el punto más cercano, los medios suelen llamarla superluna, aunque la diferencia es difícil de notar a simple vista sin comparar fotografías.",
      "Los eclipses de Luna eran una herramienta clave para calibrar el modelo lunar, porque en ese momento la Luna está exactamente en el lado opuesto al Sol. Copérnico observó un eclipse lunar en Roma en noviembre de 1500 y, ya en Varmia, usó en De revolutionibus eclipses que él mismo observó en 1511, 1522 y 1523. Los comparó con eclipses antiguos registrados por Ptolomeo para calcular los movimientos medios de la Luna a lo largo de siglos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante un eclipse total de Luna, nuestro satélite no desaparece, sino que se vuelve de color rojizo o cobrizo. Esto ocurre porque la atmósfera de la Tierra desvía hacia la sombra un poco de luz solar, y en el camino filtra la luz azul y deja pasar la roja. Es la misma razón por la que los atardeceres son rojos. Si estuvieras en la Luna, verías la Tierra rodeada de un anillo de atardeceres." },
      { label: "Dato Científico", icon: "atom", text: "Los eclipses se repiten en ciclos. El más famoso es el saros, de unos 18 años, 11 días y 8 horas, que ya conocían los astrónomos babilonios. Después de un saros, el Sol, la Tierra y la Luna vuelven a una configuración casi idéntica, y se produce un eclipse muy parecido al anterior. Gracias a estos ciclos, los astrónomos antiguos podían predecir eclipses sin conocer las causas físicas." }
    ],
    fact: "La Luna se aleja de la Tierra unos 3.8 centímetros por año. Lo sabemos con gran precisión gracias a los retrorreflectores láser que dejaron en su superficie las misiones Apolo 11, 14 y 15 y las sondas soviéticas Lunojod. Desde observatorios en la Tierra se disparan pulsos láser hacia esos espejos y se mide el tiempo que tarda la luz en regresar, unos 2.5 segundos, para calcular la distancia.",
  },
  {
    id: "ojo-desnudo-al-battani",
    bannerImage: '/assets/copernico/infographic_m4/banner_ojo-desnudo-al-battani.webp',
    bannerCaption: "Copérnico citó repetidamente al astrónomo árabe al-Battani, que observó desde Raqqa entre los siglos IX y X.",
    title: "Al-Battani y los registros de siglos",
    color: '#6E7D62',
    btnImage: '/assets/copernico/infographic_m4/btn_ojo-desnudo-al-battani.webp',
    image: '/assets/copernico/infographic_m4/hero_ojo-desnudo-al-battani.webp',
    content: [
      "Un solo astrónomo, observando durante unas décadas, no puede detectar movimientos muy lentos del cielo. Por eso Copérnico combinó sus propias observaciones con registros de astrónomos anteriores. Entre ellos destacaba Abu Abdallah Muhammad ibn Jabir al-Battani, conocido en Europa como Albategnius. Nació hacia el año 858 en Harrán, en la actual Turquía, y realizó sus observaciones en Raqqa, en la actual Siria.",
      "Al-Battani trabajó durante unas cuatro décadas, aproximadamente entre los años 877 y 918, y reunió sus resultados en una obra conocida como Kitab az-Zij, un manual con tablas astronómicas. Corrigió varios valores de Ptolomeo, mejoró la medida de la inclinación del eje terrestre y calculó la duración del año solar con gran exactitud: unos 365 días, 5 horas, 46 minutos y 24 segundos.",
      "Su obra fue traducida al latín en el siglo XII por Platón de Tívoli y se imprimió en Nuremberg en 1537, lo que facilitó que Copérnico la consultara con detalle. En De revolutionibus, Copérnico menciona a al-Battani en numerosas ocasiones, sobre todo al estudiar el movimiento del Sol, la duración del año y la precesión de los equinoccios. Sus datos ocupaban un lugar intermedio entre los de los griegos y los del Renacimiento.",
      "La gran ventaja de combinar registros de distintas épocas es que los pequeños errores de cada observación se vuelven menos importantes cuando se comparan datos separados por muchos siglos. Copérnico usaba observaciones de Hiparco y Ptolomeo, de hace más de 1,300 años en su época, las de al-Battani, de unos 600 años antes, y las suyas propias. Con ese largo intervalo de tiempo podía medir con más precisión movimientos que avanzan muy despacio.",
      "Un ejemplo es la precesión de los equinoccios, el lento giro del eje terrestre que hace que las estrellas parezcan desplazarse alrededor de un grado cada 72 años. En una vida humana, ese cambio es casi imperceptible, pero en mil años supera los trece grados. Al comparar posiciones estelares de Ptolomeo, al-Battani y las suyas, Copérnico pudo estudiar este fenómeno y explicarlo como un movimiento de la propia Tierra."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Al-Battani tiene un cráter con su nombre en la Luna, llamado Albategnius, de unos 130 kilómetros de diámetro. Muchos astrónomos del mundo islámico medieval también tienen cráteres lunares, como al-Biruni, Azophi o Alfraganus. Muchas estrellas brillantes conservan nombres árabes, como Aldebarán, Betelgeuse, Rigel o Altair, como recuerdo de aquella tradición astronómica." },
      { label: "Dato Científico", icon: "atom", text: "Al-Battani fue uno de los primeros en usar de forma sistemática funciones trigonométricas como el seno en lugar de las cuerdas de los griegos, lo que simplificaba mucho los cálculos astronómicos. También descubrió que el punto de la órbita donde la Tierra está más cerca del Sol, el perihelio, se desplaza lentamente con el tiempo, aunque en su época se describía como un movimiento del apogeo solar." }
    ],
    fact: "Algunos datos antiguos que usó Copérnico tenían errores, y eso afectó sus conclusiones. Por ejemplo, creyó que la precesión de los equinoccios no era uniforme, sino que se aceleraba y frenaba, porque las observaciones de distintas épocas no encajaban bien entre sí. Hoy sabemos que esa supuesta variación, llamada trepidación, no existe: se debía a imprecisiones en los registros antiguos.",
  },
  {
    id: "ojo-desnudo-precision-y-limites",
    bannerImage: '/assets/copernico/infographic_m4/banner_ojo-desnudo-precision-y-limites.webp',
    bannerCaption: "Las medidas de Copérnico tenían errores de unos 10 minutos de arco; las de Tycho, de 1 a 2. Esa diferencia llevó a las elipses.",
    title: "Precisión, límites y el error de los círculos",
    color: '#7E5E62',
    btnImage: '/assets/copernico/infographic_m4/btn_ojo-desnudo-precision-y-limites.webp',
    image: '/assets/copernico/infographic_m4/hero_ojo-desnudo-precision-y-limites.webp',
    content: [
      "La calidad de una teoría astronómica depende de la precisión de sus datos. Las medidas de Copérnico tenían errores típicos de alrededor de diez minutos de arco, un tercio del tamaño aparente de la Luna. Para su época era un trabajo respetable, pero insuficiente para detectar algunas diferencias sutiles entre su modelo y el movimiento real de los planetas. Copérnico hizo relativamente pocas observaciones propias: unas pocas decenas aparecen en su libro.",
      "Ese límite de precisión explica por qué Copérnico mantuvo un error importante: creía que los planetas se movían en círculos perfectos. Esta idea venía de la tradición griega, que consideraba el círculo la forma perfecta de los cielos. Para que sus círculos encajaran con las observaciones, tuvo que añadir pequeños epiciclos y desplazar los centros de las órbitas. Con datos de diez minutos de arco, el error de los círculos podía disimularse.",
      "El cambio llegó con Tycho Brahe, el astrónomo danés que construyó grandes instrumentos en su observatorio de la isla de Hven a partir de 1576. Sin telescopio, Tycho alcanzó precisiones de uno a dos minutos de arco, cerca del límite del ojo humano, y observó los planetas de forma continua durante más de veinte años. Sus datos sobre Marte fueron los más precisos jamás reunidos antes de la invención del telescopio.",
      "Johannes Kepler heredó esos datos tras la muerte de Tycho en 1601. Al intentar ajustar la órbita de Marte con círculos, encontró una diferencia de ocho minutos de arco entre el mejor modelo circular y las observaciones de Tycho. Kepler escribió que, como Tycho no podía haberse equivocado en ocho minutos, esa pequeña diferencia bastaba para reformar toda la astronomía. Así descubrió que las órbitas son elipses.",
      "La historia de Copérnico muestra que la ciencia avanza tanto por las ideas como por la calidad de las mediciones. Copérnico tuvo la intuición correcta sobre el lugar del Sol, pero sus datos no le permitían ver la forma exacta de las órbitas. Tycho mejoró las mediciones, Kepler descubrió las elipses y Newton explicó la causa con la gravedad. El registro cuidadoso de cada observación hizo posible esa cadena de descubrimientos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Ocho minutos de arco, la diferencia que llevó a Kepler a descubrir las elipses, equivalen aproximadamente a una cuarta parte del diámetro aparente de la Luna llena. Es un ángulo tan pequeño que la mayoría de las personas no notaría el cambio a simple vista. Sin embargo, para un científico que confiaba en la calidad de sus datos, esa diferencia era imposible de ignorar." },
      { label: "Dato Científico", icon: "atom", text: "Copérnico calculó los períodos de los planetas alrededor del Sol a partir de sus observaciones y de los registros antiguos, con valores muy cercanos a los modernos: unos 88 días para Mercurio, 225 para Venus, 1.88 años para Marte, 11.86 para Júpiter y 29.5 para Saturno. Los períodos eran fáciles de medir bien porque se promedian a lo largo de muchas vueltas y siglos de datos." }
    ],
    fact: "Hoy la astronomía de posiciones ha llegado a precisiones asombrosas. La misión espacial Gaia, de la Agencia Espacial Europea, lanzada en 2013, midió las posiciones de casi dos mil millones de estrellas con errores de apenas decenas de millonésimas de segundo de arco en las más brillantes. Eso es decenas de millones de veces más preciso que las mediciones de Copérnico, y aun así el principio es el mismo: medir ángulos.",
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
      hue: Math.random() > 0.5 ? '212,168,67' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,168,67,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradCopernicoM4)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#6F6A58", "#7A6250", "#5A6E80", "#8A7A5E", "#666A7E", "#6E7D62", "#7E5E62"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#D4A843" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#D4A843" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradCopernicoM4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.2)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">UN CIELO SIN TELESCOPIOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,168,67,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">NICOLÁS COPÉRNICO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,168,67,0.2)'}`,
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
          layoutId="activeDotCopernicoM4"
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
      border: '1px solid rgba(212,168,67,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A843', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A843, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,168,67,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A843', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_CopernicoM4() {
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
      border: '1px solid rgba(212,168,67,0.12)',
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
            textAlign: 'center', color: 'rgba(212,168,67,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,168,67,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,168,67,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A843', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Triquetrum, cuadrante y paciencia: así midió Copérnico el cielo desde Frombork
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
