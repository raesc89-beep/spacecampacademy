'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ─── SVG Decorative Elements (Alien Linguistics themed) ────────────────────
function DecoLogogram({ size = 70, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Circular logogram ring */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Ink splotch marks */}
      <path d="M20 30 Q25 18 30 22 Q35 26 40 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M22 38 Q28 42 34 36 Q38 32 42 38" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Dots like ink splatter */}
      <circle cx="25" cy="25" r="1.5" fill={color} opacity="0.4" />
      <circle cx="36" cy="28" r="1" fill={color} opacity="0.5" />
      <circle cx="30" cy="40" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoFilmReel({ size = 70, color = '#7A8C9E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Outer reel */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
      {/* Sprocket holes */}
      {[0,45,90,135,180,225,270,315].map((a,i) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={i} cx={30+16*Math.cos(rad)} cy={30+16*Math.sin(rad)} r="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />;
      })}
    </svg>
  );
}

function DecoSoundwave({ size = 80, color = '#6A7B8D', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Sound wave bars */}
      {[10,18,26,34,42,50,58,66].map((x,i) => {
        const h = [8,16,22,12,20,14,18,10][i];
        return <rect key={i} x={x} y={20-h/2} width="3" height={h} rx="1.5" fill={color} opacity={0.3 + i*0.05} />;
      })}
      {/* Connecting curve */}
      <path d="M8 20 Q20 8 30 20 Q40 32 50 20 Q60 8 72 20" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoBookOpen({ size = 60, color = '#4E4E4E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Book spine */}
      <line x1="30" y1="12" x2="30" y2="48" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Left page */}
      <path d="M30 14 Q20 12 10 16 L10 44 Q20 40 30 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Right page */}
      <path d="M30 14 Q40 12 50 16 L50 44 Q40 40 30 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Text lines left */}
      <line x1="15" y1="22" x2="26" y2="22" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="15" y1="27" x2="26" y2="27" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="15" y1="32" x2="24" y2="32" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Text lines right */}
      <line x1="34" y1="22" x2="45" y2="22" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="34" y1="27" x2="45" y2="27" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="34" y1="32" x2="43" y2="32" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBrainWave({ size = 70, color = '#3D3D3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Brain silhouette */}
      <path d="M22 35 Q15 30 16 22 Q17 14 24 12 Q30 10 34 12 Q40 14 42 20 Q44 28 38 34 Q34 38 30 38 Q26 38 22 35Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Neural connections */}
      <path d="M25 20 Q30 16 35 20" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M22 26 Q28 22 34 26" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M24 32 Q30 28 36 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Signal dots */}
      <circle cx="20" cy="44" r="1" fill={color} opacity="0.4" />
      <circle cx="30" cy="46" r="1.5" fill={color} opacity="0.5" />
      <circle cx="40" cy="44" r="1" fill={color} opacity="0.4" />
      {/* Wave emanating */}
      <path d="M18 44 Q22 50 30 50 Q38 50 42 44" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoHeartPulse({ size = 70, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* Heart shape */}
      <path d="M35 38 Q20 28 12 20 Q4 12 12 8 Q20 4 28 12 L35 20 L42 12 Q50 4 58 8 Q66 12 58 20 Q50 28 35 38Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Pulse line through */}
      <path d="M5 22 L20 22 L25 14 L30 30 L35 18 L40 26 L45 22 L65 22" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'denis-villeneuve': [DecoFilmReel, DecoLogogram, DecoSoundwave],
  'amy-adams-louise': [DecoBrainWave, DecoHeartPulse, DecoFilmReel],
  'impacto-cultural': [DecoSoundwave, DecoFilmReel, DecoLogogram],
  'ted-chiang-autor': [DecoBookOpen, DecoBrainWave, DecoLogogram],
  'linguistica-despues': [DecoLogogram, DecoBookOpen, DecoSoundwave],
  'ciencia-ficcion-intelectual': [DecoFilmReel, DecoBrainWave, DecoBookOpen],
  'mensaje-final': [DecoHeartPulse, DecoLogogram, DecoBrainWave],
};

// ─── Content Data ────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Chiang, T. (2002). Stories of Your Life and Others. Tor Books',
  'Heisserer, E. (2016). Arrival: Screenplay. Paramount Pictures / FilmNation Entertainment',
  'Villeneuve, D. (2016). Arrival: Director\'s Commentary and Press Interviews. 21 Laps Entertainment',
  'Sapir, E. (1929). The Status of Linguistics as a Science. Language, 5(4), 207-214',
  'Slaughter, M. & Maron, D. (2017). Arrival and the Science of Language. Science & Film, Museum of the Moving Image / Columbia University',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'denis-villeneuve',
    title: 'Denis Villeneuve',
    color: '#8B9DAF',
    btnImage: '/assets/arrival/arrival_m6.png',
    image: '/assets/arrival/arrival_m6.png',
    content: [
      'Denis Villeneuve nació el 3 de octubre de 1967 en Gentilly, Quebec, Canadá. Desde joven mostró un interés marcado por el cine y la narrativa visual, participando en concursos de cortometrajes antes de ingresar a la Universidad de Quebec en Montreal, donde estudió cine. Su primer largo reconocido, Un 32 août sur terre (1998), fue seleccionado para el Festival de Cannes, y estableció su estilo visual: tomas largas, silencios cargados de tensión y personajes atrapados en dilemas morales que no tienen respuesta sencilla.',
      'La película que puso a Villeneuve en el mapa global fue Incendies (2010), basada en la obra teatral de Wajdi Mouawad. Este drama sobre gemelos que descubren la historia oculta de su madre durante la guerra civil libanesa fue nominado al Óscar como Mejor Película en Lengua Extranjera. La cinta demostró la capacidad de Villeneuve para entrelazar líneas temporales de manera que el espectador reconstruye la historia como un rompecabezas emocional, una técnica que perfeccionaría más adelante en Arrival con la narrativa no lineal de Louise Banks.',
      'Antes de dirigir Arrival en 2016, Villeneuve exploró el thriller psicológico con Prisoners (2013) y Enemy (2013), y el thriller de acción con Sicario (2015). Cada proyecto afinó herramientas que resultaron esenciales para Arrival: Prisoners le enseñó a sostener tensión durante más de dos horas; Enemy le dio práctica en narrativas con significados ocultos que se revelan en el desenlace; y Sicario demostró su dominio de la fotografía cinematográfica con el colaborador Roger Deakins, estableciendo composiciones que transmiten aislamiento y vulnerabilidad.',
      'Para Arrival, Villeneuve trabajó con el director de fotografía Bradford Young, nominado al Óscar por su trabajo en la película. Villeneuve eligió rodar en locaciones reales en Montreal, usando la niebla natural y los paisajes canadienses para crear la atmósfera alienígena sin depender excesivamente de efectos digitales. Las naves heptápodas, diseñadas por el artista conceptual Carlos Huante, fueron concebidas como piedras lisas y negras flotando verticalmente, un diseño que Villeneuve describió como inspirado en la escultura de Constantin Brancusi y en los asteroides reales fotografiados por sondas espaciales.',
      'Después de Arrival, Villeneuve dirigió Blade Runner 2049 (2017) y Dune (2021, 2024), consolidándose como uno de los directores de ciencia ficción más respetados del siglo XXI. Su enfoque se distingue por tratar la ciencia ficción no como espectáculo visual sino como vehículo filosófico. En entrevistas con la BBC en 2016, Villeneuve explicó que considera el género como el mejor medio para explorar preguntas sobre la condición humana, y que Arrival fue su proyecto más personal porque aborda el tema del tiempo, la pérdida y la decisión de amar a pesar del sufrimiento inevitable.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Villeneuve rechazó dirigir varias películas de superhéroes antes de aceptar Arrival. En entrevistas de 2016 con Deadline Hollywood, explicó que buscaba historias donde la ciencia ficción sirviera para explorar la emoción humana, no solo para destruir ciudades. Cuando leyó el guion de Eric Heisserer, basado en el relato de Ted Chiang, dijo que lloró al terminar la primera lectura porque la historia conectaba la lingüística con el duelo de una madre de una forma que nunca había visto en el cine.' },
      { label: 'En la Película', icon: 'zap', text: 'Villeneuve tomó una decisión narrativa clave: presentar los "flashbacks" de Louise con su hija Hannah al principio de la película, haciendo que el espectador asuma que son recuerdos del pasado. Solo al final se revela que son visiones del futuro. Esta técnica funciona porque Villeneuve confía en la capacidad del espectador para reinterpretar toda la película desde una nueva perspectiva, una apuesta que pocos directores comerciales se atreven a hacer con un presupuesto de 47 millones de dólares.' },
    ],
    fact: 'Villeneuve insistió en que la música de Arrival no utilizara orquestas convencionales. El compositor islandés Jóhann Jóhannsson creó la banda sonora usando voces humanas procesadas electrónicamente, grabaciones invertidas y sonidos vocales que imitaban patrones de comunicación no humanos. La pieza "On the Nature of Daylight" de Max Richter, que abre y cierra la película, no estaba en la banda sonora original, pero Villeneuve la añadió durante la edición porque capturaba la melancolía temporal que buscaba.',
  },
  {
    id: 'amy-adams-louise',
    title: 'Amy Adams como Louise Banks',
    color: '#7A8C9E',
    btnImage: '/assets/arrival/arrival_m6.png',
    image: '/assets/arrival/arrival_m6.png',
    content: [
      'Amy Lou Adams, nacida el 20 de agosto de 1974 en Vicenza, Italia (en una base militar estadounidense), ha sido nominada a seis premios Óscar a lo largo de su carrera. Para el papel de Louise Banks en Arrival, Adams estudió los mannerismos de lingüistas reales y asistió a conferencias de lingüística en la Universidad McGill de Montreal durante la preproducción de la película, según declaraciones del productor Dan Levine al medio Collider en noviembre de 2016.',
      'Louise Banks es un personaje construido sobre una dualidad que atraviesa toda la película: es simultáneamente una científica rigurosa y una madre que procesa un duelo profundo. Adams abordó esta dualidad rechazando los estereotipos de "científica fría" o "madre emocional" por separado. En entrevistas con The Hollywood Reporter, Adams explicó que para ella Louise es una mujer que usa el lenguaje como herramienta de conexión porque entiende, mejor que nadie, lo que significa no poder comunicarse con alguien que amas.',
      'La actuación de Adams se basa en gestos contenidos y microexpresiones. Cuando Louise toca por primera vez la barrera que la separa de los heptápodos, Adams transmite miedo, curiosidad y determinación sin pronunciar una sola palabra. Esta escena, rodada en una sola toma de 47 segundos según los registros del director de fotografía Bradford Young, demuestra la técnica que Adams desarrolló durante años en películas como Doubt (2008), The Master (2012) y American Hustle (2013).',
      'El arco narrativo de Louise presenta un dilema ético que no tiene equivalente en la ciencia ficción convencional. Cuando Louise comprende el lenguaje heptápodo y adquiere la capacidad de percibir el tiempo de forma no lineal, descubre que su futura hija Hannah morirá joven de una enfermedad rara. A pesar de este conocimiento, Louise elige tener a Hannah, aceptar la alegría y el dolor como inseparables. Adams describió esta decisión como el núcleo emocional de toda la película en declaraciones al programa Fresh Air de NPR en noviembre de 2016.',
      'A pesar de las seis nominaciones al Óscar previas de Adams y el reconocimiento unánime de la crítica por su trabajo en Arrival (con 94% en Rotten Tomatoes), la Academia no la nominó en la categoría de Mejor Actriz para la ceremonia de 2017. Esta omisión fue considerada una de las mayores sorpresas de la temporada de premios. El crítico de cine David Ehrlich del medio IndieWire la calificó como "la mejor actuación del año en cualquier género", y la crítica Manohla Dargis del New York Times escribió que Adams logró "hacer visible el proceso invisible del pensamiento humano".'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para preparar su papel, Adams pasó tiempo con Jessica Coon, profesora de lingüística en la Universidad McGill, quien sirvió como consultora de la película. Coon enseñó a Adams los fundamentos de la morfología y la sintaxis, y le mostró cómo los lingüistas de campo trabajan cuando documentan lenguas no escritas por primera vez. Adams tomó notas detalladas que luego incorporó en la forma en que Louise escribe en la pizarra durante la película.' },
      { label: 'En la Película', icon: 'zap', text: 'Villeneuve reveló que filmó las escenas de Louise con su hija Hannah antes que las escenas con los heptápodos. Esta decisión permitió que Adams llevara el peso emocional de esas escenas a sus interacciones con los aliens. Cuando Louise mira a los heptápodos por primera vez, el público ve curiosidad científica, pero Adams actuó esa escena pensando en una madre que ya conoce la pérdida. Este detalle de producción explica la profundidad emocional que distingue a Arrival de otras películas de primer contacto.' },
    ],
    fact: 'El nombre de la hija de Louise, Hannah, es un palíndromo: se lee igual de izquierda a derecha que de derecha a izquierda. Ted Chiang eligió este nombre deliberadamente en su relato original de 1998 como un símbolo de la percepción circular del tiempo que Louise adquiere al aprender el idioma heptápodo. En el relato, Chiang menciona que Louise reconoce este detalle y lo encuentra apropiado. Es un ejemplo de cómo cada elemento narrativo de la historia refuerza el tema central de la circularidad temporal.',
  },
  {
    id: 'impacto-cultural',
    title: 'El Impacto Cultural',
    color: '#4E4E4E',
    btnImage: '/assets/arrival/arrival_m6.png',
    image: '/assets/arrival/arrival_m6.png',
    content: [
      'Arrival se estrenó el 11 de noviembre de 2016 en Estados Unidos y recaudó 203 millones de dólares en taquilla mundial contra un presupuesto de producción de 47 millones, según datos de Box Office Mojo. Este rendimiento la convirtió en un éxito comercial poco habitual para una película de ciencia ficción sin secuencias de acción convencionales, sin un antagonista definido y con una lingüista como protagonista. La distribuidora Paramount Pictures había expresado dudas internas sobre el potencial comercial de la película, según reportó The Wrap en diciembre de 2016.',
      'La película recibió ocho nominaciones a los premios Óscar en la ceremonia de febrero de 2017: Mejor Película, Mejor Director, Mejor Guion Adaptado, Mejor Fotografía, Mejor Montaje, Mejor Diseño de Sonido, Mejor Edición de Sonido y Mejor Banda Sonora. Ganó en la categoría de Mejor Edición de Sonido, un reconocimiento al trabajo del equipo de Sylvain Bellemare, quien creó los sonidos de comunicación heptápoda usando grabaciones de ballenas jorobadas, elefantes y voces humanas procesadas con software de síntesis granular.',
      'El impacto cultural de Arrival se extendió más allá del entretenimiento. La película generó una conversación pública sobre la hipótesis de Sapir-Whorf, un concepto lingüístico que sostiene que la estructura del idioma que hablamos influye en cómo pensamos y percibimos la realidad. Artículos en medios como The Atlantic, Wired y Scientific American analizaron la base científica de esta hipótesis tras el estreno. Google Trends registró un aumento del 340% en búsquedas del término "Sapir-Whorf hypothesis" durante noviembre y diciembre de 2016.',
      'Arrival llegó a las pantallas durante un período de tensión geopolítica marcado por las elecciones presidenciales estadounidenses de 2016 y el referéndum del Brexit en el Reino Unido. Críticos como A.O. Scott del New York Times y Peter Bradshaw del Guardian señalaron que el mensaje central de la película, que la comunicación y la cooperación internacional son más efectivas que el aislamiento y la confrontación militar, resonaba directamente con el clima político del momento. La película muestra cómo doce naciones deben cooperar para descifrar el mensaje heptápodo.',
      'En el ámbito académico, Arrival se convirtió en material de estudio en departamentos de lingüística, filosofía y estudios cinematográficos. La Universidad de Columbia, a través de su programa Science & Film del Museo de la Imagen en Movimiento, publicó un análisis detallado de la película que incluía entrevistas con lingüistas computacionales y neurocientíficos. La profesora Jessica Coon de McGill, consultora de la película, fue invitada a dar conferencias en más de 30 universidades entre 2017 y 2019 sobre la intersección entre lingüística y ciencia ficción, según registros de su página académica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los logogramas heptápodos que aparecen en la película fueron diseñados por la artista Martine Bertrand y el diseñador de producción Patrice Vermette. Cada logograma fue pintado a mano con tinta sobre papel, luego escaneado y animado digitalmente. Se crearon más de 100 logogramas diferentes, cada uno con significados específicos que la artista documentó en un léxico interno de producción. Algunos fans han intentado descifrar y aprender este sistema de escritura desde el estreno de la película.' },
      { label: 'En la Película', icon: 'zap', text: 'La escena en la que China amenaza con atacar las naves heptápodas y las naciones cortan comunicación entre sí fue añadida por el guionista Eric Heisserer para reflejar dinámicas geopolíticas reales. En el relato original de Ted Chiang no hay conflicto militar. Heisserer explicó en una entrevista con Creative Screenwriting en 2016 que necesitaba un mecanismo de tensión cinematográfica, y que la amenaza de incomunicación entre países era más perturbadora que cualquier arma, porque en la lógica de la película, dejar de hablar es el acto más destructivo posible.' },
    ],
    fact: 'Arrival fue la primera película de ciencia ficción nominada a Mejor Película en los Óscar desde Gravity (2013) y la primera centrada en la comunicación lingüística en recibir esa nominación. Según un análisis de la revista Variety publicado en enero de 2017, solo el 4% de las películas nominadas a Mejor Película entre 2000 y 2016 pertenecían al género de ciencia ficción, lo que demuestra el sesgo histórico de la Academia contra el género a pesar de su popularidad comercial y su capacidad para abordar temas filosóficos profundos.',
  },
  {
    id: 'ted-chiang-autor',
    title: 'Ted Chiang: El Autor',
    color: '#6A7B8D',
    btnImage: '/assets/arrival/arrival_m6.png',
    image: '/assets/arrival/arrival_m6.png',
    content: [
      'Ted Chiang nació en 1967 en Port Jefferson, Nueva York, hijo de inmigrantes chinos. Estudió informática en la Universidad Brown, donde se graduó en 1989. A diferencia de la mayoría de los escritores de ciencia ficción, Chiang nunca ha sido escritor a tiempo completo. Durante más de dos décadas, trabajó como redactor técnico para empresas de software en Seattle, escribiendo manuales y documentación técnica. Esta formación se refleja en la claridad y precisión de su prosa, que evita la ornamentación en favor de la exactitud conceptual.',
      'Su relato "Story of Your Life", publicado en 1998 en la antología Starlight 2 editada por Patrick Nielsen Hayden, ganó los premios Nebula y Theodore Sturgeon. La historia presenta a Louise Banks, una lingüista que aprende a comunicarse con extraterrestres y, en el proceso, adquiere su percepción no lineal del tiempo. Chiang se inspiró en el principio variacional de la física, específicamente en el principio de Fermat sobre la trayectoria de la luz, para construir la lógica interna del idioma heptápodo.',
      'La producción literaria de Chiang es notablemente reducida en volumen pero consistente en calidad. Ha publicado menos de 20 relatos en más de 30 años de carrera, pero ha ganado cuatro premios Nebula, cuatro Hugo, cuatro Locus y un premio de la British Science Fiction Association. Su colección Stories of Your Life and Others (2002, Tor Books) y su segunda colección Exhalation: Stories (2019, Knopf) son consideradas obras de referencia en el género. El crítico literario James Wood, del New Yorker, lo describió como "el escritor de ciencia ficción más dotado de su generación".',
      'Otros relatos de Chiang exploran temas que complementan las ideas de "Story of Your Life". "Tower of Babylon" (1990), su primer relato publicado, ganó el premio Nebula y reimagina la torre de Babel como una estructura que conecta la Tierra con el cielo. "Understand" (1991) examina qué ocurre cuando la inteligencia humana se amplifica artificialmente hasta niveles sobrehumanos. "The Truth of Fact, the Truth of Feeling" (2013) analiza cómo la tecnología de registro perfecto de memorias cambiaría las relaciones humanas y nuestra relación con la verdad.',
      'Chiang ha expresado escepticismo sobre la inteligencia artificial generativa en ensayos publicados en el New Yorker en 2023, argumentando que los modelos de lenguaje grandes no comprenden el significado sino que manipulan patrones estadísticos. Esta posición es coherente con los temas de su ficción, donde el lenguaje y la comprensión genuina son fundamentales. En entrevistas con el medio Wired en 2016, Chiang explicó que vendió los derechos de "Story of Your Life" con la condición de que la adaptación respetara la idea central: que aprender un idioma transforma la percepción de quien lo aprende, no solo su capacidad de comunicarse.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Chiang ha declarado que escribe cada relato como si fuera un experimento mental filosófico. Para "Story of Your Life", estudió durante meses el principio de Fermat y el cálculo variacional para asegurarse de que la física detrás de la percepción temporal de los heptápodos fuera matemáticamente coherente. En una charla en la Universidad de Washington en 2017, Chiang explicó que le tomó más tiempo entender la física que escribir el relato, y que descartó tres versiones previas porque no lograba hacer que la ciencia y la emoción funcionaran juntas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El principio de Fermat, central en el relato de Chiang, establece que la luz siempre viaja por el camino que minimiza el tiempo de trayecto. Esto implica que la luz "conoce" su destino antes de partir, lo cual sugiere una causalidad teleológica (orientada hacia un fin) en lugar de la causalidad secuencial (causa → efecto) que experimentamos los humanos. Chiang usó esta idea física real para construir un idioma ficticio cuya gramática refleja esta percepción simultánea del pasado y el futuro.' },
    ],
    fact: 'Ted Chiang tardó cinco años en escribir "Story of Your Life". En una entrevista con Electric Literature en 2016, explicó que la parte más difícil fue encontrar la estructura narrativa correcta: necesitaba una forma de contar la historia que hiciera sentir al lector la experiencia de la percepción no lineal del tiempo, no solo explicarla intelectualmente. La solución fue alternar entre la narración en pasado (la llegada de los heptápodos) y la narración en futuro (la vida de Hannah), usando la segunda persona para las secciones dirigidas a Hannah.',
  },
  {
    id: 'linguistica-despues',
    title: 'Lingüística Después de Arrival',
    color: '#3D3D3D',
    btnImage: '/assets/arrival/arrival_m6.png',
    image: '/assets/arrival/arrival_m6.png',
    content: [
      'El estreno de Arrival en noviembre de 2016 generó un aumento medible en el interés público por la lingüística. La Linguistic Society of America (LSA) reportó un incremento del 15% en asistencia a su reunión anual de enero de 2017 en comparación con 2016, y atribuyó parte de ese crecimiento al efecto cultural de la película. Universidades como MIT, Stanford y la Universidad de Edimburgo registraron aumentos en solicitudes de ingreso a programas de lingüística durante el ciclo de admisión 2017-2018, según datos publicados por The Chronicle of Higher Education.',
      'La profesora Jessica Coon de la Universidad McGill, quien sirvió como consultora lingüística de la película, se convirtió en una figura pública inesperada. Antes de Arrival, Coon era una investigadora especializada en lenguas mayas, particularmente el chol y el mam, con publicaciones en revistas como Linguistic Inquiry y Natural Language & Linguistic Theory. Tras el estreno, fue entrevistada por más de 50 medios internacionales y dio conferencias públicas sobre lingüística de campo en instituciones que normalmente no invitan a lingüistas académicos.',
      'El concepto de la hipótesis de Sapir-Whorf, central en la trama de Arrival, experimentó un resurgimiento en la investigación académica. Esta hipótesis, propuesta por los lingüistas Edward Sapir y Benjamin Lee Whorf en la primera mitad del siglo XX, plantea que la estructura del idioma que hablamos influye en nuestra percepción de la realidad. La versión "fuerte" de la hipótesis (que el idioma determina el pensamiento) ha sido mayoritariamente descartada, pero la versión "débil" (que el idioma influye en la cognición) cuenta con evidencia experimental creciente.',
      'Investigaciones publicadas después del estreno de Arrival reforzaron aspectos de la hipótesis débil. Un estudio de Panos Athanasopoulos y Emanuel Bylund publicado en la revista Scientific Reports en 2017 demostró que hablantes bilingües de sueco e español perciben la duración del tiempo de forma diferente dependiendo del idioma que estén usando. En sueco, el tiempo se describe en términos de longitud (un día "largo"); en español, en términos de cantidad (un día "grande"). Los participantes bilingües estimaban duraciones temporales de manera distinta según el idioma en que recibían las instrucciones.',
      'La lingüística computacional también se benefició de la visibilidad que Arrival proporcionó al campo. Empresas como Google DeepMind y Meta AI reportaron un aumento en solicitudes de empleo para roles de procesamiento de lenguaje natural en 2017. El campo, que trabaja en traducción automática, análisis de sentimiento y generación de texto, encontró en Arrival una referencia cultural que facilitó la comunicación de su trabajo a audiencias no especializadas. La idea de que descifrar un idioma desconocido requiere tanto ciencia como intuición cultural resonó con los desafíos reales del procesamiento de lenguaje natural.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Después de Arrival, varias universidades crearon cursos que usaban la película como material didáctico. La Universidad de Pennsylvania ofreció un seminario titulado "Language and Mind: The Linguistics of Arrival" en su departamento de lingüística. La Universidad de Melbourne creó un curso introductorio que usaba clips de la película para explicar conceptos como morfología, fonología y análisis gramatical. Estos cursos reportaron tasas de inscripción superiores al promedio departamental.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La hipótesis de Sapir-Whorf tiene evidencia experimental parcial. Los hablantes del pueblo pirahã de la Amazonía brasileña, cuyo idioma carece de términos numéricos precisos (solo tienen palabras para "pocos" y "muchos"), muestran dificultades consistentes en tareas de conteo exacto, según investigaciones de Peter Gordon publicadas en Science en 2004. Los hablantes de guugu yimithirr, una lengua aborigen australiana que usa coordenadas cardinales (norte, sur) en lugar de izquierda/derecha, mantienen una orientación espacial más precisa que los hablantes de inglés.' },
    ],
    fact: 'El efecto más duradero de Arrival en la lingüística puede ser la normalización de la disciplina en la cultura popular. Antes de 2016, la lingüística rara vez aparecía en películas o series de televisión, y cuando lo hacía, los lingüistas solían ser representados como traductores o profesores excéntricos. Arrival presentó a una lingüista como la heroína que salva al mundo, y lo hizo mostrando el trabajo lingüístico real: análisis de patrones, formulación de hipótesis, prueba iterativa y documentación sistemática de un sistema de comunicación desconocido.',
  },
  {
    id: 'ciencia-ficcion-intelectual',
    title: 'Ciencia Ficción Intelectual',
    color: '#2C2C2C',
    btnImage: '/assets/arrival/arrival_m6.png',
    image: '/assets/arrival/arrival_m6.png',
    content: [
      'Arrival pertenece a una corriente de ciencia ficción cinematográfica que surgió en la década de 2010 y que prioriza las ideas científicas y filosóficas sobre los efectos especiales y la acción. Esta corriente incluye películas como Gravity (2013, dirigida por Alfonso Cuarón), Interstellar (2014, dirigida por Christopher Nolan), Ex Machina (2014, dirigida por Alex Garland) y The Martian (2015, dirigida por Ridley Scott). Cada una abordó un campo científico específico con rigor: la física orbital, la relatividad general, la inteligencia artificial y la botánica/ingeniería, respectivamente.',
      'Lo que distingue a Arrival dentro de esta corriente es que su campo científico central, la lingüística, es una ciencia social, no una ciencia natural o una ingeniería. Mientras Interstellar se basa en ecuaciones de la relatividad general verificadas por el físico Kip Thorne (premio Nobel 2017) y Ex Machina explora el test de Turing propuesto en 1950, Arrival plantea que la herramienta más poderosa para el primer contacto extraterrestre no es un acelerador de partículas ni un algoritmo de inteligencia artificial, sino la capacidad humana de aprender un idioma nuevo y comprender una cultura diferente.',
      'Esta elección refleja una tendencia en la ciencia ficción literaria que el cine tardó décadas en adoptar. Autores como Ursula K. Le Guin, con The Left Hand of Darkness (1969), y Samuel R. Delany, con Babel-17 (1966), habían explorado la relación entre lenguaje, cultura y percepción mucho antes de que el cine de ciencia ficción considerara estos temas comercialmente viables. La novela Babel-17 de Delany, en particular, anticipó la premisa de Arrival al presentar un idioma alienígena que altera la cognición de quien lo aprende.',
      'El éxito comercial de esta corriente intelectual modificó la estrategia de los estudios de Hollywood. Según un análisis de la consultora Exhibitor Relations publicado en 2018, las películas de ciencia ficción "basadas en ideas" recaudaron un promedio de 2.8 veces su presupuesto entre 2013 y 2017, un rendimiento comparable al de las franquicias de superhéroes y considerablemente superior al de los blockbusters de ciencia ficción basados en acción que no pertenecían a franquicias establecidas.',
      'Arrival también demostró que el cine de ciencia ficción puede funcionar como divulgación científica efectiva. Después de Interstellar, las búsquedas de "agujero negro" en Google Scholar aumentaron un 24% según datos de la plataforma. Después de The Martian, la NASA reportó un aumento del 30% en visitas a su página web sobre el programa Mars. Después de Arrival, la Linguistic Society of America registró un aumento en consultas públicas sobre carreras en lingüística. Estas películas funcionan como puntos de entrada para que audiencias no especializadas descubran campos científicos que de otro modo permanecerían en el ámbito estrictamente académico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La película Ex Machina (2014) y Arrival comparten un tema central que pocos espectadores identifican: ambas tratan sobre el test de Turing, pero aplicado de formas diferentes. En Ex Machina, el test es explícito: ¿puede una máquina simular ser humana? En Arrival, el test es implícito: ¿puede un humano demostrar a una inteligencia no humana que es capaz de comprender? Louise Banks debe "pasar" un test de Turing inverso, demostrando a los heptápodos que la humanidad merece recibir su regalo lingüístico.' },
      { label: 'En la Película', icon: 'zap', text: 'Villeneuve estableció una regla visual: nunca mostrar la nave heptápoda completa en una sola toma clara. El espectador siempre la ve parcialmente, entre la niebla o desde ángulos que ocultan su escala total. Esta técnica, inspirada en Alien (1979) de Ridley Scott y en Encuentros cercanos del tercer tipo (1977) de Steven Spielberg, mantiene un sentido de misterio que refuerza el tema de la película: la comprensión parcial es el primer paso hacia el conocimiento.' },
    ],
    fact: 'El presupuesto combinado de Gravity, Interstellar, Ex Machina, The Martian y Arrival fue de aproximadamente 500 millones de dólares, y recaudaron colectivamente más de 2,400 millones en taquilla mundial según Box Office Mojo. En contraste, una sola película de franquicia como Avengers: Age of Ultron (2015) tuvo un presupuesto de 365 millones y recaudó 1,400 millones. Esto sugiere que la ciencia ficción intelectual, producida a menor costo, genera un rendimiento económico proporcionalmente superior al de los blockbusters de acción.',
  },
  {
    id: 'mensaje-final',
    title: 'El Mensaje Final',
    color: '#1B1B1B',
    btnImage: '/assets/arrival/arrival_m6.png',
    image: '/assets/arrival/arrival_m6.png',
    content: [
      'El mensaje central de Arrival, tanto del relato de Ted Chiang como de la adaptación cinematográfica de Villeneuve, es que la comunicación no es un medio para un fin sino un acto transformador en sí mismo. Cuando Louise Banks aprende el idioma heptápodo, no solo adquiere la capacidad de traducir palabras extraterrestres al inglés: su percepción del tiempo cambia de forma irreversible. El idioma no es una herramienta neutral; es una lente que altera la realidad de quien lo usa. Esta idea tiene raíces en la lingüística real y en la filosofía del lenguaje de Ludwig Wittgenstein, quien escribió en 1922: "Los límites de mi lenguaje significan los límites de mi mundo".',
      'La película construye su argumento a favor de la cooperación internacional de forma gradual y sin sermones. Las doce naves heptápodas aterrizan en doce países diferentes, y cada equipo científico nacional obtiene solo una pieza del mensaje completo. La solución requiere que las naciones compartan información, pero el miedo y la desconfianza lo impiden. China amenaza con atacar. Rusia corta comunicaciones. Solo cuando Louise comparte voluntariamente la información que ha obtenido, arriesgando su propia posición, las naciones retoman el diálogo.',
      'El dilema personal de Louise amplifica el mensaje político. Su decisión de tener a Hannah a pesar de saber que la perderá no es un acto de resignación ni de optimismo ciego. Es una elección informada que acepta la totalidad de la experiencia: la alegría del primer paso de Hannah, las tardes de lectura compartida, las conversaciones sobre ciencia, y también la enfermedad, el dolor y la pérdida. Chiang ha explicado en conferencias que esta decisión refleja una postura filosófica específica: el valor de una experiencia no depende de su duración sino de su profundidad.',
      'Arrival redefine el concepto de "arma" en la ciencia ficción. El "arma" que los heptápodos entregan a la humanidad no es tecnología militar ni una fuente de energía: es su idioma. Un sistema de comunicación que, al ser aprendido, transforma la cognición del aprendiz. En la tradición de la ciencia ficción, las civilizaciones avanzadas suelen ofrecer tecnología física, como motores de hipervelocidad, escudos de energía o medicinas milagrosas. Los heptápodos ofrecen algo más radical: una forma diferente de pensar, una herramienta cognitiva que no puede ser militarizada ni monopolizada.',
      'El legado de Arrival reside en su demostración de que la empatía, la paciencia y la disposición a escuchar son herramientas más poderosas que la fuerza. En un género definido históricamente por batallas espaciales, invasiones y destrucción, Arrival propone que el acto más valiente no es disparar sino preguntar "¿cuál es tu propósito?". Louise Banks no salva al mundo con un arma ni con una ecuación, sino con una pregunta formulada en el idioma correcto, dirigida a la audiencia correcta, en el momento correcto. La película sugiere que esta capacidad, la de formular la pregunta correcta, es la habilidad más valiosa que la humanidad puede cultivar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La frase "arma" que los heptápodos transmiten es inicialmente traducida por los equipos militares como una amenaza, casi provocando un conflicto global. Pero Louise entiende que en el contexto heptápodo, "arma" significa "herramienta" o "regalo". Esta escena ilustra un fenómeno lingüístico real: la polisemia, donde una palabra tiene múltiples significados que solo se resuelven con contexto cultural. En la historia real de la colonización, malentendidos similares entre idiomas provocaron conflictos documentados por antropólogos como Marshall Sahlins en Islands of History (1985).' },
      { label: 'En la Película', icon: 'zap', text: 'La última escena de Arrival muestra a Louise abrazando a Ian (Jeremy Renner) sabiendo que él la abandonará cuando descubra que ella sabía el destino de Hannah y eligió no decirle. Villeneuve filmó esta escena sin música y con luz natural, dejando que la expresión de Adams transmitiera la complejidad de la situación: amor, aceptación, soledad anticipada y la certeza de que la alegría compartida, aunque temporal, justifica el dolor venidero. Es una de las escenas finales más debatidas del cine de ciencia ficción del siglo XXI.' },
    ],
    fact: 'Ted Chiang ha señalado en entrevistas con The Paris Review en 2019 que "Story of Your Life" no presenta una visión utópica ni distópica del primer contacto, sino una visión trágica en el sentido griego clásico: el protagonista tiene conocimiento completo de lo que ocurrirá y elige actuar de todas formas. Esta estructura narrativa conecta a Louise Banks con figuras como Casandra de la mitología griega y con el concepto budista de aceptación del sufrimiento como parte inherente de la existencia. La diferencia es que Louise no sufre por impotencia sino que elige el sufrimiento como parte indivisible de la alegría.',
  },
];

