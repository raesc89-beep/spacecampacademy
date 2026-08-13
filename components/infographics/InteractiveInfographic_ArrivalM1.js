'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Linguistics themed) ────────────────────────────
function DecoSpeechBubble({ size = 70, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 12 Q10 6 18 6 L42 6 Q50 6 50 12 L50 32 Q50 38 42 38 L22 38 L14 48 L16 38 L18 38 Q10 38 10 32 Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Text lines */}
      <line x1="18" y1="15" x2="42" y2="15" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="18" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="27" x2="35" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Dots */}
      <circle cx="15" cy="50" r="1.5" fill={color} opacity="0.3" />
      <circle cx="10" cy="54" r="1" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoWaveform({ size = 70, color = '#A0B4C8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Sound waveform bars */}
      {[8, 14, 20, 26, 32, 38, 44, 50].map((x, i) => {
        const heights = [10, 20, 28, 16, 24, 12, 22, 8];
        const h = heights[i];
        return <rect key={i} x={x} y={30 - h / 2} width="3" height={h} rx="1.5" fill={color} opacity={0.3 + i * 0.05} />;
      })}
      {/* Circular waves */}
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.6" opacity="0.15" />
    </svg>
  );
}

function DecoGlyphSvg({ size = 70, color = '#6A7B8D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized letters/glyphs */}
      <text x="8" y="22" fill={color} fontSize="16" fontFamily="serif" opacity="0.4">A</text>
      <text x="28" y="18" fill={color} fontSize="12" fontFamily="serif" opacity="0.3">α</text>
      <text x="42" y="24" fill={color} fontSize="14" fontFamily="serif" opacity="0.35">字</text>
      <text x="14" y="42" fill={color} fontSize="11" fontFamily="serif" opacity="0.3">Σ</text>
      <text x="36" y="46" fill={color} fontSize="13" fontFamily="serif" opacity="0.35">ñ</text>
      {/* Connecting dots */}
      <circle cx="24" cy="30" r="1.5" fill={color} opacity="0.4" />
      <circle cx="38" cy="34" r="1" fill={color} opacity="0.3" />
      <line x1="24" y1="30" x2="38" y2="34" stroke={color} strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

function DecoBrainSvg({ size = 60, color = '#B0C4D8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified brain outline */}
      <path d="M30 8 Q14 8 12 22 Q10 32 16 38 Q12 42 14 48 Q18 54 26 52 Q30 56 34 52 Q42 54 46 48 Q48 42 44 38 Q50 32 48 22 Q46 8 30 8 Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Central fissure */}
      <path d="M30 12 L30 50" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Neural connections */}
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.4" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.4" />
      <circle cx="20" cy="36" r="1.5" fill={color} opacity="0.3" />
      <circle cx="40" cy="36" r="1.5" fill={color} opacity="0.3" />
      <line x1="22" y1="24" x2="38" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="36" x2="40" y2="36" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoScrollSvg({ size = 70, color = '#9AAABB', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 49" style={{ opacity: 0.2, ...style }}>
      {/* Scroll body */}
      <rect x="12" y="8" width="46" height="33" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Scroll rolls */}
      <ellipse cx="12" cy="24" rx="4" ry="16" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="58" cy="24" rx="4" ry="16" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Text lines on scroll */}
      <line x1="20" y1="15" x2="50" y2="15" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="21" x2="48" y2="21" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="27" x2="46" y2="27" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="33" x2="42" y2="33" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoHandSign({ size = 70, color = '#5A6B7D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified hand silhouette */}
      <path d="M22 40 L22 24 Q22 20 26 20 L26 14 Q26 10 30 10 L30 14 L30 10 Q30 6 34 6 L34 14 L34 10 Q34 8 38 8 L38 22 L40 20 Q42 18 44 20 L44 24 L42 30 Q42 38 38 42 L26 42 Q22 42 22 40 Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Communication waves */}
      <path d="M48 16 Q52 20 48 24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M52 14 Q58 20 52 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Small dots */}
      <circle cx="14" cy="30" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="36" r="1.5" fill={color} opacity="0.25" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'que-nos-hace-humanos': [DecoSpeechBubble, DecoBrainSvg, DecoWaveform],
  'componentes-lenguaje': [DecoWaveform, DecoGlyphSvg, DecoBrainSvg],
  'lenguas-del-mundo': [DecoGlyphSvg, DecoScrollSvg, DecoSpeechBubble],
  'adquisicion-lenguaje': [DecoBrainSvg, DecoSpeechBubble, DecoWaveform],
  'lenguaje-y-pensamiento': [DecoBrainSvg, DecoGlyphSvg, DecoScrollSvg],
  'escritura-habla-texto': [DecoScrollSvg, DecoGlyphSvg, DecoHandSign],
  'comunicacion-no-verbal': [DecoHandSign, DecoWaveform, DecoSpeechBubble],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Pinker, S. (1994). The Language Instinct. William Morrow and Company',
  'Chomsky, N. (1957). Syntactic Structures. Mouton & Co.',
  'Crystal, D. (2010). The Cambridge Encyclopedia of Language. Cambridge University Press',
  'Deutscher, G. (2010). Through the Language Glass. Metropolitan Books',
  'Hockett, C. (1960). The Origin of Speech. Scientific American, 203(3)',
  'Ekman, P. (1972). Universals and Cultural Differences in Facial Expressions of Emotion. Nebraska Symposium on Motivation',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'que-nos-hace-humanos',
    title: '¿Qué Nos Hace Humanos?',
    color: '#8B9DAF',
    btnImage: '/assets/ciencia_arrival/infographic_m1/btn_que-nos-hace-humanos.jpg',
    image: '/assets/ciencia_arrival/infographic_m1/hero_que-nos-hace-humanos.jpg',
    content: [
      'El lenguaje es la capacidad que separa a los seres humanos del resto de las especies del planeta. Mientras que otros animales se comunican — las abejas danzan, los delfines producen silbidos, los pájaros cantan melodías complejas — ninguna otra especie posee un sistema de comunicación con la flexibilidad y el poder creativo del lenguaje humano. El lingüista Charles Hockett, de la Universidad de Cornell, identificó en 1960 trece rasgos del diseño del lenguaje humano que lo distinguen de cualquier sistema de comunicación animal, entre ellos la productividad, el desplazamiento temporal y la dualidad de articulación.',
      'Noam Chomsky, nacido en 1928 en Filadelfia, transformó el estudio del lenguaje en 1957 con la publicación de su obra Syntactic Structures. Chomsky propuso que todos los seres humanos nacemos con una estructura cerebral innata — una «gramática universal» — que nos permite adquirir cualquier idioma del mundo. Un bebé nacido en Tokio, adoptado por una familia en Ciudad de México, aprenderá español con la misma facilidad con que habría aprendido japonés. Según Chomsky, esto ocurre porque nuestro cerebro ya contiene las reglas profundas que subyacen a todos los idiomas, y la exposición al entorno solo activa una configuración específica de esas reglas.',
      'Los científicos han investigado durante décadas si otros animales pueden aprender lenguaje humano. En 1967, los psicólogos Allen y Beatrix Gardner comenzaron a enseñar lenguaje de señas americano (ASL) a una chimpancé llamada Washoe en la Universidad de Nevada. Washoe logró aprender alrededor de 350 signos y podía combinarlos en secuencias cortas como «dame fruta» o «abre puerta». Sin embargo, la mayoría de lingüistas, incluido Chomsky, argumentaron que Washoe imitaba y asociaba señas con recompensas, pero no manejaba la sintaxis recursiva que define al lenguaje humano: la capacidad de insertar una oración dentro de otra sin límite teórico.',
      'Tres propiedades distinguen al lenguaje humano de toda comunicación animal: la productividad, el desplazamiento y la recursividad. La productividad significa que podemos crear oraciones que nunca antes se han pronunciado: esta misma oración es probablemente única en la historia de la humanidad. El desplazamiento nos permite hablar sobre cosas que no están presentes: el pasado, el futuro, lugares lejanos o entidades imaginarias. La recursividad nos permite construir oraciones de complejidad infinita: «el gato que persiguió al ratón que comió el queso que estaba en la mesa que...». Ningún sistema de comunicación animal conocido posee estas tres propiedades combinadas.',
      'La evolución del aparato vocal humano fue clave para el desarrollo del habla. A diferencia de otros primates, la laringe humana está situada en una posición baja en la garganta, lo que crea un tracto vocal largo capaz de producir una amplia gama de sonidos. Esta adaptación tiene un costo: los humanos son la única especie que puede atragantarse al comer, porque la comida y el aire comparten parte del mismo conducto. En 2001, investigadores del Instituto Max Planck descubrieron que el gen FOXP2, ubicado en el cromosoma 7, es esencial para el control motor fino del habla. Las personas con mutaciones en FOXP2 tienen dificultades severas para articular palabras, aunque su inteligencia general puede ser normal.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El delfín nariz de botella posee un sistema de comunicación que incluye silbidos individuales — una especie de «nombre» único que cada delfín desarrolla durante su primer año de vida. Un estudio publicado en 2013 por la revista Proceedings of the National Academy of Sciences demostró que los delfines responden selectivamente cuando escuchan su propio silbido, de forma similar a como los humanos reaccionan al oír su nombre. Sin embargo, los delfines no combinan estos silbidos en secuencias gramaticales como hacemos los humanos con las palabras.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival (2016), la lingüista Louise Banks se enfrenta al desafío de comunicarse con los heptápodos sin ningún punto de referencia compartido. Su primer paso es señalarse a sí misma y decir «humano», un método conocido en lingüística como «ostensión». Este enfoque refleja las técnicas reales que usan los lingüistas de campo al documentar lenguas no contactadas: comienzan con sustantivos concretos y objetos visibles antes de abordar conceptos abstractos. La película captura con precisión la dificultad de establecer un vocabulario compartido desde cero.' },
    ],
    fact: 'Se estima que el lenguaje articulado surgió hace entre 50,000 y 100,000 años, aunque algunos investigadores como Philip Lieberman de la Universidad de Brown sitúan los orígenes del habla rudimentaria hace 500,000 años con el Homo heidelbergensis. La evidencia más antigua de comportamiento simbólico — grabados geométricos en conchas — proviene de un yacimiento en Java y tiene 540,000 años de antigüedad, lo que sugiere que formas primitivas de pensamiento simbólico precedieron al lenguaje moderno por cientos de miles de años.',
  },
  {
    id: 'componentes-lenguaje',
    title: 'Los Componentes del Lenguaje',
    color: '#A0B4C8',
    btnImage: '/assets/ciencia_arrival/infographic_m1/btn_componentes-lenguaje.jpg',
    image: '/assets/ciencia_arrival/infographic_m1/hero_componentes-lenguaje.jpg',
    content: [
      'Todo idioma humano, desde el español hasta el quechua, desde el mandarín hasta el suajili, puede analizarse mediante cinco niveles de organización: fonética, morfología, sintaxis, semántica y pragmática. Estos cinco niveles funcionan de forma simultánea cada vez que pronunciamos una oración. La fonética estudia los sonidos individuales que producimos al hablar; la morfología examina cómo combinamos esos sonidos en unidades con significado; la sintaxis establece las reglas para ordenar las palabras en oraciones; la semántica analiza el significado de las palabras y las oraciones; y la pragmática estudia cómo el contexto modifica la interpretación de lo que decimos.',
      'La fonética revela que los seres humanos pueden producir más de 600 sonidos consonánticos y 200 vocálicos diferentes, según el Alfabeto Fonético Internacional (AFI), creado en 1888 por la Asociación Fonética Internacional. Sin embargo, ningún idioma utiliza todos estos sonidos. El español emplea aproximadamente 24 fonemas, el inglés entre 40 y 44 dependiendo del dialecto, y la lengua !Xóõ del pueblo san de Botsuana posee alrededor de 164 fonemas, incluyendo más de 80 consonantes de clic producidas al chasquear la lengua contra diferentes zonas del paladar. Cada lengua selecciona un subconjunto particular de sonidos posibles y descarta el resto.',
      'La morfología estudia los morfemas — las unidades mínimas con significado en un idioma. La palabra española «desafortunadamente» contiene cuatro morfemas: «des-» (negación), «fortuna» (suerte), «-da» (participio), «-mente» (modo adverbial). Las lenguas varían en su complejidad morfológica. Las lenguas aglutinantes, como el turco y el finés, construyen palabras largas encadenando muchos morfemas: en turco, «evlerinizden» significa «de sus casas de ustedes» en una sola palabra. Las lenguas aislantes, como el mandarín, tienden a usar palabras de un solo morfema y dependen del orden de las palabras y del contexto para expresar relaciones gramaticales.',
      'La sintaxis — las reglas que determinan el orden de las palabras — varía entre idiomas según patrones documentados. El lingüista Joseph Greenberg analizó en 1963 una muestra de 30 lenguas y estableció universales tipológicos: patrones que aparecen con frecuencia en los idiomas del mundo. El orden sujeto-verbo-objeto (SVO), que usamos en español («el gato come pescado»), aparece en el 42% de las lenguas. El orden sujeto-objeto-verbo (SOV), usado en japonés, coreano y turco, cubre otro 45%. Solo el 9% de las lenguas ponen el verbo primero, como el galés y el hawaiano. Los tres órdenes restantes (OVS, OSV, VOS) son muy poco frecuentes.',
      'La pragmática estudia cómo el contexto transforma el significado literal de las palabras. Cuando alguien dice «hace frío aquí» en una habitación con la ventana abierta, el significado literal es una observación sobre la temperatura, pero el significado pragmático es una solicitud para cerrar la ventana. El filósofo Paul Grice formuló en 1975 las «máximas conversacionales»: reglas implícitas que seguimos al conversar, como ser relevante, ser breve y decir la verdad. Cuando violamos estas máximas deliberadamente, generamos implicaturas — significados indirectos que el oyente debe inferir. La ironía, el sarcasmo y las metáforas funcionan precisamente porque rompen las máximas de Grice de formas que el oyente reconoce.',
    ],
    expandables: [
      { label: 'Dato Científico', icon: 'atom', text: 'El área de Broca, ubicada en el lóbulo frontal izquierdo del cerebro, controla la producción del habla y fue identificada en 1861 por el médico francés Paul Broca tras estudiar a un paciente que solo podía decir la sílaba «tan». El área de Wernicke, descubierta en 1874 por Carl Wernicke, se localiza en el lóbulo temporal y se encarga de la comprensión. Lesiones en el área de Broca producen habla lenta pero comprensible; lesiones en el área de Wernicke producen habla fluida pero carente de sentido.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival, la escritura de los heptápodos (llamada «Heptápodo B» por los lingüistas humanos) es un sistema semántico que no guarda relación con su lenguaje hablado («Heptápodo A»). Cada lograma circular codifica una idea sin orden lineal. En la lingüística real, los caracteres chinos funcionan de forma similar: el carácter 山 (montaña) puede pronunciarse «shān» en mandarín o «saan» en cantonés, pero el significado visual es el mismo independientemente del idioma hablado. La escritura puede ser independiente del sonido.' },
    ],
    fact: 'El cerebro humano procesa el lenguaje a una velocidad de aproximadamente 150 milisegundos por palabra durante la lectura y entre 200 y 300 milisegundos durante la escucha, según estudios con potenciales evocados (ERP) realizados en la Universidad de Leiden. Un hablante promedio produce entre 120 y 180 palabras por minuto en conversación normal. El componente N400, un patrón eléctrico cerebral descubierto en 1980 por Marta Kutas y Steven Hillyard, se activa cuando el cerebro detecta una palabra que no encaja semánticamente en el contexto, demostrando que nuestro cerebro predice las palabras antes de escucharlas.',
  },
  {
    id: 'lenguas-del-mundo',
    title: 'Lenguas del Mundo',
    color: '#6A7B8D',
    btnImage: '/assets/ciencia_arrival/infographic_m1/btn_lenguas-del-mundo.jpg',
    image: '/assets/ciencia_arrival/infographic_m1/hero_lenguas-del-mundo.jpg',
    content: [
      'El catálogo Ethnologue, publicado por SIL International, registra en su edición de 2024 un total de 7,168 lenguas vivas en el planeta. Esta cifra puede parecer estable, pero oculta una realidad preocupante: aproximadamente una lengua desaparece cada dos semanas. La UNESCO clasifica el 43% de las lenguas del mundo como «en peligro», lo que significa que podrían dejar de hablarse antes de que termine este siglo. Cada vez que un idioma se extingue, se pierde un sistema único de conocimiento acumulado durante miles de años — términos para plantas medicinales, técnicas de navegación, tradiciones orales y formas de entender el mundo que no existen en ningún otro lugar.',
      'Los lingüistas organizan las lenguas en familias según su origen común. La familia indoeuropea, a la que pertenecen el español, el inglés, el hindi, el ruso y el persa, entre otros, es la más extendida geográficamente. Fue Sir William Jones, un juez británico destinado en Calcuta, quien en 1786 propuso que el sánscrito, el griego y el latín provenían de un ancestro común que ya no existía. Ese idioma ancestral, llamado protoindoeuropeo, se habló probablemente hace unos 6,000 años en las estepas al norte del Mar Negro, según la hipótesis de los kurganes propuesta por la arqueóloga Marija Gimbutas en 1956. Hoy, unos 3,200 millones de personas hablan lenguas indoeuropeas como idioma nativo.',
      'La familia sinotibetana, que incluye el mandarín, el cantonés y el tibetano, es la segunda más numerosa con alrededor de 1,500 millones de hablantes. Le sigue la familia níger-congolesa, que abarca más de 1,500 lenguas habladas en África subsahariana, incluyendo el suajili, el yoruba y el zulú. La familia austronesia conecta lenguas desde Madagascar (frente a la costa africana) hasta Hawái y Nueva Zelanda, un arco de 16,000 kilómetros cruzando el océano Pacífico. Esta distribución refleja la migración de los pueblos austronesios desde Taiwán hace aproximadamente 5,000 años, en lo que fue una de las expansiones marítimas más amplias de la historia humana.',
      'Existen también lenguas aisladas — idiomas que no pertenecen a ninguna familia conocida. El caso más célebre es el euskera, hablado por unas 750,000 personas en el País Vasco, a ambos lados de la frontera entre España y Francia. A pesar de siglos de investigación, ningún lingüista ha logrado conectar el euskera con otro idioma vivo o extinto. Se cree que es un superviviente de las lenguas que se hablaban en Europa antes de la llegada de los pueblos indoeuropeos hace unos 4,500 años. Otros idiomas aislados incluyen el ainu de Japón, el burushaski de Pakistán y el zuni de Nuevo México, cada uno representando una rama única en el árbol lingüístico de la humanidad.',
      'Papua Nueva Guinea, un país con apenas 9 millones de habitantes, concentra la mayor diversidad lingüística del planeta: alrededor de 840 lenguas distintas. La geografía extrema de la isla — montañas escarpadas, selvas densas, ríos caudalosos — mantuvo aisladas a comunidades pequeñas durante miles de años, permitiendo que cada grupo desarrollara su propio idioma. En contraste, China, con 1,400 millones de habitantes, tiene entre 200 y 300 lenguas. La relación entre diversidad lingüística y geografía demuestra que el aislamiento favorece la especiación lingüística, mientras que los imperios, las carreteras y las telecomunicaciones tienden a reducirla mediante la presión del idioma dominante.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El idioma con más hablantes nativos del mundo no es el inglés, sino el mandarín, con aproximadamente 920 millones de hablantes nativos según Ethnologue (2024). El español ocupa el segundo lugar con unos 475 millones de hablantes nativos. El inglés queda en tercer lugar con 373 millones de hablantes nativos, pero se convierte en el primer idioma global cuando se cuentan los hablantes no nativos: más de 1,500 millones de personas lo usan como segunda lengua o lengua franca en negocios, ciencia y diplomacia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La glotocronología, desarrollada por Morris Swadesh en la década de 1950, intenta calcular cuándo se separaron dos lenguas emparentadas analizando las diferencias en su vocabulario básico. Swadesh compiló una lista de 100 palabras universales (yo, tú, agua, sol, uno, dos...) y midió cuántas cognadas compartían las lenguas. Según su fórmula, las lenguas pierden aproximadamente el 14% de su vocabulario básico cada mil años. Aunque el método tiene limitaciones reconocidas, sigue siendo una herramienta útil para estimar fechas de divergencia lingüística.' },
    ],
    fact: 'El último hablante fluido del idioma eyak, una lengua na-dené de Alaska, fue Marie Smith Jones, quien falleció el 21 de enero de 2008 a los 89 años. Antes de morir, trabajó con el lingüista Michael Krauss de la Universidad de Alaska Fairbanks para documentar la gramática, el vocabulario y las historias orales del eyak. Krauss estimó en 1992 que el 90% de las lenguas del mundo podrían desaparecer para el año 2100 si no se toman medidas activas de preservación, una predicción que la UNESCO ha calificado como plausible en informes posteriores.',
  },
  {
    id: 'adquisicion-lenguaje',
    title: 'La Adquisición del Lenguaje',
    color: '#B0C4D8',
    btnImage: '/assets/ciencia_arrival/infographic_m1/btn_adquisicion-lenguaje.jpg',
    image: '/assets/ciencia_arrival/infographic_m1/hero_adquisicion-lenguaje.jpg',
    content: [
      'Los bebés humanos nacen con la capacidad de distinguir todos los sonidos de todas las lenguas del mundo. Un recién nacido puede percibir la diferencia entre los sonidos «r» y «l» del inglés, las consonantes retroflejas del hindi y los clics del zulú con igual facilidad. Esta capacidad universal se va estrechando durante el primer año de vida: hacia los 10 meses, los bebés comienzan a perder la habilidad de distinguir sonidos que no pertenecen a su lengua materna. Patricia Kuhl, neurocientífica de la Universidad de Washington, demostró este fenómeno en 2003 y lo denominó «estrechamiento perceptual». El cerebro del bebé se especializa en los sonidos que escucha con frecuencia y descarta los que no necesita.',
      'La adquisición del lenguaje sigue un patrón notable en todas las culturas estudiadas. Alrededor de los 6 meses, los bebés comienzan a balbucear, produciendo sílabas repetitivas como «bababa» o «mamama». Hacia los 12 meses aparecen las primeras palabras reconocibles. Entre los 18 y 24 meses ocurre la «explosión de vocabulario»: el niño pasa de conocer unas 50 palabras a aprender entre 8 y 10 palabras nuevas cada día. A los 3 años, la mayoría de los niños manejan las estructuras gramaticales básicas de su lengua. A los 6 años, un niño promedio conoce entre 10,000 y 13,000 palabras. Este proceso ocurre sin instrucción formal — los niños no reciben clases de gramática para aprender a hablar.',
      'La hipótesis del período crítico, formulada por el neurólogo Eric Lenneberg en 1967 en su obra Biological Foundations of Language, propone que existe una ventana temporal — desde el nacimiento hasta aproximadamente la pubertad — durante la cual el cerebro está preparado de forma óptima para adquirir lenguaje. Después de este período, aprender un idioma se vuelve progresivamente más difícil. La evidencia más fuerte a favor de esta hipótesis proviene de estudios sobre niños sordos que recibieron implantes cocleares: aquellos que los recibieron antes de los 3 años desarrollaron habilidades lingüísticas similares a las de niños oyentes, mientras que los implantados después de los 7 años mostraron resultados significativamente inferiores.',
      'El caso más estudiado sobre privación lingüística es el de Genie, una niña de California descubierta en 1970 a los 13 años de edad. Genie había sido confinada en una habitación por su padre desde los 20 meses, sin exposición al lenguaje humano durante toda su infancia. Cuando fue rescatada, no podía hablar. Los lingüistas Susan Curtiss y Victoria Fromkin trabajaron con ella durante años. Genie logró aprender vocabulario — llegó a conocer cientos de palabras — pero nunca dominó la sintaxis. Producía oraciones como «Genie querer leche» sin conjugar verbos ni usar artículos. Su caso sugiere que la gramática, a diferencia del vocabulario, requiere exposición durante el período crítico para desarrollarse de modo adecuado.',
      'Los niños sordos de Nicaragua ofrecen un caso que transformó nuestra comprensión de la adquisición lingüística. Antes de 1977, Nicaragua no tenía escuelas para sordos ni un lenguaje de señas estandarizado. Cuando se abrió la primera escuela, los niños crearon de manera espontánea un sistema de comunicación gestual. Pero fue la segunda generación de estudiantes, llegados en la década de 1980, la que transformó ese pidgin rudimentario en un lenguaje de señas con gramática propia: el Idioma de Señas Nicaragüense (ISN). La lingüista Judy Kegl documentó este proceso, que demostró que los niños no solo aprenden lenguaje — tienen la capacidad innata de crearlo cuando no reciben uno del entorno.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los bebés bilingües no se confunden al escuchar dos idiomas de forma simultánea. Un estudio de 2011 publicado en la revista Cognition por Agnes Kovács y Jacques Mehler demostró que los bebés de 7 meses criados en hogares bilingües podían distinguir los dos idiomas y alternar su atención entre ellos. Además, los niños bilingües desarrollan habilidades de «función ejecutiva» — la capacidad de ignorar información irrelevante — superiores a las de niños monolingües, según investigaciones de Ellen Bialystok en la Universidad de York.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival, Louise Banks aprende el lenguaje de los heptápodos siendo adulta, lo cual contradice parcialmente la hipótesis del período crítico. Sin embargo, la película muestra que el proceso es lento y difícil: Louise necesita meses de trabajo intensivo. La ciencia ficción del filme lleva la idea al extremo al proponer que aprender el Heptápodo B reconfigura la estructura neuronal del cerebro adulto, permitiendo a Louise percibir el tiempo de forma no lineal — algo que en la realidad el cerebro adulto no puede lograr con la misma plasticidad que el de un niño.' },
    ],
    fact: 'El lingüista Derek Bickerton estudió los «idiomas criollos» — lenguas que surgen cuando los hijos de hablantes de pidgin (lenguas simplificadas de contacto) añaden gramática y complejidad que sus padres no tenían. En Hawái, durante las décadas de 1890 a 1920, trabajadores de plantaciones de azúcar provenientes de Japón, China, Filipinas y Portugal desarrollaron un pidgin para comunicarse. Sus hijos, nacidos en Hawái, transformaron ese pidgin en el criollo hawaiano, un idioma con tiempos verbales, artículos y cláusulas subordinadas que el pidgin original no poseía. Bickerton usó estos datos para apoyar la existencia de un «bioprograma» innato del lenguaje.',
  },
  {
    id: 'lenguaje-y-pensamiento',
    title: 'Lenguaje y Pensamiento',
    color: '#7A8C9E',
    btnImage: '/assets/ciencia_arrival/infographic_m1/btn_lenguaje-y-pensamiento.jpg',
    image: '/assets/ciencia_arrival/infographic_m1/hero_lenguaje-y-pensamiento.jpg',
    content: [
      '¿El idioma que hablas cambia la forma en que piensas? Esta pregunta central de la lingüística moderna se conoce como la hipótesis de la relatividad lingüística, formulada por Edward Sapir y Benjamin Lee Whorf durante la primera mitad del siglo XX. Sapir, nacido en 1884, fue profesor en la Universidad de Yale y estudió lenguas indígenas de América del Norte. Su alumno Whorf, un ingeniero de prevención de incendios de profesión, se especializó en la lengua hopi de Arizona y las lenguas mesoamericanas. Whorf propuso que la estructura del idioma hopi, que según él carecía de tiempos verbales lineales, hacía que los hopi percibieran el tiempo de modo diferente a los hablantes de lenguas europeas.',
      'La hipótesis tiene dos versiones con consecuencias muy distintas. La versión fuerte — el determinismo lingüístico — afirma que el idioma determina por los límites del pensamiento: si tu lengua no tiene una palabra para algo, no puedes concebirlo. La versión débil — la relatividad lingüística — propone que el idioma influye en la percepción y la cognición sin determinarlas de modo absoluto. La investigación científica actual ha descartado en gran medida la versión fuerte: las personas pueden pensar en conceptos para los cuales su idioma carece de palabras. Sin embargo, la versión débil ha recibido apoyo experimental creciente en las últimas dos décadas, particularmente en los campos de la percepción del color, la orientación espacial y la cognición temporal.',
      'La evidencia más sólida proviene de los estudios sobre percepción cromática. En ruso, los hablantes deben distinguir obligatoriamente entre «голубой» (goluboy, azul claro) y «синий» (siniy, azul oscuro); no existe un término genérico equivalente a «azul». En 2007, Jonathan Winawer y sus colegas publicaron en la revista Proceedings of the National Academy of Sciences un estudio que demostró que los hablantes de ruso distinguían matices de azul 124 milisegundos más rápido que los hablantes de inglés, pero solo cuando los tonos se ubicaban a ambos lados de la frontera goluboy-siniy. Este efecto desaparecía cuando los participantes realizaban una tarea verbal simultánea, sugiriendo que la ventaja perceptual depende directamente del acceso a las categorías lingüísticas.',
      'El pueblo kuuk thaayorre de Pormpuraaw, Australia, ofrece una demostración notable de la influencia del lenguaje. Su lengua no tiene palabras para «izquierda» ni «derecha»; en su lugar, los hablantes usan puntos cardinales para toda referencia espacial, diciendo «pasa la taza al norte» o «tu pierna sureste tiene una hormiga». La psicóloga cognitiva Lera Boroditsky, de la Universidad de Stanford, documentó en 2010 que los hablantes de kuuk thaayorre mantienen una orientación geográfica precisa en todo momento, incluso en interiores y en lugares desconocidos. Cuando se les pidió ordenar tarjetas con secuencias temporales, las ordenaron de este a oeste — la dirección del movimiento del sol — sin importar en qué dirección estuvieran sentados.',
      'Las investigaciones de Lera Boroditsky también revelaron que los bilingües cambian su percepción temporal según el idioma que usan. Los hablantes de sueco e inglés describen la duración del tiempo en términos de distancia: «una reunión larga» o «un descanso corto». Los hablantes de español y griego usan metáforas de cantidad: «mucho tiempo» o «poco tiempo». Los bilingües sueco-español alternan entre estas representaciones dependiendo del idioma en que se les plantea la pregunta. Esto demuestra que las categorías lingüísticas no solo reflejan el pensamiento, sino que lo moldean de forma activa y flexible, configurando marcos cognitivos que se activan y desactivan según el contexto lingüístico en uso.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Arrival lleva la hipótesis Sapir-Whorf a su conclusión más radical. A medida que Louise Banks aprende la escritura circular de los heptápodos — donde cada símbolo contiene una oración sin inicio ni final — su cerebro comienza a procesar el tiempo de forma no lineal. Empieza a «recordar» eventos futuros con la misma claridad que el pasado. La película propone que un lenguaje suficientemente diferente puede transformar no solo el pensamiento, sino la percepción fundamental de la realidad. Es ciencia ficción, pero su base científica es la versión fuerte de la hipótesis de Sapir-Whorf.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El pueblo pirahã de la Amazonia brasileña habla un idioma que, según el lingüista Daniel Everett, carece de palabras para números específicos, usando solo términos aproximados como «pocos» y «muchos». En experimentos publicados en 2004 en la revista Science, los hablantes de pirahã pudieron realizar tareas de correspondencia uno a uno, pero fallaron en tareas que requerían contar más allá de tres elementos. Esto sugiere que las palabras numéricas no solo etiquetan cantidades, sino que proporcionan una herramienta cognitiva necesaria para la aritmética exacta.' },
    ],
    fact: 'Un estudio de 2017 publicado en la revista Psychological Science por Panos Athanasopoulos y Emanuel Bylund demostró que los hablantes bilingües de sueco y español percibían la duración de eventos de forma distinta según el idioma en que pensaban en ese momento. Los participantes veían un vídeo de una línea creciendo y debían estimar su duración: cuando pensaban en sueco (que usa metáforas de distancia para el tiempo), la longitud de la línea distorsionaba su juicio temporal; cuando pensaban en español (que usa metáforas de cantidad), el efecto desaparecía. El idioma «activo» moldeaba la percepción del tiempo en tiempo real.',
  },
  {
    id: 'escritura-habla-texto',
    title: 'Escritura: Del Habla al Texto',
    color: '#9AAABB',
    btnImage: '/assets/ciencia_arrival/infographic_m1/btn_escritura-habla-texto.jpg',
    image: '/assets/ciencia_arrival/infographic_m1/hero_escritura-habla-texto.jpg',
    content: [
      'La escritura es una invención reciente en la historia humana. Mientras que el lenguaje hablado tiene al menos 50,000 años de antigüedad, los primeros sistemas de escritura aparecieron hace apenas unos 5,400 años. La escritura cuneiforme, desarrollada por los sumerios en Mesopotamia alrededor del año 3,400 a.C., surgió como un sistema contable: los comerciantes presionaban un cálamo de caña sobre tablillas de arcilla húmeda para registrar cantidades de grano, ganado y bienes. Con el tiempo, estas marcas evolucionaron desde pictogramas — dibujos simplificados de objetos — hasta símbolos abstractos que representaban sonidos silábicos. Se han encontrado más de 500,000 tablillas cuneiformes, y los arqueólogos estiman que millones más permanecen enterradas en los yacimientos de Irak y Siria.',
      'Los jeroglíficos egipcios surgieron de forma independiente alrededor del 3,200 a.C. A diferencia del cuneiforme, los jeroglíficos combinaban tres tipos de signos: logogramas (símbolos que representan palabras), fonogramas (símbolos que representan sonidos) y determinativos (signos silenciosos que indican la categoría semántica de la palabra). Este sistema se mantuvo en uso durante más de 3,500 años hasta el siglo IV d.C. Su desciframiento fue posible gracias a la Piedra Rosetta, descubierta en 1799 por soldados del ejército de Napoleón cerca de la ciudad de Rashid, Egipto. La piedra contenía un decreto del año 196 a.C. escrito en jeroglíficos, demótico y griego, y Jean-François Champollion completó su desciframiento en 1822.',
      'El alfabeto, uno de los inventos más eficientes de la historia de la comunicación, surgió una sola vez. Los primeros signos alfabéticos aparecieron alrededor del 1,800 a.C. en la región del Sinaí, donde trabajadores semíticos adaptaron jeroglíficos egipcios para representar los sonidos consonánticos de su lengua. Este proto-sinaítico dio origen al alfabeto fenicio hacia el 1,050 a.C., que contenía 22 letras, todas consonantes. Los griegos, en contacto comercial con los fenicios, adoptaron su alfabeto alrededor del 800 a.C. y añadieron un elemento decisivo: las vocales. El alfabeto latino, que usamos hoy en español, inglés y la mayoría de lenguas europeas, desciende directamente del griego a través del etrusco. Cada letra que lees en este texto tiene una genealogía de casi 4,000 años.',
      'Los caracteres chinos constituyen el sistema de escritura continuo más antiguo del mundo aún en uso. Las primeras inscripciones conocidas, los «huesos oraculares» de la dinastía Shang, datan de aproximadamente 1,200 a.C. Los sacerdotes grababan preguntas en omoplatos de buey o caparazones de tortuga, los calentaban hasta que se agrietaban, y luego interpretaban las grietas como respuestas divinas. El sistema ha evolucionado durante más de 3,000 años, pero mantiene su principio básico: cada carácter representa un morfema (una unidad de significado), no un sonido. Un hablante de mandarín y uno de cantonés pronuncian los caracteres de forma diferente, pero leen el mismo texto con la misma comprensión, como si fuera un código visual compartido.',
      'No todas las sociedades desarrollaron escritura, y esto no refleja diferencias en inteligencia o complejidad cultural. Los incas del Perú administraron un imperio de 12 millones de personas sin escritura alfabética, utilizando en su lugar los quipus — cordones anudados donde el tipo de nudo, su posición y el color del hilo codificaban información numérica y posiblemente narrativa. La investigadora Sabine Hyland de la Universidad de St Andrews ha propuesto que algunos quipus funcionaban como un sistema logográfico capaz de registrar nombres propios y relatos históricos. Los aborígenes australianos, por su parte, mantuvieron tradiciones orales durante más de 65,000 años — la tradición cultural continua más larga documentada — sin necesidad alguna de escritura.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El silabario cheroqui fue creado en 1821 por Sequoyah (también llamado George Guess), un platero cheroqui que no sabía leer ni escribir en inglés. Observó que los colonos europeos podían «atrapar palabras en papel» y pasó 12 años desarrollando un sistema de 85 símbolos que representaban las sílabas del cheroqui. En pocos meses tras su presentación, la mayoría de la nación cheroqui aprendió a leer y escribir en su propio idioma, y para 1828 publicaban su propio periódico, el Cherokee Phoenix.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La escritura activa regiones cerebrales diferentes según el sistema utilizado. Los estudios de neuroimagen del investigador Stanislas Dehaene han demostrado que leer un alfabeto activa principalmente la ruta fonológica (conversión de letras a sonidos), mientras que leer caracteres chinos activa más intensamente las áreas visuales y motoras del cerebro. Dehaene propuso en 2009 la hipótesis del «reciclaje neuronal»: la lectura no tiene un área cerebral dedicada, sino que «reutiliza» circuitos que evolucionaron originalmente para reconocer objetos y caras.' },
    ],
    fact: 'La escritura más antigua aún sin descifrar es la escritura del Indo, utilizada por la civilización del valle del Indo entre 2600 y 1900 a.C. en lo que hoy es Pakistán y el noroeste de la India. Se han encontrado más de 4,000 inscripciones, pero la mayoría son muy cortas — con un promedio de solo 5 signos — lo que dificulta el análisis estadístico necesario para el desciframiento. Asko Parpola, de la Universidad de Helsinki, ha dedicado más de 50 años a intentar descifrarla. A pesar de los esfuerzos de cientos de investigadores, la escritura del Indo sigue siendo uno de los mayores misterios de la arqueología lingüística.',
  },
  {
    id: 'comunicacion-no-verbal',
    title: 'Comunicación No Verbal',
    color: '#5A6B7D',
    btnImage: '/assets/ciencia_arrival/infographic_m1/btn_comunicacion-no-verbal.jpg',
    image: '/assets/ciencia_arrival/infographic_m1/hero_comunicacion-no-verbal.jpg',
    content: [
      'La comunicación humana va mucho más allá de las palabras. El psicólogo Albert Mehrabian, de la Universidad de California en Los Ángeles, realizó dos estudios en 1967 que dieron origen a la «regla 7-38-55»: según sus resultados, en la comunicación de sentimientos y actitudes, las palabras transmiten solo el 7% del mensaje, el tono de voz el 38%, y el lenguaje corporal el 55%. Sin embargo, esta cifra ha sido repetida fuera de contexto durante décadas. El propio Mehrabian ha señalado que sus estudios se limitaban a situaciones donde el mensaje verbal y el no verbal eran contradictorios, y que la regla no aplica a toda la comunicación general. Aun así, la investigación confirma que los canales no verbales tienen un peso significativo.',
      'Las expresiones faciales fueron estudiadas por Charles Darwin en 1872 en su obra The Expression of the Emotions in Man and Animals, donde propuso que ciertas expresiones son universales e innatas. Un siglo después, el psicólogo Paul Ekman retomó esta idea. Entre 1968 y 1972, Ekman viajó a Papua Nueva Guinea para estudiar al pueblo fore, una comunidad aislada que no había tenido contacto con medios occidentales. Les mostró fotografías de rostros y les pidió que identificaran las emociones. Los fore reconocieron la felicidad, la tristeza, la ira, el asco, el miedo y la sorpresa con precisión similar a la de participantes estadounidenses. Ekman concluyó que existen al menos seis emociones básicas con expresiones faciales universales.',
      'La prosodia — los patrones de entonación, ritmo y acento del habla — transmite información que las palabras solas no pueden comunicar. Una oración como «María llegó ayer» puede ser una afirmación neutral, una pregunta sorprendida o una corrección enfática dependiendo del contorno melódico que le demos. Los estudios del fonetista Daniel Hirst han identificado que los humanos usan variaciones de frecuencia fundamental (el tono de la voz) en un rango de aproximadamente 75 a 300 hercios para codificar emociones, intenciones y estructuras gramaticales. Los bebés responden a la prosodia antes que a las palabras: hacia los 4 meses, pueden distinguir entre una voz aprobadora y una de reproche en cualquier idioma, basándose solo en el contorno melódico.',
      'Las lenguas de señas son sistemas lingüísticos con gramática propia que usan el canal visual-gestual en lugar del auditivo-vocal. La Lengua de Señas Americana (ASL) tiene su propia fonología (configuraciones de la mano, ubicación y movimiento), morfología, sintaxis y semántica, distintas del inglés hablado. El lingüista William Stokoe demostró esto en 1960 en su obra Sign Language Structure, un trabajo pionero que fue rechazado inicialmente por la comunidad académica. Hoy se reconocen más de 300 lenguas de señas en el mundo, y los estudios de neuroimagen han confirmado que las lenguas de señas activan las mismas áreas cerebrales del hemisferio izquierdo que las lenguas habladas, demostrando que el cerebro procesa el lenguaje independientemente de la modalidad sensorial utilizada.',
      'Los gestos acompañan el habla de forma tan integrada que es difícil separarlos. El psicólogo David McNeill, de la Universidad de Chicago, ha documentado que los hablantes gesticulan incluso cuando hablan por teléfono, lo que sugiere que los gestos no son solo para el interlocutor, sino que forman parte del proceso de pensamiento y formulación del mensaje. McNeill clasificó los gestos en cuatro tipos: icónicos (imitan la forma del objeto), deícticos (señalan), metafóricos (representan ideas abstractas) y rítmicos (marcan el ritmo del habla). Investigaciones de Susan Goldin-Meadow han demostrado que los niños que gesticulan al resolver problemas matemáticos aprenden más rápido que los que no lo hacen, y que indicar a los niños que gesticulen mejora su retención de conceptos nuevos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El sistema FACS (Facial Action Coding System), desarrollado por Paul Ekman y Wallace Friesen en 1978, descompone las expresiones faciales en 46 «unidades de acción» (AU) individuales, cada una correspondiente a un músculo facial específico. Una sonrisa genuina (llamada «sonrisa Duchenne» en honor al neurólogo francés Guillaume Duchenne) activa simultáneamente el músculo cigomático mayor (AU 12) y el músculo orbicular del ojo (AU 6). Una sonrisa falsa solo activa el cigomático mayor. Este sistema se usa actualmente en animación digital, detección de engaño y diagnóstico de dolor en pacientes no verbales.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival, la comunicación con los heptápodos presenta un desafío no verbal fundamental: los alienígenas carecen de expresiones faciales reconocibles para los humanos. Sus «rostros» no muestran emociones que podamos interpretar. Louise Banks debe confiar por entero en los logramas escritos — tintas proyectadas en el aire — para construir significado. La película ilustra cómo la comunicación humana depende de pistas no verbales como el tono, los gestos y las expresiones, y lo desestabilizante que resulta comunicarse cuando todos estos canales están ausentes.' },
    ],
    fact: 'El lenguaje corporal varía más entre culturas de lo que la mayoría de las personas supone. El gesto de «pulgares arriba» es positivo en Estados Unidos y Europa, pero ofensivo en partes de Medio Oriente y África occidental. Asentir con la cabeza significa «sí» en la mayor parte del mundo, pero en Bulgaria, Grecia y partes de la India puede significar «no». La distancia interpersonal cómoda durante una conversación es de 45-120 centímetros en Estados Unidos (según Edward T. Hall, quien acuñó el término «proxémica» en 1963), pero de 15-45 centímetros en países árabes y latinoamericanos. Estas variaciones demuestran que gran parte de lo que consideramos «lenguaje corporal natural» es en realidad una convención cultural aprendida.',
  },
];

