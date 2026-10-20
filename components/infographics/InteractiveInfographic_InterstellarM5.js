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
  'dimensiones-geometria': [DecoOrbit, DecoSpacetimeGrid, DecoBlackHole],'quinta-dimension': [DecoEqualSign, DecoSpacetimeGrid, DecoOrbit],'teoria-cuerdas': [DecoSpacetimeGrid, DecoBlackHole, DecoWaveRipple],'branas-universo': [DecoOrbit, DecoSpacetimeGrid, DecoWaveRipple],'gravedad-transdimensional': [DecoBlackHole, DecoSpacetimeGrid, DecoEqualSign],'teseracto-cooper': [DecoWaveRipple, DecoBlackHole, DecoOrbit],
  'mensaje-tiempo': [DecoOrbit, DecoWaveRipple, DecoEqualSign],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Randall, L., Sundrum, R. (1999). "Large Mass Hierarchy from a Small Extra Dimension", Physical Review Letters, 83(17)',
  'Greene, B. (1999). The Elegant Universe: Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory, W.W. Norton',
  'Kaluza, T. (1921). "Zum Unitätsproblem der Physik", Sitzungsberichte Preussische Akademie der Wissenschaften',
  'Randall, L. (2005). Warped Passages: Unraveling the Mysteries of the Universe\'s Hidden Dimensions, Ecco Press',
  'Hinton, C.H. (1888). A New Era of Thought, Swan Sonnenschein & Co.',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "dimensiones-geometria",
    diagramImage: '/assets/interstellar/infographic_m5/diagram_dimensiones-geometria.webp',
    diagramCaption: 'Ilustración científica e histórica sobre De Punto a Hipercubo',
    "bannerImage": "/assets/interstellar/infographic_m5/banner_dimensiones-geometria.webp",
    "title": "De Punto a Hipercubo",
    "color": "#7C4DFF",
    "btnImage": "/assets/interstellar/infographic_m5/btn_dimensiones.webp",
    "image": "/assets/interstellar/infographic_m5/hero_dimensiones.webp",
    "content": [
      "Para comprender cómo se construyen las dimensiones superiores, la geometría utiliza un proceso inductivo y progresivo de extrusión espacial. Un punto geométrico carece de dimensiones: es cero-dimensional (0D). Si desplazamos ese punto a lo largo de una línea recta, barremos un segmento unidimensional (1D). Si movemos ese segmento perpendicularmente a sí mismo en una nueva dirección, generamos un cuadrado bidimensional (2D) delimitado por cuatro lados iguales y cuatro vértices ortogonales.",
      "Al desplazar el cuadrado bidimensional en un ángulo recto hacia arriba, en una tercera dirección perpendicular a las dos anteriores, obtenemos un cubo tridimensional (3D). El cubo ordinario posee seis caras cuadradas, doce aristas y ocho vértices. Este es el límite físico del espacio sensorial inmediato que nuestro cerebro humano puede visualizar de forma directa y tangible, ya que nuestra evolución biológica se desarrolló en un entorno adaptado exclusivamente a tres dimensiones espaciales.",
      "El siguiente salto geométrico requiere desplazar el cubo tridimensional en una dirección perpendicular a las tres direcciones espaciales previas, accediendo a la cuarta dimensión espacial. El resultado matemático es un hipercubo de cuatro dimensiones, conocido universalmente como teseracto o 4-cubo. Aunque no podemos mirar directamente en esa cuarta dirección física, el álgebra lineal define con exactitud rigurosa sus propiedades: un teseracto posee veinticuatro caras cuadradas, treinta y dos aristas y dieciséis vértices.",
      "Del mismo modo que un cubo tridimensional proyecta una sombra bidimensional plana sobre el suelo al ser iluminado por una lámpara, un teseracto tetradimensional proyecta una sombra tridimensional cuando interactúa con nuestro espacio. La célebre representación de un cubo dentro de otro cubo conectado por trapecios es, en realidad, la proyección tridimensional de un hipercubo girando en el espacio tetradimensional, revelando cómo figuras complejas pueden entenderse mediante sus siluetas de menor dimensión.",
      "El estudio sistemático de los hiperpoliedros fue formalizado en el siglo diecinueve por matemáticos pioneros como Ludwig Schläfli y Charles Howard Hinton, quienes inventaron la palabra «teseracto». Sus trabajos demostraron que la geometría no está restringida a las limitaciones de nuestros ojos, sino que obedece a leyes lógicas universales que permiten modelar mundos de cinco, diez o infinitas dimensiones con una consistencia matemática tan sólida como la geometría euclidiana clásica."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Christopher Nolan y su diseñador de producción Nathan Crowley construyeron un set físico gigantesco en los estudios de Warner Bros para materializar el interior del teseracto. En lugar de depender de animaciones por computadora abstractas, construyeron una intrincada celosía tridimensional con muebles, estanterías y libros reales suspendidos en cables, representando la proyección tridimensional del hipercubo donde Cooper podía flotar físicamente e interactuar con el dormitorio de su hija Murph."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El término «teseracto» proviene del griego clásico «tessares aktines», que significa «cuatro rayos», acuñado por Charles Howard Hinton en su tratado «A New Era of Thought» publicado en 1888. Hinton diseñó cubos de colores para entrenar a la mente humana a visualizar proyecciones tetradimensionales. En topología, la fórmula de Euler-Poincaré para un hipercubo se cumple rigurosamente: 16 vértices - 32 aristas + 24 caras - 8 celdas cúbicas tridimensionales = 0, verificando su perfecta coherencia matemática."
      }
    ],
    "fact": "El famoso pintor surrealista español Salvador Dalí se inspiró en la geometría tetradimensional de Ludwig Schläfli para pintar en 1954 su célebre obra «Corpus Hypercubus» (Crucifixión), exhibida en el Museo Metropolitano de Arte de Nueva York. La pintura representa una cruz formada por el despliegue tridimensional exacto de las ocho celdas cúbicas de un hipercubo de cuatro dimensiones, fusionando el misticismo artístico con la topología matemática más estricta del siglo veinte."
  },
  {
    "id": "quinta-dimension",
    diagramImage: '/assets/interstellar/infographic_m5/diagram_quinta-dimension.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Quinta Dimensión',
    "bannerImage": "/assets/interstellar/infographic_m5/banner_quinta-dimension.webp",
    "title": "La Quinta Dimensión",
    "color": "#4FC3F7",
    "btnImage": "/assets/interstellar/infographic_m5/btn_quinta-dimension.jpg",
    "image": "/assets/interstellar/infographic_m5/hero_quinta-dimension.jpg",
    "content": [
      "En la física teórica y la relatividad general, el espaciotiempo estándar está compuesto por cuatro dimensiones inseparables: tres dimensiones espaciales y una dimensión temporal unificadas por Albert Einstein en 1915. Sin embargo, cuando los astrofísicos y cosmólogos exploran extensiones de la gravedad para unificar las fuerzas fundamentales de la naturaleza, incorporan una quinta dimensión física complementaria, configurando un hiperespacio más amplio conocido en física teórica como el bulto o bulk.",
      "Dentro de este marco teórico pentadimensional, nuestro universo observable tridimensional actúa como una superficie o membrana flotante de grosor infinitesimal. Para un ser hipotético que habite el bulto pentadimensional, nuestra experiencia lineal del tiempo y las distancias espaciales se perciben de una manera radicalmente distinta. Así como nosotros podemos contemplar todas las páginas de un libro abierto simultáneamente sobre una mesa, un ser pentadimensional observa el pasado, presente y futuro a la vez.",
      "En Interstellar, Kip Thorne postuló que la quinta dimensión es de naturaleza espacial, no temporal. Esto significa que existen cuatro dimensiones de espacio físico (longitud, anchura, altura y una coordenada espacial adicional en el bulto llamada w) más una única dimensión temporal continua. Esta formulación geométrica es crucial: al ser una dimensión espacial, los seres del bulto pueden desplazarse libremente hacia adelante o hacia atrás a lo largo de las coordenadas sin generar paradojas de causalidad.",
      "El profesor Brand y su equipo en la NASA intentan resolver una ecuación de campo gravitatorio que vincula las constantes de la relatividad con la curvatura de la quinta dimensión. Si la gravedad se filtra hacia el bulto pentadimensional, controlar esa fuga energética permitiría alterar la constante de gravitación efectiva en la Tierra. Este dominio físico haría viable levantar colonias orbitales colosales con millones de toneladas de masa utilizando únicamente una fracción mínima de energía propulsiva.",
      "La existencia de una quinta dimensión espacial no es una fantasía arbitraria de guionistas de cine: fue formulada formalmente por primera vez en 1919 por el físico alemán Theodor Kaluza. La teoría de Kaluza-Klein demostró que, al añadir una quinta dimensión a las ecuaciones de la relatividad general de Einstein, las ecuaciones resultantes reproducen de forma automática e idéntica las ecuaciones de Maxwell del electromagnetismo, demostrando que la luz puede entenderse como una ondulación en la quinta dimensión."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Cuando Brand explica la naturaleza de los seres del bulto, aclara que para «Ellos», el tiempo es otra dimensión física navegable como una montaña por la que se puede subir o descender. Sin embargo, los seres pentadimensionales no pueden comunicarse directamente con los humanos del pasado porque no pueden encontrar un punto temporal específico en nuestro universo tridimensional sin un ancla física emocional: el amor de Cooper hacia su hija Murph sirve como la brújula que localiza el momento exacto."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En la solución de Kaluza-Klein de 1926, la quinta dimensión se encuentra compactada en un círculo ultra-microscópico cuyo radio es inferior a 10⁻³⁵ metros, lo que explica por qué no podemos movernos libremente en ella en la vida cotidiana. La cuantización del momento lineal de una partícula a lo largo de este bucle circular cerrado genera de forma natural una carga eléctrica cuantizada, proporcionando la primera explicación geométrica conocida en la historia para la existencia de cargas discretas."
      }
    ],
    "fact": "Cuando Albert Einstein recibió la carta manuscrita de Theodor Kaluza en abril de 1919 proponiendo una quinta dimensión para unificar la gravedad con el electromagnetismo, quedó tan asombrado que tardó más de dos años en procesar el impacto teórico antes de recomendar su publicación formal en la Academia Prusiana de Ciencias, escribiendo a Kaluza: «La idea de lograr la unificación mediante un mundo cilíndrico de cinco dimensiones jamás se me habría ocurrido»."
  },
  {
    "id": "teoria-cuerdas",
    diagramImage: '/assets/interstellar/infographic_m5/diagram_teoria-cuerdas.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Cuerdas Vibrantes',
    "bannerImage": "/assets/interstellar/infographic_m5/banner_teoria-cuerdas.webp",
    "title": "Cuerdas Vibrantes",
    "color": "#FF6B35",
    "btnImage": "/assets/interstellar/infographic_m5/btn_teoria-cuerdas.jpg",
    "image": "/assets/interstellar/infographic_m5/hero_teoria-cuerdas.jpg",
    "content": [
      "Durante más de un siglo, la física teórica ha enfrentado una profunda fractura entre sus dos pilares más exitosos: la relatividad general, que describe el cosmos a gran escala mediante la curvatura continua del espaciotiempo, y la mecánica cuántica, que gobierna el mundo subatómico mediante probabilidades discretas. Al intentar calcular la gravedad cuántica dentro de una singularidad, las ecuaciones clásicas colapsan arrojando infinitos insalvables y probabilidades mayores al cien por ciento.",
      "Para superar esta incompatibilidad fundamental, los físicos desarrollaron la teoría de cuerdas en la segunda mitad del siglo veinte. En lugar de concebir las partículas elementales (quarks, electrones y fotones) como puntos adimensionales de radio cero, esta teoría postula que los componentes más diminutos de la naturaleza son filamentos unidimensionales vibrantes de energía pura, semejantes a las diminutas cuerdas de un violín cósmico que se extienden en escalas diminutas de longitud de Planck.",
      "El modo de vibración u oscilación armónica de la cuerda determina la masa, la carga eléctrica y el espín de la partícula observable. Si la cuerda vibra a una determinada frecuencia, la percibimos en nuestros detectores como un fotón portador de luz; si vibra a otra frecuencia diferente, se manifiesta como un quark constituyente del protón. Crucialmente, la teoría de cuerdas contiene de forma natural una vibración de espín dos sin masa que coincide con las propiedades matemáticas del gravitón.",
      "El aspecto más fascinante de la teoría de cuerdas es que sus ecuaciones matemáticas solo son consistentes y libres de anomalías cuánticas si el espaciotiempo posee más dimensiones que las cuatro perceptibles. En su formulación moderna de teoría de supercuerdas, el universo requiere exactamente diez dimensiones de espaciotiempo: nueve dimensiones de espacio físico y una dimensión temporal. En la Teoría M, formulada por Edward Witten en 1995, el número se eleva a once dimensiones totales coordinadas.",
      "Las seis o siete dimensiones adicionales que no percibimos en nuestra vida cotidiana estarían compactadas en estructuras geométricas sumamente complejas denominadas variedades de Calabi-Yau. La forma topológica precisa de estos diminutos pliegues geométricos a nivel subatómico dicta las leyes de la física en nuestro universo observable, determinando desde la masa del electrón hasta la intensidad de las fuerzas nucleares, transformando la física de partículas en una sinfonía de geometría pura."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El profesor John Brand pasa décadas en la base subterránea de la NASA escribiendo complejas ecuaciones diferenciales en una gigantesca pizarra para resolver el enigma de la gravedad. Kip Thorne diseñó personalmente las ecuaciones reales grabadas en la pizarra, que contenían formulaciones auténticas de supergravedad, cuerdas y dimensiones compactadas. Thorne reveló que Brand ya sabía que la ecuación estaba incompleta porque requería medir datos cuánticos imposibles de obtener sin entrar a un agujero negro."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las variedades de Calabi-Yau son espacios compactos de seis dimensiones que satisfacen la condición geométrica de tener curvatura de Ricci plana. Fueron postuladas originalmente por los matemáticos Eugenio Calabi y Shing-Tung Yau. En teoría de supercuerdas, existen decenas de miles de variedades de Calabi-Yau distintas; cada una da lugar a un conjunto diferente de partículas y fuerzas en nuestro universo tridimensional, dando origen al concepto del multiverso o paisaje de la teoría de cuerdas (landscape)."
      }
    ],
    "fact": "En 1984, los físicos Michael Green y John Schwarz desataron la llamada «Primera Revolución de Supercuerdas» al demostrar que la teoría de cuerdas con el grupo de simetría SO(32) o E8×E8 cancelaba de forma milagrosa todas las anomalías cuánticas y divergencias de gauge. Este hallazgo histórico transformó la teoría de cuerdas de una curiosidad matemática marginal en la candidata más sólida de la física moderna para convertirse en la «Teoría del Todo» unificadora del universo."
  },
  {
    "id": "branas-universo",
    diagramImage: '/assets/interstellar/infographic_m5/diagram_branas-universo.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Universos en Rebanadas',
    "bannerImage": "/assets/interstellar/infographic_m5/banner_branas-universo.webp",
    "title": "Universos en Rebanadas",
    "color": "#AB47BC",
    "btnImage": "/assets/interstellar/infographic_m5/btn_branas.webp",
    "image": "/assets/interstellar/infographic_m5/hero_branas.webp",
    "content": [
      "La evolución conceptual de la teoría de cuerdas alcanzó una nueva frontera en 1995 con el descubrimiento de las membranas multidimensionales o branas (abreviatura de membranas de Dirichlet). El físico Joseph Polchinski demostró que las cuerdas cuánticas no solo flotan libremente en el vacío, sino que sus extremos abiertos deben terminar y anclarse forzosamente en superficies multidimensionales extendidas que residen dentro del hiperespacio cósmico de dimensiones suplementarias.",
      "Una brana puede poseer cualquier número de dimensiones espaciales, denotándose como p-brana. Por ejemplo, una 0-brana es una partícula puntual, una 1-brana es una cuerda lineal, una 2-brana es una membrana bidimensional ondulante y una 3-brana es un volumen espacial tridimensional completo. En la cosmología de branas moderna, nuestro universo completo, con todas sus galaxias, cúmulos estelares y planetas, es interpretado como una gigantesca 3-brana flotando en un bulto tetradimensional mucho mayor.",
      "Esta perspectiva geométrica resuelve de manera brillante el misterio de por qué la materia ordinaria no puede escapar hacia las dimensiones adicionales circundantes. Las partículas de nuestro modelo estándar, como los quarks y los electrones, corresponden a cuerdas abiertas cuyos extremos están firmemente atados a nuestra 3-brana. Al igual que gotas de agua atrapadas por tensión superficial en el cristal de una ventana, estas partículas están confinadas a deslizarse dentro de nuestro plano tridimensional.",
      "En contraste con la materia ordinaria, la interacción gravitatoria está mediada por el gravitón, que corresponde a una cuerda cerrada en forma de anillo cerrado sin extremos libres. Al no poseer extremos que la aten a ninguna superficie material, la gravedad no está confinada a nuestra 3-brana y puede propagarse libremente a través de las dimensiones superiores del bulto. Esta propiedad convierte a la gravedad en un puente cósmico capaz de comunicar universos paralelos o branas vecinas separadas.",
      "La cosmología de branas ofrece escenarios fascinantes como el modelo ecpirótico, propuesto por Paul Steinhardt y Neil Turok, donde el Big Bang que dio origen a nuestro cosmos no fue una singularidad nacida de la nada, sino la colisión colosal y periódica entre dos 3-branas paralelas flotando en el hiperespacio. Este enfoque revoluciona la cosmología moderna al transformar la estructura misma de la realidad en un tapestry multidimensional de universos laminares coexistentes e interactuantes."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "En el guion y el libro científico de Interstellar, Kip Thorne conceptualiza nuestro universo exactamente como una brana tridimensional inmersa en un bulto pentadimensional. Cuando Cooper cae al interior del agujero negro Gargantúa, es rescatado por seres que operan desde el bulto, quienes despliegan el teseracto como una estructura de branas hiperdimensionales que intersecta con la línea temporal de la habitación de Murph, permitiendo salvar a la civilización terrestre de la extinción ecológica."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Las D-branas descubiertas por Polchinski son dinámicas y poseen masa, tensión superficial y cargas de calibre de formas diferenciales de Ramond-Ramond. Cuando un conjunto masivo de D-branas coincide en un mismo punto del espacio, su tremenda concentración de masa y energía curva el espaciotiempo circundante, dando origen a la célebre correspondencia AdS/CFT de Juan Maldacena, que demuestra que una teoría de gravedad en un espacio anti-de Sitter es equivalente a una teoría cuántica de campos en su frontera."
      }
    ],
    "fact": "La cosmología de branas de Arkani-Hamed, Dimopoulos y Dvali (modelo ADD), propuesta en 1998, sugiere que las dimensiones espaciales extra podrían ser relativamente grandes, de hasta una fracción de milímetro, si solo la gravedad se propaga a través de ellas. Este modelo explica por qué la fuerza gravitacional es diez elevado a la treinta y ocho veces más débil que el electromagnetismo: la gravedad no es inherentemente débil, sino que su potencia se diluye al dispersarse por el volumen del bulto extra."
  },
  {
    "id": "gravedad-transdimensional",
    diagramImage: '/assets/interstellar/infographic_m5/diagram_gravedad-transdimensional.webp',
    diagramCaption: 'Ilustración científica e histórica sobre La Gravedad Cruza Dimensiones',
    "bannerImage": "/assets/interstellar/infographic_m5/banner_gravedad-transdimensional.webp",
    "title": "La Gravedad Cruza Dimensiones",
    "color": "#FF9800",
    "btnImage": "/assets/interstellar/infographic_m5/btn_gravedad.webp",
    "image": "/assets/interstellar/infographic_m5/hero_gravedad.webp",
    "content": [
      "En la física fundamental contemporánea, la gravedad ocupa un lugar excepcional y único entre todas las interacciones de la naturaleza. Mientras que el electromagnetismo, la fuerza nuclear débil y la fuerza nuclear fuerte están confinadas a operar estrictamente dentro de las tres dimensiones espaciales de nuestro universo observable, la gravedad es la única interacción capaz de trascender estos límites tridimensionales y propagarse libremente a través de las dimensiones superiores del hiperespacio.",
      "Esta propiedad transdimensional se deriva de la propia definición relativista de la gravitación. Para Albert Einstein, la gravedad no es una fuerza convencional que tira de los objetos a través de un espacio inerte, sino la curvatura y deformación geométrica del tejido espaciotemporal mismo. Al ser una propiedad intrínseca de la geometría métrica, cualquier ondulación gravitatoria distorsiona no solo el plano donde se origina, sino también el medio multidimensional en el que dicho plano está contenido.",
      "En el modelo cosmológico de Lisa Randall y Raman Sundrum formulado en 1999, se demostró que el espaciotiempo del bulto pentadimensional posee una curvatura alabeada (warped geometry) gobernada por una constante cosmológica negativa. Esta geometría actúa como una lente gravitatoria multidimensional que concentra la mayor parte de la energía gravitatoria cerca de una brana de Planck, permitiendo que una tenue fracción de ondas gravitatorias permee hacia nuestra brana tridimensional visible.",
      "Esta capacidad única de la gravedad para cruzar fronteras dimensionales es el pilar científico que sustenta la resolución de Interstellar. Dado que la luz electromagnética y las señales de radio no pueden escapar de un agujero negro ni transmitirse hacia atrás en el tiempo a través de dimensiones espaciales ordinarias, las ondas gravitacionales se convierten en el único vehículo físico admisible por las leyes de la relatividad para enviar información causal entre dimensiones y épocas distintas.",
      "En la astrofísica moderna de observatorios como LIGO y Virgo, los científicos miden ondas gravitacionales procedentes de colisiones de agujeros negros a miles de millones de años luz. Estas mediciones ultrasensibles no solo verifican la relatividad general, sino que imponen límites estrictos a la fuga de gravitones hacia dimensiones extra: si la energía de las ondas se disipara en el bulto, las señales detectadas serían más débiles de lo esperado, abriendo la puerta a medir experimentalmente el hiperespacio."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "La premisa de que la gravedad cruza las dimensiones y el tiempo fue establecida por Christopher Nolan y Kip Thorne como la regla de oro científica de Interstellar. Cooper descubre que los supuestos «fantasmas» que movían los libros en la habitación de Murph eran en realidad anomalías gravitatorias generadas por él mismo desde el interior del teseracto pentadimensional, empujando con sus manos las cuerdas temporales para modular perturbaciones gravitacionales que se manifestaban en el mundo tridimensional."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En 2017, la detección simultánea de ondas gravitacionales (GW170817) y radiación electromagnética gamma procedentes de la fusión de dos estrellas de neutrones permitió medir la velocidad de la gravedad con una precisión sin precedentes. Los resultados confirmaron que las ondas gravitatorias viajan a la velocidad de la luz en el vacío con un margen de error menor a 10⁻¹⁵, descartando numerosas teorías alternativas de gravedad modificada que predecían fugas descontroladas hacia dimensiones extra."
      }
    ],
    "fact": "Los interferómetros láser de LIGO en Hanford y Livingston son capaces de detectar deformaciones gravitacionales en el espaciotiempo inferiores a una milésima parte del diámetro de un protón (10⁻¹⁸ metros) a lo largo de sus brazos de cuatro kilómetros de longitud. Esta sensibilidad cuántica representa la medición más precisa jamás alcanzada por la humanidad, demostrando que la interacción más sutil del cosmos puede ser capturada para estudiar los confines más extremos de la geometría relativista."
  },
  {
    "id": "teseracto-cooper",
    diagramImage: '/assets/interstellar/infographic_m5/diagram_teseracto-cooper.webp',
    diagramCaption: 'Ilustración científica e histórica sobre El Teseracto de Cooper',
    "bannerImage": "/assets/interstellar/infographic_m5/banner_teseracto-cooper.webp",
    "title": "El Teseracto de Cooper",
    "color": "#F44336",
    "btnImage": "/assets/interstellar/infographic_m5/btn_teseracto.webp",
    "image": "/assets/interstellar/infographic_m5/hero_teseracto.webp",
    "content": [
      "Tras desacoplarse de la nave Ranger y precipitarse al interior del horizonte de sucesos de Gargantúa, Cooper no es aniquilado por la singularidad destructiva gracias a una intervención tecnológica de seres del bulto pentadimensional. En lugar de estrellarse contra el centro gravitatorio, es transportado hacia un teseracto: una colosal estructura geométrica tetradimensional construida específicamente para que una mente humana tridimensional pueda interactuar con el tiempo físico como una dimensión espacial.",
      "El físico teórico Kip Thorne explicó en detalle la física de este ingenio en «The Science of Interstellar». Para un ser humano ordinario, el tiempo fluye de forma inexorable hacia adelante como una corriente que nos arrastra sin posibilidad de retroceso. El teseracto, sin embargo, pliega la dimensión temporal de la habitación de Murph a lo largo de un eje espacial hiperdimensional, transformando cada segundo transcurrido en una coordenada física estática que se extiende infinitamente en el espacio cúbico.",
      "Visualmente, el teseracto se manifiesta ante Cooper como una retícula infinita de habitaciones de Murph intersectadas por filamentos longitudinales de tiempo. Cada habitación representa un instante diferente en la vida de su hija: Cooper puede ver a Murph a los diez años de edad, luego desplazarse varios metros a través de la celosía y contemplarla como una científica adulta en el mismo dormitorio. El tiempo se ha espacializado, convirtiéndose en un pasillo geométrico transitable por el astronauta.",
      "No obstante, el teseracto impone una limitación física inquebrantable dictada por la relatividad: Cooper no puede tocar físicamente a su hija ni gritarle a través del vacío, ya que las ondas sonoras y electromagnéticas no pueden propagarse a través de la interfaz del bulto. La única herramienta física disponible para interactuar con ese espacio tridimensional es pulsar las cuerdas temporales de la estantería, generando ondas gravitacionales microscópicas que se transmiten a través de la madera y el cristal.",
      "El teseracto es una proeza de bioingeniería hiperdimensional diseñada con una compasión sublime: los seres pentadimensionales comprendían que el cerebro de un astronauta se desmoronaría ante la inmensidad del hiperespacio puro, por lo que crearon una cámara de descompresión geométrica comprensible para él, utilizando el entorno más querido y familiar de su memoria para canalizar la salvación científica de toda la especie humana antes de que la Tierra colapsara por inanición biológica."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "Para diseñar la arquitectura visual del teseracto, Christopher Nolan y Kip Thorne colaboraron durante meses con el artista conceptual Paul Franklin. La idea de que el tiempo se visualizaría como hilos físicos extruidos se basó en el concepto relativista de líneas de universo (world lines): el camino que recorre cada partícula de materia a través del espaciotiempo cuatridimensional. Nolan filmó al actor Matthew McConaughey suspendido en arneses complejos dentro del set construido a escala real."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "En física relativista de Hermann Minkowski, una línea de universo es la trayectoria continua e ininterrumpida que traza un objeto material en el espaciotiempo cuatridimensional desde su origen hasta su destrucción. En el teseracto de Interstellar, los libros, los muebles y el segundero del reloj de pulsera no son objetos estáticos, sino tubos cuatridimensionales que se prolongan en el tiempo; al golpear la base de una línea de universo, la oscilación elástica gravitatoria se propaga por el tiempo."
      }
    ],
    "fact": "El set del teseracto construido en los estudios de sonido de Los Ángeles medía más de veinticinco metros de longitud por doce metros de altura, requiriendo meses de carpintería de precisión y cientos de kilómetros de cables de acero para sostener habitaciones duplicadas en múltiples perspectivas anamórficas. Fue uno de los sets cinematográficos arquitectónicos más complejos jamás erigidos en la historia de Hollywood, diseñado para materializar la geometría pura de la relatividad general."
  },
  {
    "id": "mensaje-tiempo",
    diagramImage: '/assets/interstellar/infographic_m5/diagram_mensaje-tiempo.webp',
    diagramCaption: 'Ilustración científica e histórica sobre Un Mensaje a Través del Tiempo',
    "bannerImage": "/assets/interstellar/infographic_m5/banner_mensaje-tiempo.webp",
    "title": "Un Mensaje a Través del Tiempo",
    "color": "#26A69A",
    "btnImage": "/assets/interstellar/infographic_m5/btn_mensaje.webp",
    "image": "/assets/interstellar/infographic_m5/hero_mensaje.webp",
    "content": [
      "La misión climática de Cooper dentro del teseracto culmina en la transmisión de los datos cuánticos de la singularidad recopilados por el robot TARS. Estos datos son la pieza matemática que faltaba para unificar la relatividad con la mecánica cuántica y completar la ecuación de la gravedad en la Tierra. Sin embargo, Cooper se enfrenta a un desafío insólito: codificar una inmensa cantidad de información física abstracta a través de la frontera de dimensiones sin contar con enlaces de radio ni señales ópticas.",
      "Cooper comprende que la gravedad es la única fuerza capaz de modular el espaciotiempo tridimensional desde el bulto. Recordando el regalo de despedida que dejó a su hija antes de partir al espacio interestelar, enfoca su atención en el reloj de pulsera Hamilton mecánico que descansa sobre la estantería del dormitorio de Murph. Utilizando las perturbaciones gravitacionales transmitidas por las cuerdas del teseracto, manipula con precisión infinitesimal el mecanismo móvil del segundero del reloj.",
      "Para transmitir la compleja secuencia numérica de la gravedad cuántica, Cooper y TARS traducen los datos algebraicos al código Morse internacional, un sistema de comunicación binario inventado en el siglo diecinueve basado en pulsos cortos (puntos) y largos (rayas). TARS dicta la secuencia mediante señales lumínicas dentro del teseracto mientras Cooper manipula la gravedad para hacer oscilar el segundero rítmicamente, transformando un reloj analógico doméstico en un receptor cuántico transdimensional.",
      "Años más tarde en la Tierra, una Murph adulta, desanimada por el aparente callejón sin salida de la física teórica, regresa a su antiguo dormitorio infantil. Al notar el errático y persistente movimiento del segundero de su reloj, comprende repentinamente que no es una falla mecánica ordinaria, sino un mensaje codificado con amor paternal desde el infinito. Al descifrar los pulsos de código Morse, Murph obtiene los datos necesarios para resolver la ecuación que permite manipular la gravedad terrestre.",
      "El clímax de Interstellar encapsula el mensaje filosófico y científico más conmovedor de la película: la ciencia de vanguardia y la emoción humana no son conceptos antagónicos, sino complementarios en la búsqueda de la supervivencia cósmica. La gravedad une las galaxias a través del vacío del cosmos, pero es el lazo inquebrantable de la memoria humana el que proporciona el significado y la motivación última para que nuestra especie desentrañe los secretos más profundos y asombrosos del universo."
    ],
    "expandables": [
      {
        "label": "En la Película",
        "icon": "zap",
        "text": "El reloj de pulsera utilizado en la película fue una pieza única personalizada diseñada expresamente por la prestigiosa manufactura relojera suiza Hamilton para la producción de Christopher Nolan. El equipo técnico equipó el reloj con un pequeño solenoide electromagnético oculto accionado por un microcontrolador que movía el segundero con el ritmo exacto del código Morse durante las tomas en primer plano de Jessica Chastain, convirtiendo al reloj en un auténtico icono de la historia del cine de ciencia ficción."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El código Morse, patentado por Samuel Morse y Alfred Vail en la década de 1840, demostró ser el método más robusto para transmitir datos científicos a través de canales con un nivel colosal de ruido y limitaciones de ancho de banda. En teoría de la información formulada por Claude Shannon en 1948, un sistema de comunicación binario asimétrico puede transmitir cualquier archivo de datos o ecuación matemática compleja sin pérdida de entropía, siempre que la relación señal-ruido sea superior al límite de canal."
      }
    ],
    "fact": "La ecuación gravitatoria resuelta por Murph en la película permitió controlar la métrica del espaciotiempo local para anular la gravedad en grandes extensiones, posibilitando el lanzamiento al espacio de colosales estaciones espaciales cilíndricas de O'Neill, como la Estación Cooper que orbita cerca de Saturno al final de la historia, salvando a toda la población remanente de la Tierra mediante la conquista pacífica y sostenible del sistema solar."
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
          const colors = ['#7C4DFF','#4FC3F7','#FF6B35','#AB47BC','#FF9800','#F44336','#26A69A'];
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
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL TESERACTO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">Y LA QUINTA DIMENSIÓN</text>
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
          layoutId="activeDotInterstellarM5"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
          width: '100%',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: `${color}20`,
            padding: '0.4rem',
            borderRadius: '8px',
            color: color
          }}>
            <IconComp size={18} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.5px' }}>{item.label}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dirVariants[dir]}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              padding: '0 1.25rem 1.25rem 1.25rem',
              color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, fontSize:'0.92rem',
            }}
          >
            <div style={{
              paddingTop: '1rem',
              borderTop: `1px solid ${color}15`
            }}>
              {item.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterstellarM5() {
  const [activeNodeId, setActiveNodeId] = useState(INFOGRAPHIC_NODES[0].id);
  const [isChanging, setIsChanging] = useState(false);
  const contentRef = useRef(null);
  
  // Lightbox state
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);
  const activeDeco = DECO_MAP[activeNode.id] || [DecoBlackHole, DecoSpacetimeGrid, DecoOrbit];
  const DecoA = activeDeco[0];
  const DecoB = activeDeco[1];

  const handleNodeChange = (id) => {
    if (id === activeNodeId) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveNodeId(id);
      setIsChanging(false);
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0a0c1e', // Deep space black base
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <InterstellarBackground />
      
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <InterstellarHeader />

        {/* Navigation Nodes */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={node.id === activeNodeId}
              onClick={() => handleNodeChange(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Main Content Panel */}
        <div style={{
          background: 'rgba(10, 12, 30, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: `1px solid ${activeNode.color}30`,
          boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)`,
          overflow: 'hidden',
          position: 'relative',
          transition: 'border-color 0.5s',
        }}>
          {/* Subtle top glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: `linear-gradient(90deg, transparent, ${activeNode.color}, transparent)`,
            opacity: 0.6
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '280px', // hero layout min height
          }}>
            {/* Hero Image Section */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              minHeight: '280px',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeNode.image}
                    alt={activeNode.title}
                    onClick={() => setLightboxSrc(activeNode.image)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer', // Lightbox rule
                    }}
                  />
                  {/* Inner shadow over image */}
                  <div style={{
                    position: 'absolute', inset: 0, background:'linear-gradient(to right, rgba(10,12,30,0.9) 0%, transparent 30%, transparent 70%, rgba(10,12,30,0.4) 100%)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0, background:'linear-gradient(to top, rgba(10,12,30,1) 0%, transparent 40%)',
                    pointerEvents: 'none'
                  }} />
                </motion.div>
              </AnimatePresence>

              {/* Decorative SVGs over image */}
              <div style={{ position: 'absolute', top: '10%', right: '10%' }}>
                <DecoA color={activeNode.color} size={100} />
              </div>
              <div style={{ position: 'absolute', bottom: '15%', left: '10%' }}>
                <DecoB color={activeNode.color} size={80} />
              </div>
            </div>

            {/* Text Content Section */}
            <div
              ref={contentRef}
              style={{
                padding: '2.5rem',
                maxHeight: '70vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: `${activeNode.color}40 transparent`,
                position: 'relative',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={activeNode.btnImage} 
                      alt="avatar" 
                      onClick={() => setLightboxSrc(activeNode.btnImage)}
                      style={{ 
                        width: '40px', height: '40px', 
                        borderRadius: '50%', 
                        border: `2px solid ${activeNode.color}`,
                        cursor: 'pointer',
                        objectFit: 'cover'
                      }} 
                    />
                    <h2 style={{
                      fontSize: '2rem', fontWeight: 800, margin: 0, color: activeNode.color, textShadow:'0 2px 10px rgba(0,0,0,0.5)',
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '1px'
                    }}>
                      {activeNode.title}
                    </h2>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1.2rem',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1.05rem', lineHeight: 1.7, textShadow:'0 1px 2px rgba(0,0,0,0.8)'
                  }}>
                    {activeNode.content.map((para, idx) => (
                      <p key={idx} style={{ margin: 0 }}>
                        {idx === 0 && (
                          <span style={{ 
                            color: activeNode.color, 
                            fontSize: '1.4em', lineHeight: 1, fontWeight:'bold', 
                            marginRight: '4px' 
                          }}>
                            {para.charAt(0)}
                          </span>
                        )}
                        {idx === 0 ? para.slice(1) : para}
                      </p>
                    ))}
                  </div>

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

        {/* --- Ilustración Científica Temática --- */}
        {node.diagramImage && (
          <div style={{
            marginTop: '1.2rem',
            marginBottom: '0.5rem',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${node.color}35`,
            background: 'rgba(5, 7, 20, 0.55)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.6rem 1rem', background: `linear-gradient(90deg, ${node.color}20, transparent)`,
              borderBottom: `1px solid ${node.color}25`
            }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                🎨 ILUSTRACIÓN CIENTÍFICA
              </span>
              <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Click para ampliar</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={node.diagramImage}
              alt={node.diagramCaption || node.title}
              onClick={() => setLightboxSrc(node.diagramImage)}
              style={{ width: '100%', maxHeight: '340px', objectFit: 'contain', cursor: 'pointer', display: 'block', padding: '0.5rem', background: 'rgba(0,0,0,0.2)' }}
              loading="lazy"
            />
            {node.diagramCaption && (
              <p style={{ fontSize: '0.78rem', color: '#aaa', textAlign: 'center', margin: '0.4rem 0.8rem 0.8rem', fontStyle: 'italic' }}>
                {node.diagramCaption}
              </p>
            )}
          </div>
        )}

                </div>
              )}
              {/* Fact Box */}
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: `linear-gradient(to right, ${activeNode.color}15, transparent)`,
                    borderLeft: `4px solid ${activeNode.color}`,
                    borderRadius: '0 12px 12px 0',
                    display: 'flex',
                    gap: '1rem',
                  }}>
                    <Star style={{ color: activeNode.color, flexShrink: 0, marginTop: '4px' }} size={24} />
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.95rem', lineHeight: 1.6, color:'rgba(255,255,255,0.85)',
                      fontStyle: 'italic'
                    }}>
                      {activeNode.fact}
                    </p>
                  </div>

                  {/* Expandables */}
                  <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {activeNode.expandables.map((exp, idx) => (
                      <ExpandableSection key={idx} item={exp} color={activeNode.color} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bibliography Footer */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          zIndex: 2,
        }}>
          <h3 style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '0.5rem'
          }}>
            ðŸ“š Fuentes y Referencias
          </h3>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            <ul style={{
              margin: 0,
              paddingLeft: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              {BIBLIOGRAPHY.map((item, idx) => (
                <li key={idx} style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem', lineHeight: 1.5, listStyleType:'disc'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lightbox Render */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Vista ampliada"
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}
