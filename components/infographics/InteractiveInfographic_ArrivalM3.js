'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Linguistic / Temporal themed) ────────────────
function DecoLogogram({ size = 70, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Circular logogram inspired by heptapod writing */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Ink splotch strokes */}
      <path d="M14 30 Q22 18 30 14 Q38 18 46 30 Q38 42 30 46 Q22 42 14 30Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M20 20 Q30 25 40 20" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M20 40 Q30 35 40 40" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoHourglass({ size = 70, color = '#7A8C9E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Hourglass shape */}
      <path d="M18 8 L42 8 L32 28 L42 52 L18 52 L28 28 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sand particles */}
      <circle cx="30" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="27" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="33" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="30" cy="30" r="1" fill={color} opacity="0.6" />
      <circle cx="28" cy="42" r="1.5" fill={color} opacity="0.5" />
      <circle cx="32" cy="44" r="1" fill={color} opacity="0.4" />
      <circle cx="30" cy="46" r="1.5" fill={color} opacity="0.5" />
      {/* Frame accents */}
      <line x1="15" y1="8" x2="45" y2="8" stroke={color} strokeWidth="2" opacity="0.6" />
      <line x1="15" y1="52" x2="45" y2="52" stroke={color} strokeWidth="2" opacity="0.6" />
    </svg>
  );
}

