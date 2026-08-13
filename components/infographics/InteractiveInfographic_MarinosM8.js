'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Marine Reptile themed) ────────────────────────
function DecoFlipper({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stylized flipper/paddle */}
      <ellipse cx="30" cy="30" rx="20" ry="8" fill={color} opacity="0.2" transform="rotate(-30 30 30)" />
      <path d="M15 35 Q25 20 45 25 Q40 35 25 38 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Water droplets */}
      <circle cx="48" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="10" cy="45" r="1.5" fill={color} opacity="0.4" />
      {/* Flow lines */}
      <path d="M8 20 Q18 18 22 22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M40 40 Q48 38 52 42" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising air bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="25" cy="15" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="38" cy="38" r="3.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="42" cy="22" r="2.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="2" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Shine on main bubble */}
      <path d="M17 42 Q18 40 20 41" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function DecoWave({ size = 80, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Ocean waves */}
      <path d="M5 20 Q15 10 25 20 Q35 30 45 20 Q55 10 65 20 Q75 30 80 25" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 28 Q15 18 25 28 Q35 38 45 28 Q55 18 65 28 Q75 38 80 33" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Foam dots */}
      <circle cx="20" cy="14" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="14" r="1.2" fill={color} opacity="0.35" />
      <circle cx="60" cy="14" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Simplified reptile skull outline */}
      <ellipse cx="30" cy="28" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Eye sockets (sclerotic rings) */}
      <circle cx="22" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="38" cy="24" r="5" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="22" cy="24" r="2" fill={color} opacity="0.3" />
      <circle cx="38" cy="24" r="2" fill={color} opacity="0.3" />
      {/* Jaw line */}
      <path d="M15 32 Q22 42 30 44 Q38 42 45 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function DecoHelix({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* DNA/evolution helix */}
      <path d="M20 5 Q35 15 20 25 Q5 35 20 45 Q35 55 20 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M40 5 Q25 15 40 25 Q55 35 40 45 Q25 55 40 60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Rungs */}
      <line x1="23" y1="10" x2="37" y2="10" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="20" x2="45" y2="20" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="30" x2="37" y2="30" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="23" y1="50" x2="37" y2="50" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermo({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer shape */}
      <rect x="27" y="8" width="6" height="34" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.3" />
      {/* Temperature marks */}
      <line x1="34" y1="15" x2="38" y2="15" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="21" x2="38" y2="21" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="27" x2="38" y2="27" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="34" y1="33" x2="38" y2="33" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Heat waves */}
      <path d="M42 40 Q46 36 42 32" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M46 42 Q50 38 46 34" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'de-la-tierra-al-agua': [DecoFlipper, DecoHelix, DecoWave],
  'respiracion-reto-aire': [DecoBubbles, DecoFlipper, DecoSkull],
  'termorregulacion-mar': [DecoThermo, DecoWave, DecoBubbles],
  'ojos-oidos-sentidos': [DecoSkull, DecoHelix, DecoThermo],
  'locomocion-submarina': [DecoFlipper, DecoWave, DecoSkull],
  'reproduccion-sin-tierra': [DecoHelix, DecoThermo, DecoBubbles],
  'convergencia-mamiferos': [DecoSkull, DecoFlipper, DecoHelix],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Bernard, A. et al. (2010). Regulation of Body Temperature by Some Mesozoic Marine Reptiles, Science, 328(5984), 1379–1382',
  'Kelley, N.P. & Pyenson, N.D. (2015). Evolutionary Innovation and Ecology in Marine Tetrapods from the Triassic to the Anthropocene, Science, 348(6232), aaa3716',
  'Motani, R. (2009). The Evolution of Marine Reptiles, Annual Review of Earth and Planetary Sciences, 37, 215–253',
  'Houssaye, A. (2013). Bone Histology of Aquatic Reptiles: What Does It Tell Us About Secondary Adaptation to an Aquatic Life?, Biological Reviews, 88(1), 169–189',
  'Lindgren, J. et al. (2018). Soft-tissue Evidence for Homeothermy and Crypsis in a Jurassic Ichthyosaur, Nature, 564, 359–365',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'de-la-tierra-al-agua',
    title: 'De la Tierra al Agua',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/infographic_m8/btn_de-la-tierra-al-agua.jpg',
    image: '/assets/reptiles_marinos/infographic_m8/hero_de-la-tierra-al-agua.jpg',
    content: [
      'Los reptiles marinos del Mesozoico no surgieron en el mar: todos descienden de ancestros terrestres que regresaron al agua. Este proceso se denomina adaptación secundaria al medio acuático y ocurrió de forma independiente en al menos seis linajes distintos entre el Pérmico tardío y el Triásico medio, un intervalo de unos 50 millones de años. Cada linaje enfrentó presiones ambientales similares — disponibilidad de presas marinas, competencia reducida tras la extinción del Pérmico-Triásico — y desarrolló soluciones anatómicas convergentes pero no idénticas, lo que convierte a los reptiles marinos en un caso de estudio sobre cómo la evolución repite patrones bajo condiciones equivalentes.',
      'El registro fósil permite rastrear estas transiciones con precisión. Ictiosaurios como Chaohusaurus (Triásico inferior, ~248 Ma) conservan extremidades con dedos diferenciados, mientras que especies más recientes como Stenopterygius (Jurásico inferior, ~183 Ma) muestran aletas compactas con hiperfalangia — es decir, un número aumentado de falanges por dedo que genera una superficie de remo más eficiente. Algo similar ocurre en los mosasaurios: Dallasaurus (Cretácico superior) retenía extremidades relativamente funcionales para caminar, pero Tylosaurus, apenas 15 millones de años después, poseía aletas totalmente acuáticas y un cuerpo hidrodinámico de hasta 13 metros de longitud.',
      'Los notosuarios representan una etapa intermedia particularmente clara. Géneros como Nothosaurus (~240 Ma) tenían patas con membranas interdigitales y podían tanto nadar como desplazarse torpemente en tierra, de modo similar a las focas modernas. Su cráneo alargado con dientes entrelazados indica una dieta piscívora, y la microestructura ósea estudiada por Houssaye (2013) revela huesos densos (paquiostóticos) que funcionaban como lastre para facilitar el buceo a profundidades moderadas sin necesidad de gastar energía adicional para vencer la flotabilidad.',
      'La extinción masiva del Pérmico-Triásico (~252 Ma) eliminó aproximadamente el 96% de las especies marinas y el 70% de las terrestres, según estimaciones de Erwin (2006). Este vacío ecológico abrió nichos que los reptiles terrestres supervivientes colonizaron con rapidez evolutiva. En apenas 5 millones de años tras la extinción ya existían los primeros ictiosaurios basales en el sur de China, documentados por Motani et al. (2014), lo que demuestra que la radiación adaptativa hacia el mar fue una respuesta directa a la oportunidad ecológica generada por la catástrofe biológica.',
      'La convergencia entre estos linajes es notable: ictiosaurios, mosasaurios, plesiosaurios y tortugas marinas desarrollaron independientemente cuerpos fusiformes, extremidades transformadas en aletas, glándulas de sal para excretar el exceso de sodio y cloruros del agua marina, y modificaciones en el sistema circulatorio para tolerar el buceo profundo. Cada grupo partió de un plan corporal distinto — los ictiosaurios de arcosauromorfos basales, los plesiosaurios de sauropterigios, los mosasaurios de escamosos varanoideos — pero el resultado funcional fue tan parecido que durante décadas los paleontólogos confundieron fósiles de unos con otros hasta que los análisis cladísticos modernos establecieron sus relaciones filogenéticas correctas.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La transición de tierra a mar no fue un evento único: ocurrió al menos seis veces de forma independiente en reptiles durante el Mesozoico. Los ictiosaurios, plesiosaurios, mosasaurios, tortugas marinas, talatosuquios (cocodrilos marinos) y placodontos siguieron caminos evolutivos separados hacia el océano. Este fenómeno se llama evolución convergente, y demuestra que el medio marino ejerce presiones selectivas tan fuertes que organismos sin parentesco cercano terminan desarrollando formas corporales similares a lo largo de millones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Houssaye (2013) demostró mediante histología ósea que los reptiles marinos en etapas tempranas de adaptación acuática desarrollaron huesos más densos y compactos (paquiostosis), lo que les servía como lastre natural para sumergirse con menos esfuerzo. En cambio, los más derivados — como los ictiosaurios avanzados — desarrollaron huesos esponjosos y ligeros (osteoporosis-like), similares a los de los delfines actuales, optimizados para la natación veloz en aguas abiertas en lugar del buceo costero.' },
    ],
    fact: 'El fósil de Cartorhynchus lenticarpus, descubierto en China en 2014 por Motani et al., mide apenas 40 centímetros y conserva muñecas flexibles que le habrían permitido arrastrarse en tierra. Se considera el ictiosaurio más primitivo conocido y fecha del Triásico Inferior (~248 Ma), apenas 4 millones de años después de la Gran Extinción del Pérmico. Su existencia demuestra que la transición tierra-mar en los ictiosaurios fue más rápida de lo que se pensaba, con formas anfibias intermedias que aún podían salir del agua, similares a las focas modernas.',
  },
  {
    id: 'respiracion-reto-aire',
    title: 'Respiración: El Reto del Aire',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/infographic_m8/btn_respiracion-reto-aire.jpg',
    image: '/assets/reptiles_marinos/infographic_m8/hero_respiracion-reto-aire.jpg',
    content: [
      'A diferencia de los peces, todos los reptiles marinos del Mesozoico respiraban aire mediante pulmones. Ninguno desarrolló branquias secundarias, lo que significa que cada individuo — desde un ictiosaurio de un metro hasta un elasmosaurio de 14 metros — debía regresar a la superficie para respirar. Esta limitación fundamental condicionó su ecología, comportamiento de buceo, distribución geográfica y vulnerabilidad ante depredadores de superficie. La frecuencia respiratoria dependía del tamaño corporal, la temperatura del agua y el nivel de actividad metabólica, factores que variaban entre los distintos linajes.',
      'Para maximizar el tiempo bajo el agua, los reptiles marinos desarrollaron adaptaciones fisiológicas análogas a las que presentan los mamíferos buceadores modernos. La más importante es el reflejo de inmersión (dive reflex): al sumergirse, la frecuencia cardíaca disminuye hasta un 80% (bradicardia), el flujo sanguíneo se redirige preferentemente al cerebro y al corazón, y los vasos periféricos se contraen para conservar oxígeno. Estudios de la microestructura ósea de ictiosaurios realizados por Kolb et al. (2011) revelan un metabolismo alto compatible con un consumo de oxígeno elevado, lo que sugiere que estos animales necesitaban un reflejo de inmersión muy eficiente.',
      'El almacenamiento de oxígeno en los músculos mediante mioglobina fue otro mecanismo clave. La mioglobina es una proteína que fija oxígeno molecular directamente en las fibras musculares, permitiendo que los tejidos continúen funcionando durante períodos de apnea prolongada. En los cachalotes modernos, la concentración de mioglobina es diez veces mayor que en los mamíferos terrestres. Análisis isotópicos de huesos de ictiosaurios del Jurásico, publicados por Newbrey et al. (2015), muestran patrones de crecimiento óseo rápido y continuo que implican un metabolismo aeróbico sostenido, coherente con niveles altos de mioglobina muscular.',
      'La estructura pulmonar también se modificó. A diferencia de los reptiles terrestres, que pueden tener pulmones relativamente simples y saculares, los reptiles marinos probablemente desarrollaron pulmones con mayor superficie de intercambio gaseoso para captar la máxima cantidad de oxígeno en cada respiración antes de sumergirse. Evidencia indirecta proviene de la forma de la caja torácica: en ictiosaurios avanzados como Ophthalmosaurus, las costillas son robustas y forman un tórax rígido que resistiría la presión hidrostática a profundidades de hasta 600 metros, según modelos biomecánicos de Motani et al. (2009).',
      'La tolerancia al dióxido de carbono (CO₂) es otro factor poco discutido pero esencial. Durante inmersiones prolongadas, el CO₂ se acumula en la sangre y normalmente estimula la urgencia de respirar. Los buceadores profundos modernos, como las tortugas laúd, presentan una tolerancia elevada al CO₂ sanguíneo, lo que retrasa esa urgencia y permite inmersiones más largas. Las tortugas laúd actuales pueden permanecer sumergidas hasta 85 minutos y alcanzar profundidades de 1,280 metros, según registros de Houghton et al. (2008). Es razonable inferir que los ictiosaurios y plesiosaurios del Mesozoico, con cuerpos más grandes y más especializados, alcanzaban tiempos y profundidades comparables o superiores.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Las tortugas laúd modernas son las buceadoras más profundas entre los reptiles vivos: alcanzan los 1,280 metros de profundidad y permanecen sumergidas hasta 85 minutos en una sola inmersión. Para lograrlo, su sangre puede transportar grandes cantidades de oxígeno y sus músculos están saturados de mioglobina. Los ictiosaurios del Jurásico, con ojos del tamaño de pelotas de fútbol adaptados a la oscuridad, probablemente superaban estas marcas al cazar a profundidades donde la luz solar no llega.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El reflejo de inmersión es un mecanismo fisiológico compartido por todos los vertebrados que bucean, incluidos los humanos. Cuando sumergimos la cara en agua fría, nuestra frecuencia cardíaca baja automáticamente un 10-25%. En focas de Weddell, baja hasta un 90%, y el flujo sanguíneo se redirige casi exclusivamente al cerebro y al corazón. Kolb et al. (2011) demostraron que la histología ósea de los ictiosaurios indica tasas metabólicas comparables a las de los mamíferos marinos, lo que implica que necesitaban un reflejo de inmersión igual de potente.' },
    ],
    fact: 'Ophthalmosaurus, un ictiosaurio del Jurásico Superior (~165-145 Ma), tenía las cuencas oculares más grandes proporcionalmente de cualquier vertebrado conocido: cada ojo medía aproximadamente 23 centímetros de diámetro, casi del tamaño de un balón de fútbol. Sus ojos contenían anillos escleróticos — estructuras óseas que reforzaban el globo ocular contra la presión del agua — lo que indica que cazaba regularmente a profundidades donde necesitaba captar la mínima cantidad de luz disponible, probablemente entre 200 y 600 metros bajo la superficie.',
  },
  {
    id: 'termorregulacion-mar',
    title: 'Termorregulación en el Mar',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/infographic_m8/btn_termorregulacion-mar.jpg',
    image: '/assets/reptiles_marinos/infographic_m8/hero_termorregulacion-mar.jpg',
    content: [
      'Uno de los descubrimientos más significativos de la paleobiología reciente es que varios reptiles marinos del Mesozoico no eran ectotermos estrictos como sus parientes terrestres, sino que mantenían temperaturas corporales elevadas e independientes del agua circundante. Bernard et al. (2010), en un estudio publicado en Science, analizaron isótopos de oxígeno (δ¹⁸O) en el esmalte dental de ictiosaurios, plesiosaurios y mosasaurios, y determinaron que sus temperaturas corporales oscilaban entre 35°C y 39°C, un rango comparable al de los mamíferos modernos y entre 10°C y 20°C por encima de la temperatura del agua en la que vivían.',
      'El mecanismo exacto de termorregulación variaba entre linajes. Los ictiosaurios, con cuerpos compactos y fusiformes, probablemente generaban calor mediante actividad muscular sostenida (termogénesis locomotora), de forma análoga a los atunes y tiburones lamniformes actuales. Lindgren et al. (2018) publicaron en Nature el hallazgo de grasa subcutánea preservada en un ictiosaurio del Jurásico (Stenopterygius), lo que confirma la presencia de una capa aislante similar a la grasa de las ballenas. Esta grasa, compuesta por tejido adiposo rico en lípidos, reducía la pérdida de calor hacia el agua fría y representaba una adaptación clave para mantener temperaturas internas altas.',
      'La gigantotermia es otra estrategia documentada en los reptiles marinos más grandes. Este fenómeno, descrito matemáticamente por Paladino et al. (1990), establece que los animales de gran tamaño corporal pierden calor proporcionalmente más despacio que los pequeños debido a su menor relación superficie/volumen. Un plesiosaurio de 12 metros como Elasmosaurus tendría una inercia térmica tan elevada que su temperatura interna permanecería estable durante horas incluso en aguas frías, sin necesidad de generar calor metabólico activamente. Las tortugas laúd modernas (Dermochelys coriacea), que alcanzan 2 metros de largo, ya mantienen temperaturas hasta 18°C por encima del agua circundante mediante este mecanismo.',
      'El intercambio de calor por contracorriente es una adaptación vascular presente en muchos vertebrados marinos. Consiste en redes de arterias y venas (retia mirabilia) dispuestas en paralelo pero con flujos en direcciones opuestas: la sangre arterial caliente que sale del core del cuerpo calienta la sangre venosa fría que regresa de las aletas antes de que esta llegue a los órganos vitales. Esto minimiza la pérdida de calor por las extremidades. Aunque los tejidos blandos no se fosilizan directamente, la presencia de canales vasculares amplios en los huesos de las aletas de ictiosaurios y plesiosaurios, documentada por Caldwell (1997), es consistente con la existencia de retia mirabilia funcionales.',
      'Las implicaciones ecológicas de la endotermia en reptiles marinos son profundas. Animales de sangre caliente pueden mantener una actividad muscular sostenida en aguas frías, lo que amplía su rango geográfico hacia latitudes polares. Efectivamente, se han encontrado fósiles de ictiosaurios y plesiosaurios en depósitos del Jurásico y Cretácico de Australia, Antártida y el Ártico canadiense — regiones que, aunque más cálidas que hoy, tenían aguas significativamente más frías que los trópicos. Bernard et al. (2010) concluyeron que la endotermia fue un factor clave en la dispersión global de estos reptiles y en su capacidad para ocupar el nicho de depredadores de aguas abiertas previamente vacante tras la extinción del Pérmico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2018, Lindgren y colaboradores descubrieron grasa subcutánea preservada en un fósil de Stenopterygius de 180 millones de años. Bajo análisis molecular, esta grasa contenía compuestos lipídicos similares a los del tejido adiposo de los delfines actuales. Este hallazgo, publicado en Nature, fue la primera evidencia directa de que los ictiosaurios tenían una capa aislante de grasa bajo la piel, confirmando que eran animales de sangre caliente con un aislamiento térmico tan eficiente como el de los cetáceos modernos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los isótopos de oxígeno (δ¹⁸O) permiten calcular la temperatura a la que se formó un mineral biológico. Bernard et al. (2010) aplicaron esta técnica al esmalte dental de 40 especímenes de tres linajes distintos de reptiles marinos. Los resultados mostraron temperaturas corporales consistentes de 35-39°C independientemente de la paleolatitud del yacimiento, lo que descarta que fueran ectotermos. La precisión del método es de ±2°C, y los controles con peces del mismo yacimiento mostraron temperaturas bajas coherentes con ectotermia, validando la metodología.' },
    ],
    fact: 'Las tortugas laúd actuales (Dermochelys coriacea) son el único reptil vivo que mantiene su temperatura corporal significativamente por encima del agua circundante. Con un peso de hasta 700 kg, generan calor mediante actividad muscular continua durante la natación y lo conservan gracias a una capa de grasa subcutánea de 2-3 centímetros y a un sistema de intercambio de calor por contracorriente en las aletas. En aguas de 5°C frente a Canadá, su temperatura interna se mantiene a 25°C. Este sistema es un modelo viviente de lo que los ictiosaurios probablemente perfeccionaron hace 200 millones de años.',
  },
  {
    id: 'ojos-oidos-sentidos',
    title: 'Ojos, Oídos y Sentidos',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/infographic_m8/btn_ojos-oidos-sentidos.jpg',
    image: '/assets/reptiles_marinos/infographic_m8/hero_ojos-oidos-sentidos.jpg',
    content: [
      'Los sistemas sensoriales de los reptiles marinos experimentaron modificaciones drásticas para funcionar en un medio donde la luz se atenúa rápidamente con la profundidad, el sonido viaja 4.3 veces más rápido que en el aire y las señales químicas se dispersan de manera distinta. La adaptación más visible se encuentra en los ojos: muchos reptiles marinos mesozoicos poseían anillos escleróticos — estructuras formadas por placas óseas que rodean y refuerzan el globo ocular. Estos anillos, preservados con frecuencia en el registro fósil, cumplían dos funciones simultáneas: proteger el ojo contra la presión hidrostática durante el buceo profundo y permitir la deformación controlada del cristalino para enfocar bajo el agua.',
      'La visión en condiciones de luz reducida fue una especialización crítica para los cazadores de profundidad. Ophthalmosaurus (Jurásico Superior) tenía ojos de hasta 23 centímetros de diámetro con pupilas proporcionalmente enormes, diseñadas para captar la máxima cantidad de fotones disponibles. Modelos ópticos construidos por Motani et al. (2009) estiman que estos ojos podían funcionar a profundidades de entre 200 y 600 metros, donde la iluminación es inferior al 1% de la que existe en la superficie. En comparación, el calamar gigante actual (Architeuthis dux) tiene ojos de 27 centímetros, los más grandes del reino animal, adaptados a condiciones similares.',
      'El sistema auditivo también se transformó. En el medio terrestre, los reptiles captan sonidos a través del tímpano y un hueso columelar que transmite vibraciones al oído interno. En el agua, donde el sonido se transmite directamente a través de los huesos craneales, el tímpano pierde relevancia. Los ictiosaurios carecían de tímpano y probablemente percibían vibraciones acústicas a través de la mandíbula inferior, de forma análoga a los delfines modernos, cuya mandíbula contiene un canal graso que conduce el sonido hacia el oído medio. Análisis de tomografía computarizada de cráneos de ictiosaurios realizados por Marek et al. (2015) muestran cámaras auditivas ampliadas compatibles con esta forma de conducción sonora.',
      'La electrorrecepción — la capacidad de detectar campos eléctricos generados por la actividad muscular de las presas — es una hipótesis debatida para algunos reptiles marinos. Los tiburones y las rayas poseen este sentido mediante las ampollas de Lorenzini, órganos especializados en el hocico. Ciertos plesiosaurios de cuello largo, como Elasmosaurus, presentan canales en los huesos del rostro que algunos investigadores interpretan como alojamientos de órganos electroreceptores. Sin embargo, esta interpretación es controvertida: otros paleontólogos sugieren que estos canales albergaban mecanorreceptores sensibles a cambios de presión en el agua, similares a la línea lateral de los peces.',
      'La detección de presión mediante mecanorreceptores es una adaptación bien documentada en los cocodrilos actuales, que poseen órganos sensoriales integumentarios (ISOs) en las escamas del hocico capaces de detectar ondas de presión generadas por presas en movimiento. Estudios de Leitch y Catania (2012) demostraron que estos receptores son más sensibles que las yemas de los dedos humanos. Fósiles de talatosuquios (cocodrilos marinos del Jurásico) preservan patrones de poros en el hocico idénticos a los de los cocodrilos modernos, lo que indica que esta capacidad sensorial estaba presente en los reptiles marinos mesozoicos y les permitía cazar en aguas turbias o durante la noche sin depender exclusivamente de la visión.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los anillos escleróticos de los ictiosaurios están formados por entre 12 y 20 placas óseas individuales que se articulan entre sí como un mosaico circular. Esta estructura permitía al ojo cambiar de forma de manera controlada para enfocar tanto en la superficie (donde la refracción de la luz cambia al pasar del aire al agua) como a grandes profundidades. Es el equivalente biológico de una lente de cámara ajustable, y su complejidad indica que la visión era el sentido dominante en los ictiosaurios.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La conducción sonora mandibular en delfines fue descrita por Norris (1968) y desde entonces se ha confirmado mediante estudios de tomografía y modelos acústicos. La mandíbula inferior del delfín contiene un canal graso que actúa como guía de ondas acústicas, dirigiendo el sonido hacia el oído medio con una eficiencia superior a la del tímpano convencional. Marek et al. (2015) encontraron estructuras análogas en cráneos de ictiosaurios del Jurásico, lo que sugiere convergencia funcional entre estos dos grupos separados por más de 150 millones de años de evolución.' },
    ],
    fact: 'Temnodontosaurus, un ictiosaurio del Jurásico Inferior (~200-175 Ma), poseía los ojos más grandes conocidos entre todos los vertebrados que han existido: cada globo ocular medía hasta 26.4 centímetros de diámetro, superando incluso a los del calamar gigante. Con una pupila estimada de 15 centímetros en condiciones de máxima dilatación, estos ojos captaban tal cantidad de luz que el animal podía cazar en la zona crepuscular del océano (200-1,000 m), donde la oscuridad es casi total, detectando el movimiento de presas bioluminiscentes y cefalópodos a distancias de varias decenas de metros.',
  },
  {
    id: 'locomocion-submarina',
    title: 'Locomoción Submarina',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/infographic_m8/btn_locomocion-submarina.jpg',
    image: '/assets/reptiles_marinos/infographic_m8/hero_locomocion-submarina.jpg',
    content: [
      'Los reptiles marinos del Mesozoico desarrollaron dos estrategias principales de locomoción acuática, cada una con ventajas biomecánicas distintas. La natación axial genera empuje mediante ondulaciones laterales del cuerpo y la cola, y fue el modo dominante en ictiosaurios y mosasaurios. La natación apendicular produce empuje mediante el movimiento de las extremidades transformadas en aletas, y fue el modo principal en plesiosaurios y tortugas marinas. Estas dos estrategias representan las mismas soluciones que emplean los vertebrados marinos modernos: los delfines y atunes usan natación axial con la cola, mientras que los pingüinos y las tortugas marinas usan natación apendicular con las aletas.',
      'Los ictiosaurios avanzados, como Ichthyosaurus (~200-190 Ma) y Stenopterygius (~183 Ma), alcanzaron la forma corporal más hidrodinámica entre los reptiles: un perfil fusiforme con hocico puntiagudo, cuerpo robusto en la sección media y una aleta caudal semilunar (lunate) con lóbulos simétricos. Esta forma se denomina thunniforme porque es idéntica a la del atún (Thunnus). Los análisis de mecánica de fluidos computacional realizados por Gutarra et al. (2019) demostraron que esta configuración minimiza la resistencia al avance y maximiza la eficiencia propulsiva, permitiendo velocidades estimadas de hasta 40 km/h en ráfagas cortas y cruceros sostenidos de 10-15 km/h, comparables a los delfines modernos.',
      'Los plesiosaurios adoptaron una estrategia radicalmente diferente: el vuelo subacuático (underwater flight). Sus cuatro aletas funcionaban como alas hidrodinámicas que generaban sustentación y empuje mediante un movimiento de batido dorso-ventral, similar al de los pingüinos o las tortugas marinas actuales. Estudios biomecánicos de Muscutt et al. (2017), publicados en Proceedings of the Royal Society B, utilizaron modelos robóticos para demostrar que las cuatro aletas del plesiosaurio no se movían de forma idéntica: las traseras aprovechaban los vórtices generados por las delanteras para aumentar la eficiencia total entre un 40% y un 60% respecto al uso de dos aletas solamente.',
      'Los mosasaurios combinaron elementos de ambas estrategias. Aunque nadaban principalmente mediante ondulación lateral del cuerpo y la cola (como las serpientes marinas actuales), sus aletas también contribuían a la maniobra y estabilización. Plotosaurus (~70 Ma), uno de los mosasaurios más derivados, desarrolló una aleta caudal con quilla hipural — un soporte óseo que proporcionaba rigidez al lóbulo inferior de la cola — lo que le otorgaba una eficiencia propulsiva mayor que la de sus parientes más primitivos. Lindgren et al. (2010) estimaron que Plotosaurus podía alcanzar velocidades de crucero de 8-12 km/h, suficientes para perseguir a peces pelágicos rápidos.',
      'La evolución de las aletas desde las patas terrestres es un proceso documentado paso a paso en el registro fósil. En los ictiosaurios, la hiperfalangia (multiplicación de falanges) y la hiperdactilia (aparición de dedos adicionales) transformaron las manos en discos óseos rígidos dentro de una aleta cubierta de piel. En los plesiosaurios, los huesos del brazo se acortaron y aplanaron mientras que los dedos se alargaron enormemente, creando una estructura alar de alta relación de aspecto. Caldwell (1997) comparó estas transformaciones con las que ocurrieron en las ballenas modernas y encontró que, aunque los grupos no están emparentados, la secuencia de cambios óseos sigue un patrón convergente casi idéntico: acortamiento del húmero, fusión de carpos, elongación de falanges y pérdida de articulación móvil en la muñeca.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La aleta caudal semilunar de los ictiosaurios no está formada por huesos de la cola, sino por tejido blando — cartílago y piel — que se extendía más allá de las vértebras. Sabemos esto porque fósiles excepcionalmente preservados del Jurásico de Holzmaden (Alemania) conservan la silueta del contorno corporal como una película de carbono en la roca. Estas impresiones muestran que la columna vertebral se curvaba hacia abajo en el lóbulo inferior de la cola, mientras que el lóbulo superior era enteramente de tejido blando, exactamente como en los tiburones.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Muscutt et al. (2017) construyeron modelos robóticos de aletas de plesiosaurio y los probaron en tanques de flujo controlado. Descubrieron que cuando las aletas traseras batían ligeramente desfasadas respecto a las delanteras, capturaban la energía de los vórtices residuales y la convertían en empuje adicional. Este fenómeno, llamado interacción ala-estela (wake capture), aumentaba la eficiencia de natación entre un 40% y un 60%. Ningún animal moderno usa cuatro aletas de esta manera, lo que hace a los plesiosaurios biomecánicamente únicos en la historia de la vida.' },
    ],
    fact: 'Los fósiles de Holzmaden, en el sur de Alemania, son depósitos del Jurásico Inferior (~183 Ma) donde las condiciones anóxicas del fondo marino preservaron no solo los esqueletos sino también las siluetas de tejido blando de ictiosaurios. Gracias a estos fósiles se descubrió que los ictiosaurios tenían una aleta dorsal triangular (sin soporte óseo), una aleta caudal semilunar de tipo atuniforme, y un contorno corporal tan hidrodinámico como el de un delfín. Sin Holzmaden, los paleontólogos habrían reconstruido a los ictiosaurios como lagartijas acuáticas alargadas, un error que persistió hasta los hallazgos del siglo XIX.',
  },
  {
    id: 'reproduccion-sin-tierra',
    title: 'Reproducción sin Tierra',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/infographic_m8/btn_reproduccion-sin-tierra.jpg',
    image: '/assets/reptiles_marinos/infographic_m8/hero_reproduccion-sin-tierra.jpg',
    content: [
      'Una de las adaptaciones más críticas para la vida marina completa es la capacidad de reproducirse sin regresar a tierra. Los reptiles terrestres ponen huevos con cáscara (amniotes), y la mayoría de los reptiles marinos modernos — como las tortugas marinas — aún deben salir del agua para depositar sus huevos en playas. Sin embargo, los ictiosaurios, mosasaurios y probablemente algunos plesiosaurios evolucionaron la viviparidad: daban a luz crías vivas directamente en el agua, eliminando por completo la dependencia de la tierra para la reproducción. Esta adaptación fue esencial para que pudieran colonizar océanos abiertos donde no existían costas cercanas.',
      'La evidencia fósil de viviparidad en ictiosaurios es directa y contundente. Se han encontrado múltiples especímenes de hembras de Stenopterygius del Jurásico Inferior (~183 Ma) con embriones preservados dentro de la cavidad corporal o en proceso de nacer. Un fósil particularmente revelador, descrito por Böttcher (1990), muestra una cría emergiendo de la cloaca con la cola primero — la orientación típica de los nacimientos acuáticos, ya que permite que la cría nade hacia la superficie para respirar inmediatamente después de nacer. Esta orientación es la misma que utilizan los delfines y ballenas modernos, y su presencia en los ictiosaurios indica una convergencia conductual entre grupos separados por más de 150 millones de años.',
      'Los mosasaurios también eran vivíparos. En 2015, Field et al. publicaron en la revista Palaeontology la descripción de fósiles neonatales de mosasaurios encontrados en depósitos marinos de aguas abiertas en Kansas (EE.UU.), lejos de cualquier costa. Los huesos de estos neonatos no mostraban signos de transporte post-mortem, lo que indica que los animales nacieron y murieron en el océano abierto. El tamaño de los neonatos (~50 cm en Clidastes) sugiere que las hembras producían pocas crías grandes en lugar de muchas crías pequeñas, una estrategia reproductiva de tipo K que es común en depredadores marinos de gran tamaño.',
      'La evolución de la viviparidad requirió modificaciones fisiológicas profundas. Las hembras debían mantener al embrión nutrido y oxigenado durante todo el desarrollo intrauterino, lo que probablemente implicó la evolución de estructuras análogas a la placenta mamífera. En los reptiles vivíparos modernos, como ciertas serpientes y lagartos, el corion y el alantoides embrionarios se fusionan con el oviducto materno para formar una membrana vascularizada que permite el intercambio de gases y nutrientes. O\'Keefe y Chiappe (2011) describieron un fósil de plesiosaurio (Polycotylus latippinus) del Cretácico Superior con un único embrión grande dentro de la cavidad corporal, y propusieron que estos animales invertían significativamente en cuidado parental post-natal.',
      'La estrategia K de selección reproductiva — pocas crías, gran inversión parental — tiene consecuencias ecológicas directas. Los animales con esta estrategia tienen poblaciones más estables pero se recuperan lentamente de perturbaciones. O\'Keefe y Chiappe (2011) argumentaron que los plesiosaurios, al producir una sola cría grande por gestación, formaban grupos sociales donde los adultos protegían a los juveniles, de modo similar a los cetáceos modernos. Esta hipótesis se basa en la presencia de marcas de mordida cicatrizadas en huesos de juveniles — lo que indica que sobrevivieron a ataques de depredadores — y en la asociación frecuente de fósiles de adultos y juveniles en los mismos yacimientos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El fósil de Polycotylus latippinus descubierto en Kansas y descrito por O\'Keefe y Chiappe (2011) es el primer y único plesiosaurio encontrado con un embrión dentro del cuerpo. La cría era tan grande — aproximadamente un tercio de la longitud de la madre — que los investigadores propusieron que los plesiosaurios tenían una sola cría por gestación y probablemente la cuidaban activamente, como hacen las orcas y delfines con sus recién nacidos, guiándolas hacia la superficie para respirar y protegiéndolas de depredadores.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La orientación caudal de las crías durante el nacimiento acuático no es casualidad: si la cría naciera de cabeza, su hocico emergiría primero y podría inhalar agua antes de que el cordón placentario o la conexión con la madre se interrumpiera. Al nacer con la cola primero, la cría completa la salida antes de necesitar su primera respiración. Este patrón se repite en ictiosaurios del Jurásico, delfines y ballenas actuales — tres linajes no emparentados que llegaron a la misma solución conductual de forma independiente.' },
    ],
    fact: 'En 2014, Motani et al. describieron un fósil de Chaohusaurus (un ictiosaurio primitivo del Triásico Inferior, ~248 Ma) con tres crías: una ya nacida, una en el canal de parto y una tercera dentro del útero. La cría en proceso de nacer emergía de cabeza — no de cola — lo que sugiere que la orientación caudal del nacimiento acuático evolucionó después en los ictiosaurios más derivados. Este fósil es la evidencia más antigua de viviparidad en reptiles marinos, y su orientación cefálica indica que la especie aún no estaba completamente adaptada a parir en el agua, posiblemente haciéndolo en aguas someras cerca de la costa.',
  },
  {
    id: 'convergencia-mamiferos',
    title: 'Convergencia con Mamíferos Marinos',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/infographic_m8/btn_convergencia-mamiferos.jpg',
    image: '/assets/reptiles_marinos/infographic_m8/hero_convergencia-mamiferos.jpg',
    content: [
      'La convergencia evolutiva entre los reptiles marinos del Mesozoico y los mamíferos marinos del Cenozoico es uno de los fenómenos más estudiados en biología comparada. Dos grupos de vertebrados completamente distintos — reptiles que dominaron los mares entre 252 y 66 millones de años atrás, y mamíferos que ocuparon esos mismos nichos a partir de 55 Ma — desarrollaron soluciones anatómicas, fisiológicas y conductuales tan similares que los paleontólogos utilizan el término "doppelgänger ecológico" para describir las correspondencias. Kelley y Pyenson (2015), en un artículo publicado en Science, documentaron sistemáticamente estos paralelismos y concluyeron que el medio marino impone restricciones físicas tan fuertes que la evolución produce resultados predecibles.',
      'El par más conocido es el de los ictiosaurios y los delfines. Ambos tienen cuerpos fusiformes, hocicos alargados con dientes cónicos para atrapar peces, aletas pectorales cortas para maniobrar, una aleta dorsal estabilizadora y una aleta caudal semilunar para propulsión. Stenopterygius (~183 Ma) y el delfín mular (Tursiops truncatus) son tan parecidos externamente que si se colocan siluetas de ambos lado a lado, la diferencia principal es la orientación de la cola: vertical en el delfín (movimiento dorso-ventral) y horizontal en el ictiosaurio (movimiento lateral). Esta diferencia refleja sus ancestros: los mamíferos galopa con flexión dorso-ventral de la columna, mientras que los reptiles se desplazan con ondulaciones laterales.',
      'Los mosasaurios y las ballenas dentadas (odontocetos) forman otro par convergente. Ambos fueron depredadores de gran tamaño con mandíbulas poderosas, dientes diferenciados para sujetar y procesar presas grandes, y cuerpos elongados propulsados por la cola. Tylosaurus (~85-80 Ma), con hasta 13 metros de longitud, ocupaba un nicho ecológico comparable al de la orca moderna (Orcinus orca), que alcanza 9 metros. Ambos consumían peces, cefalópodos, aves marinas e incluso otros reptiles/mamíferos marinos. El contenido estomacal preservado en fósiles de Tylosaurus incluye restos de tiburones, plesiosaurios y aves hesperornitas, un espectro dietético tan amplio como el de las orcas actuales.',
      'Los plesiosaurios de cuello largo y las focas representan un tercer par de convergencia, aunque más matizado. Ambos utilizan las extremidades anteriores como principal medio de propulsión (natación apendicular), tienen mandíbulas con dientes para capturar peces resbaladizos, y son buceadores que alternan entre la superficie para respirar y el fondo para cazar. Elasmosaurus (~80 Ma), con un cuello de 7 metros compuesto por 72 vértebras cervicales, no tiene equivalente exacto moderno, pero su estrategia de caza — acercar la cabeza silenciosamente a bancos de peces mientras el cuerpo permanece alejado — es una versión extrema de lo que hacen los leones marinos al maniobrar entre cardúmenes.',
      'La profundidad de estas convergencias va más allá de la forma externa. Kelley y Pyenson (2015) identificaron paralelismos en la tasa de diversificación (ambos grupos se diversificaron rápidamente tras extinciones masivas), en los patrones de tamaño corporal (ambos evolucionaron hacia el gigantismo independientemente), en las estrategias reproductivas (viviparidad con pocas crías grandes), y en la distribución geográfica (colonización de océanos polares facilitada por endotermia). Incluso el patrón de extinción muestra una convergencia perturbadora: los reptiles marinos fueron eliminados por el impacto de Chicxulub (66 Ma), y los mamíferos marinos enfrentan actualmente presiones que algunos ecólogos comparan con una "sexta extinción", provocada por el cambio climático, la contaminación y la sobrepesca, según Pyenson (2018).'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La semejanza entre ictiosaurios y delfines es tan estrecha que el paleontólogo Stephen Jay Gould la consideró "el mejor ejemplo de convergencia evolutiva en la historia de la vida". Ambos desarrollaron independientemente: forma de torpedo, ojos grandes frontales, hocico alargado, piel lisa sin escamas, grasa subcutánea aislante, nacimiento de crías vivas cola-primero, y sistemas de ecolocalización o visión adaptada para cazar bajo el agua. La probabilidad de que dos linajes no emparentados coincidan en tantos rasgos es estadísticamente baja, lo que demuestra el poder directivo del ambiente marino.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Kelley y Pyenson (2015) desarrollaron un marco cuantitativo para medir la convergencia entre tetrápodos marinos mesozoicos y cenozoicos. Analizaron 69 caracteres ecológicos y morfológicos en 34 linajes y encontraron que el 73% de los nichos ecológicos ocupados por reptiles marinos tienen un equivalente funcional en los mamíferos marinos actuales. Los nichos sin equivalente moderno incluyen a los plesiosaurios de cuello ultra-largo y a los placodontos trituradores de conchas, formas para las que no existe un análogo mamífero, lo que sugiere que ciertos diseños corporales mesozoicos eran biológicamente posibles pero no inevitables.' },
    ],
    fact: 'El contenido estomacal fosilizado de un Tylosaurus proriger del Cretácico Superior de Kansas (descrito por Everhart, 2004) incluía restos de un tiburón (Squalicorax), un pez óseo (Gillicus), otro mosasaurio más pequeño (Clidastes) y un ave marina buceadora (Hesperornis). Este espectro alimentario — depredador de depredadores que consume presas de múltiples niveles tróficos — es idéntico al de las orcas modernas, que cazan tiburones, peces, focas y ballenas. Dos superdepredadores no emparentados, separados por 80 millones de años, que independientemente desarrollaron la misma estrategia de alimentación oportunista y generalista.',
  },
];

