'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Linguistics / Translation themed) ──────────────
function DecoRosettaStone({ size = 70, color = '#8B9DAF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stone tablet */}
      <rect x="10" y="6" width="40" height="50" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
      <rect x="10" y="6" width="40" height="16" rx="4" fill={color} opacity="0.12" />
      {/* Script lines - hieroglyphic zone */}
      <line x1="16" y1="12" x2="28" y2="12" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="32" y1="12" x2="44" y2="12" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="16" y1="17" x2="38" y2="17" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Demotic zone */}
      <line x1="16" y1="28" x2="40" y2="28" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <line x1="16" y1="32" x2="36" y2="32" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <line x1="16" y1="36" x2="42" y2="36" stroke={color} strokeWidth="0.8" opacity="0.35" />
      {/* Greek zone */}
      <line x1="16" y1="44" x2="44" y2="44" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="16" y1="48" x2="38" y2="48" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Small glyph dots */}
      <circle cx="20" cy="12" r="1" fill={color} opacity="0.5" />
      <circle cx="36" cy="12" r="1" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoGlyphs({ size = 70, color = '#7A8C9E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Circular alien script characters */}
      <circle cx="20" cy="20" r="10" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M15 20 Q20 12 25 20" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="40" cy="18" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M36 18 Q40 12 44 18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <circle cx="30" cy="42" r="12" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M22 42 Q30 30 38 42" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="30" cy="42" r="4" fill={color} opacity="0.15" />
      {/* Connecting tendrils */}
      <path d="M25 28 Q28 35 24 38" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 26 Q38 32 36 36" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoTranslateArrows({ size = 80, color = '#6A7B8D', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Two text blocks with translation arrows */}
      <rect x="5" y="8" width="25" height="24" rx="3" fill="none" stroke={color} strokeWidth="1.2" />
      <line x1="10" y1="15" x2="25" y2="15" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="10" y1="19" x2="22" y2="19" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="10" y1="23" x2="26" y2="23" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <rect x="50" y="8" width="25" height="24" rx="3" fill="none" stroke={color} strokeWidth="1.2" />
      <line x1="55" y1="15" x2="70" y2="15" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="55" y1="19" x2="67" y2="19" stroke={color} strokeWidth="0.8" opacity="0.5" />
      <line x1="55" y1="23" x2="71" y2="23" stroke={color} strokeWidth="0.8" opacity="0.5" />
      {/* Bidirectional arrows */}
      <path d="M33 17 L47 17" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M44 14 L47 17 L44 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M47 23 L33 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M36 20 L33 23 L36 26" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  );
}

function DecoNeuralNet({ size = 60, color = '#4E4E4E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Neural network nodes and connections */}
      {/* Input layer */}
      <circle cx="10" cy="15" r="3" fill={color} opacity="0.4" />
      <circle cx="10" cy="30" r="3" fill={color} opacity="0.4" />
      <circle cx="10" cy="45" r="3" fill={color} opacity="0.4" />
      {/* Hidden layer */}
      <circle cx="30" cy="12" r="3" fill={color} opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.5" />
      <circle cx="30" cy="48" r="3" fill={color} opacity="0.5" />
      {/* Output layer */}
      <circle cx="50" cy="22" r="3" fill={color} opacity="0.4" />
      <circle cx="50" cy="38" r="3" fill={color} opacity="0.4" />
      {/* Connections */}
      {[15,30,45].map((y1, i) => [12,30,48].map((y2, j) => (
        <line key={`${i}-${j}`} x1="13" y1={y1} x2="27" y2={y2} stroke={color} strokeWidth="0.6" opacity="0.25" />
      )))}
      {[12,30,48].map((y1, i) => [22,38].map((y2, j) => (
        <line key={`h-${i}-${j}`} x1="33" y1={y1} x2="47" y2={y2} stroke={color} strokeWidth="0.6" opacity="0.25" />
      )))}
    </svg>
  );
}

function DecoSpeechBubble({ size = 70, color = '#3D3D3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Speech bubble */}
      <path d="M10 10 Q10 6 14 6 L46 6 Q50 6 50 10 L50 32 Q50 36 46 36 L22 36 L14 46 L16 36 L14 36 Q10 36 10 32 Z"
        fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Text lines inside */}
      <line x1="16" y1="14" x2="44" y2="14" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="16" y1="20" x2="40" y2="20" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="16" y1="26" x2="36" y2="26" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Sound waves */}
      <path d="M52 15 Q56 20 52 25" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M55 12 Q60 20 55 28" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

function DecoSignal({ size = 70, color = '#2C2C2C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Radio dish */}
      <path d="M20 40 Q30 15 40 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="28" x2="30" y2="50" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="22" y1="50" x2="38" y2="50" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="28" r="2" fill={color} opacity="0.5" />
      {/* Signal waves */}
      <path d="M32 22 Q38 18 36 12" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <path d="M34 20 Q42 14 40 6" fill="none" stroke={color} strokeWidth="1" opacity="0.25" />
      <path d="M36 18 Q46 10 44 2" fill="none" stroke={color} strokeWidth="1" opacity="0.15" />
      {/* Stars */}
      <circle cx="15" cy="10" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="8" r="1.2" fill={color} opacity="0.3" />
      <circle cx="10" cy="25" r="0.8" fill={color} opacity="0.35" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'piedra-rosetta': [DecoRosettaStone, DecoGlyphs, DecoTranslateArrows],
  'escrituras-perdidas': [DecoGlyphs, DecoRosettaStone, DecoNeuralNet],
  'traduccion-arte': [DecoTranslateArrows, DecoSpeechBubble, DecoGlyphs],
  'maquinas-traducen': [DecoNeuralNet, DecoTranslateArrows, DecoSignal],
  'lenguas-contacto': [DecoSpeechBubble, DecoTranslateArrows, DecoGlyphs],
  'lenguas-inventadas': [DecoGlyphs, DecoSpeechBubble, DecoSignal],
  'primer-contacto': [DecoSignal, DecoGlyphs, DecoRosettaStone],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Robinson, A. (2002). Lost Languages: The Enigma of the World\'s Undeciphered Scripts. McGraw-Hill',
  'Eco, U. (2003). Mouse or Rat? Translation as Negotiation. Weidenfeld & Nicolson',
  'Hutchins, W.J. (1986). Machine Translation: Past, Present, Future. Ellis Horwood',
  'Okrent, A. (2009). In the Land of Invented Languages. Spiegel & Grau',
  'Freudenthal, H. (1960). Lincos: Design of a Language for Cosmic Intercourse. North-Holland Publishing',
  'Quine, W.V.O. (1960). Word and Object. MIT Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'piedra-rosetta',
    title: 'La Piedra de Rosetta',
    color: '#8B9DAF',
    btnImage: '/assets/ciencia_arrival/infographic_m2/btn_piedra-rosetta.jpg',
    image: '/assets/ciencia_arrival/infographic_m2/hero_piedra-rosetta.jpg',
    content: [
      'En julio de 1799, durante la campaña militar de Napoleón Bonaparte en Egipto, el oficial Pierre-François Bouchard descubrió una losa de granodiorita oscura cerca de la ciudad de Rosetta (actual Rashid) en el delta del Nilo. Esta piedra, que pesaba 762 kilogramos y medía 114 centímetros de alto por 72 de ancho, contenía un decreto del faraón Ptolomeo V emitido en el año 196 antes de nuestra era. Lo que la hacía única no era su contenido, sino que el mismo decreto estaba inscrito en tres escrituras diferentes: jeroglíficos egipcios en la parte superior, escritura demótica en la sección media, y griego antiguo en la base. Esta triple inscripción proporcionó la primera clave real para descifrar la escritura jeroglífica, un sistema que había permanecido indescifrable durante más de mil cuatrocientos años desde el cierre de los últimos templos egipcios en el siglo VI.',
      'El desciframiento de los jeroglíficos fue un proceso largo y competitivo. Thomas Young, un polímata británico conocido por sus contribuciones a la óptica y la teoría ondulatoria de la luz, fue el primero en identificar que algunos grupos de jeroglíficos encerrados en cartuchos ovalados representaban nombres reales, y logró descifrar parcialmente el nombre de Ptolomeo. Sin embargo, Young cometió un error fundamental: asumió que los jeroglíficos eran exclusivamente ideográficos, es decir, que cada símbolo representaba una idea o un objeto completo, sin componente fonético alguno. Este supuesto incorrecto limitó su progreso y dejó el camino abierto para que un investigador más joven completara la tarea con un enfoque diferente.',
      'Jean-François Champollion, un lingüista francés nacido en 1790 en Figeac, dominaba más de una docena de lenguas, incluyendo el copto, un descendiente directo del antiguo egipcio. Esta competencia lingüística resultó decisiva. El 14 de septiembre de 1822, Champollion experimentó su gran revelación al analizar cartuchos de un templo en Abu Simbel: los jeroglíficos combinaban signos fonéticos (que representaban sonidos) con signos ideográficos (que representaban conceptos). Cuando logró leer el nombre de Ramsés II combinando ambos principios, se dice que corrió al despacho de su hermano Jacques-Joseph gritando «Je tiens l\'affaire!» ("¡Lo tengo!") antes de desmayarse por la emoción. Champollion había resuelto el rompecabezas que había desconcertado a los eruditos europeos durante siglos.',
      'El método de Champollion sentó las bases de lo que hoy conocemos como desciframiento comparativo: utilizar un texto conocido en una lengua comprensible como puente para decodificar una lengua desconocida. Este principio es fundamental en la lingüística moderna y tiene aplicaciones que van más allá de las lenguas antiguas. Cada vez que un lingüista trabaja con una comunidad cuya lengua no ha sido documentada, aplica versiones de este método, comparando estructuras, identificando patrones recurrentes y formulando hipótesis que luego verifica. La Piedra de Rosetta demostró que incluso los códigos más opacos pueden abrirse cuando se dispone de un marco de referencia adecuado y de la paciencia necesaria para analizar cada detalle.',
      'La piedra original se encuentra hoy en el Museo Británico de Londres, donde ha sido exhibida desde 1802. Egipto ha solicitado su devolución en múltiples ocasiones, argumentando que fue sacada del país durante una ocupación militar. Este debate sobre la repatriación de artefactos culturales continúa vigente y plantea cuestiones complejas sobre propiedad cultural, justicia histórica y acceso universal al patrimonio de la humanidad. La Piedra de Rosetta no es solo un objeto lingüístico: es un símbolo de cómo el conocimiento puede unir civilizaciones separadas por milenios, y también de cómo los legados coloniales siguen afectando las relaciones entre naciones en el presente.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Piedra de Rosetta no es la única estela trilingüe del mundo antiguo. La inscripción de Behistún, tallada en un acantilado de 100 metros de altura en Irán alrededor del 515 a.C. por orden del rey Darío I, contiene el mismo texto en persa antiguo, elamita y babilonio. Henry Rawlinson escaló el acantilado repetidamente entre 1835 y 1847 para copiar las inscripciones, arriesgando su vida en cada ascenso. Su trabajo fue clave para descifrar la escritura cuneiforme, de manera análoga a lo que la Rosetta hizo por los jeroglíficos.' },
      { label: 'En la Película', icon: 'zap', text: 'En Arrival, Louise Banks enfrenta el mismo problema fundamental que Champollion: necesita una "piedra de Rosetta" para conectar el lenguaje humano con el heptápodo. Sin embargo, su desafío es mucho mayor porque no existe un texto bilingüe de referencia. Debe construir el puente desde cero, señalando objetos y acciones para asociar significados. Este método ostensivo replica técnicas reales que los lingüistas de campo emplean cuando documentan lenguas sin escritura ni traductores disponibles.' },
    ],
    fact: 'Champollion murió a los 41 años, en 1832, apenas una década después de su descubrimiento. Su gramática egipcia y su diccionario jeroglífico fueron publicados póstumamente por su hermano. En esos diez años, Champollion logró leer y clasificar cientos de textos egipcios, estableció las reglas de la gramática jeroglífica y realizó una expedición a Egipto donde registró inscripciones en Karnak, Luxor y el Valle de los Reyes. Su trabajo permitió que generaciones posteriores de egiptólogos accedieran a tres mil años de historia que habían estado sellados detrás de un código visual aparentemente impenetrable.',
  },
  {
    id: 'escrituras-perdidas',
    title: 'Descifrar Escrituras Perdidas',
    color: '#7A8C9E',
    btnImage: '/assets/ciencia_arrival/infographic_m2/btn_escrituras-perdidas.jpg',
    image: '/assets/ciencia_arrival/infographic_m2/hero_escrituras-perdidas.jpg',
    content: [
      'Michael Ventris tenía apenas catorce años cuando asistió a una conferencia de Arthur Evans en la Royal Institution de Londres en 1936 y quedó cautivado por la escritura Lineal B, un sistema descubierto en tablillas de arcilla en Cnosos, Creta. Evans, quien había excavado el Palacio de Cnosos desde 1900, creía que la Lineal B representaba una lengua minoica desconocida y no relacionada con el griego. Ventris, que no era lingüista sino arquitecto de formación, dedicó los siguientes dieciséis años de su vida a descifrar esos signos. En junio de 1952, a los treinta años, Ventris anunció por la BBC que la Lineal B codificaba una forma arcaica del griego micénico, datada alrededor del 1450 a.C. Su método combinó análisis estadístico de frecuencias de signos, identificación de patrones combinatorios en posiciones iniciales y finales de palabras, y una corazonada atrevida de probar valores griegos cuando todas las alternativas no griegas habían fallado.',
      'El desciframiento de Ventris reescribió la historia del Mediterráneo antiguo. Antes de su trabajo, los historiadores creían que la civilización griega letrada comenzaba con Homero, alrededor del 750 a.C. Las tablillas de Lineal B demostraron que los griegos micénicos ya usaban escritura administrativa al menos setecientos años antes, registrando inventarios de grano, lana, aceite de oliva, armas y esclavos. Los textos revelaron una sociedad burocrática compleja con sistemas de tributación, distribución de tierras y culto religioso organizado. Ventris colaboró con el filólogo John Chadwick de la Universidad de Cambridge para publicar Documents in Mycenaean Greek en 1956, un trabajo que estableció definitivamente la lectura de la Lineal B y proporcionó el marco para todos los estudios posteriores.',
      'No todas las escrituras antiguas han sido descifradas. La Lineal A, precursora de la Lineal B y utilizada por la civilización minoica entre el 1800 y el 1450 a.C., sigue sin leerse. Aunque sus signos comparten similitudes gráficas con la Lineal B, la lengua subyacente no parece ser griega ni pertenecer a ninguna familia lingüística conocida. El etrusco, la lengua de la civilización que dominó la Italia central antes de Roma, es otro caso notable. Aunque el alfabeto etrusco se puede leer (deriva del griego), la lengua misma sigue siendo en gran parte incomprendida porque no tiene parientes conocidos y los textos supervivientes son mayoritariamente inscripciones funerarias cortas que ofrecen poco contexto para deducir gramática o vocabulario avanzado.',
      'El manuscrito Voynich, un códice de 240 páginas escrito en un sistema de escritura desconocido e ilustrado con plantas, diagramas astronómicos y figuras humanas, ha resistido todo intento de desciframiento desde su descubrimiento en 1912 por el librero Wilfrid Voynich en la Villa Mondragone cerca de Roma. La datación por carbono-14 realizada en 2009 por la Universidad de Arizona situó el pergamino entre 1404 y 1438. Criptógrafos profesionales, lingüistas computacionales e incluso los descifradores de códigos de la Segunda Guerra Mundial fracasaron en extraer significado del texto. Análisis estadísticos muestran que el "voynichés" tiene propiedades compatibles con un lenguaje natural (como la ley de Zipf y patrones de entropía similares a lenguas reales), pero no se ha logrado determinar si es una lengua real cifrada, un lenguaje inventado con estructura deliberada, o un fraude elaborado.',
      'Los avances en inteligencia artificial han abierto nuevas vías para abordar escrituras no descifradas. En 2019, un equipo del MIT dirigido por Jiaming Luo y Regina Barzilay desarrolló un algoritmo que podía descifrar lenguas perdidas analizando patrones estadísticos de distribución de caracteres y comparándolos con familias lingüísticas conocidas. El sistema logró descifrar parcialmente la Lineal B y el ugarítico sin intervención humana. Aunque estas herramientas no sustituyen el análisis humano contextual, representan una capacidad nueva para procesar grandes volúmenes de datos epigráficos y detectar patrones que escaparían al ojo humano. La combinación de técnicas computacionales con conocimiento arqueológico y lingüístico promete avances reales en la lectura de escrituras que han permanecido mudas durante siglos o milenios.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Michael Ventris murió en un accidente automovilístico en septiembre de 1956, a los 34 años, apenas cuatro años después de su descubrimiento. Su muerte se produjo solo semanas después de la publicación de Documents in Mycenaean Greek. Nunca recibió un título universitario en lingüística ni en clásicas. Su caso demuestra que las barreras entre disciplinas pueden ser una ventaja: su formación como arquitecto le dio una sensibilidad espacial para los patrones visuales de los signos que los filólogos tradicionales habían pasado por alto durante décadas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La ley de Zipf, formulada por George Kingsley Zipf en 1935 en la Universidad de Harvard, establece que en cualquier texto suficientemente largo en una lengua natural, la palabra más frecuente aparecerá aproximadamente el doble de veces que la segunda más frecuente, el triple que la tercera, y así sucesivamente. Esta relación se cumple en todos los idiomas humanos conocidos, desde el mandarín hasta el quechua. El "voynichés" también cumple esta ley, lo cual sugiere que contiene algún tipo de información lingüística real en lugar de ser texto aleatorio.' },
    ],
    fact: 'Existen al menos veinte sistemas de escritura antiguos que permanecen sin descifrar en la actualidad. Entre ellos figuran el proto-elamita (Irán, circa 3100 a.C.), la escritura del Valle del Indo (Pakistán e India, circa 2600-1900 a.C.), el rongorongo de la Isla de Pascua (circa siglo XVIII), y las tablillas de Dispilio (Grecia, circa 5260 a.C., una de las inscripciones más antiguas del mundo). Cada uno de estos sistemas representa una civilización cuyas ideas, leyes y narrativas permanecen inaccesibles. Descifrar cualquiera de ellos equivaldría a abrir una ventana a un mundo que ha permanecido en silencio durante miles de años.',
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En «Arrival», Louise Banks descifra la escritura heptapod de forma similar a como los arqueólogos descifran escrituras antiguas perdidas. La película muestra el proceso metodológico: Louise establece primero un vocabulario básico (sustantivos simples como "humano" y "heptapod"), luego construye gramática y sintaxis progresivamente. Este es exactamente el método que Michael Ventris usó para descifrar el Lineal B micénico en 1952 sin tener un bilingüe como la Piedra de Rosetta. Arrival captura con precisión académica que descifrar una escritura desconocida requiere identificar primero patrones de frecuencia y contexto, no buscar equivalencias directas con idiomas conocidos.' },
    ],
  },
  {
    id: 'traduccion-arte',
    title: 'La Traducción como Arte',
    color: '#6A7B8D',
    btnImage: '/assets/ciencia_arrival/infographic_m2/btn_traduccion-arte.jpg',
    image: '/assets/ciencia_arrival/infographic_m2/hero_traduccion-arte.jpg',
    content: [
      'La traducción no es un simple intercambio de palabras entre idiomas, sino un proceso de negociación cultural que involucra decisiones constantes sobre significado, tono, contexto y efecto. El lingüista Eugene Nida, que trabajó para la Sociedad Bíblica Americana durante más de cinco décadas, distinguió en 1964 entre "equivalencia formal" (traducir palabra por palabra, preservando la estructura del original) y "equivalencia dinámica" (transmitir el mismo efecto emocional y comunicativo en el lector meta que el original produce en su audiencia nativa). Esta distinción sigue siendo fundamental en la teoría de la traducción. Un ejemplo concreto: la expresión inglesa "it\'s raining cats and dogs" no puede traducirse literalmente al español sin generar confusión. La equivalencia dinámica buscaría una expresión equivalente como "llueve a cántaros", que transmite la misma intensidad aunque utilice una imagen completamente diferente.',
      'El debate entre domesticación y extrañamiento (o foreignization), formalizado por el teórico Lawrence Venuti en 1995 en su obra The Translator\'s Invisibility, plantea una tensión fundamental en toda traducción. La domesticación adapta el texto para que suene natural en la lengua y cultura de destino, eliminando elementos que resultarían extraños al lector. El extrañamiento preserva deliberadamente las peculiaridades del original, obligando al lector a confrontar la diferencia cultural. Cada estrategia tiene consecuencias políticas y estéticas. Venuti argumentó que la domesticación, dominante en la tradición anglosajona, tiende a borrar la cultura de origen y crear una ilusión de transparencia. El extrañamiento, en cambio, hace visible el acto de traducción y respeta la alteridad del texto original, aunque puede resultar menos accesible para el lector general.',
      'Todas las lenguas contienen palabras que carecen de equivalente directo en otros idiomas, un fenómeno que los lingüistas denominan "laguna léxica" o intraducibilidad relativa. El portugués "saudade" designa un sentimiento profundo de nostalgia melancólica por algo o alguien amado que está ausente, con una cualidad de dulzura y resignación que no tiene par exacto en otras lenguas romances. El danés "hygge" describe una atmósfera de comodidad, calidez y convivencia que va más allá de simplemente "acogedor". El japonés "tsundoku" nombra el acto de comprar libros y apilarlos sin leerlos. El inuit "iktsuarpok" captura la sensación de salir repetidamente a mirar si alguien que esperas ya llegó. Estas palabras no son curiosidades lingüísticas sino evidencia de que cada cultura segmenta la realidad emocional y perceptiva de maneras distintas, y que la traducción siempre implica cierta pérdida o transformación.',
      'La hipótesis Sapir-Whorf, desarrollada por Edward Sapir y su alumno Benjamin Lee Whorf en las décadas de 1930 y 1940, propone que la estructura de una lengua influye en la percepción y el pensamiento de sus hablantes. En su versión fuerte (determinismo lingüístico), la lengua determina el pensamiento. En su versión débil (relativismo lingüístico), la lengua influye en la cognición sin determinarla completamente. Estudios experimentales han proporcionado apoyo parcial a la versión débil. Lera Boroditsky, investigadora de la Universidad de Stanford, demostró en 2011 que los hablantes de kuuk thaayorre, una lengua aborigen australiana que usa coordenadas cardinales absolutas en lugar de izquierda y derecha, tienen una orientación espacial superior a la de hablantes de inglés. La lengua sí moldea ciertos aspectos de la cognición, aunque no la encierra.',
      'Los traductores literarios enfrentan dilemas que no tienen solución definitiva. ¿Cómo traducir un juego de palabras que depende de la homofonía en el idioma original? ¿Cómo conservar la métrica y la rima de un poema sin sacrificar el significado? ¿Cómo transmitir el registro coloquial de un personaje de una novela sin que suene artificial en otro idioma? Umberto Eco, el semiólogo y novelista italiano, dedicó un libro entero a este tema: Mouse or Rat? Translation as Negotiation (2003), donde argumenta que traducir es siempre un proceso de "negociación" en el que algo se gana y algo se pierde. El título mismo es un ejemplo: el italiano "topo" puede significar tanto "ratón" como "rata", pero en inglés son animales con connotaciones muy diferentes. Toda traducción obliga a elegir, y toda elección implica una renuncia a las alternativas descartadas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Biblia es el texto más traducido de la historia. Según Wycliffe Global Alliance, en 2023 estaba disponible en más de 3.500 lenguas, incluyendo traducciones parciales. El segundo libro más traducido es El Principito de Antoine de Saint-Exupéry, disponible en más de 500 lenguas y dialectos, incluyendo lenguas en peligro de extinción como el pipil de El Salvador y el aragonés de España. Estas traducciones a menudo se realizan no solo para difundir la obra, sino como acto de preservación lingüística de comunidades minoritarias.' },
      { label: 'En la Película', icon: 'zap', text: 'Arrival ilustra el problema de la traducción alienígena cuando Louise intenta determinar si la palabra heptápoda que parece significar "herramienta" en realidad significa "arma". Esta ambigüedad casi desata un conflicto militar global. En la realidad, errores de traducción han tenido consecuencias históricas: la palabra japonesa "mokusatsu", usada por el gobierno japonés en julio de 1945 en respuesta al Ultimátum de Potsdam, podía significar "sin comentarios" o "tratar con desprecio silencioso". La traducción como "desprecio" pudo haber influido en la decisión de usar la bomba atómica.' },
    ],
    fact: 'En 2023, las Naciones Unidas empleaban alrededor de 800 traductores e intérpretes a tiempo completo que trabajan en los seis idiomas oficiales de la organización: árabe, chino, español, francés, inglés y ruso. Cada discurso pronunciado en la Asamblea General se traduce simultáneamente a los otros cinco idiomas. Los intérpretes simultáneos procesan y reformulan el habla con un retraso de solo 2 a 4 segundos, una hazaña cognitiva que requiere años de entrenamiento y que neurocientíficos han demostrado activa regiones cerebrales distintas a las de los hablantes monolingües, incluyendo áreas ampliadas del córtex prefrontal y el cuerpo calloso.',
  },
  {
    id: 'maquinas-traducen',
    title: 'Máquinas que Traducen',
    color: '#4E4E4E',
    btnImage: '/assets/ciencia_arrival/infographic_m2/btn_maquinas-traducen.jpg',
    image: '/assets/ciencia_arrival/infographic_m2/hero_maquinas-traducen.jpg',
    content: [
      'La idea de usar máquinas para traducir idiomas tiene raíces sorprendentemente antiguas. En 1629, el filósofo René Descartes propuso la creación de un lenguaje universal basado en números que pudiera ser comprendido mecánicamente. Sin embargo, la traducción automática como disciplina computacional nació el 7 de enero de 1954, cuando IBM y la Universidad de Georgetown realizaron la primera demostración pública de traducción por computadora. El sistema tradujo sesenta oraciones del ruso al inglés usando un vocabulario de apenas 250 palabras y seis reglas gramaticales. Los organizadores predijeron que la traducción automática sería un problema resuelto en tres a cinco años. Se equivocaron por más de medio siglo. En 1966, el informe ALPAC (Automatic Language Processing Advisory Committee) evaluó el estado del campo y concluyó que la traducción automática era más costosa, más lenta y menos precisa que la traducción humana, recortando drásticamente los fondos de investigación durante una década.',
      'La traducción automática estadística (SMT), desarrollada principalmente en los laboratorios de IBM durante los años 1988-1993, representó un cambio de paradigma. En lugar de codificar reglas gramaticales manualmente, este enfoque alimentaba algoritmos con millones de textos ya traducidos por humanos (corpus paralelos) y dejaba que las estadísticas determinaran las traducciones más probables. Peter Brown y sus colegas en IBM publicaron los modelos fundamentales que transformaron el campo. El sistema funcionaba calculando, para cada frase en el idioma de origen, cuál secuencia de palabras en el idioma meta tenía la mayor probabilidad de ser la traducción correcta, basándose en las frecuencias observadas en los corpus de entrenamiento. Google adoptó este enfoque para lanzar Google Translate en 2006, utilizando los vastos archivos multilingües de las Naciones Unidas y el Parlamento Europeo como datos de entrenamiento.',
      'En noviembre de 2016, Google revolucionó nuevamente el campo al reemplazar su sistema estadístico con Google Neural Machine Translation (GNMT), basado en redes neuronales profundas. Este sistema, descrito en un artículo de Yonghui Wu y colaboradores, procesaba oraciones completas en lugar de fragmentos, capturando contexto y dependencias de largo alcance que los sistemas estadísticos perdían. Las pruebas internas de Google mostraron una reducción del 55-85% en los errores de traducción comparado con el sistema estadístico anterior. El sistema utilizaba un codificador que convertía la oración de origen en una representación numérica abstracta y un decodificador que generaba la traducción a partir de esa representación. Este enfoque permitía por primera vez traducciones que sonaban naturales y coherentes a nivel de párrafo.',
      'La llegada de los modelos de lenguaje grande (LLMs) como GPT-4 de OpenAI (2023) y sus competidores ha transformado las capacidades de traducción una vez más. Estos modelos, entrenados con billones de palabras en cientos de idiomas, no fueron diseñados específicamente para traducir, pero pueden hacerlo con calidad que se aproxima a la humana en muchos pares de idiomas de alto recurso. Su ventaja radica en la comprensión contextual profunda: pueden adaptar el registro, el tono y las expresiones idiomáticas de maneras que los sistemas anteriores no lograban. Sin embargo, siguen teniendo limitaciones significativas con lenguas de bajo recurso (aquellas con poco texto digital disponible), con terminología técnica especializada y con textos que requieren conocimiento cultural profundo. La traducción automática ha avanzado desde reglas codificadas a mano hasta modelos que aprenden patrones del lenguaje de forma autónoma.',
      'A pesar de los avances, la traducción automática tiene limitaciones que la separan de la humana. Los sistemas actuales cometen errores sistemáticos con la ambigüedad, el humor, la ironía y las referencias culturales implícitas. En 2018, un estudio de la Universidad de Zurich evaluó traducciones de Google Translate del inglés al alemán y encontró que los lectores humanos podían distinguir correctamente las traducciones automáticas de las humanas en el 73% de los casos, principalmente por problemas de naturalidad y cohesión textual. Los traductores profesionales utilizan cada vez más la traducción automática como herramienta de asistencia (post-edición), donde la máquina genera un borrador que el humano refina. Este flujo de trabajo híbrido aumenta la productividad entre un 30% y un 50%, según datos de la Comisión Europea, pero no elimina la necesidad del criterio humano para la calidad final del texto traducido.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante la Guerra Fría, la traducción automática del ruso al inglés fue una prioridad de seguridad nacional para los Estados Unidos. La Agencia de Seguridad Nacional (NSA) y la CIA financiaron proyectos de traducción automática para procesar la avalancha de documentos científicos y militares soviéticos. Warren Weaver, un matemático de la Fundación Rockefeller, escribió en 1949 un memorando visionario donde comparaba la traducción con el descifrado de códigos: "Cuando miro un artículo en ruso, digo: esto está realmente escrito en inglés, pero ha sido codificado en caracteres extraños. Ahora procederé a decodificarlo."' },
      { label: 'Dato Científico', icon: 'atom', text: 'El modelo Transformer, introducido por Vaswani y colaboradores de Google en el artículo "Attention Is All You Need" (2017), es la arquitectura que sustenta la mayoría de los sistemas de traducción modernos y los modelos de lenguaje grande. Su mecanismo clave, la "atención" (attention), permite al modelo pesar la relevancia de cada palabra respecto a todas las demás en la oración simultáneamente, en lugar de procesarlas secuencialmente. Una oración de 20 palabras genera 400 pares de relaciones que el modelo evalúa en paralelo. Esta capacidad de capturar dependencias de largo alcance en una sola operación fue lo que desbloqueó la calidad de traducción actual.' },
    ],
    fact: 'En 2024, Google Translate procesaba más de 143 mil millones de palabras por día en más de 133 idiomas, sirviendo a más de 500 millones de usuarios. DeepL, un competidor alemán fundado en 2017, ha demostrado consistentemente mayor calidad que Google en pares de lenguas europeas según evaluaciones ciegas. El mercado global de servicios de traducción, que incluye traducción humana, automática y localización de software, fue valorado en 49.600 millones de dólares en 2022 por la firma de investigación Nimdzi. A pesar de la automatización creciente, el número de traductores profesionales empleados ha aumentado, no disminuido, porque la demanda de contenido multilingüe crece más rápido que la capacidad de las máquinas para producirlo con calidad publicable.',
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la película, el gobierno chino utiliza un sistema computarizado de traducción para intentar comunicarse con los heptapodos — con resultados desastrosos. El general Shang y los militares chinos malinterpretan un logograma que Louise correctamente identifica como "arma", pero que el sistema automático traduce literalmente como "ofrecer". Esta diferencia casi desencadena una guerra global. La película muestra así el límite fundamental de los traductores automáticos de 2016: sin contexto pragmático y comprensión del concepto, la traducción literal puede ser catastróficamente incorrecta. Louise tiene que insistir que "arma" en un idioma sin guerra puede significar "instrumento" o "don".' },
    ],
  },
  {
    id: 'lenguas-contacto',
    title: 'Lenguas de Contacto',
    color: '#3D3D3D',
    btnImage: '/assets/ciencia_arrival/infographic_m2/btn_lenguas-contacto.jpg',
    image: '/assets/ciencia_arrival/infographic_m2/hero_lenguas-contacto.jpg',
    content: [
      'Cuando hablantes de lenguas mutuamente incomprensibles necesitan comunicarse por razones comerciales, laborales o coloniales, surge de forma espontánea un tipo de lengua simplificada llamada pidgin. Un pidgin no es la lengua materna de nadie: es un sistema de comunicación reducido, con vocabulario limitado y gramática mínima, que sirve exclusivamente como herramienta de intercambio entre grupos. El término "pidgin" probablemente proviene de la pronunciación china de la palabra inglesa "business" (pichón > pidgin), registrada en los puertos comerciales de Cantón durante el siglo XVIII. Los pidgins toman vocabulario principalmente de la lengua del grupo con mayor poder social o económico (la lengua "lexificadora") y estructuras gramaticales influenciadas por las lenguas maternas de todos los grupos involucrados. El resultado es un sistema lingüístico nuevo que no es reducible a ninguna de sus lenguas fuente.',
      'Cuando un pidgin se convierte en la lengua materna de una generación de niños, se transforma en un criollo. Este proceso, llamado criollización, es uno de los fenómenos más estudiados en lingüística porque revela información fundamental sobre la capacidad humana para crear gramática. Derek Bickerton, lingüista de la Universidad de Hawái, propuso en 1981 su "hipótesis del bioprograma lingüístico": los niños que crecen expuestos a un pidgin gramaticalmente pobre añaden complejidad gramatical de forma espontánea, generando un criollo con estructura completa. Bickerton estudió el criollo hawaiano, surgido en las plantaciones de caña de azúcar donde trabajadores japoneses, chinos, filipinos, coreanos y portugueses crearon un pidgin basado en el inglés. Los hijos de estos trabajadores transformaron ese pidgin en un criollo con tiempos verbales, artículos, pronombres y subordinación que el pidgin original no poseía.',
      'El Tok Pisin de Papúa Nueva Guinea es un ejemplo vivo de cómo una lengua de contacto puede convertirse en lengua nacional. Originado como pidgin basado en el inglés durante el siglo XIX en las plantaciones de las islas del Pacífico, el Tok Pisin es hoy una de las tres lenguas oficiales de Papúa Nueva Guinea (junto con el inglés y el hiri motu) y es hablado por entre 4 y 5 millones de personas. Su gramática incluye rasgos que no existen en inglés, como la distinción entre "nosotros inclusivo" (yumi, que incluye al oyente) y "nosotros exclusivo" (mipela, que excluye al oyente), una característica que el Tok Pisin comparte con muchas lenguas melanesias e indígenas. El vocabulario es mayoritariamente de origen inglés pero con significados extendidos: "gras bilong fes" (hierba que pertenece a cara) significa "barba", y "haus sik" (casa enfermedad) significa "hospital".',
      'El suajili (o swahili) es la lengua franca más hablada del África subsahariana, con más de 100 millones de hablantes como primera o segunda lengua, distribuidos en Tanzania, Kenia, Uganda, la República Democrática del Congo, Mozambique y otros países. Aunque no es estrictamente un criollo, el suajili evolucionó como lengua de comercio en la costa oriental africana, absorbiendo vocabulario del árabe (aproximadamente el 35% de su léxico), del persa, del portugués y del hindi a lo largo de más de mil años de intercambio mercantil en el océano Índico. Su gramática, sin embargo, es fundamentalmente bantú, con un sistema de clases nominales que clasifica los sustantivos en categorías semánticas marcadas por prefijos, un rasgo compartido con las lenguas bantúes del interior del continente. La Unión Africana adoptó el suajili como lengua de trabajo oficial en 2004.',
      'Las lenguas de contacto demuestran que la comunicación humana se adapta constantemente a las circunstancias sociales, creando sistemas nuevos cuando los existentes resultan insuficientes. Las lenguas francas históricas incluyen el latín en la Europa medieval, el francés en la diplomacia del siglo XVIII al XX, el malayo en el comercio del Sudeste Asiático y el quechua como lengua administrativa del Imperio Inca. En la actualidad, el inglés funciona como lengua franca global, pero con variaciones significativas: el "Globish" (Global English), un inglés simplificado con vocabulario de unas 1.500 palabras propuesto por Jean-Paul Nerrière en 2004, describe la forma en que millones de hablantes no nativos usan el inglés para comunicarse entre sí, no con hablantes nativos. Este fenómeno de contacto lingüístico continúa operando y transformando la comunicación humana a escala planetaria.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El palenquero, hablado en San Basilio de Palenque (Colombia), es el único criollo de base española que sobrevive en América Latina. Fue creado por africanos esclavizados que escaparon de Cartagena de Indias en el siglo XVII y fundaron un palenque (comunidad fortificada de cimarrones). El palenquero combina vocabulario español con gramática de lenguas bantúes del Congo. En 2005, la UNESCO declaró a Palenque Obra Maestra del Patrimonio Oral e Inmaterial de la Humanidad, reconociendo su lengua, música y tradiciones como tesoro cultural vivo.' },
      { label: 'En la Película', icon: 'zap', text: 'El proceso que Louise Banks sigue en Arrival para comunicarse con los heptápodos replica la génesis de un pidgin: dos grupos sin lengua compartida crean un vocabulario mínimo de intercambio, comenzando con objetos concretos y acciones simples. Sin embargo, Louise aspira a ir mucho más allá de un pidgin, buscando acceder a la gramática completa y los conceptos abstractos del Heptápodo B. Este salto equivaldría a pasar de un pidgin comercial a la comprensión plena de una lengua y una cosmovisión totalmente ajenas.' },
    ],
    fact: 'Papúa Nueva Guinea, con una población de aproximadamente 9 millones de personas, alberga más de 840 lenguas vivas documentadas, lo que la convierte en el país con mayor diversidad lingüística del planeta. Muchas de estas lenguas son habladas por comunidades de apenas unos cientos de personas, separadas por valles montañosos, ríos caudalosos y selvas densas que históricamente limitaron el contacto entre grupos. Esta fragmentación lingüística extrema fue precisamente lo que hizo necesario el Tok Pisin como lengua vehicular. Sin él, los habitantes de un valle no podrían comunicarse con los del valle vecino, a pesar de vivir a pocos kilómetros de distancia.',
  },
  {
    id: 'lenguas-inventadas',
    title: 'Lenguas Inventadas',
    color: '#2C2C2C',
    btnImage: '/assets/ciencia_arrival/infographic_m2/btn_lenguas-inventadas.jpg',
    image: '/assets/ciencia_arrival/infographic_m2/hero_lenguas-inventadas.jpg',
    content: [
      'Ludwik Lejzer Zamenhof, un oftalmólogo nacido en 1859 en Białystok (entonces parte del Imperio Ruso, hoy Polonia), creció en una ciudad donde convivían hablantes de ruso, polaco, yiddish y alemán, y donde las tensiones étnicas eran constantes. Zamenhof atribuyó gran parte de esos conflictos a la barrera lingüística y dedicó años a construir una lengua auxiliar internacional que facilitara la comunicación pacífica entre pueblos. En 1887, bajo el seudónimo "Doktoro Esperanto" (Doctor Esperanzado), publicó su Unua Libro, la primera gramática del esperanto. La lengua fue diseñada con solo dieciséis reglas gramaticales sin excepciones, un vocabulario derivado de raíces latinas, germánicas y eslavas, y un sistema de formación de palabras por aglutinación de afijos que permitía crear vocabulario nuevo de forma predecible. Hoy, entre 100.000 y 2 millones de personas hablan esperanto en algún grado, con una comunidad activa que produce literatura, música, podcasts y conferencias anuales.',
      'Las lenguas construidas (conlangs, del inglés "constructed languages") se dividen en categorías según su propósito. Las lenguas auxiliares (auxlangs) como el esperanto buscan servir como herramienta de comunicación internacional neutral. Las lenguas artísticas (artlangs) se crean para ficción o expresión estética. Las lenguas filosóficas intentan reflejar una estructura lógica del pensamiento. J.R.R. Tolkien, profesor de anglosajón en la Universidad de Oxford, creó el quenya y el sindarin (lenguas élficas) no como accesorio de sus novelas, sino como su motivación principal: Tolkien escribió que "las historias se inventaron para proporcionar un mundo a las lenguas, y no al revés". Sus lenguas tienen fonología elaborada, gramática completa con declinaciones y conjugaciones, y una historia ficticia de evolución lingüística que refleja su conocimiento profesional de la filología germánica y la lingüística histórica.',
      'La creación de lenguas para cine y televisión alcanzó un nuevo nivel de sofisticación con el klingon, desarrollado por el lingüista Marc Okrand para la película Star Trek III: En busca de Spock (1984). Okrand diseñó deliberadamente el klingon para que sonara "alienígena" a oídos angloparlantes, usando un orden de palabras Objeto-Verbo-Sujeto (OVS) que es extremadamente raro entre las lenguas humanas (solo unas seis lenguas naturales lo utilizan como orden básico). El klingon tiene un vocabulario de más de 3.000 palabras, una gramática completa publicada en The Klingon Dictionary (1985), y una comunidad de hablantes que mantiene el Klingon Language Institute, publica traducciones de Hamlet y La Biblia al klingon, y organiza conferencias anuales. Google incluso agregó el klingon como opción de idioma de interfaz en 2003.',
      'David J. Peterson, lingüista graduado de la Universidad de California en San Diego, creó el dothraki para la serie Game of Thrones (2011) y el valyrio alto para la misma producción. Peterson desarrolló más de 4.000 palabras para el dothraki con un sistema fonológico inspirado en lenguas turcas y árabes, gramática aglutinante con cuatro géneros (animado, inanimado, divino y abstracto en valyrio) y reglas de derivación morfológica que permiten generar vocabulario nuevo siguiendo patrones internamente consistentes. Para Avatar (2009), Paul Frommer, profesor de la Universidad del Sur de California con doctorado en lingüística, creó el na\'vi con un sistema de eyectivas (consonantes producidas con cierre glotal simultáneo) que le da su sonido distintivo, además de un sistema tripartito de marcación de caso que es raro pero documentado en lenguas naturales como el nez percé de Idaho.',
      'La comunidad conlang (de constructores de lenguas) ha crecido significativamente desde la popularización de internet. La Language Creation Society, fundada en 2007, organiza conferencias bianuales donde cientos de creadores de lenguas presentan sus trabajos, que van desde lenguas con gramáticas de cientos de páginas hasta experimentos lingüísticos que prueban los límites de lo que puede considerarse un "lenguaje". Algunas conlangs exploran preguntas filosóficas profundas: Lojban (basado en el proyecto Loglan de 1955) fue diseñado para ser culturalmente neutral y lógicamente inequívoco, eliminando toda ambigüedad gramatical. Ithkuil, creado por John Quijada entre 1978 y 2004, es un lenguaje diseñado para expresar el máximo de significado con el mínimo de formas, utilizando 96 casos gramaticales. Estas lenguas funcionan como laboratorios donde se ponen a prueba hipótesis sobre la naturaleza del lenguaje y los límites de la cognición humana.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El esperanto tiene hablantes nativos: se estima que entre 1.000 y 2.000 personas en el mundo aprendieron esperanto como primera lengua porque sus padres se conocieron en la comunidad esperantista y decidieron criar a sus hijos en esa lengua. George Soros, el financiero multimillonario nacido en Budapest en 1930, fue criado como hablante nativo de esperanto. Su padre, Tivadar Soros, era un esperantista convencido que incluso cambió el apellido familiar del original húngaro "Schwartz" al esperanto "Soros" (que significa "ascenderá").' },
      { label: 'Dato Científico', icon: 'atom', text: 'Estudios psicolingüísticos han demostrado que aprender esperanto antes de una segunda lengua natural acelera el aprendizaje posterior. Un estudio de Helmar Frank en la Universidad de Paderborn (1971-1974) mostró que estudiantes que dedicaron un año a esperanto y tres años a francés alcanzaron un nivel superior en francés que los que dedicaron cuatro años completos a francés sin la base de esperanto. Este "efecto propedéutico" se atribuye a que la gramática regular del esperanto entrena las habilidades metalingüísticas del aprendiz, preparándolo para reconocer y manejar estructuras gramaticales en cualquier lengua posterior.' },
    ],
    fact: 'Tolkien trabajó en sus lenguas élficas durante más de sesenta años, desde 1910 (cuando tenía 18 años) hasta su muerte en 1973. El quenya tiene aproximadamente 25.000 raíces léxicas documentadas en sus manuscritos, múltiples registros históricos que simulan evolución fonológica a lo largo de edades ficticias, y una caligrafía propia (los tengwar) diseñada con principios fonéticos donde la forma de cada letra refleja sistemáticamente su punto y modo de articulación. Tolkien aplicó a sus lenguas los mismos métodos de la gramática comparada que los lingüistas del siglo XIX usaron para reconstruir el protoindoeuropeo, creando el ejemplo más elaborado de lingüística ficticia de la historia.',
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El logograma heptapod de «Arrival» fue diseñado como un sistema de escritura completamente inventado y funcional por el diseñador Patrice Vermette bajo supervisión del lingüista real Stephen Wolfram. Cada logograma es un símbolo circular que codifica una oración completa sin secuencia temporal — simultáneamente, no linealmente. Para crear este sistema, el equipo estudió lenguas reales inventadas como el Klingon (Marc Okrand, 1984) y el Élfico de Tolkien, pero optaron por algo más radical: una escritura que no corresponde a ningún fonema y que cambia el tiempo del pensador solo con aprenderla. El sistema usa 100 logogramas base con modificadores.' },
    ],
  },
  {
    id: 'primer-contacto',
    title: 'Primer Contacto Lingüístico',
    color: '#1B1B1B',
    btnImage: '/assets/ciencia_arrival/infographic_m2/btn_primer-contacto.jpg',
    image: '/assets/ciencia_arrival/infographic_m2/hero_primer-contacto.jpg',
    content: [
      'El 16 de noviembre de 1974, el radiotelescopio de Arecibo en Puerto Rico transmitió un mensaje binario de 1.679 bits hacia el cúmulo estelar M13, situado a 25.000 años luz de distancia. El mensaje, diseñado por Frank Drake y Carl Sagan, codificaba información sobre el sistema de numeración humano, los elementos químicos del ADN, la estructura de la doble hélice, la forma y tamaño de un ser humano, la población terrestre, la posición de la Tierra en el sistema solar y las dimensiones del propio telescopio. El número 1.679 fue elegido deliberadamente porque es el producto de dos números primos (23 × 73), lo que significa que solo puede organizarse en una cuadrícula de 23 columnas por 73 filas o de 73 columnas por 23 filas. Una civilización matemáticamente competente probaría ambas disposiciones y descubriría que solo una produce patrones reconocibles en lugar de ruido aleatorio.',
      'Hans Freudenthal, matemático holandés de la Universidad de Utrecht, publicó en 1960 Lincos: Design of a Language for Cosmic Intercourse, un lenguaje formal diseñado específicamente para la comunicación con inteligencias no humanas. Lincos comenzaba transmitiendo secuencias de pulsos que representaban números naturales, luego introducía operaciones aritméticas mediante ejemplos redundantes que hacían evidente su significado. Una vez establecidas las matemáticas básicas, Freudenthal construía sobre ellas conceptos de tiempo ("antes", "después", "duración"), comportamiento ("querer", "saber", "preguntar"), y ética ("bueno", "malo"). La brillantez del diseño radicaba en que no asumía ningún conocimiento compartido excepto la capacidad de detectar patrones lógicos. Su limitación era igualmente fundamental: asumía que una inteligencia alienígena pensaría en categorías compatibles con la lógica formal humana.',
      'El debate sobre si deberíamos enviar mensajes activamente al espacio (METI, Messaging Extraterrestrial Intelligence) o limitarnos a escuchar (SETI, Search for Extraterrestrial Intelligence) divide a la comunidad científica. En 2015, un grupo de científicos y empresarios tecnológicos, incluyendo a Stephen Hawking y Elon Musk, firmaron una declaración pública contra el envío de mensajes a civilizaciones desconocidas, argumentando que no deberíamos anunciar nuestra presencia sin un consenso internacional previo. Hawking comparó el riesgo con la llegada de Colón a América: "Si los extraterrestres nos visitaran, el resultado sería similar a cuando Colón llegó a América, y no fue precisamente positivo para los nativos americanos." Otros investigadores, como Douglas Vakoch, presidente de METI International, argumentan que las señales de televisión y radar de la Tierra ya han estado viajando al espacio desde la década de 1930 y que cualquier civilización con tecnología de detección avanzada ya sabe que estamos aquí.',
      'La xenolingüística, el estudio teórico de lenguas de origen no humano, enfrenta un problema epistemológico fundamental: no tenemos ningún ejemplo de comunicación alienígena con el cual trabajar. Sin embargo, la investigación en comunicación animal ha proporcionado herramientas conceptuales valiosas. El proyecto CHAT (Cetacean Hearing and Telemetry) de Denise Herzing en la Universidad Internacional de Florida ha documentado que los delfines nariz de botella producen "firmas" silbantes individuales que funcionan como nombres propios, un rasgo que durante mucho tiempo se consideró exclusivo del lenguaje humano. Los estudios de Irene Pepperberg con el loro gris africano Alex (1977-2007) demostraron que un ave podía aprender más de 100 palabras en inglés, usar conceptos de color, forma, número y categoría, y formular preguntas originales como "¿de qué color soy yo?", la primera pregunta existencial documentada de un animal no humano.',
      'En la película Arrival, dirigida por Denis Villeneuve y basada en el relato "Story of Your Life" de Ted Chiang (1998), la lingüista Louise Banks emplea una metodología que refleja principios reales de la lingüística de campo: comienza con deixis (señalar y nombrar), avanza hacia verbos de acción y luego intenta conceptos abstractos. La innovación narrativa de la película radica en la hipótesis de Sapir-Whorf llevada a su extremo: aprender la lengua circular de los heptápodos no solo cambia cómo Louise habla, sino cómo percibe el tiempo, otorgándole una cognición simultánea del pasado, presente y futuro. Aunque la versión fuerte de Sapir-Whorf (que la lengua determina el pensamiento) no tiene apoyo empírico sólido para las lenguas humanas, la película plantea una pregunta legítima: si encontráramos una lengua radicalmente diferente a todas las humanas, con una estructura basada en principios cognitivos que no compartimos, ¿podría aprenderla alterar nuestra percepción de la realidad de maneras que hoy no podemos anticipar?',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Los logogramas circulares del Heptápodo B en Arrival fueron diseñados por la artista Martine Bertrand y el equipo de producción bajo la dirección de Patrice Vermette. Cada logograma es un círculo de tinta producido simultáneamente (sin punto de inicio ni final), reflejando la percepción no lineal del tiempo de los heptápodos. La producción creó más de 100 logogramas distintos con variaciones semánticas codificadas en las curvas, bifurcaciones y densidad de las formas. Ted Chiang, autor del relato original, ha señalado que la idea de una escritura que se produce de forma instantánea fue su punto de partida para explorar la relación entre lenguaje y percepción temporal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las sondas Voyager 1 y 2, lanzadas en 1977, llevan los Discos de Oro: registros fonográficos de cobre chapado en oro que contienen 115 imágenes, saludos en 55 lenguas humanas, 90 minutos de música (desde Bach hasta Chuck Berry), sonidos de la naturaleza y un mensaje del presidente Carter. Las instrucciones de reproducción están grabadas en la cubierta usando notación binaria y el periodo de transición del átomo de hidrógeno como unidad de tiempo universal. Voyager 1, a más de 24 mil millones de kilómetros de la Tierra en 2024, tardará aproximadamente 40.000 años en pasar cerca de otra estrella (Gliese 445 en la constelación de la Jirafa).' },
    ],
    fact: 'El programa SETI ha analizado señales de radio provenientes de más de mil millones de estrellas sin detectar ninguna señal de origen artificial confirmado. La señal más prometedora fue la "señal Wow!", captada el 15 de agosto de 1977 por el radiotelescopio Big Ear de la Universidad Estatal de Ohio. El astrónomo Jerry Ehman, al revisar los datos impresos, escribió "Wow!" en el margen. La señal duró 72 segundos, coincidía con la frecuencia del hidrógeno (1420 MHz, considerada una frecuencia natural para comunicación interestelar), era 30 veces más potente que el ruido de fondo, y nunca se repitió a pesar de décadas de monitoreo continuo de esa región del cielo. En 2017, un estudio sugirió que podía deberse a la emisión de hidrógeno de cometas, pero esta explicación sigue siendo debatida entre los astrónomos.',
  },
];

