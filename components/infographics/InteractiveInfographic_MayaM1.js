'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya themed) ────────────────────────────

function DecoMayaPyramid({ size = 70, color = '#4CAF50', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M30 10 L45 50 L15 50 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M25 10 L35 10 L35 20 L40 20 L40 30 L45 30 L45 40 L50 40 L50 50 L10 50 L10 40 L15 40 L15 30 L20 30 L20 20 L25 20 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      <rect x="25" y="40" width="10" height="10" fill={color} opacity="0.5" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1.5" />
      <line x1="20" y1="30" x2="40" y2="30" stroke={color} strokeWidth="1.5" />
      <line x1="25" y1="20" x2="35" y2="20" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function DecoVenusStar({ size = 70, color = '#FFD54F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 15 L33 27 L45 30 L33 33 L30 45 L27 33 L15 30 L27 27 Z" fill={color} opacity="0.5" />
      <circle cx="18" cy="18" r="3" fill={color} opacity="0.6" />
      <circle cx="42" cy="18" r="3" fill={color} opacity="0.6" />
      <circle cx="18" cy="42" r="3" fill={color} opacity="0.6" />
      <circle cx="42" cy="42" r="3" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="4" fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function DecoSerpent({ size = 70, color = '#26C6DA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 40 Q20 20 30 40 T50 20" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M10 40 Q20 20 30 40 T50 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="35" r="2" fill={color} />
      {/* Plumes */}
      <path d="M25 35 Q20 25 28 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M35 30 Q40 20 45 25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M45 25 Q50 15 55 20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DecoGlyph({ size = 70, color = '#3F51B5', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="15" y="15" width="30" height="30" rx="6" fill="none" stroke={color} strokeWidth="2" />
      <rect x="19" y="19" width="22" height="22" rx="4" fill={color} opacity="0.2" />
      {/* Internal details mimicking Maya numbers/bars */}
      <line x1="22" y1="25" x2="38" y2="25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="22" y1="31" x2="38" y2="31" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="26" cy="38" r="1.5" fill={color} />
      <circle cx="34" cy="38" r="1.5" fill={color} />
    </svg>
  );
}

function DecoObservatory({ size = 70, color = '#FF7043', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <rect x="10" y="45" width="40" height="5" fill={color} opacity="0.4" />
      <rect x="15" y="40" width="30" height="5" fill={color} opacity="0.4" />
      <rect x="20" y="25" width="20" height="15" fill="none" stroke={color} strokeWidth="2" />
      <path d="M20 25 Q30 15 40 25" fill="none" stroke={color} strokeWidth="2" />
      <rect x="26" y="28" width="3" height="4" fill={color} opacity="0.7" />
      <rect x="31" y="27" width="3" height="4" fill={color} opacity="0.7" />
    </svg>
  );
}

const DECO_MAP = {
  'caracol-estructura': [DecoObservatory, DecoGlyph, DecoMayaPyramid],
  'ventanas-astronomicas': [DecoVenusStar, DecoObservatory, DecoSerpent],
  'venus-ciclo': [DecoVenusStar, DecoGlyph, DecoObservatory],
  'precision-matematica': [DecoGlyph, DecoMayaPyramid, DecoVenusStar],
  'astronomos-mayas': [DecoSerpent, DecoGlyph, DecoObservatory],
  'orientacion-cardinal': [DecoMayaPyramid, DecoVenusStar, DecoObservatory],
  'legado-observatorio': [DecoObservatory, DecoSerpent, DecoGlyph],
};

const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Milbrath, S. (1999). Star Gods of the Maya: Astronomy in Art, Folklore, and Calendars, University of Texas Press',
  'Galindo Trejo, J. (2009). "Arqueoastronomía en la América Antigua", UNAM',
  'Ruggles, C. (2005). Ancient Astronomy: An Encyclopedia of Cosmologies and Myth, ABC-CLIO',
  'Bricker, V.R. & Bricker, H.M. (2011). Astronomy in the Maya Codices, American Philosophical Society',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'caracol-estructura',
    title: 'La Estructura',
    color: '#4CAF50',
    btnImage: '/assets/maya/infographic_m1/btn_caracol-estructura.jpg',
    image: '/assets/maya/infographic_m1/hero_caracol-estructura.jpg',
    content: [
      'Imagina una torre gigante de piedra que tiene la forma de un caparazón de caracol. En el centro de la antigua ciudad de Chichén Itzá, los mayas construyeron exactamente eso hace más de mil años, alrededor del año novecientos de nuestra era. Esta torre circular mide unos trece metros de altura y descansa firmemente sobre dos enormes plataformas rectangulares superpuestas. A diferencia de las famosas pirámides cuadradas que solemos ver en otros sitios, este edificio tiene una forma cilíndrica muy especial que se parece sorprendentemente a los observatorios astronómicos modernos que usan los científicos de hoy.',
      'El nombre "El Caracol" se lo dieron los exploradores españoles mucho tiempo después del abandono de la ciudad, no los arquitectos mayas originales. Lo llamaron de esta manera tan curiosa porque dentro de la sólida torre cilíndrica existe una escalera muy estrecha que sube dando vueltas apretadas, exactamente igual que la espiral calcárea dentro de la concha de un caracol marino. Esta escalera escondida permitía a los dedicados astrónomos subir hasta la oscura cámara superior, que era su cuarto de observación especial, lejos de las luces y ruidos.',
      'La construcción del Caracol fue un proyecto arquitectónico sumamente largo que tomó muchísimo tiempo y se realizó en varias etapas completamente diferentes. Imagina que construyes un castillo de bloques de juguete y luego decides agregarle nuevas torres encima para mejorarlo. Los investigadores arqueológicos descubrieron que los habilidosos constructores mayas modificaron la torre repetidamente durante muchas décadas, añadiendo grandes plataformas y cambiando su forma externa cuidadosamente para perfeccionar su función astronómica. Esta dedicación tenaz demuestra lo tremendamente importante que era este edificio para su cultura.',
      'En la parte más alta de la misteriosa torre de piedra, la cúpula original protectora ya no existe porque el duro paso del tiempo y la invasión de la selva espesa la destruyeron parcialmente, pero todavía quedan grandes partes de los muros macizos con pequeñas ventanas intrigantes. El diseño circular de la torre principal es ideal para un observatorio porque permite mirar libremente hacia cualquier dirección del horizonte abierto en un círculo completo de trescientos sesenta grados. En un edificio cuadrado, las esquinas macizas bloquearían tu vista inevitablemente.',
      'El edificio entero es, sin duda alguna, una maravilla asombrosa de la ingeniería antigua. Para sostener el tremendo peso de la altísima torre de piedra sólida, los ingeniosos arquitectos mayas inventaron un sistema de robustos anillos concéntricos en el oscuro interior, creando pasillos circulares abovedados que soportan inteligentemente la pesada estructura superior. Usaron un resistente mortero de cal blanca y piedras calcáreas talladas con una asombrosa precisión casi milimétrica, demostrando un conocimiento arquitectónico verdaderamente extraordinario para su época.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El oscuro interior del antiguo edificio tiene un intrincado pasillo circular que sorprendentemente crea un extraño efecto acústico muy notable. Si tú hablas en voz muy baja en un lado del pasillo curvo, la pared lisa de piedra refleja claramente el sonido hasta el lado opuesto. Los arqueólogos creen que era el lugar acústico perfecto para que los sumos sacerdotes se comunicaran secretamente en la penumbra.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La porosa piedra caliza blanca que usaron los trabajadores para construir laboriosamente El Caracol es sumamente absorbente y retiene mucha humedad tropical. Para proteger celosamente las paredes, los mayas originales cubrieron cuidadosamente todo el inmenso edificio con un grueso estuco liso pintado de un color rojo sangre intenso, para que resplandeciera bajo el inclemente sol de la península yucateca.' },
    ],
    fact: 'Aunque parece una torre completamente solitaria e independiente hoy en día para los turistas modernos, El Caracol originalmente estaba rodeado por numerosos incensarios humeantes y altas estelas talladas hermosamente. Los arqueólogos encontraron muchas evidencias claras de que justamente aquí se realizaban majestuosas ceremonias muy solemnes bajo la luz parpadeante de las estrellas nocturnas.',
  },
  {
    id: 'ventanas-astronomicas',
    title: 'Las Ventanas',
    color: '#FFD54F',
    btnImage: '/assets/maya/infographic_m1/btn_ventanas-astronomicas.jpg',
    image: '/assets/maya/infographic_m1/hero_ventanas-astronomicas.jpg',
    content: [
      'En la reducida parte superior de la torre del majestuoso Caracol queda una estrecha y pequeña cámara de observación que celosamente guarda el secreto científico más grande y fascinante de todo el edificio. Las paredes gruesas de esta singular habitación de piedra tienen aberturas profundas o ventanas muy estrechas que curiosamente parecen túneles apuntando directamente hacia direcciones geográficas extremadamente específicas en la lejanía. Estas angostas ventanas no servían para que simplemente entrara el aire fresco, sino que funcionaban exactamente como unos tubos de mira gigantescos y precisos.',
      'La ventana más estudiada y famosa del monumental Caracol está alineada asombrosamente y perfectamente con el lejano punto exacto del horizonte donde el resplandeciente planeta Venus se oculta lentamente durante su importante posición extrema hacia el norte astronómico. Imagina que tomas un largo tubo hueco de cartón y lo fijas firmemente al marco de la ventana de tu habitación para que solamente puedas ver una pequeña farola encendida específica de la calle oscura; los sabios mayas hicieron esto mismo pero utilizando bloques enormes de piedra pesada para capturar la escurridiza luz de Venus.',
      'Otra de las estrechas aberturas sumamente importantes dentro de la cámara apunta intencionalmente hacia la posición dorada del sol resplandeciente durante el atardecer exacto en el importante día del equinoccio. Durante los equinoccios anuales de primavera y de otoño, tanto el día luminoso como la noche oscura tienen exactamente la misma duración en todo el mundo entero. Los cuidadosos mayas usaban activamente esta precisa ventana solar para calibrar matemáticamente su indispensable calendario agrícola, sabiendo exactamente cuándo debían preparar febrilmente la tierra para sembrar el vital maíz.',
      'Además de rastrear cuidadosamente a Venus y al Sol deslumbrante, existe hoy suficiente evidencia científica de que otras líneas visuales creadas dentro de la ruinosa estructura superior también marcaban con exactitud los extremos de la misteriosa trayectoria nocturna de la Luna plateada. La Luna sigue un ciclo de movimiento mucho más errático y complejo que el del predecible Sol, subiendo y bajando lentamente en el vasto horizonte a lo largo de un larguísimo período de aproximadamente dieciocho años y medio.',
      'Lo verdaderamente más increíble y fascinante de estas famosas ventanas observacionales es su tremenda estrechez diseñada intencionalmente por los constructores. Las pequeñas aberturas son moderadamente anchas por dentro de la habitación pero se vuelven agudamente muy angostas hacia el cálido exterior, creando una línea visual sumamente restringida, canalizada y ultra precisa. Si la ventana original fuera ancha y grande, el margen de error del astrónomo sería indudablemente enorme, pero al hacerla tan increíblemente estrecha, el paciente observador solamente podía ver el astro luminoso deseado.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'De las muchísimas y variadas aberturas originales que ciertamente tenía la cámara de observación superior en su época de máximo esplendor, hoy en día lastimosamente solo sobreviven intactas tres valiosas ventanas debido principalmente a que el pesado techo abovedado de la torre de piedra colapsó inesperadamente hace ya varios siglos, aplastando los muros superiores irreparablemente.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La conocida ventana número uno del Caracol posee un mínimo error de alineación arquitectónica con respecto a la puesta calculada de Venus de apenas una diminuta fracción de grado angular. Lograr semejante nivel pasmoso de exactitud astronómica sin usar costosos telescopios de cristal europeo ni instrumentos metálicos o computadoras de cálculo modernas es considerado por los científicos actuales como un verdadero triunfo intelectual.' },
    ],
    fact: 'El uso astuto de aberturas arquitectónicas permanentes para medir confiablemente el paso astronómico del tiempo celeste se conoce técnicamente como "astronomía de horizonte visible". Los sabios mayas nunca dependieron de pequeños instrumentos portátiles de metal; su instrumento de medición principal era el horizonte geográfico natural y los macizos edificios gigantescos que diseñaban magistralmente.',
  },
  {
    id: 'venus-ciclo',
    title: 'El Ciclo de Venus',
    color: '#37474F',
    btnImage: '/assets/maya/infographic_m1/btn_venus-ciclo.jpg',
    image: '/assets/maya/infographic_m1/hero_venus-ciclo.jpg',
    content: [
      'Para los sabios antiguos y observadores mayas, el brillante planeta Venus era indiscutiblemente el objeto celeste más importante, poderoso y observado de todo el inmenso cielo nocturno profundo, superando con muchísima frecuencia incluso al propio Sol dorado y a la gran Luna plateada en su tremendo significado cultural y espiritual. Ellos conocían reverencialmente a Venus bajo el hermoso nombre de "Noh Ek", que traducido fielmente significa "La Gran Estrella". Y es verdaderamente el objeto estelar más brillante de la oscura noche.',
      'El misterioso ciclo visible de Venus es verdaderamente un patrón cósmico repetitivo fascinante y asombroso que dura casi exactamente quinientos ochenta y cuatro días terrestres. A este tiempo específico los astrónomos modernos le llaman el "período sinódico", que es justamente el largo tiempo que tarda el lento planeta en volver curiosamente a la mismísima posición original en el lejano cielo en relación directa con nuestro Sol incandescente, observado cuidadosamente desde nuestro propio y azul planeta Tierra.',
      'Los sumos sacerdotes y pacientes astrónomos de la grandiosa Chichén Itzá dedicaron ininterrumpidamente un inmenso esfuerzo monumental y agotador a registrar obsesivamente cada sutil aparición y misteriosa desaparición de Venus a lo largo de incontables años. Imagina simplemente tener que salir obligatoriamente cada madrugada oscura, silenciosa y fría, mucho antes de que cante el madrugador gallo, solamente para anotar minuciosamente en qué parte exacta del horizonte lejano aparece un pequeño punto de luz brillante sin fallar un solo día del año.',
      'El complejo movimiento cíclico de Venus estaba profunda e indisolublemente conectado y entrelazado con las grandes y arriesgadas decisiones políticas y militares de los altivos gobernantes mayas supremos. Ellos verdaderamente creían firmemente que algunas fases particulares del gran ciclo de la portentosa Estrella irradiaban inexplicablemente una temible energía destructiva, malévola y peligrosa hacia el vulnerable mundo humano terrestre. Por esta razón primordial, los estrategas reyes organizaban cuidadosamente sus sangrientas batallas.',
      'El extraordinario conocimiento astronómico maya sobre Venus estaba íntima y sorprendentemente ligado al continuo y asombroso desarrollo matemático de su calendario inmensamente sofisticado. El largo ciclo sinódico de quinientos ochenta y cuatro días puntuales de Venus se sincronizaba misteriosa y matemáticamente con su reverenciado calendario sagrado ritual de doscientos sesenta días (el venerado Tzolkin) y, al mismo tiempo exacto, con su calendario civil solar de trescientos sesenta y cinco días (el gran Haab).',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Debido a que la trayectoria de la órbita natural de Venus está considerablemente más cerca del poderoso Sol inmenso que la misma órbita de nuestra Tierra, Venus ciertamente tiene fases visibles que cambian paulatinamente, exactamente igual que los conocidos cuartos menguantes y crecientes de nuestra propia Luna. A veces es solo un fino hilo de brillante luz y otras veces parece un disco pleno.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El ciclo verdadero e ininterrumpido de Venus no dura matemáticamente exactamente los 584 días cerrados en números enteros absolutos, sino que dura aproximadamente unos exactos 583.92 días terrestres solares. Esta pequeñísima y aparente diferencia decimal insignificante de mínimas fracciones de día parecería no tener verdadera importancia inicial para los descuidados, pero a la larga desajusta todo el calendario drásticamente.' },
    ],
    fact: 'En la rica y colorida mitología general de casi todos los antiguos pueblos mesoamericanos importantes, el resplandeciente planeta Venus estaba profundamente y muy a menudo asociado de forma directa con la poderosa deidad de la serpiente emplumada sagrada, la cual era inmensamente venerada y ampliamente conocida majestuosamente como Kukulcán por los mayas yucatecos y Quetzalcóatl por los aguerridos aztecas.',
  },
  {
    id: 'precision-matematica',
    title: 'Precisión Matemática',
    color: '#26C6DA',
    btnImage: '/assets/maya/infographic_m1/btn_precision-matematica.jpg',
    image: '/assets/maya/infographic_m1/hero_precision-matematica.jpg',
    content: [
      'La habilidad indiscutiblemente más asombrosa y excepcional de los antiguos e intelectuales científicos mayas fue, sin lugar a ninguna duda, su extraordinaria capacidad innata para calcular larguísimos números astronómicos gigantescos con una asombrosa precisión matemática casi absolutamente perfecta, utilizando diariamente un sistema numérico escrito sumamente ingenioso, elegante y sorprendentemente minimalista. A diferencia de todos nosotros, que hoy usamos diez números basándonos naturalmente en contar nuestros diez dedos de las manos.',
      'Con estos tres maravillosos y sencillos símbolos dibujados, los meticulosos escribas y los brillantes matemáticos mayas podían sumar fácilmente y multiplicar larguísimas cifras inmensas que llegaban sobradamente hasta los múltiples millones y miles de millones imaginables. El asombroso descubrimiento intelectual del revolucionario número cero fue realmente un incalculable avance intelectual verdaderamente gigantesco que los sabios mayas lograron desarrollar independientemente muchísimos siglos de tiempo antes que los ilustres europeos.',
      'El verdadero y colosal reto matemático intelectual era el de calcular con máxima exactitud el incesante ciclo orbital del brillante planeta Venus sin cometer ni acumular jamás pequeños errores numéricos a lo largo del paso inexorable de los incontables siglos. Como mencionamos detalladamente antes, el riguroso ciclo sinódico astronómico moderno de Venus es de matemática y exactamente quinientos ochenta y tres punto noventa y dos largos días (583.92 precisos). Los prácticos mayas lógicamente redondearon inicialmente el ciclo a un manejable quinientos ochenta y cuatro.',
      'Para solucionar magistralmente este complejo problema aritmético astronómico de fracciones mínimas, los sabios matemáticos antiguos inventaron astutamente un brillante sistema correctivo de precisas correcciones matemáticas periódicas que es conceptual y funcionalmente casi idéntico a cómo nosotros empleamos ingeniosamente los conocidos años bisiestos modernos. Nosotros, diligentemente, simplemente agregamos un día extra en el corto mes de febrero cada cierto ciclo de cuatro años para arreglar matemáticamente nuestro calendario civil común.',
      'Gracias inmensamente a esta verdaderamente asombrosa y sutil corrección matemática milimétrica, el pequeñísimo margen de error residual del inmenso calendario cíclico de Venus pacientemente creado por los sabios mayas de la antigüedad era de apenas unas insignificantes y asombrosas dos cortas horas por cada larguísimo e ininterrumpido lapso de cuatrocientos ochenta y un años completamente transcurridos. Imagina, si puedes, tener en tu mano un reloj inmenso fabricado puramente con pesados bloques de dura piedra y hermosos símbolos cuidadosamente pintados que se atrasa tan poco tiempo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En el famosísimo e invaluable Códice de Dresde, que es sorprendentemente uno de los escasísimos y frágiles libros mayas originales antiguos que afortunadamente lograron sobrevivir a la terrible destrucción histórica hasta nuestros días modernos actuales, hay múltiples páginas enteras maravillosamente llenas de complejas tablas de números trazados y puntos pintados que predicen la enigmática aparición del escurridizo planeta Venus.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El complejo sistema maya de ingeniosa posición de los diversos números se escribía tradicional y rigurosamente de una inusual manera estrictamente vertical ascendente, desde el fondo inferior hacia arriba. La primera posición baja valía por sencillas unidades (multiplicado por un simple uno), la segunda línea superpuesta hacia arriba valía asombrosamente por veintenas exactas (multiplicado por un robusto veinte), y la tercera por cuatrocientos.' },
    ],
    fact: 'La brillante introducción matemática del fundamental concepto abstracto del número cero absoluto, verdaderamente, no fue solo un triunfo utilitario para contar rápidamente montones de frijoles o contar suculentas mazorcas de maíz amarillo; fue inmensamente una necesidad puramente filosófica cósmica y también estrictamente científica, para poder indagar profundamente sobre el propio origen lejano y remoto de todo el universo observable.',
  },
  {
    id: 'astronomos-mayas',
    title: 'Los Astrónomos',
    color: '#FF7043',
    btnImage: '/assets/maya/infographic_m1/btn_astronomos-mayas.jpg',
    image: '/assets/maya/infographic_m1/hero_astronomos-mayas.jpg',
    content: [
      'Los sumamente sabios astrónomos de la compleja e intrigante sociedad maya verdaderamente no eran los típicos científicos comunes y corrientes encerrados herméticamente en un aburrido laboratorio moderno, sino que eran unos reverenciados sacerdotes inmensamente poderosos y sumamente importantes ampliamente conocidos en su idioma original como "ah kin", que traducido fiel y literalmente significa "el sabio del sol resplandeciente" o "el poderoso guardián de los días fugaces". Estos intelectuales y especialistas privilegiados pertenecían directamente a la altiva nobleza.',
      'Convertirse verdaderamente en un maestro astrónomo maya consumado y completamente respetado requería innegablemente de inagotables y largas décadas de un estudio académico profundamente riguroso y de una disciplina personal inquebrantable, severa y constante. Los jóvenes y esforzados aprendices dedicados pasaban largos y arduos años de su vida pacientemente memorizando intensamente los repetitivos ciclos de los lejanos astros deslumbrantes, aprendiendo arduamente a leer fluidamente y a pintar hermosamente los extraordinarios y muy complejos jeroglíficos antiguos de sus antepasados.',
      'Toda la inmensa cantidad de valiosísima información recolectada asiduamente por los pacientes y meticulosos astrónomos era considerado innegablemente como el recurso intelectual y estratégico más sagrado y valioso de todo el imperio, siendo mucho más valioso e importante incluso que el puro oro reluciente o el verde jade precioso que tanto adoraban. Los supremos reyes imperiales y los astutos gobernantes territoriales dependían absolutamente y de forma totalmente incondicional del sabio y meditado consejo celestial de estos reverenciados sacerdotes de la alta cúpula del cielo inmenso.',
      'Todo este incalculable conocimiento científico milenario acumulado pacientemente se registraba siempre muy cuidadosamente e ilustradamente en unos libros exquisitos y hermosos popularmente llamados códices antiguos. Estos notables libros plegables no estaban torpemente hechos de papel común y corriente normal, sino que se elaboraban artísticamente con unas tiras larguísimas y continuas de fibrosa corteza extraída del árbol sagrado de amate y que después se aplanaban cuidadosamente con duras piedras redondeadas, se cubrían elegantemente con una delicada capa fina de blanco estuco calcáreo puro.',
      'Trágicamente y de forma sumamente lamentable para toda la humanidad actual, la inmensa y rica mayoría de esta fabulosa y exquisita biblioteca astronómica antigua se perdió irremisiblemente y para siempre jamás de la faz de la tierra. Durante la convulsa conquista española acontecida en el turbulento siglo dieciséis, lamentablemente muchos de estos valiosísimos y únicos libros de insustituible ciencia maya fueron sistemática y tristemente quemados arrojándolos al fuego devorador porque los celosos y sorprendidos exploradores extranjeros simplemente no comprendieron jamás su valor inmenso.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los antiguos e ingeniosos astrónomos mayas usaban frecuentemente una práctica herramienta observacional muy simple rudimentaria pero que resultaba ser increíble y absolutamente efectiva para su riguroso propósito: esta herramienta simplemente consistía en un simple par de sólidas varas rectas de gruesa madera natural firmemente cruzadas que miraban atentamente desde el seguro umbral de una puerta muy oscura en la silenciosa madrugada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La rigurosa y muy metódica astronomía observacional maya es indiscutiblemente un tipo muy específico de "astronomía posicional pura". Mientras los curiosos científicos modernos actuales intentan afanosamente entender desesperadamente de qué rara materia misteriosa y exótica están hechas verdaderamente las brillantes estrellas y por qué brillan incandescentemente (esto es la astrofísica moderna y teórica general), los antiguos sabios se enfocaban solo en la posición exacta.' },
    ],
    fact: 'En las hermosísimas y sumamente coloridas pinturas de los inmensos murales mayas antiguos finamente detallados, a los sabios y reverenciados astrónomos siempre se les reconoce muy fácilmente e inmediatamente debido a que casi invariablemente llevan siempre sus imprescindibles herramientas de dedicado escriba intelectual apretadas fuertemente en sus hábiles y muy talentosas manos artísticas.',
  },
  {
    id: 'orientacion-cardinal',
    title: 'Orientación',
    color: '#3F51B5',
    btnImage: '/assets/maya/infographic_m1/btn_orientacion-cardinal.jpg',
    image: '/assets/maya/infographic_m1/hero_orientacion-cardinal.jpg',
    content: [
      'Una de las características verdaderamente más sorprendentes y sumamente desconcertantes inicialmente de la famosa torre del Caracol en las majestuosas ruinas de Chichén Itzá es, sin lugar a ninguna duda razonable, su curiosa posición y su aparente alineación asimétrica con el indiscutible respeto riguroso al resto grandioso de la imponente e inmensa gran ciudad antigua de piedra. Si tú, por casualidad curiosa, miras atentamente un moderno mapa fotográfico aéreo de altísima resolución de toda la inmensa zona arqueológica selvática circundante en su totalidad.',
      'Este giro inusual, marcadamente intencional, calculado y deliberado, definitivamente no fue de ninguna manera un torpe error accidental de los antiguos constructores mayas, ni tampoco fue un simple accidente provocado por la irregular topografía del duro terreno rocoso yucateco debajo de la edificación. Los increíblemente ingeniosos y astutos ingenieros arquitectónicos mayas alinearon intencional y meticulosamente toda la inmensa estructura calcárea del pesado edificio circular, desde la imponente base inferior rectangular, para alinearla matemáticamente a las precisas estrellas.',
      'Construir tenazmente un inmenso edificio arquitectónico gigantesco, conformado sólidamente por miles y miles de pesadas toneladas métricas de masiva roca sólida compactada con argamasa rústica, siguiendo fiel y únicamente el lentísimo e imperceptible movimiento casi sutil de un minúsculo planeta lejano parpadeante, es, innegablemente y sin exageración alguna, una ardua tarea arquitectónica sumamente titánica, colosal y desafiante de realizar a la perfección sin fallos. Esto simplemente significa, en términos sumamente prácticos y reales, que antes de mover la roca inicial, debieron investigar minuciosamente el sitio elegido para ello.',
      'Esta peculiar, excéntrica y extrañísima orientación rotada demuestra de forma muy contundente que para los devotos y antiguos habitantes ciudadanos de la inmensa Chichén Itzá, el sagrado espacio celestial superior inalcanzable y el ruidoso espacio urbano terrestre cotidiano se encontraban siempre íntima, profunda e indisolublemente unidos fundiéndose en uno solo, sin ninguna barrera invisible intermedia que pudiera separarlos permanentemente de la experiencia terrenal humana en un momento dado.',
      'Además de rastrear diligentemente esta asombrosa e impecable línea recta principal dirigida incansablemente y obsesivamente a la brillante estrella resplandeciente de Venus matutina y vespertina, las amplias diagonales geométricas extendidas de la inmensa y plana plataforma inferior empedrada apuntan milagrosamente y en simultáneo hacia otras sorprendentes posiciones astronómicas de innegable y tremenda importancia ritual y práctica utilitaria a lo largo y ancho del horizonte visible; tales como las importantísimas salidas luminosas del sol ardiente exactamente en los ansiados solsticios de verano y de puro calor estival.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La curiosa y matemática desviación rotatoria de unos precisos veintisiete grados decimales asimétricos del gran Caracol contrasta muy fuertemente y de forma dramática con el otro enorme y más famoso edificio central principal de toda la populosa Chichén Itzá: la famosísima y grandiosa pirámide de Kukulkán. Esa pirámide imponente tiene una rotación diferente orientada para la sombra equinoccial.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Para lograr localizar asombrosamente y con inmensa exactitud astronómica el preciso "norte verdadero" inamovible y geográfico fundamental de la inmensa tierra redonda (que es exactamente el invisible eje rotatorio inamovible de giro constante del planeta terráqueo) sin disponer nunca jamás de tener eficientes brújulas metálicas magnéticas elaboradas ni en la lejana China antigua ni por los navegantes marineros europeos modernos que las popularizaron globalmente después del renacimiento humanista, los observadores dependían estrictamente del sol incesante.' },
    ],
    fact: 'Muchos de los grandiosos y ancestrales observatorios celestes e instrumentos astronómicos megalíticos que salpican misteriosamente diversas zonas del amplio mundo antiguo civilizado, desde las ventosas y áridas llanuras desérticas remotas de las amplias Américas indómitas hasta las soleadas y rocosas islas rodeadas del azulado y espumoso mar embravecido del Mediterráneo profundo europeo o asiático, comparten extrañamente este rasgo inconfundible asimétrico de estar alineados con un orden invisible y esotérico a nuestros cansados ojos urbanitas de las cuadrículas estrictas modernas.',
  },
  {
    id: 'legado-observatorio',
    title: 'El Legado',
    color: '#FFC107',
    btnImage: '/assets/maya/infographic_m1/btn_legado-observatorio.jpg',
    image: '/assets/maya/infographic_m1/hero_legado-observatorio.jpg',
    content: [
      'El magnífico observatorio del gran Caracol de piedra sólida erigido en la grandiosa urbe maya y antigua de la reverenciada Chichén Itzá, de manera indudable, no es bajo ningún punto de vista y en ninguna circunstancia simplemente una bonita ruina turística inerte cubierta permanentemente de polvo gris y silenciosa. En realidad, muy por el contrario, es sin duda indiscutible alguna uno de los inigualables monumentos científicos más impresionantes, gloriosos e importantes construidos de la antigüedad misteriosa y gloriosa en el complejo e inmenso mundo entero.',
      'A pesar irremediable de que verdaderamente todas estas sumamente grandes y gloriosas civilizaciones antiguas constructoras de observatorios estaban inevitable y tristemente separadas por muy vastos y profundos océanos infranqueables tempestuosos, y aisladas por larguísimos y solitarios miles de años lentos de distancia de la agitada historia humana compartida, paradójicamente todas y cada una de ellas compartían en su solitario fuero interior un profundo, constante e innegable deseo humano, profundamente conmovedor y universal, que ardía intensamente en ellos por siempre y para siempre de forma persistente y asombrosa.',
      'Hoy en día innegablemente actual y afortunado, toda la inmensa, fascinante, y verdaderamente sagrada e importantísima ciudad de piedra antigua blanca y reluciente al sol radiante de Chichén Itzá entera y unida indisolublemente, y de forma muy obvia y por supuesto innegable y lógica también, la mismísima torre cilíndrica ruinosa pero inmensamente sabia y gloriosa del famoso Caracol mágico e imponente resguardada y anidada en el mismísimo y denso centro espiritual antiguo urbano de toda esta fantástica y grandiosa metrópoli cosmopolita maya precolombina de imponentes dimensiones increíbles.',
      'El riquísimo legado intelectual milenario inestimable y valiosísimo heredado indiscutiblemente e inolvidablemente de la asombrosa observación minuciosa efectuada desde El Caracol venerable y misterioso, nos enseña continuamente una inmensa y vital lección verdaderamente valiosa, profunda y absolutamente transcendental acerca de la importancia de observar la bóveda celestial nocturna estelar y estrellada. De cómo indiscutiblemente la imperturbable paciencia de piedra forjada en persistencia y disciplina es capaz verdaderamente y milagrosamente de sobreponerse victoriosa al inexorable y aplastante paso del tiempo destructor devorador.',
      'Cada vez maravillosa y fascinante que un dedicado científico contemporáneo actual y moderno, rebosante de entusiasmo persistente por aprender, levanta ávidamente y con gran curiosidad su escrutadora vista incesante investigadora y hábilmente usa, para ver a lo lejos insondable, su gigantesco telescopio espacial robótico inmenso fabricado en la tierra giratoria, lleno maravillosamente hasta el borde rebosante de sofisticados sensores fotográficos avanzados digitales ultra precisos, complejos engranajes diminutos precisos mecánicos eficientes y delicados espejos metálicos, su esfuerzo se equipara a los mayas astronómicos de Mesoamérica.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'A las muy postrimerías históricas nubladas de casi finales del inmenso y transformador e industrializado siglo diecinueve acelerado, una valiente e inmensa gran expedición de dedicados y tercos arqueólogos internacionales extranjeros increíblemente sudorosos y laboriosos tuvo que afanosa y manualmente, con grandes esfuerzos penosos musculares sostenidos sin cesar y utilizando filosos machetes brillantes, limpiar con enorme y delicado cuidado respetuoso meticuloso exhaustivo pero inmenso toda la tremenda y exuberante vegetación tropical asfixiante densísima inagotable húmeda enredada fuertemente verde oscuro.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La moderna e interesantísima gran rama floreciente multidisciplinar compleja y asombrosa académica rigurosísima de investigación científica rigurosa y matemática llamada la prestigiosísima arqueoastronomía global integradora analítica (que es indiscutiblemente la fascinante disciplina integradora empírica mixta rigurosa y exacta de las ciencias observacionales que asiduamente estudia diligentemente con el máximo rigor inquebrantable absoluto estricto matemático e inamovible incuestionable verificado, cómo ineludiblemente las complejas civilizaciones antiguas humanas entendían su cosmos inmenso misterioso insondable estrellado).' },
    ],
    fact: 'El amplísimo e inmensamente merecido y necesario gran reconocimiento público general mundial popular creciente indetenible e innegable absoluto certero total definitivo histórico mundial de toda la extremadamente muy avanzada ciencia astronómica precolombina misteriosa insondable inquebrantable brillante observacional antigua sagrada y de su indiscutible precisión increíble matemática absoluta incondicional maravillosa insólita arquitectónica inamovible firme maciza y sólida del gloriosísimo e inolvidable poderoso y tremendo imperio y red urbana interconectada esplendorosa vibrante bulliciosa maya antigua yucateca ha contribuido a erradicar prejuicios y sesgos históricos.',
  },
];

