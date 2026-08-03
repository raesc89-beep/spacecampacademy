'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

// ─── SVG Decorative Elements (Hot Jupiters & Super-Earths themed) ───────────
function DecoHotJupiter({ size = 70, color = '#FF9100', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
      <circle cx="30" cy="30" r="13" fill={color} opacity="0.7" />
      <path d="M 12 30 Q 30 22 48 30" stroke="#FF5252" strokeWidth="2" fill="none" />
      <path d="M 14 36 Q 30 30 46 36" stroke="#FFD740" strokeWidth="1.5" fill="none" />
      <circle cx="8" cy="18" r="2" fill="#FF5252" />
      <line x1="12" y1="18" x2="20" y2="24" stroke="#FF5252" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

function DecoMigration({ size = 70, color = '#64FFDA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <path d="M 10 30 C 15 10, 45 10, 50 30 C 45 50, 15 50, 20 30" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="30" cy="30" r="6" fill="#FFD740" />
      <circle cx="45" cy="22" r="3" fill={color} />
      <path d="M 42 24 L 32 27" stroke={color} strokeWidth="1.5" markerEnd="url(#arrow)" />
    </svg>
  );
}

function DecoSuperEarth({ size = 70, color = '#00E5FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 18 25 Q 25 18 35 22 T 42 35" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <path d="M 20 38 Q 30 42 38 36" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="30" cy="30" r="23" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
    </svg>
  );
}

function DecoOceanWorld({ size = 70, color = '#448AFF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="2" />
      <path d="M 14 26 Q 22 20 30 26 T 46 26" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M 14 34 Q 22 28 30 34 T 46 34" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="8" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoRedDwarf({ size = 70, color = '#FF5252', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="14" fill={color} opacity="0.7" />
      <path d="M 30 10 L 30 5 M 30 50 L 30 55 M 10 30 L 5 30 M 50 30 L 55 30" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 16 16 L 12 12 M 44 44 L 48 48 M 44 16 L 48 12 M 16 44 L 12 48" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="48" cy="22" r="2.5" fill="#00E5FF" />
    </svg>
  );
}

function DecoIronCore({ size = 70, color = '#B388FF', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.25, ...style }}>
      <circle cx="30" cy="30" r="20" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="13" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="30" cy="30" r="7" fill={color} />
    </svg>
  );
}

const DECO_MAP = {
  'jupiteres-calientes': [DecoHotJupiter, DecoRedDwarf, DecoMigration],
  'migracion-planetaria': [DecoMigration, DecoHotJupiter, DecoSuperEarth],
  'supertierras': [DecoSuperEarth, DecoIronCore, DecoOceanWorld],
  'planetas-oceano': [DecoOceanWorld, DecoSuperEarth, DecoHotJupiter],
  'enanos-rojos': [DecoRedDwarf, DecoSuperEarth, DecoMigration],
  'planetas-ultra-densos': [DecoIronCore, DecoHotJupiter, DecoRedDwarf],
  'diversidad-zooloogica': [DecoSuperEarth, DecoMigration, DecoOceanWorld],
};

const BIBLIOGRAPHY = [
  'Lin, D. N. C., Bodenheimer, P., & Richardson, D. C. (1996). "Orbital migration of short-period planets", Nature, 380(6575), 606-607.',
  'Rivera, E. J. et al. (2005). "A 7.5 Earth-Mass Planet Orbiting the Nearby M Dwarf GJ 876", The Astrophysical Journal, 634(1), 625-640.',
  'Léger, A. et al. (2004). "A new family of planets? Ocean-planets", Icarus, 169(2), 499-504.',
  'Rogers, L. A. (2015). "Most 1.6 Earth-radius Planets are Not Rocky", The Astrophysical Journal, 801(1), 41.',
  'Winn, J. N., & Fabrycky, D. C. (2015). "The Occurrence and Architecture of Exoplanetary Systems", Annual Review of Astronomy and Astrophysics, 53, 409-447.'
];

