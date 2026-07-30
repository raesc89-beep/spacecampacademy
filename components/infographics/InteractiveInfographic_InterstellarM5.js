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
  'dimensiones-geometria': [DecoOrbit, DecoSpacetimeGrid, DecoBlackHole],
  'quinta-dimension': [DecoEqualSign, DecoSpacetimeGrid, DecoOrbit],
  'teoria-cuerdas': [DecoSpacetimeGrid, DecoBlackHole, DecoWaveRipple],
  'branas-universo': [DecoOrbit, DecoSpacetimeGrid, DecoWaveRipple],
  'gravedad-transdimensional': [DecoBlackHole, DecoSpacetimeGrid, DecoEqualSign],
  'teseracto-cooper': [DecoWaveRipple, DecoBlackHole, DecoOrbit],
  'mensaje-tiempo': [DecoOrbit, DecoWaveRipple, DecoEqualSign],
};

// â”€â”€â”€ Content Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const BIBLIOGRAPHY = [
  'Thorne, K. (2014). The Science of Interstellar, W.W. Norton & Company',
  'Randall, L., Sundrum, R. (1999). "Large Mass Hierarchy from a Small Extra Dimension", Physical Review Letters, 83(17)',
  'Greene, B. (1999). The Elegant Universe: Superstrings, Hidden Dimensions, and the Quest for the Ultimate Theory, W.W. Norton',
  'Kaluza, T. (1921). "Zum UnitÃ¤tsproblem der Physik", Sitzungsberichte Preussische Akademie der Wissenschaften',
  'Randall, L. (2005). Warped Passages: Unraveling the Mysteries of the Universe\'s Hidden Dimensions, Ecco Press',
  'Hinton, C.H. (1888). A New Era of Thought, Swan Sonnenschein & Co.',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'dimensiones-geometria',
    title: 'De Punto a Hipercubo',
    color: '#7C4DFF',
    btnImage: '/assets/interstellar/infographic_m5/btn_dimensiones.jpg',
    image: '/assets/interstellar/infographic_m5/hero_dimensiones.jpg',
    content: [
      'Imagina que el universo comienza con un punto matemÃ¡tico sin tamaÃ±o ni volumen, flotando en la nada. Este punto representa la dimensiÃ³n cero, un lugar donde no puedes moverte hacia ningÃºn lado, ni siquiera un milÃ­metro. Si pudieras tomar ese punto y estirarlo infinitamente hacia los lados, crearÃ­as una lÃ­nea recta, formando asÃ­ la primera dimensiÃ³n. Es como si el universo fuera un tren que solo puede viajar hacia adelante o hacia atrÃ¡s sobre un riel, sin poder desviarse.',
      'Ahora, si tomas esa lÃ­nea y la desplazas en una direcciÃ³n perpendicular a sÃ­ misma, crearÃ¡s una superficie plana, como una hoja extendida hasta el infinito. Esta es nuestra segunda dimensiÃ³n, un mundo donde los seres podrÃ­an deslizarse como manchas, yendo de arriba abajo o de izquierda a derecha. Piensa en esto como en la pantalla de un videojuego arcade, donde los personajes pueden correr y saltar libremente, pero nunca pueden salir de la pantalla para acercarse o alejarse de ti.',
      'Para dar el salto hacia la tercera dimensiÃ³n, que es el espacio que habitamos y experimentamos a diario, debemos tomar ese papel y apilarlo infinitamente hacia arriba o hacia abajo. Al ganar esa libertad de movimiento, construimos la profundidad espacial, formando cubos y esferas. Es como pasar de mirar silenciosamente una fotografÃ­a bidimensional, a poder caminar alrededor de una escultura en medio de un museo lleno de detalles asombrosos.',
      'Pero la mente humana nunca se detiene. En el siglo diecinueve, un pensador llamado Charles Howard Hinton intentÃ³ obligar a nuestro cerebro a visualizar una cuarta dimensiÃ³n espacial que se extendiera perpendicularmente a nuestro mundo en una direcciÃ³n inconcebible. Ã‰l introdujo por primera vez en el aÃ±o 1888 la palabra teseracto para describir cÃ³mo se verÃ­a un hipercubo cuatridimensional, algo tan complejo como un fantasma que desafÃ­a todas las reglas de nuestra percepciÃ³n.',
      'Visualizar un genuino hipercubo es un ejercicio tan complicado para nuestra mente que incluso el genio Salvador DalÃ­ se obsesionÃ³ con esta geometrÃ­a sagrada. En 1954, pintÃ³ magistralmente la obra Corpus Hypercubus, representando el despliegue tridimensional de un teseracto. Imagina que el hipercubo proyecta una sombra en nuestro mundo tridimensional, de la misma manera en que tÃº proyectas una sombra en el suelo; observando sus sombras, logramos atisbar dimensiones superiores ocultas.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'En la escena culminante de la pelÃ­cula Interstellar, el astronauta Cooper cae vertiginosamente a travÃ©s del horizonte de sucesos para acabar sumergiÃ©ndose directamente dentro de una estructura tridimensional fabricada con el propÃ³sito especÃ­fico de permitirle visualizar y comprender un espacio cuatridimensional de manera intuitiva y segura, sin que su mente estalle ante la incomprensibilidad de las hiperdimensiones infinitas del teseracto.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Para comprender cÃ³mo un teseracto despliega su complejidad en nuestro espacio, puedes imaginar el proceso inverso: si desenrollas una caja tridimensional cortando sus aristas, obtendrÃ¡s una figura de seis cuadrados bidimensionales sobre el suelo. Siguiendo exactamente la misma regla, si desdoblaras un teseracto hiperdimensional, obtendrÃ­as un conjunto entrelazado de ocho cubos tridimensionales proyectÃ¡ndose dentro de nuestro entorno habitual.' },
    ],
    fact: 'La arquitectura teÃ³rica que subyace detrÃ¡s de la existencia del hipercubo fue tan meticulosamente desarrollada por matemÃ¡ticos del siglo pasado, que resulta asombroso constatar que mucho antes de poseer los grÃ¡ficos computacionales modernos para generar su forma, cientÃ­ficos de la Ã©poca ya calculaban fielmente a mano su nÃºmero exacto de vÃ©rtices, aristas y caras hiperdimensionales invisibles para nosotros.',
  },
  {
    id: 'quinta-dimension',
    title: 'La Quinta DimensiÃ³n',
    color: '#4FC3F7',
    btnImage: '/assets/interstellar/infographic_m5/btn_quinta.jpg',
    image: '/assets/interstellar/infographic_m5/hero_quinta.jpg',
    content: [
      'En nuestra experiencia cotidiana, siempre sentimos que el tiempo avanza implacablemente hacia el futuro sin detenerse, como una flecha que solo puede apuntar en una direcciÃ³n. Pero cuando los fÃ­sicos teÃ³ricos comienzan a estudiar y analizar las matemÃ¡ticas del universo bajo la lupa rigurosa de la relatividad, se ven forzados a considerar la posibilidad de que nuestro fluir temporal podrÃ­a ser tratado matemÃ¡ticamente como una quinta dimensiÃ³n espacial.',
      'El primero en proponer la necesidad de aÃ±adir dimensiones extras al tejido cÃ³smico fue el matemÃ¡tico Theodor Kaluza en el aÃ±o de 1921. Su objetivo no era jugar frÃ­volamente con conceptos abstractos sin sentido, sino intentar desesperadamente unificar y casar matemÃ¡ticamente la fuerza de la gravedad descubierta por Einstein, con la fuerza del electromagnetismo, demostrando que ambas fuerzas son diferentes perspectivas de una misma energÃ­a primordial en dimensiones altÃ­simas.',
      'Para que la teorÃ­a de Kaluza pudiera funcionar en el mundo fÃ­sico y no solo en pizarras, el fÃ­sico Oskar Klein propuso en 1926 una respuesta fascinante a un gran problema: Â¿dÃ³nde estÃ¡ escondida esa quinta dimensiÃ³n que no podemos ver? Klein argumentÃ³ con gran ingenio y genialidad cientÃ­fica que esta dimensiÃ³n estÃ¡ extremadamente enrollada y compactada sobre sÃ­ misma a escalas tan diminutas que resulta absolutamente invisible para nuestros ojos tridimensionales.',
      'Imagina con todo detalle que te encuentras observando a lo lejos un cable elÃ©ctrico que cuelga silencioso entre dos postes. Desde tu distancia en el suelo, el cable te parecerÃ¡ indudablemente una lÃ­nea unidimensional que solo tiene un largo apreciable. Sin embargo, si fueras una hormiga caminando sobre Ã©l, descubrirÃ­as que ese cable tambiÃ©n posee un contorno circular y curvo; es decir, tiene secretamente una dimensiÃ³n extra escondida a plena vista en las escalas fundamentales.',
      'De una manera similar a esa analogÃ­a de la hormiga y el cable elÃ©ctrico distante, nosotros los seres humanos vivimos caminando por el universo tridimensional ignorando de forma total las dimensiones superiores enrolladas. Solo cuando nos acercamos a las extremas condiciones de la mecÃ¡nica cuÃ¡ntica o exploramos la fuerza aplastante del interior de los agujeros negros descubrimos que esta quinta dimensiÃ³n es absolutamente necesaria y vital para entender la naturaleza fÃ­sica.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Dentro de las laberÃ­nticas paredes del teseracto construido por la entidad evolucionada del futuro, el astronauta Cooper descubre que el implacable tiempo se ha transformado en una dimensiÃ³n fÃ­sica transitable. Ya no estÃ¡ prisionero del eterno presente, sino que puede literalmente caminar saltando a travÃ©s de pasillos observando de forma omnisciente todos los momentos simultÃ¡neos de la habitaciÃ³n infantil de Murph.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Aunque la teorÃ­a original formulada por Kaluza y Klein presentaba innegables defectos matemÃ¡ticos que frustraron al propio Albert Einstein durante aÃ±os, su valiente propuesta abriÃ³ una gigantesca puerta teÃ³rica inexplorada. Sin su idea inicial del espacio enrollado y compactado en bucles diminutos, jamÃ¡s habrÃ­amos concebido ni desarrollado las espectaculares teorÃ­as modernas de las supercuerdas, que hoy intentan explicar cada misterio fundamental del universo.' },
    ],
    fact: 'La escala infinitesimal en la que el fÃ­sico Oskar Klein propuso y defendiÃ³ fehacientemente que se ocultaba nuestra quinta dimensiÃ³n espacial teÃ³rica es mundialmente conocida por los fÃ­sicos modernos como la Escala de Planck; una longitud tan microscÃ³pica (diez a la potencia de menos treinta y cinco metros) que un solo Ã¡tomo parecerÃ­a infinitamente colosal y gigantesco en comparaciÃ³n directa.',
  },
  {
    id: 'teoria-cuerdas',
    title: 'Cuerdas Vibrantes',
    color: '#FF6B35',
    btnImage: '/assets/interstellar/infographic_m5/btn_cuerdas.jpg',
    image: '/assets/interstellar/infographic_m5/hero_cuerdas.jpg',
    content: [
      'A lo largo de dÃ©cadas del pensamiento humano, los fÃ­sicos teÃ³ricos nos enseÃ±aron pacientemente que todas las cosas tangibles que nos rodean estÃ¡n construidas a partir de invisibles partÃ­culas elementales, como pequeÃ±as canicas fundamentales. Pero una de las teorÃ­as mÃ¡s complejas jamÃ¡s creadas, la TeorÃ­a de Cuerdas, destruye este concepto y afirma categÃ³ricamente que en el corazÃ³n del universo no existen rÃ­gidas esferas de materia inerte.',
      'En vez de encontrar las esperadas partÃ­culas elementales, si pudiÃ©ramos hacer un zoom hacia el nÃºcleo mÃ¡s Ã­nfimo de los quarks, verÃ­amos maravillosas y microscÃ³picas cuerdas, extremadamente delgadas que vibran y oscilan incesantemente de forma frenÃ©tica. Es exactamente como si las entraÃ±as invisibles de nuestro vasto universo fueran en realidad un violÃ­n cÃ³smico microscÃ³pico cuyas cuerdas primordiales generan perpetuamente toda la materia densa.',
      'La poÃ©tica analogÃ­a del instrumento de cuerda es simplemente perfecta y profundamente esclarecedora. De la misma manera en que el grosor, la tensiÃ³n mecÃ¡nica y la veloz vibraciÃ³n resonante de una cuerda de guitarra determinan si tocarÃ¡ una nota alta o una lÃºgubre nota grave, la vibraciÃ³n matemÃ¡tica de estas diminutas cuerdas cÃ³smicas primordiales determina si en el universo observable se manifestarÃ¡ un fotÃ³n, un electrÃ³n o un gravitÃ³n huidizo.',
      'Sin embargo, para que esta sinfonÃ­a cÃ³smica pueda funcionar verdaderamente sin colapsar instantÃ¡neamente ni producir desastrosos errores teÃ³ricos llenos de letales infinitos matemÃ¡ticos, el riguroso modelo requiere obligatoriamente un escenario espacial mucho mÃ¡s gigantesco para albergar tantas vibraciones complejas. Estas cuerdas no pueden limitarse a bailar en nuestras tres dimensiones; requieren de un escenario cÃ³smico compuesto por diez dimensiones.',
      'En este asombroso universo orquestal, el espacio-tiempo alberga nueve dimensiones espaciales y una solitaria dimensiÃ³n temporal, conformando las misteriosas diez dimensiones teÃ³ricas necesarias. Puesto que nuestros limitados cerebros y rudimentarios sentidos biolÃ³gicos solo pueden captar tres evidentes direcciones espaciales, las restantes seis dimensiones sobrantes deben obligatoriamente estar retorcidas, compactadas y ocultas sobre sÃ­ mismas en geometrÃ­as microscÃ³picas.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'A lo largo de la densa trama cientÃ­fica que sustenta la narrativa intergalÃ¡ctica de la Ã©pica espacial Interstellar, la revolucionaria idea de que el universo no estÃ¡ restringido a nuestras limitadas dimensiones habituales perceptibles proporciona indiscutiblemente la justificaciÃ³n fÃ­sica clave para las mÃ¡s extremas rarezas temporales y los puentes espaciales presenciados y padecidos por los valientes astronautas exploradores de la lejana NASA.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Para intentar procesar mentalmente el incomprensible grado de pequeÃ±ez microscÃ³pica dimensional en la que se supone que deberÃ­an existir estas mÃ­sticas cuerdas primordiales, piensa de la siguiente manera comparativa: si expandiÃ©ramos un diminuto Ã¡tomo de hidrÃ³geno hasta que alcanzara el colosal tamaÃ±o de todo nuestro sistema solar actual, una sola cuerda incrustada dentro de este enorme ente apenas alcanzarÃ­a a medir el tamaÃ±o normal de un Ã¡rbol.' },
    ],
    fact: 'Estas misteriosas dimensiones invisibles y fuertemente enrolladas no son simples bolitas esfÃ©ricas de espacio apretado sin ningÃºn interÃ©s aparente; los mÃ¡s avanzados geÃ³metras y matemÃ¡ticos teÃ³ricos especulan firmemente que adoptan complejas formas multidimensionales entrelazadas geomÃ©tricamente, llamadas los insondables y espectaculares Espacios de Calabi-Yau, los cuales determinan absolutamente cada una de las inmutables propiedades fÃ­sicas.',
  },
  {
    id: 'branas-universo',
    title: 'Universos en Rebanadas',
    color: '#AB47BC',
    btnImage: '/assets/interstellar/infographic_m5/btn_branas.jpg',
    image: '/assets/interstellar/infographic_m5/hero_branas.jpg',
    content: [
      'Una vez que las matemÃ¡ticas fundamentales de las teorÃ­as superiores superaron ampliamente la idea estricta de las solitarias cuerdas cÃ³smicas unidimensionales microscÃ³picas, los fÃ­sicos teÃ³ricos abrieron audazmente las puertas del conocimiento a estructuras geomÃ©tricas aÃºn mucho mÃ¡s grandes, masivas y formidables. En 1999, dos mentes brillantes, Lisa Randall y Raman Sundrum, publicaron estudios introduciendo al mundo la nociÃ³n cosmolÃ³gica de que nuestro universo podrÃ­a no ser mÃ¡s que una delgada lÃ¡mina incrustada.',
      'A estas vastas y sorprendentes superficies cÃ³smicas hiperdimensionales se les otorga cientÃ­ficamente el sonoro nombre tÃ©cnico moderno de Branas, un tÃ©rmino moderno que deriva lÃ³gicamente de la familiar palabra membrana. Imagina mentalmente que nuestro vasto cosmos completo, con todas sus brillantes estrellas fulgurantes y misteriosos agujeros negros, es tan solo una pequeÃ±a rebanada delgadÃ­sima cortada de un pan inmenso; una finÃ­sima brana que flota de manera solitaria dentro de un entorno hiperdimensional inconmensurable, vacÃ­o y muchÃ­simo mayor.',
      'Este gigantesco, inabarcable e impensable entorno colosal multidimensional que rodea incesantemente y envuelve infinitamente a nuestra pequeÃ±a brana tridimensional se le conoce en la cosmologÃ­a teÃ³rica con el impactante nombre oficial de El Bulk o El Volumen. Si esta descabellada teorÃ­a cientÃ­fica llegara a ser correcta y real, podrÃ­a significar asombrosamente que existen millones de otras branas cÃ³smicas vecinas flotando infinitas, las cuales alojarÃ­an universos paralelos inabarcables, tan increÃ­blemente cercanos al nuestro pero absolutamente invisibles y aislados.',
      'Lo verdaderamente alucinante del modelo teÃ³rico cosmolÃ³gico de Randall-Sundrum, es que propone firmemente una regla matemÃ¡tica sumamente restrictiva sobre la naturaleza fÃ­sica fundamental: absolutamente todos los componentes bÃ¡sicos de la materia conocida, como los electrones, la luz solar y los pesados quarks nucleares, estÃ¡n fuerte y perpetuamente pegados e irremediablemente sujetos por los extremos a nuestra propia brana casera, impidiÃ©ndoles escapar de ella. No pueden cruzar de ningÃºn modo hacia el abismo del Bulk.',
      'Es por este insalvable muro de contenciÃ³n dimensional invisible que nosotros mismos, meros seres biolÃ³gicos y terrenales construidos de Ã¡tomos simples pegados fÃ©rreamente a nuestra modesta rebanada universal, no podemos de ninguna manera visualizar, percibir o interactuar fÃ­sicamente de forma evidente con el resto infinito del voluminoso pan hiperdimensional superior, a pesar de que este Ãºltimo pueda estar existiendo a una minÃºscula fracciÃ³n de milÃ­metro de distancia invisible; como si estuviÃ©ramos encerrados en una gran prisiÃ³n.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'En la colosal pelÃ­cula Ã©pica Interstellar que desafÃ­a nuestra imaginaciÃ³n humana constantemente, la palabra tÃ©cnica y cientÃ­fica Bulk se menciona abierta y explÃ­citamente y con gran respeto reverencial por parte de los dedicados astronautas de la NASA cada vez que se refieren al inmenso espacio inabarcable hiperdimensional inexplorado a travÃ©s del cual logran construir magistralmente y cruzar el mÃ¡gico agujero de gusano para atajar enormes distancias viajando valientemente hacia otras galaxias.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Para intentar asimilar la extraÃ±a naturaleza aprisionadora e limitante de estas exÃ³ticas y masivas membranas cÃ³smicas, piensa en la oscura tinta impresa de una pÃ¡gina de libro. Las palabras de este texto estÃ¡n atrapadas permanentemente en dos dimensiones. No pueden levantarse fÃ­sicamente hacia el techo ni salir flotando del papel. Nosotros somos la tinta biolÃ³gica viviendo prisionera en una gran pÃ¡gina en blanco tridimensional gigantesca llamada universo observable material, ignorando todo el aire invisible de la habitaciÃ³n.' },
    ],
    fact: 'La fascinante y revolucionaria propuesta teÃ³rica cientÃ­fica sugerida, defendida e investigada activamente en la actualidad de que existen de forma palpable otras branas dimensionales invisibles colindantes no es en absoluto una simple fantasÃ­a o un guion cinematogrÃ¡fico rebuscado; fue postulada originalmente por matemÃ¡ticos eminentes para intentar resolver el colosal problema de la asombrosa debilidad de la gravedad universal frente a otras fuerzas poderosas. Esta compleja teorÃ­a formal ha sido profundamente revisada en miles de artÃ­culos.',
  },
  {
    id: 'gravedad-transdimensional',
    title: 'La Gravedad Cruza Dimensiones',
    color: '#FF9800',
    btnImage: '/assets/interstellar/infographic_m5/btn_gravedad.jpg',
    image: '/assets/interstellar/infographic_m5/hero_gravedad.jpg',
    content: [
      'De todas las misteriosas fuerzas cÃ³smicas primordiales que logran mantener fuertemente unido al vasto universo que habitamos dÃ­a a dÃ­a, la imponente fuerza masiva de la gravedad guarda celosa y hermÃ©ticamente un secreto matemÃ¡tico oscuro, peculiar y profundamente desconcertante para la ciencia actual. Resulta sorpresivo descubrir que la gravedad masiva, comparada minuciosamente con fuerzas poderosas como el repulsivo electromagnetismo que todos hemos experimentado de alguna manera en la Tierra, es sorprendentemente frÃ¡gil y sutil.',
      'Es literalmente tan dÃ©bil en su inmensa y colosal intensidad de atracciÃ³n en la realidad tangible del mundo cotidiano que resulta sumamente decepcionante en las comparaciones mÃ¡s evidentes. Piensa por tan solo un fugaz momento revelador: todo nuestro gigantesco y pesado planeta Tierra estÃ¡ intentando continuamente jalar hacia su ardiente nÃºcleo a un pequeÃ±Ã­simo y brillante clip metÃ¡lico con muchÃ­sima fuerza de gravedad, pero basta usar un minÃºsculo e insignificante imÃ¡n comÃºn de refrigerador para arrebatarle el clip magnÃ©ticamente, demostrando la absurda debilidad terrestre.',
      'Para dar una ingeniosa, lÃ³gica y elegante respuesta definitiva a este milenario y frustrante enigma cientÃ­fico, los avanzados modelos de cuerdas introdujeron un concepto bellÃ­simo que lo cambiÃ³ absolutamente todo en nuestra percepciÃ³n. Ya sabÃ­amos que las partÃ­culas y la luz eran cuerdas pegadas fuertemente a la brana. Pero el teÃ³rico gravitÃ³n, la partÃ­cula invisible y fundamental que transmite el tirÃ³n de gravedad, es radicalmente distinto: es una cuerda que forma un bucle cerrado y redondo sin extremos libres, como una banda elÃ¡stica inmaterial.',
      'Por no poseer lÃ³gicamente ni fÃ­sicamente ningÃºn ancla restrictiva pegajosa dimensional en sus minÃºsculas formas cerradas, los gravitones cerrados pueden maravillosa y milagrosamente liberarse y filtrarse imperceptible pero indeteniblemente hacia el inconmensurable abismo gigantesco invisible que conforma en su majestuosa oscuridad al inabarcable Bulk hiperdimensional que nos rodea. Por lo tanto, nuestra familiar gravedad terrestre observada y medida es dÃ©bil solo porque su intensa energÃ­a original enorme se estÃ¡ desangrando y derramando hacia los vastos universos contiguos e invisibles.',
      'Esto implica fascinante y espectacularmente que, de absolutamente y sin ninguna excepciÃ³n todas las incontables fuerzas de la vibrante e indomable naturaleza terrenal conocidas hasta el dÃ­a de hoy, solo la imponente e invisible gravedad curva tiene la rara, exÃ³tica y singularÃ­sima capacidad fÃ­sica y matemÃ¡tica de poder cruzar implacablemente saltando enormes distancias dimensionales a travÃ©s de toda la misteriosa complejidad de la quinta dimensiÃ³n y lograr establecer un contacto fÃ­sico notorio de manera remota con otros inexplorados y oscuros universos paralelos habitando en branas invisibles.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Este exactÃ­simo y profundo detalle cientÃ­fico real extraÃ­do minuciosamente de manera fiel y devota directamente desde el inabarcable corazÃ³n de la revolucionaria TeorÃ­a de Cuerdas avanzada es el nÃºcleo narrativo central de toda la increÃ­ble pelÃ­cula. Como la gravedad salta veloz y elegantemente entre dimensiones con suma soltura y facilidad, es la Ãºnica fuerza fÃ­sica misteriosa transdimensional capaz real y efectivamente de poder cruzar con seguridad la abismal barrera matemÃ¡tica del teseracto hiperdimensional para empujar de manera remota libros viejos y agujas de reloj en la Tierra.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Para entender verdaderamente y lograr apreciar mejor la increÃ­ble y abismal debilidad de la gravedad observada frente al electromagnetismo universal brillante, simplemente necesitas observar los escalofriantes datos cientÃ­ficos rigurosos y exactos: el poderoso electromagnetismo es una incomprensible cantidad de diez a la potencia de treinta y seis veces muchÃ­simo mÃ¡s potente, brutal y letal que la humilde gravedad que nos mantiene pegados al suelo. Todo ese masivo poder gravitacional teÃ³rico enorme simplemente se estarÃ­a escurriendo de manera continua hacia las profundidades incomprensibles del Bulk.' },
    ],
    fact: 'La profunda, exhaustiva, muy matemÃ¡tica y meticulosa investigaciÃ³n cientÃ­fica moderna de los grandes expertos y meticulosos fÃ­sicos Lisa Randall y Raman Sundrum nos demuestra brillantemente, elegantemente y con un hermoso rigor formal que la imponente y poderosa fuerza gravitacional parece concentrarse muchÃ­simo mÃ¡s fuertemente del otro misterioso y oscuro lado del Bulk hiperdimensional colosal y exÃ³tico. Es algo asombroso pensar matemÃ¡ticamente que nuestra misteriosa vecina dimensional mÃ¡s cercana e inmediata podrÃ­a llegar a ser indudablemente una inmensamente inabarcable brana invisible que atrapa esta colosal fuerza.',
  },
  {
    id: 'teseracto-cooper',
    title: 'El Teseracto de Cooper',
    color: '#F44336',
    btnImage: '/assets/interstellar/infographic_m5/btn_teseracto.jpg',
    image: '/assets/interstellar/infographic_m5/hero_teseracto.jpg',
    content: [
      'En el desgarrador punto de mÃ¡xima tensiÃ³n climÃ¡tica y cÃºspide emocional apoteÃ³sica de toda la cinta espectacular, Cooper toma la audaz decisiÃ³n heroica y suicida de dejarse soltar y ser devorado, tragado y arrastrado brutalmente por la gigantesca inmensidad oscura e infinita del aterrador horizonte de sucesos gigantesco e inigualable de GargantÃºa, sumergiÃ©ndose intrÃ©pidamente hacia lo desconocido sin ninguna certeza matemÃ¡tica de si lograrÃ¡ sobrevivir o serÃ¡ completamente destrozado en partÃ­culas invisibles atÃ³micas.',
      'En lugar de experimentar fÃ­sicamente una muerte espantosa e indescriptible por medio de la brutal trituraciÃ³n gravitacional de fuerzas masivas teÃ³ricamente indomables llamada lÃºgubremente por los astrÃ³nomos como espaguetizaciÃ³n y ser desmembrado velozmente; maravillosamente Cooper aterriza abruptamente e ileso en el muy intrincado e incomprensible centro oscuro dentro del corazÃ³n de un deslumbrante teseracto resplandeciente. Esta maquinaria laberÃ­ntica cÃ³smica infinita es una asombrosa construcciÃ³n cuadridimensional que transforma todo el pasado y presente de forma simultÃ¡nea e insÃ³lita.',
      'Todo el minucioso, detalladÃ­simo e increÃ­ble diseÃ±o visual asombroso que despliega bellamente e imponentemente el teseracto cÃºbico resplandeciente en la brillante y deslumbrante pantalla del cine no es simplemente fruto descontrolado e ignorante de la azarosa creatividad desbordada de Hollywood. Fue un grandioso e intenso trabajo minuciosamente ideado y estrictamente guiado de forma inquebrantable, matemÃ¡tica y seria por el cÃ©lebre fÃ­sico ganador del premio Nobel Kip Thorne para plasmar fielmente y de forma visualmente correcta un autÃ©ntico entorno matemÃ¡tico extraÃ±o de altÃ­simas y laberÃ­nticas dimensiones superiores.',
      'Lo que el desconcertado y valiente astronauta extraviado estÃ¡ intentando comprender presenciando con asombro con sus minÃºsculos ojos en esa luminosa estructura infinita es una inmensamente compleja proyecciÃ³n cÃ³smica tridimensional de un ente enormemente hiperdimensional superior extraÃ±o. En este alucinante y retorcido lugar laberÃ­ntico, el inmaterial y fluido tiempo ha sido fÃ­sicamente transformado en una robusta e interminable dimensiÃ³n espacial sÃ³lida que se manifiesta, desenrolla y existe de forma permanente ante Ã©l, exactamente y literalmente como si se tratara de una sÃ³lida y tangible biblioteca interminable y deslumbrante.',
      'De esta hermosa e inteligente forma, los bondadosos seres (los inescrutables, incomprensibles y enormemente avanzados y benÃ©volos descendientes humanos y sabios de la quinta dimensiÃ³n superior) logran maravillosamente proporcionarle heroicamente al rudimentario cerebro asustado y primate de Cooper una ingeniosa, amable y maravillosa forma visual tridimensional y familiar que puede procesar para interactuar pacientemente con una inmensamente inabarcable y vasta realidad geomÃ©trica pentadimensional imposible de captar normalmente y visualmente sin caer rendido irremediablemente en la completa locura y el desespero incontrolable oscuro.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Para poder establecer urgentemente y exitosamente una comunicaciÃ³n bidireccional fÃ­sica y desesperada desde dentro de esa impenetrable y resplandeciente cÃ¡rcel brillante del espacio hiperdimensional superior hacia nuestra vulnerable e indefensa habitaciÃ³n tridimensional y salvar milagrosamente a toda la humanidad; Ã©l empuja veloz, desesperada e invisiblemente la arena y manipula firmemente pero con increÃ­ble fuerza y dolor infinito la Ãºnica gravedad que puede trascender, y esto genera una mÃ¡gica y minÃºscula arruga transdimensional sutil que tumba los polvorientos libros fÃ­sicos pesados y voluminosos.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Para comprender y asimilar profundamente el inmenso impacto visual e innovador de los brillantes efectos especiales creados por el prodigioso equipo genial y creativo de la pelÃ­cula, su avanzado software debiÃ³ lograr renderizar magistral y maravillosamente las complejas e intrincadas lÃ­neas rectas y curvas tridimensionales extraÃ­das minuciosamente a partir de pesadas y difÃ­ciles ecuaciones matemÃ¡ticas puras reales, dibujando con asombrosa exactitud los enmaraÃ±ados hilos abstractos del tiempo espacial y simulando con extremo cuidado cientÃ­fico y visual las fantasmales ondas gravitatorias saltando branas multidimensionales superiores.' },
    ],
    fact: 'Como una brillante e impresionante anÃ©cdota y detalle histÃ³rico riguroso de la extenuante e impecable producciÃ³n cinemÃ¡tica asombrosa, la vasta e interminable complejidad tÃ©cnica del impresionante diseÃ±o del interior del teseracto representÃ³ un reto inmenso e inigualable. Literalmente y asombrosamente, construyeron fÃ­sicamente y con gran esfuerzo humano en el inmenso set de filmaciÃ³n grandes secciones intrincadas de la extraÃ±a biblioteca infinita y usaron una abrumadora cantidad de cables mecÃ¡nicos y proyecciones complejas con espejos inmensos, todo esto para minimizar el abusivo uso irresponsable de simples pantallas verdes y malos grÃ¡ficos irreales.',
  },
  {
    id: 'mensaje-tiempo',
    title: 'Un Mensaje a TravÃ©s del Tiempo',
    color: '#26A69A',
    btnImage: '/assets/interstellar/infographic_m5/btn_mensaje.jpg',
    image: '/assets/interstellar/infographic_m5/hero_mensaje.jpg',
    content: [
      'El majestuoso problema gigantesco y terrorÃ­fico con el que arranca toda la Ã©pica historia angustiosa espacial era muy simple pero aterrador: poder resolver a como dÃ© lugar un inescrutable misterio cuÃ¡ntico gravitacional de fÃ­sica matemÃ¡tica abstracta o presenciar la lenta muerte terrenal. La cientÃ­fica Murph necesita los datos, y desesperado, su padre astronauta, sintiendo la enorme responsabilidad sobre sus anchos y fatigados hombros paternos, manipula audazmente la aguja del reloj familiar antiguo y codifica toda esta vital informaciÃ³n fÃ­sica enviando una serie binaria Morse golpeando valientemente la inamovible gravedad.',
      'A primera vista ingenua, escÃ©ptica o ignorante, todo este hermoso, emotivo y dramÃ¡tico asunto descabellado de que la fuerte e inquebrantable fuerza emocional del amor pueda literalmente y poÃ©ticamente lograr trascender maravillosamente el inclemente paso del indetenible tiempo y las inabarcables dimensiones espaciales puede llegar lÃ³gicamente a sonar simplemente como una ridÃ­cula e ilÃ³gica excusa pseudocientÃ­fica melosa, exagerada, empalagosa y artificial diseÃ±ada perezosamente para el cine fantÃ¡stico convencional actual que siempre busca una manera forzada e inmerecida para generar lÃ¡grimas emotivas e instantÃ¡neas en el espectador sensible.',
      'Pero, oculto minuciosamente e inteligentemente debajo de toda la melosa e indudablemente hermosa superficie romÃ¡ntica, sentimental y cinematogrÃ¡ficamente poÃ©tica del abrumador final glorioso y trÃ¡gico visualmente, yace asombrosa y esplÃ©ndidamente un inmenso y profundamente sÃ³lido corazÃ³n firme, riguroso e inamovible de genuina ciencia astrofÃ­sica pura, matemÃ¡tica y sumamente fascinante de dimensiones superiores. Es una demostraciÃ³n espectacular y Ãºnica de un entendimiento muy audaz, serio e impecable de las mecÃ¡nicas secretas teÃ³ricas del inabarcable y extraÃ±o cosmos oscuro infinito que los asombrosos genios fÃ­sicos actuales debaten.',
      'De una forma absoluta, definitiva y real en el majestuoso cosmos e insondable espacio profundo innegable y comprobable cientÃ­ficamente; gracias a las misteriosas ondas espaciales descubiertas empÃ­ricamente y validadas por los mejores, las enormes arrugas espaciales de la implacable gravedad pueden verdaderamente y teÃ³ricamente, sin violar de forma absurda ni por asomo ninguna letal y sagrada ley fundamental e inquebrantable fÃ­sica establecida portar y transportar velozmente inmensos y variados paquetes de la informaciÃ³n matemÃ¡tica pura desde las galaxias lejanÃ­simas hacia nosotros, revelÃ¡ndonos de manera fiel algÃºn secreto antiguo inexplorado.',
      'En el abrumador desenlace final climÃ¡tico de la cinta espectacular, la lejana e imposible comunicaciÃ³n entre la extraÃ±a dimensiÃ³n y la oscura tierra no es telepatÃ­a mÃ¡gica y fantasiosa. Cooper transmite su mensaje desesperado mediante eficaces y precisas anomalÃ­as gravitacionales finamente dirigidas a un antiguo reloj analÃ³gico terrenal, logrando dictar minuciosamente los esquemas cuÃ¡nticos completos de las entraÃ±as mÃ¡s oscuras e impenetrables del voraz agujero negro GargantÃºa, todo para que la joven e ingeniosa mujer y eminente cientÃ­fica Murph complete la fÃ³rmula final y pueda al fin resolver el enigmÃ¡tico problema que salvarÃ¡ la diezmada raza humana.',
    ],
    expandables: [
      { label: 'En la PelÃ­cula', icon: 'zap', text: 'Para acentuar inmensamente la asombrosa realidad dramÃ¡tica humana de que la frÃ¡gil vida en nuestro amado universo no es meramente biologÃ­a inerte, el propio astronauta protagonista repite firmemente que el inmenso amor paterno filial verdadero y la conexiÃ³n existencial es la Ãºnica, verdadera e invencible cosa capaz de cruzar valientemente y sin desvanecerse en el terrible abismo inabarcable todo el complejo enjambre laberÃ­ntico de las impenetrables dimensiones temporales que nos alejan fÃ­sica y materialmente con crueldad a todos de los seres queridos.' },
      { label: 'Â¿SabÃ­as que...?', icon: 'clock', text: 'Para traducir y asimilar de forma tÃ©cnica y racional la hermosa pero poÃ©tica comunicaciÃ³n gravitacional y misteriosa pentadimensional que desafÃ­a enormemente a la mente humana, piensa que de manera exacta y similar a como nuestro revolucionario internet veloz transmite complejos mensajes en cÃ³digo ordenado a travÃ©s de invisibles microondas fotÃ³nicas que parpadean rÃ¡pidamente por el enorme cielo oscuro y frÃ­o espacial; la colosal onda de masa distorsionada ondulatoria gravitatoria tambiÃ©n puede teÃ³ricamente llegar a transportar rigurosamente codificada en sus pulsos un inmenso y vital acervo de conocimiento estelar innegable.' },
    ],
    fact: 'DespuÃ©s del exitosÃ­simo lanzamiento comercial global y del asombroso estreno apoteÃ³sico de la aclamada obra audiovisual impecable del ingenioso Nolan, numerosos e importantes, reputados e internacionalmente conocidos cientÃ­ficos renombrados confesaron su enorme admiraciÃ³n asombrosa. Destacaron fuertemente que visualizar a un ser tridimensional utilizando creativamente y audazmente incontrolables ondas de choque gravitacionales pentadimensionales saltando entre vastos y extraÃ±os universos paralelos invisibles para comunicarse remotamente mediante perturbaciones analÃ³gicas es la premisa astrofÃ­sica narrativa mÃ¡s brillante y arriesgada de la ciencia ficciÃ³n moderna.',
  },
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
          const colors = ['#7C4DFF','#4FC3F7','#FF6B35','#AB47BC','#FF9800','#F44336','#26A69A'];
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
        <text x="300" y="80" textAnchor="middle" fill="#FF6B35" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">EL TESERACTO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(79,195,247,0.8)" fontSize="11" fontFamily="monospace" letterSpacing="2">Y LA QUINTA DIMENSIÃ“N</text>
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
          layoutId="activeDotInterstellarM5"
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
        whileHover={{ backgroundColor: `${color}15` }}
        style={{
          width: '100%',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: `${color}20`,
            padding: '0.4rem',
            borderRadius: '8px',
            color: color
          }}>
            <IconComp size={18} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.5px' }}>{item.label}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={18} color={color} />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dirVariants[dir]}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            style={{
              padding: '0 1.25rem 1.25rem 1.25rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.7,
              fontSize: '0.92rem',
            }}
          >
            <div style={{
              paddingTop: '1rem',
              borderTop: `1px solid ${color}15`
            }}>
              {item.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// â”€â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function InteractiveInfographic_InterstellarM5() {
  const [activeNodeId, setActiveNodeId] = useState(INFOGRAPHIC_NODES[0].id);
  const [isChanging, setIsChanging] = useState(false);
  const contentRef = useRef(null);
  
  // Lightbox state
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const activeNode = useMemo(() => INFOGRAPHIC_NODES.find(n => n.id === activeNodeId), [activeNodeId]);
  const activeDeco = DECO_MAP[activeNode.id] || [DecoBlackHole, DecoSpacetimeGrid, DecoOrbit];
  const DecoA = activeDeco[0];
  const DecoB = activeDeco[1];

  const handleNodeChange = (id) => {
    if (id === activeNodeId) return;
    setIsChanging(true);
    setTimeout(() => {
      setActiveNodeId(id);
      setIsChanging(false);
      if (contentRef.current) {
        contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0a0c1e', // Deep space black base
      color: '#fff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <InterstellarBackground />
      
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 1, padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
        <InterstellarHeader />

        {/* Navigation Nodes */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.5rem',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 2,
        }}>
          {INFOGRAPHIC_NODES.map((node, i) => (
            <NodeButton
              key={node.id}
              node={node}
              isActive={node.id === activeNodeId}
              onClick={() => handleNodeChange(node.id)}
              index={i}
            />
          ))}
        </div>

        {/* Main Content Panel */}
        <div style={{
          background: 'rgba(10, 12, 30, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: `1px solid ${activeNode.color}30`,
          boxShadow: `0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)`,
          overflow: 'hidden',
          position: 'relative',
          transition: 'border-color 0.5s',
        }}>
          {/* Subtle top glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: `linear-gradient(90deg, transparent, ${activeNode.color}, transparent)`,
            opacity: 0.6
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '280px', // hero layout min height
          }}>
            {/* Hero Image Section */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              height: '100%',
              minHeight: '280px',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.image}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeNode.image}
                    alt={activeNode.title}
                    onClick={() => setLightboxSrc(activeNode.image)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer', // Lightbox rule
                    }}
                  />
                  {/* Inner shadow over image */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(10,12,30,0.9) 0%, transparent 30%, transparent 70%, rgba(10,12,30,0.4) 100%)',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,12,30,1) 0%, transparent 40%)',
                    pointerEvents: 'none'
                  }} />
                </motion.div>
              </AnimatePresence>

              {/* Decorative SVGs over image */}
              <div style={{ position: 'absolute', top: '10%', right: '10%' }}>
                <DecoA color={activeNode.color} size={100} />
              </div>
              <div style={{ position: 'absolute', bottom: '15%', left: '10%' }}>
                <DecoB color={activeNode.color} size={80} />
              </div>
            </div>

            {/* Text Content Section */}
            <div
              ref={contentRef}
              style={{
                padding: '2.5rem',
                maxHeight: '70vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: `${activeNode.color}40 transparent`,
                position: 'relative',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={activeNode.btnImage} 
                      alt="avatar" 
                      onClick={() => setLightboxSrc(activeNode.btnImage)}
                      style={{ 
                        width: '40px', height: '40px', 
                        borderRadius: '50%', 
                        border: `2px solid ${activeNode.color}`,
                        cursor: 'pointer',
                        objectFit: 'cover'
                      }} 
                    />
                    <h2 style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      margin: 0,
                      color: activeNode.color,
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                      fontFamily: 'Georgia, serif',
                      letterSpacing: '1px'
                    }}>
                      {activeNode.title}
                    </h2>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '1.2rem',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '1.05rem',
                    lineHeight: 1.7,
                    textShadow: '0 1px 2px rgba(0,0,0,0.8)'
                  }}>
                    {activeNode.content.map((para, idx) => (
                      <p key={idx} style={{ margin: 0 }}>
                        {idx === 0 && (
                          <span style={{ 
                            color: activeNode.color, 
                            fontSize: '1.4em', 
                            lineHeight: 1, 
                            fontWeight: 'bold', 
                            marginRight: '4px' 
                          }}>
                            {para.charAt(0)}
                          </span>
                        )}
                        {idx === 0 ? para.slice(1) : para}
                      </p>
                    ))}
                  </div>

                  {/* Fact Box */}
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: `linear-gradient(to right, ${activeNode.color}15, transparent)`,
                    borderLeft: `4px solid ${activeNode.color}`,
                    borderRadius: '0 12px 12px 0',
                    display: 'flex',
                    gap: '1rem',
                  }}>
                    <Star style={{ color: activeNode.color, flexShrink: 0, marginTop: '4px' }} size={24} />
                    <p style={{ 
                      margin: 0, 
                      fontSize: '0.95rem', 
                      lineHeight: 1.6, 
                      color: 'rgba(255,255,255,0.85)',
                      fontStyle: 'italic'
                    }}>
                      {activeNode.fact}
                    </p>
                  </div>

                  {/* Expandables */}
                  <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {activeNode.expandables.map((exp, idx) => (
                      <ExpandableSection key={idx} item={exp} color={activeNode.color} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bibliography Footer */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          zIndex: 2,
        }}>
          <h3 style={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            paddingBottom: '0.5rem'
          }}>
            ðŸ“š Fuentes y Referencias
          </h3>
          <div style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem'
          }}>
            <ul style={{
              margin: 0,
              paddingLeft: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              {BIBLIOGRAPHY.map((item, idx) => (
                <li key={idx} style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  listStyleType: 'disc'
                }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Lightbox Render */}
      {lightboxSrc && (
        <ImageLightbox
          src={lightboxSrc}
          alt="Vista ampliada"
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </div>
  );
}