// ─── Marine Particle Field (Canvas Background) ──────────────────────────────
function MarineParticleField() {
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94', // slate blue or copper
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

// ─── Marine Header ──────────────────────────────────────────────────────────
function MarineHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Ocean wave arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#marineGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B7B9A','#B87D5E','#6E8FA8','#8B6B4A','#7C93A8','#9E7B5C','#4A6F8C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 18 300 25 Q307 32 315 25" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 25 300 32 Q310 39 320 32" fill="none" stroke="#5B7B9A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="marineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">ADAPTACIONES AL MAR</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">REPTILES MARINOS DEL MESOZOICO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching BttfM2 style) ────────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(91,123,154,0.2)'}`,
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
          layoutId="activeDotMarinosM8"
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

        {/* ─── Conditional Video Player ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
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
      border: '1px solid rgba(91,123,154,0.15)',
    }}>
      <Star size={14} style={{ color: '#5B7B9A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B7B9A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(91,123,154,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5B7B9A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_MarinosM8() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/marinos_m8.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,123,154,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <MarineParticleField />

      <MarineHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(91,123,154,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(91,123,154,0.08)', borderRadius: '16px',
              border: '1px solid rgba(91,123,154,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5B7B9A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado las Adaptaciones al Medio Acuático!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Explorador del Abismo
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
