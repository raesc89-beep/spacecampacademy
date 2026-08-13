'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Star, ChevronDown, Zap, Clock, Atom } from 'lucide-react';

import ImageLightbox from './ImageLightbox';
import VideoPlayer from './VideoPlayer';

// ——— SVG Decorative Elements (Marine Food Web themed) ————————————————
function DecoPlankton({ size = 70, color = '#5B7B9A', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Central diatom cell */}
      <ellipse cx="30" cy="30" rx="14" ry="8" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="30" cy="30" rx="8" ry="4" fill={color} opacity="0.15" />
      <circle cx="30" cy="30" r="2" fill={color} opacity="0.5" />
      {/* Radiating spines */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return <line key={i} x1={30 + 14 * Math.cos(rad)} y1={30 + 8 * Math.sin(rad)} x2={30 + 22 * Math.cos(rad)} y2={30 + 14 * Math.sin(rad)} stroke={color} strokeWidth="1" opacity="0.4" strokeLinecap="round" />;
      })}
      {/* Floating particles */}
      <circle cx="10" cy="12" r="1.5" fill={color} opacity="0.3" />
      <circle cx="50" cy="48" r="1" fill={color} opacity="0.4" />
      <circle cx="8" cy="45" r="1.5" fill={color} opacity="0.3" />
    </svg>
  );
}

function DecoAmmonite({ size = 70, color = '#B87D5E', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Spiral shell */}
      <path d="M30 30 Q30 18 38 14 Q48 10 50 22 Q52 34 42 40 Q32 46 24 40 Q16 34 20 24 Q24 16 32 14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M30 30 Q30 22 36 20 Q42 18 44 26 Q46 34 38 36 Q32 38 28 34" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.3" />
      {/* Chamber lines */}
      <line x1="36" y1="20" x2="34" y2="26" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="44" y1="26" x2="38" y2="28" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="38" y1="36" x2="34" y2="32" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Eye */}
      <circle cx="26" cy="28" r="1.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoFoodChain({ size = 80, color = '#6E8FA8', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 80 48" style={{ opacity: 0.2, ...style }}>
      {/* Trophic pyramid */}
      <path d="M40 6 L68 42 L12 42 Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <line x1="22" y1="30" x2="58" y2="30" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="28" y1="22" x2="52" y2="22" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="34" y1="14" x2="46" y2="14" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Arrow connections */}
      <path d="M40 38 L40 34" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M40 26 L40 22" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M40 18 L40 14" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      {/* Apex dot */}
      <circle cx="40" cy="10" r="2.5" fill={color} opacity="0.5" />
    </svg>
  );
}

function DecoWaves({ size = 70, color = '#8B6B4A', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.2, ...style }}>
      {/* Three wave lines */}
      <path d="M5 14 Q15 6 25 14 Q35 22 45 14 Q55 6 65 14" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      <path d="M5 24 Q15 16 25 24 Q35 32 45 24 Q55 16 65 24" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" strokeLinecap="round" />
      <path d="M5 34 Q15 26 25 34 Q35 42 45 34 Q55 26 65 34" fill="none" stroke={color} strokeWidth="1" opacity="0.3" strokeLinecap="round" />
      {/* Bubbles */}
      <circle cx="12" cy="8" r="1.5" fill={color} opacity="0.4" />
      <circle cx="52" cy="6" r="1" fill={color} opacity="0.3" />
      <circle cx="62" cy="30" r="1.5" fill={color} opacity="0.35" />
    </svg>
  );
}

function DecoSkull({ size = 70, color = '#7C93A8', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ opacity: 0.22, ...style }}>
      {/* Marine reptile skull silhouette - elongated snout */}
      <ellipse cx="30" cy="28" rx="18" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M12 28 Q8 24 4 28" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Eye sockets */}
      <circle cx="24" cy="24" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="36" cy="24" r="4" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="24" cy="24" r="1.5" fill={color} opacity="0.3" />
      <circle cx="36" cy="24" r="1.5" fill={color} opacity="0.3" />
      {/* Jaw */}
      <path d="M14 32 Q30 44 46 32" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Teeth */}
      {[18, 24, 30, 36, 42].map((x, i) => (
        <line key={i} x1={x} y1="32" x2={x} y2="36" stroke={color} strokeWidth="1" opacity="0.3" />
      ))}
    </svg>
  );
}

function DecoFish({ size = 70, color = '#9E7B5C', style = {} }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" style={{ opacity: 0.22, ...style }}>
      {/* Fish body */}
      <ellipse cx="32" cy="21" rx="20" ry="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Tail */}
      <path d="M52 21 L65 10 L65 32 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Eye */}
      <circle cx="18" cy="18" r="3" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="18" cy="18" r="1" fill={color} opacity="0.4" />
      {/* Fins */}
      <path d="M28 11 Q32 4 36 11" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <path d="M26 31 Q30 38 34 31" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Gill line */}
      <path d="M24 15 Q22 21 24 27" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

// Map node IDs to decorative SVGs
const DECO_MAP = {
  'oceano-ecosistema': [DecoWaves, DecoFoodChain, DecoPlankton],
  'productores-primarios': [DecoPlankton, DecoWaves, DecoFoodChain],
  'invertebrados-mesozoicos': [DecoAmmonite, DecoPlankton, DecoWaves],
  'peces-mesozoico': [DecoFish, DecoAmmonite, DecoFoodChain],
  'depredadores-medios': [DecoSkull, DecoFish, DecoWaves],
  'superdepredadores-marinos': [DecoSkull, DecoFoodChain, DecoAmmonite],
  'colapso-renovacion': [DecoWaves, DecoSkull, DecoPlankton],
};

