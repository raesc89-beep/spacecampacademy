'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Radioactivity themed) ────────────────────────────
function DecoRadiationSymbol({ size = 70, color = '#4CAF50', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.6" />
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Trefoil blades */}
      <path d="M30 5 A25 25 0 0 1 51.65 42.5 L30 30 Z" fill={color} opacity="0.25" />
      <path d="M51.65 42.5 A25 25 0 0 1 8.35 42.5 L30 30 Z" fill={color} opacity="0.25" />
      <path d="M8.35 42.5 A25 25 0 0 1 30 5 L30 30 Z" fill={color} opacity="0.25" />
    </svg>
  );
}

function DecoAtomSvg({ size = 60, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.5" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="22" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      <circle cx="52" cy="30" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="19" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="41" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoTestTube({ size = 70, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Test tube body */}
      <rect x="22" y="8" width="16" height="36" rx="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Liquid inside */}
      <rect x="24" y="28" width="12" height="14" rx="6" fill={color} opacity="0.2" />
      {/* Rim */}
      <line x1="20" y1="8" x2="40" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Bubbles */}
      <circle cx="28" cy="32" r="1.5" fill={color} opacity="0.4" />
      <circle cx="32" cy="28" r="1" fill={color} opacity="0.3" />
      <circle cx="30" cy="24" r="1.5" fill={color} opacity="0.35" />
      {/* Glow rays */}
      <line x1="30" y1="48" x2="30" y2="55" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="22" y1="46" x2="17" y2="52" stroke={color} strokeWidth="1" opacity="0.25" />
      <line x1="38" y1="46" x2="43" y2="52" stroke={color} strokeWidth="1" opacity="0.25" />
    </svg>
  );
}

