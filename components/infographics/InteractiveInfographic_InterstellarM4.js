'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Interstellar themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoBlackHole({ size = 70, color = '#F4A261', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="1" />
      {/* Accretion disk lines */}
      <path d="M 5 30 Q 30 15 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 5 30 Q 30 45 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoSpacetimeGrid({ size = 70, color = '#4FC3F7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Curved grid mimicking a gravity well */}
      <path d="M10 10 Q30 30 50 10" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M10 25 Q30 40 50 25" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M10 40 Q30 50 50 40" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      
      <path d="M10 10 Q30 30 10 50" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M25 10 Q40 30 25 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M40 10 Q50 30 40 50" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoWaveRipple({ size = 80, color = '#7C4DFF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <path d="M0 20 Q 10 5, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M0 20 Q 10 10, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M0 20 Q 10 15, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}

function DecoOrbit({ size = 70, color = '#00BCD4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(30 30 30)" />
      <ellipse cx="30" cy="30" rx="25" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(-30 30 30)" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.8" />
      <circle cx="50" cy="18" r="2" fill={color} opacity="1" />
      <circle cx="10" cy="42" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoEqualSign({ size = 70, color = '#FF6B35', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      <text x="5" y="32" fill={color} fontSize="22" fontWeight="bold" fontFamily="serif" opacity="0.6">GÎ¼Î½=8Ï€TÎ¼Î½</text>
      <circle cx="62" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="55" cy="18" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'puente-einstein-rosen': [DecoBlackHole, DecoSpacetimeGrid, DecoOrbit],'hoja-doblada': [DecoSpacetimeGrid, DecoWaveRipple, DecoEqualSign],'wormhole-saturno': [DecoOrbit, DecoBlackHole, DecoSpacetimeGrid],'materia-exotica': [DecoWaveRipple, DecoSpacetimeGrid, DecoEqualSign],'morris-thorne': [DecoEqualSign, DecoBlackHole, DecoOrbit],
  'dimensiones-extra': [DecoSpacetimeGrid, DecoWaveRipple, DecoBlackHole],'viaje-posible': [DecoOrbit, DecoEqualSign, DecoSpacetimeGrid],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Einstein, A., Rosen, N. (1935). "The Particle Problem in the General Theory of Relativity", Physical Review, 48(1)',
  'Morris, M.S., Thorne, K.S. (1988). "Wormholes in Spacetime and Their Use for Interstellar Travel", American Journal of Physics, 56(5)',
  'Maldacena, J., Susskind, L. (2013). "Cool Horizons for Entangled Black Holes", Fortschritte der Physik, 61(9)',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "puente-einstein-rosen",
    diagramImage: '/assets/interstellar/infographic_m4/diagram_puente-einstein-rosen.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Puente de Einstein y Rosen',
    "bannerImage": "/assets/interstellar/infographic_m4/banner_puente-einstein-rosen.webp",
    "title": "El Puente de Einstein y Rosen",
    "color": "#4FC3F7",
    "btnImage": "/assets/interstellar/infographic_m4/btn_puente.webp",
    "image": "/assets/interstellar/infographic_m4/hero_puente.webp",
    "content": [
      "En 1935, Albert Einstein y su colaborador Nathan Rosen publicaron un artículo histórico en la revista Physical Review explorando las consecuencias geométricas de la relatividad general. Al intentar formular un modelo para partículas elementales cargadas sin singularidades infinitas, descubrieron una solución matemática que conectaba dos regiones separadas del espaciotiempo a través de un túnel curvo. Esta estructura matemática fue bautizada originalmente como puente de Einstein-Rosen en la literatura académica.",
      "El puente surge al extender analíticamente la métrica de Schwarzschild a través de las coordenadas de Kruskal-Szekeres. Desde el punto de vista topológico, esta solución une dos universos paralelos o dos puntos distantes de nuestro propio cosmos mediante una garganta tubular simétrica. En el centro de esta conexión, el espacio no se estrecha hasta un punto infinitesimal, sino que forma una cintura de radio finito que une ambas bocas del túnel en un tejido continuo y unificado sin discontinuidades.",
      "A pesar de su elegancia geométrica, los físicos John Wheeler y Robert Fuller demostraron en 1962 que el puente clásico de Einstein-Rosen es intrínsecamente no transitable. La garganta del puente se abre y se cierra con tanta rapidez que ni siquiera un rayo de luz que viaje a trescientos mil kilómetros por segundo tendría tiempo suficiente para atravesarlo de extremo a extremo. Cualquier partícula que intente cruzar queda atrapada en el colapso gravitatorio antes de alcanzar la boca de salida.",
      "El colapso de este túnel ocurre porque la propia gravedad de la masa-energía tiende a estrangular el cuello del espaciotiempo. Según las ecuaciones de Einstein, la gravedad es siempre atractiva cuando actúa sobre materia ordinaria con densidad de energía positiva. Esta atracción gravitatoria convergente aprieta las paredes de la garganta hasta convertirlas en dos singularidades desconectadas de tipo Schwarzschild, transformando el puente en dos agujeros negros impenetrables para un viajero.",
      "Aunque el puente de Einstein-Rosen original no sirve como medio de transporte interestelar, sentó los cimientos matemáticos de la física de los agujeros de gusano transitables. Demostró que las ecuaciones de la gravedad permiten soluciones topológicamente no triviales donde el espacio puede conectarse consigo mismo a través de atajos intergalácticos. Este concepto abrió una nueva era en la exploración teórica de la estructura global del cosmos y los límites de la causalidad universal."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Cuando la tripulación del Endurance se aproxima al agujero de gusano cerca de Saturno, Romilly utiliza una hoja de papel y un lápiz para explicar la geometría a Cooper. Christopher Nolan basó esta célebre escena en una conversación real con Kip Thorne: el puente no es un agujero plano bidimensional en el vacío, sino una esfera tridimensional que refleja la luz del cosmos lejano, permitiendo ver la otra galaxia como si se mirase a través de una lente de cristal esférica flotante."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En 2013, el físico argentino Juan Maldacena y Leonard Susskind propusieron la conjetura ER=EPR, que establece una equivalencia fundamental entre los puentes de Einstein-Rosen (ER) y el entrelazamiento cuántico de la paradoja Einstein-Podolsky-Rosen (EPR). Esta hipótesis revolucionaria sugiere que dos partículas entrelazadas cuánticamente están unidas a nivel microscópico por un diminuto agujero de gusano de escala de Planck, uniendo la relatividad con la física cuántica en una sola teoría."
      }
    ],
    "fact": "El término «agujero de gusano» (wormhole) fue acuñado en 1957 por el eminente físico teórico estadounidense John Archibald Wheeler en un artículo sobre geometrodinámica publicado en Annals of Physics. Wheeler utilizó la analogía de una manzana: para un gusano que desea ir de un lado a otro del fruto, cavar un túnel a través del corazón de la manzana requiere mucha menos distancia y tiempo que recorrer arrastrándose toda la superficie exterior curva de la piel."
  },
  {
    "id": "hoja-doblada",
    diagramImage: '/assets/interstellar/infographic_m4/diagram_hoja-doblada.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Doblar el Universo',
    "bannerImage": "/assets/interstellar/infographic_m4/banner_hoja-doblada.webp",
    "title": "Doblar el Universo",
    "color": "#FF6B35",
    "btnImage": "/assets/interstellar/infographic_m4/btn_hoja.webp",
    "image": "/assets/interstellar/infographic_m4/hero_hoja.webp",
    "content": [
      "La manera más intuitiva de comprender cómo un agujero de gusano acorta distancias colosales es mediante la analogía de la hoja doblada. Si dibujamos dos puntos distantes en los extremos opuestos de un papel, una hormiga que camine en línea recta sobre la superficie deberá recorrer toda la longitud de la página. Sin embargo, si doblamos la hoja por la mitad a través de una dimensión superior y perforamos el papel con un lápiz, ambos puntos quedan instantáneamente en contacto directo y contiguo.",
      "En nuestro universo tridimensional, el tejido del espaciotiempo actúa exactamente como esa superficie bidimensional de papel. Las distancias astronómicas entre galaxias abarcan millones de años luz, lo que haría imposible que una nave espacial construida por el ser humano las recorra en una escala de tiempo biológica humana. No obstante, si el espacio tridimensional se curva dentro de una dimensión superior llamada hiperespacio o bulto (bulk), dos puntos cósmicos distantes pueden aproximarse geométricamente.",
      "La teoría de la relatividad general de Albert Einstein demuestra matemáticamente que la masa y la energía no se limitan a residir dentro del espacio, sino que dictan cómo este debe deformarse y curvarse. Cuando una inmensa concentración de masa-energía deforma el espacio, altera las geodésicas, que son las trayectorias más cortas posibles para la luz y la materia. Un agujero de gusano altera drásticamente esta topología, creando una geodésica atajo que evita tener que atravesar el espacio intermedio.",
      "Esta deformación no requiere que la nave viaje más rápido que la luz dentro de su entorno local, lo que violaría la relatividad especial. Al atravesar la garganta del agujero de gusano, la nave navega a velocidades sublumínicas ordinarias respecto a su marco de referencia inercial inmediato. Es el propio tejido del espaciotiempo el que se ha plegado a su alrededor, permitiendo que un trayecto de miles de millones de kilómetros se complete en cuestión de minutos de tiempo propio a bordo de la cápsula.",
      "La comprensión geométrica del espaciotiempo plegado ha transformado la cosmología moderna, demostrando que la distancia física no es una propiedad fija e inmutable del cosmos, sino un parámetro elástico dependiente del tensor de energía-impulso. Los físicos teóricos continúan estudiando si estas topologías plegadas podrían haberse originado de manera natural durante la inflación cósmica primordial tras el Big Bang, dejando túneles fósiles esparcidos por la inmensidad del universo observable."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La escena donde Romilly perfora el papel con un bolígrafo para instruir a Cooper es uno de los momentos de divulgación científica más aclamados del cine contemporáneo. Christopher Nolan explicó que concibió esta analogía visual para desarmar la preconcepción popular del público, que imaginaba un agujero cósmico como un disco plano o un embudo bidimensional. Al doblar la hoja, Nolan logró transmitir con absoluta claridad cómo una entrada esférica en 3D conduce directamente a otra región del cosmos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En matemáticas y relatividad general, una topología no trivial describe un espacio que contiene conexiones múltiples o atajos que no pueden reducirse continuamente a un espacio plano mediante deformaciones suaves. El puente de Einstein-Rosen y los agujeros de gusano de Morris-Thorne modifican el primer grupo de homología del espacio, permitiendo que existan trayectorias cerradas no contraíbles que conectan regiones que de otro modo estarían separadas por horizontes cosmológicos inalcanzables."
      }
    ],
    "fact": "La distancia real entre la Tierra y la galaxia de Gargantúa en Interstellar es de aproximadamente diez mil millones de años luz. Viajando en una nave espacial impulsada por fusión nuclear a un diez por ciento de la velocidad de la luz, el trayecto lineal habría requerido cien mil millones de años terrestres. Gracias a la curvatura geométrica del agujero de gusano de Saturno, la nave Endurance cruzó esa inmensidad insalvable en menos de cinco minutos de tiempo propio medido por sus tripulantes."
  },
  {
    "id": "wormhole-saturno",
    diagramImage: '/assets/interstellar/infographic_m4/diagram_wormhole-saturno.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Agujero de Gusano de Saturno',
    "bannerImage": "/assets/interstellar/infographic_m4/banner_wormhole-saturno.webp",
    "title": "El Agujero de Gusano de Saturno",
    "color": "#7C4DFF",
    "btnImage": "/assets/interstellar/infographic_m4/btn_saturno.webp",
    "image": "/assets/interstellar/infographic_m4/hero_saturno.webp",
    "content": [
      "En la trama científica de Interstellar, un misterioso agujero de gusano aparece de forma súbita orbitando en las inmediaciones del planeta Saturno, a mil cuatrocientos millones de kilómetros de la Tierra. Este fenómeno gravitacional fue detectado por primera vez casi cinco décadas antes de la misión Endurance mediante perturbaciones gravitatorias anómalas en las órbitas de las lunas saturnianas, sugiriendo la presencia de una masa esférica concentrada sin emisión térmica convencional perceptible.",
      "La elección de Saturno como ubicación del agujero de gusano no fue una decisión azarosa de los guionistas, sino el resultado de un riguroso análisis astrodinámico realizado por Kip Thorne. Para que una nave espacial tripulada alcance el portal utilizando tecnología de propulsión química e iónica en un tiempo razonable de dos años, necesitaba aprovechar la asistencia gravitatoria de planetas gigantes gaseosos como Marte y Júpiter, optimizando las ventanas de lanzamiento orbital de la mecánica celeste.",
      "Desde el exterior, el agujero de gusano no parece una boca oscura como un agujero negro, sino una esfera perfectamente reflectante y transparente al mismo tiempo. Al ser una apertura tridimensional de un túnel cuatridimensional, la boca del agujero refleja y refracta la luz de todo el cosmos circundante. La mitad superior de la esfera refleja las estrellas de la Vía Láctea y los anillos de Saturno, mientras que su interior revela un cielo completamente ajeno: la galaxia distante que aguarda al otro lado.",
      "El equipo de efectos visuales de Double Negative simuló la aproximación visual al agujero calculando las geodésicas de la luz en la métrica de Morris-Thorne. A medida que la Endurance se acerca a la superficie esférica, la imagen de Saturno se deforma en anillos de Einstein concéntricos y resplandores iridiscentes. Justo en el momento del cruce, la distorsión gravitatoria alcanza su clímax y la nave penetra en el túnel hiperespacial sin experimentar aceleraciones destructivas en sus estructuras.",
      "La presencia del agujero en el sistema solar plantea preguntas fundamentales sobre su estabilidad y origen. En el libro «The Science of Interstellar», Thorne explica que un agujero de gusano natural de ese tamaño colapsaría instantáneamente sin una ingeniería avanzada que lo mantenga abierto. Su mera existencia cerca de Saturno representaba una prueba irrefutable de que una civilización superior tetradimensional, apodada «Ellos», había colocado deliberadamente el artefacto para ofrecer una vía de escape."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Durante el rodaje del cruce del agujero de gusano, Christopher Nolan proyectó las complejas simulaciones físicas de Thorne y Double Negative en pantallas masivas que rodeaban la cabina de la nave Ranger. Los actores Matthew McConaughey y David Gyasi reaccionaron visualmente ante las imágenes reales del espacio plegado deformándose a su alrededor. Esta técnica de iluminación práctica confirió a la secuencia un hiperrealismo físico que los fondos verdes de posproducción digital nunca habrían podido igualar."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La boca del agujero de gusano de Saturno fue modelada con un radio de un kilómetro y una longitud de garganta finita. Debido al efecto de lente gravitacional negativo de la garganta, la esfera produce una imagen virtual comprimida de todo el universo en su borde, conocida como anillo de Einstein externo. Los fotones que ingresan en ángulos rasantes pueden dar múltiples vueltas alrededor de la garganta antes de emerger, creando imágenes concéntricas infinitas de la nave que intenta ingresar."
      }
    ],
    "fact": "La sonda espacial Cassini de la NASA necesitó siete años para viajar desde Cabo Cañaveral hasta Saturno entre 1997 y 2004, recorriendo tres mil quinientos millones de kilómetros tras efectuar sobrevuelos de asistencia gravitacional con Venus, la Tierra y Júpiter. La nave Endurance en la película completó el mismo trayecto interplanetario en dos años terrestres gracias a motores de propulsión de plasma alimentados por reactores de fisión compactos de alta eficiencia energética."
  },
  {
    "id": "materia-exotica",
    diagramImage: '/assets/interstellar/infographic_m4/diagram_materia-exotica.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Materia Imposible',
    "bannerImage": "/assets/interstellar/infographic_m4/banner_materia-exotica.webp",
    "title": "La Materia Imposible",
    "color": "#F44336",
    "btnImage": "/assets/interstellar/infographic_m4/btn_exotica.webp",
    "image": "/assets/interstellar/infographic_m4/hero_exotica.webp",
    "content": [
      "La relatividad general impone una condición rigurosa para la existencia de agujeros de gusano transitables: la necesidad imperativa de materia exótica. A diferencia de la materia ordinaria que compone las estrellas, planetas y seres vivos, la materia exótica posee una propiedad asombrosa y contraria al sentido común cotidiano: una densidad de energía negativa y una presión de tensión negativa que repele gravitatoriamente en lugar de atraer, impidiendo que el túnel colapse sobre sí mismo.",
      "En la física teórica clásica, el tensor de energía-impulso obedece varias condiciones de energía, tales como la condición de energía nula (NEC) y la condición de energía débil (WEC). Estas condiciones estipulan que ningún observador físico puede medir una densidad de energía inferior a cero. Sin embargo, para mantener abierta la garganta de un agujero de gusano, las paredes del túnel deben ser empujadas hacia afuera con una fuerza antigravitatoria constante, lo que exige una violación formal de estas condiciones.",
      "Sorprendentemente, la mecánica cuántica admite situaciones reales donde surgen densidades de energía negativas a nivel microscópico. El ejemplo experimental más contundente es el efecto Casimir, predicho por el físico holandés Hendrik Casimir en 1948 y confirmado en laboratorio en 1997. Cuando dos placas metálicas conductoras neutras se colocan en el vacío separadas por distancias nanométricas, suprimen ciertas longitudes de onda del campo electromagnético cuántico, creando una presión negativa entre ellas.",
      "El dilema fundamental radica en la escala y la magnitud de la energía requerida. Mientras que el efecto Casimir genera fuerzas negativas infinitesimales en fracciones de micra, mantener abierto un agujero de gusano del tamaño de un kilómetro como el de Saturno exigiría una cantidad colosal de energía negativa, equivalente a la masa completa de varios planetas como Júpiter convertida íntegramente en tensión exótica, una proeza energética que supera por órdenes de magnitud nuestra tecnología actual.",
      "Los físicos teóricos exploran si la materia exótica podría ser estabilizada mediante condensados cuánticos de campos escalares o fluctuaciones de energía del vacío inflacionario primigenio. Aunque no sabemos cómo sintetizar o recolectar esta sustancia a escala macroscópica, su compatibilidad con las leyes de la electrodinámica cuántica demuestra que los agujeros de gusano no violan la física fundamental, permaneciendo como fascinantes posibilidades teóricas en la frontera del conocimiento humano."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Kip Thorne explicó a Christopher Nolan que la humanidad del siglo veintiuno carecía por completo de la capacidad para manipular materia exótica y crear un agujero de gusano artificial. Por esta razón científica concluyente, la trama de Interstellar atribuye la creación y estabilización del portal a una civilización hiperavanzada de seres tetradimensionales que dominan la gravedad cuántica y son capaces de tejer filamentos de energía negativa en el espacio tridimensional de nuestro universo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En 1997, el físico Steve Lamoreaux logró medir por primera vez el efecto Casimir con una precisión del cinco por ciento en la Universidad de Washington utilizando un péndulo de torsión ultrasensible. Los resultados demostraron que el vacío cuántico no es un espacio inerte, sino un mar hirviente de partículas virtuales donde la energía puede reducirse localmente por debajo del estado fundamental del vacío, confirmando la existencia real de densidades de energía cuántica negativas en la naturaleza."
      }
    ],
    "fact": "Para mantener abierta la garganta de un agujero de gusano de un metro de diámetro apto para una pequeña sonda espacial, los cálculos del físico Matt Visser indican que se necesitaría una masa de energía negativa equivalente a menos una masa solar (aproximadamente -2 × 10³⁰ kilogramos) concentrada en una vaina microscópica alrededor del cuello del túnel, una densidad de tensión repulsiva equivalente a miles de millones de presiones atómicas centrales."
  },
  {
    "id": "morris-thorne",
    diagramImage: '/assets/interstellar/infographic_m4/diagram_morris-thorne.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Wormhole que Puedes Cruzar',
    "bannerImage": "/assets/interstellar/infographic_m4/banner_morris-thorne.webp",
    "title": "El Wormhole que Puedes Cruzar",
    "color": "#26A69A",
    "btnImage": "/assets/interstellar/infographic_m4/btn_morris.webp",
    "image": "/assets/interstellar/infographic_m4/hero_morris.webp",
    "content": [
      "A mediados de la década de 1980, el afamado astrónomo Carl Sagan estaba escribiendo su célebre novela de ciencia ficción «Contacto» y necesitaba un método físicamente plausible para transportar a su protagonista, la doctora Ellie Arroway, a través de decenas de años luz sin violar la teoría de la relatividad. Sagan recurrió a su amigo y colega Kip Thorne en Caltech, preguntándole si las leyes de la física permitían construir un agujero de gusano que un ser humano pudiera cruzar sin morir en el intento.",
      "Intrigado por el desafío intelectual de Sagan, Kip Thorne y su talentoso estudiante de doctorado Mike Morris comenzaron a calcular la solución exacta de las ecuaciones de campo de Einstein hacia atrás. En lugar de partir de una distribución conocida de materia y calcular la curvatura resultante, definieron primero las propiedades geométricas deseables de un túnel transitable: sin horizontes de sucesos unidireccionales, sin singularidades letales y con fuerzas de marea tolerables para el cuerpo humano.",
      "El resultado de esta rigurosa investigación fue publicado en 1988 en la prestigiosa revista American Journal of Physics bajo el título «Wormholes in spacetime and their use for interstellar travel». La métrica de Morris-Thorne describió por primera vez en la historia de la ciencia un agujero de gusano estático, esférico y transitable en ambas direcciones. Demostraron que el viaje era bidireccional y que una tripulación podía cruzarlo en minutos sin experimentar aceleraciones destructivas.",
      "No obstante, el estudio de Morris y Thorne confirmó matemáticamente que para mantener abierta la garganta del túnel e impedir su colapso instantáneo, se requería inevitablemente la presencia de materia exótica con tensión negativa a lo largo de la garganta. Sin esta fuerza de repulsión gravitatoria que contrarreste la tendencia natural del espaciotiempo a cerrarse, el túnel se transformaría en dos agujeros negros en una fracción de milisegundo, aniquilando a cualquier viajero en su interior.",
      "El trabajo pionero de Morris y Thorne fundó formalmente el campo moderno de la física de los agujeros de gusano transitables, inspirando cientos de investigaciones teóricas posteriores sobre viajes temporales, topología espaciotemporal y termodinámica cuántica. Al conectar la rigurosidad matemática con la imaginación científica, demostraron que la investigación teórica rigurosa puede expandir los horizontes de lo que consideramos posible en las leyes fundamentales del cosmos."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El diseño cinemático del agujero de gusano en Interstellar es la encarnación visual directa de la métrica matemática de Morris-Thorne formulada en 1988. Kip Thorne entregó a los programadores de Double Negative un conjunto de ecuaciones diferenciales que describían con exactitud milimétrica la curvatura del espaciotiempo y la trayectoria de los fotones a través de la garganta, logrando que el portal de la película fuera un modelo físico ejecutable y computable de nivel académico internacional."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las fuerzas de marea tolerables en la métrica de Morris-Thorne exigen que la aceleración diferencial experimentada por un cuerpo humano entre la cabeza y los pies no supere una gravedad terrestre (1 g ≈ 9.8 m/s²). Para satisfacer este criterio biológico estricto en un viaje de travesía de diez minutos a través de la garganta, el radio de curvatura del túnel debe medir como mínimo un kilómetro, evitando que el viajero sufra daños fisiológicos o rotura de tejidos durante el tránsito interestelar."
      }
    ],
    "fact": "El artículo fundacional de Mike Morris y Kip Thorne de 1988 no solo inauguró la investigación formal de los agujeros de gusano transitables, sino que demostró que, si una boca del agujero de gusano se acelera a velocidades relativistas y luego regresa junto a la otra boca estacionaria, la dilatación temporal de Einstein transformaría automáticamente el túnel en una máquina del tiempo cerrada que viola la causalidad cronológica clásica."
  },
  {
    "id": "dimensiones-extra",
    diagramImage: '/assets/interstellar/infographic_m4/diagram_dimensiones-extra.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Más Allá de Tres Dimensiones',
    "bannerImage": "/assets/interstellar/infographic_m4/banner_dimensiones-extra.webp",
    "title": "Más Allá de Tres Dimensiones",
    "color": "#AB47BC",
    "btnImage": "/assets/interstellar/infographic_m4/btn_dimensiones.webp",
    "image": "/assets/interstellar/infographic_m4/hero_dimensiones.webp",
    "content": [
      "Vivimos en un universo donde nuestros sentidos perciben tres dimensiones espaciales perceptibles (longitud, anchura y altura) complementadas por una cuarta dimensión temporal unidireccional. Sin embargo, para que un agujero de gusano conecte dos puntos distantes mediante un pliegue geométrico sin desgarrar el tejido que habitamos, la relatividad general y la física teórica moderna sugieren que nuestro universo tridimensional debe estar inmerso dentro de un espacio de dimensión superior denominado el bulto (bulk).",
      "Desde la perspectiva de la física de altas dimensiones, nuestro universo observable es una membrana o brana tridimensional que flota en un hiperespacio de cinco dimensiones físicas. Las partículas subatómicas de la materia ordinaria, tales como los quarks, los electrones y los fotones electromagnéticos, están atadas a la superficie de nuestra brana y no pueden escapar de ella, lo que explica por qué nuestros ojos y detectores no pueden observar directamente las dimensiones suplementarias circundantes.",
      "En contraste con la materia y la luz electromagnética, la gravedad es una manifestación geométrica pura de la curvatura del propio tejido espaciotemporal. Según los modelos cosmológicos propuestos por los físicos Lisa Randall y Raman Sundrum en 1999, los gravitones, que son las partículas mediadoras de la interacción gravitatoria, no tienen restricciones para viajar a través del bulto tetradimensional. Esto explica por qué la fuerza de la gravedad parece tan débil en comparación con el electromagnetismo.",
      "Esta capacidad única de la gravedad para propagarse a través de dimensiones adicionales es lo que hace posible la existencia de un agujero de gusano. Una civilización que domine la física pentadimensional podría manipular los campos gravitatorios en el bulto para doblar nuestra brana tridimensional, acercando dos regiones galácticas distantes y perforando una garganta de espaciotiempo que actúe como un canal transitable a través del hiperespacio cósmico sin tocar el espacio intermedio.",
      "La exploración teórica de las dimensiones adicionales representa una de las avenidas más prometedoras para unificar la relatividad general de Albert Einstein con la mecánica cuántica del modelo estándar. En los grandes aceleradores de partículas como el Gran Colisionador de Hadrones (LHC) del CERN en Ginebra, los científicos buscan microagujeros negros o pérdidas de energía infinitesimales que delaten el escape de gravitones hacia dimensiones ocultas, abriendo una ventana al hiperespacio."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En Interstellar, los misteriosos seres apodados «Ellos» que abren el agujero de gusano en Saturno y construyen el teseracto son, en realidad, descendientes humanos hiperavanzados que han evolucionado hasta dominar las cinco dimensiones del espaciotiempo. Christopher Nolan y Kip Thorne concibieron a estos seres no como extraterrestres biológicos distantes, sino como humanos del futuro lejano capaces de percibir el tiempo y el espacio como dimensiones físicas navegables en el bulto hiperespacial."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En 1921, el matemático alemán Theodor Kaluza propuso que la introducción de una cuarta dimensión espacial compactada permitía unificar las ecuaciones de la relatividad de Einstein con el electromagnetismo de James Clerk Maxwell. En 1926, el físico sueco Oskar Klein perfeccionó esta idea demostrando que la dimensión extra podía estar enrollada en un círculo diminuto del orden de la longitud de Planck (10⁻³⁵ metros), volviéndola completamente invisible para nuestros sentidos e instrumentos."
      }
    ],
    "fact": "El modelo cosmológico de Randall-Sundrum demostró en 1999 que las dimensiones espaciales extra no necesitan ser infinitesimalmente pequeñas como postulaba Kaluza-Klein, sino que podrían ser infinitamente extensas si el espaciotiempo del bulto posee una curvatura negativa tipo anti-de Sitter, confinando eficazmente a las partículas y fuerzas conocidas a nuestra propia membrana tridimensional excepto a los gravitones libres."
  },
  {
    "id": "viaje-posible",
    diagramImage: '/assets/interstellar/infographic_m4/diagram_viaje-posible.webp',
    diagramCaption: 'Ilustración científica e histórica sobre ¿Podremos Cruzar Algún Día?',
    "bannerImage": "/assets/interstellar/infographic_m4/banner_viaje-posible.webp",
    "title": "¿Podremos Cruzar Algún Día?",
    "color": "#FF9800",
    "btnImage": "/assets/interstellar/infographic_m4/btn_viaje.webp",
    "image": "/assets/interstellar/infographic_m4/hero_viaje.webp",
    "content": [
      "La pregunta sobre si la humanidad podrá construir o atravesar un agujero de gusano en el futuro trasciende las páginas de la ciencia ficción para situarse en el centro de los debates sobre las leyes fundamentales del cosmos. Aunque las ecuaciones de la relatividad general de Albert Einstein demuestran formalmente que los túneles transitables son soluciones matemáticas válidas, la realización práctica de semejante hazaña enfrenta desafíos tecnológicos y energéticos verdaderamente titánicos.",
      "El primer obstáculo insalvable para nuestra tecnología actual es la generación y estabilización de la materia exótica con energía negativa requerida para mantener abierta la garganta. La humanidad apenas comienza a medir fluctuaciones cuánticas del vacío en laboratorios con precisiones de nanogramos, mientras que un portal requeriría masas planetarias de energía negativa estabilizada. Además, aún desconocemos si la materia exótica a escala macroscópica es termodinámicamente estable en la naturaleza.",
      "El segundo dilema concierne a la conjetura de protección cronológica propuesta por el eminente físico teórico Stephen Hawking en 1992. Hawking argumentó que las leyes de la física conspiran activamente para impedir el viaje en el tiempo y la violación del principio de causalidad. Dado que cualquier agujero de gusano transitable puede transformarse potencialmente en una máquina del tiempo mediante dilataciones relativistas, las fluctuaciones de vacío cuántico podrían amplificarse destruyendo el túnel.",
      "A pesar de estas objeciones severas, investigaciones recientes en gravedad cuántica y teoría de cuerdas han abierto ventanas de esperanza teórica. En 2017, los físicos Ping Gao, Daniel Jafferis y Aron Wall demostraron que los agujeros de gusano pueden volverse transitables de manera natural sin necesidad de materia exótica exógena si se permite una interacción cuántica directa de entrelazamiento entre las dos bocas del túnel, transmitiendo información de forma análoga a la teletransportación cuántica.",
      "Aunque el sueño de cruzar un agujero de gusano a bordo de una nave como el Endurance pertenezca a un futuro lejano de una civilización de Tipo III en la escala de Kardashev, el estudio teórico de estos atajos espaciales ya rinde frutos invaluables en el presente. Nos obliga a investigar la frontera última entre la geometría clásica del cosmos y el misterioso reino cuántico, guiando a las futuras generaciones de jóvenes científicos hacia la codiciada unificación de todas las fuerzas universales."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Al final de la misión interestelar, tras enviar los datos cuánticos desde el teseracto a Murph y permitir el despegue de las estaciones espaciales de la humanidad, Cooper toma una nave monoplaza para reunirse con Amelia Brand en el planeta Edmunds. La película sugiere que la comprensión completa de la gravedad cuántica abre la puerta para que la humanidad manipule el espaciotiempo a su voluntad, transformando los atajos dimensionales en rutas seguras de colonización y supervivencia cósmica."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El protocolo de Gao-Jafferis-Wall formulado en 2017 reveló que el viaje a través de un agujero de gusano cuánticamente transitable obedece a las leyes del procesamiento de información cuántica. Sin embargo, este mecanismo tiene un límite riguroso: el tiempo que tarda una partícula en atravesar el túnel es siempre ligeramente mayor al tiempo que tardaría un rayo de luz en viajar por el espacio exterior convencional circundante, preservando inviolable la causalidad relativista universal."
      }
    ],
    "fact": "El físico soviético Nikolai Kardashev propuso en 1964 una escala para medir el grado de evolución tecnológica de una civilización según su consumo de energía. Una civilización de Tipo I domina la energía de su planeta; una de Tipo II, la de su estrella completa; y una de Tipo III, la de toda su galaxia. Manipular la topología del espaciotiempo para crear agujeros de gusano permanentes requeriría el poderío energético de una civilización de Tipo III, millones de años por delante de nuestra era actual."
  }
];

