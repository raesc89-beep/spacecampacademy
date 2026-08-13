'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Triassic / Dinosaur themed) ————————————————
function DecoFossil({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Ammonite spiral fossil */}
      <circle cx="30" cy="30" r="24" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="30" cy="30" r="12" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="30" r="6" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.5" />
      {/* Spiral chamber lines */}
      <line x1="30" y1="6" x2="30" y2="12" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="54" y1="30" x2="48" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="54" x2="30" y2="48" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="6" y1="30" x2="12" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Texture dots */}
      <circle cx="22" cy="14" r="1" fill={color} opacity="0.3" />
      <circle cx="42" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="38" cy="44" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoVolcano({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Volcano shape */}
      <path d="M30 10 L45 48 L15 48 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Crater */}
      <ellipse cx="30" cy="12" rx="6" ry="2.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Lava eruption */}
      <path d="M28 10 Q26 4 24 2" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M32 10 Q34 5 36 3" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M30 8 Q30 3 30 1" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {/* Smoke puffs */}
      <circle cx="22" cy="5" r="2" fill={color} opacity="0.25" />
      <circle cx="38" cy="4" r="1.5" fill={color} opacity="0.2" />
      {/* Lava flows */}
      <path d="M25 38 Q22 44 20 50" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M35 36 Q38 42 40 50" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoSkull({ size = 70, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Archosaur skull outline */}
      <path d="M10 30 Q10 14 25 12 L45 14 Q52 16 54 24 L52 32 Q48 36 40 36 L20 36 Q12 36 10 30Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Eye socket */}
      <circle cx="38" cy="22" r="5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Antorbital fenestra */}
      <ellipse cx="28" cy="24" rx="4" ry="5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Jaw */}
      <path d="M12 32 L18 42 L40 44 L48 38" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Teeth */}
      {[20, 25, 30, 35, 40].map((x, i) => (
        <line key={i} x1={x} y1="36" x2={x} y2="40" stroke={color} strokeWidth="1" opacity="0.35" />
      ))}
    </svg>
  );
}

function DecoFern({ size = 60, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Main stem */}
      <path d="M30 55 Q30 30 28 8" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Left fronds */}
      <path d="M29 15 Q18 12 12 16" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M29 22 Q16 20 10 26" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 30 Q18 28 12 34" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 38 Q20 36 14 42" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Right fronds */}
      <path d="M29 15 Q40 10 46 14" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M29 22 Q42 18 48 22" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 30 Q44 26 50 30" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M30 38 Q42 34 48 38" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Curl at top */}
      <path d="M28 8 Q26 4 28 2 Q32 2 30 6" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoContinent({ size = 80, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Pangea landmass outline */}
      <path d="M15 20 Q20 10 35 12 Q45 8 55 14 Q65 12 70 20 Q72 28 65 34 Q55 40 40 38 Q30 42 20 36 Q12 30 15 20Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      {/* Tethys Sea indent */}
      <path d="M55 18 Q50 24 55 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Water lines */}
      <path d="M5 24 Q8 22 11 24" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M72 16 Q75 14 78 16" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M4 34 Q7 32 10 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoBone({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 70 35" style={{ opacity: 0.2, ...style }}>
      {/* Femur bone shape */}
      <path d="M12 8 Q8 4 10 2 Q14 0 16 4 Q18 0 22 2 Q24 4 20 8 L18 14 L52 22 L54 28 Q58 32 54 34 Q50 36 52 30 Q48 36 44 34 Q42 32 46 28 L48 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" opacity="0.5" />
      {/* Cross-section lines */}
      <line x1="25" y1="15" x2="45" y2="21" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Small fragments */}
      <circle cx="60" cy="8" r="1.5" fill={color} opacity="0.3" />
      <circle cx="5" cy="28" r="1" fill={color} opacity="0.25" />
      <rect x="30" y="6" width="3" height="3" fill={color} opacity="0.2" transform="rotate(20 31 7)" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'gran-mortandad': [DecoVolcano, DecoFossil, DecoSkull],
  'pangea-un-solo-mundo': [DecoContinent, DecoFern, DecoVolcano],
  'arcosaurios-herederos': [DecoSkull, DecoBone, DecoFern],
  'eoraptor-primer-dinosaurio': [DecoBone, DecoFossil, DecoFern],
  'herrerasaurus-cazador': [DecoSkull, DecoBone, DecoVolcano],
  'rivales-triasico': [DecoSkull, DecoContinent, DecoFossil],
  'triunfo-dinosaurios': [DecoFossil, DecoVolcano, DecoBone],
};

