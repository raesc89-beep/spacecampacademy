'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';
// ——— SVG Decorative Elements (Armored Herbivore themed) ————————————————————————

function DecoShield({ size = 70, color = '#5D8A68', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Shield outline */}
      <path d="M30 6 L50 16 L50 34 Q50 48 30 56 Q10 48 10 34 L10 16 Z" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M30 14 L44 22 L44 34 Q44 44 30 50 Q16 44 16 34 L16 22 Z" fill={color} opacity="0.15" />
      {/* Armor plate lines */}
      <line x1="30" y1="14" x2="30" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="16" y1="28" x2="44" y2="28" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Rivets */}
      <circle cx="23" cy="21" r="1.5" fill={color} opacity="0.4" />
      <circle cx="37" cy="21" r="1.5" fill={color} opacity="0.4" />
      <circle cx="23" cy="38" r="1.5" fill={color} opacity="0.4" />
      <circle cx="37" cy="38" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoHorn({ size = 70, color = '#C17829', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Three horns */}
      <path d="M30 8 L28 28 L32 28 Z" fill={color} opacity="0.35" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      <path d="M16 18 L14 32 L22 30 Z" fill={color} opacity="0.25" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      <path d="M44 18 L46 32 L38 30 Z" fill={color} opacity="0.25" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      {/* Frill arc */}
      <path d="M12 36 Q20 28 30 30 Q40 28 48 36" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M10 42 Q20 34 30 36 Q40 34 50 42" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Scalloped edge */}
      {[14, 22, 30, 38, 46].map((x, i) => (
        <circle key={i} cx={x} cy={44} r="2" fill={color} opacity="0.3" />
      ))}
    </svg>
  );
}

