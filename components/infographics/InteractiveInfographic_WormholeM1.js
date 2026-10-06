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
  "Einstein, A., & Rosen, N. (1935). The Particle Problem in the General Theory of Relativity. Physical Review, 48(1), 73-77.",
  "Misner, C. W., & Wheeler, J. A. (1957). Classical physics as geometry. Annals of Physics, 2(6), 525-603.",
  "Fuller, R. W., & Wheeler, J. A. (1962). Causality and Multiply Connected Space-Time. Physical Review, 128(2), 919-929.",
  "Lamoreaux, S. K. (1997). Demonstration of the Casimir Force in the 0.6 to 6 μm Range. Physical Review Letters, 78(1), 5-8.",
  "Visser, M. (1995). Lorentzian Wormholes: From Einstein to Hawking. AIP Press.",
  "Thorne, K. S. (1994). Black Holes and Time Warps: Einstein's Outrageous Legacy. W. W. Norton & Company."
];

const INFOGRAPHIC_NODES = [
  {
    id: "espacio-tiempo-curvo",
    bannerImage: '/assets/wormhole/infographic_m1/banner_espacio-tiempo-curvo.webp',
    bannerCaption: "En 1915 Einstein presentó la relatividad general: la gravedad es la curvatura del espacio-tiempo causada por la masa y la energía.",
    title: "El espacio-tiempo que se curva",
    color: '#5F6F8A',
    btnImage: '/assets/wormhole/infographic_m1/btn_espacio-tiempo-curvo.webp',
    image: '/assets/wormhole/infographic_m1/hero_espacio-tiempo-curvo.webp',
    content: [
      "Para entender qué es un agujero de gusano primero hay que cambiar nuestra idea de la gravedad. Durante más de dos siglos, la explicación más aceptada fue la de Isaac Newton: la gravedad era una fuerza invisible que atraía los objetos entre sí. En 1915, Albert Einstein propuso algo muy distinto con su teoría de la relatividad general. Según Einstein, la masa y la energía curvan el espacio y el tiempo, y esa curvatura es lo que percibimos como gravedad. Los planetas no son «jalados»: siguen el camino más recto posible en un espacio curvo.",
      "Einstein unió las tres dimensiones del espacio (largo, ancho y alto) con el tiempo en una sola estructura de cuatro dimensiones llamada espacio-tiempo. Una forma sencilla de imaginarlo es una cama elástica: si colocas una bola de boliche en el centro, la tela se hunde, y una canica lanzada cerca girará alrededor de la bola en lugar de seguir recta. La analogía tiene límites, porque el espacio-tiempo real no se hunde «hacia abajo» en ninguna dirección, pero ayuda a visualizar cómo la masa deforma el escenario del universo.",
      "Una teoría así debía comprobarse. Einstein predijo que la luz de las estrellas se desviaría al pasar cerca del Sol, porque también ella sigue la curvatura del espacio-tiempo. El 29 de mayo de 1919, durante un eclipse total de Sol, expediciones británicas organizadas por Frank Dyson y Arthur Eddington fotografiaron estrellas cercanas al borde del Sol desde la isla de Príncipe, en África, y desde Sobral, en Brasil. Las posiciones aparentes de las estrellas habían cambiado de forma muy parecida a lo que Einstein había calculado.",
      "La relatividad general también afirma que el tiempo pasa más despacio cerca de objetos muy masivos. En la Tierra el efecto es diminuto, pero real: los relojes de los satélites del sistema GPS, que orbitan a unos 20,000 kilómetros de altura, se adelantan unos 38 microsegundos al día respecto a los del suelo si se suman todos los efectos relativistas. Si los ingenieros no corrigieran esa diferencia, la posición que marca tu teléfono acumularía errores de varios kilómetros cada día.",
      "Si la masa puede curvar un poco el espacio-tiempo, ¿podría curvarlo muchísimo? Las ecuaciones de Einstein describen todo tipo de geometrías posibles, algunas muy extrañas: regiones de las que ni la luz escapa, como los agujeros negros, o estructuras que conectarían dos lugares lejanos mediante un atajo. Estas últimas son los agujeros de gusano. Es importante recordarlo desde el principio: son objetos teóricos. Aparecen en las matemáticas, pero hasta hoy nadie ha observado ninguno en el universo."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Einstein tardó cerca de diez años en completar la relatividad general. Tuvo que aprender una rama de las matemáticas llamada geometría diferencial, que estudia superficies y espacios curvos, y para ello contó con la ayuda de su amigo el matemático Marcel Grossmann. Las ecuaciones finales, que presentó en noviembre de 1915 ante la Academia Prusiana de Ciencias, son tan compactas que pueden escribirse en una sola línea." },
      { label: "Dato Científico", icon: "atom", text: "Una de las primeras grandes pruebas de la relatividad general fue la órbita de Mercurio. El punto de su órbita más cercano al Sol, llamado perihelio, se desplaza lentamente con los siglos. La física de Newton no explicaba del todo ese desplazamiento: faltaban unos 43 segundos de arco por siglo. En 1915, Einstein calculó con su nueva teoría justo esa diferencia, y contó después que la emoción le provocó palpitaciones." }
    ],
    fact: "La desviación de la luz que buscaba la expedición de 1919 era de unos 1.75 segundos de arco para una estrella que se viera rozando el borde del Sol. Un segundo de arco es una fracción diminuta de grado: equivale aproximadamente al tamaño aparente de una moneda de dos centímetros vista a unos cuatro kilómetros de distancia. Medir algo tan pequeño con placas fotográficas fue un logro enorme.",
  },
  {
    id: "puente-einstein-rosen-1935",
    bannerImage: '/assets/wormhole/infographic_m1/banner_puente-einstein-rosen-1935.webp',
    bannerCaption: "En 1935 Albert Einstein y Nathan Rosen publicaron en Physical Review la solución hoy conocida como puente de Einstein-Rosen.",
    title: "1935: el puente de Einstein y Rosen",
    color: '#7A6E8C',
    btnImage: '/assets/wormhole/infographic_m1/btn_puente-einstein-rosen-1935.webp',
    image: '/assets/wormhole/infographic_m1/hero_puente-einstein-rosen-1935.webp',
    content: [
      "Muy poco después de que Einstein publicara sus ecuaciones, el astrónomo alemán Karl Schwarzschild encontró la primera solución exacta. Lo hizo a comienzos de 1916, mientras servía como soldado en el frente ruso durante la Primera Guerra Mundial. Su solución describe el espacio-tiempo alrededor de una masa esférica, como una estrella, y contiene una frontera especial que hoy llamamos horizonte de sucesos: la superficie de un agujero negro, de la que nada puede salir. Schwarzschild murió ese mismo año a causa de una enfermedad.",
      "También en 1916, el físico austriaco Ludwig Flamm estudió la solución de Schwarzschild y notó algo curioso: la geometría podía interpretarse como un embudo que no terminaba en un punto, sino que se abría hacia otra región del espacio. Fue una de las primeras pistas matemáticas de que el espacio-tiempo podía tener algo parecido a un túnel. Sin embargo, en aquella época casi nadie le prestó atención, porque los físicos todavía intentaban entender qué significaban realmente esas soluciones tan extrañas.",
      "En 1935, Einstein y su joven colaborador Nathan Rosen, que trabajaban en el Instituto de Estudios Avanzados de Princeton, en Estados Unidos, publicaron un artículo titulado «El problema de las partículas en la teoría general de la relatividad». A partir de la solución de Schwarzschild, describieron dos «hojas» de espacio-tiempo idénticas unidas por un puente. Esa estructura es la que hoy llamamos puente de Einstein-Rosen, y se considera la primera descripción matemática rigurosa de un agujero de gusano.",
      "Curiosamente, Einstein y Rosen no buscaban un atajo para viajar por el universo. Querían resolver otro problema: en las ecuaciones aparecían singularidades, puntos donde los valores se vuelven infinitos y la física deja de tener sentido. Einstein pensaba que una buena teoría no debía contener infinitos, y propusieron que las partículas elementales, como el electrón, podrían ser pequeños puentes en el espacio-tiempo. Esa idea no logró explicar las partículas, pero dejó como herencia el concepto del puente.",
      "¿Cómo se representa un puente de Einstein-Rosen? Los físicos usan un «diagrama de inmersión»: imaginan una sola rebanada del espacio como si fuera una superficie de goma. Lejos del puente, la superficie es casi plana; al acercarse, se curva formando un embudo que se estrecha hasta una cintura mínima y luego se abre de nuevo en otro embudo idéntico. Esa cintura es la parte más estrecha del puente. Es un dibujo para ayudar a la imaginación, no una fotografía de algo real."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Nathan Rosen nació en Brooklyn, Nueva York, en 1909, y tenía unos 25 años cuando trabajó con Einstein en Princeton. Poco después, por recomendación de Einstein, pasó un tiempo trabajando en la Universidad de Kiev. Años más tarde se trasladó a Israel, donde ayudó a fundar el instituto de física del Technion, en Haifa, y continuó investigando sobre relatividad general durante el resto de su carrera." },
      { label: "Dato Científico", icon: "atom", text: "En la solución de Schwarzschild hay dos lugares problemáticos. Uno es el horizonte de sucesos, que en ciertas coordenadas parece una singularidad, pero en realidad no lo es: un viajero que cayera no notaría nada especial al cruzarlo. El otro está en el centro y es una singularidad verdadera, donde la curvatura se vuelve infinita. Distinguir ambos casos llevó a los físicos varias décadas de trabajo." }
    ],
    fact: "El radio de Schwarzschild indica el tamaño que tendría un objeto si toda su masa se comprimiera hasta formar un agujero negro. Para el Sol sería de unos 3 kilómetros, y para la Tierra, de apenas unos 9 milímetros, como una canica pequeña. Por eso hacen falta densidades tan enormes para crear un agujero negro, y por eso los puentes de Einstein-Rosen aparecen ligados a estos objetos extremos.",
  },
  {
    id: "wheeler-nombre-agujero-gusano",
    bannerImage: '/assets/wormhole/infographic_m1/banner_wheeler-nombre-agujero-gusano.webp',
    bannerCaption: "El físico estadounidense John Archibald Wheeler acuñó en 1957 el término «wormhole», que en español llamamos agujero de gusano.",
    title: "John Wheeler y el nombre «agujero de gusano»",
    color: '#6E8A7F',
    btnImage: '/assets/wormhole/infographic_m1/btn_wheeler-nombre-agujero-gusano.webp',
    image: '/assets/wormhole/infographic_m1/hero_wheeler-nombre-agujero-gusano.webp',
    content: [
      "Durante veinte años, el puente de Einstein-Rosen fue una curiosidad matemática casi olvidada. Todo cambió con John Archibald Wheeler, físico estadounidense de la Universidad de Princeton. Wheeler estaba convencido de que la geometría del espacio-tiempo podía explicar gran parte de la física, una idea que llamó geometrodinámica. En 1957, en un artículo escrito con su alumno Charles Misner, usó la palabra inglesa «wormhole», que en español traducimos como agujero de gusano.",
      "El nombre viene de una imagen muy sencilla. Imagina una hormiga que camina sobre la superficie de una manzana para ir de un lado al otro: tiene que recorrer media vuelta alrededor de la fruta. En cambio, un gusano que ha perforado la manzana puede atravesarla por dentro y llegar mucho antes. El túnel del gusano es un atajo. Del mismo modo, un agujero de gusano en el espacio-tiempo sería un camino más corto entre dos puntos que, por el espacio normal, están muy separados.",
      "Wheeler tenía una idea muy original sobre estos túneles. Imaginó que las líneas de un campo eléctrico podrían entrar por una boca de un agujero de gusano y salir por la otra. Visto desde fuera, una boca parecería tener carga positiva y la otra carga negativa, aunque en realidad no hubiera ninguna partícula cargada: solo geometría. Llamó a esto «carga sin carga». Aunque la propuesta no se confirmó, muestra cómo Wheeler usaba los agujeros de gusano para pensar sobre la naturaleza de la materia.",
      "Wheeler tenía talento para inventar nombres memorables. Además de «agujero de gusano», popularizó en 1967 el término «agujero negro» para unos objetos que antes se describían como estrellas colapsadas o «congeladas». También fue un gran maestro: entre sus estudiantes de doctorado estuvieron Richard Feynman, futuro premio Nobel, y Kip Thorne, quien décadas después estudiaría si un agujero de gusano podría atravesarse. Sus clases inspiraron a varias generaciones de físicos.",
      "Un buen nombre puede cambiar la historia de una idea. «Puente de Einstein-Rosen» sonaba técnico y lejano; «agujero de gusano» era fácil de recordar y despertaba la imaginación. A partir de entonces, la expresión pasó de los artículos científicos a los libros de divulgación, las novelas y las películas de ciencia ficción. Pero detrás del nombre llamativo hay una pregunta científica muy seria: ¿qué permite y qué prohíbe la relatividad general sobre la forma del espacio-tiempo?"
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Wheeler trabajó también en física nuclear. En 1939 publicó con el danés Niels Bohr un artículo fundamental que explicaba cómo se divide el núcleo de un átomo pesado como el uranio, el proceso llamado fisión. Fue una figura que conectó varias épocas de la física: conversó con Einstein, colaboró con Bohr y formó a científicos que luego estudiaron agujeros negros y ondas gravitacionales." },
      { label: "Dato Científico", icon: "atom", text: "La topología es la rama de las matemáticas que estudia las propiedades de las formas que no cambian al estirarlas o doblarlas sin romperlas. Para un topólogo, una taza con asa y una dona son «la misma forma», porque ambas tienen exactamente un agujero. Un agujero de gusano cambia la topología del espacio: le añade una especie de asa que conecta dos regiones, algo que el espacio normal no tiene." }
    ],
    fact: "Wheeler resumió la relatividad general con una frase famosa: «El espacio-tiempo le dice a la materia cómo moverse; la materia le dice al espacio-tiempo cómo curvarse». En solo dos ideas explica que la masa deforma el espacio-tiempo y que esa deformación guía el movimiento de planetas, estrellas y luz, y que, en teoría, también determina la forma que tendría un agujero de gusano.",
  },
  {
    id: "anatomia-bocas-y-garganta",
    bannerImage: '/assets/wormhole/infographic_m1/banner_anatomia-bocas-y-garganta.webp',
    bannerCaption: "Un agujero de gusano teórico tendría dos bocas esféricas conectadas por un conducto estrecho llamado garganta.",
    title: "Anatomía de un agujero de gusano",
    color: '#8A7A5F',
    btnImage: '/assets/wormhole/infographic_m1/btn_anatomia-bocas-y-garganta.webp',
    image: '/assets/wormhole/infographic_m1/hero_anatomia-bocas-y-garganta.webp',
    content: [
      "Aunque nunca se ha visto ninguno, los físicos describen con precisión las partes que tendría un agujero de gusano. La primera son las bocas, es decir, las entradas. En nuestro espacio de tres dimensiones no se verían como un hoyo en el suelo ni como un círculo plano, sino como esferas. Si pudieras acercarte a una, verías en su superficie una imagen distorsionada del lugar al que conduce, como si miraras a través de una bola de cristal que muestra otro rincón del universo.",
      "La segunda parte es la garganta, el conducto que une las dos bocas. Es la zona más estrecha del túnel y la más importante para su estabilidad, porque ahí la curvatura del espacio-tiempo es más intensa. Su longitud podría ser muy corta, de apenas unos metros, aunque las bocas estuvieran separadas por distancias enormes en el espacio normal. Esa es la clave del atajo: la distancia medida por dentro del túnel no tiene por qué parecerse a la distancia medida por fuera.",
      "La analogía más usada es una hoja de papel. Dibuja un punto A en un extremo y un punto B en el otro: si caminas sobre la hoja, debes recorrer todo el largo. Ahora dobla la hoja hasta que A quede justo encima de B y atraviésalos con un lápiz. El agujero que deja el lápiz es como un agujero de gusano: conecta A y B por un camino diminuto. Eso sí, el universo no necesita «doblarse» dentro de otro espacio para que esto ocurra; las matemáticas lo describen sin necesidad de un espacio exterior.",
      "Las ecuaciones permiten dos tipos de conexiones. En un agujero de gusano «intrauniverso», las dos bocas estarían en nuestro mismo universo, separadas quizá por años luz. En uno «interuniverso», conectarían nuestro universo con otro completamente separado, como las dos hojas del puente de Einstein-Rosen original. Este segundo tipo es todavía más especulativo, porque no conocemos ninguna forma de comprobar si existen otros universos. La ciencia distingue con cuidado entre lo que se calcula y lo que se observa.",
      "¿Qué sentiría alguien cerca de una boca? Dependería del tamaño y de la forma del agujero de gusano. En los muy curvados aparecerían fuerzas de marea: la gravedad tiraría con distinta intensidad de la cabeza y de los pies, estirando el cuerpo. Es el mismo tipo de efecto que hace que la Luna provoque las mareas en los océanos de la Tierra. Un túnel útil para viajar tendría que ser lo bastante grande y de curvatura suave como para que esas fuerzas no dañaran a los viajeros."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Un agujero de gusano funcionaría como una lente gigante. La luz que atraviesa la garganta desde el otro lado se curvaría, de modo que la boca mostraría el cielo del lugar de destino, deformado y comprimido hacia los bordes. Algunos astrónomos han propuesto buscar agujeros de gusano precisamente por la forma peculiar en que desviarían la luz de estrellas y galaxias lejanas que pasan por detrás." },
      { label: "Dato Científico", icon: "atom", text: "Los físicos describen la forma del espacio-tiempo con una herramienta llamada métrica. La métrica es una fórmula que indica cómo calcular distancias y tiempos entre puntos muy cercanos. En un espacio plano basta con el teorema de Pitágoras; en un espacio curvo, la métrica cambia de un lugar a otro. Cada tipo de agujero de gusano corresponde a una métrica distinta que debe cumplir las ecuaciones de Einstein." }
    ],
    fact: "Las fuerzas de marea dependen de la diferencia de gravedad entre dos puntos cercanos. Junto a un agujero negro pequeño, de pocas veces la masa del Sol, serían tan intensas que estirarían a una persona como un fideo, efecto que los físicos llaman espaguetización. En cambio, en el horizonte de los agujeros negros gigantescos que hay en el centro de las galaxias, las mareas serían mucho más suaves.",
  },
  {
    id: "puente-que-se-cierra",
    bannerImage: '/assets/wormhole/infographic_m1/banner_puente-que-se-cierra.webp',
    bannerCaption: "En 1962 Robert Fuller y John Wheeler mostraron que el puente de Einstein-Rosen se cierra antes de que incluso la luz pueda cruzarlo.",
    title: "Un puente que se cierra demasiado rápido",
    color: '#7F5F6E',
    btnImage: '/assets/wormhole/infographic_m1/btn_puente-que-se-cierra.webp',
    image: '/assets/wormhole/infographic_m1/hero_puente-que-se-cierra.webp',
    content: [
      "Durante un tiempo se soñó con que el puente de Einstein-Rosen pudiera servir como túnel. Pero en 1962 Robert Fuller y John Wheeler estudiaron cómo cambia ese puente con el tiempo, y encontraron una mala noticia: el puente no es estático. Se abre, alcanza un tamaño máximo y se estrangula de nuevo, tan deprisa que ni siquiera un rayo de luz tendría tiempo de cruzarlo de un lado al otro. Cualquier viajero que lo intentara quedaría atrapado y terminaría en una singularidad.",
      "La razón es que el puente de Einstein-Rosen se encuentra escondido dentro de un agujero negro. Para llegar a él habría que cruzar un horizonte de sucesos, y una vez dentro, todos los caminos posibles conducen hacia la singularidad, nunca de vuelta. Por eso se dice que este tipo de agujero de gusano es «no atravesable». Las matemáticas lo permiten como forma del espacio-tiempo, pero nada que tenga masa, ni siquiera la luz, podría usarlo para ir de una boca a la otra.",
      "Los físicos distinguen entonces entre dos grandes familias. Los agujeros de gusano no atravesables, como el puente original, se colapsan o están ocultos tras horizontes. Los atravesables serían túneles que permanecen abiertos el tiempo suficiente para que una nave o un rayo de luz entre por una boca y salga por la otra. No tendrían horizontes que atraparan al viajero, y su garganta debería mantenerse estable. El gran reto es descubrir qué haría falta para conseguir lo segundo.",
      "El problema de fondo es que la gravedad de la materia normal siempre atrae. Si llenas la garganta de un túnel con materia o energía ordinaria, su propia gravedad tiende a cerrarla, igual que las paredes de un globo desinflado que se juntan. Para mantener la garganta abierta haría falta algo que actuara al revés, que empujara las paredes hacia fuera: una especie de gravedad repulsiva. En la relatividad general, eso solo es posible con una forma de energía muy poco común.",
      "Los físicos resumen el comportamiento de la materia ordinaria con unas reglas llamadas condiciones de energía. Una de ellas dice, en términos sencillos, que la densidad de energía medida por cualquier observador nunca es negativa. Toda la materia de la vida diaria las cumple: rocas, agua, aire o estrellas. Los cálculos muestran que un agujero de gusano atravesable necesita violar alguna de estas condiciones en su garganta. Por eso su existencia depende de algo que la física cotidiana nunca nos muestra."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "Si se extienden por completo las matemáticas de un agujero negro sin rotación ni carga eléctrica, aparecen dos universos y dos tipos de región: un agujero negro, del que nada sale, y un agujero blanco, en el que nada puede entrar. Los agujeros blancos son soluciones válidas de las ecuaciones de Einstein, pero no existe ninguna evidencia de que se formen realmente en la naturaleza." },
      { label: "Dato Científico", icon: "atom", text: "Dentro del horizonte de un agujero negro ocurre algo sorprendente: los papeles del espacio y del tiempo se intercambian. Así como fuera nadie puede evitar avanzar hacia el futuro, dentro nadie puede evitar avanzar hacia el centro. La singularidad deja de ser un lugar del que alejarse y se convierte en un momento del futuro, imposible de esquivar. Por eso nadie llega a cruzar el puente antes de que se estrangule." }
    ],
    fact: "Incluso una nave capaz de viajar a la velocidad de la luz vería cómo el puente de Einstein-Rosen se cierra antes de llegar al otro lado. Esta conclusión fue importante porque separó claramente la ciencia de la fantasía: un agujero negro normal no es una puerta hacia otro lugar del universo, y lanzarse dentro de uno sería un viaje sin regreso.",
  },
  {
    id: "materia-exotica-efecto-casimir",
    bannerImage: '/assets/wormhole/infographic_m1/banner_materia-exotica-efecto-casimir.webp',
    bannerCaption: "En 1948 Hendrik Casimir predijo que dos placas metálicas muy juntas en el vacío se atraen; el efecto se midió con precisión en 1997.",
    title: "Materia exótica y el efecto Casimir",
    color: '#5F7F8A',
    btnImage: '/assets/wormhole/infographic_m1/btn_materia-exotica-efecto-casimir.webp',
    image: '/assets/wormhole/infographic_m1/hero_materia-exotica-efecto-casimir.webp',
    content: [
      "Para sostener un agujero de gusano atravesable haría falta lo que los físicos llaman materia exótica: un material hipotético con densidad de energía negativa. Suena extraño, porque en la vida diaria toda la energía es positiva o cero. La masa de una manzana, el calor del Sol o el movimiento de una bicicleta son energía positiva. Una densidad de energía negativa significaría tener «menos que nada» en una región del espacio. Y, sin embargo, la física cuántica dice que esto puede ocurrir, al menos en cantidades minúsculas.",
      "La clave está en el vacío. Para la física clásica, el vacío es un espacio completamente vacío. Para la mecánica cuántica, en cambio, el vacío está lleno de fluctuaciones: los campos que forman la naturaleza, como el campo electromagnético, nunca están perfectamente quietos. Siempre conservan una pequeña energía mínima, llamada energía del punto cero. Es como un mar que, incluso en completa calma, mantiene diminutas ondulaciones en su superficie.",
      "En 1948, el físico neerlandés Hendrik Casimir, que trabajaba en los laboratorios de la empresa Philips, hizo una predicción sorprendente. Si colocas dos placas metálicas sin carga, paralelas y muy juntas en el vacío, entre ellas solo caben algunas de esas ondulaciones del campo electromagnético, mientras que fuera caben todas. Como resultado, la presión del vacío desde fuera es mayor que desde dentro, y las placas se empujan una hacia la otra. Este fenómeno se conoce como efecto Casimir.",
      "Durante décadas fue muy difícil medirlo, porque la fuerza es pequeñísima. En 1997, el físico estadounidense Steve Lamoreaux logró medirla con precisión usando una placa y una lente esférica separadas por distancias de micrómetros, y al año siguiente Umar Mohideen y Anushree Roy confirmaron el resultado con mayor exactitud. Las mediciones coincidían con la teoría. Entre las placas, la energía del vacío es menor que la del vacío normal: en ese sentido, es energía negativa a pequeña escala.",
      "¿Significa esto que podemos fabricar un agujero de gusano? Por desgracia, no. La energía negativa del efecto Casimir es diminuta y solo aparece en espacios muy estrechos. Los cálculos indican que mantener abierto un túnel por el que pasara una persona requeriría cantidades enormes de energía negativa, concentradas en una garganta muy delgada. Además, la física cuántica parece imponer límites a cuánta energía negativa puede acumularse y durante cuánto tiempo. Es una puerta teórica entreabierta, no un plano de construcción."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "El efecto Casimir no es solo una curiosidad teórica: preocupa a los ingenieros que fabrican máquinas microscópicas, llamadas MEMS, como los sensores que detectan la orientación de los teléfonos móviles. Cuando dos piezas diminutas quedan muy cerca, la fuerza de Casimir puede hacer que se peguen entre sí y dejen de funcionar. Algunos laboratorios estudian cómo reducirla o incluso aprovecharla en nanotecnología." },
      { label: "Dato Científico", icon: "atom", text: "La fuerza de Casimir crece muy rápido al acercar las placas: si la distancia se reduce a la mitad, la presión se multiplica por dieciséis. Con placas separadas por un micrómetro, la presión es de apenas una milésima de pascal, muchísimo menor que la del aire que nos rodea. Pero si la separación baja a unos 10 nanómetros, la presión llega a ser comparable a la de toda la atmósfera terrestre al nivel del mar." }
    ],
    fact: "Algunas estimaciones teóricas indican que un agujero de gusano con una garganta de alrededor de un metro necesitaría una cantidad de energía negativa equivalente, en valor absoluto, a una masa del orden de la del planeta Júpiter, concentrada en una capa delgadísima. Las cifras exactas dependen del modelo, pero todas apuntan a lo mismo: está muy lejos de cualquier tecnología imaginable hoy.",
  },
  {
    id: "espuma-cuantica-escala-planck",
    bannerImage: '/assets/wormhole/infographic_m1/banner_espuma-cuantica-escala-planck.webp',
    bannerCaption: "La longitud de Planck, de unos 1.6 × 10⁻³⁵ metros, es la escala en la que el espacio-tiempo podría volverse «espumoso».",
    title: "Agujeros de gusano diminutos: la espuma cuántica",
    color: '#6E6E7F',
    btnImage: '/assets/wormhole/infographic_m1/btn_espuma-cuantica-escala-planck.webp',
    image: '/assets/wormhole/infographic_m1/hero_espuma-cuantica-escala-planck.webp',
    content: [
      "Si los agujeros de gusano existieran de forma natural, ¿de qué tamaño serían? John Wheeler propuso en la década de 1950 una idea fascinante: a escalas extremadamente pequeñas, el espacio-tiempo no sería liso, sino agitado y burbujeante por los efectos cuánticos. Lo llamó espuma cuántica. En esa espuma podrían aparecer y desaparecer constantemente agujeros de gusano diminutos, como las burbujas que se forman y revientan en la superficie de un vaso de refresco.",
      "La escala de esa espuma sería la longitud de Planck, de aproximadamente 1.6 × 10⁻³⁵ metros. Es una cifra difícil de imaginar: un protón, una de las piezas del núcleo de los átomos, mide alrededor de 10⁻¹⁵ metros, y la longitud de Planck es unas cien trillones de veces más pequeña. Si un protón se agrandara hasta tener el tamaño de la Tierra, la longitud de Planck, agrandada en la misma proporción, seguiría siendo unas mil veces más pequeña que un átomo.",
      "La longitud de Planck se obtiene combinando tres constantes fundamentales de la naturaleza: la velocidad de la luz, la constante de gravitación de Newton y la constante de Planck de la física cuántica. Representa la escala en la que la gravedad y los efectos cuánticos serían igual de importantes. Allí, la relatividad general, que describe lo muy grande, y la mecánica cuántica, que describe lo muy pequeño, dejan de funcionar juntas, y haría falta una teoría de gravedad cuántica que todavía no tenemos.",
      "Algunos científicos se han preguntado si una civilización muy avanzada podría tomar uno de esos agujeros de gusano microscópicos y agrandarlo hasta un tamaño útil. En teoría habría que estirar una estructura de 10⁻³⁵ metros hasta varios metros, multiplicando su tamaño por un número de 35 cifras, y mantenerla abierta con energía negativa. Nadie sabe cómo hacerlo, ni siquiera si es posible. Por ahora es un experimento mental que ayuda a explorar los límites de las leyes físicas.",
      "Entonces, ¿existen los agujeros de gusano? La respuesta honesta es que no lo sabemos. No hay ninguna observación que confirme su existencia, y la espuma cuántica sigue siendo una hipótesis. Al mismo tiempo, ninguna ley fundamental conocida los prohíbe por completo: las ecuaciones de Einstein los permiten si existe la materia exótica adecuada. Esa combinación de posibilidad matemática y falta de pruebas es lo que los convierte en uno de los temas más apasionantes de la física teórica."
    ],
    expandables: [
      { label: "¿Sabías que...?", icon: "sparkles", text: "La constante de Planck lleva el nombre del físico alemán Max Planck, quien en 1900 propuso que la luz se emite en pequeños paquetes de energía, más tarde llamados cuantos. Fue el inicio de la mecánica cuántica. Un año antes, en 1899, Planck había propuesto un sistema de unidades naturales basado en constantes fundamentales, del que surgen la longitud y el tiempo de Planck." },
      { label: "Dato Científico", icon: "atom", text: "El tiempo de Planck es lo que tarda la luz en recorrer una longitud de Planck: unos 5.4 × 10⁻⁴⁴ segundos. Según nuestras teorías actuales, es el intervalo más corto con sentido físico. Los cosmólogos llaman «era de Planck» al instante inicial del universo, más breve que ese tiempo, del que todavía no podemos afirmar casi nada con seguridad porque nos falta una teoría de gravedad cuántica." }
    ],
    fact: "Los aceleradores de partículas más potentes, como el Gran Colisionador de Hadrones del CERN, exploran distancias de alrededor de 10⁻¹⁹ a 10⁻²⁰ metros. Para llegar directamente a la longitud de Planck harían falta energías unas mil billones de veces mayores. Por eso los físicos buscan pistas indirectas de la gravedad cuántica en el cosmos, en lugar de esperar alcanzarla en un laboratorio.",
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
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#gradWormholeM1)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ["#5F6F8A", "#7A6E8C", "#6E8A7F", "#8A7A5F", "#7F5F6E", "#5F7F8A", "#6E6E7F"];
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
          <linearGradient id="gradWormholeM1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(159,179,200,0.2)" />
            <stop offset="50%" stopColor="rgba(159,179,200,0.9)" />
            <stop offset="100%" stopColor="rgba(159,179,200,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#9FB3C8" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ATAJOS EN EL ESPACIO-TIEMPO</text>
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
          layoutId="activeDotWormholeM1"
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
export default function InteractiveInfographic_WormholeM1() {
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
              🏆 Cómo nació la idea del agujero de gusano y qué haría falta para abrirlo
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
