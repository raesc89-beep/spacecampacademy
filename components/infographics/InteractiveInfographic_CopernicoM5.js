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
  "Kuhn, T. S. (1957). The Copernican Revolution: Planetary Astronomy in the Development of Western Thought. Harvard University Press.",
  "Gingerich, O. (2004). The Book Nobody Read: Chasing the Revolutions of Nicolaus Copernicus. Walker & Company.",
  "Tatsumi, K. y Corish, J. (2010). Name and symbol of the element with atomic number 112 (IUPAC Recommendations 2010). Pure and Applied Chemistry, 82(3), 753-755.",
  "Bogdanowicz, W. et al. (2009). Genetic identification of putative remains of the famous astronomer Nicolaus Copernicus. Proceedings of the National Academy of Sciences, 106(30), 12279-12282.",
  "Galilei, G. (1610). Sidereus Nuncius. Venecia: Tommaso Baglioni.",
  "NASA Exoplanet Archive, NASA Exoplanet Science Institute / Caltech-IPAC. https://exoplanetarchive.ipac.caltech.edu/"
];

const INFOGRAPHIC_NODES = [
  {
    id: "tycho-brahe-medidor-del-cielo",
    bannerImage: '/assets/copernico/infographic_m5/banner_tycho-brahe-medidor-del-cielo.webp',
    bannerCaption: "Tycho Brahe (1546-1601) midió posiciones planetarias con un error cercano a un minuto de arco, sin usar telescopio.",
    title: "Tycho Brahe: el medidor del cielo",
    color: '#5B7083',
    btnImage: '/assets/copernico/infographic_m5/btn_tycho-brahe-medidor-del-cielo.webp',
    image: '/assets/copernico/infographic_m5/hero_tycho-brahe-medidor-del-cielo.webp',
    content: [
      "Tras la muerte de Copérnico en 1543, su libro necesitaba algo que él no tenía: datos mucho más precisos. Ese hueco lo llenó Tycho Brahe, un noble danés nacido en 1546, tres años después de la publicación de De revolutionibus. De joven estudió derecho por deseo de su familia, pero pasaba las noches mirando el cielo. En 1563 observó una conjunción entre Júpiter y Saturno y descubrió que las tablas astronómicas de la época fallaban por días e incluso semanas. Decidió que la astronomía necesitaba mediciones mejores, y dedicó su vida a conseguirlas.",
      "En noviembre de 1572 apareció en la constelación de Casiopea una estrella nueva, tan brillante que durante semanas se veía incluso de día. Tycho la midió con cuidado y comprobó que no mostraba paralaje: no se desplazaba respecto a las estrellas de fondo. Eso significaba que estaba mucho más lejos que la Luna, en la región que Aristóteles consideraba perfecta e inmutable. Hoy sabemos que era una supernova, la explosión de una estrella, y los astrónomos la llaman SN 1572 o supernova de Tycho. En 1577 hizo lo mismo con un gran cometa, con idéntico resultado.",
      "Impresionado por su talento, el rey Federico II de Dinamarca le concedió la isla de Hven, hoy llamada Ven y perteneciente a Suecia, junto con fondos para construir un observatorio. Allí levantó Uraniborg a partir de 1576, y más tarde Stjerneborg, un observatorio semisubterráneo que protegía los instrumentos del viento. Tycho construyó cuadrantes murales gigantes, sextantes y esferas armilares de metal y madera. Cuanto más grande es un instrumento graduado, más finas pueden ser sus divisiones, y Tycho aprovechó esa idea al máximo.",
      "El resultado fue asombroso: sus mejores mediciones alcanzaban una precisión de alrededor de un minuto de arco, unas diez veces mejor que la de los astrónomos anteriores. Un minuto de arco equivale aproximadamente al grosor de una moneda vista a unos 70 metros de distancia. Además, Tycho no se conformaba con observar a los planetas en momentos especiales: los seguía noche tras noche durante años y repetía cada medición para detectar errores. Esa costumbre de medir de forma sistemática es hoy una regla básica de toda la ciencia experimental.",
      "Curiosamente, Tycho no aceptó del todo el modelo de Copérnico. No lograba detectar el paralaje de las estrellas y le parecía absurdo que la pesada Tierra se moviera. Por eso propuso en 1588 un sistema mixto: la Tierra quieta en el centro, la Luna y el Sol girando a su alrededor, y los demás planetas girando alrededor del Sol. Aunque su modelo era incorrecto, sus datos eran oro puro. En 1600 contrató como ayudante a un joven matemático alemán llamado Johannes Kepler. Tycho murió en Praga en 1601 y Kepler heredó sus observaciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Tycho Brahe perdió parte de la nariz en 1566, a los 20 años, durante un duelo de espadas con otro estudiante danés; según los relatos de la época, la disputa empezó por una discusión sobre matemáticas. Desde entonces llevó una prótesis metálica. Cuando sus restos se exhumaron en Praga en 2010, los análisis químicos encontraron rastros de cobre en la zona nasal, lo que sugiere que la prótesis de uso diario era de latón y no de oro o plata, como contaba la leyenda." },
      { label: "Dato Científico", icon: "atom", text: "El paralaje estelar que Tycho buscó sin éxito existe, pero es diminuto. La estrella más cercana al Sol, Próxima Centauri, tiene un paralaje de apenas 0.77 segundos de arco, unas 80 veces más pequeño que el minuto de arco que Tycho podía medir. Por eso no pudo detectarlo. El primer paralaje estelar lo midió Friedrich Bessel en 1838 para la estrella 61 Cygni, casi tres siglos después de Copérnico, y fue una confirmación directa de que la Tierra se mueve alrededor del Sol." }
    ],
    fact: "La supernova que Tycho observó en 1572 se sigue estudiando hoy. En 1952 los radioastrónomos detectaron sus restos, y telescopios espaciales como el observatorio de rayos X Chandra de la NASA han fotografiado la nube de gas caliente que dejó la explosión, que todavía se expande a miles de kilómetros por segundo. Los astrónomos la clasifican como una supernova de tipo Ia, provocada por la explosión de una enana blanca. Este tipo de supernovas se usa para medir distancias a galaxias muy lejanas.",
  },
  {
    id: "kepler-orbitas-elipticas",
    bannerImage: '/assets/copernico/infographic_m5/banner_kepler-orbitas-elipticas.webp',
    bannerCaption: "Kepler publicó sus dos primeras leyes en Astronomia Nova (1609) y la tercera en Harmonices Mundi (1619).",
    title: "Kepler: las órbitas son elipses",
    color: '#7A6A8C',
    btnImage: '/assets/copernico/infographic_m5/btn_kepler-orbitas-elipticas.webp',
    image: '/assets/copernico/infographic_m5/hero_kepler-orbitas-elipticas.webp',
    content: [
      "Johannes Kepler nació en 1571 en Weil der Stadt, en el sur de Alemania. De niño enfermó de viruela, lo que le dejó la vista débil, algo irónico para alguien que cambiaría la astronomía. Estudió en la Universidad de Tubinga, donde su profesor Michael Maestlin le explicó el sistema de Copérnico. Kepler quedó convencido desde joven. En 1596 publicó su primer libro, Mysterium Cosmographicum, una de las primeras defensas públicas del heliocentrismo escritas por un astrónomo profesional después de la muerte de Copérnico.",
      "Al llegar a Praga en 1600, Tycho le encargó estudiar la órbita de Marte, la más difícil de explicar. Según se cuenta, Kepler creyó que lo resolvería en ocho días; tardó varios años. Probó muchas combinaciones de círculos, pero siempre quedaba un error. Su mejor modelo circular fallaba por solo ocho minutos de arco en algunas posiciones. Otro astrónomo habría ignorado esa pequeña diferencia, pero Kepler sabía que los datos de Tycho eran precisos hasta casi un minuto. Escribió que esos ocho minutos abrían el camino para reformar toda la astronomía.",
      "La solución llegó cuando abandonó el círculo, la figura que los astrónomos consideraban perfecta desde la antigua Grecia. La órbita de Marte encajaba con una elipse, un óvalo con dos puntos especiales llamados focos. En 1609 publicó Astronomia Nova con sus dos primeras leyes. Primera ley: cada planeta se mueve en una elipse con el Sol en uno de sus focos. Segunda ley: la línea que une al planeta con el Sol barre áreas iguales en tiempos iguales, por lo que el planeta va más rápido cuando está cerca del Sol y más lento cuando está lejos.",
      "Diez años después, en 1619, Kepler publicó Harmonices Mundi, donde presentó su tercera ley: el cuadrado del tiempo que tarda un planeta en dar la vuelta al Sol es proporcional al cubo de su distancia media al Sol. Por ejemplo, Júpiter está unas 5.2 veces más lejos del Sol que la Tierra y tarda unos 11.86 años en completar su órbita. Si haces la cuenta, 5.2 al cubo da unos 140.6, y 11.86 al cuadrado da unos 140.7. Esta relación permite calcular distancias relativas en el sistema solar con solo medir tiempos.",
      "Con sus leyes, Kepler elaboró las Tablas Rudolfinas, publicadas en 1627 y bautizadas en honor del emperador Rodolfo II. Eran mucho más exactas que todas las anteriores, incluidas las Tablas Prutenicas basadas en Copérnico. Con ellas, Kepler predijo que Mercurio pasaría frente al disco del Sol en noviembre de 1631, y el astrónomo francés Pierre Gassendi lo observó tal como se había anunciado. Kepler había muerto en 1630, sin ver confirmada su predicción, pero el modelo heliocéntrico corregido acababa de superar una prueba decisiva."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Además de astrónomo, Kepler escribió una obra que muchos consideran una de las primeras historias de ciencia ficción: Somnium (El sueño), publicada después de su muerte, en 1634. En ella imaginó cómo se vería la Tierra desde la Luna y describió días y noches lunares muy largos con temperaturas extremas. Kepler también tuvo que defender en un largo proceso a su madre, Katharina, acusada de brujería; tras más de un año encarcelada, consiguió su liberación en 1621." },
      { label: "Dato Científico", icon: "atom", text: "Las elipses de los planetas son casi circulares, y por eso costó tanto descubrirlas. La excentricidad mide cuánto se aleja una elipse de un círculo: 0 es un círculo perfecto. La órbita de la Tierra tiene una excentricidad de apenas 0.017, y la de Marte de 0.093, una de las mayores entre los planetas. Marte fue la clave porque su órbita es lo bastante ovalada para que la diferencia apareciera en los datos de Tycho. Si Kepler hubiera estudiado Venus, con 0.007, quizá nunca habría encontrado la elipse." }
    ],
    fact: "El telescopio espacial Kepler de la NASA, lanzado en 2009, lleva el nombre de este astrónomo. Durante casi diez años vigiló el brillo de más de medio millón de estrellas en busca de pequeñas bajadas de luz causadas por planetas que pasaban frente a ellas. Cuando terminó su misión en 2018 había descubierto más de 2,600 exoplanetas confirmados. Para calcular el tamaño de sus órbitas, los astrónomos usan precisamente la tercera ley de Kepler, formulada 390 años antes del lanzamiento.",
  },
  {
    id: "galileo-pruebas-telescopio",
    bannerImage: '/assets/copernico/infographic_m5/banner_galileo-pruebas-telescopio.webp',
    bannerCaption: "En enero de 1610 Galileo descubrió cuatro lunas de Júpiter y en marzo las dio a conocer en su libro Sidereus Nuncius.",
    title: "Galileo: pruebas con el telescopio",
    color: '#8C6E52',
    btnImage: '/assets/copernico/infographic_m5/btn_galileo-pruebas-telescopio.webp',
    image: '/assets/copernico/infographic_m5/hero_galileo-pruebas-telescopio.webp',
    content: [
      "Galileo Galilei nació en Pisa en 1564. Era profesor de matemáticas en la Universidad de Padua cuando, en 1609, oyó hablar de un invento holandés: un tubo con lentes que hacía ver cerca los objetos lejanos. Sin haber visto ninguno, entendió cómo funcionaba y construyó el suyo. Pronto fabricó telescopios que aumentaban unas veinte veces. Lo más revolucionario no fue el aparato, sino su decisión de apuntarlo al cielo de forma sistemática, dibujar lo que veía y compararlo noche tras noche con las predicciones de cada modelo del universo.",
      "El 7 de enero de 1610 observó tres pequeños puntos de luz junto a Júpiter; pocos días después vio un cuarto. Noche tras noche los puntos cambiaban de posición, pero siempre acompañaban al planeta. Galileo concluyó que eran lunas que giraban alrededor de Júpiter. Hoy se llaman satélites galileanos: Ío, Europa, Ganímedes y Calisto. El hallazgo demostraba que no todo gira alrededor de la Tierra y respondía a una objeción contra Copérnico: si Júpiter conserva sus lunas mientras se mueve, la Tierra también puede conservar la suya.",
      "En marzo de 1610 publicó sus descubrimientos en Sidereus Nuncius (El mensajero sideral), un librito que se agotó rápidamente. Describía montañas y cráteres en la Luna, lo que demostraba que no era una esfera perfecta, y miles de estrellas invisibles a simple vista en la Vía Láctea. Más tarde, en 1613, publicó un estudio sobre las manchas solares. Al seguirlas día a día, vio que se desplazaban por el disco del Sol y concluyó que el Sol gira sobre sí mismo, en aproximadamente un mes.",
      "A finales de 1610 hizo una de sus observaciones más importantes: Venus mostraba fases completas, como la Luna, desde un fino creciente hasta un disco casi lleno, y cambiaba mucho de tamaño aparente. En el modelo de Ptolomeo, Venus siempre quedaba entre la Tierra y el Sol, así que nunca podría verse casi lleno. Las fases completas solo eran posibles si Venus giraba alrededor del Sol. Para ser justos, el sistema mixto de Tycho también explicaba esas fases, de modo que la discusión todavía no estaba cerrada del todo.",
      "En 1616 la Iglesia católica incluyó De revolutionibus en el Índice de Libros Prohibidos hasta que fuera corregido, 73 años después de su publicación, y advirtió a Galileo que no defendiera el movimiento de la Tierra. En 1632 Galileo publicó el Diálogo sobre los dos máximos sistemas del mundo, donde el heliocentrismo salía claramente ganador. En 1633 fue juzgado por la Inquisición, obligado a retractarse y condenado a prisión, que se cambió por arresto domiciliario. Pasó sus últimos años en su villa de Arcetri, cerca de Florencia, donde murió en 1642."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Galileo propuso llamar a las lunas de Júpiter estrellas mediceas, en honor de la poderosa familia Médici de Florencia, que poco después lo contrató como matemático y filósofo de la corte. Los nombres Ío, Europa, Ganímedes y Calisto fueron propuestos por el astrónomo alemán Simon Marius, que aseguraba haberlas observado por su cuenta, siguiendo una sugerencia de Kepler. Sin embargo, esos nombres no se generalizaron hasta el siglo XX. Hoy cada una de esas lunas es un mundo explorado por sondas espaciales." },
      { label: "Dato Científico", icon: "atom", text: "Galileo también observó Saturno en 1610 y vio algo extraño: el planeta parecía tener dos asas o protuberancias a los lados. Su telescopio no era lo bastante potente para resolverlas. Para aumentar su desconcierto, en 1612 las asas desaparecieron, porque los anillos se veían de canto desde la Tierra. Fue el astrónomo neerlandés Christiaan Huygens quien, con un telescopio mejor, explicó en 1659 que se trataba de un anillo delgado y plano que rodea al planeta sin tocarlo." }
    ],
    fact: "La NASA bautizó con el nombre de Galileo a la sonda que orbitó Júpiter entre 1995 y 2003. Esa misión encontró fuertes indicios de un océano de agua salada bajo la corteza helada de Europa, una de las lunas que Galileo descubrió. Para seguir esa pista, la NASA lanzó en octubre de 2024 la sonda Europa Clipper, que tiene previsto llegar a Júpiter en 2030. Así, más de cuatro siglos después, las lunas de Galileo siguen siendo protagonistas de la exploración espacial.",
  },
  {
    id: "newton-principia-gravitacion",
    bannerImage: '/assets/copernico/infographic_m5/banner_newton-principia-gravitacion.webp',
    bannerCaption: "Newton publicó los Principia el 5 de julio de 1687 y explicó con una sola ley la caída de una manzana y las órbitas.",
    title: "Newton y los Principia (1687)",
    color: '#4F7A6E',
    btnImage: '/assets/copernico/infographic_m5/btn_newton-principia-gravitacion.webp',
    image: '/assets/copernico/infographic_m5/hero_newton-principia-gravitacion.webp',
    content: [
      "Isaac Newton nació en Inglaterra el día de Navidad de 1642, según el calendario que se usaba entonces en ese país, el mismo año en que murió Galileo. Estudió en la Universidad de Cambridge, y cuando en 1665 una epidemia de peste cerró la universidad, regresó a la granja familiar de Woolsthorpe. En unos dos años de trabajo casi solitario desarrolló ideas fundamentales sobre la luz, las matemáticas y la gravedad. Según contó él mismo en su vejez, ver caer una manzana le hizo preguntarse si esa fuerza podía llegar hasta la Luna.",
      "La pregunta de Newton era audaz: ¿la misma fuerza gobierna la Tierra y el cielo? Desde Aristóteles se pensaba que el mundo celeste seguía reglas distintas a las de la Tierra. Newton comparó la caída de los objetos en la superficie con la caída continua de la Luna hacia la Tierra, que nunca llega a chocar porque avanza de lado a gran velocidad. Así llegó a una idea clave: la fuerza de gravedad disminuye con el cuadrado de la distancia. Si la distancia se duplica, la atracción se reduce a la cuarta parte; si se triplica, a la novena parte.",
      "En 1684 el astrónomo Edmond Halley visitó a Newton y le preguntó qué forma tendría la órbita de un planeta si la atracción del Sol disminuyera con el cuadrado de la distancia. Newton respondió que una elipse, porque ya lo había calculado. Halley lo animó a publicar y pagó la impresión de su propio bolsillo. El 5 de julio de 1687 apareció Philosophiæ Naturalis Principia Mathematica, uno de los libros más importantes de la historia de la ciencia, con las tres leyes del movimiento y la ley de gravitación universal.",
      "La ley de gravitación universal dice que dos cuerpos cualesquiera se atraen con una fuerza proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia que los separa. Con esa sola ley, Newton demostró que las tres leyes de Kepler eran consecuencias matemáticas necesarias. También explicó las mareas, causadas por la atracción de la Luna y el Sol, y el ligero achatamiento de la Tierra en los polos. Por primera vez el sistema heliocéntrico tenía una causa física y no solo una descripción geométrica.",
      "Newton mostró además que el Sol tampoco está completamente quieto: el Sol y los planetas giran alrededor de su centro de masa común, que queda muy cerca del Sol porque este concentra más del 99.8 % de la masa del sistema solar. La gran prueba pública llegó después de su muerte, ocurrida en 1727. Halley usó las ideas de Newton para predecir que un cometa visto en 1531, 1607 y 1682 regresaría hacia 1758. Volvió a verse la Navidad de 1758, y desde entonces lleva el nombre de su predictor: el cometa Halley."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En una carta de 1675 a su colega Robert Hooke, Newton escribió una frase famosa: si he visto más lejos, es porque estoy sentado sobre los hombros de gigantes. La imagen no era nueva, pues ya la usaba en el siglo XII el filósofo Bernardo de Chartres, pero resume muy bien la cadena copernicana: Newton se apoyó en las leyes de Kepler, Kepler en los datos de Tycho y en el modelo de Copérnico, y Copérnico en siglos de observaciones griegas y árabes." },
      { label: "Dato Científico", icon: "atom", text: "La constante de gravitación universal, G, que aparece en la ley de Newton, es tan pequeña que tardó más de un siglo en medirse. Lo logró Henry Cavendish en 1798 con una balanza de torsión: unas esferas de plomo colgadas de un hilo se acercaban ligeramente a otras más grandes. Su valor aceptado hoy es de aproximadamente 6.674 × 10⁻¹¹ en unidades del Sistema Internacional. Por eso no notamos la atracción entre dos personas: hace falta una masa enorme, como la de un planeta, para que la gravedad se note." }
    ],
    fact: "Las leyes de Newton siguen guiando a las naves espaciales. Cuando la NASA calcula la trayectoria de una sonda hacia Marte o Júpiter, usa esencialmente la gravitación de Newton, con pequeñas correcciones de la relatividad general de Einstein cuando se necesita gran precisión. Las sondas Voyager, lanzadas en 1977, aprovecharon asistencias gravitatorias: al pasar cerca de los planetas gigantes ganaban velocidad, una maniobra calculada con una física que nace directamente de los Principia de 1687.",
  },
  {
    id: "revolucion-en-las-ideas",
    bannerImage: '/assets/copernico/infographic_m5/banner_revolucion-en-las-ideas.webp',
    bannerCaption: "En 1992 el papa Juan Pablo II reconoció los errores cometidos en el juicio contra Galileo, 359 años después de su condena.",
    title: "Una revolución en las ideas",
    color: '#7D5F5F',
    btnImage: '/assets/copernico/infographic_m5/btn_revolucion-en-las-ideas.webp',
    image: '/assets/copernico/infographic_m5/hero_revolucion-en-las-ideas.webp',
    content: [
      "La revolución copernicana no solo cambió la astronomía: cambió la forma de pensar. El historiador Thomas Kuhn, en su libro La revolución copernicana, de 1957, explicó que pasar de un universo centrado en la Tierra a uno centrado en el Sol obligó a revisar la física, la filosofía y hasta la idea que los seres humanos tenían de sí mismos. Durante casi dos mil años el modelo geocéntrico había parecido evidente: vemos al Sol moverse y no sentimos que el suelo se desplace. Copérnico enseñó que las apariencias pueden engañar.",
      "El filósofo alemán Immanuel Kant usó a Copérnico como ejemplo en el prólogo de la segunda edición de su Crítica de la razón pura, publicada en 1787. Copérnico, explicó Kant, entendió que muchos movimientos del cielo dependen de cómo se mueve el observador. Kant propuso algo parecido para el conocimiento: lo que conocemos depende también de cómo funciona nuestra mente. Desde entonces la expresión giro copernicano se usa para describir cualquier cambio radical de perspectiva, en la ciencia, en el arte o en la vida cotidiana.",
      "Faltaba una prueba directa del movimiento de la Tierra. La primera llegó en 1729, cuando el astrónomo inglés James Bradley publicó el descubrimiento de la aberración de la luz: las estrellas parecen desplazarse un poco a lo largo del año porque la Tierra se mueve mientras recibimos su luz, igual que la lluvia parece caer inclinada cuando corres. En 1838 Friedrich Bessel midió el paralaje de la estrella 61 Cygni, y en 1851 Léon Foucault mostró la rotación terrestre con un péndulo gigante en París.",
      "La relación con la Iglesia fue cambiando con el tiempo. En 1758 se retiró del Índice la prohibición general de los libros que defendían el movimiento de la Tierra, y en la edición del Índice de 1835 ya no aparecían ni De revolutionibus ni el Diálogo de Galileo. En 1979 el papa Juan Pablo II, nacido en Polonia como Copérnico, pidió revisar el caso de Galileo. En 1992, tras el trabajo de una comisión de estudio, reconoció públicamente que los jueces de Galileo se habían equivocado.",
      "Hay una lección importante en esta historia: en ciencia, las ideas se aceptan por la evidencia y no por la autoridad de quien las defiende. Copérnico propuso, Tycho midió, Kepler calculó, Galileo observó y Newton explicó. Ninguno tuvo la última palabra solo; cada uno revisó y mejoró el trabajo de los anteriores. Ese proceso de comprobar, corregir y volver a comprobar, que tardó más de un siglo, es exactamente lo que hoy llamamos método científico, y sigue funcionando igual en los laboratorios y observatorios modernos."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Copérnico dedicó De revolutionibus al papa Paulo III, y durante décadas el libro circuló sin grandes problemas. El astrónomo e historiador Owen Gingerich pasó más de 30 años localizando y examinando los ejemplares de la primera y la segunda edición que sobreviven en bibliotecas de todo el mundo, unos 600 en total. Descubrió que muchos estaban llenos de anotaciones de lectores atentos, lo que demuestra que el libro sí se estudió. Contó esa aventura en El libro que nadie leyó, publicado en 2004." },
      { label: "Dato Científico", icon: "atom", text: "El péndulo de Foucault demuestra la rotación de la Tierra sin mirar al cielo. Un péndulo muy largo y pesado oscila siempre en el mismo plano, pero la Tierra gira debajo de él, así que ese plano parece rotar lentamente. En el Polo Norte daría una vuelta completa en casi 24 horas; en París tarda unas 32 horas, y en el ecuador no gira en absoluto. El péndulo que Foucault colgó en el Panteón de París en 1851 medía 67 metros y su bola pesaba 28 kilos." }
    ],
    fact: "Thomas Kuhn volvió a pensar en Copérnico cuando escribió, en 1962, La estructura de las revoluciones científicas, uno de los libros de filosofía de la ciencia más citados del siglo XX. Allí popularizó la expresión cambio de paradigma: el momento en que una comunidad científica abandona una forma de ver el mundo y adopta otra distinta. El paso del geocentrismo al heliocentrismo es uno de sus ejemplos principales, junto con la química de Lavoisier y la física de Einstein.",
  },
  {
    id: "principio-de-copernico",
    bannerImage: '/assets/copernico/infographic_m5/banner_principio-de-copernico.webp',
    bannerCaption: "El principio de Copérnico afirma que la Tierra no ocupa un lugar privilegiado en el universo.",
    title: "El principio de Copérnico",
    color: '#556B8A',
    btnImage: '/assets/copernico/infographic_m5/btn_principio-de-copernico.webp',
    image: '/assets/copernico/infographic_m5/hero_principio-de-copernico.webp',
    content: [
      "Copérnico movió la Tierra del centro, pero dejó al Sol en un lugar especial. Los astrónomos de los siglos siguientes siguieron quitando centros. En 1918 el estadounidense Harlow Shapley estudió la distribución de los cúmulos globulares, grandes grupos esféricos de estrellas, y descubrió que el Sol no está en el centro de la Vía Láctea. Hoy sabemos que estamos a unos 26,000 años luz del centro de nuestra galaxia, entre dos de sus brazos espirales, y que tardamos unos 230 millones de años en dar una vuelta completa a su alrededor.",
      "En 1924 Edwin Hubble demostró, usando estrellas variables llamadas cefeidas, que la nebulosa de Andrómeda está muy lejos de la Vía Láctea: es otra galaxia. De golpe, el universo se volvió inmensamente más grande. En 1929 Hubble mostró que las galaxias lejanas se alejan de nosotros más rápido cuanto más lejos están, algo que el belga Georges Lemaître había anticipado en 1927. Eso no significa que estemos en el centro: en un universo en expansión, cualquier observador en cualquier galaxia vería lo mismo a su alrededor.",
      "A mediados del siglo XX, el cosmólogo Hermann Bondi dio nombre a esta idea: el principio de Copérnico. Afirma que no ocupamos un lugar privilegiado en el universo. La Tierra es un planeta común que gira alrededor de una estrella común, una entre los cientos de miles de millones de estrellas de la Vía Láctea, que a su vez es una entre cientos de miles de millones de galaxias. Los cosmólogos lo usan como herramienta de trabajo y suponen que el universo, a gran escala, es parecido en todas partes.",
      "Si la Tierra es un planeta común, deberían existir planetas alrededor de otras estrellas. En 1992 el astrónomo polaco Aleksander Wolszczan y el canadiense Dale Frail descubrieron los primeros planetas fuera del sistema solar, girando alrededor de un púlsar, el núcleo ultradenso que queda tras la explosión de una estrella. En 1995 los suizos Michel Mayor y Didier Queloz hallaron 51 Pegasi b, el primer planeta alrededor de una estrella parecida al Sol; por ese descubrimiento recibieron el Premio Nobel de Física en 2019.",
      "Desde entonces el número de exoplanetas confirmados no ha dejado de crecer: según el archivo de exoplanetas de la NASA, ya se conocen más de 6,000. Telescopios como Kepler, TESS y el telescopio espacial James Webb los descubren y estudian sus atmósferas. Muchos son muy distintos de los de nuestro sistema solar, como los júpiteres calientes, gigantes gaseosos que dan la vuelta a su estrella en pocos días. La gran pregunta copernicana sigue abierta: si nuestro planeta no es especial, ¿lo es la vida que lo habita?"
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Aleksander Wolszczan, uno de los descubridores de los primeros exoplanetas, se formó en la Universidad Nicolás Copérnico de Toruń, la ciudad polaca donde nació Copérnico en 1473, y más tarde fue profesor allí. Es una coincidencia muy bonita: casi cinco siglos después de que un astrónomo de Toruń dijera que la Tierra es un planeta más, otro astrónomo formado en esa misma ciudad encontró los primeros planetas de otra estrella. El púlsar se llama PSR B1257+12 y está a unos 2,300 años luz." },
      { label: "Dato Científico", icon: "atom", text: "El principio de Copérnico tiene un pariente más amplio: el principio cosmológico, según el cual, a escalas muy grandes, el universo es homogéneo, es decir, igual en todas partes, e isótropo, igual en todas direcciones. La radiación de fondo de microondas, la luz más antigua del universo, emitida unos 380,000 años después del Big Bang, lo respalda: su temperatura, de unos 2.725 kelvin, varía apenas en una parte entre cien mil de un punto a otro del cielo." }
    ],
    fact: "El 14 de febrero de 1990 la sonda Voyager 1, a unos 6,000 millones de kilómetros, tomó una fotografía de la Tierra a petición del astrónomo Carl Sagan. En la imagen, nuestro planeta aparece como un diminuto punto azul pálido que ocupa menos de un píxel. Sagan escribió que en ese punto había vivido cada ser humano de la historia. Es quizá la imagen que mejor resume el principio de Copérnico: somos muy pequeños en el cosmos, pero capaces de comprenderlo.",
  },
  {
    id: "copernico-nombre-en-el-cosmos",
    bannerImage: '/assets/copernico/infographic_m5/banner_copernico-nombre-en-el-cosmos.webp',
    bannerCaption: "El copernicio, elemento 112, recibió oficialmente su nombre el 19 de febrero de 2010, aniversario del nacimiento de Copérnico.",
    title: "Un nombre en la tabla y en el cielo",
    color: '#8A7B55',
    btnImage: '/assets/copernico/infographic_m5/btn_copernico-nombre-en-el-cosmos.webp',
    image: '/assets/copernico/infographic_m5/hero_copernico-nombre-en-el-cosmos.webp',
    content: [
      "Uno de los homenajes más originales a Copérnico está en la tabla periódica. El elemento 112 se creó por primera vez en 1996 en el laboratorio GSI de Darmstadt, Alemania, gracias a un equipo dirigido por Sigurd Hofmann. Para fabricarlo bombardearon una lámina de plomo con núcleos de zinc acelerados; al fusionarse, los núcleos formaron un átomo nuevo y muy pesado. Al principio obtuvieron un solo átomo, que se desintegró en una fracción de segundo. Hicieron falta años de experimentos, también en otros laboratorios, para confirmar el hallazgo.",
      "Los descubridores propusieron el nombre copernicium en honor del astrónomo, y la IUPAC, la organización internacional que decide los nombres de los elementos, lo aprobó oficialmente el 19 de febrero de 2010, día en que se cumplían 537 años de su nacimiento. En español se llama copernicio y su símbolo es Cn. Primero se propuso el símbolo Cp, pero se descartó porque antiguamente se había usado para otro elemento. El copernicio es radiactivo, no existe en la naturaleza y su isótopo más estable dura apenas alrededor de medio minuto.",
      "En la Luna también hay un recuerdo suyo: el cráter Copérnico, de unos 93 kilómetros de diámetro, se distingue incluso con unos binoculares. Se formó por el impacto de un asteroide hace unos 800 millones de años y está rodeado de rayos brillantes de material expulsado. El nombre se lo dio el astrónomo jesuita Giovanni Riccioli en un mapa lunar publicado en 1651. Además existen un cráter Copérnico en Marte y un asteroide, el 1322 Coppernicus, descubierto en 1934 por el astrónomo alemán Karl Reinmuth.",
      "La exploración espacial moderna también lleva su firma. En 1972 la NASA lanzó el Observatorio Astronómico Orbital 3, rebautizado Copernicus para celebrar los 500 años de su nacimiento, que se cumplían en 1973; estudió el universo en luz ultravioleta y rayos X hasta 1981. Hoy el programa europeo Copernicus usa una flota de satélites llamados Sentinel para vigilar la Tierra: mide el hielo de los polos, la contaminación del aire, el nivel del mar y los incendios forestales, y sus datos son gratuitos para cualquiera.",
      "En Polonia, Copérnico es un héroe nacional. La universidad de su ciudad natal, fundada en 1945, se llama Universidad Nicolás Copérnico de Toruń, y en Varsovia se encuentra el Centro de Ciencias Copérnico, un enorme museo interactivo inaugurado en 2010. Su retrato apareció en billetes polacos y en monedas y sellos de muchos países. Pero el mejor homenaje es mucho más sencillo: cada vez que una persona aprende en la escuela que la Tierra gira alrededor del Sol, la idea de Copérnico vuelve a cobrar vida."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Los restos de Copérnico estuvieron perdidos durante siglos bajo el suelo de la catedral de Frombork. En 2005 un equipo de arqueólogos polacos encontró un cráneo y huesos que podían ser suyos, y en 2008 un análisis de ADN los comparó con cabellos hallados en un libro que perteneció a Copérnico, conservado hoy en la Universidad de Uppsala, en Suecia. El ADN coincidía. En mayo de 2010 fue enterrado de nuevo, con honores, en la misma catedral donde trabajó como canónigo." },
      { label: "Dato Científico", icon: "atom", text: "Los elementos superpesados como el copernicio son tan inestables que se estudian átomo por átomo. Los químicos han realizado experimentos con apenas unos pocos átomos de copernicio y han encontrado indicios de que se comporta como un metal muy volátil, parecido al mercurio, su vecino en la tabla periódica. La relatividad de Einstein ayuda a explicarlo: en átomos tan pesados, los electrones más internos se mueven a velocidades cercanas a la de la luz, lo que modifica sus propiedades químicas." }
    ],
    fact: "El cráter Copérnico es tan representativo que da nombre a toda una etapa de la historia de la Luna: el período Copernicano, que abarca aproximadamente los últimos 1,100 millones de años. Los geólogos lunares asignan a ese período los cráteres jóvenes que todavía conservan sus rayos brillantes, porque el material expulsado aún no ha sido oscurecido por la radiación solar y los micrometeoritos. Así, el nombre de Copérnico sirve también para medir el tiempo en otro mundo.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradCopernicoM5)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5B7083", "#7A6A8C", "#8C6E52", "#4F7A6E", "#7D5F5F", "#556B8A", "#8A7B55"];
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
          <linearGradient id="gradCopernicoM5" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.2)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DE TYCHO A LOS EXOPLANETAS</text>
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
          layoutId="activeDotCopernicoM5"
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
export default function InteractiveInfographic_CopernicoM5() {
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
              🏆 Cómo una idea de 1543 encendió la ciencia moderna y sigue guiando la exploración
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