function DecoCrystal({ size = 60, color = '#7B1FA2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Crystal shape */}
      <polygon points="30,5 45,20 40,50 20,50 15,20" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <polygon points="30,5 45,20 40,50 20,50 15,20" fill={color} opacity="0.08" />
      {/* Facets */}
      <line x1="30" y1="5" x2="30" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Sparkle */}
      <circle cx="30" cy="20" r="2" fill={color} opacity="0.5" />
      <line x1="26" y1="20" x2="34" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="16" x2="30" y2="24" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoElectrometer({ size = 70, color = '#81C784', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Box body */}
      <rect x="12" y="18" width="36" height="30" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Dial arc */}
      <path d="M20 35 Q30 15 40 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Needle */}
      <line x1="30" y1="38" x2="22" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="30" cy="38" r="2" fill={color} opacity="0.5" />
      {/* Scale marks */}
      {[0, 15, 30, 45, 60, 75, 90].map((a, i) => {
        const rad = ((a + 225) * Math.PI) / 180;
        const r1 = 14, r2 = 16;
        return <line key={i} x1={30 + r1 * Math.cos(rad)} y1={35 + r1 * Math.sin(rad)} x2={30 + r2 * Math.cos(rad)} y2={35 + r2 * Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.4" />;
      })}
      {/* Antenna */}
      <line x1="30" y1="18" x2="30" y2="8" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="30" cy="7" r="2" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoMedal({ size = 60, color = '#8E24AA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ribbon */}
      <path d="M22 5 L22 22 L30 18 L38 22 L38 5" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      {/* Medal circle */}
      <circle cx="30" cy="35" r="16" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="35" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Star in center */}
      <polygon points="30,24 32,31 39,31 33,36 35,43 30,38 25,43 27,36 21,31 28,31" fill={color} opacity="0.3" />
      {/* Rays */}
      <line x1="30" y1="17" x2="30" y2="14" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="44" y1="35" x2="48" y2="35" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="16" y1="35" x2="12" y2="35" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'becquerel-rayos-uranicos': [DecoRadiationSymbol, DecoAtomSvg, DecoElectrometer],
  'eleccion-tema-tesis': [DecoElectrometer, DecoTestTube, DecoAtomSvg],
  'polonio-por-polonia': [DecoTestTube, DecoCrystal, DecoRadiationSymbol],
  'radio-elemento-brilla': [DecoCrystal, DecoRadiationSymbol, DecoTestTube],
  'cobertizo-rue-lhomond': [DecoTestTube, DecoElectrometer, DecoCrystal],
  'nobel-fisica-1903': [DecoMedal, DecoAtomSvg, DecoRadiationSymbol],
  'ciencia-radiactividad': [DecoAtomSvg, DecoRadiationSymbol, DecoElectrometer],
};

// ─── Content Data ──────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Quinn, S. (1995). Marie Curie: A Life. Simon & Schuster',
  'Curie, E. (1937). Madame Curie: A Biography. Doubleday',
  'Redniss, L. (2010). Radioactive: Marie & Pierre Curie, A Tale of Love and Fallout. It Books/HarperCollins',
  'Pasachoff, N. (1996). Marie Curie and the Science of Radioactivity. Oxford University Press',
  'Curie, M. (1903). Recherches sur les substances radioactives. Thèse de Doctorat, Faculté des Sciences de Paris',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'becquerel-rayos-uranicos',
    title: 'Becquerel y los Rayos Uránicos',
    color: '#4CAF50',
    btnImage: '/assets/marie_curie/infographic_m2/btn_becquerel-rayos-uranicos.jpg',
    image: '/assets/marie_curie/infographic_m2/hero_becquerel-rayos-uranicos.jpg',
    content: [
      'El 1 de marzo de 1896, el físico francés Henri Becquerel descubrió por accidente un fenómeno que nadie podía explicar. Becquerel investigaba si las sustancias fosforescentes emitían rayos X, los cuales Wilhelm Röntgen había descubierto apenas tres meses antes, en noviembre de 1895. Para su experimento, Becquerel envolvió una placa fotográfica en papel negro opaco y colocó encima un cristal de sulfato doble de uranio y potasio, una sal de uranio que brilla al exponerse a la luz solar. Su hipótesis era que la luz del sol activaría la fosforescencia del cristal, y que esa fosforescencia produciría rayos X capaces de atravesar el papel y marcar la placa.',
      'El cielo nublado de París interrumpió el experimento. Sin sol para activar la fosforescencia, Becquerel guardó la placa fotográfica envuelta con el cristal de uranio encima en un cajón oscuro durante varios días. El 1 de marzo, decidió revelar la placa de todos modos, esperando encontrar una imagen muy débil o nada. Para su sorpresa total, la placa mostraba una silueta nítida y oscura del cristal de uranio. Los rayos habían atravesado el papel negro sin necesidad de luz solar ni fosforescencia. El uranio emitía rayos por sí mismo, de forma espontánea y continua, sin ninguna fuente externa de energía.',
      'Becquerel presentó sus resultados a la Academia de Ciencias de Francia el 2 de marzo de 1896 y continuó experimentando durante las semanas siguientes. Demostró que la radiación no dependía de la fosforescencia, ya que compuestos de uranio no fosforescentes también la producían. Probó con uranio metálico puro y obtuvo el mismo resultado. Los rayos ionizaban el aire, es decir, lo hacían conductor de electricidad, y velaban las placas fotográficas de manera consistente. Becquerel llamó a este fenómeno «rayos uránicos», creyendo que era una propiedad exclusiva del uranio.',
      'La comunidad científica recibió el descubrimiento con interés moderado. La mayoría de los físicos estaban concentrados en estudiar los rayos X de Röntgen, que tenían aplicaciones médicas obvias e inmediatas. Los «rayos uránicos» de Becquerel parecían una curiosidad menor, un fenómeno sin aplicación práctica aparente. Entre 1896 y 1897, muy pocos investigadores dedicaron tiempo a estudiar estos rayos misteriosos. Sin embargo, había una científica joven en París que vio en este fenómeno no una curiosidad, sino una puerta a un territorio completamente desconocido de la física.',
      'El descubrimiento de Becquerel planteaba preguntas que la física del siglo XIX no podía responder. ¿De dónde obtenía el uranio la energía para emitir esos rayos de forma continua e inagotable? La ley de conservación de la energía, formulada por Hermann von Helmholtz en 1847, establecía que la energía no se crea ni se destruye. Si el uranio emitía energía constantemente sin recibirla de ninguna fuente externa, algo dentro del átomo debía ser responsable. Pero los átomos se consideraban partículas indivisibles desde que John Dalton propuso su teoría atómica en 1803. El fenómeno descubierto por Becquerel estaba a punto de derrumbar esa idea para siempre.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Henri Becquerel pertenecía a una familia de físicos distinguidos. Su abuelo Antoine César Becquerel y su padre Alexandre-Edmond Becquerel también fueron físicos que estudiaron la fosforescencia y la luminiscencia. Los tres ocuparon la misma cátedra de física en el Museo Nacional de Historia Natural de París, una tradición familiar de investigación científica que abarcó tres generaciones consecutivas durante todo el siglo XIX.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El sulfato doble de uranio y potasio que Becquerel utilizó tiene la fórmula química K₂(UO₂)(SO₄)₂·2H₂O. La radiación que emitía provenía principalmente de la desintegración alfa del uranio-238, que tiene un período de semidesintegración de 4.468 millones de años. Esto significa que una muestra de uranio-238 tarda 4.468 millones de años en reducir su radiactividad a la mitad, un tiempo similar a la edad de la Tierra.' },
    ],
    fact: 'Becquerel llevaba frecuentemente un tubo de ensayo con sales de radio en el bolsillo del chaleco para hacer demostraciones. El 3 de abril de 1901, presentó ante la Sociedad de Física de Francia una quemadura en forma de óvalo que las sales le habían producido en la piel del abdomen a través de la tela del chaleco. La quemadura tardó varias semanas en curarse. Este fue uno de los primeros casos documentados de daño biológico causado por la exposición a materiales radiactivos.',
  },
  {
    id: 'eleccion-tema-tesis',
    title: 'La Elección del Tema de Tesis',
    color: '#6A1B9A',
    btnImage: '/assets/marie_curie/infographic_m2/btn_eleccion-tema-tesis.jpg',
    image: '/assets/marie_curie/infographic_m2/hero_eleccion-tema-tesis.jpg',
    content: [
      'En el otoño de 1897, Marie Curie buscaba un tema para su tesis doctoral en la Sorbona de París. Tenía 30 años, una licenciatura en Física obtenida como primera de su promoción en 1893, y otra en Matemáticas de 1894. Acababa de dar a luz a su hija Irène el 12 de septiembre de 1897, y necesitaba un tema de investigación original y relevante. Pierre Curie, su esposo, le sugirió investigar los misteriosos «rayos uránicos» descubiertos por Henri Becquerel un año antes. Era un campo casi virgen, con menos de diez publicaciones en total, lo cual era una ventaja para una tesis doctoral.',
      'La elección fue estratégica y valiente al mismo tiempo. Mientras la mayoría de los científicos se volcaban en los rayos X de Röntgen, que prometían aplicaciones médicas inmediatas y visibilidad profesional, Marie eligió un campo marginal que la mayoría consideraba una curiosidad menor. Pero Marie vio lo que otros no veían: los rayos de Becquerel planteaban una pregunta profunda sobre la naturaleza del átomo. ¿De dónde salía esa energía? ¿Por qué el uranio la emitía de forma espontánea? Nadie había abordado estas preguntas de manera sistemática y cuantitativa.',
      'Para medir los rayos de Becquerel con precisión, Marie utilizó un electrómetro piezoeléctrico inventado por Pierre Curie y su hermano Jacques Curie en 1880. Este instrumento aprovechaba el efecto piezoeléctrico descubierto por los hermanos Curie: ciertos cristales, como el cuarzo, generan una corriente eléctrica cuando se les aplica presión mecánica. El electrómetro podía medir corrientes eléctricas de apenas 10⁻¹¹ amperios, una sensibilidad sin precedentes. Marie conectó el electrómetro a una cámara de ionización donde colocaba sus muestras, midiendo la corriente eléctrica producida por los rayos al ionizar el aire circundante.',
      'El método de Marie fue radicalmente diferente al de Becquerel, quien usaba placas fotográficas. Las placas eran cualitativas, mostraban si había radiación o no, pero no permitían mediciones precisas. El electrómetro de Marie proporcionaba datos cuantitativos exactos: la intensidad de la radiación expresada en amperios. Esto transformó la investigación de los rayos uránicos de una observación cualitativa a una ciencia de medición precisa. Marie podía comparar numéricamente la radiación de diferentes sustancias, diferentes compuestos y diferentes elementos, abriendo la puerta a descubrimientos que las placas fotográficas jamás habrían revelado.',
      'Marie comenzó su trabajo en un pequeño almacén húmedo de la Escuela Municipal de Física y Química Industrial de París, donde Pierre era profesor. El espacio medía apenas unos pocos metros cuadrados, tenía el suelo de asfalto y la temperatura variaba entre los 6°C en invierno y más de 35°C en verano. Las condiciones eran difíciles, pero Marie necesitaba un lugar donde las vibraciones mecánicas fueran mínimas para no alterar las mediciones del sensible electrómetro. Allí, rodeada de instrumentos prestados y con un presupuesto casi inexistente, Marie Curie comenzó el trabajo que cambiaría la física para siempre.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El electrómetro piezoeléctrico de los hermanos Curie era tan sensible que Marie debía esperar a que los tranvías dejaran de pasar por la calle para tomar sus mediciones, ya que las vibraciones del tráfico afectaban las lecturas. Pierre diseñó una balanza de cuarzo piezoeléctrico que funcionaba como contrapeso eléctrico: Marie equilibraba la corriente producida por la muestra radiactiva con la corriente generada al aplicar pesos conocidos sobre el cristal de cuarzo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La decisión de Marie de medir la radiación por su efecto ionizante fue clave. La radiación ioniza el aire al arrancar electrones de las moléculas de nitrógeno y oxígeno, creando iones con carga eléctrica. Al aplicar un voltaje entre dos placas metálicas en la cámara de ionización, los iones se mueven y generan una corriente eléctrica proporcional a la intensidad de la radiación. Este principio de medición sigue utilizándose hoy en los contadores Geiger modernos.' },
    ],
    fact: 'Marie Curie fue la primera persona en la historia en obtener un doctorado en Física en Francia. Su comité examinador, compuesto por los profesores Gabriel Lippmann (futuro Premio Nobel), Edmond Bouty y Henri Moissan (futuro Premio Nobel), declaró que su tesis constituía «la mayor contribución científica jamás realizada en una tesis doctoral». La defensa tuvo lugar el 25 de junio de 1903 en la Sorbona, con Pierre Curie, Henri Becquerel y Paul Langevin entre el público asistente.',
  },
  {
    id: 'polonio-por-polonia',
    title: 'Polonio: Por Polonia',
    color: '#66BB6A',
    btnImage: '/assets/marie_curie/infographic_m2/btn_polonio-por-polonia.jpg',
    image: '/assets/marie_curie/infographic_m2/hero_polonio-por-polonia.jpg',
    content: [
      'En febrero de 1898, Marie Curie hizo un descubrimiento que encendió la chispa de una revolución científica. Al medir sistemáticamente la radiactividad de todos los compuestos de uranio disponibles, encontró que la pechblenda (uraninita), el mineral del cual se extrae el uranio, era entre tres y cuatro veces más radiactiva que el uranio puro que contenía. Esto contradecía toda lógica: si la radiactividad provenía del uranio, el mineral debería ser menos radiactivo que el elemento puro, no más. La conclusión de Marie fue directa y audaz: la pechblenda debía contener un elemento químico desconocido, más radiactivo que el uranio.',
      'Pierre Curie, convencido por los datos de su esposa, abandonó sus propias investigaciones sobre cristales y simetría para unirse a ella en la búsqueda del elemento misterioso. Juntos desarrollaron un método de separación química guiado por la radiactividad: dividían la pechblenda en fracciones químicas usando ácidos y precipitaciones, y medían la radiactividad de cada fracción con el electrómetro. Las fracciones más radiactivas indicaban la presencia del elemento desconocido. Era un procedimiento de rastreo químico que usaba la radiactividad como brújula, algo que nadie había hecho antes en la historia de la química.',
      'El rastreo condujo a Marie y Pierre hacia las fracciones que contenían bismuto. Al separar progresivamente el bismuto de los demás componentes, la radiactividad de esas fracciones aumentaba en lugar de disminuir. El elemento desconocido se comportaba químicamente de forma similar al bismuto, precipitando con él en sulfuros, pero su radiactividad era cientos de veces mayor. Marie sometió las fracciones a ciclos repetidos de precipitación y disolución, concentrando el elemento misterioso paso a paso hasta obtener una fracción cuya radiactividad era 400 veces superior a la del uranio puro.',
      'El 18 de julio de 1898, Marie y Pierre Curie presentaron una comunicación ante la Academia de Ciencias de Francia, leída por su colega Gabriel Lippmann, anunciando la probable existencia de un nuevo elemento químico en la pechblenda. Marie decidió llamarlo «Polonio», en honor a su tierra natal, Polonia, que en 1898 no existía como país independiente. El territorio polaco estaba dividido entre los imperios ruso, prusiano y austrohúngaro desde las particiones de 1772, 1793 y 1795. Al dar el nombre de su nación oprimida a un elemento de la tabla periódica, Marie realizó un acto de patriotismo que resonó en toda Europa.',
      'El artículo de julio de 1898 fue cuidadoso en su lenguaje. Marie y Pierre escribieron: «Creemos que la sustancia que hemos extraído de la pechblenda contiene un metal no descrito hasta ahora, cercano al bismuto por sus propiedades analíticas. Si la existencia de este nuevo metal se confirma, proponemos llamarlo Polonio, por el nombre del país de origen de una de nosotras». El Polonio (Po, número atómico 84) es un elemento extremadamente raro en la naturaleza: se estima que existen apenas 100 microgramos de polonio-210 en toda la corteza terrestre. Su período de semidesintegración es de solo 138.4 días, lo que explica su escasez natural.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La mención de Polonia en el artículo científico fue un acto de protesta política calculado. En 1898, la palabra «Polonia» estaba prohibida en documentos oficiales del Imperio Ruso, que controlaba Varsovia y la mayor parte del territorio polaco. Al insertar el nombre de su país en una publicación de la Academia de Ciencias de Francia, Marie usó la ciencia como tribuna política. El artículo fue discutido en periódicos de toda Europa, difundiendo la causa polaca en círculos intelectuales.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El polonio-210 es un emisor alfa puro, lo que significa que emite partículas alfa (núcleos de helio-4) durante su desintegración radiactiva. Cada partícula alfa tiene una energía de 5.3 MeV. Aunque las partículas alfa no pueden atravesar una hoja de papel, cuando el polonio-210 se ingiere o inhala, su radiación alfa destruye las células desde el interior del cuerpo. Un solo microgramo de polonio-210 es letal si se ingiere, lo que lo convierte en una de las sustancias más tóxicas conocidas.' },
    ],
    fact: 'La pechblenda que Marie y Pierre analizaron provenía de las minas de Joachimsthal (hoy Jáchymov), en la región de Bohemia del Imperio Austrohúngaro (actual República Checa). Estas minas habían sido explotadas desde el siglo XVI para extraer plata, y la pechblenda se consideraba un residuo sin valor. Irónicamente, el mineral «inútil» que los mineros descartaban contenía dos elementos nuevos — el polonio y el radio — que transformarían la medicina y la física del siglo XX.',
  },
  {
    id: 'radio-elemento-brilla',
    title: 'Radio: El Elemento que Brilla',
    color: '#7B1FA2',
    btnImage: '/assets/marie_curie/infographic_m2/btn_radio-elemento-brilla.jpg',
    image: '/assets/marie_curie/infographic_m2/hero_radio-elemento-brilla.jpg',
    content: [
      'Después de anunciar el polonio en julio de 1898, Marie y Pierre descubrieron que la pechblenda guardaba otro secreto. Incluso tras extraer el polonio, las fracciones que contenían bario seguían mostrando una radiactividad anormalmente alta. Algo más se escondía allí, un segundo elemento desconocido, esta vez mezclado con el bario en lugar del bismuto. Marie repitió su método de rastreo radiactivo: separaciones químicas sucesivas, mediciones con el electrómetro, concentraciones progresivas. Con la ayuda del químico Gustave Bémont, los Curie lograron aislar una fracción de cloruro de bario cuya radiactividad era 900 veces superior a la del uranio.',
      'El 26 de diciembre de 1898, Marie y Pierre Curie, junto con Gustave Bémont, presentaron ante la Academia de Ciencias de Francia la comunicación titulada «Sur une nouvelle substance fortement radio-active contenue dans la pechblende». En ella anunciaban la existencia de un segundo elemento nuevo al que llamaron «Radio», del latín «radius» (rayo), porque la sustancia emitía una luminiscencia azulada visible en la oscuridad. En esa misma comunicación, Marie introdujo formalmente el término «radio-actif» para describir los elementos que emitían radiación espontánea.',
      'Pero anunciar la existencia del radio no bastaba. La comunidad científica exigía pruebas irrefutables: aislar el elemento en forma pura y determinar su peso atómico. Esta tarea requería procesar cantidades enormes de pechblenda para obtener cantidades microscópicas de radio, ya que el elemento representaba apenas una parte por cada diez millones en el mineral. El gobierno austríaco, propietario de las minas de Joachimsthal, donó a los Curie una tonelada de residuos de pechblenda, el material sobrante después de extraer el uranio usado en la industria del vidrio y la cerámica.',
      'El proceso de purificación fue un trabajo de cuatro años que combinó la fuerza física con la precisión química. Marie procesó un total de ocho toneladas de residuos de pechblenda entre 1898 y 1902. La extracción requería disolver el mineral en ácido clorhídrico y ácido sulfúrico hirviente, filtrar los residuos, precipitar las diferentes fracciones químicas y, finalmente, separar el radio del bario mediante cristalización fraccionada. El cloruro de radio cristaliza de forma ligeramente diferente al cloruro de bario, permitiendo una separación gradual a lo largo de miles de ciclos de cristalización sucesivos.',
      'En 1902, después de procesar toneladas de mineral, Marie logró aislar 0.1 gramos de cloruro de radio puro. Determinó su peso atómico en 225.93 (el valor aceptado hoy es 226.03). Con esta evidencia, la existencia del radio quedó demostrada de forma definitiva. El radio resultó ser aproximadamente un millón de veces más radiactivo que la misma masa de uranio. Su capacidad de emitir luz propia en la oscuridad, calentar el aire circundante, decolorar el vidrio y producir quemaduras en la piel lo convirtió en el elemento más estudiado y discutido de principios del siglo XX.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marie escribió en sus memorias que algunas noches ella y Pierre regresaban al laboratorio solo para contemplar los frascos que brillaban en la oscuridad con una luz azulada fantasmagórica. «Nuestros preciosos productos, para los cuales no teníamos refugio, estaban depositados sobre mesas y estantes. De todos lados podíamos ver sus siluetas luminosas, y el espectáculo era un encanto renovado para nosotros cada vez», escribió Marie en su biografía de Pierre Curie publicada en 1923.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El radio-226 tiene un período de semidesintegración de 1600 años. Al desintegrarse, emite una partícula alfa y se transforma en radón-222, un gas noble radiactivo. El radón-222 tiene un período de semidesintegración de solo 3.82 días y se desintegra a su vez en una cadena de elementos radiactivos. La luminiscencia azul del radio no proviene directamente de la desintegración nuclear, sino de la ionización del nitrógeno atmosférico por las partículas alfa y los rayos beta que emite durante su cadena de desintegración.' },
    ],
    fact: 'Pierre Curie demostró los efectos biológicos del radio con un autoexperimento registrado el 13 de abril de 1901. Se ató un pequeño recipiente con sales de radio al antebrazo durante diez horas. La piel se enrojeció al día siguiente, formó una ampolla a los pocos días y desarrolló una llaga que tardó 52 días en curarse, dejando una cicatriz grisácea permanente. Pierre comunicó estos resultados junto con Becquerel, abriendo el camino a la radioterapia cuando los médicos propusieron usar el radio para destruir células tumorales.',
  },
  {
    id: 'cobertizo-rue-lhomond',
    title: 'El Cobertizo de la Rue Lhomond',
    color: '#81C784',
    btnImage: '/assets/marie_curie/infographic_m2/btn_cobertizo-rue-lhomond.jpg',
    image: '/assets/marie_curie/infographic_m2/hero_cobertizo-rue-lhomond.jpg',
    content: [
      'El laboratorio donde Marie y Pierre Curie realizaron sus descubrimientos más importantes era un antiguo cobertizo de disección de la Facultad de Medicina de la Sorbona, ubicado en el número 42 de la Rue Lhomond, en el Barrio Latino de París. El edificio había sido abandonado por la Facultad de Medicina porque se consideraba inadecuado incluso para almacenar cadáveres. Tenía el techo de cristal agrietado que dejaba pasar la lluvia, el suelo era de asfalto irregular, y no disponía de campanas extractoras de gases ni de ventilación apropiada. El químico alemán Wilhelm Ostwald, que visitó el laboratorio en 1903, lo describió como «un cruce entre un establo y un depósito de patatas».',
      'Las condiciones térmicas del cobertizo eran extremas. En invierno, la temperatura interior descendía a 6°C, y Marie registró en su cuaderno de laboratorio temperaturas de apenas 4°C en los días más fríos. El único sistema de calefacción era una vieja estufa de hierro fundido cuyo tiro funcionaba mal y llenaba la habitación de humo. En verano, el techo de cristal convertía el cobertizo en un invernadero donde la temperatura superaba los 35°C. Marie trabajaba rodeada de ácidos hirvientes en cubas de hierro abiertas, sin protección contra los vapores corrosivos de ácido clorhídrico y ácido sulfúrico que le irritaban los ojos y las vías respiratorias.',
      'El trabajo físico era agotador. Marie cargaba sacos de pechblenda de 20 kilogramos, los trituraba en un mortero industrial, los disolvía en enormes cubas de hierro fundido con ácidos, y revolvía la mezcla durante horas con una barra de hierro que medía casi tanto como ella. En su cuaderno, Marie escribió: «A veces pasaba todo el día removiendo una masa hirviente con una barra de hierro casi tan grande como yo. Al final del día estaba muerta de cansancio». El proceso generaba cantidades significativas de gases tóxicos, incluyendo vapores de ácido sulfhídrico (con olor a huevos podridos) y cloruro de hidrógeno.',
      'A pesar de estas condiciones, Marie expresó en varias ocasiones un cariño singular por aquel cobertizo miserable. En su autobiografía, escribió: «Fue en este miserable cobertizo viejo donde transcurrieron los mejores y más felices años de nuestra vida, dedicados enteramente al trabajo». La pasión científica de Marie y Pierre transformaba la incomodidad en determinación. Trabajaban juntos desde las ocho de la mañana hasta las diez de la noche, interrumpidos solo por comidas frugales que a veces olvidaban tomar. Su suegro, el Dr. Eugène Curie, cuidaba a la pequeña Irène durante las largas jornadas de laboratorio.',
      'La exposición continua a materiales radiactivos sin ninguna protección tuvo consecuencias graves para la salud de ambos científicos. Marie desarrolló quemaduras crónicas en las manos por manipular sustancias radiactivas, y sus dedos estaban permanentemente agrietados y doloridos. Pierre sufría dolores óseos intensos y fatiga extrema que él atribuía al reumatismo. Los cuadernos de laboratorio de Marie, conservados hoy en la Biblioteca Nacional de Francia en París, siguen siendo radiactivos más de 120 años después y se guardan en cajas de plomo. Cualquier investigador que desee consultarlos debe firmar un descargo de responsabilidad y usar equipo de protección.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cobertizo de la Rue Lhomond fue demolido en la década de 1930 durante una renovación del campus. Hoy, una placa conmemorativa en el Instituto Curie de París marca el lugar donde Marie y Pierre trabajaron. La ironía es que uno de los peores laboratorios de la historia de la ciencia produjo dos de los descubrimientos más transformadores del siglo XX: el polonio y el radio. El lugar donde se hizo grande ciencia no tenía ni agua corriente ni suelo nivelado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los cuadernos de Marie Curie emiten una radiación de aproximadamente 0.5 milisieverts por hora debido a la contaminación con radio-226 y sus productos de desintegración. Para contextualizar, la dosis natural de radiación que recibe una persona promedio es de unos 2.4 milisieverts al año. Una hora sosteniendo los cuadernos de Marie equivale a más de un mes de radiación natural. Los cuadernos se conservan en la Biblioteca Nacional de Francia en cajas forradas con hojas de plomo de 2 milímetros de espesor.' },
    ],
    fact: 'Marie Curie procesó un total de aproximadamente ocho toneladas de residuos de pechblenda durante los cuatro años de trabajo en el cobertizo. Los residuos llegaban en sacos desde las minas de Joachimsthal en tren, y Marie los recibía personalmente en la estación. Cada tonelada de pechblenda contenía apenas una diezmilésima de gramo de radio. Para obtener 0.1 gramos de cloruro de radio puro, Marie realizó más de 6.000 cristalizaciones fraccionadas, un procedimiento que requería paciencia extrema y precisión química que pocos científicos de su época habrían tolerado.',
  },
  {
    id: 'nobel-fisica-1903',
    title: 'Nobel de Física 1903',
    color: '#8E24AA',
    btnImage: '/assets/marie_curie/infographic_m2/btn_nobel-fisica-1903.jpg',
    image: '/assets/marie_curie/infographic_m2/hero_nobel-fisica-1903.jpg',
    content: [
      'En junio de 1903, la Academia de Ciencias de Suecia propuso otorgar el Premio Nobel de Física a Henri Becquerel y Pierre Curie por sus trabajos sobre la radiactividad. Marie Curie no estaba incluida en la nominación original. Fue el matemático sueco Gösta Mittag-Leffler quien alertó a Pierre de la situación. Pierre respondió con una carta firme en la que declaró que no aceptaría el premio si Marie no era incluida como co-laureada, ya que el trabajo sobre la radiactividad era fundamentalmente suyo: ella había elegido el tema, diseñado el método de medición, descubierto que la radiactividad era una propiedad atómica y encontrado los dos nuevos elementos.',
      'El comité Nobel revisó su decisión y finalmente incluyó a Marie. El 10 de diciembre de 1903, la Real Academia de Ciencias de Suecia otorgó el Premio Nobel de Física conjuntamente a Henri Becquerel «por su descubrimiento de la radiactividad espontánea» y a Pierre y Marie Curie «en reconocimiento a los servicios que han prestado mediante su investigación conjunta sobre los fenómenos de radiación descubiertos por el profesor Henri Becquerel». Marie Curie se convirtió en la primera mujer en recibir un Premio Nobel en cualquier categoría, un hecho que tuvo repercusión mundial.',
      'Marie y Pierre no asistieron a la ceremonia de entrega en Estocolmo el 10 de diciembre de 1903. Pierre alegó obligaciones docentes y Marie no se encontraba bien de salud. La verdadera razón incluía el agotamiento físico de ambos tras años de trabajo extenuante y la exposición crónica a radiación, que deterioraba su salud de forma progresiva. Pierre sufría dolores articulares intensos y ataques de debilidad que le impedían subir escaleras. Marie padecía anemia, pérdida de peso y quemaduras crónicas en las manos. No dieron su conferencia Nobel hasta junio de 1905.',
      'El premio de 70.000 francos (equivalente a unos 15 años del salario de un profesor) les proporcionó algo de alivio financiero, pero Marie y Pierre donaron parte del dinero a amigos, familiares y estudiantes. Contrataron a un ayudante de laboratorio por primera vez, lo cual demuestra que hasta 1903 habían trabajado sin ningún asistente pagado. Marie utilizó parte del dinero para instalar un baño moderno en su apartamento, un lujo que no habían tenido hasta entonces. A pesar del Nobel, Pierre no obtuvo una cátedra adecuada en la Sorbona hasta 1904, y el laboratorio bien equipado que necesitaban no se materializaría hasta mucho después.',
      'La reacción pública al Nobel reveló los prejuicios de la época. Los periódicos franceses presentaban frecuentemente a Marie como la «ayudante» de Pierre, minimizando su papel central. En una cena oficial, un diplomático le preguntó a Marie: «¿Es difícil ser la esposa de un genio?». Marie respondió con calma: «No lo sé. Pregúntele a mi esposo». La prensa internacional, sin embargo, destacó la novedad de que una mujer recibiera el Nobel. Marie se convirtió en un referente para las mujeres en la ciencia en todo el mundo, aunque ella siempre insistió en que su trabajo debía juzgarse por sus méritos científicos, no por su género.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La exclusión inicial de Marie de la nominación al Nobel no fue un caso aislado. En 1902, Charles Lippmann nominó solo a Pierre y Becquerel. El acta del comité Nobel de 1903 revela que algunos miembros consideraban que Marie «solo» había confirmado los resultados de su esposo. Fue Pierre quien insistió en que Marie era la autora intelectual del concepto de radiactividad como propiedad atómica, la descubridora del polonio y el radio, y que sin ella el campo no existiría como tal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Marie Curie es la única persona en la historia que ha ganado Premios Nobel en dos ciencias diferentes. Recibió el Nobel de Física en 1903 (compartido con Becquerel y Pierre) y el Nobel de Química en 1911 (en solitario) por el aislamiento del radio metálico puro y la determinación de sus propiedades químicas. Solo cuatro personas han ganado dos Premios Nobel: Marie Curie, Linus Pauling (Química 1954 y Paz 1962), John Bardeen (Física 1956 y 1972) y Frederick Sanger (Química 1958 y 1980).' },
    ],
    fact: 'Pierre Curie pronunció la conferencia Nobel en junio de 1905, más de un año después de la ceremonia. En ella hizo una reflexión que resultó profética: «Se puede concebir que en manos criminales el radio podría resultar muy peligroso, y cabe preguntarse si la humanidad se beneficia al conocer los secretos de la naturaleza, si está preparada para sacar provecho de ellos o si este conocimiento no le será perjudicial». Fue una de las primeras advertencias públicas sobre los peligros potenciales de la energía nuclear, formulada 40 años antes de Hiroshima.',
  },
  {
    id: 'ciencia-radiactividad',
    title: 'La Ciencia de la Radiactividad',
    color: '#388E3C',
    btnImage: '/assets/marie_curie/infographic_m2/btn_ciencia-radiactividad.jpg',
    image: '/assets/marie_curie/infographic_m2/hero_ciencia-radiactividad.jpg',
    content: [
      'La radiactividad es el proceso por el cual los núcleos atómicos inestables liberan energía en forma de partículas o radiación electromagnética para alcanzar una configuración más estable. Marie Curie fue la primera persona en proponer que este fenómeno era una propiedad intrínseca del átomo, no una reacción química ni un efecto externo. Su hipótesis, formulada en 1898, significaba que la energía de la radiactividad provenía del interior del átomo, lo cual contradecía la idea dominante de que los átomos eran partículas sólidas e indivisibles. Esta propuesta abrió las puertas a la física nuclear del siglo XX.',
      'Ernest Rutherford y Frederick Soddy, trabajando en la Universidad McGill de Canadá entre 1899 y 1903, identificaron tres tipos de radiación emitida por los elementos radiactivos. Las partículas alfa son núcleos de helio-4 (dos protones y dos neutrones) emitidos a velocidades de aproximadamente 20.000 km/s; tienen gran capacidad de ionización pero baja penetración, ya que pueden detenerse con una hoja de papel o unos centímetros de aire. Las partículas beta son electrones emitidos a velocidades cercanas a la velocidad de la luz; penetran varios milímetros de aluminio pero se detienen con unos centímetros de plomo o madera.',
      'Los rayos gamma, el tercer tipo de radiación, son ondas electromagnéticas de alta energía, similares a los rayos X pero con longitudes de onda aún más cortas. Los rayos gamma no tienen masa ni carga eléctrica y pueden atravesar varios centímetros de plomo. Su poder de penetración los hace útiles en medicina para la esterilización de equipos y en radioterapia para el tratamiento de tumores, pero también los convierte en la forma más peligrosa de radiación para los organismos vivos. Rutherford utilizó letras griegas para nombrar las tres radiaciones en 1899: alfa (α), beta (β) y gamma (γ), nomenclatura que se conserva hasta hoy.',
      'El concepto de período de semidesintegración (o vida media) es central en la ciencia de la radiactividad. Rutherford y Soddy lo definieron en 1903: es el tiempo que tarda la mitad de los átomos radiactivos de una muestra en desintegrarse. Cada elemento radiactivo tiene su propio período de semidesintegración, que va desde fracciones de segundo hasta miles de millones de años. El uranio-238 tiene un período de 4.468 millones de años; el radio-226, de 1.600 años; el polonio-210, de 138 días; y el radón-222, de solo 3.82 días. Este concepto permitió datar la edad de rocas y fósiles mediante la datación radiométrica.',
      'El legado científico de Marie Curie va más allá de sus descubrimientos directos. Su trabajo demostró que el átomo no era indivisible, abriendo la puerta a investigaciones que condujeron al descubrimiento del neutrón por James Chadwick en 1932, la fisión nuclear por Otto Hahn y Lise Meitner en 1938, y el desarrollo de la energía nuclear. En medicina, la radioterapia basada en los principios que Marie y Pierre estudiaron ha salvado millones de vidas en el tratamiento del cáncer. La unidad de medida de la radiactividad se llamó «curie» (Ci) en honor a Marie y Pierre: un curie equivale a 37.000 millones de desintegraciones nucleares por segundo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Irène Joliot-Curie, la hija de Marie y Pierre, continuó el legado familiar. Junto con su esposo Frédéric Joliot, descubrieron la radiactividad artificial en 1934: la capacidad de crear elementos radiactivos bombardeando elementos estables con partículas alfa. Recibieron el Premio Nobel de Química en 1935 por este descubrimiento. Los Curie-Joliot son la familia con más Premios Nobel de la historia, con un total de cinco premios entre Marie, Pierre, Irène y Frédéric.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La radiactividad tiene aplicaciones que van mucho más allá de la física y la medicina. La datación por carbono-14 (con un período de semidesintegración de 5.730 años) permite determinar la edad de restos orgánicos de hasta 50.000 años de antigüedad. Los detectores de humo domésticos contienen americio-241, un emisor alfa con un período de 432 años. Los marcapasos cardíacos usaban baterías de plutonio-238 hasta la década de 1970. Y las sondas espaciales Voyager 1 y 2, lanzadas en 1977, siguen funcionando gracias a generadores termoeléctricos de plutonio-238.' },
    ],
    fact: 'Marie Curie murió el 4 de julio de 1934 en el sanatorio de Sancellemoz, en Passy, Francia, a los 66 años. La causa de muerte fue anemia aplásica, una enfermedad de la médula ósea causada por la exposición prolongada a radiación ionizante durante décadas de trabajo sin protección. En 1995, los restos de Marie y Pierre Curie fueron trasladados al Panteón de París por orden del presidente François Mitterrand. Marie Curie fue la primera mujer enterrada en el Panteón por méritos propios. Sus restos fueron colocados en un ataúd de plomo debido a la radiactividad residual de su cuerpo.',
  },
];

