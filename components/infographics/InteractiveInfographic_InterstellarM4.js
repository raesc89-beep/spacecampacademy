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
      'En el aÃ±o 1935, el fÃ­sico Albert Einstein, trabajando en colaboraciÃ³n con el cientÃ­fico Nathan Rosen, realizÃ³ un descubrimiento matemÃ¡tico. Al explorar las ecuaciones de la Relatividad General, se dieron cuenta de que la gravedad extrema en el interior de un agujero negro podrÃ­a conectarse de manera directa con otro agujero negro distante. Es como si el universo tuviera una red subterrÃ¡nea que permite viajar entre lugares sin recorrer la superficie visible. Este modelo proporcionÃ³ una base matemÃ¡tica para la deformaciÃ³n extrema del espacio-tiempo a travÃ©s de masas hiperdensas.',
      'Este corredor interconectado, que une dos regiones separadas del tejido del espacio-tiempo, fue bautizado por la comunidad cientÃ­fica como el Puente de Einstein-Rosen. Imagina que la superficie del cosmos fuera una lÃ¡mina de goma, y que dos embudos formados por masas estelares se extendieran hacia abajo hasta tocarse en sus extremos. Esa conexiÃ³n representaba un pasadizo teÃ³rico. Estas estructuras implican una topologÃ­a donde la distancia entre dos coordenadas distantes se acorta drÃ¡sticamente mediante un atajo que evita el camino euclidiano habitual.',
      'Sin embargo, a pesar de lo interesante que sonaba esta idea teÃ³rica para los entusiastas de la ciencia ficciÃ³n, habÃ­a un problema fÃ­sico desde el principio. Los cÃ¡lculos matemÃ¡ticos demostraban que este puente cÃ³smico serÃ­a inestable en su naturaleza, cerrÃ¡ndose sobre sÃ­ mismo de una forma tan rÃ¡pida que nada, ni siquiera la luz, podrÃ­a tener el tiempo suficiente para lograr atravesarlo. La inestabilidad mÃ©trica inherente a las soluciones de Schwarzschild indica que el cuello del tÃºnel gravitatorio colapsa antes de que un fotÃ³n alcance el lado opuesto del horizonte de sucesos.',
      'En su artÃ­culo publicado en la revista Physical Review, los dos autores argumentaron que esta soluciÃ³n matemÃ¡tica era una forma teÃ³rica de intentar describir las partÃ­culas subatÃ³micas, como los electrones, sin necesidad de usar los conceptos de la mecÃ¡nica cuÃ¡ntica. PretendÃ­an modelar la materia del universo como puentes en la geometrÃ­a del espacio-tiempo, como nudos en una alfombra cÃ³smica. La intenciÃ³n original era unificar la relatividad con el electromagnetismo mediante modificaciones geomÃ©tricas, eliminando las singularidades puntuales de las cargas elÃ©ctricas.',
      'Aunque el sueÃ±o de usar esta estructura como un atajo intergalÃ¡ctico parecÃ­a imposible bajo las leyes de la fÃ­sica clÃ¡sica en aquel momento, el Puente de Einstein-Rosen logrÃ³ plantar la semilla conceptual que dÃ©cadas mÃ¡s tarde se convertirÃ­a en la idea del agujero de gusano. AbriÃ³ la puerta a pensar que el universo, en su arquitectura, podrÃ­a tener atajos esperando a ser comprendidos. Los desarrollos posteriores en cosmologÃ­a teÃ³rica retomaron estas ecuaciones para explorar condiciones bajo las cuales la topologÃ­a del universo permitirÃ­a los viajes hiperespaciales.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'En la cinta Interstellar, los astronautas a bordo de la nave Endurance dependen de este concepto teÃ³rico para tener una esperanza de salvar al planeta Tierra. El puente cÃ³smico que atraviesan cerca de Saturno es una variaciÃ³n moderna del Puente de Einstein-Rosen original, demostrando el poder de la gravedad. Esta representaciÃ³n cinematogrÃ¡fica popularizÃ³ el concepto abstracto de la topologÃ­a conectada.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Es un hecho histÃ³rico que tanto Albert Einstein como Nathan Rosen nunca imaginaron que su artÃ­culo de ecuaciones matemÃ¡ticas se convertirÃ­a en el pilar de las aventuras espaciales de la ciencia ficciÃ³n contemporÃ¡nea. Su objetivo principal era resolver problemas de fÃ­sica de partÃ­culas elementales, no proporcionar modelos teÃ³ricos para el viaje estelar o la exploraciÃ³n intergalÃ¡ctica mediante deformaciones del continuo espaciotemporal.' }
    ],
    fact: 'El documento original de Einstein y Rosen del aÃ±o 1935, titulado "The Particle Problem in the General Theory of Relativity", tenÃ­a el propÃ³sito de eliminar matemÃ¡ticamente todas las singularidades (puntos de densidad infinita) del universo, proponiendo en su lugar conexiones geomÃ©tricas como una explicaciÃ³n de la realidad. Este enfoque pretendÃ­a crear un modelo del electrÃ³n sin masa puntual, utilizando la estructura del espacio.'
  },
  {
    id: 'hoja-doblada',
    title: 'Doblar el Universo',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m4/btn_hoja.jpg',
    image: '/assets/interstellar/infographic_m4/hero_hoja.jpg',
    content: [
      'Para visualizar cÃ³mo funciona un agujero de gusano, los fÃ­sicos teÃ³ricos recurren a una analogÃ­a didÃ¡ctica. Consiste en tomar una hoja de papel, dibujar dos puntos en extremos opuestos y preguntarse cuÃ¡l es la forma mÃ¡s rÃ¡pida de viajar. En un espacio plano, la respuesta obvia es trazar una lÃ­nea recta. Esta representaciÃ³n bidimensional ayuda a conceptualizar las complejas matemÃ¡ticas multidimensionales requeridas para la topologÃ­a cÃ³smica.',
      'Sin embargo, si levantas ambos extremos del papel para curvar la hoja sobre sÃ­ misma, formando un tubo, lograrÃ¡s que esos dos puntos se toquen en el espacio tridimensional. Si atraviesas ambas capas unidas con un lÃ¡piz, habrÃ¡s creado un atajo entre los dos destinos. El lÃ¡piz representa al puente cÃ³smico atravesando el hiperespacio, saltÃ¡ndose millones de aÃ±os luz. Esta maniobra ilustra el principio fundamental del viaje hiperespacial teÃ³rico.',
      'Esta metÃ¡fora espacial captura la esencia matemÃ¡tica de cÃ³mo la gravedad podrÃ­a curvar el tejido del espacio-tiempo a niveles colosales. Del mismo modo que el papel bidimensional se curva en una tercera dimensiÃ³n para juntar los puntos, nuestro universo tridimensional tendrÃ­a que doblarse a travÃ©s de una cuarta dimensiÃ³n espacial. Las ecuaciones de la relatividad permiten estas deformaciones topolÃ³gicas extremas bajo condiciones de alta densidad energÃ©tica.',
      'Esta explicaciÃ³n ganÃ³ popularidad cuando el astrÃ³nomo Carl Sagan escribÃ­a su novela Contacto en la dÃ©cada de los ochenta. Sagan deseaba encontrar una manera fÃ­sicamente plausible para que su heroÃ­na cruzara la galaxia, asÃ­ que pidiÃ³ consejo al fÃ­sico Kip Thorne. Thorne sugiriÃ³ usar agujeros de gusano en lugar de agujeros negros, sentando un precedente en la literatura cientÃ­fica. Este intercambio impulsÃ³ la investigaciÃ³n acadÃ©mica sobre los atajos relativistas.',
      'Al comprender esta lecciÃ³n geomÃ©trica, nos damos cuenta de que un agujero de gusano no es un vehÃ­culo de transporte, sino una ruta alternativa; una deformaciÃ³n arquitectÃ³nica del universo. Es la prueba matemÃ¡tica de que, en las condiciones adecuadas, las distancias inmensas que separan a las estrellas podrÃ­an ser reducidas a unos pocos pasos. La mÃ©trica del espacio-tiempo se reconfigura para conectar regiones del espacio que de otro modo estarÃ­an causalmente desconectadas.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Esta misma explicaciÃ³n geomÃ©trica es utilizada en la pelÃ­cula Interstellar, cuando el personaje de Romilly toma un trozo de papel y un bolÃ­grafo para explicarle a Cooper cÃ³mo funciona el atajo. Esa escena es un homenaje a dÃ©cadas de enseÃ±anza divulgativa iniciada por pensadores como Carl Sagan. Demuestra visualmente cÃ³mo una civilizaciÃ³n avanzada podrÃ­a manipular la topologÃ­a tetradimensional del continuo cÃ³smico para crear tÃºneles navegables.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'atom', text: 'Aunque la analogÃ­a de la hoja de papel perforada es Ãºtil para entender el concepto del viaje interestelar, tiene una limitaciÃ³n tÃ©cnica: en nuestra realidad cÃ³smica, el universo tiene tres dimensiones espaciales, lo que significa que el agujero de entrada no serÃ­a un cÃ­rculo, sino una esfera flotante. Las matemÃ¡ticas que describen esta entrada esfÃ©rica son significativamente mÃ¡s complejas que el modelo bidimensional utilizado para propÃ³sitos educativos.' }
    ],
    fact: 'Cuando el astrÃ³nomo Carl Sagan consultÃ³ al fÃ­sico Kip Thorne en 1985 para su libro Contacto, Thorne realizÃ³ cÃ¡lculos relativistas para asegurarse de que el viaje fuera posible. Ese favor provocÃ³ un renacimiento en la investigaciÃ³n sobre agujeros de gusano en las universidades. Este evento demostrÃ³ cÃ³mo la ciencia ficciÃ³n y la fÃ­sica teÃ³rica pueden retroalimentarse productivamente para inspirar nuevos descubrimientos matemÃ¡ticos y cosmolÃ³gicos.'
  },
  {
    id: 'wormhole-saturno',
    title: 'El Agujero de Gusano de Saturno',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m4/btn_saturno.jpg',
    image: '/assets/interstellar/infographic_m4/hero_saturno.jpg',
    content: [
      'En la trama cinematogrÃ¡fica de la pelÃ­cula Interstellar, los cientÃ­ficos descubren un agujero de gusano orbitando cerca del planeta Saturno. La pregunta cientÃ­fica que surge es: Â¿cÃ³mo se verÃ­a este objeto cÃ³smico en la vida real? La respuesta calculada por los fÃ­sicos es que no serÃ­a un disco plano bidimensional como en las representaciones clÃ¡sicas. Las leyes de la Ã³ptica gravitacional dictan que la luz se curva alrededor de masas esfÃ©ricas superdensas.',
      'Puesto que nuestro espacio exterior existe en tres dimensiones fÃ­sicas, cualquier agujero profundo que se abra paso a travÃ©s del universo debe manifestarse como un objeto tridimensional. Esto significa que la entrada a un agujero de gusano se verÃ­a como una esfera transparente suspendida en el vacÃ­o. Es como observar una bola de cristal que te muestra la imagen de otro universo. La refracciÃ³n gravitacional crea esta ilusiÃ³n Ã³ptica caracterÃ­stica.',
      'Para recrear este fenÃ³meno astronÃ³mico en la pantalla grande, el director Christopher Nolan y el equipo de efectos especiales trabajaron con el fÃ­sico Kip Thorne. Thorne desarrollÃ³ ecuaciones matemÃ¡ticas de trazado de rayos relativistas que dictaban cÃ³mo los fotones debÃ­an curvarse al acercarse a la gravedad esfÃ©rica. El resultado final se convirtiÃ³ en la representaciÃ³n cientÃ­fica mÃ¡s precisa jamÃ¡s generada mediante simulaciÃ³n por computadora avanzada.',
      'Al observar esta esfera cerca de Saturno, los astronautas de la nave pueden ver la luz proveniente de una galaxia situada a miles de millones de aÃ±os luz. La luz de ese sistema estelar es atraÃ­da, comprimida y canalizada a travÃ©s de la garganta del agujero de gusano, emergiendo por nuestro lado como una lente convexa que deforma las imÃ¡genes del espacio. Este efecto de lente gravitacional amplifica y distorsiona el fondo estelar circundante de manera predecible.',
      'La colocaciÃ³n estratÃ©gica de este agujero de gusano en las cercanÃ­as del planeta Saturno implica que una civilizaciÃ³n extraterrestre lo colocÃ³ allÃ­ a propÃ³sito. La cantidad de energÃ­a y precisiÃ³n necesaria para estabilizar una anomalÃ­a geomÃ©trica frente a la gravedad del gigante gaseoso escapa a cualquier fenÃ³meno natural aleatorio conocido. Los requerimientos energÃ©ticos para mantener estable dicha singularidad sobrepasan las capacidades de nuestra tecnologÃ­a.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'La secuencia en la que la nave Endurance se aproxima al agujero de gusano cerca de Saturno tomÃ³ meses de renderizado computacional. Cada cuadro fotogrÃ¡fico requiriÃ³ granjas de servidores para calcular cÃ³mo la luz de las estrellas se curvarÃ­a alrededor de la esfera anÃ³mala en el vacÃ­o. Este esfuerzo computacional sin precedentes generÃ³ datos valiosos sobre el comportamiento de la luz en campos gravitatorios extremos, fusionando cine y astrofÃ­sica computacional.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'El fÃ­sico Kip Thorne estaba tan comprometido con asegurar la precisiÃ³n cientÃ­fica en la representaciÃ³n de los agujeros negros y de gusano, que las ecuaciones de relatividad que derivÃ³ para los efectos visuales terminaron siendo publicadas en dos artÃ­culos de revistas cientÃ­ficas revisadas por pares. Estos documentos proporcionaron nuevas perspectivas matemÃ¡ticas sobre la visualizaciÃ³n de lentes gravitacionales cerca de horizontes de sucesos rotatorios.' }
    ],
    fact: 'Desde una perspectiva matemÃ¡tica, si un viajero observara a travÃ©s de un hipotÃ©tico agujero de gusano esfÃ©rico estabilizado, la imagen que verÃ­a en la superficie convexa serÃ­a una vista esfÃ©rica comprimida de todo el cielo perteneciente al otro lado, distorsionada enormemente como en un espejo. Esta proyecciÃ³n visual obedece las estrictas reglas de la geometrÃ­a no euclidiana que rigen la propagaciÃ³n de la luz en espacios curvos de alta curvatura escalar.'
  },
  {
    id: 'materia-exotica',
    title: 'La Materia Imposible',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m4/btn_exotica.jpg',
    image: '/assets/interstellar/infographic_m4/hero_exotica.jpg',
    content: [
      'Si la fuerza de la gravedad tiene el poder cÃ³smico de curvar el espacio-tiempo para conectar dos puntos del universo, tambiÃ©n tiene la tendencia a cerrar ese tÃºnel inmediatamente. Las matemÃ¡ticas de la Relatividad General son claras: las paredes de un tÃºnel gravitatorio querrÃ¡n colapsar sobre sÃ­ mismas, destruyendo a cualquier nave espacial que intente cruzar. La inestabilidad geomÃ©trica impide la viabilidad del transporte interestelar sin un soporte fÃ­sico interno.',
      'Para evitar este colapso estructural, los fÃ­sicos teÃ³ricos se dieron cuenta de que necesitarÃ­an encontrar una sustancia desconocida: la Materia ExÃ³tica. A diferencia de la materia normal que conocemos en la Tierra (que tiene una masa positiva y atrae objetos por gravedad), la materia exÃ³tica debe poseer una densidad de energÃ­a negativa y unas propiedades repulsivas antinaturales. Esta repulsiÃ³n gravitatoria anÃ³mala contrarrestarÃ­a la curvatura contractiva del tÃºnel.',
      'Esta materia exÃ³tica de energÃ­a negativa funcionarÃ­a como un andamiaje estructural dentro de la garganta del agujero de gusano. Su presiÃ³n antigravitatoria empujarÃ­a las paredes colapsantes hacia el exterior, contrarrestando la fuerza de atracciÃ³n del espacio curvo que intenta sellar el pasadizo. Es anÃ¡logo al uso de vigas de soporte en arquitectura, pero utilizando campos tensoriales cuÃ¡nticos para estabilizar la mÃ©trica del espaciotiempo frente al colapso gravitatorio inminente.',
      'Aunque el concepto de la energÃ­a negativa pueda sonar a magia, la fÃ­sica cuÃ¡ntica permite su existencia. Un ejemplo real en los laboratorios modernos es el Efecto Casimir, donde dos placas metÃ¡licas colocadas cerca en el vacÃ­o experimentan una fuerza atractiva debido a que la energÃ­a cuÃ¡ntica entre ellas es menor que cero. Estas fluctuaciones del vacÃ­o demuestran empÃ­ricamente que los estados de energÃ­a por debajo del nivel basal del espacio vacÃ­o son fÃ­sicamente posibles.',
      'Lamentablemente, las cantidades microscÃ³picas de energÃ­a negativa cuÃ¡ntica que los cientÃ­ficos pueden generar actualmente en sus laboratorios terrestres son insuficientes para sostener un tÃºnel espacial del tamaÃ±o necesario para que pase una persona, y mucho menos una nave espacial. Se necesitarÃ­an cantidades industriales incalculables de materia exÃ³tica para la estabilizaciÃ³n. Los cÃ¡lculos teÃ³ricos actuales sugieren requerimientos energÃ©ticos equivalentes a la masa estelar.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Durante la trama dramÃ¡tica, los protagonistas no se detienen a discutir de quÃ© material exÃ³tico estÃ¡ construida la pared del agujero de gusano de Saturno, porque no tienen el conocimiento para hacerlo. Saben instintivamente que los seres de la quinta dimensiÃ³n lo colocaron allÃ­ y proporcionaron la materia estabilizadora para que la humanidad pudiera cruzar. La obra asume que una civilizaciÃ³n avanzada domina la manipulaciÃ³n de estados cuÃ¡nticos macroscÃ³picos.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'atom', text: 'Es un detalle fascinante que, segÃºn los cÃ¡lculos matemÃ¡ticos sobre la fÃ­sica de los atajos espaciales, la materia exÃ³tica con energÃ­a negativa rompe de manera flagrante las condiciones de energÃ­a del universo, abriendo posibilidades de crear mÃ¡quinas de viaje en el tiempo que alterarÃ­an la causalidad. Las violaciones de la condiciÃ³n de energÃ­a dÃ©bil plantean paradojas temporales significativas que todavÃ­a desafÃ­an nuestra comprensiÃ³n de las leyes fundamentales de la termodinÃ¡mica.' }
    ],
    fact: 'El Efecto Casimir, que demuestra empÃ­ricamente que la energÃ­a negativa es una posibilidad fÃ­sica comprobable, fue teorizado por el fÃ­sico Hendrik Casimir en 1948 y comprobado experimentalmente aÃ±os mÃ¡s tarde con precisiÃ³n milimÃ©trica, otorgando esperanza matemÃ¡tica a los soÃ±adores teÃ³ricos. Las fuerzas medidas concuerdan exactamente con las predicciones de la electrodinÃ¡mica cuÃ¡ntica para las alteraciones del estado de vacÃ­o entre placas conductoras paralelas.'
  },
  {
    id: 'morris-thorne',
    title: 'El Wormhole que Puedes Cruzar',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m4/btn_morris.jpg',
    image: '/assets/interstellar/infographic_m4/hero_morris.jpg',
    content: [
      'En el aÃ±o 1988, el fÃ­sico teÃ³rico Kip Thorne y su estudiante Michael Morris decidieron enfrentarse al desafÃ­o matemÃ¡tico de la exploraciÃ³n cÃ³smica. Con la inspiraciÃ³n generada por la novela Contacto de Carl Sagan, publicaron un artÃ­culo cientÃ­fico titulado "Wormholes in Spacetime and Their Use for Interstellar Travel" en la revista acadÃ©mica American Journal of Physics. Este trabajo estableciÃ³ los cimientos matemÃ¡ticos para el estudio formal de las topologÃ­as espaciales transitables.',
      'En este documento matemÃ¡tico, Morris y Thorne analizaron exhaustivamente las reglas geomÃ©tricas necesarias para crear un agujero de gusano que los seres humanos pudieran atravesar de forma segura sin morir aplastados. Este hito demostrÃ³ de manera fehaciente que los atajos cÃ³smicos no eran un capricho de la relatividad, sino una posibilidad viable bajo ciertas condiciones fÃ­sicas. Derivaron las mÃ©tricas exactas requeridas para garantizar trayectorias geodÃ©sicas libres de singularidades letales.',
      'Las condiciones que postularon incluÃ­an requisitos monumentales: el tÃºnel deberÃ­a mantenerse abierto mediante materia exÃ³tica antigravitatoria; las fuerzas de marea gravitacional en su interior no deberÃ­an desgarrar los huesos de los viajeros; y el cruce completo de un extremo galÃ¡ctico al otro tendrÃ­a que durar como mÃ¡ximo unos cuantos dÃ­as para que el trayecto fuera prÃ¡ctico. Estas restricciones matemÃ¡ticas definieron los parÃ¡metros operativos para los viajes supralumÃ­nicos viables.',
      'Este trabajo acadÃ©mico transformÃ³ el panorama cientÃ­fico, sacando a los agujeros de gusano del reino de la ciencia ficciÃ³n para elevarlos al estudio riguroso de la fÃ­sica cuÃ¡ntica. Fue un logro intelectual y matemÃ¡tico monumental, similar en su impacto al momento en que se propusieron los satÃ©lites geoestacionarios. Las ecuaciones resultantes impulsaron una nueva rama de investigaciÃ³n cosmolÃ³gica dedicada a comprender las limitaciones energÃ©ticas de la relatividad general modificada.',
      'La herencia dejada por el documento del dÃºo Morris-Thorne es tan duradera, que sigue siendo el estÃ¡ndar de oro y la guÃ­a esencial para cualquier fÃ­sico que decida calcular o discutir la viabilidad de la construcciÃ³n de puentes en el espacio-tiempo. Todo el andamiaje narrativo del viaje espacial de Interstellar se basa en las ecuaciones reveladas en aquel aÃ±o 1988. Los modelos teÃ³ricos contemporÃ¡neos todavÃ­a utilizan estas soluciones fundamentales para evaluar escenarios de fÃ­sica exÃ³tica.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Para dotar a la pelÃ­cula de la mÃ¡xima verosimilitud en la historia del cine de ciencia ficciÃ³n, el productor Kip Thorne utilizÃ³ directamente sus propios cÃ¡lculos del artÃ­culo Morris-Thorne de 1988 para garantizar que el comportamiento fÃ­sico del agujero de gusano esfÃ©rico obedeciera las leyes conocidas de la fÃ­sica y la geometrÃ­a de Einstein. Esta fidelidad matemÃ¡tica asegurÃ³ que la representaciÃ³n visual coincidiera exactamente con las simulaciones numÃ©ricas de las ecuaciones de campo.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Es un hecho histÃ³rico que el profesor Kip Thorne aceptÃ³ ayudar a Carl Sagan a resolver la crisis fÃ­sica de su novela Contacto porque estaban viajando juntos en un taxi urbano cuando surgiÃ³ el dilema. Thorne procediÃ³ a darle la soluciÃ³n a su estudiante Michael Morris como un problema de tarea de fÃ­sica relativista para que lo resolviera. Este proyecto acadÃ©mico rutinario inesperadamente produjo uno de los artÃ­culos cientÃ­ficos mÃ¡s citados en la literatura sobre relatividad general teÃ³rica.' }
    ],
    fact: 'El documento acadÃ©mico de Morris y Thorne del aÃ±o 1988 presentaba de manera clara una mÃ©trica matemÃ¡tica nueva, la cual describÃ­a con exactitud geomÃ©trica cÃ³mo se deformaba el espacio, y exigÃ­a inevitablemente la presencia indispensable de una tensiÃ³n negativa en la garganta para mantener el atajo abierto para cualquier explorador. Las demostraciones matemÃ¡ticas establecieron de forma concluyente que el cumplimiento de las ecuaciones de campo requiere violaciones energÃ©ticas locales.'
  },
  {
    id: 'dimensiones-extra',
    title: 'MÃ¡s AllÃ¡ de Tres Dimensiones',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m4/btn_dimensiones.jpg',
    image: '/assets/interstellar/infographic_m4/hero_dimensiones.jpg',
    content: [
      'Si logras aceptar la idea de que el universo es una superficie curva que puede ser atravesada por un atajo, entonces debes enfrentarte a la pregunta lÃ³gica: Â¿a travÃ©s de dÃ³nde viaja este tÃºnel subterrÃ¡neo? Para que el ejemplo del papel doblado tenga sentido fÃ­sico, nuestro universo tridimensional tiene que doblarse a travÃ©s de un espacio que posee mÃ¡s dimensiones, un lugar invisible a nuestros ojos humanos. Las teorÃ­as matemÃ¡ticas de dimensiones superiores proporcionan el marco para esto.',
      'En el aÃ±o 1921, el matemÃ¡tico Theodor Kaluza propuso una idea audaz: sugiriÃ³ que nuestro cosmos tiene en realidad una quinta dimensiÃ³n espacial oculta. MÃ¡s tarde, el fÃ­sico Oskar Klein perfeccionÃ³ esta teorÃ­a proponiendo que esta dimensiÃ³n extra estÃ¡ enrollada sobre sÃ­ misma a un nivel subatÃ³mico microscÃ³pico. Juntos crearon la TeorÃ­a de Kaluza-Klein, el primer intento de unificar la gravedad y la luz. Introdujeron tensores mÃ©tricos ampliados para acomodar el campo electromagnÃ©tico.',
      'En los estudios actuales de la TeorÃ­a de Cuerdas de la fÃ­sica teÃ³rica contemporÃ¡nea, los cientÃ­ficos estÃ¡n convencidos de que el universo requiere obligatoriamente tener diez u once dimensiones para que las matemÃ¡ticas cuÃ¡nticas puedan funcionar armÃ³nicamente sin arrojar errores absurdos. Es un salto mental abrumador para el ser humano comÃºn tratar de visualizar un multiverso tan vasto. Estas dimensiones extra compactificadas resuelven las divergencias matemÃ¡ticas en los cÃ¡lculos de dispersiÃ³n.',
      'Los cosmÃ³logos contemporÃ¡neos suelen referirse a este espacio hiperdimensional extra que nos rodea como "El Bulk" (o El Bulto). SegÃºn estos modelos exÃ³ticos, nuestro universo tridimensional, con todas sus galaxias y agujeros negros, es simplemente una membrana plana que estÃ¡ suspendida dentro de la enormidad infinita de El Bulk hiperdimensional. Esta hipÃ³tesis postula que las partÃ­culas fundamentales estÃ¡ndar estÃ¡n confinadas a nuestra membrana tetradimensional mediante restricciones topolÃ³gicas.',
      'Cuando un agujero de gusano funcional conecta dos galaxias distantes, su tÃºnel interior estÃ¡ saliendo de nuestra membrana y cruzando a travÃ©s de este Bulk superior, comportÃ¡ndose como un puente elevado que salta por encima del trÃ¡fico bidimensional. Esta arquitectura hiperdimensional de dimensiones enrolladas es el secreto matemÃ¡tico que permite que los atajos espaciales funcionen sin violar la velocidad local de la luz. Las trayectorias de conexiÃ³n atraviesan el volumen hiperespacial.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'El clÃ­max emocional de Interstellar, cuando Cooper se adentra en el Teseracto (un cubo hiperdimensional), muestra cÃ³mo unos seres de cinco dimensiones han construido un espacio manipulable de incontables dimensiones extra en el interior del Bulk, para que el humano tridimensional pueda enviar seÃ±ales fÃ­sicas gravitatorias. La representaciÃ³n artÃ­stica ilustra la intersecciÃ³n geomÃ©trica de un volumen hiperdimensional superior penetrando perpendicularmente nuestro espacio local convencional.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'atom', text: 'SegÃºn las teorÃ­as actuales sobre las membranas espaciales y El Bulk, de las cuatro fuerzas fundamentales del universo que conocemos, solo la gravedad es plenamente capaz de escapar de nuestra membrana tridimensional y filtrarse hacia El Bulk o quinta dimensiÃ³n oculta. Esta disipaciÃ³n gravitacional teÃ³rica hacia el espacio hiperdimensional podrÃ­a explicar por quÃ© la fuerza gravitatoria medida es exponencialmente mÃ¡s dÃ©bil que el electromagnetismo a escalas subatÃ³micas fundamentales.' }
    ],
    fact: 'La teorÃ­a de Kaluza-Klein del aÃ±o 1921, que proponÃ­a aÃ±adir matemÃ¡ticas de una quinta dimensiÃ³n extra, logrÃ³ de manera asombrosa combinar las ecuaciones de campo de la relatividad general de Albert Einstein de la gravedad, con las ecuaciones del electromagnetismo de Maxwell de la luz, unificando todo de forma coherente. Este pionero trabajo estableciÃ³ el paradigma metodolÃ³gico moderno para intentar integrar todas las interacciones fundamentales utilizando geometrÃ­as multidimensionales complejas.'
  },
  {
    id: 'viaje-posible',
    title: 'Â¿Podremos Cruzar AlgÃºn DÃ­a?',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m4/btn_viaje.jpg',
    image: '/assets/interstellar/infographic_m4/hero_viaje.jpg',
    content: [
      'Llegados a este punto de nuestra exploraciÃ³n espacial de conceptos teÃ³ricos, nos enfrentamos a la pregunta final: Â¿lograremos los seres humanos fabricar y atravesar un agujero de gusano en algÃºn momento futuro de nuestra civilizaciÃ³n? En el panorama cientÃ­fico actual del siglo XXI, la respuesta realista es que estamos a milenios de distancia tecnolÃ³gica de alcanzar semejante prodigio monumental de la ingenierÃ­a astrofÃ­sica. Los desafÃ­os energÃ©ticos sobrepasan los lÃ­mites ingenieriles actuales.',
      'Las necesidades tecnolÃ³gicas y energÃ©ticas requeridas abruman a cualquier mente terrestre. Para construir un tÃºnel espacial del tamaÃ±o necesario para acomodar a un ser humano, requerirÃ­amos recolectar la energÃ­a irradiada por millones de estrellas, y ademÃ¡s tendrÃ­amos que inventar cÃ³mo procesar las cantidades incalculables de energÃ­a negativa antigravitatoria para mantenerlo firme sin fluctuaciones. La magnitud operativa equivale al control total de los recursos fÃ­sicos galÃ¡cticos.',
      'Sin embargo, un avance teÃ³rico matemÃ¡tico y fÃ­sico ha surgido en nuestra dÃ©cada contemporÃ¡nea. En el aÃ±o 2013, el fÃ­sico Juan Maldacena y Leonard Susskind formularon la conjetura "ER=EPR" ante la comunidad internacional. Esta idea postula, con base matemÃ¡tica firme, que el entrelazamiento cuÃ¡ntico de diminutas partÃ­culas es exactamente lo mismo que un microscÃ³pico agujero de gusano espaciotemporal. Esta equivalencia relaciona la mÃ©trica topolÃ³gica con las correlaciones estadÃ­sticas cuÃ¡nticas.',
      'Este puente filosÃ³fico y matemÃ¡tico une en un abrazo teÃ³rico a las dos ramas fÃ­sicas mÃ¡s conflictivas de la historia: la gravedad de la Relatividad General de Einstein y la rareza de la MecÃ¡nica CuÃ¡ntica. Sugiere que el universo entero a nivel cuÃ¡ntico podrÃ­a ser una gigantesca red interconectada de agujeros de gusano de tamaÃ±o subatÃ³mico que parpadean de forma continua. La dualidad propuesta implica que el continuo espaciotemporal emerge directamente del entrelazamiento de los qubits.',
      'Y en un experimento reciente del aÃ±o 2022, cientÃ­ficos de laboratorios avanzados como Google anunciaron al mundo que habÃ­an logrado observar el intercambio de informaciÃ³n cuÃ¡ntica simulando un agujero de gusano teÃ³rico usando la computadora cuÃ¡ntica Sycamore. Aunque este hito no significa que abrieran un tÃºnel fÃ­sico real, demuestra que la curiosidad del ser humano seguirÃ¡ descifrando los secretos del cosmos. Los protocolos de teletransportaciÃ³n validaron las predicciones teÃ³ricas hologrÃ¡ficas.'
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'El mensaje filosÃ³fico que domina la historia de Interstellar se basa en esta visiÃ³n a largo plazo de la civilizaciÃ³n: aunque el viaje cÃ³smico y la manipulaciÃ³n de la gravedad estÃ¡n actualmente fuera de nuestras limitaciones cientÃ­ficas, en un futuro distante, la humanidad evolucionarÃ¡ hasta convertirse en los arquitectos cÃ³smicos del espacio. La narrativa sugiere que el dominio completo de la fÃ­sica dimensional y temporal representarÃ¡ el prÃ³ximo estadio evolutivo tecnolÃ³gico humano.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'La sigla teÃ³rica "ER=EPR" de la conjetura propuesta significa lo siguiente: ER representa directamente el artÃ­culo sobre el "Puente Einstein-Rosen" de 1935; y EPR es el acrÃ³nimo de "Einstein-Podolsky-Rosen", quienes en ese mismo aÃ±o escribieron su artÃ­culo clave sobre el entrelazamiento cuÃ¡ntico a distancia.' }
    ],
    fact: 'El experimento de entrelazamiento publicado en la revista cientÃ­fica Nature en el aÃ±o 2022 con la computadora cuÃ¡ntica superconductora de Google, causÃ³ debates sobre quÃ© significa exactamente lograr verdaderamente que un "agujero de gusano cuÃ¡ntico" haya sido teletransportado en los circuitos del laboratorio. Aunque la mÃ©trica simulada operaba en un espacio abstracto bidimensional anti-de Sitter, la dinÃ¡mica observada era matemÃ¡ticamente indistinguible de la gravedad hologrÃ¡fica teÃ³rica.'
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
                  <Star size={14} /> MÃ³dulo 4: Agujeros de Gusano
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
                      EL DATO CIENTÃFICO
                    </h4>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.7, fontStyle: 'italic' }}>
                      {activeNode.fact}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} color={activeNode.color} />
                    ExploraciÃ³n Profunda
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
