'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya Venus / War themed) ────────────────────────────
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
  'noh-ek': [DecoVenusStar, DecoHorizonMarker, DecoDresdenPage],
  'ciclo-sinodico': [DecoDresdenPage, DecoVenusStar, DecoFeatheredSerpent],
  'tabla-dresde': [DecoDresdenPage, DecoVenusStar, DecoHorizonMarker],
  'guerra-estelar': [DecoWarShield, DecoVenusStar, DecoFeatheredSerpent],
  'kukulkan-venus': [DecoFeatheredSerpent, DecoVenusStar, DecoWarShield],
  'observacion-tecnicas': [DecoHorizonMarker, DecoVenusStar, DecoDresdenPage],
  'legado-venusino': [DecoVenusStar, DecoDresdenPage, DecoFeatheredSerpent],
};

const BIBLIOGRAPHY = [
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
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
      'Imagina que miras el cielo nocturno y ves un punto brillante que destaca sobre todos los demás, tan luminoso que casi parece una lámpara lejana. Para los antiguos astrónomos mayas, este punto deslumbrante no era simplemente una luz bonita, sino "Noh Ek", que significa "La Gran Estrella". Este objeto celeste es lo que nosotros llamamos el planeta Venus. A diferencia de las estrellas normales que tintinean, Venus brilla con una luz constante y poderosa, siendo el tercer objeto más brillante de nuestro cielo, solo superado por el Sol y la Luna. Para la civilización maya, su brillo no era señal de paz, sino una advertencia de inmenso poder cósmico.',
      'Noh Ek tenía una identidad doble verdaderamente fascinante, como si fuera un superhéroe con una identidad secreta que cambia según el momento del día. A veces aparecía justo antes del amanecer, anunciando majestuosamente la llegada del Sol. En esta espectacular forma matutina, lo llamaban "Ah Chicum Ek", la gran estrella de la mañana. Pero otras veces, desaparecía misteriosamente por semanas y luego regresaba al anochecer, justo después de que el Sol se ocultaba. Hoy en día sabemos gracias a la ciencia moderna que es exactamente el mismo planeta orbitando alrededor del Sol, pero los mayas entendieron esta fascinante dualidad como una transformación profundamente sagrada.',
      'Para entender exactamente cómo los mayas veían a Venus, imagina que el planeta es como un atleta olímpico muy veloz corriendo en una pista interior circular, mientras que la Tierra corre simultáneamente en la pista exterior más grande. Como la pista interior es notablemente más corta y Venus corre a mayor velocidad, a veces nos alcanza velozmente y nos rebasa por completo. Cuando Venus está de un lado del gigantesco Sol, lo vemos brillante al amanecer; cuando está del otro extremo, lo vemos al atardecer. Los astrónomos mayas, utilizando únicamente sus propios ojos y su tremenda e inagotable paciencia, lograron registrar meticulosamente estos complejos movimientos con una exactitud que todavía hoy asombra profundamente a los científicos más modernos.',
      'En la inmensa cultura maya, la repentina aparición de Noh Ek como deslumbrante estrella de la mañana era un momento de grandísima tensión y extremo peligro. Creían fielmente que sus primeros rayos de luz cortante eran exactamente como lanzas afiladísimas o flechas cósmicas mortales que golpeaban agresivamente a la Tierra. Estos temibles "rayos-flecha" eran considerados sumamente peligrosos por todos, ya que se creía que eran perfectamente capaces de dañar severamente las delicadas cosechas, enfermar gravemente a los poderosos gobernantes y decidir fatalmente el destino final de las sangrientas batallas. Por esta precisa razón, los sacerdotes y reyes vigilaban el cielo con extrema y constante atención.',
      'La tremenda fascinación maya por Noh Ek no era de ninguna manera un simple pasatiempo de unos cuantos astrónomos aislados en sus altas pirámides; era en realidad un pilar absolutamente fundamental de toda su grandiosa civilización. La precisa posición de la Gran Estrella dictaba inexorablemente cuándo debían realizar importantes rituales, en qué momento coronar a un flamante y nuevo rey y, de manera muy especial y sangrienta, cuándo iniciar devastadores conflictos militares contra otras ciudades. Venus era el exacto reloj celestial que marcaba implacablemente el ritmo de la política y el poder en el agitado mundo maya. Al dominar el complejo conocimiento de sus impredecibles movimientos, los astutos gobernantes mayas demostraban públicamente que tenían el total favor de los dioses.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El brillo de Venus es tan intenso porque está completamente cubierto de nubes de ácido sulfúrico altamente reflectantes. Estas nubes funcionan como un espejo gigante que refleja el 70% de la luz solar que recibe. Para los mayas, este brillo sobrenatural era evidencia irrefutable de la presencia divina y el inmenso poder de la estrella matutina que lanzaba sus temidos rayos destructivos hacia el mundo humano.' },
      { label: 'El Gemelo Divino', icon: 'zap', text: 'En el famoso Popol Vuh, el gran libro sagrado de los mayas, la historia de los Héroes Gemelos, Hunahpú e Ixbalanqué, está estrechamente relacionada con el ciclo de Venus y el Sol. Cuando finalmente derrotan a los siniestros señores del oscuro inframundo de Xibalbá, ascienden victoriosos al firmamento para convertirse nada menos que en el Sol brillante y la resplandeciente estrella de Venus, iluminando el universo.' },
    ],
    fact: 'A pesar de no contar con ningún tipo de telescopio óptico ni instrumentos modernos de medición de precisión, los astrónomos mayas calcularon el ciclo de Venus en exactamente 584 días. ¡La cifra astronómica científica real y moderna es de 583.92 días! Esta diferencia es de apenas unas insignificantes horas. Su asombroso cálculo tenía un porcentaje de error increíblemente diminuto de menos de una décima de porcentaje, logrado observando incansablemente desde sus elevadas pirámides de piedra durante varias generaciones.',
  },
  {
    id: 'ciclo-sinodico',
    title: 'Ciclo Sinódico: La Danza Cósmica',
    color: '#FFD600',
    btnImage: '/assets/maya/infographic_m7/btn_ciclo-sinodico.jpg',
    image: '/assets/maya/infographic_m7/hero_ciclo-sinodico.jpg',
    content: [
      'Imagina que dos corredores profesionales dan vueltas incansablemente alrededor de un gigantesco estadio, uno corriendo siempre por la pista interior y el otro manteniéndose en la pista exterior. El tiempo exacto que tardan en volver a encontrarse perfectamente alineados en la misma línea de salida es lo que los modernos astrónomos llaman un espectacular "ciclo sinódico". Para el misterioso planeta Venus y nuestra querida Tierra, esta gigantesca carrera espacial dura exactamente 584 días. Los observadores mayas estudiaron meticulosamente cada fase de esta compleja competencia cósmica durante muchísimos años, registrando apasionadamente cada detalle.',
      'Los antiguos mayas, siendo verdaderos genios de la observación matemática, dividieron este gigantesco ciclo cósmico de 584 días en cuatro importantes y distintas etapas visuales. Primero, la deslumbrante estrella de la mañana brillaba durante 236 días continuos. Luego desaparecía misteriosamente en el ardiente resplandor del Sol durante unos rápidos 90 días, un tiempo que los mayas asociaban temerosamente con un oscuro viaje por el inframundo. Después reaparecía gloriosamente como la estrella del atardecer durante unos prolongados 250 días. Finalmente, desaparecía de nuevo, esta vez durante apenas 8 angustiosos días, justo antes de renacer espectacularmente al amanecer.',
      'Pero el verdadero e impresionante secreto mágico matemático de los astrónomos mayas radicaba en la fabulosa "conmensurabilidad". Imagina tratar de sincronizar dos enormes engranajes giratorios de diferente tamaño. Descubrieron algo alucinante: si tomas exactamente cinco ciclos completos de Venus (5 veces 584 días) y los sumas, obtienes nada menos que 2,920 días. Y asombrosamente, si tomas ocho años solares completos (8 veces 365 días), ¡también obtienes la misma exacta cifra de 2,920 días! Esta perfecta sincronización matemática era considerada como un mensaje directo y sagrado de los propios dioses del universo.',
      'Esta asombrosa equivalencia astronómica donde 5 ciclos venusinos son idénticos a 8 ciclos solares significaba que cada ocho años, el temible planeta Venus volvía a aparecer exactamente en la misma idéntica posición en el firmamento y también en el mismo exacto día del calendario solar de 365 días conocido como Haab. Para los antiguos gobernantes mayas, este importante aniversario de ocho años era un momento ceremonial inmensamente poderoso, un momento crítico donde los ciclos eternos del tiempo se alineaban perfectamente. Celebraban enormes festivales para asegurar que el intrincado mecanismo del universo continuara funcionando sin fallos ni desastres.',
      'Este fantástico conocimiento de la profunda sincronización cósmica no era solamente una curiosidad teórica o matemática. Los mayas utilizaban intensamente estos ciclos de conmensurabilidad para planificar con extrema antelación importantes eventos fundamentales en sus grandiosas vidas. Si un respetado rey deseaba asegurar su victoria en una próxima guerra, o si los sacerdotes necesitaban garantizar que sus complejas ceremonias agrícolas tuvieran éxito, recurrían siempre a la precisa danza matemática de Venus y la Tierra. Para ellos, la exacta y rigurosa matemática celestial era verdaderamente el lenguaje divino que regía el destino inexorable de la entera humanidad.',
    ],
    expandables: [
      { label: 'El Gran Ciclo', icon: 'atom', text: 'Además de sincronizar brillantemente a Venus con el candente Sol, los mayas conectaron mágicamente estos 2,920 días asombrosos con su sagrado calendario adivinatorio de 260 días llamado Tzolkín. Así descubrieron que 65 ciclos del Tzolkín (65 x 260) también son exactamente 16,900 días, lo que equivale milagrosamente a 65 años rituales y sincroniza de nuevo de manera impecable el Sol, Venus y el calendario espiritual, demostrando la complejidad de su sistema.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante el temible periodo de desaparición de 8 días de Venus, conocido como la conjunción inferior (cuando pasa justo entre la Tierra y el cálido Sol), los mayas consideraban que el planeta estaba físicamente muerto y sufriendo espantosas transformaciones agonizantes en lo más profundo del peligroso inframundo oscuro. Creían que en la oscuridad, la deidad se despojaba de su piel para resurgir furiosa.' },
    ],
    fact: 'El conocimiento del ciclo exacto de Venus de 584 días era una información astronómica de la más alta seguridad de estado en el mundo maya. Las precisas tablas venusinas no eran accesibles en absoluto para el ciudadano común y corriente. Solamente un grupo altamente exclusivo y selecto de sacerdotes matemáticos y el mismísimo ajaw (el poderoso rey maya) tenían el privilegio sagrado de aprender, resguardar y utilizar este importantísimo secreto celestial para dominar el tiempo y su pueblo.',
  },
  {
    id: 'tabla-dresde',
    title: 'Las Tablas de Venus: El Códice de Dresde',
    color: '#0288D1',
    btnImage: '/assets/maya/infographic_m7/btn_tabla-dresde.jpg',
    image: '/assets/maya/infographic_m7/hero_tabla-dresde.jpg',
    content: [
      'Imagina un antiguo y delicado libro plegable elaborado finamente con corteza de árbol sagrado de amate, pintado brillantemente con hermosos jeroglíficos y números misteriosos. Esto es exactamente el Códice de Dresde, uno de los poquísimos y valiosísimos libros mayas antiguos que lograron sobrevivir trágicamente a la destructiva y lamentable quema de documentos durante la colonización española. En sus extraordinarias páginas 24 y de la 46 a la 50, este antiguo manuscrito contiene las increíblemente famosas "Tablas de Venus", una obra maestra absoluta del intelecto y el cálculo humano de toda la historia antigua.',
      'Estas espectaculares y detalladas páginas no son simples decoraciones hermosas; en realidad funcionan como una complejísima y avanzada hoja de cálculo astronómica creada mucho antes que las modernas computadoras. En sus meticulosas filas y columnas de números representados elegantemente con barras (valor 5) y puntos (valor 1), los sabios mayas proyectaron minuciosamente los movimientos futuros exactos de la brillante estrella Noh Ek. Estas precisas tablas predicen exitosamente la posición de Venus a lo largo de un asombroso periodo continuo de 104 años, es decir, ¡un total asombroso de más de 37,960 días consecutivos anotados!',
      'Para que verdaderamente comprendas el inmenso genio matemático contenido en este frágil libro, debes saber que el verdadero ciclo astronómico real de Venus no es un número entero exacto, sino que dura específicamente unos rebeldes 583.92 días. Aunque los mayas utilizaban genialmente el número redondo de 584 días para simplificar sus cálculos ceremoniales y diarios, ellos sabían a la perfección que ese pequeño sobrante molesto de 0.08 días se iría acumulando gradualmente y terminaría arruinando completamente todas y cada una de sus cuidadosas predicciones celestiales si no lo solucionaban pronto.',
      '¿Qué hicieron entonces los geniales sabios? Como hábiles programadores modernos reparando un minúsculo pero grave error en el código de un software, introdujeron inteligentísimas "correcciones y ajustes" ocultos dentro del Códice de Dresde. Similar a cómo nosotros agregamos ingeniosamente los divertidos años bisiestos de 366 días en nuestro propio calendario moderno para mantener todo correctamente sincronizado con las estaciones terrestres, las tablas mayas ordenaban minuciosamente restar sistemáticamente ciertos días cada cierto largo periodo de años para mantener la absoluta y sagrada precisión divina sin ningún error perceptible.',
      'El detallado nivel visual contenido en estas páginas asombra enormemente. Junto con los complejos números calendáricos abstractos, hay pinturas detalladas de una feroz y temible deidad de Venus armada letalmente con filosas lanzas afiladas, que aparece hiriendo violentamente a diferentes e indefensas víctimas terrenales (animales sagrados o deidades menores) que representan claramente distintos momentos críticos de la temporada del calendario agrícola. El Códice no era solo una asombrosa tabla numérica astronómica, sino un importantísimo manual de supervivencia mística que indicaba exactamente cuándo proteger el mundo.',
    ],
    expandables: [
      { label: 'El Descubrimiento', icon: 'zap', text: 'El invaluable Códice de Dresde adquirió su curioso nombre europeo porque curiosamente terminó almacenado en la biblioteca real de la ciudad de Dresde, en el país de Alemania. Fue el brillante y dedicado erudito alemán Ernst Förstemann, quien trabajaba allí como humilde bibliotecario a fines de los años 1800s, quien finalmente logró descifrar increíblemente la complejísima sección matemática dedicada al planeta Venus tras años de esfuerzo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las detalladas predicciones astronómicas plasmadas en el antiguo Códice de Dresde son verdaderamente tan exactas y perfectas matemáticamente que, incluso si decidiéramos usarlas rigurosamente el día de hoy sin modificaciones, su porcentaje de exactitud de predicción para determinar cuándo reaparecerá Venus superaría asombrosamente el altísimo 99% de precisión. ¡Y esto con tecnología de hace mil años!' },
    ],
    fact: 'El antiguo y preciado manuscrito original del milenario Códice de Dresde sufrió gravísimos e irreparables daños causados específicamente por los devastadores daños colaterales de los enormes bombardeos aéreos ocurridos sobre la ciudad alemana de Dresde durante los momentos culminantes de la Segunda Guerra Mundial en 1945. Afortunadamente para la humanidad, unas copias fotográficas de calidad excepcional habían sido elaboradas meticulosamente varias décadas antes, salvando el saber.',
  },
  {
    id: 'guerra-estelar',
    title: 'Guerra Estelar: Batallas Celestiales',
    color: '#B71C1C',
    btnImage: '/assets/maya/infographic_m7/btn_guerra-estelar.jpg',
    image: '/assets/maya/infographic_m7/hero_guerra-estelar.jpg',
    content: [
      'Aléjate por completo de la imagen cinematográfica de naves espaciales disparando enormes rayos láser coloridos en el frío vacío. En el apasionante mundo clásico maya, la verdadera y terrorífica "Guerra Estelar" era algo terriblemente real, doloroso y violento que sucedía sangrientamente en las selvas de Centroamérica. Los epigrafistas descubrieron en varias antiguas ruinas mayas un jeroglífico fascinante que muestra una luminosa estrella brillante derramando grandes y dolorosas gotas de líquidos oscuros o polvo letal sobre el emblema o símbolo que representa y nombra oficialmente a una gran ciudad vecina enemiga.',
      'Este poderoso jeroglífico bélico se traduce comúnmente como el terrible evento militar de "Guerra de la Estrella" o el catastrófico "evento de derribo estelar". Describe el tipo de batalla absolutamente más despiadada y destructiva concebible que los reyes mayas desataban enfurecidos contra sus peores y más odiados rivales. Durante estos brutales enfrentamientos masivos de aniquilación, el objetivo principal no era solo dominar a la fuerza, sino destruir casi por completo, saquear sin misericordia los sagrados templos y humillar brutal y públicamente capturando al gran rey o gobernante de la asediada ciudad oponente.',
      'Pero lo más asombroso de todo es que estos brutales y destructivos eventos militares no ocurrían en cualquier día conveniente o aleatorio. Las grandes Guerras Estelares estaban cronometradas de manera absolutamente meticulosa con las complejas fases visibles de la deslumbrante estrella Noh Ek. Especialmente se buscaban programar en aquellos peligrosísimos y temidos días precisos cuando el temido y poderoso planeta Venus reaparecía espectacularmente por vez primera brillando en el oscuro cielo de la madrugada tras desaparecer o cuando alcanzaba posiciones clave dominantes.',
      'El famoso y exhaustivamente documentado conflicto mortal que transcurrió durante décadas destructivas entre las dos más formidables e invencibles superpotencias del mundo maya clásico, la legendaria y colosal Tikal y su archienemiga implacable la gran Calakmul, es el ejemplo absolutamente más evidente de la sangrienta guerra venusina. En varias ocasiones cruciales y dramáticas, los colosales ejércitos que avanzaban decididos marchaban directamente al brutal y salvaje combate precisamente en los días específicos en los que la temible estrella de Venus adoptaba su forma de feroz y sanguinario guerrero resplandeciente.',
      'Imagina la inmensa ventaja psicológica. Si fueras un aterrado guerrero enemigo fuertemente armado pero nervioso defendiendo tu querida ciudad atacada, y ves aproximarse imparable al temible gran rey rival vistiendo su elaborado traje de batalla resplandeciente decorado lujosamente con escudos estelares sagrados, liderando fiero a miles y miles de soldados expertos, ¡exactamente al mismo tiempo que la resplandeciente y agresiva estrella Noh Ek destella ominosamente furiosa en lo alto del cielo amaneciendo! Creerías sin duda que los crueles dioses cósmicos de la aniquilación y del fin del mundo ya los habían condenado.',
    ],
    expandables: [
      { label: 'Simbolismo Militar', icon: 'zap', text: 'Los reyes y príncipes guerreros mayas comúnmente solían vestir complejos y muy adornados trajes ceremoniales sagrados conocidos popularmente hoy como la indumentaria guerrera del temible dios Tláloc-Venus, la cual incluía grandes gafas o anteojeras prominentes muy circulares (significando visión estelar), impresionantes tocados de pesadas plumas que emulaban rayos y temibles escudos rectangulares fuertemente decorados rícamente con los símbolos específicos del belicoso gran planeta luminoso.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Una de las sangrientas Guerras Estelares históricas más decisivas y recordadas de toda la historia clásica y bélica de Mesoamérica ocurrió precisamente el fatídico día del año 562 d.C., cuando el astuto e invencible señor supremo de la gran ciudad de Calakmul, en alianza maestra, logró aplastar sorpresiva e impresionantemente a la legendaria metrópoli de Tikal coincidiendo deliberadamente con una importantísima y sagrada fecha del ciclo astral venusino de destrucción masiva.' },
    ],
    fact: 'No todas las feroces batallas clásicas sangrientas entre los antiguos mayas eran formales Guerras Estelares sagradas. El famoso glifo de la Estrella derramando elementos es increíblemente raro y específico. Se utiliza exclusivamente para registrar y presumir monumentalmente y con tremendo orgullo la derrota humillante total y la captura dramática forzosa del grandioso gobernante máximo ajaw de la ciudad enemiga, denotando siempre el absoluto colapso total temporal o definitivo de su formidable dinastía reinante.',
  },
  {
    id: 'kukulkan-venus',
    title: 'Kukulcán: La Serpiente y Venus',
    color: '#1B5E20',
    btnImage: '/assets/maya/infographic_m7/btn_kukulkan-venus.jpg',
    image: '/assets/maya/infographic_m7/hero_kukulkan-venus.jpg',
    content: [
      'Si existiera una celebridad divina en el amplio panteón maya que estuviera intrínsecamente y fuertemente atada y conectada al poderoso planeta Venus, ese sería indiscutiblemente el famosísimo Kukulcán, conocido por la cultura azteca mucho después como el majestuoso Quetzalcóatl. Su hermoso e inolvidable nombre se traduce literalmente del idioma como la enigmática y divina "Serpiente Emplumada". Imagina a esta criatura mítica y poderosa que representa asombrosamente una fusión de la tierra sólida (la serpiente terrenal que se arrastra) con el alto cielo infinito (las plumas ligeras del brillante quetzal verde que vuela).',
      'La mítica y asombrosa historia del majestuoso dios de la Serpiente Emplumada es en sí misma una hermosa alegoría poética e inteligente, diseñada finamente para explicar pacientemente el complicado ciclo cósmico astronómico del luminoso planeta brillante Venus a las grandes masas populares. Según los grandes mitos sagrados narrados en toda Mesoamérica, este compasivo dios fue engañado trágicamente, se inmoló valientemente heroicamente en un gran fuego purificador y su enorme y ardiente corazón valeroso e incorruptible ascendió magníficamente a los vastos cielos para convertirse eternamente en la brillante Estrella de la Mañana inmortal.',
      'La tremenda ausencia notoria e intermitente de la brillante estrella Noh Ek de los estrellados cielos centroamericanos no era vista simplistamente. Los sagrados sacerdotes mayas explicaban detallada y sombríamente que durante este negro período en que Venus desaparecía temporalmente, el gran Kukulcán estaba realizando un peligrosísimo y terrorífico viaje espiritual heroico descendiendo a través de las oscuras regiones del peligroso y temible Xibalbá (el reino lúgubre del doloroso inframundo maya), peleando ferozmente contra monstruosos y demoníacos Señores de la dolorosa Enfermedad y de la Muerte antes de renacer victorioso.',
      'El ejemplo más espectacular, arquitectónicamente asombroso y famoso a nivel global de esta milenaria y fuerte conexión celestial se halla todavía de pie imponente en la gran plaza sagrada central de la antigua ciudad norteña de Chichén Itzá. Allí, el inmenso y majestuoso Templo principal grandioso conocido internacionalmente hoy como la Pirámide de Kukulcán, también conocido como "El Castillo", está diseñado intencionalmente como un gigantesco y fabuloso calendario masivo de roca sólida finamente tallada en alineación perfecta. Es el santuario mayor de la gran y temible deidad venusina resplandeciente.',
      'El legado imponente de la poderosa Serpiente Emplumada demuestra claramente la manera ingeniosa en la que los antiguos eruditos e inteligentes sabios mayas lograban unir sin fisuras e indisolublemente sus grandiosas matemáticas celestiales más complejas con su fervorosa espiritualidad divina mística. Al adorar fanáticamente y seguir los pasos de Kukulcán a través de impresionantes ritos religiosos públicos, el pueblo común en realidad estaba celebrando, respetando, y afianzando internamente el preciso y rítmico baile cíclico milenario e inmutable de las majestuosas y brillantes esferas espaciales de nuestro complejo universo giratorio.',
    ],
    expandables: [
      { label: 'El Descenso', icon: 'zap', text: 'Cada año solar, invariablemente, durante los mágicos y precisos equinoccios estacionales de la primavera renovadora y el sosegado otoño, miles de asombrados espectadores maravillados se reúnen con mucha expectación ansiosa alrededor del milenario templo de "El Castillo". Esperan presenciar cómo unas caprichosas pero matemáticamente precisas sombras triangulares bajan por las escaleras simulando el movimiento serpenteante del dios.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Un asombroso monumento arquitectónico fuertemente vinculado es la plataforma conocida como El Caracol de la milenaria ciudad de Chichén Itzá. El diseño asimétrico contiene estrechas ventanas que se alinean precisamente de manera astronómica con los extremos máximos en el horizonte de la salida y la puesta cíclica del planeta de Venus en las diferentes y precisas fechas sagradas clave observadas año tras año.' },
    ],
    fact: 'El poderoso arquetipo fundamental de la sagrada deidad creadora y resplandeciente Quetzalcóatl/Kukulcán firmemente conectada con la estrella matutina de Venus es muchísimo y verdaderamente más antiguo de lo que la civilización clásica maya es. Se ha descubierto en ruinas y piezas antiguas de barro que este mito astronómico grandioso, y venerado compartidamente en toda el área, se rastrea sorprendentemente atrás hasta las asombrosas y milenarias culturas tempranas primigenias mesoamericanas olmecas ancestrales.',
  },
  {
    id: 'observacion-tecnicas',
    title: 'Técnicas Sin Telescopios',
    color: '#F48FB1',
    btnImage: '/assets/maya/infographic_m7/btn_observacion-tecnicas.jpg',
    image: '/assets/maya/infographic_m7/hero_observacion-tecnicas.jpg',
    content: [
      '¿Alguna vez te has preguntado impresionado cómo, hace muchísimos siglos lejanos en el pasado, los antiguos y sabios eruditos mayas lograron calcular matemáticamente con tanta y tan grandiosa precisión divina los amplios movimientos del brillante firmamento nocturno sin tener acceso siquiera a una humilde lente de vidrio pulido? A diferencia total del famoso científico europeo Galileo Galilei moderno, los dedicados y sagrados sacerdotes mayas nunca poseyeron telescopios, computadoras de engranajes, aparatos astrolabios metálicos ni finos y complicados sextantes oceánicos. Su único y poderoso equipo verdaderamente invaluable eran los ojos y mucha paciencia.',
      'Su primer grandioso y genial método científico astronómico era ciertamente el prolongado sistema metódico de observar tenazmente el horizonte lejano a simple vista. Imagina ser tú mismo un sabio astrónomo maya responsable que se para firme todos y cada uno de los cálidos días calurosos exactamente en la mismísima plataforma cuadrada de piedra milenaria muy elevada para mirar fija y minuciosamente hacia la lejanía. Al fondo, a lo lejos, el escarpado terreno boscoso, junto con colinas y grandes pirámides o monumentos, funcionaba perfectamente a la medida como una especie de gran regla gigante y natural del horizonte.',
      'Para perfeccionar grandemente su aguda visión, los ingeniosos y creativos constructores de las inmensas ruinas elaboraron sofisticados sistemas fijos formados intencionalmente por pares precisos de imponentes edificios gigantescos muy altos. Al pararse solemnemente en un templo elevado específico de piedra e intentar ver exactamente justo por encima o a través del estrecho resquicio arquitectónico del segundo gigantesco y lejano templo de mampostería, lograban crear una poderosísima línea recta de visión cruzada, tan inmensamente precisa como la delicada mira telescópica moderna usada y empleada en los precisos fusiles tácticos avanzados.',
      'El famoso y espectacular conjunto arquitectónico sagrado milenario conocido popularmente como "Grupo E", el cual se localiza céntricamente en la extensa reserva y selva de la gran Uaxactún, Guatemala, fue indiscutible y orgullosamente el brillantísimo observatorio astronómico temprano principal más célebre de la entera zona maya. Esta particular e increíble maravilla de la antigua civilización de la selva cuenta majestuosamente con una altísima pirámide escalonada que funciona perfectamente como un sólido mirador enfrente de otros tres edificios alineados que señalan majestuosa y perfectamente las puestas anuales precisas del brillante sol.',
      'Para los pacientes mayas dedicados a la ciencia, el verdadero secreto indispensable no era disponer rápidamente de máquinas o artefactos costosos, sino tener un estricto e inquebrantable registro continuado incesantemente. A lo largo del largo lapso ininterrumpido de muchos siglos formidables, cientos de sucesivos de dedicados astrónomos escribieron inagotables páginas repletas de las importantes fechas precisas sagradas de grandes avistamientos astronómicos estelares, transmitiendo generosa y cuidadosamente estos preciosísimos códices secretos astronómicos a las preparadas y nuevas juventudes y descendencias eruditas sin permitir que cayera en el vacío oscuro del olvido.',
    ],
    expandables: [
      { label: 'Herramientas Simples', icon: 'zap', text: 'Los grandes arqueólogos mesoamericanistas postulan y creen firmemente respaldados por evidencias que los antiguos astrónomos sabios del área utilizaban sencillas e ingeniosas herramientas portátiles rústicas. Empleaban frecuentemente simples pares cruzados horizontales formados por varas rectas muy firmes de fina y pulida madera o empleaban incluso unos simples y delgados hilos sumamente tensos anudados que estaban cruzados magistralmente para ayudar en la labor observacional cotidiana del cielo estrellado infinito.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los inmensos observatorios de la imponente civilización no poseían las famosas grandes cúpulas hemisféricas abiertas características clásicas asociadas tradicionalmente que vemos muy repetitivamente adornando frecuentemente hoy en casi todos los majestuosos observatorios ópticos inmensos internacionales muy formales del moderno mundo occidental global; usualmente tenían techumbres planas o cámaras angostas en torres.' },
    ],
    fact: 'El conocimiento milenario del registro celeste requería verdaderamente y muy absolutamente el paso lentísimo y arduo del continuo tiempo histórico dinástico sagrado para así poder eliminar de raíz y sistemáticamente todos los pequeñísimos errores acumulativos e incidentales visuales originados inicialmente. Se ha propuesto que tomó no menos de 300 o hasta de 400 larguísimos y fatigosos años completos continuos de diaria paciencia observacional cuidadosa en los primeros asombrosos asentamientos preclásicos de la jungla el poder ajustar la famosa conmensurabilidad perfeccionada.',
  },
  {
    id: 'legado-venusino',
    title: 'El Legado: Maya vs. Europa',
    color: '#0288D1',
    btnImage: '/assets/maya/infographic_m7/btn_legado-venusino.jpg',
    image: '/assets/maya/infographic_m7/hero_legado-venusino.jpg',
    content: [
      'Cuando comparamos seriamente los impresionantes y magníficos descubrimientos de la civilización con sus pares en el mundo antiguo, el glorioso y gigantesco legado astronómico intelectual de los dedicados sabios astrónomos del mundo maya respecto al resplandeciente planeta Venus brilla excepcionalmente y verdaderamente con muchísima muchísima fuerza de luz y de resplandor. Los precisos sabios intelectuales matemáticos indígenas de los húmedos bosques lluviosos del caluroso sureste de México y Centroamérica no tenían absolutamente nada pero nada en absoluto que llegar a envidiarle secretamente a las más antiguas e ilustres mentes griegas o romanas europeas.',
      'De hecho notable e histórico comprobable, muchísimo tiempo inmemorial largamente anterior al famoso genio astrónomo Nicolás Copérnico proponiendo su audaz sistema heliocéntrico o de que Johannes Kepler formulara finalmente en su país natal alemán las detalladas e imponentes grandiosas y elegantes leyes físicas gravitacionales absolutas exactas reales que gobiernan a todos los veloces planetas solares masivos, en aquel entonces los matemáticos mayas ya habían registrado minuciosamente a mano los complejísimos patrones astronómicos cíclicos de la majestuosa estrella resplandeciente Noh Ek con una fabulosa y pasmosa exactitud y nivel casi inverosímil.',
      'Los antiguos expertos y dedicados sacerdotes de las grandes y masivas ciudades de piedra precolombinas conocían perfectamente y comprendían tan detalladamente los secretos caprichosos movimientos estelares planetarios a la perfección y con total rigor riguroso magistral superior, que verdaderamente todas las muy bellamente meticulosas proyecciones inscritas pacientemente en el famoso y delicadísimo gran Códice antiguo estelar sobreviviente en Dresde llegaban sin esfuerzo aparente a predecir matemáticamente y con abrumadora exactitud impecable impecable astronómica, todos y cada uno de los asombrosos e increíbles futuros movimientos cíclicos continuos eternos por varios milenios repetidos.',
      'A pesar del sumamente incomprensiblemente doloroso y trágico y terriblemente devastador desenlace del brutal violento fuego ardiente inquisitorio católico destructivo del oscuro siglo inmensamente trágico devastador que arruinó y destruyó para siempre miles y miles de preciosos e importantísimos registros y códices irremplazables con el fuego de las hogueras durante la salvaje y dura conquista imperial violenta colonizadora imperial hispana extranjera en Centroamérica; este invaluable enorme y asombroso cuerpo numérico genial mesoamericano sobrevivió casi milagrosamente en fragmentos de gran valor para nuestro asombro y continuo deleite contemporáneo de los científicos.',
      'Hoy, gracias a la minuciosa e incansable labor titánica dedicada mundial constante moderna intelectual cooperativa internacional gigantesca de incontables y formidables arqueólogos minuciosos tenaces de muchas lenguas, dedicados lingüistas sagaces decodificadores perspicaces de innumerables textos jeroglíficos crípticos y grandes especialistas mayistas e investigadores rigurosos, entendemos maravillosamente profundamente y admiramos intensamente inmensamente el profundo enorme brillante talento indígena científico matemático asombroso único intelectual; y su legendario brillante rastro de la majestuosa gran Noh Ek.',
    ],
    expandables: [
      { label: 'Más Exactos', icon: 'zap', text: 'Se considera frecuentemente y muy ampliamente con gran asombro por diversos científicos e historiadores que antes del año aproximado 1500 d.C., los grandes matemáticos mesoamericanos poseían en general el más sumamente preciso asombrosísimo calendario complejo e integral de la entera totalidad total del gran mundo humano global entero, llegando a superar ampliamente la enorme exactitud general y rigor observacional del famosísimo e ilustre gran calendario estandarizado juliano utilizado cotidianamente y profusamente por el viejo imperio de occidente europeo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El conocimiento precolombino astronómico antiguo mesoamericano ha sido sumamente reconocido y valiosísimamente validado positivamente en los años de modernidad técnica actual innegablemente de forma rigurosa y matemática astronómica usando muchísimos modernos potentísimos grandes súper ordenadores computacionales gigantes espaciales, demostrando así y maravillosamente de modo genial indiscutible que sus maravillosas antiquísimas observaciones de piedra rústica tallada fueron en su mayoría correcta e increíblemente atinadas astronómicas y numéricas.' },
    ],
    fact: 'El gran calendario de origen maya conocido mundialmente de la cuenta larga larguísima (aquel malentendido famoso de las muy publicitadas desastrosas pero infundadas catastróficas predicciones apocalípticas y del famoso año mítico reciente de 2012 moderno contemporáneo televisivo popular) está estructurado inteligentísimamente desde su propia importantísima y sagrada base con los fabulosos grandes e impresionantes y enormes majestuosos múltiplos sagrados matemáticos astronómicos originados de la misma estrella radiante venusina Noh Ek de manera espectacular maravillosamente y eternamente precisa y matemática rigurosa indudablemente admirable asombrosa.',
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

// ─── Header Banner ──────────────────────────────────────────────────────────────
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

// ─── Organic Node Button ───────────────────────────────────────────────────────
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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

        {/* ─── Fact Highlight ─── */}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
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
            position: 'absolute', top: 0, left: 0, bottom: 0,
            background: 'linear-gradient(90deg, #E0E0E0, #FFD600, #B71C1C)',
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
                width: '24px', height: '24px', borderRadius: '50%',
                background: isExplored ? n.color : 'rgba(255,255,255,0.1)',
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

// ─── Main Export ─────────────────────────────────────────────────────────────
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

      {/* ─── Bibliography ─── */}
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
