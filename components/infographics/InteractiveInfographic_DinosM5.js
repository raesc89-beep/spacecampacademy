'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Pterosaur themed) ────────────────────────────
function DecoWingMembrane({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Wing membrane shape */}
      <path d="M10 45 Q15 20 30 15 Q45 10 55 8 L50 20 Q40 25 30 30 Q20 35 15 42 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
      {/* Finger bones */}
      <line x1="30" y1="15" x2="55" y2="8" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <line x1="30" y1="15" x2="50" y2="20" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      <line x1="30" y1="15" x2="15" y2="42" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      {/* Joint dots */}
      <circle cx="30" cy="15" r="2.5" fill={color} opacity="0.6" />
      <circle cx="55" cy="8" r="1.5" fill={color} opacity="0.4" />
      <circle cx="15" cy="42" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoSkull({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Pterosaur skull with crest */}
      <path d="M8 35 Q10 25 20 22 L45 20 Q55 18 55 15 L50 12 Q40 8 30 10 Q20 12 15 18 Q8 24 8 35 Z" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Crest */}
      <path d="M30 10 Q28 4 35 2 Q42 5 40 10" fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      {/* Eye */}
      <circle cx="22" cy="24" r="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="22" cy="24" r="1.2" fill={color} opacity="0.5" />
      {/* Beak */}
      <line x1="45" y1="20" x2="58" y2="25" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
    </svg>
  );
}

function DecoHollowBone({ size = 80, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Hollow bone cross-section */}
      <ellipse cx="20" cy="20" rx="14" ry="14" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="20" cy="20" rx="9" ry="9" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="20" cy="20" r="4" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Air channels */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={20 + 9 * Math.cos(rad)} y1={20 + 9 * Math.sin(rad)} x2={20 + 14 * Math.cos(rad)} y2={20 + 14 * Math.sin(rad)} stroke={color} strokeWidth="0.8" opacity="0.4" />;
      })}
      {/* Bone shaft */}
      <line x1="38" y1="15" x2="75" y2="15" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <line x1="38" y1="25" x2="75" y2="25" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <line x1="38" y1="15" x2="38" y2="25" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoThermal({ size = 60, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Rising thermal currents */}
      <path d="M15 55 Q18 40 15 30 Q12 20 18 10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      <path d="M30 55 Q33 42 30 32 Q27 22 32 12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M45 55 Q48 40 45 30 Q42 20 47 8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Soaring silhouette */}
      <path d="M20 5 L30 8 L40 5 L30 10 Z" fill={color} opacity="0.3" />
      {/* Warm dots */}
      <circle cx="10" cy="48" r="1.5" fill={color} opacity="0.3" />
      <circle cx="50" cy="45" r="1" fill={color} opacity="0.3" />
      <circle cx="25" cy="50" r="1" fill={color} opacity="0.25" />
    </svg>
  );
}