// ——— Content Data ————————————————————————————————————————————————
const BIBLIOGRAPHY = [
  'Kelley, N.P. & Pyenson, N.D. (2015). Evolutionary innovation and ecology in marine tetrapods from the Triassic to the Anthropocene. Science, 348(6232), aaa3716',
  'Motani, R. (2009). The evolution of marine reptiles. Evolution: Education and Outreach, 2(2), 224-235. Annual Review of Earth and Planetary Sciences',
  'Martin, J.E. (2004). Introduction to the marine reptiles. In Everhart, M.J. (ed.), Oceans of Kansas: A Natural History of the Western Interior Sea, Indiana University Press',
  'Friedman, M. (2010). Explosive morphological diversification of spiny-finned teleost fishes in the aftermath of the end-Cretaceous extinction. Proceedings of the Royal Society B, 277(1688), 1675-1683',
  'Bardet, N. (2012). Mesozoic marine reptile palaeogeography and biostratigraphy. Geological Society of London Special Publications, 371, 339-356',
  'Benson, R.B.J. & Druckenmiller, P.S. (2014). Faunal turnover of marine tetrapods during the Jurassic–Cretaceous transition. Biological Reviews, 89(1), 1-23',
];

const INFOGRAPHIC_NODES = [
  {
    id: 'oceano-ecosistema',
    title: 'El Océano como Ecosistema',
    color: '#5B7B9A',
    btnImage: '/assets/reptiles_marinos/infographic_m7/btn_oceano-ecosistema.jpg',
    image: '/assets/reptiles_marinos/infographic_m7/hero_oceano-ecosistema.jpg',
    content: [
      'Durante el Mesozoico (252–66 millones de años atrás), los océanos cubrían aproximadamente el 80% de la superficie terrestre, una proporción mayor que el 71% actual. Las temperaturas del agua eran entre 10 y 15 grados Celsius más cálidas que hoy, lo cual permitía que la vida marina se distribuyera desde los trópicos hasta las regiones polares sin las barreras de frío que existen en la actualidad. El nivel del mar era considerablemente más alto, y vastos mares epicontinentales como el Mar Interior Occidental de Norteamérica inundaban grandes extensiones de los continentes, creando hábitats costeros de poca profundidad donde se concentraba una biodiversidad marina notable.',
      'La cadena alimentaria marina del Mesozoico funcionaba mediante niveles tróficos interconectados, desde los organismos microscópicos hasta los grandes reptiles depredadores. La base estaba formada por productores primarios fotosintéticos: fitoplancton, algas y cianobacterias que convertían la energía solar en materia orgánica. Estos organismos sustentaban a los consumidores primarios (zooplancton, pequeños crustáceos, larvas), que a su vez alimentaban a peces pequeños, invertebrados filtradores y otros consumidores secundarios. Los niveles superiores incluían peces depredadores, reptiles marinos de tamaño medio y, en la cima, los superdepredadores como los pliosaurios y mosasaurios.',
      'Los ecosistemas marinos del Mesozoico diferían de los actuales en aspectos estructurales clave. No existían los mamíferos marinos que hoy dominan los océanos (ballenas, focas, delfines), y los reptiles ocupaban todos los nichos ecológicos superiores. Los arrecifes no estaban construidos principalmente por corales escleractinios como hoy, sino por bivalvos rudistas — moluscos con conchas gruesas y asimétricas que formaban estructuras similares a arrecifes en aguas tropicales poco profundas del Cretácico. Estos arrecifes de rudistas proporcionaban hábitat para cientos de especies de invertebrados, peces pequeños y organismos incrustantes.',
      'La productividad primaria de los océanos mesozoicos era comparable o superior a la actual en muchas regiones. Las corrientes oceánicas transportaban nutrientes desde las profundidades hacia la superficie mediante procesos de afloramiento, fertilizando las aguas y sustentando floraciones masivas de fitoplancton. En las zonas de afloramiento del Cretácico Superior, la acumulación de materia orgánica fue tan intensa que dio origen a los depósitos de petróleo y gas que se explotan hoy. Los sedimentos marinos de esta época contienen evidencia geoquímica de alta productividad biológica, con concentraciones elevadas de carbono orgánico.',
      'La circulación oceánica mesozoica era fundamentalmente diferente de la actual. Sin las grandes capas de hielo polar que hoy impulsan la circulación termohalina, las corrientes se movían principalmente por diferencias de temperatura y salinidad en aguas relativamente cálidas. El océano de Tetis, un gran cuerpo de agua ecuatorial que separaba los continentes del norte (Laurasia) y del sur (Gondwana), funcionaba como una autopista de distribución para organismos marinos, facilitando la dispersión de especies entre lo que hoy son continentes separados por miles de kilómetros.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El Mar Interior Occidental de Norteamérica dividió el continente en dos masas terrestres durante 25 millones de años (hace 100 a 75 millones de años). Tenía hasta 900 metros de profundidad y 1,000 kilómetros de ancho, extendiéndose desde el actual Golfo de México hasta el Océano Ártico. Sus costas estaban habitadas por pterosaurios, dinosaurios costeros y aves primitivas, mientras que sus profundidades albergaban mosasaurios, pliosaurios y tiburones de gran tamaño como el Cretoxyrhina mantelli.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La temperatura promedio de los océanos durante el Cretácico Superior era de aproximadamente 28°C en la superficie, según análisis isotópicos de oxígeno-18 en conchas de foraminíferos fósiles. Esto es unos 10°C más que la media actual de 18°C. Las aguas profundas alcanzaban 15-20°C, comparado con los 1-4°C actuales. Esta diferencia térmica menor entre superficie y fondo significaba una estratificación más débil del agua y distintos patrones de circulación de nutrientes.' },
    ],
    fact: 'Los geólogos han identificado más de 30 mares epicontinentales que existieron simultáneamente durante el Cretácico Superior (hace 90–66 millones de años), incluyendo el Mar de Tetis, el Mar Interior Occidental, el Mar de Sundance y el Mar de Niobrara. Estos mares cubrían un 40% más de superficie continental que cualquier período de inundación marina posterior. La evidencia proviene de depósitos de creta (carbonato de calcio biogénico), como los famosos acantilados blancos de Dover en Inglaterra, formados por trillones de esqueletos de cocolitóforos acumulados en fondos marinos poco profundos.',
  },
  {
    id: 'productores-primarios',
    title: 'Productores Primarios',
    color: '#B87D5E',
    btnImage: '/assets/reptiles_marinos/infographic_m7/btn_productores-primarios.jpg',
    image: '/assets/reptiles_marinos/infographic_m7/hero_productores-primarios.jpg',
    content: [
      'Los productores primarios del Mesozoico eran los organismos que convertían la energía solar en materia orgánica mediante fotosíntesis, constituyendo la base indispensable de toda la cadena alimentaria marina. El grupo más relevante eran los cocolitóforos, algas unicelulares que producían diminutas placas de carbonato de calcio llamadas cocolitos, cada una midiendo entre 2 y 10 micrómetros de diámetro. Estos organismos fueron tan abundantes que sus restos acumulados durante millones de años formaron depósitos de creta de cientos de metros de espesor. La Formación de Creta de Dover, visible como acantilados blancos en la costa inglesa, está compuesta casi exclusivamente por cocolitos del Cretácico.',
      'Las diatomeas, otro grupo de fitoplancton con esqueletos de sílice, comenzaron su diversificación durante el Cretácico, aunque alcanzarían su mayor diversidad después de la extinción del Cretácico-Paleógeno. Durante el Mesozoico, las diatomeas habitaban principalmente zonas costeras y mares poco profundos, donde contribuían a la productividad primaria junto con dinoflagelados y otros organismos fotosintéticos unicelulares. Los dinoflagelados eran particularmente diversos en el Jurásico y el Cretácico, y sus quistes fósiles (dinocistos) se utilizan hoy como herramientas de bioestratigrafía para datar y correlacionar rocas sedimentarias marinas con precisión.',
      'Las cianobacterias, organismos procariotas fotosintéticos que habían dominado los océanos durante miles de millones de años antes del Mesozoico, continuaban desempeñando funciones ecológicas relevantes. Formaban tapices microbianos en fondos marinos someros y contribuían a la fijación de nitrógeno, un proceso esencial para la fertilidad oceánica. En ciertas condiciones de alta temperatura y bajo oxígeno, las cianobacterias podían proliferar masivamente, generando eventos de anoxia oceánica (agotamiento del oxígeno disuelto) que resultaban letales para organismos más complejos, como ocurrió durante los Eventos Anóxicos Oceánicos del Cretácico.',
      'Los Eventos Anóxicos Oceánicos (OAE por sus siglas en inglés) representaron disrupciones periódicas en la productividad marina mesozoica. El OAE2, ocurrido hace 94 millones de años durante el Cenomaniano-Turoniano, fue uno de los más severos. Duró aproximadamente 500,000 años y provocó la acumulación de grandes cantidades de materia orgánica en los fondos marinos sin oxígeno, originando las rocas madre de muchos yacimientos petroleros actuales. Durante estos eventos, la productividad primaria en la superficie aumentaba paradójicamente, mientras que las aguas profundas se convertían en zonas muertas sin vida animal.',
      'La transferencia de energía desde los productores primarios hacia los niveles tróficos superiores seguía la regla general del 10%: solo aproximadamente una décima parte de la energía disponible en un nivel trófico se transfiere al siguiente. Esto significa que para sostener un superdepredador como un mosasaurio de 12 metros que consumía 50 kilogramos de alimento diario, se necesitaba una base de fitoplancton que produjera miles de toneladas de materia orgánica. Esta relación matemática explica por qué los superdepredadores siempre son escasos en cualquier ecosistema: la pirámide energética limita la biomasa que puede existir en cada nivel trófico sucesivo.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los cocolitóforos fueron tan abundantes durante el Cretácico que le dieron nombre al período. La palabra "Cretácico" proviene del latín "creta" (tiza o creta), en referencia a los enormes depósitos de creta formados por sus diminutos esqueletos calcáreos. Los acantilados de Dover contienen aproximadamente 800 cocolitos por milímetro cúbico de roca. Si apiláramos todos los cocolitos de un solo metro cúbico de creta, formarían una línea de más de 600 kilómetros de longitud.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La productividad primaria oceánica actual es de aproximadamente 50,000 millones de toneladas de carbono al año, producidas principalmente por fitoplancton. Estudios geoquímicos basados en isótopos de carbono-13 sugieren que durante picos de productividad del Cretácico, esta cifra pudo ser entre un 20% y un 50% mayor. La evidencia proviene del análisis de la proporción de carbono-13 respecto al carbono-12 en carbonatos marinos fósiles, ya que la fotosíntesis preferentemente absorbe carbono-12, dejando el agua marina enriquecida en carbono-13 durante períodos de alta productividad.' },
    ],
    fact: 'El fitoplancton marino produce hoy aproximadamente el 50% del oxígeno que respiramos, más que todos los bosques del planeta combinados. Durante el Cretácico, con océanos más cálidos y extensos, la producción de oxígeno por fitoplancton pudo haber sido aún mayor. El registro geológico muestra que los niveles atmosféricos de oxígeno durante partes del Cretácico alcanzaron hasta el 30%, comparado con el 21% actual. Esta mayor concentración de oxígeno pudo haber facilitado el crecimiento de organismos marinos de gran tamaño, incluyendo los reptiles marinos gigantes que ocupaban los niveles tróficos superiores.',
  },
  {
    id: 'invertebrados-mesozoicos',
    title: 'Los Invertebrados Mesozoicos',
    color: '#6E8FA8',
    btnImage: '/assets/reptiles_marinos/infographic_m7/btn_invertebrados-mesozoicos.jpg',
    image: '/assets/reptiles_marinos/infographic_m7/hero_invertebrados-mesozoicos.jpg',
    content: [
      'Los ammonites fueron los invertebrados marinos más emblemáticos del Mesozoico, con más de 10,000 especies descritas que habitaron los océanos durante 340 millones de años (desde el Devónico hasta el final del Cretácico). Estos cefalópodos poseían conchas externas enrolladas en espiral, divididas internamente en cámaras llenas de gas que el animal controlaba para regular su flotabilidad, un mecanismo similar al del nautilo actual. Los ammonites variaban enormemente en tamaño: desde especies de apenas 1 centímetro de diámetro hasta el Parapuzosia seppenradensis del Cretácico Superior, cuya concha alcanzaba 1.8 metros de diámetro y un peso estimado de 700 kilogramos.',
      'Los belemnites, parientes de los calamares actuales, fueron depredadores activos en los mares del Jurásico y el Cretácico. A diferencia de los ammonites, su concha era interna — una estructura calcárea llamada rostro que se fosiliza con frecuencia y se encuentra como fósiles en forma de bala o cilindro. Los belemnites tenían 10 brazos con ganchos, grandes ojos para cazar en aguas profundas y un sistema de propulsión a chorro. Estudios de la composición isotópica de sus rostros han permitido reconstruir las temperaturas del agua marina con resolución estacional, proporcionando datos sobre el clima de hace 150 millones de años con una precisión de ±2 grados Celsius.',
      'Los bivalvos rudistas dominaron la construcción de arrecifes en los mares tropicales del Cretácico, reemplazando a los corales como principales formadores de estructuras arrecifales durante unos 40 millones de años. Los rudistas eran moluscos bivalvos con conchas gruesas y asimétricas: una valva inferior cónica o cilíndrica que se fijaba al sustrato, y una valva superior plana que funcionaba como tapa. Algunos rudistas como el Titanosarcolites alcanzaban más de 1 metro de altura. Los arrecifes de rudistas se extendían por el Tetis y el Caribe, y sus fósiles se encuentran hoy en formaciones calcáreas desde España y Turquía hasta México y Texas.',
      'Los equinoideos (erizos de mar) experimentaron una diversificación notable durante el Mesozoico, especialmente con la evolución de los erizos irregulares (como los erizos corazón y las galletas de mar). A diferencia de los erizos regulares con simetría radial perfecta, los irregulares desarrollaron simetría bilateral, lo que les permitió excavar en los sedimentos del fondo marino para alimentarse de materia orgánica. Los cidaroideos, un orden de erizos regulares, son uno de los pocos grupos de equinoideos que sobrevivieron a la extinción del Pérmico-Triásico (hace 252 millones de años) y continúan existiendo en los océanos actuales, representando un linaje de 400 millones de años de antigüedad.',
      'Los crustáceos mesozoicos incluían langostas, cangrejos y camarones que desempeñaban funciones ecológicas similares a las de sus descendientes actuales. Los decápodos (crustáceos con diez patas) experimentaron una radiación evolutiva significativa durante el Jurásico y el Cretácico. El registro fósil muestra la aparición de los primeros cangrejos verdaderos (braquiuros) en el Jurásico medio, hace unos 170 millones de años. Estos invertebrados eran consumidores secundarios que se alimentaban de detritos, algas y organismos más pequeños, y a su vez servían como presa para peces, reptiles marinos pequeños y otros depredadores de los niveles tróficos medios.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los ammonites cambiaban la forma de sus conchas a lo largo de su vida, un fenómeno llamado heteromorfia. Algunas especies del Cretácico como Nipponites mirabilis tenían conchas desenrolladas en formas tridimensionales complejas parecidas a nudos. Durante décadas los paleontólogos pensaron que eran formas patológicas, pero estudios recientes demuestran que estas formas servían para mantener estable la posición del animal mientras se alimentaba de plancton suspendido en el agua, funcionando como sistemas de estabilización pasiva.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los belemnites nos permiten reconstruir el clima antiguo gracias a la termometría isotópica. La proporción de oxígeno-18 respecto a oxígeno-16 en el carbonato de calcio de sus rostros varía con la temperatura del agua al momento de la calcificación. Usando esta técnica, el geoquímico Harold Urey demostró en 1951 que un belemnite jurásico del sur de Inglaterra vivió durante cuatro estaciones bien diferenciadas, con temperaturas que oscilaron entre 15°C en invierno y 22°C en verano, hace unos 155 millones de años.' },
    ],
    fact: 'Los ammonites desaparecieron por completo en la extinción K-Pg hace 66 millones de años, pero su pariente vivo más cercano, el nautilo (Nautilus pompilius), sobrevivió y habita actualmente los océanos Índico y Pacífico occidental. El nautilo ha cambiado muy poco en los últimos 500 millones de años y conserva la misma estructura básica de concha con cámaras de gas. Solo existen 6 especies vivas de nautilo, todas restringidas a aguas tropicales profundas entre 150 y 700 metros, donde se alimentan de carroña y pequeños crustáceos usando sus 90 tentáculos sin ventosas.',
  },
  {
    id: 'peces-mesozoico',
    title: 'Peces del Mesozoico',
    color: '#8B6B4A',
    btnImage: '/assets/reptiles_marinos/infographic_m7/btn_peces-mesozoico.jpg',
    image: '/assets/reptiles_marinos/infographic_m7/hero_peces-mesozoico.jpg',
    content: [
      'Xiphactinus audax fue uno de los peces óseos depredadores más grandes del Cretácico Superior, alcanzando longitudes de hasta 6 metros y un peso estimado de 500 kilogramos. Habitó el Mar Interior Occidental de Norteamérica hace entre 90 y 66 millones de años. Su cuerpo era alargado y musculoso, con una boca enorme equipada con dientes cónicos de hasta 5 centímetros diseñados para capturar y retener presas resbaladizas. El fósil más famoso de Xiphactinus, descubierto en Kansas en 1952, contiene dentro de su cavidad abdominal un pez Gillicus de 1.8 metros que fue su última comida — la presa era tan grande que probablemente causó la muerte del depredador al dañar sus órganos internos.',
      'Enchodus, conocido informalmente como el "pez sable" por sus prominentes colmillos, fue un género de peces teleósteos que habitó océanos de todo el mundo durante el Cretácico Superior. Sus colmillos palatinos podían medir hasta 6 centímetros en especies de apenas 30 centímetros de longitud corporal, lo que le daba un aspecto desproporcionadamente feroz. Se han descrito más de 30 especies de Enchodus, desde peces pequeños de 15 centímetros hasta formas de 1.5 metros. Enchodus ocupaba un nivel trófico intermedio: se alimentaba de peces más pequeños y calamares, y era presa frecuente de tiburones, mosasaurios e incluso aves marinas dentadas como Hesperornis.',
      'Los tiburones del Mesozoico alcanzaron una diversidad y tamaño notables. Cretoxyrhina mantelli, el "tiburón del Cretácico de Ginsu" (nombre derivado de los cuchillos Ginsu por sus dientes cortantes), medía hasta 7 metros de longitud y fue uno de los principales depredadores del Mar Interior Occidental hace 100–82 millones de años. Sus dientes, de hasta 7 centímetros, eran lisos y curvos, adaptados para cortar carne con eficiencia. Se han encontrado vértebras de plesiosauro y huesos de mosasaurio con marcas de mordida que coinciden con la dentición de Cretoxyrhina, demostrando que este tiburón cazaba reptiles marinos.',
      'Squalicorax, otro tiburón del Cretácico, tenía dientes aserrados similares a los del actual tiburón tigre y funcionaba probablemente como carroñero y depredador oportunista. Medía entre 2 y 5 metros y se han encontrado sus dientes incrustados en huesos de dinosaurios como hadrosaurios, lo que indica que se alimentaba de cadáveres que llegaban al mar desde tierra firme. La coexistencia de múltiples especies de tiburones de diferentes tamaños y estrategias alimentarias demuestra la complejidad de las redes tróficas mesozoicas, donde los nichos ecológicos estaban tan especializados como en los ecosistemas marinos actuales.',
      'Los peces actinopterigios (peces con aletas radiadas) experimentaron una diversificación acelerada durante el Cretácico que sentó las bases para la dominancia actual de los teleósteos. Antes del Cretácico, los peces marinos grandes eran principalmente holósteos (como los actuales pejelagartos) y sarcopterigios (peces de aletas lobuladas). La evolución de mandíbulas más móviles, colas simétricas más eficientes y escamas más ligeras permitió a los teleósteos explotar nichos alimentarios nuevos. Estudios publicados por Matt Friedman en PNAS en 2010 demuestran que la extinción K-Pg eliminó muchos linajes de peces, pero los teleósteos sobrevivientes se diversificaron de forma acelerada en los primeros 10 millones de años del Paleógeno, dando origen a la mayoría de familias de peces marinos que existen hoy.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El fósil de "pez dentro de un pez" de Xiphactinus (conocido como el "pez dentro de un pez" de Sternberg) se exhibe en el Museo de Historia Natural de Sternberg en Kansas. George F. Sternberg lo descubrió en 1952 en la Formación Niobrara. El pez depredador de 4.3 metros tenía un Gillicus arcuatus de 1.8 metros sin digerir en su estómago. Los paleontólogos creen que Xiphactinus murió poco después de tragar esta presa porque el Gillicus perforó la pared del estómago, causando una infección fatal.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La evolución de los tiburones abarca más de 450 millones de años, predatando a los dinosaurios por unos 200 millones de años. A diferencia de los peces óseos, los tiburones tienen un esqueleto de cartílago que rara vez se fosiliza, por lo que la mayoría del registro fósil de tiburones consiste en dientes aislados y espinas. Un solo tiburón puede producir y perder más de 20,000 dientes durante su vida, lo que explica por qué los dientes de tiburón son los fósiles de vertebrado más comunes encontrados en rocas marinas mesozoicas.' },
    ],
    fact: 'Matt Friedman documentó en su estudio de 2010 en la revista PNAS que los peces teleósteos experimentaron una "radiación explosiva" tras la extinción K-Pg. Analizando la morfología de más de 1,500 fósiles, demostró que la diversidad de formas corporales de los teleósteos se multiplicó por un factor de 4 en solo 10 millones de años después de la extinción. Los nichos ecológicos vacantes dejados por los peces que se extinguieron fueron ocupados rápidamente por nuevos linajes, un patrón que los biólogos llaman "radiación adaptativa" y que se ha documentado también en aves y mamíferos tras la desaparición de los dinosaurios.',
  },
  {
    id: 'depredadores-medios',
    title: 'Los Depredadores Medios',
    color: '#7C93A8',
    btnImage: '/assets/reptiles_marinos/infographic_m7/btn_depredadores-medios.jpg',
    image: '/assets/reptiles_marinos/infographic_m7/hero_depredadores-medios.jpg',
    content: [
      'Los ictiosaurios pequeños y medianos ocuparon nichos de depredadores intermedios durante gran parte del Mesozoico. Si bien los ictiosaurios gigantes como Shonisaurus del Triásico alcanzaban 21 metros, las especies del Jurásico y el Cretácico tendían a tamaños más modestos. Ophthalmosaurus, un ictiosaurio del Jurásico Superior de 4–6 metros, poseía los ojos más grandes en proporción al cuerpo de cualquier vertebrado conocido: cada ojo medía hasta 23 centímetros de diámetro, protegido por un anillo esclerótico de hueso. Estos ojos enormes le permitían cazar peces y calamares en aguas profundas con escasa iluminación, de manera análoga al calamar gigante actual.',
      'Los plesiosaurios juveniles y las especies de menor tamaño actuaban como depredadores de nivel medio, alimentándose de peces, cefalópodos y crustáceos. Los plesiosaurios de cuello largo (elasmosáuridos) usaban sus cuellos extremadamente largos — con hasta 76 vértebras cervicales en Elasmosaurus platyurus, comparado con las 7 de cualquier mamífero — para emboscar bancos de peces desde abajo. Estudios biomecánicos publicados por Leslie Noè en 2006 demostraron que estos cuellos no eran muy flexibles lateralmente, sino que funcionaban como estructuras rígidas que se movían lentamente a través de cardúmenes, permitiendo que la cabeza pequeña capturara peces individuales sin alertar al resto del grupo.',
      'Los cocodrilos marinos del Mesozoico representaban otro componente de los depredadores medios. La familia Metriorhynchidae incluía cocodrilos adaptados por entero a la vida oceánica durante el Jurásico y el Cretácico temprano. Metriorhynchus tenía extremidades transformadas en aletas, una cola con aleta caudal vertical (similar a los tiburones), glándulas excretoras de sal, y carecía de las placas óseas de armadura que caracterizan a los cocodrilos actuales. Medía entre 3 y 4 metros y se alimentaba de peces y cefalópodos. Dakosaurus, un pariente más grande de hasta 5 metros, tenía un cráneo corto y profundo con dientes comprimidos lateralmente, adaptados para desgarrar presas grandes.',
      'Las tortugas marinas del Cretácico también funcionaban como consumidores de nivel medio. Protostega gigas, una tortuga marina de 3 metros de longitud, se alimentaba de medusas, moluscos y otros invertebrados de cuerpo blando. Los fósiles de Protostega encontrados en la Formación Niobrara de Kansas muestran frecuentes marcas de mordida de tiburones y mosasaurios en sus aletas y caparazones, evidenciando que estas tortugas eran presa habitual de los superdepredadores. Archelon ischyros, la tortuga marina más grande conocida con 4.6 metros de largo y 2,200 kilogramos de peso, ocupaba un nivel trófico similar alimentándose de medusas y calamares.',
      'La competencia entre depredadores medios por recursos alimentarios está documentada en el registro fósil. En el Mar Interior Occidental, ictiosaurios, plesiosaurios de cuello corto, tortugas marinas y tiburones de tamaño medio coexistían y explotaban recursos similares. Sin embargo, análisis de isótopos estables de carbono y nitrógeno en huesos y dientes fósiles revelan que cada grupo se especializaba en diferentes presas o profundidades de caza. Los ictiosaurios cazaban preferentemente cefalópodos en aguas profundas, los plesiosaurios de cuello corto consumían peces en aguas medias, y las tortugas se alimentaban de invertebrados cerca de la superficie. Esta partición de nicho reducía la competencia directa entre estos depredadores.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'Los metriorhínquidos (cocodrilos marinos) son el único grupo de cocodrilos que abandonó de forma exclusiva la vida terrestre. Sus fósiles muestran que perdieron las patas articuladas y desarrollaron aletas verdaderas, un proceso que tomó aproximadamente 20 millones de años desde el Jurásico Medio al Jurásico Superior. A diferencia de los cocodrilos actuales, que deben salir a tierra para poner huevos, los metriorhínquidos probablemente daban a luz crías vivas en el océano, como hacen las serpientes marinas actuales, ya que no podían desplazarse en tierra firme.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La técnica de isótopos estables permite reconstruir la dieta de animales extintos. El nitrógeno-15 se acumula en cada nivel trófico, de modo que un depredador tiene mayor proporción de N-15 que su presa. Análisis de Kiel y colaboradores (2014) en huesos de ictiosaurios, plesiosaurios y mosasaurios del mismo depósito fósil revelaron diferencias de 3-5 partes por mil en la proporción de N-15, confirmando que estos reptiles marinos no competían directamente sino que ocupaban diferentes niveles tróficos dentro del mismo ecosistema.' },
    ],
    fact: 'Los ojos de Ophthalmosaurus, con 23 centímetros de diámetro, contenían un anillo esclerótico formado por placas óseas que protegían el globo ocular contra la presión del agua a profundidad. Cálculos ópticos realizados por Ryosuke Motani en 1999 demostraron que estos ojos podían captar luz suficiente para formar imágenes útiles a profundidades de hasta 500 metros, en condiciones de oscuridad casi total. La pupila de Ophthalmosaurus tenía un diámetro máximo estimado de 10 centímetros, lo que le confería una sensibilidad lumínica 25 veces mayor que el ojo humano, comparable a la de los búhos actuales.',
  },
  {
    id: 'superdepredadores-marinos',
    title: 'Superdepredadores Marinos',
    color: '#9E7B5C',
    btnImage: '/assets/reptiles_marinos/infographic_m7/btn_superdepredadores-marinos.jpg',
    image: '/assets/reptiles_marinos/infographic_m7/hero_superdepredadores-marinos.jpg',
    content: [
      'Los pliosaurios representaron a los superdepredadores marinos más poderosos del Jurásico. Pliosaurus funkei, descubierto en Svalbard (Noruega) y descrito formalmente en 2012, alcanzaba una longitud estimada de 10–13 metros con un cráneo de 2 metros. Su fuerza de mordida se ha calculado en 33,000 newtons, más del doble que la del Tyrannosaurus rex y comparable a la de los mayores cocodrilos modernos escalados a su tamaño. Los pliosaurios tenían cuerpos compactos, cuellos cortos y cuatro grandes aletas que usaban para una locomoción subacuática potente, capaz de alcanzar velocidades estimadas de hasta 10 metros por segundo en ataques de emboscada.',
      'Los mosasaurios dominaron los océanos del Cretácico Superior (hace 100–66 millones de años) como los principales superdepredadores marinos, reemplazando ecológicamente a los pliosaurios que se habían extinguido. Los mosasaurios eran lagartos (escamosos) estrechamente emparentados con los actuales varanos y serpientes, que se adaptaron de manera integral a la vida marina. Tylosaurus proriger alcanzaba 13–14 metros de longitud y pesaba hasta 7 toneladas. Su cráneo de 1.2 metros contenía más de 80 dientes cónicos dispuestos en filas en las mandíbulas y en el paladar (dientes pterigoideos), una característica compartida con las serpientes que facilitaba sujetar y tragar presas enteras.',
      'La dieta de los mosasaurios está documentada con evidencia directa. Contenidos estomacales fosilizados de especímenes de Tylosaurus incluyen restos de peces, tiburones pequeños, aves marinas (Hesperornis), otros mosasaurios más pequeños y plesiosauria. Un espécimen de Prognathodon del Cretácico de Jordania conserva una tortuga marina parcialmente digerida en su estómago. Los mosasaurios más pequeños como Platecarpus (4–5 metros) se alimentaban de ammonites y peces, mientras que los gigantes como Mosasaurus hoffmannii (hasta 17 metros) eran depredadores generalistas capaces de consumir prácticamente cualquier animal marino.',
      'La competencia entre superdepredadores está registrada en marcas de mordida y patologías óseas. Especímenes de Tylosaurus muestran cicatrices de mordidas en la mandíbula y el cráneo que coinciden con la dentición de otros mosasaurios de tamaño similar, evidenciando combates intraespecíficos — probablemente por territorio o parejas reproductivas. En el registro del Mar Interior Occidental, la distribución geográfica y temporal de diferentes especies de mosasaurios sugiere que evitaban la competencia mediante segregación espacial: Tylosaurus dominaba aguas profundas abiertas, mientras que Clidastes (3–4 metros) habitaba aguas costeras más someras.',
      'Mosasaurus hoffmannii, la especie más grande del grupo, fue descubierto en 1764 en una cantera de piedra caliza cerca de Maastricht, Países Bajos, décadas antes de que existiera la paleontología como disciplina. Su descubrimiento fue fundamental para establecer el concepto de extinción — la idea de que especies enteras podían desaparecer del planeta, un concepto revolucionario en la época. Georges Cuvier identificó el fósil como un lagarto marino gigante en 1808, y el hallazgo contribuyó al desarrollo de la anatomía comparada como herramienta científica. Con 17 metros de longitud y un peso estimado de 14 toneladas, Mosasaurus hoffmannii fue probablemente el depredador marino más grande del Cretácico.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El fósil original de Mosasaurus hoffmannii fue capturado como botín de guerra por las tropas francesas en 1794 durante la conquista de Maastricht. La leyenda cuenta que el ejército francés ofreció 600 botellas de vino como recompensa para quien encontrara el fósil, que el canónigo Theodorus Godding había escondido en una cueva. El espécimen fue llevado a París, donde permanece en el Museo Nacional de Historia Natural de Francia. Este evento convirtió al mosasaurio en el primer reptil fósil famoso de la historia.' },
      { label: 'Dato Científico', icon: 'atom', text: 'Los mosasaurios fueron los primeros tetrápodos grandes en los que se demostró viviparidad (parto de crías vivas en lugar de puesta de huevos). Un fósil de Carsosaurus marchesettii del Cretácico de Eslovenia conserva embriones dentro de la cavidad corporal de la madre, orientados para nacer cola primero, exactamente como en las ballenas y delfines actuales. Esto indica que los mosasaurios nunca necesitaban salir a tierra, completando todo su ciclo de vida en el océano, similar a las serpientes marinas actuales del género Hydrophis.' },
    ],
    fact: 'La fuerza de mordida de Pliosaurus funkei, estimada en 33,000 newtons por Gregory Erickson y Mark Young en 2012, se calculó a partir de la sección transversal de los músculos aductores de la mandíbula, reconstruidos mediante tomografía computarizada del cráneo fósil. Para contexto: un ser humano muerde con unos 700 newtons, un león con 4,200 newtons, un cocodrilo de agua salada con 16,000 newtons, y el T. rex con unos 12,800 newtons. Pliosaurus funkei poseía la mordida más poderosa de cualquier animal marino conocido, capaz de triturar huesos de otros reptiles marinos grandes.',
  },
  {
    id: 'colapso-renovacion',
    title: 'Colapso y Renovación',
    color: '#4A6F8C',
    btnImage: '/assets/reptiles_marinos/infographic_m7/btn_colapso-renovacion.jpg',
    image: '/assets/reptiles_marinos/infographic_m7/hero_colapso-renovacion.jpg',
    content: [
      'La extinción del Cretácico-Paleógeno (K-Pg), provocada por el impacto del asteroide Chicxulub hace 66.043 ± 0.011 millones de años, devastó las cadenas alimentarias marinas con una severidad sin precedentes en los últimos 250 millones de años. El asteroide, de aproximadamente 12 kilómetros de diámetro, impactó en lo que hoy es la península de Yucatán, México, generando un cráter de 180 kilómetros de diámetro. El impacto liberó una energía equivalente a 10 mil millones de bombas nucleares de Hiroshima, vaporizando roca y lanzando miles de millones de toneladas de polvo y aerosoles de ácido sulfúrico a la atmósfera.',
      'El colapso de la cadena alimentaria marina comenzó desde su base. La nube de polvo y aerosoles bloqueó entre el 80% y el 100% de la luz solar durante meses, imposibilitando la fotosíntesis. Los cocolitóforos, que habían dominado el fitoplancton durante 80 millones de años, perdieron más del 90% de sus especies. Las diatomeas y los dinoflagelados sufrieron extinciones del 75% y 60% respectivamente. Sin productores primarios, toda la cadena trófica colapsó de abajo hacia arriba: los consumidores primarios murieron por falta de alimento, seguidos por los depredadores de cada nivel sucesivo. Este proceso de extinción en cascada tomó entre meses y pocos años.',
      'Los reptiles marinos desaparecieron casi en su totalidad. Los mosasaurios, plesiosauria y la mayoría de tortugas marinas se extinguieron. Los ammonites, que habían sobrevivido a cuatro extinciones masivas previas, desaparecieron definitivamente. Los belemnites, dominantes durante 180 millones de años, también se extinguieron. Los rudistas, constructores de arrecifes del Cretácico, ya se habían extinguido ligeramente antes del impacto. En total, se estima que desaparecieron entre el 75% y el 80% de todas las especies marinas, aunque la proporción fue mucho mayor entre los organismos grandes (más del 95% de las especies de más de 25 kilogramos).',
      'La recuperación de los ecosistemas marinos fue un proceso lento y desigual. Estudios de foraminíferos planctónicos (microorganismos con concha calcárea) en secciones del fondo oceánico muestran que la productividad primaria tardó entre 1 y 3 millones de años en recuperar niveles similares a los del Cretácico Superior. Los primeros en recuperarse fueron los organismos oportunistas de rápida reproducción: cianobacterias, diatomeas resistentes y hongos marinos. Los arrecifes de coral, que habían sido secundarios frente a los rudistas, no volvieron a dominar la construcción arrecifal hasta hace unos 55 millones de años, unos 11 millones de años después de la extinción.',
      'La desaparición de los reptiles marinos abrió nichos ecológicos que fueron ocupados gradualmente por los mamíferos. Los ancestros de las ballenas, los arqueocetos como Pakicetus, aparecieron hace unos 52 millones de años — 14 millones de años después de la extinción K-Pg. Desde pequeños mamíferos terrestres de 1–2 metros, las ballenas evolucionaron hasta los 30 metros del rorcual azul en aproximadamente 15 millones de años. Las focas y los leones marinos divergieron de carnívoros terrestres hace unos 30 millones de años. Los sirenios (manatíes y dugongos) descienden de parientes de los elefantes y aparecieron hace 50 millones de años. La cadena alimentaria marina moderna, dominada por mamíferos en los niveles tróficos superiores, es resultado directo del vacío ecológico dejado por la extinción de los reptiles marinos mesozoicos.'
    ],
    expandables: [
      { label: '¿Sabías que...?', icon: 'clock', text: 'El cráter de Chicxulub permaneció oculto bajo sedimentos durante 65 millones de años. Fue identificado en 1978 por los geofísicos Glen Penfield y Antonio Camargo mientras realizaban estudios magnéticos para la empresa petrolera mexicana PEMEX. La estructura circular de 180 km de diámetro estaba enterrada bajo 1 km de sedimentos calcáreos. No fue hasta 1991, cuando Alan Hildebrand y William Boynton conectaron el cráter con la extinción K-Pg, que la comunidad científica aceptó que este era el sitio del impacto que propusieron Luis y Walter Alvarez en 1980.' },
      { label: 'Dato Científico', icon: 'atom', text: 'La evidencia del impacto incluye una capa de arcilla rica en iridio (un elemento raro en la corteza terrestre pero común en asteroides) encontrada en más de 350 localidades alrededor del mundo, exactamente en el límite entre rocas del Cretácico y del Paleógeno. Esta capa, de entre 1 y 3 centímetros de espesor, contiene también cuarzo de choque (con deformaciones microscópicas causadas por presiones extremas), esférulas de vidrio (gotitas de roca fundida solidificadas en el aire) y hollín de incendios forestales globales. El iridio en esta capa totaliza unas 500,000 toneladas, consistente con un asteroide condrítico de 12 km.' },
    ],
    fact: 'Kelley y Pyenson documentaron en su estudio de 2015 en Science que la transición de reptiles marinos a mamíferos marinos como depredadores dominantes tomó aproximadamente 14 millones de años. Durante este intervalo, los tiburones fueron los principales depredadores marinos. El tiburón Otodus megalodon, que apareció hace unos 23 millones de años y alcanzaba 15–18 metros, representó el pico de la dominancia de los tiburones antes de que las ballenas dentadas de gran tamaño como los fiseteroides ocuparan definitivamente el nicho de superdepredador oceánico. La extinción de megalodon hace 3.6 millones de años coincide con la diversificación de las orcas y los cachalotes modernos.',
  },
];

