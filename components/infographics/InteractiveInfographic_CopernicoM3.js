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
  "Gingerich, O. (2004). The Book Nobody Read: Chasing the Revolutions of Nicolaus Copernicus. New York: Walker & Company.",
  "Gingerich, O. (2002). An Annotated Census of Copernicus' De revolutionibus (Nuremberg, 1543 and Basel, 1566). Leiden: Brill.",
  "Copérnico, N. (1987). Sobre las revoluciones de los orbes celestes. Edición de Carlos Mínguez y Mercedes Testal. Madrid: Tecnos.",
  "Swerdlow, N. M., & Neugebauer, O. (1984). Mathematical Astronomy in Copernicus's De Revolutionibus. New York: Springer.",
  "Rosen, E. (trad.) (1959). Three Copernican Treatises. Incluye la Narratio prima de Rheticus. Dover Publications.",
  "Rabin, S. (2019). «Nicolaus Copernicus». Stanford Encyclopedia of Philosophy. https://plato.stanford.edu/entries/copernicus/"
];

const INFOGRAPHIC_NODES = [
  {
    id: "revolutionibus-titulo-y-publicacion",
    bannerImage: '/assets/copernico/infographic_m3/banner_revolutionibus-titulo-y-publicacion.webp',
    bannerCaption: "«De revolutionibus orbium coelestium» significa «Sobre las revoluciones de las esferas celestes». Se imprimió en Nuremberg en 1543.",
    title: "Un título, una fecha: 1543",
    color: '#7C6A55',
    btnImage: '/assets/copernico/infographic_m3/btn_revolutionibus-titulo-y-publicacion.webp',
    image: '/assets/copernico/infographic_m3/hero_revolutionibus-titulo-y-publicacion.webp',
    content: [
      "El libro más famoso de Copérnico se titula en latín De revolutionibus orbium coelestium, que en español significa «Sobre las revoluciones de las esferas celestes» o «de los orbes celestes». Se imprimió en 1543 en Nuremberg, una de las grandes ciudades de la imprenta en Alemania, en el taller de Johannes Petreius. Muchos historiadores consideran esa fecha como el punto de partida de la llamada revolución científica.",
      "En latín, la palabra «revolutio» significaba el giro completo de un cuerpo alrededor de un centro, como cuando un planeta termina una vuelta. No tenía el sentido político que le damos hoy, de cambio brusco en la sociedad. Ese uso moderno se extendió siglos después. En el título de Copérnico, las «revoluciones» eran simplemente las vueltas de los orbes que llevaban a los planetas. Aun así, es curioso que el libro que más transformó la visión del cosmos llevara justamente esa palabra en su título.",
      "Copérnico trabajó en esta obra durante décadas. Ya antes de 1514 había presentado las ideas básicas en su breve manuscrito Commentariolus, y en los años siguientes fue desarrollando las demostraciones matemáticas completas. En la dedicatoria del libro, él mismo comenta que había guardado su obra no solo nueve años, como aconsejaba el poeta latino Horacio para los textos importantes, sino casi cuatro veces nueve años.",
      "Los historiadores creen que la parte final del título, «orbium coelestium», pudo ser añadida durante la impresión y no por el propio Copérnico, cuyo manuscrito parece referirse a la obra simplemente como De revolutionibus. Ese manuscrito original, escrito de su puño y letra, se conserva hoy en la Biblioteca Jaguelónica de Cracovia, en Polonia, y en 1999 fue incluido en el registro Memoria del Mundo de la UNESCO.",
      "La primera edición de 1543 tuvo una tirada que los expertos estiman en unos 400 a 500 ejemplares, una cantidad normal para un libro técnico de la época. Hubo una segunda edición en Basilea, Suiza, en 1566, y una tercera en Ámsterdam en 1617. Cada nueva edición demuestra que, aunque era un libro difícil, los astrónomos de Europa lo seguían buscando y estudiando durante generaciones."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Hoy un ejemplar de la primera edición de De revolutionibus es uno de los libros científicos más valiosos del mercado: en subastas recientes se han pagado precios de más de dos millones de dólares por copias bien conservadas. Algunas bibliotecas guardan ejemplares con notas escritas a mano por astrónomos famosos, lo que los convierte en piezas únicas de la historia de la ciencia." },
      { label: "Dato Científico", icon: "atom", text: "La imprenta de tipos móviles, desarrollada por Johannes Gutenberg hacia 1450, fue clave para el éxito de Copérnico. Antes, un libro tenía que copiarse a mano y cada copia podía contener errores en números y tablas. Con la imprenta, cientos de astrónomos podían trabajar con exactamente las mismas cifras y diagramas, comparar resultados y detectar errores. La ciencia se volvió verificable a gran escala." }
    ],
    fact: "Copérnico murió el 24 de mayo de 1543 en Frombork, el mismo año en que su libro salió de la imprenta. Había nacido el 19 de febrero de 1473 en Toruń, así que tenía 70 años. Su libro le sobrevivió durante casi cinco siglos y hoy sigue estudiándose. En 2005 se localizaron restos atribuidos a él bajo la catedral de Frombork, y en 2010 fue enterrado de nuevo con honores.",
  },
  {
    id: "revolutionibus-seis-libros",
    bannerImage: '/assets/copernico/infographic_m3/banner_revolutionibus-seis-libros.webp',
    bannerCaption: "La obra se divide en seis libros: cosmología general, esfera celeste, Tierra y Sol, la Luna y, al final, los planetas.",
    title: "Seis libros dentro de un libro",
    color: '#5F7484',
    btnImage: '/assets/copernico/infographic_m3/btn_revolutionibus-seis-libros.webp',
    image: '/assets/copernico/infographic_m3/hero_revolutionibus-seis-libros.webp',
    content: [
      "De revolutionibus está dividido en seis partes, que el propio Copérnico llamó libros. El Libro I presenta la idea general: la forma esférica del universo y de la Tierra, los movimientos de nuestro planeta y el orden de los cuerpos celestes. Allí aparece el famoso diagrama con el Sol en el centro rodeado por círculos para Mercurio, Venus, la Tierra con la Luna, Marte, Júpiter, Saturno y la esfera inmóvil de las estrellas.",
      "Al final del Libro I, Copérnico incluyó una sección de trigonometría con una tabla de cuerdas, que permitía calcular ángulos y distancias en triángulos. El Libro II trata de la esfera celeste: los círculos del cielo, la salida y puesta de los astros, y un catálogo con más de mil estrellas, basado en el de Ptolomeo pero adaptado. Copérnico midió las posiciones de las estrellas tomando como referencia una estrella de la constelación de Aries.",
      "El Libro III estudia la precesión de los equinoccios y el movimiento anual de la Tierra alrededor del Sol, lo que permite calcular la duración del año. El Libro IV se dedica a la Luna: sus movimientos, su distancia y los eclipses. Los Libros V y VI tratan de los planetas: el quinto explica sus movimientos a lo largo del zodíaco, en longitud, y el sexto sus pequeñas desviaciones hacia el norte o el sur, en latitud.",
      "En la dedicatoria al papa Pablo III, Copérnico escribió una frase célebre en latín: «mathemata mathematicis scribuntur», es decir, «las matemáticas se escriben para los matemáticos». Con ella advertía que su obra no estaba pensada para el público general, sino para especialistas capaces de seguir demostraciones geométricas complejas. De hecho, solo una pequeña parte del Libro I es fácil de leer sin formación técnica.",
      "En el capítulo 10 del Libro I, Copérnico describe el Sol con palabras casi poéticas: lo sitúa en medio de todo, como en un trono, y lo compara con una lámpara colocada en el lugar desde donde puede iluminarlo todo a la vez. Explica que con este orden los planetas quedan organizados por sus períodos, de modo que el universo forma una armonía donde ninguna parte puede moverse sin alterar las demás."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En el famoso diagrama del Libro I, Copérnico escribió junto a cada círculo el tiempo que tarda cada planeta en dar la vuelta: Saturno, 30 años; Júpiter, 12 años; Marte, 2 años; la Tierra con la Luna, 1 año; Venus, 9 meses; y Mercurio, 80 días. Es una de las imágenes más reproducidas de la historia de la ciencia y aparece en muchos libros de texto de todo el mundo." },
      { label: "Dato Científico", icon: "atom", text: "La sección de trigonometría de Copérnico fue tan útil que su discípulo Rheticus la publicó por separado en Wittenberg en 1542, un año antes que el libro completo, con el título Sobre los lados y ángulos de los triángulos. La trigonometría esférica, que estudia triángulos dibujados sobre una esfera, es esencial en astronomía y todavía se usa en navegación y en el cálculo de órbitas de satélites." }
    ],
    fact: "En la dedicatoria, Copérnico mencionó que sus cálculos podían ayudar a la reforma del calendario, un tema que la Iglesia había discutido en el Concilio de Letrán iniciado en 1512, al que fue consultado. El calendario juliano acumulaba un error de unos once minutos por año respecto al año solar. La reforma llegó en 1582 con el calendario gregoriano, el que usamos hoy en casi todo el mundo.",
  },
  {
    id: "revolutionibus-rheticus",
    bannerImage: '/assets/copernico/infographic_m3/banner_revolutionibus-rheticus.webp',
    bannerCaption: "En 1539 el joven matemático Georg Joachim Rheticus viajó a Frombork y convenció a Copérnico de publicar su obra completa.",
    title: "Rheticus, el discípulo que lo cambió todo",
    color: '#6B7E5E',
    btnImage: '/assets/copernico/infographic_m3/btn_revolutionibus-rheticus.webp',
    image: '/assets/copernico/infographic_m3/hero_revolutionibus-rheticus.webp',
    content: [
      "Copérnico dudó durante años si publicar su obra. Temía las burlas de quienes no entendían las matemáticas y la reacción de filósofos y teólogos ante una Tierra en movimiento. La persona que rompió esa duda fue Georg Joachim Rheticus, un joven profesor de matemáticas de la Universidad de Wittenberg, en Alemania, nacido en 1514. Había oído hablar de la teoría de Copérnico y decidió conocerlo en persona.",
      "En mayo de 1539, Rheticus llegó a Frombork, la pequeña ciudad de la región de Varmia donde Copérnico vivía como canónigo de la catedral. El viaje tenía cierto riesgo: Rheticus venía de Wittenberg, un centro del protestantismo luterano, mientras que Varmia era una región católica. Aun así, Copérnico lo recibió con generosidad, y el joven se quedó con él unos dos años, hasta 1541, estudiando su teoría.",
      "Rheticus quedó fascinado por el sistema heliocéntrico. En 1540 publicó en Danzig, hoy Gdansk, un pequeño libro llamado Narratio prima, que significa «Primera narración». Fue el primer texto impreso que explicaba el sistema de Copérnico. Lo escribió en forma de carta a su maestro, el astrónomo Johannes Schöner, y su buena acogida ayudó a convencer a Copérnico de que el mundo estaba listo para conocer su obra.",
      "Rheticus insistió en que Copérnico publicara el libro completo, con todas sus demostraciones, y no solo resúmenes. Finalmente lo consiguió: se llevó una copia del manuscrito a Nuremberg y en 1542 comenzó a supervisar su impresión en el taller de Petreius. Sin embargo, ese mismo año aceptó un puesto como profesor en la Universidad de Leipzig y tuvo que dejar el trabajo de impresión en otras manos.",
      "Sin Rheticus, es posible que De revolutionibus nunca se hubiera publicado o que hubiera salido mucho más tarde. Por eso los historiadores lo consideran una figura clave de la revolución científica, aunque su nombre sea menos conocido. Su historia muestra que la ciencia también depende de la colaboración: a veces un estudiante entusiasta es quien da el empujón decisivo para que una gran idea llegue al mundo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Rheticus no era su apellido de nacimiento. Su familia se llamaba Iserin, pero cuando su padre fue condenado y ejecutado, la familia tuvo que cambiar de nombre. El joven eligió Rheticus, que en latín hace referencia a Retia, la antigua provincia romana de los Alpes donde había nacido, en la actual Austria. Era común entre los eruditos del Renacimiento latinizar sus nombres." },
      { label: "Dato Científico", icon: "atom", text: "Además de impulsar a Copérnico, Rheticus dedicó gran parte de su vida a calcular tablas trigonométricas enormemente precisas. Su obra Opus palatinum de triangulis, terminada por su alumno Valentinus Otho y publicada en 1596, contenía valores de las funciones trigonométricas con diez cifras decimales. Esas tablas fueron una herramienta importante para astrónomos e ingenieros antes de la invención de los logaritmos." }
    ],
    fact: "La Narratio prima de Rheticus tuvo una segunda edición en Basilea en 1541, antes de que apareciera el libro de Copérnico. Por eso muchos sabios europeos conocieron el sistema heliocéntrico primero a través de Rheticus. En la edición de 1566 de De revolutionibus, impresa en Basilea, la Narratio prima se incluyó como apéndice, uniendo para siempre al maestro y a su discípulo.",
  },
  {
    id: "revolutionibus-prologo-osiander",
    bannerImage: '/assets/copernico/infographic_m3/banner_revolutionibus-prologo-osiander.webp',
    bannerCaption: "El teólogo Andreas Osiander añadió un prólogo anónimo que presentaba el sistema como simple hipótesis matemática.",
    title: "El prólogo de Osiander",
    color: '#8A5F5F',
    btnImage: '/assets/copernico/infographic_m3/btn_revolutionibus-prologo-osiander.webp',
    image: '/assets/copernico/infographic_m3/hero_revolutionibus-prologo-osiander.webp',
    content: [
      "Cuando Rheticus se fue a Leipzig, la supervisión de la impresión quedó a cargo de Andreas Osiander, un teólogo luterano de Nuremberg con conocimientos de matemáticas. Osiander tomó una decisión polémica: añadió al inicio del libro un breve texto anónimo titulado Al lector, sobre las hipótesis de esta obra. No lo firmó, así que muchos lectores creyeron que lo había escrito el propio Copérnico.",
      "En ese prólogo, Osiander explicaba que las hipótesis del libro no tenían por qué ser verdaderas, ni siquiera probables. Según él, bastaba con que permitieran hacer cálculos que coincidieran con las observaciones. Así presentaba el movimiento de la Tierra como un recurso matemático útil para calcular posiciones, y no como una descripción de cómo es realmente el universo. Esto contradecía la opinión de Copérnico.",
      "¿Por qué lo hizo? La explicación más aceptada es que quería proteger el libro y a su autor de la reacción de filósofos y teólogos. En aquella época, la astronomía matemática se veía a menudo como una técnica para calcular, mientras que las afirmaciones sobre la realidad física correspondían a la filosofía y la teología. Presentar el sistema como pura hipótesis parecía una forma de evitar conflictos con esas autoridades.",
      "Copérnico, en cambio, estaba convencido de que la Tierra se movía realmente. Su dedicatoria al papa Pablo III, escrita en 1542, defendía el sistema como una descripción verdadera del cosmos. Tiedemann Giese, obispo y amigo íntimo de Copérnico, se indignó al ver el prólogo y pidió al consejo de la ciudad de Nuremberg que obligara a corregir el libro. El consejo no accedió y el prólogo permaneció.",
      "Durante más de sesenta años, la autoría del prólogo fue un secreto para la mayoría de los lectores. Fue Johannes Kepler quien la reveló públicamente en 1609, en su libro Astronomia nova, donde aclaró que el texto lo había escrito Osiander y no Copérnico. Kepler lo sabía gracias a anotaciones en un ejemplar que había pertenecido a un sabio de Nuremberg. Así quedó claro que Copérnico creía en la realidad de su sistema."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Al estudiar cientos de ejemplares antiguos de De revolutionibus, el historiador Owen Gingerich encontró copias en las que algún lector había tachado el prólogo de Osiander con tinta o lápiz rojo. Eso demuestra que algunos astrónomos de la época sabían o sospechaban que no era de Copérnico y querían dejar constancia de su desacuerdo directamente en las páginas del libro." },
      { label: "Dato Científico", icon: "atom", text: "El debate entre ver una teoría como una descripción real o como una herramienta de cálculo sigue vivo en la filosofía de la ciencia. A la primera postura se le llama realismo científico y a la segunda instrumentalismo. El prólogo de Osiander es uno de los ejemplos históricos más citados de instrumentalismo, y la reacción de Copérnico, Kepler y Galileo lo es del realismo." }
    ],
    fact: "Las dos visiones convivieron en las universidades durante décadas. En Wittenberg, un grupo de profesores encabezado por Philipp Melanchthon usó los cálculos de Copérnico para enseñar astronomía, pero sin aceptar que la Tierra se moviera de verdad. Los historiadores llaman a esta postura la interpretación de Wittenberg, y gracias a ella las matemáticas copernicanas se difundieron antes que su cosmología.",
  },
  {
    id: "revolutionibus-mayo-1543",
    bannerImage: '/assets/copernico/infographic_m3/banner_revolutionibus-mayo-1543.webp',
    bannerCaption: "Según su amigo Tiedemann Giese, Copérnico vio el libro impreso completo el mismo día de su muerte, el 24 de mayo de 1543.",
    title: "Mayo de 1543: un libro y una despedida",
    color: '#6A6280',
    btnImage: '/assets/copernico/infographic_m3/btn_revolutionibus-mayo-1543.webp',
    image: '/assets/copernico/infographic_m3/hero_revolutionibus-mayo-1543.webp',
    content: [
      "A finales de 1542, Copérnico sufrió un derrame cerebral que lo dejó paralizado de un lado del cuerpo y muy debilitado. Mientras tanto, en Nuremberg, el libro avanzaba página a página en la imprenta de Petreius. Copérnico, a cientos de kilómetros de distancia en Frombork, no pudo revisar las pruebas finales ni enterarse a tiempo de que se había añadido el prólogo anónimo de Osiander.",
      "La historia más conocida sobre sus últimos días procede de una carta escrita por Tiedemann Giese a Rheticus en julio de 1543. En ella, Giese contaba que Copérnico había perdido la memoria y la lucidez muchos días antes, y que solo vio su obra completa en su último aliento, el mismo día de su muerte, el 24 de mayo de 1543. Es una de las escenas más conmovedoras de la historia de la ciencia.",
      "Los historiadores discuten cuánto pudo comprender Copérnico en ese momento. Probablemente las hojas impresas le llegaron cuando ya estaba muy enfermo y casi inconsciente. Pero la escena tiene un valor simbólico enorme: el hombre que había dedicado décadas a una idea se despidió del mundo justo cuando esa idea comenzaba su propio viaje por las bibliotecas y universidades de Europa.",
      "El libro incluía, además de la dedicatoria a Pablo III, una carta del cardenal Nikolaus von Schönberg, fechada en Roma el 1 de noviembre de 1536. En ella, el cardenal decía haber oído hablar de la teoría de Copérnico y le pedía que le enviara una copia de su trabajo. Copérnico la incluyó como prueba de que personas importantes de la Iglesia se habían interesado por su sistema con respeto.",
      "En la dedicatoria, Copérnico explicaba que había dudado mucho en publicar por miedo a ser ridiculizado por la novedad y aparente absurdo de su idea. Contaba que sus amigos, entre ellos Giese y Schönberg, lo animaron a dar el paso. También advertía que, si algún charlatán sin conocimientos matemáticos intentaba atacarlo usando pasajes de las Escrituras mal interpretados, él despreciaría ese juicio."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Durante siglos no se supo dónde estaba enterrado exactamente Copérnico. En 2005, arqueólogos polacos encontraron restos bajo el suelo de la catedral de Frombork. En 2008 se compararon con cabellos hallados en un libro que perteneció a Copérnico, guardado en Suecia, y el análisis de ADN mostró coincidencias. En 2010 sus restos fueron enterrados de nuevo con una ceremonia solemne." },
      { label: "Dato Científico", icon: "atom", text: "Con los restos hallados en Frombork, expertos de la policía científica polaca hicieron una reconstrucción forense del rostro de Copérnico a partir del cráneo. El resultado mostró a un hombre de unos 70 años con la nariz rota y una cicatriz sobre uno de los ojos, detalles que coinciden con algunos retratos de la época. La ciencia moderna ayudó así a confirmar datos de la historia." }
    ],
    fact: "Además de astrónomo, Copérnico fue médico, administrador y economista. En 1526 escribió un tratado sobre la moneda, donde explicó que cuando circulan monedas de buena y mala calidad con el mismo valor oficial, la gente guarda las buenas y gasta las malas. Esta observación se conoce hoy como ley de Gresham o de Copérnico-Gresham, y todavía se estudia en economía.",
  },
  {
    id: "revolutionibus-tablas-prutenicas",
    bannerImage: '/assets/copernico/infographic_m3/banner_revolutionibus-tablas-prutenicas.webp',
    bannerCaption: "En 1551 Erasmus Reinhold publicó las Tablas Prutenicas, calculadas con los parámetros de Copérnico, que reemplazaron a las alfonsinas.",
    title: "Las Tablas Prutenicas",
    color: '#7E7650',
    btnImage: '/assets/copernico/infographic_m3/btn_revolutionibus-tablas-prutenicas.webp',
    image: '/assets/copernico/infographic_m3/hero_revolutionibus-tablas-prutenicas.webp',
    content: [
      "Para los astrónomos del siglo XVI, lo más útil de un libro como De revolutionibus no eran las ideas filosóficas, sino la posibilidad de predecir dónde estarían los planetas en cualquier fecha. Para eso se usaban tablas astronómicas: listas de números que, con algunos cálculos, daban las posiciones del Sol, la Luna y los planetas. El libro de Copérnico incluía tablas de movimientos medios, pero no eran fáciles de usar.",
      "Las tablas más usadas en Europa antes de Copérnico eran las Tablas Alfonsinas, preparadas en el siglo XIII en la corte del rey Alfonso X el Sabio, en Castilla, a partir del modelo de Ptolomeo. Habían servido durante casi trescientos años, pero sus errores se iban acumulando y las predicciones de eclipses y posiciones planetarias se desviaban cada vez más de lo que se observaba en el cielo.",
      "En 1551, el astrónomo Erasmus Reinhold, profesor en Wittenberg y colega de Rheticus, publicó un nuevo conjunto de tablas calculadas a partir de los modelos y parámetros de De revolutionibus. Las llamó Tabulae Prutenicae, es decir, Tablas Prutenicas o Prusianas, en honor a su mecenas, el duque Alberto de Prusia, que financió el trabajo. Rápidamente se convirtieron en la referencia de los astrónomos europeos.",
      "Aunque a menudo se habla de ellas como las tablas del libro de Copérnico, en realidad fueron una obra derivada: Reinhold rehízo los cálculos, corrigió algunos detalles y presentó los resultados de forma práctica. Curiosamente, él no defendió públicamente que la Tierra se moviera; usaba el sistema como herramienta de cálculo. Gracias a él, los números de Copérnico llegaron a navegantes, astrólogos, médicos y fabricantes de calendarios.",
      "Las Tablas Prutenicas fueron una mejora frente a las alfonsinas en muchos casos, aunque no eran perfectas, porque seguían basadas en órbitas circulares. Hacia 1563, el joven Tycho Brahe observó un acercamiento de Júpiter y Saturno y comprobó que ambas tablas fallaban: las alfonsinas por casi un mes y las prutenicas por algunos días. Esa experiencia lo convenció de que hacían falta observaciones mucho más precisas."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Las Tablas Alfonsinas, que las prutenicas desplazaron, nacieron en Toledo, España, donde Alfonso X reunió a astrónomos cristianos, judíos y musulmanes. Se basaban en tradiciones griegas y árabes y fueron usadas en toda Europa durante siglos. Copérnico tenía en su biblioteca una edición impresa de esas tablas, que estudió con atención durante su formación." },
      { label: "Dato Científico", icon: "atom", text: "Las Tablas Prutenicas fueron sustituidas en 1627 por las Tablas Rudolfinas de Johannes Kepler, basadas en las órbitas elípticas y en las observaciones de Tycho Brahe. Con ellas, Kepler predijo que Mercurio pasaría por delante del Sol en noviembre de 1631, y el astrónomo francés Pierre Gassendi lo observó desde París. Fue la primera vez que alguien vio un tránsito de Mercurio." }
    ],
    fact: "La utilidad práctica fue el camino por el que el sistema de Copérnico entró en la vida diaria de Europa. Muchos almanaques y calendarios del siglo XVI se calcularon con las Tablas Prutenicas, aunque sus autores no creyeran que la Tierra se movía. La historia muestra que una buena teoría puede ganar aceptación primero por sus resultados, y solo después por sus ideas.",
  },
  {
    id: "revolutionibus-indice-y-legado",
    bannerImage: '/assets/copernico/infographic_m3/banner_revolutionibus-indice-y-legado.webp',
    bannerCaption: "En 1616, setenta y tres años después de publicarse, el libro quedó suspendido hasta ser corregido; salió del Índice en 1835.",
    title: "El Índice de 1616 y el libro que sí se leyó",
    color: '#55707A',
    btnImage: '/assets/copernico/infographic_m3/btn_revolutionibus-indice-y-legado.webp',
    image: '/assets/copernico/infographic_m3/hero_revolutionibus-indice-y-legado.webp',
    content: [
      "Durante sus primeras décadas, De revolutionibus no provocó una condena oficial. Se leía, se discutía y se usaba para calcular, tanto en universidades católicas como protestantes. La situación cambió a comienzos del siglo XVII, cuando Galileo Galilei, con sus observaciones telescópicas desde 1610, empezó a defender abiertamente que el sistema de Copérnico describía la realidad. El debate dejó de ser técnico y se convirtió en un asunto público y religioso.",
      "El 5 de marzo de 1616, la Congregación del Índice de la Iglesia Católica publicó un decreto que suspendía el libro de Copérnico «hasta que fuera corregido». Habían pasado setenta y tres años desde su publicación en 1543. En 1620 se publicaron las correcciones exigidas: cambiar unas pocas frases para que el movimiento de la Tierra apareciera solo como hipótesis matemática, tal como había hecho el prólogo de Osiander.",
      "El conflicto se agravó en 1633, cuando Galileo fue juzgado por la Inquisición en Roma por su libro Diálogo sobre los dos máximos sistemas del mundo, publicado el año anterior. Fue obligado a retractarse y pasó el resto de su vida bajo arresto domiciliario. La prohibición general de los libros que enseñaban el movimiento de la Tierra se levantó en 1758, y la obra de Copérnico desapareció de la edición del Índice de 1835.",
      "Durante mucho tiempo se dijo que De revolutionibus fue «el libro que nadie leyó», porque era muy técnico. El historiador Owen Gingerich decidió comprobarlo y pasó unos treinta años examinando ejemplares de la primera y segunda edición por todo el mundo, unos 600 en total. Descubrió que muchos estaban llenos de notas en los márgenes escritas por astrónomos que lo habían estudiado con mucho cuidado.",
      "Entre los ejemplares anotados hay copias que pertenecieron a Kepler, Galileo y otros astrónomos importantes. Gingerich publicó sus hallazgos en un censo detallado en 2002 y en un libro divulgativo en 2004, titulado precisamente The Book Nobody Read. Su conclusión fue clara: el libro de Copérnico sí se leyó, y con gran atención, por las personas que construyeron la nueva astronomía de los siglos XVI y XVII."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "En su censo, Gingerich encontró que muchos ejemplares que circulaban en Italia fueron corregidos a mano siguiendo las instrucciones de 1620, tachando o cambiando las frases señaladas. En cambio, la mayoría de los ejemplares en países como Francia o España quedaron sin modificar. Esas marcas permiten estudiar hoy dónde y con qué rigor se aplicó la censura en cada región de Europa." },
      { label: "Dato Científico", icon: "atom", text: "Las notas en los márgenes de los ejemplares revelan qué partes interesaban más a los astrónomos. La mayoría de las anotaciones aparecen en los capítulos técnicos sobre los movimientos de la Luna y los planetas, no en el Libro I con la idea heliocéntrica. Eso muestra que los primeros lectores valoraban sobre todo los modelos matemáticos y los parámetros para calcular posiciones." }
    ],
    fact: "En 1992, el papa Juan Pablo II, nacido en Polonia como Copérnico, reconoció oficialmente los errores cometidos en el caso de Galileo, tras el trabajo de una comisión de estudio creada en 1981. Hoy el nombre de Copérnico está en un cráter de la Luna, en un asteroide y en el elemento químico copernicio, número atómico 112, nombrado en 2010 en su honor.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradCopernicoM3)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#7C6A55", "#5F7484", "#6B7E5E", "#8A5F5F", "#6A6280", "#7E7650", "#55707A"];
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
          <linearGradient id="gradCopernicoM3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,168,67,0.2)" />
            <stop offset="50%" stopColor="rgba(212,168,67,0.9)" />
            <stop offset="100%" stopColor="rgba(212,168,67,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A843" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL LIBRO QUE MOVIÓ LA TIERRA</text>
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
          layoutId="activeDotCopernicoM3"
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
export default function InteractiveInfographic_CopernicoM3() {
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
              🏆 Nuremberg, 1543: seis libros, un prólogo polémico y una idea que cambió la ciencia
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
