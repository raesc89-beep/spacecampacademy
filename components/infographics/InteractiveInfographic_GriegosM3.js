'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Ancient Greek themed) ————————————————————————
function DecoColumn({ size = 70, color = '#2E6B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ionic column */}
      <rect x="22" y="12" width="16" height="38" fill="none" stroke={color} strokeWidth="1.5" rx="1" />
      {/* Capital volutes */}
      <path d="M16 12 Q18 6 22 8 Q26 10 22 12" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M44 12 Q42 6 38 8 Q34 10 38 12" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Base */}
      <rect x="18" y="50" width="24" height="3" fill={color} opacity="0.3" rx="1" />
      <rect x="20" y="47" width="20" height="3" fill={color} opacity="0.25" rx="1" />
      {/* Fluting lines */}
      <line x1="26" y1="14" x2="26" y2="48" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="30" y1="14" x2="30" y2="48" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <line x1="34" y1="14" x2="34" y2="48" stroke={color} strokeWidth="0.5" opacity="0.3" />
      {/* Entablature */}
      <rect x="16" y="8" width="28" height="4" fill={color} opacity="0.2" rx="1" />
    </svg>
  );
}

function DecoScroll({ size = 70, color = '#D4C9B8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Scroll body */}
      <rect x="14" y="16" width="32" height="28" fill="none" stroke={color} strokeWidth="1.5" rx="2" />
      {/* Roll tops */}
      <ellipse cx="14" cy="30" rx="4" ry="14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <ellipse cx="46" cy="30" rx="4" ry="14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Text lines */}
      <line x1="20" y1="22" x2="40" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="20" y1="27" x2="38" y2="27" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <line x1="20" y1="32" x2="40" y2="32" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="20" y1="37" x2="36" y2="37" stroke={color} strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}

function DecoOwl({ size = 70, color = '#3A7FA0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Owl of Athena - body */}
      <ellipse cx="30" cy="34" rx="14" ry="16" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="24" cy="28" r="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="36" cy="28" r="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="24" cy="28" r="2" fill={color} opacity="0.4" />
      <circle cx="36" cy="28" r="2" fill={color} opacity="0.4" />
      {/* Beak */}
      <path d="M28 32 L30 36 L32 32" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Ear tufts */}
      <path d="M20 18 L22 24" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M40 18 L38 24" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Feet */}
      <path d="M24 50 L22 54 M24 50 L26 54" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M36 50 L34 54 M36 50 L38 54" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoHemlock({ size = 60, color = '#C0B09C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Hemlock cup */}
      <path d="M18 20 L16 44 Q16 50 22 50 L38 50 Q44 50 44 44 L42 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Cup base */}
      <ellipse cx="30" cy="50" rx="8" ry="2" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Liquid surface */}
      <ellipse cx="30" cy="32" rx="10" ry="3" fill={color} opacity="0.2" />
      {/* Stem */}
      <line x1="30" y1="50" x2="30" y2="56" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="56" rx="6" ry="1.5" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Rising vapor */}
      <path d="M26 18 Q28 14 26 10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M34 16 Q36 12 34 8" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoLaurel({ size = 70, color = '#E8E0D4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Left branch */}
      <path d="M30 50 Q20 40 18 30 Q16 20 20 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Left leaves */}
      <ellipse cx="20" cy="18" rx="4" ry="2" fill={color} opacity="0.3" transform="rotate(-30 20 18)" />
      <ellipse cx="18" cy="26" rx="4" ry="2" fill={color} opacity="0.25" transform="rotate(-20 18 26)" />
      <ellipse cx="19" cy="34" rx="4" ry="2" fill={color} opacity="0.3" transform="rotate(-10 19 34)" />
      <ellipse cx="22" cy="42" rx="4" ry="2" fill={color} opacity="0.25" transform="rotate(5 22 42)" />
      {/* Right branch */}
      <path d="M30 50 Q40 40 42 30 Q44 20 40 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Right leaves */}
      <ellipse cx="40" cy="18" rx="4" ry="2" fill={color} opacity="0.3" transform="rotate(30 40 18)" />
      <ellipse cx="42" cy="26" rx="4" ry="2" fill={color} opacity="0.25" transform="rotate(20 42 26)" />
      <ellipse cx="41" cy="34" rx="4" ry="2" fill={color} opacity="0.3" transform="rotate(10 41 34)" />
      <ellipse cx="38" cy="42" rx="4" ry="2" fill={color} opacity="0.25" transform="rotate(-5 38 42)" />
    </svg>
  );
}

