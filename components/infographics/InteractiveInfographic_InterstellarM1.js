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
      {/* Accretion disk lines */}
      <path d="M 5 30 Q 30 15 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 5 30 Q 30 45 55 30" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function DecoSpacetimeGrid({ size = 70, color = '#4FC3F7', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Curved grid mimicking a gravity well */}
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

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'gravedad-newton': [DecoOrbit, DecoSpacetimeGrid, DecoBlackHole],'einstein-1915': [DecoEqualSign, DecoSpacetimeGrid, DecoOrbit],'curvatura-espaciotiempo': [DecoSpacetimeGrid, DecoBlackHole, DecoWaveRipple],'geodesicas': [DecoOrbit, DecoSpacetimeGrid, DecoWaveRipple],'lentes-gravitacionales': [DecoBlackHole, DecoSpacetimeGrid, DecoEqualSign],'ondas-gravitacionales': [DecoWaveRipple, DecoBlackHole, DecoOrbit],
  'gps-relatividad': [DecoOrbit, DecoWaveRipple, DecoEqualSign],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Einstein, A. (1915). Die Feldgleichungen der Gravitation, Sitzungsberichte der Preussischen Akademie der Wissenschaften',
  'Misner, C. Thorne, K. Wheeler, J. (1973). Gravitation, W.H. Freeman',
  'Abbott, B.P. et al. (2016). "Observation of Gravitational Waves from a Binary Black Hole Merger", Physical Review Letters, 116(6)',
  'Will, C.M. (2014). "The Confrontation between General Relativity and Experiment", Living Reviews in Relativity, 17(1)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'gravedad-newton',
    title: 'La Gravedad de Newton',
    color: '#F4A261',
    btnImage: '/assets/interstellar/infographic_m1/btn_gravedad-newton.jpg',
    image: '/assets/interstellar/infographic_m1/hero_gravedad-newton.jpg',
    content: [
      'En 1666, Isaac Newton se encontraba en su granja familiar mientras se refugiaba de la plaga de Londres. Al observar la caída de una manzana, formuló una hipótesis fundamental para la historia de la ciencia. Dedujo que la fuerza que atraía la fruta hacia el suelo era idéntica a la interacción que mantenía a la Luna en su órbita alrededor de la Tierra. Esta observación le permitió concluir que el movimiento de los cuerpos celestes y el de los objetos terrestres estaban regidos por el mismo principio físico, sentando las bases de la mecánica clásica.',
      'Newton denominó a esta interacción "gravedad" y postuló que todos los objetos del universo se atraen mutuamente en proporción a su masa. Según este modelo matemático, cada cuerpo celeste ejerce una fuerza sobre los demás objetos a su alrededor. Cuanto mayor es la masa del objeto, más intensa es su atracción gravitacional. Por este motivo, el Sol puede mantener a los planetas del sistema solar en sus órbitas elípticas. Esta descripción permitió entender la dinámica orbital mediante ecuaciones matemáticas sin depender de explicaciones sobrenaturales.',
      'La ley de gravitación universal, expresada mediante la ecuación F=GMm/rÂ², proporcionó un marco riguroso para predecir el movimiento de la materia. Esta fórmula permitió calcular fenómenos terrestres como las mareas oceánicas y trayectorias de proyectiles con precisión matemática. Gracias a este modelo, los científicos de la época lograron modelar la mecánica del sistema solar. La gravitación universal demostró que los principios físicos aplicables en la Tierra eran válidos en todo el universo, consolidando el papel de las matemáticas en la ciencia.',
      'A pesar de su éxito, el modelo gravitacional de Newton presentaba una limitación observable: la órbita de Mercurio. El planeta más cercano al Sol describe una trayectoria elíptica que sufre una variación gradual en cada revolución. Este fenómeno orbital, conocido en astrofísica como la precesión del perihelio, producía un desvío que las ecuaciones newtonianas no lograban cuantificar con exactitud. La anomalía en el movimiento de Mercurio permaneció como un problema sin resolver en la astronomía observacional durante más de dos siglos de mediciones.',
      'Además del problema observacional, existía una cuestión teórica fundamental: el modelo calculaba la magnitud de la gravedad, pero no explicaba el mecanismo de esta atracción a través del vacío. La transmisión de una fuerza a distancia sin un medio físico que conectara los objetos celestes resultaba incomprensible desde una perspectiva mecanicista. Esta limitación conceptual fue aceptada temporalmente debido a la precisión de los cálculos predictivos. El paradigma newtoniano dominó la física hasta que Albert Einstein formuló una nueva descripción geométrica.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la cinta, el profesor Brand y Murph analizan una anomalía gravitacional utilizando ecuaciones complejas en su pizarra. Su objetivo es desarrollar un método para manipular la gravedad y facilitar el lanzamiento de estaciones espaciales masivas desde la superficie terrestre. Este desafío supera las capacidades del modelo newtoniano tradicional y requiere la integración de conceptos derivados de la relatividad general y la mecánica cuántica para lograr la viabilidad técnica del éxodo humano.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El episodio de la manzana es un hecho documentado que Newton relató a su biógrafo William Stukeley en 1726, aunque el objeto no impactó directamente en su cabeza. Lo relevante de este evento histórico es que impulsó a Newton a correlacionar la aceleración de los cuerpos en caída libre con la mecánica orbital. Este análisis comparativo permitió establecer que la fuerza gravitacional terrestre se extiende por el espacio, disminuyendo su intensidad en función del cuadrado de la distancia.' }
    ],
    fact: 'A pesar de que el marco teórico de la relatividad general superó la conceptualización newtoniana del espacio, la ecuación F=GMm/rÂ² mantiene una utilidad práctica excepcional en la ingeniería aeroespacial. Agencias como la NASA utilizan este modelo matemático clásico para calcular las trayectorias de las sondas espaciales que exploran planetas como Marte y Júpiter. La simplicidad y precisión de la mecánica newtoniana resultan suficientes para planificar misiones de navegación interplanetaria en entornos con campos gravitacionales de baja intensidad.'
  },
  {
    id: 'einstein-1915',
    title: 'Einstein Cambia Todo',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m1/btn_einstein-1915.jpg',
    image: '/assets/interstellar/infographic_m1/hero_einstein-1915.jpg',
    content: [
      'El 25 de noviembre de 1915, Albert Einstein presentó ante la Academia Prusiana de las Ciencias su Teoría de la Relatividad General. Este marco teórico transformó la concepción física del universo al descartar el modelo newtoniano de una fuerza de atracción instantánea. Einstein demostró que la gravitación no es una interacción a distancia a través del vacío, sino una manifestación de la geometría del universo. Su formulación matemática requirió una década de desarrollo analítico para establecer las ecuaciones que describen la dinámica del cosmos.',
      'Einstein postuló que el universo está constituido por un continuo tetradimensional denominado espacio-tiempo. Este modelo geométrico establece que la presencia de materia y energía deforma la estructura espacial circundante. Cualquier objeto con masa, como una estrella o un planeta, altera la métrica del espacio-tiempo en su vecindad. Esta curvatura determina las trayectorias que siguen los cuerpos celestes al desplazarse, sustituyendo la noción de atracción gravitacional por un desplazamiento inercial a través de una geometría espacial deformada.',
      'Bajo este paradigma relativista, la órbita de la Tierra alrededor del Sol no resulta de una fuerza tractora invisible. Nuestro planeta describe una trayectoria inercial a lo largo de la curvatura espacio-temporal generada por la masa solar. El movimiento orbital es el resultado de un cuerpo que avanza en un espacio cuya geometría ha sido modificada por una concentración de energía. Esta conceptualización permitió unificar la dinámica de la materia con la geometría del espacio, estableciendo un marco teórico donde la masa dicta la forma del entorno cósmico.',
      'La primera validación empírica de la relatividad general se obtuvo al analizar la órbita de Mercurio. Al aplicar las ecuaciones del espacio curvo, Einstein logró calcular la precesión del perihelio planetario con exactitud matemática. El resultado coincidió con las observaciones astronómicas que la mecánica newtoniana no había podido explicar. Esta resolución teórica demostró la superioridad del modelo relativista y consolidó la aceptación de la nueva teoría dentro de la comunidad científica internacional, marcando un hito en la astrofísica moderna.',
      'La formulación de la relatividad general redefinió los principios fundamentales de la física teórica. La gravedad fue comprendida como una propiedad geométrica del espacio-tiempo en lugar de una fuerza mecánica. Esta perspectiva no solo resolvió anomalías orbitales conocidas, sino que permitió predecir fenómenos astrofísicos inéditos. Las ecuaciones de Einstein sentaron las bases para el estudio de la cosmología moderna y anticiparon la existencia de singularidades gravitacionales y la expansión métrica del universo en su conjunto.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El concepto de la gravedad como curvatura del espacio-tiempo es fundamental en la trama narrativa. Durante la navegación de la nave Endurance a través del agujero de gusano y su aproximación al agujero negro Gargantúa, la tripulación experimenta los efectos de regiones con geometría espacial extrema. Estas anomalías gravitacionales determinan las trayectorias de vuelo y los métodos de propulsión utilizados por los astronautas, reflejando los principios físicos establecidos por la relatividad general en el diseño de la exploración interestelar.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Tras confirmar que sus ecuaciones predecían correctamente la precesión de Mercurio, Einstein experimentó una profunda satisfacción intelectual. En correspondencia con colegas científicos, documentó que la confirmación de su teoría le provocó palpitaciones debido a la trascendencia del descubrimiento. La resolución matemática de un problema astronómico persistente representó la validación de años de trabajo teórico y demostró que la descripción geométrica del universo correspondía a la realidad física observable en el sistema solar.' }
    ],
    fact: 'Las ecuaciones de campo de Einstein constituyen un sistema de diez ecuaciones diferenciales no lineales que relacionan la geometría del espacio-tiempo con la distribución de materia. Aunque se expresan de forma compacta mediante notación tensorial (GÎ¼Î½ + Î›gÎ¼Î½ = 8Ï€G/c4 TÎ¼Î½), su resolución analítica presenta una complejidad matemática extrema. Históricamente, requirieron décadas de investigación computacional para modelar sistemas astrofísicos complejos, como la fusión de estrellas de neutrones o la dinámica de formaciones galácticas a gran escala.'
  },
  {
    id: 'curvatura-espaciotiempo',
    title: 'El Espacio se Curva',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m1/btn_curvatura-espaciotiempo.jpg',
    image: '/assets/interstellar/infographic_m1/hero_curvatura-espaciotiempo.jpg',
    content: [
      'Para comprender la mecánica de la relatividad general, es necesario conceptualizar el espacio y el tiempo como una entidad dinámica y unificada. A diferencia del modelo clásico que postula un escenario tridimensional rígido, el espacio-tiempo se comporta como un medio elástico que interactúa con la materia. Esta estructura dimensional responde a la presencia de energía deformando su métrica local. Las alteraciones en la geometría espacial dictan cómo se propagan la luz y los cuerpos físicos a lo largo del cosmos, estableciendo una relación bidireccional.',
      'Una analogía física útil consiste en visualizar una superficie elástica bidimensional sobre la cual se deposita un objeto de gran masa. La presencia de este cuerpo genera una depresión en la estructura del material, alterando la geometría de su entorno inmediato. En el contexto astrofísico, estrellas y planetas ejercen un efecto análogo sobre el continuo espacio-temporal. La concentración de masa curva el espacio a su alrededor, creando gradientes métricos que determinan las trayectorias de otros objetos que ingresan a su zona de influencia gravitacional.',
      'Cuando un objeto de menor masa se desplaza cerca de esta deformación geométrica, su trayectoria rectilínea se modifica debido a la curvatura del espacio. El cuerpo celeste no es desviado por una fuerza de atracción directa, sino que sigue la ruta más eficiente a través de una topología alterada. Este principio explica el movimiento de los planetas en órbita alrededor de una estrella central. La dinámica orbital es una consecuencia puramente geométrica de la interacción entre la materia en movimiento y la estructura deformada del espacio-tiempo.',
      'El físico teórico John Archibald Wheeler sintetizó esta interacción mediante una formulación didáctica reconocida en la comunidad científica. Su resumen establece que el espacio-tiempo indica a la materia cómo acelerar, mientras que la materia determina cómo debe curvarse el espacio-tiempo. Este principio de reciprocidad define la naturaleza no lineal de las ecuaciones de Einstein. La distribución de masa configura la geometría del universo, y simultáneamente, esta arquitectura dimensional rige el desplazamiento de toda la materia y energía contenida en él.',
      'La influencia gravitacional no se restringe a las tres dimensiones espaciales, sino que afecta simultáneamente a la dimensión temporal. La teoría predice que la métrica del tiempo transcurre a diferente velocidad dependiendo del potencial gravitatorio local. En regiones con mayor curvatura espacial, los intervalos temporales se dilatan respecto a un observador situado en un entorno de menor gravedad. Este fenómeno, denominado dilatación temporal gravitacional, constituye una de las consecuencias empíricas más significativas de la relatividad general.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La dilatación gravitacional del tiempo constituye un elemento argumental clave durante la misión en el planeta de Miller. Debido a la proximidad con el agujero negro Gargantúa, el planeta experimenta un gradiente gravitacional extremo que altera la métrica temporal local. Esta curvatura espacio-temporal genera un desfase donde una hora en la superficie del planeta equivale a siete años terrestres. El fenómeno ilustra las consecuencias de la relatividad general sobre la sincronización temporal entre observadores ubicados en distintos potenciales gravitatorios.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Aunque las representaciones gráficas del espacio-tiempo suelen emplear modelos bidimensionales para facilitar la comprensión, la curvatura real ocurre de manera simultánea en las cuatro dimensiones del continuo. La deformación métrica afecta el volumen espacial y el flujo temporal en todas las direcciones alrededor de una masa central. Este fenómeno tensorial requiere de formulaciones matemáticas avanzadas para su descripción precisa, ya que la contracción tridimensional del espacio no puede visualizarse intuitivamente mediante analogías geométricas simples.' }
    ],
    fact: 'El desarrollo de la relatividad general exigió la aplicación de herramientas matemáticas especializadas, como la geometría de Riemann y el cálculo tensorial. Estos métodos permiten describir la curvatura de variedades multidimensionales independientes de un sistema de coordenadas específico. Las ecuaciones resultantes modelan cómo los gradientes de presión, la densidad de energía y el momento cinético alteran la topología del universo. Su aplicación requiere un análisis riguroso para interpretar la mecánica de fluidos relativistas y la dinámica estelar.'
  },
  {
    id: 'geodesicas',
    title: 'Líneas Rectas Curvas',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m1/btn_geodesicas.jpg',
    image: '/assets/interstellar/infographic_m1/hero_geodesicas.jpg',
    content: [
      'En la geometría euclidiana tradicional, la distancia más corta entre dos puntos se define invariablemente mediante una línea recta. Este axioma matemático es aplicable en superficies planas, pero pierde validez al analizar la topología del universo a escala macroscópica. El continuo espacio-temporal presenta una curvatura inherente generada por la distribución de masa y energía. Debido a esta geometría no euclidiana, las trayectorias de desplazamiento en el cosmos requieren de un marco analítico distinto para calcular las rutas óptimas entre diferentes coordenadas.',
      'En el ámbito de la física diferencial, las trayectorias óptimas a través de un espacio curvo reciben el nombre de líneas geodésicas. Una geodésica representa la generalización del concepto de línea recta aplicado a geometrías deformadas. Para comprender este principio, es útil observar las rutas de navegación aérea intercontinental sobre la superficie terrestre. Los aviones no siguen trayectorias rectilíneas en proyecciones cartográficas bidimensionales, sino que trazan curvas ortodrómicas que minimizan la distancia real de vuelo sobre la esfera planetaria.',
      'Al proyectar una ruta transatlántica sobre un mapa plano, la trayectoria aparenta ser un arco parabólico que se aproxima a las regiones polares. Esta representación bidimensional distorsiona la métrica real del trayecto, sugiriendo erróneamente un recorrido subóptimo y un consumo excesivo de combustible. La distorsión visual es consecuencia directa de intentar plasmar una geometría tridimensional curva sobre un plano bidimensional euclidiano, lo que altera las proporciones espaciales y oculta la verdadera eficiencia matemática de la ruta seleccionada.',
      'La justificación geométrica de estas rutas aéreas reside en la morfología esférica del planeta Tierra. Al trazar una línea tensa entre dos ciudades sobre un modelo tridimensional esférico, la cuerda se alinea con un segmento de círculo máximo. Esta trayectoria curva en el espacio tridimensional constituye la distancia métrica más corta entre ambos puntos. El arco ortodrómico minimiza el trayecto físico, demostrando cómo la curvatura de la superficie define intrínsecamente el comportamiento de las líneas geodésicas en sistemas de navegación geocéntrica.',
      'Aplicando este principio a la mecánica orbital, los cuerpos celestes y las sondas espaciales no describen órbitas elípticas debido a una fuerza de tracción centrípeta. En realidad, estos objetos se desplazan siguiendo trayectorias geodésicas a través del espacio-tiempo curvado por masas mayores. Avanzan en línea recta a velocidad constante dentro de su sistema de referencia local. La aparente órbita circular es la manifestación tridimensional de un desplazamiento inercial sobre la topología deformada generada por la presencia de una estrella central o planeta.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La nave Endurance utiliza el concepto de líneas geodésicas para optimizar sus trayectorias orbitales y conservar recursos de propulsión. Durante su aproximación al sistema planetario de Gargantúa, la tripulación ejecuta maniobras de asistencia gravitacional calculadas matemáticamente. Al aprovechar la curvatura local del espacio-tiempo, la nave altera su vector de velocidad sin requerir combustión química sostenida. Este método de navegación relativista demuestra la aplicación práctica de la geometría espacial para la exploración eficiente del espacio profundo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El término matemático "geodésica" tiene su origen etimológico en el griego clásico y se traduce como la división de la Tierra. Históricamente, esta disciplina se enfocaba en la medición precisa de terrenos geográficos y el establecimiento de fronteras territoriales sobre la superficie esférica del planeta. Con el desarrollo de la geometría diferencial, el concepto se abstrajo para describir rutas de distancia mínima en variedades matemáticas complejas, convirtiéndose en una herramienta analítica fundamental para la formulación de la relatividad general.' }
    ],
    fact: 'Los fotones que componen la radiación electromagnética carecen de masa en reposo, lo que los obliga a desplazarse a la velocidad máxima permitida siguiendo geodésicas nulas del espacio-tiempo. Desde la perspectiva de un observador distante, la trayectoria de un haz de luz parece curvarse cuando transita por las proximidades de un campo gravitatorio intenso. Esta desviación aparente no se debe a una atracción física sobre los fotones, sino a la alteración geométrica del medio espacial por el que viaja la luz en su tránsito intergaláctico hacia la Tierra.'
  },
  {
    id: 'lentes-gravitacionales',
    title: 'El Universo como Lupa',
    color: '#00BCD4',
    btnImage: '/assets/interstellar/infographic_m1/btn_lentes-gravitacionales.jpg',
    image: '/assets/interstellar/infographic_m1/hero_lentes-gravitacionales.jpg',
    content: [
      'Las ecuaciones de la relatividad general determinaron que la concentración de masa provoca una deformación sustancial en el continuo espacio-temporal. Esta modificación de la geometría métrica no solo rige la cinemática de los planetas, sino que afecta a cualquier entidad física que atraviese la región curvada. A partir de este modelo matemático, Albert Einstein dedujo una consecuencia astrofísica sin precedentes empíricos: la trayectoria de propagación de la radiación electromagnética también se ve alterada por la presencia de campos gravitatorios intensos.',
      'El modelo teórico propuso que la magnitud de la curvatura generada por concentraciones masivas de materia afectaría el recorrido de los fotones. Einstein demostró analíticamente que la luz proveniente de galaxias distantes, al aproximarse a una fuente gravitacional intermedia, sufriría una deflexión medible en su trayectoria original. Esta predicción desafiaba los principios de la óptica clásica, estableciendo que el vacío cósmico deformado actúa sobre la propagación rectilínea de la luz, alterando la posición aparente de los cuerpos celestes de fondo.',
      'En términos observacionales, si una estructura astronómica de gran masa se alinea entre un observador terrestre y una fuente luminosa distante, el campo gravitatorio modifica los frentes de onda de la luz. Esta configuración espacial, que involucra galaxias masivas o agrupaciones de materia oscura, desvía los rayos luminosos convergentes de forma análoga a la refracción en un medio óptico. El efecto produce una magnificación y distorsión de la imagen original, convirtiendo al objeto masivo intermedio en un instrumento astronómico de escala intergaláctica.',
      'El fenómeno astrofísico de deflexión lumínica se denomina en la literatura científica como lente gravitacional. En el año 1919, el astrofísico británico Arthur Eddington organizó una expedición observacional a la isla de Príncipe para documentar un eclipse solar total. El objetivo experimental consistía en medir la desviación astrométrica de la luz estelar al pasar cerca de la masa del Sol. Los resultados fotográficos obtenidos confirmaron las predicciones matemáticas de Einstein, proporcionando la primera evidencia empírica rigurosa de la curvatura del espacio.',
      'En la astronomía contemporánea, el fenómeno de lentes gravitacionales constituye una herramienta analítica primordial para la investigación cosmológica. Mediante el uso de telescopios espaciales como el Hubble y el James Webb, los astrofísicos utilizan estos agrupamientos galácticos para observar objetos distantes de otra manera indetectables. El análisis de las imágenes distorsionadas permite estudiar la distribución espacial de la materia oscura, medir tasas de expansión cósmica y analizar la morfología de galaxias formadas en las etapas iniciales del universo.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La representación visual del agujero negro Gargantúa exhibe un disco de acreción cuya luz sufre distorsiones ópticas complejas. La emisión fotónica originada en la parte posterior del disco se desvía por el intenso campo gravitatorio, formando anillos luminosos aparentes por encima y por debajo de la sombra del horizonte de sucesos. Esta simulación gráfica se calculó mediante algoritmos de trazado de rayos relativistas, logrando visualizar con precisión matemática los efectos extremos de una lente gravitacional generada por una singularidad de masa supermasiva.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Cuando existe un alineamiento colineal perfecto entre el observador terrestre, el cuerpo masivo que actúa como lente y la fuente de luz de fondo, la deflexión gravitacional produce un patrón de simetría circular. La radiación electromagnética se desvía equitativamente en todas las trayectorias tangenciales alrededor del eje central, proyectando una estructura luminosa en forma de anillo. Este fenómeno óptico, denominado Anillo de Einstein, permite a los astrofísicos calcular la masa total de la galaxia interpuesta analizando el radio angular de la imagen resultante.' }
    ],
    fact: 'Los resultados de la expedición científica liderada por Arthur Eddington en 1919 representaron una validación empírica decisiva para la física teórica moderna. La comprobación astrométrica de la deflexión de la luz estelar refutó aspectos fundamentales del modelo newtoniano tradicional. La publicación de los datos experimentales en la Royal Society de Londres generó un cambio de paradigma inmediato en la comunidad científica, consolidando el marco de la relatividad general como la descripción estándar para el estudio de los fenómenos gravitacionales en el universo.'
  },
  {
    id: 'ondas-gravitacionales',
    title: 'Olas en el Espacio',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m1/btn_ondas-gravitacionales.jpg',
    image: '/assets/interstellar/infographic_m1/hero_ondas-gravitacionales.jpg',
    content: [
      'Para comprender la propagación de perturbaciones en el espacio-tiempo, podemos observar la dinámica de ondas mecánicas en medios fluidos. Al aplicar una fuerza repentina sobre la superficie de un estanque en reposo, se genera una transferencia de energía cinética que altera la estructura del medio líquido. Esta disipación energética se manifiesta como patrones ondulatorios concéntricos que viajan a través del volumen de agua. El modelo hidrodinámico proporciona una base analógica para interpretar el transporte de energía mecánica a grandes distancias mediante vibraciones.',
      'En 1916, utilizando las ecuaciones del tensor métrico, Albert Einstein formuló una hipótesis que expandió las implicaciones de su modelo gravitacional. Demostró analíticamente que las variaciones aceleradas en campos gravitatorios asimétricos debían propagarse por el vacío cósmico a la velocidad de la luz. Esta solución matemática indicó que el continuo espacio-temporal poseía propiedades dinámicas similares a un medio elástico, capaz de sustentar vibraciones transversales y transmitir energía orbital lejos de los sistemas astrofísicos que experimentaban aceleración.',
      'El marco teórico establece que cuando dos masas estelares compactas experimentan aceleraciones extremas, su movimiento altera rápidamente la métrica espacial circundante. Eventos astrofísicos cataclísmicos, como la coalescencia orbital de objetos masivos, generan fluctuaciones periódicas en la topología del espacio. Estas perturbaciones dinámicas, predichas por la relatividad general, irradian energía desde el baricentro del sistema hacia el exterior, induciendo deformaciones métricas que se desplazan de forma independiente de la materia que las originó espacialmente.',
      'En la terminología astrofísica moderna, estas fluctuaciones de la métrica espacial se conocen como ondas gravitacionales. A nivel fundamental, constituyen oscilaciones del campo gravitatorio que modifican la distancia relativa entre partículas en caída libre. A medida que una onda atraviesa una región del espacio, induce una deformación tensorial: estira temporalmente el volumen en un eje espacial y lo comprime simultáneamente en el eje ortogonal. Esta variación dimensional diminuta transporta información directa sobre la dinámica interna de los eventos estelares más energéticos.',
      'La confirmación experimental de este fenómeno requirió un siglo de desarrollo tecnológico en instrumentación interferométrica de alta precisión. El 14 de septiembre de 2015, los detectores del observatorio LIGO registraron variaciones de fase láser proporcionales a una fracción del diámetro de un protón. La señal analizada coincidió matemáticamente con los modelos computacionales de relatividad numérica, confirmando empíricamente la existencia de las ondas gravitacionales y marcando el inicio formal de una nueva rama en la astronomía de observación multimensajero.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La trama de Interstellar culmina con el envío de datos cuánticos a través de alteraciones gravitacionales en las dimensiones espaciales. Murph Cooper analiza estas fluctuaciones métricas transmitidas desde el teseracto cuadridimensional, codificadas en el movimiento de un reloj de pulsera. La extracción de esta información estructural permite a la física terrestre formular una teoría unificada que resuelve el problema del control gravitacional. Este avance científico posibilita la manipulación espacial necesaria para evacuar estaciones masivas desde la superficie del planeta.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El análisis del espectro de frecuencias registrado por el interferómetro LIGO permitió identificar la fuente astronómica de la señal ondulatoria. El patrón de onda, denominado chirp, correspondió a la fase final de coalescencia orbital de un sistema binario masivo. Durante los milisegundos críticos de la fusión, las ecuaciones indicaron que la conversión de masa en energía gravitacional superó temporalmente la luminosidad electromagnética combinada de todas las estrellas del universo observable, distorsionando severamente el tensor métrico del espacio-tiempo circundante.' }
    ],
    fact: 'El físico teórico Kip Thorne colaboró en el desarrollo matemático inicial de los observatorios de interferometría láser y estableció los fundamentos teóricos para el análisis de ondas gravitacionales. Su investigación sobre modelos numéricos permitió distinguir las señales cósmicas del ruido sísmico ambiental terrestre. Adicionalmente, Thorne participó como asesor científico principal en la producción de Interstellar, aplicando sus algoritmos de trazado de rayos para asegurar que las simulaciones visuales del disco de acreción respetaran rigurosamente las ecuaciones de Einstein.'
  },
  {
    id: 'gps-relatividad',
    title: 'Einstein en tu Bolsillo',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m1/btn_gps-relatividad.jpg',
    image: '/assets/interstellar/infographic_m1/hero_gps-relatividad.jpg',
    content: [
      'El análisis de los tensores métricos y la deformación geométrica del vacío cósmico podría parecer una disciplina teórica sin aplicaciones prácticas en la ingeniería convencional. Los fenómenos de curvatura espacial provocados por objetos supermasivos o las anomalías temporales cerca del horizonte de sucesos sugieren escenarios que escapan a la experiencia cotidiana. No obstante, las predicciones derivadas de la mecánica relativista resultan esenciales para el diseño y funcionamiento operativo de diversas infraestructuras tecnológicas críticas en la sociedad contemporánea actual.',
      'Lejos de constituir abstracciones matemáticas, las correcciones dictadas por la relatividad general y especial se aplican de forma sistemática en sistemas de navegación digital terrestre. Los circuitos de sincronización integrados en los dispositivos de comunicación móvil dependen directamente de estas ecuaciones para estabilizar las señales de temporización. La precisión del posicionamiento geográfico que utilizamos habitualmente para calcular rutas de desplazamiento requiere algoritmos que compensan continuamente los gradientes gravitatorios y la dilatación temporal cinemática.',
      'El sistema de posicionamiento global, conocido bajo el acrónimo GPS, opera mediante una constelación sincronizada de satélites ubicados en la órbita terrestre media. Esta red de telemetría orbital transmite señales de microondas codificadas con marcas de tiempo atómico hacia los receptores ubicados en la superficie del planeta. El cálculo preciso de la longitud, latitud y altitud del usuario se obtiene midiendo el tiempo de tránsito de las señales desde múltiples satélites, lo que exige una coordinación de relojes con un margen de error menor a unos pocos nanosegundos diarios.',
      'En el análisis de la red orbital satelital, los principios de la mecánica relativista manifiestan efectos medibles debido a las condiciones cinemáticas y topológicas. Los equipos de telecomunicaciones deben enfrentarse al hecho de que la velocidad de traslación orbital altera los intervalos temporales relativos entre sistemas de referencia. Adicionalmente, la diferencia en el potencial gravitacional entre la órbita y la superficie modifica la frecuencia electromagnética. La suma de estos fenómenos físicos exige ajustes continuos para mantener la integridad de los datos de navegación.',
      'La relatividad especial induce un retraso cinemático de 7 microsegundos diarios debido a la velocidad orbital de los satélites. Simultáneamente, la menor intensidad gravitacional en órbita ocasiona que la relatividad general adelante los osciladores atómicos en 45 microsegundos. El desfase neto resultante de 38 microsegundos por día generaría errores de medición geométrica crecientes si no se corrigiera en el software base. Para garantizar el funcionamiento del sistema global, los microprocesadores satelitales aplican compensaciones matemáticas relativistas de forma constante.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La desincronización temporal derivada de diferencias en campos gravitacionales es un factor crítico en el desarrollo narrativo durante la exploración del sistema planetario. La asimetría en la medición del tiempo entre la tripulación descendiendo a la superficie y el observador remoto en órbita alta ilustra la magnitud física de la dilatación. Mientras que en la infraestructura GPS terrestre la corrección es del orden de microsegundos, la proximidad del agujero negro amplifica exponencialmente el efecto, resultando en una separación temporal irreconciliable de varios años terrestres.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante la fase de diseño inicial de la arquitectura satelital para el posicionamiento global, existió controversia entre los ingenieros aeroespaciales respecto a la inclusión de algoritmos de compensación relativista. Parte del equipo técnico cuestionaba la viabilidad empírica de aplicar tensores de la relatividad general a hardware de telecomunicaciones. Como medida de precaución, los primeros satélites experimentales incluyeron módulos sintetizadores de frecuencia ajustables, permitiendo activar las correcciones matemáticas únicamente tras verificar la deriva temporal en órbita.' }
    ],
    fact: 'Si los algoritmos del sistema de navegación satelital omitieran las correcciones prescritas por la formulación de Einstein, los relojes atómicos de rubidio perderían su sincronización basal de forma inmediata. El desfase acumulativo de 38 microsegundos introduciría un error de posicionamiento superficial aproximado de 11 kilómetros durante el primer ciclo diario de operaciones. Esta rápida degradación de los datos telemétricos invalidaría por completo la funcionalidad de la red GPS para aplicaciones de navegación comercial, coordinación logística y geolocalización de precisión.'
  }
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
    </div>
  );
}

// â”€â”€â”€ Interstellar Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function InterstellarHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.3))' }}>
        {/* Temporal arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#timeGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 time markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#F4A261','#4FC3F7','#7C4DFF','#FF6B35','#00BCD4','#AB47BC','#26A69A'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central hole icon */}
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
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EINSTEIN Y LA RED INVISIBLE</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">RELATIVIDAD VS GRAVEDAD NEWTONIANA</text>
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
          layoutId="activeDotInterstellar"
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

// â”€â”€â”€ Expandable Section with Random Direction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color:'#0a0c1e',
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
export default function InteractiveInfographic_InterstellarM1() {
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
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '1.5rem' }}>
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
      </div>
      
      {/* Lightbox component */}
      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
