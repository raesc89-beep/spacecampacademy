'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ─── SVG Decorative Elements (Ocean / Marine themed) ────────────────────────
function DecoWave({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Wave curves */}
      <path d="M5 30 Q15 18 25 30 Q35 42 45 30 Q55 18 55 30" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 38 Q15 26 25 38 Q35 50 45 38 Q55 26 55 38" fill="none" stroke={color} strokeWidth="1" opacity="0.5" strokeLinecap="round" />
      <path d="M5 22 Q15 10 25 22 Q35 34 45 22 Q55 10 55 22" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />
      {/* Bubbles */}
      <circle cx="12" cy="12" r="2" fill={color} opacity="0.3" />
      <circle cx="48" cy="14" r="1.5" fill={color} opacity="0.4" />
      <circle cx="30" cy="8" r="1" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoTurtle({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Shell */}
      <ellipse cx="30" cy="30" rx="18" ry="14" fill="none" stroke={color} strokeWidth="1.5" />
      <path d="M18 24 Q24 18 30 24 Q36 18 42 24" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M18 36 Q24 42 30 36 Q36 42 42 36" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="30" y1="16" x2="30" y2="44" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Head */}
      <circle cx="50" cy="30" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <circle cx="51" cy="29" r="1" fill={color} opacity="0.5" />
      {/* Flippers */}
      <path d="M16 22 Q8 16 6 20" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M16 38 Q8 44 6 40" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DecoThermometer({ size = 70, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Thermometer body */}
      <rect x="26" y="8" width="8" height="34" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Bulb */}
      <circle cx="30" cy="46" r="8" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="30" cy="46" r="4" fill={color} opacity="0.4" />
      {/* Mercury */}
      <rect x="28" y="18" width="4" height="22" rx="2" fill={color} opacity="0.3" />
      {/* Scale marks */}
      {[14, 20, 26, 32].map((y, i) => (
        <line key={i} x1="34" y1={y} x2="38" y2={y} stroke={color} strokeWidth="1" opacity="0.4" />
      ))}
      {/* Rising arrow */}
      <path d="M44 28 L44 12 L40 16" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function DecoCoral({ size = 60, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Coral branches */}
      <path d="M30 55 L30 35 Q28 28 22 22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M30 35 Q32 28 38 22" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 22 Q18 16 14 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M22 22 Q24 16 26 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M38 22 Q36 16 34 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <path d="M38 22 Q42 16 46 12" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Polyps */}
      <circle cx="14" cy="12" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="26" cy="12" r="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="34" cy="12" r="2.5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="46" cy="12" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function DecoCurrents({ size = 70, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.2, ...style }}>
      {/* Circular current arrows */}
      <path d="M30 8 Q52 8 52 30 Q52 52 30 52 Q8 52 8 30 Q8 8 30 8" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Inner current */}
      <path d="M30 18 Q42 18 42 30 Q42 42 30 42 Q18 42 18 30 Q18 18 30 18" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Arrow heads */}
      <path d="M48 20 L52 16 L50 22" fill={color} opacity="0.5" />
      <path d="M12 40 L8 44 L10 38" fill={color} opacity="0.5" />
      {/* Center */}
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.3" />
      {/* Temperature dots */}
      <circle cx="30" cy="10" r="1.5" fill={color} opacity="0.6" />
      <circle cx="50" cy="30" r="1.5" fill={color} opacity="0.4" />
      <circle cx="30" cy="50" r="1.5" fill={color} opacity="0.6" />
      <circle cx="10" cy="30" r="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function DecoRobot({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Robot body */}
      <rect x="18" y="20" width="24" height="20" rx="4" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Head */}
      <rect x="22" y="8" width="16" height="12" rx="3" fill="none" stroke={color} strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="27" cy="14" r="2" fill={color} opacity="0.5" />
      <circle cx="33" cy="14" r="2" fill={color} opacity="0.5" />
      {/* Antenna */}
      <line x1="30" y1="8" x2="30" y2="3" stroke={color} strokeWidth="1" opacity="0.6" />
      <circle cx="30" cy="3" r="1.5" fill={color} opacity="0.4" />
      {/* Flippers */}
      <path d="M18 26 Q10 24 6 28 Q8 32 14 30" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M42 26 Q50 24 54 28 Q52 32 46 30" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      {/* Propeller tail */}
      <path d="M30 40 L30 52" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M24 50 L36 54" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M24 54 L36 50" stroke={color} strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'lecciones-del-pasado': [DecoWave, DecoCoral, DecoCurrents],
  'los-oceanos-hoy': [DecoThermometer, DecoWave, DecoCoral],
  'calentamiento-acidificacion': [DecoThermometer, DecoCoral, DecoWave],
  'especies-en-peligro': [DecoTurtle, DecoWave, DecoCoral],
  'biomimetica-marina': [DecoRobot, DecoTurtle, DecoCurrents],
  'paleoceanografia': [DecoCurrents, DecoWave, DecoThermometer],
  'conservar-para-el-futuro': [DecoTurtle, DecoCoral, DecoWave],
};

