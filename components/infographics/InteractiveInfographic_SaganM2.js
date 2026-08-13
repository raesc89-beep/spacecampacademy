'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Cosmos / Space themed) ————————————————————
function DecoGalaxy({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(45 30 30)" />
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3" transform="rotate(90 30 30)" />
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" transform="rotate(135 30 30)" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoStarfield({ size = 70, color = '#9370C4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Scattered stars */}
      {[[12,8],[45,12],[8,35],[52,28],[25,50],[38,48],[15,22],[48,45],[30,15],[10,52]].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={1 + (i % 3) * 0.5} fill={color} opacity={0.3 + (i % 4) * 0.15} />
      ))}
      {/* Star cross */}
      <line x1="30" y1="25" x2="30" y2="35" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="25" y1="30" x2="35" y2="30" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="27" y1="27" x2="33" y2="33" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="33" y1="27" x2="27" y2="33" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoSpaceship({ size = 80, color = '#7A5BAF', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.22, ...style }}>
      {/* Ship of the Imagination silhouette */}
      <path d="M40 6 L28 32 Q30 38 40 40 Q50 38 52 32 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <ellipse cx="40" cy="34" rx="14" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="40" cy="20" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="40" cy="20" r="2" fill={color} opacity="0.4" />
      {/* Trail */}
      <line x1="36" y1="40" x2="34" y2="48" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="40" y1="40" x2="40" y2="48" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="44" y1="40" x2="46" y2="48" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoCalendar({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Calendar outline */}
      <rect x="8" y="12" width="44" height="38" rx="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="8" y1="22" x2="52" y2="22" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Top tabs */}
      <line x1="18" y1="8" x2="18" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="42" y1="8" x2="42" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Grid dots for days */}
      {[0,1,2,3,4].map(r => [0,1,2,3,4,5].map(c => (
        <circle key={`${r}-${c}`} cx={14 + c * 7} cy={28 + r * 5} r="1" fill={color} opacity={r === 4 && c === 5 ? 0.9 : 0.3} />
      )))}
    </svg>
  );
}

