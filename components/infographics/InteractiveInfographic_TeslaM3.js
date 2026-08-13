'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Tesla / Electricity themed) ────────────────────
function DecoTeslaCoil({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Coil base */}
      <rect x="24" y="45" width="12" height="8" rx="2" fill={color} opacity="0.3" />
      {/* Coil windings */}
      {[0,1,2,3,4,5,6].map((i) => (
        <ellipse key={i} cx="30" cy={42 - i * 4} rx={14 - i * 1.2} ry="3" fill="none" stroke={color} strokeWidth="1" opacity={0.3 + i * 0.05} />
      ))}
      {/* Top electrode */}
      <circle cx="30" cy="10" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="10" r="2" fill={color} opacity="0.4" />
      {/* Sparks from top */}
      <line x1="25" y1="7" x2="18" y2="3" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="35" y1="7" x2="42" y2="3" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  );
}

function DecoLightningBolt({ size = 70, color = '#D4A535', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <path d="M32 5 L22 28 L30 28 L20 55 L42 24 L32 24 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Sparks */}
      <circle cx="15" cy="20" r="1.5" fill={color} opacity="0.5" />
      <circle cx="45" cy="15" r="1" fill={color} opacity="0.4" />
      <circle cx="48" cy="35" r="1.5" fill={color} opacity="0.5" />
      <circle cx="12" cy="40" r="1" fill={color} opacity="0.4" />
      {/* Energy arcs */}
      <path d="M18 15 Q12 20 16 25" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M42 32 Q48 37 44 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoWaveform({ size = 80, color = '#7A8B96', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Standing wave pattern */}
      <path d="M5 20 Q12 5 20 20 Q28 35 35 20 Q42 5 50 20 Q58 35 65 20 Q72 5 75 20" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Nodes on wave */}
      {[5, 20, 35, 50, 65, 75].map((x, i) => (
        <circle key={i} cx={x} cy="20" r="2" fill={color} opacity="0.5" />
      ))}
      {/* Ground line */}
      <line x1="5" y1="36" x2="75" y2="36" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoNotebook({ size = 60, color = '#C49225', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Book outline */}
      <rect x="12" y="8" width="36" height="44" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Spine */}
      <line x1="18" y1="8" x2="18" y2="52" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Text lines */}
      {[16, 22, 28, 34, 40].map((y, i) => (
        <line key={i} x1="22" y1={y} x2={40 - i * 2} y2={y} stroke={color} strokeWidth="0.8" opacity="0.3" />
      ))}
      {/* Circuit sketch */}
      <path d="M24 44 L30 44 L30 48 L36 48" fill="none" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <circle cx="38" cy="48" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoMountain({ size = 70, color = '#8A9AA6', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 49" style={{ opacity: 0.2, ...style }}>
      {/* Mountain silhouette */}
      <path d="M5 45 L20 15 L28 28 L35 10 L45 30 L50 18 L65 45 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      {/* Snow caps */}
      <path d="M33 14 L35 10 L37 14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M18 19 L20 15 L22 19" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Lightning over mountain */}
      <path d="M42 3 L40 8 L43 8 L39 14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      {/* Stars */}
      <circle cx="12" cy="6" r="1" fill={color} opacity="0.4" />
      <circle cx="55" cy="5" r="0.8" fill={color} opacity="0.3" />
      <circle cx="28" cy="3" r="1.2" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoTransmitter({ size = 70, color = '#B88420', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tower structure */}
      <line x1="30" y1="55" x2="30" y2="15" stroke={color} strokeWidth="2" opacity="0.4" />
      <line x1="22" y1="55" x2="30" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="38" y1="55" x2="30" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Dome */}
      <path d="M20 15 Q30 2 40 15" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="20" y1="15" x2="40" y2="15" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Emanating waves */}
      {[20, 26, 32].map((r, i) => (
        <path key={i} d={`M${30-r} 12 Q30 ${12 - r * 0.3} ${30+r} 12`} fill="none" stroke={color} strokeWidth="0.8" opacity={0.3 - i * 0.07} />
      ))}
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'mision-colorado': [DecoMountain, DecoTeslaCoil, DecoLightningBolt],
  'laboratorio-loco': [DecoTeslaCoil, DecoMountain, DecoTransmitter],
  'rayos-artificiales': [DecoLightningBolt, DecoTeslaCoil, DecoWaveform],
  'ondas-estacionarias': [DecoWaveform, DecoLightningBolt, DecoNotebook],
  'transmision-inalambrica': [DecoTransmitter, DecoWaveform, DecoTeslaCoil],
  'cuadernos-colorado': [DecoNotebook, DecoMountain, DecoTransmitter],
  'legado-cientifico': [DecoTransmitter, DecoLightningBolt, DecoNotebook],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Carlson, W.B. (2013). Tesla: Inventor of the Electrical Age, Princeton University Press',
  'Tesla, N. (1904). The Transmission of Electrical Energy Without Wires, Electrical World and Engineer',
  'Seifer, M.J. (1996). Wizard: The Life and Times of Nikola Tesla, Citadel Press',
  'Uth, R. (2000). Tesla: Master of Lightning, PBS / New Voyage Communications',
  'Tesla, N. (1978). Colorado Springs Notes, 1899-1900, Nolit (Publicado póstumamente, editado por A. Marinčić)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'mision-colorado',
    title: 'La Misión en Colorado',
    color: '#6B7B8A',
    btnImage: '/assets/tesla/tesla_m3.png',
    image: '/assets/tesla/tesla_m3.png',
    content: [
      'En mayo de 1899, Nikola Tesla abandonó su laboratorio de Nueva York en la calle Houston y emprendió un viaje hacia el oeste de Estados Unidos con un objetivo definido: necesitaba un lugar aislado, con aire seco y a gran altitud, donde pudiera realizar experimentos eléctricos de alta tensión sin poner en riesgo a la población urbana. Colorado Springs, en el estado de Colorado, cumplía todos estos requisitos. La ciudad se encontraba a 1,839 metros sobre el nivel del mar, lo que significaba que el aire era más delgado y menos denso, una condición que Tesla sabía facilitaría las descargas eléctricas de largo alcance.',
      'El financiamiento para esta expedición provino en gran parte de John Jacob Astor IV, heredero de una de las fortunas más grandes de Estados Unidos y propietario del hotel Waldorf-Astoria en Nueva York. Astor invirtió 30,000 dólares de la época (equivalentes a más de un millón de dólares actuales) en los experimentos de Tesla. Leonard Curtis, abogado y amigo de Tesla en Colorado Springs, le consiguió el uso gratuito de electricidad de la compañía eléctrica local, El Paso Electric Company, además de ayudarle a encontrar el terreno apropiado para construir su laboratorio en las afueras de la ciudad.',
      'Tesla eligió Colorado Springs por varias razones técnicas precisas. La altitud elevada reducía la presión atmosférica, lo que permitía que las descargas eléctricas viajaran distancias mayores antes de disiparse. La región experimentaba tormentas eléctricas frecuentes durante el verano, lo que le permitiría estudiar los rayos naturales y comparar sus características con los rayos artificiales que planeaba generar. Además, la zona estaba poco poblada, lo que reducía el riesgo de causar daños a personas o propiedades durante sus pruebas con voltajes que superarían los millones de voltios.',
      'La llegada de Tesla a Colorado Springs fue noticia local. El Gazette Telegraph reportó que un famoso inventor establecería un laboratorio experimental en las afueras de la ciudad. Tesla se alojó en el hotel Alta Vista y comenzó la construcción de su laboratorio en un terreno abierto cerca de la intersección de las actuales calles Foote y Kiowa. La construcción comenzó a finales de mayo de 1899 y el laboratorio estuvo operativo a principios de junio, un ritmo de construcción que reflejaba la urgencia de Tesla por comenzar sus investigaciones antes de la temporada de tormentas eléctricas del verano.',
      'El plan de Tesla era ambicioso y estaba estructurado en tres fases. Primero, estudiaría las propiedades eléctricas de la atmósfera y la tierra a gran altitud. Segundo, construiría un transmisor capaz de generar voltajes sin precedentes para probar la transmisión inalámbrica de energía. Tercero, intentaría demostrar que la Tierra misma podía funcionar como un conductor eléctrico resonante, una idea que, de confirmarse, revolucionaría la distribución mundial de energía eléctrica. Tesla permaneció en Colorado Springs ocho meses, de mayo de 1899 a enero de 1900, un período breve pero de una productividad científica notable.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'John Jacob Astor IV, el financiador de los experimentos de Tesla en Colorado Springs, era también un inventor aficionado y escritor de ciencia ficción. Publicó en 1894 la novela "A Journey in Other Worlds", que describía viajes al espacio y a otros planetas. Astor murió el 15 de abril de 1912 en el hundimiento del Titanic, donde era el pasajero más rico a bordo, con una fortuna estimada en 87 millones de dólares de la época.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La altitud de Colorado Springs (1,839 m) reduce la presión atmosférica a aproximadamente 81 kilopascales, frente a los 101.3 kilopascales al nivel del mar. Esta diferencia del 20% significa que la rigidez dieléctrica del aire disminuye proporcionalmente: un voltaje dado puede producir una chispa más larga en Colorado Springs que en Nueva York. Para Tesla, esto significaba que sus bobinas podían generar descargas más extensas con la misma potencia de entrada.' },
    ],
    fact: 'Tesla registró meticulosamente cada gasto de su expedición a Colorado Springs. Sus cuentas muestran pagos de $2.50 diarios por su habitación en el hotel, $100 mensuales por el alquiler del terreno del laboratorio, y compras detalladas de materiales como 500 metros de cable de cobre calibre 8, transformadores especiales encargados a la Westinghouse Electric Company, y un mástil de madera de 60 metros fabricado por una empresa local de postes telefónicos. El costo total del proyecto superó los $100,000 dólares de 1899.',
  },
  {
    id: 'laboratorio-loco',
    title: 'El Laboratorio Más Loco del Mundo',
    color: '#D4A535',
    btnImage: '/assets/tesla/tesla_m3.png',
    image: '/assets/tesla/tesla_m3.png',
    content: [
      'El laboratorio de Tesla en Colorado Springs era una estructura singular que no se parecía a ningún otro edificio científico de su época. Era un granero de madera de aproximadamente 18 por 25 metros, con techo a dos aguas, pero con una particularidad que lo distinguía de cualquier edificio en cientos de kilómetros a la redonda: un mástil retráctil de madera de unos 43 metros de altura que sobresalía del techo, coronado por una esfera de cobre de un metro de diámetro. El mástil era telescópico y podía subirse o bajarse según las necesidades del experimento, y funcionaba como terminal de descarga para las enormes corrientes que Tesla generaría dentro del edificio.',
      'El interior del laboratorio estaba dominado por la pieza central de todo el proyecto: una bobina de Tesla de proporciones que no se habían intentado antes. La bobina primaria era un anillo de 15 metros de diámetro hecho de grueso cable de cobre, montado sobre una valla circular de madera de aproximadamente un metro de altura. Dentro de este anillo primario se encontraba la bobina secundaria, de menor diámetro pero con cientos de vueltas de cable más fino, cuidadosamente aislado. El conjunto formaba lo que Tesla denominó su "transmisor amplificador" (magnifying transmitter), un dispositivo diseñado para generar voltajes del orden de millones de voltios a través del principio de resonancia electromagnética.',
      'Para alimentar su bobina, Tesla necesitaba cantidades enormes de electricidad. El Paso Electric Company le proporcionó una línea dedicada capaz de suministrar hasta 300 kilovatios de potencia, una cifra que representaba una fracción considerable de la capacidad total de generación de la compañía eléctrica local en aquel momento. Tesla instaló transformadores especiales fabricados por Westinghouse que elevaban el voltaje de entrada a 40,000 voltios antes de alimentar la bobina primaria. Un banco de condensadores almacenaba la energía y la descargaba en pulsos sincronizados a través de un interruptor rotativo de su propio diseño.',
      'Las precauciones de seguridad eran considerables para la época, aunque primitivas según los estándares actuales. Las paredes interiores del laboratorio estaban forradas con fieltro grueso para aislar contra las descargas eléctricas que podrían saltar desde la bobina hacia las estructuras metálicas del edificio. Tesla y su asistente Kolman Czito usaban zapatos con suelas de corcho gruesas de más de dos centímetros para aislarse del suelo, que se electrificaba durante los experimentos. Un letrero en la puerta del laboratorio advertía: "PELIGRO — No entrar — Gran peligro", una advertencia que los curiosos locales no siempre respetaban.',
      'El equipo secundario del laboratorio incluía instrumentos de medición que Tesla diseñó específicamente para este proyecto. Construyó un detector de ondas electromagnéticas extremadamente sensible basado en un coherer modificado, capaz de registrar señales eléctricas a distancias de cientos de kilómetros. También fabricó un dispositivo de medición de campo eléctrico que conectaba al suelo a través de una placa de metal enterrada a varios metros de profundidad. Tesla documentó cada pieza del equipo en sus cuadernos de laboratorio, con esquemas técnicos detallados y listas de componentes que permiten reconstruir sus aparatos con precisión científica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Kolman Czito, el asistente principal de Tesla en Colorado Springs, era un ingeniero mecánico de origen serbio que trabajó con Tesla durante más de una década. Czito construyó gran parte del equipo del laboratorio con sus propias manos, siguiendo las instrucciones verbales de Tesla, quien rara vez dibujaba planos formales. Czito describió más tarde que Tesla tenía la capacidad de visualizar máquinas completas en su mente con tal detalle que podía indicar las dimensiones exactas de cada pieza de memoria.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El transmisor amplificador de Tesla operaba a una frecuencia de resonancia de aproximadamente 150 kilohercios. A esta frecuencia, la longitud de onda electromagnética es de unos 2,000 metros. La bobina secundaria de Tesla estaba diseñada para que su longitud eléctrica coincidiera con un cuarto de esta longitud de onda, lo que maximizaba la transferencia de energía por resonancia. Este mismo principio de resonancia de cuarto de onda se utiliza hoy en antenas de radio y telecomunicaciones modernas.' },
    ],
    fact: 'El laboratorio de Tesla en Colorado Springs fue demolido en 1904 después de que Tesla no pudiera pagar las deudas acumuladas con los proveedores locales. La madera, los cables de cobre y los componentes fueron vendidos o desechados. El terreno donde se ubicaba el laboratorio (en la intersección actual de Foote Avenue y Kiowa Street) está hoy marcado con una placa conmemorativa instalada en 2014, pero no queda ningún resto físico de la estructura original. Fotografías del laboratorio, tomadas por el fotógrafo Dickenson Alley en 1899, son las únicas evidencias visuales de su existencia.',
  },
  {
    id: 'rayos-artificiales',
    title: 'Rayos Artificiales',
    color: '#7A8B96',
    btnImage: '/assets/tesla/tesla_m3.png',
    image: '/assets/tesla/tesla_m3.png',
    content: [
      'El logro más visible y documentado de Tesla en Colorado Springs fue la generación de rayos artificiales de dimensiones sin precedentes. El 4 de julio de 1899, durante una prueba nocturna, Tesla activó su transmisor amplificador a máxima potencia y produjo descargas eléctricas que se extendieron desde la esfera de cobre del mástil hasta una distancia estimada de 40 metros, aproximadamente la longitud de cuatro autobuses escolares puestos en fila. Estas descargas producían un estruendo que podía oírse a una distancia de 24 kilómetros, comparable al sonido de un trueno, según los testimonios recogidos por periódicos locales de la época.',
      'Los voltajes involucrados eran del orden de 12 millones de voltios, medidos indirectamente por Tesla a través de la longitud de las descargas y la rigidez dieléctrica del aire a la altitud de Colorado Springs. Para poner esta cifra en contexto, un rayo natural típico transporta unos 300 millones de voltios, pero durante un intervalo de apenas 30 microsegundos. Las descargas de Tesla, aunque de menor voltaje, podían mantenerse durante períodos más prolongados y eran controlables, algo que ningún rayo natural permite. Tesla podía ajustar la frecuencia, la duración y la intensidad de sus descargas modificando los parámetros de su circuito resonante.',
      'Las consecuencias de estos experimentos sobre la infraestructura eléctrica local fueron significativas y documentadas. Durante una de las pruebas de alta potencia, la demanda de corriente del transmisor de Tesla sobrecargó el generador de la compañía El Paso Electric, quemando las bobinas del generador y dejando a toda la ciudad de Colorado Springs sin electricidad. La compañía eléctrica exigió a Tesla que reparara el generador con sus propios recursos antes de reconectarle el suministro. Tesla cumplió, pero el incidente deterioró su relación con la compañía y limitó sus experimentos posteriores a potencias menores.',
      'Las fotografías más conocidas del laboratorio de Colorado Springs fueron tomadas por Dickenson Alley y muestran a Tesla sentado calmamente en una silla leyendo un libro mientras enormes descargas eléctricas cruzan el aire a su alrededor. Estas imágenes, que se han reproducido millones de veces, son en realidad exposiciones múltiples: Tesla posó en la silla con la bobina apagada y luego se tomó una segunda fotografía con la bobina encendida y la silla vacía. Las dos imágenes se combinaron en el cuarto oscuro. Tesla nunca habría sobrevivido a estar sentado junto a descargas de esa magnitud, dado que corrientes de apenas 100 miliamperios pueden ser letales para un ser humano.',
      'Más allá del valor demostrativo de los rayos artificiales, estos experimentos tenían un propósito científico concreto. Tesla estaba midiendo la capacidad de la atmósfera para conducir corrientes eléctricas de alta frecuencia y analizando cómo las descargas interactuaban con el suelo y el aire circundante. Sus mediciones mostraron que las corrientes de alta frecuencia se comportaban de manera diferente a las corrientes de baja frecuencia: tendían a viajar por la superficie de los conductores (un fenómeno conocido como efecto piel, descrito por Lord Kelvin en 1887) y podían inducir corrientes en objetos distantes a través de la resonancia electromagnética.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las descargas eléctricas de Tesla en Colorado Springs causaron efectos curiosos en los alrededores del laboratorio. Según testimonios recogidos por el periódico local, los caballos en establos cercanos recibían pequeñas descargas a través de sus herraduras metálicas y se negaban a acercarse al laboratorio. Las personas que caminaban cerca reportaban que podían sentir hormigueo en los pies y ver chispas saltando entre sus zapatos y el suelo. Las mariposas que volaban cerca del mástil quedaban rodeadas de un resplandor azulado, un efecto corona visible a simple vista.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El efecto piel (skin effect) que Tesla observó en Colorado Springs describe cómo las corrientes alternas de alta frecuencia tienden a fluir por la superficie exterior de un conductor, no por su interior. A una frecuencia de 150 kHz (la frecuencia de operación de Tesla), la profundidad de penetración en cobre es de solo 0.17 milímetros. Esto explica por qué Tesla usaba tubos huecos de cobre en lugar de cables sólidos para sus bobinas de alta frecuencia, ahorrando material sin perder conductividad efectiva.' },
    ],
    fact: 'La longitud de 40 metros de las descargas de Tesla permanece como un récord para descargas eléctricas generadas por una bobina de Tesla. Las bobinas de Tesla modernas más grandes, como las construidas por Greg Leyh del grupo Lightning on Demand, producen descargas de hasta 10 metros. Incluso las máquinas de Marx usadas en laboratorios de alto voltaje para simular rayos (como las del Instituto de Investigación de Alta Tensión de Istra, Rusia) generan descargas de unos 150 metros, pero son máquinas industriales del tamaño de un edificio, no bobinas de resonancia.',
  },
  {
    id: 'ondas-estacionarias',
    title: 'Ondas Estacionarias Terrestres',
    color: '#C49225',
    btnImage: '/assets/tesla/tesla_m3.png',
    image: '/assets/tesla/tesla_m3.png',
    content: [
      'Uno de los descubrimientos más significativos que Tesla reportó haber hecho en Colorado Springs fue la detección de lo que él denominó "ondas estacionarias terrestres". Durante una tormenta eléctrica nocturna el 3 de julio de 1899, Tesla conectó su equipo de medición ultrasensible al suelo y observó un patrón repetitivo en las señales eléctricas que registraba: después de cada rayo distante, detectaba no solo el pulso inicial, sino una serie de ecos que se repetían a intervalos regulares, con intensidad decreciente. Tesla interpretó esto como evidencia de que las ondas electromagnéticas generadas por el rayo viajaban a través de la Tierra, rebotaban en el lado opuesto del planeta y regresaban al punto de origen.',
      'Esta observación llevó a Tesla a formular una hipótesis que era radical para su época: que la Tierra se comporta como un conductor esférico resonante con frecuencias naturales de vibración electromagnética determinadas por su circunferencia. Tesla calculó que la frecuencia fundamental de resonancia de la Tierra sería extremadamente baja, del orden de unos pocos hercios. Si se inyectaba corriente eléctrica al suelo a esta frecuencia precisa, las ondas se reforzarían constructivamente en cada viaje alrededor del planeta, acumulando energía como el sonido dentro de una campana que resuena. Esta idea era la base teórica de su proyecto de transmisión inalámbrica de energía a escala global.',
      'La validación parcial de las ideas de Tesla llegaría décadas después. En 1952, el físico alemán Winfried Otto Schumann predijo matemáticamente que la cavidad entre la superficie terrestre y la ionosfera debe tener frecuencias de resonancia electromagnética. La primera de estas frecuencias, conocida hoy como la resonancia de Schumann, es de aproximadamente 7.83 Hz. Esta frecuencia fue confirmada experimentalmente en 1954 por Schumann y su estudiante Herbert König. Aunque Tesla no midió esta frecuencia con exactitud, su observación de ondas estacionarias terrestres anticipó el descubrimiento de Schumann por más de 50 años.',
      'Es necesario distinguir entre lo que Tesla observó y lo que interpretó. Los ecos que Tesla detectó eran probablemente ondas electromagnéticas de extremadamente baja frecuencia (ELF) que se propagaban en la guía de ondas formada entre la superficie terrestre y la ionosfera, no a través del cuerpo sólido de la Tierra como Tesla creía. La conducción eléctrica a través de miles de kilómetros de roca y magma presenta una resistencia demasiado alta para ser práctica. Sin embargo, la cavidad Tierra-ionosfera sí funciona como una guía de ondas eficiente para frecuencias ELF, y este principio se utiliza hoy en comunicaciones militares con submarinos sumergidos, que pueden recibir señales ELF a grandes profundidades.',
      'Los registros de Tesla en sus cuadernos de Colorado Springs muestran diagramas detallados de las señales que detectó, con anotaciones sobre la periodicidad de los ecos y estimaciones de la velocidad de propagación. Tesla calculó que las ondas viajaban a aproximadamente la velocidad de la luz (300,000 km/s), lo que le permitió estimar la distancia recorrida por los ecos. Aunque sus cálculos contenían errores debido a las limitaciones de su equipo de medición, el concepto fundamental de la resonancia electromagnética terrestre era correcto. La Marina de los Estados Unidos construyó en 1989 el sistema de comunicaciones ELF en Clam Lake, Wisconsin, basado en el mismo principio de usar la Tierra como medio de transmisión.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La resonancia de Schumann a 7.83 Hz ha sido objeto de numerosas afirmaciones pseudocientíficas que la relacionan con la salud humana, la meditación y la "frecuencia de la Tierra". No existe evidencia científica revisada por pares que apoye estas afirmaciones. La resonancia de Schumann es un fenómeno electromagnético causado por los rayos que golpean la Tierra (unas 50 veces por segundo a nivel global), que generan ondas ELF que resuenan en la cavidad Tierra-ionosfera. Su frecuencia varía ligeramente con la actividad solar y las estaciones.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La cavidad Tierra-ionosfera actúa como una guía de ondas esférica con múltiples frecuencias de resonancia: 7.83, 14.3, 20.8, 27.3 y 33.8 Hz (los primeros cinco modos). Estas frecuencias dependen del radio de la Tierra (6,371 km) y la altura de la ionosfera (60-80 km). La señal más fuerte es la fundamental a 7.83 Hz, con una longitud de onda igual a la circunferencia terrestre (40,075 km). Los instrumentos modernos detectan estas resonancias con una amplitud de apenas 0.3 picoteslas.' },
    ],
    fact: 'El sistema de comunicaciones ELF de la Marina de EE.UU. en Clam Lake, Wisconsin, operaba a 76 Hz y usaba antenas de 22.5 kilómetros de largo tendidas sobre el suelo. A esta frecuencia, las ondas podían penetrar hasta 120 metros de profundidad en el agua de mar, permitiendo comunicaciones unidireccionales con submarinos nucleares sumergidos. El sistema operó desde 1989 hasta 2004, cuando fue reemplazado por tecnologías satelitales. Su velocidad de transmisión era extrema: apenas 3 caracteres por minuto, suficiente solo para enviar códigos breves de emergencia.',
  },
  {
    id: 'transmision-inalambrica',
    title: 'Transmisión Inalámbrica de Energía',
    color: '#8A9AA6',
    btnImage: '/assets/tesla/tesla_m3.png',
    image: '/assets/tesla/tesla_m3.png',
    content: [
      'El objetivo central de los experimentos de Tesla en Colorado Springs no era generar rayos artificiales ni estudiar tormentas: era demostrar la viabilidad de transmitir energía eléctrica sin cables a cualquier punto del planeta. Tesla denominó a su sistema de transmisión "World Wireless System" y lo consideraba su contribución más importante a la civilización, superior incluso a su sistema de corriente alterna. El concepto se basaba en usar la Tierra como conductor y la atmósfera como medio de retorno, creando un circuito eléctrico global que permitiría distribuir energía a través de ondas electromagnéticas de baja frecuencia.',
      'El dispositivo central de este sistema era el transmisor amplificador (magnifying transmitter), una evolución de la bobina de Tesla convencional que incluía un tercer circuito resonante adicional. Mientras que una bobina de Tesla estándar tiene dos circuitos acoplados (primario y secundario), el transmisor amplificador añadía un circuito extra conectado a una terminal elevada (el mástil con la esfera de cobre) y a una conexión a tierra profunda. Tesla afirmó que este tercer circuito permitía inyectar corriente directamente en la Tierra a la frecuencia de resonancia del planeta, amplificando la señal de manera progresiva con cada viaje alrededor del globo.',
      'Tesla realizó varios experimentos de transmisión de energía a distancia durante su estancia en Colorado Springs. El más citado es su afirmación de haber encendido 200 lámparas incandescentes sin cables a una distancia de 40 kilómetros del laboratorio. Sin embargo, esta afirmación nunca fue verificada por observadores independientes y ha sido cuestionada por físicos e historiadores de la ciencia. W. Bernard Carlson, biógrafo de Tesla, señala en su libro de 2013 que las lámparas probablemente estaban conectadas a un receptor resonante sintonizado a la frecuencia del transmisor, pero que la eficiencia de la transmisión a esa distancia habría sido extremadamente baja.',
      'La física moderna confirma que la transmisión inalámbrica de energía es técnicamente posible pero enfrenta limitaciones fundamentales. La transmisión por campo cercano (acoplamiento inductivo resonante) funciona eficientemente solo a distancias cortas, del orden de centímetros a unos pocos metros. Esta es la tecnología detrás del estándar Qi de carga inalámbrica de teléfonos, que opera a frecuencias de 110-205 kHz y alcanza eficiencias del 80-90% a distancias de hasta 4 centímetros. A distancias mayores, la eficiencia decae con el cubo de la distancia, haciendo la transmisión impráctica para los niveles de potencia que Tesla imaginaba.',
      'A pesar de las limitaciones, la visión de Tesla ha inspirado proyectos modernos de transmisión inalámbrica de energía a larga distancia. En 2008, un equipo del MIT liderado por Marin Soljačić demostró la transmisión inalámbrica eficiente de 60 vatios a 2 metros de distancia usando acoplamiento resonante de campo magnético. En 2015, la agencia espacial japonesa JAXA transmitió 1.8 kilovatios de potencia usando microondas a 55 metros de distancia, como parte de su proyecto de captación de energía solar desde el espacio. Estos avances representan pasos concretos hacia el tipo de futuro que Tesla vislumbró, aunque la escala global que él imaginó sigue siendo técnicamente inviable con la tecnología actual.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El estándar Qi de carga inalámbrica, presente en miles de millones de teléfonos y dispositivos, fue establecido en 2008 por el Wireless Power Consortium. El nombre "Qi" proviene del concepto chino de "energía vital que fluye". La tecnología usa exactamente el mismo principio de acoplamiento inductivo resonante que Tesla investigó en 1899, pero a una escala miniaturizada: donde Tesla usaba bobinas de 15 metros, un cargador Qi usa bobinas de apenas 3-4 centímetros de diámetro.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La eficiencia de la transmisión inalámbrica de energía por acoplamiento inductivo decae según la fórmula η ∝ (r/d)⁶ para campo cercano, donde r es el radio de la bobina y d es la distancia. Para campo lejano (ondas de radio), la potencia decae según la ley del inverso del cuadrado: P ∝ 1/d². A una distancia de 40 km con una antena omnidireccional, la densidad de potencia de un transmisor de 300 kW sería de apenas 1.5 microwatios por metro cuadrado, insuficiente para encender una lámpara convencional.' },
    ],
    fact: 'En 2020, la empresa neozelandesa Emrod demostró la transmisión inalámbrica de energía a larga distancia usando haces enfocados de microondas a 5.8 GHz. Su sistema transmite potencia del orden de kilovatios a distancias de hasta 200 metros con una eficiencia declarada del 70%. La compañía eléctrica Powerco de Nueva Zelanda comenzó pruebas piloto con esta tecnología en 2021 para suministrar electricidad a zonas rurales donde el tendido de cables es difícil. Es la primera aplicación comercial seria de transmisión inalámbrica de energía, 122 años después de los experimentos de Tesla en Colorado Springs.',
  },
  {
    id: 'cuadernos-colorado',
    title: 'Los Cuadernos de Colorado',
    color: '#B88420',
    btnImage: '/assets/tesla/tesla_m3.png',
    image: '/assets/tesla/tesla_m3.png',
    content: [
      'Durante sus ocho meses en Colorado Springs, Tesla mantuvo un registro detallado y meticuloso de todos sus experimentos, observaciones y cálculos en lo que hoy se conoce como los "Cuadernos de Colorado Springs" (Colorado Springs Notes). Este documento, que comprende más de 500 páginas manuscritas, es uno de los registros científicos más completos que se conservan de un inventor del siglo XIX. Las páginas contienen esquemas de circuitos, cálculos matemáticos, observaciones meteorológicas, mediciones de señales eléctricas, y descripciones narrativas de los experimentos realizados día a día, desde junio de 1899 hasta enero de 1900.',
      'Los cuadernos no fueron publicados durante la vida de Tesla. Después de su muerte en enero de 1943, el gobierno de Estados Unidos confiscó temporalmente sus papeles personales y documentos técnicos a través del FBI, en un operativo ordenado por la Oficina de Propiedad Extranjera (por el estatus de ciudadanía de Tesla como inmigrante serbio). Los documentos fueron examinados por John G. Trump, profesor de ingeniería eléctrica del MIT y tío del futuro presidente Donald Trump. El profesor Trump concluyó en su informe que los papeles de Tesla no contenían información aplicable a armas o tecnología militar, y los documentos fueron liberados y enviados al Museo Tesla en Belgrado, Yugoslavia.',
      'Los Cuadernos de Colorado Springs fueron publicados por primera vez en 1978 por la editorial Nolit de Belgrado, editados por el ingeniero eléctrico Aleksandar Marinčić. La publicación incluía reproducciones facsimilares de las páginas originales junto con transcripciones mecanografiadas y notas explicativas. Marinčić añadió comentarios técnicos que contextualizaban los experimentos de Tesla con el conocimiento científico moderno, señalando qué observaciones de Tesla eran correctas, cuáles contenían errores de cálculo, y cuáles permanecían sin resolver.',
      'El contenido de los cuadernos revela tanto la genialidad como las limitaciones de Tesla. Los cálculos de resonancia de sus circuitos son notablemente precisos y demuestran un dominio profundo de la teoría electromagnética. Sus observaciones sobre el comportamiento de corrientes de alta frecuencia anticiparon descubrimientos que no se formalizarían hasta décadas después. Sin embargo, los cuadernos también contienen afirmaciones que no pueden verificarse, como la recepción de "señales regulares" que Tesla interpretó como comunicaciones de origen extraterrestre (probablemente eran señales de radio natural de Júpiter, descubiertas oficialmente en 1955 por Bernard Burke y Kenneth Franklin).',
      'Los cuadernos incluyen más de 200 diagramas técnicos, desde esquemas simples de circuitos hasta planos detallados del transmisor amplificador. Tesla dibujaba con una precisión casi de ingeniero industrial, incluyendo dimensiones, materiales y especificaciones de cada componente. Los diagramas muestran la evolución de sus diseños a lo largo de los ocho meses, con modificaciones sucesivas que reflejan los resultados de cada experimento. Varios investigadores modernos han utilizado estos diagramas para reconstruir versiones a escala de los aparatos de Tesla, confirmando que muchos de sus diseños funcionaban según lo descrito en los cuadernos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las "señales de otro mundo" que Tesla reportó haber detectado en Colorado Springs en 1899 generaron titulares en periódicos de todo el mundo. Tesla describió haber recibido "impulsos numéricos regulares" — secuencias de uno, dos y tres pulsos — que no podía atribuir a fuentes terrestres. Los astrónomos modernos creen que Tesla detectó emisiones de radio decamétricas de Júpiter, causadas por la interacción del campo magnético del planeta con su luna Io. Si esta interpretación es correcta, Tesla fue la primera persona en detectar ondas de radio de origen extraterrestre.' },
      { label: 'Dato Científico', icon: 'atom', text: 'John G. Trump, el profesor del MIT que examinó los papeles de Tesla en 1943, era un experto en generadores de Van de Graaff y física de alto voltaje. Su informe oficial al FBI declaró que los documentos contenían "pensamientos y esfuerzos especulativos, filosóficos y algo promocionales" pero nada de valor militar inmediato. Trump desarrolló más tarde aplicaciones médicas de radiación de alto voltaje para el tratamiento del cáncer, un campo donde los principios de alta frecuencia de Tesla encontraron aplicación práctica décadas después.' },
    ],
    fact: 'El Museo Nikola Tesla en Belgrado, Serbia, que custodia los cuadernos originales de Colorado Springs junto con otros 160,000 documentos de Tesla, fue designado en 2003 como parte del programa Memoria del Mundo de la UNESCO. Los cuadernos originales están escritos en tinta negra sobre papel cuadriculado de tamaño carta, en una caligrafía pulcra y consistente que refleja la disciplina metódica de Tesla. Cada entrada está fechada y numerada secuencialmente, y Tesla raramente tachaba o corregía: si cometía un error, simplemente añadía una nota al margen con la corrección.',
  },
  {
    id: 'legado-cientifico',
    title: 'El Legado Científico',
    color: '#5A6B7A',
    btnImage: '/assets/tesla/tesla_m3.png',
    image: '/assets/tesla/tesla_m3.png',
    content: [
      'Evaluar el legado científico de los experimentos de Colorado Springs requiere separar cuidadosamente los logros verificables de las afirmaciones no comprobadas. Entre los logros verificables se encuentran: la generación de los rayos artificiales más largos producidos por una bobina resonante (40 metros), la demostración práctica de la resonancia electromagnética a escala industrial, la detección de fenómenos que anticiparon la resonancia de Schumann, y el perfeccionamiento de técnicas de alta frecuencia que encontrarían aplicación en radio, radar y telecomunicaciones. Estos logros están documentados en los cuadernos de Colorado Springs y han sido confirmados por análisis posteriores de físicos e ingenieros.',
      'Entre las afirmaciones no verificadas o exageradas se encuentran: la transmisión exitosa de energía a 40 kilómetros de distancia, la recepción de señales extraterrestres inteligentes, y la posibilidad práctica de distribuir energía eléctrica globalmente a través de la Tierra. La biografía de W. Bernard Carlson (2013) analiza estas afirmaciones con rigor documental y concluye que Tesla tendía a presentar sus resultados experimentales preliminares como logros consolidados, lo que dañó su credibilidad científica a largo plazo y contribuyó a la dificultad de obtener financiamiento para proyectos posteriores como la torre Wardenclyffe.',
      'La influencia de Tesla en la tecnología inalámbrica moderna es directa y documentable. La carga inalámbrica de dispositivos electrónicos (estándar Qi, adoptado por Apple, Samsung y otros fabricantes desde 2012) utiliza acoplamiento inductivo resonante, el mismo principio que Tesla investigó con su transmisor amplificador. La transmisión inalámbrica de potencia (WPT) es hoy un campo activo de investigación con aplicaciones en vehículos eléctricos: BMW, Mercedes-Benz y varias startups están desarrollando sistemas de carga inalámbrica para automóviles que operan a frecuencias de 85 kHz con eficiencias superiores al 90% a distancias de 10-25 centímetros.',
      'En el ámbito cultural, Tesla se ha convertido en un símbolo de la innovación no reconocida y del conflicto entre el idealismo científico y los intereses comerciales. La empresa Tesla, Inc. de Elon Musk adoptó su nombre en 2003 como tributo al inventor. La unidad de densidad de flujo magnético en el Sistema Internacional lleva su nombre desde 1960: un tesla (T) equivale a un weber por metro cuadrado. Para contextualizar, el campo magnético terrestre es de aproximadamente 50 microteslas, un imán de refrigerador produce unos 5 miloteslas, y las máquinas de resonancia magnética médica (MRI) operan a campos de 1.5 a 3 teslas.',
      'El contraste entre la realidad y el mito de Tesla es importante para la educación científica. Tesla fue un ingeniero e inventor de talento notable cuyas contribuciones a la corriente alterna, la radio y la tecnología de alta frecuencia son indiscutibles y transformaron la civilización. Sin embargo, la cultura popular tiende a exagerar sus logros y a atribuirle descubrimientos que no realizó o que existían solo como especulaciones no probadas. Entender esta diferencia entre ciencia verificable y narrativa popular es una lección valiosa: los científicos reales cometen errores, hacen afirmaciones exageradas y tienen limitaciones, y reconocer esto no disminuye sus logros genuinos sino que los humaniza y los hace más comprensibles para futuras generaciones de investigadores.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La empresa Tesla, Inc. no fue fundada por Elon Musk. Fue fundada en julio de 2003 por Martin Eberhard y Marc Tarpenning, ingenieros de Silicon Valley que eligieron el nombre como homenaje a Nikola Tesla. Musk se unió como inversor principal en febrero de 2004, aportando 6.5 millones de dólares en la Serie A de financiamiento, y fue nombrado presidente de la junta directiva. Musk asumió el rol de CEO en 2008. El primer modelo de Tesla Motors, el Roadster de 2008, usaba un motor de corriente alterna trifásico, heredero directo de la tecnología que Tesla patentó en 1888.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La unidad tesla (T) de densidad de flujo magnético fue adoptada oficialmente por la Conferencia General de Pesas y Medidas (CGPM) en 1960, durante la undécima reunión celebrada en París. Un tesla se define como el campo magnético que ejerce una fuerza de un newton sobre un conductor de un metro de longitud que transporta una corriente de un amperio perpendicular al campo. Los detectores de ondas gravitacionales como LIGO requieren aislar sus espejos de campos magnéticos por debajo de 10⁻¹⁴ tesla, una millonésima parte del campo magnético terrestre.' },
    ],
    fact: 'En 2018, un equipo de la Universidad de Stanford liderado por Shanhui Fan demostró la transmisión inalámbrica de energía a un objeto en movimiento, algo que Tesla propuso conceptualmente pero nunca logró. El sistema de Stanford transfiere 10 vatios de potencia a un receptor que se mueve a velocidades variables, ajustando automáticamente la frecuencia de resonancia para mantener la eficiencia. Esta tecnología tiene aplicaciones directas en la carga de vehículos eléctricos en movimiento y en la alimentación de implantes médicos dentro del cuerpo humano, dos áreas donde el sueño inalámbrico de Tesla se acerca más que nunca a la realidad práctica.',
  },
];

