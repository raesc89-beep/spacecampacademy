'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Space Station / Living in Space themed) ────────
function DecoSpaceStation({ size = 70, color = '#C44B4B', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Main truss */}
      <line x1="5" y1="30" x2="55" y2="30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Central module */}
      <rect x="22" y="22" width="16" height="16" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.4" />
      {/* Solar panels */}
      <rect x="2" y="20" width="12" height="8" rx="1" fill={color} opacity="0.3" />
      <rect x="2" y="32" width="12" height="8" rx="1" fill={color} opacity="0.3" />
      <rect x="46" y="20" width="12" height="8" rx="1" fill={color} opacity="0.3" />
      <rect x="46" y="32" width="12" height="8" rx="1" fill={color} opacity="0.3" />
      {/* Panel lines */}
      <line x1="8" y1="20" x2="8" y2="28" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="8" y1="32" x2="8" y2="40" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="52" y1="20" x2="52" y2="28" stroke={color} strokeWidth="0.5" opacity="0.4" />
      <line x1="52" y1="32" x2="52" y2="40" stroke={color} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

function DecoFloatingAstronaut({ size = 70, color = '#A8B5C0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Helmet */}
      <circle cx="30" cy="18" r="10" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="18" r="6" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Visor reflection */}
      <path d="M26 15 Q28 13 32 15" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Body */}
      <rect x="22" y="28" width="16" height="18" rx="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Arms floating */}
      <path d="M22 32 Q14 28 10 34" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M38 32 Q46 28 50 34" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Legs */}
      <line x1="26" y1="46" x2="24" y2="55" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <line x1="34" y1="46" x2="36" y2="55" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DecoOrbitalPath({ size = 80, color = '#D45A5A', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Elliptical orbit */}
      <ellipse cx="40" cy="24" rx="35" ry="18" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      {/* Earth */}
      <circle cx="40" cy="24" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M34 20 Q38 18 42 22 Q44 26 40 28" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Satellite dot */}
      <circle cx="72" cy="14" r="2.5" fill={color} opacity="0.6" />
      {/* Speed trail */}
      <path d="M68 12 L72 14 L68 16" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoFoodPouch({ size = 60, color = '#96A3AE', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Pouch body */}
      <rect x="14" y="15" width="32" height="36" rx="4" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Seal at top */}
      <line x1="14" y1="22" x2="46" y2="22" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Label area */}
      <rect x="20" y="28" width="20" height="12" rx="2" fill={color} opacity="0.15" />
      {/* Straw */}
      <line x1="30" y1="8" x2="30" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <circle cx="30" cy="6" r="2" fill={color} opacity="0.4" />
      {/* Floating droplets */}
      <circle cx="48" cy="10" r="1.5" fill={color} opacity="0.4" />
      <circle cx="12" cy="8" r="1" fill={color} opacity="0.3" />
      <circle cx="50" cy="45" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoExerciseBike({ size = 70, color = '#B43A3A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Frame */}
      <line x1="20" y1="45" x2="30" y2="25" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="30" y1="25" x2="42" y2="45" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="30" y1="25" x2="38" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Wheels */}
      <circle cx="20" cy="45" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="42" cy="45" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Pedal */}
      <circle cx="30" cy="40" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Handlebars */}
      <line x1="35" y1="16" x2="42" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      {/* Seat */}
      <line x1="26" y1="22" x2="34" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DecoSleepPod({ size = 60, color = '#8491A0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Pod outline */}
      <rect x="12" y="10" width="36" height="44" rx="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Window */}
      <rect x="18" y="16" width="24" height="14" rx="3" fill={color} opacity="0.12" />
      {/* Sleeping bag straps */}
      <line x1="20" y1="36" x2="40" y2="36" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="40" x2="40" y2="40" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="20" y1="44" x2="40" y2="44" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Z Z Z */}
      <text x="44" y="14" fill={color} fontSize="8" fontWeight="bold" opacity="0.4">z</text>
      <text x="48" y="10" fill={color} fontSize="6" fontWeight="bold" opacity="0.3">z</text>
      <text x="51" y="7" fill={color} fontSize="5" fontWeight="bold" opacity="0.2">z</text>
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'microgravedad': [DecoFloatingAstronaut, DecoOrbitalPath, DecoSpaceStation],
  'estacion-espacial': [DecoSpaceStation, DecoOrbitalPath, DecoFloatingAstronaut],
  'comer-en-el-espacio': [DecoFoodPouch, DecoSpaceStation, DecoFloatingAstronaut],
  'dormir-en-orbita': [DecoSleepPod, DecoSpaceStation, DecoFloatingAstronaut],
  'higiene-espacial': [DecoFloatingAstronaut, DecoFoodPouch, DecoSpaceStation],
  'ejercicio-obligatorio': [DecoExerciseBike, DecoSpaceStation, DecoOrbitalPath],
  'vida-social-orbita': [DecoSpaceStation, DecoFloatingAstronaut, DecoSleepPod],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Hadfield, C. (2013). An Astronaut\'s Guide to Life on Earth, Little, Brown and Company',
  'Kelly, S. (2017). Endurance: A Year in Space, A Lifetime of Discovery, Alfred A. Knopf',
  'Pettit, D. (2012). Diary of a Space Zucchini, NASA Blog / ISS Science Reports',
  'NASA (2023). International Space Station: Facts and Figures, NASA Technical Publication NP-2023-05-022-JSC',
  'Stuster, J. (2010). Behavioral Issues Associated with Long-Duration Space Expeditions, NASA/TM-2010-216130',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'microgravedad',
    title: 'Microgravedad',
    color: '#C44B4B',
    btnImage: '/assets/astrotrain/infographic_m2/btn_microgravedad.jpg',
    image: '/assets/astrotrain/infographic_m2/hero_microgravedad.jpg',
    content: [
      'La microgravedad no significa que la gravedad desaparezca. A la altitud de la Estación Espacial Internacional, aproximadamente 420 kilómetros sobre la superficie terrestre, la gravedad de la Tierra todavía ejerce un 88% de su fuerza habitual. Lo que ocurre es que la estación y todo lo que hay dentro de ella están en caída libre constante alrededor del planeta. La velocidad orbital de 28,000 km/h hace que la estación caiga hacia la Tierra a la misma velocidad a la que la curvatura terrestre se aleja bajo ella, creando una trayectoria circular. Los astronautas flotan porque caen al mismo ritmo que su nave, no porque la gravedad haya desaparecido.',
      'El cuerpo humano reacciona de formas específicas ante la ausencia de peso aparente. Durante las primeras 48 a 72 horas en órbita, entre el 60% y el 80% de los astronautas experimentan el Síndrome de Adaptación Espacial, conocido informalmente como "enfermedad del espacio". El sistema vestibular del oído interno, que en la Tierra utiliza la gravedad como referencia para determinar la orientación del cuerpo, envía señales contradictorias al cerebro. Los otolitos, pequeños cristales de carbonato de calcio en el oído, dejan de detectar la dirección "abajo", lo que genera náuseas, desorientación y malestar durante los primeros días de adaptación.',
      'Antes de llegar al espacio, los astronautas entrenan la tolerancia a la desorientación en el avión KC-135, apodado "Cometa del Vómito". Este avión de carga modificado realiza trayectorias parabólicas que producen entre 20 y 25 segundos de microgravedad real por cada parábola. Durante un vuelo típico se ejecutan entre 30 y 40 parábolas consecutivas. Los tripulantes alternan entre momentos de ingravidez y momentos de hipergravedad de hasta 1.8 G, lo que permite al cerebro comenzar a recalibrar su interpretación de las señales sensoriales antes de la misión orbital.',
      'La microgravedad causa redistribución de los fluidos corporales. Sin la fuerza gravitatoria que normalmente empuja la sangre y otros líquidos hacia las extremidades inferiores, estos se desplazan hacia la cabeza y el torso. Los astronautas desarrollan lo que se conoce como "cara de luna y piernas de pollo": el rostro se hincha mientras las piernas adelgazan y pierden volumen. Este desplazamiento de fluidos aumenta la presión intracraneal y puede afectar la visión. El Síndrome Neuro-Ocular Asociado al Vuelo Espacial (SANS) afecta a más del 50% de los astronautas en misiones de larga duración, aplanando el globo ocular y alterando el nervio óptico.',
      'A nivel celular, la microgravedad altera procesos biológicos fundamentales. Los osteoclastos, las células encargadas de descomponer el tejido óseo, se activan más de lo normal, mientras que los osteoblastos, que construyen hueso nuevo, reducen su actividad. El resultado neto es una pérdida ósea de entre el 1% y el 2% por mes en huesos que soportan peso, como la cadera y la columna vertebral. Los músculos antigravitatorios, aquellos que en la Tierra trabajan constantemente para mantenernos erguidos, como los cuádriceps y los gemelos, pueden atrofiarse hasta un 20% en misiones de seis meses si no se mantiene un programa de ejercicio estricto.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El astronauta Scott Kelly regresó a la Tierra en marzo de 2016 tras pasar 340 días consecutivos en la ISS. Al aterrizar, era 8.6 milisegundos más joven que su hermano gemelo Mark Kelly, debido a la dilatación temporal relativista. Su cuerpo tardó meses en readaptarse: experimentó dolor articular, piel hipersensible, piernas hinchadas y dificultad para caminar durante las primeras semanas. Los datos médicos comparativos entre ambos gemelos constituyeron el NASA Twins Study, publicado en Science en 2019.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La microgravedad no es gravedad cero. A 420 km de altitud, la aceleración gravitatoria es de 8.67 m/s², comparada con 9.81 m/s² en la superficie. La diferencia entre la gravedad real y la percibida se debe a que la estación cae libremente alrededor de la Tierra a una velocidad orbital de 7.66 km/s. Las vibraciones de los equipos y los movimientos de la tripulación generan micro-perturbaciones de aproximadamente 10⁻⁶ G, por lo que técnicamente se denomina "microgravedad" y no "gravedad cero".' },
    ],
    fact: 'En 2003, el físico italiano Pietro Calogero de la Universidad de Nápoles calculó que un astronauta que pasa 6 meses a bordo de la ISS orbita la Tierra aproximadamente 2,880 veces, recorriendo una distancia total de 121 millones de kilómetros, equivalente a un 80% de la distancia entre la Tierra y el Sol. A pesar de esta distancia recorrida, el astronauta nunca se aleja más de 420 km del punto más cercano de la superficie terrestre.',
  },
  {
    id: 'estacion-espacial',
    title: 'La Estación Espacial Internacional',
    color: '#A8B5C0',
    btnImage: '/assets/astrotrain/infographic_m2/btn_estacion-espacial.jpg',
    image: '/assets/astrotrain/infographic_m2/hero_estacion-espacial.jpg',
    content: [
      'La Estación Espacial Internacional es la estructura más grande que la humanidad ha construido en el espacio. Con una masa de 420 toneladas métricas y un volumen presurizado habitable de 388 metros cúbicos, equivale aproximadamente al espacio interior de un Boeing 747. Mide 109 metros de punta a punta de sus paneles solares, lo que la hace comparable en envergadura a un campo de fútbol. Su construcción comenzó el 20 de noviembre de 1998 con el lanzamiento del módulo ruso Zaryá y requirió más de 40 misiones de ensamblaje durante 13 años. Participan cinco agencias espaciales: NASA, Roscosmos, ESA, JAXA y CSA.',
      'La ISS orbita la Tierra a una altitud promedio de 420 kilómetros, completando una vuelta cada 92 minutos a una velocidad de 27,600 km/h. Esto significa que la tripulación presencia 16 amaneceres y 16 atardeceres cada 24 horas. La estación no es estática en su órbita: pierde altitud gradualmente debido al rozamiento con las capas superiores de la atmósfera y requiere maniobras de reimpulso periódicas, generalmente realizadas por naves de carga Progress o por los propios motores del módulo de servicio Zvezdá, para mantener su altitud operativa.',
      'La estructura se compone de múltiples módulos interconectados. El segmento estadounidense incluye los nodos Unity (Nodo 1, 1998), Harmony (Nodo 2, 2007) y Tranquility (Nodo 3, 2010), junto con el laboratorio Destiny. El segmento ruso comprende los módulos Zaryá, Zvezdá, Rassvet, Poisk y Nauka (añadido en 2021). El laboratorio japonés Kibo, el más grande de la estación, fue instalado entre 2008 y 2009. El laboratorio europeo Columbus opera desde 2008. La cúpula de observación Cupola, instalada en 2010, cuenta con siete ventanas que ofrecen una vista panorámica de 360 grados.',
      'El sistema de energía de la ISS emplea ocho conjuntos de paneles solares que cubren un área total de 2,500 metros cuadrados y generan entre 84 y 120 kilovatios de electricidad. Cuando la estación pasa por la sombra de la Tierra, lo que ocurre durante 36 de cada 92 minutos orbitales, las baterías de ion-litio (que reemplazaron a las originales de níquel-hidrógeno entre 2017 y 2021) suministran energía. El sistema de control térmico utiliza circuitos de amoníaco líquido para distribuir el calor generado por los equipos y la tripulación, disipándolo al espacio a través de radiadores externos.',
      'El sistema de soporte vital ECLSS (Environmental Control and Life Support System) recicla el aire y el agua a bordo. El sistema de generación de oxígeno (OGS) descompone agua en oxígeno e hidrógeno mediante electrólisis. El sistema Sabatier combina el dióxido de carbono exhalado por la tripulación con el hidrógeno producido para generar agua y metano. El resultado es que la ISS recupera aproximadamente el 93% del agua a bordo, incluyendo la humedad del aliento, el sudor y la orina procesada. Este reciclaje permite reducir la cantidad de agua que debe transportarse desde la Tierra de 10,000 litros por persona al año a solo unos 700 litros.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La ISS se puede ver a simple vista desde la Tierra. Aparece como un punto brillante que se desplaza por el cielo nocturno, más luminoso que la mayoría de las estrellas. Su magnitud aparente puede alcanzar -5.9, lo que la convierte en el tercer objeto más brillante del cielo nocturno después de la Luna y Venus. La NASA ofrece el servicio "Spot the Station" que envía alertas por correo electrónico o mensaje de texto indicando cuándo y hacia dónde mirar para observarla.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El costo total de la ISS se estima en más de 150,000 millones de dólares, lo que la convierte en el objeto más costoso jamás construido. Su construcción involucró a más de 100,000 personas en 16 países durante más de una década. La estación ha sido habitada de forma continua desde el 2 de noviembre del año 2000, acumulando más de 23 años de presencia humana permanente en el espacio. Más de 270 personas de 21 países diferentes han visitado la estación desde su inauguración.' },
    ],
    fact: 'La ISS viaja a tal velocidad que si pudieras disparar una bala desde la estación, esta orbita la Tierra más rápido que el proyectil. A 27,600 km/h, la estación recorre una distancia equivalente a un viaje de ida y vuelta a la Luna cada día. En los más de 23 años que lleva habitada de forma continua, ha completado más de 135,000 órbitas alrededor de la Tierra, acumulando una distancia recorrida superior a los 5,600 millones de kilómetros, suficiente para realizar un viaje de ida y vuelta a Neptuno.',
  },
  {
    id: 'comer-en-el-espacio',
    title: 'Comer en el Espacio',
    color: '#D45A5A',
    btnImage: '/assets/astrotrain/infographic_m2/btn_comer-en-el-espacio.jpg',
    image: '/assets/astrotrain/infographic_m2/hero_comer-en-el-espacio.jpg',
    content: [
      'La alimentación espacial ha recorrido un largo camino desde los primeros vuelos tripulados. En 1961, Yuri Gagarin consumió puré de carne y pasta de chocolate exprimidos de tubos de aluminio durante su misión Vostok 1. John Glenn, en 1962, comió puré de manzana de un tubo similar durante su vuelo Mercury. Estos primeros alimentos espaciales eran funcionales pero poco apetitosos. Durante el programa Gemini (1965-1966), la NASA introdujo alimentos liofilizados que se rehidrataban con agua fría, y en el programa Apollo se añadió agua caliente y se incluyeron los primeros paquetes de alimentos termoestabilizados, procesados térmicamente para eliminar microorganismos y conservarse sin refrigeración.',
      'En la ISS actual, los astronautas disponen de un menú que incluye más de 200 opciones diferentes. Los alimentos se clasifican en varias categorías: termoestabilizados (enlatados o en bolsas retort, similares a la comida militar), liofilizados (deshidratados al vacío y que requieren agregar agua caliente), irradiados (esterilizados con radiación ionizante para preservarlos), de humedad intermedia (como frutas secas y beef jerky), y naturales (tortillas, galletas, nueces). Cada astronauta trabaja con nutricionistas meses antes del vuelo para personalizar su menú, que proporciona aproximadamente 2,000 a 3,200 calorías diarias según el peso, sexo y nivel de actividad.',
      'Las tortillas de harina se convirtieron en el pan oficial de la estación espacial por una razón práctica. En 1985, durante la misión STS-61-C, el astronauta mexicano-americano Rodolfo Neri Vela llevó tortillas al espacio y demostró que eran un sustituto superior al pan. Las migas de pan flotan en microgravedad y pueden obstruir filtros de aire o irritar los ojos y las vías respiratorias de la tripulación. Las tortillas no producen migas, se conservan durante meses selladas al vacío, son flexibles para envolver cualquier ingrediente y proporcionan carbohidratos complejos. La NASA desarrolló una tortilla especial con una vida útil de 18 meses.',
      'El sentido del gusto cambia en el espacio. La redistribución de fluidos hacia la cabeza produce congestión nasal crónica similar a un resfriado constante, lo que reduce la percepción de sabores sutiles. Los astronautas reportan que la comida sabe más sosa en órbita y tienden a preferir alimentos con sabores fuertes, picantes o condimentados. La salsa tabasco, la salsa de soja y el wasabi son condimentos populares en la ISS. Además, sin gravedad la convección natural no existe, por lo que los aromas de la comida no ascienden hacia la nariz de la misma forma que en la Tierra, reduciendo aún más la experiencia gustativa.',
      'El agua potable en la ISS proviene de dos fuentes principales. El sistema de procesamiento de agua (WPA) recupera agua del condensado atmosférico (humedad del aliento y el sudor) y de la orina procesada mediante destilación al vacío y filtración catalítica. El astronauta Don Pettit resumió la situación con una frase célebre: "El café de hoy es el café de mañana". Cada tripulante necesita aproximadamente 2.5 litros de agua al día para beber, más agua adicional para rehidratar alimentos. El sistema WRS (Water Recovery System) recupera más del 93% del agua a bordo, lo que reduce drásticamente los costos de reabastecimiento, dado que transportar 1 kilogramo de carga a la ISS cuesta entre 20,000 y 50,000 dólares.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2015, los astronautas de la Expedición 44 comieron las primeras lechugas cultivadas en el espacio como parte del experimento Veggie. Las plantas crecieron en almohadas de arcilla expandida con nutrientes, bajo luces LED rojas, azules y verdes. Scott Kelly describió el sabor como "similar a la rúcula". Desde entonces, la ISS ha cultivado rábanos, chiles y flores de zinnia, avanzando hacia la autosuficiencia alimentaria para futuras misiones a Marte.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La comida espacial debe cumplir requisitos estrictos de seguridad. No puede producir migas (riesgo de obstrucción de filtros), no puede ser excesivamente líquida (el líquido forma esferas flotantes), no puede contener alcohol (prohibido oficialmente por NASA, aunque la estación rusa ha tenido excepciones históricas), y debe tener una vida útil mínima de 18 meses sin refrigeración. El sistema de calentamiento de alimentos de la ISS opera a 77°C y tarda entre 20 y 30 minutos en calentar una porción desde temperatura ambiente.' },
    ],
    fact: 'En 1965, el astronauta John Young sacó de contrabando un sándwich de carne en conserva (corned beef) durante la misión Gemini 3, escondiéndolo en el bolsillo de su traje espacial. Cuando lo sacó en órbita, las migas comenzaron a flotar por la cápsula, creando un riesgo potencial para los instrumentos electrónicos. El incidente provocó una reprimenda del Congreso de Estados Unidos y llevó a la NASA a establecer reglas estrictas sobre los alimentos permitidos en las naves espaciales, reglas que se mantienen más de 60 años después.',
  },
  {
    id: 'dormir-en-orbita',
    title: 'Dormir en Órbita',
    color: '#96A3AE',
    btnImage: '/assets/astrotrain/infographic_m2/btn_dormir-en-orbita.jpg',
    image: '/assets/astrotrain/infographic_m2/hero_dormir-en-orbita.jpg',
    content: [
      'Dormir en el espacio presenta desafíos que no existen en la Tierra. En la ISS, los astronautas utilizan estaciones de sueño individuales (CQ, Crew Quarters), que son cabinas del tamaño aproximado de una cabina telefónica, con dimensiones de 2.1 metros de largo, 0.9 metros de ancho y 1.2 metros de alto. Cada CQ está equipada con un saco de dormir sujeto a la pared, una lámpara de lectura, un ventilador de circulación de aire, un punto de conexión eléctrica para dispositivos personales y una pequeña ventana en dos de las cuatro estaciones del segmento estadounidense. Los astronautas deben sujetarse al saco de dormir para evitar flotar por la estación durante la noche.',
      'Sin la fuerza de gravedad, no hay una posición natural para dormir. Los astronautas no sienten la presión del colchón contra su espalda ni el peso de su cabeza en la almohada. Los brazos tienden a flotar frente al cuerpo en una posición relajada conocida como "postura de astronauta dormido", similar a la posición fetal pero más extendida. Muchos astronautas reportan que las primeras noches en órbita son difíciles porque la sensación de flotar libremente activa reflejos de sobresalto: el cerebro interpreta la ausencia de contacto con una superficie como una caída y genera despertares súbitos. Esta respuesta neurológica generalmente disminuye después de una semana de adaptación.',
      'El ritmo circadiano de los astronautas se altera profundamente en la ISS. Con 16 amaneceres y atardeceres cada 24 horas, el ciclo natural de luz y oscuridad que regula el reloj biológico terrestre desaparece. La estación opera en horario GMT (Greenwich Mean Time) para coordinar actividades con los centros de control de Houston y Moscú. En 2016, la NASA instaló el sistema SSLA (Solid State Lighting Assembly), que utiliza luces LED ajustables en temperatura de color e intensidad: luz azulada brillante durante las horas de trabajo para promover el estado de alerta, y luz cálida tenue antes de dormir para estimular la producción de melatonina.',
      'Los estudios de sueño realizados en la ISS muestran que los astronautas duermen en promedio 6.5 horas por noche, comparado con la recomendación de 7 a 9 horas para adultos. La calidad del sueño también se ve comprometida: el ruido constante de los ventiladores, bombas y sistemas de soporte vital genera un nivel de ruido ambiental de entre 60 y 72 decibelios, comparable al volumen de una conversación en voz alta. Los astronautas usan tapones para los oídos y antifaces. La NASA programa 8.5 horas de tiempo de sueño, pero los datos de actigrafía (sensores de muñeca) confirman que el tiempo efectivo de sueño es significativamente menor.',
      'Las pesadillas y los sueños vívidos son reportados con frecuencia por los astronautas durante sus primeras semanas en órbita. Los investigadores del Instituto de Medicina Aeroespacial del DLR (Centro Aeroespacial Alemán) han documentado que los sueños espaciales suelen involucrar temas de caída, vuelo y desorientación, reflejando la adaptación neurológica al nuevo entorno. El astronauta Chris Hadfield describió en su libro "An Astronaut\'s Guide to Life on Earth" (2013) que durante sus primeras noches en la ISS soñó repetidamente que caía desde grandes alturas, un reflejo de la recalibración del sistema vestibular durante el sueño.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El astronauta japonés Soichi Noguchi reveló que algunos tripulantes prefieren dormir en cualquier lugar de la estación que no sea su cabina asignada, simplemente flotando en un módulo con su saco de dormir sujeto a la pared con velcro. La astronauta Peggy Whitson dormía frecuentemente en el módulo Cupola para poder ver la Tierra y las estrellas al despertar. Cada astronauta desarrolla sus propias rutinas y preferencias de sueño durante las primeras semanas en órbita.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio publicado en 2019 en la revista JAMA Network Open analizó datos de sueño de 21 astronautas durante misiones en la ISS. Los resultados mostraron que el uso de la pastilla zolpidem (Ambien) para conciliar el sueño era frecuente: aproximadamente el 75% de los astronautas lo utilizaron al menos una vez durante su misión. La melatonina también se administra como ayuda para sincronizar el ritmo circadiano. La NASA considera la privación crónica de sueño como uno de los cinco riesgos principales para la salud en vuelos espaciales prolongados.' },
    ],
    fact: 'En la estación espacial rusa Mir, que operó entre 1986 y 2001, los cosmonautas no tenían cabinas individuales de sueño como en la ISS. Dormían en sacos de dormir atados a las paredes del módulo principal, a menudo con otros tripulantes durmiendo a pocos centímetros. El cosmonauta Valeri Polyakov estableció el récord de permanencia continua en el espacio al vivir 437 días a bordo de la Mir entre enero de 1994 y marzo de 1995, adaptándose a dormir en estas condiciones durante más de 14 meses consecutivos.',
  },
  {
    id: 'higiene-espacial',
    title: 'Higiene Espacial',
    color: '#B43A3A',
    btnImage: '/assets/astrotrain/infographic_m2/btn_higiene-espacial.jpg',
    image: '/assets/astrotrain/infographic_m2/hero_higiene-espacial.jpg',
    content: [
      'La ducha convencional no existe en la ISS. El agua, en lugar de caer hacia abajo, forma esferas flotantes que podrían dañar equipos electrónicos o ser inhaladas accidentalmente. Los astronautas se limpian el cuerpo con toallas húmedas y jabón sin enjuague. Para lavarse el cabello utilizan un champú especial que no requiere agua corriente: aplican el champú sin enjuague directamente sobre el cuero cabelludo, lo masajean y luego absorben el exceso con una toalla seca. La astronauta Karen Nyberg publicó un video en 2013 demostrando este proceso, que se convirtió en uno de los videos más vistos del canal de YouTube de la NASA, con más de 35 millones de visualizaciones.',
      'El inodoro espacial es una de las piezas de ingeniería más complejas de la estación. El sistema actual, el Universal Waste Management System (UWMS), instalado en 2020, costó 23 millones de dólares. Funciona mediante succión al vacío: un ventilador genera corriente de aire que arrastra los desechos hacia un contenedor. Para la orina, se utiliza un embudo conectado a una manguera con flujo de aire; el diseño del embudo varía según la anatomía del usuario. Los desechos sólidos se recogen en bolsas individuales dentro de un contenedor compactador. La orina se envía al sistema WRS para ser reciclada en agua potable.',
      'El cepillado de dientes en el espacio requiere adaptaciones. Los astronautas aplican pasta dental en su cepillo, se cepillan normalmente, pero luego deben tragar la pasta o escupirla en una toalla, ya que escupir en un lavabo es imposible sin gravedad. La mayoría opta por pasta dental comestible o por tragar la pequeña cantidad utilizada. Para el cuidado de las uñas, los astronautas se las cortan cerca de una rejilla de ventilación que aspira los recortes flotantes; si no lo hacen, las pequeñas uñas pueden flotar por la estación y terminar en los ojos o las vías respiratorias de otros tripulantes.',
      'El lavado de ropa no es posible en la ISS. No existe lavadora a bordo, y el agua necesaria para lavar ropa sería demasiado costosa de transportar y reciclar. Los astronautas usan su ropa interior durante dos a tres días, las camisetas de ejercicio durante una semana, los pantalones cortos de ejercicio durante un mes y los pantalones largos durante un mes. La ropa usada se empaca en las naves de carga que, al desacoplarse de la estación, se desintegran al reingresar a la atmósfera, convirtiéndose técnicamente en la lavandería más cara del universo. La NASA ha financiado investigaciones sobre tratamientos antimicrobianos para textiles que extiendan la vida útil de la ropa.',
      'El sistema de reciclaje de agua de la ISS (Water Recovery System o WRS) es una maravilla de ingeniería que procesa toda el agua residual a bordo. El sistema UPA (Urine Processor Assembly) utiliza destilación al vacío para evaporar el agua de la orina a baja temperatura, y el WPA (Water Processor Assembly) filtra y purifica el condensado atmosférico y el agua destilada de la orina mediante filtros de carbón activado, resinas de intercambio iónico y un reactor catalítico que descompone contaminantes orgánicos. El agua resultante cumple con estándares de potabilidad más estrictos que la mayoría del agua corriente municipal en la Tierra, según los análisis regulares realizados por el Johnson Space Center.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer inodoro instalado en el transbordador espacial costó 50,000 dólares en 1980. El sistema actual UWMS de la ISS costó 23 millones. La diferencia refleja décadas de mejoras en confiabilidad y comodidad. Los astronautas del programa Apollo usaban bolsas adhesivas que se pegaban al cuerpo, un proceso que cada tripulante describió como extremadamente incómodo. Buzz Aldrin comentó que el aspecto menos glamuroso de caminar en la Luna fue lidiar con el sistema de recolección de desechos dentro de su traje.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Water Recovery System de la ISS alcanza una tasa de recuperación del 93.5% del agua total a bordo. Esto incluye el agua extraída de la orina (mediante destilación al vacío a 44°C para reducir el consumo energético), el condensado atmosférico del sistema de control ambiental y el agua producida por el sistema Sabatier. Para una tripulación de seis personas, el WRS reduce la necesidad de reabastecimiento de agua en aproximadamente 2,700 kilogramos al año, un ahorro que se traduce en decenas de millones de dólares en costos de lanzamiento.' },
    ],
    fact: 'En la estación espacial soviética Salyut 6 (1977-1982), los cosmonautas disponían de una ducha espacial experimental que consistía en una bolsa de plástico cilíndrica que rodeaba el cuerpo del cosmonauta mientras un aspersor liberaba agua nebulizada. El proceso completo de ducharse, recoger el agua flotante con aspiradoras portátiles y secar el interior de la bolsa tomaba más de 45 minutos, comparado con los 5-10 minutos de una ducha terrestre. El sistema se abandonó por su complejidad y porque las toallas húmedas resultaron ser más prácticas y eficientes.',
  },
  {
    id: 'ejercicio-obligatorio',
    title: 'Ejercicio Obligatorio',
    color: '#8491A0',
    btnImage: '/assets/astrotrain/infographic_m2/btn_ejercicio-obligatorio.jpg',
    image: '/assets/astrotrain/infographic_m2/hero_ejercicio-obligatorio.jpg',
    content: [
      'Los astronautas de la ISS deben realizar un mínimo de dos horas de ejercicio al día, seis días a la semana. Esta rutina no es opcional: es una prescripción médica diseñada para combatir la pérdida ósea y muscular causada por la microgravedad. Sin ejercicio regular, un astronauta podría perder entre el 1% y el 2% de su densidad ósea mensual y hasta un 20% de su masa muscular en misiones de seis meses. Estas cifras son similares a las de un paciente con osteoporosis severa en la Tierra, pero ocurren en un período de tiempo mucho más corto. El programa de ejercicio actual ha logrado reducir estas pérdidas a niveles manejables.',
      'El ARED (Advanced Resistive Exercise Device) es el equipo principal de entrenamiento de fuerza en la ISS. Instalado en 2008, reemplazó al iRED anterior que no proporcionaba carga suficiente. El ARED utiliza cilindros de vacío para simular cargas de hasta 272 kilogramos (600 libras), permitiendo ejercicios como sentadillas, peso muerto, prensa de hombros, remo y curl de bíceps. A diferencia de las pesas terrestres, el ARED genera resistencia constante tanto en la fase concéntrica como excéntrica del movimiento. Los astronautas realizan entre 4 y 6 series de los principales ejercicios compuestos durante cada sesión de ARED.',
      'La caminadora T2 (oficialmente Combined Operational Load Bearing External Resistance Treadmill, o COLBERT, nombrada así por el comediante Stephen Colbert tras una votación pública de la NASA en 2009) permite correr en microgravedad. El astronauta se sujeta a la cinta mediante un arnés con correas elásticas que aplican aproximadamente el 70-80% de su peso corporal terrestre como fuerza de compresión. La superficie de la cinta está montada sobre un sistema de aislamiento vibratorio (TVIS) para evitar que las vibraciones del corredor perturben los experimentos científicos sensibles a bordo. Los astronautas suelen correr entre 30 y 45 minutos por sesión.',
      'El CEVIS (Cycle Ergometer with Vibration Isolation and Stabilization System) es una bicicleta estática sin asiento, porque en microgravedad un asiento no tiene función. El astronauta se sujeta con correas de velcro a los pedales y estabiliza su cuerpo con las manos en los manubrios. El CEVIS se utiliza principalmente para ejercicio cardiovascular, con sesiones de entre 30 y 45 minutos a resistencias variables. Al no tener asiento, el astronauta pedalea en posición similar a estar de pie, lo que involucra grupos musculares diferentes a los de una bicicleta terrestre. Los datos de ritmo cardíaco, potencia y cadencia se transmiten en tiempo real a los médicos de vuelo en Houston.',
      'Los resultados del programa de ejercicio son monitoreados con precisión. Antes del vuelo, cada astronauta se somete a escáneres DEXA (absorciometría dual de rayos X) para medir su densidad ósea basal, y pruebas isocinéticas para evaluar la fuerza muscular. Estas mediciones se repiten inmediatamente después del aterrizaje y durante los meses de rehabilitación. Los datos acumulados desde la implementación del ARED en 2008 muestran que los astronautas que siguen el protocolo de ejercicio completo regresan con una pérdida ósea promedio inferior al 0.5% mensual en la cadera y la columna, comparado con el 1-2% observado antes de la implementación del equipo mejorado.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La astronauta Sunita Williams completó el Maratón de Boston de 2007 mientras corría en la caminadora T2 a bordo de la ISS. Registró un tiempo de 4 horas, 23 minutos y 10 segundos mientras orbitaba la Tierra a 27,600 km/h. Fue inscrita oficialmente en la carrera con el dorsal número 14,000. Williams describió la experiencia como desafiante porque las correas del arnés generaban fricción e irritación en los hombros durante una carrera tan prolongada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio publicado en el Journal of Bone and Mineral Research en 2012 comparó la pérdida ósea entre astronautas que usaron el iRED (dispositivo antiguo con carga máxima de 136 kg) y aquellos que usaron el ARED (carga máxima de 272 kg). Los usuarios del ARED mostraron una reducción del 50% en la pérdida de densidad mineral ósea en la cadera y una preservación casi total de la masa ósea vertebral, demostrando que las cargas de ejercicio de alta intensidad son el factor clave para la protección ósea en microgravedad.' },
    ],
    fact: 'El equipamiento de ejercicio de la ISS pesa más de 900 kilogramos en total y ocupa un espacio considerable en el Nodo 3 (Tranquility). El ARED por sí solo pesa 408 kilogramos y mide 1.8 metros de alto. A un costo de transporte de aproximadamente 20,000 dólares por kilogramo a la órbita baja, el envío de estos equipos al espacio costó más de 18 millones de dólares solo en transporte, sin contar el desarrollo y fabricación. Sin embargo, esta inversión se justifica: sin el programa de ejercicio, los astronautas regresarían a la Tierra con discapacidades físicas que podrían tardar años en revertirse.',
  },
  {
    id: 'vida-social-orbita',
    title: 'La Vida Social en Órbita',
    color: '#E46A6A',
    btnImage: '/assets/astrotrain/infographic_m2/btn_vida-social-orbita.jpg',
    image: '/assets/astrotrain/infographic_m2/hero_vida-social-orbita.jpg',
    content: [
      'La ISS alberga típicamente tripulaciones de seis a siete astronautas de diferentes nacionalidades, idiomas y culturas. Las expediciones están compuestas por miembros de al menos dos agencias espaciales diferentes, y los idiomas oficiales de trabajo son el inglés y el ruso. Todos los astronautas que vuelan a la ISS deben aprender ruso funcional, y todos los cosmonautas deben aprender inglés funcional, como parte de su entrenamiento prevuelo que dura entre dos y tres años. La convivencia en un espacio reducido (388 metros cúbicos habitables, menos que una casa de tres habitaciones) con las mismas personas durante seis meses requiere habilidades interpersonales que se evalúan y entrenan formalmente.',
      'Las comunicaciones con la Tierra no son instantáneas ni continuas. La ISS se comunica con los centros de control a través de la red TDRS (Tracking and Data Relay Satellite System), un sistema de satélites de retransmisión que permite cobertura durante aproximadamente el 70% de cada órbita. Durante el 30% restante, la estación pasa por zonas sin cobertura. Las llamadas telefónicas a familiares se realizan mediante un sistema de VoIP (voz sobre protocolo de internet) a través de esta red. Los astronautas disponen de videoconferencias privadas semanales con sus familias y acceso limitado a correo electrónico e internet, aunque con velocidades y latencia significativamente inferiores a las terrestres.',
      'El apoyo psicológico es un componente formal del programa de vuelos tripulados. El equipo de Behavioral Health and Performance (BHP) de la NASA proporciona consultas regulares de psicología clínica mediante videoconferencia confidencial. Además, los familiares de los astronautas reciben apoyo psicológico durante toda la misión. Los psicólogos de vuelo organizan "sorpresas de moral" que incluyen paquetes de atención personal con cartas de familiares, libros, películas nuevas, comida especial y regalos enviados en las naves de carga. El astronauta Scott Kelly recibió un disfraz de gorila durante su misión de un año, que usó para perseguir a sus compañeros por los módulos de la estación.',
      'La resolución de conflictos interpersonales en el espacio ha sido objeto de estudio desde los programas Salyut y Mir soviéticos. En 1982, los cosmonautas Valentin Lebedev y Anatoli Berezovoy pasaron 211 días en la estación Salyut 7 y documentaron en sus diarios tensiones crecientes, períodos de silencio prolongado y frustración acumulada. Desde entonces, las agencias espaciales implementaron selección psicológica rigurosa, entrenamiento en habilidades de comunicación y liderazgo, y la asignación cuidadosa de roles dentro de las tripulaciones. El programa NEEMO de la NASA, donde astronautas viven en el hábitat submarino Aquarius durante semanas, sirve como campo de pruebas para dinámicas de grupo.',
      'Las celebraciones y tradiciones a bordo son una parte importante de la cohesión del equipo. Los astronautas celebran cumpleaños, festividades nacionales e hitos de la misión con comidas especiales y decoraciones improvisadas. La tripulación suele reunirse para las comidas principales, ya que el acto de comer juntos promueve la comunicación informal y la conexión social. Los astronautas tienen acceso a una biblioteca digital de películas, música y libros, y organizan noches de cine flotando frente a una computadora portátil. Los fines de semana, la carga de trabajo se reduce y la tripulación dispone de tiempo libre para fotografiar la Tierra desde la Cupola, tocar instrumentos musicales o simplemente flotar en silencio contemplando las estrellas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El astronauta canadiense Chris Hadfield se convirtió en un fenómeno cultural en 2013 al grabar una versión de la canción "Space Oddity" de David Bowie a bordo de la ISS, tocando la guitarra mientras flotaba en microgravedad. El video acumuló más de 50 millones de vistas en YouTube. Hadfield también publicaba fotografías diarias de la Tierra y respondía preguntas de estudiantes de todo el mundo a través de redes sociales, redefiniendo la comunicación entre astronautas y el público general.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Un estudio de Jack Stuster publicado por la NASA en 2010 ("Behavioral Issues Associated with Long-Duration Space Expeditions") analizó diarios personales de astronautas y cosmonautas durante misiones de larga duración. Los factores de estrés más frecuentes fueron: la separación de la familia, la monotonía de las tareas repetitivas, la falta de privacidad, y los conflictos sobre limpieza y ruido. Stuster encontró que el tercer cuarto de la misión es típicamente el período de mayor tensión psicológica, un fenómeno observado también en expediciones polares y submarinas.' },
    ],
    fact: 'La primera boda espacial ocurrió el 10 de agosto de 2003, cuando el cosmonauta ruso Yuri Malenchenko se casó con Ekaterina Dmitrieva mediante una ceremonia por videoconferencia mientras él orbitaba la Tierra a bordo de la ISS y ella se encontraba en Houston, Texas. Un sustituto ocupó su lugar físico en la ceremonia terrestre. La boda causó controversia porque la agencia espacial rusa no la aprobó oficialmente, pero fue legal bajo las leyes del estado de Texas. Malenchenko no enfrentó consecuencias profesionales y voló en misiones posteriores.',
  },
];