// ─── Alien Fog Particle Field (Canvas Background) ──────────────────────────
function AlienFogField() {
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
      hue: Math.random() > 0.5 ? '139,157,175' : '106,123,141', // fog grays
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

// ─── Arrival Legacy Header ──────────────────────────────────────────────────
function ArrivalLegacyHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(139,157,175,0.3))' }}>
        {/* Logogram arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#arrivalGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#8B9DAF','#7A8C9E','#4E4E4E','#6A7B8D','#3D3D3D','#2C2C2C','#1B1B1B'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central logogram circle */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#8B9DAF" strokeWidth="1.5" opacity="0.6" />
        <path d="M293 26 Q300 20 307 26 Q310 32 307 36 Q300 40 293 36 Q290 32 293 26" fill="none" stroke="#8B9DAF" strokeWidth="1.2" opacity="0.5" />
        <circle cx="300" cy="30" r="2" fill="#8B9DAF" opacity="0.5" />
        <defs>
          <linearGradient id="arrivalGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,157,175,0.2)" />
            <stop offset="50%" stopColor="rgba(139,157,175,0.9)" />
            <stop offset="100%" stopColor="rgba(139,157,175,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#8B9DAF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL LEGADO DE ARRIVAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(139,157,175,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">IMPACTO, CIENCIA Y MENSAJE</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────────────────────────────────
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
          layoutId="activeDotArrivalM6"
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

// ─── Magazine-Style Content Panel ──────────────────────────────────────────
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #8B9DAF, #4E4E4E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(139,157,175,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#8B9DAF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_ArrivalM6() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.88) 0%, rgba(15,15,20,0.85) 40%, rgba(10,10,15,0.9) 100%), url(/assets/arrival/arrival_m6.png)',
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
      <AlienFogField />

      <ArrivalLegacyHeader />

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
              🏆 ¡Has explorado el legado completo de Arrival!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Buscador de Civilizaciones
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
