'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Nuclear / Radiation themed) ────────────────────
function DecoAtomNucleus({ size = 70, color = '#4CAF50', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="6" fill={color} opacity="0.5" />
      {/* Protons & neutrons in nucleus */}
      <circle cx="27" cy="28" r="3" fill={color} opacity="0.4" />
      <circle cx="33" cy="28" r="3" fill={color} opacity="0.3" />
      <circle cx="30" cy="33" r="3" fill={color} opacity="0.35" />
      {/* Electron orbits */}
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(60 30 30)" />
      <ellipse cx="30" cy="30" rx="24" ry="10" fill="none" stroke={color} strokeWidth="1" opacity="0.4" transform="rotate(120 30 30)" />
      {/* Electrons */}
      <circle cx="54" cy="30" r="2.5" fill={color} opacity="0.6" />
      <circle cx="17" cy="18" r="2.5" fill={color} opacity="0.6" />
      <circle cx="17" cy="42" r="2.5" fill={color} opacity="0.6" />
    </svg>
  );
}

function DecoRadiationSymbol({ size = 70, color = '#6A1B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      <circle cx="30" cy="30" r="5" fill={color} opacity="0.5" />
      {/* Trefoil blades */}
      <path d="M30 25 A12 12 0 0 1 40 35 L30 30 Z" fill={color} opacity="0.35" />
      <path d="M30 25 A12 12 0 0 0 20 35 L30 30 Z" fill={color} opacity="0.35" />
      <path d="M20 35 A12 12 0 0 0 40 35 L30 30 Z" fill={color} opacity="0.35" />
      {/* Outer ring */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Emission rays */}
      <line x1="30" y1="8" x2="30" y2="3" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="49" y1="41" x2="53" y2="44" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="11" y1="41" x2="7" y2="44" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function DecoDecayChain({ size = 80, color = '#66BB6A', style = {} }) {
  return (
    <svg width={size} height={size * 0.5} viewBox="0 0 80 40" style={{ opacity: 0.2, ...style }}>
      {/* Decay chain arrow line */}
      <line x1="5" y1="20" x2="75" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Decay step nodes */}
      {[12, 28, 44, 60].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="20" r="4" fill={color} opacity={0.5 - i * 0.08} />
          {/* Alpha emission arcs */}
          <path d={`M${x + 4} 16 Q${x + 10} 10 ${x + 14} 16`} fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
        </g>
      ))}
      {/* Arrow */}
      <path d="M72 17 L78 20 L72 23" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Half-life notation */}
      <text x="40" y="36" textAnchor="middle" fill={color} fontSize="7" fontFamily="serif" opacity="0.4">t½</text>
    </svg>
  );
}

function DecoFissionSplit({ size = 70, color = '#7B1FA2', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central nucleus splitting */}
      <circle cx="26" cy="28" r="8" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="36" cy="32" r="7" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Neutron incoming */}
      <line x1="5" y1="30" x2="18" y2="28" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="5" cy="30" r="2" fill={color} opacity="0.5" />
      {/* Released neutrons */}
      <circle cx="48" cy="20" r="1.5" fill={color} opacity="0.4" />
      <circle cx="50" cy="38" r="1.5" fill={color} opacity="0.4" />
      <circle cx="45" cy="48" r="1.5" fill={color} opacity="0.4" />
      {/* Energy burst lines */}
      <line x1="31" y1="22" x2="35" y2="12" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="38" y1="25" x2="48" y2="15" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="40" y1="38" x2="52" y2="45" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DecoMedicalCross({ size = 60, color = '#81C784', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Medical cross */}
      <rect x="24" y="12" width="12" height="36" rx="3" fill={color} opacity="0.3" />
      <rect x="12" y="24" width="36" height="12" rx="3" fill={color} opacity="0.3" />
      {/* Radiation waves emanating from center */}
      <circle cx="30" cy="30" r="22" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <circle cx="30" cy="30" r="26" fill="none" stroke={color} strokeWidth="0.6" opacity="0.15" />
      {/* Small dots for particles */}
      <circle cx="10" cy="15" r="1.5" fill={color} opacity="0.4" />
      <circle cx="50" cy="12" r="1" fill={color} opacity="0.3" />
      <circle cx="52" cy="48" r="1.5" fill={color} opacity="0.4" />
      <circle cx="8" cy="45" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoReactorCore({ size = 70, color = '#8E24AA', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Cooling tower silhouette */}
      <path d="M20 50 Q18 35 22 25 Q26 15 30 10 Q34 15 38 25 Q42 35 40 50 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Steam */}
      <path d="M28 10 Q26 5 28 2" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M32 10 Q34 4 32 1" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M30 8 Q30 3 31 0" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Control rods */}
      <line x1="26" y1="25" x2="26" y2="45" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="30" y1="20" x2="30" y2="45" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="34" y1="25" x2="34" y2="45" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Glow at base */}
      <circle cx="30" cy="42" r="6" fill={color} opacity="0.15" />
    </svg>
  );
}