function DecoBone({ size = 80, color = '#6B8E96', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Femur bone shape */}
      <path d="M15 12 Q10 8 8 12 Q6 16 12 18 L14 18 L14 22 L12 22 Q6 24 8 28 Q10 32 15 28 L18 25 L62 25 L65 28 Q70 32 72 28 Q74 24 68 22 L66 22 L66 18 L68 18 Q74 16 72 12 Q70 8 65 12 L62 15 L18 15 Z"
        fill={color} opacity="0.2" stroke={color} strokeWidth="1" />
      {/* Cross-section marks */}
      <line x1="30" y1="15" x2="30" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="50" y1="15" x2="50" y2="25" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoTailClub({ size = 60, color = '#8B5E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Tail segments */}
      <path d="M8 30 L20 28 L32 26 L40 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      {/* Club head */}
      <ellipse cx="46" cy="24" rx="10" ry="8" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5" />
      <ellipse cx="46" cy="24" rx="6" ry="5" fill={color} opacity="0.15" />
      {/* Osteoderms */}
      <circle cx="14" cy="22" r="2" fill={color} opacity="0.3" />
      <circle cx="22" cy="20" r="2.5" fill={color} opacity="0.3" />
      <circle cx="14" cy="38" r="2" fill={color} opacity="0.25" />
      <circle cx="26" cy="36" r="1.5" fill={color} opacity="0.25" />
      {/* Impact lines */}
      <line x1="54" y1="18" x2="58" y2="14" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="56" y1="24" x2="60" y2="24" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="54" y1="30" x2="58" y2="34" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoLeaf({ size = 70, color = '#A67B3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Leaf shape */}
      <path d="M30 8 Q45 20 42 35 Q38 48 30 54 Q22 48 18 35 Q15 20 30 8 Z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      {/* Central vein */}
      <line x1="30" y1="12" x2="30" y2="50" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Side veins */}
      <path d="M30 20 Q36 22 38 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 20 Q24 22 22 26" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 30 Q37 32 39 36" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 30 Q23 32 21 36" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 40 Q34 42 36 44" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M30 40 Q26 42 24 44" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoDomeSkull({ size = 60, color = '#7D6B99', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Dome */}
      <path d="M15 38 Q15 12 30 10 Q45 12 45 38" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      {/* Dome thickening layers */}
      <path d="M20 38 Q20 18 30 16 Q40 18 40 38" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M24 38 Q24 22 30 20 Q36 22 36 38" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Jaw line */}
      <path d="M15 38 Q22 44 30 44 Q38 44 45 38" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Nodules */}
      {[17, 22, 27, 33, 38, 43].map((x, i) => (
        <circle key={i} cx={x} cy={40 + (i % 2) * 2} r="1.5" fill={color} opacity="0.35" />
      ))}
      {/* Eye */}
      <circle cx="24" cy="32" r="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="24" cy="32" r="1" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'estrategia-defensa': [DecoShield, DecoTailClub, DecoBone],
  'ankylosaurus-fortaleza': [DecoTailClub, DecoShield, DecoBone],
  'triceratops-defensor': [DecoHorn, DecoShield, DecoBone],
  'pachycephalosaurus-cabezas': [DecoDomeSkull, DecoShield, DecoBone],
  'hadrosaurios-pico': [DecoBone, DecoLeaf, DecoShield],
  'plantas-herbivoros': [DecoLeaf, DecoBone, DecoHorn],
  'defensas-mundo-actual': [DecoShield, DecoLeaf, DecoTailClub],
};

// ——— Content Data ————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Brusatte, S. (2018). The Rise and Fall of the Dinosaurs: A New History of a Lost World, William Morrow',
  'Arbour, V. M. & Currie, P. J. (2016). Systematics, phylogeny and palaeobiogeography of the ankylosaurid dinosaurs, Journal of Systematic Palaeontology, 14(5)',
  'Horner, J. R., Goodwin, M. B. & Myhrvold, N. (2011). Dinosaur Census Reveals Abundance Was Linked to Body Size, PLOS ONE, 6(8)',
  'Dodson, P. (1996). The Horned Dinosaurs: A Natural History, Princeton University Press',
  'Snively, E. & Cox, A. (2008). Structural Mechanics of Pachycephalosaur Crania, The Anatomical Record, 291(11)',
  'Prieto-Márquez, A. (2010). Global phylogeny of Hadrosauridae, Zoological Journal of the Linnean Society, 159(2)',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'estrategia-defensa',
    title: 'La Estrategia de la Defensa',
    color: '#5D8A68',
    btnImage: '/assets/dinosaurios/infographic_m4/btn_estrategia-defensa.jpg',
    image: '/assets/dinosaurios/infographic_m4/hero_estrategia-defensa.jpg',
    content: [
      'Durante el Mesozoico, los dinosaurios herbívoros enfrentaron una presión constante por parte de depredadores cada vez más grandes y eficientes. Los terópodos como el Allosaurus en el Jurásico y el Tyrannosaurus rex en el Cretácico desarrollaron mandíbulas con fuerzas de mordida de hasta 57,000 newtons, dientes aserrados y velocidades estimadas de 20 a 30 km/h. Ante esta amenaza persistente, los herbívoros no permanecieron pasivos: a lo largo de millones de años, la selección natural favoreció el desarrollo de estructuras defensivas cada vez más sofisticadas, desde placas óseas y cuernos hasta colas convertidas en armas contundentes.',
      'La carrera armamentística entre depredadores y presas es un principio fundamental de la biología evolutiva conocido como coevolución antagónica. Cuando un depredador desarrolla una ventaja, como mandíbulas más fuertes, las presas que poseen alguna defensa contra esa ventaja sobreviven y se reproducen con mayor frecuencia. Con el tiempo, esto genera poblaciones enteras de herbívoros con armaduras más gruesas, cuernos más largos o comportamientos defensivos más complejos. Este proceso, descrito formalmente por Leigh Van Valen en 1973 como la hipótesis de la Reina Roja, explica por qué ambos grupos parecen evolucionar sin detenerse nunca.',
      'Los paleontólogos han identificado al menos cuatro estrategias defensivas principales entre los dinosaurios herbívoros del Mesozoico. Primera: la armadura corporal, presente en anquilosaurios y nodosaurios, que consistía en osteodermos (placas óseas incrustadas en la piel) que formaban un escudo casi impenetrable. Segunda: las armas ofensivas-defensivas como los cuernos de los ceratopsianos y las colas con mazas de los anquilosaurios, que podían infligir daño directo al atacante. Tercera: el tamaño corporal masivo de los saurópodos, que los hacía difíciles de derribar. Y cuarta: la vida en manada y la vigilancia colectiva que practicaban los hadrosaurios.',
      'El registro fósil proporciona evidencia directa de estas interacciones depredador-presa. En 2010, un equipo de la Universidad de Alberta documentó marcas de mordida de tiranosaurio en la armadura de un Euoplocephalus, demostrando que los depredadores atacaban a estos herbívoros blindados. Otras marcas de mordida curadas (es decir, huesos que sanaron después del ataque) indican que algunos herbívoros sobrevivían a los ataques gracias a sus defensas, lo cual confirma la efectividad de sus adaptaciones protectoras contra depredadores reales y no solo teóricos.',
      'Las estrategias defensivas no surgieron de forma aislada, sino que evolucionaron en contextos ecológicos específicos. Los anquilosaurios alcanzaron su mayor diversidad en los ecosistemas del Cretácico tardío de América del Norte y Asia, donde coexistían con grandes tiranosaurios. Los ceratopsianos dominaron las llanuras aluviales de lo que hoy es el oeste de Norteamérica. Esta distribución geográfica y temporal sugiere que la presencia de depredadores específicos fue un factor determinante en la evolución de cada tipo particular de defensa, creando un mosaico de adaptaciones que variaba según la región y la época geológica.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El concepto de carrera armamentística evolutiva fue formalizado por el biólogo Leigh Van Valen en 1973, inspirándose en el personaje de la Reina Roja de Lewis Carroll en "A Través del Espejo". La Reina Roja le dice a Alicia: "Aquí hace falta correr todo lo que puedas para permanecer en el mismo sitio". Del mismo modo, depredadores y presas deben evolucionar constantemente solo para mantener su posición relativa en el ecosistema, sin ganar ventaja permanente.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los estudios de biomecánica realizados por Karl Bates y Peter Falkingham en 2012 calcularon que el Tyrannosaurus rex poseía la mordida más fuerte de cualquier animal terrestre conocido: entre 35,000 y 57,000 newtons. Para contextualizar, un cocodrilo del Nilo moderno muerde con aproximadamente 22,000 newtons, y un león con apenas 4,500 newtons. Esta fuerza era suficiente para triturar hueso, lo que explica la necesidad evolutiva de armaduras cada vez más resistentes en los herbívoros.' },
    ],
    fact: 'En la Formación Dinosaur Park de Alberta, Canadá, que data de hace 76.5 a 74.8 millones de años, los paleontólogos han encontrado restos de al menos 14 especies diferentes de dinosaurios herbívoros blindados o con cuernos coexistiendo en el mismo ecosistema. Esta diversidad sugiere que cada especie ocupaba un nicho ecológico ligeramente diferente, alimentándose de distintas plantas a diferentes alturas, lo que les permitía compartir el mismo hábitat sin competir directamente entre sí.',
  },
  {
    id: 'ankylosaurus-fortaleza',
    title: 'Ankylosaurus: La Fortaleza Viviente',
    color: '#C17829',
    btnImage: '/assets/dinosaurios/infographic_m4/btn_ankylosaurus-fortaleza.jpg',
    image: '/assets/dinosaurios/infographic_m4/hero_ankylosaurus-fortaleza.jpg',
    content: [
      'El Ankylosaurus magniventris fue el tanque definitivo del Cretácico tardío. Descubierto por Barnum Brown en la Formación Hell Creek de Montana en 1908, este dinosaurio medía entre 6 y 8 metros de largo, alcanzaba 1.7 metros de alto y pesaba entre 4,800 y 8,000 kilogramos según las estimaciones más recientes. Su cuerpo entero, desde la parte superior de la cabeza hasta la punta de la cola, estaba cubierto por hileras de osteodermos: placas óseas de diversos tamaños incrustadas directamente en la piel que formaban un mosaico protector continuo. Incluso sus párpados tenían placas óseas, proporcionando protección ocular durante los ataques.',
      'La característica más distintiva del Ankylosaurus era su maza caudal: una estructura formada por las últimas vértebras de la cola fusionadas en un mango rígido que sostenía dos grandes osteodermos laterales soldados entre sí. Victoria Arbour y Philip Currie, de la Universidad de Alberta, publicaron en 2016 un estudio detallado de la biomecánica de esta arma. La maza medía aproximadamente 60 centímetros de ancho y pesaba alrededor de 15 kilogramos. Los músculos caudofemorales que movían la cola podían generar una fuerza de impacto estimada en 362 kilogramos-fuerza, suficiente para fracturar huesos de un depredador tan robusto como un tiranosaurio.',
      'Los osteodermos del Ankylosaurus no eran simples placas sólidas de hueso. Estudios histológicos realizados por Torsten Scheyer en 2007 revelaron que estas estructuras tenían una arquitectura interna compleja, con fibras de colágeno organizadas en patrones entrecruzados similares al Kevlar utilizado en los chalecos antibalas modernos. Esta disposición les proporcionaba resistencia tanto a la compresión (mordidas) como a la tensión (desgarros). La capa externa estaba recubierta de queratina, la misma proteína que forma las uñas humanas, añadiendo una capa adicional de protección contra la abrasión.',
      'A pesar de su armadura robusta, el Ankylosaurus tenía vulnerabilidades estratégicas. Su vientre carecía de osteodermos y era relativamente blando, lo que significaba que un depredador que lograra voltear al animal podría acceder a esta zona desprotegida. Los paleontólogos han debatido si los tiranosaurios utilizaban esta estrategia. Sin embargo, con un peso de varias toneladas y un centro de gravedad bajo, voltear a un Ankylosaurus adulto habría sido una tarea extremadamente difícil para cualquier depredador. Su postura ancha y baja, con patas cortas y robustas, lo anclaba firmemente al suelo.',
      'La alimentación del Ankylosaurus también revela adaptaciones interesantes. Sus dientes eran pequeños y en forma de hoja, inadecuados para masticar plantas duras. Los paleontólogos creen que este herbívoro se alimentaba principalmente de vegetación baja, helechos y plantas con flores que no requerían masticación intensiva. Su cráneo ancho y su hocico amplio le permitían abarcar grandes cantidades de vegetación en cada bocado. Estudios de tomografía computarizada del cráneo han revelado pasajes nasales muy complejos y sinuosos que podrían haber servido para regular la temperatura cerebral, humidificar el aire inhalado o producir sonidos de comunicación de baja frecuencia.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La maza caudal del Ankylosaurus evolucionó gradualmente a lo largo de millones de años. Los anquilosaurios más primitivos, como el Gobisaurus del Cretácico medio de China, tenían colas flexibles sin maza. Especies intermedias como el Pinacosaurus mostraban vértebras caudales parcialmente fusionadas pero sin osteodermos laterales grandes. Solo los anquilosaurios más derivados, como Ankylosaurus y Anodontosaurus, desarrollaron la maza completamente formada, lo que demuestra un proceso evolutivo gradual que tomó aproximadamente 40 millones de años.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Victoria Arbour calculó en su estudio de 2009 que la cola del Ankylosaurus podía girar en un arco de aproximadamente 100 grados, cubriendo un área defensiva considerable detrás y a los costados del animal. La velocidad de impacto de la maza se estimó entre 15 y 25 metros por segundo. Para comparar, un bateador profesional de béisbol golpea la pelota a unos 40 metros por segundo. El golpe de la maza caudal era más lento pero con una masa mucho mayor, generando una fuerza destructiva comparable a la de un martillo industrial.' },
    ],
    fact: 'En 2017, un grupo de mineros en Alberta, Canadá, descubrió accidentalmente el fósil de nodosaurio mejor preservado del mundo, ahora exhibido en el Museo Royal Tyrrell. Este espécimen, bautizado como Borealopelta markmitchelli, conserva la piel, los osteodermos y hasta rastros de pigmentación original. El análisis químico de los melanosomas preservados reveló que el animal tenía un patrón de coloración llamado contrasombreado: oscuro por arriba y claro por abajo, igual que muchos animales modernos. Esto sugiere que, a pesar de su armadura, estos dinosaurios aún necesitaban camuflaje para evitar depredadores.',
  },
  {
    id: 'triceratops-defensor',
    title: 'Triceratops: El Defensor con Cuernos',
    color: '#6B8E96',
    btnImage: '/assets/dinosaurios/infographic_m4/btn_triceratops-defensor.jpg',
    image: '/assets/dinosaurios/infographic_m4/hero_triceratops-defensor.jpg',
    content: [
      'Triceratops horridus es uno de los dinosaurios más reconocidos del mundo y uno de los últimos ceratopsianos en existir antes de la extinción masiva hace 66 millones de años. Su nombre significa "cara de tres cuernos", una descripción directa de su rasgo más notable: dos cuernos supraorbitales sobre los ojos que podían medir hasta 1 metro de largo y un cuerno nasal más corto de unos 15 centímetros. Descubierto por Othniel Charles Marsh en 1889 en la Formación Lance de Wyoming, el Triceratops medía entre 7.9 y 9 metros de largo, alcanzaba unos 3 metros de alto y pesaba entre 6,000 y 12,000 kilogramos según las estimaciones de Gregory Paul publicadas en 2010.',
      'La gola o volante óseo del Triceratops ha sido objeto de intenso debate científico durante más de un siglo. Esta estructura semicircular que se extendía desde la parte posterior del cráneo medía hasta 2 metros de ancho. Durante décadas se asumió que servía principalmente como escudo protector contra mordidas de tiranosaurios. Sin embargo, Andrew Farke y colegas publicaron en 2009 un análisis de patologías craneales que reveló que las lesiones más frecuentes aparecían en los cuernos, no en la gola, sugiriendo que los Triceratops usaban sus cuernos en combates intraespecíficos, posiblemente por territorio o parejas.',
      'La Formación Hell Creek, que abarca partes de Montana, Dakota del Norte, Dakota del Sur y Wyoming, ha producido más fósiles de Triceratops que de cualquier otro dinosaurio. Peter Dodson estimó en 1996 que el Triceratops constituía hasta el 40 por ciento de la fauna de dinosaurios en este ecosistema del Cretácico tardío. Esta abundancia sugiere que vivía en grandes grupos o manadas dispersas, un comportamiento que habría proporcionado protección adicional contra depredadores. Se han encontrado lechos óseos con múltiples individuos de diferentes edades, desde crías de 1 metro hasta adultos completos.',
      'El Triceratops coexistió directamente con el Tyrannosaurus rex, y el registro fósil documenta sus interacciones violentas. En 1997, Gregory Erickson describió un cuerno de Triceratops con marcas de mordida de tiranosaurio que mostraban signos de curación ósea, lo que demuestra que el Triceratops sobrevivió al ataque. Otros especímenes muestran golas con perforaciones que coinciden con los dientes de T. rex. Estos hallazgos confirman que la relación depredador-presa entre ambas especies era real y frecuente, no simplemente una reconstrucción especulativa basada en su coexistencia temporal.',
      'Dentro de la familia Ceratopsidae, el Triceratops representa solo una rama de un grupo notablemente diverso. Sus parientes incluyen al Styracosaurus, con seis largos cuernos en la gola; al Pachyrhinosaurus, que en lugar de cuernos tenía protuberancias óseas rugosas llamadas bosses nasales; y al Kosmoceratops, descubierto en Utah en 2010, que ostenta el récord de 15 cuernos y protuberancias en su cráneo, más que cualquier otro dinosaurio conocido. Esta variedad de ornamentación sugiere que los cuernos y golas servían también como señales de reconocimiento entre especies y como indicadores de aptitud reproductiva dentro de cada especie.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Durante años existió un debate sobre si el Torosaurus era en realidad un Triceratops adulto. John Scannella y Jack Horner propusieron en 2010 que el Torosaurus, con su gola más grande y perforada, representaba simplemente la etapa de madurez final del Triceratops. Sin embargo, estudios posteriores de Nicolas Longrich y Daniel Field en 2012 encontraron evidencia de Torosaurus juveniles, lo que indicaría que son géneros separados. El debate continúa entre paleontólogos sin resolución definitiva hasta la fecha.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El pico del Triceratops era una estructura queratinosa similar al pico de un loro moderno, pero mucho más robusto. Detrás del pico, el Triceratops poseía entre 400 y 800 dientes organizados en baterías dentales que se reemplazaban continuamente. Estos dientes podían cortar plantas fibrosas como las palmeras y cícadas del Cretácico tardío. Un estudio de desgaste dental publicado por Varriale en 2016 demostró que el Triceratops masticaba con un movimiento lateral, similar al de las vacas modernas, procesando eficientemente vegetación dura.' },
    ],
    fact: 'El cráneo del Triceratops es uno de los más grandes de cualquier animal terrestre que haya existido, midiendo hasta 2.5 metros de largo, lo que representa aproximadamente un tercio de la longitud total del cuerpo. Para soportar este peso, las primeras tres vértebras cervicales del Triceratops estaban fusionadas en una estructura llamada sincervical, que proporcionaba el soporte necesario. El paleontólogo Othniel Charles Marsh inicialmente confundió el primer fósil de Triceratops descubierto en 1887 con un bisonte prehistórico, clasificándolo como "Bison alticornis". No fue hasta 1889 que reconoció su error al recibir un cráneo más completo.',
  },
  {
    id: 'pachycephalosaurus-cabezas',
    title: 'Pachycephalosaurus: Cabezas Duras',
    color: '#8B5E3C',
    btnImage: '/assets/dinosaurios/infographic_m4/btn_pachycephalosaurus-cabezas.jpg',
    image: '/assets/dinosaurios/infographic_m4/hero_pachycephalosaurus-cabezas.jpg',
    content: [
      'El Pachycephalosaurus wyomingensis fue el más grande de los paquicefalosaurios, un grupo de dinosaurios bípedos herbívoros u omnívoros cuya característica más notable era un domo de hueso sólido en la parte superior del cráneo. Este domo podía alcanzar los 25 centímetros de grosor en individuos adultos, rodeado por una corona de pequeños nódulos y espinas óseas. El Pachycephalosaurus medía aproximadamente 4.5 metros de largo y pesaba alrededor de 450 kilogramos. Vivió durante el Cretácico tardío, hace unos 70 a 66 millones de años, en lo que hoy es América del Norte, y fue descrito por primera vez por Barnum Brown y Erich Schlaikjer en 1943.',
      'La hipótesis más popular sobre la función del domo craneal es que servía para cabezazos intraespecíficos, similar a lo que hacen los carneros y bueyes almizcleros modernos. Sin embargo, Eric Snively y Andrew Cox publicaron en 2008 un estudio biomecánico detallado que cuestionó esta idea. Utilizando modelos de elementos finitos, demostraron que la forma redondeada del domo haría que las cabezas se deslizaran durante un impacto frontal, potencialmente causando lesiones en el cuello. Propusieron en cambio que los Pachycephalosaurus podrían haber golpeado los flancos de sus rivales con la cabeza, similar a como las jirafas usan sus cuellos para golpearse lateralmente.',
      'Mark Goodwin y John Horner aportaron evidencia adicional al debate en 2004, cuando examinaron la microestructura del domo craneal utilizando cortes histológicos. Descubrieron que el hueso del domo estaba compuesto por tejido óseo esponjoso cubierto por una capa cortical relativamente delgada. Este tipo de estructura, según argumentaron, no sería óptima para absorber impactos repetidos, ya que el hueso esponjoso podría fracturarse internamente. Sin embargo, investigadores como Joseph Peterson respondieron que las lesiones craneales encontradas en varios especímenes, publicadas en 2013 en la revista PLOS ONE, son consistentes con traumatismos por impacto.',
      'Otra línea de investigación ha propuesto que el domo servía principalmente para exhibición visual y reconocimiento entre especies. Los paquicefalosaurios presentaban una variedad de formas de domo: desde el domo alto y redondeado del Pachycephalosaurus, hasta la forma plana y ornamentada del Stegoceras, y la estructura aplanada con espinas del Stygimoloch. Jack Horner propuso en 2009 que Stygimoloch y Dracorex podrían ser juveniles de Pachycephalosaurus, con los domos aplanándose y expandiéndose durante el crecimiento. Cortes histológicos mostraron que los cráneos de Stygimoloch y Dracorex estaban formados por tejido óseo inmaduro.',
      'Los paquicefalosaurios no se limitaban a América del Norte. Se han encontrado fósiles en Asia, incluyendo al Homalocephale de Mongolia y al Wannanosaurus de China. Prenocephale, también de Mongolia, es notable por poseer uno de los cráneos mejor preservados del grupo, lo que ha permitido estudios detallados de su cavidad cerebral mediante tomografía computarizada. Estos estudios revelaron un bulbo olfatorio grande, sugiriendo un sentido del olfato agudo, y un cerebelo bien desarrollado que habría proporcionado coordinación motora precisa, una característica útil tanto para cabezazos como para una locomoción ágil en terreno irregular.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El debate sobre si Dracorex hogwartsia (sí, nombrado en honor a Hogwarts de Harry Potter) es un género válido o simplemente un Pachycephalosaurus juvenil sigue generando discusión entre paleontólogos. Si Horner tiene razón, entonces un solo animal pasaría de tener un cráneo plano con espinas (Dracorex) a un domo parcial con cuernos (Stygimoloch) y finalmente al gran domo liso del Pachycephalosaurus adulto, una de las transformaciones más radicales durante el crecimiento en cualquier dinosaurio conocido.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El estudio de Snively y Cox de 2008 utilizó modelado por elementos finitos (FEA), la misma tecnología que los ingenieros usan para diseñar puentes y edificios. Simularon impactos craneales a velocidades de 2 a 6 metros por segundo y midieron la distribución de tensión en el domo. Los resultados mostraron que impactos directos cabeza contra cabeza concentraban fuerzas peligrosas en la base del cráneo, mientras que impactos laterales al flanco distribuían la fuerza de manera más uniforme, reduciendo el riesgo de lesión cervical.' },
    ],
    fact: 'Los paquicefalosaurios son los dinosaurios más difíciles de estudiar porque casi nunca se encuentran esqueletos completos. El domo craneal, al ser la parte más densa y dura de su anatomía, es prácticamente lo único que se preserva con frecuencia. Del propio Pachycephalosaurus wyomingensis solo se conocen cráneos y fragmentos craneales. Esto significa que muchas reconstrucciones de su cuerpo se basan en parientes mejor conocidos como el Stegoceras, del cual sí existe un esqueleto parcial descubierto en Alberta, Canadá, en la década de 1920.',
  },
  {
    id: 'hadrosaurios-pico',
    title: 'Los Hadrosaurios: Pico de Pato',
    color: '#A67B3D',
    btnImage: '/assets/dinosaurios/infographic_m4/btn_hadrosaurios-pico.jpg',
    image: '/assets/dinosaurios/infographic_m4/hero_hadrosaurios-pico.jpg',
    content: [
      'Los hadrosaurios, comúnmente llamados dinosaurios pico de pato por la forma aplanada y ancha de su hocico, constituyeron el grupo de dinosaurios herbívoros más exitoso del Cretácico tardío. Aparecieron hace aproximadamente 100 millones de años y se diversificaron hasta alcanzar más de 60 especies reconocidas antes de la extinción masiva hace 66 millones de años. Se han encontrado fósiles en todos los continentes excepto la Antártida y Australia, demostrando una distribución global notable. Su éxito evolutivo se debió en gran medida a su sistema dental, el más sofisticado de cualquier reptil conocido.',
      'La batería dental de los hadrosaurios era una obra maestra de la ingeniería biológica. Cada mandíbula contenía entre 300 y 1,400 dientes organizados en columnas verticales apretadas que formaban una superficie de molienda continua. A medida que los dientes superiores se desgastaban, nuevos dientes crecían desde abajo para reemplazarlos, un proceso que ocurría continuamente durante toda la vida del animal. Gregory Erickson y sus colegas publicaron en 2012 un estudio en la revista Science que reveló que los dientes de los hadrosaurios estaban compuestos por seis tipos diferentes de tejido dental, dos más que los caballos modernos, lo que los hacía excepcionalmente resistentes al desgaste.',
      'Las crestas craneales de los hadrosaurios lambeosaurinos representan algunas de las estructuras más intrigantes del mundo dinosauriano. El Parasaurolophus walkeri poseía una cresta tubular curva que se extendía hasta 1.8 metros detrás del cráneo. Esta cresta contenía pasajes nasales internos que funcionaban como una cámara de resonancia. David Weishampel modeló acústicamente esta estructura en 1981 y calculó que el Parasaurolophus podía producir sonidos de baja frecuencia alrededor de 30 a 75 hercios, similares al registro más grave de un trombón. Estos sonidos habrían viajado varios kilómetros a través de los bosques del Cretácico.',
      'Los hadrosaurios compensaban su falta de armadura y cuernos con estrategias sociales avanzadas. En la Formación Two Medicine de Montana, Jack Horner descubrió en 1978 el primer nido de dinosaurio con evidencia de cuidado parental: el Maiasaura peeblesorum, cuyo nombre significa "lagarto buena madre". Los nidos estaban espaciados a intervalos regulares de aproximadamente 7 metros, la longitud de un adulto, sugiriendo colonias de anidación organizadas. Los huesos de las crías mostraban desgaste dental, indicando que los padres alimentaban a los recién nacidos en el nido antes de que pudieran valerse por sí mismos.',
      'La preservación excepcional de algunos hadrosaurios ha proporcionado información sin precedentes sobre su biología. El Edmontosaurus regalis descubierto en Alberta en 2013 conservaba una cresta carnosa en la cabeza, similar a la cresta de un gallo, que no dejaba rastro en el esqueleto óseo. Esto sugiere que muchos dinosaurios tenían estructuras de tejido blando que desconocemos por completo. Otro espécimen de Edmontosaurus, conocido como la "momia del dinosaurio", preservó contenido estomacal que incluía coníferas, semillas y restos de hojas de angiospermas, proporcionando evidencia directa de su dieta omnívora basada predominantemente en materia vegetal diversa.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2020, un equipo de investigadores japoneses y canadienses descubrió Kamuysaurus japonicus en la isla de Hokkaido, Japón, el primer esqueleto de hadrosaurio prácticamente completo encontrado en Asia Oriental en un ambiente marino. El animal había sido arrastrado al mar después de morir, donde fue sepultado en sedimentos marinos. Este hallazgo demostró que los hadrosaurios habitaban las costas del Pacífico asiático y que sus cadáveres podían ser transportados por corrientes oceánicas, complicando la interpretación de dónde vivían realmente estas especies.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El sistema dental de los hadrosaurios funcionaba de manera diferente a cualquier animal moderno. Mientras que los mamíferos como los caballos tienen dientes con esmalte, dentina y cemento, los hadrosaurios añadían tres tejidos adicionales: dentina de manto, dentina ortodentina secundaria y una capa de cemento coronal. Esta complejidad creaba una superficie de masticación con zonas de dureza variable que se desgastaban a ritmos diferentes, manteniendo siempre un borde cortante irregular, similar a una lima autoafilable biológica.' },
    ],
    fact: 'El descubrimiento de Maiasaura por Jack Horner en 1978 cambió radicalmente la percepción pública de los dinosaurios. Antes de este hallazgo, se asumía generalmente que los dinosaurios abandonaban sus huevos como los reptiles modernos. La evidencia de colonias de anidación, cuidado parental y alimentación de crías en Maiasaura demostró que al menos algunos dinosaurios tenían comportamientos sociales complejos comparables a los de las aves y los mamíferos. Horner encontró más de 200 especímenes de Maiasaura en un solo sitio, incluyendo huevos, embriones, crías, juveniles y adultos, representando una comunidad multigeneracional completa.',
  },
  {
    id: 'plantas-herbivoros',
    title: 'Plantas y Herbívoros',
    color: '#7D6B99',
    btnImage: '/assets/dinosaurios/infographic_m4/btn_plantas-herbivoros.jpg',
    image: '/assets/dinosaurios/infographic_m4/hero_plantas-herbivoros.jpg',
    content: [
      'La relación entre los dinosaurios herbívoros y las plantas que consumían constituye uno de los capítulos más reveladores de la coevolución en la historia de la vida. Durante el Triásico y el Jurásico, la vegetación dominante consistía en coníferas, helechos, cícadas y ginkgos, plantas relativamente primitivas con hojas duras y a menudo tóxicas. Los herbívoros de estas eras, como los saurópodos, desarrollaron estrategias de alimentación basadas en el volumen: tragaban enormes cantidades de vegetación sin masticar, confiando en sus largos sistemas digestivos y en gastrolitos para procesar el alimento.',
      'Los gastrolitos, piedras deliberadamente ingeridas que ayudaban a triturar la vegetación en el estómago, han sido encontrados asociados a fósiles de múltiples grupos de dinosaurios herbívoros. Estas piedras, típicamente de 1 a 10 centímetros de diámetro, presentan superficies pulidas y redondeadas por la acción constante de los ácidos gástricos y el movimiento muscular del estómago. Oliver Wings publicó en 2007 un estudio que estableció criterios para distinguir gastrolitos verdaderos de piedras depositadas casualmente junto a un esqueleto: deben estar dentro de la cavidad abdominal, ser de un tipo de roca diferente al sedimento circundante y mostrar el pulido característico.',
      'La revolución más significativa en la relación planta-herbívoro ocurrió durante el Cretácico medio, cuando las angiospermas (plantas con flores) comenzaron a diversificarse explosivamente. Hace 100 millones de años, las angiospermas pasaron de ser componentes marginales de la flora a dominar los ecosistemas terrestres. Este cambio coincidió temporalmente con la diversificación de los hadrosaurios y ceratopsianos, grupos con sistemas dentales sofisticados capaces de masticar vegetación fibrosa. Algunos paleobotánicos, como Scott Wing, han propuesto que la coevolución entre estos herbívoros y las angiospermas aceleró la diversificación de ambos grupos.',
      'Los coprolitos, heces fosilizadas, proporcionan la evidencia más directa de lo que los dinosaurios herbívoros realmente comían. Karen Chin de la Universidad de Colorado ha analizado coprolitos atribuidos a hadrosaurios y ceratopsianos del Cretácico tardío, encontrando restos de coníferas descompuestas, madera podrida, hongos y crustáceos. Un coprolito particularmente informativo, publicado en la revista Nature en 1998, contenía grandes fragmentos de madera de conífera con canales de tronco, sugiriendo que el animal había consumido madera en descomposición deliberadamente, posiblemente para acceder a los nutrientes concentrados en los hongos que la colonizaban.',
      'El análisis de contenidos estomacales preservados ha complementado la información de los coprolitos. El Brachylophosaurus canadensis apodado "Leonardo", descubierto en Montana en 2000 y descrito como "la momia de dinosaurio mejor preservada del mundo", conservaba el contenido de su último alimento. Mediante espectroscopía y análisis químico, los investigadores identificaron restos de helechos, coníferas, magnolias y hasta polen de diversas angiospermas, revelando una dieta variada y oportunista que aprovechaba los recursos vegetales disponibles según la estación del año y la ubicación geográfica del animal.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los científicos pueden estimar la fuerza de mordida de los dinosaurios herbívoros analizando las marcas microscópicas de desgaste en sus dientes. Esta técnica, llamada análisis de microdesgaste dental, fue aplicada por Mark Purnell y colaboradores a dientes de hadrosaurios en 2013. Los patrones de rayas y hoyuelos en la superficie dental revelaron que diferentes especies de hadrosaurios que coexistían en el mismo ecosistema consumían diferentes tipos de plantas, evitando la competencia directa por alimento.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las angiospermas (plantas con flores) representan hoy más del 90 por ciento de todas las especies de plantas terrestres, pero en el Jurásico eran prácticamente inexistentes. Su diversificación durante el Cretácico fue tan rápida que Charles Darwin la llamó "un misterio abominable" en una carta de 1879. Investigaciones recientes sugieren que la herbivoría de los dinosaurios pudo haber acelerado esta diversificación: al consumir las plantas dominantes (coníferas y helechos), los herbívoros creaban claros en los bosques donde las angiospermas, de crecimiento más rápido, podían colonizar y expandirse.' },
    ],
    fact: 'El coprolito de dinosaurio más grande jamás encontrado mide 64 centímetros de largo y 15 centímetros de ancho. Fue descubierto en la Formación Frenchman de Saskatchewan, Canadá, en 1998, y se atribuye a un Tyrannosaurus rex por su contenido de fragmentos óseos triturados. Sin embargo, los coprolitos de herbívoros son igualmente valiosos: un coprolito de hadrosaurio analizado por Karen Chin contenía entre un 20 y un 40 por ciento de madera de conífera fragmentada, sugiriendo que estos animales consumían enormes cantidades de material vegetal difícil de digerir, compensando con volumen lo que les faltaba en eficiencia digestiva.',
  },
  {
    id: 'defensas-mundo-actual',
    title: 'Defensas en el Mundo Actual',
    color: '#3E7C8B',
    btnImage: '/assets/dinosaurios/infographic_m4/btn_defensas-mundo-actual.jpg',
    image: '/assets/dinosaurios/infographic_m4/hero_defensas-mundo-actual.jpg',
    content: [
      'Las estrategias defensivas de los dinosaurios blindados no desaparecieron con la extinción del Cretácico. La evolución convergente, el proceso por el cual organismos no emparentados desarrollan características similares como respuesta a presiones ambientales parecidas, ha recreado muchas de estas soluciones en animales modernos. El armadillo de nueve bandas (Dasypus novemcinctus) posee un caparazón de placas óseas dérmicas cubiertas de queratina que es estructuralmente similar a los osteodermos de los anquilosaurios. Estas placas, llamadas escudos, están organizadas en bandas articuladas que permiten cierta flexibilidad al animal mientras mantienen la protección.',
      'El pangolín (familia Manidae) ofrece otro ejemplo notable de armadura convergente. Sus escamas, compuestas enteramente de queratina endurecida, cubren todo su cuerpo excepto el vientre, un patrón que recuerda la distribución de osteodermos en los anquilosaurios, que también tenían el vientre desprotegido. Cuando se siente amenazado, el pangolín se enrolla en una bola tan apretada que incluso los leones tienen dificultades para abrirlo. Los bordes cortantes de sus escamas pueden infligir heridas a los depredadores que intentan manipularlo. Lamentablemente, los ocho especies de pangolín están amenazadas de extinción debido al tráfico ilegal.',
      'El rinoceronte indio (Rhinoceros unicornis) presenta placas dérmicas gruesas que le dan la apariencia de llevar una armadura articulada, reminiscente de un ceratopsiano. Su cuerno, aunque compuesto de queratina compactada en lugar de hueso como los cuernos del Triceratops, cumple funciones análogas: defensa contra depredadores, competencia intraespecífica y exhibición. Los estudios de comportamiento realizados en el Parque Nacional de Kaziranga, India, documentan que los rinocerontes machos utilizan sus cuernos en combates ritualizados por acceso a las hembras, un comportamiento que los paleontólogos han propuesto como análogo al uso de los cuernos de los ceratopsianos.',
      'Las tortugas representan quizás el ejemplo más antiguo y exitoso de armadura defensiva entre los vertebrados. Su caparazón, formado por la fusión de costillas expandidas y placas dérmicas, apareció hace aproximadamente 220 millones de años, durante el Triásico medio. La tortuga mordedora aligátor (Macrochelys temminckii) de América del Norte combina un caparazón robusto con mandíbulas que pueden generar una fuerza de mordida de 455 newtons, una combinación de defensa y ofensa que recuerda a los anquilosaurios con sus osteodermos y sus mazas caudales. El fósil más antiguo de tortuga con caparazón completo es Proganochelys quenstedtii, de hace 210 millones de años.',
      'Más allá de la armadura física, la convergencia se extiende a estrategias defensivas conductuales. Los bueyes almizcleros (Ovibos moschatus) forman círculos defensivos cuando son amenazados por lobos, colocando a las crías en el centro y presentando sus cuernos hacia afuera. Los paleontólogos han propuesto que los ceratopsianos como el Triceratops podrían haber empleado tácticas similares basándose en la evidencia de comportamiento gregario encontrada en lechos óseos. Los elefantes africanos modernos, con sus manadas matriarcales y su defensa colectiva de las crías, ofrecen otro modelo de cómo grandes herbívoros mesozoicos podrían haber coordinado sus defensas contra depredadores como los tiranosaurios.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El gliptodonte (Glyptodon clavipes), un pariente gigante del armadillo que vivió en América del Sur hasta hace unos 10,000 años, llevó la armadura de mamífero a su máxima expresión. Con hasta 3.3 metros de largo y un peso de 2,000 kilogramos, su caparazón estaba formado por más de 1,000 osteodermos hexagonales fusionados, y su cola portaba una maza ósea con púas, convergiendo de manera notable con la anatomía de los anquilosaurios que habían desaparecido 60 millones de años antes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La evolución convergente entre dinosaurios blindados y animales modernos se extiende incluso al nivel microscópico. Estudios de Torsten Scheyer de 2009 compararon la histología de los osteodermos de anquilosaurios con los del armadillo y el cocodrilo, encontrando patrones similares de mineralización y vascularización. Las fibras de Sharpey, que anclan los osteodermos a la piel circundante, son prácticamente idénticas en estructura entre estos grupos separados por más de 66 millones de años de evolución independiente.' },
    ],
    fact: 'El lagarto cornudo de Texas (Phrynosoma cornutum) posee una defensa que ningún dinosaurio conocido igualaba: puede disparar un chorro de sangre desde los conductos lacrimales de sus ojos a una distancia de hasta 1.5 metros para disuadir a los depredadores. Esta sangre contiene sustancias químicas desagradables que irritan la boca de los coyotes y otros depredadores. Aunque no se ha encontrado evidencia de esta estrategia en dinosaurios, el lagarto cornudo comparte con los ceratopsianos prehistóricos sus cuernos craneales y un cuerpo aplanado y ancho, demostrando que la forma defensiva óptima para un reptil terrestre ha permanecido notablemente consistente durante cientos de millones de años.',
  },
];