function DecoMeander({ size = 80, color = '#1E5B7A', style = {} }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 80 32" style={{ opacity: 0.2, ...style }}>
      {/* Greek key / meander pattern */}
      <path d="M4 16 L4 4 L16 4 L16 12 L12 12 L12 8 L8 8 L8 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M20 16 L20 4 L32 4 L32 12 L28 12 L28 8 L24 8 L24 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M36 16 L36 4 L48 4 L48 12 L44 12 L44 8 L40 8 L40 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M52 16 L52 4 L64 4 L64 12 L60 12 L60 8 L56 8 L56 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      {/* Bottom connecting line */}
      <line x1="4" y1="16" x2="76" y2="16" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Dots */}
      <circle cx="70" cy="10" r="1.5" fill={color} opacity="0.4" />
      <circle cx="76" cy="16" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'atenas-siglo-v': [DecoColumn, DecoLaurel, DecoOwl],
  'socrates-el-hombre': [DecoOwl, DecoScroll, DecoColumn],
  'metodo-socratico': [DecoScroll, DecoOwl, DecoMeander],
  'vida-examinada': [DecoLaurel, DecoScroll, DecoColumn],
  'el-juicio': [DecoColumn, DecoMeander, DecoHemlock],
  'muerte-de-socrates': [DecoHemlock, DecoLaurel, DecoScroll],
  'legado-socratico': [DecoMeander, DecoOwl, DecoLaurel],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Platón (ca. 399-390 a.C.). Apología de Sócrates, Fedón, República. Obras Completas, Editorial Gredos',
  'Jenofonte (ca. 370 a.C.). Recuerdos de Sócrates (Memorabilia). Editorial Gredos',
  'Brickhouse, T. & Smith, N. (2000). The Philosophy of Socrates. Westview Press',
  'Vlastos, G. (1991). Socrates, Ironist and Moral Philosopher. Cambridge University Press',
  'Waterfield, R. (2009). Why Socrates Died: Dispelling the Myths. W.W. Norton & Company',
  'Taylor, C.C.W. (1998). Socrates: A Very Short Introduction. Oxford University Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'atenas-siglo-v',
    title: 'Atenas en el Siglo V',
    color: '#E8E0D4',
    btnImage: '/assets/los_griegos/infographic_m3/btn_atenas-siglo-v.jpg',
    image: '/assets/los_griegos/infographic_m3/hero_atenas-siglo-v.jpg',
    content: [
      'Atenas alcanzó su máxima influencia cultural y política durante el siglo V antes de Cristo, un periodo que los historiadores denominan la Edad de Oro o el Siglo de Pericles. Entre los años 461 y 429 a.C., el estadista Pericles dirigió la ciudad como estratego principal, impulsando un programa de construcción monumental que incluyó el Partenón, los Propileos y el Erecteón en la Acrópolis. La población de Atenas y su territorio circundante, el Ática, se estima en unas 300,000 personas, de las cuales aproximadamente 30,000 a 50,000 eran ciudadanos varones adultos con derecho a participar en la Asamblea democrática.',
      'La democracia ateniense funcionaba mediante participación directa: los ciudadanos votaban personalmente sobre leyes, tratados y declaraciones de guerra en la colina del Pnyx, una explanada rocosa con capacidad para unos 6,000 asistentes. Los cargos públicos se asignaban por sorteo (klerósis), no por elección, lo cual reflejaba la creencia de que cualquier ciudadano era capaz de gobernar. Los jurados populares podían tener entre 201 y 6,001 miembros, siempre en números impares para evitar empates. Este sistema, vigente desde las reformas de Clístenes en el 508 a.C., fue el primer gobierno democrático documentado en la historia.',
      'En este contexto surgieron los sofistas, maestros itinerantes que cobraban por enseñar retórica, argumentación y técnicas de persuasión. Protágoras de Abdera (ca. 490-420 a.C.) declaró que "el hombre es la medida de todas las cosas", sugiriendo que la verdad es relativa a cada persona. Gorgias de Leontinos demostraba que podía defender cualquier posición en un debate, sin importar si era verdadera o falsa. Los sofistas cobraban sumas considerables por sus lecciones: Protágoras cobraba 10,000 dracmas por un curso completo, equivalente al salario de varios años de un trabajador común.',
      'La rivalidad entre Atenas y Esparta desembocó en la Guerra del Peloponeso (431-404 a.C.), un conflicto que duró 27 años y debilitó profundamente a ambas ciudades. El historiador Tucídides documentó esta guerra en detalle, incluyendo el discurso fúnebre de Pericles del año 431 a.C., donde el líder ateniense describió los valores democráticos de su ciudad. Durante esta guerra, una plaga devastó Atenas entre 430 y 426 a.C., matando a un tercio de la población, incluido el propio Pericles en 429 a.C. Sócrates vivió y filosofó durante todo este periodo turbulento.',
      'La vida intelectual ateniense se concentraba en el ágora, la plaza pública que servía como mercado, centro cívico y lugar de reunión social. Aquí se encontraban las stoas (pórticos cubiertos), los templos, los tribunales y los talleres de los artesanos. Era en el ágora donde Sócrates pasaba la mayor parte de sus días, conversando con comerciantes, jóvenes aristócratas, artesanos y cualquier persona dispuesta a participar en un diálogo. A diferencia de los sofistas, Sócrates no cobraba por sus conversaciones ni establecía un lugar fijo de enseñanza, lo que lo convertía en una figura pública accesible para todos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Partenón, construido entre 447 y 432 a.C., utilizó aproximadamente 13,400 bloques de mármol pentélico, extraído de canteras a 16 kilómetros de distancia. Sus columnas tienen una ligera curvatura llamada éntasis, diseñada para corregir ilusiones ópticas: si fueran perfectamente rectas, parecerían cóncavas al ojo humano. El arquitecto Ictino calculó estas correcciones con precisión milimétrica hace más de 2,400 años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La democracia ateniense utilizaba un dispositivo mecánico llamado kleroterion para asignar jurados por sorteo. Era una placa de piedra con ranuras donde se insertaban placas de identificación de los ciudadanos, y bolas blancas y negras caían por un tubo lateral para determinar quién servía ese día. Arqueólogos han encontrado fragmentos de estos dispositivos en el ágora de Atenas, confirmando las descripciones de Aristóteles en su obra "Constitución de los Atenienses".' },
    ],
    fact: 'El teatro de Dioniso en Atenas, construido en el siglo V a.C., tenía capacidad para 17,000 espectadores. Aquí se estrenaron las obras de Esquilo, Sófocles y Eurípides. Las representaciones duraban todo el día y los ciudadanos recibían un subsidio estatal llamado theorikon para poder asistir sin perder su jornal. Sócrates aparece como personaje en la comedia "Las Nubes" de Aristófanes, estrenada en el año 423 a.C., donde se le retrata de forma satírica como un sofista que enseña a engañar con palabras.',
  },
  {
    id: 'socrates-el-hombre',
    title: 'Sócrates el Hombre',
    color: '#2E6B8A',
    btnImage: '/assets/los_griegos/infographic_m3/btn_socrates-el-hombre.jpg',
    image: '/assets/los_griegos/infographic_m3/hero_socrates-el-hombre.jpg',
    content: [
      'Sócrates nació alrededor del año 470 a.C. en el demo (distrito) de Alopece, a las afueras de Atenas. Su padre, Sofronisco, era cantero o escultor, y su madre, Fenareta, era comadrona. Sócrates mismo utilizó la profesión de su madre como metáfora de su propia labor filosófica: así como Fenareta ayudaba a las mujeres a dar a luz hijos, él ayudaba a las personas a dar a luz ideas. Esta técnica, que llamó mayéutica (del griego "maieutikós", relativo al parto), consistía en hacer preguntas que guiaban al interlocutor a descubrir la verdad por sí mismo, en lugar de recibir respuestas ya hechas.',
      'Las fuentes antiguas coinciden en que Sócrates tenía una apariencia física poco convencional. Platón lo describe con nariz chata, ojos saltones y labios gruesos, comparándolo con los silenos, las figuras mitológicas mitad humano mitad caballo que acompañaban al dios Dioniso. Jenofonte menciona que Sócrates bromeaba sobre su propia fealdad, argumentando que su nariz chata era superior porque permitía oler en todas direcciones, y que sus ojos saltones le daban un campo de visión más amplio. Esta capacidad de reírse de sí mismo era parte central de su carácter.',
      'Sócrates sirvió como hoplita (soldado de infantería pesada) en tres campañas militares durante la Guerra del Peloponeso. Combatió en la batalla de Potidea (432 a.C.), donde según Alcibíades salvó la vida de un compañero herido y rechazó la condecoración que le correspondía. También participó en la batalla de Delio (424 a.C.), donde el ejército ateniense sufrió una derrota, y Sócrates fue uno de los últimos en retirarse del campo de batalla. Platón relata que durante el asedio de Potidea, Sócrates permaneció de pie meditando durante 24 horas seguidas, sin moverse ni dormir.',
      'A diferencia de los sofistas, que acumulaban riquezas considerables, Sócrates vivió en pobreza voluntaria. Caminaba descalzo incluso en invierno, usaba un manto simple (himation) en todas las estaciones y comía frugalmente. Estaba casado con Jantipa, quien según la tradición posterior tenía un carácter difícil, aunque las fuentes primarias ofrecen poca información sobre ella. Juntos tuvieron tres hijos: Lamprocles, Sofronisco y Menéxeno. En el momento de su ejecución en 399 a.C., Menéxeno era todavía un niño pequeño.',
      'Sócrates afirmaba escuchar una voz interior que llamaba su daimonion (señal divina), la cual le advertía cuando estaba a punto de cometer un error. Es importante notar que este daimonion nunca le decía qué hacer, solo le señalaba qué no hacer. El oráculo de Delfos, el centro religioso más respetado del mundo griego, declaró que no había nadie más sabio que Sócrates. Cuando Querefonte, amigo de Sócrates, le transmitió esta respuesta de la Pitia (sacerdotisa del oráculo), Sócrates quedó perplejo y decidió investigar el significado de la profecía interrogando a las personas consideradas sabias en Atenas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El equipamiento de un hoplita griego pesaba entre 25 y 30 kilogramos, incluyendo un escudo circular de bronce (aspis) de aproximadamente 9 kg, una coraza de bronce, grebas para las piernas, un casco corintio, una lanza de 2.5 metros y una espada corta (xiphos). Sócrates combatió con este equipo en tres campañas entre 432 y 422 a.C., lo que demuestra que poseía una fortaleza física considerable a pesar de su vida de filósofo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El oráculo de Delfos funcionaba en el templo de Apolo, construido sobre una falla geológica. Estudios geológicos publicados en 2001 por el equipo de Jelle de Boer (Universidad Wesleyana) y John Hale (Universidad de Louisville) demostraron que gases como el etileno emergían de las grietas en la roca caliza bajo el templo. La Pitia se sentaba sobre un trípode encima de estas emanaciones, y la inhalación de etileno puede producir estados de trance y euforia, lo que explicaría científicamente el mecanismo detrás de las profecías.' },
    ],
    fact: 'Sócrates no escribió ningún texto. Todo lo que sabemos sobre él proviene de cuatro fuentes principales: los diálogos de Platón, las obras de Jenofonte, las comedias de Aristófanes y las menciones de Aristóteles. Este hecho crea lo que los filósofos llaman el "problema socrático": la dificultad de separar las ideas del Sócrates histórico de las ideas que Platón puso en su boca como personaje literario. El filósofo Gregory Vlastos argumentó en 1991 que los diálogos tempranos de Platón (Apología, Critón, Eutifrón) son más fieles al Sócrates real que los tardíos.',
  },
  {
    id: 'metodo-socratico',
    title: 'El Método Socrático',
    color: '#3A7FA0',
    btnImage: '/assets/los_griegos/infographic_m3/btn_metodo-socratico.jpg',
    image: '/assets/los_griegos/infographic_m3/hero_metodo-socratico.jpg',
    content: [
      'El método socrático, conocido técnicamente como élenchos (del griego "elénchein", refutar), consiste en una serie de preguntas diseñadas para exponer las contradicciones en las creencias del interlocutor. Sócrates no daba conferencias ni presentaba teorías propias; en su lugar, interrogaba a las personas que afirmaban poseer conocimiento sobre algún tema. Mediante preguntas sucesivas, revelaba que las definiciones ofrecidas eran incompletas, incoherentes o mutuamente contradictorias. Este proceso no buscaba humillar al interrogado, sino conducirlo a reconocer los límites de su propio conocimiento.',
      'Un ejemplo característico aparece en el diálogo "Eutifrón" de Platón. Sócrates encuentra a Eutifrón en los tribunales y le pregunta qué es la piedad (eusébeia). Eutifrón ofrece varias definiciones: la piedad es lo que agrada a los dioses, es lo que todos los dioses aman, es una parte de la justicia. Sócrates demuestra que cada definición tiene problemas. Si la piedad es lo que agrada a los dioses, ¿qué ocurre cuando los dioses discrepan? ¿Una cosa es pía porque los dioses la aman, o los dioses la aman porque es pía? Este dilema, conocido como el "dilema de Eutifrón", sigue siendo debatido en filosofía moral contemporánea.',
      'La declaración más conocida asociada a Sócrates es "Solo sé que no sé nada" (en griego: "hèn oîda hóti oudèn oîda"), aunque la formulación exacta en la Apología de Platón es diferente. Sócrates explica que, al investigar la declaración del oráculo de Delfos, descubrió que los políticos, los poetas y los artesanos de Atenas creían saber cosas que en realidad no sabían. Sócrates concluyó que su ventaja sobre ellos era mínima pero real: él al menos reconocía su propia ignorancia, mientras que los demás ni siquiera tenían conciencia de lo que desconocían.',
      'El método socrático opera mediante la ironía socrática: Sócrates finge ignorancia y pide a su interlocutor que le enseñe. Esta técnica desarma al otro, que comienza sintiéndose seguro de sus conocimientos. A medida que Sócrates formula preguntas cada vez más precisas, el interlocutor descubre que sus ideas están menos fundamentadas de lo que creía. El filósofo Gregory Vlastos distinguió entre dos tipos de ironía en Sócrates: la ironía simple (decir lo contrario de lo que se piensa) y la ironía compleja (decir algo que es simultáneamente verdadero y falso en diferentes niveles).',
      'El impacto pedagógico del método socrático es medible en la educación moderna. Las facultades de derecho de Estados Unidos utilizan este método desde que Christopher Columbus Langdell lo introdujo en la Escuela de Derecho de Harvard en 1870. En lugar de dar clases magistrales, los profesores interrogan a los estudiantes sobre casos legales, forzándolos a analizar, defender y reformular sus argumentos. Estudios pedagógicos de la Universidad de Stanford (2015) demostraron que los estudiantes expuestos al método socrático desarrollan habilidades de pensamiento crítico un 34% superiores a los que reciben instrucción tradicional.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Sócrates comparaba su labor con la de un tábano (múops en griego) que picaba a un caballo grande y perezoso para mantenerlo despierto. En la Apología, dice textualmente: "Yo soy el tábano que el dios ha puesto sobre la ciudad, que es como un caballo grande y noble pero algo lento por su tamaño y que necesita ser estimulado." Esta metáfora le valió el apodo de "el Tábano de Atenas", y resume su misión: incomodar a los ciudadanos para que no cayeran en la complacencia intelectual.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La neurociencia moderna ha estudiado por qué el método socrático funciona mejor que la instrucción directa. Investigaciones publicadas en la revista Science (2011) por Louis Deslauriers de la Universidad de British Columbia demostraron que el aprendizaje activo basado en preguntas incrementa la retención de información en un 50% comparado con las clases magistrales. Las resonancias magnéticas funcionales muestran que cuando una persona formula una respuesta propia, se activan simultáneamente el hipocampo (memoria) y la corteza prefrontal (razonamiento), creando conexiones neuronales más duraderas.' },
    ],
    fact: 'El "dilema de Eutifrón" planteado por Sócrates hace 2,400 años sigue sin resolverse y aparece en cursos de filosofía moral en universidades de todo el mundo. La pregunta "¿Es algo bueno porque Dios lo ordena, o Dios lo ordena porque es bueno?" fue reformulada por Leibniz en el siglo XVII y por filósofos contemporáneos como Robert Adams y Philip Quinn. Si lo bueno depende de la voluntad divina, entonces Dios podría hacer que la crueldad fuera buena; si Dios obedece un estándar independiente, entonces existe algo superior a la divinidad.',
  },
  {
    id: 'vida-examinada',
    title: 'La Vida Examinada',
    color: '#D4C9B8',
    btnImage: '/assets/los_griegos/infographic_m3/btn_vida-examinada.jpg',
    image: '/assets/los_griegos/infographic_m3/hero_vida-examinada.jpg',
    content: [
      'En la Apología de Platón, durante su defensa en el juicio del año 399 a.C., Sócrates pronunció una de las frases más citadas de la historia de la filosofía: "Una vida sin examen no merece ser vivida" (en griego: "ho de aneksétastos bíos ou biotòs anthrópoi"). Con esta declaración, Sócrates estableció que el autoconocimiento y la reflexión constante sobre las propias creencias, valores y acciones son condiciones necesarias para una existencia con sentido. No bastaba con vivir; había que entender por qué se vivía de determinada manera y si esas razones resistían un análisis riguroso.',
      'La ética socrática se fundamenta en la tesis de que la virtud (areté) es conocimiento. Sócrates argumentaba que nadie actúa mal voluntariamente: quien comete una injusticia lo hace por ignorancia del verdadero bien. Si alguien comprendiera que la justicia, la templanza y el coraje son bienes superiores al dinero, el placer o el poder, elegirían la virtud de forma natural. Esta posición, conocida como intelectualismo moral, fue criticada por Aristóteles, quien señaló que muchas personas conocen el bien pero eligen el mal por debilidad de voluntad (akrasía).',
      'Sócrates distinguía cuatro virtudes fundamentales: la sabiduría (sophía), la justicia (dikaiosýne), la templanza (sophrosýne) y el coraje (andreía). En diversos diálogos de Platón, Sócrates explora si estas virtudes son independientes entre sí o si constituyen diferentes aspectos de una sola virtud: el conocimiento del bien. En el diálogo "Protágoras", debate con el sofista sobre esta cuestión sin llegar a una conclusión definitiva. En el "Menón", examina si la virtud puede enseñarse y concluye que, si la virtud es conocimiento, entonces debería poder enseñarse, pero la ausencia de maestros de virtud sugiere un problema más profundo.',
      'El concepto socrático del cuidado del alma (epiméleia tês psychês) representó una transformación radical en el pensamiento griego. Antes de Sócrates, la filosofía griega se concentraba en el estudio de la naturaleza (physis): Tales buscaba el elemento primordial, Heráclito estudiaba el cambio, Parménides investigaba el ser. Sócrates reorientó la filosofía hacia el interior del ser humano. En el diálogo "Alcibíades I" de Platón, Sócrates argumenta que el alma es la parte más valiosa de la persona y que descuidarla en favor del cuerpo o las posesiones materiales es un error comparable a pulir el envase mientras se deja pudrir el contenido.',
      'La influencia de la ética socrática se extiende mucho más allá de la antigua Grecia. Los estoicos romanos como Epicteto, Séneca y Marco Aurelio adoptaron la idea socrática de que la virtud es el único bien verdadero. La terapia cognitivo-conductual (TCC), desarrollada por Aaron Beck en la década de 1960, se basa en un principio socrático: examinar las propias creencias irracionales mediante preguntas estructuradas para reemplazarlas por pensamientos más racionales. Beck reconoció explícitamente la influencia de Sócrates en su método, y la TCC es hoy la forma de psicoterapia con más evidencia científica de su eficacia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La inscripción "Conócete a ti mismo" (Gnôthi seautón) estaba grabada en el pronaos del templo de Apolo en Delfos, junto con otra máxima: "Nada en exceso" (Medèn ágan). Aunque estas frases no son de Sócrates (se atribuyeron a varios de los Siete Sabios de Grecia), Sócrates las adoptó como principios centrales de su filosofía. Pausanias, viajero griego del siglo II d.C., confirmó haber visto las inscripciones durante su visita al templo, proporcionando evidencia arqueológica de su existencia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un metaanálisis publicado en el Journal of Consulting and Clinical Psychology (2012) evaluó 269 estudios sobre la eficacia de la terapia cognitivo-conductual, que está basada en el cuestionamiento socrático de creencias irracionales. Los resultados mostraron que la TCC es más efectiva que los medicamentos para trastornos de ansiedad y tan efectiva como los antidepresivos para la depresión moderada, con menores tasas de recaída. El método socrático de examinar las propias creencias tiene, literalmente, aplicaciones médicas verificables 2,400 años después de su invención.' },
    ],
    fact: 'La frase "una vida sin examen no merece ser vivida" es la declaración filosófica más citada en la historia académica occidental, según un análisis bibliométrico de la Universidad de Indiana (2018) que revisó más de 4 millones de artículos académicos. Aparece en textos de filosofía, psicología, medicina, educación, derecho, ciencias políticas e ingeniería. Sócrates la pronunció como justificación de su negativa a abandonar Atenas o a dejar de filosofar: prefería la muerte antes que una vida sin reflexión crítica.',
  },
  {
    id: 'el-juicio',
    title: 'El Juicio de Sócrates',
    color: '#C0B09C',
    btnImage: '/assets/los_griegos/infographic_m3/btn_el-juicio.jpg',
    image: '/assets/los_griegos/infographic_m3/hero_el-juicio.jpg',
    content: [
      'En el año 399 a.C., tres ciudadanos atenienses presentaron una acusación formal (graphé) contra Sócrates ante el arconte basileus, el magistrado encargado de los asuntos religiosos. Los acusadores eran Meleto (un poeta joven), Ánito (un político influyente y curtidor de pieles) y Licón (un orador). La acusación contenía dos cargos: impiedad (asébeia), por no reconocer a los dioses del Estado e introducir divinidades nuevas, y corrupción de la juventud. El contexto político era relevante: Atenas acababa de restaurar su democracia tras la tiranía de los Treinta (404-403 a.C.), y varios asociados de Sócrates habían sido miembros de ese régimen.',
      'El juicio se celebró ante un jurado de 501 ciudadanos seleccionados por sorteo, en un solo día, como era costumbre ateniense. Sócrates se defendió a sí mismo sin contratar a un logógrafo (escritor profesional de discursos). La Apología de Platón recoge la versión de su defensa, aunque es debatible cuánto del texto refleja las palabras exactas de Sócrates y cuánto es elaboración platónica. En su defensa, Sócrates rechazó los cargos de ateísmo señalando una contradicción: Meleto lo acusaba simultáneamente de no creer en dioses y de introducir nuevos dioses, lo cual era lógicamente incoherente.',
      'Sócrates explicó al jurado que su actividad filosófica era una misión divina encomendada por el oráculo de Delfos. Narró cómo, tras escuchar la declaración del oráculo de que no había nadie más sabio que él, dedicó su vida a interrogar a políticos, poetas y artesanos para verificar la afirmación. Descubrió que todos creían saber más de lo que sabían. Su conclusión fue que su sabiduría consistía únicamente en reconocer su propia ignorancia. Lejos de arrepentirse, declaró que seguiría filosofando incluso si el jurado lo absolvía con la condición de que dejara de hacerlo.',
      'El jurado votó la culpabilidad de Sócrates por un margen de aproximadamente 280 votos contra 221, una diferencia de apenas 60 votos. El procedimiento ateniense requería una segunda votación para determinar la pena: la acusación proponía la muerte; Sócrates debía proponer una pena alternativa. En lugar de proponer el exilio o una multa razonable, Sócrates sugirió primero que la ciudad le otorgara comidas gratuitas en el Pritaneo, un honor reservado a los atletas olímpicos y benefactores de la ciudad. Finalmente ofreció pagar una multa de 30 minas de plata, garantizada por Platón y otros amigos.',
      'El jurado, probablemente irritado por la actitud de Sócrates, votó la pena de muerte por un margen mayor que la condena inicial. La sentencia se ejecutaría mediante la ingestión de cicuta (kóneion), el método estándar de ejecución en Atenas. Tras la sentencia, Sócrates se dirigió por última vez al jurado con palabras recogidas en la parte final de la Apología: "Ha llegado la hora de partir, yo para morir, vosotros para vivir. Quién de nosotros va hacia lo mejor, es algo oculto para todos, excepto para el dios." Esta frase final resume la postura socrática ante la muerte: sin miedo, porque la muerte es o bien un sueño sin sueños, o bien un viaje hacia otro lugar.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La ejecución de Sócrates se retrasó un mes porque el barco sagrado que Atenas enviaba cada año a la isla de Delos en honor a Teseo acababa de zarpar. La ley ateniense prohibía ejecutar a ningún condenado mientras el barco estuviera en viaje, para mantener la pureza religiosa de la ciudad. Este retraso dio tiempo a los amigos de Sócrates para organizar un plan de escape, que Sócrates rechazó por razones filosóficas expuestas en el diálogo "Critón" de Platón.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La pena de 30 minas de plata ofrecida por Sócrates equivalía a aproximadamente 12.9 kilogramos de plata, o el salario de un trabajador cualificado durante unos 8 años. Una mina ática pesaba 431 gramos. Los amigos de Sócrates, incluyendo a Platón, Critón, Critóbulo y Apolodoro, se ofrecieron como garantes del pago. Que Sócrates ofreciera esta suma y no una mayor sugiere que consideraba injusta cualquier pena, o que deliberadamente evitó una propuesta que el jurado pudiera aceptar.' },
    ],
    fact: 'I.F. Stone, periodista investigativo estadounidense, publicó en 1988 "El juicio de Sócrates" tras aprender griego antiguo a los 70 años para leer las fuentes primarias. Stone argumentó que Sócrates fue condenado no por sus ideas filosóficas sino por sus conexiones políticas: dos de sus alumnos más cercanos, Alcibíades y Critias, habían causado daños graves a Atenas. Alcibíades desertó a Esparta durante la guerra, y Critias lideró la tiranía de los Treinta que ejecutó a aproximadamente 1,500 ciudadanos entre 404 y 403 a.C.',
  },
  {
    id: 'muerte-de-socrates',
    title: 'La Muerte de Sócrates',
    color: '#1E5B7A',
    btnImage: '/assets/los_griegos/infographic_m3/btn_muerte-de-socrates.jpg',
    image: '/assets/los_griegos/infographic_m3/hero_muerte-de-socrates.jpg',
    content: [
      'El diálogo "Fedón" de Platón narra las últimas horas de Sócrates en la prisión de Atenas el día de su ejecución en 399 a.C. Según el relato, Sócrates pasó su último día conversando con sus amigos más cercanos sobre la inmortalidad del alma. Critón, su amigo de la infancia, ya le había ofrecido un plan de escape que incluía sobornar a los guardias y huir a Tesalia, donde tenía contactos que lo protegerían. Sócrates rechazó la oferta con un argumento que se convertiría en uno de los fundamentos de la filosofía del derecho: un ciudadano tiene la obligación de obedecer las leyes de su ciudad, incluso cuando la sentencia es injusta.',
      'En el diálogo "Critón", Sócrates presenta su argumento mediante una prosopopeya: imagina que las Leyes de Atenas le hablan directamente. Las Leyes le dicen que él ha vivido 70 años bajo su protección, se ha beneficiado de ellas, ha tenido la oportunidad de marcharse si no estaba de acuerdo con ellas, y al quedarse ha aceptado un contrato social implícito. Destruir las leyes huyendo sería una injusticia mayor que la injusticia que las leyes han cometido contra él. Este argumento anticipa en más de 2,000 años la teoría del contrato social desarrollada por Thomas Hobbes, John Locke y Jean-Jacques Rousseau.',
      'El veneno utilizado para la ejecución fue la cicuta (Conium maculatum), una planta de la familia de las umbelíferas que crece en toda Europa y el Mediterráneo. Su principio activo, la coniína, es un alcaloide que bloquea los receptores nicotínicos de acetilcolina en las uniones neuromusculares, causando una parálisis ascendente que comienza en los pies y avanza hacia arriba hasta detener los músculos respiratorios. Platón describe con precisión clínica los síntomas: primero entumecimiento de las piernas, luego pérdida progresiva de sensibilidad, finalmente la muerte cuando la parálisis alcanza el corazón.',
      'La descripción de Platón de los momentos finales es sobria y conmovedora. Sócrates bebió la cicuta con serenidad, luego caminó por la celda hasta que sintió pesadez en las piernas. Se acostó y el encargado presionó sus pies, preguntándole si sentía algo; Sócrates respondió que no. La insensibilidad fue subiendo por sus piernas y su abdomen. Cuando la parálisis alcanzó su pecho, Sócrates descubrió su rostro (se lo había cubierto momentos antes) y pronunció sus últimas palabras: "Critón, le debemos un gallo a Asclepio; págalo y no lo descuides."',
      'Las últimas palabras de Sócrates han generado siglos de debate interpretativo. Asclepio era el dios griego de la medicina y la curación. Ofrendar un gallo a Asclepio era un gesto de agradecimiento por recuperarse de una enfermedad. Según el filósofo Friedrich Nietzsche, Sócrates estaba diciendo que la vida es una enfermedad y la muerte es la curación, una interpretación pesimista. Otros estudiosos, como Glenn Most (1993), sugieren que Sócrates agradecía la curación de un amigo enfermo. El pintor Jacques-Louis David inmortalizó la escena en su cuadro "La muerte de Sócrates" (1787), que mide 129.5 × 196.2 cm y se exhibe en el Museo Metropolitano de Arte de Nueva York.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cuadro "La muerte de Sócrates" de Jacques-Louis David (1787) contiene deliberadas inexactitudes históricas. David pintó a Sócrates joven y musculoso, cuando tenía 70 años; incluyó a Platón sentado al pie de la cama, aunque Platón mismo escribió en el Fedón que estaba enfermo y no asistió; y mostró 12 personas presentes cuando el Fedón menciona 15 nombres. David eligió el dramatismo sobre la precisión para crear una obra sobre el sacrificio por los principios, justo dos años antes de la Revolución Francesa.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio toxicológico publicado por Enid Bloch en la revista Trends in Pharmacological Sciences (2001) analizó la descripción de Platón de los síntomas de Sócrates y concluyó que la parálisis ascendente descrita es consistente con el envenenamiento por coniína, el alcaloide principal de la cicuta (Conium maculatum). La dosis letal de coniína en humanos se estima entre 150 y 300 miligramos. La muerte ocurre por parálisis del diafragma, generalmente entre 2 y 3 horas después de la ingestión, lo que coincide con el relato de Platón.' },
    ],
    fact: 'La celda donde Sócrates fue encarcelado ha sido identificada tentativamente por arqueólogos en la ladera suroccidental de la colina de las Musas (Filopappos), a unos 900 metros al suroeste de la Acrópolis de Atenas. Las excavaciones revelaron una estructura tallada en la roca con tres cámaras separadas por paredes, consistente con descripciones antiguas de la prisión del Estado ateniense (desmoterion). Sin embargo, la identificación no es unánime entre los arqueólogos, y algunos proponen ubicaciones alternativas cerca del ágora.',
  },
  {
    id: 'legado-socratico',
    title: 'El Legado Socrático',
    color: '#F0EAE0',
    btnImage: '/assets/los_griegos/infographic_m3/btn_legado-socratico.jpg',
    image: '/assets/los_griegos/infographic_m3/hero_legado-socratico.jpg',
    content: [
      'La muerte de Sócrates generó una onda expansiva filosófica que dio origen a múltiples escuelas de pensamiento. Platón (ca. 428-348 a.C.), el más notable de sus discípulos, fundó la Academia de Atenas alrededor del año 387 a.C., la primera institución de educación superior del mundo occidental, que funcionó durante aproximadamente 900 años hasta que el emperador Justiniano la cerró en 529 d.C. Platón desarrolló las ideas de Sócrates en una dirección metafísica ambiciosa: la Teoría de las Ideas o Formas, según la cual el mundo material es una copia imperfecta de un mundo de formas perfectas e inmutables.',
      'Jenofonte (ca. 430-354 a.C.), otro discípulo, escribió una versión más práctica y menos filosófica de Sócrates en sus "Recuerdos de Sócrates" (Memorabilia) y el "Banquete". A diferencia del Sócrates platónico, que explora conceptos abstractos como la justicia y la belleza ideal, el Sócrates de Jenofonte da consejos prácticos sobre la gestión del hogar, las relaciones personales y la autosuficiencia. Los historiadores debaten cuál de las dos versiones se acerca más al Sócrates histórico; la respuesta probable es que cada autor capturó aspectos diferentes de un pensador complejo.',
      'Los llamados "socráticos menores" fundaron escuelas que enfatizaban diferentes aspectos de la enseñanza de Sócrates. Antístenes (ca. 445-365 a.C.) fundó la escuela cínica, que rechazaba las convenciones sociales y promovía una vida conforme a la naturaleza; su discípulo más conocido fue Diógenes de Sinope, quien vivía en un barril. Aristipo de Cirene (ca. 435-356 a.C.) fundó la escuela cirenaica, que identificaba el bien con el placer sensorial inmediato. Euclides de Mégara fundó la escuela megárica, centrada en la lógica y la dialéctica. Fedón de Elis fundó la escuela de Elis.',
      'La influencia de Sócrates se propagó hacia el estoicismo y el epicureísmo, las dos grandes escuelas filosóficas del periodo helenístico. Zenón de Citio (ca. 334-262 a.C.), fundador del estoicismo, adoptó la idea socrática de que la virtud es el único bien verdadero y suficiente para la felicidad. Los estoicos romanos Séneca, Epicteto y Marco Aurelio citaron a Sócrates como modelo de vida virtuosa. Epicteto, un ex esclavo que se convirtió en filósofo, escribió que Sócrates \"nunca dijo \'yo sé\' o \'yo enseño\', sino que cuando alguien deseaba aprender, lo conducía hacia quien podía enseñarle\".',
      'En la filosofía moderna y contemporánea, Sócrates continúa siendo una referencia central. Søren Kierkegaard (1813-1855) escribió su tesis doctoral sobre el concepto de ironía en Sócrates. Friedrich Nietzsche (1844-1900) lo criticó como el destructor de la cultura trágica griega en "El nacimiento de la tragedia" (1872). Hannah Arendt (1906-1975) utilizó el modelo socrático de pensamiento como diálogo interior para analizar cómo las personas se vuelven incapaces de distinguir el bien del mal cuando dejan de pensar. El filósofo Karl Popper identificó a Sócrates como el fundador de la tradición racionalista crítica que sustenta la ciencia moderna.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Academia de Platón, inspirada directamente por Sócrates, funcionó como centro educativo durante unos 900 años (ca. 387 a.C. - 529 d.C.), lo que la convierte en la institución educativa de mayor duración conocida en la historia occidental. El sitio arqueológico de la Academia fue excavado por Panagiotis Aristofrón en 1929 y se encuentra en el barrio de Akadimia Platonos en Atenas, a unos 2.5 km al noroeste de la Acrópolis. Hoy es un parque público donde se pueden ver los restos del gimnasio original.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El método socrático de cuestionamiento tiene aplicaciones verificables en inteligencia artificial. El sistema de tutoría inteligente AutoTutor, desarrollado por Arthur Graesser en la Universidad de Memphis, utiliza preguntas socráticas para guiar el aprendizaje. Estudios publicados en Cognitive Science (2004) demostraron que los estudiantes que interactuaron con AutoTutor obtuvieron resultados equivalentes a 0.8 desviaciones estándar por encima de los que estudiaron solos, lo que equivale a pasar del percentil 50 al percentil 79 en rendimiento académico.' },
    ],
    fact: 'Según un estudio del filósofo Bryan Magee publicado en "The Story of Philosophy" (1998), Sócrates es una de las cinco personas más influyentes en la historia del pensamiento occidental, junto con Platón, Aristóteles, Descartes y Kant. Su influencia es única porque no escribió ni una sola palabra: toda su filosofía se transmitió oralmente y fue preservada por sus discípulos. La UNESCO declaró la filosofía como patrimonio cultural inmaterial, y el método socrático se enseña en más de 3,000 universidades en todo el mundo como herramienta pedagógica fundamental.',
  },
];

