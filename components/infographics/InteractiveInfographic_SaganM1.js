'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Carl Sagan / Cosmos themed) ————————————————
function DecoStar({ size = 70, color = '#E8A87C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Five-pointed star */}
      <path d="M30 5 L35.5 22 L53 22 L39 33 L44 50 L30 40 L16 50 L21 33 L7 22 L24.5 22 Z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      {/* Sparkle dots */}
      <circle cx="12" cy="10" r="1.2" fill={color} opacity="0.5" />
      <circle cx="50" cy="12" r="1" fill={color} opacity="0.4" />
      <circle cx="8" cy="45" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="48" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoTelescope({ size = 70, color = '#5B8DB8', style = {} }) {
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 70 50" style={{ opacity: 0.22, ...style }}>
      {/* Telescope tube */}
      <line x1="15" y1="35" x2="55" y2="12" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* Lens */}
      <circle cx="55" cy="12" r="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="55" cy="12" r="2" fill={color} opacity="0.4" />
      {/* Tripod legs */}
      <line x1="15" y1="35" x2="5" y2="48" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="15" y1="35" x2="25" y2="48" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="15" y1="35" x2="15" y2="48" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      {/* Light rays from lens */}
      <path d="M60 8 Q65 5 68 3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M61 12 Q66 12 70 11" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoPlanetRings({ size = 60, color = '#D49568', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Planet body */}
      <circle cx="30" cy="30" r="12" fill={color} opacity="0.3" stroke={color} strokeWidth="1" />
      {/* Rings */}
      <ellipse cx="30" cy="30" rx="24" ry="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="20" ry="5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Surface bands */}
      <path d="M19 26 Q30 24 41 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M20 33 Q30 35 40 33" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoRocket({ size = 70, color = '#7BAFD4', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rocket body */}
      <path d="M30 5 Q35 15 35 30 L25 30 Q25 15 30 5" fill={color} opacity="0.25" stroke={color} strokeWidth="1.2" />
      {/* Fins */}
      <path d="M25 28 L18 38 L25 35" fill={color} opacity="0.3" />
      <path d="M35 28 L42 38 L35 35" fill={color} opacity="0.3" />
      {/* Window */}
      <circle cx="30" cy="18" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="30" cy="18" r="1.5" fill={color} opacity="0.3" />
      {/* Exhaust flames */}
      <path d="M27 35 Q30 48 33 35" fill={color} opacity="0.2" />
      <path d="M28 35 Q30 42 32 35" fill={color} opacity="0.3" />
      {/* Exhaust particles */}
      <circle cx="30" cy="50" r="1.5" fill={color} opacity="0.3" />
      <circle cx="26" cy="52" r="1" fill={color} opacity="0.2" />
      <circle cx="34" cy="54" r="1" fill={color} opacity="0.2" />
    </svg>
  );
}

function DecoConstellation({ size = 70, color = '#82C4E0', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Constellation lines */}
      <line x1="10" y1="15" x2="25" y2="10" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="25" y1="10" x2="40" y2="20" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="40" y1="20" x2="50" y2="15" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="40" y1="20" x2="35" y2="35" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="35" y1="35" x2="20" y2="40" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="20" y1="40" x2="15" y2="50" stroke={color} strokeWidth="0.8" opacity="0.4" />
      <line x1="35" y1="35" x2="48" y2="45" stroke={color} strokeWidth="0.8" opacity="0.4" />
      {/* Stars at vertices */}
      {[[10,15],[25,10],[40,20],[50,15],[35,35],[20,40],[15,50],[48,45]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 2.5 : 1.8} fill={color} opacity="0.6" />
      ))}
    </svg>
  );
}

function DecoGoldenRecord({ size = 65, color = '#C08254', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Outer disc */}
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Grooves */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <circle cx="30" cy="30" r="18" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      <circle cx="30" cy="30" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.25" />
      {/* Center hole */}
      <circle cx="30" cy="30" r="4" fill={color} opacity="0.3" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.5" />
      {/* Etch marks on cover */}
      <line x1="30" y1="6" x2="35" y2="10" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="50" y1="20" x2="46" y2="16" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="42" cy="10" r="1.5" fill={color} opacity="0.3" />
      <circle cx="18" cy="10" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'brooklyn-1934': [DecoStar, DecoConstellation, DecoTelescope],
  'nino-estrellas': [DecoTelescope, DecoStar, DecoConstellation],
  'universidad-chicago': [DecoRocket, DecoPlanetRings, DecoStar],
  'misiones-espaciales': [DecoRocket, DecoGoldenRecord, DecoPlanetRings],
  'comunicador-cientifico': [DecoConstellation, DecoStar, DecoTelescope],
  'palido-punto-azul': [DecoPlanetRings, DecoConstellation, DecoGoldenRecord],
  'legado-memoria': [DecoGoldenRecord, DecoStar, DecoRocket],
};

