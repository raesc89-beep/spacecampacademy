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
  'puente-einstein-rosen': [DecoBlackHole, DecoSpacetimeGrid, DecoOrbit],
  'hoja-doblada': [DecoSpacetimeGrid, DecoWaveRipple, DecoEqualSign],
  'wormhole-saturno': [DecoOrbit, DecoBlackHole, DecoSpacetimeGrid],
  'materia-exotica': [DecoWaveRipple, DecoSpacetimeGrid, DecoEqualSign],
  'morris-thorne': [DecoEqualSign, DecoBlackHole, DecoOrbit],
  'dimensiones-extra': [DecoSpacetimeGrid, DecoWaveRipple, DecoBlackHole],
  'viaje-posible': [DecoOrbit, DecoEqualSign, DecoSpacetimeGrid],
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
      'En el año 1935, el físico Albert Einstein, trabajando en colaboración con el científico Nathan Rosen, realizó un descubrimiento matemático. Al explorar las ecuaciones de la Relatividad General, se dieron cuenta de que la gravedad extrema en el interior de un agujero negro podría conectarse de manera directa con otro agujero negro distante. Es como si el universo tuviera una red subterránea que permite viajar entre lugares sin recorrer la superficie visible. Este modelo proporcionó una base matemática para la deformación extrema del espacio-tiempo a través de masas hiperdensas.',
      'Este corredor interconectado, que une dos regiones separadas del tejido del espacio-tiempo, fue bautizado por la comunidad científica como el Puente de Einstein-Rosen. Imagina que la superficie del cosmos fuera una lámina de goma, y que dos embudos formados por masas estelares se extendieran hacia abajo hasta tocarse en sus extremos. Esa conexión representaba un pasadizo teórico. Estas estructuras implican una topología donde la distancia entre dos coordenadas distantes se acorta drásticamente mediante un atajo que evita el camino euclidiano habitual.',
      'Sin embargo, a pesar de lo interesante que sonaba esta idea teórica para los entusiastas de la ciencia ficción, había un problema físico desde el principio. Los cálculos matemáticos demostraban que este puente cósmico sería inestable en su naturaleza, cerrándose sobre sí mismo de una forma tan rápida que nada, ni siquiera la luz, podría tener el tiempo suficiente para lograr atravesarlo. La inestabilidad métrica inherente a las soluciones de Schwarzschild indica que el cuello del túnel gravitatorio colapsa antes de que un fotón alcance el lado opuesto del horizonte de sucesos.',
      'En su artículo publicado en la revista Physical Review, los dos autores argumentaron que esta solución matemática era una forma teórica de intentar describir las partículas subatómicas, como los electrones, sin necesidad de usar los conceptos de la mecánica cuántica. Pretendían modelar la materia del universo como puentes en la geometría del espacio-tiempo, como nudos en una alfombra cósmica. La intención original era unificar la relatividad con el electromagnetismo mediante modificaciones geométricas, eliminando las singularidades puntuales de las cargas eléctricas.',
      'Aunque el sueño de usar esta estructura como un atajo intergaláctico parecía imposible bajo las leyes de la física clásica en aquel momento, el Puente de Einstein-Rosen logró plantar la semilla conceptual que décadas más tarde se convertiría en la idea del agujero de gusano. Abrió la puerta a pensar que el universo, en su arquitectura, podría tener atajos esperando a ser comprendidos. Los desarrollos posteriores en cosmología teórica retomaron estas ecuaciones para explorar condiciones bajo las cuales la topología del universo permitiría los viajes hiperespaciales.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la cinta Interstellar, los astronautas a bordo de la nave Endurance dependen de este concepto teórico para tener una esperanza de salvar al planeta Tierra. El puente cósmico que atraviesan cerca de Saturno es una variación moderna del Puente de Einstein-Rosen original, demostrando el poder de la gravedad. Esta representación cinematográfica popularizó el concepto abstracto de la topología conectada.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Es un hecho histórico que tanto Albert Einstein como Nathan Rosen nunca imaginaron que su artículo de ecuaciones matemáticas se convertiría en el pilar de las aventuras espaciales de la ciencia ficción contemporánea. Su objetivo principal era resolver problemas de física de partículas elementales, no proporcionar modelos teóricos para el viaje estelar o la exploración intergaláctica mediante deformaciones del continuo espaciotemporal.' }
    ],
    fact: 'El documento original de Einstein y Rosen del año 1935, titulado "The Particle Problem in the General Theory of Relativity", tenía el propósito de eliminar matemáticamente todas las singularidades (puntos de densidad infinita) del universo, proponiendo en su lugar conexiones geométricas como una explicación de la realidad. Este enfoque pretendía crear un modelo del electrón sin masa puntual, utilizando la estructura del espacio.'
  },
  {
    id: 'hoja-doblada',
    title: 'Doblar el Universo',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m4/btn_hoja.jpg',
    image: '/assets/interstellar/infographic_m4/hero_hoja.jpg',
    content: [
      'Para visualizar cómo funciona un agujero de gusano, los físicos teóricos recurren a una analogía didáctica. Consiste en tomar una hoja de papel, dibujar dos puntos en extremos opuestos y preguntarse cuál es la forma más rápida de viajar. En un espacio plano, la respuesta obvia es trazar una línea recta. Esta representación bidimensional ayuda a conceptualizar las complejas matemáticas multidimensionales requeridas para la topología cósmica.',
      'Sin embargo, si levantas ambos extremos del papel para curvar la hoja sobre sí misma, formando un tubo, lograrás que esos dos puntos se toquen en el espacio tridimensional. Si atraviesas ambas capas unidas con un lápiz, habrás creado un atajo entre los dos destinos. El lápiz representa al puente cósmico atravesando el hiperespacio, saltándose millones de años luz. Esta maniobra ilustra el principio fundamental del viaje hiperespacial teórico.',
      'Esta metáfora espacial captura la esencia matemática de cómo la gravedad podría curvar el tejido del espacio-tiempo a niveles colosales. Del mismo modo que el papel bidimensional se curva en una tercera dimensión para juntar los puntos, nuestro universo tridimensional tendría que doblarse a través de una cuarta dimensión espacial. Las ecuaciones de la relatividad permiten estas deformaciones topológicas extremas bajo condiciones de alta densidad energética.',
      'Esta explicación ganó popularidad cuando el astrónomo Carl Sagan escribía su novela Contacto en la década de los ochenta. Sagan deseaba encontrar una manera físicamente plausible para que su heroína cruzara la galaxia, así que pidió consejo al físico Kip Thorne. Thorne sugirió usar agujeros de gusano en lugar de agujeros negros, sentando un precedente en la literatura científica. Este intercambio impulsó la investigación académica sobre los atajos relativistas.',
      'Al comprender esta lección geométrica, nos damos cuenta de que un agujero de gusano no es un vehículo de transporte, sino una ruta alternativa; una deformación arquitectónica del universo. Es la prueba matemática de que, en las condiciones adecuadas, las distancias inmensas que separan a las estrellas podrían ser reducidas a unos pocos pasos. La métrica del espacio-tiempo se reconfigura para conectar regiones del espacio que de otro modo estarían causalmente desconectadas.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Esta misma explicación geométrica es utilizada en la película Interstellar, cuando el personaje de Romilly toma un trozo de papel y un bolígrafo para explicarle a Cooper cómo funciona el atajo. Esa escena es un homenaje a décadas de enseñanza divulgativa iniciada por pensadores como Carl Sagan. Demuestra visualmente cómo una civilización avanzada podría manipular la topología tetradimensional del continuo cósmico para crear túneles navegables.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Aunque la analogía de la hoja de papel perforada es útil para entender el concepto del viaje interestelar, tiene una limitación técnica: en nuestra realidad cósmica, el universo tiene tres dimensiones espaciales, lo que significa que el agujero de entrada no sería un círculo, sino una esfera flotante. Las matemáticas que describen esta entrada esférica son significativamente más complejas que el modelo bidimensional utilizado para propósitos educativos.' }
    ],
    fact: 'Cuando el astrónomo Carl Sagan consultó al físico Kip Thorne en 1985 para su libro Contacto, Thorne realizó cálculos relativistas para asegurarse de que el viaje fuera posible. Ese favor provocó un renacimiento en la investigación sobre agujeros de gusano en las universidades. Este evento demostró cómo la ciencia ficción y la física teórica pueden retroalimentarse productivamente para inspirar nuevos descubrimientos matemáticos y cosmológicos.'
  },
  {
    id: 'wormhole-saturno',
    title: 'El Agujero de Gusano de Saturno',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m4/btn_saturno.jpg',
    image: '/assets/interstellar/infographic_m4/hero_saturno.jpg',
    content: [
      'En la trama cinematográfica de la película Interstellar, los científicos descubren un agujero de gusano orbitando cerca del planeta Saturno. La pregunta científica que surge es: ¿cómo se vería este objeto cósmico en la vida real? La respuesta calculada por los físicos es que no sería un disco plano bidimensional como en las representaciones clásicas. Las leyes de la óptica gravitacional dictan que la luz se curva alrededor de masas esféricas superdensas.',
      'Puesto que nuestro espacio exterior existe en tres dimensiones físicas, cualquier agujero profundo que se abra paso a través del universo debe manifestarse como un objeto tridimensional. Esto significa que la entrada a un agujero de gusano se vería como una esfera transparente suspendida en el vacío. Es como observar una bola de cristal que te muestra la imagen de otro universo. La refracción gravitacional crea esta ilusión óptica característica.',
      'Para recrear este fenómeno astronómico en la pantalla grande, el director Christopher Nolan y el equipo de efectos especiales trabajaron con el físico Kip Thorne. Thorne desarrolló ecuaciones matemáticas de trazado de rayos relativistas que dictaban cómo los fotones debían curvarse al acercarse a la gravedad esférica. El resultado final se convirtió en la representación científica más precisa jamás generada mediante simulación por computadora avanzada.',
      'Al observar esta esfera cerca de Saturno, los astronautas de la nave pueden ver la luz proveniente de una galaxia situada a miles de millones de años luz. La luz de ese sistema estelar es atraída, comprimida y canalizada a través de la garganta del agujero de gusano, emergiendo por nuestro lado como una lente convexa que deforma las imágenes del espacio. Este efecto de lente gravitacional amplifica y distorsiona el fondo estelar circundante de manera predecible.',
      'La colocación estratégica de este agujero de gusano en las cercanías del planeta Saturno implica que una civilización extraterrestre lo colocó allí a propósito. La cantidad de energía y precisión necesaria para estabilizar una anomalía geométrica frente a la gravedad del gigante gaseoso escapa a cualquier fenómeno natural aleatorio conocido. Los requerimientos energéticos para mantener estable dicha singularidad sobrepasan las capacidades de nuestra tecnología.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La secuencia en la que la nave Endurance se aproxima al agujero de gusano cerca de Saturno tomó meses de renderizado computacional. Cada cuadro fotográfico requirió granjas de servidores para calcular cómo la luz de las estrellas se curvaría alrededor de la esfera anómala en el vacío. Este esfuerzo computacional sin precedentes generó datos valiosos sobre el comportamiento de la luz en campos gravitatorios extremos, fusionando cine y astrofísica computacional.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El físico Kip Thorne estaba tan comprometido con asegurar la precisión científica en la representación de los agujeros negros y de gusano, que las ecuaciones de relatividad que derivó para los efectos visuales terminaron siendo publicadas en dos artículos de revistas científicas revisadas por pares. Estos documentos proporcionaron nuevas perspectivas matemáticas sobre la visualización de lentes gravitacionales cerca de horizontes de sucesos rotatorios.' }
    ],
    fact: 'Desde una perspectiva matemática, si un viajero observara a través de un hipotético agujero de gusano esférico estabilizado, la imagen que vería en la superficie convexa sería una vista esférica comprimida de todo el cielo perteneciente al otro lado, distorsionada enormemente como en un espejo. Esta proyección visual obedece las estrictas reglas de la geometría no euclidiana que rigen la propagación de la luz en espacios curvos de alta curvatura escalar.'
  },
  {
    id: 'materia-exotica',
    title: 'La Materia Imposible',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m4/btn_exotica.jpg',
    image: '/assets/interstellar/infographic_m4/hero_exotica.jpg',
    content: [
      'Si la fuerza de la gravedad tiene el poder cósmico de curvar el espacio-tiempo para conectar dos puntos del universo, también tiene la tendencia a cerrar ese túnel inmediatamente. Las matemáticas de la Relatividad General son claras: las paredes de un túnel gravitatorio querrán colapsar sobre sí mismas, destruyendo a cualquier nave espacial que intente cruzar. La inestabilidad geométrica impide la viabilidad del transporte interestelar sin un soporte físico interno.',
      'Para evitar este colapso estructural, los físicos teóricos se dieron cuenta de que necesitarían encontrar una sustancia desconocida: la Materia Exótica. A diferencia de la materia normal que conocemos en la Tierra (que tiene una masa positiva y atrae objetos por gravedad), la materia exótica debe poseer una densidad de energía negativa y unas propiedades repulsivas antinaturales. Esta repulsión gravitatoria anómala contrarrestaría la curvatura contractiva del túnel.',
      'Esta materia exótica de energía negativa funcionaría como un andamiaje estructural dentro de la garganta del agujero de gusano. Su presión antigravitatoria empujaría las paredes colapsantes hacia el exterior, contrarrestando la fuerza de atracción del espacio curvo que intenta sellar el pasadizo. Es análogo al uso de vigas de soporte en arquitectura, pero utilizando campos tensoriales cuánticos para estabilizar la métrica del espaciotiempo frente al colapso gravitatorio inminente.',
      'Aunque el concepto de la energía negativa pueda sonar a magia, la física cuántica permite su existencia. Un ejemplo real en los laboratorios modernos es el Efecto Casimir, donde dos placas metálicas colocadas cerca en el vacío experimentan una fuerza atractiva debido a que la energía cuántica entre ellas es menor que cero. Estas fluctuaciones del vacío demuestran empíricamente que los estados de energía por debajo del nivel basal del espacio vacío son físicamente posibles.',
      'Lamentablemente, las cantidades microscópicas de energía negativa cuántica que los científicos pueden generar actualmente en sus laboratorios terrestres son insuficientes para sostener un túnel espacial del tamaño necesario para que pase una persona, y mucho menos una nave espacial. Se necesitarían cantidades industriales incalculables de materia exótica para la estabilización. Los cálculos teóricos actuales sugieren requerimientos energéticos equivalentes a la masa estelar.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Durante la trama dramática, los protagonistas no se detienen a discutir de qué material exótico está construida la pared del agujero de gusano de Saturno, porque no tienen el conocimiento para hacerlo. Saben instintivamente que los seres de la quinta dimensión lo colocaron allí y proporcionaron la materia estabilizadora para que la humanidad pudiera cruzar. La obra asume que una civilización avanzada domina la manipulación de estados cuánticos macroscópicos.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Es un detalle fascinante que, según los cálculos matemáticos sobre la física de los atajos espaciales, la materia exótica con energía negativa rompe de manera flagrante las condiciones de energía del universo, abriendo posibilidades de crear máquinas de viaje en el tiempo que alterarían la causalidad. Las violaciones de la condición de energía débil plantean paradojas temporales significativas que todavía desafían nuestra comprensión de las leyes fundamentales de la termodinámica.' }
    ],
    fact: 'El Efecto Casimir, que demuestra empíricamente que la energía negativa es una posibilidad física comprobable, fue teorizado por el físico Hendrik Casimir en 1948 y comprobado experimentalmente años más tarde con precisión milimétrica, otorgando esperanza matemática a los soñadores teóricos. Las fuerzas medidas concuerdan exactamente con las predicciones de la electrodinámica cuántica para las alteraciones del estado de vacío entre placas conductoras paralelas.'
  },
  {
    id: 'morris-thorne',
    title: 'El Wormhole que Puedes Cruzar',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m4/btn_morris.jpg',
    image: '/assets/interstellar/infographic_m4/hero_morris.jpg',
    content: [
      'En el año 1988, el físico teórico Kip Thorne y su estudiante Michael Morris decidieron enfrentarse al desafío matemático de la exploración cósmica. Con la inspiración generada por la novela Contacto de Carl Sagan, publicaron un artículo científico titulado "Wormholes in Spacetime and Their Use for Interstellar Travel" en la revista académica American Journal of Physics. Este trabajo estableció los cimientos matemáticos para el estudio formal de las topologías espaciales transitables.',
      'En este documento matemático, Morris y Thorne analizaron exhaustivamente las reglas geométricas necesarias para crear un agujero de gusano que los seres humanos pudieran atravesar de forma segura sin morir aplastados. Este hito demostró de manera fehaciente que los atajos cósmicos no eran un capricho de la relatividad, sino una posibilidad viable bajo ciertas condiciones físicas. Derivaron las métricas exactas requeridas para garantizar trayectorias geodésicas libres de singularidades letales.',
      'Las condiciones que postularon incluían requisitos monumentales: el túnel debería mantenerse abierto mediante materia exótica antigravitatoria; las fuerzas de marea gravitacional en su interior no deberían desgarrar los huesos de los viajeros; y el cruce completo de un extremo galáctico al otro tendría que durar como máximo unos cuantos días para que el trayecto fuera práctico. Estas restricciones matemáticas definieron los parámetros operativos para los viajes supralumínicos viables.',
      'Este trabajo académico transformó el panorama científico, sacando a los agujeros de gusano del reino de la ciencia ficción para elevarlos al estudio riguroso de la física cuántica. Fue un logro intelectual y matemático monumental, similar en su impacto al momento en que se propusieron los satélites geoestacionarios. Las ecuaciones resultantes impulsaron una nueva rama de investigación cosmológica dedicada a comprender las limitaciones energéticas de la relatividad general modificada.',
      'La herencia dejada por el documento del dúo Morris-Thorne es tan duradera, que sigue siendo el estándar de oro y la guía esencial para cualquier físico que decida calcular o discutir la viabilidad de la construcción de puentes en el espacio-tiempo. Todo el andamiaje narrativo del viaje espacial de Interstellar se basa en las ecuaciones reveladas en aquel año 1988. Los modelos teóricos contemporáneos todavía utilizan estas soluciones fundamentales para evaluar escenarios de física exótica.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para dotar a la película de la máxima verosimilitud en la historia del cine de ciencia ficción, el productor Kip Thorne utilizó directamente sus propios cálculos del artículo Morris-Thorne de 1988 para garantizar que el comportamiento físico del agujero de gusano esférico obedeciera las leyes conocidas de la física y la geometría de Einstein. Esta fidelidad matemática aseguró que la representación visual coincidiera exactamente con las simulaciones numéricas de las ecuaciones de campo.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Es un hecho histórico que el profesor Kip Thorne aceptó ayudar a Carl Sagan a resolver la crisis física de su novela Contacto porque estaban viajando juntos en un taxi urbano cuando surgió el dilema. Thorne procedió a darle la solución a su estudiante Michael Morris como un problema de tarea de física relativista para que lo resolviera. Este proyecto académico rutinario inesperadamente produjo uno de los artículos científicos más citados en la literatura sobre relatividad general teórica.' }
    ],
    fact: 'El documento académico de Morris y Thorne del año 1988 presentaba de manera clara una métrica matemática nueva, la cual describía con exactitud geométrica cómo se deformaba el espacio, y exigía inevitablemente la presencia indispensable de una tensión negativa en la garganta para mantener el atajo abierto para cualquier explorador. Las demostraciones matemáticas establecieron de forma concluyente que el cumplimiento de las ecuaciones de campo requiere violaciones energéticas locales.'
  },
  {
    id: 'dimensiones-extra',
    title: 'Más Allá de Tres Dimensiones',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m4/btn_dimensiones.jpg',
    image: '/assets/interstellar/infographic_m4/hero_dimensiones.jpg',
    content: [
      'Si logras aceptar la idea de que el universo es una superficie curva que puede ser atravesada por un atajo, entonces debes enfrentarte a la pregunta lógica: ¿a través de dónde viaja este túnel subterráneo? Para que el ejemplo del papel doblado tenga sentido físico, nuestro universo tridimensional tiene que doblarse a través de un espacio que posee más dimensiones, un lugar invisible a nuestros ojos humanos. Las teorías matemáticas de dimensiones superiores proporcionan el marco para esto.',
      'En el año 1921, el matemático Theodor Kaluza propuso una idea audaz: sugirió que nuestro cosmos tiene en realidad una quinta dimensión espacial oculta. Más tarde, el físico Oskar Klein perfeccionó esta teoría proponiendo que esta dimensión extra está enrollada sobre sí misma a un nivel subatómico microscópico. Juntos crearon la Teoría de Kaluza-Klein, el primer intento de unificar la gravedad y la luz. Introdujeron tensores métricos ampliados para acomodar el campo electromagnético.',
      'En los estudios actuales de la Teoría de Cuerdas de la física teórica contemporánea, los científicos están convencidos de que el universo requiere obligatoriamente tener diez u once dimensiones para que las matemáticas cuánticas puedan funcionar armónicamente sin arrojar errores absurdos. Es un salto mental abrumador para el ser humano común tratar de visualizar un multiverso tan vasto. Estas dimensiones extra compactificadas resuelven las divergencias matemáticas en los cálculos de dispersión.',
      'Los cosmólogos contemporáneos suelen referirse a este espacio hiperdimensional extra que nos rodea como "El Bulk" (o El Bulto). Según estos modelos exóticos, nuestro universo tridimensional, con todas sus galaxias y agujeros negros, es simplemente una membrana plana que está suspendida dentro de la enormidad infinita de El Bulk hiperdimensional. Esta hipótesis postula que las partículas fundamentales estándar están confinadas a nuestra membrana tetradimensional mediante restricciones topológicas.',
      'Cuando un agujero de gusano funcional conecta dos galaxias distantes, su túnel interior está saliendo de nuestra membrana y cruzando a través de este Bulk superior, comportándose como un puente elevado que salta por encima del tráfico bidimensional. Esta arquitectura hiperdimensional de dimensiones enrolladas es el secreto matemático que permite que los atajos espaciales funcionen sin violar la velocidad local de la luz. Las trayectorias de conexión atraviesan el volumen hiperespacial.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El clímax emocional de Interstellar, cuando Cooper se adentra en el Teseracto (un cubo hiperdimensional), muestra cómo unos seres de cinco dimensiones han construido un espacio manipulable de incontables dimensiones extra en el interior del Bulk, para que el humano tridimensional pueda enviar señales físicas gravitatorias. La representación artística ilustra la intersección geométrica de un volumen hiperdimensional superior penetrando perpendicularmente nuestro espacio local convencional.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Según las teorías actuales sobre las membranas espaciales y El Bulk, de las cuatro fuerzas fundamentales del universo que conocemos, solo la gravedad es plenamente capaz de escapar de nuestra membrana tridimensional y filtrarse hacia El Bulk o quinta dimensión oculta. Esta disipación gravitacional teórica hacia el espacio hiperdimensional podría explicar por qué la fuerza gravitatoria medida es exponencialmente más débil que el electromagnetismo a escalas subatómicas fundamentales.' }
    ],
    fact: 'La teoría de Kaluza-Klein del año 1921, que proponía añadir matemáticas de una quinta dimensión extra, logró de manera asombrosa combinar las ecuaciones de campo de la relatividad general de Albert Einstein de la gravedad, con las ecuaciones del electromagnetismo de Maxwell de la luz, unificando todo de forma coherente. Este pionero trabajo estableció el paradigma metodológico moderno para intentar integrar todas las interacciones fundamentales utilizando geometrías multidimensionales complejas.'
  },
  {
    id: 'viaje-posible',
    title: '¿Podremos Cruzar Algún Día?',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m4/btn_viaje.jpg',
    image: '/assets/interstellar/infographic_m4/hero_viaje.jpg',
    content: [
      'Llegados a este punto de nuestra exploración espacial de conceptos teóricos, nos enfrentamos a la pregunta final: ¿lograremos los seres humanos fabricar y atravesar un agujero de gusano en algún momento futuro de nuestra civilización? En el panorama científico actual del siglo XXI, la respuesta realista es que estamos a milenios de distancia tecnológica de alcanzar semejante prodigio monumental de la ingeniería astrofísica. Los desafíos energéticos sobrepasan los límites ingenieriles actuales.',
      'Las necesidades tecnológicas y energéticas requeridas abruman a cualquier mente terrestre. Para construir un túnel espacial del tamaño necesario para acomodar a un ser humano, requeriríamos recolectar la energía irradiada por millones de estrellas, y además tendríamos que inventar cómo procesar las cantidades incalculables de energía negativa antigravitatoria para mantenerlo firme sin fluctuaciones. La magnitud operativa equivale al control total de los recursos físicos galácticos.',
      'Sin embargo, un avance teórico matemático y físico ha surgido en nuestra década contemporánea. En el año 2013, el físico Juan Maldacena y Leonard Susskind formularon la conjetura "ER=EPR" ante la comunidad internacional. Esta idea postula, con base matemática firme, que el entrelazamiento cuántico de diminutas partículas es exactamente lo mismo que un microscópico agujero de gusano espaciotemporal. Esta equivalencia relaciona la métrica topológica con las correlaciones estadísticas cuánticas.',
      'Este puente filosófico y matemático une en un abrazo teórico a las dos ramas físicas más conflictivas de la historia: la gravedad de la Relatividad General de Einstein y la rareza de la Mecánica Cuántica. Sugiere que el universo entero a nivel cuántico podría ser una gigantesca red interconectada de agujeros de gusano de tamaño subatómico que parpadean de forma continua. La dualidad propuesta implica que el continuo espaciotemporal emerge directamente del entrelazamiento de los qubits.',
      'Y en un experimento reciente del año 2022, científicos de laboratorios avanzados como Google anunciaron al mundo que habían logrado observar el intercambio de información cuántica simulando un agujero de gusano teórico usando la computadora cuántica Sycamore. Aunque este hito no significa que abrieran un túnel físico real, demuestra que la curiosidad del ser humano seguirá descifrando los secretos del cosmos. Los protocolos de teletransportación validaron las predicciones teóricas holográficas.'
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El mensaje filosófico que domina la historia de Interstellar se basa en esta visión a largo plazo de la civilización: aunque el viaje cósmico y la manipulación de la gravedad están actualmente fuera de nuestras limitaciones científicas, en un futuro distante, la humanidad evolucionará hasta convertirse en los arquitectos cósmicos del espacio. La narrativa sugiere que el dominio completo de la física dimensional y temporal representará el próximo estadio evolutivo tecnológico humano.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La sigla teórica "ER=EPR" de la conjetura propuesta significa lo siguiente: ER representa directamente el artículo sobre el "Puente Einstein-Rosen" de 1935; y EPR es el acrónimo de "Einstein-Podolsky-Rosen", quienes en ese mismo año escribieron su artículo clave sobre el entrelazamiento cuántico a distancia.' }
    ],
    fact: 'El experimento de entrelazamiento publicado en la revista científica Nature en el año 2022 con la computadora cuántica superconductora de Google, causó debates sobre qué significa exactamente lograr verdaderamente que un "agujero de gusano cuántico" haya sido teletransportado en los circuitos del laboratorio. Aunque la métrica simulada operaba en un espacio abstracto bidimensional anti-de Sitter, la dinámica observada era matemáticamente indistinguible de la gravedad holográfica teórica.'
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
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">ATAJOS CÃ“SMICOS</text>
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
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  marginBottom: '2rem',
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
