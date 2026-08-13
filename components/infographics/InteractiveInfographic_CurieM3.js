'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Radioactivity / Marie Curie themed) ────────────
function DecoAtomCurie({ size = 60, color = '#4CAF50', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoRadiation({ size = 70, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Radiation trefoil */}
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.5" />
      {[0, 120, 240].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <path key={i}
            d={`M30,30 L${30 + 22 * Math.cos(rad - 0.35)},${30 + 22 * Math.sin(rad - 0.35)} A22,22 0 0,1 ${30 + 22 * Math.cos(rad + 0.35)},${30 + 22 * Math.sin(rad + 0.35)} Z`}
            fill={color} opacity="0.25"
          />
        );
      })}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoFlask({ size = 70, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Erlenmeyer flask */}
      <path d="M24 8 L24 24 L10 50 L50 50 L36 24 L36 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
      <line x1="22" y1="8" x2="38" y2="8" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Liquid */}
      <path d="M15 42 L45 42 L50 50 L10 50 Z" fill={color} opacity="0.15" />
      {/* Bubbles */}
      <circle cx="25" cy="38" r="1.5" fill={color} opacity="0.4" />
      <circle cx="32" cy="35" r="1" fill={color} opacity="0.3" />
      <circle cx="35" cy="40" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoMedal({ size = 70, color = '#7B1FA2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Medal ribbon */}
      <path d="M22 5 L22 22 L30 18 L38 22 L38 5" fill={color} opacity="0.25" />
      {/* Medal circle */}
      <circle cx="30" cy="35" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="35" r="11" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Star in center */}
      <path d="M30 25 L32 31 L38 31 L33 35 L35 41 L30 37 L25 41 L27 35 L22 31 L28 31 Z" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoCross({ size = 60, color = '#81C784', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Medical cross */}
      <rect x="22" y="10" width="16" height="40" rx="3" fill={color} opacity="0.25" />
      <rect x="10" y="22" width="40" height="16" rx="3" fill={color} opacity="0.25" />
      {/* Pulse line */}
      <path d="M5 50 L15 50 L20 42 L25 55 L30 38 L35 50 L55 50" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

function DecoXray({ size = 80, color = '#8E24AA', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* X-ray screen frame */}
      <rect x="10" y="4" width="60" height="40" rx="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Skeleton hint - ribcage */}
      <line x1="40" y1="12" x2="40" y2="36" stroke={color} strokeWidth="1.2" opacity="0.3" />
      {[16, 20, 24, 28].map((y, i) => (
        <g key={i}>
          <line x1="30" y1={y} x2="40" y2={y + 1} stroke={color} strokeWidth="1" opacity="0.25" />
          <line x1="50" y1={y} x2="40" y2={y + 1} stroke={color} strokeWidth="1" opacity="0.25" />
        </g>
      ))}
      {/* Glow dots */}
      <circle cx="20" cy="10" r="1.5" fill={color} opacity="0.4" />
      <circle cx="65" cy="38" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'tragedia-pierre': [DecoFlask, DecoAtomCurie, DecoRadiation],
  'sola-contra-mundo': [DecoMedal, DecoRadiation, DecoFlask],
  'escandalo-langevin': [DecoRadiation, DecoMedal, DecoAtomCurie],
  'nobel-quimica-1911': [DecoMedal, DecoFlask, DecoRadiation],
  'instituto-radio': [DecoFlask, DecoAtomCurie, DecoCross],
  'petites-curies': [DecoXray, DecoCross, DecoFlask],
  'legado-cientifico': [DecoAtomCurie, DecoMedal, DecoRadiation],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Quinn, S. (1995). Marie Curie: A Life. Simon & Schuster',
  'Curie, E. (1937). Madame Curie: A Biography. Doubleday, Doran and Company',
  'Goldsmith, B. (2005). Obsessive Genius: The Inner World of Marie Curie. W.W. Norton',
  'Redniss, L. (2010). Radioactive: Marie & Pierre Curie, A Tale of Love and Fallout. It Books/HarperCollins',
  'Curie, M. (1923). Pierre Curie, With Autobiographical Notes. The Macmillan Company',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'tragedia-pierre',
    title: 'La Tragedia de Pierre',
    color: '#4CAF50',
    btnImage: '/assets/curie/curie_m3.png',
    image: '/assets/curie/curie_m3.png',
    content: [
      'El 19 de abril de 1906, la vida de Marie Curie se partió en dos. Pierre Curie, su esposo, compañero de laboratorio y coautor del Premio Nobel de Física de 1903, murió aplastado por un carro de caballos cargado con equipamiento militar en la Rue Dauphine de París. Pierre tenía 46 años y caminaba bajo una lluvia torrencial cuando resbaló al intentar cruzar la calle. La rueda trasera del carro, que pesaba varias toneladas, le aplastó el cráneo. Los testigos reportaron que Pierre murió de forma instantánea, sin sufrir. La policía encontró en sus bolsillos notas de laboratorio sobre cristalografía piezoeléctrica.',
      'Marie recibió la noticia esa misma tarde. Según el relato de Eve Curie, su hija menor, Marie permaneció en silencio durante horas, repitiendo únicamente: «Pierre está muerto. Muerto. Está muerto.» En los días siguientes, escribió en su diario íntimo unas líneas que no se hicieron públicas hasta décadas después de su propia muerte: «Querido Pierre, quisiera decirte que ya no puedo con este trabajo sin ti, que sin ti no tengo la fuerza para vivir.» Ese diario, descubierto en 1990, reveló la profundidad de un duelo que Marie ocultó al mundo durante el resto de su vida.',
      'Pierre y Marie habían trabajado juntos durante once años, desde que se conocieron en la primavera de 1894 en el laboratorio del profesor Gabriel Lippmann en la Sorbona. Pierre le había cedido espacio en su propio laboratorio de la Escuela de Física y Química Industrial de París (ESPCI). Juntos descubrieron el polonio (julio de 1898) y el radio (diciembre de 1898), y compartieron el Nobel de Física en 1903 con Henri Becquerel. La muerte de Pierre no solo dejó a Marie viuda con dos hijas pequeñas — Irène, de ocho años, y Ève, de un año — sino que eliminó al único colega que comprendía la totalidad de su investigación.',
      'Los informes forenses del accidente describieron que Pierre cruzaba la calle Dauphine hacia el Quai de Conti cerca de las 14:30 horas, protegido con un paraguas que le impedía ver el tráfico. Un carro tirado por dos caballos Percherones, conducido por Louis Manin, avanzaba por la calle cargado con seis toneladas de equipamiento militar. Pierre intentó esquivar los caballos agarrándose a uno de ellos, pero resbaló en el pavimento mojado y cayó bajo la rueda trasera izquierda. El conductor no fue procesado; las autoridades determinaron que el accidente fue causado por la lluvia y la falta de visibilidad.',
      'La comunidad científica internacional quedó conmocionada. Lord Kelvin, Ernest Rutherford y Henri Poincaré enviaron telegramas de condolencia. El gobierno francés ofreció a Marie una pensión estatal como viuda de un científico notable, pero ella la rechazó con firmeza: «Soy lo bastante joven como para ganarme la vida y la de mis hijas», respondió. Esta decisión reflejaba el carácter de Marie: una independencia feroz que la acompañaría el resto de su vida. A los 38 años, con dos hijas pequeñas y sin ingresos fijos, Marie Curie decidió enfrentar al mundo sola, armada únicamente con su genio y su determinación.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El diario íntimo que Marie comenzó a escribir tras la muerte de Pierre se conserva hoy en la Biblioteca Nacional de Francia en París. Está guardado dentro de una caja forrada de plomo, porque sus páginas aún emiten radiación medible. Cualquier investigador que desee consultarlo debe firmar un formulario de exención de responsabilidad y usar equipo de protección. Las últimas entradas del diario datan de 1907, un año después de la muerte de Pierre, cuando Marie escribió que finalmente podía volver a concentrarse en su trabajo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Pierre Curie realizó contribuciones fundamentales a la física antes de trabajar con Marie. Junto a su hermano Jacques, inventó el electrómetro piezoeléctrico en 1880, un instrumento que genera una carga eléctrica bajo presión mecánica. Este dispositivo fue la herramienta clave que Marie utilizó para medir la radioactividad de los minerales. Pierre también descubrió la temperatura de Curie (punto de Curie): la temperatura a la cual un material ferromagnético pierde sus propiedades magnéticas, fijada en 770°C para el hierro puro.' },
    ],
    fact: 'El lugar exacto donde Pierre Curie murió en la Rue Dauphine, número 6 del sexto distrito de París, fue marcado con una placa conmemorativa en 1908. La calle, que conecta el Boulevard Saint-Germain con el Pont Neuf, era una de las vías más transitadas de la Rive Gauche en 1906. El carro que causó el accidente pertenecía al regimiento de transporte militar basado en el cuartel de Reuilly. Louis Manin, el conductor, declaró ante la policía que no vio al peatón debido a la intensidad de la lluvia y que los caballos no pudieron detenerse a tiempo.',
  },
  {
    id: 'sola-contra-mundo',
    title: 'Sola Contra el Mundo',
    color: '#6A1B9A',
    btnImage: '/assets/curie/curie_m3.png',
    image: '/assets/curie/curie_m3.png',
    content: [
      'Solo un mes después de la muerte de Pierre, el 13 de mayo de 1906, el Consejo de la Facultad de Ciencias de la Universidad de París tomó una decisión sin precedentes: ofrecer a Marie Curie la cátedra de física que había ocupado su esposo. Marie aceptó, convirtiéndose en la primera mujer profesora en los 650 años de historia de la Sorbona, fundada en 1253. La universidad no creó un puesto nuevo para ella; le otorgó exactamente el mismo cargo que Pierre había tenido, con el mismo salario de 10.000 francos anuales y las mismas responsabilidades docentes e investigadoras.',
      'El 5 de noviembre de 1906, Marie Curie dictó su primera clase en el anfiteatro de física de la Sorbona. El aula, con capacidad para 120 personas, estaba repleta: asistieron estudiantes, periodistas de Le Figaro, Le Matin y Le Petit Journal, diplomáticos, colegas científicos y curiosos que querían presenciar el momento histórico. Muchos esperaban que Marie se derrumbara emocionalmente o pronunciara un discurso dedicado a Pierre. En cambio, Marie entró al salón a las 13:30, se quitó el abrigo negro y comenzó su lección exactamente donde Pierre la había dejado, retomando la última frase de su última clase.',
      'Marie no mencionó a Pierre en esa primera lección. Habló durante una hora y media sobre la naturaleza de la radiactividad, la diferencia entre radiación alfa, beta y gamma, y los métodos de medición con el electrómetro piezoeléctrico. Al terminar, el auditorio estalló en una ovación que duró varios minutos. Los periódicos franceses reportaron el evento en primera plana. Le Journal tituló: «Una conquista del feminismo». Pero Marie no se veía a sí misma como feminista ni como símbolo de nada: era una científica que necesitaba seguir trabajando para mantener a sus hijas y avanzar en su investigación.',
      'Ser madre viuda y profesora universitaria en 1906 requería una logística que pocos podían sostener. Marie organizó una rutina estricta: levantarse a las 6:00, preparar a Irène (8 años) y Ève (1 año) para el día, llegar al laboratorio a las 8:00, dar clases por la tarde, volver a casa a las 19:00 para cenar con sus hijas, y luego trabajar en sus publicaciones hasta la medianoche. Contrató a una institutriz polaca, y su suegro, Eugène Curie, que vivía con ellos desde la muerte de Pierre, se encargaba de las niñas cuando Marie tenía compromisos académicos. Eugène murió en 1910, dejando a Marie aún más sola.',
      'Marie también diseñó un sistema educativo alternativo para Irène y sus compañeros. En lugar de enviarla a una escuela convencional, organizó una «cooperativa escolar» con otros profesores de la Sorbona: cada padre enseñaba su especialidad a un grupo de diez niños. Marie enseñaba física y matemáticas, el escultor Jean Perrin enseñaba química, y la sinóloga Henriette Perrin enseñaba historia. Las clases se daban en los laboratorios de la universidad, donde los niños realizaban experimentos reales. Este sistema funcionó durante dos años, de 1907 a 1909, y Irène siempre lo recordó como la mejor educación que recibió en su vida.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marie Curie fue rechazada por la Académie des Sciences de Francia en enero de 1911, perdiendo la votación por dos votos (28 contra 30) frente al físico Édouard Branly. La Academia no admitió a una mujer como miembro hasta 1979, cuando la física Yvonne Choquet-Bruhat fue elegida. Marie ya tenía un Nobel de Física cuando fue rechazada, y recibiría el Nobel de Química ese mismo año. La ironía es que Branly, quien la derrotó, nunca recibió un Nobel.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La cátedra que Marie Curie ocupó en la Sorbona se llamaba oficialmente «Cátedra de Física General». Pierre la había obtenido en 1904, un año después del Nobel, cuando la universidad finalmente le ofreció un puesto permanente. Antes de eso, Pierre trabajaba en la ESPCI sin estabilidad laboral. Marie mantuvo la cátedra desde 1906 hasta 1934, el año de su muerte, formando a una generación de físicos nucleares que incluyó a su propia hija Irène y a su yerno Frédéric Joliot-Curie, ambos ganadores del Nobel de Química en 1935.' },
    ],
    fact: 'La «cooperativa escolar» que Marie organizó para Irène y otros niños en 1907 incluía clases en los laboratorios reales de la Sorbona. Los niños, de entre 6 y 12 años, aprendían a usar balanzas analíticas, termómetros de mercurio y electroscopios. Jean Perrin, que ganaría el Nobel de Física en 1926 por demostrar la existencia del átomo, les enseñaba a hacer cristalizaciones y reacciones químicas con colores. Paul Langevin, futuro pionero del sonar, les daba clases de matemáticas con juegos de lógica. Era una escuela donde los profesores eran los mejores científicos de Francia.',
  },
  {
    id: 'escandalo-langevin',
    title: 'El Escándalo Langevin',
    color: '#66BB6A',
    btnImage: '/assets/curie/curie_m3.png',
    image: '/assets/curie/curie_m3.png',
    content: [
      'En el otoño de 1911, mientras Marie Curie se preparaba para recibir su segundo Premio Nobel, estalló un escándalo que estuvo a punto de destruir su carrera y su reputación. La prensa francesa reveló que Marie mantenía una relación sentimental con Paul Langevin, un físico de 39 años, antiguo alumno de Pierre Curie en la ESPCI y uno de los científicos más prometedores de Francia. Langevin estaba separado de su esposa Jeanne Desfosses desde hacía años, pero legalmente seguía casado. La esposa de Langevin entregó cartas privadas entre Marie y Paul a los periodistas del diario Le Journal.',
      'La campaña de prensa contra Marie fue de una brutalidad que hoy resulta difícil de comprender. Los periódicos más sensacionalistas — Le Petit Journal, L\'Intransigeant, L\'Œuvre — la llamaron «la extranjera roba-maridos», «la polaca venenosa» y «la judía» (Marie no era judía, pero el antisemitismo era una herramienta habitual de la xenofobia francesa de la época). Gustave Téry, director de L\'Œuvre, publicó fragmentos de las cartas privadas y retó a Paul Langevin a un duelo. El duelo se celebró el 25 de noviembre de 1911, pero ninguno de los dos disparó: ambos bajaron sus pistolas sin abrir fuego.',
      'El componente xenófobo del escándalo era central. Francia vivía una oleada de nacionalismo exacerbado antes de la Primera Guerra Mundial, y Marie, nacida Maria Sklodowska en Varsovia (entonces parte del Imperio Ruso), nunca fue plenamente aceptada como francesa a pesar de llevar 20 años en el país. Los periódicos subrayaban constantemente su origen extranjero. Una multitud se reunió frente a su casa en Sceaux el 4 de noviembre de 1911, gritando insultos y amenazas. Marie tuvo que refugiarse con sus hijas en casa de su amiga Marguerite Borel, esposa del matemático Émile Borel, durante varias semanas.',
      'La dimensión sexista del ataque fue igual de corrosiva. Si Marie hubiera sido un científico varón con una relación extramarital, la prensa probablemente habría ignorado el asunto o lo habría tratado con indulgencia. Pero Marie era una mujer en un campo dominado por hombres, y la sociedad francesa de 1911 aplicaba un doble estándar moral riguroso. Los mismos científicos que habían aplaudido su trabajo académico ahora le daban la espalda en público. Svante Arrhenius, miembro del comité Nobel, le envió una carta sugiriéndole que no viajara a Estocolmo a recibir el premio. Marie respondió con una carta que se ha convertido en un documento histórico del feminismo científico.',
      'En su respuesta a Arrhenius, fechada el 5 de diciembre de 1911, Marie escribió: «El premio me fue concedido por el descubrimiento del radio y del polonio. No creo que exista conexión alguna entre mi trabajo científico y los hechos de mi vida privada. No puedo aceptar, en principio, que la valoración de los méritos de un trabajo científico pueda verse influida por difamaciones y calumnias relativas a la vida privada.» Viajó a Estocolmo, recibió el Nobel en persona el 10 de diciembre de 1911 y pronunció su discurso de aceptación en francés, con Irène y su hermana Bronia a su lado en la primera fila.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Paul Langevin (1872-1946) siguió una carrera científica notable. En 1917, durante la Primera Guerra Mundial, inventó el primer sistema de sonar práctico utilizando cristales piezoeléctricos — la misma tecnología que Pierre Curie había investigado décadas antes. Langevin también fue uno de los primeros físicos en apoyar la teoría de la relatividad de Einstein. Durante la Segunda Guerra Mundial, fue arrestado por la Gestapo por sus actividades antifascistas y enviado a un campo de internamiento. Su nieta Hélène Langevin-Joliot se casó con el nieto de Marie Curie, Michel Langevin, uniendo las dos familias.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El duelo entre Gustave Téry y Paul Langevin del 25 de noviembre de 1911 se celebró en el Velódromo du Parc des Princes de París, con pistolas semiautomáticas a 25 pasos de distancia. Los padrinos de Langevin fueron los matemáticos Paul Painlevé y Émile Borel; los de Téry fueron periodistas. Cuando el juez dio la orden de disparar, Langevin levantó su pistola pero no apretó el gatillo. Téry tampoco disparó. Los testigos reportaron que Langevin declaró: «No soy un asesino», bajó el arma y se marchó. Los duelos eran legales en Francia hasta 1967.' },
    ],
    fact: 'Las cartas entre Marie Curie y Paul Langevin que Jeanne Desfosses entregó a la prensa nunca fueron publicadas completas. Los fragmentos que aparecieron en L\'Œuvre y Le Journal mostraban una relación sentimental, pero también discusiones sobre física teórica, sobre los experimentos de Marie con radio metálico puro y sobre las ecuaciones de Langevin para el movimiento browniano. La correspondencia completa fue sellada por orden judicial en 1911 y depositada en los archivos de la Bibliothèque nationale de France, donde permaneció inaccesible durante un siglo. Los historiadores que han podido consultarla confirman que las cartas revelan a dos científicos profundamente comprometidos tanto con su trabajo como con su relación personal.',
  },
  {
    id: 'nobel-quimica-1911',
    title: 'Nobel de Química 1911',
    color: '#7B1FA2',
    btnImage: '/assets/curie/curie_m3.png',
    image: '/assets/curie/curie_m3.png',
    content: [
      'El 10 de diciembre de 1911, Marie Curie recibió su segundo Premio Nobel, esta vez en Química, otorgado «en reconocimiento de sus servicios al avance de la Química por el descubrimiento de los elementos radio y polonio, por el aislamiento del radio y el estudio de la naturaleza y los compuestos de este elemento notable». Con este galardón, Marie se convirtió en la primera persona en la historia en ganar dos Premios Nobel en dos disciplinas científicas diferentes. Hasta 2026, solo Linus Pauling ha logrado algo similar, con el Nobel de Química (1954) y el Nobel de la Paz (1962), pero en campos distintos.',
      'El logro científico que fundamentó el segundo Nobel fue la obtención de radio metálico puro. En 1910, Marie trabajó con André-Louis Debierne para aislar el radio como metal libre, no como compuesto salino. Utilizaron electrólisis del cloruro de radio con un cátodo de mercurio, produciendo una amalgama de radio-mercurio. Al calentar esta amalgama en una atmósfera de hidrógeno puro a 700°C, el mercurio se evaporó y quedó un metal blanco brillante que se oscurecía rápidamente al contacto con el aire. Marie determinó que el peso atómico del radio era 226,45 (el valor aceptado hoy es 226,03), con una precisión notable para los instrumentos de la época.',
      'Marie también estableció el primer estándar internacional de medida de la radioactividad. En 1910, preparó un tubo sellado que contenía exactamente 21,99 miligramos de cloruro de radio puro, que fue depositado en la Oficina Internacional de Pesos y Medidas (BIPM) en Sèvres, cerca de París. Este tubo se convirtió en el patrón de referencia mundial contra el cual se calibraban todos los demás instrumentos de medición radiactiva. La unidad de radioactividad fue bautizada como «curio» (Ci) en honor a los Curie, definida como la actividad de un gramo de radio-226: exactamente 3,7 × 10¹⁰ desintegraciones por segundo.',
      'En su discurso de aceptación del Nobel en Estocolmo, Marie hizo algo que pocos laureados han intentado: separó con precisión quirúrgica sus propias contribuciones de las de Pierre. Explicó que el concepto de radioactividad como propiedad atómica fue su idea original; que la hipótesis de que la pechblenda contenía elementos desconocidos más radiactivos que el uranio fue su deducción; y que el trabajo de aislamiento del radio fue «particularmente mi obra». No se trataba de vanidad sino de exactitud histórica: Marie quería asegurar que la posteridad conociera la verdad sobre quién había hecho qué en la investigación.',
      'El segundo Nobel de Marie tuvo un efecto transformador en la percepción pública de las mujeres en la ciencia. Antes de 1911, el argumento común contra las mujeres científicas era que podían «ayudar» a un científico varón pero no producir trabajo original de primer nivel. El hecho de que Marie hubiera ganado un Nobel sola — sin Pierre, que había fallecido cinco años antes — demolía ese argumento. Las universidades europeas comenzaron a admitir más mujeres en programas de doctorado en ciencias: en la Sorbona, el número de mujeres matriculadas en ciencias se duplicó entre 1911 y 1914, pasando de 87 a 178 estudiantes.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marie Curie viajó a Estocolmo acompañada de su hija Irène (entonces de 14 años) y de su hermana mayor Bronisława (Bronia). Irène asistió a la ceremonia de entrega y al banquete del Nobel, donde se sentó en la mesa de honor junto a los demás laureados. Treinta y cuatro años después, en 1935, Irène Joliot-Curie recibiría su propio Nobel de Química junto con su esposo Frédéric, por el descubrimiento de la radioactividad artificial. Los Curie son la familia con más Premios Nobel de la historia: cinco en total si contamos a Henry Labouisse, esposo de Ève Curie, que recibió el Nobel de la Paz en nombre de UNICEF en 1965.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El proceso de electrólisis que Marie y Debierne utilizaron para aislar radio metálico requería condiciones extremadamente controladas. El cloruro de radio se disolvía en ácido clorhídrico concentrado, y la electrólisis se realizaba con un cátodo de mercurio y un ánodo de platino-iridio. La corriente eléctrica aplicada era de 10 amperios. El radio se depositaba en el mercurio formando una amalgama, que luego se calentaba en un tubo de cuarzo lleno de hidrógeno puro. A 700°C, el mercurio se evaporaba y quedaba un residuo metálico blanco que pesaba apenas unos miligramos: radio puro con un punto de fusión de 700°C.' },
    ],
    fact: 'El estándar internacional de radioactividad que Marie Curie preparó en 1910 — un tubo de vidrio conteniendo 21,99 mg de cloruro de radio puro — todavía existe. Se conserva en la Oficina Internacional de Pesos y Medidas en Sèvres, Francia, dentro de un contenedor blindado de plomo. Fue utilizado como referencia mundial hasta 1975, cuando la Conferencia General de Pesos y Medidas reemplazó el curio por el becquerel (Bq) como unidad oficial de actividad radiactiva en el Sistema Internacional. Un becquerel equivale a una desintegración por segundo, mientras que un curio equivale a 37.000 millones de desintegraciones por segundo.',
  },
  {
    id: 'instituto-radio',
    title: 'El Instituto del Radio',
    color: '#81C784',
    btnImage: '/assets/curie/curie_m3.png',
    image: '/assets/curie/curie_m3.png',
    content: [
      'En 1909, la Universidad de París y el Instituto Pasteur acordaron financiar conjuntamente la construcción del Institut du Radium (Instituto del Radio), un centro de investigación dedicado al estudio de la radioactividad y sus aplicaciones médicas. El edificio se construyó en la Rue Pierre Curie (hoy Rue Pierre et Marie Curie) en el quinto distrito de París, a pocos metros del Panteón. El proyecto constaba de dos pabellones: el Pavillon Curie, dirigido por Marie, dedicado a la investigación en física y química de la radioactividad; y el Pavillon Pasteur, dirigido por el médico Claudius Regaud, enfocado en las aplicaciones biológicas y terapéuticas de la radiación.',
      'La construcción del Instituto se completó en julio de 1914, apenas semanas antes del estallido de la Primera Guerra Mundial. Marie supervisó personalmente cada detalle del diseño de su pabellón: laboratorios con ventilación adecuada para gases radiactivos, pisos de linóleo fáciles de descontaminar, cámaras oscuras para trabajo con materiales fluorescentes, y un jardín interior donde Marie plantó tilos y rosales. El jardín no era un capricho estético: Marie creía que los científicos necesitaban contacto con la naturaleza para mantener la claridad mental. El jardín del Instituto del Radio aún existe y puede visitarse hoy en día.',
      'Marie trasladó al Instituto su reserva personal de radio — aproximadamente un gramo de cloruro de radio puro que había acumulado durante una década de trabajo —, un material que valía entonces más de un millón de francos en el mercado. Este gramo de radio era la fuente de radiación más potente de Francia y una de las más importantes del mundo. Marie lo guardaba en una caja de plomo forrada de madera en su despacho. Cada investigador del Instituto debía solicitar permiso a Marie personalmente para utilizar una porción, y ella llevaba un registro meticuloso de cada miligramo prestado, a quién y para qué experimento.',
      'Bajo la dirección de Marie, el Instituto del Radio se convirtió en el principal centro de investigación sobre radioactividad del mundo. Entre 1919 y 1934, año de la muerte de Marie, el Instituto produjo más de 500 publicaciones científicas. Marie formó allí a 45 investigadores doctorales, de los cuales 12 eran mujeres — una proporción notable para la época. Entre sus estudiantes se encontraban físicos y químicos de 18 países diferentes, incluyendo a Marguerite Perey, quien descubriría el francio (elemento 87) en 1939 trabajando con materiales del laboratorio de Marie.',
      'El legado institucional de Marie continúa hasta hoy. En 1970, el Instituto del Radio se fusionó con la Fondation Curie para formar el Institut Curie, uno de los centros de investigación oncológica más importantes de Europa. El edificio original del Pavillon Curie se conserva como museo (Musée Curie) y es accesible al público de forma gratuita. El despacho de Marie se ha mantenido casi intacto: su escritorio, su balanza analítica, sus cuadernos de laboratorio y algunos de sus instrumentos de medición siguen allí, aunque la silla donde se sentaba y la mesa donde escribía aún emiten niveles de radiación detectables con un contador Geiger.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marie Curie realizó dos viajes a Estados Unidos — en 1921 y 1929 — para recaudar fondos para su Instituto del Radio. En el primero, la periodista Missy Meloney organizó una campaña nacional que recaudó 100.000 dólares (equivalentes a unos 1,7 millones de dólares actuales) para comprar un gramo de radio. El presidente Warren G. Harding le entregó el radio en una ceremonia en la Casa Blanca el 20 de mayo de 1921. Marie también visitó fábricas, universidades y laboratorios, y recibió doctorados honorarios de varias universidades americanas, incluidas Yale y Columbia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Marguerite Perey, asistente de laboratorio de Marie Curie desde 1929, descubrió el francio (elemento 87) en 1939 analizando productos de desintegración del actinio-227 en muestras del Instituto del Radio. Perey identificó una radiación beta con una energía de 1,2 MeV que no correspondía a ningún isótopo conocido. Determinó que provenía de un nuevo elemento alcalino con número atómico 87, al que nombró francio en honor a Francia. Perey se convirtió en la primera mujer elegida miembro de la Académie des Sciences de Francia en 1962, un honor que Marie Curie nunca obtuvo.' },
    ],
    fact: 'Los cuadernos de laboratorio de Marie Curie, almacenados en el Musée Curie de París, siguen siendo radiactivos más de 100 años después de ser escritos. Están contaminados principalmente con radio-226, cuya vida media es de 1.600 años, lo que significa que dentro de 1.600 años aún conservarán la mitad de su radiactividad actual. Los visitantes del museo pueden ver los cuadernos a través de una vitrina de vidrio plomado, pero no pueden tocarlos. Los investigadores que necesitan consultar las páginas deben usar guantes de plomo y dosímetros personales para controlar su exposición a la radiación durante la consulta.',
  },
  {
    id: 'petites-curies',
    title: 'Las Petites Curies',
    color: '#8E24AA',
    btnImage: '/assets/curie/curie_m3.png',
    image: '/assets/curie/curie_m3.png',
    content: [
      'Cuando la Primera Guerra Mundial estalló en agosto de 1914, Marie Curie comprendió de inmediato que los rayos X podían salvar miles de vidas al permitir a los cirujanos de campo localizar balas y metralla en los cuerpos de los soldados heridos. El problema era que los hospitales de campaña cerca del frente no tenían equipos de rayos X: las máquinas existentes eran grandes, frágiles y estaban instaladas en hospitales fijos de las ciudades. Marie concibió una solución práctica: instalar equipos de rayos X portátiles dentro de vehículos que pudieran desplazarse hasta los puestos de socorro cercanos a las trincheras.',
      'Marie equipó 20 vehículos — coches Renault requisados y ambulancias donadas por la Cruz Roja — con aparatos de rayos X, generadores eléctricos alimentados por el motor del vehículo, y cubetas de revelado fotográfico. Estos vehículos fueron bautizados «petites Curies» (pequeñas Curies) por los soldados que los veían llegar a los puestos de socorro. Cada vehículo contenía un tubo de rayos X, un dinamo, cables de alta tensión, pantallas fluorescentes, placas fotográficas y material de protección mínimo. Marie diseñó personalmente la disposición interna para maximizar el espacio y la eficiencia.',
      'Marie aprendió a conducir específicamente para este proyecto — a los 47 años, en plena guerra, sin instructor formal — y obtuvo su permiso de conducir en 1914. También estudió anatomía humana en profundidad para poder interpretar las radiografías ella misma. Cuando llegaba a un puesto de socorro, Marie instalaba el equipo, radiografiaba a los heridos, marcaba la posición exacta de los fragmentos metálicos en sus cuerpos y entregaba las placas a los cirujanos. Se estima que las unidades móviles de Marie y las 200 instalaciones fijas de rayos X que también organizó permitieron radiografiar a más de un millón de soldados durante los cuatro años de la guerra.',
      'Irène Curie, que tenía 17 años cuando comenzó la guerra, se unió a su madre como asistente radióloga en 1916. Irène operaba su propia unidad de rayos X en hospitales de campaña belgas y franceses, mostrando una competencia técnica que sorprendía a los médicos militares. Madre e hija trabajaron a menudo en condiciones peligrosas: bombardeos de artillería, gases tóxicos y la exposición constante a rayos X sin protección adecuada. Marie describió en sus notas que los cristales de las ventanas del vehículo estallaban durante los bombardeos y que a veces tenían que radiografiar a los heridos en sótanos con la metralla cayendo afuera.',
      'Para formar operadores de rayos X, Marie creó un programa de capacitación en el Instituto del Radio que entrenó a 150 mujeres como manipuladoras de equipos radiológicos entre 1916 y 1918. Estas técnicas radiológicas recibían un curso intensivo de seis semanas que incluía física básica de rayos X, anatomía, técnicas de posicionamiento del paciente, revelado de placas y mantenimiento del equipo. Marie escribió un manual titulado «La Radiologie et la Guerre» (La Radiología y la Guerra), publicado en 1921, que documentaba sus métodos y se convirtió en texto de referencia para la radiología militar durante dos décadas posteriores.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marie Curie nunca recibió reconocimiento oficial del gobierno francés por su servicio durante la Primera Guerra Mundial. No fue condecorada con la Legión de Honor ni con ninguna medalla militar. Cuando se le ofreció la Legión de Honor en 1910 (antes de la guerra), la rechazó diciendo que no necesitaba decoraciones. El gobierno francés tampoco reconoció formalmente la contribución de las 150 mujeres que Marie entrenó como técnicas radiológicas. Solo en 1995, cuando sus restos fueron trasladados al Panteón de París, Francia reconoció oficialmente su contribución a la defensa nacional.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los equipos de rayos X de las «petites Curies» utilizaban tubos Coolidge de tungsteno, que producían rayos X al acelerar electrones contra un ánodo metálico. La tensión eléctrica necesaria era de 100.000 voltios, generados por un transformador de alta tensión alimentado por un dinamo conectado al motor del vehículo. Cada radiografía requería una exposición de entre 30 segundos y 5 minutos, dependiendo de la parte del cuerpo. Marie y sus técnicas trabajaban sin delantales de plomo ni pantallas protectoras: los efectos acumulativos de esta exposición contribuyeron al deterioro progresivo de la salud de Marie.' },
    ],
    fact: 'El manual de Marie Curie «La Radiologie et la Guerre», publicado por Félix Alcan en París en 1921, tiene 180 páginas e incluye 32 fotografías de radiografías tomadas en los hospitales de campaña. En él, Marie describe en detalle técnico cómo localizar fragmentos de obús en el tórax, el abdomen y las extremidades. También incluye un capítulo sobre protección radiológica — paradójico, dado que Marie nunca usó protección para sí misma. El libro fue traducido al inglés y adoptado como manual de instrucción por el Servicio de Sanidad Militar de Estados Unidos, el Royal Army Medical Corps británico y los servicios médicos militares de nueve países más.',
  },
  {
    id: 'legado-cientifico',
    title: 'Legado Científico',
    color: '#388E3C',
    btnImage: '/assets/curie/curie_m3.png',
    image: '/assets/curie/curie_m3.png',
    content: [
      'Marie Curie murió el 4 de julio de 1934 en el sanatorio de Sancellemoz, en Passy, Alta Saboya, a los 66 años. La causa oficial de muerte fue anemia aplásica, una enfermedad de la médula ósea causada por la exposición prolongada a radiación ionizante. Durante los últimos años de su vida, Marie sufría de cataratas (que requirieron cuatro operaciones), lesiones crónicas en las manos, fatiga persistente y fiebre intermitente. Su recuento de glóbulos blancos y rojos era peligrosamente bajo. Los médicos de la época no asociaron estos síntomas con la radiación, pero hoy se sabe que fueron consecuencia directa de décadas de exposición sin protección al radio-226 y al polonio-210.',
      'El concepto de «curieterapia» (hoy llamado braquiterapia) fue una de las contribuciones médicas más directas de Marie Curie. En 1903, Pierre y Marie prestaron tubos de radio a médicos del Hospital Saint-Louis de París, que descubrieron que la radiación del radio destruía células cancerosas más rápidamente que las células sanas. Henri-Alexandre Danlos realizó los primeros tratamientos de cáncer de piel con radio en 1901, pero fue Marie quien proporcionó el material y estandarizó las dosis. Para 1920, la curieterapia se había convertido en un tratamiento estándar contra el cáncer de cuello uterino, alcanzando tasas de supervivencia del 25% en casos que antes eran terminales.',
      'El elemento 96 de la tabla periódica, el curio (Cm), fue nombrado en honor a Marie y Pierre Curie. Fue sintetizado por primera vez en julio de 1944 por Glenn Seaborg, Ralph James y Albert Ghiorso en la Universidad de California en Berkeley, bombardeando plutonio-239 con partículas alfa (núcleos de helio) en un ciclotrón de 60 pulgadas. El isótopo producido fue curio-242, con una vida media de 162,8 días. Seaborg mantuvo el descubrimiento en secreto durante la Segunda Guerra Mundial y no lo publicó hasta 1947. El curio se utiliza hoy como fuente de partículas alfa en espectrómetros de análisis de suelos en misiones espaciales a Marte.',
      'La familia Curie acumuló un total de cinco Premios Nobel. Marie recibió el de Física en 1903 (compartido con Pierre y Becquerel) y el de Química en 1911. Su hija Irène Joliot-Curie y su yerno Frédéric Joliot recibieron el Nobel de Química en 1935 por descubrir la radioactividad artificial: demostraron que al bombardear aluminio con partículas alfa se producía fósforo-30, un isótopo radiactivo que no existe en la naturaleza. Henry Richardson Labouisse, esposo de Ève Curie (la hija menor de Marie), recibió el Nobel de la Paz en 1965 como director de UNICEF. Ninguna otra familia en la historia ha igualado este récord.',
      'En 1995, los restos de Marie Curie fueron trasladados al Panteón de París, convirtiéndose en la primera mujer en ser enterrada allí por sus propios méritos. El presidente François Mitterrand presidió la ceremonia el 20 de abril de 1995. Sus restos fueron exhumados del cementerio de Sceaux y colocados en un ataúd de plomo forrado de madera de roble, debido a la contaminación radiactiva de su cuerpo. Pierre fue trasladado junto a ella. El Panteón alberga a los «grandes hombres» de Francia (según la inscripción de su fachada), pero Marie Curie demostró que la grandeza no tiene género. Su tumba recibe miles de visitantes cada año, muchos de ellos jóvenes estudiantes de ciencias que depositan flores y notas de agradecimiento.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los rovers marcianos Spirit y Opportunity (NASA, 2004) y Curiosity (2012) llevan espectrómetros de partículas alfa alimentados por curio-244, el elemento nombrado en honor a Marie Curie. Estos instrumentos, llamados APXS (Alpha Particle X-ray Spectrometer), utilizan la radiación alfa emitida por el curio para analizar la composición química de las rocas marcianas. Es una ironía poética que el legado de Marie Curie esté literalmente explorando otro planeta: cada vez que Curiosity analiza una roca en Marte, está utilizando la radioactividad que Marie dedicó su vida a comprender.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La braquiterapia (curieterapia) moderna utiliza fuentes de iridio-192, cesio-137 o cobalto-60 en lugar del radio-226 original que Marie proporcionaba. El principio sigue siendo el mismo que Marie y Pierre descubrieron: colocar una fuente radiactiva directamente junto al tumor para destruir las células cancerosas con mínimo daño al tejido sano. La diferencia es que hoy las fuentes se colocan con guía por imagen (TAC o resonancia magnética) y robots de carga diferida (afterloading), eliminando la exposición del personal médico. En 2024, más de 500.000 pacientes al año reciben braquiterapia en todo el mundo.' },
    ],
    fact: 'Cuando los restos de Marie Curie fueron exhumados en 1995 para su traslado al Panteón, un equipo de la OPRI (Oficina de Protección contra Radiaciones Ionizantes) analizó su cuerpo con espectrometría gamma. Descubrieron que la contaminación radiactiva de sus restos era significativamente menor de lo esperado: la mayor parte del radio-226 y el polonio-210 se habían desintegrado o migrado al suelo durante los 61 años de entierro. Sin embargo, el ataúd original de madera y el suelo circundante presentaban niveles elevados de contaminación. El nuevo ataúd de plomo tiene un espesor de 2,5 milímetros, suficiente para absorber la radiación residual y proteger a los visitantes del Panteón.',
  },
];