function DecoShieldALARA({ size = 70, color = '#388E3C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Shield shape */}
      <path d="M30 5 L50 15 L50 35 Q50 50 30 57 Q10 50 10 35 L10 15 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Inner shield */}
      <path d="M30 12 L44 20 L44 33 Q44 44 30 50 Q16 44 16 33 L16 20 Z" fill={color} opacity="0.08" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Check mark */}
      <path d="M22 32 L28 38 L40 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      {/* Radiation dots blocked */}
      <circle cx="4" cy="25" r="1.5" fill={color} opacity="0.4" />
      <circle cx="6" cy="35" r="1" fill={color} opacity="0.3" />
      <circle cx="56" cy="28" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'atomo-por-dentro': [DecoAtomNucleus, DecoRadiationSymbol, DecoDecayChain],
  'tipos-radiacion': [DecoRadiationSymbol, DecoAtomNucleus, DecoShieldALARA],
  'desintegracion-radiactiva': [DecoDecayChain, DecoAtomNucleus, DecoRadiationSymbol],
  'fision-fusion-nuclear': [DecoFissionSplit, DecoReactorCore, DecoAtomNucleus],
  'medicina-nuclear': [DecoMedicalCross, DecoAtomNucleus, DecoRadiationSymbol],
  'energia-nuclear': [DecoReactorCore, DecoFissionSplit, DecoDecayChain],
  'seguridad-radiologica': [DecoShieldALARA, DecoRadiationSymbol, DecoMedicalCross],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'Krane, K.S. (1988). Introductory Nuclear Physics, John Wiley & Sons',
  'Lilley, J.S. (2001). Nuclear Physics: Principles and Applications, John Wiley & Sons',
  'Turner, J.E. (2007). Atoms, Radiation, and Radiation Protection, 3rd ed., Wiley-VCH',
  'ICRP (2007). Publication 103: The 2007 Recommendations of the International Commission on Radiological Protection, Annals of the ICRP 37(2-4)',
  'Curie, M. (1904). Recherches sur les substances radioactives, Gauthier-Villars, Paris',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'atomo-por-dentro',
    title: 'El Átomo por Dentro',
    color: '#4CAF50',
    btnImage: '/assets/curie/curie_m5.png',
    image: '/assets/curie/curie_m5.png',
    content: [
      'El átomo está compuesto por un núcleo central rodeado de electrones que se mueven en regiones llamadas orbitales. El núcleo contiene dos tipos de partículas: los protones, que tienen carga eléctrica positiva, y los neutrones, que no tienen carga. Ernest Rutherford demostró esta estructura en 1911 mediante su experimento de dispersión de partículas alfa, en el que bombardeó una lámina de oro de apenas 0.00004 centímetros de espesor con partículas alfa emitidas por una fuente de Radio, descubriendo que la mayor parte del átomo es espacio vacío y que casi toda la masa se concentra en un núcleo diminuto.',
      'El número atómico de un elemento corresponde a la cantidad de protones en su núcleo y define su identidad química. El hidrógeno tiene un solo protón (Z=1), mientras que el uranio tiene 92 (Z=92). La masa atómica, en cambio, es la suma de protones y neutrones. El carbono-12 tiene 6 protones y 6 neutrones (A=12), pero el carbono-14 tiene 6 protones y 8 neutrones (A=14). Estos átomos con el mismo número de protones pero distinto número de neutrones se denominan isótopos, un concepto que Frederick Soddy definió formalmente en 1913 y por el cual recibió el Premio Nobel de Química en 1921.',
      'La fuerza nuclear fuerte es la responsable de mantener unidos a los protones y neutrones dentro del núcleo, superando la repulsión electromagnética entre los protones, que al tener carga positiva deberían repelerse entre sí. Esta fuerza actúa solo a distancias muy cortas, del orden de 10⁻¹⁵ metros (un femtómetro), y es aproximadamente 100 veces más intensa que la fuerza electromagnética. Hideki Yukawa predijo en 1935 que esta fuerza se transmitía mediante partículas llamadas mesones, y recibió el Premio Nobel de Física en 1949 cuando los mesones pi fueron detectados experimentalmente.',
      'El tamaño del núcleo atómico es sorprendentemente pequeño en comparación con el átomo completo. Si el átomo tuviera el tamaño de un estadio de fútbol, el núcleo sería del tamaño de una canica colocada en el centro del campo. Sin embargo, ese diminuto núcleo contiene más del 99.9% de la masa total del átomo. Un centímetro cúbico de materia nuclear pura, sin el espacio vacío del átomo, pesaría aproximadamente 200 millones de toneladas, una densidad comparable a la de una estrella de neutrones como la PSR J0348+0432, descubierta en 2013.',
      'Marie Curie contribuyó de manera directa al conocimiento del interior del átomo. Sus investigaciones sobre el polonio y el radio entre 1898 y 1902 demostraron que la radiactividad no era un fenómeno químico superficial, sino que provenía del interior mismo del átomo. Esta observación, que ella describió como una propiedad atómica intrínseca, fue una de las primeras evidencias de que los átomos no eran partículas indivisibles como se creía desde la época de Dalton en 1803. Sus mediciones precisas de la actividad del radio puro (que ella aisló por primera vez en 1910) proporcionaron datos fundamentales para la comprensión de la estructura nuclear.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Si pudieras eliminar todo el espacio vacío de los átomos que componen el cuerpo humano, toda la humanidad (unos 8.000 millones de personas) cabría en un volumen del tamaño de un terrón de azúcar. Esto se debe a que más del 99.9999999999996% del volumen de un átomo es espacio vacío entre el núcleo y los electrones. La materia que tocamos y que nos parece sólida es, en realidad, casi puro vacío sostenido por fuerzas electromagnéticas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El protón tiene una masa de 1.67262 × 10⁻²⁷ kilogramos, unas 1,836 veces mayor que la masa del electrón. Los quarks, las partículas que componen los protones y neutrones, fueron propuestos de forma independiente por Murray Gell-Mann y George Zweig en 1964. Cada protón contiene dos quarks \"up\" y un quark \"down\", unidos por la fuerza fuerte mediada por gluones. Este modelo fue confirmado en experimentos de dispersión profunda inelástica realizados en el acelerador SLAC de Stanford entre 1967 y 1973.' },
    ],
    fact: 'El experimento de Rutherford de 1911 reveló que solo 1 de cada 8.000 partículas alfa rebotaba al impactar la lámina de oro, demostrando que el núcleo ocupa una fracción diminuta del volumen atómico. Rutherford describió su sorpresa diciendo: «Fue como si dispararas un proyectil de 15 pulgadas contra una hoja de papel de seda y este rebotara hacia ti». Hans Geiger y Ernest Marsden, sus colaboradores, contaron más de un millón de destellos de centelleo a mano durante meses para obtener estos datos estadísticos.',
  },
  {
    id: 'tipos-radiacion',
    title: 'Tipos de Radiación',
    color: '#6A1B9A',
    btnImage: '/assets/curie/curie_m5.png',
    image: '/assets/curie/curie_m5.png',
    content: [
      'La radiación alfa (α) consiste en núcleos de helio-4 emitidos a gran velocidad desde el núcleo de un átomo inestable. Cada partícula alfa contiene exactamente 2 protones y 2 neutrones, lo que le da una masa de aproximadamente 6.64 × 10⁻²⁷ kg y una carga eléctrica de +2. Fueron identificadas por primera vez por Ernest Rutherford en 1899 mientras estudiaba la radiación del uranio en la Universidad McGill de Montreal. Las partículas alfa son relativamente lentas (viajan a unos 15,000 km/s) y pesadas, por lo que pueden ser detenidas por una simple hoja de papel, la capa externa de la piel humana, o incluso unos pocos centímetros de aire.',
      'La radiación beta (β) está formada por electrones (beta negativa, β⁻) o positrones (beta positiva, β⁺) emitidos desde el núcleo durante transformaciones nucleares. En la desintegración beta negativa, un neutrón se convierte en un protón, un electrón y un antineutrino electrónico. Enrico Fermi desarrolló la teoría matemática de la desintegración beta en 1933, y Wolfgang Pauli había postulado la existencia del neutrino en 1930 para explicar por qué los electrones emitidos tenían un espectro continuo de energías en lugar de una energía fija. Las partículas beta pueden penetrar varios milímetros de aluminio, pero son detenidas por unos pocos milímetros de plexiglás o plástico denso.',
      'La radiación gamma (γ) consiste en fotones de alta energía emitidos por el núcleo atómico cuando este pasa de un estado de energía elevado a uno más bajo. A diferencia de las partículas alfa y beta, los rayos gamma no tienen masa ni carga eléctrica, y viajan a la velocidad de la luz (299,792 km/s). Paul Villard descubrió los rayos gamma en 1900 al estudiar la radiación del radio, y Rutherford los nombró en 1903 siguiendo la nomenclatura griega que había establecido para alfa y beta. Los rayos gamma pueden atravesar varios centímetros de plomo y requieren gruesos blindajes de plomo, hormigón o agua para ser atenuados de forma significativa.',
      'La capacidad de penetración de cada tipo de radiación tiene implicaciones prácticas directas. Las partículas alfa, al ser detenidas fácilmente, representan un riesgo menor si la fuente es externa, pero un riesgo severo si se inhalan o ingieren materiales emisores alfa como el polonio-210 (el isótopo que envenenó al exespía Alexander Litvinenko en Londres en noviembre de 2006). Las partículas beta pueden causar quemaduras en la piel y daño a los ojos. Los rayos gamma, por su alto poder de penetración, pueden dañar órganos internos desde fuentes externas y son la forma de radiación que requiere los blindajes más robustos en instalaciones nucleares.',
      'Existe un cuarto tipo de radiación menos conocido: la radiación de neutrones. Los neutrones libres, al no tener carga eléctrica, no interaccionan con los electrones de los átomos y atraviesan la materia con facilidad hasta que chocan con un núcleo atómico. James Chadwick descubrió el neutrón en 1932 en el Laboratorio Cavendish de Cambridge, un hallazgo que le valió el Premio Nobel de Física en 1935. Los materiales ricos en hidrógeno, como el agua y el polietileno, son los más efectivos para frenar neutrones, ya que el núcleo de hidrógeno tiene una masa similar a la del neutrón, lo que permite una transferencia de energía máxima en cada colisión, similar a una bola de billar golpeando otra de igual tamaño.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Marie Curie nunca supo exactamente qué tipo de radiación emitía cada elemento que descubrió, porque en su época (1898-1902) los conceptos de alfa, beta y gamma apenas se estaban definiendo. Lo que sí midió con precisión fue la intensidad de la radiación usando un electrómetro piezoeléctrico diseñado por Pierre Curie y su hermano Jacques. Este dispositivo, con sensibilidad de 10⁻¹¹ amperios, le permitió demostrar que la radiactividad era proporcional a la cantidad de uranio presente, independientemente de su estado químico.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La energía de los rayos gamma emitidos por núcleos radiactivos varía según el isótopo. El cobalto-60 emite dos fotones gamma con energías de 1.17 MeV y 1.33 MeV. El cesio-137 emite un fotón gamma de 0.662 MeV. Para comparar, la luz visible tiene una energía de apenas 1.6 a 3.4 electronvoltios (eV), es decir, los rayos gamma son entre 200,000 y un millón de veces más energéticos que la luz que perciben nuestros ojos, lo que explica su capacidad para penetrar la materia y dañar el ADN celular.' },
    ],
    fact: 'En 1903, Rutherford y Soddy publicaron la teoría de la desintegración radiactiva, proponiendo que los átomos de un elemento pueden transformarse espontáneamente en átomos de otro elemento mediante la emisión de partículas alfa o beta. Esta idea fue tan revolucionaria que muchos científicos la rechazaron inicialmente, porque parecía una forma de alquimia: la transmutación de los elementos. Rutherford recibió el Premio Nobel de Química en 1908 por este trabajo, y comentó con ironía que él había observado muchas transformaciones en la radiactividad, pero ninguna tan rápida como su propia transformación de físico a químico.',
  },
  {
    id: 'desintegracion-radiactiva',
    title: 'Desintegración Radiactiva',
    color: '#66BB6A',
    btnImage: '/assets/curie/curie_m5.png',
    image: '/assets/curie/curie_m5.png',
    content: [
      'La desintegración radiactiva es el proceso mediante el cual un núcleo atómico inestable pierde energía emitiendo radiación. Este proceso es completamente aleatorio a nivel individual: es imposible predecir cuándo se desintegrará un átomo específico. Sin embargo, para un gran número de átomos, la estadística es muy precisa. El concepto clave es la vida media o semivida (t½), que es el tiempo necesario para que la mitad de los átomos de una muestra radiactiva se desintegren. Rutherford y Soddy introdujeron este concepto en 1902 al estudiar el torio en la Universidad McGill, y observaron que la actividad de las muestras se reducía a la mitad en intervalos de tiempo regulares y predecibles.',
      'Las vidas medias de los distintos isótopos varían en un rango de magnitudes que desafía la imaginación humana. El polonio-214 tiene una vida media de solo 164 microsegundos (0.000164 segundos), mientras que el bismuto-209, considerado durante mucho tiempo como el elemento estable más pesado, tiene una vida media de aproximadamente 1.9 × 10¹⁹ años, más de mil millones de veces la edad actual del universo (13,800 millones de años). El carbono-14, con una vida media de 5,730 años, es el isótopo utilizado para datar restos arqueológicos: Willard Libby desarrolló esta técnica en 1949 en la Universidad de Chicago y recibió el Premio Nobel de Química en 1960.',
      'Las cadenas de desintegración son secuencias en las que un isótopo radiactivo se transforma en otro, que a su vez se transforma en un tercero, y así sucesivamente hasta alcanzar un isótopo estable. La cadena del uranio-238 es una de las más largas y estudiadas: comienza con U-238 (vida media de 4,470 millones de años) y pasa por 14 desintegraciones sucesivas, incluyendo torio-234, radio-226 (estudiado por Marie Curie), radón-222 (un gas noble radiactivo) y polonio-210, hasta terminar en plomo-206, un isótopo estable. Todo este proceso tarda en promedio unos 4,500 millones de años en completarse desde el uranio-238 inicial.',
      'La ley de desintegración radiactiva se expresa matemáticamente como N(t) = N₀ × e^(−λt), donde N₀ es el número inicial de átomos, λ es la constante de desintegración (relacionada con la vida media por λ = ln2/t½), y t es el tiempo transcurrido. Esta ecuación exponencial decreciente fue derivada por Rutherford y Soddy en 1902. Un ejemplo práctico: si tenemos 1,000 átomos de yodo-131 (t½ = 8.02 días), después de 8 días quedarán 500, después de 16 días quedarán 250, después de 24 días quedarán 125, y así sucesivamente. Después de 10 vidas medias (80 días), quedarán menos de 1 átomo de cada 1,024 originales.',
      'Marie Curie fue una pionera en la medición precisa de constantes de desintegración. En su tesis doctoral de 1903, midió la actividad específica del radio-226 y determinó que un gramo de radio emitía suficiente energía para elevar su propia temperatura 1.5 grados Celsius por hora, un resultado confirmado de forma independiente por Pierre Curie y Albert Laborde. Esta liberación constante de energía del radio fue uno de los misterios más profundos de la física de principios del siglo XX: ¿de dónde venía esa energía aparentemente inagotable? La respuesta vendría décadas después con la ecuación E = mc² de Einstein (1905), que mostró que la pequeña pérdida de masa durante la desintegración se convertía en una cantidad sustancial de energía.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La datación por carbono-14 permitió datar el Sudario de Turín. En 1988, tres laboratorios independientes (Oxford, Zúrich y la Universidad de Arizona) analizaron muestras del tejido y determinaron que el lino databa de entre 1260 y 1390 d.C., consistente con una fabricación medieval. La precisión de la datación se basa en la vida media del C-14 (5,730 años) y en el hecho de que los organismos vivos absorben C-14 del CO₂ atmosférico mientras están vivos, pero dejan de hacerlo al morir.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El radón-222, un gas noble radiactivo con vida media de 3.82 días, es la segunda causa de cáncer de pulmón en el mundo después del tabaco. Se genera naturalmente en el suelo por la desintegración del radio-226 (parte de la cadena del uranio-238) y puede acumularse en sótanos y plantas bajas de edificios. La Organización Mundial de la Salud estima que causa entre el 3% y el 14% de todos los cánceres de pulmón dependiendo del país, y la EPA de Estados Unidos establece un nivel de acción de 148 Bq/m³ para viviendas.' },
    ],
    fact: 'En 1903, Pierre Curie y Albert Laborde midieron que un gramo de radio emitía continuamente 100 calorías por hora (418 julios/hora), suficiente para derretir su propio peso en hielo en aproximadamente una hora. Esta observación planteó una paradoja para la física de la época: según las leyes de la termodinámica conocidas, no existía ninguna fuente de energía química capaz de sostener esa producción durante siglos. El radio parecía violar la conservación de la energía. Solo con la relatividad de Einstein (E=mc²) y la comprensión de la energía de enlace nuclear se resolvió el misterio: la masa perdida durante la desintegración se convierte directamente en energía cinética de las partículas emitidas.',
  },
  {
    id: 'fision-fusion-nuclear',
    title: 'Fisión y Fusión Nuclear',
    color: '#7B1FA2',
    btnImage: '/assets/curie/curie_m5.png',
    image: '/assets/curie/curie_m5.png',
    content: [
      'La fisión nuclear es el proceso en el que un núcleo atómico pesado se divide en dos o más fragmentos más ligeros, liberando una gran cantidad de energía y neutrones adicionales. Otto Hahn y Fritz Strassmann descubrieron la fisión del uranio en diciembre de 1938 en Berlín al bombardear uranio con neutrones y detectar bario entre los productos, un resultado que Lise Meitner y su sobrino Otto Robert Frisch interpretaron correctamente como la ruptura del núcleo en enero de 1939. Frisch acuñó el término «fisión» por analogía con la fisión biológica celular. La energía liberada por la fisión de un solo átomo de uranio-235 es de aproximadamente 200 MeV, equivalente a la energía de unas 3.2 × 10⁻¹¹ julios.',
      'La reacción en cadena ocurre cuando los neutrones liberados por una fisión provocan la fisión de otros núcleos cercanos, que a su vez liberan más neutrones, y así sucesivamente. Enrico Fermi y su equipo lograron la primera reacción en cadena autosostenida controlada el 2 de diciembre de 1942 en el reactor Chicago Pile-1, construido debajo de las gradas del estadio de la Universidad de Chicago. La masa crítica, la cantidad mínima de material fisil necesaria para sostener una reacción en cadena, es de aproximadamente 52 kg para el uranio-235 en forma de esfera sin reflector, y solo 10 kg para el plutonio-239 en las mismas condiciones geométricas.',
      'El Proyecto Manhattan, dirigido por J. Robert Oppenheimer desde el Laboratorio de Los Álamos en Nuevo México, desarrolló las primeras armas nucleares entre 1942 y 1945 con un presupuesto total de aproximadamente 2,000 millones de dólares de la época (equivalente a unos 28,000 millones de dólares actuales). La prueba Trinity, el 16 de julio de 1945, detonó un dispositivo de plutonio con una potencia de 21 kilotones (equivalente a 21,000 toneladas de TNT). Las bombas sobre Hiroshima (6 de agosto, uranio-235, 15 kilotones) y Nagasaki (9 de agosto, plutonio-239, 21 kilotones) causaron entre 129,000 y 226,000 muertes y marcaron el inicio de la era nuclear.',
      'La fusión nuclear es el proceso inverso: dos núcleos ligeros se combinan para formar un núcleo más pesado, liberando energía aún mayor que la fisión. La fusión de deuterio y tritio (isótopos del hidrógeno) produce helio-4 y un neutrón, liberando 17.6 MeV por reacción. Este es el proceso que alimenta las estrellas: el Sol convierte 620 millones de toneladas de hidrógeno en helio cada segundo, y las mediciones del satélite SOHO de la NASA confirman que emite una potencia total de 3.846 × 10²⁶ vatios. Hans Bethe describió el ciclo protón-protón de fusión estelar en 1939, trabajo por el que recibió el Premio Nobel en 1967.',
      'El proyecto ITER (Reactor Termonuclear Experimental Internacional), en construcción en Cadarache, Francia, desde 2010, es el mayor experimento de fusión nuclear del mundo. Diseñado para producir 500 MW de potencia de fusión a partir de 50 MW de potencia de calentamiento (factor de ganancia Q=10), ITER utilizará un plasma de deuterio-tritio a una temperatura de 150 millones de grados Celsius, diez veces más caliente que el centro del Sol, confinado magnéticamente en una cámara toroidal (tokamak) de 23,000 toneladas. Su primer plasma está programado para 2025, y las primeras operaciones con deuterio-tritio para 2035. Si tiene éxito, demostrará la viabilidad de la fusión como fuente de energía para futuras generaciones.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Lise Meitner, la física que proporcionó la interpretación teórica correcta de la fisión nuclear en 1939, fue excluida del Premio Nobel de Química de 1944, que se otorgó solo a Otto Hahn. Meitner había huido de la Alemania nazi en julio de 1938 por su ascendencia judía y realizó los cálculos clave de la fisión desde Suecia. Fue nominada al Nobel en 48 ocasiones entre 1937 y 1965 sin recibirlo jamás. El elemento 109, el meitnerio (Mt), fue nombrado en su honor en 1997, un reconocimiento que llegó 29 años después de su muerte.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La energía de enlace nuclear por nucleón alcanza su máximo en el hierro-56 (8.79 MeV por nucleón), lo que explica por qué tanto la fisión de núcleos pesados como la fusión de núcleos ligeros liberan energía: ambos procesos producen núcleos más cercanos al hierro en la curva de energía de enlace. Los elementos más pesados que el hierro se formaron en explosiones de supernovas y colisiones de estrellas de neutrones, como la observada por LIGO y Virgo el 17 de agosto de 2017 (GW170817), que produjo entre 3 y 13 masas terrestres de oro.' },
    ],
    fact: 'El reactor Chicago Pile-1, donde Fermi logró la primera reacción en cadena controlada, estaba construido con 385 toneladas de grafito, 40 toneladas de óxido de uranio y 6 toneladas de uranio metálico, apilados en una estructura de 7.5 metros de ancho y 6 metros de alto bajo las gradas de un estadio de squash. No tenía blindaje contra la radiación ni sistema de enfriamiento de emergencia. Fermi controló la reacción con barras de cadmio que absorben neutrones, insertadas y extraídas manualmente. El experimento duró 28 minutos y generó solo 0.5 vatios de potencia, pero demostró que la energía nuclear podía ser controlada por el ser humano.',
  },
  {
    id: 'medicina-nuclear',
    title: 'Medicina Nuclear',
    color: '#81C784',
    btnImage: '/assets/curie/curie_m5.png',
    image: '/assets/curie/curie_m5.png',
    content: [
      'La medicina nuclear utiliza isótopos radiactivos para diagnosticar y tratar enfermedades, y su historia se remonta directamente al trabajo de Marie Curie. Tras descubrir el radio en 1898, Marie observó que la radiación destruía células enfermas más rápido que las sanas, una propiedad que Henri-Alexandre Danlos y Eugène Bloch utilizaron en 1901 en el Hospital Saint-Louis de París para tratar un tumor cutáneo con un tubo de radio colocado sobre la lesión. En 1903, Alexander Graham Bell sugirió insertar fuentes de radio directamente en tumores sólidos, sentando las bases de lo que hoy conocemos como braquiterapia. La radioterapia moderna utiliza aceleradores lineales que generan rayos X de alta energía (6-18 MeV) con precisión milimétrica.',
      'La tomografía por emisión de positrones (PET) es una de las herramientas de diagnóstico más avanzadas de la medicina actual. El paciente recibe una inyección de un radiofármaco, generalmente fluorodesoxiglucosa marcada con flúor-18 (¹⁸F-FDG), un análogo de la glucosa. Las células cancerosas, que consumen más glucosa que las células normales, acumulan el radiofármaco. El flúor-18, con vida media de 109.77 minutos, emite positrones que se aniquilan con los electrones cercanos, produciendo dos fotones gamma de 511 keV en direcciones opuestas que son detectados simultáneamente por el escáner. La primera cámara PET fue desarrollada por Michael Ter-Pogossian y Michel Phelps en la Universidad de Washington en 1975.',
      'El tecnecio-99m (⁹⁹ᵐTc) es el isótopo más utilizado en medicina nuclear: se emplea en más del 80% de los aproximadamente 40 millones de procedimientos de diagnóstico nuclear que se realizan cada año en el mundo. Su vida media de solo 6.01 horas es suficiente para realizar el estudio diagnóstico pero lo bastante corta para que la dosis de radiación al paciente sea limitada. Emite rayos gamma de 140 keV, una energía que atraviesa el cuerpo pero es fácilmente detectable por las gammacámaras. El tecnecio-99m se obtiene de generadores de molibdeno-99 (vida media: 66 horas), que se producen en reactores nucleares de investigación como el NRU de Canadá o el HFR de los Países Bajos.',
      'El yodo-131 (¹³¹I) revolucionó el tratamiento de enfermedades de la tiroides. La glándula tiroides absorbe yodo selectivamente para producir hormonas, por lo que al administrar yodo-131 por vía oral, este se concentra en la tiroides y destruye el tejido enfermo con su radiación beta (energía máxima 606 keV, vida media 8.02 días). Saul Hertz realizó el primer tratamiento de hipertiroidismo con yodo radiactivo en 1941 en el Hospital General de Massachusetts, y desde entonces se ha convertido en el tratamiento estándar para el cáncer de tiroides diferenciado, con tasas de supervivencia a 10 años superiores al 90% para la mayoría de los pacientes.',
      'Marie Curie no solo inspiró la medicina nuclear con sus descubrimientos, sino que la practicó directamente durante la Primera Guerra Mundial con sus unidades radiológicas móviles, las «Petites Curies». Equipó 20 vehículos con equipos de rayos X y los llevó al frente de batalla, donde se examinaron más de un millón de soldados heridos entre 1914 y 1918. Además, Curie desarrolló agujas de emanación de radio (gas radón-222 encapsulado) para esterilizar heridas infectadas. El Instituto Curie que ella fundó en 1914 en París sigue siendo uno de los centros de investigación y tratamiento del cáncer más importantes de Europa, tratando a más de 12,000 pacientes cada año con técnicas que evolucionaron directamente de los métodos pioneros de Marie.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El primer tratamiento exitoso de un cáncer con radiación se realizó en 1896, apenas un año después de que Röntgen descubriera los rayos X. Emil Grubbe, un estudiante de medicina de Chicago, irradió a una paciente con cáncer de mama usando un tubo de Crookes. Aunque la paciente murió posteriormente, el tumor se redujo. Grubbe mismo sufrió graves quemaduras por radiación y terminó perdiendo dedos, una mano y parte de su rostro a lo largo de su vida, convirtiéndose trágicamente en ejemplo de los riesgos de la radiación no controlada.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La protonterapia, una forma avanzada de radioterapia, utiliza haces de protones en lugar de rayos X para destruir tumores. Los protones depositan la mayor parte de su energía en una profundidad específica del tejido (el pico de Bragg), lo que permite irradiar tumores profundos sin dañar los tejidos sanos circundantes. Robert R. Wilson propuso esta aplicación en 1946, y el primer paciente fue tratado en 1954 en el Laboratorio Lawrence Berkeley. En 2024, existen más de 100 centros de protonterapia operativos en el mundo, con especial efectividad en tumores pediátricos y tumores cercanos a órganos críticos como el cerebro y los ojos.' },
    ],
    fact: 'Irène Joliot-Curie, hija de Marie Curie, y su esposo Frédéric Joliot-Curie recibieron el Premio Nobel de Química en 1935 por descubrir la radiactividad artificial: demostraron que al bombardear aluminio-27 con partículas alfa, se producía fósforo-30, un isótopo radiactivo que no existe en la naturaleza. Este descubrimiento hizo posible la producción industrial de isótopos radiactivos para uso médico, sin depender de elementos radiactivos naturales escasos como el radio. Hoy, la producción de radiofármacos es una industria que genera más de 6,000 millones de dólares anuales y es la base de la medicina nuclear moderna.',
  },
  {
    id: 'energia-nuclear',
    title: 'Energía Nuclear',
    color: '#8E24AA',
    btnImage: '/assets/curie/curie_m5.png',
    image: '/assets/curie/curie_m5.png',
    content: [
      'Las centrales nucleares de fisión generan electricidad utilizando el calor producido por la fisión controlada del uranio-235 o el plutonio-239. Un reactor nuclear típico de agua presurizada (PWR) contiene entre 80 y 100 toneladas de combustible de uranio enriquecido al 3-5% en U-235, encapsulado en barras de zircaloy dentro de la vasija del reactor. Los neutrones liberados por la fisión son moderados (frenados) por agua presurizada a 155 atmósferas, que también transfiere el calor a un generador de vapor. Una central nuclear de 1,000 MW de potencia eléctrica, como las del tipo que opera en Cofrentes (España) o Laguna Verde (México), produce electricidad suficiente para abastecer a más de un millón de hogares.',
      'La energía nuclear suministra aproximadamente el 10% de la electricidad mundial, según datos de la Agencia Internacional de Energía Atómica (OIEA) de 2023. Francia lidera con un 70% de su electricidad de origen nuclear (56 reactores operativos), seguida de Eslovaquia (53%), Ucrania (55% antes de 2022) y Hungría (46%). En total, 440 reactores nucleares comerciales operan en 32 países. Un kilogramo de uranio-235 libera aproximadamente 82 terajulios de energía, equivalente a la combustión de 2,800 toneladas de carbón o 2,000 toneladas de petróleo, lo que convierte al combustible nuclear en la fuente de energía más densa disponible comercialmente.',
      'El accidente de Chernóbil, ocurrido el 26 de abril de 1986 en la central nuclear Vladímir Ilich Lenin, cerca de Prípiat (Ucrania soviética), fue el peor desastre nuclear de la historia. Una prueba de seguridad mal ejecutada en el reactor RBMK-1000 número 4 provocó una explosión de vapor y un incendio de grafito que liberó aproximadamente 400 veces más material radiactivo que la bomba de Hiroshima. La contaminación por cesio-137 (vida media: 30.17 años) y estroncio-90 (vida media: 28.8 años) afectó una zona de exclusión de 2,600 km² que permanece deshabitada. El Foro de Chernóbil de la ONU estimó que hasta 4,000 personas podrían morir eventualmente por cánceres relacionados con la radiación del accidente.',
      'El desastre de Fukushima Daiichi, el 11 de marzo de 2011 en Japón, fue provocado por un terremoto de magnitud 9.0 y el subsiguiente tsunami de 14 metros que inundó la central y destruyó los sistemas de refrigeración de emergencia de tres reactores. Los núcleos de los reactores 1, 2 y 3 sufrieron fusión parcial, y las explosiones de hidrógeno dañaron los edificios de contención. A diferencia de Chernóbil, la liberación radiactiva fue significativamente menor (unas 10 veces menos cesio-137), y no se ha documentado ninguna muerte directa por exposición a la radiación. Sin embargo, la evacuación forzosa de 154,000 personas y la contaminación del agua del Pacífico convirtieron este evento en el segundo accidente nuclear más grave de la historia (nivel 7 en la escala INES).',
      'Los pequeños reactores modulares (SMR, por sus siglas en inglés) representan el futuro de la energía nuclear. Con potencias de entre 10 y 300 MW (frente a los 1,000 MW de un reactor convencional), los SMR se diseñan para ser fabricados en fábricas y transportados al sitio de instalación, reduciendo costos y tiempos de construcción. El reactor NuScale de 77 MW recibió la primera certificación de diseño de la Comisión Reguladora Nuclear de Estados Unidos en 2023. China conectó a la red su reactor HTR-PM de 200 MW en diciembre de 2021, que utiliza combustible TRISO (esferas de uranio recubiertas de cerámica) y helio como refrigerante, lo que lo hace inherentemente seguro contra fusiones del núcleo incluso sin intervención humana ni sistemas de emergencia.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Zona de Exclusión de Chernóbil se ha convertido inesperadamente en un refugio para la vida silvestre. Desde la evacuación humana en 1986, la población de lobos, alces, ciervos, jabalíes y caballos de Przewalski ha crecido de manera notable. Un estudio de 2015 publicado en Current Biology por Jim Smith del equipo del proyecto TREE encontró que la abundancia de mamíferos en la zona era comparable a la de reservas naturales no contaminadas. Incluso se han avistado osos pardos y bisontes europeos, especies que no se veían en la región desde hacía décadas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los residuos nucleares de alta actividad, principalmente el combustible gastado, contienen isótopos como el plutonio-239 (vida media: 24,110 años) y el americio-241 (vida media: 432 años). Finlandia está construyendo Onkalo, el primer depósito geológico profundo del mundo para almacenar residuos nucleares a 450 metros bajo tierra en roca granítica de 1,800 millones de años de antigüedad. Diseñado para mantener los residuos aislados durante al menos 100,000 años, Onkalo planea comenzar operaciones en 2025 y sellarse definitivamente alrededor de 2120.' },
    ],
    fact: 'La primera central nuclear comercial del mundo fue Calder Hall, en Sellafield (Inglaterra), que comenzó a generar electricidad el 27 de agosto de 1956 con una potencia de 50 MW. Su reactor Magnox usaba uranio natural como combustible, grafito como moderador y CO₂ como refrigerante. Operó durante 47 años antes de cerrar en 2003. En contraste, la central nuclear Beznau-1 en Suiza, conectada a la red en 1969, sigue operativa en 2024 con 55 años de servicio, siendo el reactor nuclear comercial más antiguo del mundo aún en funcionamiento.',
  },
  {
    id: 'seguridad-radiologica',
    title: 'Seguridad Radiológica',
    color: '#388E3C',
    btnImage: '/assets/curie/curie_m5.png',
    image: '/assets/curie/curie_m5.png',
    content: [
      'La dosis de radiación se mide en sieverts (Sv), una unidad que cuantifica el efecto biológico de la radiación sobre el tejido humano, teniendo en cuenta tanto la energía absorbida como el tipo de radiación. Fue nombrada en honor al físico sueco Rolf Maximilian Sievert (1896-1966), pionero de la protección radiológica. Un sievert equivale a la absorción de un julio de energía por kilogramo de tejido, ponderado por un factor de calidad que depende del tipo de radiación: el factor es 1 para rayos gamma y beta, 5 para protones, y 20 para partículas alfa y neutrones rápidos, reflejando el mayor daño biológico que causan las partículas pesadas y cargadas al atravesar las células.',
      'Toda persona en la Tierra está expuesta a radiación de fondo natural, que proviene de cuatro fuentes principales. La radiación cósmica, originada en el Sol y el espacio exterior, contribuye aproximadamente 0.39 mSv/año al nivel del mar, pero aumenta con la altitud (los pilotos de aviones comerciales reciben hasta 3 mSv/año adicionales). La radiación terrestre, emitida por isótopos naturales en el suelo como potasio-40, uranio-238 y torio-232, contribuye unos 0.48 mSv/año. La radiación interna, procedente de isótopos incorporados al cuerpo con los alimentos (principalmente potasio-40), aporta 0.29 mSv/año. Y el radón-222 inhalado contribuye en promedio 1.26 mSv/año, siendo la mayor fuente individual. La dosis total de fondo natural promedio mundial es de 2.4 mSv/año según el UNSCEAR (Comité Científico de las Naciones Unidas).',
      'El principio ALARA (As Low As Reasonably Achievable, tan bajo como sea razonablemente posible) es el pilar fundamental de la protección radiológica moderna. Fue formalizado por la Comisión Internacional de Protección Radiológica (ICRP) en su Publicación 26 de 1977 y reforzado en la Publicación 103 de 2007. ALARA se basa en tres estrategias: tiempo (reducir la duración de exposición), distancia (la intensidad de radiación disminuye con el cuadrado de la distancia a la fuente, según la ley del inverso del cuadrado) y blindaje (interponer materiales absorbentes como plomo, hormigón o agua entre la fuente y las personas). Los límites de dosis establecidos por la ICRP son de 20 mSv/año para trabajadores de la industria nuclear y 1 mSv/año para el público general, además de la radiación natural.',
      'Los efectos biológicos de la radiación se clasifican en deterministas y estocásticos. Los efectos deterministas tienen un umbral de dosis y su gravedad aumenta con la dosis: el síndrome de irradiación aguda aparece a partir de 1 Sv de dosis corporal total, con náuseas y daño a la médula ósea; por encima de 6 Sv, la probabilidad de muerte sin tratamiento médico supera el 50%. Los efectos estocásticos, principalmente el cáncer, no tienen un umbral demostrado y su probabilidad (no su gravedad) aumenta con la dosis: el coeficiente de riesgo aceptado es de aproximadamente 5% por sievert para cánceres mortales, basado en los estudios epidemiológicos de los supervivientes de Hiroshima y Nagasaki realizados por la Radiation Effects Research Foundation desde 1950.',
      'Marie Curie es un ejemplo trágico de los riesgos de la radiación sin protección. Trabajó durante décadas con materiales radiactivos sin guantes de plomo, sin delantal protector y llevando tubos de radio en los bolsillos de su bata. Sus cuadernos de laboratorio, conservados en la Biblioteca Nacional de Francia, son tan radiactivos (contaminados con radio-226, vida media de 1,600 años) que se guardan en cajas forradas de plomo y solo pueden consultarse con ropa protectora. Marie falleció el 4 de julio de 1934 de anemia aplásica, una enfermedad en la que la médula ósea deja de producir células sanguíneas, causada por la exposición crónica a la radiación. Su muerte impulsó el desarrollo de las primeras normas internacionales de protección radiológica, establecidas por la ICRP (fundada en 1928) en las décadas siguientes.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Un plátano contiene aproximadamente 15 becquerelios de potasio-40 (⁴⁰K), un isótopo radiactivo natural con una vida media de 1,250 millones de años. Comer un plátano produce una dosis de radiación de unos 0.1 microsieverts, lo que ha dado lugar a la «dosis equivalente de plátano» (BED), una unidad informal usada para comunicar dosis radiológicas al público. Para comparar: una radiografía de tórax equivale a unas 200 dosis de plátano, una tomografía computarizada a unas 70,000, y la dosis anual máxima permitida para un trabajador nuclear equivale a unos 200 millones de plátanos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El becquerel (Bq), la unidad SI de actividad radiactiva, equivale a una desintegración nuclear por segundo. Fue nombrado en honor a Henri Becquerel, quien descubrió la radiactividad natural en 1896 al observar que sales de uranio velaban placas fotográficas protegidas de la luz. La antigua unidad, el curio (Ci), fue nombrada en honor de Marie y Pierre Curie: 1 Ci = 3.7 × 10¹⁰ Bq, que corresponde a la actividad de un gramo de radio-226. El cuerpo humano adulto tiene una actividad de aproximadamente 7,000 Bq, principalmente por los 140 gramos de potasio natural que contiene, del cual el 0.012% es potasio-40 radiactivo.' },
    ],
    fact: 'El accidente del Demonio Nuclear (Demon Core) ilustra los riesgos de la criticidad nuclear. El 21 de agosto de 1945, Harry Daghlian sufrió una dosis letal de radiación al dejar caer un bloque de carburo de tungsteno sobre una esfera subcrítica de plutonio-239 de 6.2 kg en Los Álamos, muriendo 25 días después. El 21 de mayo de 1946, Louis Slotin recibió una dosis mortal al separar dos semiesferas de berilio alrededor de la misma esfera de plutonio usando solo un destornillador, que se deslizó y permitió que la masa se volviera brevemente supercrítica. Slotin murió 9 días después. Estos accidentes impulsaron el desarrollo de protocolos estrictos de seguridad en el manejo de material fisil.',
  },
];