// ─── Radioactive Particle Field (Canvas Background) ────────────────────────────
function RadioactiveField() {
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
      hue: Math.random() > 0.5 ? '76,175,80' : '106,27,154', // green or violet
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

// ─── Radioactivity Header ──────────────────────────────────────────────────────
function RadioactivityHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(76,175,80,0.3))' }}>
        {/* Arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#radGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4CAF50','#6A1B9A','#66BB6A','#7B1FA2','#81C784','#8E24AA','#388E3C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central radiation icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#4CAF50" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="5" fill="#4CAF50" opacity="0.4" />
        <circle cx="300" cy="30" r="2" fill="#4CAF50" opacity="0.7" />
        <defs>
          <linearGradient id="radGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(76,175,80,0.9)" />
            <stop offset="100%" stopColor="rgba(106,27,154,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">RADIACTIVIDAD</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL DESCUBRIMIENTO QUE CAMBIÓ LA CIENCIA</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ───────────────────────────────
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
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
          layoutId="activeDotCurieM2"
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

// ─── Expandable Section with Random Direction ──────────────────────────────────
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

// ─── Magazine-Style Content Panel ──────────────────────────────────────────────
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em',
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
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

        {/* Video Player */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase',
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

// ─── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(76,175,80,0.15)',
    }}>
      <Star size={14} style={{ color: '#4CAF50', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4CAF50, #6A1B9A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(76,175,80,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#4CAF50', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ────────────────────────────────────────────────
export default function InteractiveInfographic_CurieM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/curie/infographic_radiactividad/bg_radiactividad.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(76,175,80,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <RadioactiveField />

      <RadioactivityHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(76,175,80,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(76,175,80,0.08)', borderRadius: '16px',
              border: '1px solid rgba(76,175,80,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#4CAF50', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de la Radiactividad!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Descubridor Nuclear
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
