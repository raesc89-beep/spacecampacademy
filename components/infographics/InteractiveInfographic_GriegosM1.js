'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Ancient Greek Philosophy themed) ———————————————
function DecoColumn({ size = 70, color = '#2E6B8A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ionic column */}
      <rect x="22" y="12" width="16" height="36" fill="none" stroke={color} strokeWidth="1.5" rx="1" />
      {/* Column flutes */}
      <line x1="26" y1="14" x2="26" y2="46" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="30" y1="14" x2="30" y2="46" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="34" y1="14" x2="34" y2="46" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Capital */}
      <path d="M16 12 Q22 6 30 8 Q38 6 44 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="18" y1="12" x2="42" y2="12" stroke={color} strokeWidth="1.5" />
      {/* Base */}
      <line x1="18" y1="48" x2="42" y2="48" stroke={color} strokeWidth="2" />
      <line x1="16" y1="52" x2="44" y2="52" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoWave({ size = 70, color = '#3A7FA0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Water waves */}
      <path d="M5 25 Q15 18 25 25 Q35 32 45 25 Q55 18 58 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 35 Q15 28 25 35 Q35 42 45 35 Q55 28 58 32" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M5 45 Q15 38 25 45 Q35 52 45 45 Q55 38 58 42" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Water drops */}
      <circle cx="12" cy="15" r="2" fill={color} opacity="0.3" />
      <circle cx="48" cy="12" r="1.5" fill={color} opacity="0.4" />
      <circle cx="30" cy="10" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoSun({ size = 70, color = '#E8E0D4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Sun disc */}
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.3" />
      {/* Eclipse shadow overlay */}
      <circle cx="33" cy="28" r="9" fill="rgba(0,0,0,0.3)" opacity="0.5" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 13 * Math.cos(rad)} y1={30 + 13 * Math.sin(rad)} x2={30 + 20 * Math.cos(rad)} y2={30 + 20 * Math.sin(rad)} stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />;
      })}
    </svg>
  );
}

function DecoCompass({ size = 60, color = '#D4C9B8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Compass circle */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.6" />
      {/* Triangle geometry */}
      <path d="M15 48 L30 12 L45 48 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Right angle mark */}
      <path d="M15 48 L15 42 L21 42" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Height line */}
      <line x1="30" y1="12" x2="30" y2="48" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" opacity="0.4" />
    </svg>
  );
}