// ─── Radioactive Particle Field (Canvas Background) ──────────────────────────
function RadioactiveField() {
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
      hue: Math.random() > 0.5 ? '76,175,80' : '106,27,154', // green or violet
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

// ─── Radiation Science Header ────────────────────────────────────────────────
function RadiationHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(76,175,80,0.3))' }}>
        {/* Nuclear arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#nucGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 120;
          const colors = ['#4CAF50','#6A1B9A','#66BB6A','#7B1FA2','#81C784','#8E24AA','#388E3C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central atom icon */}
        <circle cx="300" cy="30" r="5" fill="#4CAF50" opacity="0.5" />
        <ellipse cx="300" cy="30" rx="14" ry="6" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.4" />
        <ellipse cx="300" cy="30" rx="14" ry="6" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.4" transform="rotate(60 300 30)" />
        <ellipse cx="300" cy="30" rx="14" ry="6" fill="none" stroke="#4CAF50" strokeWidth="1" opacity="0.4" transform="rotate(120 300 30)" />
        <defs>
          <linearGradient id="nucGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(76,175,80,0.2)" />
            <stop offset="50%" stopColor="rgba(76,175,80,0.9)" />
            <stop offset="100%" stopColor="rgba(76,175,80,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#4CAF50" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">RADIACTIVIDAD</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(76,175,80,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">LA CIENCIA DEL ÁTOMO</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button (matching M9 Dendera style) ─────────────────────────
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
        border: `3px solid ${isActive ? node.color : 'rgba(76,175,80,0.2)'}`,
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
        fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.3px',
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
          layoutId="activeDotCurieM5"
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