const INFOGRAPHIC_NODES = [
  {
    id: 'jupiteres-calientes',
    title: 'Júpiteres Calientes',
    color: '#FF9100',
    btnImage: '/assets/exoplanetas/infographic_m2/btn_jupiteres-calientes.jpg',
    image: '/assets/exoplanetas/infographic_m2/hero_jupiteres-calientes.jpg',
    content: [
      'Un Júpiter caliente es un gigante de gas comparable en tamaño al mayor planeta de nuestro Sistema Solar, pero con una diferencia extrema: orbita absurdamente cerca de su estrella madre. Imagina tomar a nuestro gigante Júpiter y trasladarlo desde su ubicación fría original hasta situarlo a solo unos pocos millones de kilómetros del Sol. Estaría veinte veces más cerca de la estrella que la propia Tierra. Su año entero duraría menos de tres días terrestres completos.',
      'A esa distancia tan corta, la radiación estelar abrasadora calienta la atmósfera superior del planeta hasta alcanzar temperaturas brutales que superan los mil quinientos grados Celsius. Este calor infernal provoca que el gas hidrógeno y helio de la atmósfera se expanda drásticamente, haciendo que el planeta se hinche como un globo de aire caliente. Algunos Júpiteres calientes tienen densidades tan bajas que flotarían perfectamente si existiera un océano de agua lo suficientemente grande.',
      'Debido a la fuerza gravitacional estelar a tan corta distancia, estos planetas sufren un fenómeno denominado acoplamiento de marea. Esto significa que el planeta gira sobre su propio eje al mismo ritmo exacto que tarda en dar una vuelta alrededor de la estrella. En consecuencia, el planeta presenta siempre la misma cara hacia la estrella, manteniendo un hemisferio diurno en perpetuo verano hirviendo y un hemisferio nocturno sumido en una noche helada interminable.',
      'El contraste térmico colosal entre la cara diurna y la cara nocturna desencadena vientos atmosféricos globales con velocidades astronómicas. Los superhuracanes en un Júpiter caliente alcanzan más de ocho mil kilómetros por hora, transportando el calor del día hacia la noche. En esas atmósferas exóticas no llueve agua pura, sino que se forman nubes compuestas de silicatos líquidos, corindón o gotas de hierro derretido flotando entre la tempestad.',
      'Además, la radiación ultravioleta extrema de la estrella evapora lentamente las capas superiores de la atmósfera planetaria. Este gas caliente escapa al espacio interplanetario formando una gigantesca cola semejante a la de un cometa. El hallazgo de los primeros Júpiteres calientes sacudió los cimientos de la astrofísica porque nuestras teorías antiguas afirmaban que los planetas gigantes únicamente podían existir en las regiones frías exteriores.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El exoplaneta WASP-76b es un Júpiter caliente extremo donde la temperatura diurna supera los dos mil cuatrocientos grados Celsius. A esa temperatura extrema, las rocas y los metales se evaporan por completo en la cara iluminada y soplan hacia la cara nocturna más fría, donde se condensan y caen en forma de lluvia de hierro líquido.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El primer exoplaneta descubierto alrededor de una estrella similar al Sol, 51 Pegasi b, pertenece a la categoría de Júpiteres Calientes. Posee una masa mínima equivalente a la mitad de Júpiter y orbita a tan solo 7.8 millones de kilómetros de su estrella, completando un año en solo 4.2 días terrestres.' }
    ],
    fact: 'El exoplaneta KELT-9b es el Júpiter caliente más ardiente jamás descubierto, con una temperatura diurna de 4,300 grados Celsius. Es más caliente que la mayoría de las estrellas enanas rojas del universo, lo que provoca que las moléculas de su atmósfera se descompongan continuamente en sus átomos individuales.'
  },
  {
    id: 'migracion-planetaria',
    title: 'Migración Planetaria',
    color: '#64FFDA',
    btnImage: '/assets/exoplanetas/infographic_m2/btn_migracion-planetaria.jpg',
    image: '/assets/exoplanetas/infographic_m2/hero_migracion-planetaria.jpg',
    content: [
      'Durante décadas, los modelos de formación planetaria asumían que los planetas permanecían para siempre en la misma órbita donde nacieron. Sin embargo, la existencia de los Júpiteres calientes demostró que esa hipótesis era incorrecta. Las leyes de la química física demuestran que los gigantes gaseosos no pueden acumular su enorme volumen cerca de una estrella, porque el calor estelar evapora el gas antes de que pueda condensarse. Tuvieron que nacer lejos.',
      'El proceso por el cual un planeta cambia drásticamente su distancia a la estrella se denomina migración planetaria. Imagina un embotellamiento de tráfico en un remolino de agua. Cuando un sistema planetario es joven, la estrella está rodeada por un denso disco protoplanetario compuesto de gas y polvo acumulado. Cuando un planeta gigante se forma en las regiones exteriores frías, crea ondas de gravedad que se propagan por todo el disco estelar.',
      'Estas ondas gravitacionales generan fricción y transferencia de momento angular entre el planeta y el gas circundante. Al perder energía gravitacional por el rozamiento dinámico con el disco, el planeta empieza a frenar su velocidad orbital. Como consecuencia de este frenado constante, el planeta gigante comienza a espiralar lentamente hacia el interior del sistema, acercándose peligrosamente a la estrella central en una deriva que dura millones de años.',
      'Existen dos tipos principales de migración planetaria en el desarrollo cósmico. La migración Tipo I ocurre con planetas pequeños de masa terrestre que no abren un hueco en el disco y se desplazan rápidamente. La migración Tipo II ocurre con planetas masivos que limpian una brecha anular completa en el disco gaseoso y se mueven acoplados al ritmo de evolución lenta de la materia protoplanetaria.',
      'Alternativamente, la migración puede ser causada por encuentros gravitacionales violentos entre varios planetas gigantes en sistemas caóticos. Si dos planetas masivos se acercan demasiado, la gravedad de uno puede catapultar al otro fuera del sistema, mientras que el sobreviviente queda lanzado en una órbita muy elíptica que terminará circularizándose cerca de la estrella. La migración planetaria demuestra que los sistemas planetarios son dinámicos y cambiantes.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En nuestro propio Sistema Solar existió un evento de migración planetaria conocido como la Gran Tacha o el Modelo de Niza. Júpiter migró hacia el interior del sistema hasta llegar a la posición actual de Marte, pero la atracción gravitacional de Saturno lo frenó y lo volvió a tirar hacia afuera, salvando a la Tierra de ser tragada por el Sol.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La interacción de marea entre el planeta migratorio y la estrella hospedera finalmente detiene la migración cuando el planeta llega muy cerca de la estrella. Sin embargo, si la migración no se frena a tiempo, el planeta cruzará el límite de Roche y será despedazado por las fuerzas de marea estelares.' }
    ],
    fact: 'La teoría de la migración planetaria Tipo II predice que por cada Júpiter caliente que logra frenar exitosamente cerca de su estrella, varios planetas más pequeños fueron empujados e incinerados dentro de la estrella durante la fase caótica de formación del disco.'
  },
  {
    id: 'supertierras',
    title: 'Supertierras y Subneptunos',
    color: '#00E5FF',
    btnImage: '/assets/exoplanetas/infographic_m2/btn_supertierras.jpg',
    image: '/assets/exoplanetas/infographic_m2/hero_supertierras.jpg',
    content: [
      'Una Supertierra es una categoría exoplanetaria que designa a aquellos mundos que tienen una masa mayor que la Tierra pero significativamente menor que Neptuno. Específicamente, abarcan masas situadas entre dos y diez veces la masa terrestre. Lo más sorprendente de estas familias planetarias es que no existe ningún ejemplo de Supertierra en nuestro Sistema Solar, lo que nos deja sin un modelo cercano para estudiarlas directamente.',
      'Los censos fotométricos realizados por los telescopios espaciales han revelado una verdad asombrosa: las Supertierras y los Subneptunos son la clase de planetas más abundante y común en toda la galaxia Vía Láctea. A pesar de que nuestro Sistema Solar saltó abruptamente de la Tierra rocosa al helado Neptuno sin nada en medio, el resto del universo está repleto de estos mundos de tamaño intermedio.',
      'Existe una clara división física conocida como la brecha de radio de Fulton entre las Supertierras rocosas y los Subneptunos gaseosos. Los planetas con radios inferiores a 1.6 veces el radio terrestre tienden a ser mundos sólidos formados por silicatos y metales con atmósferas delgadas. En cambio, los planetas con radios entre 1.6 y 3 veces el radio terrestre suelen conservar gruesas capas de hidrógeno y helio gaseoso.',
      'Las Supertierras rocosas poseen una gravedad en superficie sensiblemente superior a la de nuestro planeta. Esta fuerte atracción gravitacional les permite retener atmósferas más densas y protegerse contra la evaporación inducida por la radiación estelar. Además, la alta energía térmica atrapada en sus mantos rocosos masivos podría mantener una actividad tectónica y vulcanismo duradero por miles de millones de años.',
      'Estudiar las Supertierras representa uno de los mayores desafíos y prioridades de la astrobiología actual. Debido a su tamaño moderado y su abundancia en la galaxia, muchas Supertierras orbitan dentro de las zonas habitables de sus estrellas. Determinar cuáles de ellas poseen superficies sólidas con agua líquida y cuáles son minigasosos inhabitables es crucial para estimar la frecuencia de la vida cósmica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El exoplaneta 55 Cancri e es una Supertierra rocosa extrema con el doble del tamaño de la Tierra y ocho veces su masa. Orbita tan pegado a su estrella que su superficie está compuesta por un océano de lava derretida a más de dos mil grados Celsius, e investigaciones sugieren que su manto interno podría ser rico en diamante puro.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La brecha de radio de Fulton demuestra la evaporación fotoquímica. Los planetas que nacieron con masa intermedia cerca de su estrella perdieron por completo su capa de gas debido al viento estelar violento, quedando reducidos a núcleos rocosos desnudos (Supertierras), mientras que los más alejados conservaron su gas (Subneptunos).' }
    ],
    fact: 'El exoplaneta GJ 1214 b es el Subneptuno prototípico más estudiado por los científicos. Con 2.7 radios terrestres, las observaciones espectroscópicas con el James Webb sugieren que posee una atmósfera espesa rica en agua en forma de vapor súper denso o brumas compuestas de aerosol orgánico.'
  },
  {
    id: 'planetas-oceano',
    title: 'Mundos Oceánicos',
    color: '#448AFF',
    btnImage: '/assets/exoplanetas/infographic_m2/btn_planetas-oceano.jpg',
    image: '/assets/exoplanetas/infographic_m2/hero_planetas-oceano.jpg',
    content: [
      'Un mundo océano o planeta hídrico es un exoplaneta teórico y observationalmente sugerido cuya masa está compuesta en una fracción enorme por agua pura o hielos volátiles. En la Tierra, aunque los océanos cubren tres cuartas partes de la superficie, representan apenas el cero punto cero dos por ciento de la masa total del planeta. En un verdadero planeta océano, el agua puede constituir entre el diez y el cincuenta por ciento de toda la masa planetaria.',
      'Imagina un mundo donde no existe ni un solo continente ni isla de roca sobre la superficie. Toda la esfera planetaria está cubierta por un océano ininterrumpido de cientos o miles de kilómetros de profundidad. En la parte superior de esta masa líquida, olas gigantescas se desplazan bajo atmósferas ricas en vapor. Sin embargo, las condiciones en las profundidades de estos mares son extrañas para la física cotidiana.',
      'A medida que descendemos en la columna de agua de un planeta océano, la presión hidrostática se vuelve tan aplastante que el agua cambia de fase molecular. En el fondo del mar, el agua no se mantiene líquida ni se convierte en hielo convencional. Las fuerzas de presión comprimen las moléculas de agua para formar hielos exóticos de alta densidad conocidos como Hielo V, Hielo VI y Hielo VII, que permanecen sólidos incluso a temperaturas calientes.',
      'Este manto de hielo exótico de alta presión en el fondo marino crea una barrera física infranqueable entre el océano líquido y el núcleo rocoso inferior. En la Tierra, la vida marina depende de los minerales y nutrientes que se disuelven mediante el contacto directo entre el agua y las rocas de las fuentes hidrotermales. En un mundo océano espeso, la falta de contacto directo rocoso podría limitar la disponibilidad de elementos nutricionales.',
      'Los astrofísicos utilizan modelos de densidad obtenidos mediante la combinación de masa y radio para identificar a estos candidatos oceánicos. Si un planeta tiene la masa de tres Tierras pero un volumen desproporcionadamente grande que no coincide con la densidad del hierro ni con la del gas hidrógeno, la única explicación física plausible es una capa colosal de agua rodeando la estructura rocosa.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los planetas oceánicos probablemente nacieron como cuerpos helados muy lejos de su estrella, más allá de la "línea de nieve" del sistema protoplanetario. Posteriormente, migraron hacia el interior del sistema donde el calor estelar derritió los hielos de la superficie, transformándolos en mundos totalmente líquidos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Hielo VII es una forma cristalina de agua sólida que se forma únicamente a presiones superiores a tres Gigapascales (unas treinta mil veces la presión atmosférica terrestre). Es tan estable y denso que su estructura cristalina cúbica se mantiene sólida a temperaturas superiores a los trescientos grados Celsius.' }
    ],
    fact: 'Descubrimientos recientes con el telescopio espacial JWST sugieren que el exoplaneta TOI-1452 b, ubicado a 100 años luz de la Tierra, es uno de los mejores candidatos a planeta océano conocidos, con un radio 1.67 veces el de la Tierra y una densidad consistente con un inmenso mar global.'
  },
  {
    id: 'enanos-rojos',
    title: 'Planetas en Enanas Rojas',
    color: '#FF5252',
    btnImage: '/assets/exoplanetas/infographic_m2/btn_enanos-rojos.jpg',
    image: '/assets/exoplanetas/infographic_m2/hero_enanos-rojos.jpg',
    content: [
      'Las estrellas enanas rojas (también llamadas estrellas tipo M) son las estrellas más diminutas, frías y abundantes del universo. Constituyen más del setenta y cinco por ciento de todas las estrellas que habitan en la Vía Láctea. A diferencia de nuestro Sol brillante de color amarillo, las enanas rojas arden muy despacio y pueden vivir durante billones de años. Por esta razón, la gran mayoría de los exoplanetas descubiertos orbitan alrededor de estas pequeñas estrellas rojas.',
      'Dado que una enana roja emite apenas una pequeña fracción de la luz y el calor del Sol, su zona habitable se encuentra extremadamente cerca de la superficie estelar. Para que un exoplaneta reciba la cantidad adecuada de calor para mantener agua líquida alrededor de una enana roja, debe orbitar a distancias muy cortas, a menudo completando un año entero en pocos días o semanas terrestres.',
      'Estar tan cerca de la estrella principal impone condiciones ambientales extremas para cualquier planeta rocoso. Las enanas rojas jóvenes son notoriamente violentas y propensas a emitir poderosas llamaradas estelares y eyecciones de masa coronal. Estas explosiones magnéticas liberan rayos X y radiación ultravioleta miles de veces más intensos que los del Sol, lo que puede erosionar la atmósfera del planeta y esterilizar su superficie.',
      'Además, la cercanía física provoca un acoplamiento de marea gravitacional permanente. El planeta rocoso queda bloqueado mostrando siempre el mismo lado a la enana roja. El hemisferio iluminado soporta un mediodía eterno con luz roja constante, mientras que el hemisferio opuesto permanece congelado en la oscuridad perpetua. Las corrientes de aire atmosféricas deben redistribuir eficazmente el calor para evitar el colapso del aire.',
      'A pesar de estos desafíos climáticos severos, los planetas en enanas rojas ofrecen la mejor oportunidad inmediata para detectar atmósferas y signos de vida. Como la estrella es pequeña, el planeta bloquea una porción mayor de su luz durante el tránsito, haciendo que las observaciones espectroscópicas con telescopios como el JWST sean mucho más claras y fáciles de analizar que en estrellas gigantes.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Nuestra estrella vecina más cercana, Proxima Centauri, es una enana roja ubicada a 4.24 años luz. Posee al menos un planeta confirmado de masa terrestre, Proxima Centauri b, que orbita dentro de su zona habitable cada 11.2 días, convirtiéndolo en el candidato exoplanetario más cercano a la humanidad.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las enanas rojas consumen su combustible de hidrógeno tan lentamente que se calcula que su esperanza de vida abarca entre cien mil millones y varios billones de años. Esto significa que ninguna enana roja nacida desde el Big Bang ha muerto jamás, otorgando a sus planetas tiempo casi infinito para el desarrollo biológico.' }
    ],
    fact: 'El modelo climático denominado "Planeta Ojo de Buey" (Eyeball Earth) sugiere que una Supertierra en acoplamiento de marea alrededor de una enana roja tendría toda su cara nocturna congelada en hielo sólido y su cara diurna central con un gran océano líquido circular abierto como una pupila.'
  },
  {
    id: 'planetas-ultra-densos',
    title: 'Núcleos Expuestos y Metales',
    color: '#B388FF',
    btnImage: '/assets/exoplanetas/infographic_m2/btn_planetas-ultra-densos.jpg',
    image: '/assets/exoplanetas/infographic_m2/hero_planetas-ultra-densos.jpg',
    content: [
      'Entre la exótica zoología de exoplanetas descubiertos existen mundos con densidades tan anormalmente altas que desafían los modelos simples. Estos son los planetas de núcleos metálicos expuestos y mundos ultra densos. Imagina un planeta del tamaño de la Tierra pero con una masa tres o cuatro veces superior, compuesto casi por entero de hierro y níquel macizo, carente por completo de rocas ligeras o manto de silicatos.',
      '¿Cómo se forma un planeta de hierro puro? La explicación principal radica en cataclismos de colisión a gran escala durante la juventud del sistema estelar. Cuando dos grandes protoplanetas rocosos ya diferenciados colisionan de frente a velocidades extremas, el impacto brutal puede arrancar e incinerar todo el manto rocoso exterior de silicio, dejando desnudo únicamente el pesado núcleo metálico interior.',
      'Otra vía de formación para estos mundos ultra densos es el proceso denominado fotoevaporación extrema o desnudamiento por marea. Si un planeta gigante gaseoso o un Neptuno caliente se acerca demasiado a su estrella, la intensa radiación térmica y las fuerzas de marea estelares pueden barrer por completo la envoltura de gas y manto volatilizado, dejando expuesto el corazón denso del planeta en una órbita abrasadora.',
      'Un ejemplo fascinante es el exoplaneta K2-229b, un mundo que posee un radio similar a la Tierra pero una densidad de casi nueve gramos por centímetro cúbico, muy superior a la terrestre (5.5 g/cm³). Este planeta es considerado un "Super-Mercurio", compartiendo la característica de Mercurio en nuestro Sistema Solar de poseer un núcleo de hierro gigantesco que ocupa más del setenta por ciento de su volumen total.',
      'El estudio de estos núcleos metálicos expuestos ofrece a los astrofísicos un laboratorio geológico incomparable. Al observar la luz reflejada por las superficies desnudas y las atmósferas de vapor metálico de estos mundos, los científicos pueden analizar directamente la composición interna pura de los núcleos planetarios, algo que en la Tierra es físicamente imposible de alcanzar por perforación.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El planeta TOI-849b es uno de los objetos más extraños del universo: tiene el radio de Neptuno pero una masa equivalente a 40 veces la de la Tierra. Su densidad es idéntica a la del hierro puro. Los astrofísicos creen que es el núcleo desnudado de un gigante gaseoso que perdió todo su gas hidrógeno por evaporación o colisión masiva.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los planetas ultra densos que orbitan a corta distancia de sus estrellas experimentan campos magnéticos inducidos extremos. La interacción entre el núcleo de hierro conductor y el plasma del viento estelar puede generar corrientes eléctricas de billones de amperios atravesando la estructura planetaria.' }
    ],
    fact: 'El estudio del exoplaneta TOI-733 b sugiere que se encuentra justo en la frontera de la pérdida atmosférica total, representando una transición viva donde un Subneptuno gaseoso se está evaporando para convertirse en un núcleo rocoso metálico desnudado.'
  },
  {
    id: 'diversidad-zooloogica',
    title: 'La Zoo-Diversidad Exoplanetaria',
    color: '#FFD740',
    btnImage: '/assets/exoplanetas/infographic_m2/btn_diversidad-zooloogica.jpg',
    image: '/assets/exoplanetas/infographic_m2/hero_diversidad-zooloogica.jpg',
    content: [
      'Al estudiar los miles de exoplanetas confirmados hasta la fecha, la lección científica más importante es que la naturaleza posee una imaginación mucho más rica que nuestras teorías tradicionales. Durante siglos asumimos que todos los sistemas planetarios debían organizarse como el nuestro: pequeños planetas rocosos cerca del Sol y gigantes de gas helado ordenados pacíficamente en las afueras.',
      'La realidad observacional ha demostrado que nuestro Sistema Solar es solo una arquitectura entre muchas posibles, e incluso podría no ser el tipo de sistema más común en el universo. Encontramos sistemas planetarios compactos donde cinco o seis planetas están apretados dentro de una distancia menor que la órbita de Mercurio, moviéndose en resonancias armónicas matemáticamente perfectas.',
      'También descubrimos planetas errantes o nómadas que no están atados a ninguna estrella. Estos mundos solitarios vagan por la oscuridad interestelar de la galaxia tras haber sido expulsados de sus hogares de origen por tirones gravitacionales violentos durante la formación del sistema. Se calcula que podrían existir miles de millones de estos planetas huérfanos flotando entre las estrellas.',
      'La clasificación moderna de la zoo-diversidad planetaria incluye Júpiteres Calientes, Júpiteres Fríos, Neptunos Calientes, Subneptunos, Supertierras Ricos en Agua, Planetas de Hierro y Mundos Terrestres en Enanas Rojas. Cada categoría presenta desafíos únicos para las leyes de la termodinámica, la geología comparada y la física de atmósferas alienígenas.',
      'Esta inmensa variedad de estructuras planetarias nos demuestra que los procesos de acreción de polvo, migración de discos y evolución atmosférica pueden tomar caminos infinitos. Al comprender la zoo-diversidad de exoplanetas, los científicos obtienen el marco de referencia necesario para responder a la pregunta fundamental de la humanidad: si la Tierra es un oasis común o una joya rarísima en el cosmos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Existen planetas circumbinarios que orbitan alrededor de dos estrellas al mismo tiempo, exactamente como el planeta ficticio Tatooine de la saga Star Wars. El primer planeta circumbinario confirmado por el telescopio espacial Kepler fue Kepler-16b, un mundo donde cada tarde se observan dos puestas de sol diferentes en el horizonte.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las resonancias orbitales armónicas ocurren cuando los periodos orbitales de varios planetas forman proporciones de números enteros simples como 2:1, 3:2 o 4:3. En el sistema HD 110067, seis exoplanetas dan vueltas alrededor de su estrella en una danza gravitacional sincronizada que no se ha interrumpido en cuatro mil millones de años.' }
    ],
    fact: 'El proyecto Microlensing Observations in Astrophysics (MOA) estima que existen estadísticamente más planetas flotantes nómadas sin estrella fija en la Vía Láctea que la cantidad total de estrellas individuales que componen nuestra galaxia.'
  }
];

