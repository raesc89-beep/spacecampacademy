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
      'Imagina que miras el cielo nocturno y ves un punto brillante que destaca sobre todos los demÃ¡s, tan luminoso que casi parece una lÃ¡mpara lejana. Para los antiguos astrÃ³nomos mayas, este punto deslumbrante no era simplemente una luz bonita, sino "Noh Ek", que significa "La Gran Estrella". Este objeto celeste es lo que nosotros llamamos el planeta Venus. A diferencia de las estrellas normales que tintinean, Venus brilla con una luz constante y poderosa, siendo el tercer objeto mÃ¡s brillante de nuestro cielo, solo superado por el Sol y la Luna. Para la civilizaciÃ³n maya, su brillo no era seÃ±al de paz, sino una advertencia de inmenso poder cÃ³smico.',
      'Noh Ek tenÃ­a una identidad doble verdaderamente fascinante, como si fuera un superhÃ©roe con una identidad secreta que cambia segÃºn el momento del dÃ­a. A veces aparecÃ­a justo antes del amanecer, anunciando majestuosamente la llegada del Sol. En esta espectacular forma matutina, lo llamaban "Ah Chicum Ek", la gran estrella de la maÃ±ana. Pero otras veces, desaparecÃ­a misteriosamente por semanas y luego regresaba al anochecer, justo despuÃ©s de que el Sol se ocultaba. Hoy en dÃ­a sabemos gracias a la ciencia moderna que es exactamente el mismo planeta orbitando alrededor del Sol, pero los mayas entendieron esta fascinante dualidad como una transformaciÃ³n profundamente sagrada.',
      'Para entender exactamente cÃ³mo los mayas veÃ­an a Venus, imagina que el planeta es como un atleta olÃ­mpico muy veloz corriendo en una pista interior circular, mientras que la Tierra corre simultÃ¡neamente en la pista exterior mÃ¡s grande. Como la pista interior es notablemente mÃ¡s corta y Venus corre a mayor velocidad, a veces nos alcanza velozmente y nos rebasa por completo. Cuando Venus estÃ¡ de un lado del gigantesco Sol, lo vemos brillante al amanecer; cuando estÃ¡ del otro extremo, lo vemos al atardecer. Los astrÃ³nomos mayas, utilizando Ãºnicamente sus propios ojos y su tremenda e inagotable paciencia, lograron registrar meticulosamente estos complejos movimientos con una exactitud que todavÃ­a hoy asombra profundamente a los cientÃ­ficos mÃ¡s modernos.',
      'En la inmensa cultura maya, la repentina apariciÃ³n de Noh Ek como deslumbrante estrella de la maÃ±ana era un momento de grandÃ­sima tensiÃ³n y extremo peligro. CreÃ­an fielmente que sus primeros rayos de luz cortante eran exactamente como lanzas afiladÃ­simas o flechas cÃ³smicas mortales que golpeaban agresivamente a la Tierra. Estos temibles "rayos-flecha" eran considerados sumamente peligrosos por todos, ya que se creÃ­a que eran perfectamente capaces de daÃ±ar severamente las delicadas cosechas, enfermar gravemente a los poderosos gobernantes y decidir fatalmente el destino final de las sangrientas batallas. Por esta precisa razÃ³n, los sacerdotes y reyes vigilaban el cielo con extrema y constante atenciÃ³n.',
      'La tremenda fascinaciÃ³n maya por Noh Ek no era de ninguna manera un simple pasatiempo de unos cuantos astrÃ³nomos aislados en sus altas pirÃ¡mides; era en realidad un pilar absolutamente fundamental de toda su grandiosa civilizaciÃ³n. La precisa posiciÃ³n de la Gran Estrella dictaba inexorablemente cuÃ¡ndo debÃ­an realizar importantes rituales, en quÃ© momento coronar a un flamante y nuevo rey y, de manera muy especial y sangrienta, cuÃ¡ndo iniciar devastadores conflictos militares contra otras ciudades. Venus era el exacto reloj celestial que marcaba implacablemente el ritmo de la polÃ­tica y el poder en el agitado mundo maya. Al dominar el complejo conocimiento de sus impredecibles movimientos, los astutos gobernantes mayas demostraban pÃºblicamente que tenÃ­an el total favor de los dioses.',
    ],
    expandables: [
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El brillo de Venus es tan intenso porque estÃ¡ completamente cubierto de nubes de Ã¡cido sulfÃºrico altamente reflectantes. Estas nubes funcionan como un espejo gigante que refleja el 70% de la luz solar que recibe. Para los mayas, este brillo sobrenatural era evidencia irrefutable de la presencia divina y el inmenso poder de la estrella matutina que lanzaba sus temidos rayos destructivos hacia el mundo humano.' },
      { label: 'El Gemelo Divino', icon: 'clock', text: 'En el famoso Popol Vuh, el gran libro sagrado de los mayas, la historia de los HÃ©roes Gemelos, HunahpÃº e IxbalanquÃ©, estÃ¡ estrechamente relacionada con el ciclo de Venus y el Sol. Cuando finalmente derrotan a los siniestros seÃ±ores del oscuro inframundo de XibalbÃ¡, ascienden victoriosos al firmamento para convertirse nada menos que en el Sol brillante y la resplandeciente estrella de Venus, iluminando el universo.' },
    ],
    fact: 'A pesar de no contar con ningÃºn tipo de telescopio Ã³ptico ni instrumentos modernos de mediciÃ³n de precisiÃ³n, los astrÃ³nomos mayas calcularon el ciclo de Venus en exactamente 584 dÃ­as. Â¡La cifra astronÃ³mica cientÃ­fica real y moderna es de 583.92 dÃ­as! Esta diferencia es de apenas unas insignificantes horas. Su asombroso cÃ¡lculo tenÃ­a un porcentaje de error increÃ­blemente diminuto de menos de una dÃ©cima de porcentaje, logrado observando incansablemente desde sus elevadas pirÃ¡mides de piedra durante varias generaciones.',
  },
  {
    id: 'ciclo-sinodico',
    title: 'Ciclo SinÃ³dico: La Danza CÃ³smica',
    color: '#FFD600',
    btnImage: '/assets/maya/infographic_m7/btn_ciclo-sinodico.jpg',
    image: '/assets/maya/infographic_m7/hero_ciclo-sinodico.jpg',
    content: [
      'Imagina que dos corredores profesionales dan vueltas incansablemente alrededor de un gigantesco estadio, uno corriendo siempre por la pista interior y el otro manteniÃ©ndose en la pista exterior. El tiempo exacto que tardan en volver a encontrarse perfectamente alineados en la misma lÃ­nea de salida es lo que los modernos astrÃ³nomos llaman un espectacular "ciclo sinÃ³dico". Para el misterioso planeta Venus y nuestra querida Tierra, esta gigantesca carrera espacial dura exactamente 584 dÃ­as. Los observadores mayas estudiaron meticulosamente cada fase de esta compleja competencia cÃ³smica durante muchÃ­simos aÃ±os, registrando apasionadamente cada detalle.',
      'Los antiguos mayas, siendo verdaderos genios de la observaciÃ³n matemÃ¡tica, dividieron este gigantesco ciclo cÃ³smico de 584 dÃ­as en cuatro importantes y distintas etapas visuales. Primero, la deslumbrante estrella de la maÃ±ana brillaba durante 236 dÃ­as continuos. Luego desaparecÃ­a misteriosamente en el ardiente resplandor del Sol durante unos rÃ¡pidos 90 dÃ­as, un tiempo que los mayas asociaban temerosamente con un oscuro viaje por el inframundo. DespuÃ©s reaparecÃ­a gloriosamente como la estrella del atardecer durante unos prolongados 250 dÃ­as. Finalmente, desaparecÃ­a de nuevo, esta vez durante apenas 8 angustiosos dÃ­as, justo antes de renacer espectacularmente al amanecer.',
      'Pero el verdadero e impresionante secreto mÃ¡gico matemÃ¡tico de los astrÃ³nomos mayas radicaba en la fabulosa "conmensurabilidad". Imagina tratar de sincronizar dos enormes engranajes giratorios de diferente tamaÃ±o. Descubrieron algo alucinante: si tomas exactamente cinco ciclos completos de Venus (5 veces 584 dÃ­as) y los sumas, obtienes nada menos que 2,920 dÃ­as. Y asombrosamente, si tomas ocho aÃ±os solares completos (8 veces 365 dÃ­as), Â¡tambiÃ©n obtienes la misma exacta cifra de 2,920 dÃ­as! Esta perfecta sincronizaciÃ³n matemÃ¡tica era considerada como un mensaje directo y sagrado de los propios dioses del universo.',
      'Esta asombrosa equivalencia astronÃ³mica donde 5 ciclos venusinos son idÃ©nticos a 8 ciclos solares significaba que cada ocho aÃ±os, el temible planeta Venus volvÃ­a a aparecer exactamente en la misma idÃ©ntica posiciÃ³n en el firmamento y tambiÃ©n en el mismo exacto dÃ­a del calendario solar de 365 dÃ­as conocido como Haab. Para los antiguos gobernantes mayas, este importante aniversario de ocho aÃ±os era un momento ceremonial inmensamente poderoso, un momento crÃ­tico donde los ciclos eternos del tiempo se alineaban perfectamente. Celebraban enormes festivales para asegurar que el intrincado mecanismo del universo continuara funcionando sin fallos ni desastres.',
      'Este fantÃ¡stico conocimiento de la profunda sincronizaciÃ³n cÃ³smica no era solamente una curiosidad teÃ³rica o matemÃ¡tica. Los mayas utilizaban intensamente estos ciclos de conmensurabilidad para planificar con extrema antelaciÃ³n importantes eventos fundamentales en sus grandiosas vidas. Si un respetado rey deseaba asegurar su victoria en una prÃ³xima guerra, o si los sacerdotes necesitaban garantizar que sus complejas ceremonias agrÃ­colas tuvieran Ã©xito, recurrÃ­an siempre a la precisa danza matemÃ¡tica de Venus y la Tierra. Para ellos, la exacta y rigurosa matemÃ¡tica celestial era verdaderamente el lenguaje divino que regÃ­a el destino inexorable de la entera humanidad.',
    ],
    expandables: [
      { label: 'El Gran Ciclo', icon: 'atom', text: 'AdemÃ¡s de sincronizar brillantemente a Venus con el candente Sol, los mayas conectaron mÃ¡gicamente estos 2,920 dÃ­as asombrosos con su sagrado calendario adivinatorio de 260 dÃ­as llamado TzolkÃ­n. AsÃ­ descubrieron que 65 ciclos del TzolkÃ­n (65 x 260) tambiÃ©n son exactamente 16,900 dÃ­as, lo que equivale milagrosamente a 65 aÃ±os rituales y sincroniza de nuevo de manera impecable el Sol, Venus y el calendario espiritual, demostrando la complejidad de su sistema.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Durante el temible periodo de desapariciÃ³n de 8 dÃ­as de Venus, conocido como la conjunciÃ³n inferior (cuando pasa justo entre la Tierra y el cÃ¡lido Sol), los mayas consideraban que el planeta estaba fÃ­sicamente muerto y sufriendo espantosas transformaciones agonizantes en lo mÃ¡s profundo del peligroso inframundo oscuro. CreÃ­an que en la oscuridad, la deidad se despojaba de su piel para resurgir furiosa.' },
    ],
    fact: 'El conocimiento del ciclo exacto de Venus de 584 dÃ­as era una informaciÃ³n astronÃ³mica de la mÃ¡s alta seguridad de estado en el mundo maya. Las precisas tablas venusinas no eran accesibles en absoluto para el ciudadano comÃºn y corriente. Solamente un grupo altamente exclusivo y selecto de sacerdotes matemÃ¡ticos y el mismÃ­simo ajaw (el poderoso rey maya) tenÃ­an el privilegio sagrado de aprender, resguardar y utilizar este importantÃ­simo secreto celestial para dominar el tiempo y su pueblo.',
  },
  {
    id: 'tabla-dresde',
    title: 'Las Tablas de Venus: El CÃ³dice de Dresde',
    color: '#0288D1',
    btnImage: '/assets/maya/infographic_m7/btn_tabla-dresde.jpg',
    image: '/assets/maya/infographic_m7/hero_tabla-dresde.jpg',
    content: [
      'Imagina un antiguo y delicado libro plegable elaborado finamente con corteza de Ã¡rbol sagrado de amate, pintado brillantemente con hermosos jeroglÃ­ficos y nÃºmeros misteriosos. Esto es exactamente el CÃ³dice de Dresde, uno de los poquÃ­simos y valiosÃ­simos libros mayas antiguos que lograron sobrevivir trÃ¡gicamente a la destructiva y lamentable quema de documentos durante la colonizaciÃ³n espaÃ±ola. En sus extraordinarias pÃ¡ginas 24 y de la 46 a la 50, este antiguo manuscrito contiene las increÃ­blemente famosas "Tablas de Venus", una obra maestra absoluta del intelecto y el cÃ¡lculo humano de toda la historia antigua.',
      'Estas espectaculares y detalladas pÃ¡ginas no son simples decoraciones hermosas; en realidad funcionan como una complejÃ­sima y avanzada hoja de cÃ¡lculo astronÃ³mica creada mucho antes que las modernas computadoras. En sus meticulosas filas y columnas de nÃºmeros representados elegantemente con barras (valor 5) y puntos (valor 1), los sabios mayas proyectaron minuciosamente los movimientos futuros exactos de la brillante estrella Noh Ek. Estas precisas tablas predicen exitosamente la posiciÃ³n de Venus a lo largo de un asombroso periodo continuo de 104 aÃ±os, es decir, Â¡un total asombroso de mÃ¡s de 37,960 dÃ­as consecutivos anotados!',
      'Para que verdaderamente comprendas el inmenso genio matemÃ¡tico contenido en este frÃ¡gil libro, debes saber que el verdadero ciclo astronÃ³mico real de Venus no es un nÃºmero entero exacto, sino que dura especÃ­ficamente unos rebeldes 583.92 dÃ­as. Aunque los mayas utilizaban genialmente el nÃºmero redondo de 584 dÃ­as para simplificar sus cÃ¡lculos ceremoniales y diarios, ellos sabÃ­an a la perfecciÃ³n que ese pequeÃ±o sobrante molesto de 0.08 dÃ­as se irÃ­a acumulando gradualmente y terminarÃ­a arruinando completamente todas y cada una de sus cuidadosas predicciones celestiales si no lo solucionaban pronto.',
      'Â¿QuÃ© hicieron entonces los geniales sabios? Como hÃ¡biles programadores modernos reparando un minÃºsculo pero grave error en el cÃ³digo de un software, introdujeron inteligentÃ­simas "correcciones y ajustes" ocultos dentro del CÃ³dice de Dresde. Similar a cÃ³mo nosotros agregamos ingeniosamente los divertidos aÃ±os bisiestos de 366 dÃ­as en nuestro propio calendario moderno para mantener todo correctamente sincronizado con las estaciones terrestres, las tablas mayas ordenaban minuciosamente restar sistemÃ¡ticamente ciertos dÃ­as cada cierto largo periodo de aÃ±os para mantener la absoluta y sagrada precisiÃ³n divina sin ningÃºn error perceptible.',
      'El detallado nivel visual contenido en estas pÃ¡ginas asombra enormemente. Junto con los complejos nÃºmeros calendÃ¡ricos abstractos, hay pinturas detalladas de una feroz y temible deidad de Venus armada letalmente con filosas lanzas afiladas, que aparece hiriendo violentamente a diferentes e indefensas vÃ­ctimas terrenales (animales sagrados o deidades menores) que representan claramente distintos momentos crÃ­ticos de la temporada del calendario agrÃ­cola. El CÃ³dice no era solo una asombrosa tabla numÃ©rica astronÃ³mica, sino un importantÃ­simo manual de supervivencia mÃ­stica que indicaba exactamente cuÃ¡ndo proteger el mundo.',
    ],
    expandables: [
      { label: 'El Descubrimiento', icon: 'atom', text: 'El invaluable CÃ³dice de Dresde adquiriÃ³ su curioso nombre europeo porque curiosamente terminÃ³ almacenado en la biblioteca real de la ciudad de Dresde, en el paÃ­s de Alemania. Fue el brillante y dedicado erudito alemÃ¡n Ernst FÃ¶rstemann, quien trabajaba allÃ­ como humilde bibliotecario a fines de los aÃ±os 1800s, quien finalmente logrÃ³ descifrar increÃ­blemente la complejÃ­sima secciÃ³n matemÃ¡tica dedicada al planeta Venus tras aÃ±os de esfuerzo.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Las detalladas predicciones astronÃ³micas plasmadas en el antiguo CÃ³dice de Dresde son verdaderamente tan exactas y perfectas matemÃ¡ticamente que, incluso si decidiÃ©ramos usarlas rigurosamente el dÃ­a de hoy sin modificaciones, su porcentaje de exactitud de predicciÃ³n para determinar cuÃ¡ndo reaparecerÃ¡ Venus superarÃ­a asombrosamente el altÃ­simo 99% de precisiÃ³n. Â¡Y esto con tecnologÃ­a de hace mil aÃ±os!' },
    ],
    fact: 'El antiguo y preciado manuscrito original del milenario CÃ³dice de Dresde sufriÃ³ gravÃ­simos e irreparables daÃ±os causados especÃ­ficamente por los devastadores daÃ±os colaterales de los enormes bombardeos aÃ©reos ocurridos sobre la ciudad alemana de Dresde durante los momentos culminantes de la Segunda Guerra Mundial en 1945. Afortunadamente para la humanidad, unas copias fotogrÃ¡ficas de calidad excepcional habÃ­an sido elaboradas meticulosamente varias dÃ©cadas antes, salvando el saber.',
  },
  {
    id: 'guerra-estelar',
    title: 'Guerra Estelar: Batallas Celestiales',
    color: '#B71C1C',
    btnImage: '/assets/maya/infographic_m7/btn_guerra-estelar.jpg',
    image: '/assets/maya/infographic_m7/hero_guerra-estelar.jpg',
    content: [
      'AlÃ©jate por completo de la imagen cinematogrÃ¡fica de naves espaciales disparando enormes rayos lÃ¡ser coloridos en el frÃ­o vacÃ­o. En el apasionante mundo clÃ¡sico maya, la verdadera y terrorÃ­fica "Guerra Estelar" era algo terriblemente real, doloroso y violento que sucedÃ­a sangrientamente en las selvas de CentroamÃ©rica. Los epigrafistas descubrieron en varias antiguas ruinas mayas un jeroglÃ­fico fascinante que muestra una luminosa estrella brillante derramando grandes y dolorosas gotas de lÃ­quidos oscuros o polvo letal sobre el emblema o sÃ­mbolo que representa y nombra oficialmente a una gran ciudad vecina enemiga.',
      'Este poderoso jeroglÃ­fico bÃ©lico se traduce comÃºnmente como el terrible evento militar de "Guerra de la Estrella" o el catastrÃ³fico "evento de derribo estelar". Describe el tipo de batalla absolutamente mÃ¡s despiadada y destructiva concebible que los reyes mayas desataban enfurecidos contra sus peores y mÃ¡s odiados rivales. Durante estos brutales enfrentamientos masivos de aniquilaciÃ³n, el objetivo principal no era solo dominar a la fuerza, sino destruir casi por completo, saquear sin misericordia los sagrados templos y humillar brutal y pÃºblicamente capturando al gran rey o gobernante de la asediada ciudad oponente.',
      'Pero lo mÃ¡s asombroso de todo es que estos brutales y destructivos eventos militares no ocurrÃ­an en cualquier dÃ­a conveniente o aleatorio. Las grandes Guerras Estelares estaban cronometradas de manera absolutamente meticulosa con las complejas fases visibles de la deslumbrante estrella Noh Ek. Especialmente se buscaban programar en aquellos peligrosÃ­simos y temidos dÃ­as precisos cuando el temido y poderoso planeta Venus reaparecÃ­a espectacularmente por vez primera brillando en el oscuro cielo de la madrugada tras desaparecer o cuando alcanzaba posiciones clave dominantes.',
      'El famoso y exhaustivamente documentado conflicto mortal que transcurriÃ³ durante dÃ©cadas destructivas entre las dos mÃ¡s formidables e invencibles superpotencias del mundo maya clÃ¡sico, la legendaria y colosal Tikal y su archienemiga implacable la gran Calakmul, es el ejemplo absolutamente mÃ¡s evidente de la sangrienta guerra venusina. En varias ocasiones cruciales y dramÃ¡ticas, los colosales ejÃ©rcitos que avanzaban decididos marchaban directamente al brutal y salvaje combate precisamente en los dÃ­as especÃ­ficos en los que la temible estrella de Venus adoptaba su forma de feroz y sanguinario guerrero resplandeciente.',
      'Imagina la inmensa ventaja psicolÃ³gica. Si fueras un aterrado guerrero enemigo fuertemente armado pero nervioso defendiendo tu querida ciudad atacada, y ves aproximarse imparable al temible gran rey rival vistiendo su elaborado traje de batalla resplandeciente decorado lujosamente con escudos estelares sagrados, liderando fiero a miles y miles de soldados expertos, Â¡exactamente al mismo tiempo que la resplandeciente y agresiva estrella Noh Ek destella ominosamente furiosa en lo alto del cielo amaneciendo! CreerÃ­as sin duda que los crueles dioses cÃ³smicos de la aniquilaciÃ³n y del fin del mundo ya los habÃ­an condenado.',
    ],
    expandables: [
      { label: 'Simbolismo Militar', icon: 'clock', text: 'Los reyes y prÃ­ncipes guerreros mayas comÃºnmente solÃ­an vestir complejos y muy adornados trajes ceremoniales sagrados conocidos popularmente hoy como la indumentaria guerrera del temible dios TlÃ¡loc-Venus, la cual incluÃ­a grandes gafas o anteojeras prominentes muy circulares (significando visiÃ³n estelar), impresionantes tocados de pesadas plumas que emulaban rayos y temibles escudos rectangulares fuertemente decorados rÃ­camente con los sÃ­mbolos especÃ­ficos del belicoso gran planeta luminoso.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Una de las sangrientas Guerras Estelares histÃ³ricas mÃ¡s decisivas y recordadas de toda la historia clÃ¡sica y bÃ©lica de MesoamÃ©rica ocurriÃ³ precisamente el fatÃ­dico dÃ­a del aÃ±o 562 d.C., cuando el astuto e invencible seÃ±or supremo de la gran ciudad de Calakmul, en alianza maestra, logrÃ³ aplastar sorpresiva e impresionantemente a la legendaria metrÃ³poli de Tikal coincidiendo deliberadamente con una importantÃ­sima y sagrada fecha del ciclo astral venusino de destrucciÃ³n masiva.' },
    ],
    fact: 'No todas las feroces batallas clÃ¡sicas sangrientas entre los antiguos mayas eran formales Guerras Estelares sagradas. El famoso glifo de la Estrella derramando elementos es increÃ­blemente raro y especÃ­fico. Se utiliza exclusivamente para registrar y presumir monumentalmente y con tremendo orgullo la derrota humillante total y la captura dramÃ¡tica forzosa del grandioso gobernante mÃ¡ximo ajaw de la ciudad enemiga, denotando siempre el absoluto colapso total temporal o definitivo de su formidable dinastÃ­a reinante.',
  },
  {
    id: 'kukulkan-venus',
    title: 'KukulcÃ¡n: La Serpiente y Venus',
    color: '#1B5E20',
    btnImage: '/assets/maya/infographic_m7/btn_kukulkan-venus.jpg',
    image: '/assets/maya/infographic_m7/hero_kukulkan-venus.jpg',
    content: [
      'Si existiera una celebridad divina en el amplio panteÃ³n maya que estuviera intrÃ­nsecamente y fuertemente atada y conectada al poderoso planeta Venus, ese serÃ­a indiscutiblemente el famosÃ­simo KukulcÃ¡n, conocido por la cultura azteca mucho despuÃ©s como el majestuoso QuetzalcÃ³atl. Su hermoso e inolvidable nombre se traduce literalmente del idioma como la enigmÃ¡tica y divina "Serpiente Emplumada". Imagina a esta criatura mÃ­tica y poderosa que representa asombrosamente una fusiÃ³n de la tierra sÃ³lida (la serpiente terrenal que se arrastra) con el alto cielo infinito (las plumas ligeras del brillante quetzal verde que vuela).',
      'La mÃ­tica y asombrosa historia del majestuoso dios de la Serpiente Emplumada es en sÃ­ misma una hermosa alegorÃ­a poÃ©tica e inteligente, diseÃ±ada finamente para explicar pacientemente el complicado ciclo cÃ³smico astronÃ³mico del luminoso planeta brillante Venus a las grandes masas populares. SegÃºn los grandes mitos sagrados narrados en toda MesoamÃ©rica, este compasivo dios fue engaÃ±ado trÃ¡gicamente, se inmolÃ³ valientemente heroicamente en un gran fuego purificador y su enorme y ardiente corazÃ³n valeroso e incorruptible ascendiÃ³ magnÃ­ficamente a los vastos cielos para convertirse eternamente en la brillante Estrella de la MaÃ±ana inmortal.',
      'La tremenda ausencia notoria e intermitente de la brillante estrella Noh Ek de los estrellados cielos centroamericanos no era vista simplistamente. Los sagrados sacerdotes mayas explicaban detallada y sombrÃ­amente que durante este negro perÃ­odo en que Venus desaparecÃ­a temporalmente, el gran KukulcÃ¡n estaba realizando un peligrosÃ­simo y terrorÃ­fico viaje espiritual heroico descendiendo a travÃ©s de las oscuras regiones del peligroso y temible XibalbÃ¡ (el reino lÃºgubre del doloroso inframundo maya), peleando ferozmente contra monstruosos y demonÃ­acos SeÃ±ores de la dolorosa Enfermedad y de la Muerte antes de renacer victorioso.',
      'El ejemplo mÃ¡s espectacular, arquitectÃ³nicamente asombroso y famoso a nivel global de esta milenaria y fuerte conexiÃ³n celestial se halla todavÃ­a de pie imponente en la gran plaza sagrada central de la antigua ciudad norteÃ±a de ChichÃ©n ItzÃ¡. AllÃ­, el inmenso y majestuoso Templo principal grandioso conocido internacionalmente hoy como la PirÃ¡mide de KukulcÃ¡n, tambiÃ©n conocido como "El Castillo", estÃ¡ diseÃ±ado intencionalmente como un gigantesco y fabuloso calendario masivo de roca sÃ³lida finamente tallada en alineaciÃ³n perfecta. Es el santuario mayor de la gran y temible deidad venusina resplandeciente.',
      'El legado imponente de la poderosa Serpiente Emplumada demuestra claramente la manera ingeniosa en la que los antiguos eruditos e inteligentes sabios mayas lograban unir sin fisuras e indisolublemente sus grandiosas matemÃ¡ticas celestiales mÃ¡s complejas con su fervorosa espiritualidad divina mÃ­stica. Al adorar fanÃ¡ticamente y seguir los pasos de KukulcÃ¡n a travÃ©s de impresionantes ritos religiosos pÃºblicos, el pueblo comÃºn en realidad estaba celebrando, respetando, y afianzando internamente el preciso y rÃ­tmico baile cÃ­clico milenario e inmutable de las majestuosas y brillantes esferas espaciales de nuestro complejo universo giratorio.',
    ],
    expandables: [
      { label: 'El Descenso', icon: 'atom', text: 'Cada aÃ±o solar, invariablemente, durante los mÃ¡gicos y precisos equinoccios estacionales de la primavera renovadora y el sosegado otoÃ±o, miles de asombrados espectadores maravillados se reÃºnen con mucha expectaciÃ³n ansiosa alrededor del milenario templo de "El Castillo". Esperan presenciar cÃ³mo unas caprichosas pero matemÃ¡ticamente precisas sombras triangulares bajan por las escaleras simulando el movimiento serpenteante del dios.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Un asombroso monumento arquitectÃ³nico fuertemente vinculado es la plataforma conocida como El Caracol de la milenaria ciudad de ChichÃ©n ItzÃ¡. El diseÃ±o asimÃ©trico contiene estrechas ventanas que se alinean precisamente de manera astronÃ³mica con los extremos mÃ¡ximos en el horizonte de la salida y la puesta cÃ­clica del planeta de Venus en las diferentes y precisas fechas sagradas clave observadas aÃ±o tras aÃ±o.' },
    ],
    fact: 'El poderoso arquetipo fundamental de la sagrada deidad creadora y resplandeciente QuetzalcÃ³atl/KukulcÃ¡n firmemente conectada con la estrella matutina de Venus es muchÃ­simo y verdaderamente mÃ¡s antiguo de lo que la civilizaciÃ³n clÃ¡sica maya es. Se ha descubierto en ruinas y piezas antiguas de barro que este mito astronÃ³mico grandioso, y venerado compartidamente en toda el Ã¡rea, se rastrea sorprendentemente atrÃ¡s hasta las asombrosas y milenarias culturas tempranas primigenias mesoamericanas olmecas ancestrales.',
  },
  {
    id: 'observacion-tecnicas',
    title: 'TÃ©cnicas Sin Telescopios',
    color: '#F48FB1',
    btnImage: '/assets/maya/infographic_m7/btn_observacion-tecnicas.jpg',
    image: '/assets/maya/infographic_m7/hero_observacion-tecnicas.jpg',
    content: [
      'Â¿Alguna vez te has preguntado impresionado cÃ³mo, hace muchÃ­simos siglos lejanos en el pasado, los antiguos y sabios eruditos mayas lograron calcular matemÃ¡ticamente con tanta y tan grandiosa precisiÃ³n divina los amplios movimientos del brillante firmamento nocturno sin tener acceso siquiera a una humilde lente de vidrio pulido? A diferencia total del famoso cientÃ­fico europeo Galileo Galilei moderno, los dedicados y sagrados sacerdotes mayas nunca poseyeron telescopios, computadoras de engranajes, aparatos astrolabios metÃ¡licos ni finos y complicados sextantes oceÃ¡nicos. Su Ãºnico y poderoso equipo verdaderamente invaluable eran los ojos y mucha paciencia.',
      'Su primer grandioso y genial mÃ©todo cientÃ­fico astronÃ³mico era ciertamente el prolongado sistema metÃ³dico de observar tenazmente el horizonte lejano a simple vista. Imagina ser tÃº mismo un sabio astrÃ³nomo maya responsable que se para firme todos y cada uno de los cÃ¡lidos dÃ­as calurosos exactamente en la mismÃ­sima plataforma cuadrada de piedra milenaria muy elevada para mirar fija y minuciosamente hacia la lejanÃ­a. Al fondo, a lo lejos, el escarpado terreno boscoso, junto con colinas y grandes pirÃ¡mides o monumentos, funcionaba perfectamente a la medida como una especie de gran regla gigante y natural del horizonte.',
      'Para perfeccionar grandemente su aguda visiÃ³n, los ingeniosos y creativos constructores de las inmensas ruinas elaboraron sofisticados sistemas fijos formados intencionalmente por pares precisos de imponentes edificios gigantescos muy altos. Al pararse solemnemente en un templo elevado especÃ­fico de piedra e intentar ver exactamente justo por encima o a travÃ©s del estrecho resquicio arquitectÃ³nico del segundo gigantesco y lejano templo de mamposterÃ­a, lograban crear una poderosÃ­sima lÃ­nea recta de visiÃ³n cruzada, tan inmensamente precisa como la delicada mira telescÃ³pica moderna usada y empleada en los precisos fusiles tÃ¡cticos avanzados.',
      'El famoso y espectacular conjunto arquitectÃ³nico sagrado milenario conocido popularmente como "Grupo E", el cual se localiza cÃ©ntricamente en la extensa reserva y selva de la gran UaxactÃºn, Guatemala, fue indiscutible y orgullosamente el brillantÃ­simo observatorio astronÃ³mico temprano principal mÃ¡s cÃ©lebre de la entera zona maya. Esta particular e increÃ­ble maravilla de la antigua civilizaciÃ³n de la selva cuenta majestuosamente con una altÃ­sima pirÃ¡mide escalonada que funciona perfectamente como un sÃ³lido mirador enfrente de otros tres edificios alineados que seÃ±alan majestuosa y perfectamente las puestas anuales precisas del brillante sol.',
      'Para los pacientes mayas dedicados a la ciencia, el verdadero secreto indispensable no era disponer rÃ¡pidamente de mÃ¡quinas o artefactos costosos, sino tener un estricto e inquebrantable registro continuado incesantemente. A lo largo del largo lapso ininterrumpido de muchos siglos formidables, cientos de sucesivos de dedicados astrÃ³nomos escribieron inagotables pÃ¡ginas repletas de las importantes fechas precisas sagradas de grandes avistamientos astronÃ³micos estelares, transmitiendo generosa y cuidadosamente estos preciosÃ­simos cÃ³dices secretos astronÃ³micos a las preparadas y nuevas juventudes y descendencias eruditas sin permitir que cayera en el vacÃ­o oscuro del olvido.',
    ],
    expandables: [
      { label: 'Herramientas Simples', icon: 'clock', text: 'Los grandes arqueÃ³logos mesoamericanistas postulan y creen firmemente respaldados por evidencias que los antiguos astrÃ³nomos sabios del Ã¡rea utilizaban sencillas e ingeniosas herramientas portÃ¡tiles rÃºsticas. Empleaban frecuentemente simples pares cruzados horizontales formados por varas rectas muy firmes de fina y pulida madera o empleaban incluso unos simples y delgados hilos sumamente tensos anudados que estaban cruzados magistralmente para ayudar en la labor observacional cotidiana del cielo estrellado infinito.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Los inmensos observatorios de la imponente civilizaciÃ³n no poseÃ­an las famosas grandes cÃºpulas hemisfÃ©ricas abiertas caracterÃ­sticas clÃ¡sicas asociadas tradicionalmente que vemos muy repetitivamente adornando frecuentemente hoy en casi todos los majestuosos observatorios Ã³pticos inmensos internacionales muy formales del moderno mundo occidental global; usualmente tenÃ­an techumbres planas o cÃ¡maras angostas en torres.' },
    ],
    fact: 'El conocimiento milenario del registro celeste requerÃ­a verdaderamente y muy absolutamente el paso lentÃ­simo y arduo del continuo tiempo histÃ³rico dinÃ¡stico sagrado para asÃ­ poder eliminar de raÃ­z y sistemÃ¡ticamente todos los pequeÃ±Ã­simos errores acumulativos e incidentales visuales originados inicialmente. Se ha propuesto que tomÃ³ no menos de 300 o hasta de 400 larguÃ­simos y fatigosos aÃ±os completos continuos de diaria paciencia observacional cuidadosa en los primeros asombrosos asentamientos preclÃ¡sicos de la jungla el poder ajustar la famosa conmensurabilidad perfeccionada.',
  },
  {
    id: 'legado-venusino',
    title: 'El Legado: Maya vs. Europa',
    color: '#0288D1',
    btnImage: '/assets/maya/infographic_m7/btn_legado-venusino.jpg',
    image: '/assets/maya/infographic_m7/hero_legado-venusino.jpg',
    content: [
      'Cuando comparamos seriamente los impresionantes y magnÃ­ficos descubrimientos de la civilizaciÃ³n con sus pares en el mundo antiguo, el glorioso y gigantesco legado astronÃ³mico intelectual de los dedicados sabios astrÃ³nomos del mundo maya respecto al resplandeciente planeta Venus brilla excepcionalmente y verdaderamente con muchÃ­sima muchÃ­sima fuerza de luz y de resplandor. Los precisos sabios intelectuales matemÃ¡ticos indÃ­genas de los hÃºmedos bosques lluviosos del caluroso sureste de MÃ©xico y CentroamÃ©rica no tenÃ­an absolutamente nada pero nada en absoluto que llegar a envidiarle secretamente a las mÃ¡s antiguas e ilustres mentes griegas o romanas europeas.',
      'De hecho notable e histÃ³rico comprobable, muchÃ­simo tiempo inmemorial largamente anterior al famoso genio astrÃ³nomo NicolÃ¡s CopÃ©rnico proponiendo su audaz sistema heliocÃ©ntrico o de que Johannes Kepler formulara finalmente en su paÃ­s natal alemÃ¡n las detalladas e imponentes grandiosas y elegantes leyes fÃ­sicas gravitacionales absolutas exactas reales que gobiernan a todos los veloces planetas solares masivos, en aquel entonces los matemÃ¡ticos mayas ya habÃ­an registrado minuciosamente a mano los complejÃ­simos patrones astronÃ³micos cÃ­clicos de la majestuosa estrella resplandeciente Noh Ek con una fabulosa y pasmosa exactitud y nivel casi inverosÃ­mil.',
      'Los antiguos expertos y dedicados sacerdotes de las grandes y masivas ciudades de piedra precolombinas conocÃ­an perfectamente y comprendÃ­an tan detalladamente los secretos caprichosos movimientos estelares planetarios a la perfecciÃ³n y con total rigor riguroso magistral superior, que verdaderamente todas las muy bellamente meticulosas proyecciones inscritas pacientemente en el famoso y delicadÃ­simo gran CÃ³dice antiguo estelar sobreviviente en Dresde llegaban sin esfuerzo aparente a predecir matemÃ¡ticamente y con abrumadora exactitud impecable impecable astronÃ³mica, todos y cada uno de los asombrosos e increÃ­bles futuros movimientos cÃ­clicos continuos eternos por varios milenios repetidos.',
      'A pesar del sumamente incomprensiblemente doloroso y trÃ¡gico y terriblemente devastador desenlace del brutal violento fuego ardiente inquisitorio catÃ³lico destructivo del oscuro siglo inmensamente trÃ¡gico devastador que arruinÃ³ y destruyÃ³ para siempre miles y miles de preciosos e importantÃ­simos registros y cÃ³dices irremplazables con el fuego de las hogueras durante la salvaje y dura conquista imperial violenta colonizadora imperial hispana extranjera en CentroamÃ©rica; este invaluable enorme y asombroso cuerpo numÃ©rico genial mesoamericano sobreviviÃ³ casi milagrosamente en fragmentos de gran valor para nuestro asombro y continuo deleite contemporÃ¡neo de los cientÃ­ficos.',
      'Hoy, gracias a la minuciosa e incansable labor titÃ¡nica dedicada mundial constante moderna intelectual cooperativa internacional gigantesca de incontables y formidables arqueÃ³logos minuciosos tenaces de muchas lenguas, dedicados lingÃ¼istas sagaces decodificadores perspicaces de innumerables textos jeroglÃ­ficos crÃ­pticos y grandes especialistas mayistas e investigadores rigurosos, entendemos maravillosamente profundamente y admiramos intensamente inmensamente el profundo enorme brillante talento indÃ­gena cientÃ­fico matemÃ¡tico asombroso Ãºnico intelectual; y su legendario brillante rastro de la majestuosa gran Noh Ek.',
    ],
    expandables: [
      { label: 'MÃ¡s Exactos', icon: 'atom', text: 'Se considera frecuentemente y muy ampliamente con gran asombro por diversos cientÃ­ficos e historiadores que antes del aÃ±o aproximado 1500 d.C., los grandes matemÃ¡ticos mesoamericanos poseÃ­an en general el mÃ¡s sumamente preciso asombrosÃ­simo calendario complejo e integral de la entera totalidad total del gran mundo humano global entero, llegando a superar ampliamente la enorme exactitud general y rigor observacional del famosÃ­simo e ilustre gran calendario estandarizado juliano utilizado cotidianamente y profusamente por el viejo imperio de occidente europeo.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El conocimiento precolombino astronÃ³mico antiguo mesoamericano ha sido sumamente reconocido y valiosÃ­simamente validado positivamente en los aÃ±os de modernidad tÃ©cnica actual innegablemente de forma rigurosa y matemÃ¡tica astronÃ³mica usando muchÃ­simos modernos potentÃ­simos grandes sÃºper ordenadores computacionales gigantes espaciales, demostrando asÃ­ y maravillosamente de modo genial indiscutible que sus maravillosas antiquÃ­simas observaciones de piedra rÃºstica tallada fueron en su mayorÃ­a correcta e increÃ­blemente atinadas astronÃ³micas y numÃ©ricas.' },
    ],
    fact: 'El gran calendario de origen maya conocido mundialmente de la cuenta larga larguÃ­sima (aquel malentendido famoso de las muy publicitadas desastrosas pero infundadas catastrÃ³ficas predicciones apocalÃ­pticas y del famoso aÃ±o mÃ­tico reciente de 2012 moderno contemporÃ¡neo televisivo popular) estÃ¡ estructurado inteligentÃ­simamente desde su propia importantÃ­sima y sagrada base con los fabulosos grandes e impresionantes y enormes majestuosos mÃºltiplos sagrados matemÃ¡ticos astronÃ³micos originados de la misma estrella radiante venusina Noh Ek de manera espectacular maravillosamente y eternamente precisa y matemÃ¡tica rigurosa indudablemente admirable asombrosa.',
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
        <span>Progreso del Explorador AstronÃ³mico</span>
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
          Fuentes y BibliografÃ­a
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
