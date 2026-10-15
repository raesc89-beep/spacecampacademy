'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Nacimiento de los Mundos Rocosos) ───────────────
function DecoProtoDisk({ size = 70, color = '#FF6B35', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="26" ry="10" fill="none" stroke={color} strokeWidth="2" opacity="0.8" transform="rotate(-15 30 30)" />
      <ellipse cx="30" cy="30" rx="18" ry="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(-15 30 30)" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoSilicate({ size = 70, color = '#F7C59F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <polygon points="30,8 48,20 42,46 18,46 12,20" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" opacity="0.8" />
      <line x1="30" y1="8" x2="30" y2="30" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="30" x2="48" y2="20" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <line x1="30" y1="30" x2="42" y2="46" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} />
    </svg>
  );
}

function DecoPlanetesimal({ size = 70, color = '#EFE9F4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M20 12 Q38 8 48 24 Q54 40 38 50 Q18 54 10 38 Q6 22 20 12 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="24" cy="24" r="4" fill={color} opacity="0.4" />
      <circle cx="38" cy="36" r="3" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoCore({ size = 70, color = '#FFD166', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
      <circle cx="30" cy="30" r="7" fill={color} opacity="0.9" />
    </svg>
  );
}

function DecoIceLine({ size = 70, color = '#4ECDC4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="2" strokeDasharray="6 3" opacity="0.8" />
      <path d="M20 18 L30 30 L20 42 M40 18 L30 30 L40 42" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

function DecoCrater({ size = 70, color = '#FF007F', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="20" ry="12" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <ellipse cx="30" cy="30" rx="12" ry="6" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <circle cx="30" cy="30" r="2" fill={color} />
    </svg>
  );
}

function DecoMagma({ size = 70, color = '#E71D36', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 40 Q20 20 30 40 T50 40" fill="none" stroke={color} strokeWidth="2" opacity="0.8" />
      <path d="M15 25 Q25 10 35 25 T45 25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

const DECO_MAP = {
  'disco-protoplanetario': [DecoProtoDisk, DecoSilicate, DecoPlanetesimal],
  'condensacion-silicatos': [DecoSilicate, DecoCore, DecoIceLine],
  'acrecion-planetesimales': [DecoPlanetesimal, DecoProtoDisk, DecoCrater],
  'diferenciacion-planetaria': [DecoCore, DecoMagma, DecoSilicate],
  'linea-de-nieve': [DecoIceLine, DecoProtoDisk, DecoPlanetesimal],
  'bombardeo-intenso': [DecoCrater, DecoPlanetesimal, DecoMagma],
  'magma-y-corteza': [DecoMagma, DecoCore, DecoSilicate],
};

const BIBLIOGRAPHY = [
  'Chambers, J. E. (2004). "Making terrestrial planets: the formation of Mercury, Venus, Earth, and Mars". Earth and Planetary Science Letters, 223(3-4), 241-252.',
  'Morbidelli, A., et al. (2012). "Building terrestrial planets". Annual Review of Earth and Planetary Sciences, 40, 251-275.',
  'Johansen, A., et al. (2014). "Growth of asteroids, planetary cores, and planetesimals". Protostars and Planets VI, 547-570.',
  'Elkins-Tanton, L. T. (2012). "Magma oceans in the inner Solar System". Annual Review of Earth and Planetary Sciences, 40, 113-139.'
];

const INFOGRAPHIC_NODES = [
  {
    "id": "disco-protoplanetario",
    "bannerImage": "/assets/rocosos/infographic_m1/banner_disco-protoplanetario.webp",
    "title": "El Disco Protoplanetario",
    "color": "#FF6B35",
    "btnImage": "/assets/rocosos/infographic_m1/btn_disco-protoplanetario.jpg",
    "image": "/assets/rocosos/infographic_m1/hero_disco-protoplanetario.jpg",
    "content": [
      "Hace aproximadamente cuatro mil quinientos sesenta y siete millones de años, nuestro Sistema Solar se originó a partir del colapso gravitatorio de una densa nube molecular interestelar compuesta principalmente por hidrógeno, helio y diminutas motas de polvo presolar. La perturbación inicial, probablemente desatada por las ondas de choque supersónicas de una supernova cercana, provocó que el núcleo de la nube comenzara a contraerse bajo su propia masa gravitacional, iniciando el nacimiento de nuestra estrella.",
      "Debido a la ley física de conservación del momento angular, a medida que la nube colapsaba y reducía su radio, su velocidad de rotación se aceleró exponencialmente, adoptando la morfología de un disco circunestelar aplanado y giratorio perpendicular a su eje de rotación. En el centro geométrico de máxima densidad se acumuló más del noventa y nueve punto ocho por ciento de la masa de la nebulosa, encendiendo el colosal horno de fusión nuclear de nuestra protoestrella solar.",
      "La materia remanente que orbitaba alrededor del joven Sol primitivo constituyó lo que la astrofísica moderna define como la nebulosa solar o disco protoplanetario. En este entorno, el gas y las partículas sólidas experimentaron un gradiente térmico extremo: en la zona interna cercana al centro estelar las temperaturas superaban con creces los dos mil kelvin, mientras que en los bordes periféricos distantes caían por debajo de los cincuenta kelvin en el vacío helado.",
      "La presión de radiación solar y los potentes vientos estelares emitidos por el Sol en su fase T Tauri temprana barrieron de forma continua los gases volátiles más ligeros como el hidrógeno atómico y el helio hacia las regiones exteriores del sistema. Como resultado termodinámico directo, el disco interior quedó fuertemente enriquecido en fracciones de elementos refractarios pesados de elevado punto de ebullición, tales como silicatos de magnesio, hierro, níquel y óxidos metálicos.",
      "Las observaciones astronómicas contemporáneas realizadas por observatorios interferométricos de vanguardia como el complejo ALMA en el desierto chileno de Atacama han confirmado que estos discos protoplanetarios son comunes en estrellas jóvenes. Las imágenes revelan surcos oscuros concéntricos donde protoplanetas en crecimiento barren activamente el gas y el polvo circumestelar a lo largo de sus órbitas, reproduciendo con asombrosa fidelidad las fases iniciales de nuestro propio hogar cósmico."
    ],
    "fact": "La nebulosa solar primordial colapsó hace 4,567 millones de años conservando rigurosamente el momento angular, lo que achatró la materia en un disco protoplanetario giratorio donde el 99.8% de la masa total encendió el Sol y apenas el 0.2% restante condensó a todos los planetas, asteroides y lunas del Sistema Solar.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La masa mínima de la nebulosa solar requerida para condensar todos los cuerpos sólidos y gaseosos del Sistema Solar actual se estima entre cero punto cero una y cero punto cero cinco masas solares, suficiente materia prima para construir decenas de mundos si no se hubiera disipado gran parte del gas por fotoevaporación ultravioleta."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El radiotelescopio ALMA ha capturado discos protoplanetarios en alta resolución como el de la joven estrella HL Tauri, ubicada a cuatrocientos cincuenta años luz en la constelación de Tauro, mostrando una serie de anillos y brechas vacías que evidencian la formación in situ de embriones planetarios en tiempo real."
      }
    ]
  },
  {
    "id": "condensacion-silicatos",
    "bannerImage": "/assets/rocosos/infographic_m1/banner_condensacion-silicatos.webp",
    "title": "Condensación de Silicatos",
    "color": "#F7C59F",
    "btnImage": "/assets/rocosos/infographic_m1/btn_condensacion-silicatos.jpg",
    "image": "/assets/rocosos/infographic_m1/hero_condensacion-silicatos.jpg",
    "content": [
      "A medida que la masa gaseosa supercaliente del disco protoplanetario se expandía y radiaba gradualmente su energía térmica hacia el espacio interestelar, la temperatura descendió por debajo del punto de sublimación de los elementos químicos más refractarios. Este enfriamiento progresivo gobernó la condensación química termodinámica descrita matemáticamente por la célebre secuencia de condensación de Lawrence Grossman y John Wood en la década de 1970.",
      "A temperaturas superiores a los mil seiscientos kelvin, los primeros minerales sólidos en precipitar directamente desde el vapor gaseoso primigenio fueron los óxidos de calcio, titanio y aluminio, dando origen a la corindón, la perovskita y la melilita. Estas fases ultrarrefractarias se agruparon en nódulos milimétricos blanquecinos que los petrólogos denominan Inclusiones Ricas en Calcio y Aluminio (CAIs), los objetos sólidos más antiguos jamás datados en el Sistema Solar.",
      "Posteriormente, cuando la temperatura del gas ambiente cayó en el rango de los mil cuatrocientos a mil doscientos kelvin, se condensaron las aleaciones metálicas de hierro y níquel junto con los silicatos de magnesio fundamentales. La forsterita (el extremo rico en magnesio del olivino) y la enstatita (el piroxeno rico en magnesio) cristalizaron de forma masiva, constituyendo la base mineralógica fundamental que edificaría los mantos de los planetas terrestres.",
      "Debido a la ausencia inicial de campos gravitatorios significativos a escala microscópica, estos diminutos cristales minerales flotaban en el flujo turbulento de gas chocando a velocidades de unos pocos centímetros por segundo. Las fuerzas electrostáticas superficiales y las interacciones moleculares de Van der Waals permitieron que los cristales se aglutinaran en cúmulos porosos y esponjosos de textura algodonosa, superando la primera fase del ensamblaje rocoso.",
      "La datación radiométrica de alta precisión de los isótopos de plomo-plomo (207Pb-206Pb) en las inclusiones CAIs de meteoritos carbonáceos como Allende fija la edad de este proceso de condensación mineral en exactamente cuatro mil quinientos sesenta y siete punto tres millones de años, estableciendo el cronómetro absoluto cero a partir del cual se mide toda la historia geológica planetaria."
    ],
    "fact": "Las inclusiones ricas en calcio y aluminio (CAIs) y los silicatos de magnesio como el olivino y la enstatita fueron los primeros compuestos sólidos en condensar a más de mil cuatrocientos kelvin a partir del gas de la nebulosa solar, marcando el punto cronológico cero absoluto de la historia geológica del Sistema Solar.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La datación isotópica de circón y CAIs mediante espectrometría de masas demuestra que la condensación de los silicatos refractarios primordiales ocurrió en un intervalo temporal asombrosamente breve de apenas cien a trescientos mil años, un parpadeo geológico comparado con los millones de años requeridos para formar los planetas."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El meteorito Allende, que cayó como una espectacular bola de fuego sobre el estado de Chihuahua en México en febrero de 1969, contenía toneladas de inclusiones CAIs vírgenes que proporcionaron a los cosmoquímicos de todo el mundo la primera muestra física real del material inicial con que se construyeron los planetas rocosos."
      }
    ]
  },
  {
    "id": "acrecion-planetesimales",
    "bannerImage": "/assets/rocosos/infographic_m1/banner_acrecion-planetesimales.webp",
    "title": "Acreción de Planetesimales",
    "color": "#EFE9F4",
    "btnImage": "/assets/rocosos/infographic_m1/btn_acrecion-planetesimales.jpg",
    "image": "/assets/rocosos/infographic_m1/hero_acrecion-planetesimales.jpg",
    "content": [
      "El paso físico desde partículas microscópicas de polvo aglomeradas por fuerzas electrostáticas hasta bloques macroscópicos de tamaño kilométrico representó uno de los enigmas más desafiantes de la astrofísica planetaria. Cuando los agregados minerales alcanzaban tamaños de entre un centímetro y un metro, las colisiones mutuas a velocidades superiores a un metro por segundo dejaban de provocar adhesión y causaban la fragmentación destructiva o el rebote elástico de los granos.",
      "Asimismo, los objetos de un metro de diámetro experimentaban una intensa fuerza de arrastre aerodinámico con el gas del disco en rotación subkepleriana, perdiendo momento angular de forma catastrófica y precipitándose en espiral hacia el Sol en menos de cien años (la conocida 'barrera del metro'). Para eludir esta barrera destructiva, la naturaleza recurrió a procesos hidrodinámicos colectivos conocidos en la actualidad como inestabilidad de flujo (streaming instability).",
      "La inestabilidad de flujo provoca que miríadas de guijarros milimétricos se concentren de forma espontánea en filamentos y vórtices turbulentos de altísima densidad dentro del plano medio del disco protoplanetario. Cuando la densidad local de partículas sólidas en estos cúmulos superó la densidad crítica de Roche, las concentraciones de guijarros colapsaron repentinamente bajo su propia auto-gravedad mutua, originando directamente planetesimales sólidos de entre diez y cien kilómetros de diámetro.",
      "Una vez formados estos planetesimales masivos, la dinámica de colisión pasó a ser gobernada por la atracción gravitatoria newtoniana. En esta etapa comenzó la fase de crecimiento acelerado desbocado (runaway growth): el planetesimal más grande de una zona orbital incrementaba su sección eficaz de captura gravitatoria de forma desproporcionada, devorando a sus vecinos a un ritmo astronómico muy superior al de los cuerpos menores circundantes.",
      "En el transcurso de solo unos pocos cientos de miles de años, el crecimiento desbocado dio paso al crecimiento oligárquico, en el cual unas pocas docenas de grandes embriones planetarios o protoplanetas (con masas comparables a la de la Luna o Marte) barrieron por completo sus zonas de alimentación orbital, quedando aislados en órbitas casi circulares a la espera de las colisiones gigantescas finales."
    ],
    "fact": "La formación de planetesimales superó la barrera destructiva del metro gracias a la inestabilidad de flujo, un mecanismo hidrodinámico por el cual densos cúmulos de guijarros colapsaron por gravedad propia, originando directamente cuerpos de decenas de kilómetros que luego crecieron por acreción gravitatoria.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La teoría de acreción por arrastre de guijarros (pebble accretion) formulada por Anders Johansen demuestra que los embriones protoplanetarios capturan guijarros con una eficiencia aerodinámica cientos de veces mayor que la colisión directa entre grandes rocas, permitiendo que embriones de tamaño lunar crecieran en apenas un millón de años."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El objeto transneptuniano Arrokoth, fotografiado de cerca en 2019 por la sonda New Horizons de la NASA en el Cinturón de Kuiper, es un cuerpo binario de contacto con dos lóbulos aplanados unidos suavemente a baja velocidad, confirmando de forma visual directa que los planetesimales se formaron por colapso gravitatorio suave de nubes locales."
      }
    ]
  },
  {
    "id": "diferenciacion-planetaria",
    "bannerImage": "/assets/rocosos/infographic_m1/banner_diferenciacion-planetaria.webp",
    "title": "Diferenciación Química",
    "color": "#FFD166",
    "btnImage": "/assets/rocosos/infographic_m1/btn_diferenciacion-planetaria.jpg",
    "image": "/assets/rocosos/infographic_m1/hero_diferenciacion-planetaria.jpg",
    "content": [
      "A medida que los embriones protoplanetarios superaban los quinientos kilómetros de diámetro, sus interiores experimentaron un drástico incremento de temperatura inducido por tres fuentes termodinámicas masivas: la conversión de energía cinética en calor durante las violentas colisiones de acreción, la compresión adiabática gravitacional interna de los materiales rocosos y, primordialmente, el decaimiento radiactivo de radioisótopos de vida corta.",
      "Entre estos radionucleidos extintos, el aluminio-26 (con una vida media de apenas setecientos diecisiete mil años) y el hierro-60 liberaron colosales cantidades de energía térmica en los primeros dos millones de años del Sistema Solar. Esta potencia térmica superó el punto de fusión de los metales y silicatos, derritiendo total o parcialmente los cuerpos protoplanetarios y transformándolos en esferas de magma fluido sujetas a separación gravitacional por densidades.",
      "En este estado fundido se desencadenó el evento geofísico conocido como la catástrofe del hierro: las gotas densas de hierro y níquel metálicos líquidos, al ser significativamente más pesadas que la matriz silicatada circundante, migraron hacia el centro de gravedad del protoplaneta a través de percolación intergranular y diapirismo diapírico masivo, segregando un núcleo metálico central compacto de altísima densidad.",
      "Al hundirse, el hierro arrastró consigo a los elementos químicos altamente siderófilos (afines al hierro según la clasificación geoquímica de Goldschmidt), entre ellos el platino, el oro, el iridio, el osmio, el paladio y el níquel, despojando a las capas exteriores de estos metales preciosos. Simultáneamente, los silicatos ligeros de magnesio, calcio, sodio y aluminio ascendieron flotando hacia la superficie para formar un manto peridotítico y una protocorteza.",
      "La diferenciación geoquímica es el prerrequisito geodinámico indispensable que definió la anatomía de los cuatro planetas terrestres: dotó a Mercurio, Venus, la Tierra y Marte de núcleos metálicos conductores capaces de generar dínamo magnética, mantos convectivos capaces de sostener vulcanismo y tectonismo, y cortezas exteriores ricas en elementos litófilos sobre las cuales pudieron asentarse atmósferas e hidrosferas estables."
    ],
    "fact": "La diferenciación planetaria segregó a los protoplanetas fundidos en capas concéntricas de densidad: el decaimiento radiactivo del aluminio-26 fundió la roca, provocando que el hierro y níquel densos migraran al núcleo profundo mientras los silicatos ligeros flotaron formando el manto y la corteza superficial exterior.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La energía potencial gravitatoria liberada exclusivamente por la caída del hierro hacia el núcleo de la Tierra liberó aproximadamente 1.6 x 10^31 julios de calor, suficiente energía para elevar la temperatura de todo el planeta en más de mil grados Celsius y mantener el manto superior completamente fundido durante decenas de millones de años."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Todo el oro y platino que se extrae actualmente en las minas terrestres llegó mucho después de la diferenciación a través del 'barniz tardío' (late veneer): una lluvia de asteroides que impactó la Tierra una vez que la corteza ya se había solidificado, impidiendo que estos metales se hundieran para siempre en el inaccesible núcleo."
      }
    ]
  },
  {
    "id": "linea-de-nieve",
    "bannerImage": "/assets/rocosos/infographic_m1/banner_linea-de-nieve.webp",
    "title": "La Línea de Nieve",
    "color": "#4ECDC4",
    "btnImage": "/assets/rocosos/infographic_m1/btn_linea-de-nieve.jpg",
    "image": "/assets/rocosos/infographic_m1/hero_linea-de-nieve.jpg",
    "content": [
      "En la arquitectura física del disco protoplanetario existía un límite termodinámico fundamental conocido en astrofísica como la línea de congelación o línea de nieve del agua. Esta demarcación radial invisible señalaba la distancia heliocéntrica a partir de la cual la temperatura del gas caía por debajo de aproximadamente ciento cincuenta a ciento setenta kelvin a las presiones de la nebulosa, permitiendo que las moléculas de agua pasaran directamente de vapor a cristales de hielo sólido.",
      "En las fases formativas iniciales del Sistema Solar, esta frontera de condensación de volátiles se localizaba a una distancia aproximada de entre dos punto siete y tres punto dos unidades astronómicas del Sol, situándose en la región que actualmente ocupa la porción exterior del Cinturón Principal de Asteroides. Su posición no fue estática, sino que migró dinámicamente hacia el interior a medida que el disco se enfriaba y reducía su tasa de acreción estelar.",
      "Por dentro de la línea de nieve, la intensa radiación solar impedía la condensación de compuestos volátiles como agua, metano, monóxido de carbono y amoníaco en fases sólidas. En consecuencia, los embriones planetarios en la zona interior solo contaron con silicatos minerales y granos metálicos para ensamblarse, los cuales representaban conjuntamente menos del cero punto seis por ciento de la masa total de la nebulosa circundante.",
      "Por fuera de la línea de nieve, la condensación masiva del hielo de agua multiplicó por cuatro o cinco la densidad superficial de materia sólida disponible por unidad de superficie en el disco. Esta colosal abundancia de hielos permitió que los núcleos planetarios exteriores crecieran a velocidades astronómicamente vertiginosas, alcanzando la masa crítica de diez masas terrestres requerida para desencadenar el colapso gravitatorio de gas circundante y engendrar a Júpiter.",
      "La línea de nieve funcionó así como la gran frontera demográfica del Sistema Solar, imponiendo la dicotomía planetaria definitiva: al interior, cuatro mundos rocosos de pequeño diámetro y alta densidad media que nacieron secos y desprovistos de cubiertas volátiles masivas; al exterior, gigantes gaseosos y mundos helados provistos de colosales envolturas de hidrógeno y mantos de criohielo."
    ],
    "fact": "La línea de nieve del agua, situada aproximadamente a tres unidades astronómicas en la nebulosa primitiva, separó los mundos rocosos interiores desprovistos de hielo de los gigantes exteriores enriquecidos por una masa de volátiles cinco veces más abundante, definiendo la arquitectura orbital dual del Sistema Solar.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Además de la línea de nieve del agua (a ~170 K), existen líneas de condensación secuenciales para otros gases volátiles: la línea de congelación del dióxido de carbono (~70 K), la del metano (~30 K) y la del monóxido de carbono y nitrógeno (~20 K), cada una situada a distancias sucesivamente mayores del Sol en el Cinturón de Kuiper."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "El asteroide enano Ceres se encuentra justo en el borde histórico de la línea de nieve; por esta razón, a diferencia del rocoso asteroide Vesta, Ceres alberga un manto exterior compuesto hasta en un veinticinco por ciento de hielo de agua, sales hidratadas y actividad criovolcánica confirmada por la sonda espacial Dawn."
      }
    ]
  },
  {
    "id": "bombardeo-intenso",
    "bannerImage": "/assets/rocosos/infographic_m1/banner_bombardeo-intenso.webp",
    "title": "Gran Bombardeo Intenso",
    "color": "#FF007F",
    "btnImage": "/assets/rocosos/infographic_m1/btn_bombardeo-intenso.jpg",
    "image": "/assets/rocosos/infographic_m1/hero_bombardeo-intenso.jpg",
    "content": [
      "Entre cuatro mil cien y tres mil ochocientos millones de años atrás, varios cientos de millones de años después de completada la fase principal de ensamblaje de los planetas rocosos, el Sistema Solar interior experimentó una cataclísmica reactivación de colisiones a hipervelocidad conocida en la geología planetaria como el Gran Bombardeo Intenso Tardío (Late Heavy Bombardment o LHB).",
      "La explicación dinámica más respaldada por la comunidad astronómica internacional es el célebre Modelo de Niza, desarrollado en el Observatorio de la Costa Azul en 2005. Este modelo astrodinámico postula que la interacción gravitatoria entre los planetas gigantes gaseosos y un denso disco primordial de planetesimales transneptunianos provocó una lenta migración orbital de Júpiter hacia adentro y de Saturno, Urano y Neptuno hacia afuera.",
      "Cuando Júpiter y Saturno cruzaron su resonancia orbital mutua de uno a dos (por cada órbita completa de Saturno, Júpiter realizaba exactamente dos), sus perturbaciones gravitacionales combinadas desestabilizaron de forma catastrófica todo el Sistema Solar. Las órbitas de Urano y Neptuno se volvieron caóticas, invadiendo el cinturón exterior y dispersando miles de millones de asteroides y cometas hacia el espacio planetario interior como una letal metralla cósmica.",
      "Durante esta fase destructiva, la Luna, la Tierra, Mercurio, Venus y Marte fueron acribillados de forma despiadada por proyectiles rocosos de hasta cien kilómetros de diámetro a velocidades superiores a los veinte kilómetros por segundo. Cada impacto excavó gigantescas cuencas multianulares de más de mil kilómetros de diámetro (como Imbrium y Serenitatis en la Luna, o Caloris en Mercurio), fracturando la litosfera de los planetas hasta el manto superior.",
      "En la Tierra primitiva, este continuo castigo térmico evaporó los océanos primordiales en múltiples ocasiones y reinició repetidamente la protocorteza. Sin embargo, este flujo de impactos transportó también una bendición geoquímica fundamental: los asteroides carbonáceos y cometas desestabilizados depositaron inmensas cantidades de agua, compuestos nitrogenados, aminoácidos y volátiles que reabastecieron la hidrosfera y enriquecieron el caldo primordial previo al surgimiento de la vida."
    ],
    "fact": "El Gran Bombardeo Intenso Tardío (hace 3,900 millones de años) fue desencadenado por la migración orbital y resonancia gravitatoria de Júpiter y Saturno según el Modelo de Niza, sembrando en la Tierra y planetas rocosos miles de millones de toneladas de agua, carbono y moléculas orgánicas esenciales.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "La datación radiométrica de las muestras lunares traídas por los astronautas de las misiones Apolo mediante el método argón-argón (40Ar-39Ar) reveló una concentración anómala de edades de enfriamiento por impacto situadas casi todas entre 3.8 y 3.9 mil millones de años, proporcionando la evidencia empírica directa del LHB."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Si una cuenca de impacto como Imbrium (de mil ciento cuarenta y cinco kilómetros de diámetro) se hubiera formado en la Tierra moderna, la energía liberada habría pulverizado un continente entero, arrojando billones de toneladas de roca fundida en órbita y oscureciendo el cielo global durante décadas enteras."
      }
    ]
  },
  {
    "id": "magma-y-corteza",
    "bannerImage": "/assets/rocosos/infographic_m1/banner_magma-y-corteza.webp",
    "title": "Océanos de Magma",
    "color": "#E71D36",
    "btnImage": "/assets/rocosos/infographic_m1/btn_magma-y-corteza.jpg",
    "image": "/assets/rocosos/infographic_m1/hero_magma-y-corteza.jpg",
    "content": [
      "Durante los estadios postreros de la acreción planetaria, la energía liberada por los gigantescos choques entre protoplanetas —culminando en el caso de la Tierra con el impacto cataclísmico rasante del protoplaneta Tea hace cuatro mil quinientos diez millones de años— suministró suficiente calor cinético como para fundir la totalidad de la envoltura silicatada exterior, originando océanos de magma globales de más de mil kilómetros de profundidad.",
      "Bajo estas condiciones extremas, la superficie planetaria no poseía solidez mecánica alguna, sino que consistía en un turbulento mar de roca fundida en régimen de convección vigorosa a temperaturas superiores a los dos mil doscientos kelvin. Sobre este océano ardiente pesaba una atmósfera densa y asfixiante de vapor de agua supercrítico, monóxido de carbono, metano y sílice gaseosa a presiones de varios cientos de atmósferas terrestres.",
      "A medida que la tasa de impactos gigantes decayó y el calor primordial comenzó a radiarse al espacio exterior a través de la atmósfera opaca, el océano de magma experimentó una cristalización fraccionada sujeta a las leyes de equilibrio de fases de la termodinámica de silicatos. En las profundidades basales del manto, la alta presión forzó la solidificación inicial de la bridgmanita y el olivino rico en magnesio, los cuales se hundieron al fondo mantélico.",
      "En cuerpos planetarios de menor gravedad superficial como la Luna primitiva, la cristalización fraccionada dio lugar a un fenómeno geológico único: los cristales de plagioclasa anortosítica, al ser químicamente menos densos que el líquido magmático residual enriquecido en hierro, flotaron hacia la superficie del océano de magma como cubos de hielo en un vaso de agua, amalgamándose para edificar la corteza primaria anortosítica de las tierras altas lunares.",
      "En la Tierra, el enfriamiento y la desgasificación masiva de volátiles desde el océano de magma concluyeron en un plazo de diez a cien millones de años. La condensación catastrófica del vapor de agua atmosférico desató lluvias torrenciales incesantes que duraron miles de años, enfriando la corteza basáltica primordial y llenando las depresiones tectónicas para dar nacimiento a los primeros océanos de agua líquida sobre nuestro planeta."
    ],
    "fact": "Los océanos de magma globales cubrieron la Tierra y la Luna tras los impactos gigantes de acreción; su cristalización fraccionada permitió que los minerales densos como el olivino formaran el manto mientras los silicatos ligeros ascendieron formando la corteza primitiva y liberando vapor de agua para los océanos.",
    "expandables": [
      {
        "label": "Dato Científico",
        "icon": "atom",
        "text": "Los circones detríticos de Jack Hills en Australia Occidental, datados en hasta cuatro mil cuatrocientos cuatro millones de años, poseen firmas isotópicas de oxígeno-18 que demuestran que la corteza continental y el agua líquida ya existían sobre la Tierra apenas ciento sesenta millones de años después de la solidificación del océano de magma."
      },
      {
        "label": "¿Sabías que...?",
        "icon": "sparkles",
        "text": "Las brillantes zonas blanquecinas que se aprecian a simple vista en la Luna llena son precisamente los restos intactos de aquella corteza anortosítica flotante original de hace 4,400 millones de años, conservada prácticamente inalterada gracias a la ausencia de erosión atmosférica y placas tectónicas en el satélite."
      }
    ]
  }
];