export default function InteractiveInfographic_ExoplanetasM2() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(20,10,28,0.92) 0%, rgba(30,12,38,0.88) 40%, rgba(12,6,24,0.95) 100%)',
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
      <TemporalFieldCanvas />
      <ExoplanetasHeaderM2 />
      
      {/* Progress Bar */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', margin: '1.5rem 0 1rem', padding: '0 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
          <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${(explored.size / INFOGRAPHIC_NODES.length) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FF9100, #64FFDA)',
              borderRadius: '3px',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', fontWeight: 600 }}>
            Módulos explorados: {explored.size}/{INFOGRAPHIC_NODES.length}
          </span>
        </div>
      </div>

      {/* Top Node Selector Carousel */}
      <div style={{
        position: 'relative', zIndex: 2, display: 'flex', flexWrap: 'wrap',
        justifyContent: 'center', gap: '1rem', marginTop: '0.5rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.35)', borderRadius: '20px',
        border: '1px solid rgba(255,145,0,0.2)',
        backdropFilter: 'blur(10px)'
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

      {/* Content Panel Area */}
      <div style={{ position: 'relative', zIndex: 3, flex: 1, marginTop: '1rem' }}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <ContentPanel key={activeData.id} node={activeData} onClose={() => setActiveNode(null)} setLightboxSrc={setLightboxSrc} />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', height: '100%', minHeight: '320px',
                color: 'rgba(255,255,255,0.5)', textAlign: 'center', gap: '1rem',
                padding: '2rem'
              }}
            >
              <Sparkles size={36} style={{ color: '#FF9100', opacity: 0.6 }} />
              <h3 style={{ margin: 0, color: '#FF9100', fontSize: '1.2rem', fontWeight: 700 }}>
                Explora Júpiteres Calientes y Supertierras
              </h3>
              <p style={{ fontSize: '0.92rem', maxWidth: '420px', lineHeight: 1.6, margin: 0, color: 'rgba(255,255,255,0.7)' }}>
                Haz clic en cualquiera de los 7 módulos superiores para descubrir la inmensa zoo-diversidad planetaria, desde mundos hirviendo que migran hacia su estrella hasta mundos océano y supertierras.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scientific Bibliography */}
      <div style={{
        position: 'relative', zIndex: 2, marginTop: '2rem',
        borderTop: '1px solid rgba(255,145,0,0.25)', paddingTop: '1.5rem',
      }}>
        <h4 style={{ fontSize: '0.8rem', color: '#FF9100', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem', textAlign: 'center', fontWeight: 700 }}>
          Referencias y Fuentes Académicas
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.8rem' }}>
          {BIBLIOGRAPHY.map((item, i) => (
            <div key={i} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, background: 'rgba(0,0,0,0.3)', padding: '0.8rem', borderRadius: '10px', borderLeft: '3px solid #FF9100' }}>
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

function TemporalFieldCanvas() {
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
      hue: Math.random() > 0.5 ? '255, 145, 0' : '100, 255, 218',
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.35;
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
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function ExoplanetasHeaderM2() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '0px' }}>
      <svg viewBox="0 0 600 120" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 12px rgba(255,145,0,0.4))' }}>
        <path d="M 40 100 Q 300 15, 560 100" fill="none" stroke="url(#exoGrad2)" strokeWidth="2.5" strokeLinecap="round" />
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 40 + t * 520;
          const cy = 100 - Math.sin(t * Math.PI) * 85;
          const colors = ['#FF9100','#64FFDA','#00E5FF','#448AFF','#FF5252','#B388FF','#FFD740'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.4, 1, 0.4], r: [3, 5.5, 3] }}
              transition={{ duration: 2.2 + i * 0.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        <circle cx="300" cy="18" r="12" fill="none" stroke="#FF9100" strokeWidth="1.5" opacity="0.7" />
        <circle cx="300" cy="18" r="3" fill="#FF5252" opacity="0.9" />
        <defs>
          <linearGradient id="exoGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,145,0,0.15)" />
            <stop offset="50%" stopColor="rgba(255,145,0,0.95)" />
            <stop offset="100%" stopColor="rgba(100,255,218,0.15)" />
          </linearGradient>
        </defs>
        <text x="300" y="68" textAnchor="middle" fill="#FF9100" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">JÚPITERES CALIENTES Y SUPERTIERRAS</text>
        <text x="300" y="88" textAnchor="middle" fill="rgba(100,255,218,0.85)" fontSize="10.5" fontFamily="monospace" letterSpacing="2">ZOO-DIVERSIDAD Y MIGRACIÓN PLANETARIA</text>
      </svg>
    </div>
  );
}

