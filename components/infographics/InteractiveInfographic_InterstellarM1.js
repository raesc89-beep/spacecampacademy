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
  'gravedad-newton': [DecoOrbit, DecoSpacetimeGrid, DecoBlackHole],
  'einstein-1915': [DecoEqualSign, DecoSpacetimeGrid, DecoOrbit],
  'curvatura-espaciotiempo': [DecoSpacetimeGrid, DecoBlackHole, DecoWaveRipple],
  'geodesicas': [DecoOrbit, DecoSpacetimeGrid, DecoWaveRipple],
  'lentes-gravitacionales': [DecoBlackHole, DecoSpacetimeGrid, DecoEqualSign],
  'ondas-gravitacionales': [DecoWaveRipple, DecoBlackHole, DecoOrbit],
  'gps-relatividad': [DecoOrbit, DecoWaveRipple, DecoEqualSign],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Einstein, A. (1915). Die Feldgleichungen der Gravitation, Sitzungsberichte der Preussischen Akademie der Wissenschaften',
  'Misner, C., Thorne, K., Wheeler, J. (1973). Gravitation, W.H. Freeman',
  'Abbott, B.P. et al. (2016). "Observation of Gravitational Waves from a Binary Black Hole Merger", Physical Review Letters, 116(6)',
  'Will, C.M. (2014). "The Confrontation between General Relativity and Experiment", Living Reviews in Relativity, 17(1)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'gravedad-newton',
    title: 'La Gravedad de Newton',
    color: '#F4A261',
    btnImage: '/assets/interstellar/infographic_m1/btn_newton.jpg',
    image: '/assets/interstellar/infographic_m1/hero_newton.jpg',
    content: [
      'En 1666, Isaac Newton se encontraba en su granja familiar mientras se refugiaba de la plaga de Londres. Al observar la caÃ­da de una manzana, formulÃ³ una hipÃ³tesis fundamental para la historia de la ciencia. Dedujo que la fuerza que atraÃ­a la fruta hacia el suelo era idÃ©ntica a la interacciÃ³n que mantenÃ­a a la Luna en su Ã³rbita alrededor de la Tierra. Esta observaciÃ³n le permitiÃ³ concluir que el movimiento de los cuerpos celestes y el de los objetos terrestres estaban regidos por el mismo principio fÃ­sico, sentando las bases de la mecÃ¡nica clÃ¡sica.',
      'Newton denominÃ³ a esta interacciÃ³n "gravedad" y postulÃ³ que todos los objetos del universo se atraen mutuamente en proporciÃ³n a su masa. SegÃºn este modelo matemÃ¡tico, cada cuerpo celeste ejerce una fuerza sobre los demÃ¡s objetos a su alrededor. Cuanto mayor es la masa del objeto, mÃ¡s intensa es su atracciÃ³n gravitacional. Por este motivo, el Sol puede mantener a los planetas del sistema solar en sus Ã³rbitas elÃ­pticas. Esta descripciÃ³n permitiÃ³ entender la dinÃ¡mica orbital mediante ecuaciones matemÃ¡ticas sin depender de explicaciones sobrenaturales.',
      'La ley de gravitaciÃ³n universal, expresada mediante la ecuaciÃ³n F=GMm/rÂ², proporcionÃ³ un marco riguroso para predecir el movimiento de la materia. Esta fÃ³rmula permitiÃ³ calcular fenÃ³menos terrestres como las mareas oceÃ¡nicas y trayectorias de proyectiles con precisiÃ³n matemÃ¡tica. Gracias a este modelo, los cientÃ­ficos de la Ã©poca lograron modelar la mecÃ¡nica del sistema solar. La gravitaciÃ³n universal demostrÃ³ que los principios fÃ­sicos aplicables en la Tierra eran vÃ¡lidos en todo el universo, consolidando el papel de las matemÃ¡ticas en la ciencia.',
      'A pesar de su Ã©xito, el modelo gravitacional de Newton presentaba una limitaciÃ³n observable: la Ã³rbita de Mercurio. El planeta mÃ¡s cercano al Sol describe una trayectoria elÃ­ptica que sufre una variaciÃ³n gradual en cada revoluciÃ³n. Este fenÃ³meno orbital, conocido en astrofÃ­sica como la precesiÃ³n del perihelio, producÃ­a un desvÃ­o que las ecuaciones newtonianas no lograban cuantificar con exactitud. La anomalÃ­a en el movimiento de Mercurio permaneciÃ³ como un problema sin resolver en la astronomÃ­a observacional durante mÃ¡s de dos siglos de mediciones.',
      'AdemÃ¡s del problema observacional, existÃ­a una cuestiÃ³n teÃ³rica fundamental: el modelo calculaba la magnitud de la gravedad, pero no explicaba el mecanismo de esta atracciÃ³n a travÃ©s del vacÃ­o. La transmisiÃ³n de una fuerza a distancia sin un medio fÃ­sico que conectara los objetos celestes resultaba incomprensible desde una perspectiva mecanicista. Esta limitaciÃ³n conceptual fue aceptada temporalmente debido a la precisiÃ³n de los cÃ¡lculos predictivos. El paradigma newtoniano dominÃ³ la fÃ­sica hasta que Albert Einstein formulÃ³ una nueva descripciÃ³n geomÃ©trica.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'En la cinta, el profesor Brand y Murph analizan una anomalÃ­a gravitacional utilizando ecuaciones complejas en su pizarra. Su objetivo es desarrollar un mÃ©todo para manipular la gravedad y facilitar el lanzamiento de estaciones espaciales masivas desde la superficie terrestre. Este desafÃ­o supera las capacidades del modelo newtoniano tradicional y requiere la integraciÃ³n de conceptos derivados de la relatividad general y la mecÃ¡nica cuÃ¡ntica para lograr la viabilidad tÃ©cnica del Ã©xodo humano.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El episodio de la manzana es un hecho documentado que Newton relatÃ³ a su biÃ³grafo William Stukeley en 1726, aunque el objeto no impactÃ³ directamente en su cabeza. Lo relevante de este evento histÃ³rico es que impulsÃ³ a Newton a correlacionar la aceleraciÃ³n de los cuerpos en caÃ­da libre con la mecÃ¡nica orbital. Este anÃ¡lisis comparativo permitiÃ³ establecer que la fuerza gravitacional terrestre se extiende por el espacio, disminuyendo su intensidad en funciÃ³n del cuadrado de la distancia.' }
    ],
    fact: 'A pesar de que el marco teÃ³rico de la relatividad general superÃ³ la conceptualizaciÃ³n newtoniana del espacio, la ecuaciÃ³n F=GMm/rÂ² mantiene una utilidad prÃ¡ctica excepcional en la ingenierÃ­a aeroespacial. Agencias como la NASA utilizan este modelo matemÃ¡tico clÃ¡sico para calcular las trayectorias de las sondas espaciales que exploran planetas como Marte y JÃºpiter. La simplicidad y precisiÃ³n de la mecÃ¡nica newtoniana resultan suficientes para planificar misiones de navegaciÃ³n interplanetaria en entornos con campos gravitacionales de baja intensidad.'
  },
  {
    id: 'einstein-1915',
    title: 'Einstein Cambia Todo',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m1/btn_einstein.jpg',
    image: '/assets/interstellar/infographic_m1/hero_einstein.jpg',
    content: [
      'El 25 de noviembre de 1915, Albert Einstein presentÃ³ ante la Academia Prusiana de las Ciencias su TeorÃ­a de la Relatividad General. Este marco teÃ³rico transformÃ³ la concepciÃ³n fÃ­sica del universo al descartar el modelo newtoniano de una fuerza de atracciÃ³n instantÃ¡nea. Einstein demostrÃ³ que la gravitaciÃ³n no es una interacciÃ³n a distancia a travÃ©s del vacÃ­o, sino una manifestaciÃ³n de la geometrÃ­a del universo. Su formulaciÃ³n matemÃ¡tica requiriÃ³ una dÃ©cada de desarrollo analÃ­tico para establecer las ecuaciones que describen la dinÃ¡mica del cosmos.',
      'Einstein postulÃ³ que el universo estÃ¡ constituido por un continuo tetradimensional denominado espacio-tiempo. Este modelo geomÃ©trico establece que la presencia de materia y energÃ­a deforma la estructura espacial circundante. Cualquier objeto con masa, como una estrella o un planeta, altera la mÃ©trica del espacio-tiempo en su vecindad. Esta curvatura determina las trayectorias que siguen los cuerpos celestes al desplazarse, sustituyendo la nociÃ³n de atracciÃ³n gravitacional por un desplazamiento inercial a travÃ©s de una geometrÃ­a espacial deformada.',
      'Bajo este paradigma relativista, la Ã³rbita de la Tierra alrededor del Sol no resulta de una fuerza tractora invisible. Nuestro planeta describe una trayectoria inercial a lo largo de la curvatura espacio-temporal generada por la masa solar. El movimiento orbital es el resultado de un cuerpo que avanza en un espacio cuya geometrÃ­a ha sido modificada por una concentraciÃ³n de energÃ­a. Esta conceptualizaciÃ³n permitiÃ³ unificar la dinÃ¡mica de la materia con la geometrÃ­a del espacio, estableciendo un marco teÃ³rico donde la masa dicta la forma del entorno cÃ³smico.',
      'La primera validaciÃ³n empÃ­rica de la relatividad general se obtuvo al analizar la Ã³rbita de Mercurio. Al aplicar las ecuaciones del espacio curvo, Einstein logrÃ³ calcular la precesiÃ³n del perihelio planetario con exactitud matemÃ¡tica. El resultado coincidiÃ³ con las observaciones astronÃ³micas que la mecÃ¡nica newtoniana no habÃ­a podido explicar. Esta resoluciÃ³n teÃ³rica demostrÃ³ la superioridad del modelo relativista y consolidÃ³ la aceptaciÃ³n de la nueva teorÃ­a dentro de la comunidad cientÃ­fica internacional, marcando un hito en la astrofÃ­sica moderna.',
      'La formulaciÃ³n de la relatividad general redefiniÃ³ los principios fundamentales de la fÃ­sica teÃ³rica. La gravedad fue comprendida como una propiedad geomÃ©trica del espacio-tiempo en lugar de una fuerza mecÃ¡nica. Esta perspectiva no solo resolviÃ³ anomalÃ­as orbitales conocidas, sino que permitiÃ³ predecir fenÃ³menos astrofÃ­sicos inÃ©ditos. Las ecuaciones de Einstein sentaron las bases para el estudio de la cosmologÃ­a moderna y anticiparon la existencia de singularidades gravitacionales y la expansiÃ³n mÃ©trica del universo en su conjunto.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'El concepto de la gravedad como curvatura del espacio-tiempo es fundamental en la trama narrativa. Durante la navegaciÃ³n de la nave Endurance a travÃ©s del agujero de gusano y su aproximaciÃ³n al agujero negro GargantÃºa, la tripulaciÃ³n experimenta los efectos de regiones con geometrÃ­a espacial extrema. Estas anomalÃ­as gravitacionales determinan las trayectorias de vuelo y los mÃ©todos de propulsiÃ³n utilizados por los astronautas, reflejando los principios fÃ­sicos establecidos por la relatividad general en el diseÃ±o de la exploraciÃ³n interestelar.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'atom', text: 'Tras confirmar que sus ecuaciones predecÃ­an correctamente la precesiÃ³n de Mercurio, Einstein experimentÃ³ una profunda satisfacciÃ³n intelectual. En correspondencia con colegas cientÃ­ficos, documentÃ³ que la confirmaciÃ³n de su teorÃ­a le provocÃ³ palpitaciones debido a la trascendencia del descubrimiento. La resoluciÃ³n matemÃ¡tica de un problema astronÃ³mico persistente representÃ³ la validaciÃ³n de aÃ±os de trabajo teÃ³rico y demostrÃ³ que la descripciÃ³n geomÃ©trica del universo correspondÃ­a a la realidad fÃ­sica observable en el sistema solar.' }
    ],
    fact: 'Las ecuaciones de campo de Einstein constituyen un sistema de diez ecuaciones diferenciales no lineales que relacionan la geometrÃ­a del espacio-tiempo con la distribuciÃ³n de materia. Aunque se expresan de forma compacta mediante notaciÃ³n tensorial (GÎ¼Î½ + Î›gÎ¼Î½ = 8Ï€G/c4 TÎ¼Î½), su resoluciÃ³n analÃ­tica presenta una complejidad matemÃ¡tica extrema. HistÃ³ricamente, requirieron dÃ©cadas de investigaciÃ³n computacional para modelar sistemas astrofÃ­sicos complejos, como la fusiÃ³n de estrellas de neutrones o la dinÃ¡mica de formaciones galÃ¡cticas a gran escala.'
  },
  {
    id: 'curvatura-espaciotiempo',
    title: 'El Espacio se Curva',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m1/btn_curvatura.jpg',
    image: '/assets/interstellar/infographic_m1/hero_curvatura.jpg',
    content: [
      'Para comprender la mecÃ¡nica de la relatividad general, es necesario conceptualizar el espacio y el tiempo como una entidad dinÃ¡mica y unificada. A diferencia del modelo clÃ¡sico que postula un escenario tridimensional rÃ­gido, el espacio-tiempo se comporta como un medio elÃ¡stico que interactÃºa con la materia. Esta estructura dimensional responde a la presencia de energÃ­a deformando su mÃ©trica local. Las alteraciones en la geometrÃ­a espacial dictan cÃ³mo se propagan la luz y los cuerpos fÃ­sicos a lo largo del cosmos, estableciendo una relaciÃ³n bidireccional.',
      'Una analogÃ­a fÃ­sica Ãºtil consiste en visualizar una superficie elÃ¡stica bidimensional sobre la cual se deposita un objeto de gran masa. La presencia de este cuerpo genera una depresiÃ³n en la estructura del material, alterando la geometrÃ­a de su entorno inmediato. En el contexto astrofÃ­sico, estrellas y planetas ejercen un efecto anÃ¡logo sobre el continuo espacio-temporal. La concentraciÃ³n de masa curva el espacio a su alrededor, creando gradientes mÃ©tricos que determinan las trayectorias de otros objetos que ingresan a su zona de influencia gravitacional.',
      'Cuando un objeto de menor masa se desplaza cerca de esta deformaciÃ³n geomÃ©trica, su trayectoria rectilÃ­nea se modifica debido a la curvatura del espacio. El cuerpo celeste no es desviado por una fuerza de atracciÃ³n directa, sino que sigue la ruta mÃ¡s eficiente a travÃ©s de una topologÃ­a alterada. Este principio explica el movimiento de los planetas en Ã³rbita alrededor de una estrella central. La dinÃ¡mica orbital es una consecuencia puramente geomÃ©trica de la interacciÃ³n entre la materia en movimiento y la estructura deformada del espacio-tiempo.',
      'El fÃ­sico teÃ³rico John Archibald Wheeler sintetizÃ³ esta interacciÃ³n mediante una formulaciÃ³n didÃ¡ctica reconocida en la comunidad cientÃ­fica. Su resumen establece que el espacio-tiempo indica a la materia cÃ³mo acelerar, mientras que la materia determina cÃ³mo debe curvarse el espacio-tiempo. Este principio de reciprocidad define la naturaleza no lineal de las ecuaciones de Einstein. La distribuciÃ³n de masa configura la geometrÃ­a del universo, y simultÃ¡neamente, esta arquitectura dimensional rige el desplazamiento de toda la materia y energÃ­a contenida en Ã©l.',
      'La influencia gravitacional no se restringe a las tres dimensiones espaciales, sino que afecta simultÃ¡neamente a la dimensiÃ³n temporal. La teorÃ­a predice que la mÃ©trica del tiempo transcurre a diferente velocidad dependiendo del potencial gravitatorio local. En regiones con mayor curvatura espacial, los intervalos temporales se dilatan respecto a un observador situado en un entorno de menor gravedad. Este fenÃ³meno, denominado dilataciÃ³n temporal gravitacional, constituye una de las consecuencias empÃ­ricas mÃ¡s significativas de la relatividad general.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'La dilataciÃ³n gravitacional del tiempo constituye un elemento argumental clave durante la misiÃ³n en el planeta de Miller. Debido a la proximidad con el agujero negro GargantÃºa, el planeta experimenta un gradiente gravitacional extremo que altera la mÃ©trica temporal local. Esta curvatura espacio-temporal genera un desfase donde una hora en la superficie del planeta equivale a siete aÃ±os terrestres. El fenÃ³meno ilustra las consecuencias de la relatividad general sobre la sincronizaciÃ³n temporal entre observadores ubicados en distintos potenciales gravitatorios.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'atom', text: 'Aunque las representaciones grÃ¡ficas del espacio-tiempo suelen emplear modelos bidimensionales para facilitar la comprensiÃ³n, la curvatura real ocurre de manera simultÃ¡nea en las cuatro dimensiones del continuo. La deformaciÃ³n mÃ©trica afecta el volumen espacial y el flujo temporal en todas las direcciones alrededor de una masa central. Este fenÃ³meno tensorial requiere de formulaciones matemÃ¡ticas avanzadas para su descripciÃ³n precisa, ya que la contracciÃ³n tridimensional del espacio no puede visualizarse intuitivamente mediante analogÃ­as geomÃ©tricas simples.' }
    ],
    fact: 'El desarrollo de la relatividad general exigiÃ³ la aplicaciÃ³n de herramientas matemÃ¡ticas especializadas, como la geometrÃ­a de Riemann y el cÃ¡lculo tensorial. Estos mÃ©todos permiten describir la curvatura de variedades multidimensionales independientes de un sistema de coordenadas especÃ­fico. Las ecuaciones resultantes modelan cÃ³mo los gradientes de presiÃ³n, la densidad de energÃ­a y el momento cinÃ©tico alteran la topologÃ­a del universo. Su aplicaciÃ³n requiere un anÃ¡lisis riguroso para interpretar la mecÃ¡nica de fluidos relativistas y la dinÃ¡mica estelar.'
  },
  {
    id: 'geodesicas',
    title: 'LÃ­neas Rectas Curvas',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m1/btn_geodesica.jpg',
    image: '/assets/interstellar/infographic_m1/hero_geodesica.jpg',
    content: [
      'En la geometrÃ­a euclidiana tradicional, la distancia mÃ¡s corta entre dos puntos se define invariablemente mediante una lÃ­nea recta. Este axioma matemÃ¡tico es aplicable en superficies planas, pero pierde validez al analizar la topologÃ­a del universo a escala macroscÃ³pica. El continuo espacio-temporal presenta una curvatura inherente generada por la distribuciÃ³n de masa y energÃ­a. Debido a esta geometrÃ­a no euclidiana, las trayectorias de desplazamiento en el cosmos requieren de un marco analÃ­tico distinto para calcular las rutas Ã³ptimas entre diferentes coordenadas.',
      'En el Ã¡mbito de la fÃ­sica diferencial, las trayectorias Ã³ptimas a travÃ©s de un espacio curvo reciben el nombre de lÃ­neas geodÃ©sicas. Una geodÃ©sica representa la generalizaciÃ³n del concepto de lÃ­nea recta aplicado a geometrÃ­as deformadas. Para comprender este principio, es Ãºtil observar las rutas de navegaciÃ³n aÃ©rea intercontinental sobre la superficie terrestre. Los aviones no siguen trayectorias rectilÃ­neas en proyecciones cartogrÃ¡ficas bidimensionales, sino que trazan curvas ortodrÃ³micas que minimizan la distancia real de vuelo sobre la esfera planetaria.',
      'Al proyectar una ruta transatlÃ¡ntica sobre un mapa plano, la trayectoria aparenta ser un arco parabÃ³lico que se aproxima a las regiones polares. Esta representaciÃ³n bidimensional distorsiona la mÃ©trica real del trayecto, sugiriendo errÃ³neamente un recorrido subÃ³ptimo y un consumo excesivo de combustible. La distorsiÃ³n visual es consecuencia directa de intentar plasmar una geometrÃ­a tridimensional curva sobre un plano bidimensional euclidiano, lo que altera las proporciones espaciales y oculta la verdadera eficiencia matemÃ¡tica de la ruta seleccionada.',
      'La justificaciÃ³n geomÃ©trica de estas rutas aÃ©reas reside en la morfologÃ­a esfÃ©rica del planeta Tierra. Al trazar una lÃ­nea tensa entre dos ciudades sobre un modelo tridimensional esfÃ©rico, la cuerda se alinea con un segmento de cÃ­rculo mÃ¡ximo. Esta trayectoria curva en el espacio tridimensional constituye la distancia mÃ©trica mÃ¡s corta entre ambos puntos. El arco ortodrÃ³mico minimiza el trayecto fÃ­sico, demostrando cÃ³mo la curvatura de la superficie define intrÃ­nsecamente el comportamiento de las lÃ­neas geodÃ©sicas en sistemas de navegaciÃ³n geocÃ©ntrica.',
      'Aplicando este principio a la mecÃ¡nica orbital, los cuerpos celestes y las sondas espaciales no describen Ã³rbitas elÃ­pticas debido a una fuerza de tracciÃ³n centrÃ­peta. En realidad, estos objetos se desplazan siguiendo trayectorias geodÃ©sicas a travÃ©s del espacio-tiempo curvado por masas mayores. Avanzan en lÃ­nea recta a velocidad constante dentro de su sistema de referencia local. La aparente Ã³rbita circular es la manifestaciÃ³n tridimensional de un desplazamiento inercial sobre la topologÃ­a deformada generada por la presencia de una estrella central o planeta.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'La nave Endurance utiliza el concepto de lÃ­neas geodÃ©sicas para optimizar sus trayectorias orbitales y conservar recursos de propulsiÃ³n. Durante su aproximaciÃ³n al sistema planetario de GargantÃºa, la tripulaciÃ³n ejecuta maniobras de asistencia gravitacional calculadas matemÃ¡ticamente. Al aprovechar la curvatura local del espacio-tiempo, la nave altera su vector de velocidad sin requerir combustiÃ³n quÃ­mica sostenida. Este mÃ©todo de navegaciÃ³n relativista demuestra la aplicaciÃ³n prÃ¡ctica de la geometrÃ­a espacial para la exploraciÃ³n eficiente del espacio profundo.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El tÃ©rmino matemÃ¡tico "geodÃ©sica" tiene su origen etimolÃ³gico en el griego clÃ¡sico y se traduce como la divisiÃ³n de la Tierra. HistÃ³ricamente, esta disciplina se enfocaba en la mediciÃ³n precisa de terrenos geogrÃ¡ficos y el establecimiento de fronteras territoriales sobre la superficie esfÃ©rica del planeta. Con el desarrollo de la geometrÃ­a diferencial, el concepto se abstrajo para describir rutas de distancia mÃ­nima en variedades matemÃ¡ticas complejas, convirtiÃ©ndose en una herramienta analÃ­tica fundamental para la formulaciÃ³n de la relatividad general.' }
    ],
    fact: 'Los fotones que componen la radiaciÃ³n electromagnÃ©tica carecen de masa en reposo, lo que los obliga a desplazarse a la velocidad mÃ¡xima permitida siguiendo geodÃ©sicas nulas del espacio-tiempo. Desde la perspectiva de un observador distante, la trayectoria de un haz de luz parece curvarse cuando transita por las proximidades de un campo gravitatorio intenso. Esta desviaciÃ³n aparente no se debe a una atracciÃ³n fÃ­sica sobre los fotones, sino a la alteraciÃ³n geomÃ©trica del medio espacial por el que viaja la luz en su trÃ¡nsito intergalÃ¡ctico hacia la Tierra.'
  },
  {
    id: 'lentes-gravitacionales',
    title: 'El Universo como Lupa',
    color: '#00BCD4',
    btnImage: '/assets/interstellar/infographic_m1/btn_lentes.jpg',
    image: '/assets/interstellar/infographic_m1/hero_lentes.jpg',
    content: [
      'Las ecuaciones de la relatividad general determinaron que la concentraciÃ³n de masa provoca una deformaciÃ³n sustancial en el continuo espacio-temporal. Esta modificaciÃ³n de la geometrÃ­a mÃ©trica no solo rige la cinemÃ¡tica de los planetas, sino que afecta a cualquier entidad fÃ­sica que atraviese la regiÃ³n curvada. A partir de este modelo matemÃ¡tico, Albert Einstein dedujo una consecuencia astrofÃ­sica sin precedentes empÃ­ricos: la trayectoria de propagaciÃ³n de la radiaciÃ³n electromagnÃ©tica tambiÃ©n se ve alterada por la presencia de campos gravitatorios intensos.',
      'El modelo teÃ³rico propuso que la magnitud de la curvatura generada por concentraciones masivas de materia afectarÃ­a el recorrido de los fotones. Einstein demostrÃ³ analÃ­ticamente que la luz proveniente de galaxias distantes, al aproximarse a una fuente gravitacional intermedia, sufrirÃ­a una deflexiÃ³n medible en su trayectoria original. Esta predicciÃ³n desafiaba los principios de la Ã³ptica clÃ¡sica, estableciendo que el vacÃ­o cÃ³smico deformado actÃºa sobre la propagaciÃ³n rectilÃ­nea de la luz, alterando la posiciÃ³n aparente de los cuerpos celestes de fondo.',
      'En tÃ©rminos observacionales, si una estructura astronÃ³mica de gran masa se alinea entre un observador terrestre y una fuente luminosa distante, el campo gravitatorio modifica los frentes de onda de la luz. Esta configuraciÃ³n espacial, que involucra galaxias masivas o agrupaciones de materia oscura, desvÃ­a los rayos luminosos convergentes de forma anÃ¡loga a la refracciÃ³n en un medio Ã³ptico. El efecto produce una magnificaciÃ³n y distorsiÃ³n de la imagen original, convirtiendo al objeto masivo intermedio en un instrumento astronÃ³mico de escala intergalÃ¡ctica.',
      'El fenÃ³meno astrofÃ­sico de deflexiÃ³n lumÃ­nica se denomina en la literatura cientÃ­fica como lente gravitacional. En el aÃ±o 1919, el astrofÃ­sico britÃ¡nico Arthur Eddington organizÃ³ una expediciÃ³n observacional a la isla de PrÃ­ncipe para documentar un eclipse solar total. El objetivo experimental consistÃ­a en medir la desviaciÃ³n astromÃ©trica de la luz estelar al pasar cerca de la masa del Sol. Los resultados fotogrÃ¡ficos obtenidos confirmaron las predicciones matemÃ¡ticas de Einstein, proporcionando la primera evidencia empÃ­rica rigurosa de la curvatura del espacio.',
      'En la astronomÃ­a contemporÃ¡nea, el fenÃ³meno de lentes gravitacionales constituye una herramienta analÃ­tica primordial para la investigaciÃ³n cosmolÃ³gica. Mediante el uso de telescopios espaciales como el Hubble y el James Webb, los astrofÃ­sicos utilizan estos agrupamientos galÃ¡cticos para observar objetos distantes de otra manera indetectables. El anÃ¡lisis de las imÃ¡genes distorsionadas permite estudiar la distribuciÃ³n espacial de la materia oscura, medir tasas de expansiÃ³n cÃ³smica y analizar la morfologÃ­a de galaxias formadas en las etapas iniciales del universo.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'La representaciÃ³n visual del agujero negro GargantÃºa exhibe un disco de acreciÃ³n cuya luz sufre distorsiones Ã³pticas complejas. La emisiÃ³n fotÃ³nica originada en la parte posterior del disco se desvÃ­a por el intenso campo gravitatorio, formando anillos luminosos aparentes por encima y por debajo de la sombra del horizonte de sucesos. Esta simulaciÃ³n grÃ¡fica se calculÃ³ mediante algoritmos de trazado de rayos relativistas, logrando visualizar con precisiÃ³n matemÃ¡tica los efectos extremos de una lente gravitacional generada por una singularidad de masa supermasiva.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Cuando existe un alineamiento colineal perfecto entre el observador terrestre, el cuerpo masivo que actÃºa como lente y la fuente de luz de fondo, la deflexiÃ³n gravitacional produce un patrÃ³n de simetrÃ­a circular. La radiaciÃ³n electromagnÃ©tica se desvÃ­a equitativamente en todas las trayectorias tangenciales alrededor del eje central, proyectando una estructura luminosa en forma de anillo. Este fenÃ³meno Ã³ptico, denominado Anillo de Einstein, permite a los astrofÃ­sicos calcular la masa total de la galaxia interpuesta analizando el radio angular de la imagen resultante.' }
    ],
    fact: 'Los resultados de la expediciÃ³n cientÃ­fica liderada por Arthur Eddington en 1919 representaron una validaciÃ³n empÃ­rica decisiva para la fÃ­sica teÃ³rica moderna. La comprobaciÃ³n astromÃ©trica de la deflexiÃ³n de la luz estelar refutÃ³ aspectos fundamentales del modelo newtoniano tradicional. La publicaciÃ³n de los datos experimentales en la Royal Society de Londres generÃ³ un cambio de paradigma inmediato en la comunidad cientÃ­fica, consolidando el marco de la relatividad general como la descripciÃ³n estÃ¡ndar para el estudio de los fenÃ³menos gravitacionales en el universo.'
  },
  {
    id: 'ondas-gravitacionales',
    title: 'Olas en el Espacio',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m1/btn_ondas.jpg',
    image: '/assets/interstellar/infographic_m1/hero_ondas.jpg',
    content: [
      'Para comprender la propagaciÃ³n de perturbaciones en el espacio-tiempo, podemos observar la dinÃ¡mica de ondas mecÃ¡nicas en medios fluidos. Al aplicar una fuerza repentina sobre la superficie de un estanque en reposo, se genera una transferencia de energÃ­a cinÃ©tica que altera la estructura del medio lÃ­quido. Esta disipaciÃ³n energÃ©tica se manifiesta como patrones ondulatorios concÃ©ntricos que viajan a travÃ©s del volumen de agua. El modelo hidrodinÃ¡mico proporciona una base analÃ³gica para interpretar el transporte de energÃ­a mecÃ¡nica a grandes distancias mediante vibraciones.',
      'En 1916, utilizando las ecuaciones del tensor mÃ©trico, Albert Einstein formulÃ³ una hipÃ³tesis que expandiÃ³ las implicaciones de su modelo gravitacional. DemostrÃ³ analÃ­ticamente que las variaciones aceleradas en campos gravitatorios asimÃ©tricos debÃ­an propagarse por el vacÃ­o cÃ³smico a la velocidad de la luz. Esta soluciÃ³n matemÃ¡tica indicÃ³ que el continuo espacio-temporal poseÃ­a propiedades dinÃ¡micas similares a un medio elÃ¡stico, capaz de sustentar vibraciones transversales y transmitir energÃ­a orbital lejos de los sistemas astrofÃ­sicos que experimentaban aceleraciÃ³n.',
      'El marco teÃ³rico establece que cuando dos masas estelares compactas experimentan aceleraciones extremas, su movimiento altera rÃ¡pidamente la mÃ©trica espacial circundante. Eventos astrofÃ­sicos cataclÃ­smicos, como la coalescencia orbital de objetos masivos, generan fluctuaciones periÃ³dicas en la topologÃ­a del espacio. Estas perturbaciones dinÃ¡micas, predichas por la relatividad general, irradian energÃ­a desde el baricentro del sistema hacia el exterior, induciendo deformaciones mÃ©tricas que se desplazan de forma independiente de la materia que las originÃ³ espacialmente.',
      'En la terminologÃ­a astrofÃ­sica moderna, estas fluctuaciones de la mÃ©trica espacial se conocen como ondas gravitacionales. A nivel fundamental, constituyen oscilaciones del campo gravitatorio que modifican la distancia relativa entre partÃ­culas en caÃ­da libre. A medida que una onda atraviesa una regiÃ³n del espacio, induce una deformaciÃ³n tensorial: estira temporalmente el volumen en un eje espacial y lo comprime simultÃ¡neamente en el eje ortogonal. Esta variaciÃ³n dimensional diminuta transporta informaciÃ³n directa sobre la dinÃ¡mica interna de los eventos estelares mÃ¡s energÃ©ticos.',
      'La confirmaciÃ³n experimental de este fenÃ³meno requiriÃ³ un siglo de desarrollo tecnolÃ³gico en instrumentaciÃ³n interferomÃ©trica de alta precisiÃ³n. El 14 de septiembre de 2015, los detectores del observatorio LIGO registraron variaciones de fase lÃ¡ser proporcionales a una fracciÃ³n del diÃ¡metro de un protÃ³n. La seÃ±al analizada coincidiÃ³ matemÃ¡ticamente con los modelos computacionales de relatividad numÃ©rica, confirmando empÃ­ricamente la existencia de las ondas gravitacionales y marcando el inicio formal de una nueva rama en la astronomÃ­a de observaciÃ³n multimensajero.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'La trama de Interstellar culmina con el envÃ­o de datos cuÃ¡nticos a travÃ©s de alteraciones gravitacionales en las dimensiones espaciales. Murph Cooper analiza estas fluctuaciones mÃ©tricas transmitidas desde el teseracto cuadridimensional, codificadas en el movimiento de un reloj de pulsera. La extracciÃ³n de esta informaciÃ³n estructural permite a la fÃ­sica terrestre formular una teorÃ­a unificada que resuelve el problema del control gravitacional. Este avance cientÃ­fico posibilita la manipulaciÃ³n espacial necesaria para evacuar estaciones masivas desde la superficie del planeta.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El anÃ¡lisis del espectro de frecuencias registrado por el interferÃ³metro LIGO permitiÃ³ identificar la fuente astronÃ³mica de la seÃ±al ondulatoria. El patrÃ³n de onda, denominado chirp, correspondiÃ³ a la fase final de coalescencia orbital de un sistema binario masivo. Durante los milisegundos crÃ­ticos de la fusiÃ³n, las ecuaciones indicaron que la conversiÃ³n de masa en energÃ­a gravitacional superÃ³ temporalmente la luminosidad electromagnÃ©tica combinada de todas las estrellas del universo observable, distorsionando severamente el tensor mÃ©trico del espacio-tiempo circundante.' }
    ],
    fact: 'El fÃ­sico teÃ³rico Kip Thorne colaborÃ³ en el desarrollo matemÃ¡tico inicial de los observatorios de interferometrÃ­a lÃ¡ser y estableciÃ³ los fundamentos teÃ³ricos para el anÃ¡lisis de ondas gravitacionales. Su investigaciÃ³n sobre modelos numÃ©ricos permitiÃ³ distinguir las seÃ±ales cÃ³smicas del ruido sÃ­smico ambiental terrestre. Adicionalmente, Thorne participÃ³ como asesor cientÃ­fico principal en la producciÃ³n de Interstellar, aplicando sus algoritmos de trazado de rayos para asegurar que las simulaciones visuales del disco de acreciÃ³n respetaran rigurosamente las ecuaciones de Einstein.'
  },
  {
    id: 'gps-relatividad',
    title: 'Einstein en tu Bolsillo',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m1/btn_ondas.jpg',
    image: '/assets/interstellar/infographic_m1/hero_gps.jpg',
    content: [
      'El anÃ¡lisis de los tensores mÃ©tricos y la deformaciÃ³n geomÃ©trica del vacÃ­o cÃ³smico podrÃ­a parecer una disciplina teÃ³rica sin aplicaciones prÃ¡cticas en la ingenierÃ­a convencional. Los fenÃ³menos de curvatura espacial provocados por objetos supermasivos o las anomalÃ­as temporales cerca del horizonte de sucesos sugieren escenarios que escapan a la experiencia cotidiana. No obstante, las predicciones derivadas de la mecÃ¡nica relativista resultan esenciales para el diseÃ±o y funcionamiento operativo de diversas infraestructuras tecnolÃ³gicas crÃ­ticas en la sociedad contemporÃ¡nea actual.',
      'Lejos de constituir abstracciones matemÃ¡ticas, las correcciones dictadas por la relatividad general y especial se aplican de forma sistemÃ¡tica en sistemas de navegaciÃ³n digital terrestre. Los circuitos de sincronizaciÃ³n integrados en los dispositivos de comunicaciÃ³n mÃ³vil dependen directamente de estas ecuaciones para estabilizar las seÃ±ales de temporizaciÃ³n. La precisiÃ³n del posicionamiento geogrÃ¡fico que utilizamos habitualmente para calcular rutas de desplazamiento requiere algoritmos que compensan continuamente los gradientes gravitatorios y la dilataciÃ³n temporal cinemÃ¡tica.',
      'El sistema de posicionamiento global, conocido bajo el acrÃ³nimo GPS, opera mediante una constelaciÃ³n sincronizada de satÃ©lites ubicados en la Ã³rbita terrestre media. Esta red de telemetrÃ­a orbital transmite seÃ±ales de microondas codificadas con marcas de tiempo atÃ³mico hacia los receptores ubicados en la superficie del planeta. El cÃ¡lculo preciso de la longitud, latitud y altitud del usuario se obtiene midiendo el tiempo de trÃ¡nsito de las seÃ±ales desde mÃºltiples satÃ©lites, lo que exige una coordinaciÃ³n de relojes con un margen de error menor a unos pocos nanosegundos diarios.',
      'En el anÃ¡lisis de la red orbital satelital, los principios de la mecÃ¡nica relativista manifiestan efectos medibles debido a las condiciones cinemÃ¡ticas y topolÃ³gicas. Los equipos de telecomunicaciones deben enfrentarse al hecho de que la velocidad de traslaciÃ³n orbital altera los intervalos temporales relativos entre sistemas de referencia. Adicionalmente, la diferencia en el potencial gravitacional entre la Ã³rbita y la superficie modifica la frecuencia electromagnÃ©tica. La suma de estos fenÃ³menos fÃ­sicos exige ajustes continuos para mantener la integridad de los datos de navegaciÃ³n.',
      'La relatividad especial induce un retraso cinemÃ¡tico de 7 microsegundos diarios debido a la velocidad orbital de los satÃ©lites. SimultÃ¡neamente, la menor intensidad gravitacional en Ã³rbita ocasiona que la relatividad general adelante los osciladores atÃ³micos en 45 microsegundos. El desfase neto resultante de 38 microsegundos por dÃ­a generarÃ­a errores de mediciÃ³n geomÃ©trica crecientes si no se corrigiera en el software base. Para garantizar el funcionamiento del sistema global, los microprocesadores satelitales aplican compensaciones matemÃ¡ticas relativistas de forma constante.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'La desincronizaciÃ³n temporal derivada de diferencias en campos gravitacionales es un factor crÃ­tico en el desarrollo narrativo durante la exploraciÃ³n del sistema planetario. La asimetrÃ­a en la mediciÃ³n del tiempo entre la tripulaciÃ³n descendiendo a la superficie y el observador remoto en Ã³rbita alta ilustra la magnitud fÃ­sica de la dilataciÃ³n. Mientras que en la infraestructura GPS terrestre la correcciÃ³n es del orden de microsegundos, la proximidad del agujero negro amplifica exponencialmente el efecto, resultando en una separaciÃ³n temporal irreconciliable de varios aÃ±os terrestres.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Durante la fase de diseÃ±o inicial de la arquitectura satelital para el posicionamiento global, existiÃ³ controversia entre los ingenieros aeroespaciales respecto a la inclusiÃ³n de algoritmos de compensaciÃ³n relativista. Parte del equipo tÃ©cnico cuestionaba la viabilidad empÃ­rica de aplicar tensores de la relatividad general a hardware de telecomunicaciones. Como medida de precauciÃ³n, los primeros satÃ©lites experimentales incluyeron mÃ³dulos sintetizadores de frecuencia ajustables, permitiendo activar las correcciones matemÃ¡ticas Ãºnicamente tras verificar la deriva temporal en Ã³rbita.' }
    ],
    fact: 'Si los algoritmos del sistema de navegaciÃ³n satelital omitieran las correcciones prescritas por la formulaciÃ³n de Einstein, los relojes atÃ³micos de rubidio perderÃ­an su sincronizaciÃ³n basal de forma inmediata. El desfase acumulativo de 38 microsegundos introducirÃ­a un error de posicionamiento superficial aproximado de 11 kilÃ³metros durante el primer ciclo diario de operaciones. Esta rÃ¡pida degradaciÃ³n de los datos telemÃ©tricos invalidarÃ­a por completo la funcionalidad de la red GPS para aplicaciones de navegaciÃ³n comercial, coordinaciÃ³n logÃ­stica y geolocalizaciÃ³n de precisiÃ³n.'
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
