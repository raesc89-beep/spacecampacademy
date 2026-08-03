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
    id: 'disco-protoplanetario',
    title: 'El Disco Protoplanetario',
    color: '#FF6B35',
    btnImage: '/assets/rocosos/infographic_m1/btn_disco-protoplanetario.jpg',
    image: '/assets/rocosos/infographic_m1/hero_disco-protoplanetario.jpg',
    content: [
      'Hace unos cuatro mil seiscientos millones de años, nuestro Sistema Solar era simplemente una gigante nube giratoria de gas y polvo cósmico flotando en la galaxia. Piensa en esta nube como una enorme masa de masa para pizza que un cocinero espacial empieza a hacer girar en el aire. A medida que la masa gira más y más rápido, se va aplastando hasta convertirse en un disco plano con un centro muy denso y brillante.',
      'En el centro exacto de este plato giratorio, la gravedad amontonó la mayor parte de la materia hasta encender el Sol primordial. Todo el material sobrante que no cayó en la estrella quedó atrapado en una rosquilla gigante de gas hidrógeno, helio y diminutos granos de polvo microscópico. Este halo giratorio es lo que los astrofísicos llaman el disco protoplanetario, la cuna dorada donde nacieron la Tierra y sus hermanos.',
      'Imagina que cada grano de polvo en este disco era más pequeño que un grano de sal marina o una mota de hollín en una chimenea. Sin embargo, estos granos contenían los ingredientes fundamentales para construir montañas, océanos y continentes enteros. La temperatura en el disco variaba de forma extrema: cerca del joven Sol hacía un calor abrasador, mientras que en los bordes exteriores reinaba un frío congelante.',
      'El viento solar soplaba con fuerza constante desde la joven estrella recién nacida, empujando los gases ligeros hacia las regiones lejanas del disco. Por esta razón, el anillo interior del Sistema Solar quedó limpio de grandes acumulaciones de gas, dejando únicamente materiales pesados, resistentes y rocosos capaces de soportar el calor intenso sin evaporarse en el espacio.',
      'Durante los primeros cientos de miles de años, el disco giró en perfecta armonía física, sirviendo como una pista de baile donde billones de partículas chocaban suavemente entre sí. Este baile cósmico inicial sentó las bases mecánicas para que la gravedad comenzara a construir estructuras cada vez más grandes, transformando el polvo fino en la sólida roca de los futuros planetas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los discos protoplanetarios no son solo teorías del pasado; telescopios modernos como ALMA en el desierto de Atacama han fotografiado discos reales alrededor de estrellas jóvenes en la constelación de Orión. Estas imágenes muestran anillos oscuros exactos donde planetas bebés están limpiando sus órbitas al absorber el polvo circundante en este preciso instante.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La masa total del disco protoplanetario original equivalía a solo un tres por ciento de la masa del Sol. Sin embargo, ese pequeño porcentaje contenía suficiente materia para fabricar todos los planetas, lunas, asteroides y cometas que conocemos hoy en día en nuestro vecindario cósmico.' }
    ],
    fact: 'El término "protoplanetario" proviene del griego "protos", que significa "primero". Indica que este disco de material primigenio precedió directamente a la existencia de cualquier planeta sólido en el universo.',
  },
  {
    id: 'condensacion-silicatos',
    title: 'Condensación de Silicatos',
    color: '#F7C59F',
    btnImage: '/assets/rocosos/infographic_m1/btn_condensacion-silicatos.jpg',
    image: '/assets/rocosos/infographic_m1/hero_condensacion-silicatos.jpg',
    content: [
      'A medida que la nube caliente del disco protoplanetario comenzó a enfriarse de forma gradual, ocurrió un fenómeno químico semejante a la condensación del vapor en el espejo de un baño. Cuando el vapor de agua toca el vidrio frío, se transforma en gotas líquidas. En el espacio primordial, los vapores de hierro, níquel y silicatos se enfriaron y solidificaron en diminutos cristales minerales flotantes.',
      'No todos los materiales se solidifican a la misma temperatura. Cerca del Sol, donde el calor superaba los mil quinientos grados Celsius, únicamente los metales pesados y los silicatos de alta densidad podían pasar de estado gaseoso a sólido. Es por esto que los materiales metálicos formaron los cimientos sólidos de la zona interior del Sistema Solar, creando la receta química de los planetas rocosos.',
      'Imagina estos primeros cristales de silicato como copos de nieve hechos de piedra y hierro en lugar de agua congelada. Volaban a miles de kilómetros por hora dentro de las corrientes de gas del disco, rozándose continuamente. Debido a la electricidad estática acumulada por el roce constante, las motas minerales comenzaron a atraerse y pegarse entre sí como pequeñas pelusas de polvo bajo una cama.',
      'La química mineral de esta época estuvo dominada por compuestos de titanio, aluminio, calcio y magnesio unidos con silicio y oxígeno. Estos elementos primordiales crearon los primeros granos de olivino y piroxeno, los mismos minerales oscuros y resistentes que hoy encontramos en el manto profundo de la Tierra y en las rocas basálticas de la Luna.',
      'Este proceso de condensación termodinámica seleccionó carefully qué elementos formarían cada planeta según su distancia al centro estelar. Los elementos ligeros como el helio y el hidrógeno permanecieron gaseosos en la zona interior, mientras que los silicatos pesados se amontonaron para dar origen a los futuros mundos rocosos de superficie sólida.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los meteoritos más antiguos caídos en la Tierra, conocidos como condritas carbonáceas, contienen pequeños granos de silicatos e inclusiones ricas en aluminio y calcio que son literalmente las primeras materias sólidas que se condensaron en la historia del Sistema Solar hace más de 4,567 millones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La fuerza electrostática, la misma energía que hace que un globo frotado en el cabello atraiga pequeños papeles, fue el mecanismo físico principal que permitió a los granos de polvo microscópicos unirse cuando la fuerza de gravedad aún era demasiado débil para atraerlos.' }
    ],
    fact: 'Los silicatos son el grupo mineral más abundante en la corteza terrestre. Representan más del noventa por ciento de las rocas de nuestro planeta y están formados por átomos de silicio y oxígeno organizados en estructuras tetraédricas extremadamente estables.',
  },
  {
    id: 'acrecion-planetesimales',
    title: 'Acreción de Planetesimales',
    color: '#EFE9F4',
    btnImage: '/assets/rocosos/infographic_m1/btn_acrecion-planetesimales.jpg',
    image: '/assets/rocosos/infographic_m1/hero_acrecion-planetesimales.jpg',
    content: [
      'Una vez que los granos de polvo formaron pelotitas del tamaño de canicas y guijarros, la física del juego cambió por completo. Las fuerzas eléctricas ya no eran suficientes para mantener unidas estructuras más grandes. Entró en acción la gravedad, la fuerza invisible pero implacable que atrae las masas entre sí. Este proceso de crecimiento por acumulación continua se denomina acreción planetaria.',
      'Los guijarros chocaron a velocidades moderadas, fusionándose gradualmente en rocas del tamaño de casas, luego de montañas y finalmente en cuerpos de varios kilómetros de diámetro llamados planetesimales. Imagina una batalla masiva de bolas de nieve donde los impactos suaves hacen que las bolas se vuelvan cada vez más pesadas, mientras que los choques demasiado violentos rompen la estructura en pedazos.',
      'Los planetesimales actuaban como gigantescos aspiradores cósmicos recorriendo sus órbitas. Su atracción gravitatoria crecía exponencialmente a medida que sumaban masa, permitiéndoles atraer rocas vecinas desde distancias cada vez mayores. En tan solo unos pocos millones de años, millones de pequeños planetesimales se consolidaron en unas docenas de embriones planetarios del tamaño de la Luna o Marte.',
      'Este periodo fue caótico y turbulento en extremo. Las órbitas de los embriones planetarios se cruzaban con frecuencia, provocando colisiones cataclísmicas entre mundos en crecimiento. Algunos choques destruían por completo los embriones, esparciendo fragmentos que luego volvían a reunirse en un ciclo interminable de destrucción y reconstrucción geológica.',
      'Gracias a la acreción desbocada, los embriones más grandes dominaron rápidamente sus zonas orbitales. Estos gigantes sobrevivientes continuaron devorando todo el material rocoso disponible a su paso, preparándose para el capítulo final de su transformación en los cuatro planetas interiores que conocemos en la actualidad.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cinturón de asteroides situado entre Marte y Júpiter es en realidad un fósil viviente de esta época de acreción. La gigantesca gravedad de Júpiter agitó tanto esa región que impidió que los planetesimales allí reunidos pudieran unirse para formar un planeta completo.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La velocidad de escape de un planetesimal de diez kilómetros de diámetro es de solo unos pocos metros por segundo. Esto significa que un astronauta podría saltar de su superficie hacia el espacio profundo usando únicamente la fuerza de sus piernas.' }
    ],
    fact: 'El término acreción proviene del latín "accretio", que significa aumento o crecimiento. En astrofísica describe el proceso acumulativo por el cual la materia atraída gravitacionalmente forma cuerpos astronómicos masivos.',
  },
  {
    id: 'diferenciacion-planetaria',
    title: 'Diferenciación Química',
    color: '#FFD166',
    btnImage: '/assets/rocosos/infographic_m1/btn_diferenciacion-planetaria.jpg',
    image: '/assets/rocosos/infographic_m1/hero_diferenciacion-planetaria.jpg',
    content: [
      'Durante la fase de intensa acreción, la enorme energía de las colisiones constantes y la descomposición de elementos radiactivos generaron un calor descomunal. Los jóvenes protoplanetas se calentaron tanto que sus estructuras se derritieron por completo, convirtiéndose en esferas de magma ardiente flotando en la oscuridad. Este estado líquido permitió que ocurriera la diferenciación química.',
      'Imagínate un frasco con una mezcla de agua, aceite y arena bien agitada. Si dejas reposar el frasco, los componentes se separan según su densidad: la arena pesada se hunde al fondo, el agua se queda en el medio y el aceite ligero flota en la superficie. Eso mismo le sucedió a los protoplanetas rocosos en escala astronómica mientras estaban fundidos.',
      'Los elementos más densos y pesados, principalmente el hierro y el níquel fundidos, se hundieron inexorablemente hacia el centro mismo del planeta debido a la atracción gravitatoria. Esta impresionante migración de metal líquido hacia el interior profundo formó un núcleo metálico masivo, el motor magnético y el corazón denso de cada planeta rocoso.',
      'Al mismo tiempo, los silicatos y minerales más ligeros, ricos en aluminio, sodio y silicio, flotaron hacia la superficie como la espuma en una sopa hirviendo. Al enfriarse al contacto con el frío espacio externo, esta capa flotante se solidificó para formar el manto y la delgada corteza exterior que pisamos en los mundos sólidos.',
      'La diferenciación química cambió para siempre el destino de los planetas interiores. Gracias a la creación de núcleos metálicos densos envueltos en mantos de silicato, estos mundos adquirieron la estructura interna en capas que les permitiría en el futuro generar campos magnéticos, tectónica de placas y una rica actividad volcánica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El calor liberado por la caída del hierro hacia el centro de la Tierra durante la diferenciación fue tan inmenso que liberó suficiente energía para derretir el planeta entero varias veces consecutivas, acelerando la separación química de todos los elementos conocidos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los elementos llamados "siderófilos" o afines al hierro, como el oro, el platino y el níquel, se hundieron casi por completo en el núcleo terrestre durante este periodo. El oro que minamos hoy en la corteza llegó mucho después mediante impactos de meteoritos tardíos.' }
    ],
    fact: 'La densidad media de la corteza terrestre es de solo 2.7 gramos por centímetro cúbico, mientras que la densidad del núcleo metálico supera los 12 gramos por centímetro cúbico, demostrando la separación perfecta producida por la diferenciación.',
  },
  {
    id: 'linea-de-nieve',
    title: 'La Línea de Nieve',
    color: '#4ECDC4',
    btnImage: '/assets/rocosos/infographic_m1/btn_linea-de-nieve.jpg',
    image: '/assets/rocosos/infographic_m1/hero_linea-de-nieve.jpg',
    content: [
      'En el disco protoplanetario existía una frontera invisible pero fundamental para el mapa del Sistema Solar llamada la línea de nieve o línea de hielo. Esta frontera marcaba la distancia exacta desde el Sol donde la temperatura descendía lo suficiente como para que el agua, el metano y el amoníaco pudieran congelarse en granos de hielo sólido en lugar de permanecer como gases.',
      'Piensa en la línea de nieve como la línea de congelación de una gran montaña. En la base de la montaña hace calor y la lluvia cae como agua líquida; pero a partir de cierta altitud hace tanto frío que el agua se transforma en nieve permanente. En nuestro Sistema Solar, esta frontera se ubicaba a unas tres unidades astronómicas del Sol, cerca de la órbita actual de Júpiter.',
      'Por dentro de la línea de nieve, el calor solar evaporaba todos los hielos y gases volátiles. Los embriones planetarios en esta zona interior solo disponían de silicatos y metales sólidos para crecer. Dado que las rocas representan una fracción muy pequeña del material del disco, los planetas interiores como Mercurio, Venus, la Tierra y Marte nacieron pequeños y densos.',
      'Por fuera de la línea de nieve, el hielo de agua era abundantísimo, superando con creces la cantidad de roca disponible. Los núcleos planetarios en esta región lejana pudieron acumular montañas gigantescas de hielo rápidamente hasta volverse tan masivos que su gravedad atrapó enormes atmósferas de gas, creando a los colosos Júpiter y Saturno.',
      'La línea de nieve actuó como un arquitecto espacial definiendo la naturaleza dual de nuestro sistema. Dividió los mundos en dos familias distintas: los mundos rocosos interiores, compactos y calientes, y los gigantes gaseosos y helados exteriores, gigantescos y envueltos en congeladas atmósferas turbulentas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La posición de la línea de nieve no fue fija; se movió hacia adentro y hacia afuera a medida que el Sol joven variaba su brillo y el disco protoplanetario se volvía más delgado con el paso de los millones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'En otros sistemas planetarios lejanos, la línea de nieve se encuentra a distancias diferentes dependiendo de la masa y luminosidad de la estrella central. Las estrellas enanas rojas frías tienen sus líneas de nieve extremadamente cerca de su superficie.' }
    ],
    fact: 'El término técnico preciso es "línea de congelación del agua", aunque también existen líneas de nieve secundarias para el monóxido de carbono y el nitrógeno ubicadas mucho más lejos en el espacio profundo.',
  },
  {
    id: 'bombardeo-intenso',
    title: 'Gran Bombardeo Intenso',
    color: '#FF007F',
    btnImage: '/assets/rocosos/infographic_m1/btn_bombardeo-intenso.jpg',
    image: '/assets/rocosos/infographic_m1/hero_bombardeo-intenso.jpg',
    content: [
      'Mucho después de que los planetas rocosos principales hubieran terminado su formación inicial, ocurrió un evento de violencia cósmica sin precedentes conocido como el Gran Bombardeo Intenso Tardío. Hace aproximadamente tres mil ochocientos millones de años, una lluvia torrencial de rocas y cometas gigantescos azotó de forma implacable la superficie de todos los mundos interiores.',
      'Los científicos creen que este cataclismo fue desencadenado por la migración orbital de los planetas gigantes Júpiter y Saturno. Al moverse de lugar, sus inmensas fuerzas gravitatorias desestabilizaron el cinturón de asteroides primitivo y la Nube de Oort, lanzando billones de cometas y asteroides hacia el Sistema Solar interior como proyectiles en un campo de tiro.',
      'Imagina el cielo nocturno de la joven Tierra iluminándose continuamente por el impacto rasante de meteoros del tamaño de ciudades enteras. Cada colisión abría cráteres de cientos de kilómetros de ancho, derretía la corteza recién formada y llenaba la atmósfera de vapor de roca ardiente y ceniza tóxica en un espectáculo apocalíptico.',
      'Las huellas imborrables de esta época de fuego y destrucción aún son visibles hoy en la cara de la Luna y Mercurio. Como estos cuerpos carecen de atmósfera densa o erosión por agua, sus tierras altas están completamente cubiertas de cráteres superpuestos que conservan las cicatrices fosilizadas de aquel tremendo castigo espacial.',
      'A pesar de su extrema violencia, el Gran Bombardeo trajo consigo un regalo incalculable para la Tierra. Los cometas y asteroides helados procedentes del Sistema Solar exterior que impactaron contra nuestro planeta transportaban gigantescas cantidades de agua y moléculas orgánicas complejas, sembrando los océanos y los bloques fundamentales para la vida.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las muestras de rocas traídas de la Luna por las misiones Apolo permitieron fechar las cuencas de impacto gigantescas como el Mare Imbrium, revelando que casi todos los grandes cráteres lunares se formaron durante un estrecho margen de tiempo de cien millones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La energía liberada por el impacto de un asteroide de diez kilómetros durante el Gran Bombardeo equivalía a la detonación simultánea de millones de bombas de hidrógeno, capaz de hervir capas enteras de los océanos primitivos.' }
    ],
    fact: 'El modelo informático más aceptado para explicar la migración planetaria que causó esta lluvia de asteroides se conoce como el Modelo de Niza, desarrollado por investigadores en la ciudad francesa de Niza en 2005.',
  },
  {
    id: 'magma-y-corteza',
    title: 'Océanos de Magma',
    color: '#E71D36',
    btnImage: '/assets/rocosos/infographic_m1/btn_magma-y-corteza.jpg',
    image: '/assets/rocosos/infographic_m1/hero_magma-y-corteza.jpg',
    content: [
      'En las etapas finales de su formación, los planetas rocosos estaban cubiertos por verdaderos océanos de magma de cientos de kilómetros de profundidad. La superficie no era suelo firme, sino un mar brillante de lava hirviente a más de dos mil grados Celsius que emitía un resplandor anaranjado hacia la oscuridad del espacio primordial.',
      'Imagínate un planeta entero cubierto por un lago continuo de lava volcánica similar al del volcán Kilauea en Hawái, pero extendiéndose de polo a polo. La atmósfera sobre este océano ardiente era densa y pesada, compuesta principalmente de vapor de agua, dióxido de carbono y gases de azufre liberados por la roca derretida.',
      'Con el paso de decenas de millones de años, a medida que el número de impactos gigantes disminuyó y el planeta radió su calor hacia el espacio, el océano de magma comenzó a enfriarse de afuera hacia adentro. Una fina película de roca sólida comenzó a flotar sobre la lava, formando las primeras placas de corteza primigenia.',
      'Los minerales de alta densidad como la olivina se cristalizaron primero y se hundieron hacia el fondo del manto, mientras que los minerales más ligeros como la plagioclasa flotaron hacia la superficie. Esta cristalización fraccionada creó la corteza basal rica en basalto y anortosita que aún hoy forma el suelo de los mares lunares y la corteza oceánica terrestre.',
      'El enfriamiento final de estos océanos de magma marcó la transición decisiva de protoplanetas incandescentes a planetas sólidos hechos y derechos. La corteza recién consolidada actuó como una manta protectora aislante, reteniendo el calor interno del planeta y permitiendo que, con el tiempo, la superficie fuera lo bastante estable como para albergar agua y atmósferas duraderas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Luna posee vastas regiones de color claro llamadas tierras altas lunares que están hechas casi enteramente de una roca llamada anortosita. Esta roca es la prueba directa de que la Luna estuvo cubierta por un océano de magma donde estos cristales ligeros flotaron hacia la superficie.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El calor atrapado en el interior profundo de la Tierra desde la época de los océanos de magma primordiales, sumado a la descomposición de elementos radiactivos, es la fuente de energía que mantiene hoy activo el volcán de Hawái y el movimiento de los continentes.' }
    ],
    fact: 'Un océano de magma puede tardar entre diez y cien millones de años en solidificarse por completo dependiendo del grosor de la atmósfera que retenga el calor radiado por el planeta.',
  },
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
