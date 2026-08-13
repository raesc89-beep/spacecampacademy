'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Marine Reptile themed) ————————————————————
function DecoPlesiosaur({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Long neck silhouette */}
      <path d="M15 45 Q12 35 14 25 Q16 15 22 10 Q26 8 28 10" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Head */}
      <ellipse cx="30" cy="9" rx="5" ry="3" fill={color} opacity="0.3" />
      {/* Body */}
      <ellipse cx="20" cy="42" rx="12" ry="7" fill={color} opacity="0.2" />
      {/* Flippers */}
      <path d="M12 38 Q5 42 8 46" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M28 38 Q35 42 32 46" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M10 44 Q4 50 7 52" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M30 44 Q36 50 33 52" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Bubbles */}
      <circle cx="40" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="45" cy="22" r="1" fill={color} opacity="0.3" />
      <circle cx="42" cy="30" r="1.5" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoVertebrae({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Spine chain */}
      <line x1="10" y1="30" x2="50" y2="30" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Vertebrae discs */}
      {[14, 22, 30, 38, 46].map((x, i) => (
        <g key={i}>
          <ellipse cx={x} cy="30" rx="3" ry="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
          <line x1={x} y1="24" x2={x - 2} y2="18" stroke={color} strokeWidth="0.8" opacity="0.3" />
          <line x1={x} y1="36" x2={x - 2} y2="42" stroke={color} strokeWidth="0.8" opacity="0.3" />
        </g>
      ))}
      {/* Nerve canal dots */}
      {[14, 22, 30, 38, 46].map((x, i) => (
        <circle key={`c${i}`} cx={x} cy="30" r="1" fill={color} opacity="0.6" />
      ))}
    </svg>
  );
}