function DecoDNA({ size = 60, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Double helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 58" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 58" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Cross rungs */}
      <line x1="24" y1="10" x2="36" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="20" x2="42" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="30" x2="36" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="40" x2="42" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="50" x2="36" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoTelevision({ size = 70, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 50" style={{ opacity: 0.2, ...style }}>
      {/* TV frame */}
      <rect x="10" y="10" width="50" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Screen */}
      <rect x="14" y="14" width="42" height="26" rx="2" fill={color} opacity="0.08" />
      {/* Antenna */}
      <line x1="30" y1="10" x2="22" y2="2" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <line x1="30" y1="10" x2="38" y2="2" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      {/* Star on screen */}
      <circle cx="35" cy="27" r="3" fill={color} opacity="0.3" />
      <line x1="35" y1="22" x2="35" y2="32" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="30" y1="27" x2="40" y2="27" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Base */}
      <line x1="28" y1="44" x2="22" y2="48" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <line x1="42" y1="44" x2="48" y2="48" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'nave-imaginacion': [DecoSpaceship, DecoStarfield, DecoGalaxy],
  'trece-episodios': [DecoTelevision, DecoGalaxy, DecoStarfield],
  'produccion-cosmos': [DecoTelevision, DecoSpaceship, DecoStarfield],
  'calendario-cosmico': [DecoCalendar, DecoGalaxy, DecoDNA],
  'mensajes-cientificos': [DecoDNA, DecoCalendar, DecoStarfield],
  'legado-serie': [DecoStarfield, DecoTelevision, DecoSpaceship],
  'cosmos-siglo-xxi': [DecoGalaxy, DecoSpaceship, DecoTelevision],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Sagan, C. (1980). Cosmos. Random House, New York.',
  'Poundstone, W. (1999). Carl Sagan: A Life in the Cosmos. Henry Holt and Company.',
  'Davidson, K. (1999). Carl Sagan: A Life. John Wiley & Sons.',
  'Head, T. (2006). Conversations with Carl Sagan. University Press of Mississippi.',
  'Druyan, A. (2020). Cosmos: Possible Worlds. National Geographic Books.',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'nave-imaginacion',
    title: 'La Nave de la Imaginación',
    color: '#5B3D8F',
    btnImage: '/assets/sagan/sagan_m2.png',
    image: '/assets/sagan/sagan_m2.png',
    content: [
      'En 1980, la cadena de televisión pública PBS de Estados Unidos emitió por primera vez "Cosmos: Un Viaje Personal" (Cosmos: A Personal Voyage), una serie documental de 13 episodios presentada por el astrónomo Carl Sagan. El primer episodio se transmitió el 28 de septiembre de 1980, y desde esa noche inaugural la serie transformó la forma en que millones de personas entendían la ciencia y el universo. La producción fue llevada a cabo por la estación KCET de Los Ángeles, y cada capítulo duraba aproximadamente 60 minutos.',
      'Cosmos alcanzó una audiencia estimada de más de 500 millones de espectadores en más de 60 países. Esto significaba que, durante la década de 1980, aproximadamente una de cada nueve personas en el planeta había visto al menos un episodio de la serie. Fue traducida a decenas de idiomas y se emitió en todos los continentes, desde Japón hasta Brasil, desde Alemania hasta la India. Ningún programa de divulgación científica había logrado semejante alcance antes, y Sagan se convirtió en el científico más reconocido de su generación a nivel mundial.',
      'El recurso narrativo central de la serie era la "Nave de la Imaginación", una nave espacial ficticia con la que Sagan podía transportar a los espectadores a cualquier lugar del cosmos y a cualquier momento de la historia. Mediante esta nave, los televidentes viajaban al interior de una célula, a la superficie de Marte, al centro de una estrella en colapso o al instante mismo del Big Bang. Era un dispositivo que permitía explicar conceptos científicos complejos de manera visual y accesible, sin sacrificar la precisión técnica del contenido presentado.',
      'Carl Sagan se distinguía por su estilo de presentación. Hablaba con una combinación de rigor científico y calidez humana que resultaba difícil de imitar. Cuando describía la escala del universo observable — con sus 93,000 millones de años luz de diámetro — o la antigüedad de las estrellas más viejas — con unos 13,200 millones de años — su voz transmitía una mezcla de respeto y curiosidad que resonaba en espectadores de todas las edades, desde niños de escuela primaria hasta físicos profesionales.',
      'La frase más recordada de toda la serie es "Somos polvo de estrellas" ("We are made of star stuff"). Con ella, Sagan comunicaba un dato verificable de la astrofísica: los elementos químicos que componen nuestro cuerpo — carbono, nitrógeno, oxígeno, hierro — fueron sintetizados en el interior de estrellas masivas mediante nucleosíntesis estelar y dispersados por el espacio cuando esas estrellas explotaron como supernovas. Cada átomo de calcio en tus huesos y de hierro en tu sangre fue forjado a temperaturas superiores a los 100 millones de grados Celsius en el núcleo de una estrella que murió hace miles de millones de años.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Antes de Cosmos, Carl Sagan ya era conocido en círculos científicos por su trabajo en el programa Mariner y su participación en las misiones Viking a Marte. Pero fue la serie de televisión la que lo convirtió en una figura pública global. Tras su emisión, Sagan recibía más de 10,000 cartas al año de espectadores de todo el mundo, muchos de ellos niños y jóvenes que decían que Cosmos había despertado su interés por la ciencia y la exploración espacial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La nucleosíntesis estelar es el proceso por el cual los elementos más pesados que el hidrógeno se forman en el interior de las estrellas. Las estrellas como nuestro Sol fusionan hidrógeno en helio. Las estrellas más masivas, con masas superiores a 8 veces la del Sol, continúan fusionando elementos hasta llegar al hierro (elemento 26). Los elementos más pesados que el hierro — como el oro, el uranio y el platino — se forman durante las explosiones de supernovas, donde las temperaturas y presiones son tan extremas que permiten la captura rápida de neutrones.' },
    ],
    fact: 'El concepto de "Nave de la Imaginación" fue idea conjunta de Carl Sagan y Ann Druyan. Según las notas de producción archivadas en la Biblioteca del Congreso de Estados Unidos, se evaluaron más de 15 diseños diferentes para la nave antes de seleccionar el diseño final con forma de semilla de diente de león. Sagan insistió en que la nave no tuviera un aspecto militar o industrial, sino orgánico y contemplativo, porque quería que simbolizara la curiosidad humana, no la conquista tecnológica.',
  },
  {
    id: 'trece-episodios',
    title: 'Los 13 Episodios',
    color: '#D4A535',
    btnImage: '/assets/sagan/sagan_m2.png',
    image: '/assets/sagan/sagan_m2.png',
    content: [
      'El primer episodio, "Las Costas del Océano Cósmico" ("The Shores of the Cosmic Ocean"), estableció el tono de toda la serie con una secuencia de apertura que se ha convertido en una de las más citadas en la historia de la televisión documental. Sagan comenzaba diciendo: "El Cosmos es todo lo que es, todo lo que fue y todo lo que será." A continuación, la cámara realizaba un viaje desde la superficie terrestre hasta los confines del universo observable, presentando las escalas cósmicas de una manera que ningún programa había logrado antes.',
      'Los episodios seguían un arco temático. "Una Voz en la Fuga Cósmica" exploraba la genética y la evolución de la vida; "La Armonía de los Mundos" recreaba la vida de Johannes Kepler y sus tres leyes del movimiento planetario publicadas entre 1609 y 1619; "Cielo e Infierno" examinaba las superficies de Venus y Marte mediante datos reales de las sondas Venera y Viking; y "El Espinazo de la Noche" defendía el pensamiento racional frente a la superstición, usando como ejemplo la antigua biblioteca de Alejandría, destruida entre los siglos III y VII d.C.',
      '"Viajes a Través del Espacio y el Tiempo" abordaba la relatividad especial de Einstein y la dilatación temporal; "El Filo de la Eternidad" exploraba el Big Bang y la estructura a gran escala del cosmos; "Vidas de las Estrellas" detallaba el ciclo de vida estelar, desde la formación en nebulosas hasta la muerte como enanas blancas, estrellas de neutrones o agujeros negros. Cada episodio combinaba explicaciones científicas rigurosas con recreaciones históricas filmadas en locaciones reales de Grecia, Egipto, Italia y otros países.',
      '"La Persistencia de la Memoria" exploraba la evolución del cerebro humano y la inteligencia, comparando nuestro cerebro de 86,000 millones de neuronas con los sistemas nerviosos de otras especies. "Enciclopedia Galáctica" abordaba la ecuación de Drake y la posibilidad de civilizaciones extraterrestres inteligentes. Frank Drake formuló esta ecuación en 1961 para estimar el número de civilizaciones comunicativas en nuestra galaxia, y Sagan la utilizó como punto de partida para una reflexión sobre la probabilidad y los riesgos de la vida inteligente.',
      'El episodio final, "¿Quién Habla en Nombre de la Tierra?", constituía un llamado directo a la responsabilidad humana. Sagan abordaba la amenaza de la guerra nuclear — en un contexto en el que Estados Unidos y la Unión Soviética poseían conjuntamente más de 60,000 cabezas nucleares — y la destrucción del medio ambiente. Argumentaba que la especie humana tenía la capacidad tecnológica tanto de destruirse como de construir una civilización espacial, y que la elección entre ambos caminos dependía de decisiones políticas y éticas concretas que debían tomarse con urgencia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para filmar las recreaciones históricas de Cosmos, el equipo de producción viajó a 40 locaciones en 12 países diferentes durante 3 años de producción. La recreación de la antigua Biblioteca de Alejandría costó más de $1 millón de dólares de 1979 — equivalente a aproximadamente $4.2 millones actuales ajustados por inflación. Sagan insistió en la precisión histórica de cada detalle, consultando con historiadores especializados de la Universidad de Harvard y el Instituto Smithsoniano.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ecuación de Drake, presentada en el episodio "Enciclopedia Galáctica", multiplica siete factores para estimar el número de civilizaciones comunicativas en la Vía Láctea: la tasa de formación estelar (estimada hoy en unas 1.5-3 estrellas por año), la fracción de estrellas con planetas (ahora sabemos que es cercana al 100%), el número de planetas habitables por sistema, la fracción que desarrolla vida, la fracción con vida inteligente, la fracción que desarrolla tecnología de comunicación, y la duración promedio de esas civilizaciones. Los valores actualizados sugieren entre 1,000 y 100 millones de civilizaciones posibles.' },
    ],
    fact: 'La secuencia de apertura de "Las Costas del Océano Cósmico" fue recreada utilizando una combinación de fotografías reales del telescopio Hale de 200 pulgadas del Observatorio Palomar, modelos a escala construidos por la empresa Magicam, y pinturas al óleo del artista espacial Jon Lomberg, quien fue el director artístico oficial de la serie. Lomberg produjo más de 40 ilustraciones originales para Cosmos, cada una revisada científicamente por Sagan para garantizar su precisión astronómica.',
  },
  {
    id: 'produccion-cosmos',
    title: 'La Producción',
    color: '#7A5BAF',
    btnImage: '/assets/sagan/sagan_m2.png',
    image: '/assets/sagan/sagan_m2.png',
    content: [
      'Cosmos fue co-escrita por tres personas: Carl Sagan, Ann Druyan y Steven Soter. Ann Druyan era escritora y productora creativa; se convertiría en la esposa de Sagan en 1981 y en su compañera intelectual y creativa durante el resto de su vida. Steven Soter era un astrofísico formado en Cornell que aportaba rigor técnico a los guiones. Los tres trabajaron durante más de tres años en la escritura, investigación y producción de los 13 episodios, un proceso que generó más de 2,000 páginas de borradores y notas de investigación.',
      'La banda sonora de Cosmos es uno de sus elementos más reconocibles. La pieza principal, "Heaven and Hell, Part 1" del compositor griego Vangelis (Evangelos Odysseas Papathanassiou, 1943-2022), se convirtió en la melodía más asociada con la exploración del cosmos en la cultura popular. Además de Vangelis, la serie utilizó música de compositores clásicos como Dmitri Shostakovich, Igor Stravinsky, Johann Sebastian Bach y Pyotr Ilyich Tchaikovsky. La selección musical fue supervisada directamente por Ann Druyan, quien tenía formación musical clásica.',
      'Los efectos visuales de Cosmos fueron pioneros para la televisión de 1980. La serie fue producida por la estación KCET de Los Ángeles, y el equipo de efectos especiales fue liderado por Adolf Schaller, un artista e ilustrador científico de reconocido prestigio. Se construyeron maquetas físicas de planetas, galaxias, la superficie de Venus, paisajes marcianos y naves espaciales. Las animaciones de la "Nave de la Imaginación" utilizaban técnicas de composición óptica que requerían hasta 12 pases de cámara separados para lograr la imagen final de cada secuencia.',
      'El presupuesto total de Cosmos fue de aproximadamente $6.3 millones de dólares de 1980, financiado por la Corporation for Public Broadcasting, Atlantic Richfield Company (ARCO) y la Fundación Arthur Vining Davis. En dólares actuales ajustados por inflación, eso equivale a unos $24 millones. Para la época, era uno de los presupuestos más altos jamás asignados a un programa de televisión pública, pero el resultado justificó la inversión: los índices de audiencia superaron todas las proyecciones y la serie se reemitió en PBS durante más de dos décadas.',
      'La colaboración entre Sagan y Druyan durante la producción de Cosmos generó una relación personal que transformó sus vidas. En junio de 1977, mientras trabajaban juntos en la selección del contenido para el Disco de Oro de la Voyager — un proyecto previo a Cosmos —, Sagan y Druyan se enamoraron. Se casaron en 1981, un año después del estreno de la serie. Druyan ha declarado en entrevistas que el proceso de crear Cosmos fue una de las experiencias intelectuales y emocionales más intensas de sus vidas, y que cada episodio representaba meses de debate, investigación y revisión entre los tres co-escritores.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Vangelis compuso la pieza "Alpha" específicamente para la serie Cosmos, aunque nunca visitó el set de producción en Los Ángeles. Trabajaba desde su estudio Nemo en Londres, donde tenía un sistema de sintetizadores analógicos que incluía un Yamaha CS-80, un ARP 2600 y un Sequential Circuits Prophet-5. La pieza fue grabada en una sola sesión de improvisación de 45 minutos, y Vangelis seleccionó los mejores fragmentos para la versión final. El álbum resultante vendió más de 2 millones de copias a nivel mundial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las técnicas de composición óptica utilizadas en Cosmos requerían filmar cada elemento de la escena por separado — la nave, el fondo espacial, las estrellas, los planetas — y luego combinarlos fotograma a fotograma en una impresora óptica. Una sola secuencia de 10 segundos podía requerir hasta 240 fotogramas individuales procesados manualmente. Este proceso era tan laborioso que el equipo de efectos especiales trabajaba en turnos de 16 horas para cumplir con los plazos de producción, completando un promedio de solo 3 segundos de animación finalizada por día.' },
    ],
    fact: 'Adolf Schaller, el artista principal de efectos visuales de Cosmos, pintó a mano más de 60 fondos espaciales para la serie utilizando técnicas de aerógrafo sobre cartulinas negras de 1.5 × 2 metros. Cada fondo representaba una vista astronómica específica — una nebulosa, un cúmulo de galaxias, la superficie de un planeta — y debía ser validado científicamente por Sagan antes de ser filmado. Schaller utilizaba datos de observatorios reales, incluyendo fotografías del Observatorio Palomar y del telescopio espacial OAO-2, para asegurar la fidelidad de los colores y las proporciones estelares.',
  },
  {
    id: 'calendario-cosmico',
    title: 'El Calendario Cósmico',
    color: '#C49225',
    btnImage: '/assets/sagan/sagan_m2.png',
    image: '/assets/sagan/sagan_m2.png',
    content: [
      'Uno de los recursos didácticos más recordados de Cosmos es el "Calendario Cósmico", un modelo de escala temporal ideado por Sagan para comprimir los 13,800 millones de años de historia del universo en un solo año calendario. En este esquema, el Big Bang ocurre el 1 de enero a las 00:00:00, y el momento actual corresponde a la medianoche del 31 de diciembre. Cada mes del calendario equivale a aproximadamente 1,150 millones de años reales, cada día a unos 37.8 millones de años, y cada segundo a unos 438 años.',
      'Bajo esta escala, los eventos cósmicos se distribuyen de manera que revela la brevedad de la existencia humana. La Vía Láctea se forma aproximadamente el 16 de marzo. Nuestro Sol y el Sistema Solar no aparecen hasta el 9 de septiembre. La vida unicelular más antigua en la Tierra surge alrededor del 21 de septiembre, según los fósiles de estromatolitos encontrados en Pilbara, Australia Occidental, datados en 3,500 millones de años. Los organismos multicelulares no aparecen hasta mediados de noviembre, y los primeros animales visibles a simple vista llegan recién el 17 de diciembre.',
      'Los dinosaurios dominan la Tierra desde el 25 de diciembre hasta el 30 de diciembre, cuando un asteroide de aproximadamente 10 kilómetros de diámetro impacta la península de Yucatán hace 66 millones de años, provocando su extinción masiva. Los primeros homínidos aparecen el 31 de diciembre alrededor de las 22:24 horas. El Homo sapiens anatómicamente moderno surge a las 23:52 de ese último día. La agricultura, la escritura, las pirámides de Egipto, Roma, la Edad Media, el Renacimiento y toda la historia escrita de la humanidad ocurren en los últimos 14 segundos del año cósmico.',
      'Sagan utilizaba el Calendario Cósmico para transmitir un mensaje científico y filosófico: la especie humana es una aparición reciente y transitoria en la historia del cosmos. Si toda la historia registrada de la civilización humana — unos 5,000 años — equivale a apenas un segundo del calendario cósmico, nuestra presencia es efímera en la escala temporal del universo. Este recurso no pretendía generar pesimismo, sino perspectiva: Sagan argumentaba que comprender nuestra posición temporal real era el primer paso para actuar con responsabilidad hacia el futuro.',
      'El Calendario Cósmico ha sido adoptado como herramienta pedagógica en universidades y escuelas de todo el mundo desde su presentación en 1980. La Sociedad Planetaria, cofundada por Sagan en 1980 junto con Bruce Murray y Louis Friedman, ha producido versiones actualizadas del calendario que incorporan descubrimientos recientes: las ondas gravitacionales detectadas por LIGO en 2015, la primera imagen de un agujero negro por el Event Horizon Telescope en 2019, y los datos del telescopio espacial James Webb lanzado en 2021. Cada versión nueva confirma la escala presentada originalmente por Sagan.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Carl Sagan no inventó el concepto de comprimir la historia del universo en una escala temporal humana — versiones similares habían sido publicadas por otros divulgadores antes de 1980 — pero fue él quien lo perfeccionó, lo bautizó como "Calendario Cósmico" y lo hizo globalmente reconocido a través de Cosmos. Su presentación en el episodio 1 fue filmada en un set especial que recreaba un salón circular con las páginas del calendario proyectadas en paneles de 360 grados. La secuencia requirió 3 días completos de filmación para lograr las transiciones que Sagan deseaba.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La edad del universo — 13,800 millones de años con un margen de error de ±21 millones de años — fue determinada con alta precisión por el satélite Planck de la Agencia Espacial Europea, cuyos resultados se publicaron en 2013 y 2018. Planck midió las fluctuaciones de temperatura del fondo cósmico de microondas (CMB), la radiación residual del Big Bang, con una sensibilidad de una millonésima de grado. Estos datos confirman la escala temporal que Sagan presentaba en el Calendario Cósmico de 1980 con una precisión notable para la tecnología disponible en aquella época.' },
    ],
    fact: 'En la escala del Calendario Cósmico, la vida media de un ser humano — unos 80 años — equivale a apenas 0.18 segundos. La totalidad de la era espacial humana, desde el lanzamiento del Sputnik 1 el 4 de octubre de 1957 hasta hoy, equivale a aproximadamente 0.15 segundos. El viaje más lejano de la humanidad — la misión Apolo 13 que alcanzó 400,171 km de la Tierra el 15 de abril de 1970 — ocurrió en una fracción tan diminuta de ese calendario que es imposible de representar gráficamente. Esto ilustra la escala temporal y espacial del universo que Sagan buscaba comunicar.',
  },
  {
    id: 'mensajes-cientificos',
    title: 'Mensajes Científicos Clave',
    color: '#9370C4',
    btnImage: '/assets/sagan/sagan_m2.png',
    image: '/assets/sagan/sagan_m2.png',
    content: [
      'Cosmos abordaba la evolución biológica como uno de sus temas centrales. Sagan explicaba la selección natural de Darwin utilizando ejemplos concretos: la evolución del cangrejo Heike (Heikeopsis japonica) en Japón, cuyo caparazón presenta patrones que recuerdan rostros humanos de guerreros samurái. Los pescadores devolvían al mar los cangrejos cuyos caparazones se asemejaban más a caras humanas, creando una presión selectiva artificial que favorecía esos patrones a lo largo de generaciones. Sagan usaba este caso para explicar cómo la selección — natural o artificial — moldea las especies a lo largo del tiempo geológico.',
      'Uno de los temas más urgentes de la serie era el peligro de la guerra nuclear. En 1980, durante la Guerra Fría, Estados Unidos y la Unión Soviética mantenían arsenales combinados de más de 60,000 cabezas nucleares. Sagan fue uno de los primeros científicos en calcular y publicar los efectos de un "invierno nuclear" — un escenario en el que las detonaciones masivas levantarían suficiente hollín y polvo a la estratosfera para bloquear la luz solar durante meses o años, provocando un colapso agrícola global y la posible extinción de la civilización humana.',
      'El método científico era presentado en Cosmos no como una lista de pasos mecánicos, sino como una actitud ante el conocimiento. Sagan enfatizaba que la ciencia requiere escepticismo organizado: la disposición a cuestionar todas las afirmaciones, incluidas las propias, y a cambiar de opinión cuando la evidencia lo exige. Dedicó segmentos de varios episodios a explicar por qué la astrología, la ufología y otras pseudociencias carecían de base empírica verificable, pero lo hacía sin condescendencia, reconociendo que la curiosidad que motivaba esas creencias era la misma que impulsaba la ciencia.',
      'Cosmos también abordaba temas ambientales con datos específicos. Sagan presentaba la atmósfera de Venus — compuesta en un 96.5% de dióxido de carbono con temperaturas superficiales de 462°C — como un ejemplo del efecto invernadero descontrolado, y advertía que la acumulación de CO₂ en la atmósfera terrestre podría llevar a un calentamiento similar si no se tomaban medidas. En 1980, la concentración de CO₂ atmosférico era de 339 partes por millón; en 2024 ha alcanzado 421 ppm, confirmando la tendencia que Sagan señalaba hace más de cuatro décadas.',
      'Otro mensaje recurrente de la serie era la conexión entre la ciencia y la democracia. Sagan argumentaba que una sociedad que no comprende la ciencia y la tecnología que la sustentan es vulnerable a la manipulación y al autoritarismo. Citaba el ejemplo de la destrucción de la Biblioteca de Alejandría y la persecución de pensadores como Hipatia de Alejandría — asesinada en el año 415 d.C. por una turba — como advertencias históricas sobre lo que sucede cuando una sociedad abandona el pensamiento racional en favor del fanatismo. Este tema lo desarrollaría más ampliamente en su libro posterior "El Mundo y sus Demonios" (1995).'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El artículo científico sobre el invierno nuclear, conocido como "TTAPS" por las iniciales de sus cinco autores (R.P. Turco, O.B. Toon, T.P. Ackerman, J.B. Pollack y Carl Sagan), fue publicado en la revista Science en diciembre de 1983. El estudio modeló los efectos climáticos de una guerra nuclear a gran escala y concluyó que incluso un intercambio limitado de 100 cabezas nucleares podría reducir las temperaturas globales en 1-2°C durante años. Este trabajo influyó directamente en las negociaciones de desarme entre Reagan y Gorbachov que condujeron al Tratado INF de 1987.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La comparación de Sagan entre Venus y la Tierra fue profética. Venus tiene una masa del 81.5% de la Tierra y un radio del 94.9%, pero su atmósfera de CO₂ ha creado un efecto invernadero que eleva su temperatura superficial a 462°C — más caliente que Mercurio, que está mucho más cerca del Sol. Las sondas soviéticas Venera 7 (1970) a Venera 14 (1981) confirmaron estas condiciones. La presión atmosférica en la superficie de Venus es de 92 atmósferas, equivalente a estar a 900 metros de profundidad bajo el océano terrestre.' },
    ],
    fact: 'En 1985, cinco años después de Cosmos, Sagan testificó ante el Congreso de Estados Unidos sobre el efecto invernadero y el calentamiento global. Su testimonio, junto con el del climatólogo James Hansen del Instituto Goddard de la NASA, es considerado uno de los primeros llamados formales ante un cuerpo legislativo sobre la amenaza del cambio climático antropogénico. Los datos que Sagan presentó en 1985 proyectaban un aumento de temperatura de 1.5-4.5°C para finales del siglo XXI — un rango que coincide con las proyecciones actuales del Panel Intergubernamental sobre Cambio Climático (IPCC) publicadas en su Sexto Informe de 2021.',
  },
  {
    id: 'legado-serie',
    title: 'El Legado de la Serie',
    color: '#B88420',
    btnImage: '/assets/sagan/sagan_m2.png',
    image: '/assets/sagan/sagan_m2.png',
    content: [
      'Cosmos inspiró directamente a una generación de científicos, ingenieros y divulgadores que transformaron sus campos de trabajo. El caso más conocido es el del astrofísico Neil deGrasse Tyson, quien a los 17 años visitó la Universidad de Cornell en 1975 y fue recibido personalmente por Carl Sagan. Sagan pasó varias horas con el joven Tyson, le mostró su laboratorio, le regaló un libro firmado y le ofreció quedarse en su casa si la nieve impedía su regreso a Nueva York. Tyson ha declarado públicamente que esa experiencia definió su carrera.',
      'La serie recibió los premios Emmy y Peabody, dos de los galardones más prestigiosos de la televisión estadounidense. El libro complementario, también titulado "Cosmos", fue publicado por Random House en 1980 y permaneció en la lista de bestsellers del New York Times durante 70 semanas consecutivas. Ha sido traducido a más de 40 idiomas y ha vendido más de 5 millones de copias a nivel mundial. El libro amplía y profundiza los temas de la serie con notas al pie, apéndices técnicos y una bibliografía académica de más de 200 referencias.',
      'En 2014, Fox Broadcasting Company y National Geographic Channel produjeron "Cosmos: Una Odisea del Espacio-Tiempo" (Cosmos: A Spacetime Odyssey), presentada por Neil deGrasse Tyson y producida por Ann Druyan y Seth MacFarlane. La nueva serie mantuvo la estructura de 13 episodios y la "Nave de la Imaginación", pero actualizó los efectos visuales con animación digital y CGI de alta definición. El primer episodio fue emitido simultáneamente en 10 cadenas de la familia Fox, alcanzando a 8.5 millones de espectadores solo en Estados Unidos en su noche de estreno.',
      'La influencia de Cosmos se extendió al ámbito institucional. La Sociedad Planetaria, cofundada por Sagan en 1980 con Bruce Murray (director del Jet Propulsion Laboratory) y Louis Friedman (ingeniero del JPL), se convirtió en la organización no gubernamental de exploración espacial más grande del mundo, con más de 100,000 miembros en 2024. La sociedad ha financiado misiones como LightSail 2, una nave impulsada por vela solar lanzada en 2019 que demostró la viabilidad de la propulsión fotónica en órbita terrestre.',
      'El legado pedagógico de Cosmos es cuantificable. Una encuesta realizada por la Sociedad Astronómica Americana en 2009 reveló que el 43% de sus miembros activos citaban a Cosmos como una influencia significativa en su decisión de estudiar astronomía. En universidades como Cornell, Harvard y Caltech, la serie se utiliza como material didáctico en cursos introductorios de astronomía y filosofía de la ciencia. La Fundación Carl Sagan, establecida tras su muerte en 1996, administra su archivo intelectual y promueve la divulgación científica con estándares inspirados en su trabajo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando Neil deGrasse Tyson visitó a Sagan en Cornell a los 17 años, nevó tanto esa tarde que Sagan le ofreció pasar la noche en su casa. Tyson ha contado esta anécdota en decenas de conferencias como ejemplo de lo que significa ser un científico generoso: "Sagan era la persona más famosa que yo conocía, y me trató como si yo fuera la persona más importante del mundo." Tyson fue admitido en Cornell pero eligió estudiar en Harvard; años después regresó a Cornell como profesor visitante, ocupando el mismo edificio donde Sagan tenía su oficina.' },
      { label: 'Dato Científico', icon: 'atom', text: 'LightSail 2, financiada parcialmente por la Sociedad Planetaria fundada por Sagan, fue lanzada el 25 de junio de 2019 a bordo de un cohete Falcon Heavy de SpaceX. La nave desplegó una vela solar de 32 metros cuadrados hecha de Mylar metalizado de solo 4.5 micrómetros de espesor — más delgada que un cabello humano. Durante sus 3 años de operación, LightSail 2 demostró que la presión de los fotones solares podía elevar la órbita de una nave, confirmando un principio físico que Sagan había promovido décadas antes como método viable de propulsión interplanetaria.' },
    ],
    fact: 'Carl Sagan murió el 20 de diciembre de 1996, a los 62 años, debido a mielodisplasia, una enfermedad de la médula ósea. Había recibido tres trasplantes de médula ósea en los dos años anteriores, donados por su hermana Carol. En sus últimas semanas de vida, Sagan continuó trabajando en el guion de la película "Contact" (1997), basada en su novela de 1985, y revisó las pruebas finales de su libro "Miles de Millones" (Billions and Billions), que se publicó póstumamente en 1997 con un epílogo escrito por Ann Druyan sobre los últimos días de su vida.',
  },
  {
    id: 'cosmos-siglo-xxi',
    title: 'Cosmos en el Siglo XXI',
    color: '#4A2D6F',
    btnImage: '/assets/sagan/sagan_m2.png',
    image: '/assets/sagan/sagan_m2.png',
    content: [
      'En 2020, National Geographic estrenó "Cosmos: Mundos Posibles" (Cosmos: Possible Worlds), la tercera temporada de la franquicia, nuevamente presentada por Neil deGrasse Tyson y producida por Ann Druyan. Esta temporada, también de 13 episodios, se centró en el futuro de la humanidad: la terraformación de Marte, la búsqueda de vida en las lunas Europa y Encélado, y las posibilidades de civilizaciones futuras capaces de colonizar otros sistemas estelares. Druyan también publicó un libro del mismo nombre en 2020 a través de National Geographic Books.',
      'El impacto cultural de Cosmos se ha amplificado en la era digital. En plataformas como YouTube, los fragmentos de la serie original de 1980 acumulan cientos de millones de reproducciones. El discurso "Pale Blue Dot" de Sagan — basado en su reflexión sobre la fotografía de la Tierra tomada por la Voyager 1 en 1990 — se ha convertido en uno de los videos más compartidos en internet, con versiones animadas, musicalizadas y traducidas a más de 30 idiomas. La cuenta oficial de Carl Sagan en redes sociales, gestionada por la Fundación Sagan, tiene millones de seguidores.',
      'Cosmos revolucionó la comunicación científica al demostrar que la divulgación rigurosa podía alcanzar audiencias masivas sin simplificar excesivamente los contenidos. Antes de Cosmos, la televisión científica tendía a ser didáctica y formal. Sagan introdujo un modelo narrativo que combinaba historia personal, recreaciones dramáticas, datos cuantitativos y reflexión filosófica en un formato continuo de una hora. Este modelo ha sido adoptado por prácticamente todos los documentales científicos posteriores, desde "El Planeta Tierra" de la BBC (2006) hasta "Our Planet" de Netflix (2019).',
      'La influencia de Sagan en la política científica continúa vigente. Su defensa del pensamiento crítico, expresada en Cosmos y ampliada en "El Mundo y sus Demonios" (1995), es citada frecuentemente en debates contemporáneos sobre desinformación, negacionismo climático y pseudociencia. La frase de Sagan "Afirmaciones extraordinarias requieren pruebas extraordinarias" — una reformulación del principio de Hume — se ha convertido en un estándar de evaluación de evidencia utilizado en medicina, jurisprudencia y periodismo de investigación.',
      'El legado de Cosmos se extiende a la exploración espacial activa. Misiones como el telescopio espacial James Webb, lanzado el 25 de diciembre de 2021, y el Mars Perseverance Rover, que aterrizó en Marte el 18 de febrero de 2021, continúan investigando las preguntas que Sagan planteaba en la serie: ¿cómo se formaron las galaxias? ¿Existe vida en otros mundos? ¿Cuál es el futuro de la especie humana en el cosmos? Cada nueva imagen del James Webb — que observa galaxias formadas apenas 300 millones de años después del Big Bang — confirma y amplía la visión que Sagan compartió con el mundo en 1980.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Ann Druyan, viuda de Sagan y productora de las tres temporadas de Cosmos, ha dedicado más de cuatro décadas de su vida a mantener vivo el legado de la serie. Para la producción de "Cosmos: Mundos Posibles" (2020), Druyan trabajó durante cinco años en la escritura y producción, consultando con más de 50 científicos activos en campos que van desde la astrofísica hasta la biología sintética. En una entrevista de 2020, Druyan afirmó: "Carl y yo soñamos Cosmos como un proyecto de toda la vida, no como una serie de televisión con fecha de caducidad."' },
      { label: 'Dato Científico', icon: 'atom', text: 'El telescopio espacial James Webb, con un espejo primario de 6.5 metros de diámetro compuesto por 18 segmentos hexagonales de berilio recubiertos de oro, puede detectar la luz infrarroja de galaxias que se formaron hace 13,500 millones de años — apenas 300 millones de años después del Big Bang. En septiembre de 2022, el JWST identificó la galaxia JADES-GS-z13-0, la más lejana confirmada hasta la fecha, cuya luz tardó 13,400 millones de años en llegar hasta nosotros. Estos descubrimientos confirman las preguntas que Sagan planteaba en Cosmos sobre los orígenes del universo observable.' },
    ],
    fact: 'En 2024, la Unión Astronómica Internacional (IAU) propuso nombrar un asteroide en honor a Carl Sagan: el asteroide 2709 Sagan, descubierto el 6 de marzo de 1982 por el astrónomo E. Bowell en la estación Anderson Mesa de Flagstaff, Arizona. El asteroide tiene un diámetro estimado de 20 kilómetros y orbita el Sol en el cinturón principal de asteroides entre Marte y Júpiter, con un período orbital de 3.97 años. La designación oficial fue aprobada por el Comité de Nomenclatura de Cuerpos Menores de la IAU, que consideró la contribución de Sagan a la ciencia planetaria y la divulgación como motivo suficiente para la distinción.',
  },
];