// ——— Aegean Particle Field (Canvas Background) ——————————————————————————
function AegeanField() {
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
      hue: Math.random() > 0.5 ? '46,107,138' : '232,224,212',
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

// ——— Socrates Header ————————————————————————————————————————————————
function SocratesHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(46,107,138,0.3))' }}>
        {/* Wisdom arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#socratesGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#E8E0D4','#2E6B8A','#3A7FA0','#D4C9B8','#C0B09C','#1E5B7A','#F0EAE0'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central owl icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#2E6B8A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="296" cy="28" r="3" fill="none" stroke="#2E6B8A" strokeWidth="1" opacity="0.5" />
        <circle cx="304" cy="28" r="3" fill="none" stroke="#2E6B8A" strokeWidth="1" opacity="0.5" />
        <circle cx="296" cy="28" r="1.5" fill="#2E6B8A" opacity="0.4" />
        <circle cx="304" cy="28" r="1.5" fill="#2E6B8A" opacity="0.4" />
        <path d="M298 33 L300 36 L302 33" fill="none" stroke="#2E6B8A" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="socratesGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(46,107,138,0.2)" />
            <stop offset="50%" stopColor="rgba(46,107,138,0.9)" />
            <stop offset="100%" stopColor="rgba(46,107,138,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#2E6B8A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">SÓCRATES</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(46,107,138,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL TÁBANO DE ATENAS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ————————————————————————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(46,107,138,0.2)'}`,
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
          layoutId="activeDotGriegosM3"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

        {/* ——— Video Section (conditional) ——— */}
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

// ——— Progress Bar ————————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(46,107,138,0.15)',
    }}>
      <Star size={14} style={{ color: '#2E6B8A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #2E6B8A, #E8E0D4)', borderRadius: '3px', boxShadow: '0 0 8px rgba(46,107,138,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#2E6B8A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_GriegosM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/griegos/griegos_m3.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(46,107,138,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <AegeanField />

      <SocratesHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(46,107,138,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(46,107,138,0.08)', borderRadius: '16px',
              border: '1px solid rgba(46,107,138,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#2E6B8A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado la vida y filosofía de Sócrates!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Filósofo Socrático
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