// ——— Prehistoric Particle Field (Canvas Background) ————————————————————————
function PrehistoricField() {
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
      hue: Math.random() > 0.5 ? '93,138,104' : '193,120,41', // teal-green or burnt sienna
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

// ——— Armored Dinos Header ————————————————————————————————————
function ArmoredDinosHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(93,138,104,0.3))' }}>
        {/* Shield arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#armorGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 armor markers */}
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
        {/* Central shield icon */}
        <path d="M300 18 L314 24 L314 34 Q314 42 300 46 Q286 42 286 34 L286 24 Z" fill="none" stroke="#5D8A68" strokeWidth="1.5" opacity="0.6" />
        <path d="M300 24 L308 28 L308 34 Q308 38 300 40 Q292 38 292 34 L292 28 Z" fill="#5D8A68" opacity="0.2" />
        <defs>
          <linearGradient id="armorGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(93,138,104,0.2)" />
            <stop offset="50%" stopColor="rgba(93,138,104,0.9)" />
            <stop offset="100%" stopColor="rgba(93,138,104,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5D8A68" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">HERBÍVOROS BLINDADOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(93,138,104,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ARMADURAS DEL MESOZOICO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ————————————————————————————
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
          layoutId="activeDotDinosM4"
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

// ——— Expandable Section with Random Direction ————————————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————————————
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

// ——— Progress Bar ————————————————————————————————————————————————
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

// ——— Main Infographic Component ————————————————————————————————————————————
export default function InteractiveInfographic_DinosM4() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/dinosaurios/dinos_m4.png)',
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
      <PrehistoricField />

      <ArmoredDinosHeader />

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
              🏆 ¡Has dominado los secretos de los Herbívoros Blindados!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Rastreador de Blindados
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

      {/* ImageLightbox §15 */}
      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