// ——— Marine Particle Field (Canvas Background) ——————————————————
function MarineParticleField() {
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
      drift: (Math.random() - 0.5) * 0.12,
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

// ——— Marine Food Web Header ——————————————————————————————————
function MarineFoodWebHeader() {
  return (
    <div style={{ width: '100%', textAlign: 'center', position: 'relative', zIndex: 2, marginBottom: '-10px' }}>
      <svg viewBox="0 0 600 130" style={{ width: '100%', maxWidth: '600px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(91,123,154,0.3))' }}>
        {/* Oceanic arc */}
        <path d="M 50 110 Q 300 -10, 550 110" fill="none" stroke="url(#marineGrad)" strokeWidth="2.5" strokeLinecap="round" />
        {/* 7 trophic markers */}
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
        {/* Central wave icon */}
        <path d="M285 22 Q292 16 300 22 Q308 28 315 22" fill="none" stroke="#5B7B9A" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
        <path d="M282 30 Q292 24 300 30 Q308 36 318 30" fill="none" stroke="#5B7B9A" strokeWidth="1.2" opacity="0.5" strokeLinecap="round" />
        <circle cx="300" cy="38" r="2" fill="#5B7B9A" opacity="0.4" />
        <defs>
          <linearGradient id="marineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(91,123,154,0.2)" />
            <stop offset="50%" stopColor="rgba(91,123,154,0.9)" />
            <stop offset="100%" stopColor="rgba(91,123,154,0.2)" />
          </linearGradient>
        </defs>
        <text x="300" y="80" textAnchor="middle" fill="#5B7B9A" fontSize="16" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">CADENA ALIMENTARIA MARINA</text>
        <text x="300" y="100" textAnchor="middle" fill="rgba(91,123,154,0.6)" fontSize="11" fontFamily="monospace" letterSpacing="2">ECOSISTEMAS DEL MESOZOICO</text>
      </svg>
    </div>
  );
}

// ——— Organic Node Button ———————————————————————————————————
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
          layoutId="activeDotMarinosM7"
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

// ——— Expandable Section with Random Direction ————————————————————
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

// ——— Magazine-Style Content Panel ————————————————————————————————
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

// ——— Progress Bar ————————————————————————————————————————————
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

// ——— Main Infographic Component ————————————————————————————————
export default function InteractiveInfographic_MarinosM7() {
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
      backgroundImage: 'linear-gradient(180deg, rgba(10,12,30,0.85) 0%, rgba(15,10,35,0.8) 40%, rgba(10,12,30,0.88) 100%), url(/assets/reptiles_marinos/marinos_m7_bg.png)',
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
      <MarineParticleField />

      <MarineFoodWebHeader />

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
              🏆 ¡Has dominado la Cadena Alimentaria Marina del Mesozoico!
            </p>
            <p style={{ margin: '0.4rem 0 0', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }}>
              Ahora puedes tomar el quiz para ganar tu insignia de Ecólogo Marino
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