// ─── Linguistic Particle Field (Canvas Background) ───────────────────────────
function LinguisticField() {
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
      hue: Math.random() > 0.5 ? '139,157,175' : '160,180,200', // fog gray tones
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

// ─── Language Header ─────────────────────────────────────────────────────────
function LanguageHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(139,157,175,0.3))' }}>
        {/* Linguistic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#langGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#8B9DAF','#A0B4C8','#6A7B8D','#B0C4D8','#7A8C9E','#9AAABB','#5A6B7D'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central speech icon */}
        <path d="M290 18 Q286 14 290 14 L310 14 Q314 14 314 18 L314 30 Q314 34 310 34 L300 34 L296 40 L298 34 L290 34 Q286 34 286 30 Z" fill="none" stroke="#8B9DAF" strokeWidth="1.5" opacity="0.6" />
        <line x1="292" y1="20" x2="308" y2="20" stroke="#8B9DAF" strokeWidth="1" opacity="0.4" />
        <line x1="292" y1="25" x2="305" y2="25" stroke="#8B9DAF" strokeWidth="1" opacity="0.3" />
        <defs>
          <linearGradient id="langGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,157,175,0.2)" />
            <stop offset="50%" stopColor="rgba(139,157,175,0.9)" />
            <stop offset="100%" stopColor="rgba(139,157,175,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#8B9DAF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">¿QUÉ ES EL LENGUAJE?</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(139,157,175,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DE LAS PALABRAS</text>
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
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
          layoutId="activeDotArrivalM1"
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em',
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase',
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
          style={{ height: '100%', background: 'linear-gradient(90deg, #8B9DAF, #B0C4D8)', borderRadius: '3px', boxShadow: '0 0 8px rgba(139,157,175,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#8B9DAF', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_ArrivalM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,15,25,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/arrival/arrival_m1.png)',
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
      <LinguisticField />

      <LanguageHeader />

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
              🏆 ¡Has dominado los fundamentos del Lenguaje!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Lingüista Cósmico
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