// ─── Electric Field (Canvas Background) ──────────────────────────────────────
function ElectricField() {
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
      hue: Math.random() > 0.5 ? '212,165,53' : '107,123,138', // marigold or storm grey
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

// ─── Colorado Springs Header ─────────────────────────────────────────────────
function ColoradoHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(212,165,53,0.3))' }}>
        {/* Electrical arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#teslaGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#6B7B8A','#D4A535','#7A8B96','#C49225','#8A9AA6','#B88420','#5A6B7A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central lightning icon */}
        <path d="M303 18 L297 30 L302 30 L296 42" fill="none" stroke="#D4A535" strokeWidth="2" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="300" cy="30" r="16" fill="none" stroke="#D4A535" strokeWidth="1.2" opacity="0.4" />
        <defs>
          <linearGradient id="teslaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(212,165,53,0.2)" />
            <stop offset="50%" stopColor="rgba(212,165,53,0.9)" />
            <stop offset="100%" stopColor="rgba(212,165,53,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#D4A535" fontSize="17" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">COLORADO SPRINGS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(212,165,53,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">EL LABORATORIO DE TESLA · 1899</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(212,165,53,0.2)'}`,
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
          layoutId="activeDotTeslaM3"
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

        {/* ─── Conditional Video ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} poster={node.video.poster} />
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
      border: '1px solid rgba(212,165,53,0.15)',
    }}>
      <Star size={14} style={{ color: '#D4A535', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #D4A535, #6B7B8A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(212,165,53,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#D4A535', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_TeslaM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,12,20,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/tesla/tesla_m3.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(212,165,53,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <ElectricField />

      <ColoradoHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(212,165,53,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(212,165,53,0.08)', borderRadius: '16px',
              border: '1px solid rgba(212,165,53,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#D4A535', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado todo el laboratorio de Colorado Springs!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Constructor de Bobinas
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