function DecoFlipper({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Hydrofoil / flipper shape */}
      <path d="M10 30 Q20 15 40 12 Q50 11 52 15 Q48 20 35 25 Q25 30 10 30 Z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
      {/* Bone structure inside */}
      <line x1="12" y1="28" x2="30" y2="20" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="30" y1="20" x2="38" y2="16" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <line x1="30" y1="20" x2="40" y2="20" stroke={color} strokeWidth="0.8" opacity="0.35" />
      {/* Water flow lines */}
      <path d="M15 40 Q25 38 35 40 Q45 42 55 40" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M10 47 Q20 45 30 47 Q40 49 50 47" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function DecoSkull({ size = 60, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Pliosaur skull outline */}
      <path d="M8 30 Q8 22 15 20 Q25 16 40 18 Q50 20 55 25 Q57 28 55 30 Q50 35 40 36 Q25 38 15 36 Q8 34 8 30 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Eye socket */}
      <circle cx="20" cy="26" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="20" cy="26" r="1" fill={color} opacity="0.4" />
      {/* Teeth */}
      {[30, 35, 40, 45, 50].map((x, i) => (
        <line key={i} x1={x} y1="33" x2={x} y2="38" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      ))}
      {/* Jaw line */}
      <path d="M15 33 Q30 37 55 30" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoBubbles({ size = 70, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Rising bubbles */}
      <circle cx="20" cy="45" r="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="20" cy="45" r="2" fill={color} opacity="0.15" />
      <circle cx="35" cy="30" r="4.5" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="35" cy="30" r="1.5" fill={color} opacity="0.12" />
      <circle cx="15" cy="20" r="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="42" cy="15" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="42" cy="15" r="1.8" fill={color} opacity="0.12" />
      <circle cx="28" cy="8" r="2" fill="none" stroke={color} strokeWidth="0.7" opacity="0.25" />
      <circle cx="50" cy="40" r="3.5" fill="none" stroke={color} strokeWidth="0.9" opacity="0.3" />
      {/* Light rays */}
      <path d="M5 5 L12 12" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <path d="M25 2 L27 10" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function DecoGastrolith({ size = 60, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Stomach stones cluster */}
      <ellipse cx="22" cy="35" rx="8" ry="6" fill={color} opacity="0.15" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="35" cy="30" rx="6" ry="5" fill={color} opacity="0.12" stroke={color} strokeWidth="1" opacity="0.35" />
      <ellipse cx="28" cy="22" rx="5" ry="4" fill={color} opacity="0.1" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="40" cy="40" r="4" fill={color} opacity="0.12" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="15" cy="25" r="3" fill={color} opacity="0.1" stroke={color} strokeWidth="0.7" opacity="0.25" />
      {/* Texture marks */}
      <path d="M20 33 Q22 31 24 33" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
      <path d="M33 28 Q35 26 37 28" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="28" cy="45" r="3.5" fill={color} opacity="0.08" stroke={color} strokeWidth="0.7" opacity="0.2" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'misterio-cuello-largo': [DecoPlesiosaur, DecoVertebrae, DecoBubbles],
  'elasmosaurus-72-vertebras': [DecoVertebrae, DecoPlesiosaur, DecoFlipper],
  'pliosaurs-depredadores': [DecoSkull, DecoFlipper, DecoBubbles],
  'como-nadaban': [DecoFlipper, DecoPlesiosaur, DecoBubbles],
  'dieta-estrategias-caza': [DecoGastrolith, DecoSkull, DecoVertebrae],
  'monstruo-lago-ness': [DecoBubbles, DecoPlesiosaur, DecoGastrolith],
  'extincion-legado': [DecoSkull, DecoVertebrae, DecoGastrolith],
};

// ——— Content Data ————————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'O\'Keefe, F.R. (2002). The evolution of plesiosaur and pliosaur morphotypes in the Plesiosauria. Paleobiology, 28(1), 101-112',
  'Gasparini, Z., Bardet, N., & Fernández, M. (2006). Marine Reptiles. Indiana University Press',
  'Carpenter, K. (1999). Revision of North American elasmosaurs from the Cretaceous of the Western Interior. Paludicola, 2(2), 148-173',
  'Ketchum, H.F. & Benson, R.B.J. (2010). Global interrelationships of Plesiosauria and the pivotal role of taxon sampling in determining the outcome of phylogenetic analyses. PLOS ONE, 5(9), e12885',
  'O\'Gorman, J.P. (2019). Elasmosaurid phylogeny and paleobiogeography, with a reappraisal of Aphrosaurus furlongi. Journal of Vertebrate Paleontology, 39(5)',
  'Benson, R.B.J. & Druckenmiller, P.S. (2014). Faunal turnover of marine tetrapods during the Jurassic-Cretaceous transition. Biological Reviews, 89(1), 1-23',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'misterio-cuello-largo',
    title: 'El Misterio del Cuello Largo',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/marinos_m3.png',
    image: '/assets/reptiles_marinos/marinos_m3.png',
    content: [
      'Los plesiosaurios fueron reptiles marinos que habitaron los océanos del Mesozoico durante más de 135 millones de años, desde el Triásico Tardío (hace aproximadamente 203 millones de años) hasta la extinción masiva del Cretácico-Paleógeno hace 66 millones de años. Su nombre, que significa "cercano a lagarto", fue acuñado por el geólogo británico William Conybeare en 1824, tras estudiar fósiles encontrados en los acantilados de Lyme Regis, en la costa de Dorset, Inglaterra. La paleontóloga Mary Anning, quien tenía apenas 12 años cuando encontró su primer fósil de ictiosauro, también descubrió el primer esqueleto completo de plesiosaurio en 1823, un hallazgo que transformó la comprensión científica de la vida marina prehistórica.',
      'El plan corporal de los plesiosaurios se divide en dos grandes grupos morfológicos que el paleontólogo F. Robin O\'Keefe describió con detalle en 2002: los plesiosauromorfos (cuello largo y cabeza pequeña) y los pliosauromorfos (cuello corto y cabeza grande). Ambos grupos comparten una estructura básica con un tronco rígido y ancho, cuatro extremidades modificadas en aletas tipo hidroala, y una cola relativamente corta. Esta división no corresponde necesariamente a linajes evolutivos separados, sino a dos estrategias corporales que evolucionaron de forma independiente en múltiples ocasiones dentro del orden Plesiosauria.',
      'El cuerpo de un plesiosaurio típico presentaba una caja torácica amplia reforzada por un sistema de huesos ventrales llamado gastralia, que formaba una especie de canasta ósea en el abdomen. Este sistema proporcionaba protección a los órganos internos y puntos de inserción para los potentes músculos que accionaban las cuatro aletas. A diferencia de la mayoría de los reptiles marinos, que perdieron o redujeron sus extremidades traseras, los plesiosaurios mantuvieron las cuatro aletas funcionales, una característica que los distingue entre todos los vertebrados marinos conocidos en la historia de la vida en la Tierra.',
      'Los primeros plesiosaurios conocidos provienen del Triásico Tardío de Europa. Géneros como Rhaeticosaurus, descubierto en Alemania en 2017 a partir de un fósil de 201 millones de años, demuestran que estos animales ya poseían el plan corporal básico de cuatro aletas desde el inicio de su historia evolutiva. Durante el Jurásico Inferior, los plesiosaurios se diversificaron notablemente, con familias como los Plesiosauridae ocupando los mares poco profundos de lo que hoy es Europa y Norteamérica, mientras los primeros pliosaurios comenzaban a desarrollar cráneos más grandes y cuellos más cortos.',
      'La relación evolutiva entre los plesiosaurios y otros reptiles marinos ha sido objeto de intenso debate científico durante más de un siglo. Los análisis filogenéticos modernos, como los realizados por Ketchum y Benson en 2010, sitúan a los plesiosaurios dentro de los Sauropterygia, un grupo que también incluye a los nothosaurios y los placodontos del Triásico. Los nothosaurios, con cuerpos semiaquáticos y extremidades parcialmente palmeadas, se consideran los antecesores más probables de los plesiosaurios. Esta transición de animales costeros a nadadores oceánicos completos se produjo a lo largo de millones de años, con adaptaciones graduales en la estructura de las aletas y la forma del cuerpo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Mary Anning, la descubridora del primer plesiosaurio completo, realizó sus hallazgos en una época en que las mujeres no podían votar, asistir a la universidad ni pertenecer a sociedades científicas. A pesar de estas barreras, sus descubrimientos en Lyme Regis entre 1810 y 1847 cambiaron la paleontología para siempre. Descubrió ictiosaurios, plesiosaurios y el primer pterosaurio encontrado fuera de Alemania. Murió a los 47 años sin reconocimiento oficial, pero en 2010 la Royal Society la incluyó en su lista de las diez mujeres más influyentes en la historia de la ciencia británica.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El estudio de O\'Keefe (2002) en la revista Paleobiology analizó 30 especies de plesiosaurios y demostró que la proporción entre el largo del cuello y el tamaño de la cabeza evolucionó de manera convergente al menos cuatro veces independientes dentro del grupo. Esto significa que la forma de "cuello largo" no se heredó de un ancestro común, sino que diferentes linajes desarrollaron esta solución por separado ante presiones ecológicas similares, un caso de evolución convergente comparable al de las alas en murciélagos y aves.' },
    ],
    fact: 'Cuando el fósil del primer plesiosaurio completo fue presentado ante la Sociedad Geológica de Londres en 1824, el anatomista francés Georges Cuvier lo consideró inicialmente una falsificación porque ningún animal conocido tenía un cuello con más de siete vértebras cervicales (la cantidad que tienen casi todos los mamíferos, incluidas las jirafas). Fue necesario que otros anatomistas verificaran la autenticidad del fósil para que la comunidad científica aceptara que realmente había existido un reptil con más de 30 vértebras cervicales, una cifra que en algunos géneros posteriores llegaría a superar las 70.',
  },
  {
    id: 'elasmosaurus-72-vertebras',
    title: 'Elasmosaurus: 72 Vértebras',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/marinos_m3.png',
    image: '/assets/reptiles_marinos/marinos_m3.png',
    content: [
      'El Elasmosaurus platyurus es uno de los plesiosaurios más conocidos y uno de los animales con el cuello más largo que haya existido. Fue descrito por el paleontólogo Edward Drinker Cope en 1868 a partir de un esqueleto encontrado en las formaciones de creta del Cretácico Tardío de Kansas, Estados Unidos, en sedimentos que tienen aproximadamente 80 millones de años de antigüedad. El animal medía alrededor de 14 metros de longitud total, de los cuales más de 7 metros correspondían exclusivamente al cuello, que contenía 72 vértebras cervicales, un récord entre los plesiosaurios conocidos.',
      'La historia del Elasmosaurus incluye uno de los errores más célebres de la paleontología. Cuando Cope reconstruyó el esqueleto por primera vez, colocó la cabeza en el extremo equivocado: en la punta de la cola. Su rival Othniel Charles Marsh señaló el error públicamente, lo que intensificó la rivalidad conocida como la "Guerra de los Huesos" entre ambos paleontólogos, una competencia que se extendió desde la década de 1870 hasta la muerte de Cope en 1897. Esta rivalidad, aunque destructiva en algunos aspectos, resultó en el descubrimiento de más de 130 nuevas especies de dinosaurios y reptiles marinos en Norteamérica.',
      'Las vértebras cervicales del Elasmosaurus eran aplanadas lateralmente y articuladas de forma que limitaban el movimiento lateral pero permitían cierta flexibilidad vertical. Estudios biomecánicos realizados por investigadores como Zammit, Daniels y Kear en 2008 sugieren que el cuello no podía levantarse fuera del agua como se muestra en muchas ilustraciones clásicas. El peso del cuello y la falta de musculatura adecuada hacían que mantener el cuello erguido en el aire fuera físicamente inviable. En cambio, el cuello funcionaba como una herramienta submarina flexible para capturar presas desde diferentes ángulos sin mover el cuerpo.',
      'La familia Elasmosauridae, a la que pertenece el Elasmosaurus, fue una de las más exitosas del Cretácico. Sus miembros se distribuyeron por todos los océanos del mundo, con fósiles encontrados en Norteamérica, Sudamérica, Japón, Australia, Nueva Zelanda y la Antártida. El género Albertonectes, descrito en 2012 a partir de fósiles de Alberta, Canadá, tenía 76 vértebras cervicales, superando incluso al Elasmosaurus. Con un cuello de más de 7 metros, el Albertonectes representa el cuello más largo conocido en proporción al cuerpo de cualquier vertebrado que haya existido.',
      'La función evolutiva de un cuello tan extremadamente largo ha generado múltiples hipótesis entre los paleontólogos. Una propuesta sugiere que el cuello largo permitía al animal acercarse sigilosamente a los bancos de peces sin que su gran cuerpo los alertara. Otra hipótesis indica que el cuello servía para barrer el fondo marino en busca de invertebrados. Análisis de isótopos estables en los huesos de elasmosáuridos, publicados por Allemand y colaboradores en 2017, indican que diferentes especies ocupaban distintos niveles de la cadena alimentaria, lo que sugiere que el cuello largo era una adaptación versátil que podía utilizarse para varias estrategias de alimentación según la especie y el ambiente.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La "Guerra de los Huesos" entre Cope y Marsh es uno de los episodios más conocidos y polémicos de la historia de la ciencia. Ambos paleontólogos llegaron a sabotear excavaciones del otro, sobornar a colectores de fósiles, destruir especímenes para evitar que el rival los estudiara y publicar descripciones apresuradas con errores. Cope gastó toda su fortuna personal en esta competencia y murió en bancarrota en 1897. A pesar del caos, la rivalidad produjo el descubrimiento de 142 especies nuevas de dinosaurios, incluidos el Triceratops, el Stegosaurus y el Diplodocus.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las vértebras cervicales del Elasmosaurus medían entre 4 y 6 centímetros de largo cada una, con superficies articulares planas que limitaban la movilidad individual. Sin embargo, el gran número de vértebras (72) compensaba esta rigidez: aunque cada articulación permitía solo unos pocos grados de movimiento, la suma total producía un cuello con una curvatura acumulativa de hasta 180 grados en el plano vertical. Estudios de tomografía computarizada de las vértebras han revelado que las superficies articulares estaban cubiertas de cartílago grueso que amortiguaba los impactos durante la captura de presas.' },
    ],
    fact: 'El error de Cope al reconstruir el Elasmosaurus con la cabeza en la cola no fue simplemente un descuido. En 1868, los científicos aún no comprendían a fondo la anatomía de los plesiosaurios de cuello largo, y la idea de un reptil con 72 vértebras cervicales era tan ajena que parecía más lógico que el extremo largo fuera la cola. El incidente se convirtió en una lección fundamental sobre la importancia de la anatomía comparada en paleontología. Cope intentó comprar y destruir todas las copias de su publicación original con el error, pero Marsh ya había guardado ejemplares como prueba del fallo.',
  },
  {
    id: 'pliosaurs-depredadores',
    title: 'Pliosaurs: Los Depredadores Supremos',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/marinos_m3.png',
    image: '/assets/reptiles_marinos/marinos_m3.png',
    content: [
      'Los pliosaurios representan la rama de los plesiosaurios que adoptó una estrategia corporal radicalmente opuesta a la de sus primos de cuello largo: cabezas enormes montadas sobre cuellos cortos y robustos. El grupo alcanzó su máximo desarrollo durante el Jurásico Medio y Tardío, cuando géneros como Liopleurodon, Pliosaurus y Kronosaurus dominaron los mares como superdepredadores. El cráneo de estos animales podía representar entre una cuarta parte y un quinto de la longitud total del cuerpo, una proporción que les daba una capacidad de mordida sin igual entre los reptiles marinos.',
      'El Pliosaurus funkei, descubierto en la isla de Svalbard, Noruega, entre 2006 y 2012, es uno de los pliosaurios más grandes conocidos. El espécimen, apodado "Predator X" por los medios de comunicación, se estima que medía entre 10 y 13 metros de longitud, con un cráneo de aproximadamente 2 metros. Los análisis biomecánicos publicados por Knutsen y colaboradores en 2012 calcularon que su fuerza de mordida podía superar los 33,000 newtons, comparable a la de un Tyrannosaurus rex. Sus dientes, de sección transversal triangular y con estrías longitudinales, estaban diseñados para perforar hueso y sujetar presas que se debatían.',
      'El Kronosaurus queenslandicus de Australia, que vivió durante el Cretácico Inferior hace aproximadamente 112 millones de años, fue otro de los grandes pliosaurios. Las estimaciones modernas sitúan su longitud entre 9 y 10.5 metros, con un cráneo de hasta 2.4 metros, lo que lo convierte en el poseedor del cráneo más largo entre los pliosaurios conocidos. Sus dientes anteriores eran cónicos y medían hasta 30 centímetros de longitud incluyendo la raíz, lo que los convertía en los dientes más largos de cualquier reptil marino del Mesozoico.',
      'El Liopleurodon ferox del Jurásico Superior de Europa ha sido objeto de controversia sobre su tamaño real. Mientras que un documental de televisión de 1999 lo presentó con 25 metros de longitud, los fósiles reales indican una talla máxima de entre 5 y 7 metros. Los paleontólogos Leslie Noè y Jeff Liston publicaron revisiones en 2004 que demostraron que las estimaciones previas estaban basadas en fragmentos aislados y extrapolaciones erróneas. Este caso ilustra la diferencia entre la representación mediática y los datos paleontológicos verificables, y la importancia de basar las estimaciones de tamaño en especímenes razonablemente completos.',
      'La dieta de los pliosaurios era variada y dependía de su tamaño y morfología dental. Análisis del contenido estomacal fosilizado y marcas de mordida en huesos de otras especies marinas revelan que los grandes pliosaurios se alimentaban de peces, cefalópodos, tiburones, tortugas marinas e incluso otros plesiosaurios. Un estudio publicado por Forrest y Oliver en 2003 documentó marcas de dientes de pliosaurio en vértebras de un criptoclídido (un plesiosaurio de cuello largo), confirmando que los pliosaurios ocupaban el nivel más alto de la cadena alimentaria marina del Jurásico y actuaban como depredadores de otros depredadores marinos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El fósil de Pliosaurus funkei fue descubierto por un equipo de la Universidad de Oslo en expediciones sucesivas a la isla de Svalbard, a solo 1,300 kilómetros del Polo Norte. Las condiciones de trabajo eran extremas: temperaturas bajo cero, riesgo de osos polares y solo unas semanas de verano ártico para excavar cada año. El fósil estaba incrustado en roca dura que requirió herramientas neumáticas y años de preparación en laboratorio. El esqueleto, aunque incompleto, incluye el cráneo, vértebras y partes de las aletas, suficiente para estimar su tamaño y capacidad de mordida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los dientes de los pliosaurios grandes presentaban estrías longitudinales similares a las de los dientes de los cocodrilos modernos y los terópodos carnívoros. Estas estrías, llamadas carenas, no son decorativas: funcionan como concentradores de tensión que dirigen la fuerza de mordida en líneas específicas, aumentando la capacidad de penetración del diente sin aumentar la fuerza muscular necesaria. Un estudio de elementos finitos publicado en 2014 demostró que los dientes estriados de los pliosaurios podían perforar hueso con un 30% menos de fuerza que un diente liso del mismo tamaño.' },
    ],
    fact: 'En 2003, un equipo de paleontólogos británicos descubrió en Westbury, Inglaterra, una acumulación de huesos de plesiosaurios y peces parcialmente digeridos que interpretaron como un vómito fosilizado (regurgitalito) de un gran pliosaurio. El análisis de los fragmentos óseos reveló restos de al menos tres especies diferentes de plesiosaurios de cuello largo, junto con escamas de peces y picos de cefalópodos. Este hallazgo proporcionó evidencia directa de que los pliosaurios tragaban a sus presas en grandes trozos y regurgitaban los materiales no digeribles, un comportamiento similar al de las aves rapaces actuales con sus egagrópilas.',
  },
  {
    id: 'como-nadaban',
    title: 'Cómo Nadaban',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/marinos_m3.png',
    image: '/assets/reptiles_marinos/marinos_m3.png',
    content: [
      'El sistema de locomoción de los plesiosaurios es único entre los vertebrados marinos de todos los tiempos. Mientras que los ictiosaurios nadaban como los delfines (oscilación de la cola), y los mosasaurios ondulaban el cuerpo como las serpientes marinas, los plesiosaurios utilizaban sus cuatro aletas como alas submarinas para generar empuje mediante un movimiento similar al vuelo. Este método de propulsión, denominado "vuelo subacuático" o locomoción por hidroalas, se observa hoy en las tortugas marinas y los pingüinos, pero ningún animal moderno utiliza cuatro aletas de manera simultánea como lo hacían los plesiosaurios.',
      'Los estudios pioneros de Frank Fish y de Long y Schumacher, publicados entre 2006 y 2010, utilizaron modelos computacionales y túneles de agua para analizar la mecánica de las aletas de los plesiosaurios. Descubrieron que las aletas delanteras generaban un flujo de agua acelerado que las aletas traseras podían aprovechar para aumentar su propio empuje, un principio similar al que usan los helicópteros de doble rotor. Este sistema "tándem" permitía a los plesiosaurios producir más fuerza propulsiva que si cada par de aletas trabajara de forma independiente, con una ganancia estimada de eficiencia de entre un 20% y un 60% según la velocidad de nado.',
      'La estructura interna de las aletas de los plesiosaurios revela una adaptación extrema a la vida acuática. Las aletas contenían los mismos huesos que los brazos y piernas de los reptiles terrestres (húmero, radio, cúbito, fémur, tibia, peroné), pero extremadamente aplanados y acortados, formando una estructura rígida cubierta por cartílago y tejido conectivo que creaba un perfil hidrodinámico similar al ala de un avión. Además, muchos plesiosaurios desarrollaron hiperfalangia, una condición donde los dedos tienen más falanges de lo normal, lo que alargaba las aletas y aumentaba su superficie de empuje.',
      'Las velocidades de natación estimadas para los plesiosaurios varían según el grupo y el método de análisis. Los modelos hidrodinámicos sugieren que los elasmosáuridos de cuello largo nadaban a velocidades de crucero moderadas, entre 1.5 y 3 metros por segundo (5.4 a 10.8 km/h), optimizando la eficiencia energética sobre la velocidad pura. Los pliosaurios, con cuerpos más hidrodinámicos y cuellos cortos que reducían la resistencia frontal, podían alcanzar velocidades de persecución de hasta 5 metros por segundo (18 km/h), suficiente para capturar peces y cefalópodos rápidos.',
      'Un aspecto particular de la locomoción de los plesiosaurios es la función de la cola. A diferencia de los ictiosaurios y mosasaurios, que tenían colas largas y musculosas para generar empuje, los plesiosaurios poseían colas relativamente cortas que cumplían principalmente una función de timón y estabilización. Algunos especímenes fósiles muestran estructuras en la punta de la cola que se interpretan como pequeñas aletas o expansiones de tejido blando que ayudaban en los cambios de dirección. La combinación de cuatro aletas propulsoras y una cola direccional creaba un sistema de maniobrabilidad que les permitía girar con radios de curvatura muy cortos, una ventaja para la caza en espacios tridimensionales del océano.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2015, un equipo de ingenieros de la Universidad de Southampton construyó un robot inspirado en las cuatro aletas de los plesiosaurios para probar las hipótesis sobre su locomoción. El robot, llamado "Plesibot", demostró que el movimiento coordinado de cuatro aletas en configuración tándem producía maniobras más precisas que las de un robot con solo dos aletas. Este principio se está investigando ahora para el diseño de vehículos submarinos autónomos que necesitan operar en espacios confinados como tuberías submarinas, cascos de barcos o cuevas sumergidas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La hiperfalangia observada en las aletas de los plesiosaurios es una condición genética controlada por genes de la familia HOX. En los humanos, cada dedo tiene 2 o 3 falanges; en algunos plesiosaurios, cada dedo podía tener hasta 17 falanges, creando aletas extremadamente largas y flexibles. Esta misma condición se observa en las ballenas actuales y en los ictiosaurios, pero evolucionó de manera independiente en cada grupo, otro ejemplo de evolución convergente donde diferentes linajes desarrollan soluciones similares a los mismos desafíos biomecánicos de la vida en el mar.' },
    ],
    fact: 'Los cálculos de Long y Schumacher (2006) demostraron que las aletas traseras de los plesiosaurios no eran simples copias de las delanteras: operaban con un desfase temporal específico de entre 60 y 90 grados respecto al ciclo de las aletas frontales. Este desfase maximizaba la captura de energía del flujo de agua generado por las aletas delanteras. Si las cuatro aletas se movieran de forma sincronizada, se cancelarían mutuamente parte del empuje; con el desfase correcto, cada ciclo de las aletas traseras aprovechaba el remolino dejado por las delanteras, similar a cómo los ciclistas en pelotón aprovechan el vacío del ciclista que va delante.',
  },
  {
    id: 'dieta-estrategias-caza',
    title: 'Dieta y Estrategias de Caza',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/marinos_m3.png',
    image: '/assets/reptiles_marinos/marinos_m3.png',
    content: [
      'La alimentación de los plesiosaurios ha sido reconstruida mediante el análisis de contenidos estomacales fosilizados, marcas de desgaste en los dientes, isótopos estables en el esmalte dental, y la morfología comparada de sus mandíbulas. Los plesiosaurios de cuello largo (plesiosauromorfos) poseían dientes largos, delgados e interconectados que formaban una trampa tipo jaula cuando las mandíbulas se cerraban, un diseño eficaz para atrapar peces y calamares resbaladizos. Los dientes se insertaban en alvéolos profundos y se reemplazaban continuamente a lo largo de la vida del animal, similar a los cocodrilos actuales.',
      'Uno de los hallazgos más reveladores sobre la dieta de los plesiosaurios son los gastrolitos, piedras lisas y pulidas encontradas dentro de la cavidad abdominal de numerosos especímenes fósiles. El paleontólogo Kenneth Carpenter documentó en 1999 que estos gastrolitos pueden encontrarse en cantidades de hasta varios kilogramos por individuo, con pesos totales que alcanzan el 6% de la masa corporal estimada del animal. La función exacta de estas piedras es debatida: algunas hipótesis proponen que ayudaban a triturar el alimento en el estómago, mientras que otras sugieren que servían como lastre para controlar la flotabilidad del animal en el agua.',
      'Los análisis de isótopos de oxígeno y carbono en los dientes de plesiosaurios, realizados por Kocsis y colaboradores en 2014, han proporcionado información directa sobre los hábitats de alimentación de estos animales. Los resultados indican que los elasmosáuridos del Cretácico Tardío de Norteamérica se alimentaban principalmente en aguas superficiales costeras, mientras que los pliosaurios de mayor tamaño mostraban señales isotópicas compatibles con la alimentación en aguas más profundas y en mar abierto. Esta diferenciación de nichos ecológicos habría reducido la competencia entre los diferentes grupos de plesiosaurios que coexistían en los mismos océanos.',
      'La morfología dental varía de forma notable entre las diferentes familias de plesiosaurios, reflejando dietas especializadas. Los criptoclídidos tenían dientes finos y numerosos dispuestos en un patrón de rastrillo, adecuados para filtrar pequeños invertebrados del sedimento del fondo. Los policotílidos, un grupo que apareció en el Cretácico, desarrollaron dientes cortos y robustos en mandíbulas anchas, similares a los de los delfines modernos, sugiriendo una dieta basada en peces de tamaño mediano que capturaban mediante persecución activa y rapidez.',
      'Las estrategias de caza de los plesiosaurios probablemente variaban según la especie y el entorno. Los modelos biomecánicos del cuello de los elasmosáuridos sugieren una técnica de emboscada: el animal se acercaba lentamente a un banco de peces con su cuerpo oscuro camuflado en las profundidades, mientras el cuello largo llevaba la cabeza pequeña hacia las presas sin alertarlas. La baja velocidad del ataque del cuello se compensaba con la precisión y el factor sorpresa. Los pliosaurios, en cambio, utilizaban una estrategia de persecución directa, aprovechando su cuerpo hidrodinámico y sus potentes mandíbulas para capturar y someter presas de gran tamaño en enfrentamientos breves y violentos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2005, un equipo de paleontólogos en Queensland, Australia, descubrió un esqueleto de elasmosáurido con más de 200 gastrolitos perfectamente preservados en su cavidad abdominal. Las piedras, que habían sido pulidas hasta quedar del todo lisas por el movimiento constante dentro del estómago, provenían de al menos tres tipos diferentes de roca que no existían en la zona donde se encontró el fósil, indicando que el animal había viajado cientos de kilómetros y recogido piedras de diferentes playas o lechos de ríos durante su vida.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los dientes de los plesiosaurios de cuello largo muestran un patrón de desgaste denominado "pulido apical" que se produce por el contacto repetido con objetos blandos y abrasivos como las escamas de los peces y los cuerpos de los cefalópodos. Este patrón difiere del desgaste observado en los dientes de los pliosaurios, que muestran estrías profundas y fracturas compatibles con el contacto con hueso, confirmando que los dos grupos se alimentaban de presas muy diferentes a pesar de compartir los mismos océanos durante millones de años.' },
    ],
    fact: 'En 2006, un fósil de Polycotylus latippinus del Cretácico Tardío de Kansas reveló algo inesperado: dentro de la cavidad abdominal del adulto se encontraba un esqueleto juvenil de la misma especie que no había sido digerido, sino que estaba en posición fetal. Los paleontólogos O\'Keefe y Chiappe publicaron este hallazgo en la revista Science en 2011, demostrando que al menos algunos plesiosaurios daban a luz crías vivas (viviparidad) en lugar de poner huevos en tierra. El hecho de que solo hubiera una cría grande sugiere que los plesiosaurios invertían en una sola descendencia de gran tamaño, una estrategia reproductiva similar a la de las ballenas y delfines actuales.',
  },
  {
    id: 'monstruo-lago-ness',
    title: 'El Monstruo del Lago Ness... ¿y la Ciencia?',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/marinos_m3.png',
    image: '/assets/reptiles_marinos/marinos_m3.png',
    content: [
      'La leyenda del Monstruo del Lago Ness, conocido popularmente como "Nessie", ha estado asociada con los plesiosaurios desde la década de 1930. El vínculo se estableció tras la publicación de la famosa "Fotografía del Cirujano" en el Daily Mail el 21 de abril de 1934, que supuestamente mostraba la cabeza y el cuello largo de una criatura emergiendo del agua. La silueta recordaba la reconstrucción popular de un plesiosaurio. Sin embargo, en 1994, Christian Spurling confesó en su lecho de muerte que la fotografía era un montaje: él y Marmaduke Wetherell habían construido la figura usando plastilina y un submarino de juguete.',
      'Desde una perspectiva biológica, la supervivencia de un plesiosaurio en el Lago Ness presenta múltiples imposibilidades que los paleontólogos han documentado en detalle. El Lago Ness se formó hace apenas 10,000 años, al final de la última glaciación, cuando los glaciares que cubrían Escocia se retiraron y llenaron la cuenca con agua de deshielo. Antes de esa fecha, la zona estaba cubierta por una capa de hielo de hasta 1 kilómetro de espesor, lo que significa que ningún animal acuático de gran tamaño podría haber habitado el lugar de forma continua desde el Cretácico hace 66 millones de años.',
      'Los plesiosaurios eran reptiles que respiraban aire y necesitaban subir a la superficie con frecuencia, probablemente cada 15 a 30 minutos según las estimaciones basadas en la capacidad pulmonar de reptiles marinos de tamaño comparable. En un lago tan visitado y observado como el Lago Ness, un animal de 10 o más metros que emergiera varias veces por hora habría sido documentado de forma consistente por miles de testigos, no visto de manera esporádica y ambigua. Además, para mantener una población viable a lo largo de miles de años, se necesitaría un grupo mínimo de entre 200 y 500 individuos, según los modelos de genética de poblaciones, lo que haría los avistamientos aún más frecuentes.',
      'La temperatura del agua es otro factor determinante. El Lago Ness tiene una temperatura media de 5.5 grados centígrados en la superficie y solo 7 grados en el fondo (el agua del fondo es ligeramente más cálida debido a la geotermia). Los plesiosaurios, como reptiles, dependían en gran medida de la temperatura ambiental para regular su metabolismo, aunque algunos estudios sugieren que los pliosaurios grandes podían mantener temperaturas corporales superiores a las del entorno mediante gigantotermia. Aun así, una temperatura constante de 5-7 grados centígrados sería demasiado baja para el metabolismo y la reproducción de cualquier reptil de gran tamaño conocido.',
      'A pesar de la imposibilidad científica, el mito de Nessie ha contribuido positivamente a la paleontología y la divulgación científica. El interés público por la criatura ha financiado múltiples estudios del Lago Ness, incluyendo sondeos de sonar, análisis de ADN ambiental (eDNA) realizados por la Universidad de Otago en 2019, y mapeos batimétricos completos. El estudio de eDNA no encontró ADN de reptiles grandes, pero sí identificó grandes cantidades de ADN de anguila europea (Anguilla anguilla), lo que llevó al equipo a proponer que los avistamientos podrían corresponder a anguilas de tamaño excepcionalmente grande, una explicación más compatible con la biología del lago.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Lago Ness contiene más agua dulce que todos los lagos de Inglaterra y Gales combinados: aproximadamente 7,452 millones de metros cúbicos. Con una profundidad máxima de 230 metros y una visibilidad subacuática de apenas 1 a 2 metros debido al alto contenido de turba, el lago parece un lugar donde podría ocultarse algo grande. Sin embargo, un estudio de sonar de 2019 que escaneó todo el lago con equipos de alta resolución no detectó ningún objeto biológico de más de un metro de longitud, descartando la presencia de animales grandes desconocidos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El estudio de ADN ambiental (eDNA) de 2019 dirigido por el profesor Neil Gemmell de la Universidad de Otago, Nueva Zelanda, recolectó 259 muestras de agua de diferentes profundidades del Lago Ness. Utilizando secuenciación de nueva generación, identificó ADN de más de 3,000 especies, incluyendo peces, invertebrados, mamíferos terrestres y aves. No se detectó ADN de ningún reptil grande ni de ninguna especie desconocida. La cantidad de ADN de anguila fue notablemente alta en todas las profundidades muestreadas, lo que es consistente con la hipótesis de anguilas gigantes.' },
    ],
    fact: 'El matemático Robert Rines, del MIT, dedicó más de 30 años de su vida a buscar al Monstruo del Lago Ness. Entre 1972 y 2008 realizó expediciones anuales con sonar y cámaras subacuáticas. En 1975 obtuvo una imagen de sonar que interpretó como una aleta romboidal, pero análisis posteriores demostraron que la imagen había sido retocada antes de su publicación en la revista Nature. Rines, a pesar de ser un inventor brillante con más de 80 patentes registradas, nunca pudo producir evidencia verificable. Su caso ilustra cómo el sesgo de confirmación puede afectar incluso a científicos entrenados cuando buscan una respuesta específica en lugar de seguir los datos objetivamente.',
  },
  {
    id: 'extincion-legado',
    title: 'Extinción y Legado',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/marinos_m3.png',
    image: '/assets/reptiles_marinos/marinos_m3.png',
    content: [
      'Los plesiosaurios se extinguieron hace 66 millones de años durante el evento de extinción masiva del Cretácico-Paleógeno (K-Pg), causado por el impacto de un asteroide de aproximadamente 10 kilómetros de diámetro en lo que hoy es la Península de Yucatán, México. El cráter de Chicxulub, de 180 kilómetros de diámetro, ha sido confirmado mediante estudios geológicos y perforaciones del fondo marino. El impacto liberó una energía equivalente a 10 mil millones de bombas nucleares, generando tsunamis de más de 300 metros de altura, incendios globales y una capa de polvo que bloqueó la luz solar durante meses.',
      'Sin embargo, la extinción de los plesiosaurios no fue un evento repentino. Los registros fósiles analizados por Benson y Druckenmiller en 2014 muestran que la diversidad de los elasmosáuridos había comenzado a declinar durante los últimos 10 millones de años del Cretácico. Mientras que en el Cretácico Medio había al menos 15 géneros de elasmosáuridos distribuidos globalmente, para el Maastrichtiense (la última etapa del Cretácico, entre 72 y 66 millones de años) solo quedaban entre 5 y 7 géneros. Esta reducción progresiva sugiere que factores ecológicos previos al impacto ya estaban presionando a estas poblaciones.',
      'El Morturneria seymourensis, descubierto en la Isla Seymour de la Antártida, es uno de los últimos elasmosáuridos conocidos antes de la extinción. Este animal, que vivió hace aproximadamente 67 millones de años, tenía una mandíbula con dientes extremadamente finos y numerosos dispuestos en un patrón tipo filtro, similar a las barbas de las ballenas modernas. Los paleontólogos O\'Gorman y Gasparini interpretaron esta adaptación como evidencia de una dieta basada en la filtración de pequeños organismos del agua, una estrategia alimentaria nunca antes observada en plesiosaurios y que sugiere una especialización extrema durante las etapas finales del grupo.',
      'Los descubrimientos modernos continúan transformando nuestra comprensión de los plesiosaurios. En 2022, un equipo de paleontólogos describió fósiles de plesiosaurios de agua dulce encontrados en el sistema fluvial de Kem Kem en Marruecos, en rocas del Cretácico de aproximadamente 100 millones de años de antigüedad. Estos fósiles, que incluyen dientes y vértebras de animales pequeños (aproximadamente 3 metros de longitud), demuestran que algunos plesiosaurios no estaban restringidos al océano y podían habitar ríos y lagos, similar a cómo los delfines de río actuales se han adaptado a ambientes de agua dulce.',
      'El legado científico de los plesiosaurios se extiende más allá de la paleontología. Su sistema de locomoción con cuatro aletas ha inspirado el diseño de robots submarinos, como los desarrollados por el Instituto Max Planck en Alemania y la Universidad de Bath en Reino Unido. La biomecánica de su cuello largo se estudia en ingeniería robótica para crear brazos articulados flexibles. Incluso su sistema de gastralia (huesos ventrales) ha inspirado diseños de chalecos protectores con estructuras óseas distribuidas. Los plesiosaurios, tras más de 200 años desde su primer descubrimiento formal, siguen proporcionando conocimiento que conecta el pasado profundo con la tecnología del presente.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2023, un equipo de la Universidad de Portsmouth descubrió un fósil de plesiosaurio en Marruecos que medía apenas 1.5 metros de longitud, convirtiéndolo en el plesiosaurio más pequeño conocido de agua dulce. El fósil estaba en sedimentos del Cretácico junto con restos de Spinosaurus, el dinosaurio carnívoro más grande conocido. La coexistencia de estos animales en un sistema fluvial sugiere que el ecosistema de Kem Kem era extremadamente rico y diverso, con suficientes recursos para soportar depredadores acuáticos de todos los tamaños.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los análisis geoquímicos de la capa de iridio encontrada en sedimentos de todo el mundo correspondientes al límite K-Pg confirman que el impacto de Chicxulub fue un evento global. El iridio es un elemento raro en la corteza terrestre pero común en los asteroides. La concentración de iridio en esta capa es entre 30 y 130 veces superior a los niveles normales. Esta anomalía de iridio fue descubierta en 1980 por el físico Luis Álvarez y su hijo Walter Álvarez, y constituyó la primera evidencia directa de que un impacto extraterrestre había causado una extinción masiva.' },
    ],
    fact: 'La isla de Seymour en la Antártida, donde se encontró el último elasmosáurido Morturneria, fue el hogar de los últimos plesiosaurios del planeta. Los fósiles de esta isla, datados entre 68 y 66 millones de años, muestran que los plesiosaurios antárticos vivían en aguas con temperaturas de entre 10 y 15 grados centígrados, mucho más cálidas que las aguas antárticas actuales (entre -2 y 2 grados centígrados). La Antártida del Cretácico Tardío estaba cubierta de bosques de coníferas y helechos, sin hielo permanente, y soportaba un ecosistema marino diverso que incluía amonites, tiburones, mosasaurios y al menos tres especies diferentes de plesiosaurios.',
  },
];

