'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#B87D5E', style = {} }) {
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
  "Faraday, M. (1834). Experimental Researches in Electricity, Seventh Series. Philosophical Transactions of the Royal Society of London, 124, 77-122.",
  "Ross, S. (1961). Faraday consults the scholars: the origins of the terms of electrochemistry. Notes and Records of the Royal Society of London, 16(2), 187-220.",
  "American Chemical Society (1997). Production of Aluminum: The Hall-Héroult Process. National Historic Chemical Landmarks. https://www.acs.org",
  "U.S. Department of Energy, Hydrogen and Fuel Cell Technologies Office. Hydrogen Production: Electrolysis. https://www.energy.gov/eere/fuelcells/hydrogen-production-electrolysis",
  "NASA (2023). NASA Achieves Water Recovery Milestone on International Space Station. https://www.nasa.gov",
  "NASA. Space Launch System: RS-25 Core Stage Engines. https://www.nasa.gov/sls",
  "The Nobel Prize in Chemistry 2019 (Goodenough, Whittingham, Yoshino). NobelPrize.org"
];

const INFOGRAPHIC_NODES = [
  {
    id: "que-es-electrolisis",
    bannerImage: '/assets/faraday/infographic_m4/banner_que-es-electrolisis.webp',
    bannerCaption: "Electrólisis: usar corriente eléctrica para descomponer sustancias. Necesita una fuente, dos electrodos y un electrolito.",
    title: "¿Qué es la electrólisis?",
    color: '#5B7A8C',
    btnImage: '/assets/faraday/infographic_m4/btn_que-es-electrolisis.webp',
    image: '/assets/faraday/infographic_m4/hero_que-es-electrolisis.webp',
    content: [
      "La electrólisis es el proceso de usar electricidad para descomponer una sustancia en otras más simples. La palabra viene del griego y significa algo así como «separar con electricidad». Para lograrlo se necesitan tres cosas: una fuente de corriente continua, como una batería; dos electrodos, que son piezas conductoras sumergidas en un líquido; y un electrolito, que es un líquido capaz de conducir la electricidad porque contiene iones, partículas con carga eléctrica que pueden moverse.",
      "Cuando se conecta la fuente, uno de los electrodos queda con carga positiva y se llama ánodo; el otro queda con carga negativa y se llama cátodo. Los iones positivos del electrolito, llamados cationes, viajan hacia el cátodo, mientras que los iones negativos, llamados aniones, viajan hacia el ánodo. Al llegar a los electrodos, los iones ganan o pierden electrones y se transforman en sustancias nuevas: pueden formarse burbujas de gas o capas de metal sobre el electrodo.",
      "En el cátodo ocurre una reducción, es decir, las partículas ganan electrones. En el ánodo ocurre una oxidación, en la que las partículas pierden electrones. Los químicos tienen un truco para recordarlo: reducción y cátodo empiezan con consonante, y oxidación y ánodo con vocal. Estas dos reacciones siempre suceden a la vez, porque los electrones que salen de un lado del circuito son los mismos que llegan al otro. La fuente eléctrica funciona como una bomba que empuja electrones.",
      "La historia de la electrólisis empezó muy poco después de inventarse la primera batería. En 1800, Alessandro Volta presentó su pila, y ese mismo año los ingleses William Nicholson y Anthony Carlisle la usaron para descomponer agua en hidrógeno y oxígeno. Pocos años más tarde, en 1807 y 1808, Humphry Davy usó baterías enormes para aislar por primera vez elementos como el potasio, el sodio, el calcio y el magnesio, que nunca antes se habían obtenido en estado puro.",
      "Davy fue precisamente el mentor de Michael Faraday. El joven encuadernador entró a trabajar como su asistente en la Royal Institution de Londres en 1813, y allí aprendió química de primera mano. Durante la década de 1830, Faraday retomó la electrólisis con una pregunta distinta a la de su maestro: no solo quería saber qué sustancias se podían separar, sino cuánta materia se transformaba con una cantidad dada de electricidad. Esa pregunta cuantitativa lo llevaría a descubrir leyes exactas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El sodio, uno de los componentes de la sal de mesa, es un metal tan reactivo que reacciona violentamente con el agua. Por eso nunca se encuentra puro en la naturaleza. Cuando Humphry Davy logró separar el potasio por electrólisis en 1807, vio pequeños glóbulos plateados que se encendían al contacto con el aire. Su primo Edmund, que lo ayudaba en el laboratorio, contó que Davy se puso a bailar de emoción por la sala." },
      { label: "Dato Científico", icon: "atom", text: "Un líquido conduce la electricidad solo si tiene iones libres. El agua completamente pura conduce muy mal, por eso en la electrólisis del agua se le añade un poco de un electrolito, como hidróxido de sodio o ácido sulfúrico, que aporta iones sin consumirse. En cambio, la sal fundida o disuelta conduce muy bien, porque el cloruro de sodio se separa en iones de sodio con carga positiva e iones de cloruro con carga negativa." }
    ],
    fact: "La electrólisis necesita corriente continua, la que fluye en un solo sentido, como la que producen las pilas y baterías. Si se usara corriente alterna, que cambia de sentido muchas veces por segundo, los iones irían y vendrían sin llegar a acumularse en los electrodos. Por eso las grandes plantas industriales de electrólisis tienen rectificadores, aparatos que convierten la corriente alterna de la red eléctrica en corriente continua.",
  },
  {
    id: "vocabulario-faraday",
    bannerImage: '/assets/faraday/infographic_m4/banner_vocabulario-faraday.webp',
    bannerCaption: "Electrodo, ánodo, cátodo, ion, anión, catión y electrolito: términos creados por Faraday con William Whewell en 1834.",
    title: "Las palabras que inventó Faraday",
    color: '#8A6F5A',
    btnImage: '/assets/faraday/infographic_m4/btn_vocabulario-faraday.webp',
    image: '/assets/faraday/infographic_m4/hero_vocabulario-faraday.webp',
    content: [
      "Cuando Faraday empezó a estudiar la electrólisis a fondo, se encontró con un problema curioso: no había palabras adecuadas para describir lo que observaba. Los científicos usaban el término «polos» para los extremos de una batería, como si fueran los polos de un imán, y eso generaba confusión. Faraday pensaba que las palabras mal elegidas llevan a ideas equivocadas. Así que decidió crear un vocabulario nuevo, preciso y libre de suposiciones, para nombrar cada parte del proceso.",
      "Para ello pidió ayuda al erudito William Whewell, de la Universidad de Cambridge, experto en griego clásico y en la historia de las ciencias. Durante 1834 intercambiaron varias cartas en las que discutieron propuestas, descartaron algunas y afinaron otras. El resultado fue un conjunto de términos que Faraday publicó ese mismo año en sus «Investigaciones experimentales sobre la electricidad» y que hoy usan estudiantes de química en todo el mundo, casi dos siglos después.",
      "La palabra electrodo combina «electro» con el griego «hodos», que significa camino: es el camino por donde la corriente entra o sale del líquido. Ánodo significa «camino hacia arriba» y cátodo, «camino hacia abajo». Faraday relacionó la dirección de la corriente con el recorrido del Sol, que sale por el este y se pone por el oeste, y eligió esos nombres pensando en esa imagen. El líquido que se descompone recibió el nombre de electrolito, y el proceso completo, electrólisis.",
      "Quizá la palabra más importante de todas fue ion, que en griego significa «el que va» o «el que viaja». Faraday la usó para nombrar las partículas que se mueven a través del electrolito. Las que viajan hacia el ánodo se llamaron aniones, y las que viajan hacia el cátodo, cationes. Curiosamente, Faraday no sabía exactamente qué eran los iones: todavía no se había descubierto el electrón, y la idea de átomos con carga eléctrica no se aceptaría por completo hasta décadas después.",
      "Crear el vocabulario de una ciencia es tan importante como hacer descubrimientos. Sin palabras claras, dos científicos pueden hablar de lo mismo sin entenderse, o pensar que se entienden cuando no es así. Gracias a Faraday y Whewell, cualquier químico, ingeniero o estudiante puede describir una pila, una batería de litio o una planta de aluminio usando los mismos términos. Whewell, por cierto, también propuso otra palabra que usamos muchísimo: «científico», en inglés «scientist», hacia 1833."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Faraday consideró otros nombres antes de quedarse con los definitivos. En sus cartas con Whewell aparecen propuestas basadas en las palabras griegas para «entrada» y «salida», e incluso nombres relacionados con el este y el oeste. Whewell defendió que ánodo y cátodo eran más cortos, más claros y más fáciles de convertir en otras palabras. Gracias a esa elección hoy hablamos de rayos catódicos, protección catódica y aluminio anodizado." },
      { label: "Dato Científico", icon: "atom", text: "Hoy sabemos que un ion es un átomo o grupo de átomos que ha ganado o perdido electrones. Si pierde electrones queda con carga positiva y es un catión, como el ion sodio, Na⁺. Si gana electrones queda con carga negativa y es un anión, como el ion cloruro, Cl⁻. La sal común es un cristal formado por enormes cantidades de estos iones, ordenados en una red cúbica y unidos por la atracción eléctrica entre cargas opuestas." }
    ],
    fact: "El científico sueco Svante Arrhenius propuso en la década de 1880 que muchas sustancias, al disolverse en agua, se separan espontáneamente en iones, aunque no pase corriente eléctrica. La idea fue muy discutida al principio, pero acabó aceptándose y le valió el Premio Nobel de Química en 1903. Así se completó la imagen que Faraday había empezado: los iones ya existen en el electrolito y la corriente solo los pone en marcha hacia los electrodos.",
  },
  {
    id: "leyes-electrolisis",
    bannerImage: '/assets/faraday/infographic_m4/banner_leyes-electrolisis.webp',
    bannerCaption: "En 1833 Faraday formuló sus leyes: la masa transformada en la electrólisis es proporcional a la carga eléctrica que circula.",
    title: "Las leyes de 1833",
    color: '#6E8B74',
    btnImage: '/assets/faraday/infographic_m4/btn_leyes-electrolisis.webp',
    image: '/assets/faraday/infographic_m4/hero_leyes-electrolisis.webp',
    content: [
      "Faraday fue un experimentador extraordinariamente cuidadoso. Pasó meses haciendo pasar corriente por diferentes soluciones, midiendo cuánta electricidad circulaba y pesando con precisión los gases y metales que aparecían en los electrodos. Para medir la electricidad ideó un aparato que recogía el gas producido por la electrólisis del agua: cuanto más gas, más electricidad había pasado. Con estos datos, en 1833 formuló las dos leyes de la electrólisis, que desarrolló en sus artículos de 1833 y 1834.",
      "La primera ley dice que la cantidad de sustancia que se deposita o se libera en un electrodo es directamente proporcional a la cantidad de carga eléctrica que atraviesa la celda. Si duplicas la corriente o dejas el aparato funcionando el doble de tiempo, obtienes el doble de metal o de gas. La carga se mide en culombios, y un culombio equivale a la carga que transporta una corriente de un amperio durante un segundo. Es una relación sencilla, pero de enorme precisión.",
      "La segunda ley compara sustancias diferentes. Dice que, para la misma cantidad de carga, las masas obtenidas de distintas sustancias son proporcionales a sus equivalentes químicos, es decir, a su masa atómica dividida entre la carga de su ion. Por ejemplo, la misma electricidad que libera 1 gramo de hidrógeno deposita unos 108 gramos de plata, cuyo ion tiene una carga, pero solo unos 32 gramos de cobre, porque el ion cobre tiene dos cargas y necesita el doble de electricidad por átomo.",
      "Hoy esas dos leyes se resumen con un número llamado constante de Faraday, que vale unos 96,485 culombios por mol. Representa la carga eléctrica total de un mol de electrones, es decir, de unos 602,000 trillones de electrones. Si haces pasar 96,485 culombios por una solución de plata, depositarás un mol de plata, unos 108 gramos. Los químicos usan esta constante a diario para calcular cuánta electricidad necesitan para producir una cantidad dada de cualquier sustancia.",
      "Las leyes de Faraday tenían una consecuencia profunda. Si siempre hace falta la misma cantidad de electricidad para transformar un átomo de cierto tipo, entonces la electricidad parece venir en porciones fijas, como si estuviera hecha de partículas. Faraday no dio ese paso, pero otros sí. En 1874, el irlandés George Johnstone Stoney usó estas leyes para estimar la carga de esa «unidad de electricidad», a la que más tarde llamó electrón. En 1897, J. J. Thomson descubrió experimentalmente la partícula."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante mucho tiempo se usó la palabra «faraday» como unidad de carga eléctrica. Un faraday equivalía a la carga de un mol de electrones, unos 96,485 culombios. Hoy esa unidad casi no se usa, pero el nombre de Faraday sobrevive en la constante que aparece en todos los libros de química. También lleva su nombre el faradio, la unidad de capacidad eléctrica de los condensadores que hay dentro de cualquier aparato electrónico." },
      { label: "Dato Científico", icon: "atom", text: "La constante de Faraday conecta el mundo microscópico con el que podemos pesar en una balanza. Es igual al número de Avogadro multiplicado por la carga de un solo electrón: unos 6.022 × 10²³ por 1.602 × 10⁻¹⁹ culombios. Desde la redefinición del Sistema Internacional de Unidades en 2019, ambos números tienen valores exactos fijados por definición, así que la constante de Faraday también queda fijada: aproximadamente 96,485.33 culombios por mol." }
    ],
    fact: "Faraday formuló sus leyes de la electrólisis en 1833 y las desarrolló con detalle en la séptima serie de sus Investigaciones experimentales, publicada en 1834. Es fácil confundir las fechas: 1831 es el año de la inducción electromagnética y 1836 el del cuarto metálico. Faraday trabajó en muchos campos y realizó descubrimientos fundamentales en cada uno, casi siempre con un solo ayudante y con aparatos que él mismo diseñaba y construía.",
  },
  {
    id: "agua-hidrogeno-oxigeno",
    bannerImage: '/assets/faraday/infographic_m4/banner_agua-hidrogeno-oxigeno.webp',
    bannerCaption: "La electrólisis del agua produce hidrógeno en el cátodo y oxígeno en el ánodo, en proporción de dos volúmenes a uno.",
    title: "Agua: hidrógeno y oxígeno",
    color: '#7D6B8F',
    btnImage: '/assets/faraday/infographic_m4/btn_agua-hidrogeno-oxigeno.webp',
    image: '/assets/faraday/infographic_m4/hero_agua-hidrogeno-oxigeno.webp',
    content: [
      "La electrólisis más famosa es la del agua. Una molécula de agua, H₂O, está formada por dos átomos de hidrógeno y uno de oxígeno. Al hacer pasar corriente por agua con un poco de electrolito, en el cátodo se forman burbujas de hidrógeno y en el ánodo burbujas de oxígeno. La reacción completa se resume así: dos moléculas de agua producen dos moléculas de hidrógeno y una de oxígeno. Es la misma reacción que Nicholson y Carlisle observaron por primera vez en 1800.",
      "Si recoges los gases en dos tubos invertidos, verás algo revelador: el volumen de hidrógeno es el doble que el de oxígeno. Esa proporción de dos a uno es una prueba directa de la fórmula del agua. En las aulas se usa un aparato de vidrio llamado voltámetro de Hofmann para mostrarlo. Después se puede comprobar cada gas: el hidrógeno arde con un pequeño estallido al acercarle una llama, y el oxígeno hace que una astilla de madera con brasas vuelva a encenderse.",
      "Separar el agua cuesta energía, porque los enlaces entre el hidrógeno y el oxígeno son fuertes. La electricidad aporta esa energía, que queda guardada en los gases. Cuando el hidrógeno y el oxígeno vuelven a unirse, ya sea al arder o dentro de una pila de combustible, la energía se libera y el único producto es agua. Por eso el hidrógeno se considera un portador de energía: no es una fuente en sí misma, sino una forma de almacenar y transportar la energía usada para producirlo.",
      "Si la electricidad que alimenta la electrólisis viene de paneles solares, turbinas eólicas o centrales hidroeléctricas, el hidrógeno obtenido se llama hidrógeno verde, porque su producción casi no emite dióxido de carbono. Hoy, sin embargo, la mayor parte del hidrógeno del mundo todavía se fabrica a partir de gas natural, un proceso que sí libera dióxido de carbono. Muchos países invierten en grandes electrolizadores para cambiar esa situación y producir hidrógeno limpio para la industria y el transporte.",
      "La electrólisis del agua mantiene con vida a los astronautas. En la Estación Espacial Internacional, el Sistema de Generación de Oxígeno de la NASA y el sistema ruso Elektron descomponen agua para producir el oxígeno que respira la tripulación. El hidrógeno sobrante no se desperdicia: una parte se combina con el dióxido de carbono que exhalan los astronautas para recuperar agua, en un aparato llamado reactor Sabatier. Es un pequeño ciclo químico que hace a la estación más autosuficiente."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El agua que se electroliza en la Estación Espacial Internacional proviene en buena parte del reciclaje. La estación recupera la humedad del aire, el sudor e incluso la orina de los astronautas, y la purifica hasta convertirla en agua potable. En 2023, la NASA informó que el sistema de soporte vital de la estación había alcanzado una recuperación de alrededor del 98 % del agua, una meta clave para las futuras misiones largas hacia Marte." },
      { label: "Dato Científico", icon: "atom", text: "Para separar el agua se necesita, en teoría, un voltaje mínimo de unos 1.23 voltios. En la práctica, los electrolizadores trabajan con voltajes de entre 1.7 y 2.2 voltios aproximadamente, porque parte de la energía se pierde como calor en los electrodos y en el electrolito. Los ingenieros buscan catalizadores, materiales que aceleran las reacciones en los electrodos, para acercarse al mínimo teórico. Algunos de los mejores contienen metales escasos y caros, como el platino o el iridio." }
    ],
    fact: "La electrólisis del agua produce hidrógeno y oxígeno, y no otros gases como el ozono, el helio o el argón. Si el agua contiene mucha sal disuelta, en cambio, en el ánodo puede formarse cloro, algo que la industria aprovecha a propósito. Por eso en los experimentos escolares se usa bicarbonato o un electrolito similar en lugar de sal de mesa, siempre con la supervisión de un adulto, con pilas de bajo voltaje y en un lugar bien ventilado.",
  },
  {
    id: "aluminio-hall-heroult",
    bannerImage: '/assets/faraday/infographic_m4/banner_aluminio-hall-heroult.webp',
    bannerCaption: "Desde 1886, el proceso Hall-Héroult obtiene aluminio por electrólisis; abarató el metal de aviones, naves y latas.",
    title: "Aluminio: de joya a lata",
    color: '#8C7A4F',
    btnImage: '/assets/faraday/infographic_m4/btn_aluminio-hall-heroult.webp',
    image: '/assets/faraday/infographic_m4/hero_aluminio-hall-heroult.webp',
    content: [
      "El aluminio es el metal más abundante de la corteza terrestre y el tercer elemento después del oxígeno y el silicio: representa alrededor del 8 % de su masa. Sin embargo, nunca aparece puro en la naturaleza, porque se une con mucha fuerza al oxígeno. Se encuentra sobre todo en la bauxita, un mineral rojizo. Durante gran parte del siglo XIX, separar el aluminio del oxígeno era tan difícil y costoso que el metal se consideraba más valioso que la plata y era un auténtico lujo.",
      "Se cuenta que el emperador francés Napoleón III reservaba los cubiertos de aluminio para sus invitados más importantes, mientras que los demás comían con cubiertos de oro. Y en 1884, cuando se terminó el Monumento a Washington en Estados Unidos, se colocó en su punta una pequeña pirámide de aluminio, elegida porque era uno de los metales más caros y prestigiosos de la época. Todo eso cambió en muy pocos años gracias a la electrólisis y a las leyes que Faraday había descubierto.",
      "En 1886, dos jóvenes de apenas 22 y 23 años, sin conocerse, inventaron el mismo método casi al mismo tiempo: el estadounidense Charles Martin Hall y el francés Paul Héroult. Su idea fue disolver óxido de aluminio, llamado alúmina, en un mineral fundido llamado criolita, a unos 950 °C, y hacer pasar por la mezcla una corriente eléctrica enorme. El aluminio líquido se acumula en el fondo de la celda, que actúa como cátodo, y el oxígeno reacciona con los ánodos de carbono.",
      "El proceso Hall-Héroult sigue siendo hoy el método industrial con el que se produce el aluminio nuevo, y aplica directamente las leyes de Faraday: cada átomo de aluminio necesita tres electrones, de modo que la cantidad de metal depende de la carga eléctrica que circula. Las celdas modernas funcionan con corrientes de cientos de miles de amperios. Por eso las fundiciones de aluminio se construyen cerca de grandes centrales eléctricas: son de las industrias que más electricidad consumen en el mundo.",
      "El aluminio barato transformó la tecnología. Es ligero, resistente y no se corroe con facilidad, cualidades ideales para la industria aeroespacial: los aviones comerciales y muchas naves espaciales usan aleaciones de aluminio en su estructura. Las latas de bebidas y muchos envases de alimentos también se fabrican con él. Además, se puede reciclar una y otra vez, y reciclarlo ahorra alrededor del 95 % de la energía necesaria para producirlo desde la bauxita. Cada lata reciclada es un pequeño homenaje a Faraday."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Charles Martin Hall y Paul Héroult tuvieron vidas paralelas asombrosas. Ambos nacieron en 1863, ambos descubrieron el mismo proceso en 1886 y ambos murieron en 1914. Hall participó en la fundación de la empresa que después se convertiría en Alcoa, una de las mayores productoras de aluminio del mundo. Por eso el método lleva el nombre de los dos: es uno de los ejemplos más famosos de descubrimiento simultáneo en la historia de la ciencia." },
      { label: "Dato Científico", icon: "atom", text: "La reacción global del proceso Hall-Héroult combina alúmina y carbono para dar aluminio y dióxido de carbono. La criolita es fundamental porque permite trabajar a poco menos de 1,000 °C, cuando la alúmina sola se funde por encima de 2,000 °C. Aun así, producir una tonelada de aluminio requiere del orden de 13,000 a 15,000 kilovatios hora de electricidad, más de lo que consume un hogar típico en varios años." }
    ],
    fact: "El gran tanque externo naranja del transbordador espacial, que contenía el hidrógeno y el oxígeno líquidos de sus motores, estaba fabricado con aleaciones de aluminio; en su última versión se usó una aleación de aluminio y litio, más ligera y resistente. También la estructura principal de muchos cohetes actuales es de aluminio. Sin la electrólisis que abarató este metal, la exploración espacial tal como la conocemos sería muchísimo más difícil y costosa.",
  },
  {
    id: "hidrogeno-cohetes",
    bannerImage: '/assets/faraday/infographic_m4/banner_hidrogeno-cohetes.webp',
    bannerCaption: "La NASA usa hidrógeno líquido con oxígeno líquido en motores como el RS-25: la reacción inversa de la electrólisis del agua.",
    title: "Hidrógeno para cohetes",
    color: '#4F6D7A',
    btnImage: '/assets/faraday/infographic_m4/btn_hidrogeno-cohetes.webp',
    image: '/assets/faraday/infographic_m4/hero_hidrogeno-cohetes.webp',
    content: [
      "La química de la electrólisis del agua tiene una pareja inversa espectacular: la combustión del hidrógeno. Cuando el hidrógeno y el oxígeno se combinan, liberan muchísima energía y forman vapor de agua. La NASA aprovecha esta reacción en algunos de sus cohetes más potentes, que usan hidrógeno líquido como combustible y oxígeno líquido como oxidante. Es como recorrer al revés el camino que Faraday estudió: en lugar de usar energía para separar el agua, se libera energía al formarla.",
      "El hidrógeno líquido es una sustancia extrema. Para mantenerlo en estado líquido hay que enfriarlo a unos 253 grados bajo cero, apenas 20 grados por encima del cero absoluto. El oxígeno líquido se conserva a unos 183 grados bajo cero. Ambos se guardan en tanques muy aislados y se cargan en el cohete pocas horas antes del despegue. Las nubes blancas que se ven alrededor de un cohete en la plataforma son humedad del aire que se condensa al contacto con los tanques helados.",
      "La gran ventaja del hidrógeno es su eficiencia. Los ingenieros miden el rendimiento de un motor con un número llamado impulso específico, que indica cuánto empuje se obtiene por cada kilogramo de propelente consumido. La mezcla de hidrógeno y oxígeno líquidos ofrece uno de los impulsos específicos más altos de los combustibles químicos usados en cohetes. Su desventaja es que el hidrógeno es muy poco denso, así que necesita tanques enormes: por eso el depósito de hidrógeno suele ser mucho mayor que el de oxígeno.",
      "La historia espacial está llena de motores de hidrógeno. Las etapas superiores del Saturno V, el cohete que llevó astronautas a la Luna, usaban motores J-2 alimentados con hidrógeno y oxígeno líquidos. Los tres motores principales del transbordador espacial, llamados RS-25, también los usaban. Hoy, la etapa central del cohete SLS de la NASA, diseñado para el programa Artemis, funciona con cuatro motores RS-25 heredados del transbordador, que queman hidrógeno y oxígeno líquidos.",
      "Las naves también aprovecharon la reacción en pilas de combustible, que convierten hidrógeno y oxígeno directamente en electricidad, el proceso electroquímico inverso a la electrólisis. Las cápsulas Apolo y el transbordador espacial obtenían su electricidad de pilas de combustible, y el agua que producían se usaba para beber. Conviene aclarar que hoy el hidrógeno para cohetes se fabrica sobre todo a partir de gas natural; la electrólisis es la ruta limpia que se busca extender en el futuro."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La llama de un motor de hidrógeno y oxígeno es casi invisible. Como el producto principal de la reacción es vapor de agua muy caliente, el escape de los motores RS-25 apenas se ve a plena luz del día, salvo por unos característicos anillos brillantes llamados diamantes de choque. Las grandes columnas de humo de los lanzamientos del transbordador venían en realidad de sus cohetes sólidos laterales y del vapor del agua que se rocía sobre la plataforma." },
      { label: "Dato Científico", icon: "atom", text: "La combustión del hidrógeno es la reacción de la electrólisis del agua, pero al revés: dos moléculas de hidrógeno más una de oxígeno forman dos moléculas de agua y liberan unos 286 kilojulios de energía por cada mol de agua líquida formada. En un motor cohete, esa energía calienta los gases a más de 3,000 °C y los expulsa por la tobera a velocidades de varios kilómetros por segundo, empujando el cohete hacia arriba." }
    ],
    fact: "En el futuro, la electrólisis podría fabricar recursos fuera de la Tierra. La Luna tiene hielo de agua en cráteres polares que nunca reciben luz solar, y Marte tiene hielo bajo su superficie. Con paneles solares y electrolizadores, los astronautas podrían separar ese hielo en hidrógeno y oxígeno para respirar y para recargar sus naves. La NASA ya probó en Marte el experimento MOXIE, que produjo oxígeno por electrólisis a partir del dióxido de carbono de su atmósfera.",
  },
  {
    id: "galvanoplastia-baterias",
    bannerImage: '/assets/faraday/infographic_m4/banner_galvanoplastia-baterias.webp',
    bannerCaption: "Galvanoplastia, refinado de cobre, cloro para agua potable y baterías recargables: la electrólisis está en todas partes.",
    title: "Metales brillantes y baterías",
    color: '#8F5F5F',
    btnImage: '/assets/faraday/infographic_m4/btn_galvanoplastia-baterias.webp',
    image: '/assets/faraday/infographic_m4/hero_galvanoplastia-baterias.webp',
    content: [
      "La galvanoplastia usa la electrólisis para cubrir un objeto con una capa delgada de otro metal. El objeto se conecta como cátodo y se sumerge en una solución que contiene iones del metal de recubrimiento. Al pasar corriente, esos iones ganan electrones y se depositan como una película uniforme. Así se fabrican cubiertos plateados, joyas con baño de oro, grifos cromados y tornillos protegidos con zinc. Gracias a las leyes de Faraday, se puede calcular con exactitud el grosor de la capa.",
      "La electrónica moderna depende del cobre muy puro. El cobre que sale de las minas contiene impurezas que reducen su capacidad de conducir electricidad, así que se purifica por refinado electrolítico. Se coloca un bloque de cobre impuro como ánodo y una lámina de cobre puro como cátodo. Con la corriente, el cobre del ánodo se disuelve y se deposita en el cátodo con una pureza superior al 99.99 %, mientras que las impurezas caen al fondo formando un lodo que a veces contiene oro y plata.",
      "Una de las industrias químicas más grandes del mundo es la del cloro-álcali, que electroliza agua con sal. De ella salen tres productos: cloro, hidróxido de sodio, también llamado sosa cáustica, e hidrógeno. El cloro se usa para desinfectar el agua potable de ciudades enteras y para fabricar plásticos como el PVC, mientras que la sosa cáustica sirve para producir jabón, papel y aluminio. Cada año se fabrican decenas de millones de toneladas de cloro con este proceso electrolítico.",
      "Las baterías recargables están muy emparentadas con la electrólisis. Cuando una batería de iones de litio se descarga, los iones de litio viajan de un electrodo a otro y los electrones recorren el circuito externo, alimentando tu teléfono. Al conectarla al cargador, la corriente externa obliga a los iones a regresar, en un proceso de tipo electrolítico que guarda energía química. John Goodenough, Stanley Whittingham y Akira Yoshino recibieron el Premio Nobel de Química de 2019 por desarrollar estas baterías.",
      "La electrólisis también protege y embellece metales. En la anodización, una pieza de aluminio se conecta como ánodo para que crezca en su superficie una capa dura de óxido que resiste la corrosión y se puede teñir de colores, como en muchas laptops y bicicletas. Y los glucómetros que miden el azúcar en la sangre funcionan como pequeñas celdas electroquímicas. Desde los metales brillantes hasta la salud, la química eléctrica que Faraday ordenó con sus leyes sigue trabajando todos los días."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La Estatua de la Libertad tiene una historia electroquímica. Su piel de cobre, de apenas unos 2.4 milímetros de grosor, se volvió verde con los años por una reacción natural con el aire y la lluvia. Durante su restauración en la década de 1980, los ingenieros comprobaron que el contacto entre el cobre y el armazón de hierro había formado una especie de pila que corroía el hierro, y reemplazaron esas barras por acero inoxidable." },
      { label: "Dato Científico", icon: "atom", text: "En la galvanoplastia, el grosor de la capa depende directamente de la carga que circula. Por ejemplo, para depositar un mol de plata, unos 108 gramos, se necesitan unos 96,485 culombios, lo que equivale a una corriente de un amperio funcionando durante casi 27 horas. Por eso los fabricantes controlan con cuidado la corriente y el tiempo: así obtienen capas de pocas micras, suficientes para dar brillo y protección sin gastar metal de más." }
    ],
    fact: "La protección catódica es otra aplicación electroquímica muy útil. Para evitar que los barcos, las tuberías enterradas y las plataformas marinas se oxiden, se les conectan bloques de zinc o magnesio, metales que se corroen con más facilidad que el acero. Estos «ánodos de sacrificio» se desgastan poco a poco en lugar del casco o de la tubería, que queda protegida. Es una forma ingeniosa de dejar que un metal se sacrifique para salvar a otro.",
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
      hue: Math.random() > 0.5 ? '184,125,94' : '184,125,94', // slate blue or copper
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
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(184,125,94,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradFaradayM4)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7A8C", "#8A6F5A", "#6E8B74", "#7D6B8F", "#8C7A4F", "#4F6D7A", "#8F5F5F"];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#B87D5E" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#B87D5E" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="gradFaradayM4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(184,125,94,0.2)" />
            <stop offset="50%" stopColor="rgba(184,125,94,0.9)" />
            <stop offset="100%" stopColor="rgba(184,125,94,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#B87D5E" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ROMPIENDO MOLÉCULAS CON ELECTRICIDAD</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(184,125,94,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MICHAEL FARADAY</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(184,125,94,0.2)'}`,
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
          layoutId="activeDotFaradayM4"
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
      border: '1px solid rgba(184,125,94,0.15)',
    }}>
      <Star size={14} style={{ color: '#B87D5E', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #B87D5E, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(184,125,94,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#B87D5E', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_FaradayM4() {
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
      border: '1px solid rgba(184,125,94,0.12)',
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
            textAlign: 'center', color: 'rgba(184,125,94,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(184,125,94,0.08)', borderRadius: '16px',
              border: '1px solid rgba(184,125,94,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#B87D5E', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 Rompedor de Moléculas: la electricidad que separa y transforma la materia
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