function DecoWaveform({ size = 80, color = '#6A7B8D', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Sound / language waveform */}
      <path d="M5 20 Q10 8 15 20 Q20 32 25 20 Q30 8 35 20 Q40 32 45 20 Q50 8 55 20 Q60 32 65 20 Q70 8 75 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Sub-wave */}
      <path d="M10 20 Q20 14 30 20 Q40 26 50 20 Q60 14 70 20" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Particles */}
      <circle cx="15" cy="10" r="1" fill={color} opacity="0.4" />
      <circle cx="45" cy="32" r="1.5" fill={color} opacity="0.3" />
      <circle cx="65" cy="12" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoBrainSvg({ size = 60, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized brain hemispheres */}
      <path d="M30 10 Q18 10 14 22 Q10 34 18 42 Q24 48 30 48" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M30 10 Q42 10 46 22 Q50 34 42 42 Q36 48 30 48" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Neural connections */}
      <path d="M22 20 Q30 24 38 20" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M20 30 Q30 34 40 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M22 38 Q30 42 38 38" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Synapses */}
      <circle cx="22" cy="20" r="2" fill={color} opacity="0.4" />
      <circle cx="38" cy="20" r="2" fill={color} opacity="0.4" />
      <circle cx="20" cy="30" r="2" fill={color} opacity="0.4" />
      <circle cx="40" cy="30" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSpacetimeGrid({ size = 70, color = '#4E4E4E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Curved spacetime grid */}
      {[15, 25, 35, 45].map((y, i) => (
        <path key={`h${i}`} d={`M8 ${y} Q30 ${y + (30 - y) * 0.3} 52 ${y}`} fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      ))}
      {[15, 25, 35, 45].map((x, i) => (
        <path key={`v${i}`} d={`M${x} 8 Q${x + (30 - x) * 0.2} 30 ${x} 52`} fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      ))}
      {/* Mass distortion */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.3" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoScrollSvg({ size = 70, color = '#3D3D3D', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 49" style={{ opacity: 0.2, ...style }}>
      {/* Ancient scroll / manuscript */}
      <path d="M12 8 Q8 8 8 14 L8 38 Q8 44 12 44 L58 44 Q62 44 62 38 L62 14 Q62 8 58 8 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Scroll rolls */}
      <ellipse cx="8" cy="26" rx="3" ry="18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="62" cy="26" rx="3" ry="18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Text lines */}
      <line x1="18" y1="18" x2="52" y2="18" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="24" x2="48" y2="24" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="30" x2="50" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="36" x2="44" y2="36" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'tiempo-lenguas': [DecoLogogram, DecoWaveform, DecoBrainSvg],
  'tiempo-lineal-circular': [DecoHourglass, DecoLogogram, DecoScrollSvg],
  'sapir-whorf-arrival': [DecoBrainSvg, DecoLogogram, DecoWaveform],
  'escritura-tiempo': [DecoScrollSvg, DecoLogogram, DecoHourglass],
  'tiempo-fisica': [DecoSpacetimeGrid, DecoHourglass, DecoBrainSvg],
  'libre-albedrio': [DecoBrainSvg, DecoSpacetimeGrid, DecoHourglass],
  'story-of-your-life': [DecoLogogram, DecoScrollSvg, DecoWaveform],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Chiang, T. (2002). Stories of Your Life and Others. Tor Books',
  'Whorf, B.L. (1956). Language, Thought, and Reality: Selected Writings of Benjamin Lee Whorf. MIT Press',
  'Everett, D.L. (2005). Cultural Constraints on Grammar and Cognition in Pirahã. Current Anthropology, 46(4)',
  'Sider, T. (2001). Four-Dimensionalism: An Ontology of Persistence and Time. Oxford University Press',
  'Minkowski, H. (1908). Raum und Zeit. Physikalische Zeitschrift, 10',
  'Boroditsky, L. (2011). How Language Shapes Thought. Scientific American, 304(2)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tiempo-lenguas',
    title: 'El Tiempo en Diferentes Lenguas',
    color: '#8B9DAF',
    btnImage: '/assets/ciencia_arrival/infographic_m3/btn_tiempo-lenguas.jpg',
    image: '/assets/ciencia_arrival/infographic_m3/hero_tiempo-lenguas.jpg',
    content: [
      'Las lenguas humanas codifican el tiempo de maneras radicalmente distintas. El español y el inglés poseen sistemas de conjugación verbal que marcan pasado, presente y futuro con precisión gramatical. Cuando dices "comí", "como" o "comeré", la forma del verbo señala cuándo ocurrió la acción. Sin embargo, muchas lenguas del mundo carecen por completo de estas marcas temporales obligatorias, lo cual plantea preguntas profundas sobre la relación entre gramática y percepción del tiempo.',
      'El mandarín estándar no posee conjugaciones verbales temporales. Un hablante de mandarín dice "wǒ chī" (yo comer) independientemente de si se refiere al pasado, presente o futuro. El contexto, los adverbios temporales como "zuótiān" (ayer) o "míngtiān" (mañana), y las partículas aspectuales como "le" (acción completada) proporcionan la información temporal. Esto no significa que los hablantes de mandarín no comprendan el tiempo; lo expresan mediante herramientas lingüísticas diferentes a las conjugaciones.',
      'El lingüista Benjamin Lee Whorf propuso en la década de 1940 que la lengua hopi, hablada por el pueblo hopi de Arizona, carecía de conceptos temporales lineales. Whorf argumentó que los hopi no distinguían gramaticalmente entre pasado, presente y futuro, sino que categorizaban los eventos como "manifiestos" (observados) o "no manifiestos" (no observados, incluyendo eventos futuros e imaginarios). Esta propuesta generó décadas de debate académico sobre si la gramática realmente determina la percepción del tiempo.',
      'El lingüista Ekkehart Malotki publicó en 1983 un estudio de más de 600 páginas titulado "Hopi Time" donde documentó múltiples expresiones temporales en hopi, incluyendo marcadores de duración, secuencia y referencia temporal. Malotki concluyó que la afirmación de Whorf era una simplificación excesiva. Los hopi sí poseen formas de expresar relaciones temporales, aunque su sistema difiere del europeo. Este caso se convirtió en un ejemplo clásico de cómo las generalizaciones lingüísticas pueden ser peligrosas sin trabajo de campo riguroso.',
      'La lengua pirahã, hablada por aproximadamente 400 personas en la Amazonia brasileña, presenta otro caso relevante. El lingüista Daniel Everett publicó en 2005 en la revista Current Anthropology que el pirahã carece de tiempos verbales, números, colores nominados y cláusulas subordinadas. Según Everett, los pirahã viven en una cultura centrada en la "experiencia inmediata", donde solo se comunica lo directamente observado o reportado por testigos vivos. Esta propuesta sigue siendo controvertida, pero ha reavivado el debate sobre los límites que la cultura impone a la gramática.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La investigadora Lera Boroditsky, de la Universidad de Stanford, demostró en 2010 que los hablantes de mandarín tienden a conceptualizar el tiempo verticalmente (arriba = antes, abajo = después), mientras que los hablantes de inglés lo conceptualizan horizontalmente (izquierda = pasado, derecha = futuro). Cuando Boroditsky entrenó a hablantes de inglés a pensar en el tiempo verticalmente, estos respondieron más rápido a preguntas temporales en mandarín. Esto sugiere que la lengua puede moldear, aunque no determinar, la forma en que organizamos el tiempo mentalmente.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival, cuando Louise Banks comienza a descifrar el lenguaje de los heptápodos, descubre que su sistema de escritura no marca distinciones temporales lineales. Los logogramas heptápodos expresan oraciones completas de forma simultánea, sin un inicio ni un final definidos. Esta propiedad del lenguaje alienígena es central para la trama: si tu lengua no distingue entre pasado y futuro, ¿podrías experimentar ambos al mismo tiempo? La película convierte una pregunta lingüística real en ciencia ficción.' },
    ],
    fact: 'El pueblo aymara de los Andes (Bolivia y Perú) conceptualiza el tiempo al revés que la mayoría de las culturas: el pasado está "adelante" (porque se puede ver, ya se conoce) y el futuro está "detrás" (porque no se puede ver). Los investigadores Rafael Núñez y Eve Sweetser documentaron en 2006 que los hablantes de aymara señalan hacia adelante cuando hablan del pasado y hacia atrás cuando hablan del futuro, confirmando que esta no es solo una metáfora verbal sino un esquema cognitivo-espacial completo.',
  },
  {
    id: 'tiempo-lineal-circular',
    title: 'Tiempo Lineal vs Circular',
    color: '#7A8C9E',
    btnImage: '/assets/ciencia_arrival/infographic_m3/btn_tiempo-lineal-circular.jpg',
    image: '/assets/ciencia_arrival/infographic_m3/hero_tiempo-lineal-circular.jpg',
    content: [
      'La concepción occidental del tiempo como una línea recta que avanza del pasado hacia el futuro es tan dominante que resulta difícil imaginar alternativas. Esta visión lineal tiene raíces en la tradición judeocristiana, donde la historia posee un comienzo (la creación), un desarrollo y un final (el juicio final). San Agustín de Hipona, en el siglo V d.C., articuló esta idea en sus "Confesiones", argumentando que el tiempo fue creado por Dios junto con el universo y que avanza hacia un propósito divino.',
      'En contraste, numerosas culturas de Asia conciben el tiempo como cíclico. En el hinduismo, el universo atraviesa ciclos llamados "yugas" que se repiten eternamente. Un ciclo completo (maha-yuga) dura 4,320,000 años y comprende cuatro eras de duración decreciente: Satya Yuga (1,728,000 años), Treta Yuga (1,296,000 años), Dvapara Yuga (864,000 años) y Kali Yuga (432,000 años). Según esta tradición, vivimos actualmente en Kali Yuga, la era más corta y oscura, que comenzó en 3102 a.C.',
      'Los pueblos aborígenes de Australia poseen el concepto del "Tiempo del Sueño" (Dreamtime o Tjukurpa en lengua pitjantjatjara), que no es ni lineal ni cíclico en el sentido convencional. El Tiempo del Sueño es un estado eterno donde los seres ancestrales crearon el paisaje, las leyes y las especies. Pero este tiempo no quedó en el pasado: coexiste con el presente. Los sitios sagrados son puntos donde el Tiempo del Sueño se manifiesta en la realidad cotidiana, y los rituales ceremoniales permiten a las personas acceder a ese estado temporal simultáneo.',
      'El filósofo griego Heráclito de Éfeso (535-475 a.C.) propuso que el tiempo era un flujo constante con su famosa frase "panta rhei" (todo fluye). Su contemporáneo Parménides, en cambio, argumentó que el cambio era una ilusión y que la realidad era estática y eterna. Este debate entre tiempo como flujo y tiempo como ilusión se ha repetido durante 2,500 años y resurge en la física moderna con la teoría del universo bloque, donde pasado, presente y futuro coexisten como páginas ya escritas de un libro.',
      'La psicóloga cognitiva Lera Boroditsky ha investigado cómo diferentes culturas organizan espacialmente el tiempo. Los hablantes de kuuk thaayorre, una lengua aborigen australiana, no usan conceptos de izquierda o derecha sino coordenadas cardinales absolutas (norte, sur, este, oeste). Cuando se les pide ordenar eventos temporales, los organizan de este a oeste, siguiendo la trayectoria del sol, independientemente de hacia dónde estén mirando. Esto demuestra que la orientación temporal no es universal sino que está profundamente conectada con la lengua y la cultura del hablante.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El filósofo Friedrich Nietzsche propuso en 1882 el concepto del "eterno retorno": la idea de que el universo y todos los eventos se repiten infinitamente en ciclos idénticos. Nietzsche lo planteó como un experimento mental ético: si tuvieras que vivir tu vida exactamente igual una infinidad de veces, ¿vivirías de la misma manera? El físico Ludwig Boltzmann argumentó que el eterno retorno era termodinámicamente posible si el universo tuviera tiempo suficiente para que todas las configuraciones de partículas se repitieran.' },
      { label: 'En la Película', icon: 'zap', text: 'La estructura narrativa de Arrival refleja directamente el contraste entre tiempo lineal y no lineal. La película comienza con lo que parece ser un flashback de Louise con su hija, pero al final se revela que son flash-forwards: visiones del futuro que Louise adquiere al aprender el lenguaje heptápodo. Denis Villeneuve diseñó deliberadamente la primera escena para engañar al espectador, haciendo que asuma una narrativa lineal. El giro final obliga a reinterpretar toda la película desde una perspectiva no lineal.' },
    ],
    fact: 'Los antiguos mayas desarrollaron uno de los sistemas calendáricos más precisos de la historia. Su Cuenta Larga medía ciclos de 5,125.36 años llamados b\'ak\'tun. El calendario maya combinaba elementos cíclicos (el Tzolk\'in de 260 días y el Haab\' de 365 días se sincronizaban cada 52 años en la "Rueda Calendárica") con un cómputo lineal acumulativo. Los mayas calcularon el año solar con una precisión de 365.2420 días, apenas 0.0002 días de diferencia con el valor astronómico moderno de 365.2422 días.',
  },
  {
    id: 'sapir-whorf-arrival',
    title: 'La Hipótesis de Sapir-Whorf en Arrival',
    color: '#2C2C2C',
    btnImage: '/assets/ciencia_arrival/infographic_m3/btn_sapir-whorf-arrival.jpg',
    image: '/assets/ciencia_arrival/infographic_m3/hero_sapir-whorf-arrival.jpg',
    content: [
      'La hipótesis de Sapir-Whorf, también conocida como relatividad lingüística, propone que la estructura de una lengua influye en la percepción y el pensamiento de sus hablantes. Esta idea fue desarrollada por el lingüista Edward Sapir y su alumno Benjamin Lee Whorf durante la primera mitad del siglo XX. La hipótesis tiene dos versiones: la fuerte (determinismo lingüístico), que afirma que la lengua determina el pensamiento, y la débil (relativismo lingüístico), que sostiene que la lengua influye en el pensamiento sin determinarlo por completo.',
      'La película Arrival adopta la versión fuerte de la hipótesis como premisa central de su trama. Cuando Louise Banks aprende el lenguaje escrito de los heptápodos, su cognición se transforma: comienza a percibir el futuro. La película trata el lenguaje no como una herramienta de comunicación sino como un sistema operativo del cerebro. Aprender heptápodo B (el sistema escrito) reconfigura las conexiones neuronales de Louise, alterando su experiencia del tiempo de forma permanente.',
      'En la lingüística académica actual, la versión fuerte de Sapir-Whorf ha sido descartada. No existe evidencia de que aprender una lengua nueva pueda alterar la percepción física del tiempo o del espacio. Sin embargo, la versión débil cuenta con respaldo experimental sólido. El investigador Peter Gordon publicó en 2004 en la revista Science un estudio con los pirahã mostrando que los hablantes de esta lengua, que carece de números exactos más allá de "uno" y "dos", tenían dificultades significativas para realizar tareas que requerían conteo exacto con cantidades superiores a tres.',
      'Otros experimentos apoyan la influencia lingüística en la cognición. Los hablantes de ruso, que poseen palabras separadas para azul claro ("goluboy") y azul oscuro ("siniy"), distinguen estos tonos más rápidamente que los hablantes de inglés, quienes usan una sola palabra ("blue") para ambos. Un estudio publicado en 2007 por Jonathan Winawer y colaboradores en las Proceedings of the National Academy of Sciences demostró este efecto con pruebas cronometradas de discriminación de colores.',
      'Ted Chiang, autor del relato "Story of Your Life", ha explicado en entrevistas que era consciente de que la versión fuerte de Sapir-Whorf no es científicamente sostenible. Sin embargo, la utilizó como una premisa de ciencia ficción "dura": tomó una idea científica real, la amplificó hasta sus consecuencias lógicas extremas, y exploró qué significaría para la experiencia humana. El resultado es una historia donde la lingüística se convierte en una puerta a la física y a la filosofía, demostrando que las mejores ideas de ciencia ficción nacen de la ciencia real, no de la fantasía arbitraria.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El lingüista Noam Chomsky propuso en 1957 la teoría de la Gramática Universal, que argumenta exactamente lo opuesto a Sapir-Whorf: que todas las lenguas humanas comparten una estructura profunda común y que las diferencias superficiales entre lenguas no afectan el pensamiento fundamental. Chomsky sostiene que la capacidad lingüística es un "órgano mental" innato, programado genéticamente. El debate entre relativismo lingüístico y universalismo gramatical continúa hasta hoy sin una resolución definitiva.' },
      { label: 'En la Película', icon: 'zap', text: 'Denis Villeneuve y el guionista Eric Heisserer consultaron con lingüistas reales para dar credibilidad a la representación de Sapir-Whorf en Arrival. La lingüista Jessica Coon, de la Universidad McGill, fue asesora durante la producción. Coon estudia las lenguas mayas, muchas de las cuales tienen estructuras ergativas que son poco familiares para hablantes de lenguas europeas. Su experiencia con sistemas gramaticales radicalmente diferentes ayudó a diseñar la metodología que Louise usa en pantalla para descifrar el lenguaje heptápodo.' },
    ],
    fact: 'El pueblo guugu yimithirr de Australia no utiliza términos relativos como "izquierda" o "derecha" para describir ubicaciones espaciales. En su lugar, emplean exclusivamente coordenadas cardinales absolutas: norte, sur, este y oeste. Un hablante de guugu yimithirr diría "la taza está al norte de tu mano" en lugar de "la taza está a tu derecha". El lingüista Stephen Levinson documentó en 2003 que estos hablantes mantienen una brújula interna activa en todo momento, incluso dentro de edificios cerrados, una habilidad cognitiva directamente vinculada a las exigencias de su sistema lingüístico.',
  },
  {
    id: 'escritura-tiempo',
    title: 'Sistemas de Escritura y Tiempo',
    color: '#3D3D3D',
    btnImage: '/assets/ciencia_arrival/infographic_m3/btn_escritura-tiempo.jpg',
    image: '/assets/ciencia_arrival/infographic_m3/hero_escritura-tiempo.jpg',
    content: [
      'Los sistemas de escritura humanos se despliegan en secuencia temporal: un lector procesa un carácter tras otro, una palabra tras otra, una línea tras otra. Esta linealidad de la escritura refleja y refuerza nuestra experiencia lineal del tiempo. El alfabeto latino, el árabe, el cirílico y el devanagari son todos sistemas que codifican sonidos (fonemas) en secuencias lineales de símbolos. Cada texto tiene un principio y un final definidos, igual que nuestra percepción del tiempo tiene un "antes" y un "después".',
      'Los sistemas logográficos como el chino presentan una relación diferente con la secuencia temporal. Cada carácter chino (hanzi) codifica un morfema completo, una unidad de significado, en un bloque visual que se percibe como una unidad simultánea. Un carácter como "休" (descanso) combina los componentes de "persona" (亻) y "árbol" (木), evocando la imagen de una persona apoyada contra un árbol. El significado emerge de la relación espacial entre los componentes, no de su orden secuencial.',
      'Los heptápodos de Arrival llevan esta idea al extremo con un sistema semasiográfico: un sistema de escritura que transmite significado sin codificar sonidos del habla. Los logogramas circulares de los heptápodos expresan oraciones completas de forma simultánea, con cada elemento semántico representado por variaciones en la curvatura, el grosor y las ramificaciones del trazo circular. No existe un punto donde la oración "comienza" ni donde "termina". El diseño de estos logogramas en la película fue creado por la artista Martine Bertrand y el diseñador de producción Patrice Vermette.',
      'En la historia de la escritura humana real, existen sistemas que se acercan a la semasiografía. Los quipus incas eran dispositivos de cuerdas anudadas que registraban información numérica y posiblemente narrativa sin codificar fonemas. Los investigadores Gary Urton y Carrie Brezine publicaron en 2005 en la revista Science un análisis de 21 quipus que reveló una estructura jerárquica de datos, similar a una base de datos moderna. Los nudos codificaban valores en un sistema decimal posicional, y los colores y la dirección de los hilos añadían información categórica.',
      'La notación musical occidental es otro ejemplo de un sistema que codifica el tiempo de manera no puramente lineal. Una partitura se lee de izquierda a derecha (linealmente), pero la dimensión vertical representa notas simultáneas (acordes). La duración de cada nota está codificada en su forma visual (negra, blanca, redonda), y los compases agrupan el tiempo en unidades regulares. Un director de orquesta lee la partitura completa verticalmente (todos los instrumentos a la vez) mientras avanza horizontalmente en el tiempo, combinando percepción simultánea y secuencial en un solo acto cognitivo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El disco de Festos, descubierto en 1908 en la isla de Creta, es un disco de arcilla de 15 cm de diámetro con 241 símbolos impresos en espiral en ambas caras. Data de aproximadamente 1700 a.C. y su escritura no ha sido descifrada. Los símbolos fueron impresos con sellos individuales, lo que lo convierte en el ejemplo más antiguo conocido de impresión con tipos móviles, unos 3,200 años antes de Gutenberg. Su estructura espiral sugiere una lectura que combina lo circular con lo secuencial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los investigadores en procesamiento visual han demostrado que el cerebro humano procesa los caracteres chinos y las letras alfabéticas utilizando circuitos neuronales parcialmente diferentes. Un estudio de 2008 publicado en NeuroImage por Liu y colaboradores mostró que la lectura de caracteres chinos activa con mayor intensidad el giro fusiforme medio bilateral, mientras que la lectura alfabética activa preferentemente el giro fusiforme izquierdo. Esto sugiere que el tipo de sistema de escritura que aprendes moldea físicamente la organización de tu corteza visual.' },
    ],
    fact: 'El sistema de escritura rongorongo de la Isla de Pascua (Rapa Nui) utiliza un método único llamado bustrófedon inverso: las líneas alternas se leen en direcciones opuestas, y además los caracteres de las líneas pares están rotados 180 grados. El lector debe girar la tablilla al final de cada línea para continuar leyendo. Este sistema fue documentado por primera vez por el obispo Tepano Jaussen en 1869 y permanece sin descifrar. Solo se conservan 26 objetos con inscripciones rongorongo en museos de todo el mundo.',
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En «Arrival», la revelación central es que los logogramas heptapod no tienen dirección temporal — un símbolo circular no tiene principio ni fin. Cuando Louise aprende a "pensar" en heptapod en lugar de solo leerlo, su percepción del tiempo cambia: empieza a experimentar el futuro como memorias. Esta es la representación cinematográfica más precisa del concepto Sapir-Whorf llevado al extremo: la escritura circular heptapod literalmente reorganiza cómo el cerebro procesa la causalidad temporal. El director Denis Villeneuve eligió no mostrar flashbacks versus flash-forwards — las mismas imágenes aparecen al principio y al final sin marcadores temporales, obligando al espectador a re-experimentar la película.' },
    ],
  },
  {
    id: 'tiempo-fisica',
    title: 'El Tiempo en la Física',
    color: '#4E4E4E',
    btnImage: '/assets/ciencia_arrival/infographic_m3/btn_tiempo-fisica.jpg',
    image: '/assets/ciencia_arrival/infographic_m3/hero_tiempo-fisica.jpg',
    content: [
      'La teoría del universo bloque (también llamada eternalismo) propone que pasado, presente y futuro son igualmente reales y coexisten como una estructura fija en el espacio-tiempo. Esta idea tiene sus raíces en la relatividad especial de Albert Einstein, publicada en 1905. Einstein demostró que no existe un "ahora" universal: dos observadores que se mueven a velocidades diferentes discrepan sobre qué eventos son simultáneos. Si no hay un presente universal compartido, la distinción entre pasado y futuro pierde su carácter absoluto.',
      'Hermann Minkowski, profesor de matemáticas que había enseñado a Einstein en Zúrich, formalizó esta idea en 1908 con el concepto del espacio-tiempo cuatridimensional. En la conferencia "Raum und Zeit" pronunciada en Colonia, Minkowski declaró: "De aquí en adelante, el espacio por sí mismo y el tiempo por sí mismo están condenados a desvanecerse en meras sombras, y solo una unión de ambos preservará una realidad independiente." El espacio-tiempo de Minkowski unifica tres dimensiones espaciales con una dimensión temporal en un continuo geométrico donde la vida de cada partícula es una "línea de mundo" fija.',
      'La dilatación temporal, predicha por la relatividad especial, ha sido verificada experimentalmente numerosas veces. En 1971, los físicos Joseph Hafele y Richard Keating colocaron relojes atómicos de cesio en vuelos comerciales que circunnavegaron la Tierra. Los relojes que viajaron hacia el este se retrasaron 59 ± 10 nanosegundos respecto a los relojes estacionarios, mientras que los que viajaron hacia el oeste se adelantaron 273 ± 7 nanosegundos. Estas cifras coincidieron con las predicciones de la relatividad dentro del margen de error experimental.',
      'La relatividad general de Einstein, publicada en 1915, añadió otro efecto: la gravedad también curva el tiempo. Cerca de un objeto masivo, el tiempo transcurre más lentamente. Los satélites GPS orbitan a 20,200 km de altitud donde la gravedad es más débil que en la superficie terrestre. Por efecto gravitacional, sus relojes se adelantan 45.85 microsegundos diarios. Por efecto de velocidad (14,000 km/h), se atrasan 7.2 microsegundos diarios. El efecto neto de 38.6 microsegundos diarios debe corregirse continuamente; sin esta corrección, el GPS acumularía errores de posición de más de 10 kilómetros por día.',
      'El físico Julian Barbour propuso en su libro "The End of Time" (1999) una posición aún más radical: el tiempo no existe como entidad fundamental. Lo que percibimos como el flujo del tiempo es una ilusión generada por la forma en que nuestros cerebros procesan configuraciones sucesivas del universo. Cada "instante" es una fotografía estática del estado del universo, y la sensación de movimiento temporal surge porque cada fotografía contiene recuerdos de las anteriores. La película Arrival se alinea parcialmente con esta visión: cuando Louise percibe el futuro, no "viaja" en el tiempo; simplemente accede a una estructura que siempre estuvo completa.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando su amigo Michele Besso murió en marzo de 1955, Einstein escribió en una carta a la familia de Besso: "Para nosotros, físicos creyentes, la distinción entre pasado, presente y futuro es solo una ilusión obstinadamente persistente." Einstein murió apenas un mes después, en abril de 1955. Esta frase no era una metáfora: Einstein creía genuinamente, basándose en su propia teoría, que el tiempo tal como lo experimentamos subjetivamente no refleja la estructura real del universo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las ecuaciones fundamentales de la física (las leyes de Newton, las ecuaciones de Maxwell, la ecuación de Schrödinger) son simétricas respecto al tiempo: funcionan igual si se ejecutan hacia adelante o hacia atrás. La "flecha del tiempo" que experimentamos, donde el pasado es fijo y el futuro es incierto, no aparece en las leyes fundamentales. La segunda ley de la termodinámica, que dice que la entropía siempre aumenta, proporciona una dirección temporal, pero el físico Roger Penrose ha argumentado que esto traslada el misterio: ¿por qué el Big Bang comenzó en un estado de entropía tan baja?' },
    ],
    fact: 'El astronauta Scott Kelly pasó 340 días a bordo de la Estación Espacial Internacional, que orbita a 27,600 km/h a 408 km de altitud. Cuando regresó a la Tierra en marzo de 2016, era 8.6 milisegundos más joven que su hermano gemelo idéntico, Mark Kelly, quien permaneció en la superficie terrestre. La "paradoja de los gemelos" de Einstein se verificó literalmente con estos dos hermanos astronautas. Scott viajó una fracción medible al futuro respecto a Mark, un efecto minúsculo pero físicamente real y cuantificable.',
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En «Arrival», el físico Ian Donnelly (Jeremy Renner) representa el punto de vista de la física del tiempo: para él, el tiempo es una dimensión matemática medible. Su contraste con Louise ilustra dos paradigmas. Para Ian, los heptapods conocen el futuro porque tienen acceso matemático a la dimensión temporal completa — como una ecuación diferencial donde pasado y futuro son igualmente accesibles. Para Louise, el conocimiento del futuro viene de una reestructuración cognitiva del lenguaje. La película no elige entre ambas: sugiere que son descripciones equivalentes del mismo fenómeno — el tiempo como una dimensión navegable, no como una flecha unidireccional.' },
    ],
  },
  {
    id: 'libre-albedrio',
    title: 'Libre Albedrío y Determinismo',
    color: '#6A7B8D',
    btnImage: '/assets/ciencia_arrival/infographic_m3/btn_libre-albedrio.jpg',
    image: '/assets/ciencia_arrival/infographic_m3/hero_libre-albedrio.jpg',
    content: [
      'Si el futuro ya existe como propone el universo bloque, ¿tenemos la capacidad de elegir? Este problema filosófico, conocido como el debate entre libre albedrío y determinismo, ha ocupado a pensadores durante más de dos milenios. Los estoicos griegos, como Crisipo de Solos en el siglo III a.C., ya argumentaban que todos los eventos están causalmente determinados por una cadena ininterrumpida de causas y efectos. Si el estado del universo en cualquier momento determina completamente su estado en el momento siguiente, entonces cada decisión que tomas estaba predeterminada desde el Big Bang.',
      'Los compatibilistas ofrecen una posición intermedia: el libre albedrío y el determinismo pueden coexistir. El filósofo Daniel Dennett argumenta en su obra "Freedom Evolves" (2003) que el libre albedrío no requiere escapar de la causalidad física, sino poseer la capacidad de procesar información, considerar alternativas y actuar según tus propios deseos y razonamiento. Bajo esta definición, una persona es "libre" cuando sus acciones reflejan sus valores y deliberaciones, incluso si esas deliberaciones son procesos físicos deterministas en el cerebro.',
      'En Arrival, Louise Banks encarna el dilema del compatibilismo de forma visceral. Al aprender el lenguaje heptápodo, Louise percibe su futuro completo: se casará con Ian Donnelly, tendrán una hija llamada Hannah, y Hannah morirá joven de una enfermedad. A pesar de conocer este futuro con certeza, Louise elige vivirlo. No intenta evitar el matrimonio ni prevenir el nacimiento de su hija. Esta decisión no es resignación pasiva sino una afirmación activa: el conocimiento del dolor futuro no anula el valor de la experiencia.',
      'El neurocientífico Benjamin Libet realizó en 1983 un experimento que sacudió el debate sobre el libre albedrío. Libet midió la actividad cerebral de participantes mientras decidían mover un dedo. Descubrió que el cerebro generaba un potencial eléctrico (llamado "potencial de preparación" o Bereitschaftspotential) unos 350 milisegundos antes de que los participantes reportaran ser conscientes de su decisión de moverse. Esto sugería que el cerebro "decidía" antes de que la persona fuera consciente de su propia decisión, cuestionando la idea de que la voluntad consciente causa nuestras acciones.',
      'El filósofo Theodore Sider, en su libro "Four-Dimensionalism" (2001), argumenta que los seres humanos no son objetos tridimensionales que se mueven a través del tiempo, sino entidades cuatridimensionales que se extienden a través del espacio-tiempo. Tu "yo" de ayer y tu "yo" de mañana son partes temporales de un mismo objeto tetradimensional, igual que tu mano izquierda y tu mano derecha son partes espaciales del mismo cuerpo. Bajo esta visión, la pregunta sobre el libre albedrío se transforma: no se trata de si puedes cambiar el futuro, sino de si tus deliberaciones presentes son parte constitutiva de la estructura total que eres.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El nombre "Hannah", la hija de Louise en la película, es un palíndromo: se lee igual de izquierda a derecha que de derecha a izquierda. Esta elección no es casual. Ted Chiang y los guionistas seleccionaron deliberadamente un nombre palindrómico para reflejar la naturaleza no lineal del tiempo en la historia. Así como el nombre funciona en ambas direcciones temporales, la vida de Hannah existe simultáneamente en el pasado y el futuro de Louise, como un reflejo simétrico en el espejo del tiempo.' },
      { label: 'En la Película', icon: 'zap', text: 'El momento más devastador de Arrival ocurre cuando Louise le revela a Ian que sabía desde el principio que Hannah moriría joven y que eligió tenerla de todas formas. Ian, incapaz de aceptar esta decisión, abandona a Louise. Este conflicto dramatiza dos respuestas filosóficas legítimas ante el determinismo: la de Louise (aceptar y abrazar la experiencia a pesar del sufrimiento conocido) y la de Ian (rechazar una realidad cuyo dolor parece evitable). Ninguna postura se presenta como correcta; ambas son comprensibles.' },
    ],
    fact: 'El físico John Wheeler propuso en 1978 el "experimento de elección retrasada" (delayed choice experiment), que fue verificado experimentalmente por Alain Aspect y colaboradores en 2007. En este experimento, la decisión del observador sobre cómo medir un fotón parece influir retroactivamente en el comportamiento pasado del fotón, como si la partícula "supiera" de antemano qué tipo de medición se haría. Wheeler concluyó: "Ningún fenómeno es un fenómeno real hasta que es un fenómeno observado." Este resultado no viola la causalidad, pero demuestra que la relación entre observación y realidad es más sutil de lo que nuestra intuición temporal sugiere.',
  },
  {
    id: 'story-of-your-life',
    title: '"Story of Your Life"',
    color: '#1B1B1B',
    btnImage: '/assets/ciencia_arrival/infographic_m3/btn_story-of-your-life.jpg',
    image: '/assets/ciencia_arrival/infographic_m3/hero_story-of-your-life.jpg',
    content: [
      'El relato "Story of Your Life" ("La historia de tu vida"), escrito por Ted Chiang y publicado en 1998 en la antología "Starlight 2", es la base literaria de la película Arrival. Chiang ha explicado en múltiples entrevistas que la idea central del relato surgió cuando estaba estudiando el principio variacional de Fermat, un concepto de óptica y física que describe cómo la luz siempre toma el camino que minimiza el tiempo de viaje entre dos puntos. Chiang se preguntó: ¿qué tipo de ser percibiría la realidad de forma variacional en lugar de causal?',
      'El principio de Fermat (formulado por Pierre de Fermat en 1662) establece que la luz viaja entre dos puntos siguiendo el camino que requiere el menor tiempo. Cuando la luz pasa del aire al agua, cambia de dirección (refracción) de manera que el trayecto total consume el tiempo mínimo posible. La formulación causal dice: "la luz golpea la superficie del agua y se desvía según la ley de Snell". La formulación variacional dice: "la luz conoce su destino y elige el camino más rápido". Ambas formulaciones son matemáticamente equivalentes, pero implican concepciones del tiempo radicalmente diferentes.',
      'Chiang conectó el principio variacional con la hipótesis de Sapir-Whorf para construir su relato. Si los heptápodos perciben la física de forma variacional (conociendo el inicio y el final de cada proceso simultáneamente), entonces su lenguaje reflejaría esa percepción. Y si la hipótesis Sapir-Whorf fuerte fuera verdad, un humano que aprendiera ese lenguaje comenzaría a percibir la realidad de la misma manera. Esta cadena de razonamiento, física variacional → lenguaje simultáneo → percepción no lineal del tiempo, es el motor intelectual del relato.',
      'En la historia original de Chiang, a diferencia de la película, no hay tensión militar ni amenaza de guerra. El conflicto es interno y filosófico. La protagonista narra en segunda persona, dirigiéndose directamente a su hija: "Yo sé cómo va a terminar tu vida." La narrativa alterna entre el proceso de descifrar el lenguaje alienígena y los "recuerdos" del futuro con su hija, que van desde momentos cotidianos hasta la revelación de su enfermedad terminal. La estructura del texto replica la experiencia no lineal que describe.',
      'El relato ganó el premio Nebula en 2000 y el premio Sturgeon en 1999, dos de los galardones más prestigiosos de la ciencia ficción anglófona. La adaptación cinematográfica, dirigida por Denis Villeneuve con guion de Eric Heisserer, se estrenó en noviembre de 2016 y recaudó más de 203 millones de dólares en taquilla mundial. La película fue nominada a ocho premios de la Academia y ganó el Óscar a Mejor Edición de Sonido. Ted Chiang ha declarado que la adaptación capturó el espíritu emocional de su relato, aunque reconoce que las tramas militares y geopolíticas añadidas eran necesarias para el formato cinematográfico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Ted Chiang ha publicado menos de 20 relatos en más de 30 años de carrera, pero casi todos han ganado premios. Su colección "Stories of Your Life and Others" (2002, Tor Books) contiene ocho relatos. Su segunda colección "Exhalation: Stories" (2019, Knopf) contiene nueve. Chiang trabaja como redactor técnico en la industria del software y nunca se ha dedicado a la escritura a tiempo completo. En una entrevista de 2019 con la revista Electric Literature, explicó que escribe solo cuando tiene una idea que lo entusiasma lo suficiente como para dedicarle años de investigación y redacción.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El principio variacional de Fermat es un caso particular de un marco más amplio llamado "principio de mínima acción" o principio de Hamilton, formulado por William Rowan Hamilton en 1834. Este principio establece que la trayectoria real de cualquier sistema físico es aquella que minimiza (o hace estacionaria) una cantidad llamada "acción". Toda la física moderna, incluyendo la mecánica cuántica y la teoría cuántica de campos, se formula en términos variacionales. Richard Feynman demostró en 1948 que en mecánica cuántica, una partícula "explora" todos los caminos posibles simultáneamente y la trayectoria observada es el resultado de la interferencia de todas estas posibilidades.' },
    ],
    fact: 'Pierre de Fermat formuló su principio de tiempo mínimo de la luz en 1662, pero la primera formulación variacional de la mecánica fue desarrollada por Leonhard Euler en 1744 y Joseph-Louis Lagrange en 1788. La formulación lagrangiana de la mecánica clásica reescribe las leyes de Newton sin fuerzas ni aceleraciones, utilizando solo energía y el principio de mínima acción. Esta reformulación, aparentemente redundante en el siglo XVIII, resultó ser la base de toda la física teórica moderna: la relatividad general, el modelo estándar de partículas y la teoría de cuerdas se construyen sobre principios variacionales, exactamente como describe Ted Chiang en su relato.',
    expandables: [
      { label: 'En la Película', icon: 'zap', text: '«Arrival» está basada en el cuento «Story of Your Life» de Ted Chiang (1998), que exploró la hipótesis Sapir-Whorf de forma científicamente rigurosa dos décadas antes de la película. En el cuento, la lingüista Louise aprende el idioma heptapod y gradualmente adquiere la capacidad de percibir el futuro como un heptapod: de forma no-secuencial. La película mantiene el corazón emocional del cuento — Louise sabe que su hija morirá joven, pero elige tenerla de todas formas, porque el futuro que conoce no es una prisión sino una realidad que acepta plenamente. Ted Chiang, quien es ingeniero de software de día y escritor de ciencia ficción de noche, fue asesor en la producción de la película.' },
    ],
  },
];