// ─── Radioactive Particle Field (Canvas Background) ─────────────────────────
function RadiumField() {
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
      hue: Math.random() > 0.5 ? '76,175,80' : '106,27,154', // green or violet
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

// ─── Curie Header ────────────────────────────────────────────────────────────
function CurieHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(76,175,80,0.3))' }}>
        {/* Arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#curieGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4CAF50','#6A1B9A','#66BB6A','#7B1FA2','#81C784','#8E24AA','#388E3C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central atom icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#4CAF50" opacity="0.5" />
        <ellipse cx="300" cy="30" rx="10" ry="4" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.4" />
        <ellipse cx="300" cy="30" rx="10" ry="4" fill="none" stroke="#4CAF50" strokeWidth="0.8" opacity="0.4" transform="rotate(60 300 30)" />
        <defs>
          <linearGradient id="curieGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(106,27,154,0.9)" />
            <stop offset="100%" stopColor="rgba(76,175,80,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">DOS PREMIOS NOBEL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">MARIE CURIE · MÓDULO 3</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(76,175,80,0.2)'}`,
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
          layoutId="activeDotCurieM3"
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

        {/* Video Player */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
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
      border: '1px solid rgba(76,175,80,0.15)',
    }}>
      <Star size={14} style={{ color: '#4CAF50', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4CAF50, #6A1B9A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(76,175,80,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#4CAF50', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_CurieM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/curie/curie_m3.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(76,175,80,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <RadiumField />

      <CurieHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(76,175,80,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(76,175,80,0.08)', borderRadius: '16px',
              border: '1px solid rgba(76,175,80,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#4CAF50', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado la vida y los dos Premios Nobel de Marie Curie!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Doble Nobel
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