function DecoEggFossil({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Egg shape */}
      <ellipse cx="30" cy="32" rx="16" ry="20" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Crack lines */}
      <path d="M22 22 L26 28 L22 34" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M38 20 L34 26 L38 30" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Embryo silhouette inside */}
      <circle cx="30" cy="34" r="7" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M28 30 Q30 26 33 28" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Nest lines */}
      <path d="M8 50 Q20 46 30 50 Q40 54 52 50" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M12 54 Q25 50 35 54 Q45 58 50 54" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoExtinction({ size = 70, color = '#7D6B99', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Asteroid */}
      <circle cx="18" cy="14" r="8" fill={color} opacity="0.3" stroke={color} strokeWidth="1.2" />
      {/* Crater marks on asteroid */}
      <circle cx="15" cy="12" r="2" fill="none" stroke={color} strokeWidth="0.7" opacity="0.4" />
      <circle cx="21" cy="16" r="1.5" fill="none" stroke={color} strokeWidth="0.7" opacity="0.3" />
      {/* Impact trail */}
      <path d="M24 20 L50 50" stroke={color} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      <path d="M22 22 L46 52" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Debris */}
      <circle cx="35" cy="30" r="1" fill={color} opacity="0.4" />
      <circle cx="40" cy="38" r="1.5" fill={color} opacity="0.3" />
      <circle cx="30" cy="42" r="1" fill={color} opacity="0.35" />
      {/* Impact burst */}
      <path d="M48 48 L55 45 M48 48 L54 52 M48 48 L52 48" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'amos-cielo-mesozoico': [DecoWingMembrane, DecoSkull, DecoThermal],
  'pteranodon-planeador': [DecoSkull, DecoHollowBone, DecoThermal],
  'quetzalcoatlus-gigante': [DecoWingMembrane, DecoThermal, DecoSkull],
  'rhamphorhynchus-primitivos': [DecoHollowBone, DecoEggFossil, DecoWingMembrane],
  'mecanica-vuelo': [DecoWingMembrane, DecoHollowBone, DecoThermal],
  'huevos-crias-social': [DecoEggFossil, DecoSkull, DecoHollowBone],
  'fin-dinastia': [DecoExtinction, DecoWingMembrane, DecoEggFossil],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Witton, M.P. (2013). Pterosaurs: Natural History, Evolution, Anatomy. Princeton University Press',
  'Unwin, D.M. (2005). The Pterosaurs: From Deep Time. Pi Press / Penguin',
  'Lawson, D.A. (1975). Pterosaur from the Latest Cretaceous of West Texas: Discovery of the Largest Flying Creature. Science, 187(4180), 947–948',
  'Wang, X., Kellner, A.W.A., Jiang, S. et al. (2014). Sexually Dimorphic Tridimensionally Preserved Pterosaurs and Their Eggs from China. Current Biology, 24(12), 1323–1330',
  'Wellnhofer, P. (1991). The Illustrated Encyclopedia of Pterosaurs. Crescent Books',
  'Habib, M.B. (2008). Comparative Evidence for Quadrupedal Launch in Pterosaurs. Zitteliana, B28, 159–166',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'amos-cielo-mesozoico',
    title: 'Los Amos del Cielo Mesozoico',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/dinos_m5.png',
    image: '/assets/dinosaurios/dinos_m5.png',
    content: [
      'Los pterosaurios fueron los primeros vertebrados en desarrollar vuelo activo motorizado, un logro que alcanzaron al menos 70 millones de años antes de que las aves levantaran el vuelo. Aparecieron durante el Triásico Tardío, hace aproximadamente 228 millones de años, y prosperaron hasta el final del Cretácico hace 66 millones de años, abarcando un reinado aéreo de más de 160 millones de años. Pertenecen al clado Archosauria, el mismo grupo que incluye a los dinosaurios y los cocodrilos, pero no son dinosaurios: constituyen su propio orden, Pterosauria, descrito formalmente en 1834 por el naturalista Johann Jakob Kaup.',
      'A pesar de la confusión popular, los pterosaurios no comparten linaje directo con las aves. Las aves descienden de dinosaurios terópodos del grupo Maniraptora, mientras que los pterosaurios representan una rama del todo independiente del árbol evolutivo de los arcosaurios. Esta separación se produjo durante el Triásico Medio, hace unos 245 millones de años. Los pterosaurios desarrollaron sus propias soluciones anatómicas para el vuelo: una membrana de piel sostenida por un cuarto dedo hiperextendido, en contraste con las plumas y la estructura del ala de las aves, que dependen de los dedos segundo y tercero fusionados.',
      'El registro fósil de pterosaurios incluye más de 200 especies descritas hasta 2024, distribuidas en todos los continentes incluyendo la Antártida. Los especímenes más antiguos conocidos provienen de formaciones del Triásico en Italia y Austria, como el Eudimorphodon descubierto en 1973 cerca de Bérgamo, Italia, con una envergadura de apenas un metro. Estos primeros pterosaurios ya mostraban adaptaciones completas para el vuelo, lo que indica que la evolución del vuelo ocurrió aún antes, en un período del cual aún no tenemos fósiles claros.',
      'Los pterosaurios colonizaron nichos ecológicos muy diversos durante su larga historia. Algunos eran pescadores costeros, otros cazadores terrestres, filtradores de agua o carroñeros. Estudios isotópicos de sus huesos revelan que habitaban tanto costas marinas como interiores continentales, lagos de agua dulce y ambientes fluviales. Su diversidad morfológica es comparable a la de las aves modernas, con tamaños que van desde la envergadura de un gorrión hasta la de una avioneta Cessna de ala fija.',
      'El nombre "pterosaurio" proviene del griego pteron (ala) y sauros (lagarto), y fue acuñado en referencia al primer espécimen descrito científicamente: el Pterodactylus antiquus, hallado en las calizas litográficas de Solnhofen, Alemania, en 1784. Cosimo Alessandro Collini lo describió inicialmente sin comprender su naturaleza; fue Georges Cuvier quien en 1801 identificó correctamente al animal como un reptil volador, sentando las bases de la paleontología de los pterosaurios como disciplina científica formal.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer fósil de pterosaurio fue descubierto en las canteras de caliza de Solnhofen, Baviera, en 1784, décadas antes de que Richard Owen inventara la palabra "dinosaurio" en 1842. Durante años, los naturalistas no sabían qué era: algunos pensaban que era un animal marino, otros que era un murciélago prehistórico. Fue Georges Cuvier, el padre de la paleontología comparada, quien en 1801 reconoció que se trataba de un reptil volador, algo que nunca se había concebido antes en la historia de la ciencia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los análisis filogenéticos publicados en Nature (Nesbitt, 2011) y revisados por Ezcurra (2016) ubican a los pterosaurios como el grupo hermano de Dinosauromorpha dentro de Ornithodira. Esto significa que pterosaurios y dinosaurios comparten un ancestro común del Triásico Medio, pero divergieron antes de que los primeros dinosaurios verdaderos aparecieran. Lagerpeton y Dromomeron, pequeños arcosaurios bípedos del Triásico, se consideran cercanos a la base de esta divergencia según análisis de 2020.' },
    ],
    fact: 'El Caiuajara dobruskii, descubierto en Brasil en 2014 por Manzig et al., proporcionó evidencia directa de comportamiento gregario en pterosaurios: se hallaron más de 47 individuos de distintas edades en un solo yacimiento del Cretácico, desde juveniles con envergaduras de 65 centímetros hasta adultos de 2.35 metros. Este hallazgo, publicado en PLOS ONE, sugiere que al menos algunos pterosaurios vivían en colonias con estructura social, similar a las colonias de aves marinas actuales como los albatros.',
  },
  {
    id: 'pteranodon-planeador',
    title: 'Pteranodon: El Planeador',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/dinos_m5.png',
    image: '/assets/dinosaurios/dinos_m5.png',
    content: [
      'Pteranodon longiceps es uno de los pterosaurios más conocidos y mejor estudiados. Vivió durante el Cretácico Tardío, hace entre 86 y 84.5 millones de años, en lo que hoy es el centro de América del Norte. Con una envergadura promedio de 5.6 metros en machos y hasta 7.25 metros en los ejemplares más grandes, Pteranodon fue uno de los mayores animales voladores de su era. Su nombre significa "ala sin dientes", en referencia a la ausencia total de dentición, un rasgo que lo diferencia de muchos pterosaurios anteriores que poseían mandíbulas repletas de dientes.',
      'Los fósiles de Pteranodon fueron descubiertos por primera vez en 1870 por Othniel Charles Marsh en las formaciones de creta de Niobrara, Kansas, durante las famosas "Guerras de los Huesos" entre Marsh y Edward Drinker Cope. Hasta la fecha se han catalogado más de 1,100 especímenes, convirtiéndolo en el pterosaurio con el registro fósil más completo que existe. Las rocas donde se encuentran estos fósiles corresponden al Western Interior Seaway, un mar interior que dividía América del Norte en dos durante el Cretácico, lo que indica que Pteranodon era un animal primariamente marino.',
      'La cresta craneal de Pteranodon ha generado amplio debate científico. Los machos poseían crestas grandes y alargadas que se extendían hacia atrás, mientras que las hembras tenían crestas significativamente más pequeñas. Bennett (1992, 2001) demostró que esta diferencia representaba dimorfismo sexual, no especies distintas como se creía antes. Las crestas probablemente funcionaban como señales de reconocimiento entre individuos, indicadores de madurez sexual y posiblemente como estabilizadores aerodinámicos durante el vuelo, actuando como un timón vertical.',
      'La dieta de Pteranodon consistía principalmente en peces, como lo demuestran contenidos estomacales fosilizados encontrados en varios especímenes. Su pico largo y puntiagudo, carente de dientes, funcionaba de manera similar al de los pelícanos modernos: sumergía la cabeza en el agua mientras planeaba a baja altura sobre la superficie marina. Análisis biomecánicos de Bramwell y Whitfield (1974) calcularon que podía planear a velocidades de 15 a 30 km/h con un gasto energético mínimo, utilizando corrientes ascendentes sobre el océano de la misma forma que los albatros contemporáneos.',
      'Pteranodon pesaba entre 20 y 35 kilogramos pese a su enorme envergadura, gracias a un esqueleto neumático donde los huesos principales estaban huecos y conectados al sistema respiratorio. Las paredes de sus huesos largos medían apenas 1 a 2 milímetros de espesor, pero estaban reforzadas internamente con trabéculas óseas que distribuían las fuerzas mecánicas del vuelo. Este diseño estructural es tan eficiente que ingenieros aeronáuticos modernos lo han estudiado para aplicar principios similares en el diseño de estructuras ultraligeras para drones y aeronaves no tripuladas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Western Interior Seaway, el mar donde volaba Pteranodon, tenía entre 600 y 1,000 kilómetros de ancho y dividía América del Norte de norte a sur, desde el Ártico hasta el Golfo de México. Pteranodon debía cruzar distancias enormes sobre aguas abiertas para alimentarse. Estudios de 2010 por Habib estimaron que podía recorrer hasta 500 kilómetros sin detenerse, planeando sobre corrientes térmicas marinas como los albatros modernos que cruzan océanos enteros.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los más de 1,100 especímenes de Pteranodon catalogados lo convierten en el conjunto de datos más grande para cualquier pterosaurio. Chris Bennett analizó estadísticamente estos fósiles en su monografía de 2001 y concluyó que solo existían dos especies válidas: P. longiceps y P. sternbergi. Anteriormente se habían nombrado más de una docena de "especies" que resultaron ser variaciones individuales o diferencias de sexo y edad dentro de las mismas poblaciones.' },
    ],
    fact: 'En 1971, el paleontólogo Halsey Wilkinson Millerreportó un fósil de Pteranodon con restos de un pez de la especie Gillicus arcuatus preservados en la región estomacal. El pez medía aproximadamente 30 centímetros de largo. Este hallazgo, junto con otros contenidos estomacales descubiertos desde entonces, confirmó de forma directa que Pteranodon era un piscívoro activo y no un carroñero, resolviendo un debate que había durado más de 80 años entre los paleontólogos.',
  },
  {
    id: 'quetzalcoatlus-gigante',
    title: 'Quetzalcoatlus: El Gigante Volador',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/dinos_m5.png',
    image: '/assets/dinosaurios/dinos_m5.png',
    content: [
      'Quetzalcoatlus northropi ostenta el título del animal volador más grande que ha existido sobre la Tierra. Descubierto en 1971 por Douglas Lawson, entonces estudiante de geología en la Universidad de Texas, en el Parque Nacional Big Bend, Texas, sus restos fueron publicados en la revista Science en 1975. Su envergadura se estima entre 10 y 11 metros, comparable a la de una avioneta Cessna 172 Skyhawk. De pie sobre sus cuatro extremidades, alcanzaba una altura de 4.5 a 5 metros, similar a la de una jirafa adulta. Su nombre honra al dios mesoamericano Quetzalcóatl, la serpiente emplumada.',
      'La masa corporal de Quetzalcoatlus ha sido objeto de intenso debate científico. Las primeras estimaciones de Lawson (1975) sugerían entre 80 y 100 kilogramos, mientras que estudios posteriores de Witton y Habib (2010) recalcularon el peso entre 200 y 260 kilogramos, basándose en modelos volumétricos tridimensionales. Incluso con estas masas revisadas, Quetzalcoatlus era notablemente ligero para su tamaño gracias a huesos neumáticos con paredes de menos de 2 milímetros y un cráneo de más de 2 metros de largo que pesaba apenas unos pocos kilogramos gracias a amplias fenestras craneales.',
      'Habib (2008) propuso que los pterosaurios azhdárquidos como Quetzalcoatlus despegaban mediante un lanzamiento cuadrúpedo, usando las potentes extremidades anteriores para catapultarse al aire desde una posición en cuatro patas. Este mecanismo de despegue difiere radicalmente del de las aves, que despegan con las patas traseras. Los cálculos biomecánicos de Habib demostraron que los músculos de las extremidades anteriores de Quetzalcoatlus eran suficientes para generar la fuerza necesaria para un despegue exitoso, incluso desde terreno plano sin necesidad de carreras, pendientes o viento en contra.',
      'A diferencia de Pteranodon, Quetzalcoatlus no era un animal marino. Los sedimentos donde fue hallado corresponden a planicies aluviales interiores, lejos de cualquier costa. Witton y Naish (2008) propusieron que los azhdárquidos eran depredadores terrestres que patrullaban llanuras y riberas de ríos, cazando pequeños dinosaurios, mamíferos, lagartos y anfibios de manera análoga a como las cigüeñas marabú actuales cazan en las sabanas africanas. Su cuello largo y rígido, junto con un pico puntiagudo sin dientes, les permitía atrapar presas del tamaño de un perro con un movimiento rápido de la cabeza.',
      'Quetzalcoatlus vivió durante los últimos 2 millones de años del Cretácico, hace entre 68 y 66 millones de años, en la Formación Javelina de Texas. Fue contemporáneo de Tyrannosaurus rex, Alamosaurus y Triceratops. En 2021, la Sociedad de Paleontología de Vertebrados publicó una monografía definitiva sobre el género que incluía la descripción formal de una segunda especie más pequeña, Quetzalcoatlus lawsoni, con una envergadura de aproximadamente 5 metros, nombrada en honor a Douglas Lawson. Ambas especies coexistieron en el mismo ecosistema, probablemente ocupando nichos alimenticios distintos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El nombre específico "northropi" fue elegido por Lawson en honor a John Knudsen Northrop, fundador de la compañía aeronáutica Northrop Corporation y diseñador del avión ala volante YB-49. Lawson comparó las proporciones de Quetzalcoatlus con las del ala volante de Northrop, señalando similitudes en la relación entre envergadura y masa. La comparación resultó acertada: ambos diseños —el natural y el artificial— priorizan la superficie alar máxima con el mínimo peso estructural.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El modelo de lanzamiento cuadrúpedo de Habib (2008) resolvió un problema que había desconcertado a los paleontólogos durante décadas: ¿cómo podía despegar un animal de 250 kilogramos? Los cálculos mostraron que las extremidades anteriores de Quetzalcoatlus podían generar una fuerza de lanzamiento de hasta 2,400 newtons, suficiente para elevar al animal a una altura de 2.5 metros en el primer impulso. Desde allí, un par de aleteos lo llevarían a la altitud necesaria para comenzar a planear en corrientes térmicas.' },
    ],
    fact: 'En 1985, ingenieros de la NASA y la empresa AeroVironment construyeron una réplica robótica a escala real de Quetzalcoatlus llamada QN (Quetzalcoatlus Northropi), con una envergadura de 11 metros y un peso de 20 kilogramos. La réplica realizó un vuelo exitoso de 3 minutos sobre el Death Valley, California, alcanzando una altitud de 30 metros y una velocidad de 56 km/h. El proyecto demostró que las proporciones anatómicas de Quetzalcoatlus eran aerodinámicamente viables para el vuelo sostenido.',
  },
  {
    id: 'rhamphorhynchus-primitivos',
    title: 'Rhamphorhynchus y los Primitivos',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/dinos_m5.png',
    image: '/assets/dinosaurios/dinos_m5.png',
    content: [
      'Los pterosaurios del Jurásico representan la primera gran radiación evolutiva del grupo, y entre ellos destaca Rhamphorhynchus muensteri, uno de los pterosaurios mejor conservados gracias a las excepcionales calizas litográficas de Solnhofen, Alemania. Estos sedimentos de grano fino, depositados en lagunas tropicales poco profundas hace 150 millones de años, preservaron no solo los huesos sino también las membranas alares, los picnofibras (filamentos similares a pelo que cubrían el cuerpo) e incluso contenidos estomacales de estos animales con una resolución que permite ver estructuras de menos de un milímetro.',
      'Rhamphorhynchus tenía una envergadura de hasta 1.81 metros y se distinguía por su cola larga y rígida que terminaba en una estructura con forma de diamante o vela. Esta "vela caudal" estaba formada por tejido blando sostenido por tendones osificados, y probablemente funcionaba como estabilizador durante el vuelo, similar al empenaje de cola de un avión. Los estudios de Wellnhofer (1975) y posteriormente de Frey et al. (2003) demostraron que esta estructura reducía el cabeceo y la guiñada durante el planeo, proporcionando estabilidad direccional a velocidades bajas.',
      'Dimorphodon macronyx, otro pterosaurio primitivo descubierto por Mary Anning en los acantilados de Lyme Regis, Inglaterra, en 1828, poseía un cráneo proporcionalmente enorme para su cuerpo, con una longitud de 23 centímetros sobre un cuerpo de apenas un metro de envergadura. Sus mandíbulas portaban dos tipos distintos de dientes: dientes frontales grandes y puntiagudos, y dientes laterales más pequeños, lo que le da su nombre ("dos formas de dientes"). Estudios biomecánicos recientes sugieren que era un cazador terrestre ágil más que un volador especializado.',
      'El Eudimorphodon ranzii, descubierto en 1973 en los Alpes italianos por Rocco Zambelli, es uno de los pterosaurios más antiguos conocidos, datado en 228 millones de años (Triásico Tardío). Poseía una dentición compleja con más de 100 dientes multicúspides, similares a los de algunos peces, lo que sugiere una dieta piscívora confirmada por restos de escamas de pez encontrados en su cavidad abdominal. Su envergadura era de apenas un metro, pero ya mostraba todas las adaptaciones fundamentales para el vuelo activo que caracterizarían a los pterosaurios por los siguientes 160 millones de años.',
      'Las calizas de Solnhofen han producido otros pterosaurios notables como Pterodactylus antiquus, el primer pterosaurio descrito científicamente en 1784, y Scaphognathus crassirostris, cuyo cráneo preservado en tres dimensiones reveló detalles sobre el cerebro de los pterosaurios mediante tomografía computarizada. Estos estudios, realizados por Witmer et al. (2003), mostraron que los pterosaurios poseían lóbulos ópticos grandes (indicando visión aguda), un cerebelo expandido (coordinación motora para el vuelo) y un sistema vestibular sofisticado (sentido del equilibrio) comparable al de las aves modernas.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mary Anning, quien descubrió Dimorphodon en 1828, fue una de las paleontólogas más importantes de la historia a pesar de que, por ser mujer y de clase trabajadora, raramente recibió crédito formal por sus hallazgos. Anning también descubrió los primeros esqueletos completos de ictiosaurios y plesiosaurios. Vendía fósiles en la costa de Dorset, Inglaterra, para subsistir, y se cree que es el origen del trabalenguas inglés "She sells seashells by the seashore".' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las calizas litográficas de Solnhofen, formadas hace 150 millones de años en el archipiélago jurásico de la cuenca del Tetis, tienen un grano tan fino (menos de 4 micrómetros) que fueron utilizadas para la invención de la litografía por Alois Senefelder en 1796. Esta misma finura de grano es la que permite la preservación de tejidos blandos en los fósiles. Los depósitos de Solnhofen han producido más de 600 especímenes de pterosaurios, además del famoso Archaeopteryx.' },
    ],
    fact: 'En 2018, el paleontólogo Michael Benton y su equipo de la Universidad de Bristol publicaron un estudio en Nature Ecology & Evolution demostrando que los pterosaurios estaban cubiertos de picnofibras ramificadas, estructuras filamentosas funcionalmente análogas a las plumas de los dinosaurios. El estudio analizó especímenes de Anurognathus y otros pterosaurios del Jurásico usando microscopía electrónica de barrido, revelando al menos cuatro tipos morfológicos distintos de picnofibras, incluyendo algunas ramificadas de manera similar a las protoplumas de dinosaurios.',
  },
  {
    id: 'mecanica-vuelo',
    title: 'La Mecánica del Vuelo',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/dinos_m5.png',
    image: '/assets/dinosaurios/dinos_m5.png',
    content: [
      'La estructura alar de los pterosaurios era radicalmente distinta a la de las aves y los murciélagos. La membrana de vuelo, llamada patagio, se extendía desde el cuarto dedo enormemente elongado de la mano hasta el tobillo o la rodilla, dependiendo de la especie. Esta membrana estaba compuesta por múltiples capas de tejido: una epidermis externa, una red de fibras musculares llamadas actinofibrilas que daban rigidez estructural, vasos sanguíneos para termorregulación y una epidermis interna. Las actinofibrilas, con diámetros de 0.05 a 0.1 milímetros, estaban organizadas en patrones radiantes que permitían controlar la tensión y la curvatura del ala durante el vuelo.',
      'Un elemento anatómico exclusivo de los pterosaurios era el hueso pteroide, una estructura ósea única en el reino animal que se articulaba con la muñeca y se extendía hacia adelante, sosteniendo una membrana anterior llamada propatagio. Wilkinson et al. (2006) realizaron pruebas en túnel de viento con modelos a escala y demostraron que el propatagio actuaba como un flap de borde de ataque, aumentando la sustentación en un 30% a velocidades bajas y permitiendo ángulos de ataque más pronunciados sin entrar en pérdida aerodinámica, de manera análoga a los dispositivos hipersustentadores de los aviones modernos.',
      'Los huesos de los pterosaurios eran neumáticos: huecos y conectados al sistema de sacos aéreos a través de forámenes (pequeños orificios) en la superficie ósea. Claessens et al. (2009) demostraron mediante tomografía computarizada que incluso las falanges de los dedos y las vértebras cervicales eran neumáticas, algo que no ocurre ni en las aves modernas. Las paredes óseas de los pterosaurios grandes medían entre 1 y 3 milímetros de espesor, pero estaban reforzadas internamente con trabéculas óseas dispuestas en patrones que maximizaban la resistencia a la torsión y la flexión con el mínimo material posible.',
      'El sistema respiratorio de los pterosaurios empleaba un flujo de aire unidireccional a través de los pulmones, similar al de las aves modernas, permitiendo una extracción de oxígeno mucho más eficiente que el sistema bidireccional de los mamíferos. Los sacos aéreos no solo cumplían una función respiratoria sino que también reducían la densidad corporal total y contribuían a la termorregulación. Butler et al. (2009) calcularon que esta eficiencia respiratoria permitía a los pterosaurios grandes mantener la tasa metabólica elevada necesaria para el vuelo activo a pesar de su masa corporal considerable.',
      'Las técnicas de vuelo variaban según el tamaño del pterosaurio. Los pterosaurios pequeños como Anurognathus, con envergaduras de 50 centímetros, eran cazadores aéreos ágiles que capturaban insectos en vuelo con maniobras rápidas y aleteo continuo. Los pterosaurios medianos como Pteranodon alternaban entre aleteo y planeo según las condiciones atmosféricas. Los gigantes azhdárquidos como Quetzalcoatlus dependían casi exclusivamente del planeo en corrientes térmicas, con un radio de planeo estimado por Palmer (2011) de 20:1, es decir, avanzaban 20 metros por cada metro de altitud perdido, una eficiencia comparable a la de los planeadores deportivos modernos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los pterosaurios tenían un cuarto dedo que podía medir hasta 2.5 metros de largo en las especies gigantes, convirtiéndolo en el dedo más largo de cualquier animal en la historia de la vida. Los otros tres dedos de la mano eran pequeños y con garras, y quedaban libres fuera del ala, permitiendo al animal caminar, trepar e incluso manipular alimento. Cuando plegaban las alas, el cuarto dedo se doblaba hacia atrás a lo largo del cuerpo, como un paraguas cerrado.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El hueso pteroide no tiene equivalente en ningún otro vertebrado vivo o extinto. Su orientación exacta fue debatida durante décadas. Wilkinson et al. (2006) demostraron mediante reconstrucciones digitales y pruebas en túnel de viento que el pteroide se orientaba hacia adelante y ligeramente hacia arriba, tensando el propatagio como un slat de borde de ataque. Esta configuración aumentaba el coeficiente de sustentación máximo en un 30%, permitiendo vuelo controlado a velocidades tan bajas como 10 km/h.' },
    ],
    fact: 'En 2022, un equipo liderado por Hone y Henderson publicó en PeerJ un estudio que modeló por primera vez las cargas aerodinámicas sobre las alas de pterosaurios durante ráfagas de viento. Los resultados mostraron que las actinofibrilas de la membrana alar funcionaban como un sistema de tensado adaptativo: al cambiar la presión del viento, las fibras musculares se contraían o relajaban para modificar la curvatura del ala en tiempo real, evitando daños estructurales y optimizando la sustentación de manera más sofisticada que cualquier ala artificial fija diseñada hasta la fecha.',
  },
  {
    id: 'huevos-crias-social',
    title: 'Huevos, Crías y Vida Social',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/dinos_m5.png',
    image: '/assets/dinosaurios/dinos_m5.png',
    content: [
      'Los huevos de pterosaurio eran fundamentalmente distintos a los de los dinosaurios y las aves. Wang et al. (2004) describieron los primeros huevos de pterosaurio conocidos de la especie Pterodaustro guinazui en Argentina, y Wang et al. (2014) publicaron el descubrimiento más significativo en la revista Current Biology: un yacimiento en Hami, Xinjiang, China, que contenía cientos de huevos tridimensionalmente preservados del pterosaurio Hamipterus tianshanensis junto con embriones en distintas etapas de desarrollo y restos de adultos. Los huevos tenían cáscaras blandas y flexibles, similares a las de los reptiles modernos, no rígidas como las de las aves.',
      'Los embriones de Hamipterus revelaron que las crías de pterosaurio nacían con los huesos de las alas poco desarrollados, lo que indica que probablemente no podían volar inmediatamente después de la eclosión. Este hallazgo contradijo la hipótesis predominante de que las crías de pterosaurio eran "flaplings" — capaces de volar poco después de nacer. Wang et al. (2014) sugirieron que los juveniles requerían un período de cuidado parental, lo que implica un comportamiento social más complejo de lo que se asumía previamente para estos reptiles voladores.',
      'Pterodaustro guinazui, descubierto en Argentina por José Bonaparte en 1969 y descrito formalmente por él en 1970, es un pterosaurio notable por su sistema de alimentación por filtración. Su mandíbula inferior portaba más de 500 dientes filiformes, largos y flexibles, que funcionaban como las barbas de las ballenas: filtraban pequeños crustáceos, larvas de insectos y algas del agua de lagunas salobres del Cretácico Inferior. Los dientes superiores, mucho más cortos, aplastaban el alimento filtrado contra los dientes inferiores. Análisis químicos de sus huesos sugieren que, como los flamencos, su dieta rica en carotenoides podía colorear sus tejidos.',
      'La evidencia de comportamiento colonial en pterosaurios proviene de varios yacimientos. Además del sitio de Caiuajara en Brasil (47 individuos), los depósitos de Hamipterus en China contenían más de 200 huevos y huesos de individuos de todas las edades en un área de apenas 10 metros cuadrados. La acumulación de tantos individuos en un solo lugar sugiere que estos pterosaurios anidaban en colonias densas, probablemente cerca de cuerpos de agua, de manera similar a las colonias de flamencos, pelícanos y albatros en la actualidad.',
      'El dimorfismo sexual en pterosaurios ha sido documentado con evidencia directa. Algunos Pteranodon hembras fueron encontrados con huesos medulares, un tipo especial de hueso esponjoso dentro de los huesos largos que sirve como reserva de calcio para la formación de cáscaras de huevo y que solo se encuentra en hembras reproductivamente activas. Este mismo tipo de hueso medular existe en las aves hembras modernas. El hallazgo de hueso medular en pterosaurios confirmó que estas características reproductivas tienen un origen evolutivo compartido entre pterosaurios y dinosaurios dentro de los arcosaurios.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Pterodaustro guinazui tenía más de 500 dientes solo en su mandíbula inferior, más dientes que cualquier otro vertebrado conocido. Estos dientes no eran rígidos como los de los mamíferos sino flexibles y elásticos, formando una especie de cesta o cedazo que filtraba partículas del agua. El pterosaurio sumergía su mandíbula inferior en el agua mientras caminaba por lagunas poco profundas, barriendo de lado a lado como un flamenco alimentándose. Es el único pterosaurio con una adaptación de filtración tan especializada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El yacimiento de Hamipterus en la cuenca de Turpan-Hami, Xinjiang, China, ha producido más de 300 huevos fósiles de pterosaurio hasta 2019. Los análisis de tomografía computarizada de los embriones, publicados por Wang et al. en Science (2017), revelaron que los fémures estaban más desarrollados que los húmeros, indicando que las crías caminaban antes de volar. La estructura histológica de los huesos embrionarios mostró crecimiento rápido similar al de aves precociales como los pollos, pero con una osificación alar retrasada.' },
    ],
    fact: 'En 2004, Chiappe et al. describieron en Nature el primer embrión de pterosaurio encontrado dentro de un huevo, perteneciente a Pterodaustro guinazui de la Formación Lagarcito en San Luis, Argentina. El embrión, datado en 105 millones de años, mostraba huesos alares con menos del 40% de osificación comparado con los adultos, pero extremidades posteriores casi del todo desarrolladas. Este descubrimiento fue la primera prueba directa de que al menos algunos pterosaurios necesitaban cuidado parental post-eclosión.',
  },
  {
    id: 'fin-dinastia',
    title: 'El Fin de una Dinastía',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/dinos_m5.png',
    image: '/assets/dinosaurios/dinos_m5.png',
    content: [
      'La extinción de los pterosaurios coincidió con el evento de extinción masiva del Cretácico-Paleógeno (K-Pg) hace 66 millones de años, el mismo evento que acabó con los dinosaurios no avianos, los mosasaurios, los plesiosaurios y aproximadamente el 76% de todas las especies del planeta. El impacto del asteroide Chicxulub, un cuerpo de 10 a 12 kilómetros de diámetro que golpeó lo que hoy es la península de Yucatán, México, desencadenó una cadena de catástrofes: tsunamis de cientos de metros, incendios forestales globales, un "invierno de impacto" que bloqueó la luz solar durante meses y una caída drástica de las temperaturas.',
      'Sin embargo, la diversidad de los pterosaurios ya había declinado significativamente antes del impacto. Estudios de Longrich, Martill y Andres (2018), publicados en PLOS Biology, identificaron que durante los últimos 15 millones de años del Cretácico solo sobrevivían unas pocas familias de pterosaurios, principalmente los azhdárquidos de gran tamaño como Quetzalcoatlus, Hatzegopteryx y Arambourgiania. Los pterosaurios de tamaño pequeño y mediano habían desaparecido progresivamente, posiblemente desplazados por la creciente radiación de las aves del grupo Enantiornithes y Ornithuromorpha.',
      'Hatzegopteryx thambema, descubierto en la Isla de Hateg en Rumania (actual Transilvania) por Buffetaut et al. en 2002, fue uno de los últimos pterosaurios en existir. Con una envergadura estimada de 10 a 12 metros, rivalizaba con Quetzalcoatlus en tamaño. Lo peculiar de Hatzegopteryx es que habitaba una isla donde los dinosaurios eran enanos (fenómeno de nanismo insular), convirtiendo a este pterosaurio gigante en el depredador apex del ecosistema, cazando dinosaurios hadrosaurios enanos y titanosaurios juveniles que medían apenas dos metros de largo.',
      'Arambourgiania philadelphiae, descubierto originalmente en Jordania en 1943 por Camille Arambourg, es otro de los últimos pterosaurios gigantes. Su húmero fosilizado medía 62 centímetros de largo, lo que sugiere una envergadura de 7 a 13 metros dependiendo del modelo de reconstrucción utilizado. Junto con Quetzalcoatlus y Hatzegopteryx, estos tres géneros representan la última generación de pterosaurios, todos azhdárquidos de tamaño descomunal que sobrevivieron hasta el final del Cretácico mientras sus parientes de menor tamaño habían desaparecido millones de años antes.',
      'Tras la extinción de los pterosaurios hace 66 millones de años, los cielos del planeta quedaron vacíos de vertebrados voladores grandes durante millones de años. Las aves supervivientes del impacto K-Pg eran todas de tamaño pequeño a mediano, y la recuperación de la diversidad aviar tomó entre 5 y 10 millones de años según el registro fósil del Paleoceno. Finalmente, durante el Eoceno (hace 50-40 millones de años), aparecieron aves gigantes como Pelagornis, con envergaduras de 5 a 7 metros, llenando parcialmente el nicho ecológico que los pterosaurios habían dejado vacante, aunque ningún ave ha igualado jamás la envergadura de los azhdárquidos del Cretácico.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cráter de Chicxulub tiene 180 kilómetros de diámetro y se descubrió gracias a anomalías gravitacionales detectadas por prospección petrolera en los años 1970. Luis y Walter Álvarez propusieron la hipótesis del impacto en 1980 basándose en una capa de iridio (un elemento raro en la Tierra pero común en asteroides) encontrada en sedimentos de 66 millones de años en todo el planeta. El cráter fue confirmado en 1991 por Hildebrand et al., resolviendo uno de los mayores misterios de la paleontología.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Longrich, Martill y Andres (2018) analizaron el registro fósil global de pterosaurios de los últimos 20 millones de años del Cretácico e identificaron solo 6 géneros válidos sobrevivientes al momento del impacto K-Pg, todos pertenecientes a la familia Azhdarchidae. Los géneros de pterosaurios con dientes habían desaparecido 20 millones de años antes, y los pteranodóntidos 15 millones de años antes. Esta reducción progresiva sugiere que la competencia con las aves fue un factor importante en el declive de los pterosaurios.' },
    ],
    fact: 'Hatzegopteryx, uno de los últimos pterosaurios, vivía en lo que era una isla aislada en el archipiélago europeo del Cretácico Tardío (la actual Rumania). En este ecosistema insular, los dinosaurios saurópodos y hadrosaurios habían evolucionado hacia formas enanas por el efecto de insularidad, midiendo apenas 2 a 3 metros de largo. Naish y Witton (2017) propusieron en PeerJ que Hatzegopteryx ocupaba el rol de depredador dominante en la isla, reemplazando a los terópodos carnívoros que estaban ausentes, convirtiendo a un pterosaurio en el equivalente funcional de un T. rex en miniatura.',
  },
];