// ─── Temporal Particle Field (Canvas Background) ──────────────────────────────
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
      hue: Math.random() > 0.5 ? '76,175,80' : '255,213,79', // jade or gold
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

// ─── Maya Header ──────────────────────────────────────────────────────
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(76,175,80,0.3))' }}>
        {/* Maya stepped arch */}
        <path d="M 50 110 L 100 110 L 100 80 L 150 80 L 150 50 L 450 50 L 450 80 L 500 80 L 500 110 L 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const positions = [
            {cx: 50, cy: 110}, {cx: 100, cy: 80}, {cx: 150, cy: 50}, 
            {cx: 300, cy: 50}, 
            {cx: 450, cy: 50}, {cx: 500, cy: 80}, {cx: 550, cy: 110}
          ];
          const colors = ['#4CAF50','#FFD54F','#37474F','#26C6DA','#FF7043','#3F51B5','#FFC107'];
          const pos = positions[i];
          return (
            <motion.circle key={i} cx={pos.cx} cy={pos.cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" />
        <path d="M300 20 L303 27 L310 30 L303 33 L300 40 L297 33 L290 30 L297 27 Z" fill="#4CAF50" opacity="0.5" />
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(76,175,80,0.9)" />
            <stop offset="100%" stopColor="rgba(76,175,80,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">EL CARACOL</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.7)" fontSize="11" fontFamily="monospace" letterSpacing="2">OBSERVATORIO DE VENUS EN CHICHÉN ITZÁ</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ─────────────────────────
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
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
        fontSize: '0.78rem',
        fontWeight: 700,
        letterSpacing: '0.3px',
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
          layoutId="activeDotMayaM1"
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800,
            color: node.color, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <span style={{
              display: 'inline-flex', width: '40px', height: '40px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${node.color}40`,
              flexShrink: 0,
            }}>
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
                position: 'absolute',
                ...pos,
                zIndex: 1,
                pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px',
                  background: node.color, color: '#0B0E2D',
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
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <h4 style={{
              fontSize: '1rem', color: '#FFF', margin: '0 0 1rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} style={{ color: node.color }} /> Exploración Profunda
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {node.expandables.map((item, i) => (
                <ExpandableSection key={i} item={item} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Did You Know Footer ─── */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          borderRadius: '16px',
          background: `linear-gradient(90deg, ${node.color}15, transparent)`,
          border: `1px solid ${node.color}25`,
          display: 'flex',
          gap: '1rem',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 2,
        }}>
          <div style={{
            background: node.color, borderRadius: '50%', padding: '0.6rem',
            boxShadow: `0 0 15px ${node.color}40`, flexShrink: 0,
          }}>
            <Sparkles size={20} color="#0B0E2D" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.5rem', color: node.color, fontSize: '1rem', fontWeight: 700 }}>El Dato Extraordinario</h4>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {node.fact}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ nodes, exploredIds, onSelect }) {
  const progress = (exploredIds.length / nodes.length) * 100;

  return (
    <div style={{
      marginTop: '3rem',
      background: 'rgba(10, 12, 30, 0.6)',
      backdropFilter: 'blur(12px)',
      borderRadius: '24px',
      padding: '1.5rem 2rem',
      border: '1px solid rgba(76,175,80,0.2)',
      position: 'relative',
      zIndex: 2,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={18} color="#4CAF50" /> Progreso de Exploración
        </h4>
        <div style={{
          background: 'rgba(76,175,80,0.15)', padding: '0.3rem 0.8rem',
          borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700,
          color: '#4CAF50', border: '1px solid rgba(76,175,80,0.3)',
        }}>
          {exploredIds.length} / {nodes.length} Nodos
        </div>
      </div>

      <div style={{ position: 'relative', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'visible' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4CAF50, #FFD54F)',
            borderRadius: '3px',
            boxShadow: '0 0 10px rgba(76,175,80,0.5)',
          }}
        />
        <div style={{
          position: 'absolute', top: '50%', left: 0, width: '100%',
          display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)',
          pointerEvents: 'none',
        }}>
          {nodes.map((n, i) => {
            const isExplored = exploredIds.includes(n.id);
            return (
              <motion.button
                key={n.id}
                onClick={() => onSelect(n)}
                whileHover={{ scale: 1.2 }}
                style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: isExplored ? n.color : '#1A1D36',
                  border: `2px solid ${isExplored ? '#fff' : 'rgba(255,255,255,0.2)'}`,
                  cursor: 'pointer', pointerEvents: 'auto',
                  boxShadow: isExplored ? `0 0 10px ${n.color}` : 'none',
                  transition: 'all 0.3s',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function InteractiveInfographic_MayaM1() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [exploredIds, setExploredIds] = useState([]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const handleNodeClick = (node) => {
    setActiveNodeId(activeNodeId === node.id ? null : node.id);
    if (!exploredIds.includes(node.id)) setExploredIds(prev => [...prev, node.id]);
  };

  const activeNode = INFOGRAPHIC_NODES.find(n => n.id === activeNodeId);

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#04050A',
      color: '#fff',
      padding: '2rem 1rem 4rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <TemporalField />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <MayaHeader />

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 2,
          padding: '2rem 0',
        }}>
          {INFOGRAPHIC_NODES.map((node, idx) => (
            <NodeButton
              key={node.id}
              node={node}
              index={idx}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node)}
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

        <ProgressBar
          nodes={INFOGRAPHIC_NODES}
          exploredIds={exploredIds}
          onSelect={(n) => {
            setActiveNodeId(n.id);
            if (!exploredIds.includes(n.id)) setExploredIds(prev => [...prev, n.id]);
          }}
        />

        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.02)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Fuentes Científicas y Bibliografía
          </h4>
          <ul style={{
            listStyle: 'none', padding: 0, margin: 0,
            display: 'flex', flexDirection: 'column', gap: '0.5rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{bib}</li>
            ))}
          </ul>
        </div>
      </div>

      <ImageLightbox
        src={lightboxSrc}
        alt="Maya Infographic Visual"
        onClose={() => setLightboxSrc(null)}
      />
    </div>
  );
}