// ─── Magazine-Style Content Panel ────────────────────────────────────────────
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
            margin: '0 0 0.8rem', fontSize: '1.5rem', fontWeight: 800, color: node.color, letterSpacing: '-0.02em',
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
                position: 'absolute', ...pos, zIndex: 1, pointerEvents: 'none',
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
                  position: 'absolute', top: '-8px', left: '12px', background: node.color, color: '#0B0E2D',
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

        {/* ─── Conditional Video Render ─── */}
        {node.video && (
          <div style={{ marginTop: '1.2rem', position: 'relative', zIndex: 2 }}>
            <VideoPlayer
              src={node.video.src}
              title={node.video.title}
              color={node.color}
              poster={node.video.poster}
            />
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
                fontSize: '0.7rem', fontWeight: 800, color: node.color, letterSpacing: '2px', textTransform: 'uppercase',
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
      border: '1px solid rgba(76,175,80,0.15)',
    }}>
      <Star size={14} style={{ color: '#4CAF50', flexShrink: 0 }} />
      <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #4CAF50, #6A1B9A)', borderRadius: '3px', boxShadow: '0 0 8px rgba(76,175,80,0.4)' }}
        />
      </div>
      <span style={{ fontSize: '0.75rem', color: '#4CAF50', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '45px', textAlign: 'right' }}>
        {explored}/{total}
      </span>
    </div>
  );
}

// ─── Main Infographic Component ──────────────────────────────────────────────
export default function InteractiveInfographic_CurieM5() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/curie/curie_m5.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(76,175,80,0.12)',
      boxShadow: '0 0 60px rgba(10,12,30,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <RadioactiveField />

      <RadiationHeader />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', margin: '0 auto 1.5rem' }}>
        <ProgressBar explored={explored.size} total={INFOGRAPHIC_NODES.length} />
      </div>

      {explored.size === 0 && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            textAlign: 'center', color: 'rgba(76,175,80,0.7)', fontSize: '0.85rem',
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
              background: 'rgba(76,175,80,0.08)', borderRadius: '16px',
              border: '1px solid rgba(76,175,80,0.25)', position: 'relative', zIndex: 2,
            }}
          >
            <p style={{ margin: 0, color: '#4CAF50', fontSize: '1.1rem', fontWeight: 'bold' }}>
              🏆 ¡Has dominado la Ciencia de la Radiactividad!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Experto Nuclear
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
