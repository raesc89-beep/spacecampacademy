'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Ancient Greek Philosophy themed) ————————————————
function DecoColumn({ size = 70, color = '#2E6B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Doric column */}
      <rect x="20" y="8" width="20" height="44" fill="none" stroke={color} strokeWidth="1.5" rx="1" />
      {/* Capital */}
      <rect x="16" y="5" width="28" height="4" fill="none" stroke={color} strokeWidth="1.2" rx="1" />
      {/* Base */}
      <rect x="16" y="52" width="28" height="4" fill="none" stroke={color} strokeWidth="1.2" rx="1" />
      {/* Fluting lines */}
      <line x1="24" y1="10" x2="24" y2="50" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="28" y1="10" x2="28" y2="50" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="32" y1="10" x2="32" y2="50" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="36" y1="10" x2="36" y2="50" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Pediment triangle */}
      <path d="M14 5 L30 -5 L46 5" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoScroll({ size = 70, color = '#D4C9B8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Scroll body */}
      <rect x="12" y="14" width="36" height="32" fill="none" stroke={color} strokeWidth="1.5" rx="2" />
      {/* Top roll */}
      <ellipse cx="30" cy="14" rx="20" ry="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Bottom roll */}
      <ellipse cx="30" cy="46" rx="20" ry="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Text lines */}
      <line x1="18" y1="22" x2="42" y2="22" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="27" x2="38" y2="27" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="32" x2="42" y2="32" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="37" x2="35" y2="37" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoGeometry({ size = 70, color = '#3A7FA0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Triangle */}
      <polygon points="30,8 50,48 10,48" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inscribed circle */}
      <circle cx="30" cy="35" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Center point */}
      <circle cx="30" cy="35" r="2" fill={color} opacity="0.4" />
      {/* Vertex marks */}
      <circle cx="30" cy="8" r="2" fill={color} opacity="0.5" />
      <circle cx="50" cy="48" r="2" fill={color} opacity="0.5" />
      <circle cx="10" cy="48" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoCave({ size = 70, color = '#1E5B7A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Cave arch */}
      <path d="M5 55 Q5 10 30 8 Q55 10 55 55" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner shadow */}
      <path d="M12 55 Q12 20 30 18 Q48 20 48 55" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Fire/light source */}
      <circle cx="30" cy="40" r="5" fill={color} opacity="0.3" />
      <circle cx="30" cy="40" r="3" fill={color} opacity="0.5" />
      {/* Shadow figures on wall */}
      <line x1="18" y1="25" x2="16" y2="35" stroke={color} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <line x1="22" y1="23" x2="21" y2="33" stroke={color} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      <circle cx="18" cy="23" r="2" fill={color} opacity="0.3" />
      <circle cx="22" cy="21" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoLaurel({ size = 70, color = '#C0B09C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Left branch */}
      <path d="M30 55 Q15 40 12 30 Q10 20 15 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Right branch */}
      <path d="M30 55 Q45 40 48 30 Q50 20 45 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Left leaves */}
      <ellipse cx="14" cy="22" rx="5" ry="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" transform="rotate(-30 14 22)" />
      <ellipse cx="16" cy="32" rx="5" ry="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" transform="rotate(-20 16 32)" />
      <ellipse cx="20" cy="40" rx="5" ry="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" transform="rotate(-10 20 40)" />
      {/* Right leaves */}
      <ellipse cx="46" cy="22" rx="5" ry="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" transform="rotate(30 46 22)" />
      <ellipse cx="44" cy="32" rx="5" ry="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" transform="rotate(20 44 32)" />
      <ellipse cx="40" cy="40" rx="5" ry="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" transform="rotate(10 40 40)" />
    </svg>
  );
}

function DecoSolids({ size = 70, color = '#E8E0D4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Platonic solid - dodecahedron outline */}
      <polygon points="30,6 48,18 44,40 16,40 12,18" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Inner pentagon */}
      <polygon points="30,16 40,24 37,36 23,36 20,24" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Connecting lines */}
      <line x1="30" y1="6" x2="30" y2="16" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="48" y1="18" x2="40" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="44" y1="40" x2="37" y2="36" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="16" y1="40" x2="23" y2="36" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="12" y1="18" x2="20" y2="24" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Center */}
      <circle cx="30" cy="28" r="2" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'discipulo-socrates': [DecoLaurel, DecoScroll, DecoColumn],
  'la-academia': [DecoColumn, DecoGeometry, DecoScroll],
  'teoria-ideas': [DecoSolids, DecoGeometry, DecoCave],
  'alegoria-caverna': [DecoCave, DecoColumn, DecoSolids],
  'la-republica': [DecoColumn, DecoLaurel, DecoScroll],
  'los-dialogos': [DecoScroll, DecoLaurel, DecoGeometry],
  'legado-platon': [DecoSolids, DecoColumn, DecoLaurel],
};

// ——— Content Data ————————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Platón (c. 380 a.C.). República (Πολιτεία). Edición crítica de J. Burnet, Oxford Classical Texts',
  'Platón (c. 385 a.C.). Banquete (Συμπόσιον) y Fedro (Φαῖδρος). Edición de L. Robin, Les Belles Lettres',
  'Kraut, R. (ed.) (1992). The Cambridge Companion to Plato. Cambridge University Press',
  'Fine, G. (1999). Plato 2: Ethics, Politics, Religion, and the Soul. Oxford University Press',
  'Cornford, F.M. (1941). The Republic of Plato: Translated with Introduction and Notes. Oxford University Press',
  'Guthrie, W.K.C. (1975). A History of Greek Philosophy, Vol. IV: Plato, the Man and His Dialogues. Cambridge University Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'discipulo-socrates',
    title: 'El Discípulo de Sócrates',
    color: '#E8E0D4',
    btnImage: '/assets/griegos/griegos_m4.png',
    image: '/assets/griegos/griegos_m4.png',
    content: [
      'El filósofo que el mundo conoce como Platón nació en Atenas alrededor del año 428 a.C. con el nombre de Aristocles. El apodo "Platón" (del griego πλατύς, platýs, que significa "ancho") le fue dado, según la tradición recogida por Diógenes Laercio en el siglo III d.C., por su maestro de gimnasia debido a la anchura de sus hombros o, según otras fuentes, por la amplitud de su frente. Su familia pertenecía a la aristocracia ateniense: su padre Aristón se consideraba descendiente del último rey de Atenas, Codro, y su madre Perictione estaba emparentada con Solón, el legislador que sentó las bases de la democracia ateniense en el año 594 a.C.',
      'En su juventud, Platón recibió la educación típica de un joven aristocrático ateniense: gimnasia, música, poesía y las primeras nociones de filosofía. Según fuentes antiguas, también practicó la lucha en los juegos ístmicos. Alrededor del año 407 a.C., cuando tenía aproximadamente 20 años, conoció a Sócrates, un encuentro que transformó su vida para siempre. Platón abandonó sus ambiciones políticas y poéticas para dedicarse a la filosofía. Durante ocho años fue discípulo de Sócrates, hasta la ejecución de este en el año 399 a.C., condenado a beber cicuta por los cargos de impiedad y corrupción de la juventud ateniense.',
      'La muerte de Sócrates marcó profundamente a Platón y se convirtió en el punto de partida de toda su obra filosófica. Platón consideró que la democracia ateniense había cometido un error grave al condenar al hombre más justo y sabio de la ciudad. Esta experiencia lo llevó a reflexionar sobre la justicia, la política y la naturaleza del conocimiento verdadero. En su diálogo Apología de Sócrates, Platón reconstruyó el discurso de defensa de su maestro ante el tribunal de los 501 jueces atenienses, preservando para la posteridad las palabras y el método del filósofo que prefirió morir antes que renunciar a la búsqueda de la verdad.',
      'Tras la muerte de Sócrates, Platón emprendió una serie de viajes que duraron aproximadamente doce años. Visitó Megara, donde estudió con el filósofo Euclides de Megara; viajó a Cirene en el norte de África, donde estudió matemáticas con Teodoro; recorrió Egipto, donde pudo conocer las tradiciones sacerdotales milenarias; y visitó el sur de Italia, donde entró en contacto con los pitagóricos, cuya influencia sobre su pensamiento fue determinante. La doctrina pitagórica de que los números y las proporciones matemáticas constituyen la estructura oculta de la realidad dejó una marca permanente en la filosofía platónica.',
      'Los viajes de Platón a Siracusa, en la isla de Sicilia, fueron episodios decisivos y turbulentos de su biografía. Realizó tres viajes a esta ciudad: el primero alrededor del año 388 a.C., donde conoció a Dión, cuñado del tirano Dionisio I; el segundo hacia el 367 a.C., invitado por Dión para educar al joven Dionisio II; y el tercero hacia el 361 a.C., en un último intento de influir en la política siciliana. Los tres viajes terminaron en fracaso y peligro: según la tradición, en su primer viaje Dionisio I se enfureció tanto con Platón que lo vendió como esclavo, siendo rescatado por el filósofo Aníceris de Cirene, quien pagó 20 minas por su libertad.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El nombre real de Platón era Aristocles, hijo de Aristón. El apodo "Platón" aparece documentado por primera vez en fuentes del siglo III d.C. por Diógenes Laercio en sus Vidas de los filósofos eminentes. Algunos historiadores modernos cuestionan esta etimología y sugieren que "Platón" podría haber sido simplemente un nombre común en la Atenas del siglo V a.C., ya que aparece en inscripciones de la época sin relación con el filósofo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La cronología de la vida de Platón se establece a partir de fuentes indirectas. La fecha de nacimiento más aceptada, 428/427 a.C., proviene de Apolodoro de Atenas (siglo II a.C.), quien calculó que Platón tenía 28 años cuando murió Sócrates en el 399 a.C. La fecha de su muerte, 348/347 a.C., sitúa su vida en un periodo de aproximadamente 80 años, coincidiendo con el periodo de la Guerra del Peloponeso y la posterior decadencia del poder ateniense.' },
    ],
    fact: 'Platón era, según fuentes antiguas, un atleta consumado. Diógenes Laercio reporta que participó como luchador en los Juegos Ístmicos, celebrados cada dos años cerca de Corinto en honor a Poseidón. La formación atlética era parte integral de la educación aristocrática en Atenas, y Platón incluyó la gimnasia como componente esencial de la educación en su obra La República, argumentando que el cuerpo y el alma debían entrenarse conjuntamente para alcanzar la excelencia (areté).',
  },
  {
    id: 'la-academia',
    title: 'La Academia',
    color: '#2E6B8A',
    btnImage: '/assets/griegos/griegos_m4.png',
    image: '/assets/griegos/griegos_m4.png',
    content: [
      'Alrededor del año 387 a.C., tras regresar de su primer viaje a Sicilia, Platón fundó la Academia en un terreno situado en un bosque sagrado dedicado al héroe Academo (o Hecademo), a poco más de un kilómetro al noroeste de las murallas de Atenas, junto al río Cefiso. Este lugar ya tenía un gimnasio público y estaba rodeado de olivos sagrados. Platón adquirió un terreno adyacente donde estableció lo que muchos historiadores consideran la primera institución de educación superior del mundo occidental. La Academia funcionó de manera continua durante aproximadamente 916 años, hasta que el emperador bizantino Justiniano I ordenó su cierre en el año 529 d.C.',
      'La inscripción que supuestamente adornaba la entrada de la Academia — "Ἀγεωμέτρητος μηδεὶς εἰσίτω" (que nadie entre aquí sin saber geometría) — se convirtió en una de las frases más citadas de la historia de la educación. Aunque la atribución directa a Platón es discutida por los historiadores, la frase refleja la convicción platónica de que las matemáticas constituyen el entrenamiento previo necesario para la filosofía. Para Platón, la geometría enseñaba al estudiante a pensar en términos de formas puras e ideales, preparando la mente para comprender las Ideas o Formas que constituyen la realidad última.',
      'La enseñanza en la Academia combinaba conferencias, debates y diálogos. A diferencia de las escuelas de retórica de los sofistas, que cobraban por sus lecciones, la Academia funcionaba más como una comunidad de investigación. Los miembros discutían problemas filosóficos y matemáticos, y Platón no imponía una doctrina rígida sino que fomentaba el debate crítico. El método principal era la dialéctica: el arte de llegar a la verdad mediante preguntas y respuestas sucesivas, un método heredado de Sócrates pero sistematizado por Platón como procedimiento filosófico riguroso para ascender desde las opiniones particulares hasta los principios universales.',
      'Entre los estudiantes y miembros de la Academia se encontraban algunas de las mentes más brillantes del mundo antiguo. Aristóteles de Estagira ingresó en la Academia a los 17 años, en el 367 a.C., y permaneció como miembro durante 20 años, hasta la muerte de Platón. Otros miembros destacados fueron Espeusipo (sobrino de Platón, quien le sucedió como director), Jenócrates de Calcedonia (tercer director), el matemático Eudoxo de Cnido (quien desarrolló una teoría de las proporciones y un modelo planetario de esferas homocéntricas), y Teeteto de Atenas (cuyas contribuciones a la teoría de los irracionales se reflejan en el diálogo que lleva su nombre).',
      'La Academia no era solo un centro filosófico sino también un centro de investigación matemática de primer nivel. Los problemas que se discutían incluían la cuadratura del círculo, la duplicación del cubo y la trisección del ángulo, tres problemas clásicos que resultaron ser irresolubles con regla y compás, aunque esto no se demostró formalmente hasta el siglo XIX. Eudoxo de Cnido desarrolló dentro de la Academia su método de exhaución, un precursor del cálculo integral que Arquímedes perfeccionaría un siglo más tarde. La relación entre matemáticas y filosofía en la Academia platónica sentó las bases del pensamiento científico occidental.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Academia de Platón funcionó durante aproximadamente 916 años consecutivos, desde su fundación hacia el 387 a.C. hasta su cierre por el emperador Justiniano I en el 529 d.C. Ninguna otra institución educativa en la historia de Occidente ha operado durante un periodo tan extenso. La palabra "academia" en español, inglés, francés, italiano y muchas otras lenguas modernas deriva directamente de esta escuela ateniense, cuyo nombre proviene del héroe mítico Academo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Eudoxo de Cnido, miembro de la Academia platónica, calculó que el año solar tenía una duración de 365 días y 6 horas, un cálculo con un error de apenas 11 minutos respecto al valor actual de 365 días, 5 horas y 48 minutos. Además, su modelo astronómico de 27 esferas homocéntricas fue el primer intento sistemático de explicar matemáticamente el movimiento aparente de los planetas, anticipando el trabajo posterior de Aristóteles y Ptolomeo.' },
    ],
    fact: 'El sitio arqueológico de la Academia de Platón fue identificado en 1929 por el arqueólogo griego Phokion Negris y excavado sistemáticamente entre 1929 y 1940 por Panagiotis Aristophron. Los hallazgos incluyen los restos de un peristilo (patio porticado) y un gimnasio del siglo IV a.C. Hoy, el Parque Arqueológico de la Academia de Platón en Atenas (barrio de Akadimia Platonos) ocupa 4.2 hectáreas y conserva los cimientos de las estructuras que Platón y sus discípulos utilizaron durante más de tres siglos.',
  },
  {
    id: 'teoria-ideas',
    title: 'La Teoría de las Ideas',
    color: '#3A7FA0',
    btnImage: '/assets/griegos/griegos_m4.png',
    image: '/assets/griegos/griegos_m4.png',
    content: [
      'La Teoría de las Ideas (o Teoría de las Formas) es la contribución filosófica central de Platón y una de las doctrinas más influyentes en toda la historia del pensamiento occidental. Platón propuso que la realidad que percibimos con los sentidos — los objetos físicos, las personas, los colores, los sonidos — no es la realidad verdadera sino una copia imperfecta de entidades perfectas, inmutables y eternas que llamó Ideas o Formas (εἶδος, eidos, o ἰδέα, idea). Por ejemplo, todos los círculos que dibujamos en el mundo físico son imperfectos, pero existe un Círculo Perfecto ideal que es el modelo del que participan todos los círculos particulares.',
      'Según Platón, las Ideas habitan en un ámbito separado del mundo físico: el "mundo inteligible" (κόσμος νοητός, kosmos noetós), accesible solo mediante la razón, no mediante los sentidos. El mundo que percibimos es el "mundo sensible" (κόσμος αἰσθητός, kosmos aisthetos), un ámbito de cambio constante, deterioro y apariencia. La relación entre ambos mundos se describe mediante dos conceptos: participación (μέθεξις, methexis) — los objetos físicos participan de las Ideas — e imitación (μίμησις, mimesis) — los objetos físicos son imitaciones imperfectas de las Ideas. Esta distinción entre apariencia y realidad recorre toda la filosofía platónica.',
      'En el diálogo Fedón (escrito hacia el 385 a.C.), Platón presenta argumentos a favor de la existencia de las Ideas a través de la voz de Sócrates. Uno de los argumentos centrales es el de la "reminiscencia" (ἀνάμνησις, anamnesis): conocer no es aprender algo nuevo sino recordar lo que el alma ya sabía antes de nacer, cuando contemplaba las Ideas directamente. En el diálogo Menón, Sócrates demuestra esto haciendo que un esclavo sin educación matemática resuelva un problema de geometría solo mediante preguntas, sugiriendo que el conocimiento geométrico estaba latente en su alma y solo necesitaba ser "despertado".',
      'En la cúspide de la jerarquía de las Ideas se encuentra la Idea del Bien (ἡ τοῦ ἀγαθοῦ ἰδέα), que Platón compara en La República (Libro VI, 508-509) con el Sol en el mundo visible. Así como el Sol ilumina los objetos y permite que los ojos los vean, la Idea del Bien "ilumina" las demás Ideas y permite que la razón las comprenda. La Idea del Bien es, para Platón, la causa última de todo ser y de todo conocimiento. No es una cosa más entre las cosas, ni siquiera una Idea más entre las Ideas, sino el principio que da sentido y orden a toda la realidad, tanto inteligible como sensible.',
      'La Teoría de las Ideas no estuvo exenta de críticas, incluso dentro de la propia Academia. En el diálogo Parménides (escrito hacia el 370 a.C.), Platón pone en boca del anciano filósofo Parménides objeciones serias contra su propia teoría, como el célebre "argumento del tercer hombre": si un hombre particular y la Idea de Hombre se parecen, entonces debe existir una tercera Idea que explique esa semejanza, y así hasta el infinito. Aristóteles retomó esta crítica en su Metafísica (990b-991a). Que Platón incluyera estas objeciones en su propia obra muestra su honestidad intelectual y su disposición a someter sus ideas al escrutinio más riguroso.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En el diálogo Menón (80d-86c), Sócrates llama a un joven esclavo y, sin enseñarle nada directamente, le hace una serie de preguntas sobre geometría hasta que el muchacho logra determinar por sí mismo cómo construir un cuadrado de área doble. Platón utiliza esta escena para argumentar que el alma posee conocimientos innatos que preceden al nacimiento, un concepto que influyó en filósofos posteriores como Leibniz y que fue debatido por John Locke en su Ensayo sobre el entendimiento humano de 1690.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En el diálogo Timeo (53c-55c), Platón asoció los cuatro elementos clásicos con cuatro de los cinco sólidos regulares: el fuego con el tetraedro (4 caras), el aire con el octaedro (8 caras), el agua con el icosaedro (20 caras) y la tierra con el cubo (6 caras). El quinto sólido, el dodecaedro (12 caras pentagonales), lo asoció con el cosmos mismo. Euclides demostró en el Libro XIII de sus Elementos (c. 300 a.C.) que solo existen estos cinco sólidos regulares, conocidos desde entonces como "sólidos platónicos".' },
    ],
    fact: 'Los cinco sólidos platónicos — tetraedro, cubo, octaedro, dodecaedro e icosaedro — son los únicos poliedros regulares convexos posibles en el espacio tridimensional. Este hecho fue demostrado rigurosamente por Euclides en la Proposición 18 del Libro XIII de sus Elementos, alrededor del año 300 a.C. En 1596, el astrónomo Johannes Kepler intentó explicar las distancias entre los seis planetas conocidos mediante estos cinco sólidos anidados, un modelo geométrico que publicó en su obra Mysterium Cosmographicum.',
  },
  {
    id: 'alegoria-caverna',
    title: 'La Alegoría de la Caverna',
    color: '#1E5B7A',
    btnImage: '/assets/griegos/griegos_m4.png',
    image: '/assets/griegos/griegos_m4.png',
    content: [
      'La Alegoría de la Caverna aparece al inicio del Libro VII de La República (514a-520a) y es una de las imágenes filosóficas más influyentes jamás creadas. Platón describe un grupo de prisioneros encadenados desde su nacimiento en el interior de una caverna subterránea, de cara a una pared. Detrás de ellos arde un fuego, y entre el fuego y los prisioneros hay un camino elevado por donde pasan personas portando figuras de animales, plantas y objetos. Los prisioneros solo pueden ver las sombras que estas figuras proyectan sobre la pared, y escuchar los ecos de las voces. Para los prisioneros, estas sombras y ecos constituyen la totalidad de la realidad.',
      'Platón entonces imagina qué sucedería si uno de los prisioneros fuera liberado y obligado a girar hacia el fuego. La luz lo cegaría y le causaría dolor. Tendría dificultad para comprender que las figuras que ve son más reales que las sombras a las que estaba acostumbrado. Si luego fuera arrastrado hasta la salida de la caverna y expuesto a la luz del Sol, el dolor sería aún mayor. Gradualmente, primero podría mirar las sombras exteriores, luego los reflejos en el agua, después los objetos mismos, las estrellas en la noche, y finalmente el Sol, comprendiendo que este es la fuente de toda luz, calor y vida.',
      'Cada elemento de la alegoría tiene un significado filosófico preciso. La caverna representa el mundo sensible, el ámbito de las apariencias que captamos con los sentidos. Las sombras en la pared representan las imágenes y opiniones que la mayoría de las personas confunde con la realidad. El fuego dentro de la caverna simboliza las fuentes imperfectas de conocimiento, como la percepción sensorial. El ascenso hacia el exterior representa el camino de la educación filosófica, el paso del mundo de las apariencias al mundo inteligible de las Ideas. El Sol, que ilumina todo en el exterior, representa la Idea del Bien, el principio supremo de la realidad.',
      'La Alegoría de la Caverna contiene también una dimensión política y pedagógica que Platón desarrolla explícitamente en el texto. Sócrates pregunta a su interlocutor Glaucón: ¿qué pasaría si el prisionero liberado regresara a la caverna para informar a los demás prisioneros de que sus sombras no son la realidad? Platón responde que los prisioneros se burlarían de él, dirían que el viaje al exterior le ha dañado la vista, y si intentara liberarlos, lo matarían. Esta parte de la alegoría es una referencia directa al destino de Sócrates: el filósofo que intenta "despertar" a sus conciudadanos es rechazado y condenado a muerte por quienes prefieren sus sombras familiares.',
      'La influencia de la Alegoría de la Caverna se extiende mucho más allá de la filosofía antigua. En el cine, la película The Matrix (1999), dirigida por las hermanas Wachowski, presenta una reformulación directa de la alegoría: los humanos viven en una realidad simulada (la Matrix/caverna) mientras sus cuerpos reales yacen en cápsulas. El personaje de Morfeo ofrece a Neo la elección entre la "pastilla roja" (salir de la caverna) y la "pastilla azul" (permanecer en la ilusión). En la filosofía moderna, René Descartes planteó una situación similar con su hipótesis del "genio maligno" en sus Meditaciones Metafísicas de 1641.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Alegoría de la Caverna ha sido reinterpretada en numerosas obras contemporáneas. La película The Truman Show (1998) presenta a un hombre que vive toda su vida dentro de un set de televisión sin saberlo, como los prisioneros de la caverna. El físico Nick Bostrom, de la Universidad de Oxford, publicó en 2003 su "argumento de la simulación", planteando la posibilidad estadística de que nuestra realidad sea una simulación computacional, una versión tecnológica de la caverna platónica.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En la neurociencia contemporánea, el concepto de que el cerebro construye una "representación" de la realidad — y que no percibimos el mundo "directamente" — guarda paralelismos con la alegoría platónica. El neurocientífico Anil Seth, de la Universidad de Sussex, describe la percepción como una "alucinación controlada": el cerebro genera modelos predictivos del mundo exterior y los ajusta con la información sensorial entrante. Lo que experimentamos como "realidad" es, en cierto sentido, una proyección interna, como las sombras en la pared de la caverna.' },
    ],
    fact: 'En 1940, el filósofo Martin Heidegger impartió una serie de conferencias en la Universidad de Friburgo tituladas "La doctrina de Platón sobre la verdad" (Platons Lehre von der Wahrheit), donde argumentó que la Alegoría de la Caverna marca un giro decisivo en la historia de la filosofía occidental: el paso de la concepción griega original de la verdad como aletheia (desocultamiento, revelación) a la concepción de la verdad como "corrección" (orthotes) de una representación. Según Heidegger, este giro platónico determinó toda la metafísica occidental posterior durante más de 2.000 años.',
  },
  {
    id: 'la-republica',
    title: 'La República',
    color: '#D4C9B8',
    btnImage: '/assets/griegos/griegos_m4.png',
    image: '/assets/griegos/griegos_m4.png',
    content: [
      'La República (Πολιτεία, Politeia) es la obra más extensa e influyente de Platón, compuesta probablemente entre los años 380 y 370 a.C. Organizada en diez libros, la obra aborda la pregunta central: ¿qué es la justicia? (τί ἐστι δικαιοσύνη). Para responderla, Sócrates propone examinar la justicia primero en la ciudad ideal (polis) y luego en el alma individual, argumentando que ambas poseen una estructura análoga. La obra contiene las doctrinas más conocidas de Platón: la Teoría de las Ideas, la Alegoría de la Caverna, la analogía del Sol, la línea dividida y el proyecto del gobierno de los filósofos.',
      'Platón propone una ciudad organizada en tres clases sociales, cada una correspondiente a una parte del alma. Los productores (artesanos, agricultores, comerciantes) corresponden al apetito (ἐπιθυμητικόν, epithymetikon), la parte del alma que desea bienes materiales y placeres. Los guardianes (guerreros) corresponden al ánimo (θυμοειδές, thymoeidés), la parte del alma asociada con el coraje, la indignación y el sentido del honor. Los gobernantes-filósofos corresponden a la razón (λογιστικόν, logistikon), la parte del alma que busca la verdad y el conocimiento. La justicia consiste en que cada parte cumpla su función sin interferir con las demás.',
      'El concepto más controvertido de La República es el gobierno de los filósofos-reyes (φιλόσοφοι βασιλεῖς). Platón argumenta en el Libro V (473c-d) que los males de las ciudades no cesarán hasta que "los filósofos reinen en las ciudades o los que ahora se llaman reyes y poderosos filosofen genuina y adecuadamente, y coincidan en una misma persona el poder político y la filosofía". Esta propuesta radical se basa en la premisa de que solo quien ha contemplado la Idea del Bien mediante la educación filosófica puede gobernar con justicia, del mismo modo que solo quien conoce la medicina puede curar enfermedades.',
      'La educación que Platón diseña para los futuros gobernantes es un programa riguroso de aproximadamente 50 años. Los niños y niñas (Platón incluye a las mujeres en la educación y el gobierno, algo inusual para su época) reciben música y gimnasia hasta los 20 años. De los 20 a los 30, estudian aritmética, geometría, astronomía y armonía. De los 30 a los 35, estudian dialéctica, el método filosófico supremo. De los 35 a los 50, adquieren experiencia práctica en cargos públicos. Solo a los 50 años, quienes han superado todas las pruebas pueden contemplar la Idea del Bien y gobernar la ciudad, alternando periodos de gobierno con periodos de estudio filosófico.',
      'La República también contiene una crítica de la poesía y el arte imitativo que ha generado debate durante más de dos milenios. En los Libros II-III y X, Platón argumenta que los poetas, incluido Homero, deben ser censurados o expulsados de la ciudad ideal porque sus obras imitan apariencias (el mundo sensible) que a su vez son copias de las Ideas, situando al arte a "tres grados de distancia de la verdad". Además, la poesía apela a las emociones y debilita la parte racional del alma. Aristóteles respondió a esta crítica en su Poética (c. 335 a.C.), argumentando que la imitación artística tiene valor cognoscitivo propio y que la tragedia produce una catarsis beneficiosa.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Platón propuso en La República (Libro V, 451d-457b) que las mujeres debían recibir la misma educación que los hombres, incluida la formación militar y filosófica, y que podían llegar a ser gobernantas-filósofas. Esta posición era radical en la Atenas del siglo IV a.C., donde las mujeres no tenían derechos políticos ni acceso a la educación formal. Platón argumentó que la diferencia de sexo no implica diferencia de capacidad para gobernar, así como el hecho de que un hombre sea calvo y otro tenga pelo no afecta su aptitud para la zapatería.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En La República (Libro VII, 525a-531c), Platón establece un currículo matemático de cinco disciplinas preparatorias para la filosofía: aritmética, geometría plana, geometría sólida (estereometría), astronomía y armonía musical. Este programa fue la base del quadrivium medieval (aritmética, geometría, astronomía y música), que junto con el trivium (gramática, retórica y dialéctica) formó las siete artes liberales que estructuraron la educación universitaria europea desde el siglo XII hasta el Renacimiento.' },
    ],
    fact: 'Karl Popper, en su obra La sociedad abierta y sus enemigos (1945), criticó duramente La República de Platón, argumentando que el proyecto de ciudad ideal platónico constituye un modelo totalitario que sacrifica la libertad individual en nombre de una élite gobernante que posee la verdad. Popper situó a Platón como el primer teórico del autoritarismo en la tradición occidental. Esta interpretación, aunque influyente, ha sido cuestionada por platónicos como Cornford y Annas, quienes argumentan que La República es un experimento mental sobre la justicia, no un programa político literal.',
  },
  {
    id: 'los-dialogos',
    title: 'Los Diálogos',
    color: '#C0B09C',
    btnImage: '/assets/griegos/griegos_m4.png',
    image: '/assets/griegos/griegos_m4.png',
    content: [
      'Platón escribió toda su filosofía en forma de diálogos, una decisión literaria y filosófica deliberada que lo distingue de la mayoría de los pensadores occidentales. Se conservan 36 diálogos atribuidos a Platón, junto con 13 cartas (cuya autenticidad es debatida, excepto la Carta VII, generalmente aceptada como auténtica). Los diálogos son obras dramáticas con personajes, escenarios y argumentos que se desarrollan a través de la conversación. En la mayoría de ellos, Sócrates es el personaje principal y el conductor de la discusión, aunque en los diálogos tardíos (Sofista, Político, Timeo, Leyes) otros personajes asumen el papel protagonista.',
      'Los estudiosos clasifican los diálogos de Platón en tres periodos basándose en el análisis estilístico y doctrinal. Los diálogos tempranos o socráticos (Apología, Critón, Eutifrón, Laques, Cármides, Lisis, Hipias Menor) son breves, reflejan el método socrático de refutación (elenchos) y suelen terminar sin una respuesta definitiva (aporía). Los diálogos medios (Menón, Fedón, Banquete, República, Fedro) presentan las grandes doctrinas platónicas: la Teoría de las Ideas, la inmortalidad del alma, la reminiscencia. Los diálogos tardíos (Parménides, Teeteto, Sofista, Político, Timeo, Filebo, Leyes) muestran autocrítica y revisión de las doctrinas anteriores.',
      'El Banquete (Συμπόσιον, escrito hacia el 385 a.C.) es uno de los diálogos más bellos y estudiados de Platón. Ambientado en una cena en casa del poeta trágico Agatón, el diálogo presenta siete discursos sobre la naturaleza del amor (eros). El discurso de Sócrates, que relata las enseñanzas de la sacerdotisa Diotima de Mantinea, describe el amor como un ascenso gradual: desde el amor por un cuerpo particular, pasando por el amor por la belleza de todos los cuerpos, la belleza del alma, la belleza del conocimiento, hasta alcanzar la contemplación de la Belleza en sí misma, la Idea de Belleza, que es eterna, inmutable y perfecta.',
      'El Fedro (Φαῖδρος, escrito hacia el 370 a.C.) contiene la célebre Alegoría del Carro Alado, donde Platón compara el alma humana con un carro tirado por dos caballos y conducido por un auriga. El auriga representa la razón (nous), el caballo blanco y noble representa el ánimo (thymos, las emociones nobles como el coraje y la dignidad), y el caballo negro y rebelde representa los apetitos (epithymia, los deseos corporales). El auriga debe conducir el carro hacia el mundo de las Ideas, pero el caballo negro tira constantemente hacia abajo, hacia el mundo sensible. Esta imagen ilustra el conflicto interno del alma y la necesidad de que la razón gobierne las pasiones.',
      'El método dialéctico que Platón desarrolla en sus diálogos tiene dos movimientos complementarios: la "sinopsis" (synagogé), que consiste en reunir muchos particulares bajo una Idea general, y la "diairesis" (diairesis), que consiste en dividir un género en sus especies naturales. En el diálogo Fedro (265d-266c), Sócrates compara al dialéctico con un buen carnicero que corta la carne por las articulaciones naturales en lugar de romper los huesos. Este método de clasificación por división fue desarrollado extensamente en los diálogos tardíos Sofista y Político, y fue adoptado y refinado por Aristóteles como base de su sistema de categorías y clasificación biológica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En el Banquete, el dramaturgo Aristófanes presenta un mito sobre el origen del amor: originalmente, los seres humanos eran criaturas dobles con cuatro brazos, cuatro piernas y dos caras. Zeus los partió por la mitad como castigo, y desde entonces cada mitad busca desesperadamente a su otra mitad. Este mito es el origen de la expresión "media naranja" y de la idea cultural de que cada persona tiene una "pareja perfecta" predestinada, un concepto que ha permeado la literatura romántica occidental durante más de dos milenios.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El análisis estilométrico computacional moderno ha confirmado la cronología tradicional de los diálogos de Platón. En 1867, Lewis Campbell realizó el primer estudio estadístico del vocabulario platónico, identificando patrones estilísticos que permitían agrupar los diálogos por periodos. Estudios posteriores con herramientas informáticas, como los de Gerard Ledger (1989) y David Wishart (1990), han utilizado análisis multivariante de más de 400 variables lingüísticas para confirmar que Leyes fue la última obra de Platón y que los diálogos siguen un orden de composición coherente.' },
    ],
    fact: 'Alfred North Whitehead, matemático y filósofo británico, coautor con Bertrand Russell de los Principia Mathematica (1910-1913), escribió en 1929 en su obra Process and Reality: "La caracterización general más segura de la tradición filosófica europea es que consiste en una serie de notas a pie de página a Platón." Esta afirmación, una de las más citadas en la historia de la filosofía, sugiere que los problemas filosóficos fundamentales planteados por Platón — la naturaleza de la realidad, el conocimiento, la justicia, la belleza y el bien — siguen siendo los problemas centrales de la filosofía occidental 2.400 años después.',
  },
  {
    id: 'legado-platon',
    title: 'El Legado de Platón',
    color: '#F0EAE0',
    btnImage: '/assets/griegos/griegos_m4.png',
    image: '/assets/griegos/griegos_m4.png',
    content: [
      'El legado de Platón se extiende a lo largo de 2.400 años de historia intelectual y abarca prácticamente todas las áreas del pensamiento humano: filosofía, política, matemáticas, ciencia, arte, religión y educación. Tras su muerte en el 348/347 a.C. (según la tradición, durante un banquete de bodas, a los 80 u 81 años de edad), la Academia continuó funcionando bajo la dirección de su sobrino Espeusipo y luego de Jenócrates, Polemón, Crates y Arcesilao. La llamada "Academia Media" de Arcesilao (siglo III a.C.) adoptó una postura escéptica, mientras que la "Nueva Academia" de Carnéades (siglo II a.C.) profundizó en el escepticismo probabilista.',
      'La influencia de Platón en la filosofía religiosa occidental es profunda y duradera. Los primeros pensadores cristianos — Clemente de Alejandría (150-215 d.C.), Orígenes (185-254 d.C.) y especialmente San Agustín de Hipona (354-430 d.C.) — adoptaron conceptos platónicos para articular la teología cristiana. San Agustín identificó las Ideas platónicas con los pensamientos de Dios y la Idea del Bien con Dios mismo. La doctrina platónica de la inmortalidad del alma, expuesta en el Fedón, fue integrada en la teología cristiana y configuró la comprensión occidental de la muerte, el juicio y la vida eterna durante más de quince siglos.',
      'El neoplatonismo, fundado por Plotino (204-270 d.C.) y sistematizado por Proclo (412-485 d.C.), desarrolló las ideas de Platón en un sistema metafísico elaborado centrado en la emanación de toda la realidad desde un principio supremo llamado "el Uno" (τὸ ἕν). El Uno trasciende incluso el Ser y el pensamiento, y de él emana el Intelecto (Νοῦς), del Intelecto emana el Alma (Ψυχή), y del Alma emana el mundo material. Este esquema influyó en la mística cristiana, judía (la Cábala) e islámica (los filósofos Al-Farabi e Ibn Sina/Avicena), y fue recuperado en el Renacimiento por Marsilio Ficino en la Academia Platónica de Florencia, fundada en 1462.',
      'En el Renacimiento, la recuperación de los textos completos de Platón transformó la cultura europea. Marsilio Ficino, bajo el patrocinio de Cosimo de Médici, tradujo por primera vez la obra completa de Platón al latín entre 1462 y 1484, haciendo accesibles diálogos que habían sido desconocidos en Europa occidental durante más de mil años. El Timeo había sido el único diálogo disponible en latín durante toda la Edad Media, en la traducción parcial de Calcidio (siglo IV d.C.). Las traducciones de Ficino desencadenaron un renacimiento del platonismo que influyó en las artes (Rafael pintó La Escuela de Atenas en 1509-1511), la ciencia y la filosofía.',
      'La influencia de Platón en la ciencia moderna se manifiesta en la convicción de que el universo tiene una estructura matemática que la razón humana puede descubrir. Galileo Galilei escribió en 1623 en El Ensayador que "el libro de la naturaleza está escrito en lenguaje matemático, y sus caracteres son triángulos, círculos y otras figuras geométricas". Esta idea — que la matemática no es una invención humana sino la estructura profunda de la realidad — es esencialmente platónica. Werner Heisenberg, uno de los fundadores de la mecánica cuántica, escribió en 1958 en Física y Filosofía que las partículas subatómicas se asemejan más a las Ideas platónicas que a los átomos materiales de Demócrito.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 1509, el pintor Rafael Sanzio completó el fresco La Escuela de Atenas en las Estancias del Vaticano, en Roma. En el centro de la composición aparecen Platón y Aristóteles caminando juntos: Platón (con los rasgos de Leonardo da Vinci) señala hacia el cielo, simbolizando su mundo de las Ideas, mientras Aristóteles extiende la mano hacia la tierra, representando su enfoque empirista. Este fresco, de 5 metros de alto por 7.7 metros de ancho, se ha convertido en la representación visual más reconocida de la filosofía occidental.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El físico Roger Penrose, Premio Nobel de Física 2020, ha defendido una posición abiertamente platónica sobre las matemáticas. En su obra The Road to Reality (2004), Penrose argumenta que los objetos matemáticos (números, triángulos, grupos) existen en un "mundo platónico" independiente de la mente humana y del mundo físico. Los matemáticos, según Penrose, no inventan sino que descubren verdades que existen con independencia de cualquier observador, una posición conocida como "realismo matemático" o "platonismo matemático".' },
    ],
    fact: 'La UNESCO declaró 2016 como Año Internacional de la Filosofía, y la figura de Platón fue central en las celebraciones. En la actualidad, los textos de Platón se enseñan en universidades de más de 120 países. El Proyecto Perseus de la Universidad de Tufts (EE.UU.) ha digitalizado la totalidad de las obras de Platón en griego antiguo con traducción al inglés, haciendo accesible gratuitamente a millones de estudiantes los mismos diálogos que se discutían en la Academia ateniense hace 2.400 años. La distancia temporal no ha reducido la vigencia de las preguntas que Platón formuló.',
  },
];