export default function InteractiveInfographic_RocososM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(15,10,25,0.92) 0%, rgba(25,12,20,0.88) 40%, rgba(10,10,20,0.95) 100%)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      minHeight: '800px',
      overflow: 'hidden',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <RockyDustField color1="255, 107, 53" color2="255, 209, 102" />
      <RocososHeader title="NACIMIENTO DE LOS MUNDOS ROCOSOS" subtitle="ORIGEN DEL SISTEMA SOLAR INTERIOR" primaryColor="#FF6B35" />

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '2rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #FF6B35, #FFD166)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{explored.size}/{INFOGRAPHIC_NODES.length}</span>
        </div>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1.2rem', marginTop: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.06)',
      }}>
        {INFOGRAPHIC_NODES.map((node, i) => (
          <NodeButton
            key={node.id}
            node={node}
            index={i}
            isActive={activeNode === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 3, flex: 1 }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '300px',
                color: 'rgba(255,255,255,0.4)', textAlign: 'center', gap: '1rem',
              }}
            >
              <Sparkles size={32} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
                Selecciona uno de los 7 módulos superiores para explorar la información interactiva.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center' }}>
          Referencias Científicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, background: 'rgba(0,0,0,0.25)', padding: '0.8rem', borderRadius: '8px', borderLeft: '2px solid #FF6B3560' }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Vista ampliada" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}

