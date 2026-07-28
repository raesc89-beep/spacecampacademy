'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Interstellar themed) ────────────────────────────
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
      <text x="5" y="32" fill={color} fontSize="22" fontWeight="bold" fontFamily="serif" opacity="0.6">Gμν=8πTμν</text>
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
      'Albert Einstein nos enseñó en su espectacular Teoría de la Relatividad Especial que el paso continuo del tiempo no es algo fijo, inamovible o idéntico para todos los seres vivos del vasto universo. La sorprendente realidad es que tu velocidad personal influye dramáticamente en cómo transcurre el tiempo para ti. Imagina el tiempo de tu reloj como si fuera una gruesa cinta de chicle estirable; mientras más rápido te mueves por el amplio espacio, más fuerte se estira esta increíble cinta de chicle temporal, provocando inevitablemente que cada segundo que experimentas dure considerablemente más y pase de manera mucho más lenta y pausada.',
      'Existe una ecuación fundamental y maravillosa conocida por los físicos teóricos como el Factor de Lorentz (calculado meticulosamente como uno dividido por la raíz cuadrada de uno menos tu velocidad al cuadrado sobre la velocidad de la luz al cuadrado). Este número casi mágico indica con absoluta precisión matemática que si logras acelerar una avanzada nave espacial hasta alcanzar un vertiginoso 90% de la máxima velocidad de la luz cósmica, el paso de tu tiempo interno será unas 2.3 veces más pausado y lento en total comparación directa con el tiempo vivido por una persona que se ha quedado descansando pasivamente en su tranquila casa de la Tierra.',
      'Y si continuamos acelerando tu brillante nave hasta velocidades aún más alucinantes y extremas, empujando los límites del universo físico, los efectos se vuelven francamente descabellados e increíbles. Viajar constante e implacablemente al deslumbrante 99.99% de la velocidad de la radiante luz estelar causaría matemáticamente que tu propio tiempo personal biológico transcurra unas extraordinarias y abrumadoras 70 veces más lento que en el exterior inerte. Viajar a estas velocidades absurdas es análogo a poner tu existencia terrenal en modo de cámara ultra lenta mientras el ancho mundo a tu alrededor sigue y sigue reproduciéndose en un avance supremamente rápido e indetenible.',
      'Aunque todo esto suena sinceramente a ciencia ficción pura y locura inventada por un escritor muy imaginativo, se trata en verdad de pura y demostrable ciencia real e incontestable. Para probar definitivamente estas extravagantes teorías alemanas, los audaces físicos J.C. Hafele y R.E. Keating realizaron un histórico, costoso e indispensable experimento científico en el lejano e importante año de 1971. Ellos subieron valientemente varios relojes atómicos ultraprecisos, exactos hasta la millonésima parte de un segundo, a bordo de ruidosos y pesados aviones comerciales de pasajeros comunes y corrientes, y los hicieron volar incansablemente dándole múltiples vueltas enteras y completas alrededor del vasto globo de nuestro planeta azul.',
      'Cuando estos ruidosos aviones experimentales aterrizaron finalmente en su pista original exhaustos, los meticulosos e intrigados científicos procedieron a revisar cuidadosamente los registros horarios y encontraron con asombro reverencial que los precisos relojes voladores se habían atrasado algunas minúsculas y pequeñas fracciones de segundo medibles en relación exacta con los formales relojes atómicos estáticos que se habían quedado aburridamente y sin ningún movimiento en el laboratorio de tierra firme. Esta minúscula pero valiosísima prueba experimental física confirmó por completo que la simple velocidad de nuestro movimiento ralentiza genuinamente y frena indudablemente los engranajes y manecillas invisibles de nuestro propio tiempo vital.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En nuestra amada e inolvidable cinta Interstellar, aunque el factor de dilatación temporal más asombroso, brutal y destructivo que presenciamos asombrados proviene innegablemente de la gravedad descomunal del negro vacío estelar, la nave espacial principal llamada heroicamente Endurance también sufre forzosamente una leve dilatación por su alta velocidad constante. Mientras los valientes astronautas duermen congelados en el largo y solitario viaje interestelar hacia el distante agujero de gusano misterioso, su alta aceleración cósmica sostenida les resta matemáticamente preciosos segundos a su reloj natural terrenal sin que ellos lo noten nunca, como sutiles fantasmas estelares viajando velozmente entre dos mundos.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Es un hecho científico y cotidiano totalmente verificable y real, por muy ínfimo o microscópico que pueda sonar hoy en día, que cada solitaria vez que decides viajar cómodamente a bordo de un enorme y veloz avión comercial regular para ir a tomar unas merecidas vacaciones tropicales veraniegas, tú envejeces en fracciones mínimas un poco más despacio y lentamente que absolutamente todos tus familiares y queridos amigos que pacientemente aguardan sin moverse en el suelo terrenal de tu país; técnicamente hablando de física avanzada estricta, cada pasajero aéreo del inmenso globo es un auténtico e involuntario mini viajero del tiempo futuro.' },
    ],
    fact: 'El insuperable, alucinante e inviolable límite cósmico absoluto para estos extraños e increíbles efectos relativistas temporales se conoce como "c", la constante y colosal velocidad exacta de la luminosa radiación de la luz en el vacío inescrutable, que mide aproximadamente unos gigantescos y redondos 300,000 kilómetros recorridos en un solo instante de cada segundo. Si por algún acto completamente milagroso o absurdo lograses igualar esa velocidad extrema sin desintegrarte brutalmente en pura energía incandescente ardiente, tu factor personal de tiempo interior simplemente llegaría mágicamente a cero absoluto; para un fotón de luz puro, el transcurrir mismo de las horas sencillamente no existe jamás en todo el universo.',
  },
  {
    id: 'gemelos-einstein',
    title: 'La Paradoja de los Gemelos',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m3/btn_gemelos.jpg',
    image: '/assets/interstellar/infographic_m3/hero_gemelos.jpg',
    content: [
      'Uno de los más famosos, debatidos y alucinantes ejercicios teóricos intelectuales nacidos directamente de la compleja relatividad especial formulada por Einstein es lo que los astrofísicos llaman habitualmente la "Paradoja de los Gemelos". En este intrigante y enrevesado escenario mental, imaginamos vívidamente a dos gemelos terrestres biológicamente y genéticamente totalmente idénticos; uno de ellos, sumamente osado y valiente, decide emprender rápidamente un asombroso y solitario viaje sideral en un cohete ultrarrápido que acelera bruscamente hasta acariciar la máxima velocidad límite de la luz, mientras su triste hermano gemelo permanece aguardando sin hacer nada en la quieta Tierra.',
      'Si el gemelo viajero y temerario pasara volando solitariamente por el oscuro cosmos a un 86% de la colosal y total velocidad de la prístina luz espacial durante lo que para él sería solamente una década entera (diez cortos años medidos fielmente en su nave metálica), encontraría un panorama totalmente desolador y escalofriante a su regreso forzoso. Al pisar nuevamente el suelo verde terrestre y abrazar a su esperado familiar, su cansado gemelo que permaneció estático y aburrido en casa habría envejecido inevitablemente veinte años enteros completos. Es como si el veloz hermano viajero sideral hubiese estado congelado artificialmente en una extraña máquina biológica mágica que conservara maravillosamente su cuerpo biológico.',
      'Aunque la cultura general y científica lo llama equivocadamente y persistentemente como una "paradoja" ilógica e inexplicable, la triste verdad para los puristas de la física cuántica es que no encierra absolutamente ninguna clase de misterio irresoluble ni error de cálculo. Todo ocurre porque los escenarios vitales de los dos idénticos hermanos no son para nada simétricos. Para que el aventurero del espacio pueda retornar a la Tierra, debe por ley física frenar su gigantesco y pesado cohete, virar dramáticamente su pesada nave en el vacío e impulsarse nuevamente de regreso, lo cual produce inmensas e insalvables asimetrías debido a las constantes y variables aceleraciones sufridas.',
      'Afortunadamente, no tenemos siquiera que usar locos y enrevesados viajes mentales imaginarios a otras estrellas para lograr probar verídicamente esto en nuestra actualidad moderna y tangible de humanos mortales. La famosa NASA ya realizó valientemente un estudio científico verídico exhaustivo utilizando y analizando intensivamente a dos gemelos astronautas genéticamente idénticos reales: Scott Kelly y Mark Kelly. Scott pasó valientemente casi un larguísimo e insoportable año completo a bordo de la gigantesca y compleja Estación Espacial Internacional (ISS) flotante en órbita lejana, mientras que su gemelo terrestre idéntico Mark se quedó laborando pacientemente abajo en tierra firme terrestre segura.',
      'Al regresar Scott Kelly exhausto a nuestro verde hogar terrícola tras permanecer flotando y orbitando durante 340 días continuos e implacables girando velocísimamente a incontables miles de kilómetros altísimos, la estricta física relativista hizo su magia indetectable de manera impecable y exacta: Scott resultó ser genuinamente y científicamente unos 8.6 milisegundos netos mucho más joven que su gemelo idéntico Mark Kelly; un verdadero y verificable pequeño lapso temporal asimétrico, marcando por fin la primera asombrosa e innegable vez en la larga historia que probamos orgánicamente la relatividad humana gemelar frente a nuestros asombrados y perplejos propios ojos humanos contemporáneos y maravillados.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La desgarradora e impactante columna vertebral emocional y narrativa entera que rige toda la gran película épica Interstellar está cimentada total, profunda y dolorosamente en las tristes e implacables asimetrías que nacen lógicamente y llanamente de los viajes espaciales y la relatividad temporal. Mientras el heroico e intrépido padre Cooper se embarca valientemente en una odisea interestelar atravesando valerosamente agujeros de gusano dimensionales para poder salvar desesperadamente a toda la humanidad a punto de morir ahogada, su amada e inteligente hija pequeña Murph se queda abandonada atrás aguardando pacientemente en la desolada Tierra; Cooper envejece físicamente apenas un corto par de estresantes años aislados, pero regresa al lecho doloroso para encontrar a Murph convertida trágicamente en una abuela centenaria a punto de perecer y morir.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'En las abismales y profundas complejidades ocultas de las famosísimas, intrincadas e inentendibles matemáticas einstenianas, esta supuesta, ilógica y extraña paradoja se resuelve cabalmente comprendiendo simplemente que el atrevido gemelo viajante y arriesgado no permanece jamás en un solitario y único "marco de referencia inercial constante" (es decir que llanamente y lógicamente acelera fuertemente, cambia brusca e impredeciblemente de rumbo estelar y posteriormente desacelera abrupta y dolorosamente en el cosmos); este pesado proceso dinámico de aceleración y desaceleración extrema es en sí mismo lo que desata y genera toda esta gigantesca y observable discrepancia temporal y etaria definitiva.' },
    ],
    fact: 'Si milagrosamente construyéramos ahora mismo un majestuoso y enorme cohete intergaláctico inmensamente resistente que acelerase confortablemente y con firmeza absoluta a un "1 g" estable perpetuo (que curiosamente equivale llanamente a sentir la exacta y misma fuerza agradable de la gravedad que experimentamos todos en la superficie terrestre diaria), nuestro afortunado astronauta interior llegaría velozmente en unos escasos e insignificantes 12 años propios a la lejana y hermosa galaxia de Andrómeda; sin embargo, en la devastada Tierra que él abandonó trágicamente, habrían transcurrido irremediable, desoladora y dolorosamente unos 2.5 millones de interminables y amargos años cronológicos completos.',
  },
  {
    id: 'dilatacion-gravitacional',
    title: 'La Gravedad Frena el Tiempo',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m3/btn_gravedad.jpg',
    image: '/assets/interstellar/infographic_m3/hero_gravedad.jpg',
    content: [
      'Si el hecho indudable y loco de que la gran velocidad altere y retrase implacablemente tu paso por el tiempo te parece asombroso, espeluznante y difícil de creer, prepárate mentalmente para el segundo golpe magistral y aún más inverosímil de la inteligencia de Albert Einstein. Él descubrió maravillado que la enorme, pesada y brutal gravedad cósmica también dobla irremediablemente, ralentiza y afecta gravemente los mismos delicados y precisos engranajes invisibles de la realidad temporal humana. Mientras más fuerte, inmensa, aplastante y brutal sea esa atracción gravitacional invisible donde habitas, más lento e insoportable se volverá implacablemente tu implacable reloj biológico.',
      'Imagina la gran gravedad invisible del planeta como un profundo y abismal pozo negro infinito que te hunde implacablemente y arrastra pesadamente hacia su frío y solitario fondo lejano; según los asombrosos cálculos de la astrofísica moderna, estar físicamente habitando en las abismales profundidades más bajas e ignotas de ese inmenso pozo planetario es muy parecido y análogo, para todos los ineludibles y lógicos propósitos relativistas de la física universal y comprobada, a encontrarse nadando permanentemente bajo una viscosa, espesa y pegajosa miel dorada en donde cada ínfimo segundo temporal y cada movimiento orgánico requiere llanamente del doble de tortuoso y fastidioso esfuerzo infinito.',
      'Un muy curioso, clásico e ineludible experimento sumamente famoso llevado valientemente a cabo para comprobar este descabellado efecto ocurrió directamente dentro del mismísimo y prestigioso campanario escolar de un altísimo e histórico edificio universitario antiguo en Harvard en el memorable año pasado de 1959. Los ingeniosos y brillantes expertos científicos R.V. Pound y G.A. Rebka dispararon con gran precisión varios penetrantes y peligrosos rayos gamma directamente desde el alto techo en forma vertical y descendente hacia los profundos y oscuros sótanos del edificio para ver empíricamente qué les sucedería verdaderamente.',
      'Lo que Pound y Rebka verificaron jubilosamente e indubitablemente al examinar los resultados atómicos es que esa finísima radiación invisible que viajaba rápidamente hacia abajo sentía literalmente y sufría con vigor la diferencia concreta de la fuerza de la atracción de la gravedad terrestre entre la alta azotea de aire fresco y el hundido sótano oscuro. El sutil pero innegable efecto y prueba fue que el tiempo en la parte baja del histórico e importante edificio transcurría verdaderamente en una infinitesimal y microscópica fracción diminuta de segundo mucho más letárgica y pausadamente que arriba en los altos cielos donde descansan los pájaros.',
      'Es por esta incuestionable y sorprendente ley que rige el inmenso universo natural, que si tú vivieras estoica, permanentemente y de manera solitaria habitando pacientemente la gélida y más alta cima solitaria del nevado Monte Everest, el enorme techo nevado del mundo, transitarías el inexorable tiempo un poquito minúsculo y casi indetectable más aprisa, porque estarías situado mucho más lejos, separado y salvaguardado por miles de metros inalcanzables y rocosos del colosal y súper pesado núcleo central ardiente y férreo del planeta Tierra, escapando muy ligeramente de su profundo, abismal y devorador pozo invisible del tiempo dilatado e implacable.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Esta brutal y abrumadora ley astrofísica y universal es justamente el causante central indiscutible y terrorífico del clímax trágico interplanetario: la gigantesca y extrema Dilatación Gravitacional del Tiempo es el desastroso monstruo acechante invisible que aguarda letalmente a Cooper. El colosal y letal agujero negro Gargantúa genera a su paso un hoyo de gravedad espeluznantemente tan infinitamente descomunal y sin fin, que absolutamente cualquier desafortunado viajero espacial imprudente que se acerque de forma estúpida o ingenua lo suficiente a su insaciable perímetro infernal, vivirá trágicamente el frenado cósmico temporal definitivo para toda su efímera raza biológica, estancándose casi por siempre en el gélido limbo espacial.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Debido directa e innegablemente a esta pequeñísima e indetectable anomalía y alteración de los efectos y caprichos de la gravedad que envuelve sutilmente a nuestro planeta azul verdoso y a nuestros delicados cuerpos biológicos, es un hecho curioso y completamente científicamente verdadero afirmar que tu cabeza pensante, la cual está situada casi permanentemente medio metro o más arriba y alejada, resulta verdaderamente envejecer unos levísimos milisegundos más apresuradamente en conjunto temporal que todos los fríos, insensibles y cansados dedos arrugados de tus dos aburridos y ajetreados pies andantes diariamente y de manera repetitiva durante tu rutinaria vida humana mortal.' },
    ],
    fact: 'La gran dilatación y modificación del tiempo debida puramente a la fuerza de gravedad se manifiesta y percibe tan exquisita e increíblemente detallada para los instrumentos actuales modernos, que si valientemente colocarás hoy por hoy a un muy preciso e infalible reloj óptico cuántico en una sencilla silla escolar y al otro idéntico y emparejado reloj hermano atómico sobre el ras del suelo raso a su lado, la simple pero asombrosa y abrumadora distancia vertical mínima de apenas cuarenta y cinco ínfimos centímetros tridimensionales bastaría para medir efectivamente una disparidad asimétrica atómica real en el pasar del flujo ineludible temporal en todo el amplio universo y su vastedad.',
  },
  {
    id: 'gps-real',
    title: 'Tu Celular Necesita a Einstein',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m3/btn_gps.jpg',
    image: '/assets/interstellar/infographic_m3/hero_gps.jpg',
    content: [
      'Tras discutir ardua y pacientemente sobre los inmensos, mortales y lejanos agujeros negros y gemelos viajeros perdidos en el oscuro cosmos infinito y hostil, es comprensible y lógico que asumas con razón justificada que toda esta extraña matemática relativista de relojes elásticos, deformables y maleables que se atrasan mágicamente y misteriosamente por doquier no tenga ningún tipo de efecto ni uso ni cabida alguna en absoluto en tu pacífica vida normal en la bulliciosa Tierra verde y en tus rutinarios paseos.',
      'Sin embargo, y contradiciendo el simple sentido común rutinario, las muy audaces, revolucionarias e intrincadas teorías de la física universal presentadas y sustentadas por Einstein sobre los tiempos dilatados resultan estar activamente salvando tu ruidosa rutina ciudadana a diario y a cada diminuto instante fugaz en el que viajas guiado. Están funcionando milagrosamente en un silencio hermético desde el interior secreto, codificado y deslumbrante de tu reluciente, costoso y querido teléfono celular para que nunca jamás te pierdas al ir a una importante cita médica programada.',
      'Para que la útil aplicación tecnológica de un mapa digital te dirija verdaderamente y de manera correcta indicándote la vuelta precisa en la tumultuosa autopista ruidosa, el vastísimo sistema mundial e interconectado satelital conocido globalmente y popularmente bajo las tres letras del GPS depende estrictamente de treinta y un inmensos y costosos satélites artificiales flotando que habitan permanentemente nuestro negro cielo alto; y ocurre inexorablemente que estos muy sofisticados, frágiles y útiles satélites voladores están viajando actualmente y ahora mismo en este preciso instante a unos abrumadores veinte mil y doscientos asombrosos kilómetros de gran altitud.',
      'Como las leyes físicas cósmicas del tiempo, la velocidad y gravedad castigan fuertemente de ambas maneras contrarias al pobre satélite orbital que viaja solitario en la oscuridad fría, la simple alta velocidad de su trayecto enloquece y retrasa bruscamente sus muy caros y precisos relojes atómicos internos perdiendo siete fugaces microsegundos por día completo; pero de la misma manera adversa y contraria, como también habitan allá arriba flotando muy lejos de la gran atracción del abismal núcleo terrestre pesado y sofocante, sus relojes experimentan un adelanto indeseable gravísimo adelantándose vertiginosamente nada menos que cuarenta y cinco larguísimos y fatales microsegundos extra incontrolables todos los días implacables.',
      'El catastrófico, terrorífico y temible resultado neto y absoluto de todos estos rarísimos vaivenes relativistas celestiales es una pavorosa falla sistémica atómica de treinta y ocho veloces microsegundos diarios netos ganados erróneamente en el contador. Si un ignorante, orgulloso y obtuso ingeniero técnico a cargo decidiera arrogantemente apagar u omitir el gran código matemático programático corrector de la relatividad de Einstein oculto en las entrañas satelitales, en solo un corto día solitario de trabajo los pequeños errores acumulados crecerían tanto como la gigantesca bola de nieve que destruiría la ubicación hasta lograr marcar absurdamente posiciones falsas lejanas errando nada más y nada menos que casi unos mortales diez peligrosísimos y desastrosos kilómetros diarios ininterrumpidamente.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El inmensurable, garrafal y trágico error catastrófico interestelar provocado cruel y sorpresivamente por la despiadada ignorancia circunstancial del gran poder brutal que tiene verdaderamente la dilatación temporal asimétrica, que en un aburrido e insignificante satélite técnico mundano de rutinarias comunicaciones civiles del sistema GPS humano es una muy simple pérdida electrónica de apenas unos sutilísimos e inofensivos microsegundos recuperables en el espacio, es multiplicado infinitamente y exponencialmente elevado en el terrorífico e implacable Planeta Miller acuático que exploran, el cual les costará y robará irremediablemente décadas irrepetibles de todas sus propias y valiosas vidas humanas condenadas por el tiempo estelar.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Muchos de los muy cautelosos e increíbles creadores visionarios ingenieros y valientes desarrolladores técnicos pioneros de la naciente Fuerza Aérea que laboraban arduamente y construían obstinadamente todo el grandioso, secreto y vanguardista sistema moderno GPS hace décadas desconfiaban honestamente, profusamente y sin descanso de que los locos y raros cálculos abstractos sobre la relatividad fueran ciertos verdaderamente; para asegurarse meticulosamente sin perder nada, añadieron un curioso, misterioso y cauteloso simple interruptor físico oculto y apagado de fábrica para poder "encender artificialmente a voluntad y forzadamente a Einstein" si de pronto realmente resultaban errados y perdían la gran apuesta cósmica intergaláctica milenaria sobre nuestro caprichoso paso por la eternidad y su velocidad variable oculta.' },
    ],
    fact: 'El eminente físico, dedicado y acucioso Neil Ashby invirtió obstinada y afanosamente años enterísimos estudiando afanosamente, detalladamente y con paciencia admirable la manera en que los colosales e imperceptibles efectos invisibles ocultos y sumamente caprichosos de ambas y muy diferentes formas intergalácticas de la caprichosa Relatividad y su dilatación conjunta influían e impactaban irremediablemente de frente sobre el grandísimo sistema GPS, logrando publicar un magistral y venerado documento definitivo de oro en el crucial año astronómico del 2003, salvando eternamente con sus increíbles correcciones el gran sistema que nos guía dócilmente, ciegamente y calladamente desde los fríos confines lejanos del negro cosmos universal al conducir cada rutinario día.',
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
    fact: 'Si replicaras exactamente el viaje de Cooper — incluyendo la estancia en Miller y la inmersión en Gargantúa — la dilatación temporal acumulada sería de aproximadamente 80 años terrestres. Cooper envejecería quizás 2-3 años biológicos mientras la Tierra avanzaba casi un siglo. Este cálculo es consistente con las ecuaciones de la relatividad general para un agujero negro Kerr rotando al 99.8% de la velocidad de la luz.',
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

// ─── Gargantua Video Background ─────────────────────────────────────────────
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

// ─── Interstellar Header ──────────────────────────────────────────────────────
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">DILATACIÓN TEMPORAL</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(79,195,247,0.2)'}`,
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

// ─── Expandable Section ────────────────────────────────
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
                  background: node.color, color: '#0a0c1e',
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
            <h4 style={{
              margin: '0 0 1rem', fontSize: '1.1rem', color: node.color,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <Star size={18} /> Profundiza tu Conocimiento
            </h4>
            <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: '1fr 1fr' }}>
              {node.expandables.map((exp, i) => (
                <ExpandableSection key={i} item={exp} color={node.color} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Fast Fact ─── */}
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

// ─── Main Infographic Component ──────────────────────────────────────────────
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

        {/* ─── Node Navigation ─── */}
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

        {/* ─── Dynamic Content Area ─── */}
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

        {/* ─── Bibliography Footer ─── */}
        <div style={{
          marginTop: '4rem',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '16px',
        }}>
          <h4 style={{ margin: '0 0 1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Fuentes y Bibliografía
          </h4>
          <ul style={{
            margin: 0, padding: '0 0 0 1.2rem',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.8rem',
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