// ─── Linguistic Fog Particle Field (Canvas Background) ──────────────────────
function LinguisticFogField() {
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
      hue: Math.random() > 0.5 ? '139,157,175' : '106,123,141', // fog gray tones
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

// ─── Arrival M3 Header ──────────────────────────────────────────────────────
function ArrivalTimeHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(139,157,175,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#arrM3Grad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#8B9DAF','#7A8C9E','#2C2C2C','#3D3D3D','#4E4E4E','#6A7B8D','#1B1B1B'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central logogram icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#8B9DAF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="8" fill="none" stroke="#8B9DAF" strokeWidth="1" opacity="0.4" />
        <circle cx="300" cy="30" r="3" fill="#8B9DAF" opacity="0.5" />
        <defs>
          <linearGradient id="arrM3Grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,157,175,0.2)" />
            <stop offset="50%" stopColor="rgba(139,157,175,0.9)" />
            <stop offset="100%" stopColor="rgba(139,157,175,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#8B9DAF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL TIEMPO Y EL LENGUAJE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(139,157,175,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LINGÜÍSTICA · FÍSICA · FILOSOFÍA</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ────────────────────────────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(139,157,175,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
          layoutId="activeDotArrivalM3"
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

// ─── Expandable Section with Random Direction ─────────────────────────────────
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

// ─── Magazine-Style Content Panel ───────────────────────────────────────────
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

        {/* ─── Video Section ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
          </div>
        )}

        {/* Fact Box */}
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
      border: '1px solid rgba(139,157,175,0.15)',
    }}>
      <Star size={14} style={{ color: '#8B9DAF', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #8B9DAF, #6A7B8D)', borderRadius: '3px', boxShadow: '0 0 8px rgba(139,157,175,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#8B9DAF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ─────────────────────────────────────────────
export default function InteractiveInfographic_ArrivalM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,15,20,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/arrival/arrival_m3.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(139,157,175,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <LinguisticFogField />

      <ArrivalTimeHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(139,157,175,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(139,157,175,0.08)', borderRadius: '16px',
              border: '1px solid rgba(139,157,175,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#8B9DAF', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado la relación entre Tiempo y Lenguaje!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Viajero Temporal
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