// ——— Cosmic Particle Field (Canvas Background) ————————————————————————
function CosmicField() {
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
      hue: Math.random() > 0.5 ? '91,61,143' : '212,165,53', // purple or gold
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

// ——— Cosmos Header ————————————————————————————————————————————————
function CosmosHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,61,143,0.3))' }}>
        {/* Cosmic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#cosmosGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B3D8F','#D4A535','#7A5BAF','#C49225','#9370C4','#B88420','#4A2D6F'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#D4A535" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="18" stroke="#D4A535" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="310" y2="24" stroke="#D4A535" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="cosmosGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,61,143,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(91,61,143,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">COSMOS: UN VIAJE PERSONAL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA SERIE QUE CAMBIÓ LA DIVULGACIÓN</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ————————————————————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,165,53,0.2)'}`,
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
          layoutId="activeDotSaganM2"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* ——— Video Section ——— */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEO EDUCATIVO
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
          </div>
        )}
        {node.videos && node.videos.length > 0 && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
              VIDEOS EDUCATIVOS
              <span style={{ width: '20px', height: '2px', background: node.color, borderRadius: '1px' }} />
            </div>
            {node.videos.map((v, vi) => (
              <VideoPlayer key={vi} src={v.src} title={v.title} color={node.color} />
            ))}
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

// ——— Progress Bar ————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B3D8F, #D4A535)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_SaganM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,20,0.9) 0%, rgba(20,10,40,0.85) 40%, rgba(10,10,20,0.92) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,61,143,0.12)',
      boxShadow: '0 0 60px rgba(10,10,20,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <CosmicField />

      <CosmosHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,165,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado todos los secretos de Cosmos!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Divulgador Estelar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ——— Bibliografía ——— */}
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