// ─── Content Data ────────────────────────────────────────────────────────────
const BIBLIOGRAPHY = [
  'IPCC (2021). Climate Change 2021: The Physical Science Basis. Contribution of Working Group I to the Sixth Assessment Report, Cambridge University Press',
  'Hoegh-Guldberg, O. et al. (2017). Coral Reefs Under Rapid Climate Change and Ocean Acidification. Science, 318(5857), 1737-1742',
  'Pyenson, N.D. (2018). Spying on Whales: The Past, Present, and Future of Earth\'s Most Awesome Creatures. Viking Press',
  'Motani, R. (2009). The Evolution of Marine Reptiles. Evolution: Education and Outreach, 2(2), 224-235',
  'Hazen, R.M. (2012). The Story of Earth: The First 4.5 Billion Years. Viking Press',
  'Benton, M.J. (2014). Vertebrate Palaeontology, 4th Edition. Wiley-Blackwell',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'lecciones-del-pasado',
    title: 'Lecciones del Pasado',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/marinos_m10.png',
    image: '/assets/reptiles_marinos/marinos_m10.png',
    content: [
      'Hace 252 millones de años, la extinción masiva del Pérmico-Triásico eliminó el 96% de todas las especies marinas del planeta. Este evento, conocido como la "Gran Mortandad", fue provocado por erupciones volcánicas masivas en Siberia que liberaron cantidades enormes de dióxido de carbono y metano a la atmósfera. Los océanos se calentaron entre 8 y 10 grados centígrados, perdieron oxígeno disuelto y se acidificaron hasta niveles letales para la mayoría de los organismos con conchas o esqueletos de carbonato de calcio. Esta catástrofe tardó entre 5 y 10 millones de años en revertirse por completo.',
      'Los ictiosaurios, plesiosaurios y mosasaurios dominaron los mares durante más de 150 millones de años, ocupando nichos ecológicos similares a los que hoy ocupan delfines, focas y orcas. Su desaparición al final del Cretácico, hace 66 millones de años, fue causada por el impacto del asteroide Chicxulub en la península de Yucatán. Este impacto generó tsunamis de más de 100 metros de altura, bloqueó la luz solar durante meses y provocó un enfriamiento global que colapsó las cadenas alimenticias oceánicas desde la base del fitoplancton.',
      'El registro fósil muestra que las recuperaciones después de extinciones masivas siguen patrones predecibles. Primero se recuperan los organismos pequeños y de reproducción rápida, como bacterias y algas. Después aparecen invertebrados oportunistas. Los depredadores superiores no regresan hasta que toda la cadena trófica se ha estabilizado, proceso que puede tomar entre 1 y 10 millones de años. Tras la extinción del Cretácico, los nichos dejados por los reptiles marinos fueron ocupados gradualmente por mamíferos marinos como las primeras ballenas (hace 50 millones de años).',
      'Los científicos estudian las extinciones pasadas como "laboratorios naturales" para entender cómo los ecosistemas marinos responden a cambios rápidos en la temperatura y la química del agua. El análisis de isótopos de carbono-13 en sedimentos marinos del Pérmico y del Cretácico revela que los niveles de CO₂ atmosférico durante esas crisis alcanzaron concentraciones entre 1,000 y 2,000 partes por millón. Actualmente el CO₂ atmosférico supera las 420 ppm y sigue aumentando a un ritmo de 2.5 ppm por año, la tasa más rápida registrada en los últimos 66 millones de años.',
      'Los paleontólogos han descubierto que no todas las especies marinas sufrieron por igual durante las extinciones. Aquellas con metabolismos más flexibles, rangos geográficos amplios y dietas variadas tuvieron mayor probabilidad de supervivencia. Los ictiosaurios de aguas profundas, por ejemplo, desaparecieron antes que los de aguas someras durante el Cenomaniense, hace 94 millones de años, cuando una crisis de anoxia oceánica (falta de oxígeno) afectó primero las profundidades. Este patrón es relevante hoy porque las zonas de mínimo oxígeno en los océanos modernos están expandiéndose a una velocidad medible de 4.4 millones de kilómetros cuadrados por década desde los años 1960.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'En 2022, investigadores del Museo de Historia Natural de Zúrich describieron un ictiosaurio de 17 metros de longitud cuyos restos fueron hallados a 2,800 metros de altitud en los Alpes suizos. Estas montañas formaban parte del fondo del antiguo océano de Tetis hace 205 millones de años. Los dientes del animal medían el doble que los de cualquier otro ictiosaurio conocido, lo que sugiere que era un superdepredador comparable en tamaño a un cachalote moderno.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La "Gran Mortandad" del Pérmico-Triásico fue tan severa que eliminó el 81% de los géneros marinos y el 96% de las especies. Las Trampas Siberianas, la provincia volcánica responsable, cubrieron un área de 7 millones de kilómetros cuadrados con lava y liberaron aproximadamente 170,000 gigatoneladas de CO₂ en un período de entre 60,000 y 300,000 años. La recuperación completa de la biodiversidad marina no se completó hasta el Triásico Medio, unos 8 a 10 millones de años después del evento.' },
    ],
    fact: 'El estudio de los foraminíferos —organismos unicelulares con conchas de carbonato de calcio— en núcleos de sedimento marino permite reconstruir la temperatura y el pH de los océanos con una resolución de miles de años. Los análisis de la relación magnesio/calcio y los isótopos de oxígeno-18 en estas conchas muestran que durante las cinco grandes extinciones masivas, los océanos experimentaron acidificación, calentamiento y pérdida de oxígeno de forma simultánea, la misma combinación de factores que se está observando en los océanos actuales según los informes del Panel Intergubernamental sobre Cambio Climático.',
  },
  {
    id: 'los-oceanos-hoy',
    title: 'Los Océanos Hoy',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/marinos_m10.png',
    image: '/assets/reptiles_marinos/marinos_m10.png',
    content: [
      'Los océanos cubren el 71% de la superficie terrestre y contienen el 97% del agua del planeta. Albergan aproximadamente 230,000 especies conocidas, aunque estimaciones recientes sugieren que podrían existir entre 700,000 y 1 millón de especies marinas aún sin describir. Los arrecifes de coral, que ocupan menos del 0.1% del fondo oceánico, sostienen al 25% de todas las especies marinas conocidas. Estos ecosistemas producen entre el 50% y el 80% del oxígeno que respiramos a través del fitoplancton, organismos microscópicos que realizan fotosíntesis en la capa superficial del mar.',
      'La sobrepesca es una de las amenazas más directas a la biodiversidad marina. Según la Organización de las Naciones Unidas para la Alimentación (FAO), el 35.4% de las poblaciones de peces evaluadas en 2019 estaban sobreexplotadas, frente al 10% registrado en 1974. Las redes de arrastre de fondo destruyen hábitats bentónicos que tardan décadas en recuperarse, incluyendo esponjas, corales de aguas profundas y praderas de fanerógamas marinas. La pesca incidental captura cada año aproximadamente 300,000 cetáceos, 250,000 tortugas marinas y millones de tiburones, según datos de la Unión Internacional para la Conservación de la Naturaleza.',
      'La contaminación por plásticos ha alcanzado todos los rincones del océano. Se estima que entre 8 y 12 millones de toneladas de plástico entran al mar cada año. En 2019, el explorador Victor Vescovo encontró una bolsa de plástico a 10,928 metros de profundidad en la Fosa de las Marianas, el punto más hondo del océano. Los microplásticos —fragmentos menores a 5 milímetros— han sido detectados en el 90% de las especies marinas estudiadas, desde zooplancton hasta ballenas azules, así como en la sal de mesa, el agua potable y la nieve del Ártico.',
      'La contaminación química incluye vertidos de petróleo, metales pesados, pesticidas y compuestos farmacéuticos. Cada año se derraman al mar entre 1.7 y 8.8 millones de toneladas de petróleo de diversas fuentes. Los compuestos de mercurio, originados por la quema de carbón y la minería artesanal de oro, se bioacumulan en la cadena trófica marina: un atún de aleta azul puede contener concentraciones de mercurio un millón de veces superiores a las del agua circundante. Estudios del Centro Woods Hole muestran que los niveles de mercurio en el Océano Atlántico Norte han aumentado un 25% desde los años 1970.',
      'El ruido submarino generado por la navegación comercial, las prospecciones sísmicas con cañones de aire y las actividades militares con sonar afecta a especies que dependen del sonido para comunicarse, orientarse y encontrar alimento. Las ballenas jorobadas han alterado sus cantos en frecuencias y duración debido al incremento de ruido de fondo oceánico, que ha aumentado entre 3 y 5 decibelios por década desde los años 1950. Los pulpos y calamares, que carecen de vejigas natatorias, sufren daños en sus estatocistos —órganos de equilibrio— cuando se exponen a ondas de baja frecuencia, según investigaciones publicadas en Frontiers in Ecology and the Environment en 2011.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El "Gran Parche de Basura del Pacífico" (Great Pacific Garbage Patch) cubre un área estimada de 1.6 millones de kilómetros cuadrados, el equivalente a tres veces el tamaño de Francia. Contiene aproximadamente 80,000 toneladas de plástico flotante. No es una isla sólida sino una zona con una concentración de microplásticos hasta 100 veces mayor que la del océano circundante, lo que hace difícil verla desde satélites o aviones.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las zonas muertas oceánicas —regiones con oxígeno tan bajo que la vida marina no puede sobrevivir— han cuadruplicado su extensión desde los años 1950. Actualmente existen más de 700 zonas muertas registradas en costas de todo el mundo. La zona muerta del Golfo de México, causada por la escorrentía de fertilizantes del río Mississippi, cubre hasta 22,730 kilómetros cuadrados cada verano, un área del tamaño del estado de Nueva Jersey.' },
    ],
    fact: 'Los océanos han absorbido entre el 20% y el 30% de todo el CO₂ emitido por actividades humanas desde la Revolución Industrial, lo que equivale a unos 525,000 millones de toneladas de dióxido de carbono. Sin esta absorción, las concentraciones atmosféricas de CO₂ serían aproximadamente 480 ppm en lugar de las 420 ppm actuales. Sin embargo, esta absorción tiene un costo: el pH promedio de la superficie oceánica ha disminuido de 8.21 a 8.10 desde 1750, lo que representa un aumento del 26% en la concentración de iones de hidrógeno, según datos del IPCC AR6 publicado en 2021.',
  },
  {
    id: 'calentamiento-acidificacion',
    title: 'Calentamiento y Acidificación',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/marinos_m10.png',
    image: '/assets/reptiles_marinos/marinos_m10.png',
    content: [
      'Cuando el dióxido de carbono se disuelve en el agua de mar, reacciona con las moléculas de agua (H₂O) para formar ácido carbónico (H₂CO₃). Este ácido se disocia en iones de bicarbonato (HCO₃⁻) e iones de hidrógeno (H⁺), reduciendo el pH del agua y disminuyendo la disponibilidad de iones de carbonato (CO₃²⁻). Los organismos marinos que construyen conchas o esqueletos de carbonato de calcio —como corales, moluscos, erizos de mar y ciertos tipos de plancton— necesitan estos iones de carbonato para su mineralización. Al reducirse su concentración, las conchas se disuelven o no pueden formarse correctamente.',
      'El Máximo Térmico del Paleoceno-Eoceno (PETM), ocurrido hace 56 millones de años, es el análogo geológico más cercano a la situación actual. Durante este evento, se liberaron entre 3,000 y 7,000 gigatoneladas de carbono en un período de entre 5,000 y 20,000 años, elevando la temperatura global entre 5 y 8 grados centígrados. Los océanos se acidificaron gravemente, causando la disolución del carbonato de calcio en el fondo marino hasta profundidades que se conocen como la "lisoclina". El registro fósil muestra la extinción del 35% al 50% de las especies de foraminíferos bentónicos durante este período.',
      'Los arrecifes de coral han experimentado eventos de blanqueamiento masivo con frecuencia creciente. La Gran Barrera de Coral australiana sufrió eventos de blanqueamiento severo en 2016, 2017, 2020, 2022 y 2024, los cinco eventos más intensos en su historia registrada. El blanqueamiento ocurre cuando la temperatura del agua supera en 1 grado centígrado o más la media estival durante varias semanas, causando la expulsión de las zooxantelas —algas simbióticas que proporcionan hasta el 90% de la energía del coral— y dejando el coral blanco y en riesgo de morir si el estrés se prolonga más de dos semanas.',
      'La velocidad del cambio actual supera a la del PETM por un factor de aproximadamente 10. Durante el PETM, la tasa de emisión fue de 0.6 a 1.1 gigatoneladas de carbono por año, mientras que las emisiones humanas actuales alcanzan 10 gigatoneladas de carbono anuales. Esta velocidad es relevante porque los ecosistemas marinos pueden adaptarse a cambios graduales, pero no a transformaciones que ocurren en décadas en lugar de milenios. El IPCC AR6 proyecta que, bajo un escenario de emisiones altas (SSP5-8.5), el pH de la superficie oceánica podría descender hasta 7.67 para el año 2100, un nivel sin precedentes en los últimos 14 millones de años.',
      'La estratificación térmica de los océanos es otra consecuencia del calentamiento. Las capas superficiales se calientan más rápido que las profundas, reduciendo la mezcla vertical que transporta nutrientes desde las profundidades hacia la superficie y oxígeno desde la superficie hacia las profundidades. Mediciones del programa Argo, una red de 4,000 boyas autónomas distribuidas por todos los océanos, muestran que los primeros 2,000 metros del océano han absorbido un exceso de calor equivalente a 14 zetajulios (14 × 10²¹ julios) entre 1971 y 2018. Para dimensionar esta cifra, equivale a detonar 4 bombas atómicas de Hiroshima por segundo durante 47 años consecutivos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los pterópodos —pequeños caracoles marinos que nadan en el agua en lugar de arrastrarse por el fondo— son tan sensibles a la acidificación que sus conchas ya se están disolviendo en aguas antárticas. Investigadores de la NOAA fotografiaron en 2014 conchas de pterópodos con marcas de disolución ácida en el océano Antártico. Estos animales de apenas 1 centímetro son un alimento clave para el salmón, la caballa y las ballenas, por lo que su pérdida podría desestabilizar redes tróficas enteras.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La escala de pH es logarítmica: cada unidad de descenso representa un aumento de 10 veces en la concentración de iones de hidrógeno. La caída de 0.11 unidades de pH desde la era preindustrial (de 8.21 a 8.10) significa que la acidez de la superficie oceánica ha aumentado un 26%. Si las emisiones continúan al ritmo actual, los modelos del IPCC proyectan que para 2100 la acidez podría aumentar un 100-150% respecto a los niveles preindustriales, alcanzando un pH de entre 7.67 y 7.95.' },
    ],
    fact: 'Durante el PETM hace 56 millones de años, la liberación masiva de carbono causó la desaparición de los arrecifes de coral durante 2 millones de años. Los corales que existían antes del evento no sobrevivieron, y los arrecifes modernos descienden de linajes que evolucionaron después de la crisis. Investigadores de la Universidad de Bristol calcularon en 2019 que las tasas de emisión de CO₂ actuales son al menos 10 veces más rápidas que las del PETM, lo que significa que los ecosistemas marinos tienen menos tiempo para adaptarse que en cualquier evento de acidificación previo documentado en el registro geológico de los últimos 300 millones de años.',
  },
  {
    id: 'especies-en-peligro',
    title: 'Especies en Peligro',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/marinos_m10.png',
    image: '/assets/reptiles_marinos/marinos_m10.png',
    content: [
      'De las siete especies de tortugas marinas que existen actualmente —la tortuga verde, la carey, la caguama, la laúd, la olivácea, la plana y la lora—, seis están clasificadas como vulnerables, en peligro o en peligro crítico por la Lista Roja de la UICN. La tortuga carey (Eretmochelys imbricata) ha perdido aproximadamente el 80% de su población en las últimas tres generaciones, principalmente debido a la captura para el comercio de carey, la destrucción de hábitats de anidación y la pesca incidental. La tortuga lora (Lepidochelys kempii) es la más amenazada: en 1985 se registraron solo 702 hembras anidando en la playa de Rancho Nuevo, Tamaulipas, México.',
      'La iguana marina de Galápagos (Amblyrhynchus cristatus) es el único lagarto que se alimenta en el mar. Clasificada como vulnerable por la UICN, esta especie depende de las algas marinas que crecen en las rocas costeras. Durante los eventos de El Niño —cuando las aguas se calientan significativamente— las algas disminuyen y las iguanas pueden perder hasta el 20% de su masa corporal. El evento de El Niño de 1997-1998 causó la muerte del 90% de las iguanas marinas en algunas islas del archipiélago. Estudios de Martin Wikelski de la Universidad de Princeton demostraron que las iguanas literalmente encogen su esqueleto hasta 2 centímetros durante las hambrunas.',
      'Las serpientes marinas comprenden aproximadamente 70 especies agrupadas en la subfamilia Hydrophiinae, distribuidas principalmente en los océanos Índico y Pacífico occidental. La serpiente marina de nariz corta (Aipysurus apraefrontalis) de Australia está en peligro crítico, con una reducción poblacional del 90% en los últimos 15 años en el arrecife de Ashmore. Las serpientes marinas son indicadores de la salud del ecosistema costero porque dependen de arrecifes y praderas marinas para alimentarse de peces y sus huevos. Varias especies no han sido avistadas desde hace décadas.',
      'El cocodrilo de agua salada (Crocodylus porosus) es el reptil vivo más grande, con machos que pueden superar los 6 metros de longitud y los 1,000 kilogramos de peso. Aunque su distribución abarca desde la India oriental hasta Australia del norte, muchas poblaciones locales fueron diezmadas por la caza comercial de pieles entre 1940 y 1970. En Australia, donde se implementó protección legal en 1971, la población se ha recuperado de aproximadamente 3,000 individuos a más de 100,000 en la actualidad, demostrando que las medidas de conservación pueden ser efectivas cuando se aplican consistentemente.',
      'El cambio climático plantea amenazas específicas para los reptiles marinos porque la determinación del sexo en tortugas marinas y cocodrilos depende de la temperatura de incubación de los huevos, un fenómeno llamado determinación sexual dependiente de la temperatura (TSD). En tortugas marinas, temperaturas de incubación por encima de 29.1°C producen hembras, mientras que temperaturas por debajo producen machos. Estudios en la Gran Barrera de Coral publicados en Current Biology en 2018 mostraron que el 99.1% de las tortugas verdes juveniles procedentes de las playas del norte eran hembras, frente al 65-69% en las playas del sur, más frescas. Un calentamiento de 2-3°C podría feminizar por completo las poblaciones.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La tortuga laúd (Dermochelys coriacea) es la tortuga marina más grande del mundo, alcanzando 2.2 metros de longitud y 700 kilogramos de peso. Puede sumergirse hasta 1,200 metros de profundidad, más que la mayoría de los mamíferos marinos, y mantiene su temperatura corporal hasta 18°C por encima de la del agua circundante gracias a un sistema de intercambio de calor contracorriente en sus aletas y una capa de grasa aislante. Su población del Pacífico oriental ha caído un 97% desde 1980, de 91,000 a menos de 2,500 hembras anidantes.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Las tortugas marinas poseen un sentido magnético que les permite navegar miles de kilómetros a través del océano y regresar exactamente a la playa donde nacieron para anidar, un fenómeno llamado filopatría natal. Investigaciones de Kenneth Lohmann en la Universidad de Carolina del Norte demostraron que las crías recién nacidas detectan la inclinación y la intensidad del campo magnético terrestre, creando un "mapa magnético" que utilizan como sistema de posicionamiento global biológico durante toda su vida.' },
    ],
    fact: 'La iguana marina de Galápagos tiene una adaptación única: glándulas de sal especializadas conectadas a sus fosas nasales que filtran y expulsan el exceso de sal ingerida al alimentarse bajo el agua. Cuando la iguana "estornuda", expulsa una solución concentrada de cloruro de sodio que a menudo se seca formando una costra blanca sobre su cabeza. Charles Darwin describió estas iguanas en 1835 durante el viaje del HMS Beagle, llamándolas "hideous" (horrendas), pero hoy son reconocidas como un ejemplo único de adaptación evolutiva a un nicho ecológico que ningún otro lagarto ha ocupado en la historia del planeta.',
  },
  {
    id: 'biomimetica-marina',
    title: 'Biomimética Marina',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/marinos_m10.png',
    image: '/assets/reptiles_marinos/marinos_m10.png',
    content: [
      'La biomimética es la disciplina que diseña tecnologías inspiradas en soluciones biológicas que han sido perfeccionadas por millones de años de evolución. Los reptiles marinos prehistóricos y actuales ofrecen modelos de eficiencia hidrodinámica que los ingenieros están incorporando en robots submarinos, vehículos autónomos y sistemas de propulsión. El cuerpo fusiforme de los ictiosaurios, con su convergencia evolutiva con delfines y atunes, ha inspirado diseños de drones submarinos que reducen la resistencia al avance en el agua hasta un 30% comparado con formas cilíndricas convencionales.',
      'La propulsión por aletas de las tortugas marinas ha inspirado el desarrollo de robots como el "Aqua2" del MIT y el "Naro-tartaruga" de la ETH de Zúrich. A diferencia de las hélices convencionales, las aletas generan empuje mediante un movimiento de batido similar al vuelo de las aves, produciendo menor turbulencia, menor ruido y mayor maniobrabilidad a bajas velocidades. Investigadores de la Universidad de Virginia publicaron en 2020 que las aletas flexibles bioinspiradas pueden alcanzar una eficiencia de propulsión del 80%, comparada con el 40-60% de las hélices marinas estándar.',
      'Los plesiosaurios desarrollaron un sistema de propulsión único con cuatro aletas que no tiene análogo en ningún animal moderno. Investigadores de la Universidad de Georgia usaron modelos computacionales de dinámica de fluidos en 2015 para demostrar que las aletas traseras se beneficiaban de los vórtices generados por las aletas delanteras, un fenómeno llamado "wake capture". Este principio está siendo aplicado en el diseño de vehículos submarinos con múltiples aletas, que podrían ser más eficientes que los de hélice para exploración de arrecifes, inspección de infraestructura submarina y monitoreo ambiental.',
      'La piel de los tiburones —reptiles no, pero compañeros de ecosistema de los reptiles marinos durante millones de años— presenta dentículos dérmicos que reducen la fricción y evitan la adhesión de microorganismos. Este principio ha sido aplicado en recubrimientos antifouling para cascos de barcos por la empresa Sharklet Technologies, eliminando la necesidad de pinturas tóxicas a base de tributilestaño que dañaban los ecosistemas marinos. A nivel de reptiles, la estructura microescamosa de la piel de las serpientes marinas, que les permite deslizarse con mínima resistencia, está siendo estudiada para mejorar trajes de neopreno y superficies de submarinos.',
      'Los cocodrilos de agua salada poseen sensores de presión en su mandíbula llamados órganos sensoriales integumentarios (ISO) que detectan vibraciones mínimas en el agua, permitiéndoles localizar presas en completa oscuridad. Cada mandíbula contiene más de 4,000 de estos receptores, que son más sensibles que las yemas de los dedos humanos. Ingenieros de la Universidad de Maryland han desarrollado sensores piezoeléctricos inspirados en estos órganos para equipar robots submarinos de búsqueda y rescate, capaces de detectar supervivientes atrapados bajo escombros sumergidos mediante las vibraciones de sus movimientos o latidos cardíacos.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El robot "Madeleine" desarrollado por la Universidad de Nantes en 2019 replica el movimiento de una tortuga laúd con cuatro aletas independientes controladas por inteligencia artificial. El robot aprendió a nadar de forma autónoma usando aprendizaje por refuerzo, optimizando su batido de aletas tras 10 millones de simulaciones. El resultado fue un patrón de nado que los biólogos confirmaron era casi idéntico al de una tortuga real, demostrando que la evolución y la IA convergen en soluciones similares cuando enfrentan los mismos problemas físicos.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los ictiosaurios del género Stenopterygius del Jurásico tenían un coeficiente de resistencia al avance (Cd) estimado en 0.035, comparable al de un atún de aleta azul moderno (Cd = 0.031) y un delfín nariz de botella (Cd = 0.034). Este valor es notable porque estos tres linajes evolucionaron de forma independiente —reptil, pez óseo y mamífero— hacia la misma forma corporal óptima, un fenómeno de convergencia evolutiva que los ingenieros usan como validación de que el perfil fusiforme es la solución hidrodinámicamente más eficiente para velocidades de crucero sostenidas.' },
    ],
    fact: 'El mosasaurio Platecarpus utilizaba su cola como principal órgano de propulsión mediante ondulaciones laterales, un método que genera fuerza de empuje mediante la formación de vórtices de von Kármán inversos. Investigadores de la Universidad de Harvard replicaron este mecanismo en un robot blando llamado "Tunabot" en 2019, publicado en Science Robotics. El robot nadaba a velocidades de hasta 4 cuerpos por segundo —comparable a la velocidad relativa de un atún vivo— y consumía un 30% menos de energía que un diseño equivalente con hélice. Este tipo de propulsión biomimética es particularmente útil para misiones de larga duración en las que la autonomía energética es crítica.',
  },
  {
    id: 'paleoceanografia',
    title: 'Paleoceanografía',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/marinos_m10.png',
    image: '/assets/reptiles_marinos/marinos_m10.png',
    content: [
      'La paleoceanografía estudia cómo han cambiado los océanos a lo largo del tiempo geológico, incluyendo su temperatura, composición química, circulación y biodiversidad. Esta disciplina combina datos de núcleos de sedimento oceánico, registros isotópicos, modelado climático y evidencia paleontológica para reconstruir las condiciones de mares que ya no existen. El programa de perforación oceánica DSDP/ODP/IODP, activo desde 1968, ha extraído más de 400 kilómetros de núcleos de sedimento del fondo marino en más de 2,000 ubicaciones, constituyendo el archivo más completo de la historia climática de la Tierra.',
      'El océano de Tetis fue un mar tropical que separaba los supercontinentes de Laurasia (norte) y Gondwana (sur) durante más de 200 millones de años. Este océano fue el hogar de la mayoría de los reptiles marinos del Mesozoico: ictiosaurios, plesiosaurios, mosasaurios y tortugas marinas primitivas evolucionaron y se diversificaron en sus aguas cálidas y ricas en nutrientes. El cierre progresivo de Tetis, causado por el movimiento hacia el norte de la placa africana y la placa india, creó el mar Mediterráneo, el mar Negro y el mar Caspio como remanentes. Este cierre alteró los patrones de circulación oceánica global.',
      'La formación de la Corriente Circumpolar Antártica (CCA) hace aproximadamente 34 millones de años, cuando la Antártida se separó completamente de Sudamérica al abrirse el paso de Drake, es considerada uno de los eventos oceanográficos más trascendentales del Cenozoico. La CCA aisló térmicamente la Antártida, permitiendo la formación de la capa de hielo continental que persiste hasta hoy. Este enfriamiento global redujo drásticamente la temperatura del agua de los océanos del sur, eliminando los ecosistemas tropicales que habían prosperado alrededor de la Antártida durante el Eoceno, cuando cocodrilos y palmeras habitaban sus costas.',
      'La circulación termohalina —el sistema global de corrientes oceánicas profundas impulsado por diferencias de temperatura y salinidad— transporta calor desde los trópicos hacia los polos y distribuye nutrientes y oxígeno por todo el océano. La Circulación Meridional de Retorno del Atlántico (AMOC), que incluye la Corriente del Golfo, ha mostrado signos de debilitamiento. Estudios publicados en Nature Climate Change en 2021 por Niklas Boers del Instituto de Potsdam indican que la AMOC se ha debilitado aproximadamente un 15% desde mediados del siglo XX, alcanzando su punto más débil en al menos 1,000 años.',
      'Los isótopos de oxígeno-18 (δ¹⁸O) preservados en las conchas de foraminíferos fósiles permiten reconstruir tanto la temperatura del agua como el volumen de hielo continental en el momento en que vivieron. Cuando la temperatura del agua sube o el volumen de hielo disminuye, la relación entre oxígeno-18 y oxígeno-16 en las conchas cambia de forma predecible. Usando esta técnica, el paleoceanógrafo James Zachos de la Universidad de California en Santa Cruz compiló en 2001 una curva de referencia de temperaturas oceánicas de los últimos 65 millones de años, revelando un enfriamiento gradual interrumpido por eventos abruptos de calentamiento como el PETM.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'La Crisis de Salinidad del Messiniense, hace entre 5.96 y 5.33 millones de años, fue un evento en el que el mar Mediterráneo se evaporó casi por completo cuando el movimiento tectónico cerró su conexión con el Atlántico en el Estrecho de Gibraltar. Se depositaron hasta 3 kilómetros de espesor de sal en el fondo del Mediterráneo vacío. Cuando la conexión se restableció, la inundación Zancliense llenó de nuevo el Mediterráneo en un período de entre varios meses y 2 años, con un flujo de agua que pudo haber superado 1,000 veces el caudal actual del río Amazonas.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El análisis de biomarcadores moleculares (TEX86 y alquenonas) en sedimentos marinos permite estimar la temperatura superficial del mar con una precisión de ±1.5°C para períodos de hace hasta 200 millones de años. Estos biomarcadores son lípidos producidos por microorganismos (arqueas y cocolitofóridos) cuya composición química varía en función de la temperatura del agua en la que vivieron. Combinados con los datos de isótopos de oxígeno, proporcionan un registro de temperatura de doble verificación que ha mostrado que la temperatura media de la superficie oceánica durante el Cretácico era 10-15°C más alta que la actual.' },
    ],
    fact: 'El buque de perforación JOIDES Resolution, que opera desde 1985, puede perforar hasta 2,100 metros por debajo del fondo oceánico en aguas de hasta 8,200 metros de profundidad. En 2023, durante la expedición IODP 396 al margen noruego, el equipo recuperó núcleos de sedimento que contenían evidencia directa de las erupciones volcánicas de la Provincia Ígnea del Atlántico Norte que desencadenaron el PETM. Los núcleos mostraron capas de ceniza volcánica intercaladas con sedimentos enriquecidos en carbono-12, confirmando que el vulcanismo fue el detonante de la liberación masiva de carbono y el calentamiento global que definió este evento hace 56 millones de años.',
  },
  {
    id: 'conservar-para-el-futuro',
    title: 'Conservar para el Futuro',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/marinos_m10.png',
    image: '/assets/reptiles_marinos/marinos_m10.png',
    content: [
      'Las Áreas Marinas Protegidas (AMP) son herramientas de conservación que restringen o prohíben actividades humanas para permitir la recuperación de ecosistemas. Según el informe Protected Planet 2024 del Centro de Monitoreo de la Conservación del Medio Ambiente (UNEP-WCMC), aproximadamente el 8.3% del océano global está designado como protegido, aunque solo el 2.8% tiene protección total donde no se permite ninguna extracción. La meta acordada en la Conferencia de Biodiversidad de Montreal en diciembre de 2022 (Marco Global de Biodiversidad Kunming-Montreal) establece proteger al menos el 30% de los océanos para el año 2030, lo que se conoce como el objetivo "30x30".',
      'La Reserva Marina de Galápagos, establecida en 1998, cubre 133,000 kilómetros cuadrados y es una de las mayores del mundo. Ha demostrado resultados medibles: las poblaciones de tiburones martillo aumentaron un 58% entre 2006 y 2018 dentro de la reserva, y las iguanas marinas se benefician de la reducción de la pesca con redes que antes las atrapaba accidentalmente. En 2022, Ecuador amplió la protección con la Reserva Marina Hermandad, añadiendo 60,000 kilómetros cuadrados que conectan Galápagos con la Reserva Marina de Cocos de Costa Rica, creando un corredor de migración protegido para tortugas marinas, tiburones y mantarrayas.',
      'La ciencia ciudadana está transformando la recopilación de datos marinos. Programas como el "Sea Turtle Conservancy" entrenan a voluntarios en playas de 45 países para registrar anidaciones de tortugas marinas, identificar individuos por los patrones de sus escamas faciales mediante fotografía y proteger nidos de depredadores. La aplicación iNaturalist, con más de 2 millones de observaciones marinas registradas, ha permitido documentar la distribución de serpientes marinas en el sudeste asiático con una resolución geográfica que los investigadores profesionales solos no habrían logrado. En 2020, un buceador ciudadano en Filipinas registró en iNaturalist la primera observación en 30 años de la serpiente marina Hydrophis parviceps.',
      'Los escenarios climáticos del IPCC AR6 (2021) proyectan futuros muy diferentes según las acciones que se tomen. Bajo el escenario más optimista (SSP1-1.9), que implica emisiones netas cero de CO₂ para 2050, el calentamiento oceánico se estabilizaría a finales de siglo con un aumento de temperatura superficial de 0.5-1°C respecto a los niveles actuales. Bajo el escenario más pesimista (SSP5-8.5), las temperaturas superficiales subirían 2.5-4.5°C, el nivel del mar aumentaría entre 0.63 y 1.01 metros para 2100, y los arrecifes de coral se reducirían en más del 99%. La diferencia entre estos escenarios depende de las decisiones tomadas en las próximas dos décadas.',
      'La restauración de ecosistemas marinos ofrece soluciones basadas en la naturaleza con beneficios múltiples. Los manglares, las praderas de pastos marinos y las marismas capturan carbono a tasas entre 2 y 4 veces superiores a las de los bosques terrestres tropicales por unidad de superficie, un fenómeno conocido como "carbono azul". Un solo kilómetro cuadrado de pradera de Posidonia oceanica en el Mediterráneo puede almacenar hasta 83,000 toneladas de carbono en sus sedimentos. Además, estos ecosistemas protegen las costas de la erosión y las tormentas, sirven como criaderos para el 80% de las especies pesqueras comerciales y filtran contaminantes del agua, generando servicios ecosistémicos valorados en 28,000 dólares por hectárea al año según estimaciones del PNUMA.',
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El proyecto Pristine Seas de National Geographic, fundado por el biólogo marino Enric Sala en 2008, ha ayudado a crear 27 reservas marinas que cubren más de 6.5 millones de kilómetros cuadrados en los océanos del mundo. Las expediciones del proyecto combinan tecnología de cámaras submarinas autónomas, ADN ambiental (eDNA) recogido del agua para detectar especies presentes sin verlas, y datos satelitales de seguimiento de barcos pesqueros para identificar las áreas más valiosas para la conservación.' },
      { label: 'Dato Científico', icon: 'atom', text: 'El ADN ambiental (eDNA) es una técnica que permite detectar la presencia de especies marinas a partir de fragmentos de ADN que los organismos liberan al agua a través de mucosidad, heces, células desprendidas y gametos. Un solo litro de agua de mar puede contener eDNA de decenas de especies diferentes. Estudios publicados en Nature Ecology & Evolution en 2022 demostraron que el análisis de eDNA puede detectar el 93% de las especies de peces presentes en un arrecife, comparado con el 56% detectado mediante censos visuales por buzos.' },
    ],
    fact: 'En 2016, la República de Kiribati, un pequeño estado insular del Pacífico, designó la Zona Protegida de las Islas Phoenix (PIPA) como una reserva marina totalmente protegida de 408,250 kilómetros cuadrados, una de las mayores del mundo. Tras cerrar la zona a toda actividad pesquera, las poblaciones de atún, tiburones y coral comenzaron a recuperarse en menos de tres años. El caso demostró que incluso ecosistemas degradados pueden regenerarse si se eliminan las presiones humanas. Kiribati sacrificó ingresos por licencias pesqueras de 6 millones de dólares anuales para proteger este patrimonio natural, un ejemplo de cómo las naciones pequeñas lideran la conservación marina global.',
  },
];