// ─── Prehistoric Sky Field (Canvas Background) ──────────────────────────────
function PrehistoricSkyField() {
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
      hue: Math.random() > 0.5 ? '93,138,104' : '193,120,41', // teal or sienna
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

// ─── Pterosaur Header ────────────────────────────────────────────────────────
function PterosaurHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Sky arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#pteroGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5D8A68','#C17829','#6B8E96','#8B5E3C','#A67B3D','#7D6B99','#3E7C8B'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wing icon */}
        <path d="M280 30 Q290 20 300 25 Q310 20 320 30 L310 32 Q300 28 290 32 Z" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="30" r="3" fill="#5D8A68" opacity="0.5" />
        <defs>
          <linearGradient id="pteroGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(93,138,104,0.9)" />
            <stop offset="100%" stopColor="rgba(93,138,104,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5D8A68" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">PTEROSAURIOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(93,138,104,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LOS DUEÑOS DEL CIELO MESOZOICO</text>
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
        border: `3px solid ${isActive ? node.color : 'rgba(93,138,104,0.2)'}`,
        boxShadow: isActive
          ? `0 0 20px ${node.color}50, 0 0 40px ${node.color}20, inset 0 0 15px ${node.color}30`
          : '0 4px 15px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={node.btnImage} alt={node.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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
          layoutId="activeDotDinosM5"
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

// ─── Magazine-Style Content Panel ──────────────────────────────────────────
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
              <img src={node.btnImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
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

        {/* ─── Video Player ─── */}
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

// ─── Progress Bar ────────────────────────────────────────────────────────────
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(93,138,104,0.15)',
    }}>
      <Star size={14} style={{ color: '#5D8A68', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5D8A68, #C17829)', borderRadius: '3px', boxShadow: '0 0 8px rgba(93,138,104,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5D8A68', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_DinosM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/dinosaurios/dinos_m5.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(93,138,104,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <PrehistoricSkyField />

      <PterosaurHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(93,138,104,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(93,138,104,0.08)', borderRadius: '16px',
              border: '1px solid rgba(93,138,104,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5D8A68', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de los Pterosaurios!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Vigía del Cielo
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