function DecoScroll({ size = 70, color = '#C0B09C', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.22, ...style }}>
      {/* Scroll body */}
      <rect x="12" y="8" width="46" height="26" fill="none" stroke={color} strokeWidth="1.5" rx="2" />
      {/* Scroll curls */}
      <path d="M12 8 Q8 8 8 14 Q8 20 12 20" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <path d="M58 8 Q62 8 62 14 Q62 20 58 20" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Text lines */}
      <line x1="18" y1="15" x2="52" y2="15" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="18" y1="20" x2="48" y2="20" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="18" y1="25" x2="44" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="18" y1="30" x2="40" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoMeander({ size = 80, color = '#F0EAE0', style = {} }) {
  return (
    <svg width={size} height={size * 0.4} viewBox="0 0 80 32" style={{ opacity: 0.2, ...style }}>
      {/* Greek key / meander pattern */}
      <path d="M4 16 L4 4 L16 4 L16 12 L8 12 L8 20 L20 20 L20 4 L28 4 L28 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 16 L32 4 L44 4 L44 12 L36 12 L36 20 L48 20 L48 4 L56 4 L56 16" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M60 16 L60 4 L72 4 L72 12 L64 12 L64 20 L76 20 L76 4" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'mileto-cuna-filosofia': [DecoColumn, DecoWave, DecoMeander],
  'tales-y-el-agua': [DecoWave, DecoColumn, DecoCompass],
  'eclipse-predicho': [DecoSun, DecoScroll, DecoColumn],
  'geometria-matematicas': [DecoCompass, DecoColumn, DecoScroll],
  'anaximandro-discipulo': [DecoScroll, DecoWave, DecoMeander],
  'anaximenes-tercer-milesio': [DecoWave, DecoCompass, DecoColumn],
  'nacimiento-pensamiento-racional': [DecoMeander, DecoScroll, DecoSun],
};

// ——— Content Data ————————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Kirk, G.S., Raven, J.E. & Schofield, M. (1983). The Presocratic Philosophers, 2nd ed. Cambridge University Press',
  'Copleston, F. (1946). A History of Philosophy, Vol. 1: Greece and Rome. Burns, Oates & Washbourne',
  'Graham, D.W. (2010). The Texts of Early Greek Philosophy. Cambridge University Press',
  'Aristóteles (c. 350 a.C.). Metafísica, Libro I. Traducción de T. Calvo Martínez, Editorial Gredos, 1994',
  'Freeman, K. (1948). Ancilla to the Pre-Socratic Philosophers. Harvard University Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'mileto-cuna-filosofia',
    title: 'Mileto: Cuna de la Filosofía',
    color: '#2E6B8A',
    btnImage: '/assets/los_griegos/infographic_m1/btn_mileto-cuna-filosofia.jpg',
    image: '/assets/los_griegos/infographic_m1/hero_mileto-cuna-filosofia.jpg',
    content: [
      'Mileto fue una ciudad portuaria situada en la costa occidental de Anatolia, en la región histórica de Jonia, que hoy forma parte de la Turquía moderna, cerca de la desembocadura del río Meandro. Durante el siglo VI a.C., Mileto se consolidó como uno de los centros urbanos más prósperos del mundo antiguo, con una población estimada entre 50.000 y 100.000 habitantes. La ciudad contaba con cuatro puertos naturales y mantenía relaciones comerciales con Egipto, Mesopotamia, las costas del Mar Negro y todo el Mediterráneo oriental, lo que la convertía en un punto de intercambio no solo de mercancías sino también de ideas procedentes de civilizaciones distintas.',
      'Las colonias griegas de Jonia — entre ellas Mileto, Éfeso, Samos y Focea — compartían la lengua griega y las tradiciones religiosas helénicas, pero su posición geográfica las exponía al contacto directo con las culturas persas, lidias, fenicias y babilónicas. Los navegantes milesios fundaron más de 70 colonias propias en las costas del Mar Negro y el Mediterráneo, según el geógrafo Plinio el Viejo en su Historia Natural. Esta red de colonias generaba un flujo constante de información sobre prácticas agrícolas, técnicas de navegación y observaciones astronómicas que alimentaban la curiosidad intelectual de los pensadores de la ciudad.',
      'La estructura política de Mileto en el siglo VI a.C. había evolucionado desde las monarquías hereditarias hacia formas de gobierno más participativas, incluyendo periodos de tiranía y oligarquía. A diferencia de otras ciudades griegas donde el poder religioso y político estaban entrelazados, Mileto permitía cierto grado de debate público y cuestionamiento de las tradiciones, un clima que facilitó el surgimiento del pensamiento filosófico. Los comerciantes milesios, acostumbrados a negociar con pueblos de creencias distintas, desarrollaron una capacidad de comparación y análisis que resultó determinante para la aparición de la filosofía natural.',
      'El contexto económico de Mileto proporcionó las condiciones materiales necesarias para la actividad intelectual. La prosperidad derivada del comercio permitía que ciertos ciudadanos dispusieran del tiempo libre (scholé, de donde proviene nuestra palabra "escuela") necesario para dedicarse a la reflexión y la investigación. Mileto producía textiles de lana teñidos con púrpura de múrice, un producto de alto valor que se exportaba a todo el Mediterráneo. Esta riqueza material, combinada con la diversidad cultural del puerto, creó un entorno sin precedentes para el nacimiento de una nueva forma de entender la realidad.',
      'La tradición religiosa griega explicaba los fenómenos naturales mediante la acción directa de los dioses olímpicos: Zeus lanzaba los rayos, Poseidón provocaba los terremotos, Deméter controlaba las estaciones. En las costas de Jonia, donde los pensadores podían comparar estas explicaciones con los mitos babilónicos, egipcios y persas, surgió una pregunta nueva y radical: si cada pueblo tenía dioses diferentes para explicar los mismos fenómenos, ¿era posible que la verdadera causa fuera natural y no divina? Esta pregunta, formulada en Mileto alrededor del año 600 a.C., constituye el punto de partida de la filosofía y la ciencia occidental.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mileto alcanzó tal relevancia que el historiador Heródoto de Halicarnaso (484–425 a.C.) la describió como "el ornamento de Jonia". La ciudad fue destruida por los persas en el año 494 a.C. tras una rebelión jónica, pero para entonces ya había producido tres de los filósofos más importantes de la historia: Tales, Anaximandro y Anaxímenes. Las ruinas de Mileto pueden visitarse hoy cerca del pueblo de Balat, en la provincia turca de Aydın, donde se conservan restos del teatro, el ágora y el puerto.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las excavaciones arqueológicas dirigidas por Theodor Wiegand entre 1899 y 1914, y continuadas por el Instituto Arqueológico Alemán, revelaron que Mileto tenía un sistema de planificación urbana en cuadrícula (más tarde atribuido a Hipódamo de Mileto, nacido alrededor de 498 a.C.) que incluía canales de drenaje, cisternas de agua y edificios públicos. Este diseño urbano racional refleja la misma mentalidad ordenada y sistemática que produjo la filosofía natural milesia.' },
    ],
    fact: 'El río Meandro, junto al cual se fundó Mileto, dio su nombre a la palabra "meandro" en español y en otros idiomas, que describe las curvas sinuosas de un río. Los griegos representaban estas curvas como un patrón geométrico decorativo conocido como "greca" o "meandro griego", que aparece en cerámica, arquitectura y textiles desde el siglo VIII a.C. Este patrón, con sus líneas rectas que forman ángulos de 90 grados imitando las curvas del río, es uno de los motivos decorativos más antiguos y reconocibles de la civilización occidental.',
  },
  {
    id: 'tales-y-el-agua',
    title: 'Tales y el Agua',
    color: '#3A7FA0',
    btnImage: '/assets/los_griegos/infographic_m1/btn_tales-y-el-agua.jpg',
    image: '/assets/los_griegos/infographic_m1/hero_tales-y-el-agua.jpg',
    content: [
      'Tales de Mileto, nacido alrededor del año 624 a.C. y fallecido hacia el 546 a.C., es reconocido por Aristóteles en el Libro I de su Metafísica como el fundador de la filosofía natural. Su propuesta central afirmaba que el agua (hydor en griego) era el principio originario — el arché — de todas las cosas. Esto significaba que toda la materia del universo derivaba de una sola sustancia fundamental, y que los cambios observables en la naturaleza eran transformaciones de ese elemento primordial. Esta idea rompía de manera radical con las explicaciones mitológicas que atribuían la creación del mundo a la voluntad caprichosa de dioses antropomórficos.',
      'Las razones que llevaron a Tales a elegir el agua como arché pueden reconstruirse a partir de observaciones empíricas directas. El agua es la única sustancia que los griegos del siglo VI a.C. podían observar en tres estados: sólido (hielo), líquido y gaseoso (vapor). Tales observó que las semillas de las plantas necesitan humedad para germinar, que los alimentos contienen agua, que la tierra húmeda produce vida vegetal y que los ríos depositan sedimentos que forman tierra nueva. Para un pensador que buscaba un principio unificador, el agua ofrecía una candidata plausible: estaba presente en todo lo vivo y podía cambiar de forma sin dejar de ser ella misma.',
      'Aristóteles también reporta que Tales sostenía que la Tierra flotaba sobre el agua, como un disco de madera flota en un estanque. Esta idea puede parecer rudimentaria hoy, pero representaba un avance conceptual significativo: en lugar de explicar la posición de la Tierra mediante el mito de Atlas sosteniéndola sobre sus hombros, Tales proponía un mecanismo físico basado en la flotación. Además, esta idea conectaba con las observaciones sísmicas: Tales explicaba los terremotos no como la ira de Poseidón, sino como el movimiento de las aguas subterráneas sobre las que la Tierra descansaba, una explicación naturalista coherente con su sistema filosófico.',
      'La contribución de Tales no radica tanto en la corrección de su respuesta como en la naturaleza de su pregunta. Al preguntar "¿de qué está hecho todo?", Tales inauguró el programa de investigación que la ciencia moderna continúa persiguiendo. La física de partículas actual busca las partículas elementales (quarks, leptones, bosones) de las que se compone toda la materia, una empresa intelectual que es directa heredera de la pregunta de Tales. La diferencia es de método y precisión, no de intención: tanto Tales como los físicos del CERN buscan el componente fundamental de la realidad material.',
      'Tales fue incluido en la lista de los Siete Sabios de Grecia, un grupo de pensadores y estadistas del siglo VI a.C. reconocidos por su sabiduría práctica. La lista, que aparece en diversas fuentes antiguas con variaciones, incluye consistentemente a Tales junto a figuras como Solón de Atenas, Bías de Priene y Pítaco de Mitilene. A Tales se le atribuye la máxima "Conócete a ti mismo" (Gnothi seauton), que fue inscrita en el pronaos del templo de Apolo en Delfos. Diógenes Laercio, en sus Vidas de los filósofos (siglo III d.C.), recopila numerosas anécdotas sobre la sabiduría práctica de Tales, incluyendo su famosa predicción de una cosecha abundante de aceitunas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Una historia narrada por Aristóteles en su Política (1259a) cuenta que Tales, cansado de que la gente le reprochara que la filosofía no servía para ganar dinero, usó sus conocimientos astronómicos para predecir una gran cosecha de aceitunas en Mileto. Alquiló por adelantado todas las prensas de aceite de la región a bajo precio, y cuando la cosecha llegó y todos necesitaban las prensas, las subalquiló obteniendo una ganancia considerable. Tales demostró así que los filósofos podían enriquecerse si quisieran, pero que preferían dedicar su tiempo a otras cosas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ciencia moderna ha revelado que el agua (H₂O) es una molécula con propiedades físico-químicas excepcionales que la hacen necesaria para toda la vida conocida. Su capacidad calorífica específica (4.186 J/g·°C) es la más alta de cualquier líquido común, lo que permite regular la temperatura de los organismos y del planeta. Su densidad máxima ocurre a 4°C (no a 0°C), lo que hace que el hielo flote y proteja la vida acuática en invierno. Estas propiedades, desconocidas para Tales, validan en parte su intuición de que el agua era una sustancia especial y fundamental.' },
    ],
    fact: 'Tales también investigó las propiedades del ámbar (élektron en griego) y la magnetita (piedra de Magnesia). Observó que el ámbar, al ser frotado con lana, atraía partículas pequeñas como plumas y trocitos de paja, y que la magnetita atraía fragmentos de hierro sin contacto directo. Aunque Tales interpretó estos fenómenos como evidencia de que estas sustancias poseían "alma" (psyché), estaba documentando las primeras observaciones sistemáticas de la electricidad estática y el magnetismo. La palabra "electricidad" deriva directamente del griego élektron (ámbar), y "magnetismo" de Magnesia, la región de Tesalia donde se encontraba la magnetita.',
  },
  {
    id: 'eclipse-predicho',
    title: 'El Eclipse Predicho',
    color: '#E8E0D4',
    btnImage: '/assets/los_griegos/infographic_m1/btn_eclipse-predicho.jpg',
    image: '/assets/los_griegos/infographic_m1/hero_eclipse-predicho.jpg',
    content: [
      'El 28 de mayo del año 585 a.C. ocurrió un eclipse total de sol que fue visible en Anatolia, la región donde se encontraba Mileto. Según el historiador Heródoto de Halicarnaso (Historias, Libro I, capítulos 73-74), Tales de Mileto había predicho este eclipse antes de que sucediera. El eclipse tuvo lugar durante una batalla entre los lidios, gobernados por el rey Aliates, y los medos, bajo el mando del rey Ciaxares, que llevaban seis años en guerra. Cuando el día se convirtió repentinamente en noche durante el combate, ambos ejércitos interpretaron el fenómeno como un presagio divino y depusieron las armas, firmando un tratado de paz inmediato.',
      'Los astrónomos modernos han verificado que efectivamente ocurrió un eclipse solar el 28 de mayo de 585 a.C. (según la cronología juliana proléptica), cuya franja de totalidad cruzó Anatolia. Este dato, calculado mediante las ecuaciones de mecánica celeste que describen las órbitas de la Tierra y la Luna con precisión de segundos, confirma la fecha reportada por Heródoto y convierte este eclipse en el evento histórico más antiguo que puede datarse con exactitud al día específico. Los cálculos fueron realizados inicialmente por el astrónomo inglés Francis Baily en 1811 y confirmados posteriormente con mayor precisión.',
      'El método que Tales utilizó para predecir el eclipse es objeto de debate entre los historiadores de la ciencia. La hipótesis más aceptada, propuesta por el asiriólogo Otto Neugebauer, sugiere que Tales pudo haber accedido a registros babilónicos de eclipses durante sus viajes o a través de contactos comerciales. Los astrónomos babilónicos habían identificado el ciclo Saros: un periodo de 223 meses lunáticos (aproximadamente 18 años y 11 días) tras el cual los eclipses tienden a repetirse en patrones similares. Si Tales conocía la fecha de un eclipse anterior, podía calcular cuándo ocurriría el siguiente aplicando este ciclo.',
      'Sin embargo, predecir un eclipse solar utilizando únicamente el ciclo Saros presenta limitaciones significativas. El ciclo permite anticipar cuándo ocurrirá un eclipse en algún lugar del planeta, pero la franja de totalidad se desplaza aproximadamente 120 grados de longitud hacia el oeste con cada repetición, lo que dificulta predecir dónde será visible. Algunos historiadores, como Dmitri Panchenko (2004), han argumentado que Tales pudo haber realizado una predicción más general — anticipando un eclipse solar en un determinado año — sin especificar la fecha exacta ni la ubicación de la totalidad.',
      'Independientemente del método preciso utilizado por Tales, la predicción del eclipse representó un hito en la historia del pensamiento humano. Por primera vez, un fenómeno celeste que las culturas antiguas interpretaban universalmente como un acto de los dioses — la desaparición del sol en pleno día — fue anticipado por la mente de un ser humano mediante el razonamiento y la observación. Este acto demostró que los cielos no eran dominio exclusivo de lo sobrenatural, sino que obedecían a regularidades que podían ser descubiertas, comprendidas y utilizadas para hacer predicciones verificables. Este principio de predictibilidad es la base de toda la ciencia moderna.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La batalla detenida por el eclipse de 585 a.C. se conoce como la "Batalla del Eclipse" o "Batalla del Halys", ya que se libró cerca del río Halys (hoy Kızılırmak, en Turquía). El tratado de paz resultante fue mediado por dos intermediarios: Siénesis de Cilicia y Labineto de Babilonia. Como parte del acuerdo, la princesa lidia Aryenis se casó con el príncipe medo Astiages, sellando la alianza entre ambos reinos. Esta paz perduró hasta que Ciro el Grande de Persia conquistó el reino lidio en el año 547 a.C.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un eclipse solar total ocurre cuando la Luna, con un diámetro de 3.474 km, se interpone entre la Tierra y el Sol, cuyo diámetro es de 1.392.700 km (unas 400 veces mayor). La coincidencia de que el Sol esté también unas 400 veces más lejos que la Luna (149,6 millones de km vs. 384.400 km) hace que ambos cuerpos tengan un tamaño angular casi idéntico visto desde la Tierra (aproximadamente 0,5 grados). Esta coincidencia no es permanente: la Luna se aleja de la Tierra 3,8 cm por año, y dentro de unos 600 millones de años los eclipses totales ya no serán posibles.' },
    ],
    fact: 'El ciclo Saros, que posiblemente permitió a Tales su predicción, fue documentado por los astrónomos babilónicos en tablillas cuneiformes que se conservan en el Museo Británico. La serie de tablillas conocida como "Canon de Eclipses" (catalogada como BM 32234 y BM 34684) registra observaciones de eclipses lunares y solares que se remontan al siglo VIII a.C. Un Saros completo dura exactamente 6.585,32 días (18 años, 11 días y 8 horas), lo que refleja la resonancia entre tres ciclos orbitales de la Luna: el mes sinódico, el mes draconítico y el mes anomalístico.',
  },
  {
    id: 'geometria-matematicas',
    title: 'Geometría y Matemáticas',
    color: '#D4C9B8',
    btnImage: '/assets/los_griegos/infographic_m1/btn_geometria-matematicas.jpg',
    image: '/assets/los_griegos/infographic_m1/hero_geometria-matematicas.jpg',
    content: [
      'A Tales de Mileto se le atribuyen cinco teoremas geométricos fundamentales, según la tradición recogida por Proclo de Licia en su Comentario al Libro I de los Elementos de Euclides (siglo V d.C.). Estos teoremas incluyen: que un círculo es dividido en dos partes iguales por su diámetro; que los ángulos de la base de un triángulo isósceles son iguales; que los ángulos opuestos por el vértice son iguales; que dos triángulos son congruentes si tienen un lado y dos ángulos iguales; y que todo ángulo inscrito en un semicírculo es un ángulo recto (el famoso Teorema de Tales). Estos resultados, que hoy forman parte del currículo básico de geometría, representaron en su momento la primera aplicación del razonamiento deductivo a las matemáticas.',
      'El Teorema de Tales sobre el ángulo inscrito en un semicírculo establece que si se traza un triángulo cuyos vértices están sobre una circunferencia, y uno de los lados del triángulo es el diámetro de esa circunferencia, entonces el ángulo opuesto al diámetro será siempre de exactamente 90 grados. Este resultado es independiente de la posición del tercer vértice sobre la circunferencia: puede moverse a cualquier punto del semicírculo y el ángulo se mantendrá recto. La demostración requiere usar la propiedad de que los radios de un círculo son iguales, lo que genera triángulos isósceles cuyas propiedades pueden analizarse mediante sumas de ángulos.',
      'Una de las aplicaciones prácticas más célebres del conocimiento geométrico de Tales fue la medición de la altura de las pirámides de Egipto. Según el relato de Plutarco en su obra Banquete de los Siete Sabios, Tales utilizó el principio de proporcionalidad entre triángulos semejantes: plantó una vara vertical junto a la pirámide y midió la longitud de ambas sombras en el momento del día en que la sombra de la vara era igual a la altura de la vara. En ese instante, la sombra de la pirámide era igual a la altura de la pirámide (más la mitad de la base). Este método requería únicamente una vara, una cuerda para medir y la paciencia de esperar el momento adecuado del día.',
      'La contribución metodológica de Tales a las matemáticas fue aún más profunda que sus teoremas individuales. Los egipcios y los babilónicos poseían un conocimiento geométrico práctico extenso: sabían calcular áreas de campos, volúmenes de graneros y distancias entre puntos. Sin embargo, este conocimiento era empírico y práctico: funcionaba mediante recetas y procedimientos específicos sin explicar por qué funcionaban. Tales fue el primero, según la tradición griega, en buscar demostraciones generales: probar que un resultado era verdadero para todos los casos posibles, no solo para los casos particulares que había medido. Este paso de lo particular a lo general, de la receta al teorema, constituye el nacimiento del método matemático formal.',
      'Tales también contribuyó a la navegación marítima mediante la aplicación de la geometría a problemas prácticos. Se le atribuye el método para calcular la distancia de un barco a la costa utilizando triángulos semejantes: desde dos puntos conocidos en la costa, se medían los ángulos hacia el barco, y con estos datos se podía calcular la distancia sin necesidad de alcanzar el barco. Diógenes Laercio reporta además que Tales enseñó a los marineros griegos a orientarse utilizando la constelación de la Osa Menor, técnica que los fenicios ya empleaban pero que los navegantes griegos desconocían. Estas aplicaciones prácticas demostraban que el conocimiento abstracto tenía utilidad directa en la vida cotidiana.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Según Diógenes Laercio, cuando Tales midió la altura de la Gran Pirámide de Guiza usando sombras, el faraón Amasis II (570–526 a.C.) quedó tan sorprendido que invitó a Tales a su corte. La Gran Pirámide, construida alrededor del 2560 a.C. para el faraón Keops, mide 146,6 metros de altura original (138,5 metros hoy, por la erosión). Cuando Tales realizó su medición, la pirámide ya tenía más de 2.000 años de antigüedad, y los propios egipcios habían perdido el registro exacto de sus dimensiones originales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Teorema de Tales sobre proporcionalidad (que si rectas paralelas cortan dos secantes, los segmentos determinados sobre una son proporcionales a los correspondientes de la otra) se distingue del teorema del ángulo inscrito, aunque ambos llevan su nombre. El teorema de proporcionalidad es la base matemática de la trigonometría, la cartografía y la topografía modernas. Los ingenieros civiles lo utilizan en la actualidad para calcular distancias inaccesibles, y los programadores de gráficos por computadora lo aplican en algoritmos de renderizado 3D y transformaciones de perspectiva.' },
    ],
    fact: 'La medición de la pirámide por Tales se basaba en un principio que hoy llamamos "semejanza de triángulos", que establece que dos triángulos con los mismos ángulos tienen lados proporcionales sin importar su tamaño. Este principio fue formalizado por Euclides en la Proposición 2 del Libro VI de sus Elementos (c. 300 a.C.), pero la intuición geométrica de Tales lo precedió en unos 250 años. El mismo principio permite hoy a los astrónomos medir distancias a estrellas mediante el método de paralaje, donde la "vara" es la órbita de la Tierra y la "sombra" es el desplazamiento angular aparente de la estrella contra el fondo de estrellas más lejanas.',
  },
  {
    id: 'anaximandro-discipulo',
    title: 'Anaximandro: El Discípulo',
    color: '#1E5B7A',
    btnImage: '/assets/los_griegos/infographic_m1/btn_anaximandro-discipulo.jpg',
    image: '/assets/los_griegos/infographic_m1/hero_anaximandro-discipulo.jpg',
    content: [
      'Anaximandro de Mileto (c. 610–546 a.C.) fue discípulo directo de Tales y el segundo filósofo de la Escuela de Mileto. Su contribución central fue rechazar la propuesta de su maestro de que el agua fuera el arché (principio originario) y proponer en su lugar una sustancia que llamó ápeiron, término griego que se traduce como "lo indefinido", "lo ilimitado" o "lo sin fronteras". Anaximandro argumentaba que el principio originario no podía ser ningún elemento concreto y observable como el agua, el aire o el fuego, porque cualquier elemento definido tendría propiedades limitadas que no podrían dar origen a sustancias con propiedades opuestas. El ápeiron era eterno, indestructible e inagotable, una fuente infinita de la que emergían y a la que retornaban todas las cosas.',
      'Anaximandro elaboró una cosmología notablemente sofisticada para su época. Propuso que la Tierra era un cilindro de piedra cuya altura era un tercio de su diámetro, y que flotaba libremente en el espacio sin necesidad de soporte alguno. Su argumento para esta posición estable de la Tierra era un razonamiento por simetría: la Tierra permanecía inmóvil porque, al estar equidistante de todos los puntos del cosmos, no tenía razón para moverse en ninguna dirección particular. Este argumento, conocido como el "principio de razón suficiente", fue reconocido por Aristóteles como un razonamiento válido, aunque Aristóteles discrepó de la conclusión. El filósofo Karl Popper consideró este argumento como una de las ideas más audaces de toda la historia del pensamiento humano.',
      'Una de las contribuciones más reconocidas de Anaximandro fue la creación del primer mapa del mundo conocido (c. 560 a.C.), aunque el mapa en sí no se ha conservado. Según la descripción de Hecateo de Mileto y de Heródoto, el mapa representaba la Tierra como un disco circular rodeado por el océano, con el mar Mediterráneo en el centro, Europa y Asia como las dos masas continentales principales, y África (entonces llamada Libia) como parte del conjunto. Aunque impreciso por los estándares modernos, este mapa representaba un esfuerzo sistemático por organizar el conocimiento geográfico en una representación visual coherente, una herramienta que los marineros y comerciantes milesios podían utilizar en sus viajes.',
      'Anaximandro formuló ideas sobre el origen de los seres vivos que algunos historiadores de la ciencia han comparado con precursores lejanos de la teoría de la evolución. Según la doxografía de Aecio (siglo I d.C.) y Pseudo-Plutarco, Anaximandro sostenía que los primeros seres vivos surgieron de la humedad calentada por el sol, protegidos por cortezas espinosas, y que los seres humanos no podían haber existido siempre en su forma actual porque, a diferencia de otros animales, los bebés humanos son demasiado vulnerables para sobrevivir sin cuidado prolongado. Propuso que los humanos se desarrollaron inicialmente dentro de criaturas similares a peces, hasta que pudieron valerse por sí mismos en tierra firme.',
      'Anaximandro también realizó contribuciones prácticas significativas. Se le atribuye la introducción del gnomon (un reloj solar vertical) en Grecia, un instrumento que había conocido durante contactos con la astronomía babilónica. Utilizó el gnomon para determinar los solsticios y equinoccios, y para medir la inclinación de la eclíptica (el ángulo entre el plano de la órbita terrestre y el ecuador). Además, fue probablemente el primer griego en escribir un tratado en prosa sobre la naturaleza (Peri Physeos, "Sobre la Naturaleza"), del cual solo sobrevive un fragmento: "De donde las cosas tienen su origen, allí también se encaminan hacia su destrucción, según la necesidad; pues se pagan mutuamente pena y retribución por su injusticia, conforme al orden del tiempo." Este fragmento, considerado el texto filosófico más antiguo de Occidente, sugiere una visión cíclica del cosmos gobernada por leyes impersonales de equilibrio.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El concepto de ápeiron de Anaximandro tiene paralelos sorprendentes con conceptos de la física moderna. El campo cuántico de vacío, del cual emergen y al cual retornan partículas subatómicas, comparte características con el ápeiron: es ilimitado, eterno en el marco de la física, y genera pares de partículas con propiedades opuestas (materia y antimateria) que se aniquilan mutuamente. El físico Werner Heisenberg señaló esta similitud en su libro Física y Filosofía (1958), describiendo la intuición de Anaximandro como "una anticipación notable del pensamiento científico moderno".' },
      { label: 'Dato Científico', icon: 'atom', text: 'La idea de Anaximandro de que la Tierra flota sin soporte en el espacio, mantenida en posición por simetría, fue un salto conceptual que anticipó el principio de inercia formulado por Newton más de dos mil años después. La primera ley de Newton establece que un cuerpo permanece en reposo o en movimiento uniforme a menos que una fuerza actúe sobre él. La Tierra en la cosmología de Anaximandro no caía porque ninguna dirección era preferente, lo que es funcionalmente equivalente a decir que no había fuerza neta que la desplazara en ninguna dirección particular.' },
    ],
    fact: 'El fragmento sobreviviente de Anaximandro — "De donde las cosas tienen su origen, allí también se encaminan hacia su destrucción, según la necesidad" — fue transmitido por Simplicio de Cilicia en su Comentario a la Física de Aristóteles (siglo VI d.C.), quien a su vez lo citaba de Teofrasto, discípulo directo de Aristóteles. Esta cadena de transmisión abarca más de mil años. El filósofo Martin Heidegger dedicó un ensayo completo a interpretar este único fragmento en 1946, y el físico Carlo Rovelli lo analizó en su libro Anaximandro y el nacimiento de la ciencia (2023), argumentando que Anaximandro, no Tales, merece el título de primer científico de la historia.',
  },
  {
    id: 'anaximenes-tercer-milesio',
    title: 'Anaxímenes: El Tercer Milesio',
    color: '#C0B09C',
    btnImage: '/assets/los_griegos/infographic_m1/btn_anaximenes-tercer-milesio.jpg',
    image: '/assets/los_griegos/infographic_m1/hero_anaximenes-tercer-milesio.jpg',
    content: [
      'Anaxímenes de Mileto (c. 585–525 a.C.) fue el tercer y último gran filósofo de la Escuela de Mileto, discípulo de Anaximandro. Propuso que el aire (aer en griego) era el arché, el principio fundamental del que derivaban todas las cosas. A primera vista, esto podía parecer un retroceso respecto al ápeiron abstracto de Anaximandro, una vuelta a un elemento concreto como el agua de Tales. Sin embargo, la contribución original de Anaxímenes radicaba no tanto en su elección del aire como principio sino en el mecanismo que propuso para explicar cómo un solo elemento podía transformarse en la diversidad de sustancias que observamos en el mundo: la rarefacción (mánosis) y la condensación (pyknosis).',
      'Según Anaxímenes, cuando el aire se enrarece — es decir, se vuelve menos denso — se transforma en fuego. Cuando se condensa progresivamente, se convierte primero en viento, luego en nube, luego en agua, después en tierra y finalmente en piedra. Este esquema ofrecía una explicación mecánica completa de las transformaciones materiales: toda la diversidad del mundo físico resultaba de variaciones cuantitativas (más o menos densidad) de una sola sustancia. Esta idea representaba un avance metodológico considerable porque proponía un mecanismo específico, observable y potencialmente verificable, no una transformación misteriosa o arbitraria.',
      'Anaxímenes apoyaba su teoría con una observación que cualquiera podía repetir: si soplas con los labios abiertos, el aire sale caliente; si soplas con los labios apretados, el aire sale frío. Interpretaba esto como evidencia de que la compresión (condensación) enfriaba el aire y la expansión (rarefacción) lo calentaba. Aunque la explicación termodinámica correcta de este fenómeno es más compleja (involucra la velocidad del flujo y la mezcla con el aire ambiente), la observación de Anaxímenes anticipaba de manera rudimentaria la relación entre presión, volumen y temperatura que los científicos modernos formalizarían con la ley de los gases ideales (PV=nRT) más de dos milenios después.',
      'La cosmología de Anaxímenes describía la Tierra como un disco plano y ancho que flotaba sobre el aire, de manera similar a como una hoja seca flota sobre el agua. Las estrellas, según su modelo, estaban fijadas a una bóveda sólida y cristalina que giraba alrededor de la Tierra como un gorro gira alrededor de la cabeza. Propuso que el sol no pasaba debajo de la Tierra durante la noche, sino que se ocultaba detrás de montañas elevadas en el horizonte norte y reaparecía por el este. Aunque estas ideas eran incorrectas, mostraban un esfuerzo sistemático por construir un modelo coherente del universo basado exclusivamente en procesos físicos, sin recurrir a explicaciones mitológicas.',
      'La importancia de Anaxímenes en la historia de la filosofía y la ciencia reside en haber perfeccionado el método de la Escuela de Mileto. Tales había planteado la pregunta correcta (¿de qué está hecho todo?), Anaximandro había elevado el nivel de abstracción con el ápeiron, y Anaxímenes completó el programa milesio al proporcionar un mecanismo específico de transformación. Su modelo de rarefacción y condensación ofrecía una explicación que era, en principio, cuantificable: las diferencias entre las sustancias se reducían a diferencias de grado (más o menos denso), no de tipo. Esta idea de que la diversidad cualitativa del mundo puede explicarse mediante variaciones cuantitativas de una propiedad fundamental es uno de los principios más poderosos de la ciencia moderna, utilizado desde la química (elementos como variaciones en el número de protones) hasta la física de partículas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Anaxímenes identificó el aire con el alma (psyché) y con el principio vital del cosmos: "Así como nuestra alma, siendo aire, nos mantiene unidos, así el soplo y el aire circundan todo el cosmos". Esta analogía entre el microcosmos (el ser humano) y el macrocosmos (el universo) fue extremadamente influyente en la filosofía griega posterior y se mantuvo durante toda la Edad Media. Los estoicos, filósofos que vivieron siglos después, adoptaron una idea similar con su concepto de pneuma, un soplo vital que permeaba todo el universo y le daba coherencia y vida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El concepto de cambios de estado mediante condensación y rarefacción que propuso Anaxímenes tiene un paralelo directo en la termodinámica moderna. La transición de fase del agua (hielo → agua → vapor) se produce por cambios en la energía cinética de las moléculas: a mayor temperatura, las moléculas vibran más rápido y la sustancia se enrarece (se vuelve menos densa). La densidad del agua líquida es 1.000 kg/m³, la del vapor a 100°C es solo 0,598 kg/m³ (unas 1.673 veces menor), y la del hielo es 917 kg/m³. Anaxímenes estaba en lo correcto al conectar la densidad con la identidad de la sustancia.' },
    ],
    fact: 'La Escuela de Mileto terminó abruptamente en el año 494 a.C., cuando los persas del rey Darío I destruyeron la ciudad como represalia por la participación de Mileto en la Rebelión Jónica (499–493 a.C.). Heródoto describe cómo los persas mataron a la mayoría de los hombres, esclavizaron a las mujeres y los niños, y deportaron a los supervivientes a la desembocadura del río Tigris. Los atenienses, aliados de Mileto, quedaron tan conmovidos por la noticia que cuando el dramaturgo Frínico presentó una obra teatral titulada La Toma de Mileto, el público lloró en el teatro, y las autoridades multaron al autor con 1.000 dracmas por haber recordado "sus propias desgracias" y prohibieron que la obra se representara de nuevo.',
  },
  {
    id: 'nacimiento-pensamiento-racional',
    title: 'El Nacimiento del Pensamiento Racional',
    color: '#F0EAE0',
    btnImage: '/assets/los_griegos/infographic_m1/btn_nacimiento-pensamiento-racional.jpg',
    image: '/assets/los_griegos/infographic_m1/hero_nacimiento-pensamiento-racional.jpg',
    content: [
      'El paso del mito al logos — de las explicaciones mitológicas a las explicaciones racionales — es el evento intelectual más significativo de la civilización occidental, y ocurrió en Mileto durante el siglo VI a.C. Antes de los filósofos milesios, todas las culturas del mundo explicaban los fenómenos naturales mediante narrativas sobre seres sobrenaturales: los babilónicos creían que el mundo surgió del combate entre el dios Marduk y la diosa Tiamat; los egipcios atribuían la creación al dios Atum; los griegos seguían la Teogonía de Hesíodo, donde el cosmos emergía del Caos primordial y era gobernado por los dioses olímpicos. Tales, Anaximandro y Anaxímenes reemplazaron estas narrativas con explicaciones basadas en principios naturales impersonales, observables y sujetos a discusión racional.',
      'Una característica fundamental del pensamiento milesio, que lo distingue de todas las tradiciones sapienciales anteriores, fue su apertura a la crítica y la corrección. En las tradiciones religiosas y mitológicas, las explicaciones eran revelaciones de origen divino que no admitían cuestionamiento: discrepar del mito era impiedad. En Mileto, cada filósofo criticó y modificó las ideas de su predecesor: Anaximandro rechazó el agua de Tales y propuso el ápeiron; Anaxímenes rechazó el ápeiron de Anaximandro y propuso el aire con un mecanismo de transformación. Esta tradición de discusión racional, donde las ideas se evalúan por sus méritos argumentativos y no por la autoridad de quien las propone, es el fundamento del método científico moderno.',
      'El filósofo e historiador de la ciencia Karl Popper argumentó en su ensayo "Retorno a los presocráticos" (1958) que la Escuela de Mileto inventó la tradición crítica que hace posible la ciencia. Popper señaló que lo que hace especial a la ciencia no es la verificación de teorías sino su falsabilidad: la posibilidad de demostrar que una teoría es incorrecta. Los milesios practicaron esta tradición al someter las ideas de sus maestros a examen crítico y proponer alternativas. Esta disposición a abandonar una idea cuando la evidencia o los argumentos la contradicen es lo que separa el pensamiento científico del pensamiento dogmático.',
      'El legado de la Escuela de Mileto se extendió a través de toda la filosofía griega posterior. Heráclito de Éfeso (c. 535–475 a.C.) propuso el fuego como arché y el cambio como ley fundamental del universo. Empédocles de Agrigento (c. 490–430 a.C.) sintetizó las propuestas anteriores proponiendo cuatro elementos (agua, aire, tierra y fuego) como componentes básicos de la materia. Leucipo y Demócrito de Abdera (siglo V a.C.) llevaron la pregunta de Tales a su conclusión más radical: propusieron que toda la materia estaba compuesta de partículas indivisibles llamadas átomos (del griego átomos, "que no se puede cortar"), una hipótesis que fue confirmada experimentalmente más de dos mil años después.',
      'La transición del mythos al logos iniciada por Tales de Mileto continúa siendo relevante en el siglo XXI. Cada vez que un científico propone una hipótesis, la somete a pruebas experimentales y la modifica cuando los datos no la confirman, está siguiendo el método inaugurado por los pensadores milesios. Cada vez que un estudiante pregunta "¿por qué?" en lugar de aceptar una afirmación sin evidencia, está heredando la actitud de Tales. La ciencia moderna — con sus aceleradores de partículas, telescopios espaciales y secuenciadores genéticos — es la continuación directa de aquella primera pregunta formulada en una ciudad portuaria del Egeo hace veintiséis siglos: ¿de qué está hecho el mundo y cómo podemos saberlo mediante la razón?'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La palabra "filosofía" (philosophía) proviene del griego philos (amante) y sophía (sabiduría), y su invención se atribuye tradicionalmente a Pitágoras de Samos (c. 570–495 a.C.), quien según Diógenes Laercio se negó a ser llamado "sabio" (sophos) y prefirió ser llamado "amante de la sabiduría" (philósophos). Sin embargo, el contenido de la filosofía como búsqueda racional de explicaciones naturales fue inaugurado por Tales de Mileto al menos una generación antes. La escuela filosófica que Tales fundó en Mileto es la más antigua del mundo occidental documentada por fuentes históricas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La hipótesis atómica de Demócrito (c. 460–370 a.C.), heredera directa de la tradición milesia, fue confirmada experimentalmente en 1905 cuando Albert Einstein explicó el movimiento browniano (el movimiento errático de partículas de polen en el agua, observado por Robert Brown en 1827) como el resultado de colisiones con moléculas invisibles. Jean Perrin verificó experimentalmente las predicciones de Einstein en 1908, ganando el Premio Nobel de Física en 1926. Desde Tales hasta Perrin, la pregunta "¿de qué está hecho todo?" tardó unos 2.500 años en ser respondida con evidencia experimental directa.' },
    ],
    fact: 'Aristóteles, en el Libro I de su Metafísica (983b6), presenta a Tales como el fundador de la investigación sobre los principios naturales (arché) y lo sitúa como el inicio de una tradición que culmina en su propia filosofía. La obra de Aristóteles se convirtió en el texto filosófico y científico más influyente de la historia occidental, siendo la base del currículo universitario europeo desde el siglo XIII hasta el XVII. Cuando los científicos de la Revolución Científica (Galileo, Newton, Kepler) cuestionaron a Aristóteles, estaban ejerciendo exactamente la misma tradición crítica que Anaximandro ejerció al cuestionar a Tales: la disposición a examinar las ideas recibidas a la luz de nuevas evidencias y argumentos.',
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

// ——— Greek Philosophy Header ————————————————————————————————————————————————
function PhilosophyHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(46,107,138,0.3))' }}>
        {/* Wisdom arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#greekGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 knowledge markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#2E6B8A','#3A7FA0','#E8E0D4','#D4C9B8','#1E5B7A','#C0B09C','#F0EAE0'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central column icon */}
        <line x1="295" y1="18" x2="295" y2="42" stroke="#E8E0D4" strokeWidth="2" opacity="0.5" />
        <line x1="305" y1="18" x2="305" y2="42" stroke="#E8E0D4" strokeWidth="2" opacity="0.5" />
        <line x1="289" y1="18" x2="311" y2="18" stroke="#E8E0D4" strokeWidth="1.5" opacity="0.6" />
        <line x1="289" y1="42" x2="311" y2="42" stroke="#E8E0D4" strokeWidth="1.5" opacity="0.6" />
        <path d="M289 18 Q295 12 300 14 Q305 12 311 18" fill="none" stroke="#E8E0D4" strokeWidth="1.2" opacity="0.5" />
        <defs>
          <linearGradient id="greekGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(46,107,138,0.2)" />
            <stop offset="50%" stopColor="rgba(46,107,138,0.9)" />
            <stop offset="100%" stopColor="rgba(46,107,138,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#E8E0D4" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TALES DE MILETO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(232,224,212,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL PRIMER CIENTÍFICO</text>
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
          layoutId="activeDotGriegosM1"
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

// ——— Main Infographic Component —————————————————————————————————————————————
export default function InteractiveInfographic_GriegosM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/griegos/griegos_m1.png)',
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
              🏛️ ¡Has dominado los secretos de los Filósofos de Mileto!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Primer Filósofo Natural
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