// ——— Abyssal Particle Field (Canvas Background) ——————————————————————
function AbyssalField() {
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94', // slate blue or copper
    }));
    let frame;
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        const opacity = p.o + Math.sin(t * p.speed + p.phase) * 0.2;
        p.x += p.drift;
        p.y += 0.06;
        if (p.y > h + 5) { p.y = -5; p.x = Math.random() * w; }
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

// ——— Plesiosaur Header ————————————————————————————————————————————
function PlesiosaursHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Ocean depth arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#abyssGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 depth markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#5B7B9A','#B87D5E','#6E8FA8','#8B6B4A','#7C93A8','#9E7B5C','#4A6F8C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central bubble icon */}
        <circle cx="300" cy="30" r="14" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" />
        <circle cx="300" cy="22" r="3" fill="none" stroke="#5B7B9A" strokeWidth="0.8" opacity="0.4" />
        <circle cx="295" cy="33" r="2" fill="none" stroke="#5B7B9A" strokeWidth="0.6" opacity="0.3" />
        <circle cx="305" cy="28" r="2.5" fill="none" stroke="#5B7B9A" strokeWidth="0.7" opacity="0.35" />
        <defs>
          <linearGradient id="abyssGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">PLESIOSAURIOS</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">CUELLOS DEL ABISMO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button (matching BttfM2 style) ——————————————————————
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
        border: `3px solid ${isActive ? node.color : 'rgba(91,123,154,0.2)'}`,
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
          layoutId="activeDotMarinosM3"
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

// ——— Expandable Section with Random Direction ——————————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————————
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

        {/* ——— Conditional Video ——— */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer src={node.video} color={node.color} />
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

// ——— Progress Bar ————————————————————————————————————————————————————
function ProgressBar({ explored, total }) {
  const pct = (explored / total) * 100;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1rem',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '30px',
      border: '1px solid rgba(91,123,154,0.15)',
    }}>
      <Star size={14} style={{ color: '#5B7B9A', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #5B7B9A, #B87D5E)', borderRadius: '3px', boxShadow: '0 0 8px rgba(91,123,154,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#5B7B9A', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ——— Main Infographic Component ————————————————————————————————————————
export default function InteractiveInfographic_MarinosM3() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/marinos_m3_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,123,154,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <AbyssalField />

      <PlesiosaursHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(91,123,154,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(91,123,154,0.08)', borderRadius: '16px',
              border: '1px solid rgba(91,123,154,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#5B7B9A', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado los secretos de los Plesiosaurios!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Explorador Abisal
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
