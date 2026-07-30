'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// â”€â”€â”€ SVG Decorative Elements (Interstellar themed) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DecoBlackHole({ size = 70, color = '#F4A261', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      <circle cx="30" cy="30" r="4" fill={color} opacity="1" />
      <path d="M 5 30 Q 30 15 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 5 30 Q 30 45 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoSpacetimeGrid({ size = 70, color = '#4FC3F7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M10 10 Q30 30 50 10" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M10 25 Q30 40 50 25" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M10 40 Q30 50 50 40" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M10 10 Q30 30 10 50" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
      <path d="M25 10 Q40 30 25 50" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M40 10 Q50 30 40 50" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.8" />
    </svg>
  );
}

function DecoWaveRipple({ size = 80, color = '#7C4DFF', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      <path d="M0 20 Q 10 5, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M0 20 Q 10 10, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M0 20 Q 10 15, 20 20 T 40 20 T 60 20 T 80 20" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}

function DecoOrbit({ size = 70, color = '#00BCD4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <ellipse cx="30" cy="30" rx="25" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(30 30 30)" />
      <ellipse cx="30" cy="30" rx="25" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" transform="rotate(-30 30 30)" />
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.8" />
      <circle cx="50" cy="18" r="2" fill={color} opacity="1" />
      <circle cx="10" cy="42" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoEqualSign({ size = 70, color = '#FF6B35', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      <text x="5" y="32" fill={color} fontSize="22" fontWeight="bold" fontFamily="serif" opacity="0.6">GÎ¼Î½=8Ï€TÎ¼Î½</text>
      <circle cx="62" cy="10" r="1.5" fill={color} opacity="0.5" />
      <circle cx="55" cy="18" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

const DECO_MAP = {
  'relojes-velocidad': [DecoOrbit, DecoSpacetimeGrid, DecoEqualSign],
  'gemelos-einstein': [DecoWaveRipple, DecoSpacetimeGrid, DecoOrbit],
  'dilatacion-gravitacional': [DecoBlackHole, DecoSpacetimeGrid, DecoEqualSign],
  'gps-real': [DecoOrbit, DecoWaveRipple, DecoSpacetimeGrid],
  'planeta-miller': [DecoBlackHole, DecoWaveRipple, DecoOrbit],
  'paradoja-gemelos': [DecoSpacetimeGrid, DecoEqualSign, DecoWaveRipple],
  'futuro-crononauta': [DecoOrbit, DecoBlackHole, DecoSpacetimeGrid],
};

const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Einstein, A. (1905). "Zur Elektrodynamik bewegter Körper", Annalen der Physik, 17',
  'Hafele, J.C., Keating, R.E. (1972). "Around-the-World Atomic Clocks", Science, 177(4044)',
  'Pound, R.V., Rebka, G.A. (1959). "Gravitational Red-Shift in Nuclear Resonance", Physical Review Letters, 3(9)',
  'Ashby, N. (2003). "Relativity in the Global Positioning System", Living Reviews in Relativity, 6(1)',
  'Kelly, S. (2017). Endurance: A Year in Space, A Lifetime of Discovery, Knopf',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'relojes-velocidad',
    title: 'Relojes que se Atrasan',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m3/btn_relojes.jpg',
    image: '/assets/interstellar/infographic_m3/hero_relojes.jpg',
    content: [
      'Albert Einstein demostró con su Teoría de la Relatividad Especial que el tiempo no fluye de manera idéntica para todos los observadores del universo. La velocidad a la que viaja un objeto influye en cómo transcurre el tiempo para dicho objeto. Puedes imaginar que el espacio y el tiempo forman una estructura continua; a medida que te desplazas más rápido por el espacio, avanzas con mayor lentitud a través del tiempo. Esta relación matemática implica que, al viajar a velocidades cercanas a la de la luz, cada segundo que experimentas tiene una mayor duración temporal en comparación con el reloj de un observador estacionario. Este descubrimiento transformó nuestra comprensión astrofísica del cosmos.',
      'La relación entre velocidad y tiempo se describe mediante el Factor de Lorentz. Esta ecuación se calcula como uno dividido por la raíz cuadrada de uno menos la velocidad del vehículo al cuadrado sobre la velocidad de la luz al cuadrado. El resultado matemático indica que si logras acelerar una nave espacial hasta alcanzar el 90% de la velocidad límite, tu tiempo interno transcurrirá 2.3 veces más lento. Esto significa que experimentarás una fracción del tiempo que registra una persona que permanece en la Tierra. Este cálculo es la base para diseñar trayectorias interestelares hacia regiones distantes.',
      'Al acelerar una nave hacia velocidades próximas al límite del universo, la dilatación temporal se incrementa. Si viajas al 99.99% de la velocidad de la luz, la relatividad establece que tu reloj biológico transcurrirá 70 veces más lento respecto al exterior. Desde tu perspectiva dentro de la cabina, las horas pasarán normalmente, pero el universo exterior envejecerá a un ritmo acelerado. Alcanzar este impulso requeriría cantidades de energía antimateria, pero ilustra cómo las leyes de la física alteran el desarrollo fisiológico humano frente a observadores externos al sistema de propulsión.',
      'La dilatación temporal es un fenómeno astrofísico comprobado mediante experimentación aeronáutica. Para verificar la relatividad, los científicos J.C. Hafele y R.E. Keating diseñaron un experimento en 1971. Utilizaron relojes de cesio, los cuales mantienen una precisión atómica, y los transportaron a bordo de aviones comerciales alrededor del mundo. Al viajar en direcciones opuestas, los vuelos generaron diferentes velocidades relativas respecto a la rotación planetaria. Este diseño experimental permitió observar el efecto del movimiento sobre el transcurso de los segundos biológicos.',
      'Una vez que los aviones aterrizaron, los científicos compararon los registros con los relojes de referencia que permanecieron estáticos en el laboratorio terrestre. Los datos revelaron que los instrumentos en vuelo habían acumulado una diferencia matemática de fracciones de segundo, de acuerdo con las ecuaciones de Lorentz. El reloj que viajó hacia el este perdió tiempo, mientras que el reloj en dirección oeste ganó microsegundos debido a la dinámica orbital de nuestro planeta. Esta evidencia física confirmó que la velocidad de un objeto altera la medición objetiva del tiempo.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la película Interstellar, la dilatación temporal se debe a la gravedad del agujero negro. Sin embargo, la nave Endurance también experimenta dilatación inercial por su velocidad de crucero. Durante el viaje hacia la anomalía espacial, la nave mantiene una aceleración que genera diferencias temporales medibles. Mientras los astronautas descansan en hibernación, su reloj metabólico transcurre con lentitud relativa en comparación con la Tierra. Estos efectos ilustran las consecuencias científicas del desplazamiento interplanetario.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La dilatación inercial ocurre constantemente a escala microscópica en nuestra vida civil. Cada vez que viajas a bordo de un avión aéreo a velocidad de crucero, envejeces fracciones de nanosegundo menos que las personas que permanecen en tierra. Aunque la diferencia es imperceptible, los instrumentos cuánticos modernos logran medir esta desviación con exactitud. Por lo tanto, bajo las ecuaciones de la relatividad, todo pasajero es un viajero cronológico hacia el futuro de los observadores terrestres.' },
    ],
    fact: 'El límite absoluto para los efectos relativistas es la velocidad de la luz en el vacío, representada por la variable "c", que equivale a 299,792 kilómetros por segundo. Según los cálculos de Einstein, si un cuerpo material pudiera alcanzar esta velocidad de forma teórica, la dilatación alcanzaría un grado infinito. Esto significa que el tiempo biológico se detendría por completo desde el marco referencial del viajero. Para los fotones de luz, el tiempo cronológico no transcurre en absoluto dentro de su plano existencial.',
  },
  {
    id: 'gemelos-einstein',
    title: 'La Paradoja de los Gemelos',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m3/btn_gemelos.jpg',
    image: '/assets/interstellar/infographic_m3/hero_gemelos.jpg',
    content: [
      'Uno de los ejercicios teóricos más analizados en la física moderna se denomina la Paradoja de los Gemelos. Este escenario espacial, derivado de la relatividad especial, involucra a dos hermanos monocigóticos. Un sujeto aborda una nave que acelera hacia el espacio profundo alcanzando una fracción significativa de la velocidad de la luz, mientras que el individuo de control permanece en la Tierra. Este experimento mental permite examinar cómo el movimiento prolongado a altas velocidades impacta el envejecimiento celular diferencial entre dos humanos genéticamente idénticos.',
      'Si el viajero espacial se desplazara al 86% de la velocidad de la luz durante una década según la computadora de su nave, regresaría para enfrentar una diferencia temporal abismal. Al descender del cohete, descubriría que han transcurrido aproximadamente veinte años en la superficie del planeta. El gemelo que permaneció estático habría envejecido dos décadas completas, mientras que el piloto solo habría experimentado diez años biológicos de deterioro celular. Este resultado matemático demuestra que el tiempo carece de una referencia universal absoluta para todos.',
      'Aunque se clasifica como una paradoja, la física teórica resuelve el escenario sin contradicciones lógicas. La diferencia de edades surge debido a que los marcos de referencia carecen de simetría inercial. Para regresar a su origen, la nave debe desacelerar, invertir su trayectoria balística y volver a acelerar hacia el sistema solar. Estos cambios de inercia introducen variaciones vectoriales que rompen la simetría entre ambos observadores del evento. El gemelo en la base se mantiene en un estado constante, mientras que el piloto experimenta fuerzas que causan la discrepancia final.',
      'Este principio relativista ha sido documentado con astronautas mediante el estudio biomédico de gemelos humanos dirigido por la NASA. Los hermanos genéticamente idénticos Scott Kelly y Mark Kelly proporcionaron la métrica experimental para evaluar los efectos fisiológicos espaciales. Scott Kelly residió en la Estación Espacial Internacional (ISS) durante casi un ciclo solar de órbita, mientras que su hermano Mark permaneció en un ambiente de gravedad planetaria. Este protocolo permitió investigar las sutiles variaciones cronológicas en organismos complejos reales.',
      'Tras completar una misión orbital de 340 días a miles de kilómetros por hora, Scott regresó a la atmósfera del planeta. Los análisis posteriores confirmaron que el astronauta envejeció 8.6 milisegundos menos que su hermano terrestre. Esta diferencia temporal ilustra la dilatación cinética operando en la navegación satelital contemporánea mediante aceleración inercial sostenida. Fue un proyecto pionero que comprobó la teoría utilizando sujetos humanos bajo estrictos parámetros científicos controlados por agencias aeroespaciales en órbita de baja altitud.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La estructura fílmica de Interstellar está diseñada en torno a los efectos perjudiciales que causa la dilatación temporal sobre las relaciones biológicas. Cuando el piloto Cooper se embarca en la misión a través del agujero de gusano para asegurar la supervivencia humana, su hija Murph permanece en la base. Durante el desarrollo del trayecto interestelar, el protagonista experimenta un envejecimiento reducido de pocos años biológicos, pero al regresar descubre que su hija ha alcanzado la vejez terminal. La cinta expone las consecuencias antropológicas de la gravedad relativista.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'La resolución académica de la Paradoja de los Gemelos recae en la asimetría de los marcos no inerciales de medición espacial. El viajero no mantiene una velocidad orbital constante durante todo su trayecto; sufre aceleraciones severas durante la ignición de los motores y fuerzas vectoriales al cambiar de cuadrante estelar. Esta dinámica del movimiento significa que solo el observador planetario experimenta un tiempo lineal continuo, lo que valida formalmente la discrepancia final de edades cronológicas mediante el uso de las ecuaciones del tejido relativista.' },
    ],
    fact: 'Si un módulo espacial pudiera mantener una aceleración constante de 1g, simulando la gravedad terrestre ideal, un cosmonauta llegaría a la galaxia de Andrómeda en solo doce años de tiempo subjetivo transcurrido a bordo. Sin embargo, debido a las métricas relativistas para cubrir esa distancia galáctica, habrían transcurrido alrededor de 2.5 millones de años cronológicos en la Tierra. Este escenario matemático evidencia el potencial de la aceleración constante para la colonización, permitiendo cruzar el vacío cósmico en una sola vida fisiológica humana de servicio activo.',
  },
  {
    id: 'dilatacion-gravitacional',
    title: 'La Gravedad Frena el Tiempo',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m3/btn_gravedad.jpg',
    image: '/assets/interstellar/infographic_m3/hero_gravedad.jpg',
    content: [
      'Además de la dilatación por velocidad lineal, Einstein postuló que los campos gravitacionales tienen un impacto cuantificable sobre el flujo cronológico de la realidad. Según la Relatividad General, la presencia de masa superdensa curva el tejido del espacio-tiempo universal, y esta deformación geométrica altera el ciclo de cualquier reloj material ubicado cerca. Cuanto mayor sea la densidad del objeto estelar y su atracción planetaria, más lento transcurrirá el tiempo biológico en su proximidad gravitatoria, estableciendo un desfase continuo en relación con el vacío interestelar lejano.',
      'Un campo gravitatorio intenso funciona como una fosa dentro de la topología del espacio exterior infinito. A medida que una sonda de investigación se sitúa en un punto de mayor profundidad gravitacional extrema, la desaceleración del tiempo local aumenta exponencialmente en relación con el exterior del sistema. Desde la perspectiva estricta de la mecánica cuántica moderna, operar dentro de este radio de gravedad masiva exige que las partículas elementales reduzcan su oscilación atómica normal. Esto genera un diferencial observable donde la vida biológica evoluciona de manera pausada y dispar.',
      'Para comprobar científicamente la alteración temporal por gravedad concentrada, los físicos R.V. Pound y G.A. Rebka estructuraron un experimento definitivo en la Universidad de Harvard durante 1959. Utilizaron una torre vertical de 22.5 metros de longitud total en el Laboratorio Jefferson para estudiar la radiación electromagnética de elementos inestables. El equipo disparó fotones de rayos gamma desde el techo superior hacia un detector de impacto situado en el nivel del sótano profundo, buscando medir la variación de frecuencia causada por la masa planetaria del globo terrestre subyacente.',
      'Los datos experimentales recolectados demostraron que las ondas fotónicas modificaban su espectro al descender hacia el sótano inferior, evidenciando un cambio en el tiempo cronológico entre diferentes niveles del edificio universitario. Al analizar las colisiones a nivel atómico, confirmaron que los milisegundos en la base inferior transcurrían más lentamente en comparación con la azotea superior del recinto educativo humano. Esta modulación ondulatoria demostró exitosamente el postulado de la relatividad gravitacional aplicando detectores de frecuencia óptica sumamente sensibles.',
      'Esta comprobación instrumental implica que el relieve geográfico genera desajustes temporales a nivel planetario en nuestra propia civilización moderna. Un investigador que habite en la cumbre rocosa de una formación geológica gigante como el Everest experimentará un envejecimiento milimétricamente más veloz por su lejanía altitudinal del centro gravitatorio ardiente. Al estar situado a gran altitud atmosférica, la fuerza del núcleo geológico es menor estadísticamente, lo que disminuye el efecto de la compresión cronológica sobre los ritmos circadianos de las células en divisiones diarias continuas.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La mecánica de la dilatación temporal forma el principal impedimento para la exploración interplanetaria ilustrada en la trama narrativa de Interstellar. El sistema orbital del agujero Gargantúa contiene un gradiente gravitacional extremo que corrompe la sincronía humana del tiempo estándar astronómico. Cualquier transporte que atraviese la órbita baja de este gigante cósmico sufre una ralentización exponencial del paso del tiempo orgánico celular vital. Este factor astrofísico convierte cada exploración planetaria en un riesgo de aislamiento intergeneracional severo y destructivo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Como resultado de la diferencia gravitacional que opera entre diferentes zonas anatómicas del cuerpo humano bípedo, estamos bajo dilataciones biológicas asimétricas permanentes en nuestra edad fisiológica total. Ya que la interacción de la gravedad es ligeramente menor conforme aumenta el nivel altitudinal topográfico, el cerebro cognitivo humano envejece nanosegundos adicionales respecto a los miembros inferiores terrestres de apoyo constante. Aunque estas fluctuaciones somáticas son indetectables con los sentidos, los laboratorios aeroespaciales utilizan estos datos precisos y fiables para calibraciones de equipos satelitales.' },
    ],
    fact: 'La ingeniería metrológica reciente permite estudiar la ralentización cuántica usando distancias sumamente reducidas a nivel de centímetros convencionales exactos. Si se sitúa un reloj cuántico hiperpreciso sobre un banco de pruebas básico, y su dispositivo gemelo idéntico en el piso inferior contiguo paralelo al suelo, una separación física de apenas cuarenta y cinco centímetros verticales arroja una asimetría medible del tiempo relativo transcurrido localmente. Este nivel de resolución experimental valida que el tejido espacial se deforma gravitacionalmente en entornos civiles reducidos comunes cotidianos.',
  },
  {
    id: 'gps-real',
    title: 'Tu Celular Necesita a Einstein',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m3/btn_gps.jpg',
    image: '/assets/interstellar/infographic_m3/hero_gps.jpg',
    content: [
      'A pesar de que las consecuencias extremas de la relatividad general de Einstein parecen exclusivas de sistemas astrofísicos distantes en el vacío, este marco matemático resulta vital para nuestra infraestructura de tecnología civil terrestre satelital hoy en día. La fluctuación del tiempo dicta los ritmos algorítmicos en redes de telemática globales y métodos de navegación automática espacial. Las ecuaciones relativistas representan una directriz práctica para garantizar la precisión de cada triangulación en el transporte internacional aéreo de manera ininterrumpida.',
      'El proceso informático de las interfaces de navegación depende funcionalmente de integrar correcciones relativistas complejas procedentes de estudios espaciales avanzados y comprobados teóricamente de forma estricta. Para que una terminal de geolocalización sitúe un automóvil civil sobre el sistema vial urbano, su procesador informático rastrea señales satelitales constantemente emitidas sin descanso operativo continuo y automático. Estas recepciones procesan variables físicas para ajustar alteraciones temporales orbitales, eludiendo fallos de cálculo durante tu transporte rutinario terrestre motorizado.',
      'El conjunto de satélites GPS dispone de treinta y un unidades en órbita terrestre que circundan la atmósfera de forma constante para ofrecer servicios ininterrumpidos y globales. Estos artefactos espaciales avanzan a una elevación media superior a veinte mil kilómetros, empleando osciladores atómicos de rubidio sincronizados con el Meridiano Cero terrestre de referencia geocéntrica. Los terminales comparan el diferencial del intervalo transmisor para concretar coordenadas de posicionamiento plano mediante triangulación.',
      'En la exósfera, el entorno orbital del sistema GPS induce fenómenos relativistas contrapuestos que alteran sus metrónomos de cesio. La velocidad orbital desarrolla dilataciones espaciales que restan siete microsegundos temporales en su cómputo binario diariamente. Al mismo tiempo, como los satélites operan alejados del pozo gravitacional de la Tierra, sus componentes registran un avance cronológico de cuarenta y cinco microsegundos adicionales. Esto causa una discrepancia del parámetro estándar global.',
      'La interacción de estas distorsiones astronómicas desencadena un adelanto acumulativo de treinta y ocho microsegundos diarios en los sensores orbitales de geolocalización. Si la plataforma de control obviara aplicar el margen de corrección matemática de Einstein a la programación satelital, los relojes incurrirían en un error sistémico catastrófico. En una sola jornada operativa, la pérdida temporal acumulada desplazaría la medición geográfica por un error de diez kilómetros, destruyendo su utilidad como método de navegación para la humanidad moderna de manera inmediata.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El error de geolocalización en los satélites subraya las consecuencias de la dilatación relativista asimétrica en el espacio. Aunque en la tecnología terrestre esto representa un desajuste informático de fracciones de segundo, en el entorno del Planeta Miller esto implica variaciones multigeneracionales reales y tangibles de forma dolorosa para los astronautas de la misión espacial. La diferencia temporal roba décadas de longevidad biológica a los protagonistas, confirmando el alcance del postulado matemático propuesto por los pioneros de la física de partículas a nivel macroscópico observable visualmente y dramáticamente.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Para asegurar la viabilidad del equipo, los programadores implementaron un interruptor de corrección matemática desde la estación base de control. Tras el despliegue del primer dispositivo, el desfase operativo verificó empíricamente las teorías contemporáneas de la relatividad astrofísica, lo que obligó a mantener la compensación cronológica activada permanentemente para garantizar la fiabilidad del servicio geodésico a nivel mundial para toda actividad de geoposicionamiento en nuestra era hiperconectada global.' },
    ],
    fact: 'El investigador Neil Ashby publicó investigaciones documentando las aplicaciones de la relatividad einsteniana dentro del marco del GPS. Su ensayo publicado en el año 2003 expone las ecuaciones de ingeniería que sincronizan el reloj orbital frente a las estaciones terrestres de referencia geocéntrica. Sin esta modulación constante basada en los descubrimientos de la física de partículas, careceríamos de sistemas fiables de posicionamiento para la logística del transporte marítimo y la cartografía electrónica requerida en la infraestructura urbana del siglo actual de la humanidad civilizada y moderna tecnológicamente.',
  },
  {
    id: 'planeta-miller',
    title: 'Una Hora = Siete Años',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m3/btn_miller.jpg',
    image: '/assets/interstellar/infographic_m3/hero_miller.jpg',
    content: [
      'El momento más impactante de Interstellar es la visita al Planeta Miller, un mundo oceánico donde cada hora equivale a siete años terrestres. Esto significa un factor de dilatación temporal de aproximadamente 61,000. Es una cifra abrumadora: por cada minuto que los astronautas pasan en la superficie, más de un mes transcurre en la Tierra.',
      'Esta dilatación extrema no fue un capricho del director Christopher Nolan. El asesor científico Kip Thorne la calculó con rigor: para que un planeta experimente semejante ralentización del tiempo sin ser destruido por fuerzas de marea, debe orbitar justo al borde del horizonte de sucesos de un agujero negro supermasivo que rota a velocidad casi lumínica.',
      'Thorne determinó que Gargantúa debía girar al 99.8% de la velocidad de la luz. Solo a esa velocidad de rotación, la ergosfera permite que un planeta orbite tan cerca sin ser despedazado. Las matemáticas son consistentes con la relatividad general, y Thorne publicó estos cálculos en su libro "The Science of Interstellar" (2014).',
      'La gravedad en la superficie de Miller es 1.3 veces la terrestre, suficiente para que los astronautas caminen normalmente. Pero las olas gigantes de 1,200 metros de altura son resultado de las fuerzas de marea de Gargantúa: la diferencia gravitacional entre el lado del planeta más cercano y más lejano al agujero negro crea mareas colosales.',
      'Lo más desgarrador es la consecuencia humana. Cooper y Brand pasan aproximadamente 3 horas en Miller. Cuando regresan a la nave Endurance, descubren que han pasado 23 años y 4 meses terrestres. Romilly, que los esperaba a bordo, ha envejecido más de dos décadas. Las matemáticas de Einstein transformadas en tragedia personal.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La escena más devastadora ocurre cuando Cooper regresa del Planeta Miller y encuentra 23 años de mensajes de video acumulados. Ve a sus hijos crecer, envejecer y alejarse emocionalmente en cuestión de minutos. Su hijo Tom le dice que ya se rindió esperándolo. Es la relatividad convertida en dolor humano, y muestra por qué la dilatación temporal no es solo una curiosidad teórica: tiene consecuencias reales sobre las relaciones y la vida.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'El compositor Hans Zimmer incluyó un tic-tac sutil en la banda sonora de la escena del Planeta Miller. Cada chasquido representa un día terrestre completo que se pierde mientras los astronautas están en la superficie. Zimmer diseñó esto para crear tensión subconsciente: el público siente que el tiempo se escapa incluso antes de entender la magnitud de la tragedia temporal.' },
    ],
    fact: 'Kip Thorne tuvo que desarrollar ecuaciones nuevas de ray-tracing gravitacional específicamente para calcular cómo se vería el cielo desde la superficie de Miller. Las estrellas del fondo aparecerían distorsionadas y comprimidas por la lente gravitacional de Gargantúa. Sus cálculos resultaron en dos artículos científicos publicados en la revista Classical and Quantum Gravity en 2015.',
  },
  {
    id: 'paradoja-gemelos',
    title: '¿Quién Envejece Más?',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m3/btn_paradoja.jpg',
    image: '/assets/interstellar/infographic_m3/hero_paradoja.jpg',
    content: [
      'Al final de Interstellar se revela la consecuencia más emotiva de la dilatación temporal: Cooper regresa biológicamente joven, mientras su hija Murph es una anciana de más de 90 años. Cooper luce igual que cuando partió, como si hubiera encontrado una fuente de juventud. Pero no hay magia: es pura relatividad.',
      'Cooper acumuló dilatación temporal de dos formas. Primero, viajó a velocidades cercanas a la de la luz durante el trayecto entre sistemas estelares. Segundo, se sumergió en el campo gravitacional de Gargantúa, donde el tiempo prácticamente se detenía para él. Ambos efectos son predichos por la relatividad y se suman.',
      'No es una paradoja real, aunque se llame así. La asimetría tiene una explicación clara: Cooper experimentó aceleraciones intensas y campos gravitacionales extremos. Murph se quedó en un marco de referencia aproximadamente inercial en la Tierra. La física distingue claramente quién envejece más y quién menos.',
      'Este fenómeno tiene un precedente real, aunque a escala microscópica. El astronauta Scott Kelly pasó 340 días en la ISS orbitando a 27,600 km/h. Cuando regresó, era 8.6 milisegundos más joven que su gemelo Mark Kelly. La paradoja de los gemelos ocurrió literalmente entre dos hermanos astronautas idénticos.',
      'La escena del reencuentro entre Cooper y Murph anciana es el clímax emocional de la película. La actriz Ellen Burstyn, de 80 años durante el rodaje, interpretó a la Murph envejecida. Murph le pide a Cooper que se vaya: ningún padre debería ver morir a sus hijos. La relatividad, aquí, no es abstracta. Es desgarradoramente personal.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La separación temporal entre Cooper y Murph proporciona el motor emocional de toda la película. Nolan diseñó la historia para que la física no fuera un telón de fondo sino el corazón del drama. La promesa de Cooper a Murph de volver contrasta con la realidad de que el tiempo los separa irremediablemente. Cuando finalmente se reencuentran, Murph está rodeada de sus hijos y nietos, personas que Cooper nunca conoció.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Ellen Burstyn, quien interpreta a la Murph anciana, tenía efectivamente 80 años durante el rodaje en 2013. Nolan eligió deliberadamente a una actriz de edad real en lugar de usar maquillaje de envejecimiento, para que la emoción fuera genuina. Burstyn ganó el Oscar en 1975 por "Alice Doesn\'t Live Here Anymore" y su experiencia de vida real añadió autenticidad a la escena final.' },
    ],
    fact: 'Si replicaras exactamente el viaje de Cooper â€” incluyendo la estancia en Miller y la inmersión en Gargantúa â€” la dilatación temporal acumulada sería de aproximadamente 80 años terrestres. Cooper envejecería quizás 2-3 años biológicos mientras la Tierra avanzaba casi un siglo. Este cálculo es consistente con las ecuaciones de la relatividad general para un agujero negro Kerr rotando al 99.8% de la velocidad de la luz.',
  },
  {
    id: 'futuro-crononauta',
    title: 'Viajeros del Tiempo Reales',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m3/btn_futuro.jpg',
    image: '/assets/interstellar/infographic_m3/hero_futuro.jpg',
    content: [
      'La conclusión de todo lo que hemos explorado es sencilla y deslumbrante: el viaje en el tiempo hacia el futuro es posible. No es ciencia ficción ni especulación: es física verificada experimentalmente una y otra vez desde que Einstein publicó sus ecuaciones en 1905 y 1915.',
      'No lo harás metiéndote en un DeLorean ni en una cabina telefónica. El viaje temporal real está gobernado por las matemáticas de la relatividad: necesitas velocidad extrema o gravedad intensa. Cuanto más rápido te muevas o más cerca estés de un objeto masivo, más lento pasará el tiempo para ti comparado con quienes se quedaron atrás.',
      'El cosmonauta ruso Sergei Krikalev ostenta el récord como el mayor viajero del tiempo de la historia humana. Durante su carrera espacial, pasó un total de 803 días orbitando la Tierra a bordo de la estación Mir y la ISS, acumulando velocidades de 27,700 km/h durante meses consecutivos.',
      'Gracias a la dilatación temporal por velocidad, Krikalev se adelantó 0.02 segundos al futuro con respecto a todos los demás seres humanos en la Tierra. Puede parecer insignificante, pero demuestra un principio enorme: con la tecnología adecuada, podríamos saltar décadas o siglos enteros hacia adelante.',
      'Si pudiéramos construir una nave que viajara al 99.995% de la velocidad de la luz, un viaje de 10 años para la tripulación equivaldría a 1,000 años en la Tierra. Los viajeros regresarían a un mundo completamente transformado. La física lo permite. Solo nos falta la ingeniería para lograrlo.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La esperanza en las capacidades del intelecto humano se resume en el epílogo de Interstellar: la humanidad logra sobrevivir construyendo estaciones espaciales gigantes que orbitan Saturno. Cooper despierta en la Estación Cooper, donde la gravedad ha sido dominada gracias a los datos que Murph descifró del reloj. La especie se adapta, abraza la física y conquista el espacio. Nolan muestra que la ciencia, no la magia, es lo que nos salvará.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Viajar al futuro es físicamente posible y demostrado. Viajar al pasado, en cambio, sigue siendo una prohibición del universo. Las ecuaciones de la relatividad general permiten soluciones con curvas temporales cerradas (viajes al pasado), pero requieren materia exótica con energía negativa, y la Conjetura de Protección Cronológica de Hawking sugiere que la naturaleza siempre conspira para impedirlo. El tiempo fluye en una sola dirección.' },
    ],
    fact: 'Stephen Hawking organizó una fiesta para viajeros del tiempo el 28 de junio de 2009 en Cambridge. Preparó champán, globos y un letrero de bienvenida, pero envió las invitaciones después de la fiesta. Su razonamiento: si alguien del futuro pudiera viajar al pasado, habría recibido la invitación y asistido. Nadie apareció. Hawking lo consideró evidencia experimental de que el viaje al pasado probablemente es imposible.',
  },
];