// ─── Orbital Particle Field (Canvas Background) ──────────────────────────────
function OrbitalField() {
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
      hue: Math.random() > 0.5 ? '196,75,75' : '168,181,192', // mission red or space silver
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

// ─── Space Living Header ──────────────────────────────────────────────────────
function SpaceLivingHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(196,75,75,0.3))' }}>
        {/* Orbital arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#orbitGradAT2)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 station markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C44B4B','#A8B5C0','#D45A5A','#96A3AE','#B43A3A','#8491A0','#E46A6A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central ISS icon */}
        <line x1="285" y1="30" x2="315" y2="30" stroke="#C44B4B" strokeWidth="1.5" opacity="0.6" />
        <rect x="294" y="24" width="12" height="12" rx="2" fill="none" stroke="#C44B4B" strokeWidth="1.5" opacity="0.6" />
        <rect x="278" y="26" width="8" height="4" rx="1" fill="#C44B4B" opacity="0.3" />
        <rect x="278" y="32" width="8" height="4" rx="1" fill="#C44B4B" opacity="0.3" />
        <rect x="314" y="26" width="8" height="4" rx="1" fill="#C44B4B" opacity="0.3" />
        <rect x="314" y="32" width="8" height="4" rx="1" fill="#C44B4B" opacity="0.3" />
        <defs>
          <linearGradient id="orbitGradAT2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(196,75,75,0.2)" />
            <stop offset="50%" stopColor="rgba(196,75,75,0.9)" />
            <stop offset="100%" stopColor="rgba(196,75,75,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C44B4B" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">VIVIR EN EL ESPACIO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(196,75,75,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA VIDA COTIDIANA EN ÓRBITA</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching M9 Dendera style) ──────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(196,75,75,0.2)'}`,
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
          layoutId="activeDotAstroTrainM2"
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

// ─── Expandable Section with Random Direction ─────────────────────────────────
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

// ─── Magazine-Style Content Panel ─────────────────────────────────────────────
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

        {/* ——— Conditional Video Render ——— */}
        {node.video && (
          <div style={{ position: 'relative', zIndex: 2 }}>
            <VideoPlayer
              src={node.video.src}
              title={node.video.title}
              color={node.color}
              poster={node.video.poster}
            />
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

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(196,75,75,0.15)',
    }}>
      <Star size={14} style={{ color: '#C44B4B', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #C44B4B, #A8B5C0)', borderRadius: '3px', boxShadow: '0 0 8px rgba(196,75,75,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#C44B4B', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ───────────────────────────────────────────────
export default function InteractiveInfographic_AstroTrainM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/astrotrain/astrotrain_m2_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(196,75,75,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <OrbitalField />

      <SpaceLivingHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(196,75,75,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(196,75,75,0.08)', borderRadius: '16px',
              border: '1px solid rgba(196,75,75,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#C44B4B', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado todos los secretos de Vivir en el Espacio!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Habitante Orbital
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
