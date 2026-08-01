'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Maya Venus / War themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoVenusStar({ size = 70, color = '#E0E0E0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 2 L34 22 L54 26 L36 34 L40 54 L30 40 L20 54 L24 34 L6 26 L26 22 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.6" />
      <path d="M10 10 L20 20 M50 10 L40 20 M10 50 L20 40 M50 50 L40 40" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoWarShield({ size = 70, color = '#B71C1C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Spears crossed */}
      <line x1="10" y1="10" x2="50" y2="50" stroke={color} strokeWidth="2" opacity="0.7" />
      <line x1="50" y1="10" x2="10" y2="50" stroke={color} strokeWidth="2" opacity="0.7" />
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.5" />
      {/* Feathers */}
      <path d="M5 30 Q0 40 10 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M55 30 Q60 40 50 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoFeatheredSerpent({ size = 80, color = '#1B5E20', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <path d="M5 20 Q20 5 40 20 T75 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 22 Q25 7 40 22 T70 22" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Feathers along the body */}
      {[15, 30, 45, 60].map((x, i) => (
        <path key={i} d={`M${x} ${20 + (i%2 === 0 ? -5 : 5)} L${x-5} ${10 + (i%2 === 0 ? -5 : 5)}`} stroke={color} strokeWidth="1" opacity="0.6" />
      ))}
      <circle cx="75" cy="18" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoDresdenPage({ size = 60, color = '#FFD600', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="15" y="5" width="30" height="50" fill="none" stroke={color} strokeWidth="2" />
      <line x1="20" y1="15" x2="40" y2="15" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="25" x2="35" y2="25" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="35" x2="40" y2="35" stroke={color} strokeWidth="1.5" />
      {/* Maya dot/bar numbers */}
      <circle cx="22" cy="45" r="2" fill={color} />
      <circle cx="28" cy="45" r="2" fill={color} />
      <line x1="20" y1="50" x2="30" y2="50" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoHorizonMarker({ size = 70, color = '#F48FB1', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      <path d="M10 50 L30 20 L50 50 Z" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 50 L30 35 L40 50 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="12" r="4" fill={color} opacity="0.8" />
      {/* Rays */}
      <line x1="30" y1="4" x2="30" y2="0" stroke={color} strokeWidth="1" />
      <line x1="22" y1="8" x2="18" y2="4" stroke={color} strokeWidth="1" />
      <line x1="38" y1="8" x2="42" y2="4" stroke={color} strokeWidth="1" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'noh-ek': [DecoVenusStar, DecoHorizonMarker, DecoDresdenPage],'ciclo-sinodico': [DecoDresdenPage, DecoVenusStar, DecoFeatheredSerpent],'tabla-dresde': [DecoDresdenPage, DecoVenusStar, DecoHorizonMarker],'guerra-estelar': [DecoWarShield, DecoVenusStar, DecoFeatheredSerpent],'kukulkan-venus': [DecoFeatheredSerpent, DecoVenusStar, DecoWarShield],'observacion-tecnicas': [DecoHorizonMarker, DecoVenusStar, DecoDresdenPage],'legado-venusino': [DecoVenusStar, DecoDresdenPage, DecoFeatheredSerpent], }; const BIBLIOGRAPHY = ['Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
  'Milbrath, S. (1999). Star Gods of the Maya, University of Texas Press',
  'Schele, L. & Freidel, D. (1990). A Forest of Kings: The Untold Story of the Ancient Maya, William Morrow',
  'Martin, S. & Grube, N. (2000). Chronicle of the Maya Kings and Queens, Thames & Hudson',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'noh-ek',
    title: 'Noh Ek: La Gran Estrella',
    color: '#E0E0E0',
    btnImage: '/assets/maya/infographic_m7/btn_noh-ek.jpg',
    image: '/assets/maya/infographic_m7/hero_noh-ek.jpg',
    content: [
      'Imagina que miras el cielo nocturno y ves un punto brillante. Para los astrónomos mayas, este punto era "Noh Ek", que significa "La Gran Estrella". Hoy lo llamamos el planeta Venus. A diferencia de las estrellas que tintinean, Venus brilla con una luz constante. Es el tercer objeto más brillante del cielo, superado por el Sol y la Luna. Para la civilización maya, su brillo era una advertencia de poder cósmico.',
      'Noh Ek tenía una identidad doble, como si tuviera una identidad secreta que cambia según el día. A veces aparecía antes del amanecer, anunciando la llegada del Sol. En esta forma matutina, lo llamaban "Ah Chicum Ek", la estrella de la mañana. Otras veces, desaparecía por semanas y regresaba al anochecer. Hoy sabemos que es el mismo planeta orbitando alrededor del Sol. Los mayas entendieron esta dualidad como una transformación sagrada.',
      'Imagina que Venus es un atleta veloz en una pista circular interior y la Tierra corre en la pista exterior. Como la pista interior es más corta y Venus corre más rápido, a veces nos alcanza y rebasa. Cuando Venus está de un lado del Sol, lo vemos al amanecer; cuando está del otro, lo vemos al atardecer. Los astrónomos mayas registraron estos movimientos utilizando sus ojos y paciencia. Su exactitud asombra a los científicos modernos.',
      'En la cultura maya, la aparición de Noh Ek como estrella de la mañana era un momento de peligro. Creían que sus primeros rayos de luz eran como lanzas o flechas cósmicas que golpeaban la Tierra. Estos "rayos-flecha" eran considerados peligrosos. Se creía que podían dañar las cosechas, enfermar a los gobernantes y decidir el destino de las batallas. Por esta razón, los sacerdotes y reyes vigilaban el cielo con atención.',
      'La fascinación maya por Noh Ek era un pilar fundamental de su civilización. La posición de la Gran Estrella dictaba cuándo realizar rituales, coronar a un nuevo rey o iniciar conflictos militares. Venus era el reloj celestial que marcaba el ritmo de la política y el poder maya. Al dominar el conocimiento de sus movimientos, los gobernantes demostraban que tenían el favor de los dioses.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El brillo de Venus es intenso porque está cubierto de nubes de ácido sulfúrico reflectantes. Estas nubes funcionan como un espejo gigante que refleja el 70% de la luz solar. Para los mayas, este brillo era evidencia de la presencia divina y el poder de la estrella matutina.' },
      { label: 'El Gemelo Divino', icon: 'clock', text: 'En el Popol Vuh, el libro sagrado de los mayas, la historia de los Héroes Gemelos, Hunahpú e Ixbalanqué, está relacionada con el ciclo de Venus y el Sol. Cuando derrotan a los señores del inframundo de Xibalbá, ascienden al firmamento para convertirse en el Sol y la estrella de Venus.' },
    ],
    fact: 'Sin contar con telescopios ni instrumentos modernos, los astrónomos mayas calcularon el ciclo de Venus en 584 días. ¡La cifra astronómica científica es de 583.92 días! Esta diferencia es de apenas unas horas. Su cálculo tenía un error de menos de una décima de porcentaje. Lo lograron observando el cielo desde sus pirámides durante generaciones.',
  },
  {
    id: 'ciclo-sinodico',
    title: 'Ciclo Sinódico: La Danza Cósmica',
    color: '#FFD600',
    btnImage: '/assets/maya/infographic_m7/btn_ciclo-sinodico.jpg',
    image: '/assets/maya/infographic_m7/hero_ciclo-sinodico.jpg',
    content: [
      'Imagina que dos corredores dan vueltas alrededor de un estadio, uno en la pista interior y otro en la exterior. El tiempo que tardan en volver a encontrarse alineados en la línea de salida es el "ciclo sinódico". Para Venus y la Tierra, esta carrera dura 584 días. Los observadores mayas estudiaron cada fase de esta competencia cósmica durante años, registrando cada detalle.',
      'Los antiguos mayas dividieron este ciclo de 584 días en cuatro etapas visuales. Primero, la estrella de la mañana brillaba durante 236 días. Luego desaparecía en el resplandor del Sol durante 90 días, lo que asociaban con un viaje por el inframundo. Después reaparecía como la estrella del atardecer durante 250 días. Finalmente, desaparecía de nuevo durante 8 días, antes de renacer al amanecer.',
      'El secreto matemático de los astrónomos mayas radicaba en la "conmensurabilidad". Imagina tratar de sincronizar dos engranajes giratorios de diferente tamaño. Descubrieron que si tomas cinco ciclos completos de Venus (5 x 584 días), obtienes 2,920 días. Y si tomas ocho años solares (8 x 365 días), ¡también obtienes 2,920 días! Esta sincronización matemática era considerada un mensaje sagrado de los dioses.',
      'Esta equivalencia donde 5 ciclos venusinos son idénticos a 8 ciclos solares significaba que cada ocho años Venus volvía a aparecer en la misma posición en el firmamento. También coincidía con el mismo día del calendario solar Haab. Para los gobernantes mayas, este aniversario era un momento ceremonial poderoso. Celebraban festivales para asegurar que el mecanismo del universo continuara funcionando.',
      'El conocimiento de la sincronización cósmica no era solo una curiosidad matemática. Los mayas utilizaban estos ciclos para planificar eventos fundamentales en sus vidas. Si un rey deseaba asegurar su victoria en una guerra, o si los sacerdotes necesitaban garantizar que sus ceremonias tuvieran éxito, recurrían a la danza matemática de Venus y la Tierra. La matemática celestial era el lenguaje divino que regía el destino.',
    ],
    expandables: [
      { label: 'El Gran Ciclo', icon: 'atom', text: 'Además de sincronizar Venus con el Sol, los mayas conectaron estos 2,920 días con su calendario adivinatorio de 260 días, el Tzolkín. Descubrieron que 65 ciclos del Tzolkín (65 x 260) son 16,900 días. Esto equivale a 65 años rituales y sincroniza de nuevo el Sol, Venus y el calendario espiritual, demostrando la complejidad de su sistema.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante el periodo de desaparición de 8 días de Venus, conocido como la conjunción inferior (cuando pasa entre la Tierra y el Sol), los mayas consideraban que el planeta estaba muerto. Creían que sufría transformaciones en el inframundo. Pensaban que en la oscuridad la deidad se despojaba de su piel para resurgir.' },
    ],
    fact: 'El conocimiento del ciclo de Venus de 584 días era información astronómica de alta seguridad en el mundo maya. Las tablas venusinas no eran accesibles para el ciudadano común. Solo un grupo de sacerdotes matemáticos y el rey (ajaw) tenían el privilegio de aprender, resguardar y utilizar este secreto celestial para dominar el tiempo.',
  },
  {
    id: 'tabla-dresde',
    title: 'Las Tablas de Venus: El Códice de Dresde',
    color: '#0288D1',
    btnImage: '/assets/maya/infographic_m7/btn_tabla-dresde.jpg',
    image: '/assets/maya/infographic_m7/hero_tabla-dresde.jpg',
    content: [
      'Imagina un libro plegable elaborado con corteza de árbol de amate, pintado con jeroglíficos y números. Este es el Códice de Dresde, uno de los pocos libros mayas que sobrevivieron a la quema de documentos durante la colonización española. En sus páginas 24 y de la 46 a la 50, el manuscrito contiene las famosas "Tablas de Venus". Esta es una obra maestra del cálculo humano.',
      'Estas páginas no son simples decoraciones; funcionan como una hoja de cálculo astronómica. En sus filas y columnas de números, representados con barras (valor 5) y puntos (valor 1), los sabios mayas proyectaron los movimientos futuros de Noh Ek. Estas tablas predicen la posición de Venus a lo largo de un periodo de 104 años. ¡Un total de más de 37,960 días anotados!',
      'El verdadero ciclo astronómico de Venus no es un número entero, sino que dura 583.92 días. Aunque los mayas utilizaban el número de 584 días para simplificar sus cálculos, sabían que el sobrante de 0.08 días se iría acumulando. Entendían que esto terminaría arruinando sus predicciones si no lo solucionaban.',
      'Como programadores modernos reparando un error en el código, los sabios introdujeron ajustes ocultos en el Códice de Dresde. Similar a cómo agregamos años bisiestos en nuestro calendario para mantenerlo sincronizado con las estaciones, las tablas mayas ordenaban restar ciertos días cada cierto periodo de años. Así mantenían la precisión sin errores perceptibles.',
      'Junto con los números calendáricos, hay pinturas de una deidad de Venus armada con lanzas, hiriendo a víctimas terrenales. Estas víctimas representan momentos críticos de la temporada del calendario agrícola. El Códice no era solo una tabla astronómica, sino un manual de supervivencia que indicaba cuándo proteger el mundo.',
    ],
    expandables: [
      { label: 'El Descubrimiento', icon: 'atom', text: 'El Códice de Dresde adquirió su nombre porque terminó en la biblioteca real de la ciudad de Dresde, en Alemania. El erudito alemán Ernst Förstemann, quien trabajaba como bibliotecario a fines de los años 1800s, logró descifrar la sección matemática dedicada a Venus.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las predicciones astronómicas en el Códice de Dresde son tan exactas que, si las usáramos hoy, su porcentaje de exactitud para determinar cuándo reaparecerá Venus superaría el 99%. ¡Y esto con tecnología de hace mil años!' },
    ],
    fact: 'El manuscrito original del Códice de Dresde sufrió graves daños por los bombardeos aéreos sobre Dresde durante la Segunda Guerra Mundial en 1945. Afortunadamente, unas copias fotográficas de calidad habían sido elaboradas décadas antes, salvando el saber.',
  },
  {
    id: 'guerra-estelar',
    title: 'Guerra Estelar: Batallas Celestiales',
    color: '#B71C1C',
    btnImage: '/assets/maya/infographic_m7/btn_guerra-estelar.jpg',
    image: '/assets/maya/infographic_m7/hero_guerra-estelar.jpg',
    content: [
      'Olvídate de las naves espaciales disparando rayos láser. En el mundo maya, la "Guerra Estelar" era un conflicto real y violento en las selvas de Centroamérica. Los epigrafistas descubrieron un jeroglífico que muestra una estrella derramando gotas de líquido sobre el emblema de una ciudad enemiga.',
      'Este jeroglífico se traduce como "Guerra de la Estrella". Describe el tipo de batalla más destructiva que los reyes mayas desataban contra sus rivales. Durante estos enfrentamientos, el objetivo no era solo dominar, sino destruir, saquear los templos y capturar al rey de la ciudad enemiga.',
      'Estos eventos militares no ocurrían en cualquier día. Las Guerras Estelares estaban cronometradas con las fases visibles de Noh Ek. Se programaban en los días cuando el planeta Venus reaparecía por primera vez en el cielo de la madrugada o cuando alcanzaba posiciones clave.',
      'El conflicto que transcurrió durante décadas entre Tikal y Calakmul es un ejemplo de la guerra venusina. En varias ocasiones, los ejércitos marchaban al combate en los días en que la estrella de Venus adoptaba su forma de guerrero resplandeciente.',
      'Imagina la ventaja psicológica. Si fueras un guerrero defendiendo tu ciudad, y ves aproximarse al rey rival vistiendo su traje de batalla decorado con escudos estelares. Esto sucede al mismo tiempo que la estrella Noh Ek destella en el cielo. Creerías que los dioses ya los habían condenado.',
    ],
    expandables: [
      { label: 'Simbolismo Militar', icon: 'clock', text: 'Los reyes y guerreros mayas solían vestir trajes conocidos como la indumentaria del dios Tláloc-Venus. Esta incluía grandes anteojeras circulares, tocados de plumas que emulaban rayos y escudos rectangulares decorados con símbolos del planeta luminoso.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Una de las Guerras Estelares más decisivas de Mesoamérica ocurrió en el año 562 d.C. El señor de la ciudad de Calakmul logró derrotar a la metrópoli de Tikal coincidiendo deliberadamente con una fecha del ciclo venusino.' },
    ],
    fact: 'No todas las batallas entre los mayas eran Guerras Estelares. El glifo de la estrella derramando elementos es raro y específico. Se utiliza para registrar la derrota y captura del gobernante (ajaw) de la ciudad enemiga, denotando el colapso de su dinastía.',
  },
  {
    id: 'kukulkan-venus',
    title: 'Kukulcán: La Serpiente y Venus',
    color: '#1B5E20',
    btnImage: '/assets/maya/infographic_m7/btn_kukulkan-venus.jpg',
    image: '/assets/maya/infographic_m7/hero_kukulkan-venus.jpg',
    content: [
      'Kukulcán, conocido por los aztecas como Quetzalcóatl, era una deidad maya conectada al planeta Venus. Su nombre se traduce como "Serpiente Emplumada". Esta criatura mítica representa una fusión de la tierra (la serpiente que se arrastra) con el cielo (las plumas del quetzal que vuela).',
      'La historia de la Serpiente Emplumada es una alegoría diseñada para explicar el ciclo astronómico de Venus al pueblo. Según los mitos de Mesoamérica, este dios fue engañado, se inmoló en un fuego y su corazón ascendió a los cielos para convertirse en la Estrella de la Mañana.',
      'La ausencia de la estrella Noh Ek del cielo no era vista a la ligera. Los sacerdotes explicaban que durante el período en que Venus desaparecía, Kukulcán realizaba un viaje por las regiones de Xibalbá (el inframundo maya). Allí peleaba contra los Señores de la Enfermedad y la Muerte antes de renacer.',
      'Un ejemplo de esta conexión celestial se encuentra en la plaza central de Chichén Itzá. Allí, el Templo de Kukulcán, conocido como "El Castillo", está diseñado como un calendario de roca en alineación perfecta. Es el santuario de la deidad venusina.',
      'El legado de la Serpiente Emplumada demuestra cómo los sabios mayas lograban unir sus matemáticas celestiales con su espiritualidad. Al adorar a Kukulcán en los ritos religiosos, el pueblo celebraba el baile cíclico de las esferas de nuestro universo.',
    ],
    expandables: [
      { label: 'El Descenso', icon: 'atom', text: 'Cada año, durante los equinoccios de primavera y otoño, miles de espectadores se reúnen alrededor del templo de "El Castillo". Esperan presenciar cómo unas sombras triangulares bajan por las escaleras simulando el movimiento serpenteante del dios.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Un monumento vinculado es la plataforma de El Caracol en Chichén Itzá. Su diseño asimétrico contiene ventanas que se alinean con los extremos en el horizonte de la salida y la puesta de Venus en las fechas observadas.' },
    ],
    fact: 'El arquetipo de la deidad Quetzalcóatl o Kukulcán conectada con la estrella de Venus es más antiguo que la civilización maya. Se ha descubierto en ruinas que este mito astronómico se rastrea hasta las culturas tempranas olmecas.',
  },
  {
    id: 'observacion-tecnicas',
    title: 'Técnicas Sin Telescopios',
    color: '#F48FB1',
    btnImage: '/assets/maya/infographic_m7/btn_observacion-tecnicas.jpg',
    image: '/assets/maya/infographic_m7/hero_observacion-tecnicas.jpg',
    content: [
      '¿Alguna vez te has preguntado cómo los astrónomos mayas calcularon con precisión los movimientos del firmamento sin lentes de vidrio? A diferencia de Galileo Galilei, los sacerdotes mayas no poseían telescopios, astrolabios ni sextantes. Su equipo eran los ojos y la paciencia.',
      'Su primer método era observar el horizonte a simple vista. Imagina ser un astrónomo maya que se para todos los días en una plataforma de piedra para mirar hacia la lejanía. El terreno boscoso, junto con colinas y pirámides, funcionaba como una regla natural del horizonte.',
      'Para perfeccionar su visión, los constructores elaboraron sistemas formados por pares de edificios. Al pararse en un templo elevado y mirar por encima o a través del resquicio de un segundo templo lejano, creaban una línea recta de visión cruzada. Esto era similar a una mira telescópica moderna.',
      'El conjunto arquitectónico "Grupo E", ubicado en Uaxactún, Guatemala, fue el observatorio temprano más célebre de la zona maya. Esta maravilla cuenta con una pirámide escalonada que funciona como un mirador. Está enfrente de otros tres edificios alineados que señalan las puestas anuales del sol.',
      'Para los mayas dedicados a la ciencia, el secreto no era tener máquinas costosas, sino mantener un registro estricto. A lo largo de siglos, cientos de astrónomos escribieron páginas con las fechas de los avistamientos estelares. Transmitieron estos códices astronómicos a las nuevas generaciones sin permitir que se perdieran.',
    ],
    expandables: [
      { label: 'Herramientas Simples', icon: 'clock', text: 'Los arqueólogos postulan que los antiguos astrónomos utilizaban herramientas portátiles sencillas. Empleaban pares cruzados formados por varas rectas de madera o hilos tensos anudados que estaban cruzados para ayudar en la observación del cielo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los observatorios de la civilización maya no poseían las cúpulas hemisféricas abiertas que vemos hoy en los observatorios del mundo moderno. Usualmente, tenían techumbres planas o cámaras angostas en torres.' },
    ],
    fact: 'El conocimiento del registro celeste requería el paso del tiempo histórico para eliminar los errores acumulativos. Se ha propuesto que tomó no menos de 300 o hasta 400 años continuos de paciencia observacional en los primeros asentamientos preclásicos para ajustar la conmensurabilidad.',
  },
  {
    id: 'legado-venusino',
    title: 'El Legado: Maya vs. Europa',
    color: '#0288D1',
    btnImage: '/assets/maya/infographic_m7/btn_legado-venusino.jpg',
    image: '/assets/maya/infographic_m7/hero_legado-venusino.jpg',
    content: [
      'Cuando comparamos los descubrimientos de la civilización maya con el mundo antiguo, el legado astronómico sobre Venus destaca. Los astrónomos matemáticos de los bosques de México y Centroamérica no tenían nada que envidiarle a las mentes griegas o romanas.',
      'Mucho antes de que Nicolás Copérnico propusiera su sistema heliocéntrico o que Johannes Kepler formulara las leyes físicas, los mayas ya habían registrado los patrones de Noh Ek. Estos astrónomos documentaron a mano los movimientos cíclicos del planeta con una exactitud asombrosa.',
      'Los antiguos sacerdotes de las ciudades precolombinas conocían los movimientos planetarios a la perfección. Las proyecciones inscritas en el Códice de Dresde llegaban a predecir matemáticamente los futuros movimientos cíclicos por varios milenios.',
      'A pesar de la destrucción de los registros y códices durante la conquista en Centroamérica, este cuerpo numérico mesoamericano sobrevivió en fragmentos. Estos documentos son de gran valor para el asombro y estudio de los científicos.',
      'Hoy, gracias a la labor de arqueólogos, lingüistas y especialistas mayistas, entendemos el talento científico y matemático de los mayas. Admiramos su legado y el rastro de la gran Noh Ek.',
    ],
    expandables: [
      { label: 'Más Exactos', icon: 'atom', text: 'Se considera por diversos científicos que, antes del año 1500 d.C. Los matemáticos mesoamericanos poseían el calendario más preciso del mundo. Llegaron a superar la exactitud y rigor observacional del calendario juliano utilizado en Europa.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El conocimiento astronómico mesoamericano ha sido validado en la actualidad usando ordenadores computacionales. Esto ha demostrado que sus observaciones desde plataformas de piedra fueron en su mayoría correctas desde el punto de vista astronómico y numérico.' },
    ],
    fact: 'El calendario maya de la cuenta larga (famoso por el malentendido sobre el 2012) está estructurado desde su base con los múltiplos matemáticos originados de la estrella Noh Ek. Este diseño es preciso y muestra un gran rigor matemático.',
  },
];

// â”€â”€â”€ Temporal Particle Field (Canvas Background) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function TemporalField() {
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
      hue: Math.random() > 0.5 ? '224,224,224' : '255,214,0', // Venus white or gold
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

// â”€â”€â”€ Header Banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MayaVenusHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(224,224,224,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#E0E0E0','#FFD600','#0288D1','#B71C1C','#1B5E20','#F48FB1','#0288D1'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#E0E0E0" opacity="0.5" />
        <line x1="300" y1="30" x2="300" y2="20" stroke="#E0E0E0" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <line x1="300" y1="30" x2="308" y2="27" stroke="#E0E0E0" strokeWidth="1" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(224,224,224,0.2)" />
            <stop offset="50%" stopColor="rgba(255,214,0,0.9)" />
            <stop offset="100%" stopColor="rgba(224,224,224,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E0E0E0" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">VENUS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(224,224,224,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">EL PLANETA GUERRERO</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(224,224,224,0.2)'}`,
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
          layoutId="activeDotMayaM7"
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

// â”€â”€â”€ Magazine-Style Content Panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

      {/* â”€â”€â”€ Two-Column Hero Section â”€â”€â”€ */}
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

      {/* â”€â”€â”€ Magazine Body â”€â”€â”€ */}
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
                  {i === 0 ? 'â—†' : 'â—‡'}
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

        {/* â”€â”€â”€ Expandable Interactive Sections â”€â”€â”€ */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '2rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{ color: node.color, fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={16} /> Para Exploradores Avanzados
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fact Highlight â”€â”€â”€ */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: `linear-gradient(45deg, ${node.color}15, transparent)`,
            border: `1px solid ${node.color}40`,
            borderRadius: '16px',
            position: 'relative',
            zIndex: 2,
            display: 'flex', gap: '1.5rem', alignItems: 'flex-start',
          }}
        >
          <div style={{
            background: `${node.color}25`,
            padding: '1rem', borderRadius: '50%',
            color: node.color,
            boxShadow: `0 0 15px ${node.color}30`,
          }}>
            <Zap size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1.1rem', letterSpacing: '0.5px' }}>
              Dato Sorprendente
            </h4>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}>
              {node.fact}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Progress Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const progress = (exploredIds.length / nodes.length) * 100;

  return (
    <div style={{
      margin: '2rem auto 0', maxWidth: '800px',
      background: 'rgba(0,0,0,0.5)', padding: '1rem 2rem',
      borderRadius: '20px', border: '1px solid rgba(224,224,224,0.1)',
      position: 'relative', zIndex: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#888' }}>
        <span>Progreso del Explorador Astronómico</span>
        <span>{exploredIds.length} / {nodes.length} Nodos</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, background:'linear-gradient(90deg, #E0E0E0, #FFD600, #B71C1C)',
            boxShadow: '0 0 10px rgba(255,214,0,0.5)',
          }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem' }}>
        {nodes.map((n) => {
          const isExplored = exploredIds.includes(n.id);
          return (
            <button
              key={n.id}
              onClick={() => onSelect(n.id)}
              title={n.title}
              style={{
                width: '24px', height: '24px', borderRadius: '50%', background: isExplored ? n.color :'rgba(255,255,255,0.1)',
                border: `2px solid ${isExplored ? '#fff' : 'transparent'}`,
                cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: isExplored ? `0 0 8px ${n.color}` : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// â”€â”€â”€ Main Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_MayaM7() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (id) => {
    setActiveNodeId(id === activeNodeId ? null : id);
    if (!exploredIds.includes(id)) {
      setExploredIds((prev) => [...prev, id]);
    }
  };

  const activeNode = INFOGRAPHIC_NODES.find((n) => n.id === activeNodeId);

  return (
    <div style={{
      width: '100%',
      minHeight: '800px',
      background: 'radial-gradient(ellipse at top, #11152c 0%, #05060f 100%)',
      padding: '2rem 1rem',
      borderRadius: '24px',
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <TemporalField />

      <MayaVenusHeader />

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1.5rem',
        marginTop: '2rem',
        position: 'relative',
        zIndex: 2,
      }}>
        {INFOGRAPHIC_NODES.map((node, i) => (
          <NodeButton
            key={node.id}
            node={node}
            index={i}
            isActive={activeNodeId === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeNode && (
          <ContentPanel
            key={activeNode.id}
            node={activeNode}
            onClose={() => setActiveNodeId(null)}
            setLightboxSrc={setLightboxSrc}
          />
        )}
      </AnimatePresence>

      <ProgressBar nodes={INFOGRAPHIC_NODES} exploredIds={exploredIds} onSelect={handleNodeClick} />

      {/* â”€â”€â”€ Bibliography â”€â”€â”€ */}
      <div style={{
        marginTop: '4rem', padding: '2rem',
        background: 'rgba(0,0,0,0.4)', borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative', zIndex: 2,
      }}>
        <h5 style={{ color: '#888', margin: '0 0 1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Fuentes y Bibliografía
        </h5>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '0.8rem', fontSize: '0.85rem', color: '#999' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <ChevronRight size={14} style={{ color: '#E0E0E0', flexShrink: 0, marginTop: '3px' }} />
              <span style={{ lineHeight: 1.5 }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Imagen Ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
