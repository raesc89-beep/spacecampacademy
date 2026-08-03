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
  'puente-einstein-rosen': [DecoBlackHole, DecoSpacetimeGrid, DecoOrbit],'hoja-doblada': [DecoSpacetimeGrid, DecoWaveRipple, DecoEqualSign],'wormhole-saturno': [DecoOrbit, DecoBlackHole, DecoSpacetimeGrid],'materia-exotica': [DecoWaveRipple, DecoSpacetimeGrid, DecoEqualSign],'morris-thorne': [DecoEqualSign, DecoBlackHole, DecoOrbit],
  'dimensiones-extra': [DecoSpacetimeGrid, DecoWaveRipple, DecoBlackHole],'viaje-posible': [DecoOrbit, DecoEqualSign, DecoSpacetimeGrid],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Einstein, A., Rosen, N. (1935). "The Particle Problem in the General Theory of Relativity", Physical Review, 48(1)',
  'Morris, M.S., Thorne, K.S. (1988). "Wormholes in Spacetime and Their Use for Interstellar Travel", American Journal of Physics, 56(5)',
  'Maldacena, J., Susskind, L. (2013). "Cool Horizons for Entangled Black Holes", Fortschritte der Physik, 61(9)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'puente-einstein-rosen',
    title: 'El Puente de Einstein y Rosen',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m4/btn_puente.jpg',
    image: '/assets/interstellar/infographic_m4/hero_puente.jpg',
    content: [
      'En 1935, Albert Einstein y Nathan Rosen realizaron un descubrimiento matemático. Al explorar las ecuaciones de la Relatividad General, notaron que la gravedad en un agujero negro podría conectarse con otro distante. Es como una red subterránea que permite viajar sin recorrer la superficie. Esto proporcionó una base para la deformación del espacio-tiempo.',
      'Este corredor interconectado une dos regiones separadas y se llamó Puente de Einstein-Rosen. Imagina que el cosmos fuera una lámina de goma y dos embudos se tocaran en sus extremos. Esa conexión representaba un pasadizo teórico. Esta topología acorta drásticamente la distancia mediante un atajo.',
      'Sin embargo, había un problema físico. Los cálculos demostraban que este puente cósmico sería inestable, cerrándose tan rápido que ni la luz podría atravesarlo. La inestabilidad métrica indica que el túnel colapsa antes de que un fotón alcance el lado opuesto.',
      'En su artículo, argumentaron que esta solución teórica describía partículas subatómicas sin usar mecánica cuántica. Pretendían modelar la materia como puentes en la geometría del espacio-tiempo, como nudos en una alfombra. Su intención era unificar la relatividad con el electromagnetismo mediante modificaciones geométricas.',
      'Aunque usar esta estructura como atajo intergaláctico parecía imposible, plantó la idea del agujero de gusano. Abrió la puerta a pensar que el universo podría tener atajos. Los desarrollos posteriores en cosmología retomaron estas ecuaciones para explorar los viajes hiperespaciales.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En Interstellar, los astronautas de la Endurance dependen de este concepto para salvar la Tierra. El puente cerca de Saturno es una variación moderna del Puente de Einstein-Rosen. Esta representación popularizó el concepto abstracto de la topología conectada.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Einstein y Rosen nunca imaginaron que su artículo se convertiría en un pilar de la ciencia ficción. Su objetivo era resolver problemas de física de partículas, no proporcionar modelos para el viaje estelar mediante deformaciones del espaciotiempo.' }
    ],
    fact: 'El documento de 1935 buscaba eliminar las singularidades (densidad infinita), proponiendo conexiones geométricas como explicación. Este enfoque pretendía crear un modelo del electrón sin masa puntual utilizando la estructura del espacio.'
  },
  {
    id: 'hoja-doblada',
    title: 'Doblar el Universo',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m4/btn_hoja.jpg',
    image: '/assets/interstellar/infographic_m4/hero_hoja.jpg',
    content: [
      'Para explicar un agujero de gusano, los físicos recurren a una analogía didáctica. Toman una hoja de papel, dibujan dos puntos en extremos opuestos y preguntan la forma más rápida de unirlos. En un espacio plano, es trazar una línea recta. Esto ayuda a conceptualizar las matemáticas multidimensionales.',
      'Si levantas los extremos del papel para curvar la hoja, los puntos se tocarán en tres dimensiones. Si atraviesas ambas capas con un lápiz, creas un atajo. El lápiz representa al puente atravesando el hiperespacio y saltando millones de años luz. Así funciona el viaje hiperespacial teórico.',
      'Esta metáfora captura cómo la gravedad podría curvar el espacio-tiempo. Nuestro universo tridimensional tendría que doblarse a través de una cuarta dimensión espacial. Las ecuaciones de la relatividad permiten estas deformaciones topológicas extremas bajo condiciones de alta energía.',
      'Esta explicación se popularizó cuando Carl Sagan escribía Contacto en los años ochenta. Sagan pidió consejo a Kip Thorne para encontrar una forma plausible de cruzar la galaxia. Thorne sugirió agujeros de gusano. Esto impulsó la investigación académica sobre estos atajos relativistas.',
      'Un agujero de gusano no es un vehículo, sino una ruta alternativa. Es una deformación arquitectónica del universo. Es la prueba matemática de que las distancias inmensas podrían reducirse a pocos pasos. La métrica se reconfigura para conectar regiones del espacio separadas.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Esta analogía geométrica se usa en Interstellar cuando Romilly le explica a Cooper cómo funciona el atajo doblando un papel. Es un homenaje a la enseñanza de Carl Sagan. Demuestra cómo una civilización avanzada podría manipular la topología tetradimensional.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'La analogía del papel perforado tiene una limitación técnica. Como nuestro universo tiene tres dimensiones espaciales, la entrada no sería un círculo sino una esfera. Las matemáticas de esta entrada esférica son más complejas que el modelo bidimensional educativo.' }
    ],
    fact: 'Cuando Sagan consultó a Thorne en 1985, Thorne realizó cálculos para asegurar que el viaje fuera posible. Esto provocó un renacimiento en la investigación sobre agujeros de gusano en las universidades. Así, la ciencia ficción inspiró nuevos descubrimientos.'
  },
  {
    id: 'wormhole-saturno',
    title: 'El Agujero de Gusano de Saturno',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m4/btn_saturno.jpg',
    image: '/assets/interstellar/infographic_m4/hero_saturno.jpg',
    content: [
      'En Interstellar, los científicos descubren un agujero de gusano orbitando Saturno. ¿Cómo se vería este objeto en la realidad? La física calcula que no sería un disco plano bidimensional. Las leyes de la óptica gravitacional dictan que la luz se curva alrededor de masas esféricas superdensas.',
      'Puesto que nuestro espacio tiene tres dimensiones físicas, este puente debe manifestarse como un objeto tridimensional. La entrada se vería como una esfera transparente suspendida en el vacío. Es como observar una bola de cristal que muestra otro universo. La refracción gravitacional crea esta ilusión óptica.',
      'Para recrear este fenómeno en el cine, Christopher Nolan trabajó con Kip Thorne. Thorne desarrolló ecuaciones de trazado de rayos relativistas que dictaban cómo los fotones se curvan al acercarse. El resultado fue la representación científica más precisa generada por computadora.',
      'Al observar esta esfera, los astronautas ven la luz de una galaxia a miles de millones de años luz. La luz es canalizada a través de la garganta y emerge como una lente convexa que deforma las imágenes. Este efecto amplifica y distorsiona el fondo estelar.',
      'Su ubicación cerca de Saturno implica que una civilización extraterrestre lo colocó a propósito. La energía necesaria para estabilizar una anomalía frente a la gravedad del gigante gaseoso escapa a cualquier fenómeno natural. Los requerimientos energéticos sobrepasan nuestra tecnología.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La secuencia de la Endurance aproximándose al agujero tomó meses de renderizado computacional. Cada cuadro requirió calcular cómo la luz se curva alrededor de la esfera. Este esfuerzo generó datos valiosos sobre el comportamiento de la luz en campos gravitatorios extremos.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Kip Thorne estaba tan comprometido con la precisión científica que las ecuaciones que derivó para los efectos visuales se publicaron en revistas científicas. Estos documentos proporcionaron nuevas perspectivas sobre la visualización de lentes gravitacionales cerca de horizontes de sucesos.' }
    ],
    fact: 'Si un viajero mirara a través de un agujero de gusano esférico estabilizado, vería una vista esférica comprimida del cielo del otro lado. Esta proyección obedece las reglas de la geometría no euclidiana que rigen la luz en espacios curvos.'
  },
  {
    id: 'materia-exotica',
    title: 'La Materia Imposible',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m4/btn_exotica.jpg',
    image: '/assets/interstellar/infographic_m4/hero_exotica.jpg',
    content: [
      'Si la gravedad puede curvar el espacio-tiempo para conectar dos puntos, también tiende a cerrar ese túnel de inmediato. Las matemáticas de la Relatividad General indican que las paredes colapsarán, destruyendo cualquier nave. Esta inestabilidad impide el transporte interestelar sin un soporte físico.',
      'Para evitar el colapso, los físicos determinaron que necesitarían Materia Exótica. A diferencia de la materia normal, esta debe poseer energía negativa y propiedades repulsivas. Esta repulsión gravitatoria contrarrestaría la curvatura contractiva del túnel.',
      'Esta materia funcionaría como un andamiaje interno. Su presión antigravitatoria empujaría las paredes hacia afuera, contrarrestando la atracción del espacio curvo que intenta cerrar el paso. Es como usar vigas de soporte, pero con campos cuánticos para estabilizar la métrica del espaciotiempo.',
      'Aunque la energía negativa suene a magia, la física cuántica permite su existencia. Un ejemplo es el Efecto Casimir, donde dos placas en el vacío experimentan atracción debido a que la energía cuántica es menor que cero. Estas fluctuaciones demuestran que los estados de energía negativos son posibles.',
      'Lamentablemente, las cantidades microscópicas de energía negativa generadas en laboratorios son insuficientes para sostener un túnel humano. Se requerirían cantidades incalculables de materia exótica. Los cálculos sugieren requerimientos energéticos equivalentes a la masa estelar.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la trama, los protagonistas no discuten la composición del agujero de Saturno. Saben que los seres de la quinta dimensión lo construyeron para que la humanidad lo cruzara. La película asume que una civilización avanzada domina la manipulación de estados cuánticos.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'La materia exótica con energía negativa rompe las condiciones de energía del universo. Abre posibilidades de crear máquinas del tiempo que alterarían la causalidad. Las violaciones de esta condición plantean paradojas temporales que desafían nuestra comprensión de las leyes físicas.' }
    ],
    fact: 'El Efecto Casimir, teorizado por Hendrik Casimir en 1948, demostró empíricamente que la energía negativa es una posibilidad física comprobable. Esto otorgó esperanza matemática a los físicos teóricos.'
  },
  {
    id: 'morris-thorne',
    title: 'El Wormhole que Puedes Cruzar',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m4/btn_morris.jpg',
    image: '/assets/interstellar/infographic_m4/hero_morris.jpg',
    content: [
      'En 1988, Kip Thorne y Michael Morris enfrentaron el desafío de la exploración cósmica. Inspirados por la novela Contacto de Carl Sagan, publicaron un artículo científico sobre agujeros de gusano. Este trabajo estableció los cimientos para el estudio de las topologías espaciales transitables.',
      'Morris y Thorne analizaron las reglas para crear un agujero de gusano seguro para humanos. Esto demostró que los atajos no eran caprichos de la relatividad, sino posibilidades viables. Derivaron las métricas exactas para garantizar trayectorias geodésicas libres de singularidades letales.',
      'Las condiciones postuladas requerían mantener el túnel abierto mediante materia exótica antigravitatoria. Además, las fuerzas de marea gravitacional no debían desgarrar a los viajeros. El cruce completo tendría que durar unos días para ser práctico. Esto definió los parámetros operativos para viajes viables.',
      'Este trabajo sacó a los agujeros de gusano de la ciencia ficción al estudio de la física cuántica. Fue un logro intelectual monumental que impulsó una rama cosmológica nueva. Se dedicó a comprender las limitaciones energéticas de la relatividad general.',
      'El documento Morris-Thorne sigue siendo el estándar para discutir la viabilidad de puentes espaciotemporales. La narrativa de Interstellar se basa en estas ecuaciones publicadas en 1988. Los modelos contemporáneos todavía usan estas soluciones para evaluar escenarios de física exótica.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para lograr máxima verosimilitud en Interstellar, Kip Thorne usó sus propios cálculos del artículo de 1988. Esto garantizó que el comportamiento físico del agujero de gusano esférico obedeciera las leyes de la física. Esta fidelidad aseguró que la representación visual coincidiera con simulaciones numéricas.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Thorne aceptó ayudar a Carl Sagan mientras viajaban en taxi. Thorne le dio el problema a su estudiante Michael Morris como tarea universitaria. Este proyecto académico produjo uno de los artículos más citados en la relatividad general teórica.' }
    ],
    fact: 'El documento de Morris y Thorne de 1988 presentó una métrica matemática nueva. Exigía la presencia de una tensión negativa para mantener el atajo abierto. Las matemáticas demostraron que cumplir las ecuaciones de campo requiere violaciones energéticas.'
  },
  {
    id: 'dimensiones-extra',
    title: 'Más Allá de Tres Dimensiones',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m4/btn_dimensiones.jpg',
    image: '/assets/interstellar/infographic_m4/hero_dimensiones.jpg',
    content: [
      'Si el universo es una superficie curva que puede ser atravesada, surge la pregunta: ¿por dónde viaja el túnel? Para que el papel doblado tenga sentido físico, nuestro universo debe doblarse a través de dimensiones adicionales invisibles. Las teorías matemáticas de dimensiones superiores proporcionan el marco para esto.',
      'En 1921, Theodor Kaluza sugirió que nuestro cosmos tiene una quinta dimensión espacial oculta. Oskar Klein propuso que esta dimensión está enrollada a nivel microscópico. Juntos crearon la Teoría de Kaluza-Klein, el primer intento de unificar la gravedad y la luz usando tensores métricos ampliados.',
      'En la Teoría de Cuerdas contemporánea, los científicos creen que el universo requiere diez u once dimensiones para funcionar matemáticamente. Es un salto mental visualizar un multiverso tan vasto. Estas dimensiones compactificadas resuelven las divergencias en los cálculos.',
      'Los cosmólogos se refieren a este espacio hiperdimensional como El Bulk. Según estos modelos, nuestro universo tridimensional es una membrana suspendida dentro del Bulk infinito. Esta hipótesis postula que las partículas estándar están confinadas a nuestra membrana por restricciones topológicas.',
      'Cuando un agujero de gusano conecta dos galaxias, su túnel cruza a través del Bulk superior como un puente elevado. Esta arquitectura hiperdimensional permite que los atajos funcionen sin violar la velocidad local de la luz. Las trayectorias atraviesan el volumen hiperespacial.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En Interstellar, Cooper se adentra en el Teseracto hiperdimensional. Muestra cómo seres de cinco dimensiones construyeron un espacio manipulable en el Bulk para enviar señales gravitatorias. Esto ilustra la intersección geométrica de un volumen superior penetrando nuestro espacio tridimensional.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'De las cuatro fuerzas fundamentales conocidas, solo la gravedad puede escapar de nuestra membrana y filtrarse hacia El Bulk. Esta disipación teórica podría explicar por qué la gravedad es mucho más débil que el electromagnetismo a escalas subatómicas.' }
    ],
    fact: 'La teoría de Kaluza-Klein de 1921, con su quinta dimensión, unificó las ecuaciones de campo de Einstein y del electromagnetismo de Maxwell. Estableció el paradigma moderno para integrar las interacciones fundamentales usando geometrías multidimensionales complejas.'
  },
  {
    id: 'viaje-posible',
    title: '¿Podremos Cruzar Algún Día?',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m4/btn_viaje.jpg',
    image: '/assets/interstellar/infographic_m4/hero_viaje.jpg',
    content: [
      '¿Lograremos fabricar y atravesar un agujero de gusano en el futuro? En el siglo XXI, la respuesta es que estamos a milenios de alcanzar semejante prodigio. Los desafíos energéticos sobrepasan los límites ingenieriles actuales de nuestra civilización terrestre.',
      'Para construir un túnel espacial del tamaño humano, requeriríamos recolectar la energía de millones de estrellas. También tendríamos que procesar cantidades incalculables de energía negativa antigravitatoria para mantenerlo firme. Esto equivale al control total de los recursos físicos galácticos.',
      'Sin embargo, un avance surgió en 2013, cuando Juan Maldacena y Leonard Susskind formularon la conjetura ER=EPR. Esta idea postula que el entrelazamiento cuántico de partículas es equivalente a un agujero de gusano microscópico. Relaciona la métrica topológica con las correlaciones estadísticas cuánticas.',
      'Este puente filosófico une la gravedad de la Relatividad General con la Mecánica Cuántica. Sugiere que el universo entero a nivel cuántico podría ser una red de agujeros de gusano subatómicos. Esto implica que el espaciotiempo emerge del entrelazamiento de los qubits.',
      'En 2022, científicos de Google observaron el intercambio de información cuántica simulando un agujero de gusano teórico usando la computadora cuántica Sycamore. Aunque no abrieron un túnel físico real, demostraron que seguiremos descifrando secretos. Los protocolos validaron predicciones teóricas holográficas.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Interstellar sugiere que el viaje cósmico y la manipulación de la gravedad están fuera de nuestras capacidades actuales. Sin embargo, propone que la humanidad evolucionará hasta convertirse en los arquitectos del espacio. El dominio físico representará el próximo estadio tecnológico.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'ER=EPR significa: ER por el artículo del Puente Einstein-Rosen de 1935, y EPR por Einstein-Podolsky-Rosen, quienes en ese mismo año escribieron sobre el entrelazamiento cuántico a distancia.' }
    ],
    fact: 'El experimento de Google de 2022 simuló un agujero de gusano cuántico. Aunque la métrica operaba en un espacio abstracto bidimensional anti-de Sitter, la dinámica fue matemáticamente indistinguible de la gravedad holográfica teórica.'
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
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
          const colors = ['#4FC3F7','#FF6B35','#7C4DFF','#F44336','#26A69A','#AB47BC','#FF9800'];
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
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">AGUJEROS DE GUSANO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">ATAJOS CÓSMICOS</text>
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
        whileHover={{ backgroundColor: `${color}15` }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1rem', border: 'none', background: 'transparent',
          color: '#fff', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: `${color}20`, padding: '0.4rem', borderRadius: '8px',
            color: color, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <IconComp size={18} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '1rem', letterSpacing: '0.5px' }}>{item.label}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
          <ChevronDown size={20} color={color} />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{ padding: '0 1.25rem 1.25rem 1.25rem' }}>
              <motion.div
                variants={dirVariants} initial="hidden" animate="visible"
                custom={dir} transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                style={{
                  background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '1.25rem',
                  borderLeft: `4px solid ${color}`,
                  color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.7,
                }}
              >
                {item.text}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterstellarM4() {
  const [activeNodeId, setActiveNodeId] = useState(INFOGRAPHIC_NODES[0].id);
  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const DecoSVGs = DECO_MAP[activeNodeId] || [];

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0a0c1e',
      color: '#fff',
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <InterstellarBackground />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        
        <InterstellarHeader />

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          marginBottom: '3rem',
          padding: '2rem',
          background: 'rgba(10,12,30,0.6)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={activeNodeId === node.id}
              onClick={() => setActiveNodeId(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNodeId}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            style={{
              background: 'rgba(15,18,40,0.85)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              border: `1px solid ${activeNode.color}30`,
              overflow: 'hidden',
              boxShadow: `0 30px 60px rgba(0,0,0,0.6), inset 0 0 40px ${activeNode.color}10`,
            }}
          >
            {/* Hero Layout: 1fr 1fr */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              minHeight: '280px',
              borderBottom: `1px solid ${activeNode.color}20`,
            }}>
              <div style={{ padding: '3rem 3rem 2rem 3rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '10px' }}>
                  {DecoSVGs.map((Deco, i) => <Deco key={i} color={activeNode.color} size={50} />)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeNode.btnImage} alt="avatar" style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: `2px solid ${activeNode.color}`, objectFit: 'cover'
                  }}  loading="lazy" />
                  <h2 style={{
                    fontSize: '2.4rem',
                    fontWeight: 800,
                    margin: 0,
                    background: `linear-gradient(135deg, #fff, ${activeNode.color})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1.1,
                  }}>
                    {activeNode.title}
                  </h2>
                </div>

                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4rem 1rem', borderRadius: '20px',
                  background: `${activeNode.color}15`, border: `1px solid ${activeNode.color}40`,
                  color: activeNode.color, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px',
                  textTransform: 'uppercase', marginBottom: '2rem'
                }}>
                  <Star size={14} /> Módulo 4: Agujeros de Gusano
                </div>

                <div style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '1.1rem', lineHeight: 1.8, marginBottom:'2rem',
                }}>
                  {activeNode.content[0]}
                </div>
              </div>

              <div style={{ height: '100%', overflow: 'hidden', position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeNode.image}
                  alt={activeNode.title}
                  onClick={() => setLightboxSrc(activeNode.image)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'transform 0.7s ease',
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: `linear-gradient(to right, rgba(15,18,40,1) 0%, transparent 20%, transparent 80%, rgba(15,18,40,0.2) 100%)`
                }} />
              </div>
            </div>

            {/* Rest of Content */}
            <div style={{ padding: '0 3rem 3rem 3rem' }}>
              <div style={{
                display: 'flex', flexDirection: 'column',
                gap: '2.5rem', marginTop: '2rem'
              }}>
                <div>
                  {activeNode.content.slice(1).map((paragraph, idx) => (
                    <p key={idx} style={{
                      color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem',
                      textAlign: 'justify'
                    }}>
                      {paragraph}
                    </p>
                  ))}
                  
                  <div style={{
                    marginTop: '2.5rem', padding: '1.8rem', borderRadius: '16px',
                    background: `linear-gradient(135deg, ${activeNode.color}15, rgba(0,0,0,0.4))`,
                    borderLeft: `4px solid ${activeNode.color}`, position: 'relative'
                  }}>
                    <Atom size={24} color={activeNode.color} style={{ position: 'absolute', top: -12, left: -12, background: '#0f1228', borderRadius: '50%', padding: '4px' }} />
                    <h4 style={{ color: activeNode.color, margin: '0 0 1rem 0', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      EL DATO CIENTÍFICO
                    </h4>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                      {activeNode.fact}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} color={activeNode.color} />
                    Exploración Profunda
                  </h3>
                  {activeNode.expandables.map((exp, i) => (
                    <ExpandableSection key={i} item={exp} color={activeNode.color} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bibliography Footer */}
        <div style={{
          marginTop: '4rem', padding: '2rem',
          background: 'rgba(0,0,0,0.5)', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h4 style={{ color: 'rgba(255,255,255,0.6)', margin: '0 0 1rem 0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
            ðŸ“š Fuentes y Referencias
          </h4>
          <ul style={{ margin: 0, padding: '0 0 0 1.2rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', lineHeight: 1.8 }}>
            {BIBLIOGRAPHY.map((bib, i) => <li key={i}>{bib}</li>)}
          </ul>
        </div>
      </div>

      {lightboxSrc && (
        <ImageLightbox src={lightboxSrc} alt="Zoomed Graphic" onClose={() => setLightboxSrc(null)} />
      )}
    </div>
  );
}
