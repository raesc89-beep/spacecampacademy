'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Maya themed) ────────────────────────────

function DecoStela({ size = 70, color = '#D7CCC8', style = {} }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 40 60" style={{ opacity: 0.25, ...style }}>
      <rect x="10" y="5" width="20" height="50" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M15 10 L25 10 M15 15 L25 15 M15 20 L20 20 M15 25 L25 25 M15 30 L22 30 M15 35 L25 35 M15 40 L25 40 M15 45 L19 45 M15 50 L25 50" stroke={color} strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      <circle cx="20" cy="15" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoBallCourt({ size = 70, color = '#558B2F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="5" y="15" width="15" height="30" fill="none" stroke={color} strokeWidth="2" />
      <rect x="40" y="15" width="15" height="30" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.8" />
      <line x1="20" y1="30" x2="40" y2="30" stroke={color} strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
      <path d="M 20 15 L 40 15 M 20 45 L 40 45" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoHieroglyphStair({ size = 70, color = '#F9A825', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M5 50 L15 50 L15 40 L25 40 L25 30 L35 30 L35 20 L45 20 L45 10 L55 10" fill="none" stroke={color} strokeWidth="2" />
      {/* Tiny glyph blocks */}
      {[10, 20, 30, 40].map((x, i) => (
        <rect key={i} x={x} y={45 - i * 10} width="4" height="4" fill={color} opacity="0.7" />
      ))}
      {[16, 26, 36, 46].map((x, i) => (
        <circle key={i} cx={x} cy={47 - i * 10} r="1.5" fill={color} opacity="0.7" />
      ))}
    </svg>
  );
}

function DecoAltarQ({ size = 70, color = '#D84315', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <rect x="10" y="15" width="40" height="30" rx="4" fill="none" stroke={color} strokeWidth="2" />
      {/* 4 sides representation */}
      <rect x="15" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <rect x="26" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <rect x="37" y="20" width="8" height="20" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      {/* Rulers tiny heads */}
      <circle cx="19" cy="25" r="2" fill={color} opacity="0.8" />
      <circle cx="30" cy="25" r="2" fill={color} opacity="0.8" />
      <circle cx="41" cy="25" r="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoMacaw({ size = 70, color = '#0277BD', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M40 20 Q50 15 55 25 Q45 28 40 25 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M40 20 Q35 10 25 15 C15 20 10 35 20 45 Q30 55 45 40 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="22" r="2.5" fill={color} opacity="0.8" />
      <path d="M25 25 Q15 30 20 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M55 25 Q58 35 50 45" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3,2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'copan-ciudad': [DecoStela, DecoHieroglyphStair, DecoMacaw],'estelas-astronomicas': [DecoStela, DecoAltarQ, DecoBallCourt],
  'congreso-astronomico': [DecoAltarQ, DecoStela, DecoHieroglyphStair],'altar-q': [DecoAltarQ, DecoHieroglyphStair, DecoMacaw],'escalinata-jeroglificos': [DecoHieroglyphStair, DecoStela, DecoBallCourt],'cancha-pelota': [DecoBallCourt, DecoMacaw, DecoAltarQ],
  'observatorio-copan': [DecoStela, DecoMacaw, DecoBallCourt],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Fash, W.L. (2001). Scribes, Warriors and Kings: The City of Copán and the Ancient Maya, Thames & Hudson',
  'Martin, S. & Grube, N. (2000). Chronicle of the Maya Kings and Queens, Thames & Hudson',
  'Aveni, A.F. (2001). Skywatchers of Ancient Mexico, University of Texas Press',
  'Stuart, D. (2005). "Ideology and Classic Maya Kingship", A Catalyst for Ideas, SAR Press',
  'Baudez, C.F. (1994). Maya Sculpture of Copán, University of Oklahoma Press',
];

const INFOGRAPHIC_NODES = [
  {
    "id": "copan-ciudad",
    "bannerImage": "/assets/maya/infographic_m12/banner_copan-ciudad.webp",
    "title": "La Ciudad: Copán",
    "color": "#D7CCC8",
    "btnImage": "/assets/maya/infographic_m12/btn_copan-ciudad.jpg",
    "image": "/assets/maya/infographic_m12/hero_copan-ciudad.jpg",
    "content": [
      "Ubicada en el fértil valle del río homónimo en el occidente de la actual República de Honduras, la antigua urbe de Copán —denominada en los textos jeroglíficos clásicos como el reino de Xukpi («Rincón» o «Canto de Pájaro»)— representó el bastión cultural más meridional y refinado de las tierras bajas mayas. Declarada Patrimonio de la Humanidad por la UNESCO en 1980, la metrópoli destacó por su insuperable escultura en bulto redondo.",
      "La dinastía real que llevó a Copán a su edad de oro fue fundada en el año 426 d.C. por el noble foráneo K'inich Yax K'uk' Mo' («Gran Sol Guacamaya Resplandeciente»), un caudillo militar vinculado estrechamente a Teotihuacan y Tikal. A lo largo de cuatro siglos, dieciséis soberanos dinásticos gobernaron el valle transformando el asentamiento original en una colosal acrópolis repleta de palacios, templos y patios ceremoniales elevados.",
      "A diferencia de la caliza suave de Yucatán, los canteros de Copán dispusieron de toba volcánica andesítica de tonalidad verdosa, un mineral ígneo excepcionalmente maleable al ser recién extraído pero que endurece al contacto con el aire. Esta condición geológica única permitió a los artistas copanecos abandonar el relieve plano tradicional para esculpir esculturas tridimensionales exentas que dotaron a la ciudad de un realismo plástico asombroso.",
      "El diseño urbano de la Gran Plaza y la Acrópolis de Copán refleja una cuidadosa integración con el curso sinuoso del río y las colinas circundantes. Los constructores levantaron muros de contención monumentales de hasta treinta metros de altura para proteger las terrazas sagradas de las inundaciones estacionales, organizando el espacio cívico para albergar a decenas de miles de personas durante las conmemoraciones rituales del calendario.",
      "Más allá de su poderío militar y comercial en la ruta del jade del río Motagua, Copán se consolidó como el centro intelectual y astronómico por excelencia del periodo Clásico maya. En sus escuelas sacerdotales se congregaron los matemáticos más sobresalientes de Mesoamérica para descifrar la mecánica celeste, legando a la posteridad cálculos lunares y solares cuya precisión rivaliza con las observaciones de la astronomía moderna."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Los análisis de isótopos de estroncio y oxígeno en los restos óseos del fundador K'inich Yax K'uk' Mo', sepultado en la tumba Hunal bajo el Templo 16, confirmaron que no nació en Copán, sino en las lejanas tierras bajas del Petén guatemalteco, y que residió durante años en Teotihuacan antes de llegar al valle hondureño para fundar su dinastía en 426 d.C."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La toba volcánica verde de Copán está compuesta por cenizas y fragmentos de pómez consolidados procedentes de erupciones volcánicas del periodo Terciario. Su relativa porosidad facilitó el tallado profundo con cinceles de pedernal y obsidiana, aunque en la actualidad requiere tratamientos de consolidación con silicato de etilo para prevenir el desgaste erosivo por lluvias ácidas."
      }
    ],
    "fact": "La Acrópolis de Copán es una de las mayores plataformas artificiales de tierra y piedra construidas en el Nuevo Mundo, con un volumen aproximado de dos millones de metros cúbicos de material de relleno. En su flanco oriental, el corte erosionado producido por el río Copán expuso un corte estratigráfico natural de 30 metros de altura que reveló más de 400 años de fases constructivas superpuestas."
  },
  {
    "id": "estelas-astronomicas",
    "bannerImage": "/assets/maya/infographic_m12/banner_estelas-astronomicas.webp",
    "title": "Las Estelas Solares",
    "color": "#F9A825",
    "btnImage": "/assets/maya/infographic_m12/btn_estelas-astronomicas.jpg",
    "image": "/assets/maya/infographic_m12/hero_estelas-astronomicas.jpg",
    "content": [
      "La topografía montañosa del valle de Copán ofreció a los astrónomos locales una ventaja singular: la posibilidad de transformar las crestas naturales del paisaje en un observatorio solar de proporciones colosales. Para lograrlo, durante el siglo VII d.C., bajo el patrocinio del duodécimo rey K'ahk' Uti' Witz' K'awiil («Humo Humano»), se mandaron erigir dos estelas monumentales de piedra sobre colinas opuestas que enmarcan el valle.",
      "La Estela 12 fue colocada en una elevación en el flanco este del valle, mientras que la Estela 10 se ubicó en la cima de una colina en el flanco oeste, separadas entre sí por una distancia lineal de exactamente 7.1 kilómetros. Al pararse junto a la Estela 12 y contemplar el horizonte occidental, la Estela 10 funciona como una mira milimétrica que señala el punto exacto donde se pone el disco solar en dos fechas críticas del año trópico.",
      "Las observaciones arqueoastronómicas han demostrado que el Sol se oculta directamente detrás de la Estela 10, visto desde la Estela 12, el 12 de abril y el 7 de septiembre. La fecha del 12 de abril revestía una trascendencia agrícola vital para toda la población del valle: marcaba el día oficial para dar inicio a la tumba y quema de la vegetación seca en las laderas montañosas antes de la inminente llegada del temporal de lluvias.",
      "La separación temporal entre estas fechas no es aleatoria: el intervalo entre el 12 de abril y el primer paso cenital del Sol en Copán (que ocurre el 30 de abril) establecía una cuenta calendárica rigurosa que permitía a los sacerdotes anunciar con semanas de anticipación el momento exacto para la siembra de la milpa, evitando que las lluvias torrenciales tempranas pudrieran la semilla antes de que los campos estuvieran preparados.",
      "Estas estelas solares demuestran que los mayas concebían el paisaje físico y el cielo como una unidad geométrica indivisible. La ciudad no se encerraba dentro de sus murallas ceremoniales, sino que proyectaba sus líneas de puntería visual hacia las cumbres lejanas, sacralizando la geografía entera del valle y subordinando la vida comunal cotidiana a los mandatos inapelables de la mecánica astronómica diurna."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Durante la puesta de sol del 12 de abril, las columnas de humo producidas por la quema de cientos de milpas en las laderas del valle de Copán teñían el cielo de tonos anaranjados y rojizos espectaculares. Los antiguos habitantes consideraban que este humo perfumado con resinas de pino ascendía como una plegaria colectiva hacia el dios solar K'inich Ahau."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Una línea de mira astronómica de 7.1 kilómetros de longitud reduce drásticamente el error angular visual. Con una distancia tan prolongada entre ambas estelas, el desplazamiento aparente del Sol sobre el horizonte de un solo día (aproximadamente medio grado de arco) resultaba evidente a simple vista, permitiendo a los sacerdotes fijar la fecha con una exactitud de 24 horas."
      }
    ],
    "fact": "La Estela 10 de Copán se alza a 2,200 metros sobre el nivel del mar en la cima de la colina de El Chino, orientada con un acimut de 278° 20' respecto a la Estela 12. Este colosal dispositivo óptico a cielo abierto constituye una de las líneas de observación arqueoastronómica de mayor envergadura territorial documentadas en todo el continente americano."
  },
  {
    "id": "congreso-astronomico",
    "bannerImage": "/assets/maya/infographic_m12/banner_congreso-astronomico.webp",
    "title": "El Gran Congreso del 763",
    "color": "#6A1B9A",
    "btnImage": "/assets/maya/infographic_m12/btn_congreso-astronomico.jpg",
    "image": "/assets/maya/infographic_m12/hero_congreso-astronomico.jpg",
    "content": [
      "A mediados del siglo VIII d.C., la ciudad de Copán fue el escenario de uno de los hitos científicos más extraordinarios de la historia mesoamericana: una asamblea cumbre de sabios astrónomos y sacerdotes matemáticos procedentes de las principales metrópolis mayas, conocida en la historiografía moderna como el Gran Congreso Astronómico del año 763 d.C. (o 776 d.C., según correlaciones de monumentos específicos).",
      "El motivo central de esta histórica reunión internacional fue la necesidad de homologar y calibrar con absoluta precisión matemática los ciclos lunares y el año trópico solar en todo el territorio maya. Debido a que el año solar real dura aproximadamente 365.2422 días y el calendario civil Haab' empleaba un año fijo de 365 días sin años bisiestos intercalados, se producía un desfasamiento acumulativo que amenazaba el orden ritual.",
      "En este concilio de sabios, los astrónomos de Copán presentaron su brillante fórmula de equivalencia lunar, grabada en el Altar Q y en monumentos de la Acrópolis: 149 lunaciones sinódicas equivalen con exactitud a 4,400 días solares. Esta sencilla razón matemática arrojaba una duración media del mes lunar de 29.53020 días, un cálculo empírico de pasmosa exactitud que difería en escasos segundos del valor atómico moderno (29.53059 días).",
      "Asimismo, los delegados debatieron sobre la correlación del ciclo de eclipses solares y lunares mediante intervalos de 177 y 148 días, los cuales quedarían posteriormente compilados en las célebres tablas astronómicas del Códice de Dresde. La adopción colectiva de estas fórmulas en centros distantes como Tikal, Yaxchilán, Quiriguá y Palenque confirma la existencia de una comunidad científica colaborativa e interconectada en Mesoamérica.",
      "Para conmemorar este triunfo de la razón matemática y el intelecto astronómico, los gobernantes de Copán consagraron altares esculpidos y fechas conmemorativas en la Cuenta Larga. El congreso demostró que, aun en una época marcada por crecientes tensiones geopolíticas y guerras interdinásticas, el intercambio pacífico del saber astronómico trascendía las fronteras militares para beneficio del calendario común."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el Altar Q, los dieciséis reyes de Copán aparecen sentados sobre glifos con sus nombres en una solemne asamblea circular. Aunque el altar conmemora la legitimidad dinástica, los textos inscritos en su cara superior registran una fecha clave del año 776 d.C. que coincide con la calibración final de las tablas astronómicas aprobadas en el congreso."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El cálculo copaneco de 149 lunas = 4,400 días arroja un error relativo de apenas un día cada 500 años. En contraste, en la Europa del siglo VIII d.C., el calendario juliano acumulaba un error de un día entero cada 128 años debido a una estimación solar menos precisa, desfase que no fue corregido en Occidente sino hasta la reforma gregoriana de 1582."
      }
    ],
    "fact": "Durante el congreso de Copán, los astrónomos también calcularon la duración del año trópico en 365.2420 días mediante una fórmula de ajuste de 29 días acumulados por cada 120 años de Cuenta Larga. El valor moderno medido por relojes atómicos es de 365.2422 días, lo que significa que el cálculo maya difería en menos de veinte segundos al año respecto a la realidad física."
  },
  {
    "id": "altar-q",
    "bannerImage": "/assets/maya/infographic_m12/banner_altar-q.webp",
    "title": "El Misterioso Altar Q",
    "color": "#D84315",
    "btnImage": "/assets/maya/infographic_m12/btn_altar-q.jpg",
    "image": "/assets/maya/infographic_m12/hero_altar-q.jpg",
    "content": [
      "Emplazado al pie de la imponente escalinata del Templo 16 en la Acrópolis de Copán, el Altar Q constituye uno de los documentos históricos y propagandísticos más fascinantes de toda la epigrafía mesoamericana. Consagrado en el año 776 d.C. bajo el mandato del decimosexto soberano K'inich Yax Pasaj Chan Yopaat («Madrugada Resplandeciente»), este monumento cuadrangular monolítico resume trescientos cincuenta años de linaje ininterrumpido.",
      "Los cuatro costados del bloque de andesita volcánica están decorados con dieciséis figuras esculpidas en altorrelieve, cuatro en cada cara, que representan a los dieciséis monarcas legítimos de la dinastía copaneca. Cada rey aparece sentado con las piernas cruzadas sobre un cojín ceremonial formado por el glifo jeroglífico de su propio nombre dinástico, ataviado con tocados de plumas, orejeras de jadeita e insignias de poder militar.",
      "La escena culminante se localiza en la fachada oeste del altar, donde el fundador primordial K'inich Yax K'uk' Mo' (fallecido en 437 d.C.) entrega solemnemente el cetro de mando K'awiil al decimosexto gobernante Yax Pasaj Chan Yopaat. Al recibir el cetro directamente de las manos del patriarca fundador a través de los siglos, el joven rey legitimaba su derecho soberano a gobernar en una época de grave inestabilidad sociopolítica.",
      "Un detalle iconográfico revelador es que el fundador aparece retratado portando anteojeras circulares y adornos característicos de la deidad de la lluvia y la guerra de Teotihuacan (Tláloc), así como una defensa en el brazo izquierdo. La epigrafía contemporánea ha confirmado que el fundador ostentaba el título de Señor de Occidente, consolidando el prestigio cosmopolita y militar que la metrópoli teotihuacana ejercía sobre la élite maya.",
      "La superficie superior del altar contiene un extenso texto jeroglífico de 36 cartuchos que narra con fechas exactas la llegada de Yax K'uk' Mo' al valle en el año 426 d.C., tras un viaje de 152 días desde el santuario dinástico original. El Altar Q se convirtió así en la piedra angular que permitió a los arqueólogos modernos ordenar cronológicamente la sucesión completa de los reyes de Copán y descifrar su trayectoria política."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Al excavar debajo del Altar Q en la década de 1990, los arqueólogos hallaron una cripta subterránea que contenía los restos de quince jaguares sacrificados en honor a los quince antepasados fallecidos de Yax Pasaj. Este hallazgo confirmó que el monumento no era solo un registro genealógico, sino un altar de autosacrificio y ofrendas reales de sangre."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El bloque del Altar Q mide 1.45 metros por cada lado y 75 centímetros de altura, con una masa estimada de más de tres toneladas. Fue tallado a partir de un solo prisma de andesita volcánica densa, mineral de alta dureza cuya resistencia a la abrasión permitió que los rostros y nombres glíficos de los reyes sobrevivieran a doce siglos de intemperie y colonización biológica."
      }
    ],
    "fact": "La epigrafista Tatiana Proskouriakoff utilizó el Altar Q y las estelas fechadas de Copán para demostrar en 1960 que las inscripciones jeroglíficas mayas contenían crónicas históricas reales de gobernantes humanos, rebatiendo la creencia errónea previa de que los jeroglíficos eran únicamente meditaciones teológicas sobre deidades místicas y periodos temporales abstractos."
  },
  {
    "id": "escalinata-jeroglificos",
    "bannerImage": "/assets/maya/infographic_m12/banner_escalinata-jeroglificos.webp",
    "title": "La Escalinata de los Jeroglíficos",
    "color": "#0277BD",
    "btnImage": "/assets/maya/infographic_m12/btn_escalinata-jeroglificos.jpg",
    "image": "/assets/maya/infographic_m12/hero_escalinata-jeroglificos.jpg",
    "content": [
      "En el flanco occidental del Templo 26 de Copán se alza la Escalinata de los Jeroglíficos, considerada con justicia el texto epigráfico esculpido en piedra más extenso y monumental de toda la América precolombina. La estructura consta de sesenta y tres escalones monumentales de piedra andesítica que ascienden a lo largo de treinta metros sobre la pendiente de la pirámide, coronados por cinco estatuas de bulto redondo de reyes guerreros.",
      "A lo largo de estos escalones se encuentran grabados más de 2,200 glifos jeroglíficos individuales tallados con maestría caligráfica insuperable. El texto monumental narra la historia oficial, las genealogías, los triunfos bélicos y los rituales sagrados de los gobernantes de Copán, abarcando desde la fundación dinástica en 426 d.C. hasta la consagración final del monumento durante el reinado del decimoquinto rey K'ak' Yipyaj Chan K'awiil en 755 d.C.",
      "La edificación de esta escalinata colosal cumplió además un urgente propósito de propaganda dinástica y reivindicación militar. En el año 738 d.C., el decimotercer soberano de Copán, el brillante Uaxaclajuun Ub'aah K'awiil («18 Conejo»), había sido capturado y decapitado por el gobernante de la vecina ciudad vasalla de Quiriguá, K'ak' Tiliw Chan Yopaat. La escalinata fue concebida para restaurar el honor y la legitimidad herida de la dinastía.",
      "Cada peldaño de la escalera funciona como una línea continua de un papiro pétreo gigante. Al ascender físicamente por la escalinata durante las ceremonias públicas, los sacerdotes y nobles recreaban el ascenso temporal de la dinastía a través de las generaciones, culminando en la cúspide del templo donde se practicaban sacrificios propiciatorios ante las deidades celestes para garantizar la fertilidad y la victoria militar del reino.",
      "Cuando los arqueólogos del Museo Peabody de Harvard excavaron el monumento en la década de 1890, encontraron que la mayor parte de la escalinata se había desplomado por el derrumbe de la pirámide. Aunque los peldaños fueron reconstruidos en su lugar, varios tramos quedaron fuera de su secuencia original, convirtiendo a la escalinata en uno de los rompecabezas epigráficos y filológicos más desafiantes y apasionantes de la arqueología."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En la actualidad, la Escalinata de los Jeroglíficos está protegida por una colosal lona tensada permanente instalada por el Instituto Hondureño de Antropología e Historia (IHAH) y la UNESCO. Esta cubierta impermeable detiene el impacto directo de la lluvia torrencial y de los rayos ultravioleta, impidiendo la disolución del estuco y la proliferación de musgos."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Para reconstruir el orden original de los escalones caídos, los epigrafistas modernos emplean escaneo láser tridimensional y modelos digitales de concordancia morfológica. Al analizar la curvatura de fractura de los bloques de toba y la coherencia sintáctica de las cláusulas verbales mayas, se ha logrado reintegrar virtualmente más del 70% del texto dinástico original."
      }
    ],
    "fact": "La Escalinata de los Jeroglíficos abarca un total de 10 metros de ancho por 30 metros de longitud en pendiente de 45 grados. Contiene exactamente 63 peldaños monolíticos y más de 2,200 glifos individuales, lo que la sitúa como el documento histórico labrado en piedra más voluminoso de todo el hemisferio occidental, superando en extensión textual a las inscripciones del Antiguo Egipto o Mesopotamia."
  },
  {
    "id": "cancha-pelota",
    "bannerImage": "/assets/maya/infographic_m12/banner_cancha-pelota.webp",
    "title": "La Cancha de Pelota Cósmica",
    "color": "#558B2F",
    "btnImage": "/assets/maya/infographic_m12/btn_cancha-pelota.jpg",
    "image": "/assets/maya/infographic_m12/hero_cancha-pelota.jpg",
    "content": [
      "El juego de pelota mesoamericano no era un simple deporte de esparcimiento físico, sino un drama ritual de profunda trascendencia cosmológica donde se representaba la lucha eterna entre las fuerzas de la luz y las tinieblas. La Cancha de Pelota de Copán, conocida como la Estructura A-III situada en el corazón de la Gran Plaza, es universalmente considerada una de las más bellas, refinadas y mejor conservadas del periodo Clásico maya.",
      "Consagrada en su forma definitiva en el año 738 d.C. por el monarca Uaxaclajuun Ub'aah K'awiil («18 Conejo»), la cancha exhibe una planta clásica en forma de «I» latina o doble «T». Su callejón central de juego mide veintiocho metros de longitud por siete de anchura, flanqueado por dos rampas inclinadas de mampostería fina revestidas de estuco sobre las cuales rebotaba la pesada pelota de hule macizo durante las partidas rituales.",
      "En lugar de los anillos circulares de piedra perforada característicos de las canchas posclásicas de Yucatán como Chichén Itzá, la cancha de Copán cuenta con seis magníficos marcadores esculpidos con la forma de cabezas tridimensionales de guacamaya roja (Ara macao). Tres de estas cabezas se ubican en la cresta de la rampa oriental y tres en la rampa occidental, vigilando el movimiento de los jugadores y de la esfera en disputa.",
      "La guacamaya roja era el animal sagrado vinculado a K'inich Ahau, la deidad solar diurna, debido al plumaje escarlata y amarillo encendido que evoca los rayos del amanecer. La pelota de caucho, que los jugadores impulsaban exclusivamente con las caderas, codos y rodillas sin usar manos ni pies, representaba al disco solar transitando por el callejón de la cancha, el cual simbolizaba una grieta o portal directo hacia el inframundo de Xibalbá.",
      "Excavaciones profundas en el subsuelo de la cancha revelaron que la estructura actual fue construida cubriendo dos canchas más antiguas que datan de los siglos V y VI d.C. Al mantener inalterada la ubicación exacta del campo a lo largo de sucesivas renovaciones dinásticas, los reyes de Copán reafirmaban que su ciudad era el centro terrenal donde los héroes gemelos del Popol Vuh habían derrotado a los señores de la muerte."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "La pelota de hule mesoamericana era elaborada a partir del látex del árbol Castilla elastica mezclado con la savia de la enredadera Ipomoea alba para lograr una vulcanización química natural. Esta pelota pesaba entre dos y cuatro kilogramos y rebotaba con una fuerza descomunal que podía provocar fracturas mortales a los jugadores que no portaban protectores de cuero."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El caucho vulcanizado por los mayas hace tres mil años precedió en más de tres milenios a la vulcanización moderna patentada por Charles Goodyear en 1844. Al mezclar el látex crudo con el jugo ácido de la gloria de la mañana en proporciones precisas de 3 a 1, los artesanos mayas alteraban los enlaces moleculares del polímero de isopreno, volviéndolo extraordinariamente elástico."
      }
    ],
    "fact": "En el suelo del callejón central de la cancha de pelota de Copán se descubrieron tres marcadores circulares de piedra tallada en bajorrelieve. El marcador central representa al rey 18 Conejo ricamente ataviado como jugador de pelota enfrentándose ritualmente al señor del inframundo, simbolizando el combate cósmico por el renacimiento continuo del Sol y de la vegetación agrícola."
  },
  {
    "id": "observatorio-copan",
    "bannerImage": "/assets/maya/infographic_m12/banner_observatorio-copan.webp",
    "title": "El Observatorio de las Colinas",
    "color": "#004D40",
    "btnImage": "/assets/maya/infographic_m12/btn_observatorio-copan.jpg",
    "image": "/assets/maya/infographic_m12/hero_observatorio-copan.jpg",
    "content": [
      "El concepto de observatorio astronómico en Copán trasciende la idea convencional de un edificio individual con instrumentos de mira. En este valle centroamericano, los sabios mayas concibieron un sistema regional holístico donde las elevaciones topográficas, los templos piramidales y una red de estelas monolíticas distribuidas estratégicamente actuaban de manera integrada como una red de telemetría celeste a gran escala.",
      "Además de la célebre línea visual trazada entre las Estelas 12 y 10, los arqueoastrónomos han cartografiado múltiples alineaciones solares y estelares en el valle. La Estela 2, ubicada en la Gran Plaza, y la Estela 7, emplazada en el sector occidental, forman un eje conmemorativo que marcaba con precisión la puesta de sol durante los equinoccios de primavera y otoño, fechas fundamentales para calibrar el calendario civil de 365 días.",
      "En el Templo 22 de la Acrópolis, conocido como la Casa de la Meditación o Templo de la Serpiente Bícéfala, los arquitectos diseñaron una estrecha hendidura horizontal en el muro superior de la fachada norte. Durante fechas específicas de mayo y julio, los rayos de la estrella brillante Aldebarán y del cúmulo de las Pléyades penetraban por esta rendija, proyectando un haz de luz sobre el trono sagrado donde meditaba el gobernante.",
      "Esta red de miras ópticas permitía a los astrónomos de la corte predecir con absoluta fidelidad las variaciones estacionales de la bóveda celeste. Al contrastar las observaciones obtenidas desde las colinas altas con los registros mantenidos en los códices de papel de corteza, los sabios verificaban los sutiles desplazamientos angulares provocados por la precesión equinoccial y las perturbaciones orbitales de los planetas visibles.",
      "El legado del observatorio de las colinas confirma que para los antiguos mayas la astronomía no constituía una afición teórica aislada de la realidad social. Cada alineación pétrea fijada en la roca andesítica respondía a una necesidad comunitaria imperiosa: regular el ciclo del cultivo del maíz, organizar las jornadas ceremoniales de cohesión colectiva y garantizar la supervivencia biológica y espiritual de toda la civilización."
    ],
    "expandables": [
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "En el dintel interior del Templo 22 se esculpió una monumental serpiente bicéfala que representa la Vía Láctea, sostenida en los hombros de dos dioses Bacab o cargadores del cosmos. La boca abierta del templo simula la entrada a una caverna mística desde la cual el soberano observaba el firmamento nocturno transformado en un mediador cósmico supremo."
      },
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "El análisis arqueoastronómico con teodolito de precisión en el Templo 22 demostró que su ventana de rendija posee una apertura de apenas 13 centímetros de ancho por 60 de alto con un ángulo azimutal de 9° 30' norte. Esta estrechez geométrica operaba como un filtro óptico natural que eliminaba la luz difusa ambiental, permitiendo aislar la luz de estrellas débiles en el cenit."
      }
    ],
    "fact": "Las prospecciones arqueológicas han identificado más de veinticinco monumentos alineados astronómicamente a lo largo de los veinticuatro kilómetros de longitud del valle del río Copán. Este complejo sistema de estelas y altares convierte al valle en el mayor paisaje cultural arqueoastronómico planificado e integrado que se conserva en todo el continente americano prehispánico."
  }
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
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.1,
      // Mayan firefly/jungle colors
      hue: Math.random() > 0.5 ? '249,168,37' : '85,139,47', 
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y -= 0.1;
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
function MayaHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0.5rem' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(249,168,37,0.3))' }}>
        {/* Decorative arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#mayaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#D7CCC8','#F9A825','#6A1B9A','#D84315','#0277BD','#558B2F','#004D40'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central Maya Sun icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#F9A825" strokeWidth="2" opacity="0.8" />
        <circle cx="300" cy="30" r="6" fill="#F9A825" opacity="0.6" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line key={angle} x1="300" y1="16" x2="300" y2="10" stroke="#F9A825" strokeWidth="2" opacity="0.8" strokeLinecap="round" transform={`rotate(${angle} 300 30)`} />
        ))}
        
        <defs>
          <linearGradient id="mayaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(249,168,37,0.2)" />
            <stop offset="50%" stopColor="rgba(249,168,37,0.9)" />
            <stop offset="100%" stopColor="rgba(249,168,37,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#F9A825" fontSize="22" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="4">COPÃN</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(249,168,37,0.7)" fontSize="12" fontFamily="monospace" letterSpacing="3">LAS ESTELAS SOLARES</text>
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
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem', position: 'relative',
      }}
    >
      <div style={{
        width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(215,204,200,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease', position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
        {isActive && (
          <motion.div animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', border: `2px solid ${node.color}`, pointerEvents: 'none' }} />
        )}
      </div>
      <span style={{
        color: isActive ? node.color : 'rgba(255,255,255,0.75)',
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
        textAlign: 'center', lineHeight: 1.2, transition: 'color 0.3s',
        maxWidth: '100px', textShadow: isActive ? `0 0 8px ${node.color}40` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div layoutId="activeDotMayaM12"
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: node.color, boxShadow: `0 0 8px ${node.color}` }} />
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

const EXPAND_ICONS = { clock: Clock, zap: Zap, atom: Atom };

function ExpandableSection({ item, color }) {
  const [open, setOpen] = useState(false);
  const dir = useMemo(() => DIRECTIONS[Math.floor(Math.random() * 4)], []);
  const IconComp = EXPAND_ICONS[item.icon] || Sparkles;
  
  return (
    <div style={{
      marginTop: '0.8rem', borderRadius: '14px', border: `1px solid ${color}25`,
      overflow: 'hidden', background: `linear-gradient(135deg, ${color}08, transparent)`,
    }}>
      <motion.button onClick={() => setOpen(!open)} whileHover={{ backgroundColor: `${color}12` }}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.8rem 1rem',
          background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.9)' }}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}
          >
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)',
              borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(12, 16, 12, 0.95)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`,
        borderRadius: '24px', position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)',
        border: `1px solid ${node.color}40`, borderRadius: '50%', width: '40px', height: '40px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}15)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '10px', right: '50px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 50, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing:'-0.02em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}40`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
          ))}
        </div>
      </div>

      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}>
              <Deco size={55 + i * 10} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.2rem', borderLeft: `3px solid ${node.color}30`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? '─â€”â€ ' : '─â€”â€¡'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>{para}</p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {node.bannerImage && (
                <div style={{ margin: '1.5rem 0', borderRadius: '12px', overflow: 'hidden', position: 'relative', background: '#0a0c1e' }}>
                  <img src={node.bannerImage} alt={node.bannerCaption || ''}
                       style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(10,12,30,0.6) 100%)' }} />
                  {node.bannerCaption && (
                    <p style={{ position: 'absolute', bottom: '0.5rem', width: '100%', textAlign: 'center',
                                fontSize: '0.85rem', color: '#FFF', margin: 0, fontStyle: 'italic',
                                textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                      {node.bannerCaption}
                    </p>
                  )}
                </div>
              )}
              {node.fact && (
          <div style={{
            marginTop: '1.5rem', background: `linear-gradient(135deg, ${node.color}12, ${node.color}05)`,
            border: `1px solid ${node.color}25`, borderRadius: '16px', padding: '1.2rem 1.5rem',
            display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative', zIndex: 2,
          }}>
            <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>Dato Científico</span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>{node.fact}</p>
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '30px', border: '1px solid rgba(249,168,37,0.2)' }}>
      <Star size={14} style={{ color: '#F9A825', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #F9A825, #6A1B9A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(249,168,37,0.4)' }} />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#F9A825', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MayaM12() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(12,16,12,0.9) 0%, rgba(15,20,15,0.85) 40%, rgba(12,16,12,0.92) 100%), ',
      backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
      borderRadius: '24px', padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(249,168,37,0.15)', boxShadow: '0 0 60px rgba(12,16,12,0.8), inset 0 0 80px rgba(0,0,0,0.5)',
    }}>
      <TemporalField />
      <MayaHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ textAlign: 'center', color: 'rgba(249,168,37,0.8)', fontSize: '0.85rem', marginBottom: '1rem', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <ChevronRight size={14} /> Toca cada monumento para explorar <ChevronRight size={14} />
        </motion.p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem 1.2rem', position: 'relative', zIndex: 2, marginBottom: '1rem', padding: '0 0.5rem' }}>
        {INFOGRAPHIC_NODES.map((node, index) => (
          <NodeButton key={node.id} node={node} index={index} isActive={activeNode === node.id} onClick={() => handleNodeClick(node.id)} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeData && <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />}
      </AnimatePresence>

      <AnimatePresence>
        {explored.size === INFOGRAPHIC_NODES.length && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', marginTop: '1.5rem', padding: '1rem', background: 'rgba(249,168,37,0.08)', borderRadius: '16px', border: '1px solid rgba(249,168,37,0.25)', position: 'relative', zIndex: 2 }}>
            <p style={{ margin: 0, color: '#F9A825', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🔬  ¡Has explorado la grandeza astronómica de Copán!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
              Ya estás listo para continuar con el siguiente módulo.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Bibliografía ─── */}
      <div style={{ marginTop: '2rem', padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', borderRadius: '0 0 16px 16px', position: 'relative', zIndex: 2 }}>
        <h4 style={{ fontSize: '0.85rem', color: '#999', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          🔬 Fuentes y Referencias
        </h4>
        <ul style={{ fontSize: '0.75rem', color: '#888', lineHeight: 1.8, listStyle: 'none', padding: 0, margin: 0, columns: 2, columnGap: '2rem' }}>
          {BIBLIOGRAPHY.map((ref, i) => (
            <li key={i} style={{ breakInside: 'avoid', marginBottom: '0.4rem' }}>"Â¢ {ref}</li>
          ))}
        </ul>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