// ——— Aegean Particle Field (Canvas Background) ——————————————————————————————
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
      hue: Math.random() > 0.5 ? '46,107,138' : '232,224,212', // aegean blue or marble white
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

// ——— Philosophy Header ——————————————————————————————————————————————————————
function PhilosophyHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(46,107,138,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#platoGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#E8E0D4','#2E6B8A','#3A7FA0','#1E5B7A','#D4C9B8','#C0B09C','#F0EAE0'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central column icon */}
        <rect x="293" y="18" width="14" height="28" fill="none" stroke="#2E6B8A" strokeWidth="1.5" opacity="0.6" rx="1" />
        <rect x="289" y="15" width="22" height="4" fill="none" stroke="#2E6B8A" strokeWidth="1" opacity="0.5" rx="1" />
        <rect x="289" y="46" width="22" height="4" fill="none" stroke="#2E6B8A" strokeWidth="1" opacity="0.5" rx="1" />
        <defs>
          <linearGradient id="platoGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(46,107,138,0.2)" />
            <stop offset="50%" stopColor="rgba(46,107,138,0.9)" />
            <stop offset="100%" stopColor="rgba(46,107,138,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#2E6B8A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">PLATÓN Y EL MUNDO DE LAS IDEAS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(46,107,138,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">FILOSOFÍA · VERDAD · CONOCIMIENTO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ————————————————————————————
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
          layoutId="activeDotGriegosM4"
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

// ——— Expandable Section with Random Direction ————————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————————
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

// ——— Progress Bar ————————————————————————————————————————————————————————————
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

// ——— Main Infographic Component ——————————————————————————————————————————————
export default function InteractiveInfographic_GriegosM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/griegos/griegos_m4_bg.png)',
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

      <PhilosophyHeader />

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
              🏛️ ¡Has explorado el Mundo de las Ideas de Platón!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Filósofo Platónico
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
