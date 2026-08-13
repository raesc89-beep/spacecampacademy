'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ─── SVG Decorative Elements (Interspecies Communication themed) ────────────
function DecoSoundWave({ size = 70, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Sound wave arcs */}
      <path d="M15 30 Q15 18 30 18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M12 30 Q12 12 30 12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M9 30 Q9 6 30 6" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M15 30 Q15 42 30 42" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M12 30 Q12 48 30 48" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M9 30 Q9 54 30 54" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Source dot */}
      <circle cx="15" cy="30" r="3" fill={color} opacity="0.6" />
      {/* Floating particles */}
      <circle cx="42" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="48" cy="38" r="1" fill={color} opacity="0.3" />
      <circle cx="38" cy="48" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoBrainSvg({ size = 70, color = '#7A8C9E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Brain outline */}
      <path d="M30 10 Q15 10 12 22 Q9 34 18 40 Q14 48 22 52 Q30 56 38 52 Q46 48 42 40 Q51 34 48 22 Q45 10 30 10Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Brain fold lines */}
      <path d="M30 14 Q25 22 30 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M22 20 Q30 24 36 20" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M18 34 Q26 30 34 36" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Neural sparks */}
      <circle cx="24" cy="18" r="1.5" fill={color} opacity="0.5" />
      <circle cx="36" cy="24" r="1.5" fill={color} opacity="0.5" />
      <circle cx="28" cy="40" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoSignalDish({ size = 80, color = '#6A7B8D', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 80 56" style={{ opacity: 0.2, ...style }}>
      {/* Dish */}
      <path d="M20 35 Q40 10 60 35" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Support */}
      <line x1="40" y1="35" x2="40" y2="50" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="50" x2="50" y2="50" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Feed */}
      <line x1="40" y1="35" x2="40" y2="22" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="40" cy="20" r="2" fill={color} opacity="0.5" />
      {/* Signal waves */}
      <path d="M42 16 Q50 8 55 12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M44 14 Q54 4 60 9" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M46 12 Q58 0 65 6" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function DecoLogogram({ size = 60, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Circular logogram shape inspired by Arrival */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="2" opacity="0.4" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Ink splatter tendrils */}
      <path d="M30 6 Q26 14 28 18" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M54 30 Q46 26 42 28" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M30 54 Q34 46 32 42" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <path d="M6 30 Q14 34 18 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Core smudge */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.15" />
    </svg>
  );
}

function DecoDolphin({ size = 80, color = '#4E4E4E', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Simplified dolphin silhouette */}
      <path d="M10 28 Q18 18 30 20 Q42 16 52 20 Q60 22 66 18 Q70 16 72 18 Q68 24 62 26 Q56 30 44 30 Q34 32 24 30 Q16 32 10 28Z" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
      {/* Tail fluke */}
      <path d="M10 28 Q6 24 4 20" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M10 28 Q6 32 4 36" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Dorsal fin */}
      <path d="M38 20 Q40 12 44 18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Bubbles */}
      <circle cx="68" cy="14" r="1.5" fill={color} opacity="0.3" />
      <circle cx="72" cy="10" r="1" fill={color} opacity="0.25" />
      <circle cx="74" cy="14" r="0.8" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoAlienGlyph({ size = 60, color = '#3D3D3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Abstract alien writing marks */}
      <path d="M10 50 Q20 10 30 30 Q40 50 50 10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M15 40 Q25 20 35 40" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      {/* Dots like punctuation in unknown script */}
      <circle cx="12" cy="15" r="2" fill={color} opacity="0.4" />
      <circle cx="48" cy="45" r="2" fill={color} opacity="0.4" />
      <circle cx="30" cy="8" r="1.5" fill={color} opacity="0.3" />
      <circle cx="52" cy="20" r="1.5" fill={color} opacity="0.3" />
      {/* Horizontal line */}
      <line x1="8" y1="55" x2="52" y2="55" stroke={color} strokeWidth="1" opacity="0.2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'lenguaje-animal': [DecoSoundWave, DecoDolphin, DecoBrainSvg],
  'grandes-simios': [DecoBrainSvg, DecoSoundWave, DecoAlienGlyph],
  'delfines-cetaceos': [DecoDolphin, DecoSoundWave, DecoBrainSvg],
  'ia-lenguaje': [DecoBrainSvg, DecoAlienGlyph, DecoSignalDish],
  'seti-mensajes': [DecoSignalDish, DecoAlienGlyph, DecoLogogram],
  'xenolinguistica': [DecoLogogram, DecoAlienGlyph, DecoSignalDish],
  'pelicula-arrival': [DecoLogogram, DecoBrainSvg, DecoSoundWave],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Herzing, D.L. (2010). CHAT: A Communication System for Interspecies Interaction, Acta Astronautica, 67(11-12)',
  'Slobodchikoff, C.N. (2012). Chasing Doctor Dolittle: Learning the Language of Animals, St. Martin\'s Press',
  'Searle, J.R. (1980). Minds, Brains, and Programs, Behavioral and Brain Sciences, 3(3)',
  'Shostak, S. (2009). Confessions of an Alien Hunter: A Scientist\'s Search for Extraterrestrial Intelligence, National Geographic',
  'von Frisch, K. (1967). The Dance Language and Orientation of Bees, Harvard University Press',
  'Terrace, H.S. (1979). Nim: A Chimpanzee Who Learned Sign Language, Knopf',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'lenguaje-animal',
    title: 'Lenguaje Animal',
    color: '#8B9DAF',
    btnImage: '/assets/ciencia_arrival/infographic_m4/btn_lenguaje-animal.jpg',
    image: '/assets/ciencia_arrival/infographic_m4/hero_lenguaje-animal.jpg',
    content: [
      'Los animales no hablan como los humanos, pero poseen sistemas de comunicación sofisticados que los científicos han estudiado durante décadas. El etólogo austriaco Karl von Frisch dedicó más de 40 años a descifrar la danza de las abejas y recibió el Premio Nobel de Fisiología o Medicina en 1973 por este trabajo. Von Frisch demostró que las abejas Apis mellifera realizan una "danza del meneo" (waggle dance) dentro de la colmena para comunicar la dirección, distancia y calidad de una fuente de néctar. El ángulo de la danza respecto a la vertical indica la dirección relativa al sol, y la duración del meneo señala la distancia: aproximadamente un segundo de meneo equivale a un kilómetro de vuelo.',
      'Las ballenas jorobadas (Megaptera novaeangliae) producen secuencias vocales complejas conocidas como "cantos" que pueden durar entre 10 y 20 minutos y repetirse durante horas. El biólogo Roger Payne documentó estos cantos por primera vez en 1967 y publicó un álbum de grabaciones en 1970 que vendió más de 100,000 copias. Los cantos son exclusivos de los machos durante la temporada de apareamiento y cambian progresivamente cada año, con todas las ballenas de una misma población adoptando las modificaciones de manera sincronizada, como si siguieran una tendencia cultural compartida.',
      'Los perros de la pradera (Cynomys gunnisoni) poseen uno de los sistemas de alarma más detallados del reino animal. El biólogo Con Slobodchikoff, de la Universidad del Norte de Arizona, ha estudiado sus llamadas de alarma desde 1990 y demostró que estos roedores emiten vocalizaciones distintas según el tipo de depredador (halcón, coyote, perro doméstico, humano). Más notable aún, sus llamadas codifican información sobre el tamaño, la forma, el color y la velocidad del intruso. Un perro de la pradera puede alertar a su colonia de que se acerca "un humano alto con camiseta azul caminando rápido", todo en una ráfaga de chillidos de menos de un segundo.',
      'Los cuervos de Nueva Caledonia (Corvus moneduloides) utilizan herramientas y transmiten técnicas de fabricación entre generaciones, lo cual sugiere una forma de comunicación cultural. La etóloga Gavin Hunt documentó en 1996 que estos cuervos fabrican ganchos a partir de ramitas para extraer larvas de la corteza de los árboles. Estudios posteriores de la Universidad de Auckland mostraron que los cuervos jóvenes aprenden las técnicas observando a los adultos, y que los diseños de herramientas varían entre poblaciones geográficas, de manera similar a los dialectos en el lenguaje humano.',
      'Los elefantes africanos (Loxodonta africana) se comunican mediante infrasonidos que viajan a frecuencias por debajo de los 20 hercios, imperceptibles para el oído humano. La bióloga Katy Payne, de la Universidad de Cornell, descubrió esta comunicación infrasónica en 1984 mientras visitaba el zoológico de Portland, Oregón, cuando sintió vibraciones en el aire cerca de los elefantes. Sus investigaciones demostraron que estas llamadas pueden viajar hasta 10 kilómetros de distancia, permitiendo a las manadas coordinar movimientos a través de vastas extensiones de sabana sin contacto visual directo entre los grupos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las sepias (cefalópodos marinos del orden Sepiida) se comunican cambiando los patrones de color y textura de su piel en milisegundos. Poseen entre 10 y 20 millones de cromatóforos — células especializadas que contienen pigmentos — controlados directamente por el sistema nervioso. Un estudio de la Universidad de Cambridge en 2017 demostró que las sepias pueden mostrar un patrón de cortejo a una hembra por un lado de su cuerpo mientras simultáneamente muestran un patrón de camuflaje al macho rival por el otro lado, literalmente enviando dos mensajes diferentes a la vez.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival (2016), Louise Banks debe descifrar un sistema de comunicación radicalmente diferente al lenguaje humano. Los heptápodos no usan sonidos secuenciales como los animales terrestres, sino que producen logogramas circulares completos con sus extremidades. Esta diferencia entre comunicación lineal (sonido) y simultánea (visual-espacial) refleja un problema real en la lingüística comparada: ¿puede un sistema de signos funcionar sin secuencialidad temporal? Los logogramas de los heptápodos sugieren que sí.' },
    ],
    fact: 'Las hormigas cortadoras de hojas (género Atta) utilizan al menos 20 señales químicas diferentes (feromonas) para comunicar información sobre rutas de forrajeo, alarma ante depredadores, identificación de compañeras de colonia y estado de salud. Un estudio de la Universidad de Sussex publicado en 2006 demostró que la complejidad combinada de estas señales químicas supera en densidad informativa a muchos sistemas de comunicación vocal de mamíferos. Una colonia de Atta puede contener hasta 8 millones de individuos coordinados casi exclusivamente por señales químicas.',
  },
  {
    id: 'grandes-simios',
    title: 'Grandes Simios y el Lenguaje',
    color: '#7A8C9E',
    btnImage: '/assets/ciencia_arrival/infographic_m4/btn_grandes-simios.jpg',
    image: '/assets/ciencia_arrival/infographic_m4/hero_grandes-simios.jpg',
    content: [
      'En 1966, los psicólogos Allen y Beatrix Gardner iniciaron un proyecto en la Universidad de Nevada que transformaría nuestra comprensión de la comunicación animal. Adoptaron a una chimpancé hembra de aproximadamente 10 meses llamada Washoe y le enseñaron el Lenguaje de Señas Americano (ASL). El proyecto partía de una observación simple pero profunda: los intentos previos de enseñar lenguaje oral a chimpancés habían fracasado porque su anatomía vocal no permite producir sonidos del habla humana, pero sus manos poseen la destreza motora necesaria para articular señas. Washoe aprendió su primera seña ("más") a los 14 meses de entrenamiento.',
      'Washoe llegó a dominar aproximadamente 350 señas de ASL y las combinaba en frases cortas como "dame dulce" o "abre puerta prisa". El hallazgo más notable ocurrió cuando Washoe, sin instrucción previa, combinó las señas de "agua" y "pájaro" para describir un cisne que vio en un lago — creando una combinación nueva que ningún humano le había enseñado. Cuando adoptó un chimpancé joven llamado Loulis en 1979, Washoe le enseñó señas de ASL sin intervención humana, lo cual sugería transmisión cultural de un sistema simbólico. Loulis aprendió más de 50 señas directamente de Washoe y otros chimpancés del grupo.',
      'La gorila Koko (Hanabi-Ko), nacida en el zoológico de San Francisco el 4 de julio de 1971, trabajó con la psicóloga Francine Patterson desde 1972 hasta la muerte de Koko en junio de 2018. Patterson reportó que Koko dominaba más de 1,000 señas de un lenguaje gestual modificado llamado GSL (Gorilla Sign Language) y comprendía aproximadamente 2,000 palabras de inglés hablado. Koko se hizo mundialmente conocida por tener mascotas — adoptó varios gatos a los que les puso nombre con señas — y por expresar emociones complejas. Cuando su gato "All Ball" fue atropellado por un auto en 1984, Koko señó "gato llorar triste".',
      'El bonobo Kanzi, nacido en 1980, representó un avance metodológico crucial bajo la dirección de la primatóloga Sue Savage-Rumbaugh en el Centro de Investigación de Idiomas de la Universidad Estatal de Georgia. A diferencia de Washoe y Koko, Kanzi no fue entrenado directamente: aprendió a usar un tablero de lexigramas (símbolos abstractos que representan palabras) observando a los investigadores intentar enseñar a su madre adoptiva. Kanzi demostró comprensión de estructuras gramaticales simples y podía distinguir entre "lleva la pelota al río" y "lleva el río a la pelota", evidenciando sensibilidad al orden de las palabras.',
      'Sin embargo, el psicólogo Herbert Terrace de la Universidad de Columbia desafió estas conclusiones con su proyecto Nim Chimpsky (nombrado en referencia irónica al lingüista Noam Chomsky). Terrace entrenó al chimpancé Nim en ASL entre 1973 y 1977, y al analizar más de 20,000 combinaciones de señas filmadas, concluyó en 1979 que Nim simplemente imitaba a sus entrenadores y respondía a indicaciones sutiles, sin comprender realmente la estructura gramatical. Terrace argumentó que los primates no generaban lenguaje genuino sino secuencias condicionadas de señas para obtener recompensas. Este debate permanece sin resolución definitiva y plantea preguntas fundamentales sobre qué constituye el "lenguaje verdadero".',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El lingüista Noam Chomsky sostiene desde 1957 que el lenguaje humano es cualitativamente diferente de toda comunicación animal. Según su teoría de la gramática generativa, los humanos poseemos un "dispositivo de adquisición del lenguaje" innato (LAD) que nos permite producir y comprender un número infinito de oraciones a partir de un conjunto finito de reglas. Chomsky argumenta que ningún primate ha demostrado esta "recursividad" — la capacidad de insertar oraciones dentro de oraciones de forma ilimitada: "El perro que mordió al gato que perseguía al ratón corrió."' },
      { label: 'Dato Científico', icon: 'atom', text: 'En 2015, un equipo de la Universidad de St. Andrews publicó en la revista Current Biology un análisis de 4,500 gestos grabados de chimpancés salvajes en la selva de Budongo, Uganda. Identificaron 66 tipos de gestos con significados específicos y consistentes, como "rascarse" para pedir acicalamiento o "golpear el suelo" para indicar "ven aquí". El estudio sugiere que los chimpancés poseen un repertorio gestual con significados compartidos entre poblaciones, algo que podría considerarse un "diccionario natural" de la comunicación primate.' },
    ],
    fact: 'La investigadora Tetsuro Matsuzawa del Instituto de Investigación de Primates de la Universidad de Kioto demostró en 2007 que los chimpancés jóvenes superan a los humanos adultos en tareas de memoria fotográfica a corto plazo. En su experimento, números del 1 al 9 aparecían brevemente en una pantalla táctil y luego eran reemplazados por cuadrados blancos. El chimpancé Ayumu, de 5 años, recordaba la posición de los nueve números con una precisión del 80% tras una exposición de apenas 210 milisegundos. Los humanos universitarios lograron solo un 40% de acierto en la misma tarea.',
  },
  {
    id: 'delfines-cetaceos',
    title: 'Delfines y Cetáceos',
    color: '#6A7B8D',
    btnImage: '/assets/ciencia_arrival/infographic_m4/btn_delfines-cetaceos.jpg',
    image: '/assets/ciencia_arrival/infographic_m4/hero_delfines-cetaceos.jpg',
    content: [
      'Los delfines nariz de botella (Tursiops truncatus) poseen cerebros que, en proporción a su tamaño corporal, son los segundos más grandes del reino animal después del ser humano. Su neocórtex — la capa exterior del cerebro responsable del pensamiento complejo — tiene más pliegues y circunvoluciones que el cerebro humano, lo que indica una enorme superficie de procesamiento neuronal. El neurocientífico Lori Marino, de la Universidad Emory, publicó en 2002 un análisis comparativo que demostró que el cociente de encefalización (EQ) de los delfines nariz de botella es de 4.14, superado únicamente por el EQ humano de 7.44, y muy por encima de los grandes simios, que promedian un EQ de 2.48.',
      'Cada delfín nariz de botella desarrolla un "silbido firma" (signature whistle) único durante sus primeros meses de vida, que funciona como un nombre propio. La bióloga marina Stephanie King, de la Universidad de St. Andrews, demostró en 2013 en la revista Proceedings of the National Academy of Sciences que los delfines reconocen y responden selectivamente a los silbidos firma de sus compañeros, incluso después de separaciones de más de 20 años. Los delfines también pueden imitar los silbidos firma de otros individuos, lo cual equivale a "llamar por su nombre" a un compañero — un comportamiento que, fuera de los humanos, solo se ha documentado en delfines.',
      'La bióloga marina Denise Herzing ha estudiado una población de delfines manchados del Atlántico (Stenella frontalis) en las Bahamas desde 1985, acumulando más de 30 años de datos de campo continuos. En 2010, Herzing y su equipo del Wild Dolphin Project desarrollaron el dispositivo CHAT (Cetacean Hearing and Telemetry), un ordenador acuático portátil que permite a los buzos reproducir silbidos artificiales asignados a objetos (como "alga" o "ola") y detectar si los delfines los utilizan. El objetivo era crear un vocabulario compartido entre humanos y delfines — un "puente lingüístico" entre dos especies con inteligencia compleja.',
      'Los cachalotes (Physeter macrocephalus) producen patrones de chasquidos llamados "codas" que varían entre clanes sociales de manera análoga a los dialectos humanos. El biólogo marino Shane Gero, del Proyecto Dominica de Cachalotes, ha documentado desde 2005 que diferentes clanes en el Caribe oriental usan codas con ritmos distintos. Un estudio de 2016 publicado en Royal Society Open Science identificó al menos 21 tipos de codas diferentes en esta población. En 2024, el proyecto CETI (Cetacean Translation Initiative) anunció el uso de modelos de aprendizaje automático para analizar más de 8,700 codas registradas de cachalotes, buscando patrones combinatorios que podrían indicar una estructura gramatical rudimentaria.',
      'Las orcas (Orcinus orca) exhiben tradiciones culturales que se transmiten de madres a crías durante décadas. Cada grupo familiar (pod) posee un repertorio vocal único compuesto por entre 7 y 17 tipos de llamadas distintas que se mantienen estables durante generaciones. El biólogo John Ford, del Departamento de Pesca y Océanos de Canadá, documentó en 1991 que los pods del norte de Vancouver comparten ciertas llamadas con pods relacionados pero no con pods distantes genéticamente, creando "dialectos familiares". Las orcas residentes del noroeste del Pacífico llevan sin cambiar sustancialmente sus dialectos vocales al menos desde que comenzaron las grabaciones en la década de 1970.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El fisiólogo John C. Lilly fue pionero en los intentos de comunicación con delfines en la década de 1960 en su laboratorio de las Islas Vírgenes. Lilly publicó en 1961 el libro "Man and Dolphin", donde predijo que los humanos establecerían comunicación lingüística con delfines antes de 1975. Su asistente Margaret Howe vivió durante 10 semanas en un apartamento parcialmente inundado con un delfín llamado Peter, intentando enseñarle a pronunciar palabras en inglés. El proyecto fue abandonado después de controversias éticas y resultados limitados, pero inspiró décadas de investigación posterior.' },
      { label: 'En la Película', icon: 'zap', text: 'El desafío que Louise Banks enfrenta en Arrival — descifrar un sistema de comunicación sin referentes compartidos — es análogo al problema real que Denise Herzing enfrenta con los delfines del Atlántico. Herzing ha señalado en múltiples conferencias (incluyendo su charla TED de 2013) que la diferencia crucial entre la comunicación humano-delfín y la comunicación con una inteligencia extraterrestre es que al menos compartimos un planeta, una química y una historia evolutiva con los delfines. Con los heptápodos, Louise no comparte absolutamente nada.' },
    ],
    fact: 'Los delfines nariz de botella son uno de los pocos animales que pasan la "prueba del espejo" de autoconciencia. En 2001, los investigadores Diana Reiss y Lori Marino del Acuario de Nueva York publicaron en Proceedings of the National Academy of Sciences que los delfines se reconocen en un espejo, se examinan marcas hechas en su cuerpo e investigan su propia imagen. Antes de este estudio, solo los grandes simios y los humanos habían superado esta prueba. Posteriormente, los elefantes (2006), las urracas (2008) y los peces limpiadores (2019) también la superaron.',
  },
  {
    id: 'ia-lenguaje',
    title: 'Inteligencia Artificial y Lenguaje',
    color: '#4E4E4E',
    btnImage: '/assets/ciencia_arrival/infographic_m4/btn_ia-lenguaje.jpg',
    image: '/assets/ciencia_arrival/infographic_m4/hero_ia-lenguaje.jpg',
    content: [
      'El procesamiento del lenguaje natural (PLN o NLP por sus siglas en inglés, Natural Language Processing) es la rama de la inteligencia artificial dedicada a la interacción entre computadoras y lenguaje humano. Sus orígenes se remontan a 1950, cuando el matemático británico Alan Turing publicó su artículo "Computing Machinery and Intelligence" en la revista Mind, proponiendo lo que hoy se conoce como el Test de Turing: si una máquina puede mantener una conversación escrita de manera que un evaluador humano no pueda distinguirla de una persona real, entonces esa máquina puede considerarse "inteligente". Turing predijo que para el año 2000, las máquinas engañarían al 30% de los evaluadores en conversaciones de cinco minutos.',
      'El primer chatbot de la historia fue ELIZA, creado por el científico informático Joseph Weizenbaum en el MIT entre 1964 y 1966. ELIZA simulaba ser un terapeuta rogeriano reformulando las frases del usuario como preguntas. Si escribías "Me siento triste", ELIZA respondía "¿Por qué te sientes triste?". Weizenbaum quedó perturbado al descubrir que muchos usuarios desarrollaban conexiones emocionales con el programa, incluyendo su propia secretaria, que le pidió privacidad durante sus "sesiones". Esto lo llevó a advertir sobre los peligros de atribuir comprensión a máquinas que simplemente manipulan símbolos sin entender su significado.',
      'En 1980, el filósofo John Searle de la Universidad de California en Berkeley publicó el experimento mental de la "Habitación China" Searle propuso imaginar a una persona encerrada en una habitación que recibe preguntas escritas en chino por una ranura. La persona no habla chino, pero tiene un manual de reglas que le indica qué caracteres chinos debe enviar como respuesta a cada entrada. Desde fuera, parece que la habitación "entiende" chino, pero la persona dentro solo manipula símbolos sin comprenderlos. Searle argumentó que las computadoras, por potentes que sean, hacen exactamente lo mismo: procesan símbolos sin comprensión semántica genuina.',
      'Los modelos de lenguaje grande (LLM, Large Language Models) representan un salto cuantitativo en el PLN. GPT-3, desarrollado por OpenAI y presentado en junio de 2020, contiene 175 mil millones de parámetros entrenados con 570 gigabytes de texto extraído de internet. Su sucesor GPT-4, lanzado en marzo de 2023, demostró capacidades que incluyen aprobar el examen de la barra de abogados de Estados Unidos en el percentil 90, resolver problemas de matemáticas a nivel universitario y generar código funcional en múltiples lenguajes de programación. Estos sistemas generan texto prediciendo la siguiente palabra más probable dada una secuencia de entrada, sin poseer un modelo del mundo ni intencionalidad.',
      'El debate filosófico sobre si las máquinas pueden "comprender" el lenguaje sigue abierto. El lingüista computacional Emily Bender y la científica de datos Timnit Gebru publicaron en 2021 el artículo "On the Dangers of Stochastic Parrots" (Sobre los peligros de los loros estocásticos), argumentando que los LLM son "loros estocásticos" que producen texto estadísticamente plausible sin comprensión. Por otro lado, investigadores como Murray Shanahan de DeepMind sostienen que la pregunta "¿entiende la máquina?" podría estar mal formulada, ya que el concepto de "comprensión" quizás no sea binario sino un espectro con múltiples niveles, desde la manipulación sintáctica hasta la experiencia consciente.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2014, un chatbot llamado "Eugene Goostman", que simulaba ser un niño ucraniano de 13 años, logró convencer al 33% de los jueces en un concurso organizado por la Royal Society de Londres de que era un ser humano real. Técnicamente, superó el umbral del 30% que Turing había propuesto, pero los críticos señalaron que el programa explotó el hecho de que los jueces esperaban errores gramaticales de un adolescente cuyo idioma nativo no era el inglés, en lugar de demostrar comprensión genuina del lenguaje.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival, Louise Banks rechaza utilizar un enfoque computacional para descifrar el lenguaje de los heptápodos. Mientras el ejército presiona por usar algoritmos de traducción automática, Louise insiste en la inmersión directa y el contacto personal. Esta decisión refleja una tensión real en la lingüística de campo: los sistemas de traducción automática requieren grandes corpus de texto paralelo (textos en dos idiomas), pero con los heptápodos — como con cualquier lengua no documentada — ese corpus no existe. El descifrado debe comenzar desde cero, con gestos, objetos y paciencia.' },
    ],
    fact: 'El proyecto Google Translate procesaba en 2023 más de 143 mil millones de palabras al día en 133 idiomas. Sin embargo, de las aproximadamente 7,000 lenguas que existen en el mundo, Google Translate solo cubre el 1.9% de ellas. Las lenguas indígenas, muchas en peligro de extinción, carecen del corpus digital necesario para entrenar sistemas de traducción automática. El lingüista David Crystal estima que una lengua muere cada 14 días en promedio, y con ella desaparece una forma única de categorizar y comprender la realidad — una pérdida que la traducción automática no puede prevenir ni revertir.',
  },
  {
    id: 'seti-mensajes',
    title: 'SETI y Mensajes Interestelares',
    color: '#3D3D3D',
    btnImage: '/assets/ciencia_arrival/infographic_m4/btn_seti-mensajes.jpg',
    image: '/assets/ciencia_arrival/infographic_m4/hero_seti-mensajes.jpg',
    content: [
      'El 16 de noviembre de 1974, el radiotelescopio de Arecibo en Puerto Rico transmitió un mensaje de 1,679 bits hacia el cúmulo globular M13, ubicado a 25,000 años luz de la Tierra. El mensaje fue diseñado por el astrónomo Frank Drake y el astrofísico Carl Sagan. El número 1,679 fue elegido por ser el producto de dos números primos (23 × 73), lo cual proporcionaría a un receptor inteligente la pista para organizar los bits en una cuadrícula de 23 columnas y 73 filas. Cuando se decodifica visualmente, el mensaje muestra los números del 1 al 10 en binario, los números atómicos del hidrógeno, carbono, nitrógeno, oxígeno y fósforo, la estructura del ADN, una figura humana, el sistema solar y una representación del propio telescopio de Arecibo.',
      'Las placas Pioneer fueron los primeros mensajes físicos enviados más allá del sistema solar. Diseñadas por Carl Sagan y Frank Drake y dibujadas por la artista Linda Salzman Sagan (esposa de Carl), estas placas de aluminio anodizado con oro fueron instaladas en las sondas Pioneer 10 (lanzada el 2 de marzo de 1972) y Pioneer 11 (lanzada el 5 de abril de 1973). Cada placa mide 23 × 15 centímetros y muestra figuras de un hombre y una mujer desnudos, la posición del Sol respecto a 14 púlsares, una representación del sistema solar y un diagrama de la transición del átomo de hidrógeno, la unidad de longitud y tiempo usada en toda la placa.',
      'El Disco de Oro de las Voyager es el mensaje interestelar más ambicioso jamás enviado. Instalado en las sondas Voyager 1 (lanzada el 5 de septiembre de 1977) y Voyager 2 (lanzada el 20 de agosto de 1977), el disco es un fonógrafo de cobre chapado en oro de 30 centímetros de diámetro que contiene 115 imágenes codificadas en señal analógica, saludos en 55 idiomas, una selección de sonidos de la Tierra (desde viento y truenos hasta cantos de pájaros y una madre besando a su bebé) y 90 minutos de música que incluyen obras de Bach, Beethoven, Mozart, Chuck Berry y música de Perú, Japón, India y Senegal.',
      'El debate sobre METI (Messaging Extraterrestrial Intelligence, envío activo de mensajes al espacio) ha generado una de las controversias más intensas de la ciencia contemporánea. El astrónomo Seth Shostak, director del Instituto SETI, ha argumentado que las señales de televisión y radar que la Tierra emite desde la década de 1930 ya han viajado más de 90 años luz, alertando a cualquier civilización cercana de nuestra presencia. Sin embargo, el cosmólogo Stephen Hawking advirtió en 2010 que enviar mensajes deliberados al espacio podría ser peligroso: "Si los alienígenas nos visitan, el resultado sería similar a cuando Colón llegó a América, lo cual no salió bien para los nativos americanos."',
      'La ecuación de Drake, formulada por el astrónomo Frank Drake en 1961 durante una reunión en el Observatorio Nacional de Radioastronomía en Green Bank, Virginia Occidental, estima el número de civilizaciones en nuestra galaxia con las que podríamos comunicarnos. La ecuación multiplica siete factores: la tasa de formación de estrellas, la fracción con planetas, el número de planetas habitables, la fracción donde surge vida, la fracción con vida inteligente, la fracción que desarrolla tecnología de comunicación y la duración promedio de tales civilizaciones. Las estimaciones varían entre 1 (solo nosotros) y 100 millones de civilizaciones, dependiendo de los valores asumidos para cada factor.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La señal "Wow!" fue detectada el 15 de agosto de 1977 por el radiotelescopio Big Ear de la Universidad Estatal de Ohio. El astrónomo Jerry Ehman, al revisar los datos impresos por computadora, rodeó la secuencia de caracteres "6EQUJ5" y escribió "Wow!" al margen. La señal duró 72 segundos, coincidió con la frecuencia del hidrógeno (1420 MHz) que los científicos consideran el canal natural de comunicación interestelar, y provenía de la constelación de Sagitario. A pesar de décadas de búsqueda, la señal nunca se repitió y su origen sigue sin explicación confirmada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El mensaje de Arecibo viaja a la velocidad de la luz (299,792 km/s) y tardará aproximadamente 25,000 años en llegar al cúmulo M13. Si una civilización lo recibiera y respondiera inmediatamente, la respuesta tardaría otros 25,000 años en llegar a la Tierra, para un tiempo total de viaje ida y vuelta de 50,000 años. Para entonces, M13 ya no estará en la posición donde fue dirigido el mensaje, porque las estrellas se mueven. El mensaje fue más una demostración de capacidad tecnológica que un intento real de comunicación. Drake lo describió como "estrictamente simbólico".' },
    ],
    fact: 'El Voyager 1 es el objeto fabricado por humanos más lejano de la Tierra. Al momento de este escrito, se encuentra a más de 24 mil millones de kilómetros de distancia y cruza el espacio interestelar desde agosto de 2012, cuando atravesó la heliopausa — el límite donde el viento solar cede ante el medio interestelar. A su velocidad actual de 17 km/s (61,000 km/h), tardará unos 40,000 años en pasar cerca de la estrella Gliese 445 en la constelación de Camelopardalis. El Disco de Oro que lleva a bordo está diseñado para durar mil millones de años en el vacío del espacio.',
  },
  {
    id: 'xenolinguistica',
    title: 'Xenolingüística',
    color: '#2C2C2C',
    btnImage: '/assets/ciencia_arrival/infographic_m4/btn_xenolinguistica.jpg',
    image: '/assets/ciencia_arrival/infographic_m4/hero_xenolinguistica.jpg',
    content: [
      'La xenolingüística es la disciplina teórica que estudia los problemas de comunicación con inteligencias no humanas, particularmente extraterrestres. Aunque todavía no existe como campo aplicado (porque no hemos contactado con ninguna inteligencia extraterrestre), sus fundamentos teóricos combinan lingüística, semiótica, teoría de la información, biología y filosofía de la mente. El término fue popularizado en la ciencia ficción, pero académicos como el lingüista Gonzalo Rubio de la Universidad Penn State y la astrobióloga Sheri Wells-Jensen de la Universidad Bowling Green han publicado trabajos serios sobre los desafíos lingüísticos del primer contacto.',
      'Uno de los problemas centrales de la xenolingüística es el de los "universales cognitivos": ¿existen conceptos que cualquier inteligencia necesariamente debe poseer? Los matemáticos y filósofos han propuesto que las matemáticas podrían ser un lenguaje universal, ya que las relaciones numéricas (como que 2+3=5 o que pi es la razón entre la circunferencia y el diámetro de un círculo) son verdades independientes de la biología o la cultura. En 1960, el matemático y filósofo holandés Hans Freudenthal publicó "Lincos: Design of a Language for Cosmic Intercourse", un lenguaje artificial diseñado para comunicarse con extraterrestres, basado enteramente en lógica matemática y construido paso a paso desde conceptos aritméticos básicos.',
      'Sin embargo, la suposición de que las matemáticas son universales ha sido cuestionada. El filósofo Ludwig Wittgenstein argumentó que incluso las reglas matemáticas dependen de prácticas sociales compartidas: para entender que "2+3=5", necesitas comprender los conceptos de cantidad, adición e igualdad, que a su vez requieren experiencias perceptuales específicas. Una inteligencia que no perciba objetos discretos (por ejemplo, una conciencia colectiva sin noción de individualidad) podría no tener el concepto de "número natural". La bióloga Joan Roughgarden de Stanford ha señalado que incluso la clasificación binaria de seres vivos en "individuos" es una simplificación que no aplica a organismos como los hongos miceliales o las colonias de sifonóforos.',
      'El lingüista Noam Chomsky ha señalado otro obstáculo fundamental: la gramática universal — las estructuras profundas comunes a todos los idiomas humanos — podría ser un producto de la evolución específica del cerebro humano, no una propiedad del lenguaje en sí. Si la gramática universal es biológica, entonces una inteligencia extraterrestre con una neurología diferente podría tener un "lenguaje" que no comparte ninguna estructura con los nuestros: sin sujetos, sin verbos, sin referencia temporal, sin distinción entre afirmación y pregunta. Comunicarse con tal inteligencia requeriría inventar categorías lingüísticas nuevas que aún no existen.',
      'El problema de la "base sensorial compartida" es quizás el más difícil de todos. Los lenguajes humanos están anclados en experiencias sensoriales comunes: vemos colores, escuchamos sonidos, sentimos temperatura. Pero una inteligencia extraterrestre podría percibir el mundo a través de sentidos que no poseemos — ecolocalización, campos eléctricos, percepción directa de campos magnéticos, sensibilidad a la radiación gamma — y carecer de los que consideramos básicos. Un ser que "ve" en ondas de radio no tendría concepto de "rojo" o "azul". Un ser que percibe el tiempo de manera no lineal (como los heptápodos de Arrival) no tendría pasado ni futuro como categorías separadas, y su lenguaje reflejaría esa percepción radicalmente diferente.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El lógico y matemático Alexander Ollongren, de la Universidad de Leiden en los Países Bajos, desarrolló a partir de 2013 una extensión del Lincos de Freudenthal llamada "Lincos 2.0", que incorpora teoría de tipos y lógica constructiva para expresar conceptos más complejos como la causalidad, la probabilidad y las relaciones temporales. Ollongren publicó su sistema completo en el libro "Astrolinguistics" (2013), donde demuestra cómo codificar mensajes sobre biología básica, comportamiento social e incluso conceptos éticos elementales usando únicamente lógica formal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La paradoja de Fermi — formulada por el físico Enrico Fermi en 1950 durante un almuerzo en el Laboratorio Nacional de Los Álamos — plantea la pregunta: si la galaxia es tan antigua y vasta, ¿por qué no hemos encontrado evidencia de civilizaciones extraterrestres? Una posible respuesta, propuesta por el astrobiólogo Charles Lineweaver de la Universidad Nacional Australiana en 2009, es que la inteligencia tecnológica podría ser un accidente evolutivo extremadamente raro, no una consecuencia inevitable de la evolución. En la Tierra, de los miles de millones de especies que han existido, solo una desarrolló tecnología.' },
    ],
    fact: 'La astrobióloga y lingüista ciega Sheri Wells-Jensen de la Universidad Bowling Green State ha argumentado desde 2015 que nuestras suposiciones sobre comunicación extraterrestre están profundamente sesgadas por nuestra biología visual. Señala que el 80% de los esquemas de comunicación interestelar propuestos dependen de la visión — imágenes, diagramas, símbolos gráficos — lo cual excluye automáticamente a cualquier inteligencia que no posea visión. Wells-Jensen propone diseñar mensajes "amodales" que no dependan de ningún sentido específico, utilizando patrones temporales puros como secuencias rítmicas que podrían ser percibidas por cualquier sistema sensorial capaz de detectar cambios en el tiempo.',
  },
  {
    id: 'pelicula-arrival',
    title: 'La Película Arrival',
    color: '#1B1B1B',
    btnImage: '/assets/ciencia_arrival/infographic_m4/btn_pelicula-arrival.jpg',
    image: '/assets/ciencia_arrival/infographic_m4/hero_pelicula-arrival.jpg',
    content: [
      'Arrival (2016), dirigida por el cineasta canadiense Denis Villeneuve y basada en el relato "Story of Your Life" (1998) de Ted Chiang, es una de las pocas películas de ciencia ficción que coloca la lingüística — no la acción ni la tecnología — en el centro de la narrativa. La protagonista, la Dra. Louise Banks (interpretada por Amy Adams), es una lingüista de campo contratada por el ejército de Estados Unidos cuando doce naves extraterrestres aparecen en distintos puntos del planeta. La película fue producida por FilmNation Entertainment y 21 Laps Entertainment con un presupuesto de 47 millones de dólares, y recaudó más de 203 millones de dólares en taquilla mundial.',
      'Los heptápodos — llamados así porque poseen siete extremidades — se comunican mediante dos sistemas distintos que Louise denomina Heptapod A (vocal) y Heptapod B (escrito). El Heptapod A consiste en sonidos guturales complejos que los humanos apenas pueden distinguir. El Heptapod B consiste en logogramas circulares que los heptápodos producen expulsando una sustancia similar a tinta desde sus extremidades. El punto central de la película es que estos dos sistemas no son versiones oral y escrita del mismo lenguaje (como lo son el español hablado y escrito), sino dos lenguajes fundamentalmente diferentes. El Heptapod B es semasiográfico: transmite significado sin codificar sonidos.',
      'El diseño visual de los logogramas fue creado por la artista Martine Bertrand y el equipo de efectos visuales de Oblique FX, dirigido por el supervisor de efectos especiales Louis Morin. Bertrand trabajó con pintura de calamares y tinta sumergidas en agua para crear las formas orgánicas de los logogramas. Cada logograma fue diseñado para parecer producido por una extremidad biológica en un movimiento circular continuo, con variaciones en el grosor, la textura y las ramificaciones que codifican matices de significado. El equipo creó más de 100 logogramas únicos para la película, cada uno con diferencias sutiles que Louise debe aprender a interpretar.',
      'La película explora una versión de la hipótesis Sapir-Whorf, específicamente su forma "fuerte" o determinismo lingüístico: la idea de que el lenguaje que hablas no solo influye en tu pensamiento, sino que lo determina. En la película, a medida que Louise aprende el Heptapod B, su percepción del tiempo cambia. Comienza a experimentar "recuerdos" del futuro porque el Heptapod B no codifica el tiempo de forma lineal. Los logogramas contienen toda la información de una oración simultáneamente, sin inicio ni final, reflejando una percepción del tiempo en la que pasado, presente y futuro coexisten como una totalidad. Esta es una extrapolación dramática de la hipótesis real, que en lingüística se refiere a efectos más sutiles como la influencia del vocabulario en la categorización del color.',
      'Arrival fue nominada a ocho premios de la Academia en la ceremonia de 2017, incluyendo Mejor Película, y ganó el Óscar a Mejor Edición de Sonido. La crítica destacó la dirección de Villeneuve, la actuación contenida de Adams y la partitura musical de Jóhann Jóhannsson, que mezcla sonidos orquestales con vocalizaciones humanas procesadas electrónicamente para evocar la alienación y la belleza del contacto. El crítico de cine A.O. Scott del New York Times escribió que Arrival es "una película de ciencia ficción que tiene la valentía de ser sobre ideas en lugar de explosiones". La película demostró que el público masivo puede conectar con una historia donde el arma más poderosa no es un misil, sino la comprensión de un lenguaje.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Una de las escenas más reveladoras de Arrival ocurre cuando Louise intenta explicar al coronel Weber por qué no puede simplemente "preguntar" a los heptápodos cuál es su propósito. Louise señala que para formular esa pregunta, primero necesita que los heptápodos comprendan qué es una "pregunta", qué significa "propósito", y que tengan un concepto equivalente a "intención". Esta escena refleja un problema real en lingüística de campo conocido como el "problema de la indeterminación de la traducción radical" formulado por el filósofo W.V.O. Quine en 1960 en su libro "Word and Object".' },
      { label: 'Dato Científico', icon: 'atom', text: 'La lingüista Jessica Coon de la Universidad McGill fue consultora lingüística de la película Arrival. Coon estudia lenguas mayas de México y Guatemala, idiomas con estructuras gramaticales que difieren radicalmente del inglés y el español. En una entrevista de 2016 con The Atlantic, Coon explicó que la metodología que Louise usa en la película — comenzar con sustantivos concretos señalando objetos, luego avanzar a verbos y relaciones abstractas — es exactamente el procedimiento que los lingüistas de campo utilizan al documentar lenguas no escritas por primera vez.' },
    ],
    fact: 'Denis Villeneuve reveló en entrevistas que su decisión de filmar los logogramas como círculos de tinta se inspiró en la caligrafía ensō del budismo zen, donde el monje traza un círculo con un solo movimiento de pincel que representa la iluminación, la fuerza, el universo y el vacío simultáneamente. Esta conexión no es casual: tanto el ensō como los logogramas de los heptápodos codifican un concepto completo en una forma circular que no tiene principio ni final, reflejando una percepción no lineal de la realidad. El ensō tardó siglos en desarrollarse como práctica; los heptápodos desarrollaron su escritura durante millones de años de evolución.',
  },
];