function NodeButton({ node, isActive, onClick, index }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 22 }}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.4rem',
        position: 'relative',
      }}
    >
      <div style={{
        width: '82px',
        height: '82px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: `3px solid ${isActive ? node.color : 'rgba(255,145,0,0.25)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}60, 0 0 35px ${node.color}25, inset 0 0 12px ${node.color}40`
          : '0 4px 12px rgba(0,0,0,0.4)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        {isActive && (
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity }}
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
        color: isActive ? node.color : 'rgba(255,255,255,0.8)',
        fontSize: '0.76rem', fontWeight: 700, letterSpacing:'0.2px',
        textAlign: 'center',
        lineHeight: 1.25,
        transition: 'color 0.3s',
        maxWidth: '95px',
        textShadow: isActive ? `0 0 8px ${node.color}50` : 'none',
      }}>
        {node.title}
      </span>
      {isActive && (
        <motion.div
          layoutId="activeDotExoM2"
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
  up:    { hidden: { y: -25, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  down:  { hidden: { y: 25, opacity: 0 },  visible: { y: 0, opacity: 1 } },
  left:  { hidden: { x: -25, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: 25, opacity: 0 },  visible: { x: 0, opacity: 1 } },
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
      border: `1px solid ${color}30`,
      overflow: 'hidden',
      background: `linear-gradient(135deg, ${color}10, transparent)`,
    }}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: `${color}18` }}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '0.7rem',
          padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.92)',
        }}
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}
          style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <IconComp size={15} style={{ color }} />
        </motion.div>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color, letterSpacing: '0.5px', flex: 1, textAlign: 'left' }}>
          {item.label}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} style={{ color, opacity: 0.8 }} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div variants={dirVariants[dir]} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 28 }} style={{ padding: '0 1rem 1rem 1rem' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.88)', borderLeft: `3px solid ${color}40`, paddingLeft: '0.8rem' }}>
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
    { top: '6%', right: '-5px', rotate: 12 },
    { top: '48%', left: '-12px', rotate: -12 },
    { bottom: '10%', right: '10px', rotate: 18 },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.97 }} transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      style={{
        background: 'rgba(16, 10, 28, 0.94)', backdropFilter: 'blur(20px)', border: `1px solid ${node.color}40`, borderRadius: '24px',
        position: 'relative', zIndex: 3, marginTop: '1rem', overflow: 'hidden',
        boxShadow: `0 12px 40px rgba(0,0,0,0.5), 0 0 20px ${node.color}15`
      }}
    >
      <button onClick={onClose} style={{
        position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'rgba(0,0,0,0.7)', border: `1px solid ${node.color}50`,
        borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: node.color, transition: 'all 0.2s',
      }}>
        <X size={18} />
      </button>

      {/* Hero Grid 1fr 1fr */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', minHeight: '280px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: '100%', background: `linear-gradient(135deg, ${node.color}20, rgba(0,0,0,0.5))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.image}
            alt={node.title}
            onClick={() => setLightboxSrc(node.image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer', opacity: 0.9, minHeight: '280px' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(transparent, ${node.color}20)` }} />
        </div>
        <div style={{ padding: '2rem 2rem 1.5rem 1.5rem', position: 'relative' }}>
          {decoComponents[0] && (
            <div style={{ position: 'absolute', top: '12px', right: '55px', transform: 'rotate(15deg)', pointerEvents: 'none' }}>
              {decoComponents[0]({ size: 52, color: node.color })}
            </div>
          )}
          <h3 style={{ margin: '0 0 1rem', fontSize: '1.45rem', fontWeight: 800, color: node.color, letterSpacing:'-0.01em', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <span style={{ display: 'inline-flex', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${node.color}60`, flexShrink: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
            </span>
            {node.title}
          </h3>
          {node.content.slice(0, 2).map((para, i) => (
            <p key={i} style={{ margin: '0 0 0.9rem', fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Main Content Body */}
      <div style={{ padding: '1.5rem 2rem 2rem', position: 'relative' }}>
        {decoComponents.map((Deco, i) => {
          const pos = decoPositions[i] || {};
          return (
            <motion.div key={i} animate={{ y: [0, -7, 0], rotate: [pos.rotate || 0, (pos.rotate || 0) + 4, pos.rotate || 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none' }}
            >
              <Deco size={55 + i * 8} color={node.color} />
            </motion.div>
          );
        })}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem 2rem', position: 'relative', zIndex: 2 }}>
          {node.content.slice(2).map((para, i) => {
            const isWide = i === node.content.slice(2).length - 1 && (node.content.slice(2).length % 2 !== 0);
            return (
              <div key={i} style={{ gridColumn: isWide ? '1 / -1' : 'auto', background: 'rgba(255,255,255,0.025)', borderRadius: '14px', padding: '1.25rem', borderLeft: `3px solid ${node.color}40`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-9px', left: '14px', background: node.color, color: '#0A0618', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '8px', letterSpacing: '1px' }}>
                  {i === 0 ? 'CONCEPTO FEYNMAN' : i === 1 ? 'MECÁNICA FÍSICA' : 'EVOLUCIÓN CÓSMICA'}
                </div>
                <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: 1.72, color: 'rgba(255,255,255,0.88)' }}>
                  {para}
                </p>
              </div>
            );
          })}
        </div>

        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((exp, i) => (
              <div key={i} style={{ gridColumn: node.expandables.length === 1 ? '1 / -1' : 'auto' }}>
                <ExpandableSection item={exp} color={node.color} />
              </div>
            ))}
          </div>
        )}

        {node.fact && (
          <div style={{ marginTop: '1.5rem', padding: '1.2rem 1.4rem', background: `linear-gradient(90deg, ${node.color}18, transparent)`, borderRadius: '16px', border: `1px solid ${node.color}35`, display: 'flex', gap: '1rem', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: `${node.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={19} style={{ color: node.color }} />
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: node.color, letterSpacing:'2px', textTransform: 'uppercase' }}>
                Dato Científico Clave
              </span>
              <p style={{ margin: '0.3rem 0 0', fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', fontSize: '0.92rem', lineHeight: 1.68 }}>
                {node.fact}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