// â”€â”€â”€ Gargantua Video Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <video autoPlay muted loop playsInline
        poster="/assets/interstellar/gargantua_bg.jpg"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="https://drive.usercontent.google.com/download?id=1mor0WdE_0ycWM6X54VHqc9A8I2_J_GH6&export=download&authuser=0" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
    </div>
  );
}

// â”€â”€â”€ Interstellar Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4FC3F7','#FF6B35','#7C4DFF','#F44336','#26A69A','#AB47BC','#FF9800'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central hole icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FF6B35" opacity="0.5" />
        <ellipse cx="300" cy="30" rx="18" ry="6" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="0.6" transform="rotate(20 300 30)" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,107,53,0.2)" />
            <stop offset="50%" stopColor="rgba(79,195,247,0.9)" />
            <stop offset="100%" stopColor="rgba(255,107,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">AGUJEROS DE GUSANO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">ATAJOS CÓSMICOS</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        width: '116px',
        height: '116px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(79,195,247,0.2)'}`,
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
        fontSize: '0.86rem', fontWeight: 700, letterSpacing:'0.3px',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.3s',
        maxWidth: '128px',
        textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeDotInterstellar"
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

// â”€â”€â”€ Expandable Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        whileHover={{ backgroundColor: `${color}15` }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem', border: 'none', background: 'transparent',
          color: '#fff', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: `${color}20`, padding: '0.4rem', borderRadius: '8px',
            color: color, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <IconComp size={18} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '0.5px' }}>{item.label}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
          <ChevronDown size={20} color={color} />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{ padding: '0 1.25rem 1.25rem 1.25rem' }}>
              <motion.div
                variants={dirVariants} initial="hidden" animate="visible"
                custom={dir} transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                style={{
                  background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '1.25rem',
                  borderLeft: `4px solid ${color}`,
                  color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.7,
                }}
              >
                {item.text}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterstellarM4() {
  const [activeNodeId, setActiveNodeId] = useState(INFOGRAPHIC_NODES[0].id);
  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const DecoSVGs = DECO_MAP[activeNodeId] || [];

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0a0c1e',
      color: '#fff',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <InterstellarBackground />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        <InterstellarHeader />

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          padding: '2rem',
          background: 'rgba(10,12,30,0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNodeId === node.id}
              onClick={() => setActiveNodeId(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNodeId}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{
              background: 'rgba(15,18,40,0.85)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              border: `1px solid ${activeNode.color}30`,
              overflow: 'hidden',
              boxShadow: `0 30px 60px rgba(0,0,0,0.6), inset 0 0 40px ${activeNode.color}10`,
            }}
          >
            {/* Hero Layout: 1fr 1fr */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: '280px',
              borderBottom: `1px solid ${activeNode.color}20`,
            }}>
              <div style={{ padding: '3rem 3rem 2rem 3rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
                  {DecoSVGs.map((Deco, i) => <Deco key={i} color={activeNode.color} size={50} />)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeNode.btnImage} alt="avatar" style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: `2px solid ${activeNode.color}`, objectFit: 'cover'
                  }}  loading="lazy" />
                  <h2 style={{
                    fontSize: '2.4rem',
                    fontWeight: 800,
                    margin: 0,
                    background: `linear-gradient(135deg, #fff, ${activeNode.color})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1,
                  }}>
                    {activeNode.title}
                  </h2>
                </div>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4rem 1rem', borderRadius: '20px',
                  background: `${activeNode.color}15`, border: `1px solid ${activeNode.color}40`,
                  color: activeNode.color, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px',
                  textTransform: 'uppercase', marginBottom: '2rem'
                }}>
                  <Star size={14} /> Módulo 4: Agujeros de Gusano
                </div>

                <div style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '1.1rem', lineHeight: 1.8, marginBottom:'2rem',
                }}>
                  {activeNode.content[0]}
                </div>
              </div>

              <div style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeNode.image}
                  alt={activeNode.title}
                  onClick={() => setLightboxSrc(activeNode.image)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'transform 0.7s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: `linear-gradient(to right, rgba(15,18,40,1) 0%, transparent 20%, transparent 80%, rgba(15,18,40,0.2) 100%)`
                }} />
              </div>
            </div>

            {/* Rest of Content */}
            <div style={{ padding: '0 3rem 3rem 3rem' }}>
              <div style={{
                display: 'flex', flexDirection: 'column',
                gap: '2.5rem', marginTop: '2rem'
              }}>
                <div>
                  {activeNode.bannerImage && (
              <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                <img src={activeNode.bannerImage} alt={activeNode.bannerCaption || ''}
                     style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
              </div>
            )}

            {/* --- Ilustración Científica Temática --- */}
            {activeNode.diagramImage && (
              <div style={{
                margin: '1.5rem 0',
                borderRadius: '16px',
                overflow: 'hidden',
                border: `1px solid ${activeNode.color}35`,
                background: 'rgba(5, 7, 20, 0.55)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${activeNode.color}20, transparent)`,
                  borderBottom: `1px solid ${activeNode.color}25`
                }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: activeNode.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    🎨 ILUSTRACIÓN CIENTÍFICA
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeNode.diagramImage}
                  alt={activeNode.diagramCaption || activeNode.title}
                  onClick={() => setLightboxSrc(activeNode.diagramImage)}
                  style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
                  loading="lazy"
                />
                {activeNode.diagramCaption && (
                  <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                    {activeNode.diagramCaption}
                  </p>
                )}
              </div>
            )}
            {activeNode.content.slice(1).map((paragraph, idx) => (
                    <p key={idx} style={{
                      color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem',
                      textAlign: 'justify'
                    }}>
                      {paragraph}
                    </p>
                  ))}
                  
                  <div style={{
                    marginTop: '2.5rem', padding: '1.8rem', borderRadius: '16px',
                    background: `linear-gradient(135deg, ${activeNode.color}15, rgba(0,0,0,0.4))`,
                    borderLeft: `4px solid ${activeNode.color}`, position: 'relative'
                  }}>
                    <Atom size={24} color={activeNode.color} style={{ position: 'absolute', top: -12, left: -12, background: '#0f1228', borderRadius: '50%', padding: '4px' }} />
                    <h4 style={{ color: activeNode.color, margin: '0 0 1rem 0', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      EL DATO CIENTÍFICO
                    </h4>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                      {activeNode.fact}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} color={activeNode.color} />
                    Exploración Profunda
                  </h3>
                  {activeNode.expandables.map((exp, i) => (
                    <ExpandableSection key={i} item={exp} color={activeNode.color} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bibliography Footer */}
        <div style={{
          marginTop: '4rem', padding: '2rem',
          background: 'rgba(0,0,0,0.5)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 1rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            ðŸ“š Fuentes y Referencias
          </h4>
          <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => <li key={i}>{bib}</li>)}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Zoomed Graphic" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