// ——— Content Data ————————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Poundstone, W. (1999). Carl Sagan: A Life in the Cosmos, Henry Holt and Company',
  'Sagan, C. (1994). Pale Blue Dot: A Vision of the Human Future in Space, Random House',
  'Davidson, K. (1999). Carl Sagan: A Life, John Wiley & Sons',
  'Sagan, C. (1980). Cosmos, Random House',
  'Head, T. (ed.) (2006). Conversations with Carl Sagan, University Press of Mississippi',
  'Druyan, A. (ed.) (2006). The Varieties of Scientific Experience, Penguin Press',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'brooklyn-1934',
    title: 'Brooklyn, 1934',
    color: '#5B8DB8',
    btnImage: '/assets/carl_sagan/sagan_m1.png',
    image: '/assets/carl_sagan/sagan_m1.png',
    content: [
      'Carl Edward Sagan nació el 9 de noviembre de 1934 en el barrio de Brooklyn, Nueva York, en el seno de una familia de inmigrantes judíos procedentes del Imperio ruso. Su padre, Samuel Sagan, había nacido en Kamianets-Podilskyi, una ciudad de la actual Ucrania, y trabajaba en la industria textil como cortador de telas en una fábrica de ropa. Su madre, Rachel Molly Gruber, era nativa de Nueva York, hija también de inmigrantes de Europa del Este. La familia vivía en un apartamento modesto en Bensonhurst, un vecindario de clase trabajadora donde convivían comunidades de diversos orígenes culturales y lingüísticos.',

      'La infancia de Carl estuvo marcada por el contraste entre las limitaciones económicas de su familia y una riqueza cultural notable. Samuel Sagan, a pesar de no haber recibido educación universitaria, era un lector voraz que valoraba el conocimiento por encima de todo. Rachel Gruber era una mujer aguda e inquisitiva que animaba constantemente a su hijo a hacer preguntas sobre el mundo. Ambos padres compartían la convicción de que la educación era el camino más seguro hacia una vida mejor. Carl tenía también una hermana menor, Carol Mae, nacida en 1940, con quien compartió los años formativos de su infancia en Brooklyn.',

      'En 1939, cuando Carl tenía apenas cinco años, sus padres lo llevaron a la Feria Mundial de Nueva York, celebrada en Flushing Meadows, Queens. La exposición, inaugurada el 30 de abril de 1939 bajo el lema «El Mundo del Mañana», presentaba prototipos de televisores, robots mecánicos y una cápsula del tiempo enterrada para ser abierta en el año 6939. Para el pequeño Carl, aquella exhibición fue un encuentro directo con el futuro. La experiencia dejó una marca permanente en su memoria: años después, Sagan recordaría la Feria Mundial como el momento en que comprendió que la ciencia y la tecnología podían transformar el mundo de maneras que nadie aún imaginaba.',

      'El contexto histórico de la infancia de Sagan fue intenso. Nació durante la Gran Depresión, que afectó duramente a las familias trabajadoras como la suya. Cuando tenía cinco años estalló la Segunda Guerra Mundial, y aunque la guerra se libró lejos de Brooklyn, sus efectos se sentían en cada hogar estadounidense: el racionamiento de alimentos, la movilización industrial y las noticias constantes del frente europeo y del Pacífico. Estos eventos moldearon la visión de Sagan sobre la fragilidad de la civilización humana. Más adelante en su vida, esa conciencia lo llevaría a pronunciarse con firmeza contra las armas nucleares y a favor de la cooperación internacional entre naciones.',

      'Brooklyn en la década de 1930 era una mezcla vibrante de culturas. En las calles de Bensonhurst se oían conversaciones en yiddish, italiano, polaco y muchos otros idiomas. Carl creció rodeado de esta diversidad, lo que cultivó en él una perspectiva abierta y cosmopolita desde temprana edad. La biblioteca pública del barrio se convirtió en su refugio predilecto, un lugar donde podía explorar cualquier tema sin restricciones. Los domingos, su padre lo llevaba a caminar por el paseo marítimo de Coney Island, donde el cielo nocturno, menos afectado por la contaminación lumínica de aquella época, todavía permitía ver las estrellas brillando sobre el océano Atlántico.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Feria Mundial de Nueva York de 1939 recibió más de 44 millones de visitantes durante sus dos temporadas de apertura (1939 y 1940). Entre sus exhibiciones más recordadas estaba el Futurama de General Motors, diseñado por Norman Bel Geddes, que mostraba una ciudad del futuro con autopistas de alta velocidad. La cápsula del tiempo, creada por la empresa Westinghouse, contenía 35 objetos cotidianos, desde un reloj de cuerda hasta un paquete de semillas, destinados a ser descubiertos 5,000 años después. El joven Carl visitó la feria en múltiples ocasiones durante la temporada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Brooklyn está ubicada en el extremo occidental de Long Island, con coordenadas aproximadas de 40.65°N, 73.95°O. En la década de 1930, la contaminación lumínica era significativamente menor que en la actualidad, lo que permitía observar estrellas de hasta magnitud 4 o 5 desde zonas urbanas. Hoy, desde el mismo lugar, apenas se logran ver estrellas de magnitud 2 o 3. La magnitud aparente mide el brillo de un objeto celeste: cuanto menor es el número, más brillante es el objeto. Sirio, la estrella más brillante del cielo nocturno, tiene magnitud -1.46.' },
    ],
    fact: 'Samuel Sagan inmigró a Estados Unidos desde Kamianets-Podilskyi, una ciudad que en 1934 pertenecía a la Unión Soviética y hoy forma parte de Ucrania. La familia extendida de los Sagan, como millones de judíos de Europa del Este, emigró buscando escapar de la pobreza y las persecuciones antisemitas. En el censo de 1940, la dirección registrada de la familia era el 576 de Flatbush Avenue, Brooklyn, y Samuel declaró ingresos anuales de aproximadamente 3,800 dólares, equivalentes a unos 82,000 dólares actuales ajustados por inflación.',
  },
  {
    id: 'nino-estrellas',
    title: 'El Niño de las Estrellas',
    color: '#E8A87C',
    btnImage: '/assets/carl_sagan/sagan_m1.png',
    image: '/assets/carl_sagan/sagan_m1.png',
    content: [
      'Desde sus primeros años de vida, Carl Sagan manifestó una curiosidad constante por el cielo nocturno. A los cuatro o cinco años, observaba las estrellas desde la ventana de su apartamento en Brooklyn y preguntaba a sus padres qué eran aquellos puntos luminosos. Samuel Sagan le respondió con honestidad que eran soles muy lejanos, una explicación que dejó al pequeño Carl profundamente impactado. La idea de que cada estrella fuera un sol, y que algunos pudieran tener planetas propios, fue una revelación que definió el rumbo de toda su vida. No fue un maestro ni un libro: fue una conversación simple con su padre la que encendió la chispa de su vocación.',

      'La biblioteca pública de Brooklyn se convirtió en el laboratorio intelectual del joven Carl. A los seis o siete años, caminó solo hasta la biblioteca local y pidió a la bibliotecaria un libro sobre estrellas. Ella le trajo un libro sobre actores de Hollywood. Carl le aclaró que se refería a las estrellas del cielo, no a las de las películas. Cuando finalmente obtuvo un libro de astronomía, se maravilló al descubrir que el Sol es una estrella de tipo espectral G2V, una enana amarilla de tamaño mediano, ubicada a 150 millones de kilómetros de la Tierra. Este descubrimiento le reveló que el universo era mucho más vasto y más complejo de lo que había imaginado hasta entonces.',

      'Carl devoraba toda publicación científica que encontraba a su alcance. Las revistas de ciencia ficción como Astounding Science Fiction, editada por John W. Campbell Jr., alimentaron su imaginación con relatos de viajes interplanetarios y civilizaciones extraterrestres. Pero Carl tenía una cualidad poco común: no se conformaba con la ficción. Después de leer una historia sobre Marte, buscaba libros de astronomía para averiguar qué sabían realmente los científicos sobre el planeta rojo. Esta dualidad entre imaginación y rigor se convirtió en el sello de toda su carrera posterior. Leía a autores como Edgar Rice Burroughs y H.G. Wells, pero luego verificaba cada hecho.',

      'A los ocho años, Carl ya tenía claro que quería ser astrónomo, aunque no conocía a nadie que se dedicara profesionalmente a estudiar las estrellas. En su barrio de Brooklyn, los oficios comunes eran el comercio, la manufactura y los servicios. La idea de que alguien pudiera ganarse la vida observando planetas y galaxias parecía remota e improbable. Sin embargo, sus padres nunca le dijeron que abandonara su sueño. Rachel Gruber, su madre, era especialmente protectora y ambiciosa en nombre de su hijo: quería que Carl tuviera todas las oportunidades que ella no había tenido. Esa combinación de apoyo familiar y determinación personal resultó decisiva para su futuro.',

      'En 1951, Carl se graduó de la Rahway High School en New Jersey, adonde la familia se había mudado cuando él tenía once años. Se graduó a los 16 años, dos años antes que la mayoría de sus compañeros, gracias a su rendimiento académico sobresaliente. Sus profesores de ciencias reconocieron en él un talento poco frecuente: no solo absorbía información con rapidez, sino que formulaba preguntas que iban más allá del contenido de los libros de texto. Ya en la secundaria, Carl participaba en clubes de astronomía y daba charlas informales a sus compañeros sobre los planetas del Sistema Solar. El camino hacia la universidad y hacia las estrellas estaba trazado con claridad.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Carl Sagan fue un ávido lector de ciencia ficción durante toda su infancia y adolescencia. Entre sus autores favoritos estaban Edgar Rice Burroughs, autor de las novelas de John Carter en Marte, y H.G. Wells, creador de La Guerra de los Mundos. Sagan dijo en múltiples entrevistas que la ciencia ficción le enseñó a pensar en términos cósmicos, a imaginar mundos diferentes y a preguntarse qué sería posible. De adulto, escribiría su propia novela de ciencia ficción, Contact, publicada en 1985, que se convirtió en un éxito de ventas y luego en una película protagonizada por Jodie Foster en 1997.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El Sol, la estrella que cautivó al joven Carl, es una estrella de secuencia principal de tipo espectral G2V con una masa de 1.989 × 10³⁰ kilogramos y un diámetro de 1.392 millones de kilómetros. Su temperatura superficial es de aproximadamente 5,778 kelvin, y en su núcleo alcanza 15 millones de kelvin, donde la fusión nuclear convierte hidrógeno en helio a razón de 600 millones de toneladas por segundo. La luz solar tarda 8 minutos y 20 segundos en llegar a la Tierra, recorriendo 149.6 millones de kilómetros, una distancia conocida como unidad astronómica.' },
    ],
    fact: 'La biblioteca pública de Brooklyn, fundada en 1897, era uno de los sistemas bibliotecarios más grandes de Estados Unidos en la década de 1940, con más de 60 sucursales repartidas por todo el condado. Carl Sagan visitaba con frecuencia la sucursal de su barrio en Bensonhurst. En 1944, el sistema bibliotecario de Brooklyn contenía más de 3.5 millones de volúmenes. Sagan recordaba que la bibliotecaria, al verlo regresar semana tras semana por libros de astronomía, comenzó a reservarle las nuevas adquisiciones del tema antes de colocarlas en los estantes generales.',
  },
  {
    id: 'universidad-chicago',
    title: 'La Universidad de Chicago',
    color: '#7BAFD4',
    btnImage: '/assets/carl_sagan/sagan_m1.png',
    image: '/assets/carl_sagan/sagan_m1.png',
    content: [
      'Carl Sagan ingresó a la Universidad de Chicago en 1951, a los 16 años, atraído por el programa de estudios generales diseñado por el presidente Robert Maynard Hutchins. Este programa, poco convencional para la época, exigía a los estudiantes una formación amplia en humanidades, ciencias sociales y ciencias naturales antes de especializarse. Para un joven curioso como Sagan, que se interesaba tanto por la astronomía como por la filosofía y la biología, Chicago era el lugar perfecto. Obtuvo su licenciatura en humanidades (Bachelor of Arts) en 1954 y su licenciatura en ciencias (Bachelor of Science) en 1955, ambas con calificaciones destacadas en su promoción.',

      'En 1956, Sagan completó su maestría en física en la misma universidad. Su formación de posgrado se orientó rápidamente hacia la ciencia planetaria, un campo que en esa época era considerado marginal dentro de la astronomía. Su mentor más influyente fue Gerard Peter Kuiper, astrónomo neerlandés-estadounidense considerado el padre de la ciencia planetaria moderna. Kuiper dirigía el Observatorio Yerkes de la Universidad de Chicago, ubicado en Williams Bay, Wisconsin, donde Sagan tuvo acceso a telescopios profesionales y participó en observaciones de las atmósferas planetarias. Bajo la guía de Kuiper, Sagan aprendió técnicas de espectroscopía infrarroja aplicadas al estudio de planetas.',

      'La tesis doctoral de Sagan, completada en 1960, se tituló «Physical Studies of Planets» y abordaba las condiciones físicas de la superficie de Venus. En esa época, varios científicos proponían que Venus podría tener océanos o incluso vegetación bajo su densa capa de nubes. Sagan demostró mediante cálculos de transferencia radiativa que la temperatura superficial de Venus era de aproximadamente 462°C, causada por un efecto invernadero intenso producido por su atmósfera rica en dióxido de carbono. Esta conclusión fue confirmada por la sonda soviética Venera 4 en 1967 y por mediciones posteriores. El trabajo estableció a Sagan como un investigador riguroso capaz de resolver problemas de primer nivel.',

      'Durante sus años en Chicago, Sagan también estudió con el genetista Hermann Joseph Muller, ganador del Premio Nobel de Fisiología o Medicina en 1946 por su descubrimiento de que las radiaciones pueden causar mutaciones genéticas. Muller introdujo a Sagan en los fundamentos de la biología molecular y la genética, conocimientos que resultarían esenciales para su trabajo posterior en exobiología, la ciencia que estudia la posibilidad de vida fuera de la Tierra. Esta formación interdisciplinaria, poco común en su generación, le otorgó una perspectiva única para abordar la pregunta de si la vida podría existir en otros planetas del Sistema Solar y más allá.',

      'Otro evento determinante durante los años de Sagan en Chicago fue su participación como observador en el célebre experimento de Miller-Urey. En 1953, Stanley Miller, bajo la supervisión del profesor Harold Urey, demostró que aminoácidos —los bloques fundamentales de las proteínas— podían formarse espontáneamente a partir de gases simples como metano, amoniaco, hidrógeno y vapor de agua sometidos a descargas eléctricas. El experimento simulaba las condiciones de la atmósfera terrestre primitiva. Sagan quedó marcado por esta demostración de que los componentes químicos de la vida podían surgir de procesos naturales, sin necesidad de intervención externa alguna.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Gerard Kuiper descubrió en 1944 que Titán, la luna más grande de Saturno, posee una atmósfera densa compuesta principalmente de nitrógeno y metano. En 1951, descubrió Miranda, una de las lunas de Urano. El Cinturón de Kuiper, una región del Sistema Solar más allá de la órbita de Neptuno que contiene millones de cuerpos helados, fue nombrado en su honor. Plutón, reclasificado como planeta enano en 2006, es el objeto más conocido de esta región. Kuiper murió en 1973 en Ciudad de México durante un viaje de investigación.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El experimento de Miller-Urey de 1953 produjo más de 20 aminoácidos diferentes a partir de gases simples y descargas eléctricas. En 2008, investigadores de la Universidad de California en San Diego reexaminaron las muestras originales selladas de Miller utilizando técnicas modernas de cromatografía y espectrometría de masas, y descubrieron que el experimento había generado en realidad más de 40 aminoácidos y varios compuestos orgánicos complejos, más del doble de lo reportado originalmente. Este hallazgo reforzó la hipótesis de que la química prebiótica es más productiva de lo que se pensaba inicialmente.' },
    ],
    fact: 'La Universidad de Chicago, fundada en 1890 por John D. Rockefeller, ha producido hasta la fecha 100 premios Nobel afiliados a la institución, incluyendo a Enrico Fermi, quien construyó el primer reactor nuclear del mundo bajo las gradas del estadio de fútbol americano de la universidad el 2 de diciembre de 1942. Cuando Sagan llegó a Chicago en 1951, el legado de la física nuclear aún era palpable en el campus. La universidad tenía un entorno intelectual que valoraba el pensamiento interdisciplinario, una filosofía que moldearía profundamente el enfoque de Sagan hacia la ciencia durante el resto de su vida.',
  },
  {
    id: 'misiones-espaciales',
    title: 'Las Misiones Espaciales',
    color: '#D49568',
    btnImage: '/assets/carl_sagan/sagan_m1.png',
    image: '/assets/carl_sagan/sagan_m1.png',
    content: [
      'Carl Sagan desempeñó un papel central como consultor y asesor científico de la NASA desde principios de la década de 1960 hasta el final de su vida. Su primera contribución significativa fue al programa Mariner, una serie de sondas robóticas diseñadas para explorar los planetas interiores del Sistema Solar. Mariner 2, lanzada el 27 de agosto de 1962, se convirtió en la primera nave espacial en realizar un sobrevuelo exitoso de otro planeta al pasar a 34,773 kilómetros de Venus el 14 de diciembre de 1962. Los datos de Mariner 2 confirmaron las predicciones de Sagan sobre la temperatura extrema de Venus, validando su tesis doctoral sobre el efecto invernadero venusino.',

      'En 1972 y 1973, la NASA lanzó las sondas Pioneer 10 y Pioneer 11, las primeras naves diseñadas para atravesar el cinturón de asteroides y explorar Júpiter y Saturno. Sagan, junto con Frank Drake y la artista Linda Salzman Sagan (su entonces esposa), diseñó las placas de Pioneer: láminas de aluminio anodizado en oro de 15.2 cm por 22.9 cm adosadas al armazón de cada sonda. Las placas contenían un diagrama de un hombre y una mujer a escala junto a la silueta de la nave, la posición del Sol relativa a 14 púlsares como mapa galáctico, y un esquema del Sistema Solar indicando el origen de la nave. Fue el primer mensaje físico de la humanidad enviado hacia el espacio interestelar.',

      'Las misiones Viking representaron otro hito en la carrera de Sagan. Viking 1 aterrizó en Marte el 20 de julio de 1976 en Chryse Planitia, y Viking 2 lo hizo el 3 de septiembre en Utopia Planitia. Sagan fue miembro del equipo de imagen y participó activamente en la selección de los sitios de aterrizaje. Las Viking fueron las primeras naves en operar con éxito en la superficie marciana, transmitiendo las primeras fotografías en color del paisaje de Marte. Sagan estaba especialmente interesado en los tres experimentos biológicos a bordo, diseñados para detectar signos de vida microbiana en el suelo marciano. Los resultados fueron ambiguos y siguen siendo debatidos por los científicos hoy en día.',

      'El proyecto más emblemático de Sagan en la exploración espacial fue el Disco de Oro de las Voyager. Lanzadas en 1977, las sondas Voyager 1 y Voyager 2 llevaban cada una un disco fonográfico chapado en oro de 30 centímetros de diámetro, diseñado para sobrevivir miles de millones de años en el vacío del espacio. Sagan presidió el comité de selección de contenidos del disco, que incluía 115 imágenes codificadas en formato analógico, saludos en 55 idiomas humanos y un idioma de ballenas, 27 piezas musicales de culturas diversas, y una selección de sonidos naturales de la Tierra. La cubierta del disco incluía instrucciones en lenguaje simbólico para que una civilización extraterrestre pudiera reproducirlo.',

      'La contribución de Sagan a las misiones espaciales iba más allá de la ciencia y los mensajes interestelares. Fue uno de los defensores más eficaces de la exploración espacial ante el Congreso de Estados Unidos y la opinión pública. En una época en que muchos cuestionaban el gasto en misiones espaciales, Sagan argumentaba que la exploración del cosmos no era un lujo sino una necesidad: nos proporcionaba conocimiento sobre nuestro propio planeta, desarrollaba tecnologías útiles para la vida cotidiana e inspiraba a generaciones de jóvenes a estudiar ciencia e ingeniería. Sus intervenciones ante comités legislativos y sus apariciones en programas de televisión ayudaron a mantener el apoyo público a la NASA.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Disco de Oro de las Voyager incluye la pieza «Dark Was the Night, Cold Was the Ground» del músico de blues Blind Willie Johnson, grabada en 1927. Ann Druyan, quien co-dirigió el proyecto del disco con Sagan, describió esta canción como una representación de la soledad humana en el cosmos. También incluyó «Johnny B. Goode» de Chuck Berry. Cuando un cómico del Saturday Night Live bromeó diciendo que los extraterrestres responderían «Envíen más Chuck Berry», Sagan tomó el chiste con humor y reconoció que era difícil seleccionar solo 27 piezas para representar a toda la humanidad.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las sondas Voyager viajan actualmente a velocidades de aproximadamente 17 km/s (Voyager 1) y 15 km/s (Voyager 2). A esas velocidades, necesitarían unos 73,000 años para alcanzar Próxima Centauri, la estrella más cercana al Sol, ubicada a 4.24 años luz. Voyager 1 se encuentra a más de 24,000 millones de kilómetros de la Tierra y cruzó la heliopausa —el límite del viento solar— en agosto de 2012, convirtiéndose en el primer objeto humano en el espacio interestelar. Ambas naves funcionan con generadores termoeléctricos de radioisótopos (RTG) alimentados por plutonio-238.' },
    ],
    fact: 'Las placas de Pioneer fueron objeto de controversia cultural cuando se publicaron en 1972. Algunos críticos cuestionaron la inclusión de figuras humanas desnudas, argumentando que era inapropiado. Otros señalaron que las figuras representaban un sesgo cultural al mostrar rasgos caucásicos. Sagan defendió las placas argumentando que debían ser lo más universales posible. Pioneer 10 envió su última señal débil a la Tierra el 23 de enero de 2003, desde una distancia de 12,000 millones de kilómetros. Actualmente se dirige hacia la estrella Aldebarán, en la constelación de Tauro, y llegará a sus proximidades en aproximadamente 2 millones de años.',
  },
  {
    id: 'comunicador-cientifico',
    title: 'El Comunicador Científico',
    color: '#4E8FAE',
    btnImage: '/assets/carl_sagan/sagan_m1.png',
    image: '/assets/carl_sagan/sagan_m1.png',
    content: [
      'En 1980, Carl Sagan presentó «Cosmos: Un Viaje Personal», una serie documental de 13 episodios producida por la cadena PBS (Public Broadcasting Service) de Estados Unidos. El primer episodio, titulado «Las Costas del Océano Cósmico», se emitió el 28 de septiembre de 1980. La serie fue co-escrita por Sagan, la escritora Ann Druyan y el astrofísico Steven Soter. La producción corrió a cargo de KCET, la estación de PBS en Los Ángeles, y su costo total fue de aproximadamente 6.3 millones de dólares de la época, una cifra modesta considerando su alcance posterior. Cada episodio duraba aproximadamente una hora y abordaba un tema diferente relacionado con la ciencia y la humanidad.',

      'Cosmos fue transmitida en más de 60 países y vista por un estimado de 500 millones de personas, convirtiéndola en el programa de televisión pública más visto hasta ese momento en la historia de la televisión mundial. La serie ganó un premio Emmy y un premio Peabody, dos de los reconocimientos más prestigiosos de la industria televisiva estadounidense. El libro homónimo, publicado también en 1980 por Random House, permaneció 70 semanas en la lista de superventas del New York Times y fue traducido a más de 40 idiomas. La combinación de narración poética, efectos visuales innovadores y la banda sonora de Vangelis creó una experiencia que trasciende las barreras de idioma y cultura.',

      'Lo que distinguía a Sagan como comunicador era su capacidad para traducir conceptos científicos complejos en narrativas accesibles sin sacrificar la precisión. Cuando explicaba que «somos polvo de estrellas», estaba describiendo un hecho verificable de la nucleosíntesis estelar: los elementos pesados como el carbono, el oxígeno, el hierro y el nitrógeno se forman mediante fusión nuclear en el interior de estrellas masivas y se dispersan por el espacio cuando estas estrellas explotan como supernovas. Sagan utilizaba metáforas e historias humanas para conectar estos hechos con la experiencia cotidiana, haciendo que la audiencia sintiera la ciencia como algo personal y relevante.',

      'Además de Cosmos, Sagan publicó más de 20 libros a lo largo de su carrera. Entre los más destacados se encuentran «El cerebro de Broca» (1979), una colección de ensayos sobre ciencia y escepticismo; «Contact» (1985), su única novela de ciencia ficción, que exploraba las implicaciones del primer contacto con una civilización extraterrestre; y «El mundo y sus demonios» (1995), una defensa del pensamiento crítico y el método científico frente a la pseudociencia y la superstición. Sagan escribía con la misma claridad con la que hablaba, y sus libros se caracterizan por un estilo directo, informado y accesible para lectores no especializados.',

      'Sagan fue una presencia constante en la televisión estadounidense durante las décadas de 1970 y 1980. Apareció en el programa The Tonight Show con Johnny Carson en más de 25 ocasiones, alcanzando una audiencia de millones de personas cada vez. Su estilo calmado, su sonrisa genuina y su forma particular de pronunciar «billions and billions» (miles y miles de millones) se convirtieron en rasgos reconocibles de la cultura popular. Carson lo imitaba frecuentemente en sus monólogos, lo que paradójicamente contribuyó a aumentar la popularidad de Sagan. Esta visibilidad mediática no siempre fue bien vista por sus colegas académicos, algunos de los cuales consideraban que un científico serio no debía aparecer en programas de entretenimiento.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2014, se produjo una secuela titulada «Cosmos: Una Odisea del Espacio-Tiempo», presentada por el astrofísico Neil deGrasse Tyson. Tyson, nacido en 1958 en Manhattan, había conocido a Sagan a los 17 años cuando este lo invitó personalmente a visitar la Universidad de Cornell en 1975. Sagan pasó un sábado entero con el joven Tyson, le mostró su laboratorio y le regaló un libro firmado. Tyson ha declarado que ese encuentro definió su carrera y que aspira a inspirar a otros como Sagan lo inspiró a él. La nueva serie fue producida por Ann Druyan y emitida por Fox y National Geographic.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La nucleosíntesis estelar, el proceso que Sagan describía con la frase «somos polvo de estrellas», ocurre en varias etapas. Las estrellas de secuencia principal fusionan hidrógeno en helio. Las estrellas más masivas continúan fusionando helio en carbono, carbono en neón, neón en oxígeno, y oxígeno en silicio, hasta llegar al hierro. Más allá del hierro, la fusión no libera energía, por lo que elementos como el oro, el platino y el uranio se forman durante explosiones de supernova mediante el proceso r (captura rápida de neutrones). Tu cuerpo contiene átomos forjados en al menos dos o tres estrellas diferentes que explotaron hace miles de millones de años.' },
    ],
    fact: 'Carl Sagan fue rechazado para membresía en la Academia Nacional de Ciencias de Estados Unidos en 1992, en parte porque algunos miembros lo consideraban más divulgador que investigador. Sin embargo, Sagan tenía más de 600 publicaciones científicas y fue autor o coautor de artículos en revistas como Nature, Science e Icarus, de la cual fue editor durante 12 años. Su contribución al entendimiento de la atmósfera de Venus, la estacionalidad de las tormentas de polvo en Marte y la naturaleza de Titán fue reconocida con la Medalla de la NASA al Mérito Científico Distinguido y el Premio Pulitzer de Literatura General en 1978 por su libro «Los Dragones del Edén».',
  },
  {
    id: 'palido-punto-azul',
    title: 'El Pálido Punto Azul',
    color: '#82C4E0',
    btnImage: '/assets/carl_sagan/sagan_m1.png',
    image: '/assets/carl_sagan/sagan_m1.png',
    content: [
      'El 14 de febrero de 1990, la sonda Voyager 1 se encontraba a una distancia de 6,054 millones de kilómetros de la Tierra, más allá de la órbita de Plutón, cuando Carl Sagan convenció a la NASA de ejecutar una maniobra sin precedentes: girar la cámara de la nave hacia atrás para tomar una última fotografía de nuestro planeta. La idea no tenía valor científico directo, y varios ingenieros de la NASA argumentaron que apuntar la cámara hacia el Sol podría dañar los sensores. Pero Sagan insistió con un argumento filosófico: la humanidad necesitaba verse a sí misma desde la perspectiva del cosmos. El director del proyecto Voyager, Edward Stone, autorizó la maniobra.',

      'La imagen resultante, conocida como «Pale Blue Dot» (Pálido Punto Azul), muestra la Tierra como un punto diminuto de apenas 0.12 píxeles de diámetro, suspendido en un rayo de luz solar dispersa por la óptica de la cámara. La fotografía fue tomada con la cámara de ángulo estrecho de Voyager 1 utilizando los filtros azul, verde y violeta. Desde esa distancia, el planeta que alberga toda la historia humana —cada civilización, cada guerra, cada obra de arte, cada nacimiento y cada muerte— aparecía como una mota de polvo casi invisible contra la oscuridad del espacio. La imagen se publicó el 6 de junio de 1990 y rápidamente se convirtió en una de las fotografías más significativas jamás tomadas.',

      'Sagan escribió una reflexión sobre la fotografía que se publicó en su libro «Pale Blue Dot: A Vision of the Human Future in Space», editado por Random House en 1994. En ese texto, describió la Tierra como «un pálido punto azul, suspendido en un rayo de sol» y señaló que en ese punto vivían «todos los que amas, todos los que conoces, todos de los que alguna vez oíste hablar, cada ser humano que ha existido». La reflexión continuaba con un inventario de la historia humana contenida en ese punto: todos los ríos de sangre derramados, todas las religiones y naciones y sus conflictos, todos los cazadores y recolectores, héroes y cobardes, creadores y destructores de civilizaciones.',

      'El mensaje central de la reflexión de Sagan era una llamada a la humildad y la responsabilidad. Argumentaba que la vastedad del espacio debería hacernos comprender que no hay ningún sitio al que migrar en el futuro cercano, que nuestro planeta es el único hogar que tenemos. «No hay indicios de que vaya a venir ayuda de algún otro lugar para salvarnos de nosotros mismos», escribió. Para Sagan, la fotografía del Pálido Punto Azul no era solo una imagen: era una lección sobre la necesidad de tratarnos mutuamente con más compasión, de preservar el medio ambiente y de abandonar las rivalidades tribales que ponían en riesgo la supervivencia de la especie.',

      'La imagen del Pálido Punto Azul ha sido utilizada en incontables contextos educativos, políticos y culturales desde su publicación. Aparece en museos de ciencia, libros de texto, documentales y discursos de líderes mundiales. En 2020, con motivo del 30 aniversario de la fotografía, la NASA publicó una versión reprocesada con técnicas modernas de tratamiento de imagen que mejoró el contraste y la definición del punto terrestre. La reflexión de Sagan ha sido leída en escuelas de más de 100 países y se ha convertido en uno de los textos científicos más citados en la historia de la divulgación. Su poder reside en su capacidad de conectar un dato astronómico con una verdad profundamente humana.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La idea de fotografiar la Tierra desde las afueras del Sistema Solar no fue espontánea. Sagan la propuso por primera vez a la NASA en 1981, pero fue rechazada repetidamente durante nueve años. Los ingenieros temían que la luz solar dañara los detectores CCD de la cámara, y los administradores no veían valor científico en la imagen. Sagan persistió, escribiendo cartas y reuniéndose con directivos de la NASA hasta que finalmente el administrador adjunto Lennard Fisk autorizó la toma en febrero de 1990, justo antes de que se apagaran definitivamente las cámaras de Voyager 1.' },
      { label: 'Dato Científico', icon: 'atom', text: 'A la distancia desde la que se tomó la foto del Pálido Punto Azul (6,054 millones de kilómetros), la Tierra subtendía un ángulo de apenas 0.12 segundos de arco, menos de un píxel en el sensor de la cámara de Voyager 1. Para comparar, la Luna llena vista desde la Tierra subtende unos 1,800 segundos de arco (medio grado), es decir, la Tierra vista desde Voyager 1 era 15,000 veces más pequeña que la Luna vista desde tu jardín. La señal de radio que transmitió la imagen tardó 5 horas y 36 minutos en recorrer la distancia entre la sonda y las antenas de la Red del Espacio Profundo.' },
    ],
    fact: 'La fecha de la toma de la fotografía, 14 de febrero de 1990, coincidió con el Día de San Valentín. Ann Druyan, la tercera esposa de Sagan y co-creadora del Disco de Oro, ha señalado que esta coincidencia no fue planificada pero resultó simbólica: una carta de amor a la Tierra desde los confines del Sistema Solar. Voyager 1 tomó en realidad 60 fotografías ese día, apuntando a diferentes partes del Sistema Solar, creando lo que la NASA denominó «Retrato de Familia del Sistema Solar». La Tierra fue el último objetivo fotografiado, y el punto de luz más tenue de toda la serie de imágenes capturadas.',
  },
  {
    id: 'legado-memoria',
    title: 'Legado y Memoria',
    color: '#C08254',
    btnImage: '/assets/carl_sagan/sagan_m1.png',
    image: '/assets/carl_sagan/sagan_m1.png',
    content: [
      'Carl Sagan falleció el 20 de diciembre de 1996, a los 62 años, en el Centro Oncológico Fred Hutchinson de Seattle, Washington. La causa fue una neumonía, complicación de la mielodisplasia que le había sido diagnosticada en 1994, un trastorno en el que la médula ósea no produce suficientes células sanguíneas sanas. Sagan había recibido tres trasplantes de médula ósea, donada por su hermana Carol, pero la enfermedad no cedió. Su muerte fue llorada por la comunidad científica internacional y por millones de personas que habían crecido con sus libros y programas de televisión. Fue enterrado en el cementerio Lakeview de Ithaca, Nueva York, cerca del campus de Cornell.',

      'Entre los legados institucionales más importantes de Sagan se encuentra la Sociedad Planetaria (The Planetary Society), que cofundó en 1980 junto con Bruce Murray, entonces director del Laboratorio de Propulsión a Chorro (JPL) de la NASA, y Louis Friedman, ingeniero aeroespacial. La Sociedad Planetaria es la organización no gubernamental dedicada al espacio más grande del mundo, con más de 100,000 miembros en más de 100 países. Su misión es promover la exploración espacial, la búsqueda de vida extraterrestre y la defensa planetaria contra impactos de asteroides. La sociedad ha financiado proyectos como LightSail, una nave impulsada por la presión de la luz solar.',

      'La novela «Contact», publicada por Sagan en 1985, fue adaptada al cine en 1997, un año después de su muerte. La película, dirigida por Robert Zemeckis y protagonizada por Jodie Foster, recaudó 171 millones de dólares en taquilla mundial. La trama gira en torno a la astrónoma Eleanor Arroway, quien detecta una señal de radio procedente de la estrella Vega, a 25 años luz de distancia. La señal contiene instrucciones para construir una máquina de transporte interestelar. Sagan trabajó en el guion durante años, insistiendo en que la ciencia representada fuera lo más precisa posible. Para resolver un problema del argumento, consultó al físico Kip Thorne sobre la viabilidad teórica de los agujeros de gusano.',

      'La NASA honró a Sagan de múltiples formas. La estación de aterrizaje de la misión Mars Pathfinder, que llegó a Marte el 4 de julio de 1997, fue renombrada «Carl Sagan Memorial Station». Un cráter de 94.2 kilómetros de diámetro en Marte, ubicado a 10.6°N, 335.3°E, lleva su nombre. El asteroide 2709 Sagan, descubierto en 1982, también fue bautizado en su honor. En 2006, la sonda New Horizons, en su camino a Plutón, rindió tributo a Sagan durante su recorrido por el Sistema Solar exterior. Estas designaciones reflejan el respeto duradero de la comunidad espacial internacional hacia la contribución científica y cultural de Sagan.',

      'La frase «billions and billions» (miles y miles de millones), que popularmente se asocia con Sagan, es un caso curioso de atribución cultural. Sagan nunca usó esa expresión exacta en Cosmos, aunque frecuentemente utilizaba la palabra «billions» para describir cantidades astronómicas. La frase fue popularizada por las imitaciones de Johnny Carson en The Tonight Show. Sagan abrazó el malentendido con humor y tituló su último libro, publicado póstumamente en 1997, «Billions and Billions: Thoughts on Life and Death at the Brink of the Millennium». Ann Druyan completó el manuscrito después de la muerte de Sagan. El libro explora temas como el calentamiento global, el pensamiento crítico y la mortalidad, y concluye con un epílogo escrito por Druyan que describe los últimos días de vida del astrónomo.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Después de la muerte de Sagan, Ann Druyan continuó su legado como productora de las nuevas temporadas de Cosmos. También supervisó la publicación de varios libros póstumos de Sagan, incluyendo «The Varieties of Scientific Experience» (2006), basado en sus Conferencias Gifford de 1985 sobre teología natural. Druyan y Sagan se enamoraron durante la producción del Disco de Oro de las Voyager en 1977 y se casaron en 1981. Ella ha descrito el momento de su enamoramiento como el instante más transformador de su vida, ocurrido durante una llamada telefónica sobre la selección de música china para el disco.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El cráter Sagan en Marte tiene un diámetro de 94.2 kilómetros y está ubicado en la región de Sinus Sabaeus. Para comparar, el cráter Chicxulub en la península de Yucatán, México, que provocó la extinción de los dinosaurios hace 66 millones de años, tiene un diámetro de 180 kilómetros. La Carl Sagan Memorial Station (Mars Pathfinder) aterrizó en Ares Vallis, un canal de desagüe antiguo en Marte, y operó durante 83 días transmitiendo 16,500 imágenes desde la superficie. Su pequeño rover, Sojourner, de 10.6 kilogramos, fue el primer vehículo robótico en operar en la superficie de otro planeta.' },
    ],
    fact: 'Carl Sagan publicó más de 600 artículos científicos y fue autor, coautor o editor de más de 20 libros durante su carrera. Fue galardonado con la Medalla de la NASA al Mérito Científico Distinguido en dos ocasiones, recibió el Premio Pulitzer en 1978 por «Los Dragones del Edén», y fue distinguido con la Medalla de Bienestar Público de la Academia Nacional de Ciencias, el honor más alto que otorga la Academia a un ciudadano. En 2014, la Unión Astronómica Internacional nombró la unidad «sagan» como medida informal para cuantificar la cantidad de estrellas en el universo observable, estimada en al menos 200,000 millones.',
  },
];