// ─── Fog Particle Field (Canvas Background) ──────────────────────────────────
function FogParticleField() {
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
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2.0 + 0.3,
      o: Math.random() * 0.3 + 0.05,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.12,
      hue: Math.random() > 0.5 ? '139,157,175' : '106,123,141', // fog grays
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.15;
        p.x += p.drift;
        p.y -= 0.05;
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

// ─── Communication Header ────────────────────────────────────────────────────
function CommunicationHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(139,157,175,0.3))' }}>
        {/* Arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#fogGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#8B9DAF','#7A8C9E','#6A7B8D','#4E4E4E','#3D3D3D','#2C2C2C','#1B1B1B'];
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
        <circle cx="300" cy="30" r="8" fill="none" stroke="#8B9DAF" strokeWidth="0.8" opacity="0.3" />
        <circle cx="300" cy="30" r="3" fill="#8B9DAF" opacity="0.5" />
        <defs>
          <linearGradient id="fogGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,157,175,0.2)" />
            <stop offset="50%" stopColor="rgba(139,157,175,0.9)" />
            <stop offset="100%" stopColor="rgba(139,157,175,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#8B9DAF" fontSize="16" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">COMUNICACIÓN CON OTRAS ESPECIES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(139,157,175,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">DEL LENGUAJE ANIMAL AL PRIMER CONTACTO</text>
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
          layoutId="activeDotArrivalM4"
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
export default function InteractiveInfographic_ArrivalM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,15,20,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/arrival/arrival_m4.png)',
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
      <FogParticleField />

      <CommunicationHeader />

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
              🏆 ¡Has explorado todos los secretos de la Comunicación Interespecies!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Lector de Mundos
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