// ─── Linguistic Particle Field (Canvas Background) ──────────────────────────
function LinguisticField() {
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
      hue: Math.random() > 0.5 ? '139,157,175' : '106,123,141', // fog gray tones
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

// ─── Translation Header ─────────────────────────────────────────────────────
function TranslationHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(139,157,175,0.3))' }}>
        {/* Linguistic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#lingGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
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
        {/* Central glyph icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#8B9DAF" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="6" fill="none" stroke="#8B9DAF" strokeWidth="1" opacity="0.4" />
        <circle cx="300" cy="30" r="2" fill="#8B9DAF" opacity="0.5" />
        <path d="M293 30 Q300 22 307 30" fill="none" stroke="#8B9DAF" strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="lingGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(139,157,175,0.2)" />
            <stop offset="50%" stopColor="rgba(139,157,175,0.9)" />
            <stop offset="100%" stopColor="rgba(139,157,175,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#8B9DAF" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">TRADUCCIÓN Y DESCIFRAMIENTO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(139,157,175,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL PUENTE ENTRE LENGUAS Y MUNDOS</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ─────────────────────────────
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
          layoutId="activeDotArrivalM2"
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

        {/* ─── Conditional Video Render ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} />
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
export default function InteractiveInfographic_ArrivalM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.90) 0%, rgba(15,15,22,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/arrival/arrival_m2.png)',
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
      <LinguisticField />

      <TranslationHeader />

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
              🏆 ¡Has dominado los secretos de la Traducción y el Desciframiento!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Primer Contacto
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