// ——— Content Data ————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Brusatte, S.L. (2018). The Rise and Fall of the Dinosaurs: A New History of a Lost World. William Morrow & Company.',
  'Benton, M.J. (2015). When Life Nearly Died: The Greatest Mass Extinction of All Time. Thames & Hudson.',
  'Sereno, P.C. & Novas, F.E. (1993). The skull and neck of the basal theropod Herrerasaurus ischigualastensis. Journal of Vertebrate Paleontology, 13(4), 451–476.',
  'Langer, M.C., Ezcurra, M.D., Bittencourt, J.S. & Novas, F.E. (2010). The origin and early evolution of dinosaurs. Biological Reviews, 85(1), 55–110.',
  'Nesbitt, S.J. (2011). The early evolution of archosaurs: relationships and the origin of major clades. Bulletin of the American Museum of Natural History, 352, 1–292.',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'gran-mortandad',
    title: 'La Gran Mortandad',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/dinos_m1.png',
    image: '/assets/dinosaurios/dinos_m1.png',
    content: [
      'Hace 252 millones de años, la Tierra sufrió la peor catástrofe biológica de toda su historia: la extinción masiva del Pérmico-Triásico. Este evento eliminó aproximadamente el 96% de todas las especies marinas y cerca del 70% de los vertebrados terrestres. Los paleontólogos la denominan "La Gran Mortandad" porque ningún otro evento de extinción ha alcanzado esa magnitud. Para ponerlo en perspectiva, la extinción que acabó con los dinosaurios no avianos hace 66 millones de años eliminó un 76% de las especies, una cifra grave pero menor en comparación.',
      'La causa principal fue una serie de erupciones volcánicas colosales en la región que hoy conocemos como Siberia, Rusia. Estas erupciones formaron los "Traps Siberianos", una provincia volcánica que cubre más de 2 millones de kilómetros cuadrados con capas de lava basáltica de hasta 3 kilómetros de espesor. Las erupciones duraron aproximadamente un millón de años y liberaron cantidades masivas de dióxido de carbono y dióxido de azufre a la atmósfera, provocando un efecto invernadero descontrolado y lluvia ácida que devastó los ecosistemas marinos y terrestres por igual.',
      'Los océanos se convirtieron en zonas de muerte. El calentamiento global elevó la temperatura del agua, reduciendo drásticamente los niveles de oxígeno disuelto, un fenómeno conocido como anoxia oceánica. Los arrecifes de coral desaparecieron durante millones de años. Los trilobites, que habían sobrevivido durante más de 270 millones de años, se extinguieron por completo. En tierra firme, los bosques de Glossopteris — un género de plantas que dominaba el hemisferio sur — fueron reemplazados por hongos que se alimentaban de madera muerta, una señal clara de colapso ecológico total registrada en el registro fósil.',
      'Las investigaciones del geólogo Paul Wignall, de la Universidad de Leeds, publicadas en 2015, documentaron que la recuperación no fue uniforme. Algunas regiones tardaron entre 5 y 10 millones de años en restablecer niveles normales de biodiversidad. Durante ese intervalo, los ecosistemas terrestres estaban dominados por unas pocas especies oportunistas, con muy poca diversidad. Este período de "mundo vacío" creó las condiciones para que nuevos grupos de animales, entre ellos los ancestros de los dinosaurios, pudieran evolucionar y ocupar los nichos ecológicos que habían quedado disponibles.',
      'El estudio geoquímico de las rocas del límite Pérmico-Triásico revela anomalías en la proporción de isótopos de carbono-13, lo que indica una perturbación masiva del ciclo global del carbono. Investigadores del MIT, liderados por Samuel Bowring y Daniel Rothman, determinaron en 2014 que la tasa de liberación de carbono durante las erupciones siberianas fue similar a las tasas actuales de emisiones antropogénicas, lo que convierte a este evento en un caso de estudio relevante para comprender los posibles efectos del cambio climático moderno sobre la biodiversidad planetaria.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El registro fósil muestra que un hongo llamado Reduviasporonites fue tan abundante justo después de la extinción que algunos científicos lo llamaron el "pico de hongos". Este microorganismo se alimentaba de los troncos caídos de los bosques muertos. Su presencia masiva en rocas de ese período indica que los bosques enteros murieron simultáneamente, dejando madera en descomposición como la fuente principal de materia orgánica durante miles de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los Traps Siberianos produjeron erupciones que no se parecían a un volcán convencional con un cráter. Eran fisuras de cientos de kilómetros de longitud por donde brotaba lava basáltica en volúmenes de miles de kilómetros cúbicos. La lava atravesó depósitos subterráneos de carbón y sal, vaporizándolos y liberando halógenos tóxicos como cloro y flúor a la atmósfera, lo que destruyó la capa de ozono y expuso a la vida a radiación ultravioleta dañina.' },
    ],
    fact: 'En 2020, un equipo de investigadores dirigido por Yadong Sun de la Universidad de Geociencias de China publicó en la revista Science que las temperaturas oceánicas durante el pico de la extinción Pérmico-Triásico alcanzaron los 40°C en las regiones ecuatoriales, comparadas con los 25-30°C actuales. A esas temperaturas, la mayoría de los organismos marinos no pueden sintetizar proteínas correctamente, lo que explica por qué la zona tropical quedó prácticamente despoblada durante millones de años.',
  },
  {
    id: 'pangea-un-solo-mundo',
    title: 'Pangea: Un Solo Mundo',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/dinos_m1.png',
    image: '/assets/dinosaurios/dinos_m1.png',
    content: [
      'Durante el Triásico, toda la masa terrestre del planeta estaba unida en un solo supercontinente llamado Pangea, que en griego significa "toda la tierra". Alfred Wegener propuso la idea de la deriva continental en 1912, pero no fue hasta la década de 1960 cuando la teoría de la tectónica de placas explicó el mecanismo. Pangea se extendía desde el polo norte hasta el polo sur, rodeada por un único océano global llamado Panthalassa, que cubría más del 70% de la superficie del planeta. Un mar interior llamado Tetis (Tethys) se abría como una cuña en el lado oriental del supercontinente.',
      'El interior de Pangea era un lugar muy hostil. Al estar tan lejos del océano, las regiones centrales recibían poca humedad y estaban dominadas por desiertos inmensos con temperaturas que podían superar los 50°C durante el día. Los modelos climáticos del paleoclimatólogo Paul Olsen, de la Universidad de Columbia, indican que la diferencia de temperatura entre el interior y la costa podía alcanzar los 30°C. Las lluvias monzónicas estacionales eran intensas pero breves, creando ciclos de inundación y sequía extremos que definían los ecosistemas.',
      'Las zonas costeras y los márgenes del mar de Tetis eran los únicos lugares con vegetación densa. Los bosques estaban compuestos por coníferas primitivas como Voltzia, helechos arborescentes de hasta 10 metros de altura, cícadas de troncos gruesos y ginkgos. No existían las plantas con flores (angiospermas), que no aparecerían hasta el Cretácico, unos 80 millones de años después. La flora del Triásico dependía del viento para la polinización y de las esporas para la reproducción, lo que la hacía vulnerable a los cambios climáticos bruscos.',
      'La disposición geográfica de Pangea permitió que los animales terrestres migraran libremente de un extremo a otro del supercontinente. Esto explica por qué se encuentran fósiles de los mismos reptiles triásicos en continentes que hoy están separados por océanos. El cinodonte Cynognathus, por ejemplo, se ha encontrado tanto en Sudamérica como en África, y el reptil Lystrosaurus aparece en registros fósiles de la Antártida, India y Sudáfrica. Esta distribución fue una de las pruebas clave que Wegener utilizó para apoyar su hipótesis de la deriva continental.',
      'La fragmentación de Pangea comenzó en el Triásico tardío, hace unos 200 millones de años, cuando una grieta tectónica empezó a separar lo que hoy es Norteamérica de África y Europa. Esta ruptura estuvo acompañada por la Provincia Magmática del Atlántico Central (CAMP), una serie de erupciones volcánicas que dejaron basaltos en cuatro continentes actuales. La apertura del futuro océano Atlántico transformó los patrones de circulación oceánica y atmosférica, alterando el clima global y contribuyendo a la extinción del final del Triásico hace 201 millones de años.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Si pudieras caminar por Pangea durante el Triásico, podrías recorrer a pie desde el polo sur hasta el polo norte sin cruzar ningún océano. El viaje cubriría más de 15,000 kilómetros a lo largo de una única masa continental. Sin embargo, el interior sería tan árido y caliente que necesitarías seguir las rutas costeras para encontrar agua y vegetación, muy similar a cruzar el Sahara multiplicado por diez.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los sedimentos del Triásico muestran un patrón cíclico causado por los ciclos de Milankovitch, que son variaciones periódicas en la órbita terrestre. Paul Olsen y Dennis Kent documentaron en 1996 ciclos de 20,000 y 100,000 años en las rocas lacustres de la Cuenca de Newark (Nueva Jersey), demostrando que los monzones de Pangea variaban con la misma periodicidad que los ciclos de glaciación del Pleistoceno. Estos ciclos afectaron la evolución de los primeros dinosaurios.' },
    ],
    fact: 'El mar de Tetis no desapareció por completo: su remanente moderno es el mar Mediterráneo. A medida que África empujó hacia el norte colisionando con Europa durante los últimos 60 millones de años, el antiguo océano de Tetis se fue cerrando progresivamente. El Mediterráneo actual tiene solo 3,750 kilómetros de largo y un promedio de 1,500 metros de profundidad, una fracción diminuta del antiguo Tetis que se extendía desde España hasta el sudeste asiático durante el período Triásico.',
  },
  {
    id: 'arcosaurios-herederos',
    title: 'Los Arcosaurios Herederos',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/dinos_m1.png',
    image: '/assets/dinosaurios/dinos_m1.png',
    content: [
      'Los arcosaurios ("reptiles dominantes") fueron el grupo de vertebrados que heredó la Tierra después de la Gran Mortandad. Se distinguen de otros reptiles por una característica anatómica específica: la fenestra anteorbital, una abertura en el cráneo situada entre el ojo y la fosa nasal. Esta apertura reducía el peso del cráneo y proporcionaba espacio para músculos mandibulares más potentes. Todos los dinosaurios, pterosaurios, cocodrilos y aves actuales pertenecen al clado Archosauria y comparten este rasgo ancestral.',
      'Los arcosaurios se dividieron en dos grandes linajes durante el Triásico temprano, hace unos 247 millones de años. El primer linaje, Pseudosuchia ("falsos cocodrilos"), incluye a los ancestros de los cocodrilos modernos y a grupos extintos como los rauisuquios y los aetosaurios. El segundo linaje, Avemetatarsalia ("metatarsos de ave"), incluye a los dinosaurios y a los pterosaurios. La división se basa en diferencias en la articulación del tobillo: los pseudosuchios tienen un tobillo tipo "cocodrilo" con rotación entre el astrágalo y el calcáneo, mientras que los avemetatarsalios tienen un tobillo tipo "bisagra" más simple.',
      'El paleontólogo Sterling Nesbitt, de Virginia Tech, publicó en 2011 un análisis filogenético de 80 especies de arcosaurios que tomó más de 10 años de trabajo. Su estudio, publicado en el Bulletin of the American Museum of Natural History, identificó 412 caracteres anatómicos para reconstruir el árbol evolutivo del grupo. Los resultados confirmaron que los dinosaurios no aparecieron de la nada: evolucionaron gradualmente a partir de arcosaurios pequeños y bípedos llamados dinosauriformes, como Marasuchus, un animal del tamaño de un gato encontrado en Argentina.',
      'Los dinosauriformes compartían con los dinosaurios verdaderos varias adaptaciones para la locomoción bípeda: piernas erguidas bajo el cuerpo (no extendidas a los lados como en los lagartos), una articulación de cadera reforzada y una cresta en el fémur para la inserción de músculos potentes. Estos rasgos les permitían correr más rápido y con mayor eficiencia energética que los reptiles con postura extendida, una ventaja competitiva significativa en el mundo post-extinción del Triásico temprano donde la rapidez podía significar la diferencia entre capturar presas o ser capturado.',
      'Uno de los arcosaurios más reveladores es Teleocrater rhadinus, descrito en 2017 por un equipo liderado por Sterling Nesbitt a partir de fósiles encontrados en Tanzania. Este animal de 2-3 metros vivió hace unos 245 millones de años y ocupa una posición justo en la base de Avemetatarsalia, antes de la separación entre dinosaurios y pterosaurios. Caminaba sobre cuatro patas con una postura semi-erguida, lo que indica que los ancestros más antiguos del linaje dinosauriano no eran bípedos. La bipedestación evolucionó posteriormente dentro del linaje, probablemente como una adaptación para la caza activa de presas pequeñas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las aves modernas son dinosaurios terópodos que sobrevivieron a la extinción del Cretácico. Esto significa que un colibrí y un cocodrilo son primos lejanos dentro de Archosauria. Se separaron hace unos 247 millones de años, durante el Triásico temprano. Todas las más de 10,000 especies de aves actuales descienden de pequeños dinosaurios emplumados del Jurásico tardío, lo que convierte a los dinosaurios en el grupo de vertebrados terrestres más diverso del planeta.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fenestra anteorbital no es solo un agujero vacío en el cráneo. En los dinosaurios terópodos evolucionó para albergar un seno neumático (una cavidad llena de aire) conectado con el sistema respiratorio. Los sacos aéreos de las aves modernas, que les permiten respirar de forma unidireccional y extremadamente eficiente, se originaron a partir de este mismo sistema. Los paleontólogos pueden rastrear esta evolución examinando las superficies internas de cráneos fósiles con tomografía computarizada.' },
    ],
    fact: 'Marasuchus lilloensis fue descrito por el paleontólogo argentino José Bonaparte en 1975 a partir de fósiles encontrados en la Formación Chañares, provincia de La Rioja, Argentina. Este dinosauriforme medía solo 40 centímetros de largo y pesaba menos de 1 kilogramo. Sin embargo, su anatomía de cadera y tobillo era tan similar a la de los primeros dinosaurios que los paleontólogos lo consideran una de las aproximaciones más cercanas al ancestro directo de todos los dinosaurios que existieron.',
  },
  {
    id: 'eoraptor-primer-dinosaurio',
    title: 'Eoraptor: El Primer Dinosaurio',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/dinos_m1.png',
    image: '/assets/dinosaurios/dinos_m1.png',
    content: [
      'En 1991, el estudiante de paleontología Ricardo Martínez descubrió un pequeño esqueleto casi completo en el Valle de la Luna, en la provincia de San Juan, Argentina. El fósil fue descrito formalmente en 1993 por Paul Sereno, de la Universidad de Chicago, junto con colaboradores argentinos, y recibió el nombre de Eoraptor lunensis: "ladrón del amanecer del Valle de la Luna". Con una antigüedad estimada de 231 millones de años, Eoraptor fue durante décadas considerado uno de los dinosaurios más antiguos conocidos y una ventana directa al origen del grupo.',
      'Eoraptor medía aproximadamente un metro de largo desde la punta del hocico hasta el final de la cola, y pesaba entre 5 y 10 kilogramos, similar a un zorro pequeño. Era bípedo, con patas traseras largas y fuertes adaptadas para la carrera, y brazos cortos con manos de cinco dedos, de los cuales los tres centrales tenían garras curvas útiles para sujetar presas. Su cráneo era ligero, con dientes heterodónticos: los dientes delanteros eran curvos y puntiagudos como los de un carnívoro, mientras que los posteriores tenían forma de hoja, similares a los de un herbívoro.',
      'Esta dentición mixta sugiere que Eoraptor era omnívoro, una dieta flexible que habría sido ventajosa en los ecosistemas inestables del Triásico medio. Paul Sereno interpretó inicialmente a Eoraptor como un terópodo basal (el grupo que incluye a los depredadores bípedos y eventualmente a las aves), pero estudios posteriores de Ricardo Martínez y Oscar Alcober, publicados en 2011 en la revista ZooKeys, reclasificaron a Eoraptor como un sauropodomorfo basal, es decir, un pariente temprano de los gigantescos saurópodos de cuello largo como Brachiosaurus.',
      'El Valle de la Luna, parte del Parque Provincial Ischigualasto, es un sitio declarado Patrimonio de la Humanidad por la UNESCO en 2000. Su importancia radica en que preserva una secuencia continua de sedimentos del Triásico que cubre unos 40 millones de años de historia geológica. Las rocas expuestas por la erosión revelan capas sucesivas que documentan cómo los ecosistemas cambiaron tras la Gran Mortandad, desde comunidades dominadas por sinápsidos hasta faunas donde los arcosaurios eran los vertebrados dominantes.',
      'El esqueleto de Eoraptor encontrado por Martínez estaba completo en un 95%, una preservación excepcional para un animal tan antiguo. El estudio detallado de sus huesos reveló tasas de crecimiento rápido, similares a las de las aves modernas y distintas de las de los reptiles actuales, que crecen lentamente durante toda su vida. Esta evidencia indica que los primeros dinosaurios ya poseían un metabolismo elevado, una característica que probablemente les confirió ventajas competitivas frente a otros reptiles contemporáneos en términos de actividad sostenida y capacidad de forrajeo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Ricardo Martínez tenía solo 21 años cuando descubrió el esqueleto de Eoraptor en 1991. Hoy es investigador del CONICET y director del Museo de Ciencias Naturales de la Universidad Nacional de San Juan. Ha descubierto más de una docena de especies nuevas de reptiles triásicos en la misma región, convirtiendo a San Juan en uno de los epicentros mundiales de la paleontología del Triásico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La datación de 231 millones de años para Eoraptor se obtuvo mediante el método de uranio-plomo (U-Pb) aplicado a cristales de circón encontrados en capas de ceniza volcánica intercaladas con los sedimentos fosilíferos. Los circones son minerales que incorporan uranio durante su formación y lo retienen durante miles de millones de años. Al medir la proporción entre uranio-238 y su producto de desintegración, plomo-206, los geocronólogos calculan la edad con una precisión de menos del 1%.' },
    ],
    fact: 'En 2013, los paleontólogos describieron a Eodromaeus murphi, otro dinosaurio diminuto del Valle de la Luna que vivió junto a Eoraptor hace 231 millones de años. Eodromaeus pesaba unos 5 kilogramos y sí era un terópodo verdadero, un depredador con garras afiladas. La coexistencia de estos dos dinosaurios tan diferentes en el mismo ecosistema demuestra que la diversificación del grupo comenzó muy pronto, con linajes separados ya presentes en los primeros millones de años de la historia dinosauriana.',
  },
  {
    id: 'herrerasaurus-cazador',
    title: 'Herrerasaurus: El Cazador',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/dinos_m1.png',
    image: '/assets/dinosaurios/dinos_m1.png',
    content: [
      'En 1958, el arriero y campesino Victorino Herrera encontró huesos fosilizados en las rocas rojizas de la Formación Ischigualasto, en la provincia de San Juan, Argentina. El paleontólogo Osvaldo Reig describió formalmente estos fósiles en 1963, nombrando al animal Herrerasaurus ischigualastensis en honor a su descubridor. Con una antigüedad de aproximadamente 231 millones de años, Herrerasaurus es uno de los dinosaurios carnívoros más antiguos y uno de los depredadores más grandes de su ecosistema, aunque su posición exacta en el árbol evolutivo de los dinosaurios ha sido debatida durante décadas.',
      'Herrerasaurus medía entre 3 y 6 metros de largo dependiendo de la estimación, con un peso aproximado de 210 a 350 kilogramos. Era un depredador bípedo con un cráneo robusto de unos 56 centímetros de longitud, equipado con dientes curvos y serrados diseñados para desgarrar carne. Su mandíbula inferior poseía una articulación intramandibular flexible que le permitía ajustar el agarre sobre presas que se debatían, un rasgo convergente con algunos lagartos monitores actuales pero desarrollado de forma independiente.',
      'Paul Sereno descubrió un cráneo completo de Herrerasaurus en 1988 durante una expedición al Valle de la Luna, resolviendo muchas de las incertidumbres sobre la anatomía de este animal. El estudio del cráneo, publicado en el Journal of Vertebrate Paleontology en 1993, reveló que Herrerasaurus tenía ojos relativamente grandes orientados parcialmente hacia adelante, lo que sugiere cierto grado de visión binocular útil para juzgar distancias durante la caza. Sus brazos eran proporcionalmente cortos pero musculosos, con tres dedos funcionales dotados de garras curvas.',
      'La Formación Ischigualasto, donde se encontró Herrerasaurus, preserva un ecosistema triásico detallado. Los paleontólogos han identificado que Herrerasaurus compartía su hábitat con rhynchosaurios herbívoros como Hyperodapedon (que constituían hasta el 40% de los vertebrados del ecosistema), el cinodonte Exaeretodon (un pariente lejano de los mamíferos), aetosaurios acorazados como Aetosauroides, y el rauisuquio Saurosuchus, un depredador más grande que Herrerasaurus. Los dinosaurios representaban menos del 10% de la fauna total.',
      'La clasificación de Herrerasaurus ha generado un debate científico prolongado. Algunos paleontólogos lo ubican como un terópodo basal (el linaje de dinosaurios carnívoros), otros como un saurisquio basal (fuera de los tres grandes grupos de dinosaurios), y algunos estudios recientes sugieren que podría pertenecer a un linaje propio anterior a la divergencia entre terópodos y sauropodomorfos. Un estudio filogenético de Matthew Baron, David Norman y Paul Barrett publicado en Nature en 2017 incluso propuso reorganizar completamente la clasificación de los dinosaurios, lo que afectaría la posición de Herrerasaurus. Este debate sigue abierto y depende del descubrimiento de nuevos fósiles intermedios.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Victorino Herrera no era científico sino un arriero que recorría el campo con sus cabras. Cuando encontró los huesos, los reportó a las autoridades locales, quienes contactaron al paleontólogo Osvaldo Reig del Museo de La Plata. Es uno de muchos casos en que descubrimientos paleontológicos fundamentales fueron realizados por personas comunes que reconocieron la importancia de lo que habían encontrado y tuvieron la iniciativa de reportarlo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La articulación intramandibular de Herrerasaurus consistía en una unión flexible entre los huesos dentario y postdentario de la mandíbula inferior. Esta articulación funcionaba como un amortiguador que distribuía la fuerza del mordisco y permitía que la mandíbula se flexionara ligeramente, adaptándose a presas de diferentes tamaños. El paleontólogo Andrea Cau calculó que la fuerza de mordida de Herrerasaurus era de aproximadamente 400 newtons, comparable a la de un lobo gris moderno de tamaño similar.' },
    ],
    fact: 'La Formación Ischigualasto tiene 700 metros de espesor y representa unos 5 millones de años de deposición sedimentaria durante el Triásico tardío (entre 231 y 226 millones de años). Los sedimentos incluyen areniscas, limolitas y arcillas depositadas por ríos y lagos en un clima semi-árido con estaciones húmedas y secas marcadas. En 2010, un equipo argentino-estadounidense documentó que los dinosaurios aumentaron su abundancia relativa del 6% al 15% de la fauna a lo largo de la secuencia, un registro directo de la expansión gradual del grupo.',
  },
  {
    id: 'rivales-triasico',
    title: 'Rivales del Triásico',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/dinos_m1.png',
    image: '/assets/dinosaurios/dinos_m1.png',
    content: [
      'Durante el Triásico tardío, los dinosaurios no eran los animales dominantes sino una minoría dentro de ecosistemas controlados por otros grupos de reptiles. Los rauisuquios (Rauisuchia) eran los superpredadores del Triásico: reptiles cuadrúpedos con posturas erguidas que podían alcanzar 7 metros de longitud. Saurosuchus galilei, descubierto en la Formación Ischigualasto de Argentina, medía entre 6 y 7 metros de largo y pesaba unos 400 kilogramos. Su cráneo de 60 centímetros estaba equipado con dientes lateralmente comprimidos y serrados, optimizados para cortar carne.',
      'Los aetosaurios (Aetosauria) representaban otro grupo exitoso. Eran reptiles herbívoros blindados con una armadura de placas óseas llamadas osteodermos que cubrían su espalda, flancos y vientre. Aetosauroides scagliai, encontrado en Argentina y Brasil, medía unos 2 metros de largo. Desarmosaurus, otro aetosaurio, tenía espinas laterales prominentes como defensa contra depredadores. Estos animales ocupaban el nicho ecológico que luego heredarían los dinosaurios blindados como Ankylosaurus en el Cretácico, más de 100 millones de años después.',
      'Los cinodontes (Cynodontia) eran los ancestros de los mamíferos modernos y durante el Triásico alcanzaron una diversidad notable. Exaeretodon frenguellii, un cinodonte herbívoro de hasta 1.8 metros de largo encontrado en Argentina y Brasil, tenía dientes complejos con múltiples cúspides para procesar vegetación, similares a los molares de los mamíferos. Su mandíbula muestra una articulación intermedia entre la de los reptiles y la de los mamíferos, documentando un paso evolutivo clave. Los cinodontes carnívoros como Chiniquodon eran depredadores ágiles del tamaño de un perro.',
      'Los rhynchosaurios (Rhynchosauria) fueron los herbívoros más abundantes del Triásico medio y tardío. Hyperodapedon, un rhynchosaurio de 1.3 metros de largo, constituía hasta el 40% de los vertebrados en algunos yacimientos del Triásico tardío. Tenían picos similares a los de los loros modernos y baterías de dientes especializados para triturar semillas y frutos de plantas semilleras. Su éxito ecológico estaba vinculado a la abundancia de Dicroidium, un helecho con semillas que dominaba la flora del Triásico austral.',
      'La coexistencia de estos grupos con los dinosaurios demuestra que el éxito evolutivo no fue automático ni predestinado. Los primeros dinosaurios ocupaban nichos de depredadores medianos y omnívoros pequeños. Los censos faunísticos realizados por Max Langer de la Universidad de São Paulo y sus colaboradores, publicados en Biological Reviews en 2010, documentaron que los dinosaurios representaban solo entre el 5% y el 15% de las comunidades de vertebrados del Triásico tardío. No fue hasta la extinción masiva del final del Triásico, hace 201 millones de años, que los dinosaurios tuvieron la oportunidad de diversificarse y llenar los nichos dejados vacíos por sus competidores extintos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Saurosuchus galilei fue nombrado en honor al astrónomo Galileo Galilei porque fue descubierto durante el Año Geofísico Internacional de 1958. Su nombre completo significa "lagarto reptil de Galileo". A pesar de su apariencia similar a los dinosaurios carnívoros, Saurosuchus estaba más emparentado con los cocodrilos actuales. Si lo vieras caminando, notarías que sus patas se ubicaban directamente bajo el cuerpo, no a los lados como en los cocodrilos modernos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los cinodontes desarrollaron un paladar secundario, una placa ósea que separa la cavidad nasal de la boca, permitiendo respirar mientras comen. Los mamíferos heredaron esta estructura. También desarrollaron pelo, glándulas sudoríparas y posiblemente sangre caliente durante el Triásico, aunque estos tejidos blandos rara vez se fosilizan. La evidencia proviene de canales vasculares en los huesos faciales que transportaban sangre a los folículos del bigote, identificados mediante tomografía en cráneos de cinodontes triásicos.' },
    ],
    fact: 'En la Formación Santa María de Brasil, el paleontólogo Max Langer descubrió que la proporción de dinosaurios frente a no-dinosaurios cambia según la capa geológica. En las capas más antiguas (Secuencia Ladiniense, ~235 Ma), no hay dinosaurios. En las capas intermedias (~233 Ma), los dinosaurios representan el 5% de la fauna. En las capas superiores (~225 Ma), alcanzan el 30%. Este patrón documenta directamente la expansión gradual de los dinosaurios durante un período de aproximadamente 10 millones de años, contradiciendo la idea de un reemplazo rápido.',
  },
  {
    id: 'triunfo-dinosaurios',
    title: 'El Triunfo de los Dinosaurios',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/dinos_m1.png',
    image: '/assets/dinosaurios/dinos_m1.png',
    content: [
      'Hace 201.3 millones de años, al final del período Triásico, una nueva extinción masiva sacudió el planeta. Este evento, conocido como la extinción del Triásico-Jurásico, eliminó aproximadamente al 76% de todas las especies, incluyendo a la mayoría de los competidores de los dinosaurios. Los rauisuquios, los aetosaurios, los fitosaurios y la mayor parte de los grandes arcosaurios no dinosaurianos desaparecieron. Los dinosaurios, que habían sido actores secundarios durante 30 millones de años, heredaron un mundo vacío y comenzaron su período de dominio que duraría 135 millones de años.',
      'La causa principal de la extinción del Triásico-Jurásico fue la actividad volcánica de la Provincia Magmática del Atlántico Central (CAMP), la mayor provincia volcánica del Fanerozoico. Las erupciones de CAMP cubrieron más de 11 millones de kilómetros cuadrados con lava basáltica, produciendo un volumen estimado de 2-3 millones de kilómetros cúbicos de magma. Los basaltos de CAMP se encuentran hoy en cuatro continentes: Norteamérica oriental, Europa occidental, África noroccidental y el norte de Sudamérica, reflejando las tierras que rodeaban la fractura incipiente del Atlántico.',
      'La geocronóloga Tereza Blackburn y sus colaboradores del MIT publicaron en Science en 2013 un estudio que dató las erupciones de CAMP con precisión de decenas de miles de años utilizando el método uranio-plomo. Sus resultados demostraron que la primera fase eruptiva ocurrió casi simultáneamente con el inicio de la extinción, hace 201.564 ± 0.015 millones de años. Las erupciones liberaron cantidades masivas de CO₂ y SO₂, provocando un calentamiento global de 3-6°C, acidificación oceánica y perturbaciones del ciclo del carbono documentadas en los registros isotópicos.',
      'Tras la extinción, los dinosaurios experimentaron una diversificación rápida durante el Jurásico temprano. Los terópodos evolucionaron hacia depredadores de mayor tamaño, como Dilophosaurus (6 metros). Los sauropodomorfos crecieron hasta convertirse en los primeros herbívoros de gran tamaño, con formas como Vulcanodon (6-7 metros) apareciendo en los primeros millones de años del Jurásico. Los ornitisquios también se diversificaron, ocupando nichos de herbívoros medianos. En un período de solo 10-15 millones de años, los dinosaurios pasaron de ser el 15% de la fauna a constituir más del 90% de los grandes vertebrados terrestres.',
      'La pregunta de por qué los dinosaurios sobrevivieron mientras sus competidores perecieron no tiene una respuesta definitiva. Una hipótesis propuesta por Stephen Brusatte de la Universidad de Edimburgo sugiere que la postura erguida, el metabolismo elevado y la capacidad respiratoria eficiente (gracias a sacos aéreos similares a los de las aves) dieron a los dinosaurios mayor resistencia a las condiciones de estrés ambiental. Otra posibilidad es que fue simple contingencia evolutiva: los dinosaurios tuvieron la suerte de encontrarse en los nichos ecológicos correctos cuando llegó la crisis. Sea cual sea la razón, el inicio del Jurásico marcó el comienzo de la Era de los Dinosaurios, un dominio que se extendería hasta hace 66 millones de años.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las huellas fósiles (icnofósiles) del límite Triásico-Jurásico cuentan una historia clara. En las rocas del Triásico tardío de la Cuenca de Hartford, Connecticut, las huellas son pequeñas y diversas, con marcas de rauisuquios, dinosaurios y otros reptiles. Justo después del límite de extinción, las únicas huellas grandes que aparecen son de dinosaurios terópodos, y son significativamente más grandes que las del Triásico. Paul Olsen documentó este cambio en un estudio publicado en Science en 2002.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los sacos aéreos de los dinosaurios terópodos son detectables en el registro fósil porque dejan marcas características en los huesos llamadas "neumaticidad ósea". Las cavidades llenas de aire dentro de las vértebras y costillas reducían el peso del esqueleto y mejoraban la eficiencia respiratoria. En 2005, Patrick OConnor y Leon Claessens demostraron que al menos los dinosaurios terópodos carnívoros poseían un sistema de sacos aéreos comparable al de las aves modernas, lo que les habría permitido mantener niveles de actividad elevados.' },
    ],
    fact: 'La extinción del Triásico-Jurásico fue tan rápida que los paleontólogos pueden medirla en capas de roca de solo unos pocos metros de espesor. En la sección de St. Audrie Bay, en Somerset, Inglaterra, el paleontólogo Michael Simms documentó que el 95% de las especies de bivalvos marinos desaparecen en un intervalo sedimentario de menos de 2 metros, lo que corresponde a un período de entre 10,000 y 40,000 años. Para el tiempo geológico, esto es prácticamente instantáneo, comparable en velocidad a la extinción del Cretácico provocada por el asteroide.',
  },
];