// ─── Ocean Particle Field (Canvas Background) ──────────────────────────────
function OceanField() {
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
      hue: Math.random() > 0.5 ? '91,123,154' : '184,125,94',
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

// ─── Ocean Header ───────────────────────────────────────────────────────────
function OceanHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Wave arc */}
        <path d="M 50 110 Q 150 40, 300 70 Q 450 100, 550 40" fill="none" stroke="url(#oceanGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 node markers */}
        {Array.from({ length: 7 }, (_, i) => {
          const t = (i + 0.5) / 7;
          const cx = 50 + t * 500;
          const cy = 110 - Math.sin(t * Math.PI) * 80 - Math.cos(t * Math.PI * 2) * 15;
          const colors = ['#5B7B9A','#B87D5E','#6E8FA8','#8B6B4A','#7C93A8','#9E7B5C','#4A6F8C'];
          return (
            <motion.circle key={i} cx={cx} cy={cy} r="4" fill={colors[i]}
              animate={{ opacity: [0.3, 1, 0.3], r: [3, 5, 3] }}
              transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
              style={{ filter: `drop-shadow(0 0 6px ${colors[i]})` }}
            />
          );
        })}
        {/* Central wave icon */}
        <path d="M285 25 Q293 15 300 25 Q307 35 315 25" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M280 32 Q290 22 300 32 Q310 42 320 32" fill="none" stroke="#5B7B9A" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
        <defs>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(184,125,94,0.3)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="18" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">LOS OCÉANOS DEL FUTURO</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">PASADO, PRESENTE Y CONSERVACIÓN</text>
      </svg>
    </div>
  );
}

// ─── Organic Node Button ────────────────────────────────────────────────────
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
          layoutId="activeDotMarinosM10"
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

// ─── Expandable Section with Random Direction ───────────────────────────────
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

// ─── Magazine-Style Content Panel ───────────────────────────────────────────
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

        {/* ─── Conditional Video Player ─── */}
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

// ─── Progress Bar ───────────────────────────────────────────────────────────
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

// ─── Main Infographic Component ─────────────────────────────────────────────
export default function InteractiveInfographic_MarinosM10() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, rgba(15,18,30,0.85) 40%, rgba(10,10,15,0.92) 100%), url(/assets/reptiles_marinos/marinos_m10.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '24px',
      padding: '2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      border: '1px solid rgba(91,123,154,0.12)',
      boxShadow: '0 0 60px rgba(10,10,15,0.8), inset 0 0 80px rgba(0,0,0,0.3)',
    }}>
      <OceanField />

      <OceanHeader />

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
              🌊 ¡Has explorado los océanos del pasado, presente y futuro!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Científico Marino
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