// â”€â”€â”€ Gargantua Video Background â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <video autoPlay muted loop playsInline
        poster="/assets/interstellar/gargantua_bg.jpg"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="/assets/interstellar/blackhole.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
    </div>
  );
}

// â”€â”€â”€ Interstellar Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.3))' }}>
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4FC3F7','#AB47BC','#FF6B35','#26A69A','#F44336','#7C4DFF','#FF9800'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#FF6B35" opacity="0.5" />
        <ellipse cx="300" cy="30" rx="18" ry="6" fill="none" stroke="#FF6B35" strokeWidth="1.5" opacity="0.6" transform="rotate(20 300 30)" />
        <defs>
          <linearGradient id="timeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,107,53,0.2)" />
            <stop offset="50%" stopColor="rgba(79,195,247,0.9)" />
            <stop offset="100%" stopColor="rgba(255,107,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL TIEMPO ES ELÁSTICO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">DILATACIÃ“N TEMPORAL</text>
      </svg>
    </div>
  );
}

// â”€â”€â”€ Organic Node Button â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
        border: `3px solid ${isActive ? node.color : 'rgba(79,195,247,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
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
          layoutId="activeDotInterstellarM3"
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

// â”€â”€â”€ Expandable Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
                  background: node.color, color: '#0a0c1e',
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
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} /> Profundiza tu Conocimiento
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* â”€â”€â”€ Fast Fact â”€â”€â”€ */}
        {node.fact && (
          <div style={{
            marginTop: '2rem', padding: '1.2rem',
            background: `linear-gradient(90deg, ${node.color}15, transparent)`,
            borderLeft: `4px solid ${node.color}`,
            borderRadius: '0 12px 12px 0',
            display: 'flex', gap: '1rem', alignItems: 'flex-start',
            position: 'relative', zIndex: 2,
          }}>
            <div style={{
              background: node.color, color: '#0a0c1e',
              padding: '0.5rem', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={20} />
            </div>
            <div>
              <strong style={{ display: 'block', color: node.color, marginBottom: '0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Fascinante
              </strong>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', lineHeight: 1.6, fontStyle: 'italic' }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// â”€â”€â”€ Main Infographic Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterstellarM3() {
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  
  const activeNode = useMemo(() => 
    INFOGRAPHIC_NODES.find(n => n.id === activeNodeId),
  [activeNodeId]);

  return (
    <div style={{
      width: '100%',
      minHeight: '800px',
      background: '#0a0c1e',
      borderRadius: '24px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#fff',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <InterstellarBackground />

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <InterstellarHeader />

        {/* â”€â”€â”€ Node Navigation â”€â”€â”€ */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          margin: '2rem 0',
          position: 'relative',
          zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              index={i}
              isActive={activeNodeId === node.id}
              onClick={() => setActiveNodeId(prev => prev === node.id ? null : node.id)}
            />
          ))}
        </div>

        {/* â”€â”€â”€ Dynamic Content Area â”€â”€â”€ */}
        <div style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence mode="wait">
            {activeNode ? (
              <ContentPanel key={activeNode.id} node={activeNode} onClose={() => setActiveNodeId(null)} setLightboxSrc={setLightboxSrc} />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '300px',
                }}
              >
                <div style={{
                  textAlign: 'center', color: 'rgba(79,195,247,0.4)',
                  border: '1px dashed rgba(79,195,247,0.2)',
                  borderRadius: '20px', padding: '3rem',
                  maxWidth: '400px',
                }}>
                  <Sparkles size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>
                    Selecciona un nodo del tejido espaciotemporal para explorar la relatividad
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* â”€â”€â”€ Bibliography Footer â”€â”€â”€ */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '16px',
        }}>
          <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            ðŸ“š Fuentes y Referencias
          </h4>
          <ul style={{
            margin: 0, padding: '0 0 0 1.2rem',
            display: 'flex', flexDirection: 'column', gap: '0.8rem',
          }}>
            {BIBLIOGRAPHY.map((bib, i) => (
              <li key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                {bib}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Lightbox component */}
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