// ——— Triassic Particle Field (Canvas Background) ——————————————————————
function TriassicField() {
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
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      o: Math.random() * 0.35 + 0.08,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.12,
      hue: ['93,138,104', '193,120,41', '107,142,150', '139,94,60'][Math.floor(Math.random() * 4)],
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.15;
        p.x += p.drift;
        p.y -= 0.06;
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

// ——— Triassic Header ——————————————————————————————————————————
function TriassicHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#triassicGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 era markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#C17829','#8B5E3C','#6B8E96','#5D8A68','#A67B3D','#7D6B99','#3E7C8B'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central fossil icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="8" fill="none" stroke="#5D8A68" strokeWidth="1" opacity="0.4" />
        <circle cx="300" cy="30" r="3" fill="#5D8A68" opacity="0.5" />
        <line x1="300" y1="16" x2="300" y2="22" stroke="#5D8A68" strokeWidth="1" opacity="0.4" />
        <line x1="300" y1="38" x2="300" y2="44" stroke="#5D8A68" strokeWidth="1" opacity="0.4" />
        <defs>
          <linearGradient id="triassicGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(193,120,41,0.9)" />
            <stop offset="100%" stopColor="rgba(62,124,139,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#C17829" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL AMANECER DEL TRIÁSICO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(193,120,41,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL ORIGEN DE LOS DINOSAURIOS</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(93,138,104,0.2)'}`,
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
          layoutId="activeDotDinosM1"
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

// ——— Expandable Section with Random Direction ————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
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

// ——— Progress Bar ————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(93,138,104,0.15)',
    }}>
      <Star size={14} style={{ color: '#5D8A68', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5D8A68, #C17829)', borderRadius: '3px', boxShadow: '0 0 8px rgba(93,138,104,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5D8A68', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_DinosM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/dinosaurios/dinos_m1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(93,138,104,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <TriassicField />

      <TriassicHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(93,138,104,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(93,138,104,0.08)', borderRadius: '16px',
              border: '1px solid rgba(93,138,104,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5D8A68', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado el Amanecer del Triásico!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Explorador del Triásico
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
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