// ——— Starfield Canvas Background ——————————————————————————————————————————
function StarfieldCanvas() {
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
      hue: Math.random() > 0.5 ? '91,141,184' : '232,168,124', // prussian blue or peach
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

// ——— Sagan Header ————————————————————————————————————————————————————————
function SaganHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,141,184,0.3))' }}>
        {/* Stellar arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#saganGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 star markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B8DB8','#E8A87C','#7BAFD4','#D49568','#4E8FAE','#82C4E0','#C08254'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central star icon */}
        <path d="M300 22 L303 28 L310 28 L305 33 L307 40 L300 36 L293 40 L295 33 L290 28 L297 28 Z" fill="#E8A87C" opacity="0.5" />
        <defs>
          <linearGradient id="saganGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,141,184,0.2)" />
            <stop offset="50%" stopColor="rgba(232,168,124,0.9)" />
            <stop offset="100%" stopColor="rgba(91,141,184,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="78" textAnchor="middle" fill="#E8A87C" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CARL SAGAN</text>
        <text x="300" y="98" textAnchor="middle" fill="rgba(232,168,124,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">¿QUIÉN FUE CARL SAGAN?</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ————————————————————————————————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(232,168,124,0.2)'}`,
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
          layoutId="activeDotSaganM1"
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

