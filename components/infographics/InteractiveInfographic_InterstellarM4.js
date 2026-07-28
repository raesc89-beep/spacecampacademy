'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Interstellar themed) ────────────────────────────
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
      <text x="5" y="32" fill={color} fontSize="22" fontWeight="bold" fontFamily="serif" opacity="0.6">Gμν=8πTμν</text>
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

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Einstein, A., Rosen, N. (1935). "The Particle Problem in the General Theory of Relativity", Physical Review, 48(1)',
  'Morris, M.S., Thorne, K.S. (1988). "Wormholes in Spacetime and Their Use for Interstellar Travel", American Journal of Physics, 56(5)',
  'Maldacena, J., Susskind, L. (2013). "Cool Horizons for Entangled Black Holes", Fortschritte der Physik, 61(9)',
  'Visser, M. (1995). Lorentzian Wormholes: From Einstein to Hawking, AIP Press',
  'Jafferis, D. et al. (2022). "Traversable Wormhole Dynamics on a Quantum Processor", Nature, 612',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'puente-einstein-rosen',
    title: 'El Puente de Einstein y Rosen',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m4/btn_puente.jpg',
    image: '/assets/interstellar/infographic_m4/hero_puente.jpg',
    content: [
      'En el trascendental e históricamente prolífico año de mil novecientos treinta y cinco, el mundialmente célebre y genial físico teórico Albert Einstein, trabajando incansablemente en colaboración estrecha con su brillante colega científico Nathan Rosen, realizó un descubrimiento matemático absolutamente asombroso. Al explorar y retorcer meticulosamente las complejas ecuaciones fundamentales de la Relatividad General, se dieron cuenta de que la inmensa gravedad extrema que existe en el interior oscuro de un agujero negro podría, teóricamente, conectarse de manera directa y fluida con otro agujero negro distante. Es como si el universo tuviera una gigantesca red de cañerías subterráneas invisibles que permiten viajar entre lugares sin recorrer la superficie visible.',
      'Este asombroso e increíble corredor matemático y teórico interconectado, que une de forma invisible y secreta dos regiones inmensamente separadas y distantes del vasto tejido del espacio-tiempo universal, fue formal y académicamente bautizado por la comunidad científica internacional como el "Puente de Einstein-Rosen". Imagina con asombro que la inabarcable e infinita superficie entera del cosmos no fuera más que una inmensa y plana lámina de goma tensada, y que dos pesados embudos profundos formados por masas extremas se extendieran hacia abajo hasta finalmente tocarse y fusionarse en sus extremos. Esa conexión increíble representaba un pasadizo secreto cósmico.',
      'Sin embargo, a pesar de lo inmensamente emocionante y deslumbrante que sonaba esta revolucionaria idea teórica para los entusiastas de la ciencia ficción moderna, había un gigantesco y decepcionante problema físico insalvable desde el principio. Los cálculos matemáticos originales demostraban irrefutablemente que este enigmático puente cósmico o corredor gravitatorio sería extremadamente inestable en su naturaleza fundamental, cerrándose y colapsando violentamente sobre sí mismo de una forma tan absurdamente rápida y veloz que absolutamente nada, ni siquiera la luz misma, podría tener el tiempo suficiente para lograr atravesarlo. Sería como una puerta giratoria colosal que se estrella y se cierra en el mismo microsegundo en que intentas cruzarla valientemente.',
      'En su monumental y revelador artículo científico original, que fue publicado orgullosamente y leído con gran interés en la famosa revista Physical Review, los dos brillantes autores argumentaron persuasivamente que esta extraña solución matemática era principalmente una forma teórica muy elegante y compleja de intentar describir las partículas subatómicas elementales, como los electrones giratorios, sin necesidad de usar los complicados conceptos de la naciente mecánica cuántica. Pretendían construir y modelar toda la materia del universo tangible simplemente como diminutos e intrincados puentes invisibles y vibrantes en la mismísima geometría profunda del espacio-tiempo, como pequeños nudos en una gran alfombra.',
      'Aunque el sueño inicial y ambicioso de usar esta estructura cósmica gigante como un verdadero atajo intergaláctico práctico para viajeros y naves estelares parecía completamente imposible, inviable e irrealizable bajo las estrictas leyes de la física clásica conocida en aquel momento, el Puente de Einstein-Rosen logró plantar la semilla conceptual germinal e indestructible que décadas más tarde y tras mucho estudio, se convertiría en la fascinante e icónica idea moderna del agujero de gusano. Abrió definitivamente la puerta a pensar que el universo, en su intrincada arquitectura oculta, podría tener atajos secretos esperando a ser descubiertos y comprendidos plenamente.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'En la majestuosa e inolvidable cinta Interstellar, los heroicos y valientes astronautas a bordo de la resistente nave espacial Endurance dependen absoluta y completamente de este mismo concepto teórico fundamental para tener una mínima esperanza de salvar al planeta Tierra. El puente cósmico gigante que atraviesan audazmente cerca de Saturno es precisamente y sin lugar a dudas una enorme y estabilizada variación moderna del Puente de Einstein-Rosen original, demostrando el poder asombroso de la gravedad.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Es un hecho sumamente curioso y fascinante en la historia de la ciencia moderna que tanto Albert Einstein como Nathan Rosen nunca imaginaron, ni por un solo instante fugaz en sus ocupadas vidas académicas, que su complejo y árido artículo de ecuaciones matemáticas formales se convertiría finalmente en el pilar fundacional más absoluto e importante de casi todas las grandes historias modernas y aventuras espaciales de la ciencia ficción contemporánea popular.' },
    ],
    fact: 'El histórico y denso documento original de Einstein y Rosen del año treinta y cinco, titulado científicamente "The Particle Problem in the General Theory of Relativity", tenía el audaz e increíble propósito secreto de eliminar matemáticamente todas las "singularidades" (puntos de densidad infinita) del universo observable, proponiendo ingeniosamente en su lugar estas exóticas y maravillosas conexiones geométricas o túneles espaciales como una explicación mucho más natural, elegante y armónica de la realidad cuántica.',
  },
  {
    id: 'hoja-doblada',
    title: 'Doblar el Universo',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m4/btn_hoja.jpg',
    image: '/assets/interstellar/infographic_m4/hero_hoja.jpg',
    content: [
      'Para poder visualizar verdaderamente, comprender profundamente y explicar de manera clara y sencilla a cualquier persona cómo es que funciona un agujero de gusano intergaláctico, los educadores científicos y grandes físicos teóricos modernos suelen recurrir habitualmente a una de las analogías didácticas más famosas, elegantes y maravillosamente efectivas de todos los tiempos. Consiste simplemente en tomar una hoja de papel plana y normal, dibujar cuidadosamente dos pequeños puntos negros muy separados en ambos extremos opuestos y preguntarse cuál es la forma más rápida y directa de viajar. En un espacio plano y aburrido, la respuesta obvia es trazar una línea recta y constante.',
      'Sin embargo, si decides audazmente romper las reglas rígidas preestablecidas y levantas ambo extremos del papel para curvar la hoja completamente sobre sí misma, formando una especie de tubo o letra U, lograrás hacer que esos dos lejanos puntos dibujados se toquen casi perfectamente en el espacio tridimensional circundante. Si en ese momento preciso atraviesas bruscamente ambas capas de papel unidas con un afilado lápiz de madera, habrás creado un atajo inmediato e instantáneo entre los dos destinos distantes. El lápiz representa brillantemente al puente cósmico agujereando y atravesando el hiperespacio, saltándose olímpicamente millones de años luz de un solo golpe magistral.',
      'Esta brillante y visual metáfora espacial tridimensional, aunque pueda parecer extremadamente simple, infantil y básica a primera vista, captura de manera absolutamente perfecta e impecable la esencia matemática más pura de cómo la inmensa gravedad colosal podría llegar a torcer, doblar y perforar el tejido continuo del espacio-tiempo a niveles monumentales e inconcebibles. Del mismo modo que nuestro papel de ejemplo bidimensional se curva mágicamente en una invisible tercera dimensión adicional para juntar los puntos, nuestro vasto y tridimensional universo perceptible tendría que doblarse forzosamente a través de una exótica y misteriosa cuarta dimensión espacial superior, como una sábana al viento.',
      'Curiosamente y de manera muy fascinante, esta icónica y celebrada explicación de la hoja de papel perforada ganó su inmensa e imparable popularidad global cuando el renombrado y carismático astrónomo Carl Sagan se encontraba escribiendo febrilmente su famosa novela de ciencia ficción Contacto en la década de los ochenta. Sagan deseaba encontrar urgentemente una manera científicamente plausible, realista y creíble para que su heroína principal cruzara la galaxia entera, así que llamó por teléfono a su gran amigo, el físico teórico Kip Thorne, pidiéndole consejo experto. Thorne sugirió usar agujeros de gusano en lugar de los letales y destructivos agujeros negros.',
      'Al comprender cabalmente esta poderosa e iluminadora lección geométrica, nos damos cuenta asombrosamente de que un agujero de gusano no es realmente un objeto físico sólido o un vehículo de transporte espacial que viaja a gran velocidad, sino que es simplemente y llanamente una ruta alternativa geométrica; una deformación arquitectónica masiva del universo mismo. Es la prueba matemática contundente de que, en las condiciones extremas y salvajes adecuadas, las distancias inmensas y aterradoras que separan a las incontables y lejanas estrellas podrían ser mágicamente reducidas a unos pocos pasos rápidos y sencillos, como caminar cómodamente de una habitación a otra en tu casa.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Esta misma y exactísima explicación geométrica visual es utilizada de manera magistral, icónica e inolvidable en la película Interstellar, cuando el pragmático e inteligente personaje de Romilly toma valientemente un simple trozo de papel y un bolígrafo para explicarle con suma paciencia al desorientado Cooper cómo funciona el atajo que están a punto de tomar. Esa breve e iluminadora escena en la nave es un homenaje directo y maravilloso a décadas de enseñanza científica divulgativa iniciada por pensadores como Carl Sagan.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Aunque la famosa e icónica analogía de la hoja de papel doblada y perforada es espectacularmente útil e indispensable para entender rápidamente el concepto básico del viaje interestelar mediante atajos, tiene una limitación técnica muy importante: en nuestra inmensa e insondable realidad cósmica, el universo tiene tres dimensiones espaciales completas y complejas, lo que significa que el agujero de entrada no sería un círculo plano dibujado, sino una esfera flotante completa.' },
    ],
    fact: 'Cuando el visionario escritor y astrónomo Carl Sagan consultó científicamente al brillante físico Kip Thorne en el año ochenta y cinco para su libro Contacto, Thorne realizó complejos y exhaustivos cálculos matemáticos relativistas para asegurarse de que el viaje literario fuera físicamente posible. Ese simple favor amistoso terminó provocando sorpresivamente un renacimiento explosivo y mundial en la investigación seria y académica sobre agujeros de gusano en las universidades más prestigiosas del mundo.',
  },
  {
    id: 'wormhole-saturno',
    title: 'El Agujero de Gusano de Saturno',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m4/btn_saturno.jpg',
    image: '/assets/interstellar/infographic_m4/hero_saturno.jpg',
    content: [
      'En la grandiosa, épica y visualmente deslumbrante trama cinematográfica de la película Interstellar, los esperanzados y valientes científicos de la secreta agencia NASA descubren asombrados un misterioso y monumental agujero de gusano orbitando silenciosamente cerca del imponente y anillado planeta Saturno. La inmensa pregunta científica que surge inmediatamente en la mente de los curiosos espectadores es: si pudieras flotar frente a uno en la vida real, ¿cómo se vería realmente este enigmático objeto cósmico? La respuesta, calculada de forma meticulosa por los físicos, es que no sería un simple hoyo negro o un disco plano y bidimensional como en las películas clásicas y antiguas.',
      'Puesto que nuestro majestuoso e inabarcable espacio exterior existe en tres formidables dimensiones físicas tangibles, cualquier agujero genuino, auténtico y profundo que se abra paso a través de la mismísima tela del universo debe manifestarse forzosamente como un objeto tridimensional completo. Esto significa que la entrada monumental a un agujero de gusano cósmico se vería visualmente como una gigantesca y resplandeciente esfera de cristal perfecta suspendida en el oscuro vacío. Es como si estuvieras observando una mágica bola de boliche transparente que, en lugar de reflejar la habitación, te muestra la imagen de otro universo lejano en su interior curvo.',
      'Para lograr recrear de manera absolutamente fidedigna, asombrosa y realista este colosal fenómeno astronómico en la pantalla grande, el aclamado director Christopher Nolan y el meticuloso equipo de efectos especiales trabajaron codo a codo durante extenuantes meses con el laureado físico teórico Kip Thorne. Thorne desarrolló desde cero complejas y nuevas ecuaciones matemáticas de trazado de rayos lumínicos relativistas que dictaban exactamente cómo los fotones de luz lejana debían curvarse, retorcerse y viajar al acercarse a la inmensa gravedad esférica. El deslumbrante resultado final se convirtió inmediatamente en la representación más científica y precisa jamás creada.',
      'Al observar detenidamente esta monumental e hipnótica esfera distorsionadora cerca del colosal Saturno, los astronautas de la nave pueden ver con asombro la luz directa, brillante y parpadeante proveniente de una lejana e ignota galaxia situada a miles de millones de años luz de distancia. Toda la luz brillante de ese sistema estelar remoto es fuertemente atraída, comprimida y canalizada a través de la estrecha e invisible garganta del agujero de gusano, emergiendo finalmente por nuestro lado como una deslumbrante e increíble lente convexa que deforma majestuosamente y amplifica las imágenes del espacio profundo detrás de ella.',
      'La imponente y misteriosa colocación estratégica de este agujero de gusano en las frías y oscuras cercanías del planeta Saturno no es simplemente una casualidad narrativa azarosa o un capricho del guion; implica de manera abrumadora y contundente que una civilización extraterrestre o extradimensional increíblemente avanzada e inimaginable lo colocó allí a propósito. La cantidad colosal de energía extrema y precisión quirúrgica cósmica necesaria para estabilizar y mantener abierta una anomalía geométrica de semejante magnitud frente a la gravedad del gigante gaseoso, escapa por completo a cualquier fenómeno natural aleatorio conocido por la ciencia humana.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'La increíble, espectacular y majestuosamente deslumbrante secuencia en la que la nave espacial Endurance se aproxima cautelosamente al agujero de gusano cerca del anillado Saturno tomó innumerables meses de renderizado computacional masivo y constante. Cada simple cuadro fotográfico de la película requirió gigantescas granjas de servidores potentes para calcular pacientemente cómo la luz de las estrellas distantes se curvaría, retorcería y distorsionaría de forma salvaje alrededor de la perfecta esfera anómala y brillante en el vacío.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'El genial y obstinado físico asesor Kip Thorne estaba tan profundamente comprometido, obsesionado y maravillado con asegurar la máxima precisión científica y visual en la representación de los agujeros negros y agujeros de gusano de la película, que las complejas ecuaciones originales de relatividad que derivó meticulosamente para los efectos visuales de Hollywood terminaron siendo publicadas posteriormente en dos importantes y respetados artículos de revistas científicas revisadas por pares en el campo astrofísico.' },
    ],
    fact: 'Desde una perspectiva matemática rigurosa, estricta y analítica, si un viajero valiente observara directamente y fijamente a través de un hipotético agujero de gusano esférico estabilizado, la impactante y fascinante imagen que vería en la superficie convexa no sería una simple ventana plana y aburrida, sino más bien una vista panorámica esférica y completamente comprimida de todo el inmenso cielo estrellado perteneciente al otro lado, distorsionada enormemente como en un gigantesco espejo de parque de diversiones.',
  },
  {
    id: 'materia-exotica',
    title: 'La Materia Imposible',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m4/btn_exotica.jpg',
    image: '/assets/interstellar/infographic_m4/hero_exotica.jpg',
    content: [
      'Si la increíble e inmensa fuerza de la gravedad tiene el innegable e indetenible poder cósmico de hundir, aplastar y curvar el espacio-tiempo para lograr conectar dos puntos distantes del universo, también tiene inevitablemente la letal y destructiva tendencia a cerrar violentamente ese túnel inmediatamente. Las matemáticas de la Relatividad General son sumamente claras y crueles al respecto: las inmensas y abrumadoras paredes de un túnel gravitatorio querrán colapsar sobre sí mismas, estrangulando y destruyendo instantáneamente a cualquier desafortunada nave espacial que intente cruzar. Es como intentar mantener abierta una inmensa y pesada puerta de acero usando solo un palillo frágil de madera.',
      'Para lograr evitar este inminente, desastroso y fatídico colapso estructural inmediato, los brillantes físicos teóricos se dieron cuenta asombrados de que necesitarían urgentemente encontrar o fabricar una sustancia completamente desconocida y maravillosamente anómala: la famosísima y misteriosa "Materia Exótica". A diferencia de toda la materia normal y corriente que conocemos, amamos y respiramos en la Tierra (la cual tiene una masa positiva convencional y atrae cosas gracias a la gravedad estándar), la materia exótica debe poseer obligatoriamente una densidad de energía negativa extrema y unas propiedades repulsivas completamente antinaturales que empujen hacia afuera.',
      'Esta incomprensible e indispensable materia exótica de energía negativa funcionaría milagrosamente como un poderoso e invisible andamiaje o exoesqueleto de soporte estructural continuo dentro de la estrecha garganta del agujero de gusano. Su inmensa presión antigravitatoria empujaría constantemente y con firmeza las implacables paredes colapsantes hacia el exterior cósmico, contrarrestando de forma precisa, elegante y absoluta la aplastante y monstruosa fuerza de atracción del espacio curvo que intenta sellar el pasadizo. Sería como inflar rápidamente y de forma salvadora un globo extremadamente resistente y gigante dentro de un pozo minero a punto de derrumbarse por completo.',
      'Aunque el extraño y estrafalario concepto de la energía verdaderamente negativa pueda sonar rotundamente a magia inventada y charlatanería barata de novelas ligeras de ficción barata, lo asombroso e increíble es que la física cuántica real y comprobable permite y avala absolutamente su existencia concreta. Un ejemplo real y medible en los grandes laboratorios modernos es el famoso y sutil Efecto Casimir, donde dos diminutas placas metálicas lisas colocadas increíblemente cerca en el vacío más absoluto, experimentan misteriosamente una fuerza atractiva extraña debido a que la energía cuántica entre ellas es literalmente menor que cero y más baja que el propio vacío exterior.',
      'Lamentablemente y para tristeza de todos los entusiastas de los viajes espaciales instantáneos, las asombrosas y minúsculas cantidades microscópicas de energía negativa cuántica que los científicos humanos pueden generar o medir actualmente en sus enormes laboratorios terrestres avanzados, son abrumadora e infinitamente insuficientes para lograr sostener y estabilizar un túnel espacial del tamaño necesario para que pase una persona humana, y mucho menos para una colosal nave espacial completa. Se necesitarían gigantescas y cósmicas cantidades industriales incalculables de materia exótica, algo que solo una civilización tipo III en la escala de Kardashev podría soñar remotamente con dominar.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Durante la apremiante e intensa trama dramática, los protagonistas principales no se detienen calmadamente a discutir ni analizar en detalle técnico profundo de qué material exótico exacto está construida o revestida la brillante pared esférica del agujero de gusano de Saturno, porque simplemente no tienen el conocimiento para hacerlo. Saben instintivamente y de forma incuestionable que "Ellos" (los inescrutables seres superiores de la quinta dimensión) lo colocaron allí y proporcionaron la milagrosa y desconocida materia estabilizadora para que la frágil humanidad pudiera cruzar con seguridad.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Es un detalle inmensamente fascinante y complejo que, según todos los estrictos y rigurosos cálculos matemáticos modernos realizados sobre la física de los atajos espaciales, la materia exótica con energía negativa rompe de manera brutal, flagrante e inevitable lo que los severos físicos teóricos llaman orgullosamente las "condiciones de energía fundamentales" del universo, abriendo temibles y espeluznantes posibilidades de crear locas máquinas de viaje en el tiempo incontrolables que destruirían la causalidad.' },
    ],
    fact: 'El enigmático e inquietante Efecto Casimir, que demuestra de forma empírica y rotunda que la misteriosa energía negativa es una posibilidad física totalmente real y comprobable, fue propuesto y teorizado originalmente por el físico holandés Hendrik Casimir en mil novecientos cuarenta y ocho, y asombrosamente comprobado de forma experimental casi cincuenta años más tarde con una asombrosa y milimétrica precisión, otorgando gran esperanza matemática a los soñadores teóricos de los agujeros de gusano interestelares.',
  },
  {
    id: 'morris-thorne',
    title: 'El Wormhole que Puedes Cruzar',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m4/btn_morris.jpg',
    image: '/assets/interstellar/infographic_m4/hero_morris.jpg',
    content: [
      'En el increíblemente fructífero, revolucionario y transformador año de mil novecientos ochenta y ocho, el mundialmente respetado y aclamado físico teórico Kip Thorne y su talentosísimo estudiante de posgrado Michael Morris decidieron valientemente enfrentarse al desafío matemático más grande de la exploración cósmica. Con la inspiración y el gran estímulo intelectual generado por la novela Contacto de su amigo Carl Sagan, escribieron y publicaron conjuntamente un artículo científico fundacional asombroso titulado "Wormholes in Spacetime and Their Use for Interstellar Travel" en la prestigiosa y muy seria revista académica de física American Journal of Physics.',
      'En este deslumbrante, minucioso y extenso documento matemático, Morris y Thorne analizaron y detallaron exhaustiva y rigurosamente, por primerísima vez en toda la historia de la ciencia moderna, cuáles serían exactamente las estrictas reglas matemáticas, geométricas y físicas necesarias para crear y mantener un agujero de gusano que los frágiles seres humanos pudieran atravesar de forma totalmente segura sin morir aplastados horriblemente o incinerados. Este hito gigantesco demostró de manera contundente y fehaciente que los fabulosos atajos cósmicos no eran simplemente un capricho imposible de la relatividad, sino una posibilidad asombrosamente viable bajo ciertas condiciones físicas.',
      'Las meticulosas y exigentes condiciones que estos dos brillantes cerebros postularon en su trabajo incluían varios requisitos monumentales e innegociables: el túnel debería mantenerse forzosamente abierto y estable sin fluctuaciones mediante materia exótica antigravitatoria; las fuerzas de marea gravitacional en su interior no deberían desgarrar violentamente la carne, los huesos o las naves de los viajeros intrépidos; y el cruce completo de un extremo galáctico al otro extremo lejano tendría que durar como máximo apenas unos cuantos días o semanas cortas medibles por el viajero, para que el agotador trayecto intergaláctico fuera útil y práctico para la humanidad.',
      'Este revolucionario, majestuoso e impecable trabajo académico transformó de manera radical, instantánea y permanente el panorama científico, sacando a los misteriosos agujeros de gusano del dudoso y marginado reino de la ciencia ficción barata y las revistas ilustradas pulp, para elevarlos finalmente al olimpo del estudio riguroso, serio y metódico de la física teórica cuántica y relativista más dura y exigente del planeta entero. Fue un logro intelectual y matemático monumental, similar en su impacto inspirador al momento en que se propusieron por primera vez los satélites geoestacionarios de comunicaciones por el autor Arthur C. Clarke.',
      'La inmortal e incuestionable herencia dejada por el brillante documento científico del gran dúo Morris-Thorne es tan asombrosamente duradera y profunda, que sigue siendo en la actualidad moderna el estándar de oro absoluto, la brújula y la guía esencial para cualquier físico contemporáneo o cosmólogo atrevido que decida adentrarse valientemente a calcular, diseñar teóricamente o discutir la viabilidad futura real de la construcción de puentes en el espacio-tiempo. Todo el andamiaje científico, conceptual y narrativo del viaje espacial salvador de Interstellar se basa íntima, fundamental y orgullosamente en las ecuaciones reveladas en aquel increíble año ochenta y ocho.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'Para dotar a la gran película de la máxima verosimilitud y el realismo más apabullante y absoluto imaginable en la historia del cine de ciencia ficción de gran presupuesto, el aclamado productor y asesor científico Kip Thorne utilizó directamente sus propios e inmortales cálculos del artículo Morris-Thorne del ochenta y ocho para garantizar y verificar que el diseño y el comportamiento físico del brillante agujero de gusano esférico de Saturno obedeciera ciegamente las sagradas leyes conocidas de la física y la geometría cósmica de Einstein.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'Es un hecho histórico profundamente conmovedor, entrañable e inspirador que el profesor Kip Thorne aceptó ayudar al afamado Carl Sagan a resolver la inmensa crisis física de su novela Contacto, porque estaban viajando felizmente juntos en un taxi urbano cuando surgió apasionadamente el complejo y enredado dilema. Thorne procedió diligentemente a darle la vital solución a su estudiante Michael Morris como un gigantesco problema de tarea final de física relativista para que lo resolviera en casa.' },
    ],
    fact: 'El extenso e influyente documento académico final, sorprendentemente accesible, de Morris y Thorne del año ochenta y ocho presentaba y detallaba de manera muy clara, pedagógica y asombrosa una métrica matemática completamente nueva y revolucionaria, la cual describía con exactitud geométrica impecable cómo se deformaba el espacio, y exigía irrefutable e inevitablemente la presencia indispensable de una inmensa tensión o energía negativa gigantesca en la garganta para mantener el atajo abierto y viable para cualquier explorador, marcando un antes y un después insuperable.',
  },
  {
    id: 'dimensiones-extra',
    title: 'Más Allá de Tres Dimensiones',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m4/btn_dimensiones.jpg',
    image: '/assets/interstellar/infographic_m4/hero_dimensiones.jpg',
    content: [
      'Si logras aceptar la inmensa y abrumadora idea de que el gigantesco universo es una gran superficie elástica, curva y maleable que puede ser audazmente atravesada por un atajo, entonces debes enfrentarte inevitable y valientemente a la siguiente pregunta lógica gigantesca: ¿a través de dónde, exactamente, viaja o pasa este túnel subterráneo? Para que el famoso e icónico ejemplo del papel doblado tenga sentido físico absoluto, nuestro universo observable tridimensional tiene que doblarse indefectiblemente a través de un espacio inmenso, gigantesco e insondable que posee forzosamente más dimensiones, un lugar completamente ajeno, extraño e invisible a nuestros ojos humanos y limitados.',
      'En el remoto y efervescente año europeo de mil novecientos veintiuno, el sagaz e intuitivo matemático y físico Theodor Kaluza propuso una idea verdaderamente audaz, estrafalaria y deslumbrante: sugirió que nuestro cosmos tiene en realidad y de forma secreta una incomprensible y misteriosa quinta dimensión espacial oculta. Más tarde, el brillante Oskar Klein perfeccionó y pulió esta loca teoría audaz proponiendo astutamente que esta extraña dimensión extra está diminuta, imperceptible y fuertemente enrollada sobre sí misma a un nivel subatómico microscópico. Juntos crearon la pionera e inmortal Teoría de Kaluza-Klein, el primer gran intento majestuoso de unificar la gravedad y la luz.',
      'En los frenéticos e inmensamente complejos y abstractos estudios actuales de la Teoría de Cuerdas de la física teórica contemporánea moderna, los científicos matemáticos están total y absolutamente convencidos, tras revisar innumerables pizarras llenas de ecuaciones laberínticas, de que el universo real requiere obligatoriamente tener diez u once dimensiones formidables para que las complejas matemáticas cuánticas puedan funcionar armónicamente sin fallar, estallar o arrojar errores absurdos infinitos y ridículos. Es un salto mental y conceptual inmenso y abrumador para el ser humano común tratar de visualizar conscientemente y sin marearse un multiverso tan absolutamente ajeno, vasto e inabarcable.',
      'Los grandes y eminentes cosmólogos contemporáneos y físicos teóricos suelen referirse técnica y poéticamente a este inmenso e incomprensible espacio hiperdimensional extra que nos rodea silenciosamente como "El Bulk" (o El Bulto/El Bulto Hexadimensional). Según estos modelos exóticos deslumbrantes, nuestro inmenso y vasto universo tridimensional completo, con todas sus galaxias brillantes, nebulosas hermosas y oscuros agujeros negros aterradores, es simplemente y humildemente una delgadísima, flotante e insignificante membrana o "brana" plana que está suspendida frágilmente dentro de la inconcebible y aterradora enormidad infinita y absoluta de El Bulk superior e inaccesible.',
      'Cuando un imponente agujero de gusano funcional atraviesa audazmente el espacio cósmico y conecta dos galaxias o sistemas distantes, su largo túnel interior está saliendo de nuestra membrana y cruzando rápidamente y de forma directa a través de este inmenso, silencioso e invisible Bulk superior, comportándose milagrosamente como un puente elevado de autopista tridimensional que salta maravillosamente por encima del tráfico bidimensional congestionado. Esta arquitectura hiperdimensional fabulosa y exótica de dimensiones enrolladas o bultos inabarcables es el gran secreto matemático y cósmico que permite, en las ecuaciones teóricas, que los milagrosos atajos espaciales funcionen verdaderamente y sin errores en nuestro vasto universo.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El alucinante y abrumador clímax emocional y visual apoteósico de Interstellar, cuando el desorientado pero valiente Cooper se adentra heroicamente en el Teseracto (un incomprensible y laberíntico cubo hiperdimensional asombroso), muestra maravillosamente cómo unos benevolentes y evolucionados seres de cinco dimensiones han construido ingeniosamente un inmenso y brillante espacio manipulable de incontables dimensiones extra en el interior del Bulk oscuro, para que el limitado humano tridimensional pueda enviar señales físicas gravitatorias directas.' },
      { label: '¿Sabías que...?', icon: 'atom', text: 'Según las muy aceptadas e intrigantes teorías modernas y actuales sobre las membranas espaciales dimensionales y El Bulk inabarcable y eterno, de las cuatro fuerzas fundamentales inquebrantables del universo que conocemos (el electromagnetismo brillante y otras fuerzas nucleares), solo la misteriosa, ubicua y aparentemente débil Gravedad es plenamente capaz de escapar victoriosamente de nuestra delgada membrana tridimensional y filtrarse silenciosamente hacia El Bulk o quinta dimensión oculta.' },
    ],
    fact: 'La pionera, antigua e increíble teoría de Kaluza-Klein del año veintiuno, que proponía audazmente añadir matemáticas de una milagrosa y unificadora quinta dimensión extra, logró de manera asombrosa y casi mágica combinar las elegantes ecuaciones de campo de la relatividad general de Albert Einstein de la gravedad curva, con las fabulosas ecuaciones del electromagnetismo de Maxwell de la luz, unificando todo en un conjunto asombroso y perfecto, siendo el verdadero precursor antiguo de la teoría de cuerdas.',
  },
  {
    id: 'viaje-posible',
    title: '¿Podremos Cruzar Algún Día?',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m4/btn_viaje.jpg',
    image: '/assets/interstellar/infographic_m4/hero_viaje.jpg',
    content: [
      'Llegados a este emocionante y crucial punto final de nuestra increíble odisea y exploración espacial de conceptos teóricos asombrosos, nos enfrentamos ineludiblemente a la gran y máxima pregunta final: ¿lograremos nosotros, los pequeños, vulnerables e imperfectos seres humanos, fabricar, estabilizar y atravesar exitosamente y sin peligros un enorme agujero de gusano en algún momento futuro de nuestra breve historia civilizatoria? En el panorama científico e investigativo estrictamente actual del siglo veintiuno de nuestro calendario, la respuesta brutalmente realista es que estamos inmensamente e infinitamente lejos, a milenios completos de distancia tecnológica, de alcanzar semejante prodigio monumental de la ingeniería astrofísica extrema.',
      'Las necesidades tecnológicas, energéticas y de ingeniería cósmica requeridas abruman y hacen colapsar a cualquier mente lógica e imaginación terrestre. Para construir y estabilizar un túnel espacial del tamaño y diámetro necesario para acomodar tranquilamente a un pequeño ser humano, requeriríamos ineludiblemente recolectar, cosechar y concentrar toda la energía irradiada por millones de estrellas comunes como nuestro propio Sol brillante, y encima de todo ese trabajo monumental, tendríamos que inventar y dominar cómo extraer, procesar y manipular las míticas y destructivas cantidades incalculables de energía negativa exótica antigravitatoria para mantenerlo firme sin fluctuaciones trágicas.',
      'Sin embargo, de manera absolutamente fascinante e ilusionante, un gigantesco, deslumbrante e inesperado avance teórico matemático y físico ha surgido en nuestra última década contemporánea moderna. En el esperanzador año dos mil trece, el inmensamente talentoso Juan Maldacena y el audaz Leonard Susskind formularon y propusieron ante la comunidad internacional asombrada la revolucionaria, increíble y brillante conjetura "ER=EPR". Esta majestuosa idea postula, con base matemática firme, que el extraño e incomprensible entrelazamiento cuántico espeluznante de diminutas e invisibles partículas es exactamente y matemáticamente lo mismo que un microscópico, ínfimo e imperceptible agujero de gusano espaciotemporal en el vacío.',
      'Este audaz, deslumbrante e increíble puente filosófico y matemático une milagrosamente, en un cálido y apretado abrazo conceptual y teórico de proporciones monumentales, a las dos ramas físicas más irreconciliables, conflictivas y alejadas de toda la historia: la gravedad extrema de la Relatividad General de Einstein (lo inmensamente grande y abarcador) y la rareza intrínseca de la Mecánica Cuántica estocástica (lo absurdamente minúsculo, diminuto y discreto). Sugiere fascinantemente y con bases sólidas que el universo entero a nivel cuántico y microscópico podría ser una asombrosa y gigantesca red inabarcable e interconectada de agujeros de gusano de tamaño subatómico y efímero que parpadean.',
      'Y en un espectacular, asombroso y apoteósico experimento reciente del año dos mil veintidós, valientes científicos de laboratorios avanzados y empresas tecnológicas punteras como Google anunciaron al mundo maravillado que habían logrado crear y observar exitosamente el comportamiento e intercambio de información cuántica simulando fidedignamente un agujero de gusano teórico usando el portentoso procesador y computadora cuántica avanzada Sycamore. Aunque este hito no significa que abrieran un túnel físico espacial real transitable, demuestra firmemente y sin dudas que la incesante, indómita e imbatible curiosidad del incansable espíritu humano seguirá valientemente descifrando y dominando los secretos oscuros de nuestro mágico cosmos.',
    ],
    expandables: [
      { label: 'En la Película', icon: 'zap', text: 'El hermosísimo, desgarrador e inmensamente inspirador mensaje filosófico, esperanzador y optimista que permea y domina la gran historia de Interstellar se basa fiel y fuertemente en esta tenaz, infinita y maravillosa visión grandilocuente a muy largo plazo de la civilización: aunque el rudimentario y primitivo viaje cósmico y la manipulación de la inmensa y aplastante gravedad están actualmente mucho más allá, fuera y muy lejos de nuestras patéticas limitaciones y capacidades científicas modernas, en un futuro distante, brillante e insondable, la humanidad unida evolucionará maravillosamente hasta convertirse verdaderamente en "Ellos", los arquitectos cósmicos del espacio.' },
      { label: '¿Sabías que...?', icon: 'clock', text: 'La célebre, concisa y muy misteriosa sigla teórica y académica "ER=EPR" de la conjetura propuesta maravillosamente significa lo siguiente: ER representa directamente el antiguo artículo sobre el "Puente Einstein-Rosen" de mil novecientos treinta y cinco; y EPR es valiosamente el acrónimo famoso de los científicos "Einstein-Podolsky-Rosen", quienes en ese mismo e histórico año productivo y trascendental de la ciencia moderna y la humanidad escribieron su célebre, complejo y criticado artículo clave sobre el incomprensible y espeluznante entrelazamiento cuántico a distancia.' },
    ],
    fact: 'El deslumbrante, innovador y controvertido experimento de entrelazamiento y simulación publicado en la mundialmente prestigiosa y aclamada revista científica Nature a finales del gélido año dos mil veintidós con la potente y gélida computadora cuántica superconductora avanzada de la compañía Google, causó un gigantesco e inmenso alboroto intelectual, acalorados e interminables debates y profundas e intensas discusiones existenciales sobre qué significa exactamente, en nuestra moderna y avanzada era dorada de la información veloz, lograr verdaderamente y comprobar empíricamente que un "agujero de gusano informático holográfico cuántico" haya sido teletransportado y materializado en los complejos y extraños circuitos del laboratorio.',
  },
];

// ─── Gargantua Video Background ─────────────────────────────────────────────
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

// ─── Interstellar Header ──────────────────────────────────────────────────────
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

// ─── Organic Node Button ─────────────────────────
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
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

// ─── Expandable Section ────────────────────────────────
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

// ─── Main Component ───────────────────────────────────────────────────────────
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
                  }} />
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
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
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
            Referencias Científicas (Bibliografía)
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