function RockyDustField({ color1 = '255, 107, 53', color2 = '255, 209, 102' }) {
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
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: (Math.random() - 0.5) * 0.25,
      hue: Math.random() > 0.5 ? color1 : color2,
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.3;
        p.x += p.driftX;
        p.y += p.driftY;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, opacity)})`;
        ctx.fill();
      });
      frame = requestAnimationFrame(draw);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [color1, color2]);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function RocososHeader({ title, subtitle, primaryColor }) {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: `drop-shadow(0 0 12px ${primaryColor}40)` }}>
        <path d="M 50 110 Q 300 20, 550 110" fill="none" stroke="url(#hdrGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 90;
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={primaryColor}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${primaryColor})` }}
            />
          );
        })}
        <circle cx="300" cy="20" r="14" fill="none" stroke={primaryColor} strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="20" r="3" fill={primaryColor} opacity="0.8" />
        <path d="M290 20 Q300 -5 310 20" fill="none" stroke={primaryColor} strokeWidth="1" opacity="0.5" />
        <defs>
          <linearGradient id="hdrGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
            <stop offset="50%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <text x="300" y="75" textAnchor="middle" fill={primaryColor} fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">{title}</text>
        <text x="300" y="95" textAnchor="middle" fill={primaryColor} opacity="0.7" fontSize="11" fontFamily="monospace" letterSpacing="2">{subtitle}</text>
      </svg>
    </div>
  );
}

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
        border: `3px solid ${isActive ? node.color : 'rgba(255,255,255,0.15)'}`,
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
          layoutId={`activeDot_${node.id}`}
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
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.9)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '30px', height: '30px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
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
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)', borderLeft: `3px solid ${color}30`, paddingLeft: '0.8rem' }}>
              {item.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContentPanel({ node, onClose, setLightboxSrc }) {
  const decoComponents = DECO_MAP[node.id] || [];
  const decoPositions = [
    { top: '8%', right: '-10px', rotate: 15 },
    { top: '45%', left: '-15px', rotate: -10 },
    { bottom: '12%', right: '5px', rotate: 20 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      style={{
        background: 'rgba(15, 12, 28, 0.94)', backdropFilter: 'blur(24px)', border: `1px solid ${node.color}30`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: `1px solid ${node.color}40`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}15, rgba(0,0,0,0.4))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={node.image} alt={node.title} onClick={() => setLightboxSrc(node.image)} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }} />
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.8rem', fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -8, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 5, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
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
                  {i === 0 ? 'Fase A' : i === 1 ? 'Fase B' : 'Fase C'}
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.85)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
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
          <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: `linear-gradient(90deg, ${node.color}15, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}30`, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${node.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={18} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