// ——— Expandable Section with Random Direction ————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————
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

      {/* ——— Two-Column Hero Section ——— */}
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

      {/* ——— Magazine Body ——— */}
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

        {/* ——— Expandable Interactive Sections ——— */}
        {node.expandables && node.expandables.length > 0 && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            {node.expandables.map((item, i) => (
              <ExpandableSection key={i} item={item} color={node.color} />
            ))}
          </div>
        )}

        {/* Video Player */}
        {node.video && (
          <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video.src} title={node.video.title} color={node.color} />
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

// ——— Progress Bar ————————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(232,168,124,0.15)',
    }}>
      <Star size={14} style={{ color: '#E8A87C', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B8DB8, #E8A87C)', borderRadius: '3px', boxShadow: '0 0 8px rgba(232,168,124,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#E8A87C', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ——————————————————————————————————————————
export default function InteractiveInfographic_SaganM1() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/carl_sagan/sagan_m1.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(232,168,124,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <StarfieldCanvas />

      <SaganHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(232,168,124,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(232,168,124,0.08)', borderRadius: '16px',
              border: '1px solid rgba(232,168,124,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#E8A87C', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has explorado la vida de Carl Sagan!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Explorador del Cosmos
            </p>
          </motion.div>
        )}
      </AnimatePresence>
          {/* ——— Bibliografía ——— */}
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
